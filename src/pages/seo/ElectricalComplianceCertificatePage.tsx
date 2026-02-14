import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  Building2,
  Home,
  GraduationCap,
  Search,
  PoundSterling,
  ClipboardCheck,
  AlertTriangle,
  Scale,
  Send,
  Calculator,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Certificates', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Compliance Certificate', href: '/guides/electrical-compliance-certificate' },
];

const tocItems = [
  { id: 'what-is-compliance', label: 'What Is a Compliance Certificate?' },
  { id: 'types-of-certificates', label: 'Types of Compliance Certificates' },
  { id: 'part-p', label: 'Part P Building Regulations' },
  { id: 'competent-person', label: 'Competent Person Self-Certification' },
  { id: 'building-control', label: 'Building Control Notification' },
  { id: 'when-required', label: 'When Certificates Are Required' },
  { id: 'consequences', label: 'Consequences of Non-Compliance' },
  { id: 'for-electricians', label: 'For Electricians: Issuing Certificates' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An electrical compliance certificate confirms that electrical work meets the requirements of BS 7671, the IET Wiring Regulations, and any applicable building regulations.',
  'The three main compliance certificates are the Electrical Installation Certificate (EIC), Minor Electrical Installation Works Certificate (MEIWC), and Electrical Installation Condition Report (EICR).',
  'Part P of the Building Regulations (England and Wales) requires certain types of electrical work to be notified to building control — either through a competent person scheme or directly.',
  'Competent person self-certification (via NICEIC, NAPIT, ELECSA, etc.) allows registered electricians to certify their own notifiable work without involving building control directly.',
  'Elec-Mate generates all three certificate types on your phone with AI assistance, auto-populates test results, and sends the completed certificate to the client and building control notification body in one tap.',
];

const faqs = [
  {
    question: 'What is the difference between an EIC and an EICR?',
    answer:
      'An Electrical Installation Certificate (EIC) is issued for new electrical work — new installations, additions, or alterations to an existing installation. It certifies that the work complies with BS 7671 at the time of completion. An Electrical Installation Condition Report (EICR) is issued for existing electrical installations — it reports on the condition of the installation at the time of inspection. The EIC looks forward (certifying new work is safe), while the EICR looks back (assessing whether existing work is still safe). Both follow the model forms in Appendix 6 of BS 7671:2018+A3:2024.',
  },
  {
    question: 'Do I need a compliance certificate for every electrical job?',
    answer:
      'Not every electrical job requires a building regulations compliance certificate, but every electrical job requires some form of certification. Non-notifiable work (such as replacing a socket for socket, adding a fused spur to an existing circuit, or replacing a light switch) requires a Minor Electrical Installation Works Certificate. Notifiable work (such as installing a new circuit, work in a bathroom or kitchen, or installing a consumer unit) requires an Electrical Installation Certificate and notification to building control. The distinction is set out in Part P of the Building Regulations (England and Wales). In Scotland, the Building (Scotland) Regulations apply with similar requirements.',
  },
  {
    question: 'What qualifications do I need to issue a compliance certificate?',
    answer:
      'To issue an EIC or MEIWC, you need to be a "skilled person" as defined in BS 7671 — someone with sufficient knowledge, training, and experience to carry out and certify electrical work. In practice, this means holding the 18th Edition qualification (C&G 2382), the inspection and testing qualification (C&G 2391 or equivalent), and a relevant installation qualification. To self-certify notifiable work under Part P, you must also be registered with a competent person scheme such as NICEIC, NAPIT, or ELECSA. Registration involves regular assessment of your competence, technical knowledge, and record-keeping.',
  },
  {
    question: 'Can a homeowner do their own electrical work and get a certificate?',
    answer:
      'A homeowner can carry out some electrical work themselves, but they cannot self-certify under a competent person scheme. If the work is notifiable under Part P (such as installing a new circuit or work in a bathroom), the homeowner must notify building control before starting the work, and building control must inspect and approve the work on completion. This typically costs £250 to £500 for the building control fee alone. The homeowner should also arrange for a qualified electrician to test and certify the work by issuing an EIC. For non-notifiable work, the homeowner can carry out the work but should still have it tested and certified. In practice, it is almost always cheaper and safer to hire a registered electrician who can self-certify.',
  },
  {
    question: 'What happens if I sell a property without electrical certificates?',
    answer:
      'There is no legal requirement to provide electrical certificates when selling a property (unlike the Energy Performance Certificate, which is mandatory). However, solicitors acting for the buyer will typically request copies of any electrical certificates, particularly for work carried out within the last 10 years. If notifiable work was done without building control notification or competent person certification, the lack of a certificate can delay or jeopardise the sale. The buyer or their solicitor may require indemnity insurance to cover the risk, or may request a price reduction. For landlords selling rental properties, a valid EICR is expected as standard. Missing certificates are a red flag for buyers and can reduce the sale price.',
  },
  {
    question: 'How long is an electrical compliance certificate valid?',
    answer:
      'An EIC and MEIWC do not expire — they certify the state of the work at the time of completion. However, the installation itself requires periodic inspection. The EICR includes a recommended date for the next inspection, typically 5 years for domestic rented properties, 5 years for commercial properties, and 10 years for owner-occupied domestic properties. The certificates should be retained for the life of the installation and provided to any future owner or occupier. Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, landlords must have a valid EICR renewed at least every 5 years.',
  },
  {
    question: 'What is the difference between Part P and BS 7671?',
    answer:
      'Part P is a building regulation that applies in England and Wales. It sets out the legal requirement that electrical work must be designed, installed, inspected, and tested to ensure safety. BS 7671 (the IET Wiring Regulations) is the technical standard that defines how electrical work should be done. Part P references BS 7671 as the means of satisfying the regulation. In simple terms: Part P says "electrical work must be safe," and BS 7671 says "here is how to make it safe." Compliance with BS 7671 is not a legal requirement in itself, but it is the accepted way of demonstrating compliance with Part P.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanning and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types',
    description: 'Complete guide to EIC, MEIWC, EICR, and other electrical certificates in the UK.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Full guide to Part P notification requirements, notifiable vs non-notifiable work, and competent person schemes.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Legal requirements, penalties, and deadlines under the Electrical Safety Standards 2020.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/minor-works-vs-eic',
    title: 'Minor Works vs EIC',
    description: 'When to use a Minor Works Certificate and when a full EIC is required.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description: 'Study for C&G 2391 with structured training on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-compliance',
    heading: 'What Is an Electrical Compliance Certificate?',
    content: (
      <>
        <p>
          An electrical compliance certificate is a formal document that confirms electrical work
          has been carried out in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the IET Wiring Regulations) and, where applicable, the Building Regulations. It provides
          evidence that the installation has been designed, installed, inspected, and tested to the
          required standards.
        </p>
        <p>
          The term "compliance certificate" is a general one — it covers several specific document
          types, each serving a different purpose. The key certificates are the Electrical
          Installation Certificate (EIC), the Minor Electrical Installation Works Certificate
          (MEIWC), and the Electrical Installation Condition Report (EICR). Each follows the model
          forms set out in Appendix 6 of BS 7671.
        </p>
        <p>
          Compliance certificates serve multiple purposes: they protect the property owner by
          providing evidence that the work is safe; they protect the electrician by documenting what
          was done and tested; and they satisfy regulatory requirements under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          (England and Wales) and the Electricity at Work Regulations 1989.
        </p>
      </>
    ),
  },
  {
    id: 'types-of-certificates',
    heading: 'Types of Electrical Compliance Certificates',
    content: (
      <>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Electrical Installation Certificate (EIC)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Issued for new installations, additions, and alterations. The EIC covers the
                  design, construction, inspection, and testing of the work. It must include a
                  schedule of inspections, a schedule of test results, and details of the designer,
                  installer, and inspector (which can all be the same person for smaller jobs).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Minor Electrical Installation Works Certificate (MEIWC)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Issued for minor work that does not include the provision of a new circuit.
                  Examples include adding a socket to an existing circuit, replacing a consumer unit
                  on a like-for-like basis, or installing a fused connection unit. The MEIWC is a
                  simpler form than the EIC and does not require separate design and construction
                  details.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Electrical Installation Condition Report (EICR)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Issued following a periodic inspection and testing of an existing installation.
                  The EICR reports on the condition of the installation, classifies observations
                  using{' '}
                  <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                    C1, C2, C3, and FI codes
                  </SEOInternalLink>
                  , and provides an overall assessment of Satisfactory or Unsatisfactory. Required
                  by law for privately rented properties in England (every 5 years).
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Other specialist certificates include the{' '}
          <SEOInternalLink href="/tools/ev-charger-certificate">
            EV Charger Installation Certificate
          </SEOInternalLink>
          ,{' '}
          <SEOInternalLink href="/tools/fire-alarm-certificate">
            Fire Alarm Certificate
          </SEOInternalLink>
          , and{' '}
          <SEOInternalLink href="/tools/emergency-lighting-certificate">
            Emergency Lighting Certificate
          </SEOInternalLink>
          . These follow similar principles but include additional sections specific to the type of
          installation.
        </p>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Building Regulations and Electrical Compliance',
    content: (
      <>
        <p>
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          applies in England and Wales. It requires that electrical installation work is designed,
          installed, inspected, and tested so that it is safe and does not present a risk of fire or
          electric shock.
        </p>
        <p>Part P divides electrical work into two categories:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notifiable work</strong> — must be notified to building control. This
                includes installing a new circuit, work in bathrooms (zone 0, 1, or 2), work in
                kitchens within 2 metres of a sink, installing a consumer unit, installing outdoor
                wiring, and any work in a special location as defined in BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-notifiable work</strong> — does not require notification to building
                control. This includes replacing accessories (sockets, switches, light fittings) on
                a like-for-like basis, adding a fused spur to an existing circuit (outside special
                locations), and repairs to existing circuits.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For notifiable work, the electrician must either be registered with a competent person
          scheme (allowing self-certification) or the work must be notified to the local authority
          building control department directly. Failure to notify is a criminal offence under the
          Building Act 1984.
        </p>
      </>
    ),
  },
  {
    id: 'competent-person',
    heading: 'Competent Person Self-Certification',
    content: (
      <>
        <p>
          The competent person scheme system allows registered electricians to self-certify that
          their notifiable work complies with Part P without the need for a separate building
          control inspection. This saves time and money for both the electrician and the client.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Main Competent Person Schemes</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC</strong> — the largest scheme, with Domestic Installer and Approved
                Contractor levels. Regular assessment of competence, record-keeping, and quality of
                work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT</strong> — offers domestic and commercial registration. Includes
                competence assessment, ongoing support, and access to technical advice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ELECSA</strong> — part of the ECA (Electrical Contractors Association).
                Registration includes regular assessment and access to the ECA's technical support.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BRE Certification</strong> — offers competent person registration for
                electrical work, along with other building trades.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When a registered electrician completes notifiable work, they must notify the scheme
          provider within 30 days. The scheme provider then notifies building control on the
          electrician's behalf. The client receives a Building Regulations Compliance Certificate
          from the scheme provider, confirming the work has been properly notified and certified.
        </p>
        <SEOAppBridge
          title="Notify building control in one tap"
          description="Elec-Mate integrates with competent person scheme notification systems. Complete the EIC, tap to notify, and the building control notification is submitted automatically. The compliance certificate follows by email."
          icon={Send}
        />
      </>
    ),
  },
  {
    id: 'building-control',
    heading: 'Building Control Notification Route',
    content: (
      <>
        <p>
          If the electrician carrying out notifiable work is not registered with a competent person
          scheme, the work must be notified to the local authority building control department
          directly. This route involves:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Submit a building notice</strong> before starting the work. The local
              authority charges a fee — typically £250 to £500 for domestic electrical work.
            </li>
            <li>
              <strong>Carry out the work</strong> in accordance with BS 7671.
            </li>
            <li>
              <strong>Notify building control</strong> that the work is complete and ready for
              inspection.
            </li>
            <li>
              <strong>Building control inspects</strong> the work. The inspector will check the EIC,
              test results, and may carry out their own verification tests.
            </li>
            <li>
              <strong>Receive a Building Regulations Completion Certificate</strong> if the work is
              satisfactory. This is the formal confirmation that the work complies with Part P.
            </li>
          </ol>
        </div>
        <p>
          The building control route is more expensive and time-consuming than self-certification
          through a competent person scheme. For this reason, most professional electricians
          carrying out regular notifiable work register with a scheme. For homeowners carrying out
          their own work, building control notification is the only option.
        </p>
      </>
    ),
  },
  {
    id: 'when-required',
    heading: 'When Is an Electrical Compliance Certificate Required?',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New electrical installations:</strong> EIC required. If notifiable under
                Part P, building control notification also required (via competent person scheme or
                direct notification).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additions and alterations:</strong> EIC required for new circuits. MEIWC
                acceptable for minor additions to existing circuits that do not involve a new
                circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement:</strong> EIC or MEIWC required, plus Part P
                notification (this became notifiable from January 2005).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rental properties:</strong> EICR required at least every 5 years under the
                Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial premises:</strong> EICR required under the Electricity at Work
                Regulations 1989 and the Health and Safety at Work Act 1974.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of use or property sale:</strong> Solicitors routinely request copies
                of recent electrical certificates as part of conveyancing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'consequences',
    heading: 'Consequences of Non-Compliance',
    content: (
      <>
        <p>
          Failing to obtain or provide the correct electrical compliance certificates can have
          serious consequences:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Criminal prosecution</strong> — carrying out notifiable electrical work
                without notification is an offence under the Building Act 1984. Fines are unlimited.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enforcement notices</strong> — the local authority can require the work to
                be opened up for inspection, tested, and if necessary, redone at the property
                owner's expense.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance implications</strong> — if a fire or injury results from
                uncertified electrical work, the property insurance may be void.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord penalties</strong> — up to £30,000 per breach under the Electrical
                Safety Standards in the Private Rented Sector (England) Regulations 2020.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Property sale complications</strong> — missing certificates can delay or
                prevent the sale of a property, or reduce the sale price.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Issuing Compliance Certificates Efficiently',
    content: (
      <>
        <p>
          Every electrical job requires certification. The question is how quickly and
          professionally you can produce it. Elec-Mate turns certificate production from desk-time
          paperwork into an on-site, real-time workflow:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">All Certificate Types in One App</h4>
                <p className="text-white text-sm leading-relaxed">
                  EIC, MEIWC, EICR, EV Charger, Fire Alarm, Emergency Lighting — all available from
                  the same interface. Select the certificate type, fill in the details with AI
                  assistance, and export a professional PDF.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Auto-Populated Test Results</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use voice entry to speak your test results as you work. The AI validates readings
                  against BS 7671 maximum permitted values and flags any that fail. No manual
                  transcription errors.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Send className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Instant Delivery and Building Control Notification
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Send the completed certificate to the client by email or WhatsApp in one tap.
                  Building control notification is submitted automatically through your competent
                  person scheme integration. The client has the certificate, you have the
                  notification confirmation, and nobody goes home to type anything up.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Issue every certificate from your phone"
          description="Join 430+ UK electricians producing professional compliance certificates on site. AI board scanner, voice test entry, auto-validation, and instant delivery. 7-day free trial, cancel anytime."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalComplianceCertificatePage() {
  return (
    <GuideTemplate
      title="Electrical Compliance Certificate | What You Need"
      description="Complete guide to electrical compliance certificates in the UK. Types of certificates (EIC, MEIWC, EICR), Part P building regulations, competent person self-certification, and when each certificate is required."
      datePublished="2025-07-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Certificate Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          Electrical Compliance Certificate:{' '}
          <span className="text-yellow-400">What You Need to Know</span>
        </>
      }
      heroSubtitle="Every piece of electrical work in the UK must be certified. This guide explains the different types of electrical compliance certificates, when each is required, how Part P building regulations apply, and how competent person self-certification works."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Compliance Certificates"
      relatedPages={relatedPages}
      ctaHeading="Produce Every Certificate on Your Phone"
      ctaSubheading="EIC, MEIWC, EICR — all in one app with AI assistance, voice test entry, and instant delivery to clients. Join 430+ UK electricians using Elec-Mate. 7-day free trial."
    />
  );
}
