import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Zap,
  FileText,
  Calculator,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Part P Building Regulations', href: '/guides/part-p-building-regulations-electrical' },
];

const tocItems = [
  { id: 'overview', label: 'What Is Part P?' },
  { id: 'notifiable-work', label: 'What Work Is Notifiable?' },
  { id: 'non-notifiable', label: 'Non-Notifiable Work' },
  { id: 'competent-person', label: 'Competent Person Schemes' },
  { id: 'building-notice', label: 'Building Notice and Full Plans' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'property-sale', label: 'Part P and Property Sale' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Part P of the Building Regulations applies to electrical installations in dwellings and requires that notifiable work is either self-certified by a competent person scheme member or notified to building control before commencement.',
  'Notifiable work includes new circuits, consumer unit replacements, all electrical work in kitchens and bathrooms, and new outdoor or outbuilding supplies.',
  'Non-notifiable work — such as like-for-like replacement of accessories and additions to existing circuits in most rooms — does not require building control notification.',
  'Electricians registered with NICEIC, NAPIT, ELECSA, or another approved competent person scheme can self-certify their work, issuing a certificate directly without involving building control.',
  'Failure to notify can create serious problems when selling a property, as buyers solicitors will request evidence of Building Regulations compliance for all electrical work.',
];

const faqs = [
  {
    question: 'What electrical work is notifiable under Part P?',
    answer:
      'Under Approved Document P, the following work in dwellings is notifiable: installation of a new circuit, replacement of a consumer unit, any electrical work in a bathroom or shower room (other than like-for-like replacement of accessories on existing circuits), any work in a special location such as a swimming pool, work associated with a new extension or loft conversion, installation of a new outdoor circuit or supply to an outbuilding, and any work in a kitchen that involves a new circuit. If in doubt, treat the work as notifiable — it is always safer to self-certify or notify than to leave the work unverified.',
  },
  {
    question: 'Who can self-certify electrical work under Part P?',
    answer:
      "Only electricians registered with an approved competent person scheme can self-certify. Approved schemes include NICEIC, NAPIT, ELECSA, STROMA, and BRE Certification. These schemes assess the electrician's technical competence, check that the work is carried out to BS 7671, and provide the homeowner with a certificate of compliance. Self-certification means the electrician — not building control — verifies that the work meets the requirements. The scheme then notifies the local authority on the electrician's behalf.",
  },
  {
    question: 'What is non-notifiable electrical work?',
    answer:
      'Non-notifiable work is work that does not require building control notification. Examples include: replacing a like-for-like electrical accessory (socket, switch, light fitting) anywhere in a dwelling except in a bathroom or special location; adding additional sockets or fused spurs to an existing ring final circuit in a room that is not a kitchen, bathroom, or special location; replacing a damaged cable on a single circuit where the circuit protective device is not changed; and installing or upgrading a smoke alarm on an existing circuit. Even for non-notifiable work, all electrical installations must comply with BS 7671.',
  },
  {
    question: 'How much does it cost to notify building control?',
    answer:
      'If the electrician is not registered with a competent person scheme, the homeowner must submit a building notice to the local authority before work commences. Building notice fees vary by council but typically range from £200 to £400 for most domestic electrical jobs. Full plans applications (required for larger projects) cost more and take longer. The council will inspect the work on completion and issue a completion certificate. This process is slower and more expensive than using a competent person scheme, which is why scheme membership makes commercial sense for any electrician doing regular domestic work.',
  },
  {
    question: 'What happens if notifiable work is done without notification?',
    answer:
      "If notifiable work is carried out without notification, the local authority can issue an enforcement notice requiring the homeowner to have the work inspected and tested by a qualified person, or in extreme cases, to have non-compliant work removed and redone. The homeowner bears legal responsibility for Building Regulations compliance, but the electrician who carried out the work is expected to resolve the situation. Non-compliance causes significant problems when selling the property, as buyers' solicitors will require evidence of compliance for any electrical work. Without a certificate, the sale may be delayed or the buyer may demand a price reduction.",
  },
  {
    question: 'Does Part P apply to outbuildings and garages?',
    answer:
      'Part P applies to electrical work in dwellings. The definition of dwelling includes the main building and any structure used as living accommodation. Outbuildings such as detached garages, sheds, and summer houses are not dwellings in their own right, but the supply cable from the dwelling to the outbuilding is Part P notifiable because it involves a new circuit originating at the dwelling. Electrical work within a standalone outbuilding that is not connected to the dwelling supply does not fall under Part P, but must still comply with BS 7671.',
  },
  {
    question: 'Can a homeowner do their own electrical work under Part P?',
    answer:
      'A homeowner can carry out non-notifiable electrical work themselves, provided the work complies with BS 7671. For notifiable work, the homeowner can carry out the work and then have it inspected by a registered electrician or notify building control to carry out the inspection. However, a homeowner cannot self-certify — self-certification is only available to members of approved competent person schemes. In practice, for any significant electrical work, it is safer and more cost-effective to engage a qualified registered electrician from the outset.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-work-notification-part-p',
    title: 'Electrical Work Notification Guide',
    description:
      'Detailed guide to exactly what work requires notification and how the process works.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/guides/competent-person-scheme-guide-electricians',
    title: 'Competent Person Scheme Guide',
    description: 'NICEIC, NAPIT, ELECSA — which scheme to join and what membership costs.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Issue Electrical Installation Certificates on site from your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/minor-works-certificate',
    title: 'Minor Works Certificate',
    description: 'Issue Minor Electrical Installation Works Certificates instantly.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/guides/electrical-handover-documentation',
    title: 'Electrical Handover Documentation',
    description: 'What documents to issue on completion of a notifiable electrical installation.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for new circuits that require Part P notification.',
    icon: Calculator,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What Is Part P of the Building Regulations?',
    content: (
      <>
        <p>
          Part P of the Building Regulations (England) sets requirements for the design,
          installation, inspection, and testing of electrical installations in dwellings. It came
          into force in January 2005 following a series of house fires and electrocutions caused by
          unsafe DIY electrical work.
        </p>
        <p>
          Part P is implemented through Approved Document P, which was revised in 2013 to reduce the
          scope of notifiable work. The document requires that all electrical work in dwellings is
          designed and installed to comply with BS 7671 (the IET Wiring Regulations). For certain
          types of higher-risk work — defined as notifiable work — the installation must either be
          self-certified by a registered competent person or notified to building control before
          work commences.
        </p>
        <p>
          Part P applies to Scotland, Wales, and Northern Ireland under their own separate building
          regulations, which have equivalent requirements. The specific competent person schemes and
          notification procedures differ slightly by nation, but the underlying principle — that
          significant electrical work in dwellings must be verified — is consistent across the UK.
        </p>
        <p>
          For electricians, understanding Part P is essential. Failure to self-certify or notify
          building control for notifiable work exposes the homeowner to enforcement action and
          property sale problems, and damages the electrician's professional reputation.
        </p>
      </>
    ),
  },
  {
    id: 'notifiable-work',
    heading: 'What Electrical Work Is Notifiable Under Part P?',
    content: (
      <>
        <p>
          Approved Document P defines notifiable work as work that requires either
          self-certification by a competent person scheme member or prior notification to building
          control. The following types of work in dwellings are notifiable:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>New circuits</strong> — installation of a new circuit from the consumer unit
                or from a new consumer unit, including new circuits for electric vehicle chargers,
                heat pumps, battery storage, and outbuilding supplies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — replacing an existing consumer unit
                (fuse board) with a new one, including upgrading from rewireable fuses to MCBs and
                RCDs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical work in kitchens</strong> — new circuits, additions to circuits,
                and installation of new accessories in kitchens where the work involves the kitchen
                circuit. Like-for-like replacement of accessories on existing circuits in kitchens
                is non-notifiable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>All electrical work in bathrooms</strong> — any electrical work in a
                bathroom, shower room, or en-suite (other than like-for-like replacement of
                accessories on existing circuits) is notifiable. This includes new shower circuits,
                towel rail supplies, and lighting changes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor supplies and new garden circuits</strong> — new outdoor socket
                circuits, new garden lighting circuits, and new supplies to outbuildings (garages,
                sheds, summer houses) are all notifiable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Special locations</strong> — work in swimming pools, saunas, and similar
                special locations defined in Part 7 of BS 7671 is notifiable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The key principle is that notifiable work involves higher risk — either because it creates
          new circuits that could be overloaded, or because it is in a location where the
          consequences of an electrical fault are particularly serious (water present, escape route,
          etc.).
        </p>
      </>
    ),
  },
  {
    id: 'non-notifiable',
    heading: 'Non-Notifiable Electrical Work',
    content: (
      <>
        <p>
          Not all domestic electrical work requires notification. Non-notifiable work can be carried
          out without building control involvement, provided it complies with BS 7671. Common
          examples of non-notifiable work include:
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Like-for-like replacement of electrical accessories (sockets, switches, light
                fittings) anywhere in a dwelling except bathrooms and special locations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Adding additional sockets or fused connection units to an existing ring final
                circuit in rooms that are not kitchens, bathrooms, or special locations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Replacing a single damaged cable for a single circuit where the circuit protective
                device is not changed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Installing or upgrading a smoke alarm or carbon monoxide alarm by connecting to an
                existing circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Replacing a like-for-like accessory in a kitchen on an existing circuit (for
                example, replacing a socket outlet like-for-like). Note that adding new sockets or
                extending a kitchen circuit is notifiable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Even for non-notifiable work, all electrical installations in dwellings must comply with
          BS 7671. The absence of a notification requirement does not mean the work is exempt from
          technical standards. A{' '}
          <SEOInternalLink href="/tools/minor-works-certificate">
            Minor Electrical Installation Works Certificate
          </SEOInternalLink>{' '}
          should still be issued for any work that adds to or alters an existing circuit, to provide
          the homeowner with a record of what was done and to protect the electrician against future
          liability.
        </p>
      </>
    ),
  },
  {
    id: 'competent-person',
    heading: 'Competent Person Schemes: Self-Certification',
    content: (
      <>
        <p>
          The most efficient route to Part P compliance for working electricians is membership of an
          approved competent person scheme. Registered scheme members can carry out notifiable work
          and self-certify it — issuing the homeowner with a certificate and notifying the local
          authority automatically, without building control involvement.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Approved Schemes</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  NICEIC (National Inspection Council for Electrical Installation Contracting)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>NAPIT (National Association of Professional Inspectors and Testers)</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>ELECSA (subsidiary of NICEIC)</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>STROMA Certification</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>BRE Certification</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">How Self-Certification Works</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>Complete the installation to BS 7671 standards</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>Test the installation and complete an EIC or Minor Works Certificate</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>Issue the homeowner with a Part P self-certification certificate</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>The scheme notifies the local authority within 30 days</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          Scheme membership involves an assessment of the electrician's technical competence
          (including a site visit and inspection of previous work), annual registration fees, and
          compliance with the scheme's audit and complaint procedures. Annual fees range from
          approximately £200 to £600 depending on the scheme and the number of installers
          registered. For electricians who carry out regular notifiable domestic work, scheme
          membership pays for itself quickly in saved building control fees and administrative time.
        </p>
        <SEOAppBridge
          title="Issue Part P certificates on site"
          description="Elec-Mate lets you complete Electrical Installation Certificates and Minor Works Certificates on your phone. AI board scanning, voice test entry, and instant PDF export — issue the Part P documentation before you leave the job."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'building-notice',
    heading: 'Building Notice and Full Plans: Non-Scheme Route',
    content: (
      <>
        <p>
          If the electrician is not registered with a competent person scheme, the homeowner must
          notify building control before notifiable work commences. There are two routes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-6 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Building Notice</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  A building notice is the simpler of the two routes. The homeowner submits a notice
                  to the local authority before work commences. The council will inspect the work on
                  completion and issue a completion certificate if the work is satisfactory.
                  Building notice fees for typical domestic electrical work range from £200 to £400
                  depending on the council. The council has no obligation to inspect during the work
                  — the inspection is carried out at the end. If the work fails the inspection, the
                  homeowner bears the cost of remediation.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Full Plans Application</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  A full plans application involves submitting detailed plans and specifications to
                  building control before work commences. The council approves the plans, inspects
                  during the work, and issues a completion certificate. Full plans applications are
                  used for larger and more complex projects. They provide greater certainty that the
                  work will meet requirements, but the process is slower and more expensive than a
                  building notice.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <p>
          For most domestic electrical jobs, the building notice route is used where the electrician
          is not scheme-registered. However, the practical reality is that scheme registration is
          almost always cheaper and faster than using building control. A building notice fee of
          £200 to £400 per job quickly exceeds a year's scheme membership fee for any electrician
          carrying out regular domestic work.
        </p>
      </>
    ),
  },
  {
    id: 'penalties',
    heading: 'Penalties for Not Notifying Building Control',
    content: (
      <>
        <p>
          Failure to comply with Part P is a breach of the Building Regulations. The consequences
          can be serious for both the homeowner and the electrician:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enforcement notice</strong> — the local authority can serve an enforcement
                notice on the homeowner requiring the work to be inspected and brought into
                compliance, or in serious cases, removed and redone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Property sale delays</strong> — buyers' solicitors routinely request
                evidence of Building Regulations compliance for any electrical work. Without a
                certificate, the sale can be delayed or the buyer may demand a price reduction or
                retention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance issues</strong> — home insurance policies may not cover damage
                caused by electrical work that has not been properly certified. This could leave the
                homeowner liable for the full cost of fire or flood damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional reputation</strong> — an electrician who carries out notifiable
                work without certification damages their professional reputation and may face action
                from their registration scheme or from trading standards.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The time limit for enforcement action by the local authority is 12 months from the date of
          completion of the work. However, the property sale consequences can arise at any time,
          regardless of how long ago the work was done.
        </p>
      </>
    ),
  },
  {
    id: 'property-sale',
    heading: 'Part P and Property Sale',
    content: (
      <>
        <p>
          Part P compliance is most visibly important when a homeowner sells their property.
          Conveyancing solicitors for the buyer will ask the seller to declare all electrical work
          carried out since the property was purchased, and to provide certificates demonstrating
          Building Regulations compliance for any notifiable work.
        </p>
        <p>
          If the seller cannot produce the relevant certificates, the buyer's solicitor may require
          an indemnity insurance policy to be purchased, which protects the buyer if the local
          authority takes enforcement action. Indemnity policies can cost £100 to £500 per claim and
          are not a substitute for proper certification — they simply provide financial protection.
          Some buyers refuse to accept indemnity insurance and require the work to be properly
          inspected and certified before exchange of contracts.
        </p>
        <p>
          For electricians, this creates both a risk and an opportunity. Any homeowner who has had
          notifiable work done without certification faces a problem when they sell. This generates
          demand for retrospective inspection and EICRs. However, electricians who fail to certify
          their own work may find themselves called back to rectify the situation at their own
          expense.
        </p>
        <SEOAppBridge
          title="Never forget to issue a certificate again"
          description="Elec-Mate automatically prompts you to issue an EIC or Minor Works Certificate at the end of every job. Part P documentation issued on site, sent to the customer instantly, and stored in your job records."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Part P in Practice',
    content: (
      <>
        <p>
          For a working electrician, Part P comes down to three practical questions on every
          domestic job: Is this work notifiable? Am I registered to self-certify? Have I issued the
          correct certificate?
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certificate App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete your{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  on site using Elec-Mate. AI board scanning populates the schedule of circuits
                  automatically. Voice entry for test results. PDF issued to the customer before you
                  leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Minor Works Certificate</h4>
                <p className="text-white text-sm leading-relaxed">
                  For additions and alterations to existing circuits, issue a{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Electrical Installation Works Certificate
                  </SEOInternalLink>{' '}
                  instantly from your phone. Required for Part P compliance on non-EIC jobs.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Regulations Lookup</h4>
                <p className="text-white text-sm leading-relaxed">
                  Not sure if a specific job is notifiable? Elec-Mate's AI assistant can check Part
                  P requirements and BS 7671 regulations for any installation scenario, so you can
                  advise your customer confidently on site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PartPBuildingRegulationsGuidePage() {
  return (
    <GuideTemplate
      title="Part P Building Regulations | Electrical Work in Dwellings Guide"
      description="Complete guide to Part P Building Regulations for electricians. What work is notifiable, competent person scheme self-certification, building notice process, penalties for non-compliance, and how Part P affects property sales."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Part P Building Regulations:{' '}
          <span className="text-yellow-400">Electrical Work in Dwellings</span>
        </>
      }
      heroSubtitle="Part P requires that notifiable electrical work in dwellings is either self-certified by a competent person scheme member or notified to building control. This guide covers what is notifiable, how self-certification works, and the consequences of getting it wrong."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Part P Building Regulations"
      relatedPages={relatedPages}
      ctaHeading="Issue Part P Certificates On Site"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate to issue EICs and Minor Works Certificates on site. AI board scanning, voice test entry, instant PDF — Part P documentation done before you leave. 7-day free trial."
    />
  );
}
