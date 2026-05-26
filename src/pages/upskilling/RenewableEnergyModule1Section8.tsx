import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
  DiagramPlaceholder,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm1s8-part6-restructure',
    question:
      'A4:2026 made a substantial structural change to Part 6 (Inspection and Testing). What was it — and what is the underlying CENELEC alignment story?',
    options: [
      'Deleted Part 6 entirely',
      'Part 6 has been further restructured and renumbered in A4:2026. The underlying CENELEC alignment is older — HD 60364-6 was introduced in 2016, causing the initial Part 6 alignment (chapters 61–63 unused, Part 6 starting at Chapter 64). A4:2026 is the latest tranche of the same alignment',
      'Renamed Part 6 to Part 9',
      'Moved Part 6 to an appendix',
    ],
    correctIndex: 1,
    explanation:
      'The CENELEC alignment is not new in A4:2026. HD 60364-6 (the CENELEC harmonisation document for inspection and testing) was introduced in 2016, and BS 7671 Part 6 first aligned with it at that point — which is why chapters 61–63 are not used and Part 6 starts at Chapter 64. A4:2026 has further restructured and renumbered Part 6 as the latest tranche of the same alignment. The technical content is largely preserved across the restructure; the apparatus around it tracks the HD.',
  },
  {
    id: 'm1s8-appendix-6-changes',
    question:
      'Appendix 6 of BS 7671:2018+A4:2026 contains what?',
    options: [
      'A complete rewrite of the regulations',
      'Model forms for initial certification (EIC and MEIWC), minor changes to the certificates in A4, changes to the inspections for new installation work in domestic and similar premises with up to 100 A supply, and examples of items requiring inspection for an EICR',
      'Energy efficiency calculations only',
      'Equipment selection criteria only',
    ],
    correctIndex: 1,
    explanation:
      'Appendix 6 is the home of the BS 7671 model forms — the EIC (Electrical Installation Certificate) for new installations, additions and alterations, and the MEIWC (Minor Electrical Installation Works Certificate). A4 brought minor changes to the certificates, updated inspection items for new installation work in domestic and similar premises (with up to 100 A supply), and updated the EICR inspection examples.',
  },
  {
    id: 'm1s8-eic-vs-meiwc',
    question:
      'What is the practical difference between the EIC and the MEIWC?',
    options: [
      'They are interchangeable',
      'EIC (Electrical Installation Certificate) covers new installation, addition or alteration involving new circuits. MEIWC (Minor Electrical Installation Works Certificate) covers work on existing circuits that does not include provision of a new circuit. Most LCT installs require the EIC because they involve dedicated new circuits',
      'EIC is for commercial work only',
      'MEIWC is for design only',
    ],
    correctIndex: 1,
    explanation:
      'The EIC and MEIWC have distinct scopes. EIC for new installations, additions or alterations involving new circuits. MEIWC for work on existing circuits with no new circuit added. Most LCT installs include dedicated new circuits (dedicated EV circuit per Section 722, dedicated PV / BESS / heat pump circuits) — meaning the EIC is the appropriate cert. A pure swap-out (replacing one chargepoint with another on an existing dedicated circuit) might be MEIWC; the typical full install is EIC.',
  },
  {
    id: 'm1s8-departure-register',
    question:
      'On the EIC, where do departures from BS 7671 get recorded?',
    options: [
      'In an email to the customer',
      'In the "Departures from BS 7671" section of the EIC — describing the departure, the alternative measure adopted, and the equivalent-safety reasoning under Reg 120.3',
      'On a separate document never shared',
      'Verbally with the customer',
    ],
    correctIndex: 1,
    explanation:
      'The EIC has a specific section for recording departures. Reg 120.3 permits departures from BS 7671 where the resulting installation is at least as safe as compliance with the regulations. The departure register on the EIC records the departure itself, the alternative measure adopted, and the equivalent-safety reasoning. Without all three on the cert, the departure is not a Reg 120.3 departure — it is documented non-compliance.',
  },
  {
    id: 'm1s8-eicr-purpose',
    question:
      'What is an EICR for, and what does it produce?',
    options: [
      'An EICR is a sales document',
      'An EICR (Electrical Installation Condition Report) is the formal inspection report on an existing electrical installation, identifying observations and assigning condition codes (C1, C2, C3, FI) that drive remedial work prioritisation. EICRs are produced on periodic inspection and on change of occupancy / sale',
      'An EICR is a Building Control form',
      'An EICR replaces the EIC',
    ],
    correctIndex: 1,
    explanation:
      'The EICR is the formal condition report on an existing installation. The inspector identifies observations and assigns codes: C1 (danger present, immediate action), C2 (potentially dangerous, urgent remedial work), C3 (improvement recommended, no immediate danger), FI (further investigation required). On LCT installs the EICR captures the post-A4 reading of pre-A4 designs — particularly relevant where the regulatory floor has moved (e.g. PEN-fault on PME EV).',
  },
  {
    id: 'm1s8-133-1-3-recording',
    question:
      'A4:2026 Reg 133.1.3 changed the equipment-selection regime. What does it now require?',
    options: [
      'No change',
      'Certain usage of equipment shall be recorded on the appropriate electrical certification specified in Part 6 — embedding equipment-selection disclosures within the formal certification process. Where BS 7671 calls for the usage of particular equipment to be identified, that usage is now entered on the cert',
      'All equipment must be MCS-listed',
      'Equipment usage must be photographed',
    ],
    correctIndex: 1,
    explanation:
      'A4 modified Reg 133.1.3 to require certain equipment-usage decisions to be recorded on the appropriate Part 6 cert. This is the recordkeeping trajectory — making the cert the durable audit trail for design-time decisions that previously lived only in the design office. The applicability is limited to certain usages identified by BS 7671, not a blanket requirement for all equipment.',
  },
  {
    id: 'm1s8-cert-bundle',
    question:
      'On an MCS-funded hybrid LCT install in an English dwelling, what is the complete cert evidence bundle?',
    options: [
      'EIC only',
      'BS 7671 EIC + CPS Part P notification reference + DNO G98/G99 notification reference + MCS certificate(s) for each MIS / MPS combination + manufacturer commissioning evidence + survey artefact + customer handover pack + any departure register entries',
      'MCS certificate only',
      'A receipt from the customer',
    ],
    correctIndex: 1,
    explanation:
      'The cert evidence bundle on a funded hybrid install is layered. The EIC is the BS 7671 cert. The CPS reference is the Part P notification. The DNO reference is the parallel-generation notification. The MCS certificates are the funded-market evidence (installer + product). The manufacturer evidence is the equipment-specific competence. The survey artefact is the project-plan record. The customer handover pack is the consumer-facing documentation. The departure register catches anything that deviates from BS 7671.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A4:2026 restructured Part 6 (Inspection and Testing) and renumbered the regulations to align with the CENELEC standard. Practical implication for the installer who has been using BS 7671 for years:',
    options: [
      'No change — Part 6 numbering is irrelevant',
      'Update working references — the regulation numbers in Part 6 have changed substantially, and pre-A4 numbers should not be cited on a 2026+ cert. The technical content of Part 6 is largely preserved; the cross-references and numbering are renumbered',
      'Part 6 has been deleted',
      'Part 6 is now optional',
    ],
    correctAnswer: 1,
    explanation:
      'Part 6 was completely restructured in A4 to align with CENELEC. Practitioners referring to specific Part 6 regulations on a 2026+ cert must use the A4-aligned numbering. Pre-A4 regulation cites are an audit finding. The technical content (inspection sequence, test methodology, model form structure) is largely preserved; the numbering and cross-referencing apparatus is new.',
  },
  {
    id: 2,
    question:
      'A4:2026 Reg 133.1.3 requires certain equipment-usage decisions to be recorded on Part 6 certs. For an LCT install, what kind of decisions are likely to fall under this requirement?',
    options: [
      'All equipment purchase decisions',
      'Decisions where BS 7671 calls for the usage of particular equipment to be identified — e.g. the specific PEN-fault protective measure chosen on a PME EV install (per 722.411.4.1), the bidirectional protective device specified per 551.7.1(c), the specific protective devices on a BESS interface',
      'Customer\'s choice of paint colour',
      'No decisions',
    ],
    correctAnswer: 1,
    explanation:
      'The 133.1.3 recording requirement applies to certain usages of equipment that BS 7671 identifies as needing documentation. On LCT installs, this includes the PEN-fault protective measure chosen on PME EV chargepoints, the bidirectional protective device under 551.7.1(c), the protective device specifications on the BESS interface, and similar design choices. The recording lands on the appropriate Part 6 cert; the next inspector reads the design intent rather than infers it.',
  },
  {
    id: 3,
    question:
      'A customer in 2031 calls for an EICR on a 2026-installed hybrid PV+BESS+EV install. The cert is in their possession; the original installer is no longer trading. What is the most useful artefact in the cert bundle to the new inspector?',
    options: [
      'The customer\'s satisfaction rating',
      'The original EIC including the equipment-usage records under Reg 133.1.3 (the PEN-fault protective measure chosen, the bidirectional protective device specified, the BESS protection arrangements) and any departure register entries — letting the inspector read the design intent rather than infer it',
      'The MCS marketing brochure',
      'The customer\'s electricity bill',
    ],
    correctAnswer: 1,
    explanation:
      'The original EIC with the A4 recordkeeping disciplines (133.1.3 equipment usage, departure register, 551.7.1(c) bidirectional protective device documentation) is the durable design audit trail. The next inspector reads the intent — what was specified, why, against which edition of BS 7671. Without the audit trail the inspector must infer the design, which often leads to over-coding (treating safe but undocumented choices as defects) or under-coding (missing departures that were genuine).',
  },
  {
    id: 4,
    question:
      'A hybrid PV + BESS + EV install completes. The installer\'s post-install workflow includes which notifications?',
    options: [
      'Just the customer',
      'CPS notification under Part P (within 30 days), DNO notification under EREC G98 or G99 (G98 within 28 days of energisation, G99 typically pre-energisation per the application approval), MCS certificate registration for each MIS / MPS combination, customer\'s SEG application via their electricity supplier, BUS / ECO application as applicable',
      'Just HMRC',
      'No notifications',
    ],
    correctAnswer: 1,
    explanation:
      'A typical hybrid LCT install triggers multiple notifications in parallel. Part P via CPS within 30 days. DNO via EREC G98 within 28 days of energisation, or G99 per application approval timing. MCS certificate registration for each MIS / MPS combination. Customer\'s SEG application via the licensed electricity supplier (the supplier asks for the MCS cert + DNO notification reference). BUS / ECO applications where the customer is claiming the funding. The post-install workflow is itself a project management exercise.',
  },
  {
    id: 5,
    question:
      'On the EIC, the "Departures from BS 7671" section is empty. The installer applied a Reg 120.3 departure during the install (e.g. a non-standard cable route to preserve a feature wall) but didn\'t record it. What is the legal position of the departure?',
    options: [
      'It\'s still a Reg 120.3 departure if the install is safe',
      'It is not a Reg 120.3 departure — Reg 120.3 explicitly requires the departure to be recorded on the appropriate Part 6 certification. An unrecorded departure is documented non-compliance, not a permitted departure. EAWR Reg 4 exposure follows',
      'It depends on what the customer thinks',
      'Departures are never recorded',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 120.3 is a recording-conditional permission. Departures from BS 7671 are permitted where the alternative measure delivers at least equivalent safety AND the departure is recorded on the appropriate Part 6 certification. An unrecorded departure fails the recording test — it is non-compliance with documentation, not a protected Reg 120.3 departure. EAWR Reg 4 (the absolute statutory duty) bites on the underlying installation; the missing record removes the BS 7671 defence.',
  },
  {
    id: 6,
    question:
      'An EICR observation flags a 2024-vintage EV chargepoint on a PME supply with no PEN-fault protective measure. Pre-A4 the observation was C3 (informational, "reasonably practicable" exception applied). On a 2026 install the same observation would most likely be:',
    options: [
      'Still C3',
      'C2 — potentially dangerous, urgent remedial work. The deletion of the "reasonably practicable" exception in A4 Reg 722.411.4.1 makes the omission a contravention of the current requirements with potential danger. The EICR coding reflects the change in regulatory floor',
      'No observation',
      'C1',
    ],
    correctAnswer: 1,
    explanation:
      'EICR codes are assessed against current safety. The 2024 install was lawful under A2:2022 with the "reasonably practicable" exception applied. A4:2026 deleted the exception. On a 2026 install with no PEN-fault measure, the absence is non-compliance against current standards with potential danger — typically C2. Existing pre-A4 installs may be C3 with the recommendation to upgrade to the current standard, depending on the inspector\'s judgement and the specific risk picture.',
  },
  {
    id: 7,
    question:
      'A customer asks why they need an MCS certificate AND an EIC. The right professional explanation:',
    options: [
      'They are the same thing',
      'They evidence different things. The EIC evidences the BS 7671-side electrical safety and compliance of the install. The MCS certificate evidences the LCT-scheme conformity (installer competence per MIS, product conformity per MPS). The two together form the funded-market evidence; either alone is incomplete',
      'Only one is needed',
      'MCS replaces the EIC',
    ],
    correctAnswer: 1,
    explanation:
      'The EIC and the MCS certificate evidence different competence layers. EIC: BS 7671 compliance, the regulatory floor. MCS: LCT-scheme conformity — installer technical competence per MIS, product conformity per MPS, funded-market eligibility. Both are needed on a funded install. The licensed electricity supplier (SEG), the BUS administrator, and the ECO obligated supplier all expect to see both — the EIC for the underlying compliance and the MCS for the scheme-specific competence.',
  },
  {
    id: 8,
    question:
      'The cert evidence bundle on an LCT install carries records that may be checked by which parties over the install\'s lifetime?',
    options: [
      'Only the customer',
      'PI insurers at renewal, MCS auditors at scheme audit, EICR inspectors at periodic inspection, HSE in the event of an EAWR investigation, the customer at sale of the property, the next contractor on subsequent additions / alterations — multiple parties over a 25+ year lifespan',
      'No-one',
      'Only Building Control',
    ],
    correctAnswer: 1,
    explanation:
      'The cert evidence bundle has a long downstream lifetime. PI insurers at every renewal cycle. MCS auditors at scheme audit visits. EICR inspectors every 5–10 years depending on the property type. HSE in the event of an EAWR investigation. The customer at sale (the bundle becomes part of the conveyancing pack). The next contractor when additions or alterations are made. Building the bundle properly at install is a 25+ year investment, not a one-time paperwork chore.',
  },
];

