import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Zap,
  AlertTriangle,
  ClipboardCheck,
  Home,
  ShieldCheck,
  PoundSterling,
  Settings,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Extension Guides', href: '/house-extension-electrical-guide' },
  { label: 'House Extension Electrical Guide', href: '/house-extension-electrical-guide' },
];

const tocItems = [
  { id: 'planning-circuits', label: 'Planning the Circuits' },
  { id: 'consumer-unit-capacity', label: 'Consumer Unit Capacity Check' },
  { id: 'ring-main-vs-new-circuit', label: 'Ring Main Extension vs New Circuit' },
  { id: 'part-p-notification', label: 'Part P Notification' },
  { id: 'inspection-and-testing', label: 'Inspection and Testing' },
  { id: 'eic-certificate', label: 'EIC Certificate' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'All new electrical work in a house extension must comply with BS 7671:2018+A3:2024 (18th Edition Wiring Regulations) and is notifiable under Part P of the Building Regulations unless a competent person scheme member carries out the work.',
  'Before starting any extension electrical work, an electrician must assess the existing consumer unit for spare ways and sufficient main fuse capacity — adding rooms without checking load is a common and dangerous oversight.',
  'Extending a ring final circuit is permissible under BS 7671 but introduces additional impedance. If the ring already serves a large area, a new dedicated circuit from the consumer unit is the safer and more compliant approach.',
  'An Electrical Installation Certificate (EIC) must be issued for all new circuit installations in an extension. This is a legal requirement under Part P and required for building regulations sign-off.',
  'Socket-outlet circuits in the extension must have RCD protection not exceeding 30mA in accordance with Regulation 411.3.3 of BS 7671. Most new consumer units include RCD protection as standard.',
];

const faqs = [
  {
    question: 'Do I need an electrician for a house extension in the UK?',
    answer:
      'Yes. All electrical work in a house extension is notifiable under Part P of the Building Regulations 2010. You can either use an electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or similar), who self-certifies the work, or use any electrician and notify your local authority building control, who will inspect the work for a fee. Either way, an Electrical Installation Certificate (EIC) must be issued on completion.',
  },
  {
    question: 'How many sockets should a house extension have?',
    answer:
      'BS 7671 does not specify a minimum number of sockets. However, the 18th Edition guidance recommends planning for likely usage. A single room extension for a bedroom should have at least four double sockets; a kitchen extension will need dedicated circuits for appliances. Plan for more than you think you need — adding sockets later is more expensive than doing them right the first time.',
  },
  {
    question: 'Can I extend an existing ring main into my extension?',
    answer:
      'You can extend an existing ring final circuit into an extension, but only if the existing ring is not already serving an excessively large area and the loop impedance values remain within acceptable limits under BS 7671. The electrician must verify that the added cable length does not push the earth fault loop impedance above the maximum permitted value for the protective device. For larger extensions, a new circuit from the consumer unit is the cleaner solution.',
  },
  {
    question: 'Do I need a new consumer unit for a house extension?',
    answer:
      'Not necessarily, but your existing consumer unit must have sufficient spare ways and the incoming main fuse must be rated to handle the additional load. If the consumer unit is old (particularly if it has a wooden back, cast-iron switches, or rewirable fuses), it is strongly advisable to upgrade to a modern unit with full RCD or RCBO protection before adding new circuits. An electrician should carry out a load assessment before starting the extension work.',
  },
  {
    question: 'What is Part P Building Regulations and does it apply to my extension?',
    answer:
      'Part P of the Building Regulations 2010 (as amended) requires that all fixed electrical installation work in dwellings in England is designed, installed, inspected, tested, and certified to BS 7671. Work in a house extension is always notifiable. Competent person scheme members (NICEIC, NAPIT, ELECSA registered electricians) can self-certify, meaning they notify the scheme on your behalf. If you use a non-registered electrician, you must notify building control before work begins.',
  },
  {
    question: 'How much does electrical work for a house extension cost?',
    answer:
      'Electrical costs for a house extension depend heavily on the scope of work. A single-room extension with standard lighting, sockets, and a heating circuit typically costs £800 to £2,000 in materials and labour. A large kitchen or open-plan extension with underfloor heating, kitchen appliance circuits, and consumer unit upgrade can cost £2,500 to £5,000 or more. Always obtain at least three quotes from registered electricians and ensure the price includes the EIC and Part P notification.',
  },
  {
    question: 'What testing is required for extension electrical work?',
    answer:
      'All new circuits in an extension must be inspected and tested before they are energised. Testing includes insulation resistance testing (between all conductors and between conductors and earth), continuity of protective conductors, ring final circuit continuity where applicable, polarity verification, earth fault loop impedance measurement, and RCD operating time testing. Results are recorded on the EIC schedule of test results. The inspector must verify that all measured values are within the limits specified by BS 7671.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/loft-conversion-electrical-guide',
    title: 'Loft Conversion Electrical Guide',
    description: 'Circuit planning, smoke detection requirements, and Part P for loft conversions.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/garage-conversion-electrical',
    title: 'Garage Conversion Electrical Work',
    description: 'Upgrading from garage supply to habitable room standard — full wiring guide.',
    icon: Settings,
    category: 'Guide',
  },
  {
    href: '/outbuilding-electrical-installation',
    title: 'Outbuilding Electrical Installation',
    description: 'SWA armoured cable, trench depth, sub-board, and TT earthing for outbuildings.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to the current wiring regulations for UK electricians.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'planning-circuits',
    heading: 'Planning the Circuits for Your House Extension',
    content: (
      <>
        <p>
          Good circuit planning is the foundation of a compliant and future-proof house extension
          electrical installation. Before any cable is laid, the electrician and homeowner should
          agree on exactly what the extension will be used for — this determines the number and type
          of circuits required.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting circuits</strong> — a standard extension room requires a dedicated
                lighting circuit or connection to the nearest lighting circuit. Downlighters,
                pendants, and external security lighting should all be planned at this stage. Where
                LED downlighters are installed, confirm driver compatibility to avoid flicker.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket-outlet circuits</strong> — plan for more double sockets than you
                think you need. A living room extension should have a minimum of six to eight double
                sockets. Kitchen extensions require dedicated 32A circuits for ovens, 20A for
                dishwashers and washing machines, and 13A fused spurs for fridges and microwaves.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heating circuits</strong> — if the extension includes electric underfloor
                heating, a dedicated circuit sized to the heater wattage is required. Underfloor
                heating in a wet room requires a thermostat with a floor sensor and must have RCD
                protection under Regulation 701.411.3.3 of BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Data and communications</strong> — plan conduit runs for ethernet cables at
                the same time as electrical first fix. Retro-fitting data cables is far more
                disruptive and expensive than running them during the build.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The electrician should produce a circuit schedule before first fix begins. This records
          every circuit, its cable size, protective device rating, and RCD protection type. This
          document forms the basis of the{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>{' '}
          issued on completion.
        </p>
      </>
    ),
  },
  {
    id: 'consumer-unit-capacity',
    heading: 'Consumer Unit Capacity Check',
    content: (
      <>
        <p>
          Adding new circuits for a house extension places additional demand on the existing
          consumer unit and incoming supply. A capacity check must be carried out before any new
          circuits are installed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spare ways</strong> — count the number of unused circuit breaker ways in the
                consumer unit. Each new circuit in the extension requires at least one way (or two
                for an RCBO). If no spare ways exist, the consumer unit must be upgraded or a
                separate distribution board added for the extension.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main fuse rating</strong> — the incoming supply fuse (typically 60A, 80A, or
                100A) limits the total load the property can draw. For a large extension with
                underfloor heating and kitchen appliances, a 100A main fuse may be required. If the
                existing fuse is 60A, the DNO (Distribution Network Operator) must be consulted
                about an upgrade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit age and condition</strong> — consumer units with rewirable
                fuses, wooden backs, or no RCD protection should be replaced before adding extension
                circuits. Under Regulation 411.3.4 of BS 7671, all new consumer units installed in
                domestic premises must have a non-combustible enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Diversity calculation</strong> — a qualified electrician should carry out a
                diversity calculation to determine the actual maximum demand, taking into account
                that not all circuits will be at full load simultaneously. This determines whether
                the existing supply is adequate.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the existing consumer unit is to be upgraded as part of the extension project, the
          entire consumer unit installation becomes notifiable under Part P and must be covered by
          the EIC.
        </p>
      </>
    ),
  },
  {
    id: 'ring-main-vs-new-circuit',
    heading: 'Ring Main Extension vs New Circuit from the Consumer Unit',
    content: (
      <>
        <p>
          One of the most common decisions in extension electrical work is whether to extend an
          existing ring final circuit into the new rooms or to run new dedicated circuits from the
          consumer unit. Both approaches are permitted under BS 7671, but each has important
          technical considerations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extending a ring main — when it works</strong> — if the existing ring final
                circuit serves a modest floor area, has acceptable earth fault loop impedance
                values, and has spare capacity, extending it into the new room is electrically
                sound. The electrician must re-test the entire ring after extension and verify that
                the R1 + R2 values remain within limits for the protective device.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extending a ring main — when to avoid it</strong> — if the ring already
                serves a large area (typically more than 100m² under BS 7671 guidance), adding
                additional cable length will increase the loop impedance and may push values above
                the permitted maximum. Additionally, extending a ring that already shows signs of
                deterioration or has previous non-compliant spurs is poor practice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New circuit from the consumer unit — the preferred approach</strong> — for
                most extensions, running new circuits back to the consumer unit is the cleanest
                solution. It provides a known, tested installation; keeps the extension circuits
                independently protected; and avoids disturbing the existing installation. Where
                there are no spare ways in the consumer unit, a new consumer unit or
                sub-distribution board is required.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The decision should be driven by test results and load calculations, not convenience. A
          competent electrician will test the existing installation before advising on the most
          appropriate approach.
        </p>
      </>
    ),
  },
  {
    id: 'part-p-notification',
    heading: 'Part P Building Regulations Notification',
    content: (
      <>
        <p>
          Part P of the Building Regulations 2010 (Schedule 1, Part P — Electrical Safety) applies
          to all fixed electrical installation work carried out in or associated with a dwelling in
          England. A house extension is always notifiable — there are no exemptions for extensions.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme route</strong> — the simplest route to compliance is
                using an electrician registered with NICEIC, NAPIT, ELECSA, or another
                government-approved competent person scheme. The electrician notifies the scheme on
                completion; the scheme notifies the local authority on your behalf. No building
                control involvement is required. You receive a completion certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local authority building control route</strong> — if you use an electrician
                not registered with a competent person scheme, you must notify your local authority
                building control before work begins. The building control officer will inspect the
                work, and a fee (typically £150 to £300) is payable. The EIC is still required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consequences of non-notification</strong> — failing to notify Part P work is
                a breach of the Building Regulations. When you come to sell the property, your
                solicitor will ask for evidence of electrical compliance. If you cannot produce an
                EIC and Part P notification, the sale can be delayed or fall through. Retrospective
                regularisation is possible but costly.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'inspection-and-testing',
    heading: 'Inspection and Testing for Extension Electrical Work',
    content: (
      <>
        <p>
          All new electrical circuits installed in a house extension must be inspected and tested
          before they are connected to the supply. Testing is not optional — it is a legal
          requirement under Part P and BS 7671 Section 6 (Inspection and Testing).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity of protective conductors</strong> — all circuit protective
                conductors (CPCs) must be verified as continuous from each accessory back to the
                main earthing terminal. This is measured using a low-resistance ohmmeter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance</strong> — insulation resistance must be measured
                between all live conductors and between live conductors and earth, with a minimum
                acceptable value of 1MΩ under BS 7671. Testing is carried out at 500V DC for
                circuits up to 500V.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth fault loop impedance</strong> — the measured Zs value for each circuit
                must not exceed the maximum permitted value for the protective device. For a 32A
                Type B circuit breaker, the maximum Zs is 1.44Ω. Exceeding this value means the
                protective device will not operate within the required disconnection time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD operating time</strong> — all RCDs protecting socket-outlet circuits
                must trip within 300ms at rated residual current (IΔn) and within 40ms at 5×IΔn, in
                accordance with BS EN 61008 and BS 7671 Chapter 53.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All test results are recorded on the schedule of test results, which forms part of the
          Electrical Installation Certificate. The inspector must sign the EIC confirming that the
          installation has been designed, installed, inspected, and tested in accordance with BS
          7671.
        </p>
      </>
    ),
  },
  {
    id: 'eic-certificate',
    heading: 'Electrical Installation Certificate (EIC) Requirement',
    content: (
      <>
        <p>
          An Electrical Installation Certificate (EIC) is the legal document confirming that new
          electrical work has been designed, installed, inspected, and tested in accordance with BS
          7671. For house extension electrical work, an EIC is mandatory — without one, the work
          cannot be signed off under Part P.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>What the EIC contains</strong> — the EIC includes the details of the
                installer and designer, the address of the installation, a description of the work
                carried out, the extent of the installation covered, the earthing and bonding
                arrangements, and the schedule of test results for all circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who issues it</strong> — the EIC must be signed by the designer, the
                installer, and the inspector/tester. In most domestic extension projects, one
                qualified electrician performs all three roles and signs all three declarations. The
                electrician must be competent to do so under BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep it safe</strong> — the EIC must be provided to the homeowner on
                completion and kept with the property's building regulations documentation. It will
                be required when the property is sold and may be requested by insurers following an
                electrical incident.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use the <SEOInternalLink href="/eic-certificate">Elec-Mate EIC app</SEOInternalLink>{' '}
          to complete the Electrical Installation Certificate on site, including the schedule of
          test results. Generate a professional PDF and send it to the client before you leave.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Winning Extension Electrical Contracts',
    content: (
      <>
        <p>
          House extensions represent some of the most profitable and professionally rewarding work
          available to domestic electricians. A well-run extension project — first fix, second fix,
          testing, and certification — typically generates £1,500 to £4,000 in revenue for a
          qualified electrician.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete the EIC On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Elec-Mate EIC certificate app
                  </SEOInternalLink>{' '}
                  to enter test results as you go and generate a finished PDF before you leave the
                  job. No evening paperwork, no forgotten values, no delays in sending certificates
                  to clients.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Accurately and Win More Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build professional extension quotes with itemised materials and labour.
                  Homeowners commissioning extensions are quality-focused — a professional, detailed
                  quote wins the job over a verbal estimate every time.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage your extension jobs with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for EIC certificates, quoting, job management, and Part P compliance. Complete more jobs per day with less paperwork. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HouseExtensionElectricalGuidePage() {
  return (
    <GuideTemplate
      title="House Extension Electrical Guide UK | Wiring a House Extension"
      description="Complete guide to electrical work in a house extension. Circuit planning, consumer unit capacity check, ring main extension vs new circuit, Part P notification, inspection and testing, and EIC certificate requirements under BS 7671."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Extension Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          House Extension Electrical Guide:{' '}
          <span className="text-yellow-400">Wiring Your Extension Right</span>
        </>
      }
      heroSubtitle="Everything you need to know about electrical work in a house extension — circuit planning, consumer unit capacity, ring main decisions, Part P notification, inspection and testing, and the mandatory Electrical Installation Certificate."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About House Extension Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Complete Extension EICs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, quoting, and job management. 7-day free trial, cancel anytime."
    />
  );
}
