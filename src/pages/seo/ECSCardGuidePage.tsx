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
  RefreshCw,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Qualifications', href: '/ecs-card-guide' },
  { label: 'ECS Card Guide', href: '/ecs-card-guide' },
];

const tocItems = [
  { id: 'what-is-ecs', label: 'What Is the ECS?' },
  { id: 'card-types', label: 'All ECS Card Types' },
  { id: 'how-to-apply', label: 'How to Apply' },
  { id: 'evidence', label: 'Evidence Requirements' },
  { id: 'renewal', label: 'Renewal Process' },
  { id: 'ecs-vs-cscs', label: 'ECS Card vs CSCS Card' },
  { id: 'site-access', label: 'Why You Need It on Site' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The ECS (Electrotechnical Certification Scheme) is the dedicated card scheme for the UK electrotechnical industry, covering electricians, electrical engineers, and related specialists.',
  'ECS card types reflect different levels of qualification and experience, from Trainee and Apprentice cards through to Qualified Operative (Gold Card), Technician, and Manager/Professional.',
  'ECS cards are valid for five years and must be renewed before expiry. Renewal requires a current BS 7671 18th Edition qualification for most card grades.',
  'The ECS card is the industry-specific alternative to a CSCS card for electrical operatives. Most electrical sites and employers specify ECS rather than generic CSCS for electricians.',
  'Applications and renewals are managed through the ECS online portal at ecscard.org.uk. Cards can be verified instantly by employers and site managers through the portal or the CSCS Smart Check app.',
];

const faqs = [
  {
    question: 'What is the ECS card scheme?',
    answer:
      'The ECS (Electrotechnical Certification Scheme) is the card scheme for the UK electrotechnical industry. It issues identification and competency cards to electricians, electrical engineers, and other electrotechnical workers, confirming that they hold the qualifications appropriate to their grade. ECS is administered on behalf of the industry by the JIB (Joint Industry Board) in England, Wales, and Northern Ireland, and by the SJIB (Scottish Joint Industry Board) in Scotland. Applications and renewals are managed through ecscard.org.uk.',
  },
  {
    question: 'What are all the ECS card types?',
    answer:
      'ECS card types include: Trainee card (no formal qualifications yet); Apprentice card (registered apprentice, during training); Provisional Operative / Improver card (Level 2 qualifications, working towards Level 3); Qualified Operative / Gold Card (Level 3 NVQ/SVQ + AM2 pass + current 18th Edition); Approved Electrician / Technician card (Gold Card plus additional qualifications such as inspection and testing); Manager/Professional card (degree-level engineering qualifications); and several specialist cards for roles such as EV charging installation, fire alarm installation, and highway electrical work.',
  },
  {
    question: 'How do I apply for an ECS card?',
    answer:
      'Apply online at ecscard.org.uk. Create an account, select the card type appropriate to your qualifications and grade, upload evidence of your qualifications (NVQ certificates, AM2 results, BS 7671 qualification, and any other required documents), and pay the card fee (approximately £30–£40 for a five-year card). The JIB or SJIB will verify your qualifications and issue the card by post. Allow two to three weeks for processing.',
  },
  {
    question: 'How long does an ECS card last?',
    answer:
      'ECS cards are valid for five years. You must renew before the expiry date to avoid a lapse. To renew, you must hold a current BS 7671 wiring regulations qualification (for most card grades) and, for some grades, a current first aid certificate. Start the renewal process at least three months before expiry — this gives time to update qualifications if needed.',
  },
  {
    question: 'What qualifications do I need for the ECS Gold Card?',
    answer:
      'For the ECS Gold Card (Qualified Operative / JIB Electrician grade), you need: a Level 3 NVQ/SVQ in Electrotechnical Technology (or equivalent, such as City and Guilds 2365 Level 3); a pass on the AM2 practical assessment (or AM2S for experienced workers); and a current BS 7671 18th Edition qualification (City and Guilds 2382 or equivalent). All three are required — holding only two will result in a lower grade card.',
  },
  {
    question: 'Is an ECS card the same as a CSCS card?',
    answer:
      'No. ECS and CSCS are separate schemes. ECS is the electrotechnical industry-specific scheme; CSCS is a general construction industry scheme covering all trades. ECS cards are more rigorous and sector-specific for electrical work — they require AM2 and current BS 7671 qualifications that CSCS cards do not. On construction sites, an ECS card is accepted for electrical operatives wherever CSCS is required, but an ECS site may not accept a general CSCS card in place of an ECS card.',
  },
  {
    question: 'Can I verify an ECS card?',
    answer:
      'Yes. ECS cards can be verified instantly through the ECS portal at ecscard.org.uk, or by using the CSCS Smart Check app (scan the QR code on the card). Verification confirms the card grade, the holder\'s name, the card expiry date, and the qualifications on record. Site managers and employers routinely verify cards before allowing operatives on site.',
  },
  {
    question: 'Do I need an ECS card if I am self-employed?',
    answer:
      'If you are a self-employed electrician working on domestic jobs directly for homeowners, you may not encounter a practical requirement to produce an ECS card for every job. However, if you subcontract to electrical contractors, work on commercial sites, or carry out work for housing associations or public sector clients, you will almost certainly be required to produce a valid ECS card. Holding a Gold Card also demonstrates your qualifications to potential clients and supports your professional credibility.',
  },
  {
    question: 'What is the SJIB card for Scotland?',
    answer:
      'In Scotland, the equivalent of the JIB card is the SJIB (Scottish Joint Industry Board) card, administered through ECS Scotland. Scottish electricians who complete an apprenticeship through the SJIB route receive an SJIB card rather than a JIB card. The card grades and qualification requirements are broadly similar, and SJIB cards are accepted on construction sites in Scotland in the same way JIB cards are accepted in England and Wales.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/jib-gold-card',
    title: 'JIB Gold Card Guide',
    description: 'The JIB Gold Card in detail — AM2, Level 3 qualifications, and why employers require it.',
    icon: Star,
    category: 'Guide',
  },
  {
    href: '/eca-membership-guide',
    title: 'ECA Membership Guide',
    description: 'The ECA trade body — technical helpline, legal support, and lobbying for UK contractors.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/part-p-self-certification',
    title: 'Part P Self-Certification Guide',
    description: 'How competent person schemes work and which domestic work is notifiable under Part P.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/niceic-vs-napit-comparison',
    title: 'NICEIC vs NAPIT Comparison',
    description: 'Compare the main UK electrical registration schemes for self-certification.',
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
    id: 'what-is-ecs',
    heading: 'What Is the Electrotechnical Certification Scheme (ECS)?',
    content: (
      <>
        <p>
          The ECS (Electrotechnical Certification Scheme) is the dedicated card scheme for
          the UK electrotechnical industry. It provides identification and competency cards
          to electricians, electrical engineers, and other electrotechnical workers, confirming
          that they hold the qualifications and experience appropriate to their grade.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industry governance</strong> — ECS is administered on behalf of
                the electrotechnical industry by the{' '}
                <SEOInternalLink href="/jib-gold-card">JIB</SEOInternalLink>{' '}
                (Joint Industry Board) in England, Wales, and Northern Ireland, and by
                the SJIB (Scottish Joint Industry Board) in Scotland. The ECS board
                includes representatives from the JIB, ECA, Unite the Union, and other
                industry stakeholders.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Role of the ECS</strong> — the ECS manages the card database,
                issues physical cards, processes applications and renewals, and provides
                the verification system that site managers and employers use to check
                operatives' qualifications. Applications are made through the ECS portal
                at ecscard.org.uk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Registered cardholders</strong> — the ECS scheme has several
                hundred thousand registered cardholders across the UK electrotechnical
                sector, making it one of the largest trade-specific card schemes in
                the construction industry.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'card-types',
    heading: 'All ECS Card Types Explained',
    content: (
      <>
        <p>
          The ECS operates a graded card system with different card types for different
          levels of qualification and experience. Each card type has specific eligibility
          requirements and a corresponding JIB pay grade for employed operatives.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Trainee card</strong> — for individuals enrolled in an electrical
                training programme who have not yet begun a formal apprenticeship. Allows
                limited site access under supervision. Does not require formal qualifications
                but requires enrolment with a recognised training provider.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apprentice card</strong> — for registered electrical apprentices
                during their apprenticeship. Issued when an apprenticeship is registered
                with the JIB. Upgraded to a higher grade on successful completion of
                Level 3 NVQ and AM2 assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provisional Operative card (Improver grade)</strong> — for
                electricians holding Level 2 electrotechnical qualifications who are
                working towards Level 3. This is an intermediate grade recognised as
                being above apprentice but below fully qualified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualified Operative card — Gold Card (Electrician grade)</strong>
                — the benchmark card for fully qualified electricians. Requires Level 3
                NVQ/SVQ in Electrotechnical Technology, AM2 or AM2S pass, and current
                BS 7671 18th Edition qualification. This is what people mean by the
                "JIB Gold Card".
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technician card (Approved Electrician / Technician grade)</strong>
                — for qualified electricians with additional specialist qualifications
                or responsibilities. Typically requires the Gold Card plus inspection
                and testing qualifications (City and Guilds 2391 or equivalent) or
                other specialist qualifications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manager/Professional card</strong> — for those in engineering,
                management, or design roles. Requires degree-level or equivalent
                professional engineering qualifications. Covers electrical engineers,
                project managers, and senior technical staff.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist cards</strong> — ECS also issues specialist cards
                for defined disciplines including: EV charge point installation;
                fire alarm installation (tied to BS 5839); highway electrical work;
                solar PV installation; and others. Each specialist card requires
                evidence of discipline-specific qualifications.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-to-apply',
    heading: 'How to Apply for an ECS Card',
    content: (
      <>
        <p>
          All ECS card applications are made online through the ECS portal. The process is
          straightforward but requires you to have your qualification certificates ready
          to upload.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — Create an account</strong> — register at ecscard.org.uk.
                You will need a valid email address and basic personal details including
                your National Insurance number.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — Select your card type</strong> — choose the ECS card
                grade appropriate to your qualifications. The portal guides you through
                the eligibility criteria for each card type. If you are unsure which
                card to apply for, start with the one that matches your highest confirmed
                qualification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — Upload evidence</strong> — upload scanned copies or
                clear photographs of all required qualification certificates. The specific
                evidence required depends on your card type. See the evidence requirements
                section below.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — Pay the card fee</strong> — approximately £30–£40 for
                a five-year card, payable by card online. The fee covers the physical
                card and database registration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 5 — Wait for processing</strong> — the JIB verifies your
                qualifications, typically within 5–10 working days. The physical card
                is posted to your registered address and usually arrives within two to
                three weeks of a successful application.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'evidence',
    heading: 'Evidence Requirements for Each Card Type',
    content: (
      <>
        <p>
          The ECS verifies all qualification claims before issuing cards. You must be able
          to provide original certificates or verified copies of all required qualifications.
          The specific evidence requirements by card type are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gold Card (Qualified Operative)</strong> — Level 3 NVQ/SVQ
                Electrotechnical Technology certificate (or equivalent); AM2 or AM2S
                results certificate; current BS 7671 18th Edition qualification certificate
                (City and Guilds 2382 or equivalent). All three are mandatory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technician card</strong> — all Gold Card evidence plus additional
                qualification evidence relevant to the technician specialism (e.g., City
                and Guilds 2391 Inspection and Testing certificate for inspection and
                testing specialists).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apprentice card</strong> — proof of JIB-registered apprenticeship
                (apprenticeship agreement or employer confirmation). No NVQ certificate
                required as this is obtained during the apprenticeship.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manager/Professional card</strong> — degree certificate or
                equivalent professional engineering qualification; evidence of professional
                body membership (e.g., IET) may be required for some grades.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All qualification certificates must be from recognised awarding bodies (City and
          Guilds, EAL, Pearson/BTEC, or equivalent). Certificates from overseas qualifications
          may require verification through the relevant UK equivalency process — contact the
          ECS for guidance.
        </p>
      </>
    ),
  },
  {
    id: 'renewal',
    heading: 'ECS Card Renewal',
    content: (
      <>
        <p>
          ECS cards expire after five years and must be renewed to maintain site access and
          professional status. Failing to renew on time means your card will lapse and you
          will not be able to work on sites that require a valid ECS card.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When to renew</strong> — start the renewal process at least three
                months before your card expires. This gives time to update qualifications
                if your BS 7671 certificate has also lapsed (18th Edition certificates
                typically expire after five years — check your certificate's expiry date).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Renewal requirements</strong> — for the Gold Card and most other
                grades, renewal requires a current BS 7671 18th Edition qualification.
                If your BS 7671 certificate has lapsed, you must re-sit before renewing
                your ECS card. Some card grades also require a current first aid certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Renewal process</strong> — log in to your ECS account at
                ecscard.org.uk, select 'renew card', upload updated qualification evidence,
                and pay the renewal fee. The renewal fee is the same as the initial card
                fee (approximately £30–£40).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lapsed cards</strong> — if your card has lapsed, you can still
                renew through the ECS portal with current qualification evidence. A lapsed
                card is not automatically cancelled — you simply cannot use it for site
                access until it is renewed. Renewing a recently lapsed card is straightforward;
                very old lapsed cards may require re-application.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ecs-vs-cscs',
    heading: 'ECS Card vs CSCS Card: Key Differences',
    content: (
      <>
        <p>
          Both ECS and CSCS cards are used on UK construction sites as competency evidence.
          Understanding the differences helps electricians know which card to hold and what
          sites will accept.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sector specificity</strong> — ECS is exclusively for the
                electrotechnical industry. CSCS covers the whole construction sector
                (bricklayers, carpenters, plumbers, electricians, and many others).
                An ECS card contains electrotechnical-specific qualification evidence;
                a CSCS card does not.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualification rigour</strong> — the ECS Gold Card requires
                AM2 practical assessment and a current BS 7671 qualification. The equivalent
                CSCS skilled worker card for electrical work requires a Level 3 qualification
                but not the AM2 or a current BS 7671 qualification. ECS is therefore more
                rigorous for electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Site acceptance</strong> — ECS cards are accepted on all sites
                that require CSCS for electrical operatives. Sites that specifically require
                ECS cards may not accept a CSCS card. When in doubt about which to hold,
                the ECS card is the correct choice for electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verification</strong> — both CSCS and ECS cards can be verified
                using the CSCS Smart Check app (which covers both schemes). Employers can
                scan the QR code on any card to confirm its validity and grade.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'site-access',
    heading: 'Why You Need an ECS Card on Site',
    content: (
      <>
        <p>
          The practical requirement to produce a valid ECS card is widespread across the UK
          electrical contracting industry. Here is why it matters and when you will encounter it.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial and industrial sites</strong> — virtually all commercial
                and industrial construction sites require operatives to produce a valid
                ECS card before being allowed on site. Gate checks are standard. Arriving
                without a valid card will result in being turned away.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Subcontracting</strong> — electrical contractors who subcontract
                from main contractors are typically required by their subcontract agreement
                to ensure all operatives carry valid ECS cards. This is a standard clause
                in JCT and NEC subcontracts for electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public sector frameworks</strong> — government, local authority,
                housing association, and NHS procurement frameworks frequently specify
                ECS card requirements for all electrical operatives. Failure to comply
                risks removal from the framework.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance</strong> — some commercial site insurance policies
                require proof that all electrical operatives hold current ECS cards.
                An incident involving an operative without a valid card could complicate
                an insurance claim.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Keeping Your ECS Card Current',
    content: (
      <>
        <p>
          Maintaining a current ECS card and producing compliant certification on every job
          are two cornerstones of professional electrical contracting. Elec-Mate helps
          ECS-registered electricians manage the certification and documentation side of
          their business efficiently.
        </p>
        <SEOAppBridge
          title="Professional certificate management for ECS cardholders"
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

export default function ECSCardGuidePage() {
  return (
    <GuideTemplate
      title="ECS Card Guide UK | Electrotechnical Certification Scheme"
      description="Complete guide to ECS cards for UK electricians — all card types (trainee, apprentice, qualified, technician, manager), how to apply, evidence requirements, renewal, and how ECS differs from CSCS."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Qualifications Guide"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          ECS Card Guide UK:{' '}
          <span className="text-yellow-400">Electrotechnical Certification Scheme Explained</span>
        </>
      }
      heroSubtitle="A complete guide to ECS cards for UK electricians — all card types from Trainee to Manager, how to apply, what evidence you need, renewal requirements, and why ECS differs from CSCS."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the ECS Card Scheme"
      relatedPages={relatedPages}
      ctaHeading="Manage Your Electrical Certifications With Elec-Mate"
      ctaSubheading="Complete EICRs, Minor Works Certificates, and Electrical Installation Certificates on your phone. AI board scanning, instant PDF export, and automatic report delivery. 7-day free trial."
    />
  );
}