const faqs = [
  {
    question:
      'How is Part 6 restructured in A4:2026 — should I throw out my old notes?',
    answer:
      'Part 6 (Inspection and Testing) has been completely restructured and renumbered in A4:2026 to align with the CENELEC standard for inspection and testing. The technical content (inspection sequence, test methodology, model form structure) is largely preserved; the regulation numbers and cross-references change substantially. Old notes that cite specific pre-A4 regulation numbers should be updated. The test methodology you already know remains applicable; the citations move.',
  },
  {
    question:
      'What changed in Appendix 6 for A4:2026?',
    answer:
      'Appendix 6 includes minor changes to the certificates (EIC and MEIWC), changes to the inspections for new installation work in domestic and similar premises with up to 100 A supply, and updated examples of items requiring inspection for an EICR. Most installers will find the certs broadly familiar; the new inspection items for new domestic installs are the more substantive change to operationalise.',
  },
  {
    question:
      'When should I use EIC vs MEIWC for LCT work?',
    answer:
      'EIC (Electrical Installation Certificate) for new installation, addition or alteration involving new circuits. MEIWC (Minor Electrical Installation Works Certificate) for work on existing circuits where no new circuit is added. Most LCT installs involve dedicated new circuits — a dedicated EV circuit (Section 722), a dedicated PV / BESS / heat pump circuit. The EIC is the standard cert for LCT installs. A pure like-for-like swap (replacing one chargepoint with another on an existing dedicated circuit) might be MEIWC; the typical full install is EIC.',
  },
  {
    question:
      'What goes in the "Departures from BS 7671" section of the EIC?',
    answer:
      'Three items per departure: (1) The departure itself — name the regulation departed from and describe what was done differently. (2) The alternative measure adopted — describe the technical alternative. (3) The equivalent-safety reasoning under Reg 120.3 — explain how the alternative delivers at least equivalent safety to the regulation departed from. Without all three, the departure is non-compliance rather than a protected Reg 120.3 departure. Sign-off by the designer with PI cover.',
  },
  {
    question:
      'On a hybrid LCT install, how many notifications am I actually making?',
    answer:
      'Typically five to seven, depending on scope. (1) Part P notification via CPS (within 30 days). (2) DNO notification via EREC G98 (within 28 days) or G99 (per application approval timing). (3) MCS certificate registration for each MIS / MPS combination. (4) Customer\'s SEG application via the licensed electricity supplier. (5) BUS application where the heat pump is BUS-eligible. (6) ECO4 / GBIS application where applicable. (7) Listed-building consent / planning permission completion notification where applicable. The post-install workflow is itself a meaningful project management exercise.',
  },
  {
    question:
      'How long should I keep the cert evidence bundle?',
    answer:
      'For the practical lifetime of the install. PI insurers expect retention through the policy run-off period (typically 6 years after the policy ends). The Limitation Act 1980 sets the civil claims period at 6 years from the date of damage (longer for some PI claims). MCS audit and EICR inspection cycles run for the install\'s operational life. Practical retention: keep the bundle for the working life of the installation, and beyond if any claim is open. Electronic retention with off-site backup is the standard practice.',
  },
  {
    question:
      'Are model forms in Appendix 6 the same as MCS-required documentation?',
    answer:
      'Different. The BS 7671 Appendix 6 model forms (EIC, MEIWC, EICR) are the regulatory-compliance documents under BS 7671 / Building Regulations. The MCS scheme requires its own documentation per MIS (design pack, customer handover pack, commissioning record). The two sets of documentation are complementary, not duplicative — both are needed on an MCS-funded LCT install. The EIC evidences BS 7671 compliance; the MCS documentation evidences scheme conformity.',
  },
  {
    question:
      'What\'s the relationship between Reg 133.1.3 (equipment usage recording) and the existing EIC?',
    answer:
      'A4 directs the equipment-usage record to the appropriate Part 6 cert — typically the EIC for a new install. The record is entered in the relevant section of the cert (existing certs have space for the entry; new editions of the form post-A4 may have explicit prompts). The record is clear and traceable to the circuit, location, or protective measure involved. For LCT this is where the PEN-fault protective measure choice, the bidirectional protective device specification, and similar A4-affected design decisions get recorded.',
  },
  {
    question:
      'How should I structure the customer handover pack so it survives a 25-year install lifespan?',
    answer:
      'Six items minimum. (1) The BS 7671 EIC (with the departure register and 133.1.3 records). (2) The MCS certificate(s) where applicable. (3) The DNO notification reference. (4) The CPS Part P notification reference. (5) The manufacturer documentation for each major piece of equipment (inverter, BESS, chargepoint, heat pump unit). (6) A maintenance and inspection schedule, including the next periodic inspection due date and any equipment-specific service intervals. Provide the pack in both paper and electronic form; many customers lose paper packs over the install\'s lifetime, and an electronic copy is the long-term backup.',
  },
];

