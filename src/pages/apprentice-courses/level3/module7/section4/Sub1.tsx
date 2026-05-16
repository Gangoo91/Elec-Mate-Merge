/**
 * Module 7 · Section 4 · Subsection 1 — BS 7671 amendment cycle
 * Maps to C&G 2365-03 / Unit 308 / LO2 / AC 2.4
 *   AC 2.4 — "Identify the importance of continuing professional development (CPD)"
 *
 * The BS 7671 amendment cycle — A1, A2, A3, A4 — what each amendment
 * typically changes, why amendments happen, the CPD obligation that follows
 * from each amendment, the C&G 2382-26 (or current edition) qualification
 * cycle, and how to stay current with the regs over a 30-40 year career.
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

const TITLE = 'BS 7671 amendment cycle | Level 3 Module 7.4.1 | Elec-Mate';
const DESCRIPTION =
  'BS 7671 amendments — A1, A2, A3, A4 — what each typically changes, why they happen, the CPD obligation that follows, and how to stay current with the regs over a long career.';

const checks = [
  {
    id: 'mod7-s4-sub1-cycle',
    question:
      "How often does BS 7671 get a new edition or major amendment?",
    options: [
      "Every 100 years.",
      "New edition typically every 7-10 years (15th, 16th, 17th, 18th editions); amendments to the current edition every 3-4 years (A1, A2, A3, A4 etc.). The 18th Edition was published in 2018; A1 was 2020 (EV); A2 was 2022 (mainly editorial); A3 was 2024 (renewables-related); A4 lands in 2026 with significant changes including AFDD requirements, TN-C-S handling and revised schedule columns.",
      "Daily.",
      "Never.",
    ],
    correctIndex: 1,
    explanation:
      "BS 7671 evolves continuously. Major editions every 7-10 years; amendments every 2-4 years between editions. Amendments often address specific safety concerns or technology changes (PV, EV, AFDDs). Each amendment typically requires CPD — at minimum reading the amendment, often a 1-day refresher course and an updated 2382 qualification (currently 2382-22 for 18th Edition; will become 2382-26 for A4:2026).",
  },
  {
    id: 'mod7-s4-sub1-a4',
    question:
      "What's the headline change in BS 7671 A4:2026?",
    options: [
      "Nothing major.",
      "Several major changes: broader recommendation for Arc Fault Detection Devices (AFDDs) under Reg 421.1.7 (recommending wording, not mandating — HRRBs are made mandatory via the Building Safety Act 2022), updated TN-C-S (PNB) handling guidance, revised schedule columns on certificates (forms updated), updated requirements for renewables and energy storage, revised special-locations content. A4 represents the most significant single amendment to BS 7671 in recent memory.",
      "Just typo fixes.",
      "Only colour changes.",
    ],
    correctIndex: 1,
    explanation:
      "A4:2026 is a major update. AFDD recommendations broaden significantly under Reg 421.1.7 (the wording is 'recommending', not mandating — HRRBs come under mandatory scope via the Building Safety Act 2022 framework, not BS 7671 itself). TN-C-S handling addresses the long-running open-PEN concern with newer evidence-based guidance. Schedule column changes affect certificate forms — every CPS scheme and electrical software vendor has had to update accordingly. Plan A4 CPD: read the amendment, take a 1-day refresher course, sit the updated 2382-26 exam.",
  },
  {
    id: 'mod7-s4-sub1-cpd-link',
    question:
      "Why do CPS schemes (NICEIC, NAPIT) require CPD for QS-named individuals?",
    options: [
      "Just to make money.",
      "Because the QS is responsible for the firm's competence to self-certify Part P notifiable work. Out-of-date QS competence (not keeping up with BS 7671 amendments) means the firm is signing off work to outdated standards. Schemes require evidence of ongoing CPD specifically to keep the QS aligned with current BS 7671 and current best practice. Failure to evidence CPD can result in scheme registration suspension.",
      "Only optional.",
      "Just for marketing.",
    ],
    correctIndex: 1,
    explanation:
      "CPD requirement is the substance behind the QS role. CPS schemes audit CPD evidence at annual assessment — this is part of demonstrating ongoing competence to certify. The most important CPD is BS 7671 amendment training, alongside specialist updates (PV, EV, fire). Plan annual CPD events into your calendar; treat them as compliance obligations not nice-to-haves.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's the difference between a BS 7671 'edition' and an 'amendment'?",
    options: [
      "Same thing.",
      "Edition = major rewrite (e.g. 17th to 18th in 2018) covering all sections, often introducing new chapters and structural changes. Amendment = targeted update to the current edition (e.g. A1, A2, A3, A4 to the 18th Edition) covering specific topics. Editions are spaced 7-10 years apart; amendments 2-4 years apart. Both update the regulatory framework but at different scales.",
      "Editions are minor.",
      "Only Scotland uses amendments.",
    ],
    correctAnswer: 1,
    explanation:
      "Editions are full rewrites (substantial scope, new structure); amendments are targeted updates (specific topics, same overall structure). Both require CPD but editions typically require longer refresher (3-5 day course) plus new 2382 exam; amendments typically require 1-day refresher plus updated 2382 (e.g. 2382-22 for 18th Edition then 2382-26 for A4:2026).",
  },
  {
    id: 2,
    question: "Who actually writes BS 7671?",
    options: [
      "The Government.",
      "JPEL/64 — the Joint IET / BSI Technical Committee that drafts BS 7671. Members include the IET, BSI, ECA, NICEIC, BEAMA, JIB, manufacturers, government bodies and others. Drafts go through public consultation before publication. The IET publishes BS 7671 jointly with BSI.",
      "Only NICEIC.",
      "Only manufacturers.",
    ],
    correctAnswer: 1,
    explanation:
      "JPEL/64 is the technical authority behind BS 7671. The committee structure ensures input from across the industry — installers, designers, manufacturers, regulators, schemes. Drafts go through public consultation (you can submit comments) before final publication. Knowing this helps demystify the regs: they're consensus-built by industry experts, not handed down from above.",
  },
  {
    id: 3,
    question: "What's the C&G 2382 and how does it track BS 7671 amendments?",
    options: [
      "Doesn't track.",
      "C&G 2382 is the BS 7671 Wiring Regulations qualification — open-book exam testing knowledge of the current edition. Each major edition triggers a new 2382 variant: 2382-15 was 17th Edition; 2382-18 was 17th Edition + A3; 2382-22 is 18th Edition; 2382-26 will cover A4:2026. Holding the latest 2382 is the standard CPD evidence for keeping current with BS 7671.",
      "Only academic.",
      "Just a textbook.",
    ],
    correctAnswer: 1,
    explanation:
      "2382 is the regs knowledge qualification that tracks BS 7671 versions. Holding the latest 2382 evidences current BS 7671 competence. CPS schemes typically expect QS-named individuals to hold the current 2382 within a reasonable period of each amendment. Plan to take the new 2382 within 6-12 months of each major BS 7671 amendment.",
  },
  {
    id: 4,
    question: "What's an AFDD and why does A4:2026 require them more widely?",
    options: [
      "A type of cable.",
      "Arc Fault Detection Device — protective device that detects arc faults (intermittent low-energy faults that don't always trigger overcurrent or RCD protection but can cause fires). Combine MCB and RCD functions with arc-detection electronics. Previously recommended for specific circuits; A4:2026 expands the recommendation under Reg 421.1.7 to AC final circuits generally (note: 'recommending' wording — not a BS 7671 mandate; HRRBs are made mandatory via the Building Safety Act 2022 framework). Cost typically £30-60 per AFDD.",
      "Just a marketing label.",
      "Only for solar.",
    ],
    correctAnswer: 1,
    explanation:
      "AFDDs address the gap in protection that overcurrent devices and RCDs can miss — arc faults often involve intermittent low-energy current that doesn't trip MCBs or RCDs but generates enough heat to cause fires. Wider AFDD requirement in A4:2026 reflects evidence that arc faults are a meaningful cause of UK electrical fires. Materials cost increase per circuit is modest; design and install changes are more substantive.",
  },
  {
    id: 5,
    question: "What's TN-C-S (PNB) and why does A4:2026 update its handling?",
    options: [
      "Same as TN-S.",
      "TN-C-S (Terra-Neutral combined-separate) with PNB (Protective Neutral Bonding) is the most common UK earthing system — DNO supplies a combined neutral-and-earth (PEN) conductor that's split at the property into separate N and PE. The risk addressed in A4 is the open-PEN scenario — if the supply-side PEN fails, the property's exposed-conductive-parts can rise to dangerous voltage. A4 updates guidance on EV charging and risk assessment for TN-C-S systems.",
      "Only for Scotland.",
      "Just a label.",
    ],
    correctAnswer: 1,
    explanation:
      "TN-C-S open-PEN risk has been a significant industry concern especially for EV charging where the chassis of a charged vehicle can become a touchable extension of the property's earthing system. A4:2026 provides updated risk assessment guidance for TN-C-S installations particularly with EV charging. Affects EV charger design and installation; affects property risk assessment for any new EV install.",
  },
  {
    id: 6,
    question: "How quickly should an electrician update CPD after a BS 7671 amendment?",
    options: [
      "10 years.",
      "Most electricians take a 1-day refresher course within 3-6 months of an amendment, then sit the updated 2382 within 12 months. CPS schemes typically expect QS-named individuals to be current within 12 months. Working without updated knowledge means signing certificates against outdated standards — both a competence concern and a scheme compliance risk.",
      "Never.",
      "1 day.",
    ],
    correctAnswer: 1,
    explanation:
      "12-month window for major amendments is the practical standard. CPS schemes explicitly track this at annual assessment. The 1-day refresher course is widely available (NICEIC training, NAPIT, JTL, NET, IET Academy, Elec-Mate); cost typically £150-300. The updated 2382 cost typically £150-250. Total CPD cost for a major amendment: £300-550. Worth budgeting for proactively.",
  },
  {
    id: 7,
    question: "Are BS 7671 changes retrospective?",
    options: [
      "Yes always.",
      "No — generally not retrospective. Existing installations don't have to be brought up to the current edition. New installations and additions/alterations must comply with the current edition (the version in force when the work is done). Existing installations are assessed against the standard they were installed to (with safety-critical exceptions). EICR coding takes the current standard into account but with calibration for what was acceptable when installed.",
      "Only Scottish.",
      "Only commercial.",
    ],
    correctAnswer: 1,
    explanation:
      "Non-retrospective is a fundamental principle — otherwise every installation would need rebuilding every few years. The practical effect: new work to current standard; existing installations assessed against standards-of-the-time with safety-critical exceptions. EICR coding applies C1/C2/C3/FI judgements that account for both current and historic standards. Knowing this matters for periodic inspection work.",
  },
  {
    id: 8,
    question: "Where do you get CPD that counts for CPS scheme requirements?",
    options: [
      "Anywhere.",
      "Multiple sources accepted by CPS schemes: scheme-organised events (NICEIC Connect, NAPIT events, ELECSA training), accredited training providers (JTL, NET, IET Academy, Elec-Mate), trade events (ECA Live, Electric Vehicles Show), online platforms (IET Academy, scheme portals), manufacturer training (sometimes counts), reading and self-study (some schemes accept evidence). Keep a CPD log with date, topic, time, source.",
      "Just YouTube.",
      "Only college.",
    ],
    correctAnswer: 1,
    explanation:
      "CPD evidence comes from many sources. Most CPS schemes ask for typically 30+ hours of CPD per year for QS-named individuals, with mix of formal (courses, conferences) and informal (reading, online learning, manufacturer training). Keep a CPD log — schemes audit at annual assessment. Plan a structured CPD calendar at year-start; don't scramble at audit time.",
  },
];

const faqs = [
  {
    question: "Will the 18th Edition be replaced by a 19th Edition?",
    answer:
      "Eventually yes — historic pattern is 7-10 years between editions. 18th Edition was 2018; A4:2026 is the latest amendment. A 19th Edition is plausibly 2028-2032 if the pattern continues. JPEL/64 publishes updates on planning. Don't worry about timing speculation; focus on staying current with each amendment as it lands.",
  },
  {
    question: "Do I need to buy a new BS 7671 every time it amends?",
    answer:
      "Strictly yes — the regs are paywalled and each amendment supersedes the previous. The Brown Book retails around £100-130 per edition; some bundle online access. Most working electricians replace their copy at each major amendment. For frequent users the IET online subscription (about £200/year) gives always-current access plus search functionality.",
  },
  {
    question: "What's the IET On-Site Guide and is it different from BS 7671?",
    answer:
      "The IET On-Site Guide is a companion publication (separate from BS 7671 itself) summarising the regs in a more practical site-friendly format with worked examples and tables. Updated to track each BS 7671 amendment. Many electricians find the OSG more useful day-to-day than reading BS 7671 cover-to-cover. Around £35-45 per edition.",
  },
  {
    question: "What's CPD evidence in practice?",
    answer:
      "A simple log with: date, topic, source (course/event/reading), time spent, key learning. Most CPS schemes accept Excel or paper logs. Some platforms (Elec-Mate's CPD tracker, NICEIC Connect, IET Academy) provide automated tracking. The point isn't the format — it's having evidence at annual assessment that you've done meaningful CPD across the year.",
  },
  {
    question: "How do I know what's actually changed in a new amendment?",
    answer:
      "JPEL/64 publishes a 'list of significant changes' alongside each amendment. The IET publishes update articles in Wiring Matters magazine. Training providers (NICEIC, NAPIT, NET, Elec-Mate) publish summary content. Plan: read the JPEL/64 list, attend a 1-day refresher, sit the updated 2382. Together that gives you working knowledge of the changes within a few months.",
  },
  {
    question: "Are amendments international or just UK?",
    answer:
      "BS 7671 is the UK standard (England, Wales, Scotland, Northern Ireland), based on the international IEC 60364 series. UK has additional national variants and our own amendments. Other countries (Republic of Ireland uses ET 101; many countries use IEC 60364 variants) have parallel but different standards. BS 7671 amendments don't affect installations in other jurisdictions.",
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 7 · Section 4 · Subsection 1"
            title="BS 7671 amendment cycle"
            description="A1, A2, A3, A4 — what each amendment typically changes, why they happen, the CPD obligation that follows, and how to stay current with the regs over a long career."
            tone="emerald"
          />

          <TLDR
            points={[
              "BS 7671 evolves continuously: new editions every 7-10 years (18th Edition 2018), amendments every 2-4 years (A1 2020, A2 2022, A3 2024, A4 2026).",
              "A4:2026 is a major amendment — recommended AFDDs (Reg 421.1.7) in many circuits, updated TN-C-S (PNB) handling, revised schedule columns, updated renewables and storage requirements.",
              "Each amendment requires CPD — typically 1-day refresher course + updated C&G 2382 (currently 2382-22, becoming 2382-26 for A4).",
              "CPS schemes (NICEIC, NAPIT) require QS-named individuals to evidence CPD typically within 12 months of each amendment.",
              "BS 7671 changes are NOT retrospective — existing installations assessed against standards-of-the-time; new work to current edition.",
              "JPEL/64 (joint IET/BSI committee) drafts BS 7671; public consultation precedes publication.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO2 / AC 2.4 — identify the importance of continuing professional development (CPD).",
              "State the BS 7671 amendment cycle and how editions and amendments differ.",
              "Identify the headline changes in A4:2026 (AFDDs, TN-C-S handling, schedule columns, renewables, energy storage).",
              "Identify the CPD obligations that follow each amendment for CPS-registered firms.",
              "State the role of JPEL/64 in drafting BS 7671 and the public consultation process.",
              "Explain the non-retrospective principle and how it affects existing installations vs new work.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The amendment cycle</ContentEyebrow>

          <ConceptBlock
            title="Editions and amendments — the BS 7671 evolution rhythm"
            plainEnglish="BS 7671 evolves continuously through two mechanisms: editions (major rewrites typically every 7-10 years, e.g. 17th Edition 2008, 18th Edition 2018) and amendments (targeted updates every 2-4 years between editions, named A1, A2, A3, A4). Editions involve restructuring and new chapters; amendments target specific topics. Both require CPD; editions typically require longer refresher and a new 2382."
            onSite="Knowing the amendment rhythm helps plan CPD. Each amendment is roughly 2-4 years away from the next; each edition roughly 7-10 years. Budget time and money for refresher courses and new 2382 exams in your career CPD plan. Don't assume the regs you learnt during the apprenticeship will still be current 5 or 10 years later."
          >
            <p>
              Recent BS 7671 timeline:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>17th Edition</strong> &mdash; 2008.</li>
              <li><strong>17th Edition + A1 / A2 / A3</strong> &mdash; updates to 17th Edition through 2010s.</li>
              <li><strong>18th Edition</strong> &mdash; 2018, major rewrite.</li>
              <li><strong>18th + A1</strong> &mdash; 2020 (mainly EV charging).</li>
              <li><strong>18th + A2</strong> &mdash; 2022 (mainly editorial / corrections).</li>
              <li><strong>18th + A3</strong> &mdash; 2024 (renewables-related).</li>
              <li><strong>18th + A4</strong> &mdash; 2026 (AFDDs, TN-C-S handling, schedule columns, others).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="A4:2026 — the major changes"
            plainEnglish="A4:2026 is the most significant single amendment to BS 7671 in recent memory. Major changes include: mandatory Arc Fault Detection Devices (AFDDs) in many circuits (previously only recommended); updated TN-C-S (PNB) handling with new risk assessment guidance especially for EV charging; revised schedule columns on certificates affecting all CPS scheme and software vendor forms; updated requirements for renewables and energy storage; revised special-locations content."
            onSite="A4 affects design, installation, certification and inspection. Plan A4 CPD as a priority CPD event for 2026: read the JPEL/64 list of significant changes, take a 1-day refresher course, sit the updated 2382-26 exam. Budget around £400-600 for the combined refresher + exam. CPS schemes will expect evidence of A4 currency at annual assessment from late 2026 onwards."
          >
            <p>
              A4:2026 headline change topics:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>AFDDs</strong> &mdash; mandatory in many circuits (socket outlets in
                higher-fire-risk locations; specific dwelling circuit categories). Cost
                impact per circuit modest (&pound;30-60 per AFDD).
              </li>
              <li>
                <strong>TN-C-S (PNB) handling</strong> &mdash; updated guidance for open-PEN
                risk assessment, particularly for EV charging.
              </li>
              <li>
                <strong>Schedule columns</strong> &mdash; revised columns on EIC and
                related certificates; CPS scheme and software vendor form updates required.
              </li>
              <li>
                <strong>Renewables and storage</strong> &mdash; updated requirements for PV,
                battery storage and wider energy systems.
              </li>
              <li>
                <strong>Special locations</strong> &mdash; revised content for bathrooms,
                swimming pools, agricultural, EV charging stations.
              </li>
            </ul>
          </ConceptBlock>

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

          <ContentEyebrow>The CPD obligation</ContentEyebrow>

          <ConceptBlock
            title="Why CPS schemes require CPD — competence over time"
            plainEnglish="CPS schemes (NICEIC, NAPIT, ELECSA) require QS-named individuals and registered firms to evidence ongoing CPD. The reason: BS 7671 evolves; technology evolves; best practice evolves. The competence that earned the scheme registration five years ago isn't enough on its own — schemes verify ongoing competence through CPD evidence at annual assessment."
            onSite="Most CPS schemes look for 30+ hours of CPD per year for QS-named individuals, with mix of formal (courses, conferences) and informal (reading, online learning, manufacturer training). Keep a CPD log with date, topic, time, source. Plan a structured CPD calendar at year-start; don't scramble at audit time. Budget around £500-1,500/year for QS CPD spend."
          >
            <p>
              Typical CPD calendar for an Approved Electrician QS:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BS 7671 amendment refresher when each amendment lands.</li>
              <li>Annual scheme update event (NICEIC Connect, NAPIT events, etc.).</li>
              <li>Specialist training in any active specialism (PV, EV, BAFE, etc.).</li>
              <li>Manufacturer training on new equipment (PV inverters, EV chargers).</li>
              <li>IET Academy / Elec-Mate / online platform learning.</li>
              <li>Trade exhibitions (ECA Live, etc.) for technical sessions.</li>
              <li>Professional engagement (IET MIET events, regional meetings).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="BS 7671 — overall framework (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  BS 7671 (the IET Wiring Regulations) is the UK national standard for
                  electrical installation. Headline structure:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>Part 1 &mdash; Scope, object and fundamental principles.</li>
                  <li>Part 2 &mdash; Definitions.</li>
                  <li>Part 3 &mdash; Assessment of general characteristics.</li>
                  <li>Part 4 &mdash; Protection for safety.</li>
                  <li>Part 5 &mdash; Selection and erection of equipment.</li>
                  <li>Part 6 &mdash; Inspection and testing.</li>
                  <li>Part 7 &mdash; Special installations or locations.</li>
                  <li>Appendices &mdash; cable tables, calculation methods, supplementary information.</li>
                </ul>
                <p className="mt-2">
                  Updated through edition cycles (typically 7-10 years between editions) and
                  amendment cycles (typically 2-4 years between amendments).
                </p>
              </>
            }
            meaning={
              <>
                BS 7671 is the design, install and test standard for UK electrical work. Its
                evolution is built into the framework &mdash; expect amendments every few
                years and editions every decade or so. The CPD obligation that follows is a
                permanent feature of working as a competent electrician in the UK.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 (or current edition) — paraphrased from publicly-available IET descriptions; refer to current BS 7671 for detail."
          />

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 16 (competence)"
            clause={
              <>
                &quot;No person shall be engaged in any work activity where technical
                knowledge or experience is necessary to prevent danger or, where
                appropriate, injury, unless he possesses such knowledge or experience, or is
                under such degree of supervision as may be appropriate having regard to the
                nature of the work.&quot;
              </>
            }
            meaning={
              <>
                EAWR Regulation 16 is the statutory underpin of the CPD requirement.
                &quot;Technical knowledge&quot; isn&apos;t a one-time achievement &mdash; it
                must be current. Working to outdated BS 7671 standards risks breach of
                Regulation 16. CPD is what keeps you on the right side of EAWR over a long
                career.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), reg. 16."
          />

          <RegsCallout
            source="JPEL/64 (JPEL/64 Joint IET/BSI Technical Committee) terms of reference (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  JPEL/64 is the joint IET / BSI Technical Committee responsible for drafting
                  BS 7671. Membership includes:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>IET (technical authority).</li>
                  <li>BSI (standards publisher).</li>
                  <li>ECA, NICEIC, NAPIT (industry associations and CPS).</li>
                  <li>BEAMA (manufacturers).</li>
                  <li>JIB (workforce body).</li>
                  <li>HSE and other government bodies.</li>
                  <li>Specialist sub-committees for special locations and emerging tech.</li>
                </ul>
                <p className="mt-2">
                  Drafts go through public consultation (open to all stakeholders) before
                  final publication.
                </p>
              </>
            }
            meaning={
              <>
                JPEL/64 makes BS 7671 a consensus standard built by industry experts, not a
                top-down regulation. The public consultation process means anyone can submit
                comments on draft amendments. Knowing the structure helps demystify the
                regs &mdash; they&apos;re evidence-based and industry-led, not arbitrary.
              </>
            }
            cite="Source: JPEL/64 terms of reference — paraphrased from publicly-available IET and BSI guidance."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Assuming the BS 7671 you learnt in college is still current 5 years later"
            whatHappens={
              <>
                Electrician completes apprenticeship under 18th Edition + A1. Five years
                later A2, A3 and A4 have all landed. Electrician hasn&apos;t taken any
                refresher courses, hasn&apos;t bought updated BS 7671, hasn&apos;t sat new
                2382. Designs an EV charger install using outdated TN-C-S guidance; misses
                AFDD requirements added in A4. Customer complaint emerges; investigation
                reveals work doesn&apos;t meet current standards. CPS scheme registration
                at risk; insurance claim brought.
              </>
            }
            doInstead={
              <>
                Calendar BS 7671 amendments as fixed CPD events. When an amendment lands,
                book a 1-day refresher course in the next 3-6 months and sit the updated
                2382 within 12 months. Update your BS 7671 copy at each amendment. Most
                CPS schemes expect QS-named individuals to be current within 12 months;
                schemes audit at annual assessment. Don&apos;t treat regs CPD as optional.
              </>
            }
          />

          <Scenario
            title="A4:2026 has just landed — your CPD planning checklist"
            situation={
              <>
                It&apos;s March 2026. BS 7671 A4 has just been published. You&apos;re a JIB
                Approved Electrician and the QS-named individual on your firm&apos;s NICEIC
                Domestic Installer registration. Your firm&apos;s annual NICEIC assessment is
                due in October. What&apos;s your CPD plan for the next 7 months?
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; buy the updated BS 7671</strong>. The Brown Book in
                A4:2026 form. About &pound;100-130. Or upgrade your IET online subscription
                if you have one (always-current access).
                <br /><br />
                <strong>Step 2 &mdash; read the JPEL/64 list of significant changes</strong>.
                Free download from the IET. Spend 2-3 hours reading; flag anything that
                directly affects your firm&apos;s typical work (AFDDs, TN-C-S handling,
                schedule columns).
                <br /><br />
                <strong>Step 3 &mdash; book a 1-day A4 refresher course</strong>. NICEIC
                Training, NAPIT, JTL, NET, IET Academy, Elec-Mate all run them. Cost
                &pound;150-300. Aim to attend before the end of June 2026.
                <br /><br />
                <strong>Step 4 &mdash; sit the updated C&amp;G 2382-26</strong>. Open-book
                exam, 60 multiple-choice. Cost &pound;150-250. Aim to pass before the end of
                September 2026, in good time for the October NICEIC assessment.
                <br /><br />
                <strong>Step 5 &mdash; update firm processes and templates</strong>. EIC and
                schedule template updates to reflect new column structure. Quote and
                contract templates to reflect AFDD requirements where applicable. Risk
                assessment templates to reflect updated TN-C-S guidance for EV. Brief
                any other electricians in the firm.
                <br /><br />
                <strong>Step 6 &mdash; log all CPD evidence</strong>. CPD log with dates,
                topics, time spent, sources. Bring to the NICEIC assessment in October.
                Assessor wants to see structured A4 currency.
              </>
            }
            whyItMatters={
              <>
                BS 7671 amendments are the most predictable CPD event in your career. They
                land on a known schedule, the CPS schemes expect currency within 12 months,
                and the cost is modest (&pound;400-600 in total). Failing to plan A4 CPD as
                a fixed compliance event puts the firm&apos;s scheme registration at risk
                and exposes the QS personally. Treat amendment CPD as the priority CPD spend
                of the year it lands.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Amendment cycle anatomy and what A4:2026 actually changes</ContentEyebrow>

          <ConceptBlock
            title="The BS 7671 amendment process — who writes it and how it lands"
            plainEnglish="BS 7671 (the IET Wiring Regulations) is published by the IET on behalf of the BSI Standards Committee JPEL/64. Amendments are drafted by JPEL/64 working groups (made up of industry, manufacturer and academic representatives), put out for public consultation typically 6-12 months before publication, then formally published by IET as a Draft for Public Comment (DPC) ahead of the final version. Major amendments (Amendment 1, 2, 3 etc) introduce substantive new requirements; minor corrections come as Corrigenda. Each amendment supersedes the previous one — the current edition is always the in-force regulation."
            onSite="Track amendments through the IET (theiet.org), Voltimum, Professional Electrician magazine, and the major scheme bodies (NICEIC Connect, NAPIT One-Day Updates). The DPC stage is your chance to comment if you're a JPEL/64 member or via your trade body. Once published, there's typically a 6-12 month transition period where both versions are accepted, then the new amendment becomes mandatory for new installations. Existing installations don't need retrofitting to new amendments unless safety-critical (the new amendment introduces a new safety requirement that the existing install fails)."
          >
            <p>
              Amendment timeline (typical):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>JPEL/64 working group</strong> &mdash; drafts proposed changes (12&ndash;24 months before publication).
              </li>
              <li>
                <strong>DPC (Draft for Public Comment)</strong> &mdash; published 6&ndash;12 months before final.
              </li>
              <li>
                <strong>Public consultation</strong> &mdash; ~3 months for industry comment.
              </li>
              <li>
                <strong>Final publication</strong> &mdash; IET formal release.
              </li>
              <li>
                <strong>Transition period</strong> &mdash; typically 6&ndash;12 months both versions accepted.
              </li>
              <li>
                <strong>Mandatory date</strong> &mdash; new installations must comply.
              </li>
              <li>
                <strong>Existing installations</strong> &mdash; not retrofit-mandated unless safety-critical.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="A4:2026 — the headline changes apprentices should know about"
            plainEnglish="BS 7671 Amendment 4:2026 is the next major amendment. Headline changes confirmed via DPC consultation include: AFDD (Arc Fault Detection Devices) requirements expanded across more circuit categories, particularly in higher-risk premises (HMOs, care homes, certain mixed-use buildings); TN-C-S (Protective Multiple Earthing) clarifications around Open-PEN protection, particularly relevant to EV charger installations on TN-C-S supplies; new schedule columns for inspection certificates capturing additional verification data; updates to model forms (EIC, Minor Works, EICR) with new field requirements; clarifications around energy storage system installations and inverter-based DC supplies."
            onSite="A4:2026 CPD requirement is significant — most CPS schemes will require evidence of A4 currency within 12 months of mandatory date. Plan to attend a 1-day update course (~£200-350) within 6 months of publication. Early-bird courses fill up; book ahead. The key skill changes: AFDD specification and installation, Open-PEN protection design for EV/HP installs on TN-C-S, model form updates that affect every certificate you issue. Apprentices in 2026-27 will be tested against A4 in their AM2 — expect updated training materials from JTL, NET and your college through 2026."
          >
            <p>
              A4:2026 expected change areas:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>AFDD requirements</strong> &mdash; expanded across more circuit categories in higher-risk premises.
              </li>
              <li>
                <strong>TN-C-S / Open-PEN protection</strong> &mdash; clarifications particularly for EV installations.
              </li>
              <li>
                <strong>New schedule columns</strong> &mdash; expanded inspection certificate fields.
              </li>
              <li>
                <strong>Model form updates</strong> &mdash; EIC, Minor Works, EICR template changes.
              </li>
              <li>
                <strong>Energy storage systems</strong> &mdash; updated guidance on battery installations.
              </li>
              <li>
                <strong>DC supplies / inverter-based systems</strong> &mdash; further clarifications.
              </li>
              <li>
                <strong>CPD requirement</strong> &mdash; ~&pound;200&ndash;350 update course typically required.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Building a personal regs library — paper, digital, and the IET 18th Edition app"
            plainEnglish="Every working electrician needs at-hand access to BS 7671. Three formats: physical book (Big Yellow Book — current edition is 18th Edition + Amendment 2:2022, with A4:2026 imminent — ~£90 list, often discounted to £65-75 through wholesalers); digital PDF subscription via IET (~£80/yr, includes amendments); IET 18th Edition app (iOS/Android, ~£40-60 one-off). Most working electricians carry digital-on-phone for site reference and physical-in-van/office for sustained reading and certification work."
            onSite="The IET app is genuinely useful on site — searchable, hyperlinked tables, offline access. Physical book is essential for sustained study and for the closed-book sections of the C&G 2391-52 / 2382 exams. Build the habit of looking things up rather than guessing — the regs are a reference document not a memory test. When A4 lands, budget ~£90 for the new physical book (replaces your current copy), ~£40-60 to update the app, and ~£200-350 for the update course. Total annual regs-currency spend ~£350-500 in amendment year, ~£100 in non-amendment years."
          >
            <p>
              BS 7671 access formats:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Physical book (Big Yellow Book)</strong> &mdash; ~&pound;65&ndash;90, essential for study + certification.
              </li>
              <li>
                <strong>IET digital PDF</strong> &mdash; ~&pound;80/yr subscription, includes amendments.
              </li>
              <li>
                <strong>IET 18th Edition app</strong> &mdash; iOS/Android, ~&pound;40&ndash;60 one-off, offline access.
              </li>
              <li>
                <strong>On Site Guide (OSG)</strong> &mdash; ~&pound;30, simplified domestic-focused reference.
              </li>
              <li>
                <strong>Guidance Notes</strong> &mdash; GN1-GN8 series, ~&pound;30&ndash;60 each, deeper topic coverage.
              </li>
              <li>
                <strong>Code of Practice for Electrical Vehicle Charging Equipment Installation</strong> &mdash; ~&pound;65, specialist reference.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="A career of amendments — the long-game CPD calendar"
            plainEnglish="An apprentice starting in 2025 will likely see 8-12 substantive BS 7671 amendments over a 30-year working career. Each amendment requires CPD investment (1-day course ~£200-350), a new book (~£70-90), and integration into your daily working practice. Across a career that's roughly £4-6k of amendment-related CPD spend (offset by employer contribution for many electricians on salary). The cost of not staying current: scheme registration risk, certificate liability, growing competence gap with newer entrants. Planning amendment CPD as a fixed annual budget item is part of professional practice."
            onSite="Build amendment CPD into your annual financial plan. Year 1 of any new amendment: factor £400-500 into your CPD spend (course + book + reading time). Years 2-5 in steady-state with that amendment: ~£100/year for refresher reading and clarification courses. Many CPS schemes allocate amendment CPD as a specific category in their annual scheme assessment — failing to evidence currency can be a non-conformity. Treat amendments as the most important CPD priority of the year they land — other CPD (manufacturer training, vendor certs) can wait; amendment currency cannot."
          >
            <p>
              Amendment CPD planning checklist (per amendment cycle):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DPC stage</strong> &mdash; read the draft, identify changes affecting your work.
              </li>
              <li>
                <strong>Pre-publication</strong> &mdash; book a place on a 1-day update course early (avoid post-publication rush).
              </li>
              <li>
                <strong>Publication month</strong> &mdash; buy the new book, update digital subscriptions/apps.
              </li>
              <li>
                <strong>Course attendance</strong> &mdash; complete within 6 months of publication.
              </li>
              <li>
                <strong>Working practice integration</strong> &mdash; update your certificate templates, design defaults, install checklists.
              </li>
              <li>
                <strong>CPD record</strong> &mdash; log course attendance and study hours for scheme audit.
              </li>
              <li>
                <strong>Team brief</strong> &mdash; if you employ others, brief them on key changes.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="A4:2026 transitional certificate handling — what to file when"
            plainEnglish="When a major amendment publishes there's typically a transitional period where both the old and new editions are accepted on certificates — the certificate states which edition was used as the reference. Once the mandatory date passes, only the new edition is valid for new work. Existing certificates issued under the previous amendment remain valid for their lifetime — an EICR issued in 2025 under A2:2022 is valid until its 5-year expiry, regardless of A4:2026 publication. Re-certification at expiry is to the then-current amendment. Plan template updates around the mandatory date, not publication date."
            onSite="Practical template management around an amendment: stockpile blank certificates under the old amendment for jobs already in progress at publication date; update digital templates (Elec-Mate, paper or other certificate software) to reflect new schedule columns within 30 days of publication; brief your QS on new field requirements before issuing the first post-amendment certificate. The most common error in transitional periods is mixing old and new schedule formats on the same certificate. Have a clear cut-off date in your firm and stick to it."
          >
            <p>
              Transitional certificate practices:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pre-publication</strong> &mdash; clear in-progress jobs onto current-amendment certificates.
              </li>
              <li>
                <strong>Publication date</strong> &mdash; both editions valid; declare which used.
              </li>
              <li>
                <strong>Mandatory date</strong> &mdash; only new edition valid for new work.
              </li>
              <li>
                <strong>Existing certificates</strong> &mdash; remain valid for their lifetime (5yr typical).
              </li>
              <li>
                <strong>Re-certification</strong> &mdash; to current amendment at expiry.
              </li>
              <li>
                <strong>Template update</strong> &mdash; within 30 days of publication; brief team.
              </li>
              <li>
                <strong>Hard cut-off</strong> &mdash; pick a date and don't mix.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BS 7671 evolves through editions (every 7-10 years) and amendments (every 2-4 years). Both require CPD.",
              "A4:2026 is the most significant single amendment in recent memory — AFDDs mandatory in many circuits, updated TN-C-S (PNB) handling, revised schedule columns.",
              "Each amendment typically requires: read JPEL/64 significant-changes list + 1-day refresher course + updated C&G 2382. Total cost £400-600.",
              "CPS schemes (NICEIC, NAPIT) require QS-named individuals to evidence CPD typically within 12 months of each amendment.",
              "BS 7671 changes are NOT retrospective — existing installations assessed against standards-of-the-time (with safety-critical exceptions); new work to current edition.",
              "JPEL/64 (joint IET/BSI committee) drafts BS 7671; public consultation precedes publication; consensus standard built by industry experts.",
              "C&G 2382 tracks BS 7671 versions — 2382-22 covers 18th Edition; 2382-26 will cover A4:2026.",
              "CPD evidence: log with date, topic, source, time spent. CPS schemes audit at annual assessment.",
              "EAWR Regulation 16 is the statutory underpin of the CPD requirement — 'technical knowledge' must be current, not one-time.",
            ]}
          />

          <Quiz title="BS 7671 amendment cycle — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 3 — Setting up a business
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section4-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.2 IET membership routes
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
