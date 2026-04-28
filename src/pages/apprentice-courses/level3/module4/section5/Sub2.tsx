/**
 * Module 4 · Section 5 · Subsection 2 — Verification, functional testing and retesting
 * Maps to C&G 2365-03 / Unit 303 / LO5 / AC 5.2
 *   AC 5.2 — "specify the procedures for verifying that the fault has been corrected suitably using technical analysis"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 5.2 — specify the procedures for
 * functional testing and identify tests that can verify fault correction.
 *
 * Frame: the post-rectification verification — what tests prove the fault
 * is corrected, BS 7671 643 retest cycle, functional testing on safety
 * systems, the customer hand-back demonstration.
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
  'Verification + functional testing (5.2) | Level 3 Module 4.5.2 | Elec-Mate';
const DESCRIPTION =
  'The post-rectification verification — what tests prove the fault is corrected, BS 7671 643 retest cycle, functional testing on safety systems, the customer hand-back demonstration.';

const checks = [
  {
    id: 'mod4-s5-sub2-retest',
    question:
      "After rectifying a fault on a domestic ring final, what BS 7671 643 tests should you run as part of the verification?",
    options: [
      "Just one.",
      "Five tests on the affected circuit. (1) Continuity — R1+R2 verifies the corrected joint reduces loop resistance to expected value. (2) Ring continuity (three-step) verifies ring topology is intact. (3) IR test verifies insulation hasn't been damaged during the work. (4) Polarity verifies any disturbed accessory was reconnected correctly. (5) EFLI Zs verifies the protective device disconnect time meets BS 7671 Table 41.3. Plus on RCD-protected: RCD trip-time test verifies the device operates correctly. The retest is documented on the certificate AND the job sheet — proof that the rectification worked.",
      "Just visual.",
      "Just continuity.",
    ],
    correctIndex: 1,
    explanation:
      "Post-rectification retest is what proves the fix worked. Skipping it = no evidence of correct repair = comeback risk + regulatory exposure. Standard L3 practice is the relevant BS 7671 643 tests on the affected circuit — five tests for a typical ring final.",
  },
  {
    id: 'mod4-s5-sub2-functional',
    question:
      "What's 'functional testing' and how is it different from BS 7671 643 testing?",
    options: [
      "Same.",
      "BS 7671 643 = ELECTRICAL tests (continuity, IR, polarity, EFLI, RCD trip-time). Functional testing = OPERATIONAL tests — does the system actually do what it's supposed to do? Examples: switch operates the correct circuit; light dims correctly across the dimmer range; smoke alarm sounds when test button pressed; emergency lighting illuminates on simulated mains failure; fire alarm panel signals out to ARC during a 'walk test'. Functional testing is essential for systems where the electrical compliance doesn't fully prove the operation. Standard L3 practice: BS 7671 643 + functional test on the affected system.",
      "Just visual.",
      "Just timing.",
    ],
    correctIndex: 1,
    explanation:
      "Functional testing complements BS 7671 643. The electrical tests prove the installation is electrically safe; the functional tests prove it actually works as intended. Both are needed for a defensible hand-back.",
  },
  {
    id: 'mod4-s5-sub2-handback',
    question:
      "What's the standard customer hand-back at the end of a fault-rectification visit?",
    options: [
      "Just leave.",
      "Five-step. (1) DEMONSTRATE the fix — show the customer that the original symptom is no longer present (e.g. 'the breaker's not tripping any more — try plugging in your kettle'). (2) WALK THROUGH the work done — what was found, what was fixed, what tests confirmed. (3) PROVIDE documentation — job sheet copy, any certificates, customer-friendly summary. (4) EDUCATE on prevention — what behaviours / conditions might cause recurrence, what to watch for. (5) AGREE next steps — any further work recommended, follow-up visit if needed, payment terms. The hand-back is what turns a job from 'work done' to 'customer satisfied'. Skipping it leaves customer feeling unfinished.",
      "Send invoice only.",
      "Just bill.",
    ],
    correctIndex: 1,
    explanation:
      "Customer hand-back is the closing act of every job. It's the moment the customer decides whether they're satisfied — and whether they'll call you back next time. The five-step structure makes the hand-back consistent and reduces post-job complaints.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Why is the post-rectification retest non-negotiable, not 'usually a good idea'?",
    options: [
      "It's optional.",
      "Three reasons. (1) PROVES THE FIX — confirms your repair actually worked, before the customer puts loads on it. (2) DETECTS NEW FAULTS — your work may have introduced a new fault (over-tightened terminal, repositioned cable chafing, swap component DOA). The retest catches it before the customer does. (3) GENERATES THE EVIDENCE — the post-rectification readings on the job sheet are the proof of compliance. Skipping the retest = no evidence of correct repair = comeback risk + regulatory exposure if anything goes wrong subsequently. The retest is part of the job, not optional polish.",
      "Just polish.",
      "Insurance.",
    ],
    correctAnswer: 1,
    explanation:
      "The retest is the closing of the diagnostic loop. Without it, you have a hypothesis confirmed by symptoms + tests + visual finding, then a fix — but no evidence the fix actually worked. The retest provides that evidence. BS 7671 643 + your job sheet documentation make it defensible.",
  },
  {
    id: 2,
    question: "What functional test verifies that an emergency lighting circuit is actually working?",
    options: [
      "Just check the bulb.",
      "BS 5266-1 monthly self-test (push the panel test button) AND annual 3-hour discharge test (simulate mains failure for 3 hours, verify illumination throughout). The 3-hour test is the definitive functional verification — confirms battery capacity, lamp operation, switching circuit. After fault rectification on an EL system, perform a 1-hour discharge test as minimum (verifies switching + lamp operation; full battery capacity confirmed at next annual test). Document on the EL log book.",
      "Visual only.",
      "Just monthly.",
    ],
    correctAnswer: 1,
    explanation:
      "Emergency lighting functional testing is its own discipline under BS 5266-1. The monthly self-test confirms switching + lamp; the annual 3-hour confirms battery capacity. After fault work, a partial discharge test verifies operation without depleting the battery; the next scheduled 3-hour confirms full capacity.",
  },
  {
    id: 3,
    question: "What's a 'walk test' on a fire alarm system and when is it required?",
    options: [
      "Just walk around.",
      "Walk test = activating each detector in turn (using a heat / smoke / pull station test tool) and verifying the panel correctly identifies the zone. BS 5839-1 requires a walk test as part of the annual service AND after any change to the system OR rectification of a fault that affected a zone. The L3 apprentice doesn't normally do fire-alarm walk tests (specialist work) but supports the senior fire-alarm engineer. The walk test verifies the addressable / zone identification AND the sounder operation. Documented in the fire alarm log book.",
      "Just visual.",
      "Random.",
    ],
    correctAnswer: 1,
    explanation:
      "Fire alarm walk testing is the operational verification that confirms each detector reports correctly to the panel. BS 5839-1 mandates it. After fault rectification on a fire-alarm zone, a walk test of that zone is the standard verification.",
  },
  {
    id: 4,
    question: "What records should you keep of the post-rectification verification?",
    options: [
      "None.",
      "Three. (1) Test readings — pre-rectification (the failed reading) and post-rectification (the corrected reading), with timestamps and instrument IDs. (2) Functional test outcomes — what was tested, what worked, any anomalies. (3) Customer hand-back record — what was demonstrated, what documentation provided, customer's signed acceptance. The records become the diagnostic narrative on the job sheet — defensible audit trail of what was found, what was done, what was verified.",
      "Just bill.",
      "Just verbal.",
    ],
    correctAnswer: 1,
    explanation:
      "Documentation is the audit trail. Pre-vs-post readings prove the fix worked. Functional test records prove the system operates correctly. Customer hand-back record proves the customer was satisfied and informed. The combination is the defensible record.",
  },
  {
    id: 5,
    question: "What if the post-rectification retest shows a NEW fault that wasn't present before?",
    options: [
      "Walk away.",
      "Stop, investigate. The new fault may have been (a) introduced by your work (terminal damaged, cable chafed, component DOA), (b) revealed by your work (a latent fault that the original fault was masking), (c) a pre-existing fault that the original work didn't touch. Treat as a new diagnostic problem — five-step action chain (verify, identify, make safe, document, rectify or escalate). Don't dismiss as 'must have been there before' without investigation. Customer brief: 'we found and fixed the original fault, but a new issue showed up on retest; we're investigating'.",
      "Ignore.",
      "Send invoice.",
    ],
    correctAnswer: 1,
    explanation:
      "New faults at retest are not unusual. Investigation is the right response — never dismiss. The action chain (Sub 4.3) applies. The customer brief should be honest about the new issue and the investigation; covering it up creates worse problems later.",
  },
  {
    id: 6,
    question: "What's the customer-friendly summary that should accompany the technical job sheet?",
    options: [
      "None needed.",
      "A 1-page document in plain English: (1) WHAT YOU REPORTED — customer's symptom in their words. (2) WHAT WE FOUND — the fault, in plain English. (3) WHAT WE DID — the fix, in plain English. (4) WHAT WE TESTED — the verification, in plain English. (5) RECOMMENDATIONS — anything further the customer should consider. (6) WARRANTY — what's covered for what period. (7) NEXT STEPS — any follow-up work, retest schedule, contact info. Most modern firms have a customer summary template; the apprentice fills it in at the end of each job. Customer keeps the summary; firm keeps the technical job sheet.",
      "Just the bill.",
      "Just verbal.",
    ],
    correctAnswer: 1,
    explanation:
      "Customer-friendly summary is the bridge between technical work and customer understanding. The technical job sheet is for the trade; the customer summary is for the customer. Both are needed; neither replaces the other.",
  },
  {
    id: 7,
    question: "Should you ever skip the customer demonstration step at hand-back?",
    options: [
      "Always.",
      "Only when the demonstration would put the customer at risk (e.g. testing a high-voltage three-phase circuit where the customer shouldn't be in the work area). For domestic and most commercial work, the demonstration is the moment that confirms to the customer that the work is done. Skipping it leaves the customer uncertain — 'is it really fixed?' — and creates the doubt that turns into complaints. The 5-second 'try plugging in your kettle now — see, no trip' is worth the time.",
      "Never.",
      "Random.",
    ],
    correctAnswer: 1,
    explanation:
      "Demonstration converts the customer from passive recipient to verified beneficiary. The customer who sees the fix work has nothing to complain about; the customer who only sees the invoice has plenty to complain about. The demonstration is a 30-second customer-confidence investment.",
  },
  {
    id: 8,
    question: "What documentation should accompany a fault-rectification visit on an EICR-coded installation?",
    options: [
      "None.",
      "Three documents. (1) Updated EICR (or supplementary report) — codes the previously-failed item as now compliant; references the rectification work. (2) Minor Electrical Installation Works Certificate (MEIWC) for the rectification work — formal compliance certificate for the new / repaired work under BS 7671. (3) Customer-friendly summary — what the certificates mean in plain English. The customer keeps all three; the firm retains copies for 7+ years. NICEIC / NAPIT registration audits will check the certificate trail.",
      "Just job sheet.",
      "Just bill.",
    ],
    correctAnswer: 1,
    explanation:
      "Certification follows the work. EICR-coded items rectified need updated coding; new / repaired work needs MEIWC; customer needs plain-English summary. The trade certifies the work; the customer needs to understand it. NICEIC / NAPIT firms have certification software (NICEIC Cert Plus, Easycert) that handles the formats.",
  },
];

const faqs = [
  {
    question: "Do I need to test the entire installation after a single-circuit fault rectification?",
    answer:
      "No — only the affected circuit and any circuit your work touched. The BS 7671 643 retest is targeted at proving your work didn't compromise compliance and that the rectified fault is now corrected. Full-installation retesting is for periodic inspection (EICR), not for fault rectification. Most fault-rectification jobs need 4–6 tests on the affected circuit; takes 15–30 minutes.",
  },
  {
    question: "What if the customer doesn't want to wait for the retest — they want me out the door?",
    answer:
      "Politely insist. Explain the retest is part of the work, not an extra. 'I need to confirm the repair is good before I leave — it'll take 15 minutes; I won't charge separately for it'. Customers who understand it's quality assurance usually accept. If they refuse outright, document on the job sheet that retest was declined; this protects the firm if a subsequent issue arises. The retest is non-negotiable from the firm's professional standards perspective.",
  },
  {
    question: "Can I skip retesting if the fix is 'obviously' good?",
    answer:
      "No. Obvious-looking repairs sometimes hide subtle problems — over-tightened terminals can crack, repositioned cables can chafe, swap components can be DOA. The retest catches what visual inspection misses. The 5-minute retest costs less than a return visit if the 'obvious' fix turned out not to be.",
  },
  {
    question: "How do I retest an RCD-protected circuit without tripping the RCD?",
    answer:
      "Use Hi-Z (no-trip) mode for EFLI testing (Sub 2.4). For RCD trip-time test, the RCD WILL trip (that's the test) — coordinate with customer for that brief outage. Other tests (continuity, IR, polarity) are dead tests and don't trip the RCD. Plan the test sequence to do trip-time last, after all other tests are complete.",
  },
  {
    question: "What's a 'partial discharge test' on emergency lighting and when is it appropriate?",
    answer:
      "Partial discharge = simulate mains failure for less than the full BS 5266 3-hour duration. Used after fault rectification to verify the EL system switches and operates correctly without depleting the battery (which then needs days to recharge). Typically 30–60 minutes is enough to verify operation. The next scheduled annual 3-hour test confirms full capacity. Document the partial discharge on the EL log book and note that full capacity will be verified at next scheduled.",
  },
  {
    question: "What customer-friendly format works for the work summary?",
    answer:
      "One side of A4. Plain English. Five sections — what reported, what found, what done, what tested, what recommended. Each section 1–3 sentences. No jargon (or define it: 'IR test = checking the insulation is good'). End with warranty info and contact for follow-up. Most firms have a customer summary template that auto-fills from the job sheet. The customer reads it once; understands what they paid for; references it if anything happens later.",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section5')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 2"
            title="Verification, functional testing and retesting"
            description="The post-rectification verification — BS 7671 643 retest cycle on the affected circuit, functional testing on safety systems (emergency lighting, fire alarm, RCD), the structured customer hand-back demonstration, and the certification trail."
            tone="emerald"
          />

          <TLDR
            points={[
              "Post-rectification retest is non-negotiable. Five tests on the affected circuit (continuity, ring, IR, polarity, EFLI + RCD trip-time if RCD-protected). Proves the fix worked.",
              "Functional testing complements BS 7671 643 — does the system actually do what it's supposed to do? EL discharge, fire alarm walk test, RCD trip-time.",
              "Customer hand-back is five steps: demonstrate, walk through, provide docs, educate, agree next steps. Skipping leaves customer uncertain and creates complaints.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Specify the BS 7671 643 retest cycle for a rectified fault on each circuit type — continuity, IR, polarity, EFLI, RCD trip-time.",
              "Distinguish electrical testing (BS 7671 643) from functional testing (does the system operate correctly?).",
              "Apply functional tests appropriate to safety systems — EL discharge, fire alarm walk test, RCD trip-time, smoke alarm activation.",
              "Conduct the five-step customer hand-back: demonstrate, walk through, provide documentation, educate, agree next steps.",
              "Produce the certification trail — updated EICR / supplementary, MEIWC for the rectification work, customer-friendly summary.",
              "Recognise and investigate new faults that appear at the post-rectification retest stage.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The post-rectification retest cycle</ContentEyebrow>

          <ConceptBlock
            title="Five tests on the affected circuit + RCD trip-time if RCD-protected"
            plainEnglish="The retest is the closing of the diagnostic loop. Without it, you have a fix without evidence it worked. The BS 7671 643 tests on the affected circuit are the proof."
            onSite="Standard L3 retest on a typical domestic ring final after rectification: continuity (R1+R2), ring continuity (three-step), IR, polarity, EFLI Zs, RCD trip-time. Six tests, 15–30 minutes, complete documented evidence of compliance."
          >
            <p>The retest by circuit type:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ring final</strong> — continuity R1+R2, ring continuity three-step, IR, polarity, EFLI, RCD trip-time.</li>
              <li><strong>Radial final</strong> — continuity R1+R2, IR, polarity, EFLI, RCD trip-time.</li>
              <li><strong>Lighting circuit</strong> — continuity R2, IR (250 V if electronic loads), polarity, EFLI, RCD trip-time.</li>
              <li><strong>Sub-main</strong> — continuity R1+R2, IR, polarity, EFLI Zs at sub-DB.</li>
              <li><strong>Supply origin</strong> — Ze, PSCC, polarity at cut-out.</li>
            </ul>
            <p>
              Document pre-rectification (failed) reading + post-rectification (corrected) reading with timestamps. The before/after pair is the proof.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 651.1 (Periodic inspection and testing)"
            clause={<>"On completion of any addition or alteration to an installation, the work shall be inspected and tested in accordance with the requirements of Chapter 64 to verify that the requirements of the Regulations have been complied with."</>}
            meaning={<>For fault rectification, the rectified work counts as 'alteration' under Reg 651.1; the post-work inspection and testing verify BS 7671 compliance. The minimum is the BS 7671 643 tests applied to the affected circuit. The certification (MEIWC for the alteration) records the verification result.</>}
            cite="Source: BS 7671:2018 incorporating Amendment 2:2022, Reg 651.1."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Functional testing — does it actually work?</ContentEyebrow>

          <ConceptBlock
            title="Electrical compliance is necessary but not sufficient"
            onSite="BS 7671 643 tests prove the installation is electrically safe. Functional tests prove it operates as intended. Both are needed for a defensible hand-back."
          >
            <p>Common functional tests for fault-rectification verification:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Light switch</strong> — operates the correct light(s); no other lights affected.</li>
              <li><strong>Dimmer</strong> — full range operation, no flicker, no overheat at full / minimum.</li>
              <li><strong>Smoke alarm</strong> — test button activates sounder; LED indicators correct.</li>
              <li><strong>Emergency lighting</strong> — partial discharge test (30–60 min); illumination throughout; switching at mains-fail simulation.</li>
              <li><strong>Fire alarm</strong> — walk test of affected zone (specialist work, but L3 supports).</li>
              <li><strong>RCD</strong> — trip-time test at I∆n and 1×IΔn.</li>
              <li><strong>Heating element / motor / pump</strong> — runs at expected current; no abnormal heating; correct rotation (3-phase).</li>
              <li><strong>EV charger</strong> — handshake completes; charge cycle starts; current ramps as expected.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>The customer hand-back</ContentEyebrow>

          <ConceptBlock
            title="Five steps that turn 'work done' into 'customer satisfied\'"
            plainEnglish="The hand-back is what the customer remembers. The technical work was the value; the hand-back is the evidence. Skipping it leaves customer uncertain and creates the post-job complaints."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. DEMONSTRATE</strong> — show the customer that the original symptom is no longer present. 'Try plugging in your kettle — see, no trip.' 30 seconds; converts uncertainty to certainty.</li>
              <li><strong>2. WALK THROUGH</strong> — what was found, what was fixed, what tests confirmed. Plain English, 2–3 minutes.</li>
              <li><strong>3. PROVIDE DOCUMENTATION</strong> — job sheet copy, certificates (MEIWC + updated EICR if relevant), customer-friendly summary.</li>
              <li><strong>4. EDUCATE ON PREVENTION</strong> — what behaviours / conditions might cause recurrence, what to watch for. The 60–80% of customer-behaviour faults this prevents.</li>
              <li><strong>5. AGREE NEXT STEPS</strong> — any further work recommended, follow-up visit if needed, payment terms, contact for issues.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>The post-repair certificate decision</ContentEyebrow>

          <ConceptBlock
            title="EIC, MEIWC or no certificate at all"
            plainEnglish="Different repairs trigger different paperwork. The L3 apprentice needs to recognise which document goes with which scope of work and who signs it."
            onSite="Domestic kitchen socket faceplate replaced &mdash; no certificate (no circuit altered). Single RCBO swapped on a CU &mdash; MEIWC with the customer&apos;s permission. Distribution board replaced or new circuit added &mdash; full EIC. Notifiable work under Building Regulations Part P (kitchens, bathrooms, garden circuits) goes through a competent-person scheme (NICEIC, NAPIT, ECA) regardless of certificate type."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>EIC</strong> &mdash; new circuit, replacement CU / DB, major alteration. Three signatures: design, construction, verification.</li>
              <li><strong>MEIWC</strong> &mdash; addition or alteration to a single circuit that doesn&apos;t involve a new circuit or DB. One signature.</li>
              <li><strong>EICR</strong> &mdash; if the visit was a periodic inspection rather than a fault job, the report is the EICR; the repair becomes a referenced supporting document.</li>
              <li><strong>No formal certificate</strong> &mdash; like-for-like accessory swap, lamp change, fault diagnosis without alteration. Job sheet entry is enough but keep the photographic record.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Retest scope &mdash; what to test, what to skip</ContentEyebrow>

          <ConceptBlock
            title="Targeted retest, not full commissioning"
            plainEnglish="A post-repair retest verifies the fix and the circuit&apos;s safety case. It doesn&apos;t need to repeat every initial verification test on every circuit; it needs to retest the ones the repair could have affected."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>The repaired circuit</strong> &mdash; full continuity, IR, polarity, Zs / EFLI, RCD operation. The whole point of the retest.</li>
              <li><strong>Adjacent circuits sharing the same DB / RCD group</strong> &mdash; functional check that nothing else has been disturbed during the repair.</li>
              <li><strong>The CU as a whole</strong> &mdash; visual check that all breakers reset, RCD test button operates, no warmth or smell post-load.</li>
              <li><strong>Skip</strong> &mdash; circuits genuinely unrelated to the repair scope (e.g. don&apos;t IR-test the upstairs lighting if the repair was a downstairs socket).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Functional testing of safety systems — emergency lighting and fire alarm"
            plainEnglish="When a rectification touches a safety system, functional testing extends beyond the BS 7671 electrical retest. Emergency lighting tests under BS 5266 verify the duration of run on battery (typically 3 hours for non-maintained luminaires); fire alarm work under BS 5839-1 verifies the affected detector and any zone wiring; these are separate certificates issued alongside the BS 7671 paperwork. Skipping the safety-system functional test leaves the customer with a maintenance gap that the next inspector will flag."
            onSite="On a property with emergency lighting that has been disturbed during the rectification, run the BS 5266 monthly function test (5 second flash test) and document the result. For a 6-month or 3-year duration test, schedule with the customer's facilities team. On a fire alarm system, the BS 5839 weekly function test exercises a different MCP each week; if your work touched a detector, test that detector in person. Issue the BS 5266 / BS 5839 certificate alongside the MWC."
          >
            <p>
              Safety-system retest items by system type:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Emergency lighting (BS 5266)</strong> — flash test
                (monthly), full duration test (six-monthly or annually depending
                on system class). Issue the EL completion certificate.
              </li>
              <li>
                <strong>Fire alarm (BS 5839-1)</strong> — silent and audible
                tests of the affected detector / zone, panel event log review,
                customer brief on disabling and re-enabling the system. Issue
                the FA completion certificate.
              </li>
              <li>
                <strong>Smoke and CO alarms (LD3 / BS 5839-6)</strong> — for
                domestic, test every alarm with the test button after work;
                cross-reference any dates printed on the alarm body.
              </li>
              <li>
                <strong>Bonding to extraneous-conductive parts</strong> — if
                gas, water or oil pipework was disturbed during the work, test
                continuity from the part to the MET and update the bonding
                record on the EIC.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Witness sign-off — when the customer or supervisor signs the test"
            plainEnglish="Safety-critical or commercially-sensitive rectifications often require a witness signature on the test result — a customer's facilities engineer, a building manager, the firm's supervisor, or in some cases the contracting principal. The witness signature is documentary evidence that the test was carried out, the result was correct, and the witness saw it. The witness column on the EIC schedule formalises this."
            onSite="On commercial work, schedule the witness in advance — facilities engineers do not appreciate ad-hoc same-day requests. Walk the witness through the test setup, the instrument used (calibration in date, sticker visible), the test result on the screen, and the recording on the schedule. The witness signs the relevant column. The L3 apprentice gains a useful exposure to test discipline; the customer gains a defensible record; the firm gains a faster sign-off than chasing a remote signature later."
          >
            <p>
              When a witness signature is appropriate or required:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>High-risk environment</strong> — hospitals, food
                production, hazardous-area locations under DSEAR, public-assembly
                premises.
              </li>
              <li>
                <strong>Commercial customer policy</strong> — large customers
                often require a witnessed test on every visit; the contract
                spec states it.
              </li>
              <li>
                <strong>Apprentice supervision sign-off</strong> — for
                apprentice-led tests where the supervising electrician signs the
                test and certifies the apprentice's work.
              </li>
              <li>
                <strong>Disputed prior work</strong> — where a previous
                contractor's work is in question; an independent witnessed test
                creates an unimpeachable record.
              </li>
              <li>
                <strong>Insurance-required testing</strong> — building insurer
                or product warranty conditions may require witnessed testing as
                evidence of the install standard.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Adjacent-circuit retest — proving Reg 641.5 second clause"
            plainEnglish="Reg 641.5 has two clauses — the new work complies, AND the existing installation is not impaired. The retest needs to evidence both. Adjacent-circuit functional tests (lights still work, sockets still energised, controls still respond) are the practical proof that the work has not damaged the rest of the installation. A quick walk through the adjacent rooms with the supply restored is the L3 apprentice's standard discipline before signing the certificate."
            onSite="After the targeted retest of the affected circuit, restore supply to all circuits and walk the property: lights on / off in every room sharing the affected DB, sockets energised (lamp test or trial-load), heating / hot water cycles started, smart controls still online. Each is a 30-second functional check. The adjacent-circuit walk is what catches accidental disturbance — a knocked terminal, a momentarily lifted neutral, a switch wired wrong on a multi-gang plate. Easier to find now than after the customer reports it."
          >
            <p>
              Adjacent-circuit functional check items:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lighting in every room sharing the affected DB</strong>
                — switch on / off, dimmers respond, two-way circuits operate.
              </li>
              <li>
                <strong>Socket outlets in adjacent rooms</strong> — lamp test
                or trial-load to verify polarity and supply.
              </li>
              <li>
                <strong>Fixed appliances</strong> — boiler / heat pump fires up,
                immersion heats, EV charger handshake (if relevant).
              </li>
              <li>
                <strong>Smart controls</strong> — thermostats responsive, hub
                online, app reporting.
              </li>
              <li>
                <strong>Customer-reported items</strong> — the customer often
                mentions a 'while you're here' issue at the door; address or
                quote it on the way out.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 643.3"
            clause={
              <>
                "Regardless of RCD Type, an alternating current test at rated residual operating current (IΔn) is used to verify the effectiveness of the RCD."
              </>
            }
            meaning={
              <>
                Post-repair RCD verification is a single AC test at rated I&Delta;n in A4:2026 &mdash; the 5&times;I&Delta;n test is gone and Table 3A is deleted. One button press on the MFT, captured against the device-standard limit, and you have your verification.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 643.3 (RCD testing redraft), verbatim from facet."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 641.5"
            clause={
              <>
                "For an addition or alteration to an existing installation, it shall be verified that the addition or alteration complies with BS 7671 and does not impair the safety of the existing installation."
              </>
            }
            meaning={
              <>
                The retest verifies both halves of Reg 641.5: the repaired bit complies with BS 7671 AND the rest of the installation hasn&apos;t been made worse by the work. That second half is what the &ldquo;adjacent-circuit functional check&rdquo; is for &mdash; you&apos;re evidencing that nothing else has been disturbed.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 641.5, verbatim."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Skipping the retest because 'the fix is obvious'"
            whatHappens={<>Apprentice rectifies an HRJ at a socket terminal — re-stripped, re-terminated, looks perfect. They don't retest because \'it\'s obvious\'. Customer plugs in the kettle five minutes after the apprentice leaves; the new termination wasn\'t quite tight enough; immediate trip. Customer calls back; apprentice returns; 30-minute drive each way; firm bears the cost. The retest would have caught the marginal termination in 30 seconds.</>}
            doInstead={<>Always retest after rectification. The retest is part of the job, not optional polish. EFLI Zs + continuity R1+R2 on the affected circuit is the minimum; full BS 7671 643 sequence for non-trivial fixes. The 15-minute retest investment saves the 90-minute return visit when retest would have caught the issue.</>}
          />

          <CommonMistake
            title="Walking out without the customer hand-back demonstration"
            whatHappens={<>Apprentice completes the rectification, retest passes, packs up and leaves. Customer is in another room and didn\'t see the work. They go back to the kitchen and see no obvious change; they\'re not sure if it\'s fixed. They call the office to query; office calls the apprentice; the apprentice has to explain over the phone. Customer satisfaction down; firm\'s call-handling time up; relationship at risk. The 30-second \'come and look' before leaving would have prevented all this.</>}
            doInstead={<>Five-step hand-back, every job. The 30 seconds of demonstration converts the customer from uncertain bystander to verified beneficiary. Customer\'s confidence is what generates repeat work and referrals.</>}
          />

          <Scenario
            title="Hand-back after kitchen circuit rectification"
            situation={<>You\'ve rectified a recurring kitchen RCBO trip by replacing a leaking dishwasher heater element. Retest passes. Customer is in the lounge.</>}
            whatToDo={<>Five-step hand-back. (1) Invite customer to the kitchen. \'Come and have a look — I\'d like to show you what I did and confirm it\'s working\'. (2) Demonstrate. \'Watch the breaker — I\'ll switch on the dishwasher\'. Switch on; breaker holds. \'And the kettle on top\'. Switch on; breaker holds. \'There you go — no trip even with both running\'. (3) Walk through. \'Your old dishwasher heater had developed a small earth leak — about 18 mA when it was on heat cycle. Combined with the everyday electronics in your kitchen, that pushed the total earth leakage past the breaker\'s 30 mA threshold and tripped it. I\'ve replaced the heater; the leak\'s gone; the breaker\'s no longer at risk of nuisance trips\'. (4) Provide docs. \'Here\'s your job sheet, the test results showing the breaker is now well within spec, and a one-page summary in plain English. The dishwasher heater is covered by a 12-month parts warranty; the workmanship is covered by my firm\'s standard 2-year warranty\'. (5) Next steps. \'No further work needed unless you notice trips returning. Any questions, call us anytime; the number\'s at the bottom of the summary\'. Job done.</>}
            whyItMatters={<>The hand-back closes the loop with the customer. They\'ve seen the fix, understood what was wrong, got the documentation, know the warranty, know how to contact you. The 5-minute hand-back generates 5-star reviews, repeat work, and referrals. Skipping it loses all that.</>}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Post-rectification retest is non-negotiable. BS 7671 643 tests on the affected circuit — continuity, IR, polarity, EFLI, RCD trip-time. Proves the fix worked.",
              "Document pre-rectification (failed) reading AND post-rectification (corrected) reading. The before/after pair is the proof.",
              "Functional testing complements electrical testing — does the system actually do what it\'s supposed to do? EL discharge, fire alarm walk test, RCD trip-time, smoke alarm activation.",
              "Customer hand-back is five steps: demonstrate, walk through, provide docs, educate, agree next steps. 5 minutes; converts work-done to customer-satisfied.",
              "Demonstration step (30 seconds): show the original symptom is gone. Customer goes from uncertain bystander to verified beneficiary.",
              "Customer-friendly summary in plain English (1 page) accompanies the technical job sheet. Customer reads once; references later.",
              "Certification trail: updated EICR / supplementary if pre-existing codes affected; MEIWC for the rectification work.",
              "New faults at retest are not unusual — investigate as new diagnostic problem; never dismiss as \'must have been there before\'.",
            ]}
          />

          <Quiz title="Verification + functional testing — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section5-1')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">5.1 Repair vs replace</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section5-3')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">5.3 Restoring building fabric</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
