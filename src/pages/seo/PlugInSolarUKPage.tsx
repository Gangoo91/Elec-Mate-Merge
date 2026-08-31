/**
 * Plug-in solar UK — cluster hub (ELE-1661)
 *
 * Every figure on this page reads from PLUG_IN_SOLAR_FACTS so the public page
 * and the in-app assessment cannot drift apart. Do not hard-code a limit here.
 *
 * Two things this page must never do:
 *
 *  1. State or imply that an electrician's assessment is legally required. It is
 *     not — the specification's scope is explicitly installation and operation
 *     "by ordinary persons". Overclaiming here is the same category of error as
 *     the competitor claims that drew a cease and desist.
 *  2. Present Electrical Safety First's guidance, or professional judgement, as
 *     law. Recommendation and requirement are separated visually throughout.
 */

import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInlineLeadMagnet } from '@/components/seo/SEOInlineLeadMagnet';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { PLUG_IN_SOLAR_FACTS as F } from '@/lib/plugInSolarAssessment';
import { Sun, ShieldCheck, Zap, FileCheck2, ClipboardCheck } from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-testing-guide' },
  { label: 'Plug-in Solar UK', href: '/plug-in-solar-uk' },
];

const tocItems = [
  { id: 'what-changed', label: 'What Changed on 27 August 2026' },
  { id: 'what-it-is', label: 'What a Plug-in Solar Device Actually Is' },
  { id: 'the-limits', label: 'The Limits' },
  { id: 'not-permitted', label: 'What Is Not Permitted' },
  { id: 'the-circuit', label: 'The Circuit and the Socket' },
  { id: 'rcd-question', label: 'The RCD Question' },
  { id: 'notification', label: 'Telling Your Network Operator' },
  { id: 'not-a-device', label: 'What Is Not a Plug-in Solar Device' },
  { id: 'who-needs-advice', label: 'Who Should Get Advice First' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  `Plug-in solar became legal to sell and self-install in Great Britain on 27 August 2026 under ${F.statutoryInstrument}, which points at the DESNZ Plug-in Solar Device Interim Product Specification v2.0.`,
  `A device may supply no more than ${F.maxApparentPowerVA} VA and ${F.maxCurrentA} A to the installation, from PV modules totalling no more than ${F.maxPvModuleDcW} W DC.`,
  `Above ${F.professionalAssessmentThresholdW} W of PV module capacity, the manufacturer must advise the customer to consider a professional assessment of their electrical installation before installing.`,
  'Batteries are outside this route entirely — plug-in battery systems and battery-integrated plug-in solar are excluded from the specification.',
  'It must be plugged directly into a fixed socket-outlet. Extension cables, multi-way adaptors, RCD adaptors and travel adaptors are not permitted, and it must not go on a lighting circuit or a spur feeding fixed equipment.',
  `Notifying the distribution network operator is mandatory, but it is connect-and-notify: the device is installed and commissioned first, and G98 gives ${F.dnoNotificationWindowDays} days from commissioning.`,
  'No law requires a householder to involve an electrician. Electrical Safety First do recommend an assessment before purchase — that is credible guidance, not a legal duty, and the difference matters.',
];

const faqs = [
  {
    question: 'Are plug-in solar panels legal in the UK?',
    answer: `Yes, in Great Britain, from 27 August 2026. ${F.statutoryInstrument} — the Plugs and Sockets etc. (Safety) Regulations 1994 and ESQCR 2002 (Amendment) Regulations 2026 — created an approval route for standard plugs used with plug-in microgenerators, provided the product meets the DESNZ Plug-in Solar Device Interim Product Specification v2.0. Engineering Recommendation G98 applies to Great Britain only; Northern Ireland connects under G98/NI and the specification records that its application there is still being considered.`,
  },
  {
    question: 'Do I need an electrician to install plug-in solar?',
    answer:
      'Not as a matter of law. The specification is written around installation and operation by ordinary persons, and nothing obliges a householder to involve an electrician in plugging one in. Electrical Safety First recommend that households have their installation assessed by a competent electrician registered with a competent person scheme before purchasing or using a plug-in solar system — that is published safety guidance rather than a legal requirement. You will need an electrician for any work on the fixed installation itself: fitting an outdoor socket-outlet, changing a protective device, or altering the circuit.',
  },
  {
    question: 'How many plug-in solar devices can I have?',
    answer:
      'One per household under Engineering Recommendation G98 Issue 2 Amendment 1 2026 as it currently stands, and that is the binding constraint today. The specification itself permits one device per final circuit, and the government has stated its approach is to move to one per power circuit subject to corresponding changes to G98 — because most UK dwellings have at least two power circuits. Treat this as a rule that is expected to change, and check before relying on it.',
  },
  {
    question: 'Can I plug it into an extension lead?',
    answer:
      'No. The device must be connected directly to a fixed socket-outlet using the plug the manufacturer supplied. Extension cables, cable reels, multi-way adaptors, RCD adaptors, travel adaptors and plug convertors are all excluded, and the warning has to be printed on the plug itself. In practice this is why a fixed outdoor socket-outlet is often the first piece of real electrical work a plug-in solar installation creates: the panel is outside and the socket is usually inside.',
  },
  {
    question: 'Do I have to tell my electricity network operator?',
    answer: `Yes, and you also have to tell them if you ever remove it — notification of connection and disconnection is mandatory and the product must carry that statement. It is not prior approval. G98 works on a connect-and-notify basis: the device is installed and commissioned first, and the notification follows within ${F.dnoNotificationWindowDays} days of commissioning, using the Installation Document at Form B, Appendix 3 of EREC G98. Note that the ${F.dnoNotificationWindowDays}-day figure comes from G98, not from the product specification.`,
  },
  {
    question: 'Can I put a plug-in solar panel on my balcony?',
    answer:
      'It depends on the building, not on the flat. The specification bars installation on aluminium composite material (ACM) and metal composite material (MCM) cladding systems, high-pressure laminate (HPL) cladding, timber cladding systems and timber balconies, and on buildings subject to external wall remediation works or equivalent restrictions relating to external wall fire safety. You also may not fix it to a wall forming a property boundary between dwellings. Separately, you are responsible for obtaining permission from the owner, landlord, freeholder or managing agent, and for any planning permission or Listed Building Consent.',
  },
  {
    question: 'Can I build my own plug-in solar system from separate parts?',
    answer:
      'Not one that qualifies under these rules. The specification defines a plug-in solar device as a complete product including a factory-assembled connection line fitted by the manufacturer with a plug designed to BS 1363. Loose panels and a micro-inverter bought separately cannot meet that definition, cannot be registered on the ENA Type Test Register as a device, and so get none of the route the regulations created. That is a generating set on a final circuit and it is judged as one.',
  },
  {
    question: 'Will plug-in solar keep my lights on in a power cut?',
    answer:
      'No. The inverter is grid-following: it locks onto the voltage and frequency already present on the supply and injects current in step with it. It cannot create a supply of its own, so if the grid goes down the device stops. This is deliberate — it is the anti-islanding protection that stops electricity being fed back into a network where people may be working. It is not a battery and not a backup supply.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    title: 'Plug-in Solar and RCDs: What Is Recommended, What Is Required',
    description:
      'Type AC, A, B and F — and why bidirectional capability is a separate question from the type marking.',
    href: '/plug-in-solar-rcd-requirements',
    icon: ShieldCheck,
    category: 'Plug-in Solar',
  },
  {
    title: 'Solar PV Certificate',
    description: 'For a designed installation under BS 7671 Section 712, not a plug-in device.',
    href: '/solar-pv-certificate',
    icon: Sun,
    category: 'Certificates',
  },
  {
    title: 'EICR Certificate',
    description: 'Condition reporting on the existing installation before anything is added to it.',
    href: '/tools/eicr-certificate',
    icon: FileCheck2,
    category: 'Certificates',
  },
  {
    title: 'BS 7671 A4:2026 — What Changed',
    description: 'The amendment that redrafted 551.7 and governs generation on a final circuit.',
    href: '/guides/bs-7671-amendment-4-2026',
    icon: Zap,
    category: 'Regulations',
  },
];

const sections = [
  {
    id: 'what-changed',
    heading: 'What Changed on 27 August 2026',
    content: (
      <>
        <p>
          Until August 2026 there was no lawful route to sell a solar generator in Great Britain
          that plugs into an ordinary socket. <strong>{F.statutoryInstrument}</strong> — the Plugs
          and Sockets etc. (Safety) Regulations 1994 and ESQCR 2002 (Amendment) Regulations 2026,
          made 16 July and in force <strong>27 August 2026</strong> — created one, by allowing a
          standard plug to be used with a plug-in microgenerator provided the product meets a
          specification the regulations point at.
        </p>
        <p>
          That specification is the{' '}
          <strong>Plug-in Solar Device Interim Product Specification v2.0</strong> (DESNZ, July
          2026), cited throughout this guide as “the specification”. It is interim on purpose:
          several of its limits have stated review routes, so check a figure before you rely on it
          commercially.
        </p>
        <p>
          Two documents sit alongside it and say different things with different force. BS
          7671:2018+A4:2026 is named in the specification’s own reference list and governs the fixed
          installation. Engineering Recommendation G98 governs the connection to the network and
          applies to <strong>Great Britain only</strong>.
        </p>
      </>
    ),
  },
  {
    id: 'what-it-is',
    heading: 'What a Plug-in Solar Device Actually Is',
    content: (
      <>
        <p>
          A complete kit, sold as one product. The specification defines it as at least one PV
          module, a <strong>grid-following inverter</strong>, a factory-assembled lead fitted by the
          manufacturer with a BS 1363 plug, and a mounting system to attach the panel
          semi-permanently to a surface or the ground.
        </p>
        <p>
          There is no consumer unit work, no new circuit and no fixed wiring — that is the whole
          point of it, and it is why the rules that follow are mostly about the existing
          installation rather than anything being added to it.
        </p>
        <p>
          Because the inverter follows the grid, it cannot work without one. It does not generate a
          supply of its own; it locks onto the voltage and frequency already present and injects
          current in step. Pull the main switch and the device stops.
        </p>
      </>
    ),
  },
  {
    id: 'the-limits',
    heading: 'The Limits',
    content: (
      <>
        <ul>
          <li>
            <strong>{F.maxApparentPowerVA} VA</strong> maximum apparent power supplied to the
            installation, and <strong>{F.maxCurrentA} A</strong> maximum current, single phase
            (specification §4.1).
          </li>
          <li>
            <strong>{F.maxPvModuleDcW} W</strong> maximum total PV module DC power. Retained in the
            final specification but recorded as under review.
          </li>
          <li>
            <strong>{F.professionalAssessmentThresholdW} W</strong> — above this total module
            capacity, the manufacturer <em>must</em> advise the customer to consider a professional
            assessment of their existing electrical installation before installing.
          </li>
          <li>
            Up to <strong>{F.maxPvModules} modules</strong>, no more than{' '}
            <strong>{F.maxModulesInSeries} in series</strong> in any string, with open circuit
            voltage at the inverter inputs not exceeding <strong>{F.maxArrayVocV} V DC</strong> —
            because the risk of sustained DC arcing rises with voltage and the user makes these
            connections themselves.
          </li>
          <li>
            A <strong>{F.maxPlugFuseA} A</strong> maximum BS 1362 fuse in a non-rewireable moulded
            plug with partially insulated pins.
          </li>
          <li>
            Any smooth DC residual current the device puts onto the supply must not exceed{' '}
            <strong>{F.maxResidualDcMa} mA</strong>, so it does not impair an upstream RCD.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'not-permitted',
    heading: 'What Is Not Permitted',
    content: (
      <>
        <ul>
          <li>
            <strong>No batteries.</strong> Plug-in battery systems and battery-integrated plug-in
            solar are outside the specification’s scope entirely, and the instructions must carry a
            prominent warning that the device is not intended to be used with battery storage.
          </li>
          <li>
            <strong>
              No extension cables, cable reels, multi-way adaptors, RCD adaptors, travel adaptors or
              plug convertors.
            </strong>
          </li>
          <li>
            <strong>Socket circuits only.</strong> Not a lighting circuit, and not a spur feeding
            fixed equipment such as a cooker or a boiler.
          </li>
          <li>
            <strong>No Y-connectors</strong> on the DC side — only matching connector pairs from the
            same product family, supplied by the manufacturer.
          </li>
          <li>
            <strong>
              Not on ACM or MCM cladding, HPL cladding, timber cladding or timber balconies
            </strong>
            , and not on a building subject to external wall remediation works. Not fixed to a wall
            forming a property boundary between dwellings.
          </li>
        </ul>
        <p>
          These are product and instruction requirements rather than duties imposed directly on a
          householder — but they are the conditions under which the device is designed to be safe,
          and where one is not met, that is where the electrical work is.
        </p>
      </>
    ),
  },
  {
    id: 'the-circuit',
    heading: 'The Circuit and the Socket',
    content: (
      <>
        <p>
          The device plugs into a fixed socket-outlet complying with BS 1363-2, and it must not be
          connected to damaged, degraded or non-compliant socket-outlets. Where the inverter{' '}
          <em>and</em> the socket are both mounted outside, the socket needs an ingress protection
          rating of <strong>{F.minOutdoorSocketIp} or better</strong>.
        </p>
        <p>
          That combination — panels outside, sockets usually inside, and no extension leads
          permitted — is why a fixed outdoor socket-outlet is so often the first real piece of
          electrical work a plug-in solar installation creates.
        </p>
        <p>
          Only one device is permitted per circuit, so somebody has to be able to identify which
          sockets share one. Where the consumer unit does not use modern protective devices, is not
          clearly labelled, or is of unknown condition, the specification says users should seek
          inspection and assessment by a qualified electrician before installing the product.
        </p>
        <p>
          Ring final circuits are fine. A small number of consultation respondents argued otherwise,
          and the government’s published safety study tested plug-in solar in representative UK
          installations including ring circuits, finding nothing that would prevent safe operation
          at 800 W on appropriately protected rings.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-question',
    heading: 'The RCD Question, in Short',
    content: (
      <>
        <p>
          This is the part being argued about most, and it is easy to get wrong in both directions.
          <strong> Electrical Safety First recommend</strong> that circuits intended for use with
          plug-in solar have at least a Type A, bidirectionally capable RCD, and that homes with
          Type AC devices should not use plug-in solar without upgrading first. That is genuine,
          published safety guidance from a credible body.
        </p>
        <p>
          <strong>It is not a legal requirement.</strong> Mandating bi-directional residual current
          protection in the product was put to the government during the consultation and declined
          for want of evidence, and the government’s stated long-term preference is that industry
          moves to Type B or F devices.
        </p>
        <p>
          Both of those are true at once, and there is a second distinction underneath: the RCD{' '}
          <em>type</em> and whether the device is <em>bidirectionally capable</em> are two separate
          questions that the phrase “Type A bidirectional” runs together.{' '}
          <SEOInternalLink href="/plug-in-solar-rcd-requirements">
            The full answer is on the RCD page
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'notification',
    heading: 'Telling Your Network Operator',
    content: (
      <>
        <p>
          Notification is <strong>mandatory</strong>, and it runs both ways — the distribution
          network operator must be told when a device is connected <em>and</em> when it is
          disconnected. The product itself has to carry that statement, with a link to how.
        </p>
        <p>
          But it is <strong>connect and notify</strong>, not prior approval. The device is installed
          and commissioned first and the notification follows, within{' '}
          <strong>{F.dnoNotificationWindowDays} days</strong> of commissioning, using the
          Installation Document at Form B, Appendix 3 of EREC G98. It does not hold anything up.
        </p>
        <p>
          One detail worth being precise about: the {F.dnoNotificationWindowDays}-day deadline comes
          from <strong>G98</strong>, not from the product specification. The specification makes
          notification mandatory but sets no time limit of its own.
        </p>
      </>
    ),
  },
  {
    id: 'not-a-device',
    heading: 'What Is Not a Plug-in Solar Device',
    content: (
      <>
        <p>
          Loose panels and a micro-inverter bought separately are <strong>not</strong> a plug-in
          solar device, however the listing describes them. The specification requires a complete
          product including “a factory assembled connection line fitted{' '}
          <strong>by the manufacturer</strong> with a plug designed to BS 1363”. A self-assembled
          build cannot meet that, cannot be registered on the ENA Type Test Register as a device,
          and so gets none of the route the regulations created.
        </p>
        <p>
          It is worth checking what the panel’s own manual says before anyone argues the point.
          Modules sold loose through national merchants routinely carry manuals with no mention of
          plugs, sockets, inverters, BS 1363, RCDs, G98 or the network operator anywhere in them —
          and which open by stating that installation requires professional skills and knowledge and
          is to be carried out by qualified personnel. Those are documents written for a designed
          installation under BS 7671 Section 712.
        </p>
        <p>
          Compliant devices are listed on the ENA Type Test Register, and the specification is
          explicit that a device merely <em>submitted</em> for registration does not in itself
          demonstrate compliance. The register moves quickly, so check it on the day rather than
          relying on a figure in an article.
        </p>
      </>
    ),
  },
  {
    id: 'who-needs-advice',
    heading: 'Who Should Get Advice Before Plugging One In',
    content: (
      <>
        <p>
          To be straight about it:{' '}
          <strong>nothing legally obliges a householder to involve an electrician.</strong> Anyone
          telling you the law now requires an assessment is wrong. But the documents themselves keep
          pointing people at one, and these are the situations where that is worth acting on.
        </p>
        <ul>
          <li>
            <strong>Kits above {F.professionalAssessmentThresholdW} W of module capacity</strong> —
            the manufacturer is required to advise you to consider a professional assessment.
          </li>
          <li>
            <strong>An older, unlabelled or unknown consumer unit</strong> — the specification says
            to seek inspection and assessment by a qualified electrician first.
          </li>
          <li>
            <strong>
              A Type AC RCD, or a device you cannot confirm is bidirectionally capable
            </strong>{' '}
            — see the RCD page.
          </li>
          <li>
            <strong>No suitable outdoor socket</strong> — fitting one is electrical work on the
            fixed installation and carries its own certification.
          </li>
          <li>
            <strong>A flat, a block, or rented property</strong> — the surface restrictions are
            decided by the building, and permission sits with the freeholder or managing agent.
          </li>
        </ul>
        <p>
          There is also a recurring one that almost nobody mentions. The specification requires the
          customer to be told to press the RCD or RCBO test button periodically{' '}
          <em>while the device is generating</em>, because DC leakage from solar, EV chargers and IT
          equipment together can desensitise an older device — and that if it does not trip
          immediately, to contact a competent professional electrician about replacing it.
        </p>
      </>
    ),
  },
];

export default function PlugInSolarUKPage() {
  return (
    <GuideTemplate
      title={`Plug-in Solar UK: The ${F.maxApparentPowerVA} W Rules From 27 August 2026`}
      description={`Plug-in solar became legal in Great Britain on 27 August 2026. The ${F.maxApparentPowerVA} VA limit, the ${F.maxPvModuleDcW} W DC cap, what is not permitted, the ${F.dnoNotificationWindowDays}-day G98 notification, and when you need an electrician. Cited to ${F.statutoryInstrument} and the DESNZ specification.`}
      datePublished="2026-08-31"
      dateModified="2026-08-31"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Plug-in Solar"
      badgeIcon={Sun}
      heroTitle={
        <>
          Plug-in Solar UK:{' '}
          <span className="text-yellow-400">
            The {F.maxApparentPowerVA} W Rules That Took Effect on 27 August 2026
          </span>
        </>
      }
      heroSubtitle={`Plug-in solar is legal to sell and self-install in Great Britain from 27 August 2026 under ${F.statutoryInstrument}. This guide sets out the limits, what is not permitted, the RCD question, the ${F.dnoNotificationWindowDays}-day network notification, and where a householder genuinely does need an electrician — cited to the statutory instrument, the DESNZ interim product specification and BS 7671.`}
      readingTime={11}
      answerBox={{
        question: 'Are plug-in solar panels legal in the UK?',
        answer: `Yes, in Great Britain, from 27 August 2026. ${F.statutoryInstrument} created an approval route for standard plugs used with plug-in microgenerators, provided the product meets the DESNZ Plug-in Solar Device Interim Product Specification v2.0. A device may supply no more than ${F.maxApparentPowerVA} VA and ${F.maxCurrentA} A, from PV modules totalling no more than ${F.maxPvModuleDcW} W DC.`,
        detail: `No law requires a householder to employ an electrician to plug one in. Electrical Safety First recommend an assessment before purchase, and above ${F.professionalAssessmentThresholdW} W of module capacity the manufacturer must advise the customer to consider one — both are guidance, not legal duties.`,
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      leadMagnet={
        <SEOInlineLeadMagnet
          headline="Plug-in Solar — What Actually Changed. Free 8-page guide"
          description="What it is, how it works, the full checklist of what has to be in place, the RCD question answered from the source, and what the box is legally required to tell your customer. Written for electricians and apprentices."
          bullets={[
            `Every limit — ${F.maxApparentPowerVA} VA, ${F.maxPvModuleDcW} W DC, ${F.professionalAssessmentThresholdW} W, ${F.maxPlugFuseA} A`,
            'Recommended vs required, cited to the source',
            'Free PDF — print it, share it, pin it up',
          ]}
          source="lead_magnet_plug_in_solar"
          analyticsLabel="plug_in_solar_guide_seo"
        />
      }
      faqs={faqs}
      faqHeading="Plug-in Solar UK — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Assessing a Property for Plug-in Solar?"
      ctaSubheading="Elec-Mate includes a Plug-in Solar Suitability & Commissioning Certificate: it walks the assessment, marks every finding as a requirement or as advice with the source against each, builds the remedial list you quote from, verifies commissioning and runs the G98 clock. Join 1,600+ UK electricians. 7-day free trial."
    />
  );
}
