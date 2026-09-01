/**
 * Plug-in solar or rooftop solar — cluster spoke 6 (ELE-1661)
 *
 * The upsell page. Plug-in caps at 800 VA and excludes batteries entirely, so
 * anyone who wants more than that needs a designed installation under BS 7671
 * Section 712 — which is the Solar PV Design Suite and the Solar PV certificate.
 *
 * Be honest about the comparison. Plug-in solar is genuinely the right answer
 * for a lot of households, and a page that pretends otherwise to sell a bigger
 * job will be seen through and will not rank.
 */

import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInlineLeadMagnet } from '@/components/seo/SEOInlineLeadMagnet';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { PLUG_IN_SOLAR_FACTS as F } from '@/lib/plugInSolarAssessment';
import { GitCompareArrows, Sun, ShieldCheck, PackageOpen, FileCheck2 } from 'lucide-react';

const breadcrumbs = [
  { label: 'Plug-in Solar UK', href: '/plug-in-solar-uk' },
  { label: 'Plug-in vs Rooftop', href: '/plug-in-solar-vs-rooftop-solar' },
];

const tocItems = [
  { id: 'short-answer', label: 'The Short Answer' },
  { id: 'the-ceiling', label: 'The Ceiling Is Hard' },
  { id: 'no-batteries', label: 'No Batteries, at All' },
  { id: 'what-you-get', label: 'What You Actually Get From 800 VA' },
  { id: 'comparison', label: 'The Comparison, Honestly' },
  { id: 'who-should-choose-which', label: 'Who Should Choose Which' },
  { id: 'moving-up', label: 'Moving Up Later' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  `Plug-in solar is capped at ${F.maxApparentPowerVA} VA and ${F.maxCurrentA} A into the installation, from PV modules totalling no more than ${F.maxPvModuleDcW} W DC. That ceiling is a product limit, not a design choice — you cannot engineer past it.`,
  'Batteries are excluded from the plug-in route entirely: plug-in battery systems and battery-integrated plug-in solar are outside the specification.',
  'Currently one device per household under G98, expected to move to one per power circuit — but even then, per circuit rather than unlimited.',
  'A designed rooftop system under BS 7671 Section 712 has no such ceiling, can include storage, and can export meaningfully under a tariff.',
  'Plug-in solar is genuinely the right answer for renters, flats, and anyone who cannot alter the building — it needs no roof, no scaffolding and no notifiable work.',
  'The two are not really competitors: plug-in offsets daytime background load, a designed system changes your electricity bill.',
];

const faqs = [
  {
    question: 'Is plug-in solar or rooftop solar better?',
    answer: `They answer different questions. Plug-in solar is capped at ${F.maxApparentPowerVA} VA — enough to offset background daytime load like a fridge, router, standby and a bit of lighting — and it needs no roof work, no scaffolding, no notifiable electrical work and no design. A rooftop system under BS 7671 Section 712 has no such ceiling, can be sized to the property, can include battery storage and can export meaningfully. If you own the roof and intend to stay, a designed system will do far more. If you rent, live in a flat, or cannot alter the building, plug-in is the only one of the two available to you.`,
  },
  {
    question: 'Can I install several plug-in solar kits instead of a rooftop system?',
    answer:
      'No. G98 currently permits one device per household, and the specification permits one per final circuit with the government intending to move G98 in that direction. Even at one per circuit, each device is still individually capped, and stacking them is not a route to a large system — the limits exist because the whole approach relies on injecting a small current into an existing final circuit that was never designed for generation. If you want more than a couple of hundred watts of real capacity, you need a designed installation.',
  },
  {
    question: 'Can I add a battery to plug-in solar?',
    answer:
      'Not under these rules. Plug-in battery systems and plug-in solar PV devices integrated with battery systems are explicitly outside the scope of the specification, and the instructions supplied with a compliant device must carry a prominent warning that it is not intended to be connected to, operated with, or used in conjunction with a battery energy storage system. Electrical Safety First go further and advise against installing plug-in battery systems at all. Storage means a designed installation.',
  },
  {
    question: 'How much will plug-in solar actually save me?',
    answer:
      'Modest amounts, and it depends almost entirely on how much electricity you use during daylight hours. The device supplies whatever is drawing load on that circuit at the time; anything left over flows to the rest of the house, and only what the house cannot use passes out through the meter. So the saving is driven by self-consumption rather than by generation. A household that is out all day and has no daytime load will see much less than one running a fridge, a home office and appliances through the afternoon.',
  },
  {
    question: 'Do I need permission or notification for rooftop solar?',
    answer:
      'Different regime. A designed rooftop installation is notifiable electrical work under Building Regulations, is certified under BS 7671 with an Electrical Installation Certificate, and connects under G98 or G99 depending on size — G98 for micro-generation up to 16 A per phase, G99 above that. Most domestic rooftop systems fall under permitted development for planning, but listed buildings and conservation areas are exceptions. It is a professional installation from end to end, which is precisely the difference.',
  },
  {
    question: 'Can I have plug-in solar as well as a rooftop system?',
    answer:
      'That is not what the route is designed for, and it is not sensible. If you already have a designed system on the roof, you have the capacity that a plug-in device was created to give people who cannot have one. Adding a plug-in device on top brings the one-per-household G98 limit, the notification duties and the RCD considerations into play for a marginal amount of extra generation. If you want more from an existing system, extending it as a designed installation is the correct route.',
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
    title: 'Solar PV Certificate',
    description: 'Certification for a designed installation under BS 7671 Section 712.',
    href: '/solar-pv-certificate',
    icon: FileCheck2,
    category: 'Certificates',
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
];

const sections = [
  {
    id: 'short-answer',
    heading: 'The Short Answer',
    content: (
      <>
        <p>
          They are not really competing products. <strong>Plug-in solar offsets background daytime
          load. A designed system changes your electricity bill.</strong>
        </p>
        <p>
          Plug-in solar is capped at <strong>{F.maxApparentPowerVA} VA</strong> into the
          installation, cannot include a battery, and is currently limited to one device per
          household. In exchange it needs no roof work, no scaffolding, no design, no notifiable
          electrical work and no installer — which is exactly why it exists.
        </p>
        <p>
          A rooftop installation under BS 7671 Section 712 has none of those ceilings and all of that
          work. If you own the roof and intend to stay, it will do far more. If you rent or live in a
          flat, it is not available to you at all.
        </p>
      </>
    ),
  },
  {
    id: 'the-ceiling',
    heading: 'The Ceiling Is Hard',
    content: (
      <>
        <p>
          This is the thing people underestimate. The plug-in limits are{' '}
          <strong>product limits</strong>, not design decisions — you cannot engineer past them, and
          a compliant device physically will not exceed them:
        </p>
        <ul>
          <li>
            <strong>{F.maxApparentPowerVA} VA</strong> maximum apparent power supplied to the
            installation, and <strong>{F.maxCurrentA} A</strong> maximum current.
          </li>
          <li>
            <strong>{F.maxPvModuleDcW} W</strong> maximum total PV module DC power — you may fit more
            panel than inverter, which helps in poor light, but the output is still capped.
          </li>
          <li>
            Up to <strong>{F.maxPvModules} modules</strong>, no more than{' '}
            <strong>{F.maxModulesInSeries} in series</strong>, and no more than{' '}
            <strong>{F.maxArrayVocV} V DC</strong> at the inverter inputs.
          </li>
          <li>
            <strong>One device per household</strong> under G98 as it stands, expected to move to one
            per power circuit.
          </li>
        </ul>
        <p>
          The reason for the ceiling is the whole architecture: the device injects current into an
          existing final circuit that was never designed to have a source on it. That is safe at a
          few amps into a properly protected circuit. It stops being a plug-in product long before it
          becomes a meaningful generator.
        </p>
      </>
    ),
  },
  {
    id: 'no-batteries',
    heading: 'No Batteries, at All',
    content: (
      <>
        <p>
          Worth stating plainly because it is the single biggest limitation and it surprises people.
          The specification excludes <strong>plug-in battery systems</strong> and{' '}
          <strong>plug-in solar PV devices integrated with battery systems</strong> from its scope
          entirely, and requires the instructions supplied with a compliant device to carry a
          prominent warning that it is not intended to be connected to, operated with, or used in
          conjunction with a battery energy storage system.
        </p>
        <p>
          Electrical Safety First are blunter still, advising against installing plug-in battery
          systems in the home at all — while noting that they are already available from online
          retailers, which is the point of the warning.
        </p>
        <p>
          This matters more than the headline wattage. Without storage, everything the device
          generates must be used at the moment it is generated or exported for very little. Storage
          is what turns solar generation into evening usage, and it is only available on the designed
          route.
        </p>
      </>
    ),
  },
  {
    id: 'what-you-get',
    heading: 'What You Actually Get From 800 VA',
    content: (
      <>
        <p>
          Useful framing for a customer conversation. {F.maxApparentPowerVA} VA is roughly the
          background load of an occupied house on a normal afternoon: a fridge-freezer cycling, a
          router, a few devices on standby, some lighting, a television.
        </p>
        <p>
          The device supplies whatever is drawing load on that circuit first. Anything left over
          flows back through the board to the rest of the house, and only what the house cannot use
          passes out through the meter. So the value is driven by{' '}
          <strong>self-consumption during daylight</strong>, not by generation.
        </p>
        <p>
          Which means the same kit is worth substantially more to someone at home during the day than
          to someone out from eight until six. It is one of the few products where the customer’s
          routine matters more than the specification.
        </p>
        <p>
          And it does nothing in a power cut. The inverter is grid-following: it locks onto the supply
          already present and cannot create one. Pull the main switch and the device stops.
        </p>
      </>
    ),
  },
  {
    id: 'comparison',
    heading: 'The Comparison, Honestly',
    content: (
      <>
        <ul>
          <li>
            <strong>Capacity.</strong> Plug-in: {F.maxApparentPowerVA} VA, hard ceiling. Designed:
            sized to the roof and the demand.
          </li>
          <li>
            <strong>Storage.</strong> Plug-in: prohibited. Designed: available.
          </li>
          <li>
            <strong>Who installs it.</strong> Plug-in: the occupier. Designed: a competent
            electrician, with certification.
          </li>
          <li>
            <strong>Building work.</strong> Plug-in: none — mounting must be reversible and must not
            compromise the structure, fire performance or weatherproofing. Designed: roof penetration,
            scaffolding, structural check.
          </li>
          <li>
            <strong>Notification.</strong> Plug-in: G98 connect-and-notify within{' '}
            {F.dnoNotificationWindowDays} days. Designed: G98 or G99 depending on size, plus
            notifiable work under Building Regulations and a BS 7671 certificate.
          </li>
          <li>
            <strong>If you move.</strong> Plug-in: unplug it and take it — though both the
            disconnection and the reconnection are notifiable. Designed: it stays with the building.
          </li>
          <li>
            <strong>Where it can go.</strong> Plug-in: not on ACM, MCM or HPL cladding, timber
            cladding, timber balconies, or buildings under external wall remediation. Designed:
            assessed as part of the design.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'who-should-choose-which',
    heading: 'Who Should Choose Which',
    content: (
      <>
        <p>
          <strong>Plug-in solar is the right answer</strong> for renters, for flats and maisonettes,
          for anyone who cannot alter the building or does not intend to stay, for people who want to
          try solar without committing several thousand pounds, and for households with a genuine
          daytime load and a sunny bit of ground or wall.
        </p>
        <p>
          <strong>A designed system is the right answer</strong> for owner-occupiers staying put, for
          anyone who wants meaningful export income, for anyone who wants storage, for households
          with high consumption or an EV, and for anyone whose roof is suitable and unshaded.
        </p>
        <p>
          The dishonest version of this page would push everyone towards the bigger job. Plug-in solar
          is genuinely a good product for the people it was designed for — and the ones it does not
          suit will work that out from the {F.maxApparentPowerVA} VA figure without needing to be
          told.
        </p>
      </>
    ),
  },
  {
    id: 'moving-up',
    heading: 'Moving Up Later',
    content: (
      <>
        <p>
          Starting with plug-in and moving to a designed installation later is a perfectly reasonable
          path, and the plug-in kit does not become worthless — it can move to another property, or
          to a shed or outbuilding on the same one, subject to the same notification rules.
        </p>
        <p>
          What you should not do is run both. If a designed system is going on the roof, you already
          have the capacity the plug-in device existed to provide, and keeping it brings the
          one-per-household limit, the notification duties and the RCD considerations into play for a
          marginal gain.
        </p>
        <p>
          For electricians: a customer who has bought a plug-in kit has already self-identified as
          interested in generation, has usually discovered its limits within a season, and has an
          installation you have possibly already assessed.{' '}
          <SEOInternalLink href="/plug-in-solar-uk">
            The plug-in rules are on the hub page
          </SEOInternalLink>
          , and a designed system is certified as a Section 712 installation in the usual way.
        </p>
      </>
    ),
  },
];

export default function PlugInSolarVsRooftopPage() {
  return (
    <GuideTemplate
      title={`Plug-in Solar or Rooftop Solar? ${F.maxApparentPowerVA} VA vs a Designed System`}
      description={`Plug-in solar is capped at ${F.maxApparentPowerVA} VA, excludes batteries entirely and is limited to one device per household. A designed rooftop system under BS 7671 Section 712 has none of those ceilings. An honest comparison of what each is actually for.`}
      datePublished="2026-09-01"
      dateModified="2026-09-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Plug-in Solar"
      badgeIcon={GitCompareArrows}
      heroTitle={
        <>
          Plug-in Solar or Rooftop Solar?{' '}
          <span className="text-yellow-400">
            {F.maxApparentPowerVA} VA Versus a Designed System
          </span>
        </>
      }
      heroSubtitle={`Plug-in solar offsets background daytime load. A designed system changes your bill. The plug-in route is capped at ${F.maxApparentPowerVA} VA, cannot include a battery and is limited to one device per household — in exchange for needing no roof work, no design and no installer. This page compares them honestly.`}
      readingTime={8}
      answerBox={{
        question: 'Is plug-in solar or rooftop solar better?',
        answer: `They answer different questions. Plug-in solar is capped at ${F.maxApparentPowerVA} VA and excludes batteries, but needs no roof work, no design and no installer. A designed rooftop system under BS 7671 Section 712 has no ceiling, can include storage and can export meaningfully — but requires certification and notifiable work.`,
        detail:
          'If you own the roof and intend to stay, a designed system does far more. If you rent, live in a flat, or cannot alter the building, plug-in is the only one available to you.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      leadMagnet={
        <SEOInlineLeadMagnet
          headline="Plug-in Solar — What Actually Changed. Free 8-page guide"
          description="Every limit and prohibition on the plug-in route, the RCD question answered from the source, where the work is for electricians, and what the box is legally required to tell your customer."
          bullets={[
            `The full limits — ${F.maxApparentPowerVA} VA, ${F.maxPvModuleDcW} W DC, ${F.professionalAssessmentThresholdW} W`,
            'Recommended vs required, cited to the source',
            'Free PDF — print it, share it, pin it up',
          ]}
          source="lead_magnet_plug_in_solar"
          analyticsLabel="plug_in_solar_guide_seo_vs"
        />
      }
      faqs={faqs}
      faqHeading="Plug-in vs Rooftop Solar — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Designing the System That Comes Next"
      ctaSubheading="Elec-Mate covers both ends: a Plug-in Solar Suitability & Commissioning Certificate for the plug-in route, and the Solar PV Design Suite and Section 712 certification for a designed installation. Join 1,600+ UK electricians. 7-day free trial."
    />
  );
}
