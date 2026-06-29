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
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm1s6-survey-purpose',
    question:
      'What is the most accurate framing of the LCT site survey?',
    options: [
      'A technical sketch produced to inform the install drawing',
      'A written discovery of every binding constraint, completed before the quote',
      'A formality carried out to reassure the customer',
      'A health-and-safety walk-through of the working area',
    ],
    correctIndex: 1,
    explanation:
      'The site survey is the discovery exercise that finds the constraints — supply capacity, earthing arrangement, CU readiness, DNO queue, structural limits, access, planning, listed-building status, neighbouring objections. Each constraint is a potential project failure mode. The survey captures all of them in writing before the quote is finalised, so the quote reflects the project as it can actually be delivered.',
  },
  {
    id: 'm1s6-earthing-arrangement',
    question:
      'Which earthing arrangement on a domestic LCT survey most often forces additional design work?',
    options: [
      'TN-S, with separate neutral and earth from the supply',
      'TN-C-S (PME), particularly for EV chargepoints under Reg 722.411.4.1',
      'IT systems, which are rare in UK domestic premises',
      'None — any earthing arrangement is equivalent for LCT',
    ],
    correctIndex: 1,
    explanation:
      'TN-C-S (PME) is the most common GB domestic earthing arrangement and the one that forces specific LCT design work — particularly EV chargepoints where 722.411.4.1 now requires a recognised PEN-fault protective measure unconditionally. Identifying the earthing arrangement at survey stage drives the design conversation: chargepoint with integral PEN-fault detection, TT island arrangement, or DNO TT conversion.',
  },
  {
    id: 'm1s6-cu-readiness',
    question:
      'What three CU items must the LCT survey check?',
    options: [
      'Brand, colour and approximate age of the board',
      'Spare ways, RCBO type compatibility, and rated capacity against projected load',
      'Whether the CU door closes and latches properly',
      'The customer\'s preference on board appearance',
    ],
    correctIndex: 1,
    explanation:
      'The CU readiness check is technical and load-driven. Spare ways for dedicated circuits (Section 722 requires a dedicated EV circuit; Section 712 needs dedicated PV; Chapter 57 needs dedicated BESS). RCBO type compatibility — Type A or Type F is common for PV/heat pump loads; Type B may be required where DC fault sensing is needed. CU rated capacity — adding a 7.4 kW EV charger and a 14 kW heat pump to an older 80 A CU is often a CU upgrade, not a CU addition.',
  },
  {
    id: 'm1s6-pei-survey',
    question:
      'Under A4:2026\'s Chapter 82 (Prosumer\'s Electrical Installations), how does the survey for a hybrid PV+BESS+heat pump+EV install differ from four separate technology surveys?',
    options: [
      'There is no meaningful difference between the two approaches',
      'The PEI survey captures the system-level interactions, not just per-technology constraints',
      'The survey is shorter because the items overlap',
      'The DNO conversation is skipped on a hybrid install',
    ],
    correctIndex: 1,
    explanation:
      'Chapter 82 frames the hybrid install as a coherent system. The survey captures the system-level interactions: combined diversified load, fault current contribution from multiple sources, export coordination (when do PV and BESS export, when does EV charge, when does heat pump run), load management strategy, multi-source protection coordination. The per-technology surveys feed into the PEI survey, but the PEI survey is the discipline that catches what the technology surveys miss.',
  },
  {
    id: 'm1s6-structural',
    question:
      'On a roof-mount PV install, the survey identifies a moss-covered, ageing roof. What is the right structural conversation?',
    options: [
      'Proceed with the install — moss removal is the customer\'s responsibility',
      'Record the roof condition and recommend a roofing assessment before the PV install',
      'Proceed with the install but use longer mounting fixings',
      'Switch to a ground-mounted array on the same property',
    ],
    correctIndex: 1,
    explanation:
      'PV array life is typically 25+ years. Roof life on a moss-covered ageing tile roof may be 5–10 years. Installing PV without addressing roof condition creates a near-term remove-and-refit liability — at the customer\'s cost. The survey records the condition, the assessment recommendation, and the structural timeline. Where the customer chooses to proceed regardless, the limitation is recorded as a customer-acknowledged scope item.',
  },
  {
    id: 'm1s6-access',
    question:
      'On a BESS install in a domestic property, what access items must the survey capture?',
    options: [
      'Whether the customer holds a key to the property',
      'Siting, ventilation, fire detection, isolation, cable routing and replacement access',
      'The width of the garden gate alone',
      'The availability of driveway parking alone',
    ],
    correctIndex: 1,
    explanation:
      'BESS siting under Chapter 57 is a chemistry-aware design conversation. The survey captures ventilation (chemistry-specific), fire detection / suppression arrangement, isolation accessibility, proximity to escape routes (so a battery fire does not block exit), cable routing back to the CU / inverter, and the maintenance / replacement access path (batteries are replaced; the route in must allow the route out at end-of-life). The IET Code of Practice for Electrical Energy Storage Systems is the operational reference.',
  },
  {
    id: 'm1s6-customer-conversation',
    question:
      'The survey identifies three binding constraints: DNO queue 14 months, roof refurbishment required first, customer\'s preferred installation date 8 weeks. What is the right customer conversation?',
    options: [
      'Promise the 8-week timeline and proceed to quote',
      'Put the three constraints in writing as gating items before the quote is finalised',
      'Submit a G98 application to bypass the DNO queue',
      'Ignore the roof condition and install the PV anyway',
    ],
    correctIndex: 1,
    explanation:
      'The honest survey converts binding constraints into the project plan. The customer\'s preferred timeline gives way to the constraint-driven timeline. The contractor who pretends otherwise wins the deposit and loses the project. The competent contractor wins the durable contract by being honest at survey stage — the customer who proceeds with realistic expectations is the customer who completes.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'An LCT site survey identifies the existing supply as 80 A single-phase TN-C-S (PME) on a 1970s housing-stock property. The customer wants a 7.4 kW EV chargepoint, a 14 kW ASHP, and a 4 kWp PV array. What is the most important next step?',
    options: [
      'Project the diversified load, run the DNO precheck, check CU readiness, then put gating items in writing',
      'Order the equipment ahead of the survey sign-off',
      'Quote the full install immediately to secure the deposit',
      'Apply for BUS funding before resolving the supply',
    ],
    correctAnswer: 0,
    explanation:
      'The diversified load on 7.4 kW EV + 14 kW ASHP + base load + occasional cooking and shower typically exceeds 80 A. The supply upgrade is the gating constraint. The CU readiness check confirms whether the additions can fit a CU upgrade or require a sub-board. The DNO precheck establishes the timeline. Quoting before the gating items are resolved is the most common LCT failure mode.',
  },
  {
    id: 2,
    question:
      'Reg 722.411.4.1 (A4:2026) deleted the "reasonably practicable" exception on PME-supplied EV chargepoints. What survey item now becomes non-negotiable on a PME install?',
    options: [
      'The condition of the roof covering',
      'Identifying and recording the recognised PEN-fault protective measure for the install',
      'The customer\'s preferred chargepoint brand',
      'The width of the garden gate for access',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 hardened 722.411.4.1. The PEN-fault protective measure is unconditional on PME-supplied EV chargepoints. The survey must identify which recognised route the install will use — most commonly a chargepoint with integral PEN-fault voltage monitoring (manufacturer documentation as audit evidence) or a TT island with local earth electrode and dedicated 30 mA RCD.',
  },
  {
    id: 3,
    question:
      'A homeowner has a south-facing roof, ageing tiles, moss visible. The survey notes the roof condition. The customer pushes to install PV anyway. The right professional move:',
    options: [
      'Install and warranty the array for the full 25 years',
      'Refuse the job outright on structural grounds',
      'Document the condition and risk, then offer the install with the limitation recorded',
      'Switch the customer to a ground-mounted array instead',
    ],
    correctAnswer: 2,
    explanation:
      'The right move is informed-customer documentation. The roof condition is recorded in the survey, the structural risk is presented (PV array life exceeds roof life on the moss-covered tiles), and the customer\'s decision is captured in the quote. The customer can proceed; the contractor is not liable for the foreseeable structural failure. The structural conversation is the contractor\'s due diligence.',
  },
  {
    id: 4,
    question:
      'Chapter 82 (Prosumer\'s Electrical Installations, new in A4:2026) frames the hybrid install as a system. Which survey items become "PEI survey items" rather than per-technology items?',
    options: [
      'The brand of PV module specified for the array',
      'The customer\'s contact telephone number',
      'The colour of the roof covering on the property',
      'Combined load, multi-source fault contribution, export coordination and load management',
    ],
    correctAnswer: 3,
    explanation:
      'PEI survey items are the system-level questions that the per-technology surveys do not address by definition. Combined load. Multi-source fault contribution. Export coordination between PV and BESS. Load management between EV charging, heat pump running and battery charging. Protection coordination across multiple sources to a common fault. The PEI survey is the discipline Chapter 82 introduces.',
  },
  {
    id: 5,
    question:
      'On a BESS install in a domestic utility room, the survey must address chemistry-aware ventilation and fire-detection. Which document is the operational complement to Chapter 57?',
    options: [
      'The IET Code of Practice for Electrical Energy Storage Systems',
      'The IET On-Site Guide, used on its own',
      'The manufacturer\'s instructions, used on their own',
      'Building Regulations Part B (fire safety), on its own',
    ],
    correctAnswer: 0,
    explanation:
      'Chapter 57 introduces the regulatory framework for stationary battery installations but stays general on the operational detail. The IET Code of Practice for Electrical Energy Storage Systems is the technology-specific operational manual — covering chemistry-aware siting, fire detection, ventilation, isolation, emergency response. GN3 explicitly cross-references it. Building Regulations Part B (fire safety) is also relevant but addresses the building-side requirements, not the BESS-specific design.',
  },
  {
    id: 6,
    question:
      'The DNO precheck on a workplace install returns a 14-month queue for a supply upgrade. The customer\'s preferred install date is 8 weeks away. What does the survey capture?',
    options: [
      'The customer\'s preferred date, recorded as the install date',
      'The queue, the upgrade as a gating item, the alternatives, and the customer sign-off',
      'Nothing — the queue is solely a DNO problem',
      'A revised quote at a higher price to cover delay',
    ],
    correctAnswer: 1,
    explanation:
      'The survey captures the binding constraint, the alternatives that could compress the timeline, and the customer\'s informed acknowledgement of the resulting plan. The customer who proceeds knows what they\'re proceeding to; the customer who walks would have disputed the install. The contractor who survives the conversation has retained the customer on durable terms.',
  },
  {
    id: 7,
    question:
      'On a domestic BESS install, the survey identifies the only available siting as a small cupboard under the stairs. The customer prefers this location. What\'s the right survey-stage decision?',
    options: [
      'Proceed, since the customer has chosen the location',
      'Install in the cupboard but add extra ventilation',
      'Decline the under-stairs siting and propose alternative locations',
      'Reconfigure the staircase to free up other space',
    ],
    correctAnswer: 2,
    explanation:
      'BESS siting under Chapter 57 and the IET CoP for EESS is a chemistry-aware safety conversation. Under-stairs cupboards in dwellings are commonly fire-egress routes. A thermal event in the BESS would block the egress route. The competent installer declines the siting and proposes alternatives (utility room, garage, external enclosure). The customer-preferred location is not a defence if the install fails in a fire incident.',
  },
  {
    id: 8,
    question:
      'A site survey delivers the project plan. Which framing is most useful?',
    options: [
      'The survey is the technical sketch for the install drawing',
      'The survey is a formality completed before the job',
      'The survey is a customer-facing document only',
      'The survey resolves the binding constraints into the project plan the quote then prices',
    ],
    correctAnswer: 3,
    explanation:
      'The survey is the project plan. Every binding constraint identified in the survey becomes a project item; every dependency becomes a sequence item; every customer-acknowledged risk becomes a scope item. The quote prices the survey, not an imagined project. The contractor who survives projects is the contractor whose survey is honest enough to drive the project plan.',
  },
];

