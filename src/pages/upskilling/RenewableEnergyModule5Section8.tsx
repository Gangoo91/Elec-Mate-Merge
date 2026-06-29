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
import { LfpFadeCurve } from '@/components/study-centre/diagrams/renewableM5';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm5s8-eicr-frame',
    question:
      'A BESS install is approaching its 5-year EICR. Under which Part / Chapter does the periodic inspection of the BESS install live?',
    options: [
      'Part 6 / Chapter 65 (with Chapter 64 methodology), Chapter 57 supplying the BESS-specific items',
      'Part 5 / Chapter 57 alone, inspected separately from the rest of the installation',
      'Part 7 / Chapter 71 only, treating the BESS as a special location',
      'BESS installs are exempt from periodic inspection and EICR entirely',
    ],
    correctIndex: 0,
    explanation:
      'Part 6 (Inspection and Testing) is the framework for both initial verification (Chapter 64) and periodic inspection (Chapter 65). A BESS install is part of the wider electrical installation — the EICR covers the whole installation, with Chapter 57 supplying the BESS-specific items to check (warning notices, isolators, RCD type, terminal condition, ventilation, BMS log). Cert evidence bundle from the install (Section 5.7 handover pack) is the entry point.',
  },
  {
    id: 'm5s8-eicr-code',
    question:
      'An EICR inspector finds that a BESS install’s only RCD on the AC side is a Type AC on a transformerless hybrid inverter — the manufacturer does NOT have a written declaration that the inverter cannot feed DC fault current. What EICR observation code applies?',
    options: [
      'C1 — danger present, with immediate remedial action required on site',
      'C3 — improvement recommended only, with no urgent action needed',
      'C2 — potential danger, urgent remedial: Type AC is blind to the smooth DC fault',
      'No code — Type AC is always acceptable on any inverter installation',
    ],
    correctIndex: 2,
    explanation:
      'Reg 712.411.3.2.1.2 — transformerless inverter without simple separation requires Type B (BS EN 62423). Type AC is blind to smooth DC fault current that the topology can produce; in fault conditions, the RCD may not operate and ADS fails for that fault profile. C2 (potential danger, urgent remedial) is the correct code. C1 would apply if the RCD was missing or visibly failed. C3 is for items that are not unsafe but could be improved (e.g. labelling clarity). FI (further investigation) is for findings where the inspector cannot reach a code without more information.',
  },
  {
    id: 'm5s8-replacement-threshold',
    question:
      'A 5-year EICR capacity test on a 9.5 kWh LFP BESS returns 7.4 kWh delivered. The handover pack records a baseline (year 0) of 8.0 kWh delivered. What does this tell the inspector?',
    options: [
      'Catastrophic failure of the pack, requiring immediate replacement of every module',
      'Nothing can be concluded without first thermal-imaging every cell in the pack',
      'No conclusion is possible, because capacity tests are inherently too unreliable to use',
      'Normal LFP fade: 7.4 / 8.0 = 92.5% of baseline, well above the 80% replacement convention',
    ],
    correctIndex: 3,
    explanation:
      'LFP cycle life ratings (typically 6,000–10,000 cycles at 80% DoD) translate to ~3-7% capacity fade per year of daily cycling. 7.4 kWh delivered vs 8.0 kWh baseline = 7.5% fade over 5 years — well within manufacturer expectation. The 80%-of-rated industry convention for stationary battery replacement (carried over from UPS industry practice) translates to about 6.4 kWh delivered on this pack — still 1 kWh of headroom. EICR finding: pass, with the new number recorded for the next 5-year reference.',
  },
  {
    id: 'm5s8-thermal-event',
    question:
      'A customer reports a thermal event on their BESS — pungent smell, BMS app showing high cell temperature alarms, then the unit shutting itself down. What is the correct response sequence?',
    options: [
      'Open the cabinet immediately to investigate the source of the smell and heat',
      'Re-energise the unit straight away to see whether the fault clears itself',
      'Do not open or re-energise; evacuate, call 999 and the manufacturer, await sign-off',
      'Wait 24 hours with the unit isolated, then re-energise it to test again',
    ],
    correctIndex: 2,
    explanation:
      'A thermal event on a lithium BESS is treated as a potential thermal-runaway pre-cursor. The BMS shutdown is the protective response — opening the cabinet introduces oxygen and potentially ignites the off-gas, and re-energisation injects the current that may complete the runaway. Fire and rescue have specific lithium battery protocols (large volumes of cooling water on the cabinet exterior, no battery-disassembly attempts). Manufacturer engineer sign-off is required before any re-energisation. Cert evidence bundle records the event, the response, the fire / manufacturer involvement, and the decommissioning vs repair decision.',
  },
];

