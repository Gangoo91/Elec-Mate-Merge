import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ClipboardCheck,
  ShieldCheck,
  FileText,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  {
    label: 'Wiring Regulations and Building Regulations',
    href: '/wiring-regulations-building-regulations',
  },
];

const tocItems = [
  { id: 'bs7671-vs-partp', label: 'BS 7671 vs Part P — What Is the Difference?' },
  { id: 'notifiable-work', label: 'Notifiable vs Non-Notifiable Work' },
  { id: 'competent-person', label: 'Competent Person Schemes' },
  { id: 'building-control-route', label: 'Building Control Route' },
  { id: 'common-misconceptions', label: 'Common Misconceptions About Part P' },
  { id: 'scotland-wales', label: 'Scotland and Wales' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671:2018+A3:2024 (the IET Wiring Regulations) is a British Standard setting the technical requirements for electrical installations. It is not legislation but is referenced in law. Part P of the Building Regulations is legislation — it creates a legal obligation to notify and have certain electrical work inspected in domestic dwellings in England.',
  'Part P only applies to electrical installation work in dwellings (houses, flats, caravans) in England. It does not apply to commercial premises, Scotland, Wales, or Northern Ireland (each of which has its own building regulations).',
  'Notifiable work under Part P includes: installing a new circuit, replacing a consumer unit, and all work in kitchens, bathrooms, and outdoors in a dwelling. Non-notifiable work includes minor additions and alterations to existing circuits outside special locations.',
  'Registered electricians belonging to a competent person scheme (NICEIC, NAPIT, ELECSA) can self-certify notifiable work and notify building control on behalf of the client automatically. This avoids the need for a building notice or full plans application.',
  'A building owner or homeowner who uses an unregistered electrician for notifiable work must submit a building notice (or full plans application) to the local authority BEFORE work starts. Failure to notify is a breach of Building Regulations and can create problems when selling the property.',
];

const faqs = [
  {
    question: 'Is BS 7671 a legal document?',
    answer:
      'BS 7671:2018+A3:2024 (the IET Wiring Regulations) is a British Standard, not legislation. It is not a legal document in itself. However, it is referenced in legislation — notably the Electricity at Work Regulations 1989 (which creates a general duty to ensure electrical systems are safe) and Part P of the Building Regulations (which references BS 7671 as the standard with which domestic electrical installations must comply). In practice, compliance with BS 7671 is the accepted way of demonstrating compliance with the legal obligations. Departing from BS 7671 is not illegal per se, but the installer must demonstrate an alternative method providing equivalent safety — a very high bar in practice.',
  },
  {
    question: 'What electrical work is notifiable under Part P?',
    answer:
      'Part P of the Building Regulations (England) requires notification of the following work in dwellings: (1) Installing a new circuit — any new cable run back to the consumer unit; (2) Replacing a consumer unit (fuse board); (3) Any electrical installation work in a kitchen — whether a new circuit or an addition to an existing circuit; (4) Any electrical installation work in a room containing a bath or shower; (5) Any electrical installation work in an outdoor location (garden, outbuildings, carport); (6) Any electrical installation work in a swimming pool or sauna. Non-notifiable work includes like-for-like replacement of accessories (sockets, switches, light fittings), adding extra sockets to an existing ring main in a non-special location, and replacing damaged cable in a like-for-like manner.',
  },
  {
    question: 'What is a competent person scheme?',
    answer:
      "A competent person scheme is a government-approved scheme that allows electricians registered with the scheme to self-certify that their work complies with Building Regulations and to notify building control automatically on behalf of the client. The main schemes for electricians are NICEIC, NAPIT, and ELECSA. Registration with a scheme requires the electrician to demonstrate technical competence (typically NVQ Level 3 and an inspection and testing qualification), to have appropriate insurance, and to agree to the scheme's code of conduct. The scheme carries out regular technical assessments of registered members. When a registered electrician certifies notifiable work, the scheme notifies building control and issues a Building Regulations Compliance Certificate to the client.",
  },
  {
    question: 'What happens if Part P work is not notified?',
    answer:
      "Failure to notify notifiable electrical work under Part P is a breach of Building Regulations. The local authority can require the work to be opened up for inspection, reversed, or remedied at the owner's expense. Practically, the main consequence for homeowners arises when selling the property — solicitors' searches will identify that there is no building regulations completion certificate for electrical work, and buyers may require the seller to obtain retrospective sign-off or reduce the sale price. Retrospective sign-off typically requires a qualified electrician to carry out an EICR on the installation and confirm it is satisfactory — at the homeowner's cost.",
  },
  {
    question: 'Can a homeowner carry out their own Part P electrical work?',
    answer:
      'A homeowner can carry out electrical work on their own property — there is no legal requirement for a qualified electrician to do the work. However, if the work is notifiable under Part P, the homeowner must submit a building notice (or full plans application) to the local authority BEFORE starting work and pay the associated fee (typically \u00a3100 to \u00a3300 depending on the authority). The local authority will then arrange an inspection during and after the work. The homeowner must demonstrate that the work complies with BS 7671. For complex work such as consumer unit replacement or new circuits, this route is rarely practical for a non-electrician, and hiring a registered electrician is strongly recommended.',
  },
  {
    question: 'Does Part P apply in Scotland and Wales?',
    answer:
      'Part P applies only in England. Scotland has its own Building Regulations (the Scottish Building Standards, governed by the Building (Scotland) Act 2003 and the Building (Scotland) Regulations 2004). In Scotland, all building work including electrical installation must comply with the standards, and notification to the local authority is required for most domestic electrical work. Wales uses the Building Regulations 2010 (as applies in England) but with some Wales-specific amendments via the Building (Amendment) (Wales) Regulations. Northern Ireland has its own Building Regulations (Northern Ireland) 2012. In all regions, BS 7671 is the reference standard for the technical requirements of electrical installations.',
  },
  {
    question: 'What is the difference between a building notice and a full plans application?',
    answer:
      "When using the building control route (rather than a competent person scheme) for notifiable electrical work, a homeowner or contractor can submit either a building notice or a full plans application. A building notice is a simpler form, submitted before work starts, that notifies the authority of the intended work without providing detailed drawings. The authority's building control officer (BCO) may inspect the work at various stages. A full plans application involves submitting detailed drawings and specifications for approval before work starts — the authority approves the design in principle, and inspections are arranged for key stages. For straightforward domestic electrical work, the building notice route is typically used. A full plans application is more appropriate for large or complex projects.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Landlord obligations for electrical inspections in rented properties under the 2020 Regulations.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what remedial action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/electrical-apprenticeship-apply',
    title: 'Electrical Apprenticeship — How to Apply',
    description:
      'Level 2 and Level 3 pathways, ECS card, JTL, and application tips for UK electricians.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/night-storage-heater-replacement',
    title: 'Night Storage Heater Replacement',
    description: 'Wiring requirements, Part P notification, and modern heating alternatives.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Generate compliant Electrical Installation Certificates for Part P-notifiable work.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'bs7671-vs-partp',
    heading: 'BS 7671 vs Part P — What Is the Difference?',
    content: (
      <>
        <p>
          BS 7671 and Part P are frequently confused, even by electricians. Understanding how they
          relate is essential for advising clients correctly and ensuring your installation work is
          both technically and legally compliant.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            BS 7671:2018+A3:2024 (the Wiring Regulations)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                A British Standard published by the IET (Institution of Engineering and Technology)
                and BSI. Sets the technical requirements for the design, selection, erection,
                inspection, and testing of electrical installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Not itself legislation. A voluntary standard that is referenced in law — compliance
                is the recognised way of demonstrating that electrical work is safe. Applies to all
                types of premises: domestic, commercial, and industrial.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Updated periodically. The current edition is BS 7671:2018+A3:2024 (Amendment 3,
                published 2024). Previous editions (16th and 17th editions) remain relevant for
                understanding existing installations but new work must comply with the current
                edition.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Part P of the Building Regulations (England)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Legislation — part of the Building Regulations 2010 (England). Creates a legal
                obligation to ensure that certain electrical installation work in dwellings is
                carried out safely and notified to building control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Applies only to dwellings in England. The Approved Document P states that electrical
                installation work must comply with BS 7671, making BS 7671 effectively mandatory for
                domestic electrical work through the building regulations route.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Compliance can be demonstrated either by using a registered competent person
                (self-certification) or by going through the local authority building control route
                (inspection and certification by the authority).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'notifiable-work',
    heading: 'Notifiable vs Non-Notifiable Electrical Work',
    content: (
      <>
        <p>
          Not all domestic electrical work requires notification under Part P. The distinction
          between notifiable and non-notifiable work is defined in the Building Regulations 2010 (as
          amended) and the Approved Document P.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">
            Notifiable Work (Part P, England)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Installation of a new circuit (any circuit back to the consumer unit)</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Replacement of a consumer unit (fuse board)</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                All electrical work in a room containing a bath or shower (including adding a light
                fitting or switching a socket to a shaver socket)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>All electrical work in a kitchen — whether a new circuit or an addition</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                All electrical work in an outdoor location (garden, shed, detached garage,
                outbuilding)
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Non-Notifiable Work</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Adding extra sockets or lighting points to existing circuits in main living areas
                (living room, bedroom, hallway) — where no new circuit is created
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Like-for-like replacement of accessories (socket outlets, light switches, ceiling
                roses) in non-special locations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Replacing a damaged or deteriorated cable where the existing cable route and circuit
                protection are unchanged
              </span>
            </li>
          </ul>
        </div>
        <p>
          Even where work is non-notifiable, it must still comply with BS 7671. A{' '}
          <SEOInternalLink href="/tools/minor-works" label="Minor Works Certificate" /> should be
          issued for non-notifiable additions or alterations to record what was done and confirm
          compliance.
        </p>
      </>
    ),
  },
  {
    id: 'competent-person',
    heading: 'Competent Person Schemes — Self-Certification',
    content: (
      <>
        <p>
          The competent person scheme route is the standard method used by most professional
          electricians for notifiable domestic work. Registration with a scheme allows
          self-certification — the electrician certifies the work and the scheme notifies building
          control, avoiding the need for local authority involvement.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC</strong> (National Inspection Council for Electrical Installation
                Contracting) — the largest competent person scheme provider in the UK. Requires NVQ
                Level 3, inspection and testing qualification, and annual assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT</strong> (National Association of Professional Inspectors and Testers)
                — government approved scheme, well established in domestic and commercial sectors.
                Offers membership to individuals and companies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ELECSA</strong> — part of the NICEIC group, focused on domestic and small
                commercial electrical contractors. Combined membership with NICEIC is available.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When a registered electrician completes notifiable work, they issue the client a Building
          Regulations Compliance Certificate (BRCC). This document is essential when selling the
          property — it proves the work was carried out by a competent person and is compliant with
          Building Regulations. Issue the{' '}
          <SEOInternalLink
            href="/tools/eic-certificate"
            label="Electrical Installation Certificate"
          />{' '}
          alongside the BRCC as the technical record of the installation.
        </p>
      </>
    ),
  },
  {
    id: 'building-control-route',
    heading: 'The Building Control Route',
    content: (
      <>
        <p>
          Where a non-registered person carries out notifiable work, the building control route must
          be used. This involves notifying the local authority before work starts and paying an
          inspection fee.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building notice:</strong> Submit a building notice form to the local
                authority before starting work. Pay the inspection fee (typically \u00a3100 to
                \u00a3300 depending on the authority). The building control officer (BCO) will
                arrange to inspect the work — during installation for key stages, and on completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full plans application:</strong> Submit detailed drawings and a
                specification for approval before starting. Approval is given in principle.
                Inspections are then arranged for key stages. Used for complex or larger projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Completion certificate:</strong> On satisfactory completion, the authority
                issues a completion certificate. This is equivalent to the BRCC issued by a
                competent person scheme. Keep this document — it is needed when selling the
                property.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-misconceptions',
    heading: 'Common Misconceptions About Part P',
    content: (
      <>
        <p>
          Part P is one of the most misunderstood aspects of UK building regulations among both the
          public and some electricians. The following misconceptions are frequently encountered.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Misconception: "Part P applies to all electrical work."</strong> Part P only
                applies to certain notifiable work in dwellings in England. Adding a socket to a
                living room ring main is not notifiable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  Misconception: "Only a registered electrician can do domestic work."
                </strong>
                Homeowners and unregistered workers can carry out domestic electrical work, but
                notifiable work must go through building control (not self-certify).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Misconception: "Part P applies in Scotland."</strong> Part P applies only in
                England. Scotland, Wales, and Northern Ireland each have their own building
                regulations with different notification requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Misconception: "An EICR satisfies Part P notification."</strong>
                An EICR documents the condition of an existing installation — it does not certify
                new work or satisfy Part P notification requirements for new circuits or consumer
                unit replacements.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'scotland-wales',
    heading: 'Building Regulations in Scotland and Wales',
    content: (
      <>
        <p>
          Electrical installation requirements differ between the nations of the UK. Understanding
          these differences is important for electricians working across borders or advising clients
          in different regions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scotland:</strong> Governed by Scottish Building Standards (Building
                (Scotland) Regulations 2004). Section 4 (Safety) and Section 4.5 (Electrical safety)
                require all electrical installation work to comply with BS 7671. Most domestic
                electrical work requires a building warrant — equivalent to Part P notification but
                administered differently. Completion certificates are issued by the local authority
                on inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wales:</strong> Wales uses the Building Regulations 2010 but with
                Wales-specific amendments. Part P applies in Wales with broadly similar scope to
                England. Competent person schemes recognised in England are also recognised in
                Wales.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Northern Ireland:</strong> Governed by the Building Regulations (Northern
                Ireland) 2012. Technical Booklet E (Resistance to the passage of sound) and
                Technical Booklet V cover electrical installation requirements. Building control
                notification is required for all domestic electrical work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians — Certifying Part P Work',
    content: (
      <>
        <p>
          Notifiable Part P work requires both an Electrical Installation Certificate (EIC) as the
          technical record and a Building Regulations Compliance Certificate (BRCC) issued through
          your competent person scheme. Elec-Mate provides the EIC.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge
                  href="/tools/eic-certificate"
                  label="Electrical Installation Certificate"
                />{' '}
                — generate Part P-compliant EICs on your phone with circuit schedules, test results,
                and instant PDF export. Issue to clients alongside the BRCC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/minor-works" label="Minor Works Certificate" /> — issue
                minor works certificates for non-notifiable additions and alterations to give
                clients a record of compliant work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function WiringRegulationsBuildingRegulationsPage() {
  return (
    <GuideTemplate
      title="Wiring Regulations vs Building Regulations — BS 7671 and Part P Explained"
      description="How BS 7671:2018+A3:2024 relates to Part P Building Regulations: notifiable vs non-notifiable work, competent person schemes (NICEIC, NAPIT, ELECSA), building control route, and common misconceptions about Part P."
      datePublished="2024-06-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations Guide"
      badgeIcon={FileText}
      heroTitle={
        <>
          Wiring Regulations and Building Regulations{' '}
          <span className="text-yellow-400">— BS 7671 and Part P Explained</span>
        </>
      }
      heroSubtitle="How BS 7671:2018+A3:2024 relates to Part P Building Regulations, notifiable vs non-notifiable work, competent person schemes, building control route, and common misconceptions."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Wiring Regulations and Building Regulations — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Certificate Part P work with compliant EICs on your phone"
      ctaSubheading="Elec-Mate generates BS 7671-compliant Electrical Installation Certificates for all notifiable domestic work."
    />
  );
}