const faqs = [
  {
    question:
      'How much time should I budget for an LCT site survey on a hybrid PV+BESS+heat pump+EV install?',
    answer:
      'On a residential property with no major structural complications, plan for 3–4 hours on site for a hybrid PEI survey, plus 2–3 hours of design pack drafting and DNO precheck submission. The DNO response on the precheck takes days to weeks; you cannot complete the survey artefact until the precheck returns. Budget the customer conversation about the surveyed plan as a separate visit or call after the precheck returns — that conversation is where the project plan is locked.',
  },
  {
    question:
      'What survey items distinguish a Chapter 82 PEI from a "PV install that happens to have a battery"?',
    answer:
      'The system-level items. Combined diversified load. Multi-source fault current contribution. Export coordination — which source exports when, particularly under variable tariff conditions. Load management strategy — how PV, BESS, EV charging and heat pump are sequenced under peak demand. Multi-source protection coordination — fault current from PV and BESS contributing to the same fault, and the protective device that must handle the combined contribution. These items don\'t exist in a per-technology survey by definition.',
  },
  {
    question:
      'How do I make the DNO precheck a fast workflow rather than a project blocker?',
    answer:
      'Build it into the survey process. Submit the precheck on the day of the survey — the supply details, the proposed generation / additional load, and the customer\'s address. Most DNOs return precheck responses within 5–15 working days. Schedule the survey-to-customer conversation 3 weeks out so the precheck response is in hand by then. The precheck cost is small (often nil for small generation queries); the value is the binding constraint resolved before the quote.',
  },
  {
    question:
      'What does "CU readiness" actually mean as a survey item?',
    answer:
      'Three checks. (1) Spare ways available for the dedicated circuits the LCT install requires — Section 722 mandates a dedicated EV circuit; the inverter side of a PV install is a dedicated circuit; the BESS connection is a dedicated circuit. (2) RCBO type compatibility — Type A or Type F for the LCT loads (PV, heat pump); Type B where DC fault sensing is required by the chargepoint hardware. (3) CU rated capacity — adding sustained-load LCT circuits to an older CU may push it past its design point, requiring a CU upgrade.',
  },
  {
    question:
      'On a heat pump survey, what items beyond the electrical does the LCT installer need to capture?',
    answer:
      'Heat-loss calculation inputs (insulation status, glazing, building fabric), hot-water cylinder location and condition (most heat pump installs need an unvented or thermal store), pipework run from the heat pump unit to the cylinder and emitter circuits, external siting of the outdoor unit (planning constraints, noise emissions, defrost-water management), and the customer\'s heating-system usage pattern. MIS 3003 sets the design pack content; the survey gathers the inputs.',
  },
  {
    question:
      'How do I handle planning permission and listed-building constraints on a PV / BESS install?',
    answer:
      'Planning permission is usually not required for domestic rooftop PV under permitted-development rights, but exceptions apply for listed buildings, conservation areas, and certain non-domestic situations. The survey captures the building\'s designation status and any local planning restrictions. For listed buildings, listed-building consent is typically required even where planning permission is not — the local authority\'s conservation officer is the relevant contact. BESS installs do not have planning restrictions in most domestic settings but may have Building Regulations Part B implications for fire safety.',
  },
  {
    question:
      'What about neighbour engagement — when does that become a survey item?',
    answer:
      'Where the install includes outdoor noise sources (heat pump outdoor unit, large inverter on a shared boundary wall), reflective surfaces (PV array visible from a neighbour\'s property), or shared-supply arrangements (semi-detached / terrace properties with shared earthing or DNO connection). The survey records the relevant neighbour-side considerations and where the customer needs to inform or engage neighbours before install. Most installs do not require formal neighbour consultation, but the courtesy conversation is a customer-relationship item, not the contractor\'s.',
  },
  {
    question:
      'What gets recorded as a customer-acknowledged risk in the survey?',
    answer:
      'Any item where the customer has chosen to proceed despite a recommendation against. PV on an ageing roof. BESS in a less-than-ideal siting. EV chargepoint in a location with marginal supply capacity. The survey records the recommendation, the customer\'s acknowledged choice, and the resulting limitation on the install scope or warranty. The record protects both parties — the customer has the design conversation in writing, the contractor has the documented decision in case of dispute.',
  },
  {
    question:
      'How do I write up a survey so it stands up to PI insurer scrutiny if a job goes wrong?',
    answer:
      'Six items. (1) Date, time, persons present, weather conditions. (2) Photographs — supply intake, CU, proposed install locations, structural elements, any pre-existing defects. (3) Measured items — main fuse rating, earth electrode resistance (where TT), spare CU ways, earthing arrangement. (4) DNO precheck reference and response. (5) Customer-acknowledged risks and the recommendations against. (6) Sign-off by both surveyor and customer. The bundle is the audit trail the PI insurer will look for.',
  },
];