export default function RenewableEnergyModule1Section8() {
  const navigate = useNavigate();

  useSEO({
    title:
      'Notifications, certs & the paperwork trail | Renewable Energy 1.8 | Elec-Mate',
    description:
      'The complete cert evidence bundle for an LCT install — BS 7671 EIC and Part 6 model forms (restructured in A4), CPS Part P notification, DNO G98/G99 notification, MCS certificates, SEG/BUS/ECO funding paperwork, and the Reg 133.1.3 equipment-usage records that make the cert the durable audit trail.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 8 · BS 7671:2018+A4:2026"
            title="Notifications, certs & the paperwork trail"
            description="The complete cert evidence bundle for an LCT install — BS 7671 EIC and Part 6 model forms (restructured in A4), CPS Part P notification, DNO G98 / G99 notification, MCS certificates, SEG / BUS / ECO funding paperwork, and the Reg 133.1.3 equipment-usage records that make the cert the durable audit trail."
            tone="yellow"
          />

          <TLDR
            points={[
              'A4:2026 completely restructured and renumbered Part 6 (Inspection and Testing) to align with the CENELEC standard. The technical content is largely preserved; the regulation numbers change.',
              'Appendix 6 contains the model forms — EIC for new installations, additions and alterations involving new circuits; MEIWC for work on existing circuits with no new circuit. A4 brought minor changes to both certs.',
              'Reg 133.1.3 (modified in A4) requires certain equipment-usage decisions to be recorded on the appropriate Part 6 cert — making the cert the durable audit trail for design-time decisions.',
              'On a hybrid LCT install, five to seven separate notifications run in parallel — Part P via CPS, DNO via EREC G98/G99, MCS certificate registration, SEG via the electricity supplier, BUS / ECO as applicable, planning / listed-building where engaged.',
              'The cert evidence bundle has a 25+ year downstream lifespan — checked by PI insurers, MCS auditors, EICR inspectors, HSE, customers at sale, and the next contractor on additions / alterations. Building it properly at install is a long-term investment.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Navigate the A4:2026 restructured Part 6 — using the CENELEC-aligned regulation numbers on 2026+ certs and updating working references accordingly.',
              'Choose the correct model form for the install — EIC for new circuits, MEIWC for existing-circuit work, EICR for inspection reporting.',
              'Apply A4\'s Reg 133.1.3 equipment-usage recording requirement — entering the LCT-relevant design decisions (PEN-fault measure, bidirectional protective device, BESS protection) on the appropriate cert.',
              'Run the post-install notification workflow as a project management exercise — Part P, DNO, MCS, SEG, BUS / ECO, planning / listed-building where applicable.',
              'Use the EIC departure register correctly — recording the departure, the alternative measure and the equivalent-safety reasoning under Reg 120.3.',
              'Assemble the long-lifespan cert evidence bundle that survives PI scrutiny, MCS audit, EICR inspection, EAWR investigation, customer sale and contractor handover over a 25+ year install lifespan.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>The cert is the durable audit trail. Build it once, properly.</Pullquote>

          <ContentEyebrow>Part 6 restructured — what A4:2026 changed</ContentEyebrow>

          <ConceptBlock
            title="Part 6 alignment with HD 60364-6 — the long story and the A4 tranche"
            plainEnglish="The CENELEC alignment is older than A4. HD 60364-6 was introduced in 2016, causing the original BS 7671 Part 6 alignment — chapters 61–63 unused, Part 6 starting at Chapter 64. A4:2026 is the latest restructure of the same alignment."
            onSite="Update working references for any document citing specific Part 6 regulation numbers. The 2026+ cert uses the A4-aligned numbering; pre-A4 cites are an audit finding even where the underlying work is correct."
          >
            <p>The CENELEC alignment timeline:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">2016</strong> — CENELEC publishes HD
                60364-6 (Harmonisation Document on inspection and testing). BS 7671 Part 6
                aligns with HD 60364-6 at this point. As a structural artefact, chapters
                61–63 are not used and Part 6 starts at Chapter 64.
              </li>
              <li>
                <strong className="text-white">A1 / A2 / A3 (2020–2024)</strong> — Part 6
                is largely stable during these amendments; the 2016 alignment numbering
                persists.
              </li>
              <li>
                <strong className="text-white">A4:2026</strong> — Part 6 is further
                restructured and renumbered as the latest tranche of the CENELEC
                alignment. The technical content is largely preserved; the apparatus is
                updated.
              </li>
            </ul>
            <p>The Part 6 restructure in A4 changes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Regulation numbering refreshed against the latest HD 60364-6</li>
              <li>Cross-references within Part 6 updated</li>
              <li>Cross-references from elsewhere in BS 7671 to Part 6 updated</li>
              <li>OSG / GN3 references to Part 6 update in the aligned editions following A4</li>
            </ul>
            <p>The Part 6 restructure does NOT change:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>The inspection sequence — visual / mechanical inspection followed by testing</li>
              <li>The test methodology — the tests themselves are the same tests</li>
              <li>The acceptance criteria — the technical thresholds for compliance</li>
              <li>The model forms in Appendix 6 — EIC, MEIWC, EICR (with minor A4 changes)</li>
            </ul>
            <p>
              The practical task for the LCT installer is to update working references and
              cert templates to use the A4-aligned numbering. The 2026+ cert citing
              pre-A4 Part 6 numbers is an audit finding even where the underlying work is
              correct.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="GN3 (BS 7671 Guidance Note 3) — Part 6 alignment with HD 60364-6"
            clause="The introduction in 2016 of the CENELEC Harmonized Document HD 60364-6 covering inspection and testing caused the clause numbering in BS 7671 to align with the HD. As a result of alignment with HD 60364-6, Chapters 61 to 63 are not used and the text of Part 6 of BS 7671 starts at Chapter 64."
            meaning="The CENELEC alignment is a 2016 event, not an A4:2026 event. The visible structural quirk — Part 6 starting at Chapter 64, with chapters 61–63 unused — has been there since 2016. A4:2026 is the latest tranche of restructure within the same alignment."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Part 6 further restructure"
            clause="Part 6 (Inspection and testing) has been completely restructured in the 2018+A4:2026 edition. This restructuring includes changes to regulation numbering to align Part 6 with the CENELEC standard for inspection and testing. Users should not rely on pre-A4 regulation numbers when consulting Part 6."
            meaning="A4\'s Part 6 restructure refreshes the alignment against the latest HD 60364-6. The technical content is preserved; the apparatus around it is renumbered. The competent installer updates the working references and cert templates."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Appendix 6 — the model forms</ContentEyebrow>

          <ConceptBlock
            title="EIC, MEIWC, EICR — which form, when?"
            plainEnglish="Appendix 6 contains the three primary model forms in BS 7671. EIC for new installations and major changes. MEIWC for minor existing-circuit work. EICR for inspection reporting on existing installations."
            onSite="Most LCT installs use the EIC because they include dedicated new circuits. Pure like-for-like swaps may use MEIWC. EICR is the inspection report, not an installation cert."
          >
            <p>The model form taxonomy:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">EIC</strong> — Electrical Installation
                Certificate. For new installation, addition or alteration involving new
                circuits. The standard cert for LCT installs that include dedicated new
                circuits (EV per Section 722, PV / BESS / heat pump).
              </li>
              <li>
                <strong className="text-white">MEIWC</strong> — Minor Electrical
                Installation Works Certificate. For work on existing circuits with no new
                circuit added. Several minor works on a single circuit may be covered by
                one MEIWC.
              </li>
              <li>
                <strong className="text-white">EICR</strong> — Electrical Installation
                Condition Report. The formal inspection report on an existing
                installation. Assigns observation codes (C1 / C2 / C3 / FI) and drives
                remedial work prioritisation.
              </li>
            </ul>
            <p>
              A4:2026 brought minor changes to the certificates and updated the inspection
              items for new installation work in domestic and similar premises with up to
              100 A supply. The competent installer uses the A4-aligned forms; pre-A4 forms
              issued on 2026+ work are an audit finding.
            </p>
            <p>EICR observation codes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">C1 — Danger present</strong>. Immediate
                action required.
              </li>
              <li>
                <strong className="text-white">C2 — Potentially dangerous</strong>. Urgent
                remedial work.
              </li>
              <li>
                <strong className="text-white">C3 — Improvement recommended</strong>. No
                immediate danger but improvement advised.
              </li>
              <li>
                <strong className="text-white">FI — Further investigation required</strong>.
                The inspector cannot determine the condition without more information.
              </li>
            </ul>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="The model form decision tree — Is this new install or new circuit? Yes → EIC. Existing-circuit work, no new circuit? → MEIWC. Inspection report on existing installation? → EICR with C1/C2/C3/FI coding. A4:2026 brought minor changes to all three forms in Appendix 6."
            filename="renewable/m1s8-model-form-decision-tree.png"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Appendix 6"
            clause="Appendix 6 of BS 7671 contains model forms intended for the initial certification of a new electrical installation or for an addition or alteration to an existing installation. Appendix 6 includes minor changes to the certificates, changes to the inspections for new installation work only for domestic and similar premises with up to 100 A supply, and examples of items requiring inspection for an electrical installation condition report."
            meaning="Appendix 6 is the home of the model forms. The 2026+ cert uses the A4-aligned forms with the updated inspection items for new domestic installs. The form changes are minor; the inspection-items update is the more substantive operational change."
          />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Reg 133.1.3 — equipment-usage recording on the cert</ContentEyebrow>

          <Pullquote>The design decision goes on the cert, not in the design office only.</Pullquote>

          <ConceptBlock
            title="Reg 133.1.3 in A4:2026 — what gets recorded on the cert"
            plainEnglish="A4 modified Reg 133.1.3 to require certain equipment-usage decisions to be recorded on the appropriate Part 6 cert. The cert becomes the durable audit trail for design-time decisions."
            onSite="On every LCT install, identify which A4-relevant equipment-usage decisions need recording. The PEN-fault protective measure on a PME EV install. The bidirectional protective device on a grid-tied source. The protection arrangements on a BESS interface. These go on the EIC."
          >
            <p>
              Reg 133.1.3 (Selection of equipment) was modified in A4 to require that
              certain usage of equipment shall be recorded on the appropriate electrical
              certification specified in Part 6 of BS 7671. The recording requirement is
              triggered where BS 7671 explicitly indicates that the usage of a particular
              item of equipment is to be documented.
            </p>
            <p>LCT-relevant equipment-usage decisions that may fall under 133.1.3:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">PEN-fault protective measure</strong>{' '}
                chosen on PME-supplied EV chargepoints (per Reg 722.411.4.1) — integral
                voltage monitoring, TT island, or equivalent
              </li>
              <li>
                <strong className="text-white">Bidirectional protective device</strong>
                {' '}specified per Reg 551.7.1(c) on grid-tied PV, BESS or V2G interfaces
              </li>
              <li>
                <strong className="text-white">Specific protective devices</strong> on a
                BESS interface under Chapter 57 — including fuse selection, isolator
                arrangement, and any bidirectional protection
              </li>
              <li>
                <strong className="text-white">RCD type</strong> selected (Type A / B / F)
                where the LCT load requires a specific type
              </li>
            </ul>
            <p>
              The record on the cert is clear and traceable to the circuit, location, or
              protective measure involved. The 2026+ inspector reading the cert in 2031
              reads the design intent — what was chosen, where, why — rather than
              inferring it from the install.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 133.1.3 (Selection of equipment, A4 change)"
            clause="Regulation 133.1.3 has been modified and now requires that certain usage of equipment shall be recorded on the appropriate electrical certification specified in Part 6 of BS 7671. Designers, installers, and inspectors shall ensure that where BS 7671 calls for the usage of particular equipment to be identified, that usage is explicitly entered on the certification associated with the work covered by Part 6."
            meaning="The cert is now the formal record of certain design-time decisions. For LCT this is where the PEN-fault measure choice, the bidirectional protective device specification, the BESS protection arrangements get documented. The recordkeeping is the leading edge of a trajectory the 19th Edition is expected to extend."
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>The departure register — Reg 120.3 in practice</ContentEyebrow>

          <ConceptBlock
            title="Three items per departure — name, alternative, equivalent-safety reasoning"
            plainEnglish="Reg 120.3 permits departures from BS 7671 where the alternative measure is at least as safe AND the departure is recorded on the cert. Three items per departure. Without all three it is non-compliance, not a permitted departure."
            onSite="The departure register section of the EIC is the right place. Record the departure, the alternative, the reasoning. Sign-off by the designer with PI cover. Without the bundle, EAWR Reg 4 exposure is open."
          >
            <p>The three items per departure:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">The departure itself</strong> — name the
                BS 7671 regulation departed from and describe what was done differently
              </li>
              <li>
                <strong className="text-white">The alternative measure</strong> — describe
                the technical alternative adopted in place of the regulation\'s
                requirement
              </li>
              <li>
                <strong className="text-white">The equivalent-safety reasoning</strong> —
                explain how the alternative delivers at least equivalent safety to the
                regulation\'s requirement, under Reg 120.3
              </li>
            </ul>
            <p>Common LCT departures that need the full record:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Non-standard cable route to preserve a feature wall or roof structure</li>
              <li>Departure from the recommended BESS siting due to physical constraints</li>
              <li>Alternative chargepoint isolation arrangement where the standard route is impractical</li>
              <li>PV mounting fixings that depart from the manufacturer\'s standard pattern</li>
            </ul>
            <p>
              An unrecorded departure is non-compliance with documentation, not a Reg 120.3
              departure. EAWR Reg 4 (the absolute statutory duty under the Electricity at
              Work Regulations 1989) bites on the underlying installation; the missing
              record removes the BS 7671 defence. The cost of recording is small; the cost
              of an unrecorded departure surfacing in dispute is large.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>The post-install notification workflow</ContentEyebrow>

          <Pullquote>A hybrid install triggers five to seven notifications. Treat it as project management.</Pullquote>

          <ConceptBlock
            title="The notification stack — what gets notified to whom, by when"
            plainEnglish="A hybrid LCT install is itself a project management exercise post-install. Multiple notifications run in parallel, each with its own deadline and downstream consumer."
            onSite="Build the post-install workflow as a checklist. CPS within 30 days. DNO per the EREC route. MCS certificate registration. Customer\'s SEG application via supplier. BUS / ECO as applicable. Planning / listed-building completion notifications where engaged."
          >
            <p>The notification stack on a typical hybrid LCT install:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Part P via CPS</strong> — within 30 days of
                completion. CPS notifies Building Control on installer\'s behalf.
                Customer receives Building Regulations compliance certificate within
                weeks.
              </li>
              <li>
                <strong className="text-white">DNO via EREC G98</strong> — within 28 days
                of energisation. Fit-and-notify route for ≤ 16 A per phase generation.
              </li>
              <li>
                <strong className="text-white">DNO via EREC G99</strong> — per the
                application approval timing. Apply-and-wait route for &gt; 16 A per phase
                generation. Approval typically precedes install for G99.
              </li>
              <li>
                <strong className="text-white">MCS certificate registration</strong> — for
                each MIS / MPS combination on the install. The MCS certificate is the
                customer\'s evidence for funding applications.
              </li>
              <li>
                <strong className="text-white">SEG application via supplier</strong> —
                customer-driven, with installer providing MCS cert and DNO notification
                reference. Supplier processes the application and starts export payments.
              </li>
              <li>
                <strong className="text-white">BUS application</strong> — where the heat
                pump is BUS-eligible. Typically installer-driven on behalf of the
                customer.
              </li>
              <li>
                <strong className="text-white">ECO4 / GBIS application</strong> — where
                the install is funded through the obligated supplier route. Process driven
                by the delivery partner.
              </li>
              <li>
                <strong className="text-white">Planning / listed-building completion
                notifications</strong> — where applicable, the local planning authority is
                notified of completion.
              </li>
            </ul>
            <p>
              Each notification has its own deadline. Each has its own downstream consumer
              (Building Control, DNO, MCS Service Company, electricity supplier, BUS
              administrator, ECO obligated supplier, LPA). The competent LCT contractor
              treats the post-install workflow as a project management exercise — checklist
              every notification per job, tick them off as completed, audit the workflow at
              year-end.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>The cert evidence bundle — long-lifespan investment</ContentEyebrow>

          <ConceptBlock
            title="The bundle that defends the work over 25+ years"
            plainEnglish="The cert evidence bundle has a long downstream lifespan. Multiple parties may check it over the install\'s life — building it properly at install is a 25+ year investment."
            onSite="Build the bundle as one electronic package per install. Photographs, certs, notifications, MCS evidence, manufacturer documentation, departure register, customer handover pack. Backed up off-site. Available to the customer on request."
          >
            <p>The downstream parties that may check the cert bundle:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">PI insurers at renewal</strong> — every 12
                months. Bundle quality affects offered cover terms.
              </li>
              <li>
                <strong className="text-white">MCS auditors at scheme audit</strong> —
                typically annual but risk-weighted. Sampled job review.
              </li>
              <li>
                <strong className="text-white">EICR inspectors at periodic inspection</strong>
                {' '}— every 5–10 years depending on property type. The bundle is the
                design audit trail.
              </li>
              <li>
                <strong className="text-white">HSE in EAWR investigation</strong> — in the
                event of an electrical incident. The bundle is the contemporaneous evidence
                of competent practice.
              </li>
              <li>
                <strong className="text-white">Customer at property sale</strong> — the
                bundle becomes part of the conveyancing pack. Affects property value and
                buyer due diligence.
              </li>
              <li>
                <strong className="text-white">Next contractor at addition / alteration</strong>
                {' '}— reads the original design intent before adding to the installation.
              </li>
              <li>
                <strong className="text-white">DNO at any future capacity review</strong>
                {' '}— the bundle records the original generation / load notification.
              </li>
            </ul>
            <p>Items in the cert evidence bundle:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>BS 7671 EIC (or MEIWC as applicable)</li>
              <li>Reg 133.1.3 equipment-usage records (within the EIC)</li>
              <li>Departure register entries under Reg 120.3 (within the EIC)</li>
              <li>CPS Part P notification reference</li>
              <li>DNO EREC G98 / G99 / G100 notification reference</li>
              <li>MCS certificates for each MIS / MPS combination</li>
              <li>Survey artefact (photographs, measurements, customer-acknowledged risks)</li>
              <li>Manufacturer commissioning documentation per major equipment item</li>
              <li>Customer handover pack (warranties, user manuals, maintenance schedule)</li>
              <li>Planning / listed-building consents where applicable</li>
              <li>SEG / BUS / ECO application references and confirmation</li>
            </ul>
            <p>
              The bundle is retained electronically with off-site backup. Practical
              retention: the working life of the installation, plus the limitation period.
              For LCT installs that is typically 25+ years. The cost of retention is
              minimal; the cost of an unavailable bundle when a claim or dispute arises is
              the unavoidable failure mode.
            </p>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="The cert evidence bundle — eleven items that make the install defensible over a 25+ year lifespan. EIC + 133.1.3 records + departure register + CPS notification + DNO notification + MCS certificates + survey artefact + manufacturer commissioning + customer handover + planning consents + funding application references. Retained electronically with off-site backup."
            filename="renewable/m1s8-cert-evidence-bundle.png"
          />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="A hybrid PV + BESS + EV + heat pump install with full MCS funding"
            situation="A homeowner pursuing the full funding stack — BUS for the heat pump, SEG for PV export, and ECO4 for the heat battery retrofit — completes a hybrid LCT install on a 1990s detached property in England. TN-C-S supply, 100 A single-phase upgraded to three-phase. Installer holds MIS 3002 (PV) + MIS 3003 (heat pump) + MIS 3008 (heat battery), plus NICEIC CPS registration."
            whatToDo="The post-install cert evidence bundle assembled over 3–4 weeks: (1) BS 7671 EIC issued at completion, with Reg 133.1.3 records for the PEN-fault protective measure (chargepoint with integral voltage monitoring), the bidirectional protective device per 551.7.1(c) at the PV and BESS interfaces, and the BESS protection arrangements under Chapter 57. (2) Departure register entry under Reg 120.3 for a non-standard PV mounting pattern adopted to clear a chimney shadow — alternative measure documented, equivalent-safety reasoning recorded. (3) NICEIC Part P notification submitted within 30 days; Building Regulations compliance certificate issued. (4) DNO G99 notification reference (the install required pre-approval given the aggregate generation capacity); G100 export limitation documentation in place (the customer is in a moderately constrained ANM region). (5) MCS certificates registered for MIS 3002, MIS 3003 and MIS 3008. (6) Customer\'s SEG application submitted via their electricity supplier with the MCS cert and DNO G99 reference. (7) BUS application submitted by the installer on behalf of the customer; grant received within 4–6 weeks. (8) ECO4 application processed via the obligated supplier delivery partner. (9) Survey artefact archived with photographs, measurements, customer-acknowledged risks. (10) Manufacturer commissioning evidence retained for each piece of equipment (inverter, BESS, chargepoint, heat pump unit). (11) Customer handover pack in electronic and paper form including maintenance schedule. Total bundle retained electronically with off-site backup for the working life of the installation."
            whyItMatters="In 2031 a periodic inspection of the install reads the cert bundle and sees the design intent — the PEN-fault choice, the bidirectional protective device decisions, the BESS protection rationale, the G100 export-limitation arrangement. The inspector codes the install cleanly against the criteria the design was built to. The customer\'s property sale in 2034 passes conveyancing without an electrical-side dispute because the bundle is complete. The PI insurer\'s annual renewal sees the bundle quality and prices cover favourably. The 25+ year downstream value of the bundle dwarfs the install-week cost of building it properly."
          />

          <CommonMistake
            title="Issuing the EIC without completing the Reg 133.1.3 equipment-usage records"
            whatHappens="The installer treats the EIC as a tick-box exercise — circuit list, test results, signature — and ignores the new A4 requirement for Reg 133.1.3 equipment-usage recording. The cert is issued without records of the PEN-fault protective measure, the bidirectional protective device specification, or the BESS protection arrangements. Five years later a periodic inspection cannot determine which protective measures were chosen at design time; the inspector either over-codes (treating undocumented but compliant choices as defects) or under-codes (missing genuine non-compliance because the design intent is unclear)."
            doInstead="Build the Reg 133.1.3 records into the EIC workflow from the design stage. The design pack identifies the A4-affected equipment-usage decisions; the cert template prompts for the records; the install workflow captures them naturally. The marginal cost at install is small; the downstream value over 25+ years is substantial. The records are also part of the PI-defensible bundle and the MCS evidence pack."
          />

          <CommonMistake
            title="Treating departures as informal — emailed to the customer rather than recorded on the cert"
            whatHappens="During the install, the installer applies a Reg 120.3 departure (e.g. a non-standard cable route to preserve a feature wall) and emails the customer a note explaining the deviation. The departure is not recorded on the EIC. At a later EICR or dispute the cert shows no departure register entry; the email is hard to locate; the departure is treated as documented non-compliance rather than a permitted Reg 120.3 departure."
            doInstead="Reg 120.3 departures go in the EIC departure register, not in an email. Three items per departure: the departure itself, the alternative measure, the equivalent-safety reasoning. Sign-off by the designer with PI cover. The email to the customer is the customer-relationship layer; the cert entry is the regulatory record. Both happen; the cert entry is the durable one."
          />

          <CommonMistake
            title="Letting the post-install notification workflow slip past its deadlines"
            whatHappens="The installer completes the install, takes payment, and moves on to the next job. The CPS notification deadline (30 days) passes without submission. The DNO G98 notification (28 days) passes. The MCS certificate registration is delayed. The customer\'s SEG application is rejected because the supplier needs the MCS cert and DNO notification reference. The customer chases; the installer scrambles; the funding flow is disrupted."
            doInstead="Treat the post-install notification workflow as project management. Checklist every notification per job: CPS within 30 days, DNO per the EREC route, MCS within the scheme timing, customer SEG / BUS / ECO applications. Tick them off as completed. Set up an internal review every Friday to catch any lagging notifications. The customer relationship depends on the funding flowing; the funding flow depends on the notification workflow being current."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A4:2026 completely restructured and renumbered Part 6 (Inspection and Testing) to align with the CENELEC standard. Update working references to A4-aligned numbering.',
              'Appendix 6 contains the model forms — EIC for new circuits, MEIWC for existing-circuit minor work, EICR for inspection reporting. A4 brought minor changes to all three.',
              'A4\'s Reg 133.1.3 requires certain equipment-usage decisions to be recorded on the appropriate Part 6 cert. For LCT: PEN-fault measure, bidirectional protective device, BESS protection arrangements.',
              'The EIC departure register records Reg 120.3 departures — three items per departure: the departure, the alternative, the equivalent-safety reasoning. Unrecorded departures are non-compliance.',
              'A hybrid LCT install triggers five to seven notifications in parallel — Part P via CPS, DNO via EREC, MCS, SEG, BUS, ECO, planning where engaged. Treat as project management.',
              'The cert evidence bundle has a 25+ year downstream lifespan. PI insurers, MCS auditors, EICR inspectors, HSE, customers at sale, next contractors all check the bundle.',
              'Building the bundle properly at install (electronic with off-site backup) is the long-term investment that defends the work across its operational lifetime.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 8 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-1-section-7')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 1.7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Building Regulations
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 2: Solar PV — how it works
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
