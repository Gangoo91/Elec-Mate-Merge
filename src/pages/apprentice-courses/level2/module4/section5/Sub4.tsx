/**
 * Module 4 · Section 5 · Subsection 4 — Common non-conformances on first inspection
 * Supplementary Sub — the classic apprentice traps an inspector flags. Pulls in
 * BS 7671 Regs 411.3.1.1, 421.1.7, 514.13, 531.3.3, 522.8.5, 526.1 and the
 * mistakes apprentices make against each. Designed to flip the inspector's-eye
 * view back to the wiring side so the apprentice avoids the trap before the
 * inspection.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Common non-conformances on first inspection (5.4) | Level 2 Module 4.5.4 | Elec-Mate';
const DESCRIPTION =
  'The ten classic apprentice traps a supervisor catches on first install inspection — terminations, polarity, missing CPC, wrong RCD type, AFDD gaps, missing notices — and how to avoid them.';

const checks = [
  {
    id: 'rcd-type-spot',
    question:
      'A supervisor inspects a new domestic CU and notices the kitchen socket ring is on a Type AC RCBO. The kitchen has an induction hob, modern LED lighting drivers, and a number of appliances with switch-mode power supplies. The supervisor flags this as a non-conformance because:',
    options: [
      'BS 7671 Reg 531.3.3 (A4:2026) requires Type A as the minimum where load currents may contain DC components — Type AC is no longer suitable for general fixed wiring with modern equipment.',
      'BS 7671 Reg 411.3.3 requires every kitchen socket ring to be protected by a Type B RCD specifically, because kitchens are classed as a special location under Part 7.',
      'BS 7671 Reg 314.1 requires kitchen circuits to be divided so that no single RCD protects more than one appliance, and a single Type AC RCBO on the whole ring breaches that division rule.',
      'BS 7671 Reg 643.8 requires the RCD on a kitchen ring to be tested at 5×I∆n rather than 1×I∆n, and a Type AC device cannot meet that faster trip time with modern loads present.',
    ],
    correctIndex: 0,
    explanation:
      'A4:2026 changed Reg 531.3.3 — Type AC RCDs may now only serve fixed equipment where it is known the load current contains no DC components. Modern domestic loads (induction hobs, LED drivers, switch-mode supplies, EV chargers, heat pumps) routinely produce DC components. The Type AC will saturate magnetically under DC fault current and fail to trip. Type A is now the minimum for general wiring; Type B for specific applications like EV.',
  },
  {
    id: 'cpc-class-i-spot',
    question:
      'On a CU swap inspection you notice that the metal-bodied SP outdoor luminaire on the gable end has been wired with T&E but the green-yellow CPC has been cut off short and not connected at the back of the fitting. This is a non-conformance against:',
    options: [
      'Reg 522.6 — protection of cables against mechanical damage in an outdoor location.',
      'Reg 514.13 — identification of the protective bonding connection at the luminaire.',
      'Reg 643.6 — verification of polarity at the luminaire during testing.',
      'Reg 411.3.1.1 — protective earthing of exposed-conductive-parts on Class I equipment.',
    ],
    correctIndex: 3,
    explanation:
      'Reg 411.3.1.1 requires every Class I exposed-conductive-part to be connected to a CPC. A metal-bodied luminaire is Class I — its body is an exposed-conductive-part. CPC must be terminated at the earth terminal. Cut-off-and-ignored is a fail. The fix is straightforward — bring the CPC back to the right length, sleeve it, terminate it at the earth terminal, retest. The trap is the apprentice habit of "the lamp works, so it&rsquo;s fine" — the lamp works without earth right up until a fault makes the body live and someone touches it.',
  },
  {
    id: 'inspection-rush-mindset',
    question:
      'The customer is pressuring you to energise the install today because their fridge contents are spoiling. You have noticed the polarity on one bedroom socket reads reversed. The right call is:',
    options: [
      'Energise the install now and note the reversed polarity as a LIM on the certificate, returning to re-terminate the socket on a follow-up visit so the customer keeps their power.',
      'Hold the energisation, fix the polarity at the socket (re-terminate the line and neutral correctly), retest, then energise. Offer the customer a temporary lead from a known-good circuit if needed.',
      'Energise only the unaffected circuits and leave the bedroom socket circuit isolated, issuing the EIC for the remainder of the installation while the polarity fault is outstanding.',
      'Energise the whole install — a single reversed socket is a C3 improvement item rather than a defect, so it does not need to be put right before the supply is switched on.',
    ],
    correctIndex: 1,
    explanation:
      'Reversed polarity at a socket means the live pin is in the wrong place — anyone unplugging an appliance has live at the wrong pin. The fix is ten minutes. Customer pressure does not override Reg 642 / 643. Offer a temporary workaround if needed. Never energise an install with a known polarity fault, even on one socket. The whole point of inspecting before energising is to catch exactly these kinds of defects.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A supervisor opens the CU on a finished install and notices visible copper conductor extending past the brass terminal of the line conductor on circuit 4. This is a:',
    options: [
      'Acceptable — a small amount of exposed copper at a terminal is normal and helps confirm the conductor is fully home, so it can be marked ✓ on the Schedule of Inspections.',
      'Non-conformance — Reg 526.1 requires connections to provide durable electrical continuity AND adequate mechanical strength AND protection. Exposed copper past the terminal fails the protection element.',
      'Non-conformance against Reg 514.13, because exposed copper at a terminal means the identification sleeving has not been applied correctly to the conductor.',
      'A limitation (LIM) only — the exposed copper is inside the consumer unit and cannot be assessed without disturbing the busbar, so it is recorded as inaccessible.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 526.1 covers electrical connections — durable continuity, adequate mechanical strength, AND protection. Exposed copper past the terminal is a fail because (a) it can short to adjacent terminals or to the CU enclosure, (b) it indicates over-stripping which usually goes hand in hand with insulation trapped under the screw or with a poorly-tightened terminal. Apply on neutral and CPC equally — any conductor.',
  },
  {
    id: 2,
    question:
      'A circuit&rsquo;s R1+R2 reading comes back significantly higher than the design predicted — by more than 50%. The most likely cause is:',
    options: [
      'The insulation resistance is too low somewhere on the circuit, dragging the continuity reading up because leakage current is finding an unintended path.',
      'The test leads have not been nulled, so the reading simply includes the few hundred milliohms of lead resistance and the circuit itself is fine.',
      'A high-resistance joint somewhere on the circuit — typically a junction box that has been chocboxed up in the loft and never tightened properly.',
      'The protective device is the wrong type for the load, so the R1+R2 reading does not match the value predicted for that breaker.',
    ],
    correctAnswer: 2,
    explanation:
      'A high R1+R2 reading on a finished circuit almost always points to a high-resistance joint somewhere along the line conductor or CPC. The classic offender is an unaccessible junction box in the loft or under floors that was made up too quickly. The fix is investigation — re-test sub-sections of the circuit until you isolate the bad joint, then re-make it properly. This is one of the highest-frequency apprentice traps.',
  },
  {
    id: 3,
    question:
      'Reg 421.1.7 (A4:2026) treats AFDDs as:',
    options: [
      'Mandatory on every final circuit in every dwelling without exception, so the absence of an AFDD on any circuit is an automatic C2 on a domestic install.',
      'Prohibited in dwellings, because AFDDs are prone to nuisance tripping on domestic loads and are only permitted on industrial installations.',
      'A direct replacement for the 30 mA RCD, so a circuit fitted with an AFDD no longer needs RCD additional protection under Reg 411.3.3.',
      'Recommended for AC final circuits supplying socket-outlets up to 32 A in dwellings, with the recommendation strengthening to a requirement in Higher-Risk Residential Buildings (HRRBs) under the Building Safety Act 2022 framework.',
    ],
    correctAnswer: 3,
    explanation:
      'AFDDs are recommended for AC final circuits supplying socket-outlets ≤ 32 A in dwellings (per BS 7671 Reg 421.1.7). The recommendation strengthens to a requirement in Higher-Risk Residential Buildings (HRRBs) under the Building Safety Act 2022 framework. In HMOs, sleeping accommodation and care homes, supporting fire-safety guidance treats AFDDs as effectively required practice — but the BS 7671 wording is "recommending", not a hard requirement on the regulation itself.',
  },
  {
    id: 4,
    question:
      'You finish an installation and discover the BS 951 "Safety Electrical Connection — Do Not Remove" label is missing from the gas service bonding clamp. This is a non-conformance against:',
    options: [
      'Reg 514.13 — labelling at protective bonding clamps.',
      'Reg 411.3.1.2 — the requirement to provide main protective bonding to the gas service.',
      'Reg 643.2.1 — the continuity test of the main bonding conductor.',
      'Reg 544.1.1 — the sizing of the main protective bonding conductor.',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 514.13 requires every main protective bonding clamp to carry a permanent BS 951 "Safety Electrical Connection — Do Not Remove" label. The label warns plumbers and others working on the service not to remove the bonding. Missing label is a non-conformance — fitting a sticky-back BS 951 label takes 30 seconds and is a fix during the inspection itself.',
  },
  {
    id: 5,
    question:
      'A T&E cable runs through a wood-framed escape stairwell void without any additional fire-resistant supports — just standard plastic clips. Per BS 7671 A4:2026 update to Reg 522.8.5 / 522.8.X (cables in escape routes), this is a non-conformance because:',
    options: [
      'Plastic clips do not provide enough mechanical protection against impact in a stairwell, so the cable must be run in steel conduit wherever it crosses a walkway.',
      'Cables on escape routes need supports that will not fail prematurely in a fire — plastic clips melt and the cable falls, becoming a trip hazard for evacuating occupants.',
      'T&E may not be used in any stairwell because the PVC sheath gives off toxic smoke in a fire, so LSZH cable is required throughout an escape route regardless of the supports.',
      'Cables in a wood-framed void must be RCD-protected at 30 mA, and plastic clips indicate the circuit was run without the additional protection that timber construction requires.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 has tightened requirements around fire-resistant supports for cables in escape routes — the principle being that cables should not fall during a fire and impede evacuation. Plastic clips that melt at low temperatures fail this. Metal clips, fire-rated cleats, or cables in metallic containment are the compliant options. The classic apprentice trap is using the same plastic clips throughout without thinking about the route the cable is taking.',
  },
  {
    id: 6,
    question:
      'You inspect a finished install and notice an MCB has been fitted in the neutral conductor of one circuit (someone got the busbar wrong). This is a non-conformance against:',
    options: [
      'Reg 411.3.3 — the requirement for 30 mA RCD additional protection on socket circuits.',
      'Reg 314.1 — the requirement to divide an installation into separate circuits.',
      'Reg 537.2.2 / 514.16 — single-pole devices for protection or switching shall be in line conductors only.',
      'Reg 643.6 — the verification of polarity at every accessory during testing.',
    ],
    correctAnswer: 2,
    explanation:
      'Single-pole devices in line conductors only is fixed by Reg 537.2.2 (and verified at inspection by the matching Schedule of Inspections item, mapped to Reg 514.16). An MCB in the neutral provides no overcurrent protection on the line conductor and leaves the circuit live when the neutral MCB trips. Flat fail, must be re-wired before energising.',
  },
  {
    id: 7,
    question:
      'On a periodic inspection of a 5-year-old install, you find that supplementary bonding has been installed in a bathroom but the bond from the bath mixer tap has only been clamped at one end and is hanging loose at the other. This is:',
    options: [
      'Acceptable — supplementary bonding only needs to be clamped at one end, because the metal pipework completes the rest of the path, so a single connection is compliant.',
      'A limitation (LIM) — the loose end is behind the bath panel and cannot be assessed without removing it, so it is recorded as inaccessible rather than as a defect.',
      'A C3 improvement item only — the bond is still partly connected, so it provides some protection and is recommended for improvement rather than coded as dangerous.',
      'A non-conformance — the bond is not continuous, fails the inspection of bonding (Schedule of Inspections section 12), and would also fail a continuity test.',
    ],
    correctAnswer: 3,
    explanation:
      'Supplementary bonding (where present) must be continuous and verified by both visual inspection (the clamp is connected at both ends) and continuity test (the resistance from one end to the other is acceptably low). A clamp connected at only one end provides no equipotential bonding — current cannot flow through it because the circuit is open. Schedule of Inspections section 12 catches this; Section 6 testing confirms it.',
  },
  {
    id: 8,
    question:
      'A supervisor catches a non-conformance on your install and tells you to stop, fix it, and re-inspect. The right mindset is:',
    options: [
      'Take the feedback as the whole point of the supervised apprenticeship; understand what the defect was, why it&rsquo;s a non-conformance, fix it properly, learn so it does not happen on the next install.',
      'Explain to the supervisor why the defect is not really a problem and ask them to sign the work off as it stands, since the install would probably function regardless.',
      'Fix the item quickly without asking what was wrong, so the supervisor sees it corrected and does not record the non-conformance against your work.',
      'Energise the install first to prove it works, then address the supervisor&rsquo;s point only if a fault actually develops once the circuit is live.',
    ],
    correctAnswer: 0,
    explanation:
      'Catching defects on apprentice work is exactly what supervision is for — the inspection is the safety net before energisation. Every caught defect is a learning opportunity. The apprentice who responds well to inspection feedback (understands the regs, fixes properly, does not repeat) is the apprentice who passes the AM2 and gets signed off as a competent person. The apprentice who argues, hides, or rushes is the one who has long conversations with the training officer.',
  },
];

const faqs = [
  {
    question: 'Why does the supervisor catch so many of my defects? I thought I was being careful.',
    answer:
      'Because the supervisor has done the inspection rhythm hundreds or thousands of times — they know exactly where to look and exactly what to look for. The defects you miss are the ones experience teaches you to spot. Every inspection where the supervisor catches something is one fewer thing you will miss next time. By the end of the apprenticeship the gap closes — your supervisor will catch fewer and fewer items and eventually trust you to inspect alone. That progression is the entire point of supervised apprentice work.',
  },
  {
    question:
      'How do I tell the customer I cannot energise today because of a non-conformance?',
    answer:
      'Honestly and directly. "We&rsquo;ve found one item on the install that we need to put right before we can energise safely. It&rsquo;s a small fix and we&rsquo;ll have it sorted in [time]. The reason we don&rsquo;t energise with this defect is [brief explanation of risk — fire / shock / non-compliance with the wiring regulations]. Thank you for understanding." Most customers appreciate the discipline once they understand the reason. Customers who push you to energise an install with a known defect are not customers worth the callback.',
  },
  {
    question:
      'I keep making the same mistake — terminations with copper showing past the brass. How do I stop?',
    answer:
      'Two practical fixes. (1) Calibrate your strip length. T&E inner sheath strip should leave the copper exactly long enough to fully enter the terminal with no excess past the brass. Buy a cable stripper with an adjustable stop and set it once. (2) Change your tug-test habit — after every termination, gently tug the conductor and look at the back of the terminal. If you can see copper, you stripped too long; pull out, snip back, re-strip, re-terminate. Five minutes extra per termination at first; second nature within a month. The supervisors who never see it on inspection are the ones who developed this habit early in their apprenticeship.',
  },
  {
    question:
      'Are the new A4:2026 changes (Type A minimum, AFDDs in HRRBs, fire-resistant supports) actually being inspected on real jobs yet?',
    answer:
      'Yes. A4:2026 is the current edition of BS 7671. As soon as an amendment is published and adopted, inspections are made against it. Older installs do not have to be retro-fitted to the new regs (they were compliant when installed), but new work and additions/alterations must comply with the current amendment. So on a new install or a CU swap done after the A4:2026 effective date, Type AC RCDs are a non-conformance per Reg 531.3.3, AFDDs are recommended for AC final circuits supplying socket-outlets ≤ 32 A in dwellings per Reg 421.1.7 (with the recommendation strengthening to a requirement in HRRBs via the Building Safety Act 2022 framework, and effectively required practice in HMOs / sleeping accommodation / care homes per supporting fire-safety guidance), plastic clips on cables in escape routes are a fail. Stay current with the regs.',
  },
  {
    question:
      'How does the inspector know to check for these specific items? Is there a hidden rulebook?',
    answer:
      'Not hidden — it&rsquo;s the IET Guidance Note 3 (Inspection and Testing), the OSG, and the BS 7671 regs themselves. GN3 in particular lays out the inspection items and their interpretation in plain English. Most experienced inspectors carry a mental "checklist of suspicion" built up from every install they have seen go wrong — they are pattern-matching against past experience. The ten items in this Sub are the most common patterns. Once you have inspected fifty installs you build the same mental checklist yourself.',
  },
  {
    question: 'What is the cost of a non-conformance caught at inspection vs caught later?',
    answer:
      'At inspection, before energisation — a non-conformance costs minutes to fix. Re-strip and re-terminate. Connect the missing CPC. Fit the missing label. Five minutes, no second visit, no rework cost. Caught after energisation, on a callback — a non-conformance costs a return visit (travel + time + apologies), often opening the install back up, possibly disturbing customer&rsquo;s decorating or finishes, and a damaged reputation. Caught much later, after a fault has occurred — a non-conformance can cost a personal injury claim, an HSE investigation, criminal prosecution under EAWR or the Building Safety Act, and the contracting business&rsquo;s insurance cover. The economic argument for slowing down at inspection is overwhelming.',
  },
];

const nonConformances = [
  {
    n: 1,
    title: 'Termination not torqued correctly',
    spotted:
      'Visible loose conductor at terminal, copper protruding past the brass, sheath / insulation trapped under the screw, conductor pulls out under gentle tug-test.',
    fix:
      'Loosen the terminal, remove conductor, re-strip to correct length (calibrated cable stripper or careful measurement), re-terminate, torque to manufacturer&rsquo;s spec with a torque screwdriver.',
    avoid:
      'Calibrate your strip length once and stick to it. Tug-test every termination immediately after you make it. Use a torque screwdriver on terminals where the manufacturer specifies a value (most modern RCBOs do).',
    reg: 'Reg 526.1',
  },
  {
    n: 2,
    title: 'R1 + R2 too high on a circuit',
    spotted:
      'Continuity test reading significantly higher than design — typically more than 50% above the predicted value. Usually points to a high-resistance joint at an unaccessible junction box.',
    fix:
      'Investigate. Test sub-sections of the circuit until you isolate the problem joint. Re-make the joint properly (proper terminal block, full conductor strip, screw torqued, no insulation trapped). Retest end-to-end.',
    avoid:
      'Avoid hidden junction boxes wherever possible — JB-free wiring is the gold standard. Where joints are unavoidable, use BS-rated maintenance-free joints and put them somewhere accessible.',
    reg: 'Reg 526.3',
  },
  {
    n: 3,
    title: 'Polarity reversed at an accessory',
    spotted:
      'Polarity test confirms line and neutral are landed in the wrong terminals at one or more accessories. Lamp may still light, but switch leaves it permanently live.',
    fix:
      'Disconnect circuit. Re-terminate the affected accessory with line on L, neutral on N, CPC on E. Retest polarity at every accessory on the circuit, not just the one you fixed.',
    avoid:
      'Take a moment at every termination to verify the colour-to-terminal mapping. Brown to L, blue to N, green-yellow to E. On switched lives, identify with brown sleeving at both ends so you do not confuse line with switched return.',
    reg: 'Reg 643.6 (testing) + Reg 514 (identification)',
  },
  {
    n: 4,
    title: 'CPC not connected at a metal-bodied (Class I) accessory',
    spotted:
      'Visual inspection — CPC is cut off short, ignored, or floating. The metal body of the accessory is an exposed-conductive-part with no protective earth connection.',
    fix:
      'Bring CPC back to the correct length (or replace cable section if too short), sleeve in green/yellow, terminate at the earth terminal of the accessory. Retest continuity.',
    avoid:
      'Treat every Class I accessory the same — the CPC is non-negotiable. Even if the lamp / appliance "works fine" without it, the install is non-compliant and dangerous. Flag every metal-bodied fitting as a Class I CPC checkpoint.',
    reg: 'Reg 411.3.1.1',
  },
  {
    n: 5,
    title: 'Main bonding installed but not verified continuous',
    spotted:
      'Inspection — clamp connected at the gas / water service but cable runs to a junction or a clamp that has not been fully tightened. Continuity test confirms the bond is open.',
    fix:
      'Trace the bonding cable end-to-end. Re-make any joint or unclamped connection. Verify continuity between the MET and each bonded service is acceptably low (typically < 0.05 Ω after lead null).',
    avoid:
      'Test bonding continuity as part of the build, not just at inspection. Every clamp fitted gets a quick continuity check before you move on.',
    reg: 'Reg 411.3.1.2 + Reg 643.2.1',
  },
  {
    n: 6,
    title: 'Cable type mismatch — T&E in escape route void without fire-resistant supports',
    spotted:
      'Visual inspection — cables on plastic clips in a stairwell ceiling void, no metallic containment, no fire-rated cleats. In a fire, the plastic clips melt and the cable falls.',
    fix:
      'Replace plastic clips with metallic clips, fire-rated cleats, or contain cables in metallic conduit / tray. Verify all cables on escape routes are properly supported.',
    avoid:
      'When marking out a route, identify any escape route sections at the start. Order fire-rated supports for those sections specifically. Plastic clips for general work, fire-rated supports where escape routes apply.',
    reg: 'Reg 522.8.5 (cable support) + escape route support requirements (A4:2026 update)',
  },
  {
    n: 7,
    title: 'RCBO Type AC where Type A required',
    spotted:
      'Inspection of CU — RCBOs are Type AC. Install includes modern equipment with DC components (LED drivers, induction hob, EV charger, switch-mode supplies). Reg 531.3.3 (A4:2026) requires Type A as minimum.',
    fix:
      'Replace Type AC RCBOs with Type A (or Type B for EV charging circuits and similar). Order the right type from day one on a new install — Type A is now the default.',
    avoid:
      'Default-spec Type A on every quote. Type AC is now a special case (only for fixed equipment with no DC components — vanishingly rare in modern installs). Type B for EV per Section 722.',
    reg: 'Reg 531.3.3 (A4:2026 update)',
  },
  {
    n: 8,
    title: 'Missing AFDD on HRRB / HMO socket circuit',
    spotted:
      'Inspection of CU in a Higher-Risk Residential Building, HMO, sleeping accommodation or care home — final circuits supplying socket-outlets do not have AFDD protection. AFDDs are recommended by BS 7671 Reg 421.1.7; the recommendation strengthens to a requirement in HRRBs under the Building Safety Act 2022 framework, and supporting fire-safety guidance for HMOs / sleeping accommodation / care homes treats them as effectively required practice.',
    fix:
      'Replace standard RCBOs with AFDD-RCBOs on the relevant AC final circuits supplying socket-outlets ≤ 32 A. Cost difference is real but small relative to the safety benefit and the building-safety expectation.',
    avoid:
      'Identify the building type at the design stage. HRRB → AFDDs required by Building Safety Act framework. HMO / sleeping accommodation / care home → AFDDs are effectively required practice under supporting fire-safety guidance. General dwelling → AFDDs recommended by Reg 421.1.7 (and a sensible spec on key circuits) but not mandated by BS 7671 itself.',
    reg: 'Reg 421.1.7 (A4:2026 update) + Building Safety Act 2022 framework for HRRBs',
  },
  {
    n: 9,
    title: 'Warning notices missing — BS 951 / RCD test / mixed colours / EV / PV',
    spotted:
      'Inspection of CU and bonding clamps — bonding labels missing on one or more clamps, RCD test notice missing, mixed-cable-colours notice missing on a part-rewired install, EV / PV notices missing where applicable.',
    fix:
      'Fit the missing labels. Sticky-back BS 951 labels for bonding clamps. Standard RCD test notice on the CU. Mixed-cable-colours notice if the install has both old and new cable colours. EV / PV notices per Sections 722 / 712.',
    avoid:
      'Carry a label kit in the van — BS 951 stickers, RCD test notice, mixed-colours notice, periodic inspection notice. Fit them as you go, not as an afterthought.',
    reg: 'Reg 514.12 / 514.13 / 514.14',
  },
  {
    n: 10,
    title: 'Schedule of Test Results incomplete or inconsistent with instrument download',
    spotted:
      'Supervisor reviewing test pack — handwritten readings on the Schedule of Test Results do not match the values stored on the multifunction tester memory. Suggests transcription error, lost values, or invented numbers.',
    fix:
      'Re-test the affected circuit(s). Record values from the instrument download directly. Re-issue the Schedule of Test Results with verified values.',
    avoid:
      'Use the MFT&rsquo;s memory function during testing — record each value as you take it, with the circuit identifier. At the end, download to PDF or transcribe directly from the instrument. Never write up a test pack from memory after the day is over.',
    reg: 'Reg 642.4 + Section 643 (recording)',
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 4"
            title="Common non-conformances on first inspection"
            description="The classic apprentice traps a supervisor catches on first install inspection — terminations, polarity, missing CPC, wrong RCD type, AFDD gaps, missing notices — and how to avoid them."
            tone="emerald"
          />

          <TLDR
            points={[
              'Ten classic non-conformances catch most apprentices on their first independent install — terminations, R1+R2 high, polarity reversed, missing CPC, bonding open, wrong cable supports, Type AC RCBOs, missing AFDDs, missing warning notices, sloppy test recording.',
              'Each item maps back to a specific BS 7671 regulation. The supervisor catches them by pattern recognition built from experience. Avoiding them is a habit you build over the apprenticeship.',
              'The meta-mistake is rushing the inspection because the customer wants the install live. A defect caught at inspection costs minutes; the same defect caught after energisation costs a callback, a damaged reputation, or worse.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Supplementary content — extends LO5 but is not directly mapped to a 204 AC. Designed to deepen apprentice understanding of inspection practice.',
              'Identify the ten most common non-conformances found at first install inspection.',
              'Map each non-conformance back to the BS 7671 regulation it breaches.',
              'Explain how a supervisor or inspector spots each defect on a visual walk-round or test sequence.',
              'Apply the right fix for each non-conformance and the build-time habit that prevents it next time.',
              'Recognise when customer pressure to energise is in conflict with safe inspection practice and resist it.',
              'Reflect on supervisor feedback constructively — every caught defect is a learning opportunity.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="The catch-rate is the whole point of supervised inspection"
            plainEnglish="An apprentice working their first few independent installs will have non-conformances caught on inspection. That is the whole point — supervision is the safety net before energisation. The skill is responding properly to caught defects: understanding why it&rsquo;s a non-conformance, fixing it correctly, learning so it does not happen on the next install."
            onSite="Every supervisor has a story about an apprentice who responded badly to feedback — argued, hid the defect, rushed the fix. Those apprentices struggle through assessment. Every supervisor also has stories about apprentices who absorbed feedback gracefully and turned into competent engineers within two years. The mindset matters as much as the skill."
          >
            <p>
              The ten non-conformances below are not exhaustive — they are the
              highest-frequency patterns you will see flagged on a first inspection. Each
              one maps to a BS 7671 regulation and to a specific Schedule of Inspections
              item. Each one has a recognisable signature, a known fix, and a habit you
              can build to avoid it next time.
            </p>
            <p>
              Treat this Sub as your &ldquo;watch out for&rdquo; reference. Read it
              before your first independent inspection. Read it again after the
              supervisor has caught one or two defects. By the time you have done five
              or six full inspections, the patterns are second nature.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The inspector&rsquo;s mindset — pattern recognition</ContentEyebrow>

          <ConceptBlock
            title="How an experienced inspector sees an install"
            plainEnglish="An experienced inspector walks into a CU and sees ten things at once. The cable colours, the labelling, the busbar arrangement, the SPD presence, the bonding clamp positions, the way the tails are dressed. They are pattern-matching against every install they have ever seen. Defects light up because they break the pattern."
            onSite="You will not have this pattern library on day one. You build it install by install. The fastest way to build it is to walk inspections alongside experienced inspectors and ask &lsquo;what are you looking at?&rsquo; at each step. After fifty supervised inspections you have the library too."
          >
            <p>
              <strong>What the experienced eye notices on a CU walk-up:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The dressing of the tails</strong> — neat, supported, no strain
                at the terminations, sheath stripped to the right point.
              </li>
              <li>
                <strong>The way labelling</strong> — handwritten panic labels versus
                printed legible labels matching the schedule.
              </li>
              <li>
                <strong>The busbar arrangement</strong> — RCBOs all the right way up,
                line and neutral on correct poles, no missing modules.
              </li>
              <li>
                <strong>The CPC arrangement</strong> — every CPC sleeved and to the
                earth bar, no orphan CPCs, no &ldquo;temporary&rdquo; choc-block joints.
              </li>
              <li>
                <strong>The notices</strong> — periodic inspection, RCD test, mixed
                colours, SPD, AFDD, EV, PV — fitted as appropriate.
              </li>
              <li>
                <strong>The first impression</strong> — does this look like the work of
                someone who cared, or someone who rushed? An install built with care
                rarely has hidden defects; one built in a rush usually has several.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The ten high-frequency non-conformances</ContentEyebrow>

          <ConceptBlock
            title="What the supervisor catches — and why"
            plainEnglish="Each non-conformance below is set out the same way. What the supervisor sees on the inspection. What regulation it breaches. The fix on the day. The habit to build to avoid it next time."
          >
            <div className="space-y-3">
              {nonConformances.map((nc) => (
                <div
                  key={nc.n}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
                >
                  <div className="flex items-baseline gap-2.5 border-b border-white/[0.08] pb-2 mb-2.5">
                    <span className="text-elec-yellow font-bold text-[14px] tracking-wider">
                      #{nc.n}
                    </span>
                    <span className="text-white text-[14px] font-semibold flex-1">
                      {nc.title}
                    </span>
                    <span className="text-[10.5px] uppercase tracking-wider text-white/55 font-medium whitespace-nowrap">
                      {nc.reg}
                    </span>
                  </div>
                  <div className="space-y-2 text-[12.5px]">
                    <div>
                      <div className="text-white/55 text-[11px] uppercase tracking-wider mb-0.5">
                        How it&rsquo;s spotted
                      </div>
                      <p className="text-white/85 leading-relaxed">{nc.spotted}</p>
                    </div>
                    <div>
                      <div className="text-white/55 text-[11px] uppercase tracking-wider mb-0.5">
                        Fix on the day
                      </div>
                      <p className="text-white/85 leading-relaxed">{nc.fix}</p>
                    </div>
                    <div>
                      <div className="text-white/55 text-[11px] uppercase tracking-wider mb-0.5">
                        Habit to avoid it next time
                      </div>
                      <p className="text-white/85 leading-relaxed">{nc.avoid}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.1.1 (Protective earthing)"
            clause="Exposed-conductive-parts shall be connected to a protective conductor under the specific conditions for each type of system earthing as specified in Regulations 411.4 to 411.6. Simultaneously accessible exposed-conductive-parts shall be connected to the same earthing system individually, in groups or collectively. Conductors for protective earthing shall comply with Chapter 54. A circuit protective conductor shall be run to and terminated at each point in wiring and at each accessory except a lampholder having no exposed-conductive-parts and suspended from such a point."
            meaning={
              <>
                Reg 411.3.1.1 fixes the rule that catches non-conformance #4 — the
                missing CPC. Every Class I exposed-conductive-part has to be connected
                to the protective conductor system. The only exception is a lampholder
                with no exposed-conductive-parts (e.g. a plastic batten holder) suspended
                from a point that has the CPC terminated. Every metal-bodied luminaire,
                socket faceplate, switch faceplate, FCU, accessory — CPC required.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.1.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (Arc fault detection devices)"
            clause="Regulation 421.1.7 recommends the installation of arc fault detection devices (AFDDs) to mitigate the risk of fire in AC final circuits supplying socket-outlets, with a rated current not exceeding 32 A, in dwellings — to mitigate the effects of arc fault currents."
            meaning={
              <>
                Reg 421.1.7 catches non-conformance #8. AFDDs are{' '}
                <strong>recommended</strong> for AC final circuits supplying socket-outlets
                up to 32 A in dwellings (per BS 7671 Reg 421.1.7). The recommendation
                strengthens to a <strong>requirement</strong> in Higher-Risk Residential
                Buildings (HRRBs) under the Building Safety Act 2022 framework — not via
                BS 7671 itself. In HMOs, sleeping accommodation and care homes, supporting
                fire-safety guidance treats AFDDs as effectively required practice. Cite
                Reg 421.1.7 as &lsquo;recommending&rsquo;, not as imposing a strict
                BS 7671 requirement, when discussing the BS 7671 position; cite the
                Building Safety Act framework when discussing the HRRB requirement.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 42, Regulation 421.1.7; Building Safety Act 2022 and supporting building-safety guidance for HRRBs."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.13 (Bonding clamp labelling)"
            clause="A permanent label complying with BS 951 shall be permanently fixed in a visible position at or near the point of connection of every earthing conductor to an earth electrode and of every bonding conductor to an extraneous-conductive-part."
            meaning={
              <>
                Reg 514.13 catches non-conformance #9 — missing BS 951 bonding label. Every
                main bonding clamp must carry the &ldquo;Safety Electrical Connection —
                Do Not Remove&rdquo; label so plumbers and others working on the service
                know not to remove the bond. Sticky-back BS 951 labels live in your van —
                fit one at every clamp as you go.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 51, Regulation 514.13 (paraphrased — see also BS 951)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 531.3.3 (RCD types — A4:2026 update)"
            clause="531.3.3 now states that RCD Type AC shall only be used to serve fixed equipment, where it is known that the load current contains no DC components."
            meaning={
              <>
                Reg 531.3.3 (as updated by A4:2026) catches non-conformance #7 — Type AC
                RCBOs on circuits with modern loads. Type AC is now restricted to fixed
                equipment where load current contains no DC components — a vanishingly
                small set of cases in modern installs. Default to Type A as the minimum
                for general wiring; Type B for EV per Section 722. Spec Type A from
                day one on every quote.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 53, Regulation 531.3.3."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <SectionRule />

          <ContentEyebrow>Communicating non-conformances — to the customer, to the team</ContentEyebrow>

          <ConceptBlock
            title="How to deliver bad news without losing the customer"
            plainEnglish="Telling a customer that their install will not be energised today because of a non-conformance is one of the harder customer-facing conversations you have on a job. The technique is the same every time — direct, honest, brief, with a clear path to resolution."
            onSite="Customers on a CU swap or a new install want it live. Your job is to communicate the defect, the risk, the fix and the timing — without hedging, without blame-shifting, without panic."
          >
            <p>
              <strong>The four-part conversation:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/80 text-[13.5px]">
              <li>
                <strong>State the defect plainly:</strong> &ldquo;During the inspection
                we&rsquo;ve found that the polarity at one of the bedroom sockets is
                reversed.&rdquo;
              </li>
              <li>
                <strong>Explain the risk in plain language:</strong> &ldquo;That means
                the live pin is in the wrong place, which is a shock risk for anyone
                unplugging an appliance.&rdquo;
              </li>
              <li>
                <strong>Explain the fix:</strong> &ldquo;We&rsquo;ll re-terminate the
                socket properly and re-test. Takes about 20 minutes.&rdquo;
              </li>
              <li>
                <strong>Confirm the timeline:</strong> &ldquo;You&rsquo;ll have the
                power back on by [time]. Thank you for being patient — this is the kind
                of thing the inspection step is designed to catch before energising.&rdquo;
              </li>
            </ol>
            <p>
              <strong>What not to do:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Blame other tradespeople (&ldquo;the previous electrician&rdquo;,
                &ldquo;the apprentice&rdquo;) — even if true, the customer does not
                care.
              </li>
              <li>
                Hedge or downplay (&ldquo;it&rsquo;s probably fine but...&rdquo;) — gives
                the customer permission to push you to energise.
              </li>
              <li>
                Catastrophise (&ldquo;could burn the house down&rdquo;) — even if true,
                creates panic and damages trust.
              </li>
              <li>
                Apologise excessively — the inspection working is exactly what the
                customer is paying for. You found a defect at the right time.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Habits and tools that prevent defects at build time</ContentEyebrow>

          <ConceptBlock
            title="The build-time habits that catch the defect before the inspection does"
            plainEnglish="The best inspection is one where the supervisor finds nothing — because every defect was caught at build time by the apprentice&rsquo;s own habits. Below — the practical habits that pay off install after install."
            onSite="Adopt one new habit at a time. Calibrate your strip length first. Then tug-test every termination. Then verify polarity at every accessory before the faceplate goes on. By the end of Year 1 you have the full set and the supervisor catches almost nothing."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Calibrate strip length</strong> — adjustable cable stripper with
                a stop, set once, used always. No copper past the brass, ever.
              </li>
              <li>
                <strong>Tug-test every termination</strong> — gentle, controlled, immediately
                after termination. If it pulls out, re-strip and re-make.
              </li>
              <li>
                <strong>Sleeve the CPC at every termination</strong> — green/yellow on
                every bare CPC. Never leave bare copper on a CPC at any termination,
                including back-box flying leads.
              </li>
              <li>
                <strong>Identify switched lives</strong> — brown sleeving at both ends
                of any switched live. Eliminates polarity confusion at the rose / switch.
              </li>
              <li>
                <strong>Test as you build</strong> — continuity at every termination,
                IR before energising, polarity at every accessory before the faceplate
                goes on.
              </li>
              <li>
                <strong>Label every CU way before closing the cover</strong> — handwritten
                in pencil during build, replaced with printed labels at handover.
              </li>
              <li>
                <strong>Carry a label kit</strong> — BS 951 stickers, RCD test notice,
                periodic inspection notice, mixed-colour notice, SPD notice. Fit as you
                go.
              </li>
              <li>
                <strong>Photograph every termination</strong> at first-fix before the
                accessory faceplate goes on. Builds a portfolio audit trail and
                discourages corner-cutting.
              </li>
              <li>
                <strong>Use the MFT memory</strong> — every test value saved with circuit
                identifier on the instrument. Download at end of day. No transcription
                errors.
              </li>
              <li>
                <strong>Run the inspection rhythm</strong> in the same order every time.
                Origin → distribution → circuits → bonding → notices. Repetition builds
                speed without sacrificing thoroughness.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Findings on the EIC — observations and recommendations</ContentEyebrow>

          <ConceptBlock
            title="When a non-conformance can be accepted on the EIC"
            plainEnglish="On a brand-new install, every non-conformance must be fixed before the EIC is issued — there is no &lsquo;observation&rsquo; for new work. On periodic inspection (EICR), findings are coded as observations using C1 (immediate danger), C2 (potentially dangerous), C3 (improvement recommended) or FI (further investigation required). The EIC is a different beast from the EICR."
            onSite="Most apprentice work is new installs / additions / alterations — EIC territory. The defects you find at inspection get fixed, full stop. The EICR observation codes come later in the qualification (I&T) when you start signing off periodic inspections on existing installs."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EIC (new install):</strong> Schedule of Inspections and Schedule
                of Test Results both clean (✓ throughout, honest LIMs documented, zero
                ✗). Any defect = fix before EIC issued.
              </li>
              <li>
                <strong>EICR (periodic inspection):</strong> Observations coded C1
                (immediate danger — power off the affected part of the install
                immediately), C2 (potentially dangerous — fix soon), C3 (improvement
                recommended — not strictly non-compliant but worth fixing), FI (further
                investigation — cannot determine compliance without additional work).
              </li>
              <li>
                <strong>Minor Works Certificate:</strong> Used for additions or alterations
                that are not a complete install. Same logic — defects in the new work
                must be fixed before the certificate is issued.
              </li>
            </ul>
            <p>
              The Level 2 apprentice&rsquo;s job is to deliver clean inspection findings
              on new work. The I&T qualification (2391 / 2392 series) covers the
              observation-coding nuances of EICR work.
            </p>
          </ConceptBlock>

          <SectionRule />

          <CommonMistake
            title="Rushing the inspection because the customer wants the install live"
            whatHappens={
              <>
                The customer is on site, the kettle is unplugged, the freezer is
                defrosting, and they are pushing you hard to energise. You have one
                terminal you are not 100% sure about — copper might be showing past the
                brass on the line of circuit 4 — but you have not opened the CU again
                to check. You decide to call it ✓ on the Schedule of Inspections,
                energise, and "fix it on the next visit if it&rsquo;s a real issue".
                That single decision puts you on a path that ends in a callback, a
                potential fault, and a difficult conversation with your supervisor.
              </>
            }
            doInstead={
              <>
                Slow down. The cost of a five-minute re-check is nothing compared to the
                cost of a defect caught after energisation. Tell the customer honestly:
                &ldquo;We&rsquo;ve found one item to verify before we energise — give us
                ten minutes.&rdquo; Open the CU, look at the terminal in question, fix
                if needed, retest if needed. Then energise. <strong>The whole point of
                inspection-before-energisation is that defects are cheap to fix at this
                stage and expensive to fix later.</strong> A customer who pushes you to
                energise an install with a known suspicion is asking you to put their
                safety after their convenience. You do not negotiate with that.
              </>
            }
          />

          <Scenario
            title="First-day-on-tools apprentice&rsquo;s inspection of their first ring final"
            situation={
              <>
                You have just wired your first ring final under supervision. Two
                upstairs bedroom sockets and three downstairs sockets, 2.5 mm² T&E,
                32 A RCBO Type A, all terminations made by you. The supervisor walks
                in, opens the CU, opens one socket, glances at the cable runs, and says
                &ldquo;right — talk me through your inspection of this circuit&rdquo;.
                The five things they are about to catch are predictable.
              </>
            }
            whatToDo={
              <>
                Walk the circuit honestly. Open every socket faceplate (loose, so you
                can see the terminations). At the CU, look at the line, neutral and CPC
                terminations of the RCBO — copper to the brass, no excess past, sleeve
                on the CPC, no insulation trapped. At each socket, the same — line on L,
                neutral on N, CPC on E with green/yellow sleeve, all secure, all behind
                grommets in metal back-boxes. The five things the supervisor catches:
                (1) one termination at the CU with a millimetre of copper showing past
                the brass — re-strip and re-terminate; (2) one socket where the back-box
                grommet is missing — fit one; (3) the CPC at one back-box without sleeving
                on the flying lead — sleeve it; (4) the way label on the CU says
                &ldquo;sockets&rdquo; instead of &ldquo;upstairs sockets ring&rdquo; —
                update the label; (5) on the ring final continuity test, R1+R2 readings
                vary by more than expected at one socket — sounds like one of the
                connections is not as tight as it should be, re-check and re-make.
                Five fixes, fifteen minutes, then re-test.
              </>
            }
            whyItMatters={
              <>
                These are the five most common defects on a first ring final inspection.
                Catching them at supervised inspection is exactly what the apprentice
                phase is for. By the time you have wired and inspected ten ring finals,
                you will spot all five before the supervisor does. By the time you have
                wired and inspected fifty, you will have built the habits that prevent
                them at the build stage. That progression is the apprenticeship.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The cost of catching late versus catching early</ContentEyebrow>

          <ConceptBlock
            title="Why slowing down at inspection is the cheapest decision you make all day"
            plainEnglish="The economic argument for thorough inspection is overwhelming. A defect caught at inspection takes minutes to fix on the spot. The same defect caught after energisation costs a callback. The same defect caught after a fault costs a personal injury claim and an HSE investigation. The cost curve is exponential."
            onSite="When the customer is pressuring you to energise, do the maths in your head. Five minutes now versus a callback next week versus a tribunal in three years. The five minutes always wins."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Caught at inspection (before energisation):</strong> Cost = 5–20
                minutes of fixing. Customer impact = minimal delay. Reputation impact
                = positive (the inspection worked as designed).
              </li>
              <li>
                <strong>Caught at testing (defect picked up by IR or continuity):</strong>
                Cost = 30–60 minutes of investigation plus the fix. Customer impact =
                small delay. Reputation impact = neutral.
              </li>
              <li>
                <strong>Caught on callback (customer reports a fault):</strong> Cost =
                travel + 1–2 hours on site + apologies + opening the install back up +
                potentially disturbing customer&rsquo;s decorating. Reputation impact
                = damaged.
              </li>
              <li>
                <strong>Caught after a fault (fire, shock, near-miss):</strong> Cost =
                potential personal injury claim, insurance excess, possible HSE / EAWR
                / Building Safety Act investigation, criminal prosecution risk. Reputation
                impact = severe; potentially career-ending for the signing electrician.
              </li>
              <li>
                <strong>Caught at next periodic inspection (5–10 years later):</strong>
                Cost = customer pays for full remedial work plus EICR, you may be liable
                under the original EIC if the defect was present at original install.
                Reputation impact = damaging.
              </li>
            </ul>
            <p>
              The five-minute fix at inspection time is not a delay — it is the lowest-cost
              option in this entire chain. Treat every inspection as the gate it is meant
              to be.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Apprentice progression — what good looks like</ContentEyebrow>

          <ConceptBlock
            title="The trajectory from &lsquo;catches everything&rsquo; to &lsquo;catches nothing&rsquo;"
            plainEnglish="Across an apprenticeship, the rate at which the supervisor catches your defects should drop. Year 1: ten defects per inspection caught by the supervisor, lots of conversations. Year 2: three or four defects per inspection. Year 3: occasional finding, supervisor mostly verifying your inspection rather than catching defects you missed. Once qualified: defects caught by the supervisor are rare and surprising on both sides."
            onSite="Track this yourself. Keep a quick note of supervisor findings on each inspection. The trend should be downward. If it is not — if you are at month 18 still having the same defects flagged — the conversation with your training officer is going to be about whether the right habits are being formed."
          >
            <p>
              <strong>The four-stage progression:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/80 text-[13.5px]">
              <li>
                <strong>Observe (months 1–6):</strong> You carry the clipboard, hold the
                torch, write down what the senior electrician calls out. You watch the
                rhythm. You ask &lsquo;why&rsquo; after the inspection, not during.
              </li>
              <li>
                <strong>Assist (months 6–18):</strong> You start running the Schedule of
                Inspections form yourself. You are catching the obvious defects yourself
                and flagging them. Supervisor catches a handful per inspection.
              </li>
              <li>
                <strong>Lead with sign-off (months 18–36):</strong> You run the inspection
                on small installs yourself, hand the form to the supervisor for review
                and counter-signature. Supervisor catches the occasional finding.
              </li>
              <li>
                <strong>Sign off independently (post-qualification):</strong> You sign
                your own inspections on installs you have built or supervised. EICR work
                via the I&T qualification adds another layer of certification.
              </li>
            </ol>
            <p>
              Year 1 you should not be embarrassed by defects flagged. Year 3 you should
              be slightly embarrassed when one is. By the end of the apprenticeship the
              supervisor finds nothing because the habits have been built.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Ten non-conformances catch most apprentices on first inspection — termination defects, R1+R2 high, polarity reversed, missing CPC, open bonding, wrong cable supports, Type AC RCBOs, missing AFDDs, missing notices, sloppy test recording.',
              'Each non-conformance maps to a BS 7671 regulation. Reg 526.1 (terminations), Reg 643.6 (polarity), Reg 411.3.1.1 (CPC), Reg 421.1.7 (AFDD), Reg 514.13 (BS 951 label), Reg 531.3.3 (Type A minimum), Reg 522.8.5 (cable support).',
              'A4:2026 brought new fail modes — Type AC restricted to no-DC-component loads (Reg 531.3.3), AFDDs recommended for AC final circuits supplying socket-outlets ≤ 32 A in dwellings (Reg 421.1.7) with the recommendation strengthening to a requirement in HRRBs under the Building Safety Act 2022 framework, tighter rules on cable supports in escape routes.',
              'The supervisor catches defects by pattern recognition built from experience. Every caught defect is a learning opportunity — understand the reg, fix correctly, build the habit that prevents it next time.',
              'The meta-mistake is rushing the inspection under customer pressure. A defect caught at inspection costs minutes; caught after energisation, it costs a callback or worse.',
              'Every termination tug-tested at build time. Every CPC verified continuous. Every label fitted as you go. Every Schedule of Test Results value recorded directly from the instrument. Habits matter more than memorising the regs.',
              'Spec Type A RCBOs as the default on every quote — Type AC is now the special case, not the norm.',
              'Customer pressure to energise an install with a known defect is never a valid reason to skip the fix. Your duty is to the safety of the install and its users, not to the schedule.',
            ]}
          />

          <Quiz
            title="Common non-conformances — knowledge check"
            questions={quizQuestions}
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section5/5-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.3 Dead testing prep + sequence
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section6/6-1')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.1 CPC continuity
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
