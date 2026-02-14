import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Shield,
  ShieldCheck,
  AlertTriangle,
  Search,
  FileCheck2,
  ClipboardCheck,
  GraduationCap,
  PoundSterling,
  Home,
  Award,
  CheckCircle,
  Phone,
  Scale,
  Camera,
  Send,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Why Choose NICEIC', href: '/guides/why-choose-niceic-electrician' },
];

const tocItems = [
  { id: 'what-is-niceic', label: 'What Is NICEIC?' },
  { id: 'registration-types', label: 'Types of Registration' },
  { id: 'quality-guarantee', label: 'The Platinum Promise Guarantee' },
  { id: 'how-assessment-works', label: 'How Assessment Works' },
  { id: 'complaints-procedure', label: 'Complaints Procedure' },
  { id: 'niceic-vs-other-schemes', label: 'NICEIC vs Other Schemes' },
  { id: 'finding-registered-electrician', label: 'Finding a Registered Electrician' },
  { id: 'for-electricians', label: 'For Electricians: Getting Registered' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "NICEIC is the UK's largest electrical contracting registration body — every registered contractor is assessed annually to confirm competence and compliance with BS 7671.",
  "NICEIC registration means the electrician's work is backed by the Platinum Promise guarantee, which covers faulty workmanship for up to 6 years.",
  'Consumers can use the free online "Find a Contractor" tool on the NICEIC website to verify an electrician\'s registration status and find registered contractors in their area.',
  'If something goes wrong with work carried out by a NICEIC-registered electrician, the NICEIC complaints procedure can investigate and require corrective action at no cost to the consumer.',
  'Elec-Mate helps NICEIC-registered electricians maintain their high standards with AI-powered certificate generation, BS 7671 compliance checking, and professional PDF reports.',
];

const faqs = [
  {
    question: 'What does NICEIC stand for?',
    answer:
      'NICEIC stands for the National Inspection Council for Electrical Installation Contracting. It was established in 1956 as a consumer safety organisation and is now the UK\'s largest voluntary regulatory body for the electrical contracting industry. Despite the word "Council" in its name, NICEIC is not a government body — it is an independent organisation that assesses and registers electrical contractors to ensure they are competent to carry out work in accordance with BS 7671 (the IET Wiring Regulations). NICEIC is approved by the UK government as a competent person scheme operator under Part P of the Building Regulations in England and Wales, meaning work carried out by NICEIC-registered contractors can be self-certified without the need for separate Building Control approval.',
  },
  {
    question: 'How is NICEIC different from NAPIT and ELECSA?',
    answer:
      "NICEIC, NAPIT, and ELECSA are all government-approved competent person scheme operators. The key differences are in scale, reputation, and consumer protection. NICEIC is the largest scheme with approximately 40,000 registered contractors and the most widely recognised brand among consumers. NAPIT (National Association of Professional Inspectors and Testers) has approximately 10,000 registered contractors and offers a multi-trade registration service. ELECSA is a smaller scheme focused on electrical contractors. All three provide equivalent regulatory status — work certified under any of the three schemes is equally valid under Part P. The main practical difference for consumers is the complaints and guarantee procedure: NICEIC's Platinum Promise is one of the most comprehensive guarantee schemes in the industry. For electricians, the choice often comes down to assessment cost, frequency, and the registration benefits offered by each scheme.",
  },
  {
    question: 'What does the NICEIC Platinum Promise cover?',
    answer:
      "The Platinum Promise is NICEIC's consumer guarantee scheme. It provides cover for faulty workmanship carried out by a NICEIC Approved Contractor for a period of up to 6 years from the date the work was completed. If the work does not comply with BS 7671 or was not carried out in a workmanlike manner, and the original contractor cannot or will not rectify the problem, NICEIC will arrange for another registered contractor to complete the corrective work at no cost to the consumer. The guarantee covers the fixed electrical installation — wiring, consumer units, accessories, and associated equipment installed by the contractor. It does not cover portable appliances, manufacturer defects in products, or cosmetic damage unrelated to the electrical work. To make a claim, the consumer contacts NICEIC directly and provides details of the original work and the problem. NICEIC will investigate, and if the claim is valid, arrange for the corrective work to be carried out.",
  },
  {
    question: 'How often are NICEIC contractors assessed?',
    answer:
      "NICEIC-registered contractors are assessed at least once per year. The annual assessment is carried out by a NICEIC assessor who visits the contractor's premises and/or a recent job site. The assessment covers: review of recent electrical installation work (including certificates and test results); technical competence of the principal duty holder and any qualified staff; compliance with BS 7671 and the IET Guidance Notes; adequacy of test instruments (calibrated and in date); public liability insurance and employer's liability insurance (if applicable); and proper use of the correct certification forms. The assessor examines completed certificates, visits a sample of recent installations, and may carry out verification testing. If the contractor fails the assessment, NICEIC can require corrective action, additional training, or in serious cases, withdraw registration. The annual assessment cycle is a key differentiator of NICEIC registration — it provides ongoing quality assurance rather than a one-off check at the point of registration.",
  },
  {
    question: 'Can I check if an electrician is NICEIC registered?',
    answer:
      'Yes. NICEIC provides a free online "Find a Contractor" search tool on their website (niceic.com). You can search by postcode, company name, or contractor number to verify an electrician\'s current registration status. The search results show the contractor\'s registered name, address, registration type (Approved Contractor, Domestic Installer, etc.), and the categories of work they are registered to carry out. You can also call the NICEIC helpline to verify a contractor\'s status. Always check registration before hiring an electrician — an expired or withdrawn registration means the contractor cannot self-certify work under Part P, and any guarantee or complaints procedure will not apply. Be cautious of contractors who claim to be "NICEIC qualified" — the correct terminology is "NICEIC registered." NICEIC does not award qualifications; it assesses and registers contractors who already hold the appropriate qualifications.',
  },
  {
    question: 'What happens if a NICEIC electrician does poor work?',
    answer:
      'If you are unhappy with work carried out by a NICEIC-registered electrician, the first step is to raise the concern directly with the contractor and give them an opportunity to rectify the issue. If that does not resolve the problem, you can contact NICEIC directly to raise a formal complaint. NICEIC will review the complaint, and if necessary, arrange for an independent assessment of the work. If the assessment confirms that the work does not comply with BS 7671 or was not completed to a satisfactory standard, NICEIC can require the contractor to carry out corrective work at their own expense. If the contractor refuses or is unable to do so (for example, if they have ceased trading), NICEIC can arrange for another registered contractor to complete the work under the Platinum Promise guarantee. NICEIC also records complaints against contractors, and repeated complaints can lead to additional assessment visits, restrictions on registration, or withdrawal of registration.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone. AI board scanner, voice test entry, and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Legal requirements under the 2020 Regulations, penalties up to £30,000, and 5-year inspection cycle.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'What electrical work requires notification, competent person schemes, and Building Control.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-safety-at-home',
    title: 'Electrical Safety at Home',
    description: 'When to call an electrician, DIY limits, danger signs, and EICR for homeowners.',
    icon: Home,
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
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with 50+ structured training courses on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-niceic',
    heading: 'What Is NICEIC and Why Does It Matter?',
    content: (
      <>
        <p>
          NICEIC (the National Inspection Council for Electrical Installation Contracting) is the
          UK's largest independent voluntary regulatory body for the electrical contracting
          industry. Established in 1956, it was created with a single purpose: to protect consumers
          by ensuring that electrical work is carried out by competent contractors to safe
          standards.
        </p>
        <p>
          NICEIC is approved by the UK government as a competent person scheme operator under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          in England and Wales. This means that electrical work carried out by a NICEIC-registered
          contractor can be self-certified — the contractor can sign off their own work as complying
          with the Building Regulations, without the need for a separate inspection by Building
          Control.
        </p>
        <p>
          For consumers, choosing a NICEIC-registered electrician provides three key assurances: the
          contractor has been independently assessed as competent; the work is backed by a guarantee
          (the Platinum Promise); and if something goes wrong, there is a formal complaints
          procedure with teeth.
        </p>
        <p>
          With approximately 40,000 registered contractors, NICEIC is the most widely recognised
          electrical registration scheme in the UK. Estate agents, letting agents, insurance
          companies, and local authorities all recognise NICEIC certificates, and many will
          specifically request that electrical work is carried out by a NICEIC-registered
          contractor.
        </p>
      </>
    ),
  },
  {
    id: 'registration-types',
    heading: 'Types of NICEIC Registration',
    content: (
      <>
        <p>
          NICEIC offers several types of registration, each designed for different types of
          electrical work. Understanding the differences helps consumers choose the right contractor
          for their project.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Award className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Approved Contractor</h4>
                <p className="text-white text-sm leading-relaxed">
                  The highest level of NICEIC registration. Approved Contractors are assessed as
                  competent to design, install, inspect, test, and certify all types of electrical
                  work — domestic, commercial, and industrial. This is the registration most
                  commonly held by established electrical contracting firms.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Home className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Domestic Installer</h4>
                <p className="text-white text-sm leading-relaxed">
                  Designed for electricians who primarily carry out domestic work. Domestic
                  Installers are assessed as competent to install, inspect, test, and certify
                  electrical work in dwellings. This is the most common registration type for sole
                  traders and small firms working in the residential market.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Additional Specialist Categories</h4>
                <p className="text-white text-sm leading-relaxed">
                  NICEIC also offers registration for specialist work including EV charger
                  installation, solar PV, battery storage, fire alarm systems, and emergency
                  lighting. These are typically add-on categories to the main Approved Contractor or
                  Domestic Installer registration.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          When verifying a contractor's registration, check which categories they are registered
          for. An electrician registered as a Domestic Installer may not be assessed for commercial
          or industrial work, and vice versa.
        </p>
      </>
    ),
  },
  {
    id: 'quality-guarantee',
    heading: 'The Platinum Promise: Your Quality Guarantee',
    content: (
      <>
        <p>
          One of the strongest reasons to choose a NICEIC-registered electrician is the Platinum
          Promise — a consumer guarantee that covers faulty workmanship for up to 6 years from the
          date the work was completed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Covers non-compliant workmanship</strong> — if the installation does not
                comply with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>
                , NICEIC will arrange for corrective work at no cost to you.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection if the contractor ceases trading</strong> — even if the original
                electrician goes out of business, the guarantee remains valid. NICEIC will instruct
                another registered contractor to complete the corrective work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Independent investigation</strong> — if there is a dispute about whether the
                work is compliant, NICEIC will arrange an independent technical assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No cost to the consumer</strong> — the investigation and any corrective work
                arranged under the Platinum Promise are free for the consumer.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Platinum Promise applies to work carried out by NICEIC Approved Contractors. It gives
          homeowners, landlords, and businesses peace of mind that the electrical work in their
          property meets the required standards — and that there is a robust fallback if it does
          not.
        </p>
      </>
    ),
  },
  {
    id: 'how-assessment-works',
    heading: 'How the NICEIC Assessment Process Works',
    content: (
      <>
        <p>
          NICEIC registration is not a one-off check. Registered contractors undergo annual
          assessment to confirm that their competence, equipment, and working practices continue to
          meet the required standards. This ongoing scrutiny is what sets NICEIC apart from a simple
          qualification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual visit by a NICEIC assessor</strong> — the assessor visits the
                contractor's premises and/or a recent installation site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Review of recent certificates and test results</strong> — the assessor
                examines completed EICRs, EICs, and Minor Works Certificates to check they are
                filled in correctly and the test results are accurate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verification testing</strong> — the assessor may carry out independent
                testing on a recent installation to verify the contractor's recorded results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test instrument calibration</strong> — all test instruments must be within
                their calibration date and in proper working order.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance and qualifications check</strong> — public liability insurance,
                18th Edition qualification, and inspection and testing qualification must all be
                current.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If a contractor fails the assessment, NICEIC can require corrective action, place
          conditions on the registration, require additional training, or in serious cases, withdraw
          registration entirely. This means that a current NICEIC registration is a reliable
          indicator of ongoing competence — not just historical qualification.
        </p>
      </>
    ),
  },
  {
    id: 'complaints-procedure',
    heading: 'The NICEIC Complaints Procedure',
    content: (
      <>
        <p>
          If you have a problem with work carried out by a NICEIC-registered electrician, the
          complaints procedure provides a structured route to resolution:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Raise the issue with the contractor first.</strong> Give them a reasonable
              opportunity to inspect and rectify the problem. Many issues are resolved at this
              stage.
            </li>
            <li>
              <strong>Contact NICEIC if the contractor does not resolve it.</strong> Call the NICEIC
              helpline or submit a complaint through their website. Provide details of the work, the
              contractor's registration number, copies of certificates, and a description of the
              problem.
            </li>
            <li>
              <strong>NICEIC investigates.</strong> A NICEIC assessor will review the complaint and
              may arrange a site visit to inspect the work. If necessary, independent testing will
              be carried out.
            </li>
            <li>
              <strong>Corrective action is required.</strong> If the investigation confirms the work
              does not comply with BS 7671, NICEIC will require the contractor to carry out
              corrective work at their own expense. If the contractor refuses or is unable to do so,
              NICEIC arranges for another registered contractor to complete the work under the
              Platinum Promise.
            </li>
            <li>
              <strong>Records are kept.</strong> The complaint is recorded against the contractor's
              registration file. Repeated complaints trigger additional assessment and can lead to
              restricted or withdrawn registration.
            </li>
          </ol>
        </div>
        <p>
          This complaints procedure is one of the most significant benefits of choosing a
          NICEIC-registered electrician. An unregistered electrician who does poor work leaves you
          with no recourse other than civil court — which is expensive, slow, and uncertain.
        </p>
      </>
    ),
  },
  {
    id: 'niceic-vs-other-schemes',
    heading: 'NICEIC vs Other Competent Person Schemes',
    content: (
      <>
        <p>
          NICEIC is not the only competent person scheme in the UK. NAPIT (National Association of
          Professional Inspectors and Testers) and ELECSA are also government-approved scheme
          operators. All three provide equivalent regulatory status under Part P.
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">NICEIC</h3>
            <p className="text-white text-sm leading-relaxed">
              Largest scheme with approximately 40,000 registered contractors. Annual assessment
              visits. Platinum Promise guarantee (up to 6 years). Most widely recognised by
              consumers, estate agents, and insurance companies. Higher annual registration fee.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">NAPIT</h3>
            <p className="text-white text-sm leading-relaxed">
              Approximately 10,000 registered contractors. Multi-trade registration (electrical,
              gas, plumbing, ventilation). Assessment visits every 12 to 18 months. Insurance-backed
              warranty scheme. Generally lower annual fee than NICEIC.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">ELECSA</h3>
            <p className="text-white text-sm leading-relaxed">
              Smaller, electrical-only scheme. Annual assessment visits. Workmanship guarantee
              scheme. Competitive registration fees. Less widely recognised among consumers but
              equally valid under Part P.
            </p>
          </div>
        </div>
        <p>
          For consumers, the practical advice is simple: choose an electrician registered with any
          of the three government-approved schemes. All three assess competence, require annual
          assessment, and provide consumer protection. NICEIC's larger network and wider consumer
          recognition make it the most commonly requested scheme by landlords, letting agents, and
          insurance companies.
        </p>
      </>
    ),
  },
  {
    id: 'finding-registered-electrician',
    heading: 'How to Find a NICEIC-Registered Electrician',
    content: (
      <>
        <p>
          Finding a NICEIC-registered electrician is straightforward. NICEIC provides a free online
          search tool that lets you find registered contractors by postcode and verify their current
          registration status.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use the NICEIC "Find a Contractor" tool</strong> — visit niceic.com and
                search by your postcode to find registered contractors in your area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify the registration is current</strong> — check the contractor's name
                and registration number. An expired registration means they cannot self-certify work
                under Part P.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask for the NICEIC registration card</strong> — registered contractors carry
                an ID card showing their registration status, registration number, and the
                categories of work they are registered for.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get at least 3 quotes</strong> — a NICEIC-registered electrician should
                provide a written quote detailing the scope of work, the certificates that will be
                issued, and the total cost including VAT.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask about certificates</strong> — ensure the electrician will provide the
                correct certificate (EIC, Minor Works, or{' '}
                <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink>) on
                completion, with Building Control notification if the work is notifiable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Be cautious of electricians who claim to be "NICEIC qualified" — the correct term is
          "NICEIC registered." NICEIC does not award qualifications; it registers contractors who
          already hold the appropriate qualifications and pass the assessment.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Getting and Maintaining NICEIC Registration',
    content: (
      <>
        <p>
          NICEIC registration is a mark of professional credibility that opens doors to work with
          landlords, letting agents, housing associations, and commercial clients. The annual
          assessment process requires you to demonstrate that your certificates are completed
          correctly, your test results are accurate, and your installations comply with BS 7671.
        </p>
        <p>Elec-Mate is designed to help you meet and exceed these standards:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Assessment-Ready Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every certificate generated by Elec-Mate follows the BS 7671 Appendix 6 model
                  forms exactly. When the NICEIC assessor reviews your certificates, they will find
                  every field completed correctly — because the app validates each entry as you go.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Send className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Instant Certificate Delivery</h4>
                <p className="text-white text-sm leading-relaxed">
                  Send completed certificates to clients by email or WhatsApp directly from the app.
                  Professional PDF format, branded with your company details, and stored in the
                  cloud for easy retrieval at assessment time.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Keep your NICEIC assessment hassle-free"
          description="Join 430+ UK electricians creating assessment-ready certificates with Elec-Mate. AI board scanner, voice test entry, BS 7671 validation, and cloud-stored records. 7-day free trial."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function WhyChooseNICEICPage() {
  return (
    <GuideTemplate
      title="Why Choose a NICEIC Electrician | Consumer Guide"
      description="Complete guide to NICEIC registration for consumers. What NICEIC registration means, the Platinum Promise guarantee, complaints procedure, how assessment works, and how to find a registered electrician in your area."
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Consumer Guide"
      badgeIcon={Shield}
      heroTitle={
        <>
          Why Choose a NICEIC Electrician:{' '}
          <span className="text-yellow-400">The Consumer's Guide to Quality Assurance</span>
        </>
      }
      heroSubtitle="NICEIC is the UK's largest electrical contracting registration body. Every registered contractor is assessed annually, their work is backed by the Platinum Promise guarantee, and there is a formal complaints procedure if something goes wrong. This guide explains what NICEIC registration means and how to find a registered electrician."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About NICEIC"
      relatedPages={relatedPages}
      ctaHeading="Professional Certificates for Registered Electricians"
      ctaSubheading="Join 430+ UK electricians creating assessment-ready certificates with AI-powered tools. EICR, EIC, Minor Works — all following BS 7671 Appendix 6. 7-day free trial, cancel anytime."
    />
  );
}
