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
  BookOpen,
  Zap,
  Users,
  Star,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Qualifications', href: '/jib-gold-card' },
  { label: 'JIB Gold Card Guide', href: '/jib-gold-card' },
];

const tocItems = [
  { id: 'what-is-jib', label: 'What Is the JIB?' },
  { id: 'gold-card', label: 'The JIB Gold Card' },
  { id: 'how-to-get-it', label: 'How to Get the JIB Gold Card' },
  { id: 'card-types', label: 'All JIB Card Types' },
  { id: 'ecs-relationship', label: 'JIB and the ECS Card Scheme' },
  { id: 'why-employers-require-it', label: 'Why Employers Require It' },
  { id: 'cscs-comparison', label: 'JIB Card vs CSCS Card' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The JIB (Joint Industry Board) Gold Card is the benchmark qualification card for fully qualified electricians in the UK, demonstrating completion of an approved apprenticeship and Level 3 electrotechnical qualifications.',
  'To obtain a JIB Gold Card, you must pass the AM2 practical assessment and hold a Level 3 NVQ/SVQ in Electrotechnical Technology (or equivalent), plus the 18th Edition BS 7671 wiring regulations qualification.',
  'The JIB Gold Card is administered through the Electrotechnical Certification Scheme (ECS), which is the card scheme for the electrotechnical industry. JIB Gold is the highest standard ECS card.',
  'Most commercial and industrial electrical contractors, principal contractors, and main contractors on larger sites require operatives to hold a valid ECS card (JIB Gold Card for qualified electricians).',
  'The JIB Gold Card is distinct from the general CSCS (Construction Skills Certification Scheme) card — it specifically demonstrates electrotechnical competency, which CSCS cards do not.',
];

const faqs = [
  {
    question: 'What is the JIB Gold Card?',
    answer:
      'The JIB Gold Card is a qualification card issued by the Joint Industry Board for the Electrical Contracting Industry (JIB) through the Electrotechnical Certification Scheme (ECS). It is the benchmark card for fully qualified electricians in the UK. Holding a JIB Gold Card demonstrates that you have completed an industry-approved apprenticeship (or equivalent route), hold a Level 3 NVQ/SVQ in Electrotechnical Technology, have passed the AM2 practical assessment, and hold a current BS 7671 wiring regulations qualification.',
  },
  {
    question: 'What is the AM2 assessment?',
    answer:
      'The AM2 (Achievement Measurement 2) is a practical end-point assessment for electrical apprentices that tests competency in electrical installation work. It is administered by City and Guilds on behalf of the JIB and is typically taken at or near the end of an apprenticeship. The AM2 involves completing a series of practical installation tasks within a set time, followed by inspection, testing, and documentation of the work. Passing the AM2 is a key requirement for the JIB Gold Card.',
  },
  {
    question: 'How do I get a JIB Gold Card?',
    answer:
      'To obtain a JIB Gold Card, you must: (1) Hold a Level 3 NVQ/SVQ in Electrotechnical Technology (or an equivalent recognised qualification); (2) Pass the AM2 practical assessment (or hold an equivalent approved practical assessment); (3) Hold a current BS 7671 18th Edition qualification (e.g., City and Guilds 2382); (4) Apply through the ECS portal (ecscard.org.uk) with evidence of all qualifications. The JIB assesses your application and, if approved, issues the Gold Card. The card is valid for five years and must be renewed.',
  },
  {
    question: 'How much does a JIB Gold Card cost?',
    answer:
      'The JIB Gold Card (ECS card) costs approximately £30–£40 for a five-year card. The cost of the card itself is modest — the main investment is in obtaining the required qualifications (Level 3 NVQ, AM2, BS 7671). The AM2 assessment costs approximately £400–£600 depending on the assessment centre. Level 3 NVQ assessment costs vary by college and training provider.',
  },
  {
    question: 'Is the JIB Gold Card the same as an ECS card?',
    answer:
      'The JIB Gold Card is a type of ECS (Electrotechnical Certification Scheme) card. ECS is the card scheme for the electrotechnical industry, and different ECS card types reflect different levels of qualification and experience. The JIB Gold Card (also called the ECS Gold Card or Qualified Operative card) is the highest-grade ECS card for qualified electricians. The ECS scheme administers all JIB cards on behalf of the JIB.',
  },
  {
    question: 'Do I need a JIB Gold Card to work as an electrician?',
    answer:
      'You are not legally required to hold a JIB Gold Card to work as an electrician in the UK. However, the majority of commercial, industrial, and larger domestic employers and contractors require operatives to hold a valid ECS card appropriate to their grade. Without a JIB Gold Card (or other appropriate ECS card), you may be refused access to many commercial sites. For self-employed electricians working directly with domestic clients, the JIB Gold Card is less of a practical gating requirement, though it remains valuable as a credential.',
  },
  {
    question: 'What is the difference between a JIB Gold Card and a CSCS card?',
    answer:
      'A CSCS (Construction Skills Certification Scheme) card is a general construction industry competency card. A JIB Gold Card is an electrotechnical industry-specific card that demonstrates electrical qualification and competency. On many construction sites, a JIB Gold Card (or other ECS card) is accepted in place of a CSCS card for electrical operatives. The JIB Gold Card is a higher standard of sector-specific evidence than a standard CSCS skilled worker card. Always check the site\'s specific requirements — some sites accept either, others specify ECS.',
  },
  {
    question: 'How long is the JIB Gold Card valid?',
    answer:
      'The JIB Gold Card (ECS card) is valid for five years. Before it expires, you must renew it through the ECS portal. Renewal requires you to hold a current BS 7671 qualification (18th Edition, or whichever edition is current at renewal) and current First Aid at Work or Emergency First Aid at Work certificate (for some card grades). You should start the renewal process at least three months before expiry to avoid a lapse in card validity.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/ecs-card-guide',
    title: 'ECS Card Guide',
    description: 'All ECS card types explained — trainee, apprentice, qualified, technician, and manager.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/eca-membership-guide',
    title: 'ECA Membership Guide',
    description: 'The ECA trade body — technical helpline, legal support, and lobbying for UK electricians.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/part-p-self-certification',
    title: 'Part P Self-Certification Guide',
    description: 'How competent person schemes work and which domestic work is notifiable.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/niceic-vs-napit-comparison',
    title: 'NICEIC vs NAPIT Comparison',
    description: 'Compare the main UK electrical registration schemes for qualified electricians.',
    icon: Scale,
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
    id: 'what-is-jib',
    heading: 'What Is the JIB (Joint Industry Board)?',
    content: (
      <>
        <p>
          The JIB — Joint Industry Board for the Electrical Contracting Industry — is the
          body that sets employment and industrial relations standards for the electrical
          contracting sector in England, Wales, and Northern Ireland. Established in 1968,
          the JIB is jointly governed by the{' '}
          <SEOInternalLink href="/eca-membership-guide">ECA</SEOInternalLink>{' '}
          (representing employers) and Unite the Union (representing workers).
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Role of the JIB</strong> — the JIB sets the National Working Rules
                for the electrical contracting industry, including pay scales (graded by
                card type), holiday entitlements, and working conditions for electricians
                employed under JIB terms. JIB grading determines pay entitlements for
                operatives working for JIB-registered employers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Card grading system</strong> — the JIB operates a grading system
                for electrical operatives, with different card grades reflecting different
                levels of qualification and experience. The Gold Card is the highest
                standard operative grade, for fully qualified electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS administration</strong> — JIB cards are administered through
                the Electrotechnical Certification Scheme (ECS). The ECS portal is where
                you apply for, renew, and manage your JIB card.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'gold-card',
    heading: 'The JIB Gold Card: Qualified Operative',
    content: (
      <>
        <p>
          The JIB Gold Card (ECS Qualified Operative card) is the benchmark qualification
          card for fully qualified electricians in England, Wales, and Northern Ireland.
          It is the card that most employers mean when they say they require a "JIB card"
          or an "ECS card" for electrical operatives.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What it demonstrates</strong> — the Gold Card confirms that you
                hold a Level 3 NVQ/SVQ in Electrotechnical Technology (or equivalent),
                have passed the AM2 practical assessment, and hold a current BS 7671
                18th Edition qualification. It is the electrotechnical industry's equivalent
                of a professional licence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>JIB pay grade</strong> — the Gold Card corresponds to the Electrician
                pay grade under JIB National Working Rules. Electricians with a Gold Card
                working for JIB-registered employers are entitled to the JIB Electrician
                rate, which is reviewed annually and published on the JIB website.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Five-year validity</strong> — the Gold Card is valid for five years.
                Renewal requires a current BS 7671 qualification and, for some grades,
                a current first aid certificate. Apply for renewal through the ECS portal
                (ecscard.org.uk) before the expiry date.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-to-get-it',
    heading: 'How to Get the JIB Gold Card',
    content: (
      <>
        <p>
          There are two main routes to the JIB Gold Card — the apprenticeship route and the
          experienced worker route. Both require the same core qualifications but differ in
          how you demonstrate them.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Route 1 — Apprenticeship</strong> — complete an Electrotechnical
                apprenticeship (typically 4 years), achieving a Level 3 NVQ/SVQ in
                Electrotechnical Technology and passing the AM2 end-point assessment.
                Apprentices hold an ECS Apprentice card during training and upgrade to
                Gold Card on successful completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Route 2 — Experienced worker</strong> — if you are an experienced
                electrician who did not complete a formal apprenticeship, you can obtain
                a Level 3 NVQ/SVQ through on-the-job assessment (Portfolio of Evidence)
                and sit the AM2S (experienced worker practical assessment, equivalent to
                AM2). Combined with a current BS 7671 qualification, this qualifies you
                for the Gold Card.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications summary</strong> — Level 3 NVQ/SVQ
                Electrotechnical Technology (or equivalent such as City and Guilds 2365
                Level 3); AM2 or AM2S pass; City and Guilds 2382 (18th Edition BS 7671)
                or equivalent current wiring regulations qualification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Application</strong> — apply online through the ECS portal at
                ecscard.org.uk. Upload evidence of all qualifications. The JIB will verify
                your qualifications and issue the card if everything is in order. The
                physical card is posted to your registered address.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'card-types',
    heading: 'All JIB Card Types: From Apprentice to Technician',
    content: (
      <>
        <p>
          The JIB grading system includes several card types that reflect different stages
          of qualification and experience. Each card type corresponds to a different ECS
          card grade and a different JIB pay scale.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS Trainee card</strong> — for individuals starting out in the
                industry who are enrolled in an electrical training programme but have not
                yet begun a formal apprenticeship. Limited site access.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS Apprentice card (JIB grade: Apprentice)</strong> — for registered
                electrical apprentices. Held during the apprenticeship period. Pay is
                graded by year of apprenticeship. Upgraded to Gold Card on successful
                completion of Level 3 NVQ and AM2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS Provisional Operative card (JIB grade: Improver)</strong> —
                for electricians who hold Level 2 qualifications and are working towards
                Level 3. Recognised as an intermediate grade between apprentice and
                fully qualified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS Gold Card (JIB grade: Electrician)</strong> — the benchmark
                qualified operative card. Requires Level 3 NVQ/SVQ, AM2 pass, and
                current 18th Edition BS 7671 qualification. This is the "JIB Gold Card".
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS Technician card (JIB grade: Approved Electrician / Technician)</strong>
                — for qualified electricians with additional responsibilities or specialisms.
                Typically requires additional qualifications such as inspection and testing
                (C&G 2391), design qualifications, or equivalent experience.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS Manager/Professional card</strong> — for those in supervisory,
                management, or engineering roles. Requires degree-level or equivalent
                engineering qualifications.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ecs-relationship',
    heading: 'JIB and the ECS Card Scheme',
    content: (
      <>
        <p>
          The ECS (Electrotechnical Certification Scheme) is the card scheme that administers
          JIB cards for the electrotechnical industry. Understanding the relationship between
          JIB and ECS avoids common confusion.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS as the card scheme</strong> — ECS is the scheme that issues
                physical cards and manages the database. All JIB cards are ECS cards.
                The ECS is governed by a board including the JIB, ECA, Unite, and other
                industry stakeholders. Applications, renewals, and verification are all
                handled through the ECS portal (ecscard.org.uk).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>JIB as the qualification standard setter</strong> — the JIB
                determines what qualifications and experience are required for each card
                grade. The ECS administers the scheme; the JIB sets the standards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS for non-JIB disciplines</strong> — the ECS also issues cards
                for electrical operatives outside the JIB sector (Scotland uses SJIB —
                the Scottish Joint Industry Board — and ECS Scotland covers Scottish
                electricians). See the full{' '}
                <SEOInternalLink href="/ecs-card-guide">ECS Card Guide</SEOInternalLink>
                {' '}for all card types.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'why-employers-require-it',
    heading: 'Why Employers Require the JIB Gold Card',
    content: (
      <>
        <p>
          The JIB Gold Card is a near-universal requirement for electricians working on
          commercial, industrial, and public sector projects in England and Wales. There
          are several practical reasons why employers and principal contractors insist on it.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Proof of competency</strong> — the Gold Card provides instant,
                verifiable evidence that the operative holds the required qualifications.
                Site managers can verify a card's validity and grade instantly through
                the ECS portal or the CSCS Smart Check app.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and safety compliance</strong> — on CDM-regulated sites,
                principal contractors must ensure that all workers are competent for their
                role. Requiring JIB Gold Cards is the simplest way to demonstrate
                electrotechnical competency to HSE inspectors and clients.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance requirements</strong> — some commercial site insurance
                policies require that all electrical operatives hold valid ECS cards.
                Operatives without cards can invalidate site insurance in the event of
                an incident.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tendering requirements</strong> — public sector and commercial
                procurement frameworks often specify that all electrical operatives must
                hold valid JIB/ECS cards. Without them, electrical contractors may be
                disqualified from tendering.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cscs-comparison',
    heading: 'JIB Gold Card vs CSCS Card',
    content: (
      <>
        <p>
          The JIB Gold Card and CSCS cards serve similar purposes — proving competency on
          construction sites — but operate in different ways and carry different levels of
          sector-specific evidence.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CSCS</strong> — the Construction Skills Certification Scheme covers
                all construction trades. A CSCS skilled worker card for electrical work
                demonstrates that you hold a relevant Level 3 qualification, but does not
                require the AM2 practical assessment or a current BS 7671 qualification.
                It is less sector-specific than the JIB Gold Card.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>JIB Gold Card (ECS)</strong> — the electrotechnical industry's
                own card scheme, requiring AM2 pass and current 18th Edition qualification.
                More rigorous and sector-specific than CSCS. Most electrical contractors
                and sites specify ECS rather than generic CSCS for electrical operatives.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Site acceptance</strong> — most sites that accept CSCS cards will
                also accept JIB/ECS cards for electrical operatives. However, sites that
                specify ECS cards will not accept a standard CSCS card in its place.
                The JIB Gold Card offers a superset of the access provided by CSCS.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Managing Your Career and Certifications',
    content: (
      <>
        <p>
          The JIB Gold Card is the cornerstone qualification credential for a UK electrician's
          career. Alongside your card, maintaining up-to-date certification practices is essential
          — Elec-Mate helps qualified electricians produce professional, compliant certificates
          on every job.
        </p>
        <SEOAppBridge
          title="Professional certification tools for qualified electricians"
          description="Join 430+ UK electricians using Elec-Mate to complete EICRs, Minor Works Certificates, and Electrical Installation Certificates on their phone. AI board scanning, instant PDF generation, and automatic client delivery. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function JIBGoldCardPage() {
  return (
    <GuideTemplate
      title="JIB Gold Card UK | Electrician's Qualified Operative Card Guide"
      description="Complete guide to the JIB Gold Card — what it is, how to get it (AM2 + Level 3), all ECS card types explained, why employers require it, and how it compares to CSCS for UK electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Qualifications Guide"
      badgeIcon={Star}
      heroTitle={
        <>
          JIB Gold Card UK:{' '}
          <span className="text-yellow-400">Electrician's Qualified Operative Card Guide</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about the JIB Gold Card — what it is, how to get it (AM2 pass + Level 3 NVQ), all ECS card types, why employers require it, and how it compares to the CSCS card."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the JIB Gold Card"
      relatedPages={relatedPages}
      ctaHeading="Manage Your Electrical Certifications With Elec-Mate"
      ctaSubheading="Complete EICRs, Minor Works Certificates, and Electrical Installation Certificates on your phone. AI board scanning, instant PDF export, and automatic report delivery. 7-day free trial."
    />
  );
}