const quizQuestions = [
  {
    question:
      'An EICR inspector arrives at a UK domestic BESS site at year 5. The Section 5.7 handover pack is missing — customer doesn’t have it. How does this affect the inspection?',
    options: [
      'It proceeds but is stretched: baseline, BMS parameters, RCD rationale and notices are reconstructed, with FI codes where incomplete',
      'The inspection becomes impossible, so the inspector refuses to proceed at all',
      'A Type AC RCD becomes automatically acceptable whenever no handover pack is present',
      'A visual inspection on its own is sufficient, with no electrical testing required',
    ],
    correctAnswer: 0,
    explanation:
      'A missing handover pack does not stop the EICR but it stretches it. The inspector reconstructs as much as possible from the kit nameplate (identity), photos of the install (positions, isolators, notices), the BMS log download (baseline capacity if BMS firmware kept it, BMS config parameters), and physical measurement. Items that can’t be reconstructed get FI codes. Recommend the customer ask the original installer for the pack copy, or commission a fresh "as-found" pack as a remedy. Cert evidence bundle for the EICR records what was reconstructible and what wasn’t.',
  },
  {
    question:
      'A 5-year EICR on a hybrid + LFP install finds: (a) Reg 570.6.8.202 access notice is missing from the cabinet front; (b) Type B RCD trip-time tested at 28 ms at IΔn — passing; (c) capacity test delivers 7.1 kWh vs 8.0 kWh baseline; (d) one DC terminal shows green-blue copper corrosion. What is the most accurate combined coding?',
    options: [
      'Everything is C1 — the site is dangerous',
      'Everything is C3 — improvements recommended only',
      '(a) missing notice C2, (b) Type B RCD passing no code, (c) 88.75% of baseline no code, (d) corroded DC terminal C2 — so the report is unsatisfactory on the two C2 findings',
      'No findings — the install passes outright',
    ],
    correctAnswer: 2,
    explanation:
      'Each finding is coded on its own merits per the BS 7671 EICR code definitions. Missing safety notice: C2 (next worker isn’t warned about energised live parts after isolation). Type B RCD passing: no code. Capacity at 88.75% of baseline: well above the 80% convention, no code. Corroded DC terminal: C2 (high resistance, thermal hotspot risk, BMS fault potential). Combined site outcome: unsatisfactory (any C1 or C2 makes the report unsatisfactory), with prioritised remediation against the two C2 findings. Cert evidence bundle indexes the EICR alongside the original install pack.',
  },
  {
    question:
      'A customer reports their BESS has stopped charging for 3 days. BMS app shows "communication error with PCE" and the inverter’s display shows an error code. Which diagnostic action goes FIRST?',
    options: [
      'Open the cabinet immediately to inspect the cells and terminals for the fault',
      'Replace the battery pack on the basis that it is the most likely cause',
      'Power-cycle the inverter straight away without running any diagnostics first',
      'Download the BMS log, look up the inverter error code and check the Modbus/CAN comms before opening the cabinet',
    ],
    correctAnswer: 3,
    explanation:
      'BMS event log is the diagnostic spine — it records every fault the BMS has seen with timestamps. Pair it with the inverter’s error log via the manufacturer manual. On a comms-error fault, the most common cause is the Modbus / CAN cable (loose, damaged or wrong termination) or a firmware version mismatch after an over-the-air update — both diagnosable without opening the cabinet. Cabinet opening is reserved for cases where the log + inverter error + comms check fail to identify the fault. Cert evidence bundle records the diagnostic sequence; this becomes the pattern for the next fault call-out.',
  },
  {
    question:
      'A 10-year-old LFP BESS reaches end-of-life and the customer wants it removed. Which sequence is correct for decommissioning?',
    options: [
      'Discharge to safe-state via the BMS, isolate every port, disconnect in order, then route to an authorised recycler under UN 3480/3481',
      'Just disconnect the pack and place the cells in the general-waste building skip',
      'Separate the cells out and put them in the household recycling collection bin',
      'Burn the cells on site in a controlled manner to neutralise them before disposal',
    ],
    correctAnswer: 0,
    explanation:
      'Lithium batteries are classified as hazardous waste under UK Battery Regulations 2009 and require transport under UN 3480 (lithium ion, packaged separately) or UN 3481 (lithium ion, contained in equipment) class 9 dangerous goods rules. Authorised recyclers exist (e.g. Ecobat, Recyclus); manufacturer take-back schemes are increasingly common (GivEnergy, Tesla offer them). General-waste disposal is illegal AND a fire risk. Cert evidence bundle records the decommissioning, the recycler / take-back route, the WEEE consignment note and the chain of custody.',
  },
  {
    question:
      'Reg 643.1 requires that "Measuring instruments and monitoring equipment and methods shall be chosen in accordance with the relevant parts of BS EN 61557". What does this mean for an EICR on a BESS install that requires a Type B RCD trip-time test?',
    options: [
      'Any general-purpose RCD trip-time tester will do for the inspection',
      'Type B RCDs do not require trip-time testing at all during an EICR',
      'The tester must be Type B-capable; an AC/A-only instrument cannot correctly trip-test it (Reg 643.1)',
      'Trip-time tests on RCDs are no longer required under Part 6 of BS 7671',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 643.1 — measuring instruments comply with BS EN 61557 (or equivalent). A Type B RCD has a specific trip profile (responds to smooth DC component) that Type AC / A-only testers don’t generate. Using a Type AC tester on a Type B RCD gives a misleading pass — the device may trip on the AC test but fail on the smooth DC fault for which it was specified. Inspectors carrying out EICRs on transformerless hybrid installs MUST carry a Type B-capable tester. Megger MFT1731, Fluke 1664 FC, Kewtech KT64DL and similar units handle Type B; older MFT1502 / MFT1721 do not.',
  },
  {
    question:
      'A customer’s old NMC pack (from a 2019 install) is being removed and replaced with a new LFP pack on the same hybrid inverter. What is the correct treatment of the removed NMC pack?',
    options: [
      'Resell it directly to another customer as a "good as new" replacement unit',
      'Reuse it as-is in a different UK domestic install on another hybrid inverter',
      'Dispose of it in the general-waste skip along with the rest of the strip-out',
      'Route it to manufacturer take-back, an authorised recycler, or a second-life specialist — never reinstall legacy NMC',
    ],
    correctAnswer: 3,
    explanation:
      'Three legitimate end-of-life routes: (1) manufacturer take-back (Tesla, GivEnergy offer them; warranty registration is a useful prerequisite); (2) authorised lithium-battery recycler under UK Battery Regulations 2009 / WEEE; (3) second-life market for the commercial / industrial space (Connected Energy E-STOR uses retired EV NMC packs for stationary applications at the 100 kWh-MWh scale). UK domestic reinstall of legacy NMC is hard to justify in 2025-26 (Section 5.1 chemistry analysis). Reselling or skip-binning are both excluded. Cert evidence bundle for the replacement install records the removed pack’s destination and the chain of custody.',
  },
];

const faqs = [
  {
    question: 'How often should a BESS install be inspected?',
    answer:
      'The wider electrical installation EICR interval applies — typically 10 years for domestic, 5 years for some non-domestic, and condition-driven for high-risk environments. PAS 63100:2024 and manufacturer instructions may recommend more frequent BESS-specific service visits (typically annual or biennial) which are not the same as the statutory EICR. Many installers offer annual service contracts; the BMS log makes them mostly remote, but a physical visit every 2-3 years catches things the BMS doesn’t see (terminal corrosion, ventilation obstructed by stored items, warning notice removed).',
  },
  {
    question: 'What if the manufacturer goes out of business?',
    answer:
      'Real risk for smaller brands in a fast-moving 2025-26 market. Three mitigations at install: (1) buy from manufacturers with proven UK service networks (GivEnergy, Tesla, Sigenergy, Huawei have the longest track record); (2) record the BMS pairing credentials in the cert evidence bundle, not just the manufacturer cloud — they may become orphaned; (3) prefer open-protocol comms (Modbus where possible) over proprietary clouds. If a manufacturer disappears: the kit usually keeps running; spares and firmware updates dry up; service has to go through generic LFP specialists. Decommissioning at end-of-life still routes via UK Battery Regulations.',
  },
  {
    question: 'How is BMS log review actually done at EICR?',
    answer:
      'The BMS log is the diagnostic spine — every fault, every charge-discharge cycle, every cell-level temperature/voltage event. EICR procedure: pair to the manufacturer app (or use the installer’s cloud account), export the full event log to CSV / PDF, look for repeat events at the same cell, thermal alarms, comms errors, deep-discharge events. The pattern over 5 years is what matters — a single transient event a year ago is normal; a recurring event on cell 12 every fortnight is a Code C2 finding. Cert evidence bundle indexes the BMS log export.',
  },
  {
    question: 'What is the difference between fade, drift and failure?',
    answer:
      'FADE — gradual capacity loss with cycle count and calendar age. Normal. LFP fades ~3-7% per year of daily cycling. Inspect against baseline; pass while above ~80% of original. DRIFT — cell-level voltage / SoC mismatch between cells in the same pack. The BMS’s balancing function should correct it; persistent drift indicates one cell is weakening. Code C3 / FI depending on severity. FAILURE — a single cell or module unable to participate (BMS reports it as faulted, packs around it become limited by it). Code C2 / C1 depending on whether the BMS has safely isolated the failure or whether it presents an ongoing risk.',
  },
  {
    question: 'Can a customer DIY-decommission a BESS at end-of-life?',
    answer:
      'No. Decommissioning a lithium BESS involves: safe-state discharge via BMS; isolation at every port; manufacturer-defined disconnection sequence; transport under UN 3480 / 3481 dangerous-goods rules; authorised recycler or take-back route. Each step has competence requirements. Customer self-disconnect risks thermal-runaway initiation (DC arc on disconnect of a charged pack) and creates illegal-waste-transfer offence under UK Battery Regulations 2009 if the pack is then disposed of in general waste. Decommissioning is competent-person work — same level of competence as install.',
  },
];

export default function RenewableEnergyModule5Section8() {
  const navigate = useNavigate();

  useSEO({
    title: 'Periodic inspection, faults & end-of-life | Renewable Energy 5.8 | Elec-Mate',
    description:
      'BESS at EICR — Part 6 Chapter 64/65 framing, Reg 642.2(c) damage = fail, Reg 643.1 BS EN 61557 instruments, baseline-relative capacity testing, LFP fade curves, EICR observation codes, BMS log review, thermal-runaway response, decommissioning under UK Battery Regulations 2009 / WEEE / UN 3480-3481, second-life routes.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 8 · BS 7671:2018+A4:2026 · Part 6 + Chapter 57 + UK Battery Regulations 2009"
            title="Periodic inspection, faults & end-of-life"
            description="EICR on a BESS — what the inspector checks, how to code findings, capacity testing against baseline, BMS log review, fault diagnosis sequence, thermal-runaway response, decommissioning under UK Battery Regulations 2009 / WEEE / UN 3480-3481, second-life options."
            tone="yellow"
          />

          <TLDR
            points={[
              'BESS lives inside the wider EICR — Part 6 / Chapter 64 (initial verification methodology) + Chapter 65 (periodic inspection) supply the inspection regime; Chapter 57 supplies the BESS-specific items being inspected.',
              'Section 5.7 handover pack is the EICR entry point. Without it, the inspection is reconstruction work — findings get FI codes against items that cannot be reconstructed.',
              'Visual inspection covers: warning notices (Reg 570.6.8.201 + .202 — present, legible), isolator presence at every Reg 570.6.5.201 port, terminal condition (corrosion, torque), cabinet condition (no swelling / leakage), ventilation (manufacturer clearance maintained), labelling integrity.',
              'BMS log review is the diagnostic spine — export full event log, look for thermal alarms, comms errors, repeat cell-level events. The pattern over 5 years matters more than any single event.',
              'Capacity test against the Section 5.7 BASELINE. Industry convention from stationary battery practice: 80% of rated capacity = replacement threshold. LFP typically fades 3-7%/year — a 5-year measurement at 85-90% of baseline is normal.',
              'EICR observation codes: C1 (immediate danger), C2 (potential danger, urgent), C3 (improvement recommended), FI (further investigation). Type AC RCD on a transformerless hybrid without manufacturer declaration → C2. Missing access notice → C2. Corroded DC terminal → C2.',
              'Thermal event response: do NOT open cabinet; evacuate; fire and rescue (999) + manufacturer emergency line; wait for fire / manufacturer engineer sign-off before any re-energisation. BMS shutdown is the protective response — opening or re-energising can complete thermal runaway.',
              'End-of-life routes: manufacturer take-back, authorised lithium-battery recycler under UK Battery Regulations 2009 / WEEE, or second-life for commercial / industrial reuse (Connected Energy etc.). Transport under UN 3480 / UN 3481 class 9 dangerous-goods rules. Skip-binning is illegal AND a fire risk.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Part 6 / Chapter 64 + 65 to BESS periodic inspection, with Chapter 57 supplying the BESS-specific inspection items.',
              'Use the Section 5.7 handover pack as the EICR entry point; reconstruct missing items where the pack is absent, recording reconstruction in FI / C3 findings.',
              'Carry out a visual inspection covering warning notices, isolators, terminals, cabinet, ventilation and labelling per Reg 570.6.x and Reg 642.2(c).',
              'Review the BMS event log over the inspection interval — look for thermal alarms, comms errors, repeat cell-level events, deep-discharge events; correlate patterns rather than single events.',
              'Run a baseline-relative capacity test against the Section 5.7 baseline; interpret 80% of rated as the industry replacement convention; recognise normal LFP fade curves.',
              'Apply EICR observation codes (C1 / C2 / C3 / FI) correctly to BESS-specific findings — missing RCD type, missing notices, corroded terminals, BMS faults, capacity fade past threshold.',
              'Run the thermal-event response sequence safely; engage fire / manufacturer support; sign off the decommissioning vs repair decision and record it in the cert evidence bundle.',
              'Decommission a BESS at end-of-life under UK Battery Regulations 2009 / WEEE / UN 3480-3481; route to manufacturer take-back, authorised recycler, or second-life market; record chain of custody.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            A BESS at EICR is mostly a paperwork exercise — until the BMS log says otherwise.
          </Pullquote>

          <ContentEyebrow>BESS at EICR — Part 6 / Chapter 64 + Chapter 65 frame</ContentEyebrow>

          <ConceptBlock
            title="Where the BESS lives inside the EICR"
            plainEnglish="A BESS install is not a separately inspected thing. It sits inside the wider electrical installation EICR, which is governed by Part 6 of BS 7671. Chapter 64 supplies the verification methodology (carried forward into periodic inspection), Chapter 65 covers periodic inspection specifically, and Chapter 57 supplies the BESS-specific inspection items the inspector checks against."
            onSite="Walk in with: the Section 5.7 handover pack, a Type B-capable RCD tester, a Megger / equivalent for IR + continuity, the BMS app (or a way to pair to it), a torque wrench for terminal verification. Start with the pack — it tells you what was done, what to expect, and what the baseline numbers were. Without the pack, the visit gets longer."
          >
            <p>What the EICR covers on a BESS install:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Continuity of identity</strong> — kit
                still matches the install record? Any modifications since install? Any
                module additions to the BESS?
              </li>
              <li>
                <strong className="text-white">Reg 570.6.8.201 + .202 notices</strong> —
                still present, still legible, still in the right positions? Customer
                hasn’t removed them
              </li>
              <li>
                <strong className="text-white">Reg 570.6.5.201 isolators</strong> — every
                external port still has its means of isolation? Operates correctly? Labelled
                consistently with cable labelling
              </li>
              <li>
                <strong className="text-white">Cabinet + terminals</strong> — visual for
                corrosion, swelling, leakage, displacement, ventilation obstruction;
                terminal torque random-sample verification
              </li>
              <li>
                <strong className="text-white">RCD type</strong> — Type B (BS EN 62423)
                on transformerless hybrid AC side OR manufacturer declaration on file?
                Trip-time test using a Type B-capable instrument (Reg 643.1)
              </li>
              <li>
                <strong className="text-white">Part 6 AC IR test</strong> — Reg 643.3 on
                the AC final circuit to the inverter; Table 64 minima still met
              </li>
              <li>
                <strong className="text-white">BMS log review</strong> — pattern of events
                since the last inspection; comms errors; thermal alarms; cell-level
                voltage / SoC drift; deep-discharge events
              </li>
              <li>
                <strong className="text-white">Capacity test against baseline</strong> —
                Section 5.7 baseline kWh delivered vs today’s measurement; fade
                vs industry 80%-of-rated convention; manufacturer’s own fade
                allowance under warranty
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 641.4 + 641.6 — Inspection and testing precautions and competence"
            clause="Reg 641.4: Precautions shall be taken to avoid danger to persons and livestock, and to avoid damage to property and installed equipment, during inspection and testing. Reg 641.6: The verification shall be made by one or more skilled persons competent in such work."
            meaning="BESS inspection has elevated personal-safety implications over a standard EICR — high DC potentials inside the cabinet, BMS faults that can be misread, thermal-event possibility on a stressed pack. Reg 641.4 obliges the inspector to plan precautions: PPE, lock-off discipline, do-not-open-cabinet rules unless manufacturer-defined safe state confirmed, never re-energise after a fault without engineering sign-off. Reg 641.6 sets the competence bar — generic Part P / 18th Edition is the floor; BESS-specific manufacturer training and Section 712 / Chapter 57 / Chapter 82 familiarity are the substance. Cert evidence bundle for the EICR records the inspector’s competence basis."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Visual + functional inspection — Reg 642.2(c) damage = fail</ContentEyebrow>

          <Pullquote>
            The damage you can see is the easy half. The pattern in the BMS log is the other half.
          </Pullquote>

          <ConceptBlock
            title="Visual inspection — the checklist that fits behind the cabinet door"
            plainEnglish="Reg 642.2(c) — if the inspector finds installed electrical equipment that is visibly damaged or defective so as to impair safety, that condition is non-compliance. On a BESS, the visible-damage list is specific: terminal corrosion, cabinet swelling, electrolyte / leakage signs, displacement / mounting failure, ventilation obstructed, warning notice removed, labelling mismatched with kit."
            onSite="Walk the cabinet exterior first (no opening), then carefully open only if the BMS log + customer report give no obvious cause. Cabinet exterior gives ~70% of what you need: swelling, leakage signs, displacement, notice integrity. Open the cabinet for terminal inspection only after isolating per the manufacturer’s safe-state procedure."
          >
            <p>The visible-damage checklist:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Cabinet swelling / bulging</strong> —
                anything other than the manufacturer’s factory shape. Indicates cell
                gas pressure → C1 / C2 depending on severity; do not re-energise until
                manufacturer engineer confirms safe
              </li>
              <li>
                <strong className="text-white">Visible electrolyte / leakage</strong> —
                LFP normally has none; lead-acid would; any sign on an LFP install is a C1
                pending investigation
              </li>
              <li>
                <strong className="text-white">Terminal corrosion</strong> — green / blue
                copper oxidation indicates moisture ingress or undersized terminations
                generating heat; C2 (potential high-resistance fault, BMS may not see it
                until cell-level)
              </li>
              <li>
                <strong className="text-white">Mounting / displacement</strong> — backboard
                detaching, fixings loose, cabinet leaning. Reg 570.6.3 / PAS 63100
                compliance impaired; C2 or C1 depending on stability
              </li>
              <li>
                <strong className="text-white">Ventilation obstructed</strong> — customer
                has stored items above / below / against the cabinet. Manufacturer
                clearance impaired; C2 (thermal management compromised); customer
                conversation needed at handover-style reminder
              </li>
              <li>
                <strong className="text-white">Notice integrity</strong> — Reg 570.6.8.201
                at CU + Reg 570.6.8.202 at access points still present and legible? C2 if
                missing; C3 if faded but still legible
              </li>
              <li>
                <strong className="text-white">Labelling consistency</strong> — every
                cable labelled at both ends, every isolator labelled, labels match the
                kit identity? C3 typically; C2 if confusion could lead to wrong
                isolation
              </li>
              <li>
                <strong className="text-white">Cable / conduit condition</strong> — no
                damage, sheath intact, glands tight, no DC + AC co-routing introduced
                since install (customer or someone else may have added a cable run)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="BMS log review — the diagnostic spine"
            plainEnglish="The BMS log records every event the battery management system has seen since the last firmware reset or commissioning. Thermal alarms, comms errors, cell-level voltage drift, SoC drift, deep-discharge events, charge-rate violations — all timestamped. At EICR, the log is the BESS’s medical record."
            onSite="Pair to the BMS app via the manufacturer cloud (or directly via Modbus / CAN if you can’t access the cloud). Export the full event log to CSV / PDF. Scan for: repeat events at the same cell (one weak cell developing), thermal alarms (any thermal event needs investigation regardless of how it ended), comms errors (intermittent loose cable or firmware mismatch), deep-discharge events (BMS cut-off triggered = something downstream prevented timely recharge)."
          >
            <p>What the log patterns mean:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Single transient event a year ago</strong>
                — normal. Note it, move on
              </li>
              <li>
                <strong className="text-white">Recurring event on the same cell</strong>
                — that cell is weakening. C3 (FI if uncertain) and recommend
                manufacturer warranty claim if within term
              </li>
              <li>
                <strong className="text-white">Thermal alarm at any time</strong> — even
                if it cleared, deserves manufacturer involvement; thermal alarms shouldn’t
                happen under normal operation
              </li>
              <li>
                <strong className="text-white">Comms errors at increasing
                  frequency</strong> — intermittent cable or firmware drift; check the
                Modbus / CAN cable connections, check firmware version against current
                manufacturer release
              </li>
              <li>
                <strong className="text-white">Deep-discharge cut-off events</strong> —
                BMS protected the pack from over-discharge. Something prevented timely
                recharge: tariff misconfig, PV inverter fault, customer-induced setting
                change. Diagnose the root cause
              </li>
              <li>
                <strong className="text-white">Charge-rate violations</strong> — BMS
                refused a charge current the inverter / charger requested. Indicates
                C-rate mismatch between PCE settings and battery rating; reconfigure
                PCE
              </li>
              <li>
                <strong className="text-white">SoC drift</strong> — BMS’s SoC
                estimate has drifted from coulomb-counting reality. Recalibration via a
                full discharge / charge cycle usually fixes it
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 642.2(c) — Visible damage or defect is a non-compliance"
            clause="If the inspector finds installed electrical equipment that is visibly damaged or defective so as to impair safety, that condition shall be taken as non-compliance during the inspection under Regulation 642.2(c). Such findings shall be recorded and appropriate remedial action recommended."
            meaning="On a BESS install, the visible-damage list is specific and the consequences are graver than on a standard installation: cabinet swelling = potential gas-pressured cell = thermal-runaway precursor. Terminal corrosion = high-resistance joint = thermal hotspot. Notice removed = next worker doesn’t know live parts stay energised. Each finding is coded against the BS 7671 EICR coding scheme — C1 for present-danger, C2 for potential-danger urgent remedial, C3 for improvement recommended, FI where the inspector cannot reach a code without more information. Cert evidence bundle for the EICR records each finding individually with photographs."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Capacity testing against baseline</ContentEyebrow>

          <ConceptBlock
            title="Baseline-relative capacity test — the future of BESS EICR"
            plainEnglish="The Section 5.7 handover pack should contain a BASELINE capacity test from commissioning day — e.g. 8.0 kWh delivered on a 9.5 kWh nameplate pack. The EICR re-runs the test under similar conditions and compares. The percentage of baseline is what matters, not the absolute number."
            onSite="Reproduce the baseline test conditions as closely as possible: ambient temperature within ±5 °C, same BMS firmware version (where possible), same charge / discharge endpoints. Differences in conditions explain a few percent of any variance from baseline. Mark the test result in the EICR as the NEW baseline for the next 5-year inspection."
          >
            <p>Interpreting the result:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Within 95% of baseline</strong> — no fade
                of concern; possibly within test-noise. Pass, record as new baseline
              </li>
              <li>
                <strong className="text-white">85-95% of baseline (5-year point)</strong>
                — normal LFP fade range. Pass, no code, record as new baseline
              </li>
              <li>
                <strong className="text-white">80-85% of baseline</strong> — accelerated
                fade. C3 (improvement recommended), recommend manufacturer warranty
                consultation, schedule follow-up inspection sooner than the standard
                interval
              </li>
              <li>
                <strong className="text-white">Below 80% of baseline</strong> — at or
                past the industry replacement convention. C2 if customer’s functional
                expectation is no longer met; FI if the customer is content. Engage
                manufacturer; consider module replacement or whole-pack swap; warranty
                may apply
              </li>
              <li>
                <strong className="text-white">No baseline available</strong> — measure
                today’s capacity, compare to manufacturer nameplate × DoD ×
                round-trip as a theoretical baseline; record as FI (the comparison is
                weaker without a real baseline). Recommend re-baselining if a fresh
                commissioning-grade test is feasible
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.1 — Instruments shall comply with BS EN 61557"
            clause="Measuring instruments and monitoring equipment and methods shall be chosen in accordance with the relevant parts of BS EN 61557. If other measuring equipment is used, it shall provide no lesser degree of performance and safety."
            meaning="Reg 643.1 is a mandatory selection requirement for test apparatus. On a BESS install, this has a specific bite: a Type B RCD trip-time test demands a Type B-capable tester. Older Type AC / A-only testers (Megger MFT1502, MFT1721 and similar) cannot generate the smooth-DC waveform required to test a Type B device correctly. Using them on a Type B install gives a misleading pass. Inspectors carrying out BESS EICRs need a Type B-capable instrument (Megger MFT1731, Fluke 1664 FC, Kewtech KT64DL or equivalent). Cert evidence bundle for the EICR records the instrument used; failure to use a Type B-capable instrument on a Type B install is itself a Reg 643.1 non-compliance."
          />

          <LfpFadeCurve caption="LFP capacity fades gradually to roughly 80% of nameplate over a 15-year life — the point manufacturers warrant to and where replacement is typically considered." />

          <Scenario
            title="5-year EICR on a hybrid + 9.5 kWh LFP install"
            situation="2021 install. GivEnergy Gen3 hybrid + 9.5 kWh LFP, single phase, transformerless, Type B RCD on dedicated CU way, EPS variant. Section 5.7 handover pack present and complete: baseline capacity 8.0 kWh delivered. Customer reports no issues; app shows healthy daily cycling for the last 5 years. Annual EICR done in 2024 (the 3-year visit), this is the 5-year follow-up."
            whatToDo="Visual inspection: warning notices both present, legible. Isolators (4 of them) operate. Terminals dry, no corrosion (random-sample torque check passes). Cabinet integrity good — no swelling, no leakage. Ventilation: customer has put a recycling box near the cabinet but with manufacturer clearance still respected — note as C3 (improvement recommended — relocate the box). BMS log export: 1,820 charge cycles in 5 years (consistent with daily cycling), no thermal alarms, one comms error in 2022 (single event, no recurrence), no deep-discharge events. Capacity test: 7.4 kWh delivered. 7.4 / 8.0 = 92.5% of baseline — well above 80% convention, normal LFP fade for 5 years. RCD trip-time test with Megger MFT1731 (Type B capable): 22 ms at IΔn, pass. Part 6 IR test on AC final circuit: 1.9 MΩ at 500 V DC, pass. Outcome: satisfactory; one C3 finding (recycling box). Update cert evidence bundle: new baseline kWh, fresh schedule of test results, EICR. Customer reassured; next inspection scheduled."
            whyItMatters="The Section 5.7 handover pack made the EICR a 90-minute job that produced a defensible, comparable record. Without the pack, the same inspection would have taken twice as long and produced a weaker conclusion (no baseline to compare against, RCD type undocumented, isolator schedule reconstructed from the kit). The pack pays for itself at every inspection over the BESS’s 15-20 year life."
          />

          <Scenario
            title="Customer reports reduced runtime — diagnostic visit"
            situation="2023 install. Tesla Powerwall 3 (13.5 kWh nameplate, 13.5 kWh usable per Tesla design — no separate DoD figure). Customer reports that the app shows the battery discharging much faster than before during evening peak hours. They suspect a fault."
            whatToDo="BMS log first. Export the event log. Findings: no thermal alarms, no comms errors, no deep-discharge events, but 14 charge-rate violations in the last month — BMS refused a charge current the inverter requested. Cross-check inverter settings: customer has switched tariff from Octopus Flux to Octopus Cosy six weeks ago — the BMS schedule is still trying to charge at the Flux 02:00-05:00 window with Flux charge-rate settings, mismatched against the Cosy twin-window pattern. Reconfigure BMS schedule to Cosy windows, re-pair to Tesla cloud. App shows correct behaviour within 24 hours. No physical fault; no EICR finding. Update cert evidence bundle with the tariff-change record and the BMS reconfiguration."
            whyItMatters="The BMS log + tariff history together pinpoint the fault without opening the cabinet, without a capacity test, without a service truck callback. The pattern — apparent customer-facing performance problem, but the BMS log is clean for thermal / fault events — points to configuration drift rather than physical degradation. Builds the pattern recognition that experienced BESS service engineers develop over hundreds of call-outs. Section 5.6 sizing was correct; Section 5.7 commissioning was correct; this is purely a post-commissioning tariff-config drift."
          />

          <CommonMistake
            title="Carrying out a capacity test without referring to the baseline"
            whatHappens="EICR inspector measures the BESS delivering 7.0 kWh on test. Reports it as &lsquo;capacity 7 kWh’ without comparison to the Section 5.7 baseline (which was 8.0 kWh) or the manufacturer nameplate (9.5 kWh). Customer doesn’t know whether to be reassured or concerned. Cert evidence bundle records a number with no meaning."
            doInstead="Always frame the capacity test result as a percentage of BASELINE first, then as a percentage of MANUFACTURER NAMEPLATE × DoD × round-trip second. 7.0 / 8.0 = 87.5% of baseline → 5-year normal range, pass. 7.0 / (9.5 × 0.8 × 0.95) = 7.0 / 7.22 = 97% of theoretical original delivered. Both numbers together give the customer (and the next EICR five years from now) the context to interpret. The bare number without context is a wasted measurement."
          />

          <SectionRule />

          <ContentEyebrow>Fault diagnosis & thermal events</ContentEyebrow>

          <ConceptBlock
            title="Fault diagnosis sequence — log first, physical second"
            plainEnglish="A modern UK 2025-26 BESS reports faults via the BMS event log and the inverter’s error display. Diagnosis goes log-first, physical-second. The log + the inverter error code + the manufacturer’s error code lookup table together identify ~80% of faults without opening the cabinet."
            onSite="Walk in expecting to leave without opening the cabinet. The cabinet-open intervention is reserved for cases where the log + error code + comms check fail to identify the fault — usually internal cell-level failures or unusual hardware issues. Cabinet-open work requires manufacturer safe-state procedure compliance and elevated PPE."
          >
            <p>The fault-diagnosis ordering:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Step 1 — gather log evidence</strong> —
                BMS event log export, inverter error log download, customer’s
                description of when the fault first appeared, what they’d done
                recently
              </li>
              <li>
                <strong className="text-white">Step 2 — consult error code
                  table</strong> — manufacturer manual maps every error code to likely
                causes and recommended actions. Saves cabinet-open time
              </li>
              <li>
                <strong className="text-white">Step 3 — comms check</strong> — Modbus /
                CAN cable between battery and inverter, both ends. Many "battery
                offline" faults are physical cable issues
              </li>
              <li>
                <strong className="text-white">Step 4 — firmware check</strong> — BMS
                firmware version, inverter firmware version, manufacturer cloud-reported
                current versions. Mismatches after over-the-air updates cause comms
                errors that look like hardware faults
              </li>
              <li>
                <strong className="text-white">Step 5 — config drift</strong> — has the
                customer changed tariff, charge schedule, DoD setting, app settings?
                Many post-commissioning faults are config drift, not hardware
              </li>
              <li>
                <strong className="text-white">Step 6 — physical
                  inspection</strong> — only if Steps 1-5 don’t identify the fault.
                Cabinet open per manufacturer safe-state procedure, terminal inspection,
                cable inspection, thermal imaging if available
              </li>
              <li>
                <strong className="text-white">Step 7 — manufacturer
                  engineering</strong> — when none of Steps 1-6 isolate the fault, the
                manufacturer’s engineering line takes over. Often results in a
                module / pack replacement under warranty
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Thermal event response — do NOT open, do NOT re-energise"
            plainEnglish="A thermal event (high cell temperature alarm, pungent smell, swelling, off-gas, BMS shutdown) on a lithium BESS is treated as a potential thermal-runaway precursor. The BMS shutdown is the protective response — opening the cabinet introduces oxygen and potentially ignites the off-gas; re-energising injects the current that may complete the runaway."
            onSite="Customer reports a thermal event: walk through the response with them on the phone before driving over. Get them out of the area, away from the cabinet. If they have left the area, they should NOT return until fire / manufacturer have made it safe."
          >
            <p>The thermal-event response sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Customer immediate</strong> — evacuate the
                area, close doors / windows behind to slow oxygen ingress, do NOT open
                the cabinet, do NOT spray water, do NOT re-energise via the app or
                physical switch
              </li>
              <li>
                <strong className="text-white">Call 999 fire and rescue</strong> — UK
                fire services have specific lithium-battery protocols (large volumes of
                cooling water on cabinet exterior, no disassembly attempts, monitored
                burn-out where containment is achieved)
              </li>
              <li>
                <strong className="text-white">Call manufacturer emergency
                  line</strong> — every major UK 2025-26 manufacturer has one;
                engineering remotely guides the customer / fire service / installer
              </li>
              <li>
                <strong className="text-white">Installer attendance</strong> — only after
                fire and rescue have declared the scene safe and after manufacturer
                engineer instruction. Wear appropriate PPE; assume off-gas exposure
                possible
              </li>
              <li>
                <strong className="text-white">Decommission decision</strong> — most
                post-thermal-event packs are decommissioned rather than repaired;
                manufacturer warranty often covers a full pack replacement; insurance
                may apply
              </li>
              <li>
                <strong className="text-white">Re-energisation</strong> — never re-energise
                without WRITTEN manufacturer engineer sign-off. The
                cert evidence bundle records the event, the response, the manufacturer
                engineer’s assessment, and the post-event decision (decommission
                vs repair) with all sign-offs
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Re-energising after a thermal event &lsquo;to see if it has cleared&rsquo;"
            whatHappens="Customer reports a thermal alarm at 14:00. By 17:00 the alarm has cleared and the BMS shows the pack at normal temperature. Customer or installer re-energises &lsquo;to test’. The internal cell that was over-temperature has actually been damaged; the next charge cycle pushes current through a weakened separator; thermal runaway initiates 4 hours later, this time unrecoverable. House fire follows."
            doInstead="Treat the FIRST thermal alarm as a potentially terminal event for the pack. BMS clearing the alarm doesn’t mean the cell is fine — only that the temperature is back below the alarm threshold. Damage may have occurred at the cell level. NEVER re-energise without manufacturer engineer sign-off. Cert evidence bundle records every thermal event with timestamp and response taken; pattern of thermal events is a Code C1 EICR finding regardless of recovery."
          />

          <SectionRule />

          <ContentEyebrow>End-of-life — decommissioning, WEEE, second-life</ContentEyebrow>

          <ConceptBlock
            title="Decommissioning sequence at end-of-life"
            plainEnglish="A BESS at end-of-life (capacity below customer-acceptable threshold, manufacturer warranty expired, customer relocating, manufacturer-driven recall) is decommissioned as a controlled operation. UK Battery Regulations 2009 + WEEE + UN 3480/3481 dangerous-goods transport rules apply throughout. Skip-binning is illegal and a fire risk."
            onSite="Decommissioning is competent-person work — same level of competence as install. Customer DIY decommission risks: thermal-runaway initiation (DC arc on disconnect of a charged pack), illegal-waste-transfer offence, fire on transport. Use authorised recycler or manufacturer take-back route; record every step in the chain of custody."
          >
            <p>The decommissioning sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Step 1 — discharge to safe state</strong>
                — via the BMS to manufacturer-defined safe-state SoC (typically 30-50%);
                NOT fully discharged (over-discharge creates its own thermal risk)
              </li>
              <li>
                <strong className="text-white">Step 2 — isolate at every Reg
                  570.6.5.201 port</strong> — AC grid, AC EPS (if EPS), DC battery, DC
                PV (if hybrid). Lock-off each isolator per safe-isolation procedure
              </li>
              <li>
                <strong className="text-white">Step 3 — disconnect in manufacturer
                  order</strong> — manufacturer-defined disconnection sequence
                (battery-side DC interconnects last on most LFP units, to keep the BMS
                powered until the final step). Cap exposed DC terminals
              </li>
              <li>
                <strong className="text-white">Step 4 — physical removal</strong> —
                package per UN 3480 (lithium-ion, packaged separately) or UN 3481
                (lithium-ion, contained in equipment) class 9 dangerous-goods rules.
                Approved packaging; correct labels and documentation; transport via
                authorised carrier
              </li>
              <li>
                <strong className="text-white">Step 5 — destination</strong> — three
                routes: (a) manufacturer take-back where offered (Tesla, GivEnergy
                offer them — warranty registration helps); (b) authorised lithium-
                battery recycler under UK Battery Regulations 2009 / WEEE (Ecobat,
                Recyclus and similar); (c) second-life specialist for healthy packs
                going to commercial / industrial reuse
              </li>
              <li>
                <strong className="text-white">Step 6 — site close-out</strong> — remove
                warning notices (notice no longer applicable); update CU labelling to
                remove BESS references; restore the consumer unit way for other use
                (or leave isolated with neutral covered) per customer request
              </li>
              <li>
                <strong className="text-white">Step 7 — documentation</strong> —
                consignment note (WEEE), chain of custody, recycler / take-back
                confirmation. Cert evidence bundle for the decommissioning records the
                full chain
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Second-life and the recycling ecosystem"
            plainEnglish="Not every retired BESS pack is destined for recycling. Healthy packs with documented capacity around 70-80% of original can have a second life in commercial / industrial stationary applications where the duty cycle is less aggressive. UK companies like Connected Energy (E-STOR) buy retired EV NMC packs for grid-scale stationary use; similar models exist for retired domestic LFP packs."
            onSite="The decision between recycling and second-life depends on documented capacity and BMS log integrity. A pack with full handover-pack provenance and recorded fade curve commands a second-life price; a pack without that provenance is recycler-bound. The Section 5.7 handover pack pays off here, 10-15 years after the install."
          >
            <p>Second-life ecosystem (UK 2025-26):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Connected Energy</strong> — E-STOR
                platform reuses retired EV NMC packs (Renault Kangoo, Nissan Leaf) for
                stationary commercial / grid-scale applications at ~100 kWh-MWh scale
              </li>
              <li>
                <strong className="text-white">Manufacturer second-life
                  schemes</strong> — increasingly common as the OEMs build the
                ecosystem (Tesla, BMW etc.); pricing and quality control set by the
                manufacturer
              </li>
              <li>
                <strong className="text-white">Authorised recyclers under UK Battery
                  Regulations 2009</strong> — Ecobat, Recyclus and similar; cells are
                shredded under inert atmosphere, materials recovered (lithium, cobalt,
                nickel, copper, aluminium) into the materials supply chain
              </li>
              <li>
                <strong className="text-white">Chain of custody</strong> — every
                handover signed; WEEE consignment notes recorded; the cert evidence
                bundle for the decommissioning is a piece of legal compliance, not just
                installer record-keeping
              </li>
              <li>
                <strong className="text-white">Domestic reinstall of legacy
                  packs</strong> — discouraged in 2025-26 UK domestic. New LFP at
                ~£300/kWh nameplate has displaced the older NMC / mixed-chemistry
                second-hand market for domestic. Second-life lives at the
                commercial / industrial scale where economics favour it
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Customer skip-binning an old BESS / cell pack at end-of-life"
            whatHappens="Customer’s installer goes out of business. Customer hires a general electrician to remove the old BESS at end-of-life. Electrician disconnects the pack and disposes of it in the customer’s building-waste skip, which is then transported to landfill. Fire ignites in the skip during transport (typical lithium-cell mechanism — DC arc during physical damage), HGV burns, driver injured. Investigation traces back to the customer’s install; customer faces enforcement action for illegal hazardous-waste transfer under UK Battery Regulations 2009; electrician’s competence comes under question."
            doInstead="Decommissioning a lithium BESS is competent-person work. Route via manufacturer take-back, authorised lithium-battery recycler under UK Battery Regulations 2009 / WEEE, or second-life specialist for healthy packs. Transport under UN 3480 / 3481 packaging and labelling rules. Document the chain of custody — consignment note, recycler / take-back confirmation, sign-offs. Cert evidence bundle for the decommissioning records every step. Cost: ~£100-£300 typically per UK domestic pack decommissioning (in 2025-26 prices, often offset by scrap value of the pack components or by manufacturer take-back rebates)."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BESS lives inside the wider EICR. Part 6 Chapter 64 + 65 supply the inspection regime; Chapter 57 supplies the BESS-specific items to check. Section 5.7 handover pack is the EICR entry point.',
              'Visual inspection covers warning notices (Reg 570.6.8.201 + .202), isolators (Reg 570.6.5.201), terminal corrosion, cabinet condition, ventilation clearance, labelling integrity. Reg 642.2(c) — visible damage = non-compliance.',
              'BMS event log review is the diagnostic spine. Export the full log; look for thermal alarms (any thermal event needs investigation), comms errors at increasing frequency, repeat cell-level events, deep-discharge events, charge-rate violations.',
              'Capacity test against the Section 5.7 BASELINE. Industry convention: 80% of rated = replacement threshold. LFP typically fades 3-7%/year; 5-year measurement at 85-95% of baseline is normal.',
              'EICR codes: C1 (immediate danger), C2 (potential danger, urgent), C3 (improvement recommended), FI (further investigation). Type AC on transformerless hybrid without manufacturer declaration → C2. Missing notice → C2. Corroded DC terminal → C2.',
              'Reg 643.1 — BS EN 61557 instruments. Type B RCD trip-time test demands a Type B-capable instrument (Megger MFT1731, Fluke 1664 FC, Kewtech KT64DL or equivalent). Older Type AC / A-only testers cannot correctly test Type B.',
              'Fault diagnosis: log first, physical second. BMS log + inverter error code + comms check + firmware check + config-drift check identify ~80% of faults without opening the cabinet.',
              'Thermal event response: do NOT open the cabinet; evacuate; call 999 + manufacturer emergency line; wait for fire and rescue + manufacturer engineer sign-off before any re-energisation. NEVER re-energise a post-thermal-event pack without written manufacturer engineer approval.',
              'Decommissioning is competent-person work. Discharge to manufacturer safe-state; isolate at every Reg 570.6.5.201 port; disconnect in manufacturer-defined order; package and transport under UN 3480 / 3481 class 9 dangerous-goods rules.',
              'End-of-life routes: manufacturer take-back; authorised lithium-battery recycler under UK Battery Regulations 2009 / WEEE; second-life market for healthy packs (Connected Energy etc.) into commercial / industrial reuse. Skip-binning is illegal AND a fire risk.',
              'Cert evidence bundle accompanies the BESS for its full lifecycle: install pack → EICR records → fault visits → decommissioning chain of custody. Same level of discipline at end-of-life as at install.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 8 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-5-section-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Installation, commissioning & ventilation
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Module overview <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 5 complete
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
