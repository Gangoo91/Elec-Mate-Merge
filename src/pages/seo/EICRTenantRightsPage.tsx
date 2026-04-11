import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  Home,
  ClipboardCheck,
  Building2,
  Scale,
  Clock,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EICR Guides', href: '/guides/eicr-for-landlords' },
  { label: 'Tenant Rights for EICR', href: '/eicr-tenant-rights' },
];

const tocItems = [
  { id: 'right-to-copy', label: 'Right to a Copy of the EICR' },
  { id: 'if-landlord-refuses', label: 'What to Do If the Landlord Refuses' },
  { id: 'reporting-to-council', label: 'Reporting to the Local Authority' },
  { id: 'council-enforcement', label: 'Council Enforcement Powers' },
  { id: 'withholding-rent', label: 'Withholding Rent — Do Not Do This' },
  { id: 'eviction-protections', label: 'Eviction Protections' },
  { id: 'eicr-for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Tenants in private rented properties in England have the legal right to receive a copy of the EICR within 28 days of the inspection, or before they move in if they are a new tenant.',
  'Tenants can request a copy of the EICR in writing from their landlord or letting agent at any time. The landlord must provide it within 28 days of a written request.',
  "If a landlord fails to provide a valid EICR, tenants should report this to the local authority's private rented sector or environmental health team — the council has enforcement powers including civil penalties of up to £30,000.",
  'Withholding rent is not an appropriate response to an absent or unsatisfactory EICR and can put tenants at legal risk. There are correct channels — use them.',
  'Landlords who have not provided the EICR cannot serve a valid Section 21 (no-fault eviction) notice, giving tenants meaningful protection whilst the compliance issue is resolved.',
  'The Deregulation Act 2015 provides additional protection from retaliatory eviction where a tenant has raised a legitimate complaint about the condition of the property.',
];

const faqs = [
  {
    question: 'Am I entitled to see the EICR for my rented property?',
    answer:
      'Yes. Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, your landlord must provide you with a copy of the current EICR. If you are a new tenant, you must receive a copy before you move in. If you are an existing tenant, you should have received a copy within 28 days of the most recent inspection. You also have the right to request a copy at any time — the landlord must provide it within 28 days of a written request.',
  },
  {
    question: 'What if my landlord says they do not have an EICR?',
    answer:
      "If your landlord cannot provide a current, in-date EICR, they may be in breach of the Electrical Safety Standards Regulations 2020. Put your request in writing (email is fine) so you have a record. If the landlord still cannot or will not provide a valid EICR, report the matter to your local council's private rented sector or environmental health team. The council can require the landlord to commission an EICR and can impose a civil penalty of up to £30,000 for non-compliance.",
  },
  {
    question: 'Can I report my landlord to the council about EICR non-compliance?',
    answer:
      "Yes. Each local authority in England is responsible for enforcing the Electrical Safety Standards Regulations 2020 in their area. You can report your landlord's non-compliance to the council's environmental health team or private rented sector team. Many councils have online reporting forms. Provide any written correspondence you have (your request and the landlord's response), the address of the property, and your contact details. The council may investigate and take enforcement action.",
  },
  {
    question: 'Can I withhold rent because my landlord has not provided an EICR?',
    answer:
      "No. Withholding rent is not a legally recognised response to a landlord's failure to provide an EICR, and it can put you at serious legal risk. You could be placed in rent arrears, which could be used as grounds for possession proceedings. The correct course of action is to report the non-compliance to the local authority. If you are concerned about your safety, contact your local council and, if necessary, seek independent legal advice from Citizens Advice, Shelter, or a housing solicitor.",
  },
  {
    question: 'Can my landlord evict me for complaining about electrical safety?',
    answer:
      "Your landlord cannot serve a valid Section 21 notice (no-fault eviction) if they have not provided you with a copy of the current EICR. Additionally, the Deregulation Act 2015 provides protection from retaliatory eviction: if you have made a written complaint about the condition of the property and the landlord has not responded adequately, and you have then reported the issue to the council, the landlord cannot serve a valid Section 21 notice for six months from the date of the council's relevant notice.",
  },
  {
    question: 'What if the EICR shows that my home is unsafe?',
    answer:
      'If the EICR identifies C1 (danger present) or C2 (potentially dangerous) observations, the EICR is Unsatisfactory. Under the 2020 Regulations, the landlord must complete remedial work within 28 days (or sooner for C1 items). The landlord must provide you with written confirmation that the work has been completed satisfactorily within 28 days of completion. If the landlord does not arrange the remedial work, report this to the local authority, which can arrange for the work to be done and recover the cost from the landlord.',
  },
  {
    question: 'Does the EICR tenant right apply to all rental properties?',
    answer:
      'The Electrical Safety Standards Regulations 2020 apply to assured shorthold tenancies, assured tenancies, and regulated tenancies in the private rented sector in England. They do not apply to social housing (which has separate obligations under the Social Housing Regulation Act 2023), lodger arrangements where the landlord lives in the same property, student halls of residence, or long leases. If you rent a social housing property, contact your housing association or council housing team about their electrical safety obligations.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/eicr-remediation',
    title: 'EICR Remediation Work',
    description: 'Understanding C1, C2, C3 and FI codes and what remedial work is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/eicr-for-hmo',
    title: 'EICR for HMO Properties',
    description: 'Mandatory EICR requirements, common C2 codes, and remediation costs for HMOs.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/eicr-frequency-guide',
    title: 'EICR Frequency Guide',
    description: 'How often EICRs are needed for different property types and tenancies.',
    icon: Clock,
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
    id: 'right-to-copy',
    heading: "Tenants' Right to a Copy of the EICR",
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          give tenants specific statutory rights regarding access to the Electrical Installation
          Condition Report for their home. These rights are enforceable and landlords who breach
          them face civil penalties.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>New tenants</strong> — you must receive a copy of the current EICR before
                you move in. If the landlord cannot provide one (because no valid EICR exists), they
                are in breach of the regulations before your tenancy has even started.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Existing tenants</strong> — after each new EICR inspection, your landlord
                must provide you with a copy within 28 days of the inspection date.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>On request</strong> — you can request a copy of the current EICR in writing
                at any time during your tenancy. The landlord must provide it within 28 days of your
                written request. Keep your request in writing (email is acceptable) so you have a
                record of the date.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prospective tenants</strong> — even before signing a tenancy agreement, a
                prospective tenant can request a copy of the EICR from the landlord or letting
                agent. The landlord must provide it within 28 days. You should ask to see a copy
                before committing to the tenancy.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always request the EICR in writing so you have a dated record of your request and the
          landlord's response. An email to the landlord or letting agent is sufficient. Keep all
          correspondence — you may need it if you report the matter to the local authority.
        </p>
      </>
    ),
  },
  {
    id: 'if-landlord-refuses',
    heading: 'What to Do If the Landlord Does Not Provide the EICR',
    content: (
      <>
        <p>
          If your landlord fails to provide a copy of the EICR within 28 days of your written
          request, or cannot provide one because no valid EICR exists, follow these steps.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — put your request in writing</strong> — send a written request
                (email is fine) to your landlord or letting agent asking for a copy of the current
                EICR. State clearly that you are making the request under the Electrical Safety
                Standards in the Private Rented Sector (England) Regulations 2020. Keep a copy of
                the email.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — wait 28 days</strong> — the landlord has 28 days from your written
                request to provide the EICR. If they provide it and it is satisfactory, the matter
                is resolved. If they do not respond, or respond saying no EICR exists, proceed to
                step 3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — report to the local authority</strong> — contact your local
                council's environmental health or private rented sector team. Provide the property
                address, the date of your written request, and any response from the landlord.
                Attach your email correspondence. The council has enforcement powers and can
                investigate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — seek independent advice if needed</strong> — if you are concerned
                about your safety or about your landlord's response, contact Citizens Advice,
                Shelter, or a housing solicitor. These organisations can provide free or low-cost
                advice on your rights and options.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'reporting-to-council',
    heading: 'Reporting Non-Compliance to the Local Authority',
    content: (
      <>
        <p>
          The local authority — your borough council, district council, or unitary authority — is
          the enforcement body for the Electrical Safety Standards Regulations 2020. Reporting your
          landlord's non-compliance to the council is the correct and legally supported course of
          action.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Where to report</strong> — contact the environmental health team or private
                rented sector team at your local council. Most councils have an online form for
                private rented sector complaints. Search for "[your council name] private rented
                sector complaint" or "[your council name] environmental health housing" to find the
                right department.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What to provide</strong> — the property address, your contact details, a
                description of the complaint (no EICR provided, EICR is out of date, remedial work
                not completed), the date of your written request to the landlord, and any written
                responses from the landlord. The more evidence you can provide, the more effectively
                the council can act.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What happens next</strong> — the council will review your complaint and
                decide whether to investigate. If they find a breach, they can issue a remedial
                notice requiring the landlord to commission an EICR or complete remedial work. If
                the landlord fails to comply with the notice, the council can impose a civil penalty
                of up to £30,000, or arrange for the work to be done and recover costs from the
                landlord.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Your identity can generally be kept confidential during the investigation process. Ask the
          council about their confidentiality policy when you make the report.
        </p>
      </>
    ),
  },
  {
    id: 'council-enforcement',
    heading: 'Council Enforcement Powers',
    content: (
      <>
        <p>
          Local authorities have significant powers to enforce the Electrical Safety Standards
          Regulations 2020. Understanding these powers helps tenants appreciate what enforcement
          action can achieve.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial notices</strong> — the council can serve a remedial notice on the
                landlord requiring them to take specific action (commission an EICR, complete
                remedial work) within a set timeframe. Failure to comply with a remedial notice is
                itself a breach attracting additional penalties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalties up to £30,000</strong> — each breach of the regulations
                (failure to obtain an EICR, failure to provide it, failure to complete remedial
                work) can attract a separate civil penalty of up to £30,000. The council has
                discretion in setting the penalty amount, taking account of the seriousness of the
                breach and whether it is a repeat offence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work in default</strong> — if the landlord fails to carry out required
                remedial work after a remedial notice, the council can arrange for the work to be
                done by a qualified electrician and recover the cost from the landlord. The tenant
                is not charged for this work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HHSRS powers</strong> — separately from the Electrical Safety Standards
                Regulations, councils can use Housing Health and Safety Rating System (HHSRS) powers
                where the electrical installation poses a health and safety hazard. HHSRS Category 1
                hazards (including electrical hazards) can lead to Improvement Notices or Emergency
                Prohibition Orders.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'withholding-rent',
    heading: 'Withholding Rent — Why You Should Not Do This',
    content: (
      <>
        <p>
          It is tempting for tenants in a difficult situation with a non-compliant landlord to
          consider withholding rent as leverage. This is strongly advised against. Withholding rent
          is not a recognised remedy under the Electrical Safety Standards Regulations 2020 or
          general housing law, and it carries serious legal risks for the tenant.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rent arrears</strong> — if you withhold rent, you are in arrears. Once you
                owe more than two months' rent, your landlord can serve a Section 8 notice using
                Ground 8 (mandatory possession ground). This means a court must grant possession
                even if the landlord is also in breach of their obligations. The fact that you
                withheld rent because of an EICR issue is not an automatic defence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Credit impact</strong> — possession proceedings and county court judgments
                (CCJs) for rent arrears can damage your credit rating for six years and make it
                difficult to rent privately in future.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use the correct channels instead</strong> — report non-compliance to the
                local authority. Seek advice from Citizens Advice or Shelter. These organisations
                can help you exercise your rights without putting your tenancy at risk.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are in an emergency situation where you believe your electrical installation poses
          an immediate danger (C1 level), contact the council's emergency housing line and, if
          necessary, the emergency services. Do not use electrical appliances or installations you
          believe to be unsafe.
        </p>
      </>
    ),
  },
  {
    id: 'eviction-protections',
    heading: 'Eviction Protections for Tenants Who Raise Electrical Safety Concerns',
    content: (
      <>
        <p>
          Tenants who exercise their rights regarding electrical safety have legal protections
          against retaliatory eviction. These protections are real and enforceable.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 invalidity — EICR not provided</strong> — a landlord cannot serve
                a valid Section 21 notice if they have not provided the tenant with a copy of the
                current EICR. If you receive a Section 21 notice but have never been given the EICR,
                the notice is invalid and you do not have to leave. Seek legal advice before taking
                any action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Deregulation Act 2015 — retaliatory eviction protection</strong> — if you
                have made a written complaint to your landlord about the condition of the property
                (including electrical safety), the landlord has not responded adequately, and you
                have reported the matter to the council, which has then issued a relevant notice,
                your landlord cannot serve a valid Section 21 notice for six months from the date of
                that notice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Renters' Rights Bill</strong> — proposed legislation (the Renters' Rights
                Bill, progressing through Parliament as of early 2026) will abolish Section 21
                entirely if enacted. Check the current status of this legislation for the latest
                position. Once abolished, landlords will not be able to evict tenants without a
                specified legal ground.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you receive an eviction notice after raising electrical safety concerns, seek urgent
          legal advice. Citizens Advice, Shelter, and local law centres provide free and low-cost
          housing advice. Do not ignore an eviction notice — even if you believe it is invalid, you
          must respond correctly to protect your position.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-for-electricians',
    heading: 'For Electricians: Helping Tenants and Landlords',
    content: (
      <>
        <p>
          Electricians play a key role in the system that protects tenants' electrical safety. A
          thorough, accurately documented EICR is the foundation of the entire framework. When an
          EICR is well-produced and clearly communicated to both landlord and tenant, the regulatory
          system works as intended.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Produce Compliant EICRs with Elec-Mate
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to produce fully compliant, clearly documented EICRs on site. Each observation is
                  clearly classified (C1, C2, C3, FI), the overall assessment is clearly stated, and
                  the recommended reinspection date is included. Landlords can forward the PDF
                  directly to tenants to meet their 28-day obligation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Produce compliant EICRs that protect landlords and tenants"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion. Clear C1/C2/C3/FI classification, instant PDF export, and landlord portal upload. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRTenantRightsPage() {
  return (
    <GuideTemplate
      title="Tenant Rights for EICR UK | Renters' Electrical Safety Guide"
      description="Tenants' guide to EICR rights in the private rented sector. Your right to a copy of the EICR within 28 days, what to do if your landlord refuses, how to report to the local authority, council enforcement powers, eviction protections, and why you should not withhold rent."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Tenant Rights Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Tenant Rights for EICR:{' '}
          <span className="text-yellow-400">Your Electrical Safety Rights</span>
        </>
      }
      heroSubtitle="As a private tenant in England, you have legal rights to electrical safety records for your home. This guide explains your right to receive the EICR, what to do if your landlord refuses, how to report non-compliance to the council, council enforcement powers, and the eviction protections available to tenants who raise electrical safety concerns."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: Tenant EICR Rights"
      relatedPages={relatedPages}
      ctaHeading="For Electricians: Complete Compliant EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate to produce clearly documented, fully compliant EICRs on site. Help landlords meet their obligations and protect their tenants. 7-day free trial."
    />
  );
}
