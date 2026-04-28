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
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm6s6-when-agreed',
    question:
      'When must the limitations to the scope of an EICR (periodic inspection) be agreed with the client?',
    options: [
      'After the inspection, on the cert itself',
      'Before the inspection — and recorded on the cert',
      'Mid-inspection if you find something hard to access',
      'Only if the client asks for limitations to be recorded',
    ],
    correctIndex: 1,
    explanation:
      'Reg 653.2 of BS 7671:2018+A4:2026 (and GN3 Section 5) require the operational limitations and the agreed extent / scope of the inspection to be agreed with the person ordering the inspection BEFORE work starts, and then recorded on the certificate. Agreeing limitations after the fact undermines the entire premise of the inspection — the client cannot accept a scope they were never offered.',
  },
  {
    id: 'm6s6-limitation-vs-defect',
    question:
      'On an EICR you cannot lift the floor of a sealed plant room without a Permit-to-Work that the building operator will not issue today. What is the correct entry?',
    options: [
      'A C2 observation — potentially dangerous',
      'A limitation — the plant room is excluded from the inspected scope',
      'A C3 observation — improvement recommended',
      'An FI — further investigation required',
    ],
    correctIndex: 1,
    explanation:
      'A limitation is a SCOPE matter — an area, circuit or piece of equipment that was not inspected. A defect is a FINDING — something that was inspected and found wanting. Coding an un-inspected area C1/C2/C3/FI is wrong: you have no evidence to support any code on something you did not inspect. The right move is to record the plant room as an explicit operational limitation (per Reg 653.2) and recommend re-inspection of that area when access is granted.',
  },
  {
    id: 'm6s6-cert-wording',
    question:
      'You record on an EICR: "Some areas not accessible." Why is this wording inadequate under GN3?',
    options: [
      'It is fine — the cert is a summary only',
      'It is not specific — GN3 requires the limitation to identify what was excluded, why, and (implicitly) what would be needed to lift it',
      'It must be in red ink to count',
      "GN3 only requires the inspector's signature",
    ],
    correctIndex: 1,
    explanation:
      'GN3 (Section 5) and BS 7671 Appendix 6 require limitations to be SPECIFIC: which area, which circuit, which floor, which plant room, what kind of access was withheld, and the date the limitation was agreed. "Some areas not accessible" is unsigned, undated, untraceable text — useless to a future inspector, useless to a buyer\'s solicitor, useless to an insurer. The cert must let a third party walk into the property in 5 years and know exactly what was and was not looked at.',
  },
  {
    id: 'm6s6-encountered-mid-inspection',
    question:
      'Mid-EICR you find a locked DB the client never mentioned. The client is on holiday. What is the correct course of action?',
    options: [
      'Force the lock — duty of care to the occupants',
      'Code the DB C1 because it is unknown',
      'Stop, telephone the client, and either agree a new operational limitation in writing or pause the inspection until access is granted',
      'Ignore the DB and complete the rest of the cert as satisfactory',
    ],
    correctIndex: 2,
    explanation:
      'Under Reg 653.2 the limitations are agreed with the person ordering the inspection. A new limitation discovered mid-inspection requires the SAME agreement: contact the client (or their authorised representative), explain the situation, and either (a) extend the agreed limitations in writing — email is fine, dated and signed off — or (b) pause and reschedule. Neither forcing access nor coding an un-inspected DB are defensible.',
  },
  {
    id: 'm6s6-safety-observation',
    question:
      'During a routine inspection you spot a stored coil of frayed extension lead in a cupboard. It is not part of the fixed installation. What is the correct entry?',
    options: [
      'Code C1 on the cert',
      'Ignore — it is not fixed wiring',
      'Record as a safety observation, with a written recommendation that the lead be withdrawn from use — outside C1/C2/C3/FI scope',
      'Refuse to issue the cert',
    ],
    correctIndex: 2,
    explanation:
      'C1/C2/C3/FI codes apply to the FIXED installation that the EICR scopes. Items outside that scope but materially relevant to occupant safety (faulty appliances, frayed leads, blocked emergency egress, missing fire-stopping) are recorded as separate "safety observations" — Reg 653.1 expects them to be brought to the duty-holder\'s attention, but they are not coded on the schedule of inspection. The wording must be specific and the recommended remedial action stated.',
  },
  {
    id: 'm6s6-reinspection-scope',
    question:
      'A previously-issued EICR excluded the loft cabling as a limitation. The client now asks you to "lift the limitation." Which approach is right?',
    options: [
      'Re-issue the original cert, ticking off the loft circuits as satisfactory',
      'Carry out a targeted inspection of the previously-excluded scope, and issue a NEW EICR (or a clearly-marked supplementary cert) with that scope agreed, recorded, signed and dated',
      'Append a hand-written note to the back of the original',
      'Tell the client that limitations cannot be lifted',
    ],
    correctIndex: 1,
    explanation:
      'A limitation is part of the scope agreement for THAT inspection. Lifting it later means a new piece of work — a new agreed scope, a new inspection of the previously-excluded area, and a new dated and signed certificate (or a clearly-marked supplementary). The original cert is a fixed historical record and cannot retrospectively gain inspected scope.',
  },
  {
    id: 'm6s6-builder-mortgage',
    question:
      "A buyer's solicitor receives an EICR with an operational limitation excluding all under-floor cabling on the ground floor. What is their reasonable next step?",
    options: [
      'Treat the cert as satisfactory — limitations are normal',
      'Demand the seller commission a follow-up inspection covering the previously-excluded scope',
      'Ignore the limitation entirely',
      'Refuse to complete the sale outright',
    ],
    correctIndex: 1,
    explanation:
      'A cert with a material limitation describes what WAS NOT inspected as much as what was. Buyers, insurers, mortgage providers and Building Control are entitled to commission additional work to close the unknown. Drafting limitations carefully (specific, dated, justified) protects the inspector — the client can see the gap and decide; the inspector has not over-claimed coverage they did not deliver.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which BS 7671 regulation specifically requires limitations to the scope of a periodic inspection to be agreed with the person ordering the inspection?',
    options: ['Reg 651.1', 'Reg 653.1', 'Reg 653.2', 'Reg 643.1'],
    correctAnswer: 2,
    explanation:
      'Reg 653.2 of BS 7671:2018+A4:2026 requires the operational limitations and the agreed extent / scope of the inspection to be agreed with the person ordering it. Reg 651.1 sets the EICR objective. Reg 653.1 covers the general requirement to record observations and recommendations. Reg 643.1 covers initial verification (EIC), not periodic inspection (EICR).',
  },
  {
    id: 2,
    question: 'Which of these statements about a "limitation" on an EICR is CORRECT?',
    options: [
      'A limitation is a defect found during inspection',
      'A limitation is a scope exclusion — an area, circuit or piece of equipment that was not inspected',
      'A limitation must always be coded C2',
      'A limitation can be agreed verbally and need not be recorded',
    ],
    correctAnswer: 1,
    explanation:
      'A limitation is part of the inspection SCOPE agreement: it describes what was NOT inspected. Defects (codable findings) are entirely separate. GN3 (Section 5) requires limitations to be specific, dated, and recorded on the certificate so a third party (buyer, insurer, mortgage provider, Building Control) can read the cert and understand exactly what coverage they are receiving.',
  },
  {
    id: 3,
    question:
      'A client tells you "do not inspect the kitchen — the chef is plating up". You agree, do not inspect the kitchen, and issue the cert. Which entry on the cert is most defensible?',
    options: [
      'Mark the cert as overall "Unsatisfactory" because the kitchen was not done',
      'Tick all schedule-of-inspection items as "LIM" (limitation) for the kitchen, list "Kitchen — operational limitation, agreed with [client name] [date], inspection deferred" in the limitations section',
      'Leave the kitchen schedule rows blank',
      'Tick the kitchen items as "satisfactory" based on the rest of the property',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 / BS 7671 Appendix 6 require un-inspected items to be marked LIM (limitation) on the schedule of inspection, NOT left blank, NOT ticked satisfactory, NOT inferred from elsewhere. The limitations section of the cert names the specific area, the reason, the agreed-with party and the date. Leaving rows blank is the single most common failure point and the easiest to spot on a poorly-issued cert.',
  },
  {
    id: 4,
    question: 'Which of these is a "safety observation" rather than a coded EICR observation?',
    options: [
      'A 32 A socket-outlet circuit on a TN-C-S installation with no 30 mA RCD additional protection',
      'A measured Zs of 1.45 Ω on a 32 A Type B MCB (max permitted ~1.37 Ω)',
      'A frayed portable extension lead stored in a cupboard, not part of the fixed installation',
      'A missing CPC at a metal-cased luminaire',
    ],
    correctAnswer: 2,
    explanation:
      'C1/C2/C3/FI codes apply to the fixed installation within the agreed scope. Portable equipment (PAT scope), stored materials, blocked egress, missing fire-stopping etc. fall outside that scope but are still safety-relevant — they are recorded as separate safety observations under Reg 653.1, with a clear recommendation, but not coded against the fixed installation. The other three options are all in-scope codable findings.',
  },
  {
    id: 5,
    question:
      'A previously-issued EICR contained 4 limitations and 6 C3 observations and was overall coded "Satisfactory". Re-inspection in 5 years finds that one of the previously-limited circuits has a C2 defect. Who carries the risk for the gap?',
    options: [
      'The original inspector — limitations are not a defence',
      'The duty-holder (client) — they accepted the agreed scope when commissioning the original EICR; the C2 was simply not within that scope to find',
      'The DNO — they issued the supply',
      'The new inspector who finds the C2',
    ],
    correctAnswer: 1,
    explanation:
      'A clearly-recorded limitation transfers the residual unknown back to the duty-holder. They commissioned a scope, the inspector delivered against that scope, and the duty-holder chose to accept the un-inspected gap. The reason the cert documents limitations specifically is precisely to make this allocation explicit. The original inspector is only exposed where the limitation was vague, missing, or where they over-claimed coverage they did not deliver.',
  },
  {
    id: 6,
    question:
      'Reg 651.1 of BS 7671:2018+A4:2026 states the objective of a periodic inspection. Which of these is NOT one of its stated objectives?',
    options: [
      'To detect defects which may give rise to danger',
      'To record any installation damage, deterioration, defects or dangerous conditions',
      'To verify the installation is suitable for continued service',
      "To extend the original installer's 12-month warranty",
    ],
    correctAnswer: 3,
    explanation:
      "Reg 651.1 sets four EICR objectives: (a) detect defects which may give rise to danger, (b) provide for the safety of persons and livestock against electric shock and burns, (c) protect against damage to property by fire and heat from a defective installation, and (d) confirm whether the installation is suitable for continued use. The original installer's commercial warranty is not in scope — BS 7671 is technical, not contractual.",
  },
  {
    id: 7,
    question:
      'You complete an EICR with no limitations, but mid-way you found that the meter cupboard contained asbestos lagging on the meter tails. You did not disturb the lagging. Which entry is correct?',
    options: [
      'Code C1 — danger present',
      'Code FI — further investigation required, with a clear written observation that asbestos is suspected and a competent asbestos survey is recommended before any future intrusive work; record an operational limitation excluding any disturbed cabling within the meter cupboard',
      'Ignore — asbestos is not in the BS 7671 scope',
      'Refuse to issue the cert',
    ],
    correctAnswer: 1,
    explanation:
      "Asbestos is not directly an electrical danger but it materially affects future intrusive work — the next inspector / installer needs to know before they touch anything. The right combination is FI (further investigation), a specific safety observation, AND an operational limitation excluding the cupboard from the scope you delivered. Reg 653.1 expects safety observations of this kind to be brought to the duty-holder's attention; ignoring it would be a clear failure of duty.",
  },
  {
    id: 8,
    question:
      'On the schedule of inspection for an EICR, what does the entry "LIM" against an item indicate?',
    options: [
      'Limited rating — the device is undersized',
      'Limitation — the item was not inspected within the agreed scope of this inspection',
      'Linear — the circuit is purely resistive',
      'Limit value — the maximum permitted Zs',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Appendix 6 schedule-of-inspection rows accept the responses ✓ (acceptable), ✗ (not acceptable), N/A (not applicable to this installation) and LIM (limitation — item not inspected). LIM is critically distinct from N/A: N/A says the item does not exist or is not relevant; LIM says it does exist but was excluded from the agreed scope. Mixing the two is a common cert-quality failure.',
  },
];

const faqItems = [
  {
    question: 'Where exactly on the EICR do limitations get recorded?',
    answer:
      'Two places, both required. (1) The "Extent of the installation covered by this report" / "Limitations of the inspection" boxes on the front page — written-prose, specific, dated, named. (2) The schedule of inspection — every individual row that falls inside the limitation gets the response "LIM" (NOT left blank, NOT ticked, NOT N/A). GN3 (Section 5) is explicit on both. The two have to match: a front-page limitation that excludes the loft cabling but a schedule that ticks loft circuits as satisfactory is internally inconsistent and undermines the cert.',
  },
  {
    question:
      'Is there a maximum percentage of an installation that can be limited before the cert is meaningless?',
    answer:
      'BS 7671 does not set a numerical threshold. GN3 instead invites professional judgement: if the limitations are so extensive that the cert no longer meets its Reg 651.1 objective (detecting danger across the installation), the inspector should consider declining to issue the cert at all and recommending the inspection be re-scoped. As a practical rule of thumb, when key safety items (origin, MET, main switch, RCDs, distribution circuits, earthing arrangement) cannot be verified, the cert ceases to provide meaningful safety assurance.',
  },
  {
    question: 'Can the inspector lift a limitation later without re-inspecting?',
    answer:
      'No. A limitation is part of the agreed scope of THAT inspection — a fixed historical record. To "lift" the limitation is to inspect what was previously excluded; that requires a separate, agreed, dated piece of work and a new (or clearly-marked supplementary) certificate covering that newly-inspected scope. The original cert remains as it was issued. Hand-amending an issued cert to fill a previously-limited row is, at best, a serious cert-quality failure and, at worst, a fraudulent misrepresentation.',
  },
  {
    question: 'Do limitations apply to EICs (initial verification) as well as EICRs?',
    answer:
      'EIC scope is normally the new installation work the installer just completed — there is no equivalent "limitations" concept because the installer chose what to put in. However, the equivalent on the EIC is the "Extent of the installation covered by this certificate" box: if you only re-wired the kitchen, the cert covers only the kitchen, and that fact must be specific. EICRs (Reg 653) introduce the formal limitations framework precisely because someone other than the original installer is inspecting against an unknown installation.',
  },
  {
    question: 'How is a "safety observation" different from a coded C1/C2/C3/FI observation?',
    answer:
      'C1/C2/C3/FI codes attach to specific items within the scope of the EICR — fixed installation defects against the in-force edition. Safety observations under Reg 653.1 are wider: things the inspector noticed that are materially safety-relevant but outside the EICR scope (faulty portable equipment, blocked emergency egress, missing fire-stopping, suspected asbestos, structural concerns affecting electrical safety). They are recorded as written observations on the cert with a clear recommendation but are NOT coded against the schedule of inspection. Both have legal weight: ignoring either is a duty-of-care failure.',
  },
  {
    question: 'Should I record limitations even if the client says "just do what you can"?',
    answer:
      'Yes — and especially then. A vague client direction is the classic precursor to a dispute. Translate "do what you can" into a written, dated, signed-off scope before you start: walk the site with the client, identify every area / circuit / DB that is and is not in scope, send a confirmation email, get acknowledgement, then carry out the inspection. Reg 653.2 places the duty on the inspector to AGREE the scope — verbal goodwill is not agreement under BS 7671.',
  },
  {
    question: 'What does GN3 say about the wording of limitations?',
    answer:
      'GN3 (Section 5) requires the wording to be sufficient that a third party reading the cert in five years can identify exactly what was and was not inspected. That means: (a) named area / circuit / DB / floor, (b) reason for the limitation (access denied, sealed equipment, live and unable to isolate, time, environmental), (c) date of the limitation agreement, (d) named party with whom it was agreed, and (e) the recommended action to lift it (typically re-inspection at a specified time / on access restoration). "Some areas not accessible" fails on every count.',
  },
  {
    question: 'Does the cert get used for things outside electrical safety?',
    answer:
      'Yes — heavily. EICRs are commissioned by buyers\' solicitors, insurers (especially after fires), mortgage providers, landlord licensing authorities, Building Control on changes of use, and HSE in incident investigations. The cert is treated as the documented record of what the inspector saw and what scope was agreed. Limitations and safety observations do not "look bad" — they are exactly the mechanism by which the cert remains honest. A clean cert with no limitations on a complex installation often raises more questions than a careful cert with several specific, dated limitations.',
  },
  {
    question: 'Can a client request that I omit limitations to make the cert "look cleaner"?',
    answer:
      'No. The duty under Reg 653.2 to record limitations is on the inspector, not the client. Issuing a cert without recording the limitations the inspector agreed with the client (or imposed by physical constraints) is a falsification of the inspection record — it overstates the coverage delivered and exposes the inspector to liability if a defect later surfaces in the un-recorded gap. If a client insists on a "clean" cert, the correct response is to inspect the full scope (no limitations needed) or decline to issue the cert.',
  },
];

const BS7671Module6Section6 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Recording Limitations and Safety Observations | BS 7671:2018+A4:2026 | Module 6.6',
    description:
      'How to record EICR limitations (Reg 653.2) and safety observations (Reg 653.1) on BS 7671 certificates — agreed scope, specific wording, the difference between a limitation and a defect, and how the cert is used downstream.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 6"
            title="Recording limitations and safety observations"
            description="Limitations are the agreed scope exclusions of an inspection; safety observations are everything safety-relevant outside the C1/C2/C3/FI coding scheme. Get the wording specific, the date right, and the third-party reader will know exactly what the cert does and does not cover."
            actions={
              <>
                <RegBadge>653.2</RegBadge>
                <RegBadge>653.1</RegBadge>
                <RegBadge>651.1</RegBadge>
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'A limitation is a SCOPE matter (what was NOT inspected). A defect is a FINDING (what was inspected and found wanting). The two are recorded in different places on the cert and never overlap.',
              'Reg 653.2 requires limitations to be agreed with the person ordering the inspection BEFORE the work — and recorded on the cert. Mid-inspection discoveries require fresh agreement.',
              'Safety observations under Reg 653.1 are everything materially safety-relevant outside the EICR scope (portable equipment, fire-stopping, asbestos, egress) — recorded with specific wording but NOT coded C1/C2/C3/FI.',
              'GN3 / BS 7671 Appendix 6 require limitations to be specific, dated, named, and traceable. "Some areas not accessible" fails the test; a third party reading the cert in 5 years must know exactly what was and was not looked at.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define a limitation, distinguish it from a defect, and record both correctly under Reg 653.2 and the schedule of inspection (BS 7671 Appendix 6).',
              'Apply Reg 653.2: agree limitations with the client BEFORE the inspection, record them in writing, and refresh the agreement when new limitations emerge mid-inspection.',
              'Identify common limitations in domestic, commercial and industrial work — sealed plant rooms, encapsulated DBs, occupied premises, time and access constraints, environmental risk.',
              'Distinguish a coded EICR observation (C1/C2/C3/FI) from a safety observation under Reg 653.1, and write each correctly with specific, actionable wording.',
              'Manage re-inspection scope when a previously-issued cert had limitations — issue a new (or clearly-marked supplementary) cert rather than amending the original.',
              'Understand how third parties (buyers, insurers, mortgage providers, Building Control, HSE) read the cert downstream, and how careful limitation wording protects both the duty-holder and the inspector.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The two ideas that get mixed up</ContentEyebrow>

          <ConceptBlock
            title="Limitation vs defect — the cleanest distinction in BS 7671 cert work"
            plainEnglish="A limitation is part of the SCOPE agreement — what was not inspected, by agreement or necessity. A defect is what you found WHEN you did inspect. They are different categories of information and they go in different boxes on the cert."
            onSite="Mid-inspection you can usually feel which is which: if you put your testers on it and got a number, it's a finding (defect, satisfactory, or whatever the result was). If you never opened the door / lifted the cover / energised the circuit, it's a scope matter — a limitation."
          >
            <p>
              The reason BS 7671:2018+A4:2026 separates the two is simple: a coded observation (C1,
              C2, C3 or FI) requires evidence — you saw the thing, you tested the thing, you have
              the measurement or the photograph or the visual confirmation that supports the code. A
              limitation explicitly DOES NOT have that evidence — by definition the inspection
              didn't happen. Coding an un-inspected item C1/C2/C3 is wrong because the basis for the
              code is missing. Leaving an un-inspected item blank or ticking it satisfactory is also
              wrong because it overstates the coverage of the cert. The schedule of inspection
              accordingly has a fourth response — "LIM" — purely to mark un-inspected items.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>The Reg 653.2 agreement — before the inspection</ContentEyebrow>

          <ConceptBlock
            title="Limitations are agreed BEFORE the inspection — Reg 653.2"
            plainEnglish="The cardinal rule. Walk the site, agree the scope, get it in writing, then start. Limitations agreed after the fact are by definition not agreed at all — the client never had a chance to accept or refuse the scope they were supposedly buying."
            onSite="Practical: a 5-line scope email, sent to the client BEFORE arrival, naming the property, the agreed in-scope areas / circuits / DBs, the agreed out-of-scope items (with reason), the date of the inspection, and a one-line acknowledgement request. Their reply is the contract for that inspection."
          >
            <p>
              Reg 653.2 of BS 7671:2018+A4:2026 places the duty on the inspector to agree the
              operational limitations and the extent of the inspection with the person ordering it
              BEFORE the work, and then to record those agreed limitations on the certificate. The
              wording matters — "person ordering" is not always the duty-holder, and is rarely the
              occupant. On a landlord EICR it is the letting agent or landlord; on a commercial EICR
              it is the building manager or facilities lead; on a domestic sale it is the seller or
              their solicitor. Get the named person right on the cert; vague "homeowner" entries
              undermine traceability.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 653.2 — Agreement of limitations"
            clause="The operational limitations and the extent of the inspection covered by the report shall be agreed between the person ordering the report and the inspector before the inspection commences, and recorded on the report."
            meaning="The duty is two-part and sequential: (1) AGREE the scope and limitations BEFORE work starts, (2) RECORD them on the cert. Agreement is not optional, is not retrospective, and is not satisfied by an unwritten verbal exchange. The cert itself is the audit trail."
            cite="BS 7671:2018+A4:2026, Reg 653.2 (Periodic Inspection)"
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>
            The objective Reg 651.1 sets — and why limitations matter against it
          </ContentEyebrow>

          <ConceptBlock
            title="What is the EICR actually FOR? — Reg 651.1"
            plainEnglish="Periodic inspection has four jobs: detect defects that could cause danger, protect persons and livestock from shock and burns, protect property from fire and heat from a defective installation, and confirm whether the installation is suitable for continued use."
            onSite="Read in light of Reg 651.1, a limitation is not just an admin entry — it is a defined gap in the inspector's ability to deliver against those four objectives. That is why GN3 takes the wording so seriously. Each limitation is, in effect, a written admission that one of the four objectives may not be fully satisfied for the limited area."
          >
            <p>
              Reg 651.1 of BS 7671:2018+A4:2026 is the objective clause for the entire EICR process:{' '}
              <strong>(a)</strong> detection of defects which may give rise to danger,
              <strong> (b)</strong> provision for the safety of persons and livestock against the
              effects of electric shock and burns, <strong>(c)</strong> protection against damage to
              property by fire and heat arising from a defective installation, and
              <strong> (d)</strong> confirmation that the installation is not damaged or
              deteriorated so as to impair safety, and that defects and non-compliance with the
              regulations are identified. Read against this, every limitation is a gap in coverage
              against one or more of (a)–(d). That is why limitations matter, why they have to be
              specific, and why a cert riddled with vague limitations against critical safety items
              loses its meaning.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Common limitations — what shows up in the field</ContentEyebrow>

          <ConceptBlock
            title="Sealed plant rooms, encapsulated DBs, attic / loft cabling"
            plainEnglish="There is a recurring set of limitations the working inspector sees on most jobs: areas that physically cannot be opened, cabling that cannot be reasonably accessed without significant intrusion, DBs that have been sealed by a different trade, and live equipment that cannot be isolated."
            onSite="The pattern: domestic — under-floor cabling on a fitted-out ground floor, loft cabling under deep insulation, fitted kitchen wiring behind cabinetry, encapsulated supplementary DBs in airing cupboards. Commercial — sealed plant rooms requiring Permit-to-Work, IP-rated cabinets without keys on site, retail occupied trading hours. Industrial — high-bay lighting requiring scissor lifts not present on the day, MCC cabinets that cannot be de-energised mid-shift."
          >
            <p>
              The job is not to eliminate limitations — most are unavoidable on most installations —
              it is to record them with enough specificity that a future reader can act on them.
              "Loft cabling not accessible — agreed with [client name] [date], cabling buried under
              insulation, recommend re-inspection if loft is cleared in future" is correct; "loft
              not done" is not. Similarly "kitchen ring final circuit accessories behind fitted
              units inspected via accessory removal at sockets only — concealed cable runs not
              verified beyond accessory positions" is specific and traceable; "kitchen partly
              inspected" is not.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Time, occupancy and environmental limitations"
            plainEnglish="Some limitations are imposed by the situation rather than the structure: a tenant who refuses access to one bedroom, a chef plating up in a working kitchen, a shop floor that cannot be partially de-energised during trading, a substation that requires DNO attendance to access."
            onSite="The fix is the same: name the area, name the reason, name the agreed-with party, name the date, recommend the action that would lift it. Time and occupancy limitations are usually the easiest to lift on a follow-up visit and the most worth flagging clearly to the client so they can plan a re-inspection."
          >
            <p>
              Environmental limitations — flooded basements, suspected asbestos, structural concerns
              affecting access — overlap with safety observations under Reg 653.1. The pattern is to
              record both: an operational limitation excluding the area from the inspected scope,
              AND a safety observation drawing attention to the underlying environmental hazard with
              a recommended remedial route (asbestos survey, structural engineer, water management).
              Both entries must be specific, dated and traceable.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>The wording — what GN3 expects on the cert</ContentEyebrow>

          <ConceptBlock
            title="Five elements every limitation entry needs"
            plainEnglish="(1) Named area / circuit / DB / floor. (2) Reason — access denied, sealed, live, time, environmental. (3) Date of the limitation agreement. (4) Named party with whom it was agreed. (5) Recommended remedial action to lift the limitation (re-inspection on access, post-strip-out, etc.)."
            onSite="A useful template: '[Specific item / area] — operational limitation, agreed with [named person] on [date], [reason]. Recommended action: [action to lift].' Five lines, traceable, defensible. The schedule of inspection mirrors the entry by responding LIM on every row that falls within the named scope of the limitation."
          >
            <p>
              GN3 (Section 5) treats limitations as binding scope agreements — they have legal
              weight because they define what the cert claims to cover. Vague wording creates
              ambiguity in exactly the situation where ambiguity is most expensive: a downstream
              dispute about whether a defect later found in a previously-uninspected area "should"
              have been picked up. Specific wording closes that question conclusively. The same
              specificity also helps the client: they can read the cert, identify the gaps, and
              decide whether to commission additional work to close them.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 653.1 — Recording of observations"
            clause="The condition of the installation in terms of electrical safety shall be reported. Any damage, deterioration, defects, dangerous conditions and non-compliance with the requirements of the Regulations which may give rise to danger shall be recorded."
            meaning="The general duty: record everything safety-relevant. This is the reg that pulls in both coded EICR observations (C1/C2/C3/FI) and the wider safety observations that fall outside the coding scheme. The threshold is 'may give rise to danger' — if it could, it gets recorded."
            cite="BS 7671:2018+A4:2026, Reg 653.1 (Periodic Inspection)"
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Safety observations — outside the C1/C2/C3/FI scheme</ContentEyebrow>

          <ConceptBlock
            title="What gets recorded as a safety observation rather than a coded observation"
            plainEnglish="C1/C2/C3/FI codes apply to the FIXED installation within the agreed EICR scope. Safety observations capture everything else: faulty portable equipment, frayed leads, missing fire-stopping, blocked emergency egress, suspected asbestos, structural concerns affecting electrical safety, anything that materially affects occupant safety but is not a fixed-installation defect against the in-force edition."
            onSite="The test: 'Is this a defect of the fixed installation, in scope, against BS 7671:2018+A4:2026?' If yes, it gets a code. If it is safety-relevant but does not meet that test (PAT-scope item, fire-safety scope item, asbestos, structural), it is a safety observation under Reg 653.1 — a written entry with specific wording and a recommended action, but not coded."
          >
            <p>
              The split exists because coded observations carry specific contractual and insurance
              implications: a C1 may require immediate isolation, a C2 typically requires a fixed
              remedial timescale, a C3 is non-urgent improvement and an FI is targeted further work.
              Each of those codes assumes the inspector saw, tested, and judged the item against the
              regulations. Wider safety observations sit outside that framework — they are still
              binding (the inspector has a duty to flag them), but they are flagged in narrative
              prose rather than in the coded schedule.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="How to word a safety observation"
            plainEnglish="Specific, factual, recommended-action-led. 'Frayed extension lead stored in cupboard 1F-03 — recommend withdrawal from use and replacement.' 'Suspected asbestos lagging on meter tails in main intake cupboard — recommend competent asbestos survey before any future work in this cupboard.' 'Emergency egress route 1G-02 partially blocked by stored items — recommend clearance and review of fire-safety procedures.'"
            onSite="Aim for the language a competent person could action without further interpretation. Avoid coding language ('C2', 'potentially dangerous') because those words have specific cert-coding meanings — using them in narrative observations creates ambiguity. Use plain risk and recommendation language instead."
          />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Mid-inspection discoveries — handling new limitations</ContentEyebrow>

          <ConceptBlock
            title="What to do when a limitation appears mid-inspection"
            plainEnglish="Stop the relevant part of the work, contact the person who ordered the inspection (or their authorised representative), agree the new limitation in writing, and record both the agreement and the limitation on the cert. New limitations are not 'discovered' as a one-sided act of the inspector — they are agreed exactly the same way as pre-inspection limitations."
            onSite="The simplest mechanism: a short email or message thread. Inspector messages: 'On site at [property]. Found a locked DB in cupboard 2F-04 that was not in our pre-inspection scope. Two options — (a) we add this DB as an operational limitation to today's EICR, OR (b) we pause and reschedule once you can provide the key. Please confirm preference.' Their reply is the new agreement. Saved with the job file, dated, traceable."
          >
            <p>
              The reason mid-inspection limitations have to follow the same pattern is that Reg
              653.2 doesn't carve out an exception for them — the duty to AGREE the limitation
              applies whenever a limitation is being added to the cert. Inspectors who unilaterally
              decide to add an item as a limitation, without consulting the person who ordered the
              inspection, are technically issuing a cert that doesn't comply with Reg 653.2 even if
              the limitation itself is clearly recorded. Practically, the agreement is usually
              quick; legally, it has to happen.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Re-inspection scope — lifting a previous limitation</ContentEyebrow>

          <ConceptBlock
            title="A limitation is part of a fixed historical record — to lift it, do new work"
            plainEnglish="The original cert is what it was when issued. To 'lift' a previous limitation is to inspect what was previously excluded — that is new work, against a new agreed scope, recorded on a new cert (or a clearly-marked supplementary cert). The original cert keeps its limitations forever."
            onSite="The model: a 5-yearly EICR is issued today with a limitation excluding the loft cabling. Two years later the client clears the loft and asks for that previously-excluded scope to be inspected. The right deliverable is either (a) a fresh full EICR (covering everything plus the loft), or (b) a targeted supplementary cert covering only the loft, clearly cross-referenced to the original. Hand-amending the original is not acceptable."
          >
            <p>
              This pattern matters because the cert is used downstream as a fixed historical record:
              by buyers' solicitors checking what was inspected at a given point in time, by
              insurers reviewing the property's safety history, by mortgage providers assessing
              risk. If certs could be retrospectively amended, none of those uses would be reliable.
              Reg 653 implicitly assumes a one-shot issuance: agree, inspect, record, sign, date,
              issue — done. Subsequent inspections create new certs, which may reference the
              originals but do not edit them.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>How the cert gets used downstream</ContentEyebrow>

          <ConceptBlock
            title="Buyers, insurers, mortgage providers, Building Control, HSE"
            plainEnglish="The cert is rarely read only by the client. Property sales push the cert through buyers' solicitors. Insurance claims, especially after fires, pull the most recent EICR into the loss-adjuster's review. Mortgage providers ask for the cert as part of a property risk assessment. Building Control reference the cert on changes of use, additions, or notifiable work. HSE pull the cert in incident investigations under EAWR 1989."
            onSite="The implication: every limitation is read by someone with no direct experience of the installation. The wording has to stand on its own. 'Some areas not accessible' tells a downstream reader nothing useful; 'Loft cabling not accessible — agreed with Mr. Jones on 14 March 2026, cabling buried under insulation — recommend re-inspection if loft is cleared' tells them exactly what was excluded, why, by whom, and what to do next."
          >
            <p>
              A common worry from less-experienced inspectors is that limitations make the cert
              "look bad" or commercially weaker. The opposite is generally true. A cert with no
              limitations on a complex installation often raises more questions than a careful cert
              with several specific, dated limitations — downstream readers experienced in cert
              review (insurers, mortgage providers' panel surveyors) will rapidly identify the
              former as either impossibly thorough or carelessly issued, and will commission their
              own follow-up inspection at the seller's expense. A clean, specific limitations
              section is, paradoxically, a sign of a careful inspector.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Coding an un-inspected item C1/C2/C3"
            whatHappens="An inspector finds a locked DB they couldn't access. Frustrated by the lack of access, they code it C2 'potentially dangerous' on the cert as a way of pushing the client to provide access on a follow-up. The next inspector reads the cert, treats the C2 as evidence-based, and now has to defend a finding that was never substantiated by inspection."
            doInstead="Un-inspected items are limitations, not codes. Mark the schedule rows LIM, record an operational limitation on the front page of the cert with the five required elements (named area, reason, date, agreed-with party, recommended action), and let the limitation do its job. If the inspector wants to push the client toward re-inspection, the recommended-action element of the limitation is the right tool — not a misapplied code."
          />

          <CommonMistake
            title="'Some areas not accessible' as a limitation"
            whatHappens="The cert lists vague limitations — 'some areas not accessible', 'parts of the installation not inspected', 'time-limited inspection'. A defect later surfaces in one of the un-inspected areas and the buyer's solicitor argues that the limitation was so vague it failed to give meaningful notice. The inspector has no traceable record of what was actually agreed."
            doInstead="Every limitation entry uses the GN3-mandated five elements: named area / circuit / DB / floor, reason, date, agreed-with party, recommended remedial action. The wording is specific enough that a third party reading the cert in five years can identify exactly what was and was not inspected and act accordingly."
          />

          <CommonMistake
            title="Hand-amending an issued cert to fill in a previously-limited row"
            whatHappens="A client asks for the loft cabling (previously excluded as a limitation) to be inspected and the loft schedule rows ticked on the original cert. The inspector ticks the rows in pen and initials the change. Two years later a buyer's solicitor spots the in-pen amendments and challenges the cert as falsified. The inspector has no defensible audit trail."
            doInstead="A limitation is part of a fixed historical record. To inspect what was previously excluded, issue either a fresh full EICR or a clearly-marked supplementary cert covering the newly-inspected scope, cross-referenced to the original. The original cert is left as it was. Pen-amendments to issued certs are at best a serious cert-quality failure and at worst a fraudulent misrepresentation."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Tenant restricts access to a single bedroom mid-EICR"
            situation="On a 5-yearly landlord EICR you reach the second floor and the tenant refuses access to the master bedroom. The agreed scope (per the pre-inspection email with the letting agent) covered the full property. The tenant is the occupant but not the person who ordered the inspection — that is the letting agent."
            whatToDo="Stop work on that room. Telephone or email the letting agent (the person who ordered the inspection) to agree a new operational limitation excluding the master bedroom from today's scope, with the reason ('access withheld by tenant on day of inspection'), the date, and a recommended action ('re-inspection of master bedroom required when tenant access can be arranged'). Get the letting agent's confirmation in writing. Record on the cert in the limitations section, mark all schedule-of-inspection rows for accessories / circuits in that room as LIM. Issue the cert with the limitation properly recorded; flag to the letting agent that follow-up inspection is required."
            whyItMatters="Reg 653.2 places the agreement duty on the inspector, not the tenant — and the agreement is with the person who ORDERED the inspection, not the occupant. Recording a tenant-imposed limitation without going back to the letting agent technically fails Reg 653.2 even if the limitation wording is otherwise correct. The five-minute email is the difference between a defensible cert and a procedurally-flawed one."
          />

          <Scenario
            title="Suspected asbestos in the meter cupboard"
            situation="On a domestic EICR you open the meter cupboard and notice what looks like asbestos lagging on the meter tails. You have not disturbed the lagging. You can take the readings you need (Ze, PFC at the origin) without contact with the lagging. The rest of the property is unaffected."
            whatToDo="Three concurrent entries on the cert. (1) An operational limitation excluding any further inspection of the meter cupboard interior beyond the readings already taken — 'Meter cupboard interior, suspected asbestos lagging on meter tails — no further intrusive inspection. Agreed with [client name] [date]. Recommended action: competent asbestos survey before any future work in this cupboard.' (2) A safety observation under Reg 653.1 drawing attention to the suspected asbestos and recommending an asbestos survey. (3) An FI (further investigation) on the schedule for the cupboard interior — the cert reader now has unambiguous notice that this part of the installation needs a different professional before electrical work can resume there."
            whyItMatters="Asbestos is not directly an electrical hazard, but it materially affects future intrusive electrical work. The next inspector / installer needs to know before they touch anything. Combining the three entries (limitation, safety observation, FI) gives the cert reader a complete picture: scope of today's inspection, safety risk to be managed, and the action required before further electrical work can take place. Each entry on its own is incomplete; together they discharge the inspector's duty."
          />

          <SectionRule />

          <ContentEyebrow>Where this fits in BS 7671 — Appendix 6 and GN3</ContentEyebrow>

          <ConceptBlock
            title="The cert forms — Appendix 6 of BS 7671:2018+A4:2026"
            plainEnglish="Appendix 6 sets out the model EIC, EICR and Minor Works forms. The EICR form has a dedicated 'Extent of the installation covered by this report' box, a dedicated 'Limitations of the inspection' box, the schedule of inspection (with LIM as a recognised response), and the schedule of test results. Use the model form — A4 also adds new columns to the schedule (AFDD, supplementary bonding) which must be present."
            onSite="Software-issued certs already incorporate the Appendix 6 layout — but the wording goes in the inspector's hands. The form is a structure, not a substitute for the careful prose Reg 653 expects. Pre-printed templates that say 'see attached schedule' for limitations are not a valid limitation entry — the limitations themselves must be written, specific, and named."
          >
            <p>
              GN3 (the IET's Guidance Note 3 — Inspection &amp; Testing) is the canonical commentary
              on how to apply Reg 653 in the field. Section 5 of GN3 deals with limitations and
              observations specifically. It is the document that operationalises the regs into
              cert-writing practice — and is the document a competence assessor will cross-check
              against if the cert quality is ever challenged. GN3 is not the law (Reg 120.3 makes
              clear that BS 7671 itself is the standard), but it is the working interpretation of
              the regs, and certs that diverge from GN3 typically do so for the worse.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The schedule of inspection responses — ✓, ✗, N/A and LIM"
            plainEnglish="Four valid responses on the BS 7671 Appendix 6 schedule of inspection. ✓ (acceptable). ✗ (not acceptable — generates an observation). N/A (not applicable to this installation — the item does not exist). LIM (limitation — the item exists but was not inspected within the agreed scope)."
            onSite="The most-confused pair is N/A vs LIM. N/A says 'this installation has no such item — there is nothing to inspect'. LIM says 'this installation HAS such an item but it was not inspected today'. Mixing the two is a common cert-quality failure: a buyer's solicitor reading N/A for a circuit they know exists immediately spots the inconsistency."
          >
            <p>
              A clean schedule of inspection has every row populated with one of the four valid
              responses — never blank. Blank rows are the single most common cert-quality failure
              and the easiest for an experienced cert reader to spot. The combination of a clean
              schedule (every row has a response) and a clean limitations section (every LIM row on
              the schedule has a corresponding written limitation entry that names it) is what a
              competence assessor or panel surveyor is looking for.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The inspector's checklist before signing</ContentEyebrow>

          <ConceptBlock
            title="Before you sign the cert — six checks against Reg 653 and GN3"
            plainEnglish="(1) Were the limitations agreed with the person ordering the inspection BEFORE work started? (2) Are they recorded on the cert with the five required elements (area, reason, date, party, recommended action)? (3) Does every LIM row on the schedule have a corresponding written limitation entry? (4) Does every coded observation (C1/C2/C3/FI) have evidence (test result, visual, photograph)? (5) Are safety observations recorded for material safety items outside the EICR scope (PAT, fire, asbestos, egress)? (6) Are name, position, signature and date complete?"
            onSite="The pattern: cert quality is mostly about discipline, not knowledge. The regs are clear; the gap is whether the inspector has actually walked the cert against the checklist before signing. Six checks, two minutes, before you save and email — and the cert is defensible against any downstream reader."
          >
            <p>
              Reg 653 is a small section of BS 7671 — a few clauses — but the surrounding GN3
              guidance and Appendix 6 form structure make it one of the highest-leverage parts of
              the regs in commercial reality. Every cert in the field is read by someone, often
              years after issue, often in a context (sale, insurance claim, incident investigation)
              where the original inspector is unavailable to clarify. The cert has to do its own
              talking. A careful Reg 653 entry — limitations specific, observations evidenced,
              safety observations narrated — is what makes that possible.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Limitation = scope (what was NOT inspected). Defect = finding (what was inspected and found wanting). They live in different boxes on the cert and never overlap.',
              'Reg 653.2 — agree limitations with the person ordering the inspection BEFORE work starts and RECORD them on the cert. New limitations discovered mid-inspection require fresh agreement, same as pre-inspection ones.',
              'Reg 653.1 — record everything safety-relevant. Coded observations (C1/C2/C3/FI) for in-scope fixed-installation defects; safety observations for items outside the EICR scope (portable equipment, fire-stopping, asbestos, egress).',
              'GN3 / BS 7671 Appendix 6 — every limitation entry must be specific (named area), reasoned, dated, named (with whom agreed), and recommend an action. "Some areas not accessible" fails on every count.',
              'The schedule of inspection has four valid responses: ✓, ✗, N/A and LIM. Blank rows are the single most common cert-quality failure. N/A and LIM are not interchangeable.',
              'Re-inspection scope: a limitation is part of a fixed historical record. To lift it, do new work and issue a new (or clearly-marked supplementary) cert — never amend the original.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-7')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 7 &mdash; Special Locations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module6Section6;
