import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  Zap,
  ClipboardCheck,
  Settings,
  Users,
  Plug,
  Star,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Installations', href: '/guides/specialist-electrical' },
  { label: 'Exhibition & Event Electrical', href: '/exhibition-electrical' },
];

const tocItems = [
  { id: 'bs7909-overview', label: 'BS 7909 Temporary Electrical Systems' },
  { id: 'responsible-person', label: 'The Responsible Person' },
  { id: 'temporary-distribution', label: 'Temporary Distribution Systems' },
  { id: 'generator-connections', label: 'Generator Connections' },
  { id: 'rcd-protection', label: 'RCD Protection' },
  { id: 'tns-earthing', label: 'TN-S Earthing for Temporary Systems' },
  { id: 'inspection-handover', label: 'Inspection and Handover' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7909:2011 (Code of Practice for Temporary Electrical Systems for Entertainment and Related Purposes) is the primary standard for temporary electrical installations at exhibitions, festivals, conferences, and other events in the UK.',
  'A responsible person (RP) must be appointed for every temporary electrical installation. The RP takes professional responsibility for the design, installation, and safe operation of the electrical system throughout the event.',
  'Temporary distribution systems use a hierarchical structure: primary distribution from the power source (mains or generator), secondary distribution to areas or stages, and final distribution to individual supplies. Each level must be documented.',
  'Generator connections must be made by a competent person. The generator earthing arrangement (typically TN-S for temporary event installations) must be correctly established before any loads are connected.',
  '30 mA RCD protection is required for all socket outlet circuits. Time-delayed upstream RCDs provide discrimination so a fault at one socket does not black out the whole event.',
  'A pre-energisation check (sometimes called a BS 7671 inspection and test) must be carried out on every temporary installation before it is energised for the first time. This includes insulation resistance testing, continuity testing, and RCD functional testing.',
];

const faqs = [
  {
    question: 'What is BS 7909 and does it apply to all events?',
    answer:
      'BS 7909:2011 is the Code of Practice for Temporary Electrical Systems for Entertainment and Related Purposes. It covers temporary electrical installations for events including concerts, festivals, exhibitions, conferences, theatre productions, film and television productions, and similar. It is not a mandatory legal standard in itself, but compliance with BS 7909 is widely required by event venues, local authorities, and insurers. The Health and Safety at Work etc. Act 1974 and Electricity at Work Regulations 1989 impose legal duties that are satisfied by following BS 7909.',
  },
  {
    question: 'Who is the responsible person under BS 7909?',
    answer:
      'The responsible person (RP) is a competent individual appointed to take professional responsibility for the temporary electrical installation. The RP must have adequate knowledge of BS 7909 and BS 7671, experience in temporary electrical systems, and the authority to make decisions about the electrical installation throughout the event. The RP is responsible for design review, pre-energisation checks, energisation, monitoring during the event, and de-energisation. On large events there may be multiple RPs covering different areas.',
  },
  {
    question: 'What earthing system is used for temporary event installations?',
    answer:
      'TN-S earthing is the preferred earthing system for temporary electrical installations under BS 7909. In a TN-S system, the neutral and protective earth conductors are kept separate from source to load — there is no combined PEN conductor. This provides reliable earth fault protection and avoids the complications of PME (TN-C-S) in temporary systems where the integrity of the combined conductor cannot be assured. Generator-supplied temporary systems are typically inherently TN-S when correctly earthed.',
  },
  {
    question: 'What size cables are used in temporary event distribution?',
    answer:
      'Temporary event cabling is typically flexible rubber or thermoplastic elastomer insulated, with sizes ranging from 4 mm² for 32 A circuits through to 95 mm² or larger for primary distribution. All cables must be rated for the load and for the physical conditions (outdoor, subject to vehicle crossing, UV exposure). Cables in public areas must be routed in cable ramps or cable protectors and clearly marked. Cable routes must be included in the site documentation provided to the RP.',
  },
  {
    question: 'What RCD protection is required for temporary event installations?',
    answer:
      'Every socket outlet circuit must be protected by a 30 mA RCD. In practice, this means RCBO protection per socket outlet circuit in temporary distribution boards. Upstream circuits (primary and secondary distribution) should be protected by higher-rated, time-delayed RCDs (typically 100 mA or 300 mA with a short time delay) to provide discrimination — so that a fault on one final circuit trips only that circuit and not the upstream supply. Type A RCDs should be used where electronic equipment may be connected.',
  },
  {
    question: 'Does a temporary installation need a pre-energisation check?',
    answer:
      'Yes. BS 7909 requires a pre-energisation check (PEC) before any temporary installation is energised for the first time. The PEC is equivalent to an initial verification under BS 7671 and includes: insulation resistance testing of all distribution cables and board wiring, continuity testing of protective conductors, functional testing of all RCDs, verification of earthing arrangements, and a visual inspection of all distribution equipment, cabling, and connections. The PEC must be carried out by a competent person and the results recorded in writing.',
  },
  {
    question: 'What documentation is required for a temporary event electrical installation?',
    answer:
      'BS 7909 requires a complete documentation package including: a site survey report, a single-line diagram showing the distribution system, a schedule of distribution boards and their circuits, a cable schedule, earthing arrangement drawings, a pre-energisation check report, a risk assessment, a method statement, and an operational procedure for energisation, de-energisation, and emergency shutdown. All documentation must be available on site throughout the event and retained for a defined period after the event.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/temporary-installations-bs7909',
    title: 'Temporary Electrical Installations Guide',
    description: 'Detailed guide to BS 7909 temporary electrical system design and compliance.',
    icon: Zap,
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
    href: '/guides/rcd-types-explained',
    title: 'RCD Types Explained',
    description:
      'Type AC, A, F, and B RCDs — which to use and why it matters for temporary installations.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete pre-energisation checks and inspection reports on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'bs7909-overview',
    heading: 'BS 7909: Temporary Electrical Systems for Entertainment',
    content: (
      <>
        <p>
          BS 7909:2011 — Code of Practice for Temporary Electrical Systems for Entertainment and
          Related Purposes — is the primary technical standard governing temporary electrical
          installations at UK events. It applies to exhibitions, trade shows, music concerts,
          outdoor festivals, film and television productions, conferences, sports events, and any
          other temporary gathering requiring an electrical installation designed for a defined
          period.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Relationship to BS 7671</strong> — BS 7909 is complementary to, not a
                replacement for, BS 7671. Temporary event installations must comply with both BS
                7671 (which sets the fundamental electrical safety requirements) and BS 7909 (which
                addresses the specific management, documentation, and operational requirements of
                temporary systems). Where BS 7909 is silent, BS 7671 applies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Legal framework</strong> — while BS 7909 is not in itself a statutory
                instrument, compliance with it provides a means of satisfying the legal duties
                imposed by the Electricity at Work Regulations 1989 and the Health and Safety at
                Work etc. Act 1974. Local authorities licensing events and venue operators routinely
                require evidence of BS 7909 compliance. The Event Safety Guide (the Purple Guide)
                also references BS 7909.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Temporary vs. permanent</strong> — a temporary electrical installation is
                defined as one designed and installed for a specific event or series of events over
                a defined period. It is erected before the event and dismantled after. The temporary
                nature does not reduce the safety standards required — a temporary installation must
                be as safe as a permanent one.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working on temporary event installations should be familiar with BS 7909,{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          , and the Electricity at Work Regulations 1989. The IET has published guidance notes
          specific to entertainment installations.
        </p>
      </>
    ),
  },
  {
    id: 'responsible-person',
    heading: 'The Responsible Person: Roles and Duties',
    content: (
      <>
        <p>
          The responsible person (RP) is central to the BS 7909 framework. The RP is a competent
          individual who takes professional responsibility for the electrical installation from
          design through to de-energisation. On large events, a team of RPs may be appointed, each
          responsible for a defined area or system.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competence requirements</strong> — the RP must have adequate knowledge of BS
                7671 and BS 7909, experience in designing and supervising temporary electrical
                systems, and hold appropriate qualifications. In practice, RPs are typically
                qualified electricians with experience in the entertainment sector, often holding
                additional training certificates specific to event electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design responsibilities</strong> — the RP reviews or produces the electrical
                design, including the single-line diagram, cable schedules, protection coordination,
                earthing design, and load calculations. On smaller events the RP may be the
                designer; on larger events the RP reviews designs produced by others.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pre-energisation check</strong> — the RP oversees or carries out the
                pre-energisation check (PEC) and signs off the installation as safe to energise.
                This is a formal process with recorded test results. The RP must be satisfied that
                the installation complies with the design before energisation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency procedures</strong> — the RP must establish and communicate
                emergency shutdown procedures to all relevant event staff. The location of all
                isolation points, the de-energisation sequence, and the actions to take in an
                electrical emergency must be documented and rehearsed before the event opens.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'temporary-distribution',
    heading: 'Temporary Distribution Systems',
    content: (
      <>
        <p>
          Temporary event electrical distribution typically follows a hierarchical structure, from
          the primary power source through secondary and tertiary distribution to individual loads.
          Each level of the hierarchy has defined protection and documentation requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Primary distribution</strong> — from the power source (mains incomer or
                generator) to primary distribution boards (PDBs). Primary distribution typically
                uses large-section armoured or rubber-insulated flexible cables and Ceeform or
                camlock connectors rated at 200 A to 400 A. Overcurrent protection at the primary
                level uses moulded case circuit breakers (MCCBs).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Secondary distribution</strong> — from PDBs to secondary distribution boards
                (SDBs) serving individual areas, stages, or zones. Secondary distribution cables are
                typically 16–70 mm² flexible rubber insulated. Secondary distribution boards
                incorporate MCBs or RCBOs per outgoing circuit with appropriate time delays for
                discrimination.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Final distribution</strong> — from SDBs to 32 A or 16 A socket outlet
                boards, lighting dimmer racks, or directly to fixed equipment. Every socket outlet
                circuit at the final level must have 30 mA RCBO protection. Socket outlet boards
                used at events must be purpose-built for event use — domestic consumer units are not
                suitable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable management</strong> — all cables in public areas must be protected
                against damage and must not create trip hazards. Cable ramps, cable bridges, and
                overhead cable routes are standard. All cables must be clearly labelled at both ends
                and at regular intervals. Cable routes must be marked on the event site plan.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'generator-connections',
    heading: 'Generator Connections for Temporary Events',
    content: (
      <>
        <p>
          Generators are the primary power source for many outdoor events and for indoor events
          where the venue's mains supply is insufficient. Generator connections must be made
          correctly to establish a safe earthing arrangement before any loads are connected.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generator earthing</strong> — a generator supplying a temporary installation
                must be earthed by connecting its star-point neutral to an earth electrode driven at
                or near the generator. This establishes a TN-S system where the neutral and
                protective earth conductors are separate throughout the distribution system. The
                neutral must NOT be connected to the generator's metallic frame without first
                establishing an earth electrode connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode resistance</strong> — the earth electrode at the generator
                must be tested before the generator is loaded. For a TN-S system, the earth
                electrode resistance must be low enough to ensure that the prospective fault current
                is sufficient to operate the overcurrent protective devices within the required
                disconnection times.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generator output cables</strong> — output cables from the generator must be
                rated for the generator's full output and for the physical conditions at the site.
                Connections must be made using appropriate connectors rated for the current and
                installed by a competent person. Generator output cables in public areas must be
                routed to prevent damage from vehicles or foot traffic.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection in Temporary Event Installations',
    content: (
      <>
        <p>
          RCD protection is the primary line of defence against electric shock in temporary event
          installations. The combination of outdoor environments, high pedestrian traffic, flexible
          cables subject to damage, and large numbers of members of the public makes comprehensive
          RCD protection non-negotiable.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>30 mA for all socket outlet circuits</strong> — every socket outlet circuit
                at the final distribution level must be protected by a 30 mA RCBO. This is a
                mandatory requirement under BS 7671 Regulation 411.3.3 and is reinforced by BS 7909.
                There are no exceptions for temporary event installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Discrimination — upstream time-delayed RCDs</strong> — primary and secondary
                distribution boards should incorporate time-delayed RCDs (S-type, with a short time
                delay) rated at 100 mA to 300 mA. These provide discrimination so that a 30 mA trip
                at a socket outlet level does not trip the upstream 300 mA device, preserving power
                to the rest of the event.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD testing before energisation</strong> — all RCDs must be functionally
                tested as part of the pre-energisation check. The test records must include the
                operating time at IΔn and at 5× IΔn. Only calibrated test instruments must be used;
                the test button on the RCD face does not verify operating time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Record all RCD test results in the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            Elec-Mate inspection report app
          </SEOInternalLink>{' '}
          as part of the pre-energisation check documentation.
        </p>
      </>
    ),
  },
  {
    id: 'tns-earthing',
    heading: 'TN-S Earthing for Temporary Electrical Systems',
    content: (
      <>
        <p>
          TN-S earthing is the preferred and most straightforward earthing arrangement for temporary
          event electrical installations. Understanding why TN-S is preferred — and why PME (TN-C-S)
          must not be used — is essential for electricians working in the events sector.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why TN-S for temporary systems</strong> — in a TN-S system, the neutral and
                protective earth conductors are separate from the source to every point in the
                installation. A break in the neutral conductor does not cause dangerous voltages on
                the protective earth conductor and hence on equipment metalwork. In temporary
                systems, where cable connections are made and remade many times, this separation
                provides a critical safety margin.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why PME must not be used</strong> — in a PME (TN-C-S) system, the protective
                earth is derived from the combined PEN conductor. If this conductor is broken
                between the source and a connected piece of equipment, the equipment's metalwork can
                rise to near-full line voltage. In temporary systems, an open PEN fault is a
                realistic risk. For this reason, BS 7909 and network operator engineering standards
                restrict the use of PME for temporary event installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation transformers</strong> — where a mains supply providing only PME
                earthing is the available power source, an isolation transformer may be used to
                derive a local TN-S (or IT) system. The transformer secondary is earthed via a local
                earth electrode, establishing a safe TN-S arrangement for the temporary
                installation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'inspection-handover',
    heading: 'Pre-Energisation Inspection and Handover',
    content: (
      <>
        <p>
          A formal pre-energisation check (PEC) is required before any temporary installation is
          energised for the first time. The PEC follows the same principles as an initial
          verification under BS 7671 and must be carried out by a competent person appointed by the
          responsible person.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance testing</strong> — all distribution cables and board
                wiring must be tested for insulation resistance before energisation. Tests are
                carried out phase-to-neutral, phase-to-earth, and neutral-to-earth using a 500 V DC
                insulation resistance tester. The minimum acceptable value is 1 MΩ per BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protective conductor continuity</strong> — continuity of all protective
                earth conductors must be verified from each load point back to the main earthing
                terminal. Earth continuity must be confirmed before energisation, as a break in the
                protective conductor is not detectable during normal operation until a fault occurs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD functional testing</strong> — all RCDs at every distribution level must
                be tested with a calibrated RCD tester before energisation. Operating times at IΔn
                and 5× IΔn must be recorded and verified against BS 7671 maximum values.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation</strong> — all PEC test results must be recorded and retained
                as part of the event documentation package. The RP signs off the PEC report and
                retains it throughout the event. The PEC report should be available for inspection
                by the local authority or safety officer if requested.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Temporary Event Electrical Work',
    content: (
      <>
        <p>
          Temporary event electrical work is a demanding and rewarding specialism. Exhibition,
          festival, and event electricians need excellent knowledge of BS 7909 and BS 7671, physical
          stamina for installation work in all weather conditions, and the ability to work to tight
          deadlines. Day rates for experienced event electricians and responsible persons are
          typically above the national average for electrical work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Complete Pre-Energisation Checks On Site
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate inspection app
                  </SEOInternalLink>{' '}
                  to record pre-energisation check test results on your phone — insulation
                  resistance, continuity, and RCD test results — and generate the PDF PEC report
                  before energisation. No paper, no delays.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Settings className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Event Electrical Packages</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to produce professional quotes for exhibition and event electrical packages —
                  covering design, supply of distribution equipment, installation, PEC, and de-rig.
                  Professional quotes help win repeat contracts with event production companies and
                  exhibition stand builders.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Event electrical work made simple with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site inspection reporting, pre-energisation check documentation, and instant PDF export. Ideal for exhibition and event electrical work. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ExhibitionElectricalPage() {
  return (
    <GuideTemplate
      title="Exhibition & Event Electrical | Temporary Installations BS 7909"
      description="Complete guide to temporary electrical installations for exhibitions, events, and entertainment under BS 7909. Responsible person duties, temporary distribution, generator connections, RCD protection, TN-S earthing, and pre-energisation checks."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Installation"
      badgeIcon={Star}
      heroTitle={
        <>
          Exhibition & Event Electrical:{' '}
          <span className="text-yellow-400">Temporary Installations BS 7909</span>
        </>
      }
      heroSubtitle="Everything electricians need to know about temporary electrical installations for exhibitions, festivals, and events — BS 7909 requirements, responsible person duties, temporary distribution systems, generator earthing, 30 mA RCD protection, TN-S earthing, and pre-energisation checks."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Exhibition and Event Electrical Installations"
      relatedPages={relatedPages}
      ctaHeading="Complete Event Pre-Energisation Checks on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site inspection reporting, test result recording, and instant PDF export. Perfect for BS 7909 pre-energisation checks. 7-day free trial."
    />
  );
}
