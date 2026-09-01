/**
 * Plug-in solar for landlords and managing agents — cluster spoke 2 (ELE-1661)
 *
 * The commercial page. Every other guide published on this subject addresses
 * the homeowner, who will buy one, plug it in, and never ring anybody. The
 * person who HAS to ring somebody is the landlord or managing agent facing a
 * tenant request, and the answer is mostly about the building rather than the
 * flat.
 *
 * 🔴 Never state that a landlord is legally required to obtain an electrician's
 * assessment before permitting a device — no such duty exists. What is true is
 * that the decision turns on facts about the building that a tenant cannot
 * establish, and that a written answer protects the person giving it.
 */

import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInlineLeadMagnet } from '@/components/seo/SEOInlineLeadMagnet';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { PLUG_IN_SOLAR_FACTS as F } from '@/lib/plugInSolarAssessment';
import { Building2, Sun, ShieldCheck, PackageOpen, FileCheck2 } from 'lucide-react';

const breadcrumbs = [
  { label: 'Plug-in Solar UK', href: '/plug-in-solar-uk' },
  { label: 'Landlords & Managing Agents', href: '/plug-in-solar-landlords-managing-agents' },
];

const tocItems = [
  { id: 'short-answer', label: 'The Short Answer' },
  { id: 'building-decides', label: 'The Building Decides, Not the Flat' },
  { id: 'permission', label: 'Permission Is Not the Tenant’s to Give' },
  { id: 'the-installation', label: 'The Installation Inside the Flat' },
  { id: 'insurance', label: 'Insurance and the Lease' },
  { id: 'one-per-household', label: 'One Device Per Household — in a Block' },
  { id: 'answering-in-writing', label: 'Answering a Tenant Request in Writing' },
  { id: 'social-housing', label: 'Social Housing and Larger Portfolios' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Plug-in solar is legal for a tenant to buy and self-install from 27 August 2026 — but that says nothing about whether your lease or tenancy permits it, or whether the building is suitable.',
  'The fire restrictions are decided by the building, not the flat: ACM and MCM cladding, HPL cladding, timber cladding and timber balconies are all excluded, as are buildings subject to external wall remediation works.',
  'One answer therefore covers every flat in the building at once, which is what makes this efficient to deal with properly rather than case by case.',
  'Users are responsible for obtaining permission from the owner, landlord, freeholder or managing agent — the specification says so explicitly, so a tenant proceeding without asking is not following the manufacturer’s instructions.',
  'Panels may not be fixed to a wall forming a property boundary between dwellings, and escape routes must be kept clear.',
  'Users are also responsible for checking whether the product affects insurance — their own and, where applicable, the building’s.',
  'G98 currently permits one device per household, so in a block that is per dwelling, not per building. Notification is the occupier’s duty and runs to the network operator, not to you.',
];

const faqs = [
  {
    question: 'Can a tenant install plug-in solar without the landlord’s permission?',
    answer:
      'Nothing in the regulations creates a right to. The specification states that users are responsible for obtaining any necessary permissions from the property owner, landlord, freeholder, managing agent or relevant authority prior to installation, including agreeing how any costs are apportioned, and for obtaining any planning permission or Listed Building Consent. So a tenant who installs without asking is acting outside the manufacturer’s instructions. Whether they are also in breach of their tenancy or lease depends on its terms — typically the clauses on alterations, fixings to the exterior, and use of common parts or the building fabric.',
  },
  {
    question: 'Can plug-in solar be installed on a balcony in a block of flats?',
    answer:
      'It depends entirely on what the building is made of. The specification requires a prominent warning that installation is not permitted on aluminium composite material (ACM) or metal composite material (MCM) cladding systems, high-pressure laminate (HPL) cladding systems, timber cladding systems or timber balconies, and not on buildings subject to external wall remediation works, building safety remediation works or equivalent restrictions relating to external wall fire safety. It also says panels must not be fixed to walls or parts of the building forming a property boundary between dwellings. In practice one assessment of the external wall construction answers the question for every flat in the block.',
  },
  {
    question: 'Is a landlord legally required to get an electrician to assess this?',
    answer:
      'No. There is no duty in these regulations requiring a landlord to obtain an assessment before permitting a plug-in solar device, and anyone telling you otherwise is overstating it. What is true is that the decision turns on facts about the building and the electrical installation that neither you nor the tenant can establish by looking — the external wall construction, the protective device on the circuit, the condition of the socket — and that a written answer from a competent person is what protects you if the decision is ever questioned. Existing duties under the Electrical Safety Standards in the Private Rented Sector Regulations are unaffected and continue to apply as normal.',
  },
  {
    question: 'How many plug-in solar devices are allowed in a block of flats?',
    answer:
      'The limit is per household, not per building. Engineering Recommendation G98 Issue 2 Amendment 1 2026 currently restricts installations to one device per household, and each dwelling is its own household for this purpose. The specification itself permits one device per final circuit, and the government has stated its intention to move to one per power circuit subject to changes to G98 — so expect this to loosen. What does not change is that each occupier notifies the distribution network operator separately for their own device.',
  },
  {
    question: 'Who notifies the network operator in a rented property?',
    answer: `The person installing and operating the device — in practice the tenant. Notification of connection and disconnection is mandatory and the product must be marked with that requirement, and G98 gives ${F.dnoNotificationWindowDays} days from commissioning via Form B, Appendix 3. It is connect-and-notify rather than prior approval, so it does not need arranging in advance. It is worth putting in writing that you expect it to be done, and that you expect to be told when the device is removed, because the deregistration obligation runs the same way and is almost universally forgotten.`,
  },
  {
    question: 'Does plug-in solar affect the building insurance?',
    answer:
      'It might, and the specification places the duty to check on the user: they are responsible for checking, before installation, whether the product may affect any relevant insurance arrangements, including their own and, where applicable, insurance covering the property or building. For a managing agent this is worth raising with the insurer once for the building rather than leaving each leaseholder to ask separately — the answer will be the same for all of them, and having it on file makes every subsequent request a two-minute reply.',
  },
  {
    question: 'What should I say when a tenant asks to install one?',
    answer:
      'Answer three things in writing: whether the building fabric permits it, whether the lease or tenancy permits it, and what conditions attach. The building question is the one that needs establishing properly — external wall construction, remediation status, and whether the proposed fixing point is on a boundary wall or obstructs an escape route. The conditions are usually the same each time: notify the network operator, do not use an extension lead, do not connect it to a battery, fix the supplied label at the consumer unit, and tell us when it is removed.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    title: 'Plug-in Solar UK: The Rules From 27 August 2026',
    description: 'The limits, the prohibitions, notification and where an electrician is needed.',
    href: '/plug-in-solar-uk',
    icon: Sun,
    category: 'Plug-in Solar',
  },
  {
    title: 'What a Plug-in Solar Kit Must Tell You',
    description: 'The mandated markings and documentation — and why none of it is on the listing.',
    href: '/what-plug-in-solar-must-tell-you',
    icon: PackageOpen,
    category: 'Plug-in Solar',
  },
  {
    title: 'Plug-in Solar and RCDs',
    description: 'What is recommended, what is required, and why they differ.',
    href: '/plug-in-solar-rcd-requirements',
    icon: ShieldCheck,
    category: 'Plug-in Solar',
  },
  {
    title: 'EICR for Landlords',
    description: 'The five-yearly duty in the private rented sector, and what a C2 actually means.',
    href: '/landlord-eicr-requirements',
    icon: FileCheck2,
    category: 'Landlords',
  },
];

const sections = [
  {
    id: 'short-answer',
    heading: 'The Short Answer',
    content: (
      <>
        <p>
          Since <strong>27 August 2026</strong> a tenant can lawfully buy a plug-in solar kit and
          install it themselves. That tells you nothing about whether{' '}
          <em>your</em> building can take one, or whether your lease or tenancy permits it.
        </p>
        <p>
          Three questions decide it, and only one of them is about the flat:
        </p>
        <ul>
          <li>
            <strong>Is the building suitable?</strong> The fire restrictions rule out several
            external wall constructions outright, and that answer covers every flat at once.
          </li>
          <li>
            <strong>Does the lease or tenancy permit it?</strong> Alterations, fixings to the
            exterior, use of the building fabric.
          </li>
          <li>
            <strong>Is the electrical installation in that dwelling suitable?</strong> The protective
            device, the socket, and whether an outdoor socket exists at all.
          </li>
        </ul>
        <p>
          Nothing obliges you to commission an assessment. But the first and third questions cannot be
          answered by looking, and a written answer from a competent person is what stands up later.
        </p>
      </>
    ),
  },
  {
    id: 'building-decides',
    heading: 'The Building Decides, Not the Flat',
    content: (
      <>
        <p>
          This is the part that makes plug-in solar unusually efficient for an agent to deal with
          properly. The specification requires the instructions to carry a prominent safety warning
          that installation is <strong>not permitted</strong> on:
        </p>
        <ul>
          <li>Aluminium composite material (ACM) cladding systems</li>
          <li>Metal composite material (MCM) cladding systems</li>
          <li>High-pressure laminate (HPL) cladding systems</li>
          <li>Timber cladding systems</li>
          <li>Timber balconies</li>
        </ul>
        <p>
          And a further prominent warning that it must not be installed on buildings subject to{' '}
          <strong>external wall remediation works, building safety remediation works, or equivalent
          restrictions relating to external wall fire safety</strong>. Where there is any uncertainty
          about the construction of the building, the instructions must tell the user to consult the
          building owner, freeholder, managing agent or other responsible person — which is to say,
          you.
        </p>
        <p>
          Two further constraints bite in blocks specifically: panels must not be fixed to walls or
          other parts of the building that <strong>form a property boundary between dwellings</strong>,
          and users are responsible for keeping escape and rescue paths clear. A panel on a balcony
          that is also an escape route is a different conversation from one on a garden fence.
        </p>
        <p>
          Establish the external wall construction and the remediation status once, and you have
          answered every flat in that building — including the ones that have not asked yet.
        </p>
      </>
    ),
  },
  {
    id: 'permission',
    heading: 'Permission Is Not the Tenant’s to Give',
    content: (
      <>
        <p>
          The specification is explicit, and it is worth quoting to anyone who argues: users are
          responsible for obtaining any necessary permissions from the{' '}
          <strong>property owner, landlord, freeholder, managing agent or relevant authority</strong>{' '}
          prior to installation — including agreeing how any costs associated with installation will
          be apportioned — and for obtaining any necessary planning permission and Listed Building
          Consent.
        </p>
        <p>
          So a tenant who installs one without asking is not following the manufacturer’s
          instructions. Whether they are also in breach of their agreement depends on its terms, but
          the usual clauses are the ones about alterations, fixing to the exterior, and use of common
          parts.
        </p>
        <p>
          Worth knowing on the planning side: the mounting must be reversible and non-permanent, and
          must not compromise the structural integrity, fire performance or weatherproofing of the
          building. That is a product requirement, not a planning one — but it is a useful condition
          to restate when you grant permission.
        </p>
      </>
    ),
  },
  {
    id: 'the-installation',
    heading: 'The Installation Inside the Flat',
    content: (
      <>
        <p>
          The building question is yours. The electrical question is about the dwelling, and it is
          the one most likely to generate actual work.
        </p>
        <ul>
          <li>
            <strong>No extension leads.</strong> The device plugs directly into a fixed socket-outlet
            and nothing else — no extension cables, cable reels, multi-way adaptors, RCD adaptors,
            travel adaptors or plug convertors. The panel is outside; the socket is usually inside.
            That gap is normally closed by fitting a fixed outdoor socket-outlet, which is electrical
            work with its own certification. Where the inverter and the socket are both outside, the
            socket needs <strong>{F.minOutdoorSocketIp} or better</strong>.
          </li>
          <li>
            <strong>Socket circuits only.</strong> Not a lighting circuit, and not a spur feeding
            fixed equipment such as a cooker or a boiler.
          </li>
          <li>
            <strong>The protective device.</strong> Type AC is not appropriate where DC components
            may be present, and bidirectional capability is a separate question from the type
            marking.{' '}
            <SEOInternalLink href="/plug-in-solar-rcd-requirements">
              The RCD question is set out in full here
            </SEOInternalLink>
            .
          </li>
          <li>
            <strong>Older or unlabelled boards.</strong> Where the consumer unit does not use modern
            protective devices, is not clearly labelled or is of unknown condition, the specification
            says to seek inspection and assessment by a qualified electrician before installing.
          </li>
          <li>
            <strong>No batteries.</strong> Battery storage and battery-integrated plug-in solar are
            outside this route entirely.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'insurance',
    heading: 'Insurance and the Lease',
    content: (
      <>
        <p>
          The specification places the duty on the user: they are responsible for checking, before
          installation, whether the product may affect any relevant insurance arrangements —{' '}
          <strong>including their own and, where applicable, insurance covering the property or
          building</strong>.
        </p>
        <p>
          For a single let that is the tenant’s problem. For a block it is not, because the building
          policy is yours and the answer is identical for every leaseholder who asks. Raising it once
          with the insurer and recording the answer turns every subsequent request into a two-minute
          reply instead of a fresh enquiry.
        </p>
      </>
    ),
  },
  {
    id: 'one-per-household',
    heading: 'One Device Per Household — What That Means in a Block',
    content: (
      <>
        <p>
          Engineering Recommendation G98 Issue 2 Amendment 1 2026 currently restricts this to{' '}
          <strong>one device per household</strong>, and each dwelling is its own household. So a
          block of thirty flats is thirty potential devices, not one.
        </p>
        <p>
          The specification itself permits one device per <em>final circuit</em>, and the government
          has said its approach is to move to one per power circuit subject to corresponding changes
          to G98 — on the basis that most UK dwellings have at least two power circuits. Treat the
          current limit as a rule that is expected to loosen rather than a settled position.
        </p>
        <p>
          Notification runs from the occupier to the distribution network operator, not to you. It is
          connect-and-notify, with {F.dnoNotificationWindowDays} days from commissioning under G98
          Form B. Worth making a written condition anyway — along with telling you when the device is
          removed, because the deregistration obligation runs the same way and is almost universally
          forgotten.
        </p>
      </>
    ),
  },
  {
    id: 'answering-in-writing',
    heading: 'Answering a Tenant Request in Writing',
    content: (
      <>
        <p>
          A reply that holds up covers four things. It is worth having it as a template, because the
          request will come again.
        </p>
        <ul>
          <li>
            <strong>The building.</strong> Whether the external wall construction and remediation
            status permit a panel at all, and where it may and may not be fixed.
          </li>
          <li>
            <strong>The agreement.</strong> Whether the lease or tenancy permits it, and on what
            terms.
          </li>
          <li>
            <strong>The conditions.</strong> Direct connection to a fixed socket only, no extension
            lead, no battery, no lighting circuit, the supplied label fixed at the consumer unit, and
            the mounting reversible.
          </li>
          <li>
            <strong>The obligations.</strong> That they notify the network operator within{' '}
            {F.dnoNotificationWindowDays} days, tell you and the operator when it is removed, and
            check their own contents insurance.
          </li>
        </ul>
        <p>
          Where the electrical installation itself needs assessing, that is a job for a competent
          electrician and it produces a document you can keep on file against the flat — which is
          worth considerably more than a phone call when the question resurfaces in two years with a
          different tenant.
        </p>
      </>
    ),
  },
  {
    id: 'social-housing',
    heading: 'Social Housing and Larger Portfolios',
    content: (
      <>
        <p>
          At portfolio scale the economics invert. Answering these one at a time is expensive;
          answering them by building is not, because the fire restrictions and the insurance position
          are properties of the building and the electrical position is usually consistent across
          dwellings of the same age and specification.
        </p>
        <p>
          The practical approach is a standing position per building — permitted, permitted with
          conditions, or not permitted, with the reason recorded — plus a standard conditions list
          issued with every approval. That turns an unpredictable stream of individual queries into a
          reference document, and it means the answer given in March is the same one given in
          November.
        </p>
        <p>
          It is also worth anticipating the direction of travel. Demand for these will rise, the
          one-per-household limit is expected to loosen to one per circuit, and the question will
          arrive more often rather than less.
        </p>
      </>
    ),
  },
];

export default function PlugInSolarLandlordsPage() {
  return (
    <GuideTemplate
      title="Plug-in Solar in Rented and Leasehold Property: What to Check"
      description="A tenant can lawfully install plug-in solar from 27 August 2026 — but the cladding restrictions, boundary walls, permission, insurance and the electrical installation all still apply. What landlords and managing agents need to establish, and how to answer in writing."
      datePublished="2026-09-01"
      dateModified="2026-09-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlords & Agents"
      badgeIcon={Building2}
      heroTitle={
        <>
          Plug-in Solar in Rented and Leasehold Property:{' '}
          <span className="text-yellow-400">What Landlords and Agents Must Check</span>
        </>
      }
      heroSubtitle="Plug-in solar became legal for a tenant to self-install on 27 August 2026. Whether your building can take one is a separate question — and it is decided by the external wall construction, not by the flat. This page sets out what to establish, what to put in writing, and where the real work sits."
      readingTime={10}
      answerBox={{
        question: 'Can a tenant install plug-in solar without permission?',
        answer:
          'Nothing in the regulations creates a right to. The specification states users are responsible for obtaining any necessary permissions from the owner, landlord, freeholder, managing agent or relevant authority before installation, and for any planning permission or Listed Building Consent.',
        detail:
          'Whether it is also a breach of the tenancy depends on its terms — usually the clauses on alterations and fixings to the exterior. The building question is separate: cladding and remediation restrictions rule out whole buildings at once.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      leadMagnet={
        <SEOInlineLeadMagnet
          headline="Plug-in Solar — What Actually Changed. Free 8-page guide"
          description="The limits, the prohibitions, the surfaces you cannot mount on, the RCD question answered from the source, and what the manufacturer is required to tell your tenant. Written for electricians and apprentices."
          bullets={[
            'The full mounting and fire restrictions, with sources',
            'Recommended vs required, cited to the source',
            'Free PDF — print it, share it, pin it up',
          ]}
          source="lead_magnet_plug_in_solar"
          analyticsLabel="plug_in_solar_guide_seo_landlord"
        />
      }
      faqs={faqs}
      faqHeading="Plug-in Solar for Landlords — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Give the Answer in Writing, Once"
      ctaSubheading="Elec-Mate's Plug-in Solar Suitability & Commissioning Certificate assesses the installation and produces a separate one-page decision sheet for a landlord or managing agent — plain English, no regulation numbers, drawn from the same assessment so the two cannot disagree. Join 1,600+ UK electricians. 7-day free trial."
    />
  );
}
