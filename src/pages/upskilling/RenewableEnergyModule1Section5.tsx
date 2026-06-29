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
} from '@/components/study-centre/learning';
import { DnoDecisionTree } from '@/components/study-centre/diagrams/renewableM1';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm1s5-g98-vs-g99',
    question:
      'A homeowner wants to install a 4 kWp single-phase grid-tied PV system. Which DNO Engineering Recommendation applies?',
    options: [
      'G98 — generating units of up to and including 16 A per phase (fit-and-notify)',
      'G99 — generating units exceeding 16 A per phase (apply-and-wait approval)',
      'G100 — export limitation',
      'No notification required',
    ],
    correctIndex: 0,
    explanation:
      'A 4 kWp single-phase PV system at 230 V nominal exports roughly 17.4 A at peak — but in practice the inverter is rated to ≤ 16 A per phase output. Domestic-scale single-phase PV typically sits inside G98 (fit-and-notify) up to that 16 A per phase threshold. Above 16 A per phase or where the install is three-phase with > 16 A per phase, G99 (apply-and-wait) is the route.',
  },
  {
    id: 'm1s5-anti-islanding',
    question:
      'Reg 551.7.4 requires "means of automatic switching to disconnect the generating set from the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency at the supply terminals from declared values". What is this requirement commonly called?',
    options: [
      'Soft-start',
      'Anti-islanding',
      'Power factor correction',
      'Phase balancing',
    ],
    correctIndex: 1,
    explanation:
      'Anti-islanding is the operational name for the requirement. The risk is that a grid-tied inverter continues to back-feed into a "dead" public network during a fault or maintenance condition, energising lines DNO workers are restoring. The protective measure is automatic disconnection on loss of supply or voltage / frequency deviation. For inverters up to 16 A, BS EN 50549-1 is the practical compliance route. For inverters above 16 A, the protection type, sensitivity and operating times depend on the public-supply protection scheme.',
  },
  {
    id: 'm1s5-g100-purpose',
    question:
      'EREC G100 covers export limitation. What is the practical purpose of an export limitation scheme on a domestic install?',
    options: [
      'To force the customer to use more grid electricity',
      'To allow a customer to install more generation capacity than the DNO would otherwise permit by capping the export to a defined limit — using a measurement / control scheme that prevents export above the agreed threshold',
      'To eliminate the need for a meter',
      'To reduce inverter cost',
    ],
    correctIndex: 1,
    explanation:
      'G100 export limitation schemes let a customer install more nameplate generation than the DNO connection would permit unconstrained — by deploying a measurement-and-control scheme that prevents export above a defined cap. For an installer this is the route used where the unconstrained connection would require an expensive G99 upgrade but the customer\'s actual export pattern (after self-consumption, BESS charging) would not regularly hit the cap. The G100 documentation has to be in place at install.',
  },
  {
    id: 'm1s5-551-7-5-prevention',
    question:
      'Reg 551.7.5 requires "means to prevent the connection of a generating set to the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency". What is this requirement preventing?',
    options: [
      'The initial connection during commissioning',
      'Autonomous reconnection of the inverter while the public supply is absent or unstable — the inverter must not silently re-energise the network during restoration',
      'Connection of additional load',
      'Connection of more PV modules',
    ],
    correctIndex: 1,
    explanation:
      'Once anti-islanding (551.7.4) has disconnected the inverter on loss of supply, 551.7.5 prevents the inverter autonomously reconnecting until the supply has been verified stable for a defined period. The risk being prevented is the inverter coming back online during a brief grid disturbance and complicating the DNO\'s restoration sequence. Modern G98 / G99-compliant inverters handle this internally; the audit evidence is the inverter\'s compliance certificate.',
  },
  {
    id: 'm1s5-551-7-6-isolation',
    question:
      'Reg 551.7.6 requires "means to enable the generating set to be isolated from the system for distribution of electricity to the public". For a generating set with an output exceeding 16 A, what governs the accessibility of this isolation?',
    options: [
      'Only the manufacturer\'s instructions',
      'National rules and distribution system operator requirements',
      'The installer\'s preference',
      'Local building control',
    ],
    correctIndex: 1,
    explanation:
      'For generating sets above 16 A, 551.7.6 explicitly defers to "national rules and distribution system operator requirements" for the accessibility of the isolation means. In practice this is the DNO\'s requirement on the lockable isolator at the install — DNO workers need to be able to make the local source safe before working on the upstream network. For generating sets up to 16 A, accessibility is governed by BS EN 50549-1.',
  },
  {
    id: 'm1s5-dno-queue',
    question:
      'A customer in a capacity-bound DNO region wants a 22 kW three-phase EV charger plus a 10 kW solar PV system. The supply needs uprating. Realistic timeline expectation:',
    options: [
      'Two to three weeks for the DNO conversation',
      'Twelve months or more in capacity-bound regions for substantial upgrade or generation connection work — written precheck on capacity, queue position and indicative timeline before quoting the install',
      'No DNO conversation needed below 30 kW',
      'The MCS approval handles all DNO requirements',
    ],
    correctIndex: 1,
    explanation:
      'In capacity-bound parts of GB, DNO connection queues now routinely exceed 12 months for substantial connections or upgrades. The honest survey includes a written DNO precheck — current supply capacity, local feeder headroom, queue position — before the install quote is finalised. The most expensive failure mode in LCT contracting is taking a deposit on a timeline the DNO will not honour.',
  },
  {
    id: 'm1s5-chapter-82-pei',
    question:
      'A4:2026 introduced Chapter 82 — covering installations with local production and/or storage of energy designated as "Prosumer\'s Electrical Installations (PEIs)". How does Chapter 82 relate to Section 551 on a grid-tied LCT install?',
    options: [
      'Chapter 82 replaces Section 551',
      'Chapter 82 sits alongside Section 551 — providing additional requirements, measures and recommendations specifically for the PEI case (PV + BESS + heat pump + EV) on top of the general Section 551 generator-side requirements',
      'Chapter 82 only applies to commercial installs',
      'Chapter 82 is informational only',
    ],
    correctIndex: 1,
    explanation:
      'Chapter 82 is the new PEI chapter in A4:2026, providing additional requirements, measures and recommendations for the design, erection and verification of all types of LV installations that include local production and / or storage of energy. It sits alongside Section 551 (the generic generator-side interface), Section 712 (PV), Chapter 57 (BESS) and Section 722 (EV) — adding PEI-specific design discipline on top of the technology-specific chapters.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'G98 is fit-and-notify, G99 is apply-and-wait. The 16 A per phase threshold drives the split. On a customer install where the inverter output rating is borderline against the threshold, what is the safest practical approach?',
    options: [
      'Submit G99 — accept the apply-and-wait timeline to hold an unambiguous position the borderline case is hard to defend otherwise',
      'Submit G98, since it is the simpler fit-and-notify route and avoids the approval wait',
      'Install without notifying the DNO at all and rely on the export-limitation settings',
      'Notify Building Control instead of the DNO, as the work is a notifiable electrical alteration',
    ],
    correctAnswer: 0,
    explanation:
      'The G98 / G99 split is binary at the 16 A per phase threshold. Submitting G98 on a borderline install creates legal exposure if the inverter is later found to exceed 16 A under specific operating conditions. The defensive move on borderline cases is G99 — accept the apply-and-wait timeline cost in exchange for an unambiguous regulatory position.',
  },
  {
    id: 2,
    question:
      'Reg 551.7.4 requires automatic disconnection of the generating set from the public supply on loss of supply or voltage / frequency deviation. For a 7 kWp PV install with a single-phase inverter rated below 16 A, what is the practical compliance route?',
    options: [
      'A bespoke protective relay designed and commissioned specifically for this installation',
      'A manually operated isolation switch that the customer opens during a grid disturbance',
      'An inverter certified to BS EN 50549-1, covering the protection requirements for ≤16 A parallel generators',
      'A second consumer unit dedicated to the generation circuits with its own main switch',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 50549-1 is the practical compliance route for generators ≤ 16 A intended to parallel with the public supply. A G98-listed inverter holds BS EN 50549-1 certification covering anti-islanding (551.7.4), prevention of reconnection (551.7.5) and isolation accessibility (551.7.6). The compliance evidence is the inverter\'s certification document, retained as part of the EIC bundle.',
  },
  {
    id: 3,
    question:
      'A homeowner wants to add a 5 kWp PV array plus a 10 kWh BESS to an existing dwelling with a 100 A single-phase supply. The DNO ANM (Active Network Management) area is capacity-bound. The customer agrees to export limitation. Which DNO process applies?',
    options: [
      'G98 fit-and-notify, on the basis that each individual unit is small',
      'G99 apply-and-wait with no export limitation applied to the connection',
      'No DNO notification is required because the customer has agreed to limit export',
      'G100 export limitation, with the underlying connection assessed under G99 given the combined export potential',
    ],
    correctAnswer: 3,
    explanation:
      'G100 is the export-limitation scheme that lets a customer install more nameplate generation than the unconstrained DNO connection would permit. The underlying connection is assessed under G99 because the combined PV + BESS export capacity exceeds the G98 threshold; the G100 documentation defines the export cap and the measurement / control scheme that enforces it. In capacity-bound (ANM) regions, G100 is often the only viable route to install meaningful BESS-coupled PV at residential scale.',
  },
  {
    id: 4,
    question:
      'On a workplace install with six 22 kW three-phase EV chargepoints, the aggregate import capacity drives a supply upgrade. What is the right DNO question to ask first?',
    options: [
      'Current connection capacity, local feeder headroom, queue position and indicative timeline for an upgrade — in writing, before the quote',
      'Which inverter or charger brand the DNO would prefer to see specified on the install',
      'Whether the DNO can recommend a competitive price for the EV charging hardware',
      'Whether the DNO can confirm the chargepoints qualify for any grant funding',
    ],
    correctAnswer: 0,
    explanation:
      'The DNO precheck — capacity, headroom, queue, timeline — is the standing item on every LCT survey where supply uprating is plausibly needed. Six × 22 kW = 132 kW of EV load at three-phase simultaneous, before any other site load. The realistic project shape depends on the answers to those four questions; the install timeline follows the DNO timeline.',
  },
  {
    id: 5,
    question:
      'Reg 551.7.5 prevents an inverter autonomously reconnecting to the public supply during a brief grid disturbance. Why is this prevention important to the DNO?',
    options: [
      'To protect the network restoration sequence so the DNO can re-energise cleanly without inverters silently re-engaging',
      'To increase the customer\'s reliance on grid electricity during and after a disturbance',
      'To force the customer to perform a manual reset so they notice the outage occurred',
      'To preserve the inverter manufacturer\'s warranty conditions after a grid fault',
    ],
    correctAnswer: 0,
    explanation:
      '551.7.5 protects the DNO network restoration sequence. During a fault or planned outage, the DNO de-energises a section, performs work, then re-energises in a controlled sequence. Distributed inverters that autonomously re-engage during the restoration confuse the sequence and create safety risk for workers. The required disconnection-then-verified-reconnection behaviour is built into BS EN 50549-1 certified inverters.',
  },
  {
    id: 6,
    question:
      'A4:2026 introduced Chapter 82 (Prosumer\'s Electrical Installations). On a hybrid PV + BESS + heat pump + EV install, what is the strategic significance of Chapter 82?',
    options: [
      'It affects the design conversation only at certification, not during design or erection',
      'It applies only to off-grid systems with no connection to the public supply',
      'Chapter 82 adds PEI design, erection and verification rules over the technology chapters, treating the install as one coherent system',
      'It is simply a renamed version of the existing Section 551 with no new requirements',
    ],
    correctAnswer: 2,
    explanation:
      'Chapter 82 treats the hybrid install as one PEI, not as PV + BESS + EV separately. The chapter adds requirements for the interaction between the technologies — load management, export coordination, fault current contribution from multiple sources, protection coordination across the combined installation. For the designer this is the chapter that frames the install holistically, complementing the per-technology rules.',
  },
  {
    id: 7,
    question:
      'A G99 application requires DNO approval before installation. The customer wants to install in eight weeks. The DNO indicative timeline for approval in the region is 14 months. What is the right customer conversation?',
    options: [
      'Promise the eight-week timeline and begin work pending the DNO approval coming through',
      'Submit a G98 notification instead so the install can proceed without waiting for approval',
      'Ask the DNO to make an exception and fast-track this single domestic application',
      'Put the 14-month DNO timeline in writing as a gating item and reset the customer\'s expectation before the deposit',
    ],
    correctAnswer: 3,
    explanation:
      'G99 requires DNO approval before installation. Starting work pending approval risks an unfundable install if the approval is delayed or denied. The honest customer conversation puts the DNO timeline up front, in writing, as a gating item — and the customer who values the install will adjust their timeline expectation accordingly. The customer who walks because of the timeline is a customer who would have disputed a non-compliant install.',
  },
  {
    id: 8,
    question:
      'The Energy Networks Association (ENA) publishes EREC G98, G99 and G100. How do these relate to BS 7671 Section 551?',
    options: [
      'The EREC documents govern the DNO connection process; Section 551 sets the BS 7671 design-and-install requirements — both apply',
      'The EREC documents replace Section 551 for any grid-tied generation installation',
      'They are the same documents published under two different names by different bodies',
      'EREC G98/G99/G100 are statutory instruments that override BS 7671 where they differ',
    ],
    correctAnswer: 0,
    explanation:
      'EREC G98, G99 and G100 are Engineering Recommendations published by the ENA covering the customer-DNO connection process. They are not BS 7671. BS 7671 Section 551 covers the design-and-install requirements (anti-islanding, prevention of reconnection, isolation accessibility). On a grid-tied LCT install both apply: the EREC documents drive the notification / approval process with the DNO; Section 551 drives the design compliance under BS 7671.',
  },
];

