import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  CheckCircle2,
  Info,
  ShieldCheck,
  FileCheck2,
  Home,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Smart Meter Installation', href: '/smart-meter-installation' },
];

const tocItems = [
  { id: 'smets1-vs-smets2', label: 'SMETS1 vs SMETS2' },
  { id: 'who-is-responsible', label: 'Who Is Responsible for What' },
  { id: 'why-cant-be-installed', label: 'Why Smart Meters Cannot Always Be Installed' },
  { id: 'consumer-unit-issues', label: 'Consumer Unit and Earthing Issues' },
  { id: 'ihd', label: 'In-Home Display (IHD)' },
  { id: 'electrician-role', label: "The Electrician's Role" },
  { id: 'costs', label: 'Costs and Preparation' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Smart meters are installed by your electricity supplier, not an electrician. However, electricians are often called in before or after a smart meter installation to resolve issues that prevent the meter from being fitted — such as an outdated consumer unit, no RCD protection, or a TT earthing system requiring attention.',
  'SMETS2 meters are the current generation. They communicate via the national Data Communications Company (DCC) network and retain their smart functionality even if you switch energy supplier — unlike first-generation SMETS1 meters, which often reverted to dumb mode after a switch.',
  'Common barriers to smart meter installation include: old consumer units without RCD protection, TT (earth electrode) earthing systems with complications at the service head, inadequate clearance at the meter position, or a defective service head (the sealed fuse supplied by the DNO).',
  'The Distribution Network Operator (DNO) owns and is responsible for the service head (cutout) and the supply cable to your property. Your electricity supplier is responsible for the meter itself.',
  'An In-Home Display (IHD) provides real-time energy use data and is supplied free of charge with a smart meter. It connects wirelessly to the meter via Zigbee and does not require any electrical work to install.',
];

const faqs = [
  {
    question: 'Can I refuse a smart meter installation?',
    answer:
      'Yes. Smart meter installation is not currently compulsory for domestic customers in Great Britain. Your energy supplier is required to offer you a smart meter but cannot force you to accept one. Some suppliers are beginning to introduce smart-only tariffs, which may make it difficult to access certain price plans without one. If you refuse, your supplier should continue to provide you with a standard meter.',
  },
  {
    question: 'Why does my smart meter show an error after switching supplier?',
    answer:
      "If you have an older SMETS1 meter, it may have lost its smart functions when you switched supplier. SMETS1 meters communicated via each supplier's own proprietary system, so changing supplier could cause the meter to revert to dumb mode — meaning it stopped sending automatic readings. The DCC has been migrating SMETS1 meters onto the national network, and many have been restored to full smart functionality. If yours has not, contact your new supplier.",
  },
  {
    question: 'What is a TT earthing system and why does it cause problems with smart meters?',
    answer:
      "A TT (terra-terra) earthing system is one where the installation's earth connection is provided by a local earth electrode driven into the ground, rather than by the electricity supplier's network. TT systems are common in rural properties, older properties, and some regions. They can cause complications with smart meter installation because the installer may need to assess the earth electrode resistance and the integrity of the earthing arrangement before fitting the meter. If the earthing is deficient, the smart meter installer may decline to proceed.",
  },
  {
    question: "What is the DNO's role in smart meter installation?",
    answer:
      'The Distribution Network Operator (DNO) owns and maintains the electricity network up to and including the service head (the sealed fuse unit, also called the cutout) on your property. The DNO is responsible for the service cable, the service head, and the meter tails up to the meter. If the service head is damaged, too small, or in the wrong position, the DNO must attend to resolve the issue before a smart meter can be fitted. Your energy supplier arranges the smart meter itself and books the installation engineer.',
  },
  {
    question: 'Does my consumer unit need to be upgraded before a smart meter?',
    answer:
      "Not always, but a smart meter installer may decline to fit the meter if your consumer unit presents a safety concern. Old-style consumer units with rewirable (fuse wire) protection and no RCD protection are a common issue. The supplier's engineer is not permitted to work on your internal wiring, so if the consumer unit needs upgrading, you would need to hire a registered electrician to carry out the work first. Some suppliers will fit the meter regardless; others will not proceed where there is an obvious safety deficiency.",
  },
  {
    question: 'Does a smart meter affect my electrical installation?',
    answer:
      'A smart meter replaces your existing gas and/or electricity meter. It does not alter your consumer unit, circuits, or earthing arrangement. The meter sits between the service head and your consumer unit. One change to be aware of: smart meters typically communicate via a radio link (the Home Area Network, using Zigbee protocol) with the IHD and, in some installations, with compatible smart home devices. There is no cabling required for the IHD — it communicates wirelessly.',
  },
  {
    question: 'What should I check before the smart meter engineer arrives?',
    answer:
      'Ensure the meter is accessible — clear any cupboards, furniture, or stored items blocking the meter position. Check that the meter tails (cables between the service head and the meter) are in good condition and the insulation is intact. If your property has a TT earthing system, advise the installer in advance. If your consumer unit is old or has known faults, consider having an electrician inspect it beforehand. The installation appointment typically takes 30 to 60 minutes.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/consumer-unit-types-guide',
    title: 'Consumer Unit Types Guide',
    description:
      'Metal clad, split-load, high-integrity, and RCBO boards explained with upgrade costs.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/new-home-electrical-checklist',
    title: 'New Home Electrical Checklist',
    description:
      'Things to check when moving into a new property — RCDs, smoke detectors, meter registration.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
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
    id: 'smets1-vs-smets2',
    heading: 'SMETS1 vs SMETS2 — What Is the Difference?',
    content: (
      <>
        <p>
          Smart meters in Great Britain are deployed in two generations, known as SMETS1 (Smart
          Metering Equipment Technical Specifications version 1) and SMETS2. Understanding the
          difference matters because it affects whether your meter retains its smart functions when
          you switch energy supplier.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>SMETS1 (first generation, deployed 2012 to 2019)</strong> — communicated via
                each energy supplier's own proprietary network. When you switched supplier, the
                meter often lost smart functionality and reverted to dumb mode, requiring manual
                meter readings. Many SMETS1 meters have since been migrated to the DCC network and
                restored to smart operation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SMETS2 (second generation, deployed from 2019)</strong> — communicates via
                the Data Communications Company (DCC) national network. SMETS2 meters retain full
                smart functionality regardless of which energy supplier you use, because they all
                connect to the same DCC infrastructure. All new smart meter installations now use
                SMETS2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>DCC migration of SMETS1 meters</strong> — Smart Energy GB and the DCC have
                been progressively migrating SMETS1 meters onto the national network. If you have a
                SMETS1 meter that lost smart functions after switching supplier, contact your
                current supplier to check whether migration has been completed for your meter.
              </span>
            </li>
          </ul>
        </div>
        <p>
          From an electrician's perspective, the distinction between SMETS1 and SMETS2 is less
          important than the physical installation conditions. Both are fitted by the energy
          supplier's engineer, not by an electrician. What matters electrically is whether the
          installation is in a suitable condition to accept a new meter.
        </p>
      </>
    ),
  },
  {
    id: 'who-is-responsible',
    heading: 'Who Is Responsible for What',
    content: (
      <>
        <p>
          Smart meter installation involves several parties with distinct responsibilities.
          Understanding who does what helps homeowners and electricians identify the correct point
          of contact when problems arise.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution Network Operator (DNO)</strong> — owns and maintains the
                electricity network from the substation to the service head (cutout) at your
                property. The DNO is responsible for the service head, service cable, and anything
                upstream of the meter. The six DNO areas in England, Scotland, and Wales are
                National Grid Electricity Distribution, UK Power Networks, Northern Powergrid,
                Electricity North West, SP Energy Networks, and SSEN.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity supplier</strong> — your energy company is responsible for the
                meter itself. The supplier arranges and books the smart meter installation and sends
                their own engineer or a third-party metering contractor to carry out the work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>The homeowner and their electrician</strong> — responsible for everything
                downstream of the meter: the meter tails from the meter to the consumer unit, the
                consumer unit itself, all circuits, and the earthing arrangement within the
                property. If any of these require attention before a smart meter can be fitted, a
                registered electrician must carry out the work.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Need to issue a certificate after resolving smart meter installation barriers?"
          description="Elec-Mate lets you complete Minor Works Certificates and EICRs on your phone, with instant PDF generation and cloud storage."
          ctaText="Start 7-day free trial"
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'why-cant-be-installed',
    heading: 'Why Smart Meters Cannot Always Be Installed',
    content: (
      <>
        <p>
          A significant proportion of smart meter installation appointments fail or are aborted
          because of conditions at the property. The smart meter engineer — who is not a qualified
          electrician — is not permitted to carry out electrical work on your installation. If
          problems are found, they will typically leave and refer the homeowner back to their
          supplier or to an electrician.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Defective or undersized service head</strong> — the service head (cutout) is
                the sealed unit that contains the DNO's main fuse. If it is old, damaged,
                undersized, or in the wrong location, the DNO must attend before the meter can be
                changed. Service head issues are outside the electrician's scope — contact the DNO
                directly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter tails in poor condition</strong> — the cables between the service head
                and the meter (meter tails) must be in sound condition. Old rubber-insulated or
                lead-sheathed tails, or tails with damaged insulation, will prevent the
                installation. Replacement of meter tails is a job for a registered electrician and
                is notifiable under Part P in England.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No adequate earthing at the meter position</strong> — where the property
                uses a TT earthing system, the smart meter engineer may request confirmation that
                the earth electrode provides adequate resistance to earth. An electrician may need
                to test and document the earthing arrangement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter in an inaccessible location</strong> — the meter must be accessible
                for the engineer to safely disconnect and reconnect. Meters concealed in built-in
                furniture, under stairs without access, or behind fixed cladding may need to be
                relocated. Relocation of a meter involves the supplier, DNO, and an electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wireless signal issues</strong> — SMETS2 meters communicate via the DCC
                wide-area network using a SMETS2 communications hub. In some rural or shielded
                locations, the signal is weak. Where signal is insufficient, the installation may be
                deferred pending network improvements or an alternative communications solution.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'consumer-unit-issues',
    heading: 'Consumer Unit and TT Earthing Issues',
    content: (
      <>
        <p>
          Two of the most common reasons smart meter installations are blocked relate to the
          consumer unit and the earthing system. An electrician is the correct person to resolve
          both of these.
        </p>
        <p>
          Many older properties still have consumer units with rewirable fuse carriers (fuse wire)
          or early cartridge fuse types, with no RCD protection. While a smart meter engineer is not
          required to refuse installation solely because of an old consumer unit, some engineers and
          some supplier policies will not proceed where there is an obvious safety concern.
          Upgrading to a modern metal-clad consumer unit with RCD or RCBO protection resolves this
          and brings the installation closer to the current edition of BS 7671.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT earthing systems</strong> — in a TT system, the earth path for fault
                current passes through a local earth electrode rather than through the supplier's
                network. The electrode resistance must be low enough to allow protective devices to
                operate within the required disconnection time. An electrician should test the
                electrode resistance using a loop impedance tester and document the result. RCD
                protection is essential in all TT installations under BS 7671 Regulation 411.5.3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME (TN-C-S) earthing and modern loads</strong> — properties on a PME supply
                should be aware that connecting certain loads such as EV chargers requires specific
                precautions under BS 7671. This is separate from smart metering but increasingly
                relevant as electric vehicle charging and smart tariffs converge.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are uncertain about your earthing system type, an{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            EICR (Electrical Installation Condition Report)
          </SEOInternalLink>{' '}
          will identify this and any related deficiencies as part of its findings.
        </p>
      </>
    ),
  },
  {
    id: 'ihd',
    heading: 'In-Home Display (IHD) — What It Does and Does Not Do',
    content: (
      <>
        <p>
          The In-Home Display (IHD) is a small wireless screen provided free with every smart meter
          installation. It communicates with the smart meter using Zigbee (a low-power wireless
          protocol) via the Home Area Network (HAN) and displays real-time energy consumption data
          for both electricity and gas.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What the IHD shows</strong> — current electricity consumption in watts or
                kilowatts, cost per hour at current consumption rate, cumulative daily and weekly
                usage, gas consumption where a smart gas meter is also fitted, and a traffic light
                indicator for low, medium, and high consumption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What the IHD does not do</strong> — it does not control appliances, it does
                not communicate with the internet directly, and it does not replace a smart home
                hub. It is a display device only. It requires no electrical installation work — it
                simply plugs into a standard socket outlet.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Range limitations</strong> — the IHD communicates wirelessly with the meter
                via Zigbee. The range is typically 10 to 30 metres through walls. If your meter is
                in an outbuilding or in a remote location, the IHD may not receive a reliable
                signal. In this case, a third-party smart energy monitor connected directly to the
                electricity supply may be a better solution.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'electrician-role',
    heading: "The Electrician's Role in Smart Meter Installations",
    content: (
      <>
        <p>
          Electricians do not install smart meters — that is the energy supplier's responsibility.
          However, electricians frequently carry out preparatory or remedial work that enables a
          smart meter installation to proceed or that is triggered by issues discovered during a
          failed smart meter appointment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replacing meter tails</strong> — old rubber-insulated, lead-sheathed, or
                damaged meter tails between the service head and consumer unit. This requires
                working in close proximity to the live service head; a properly insulated mat and
                appropriate PPE must be used. The service head cannot be de-energised by the
                electrician — only the DNO can do this.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Upgrading the consumer unit</strong> — replacing an old fuse board with a
                modern, metal-clad split-load or RCBO consumer unit complying with BS EN 61439-3.
                This is notifiable work under Part P and must be certified with an Electrical
                Installation Certificate (EIC) and a Building Regulations compliance certificate
                from a registered competent person scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing system assessment and improvement</strong> — testing earth
                electrode resistance on TT systems, installing additional electrodes where required,
                and documenting the results on the appropriate certificate. Issuing an{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR or EIC</SEOInternalLink> that
                the homeowner can provide to the smart meter installer as evidence of compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main bonding</strong> — ensuring main protective bonding conductors are in
                place for gas and water services under BS 7671 Regulation 411.3.1.2. Old properties
                sometimes lack bonding on one or both services, which is a C2 deficiency on an EICR
                and should be rectified before any new meter work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Costs and How to Prepare for a Smart Meter Installation',
    content: (
      <>
        <p>
          The smart meter itself and its installation are provided free of charge by your energy
          supplier. You should never pay for the meter or the installation engineer. However, if
          your property requires preparatory electrical work, you will need to pay an electrician
          for that separately.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart meter installation</strong> — free, arranged by your supplier. The
                appointment typically takes 30 to 90 minutes. You do not need to be present for the
                electricity meter only, but you must be present if a gas meter is also being
                changed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter tail replacement</strong> — typically £150 to £350 depending on the
                length of the run and the condition of the existing installation. Includes
                materials, labour, and the required Minor Works or EIC certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrade</strong> — typically £300 to £900 for a full consumer
                unit replacement in a domestic property. See the{' '}
                <SEOInternalLink href="/consumer-unit-types-guide">
                  consumer unit types guide
                </SEOInternalLink>{' '}
                for a detailed cost breakdown by unit type and property size.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing system assessment</strong> — an EICR including earthing tests
                typically costs £150 to £350 for a domestic property. Where additional earth
                electrodes or bonding conductors are required, allow an additional £100 to £250 for
                materials and labour.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working on smart meter-related preparatory work should issue the appropriate
          certificate: a Minor Electrical Installation Works Certificate (MEWC) for minor additions
          and alterations, or an{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          for new consumer unit installations. Elec-Mate supports both certificate types with
          on-site PDF generation and cloud storage.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SmartMeterInstallationPage() {
  return (
    <GuideTemplate
      title="Smart Meter Installation — An Electrician's Guide | Elec-Mate"
      description="Understand what happens during a smart meter installation from an electrician's perspective. SMETS1 vs SMETS2, DNO vs supplier responsibilities, TT earthing complications, consumer unit issues, and when to call an electrician."
      datePublished="2024-06-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Smart Meter Installation{' '}
          <span className="text-yellow-400">— An Electrician&apos;s Perspective</span>
        </>
      }
      heroSubtitle="Smart meters are fitted by your energy supplier, not an electrician. But a significant number of installations fail because of electrical issues at the property. Here is what electricians need to know — and what homeowners should resolve before the appointment."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Smart Meter Installation — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Certify your smart meter prep work on site"
      ctaSubheading="Generate Minor Works Certificates and EICRs from your phone. PDF in seconds, stored in the cloud."
    />
  );
}
