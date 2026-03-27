import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  PoundSterling,
  ClipboardCheck,
  Users,
  Building2,
  Scale,
  BookOpen,
  Zap,
  Phone,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Trade Bodies', href: '/eca-membership-guide' },
  { label: 'ECA Membership Guide', href: '/eca-membership-guide' },
];

const tocItems = [
  { id: 'what-is-eca', label: 'What Is the ECA?' },
  { id: 'membership-benefits', label: 'Membership Benefits' },
  { id: 'eligibility', label: 'Eligibility Requirements' },
  { id: 'cost-tiers', label: 'Cost Tiers by Company Size' },
  { id: 'member-vs-approved', label: 'Member vs Approved Contractor' },
  { id: 'eca-vs-select-niceic', label: 'ECA vs SELECT vs NICEIC' },
  { id: 'wiring-regulations', label: 'Wiring Regulations Support' },
  { id: 'lobbying', label: 'Industry Lobbying and Representation' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Contractors Association (ECA) is the UK\'s leading trade association for electrotechnical businesses. Founded in 1901, it represents electrical contractors across England, Wales, and Northern Ireland.',
  'ECA membership provides access to a 24/7 technical helpline, legal advice service, BS 7671 wiring regulations guidance, contract templates, and lobbying representation to government.',
  'Membership fees are tiered by company turnover, starting from approximately £300–£500/year for the smallest businesses and rising into thousands of pounds for larger contractors.',
  'ECA Approved Contractor status (which includes a scheme assessment) is separate from standard ECA membership and allows self-certification under Part P.',
  'The ECA is not the same as SELECT (which covers Scotland) or NICEIC/NAPIT (which are primarily competent person schemes). ECA is a trade association with a broader remit.',
];

const faqs = [
  {
    question: 'What does ECA membership give you?',
    answer:
      'ECA membership provides electrical contractors with a range of benefits including: access to a 24/7 technical helpline staffed by qualified engineers; a legal and commercial helpline for contract disputes, employment law, and debt recovery; BS 7671 wiring regulations guidance and early access to amendments; model contract documents; health and safety resources; preferential insurance rates through ECA preferred brokers; industry training and CPD events; and lobbying representation to government and industry bodies on behalf of the electrical contracting sector.',
  },
  {
    question: 'How much does ECA membership cost?',
    answer:
      'ECA membership fees are based on annual company turnover. For the smallest businesses (under £100,000 turnover), expect to pay approximately £300–£500/year. Mid-size contractors (£500,000–£2 million turnover) typically pay £800–£1,500/year. Larger contractors and specialist firms pay more. ECA does not publish a fixed price list publicly, so you must request a quote from the ECA directly. Discounts are available for first-year members.',
  },
  {
    question: 'What is ECA Approved Contractor status?',
    answer:
      'ECA Approved Contractor is a separate, higher tier of recognition that includes an assessment of the contractor\'s work quality and management systems. It is the ECA\'s equivalent of NICEIC Approved Contractor. ECA Approved Contractor status allows self-certification of notifiable electrical work under Part P (through the ECA\'s approved competent person scheme partnership) and demonstrates a higher level of assessed quality to clients.',
  },
  {
    question: 'Can I be a member of both ECA and NICEIC?',
    answer:
      'Yes. ECA membership and NICEIC registration serve different purposes and are not mutually exclusive. Many ECA members are also NICEIC or NAPIT registered. ECA membership provides trade body benefits (technical helpline, legal support, lobbying); NICEIC or NAPIT registration provides the competent person scheme mechanism for Part P self-certification. Some contractors hold all three.',
  },
  {
    question: 'What is the difference between ECA and SELECT?',
    answer:
      'The ECA (Electrical Contractors Association) covers England, Wales, and Northern Ireland. SELECT (the Electrical Contractors\' Association of Scotland) is the equivalent trade association for Scotland. They are sister organisations with similar remits but operate independently. If you work in Scotland, SELECT membership is the relevant trade body. If you work across the border in both England and Scotland, you could in theory join both, though in practice most contractors choose the body relevant to where the majority of their work is located.',
  },
  {
    question: 'Does ECA membership replace the need for NICEIC or NAPIT registration?',
    answer:
      'Standard ECA membership does not replace the need for a competent person scheme registration such as NICEIC or NAPIT if you carry out notifiable domestic electrical work in England and Wales. However, ECA Approved Contractor status (a higher tier requiring assessment) does include Part P self-certification capability through ECA\'s approved scheme. Check with the ECA whether your membership tier includes Part P self-certification.',
  },
  {
    question: 'What lobbying does the ECA do?',
    answer:
      'The ECA actively lobbies government, industry regulators, and standards bodies on behalf of UK electrical contractors. Key areas include: influence over BS 7671 amendments through participation on IET wiring regulations committees; representation to government on building regulations reform; advocacy on employment and commercial contract law affecting contractors; lobbying on training and apprenticeship funding; and engagement with the Construction Industry Training Board (CITB) on levy and grant arrangements.',
  },
  {
    question: 'Is ECA membership worth it for a sole trader electrician?',
    answer:
      'For sole traders, the value of ECA membership depends heavily on how often you use the technical helpline and legal support. If you regularly encounter complex wiring regulations queries or commercial disputes, the helpline alone can justify the annual cost. If your work is straightforward domestic installation and you have other routes to technical advice, standard ECA membership may offer less value than for a larger contracting business. ECA Approved Contractor status adds more practical benefit through the competent person scheme access and quality mark.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/niceic-vs-napit-comparison',
    title: 'NICEIC vs NAPIT Comparison',
    description: 'Compare the UK\'s two main competent person schemes — costs, assessments, and consumer appeal.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/select-electrical-registration',
    title: 'SELECT Electrical Registration Scotland',
    description: 'The Scottish trade body equivalent of ECA — how SELECT works north of the border.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/part-p-self-certification',
    title: 'Part P Self-Certification Guide',
    description: 'How competent person schemes work and what notifiable work requires registration.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/jib-gold-card',
    title: 'JIB Gold Card Guide',
    description: 'How to get the JIB Gold Card — AM2, Level 3 qualifications, and card types explained.',
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
    id: 'what-is-eca',
    heading: 'What Is the Electrical Contractors Association (ECA)?',
    content: (
      <>
        <p>
          The Electrical Contractors Association (ECA) is the UK's leading trade association
          for businesses working in the electrotechnical, engineering services, and related
          building services sectors. Founded in 1901, the ECA has over 120 years of history
          representing electrical contractors across England, Wales, and Northern Ireland.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Trade association, not a certification scheme</strong> — the ECA is
                primarily a trade body rather than a competent person scheme. This is an
                important distinction: the ECA represents the interests of electrical
                contractors politically and commercially, whereas NICEIC and{' '}
                <SEOInternalLink href="/niceic-vs-napit-comparison">NAPIT</SEOInternalLink>{' '}
                are certification bodies that allow self-certification under Part P.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Coverage area</strong> — the ECA covers England, Wales, and Northern
                Ireland. For Scotland, the equivalent body is{' '}
                <SEOInternalLink href="/select-electrical-registration">SELECT</SEOInternalLink>{' '}
                (the Electrical Contractors' Association of Scotland). The two organisations
                work collaboratively on UK-wide industry issues.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Membership breadth</strong> — the ECA represents businesses ranging
                from sole traders to major national contractors with thousands of employees.
                Members include general electrical contractors, specialist contractors, and
                businesses in building services engineering, facilities management, and
                utilities sectors.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'membership-benefits',
    heading: 'What ECA Membership Gives You',
    content: (
      <>
        <p>
          ECA membership provides a comprehensive range of support services designed to help
          electrical contractors run their businesses more effectively and safely. The core
          benefits include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>24/7 technical helpline</strong> — access to qualified electrical
                engineers who can answer technical queries about BS 7671, circuit design,
                test procedures, and complex installation scenarios. This is one of the
                most valued ECA member benefits — particularly useful for non-standard
                situations not clearly covered by the wiring regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Legal and commercial helpline</strong> — access to legal advisers
                specialising in construction and electrical contractor law. Covers contract
                disputes, payment issues, debt recovery, employment law, and health and
                safety regulatory queries. Available during business hours with out-of-hours
                emergency legal cover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 guidance and updates</strong> — ECA members receive early
                notification of wiring regulations amendments and guidance on their
                practical implications. ECA technical staff participate in IET wiring
                regulations committee work, giving members an inside track on upcoming changes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contract documents and templates</strong> — ECA model forms of
                contract, subcontract agreements, and variation order templates. These are
                designed specifically for the electrotechnical sector and are regularly
                updated to reflect legal changes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and safety resources</strong> — RAMS templates, risk assessment
                tools, toolbox talk materials, and guidance on CDM regulations. Particularly
                valuable for contractors working on larger commercial sites where detailed
                health and safety documentation is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Preferential insurance rates</strong> — ECA has partnerships with
                insurance providers offering preferential rates on public liability, employers'
                liability, professional indemnity, and commercial vehicle insurance for
                electrical contractors.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eligibility',
    heading: 'Eligibility Requirements',
    content: (
      <>
        <p>
          ECA membership is open to businesses (not individuals) operating in the electrotechnical
          or engineering services sector. The eligibility requirements differ between standard
          membership and ECA Approved Contractor status.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard membership</strong> — requires that the business is engaged
                in electrical contracting or related engineering services. You must carry
                appropriate public liability insurance (minimum £2 million, typically £5
                million for commercial work). No formal assessment of work quality is required
                for standard membership.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECA Approved Contractor</strong> — requires an assessment of the
                business's work quality, technical systems, and management processes.
                The responsible person must hold appropriate electrotechnical qualifications
                (Level 3 NVQ/SVQ or equivalent, 18th Edition BS 7671, and inspection and
                testing qualifications). An assessor visits to inspect sample installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance requirements</strong> — all ECA members must hold current
                employers' liability insurance (if employing staff) and public liability
                insurance. Proof of insurance is required at membership application and
                renewal.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-tiers',
    heading: 'ECA Membership Cost Tiers by Company Size',
    content: (
      <>
        <p>
          ECA membership fees are calculated based on annual company turnover, ensuring that
          membership remains accessible to sole traders and small businesses while reflecting
          the greater resources available to larger contractors. Exact fees should be confirmed
          with ECA directly as they are updated annually.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sole trader / micro business (under £100k turnover)</strong> —
                approximately £300–£500/year. Full access to technical and legal helplines,
                model contracts, and member resources.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small business (£100k–£500k turnover)</strong> — approximately
                £500–£800/year. Same benefits as above with additional resources for
                growing businesses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium business (£500k–£2 million turnover)</strong> — approximately
                £800–£1,500/year. Access to ECA business development resources and sector
                specialist support.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large contractors (over £2 million turnover)</strong> — fees are
                individually negotiated based on turnover and number of registered operatives.
                Major contractors may pay several thousand pounds per year.
              </span>
            </li>
          </ul>
        </div>
        <p>
          First-year discounts are typically available for new ECA members. Contact the ECA
          regional office covering your area for an exact quote and details of any current
          joining offers.
        </p>
      </>
    ),
  },
  {
    id: 'member-vs-approved',
    heading: 'ECA Member vs ECA Approved Contractor',
    content: (
      <>
        <p>
          There are two principal levels of ECA recognition: standard ECA membership and ECA
          Approved Contractor status. Understanding the difference is important when deciding
          which tier to pursue.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard ECA Member</strong> — provides access to all member benefits
                (technical helpline, legal helpline, model contracts, insurance, lobbying)
                but does not include a formal quality assessment. Standard members cannot use
                the ECA Approved Contractor quality mark and do not have Part P self-
                certification capability through ECA alone (they would need a separate
                NICEIC, NAPIT, or ELECSA registration).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECA Approved Contractor</strong> — includes an assessment of work
                quality and management systems. Approved Contractors can use the ECA quality
                mark, appear in the ECA's public contractor directory, and access Part P
                self-certification through ECA's approved scheme partnership. This is the
                tier equivalent to NICEIC Approved Contractor.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you primarily want the trade body benefits (helpline, legal support, lobbying),
          standard ECA membership may be sufficient. If you want a quality mark to display to
          clients and self-certification capability, ECA Approved Contractor is the appropriate tier.
        </p>
      </>
    ),
  },
  {
    id: 'eca-vs-select-niceic',
    heading: 'ECA vs SELECT vs NICEIC: Understanding the Landscape',
    content: (
      <>
        <p>
          UK electricians encounter several organisations that serve different purposes. Understanding
          how ECA, SELECT, and NICEIC/NAPIT relate to each other helps you make the right choices
          for your business.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECA (England, Wales, NI)</strong> — trade association. Represents
                contractors' interests, provides support services, lobbies government. Not
                primarily a certification or competent person scheme (though ECA Approved
                Contractor includes this).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELECT (Scotland)</strong> — the Scottish equivalent trade association.
                Does include a{' '}
                <SEOInternalLink href="/select-electrical-registration">
                  scheme registration element
                </SEOInternalLink>{' '}
                covering Building Standards Scotland (the Scottish equivalent of Part P).
                SELECT operates differently from ECA because Building Standards Scotland is
                managed differently from Part P in England.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC and NAPIT</strong> — primarily competent person schemes for
                Part P self-certification. Less focused on trade body lobbying and commercial
                support. Many contractors are members of ECA (for the trade body benefits)
                and also registered with{' '}
                <SEOInternalLink href="/niceic-vs-napit-comparison">
                  NICEIC or NAPIT
                </SEOInternalLink>{' '}
                (for Part P self-certification).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'wiring-regulations',
    heading: 'BS 7671 Wiring Regulations Support',
    content: (
      <>
        <p>
          One of the most practically valuable ECA member benefits is access to expert guidance
          on BS 7671 — the IET Wiring Regulations. Electrical installations in the UK must
          comply with the current edition (18th Edition, incorporating amendments), and
          interpretation can be complex.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical helpline interpretations</strong> — ECA technical advisers
                help members interpret complex or ambiguous BS 7671 requirements for specific
                installation scenarios. This is particularly useful for non-standard
                applications such as EV charging, solar PV, temporary installations, or
                older properties with mixed wiring systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Amendment notification</strong> — ECA members are informed of BS 7671
                amendments (such as Amendment 3:2024) before they come into force, with
                practical guidance on what changes affect day-to-day work. This helps
                contractors update their procedures ahead of amendment implementation dates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IET committee participation</strong> — ECA participates in the
                IET's technical committees that draft and revise BS 7671. This gives ECA
                an influence over the content of future amendments and provides members
                with advance insight into the direction of regulatory change.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'lobbying',
    heading: 'Industry Lobbying and Representation',
    content: (
      <>
        <p>
          Beyond day-to-day member services, the ECA plays a significant role in shaping the
          policy and regulatory environment for UK electrical contractors. This lobbying function
          is a collective benefit — all ECA members contribute to and benefit from it.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Government engagement</strong> — the ECA engages with government
                departments (MHCLG, DESNZ, and others) on building regulations reform,
                electrical safety legislation, net zero energy policy, and skills and
                apprenticeship funding. ECA responses to consultations represent the
                collective view of its membership.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>CITB levy</strong> — the ECA represents contractor views on the
                Construction Industry Training Board (CITB) levy, grant, and skills
                development. For electrical contractors paying the CITB levy, ECA
                advocacy helps shape how levy funds are distributed and what training
                programmes are funded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Payment and contract legislation</strong> — the ECA lobbies on
                issues such as retention reform, prompt payment, and construction contract
                law. These affect all electrical contractors but particularly those doing
                subcontract work for main contractors.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Making the Most of ECA Membership',
    content: (
      <>
        <p>
          ECA membership works best when you actively use the services available to you. Many
          members under-use the technical and legal helplines, which are among the highest-value
          benefits. Pair ECA membership with Elec-Mate's certificate and business management
          tools to run a fully compliant, efficient electrical contracting business.
        </p>
        <SEOAppBridge
          title="Certificate management for ECA members"
          description="Join 430+ UK electricians using Elec-Mate to complete EICRs, Minor Works Certificates, and Electrical Installation Certificates on site. On-site PDF generation, AI board scanning, and instant client delivery. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ECAMembershipGuidePage() {
  return (
    <GuideTemplate
      title="ECA Membership Guide UK | Electrical Contractors Association"
      description="Complete guide to ECA membership for UK electricians — benefits including technical helpline, legal support, BS 7671 guidance, lobbying; eligibility requirements; cost tiers by company size; and how ECA compares to NICEIC and SELECT."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Trade Body Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          ECA Membership Guide:{' '}
          <span className="text-yellow-400">Electrical Contractors Association UK</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about ECA membership — what it gives you, eligibility requirements, cost tiers by company size, the difference between ECA member and Approved Contractor, and how ECA compares to SELECT and NICEIC."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About ECA Membership"
      relatedPages={relatedPages}
      ctaHeading="Run Your Electrical Business With Elec-Mate"
      ctaSubheading="Complete EICRs, Minor Works Certificates, and Electrical Installation Certificates on your phone. AI board scanning, instant PDF export, and automatic report delivery. 7-day free trial."
    />
  );
}