export default function RenewableEnergyModule1Section6() {
  const navigate = useNavigate();

  useSEO({
    title:
      'Site survey first principles for LCT | Renewable Energy 1.6 | Elec-Mate',
    description:
      'The LCT site survey that prevents the commissioning surprise — load projection, supply assessment, earthing arrangement identification, CU readiness, structural and access, customer-acknowledged risk, all in writing before the quote.',
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
            eyebrow="Module 1 · Section 6 · BS 7671:2018+A4:2026"
            title="Site survey first principles for LCT"
            description="The LCT site survey is the discovery exercise that finds every binding constraint that could invalidate the proposed install timeline, scope or cost — captured in writing before the quote is finalised."
            tone="yellow"
          />

          <TLDR
            points={[
              'The LCT site survey is the project plan, not a technical sketch. Every binding constraint surfaced in the survey becomes a project item.',
              'The standing items every LCT survey must capture: supply (earthing arrangement, main fuse, three-phase / single-phase), DNO precheck (capacity, queue, timeline), CU readiness, load projection, structural / mechanical, access, planning / listed-building, customer-acknowledged risks.',
              'A4:2026 Chapter 82 makes the PEI survey discipline a regulatory expectation — the hybrid install is surveyed as a system, not as separate per-technology installations.',
              'A4:2026 Reg 722.411.4.1 deleted the "reasonably practicable" exception on PME-supplied EV chargepoints — the survey must identify the chosen PEN-fault protective route on every PME EV install.',
              'The PI-defensible survey bundle: date / time / persons present, photographs, measured items, DNO precheck reference, customer-acknowledged risks, sign-off by both surveyor and customer.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Run a comprehensive LCT site survey — supply, earthing arrangement, CU readiness, load projection, structural, access, planning, neighbour, customer expectations.',
              'Apply A4:2026 Reg 722.411.4.1 (PME PEN-fault) and Chapter 82 (PEI system discipline) at survey stage rather than after the quote.',
              'Run the DNO precheck as a standing item on every LCT survey involving supply uprating or non-trivial generation / load addition.',
              'Capture customer-acknowledged risks (ageing roof, sub-optimal BESS siting, marginal supply) in writing as part of the survey artefact.',
              'Assemble the PI-defensible survey bundle — date, photographs, measurements, DNO references, sign-off — that survives challenge if the install is later disputed.',
              'Lead the customer conversation with the binding constraints rather than the install timeline — converting the customer\'s preferred timeline into the constraint-driven project plan.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>The survey is the project plan. The quote is the commercial reflection of the survey.</Pullquote>

          <ContentEyebrow>The standing items every LCT survey must capture</ContentEyebrow>

          <ConceptBlock
            title="The eight standing items — every LCT survey, every time"
            plainEnglish="A complete LCT survey is comprehensive by routine, not by exception. Eight items appear on every survey. Skipping any of them is the source of the most common project failures."
            onSite="Walk the survey checklist every time. Photographs of every item. Measurements where measurements apply. Written record of every customer conversation. Sign-off by both parties at survey close."
          >
            <p>The eight standing survey items:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Supply</strong> — earthing arrangement
                (TN-S / TN-C-S / TT), main fuse rating, single-phase / three-phase,
                meter type (SMETS1 / SMETS2 / legacy)
              </li>
              <li>
                <strong className="text-white">DNO precheck</strong> — capacity, local
                feeder headroom, queue position for any required upgrade, ANM region
                status
              </li>
              <li>
                <strong className="text-white">CU readiness</strong> — spare ways, RCBO
                type compatibility, CU rated capacity vs projected load
              </li>
              <li>
                <strong className="text-white">Load projection</strong> — existing
                diversified load plus the new LCT loads, against the main fuse rating
              </li>
              <li>
                <strong className="text-white">Structural / mechanical</strong> — roof
                condition for PV, BESS siting (ventilation, fire detection, escape route
                proximity), heat pump siting (noise, defrost), EV chargepoint location
              </li>
              <li>
                <strong className="text-white">Access</strong> — working at height,
                cable routing, future maintenance / replacement access
              </li>
              <li>
                <strong className="text-white">Planning / listed-building</strong> —
                permitted-development status, conservation area, listed-building
                designation, local planning restrictions
              </li>
              <li>
                <strong className="text-white">Customer-acknowledged risks</strong> —
                where the customer has chosen to proceed despite a recommendation against
                (ageing roof, sub-optimal BESS siting, marginal supply)
              </li>
            </ul>
            <p>
              Each item is captured in writing in the survey artefact. The quote is then
              priced against the survey — not against the imagined project the customer
              described before the survey took place.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Supply and earthing — the first survey item</ContentEyebrow>

          <ConceptBlock
            title="Identify the earthing arrangement — and the design conversation that follows"
            plainEnglish="The earthing arrangement (TN-S / TN-C-S / TT) drives much of the LCT design conversation. Identify it at survey stage, before the design starts."
            onSite="On a domestic property, the earthing arrangement is typically visible at the intake — meter, earthing terminal, supply cable. On a commercial property, the arrangement may need the DNO documentation. Either way, record it in writing in the survey."
          >
            <p>The three common earthing arrangements in UK domestic / commercial:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">TN-S</strong> — separate neutral and
                earth from the supply. Less common in newer GB domestic. No specific
                LCT complication beyond standard design.
              </li>
              <li>
                <strong className="text-white">TN-C-S (PME)</strong> — combined neutral
                and earth in the supply, separated at the consumer\'s installation. The
                most common GB domestic arrangement. Triggers specific EV design under
                Reg 722.411.4.1 (PEN-fault protective measure now unconditional).
              </li>
              <li>
                <strong className="text-white">TT</strong> — installation earth via a
                local earth electrode, not the supply. Common on overhead-supply rural
                properties and some commercial. EV chargepoint design simpler in some
                respects (no PEN-fault concern), but supply-side earthing arrangement
                determines protection coordination.
              </li>
            </ul>
            <p>
              A4:2026 Reg 722.411.4.1 deleted the "reasonably practicable" exception on
              PME EV chargepoints. The survey on a PME property must identify which
              recognised PEN-fault protective route the install will use — integral
              chargepoint voltage-monitoring, TT island arrangement, or equivalent. Where
              the chargepoint hardware will provide the integral PEN-fault measure, the
              manufacturer\'s certification is the audit evidence.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.411.4.1 — PME supply to EV charging (A4 change)"
            clause="Regulation 722.411.4.1 concerning the use of a PME supply has been amended. The exception concerning reasonably practicable has been deleted. Changes have also been made to requirements for external influences, RCDs, socket-outlets and connectors."
            meaning="The PME design conversation now happens at survey stage on every PME-supplied EV install. The survey must identify the recognised PEN-fault protective route. The cost-based defence (we can\'t afford the integral-PEN-fault chargepoint) is no longer available."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>CU readiness and load projection</ContentEyebrow>

          <Pullquote>The CU upgrade is often the silent cost item the customer didn\'t expect.</Pullquote>

          <ConceptBlock
            title="CU readiness — three checks at survey stage"
            plainEnglish="The CU is the rate-limiting component on many older domestic installs. Three checks at survey stage: spare ways, RCBO type compatibility, rated capacity."
            onSite="Photograph the CU at survey. Record the make / model, the number of spare ways, the RCBO types currently fitted, and the CU\'s rated capacity. The customer often doesn\'t know any of these — the survey is where the information surfaces."
          >
            <p>The three CU readiness checks:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Spare ways</strong> — Section 722 requires
                a dedicated EV circuit; PV inverter circuit is dedicated; BESS connection
                is dedicated; heat pump circuit is dedicated. A typical hybrid install
                wants 3–4 spare ways. Older CUs often don\'t have them.
              </li>
              <li>
                <strong className="text-white">RCBO type compatibility</strong> — Type A
                or Type F is common for PV / heat pump loads. Type B may be required
                where DC fault sensing is needed by the chargepoint hardware. Older CUs
                may only support Type AC, which is insufficient for modern LCT loads.
              </li>
              <li>
                <strong className="text-white">Rated capacity</strong> — adding
                sustained-load LCT circuits to an older CU may push it past its design
                point. The CU rated capacity (typically 80 A or 100 A) is the ceiling on
                what the installation can demand.
              </li>
            </ul>
            <p>
              The load projection is the second half of the CU conversation. Project the
              existing diversified load plus the new LCT loads against the main fuse
              rating. A common worked example:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Existing diversified load (cooking, shower, lights, sockets) — typically 40–55 A</li>
              <li>Add 7.4 kW EV charger — 32 A on the dedicated circuit</li>
              <li>Add 14 kW ASHP — typically 30 A diversified</li>
              <li>Subtract PV / BESS export contribution at peak (depends on operating profile)</li>
              <li>Result: peak diversified load often 90–110 A on a property with an 80 A or 100 A main fuse</li>
            </ul>
            <p>
              Where the projected load exceeds the main fuse rating, the supply needs
              uprating — and the supply uprating triggers the DNO precheck timeline.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Chapter 82 — the PEI system-level survey discipline</ContentEyebrow>

          <Pullquote>A PEI is a system. Survey it as a system.</Pullquote>

          <ConceptBlock
            title="The PEI survey items that don\'t exist in per-technology surveys"
            plainEnglish="A4:2026 Chapter 82 treats the hybrid install as a Prosumer\'s Electrical Installation — a coherent system. The PEI survey captures the system-level questions that per-technology surveys don\'t."
            onSite="On a hybrid install, after the per-technology survey items are captured, walk the PEI checklist. Combined load. Multi-source faults. Export coordination. Load management. Multi-source protection. The system-level survey catches what the per-technology surveys miss."
          >
            <p>PEI survey items beyond the per-technology surveys:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Combined diversified load</strong> —
                projecting the post-install peak demand including the interaction between
                PV self-consumption, BESS charge / discharge cycles, EV charging timing
                and heat pump operating profile
              </li>
              <li>
                <strong className="text-white">Multi-source fault current contribution</strong>
                {' '}— the protective device handling a fault must cope with fault current
                from the supply AND from the local sources (PV inverter, BESS, V2G)
              </li>
              <li>
                <strong className="text-white">Export coordination</strong> — which source
                exports when, particularly under variable-tariff conditions where the
                customer may want to prioritise PV export over BESS-stored export
              </li>
              <li>
                <strong className="text-white">Load management strategy</strong> — how
                PV, BESS, EV charging and heat pump are sequenced under peak demand to
                stay within the main fuse rating
              </li>
              <li>
                <strong className="text-white">Multi-source protection coordination</strong>
                {' '}— the bidirectional protective device required under 551.7.1(c) per
                source, and how the protective devices coordinate across the combined
                installation
              </li>
            </ul>
            <p>
              The PEI survey items are the discipline Chapter 82 introduces. They don\'t
              live in any per-technology chapter or survey by definition. On a hybrid
              install the PEI survey is what catches the system-level failure modes — and
              the 19th Edition is expected to deepen Chapter 82\'s requirements.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Chapter 82 (new in A4) — Prosumer\'s Electrical Installations"
            clause="Chapter 82 provides additional requirements, measures and recommendations for design, erection and verification of all types of low voltage electrical installations that include local production and/or storage of energy. Such installations are designated as Prosumer\'s Electrical Installations (PEIs) and shall comply with Chapter 82 where applicable."
            meaning="Chapter 82 makes the system-level design discipline a regulatory expectation. The survey for a hybrid install captures the system-level items as a matter of regulatory conformity, not as best-practice optionality."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Structural, access and the customer conversation</ContentEyebrow>

          <ConceptBlock
            title="Roof, BESS siting, EV chargepoint location, heat pump siting"
            plainEnglish="The structural and mechanical survey items often determine whether the install can proceed at all. Survey them properly at survey stage."
            onSite="Photograph everything. Measure where measurement applies. Walk every cable route, every access path, every install location. The contractor whose survey doesn\'t catch the structural issue carries the structural cost."
          >
            <p>Per-technology structural / mechanical survey items:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">PV roof-mount</strong> — roof condition,
                tile / slate type, fixing accessibility, structural load capacity,
                shading from chimneys / trees / adjacent buildings, azimuth and tilt
              </li>
              <li>
                <strong className="text-white">BESS siting</strong> — ventilation
                (chemistry-specific), fire detection / suppression arrangement, isolation
                accessibility, proximity to escape routes, future replacement access path
              </li>
              <li>
                <strong className="text-white">EV chargepoint location</strong> —
                proximity to parked vehicle, cable route from CU, weather protection,
                accessibility for users, vandalism risk on public-facing locations
              </li>
              <li>
                <strong className="text-white">Heat pump outdoor unit</strong> — noise
                emissions and neighbour proximity, defrost-water management,
                airflow clearance, planning constraints (size, location, listed-building
                status), service-access path
              </li>
            </ul>
            <p>
              On BESS specifically, the IET Code of Practice for Electrical Energy Storage
              Systems is the operational reference for siting decisions. Under-stairs
              cupboards, garage attics, and bedrooms are typically unsuitable. Utility
              rooms, garages with adequate ventilation, and external enclosures with fire-
              rated separation are typical acceptable locations.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>The customer conversation — converting constraints into the plan</ContentEyebrow>

          <Pullquote>Lead with the constraints, not the install timeline.</Pullquote>

          <Scenario
            title="A hybrid PV + heat pump + EV install on a 1970s housing-stock property"
            situation="A homeowner asks for a 4 kWp PV array, a 14 kW ASHP and a 7.4 kW EV chargepoint. Existing supply: TN-C-S (PME), 80 A single-phase. Existing CU: 1980s-vintage with no spare ways and Type AC RCDs only. Roof: moss-covered concrete tiles, last refurbished early 2000s. Property: not listed, no conservation area, no planning issues. DNO region: moderately constrained, 6-month queue for supply upgrade. Customer\'s preferred install date: 8 weeks."
            whatToDo="Survey produces five binding constraints. (1) Supply upgrade from 80 A to 100 A needed — DNO queue 6 months. (2) CU replacement needed — Type A or F RCBOs required for PV / heat pump loads, and spare ways needed. (3) Roof refurbishment recommended before PV install — PV life 25 years vs remaining roof life ~5–10 years. (4) PME EV install needs PEN-fault protective measure — chargepoint with integral voltage monitoring chosen at survey stage. (5) Chapter 82 PEI survey captures the load management strategy — PV self-consumption + BESS-free design means peak demand during EV charging + heat pump operation needs sequencing. Project plan: Phase 1 (months 0–6) DNO supply upgrade application + roof refurbishment by customer\'s roofer. Phase 2 (month 6–7) CU replacement + EV chargepoint install on existing supply. Phase 3 (month 7–8) PV array install on refurbished roof + heat pump install on upgraded supply. Customer-acknowledged risks: timeline driven by DNO + roof, not customer preference; BESS deferred to Phase 4 pending budget."
            whyItMatters="The contractor who quotes the 8-week customer timeline loses the project at month 1 when the DNO precheck returns. The contractor who quotes the constraint-driven plan retains the project and delivers cleanly. The honest survey is the competitive advantage; the optimistic quote is the project failure mode."
          />

          <CommonMistake
            title="Quoting before the DNO precheck returns"
            whatHappens="The installer completes the technical survey, sends the DNO precheck request, and quotes the install based on assumed DNO timelines. The precheck returns three weeks later showing a 12-month queue. The customer has already accepted the quote and paid the deposit. The contractor must either honour an unachievable timeline, refund the deposit, or renegotiate — all of which damage the customer relationship."
            doInstead="Sequence the survey workflow so the DNO precheck returns before the customer conversation that locks the quote. Submit the precheck on the day of the site survey. Schedule the quote conversation 3–4 weeks out. The precheck response is in hand by the quote conversation; the quote reflects the binding constraint; the customer conversation is the project plan, not an aspiration."
          />

          <CommonMistake
            title="Treating customer-preferred BESS siting as the design decision"
            whatHappens="The customer prefers the under-stairs cupboard for the BESS — it\'s out of sight, the cabling is short, the customer is committed. The installer agrees and fits the BESS in the cupboard. A thermal event in the BESS blocks the fire-egress route during a domestic fire. The PI insurer\'s post-event investigation finds the siting was non-compliant with the IET CoP for EESS; the contractor\'s cover is voided or repriced; the customer\'s liability claim succeeds."
            doInstead="BESS siting is a chemistry-aware safety decision, not a customer-preference decision. The IET CoP for EESS and Chapter 57 govern siting. Under-stairs cupboards in dwellings are typically fire-egress routes. The competent installer declines the customer-preferred location, proposes alternatives, and refuses the install if no acceptable location exists. The cost of declining the job is small; the cost of a fire-incident liability claim is catastrophic."
          />

          <CommonMistake
            title="Skipping the customer-acknowledged risk record"
            whatHappens="The customer chooses to proceed with PV on an ageing roof against the surveyor\'s recommendation. The contractor doesn\'t record the recommendation or the customer\'s choice. Five years later the roof fails; the PV must be removed for refurbishment; the customer claims against the contractor for the remove-and-refit cost. With no written record of the surveyor\'s recommendation, the contractor cannot defend the claim."
            doInstead="Every customer-acknowledged risk goes in writing in the survey artefact and the quote. The record describes the surveyor\'s recommendation, the customer\'s decision to proceed regardless, and the resulting limitation on warranty / scope. Sign-off by both parties at survey close. The record protects both — the customer has the design conversation in writing, the contractor has the documented decision for any later dispute."
          />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>The PI-defensible survey bundle</ContentEyebrow>

          <ConceptBlock
            title="Six items that make the survey defensible if challenged"
            plainEnglish="A complete survey artefact stands up to PI insurer scrutiny, MCS audit, and EICR challenge. Six items make it complete."
            onSite="Build the bundle as you go on every survey. Photographs from the smartphone. Measurements logged at point of measurement. DNO precheck submitted at survey close. Customer sign-off before leaving site."
          >
            <p>The six items of a PI-defensible survey:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Date, time, persons present, weather
                conditions</strong> — the contextual record
              </li>
              <li>
                <strong className="text-white">Photographs</strong> — supply intake, CU,
                proposed install locations, structural elements, pre-existing defects,
                cable routes
              </li>
              <li>
                <strong className="text-white">Measured items</strong> — main fuse
                rating, earth electrode resistance (where TT), spare CU ways, earthing
                arrangement, roof dimensions for PV
              </li>
              <li>
                <strong className="text-white">DNO precheck reference and response</strong>
                {' '}— the binding constraint in writing
              </li>
              <li>
                <strong className="text-white">Customer-acknowledged risks</strong> — the
                recommendations against and the customer\'s informed decisions to proceed
              </li>
              <li>
                <strong className="text-white">Sign-off by both surveyor and customer</strong>
                {' '}— the audit trail close
              </li>
            </ul>
            <p>
              The bundle becomes part of the project file alongside the EIC, the design
              pack, the MCS evidence, the DNO notification reference and the manufacturer
              certifications. PI underwriters increasingly differentiate cover terms based
              on the quality of this bundle — the structured-survey installer attracts more
              favourable terms than the cursory-survey installer.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'The LCT site survey is the project plan, not a technical sketch. Every binding constraint surfaced becomes a project item.',
              'Eight standing survey items: supply / earthing, DNO precheck, CU readiness, load projection, structural / mechanical, access, planning / listed-building, customer-acknowledged risks.',
              'A4:2026 Reg 722.411.4.1 deleted the "reasonably practicable" PME EV exception — the survey on every PME EV install identifies the recognised PEN-fault protective route.',
              'A4:2026 Chapter 82 makes the PEI system-level survey discipline a regulatory expectation — the hybrid install is surveyed as a coherent system.',
              'BESS siting is a chemistry-aware safety decision, not a customer-preference decision. The IET CoP for EESS and Chapter 57 govern.',
              'Customer-acknowledged risks (ageing roof, sub-optimal siting, marginal supply) go in writing in the survey and the quote, with sign-off by both parties.',
              'The PI-defensible survey bundle: date / time, photographs, measurements, DNO precheck reference, customer-acknowledged risks, sign-off. PI underwriters reward bundle quality with cover terms.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 6 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-1-section-5')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 1.5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                G98, G99 &amp; EREC G100
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-1-section-7')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.7 Building Regulations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