const faqs = [
  {
    question:
      'What\'s the practical difference between G98 fit-and-notify and G99 apply-and-wait?',
    answer:
      'G98 applies to generation units up to and including 16 A per phase. The installer can fit the equipment and notify the DNO within 28 days of energisation — no DNO approval required first. G99 applies above 16 A per phase. The installer must apply to the DNO, receive approval, and only then proceed. G99 timelines vary by region — typically weeks to months in unconstrained regions, 12+ months in capacity-bound (ANM) regions.',
  },
  {
    question:
      'EREC G100 — when does it actually unlock additional generation capacity?',
    answer:
      'G100 is the export-limitation scheme. It lets a customer install nameplate generation that exceeds the unconstrained DNO connection capacity, on the basis that an export-limit measurement / control scheme prevents export above an agreed cap. In capacity-bound regions, G100 is the practical route for residential PV + BESS combinations where the unconstrained connection would either be refused or require an unaffordable supply upgrade.',
  },
  {
    question:
      'What does the DNO actually want from an installer applying under G99?',
    answer:
      'A standard G99 application pack includes: customer details, installation address, generation technology and capacity (inverter nameplate, manufacturer datasheet), proposed connection arrangement, single-line diagram, protection settings and curves, and the installer\'s competence evidence. Some DNOs also require an EREC G99 Form A1 or equivalent. The application is reviewed for system impact — fault current, voltage rise, network stability — and either approved (sometimes with conditions) or refused with an explanation.',
  },
  {
    question:
      'Reg 551.7.4 talks about "deviation of voltage or frequency at the supply terminals from declared values". What are the declared values?',
    answer:
      'Declared values are the nominal supply voltage and frequency that the DNO maintains under statute (the Electricity Safety, Quality and Continuity Regulations 2002 — ESQCR). In GB, declared voltage is 230 V single-phase / 400 V three-phase, with statutory tolerance bands (typically +10% / -6%). Frequency is declared at 50 Hz with operational tolerance. The inverter\'s anti-islanding logic compares the measured supply against the declared values; deviation outside the tolerance triggers disconnection.',
  },
  {
    question:
      'BS EN 50549-1 — what is it, and how does it relate to BS 7671?',
    answer:
      'BS EN 50549-1 is the European Standard "Requirements for generating plants to be connected in parallel with distribution networks — Part 1: Connection to a LV distribution network — Generating plants up to and including Type B". For generating sets up to and including 16 A per phase, BS EN 50549-1 is referenced from Section 551 as the practical compliance route for the 551.7.4–551.7.6 requirements. A G98-listed inverter holds BS EN 50549-1 certification; the certification document is the audit evidence.',
  },
  {
    question:
      'How does Chapter 82 (the new PEI chapter) change the DNO conversation?',
    answer:
      'Chapter 82 treats the install with local production and storage as a single Prosumer\'s Electrical Installation, not as separate PV + BESS + EV installations. The DNO conversation reflects this — applications include the holistic PEI design (load management, export coordination, the interactions between sources and storage), not just individual inverter notifications. For the installer, Chapter 82 makes the system-level design discipline a regulatory requirement, not a best-practice option.',
  },
  {
    question:
      'A4:2026 came into force 15 April 2026. Did the EREC documents change in step?',
    answer:
      'EREC documents are published by the ENA on their own cycle, not in step with BS 7671 amendments. The current versions of G98, G99 and G100 should be checked on the ENA website before each install — the most recent revisions of G98 and G99 introduced several requirements aligned with BS EN 50549-1, but the practical impact on residential PV is typically minimal. For commercial / industrial installs the changes to G99 in particular can be substantive.',
  },
  {
    question:
      'A customer wants to skip the DNO notification on a small G98 install. What\'s the right answer?',
    answer:
      'No. G98 is fit-and-notify, not fit-and-ignore. Notification within 28 days of energisation is a contractual condition of the connection between the customer and the DNO. Skipping notification creates several downstream risks: the customer\'s SEG application is blocked (the supplier asks for the DNO notification reference), the next periodic inspection flags the omission, and in dispute the unnotified install is treated as unauthorised generation.',
  },
  {
    question:
      'How should I handle a customer who refuses to accept the DNO timeline?',
    answer:
      'Put the timeline in writing as a project gating item before the deposit is taken. The customer who values the install will adjust their timeline expectation; the customer who walks at that point would have disputed a non-compliant install later. The damaged-cost contractor is the one who quotes the customer\'s timeline and runs into the DNO reality after the deposit. The competitive advantage is the honest survey, not the optimistic quote.',
  },
];

