/**
 * Plug-in solar on a balcony — cluster spoke 4 (ELE-1661)
 *
 * Overlaps the landlord page on the fire restrictions, so it is deliberately
 * weighted towards SITING AND MOUNTING — wind and snow loading, height limits,
 * ballast, fixings, ventilation, spacing, escape routes and lightning
 * separation. None of that appears on any other page in the cluster, and it is
 * what a consumer searching "balcony solar" actually needs.
 *
 * If this ever starts reading as a duplicate of the landlord page, fold it into
 * the hub rather than keep two thin pages competing for the same terms.
 */

import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInlineLeadMagnet } from '@/components/seo/SEOInlineLeadMagnet';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { PLUG_IN_SOLAR_FACTS as F } from '@/lib/plugInSolarAssessment';
import { Building, Sun, Building2, ShieldCheck, PackageOpen } from 'lucide-react';

const breadcrumbs = [
  { label: 'Plug-in Solar UK', href: '/plug-in-solar-uk' },
  { label: 'Flats & Balconies', href: '/plug-in-solar-flats-balconies' },
];

const tocItems = [
  { id: 'short-answer', label: 'The Short Answer' },
  { id: 'surfaces', label: 'The Surfaces You Cannot Mount On' },
  { id: 'boundary-escape', label: 'Boundary Walls and Escape Routes' },
  { id: 'wind-and-height', label: 'Wind, Snow and How High You Can Go' },
  { id: 'fixings', label: 'Fixings, Ballast and Reversibility' },
  { id: 'the-socket', label: 'Getting to a Socket Without an Extension Lead' },
  { id: 'lightning', label: 'Lightning Protection Systems' },
  { id: 'permission', label: 'Permission, and Who to Ask' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The mounting surface is the first question, and it is decided by the building: ACM and MCM cladding, HPL cladding, timber cladding and timber balconies are all excluded outright.',
  'So are buildings subject to external wall remediation works, building safety remediation works, or equivalent restrictions relating to external wall fire safety.',
  'Panels must not be fixed to a wall or other part of the building forming a property boundary between dwellings, and escape and rescue routes must be kept clear.',
  'The manufacturer must state the maximum permissible installation height above ground level, and permissible heights based on wind loading calculated to BS EN 1991-1-4.',
  'Any attachment method must be reversible and non-permanent, and must not compromise the structural integrity, fire performance or weatherproofing of the building.',
  'No extension leads, cable reels or adaptors — the device plugs into a fixed socket-outlet, and where both the inverter and the socket are outside, the socket needs IP55 or better.',
  'Where the building has a lightning protection system, the separation distance to BS EN IEC 62305-3 must be observed.',
];

const faqs = [
  {
    question: 'Can I put plug-in solar on my balcony?',
    answer:
      'Often yes, but it depends on what the building is made of rather than on the balcony itself. Installation is not permitted on aluminium composite material (ACM) or metal composite material (MCM) cladding systems, high-pressure laminate (HPL) cladding systems, timber cladding systems or timber balconies, nor on buildings subject to external wall remediation works or equivalent external wall fire safety restrictions. You also cannot fix a panel to a wall forming a property boundary between dwellings, and you must keep escape routes clear. If you are unsure what your external walls are made of, the instructions must tell you to consult the building owner, freeholder or managing agent — and that is the right call.',
  },
  {
    question: 'Can I fit plug-in solar to a timber balcony or a wooden fence?',
    answer:
      'Not to a timber balcony — the specification requires a prominent safety warning that installation is not permitted on timber balconies or timber cladding systems. A wooden garden fence is a different matter from a timber balcony on a building, but there is a separate planning point: recent planning rules mean plug-in solar cannot be installed under permitted development on wooden fences, gates, walls, balconies or enclosures. The position on timber sheds is less clear. Check with your local planning authority, or mount on a ground frame instead.',
  },
  {
    question: 'How high can I mount a plug-in solar panel?',
    answer:
      'There is no single national figure — it is product specific and the manufacturer has to tell you. The specification requires the documentation to state the maximum permissible installation height above ground level and any installation restrictions needed to ensure the product and its mounting can withstand expected wind and snow loads in the UK, and to give permissible installation heights based on wind effects calculated to BS EN 1991-1-4. Follow the figure in your manual for your specific mounting type. A panel is a large sail and the consequences of it coming off a fourth-floor balcony are not comparable to it falling over in a garden.',
  },
  {
    question: 'Do I need to bolt it down, and will that damage the building?',
    answer:
      'The attachment method must be reversible and non-permanent, and must not compromise the structural integrity, fire performance or weatherproofing of the building. In practice that means clamps and brackets rather than through-fixings into cladding, and ballasted ground frames where the surface allows. Ballast is often not supplied with the kit, so check before delivery day. If the only way to make it secure would be to drill into an external wall, stop and get advice — that is both a permission question and a weatherproofing one.',
  },
  {
    question: 'How do I get the cable to a socket if my sockets are all indoors?',
    answer: `Not with an extension lead — those are excluded, along with cable reels, multi-way adaptors, RCD adaptors, travel adaptors and plug convertors. The device connects directly to a fixed socket-outlet using the manufacturer's own plug. Where the inverter and socket are both outdoors, the socket needs an ingress protection rating of ${F.minOutdoorSocketIp} or better. Some kits are designed so the DC cable is routed from outside to inside and the plug is fitted indoors; where that is the case the manufacturer must supply the necessary DC connectors and clear instructions for the permitted routing method. Running a cable through an open window or door is not an acceptable arrangement.`,
  },
  {
    question: 'Is plug-in solar allowed in a flat at all?',
    answer:
      'There is nothing in the regulations that excludes flats as such. The constraints that bite are the external wall construction, the boundary wall rule, escape routes, and whether your lease or tenancy permits it. In a modern block the external wall question is the one most likely to give a negative answer, and it will give the same answer for every flat in the building. Your managing agent may well already have established the position — asking is quicker than guessing.',
  },
  {
    question: 'What if my building has a lightning protection system?',
    answer:
      'Then the necessary separation distance from the discharge paths of that system must be observed, calculated in accordance with BS EN IEC 62305-3. The specification requires the manufacturer to include information about this in the documentation. This is not something to judge by eye on a balcony — if there is a lightning protection system on the building, that is a question for a competent person before anything is mounted.',
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
    title: 'Plug-in Solar for Landlords and Managing Agents',
    description: 'Answering a tenant request in writing, and what the building decides.',
    href: '/plug-in-solar-landlords-managing-agents',
    icon: Building2,
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
    title: 'What a Plug-in Solar Kit Must Tell You',
    description: 'The mandated markings and documentation — including the mounting warnings.',
    href: '/what-plug-in-solar-must-tell-you',
    icon: PackageOpen,
    category: 'Plug-in Solar',
  },
];

const sections = [
  {
    id: 'short-answer',
    heading: 'The Short Answer',
    content: (
      <>
        <p>
          Balcony solar is what plug-in solar was invented for, and there is nothing in the rules
          that excludes flats. But the first question is not about your balcony — it is about{' '}
          <strong>what the outside of your building is made of</strong>, and that answer is the same
          for every flat in the block.
        </p>
        <p>
          Several external wall constructions are excluded outright. Beyond that, the constraints are
          physical and practical: how high, how it is fixed, wind loading, escape routes, and getting
          to a socket without an extension lead.
        </p>
      </>
    ),
  },
  {
    id: 'surfaces',
    heading: 'The Surfaces You Cannot Mount On',
    content: (
      <>
        <p>
          The specification requires a <strong>prominent safety warning</strong> in the instructions
          that installation is not permitted on:
        </p>
        <ul>
          <li>Aluminium composite material (ACM) cladding systems</li>
          <li>Metal composite material (MCM) cladding systems</li>
          <li>High-pressure laminate (HPL) cladding systems</li>
          <li>Timber cladding systems</li>
          <li>Timber balconies</li>
        </ul>
        <p>
          And a second prominent warning against installation on buildings subject to{' '}
          <strong>external wall remediation works, building safety remediation works, or equivalent
          restrictions relating to external wall fire safety</strong>.
        </p>
        <p>
          If there is any uncertainty about the construction of the building — and from a balcony
          there usually is — the instructions must tell you to consult the building owner,
          freeholder, managing agent or other responsible person. That is not a formality to work
          around; from outside, ACM and HPL are not reliably distinguishable from things that are
          perfectly fine.
        </p>
        <p>
          The instructions must also give practical guidance on resisting fire spread from one
          dwelling to another, having regard to the size, position and use of the panel.
        </p>
      </>
    ),
  },
  {
    id: 'boundary-escape',
    heading: 'Boundary Walls and Escape Routes',
    content: (
      <>
        <p>Two rules that specifically catch flats and terraces:</p>
        <ul>
          <li>
            <strong>No fixing to a property boundary.</strong> Users are responsible for ensuring
            panels are not installed on or fixed to walls or other parts of the building that form a
            property boundary between dwellings — the party wall between you and next door, or the
            divider between two balconies.
          </li>
          <li>
            <strong>Escape routes stay clear.</strong> Users are responsible for keeping escape and
            rescue paths clear. A balcony that forms part of a means of escape, or that a fire service
            ladder would reach, is not a place to put a two-metre panel and a cable.
          </li>
        </ul>
        <p>
          Assembly instructions must also cover safe installation locations that minimise the risk of
          the product or its components falling or becoming detached, obstructing escape routes, or
          endangering occupants, neighbours or members of the public.
        </p>
      </>
    ),
  },
  {
    id: 'wind-and-height',
    heading: 'Wind, Snow and How High You Can Go',
    content: (
      <>
        <p>
          A solar panel is a large flat sail, and this is the part of a balcony installation most
          often underestimated. The specification requires the manufacturer to state:
        </p>
        <ul>
          <li>
            <strong>The maximum permissible installation height above ground level</strong>, and any
            installation restrictions needed to ensure the product and mounting can withstand expected
            wind and snow loads in the UK.
          </li>
          <li>
            <strong>Permissible installation heights based on wind effects</strong> for the loaded
            area, calculated in accordance with BS EN 1991-1-4, for the product and each specified
            mounting type.
          </li>
          <li>
            Information on fastening or ballasting depending on the expected wind and snow load.
          </li>
        </ul>
        <p>
          There is no single national height figure — it is product and mounting specific, and it will
          be in your manual. What matters is that a height that is fine at ground level in a
          sheltered garden may not be permitted on a fourth-floor balcony on an exposed elevation,
          and the consequences of getting it wrong are not comparable.
        </p>
        <p>
          Guidance on selecting the installation location must also cover wind and snow load zones,
          the permissible ambient temperature range, and any limitations in corrosive environments —
          which for a coastal block is a real consideration rather than a theoretical one.
        </p>
      </>
    ),
  },
  {
    id: 'fixings',
    heading: 'Fixings, Ballast and Reversibility',
    content: (
      <>
        <p>
          Any attachment method must be <strong>reversible and non-permanent</strong>, and must not
          compromise the <strong>structural integrity, fire performance or weatherproofing</strong>{' '}
          of the building. That rules out a lot of the obvious answers: through-fixing into cladding
          breaches both the fire performance and the weatherproofing, and is not available to you.
        </p>
        <p>
          In practice that leaves clamps to a railing, a ballasted frame, or a proprietary mount
          designed for the purpose. A few things worth knowing before delivery day:
        </p>
        <ul>
          <li>
            <strong>Ballast is frequently not included</strong> in the kit. Ground and floor mounts
            often need gravel, slabs or blocks that you supply, and the manufacturer specifies how
            much.
          </li>
          <li>
            The manufacturer must supply a detailed list of the individual components for the
            specified mounting system — if parts are missing, the mounting is not the specified one.
          </li>
          <li>
            <strong>Ventilation and spacing</strong> requirements must be observed. Panels flat
            against a surface with no airflow behind them are outside the manufacturer’s
            specification and will perform worse.
          </li>
          <li>
            Connector pairs must be protected against shear and tensile stress at the terminations,
            even when not fixed to a mounting surface — which is to say, do not leave the connectors
            hanging by their own cable.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'the-socket',
    heading: 'Getting to a Socket Without an Extension Lead',
    content: (
      <>
        <p>
          This is where balcony installations most often come unstuck, because the panel is outside
          and the sockets are inside.
        </p>
        <p>
          The device connects <strong>directly to a fixed socket-outlet</strong> using the plug the
          manufacturer supplied. No extension cables, cable reels, multi-way adaptors, RCD adaptors,
          travel adaptors or plug convertors — the warning is required on the plug itself. Running a
          cable through an open window or door is not an acceptable arrangement.
        </p>
        <p>
          There are two legitimate routes. Either the inverter and the plug are outside, and the
          socket is a fixed outdoor socket-outlet rated{' '}
          <strong>{F.minOutdoorSocketIp} or better</strong> — which is electrical work on the fixed
          installation, and carries its own certification. Or the DC cable is routed from outside to
          inside and the inverter sits indoors, in which case the manufacturer must supply the
          appropriate DC connectors to enable that routing and give clear instructions on the
          permitted method.
        </p>
        <p>
          Cables must be installed to reduce the risk of accident — pull relief, bending radii, no
          burying in the ground, no wet areas — and positioned so they do not create trip hazards on
          what is often a small balcony.
        </p>
      </>
    ),
  },
  {
    id: 'lightning',
    heading: 'Lightning Protection Systems',
    content: (
      <>
        <p>
          Easily missed on a taller block. Where the building has a lightning protection system, the{' '}
          <strong>necessary separation distance from the discharge paths</strong> of that system must
          be observed, in accordance with BS EN IEC 62305-3, and the manufacturer must provide
          information about it.
        </p>
        <p>
          This is not a judgement to make by eye from a balcony. If the building has a lightning
          protection system, that is a question for a competent person before anything goes up.
        </p>
      </>
    ),
  },
  {
    id: 'permission',
    heading: 'Permission, and Who to Ask',
    content: (
      <>
        <p>
          Users are responsible for obtaining any necessary permissions from the property owner,
          landlord, freeholder, managing agent or relevant authority{' '}
          <strong>prior to installation</strong> — including agreeing how any costs are apportioned —
          and for any planning permission and Listed Building Consent. You are also responsible for
          checking whether the product affects any relevant insurance, your own and the building’s.
        </p>
        <p>
          Asking is also the fastest route to the answer you actually need. The external wall
          construction and the remediation status are things your managing agent either knows or can
          establish, and they will have to answer it for the whole building sooner or later anyway.
        </p>
        <p>
          <SEOInternalLink href="/plug-in-solar-landlords-managing-agents">
            If you are the landlord or agent receiving that request, the professional view is here
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
];

export default function PlugInSolarBalconiesPage() {
  return (
    <GuideTemplate
      title="Plug-in Solar on a Balcony: The Surfaces You Cannot Mount On"
      description="Balcony solar is legal in Great Britain from 27 August 2026, but not on ACM, MCM or HPL cladding, timber cladding or timber balconies, or buildings under external wall remediation. Wind loading, height limits, fixings and getting to a socket without an extension lead."
      datePublished="2026-09-01"
      dateModified="2026-09-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Flats & Balconies"
      badgeIcon={Building}
      heroTitle={
        <>
          Plug-in Solar on a Balcony:{' '}
          <span className="text-yellow-400">The Surfaces You Cannot Mount On</span>
        </>
      }
      heroSubtitle="Balcony solar is what the plug-in route was invented for, and nothing in the rules excludes flats. But the first question is what your building is made of — several external wall constructions are excluded outright — followed by wind loading, height, fixings and how you reach a socket without an extension lead."
      readingTime={9}
      answerBox={{
        question: 'Can I put plug-in solar on my balcony?',
        answer:
          'Usually yes, but it depends on the building rather than the balcony. Installation is not permitted on ACM, MCM or HPL cladding, timber cladding or timber balconies, nor on buildings subject to external wall remediation works. Panels also may not be fixed to a wall forming a boundary between dwellings.',
        detail:
          'Beyond the surface, the constraints are the manufacturer’s maximum installation height for wind loading, reversible fixings that do not breach weatherproofing, keeping escape routes clear, and reaching a fixed socket without an extension lead.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      leadMagnet={
        <SEOInlineLeadMagnet
          headline="Plug-in Solar — What Actually Changed. Free 8-page guide"
          description="Every limit and prohibition, the mounting and fire restrictions in full, the RCD question answered from the source, and what the box is legally required to tell you. Written for electricians and apprentices."
          bullets={[
            'The full mounting and siting restrictions, with sources',
            'Recommended vs required, cited to the source',
            'Free PDF — print it, share it, pin it up',
          ]}
          source="lead_magnet_plug_in_solar"
          analyticsLabel="plug_in_solar_guide_seo_balcony"
        />
      }
      faqs={faqs}
      faqHeading="Plug-in Solar on Balconies — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Checking a Flat Before the Panel Arrives"
      ctaSubheading="Elec-Mate's Plug-in Solar Suitability & Commissioning Certificate assesses the mounting position against the fire restrictions and the installation against the electrical ones, then produces a plain-English decision sheet for a landlord or managing agent. Join 1,600+ UK electricians. 7-day free trial."
    />
  );
}
