/**
 * Plug-in solar and your DNO — cluster spoke 3 (ELE-1661)
 *
 * 🔴 The 28-day figure is a G98 requirement, NOT a specification one. The word
 * "days" does not appear anywhere in the Interim Product Specification: §8.2.3.1
 * makes notification of connection and disconnection mandatory but sets no
 * deadline. Cite ER G98 Form B, Appendix 3 for the clock. Getting this wrong is
 * the exact error that had to be corrected out of the printed guide.
 */

import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInlineLeadMagnet } from '@/components/seo/SEOInlineLeadMagnet';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { PLUG_IN_SOLAR_FACTS as F } from '@/lib/plugInSolarAssessment';
import { Network, Sun, PackageOpen, ShieldCheck, Building2 } from 'lucide-react';

const breadcrumbs = [
  { label: 'Plug-in Solar UK', href: '/plug-in-solar-uk' },
  { label: 'DNO Notification', href: '/plug-in-solar-dno-notification' },
];

const tocItems = [
  { id: 'short-answer', label: 'The Short Answer' },
  { id: 'connect-and-notify', label: 'Connect and Notify, Not Prior Approval' },
  { id: 'where-28-days', label: 'Where the 28 Days Comes From' },
  { id: 'how-to-notify', label: 'How to Notify, and Who To' },
  { id: 'deregistration', label: 'Telling Them When You Remove It' },
  { id: 'northern-ireland', label: 'Northern Ireland' },
  { id: 'who-does-it', label: 'Who Actually Does It' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Notifying your distribution network operator is mandatory. It is not optional and it is not a formality you can skip.',
  'It is connect and notify, not prior approval — the device is installed and commissioned first, and the notification follows. It does not hold anything up and the operator cannot refuse.',
  `G98 gives ${F.dnoNotificationWindowDays} days from commissioning, discharged by the Installation Document at Form B, Appendix 3 of EREC G98.`,
  'The 28-day figure comes from G98, not from the product specification. The specification makes notification mandatory but sets no deadline of its own — the word "days" does not appear in it.',
  'The obligation runs both ways: you must also notify when the device is disconnected or removed. Almost nobody does this.',
  'The product itself must be marked with a statement that notification of connection and disconnection is mandatory, and the documentation must include a QR code to the registration process.',
  'G98 applies to Great Britain. Northern Ireland connects under G98/NI, and the specification records that its application there is subject to further consideration.',
];

const faqs = [
  {
    question: 'Do I need to tell my DNO about plug-in solar?',
    answer:
      'Yes. Notification to the distribution network operator is mandatory for plug-in solar, and the product must be permanently marked with a statement saying so, including a link to instructions. The documentation must also provide clear information on registration and deregistration obligations, including a QR code directing you to the registration process. This is not the same as asking permission — see below.',
  },
  {
    question: 'Do I need permission from my DNO before installing plug-in solar?',
    answer: `No. It works on a connect-and-notify basis: you install and commission the device first, and the notification follows afterwards. It is not a prior approval process, the operator cannot refuse it, and it does not delay anything. That is the whole point of the G98 route for fully type-tested micro-generators — the device has already been type tested against the network requirements, so the operator needs a record of it rather than an opportunity to assess it.`,
  },
  {
    question: 'How long do I have to notify the DNO?',
    answer: `${F.dnoNotificationWindowDays} days from commissioning. The notification is made using the Installation Document — Form B in Appendix 3 of Engineering Recommendation G98 — and most network operators provide an online form that takes ten to fifteen minutes with instant acknowledgement. Worth being precise about the source: the ${F.dnoNotificationWindowDays}-day deadline is a G98 requirement, not a product specification one. The specification makes notification mandatory but sets no time limit of its own.`,
  },
  {
    question: 'What information do I need to notify?',
    answer:
      'Broadly: the address and MPAN of the property, your contact details, the manufacturer and model of the device, its declared output, the date it was commissioned, and confirmation that it is a fully type-tested unit. Because plug-in solar devices are registered on the ENA Connect Direct Type Test Register, the device details can usually be selected from the register rather than typed in — which is one reason the specification requires manufacturers to register their products there before placing them on the market.',
  },
  {
    question: 'Do I have to tell the DNO if I remove it?',
    answer:
      'Yes, and this is the part almost everyone misses. The specification requires the product to be marked with a statement that notification about connection AND disconnection is mandatory, and requires the documentation to give clear information on current registration and deregistration obligations. If you take the device with you when you move, or simply stop using it, the network operator should be told. Their record of what is connected to the network is only useful if it is kept current.',
  },
  {
    question: 'What happens if I do not notify?',
    answer:
      'Practically, nothing happens to you immediately — there is no inspection regime and no penalty notice arriving in the post. What you have done is left the network operator with an inaccurate picture of what is connected in your street. That matters because those records inform how the local network is planned and how it is made safe to work on. The obligation is real, the process takes a quarter of an hour, and it is free.',
  },
  {
    question: 'Does the same apply in Northern Ireland?',
    answer:
      'Engineering Recommendation G98 applies to Great Britain only. Northern Ireland connects under G98/NI, and the interim product specification records that its application to Northern Ireland is subject to further consideration. If you are in Northern Ireland, check the current position with NIE Networks before relying on the Great Britain process described here.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    title: 'Plug-in Solar UK: The Rules From 27 August 2026',
    description: 'The limits, the prohibitions, and where an electrician is needed.',
    href: '/plug-in-solar-uk',
    icon: Sun,
    category: 'Plug-in Solar',
  },
  {
    title: 'What a Plug-in Solar Kit Must Tell You',
    description: 'The mandated markings and documentation — including the notification statement.',
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
    title: 'Plug-in Solar for Landlords and Agents',
    description: 'Who notifies in a rented property, and what to put in writing.',
    href: '/plug-in-solar-landlords-managing-agents',
    icon: Building2,
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
          <strong>Yes, you must tell them. No, you do not need their permission.</strong>
        </p>
        <p>
          Notification to your distribution network operator is mandatory for plug-in solar — the
          product itself has to be permanently marked with a statement saying so, including a link to
          instructions. But it operates on a <strong>connect and notify</strong> basis: the device is
          installed and commissioned first and the notification follows within{' '}
          <strong>{F.dnoNotificationWindowDays} days</strong>. It does not hold anything up, and the
          operator cannot refuse.
        </p>
        <p>
          The part almost nobody knows: the same obligation runs in reverse. When the device is
          removed, the operator should be told that too.
        </p>
      </>
    ),
  },
  {
    id: 'connect-and-notify',
    heading: 'Connect and Notify, Not Prior Approval',
    content: (
      <>
        <p>
          Engineering Recommendation G98 covers the connection of{' '}
          <em>fully type tested</em> micro-generators in parallel with the public low voltage
          network. The words “fully type tested” are doing the work: the device has already been
          tested against the network’s requirements before it was ever sold, which is why the
          operator needs a <em>record</em> of it rather than an opportunity to assess it.
        </p>
        <p>
          That is why the specification requires manufacturers to have devices type tested to G98
          requirements and registered on the ENA Type Test Register, and to obtain confirmation that
          the device has been assessed and identified as compliant, before placing it on the market.
          The assessment happens once, to the product — not every time somebody plugs one in.
        </p>
        <p>
          So there is no application, no waiting, and no decision to be appealed. Install it,
          commission it, then tell them.
        </p>
      </>
    ),
  },
  {
    id: 'where-28-days',
    heading: 'Where the 28 Days Actually Comes From',
    content: (
      <>
        <p>
          Worth being precise, because this gets misattributed constantly — including, briefly, by
          us.
        </p>
        <p>
          The <strong>Interim Product Specification</strong> (§8.2.3.1) requires the product to state
          that notification about connection and disconnection is mandatory, and requires the
          documentation to explain how. It sets <strong>no deadline at all</strong> — the word “days”
          does not appear anywhere in it.
        </p>
        <p>
          The <strong>{F.dnoNotificationWindowDays} days</strong> is a <strong>G98</strong>{' '}
          requirement. Notification is made using the Installation Document at{' '}
          <strong>Form B, Appendix 3 of EREC G98</strong>, within {F.dnoNotificationWindowDays} days
          of commissioning, and that is what the network operators themselves publish.
        </p>
        <p>
          If you are citing this in writing — on a certificate, in a handover pack, in a letter to a
          managing agent — cite <strong>G98 for the clock</strong> and the specification only for the
          duty. Anyone who quotes the specification for the 28 days has not read it.
        </p>
      </>
    ),
  },
  {
    id: 'how-to-notify',
    heading: 'How to Notify, and Who To',
    content: (
      <>
        <p>
          Your distribution network operator is not your electricity supplier. It is the company that
          owns and maintains the cables in your street, and it is determined by geography rather than
          by who you pay. If you do not know which one covers you, the Energy Networks Association
          publishes a postcode lookup.
        </p>
        <p>
          Most operators provide an online form. In broad terms you will need the address and MPAN,
          your contact details, the manufacturer and model of the device, its declared output, and the
          commissioning date. Because compliant devices are on the ENA Connect Direct register, the
          device details can usually be picked from a list rather than typed.
        </p>
        <p>
          It typically takes ten to fifteen minutes and gives you an instant acknowledgement. Keep
          that acknowledgement — it is the only evidence you have that the obligation was met, and it
          is the sort of thing a purchaser’s solicitor or a managing agent may eventually ask for.
        </p>
        <p>
          The documentation supplied with the device must include a{' '}
          <strong>QR code</strong> directing you to the relevant guidance and registration process,
          so the easiest route is usually the one printed in the manual.
        </p>
      </>
    ),
  },
  {
    id: 'deregistration',
    heading: 'Telling Them When You Remove It',
    content: (
      <>
        <p>
          This is the genuinely overlooked half. The specification requires the product to be marked
          with a statement that notification about{' '}
          <strong>connection <em>and disconnection</em></strong> is mandatory, and requires the
          documentation to set out current registration <em>and deregistration</em> obligations.
        </p>
        <p>
          Plug-in solar is designed to be removable — the mounting must be reversible and
          non-permanent — so devices will be taken down and taken to new addresses far more often
          than rooftop systems ever are. Each of those moves is a disconnection at one address and a
          connection at another, and both are notifiable.
        </p>
        <p>
          If you are handing a property over, or a tenant is leaving with a device they installed,
          that is the moment to deal with it. Nobody else will.
        </p>
      </>
    ),
  },
  {
    id: 'northern-ireland',
    heading: 'Northern Ireland',
    content: (
      <>
        <p>
          G98 applies to <strong>Great Britain only</strong>. Northern Ireland connects under G98/NI,
          and the interim product specification records in a footnote that its application to
          Northern Ireland is subject to further consideration.
        </p>
        <p>
          If you are in Northern Ireland, treat everything on this page as indicative and check the
          current position with NIE Networks before relying on it.
        </p>
      </>
    ),
  },
  {
    id: 'who-does-it',
    heading: 'Who Actually Does It',
    content: (
      <>
        <p>
          The duty sits with the person installing and operating the device, which for plug-in solar
          is normally the householder — that is the whole design of the route. In a rented property it
          is the occupier, not the landlord, though a landlord granting permission would be sensible
          to make it a written condition.
        </p>
        <p>
          For an electrician, this is a small thing worth offering. Most customers have no idea the
          obligation exists, it takes a quarter of an hour, and doing it on their behalf as part of
          the visit is the kind of detail that gets you recommended. If you are already recording a
          commissioning date, the {F.dnoNotificationWindowDays}-day clock runs from it.
        </p>
        <p>
          <SEOInternalLink href="/plug-in-solar-uk">
            The wider rules and limits are on the plug-in solar hub page
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
];

export default function PlugInSolarDNOPage() {
  return (
    <GuideTemplate
      title={`Plug-in Solar and Your DNO: The ${F.dnoNotificationWindowDays}-Day G98 Rule`}
      description={`Notifying your distribution network operator about plug-in solar is mandatory but it is connect-and-notify, not prior approval. G98 gives ${F.dnoNotificationWindowDays} days from commissioning via Form B. How to notify, what you need, and the deregistration duty nobody mentions.`}
      datePublished="2026-09-01"
      dateModified="2026-09-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Plug-in Solar"
      badgeIcon={Network}
      heroTitle={
        <>
          Plug-in Solar and Your DNO:{' '}
          <span className="text-yellow-400">
            The {F.dnoNotificationWindowDays}-Day G98 Rule
          </span>
        </>
      }
      heroSubtitle={`Telling your distribution network operator about a plug-in solar device is mandatory — but it is connect and notify, not prior approval. You install and commission first, then notify within ${F.dnoNotificationWindowDays} days using G98 Form B. This page covers how, who to, and the disconnection duty almost nobody knows about.`}
      readingTime={7}
      answerBox={{
        question: 'Do I need to tell my DNO about plug-in solar?',
        answer: `Yes, and it is mandatory — but it is connect and notify, not prior approval. You install and commission the device first, then notify your distribution network operator within ${F.dnoNotificationWindowDays} days of commissioning using the Installation Document at Form B, Appendix 3 of EREC G98. The operator cannot refuse it.`,
        detail: `The ${F.dnoNotificationWindowDays}-day deadline comes from G98, not from the product specification — which makes notification mandatory but sets no time limit. The same obligation applies when you remove the device.`,
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      leadMagnet={
        <SEOInlineLeadMagnet
          headline="Plug-in Solar — What Actually Changed. Free 8-page guide"
          description="The limits, the prohibitions, the RCD question answered from the source, where the notification duty actually comes from, and what the box is legally required to tell your customer."
          bullets={[
            'Which document each rule actually comes from',
            'Recommended vs required, cited to the source',
            'Free PDF — print it, share it, pin it up',
          ]}
          source="lead_magnet_plug_in_solar"
          analyticsLabel="plug_in_solar_guide_seo_dno"
        />
      }
      faqs={faqs}
      faqHeading="Plug-in Solar DNO Notification — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Never Miss the Notification Deadline"
      ctaSubheading={`Elec-Mate's Plug-in Solar Suitability & Commissioning Certificate records the commissioning date and runs the ${F.dnoNotificationWindowDays}-day G98 clock from it, alongside the assessment, the remedial list and the handover record. Join 1,600+ UK electricians. 7-day free trial.`}
    />
  );
}
