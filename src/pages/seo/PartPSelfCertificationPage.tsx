import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  ClipboardCheck,
  Building2,
  Scale,
  BookOpen,
  Zap,
  MapPin,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Building Regulations', href: '/part-p-self-certification' },
  { label: 'Part P Self-Certification Guide', href: '/part-p-self-certification' },
];

const tocItems = [
  { id: 'what-is-part-p', label: 'What Is Part P?' },
  { id: 'notifiable-work', label: 'What Work Is Notifiable?' },
  { id: 'self-certification', label: 'How Self-Certification Works' },
  { id: 'without-scheme', label: 'Without Scheme Membership' },
  { id: 'consequences', label: 'Consequences of Unpermitted Work' },
  { id: 'scotland-ni', label: 'Scotland and Northern Ireland' },
  { id: 'scheme-comparison', label: 'Choosing a Competent Person Scheme' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Part P of the Building Regulations (England and Wales) requires that certain domestic electrical work is carried out to a safe standard and either certified by a registered electrician through a competent person scheme, or notified to and inspected by local authority building control.',
  'Notifiable work under Part P includes new circuits, consumer unit replacements, work in special locations (bathrooms, swimming pools, outside), and most work in kitchens and garages.',
  'Competent person schemes (NICEIC, NAPIT, ELECSA, and others) allow registered electricians to self-certify their own work without building control involvement, issuing a Part P certificate directly to the homeowner.',
  'Carrying out notifiable domestic electrical work without either scheme registration or building control notification is a breach of building regulations, can invalidate home insurance, and creates serious problems at property sale.',
  'Part P applies in England and Wales only. Scotland uses Building Standards Scotland (with SELECT\'s Approved Certifier scheme), and Northern Ireland uses its own building regulations framework.',
];

const faqs = [
  {
    question: 'What does Part P cover?',
    answer:
      'Part P of the Building Regulations (England and Wales) covers electrical installations in dwellings — houses, flats, and any electrical work that forms part of a dwelling. It requires that fixed electrical installations comply with BS 7671 (IET Wiring Regulations) and that notifiable work is either self-certified by a registered competent person or notified to local authority building control. Part P does not cover portable appliances or electrical work in commercial or industrial buildings.',
  },
  {
    question: 'What electrical work is notifiable under Part P?',
    answer:
      'Notifiable work under Part P includes: installation of a new circuit; replacement or significant alteration of a consumer unit (fuse board); installation of a socket outlet, light fitting, or other electrical accessory in a special location (bathrooms, outdoors, swimming pool areas); electrical work in a kitchen (excluding like-for-like replacement of accessories in the same position); garden and outbuilding electrical installations; and installation of a new main earthing or bonding conductor. Adding a socket or light to an existing circuit in a standard room (not kitchen, bathroom, or garage) is generally not notifiable.',
  },
  {
    question: 'How does Part P self-certification work?',
    answer:
      'When a registered electrician carries out notifiable Part P work, they test and inspect the installation on completion, then notify their competent person scheme (e.g., NICEIC, NAPIT, or ELECSA). The scheme notifies the local authority building control department on the electrician\'s behalf and issues a Building Regulations Part P completion certificate to the homeowner. This certificate confirms that the work complies with BS 7671 and Part P. The entire process is handled automatically — there is no need for a building control visit.',
  },
  {
    question: 'What happens if I do Part P notifiable work without scheme registration?',
    answer:
      'If you carry out notifiable Part P work without scheme registration, you or the homeowner must notify local authority building control before starting the work (or as soon as possible afterwards). Building control will arrange an inspection and may require tests. This adds cost (a building control fee, typically £150–£300) and delay. The homeowner\'s home insurance may not cover incidents related to uninspected or uncertified electrical work. At property sale, solicitors will require evidence of compliance for notifiable work, and absence of a certificate can cause significant delays or price reductions.',
  },
  {
    question: 'Is Part P the same across all of England and Wales?',
    answer:
      'Part P applies consistently across all of England and Wales. There are no regional variations within England and Wales — the same notifiable work list and competent person scheme framework applies whether you are working in London, Manchester, Cardiff, or Cornwall.',
  },
  {
    question: 'Does Part P apply in Scotland?',
    answer:
      'No. Scotland has its own building standards system under the Building (Scotland) Act 2003 and Building (Scotland) Regulations 2004. Electrical work in Scottish dwellings is governed by Building Standards Scotland (specifically Standard 4.5, Electrical safety). The self-certification mechanism in Scotland is the Approved Certifier of Construction scheme, operated primarily by SELECT. This is functionally similar to Part P but operates under different legislation.',
  },
  {
    question: 'Can a homeowner self-certify their own Part P electrical work?',
    answer:
      'A homeowner can carry out certain minor electrical work in their own home without needing scheme registration, provided the work is not notifiable under Part P (e.g., replacing a like-for-like socket in a standard room). For notifiable work, a homeowner without scheme registration must notify building control. However, in practice, carrying out complex electrical work without the qualifications of a professional electrician is dangerous and inadvisable — the building control inspector will test the installation and may require it to be redone if it fails.',
  },
  {
    question: 'How do I get a retroactive Part P certificate for work already done?',
    answer:
      'If notifiable Part P work was carried out without certification, you can obtain retroactive certification by having a qualified electrician carry out a full electrical inspection and testing of the affected work. If the installation passes, the electrician can issue a Minor Works Certificate or Electrical Installation Certificate (as appropriate). For older uninspected work, some local authorities will accept an EICR showing the installation as satisfactory, along with a statutory declaration from the homeowner. The specific process varies by local authority — contact your building control department for guidance.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/niceic-vs-napit-comparison',
    title: 'NICEIC vs NAPIT Comparison',
    description: 'Compare the main Part P competent person schemes — costs, assessments, and which to choose.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/select-electrical-registration',
    title: 'SELECT Electrical Registration Scotland',
    description: 'The Scottish equivalent of Part P — Building Standards Scotland and SELECT explained.',
    icon: MapPin,
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
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord electrical safety requirements, compliance deadlines, and penalties.',
    icon: ShieldCheck,
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
    id: 'what-is-part-p',
    heading: 'What Is Part P of the Building Regulations?',
    content: (
      <>
        <p>
          Part P is the section of the Building Regulations (England and Wales) that deals with
          electrical safety in dwellings. It came into force on 1 January 2005 and requires that
          fixed electrical installations in domestic properties comply with BS 7671 (IET Wiring
          Regulations) and that notifiable electrical work is either self-certified by a
          registered competent person or approved by local authority building control.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Statutory instrument</strong> — Part P is implemented through Schedule
                1 and Schedule 4 of the Building Regulations 2010. The technical standard it
                requires compliance with is BS 7671:2018 (incorporating Amendment 3:2024),
                the current edition of the IET Wiring Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope — dwellings only</strong> — Part P applies to electrical
                installations in and around dwellings (houses, flats, maisonettes, and
                any outbuildings or gardens associated with a dwelling). It does not apply
                to commercial or industrial premises, which are covered by other building
                regulations and BS 7671 requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>England and Wales only</strong> — Part P applies only in England and
                Wales. Scotland uses Building Standards Scotland;{' '}
                <SEOInternalLink href="/select-electrical-registration">
                  SELECT operates the Approved Certifier scheme there
                </SEOInternalLink>
                . Northern Ireland has its own building regulations (The Building Regulations
                (Northern Ireland) 2012) with separate requirements.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'notifiable-work',
    heading: 'What Electrical Work Is Notifiable Under Part P?',
    content: (
      <>
        <p>
          Not all domestic electrical work is notifiable under Part P. The notifiable work
          list is set out in Schedule 4 of the Building Regulations 2010. The key categories
          are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New circuits</strong> — installation of a new electrical circuit
                is always notifiable, regardless of where in the dwelling it is located.
                This includes new ring mains, radial circuits, lighting circuits, and
                dedicated circuits for appliances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — replacement of a consumer unit
                (fuse board) is notifiable. This is one of the most common notifiable jobs
                and is the main reason most electricians join a competent person scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Special locations</strong> — any electrical work in a special
                location is notifiable. Special locations include: bathrooms (within Zones
                0, 1, and 2 and in the area outside Zone 2 as defined by BS 7671 Section
                701); swimming pools and other basins (Section 702); and locations exposed
                to the weather or in gardens and outbuildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchens</strong> — electrical work in kitchens is notifiable,
                with the exception of like-for-like replacement of accessories (sockets,
                switches) in the same position without altering the wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NOT notifiable</strong> — adding a socket or switch to an existing
                circuit in a standard room (not kitchen, bathroom, or other special location),
                replacing a like-for-like socket or switch in the same position, and replacing
                a damaged cable supplying a single fixed appliance are generally not notifiable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When in doubt, treat the work as notifiable. The consequences of failing to notify
          are more serious than unnecessarily notifying.
        </p>
      </>
    ),
  },
  {
    id: 'self-certification',
    heading: 'How Self-Certification Works Through Competent Person Schemes',
    content: (
      <>
        <p>
          The competent person scheme mechanism is what allows registered electricians to
          certify their own notifiable Part P work without the cost and delay of building
          control involvement. Here is how it works in practice:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — carry out and test the work</strong> — complete the
                installation and carry out all required inspection and testing in accordance
                with BS 7671. Complete the relevant certification (Electrical Installation
                Certificate for new installations, Minor Works Certificate for additions to
                existing circuits).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — notify your scheme</strong> — log the completed job on
                your scheme's portal (NICEIC, NAPIT, ELECSA, or your scheme's online
                system). Provide the address, nature of work, and date of completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — scheme notifies building control</strong> — your scheme
                automatically notifies the local authority building control department
                on your behalf. The homeowner is issued a Building Regulations Part P
                completion certificate confirming that the work complies with Part P.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — homeowner stores the certificate</strong> — the Part P
                certificate should be kept safely with the property deeds. It will be
                required by solicitors when the property is sold.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Government-approved schemes for electrical self-certification include NICEIC,
          NAPIT, ELECSA, and several others. See the{' '}
          <SEOInternalLink href="/niceic-vs-napit-comparison">
            NICEIC vs NAPIT comparison
          </SEOInternalLink>{' '}
          to understand the differences between the main schemes.
        </p>
      </>
    ),
  },
  {
    id: 'without-scheme',
    heading: 'Notifiable Work Without Scheme Registration: Building Control Route',
    content: (
      <>
        <p>
          If an electrician is not registered with a competent person scheme, notifiable Part P
          work must go through local authority building control. This is the alternative route
          and is significantly more burdensome for both the electrician and the homeowner.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prior notification required</strong> — the homeowner or contractor
                must submit a building regulations application or full plans application to
                building control before work begins (or a building notice immediately before
                work starts). A building notice fee applies — typically £150–£350 depending
                on the local authority and the scope of work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection and testing</strong> — a building control officer may
                visit to inspect the completed work. They may bring their own test instruments
                or commission a third party to test the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Completion certificate</strong> — building control issues a completion
                certificate once the work is signed off. This takes longer than the instant
                certification available through a competent person scheme.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For any electrician carrying out domestic electrical work regularly, the cost and
          administrative burden of the building control route makes competent person scheme
          registration far more practical and cost-effective.
        </p>
      </>
    ),
  },
  {
    id: 'consequences',
    heading: 'Consequences of Notifiable Work Without Compliance',
    content: (
      <>
        <p>
          Carrying out notifiable Part P work without either scheme self-certification or
          building control notification is a breach of building regulations. The consequences
          can be significant for both the homeowner and the electrician.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Property sale delays</strong> — when a property is sold, solicitors
                carry out searches that reveal building regulations compliance status. Absence
                of a Part P certificate for notifiable work can cause significant delays or
                require the work to be retroactively inspected and certified. This can cost
                thousands of pounds and delay completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance implications</strong> — home insurance policies may not
                cover damage or injury resulting from uncertified electrical work. If a fire
                is caused by uninspected notifiable electrical work, the insurer may refuse
                to pay a claim.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local authority enforcement</strong> — local authorities have powers
                to require removal or alteration of non-compliant work and to recover costs
                from the person responsible. Enforcement action is more commonly triggered
                by serious safety incidents than by routine compliance checking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Liability for electricians</strong> — electricians who carry out
                notifiable work without compliance expose themselves to civil liability
                if the installation subsequently causes harm. Without certification,
                demonstrating that the work was carried out to a proper standard is
                more difficult.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'scotland-ni',
    heading: 'Scotland and Northern Ireland: Different Frameworks',
    content: (
      <>
        <p>
          Part P applies only in England and Wales. Electricians working in Scotland or
          Northern Ireland need to understand the different frameworks that apply in
          those nations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scotland</strong> — governed by Building Standards (Scotland)
                Regulations. Electrical work in dwellings is notifiable under Standard 4.5
                (Electrical safety). Self-certification is through the Approved Certifier
                of Construction scheme, operated primarily by{' '}
                <SEOInternalLink href="/select-electrical-registration">SELECT</SEOInternalLink>.
                More domestic electrical work is notifiable in Scotland than under Part P
                in England.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Northern Ireland</strong> — governed by The Building Regulations
                (Northern Ireland) 2012. Technical Booklet E covers electrical safety.
                Northern Ireland has its own competent person scheme arrangements and
                building control structure operating through local councils.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wales</strong> — Part P applies in Wales with the same scope as
                England. Building regulations in Wales are the responsibility of the Welsh
                Government, though the Part P framework has remained aligned with England.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'scheme-comparison',
    heading: 'Choosing a Competent Person Scheme',
    content: (
      <>
        <p>
          The main government-approved competent person schemes for electrical self-certification
          in England and Wales are NICEIC, NAPIT, and ELECSA. There are also smaller schemes
          for specific sectors (e.g., BESCA for heating and ventilation, Oil Firing Technical
          Association for oil systems). For electrical work, NICEIC and NAPIT are the dominant
          choices.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC</strong> — the most recognisable scheme for consumers.
                Strong domestic market presence. Offers multiple tiers (Approved Contractor,
                Domestic Installer, Domestic Part P). See the full{' '}
                <SEOInternalLink href="/niceic-vs-napit-comparison">
                  NICEIC vs NAPIT comparison
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT</strong> — multi-discipline coverage (electrical, heating,
                plumbing, microgeneration). Good value for contractors working across
                multiple regulated trades. Well accepted by insurers and building control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ELECSA</strong> — part of the Certsure group (alongside NICEIC).
                Similar assessment standard to NICEIC. Some contractors prefer ELECSA's
                approach or pricing. Fully accepted by building control and insurers.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Part P Compliance and Certification',
    content: (
      <>
        <p>
          Staying on top of Part P notifications and certification is a core administrative
          responsibility for any electrician doing domestic work in England and Wales. Elec-Mate
          helps you generate compliant certificates on site and deliver them to clients
          immediately.
        </p>
        <SEOAppBridge
          title="Complete Part P certification on your phone"
          description="Join 430+ UK electricians using Elec-Mate to complete Electrical Installation Certificates, Minor Works Certificates, and EICRs on site. Instant PDF generation and client delivery. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PartPSelfCertificationPage() {
  return (
    <GuideTemplate
      title="Part P Self-Certification UK | Competent Person Scheme Guide"
      description="Complete guide to Part P self-certification — what Part P covers, which work is notifiable, how competent person schemes work, consequences of non-compliance, and Scotland/Northern Ireland differences."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Building Regulations Guide"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Part P Self-Certification:{' '}
          <span className="text-yellow-400">Competent Person Scheme Guide UK</span>
        </>
      }
      heroSubtitle="A complete guide to Part P of the Building Regulations — what work is notifiable, how competent person schemes allow self-certification, the consequences of non-compliance, and how Scotland and Northern Ireland differ."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Part P Self-Certification"
      relatedPages={relatedPages}
      ctaHeading="Generate Part P Certificates on Your Phone"
      ctaSubheading="Complete Electrical Installation Certificates, Minor Works Certificates, and EICRs on site with Elec-Mate. Instant PDF generation, automatic client delivery, and scheme-compliant documentation. 7-day free trial."
    />
  );
}
