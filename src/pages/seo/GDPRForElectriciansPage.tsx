import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  ClipboardCheck,
  FileCheck2,
  Users,
  Briefcase,
  Shield,
  Lock,
  Eye,
  Trash2,
  AlertTriangle,
  FileText,
  Database,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'GDPR', href: '/guides/gdpr-for-electricians' },
];

const tocItems = [
  { id: 'overview', label: 'GDPR: Why It Applies to You' },
  { id: 'what-data', label: 'What Data You Hold' },
  { id: 'lawful-basis', label: 'Lawful Basis for Processing' },
  { id: 'customer-consent', label: 'Customer Consent and Privacy Notices' },
  { id: 'data-retention', label: 'Data Retention Periods' },
  { id: 'breaches', label: 'Data Breaches' },
  { id: 'ico-registration', label: 'ICO Registration' },
  { id: 'practical-steps', label: 'Practical Steps for Compliance' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'GDPR applies to every electrician who holds customer data — names, addresses, phone numbers, emails, and photos of their property. If you have a customer list, you are a data controller and GDPR applies to you.',
  'You must register with the ICO (Information Commissioner Office) and pay the annual fee of £40 for micro-organisations (fewer than 10 employees and turnover under £632,000). Failure to register is a criminal offence with fines up to £4,350.',
  'You need a lawful basis for holding customer data. For most electricians, "legitimate interests" (you need the data to do the job and provide aftercare) and "legal obligation" (you must keep records for tax, certification, and Building Regulations) are the relevant bases.',
  'Data retention: keep customer data for as long as you have a legitimate need. Electrical certificates must be kept for the life of the installation. Tax records must be kept for 5 years after the filing deadline. Marketing lists require ongoing consent.',
  'If you lose a phone, laptop, or van containing customer data (including paper records), that is potentially a data breach. You must assess the risk and, if it is likely to affect individuals, report it to the ICO within 72 hours.',
];

const faqs = [
  {
    question: 'Do I need to register with the ICO as a sole trader electrician?',
    answer:
      'Yes. If you process personal data (which you do — customer names, addresses, phone numbers, emails, photos), you must register with the ICO and pay the annual data protection fee. For micro-organisations (fewer than 10 employees and turnover under £632,000), the fee is £40 per year. You can register online at ico.org.uk in about 10 minutes. Failure to register when required is a criminal offence — the ICO can issue fines of up to £4,350. The ICO does check and does prosecute unregistered businesses. Registration also demonstrates professionalism to commercial clients who may ask for your ICO registration number.',
  },
  {
    question: 'What customer data am I allowed to keep?',
    answer:
      'You can keep any data you have a legitimate reason to hold. For electricians, this typically includes: customer name, address, phone number, and email (needed to perform the work and provide aftercare); property details and installation records (needed for certification and Building Regulations); photos of the installation (needed for certification, records, and dispute resolution); payment records (needed for tax and accounting). You should NOT keep data you do not need — for example, if a customer enquires but does not proceed, delete their data after a reasonable period (3 to 6 months) unless they have consented to marketing.',
  },
  {
    question: 'Do I need a privacy policy?',
    answer:
      'Yes. You need a privacy notice that tells customers what data you collect, why you collect it, how long you keep it, who you share it with, and their rights. This does not need to be a 20-page legal document — a clear, plain-English notice on your website and a brief statement on your quotation or terms and conditions is sufficient. Key points to cover: you collect data to provide electrical services and maintain records; you share data with your competent person scheme (for Building Regulations notification) and HMRC (for tax); you keep data for the periods required by law; customers can request to see, correct, or delete their data by contacting you.',
  },
  {
    question: 'What if I lose my phone with customer data on it?',
    answer:
      'Losing a phone that contains customer data (contacts, photos, emails, certificates) is a potential data breach. First, try to locate and remote-wipe the phone. Then assess the risk: was the phone locked with a PIN or biometric? Was the data encrypted? If the phone was locked and encrypted, the risk to customers is low and you probably do not need to report it. If the phone was unlocked or unprotected, customer data may be accessible to whoever finds it — this is a higher risk and you should consider reporting it to the ICO within 72 hours. Either way, document the incident, the steps you took, and your risk assessment. Use this as a reason to enable device encryption, strong PINs, and remote wipe on all your devices.',
  },
  {
    question: 'Can I use customer photos for marketing without permission?',
    answer:
      'No. Photos of completed work that could identify a customer property (address visible, recognisable interior) require explicit consent before using for marketing purposes (website, social media, brochures). Get written consent — a simple text or email agreement is sufficient: "Is it OK if I use photos of the completed work on my website and social media? No personal details will be shown." If the customer says no, respect it. You can still use the photos for your own records and certification. Close-up photos of wiring, consumer units, or accessories that do not identify the property are generally fine without specific consent, but it is good practice to ask anyway.',
  },
  {
    question: 'How long should I keep electrical certificates?',
    answer:
      'Electrical certificates (EICs, MIECs, EICRs) should be kept for the life of the installation — in practice, indefinitely or until the installation is replaced. This is not just a GDPR consideration — it is a professional obligation. The certificates prove the installation was safe and compliant at the time of completion, and may be needed for insurance claims, property sales, or investigations years later. Your competent person scheme will also keep copies. For GDPR purposes, retention of certificates is justified under "legal obligation" and "legitimate interests" — you have a strong reason to keep them. What you should periodically review and delete is enquiry data from people who never became customers and marketing lists where consent has lapsed.',
  },
  {
    question: 'Do I need to comply with GDPR if I only do commercial work?',
    answer:
      'Yes. GDPR protects personal data of individuals, and even in commercial work you hold personal data — the name and contact details of the person who instructed the work, site contacts, employee data if you have staff. The principles are the same: hold only what you need, keep it secure, have a lawful basis, and respect individual rights. Commercial clients will also expect you to demonstrate GDPR compliance during pre-qualification and tendering — it is increasingly a standard question on PQQs (pre-qualification questionnaires).',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/health-safety-policy-electrician',
    title: 'Health and Safety Policy',
    description: 'Template structure and legal requirements for your H&S policy.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-business-plan-template',
    title: 'Electrical Business Plan',
    description: 'Business plan template including compliance and operational planning.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/finding-commercial-electrical-work',
    title: 'Finding Commercial Work',
    description: 'Commercial clients expect GDPR compliance — get it right before you tender.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/partnership-vs-sole-trader-vs-ltd-electrician',
    title: 'Sole Trader vs Ltd',
    description: 'Business structure affects your data protection obligations.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Securely store and manage electrical certificates digitally.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/how-to-get-first-electrical-customer',
    title: 'Getting Your First Customer',
    description: 'Starting your electrical business with the right compliance foundations.',
    icon: Briefcase,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'GDPR: Yes, It Applies to Electricians',
    content: (
      <>
        <p>
          If you hold any personal data about customers — their name, address, phone number, email,
          or photos of their property — you are a "data controller" under the UK General Data
          Protection Regulation (UK GDPR) and the Data Protection Act 2018. This applies to every
          electrician, whether you are a sole trader with a notebook of customer numbers or a large
          contractor with a CRM system.
        </p>
        <p>
          GDPR is not as complicated as it sounds. For most electricians, compliance means: register
          with the ICO (£40/year), understand what data you hold and why, keep it secure, tell
          customers what you do with their data, and delete it when you no longer need it. This
          guide covers each step in practical terms.
        </p>
        <p>
          The consequences of non-compliance range from ICO enforcement notices and fines (up to
          £17.5 million or 4% of turnover, though fines for small businesses are typically much
          smaller) to criminal prosecution for failure to register (fines up to £4,350). More
          practically, commercial clients increasingly require GDPR compliance as a condition of
          awarding contracts.
        </p>
      </>
    ),
  },
  {
    id: 'what-data',
    heading: 'What Personal Data Do You Hold?',
    content: (
      <>
        <p>More than you think. Here is what most electricians hold:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2 text-white text-sm">
            <div>
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-400" /> Digital Data
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  Phone contacts (customer names and numbers)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  Emails and text messages
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  Photos of customer properties and installations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  Quotes and invoices (with addresses)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  Electrical certificates
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  Accounting records and bank statements
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-400" /> Paper Records
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                  Job sheets and notes
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                  Customer enquiry notes
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                  Paper certificates and carbon copies
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                  Receipts with customer details
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                  Business cards collected from customers
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          <strong>GDPR applies to all of this</strong> — digital and paper records alike. If it
          identifies a living individual, it is personal data.
        </p>
      </>
    ),
  },
  {
    id: 'lawful-basis',
    heading: 'Lawful Basis: Why You Are Allowed to Hold the Data',
    content: (
      <>
        <p>
          GDPR requires a "lawful basis" for processing personal data. For electricians, three bases
          are relevant:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-blue-400" /> Contract
            </h3>
            <p className="text-white text-sm leading-relaxed">
              You need the data to perform a contract with the customer — the electrical work they
              have hired you to do. You need their name, address, and contact details to visit their
              property, communicate about the work, and provide certificates.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" /> Legal Obligation
            </h3>
            <p className="text-white text-sm leading-relaxed">
              You are legally required to keep certain records: tax records (HMRC requires 5 years),
              electrical certificates (required by Building Regulations), and health and safety
              records. You do not need consent to keep data that you are legally required to hold.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-400" /> Legitimate Interests
            </h3>
            <p className="text-white text-sm leading-relaxed">
              You have a legitimate business interest in keeping customer records for aftercare,
              warranty, future work, and dispute resolution. You must balance your interest against
              the customer&apos;s privacy — for most electrical work, this balance clearly favours
              keeping the records.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'customer-consent',
    heading: 'Customer Consent and Privacy Notices',
    content: (
      <>
        <p>
          You do NOT need explicit consent to hold data for performing a contract, legal
          obligations, or legitimate interests. However, you DO need consent for:
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Marketing communications</strong> — if you want to add customers to a
                mailing list, send promotional emails or texts, or contact them about services they
                did not ask about, you need their explicit, freely given consent. They must actively
                opt in (no pre-ticked boxes).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Photos for marketing</strong> — using photos of completed work on your
                website or social media requires consent if the photos could identify the
                customer&apos;s property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sharing data with third parties</strong> — beyond what is necessary for the
                work (competent person scheme, HMRC), sharing data with other companies requires
                consent.
              </span>
            </li>
          </ul>
        </div>
        <p>
          <strong>Privacy notice:</strong> You must inform customers what data you collect and why.
          A simple paragraph on your quote, terms, or website is sufficient. Example: "We collect
          your name, address, and contact details to provide electrical services, issue
          certificates, and maintain records as required by law. We keep your data securely and do
          not share it with third parties except as required for certification and tax purposes. You
          can request to see, correct, or delete your data at any time by contacting us."
        </p>
      </>
    ),
  },
  {
    id: 'data-retention',
    heading: 'Data Retention: How Long to Keep Records',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-400" /> Retention Periods
          </h4>
          <div className="space-y-3 text-white text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Electrical certificates (EIC, EICR)</span>
              <strong className="text-yellow-400">Life of installation</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Tax records (invoices, receipts, accounts)</span>
              <strong className="text-yellow-400">5 years after filing deadline</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Accident and H&S records</span>
              <strong className="text-yellow-400">3 to 40 years (varies)</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Customer records (completed jobs)</span>
              <strong className="text-yellow-400">6 years (limitation period)</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Enquiries that did not proceed</span>
              <strong className="text-yellow-400">3 to 6 months</strong>
            </div>
            <div className="flex justify-between pb-2">
              <span>Marketing consent</span>
              <strong className="text-yellow-400">Until consent withdrawn</strong>
            </div>
          </div>
        </div>
        <p>
          <strong>Annual data review:</strong> Once a year, review your customer records and delete
          data you no longer need. Old enquiries, lapsed marketing lists, and records beyond their
          retention period should be securely deleted (digital) or shredded (paper).
        </p>
      </>
    ),
  },
  {
    id: 'breaches',
    heading: 'Data Breaches: What to Do',
    content: (
      <>
        <p>
          A data breach is any event where personal data is accidentally or unlawfully accessed,
          lost, destroyed, or disclosed. Common examples for electricians:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Lost or stolen phone containing customer contacts and photos</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Van broken into and paperwork (job sheets, certificates) stolen</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Email account hacked and customer data accessed</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Sending an email to the wrong customer with another customer&apos;s details
              </span>
            </li>
          </ul>
        </div>
        <p>
          <strong>What to do:</strong> (1) Contain the breach — change passwords, remote-wipe the
          device, report theft to police. (2) Assess the risk — could the data be used to harm
          individuals? (3) If there is a risk to individuals, report to the ICO within 72 hours
          using their online breach reporting tool. (4) If there is a high risk, also inform the
          affected customers. (5) Document everything — the breach, your response, and what you will
          do to prevent it happening again.
        </p>
      </>
    ),
  },
  {
    id: 'ico-registration',
    heading: 'ICO Registration: £40/Year, No Excuses',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-4 text-white text-sm">
            <div className="border-b border-white/10 pb-3">
              <h4 className="font-bold text-white mb-2">Who Must Register</h4>
              <p>
                Every organisation or sole trader that processes personal data must register with
                the ICO and pay the data protection fee — unless they qualify for a specific
                exemption (most electricians do not).
              </p>
            </div>
            <div className="border-b border-white/10 pb-3">
              <h4 className="font-bold text-white mb-2">Fee Tiers (2026)</h4>
              <p>
                Micro-organisations (fewer than 10 employees, turnover under £632,000):{' '}
                <strong className="text-yellow-400">£40/year</strong>. Small organisations (fewer
                than 250 employees, turnover under £36 million):{' '}
                <strong className="text-yellow-400">£60/year</strong>. Large organisations:{' '}
                <strong className="text-yellow-400">£2,900/year</strong>. Most electricians fall
                into the micro tier at £40/year.
              </p>
            </div>
            <div className="pb-3">
              <h4 className="font-bold text-white mb-2">How to Register</h4>
              <p>
                Visit ico.org.uk and complete the online registration form. It takes about 10
                minutes. You will receive a registration number which you should keep on file. Some
                commercial clients and accreditation schemes ask for your ICO registration number.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'practical-steps',
    heading: 'Practical Steps for GDPR Compliance',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Register with the ICO</strong> — £40/year. Do it today if you have not
                already.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lock all devices</strong> — PIN, fingerprint, or face unlock on your phone,
                tablet, and laptop. Enable encryption and remote wipe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Add a privacy notice</strong> — one paragraph on your website, quote
                template, or terms and conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Secure paper records</strong> — keep job sheets and certificates in a locked
                cabinet or drawer, not loose in the van.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual data review</strong> — once a year, delete data you no longer need.
                Old enquiries, expired marketing lists, records beyond retention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Back up digital records</strong> — if your phone breaks or is stolen, you
                need to be able to recover your data. Use cloud backup with encryption.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Compliance Is Simpler Than You Think',
    content: (
      <>
        <p>
          GDPR compliance for a sole-trader electrician takes about an hour to set up and a few
          minutes per year to maintain. Register with the ICO, add a privacy notice to your
          paperwork, lock your devices, and do an annual data review. That is it.
        </p>
        <SEOAppBridge
          title="Keep customer data secure and organised"
          description="Elec-Mate stores your customer records, certificates, and invoices securely in the cloud — encrypted, backed up, and accessible only to you. 7-day free trial."
          icon={Shield}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GDPRForElectriciansPage() {
  return (
    <GuideTemplate
      title="GDPR for Electricians UK 2026 | Data Protection Guide"
      description="GDPR guide for electricians. What data you hold, customer consent, data retention, ICO registration (£40/year), breaches, and practical compliance steps. UK-focused, plain English."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Compliance Guide"
      badgeIcon={Shield}
      heroTitle={
        <>
          GDPR for Electricians:{' '}
          <span className="text-yellow-400">Compliance in Plain English</span>
        </>
      }
      heroSubtitle="If you hold customer names, addresses, or phone numbers, GDPR applies to you. ICO registration, data retention, privacy notices, and breach procedures — explained in practical terms for electricians."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About GDPR for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Keep Customer Data Secure"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for secure customer records, certificates, and invoices. Cloud-encrypted, backed up, always accessible. 7-day free trial, cancel anytime."
    />
  );
}