export default function RenewableEnergyModule1Section5() {
  const navigate = useNavigate();

  useSEO({
    title:
      'G98, G99 & EREC G100 — DNO conversation and timing | Renewable Energy 1.5 | Elec-Mate',
    description:
      'The DNO connection regime for parallel generation — G98 fit-and-notify, G99 apply-and-wait, G100 export limitation — and how it interlocks with BS 7671 Section 551 (551.7.4–551.7.6) and the new Chapter 82 PEI framework under A4:2026.',
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
            eyebrow="Module 1 · Section 5 · BS 7671:2018+A4:2026"
            title="G98, G99 & EREC G100 — DNO conversation and timing"
            description="The DNO connection regime for parallel generation — fit-and-notify (G98), apply-and-wait (G99), export limitation (G100) — and how it interlocks with BS 7671 Section 551 (551.7.4–551.7.6) and the new Chapter 82 PEI framework."
            tone="yellow"
          />

          <TLDR
            points={[
              'EREC G98 is fit-and-notify for generation up to and including 16 A per phase. The installer can fit the equipment and notify the DNO within 28 days of energisation.',
              'EREC G99 is apply-and-wait for generation above 16 A per phase. DNO approval required before installation. Timelines vary regionally — 12+ months in capacity-bound (ANM) regions.',
              'EREC G100 is the export-limitation scheme. Lets a customer install nameplate generation above the unconstrained DNO connection capacity by capping export via a measurement / control scheme.',
              'BS 7671 Section 551 (especially 551.7.4 anti-islanding, 551.7.5 prevention of reconnection, 551.7.6 isolation) sets the BS 7671-side design requirements. BS EN 50549-1 is the practical compliance route for inverters ≤ 16 A.',
              'A4:2026 introduced Chapter 82 — Prosumer\'s Electrical Installations (PEIs) — covering installations with local production and / or storage of energy as coherent systems, not collections of independent installations.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish G98 fit-and-notify from G99 apply-and-wait by the 16 A per phase threshold and apply the right notification route on every install.',
              'Identify when G100 export limitation is the right route — particularly in capacity-bound (ANM) regions where unconstrained connection is refused or requires unaffordable supply upgrades.',
              'Apply BS 7671 Section 551.7.4–551.7.6 in design — anti-islanding, prevention of reconnection, isolation accessibility — with BS EN 50549-1 as the compliance route for ≤ 16 A generation.',
              'Read the new Chapter 82 PEI framework as the holistic-system design discipline that sits on top of the per-technology chapters.',
              'Run the DNO precheck (capacity, headroom, queue position, indicative timeline) as a standing item on every LCT survey where supply uprating is plausibly needed.',
              'Handle the customer conversation around DNO timelines honestly — putting the constraint up front rather than discovering it after the deposit.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>The DNO conversation determines the timeline before the install conversation does.</Pullquote>

          <ContentEyebrow>The G98 / G99 / G100 architecture</ContentEyebrow>

          <ConceptBlock
            title="EREC G98, G99, G100 — what each one is for"
            plainEnglish="EREC documents are the ENA Engineering Recommendations that govern how a customer connects parallel generation to the public supply. They are not BS 7671 — they sit alongside it as the DNO-side process."
            onSite="The first DNO question on any LCT install: is this G98, G99, or G99 with G100 export limitation? The answer drives the timeline more than the install does."
          >
            <p>The EREC document set:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">EREC G98</strong> — Fit-and-notify for
                generation units up to and including 16 A per phase. Install first, notify
                DNO within 28 days of energisation.
              </li>
              <li>
                <strong className="text-white">EREC G99</strong> — Apply-and-wait for
                generation units above 16 A per phase. Submit application, await DNO
                approval, then install. Timelines vary by region.
              </li>
              <li>
                <strong className="text-white">EREC G100</strong> — Export limitation
                scheme. Lets a customer install nameplate generation above the
                unconstrained connection capacity by capping export via a measurement /
                control scheme.
              </li>
            </ul>
            <p>
              EREC documents are published by the Energy Networks Association (ENA) on
              their own revision cycle, independent of BS 7671. They are non-statutory —
              their force comes from being the accepted process for connecting parallel
              generation to the public supply.
            </p>
            <p>
              EREC governs the application / notification process with the DNO. BS 7671
              Section 551 governs the design-and-install requirements. Both apply on every
              grid-tied LCT install. The cert evidence bundle carries both — the DNO
              notification reference plus the BS 7671 EIC.
            </p>
          </ConceptBlock>

          <DnoDecisionTree caption="Choosing the DNO connection route under EREC G98 / G99 / G100." />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>BS 7671 Section 551 — the design-side requirements</ContentEyebrow>

          <Pullquote>Anti-islanding, prevent reconnection, enable isolation.</Pullquote>

          <ConceptBlock
            title="The 551.7.4 / 551.7.5 / 551.7.6 trio — the DNO interface in BS 7671"
            plainEnglish="Three regulations set the BS 7671-side requirements for parallel generation. Anti-islanding. Prevention of reconnection. Means of isolation. All three apply to every grid-tied LCT install."
            onSite="The audit evidence for 551.7.4–551.7.6 on residential PV is the inverter\'s BS EN 50549-1 certification document. Retain it as part of the EIC bundle."
          >
            <p>The three regulations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">551.7.4 — Automatic disconnection</strong>
                {' '}on loss of supply or deviation of voltage / frequency at the supply
                terminals from declared values (anti-islanding).
              </li>
              <li>
                <strong className="text-white">551.7.5 — Prevention of reconnection</strong>
                {' '}while the public supply remains absent or unstable (no autonomous
                re-engagement during restoration).
              </li>
              <li>
                <strong className="text-white">551.7.6 — Means of isolation</strong> — for
                generating sets exceeding 16 A, accessibility complies with national rules
                and DNO requirements. For ≤ 16 A, accessibility complies with BS EN 50549-1.
              </li>
            </ul>
            <p>
              For generating sets up to and including 16 A intended to operate in parallel
              with a system for distribution of electricity to the public, the requirements
              are given in BS EN 50549-1. A G98-listed inverter holds BS EN 50549-1
              certification covering all three requirements.
            </p>
            <p>
              For generating sets exceeding 16 A, the protection type, sensitivity and
              operating times depend on the public-supply protection scheme and the number
              of generating sets. The design conversation engages the DNO directly, with
              the protection coordination scheme typically forming part of the G99
              application.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.4 (anti-islanding)"
            clause="Means of automatic switching shall be provided to disconnect the generating set from the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency at the supply terminals from declared values. For a generating set with an output exceeding 16 A, the type of protection and the sensitivity and operating times depend upon the protection of the system for distribution of electricity to the public and the number of generating sets."
            meaning="Anti-islanding is the operational name. The risk is an inverter continuing to back-feed into a dead network. The disconnection trigger is loss of supply or voltage / frequency deviation outside declared values. For ≤ 16 A, BS EN 50549-1 is the compliance route. For > 16 A, the protection scheme is DNO-specific."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.5 (prevention of reconnection)"
            clause="Means shall be provided to prevent the connection of a generating set to the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency at the supply terminals from values required by Regulation 551.7.4. For a generating set with an output not exceeding 16 A intended to operate in parallel with a system for distribution of electricity to the public, the requirements are given in BS EN 50549-1."
            meaning="551.7.5 protects the DNO network restoration sequence. Once anti-islanding (551.7.4) has disconnected the inverter, 551.7.5 prevents the inverter autonomously reconnecting until the supply has been verified stable. BS EN 50549-1 defines the verification timing for ≤ 16 A generators."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.6 (means of isolation)"
            clause="Means shall be provided to enable the generating set to be isolated from the system for distribution of electricity to the public. For a generating set with an output exceeding 16 A, the accessibility of this means of isolation shall comply with national rules and distribution system operator requirements. For a generating set with an output not exceeding 16 A, the accessibility of this means of isolation shall comply with BS EN 50549-1."
            meaning="A visible-break disconnection the DNO can use to make the local source safe to work near. Above 16 A, the DNO sets the accessibility requirement (typically a lockable isolator at an agreed location). Below 16 A, BS EN 50549-1 governs."
          />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[3]} />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Chapter 82 — the PEI framework (new in A4)</ContentEyebrow>

          <Pullquote>The prosumer install is a system, not a collection of installations.</Pullquote>

          <ConceptBlock
            title="Chapter 82 — Prosumer\'s Electrical Installations (PEIs)"
            plainEnglish="A4:2026 introduced Chapter 82 covering installations with local production and / or storage of energy as coherent Prosumer\'s Electrical Installations — not as separate PV + BESS + EV installs that happen to share a building."
            onSite="On a hybrid install, the Chapter 82 PEI framing is the chapter that ties together the per-technology requirements. Load management, export coordination, fault current contribution, protection coordination across multiple sources."
          >
            <p>
              Chapter 82 provides additional requirements, measures and recommendations
              for design, erection and verification of all types of low voltage electrical
              installations that include local production and / or storage of energy. Such
              installations are designated as Prosumer\'s Electrical Installations (PEIs).
            </p>
            <p>The PEI framework recognises that the hybrid install is a system:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Multiple sources operating in parallel (PV + BESS + V2G EV)</li>
              <li>Load management to balance generation and consumption</li>
              <li>Export coordination across sources (where applicable)</li>
              <li>Fault current contribution from multiple sources to the same fault</li>
              <li>Protection coordination across the combined installation</li>
            </ul>
            <p>
              Chapter 82 sits alongside the technology-specific chapters (712 PV, 722 EV,
              Chapter 57 BESS) and the generic generator-side chapter (551). It adds the
              system-level design discipline that the per-technology chapters do not, by
              definition, address.
            </p>
            <p>
              For the DNO conversation, Chapter 82 makes the PEI design holistic — the
              G99 application is for the system, not for individual inverters. The 19th
              Edition is expected to deepen Chapter 82\'s scope.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Chapter 82 (new in A4) — Prosumer\'s Electrical Installations"
            clause="Chapter 82 provides additional requirements, measures and recommendations for design, erection and verification of all types of low voltage electrical installations that include local production and/or storage of energy. Such installations are designated as Prosumer\'s Electrical Installations (PEIs) and shall comply with Chapter 82 where applicable."
            meaning="Chapter 82 is the regulatory acknowledgement that the hybrid LCT install is a coherent system. The chapter sits alongside the per-technology chapters and adds system-level design discipline — load management, export coordination, multi-source protection. The 19th Edition is expected to deepen the PEI treatment."
          />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>The DNO queue — the silent timeline driver</ContentEyebrow>

          <Pullquote>In capacity-bound regions, the DNO queue is the project plan.</Pullquote>

          <ConceptBlock
            title="ANM regions and 12+ month queues — the upstream constraint"
            plainEnglish="Some DNO regions are capacity-bound. Connection or upgrade work runs 12+ months. The DNO precheck is a standing item on every LCT survey where the supply may need uprating."
            onSite="Before the install quote: written DNO precheck. Current supply capacity. Local feeder headroom. Queue position. Indicative timeline. Customer informed in writing before the deposit. No exceptions on supply-uprating jobs."
          >
            <p>The DNO precheck items to confirm on a site survey:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Current connection</strong> — single-phase / three-phase, main fuse rating</li>
              <li><strong className="text-white">Available headroom</strong> on the local feeder</li>
              <li><strong className="text-white">Queue position</strong> for any required upgrade or generation connection</li>
              <li><strong className="text-white">Indicative timeline</strong> — in writing where possible</li>
              <li><strong className="text-white">ANM area status</strong> — is the local feeder in an Active Network Management area?</li>
              <li><strong className="text-white">G100 viability</strong> — would export limitation unlock the connection?</li>
            </ul>
            <p>
              ANM (Active Network Management) regions impose additional constraints. In an
              ANM region, the DNO actively manages network flows to keep within capacity —
              new generation connections may be approved with curtailment conditions
              (limiting export during high-demand periods), or refused outright if
              capacity is unavailable.
            </p>
            <p>
              The DNO publishes capacity heat maps; the queue position is available on
              request. These are not edge-case complications — they are routine constraints
              on LCT projects in 2026 onwards.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="A residential 5 kWp PV + 10 kWh BESS install in an ANM region"
            situation="A homeowner in an ANM (Active Network Management) region asks for a 5 kWp grid-tied PV array plus a 10 kWh AC-coupled battery. Existing supply: single-phase, 100 A. The unconstrained G99 application would likely be refused by the DNO because the combined PV + BESS export capacity exceeds available local network headroom."
            whatToDo="Work the G100 route. The G100 export-limitation scheme lets the customer install the desired nameplate generation by capping export to an agreed level via a measurement / control scheme (typically a CT-based export monitor coupled to the inverter\'s export-limit input). The underlying connection is assessed under G99 because the combined PV + BESS export capacity exceeds the G98 threshold; the G100 documentation defines the cap and the control scheme that enforces it. Chapter 82 PEI design discipline applies — the install is a system, not separate PV + BESS components. Section 551.7.4–551.7.6 governs the inverter-side anti-islanding, prevention of reconnection and isolation. BS EN 50549-1 certified inverters provide the compliance evidence."
            whyItMatters="In ANM regions, G100 is often the only viable route to install meaningful BESS-coupled PV at residential scale. The customer\'s alternative is either a refused G99 application or an unaffordable supply upgrade. The competent installer reads the DNO\'s ANM constraint at survey stage and proposes the G100 route as part of the quote — not as a fallback after refusal."
          />

          <Scenario
            title="Workplace EV rollout requiring three-phase supply uprating"
            situation="A small commercial unit wants six 22 kW three-phase EV chargepoints. Existing supply: 100 A three-phase. The aggregate load (132 kW at simultaneous full charge) exceeds the existing supply capacity. The DNO region has a 14-month queue for three-phase supply upgrades."
            whatToDo="Lead the customer conversation with the DNO timeline, not the install timeline. The honest survey says: the install requires supply uprating; the DNO queue for that work is 14 months; the install cannot reasonably proceed before the upgrade. Alternatives to explore: fewer chargepoints (matching the existing supply); smaller chargepoints (lower kW rating, longer charge times); OCPP-based dynamic load management (sharing the existing 100 A across the chargepoints, accepting longer charge times during peak); G99 application running in parallel with the install of the load-managed solution. The cert evidence bundle includes the G99 application reference, the load management commissioning evidence, and the BS 7671 EIC."
            whyItMatters="The customer in this scenario will get the same answer from any competent contractor. The contractor who quotes the customer\'s eight-week timeline and discovers the DNO queue afterwards loses the customer and the deposit. The contractor who quotes honestly at survey stage retains the customer — and typically converts the project at a higher price, because the honest survey is the competitive advantage."
          />

          <CommonMistake
            title="Submitting G98 on a borderline install above 16 A per phase"
            whatHappens="The installer fits a single-phase inverter rated borderline against the 16 A per phase threshold — perhaps 16.5 A under certain operating conditions. They submit G98 to keep the install simple. The DNO subsequently audits the install or the inverter rating is challenged. The G98 notification is found insufficient; the install is non-compliant; the customer\'s SEG application is disputed."
            doInstead="On borderline cases, submit G99. The apply-and-wait timeline cost is small compared to the cost of a retrospective compliance dispute. The G98 / G99 split is binary at 16 A per phase — borderline cases need the G99 unambiguous position. Where the inverter\'s peak output under specific conditions exceeds 16 A, the G99 route is the defensible answer regardless of the typical operating point."
          />

          <CommonMistake
            title="Treating EREC G98/G99 as paperwork separate from the BS 7671 design"
            whatHappens="The installer treats the DNO notification as administrative overhead — fill in the form, submit, get a reference number. The BS 7671 design conversation happens separately. The G98/G99 paperwork doesn\'t reference the Section 551.7.4–551.7.6 design choices; the EIC doesn\'t cross-reference the DNO notification. At a later EICR or dispute, the audit trail is fragmented."
            doInstead="Treat the EREC documents and BS 7671 Section 551 as two halves of the same conversation. The G99 application can include the Section 551 design intent (protection scheme, isolation arrangement, anti-islanding evidence). The EIC can carry the DNO notification reference and the BS EN 50549-1 inverter certification. The integrated approach produces a single coherent audit trail that survives challenge."
          />

          <CommonMistake
            title="Skipping the DNO precheck on a workplace EV install"
            whatHappens="A workplace EV rollout is quoted on the assumption that the existing supply can absorb the new load. The DNO precheck happens after the deposit is taken. The supply turns out to be inadequate; the upgrade timeline is 12+ months; the customer cancels; the deposit is refunded; the installer carries the cost of the wasted survey and quote effort."
            doInstead="Make the DNO precheck a standing item on every LCT survey involving more than trivial load addition. Get the current connection capacity, the local feeder headroom and the upgrade queue position in writing before the quote. Where the timeline is a project constraint, present it to the customer up front. The customer who proceeds knowing the timeline is the customer who completes; the customer who proceeds in ignorance is the customer who cancels."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>The installer\'s G98 / G99 / G100 reference</ContentEyebrow>

          <ConceptBlock
            title="Three questions that resolve the DNO route on most LCT installs"
            plainEnglish="Is the generation ≤ 16 A per phase? Is the install in a capacity-bound or ANM region? Is export limitation needed to fit available connection capacity?"
            onSite="The three questions, answered at survey stage, locate the DNO process. G98 / G99 / G99+G100. The unconstrained region answers differ from the ANM region answers — same install, different process."
          >
            <p>Question 1 — what is the inverter rating per phase?</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>≤ 16 A per phase → G98 candidate (fit-and-notify)</li>
              <li>&gt; 16 A per phase → G99 (apply-and-wait)</li>
              <li>Borderline → default to G99 (defensible position)</li>
            </ul>
            <p>Question 2 — is the install in a capacity-bound or ANM region?</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Unconstrained region — G98 fit-and-notify proceeds normally; G99 typical timeline weeks to months</li>
              <li>Capacity-bound — G99 timeline 12+ months; G100 may be the only viable route</li>
              <li>ANM region — G99 applications may be approved with curtailment conditions or refused outright; G100 export limitation often unlocks the install</li>
            </ul>
            <p>Question 3 — is export limitation needed?</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>No — proceed with G98 or G99 as applicable</li>
              <li>Yes (to fit capacity) — add G100 documentation; underlying connection assessed under G99</li>
            </ul>
            <p>
              The three questions, answered at survey, resolve the DNO route on the
              majority of LCT installs. The residual cases (commercial multi-site
              portfolios, embedded generation behind a private network, V2G with complex
              export profiles) need direct DNO engagement.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            points={[
              'EREC G98 is fit-and-notify for ≤ 16 A per phase generation. Notify the DNO within 28 days of energisation.',
              'EREC G99 is apply-and-wait for > 16 A per phase generation. DNO approval required before installation. Timelines 12+ months in capacity-bound (ANM) regions.',
              'EREC G100 is the export-limitation scheme. Lets a customer install nameplate generation above unconstrained connection capacity by capping export via measurement / control.',
              'BS 7671 Section 551.7.4–551.7.6 sets the design-side requirements: anti-islanding, prevention of reconnection, means of isolation. BS EN 50549-1 is the practical compliance route for ≤ 16 A.',
              'A4:2026 Chapter 82 — Prosumer\'s Electrical Installations (PEIs) — treats the hybrid install as a coherent system, not as separate per-technology installations.',
              'The DNO precheck (capacity, headroom, queue position, timeline) is a standing item on every LCT survey involving supply uprating.',
              'EREC documents (ENA Engineering Recommendations) govern the DNO-side process. BS 7671 Section 551 governs the design-and-install requirements. Both apply on every grid-tied LCT install.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 5 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-1-section-4')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 1.4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                MCS, MIS &amp; competent person
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-1-section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.6 Site survey first principles
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
