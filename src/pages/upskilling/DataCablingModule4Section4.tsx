import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
  AmendmentBadge,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'datacabling-m4s4-administration-standards',
    question:
      'A specifier asks "which standards govern cable identification and administration on a UK structured-cabling job?" — what is the correct answer?',
    options: [
      'BS 7671 alone covers all identification.',
      'ANSI/TIA-606-D (2021) — the Administration Standard for Telecommunications Infrastructure (US / international); BS EN 50174-1 §6 — Specification and quality assurance, with the administration / labelling clause within. Both define a hierarchy of unique identifiers spanning every cable, every outlet, every patch panel port, every termination — and require records that survive personnel changes. The two are aligned in principle; differences are minor.',
      'There is no relevant standard — labelling is a contractor preference.',
      'BS EN 50173-1 governs labelling.',
    ],
    correctIndex: 1,
    explanation:
      'TIA-606-D (2021) is the North American / international administration standard. BS EN 50174-1 §6 covers the same ground in the European / UK domain, with administration / quality-assurance / labelling requirements built into Part 1 of the EN 50174 series. Both require unique identifiers for every cable, every outlet, every patch panel port, every termination — recorded so the records survive personnel changes. The principle: every link uniquely identified, no exceptions.',
  },
  {
    id: 'datacabling-m4s4-identifier-hierarchy',
    question:
      'A typical office floor has multiple buildings, multiple floors per building, multiple telecoms rooms per floor, multiple patch panels per TR, and 24-port panels. What kind of identifier scheme delivers a unique label for every outlet?',
    options: [
      'A single number from 1 to 1000 covers all outlets.',
      'A hierarchical scheme: building / floor / telecoms-room / patch-panel / port, e.g. "B2-04-TRA-PP3-12" = Building 2, Floor 4, Telecoms Room A, Patch Panel 3, Port 12. The cable label, the outlet label, the patch panel port label and the connection-records all use the same identifier so the link is traced end-to-end. TIA-606-D and BS EN 50174-1 §6 both prescribe this hierarchy.',
      'Random labels per cable.',
      'Just colour-coding without numbering.',
    ],
    correctIndex: 1,
    explanation:
      'The hierarchical identifier is the heart of TIA-606-D / BS EN 50174-1 §6. Every link is identified by a single string that nests building → floor → TR → patch panel → port (with site / campus added at the top of the hierarchy for multi-site jobs). The same string is on the cable, on the outlet, on the patch-panel port, and in the connection records. Anyone can trace any link from any end without disturbing other cables.',
  },
  {
    id: 'datacabling-m4s4-colour-coding',
    question:
      'A facilities team wants to introduce colour-coding to distinguish service types on the patch panels — voice, data, CCTV, building automation. What does TIA-606-D recommend?',
    options: [
      'Colour-coding is forbidden — labels only.',
      'TIA-606-D allows colour-coding by service type or pathway as an OPTIONAL supplement to the unique identifier scheme. Common conventions: blue for voice, white for data, red for fire alarm / safety, green for CCTV / security, yellow for utility / non-corporate, etc. The colour is a fast visual cue; the unique identifier remains the authoritative label. Colour conventions are agreed at design stage and documented in the administration record so the next contractor can read them.',
      'Colour-coding replaces the need for labels.',
      'Only black and white labels are permitted.',
    ],
    correctIndex: 1,
    explanation:
      'TIA-606-D allows colour-coding as an optional supplement. Common conventions exist (blue voice, white data, red fire / safety, green security, yellow utility) but they are agreed at site level — there is no single mandatory mapping. The point is: pick a scheme, document it in the administration record, apply it consistently. Colour is a fast visual cue; the unique identifier remains the authoritative label.',
  },
  {
    id: 'datacabling-m4s4-records-discipline',
    question:
      'On a typical office cabling job, who actually maintains the administration records over the building life?',
    options: [
      'Records are not required.',
      'TIA-606-D and BS EN 50174-1 §6 require records to be created at handover and maintained thereafter. The building owner / facilities team owns the record going forward; subsequent contractors update it for every move / add / change. Records typically live as: (a) a connection-records database (CMDB or similar) listing every link by identifier with terminations and current status; (b) as-built drawings showing pathways and outlet positions; (c) test results for every link.',
      'The first contractor maintains records forever.',
      'Records expire after 5 years.',
    ],
    correctIndex: 1,
    explanation:
      'TIA-606-D / BS EN 50174-1 §6 require records at handover and ongoing maintenance. The discipline is: at handover the contractor delivers the administration record (connection-records database, as-built drawings, test results) to the building owner / facilities team. For every subsequent move / add / change, the records are updated. Without this discipline the records decay over 2-3 years and the cabling becomes effectively unmaintainable. The records ARE the administration system; without records, the cabling is undocumented and cannot be safely modified.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the primary North American / international administration standard for telecommunications cabling labelling and identifier records?',
    options: [
      'BS EN 50173-1.',
      'ANSI/TIA-606-D (2021) — Administration Standard for Telecommunications Infrastructure. Defines identifier hierarchy, labelling format, records discipline, change management for structured cabling.',
      'BS 7671.',
      'BS 5266.',
    ],
    correctAnswer: 1,
    explanation:
      'TIA-606-D (2021) is the dedicated administration standard. It defines the identifier hierarchy (site / building / floor / TR / patch panel / port), labelling format on cable / outlet / panel, the records the contractor must produce at handover, and the change-management discipline for moves / adds / changes. Aligned with BS EN 50174-1 §6 in the European / UK domain.',
  },
  {
    id: 2,
    question:
      'What is the European / UK equivalent of TIA-606-D, and where does the labelling clause sit within it?',
    options: [
      'BS 7671 §444.6.2.',
      'BS EN 50174-1 §6 — the Administration / Quality Assurance section of BS EN 50174-1 (Information technology cabling installation: Specification and quality assurance). Cited from BS 7671 §444.410(a) as the standard to apply for control / signalling / communication circuits inside buildings.',
      'BS EN 50310 §4.',
      'BS EN 50173-1 §3.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 50174-1 §6 is the European labelling / administration clause. The wider standard BS EN 50174-1 covers specification and quality assurance for cabling installation. §444.410(a) of BS 7671 explicitly cites it as the standard to apply for control / signalling / communication circuits — bringing the labelling discipline formally into BS 7671 compliance.',
  },
  {
    id: 3,
    question:
      'Which BS 7671 regulation places BS EN 50174-1 (and therefore its labelling / administration discipline) into the wiring-regs compliance envelope?',
    options: [
      '§411.3.1.',
      '§444.410 — verbatim: "Within a building, the requirements and recommendations of the following standards shall be applied for control, signalling and communication circuits: (a) BS EN 50174-1: Information technology — Cabling installation: Installation specification and quality assurance; (b) BS EN 50174-2: ...; (c) BS EN 50310: ..."',
      '§528.3.5.',
      '§544.1.2.',
    ],
    correctAnswer: 1,
    explanation:
      '§444.410 is the gateway clause. By citing BS EN 50174-1 explicitly, BS 7671:2018+A4:2026 brings the labelling / administration discipline of BS EN 50174-1 §6 into the wiring-regs compliance envelope. On a UK 2026 cabling job, BS 7671 §444.410 + BS EN 50174-1 §6 + TIA-606-D give the full administration framework.',
  },
  {
    id: 4,
    question: 'A patch panel port is labelled "B1-03-TRB-PP2-08". What does the identifier mean?',
    options: [
      'A random label.',
      'Hierarchical identifier: Building 1, Floor 03, Telecoms Room B, Patch Panel 2, Port 08. The same string appears on the cable label, the outlet label and the connection record so the link is uniquely identified end-to-end. TIA-606-D / BS EN 50174-1 §6 both use this hierarchy with site / campus / building / floor / TR / panel / port nesting.',
      'A part number.',
      'A serial number for the cable.',
    ],
    correctAnswer: 1,
    explanation:
      'B1-03-TRB-PP2-08 reads building / floor / TR / panel / port — the standard hierarchical nesting from TIA-606-D / BS EN 50174-1 §6. The same identifier appears on the cable both ends, on the outlet faceplate, on the patch-panel port, and in the connection-records database. Anyone can find any link from any end. The hierarchy can extend upward (site / campus) for multi-site jobs.',
  },
  {
    id: 5,
    question:
      'You are pulling a Cat6A horizontal cable. At how many points along the cable should the identifier appear?',
    options: [
      'Once, at one end only.',
      "At BOTH ends — at the work-area outlet termination and at the patch-panel termination — using durable labels (engraved, laser-printed adhesive or factory-pre-printed cable labels) that survive 15-20 years of dressing, retermination and environmental exposure. Some specs additionally require labels at the cable's entry / exit at floor / wall penetrations or in long runs.",
      'On the cable jacket itself only.',
      'No labelling is required.',
    ],
    correctAnswer: 1,
    explanation:
      'Both ends, durable labels. The label has to survive the cable life — engraved, laser-printed adhesive (ideally pre-printed cable labels with a clear cover sleeve), or factory-printed labels are all acceptable. Hand-written sticky labels are not — they fall off, fade, or get re-marked by a subsequent contractor. The label needs to be readable in 2040 by a contractor who never met the original installer.',
  },
  {
    id: 6,
    question:
      'A facilities team wants to colour-code patch leads to distinguish service types — what is the typical convention?',
    options: [
      'Colour-coding is not permitted.',
      'A common convention (TIA-606-D allows colour-coding as optional): blue for voice, white for data, red for fire alarm / safety / life-safety, green for CCTV / security, yellow for utility or non-corporate networks, purple for KVM / management. The colour is a fast visual cue; the unique identifier remains the authoritative label. The site agrees the scheme at design stage and documents it in the administration record.',
      'Only black is permitted.',
      'Colours are decorative and have no meaning.',
    ],
    correctAnswer: 1,
    explanation:
      'Colour conventions exist (blue voice, white data, red fire / safety, green CCTV / security, yellow utility, purple management) but TIA-606-D allows the site to agree its own scheme. The convention is documented in the administration record so the next contractor can read it. The unique identifier remains authoritative — colour is a supplementary visual cue.',
  },
  {
    id: 7,
    question:
      'What is the practical consequence of poor labelling discipline on a 100-link office cabling job?',
    options: [
      'No consequence — labels are decorative.',
      'Every fault investigation becomes a forensic exercise; every move / add / change risks disturbing the wrong link; the next contractor cannot plan a refresh without re-mapping the building first; the building owner cannot evidence administration discipline at FRA / insurance review. The 15-20 year life of the cabling collapses to "until the first fault" because nothing can be confidently changed without disturbing other links.',
      'Faster install.',
      'Lower cost.',
    ],
    correctAnswer: 1,
    explanation:
      'Labelling is the lifecycle-administration backbone of structured cabling. Without it, every fault becomes a manual trace; every move / add / change becomes a risk to other links; the cabling that was specified for 15-20 years effectively expires at the first significant fault. The TCO case for structured cabling (lifetime over many service refreshes) depends on labelling — it is not optional.',
  },
  {
    id: 8,
    question:
      'A handover documentation pack for a 100-link Cat6A office install should include what records?',
    options: [
      'A list of cable types.',
      '(a) The connection-records database listing every link by identifier with both end-terminations, cable type, length, current status; (b) as-built drawings showing pathways, outlet positions, TR / FD locations, basket / containment routes; (c) test results for every link (TIA-1152-A / BS EN 50346, including insertion loss, NEXT, return loss, propagation delay, DC resistance unbalance for PoE); (d) labelling-scheme key explaining the identifier format and any colour-coding conventions; (e) fire-stopping register linked to cable IDs (Module 4 Section 3).',
      'The product invoices.',
      'Photos only.',
    ],
    correctAnswer: 1,
    explanation:
      'TIA-606-D / BS EN 50174-1 §6 require all of these at handover. The connection-records database is the live administration system; as-built drawings are the spatial map; test results are the performance certification; the labelling-scheme key explains how to read the identifiers; the fire-stopping register links physical penetrations to cable IDs. Together they let the building owner / facilities team operate and maintain the cabling for its full life.',
  },
  {
    id: 9,
    question:
      'On a multi-floor building with multiple TRs per floor, how should the identifier hierarchy be structured?',
    options: [
      'Use only port numbers.',
      'Use a top-down hierarchy: site / campus (if multiple sites), building, floor, TR / FD, patch panel, port — concatenated with separators. Optional: prefix for service type or VLAN. Document the format in the administration record so future contractors read identifiers consistently. The hierarchy mirrors the structured-cabling six-zone topology — entrance facility, equipment room, backbone, TR, horizontal, work area.',
      'Use random IDs.',
      'Use the building floor plan numbers only.',
    ],
    correctAnswer: 1,
    explanation:
      'The hierarchy mirrors the structured-cabling topology. From the top: site / campus (rare on single-site jobs), building, floor, TR / FD, patch panel, port. On smaller jobs the top levels collapse — a single building drops the site / campus prefix. The format is documented in the administration record. Once agreed, every label in the building uses the same format — no exceptions.',
  },
  {
    id: 10,
    question:
      'A subsequent contractor is asked to add 4 cables to an existing patch panel and notices the existing labels are inconsistent — some hand-written, some pre-printed, some missing. What is the correct response?',
    options: [
      'Match the inconsistent style to fit in.',
      'Pause and discuss with the building owner / facilities team. Propose a re-label of the existing cables to a consistent scheme as part of the works, with updated administration record. Adding more cables without consistent labelling perpetuates the problem and degrades the cabling administration further. The cost of re-labelling at the same time is small; the cost of leaving the inconsistency is paid every time a subsequent fault investigation has to manually trace a link.',
      'Add the new cables without labelling.',
      'Refuse the work.',
    ],
    correctAnswer: 1,
    explanation:
      'Inconsistent labelling is a degraded administration system. Adding to it makes it worse. The competent response is to flag it and propose a re-label as part of the works, with updated records. Building owners / facilities teams generally appreciate the offer — re-labelling at the same time as planned works is a fraction of the cost of a separate re-labelling project. If the budget rejects it, document the constraint in the as-built record.',
  },
];

