import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Smartphone,
  Shield,
  Clock,
  Send,
  Search,
  Camera,
  Brain,
  Mic,
  Receipt,
  ClipboardCheck,
  GraduationCap,
  Zap,
  Archive,
  CheckCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Certificates', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Digital vs Paper', href: '/guides/digital-vs-paper-certificates' },
];

const tocItems = [
  { id: 'why-digital', label: 'Why the Industry Is Moving Digital' },
  { id: 'speed-accuracy', label: 'Speed and Accuracy' },
  { id: 'legal-validity', label: 'Legal Validity of Digital Certificates' },
  { id: 'storage-retrieval', label: 'Storage and Retrieval' },
  { id: 'delivery-sharing', label: 'Delivery and Sharing' },
  { id: 'industry-acceptance', label: 'Industry and Scheme Acceptance' },
  { id: 'environmental-cost', label: 'Environmental and Cost Impact' },
  { id: 'making-the-switch', label: 'Making the Switch' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Digital electrical certificates are legally valid in the UK provided they contain all required information as set out in BS 7671 Appendix 6 model forms.',
  'NICEIC, NAPIT, and ELECSA all accept digitally produced certificates for scheme compliance and building control notification.',
  'Digital certificates eliminate handwriting legibility issues, calculation errors, and the risk of lost paperwork that plague paper-based workflows.',
  'Elec-Mate produces professional PDF certificates that can be emailed or sent via WhatsApp to clients, landlords, and building control within seconds of completion.',
  'The average electrician saves 45 to 60 minutes per certificate by switching from paper to a digital workflow with AI-assisted data entry.',
];

const faqs = [
  {
    question: 'Are digital electrical certificates legally valid in the UK?',
    answer:
      'Yes. There is no legal requirement for electrical certificates to be handwritten or printed on specific paper. BS 7671:2018+A3:2024 sets out model forms in Appendix 6, and any certificate that contains all the required information in the correct format is valid regardless of whether it was produced on paper or digitally. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require landlords to provide tenants with a copy of the EICR — a PDF sent by email satisfies this requirement. NICEIC, NAPIT, and ELECSA all accept digital certificates submitted through their portals or produced by approved software. Building control bodies accept PDF certificates for Part P notification. The key requirement is content, not medium.',
  },
  {
    question: 'Will NICEIC or NAPIT reject a digitally produced certificate?',
    answer:
      'No. Both NICEIC and NAPIT accept digitally produced certificates. NICEIC contractors can upload certificates through the NICEIC portal, and NAPIT members can submit work through the NAPIT online system. The certificate must contain all required fields and be completed correctly — but the format (digital PDF vs handwritten NCR paper) is not grounds for rejection. In fact, digital certificates are often preferred by scheme assessors because they are legible, complete, and easier to review. Common rejection reasons are missing information, incorrect observation codes, or incomplete test results — not the digital format itself.',
  },
  {
    question: 'Can I send a digital certificate by email to a landlord or client?',
    answer:
      'Yes. Sending a certificate by email or WhatsApp is perfectly acceptable. For landlord EICRs under the 2020 Regulations, the requirement is that the landlord receives a copy — there is no specification about the delivery method. A PDF sent by email creates a clear audit trail with a timestamp, which is actually better evidence of delivery than handing over a paper copy. Many electricians now send the certificate from site immediately after completing the inspection, using apps like Elec-Mate that generate the PDF and send it via email or WhatsApp with a single tap.',
  },
  {
    question: 'What are the main advantages of digital over paper certificates?',
    answer:
      'The main advantages are speed (no re-writing results from a clipboard onto a form at home), accuracy (calculations are done automatically, reducing errors in Zs values, R1+R2 readings, and prospective fault current), legibility (no illegible handwriting that scheme assessors struggle to read), storage (certificates are backed up to the cloud and searchable, not buried in a filing cabinet), delivery (instant PDF to the client by email or WhatsApp), and compliance (built-in validation catches missing fields before you finalise the certificate). The time saving alone — typically 45 to 60 minutes per certificate — makes a significant difference when you are completing multiple certificates per week.',
  },
  {
    question: 'Do I need special software to produce digital certificates?',
    answer:
      'You need a certificate app or software that produces certificates in the correct BS 7671 format. Elec-Mate is designed specifically for UK electricians and produces all 8 major certificate types — EICR, EIC, Minor Works, Fire Alarm, Emergency Lighting, PAT Testing, EV Charger, and Solar PV — as professional PDFs. The app includes AI features like board scanning (photograph the consumer unit and the app reads the MCB/RCBO ratings), voice test entry (speak your results while holding the test probes), and defect code AI (describe a defect and get the correct observation code with the BS 7671 regulation reference). You do not need a laptop or printer — everything runs on your phone.',
  },
  {
    question: 'How long should I keep digital certificates?',
    answer:
      'The retention requirements are the same whether the certificate is digital or paper. An EIC should be retained for the lifetime of the installation. An EICR should be retained until the next periodic inspection (typically 5 years, but may be shorter if recommended by the inspector). Minor Works Certificates should be kept for the lifetime of the installation. The advantage of digital storage is that certificates are automatically backed up and searchable — you will never lose a certificate to a flooded office, a house move, or a misplaced filing folder. Elec-Mate stores all certificates in the cloud with automatic backup, so they are accessible from any device at any time.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description:
      'Complete guide to all 8 certificate types: EICR, EIC, Minor Works, Fire Alarm, Emergency Lighting, PAT, EV, and Solar PV.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/niceic-certificate-requirements',
    title: 'NICEIC Certificate Requirements',
    description:
      'What NICEIC requires on every certificate, common rejection reasons, and formatting standards.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/napit-certificate-guide',
    title: 'NAPIT Certificate Guide',
    description:
      'NAPIT registration, certification process, required documentation, and scheme requirements.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-retention',
    title: 'Certificate Retention Periods',
    description:
      'How long to keep each type of electrical certificate and best practices for digital storage.',
    icon: Archive,
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
    icon: Smartphone,
    category: 'Comparison',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-digital',
    heading: 'Why the Electrical Industry Is Moving to Digital Certificates',
    content: (
      <>
        <p>
          For decades, electrical certificates were completed by hand on pre-printed NCR (No Carbon
          Required) pads. The electrician would fill in the form on site with a pen, tear off the
          copies, hand one to the client, post one to the scheme provider, and file one in a
          cabinet. It worked — but it was slow, error-prone, and created a paper trail that was
          easily lost.
        </p>
        <p>
          The shift to digital certificates has been accelerating since the mid-2010s, driven by
          three forces: scheme providers moving to online portals for certificate submission, the
          Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          requiring landlords to provide EICRs to tenants (easiest as a PDF by email), and the
          availability of purpose-built apps like{' '}
          <SEOInternalLink href="/guides/best-eicr-software-uk">
            electrical certificate software
          </SEOInternalLink>{' '}
          that run on a smartphone.
        </p>
        <p>
          Today, the majority of certificates submitted to NICEIC and NAPIT are produced digitally.
          Paper NCR pads are still available from electrical wholesalers, but they are increasingly
          seen as a legacy format — used by electricians who have not yet made the switch, rather
          than preferred by choice.
        </p>
        <p>
          The question is no longer whether digital certificates are acceptable. They are. The
          question is why you would still use paper when digital is faster, more accurate, and
          easier to store, deliver, and retrieve.
        </p>
      </>
    ),
  },
  {
    id: 'speed-accuracy',
    heading: 'Speed and Accuracy: The Two Biggest Wins',
    content: (
      <>
        <p>
          The most immediate benefit of digital certificates is speed. A typical{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR certificate</SEOInternalLink>{' '}
          completed on paper takes 30 to 45 minutes of desk time after the site visit — re-writing
          test results from a clipboard onto the form, calculating maximum permitted Zs values,
          double-checking observation codes, and writing up the schedule of inspections. With a
          digital app, the certificate is completed on site as part of the inspection workflow, and
          the PDF is ready to send before you leave the property.
        </p>
        <p>
          Accuracy improves dramatically because digital tools eliminate the two main sources of
          error in paper certificates:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transcription errors.</strong> When you copy test results from a clipboard
                to a paper form, mistakes happen — a 0.32 becomes 0.23, a tick ends up in the wrong
                column, a circuit number gets transposed. Digital entry (especially voice entry)
                captures the data once, at the point of measurement, eliminating the re-write step
                entirely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calculation errors.</strong> Maximum permitted Zs values, prospective fault
                current, and correction factors all require looking up tables in{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
                or the On-Site Guide. A digital app does these lookups automatically — you enter the
                measured value and the app flags whether it passes or fails against the calculated
                maximum. No more getting the wrong column in Table 41.3.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The net result is that digital certificates are completed faster and contain fewer errors.
          For electricians completing multiple certificates per week, the time saving adds up to
          several hours — hours that can be spent on billable work rather than paperwork.
        </p>
        <SEOAppBridge
          title="Complete certificates on site, not at your desk"
          description="Elec-Mate's AI board scanner, voice test entry, and automatic Zs validation mean the certificate is finished before you pack up. No clipboard, no desk time, no re-writing."
          icon={Camera}
        />
      </>
    ),
  },
  {
    id: 'legal-validity',
    heading: 'Legal Validity of Digital Electrical Certificates',
    content: (
      <>
        <p>
          A common concern among electricians considering the switch to digital is whether digital
          certificates are legally valid. The answer is straightforward: yes, they are.
        </p>
        <p>
          BS 7671:2018+A3:2024 sets out model forms in Appendix 6 for the{' '}
          <SEOInternalLink href="/guides/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>
          , the{' '}
          <SEOInternalLink href="/guides/eicr-certificate">
            Electrical Installation Condition Report (EICR)
          </SEOInternalLink>
          , and the{' '}
          <SEOInternalLink href="/guides/minor-works-certificate">
            Minor Works Certificate
          </SEOInternalLink>
          . These model forms specify the information that must be included — they do not specify
          the medium. A certificate produced digitally as a PDF is just as valid as one written by
          hand on a pre-printed form, provided it contains all the required information.
        </p>
        <p>The key legal and regulatory positions are:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations (Part P).</strong> Building control bodies accept
                digital certificates for Part P notification. When a competent person scheme
                notifies building control of notifiable work, the certificate is submitted
                electronically through the scheme's portal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Safety Standards 2020.</strong> The Regulations require landlords
                to provide tenants with a copy of the EICR. A PDF sent by email or WhatsApp
                satisfies this requirement. There is no stipulation that it must be a physical paper
                copy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes.</strong>{' '}
                <SEOInternalLink href="/guides/niceic-certificate-requirements">
                  NICEIC
                </SEOInternalLink>
                , <SEOInternalLink href="/guides/napit-certificate-guide">NAPIT</SEOInternalLink>,
                and ELECSA all accept digitally produced certificates. Their online portals are
                specifically designed for digital submission.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Court proceedings.</strong> In the event of a dispute or legal claim, a
                digital certificate is admissible evidence. A timestamped PDF with a clear audit
                trail (when it was created, when it was sent, who received it) is actually stronger
                evidence than a handwritten form with no proof of delivery.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The only scenario where a physical signature might be specifically requested is during a
          face-to-face scheme assessment — but even then, the assessor is reviewing the content and
          quality of the certificate, not the format. Many assessors now review certificates on
          tablets during visits.
        </p>
      </>
    ),
  },
  {
    id: 'storage-retrieval',
    heading: 'Storage and Retrieval: Never Lose a Certificate Again',
    content: (
      <>
        <p>
          Paper certificates live in filing cabinets, van gloveboxes, and cardboard boxes in
          garages. They get damp. They get lost in house moves. They get eaten by mice. When a
          client calls three years later asking for a copy of their EIC, finding it means digging
          through years of paperwork — if it still exists at all.
        </p>
        <p>
          Digital certificates are stored in the cloud with automatic backup. They are searchable by
          client name, address, date, or certificate type. Finding a certificate from three years
          ago takes seconds, not hours. When a{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">landlord</SEOInternalLink> calls asking
          for a copy of the EICR they lost, you can resend it from your phone in under a minute.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Archive className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cloud backup.</strong> Certificates are stored securely in the cloud and
                synchronised across devices. If you lose your phone, your certificates are not lost
                — log in on a new device and everything is there.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Archive className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Search and filter.</strong> Find any certificate by client name, address,
                date range, or certificate type. No more flipping through filing cabinets or
                scrolling through folders of unlabelled PDFs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Archive className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retention compliance.</strong>{' '}
                <SEOInternalLink href="/guides/electrical-certificate-retention">
                  Certificate retention periods
                </SEOInternalLink>{' '}
                vary — an EIC must be kept for the lifetime of the installation, while an EICR is
                typically retained until the next periodic inspection. Digital storage makes
                long-term retention effortless.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians running a business, having a complete, searchable archive of every
          certificate ever issued is invaluable. It protects you professionally — if a client or
          insurer queries work done years ago, you can produce the certificate immediately. It also
          simplifies scheme assessments, as the assessor can review a sample of recent work quickly
          and cleanly.
        </p>
      </>
    ),
  },
  {
    id: 'delivery-sharing',
    heading: 'Delivery and Sharing: Certificates in Seconds, Not Days',
    content: (
      <>
        <p>
          With paper certificates, delivery means posting a copy, handing it over in person, or
          scanning and emailing a photograph of the handwritten form. The client often waits days or
          weeks. The quality of a photographed paper form is poor — hard to read, hard to archive,
          and unprofessional in appearance.
        </p>
        <p>
          Digital certificates are delivered instantly. The moment you complete the certificate on
          Elec-Mate, you can send a professional PDF by email or WhatsApp with a single tap. The
          client has the certificate on their phone before you leave the property. For landlord
          EICRs, this means the landlord can forward the report to their tenant the same day,
          meeting the 28-day notification requirement comfortably.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-4">
            <Send className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Professional PDF Export</h4>
              <p className="text-white text-sm leading-relaxed">
                Elec-Mate generates a clean, professional PDF that looks like it came from a
                dedicated office — not a photograph of a crumpled form. The PDF includes your
                company logo, registration numbers, and all required information in the correct BS
                7671 layout. Clients notice the difference, and it reflects well on your business.
              </p>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Send certificates from site in seconds"
          description="Complete the certificate, tap send, and the client has a professional PDF by email or WhatsApp before you leave. No desk time, no posting, no scanning. Elec-Mate handles the delivery."
          icon={Send}
        />
      </>
    ),
  },
  {
    id: 'industry-acceptance',
    heading: 'Industry and Scheme Provider Acceptance',
    content: (
      <>
        <p>
          Every major competent person scheme in the UK accepts digitally produced certificates:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">NICEIC</h3>
            <p className="text-white text-sm leading-relaxed">
              NICEIC contractors submit certificates through the{' '}
              <SEOInternalLink href="/guides/niceic-certificate-requirements">
                NICEIC online portal
              </SEOInternalLink>
              . Digital certificates are the standard submission method. Assessors review digital
              certificates during scheme visits and prefer legible, well-formatted documents. NICEIC
              does not require paper originals.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">NAPIT</h3>
            <p className="text-white text-sm leading-relaxed">
              <SEOInternalLink href="/guides/napit-certificate-guide">
                NAPIT members
              </SEOInternalLink>{' '}
              submit work notifications through the NAPIT online system. Certificates produced by
              third-party software (including Elec-Mate) are accepted provided they contain all
              required information. NAPIT's own app also produces digital certificates.
            </p>
          </div>
        </div>
        <p>
          ELECSA, BRE Certification, and other scheme providers follow the same approach. The
          industry has moved decisively towards digital, and there is no competitive or compliance
          disadvantage to using digital certificates — only advantages.
        </p>
        <p>
          Insurance companies, solicitors acting on property transactions, and local authority
          housing officers all accept digital PDF certificates. In conveyancing, the solicitor will
          typically request the electrical certificate as part of the property information pack — a
          PDF attached to an email is the standard format.
        </p>
      </>
    ),
  },
  {
    id: 'environmental-cost',
    heading: 'Environmental and Cost Impact',
    content: (
      <>
        <p>
          The environmental case for digital certificates is clear. Paper NCR pads, pre-printed
          forms, printer ink, envelopes, and postage all have a carbon footprint. Multiply that by
          the hundreds of thousands of certificates issued across the UK each year, and the
          cumulative impact is significant.
        </p>
        <p>
          The cost case is equally straightforward. A pack of 25 EICR NCR forms costs around £25 to
          £35 from an electrical wholesaler. If you complete 200 EICRs a year, that is £200 to £280
          on forms alone — before adding printer paper, ink, envelopes, and postage for delivery.
          Digital certificates eliminate all of these costs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No form costs.</strong> No NCR pads, no pre-printed forms, no reordering
                when you run out mid-job.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No printing costs.</strong> No printer, no ink, no paper jams at 10pm when
                you are trying to finish the day's paperwork.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No postage costs.</strong> No envelopes, no stamps, no trips to the post
                office. The certificate arrives instantly by email.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Time is money.</strong> The 45 to 60 minutes saved per certificate
                translates directly into additional earning capacity. At a typical electrician's
                hourly rate, that is £30 to £50 of value recovered per certificate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'making-the-switch',
    heading: 'Making the Switch: How Elec-Mate Transforms Certificate Workflow',
    content: (
      <>
        <p>
          Switching from paper to digital does not mean learning complex software or changing the
          way you work. Elec-Mate is designed to fit into your existing inspection and testing
          workflow — but eliminate the paperwork at every step.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photograph the consumer unit. The AI reads MCB/RCBO ratings, circuit details, and
                  board layout from the image. Half the certificate data is filled in before you
                  start testing.
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
                  Speak your test results while holding the probes: "Ring circuit 1, R1+R2 0.32, Zs
                  0.89, insulation resistance 200 megohms." The app fills in the schedule of test
                  results hands-free.
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
                  Describe a defect in plain English — the AI returns the correct{' '}
                  <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                    observation code
                  </SEOInternalLink>{' '}
                  with the matching BS 7671 regulation number. No more leafing through the
                  Regulations book on site.
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
                  Every C1, C2, and FI observation feeds into the remedial works estimator. It
                  prices each fix — materials, labour, margin — and generates a professional quote.
                  Hand the client the certificate and the quote in the same visit.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          The result: 8 certificate types, all completed on your phone, all exported as professional
          PDFs, all delivered to the client instantly. No paper, no desk time, no delays.
        </p>
        <SEOAppBridge
          title="Switch from paper to digital in minutes"
          description="Download Elec-Mate and complete your first digital certificate today. AI board scanner, voice test entry, defect code AI, and instant PDF delivery. 7-day free trial, cancel anytime."
          icon={Smartphone}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function DigitalVsPaperCertificatesPage() {
  return (
    <GuideTemplate
      title="Digital vs Paper Electrical Certificates | Comparison"
      description="Compare digital and paper electrical certificates for UK electricians. Legal validity, scheme acceptance, speed, accuracy, storage, delivery, and cost savings of going digital."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Certificate Guide"
      badgeIcon={Smartphone}
      heroTitle={
        <>
          Digital vs Paper Electrical Certificates:{' '}
          <span className="text-yellow-400">Why the Industry Has Moved On</span>
        </>
      }
      heroSubtitle="Digital certificates are legally valid, accepted by every UK scheme provider, faster to complete, and impossible to lose. This guide explains the advantages of digital over paper and how to make the switch without disrupting your workflow."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Digital Electrical Certificates"
      relatedPages={relatedPages}
      ctaHeading="Go Digital with Elec-Mate"
      ctaSubheading="Join 430+ UK electricians producing professional digital certificates with AI board scanning, voice test entry, and instant PDF delivery. 7-day free trial, cancel anytime."
    />
  );
}
