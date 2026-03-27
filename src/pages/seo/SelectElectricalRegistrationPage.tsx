import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  PoundSterling,
  ClipboardCheck,
  Building2,
  Scale,
  MapPin,
  BookOpen,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Registration Schemes', href: '/select-electrical-registration' },
  { label: 'SELECT Electrical Registration Scotland', href: '/select-electrical-registration' },
];

const tocItems = [
  { id: 'what-is-select', label: 'What Is SELECT?' },
  { id: 'building-standards-scotland', label: 'Building Standards Scotland' },
  { id: 'how-select-works', label: 'How SELECT Registration Works' },
  { id: 'inspection-process', label: 'Inspection Process' },
  { id: 'why-it-matters', label: 'Why SELECT Matters in Scotland' },
  { id: 'costs', label: 'Registration Costs' },
  { id: 'select-vs-niceic', label: 'SELECT vs NICEIC in Scotland' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'SELECT (the Electrical Contractors\' Association of Scotland) is the principal trade association and approved scheme for electrical contractors working in Scotland.',
  'Scotland operates under Building Standards Scotland rather than Part P (which applies in England and Wales). SELECT\'s Approved Certifier of Construction scheme is the Scottish equivalent of Part P competent person schemes.',
  'SELECT membership is essential for Scottish electricians who want to self-certify electrical work under Building Standards Scotland without involving local authority building control on each project.',
  'SELECT registration requires an assessment of qualifications, work quality, and business competency. Annual assessments are required to maintain registration.',
  'SELECT also functions as a full trade body like ECA in England — offering technical helplines, legal support, BS 7671 guidance, and lobbying representation to the Scottish Parliament and UK government.',
];

const faqs = [
  {
    question: 'What is SELECT in Scotland?',
    answer:
      'SELECT is the Electrical Contractors\' Association of Scotland. Founded in 1900, it is Scotland\'s main trade body and approved scheme for electrical contractors. SELECT operates the Approved Certifier of Construction scheme for electrical work, which is the Scottish equivalent of Part P competent person schemes in England and Wales. SELECT members can self-certify notifiable electrical work under Building Standards Scotland without notifying local authority building control on each job.',
  },
  {
    question: 'Is Part P used in Scotland?',
    answer:
      'No. Part P of the Building Regulations applies in England and Wales only. Scotland operates under Building Standards (Scotland) Regulations, which have their own requirements for electrical work. The equivalent mechanism in Scotland is the Approved Certifier of Construction scheme, operated by SELECT and NAPIT Scotland among others. If you work in both Scotland and England, you need to understand both frameworks.',
  },
  {
    question: 'Do I need SELECT registration to work as an electrician in Scotland?',
    answer:
      'You do not legally require SELECT registration to work as an electrician in Scotland, but without scheme registration you cannot self-certify notifiable electrical work. Instead, you must notify the local authority building control department for each notifiable project, which adds cost and delay. For practically all domestic electrical work and much commercial work, SELECT registration is the standard requirement expected by Scottish homeowners, landlords, and main contractors.',
  },
  {
    question: 'How much does SELECT registration cost?',
    answer:
      'SELECT registration fees vary by company size and tier. For a sole trader, expect to pay approximately £400–£700/year including the annual assessment fee. SELECT offers a combined trade body membership and Approved Certifier registration in a single package. Contact SELECT directly at selectassociation.org for current pricing, as fees are reviewed annually.',
  },
  {
    question: 'What qualifications do I need for SELECT registration?',
    answer:
      'For SELECT Approved Certifier status, the responsible person must hold appropriate electrotechnical qualifications: typically a Level 3 SVQ/NVQ in Electrotechnical Technology (or equivalent), the current edition of BS 7671 (18th Edition, City and Guilds 2382 or equivalent), and inspection and testing qualifications (City and Guilds 2391 or equivalent). SELECT also requires that you carry appropriate insurance and have a working quality management system.',
  },
  {
    question: 'Does SELECT cover commercial and industrial work in Scotland?',
    answer:
      'Yes. SELECT registration covers domestic, commercial, and industrial electrical work in Scotland. The Approved Certifier of Construction scheme covers all notifiable electrical work under Building Standards Scotland, including new installations, alterations, and additions to existing installations in all building types.',
  },
  {
    question: 'Can I use my NICEIC registration instead of SELECT in Scotland?',
    answer:
      'NICEIC has an Approved Certifier of Construction arrangement that allows NICEIC Approved Contractors to self-certify notifiable work in Scotland. However, SELECT is the dominant scheme in Scotland and is more widely recognised by Scottish homeowners, local authorities, and main contractors. Many Scottish electricians prefer SELECT for its local identity and its role as a Scottish trade body lobbying the Scottish Parliament.',
  },
  {
    question: 'What benefits does SELECT membership give beyond scheme registration?',
    answer:
      'Beyond scheme registration, SELECT provides: a 24/7 technical helpline; a legal and commercial helpline; BS 7671 guidance specific to Scottish application; model contracts and documentation; health and safety resources; training and CPD events; representation to the Scottish Parliament and UK government on issues affecting Scottish electrical contractors; and a public contractor directory that helps consumers find SELECT-registered electricians.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/niceic-vs-napit-comparison',
    title: 'NICEIC vs NAPIT Comparison',
    description: 'Compare the England and Wales competent person schemes — costs, assessments, and consumer appeal.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/eca-membership-guide',
    title: 'ECA Membership Guide',
    description: 'The English equivalent trade body — technical support, legal helpline, and lobbying.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/part-p-self-certification',
    title: 'Part P Self-Certification Guide',
    description: 'How Part P works in England and Wales — and how Scotland differs.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/jib-gold-card',
    title: 'JIB Gold Card Guide',
    description: 'The JIB Gold Card — qualifications, card types, and why employers require it.',
    icon: ClipboardCheck,
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
    id: 'what-is-select',
    heading: 'What Is SELECT?',
    content: (
      <>
        <p>
          SELECT — the Electrical Contractors' Association of Scotland — is Scotland's principal
          trade association and approved scheme for electrical contractors. Founded in 1900 and
          headquartered in Edinburgh, SELECT has over 120 years of representing Scottish
          electrical contractors and has a membership of over 1,100 contracting businesses.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scotland-specific body</strong> — SELECT operates exclusively in
                Scotland. It is the Scottish equivalent of the{' '}
                <SEOInternalLink href="/eca-membership-guide">ECA</SEOInternalLink> in
                England, Wales, and Northern Ireland. The two organisations work
                collaboratively on shared UK-wide issues (such as BS 7671 and JIB matters)
                but operate independently in their respective nations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dual function</strong> — unlike NICEIC or NAPIT (which are primarily
                competent person schemes), SELECT combines the functions of a trade association
                (technical helpline, legal support, lobbying) and an approved certification
                scheme (Approved Certifier of Construction for Building Standards Scotland).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scottish Parliament engagement</strong> — SELECT has a dedicated
                presence at the Scottish Parliament and regularly engages with Scottish
                Government ministers and civil servants on energy policy, building
                regulations, and skills funding. This is a distinct advantage of SELECT
                over UK-wide bodies for contractors whose work is entirely in Scotland.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'building-standards-scotland',
    heading: 'Building Standards Scotland: The Scottish Equivalent of Part P',
    content: (
      <>
        <p>
          Scotland has its own building standards system, governed by the Building (Scotland)
          Act 2003 and the Building (Scotland) Regulations 2004. This is fundamentally different
          from the Building Regulations (England and Wales) framework under which{' '}
          <SEOInternalLink href="/part-p-self-certification">
            Part P operates
          </SEOInternalLink>
          .
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical Handbook</strong> — in Scotland, the Technical Handbooks
                (Domestic and Non-Domestic) set out the functional standards for building
                work. Section 4 of the Technical Handbook covers Safety, including electrical
                safety. The relevant standard is 4.5 (Electrical safety — adequate electrical
                installation).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notifiable work in Scotland</strong> — in Scotland, most electrical
                work in dwellings is notifiable work under Building Standards. This is broader
                than the Part P notifiable work list in England and Wales, meaning more work
                triggers notification obligations in Scotland.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved Certifier of Construction</strong> — Scotland's self-
                certification mechanism. Approved Certifiers can certify that their own
                electrical work complies with Building Standards without requiring verification
                by local authority building control on each job. SELECT operates the main
                Approved Certifier of Construction scheme for electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 still applies</strong> — despite the different regulatory
                framework, BS 7671 (IET Wiring Regulations) remains the technical standard
                for electrical installations in Scotland. Compliance with BS 7671 is how
                you demonstrate compliance with Standard 4.5 of the Technical Handbook.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-select-works',
    heading: 'How SELECT Registration Works',
    content: (
      <>
        <p>
          SELECT registration operates on an annual cycle. Registered members are known as
          SELECT Approved Contractors and can self-certify notifiable electrical work in
          Scotland through the Approved Certifier of Construction scheme.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Application</strong> — submit an application to SELECT with evidence
                of qualifications, insurance, and business details. SELECT will assess whether
                you meet the eligibility criteria before arranging an assessment visit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Initial assessment</strong> — a SELECT assessor visits to inspect
                sample installations. They verify workmanship quality, BS 7671 compliance,
                documentation systems, and test instrument calibration. This is similar to
                the assessment process used by NICEIC and NAPIT.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification process</strong> — once registered, you notify SELECT
                of completed notifiable work. SELECT issues an Approved Certifier completion
                certificate, which is submitted to the local authority verifier (the Scottish
                equivalent of building control). The homeowner receives a copy of the
                certificate confirming compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual renewal</strong> — SELECT registration is renewed annually.
                Renewal includes a desk-based check of insurance and qualifications, and
                periodic site assessments to verify ongoing work quality.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'inspection-process',
    heading: 'SELECT Assessment and Inspection Process',
    content: (
      <>
        <p>
          The SELECT assessment process is broadly similar to NICEIC and NAPIT assessments
          in England and Wales, but is conducted by SELECT assessors who are familiar with
          the specific requirements of Building Standards Scotland.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications check</strong> — the assessor verifies that the
                responsible person holds the required qualifications: Level 3 SVQ/NVQ
                Electrotechnical Technology (or equivalent), 18th Edition BS 7671
                (C&G 2382 or equivalent), and inspection and testing qualifications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work quality assessment</strong> — the assessor inspects a sample
                of recently completed installations for compliance with BS 7671 and
                workmanship standards. Documentation (minor works certificates, EICRs,
                electrical installation certificates) is also reviewed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test equipment calibration</strong> — all test instruments used for
                electrical inspection and testing must have current calibration certificates.
                SELECT verifies this at assessment. Calibration should be carried out at
                least annually by an accredited laboratory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Business systems</strong> — SELECT also checks that the business
                has appropriate management systems in place, including health and safety
                policies, quality management procedures, and insurance documentation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'why-it-matters',
    heading: 'Why SELECT Registration Matters in Scotland',
    content: (
      <>
        <p>
          SELECT registration is the de facto standard for professional electrical contractors
          in Scotland. Without it, you face practical and commercial disadvantages that make
          it very difficult to operate effectively in the Scottish market.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-certification capability</strong> — without SELECT (or another
                approved scheme) registration, you must notify the local authority verifier
                for every notifiable electrical job. This adds cost and delay that most
                clients find unacceptable for routine domestic work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Client requirements</strong> — Scottish homeowners, housing
                associations, and main contractors routinely require SELECT registration
                as a precondition of awarding electrical work. The SELECT quality mark
                is recognised and trusted across Scotland.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Property transactions</strong> — when a Scottish property is sold,
                evidence that notifiable electrical work was certified under the Approved
                Certifier scheme (via a SELECT completion certificate) is required. Without
                this, the property may face delays at conveyancing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord compliance</strong> — Scottish landlords are subject to
                the Repairing Standard, which requires electrical installations to be
                safe. EICR requirements for Scottish private landlords are set out in
                regulations and EICRs must be carried out by competent electricians. SELECT
                registration demonstrates competency.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'SELECT Registration Costs',
    content: (
      <>
        <p>
          SELECT registration fees cover both trade body membership and Approved Certifier
          of Construction scheme access in a single package. The following are approximate
          figures — always confirm current pricing with SELECT directly at selectassociation.org.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sole trader / small business</strong> — approximately £400–£700/year
                including annual assessment. This covers the full SELECT membership and
                Approved Certifier scheme access.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium business</strong> — fees scale with company size and number
                of registered operatives. Medium contractors typically pay £800–£1,500/year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Initial assessment fee</strong> — there is typically an initial
                assessment fee separate from the annual membership fee. This covers the
                cost of the assessor's site visit and evaluation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Per-certificate notification fees</strong> — SELECT charges a small
                fee for each Approved Certifier completion certificate issued. This is
                typically built into the cost of the job and is modest (a few pounds per
                certificate).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'select-vs-niceic',
    heading: 'SELECT vs NICEIC in Scotland',
    content: (
      <>
        <p>
          Both SELECT and NICEIC (through its Approved Certifier of Construction arrangement)
          can be used by electricians working in Scotland. For most Scottish electricians,
          SELECT is the natural choice for several practical reasons.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local recognition</strong> — SELECT is the most recognised electrical
                scheme in Scotland. Scottish homeowners, housing associations, and public
                sector clients are more likely to recognise SELECT than NICEIC. For purely
                Scottish work, SELECT's local brand advantage is significant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Trade body function</strong> — SELECT provides Scottish Parliament
                engagement and Scottish-specific technical and legal support that NICEIC
                (as a competent person scheme rather than a trade body) does not. For
                contractors who value representation and commercial support, SELECT offers
                more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cross-border contractors</strong> — electricians who work regularly
                in both Scotland and England may find it pragmatic to hold both SELECT
                (for Scotland) and{' '}
                <SEOInternalLink href="/niceic-vs-napit-comparison">
                  NICEIC or NAPIT
                </SEOInternalLink>{' '}
                (for England and Wales). This avoids any gaps in self-certification
                capability on either side of the border.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Managing SELECT Registration and Certifications',
    content: (
      <>
        <p>
          SELECT registration requires you to maintain accurate documentation for every
          notifiable installation — EICRs, Electrical Installation Certificates, and Minor
          Works Certificates. Elec-Mate's on-site certification tools help SELECT-registered
          electricians produce compliant documentation efficiently.
        </p>
        <SEOAppBridge
          title="Certificate management for SELECT-registered electricians"
          description="Join 430+ UK electricians using Elec-Mate to complete EICRs, Minor Works Certificates, and Electrical Installation Certificates on site. AI board scanning, instant PDF generation, and automatic client delivery. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SelectElectricalRegistrationPage() {
  return (
    <GuideTemplate
      title="SELECT Electrical Registration Scotland | Approved Contractor Guide"
      description="Complete guide to SELECT electrical registration in Scotland — Building Standards Scotland explained, how the Approved Certifier scheme works, inspection process, costs, and SELECT vs NICEIC for Scottish electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Scotland Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          SELECT Electrical Registration Scotland:{' '}
          <span className="text-yellow-400">Approved Contractor Guide</span>
        </>
      }
      heroSubtitle="Everything Scottish electricians need to know about SELECT registration — Building Standards Scotland, the Approved Certifier of Construction scheme, assessment process, costs, and why SELECT matters for working in Scotland."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About SELECT Electrical Registration"
      relatedPages={relatedPages}
      ctaHeading="Manage Your Certifications With Elec-Mate"
      ctaSubheading="Complete EICRs, Minor Works Certificates, and Electrical Installation Certificates on your phone. AI board scanning, instant PDF export, and automatic report delivery. 7-day free trial."
    />
  );
}