const faqs = [
  {
    question: 'Which standard takes precedence on a UK job — TIA-606-D or BS EN 50174-1 §6?',
    answer: (
      <>
        On a UK job, the harmonised European standard applies — BS EN 50174-1 §6. BS 7671
        §444.410(a) explicitly cites BS EN 50174-1 as the labelling / administration standard for
        control / signalling / communication circuits. TIA-606-D is North American / international
        and is widely referenced as the more detailed administration document — they are aligned in
        principle, with only minor differences. Many UK specifications cite both. The competent
        contractor reads both and applies the more specific where they differ.
      </>
    ),
  },
  {
    question:
      'Are paper labels acceptable, or do labels need to be plastic / engraved / laser-printed?',
    answer: (
      <>
        The label has to survive the 15-20 year cabling life. Hand-written paper labels do not —
        they fall off, fade, smudge, or get over-written. Acceptable durable formats: engraved metal
        / plastic plaques on patch panels, laser-printed adhesive labels in clear sleeves on cables,
        factory-pre-printed cable labels (where the label is part of the cable manufacture),
        thermal-transfer printed labels with appropriate adhesive. The format should be specified in
        the cabling spec; the contractor verifies durability before approving the install.
      </>
    ),
  },
  {
    question: 'Where exactly should labels go on a cable run — both ends only, or more frequently?',
    answer: (
      <>
        At minimum, both ends — at the patch-panel termination and at the work-area outlet
        termination. Some specs require additional labels at intermediate points: at consolidation
        points, at floor / wall penetrations, in long backbone runs. The specific positions are
        agreed at design stage. The principle: a contractor in 2040 should be able to identify any
        cable from any access point without disturbing other cables.
      </>
    ),
  },
  {
    question:
      'Is colour-coding required by any UK regulation, or is it purely contractor / facilities preference?',
    answer: (
      <>
        Colour-coding is optional under TIA-606-D and BS EN 50174-1 §6 — neither mandates a specific
        colour scheme. The site agrees a convention at design stage and documents it in the
        administration record. Common UK-friendly conventions: blue voice, white data, red fire /
        safety, green CCTV / security, yellow utility, purple KVM / management. The convention is
        supplementary to the unique identifier — colour is a visual cue; the identifier is the
        authoritative label.
      </>
    ),
  },
  {
    question: 'Who maintains the administration records over the cabling life?',
    answer: (
      <>
        The handover discipline: the contractor produces the records at practical completion; the
        building owner / facilities team owns them going forward. For every move / add / change, the
        contractor doing the work updates the records. The building owner is responsible for keeping
        them current — without that discipline, records decay over 2-3 years and the cabling becomes
        effectively unmaintainable. Many clients now use IT service-management platforms (CMDBs) or
        dedicated structured-cabling administration software to keep records live.
      </>
    ),
  },
  {
    question:
      'What is the difference between an identifier and a label, in TIA-606-D / BS EN 50174-1 §6 terms?',
    answer: (
      <>
        The identifier is the unique string (e.g. "B1-03-TRB-PP2-08") that names the link in the
        administration record. The label is the physical artefact (printed sticker, engraved plaque)
        that displays the identifier on the cable / outlet / patch panel. Same string, different
        roles. The records system contains identifiers; the building wears labels. Both have to be
        correct and consistent.
      </>
    ),
  },
];

const DataCablingModule4Section4 = () => {
  const navigate = useNavigate();

  useSEO(
    'ID Labelling Standards and Colour Codes | Data Cabling Module 4.4 | Elec-Mate',
    'Cable identification, labelling and colour codes for structured cabling — TIA-606-D administration; BS EN 50174-1 §6 administration / quality assurance; primary identifier hierarchy site / building / floor / TR / patch panel / port; cable label, outlet label, patch-panel port label; colour-coding conventions; every link, every port, every outlet uniquely identified.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4"
            title="ID Labelling Standards and Colour Codes"
            description="TIA-606-D (2021) administration and BS EN 50174-1 §6 — the identifier hierarchy that uniquely names every cable, outlet, patch panel and port across a structured-cabling system. Cable labels, outlet labels, patch-panel port labels, colour-coding conventions, and the records discipline that keeps the cabling administrable for its 15-20 year life. Every link uniquely identified — no exceptions."
            tone="yellow"
          />

          <TLDR
            points={[
              'The administration discipline is set by ANSI/TIA-606-D (2021) globally and BS EN 50174-1 §6 in Europe / UK. BS 7671 §444.410(a) explicitly cites BS EN 50174-1 as the standard to apply for control / signalling / communication circuits — bringing labelling formally into UK wiring-regs compliance.',
              'A hierarchical identifier names every link — site / campus / building / floor / TR / patch panel / port (e.g. "B1-03-TRB-PP2-08"). The same identifier appears on the cable both ends, on the outlet, on the patch-panel port, and in the connection-records database. Every link uniquely identified, end to end.',
              'Colour-coding is allowed as an optional supplement: blue voice, white data, red fire / safety, green CCTV / security, yellow utility, purple management — site agrees scheme at design stage and documents it. Colour is a visual cue; the unique identifier remains the authoritative label.',
              'Records at handover are the administration system: connection-records database, as-built drawings, test results, labelling-scheme key, fire-stopping register linked to cable IDs. Without records, the 15-20 year cabling life collapses to the first fault.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Cite ANSI/TIA-606-D (2021) and BS EN 50174-1 §6 as the parallel administration standards; explain how BS 7671 §444.410(a) brings the EN 50174-1 discipline into UK compliance',
              'Construct a hierarchical identifier scheme — site / campus / building / floor / TR / patch panel / port — appropriate to the project size and topology',
              'Apply identifiers consistently on cable labels, outlet labels and patch-panel port labels; specify durable label formats that survive 15-20 years',
              'Specify colour-coding conventions as an optional supplement to the identifier scheme — voice / data / safety / security / utility / management',
              'Produce a handover documentation pack at practical completion: connection-records database, as-built drawings, test results, labelling-scheme key, fire-stopping register',
              'Diagnose poor labelling on a retrofit job and propose corrective re-labelling as part of the works to restore administration discipline',
              'Operate the identifier scheme across moves, adds and changes — updating records consistently so administration does not decay',
              'Recognise that labelling and records are the lifecycle backbone of structured cabling — not decoration but the discipline that delivers the 15-20 year life',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The administration standards</ContentEyebrow>

          <ConceptBlock
            title="TIA-606-D (US / international) and BS EN 50174-1 §6 (UK / Europe) — same principle"
            plainEnglish="Cable identification and administration is governed by two parallel standards: ANSI/TIA-606-D (2021) — the Administration Standard for Telecommunications Infrastructure (North American / international); and BS EN 50174-1 §6 — the Administration / Quality Assurance section of the European cabling-installation standard. Both define the same principle: every cable, every outlet, every patch panel, every port has a unique identifier in a hierarchical scheme, recorded so the records survive personnel changes."
            onSite="On a UK 2026 job, BS EN 50174-1 §6 is the binding standard — cited from BS 7671 §444.410(a). TIA-606-D is the more detailed reference document. Many UK specifications cite both. The competent contractor reads BS EN 50174-1 §6 first, then layers TIA-606-D detail where the EN clause is silent or ambiguous."
          >
            <p>The labelling discipline, in the words of the standards:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>TIA-606-D (2021).</strong> Administration Standard for Telecommunications
                Infrastructure. Defines the identifier hierarchy, labelling format on cable / outlet
                / panel, the records the contractor must produce at handover, and the
                change-management discipline for moves / adds / changes. North American /
                international standard.
              </li>
              <li>
                <strong>BS EN 50174-1 §6.</strong> Administration / Quality Assurance section of BS
                EN 50174-1 (Information technology cabling installation: Specification and quality
                assurance). Aligned with TIA-606-D in principle. Cited from BS 7671 §444.410(a) as
                the standard to apply for control / signalling / communication circuits inside
                buildings. Binding on UK jobs from 15 April 2026.
              </li>
              <li>
                <strong>BS 7671 §444.410.</strong> The wiring-regs gateway. By citing BS EN 50174-1
                explicitly, BS 7671 brings the labelling / administration discipline of BS EN
                50174-1 §6 into the UK wiring-regs compliance envelope. On a UK 2026 cabling job,
                the framework is BS 7671 §444.410 + BS EN 50174-1 §6 + TIA-606-D for additional
                detail.
              </li>
            </ul>
            <p>
              The principle is the same across all three documents: every link uniquely identified,
              hierarchical scheme, durable labels, records at handover and ongoing maintenance.
              Without administration discipline, structured cabling reverts to ad-hoc cabling within
              2-3 years.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §444.410 (Inside buildings — verbatim, the labelling / admin gateway)"
            clause={
              <>
                Within a building, the requirements and recommendations of the following standards
                shall be applied for control, signalling and communication circuits:
                <br />
                (a) BS EN 50174-1: Information technology — Cabling installation: Installation
                specification and quality assurance;
                <br />
                (b) BS EN 50174-2: Information technology — Cabling installation: Installation
                planning and practices inside buildings;
                <br />
                (c) BS EN 50310: Telecommunications bonding networks for buildings and other
                structures.
              </>
            }
            meaning="§444.410 is the gateway clause that brings the BS EN 50174 / 50310 standard family into BS 7671 compliance. For labelling and administration specifically, BS EN 50174-1 (sub-clause §6) is the binding standard. TIA-606-D is the parallel international document and is widely referenced for additional detail. The wiring-regs hook is §444.410(a); the labelling / administration substance lives in BS EN 50174-1 §6."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The hierarchical identifier scheme</ContentEyebrow>

          <ConceptBlock
            title="Site / building / floor / TR / panel / port — every link uniquely named"
            plainEnglish="The identifier hierarchy nests from the building topology downward. At the top, site or campus (for multi-site projects). Then building, floor, telecoms room / floor distributor, patch panel, port. The result is a unique string for every link — written on the cable, on the outlet, on the patch panel port, and in the connection-records database. Anyone looking at any end of any link can identify it without disturbing other cables."
            onSite="Agree the format at design stage. The most common formats use dashes or full stops as separators: B1-04-TRA-PP3-12 (Building 1, Floor 04, Telecoms Room A, Patch Panel 3, Port 12). Document the format in the labelling-scheme key in the administration record. Once agreed, every label in the building uses the same format — no exceptions, no variants. Consistency is the whole value."
          >
            <p>The hierarchy levels, from top to bottom:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Site / campus.</strong> Multi-site organisations only. Drops on single-site
                jobs.
              </li>
              <li>
                <strong>Building.</strong> Within a campus or single-site, the building identifier —
                typically a number (B1, B2) or a name code (HQ, OPS, WH).
              </li>
              <li>
                <strong>Floor.</strong> Two-digit floor number (00 ground, 01, 02 ...). Some schemes
                use letters (B basement, G ground, L lower) — pick one and stay consistent.
              </li>
              <li>
                <strong>Telecoms Room (TR) / Floor Distributor (FD).</strong> Where multiple TRs
                exist on one floor, distinguish by letter (TRA, TRB) or compass position (TR-N,
                TR-S).
              </li>
              <li>
                <strong>Patch panel.</strong> Two-digit panel number within the TR (PP01, PP02 ...).
                Patch panels typically carry 24 or 48 ports.
              </li>
              <li>
                <strong>Port.</strong> Two-digit port number (01-24 or 01-48). Padding to two digits
                keeps the strings the same length and sorts correctly in the records database.
              </li>
            </ul>
            <p>
              Optional layers some schemes add: a service-type prefix (V for voice, D for data, S
              for safety) — though service-type is more often handled by colour-coding; a VLAN
              suffix for IP-segmented services; a physical-link versus channel distinction. Whatever
              variants are used, they go in the labelling-scheme key.
            </p>
          </ConceptBlock>

          {/* Identifier hierarchy diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Identifier hierarchy — every link uniquely named
            </h4>
            <svg
              viewBox="0 0 900 620"
              className="w-full h-auto"
              role="img"
              aria-label="Identifier hierarchy tree, drawn as five vertical tiers connected by short horizontal connectors. Tier 1 (top): Building B1. Tier 2: Floor 04. Tier 3: Telecoms Room TRA. Tier 4: Patch Panel PP3. Tier 5 (bottom): Port 12 (with sibling ports shown either side to illustrate the branching). The full identifier B1-04-TRA-PP3-12 is shown in a dedicated panel beside the tree. A bottom legend lists where the identifier appears on site and the governing standards."
            >
              {/* Header */}
              <text
                x="450"
                y="28"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                IDENTIFIER HIERARCHY — BUILDING → PORT
              </text>

              {/* Tier rows defined: each tier is one rect width 200 centred at x=350.
                  Tier y-centres: 70, 140, 210, 280, 350 (port row spans 3 ports) */}

              {/* ===== Tier 1: Building ===== */}
              <rect
                x="250"
                y="56"
                width="200"
                height="48"
                rx="8"
                fill="rgba(234,179,8,0.14)"
                stroke="#EAB308"
                strokeWidth="1.6"
              />
              <text
                x="350"
                y="78"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                BUILDING
              </text>
              <text
                x="350"
                y="96"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="11"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                B1
              </text>

              {/* Vertical connector down to tier 2 (no diagonals) */}
              <line x1="350" y1="104" x2="350" y2="126" stroke="#EAB308" strokeWidth="1.4" />

              {/* ===== Tier 2: Floor ===== */}
              <rect
                x="250"
                y="126"
                width="200"
                height="48"
                rx="8"
                fill="rgba(34,211,238,0.14)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="350"
                y="148"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                FLOOR
              </text>
              <text
                x="350"
                y="166"
                textAnchor="middle"
                fill="#CFFAFE"
                fontSize="11"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                04
              </text>

              <line x1="350" y1="174" x2="350" y2="196" stroke="#22D3EE" strokeWidth="1.4" />

              {/* ===== Tier 3: Telecoms Room ===== */}
              <rect
                x="250"
                y="196"
                width="200"
                height="48"
                rx="8"
                fill="rgba(34,197,94,0.14)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text
                x="350"
                y="218"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                TELECOMS ROOM
              </text>
              <text
                x="350"
                y="236"
                textAnchor="middle"
                fill="#DCFCE7"
                fontSize="11"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                TRA
              </text>

              <line x1="350" y1="244" x2="350" y2="266" stroke="#22C55E" strokeWidth="1.4" />

              {/* ===== Tier 4: Patch Panel ===== */}
              <rect
                x="250"
                y="266"
                width="200"
                height="48"
                rx="8"
                fill="rgba(252,211,77,0.18)"
                stroke="#FACC15"
                strokeWidth="1.6"
              />
              <text
                x="350"
                y="288"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PATCH PANEL
              </text>
              <text
                x="350"
                y="306"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="11"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                PP3
              </text>

              {/* Vertical connector to horizontal sibling-bar */}
              <line x1="350" y1="314" x2="350" y2="334" stroke="#FACC15" strokeWidth="1.4" />
              {/* Horizontal sibling bar — connects 3 ports beneath */}
              <line x1="170" y1="334" x2="530" y2="334" stroke="#FACC15" strokeWidth="1.4" />
              {/* Vertical drops down to each port */}
              <line x1="170" y1="334" x2="170" y2="356" stroke="#FACC15" strokeWidth="1.4" />
              <line x1="350" y1="334" x2="350" y2="356" stroke="#FACC15" strokeWidth="1.4" />
              <line x1="530" y1="334" x2="530" y2="356" stroke="#FACC15" strokeWidth="1.4" />

              {/* ===== Tier 5: Ports — three sibling examples ===== */}
              {/* Port 11 (sibling, left) */}
              <rect
                x="100"
                y="356"
                width="140"
                height="48"
                rx="8"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.4"
                strokeDasharray="3 3"
              />
              <text
                x="170"
                y="378"
                textAnchor="middle"
                fill="#FECACA"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PORT
              </text>
              <text
                x="170"
                y="396"
                textAnchor="middle"
                fill="#FEE2E2"
                fontSize="11"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                11
              </text>

              {/* Port 12 (highlighted) */}
              <rect
                x="280"
                y="356"
                width="140"
                height="48"
                rx="8"
                fill="rgba(239,68,68,0.20)"
                stroke="#EF4444"
                strokeWidth="2"
              />
              <text
                x="350"
                y="378"
                textAnchor="middle"
                fill="#FECACA"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PORT
              </text>
              <text
                x="350"
                y="396"
                textAnchor="middle"
                fill="#FEE2E2"
                fontSize="11"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                12
              </text>

              {/* Port 13 (sibling, right) */}
              <rect
                x="460"
                y="356"
                width="140"
                height="48"
                rx="8"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.4"
                strokeDasharray="3 3"
              />
              <text
                x="530"
                y="378"
                textAnchor="middle"
                fill="#FECACA"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PORT
              </text>
              <text
                x="530"
                y="396"
                textAnchor="middle"
                fill="#FEE2E2"
                fontSize="11"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                13
              </text>

              {/* ===== Right-side panel: Worked example identifier ===== */}
              <rect
                x="640"
                y="120"
                width="220"
                height="160"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="750"
                y="146"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                WORKED EXAMPLE
              </text>
              <text
                x="750"
                y="180"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="14"
                fontWeight="700"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              >
                B1-04-TRA-PP3-12
              </text>
              <text
                x="750"
                y="208"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Building 1 · Floor 04
              </text>
              <text
                x="750"
                y="226"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Telecoms Room A
              </text>
              <text
                x="750"
                y="244"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Patch Panel 3 · Port 12
              </text>
              <text
                x="750"
                y="270"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                same string used everywhere
              </text>

              {/* ===== Right-side panel: Appears on ===== */}
              <rect
                x="640"
                y="296"
                width="220"
                height="138"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="750"
                y="320"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                APPEARS ON
              </text>
              <text x="660" y="342" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                → Cable label (both ends)
              </text>
              <text x="660" y="360" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                → Work-area outlet faceplate
              </text>
              <text x="660" y="378" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                → Patch panel port label
              </text>
              <text x="660" y="396" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                → Connection-records DB
              </text>
              <text x="660" y="414" fill="#E5E7EB" fontSize="10" fontFamily="system-ui">
                → As-built drawings
              </text>

              {/* ===== Bottom legend panel ===== */}
              <rect
                x="40"
                y="450"
                width="820"
                height="148"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="476"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                LEGEND
              </text>

              {/* Tier colour swatches with names */}
              <rect
                x="60"
                y="492"
                width="14"
                height="14"
                rx="3"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="1.4"
              />
              <text x="84" y="504" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Building tier
              </text>

              <rect
                x="220"
                y="492"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,211,238,0.18)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text x="244" y="504" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Floor tier
              </text>

              <rect
                x="360"
                y="492"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text x="384" y="504" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Telecoms Room tier
              </text>

              <rect
                x="540"
                y="492"
                width="14"
                height="14"
                rx="3"
                fill="rgba(252,211,77,0.22)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />
              <text x="564" y="504" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Patch Panel tier
              </text>

              <rect
                x="700"
                y="492"
                width="14"
                height="14"
                rx="3"
                fill="rgba(239,68,68,0.20)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text x="724" y="504" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Port tier
              </text>

              {/* Standards footer */}
              <line
                x1="60"
                y1="524"
                x2="840"
                y2="524"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <text
                x="450"
                y="546"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                ANSI/TIA-606-D (2021) · BS EN 50174-1 §6
              </text>
              <text
                x="450"
                y="566"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Every link uniquely identified · same string everywhere · records at handover
              </text>
              <text
                x="450"
                y="586"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                Cited from BS 7671 §444.410(a) — binding on UK jobs from 15 April 2026
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Colour-coding conventions</ContentEyebrow>

          <ConceptBlock
            title="Optional supplement to identifiers — site agrees the scheme"
            plainEnglish="Colour-coding distinguishes service types or pathways at a glance — voice / data / safety / security / utility / management. TIA-606-D and BS EN 50174-1 §6 both allow colour-coding as an OPTIONAL supplement to the unique identifier scheme; neither mandates a specific colour-to-service mapping. The site agrees a convention at design stage and documents it in the administration record. Once agreed, every patch lead, cable boot and label in the building uses the same convention."
            onSite="Walk into a comms room with consistent colour-coding and you can scan service types in seconds — blue patch leads going to voice, white to data, red to fire alarm, green to CCTV, yellow to utility, purple to management. Walk into a comms room with no colour-coding and every patch lead is the same off-the-shelf grey — every service question becomes a label-read exercise. Colour is a low-cost, high-value visual layer over the identifier scheme."
          >
            <p>The colour-coding conventions commonly used in UK / European installations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Blue — voice / IP telephony.</strong> The traditional voice colour across
                most schemes.
              </li>
              <li>
                <strong>White or grey — data / general-purpose Ethernet.</strong> The default data
                colour. White stands out on coloured patch panels.
              </li>
              <li>
                <strong>Red — fire alarm / life-safety / emergency systems.</strong> Reserved for
                safety-critical services. Visually distinctive — never used for non-safety.
              </li>
              <li>
                <strong>Green — CCTV / security / access control.</strong> Common security colour.
                Some sites also use yellow / black combinations.
              </li>
              <li>
                <strong>Yellow — utility / non-corporate / guest networks.</strong> Visitor Wi-Fi
                backhaul, guest VLANs, building services that aren\u2019t corporate IT.
              </li>
              <li>
                <strong>Purple — KVM / management / out-of-band administration.</strong> Less
                universal but common in data-centre and large-comms-room environments.
              </li>
            </ul>
            <p>
              The colour is a fast visual cue. The unique identifier remains the authoritative label
              — colour without identifier is decoration; identifier without colour is compliant but
              slower to read. The combination is the fully-administered system.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Common colour-coding conventions for UK structured cabling"
            source="2026 — TIA-606-D / BS EN 50174-1 §6 alignment"
            headers={['Colour', 'Service / use', 'Notes']}
            rows={[
              ['Blue', 'Voice / IP telephony', 'Traditional voice colour'],
              ['White / grey', 'Data / general-purpose Ethernet', 'Default for corporate data'],
              [
                'Red',
                'Fire alarm / life-safety / emergency',
                'Reserved — never reuse for non-safety',
              ],
              ['Green', 'CCTV / security / access control', 'Some sites use yellow / black'],
              [
                'Yellow',
                'Utility / non-corporate / guest networks',
                'Guest Wi-Fi backhaul, building services',
              ],
              [
                'Purple',
                'KVM / management / out-of-band',
                'Common in data centres / large comms rooms',
              ],
              ['Orange', 'Demarcation / carrier circuits', 'Carrier handoff at entrance facility'],
              ['Black', 'Hardware loopback / test', 'Site-specific'],
            ]}
            notes="Conventions are site-agreed at design stage and documented in the administration record. The colour is a visual cue; the unique identifier remains the authoritative label. Never use red for non-safety services — the safety reservation is universal."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Records discipline — the lifecycle backbone</ContentEyebrow>

          <ConceptBlock
            title="Connection records, as-built drawings, test results — the handover pack"
            plainEnglish="The labelling discipline is only as strong as the records that back it. TIA-606-D and BS EN 50174-1 §6 both require the contractor to produce a documentation pack at handover — the connection-records database, as-built drawings, test results, labelling-scheme key, fire-stopping register. The pack is the asset the building owner / facilities team operates the cabling against for its 15-20 year life."
            onSite="Build the pack as the work progresses, not at the end. The connection-records database is populated as cables are pulled and terminated. As-built drawings are marked up daily. Test results are filed link-by-link as channel testing progresses. The fire-stopping register grows as penetrations are sealed (Module 4 Section 3). At practical completion, the pack is comprehensive, internally consistent, and ready to hand over. A pack assembled at the end of a job is always incomplete; a pack built during the job is always usable."
          >
            <p>The contents of a complete administration pack:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Connection-records database.</strong> Every link by identifier, with both
                end-terminations (work-area outlet location + patch-panel port), cable type (Cat5e /
                Cat6 / Cat6A / fibre type), length, current status (active / spare / faulty). Often
                a CMDB or dedicated structured-cabling administration tool. Updated for every move /
                add / change.
              </li>
              <li>
                <strong>As-built drawings.</strong> Building floor plans showing pathways (basket /
                tray / conduit routes), outlet positions, TR / FD locations, penetration positions.
                Updated to match the actual install. Spatial map that supports planning future work.
              </li>
              <li>
                <strong>Test results.</strong> Channel test results for every link, to TIA-1152-A /
                BS EN 50346 — insertion loss, NEXT, return loss, propagation delay, DC resistance
                unbalance for PoE, fibre OTDR / loss measurements as applicable. Filed by identifier
                so any link\u2019s test history is retrievable.
              </li>
              <li>
                <strong>Labelling-scheme key.</strong> The format of the identifier hierarchy in
                use, with worked examples, and the colour-coding convention if any. Lets a
                contractor in 2040 read the labels without prior briefing.
              </li>
              <li>
                <strong>Fire-stopping register.</strong> Every penetration created during the work,
                with location / wall rating / cable IDs / seal product / classification reference /
                install date / installer / photos before / during / after. Required by RRO 2005
                (Module 4 Section 3).
              </li>
            </ul>
            <p>
              The pack is the deliverable. A cabling job without it is incomplete — even if every
              cable is perfectly installed and tested. The pack is what lets the building owner
              operate, maintain, modify and document the cabling for its full life.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Hand-written sticky labels that fall off in 6 months"
            whatHappens={
              <>
                A small office cabling job, completed under time pressure. Installer uses
                hand-written paper labels with a permanent marker, stuck on with sticky-tape. Six
                months later, half the labels have fallen off; the rest have faded to the point of
                being unreadable. The next contractor doing a fault investigation has to manually
                trace each cable end-to-end. The administration record — if one was ever created —
                is no longer in sync with the physical cabling. The cabling is effectively
                unlabelled.
              </>
            }
            doInstead={
              <>
                Specify durable label formats at tender / design stage: laser-printed adhesive
                labels in clear protective sleeves, factory-pre-printed cable labels (where the
                label is part of the cable manufacture), engraved plastic / metal plaques for patch
                panels and outlet faceplates. Use a label printer with thermal-transfer ribbon for
                outlet labels. The cost is small; the lifecycle value is enormous. Specify "label
                format" alongside "cable type" in the tender — make it non-optional. Verify
                durability before approving the install.
              </>
            }
          />

          <Scenario
            title="A building owner asks you to re-label a 5-year-old cabling system that has lost its identifier scheme"
            situation={
              <>
                A building owner has inherited a 5-year-old Cat6A office cabling system from a
                previous tenant. The original administration records are missing. Some cables are
                labelled with an inconsistent mix of hand-written, pre-printed and stick-on labels,
                and many are unreadable. The owner asks you to "re-label the whole system" so the
                cabling is administrable again.
              </>
            }
            whatToDo={
              <>
                A multi-step exercise: (1) survey the building — walk every TR, every patch panel,
                every outlet; identify what is in place and what state it is in; (2) build a fresh
                identifier scheme to TIA-606-D / BS EN 50174-1 §6, mapping building / floor / TR /
                patch panel / port appropriately to the actual topology; (3) trace every link from
                end to end (using a tone generator and wand on every patch-panel port — this is the
                longest part); (4) re-label every cable, outlet and patch-panel port to the new
                scheme using durable labels; (5) build the connection-records database fresh, with
                current termination state for every link; (6) produce as-built drawings if none
                exist; (7) channel- test every link to TIA-1152-A / BS EN 50346 to confirm
                performance; (8) hand over the pack. Document any links that cannot be traced as
                "spares pending verification". Cost the work realistically — this is a meaningful
                project, not a quick re-label.
              </>
            }
            whyItMatters={
              <>
                A cabling system without administration is functionally unmanaged. The owner cannot
                make moves / adds / changes without manual tracing each time; cannot evidence
                compartmentation at FRA / insurance review (the fire-stopping register is missing
                alongside the connection records); cannot confidently expand the system. The
                re-label exercise restores the cabling to its full structured- cabling value. It is
                one of the highest-leverage interventions in cabling lifecycle management.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'TIA-606-D (2021) and BS EN 50174-1 §6 are the parallel administration standards. BS 7671 §444.410(a) explicitly cites BS EN 50174-1 — bringing the labelling / administration discipline into UK wiring-regs compliance.',
              'Hierarchical identifier: site / campus / building / floor / TR / patch panel / port. Same identifier on the cable both ends, on the outlet, on the patch-panel port, in the connection-records database. Every link uniquely named.',
              'Colour-coding is optional but valuable. Common UK conventions: blue voice, white data, red fire / safety, green CCTV / security, yellow utility, purple management. Site-agreed at design stage; documented in the labelling-scheme key.',
              'Durable labels only — laser-printed adhesive, factory-pre-printed, engraved plaques. Hand-written paper labels are NOT compliant; they fall off / fade / get over-written. Specify label format at tender stage.',
              'The handover pack is the deliverable: connection-records database, as-built drawings, test results, labelling-scheme key, fire-stopping register. Build it as the job progresses, not at the end. The pack is what lets the cabling deliver its 15-20 year life.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-4-section-3')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: Fire-Stopping
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-4-section-5')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Rack and Patch Panel Organisation
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule4Section4;
