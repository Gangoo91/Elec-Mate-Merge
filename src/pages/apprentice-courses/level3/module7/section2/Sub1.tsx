/**
 * Module 7 · Section 2 · Subsection 1 — Post-AM2 progression: Inspection & Testing
 * Maps to C&G 2365-03 / Unit 308 / LO2 / AC 2.5
 *   AC 2.5 — "Identify sources of information about career opportunities and progression
 *             routes in building services engineering"
 *
 * The post-AM2 inspection and testing qualification ladder — 2391-52 (Initial
 * Verification and Periodic Inspection), 2394 (Initial), 2395 (Periodic),
 * 2396 (Design and Verification), how the C&G qualification numbers fit
 * together, what each unlocks, what they cost, what they take to study, and
 * why I&T qualifications are the highest-leverage CPD spend most newly-
 * qualified electricians can make.
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

const TITLE = 'Post-AM2 progression: Inspection & Testing | Level 3 Module 7.2.1 | Elec-Mate';
const DESCRIPTION =
  'The post-AM2 inspection and testing qualification ladder — 2391-52, 2394, 2395, 2396 — what each unlocks, costs, study time, and why I&T qualifications are the highest-leverage CPD spend after AM2.';

const checks = [
  {
    id: 'mod7-s2-sub1-2391',
    question:
      "What does the 2391-52 cover and why is it important for career progression?",
    options: [
      "Yes — JIB Approved (Electrician with 2391-52 + experience) typically meets the academic anchor for EngTech. The application requires academic evidence (qualifications), experience evidence (portfolio of projects), and the professional review. Most Approved Electricians could qualify with the right portfolio organisation. The IET specifically promotes EngTech as accessible to vocational-route practitioners.",
      "The element has gone to earth — most likely a pinhole through the metal sheath into the water, OR moisture has tracked along the brass terminal head from a leaking cylinder. 0.12 MΩ at 500 V is well below the BS 7671 Table 64 minimum of 1 MΩ for a 230 V circuit, and the leakage current calculates to ≈ 1.9 mA — enough to trip a 30 mA RCD on switch-on transient. Replace the element (a brass-flanged Backer / Heatrae Sadia element on most UK cylinders), check the cylinder for leaks, re-test IR after replacement (should read &gt; 200 MΩ on a healthy element), recommission and confirm no trip.",
      "C&G 2391-52 is the combined Initial Verification and Periodic Inspection qualification — covers the full inspection and testing curriculum for new installations (initial verification, EICs) and existing installations (periodic inspection, EICRs). It's the most common single I&T qualification in the UK trade. Holding 2391-52 is the typical entry condition for Approved Electrician JIB grade, for QS roles in CPS-registered firms, and for taking on testing-led contract work.",
      "A manufacturer-specific EPD reports the actual life-cycle impacts of a specific product manufactured at a specific factory by a specific producer. An industry-average EPD reports the average impacts across all members of an industry association making a similar product. Manufacturer-specific EPDs allow real comparison between competing products; industry-average EPDs only allow comparison between product categories. BREEAM gives more weight to manufacturer-specific EPDs because they reward producers that genuinely outperform their peers, not those that simply benefit from a category average.",
    ],
    correctIndex: 2,
    explanation:
      "2391-52 is the dominant I&T qualification post-AM2. It combines the older 2391-50 (Initial Verification) and 2391-51 (Periodic Inspection) into a single combined unit. Most courses run 5-10 days plus exam and practical assessment. Cost is typically £1,200-1,800. The qualification opens the door to Approved Electrician grading, scheme QS roles, and significantly higher day rates on testing-led work.",
  },
  {
    id: 'mod7-s2-sub1-2394-2395',
    question:
      "What's the difference between 2394 and 2395?",
    options: [
      "Every employee, including an apprentice, has two personal duties under HASAWA s.7. (a) take reasonable care for their own H&S and that of anyone affected by their acts or omissions, AND (b) co-operate with the employer's arrangements (RAMS, toolbox talks, permits, PPE rules). Breach is a criminal offence personally — the apprentice can be prosecuted, not just the firm.",
      "2394 is the Initial Verification qualification (testing new installations and producing EICs); 2395 is the Periodic Inspection qualification (inspecting existing installations and producing EICRs). They're separate qualifications in the modern C&G structure. 2391-52 combines both. Some employers prefer the split because it allows staged learning; others prefer the combined route for efficiency.",
      "Our site uses a balanced approach combining planned preventive maintenance for critical assets, condition-based monitoring using thermography and vibration analysis, and run-to-failure for non-critical items, all managed through a CMMS with KPIs including MTBF, MTTR, and maintenance backlog",
      "AFDDs are not required for circuits supplying EV charging equipment conforming to the BS EN 61851 series. Acceptance of the exemption requires verification that the EV charging equipment conforms to the BS EN 61851 series (manufacturer declaration, marking, datasheet or test report) and that any socket-outlet or vehicle connector incorporated in the EV charging equipment conforms to BS EN IEC 62196-2.",
    ],
    correctIndex: 1,
    explanation:
      "C&G restructured the I&T qualifications a few years ago. 2391-50 + 2391-51 → became 2394 (Initial) + 2395 (Periodic) in the standalone route, OR 2391-52 in the combined route. Most candidates take the combined 2391-52 because it's more efficient. Standalone 2394 or 2395 makes sense if you only need one half (e.g. you only do EICR work).",
  },
  {
    id: 'mod7-s2-sub1-2396',
    question:
      "What does the 2396 cover?",
    options: [
      "Two reasons. (1) Auditability — readings are stored against a circuit ID and timestamp, providing tamper-evident evidence at scheme audit and dispute. (2) Cert generation — test results download directly into certificate software (NICEIC PartnerNet, NAPIT, custom firm software, Elec-Mate) and auto-populate the EIC / EICR test schedule, eliminating transcription errors. The combination saves the time previously spent hand-writing and double-checking test schedules.",
      "Because it covers the whole work activity (not just the install), it covers operation, use AND maintenance, AND it covers work NEAR a system as well as on it. So it's the legal hook for safe-isolation procedures, lock-off, voltage-proving, and the way you organise the work around live equipment that you're not directly working on. Reg 4(3) is what the HSE charges most often after an electrical incident.",
      "Your employment contract and the JIB Working Rules. The JIB Handbook sets the industry-standard overtime, travel-time, lodging and grading rules for electricians in England and Wales. Your contract should reference it (most reputable firms apply the JIB rates as a baseline). The HR docs — contract, JIB rules, holiday and grievance procedures — are how you get paid correctly and how you keep your rights if a dispute arises.",
      "C&G 2396 is the Electrical Installation Design and Verification qualification — covers electrical installation design (cable sizing, protection coordination, fault levels) plus verification. It's the design-focused upgrade beyond 2391-52 and is typically the academic route into design-engineer roles. Often combined with the IET DipBSE or HNC for senior design positions.",
    ],
    correctIndex: 3,
    explanation:
      "2396 is the design-tier qualification. Where 2391-52 covers inspection and testing of installations someone else has designed, 2396 covers the design itself — calculating cable sizes from first principles, protection coordination studies, fault-level analysis, BS 7671 design compliance. Typical course around 8-12 days plus assessment. Cost £1,500-2,500. Often the bridge between site work and design office.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Roughly when after AM2 should an electrician start the 2391-52?",
    options: [
      "Provide site induction (covering the construction phase plan, site rules, welfare, emergency procedures and specific hazards), provide access to relevant pre-construction information, and ensure each worker has the information they need to do their work safely. Reg 14 makes it a duty on the principal contractor to ensure workers receive any relevant H&S training. Reg 15 puts a corresponding duty on the worker to co-operate.",
      "Most career-focused electricians start the 2391-52 within 12-18 months of AM2 — long enough to consolidate site experience but soon enough to keep momentum on qualifications. Earlier than that is technically possible but the practical content is easier to absorb after some installation experience. Later than that risks losing study habit and falling behind peers in pay and progression.",
      "Stage 1: try to discuss and resolve — most disputes resolve through conversation. Stage 2: if unresolved, follow your written complaints procedure. Stage 3: if still unresolved, signpost ADR (RECC for MCS work, NICEIC/NAPIT for scheme work, generic ADR providers like Centre for Effective Dispute Resolution). Stage 4: as last resort, small claims court (under £10k, online process). Document everything in writing throughout.",
      "Understand the strategic context of maintenance (why different strategies exist for different assets), apply structured analytical techniques (RCA, FMEA, criticality analysis), contribute to continuous improvement, and articulate how maintenance effectiveness is measured and improved — demonstrating the knowledge, skills and behaviours expected of a competent maintenance technician",
    ],
    correctAnswer: 1,
    explanation:
      "The 12-18 month window is the trade-norm. Some apprentices start 2391-52 prep during the final months of the apprenticeship; others wait several years and find it harder to get back into study. Earlier study means earlier Approved Electrician grading and earlier access to higher pay rates and supervisory roles.",
  },
  {
    id: 2,
    question: "How long does the 2391-52 course typically take?",
    options: [
      "That the installation incorporates an RCD, that the user should test it quarterly (or six-monthly per the older guidance) by pressing the test button, that the RCD should trip when tested, and that if it doesn't trip the user should call a competent electrician immediately. Maintains the protection by catching RCD failure before it matters.",
      "On the metal consumer-side pipe, within 600 mm of the meter outlet union per Reg 544.1.2. The plastic supply pipe is not an extraneous-conductive-part (it can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t introduce a potential) so doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t need bonding — but the metal consumer pipework downstream of the meter does.",
      "Most providers run 5-10 days of taught content (often a mix of classroom and practical lab) plus the exam and practical assessment at the end. Some intensive 5-day courses; some part-time evening or weekend formats over 10-12 weeks. Self-study is possible but rare because the practical assessment requires specific equipment and witness-by-assessor.",
      "Pre-construction information (PC info from client/principal designer) → construction phase plan (principal contractor) → RAMS for each work package (contractor) → toolbox talks each shift (supervisor) → permit-to-work for specific high-risk activities (issued before, closed after). Each layer references the one above it. After an incident the inspector traces backwards from the incident to find the gap.",
    ],
    correctAnswer: 2,
    explanation:
      "Course length varies by provider format. Intensive 5-day course suits employed electricians who can take a week off; part-time suits those balancing CPD with full-time work. The taught content covers the test sequence, certificate completion, BS 7671 cross-references and the regulatory framework. Practical assessment is a witness-by-assessor in a lab environment.",
  },
  {
    id: 3,
    question: "What does 2391-52 typically cost?",
    options: [
      "They share components — both depend on R1+R2 (the cable line + CPC resistance for Zs, line + neutral resistance for voltage drop). A high-Zs reading often correlates with a high voltage drop reading because both are dominated by the cable\\\\\\\\\\\\\\\\'s R1 contribution. If you find one is borderline, check the other. The two tests are complementary — Zs verifies fault-clearance (ADS), voltage drop verifies normal-operation quality. Both use cable resistance as a key input.",
      "Plain language for what was found and what to do, with technical references in brackets where they add precision (e.g. \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Main protective bonding to incoming gas service is missing — the wire that connects the gas pipe to the main earth is not present. Reg 411.3.1.2 requires this bonding to prevent dangerous touch voltages on a fault.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\").",
      "Match symptoms to Schedule 1 categories: visible fracture (excl finger/thumb/toe), amputation, sight loss reported, crush with internal symptoms, burn &gt;10% / vital organ, scalping, LOC, enclosed-space asphyxia / heat. When in doubt, treat as specified and escalate.",
      "Typically £1,200-1,800 for the course, exam fees and practical assessment combined. Premium providers (SECTT in Scotland, JIB-approved providers, NICEIC training arm) sometimes charge £2,000+. Lower-cost providers around £900-1,200 with smaller class sizes or basic practical facilities. Always check exam and assessment fees are included in the headline price.",
    ],
    correctAnswer: 3,
    explanation:
      "Cost varies widely. Some employers part-fund or fully fund 2391-52 as CPD investment, particularly if the firm is moving you toward Approved Electrician grading or QS responsibility. Self-funded electricians can offset the cost against tax (CPD spend is tax-deductible if you're self-employed; HMRC professional fees list applies if you're a member of certain bodies). Worth shopping around — quality varies, but cost difference matters too.",
  },
  {
    id: 4,
    question: "Does 2391-52 require AM2 first?",
    options: [
      "Strictly there's no formal pre-requisite — anyone can sit 2391-52 if they can pass the exam and practical. In practice most providers expect candidates to hold C&G 2365-03 (or equivalent NVQ Level 3) and to have meaningful site experience. AM2 isn't formally required but is the strong norm because the practical content assumes installation competence.",
      "A defined subset — most non-trivial work in special locations (bathroom Zone 0/1, swimming pool, sauna, etc.); installation of a new circuit; replacement of a consumer unit. Like-for-like accessory replacement, repairs, additions to an existing circuit OUTSIDE special locations are NOT notifiable.",
      "BS 7671 Regulation 712.522 requires that DC cables within a building that cannot be isolated from the PV array in a fire are either fire-resistant (to BS 8434/BS 8519) or enclosed in fire-resistant conduit, because they will remain energised as long as daylight is present",
      "Verify the bond clamp is still on consumer-side metal pipework (post-meter, before any branch). If yes, no change needed. The PE supply doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t need bonding (not extraneous-conductive); the consumer steel pipework still does and gets bonded as before.",
    ],
    correctAnswer: 0,
    explanation:
      "Formally open access; practically a post-AM2 qualification because the exam and practical assume installation competence as background. Some apprentices study 2391-52 in their final apprenticeship year, sit the exam after AM2, and emerge with both qualifications close together. Most wait 12-18 months post-AM2 for site experience to consolidate.",
  },
  {
    id: 5,
    question: "What roles does 2391-52 typically open up?",
    options: [
      "CDM 2015 Reg 13(1)(a) requires the principal contractor to plan, manage and monitor the construction phase. In practice this includes site sign-in / sign-out registers, attendance at toolbox talks, RAMS sign-on records, and any permit records. These records combine with the apprentice's own records to form a full picture of who was on site doing what when. The records are commonly required after any incident or in any later dispute.",
      "Several. (1) Approved Electrician JIB grading. (2) QS (Qualified Supervisor) role in a CPS-registered firm — required for Part P self-certification. (3) Periodic inspection contract work (EICR work pays well, particularly in commercial estate and rental property maintenance). (4) Standalone testing-led roles in M&E, FM and consultancy. (5) Bridge to 2396 design qualification.",
      "Roughly 60-100 GBP per AFDD-RCBO device times 10 circuits = 600-1000 GBP additional cost over standard RCBO-only protection. Labour is similar (each AFDD-RCBO replaces an RCBO, same install effort). Total upgrade premium for AFDD-protected CU vs RCBO-only typically 600-1200 GBP. Worth quoting on every domestic CU change as a \\\\\\\"premium fire-protection option\\\\\\\" — many customers will pay the premium when the value is explained.",
      "Section 49 of the Consumer Rights Act 2015 implies a term in every contract for the supply of a service to a consumer that the trader must perform the service with reasonable care and skill. Failure to do so is a breach of contract and the consumer has remedies including the right to require repeat performance and the right to a price reduction. Poor communication that leads to defective work, missed scope items or a non-compliant installation can be a breach of s.49.",
    ],
    correctAnswer: 1,
    explanation:
      "2391-52 is the highest-leverage single CPD spend most newly-qualified electricians can make. It opens multiple progression routes simultaneously — JIB grade upgrade (with pay rise), QS authority (with sole-trader business potential), specialist EICR contract work (with day rate uplift), and the academic foundation for design-tier qualifications. Worth the investment.",
  },
  {
    id: 6,
    question: "What's the practical assessment in 2391-52 like?",
    options: [
      "Three things — battery life vs run time (a hard day on an SDS will drain a 5 Ah pack faster than you can charge spares), tool weight (cordless SDS with a 9 Ah pack on the back is noticeably heavier than a corded equivalent), and what supply is actually on site (no 110 V on site = corded 230 V is awkward, cordless wins). Most apprentices end up with a mixed loadout — cordless drill/driver + cordless impact for general work, corded SDS / grinder / recip on site supply for the heavy-duty jobs.",
      "Yes — UK FE colleges and training providers consistently report difficulty recruiting industry-experienced electrical lecturers and assessors. The pay is below skilled-trade rates but the lifestyle (term-time hours, holidays, pension) appeals to mid-career and later-career electricians. Apprenticeship Standards expansion has increased demand for assessors. Many regions have unfilled posts at any given time.",
      "A witness-by-assessor practical in a controlled environment (lab or training centre with realistic installation rigs). Candidate completes a full test sequence on a sample installation: continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance, RCD operation, prospective fault current. Then completes the relevant certificate (EIC or EICR) accurately. Time-pressured but realistic.",
      "Establish a full exclusion zone with barriers minimum 6 metres from the base, deploy adequate task and area lighting, station banksmen at all access points, display warning signs, ensure all personnel wear enhanced high-visibility clothing, have a traffic management plan approved by the local authority, and confirm the rescue plan accounts for reduced visibility",
    ],
    correctAnswer: 2,
    explanation:
      "Practical assessment mirrors real-world testing — assessor wants to see safe isolation, correct test sequence, accurate readings, sensible interpretation of results, and accurate certificate completion. Common failure points: rushed safe isolation, incorrect test sequence, sloppy certificate completion, misinterpreting borderline test results. Practice the test sequence to muscle-memory level before the assessment.",
  },
  {
    id: 7,
    question: "How does 2391-52 differ from 2382 (BS 7671 18th Edition)?",
    options: [
      "Neuroscience research (including Antonio Damasio\\\\\\\\\\\\\\\\\\\\\\\\'s \\\\\\\"somatic marker hypothesis\\\\\\\") demonstrates that emotions are essential to effective decision-making, and people who believe they are making purely rational decisions are simply unaware of the emotional influences operating below conscious awareness",
      "A rotary cable stripper (Jokari Quadro, Knipex 16 95 02, BAHCO 4490) — sized to the SWA outer diameter, runs around the sheath cleanly and removes a length to expose the armour without scoring the inner cores. Stanley knives can do it but the risk of scoring the inner is high; rotary strippers are the standard. For the armour itself — separate tool (armour shears for smaller, angle grinder for bigger) covered in Sub 1.2.",
      "Initially, work quality may be high, but over time: team members feel overwhelmed and inadequate, initiative decreases (people fear not meeting the standard), morale drops, burnout increases, and the leader becomes a bottleneck because they end up doing everything themselves rather than trusting others — ultimately reducing both performance and wellbeing",
      "2382 is the BS 7671 18th Edition Wiring Regulations qualification — a knowledge qualification on the regs themselves (no practical). 2391-52 is the inspection and testing qualification — practical assessment of installation testing. They're complementary: 2382 establishes regs knowledge; 2391-52 applies it to testing. Most electricians hold both — typically 2382 first (often during apprenticeship), then 2391-52 post-AM2.",
    ],
    correctAnswer: 3,
    explanation:
      "2382 is the regs exam (knowledge); 2391-52 is the testing qualification (practical). Different things, both useful, both common. 2382 is often taken during the apprenticeship as part of the 2365-03 framework. 2391-52 is the post-AM2 specialist add-on. Holding both is the standard combination for an electrician moving toward Approved status.",
  },
  {
    id: 8,
    question: "Is there a CPD requirement to keep 2391-52 current?",
    options: [
      "C&G qualifications themselves don't expire — once awarded, the certificate remains valid. But CPS schemes (NICEIC, NAPIT) typically require ongoing CPD for QS-named individuals to evidence current competence. The most important CPD is keeping up with BS 7671 amendments — currently A4:2026 introduces AFDD requirements, TN-C-S handling and revised schedule columns. Out-of-date QS competence risks scheme registration.",
      "Phase 1 (Days 1-30): Foundation — self-assessment, identify target competency, establish baseline, begin daily reflection practice, and find an accountability partner. Phase 2 (Days 31-60): Practice — apply new skills in specific situations, gather feedback, adjust approach based on results. Phase 3 (Days 61-90): Integration — embed new behaviours into routine, measure progress against baseline, plan for ongoing development",
      "A standard grid-tied inverter is required to shut down on loss of mains because of anti-islanding rules. Continuous operation through a power cut needs a hybrid inverter with explicit islanded-mode capability, paired with a battery and a changeover arrangement that first electrically isolates the property from the failed grid before re-energising selected circuits. The MCS designer specifies which loads stay alive, the battery sizing, and the transfer time.",
      "The incongruence between calm words and stressed body language suggests the client is suppressing significant frustration or anxiety. The project manager should: acknowledge the difficulty of the situation empathically (\\\\\\\"I can see this is a stressful situation, and I understand why\\\\\\\"), address the emotional undercurrent rather than just the facts, and create space for the client to express genuine concerns — because unaddressed suppressed emotions often escalate",
    ],
    correctAnswer: 0,
    explanation:
      "The qualification doesn't lapse but the underlying knowledge does — particularly because BS 7671 is periodically amended (A1, A2, A3, A4 in 2026). CPS schemes require QS-named individuals to evidence ongoing CPD. Sub 4.1 covers the BS 7671 amendment cycle in detail. Plan a refresher every 3-5 years and at every major BS 7671 amendment.",
  },
];

const faqs = [
  {
    question: "Should I do 2394 + 2395 separately or combined as 2391-52?",
    answer:
      "Most candidates do the combined 2391-52 because it's more efficient (single course, single exam, single practical) and slightly cheaper than two separate qualifications. The split route (2394 then 2395) makes sense if you only need one half (e.g. you only do EICR work and never initial verification) or if you want to spread the study load over a longer period. Talk to your training provider about which route fits your situation.",
  },
  {
    question: "Will my employer fund 2391-52?",
    answer:
      "Many employers part-fund or fully fund 2391-52 as CPD investment, particularly if they're moving you toward Approved Electrician grading or you'll be the firm's QS. Some require a 'training agreement' (you commit to staying with the firm for X months after qualification, otherwise pro-rata cost reimbursed). Always ask; the worst they can say is no, and if you have to self-fund the cost is tax-deductible.",
  },
  {
    question: "Is 2391-52 hard?",
    answer:
      "Pass rates vary by provider but the qualification is achievable for any electrician with good 2365-03 grounding and AM2-level practical competence. The exam is 60 multiple-choice plus a short-answer paper; the practical is a witness-by-assessor full test sequence. Common reasons for failing: rushing the practical, sloppy safe isolation, certificate completion errors. Practice the test sequence to muscle-memory level and treat the certificate as part of the assessment.",
  },
  {
    question: "Can I do 2391-52 self-study?",
    answer:
      "Theoretically yes for the exam, but the practical assessment requires specific test equipment, an installation rig and a witness-by-assessor. Most candidates take a structured course because the practical preparation is hard to replicate at home. Some experienced electricians self-study the theory and book a short practical-only course before sitting the assessment.",
  },
  {
    question: "What's after 2391-52?",
    answer:
      "Several directions. 2396 (Design and Verification) — for design-engineer roles. HNC/HND in Electrical/Electronic Engineering — academic upgrade toward Technician JIB grade and EngTech professional registration. Specialist add-ons (EV, PV, BAFE, CompEx) — for specialist work. Or stay at 2391-52 and consolidate as a senior installation/test electrician — that's a fine destination too.",
  },
  {
    question: "Does Scotland have its own version?",
    answer:
      "SECTT (Scottish Electrical Charitable Training Trust) is the primary I&T training provider in Scotland. They deliver C&G 2391-52 and the standalone 2394/2395 against the same UK national standard. Scottish content is essentially identical to the rest of the UK — BS 7671 is a UK-wide standard.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 7 · Section 2 · Subsection 1"
            title="Post-AM2 progression: Inspection & Testing"
            description="The post-AM2 I&T qualification ladder — 2391-52, 2394, 2395, 2396 — what each unlocks, costs, study time, and why I&T qualifications are the highest-leverage CPD spend after AM2."
            tone="emerald"
          />

          <TLDR
            points={[
              "2391-52 is the combined Initial Verification + Periodic Inspection qualification — the most common single I&T qualification post-AM2. Typically 5-10 days, £1,200-1,800.",
              "2394 (Initial) and 2395 (Periodic) are the split alternatives if you only need one half. Most candidates take the combined route.",
              "2396 (Design and Verification) is the design-tier qualification — bridge between site work and design office. Typically 8-12 days, £1,500-2,500.",
              "I&T qualifications open Approved Electrician JIB grading, CPS QS authority, EICR contract work, and significant pay uplift. Highest-leverage CPD spend post-AM2.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO2 / AC 2.5 — identify sources of information about progression routes in building services engineering.",
              "Distinguish between 2391-52, 2394, 2395 and 2396 — what each covers, what each unlocks.",
              "State typical cost, course length and assessment format for 2391-52.",
              "Explain how I&T qualifications connect to Approved Electrician JIB grading and CPS QS authority.",
              "Identify the relationship between 2382 (regs knowledge), 2391-52 (testing) and 2396 (design).",
              "State realistic timing for I&T qualifications relative to AM2.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The qualification map</ContentEyebrow>

          <ConceptBlock
            title="The post-AM2 I&T ladder"
            plainEnglish="After AM2 and the JIB Electrician grade, the standard CPD progression is into inspection and testing qualifications. Four key qualifications form the ladder: 2391-52 (combined I&T), 2394 (Initial only), 2395 (Periodic only) and 2396 (Design and Verification). Most electricians take 2391-52 first; some progress to 2396; some take 2394/2395 separately for staged learning."
            onSite="Post-AM2 most newly-qualified electricians spend 12-18 months consolidating installation experience, then start I&T qualifications. The progression is logical: AM2 proves you can install; 2391-52 proves you can verify; 2396 proves you can design. Each step opens roles and pay grades that the previous step didn't unlock."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  C&amp;G 2391-52
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Combined Initial Verification + Periodic Inspection. The dominant I&amp;T
                  qualification. 5-10 days, &pound;1,200-1,800. Unlocks Approved
                  Electrician grade and CPS QS authority.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  C&amp;G 2394 / 2395
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Standalone Initial Verification (2394) and Periodic Inspection (2395).
                  Useful for staged learning or single-focus roles. Same content split into
                  two qualifications.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  C&amp;G 2396
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Design and Verification. Cable sizing, protection coordination, fault
                  levels, BS 7671 design compliance. 8-12 days, &pound;1,500-2,500. Bridge
                  to design office and Technician JIB grade.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  C&amp;G 2382
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  BS 7671 18th Edition Wiring Regulations qualification &mdash; knowledge
                  exam (no practical). Most electricians hold this from apprenticeship.
                  Typically updated each major BS 7671 amendment.
                </p>
              </div>
            </div>
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

          <ContentEyebrow>2391-52 in detail</ContentEyebrow>

          <ConceptBlock
            title="2391-52 — what's actually on the syllabus"
            plainEnglish="2391-52 covers the full inspection and testing curriculum for both new installations (initial verification, EIC) and existing installations (periodic inspection, EICR). The syllabus splits roughly evenly between the two halves."
            onSite="Course typically combines classroom theory with practical lab time. The exam tests knowledge (regulatory framework, test sequence, certificate completion). The practical assessment tests application — full test sequence on a sample rig, then accurate certificate completion. Most courses include extensive past-paper practice and mock practical sessions."
          >
            <p>
              2391-52 syllabus headlines:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Regulatory framework — BS 7671, EAWR 1989, HASAWA, Building Regulations.</li>
              <li>Safe isolation — lock-off, prove dead, prove meter alive, dead.</li>
              <li>Initial verification test sequence — continuity, IR, polarity, EFLI, RCD, PFC.</li>
              <li>EIC and Schedule of Test Results completion.</li>
              <li>Periodic inspection — EICR coding (C1 / C2 / C3 / FI).</li>
              <li>Test instrument selection, calibration and use.</li>
              <li>Risk assessment for live testing where unavoidable.</li>
              <li>Special locations — bathrooms, swimming pools, agricultural, EV.</li>
              <li>Three-phase testing principles.</li>
              <li>Records, certification and reporting.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="2391-52 assessment — exam plus practical witness"
            plainEnglish="Two components. The exam is typically a 60-question multiple-choice paper (open-book, BS 7671 allowed) plus a short-answer / extended-response paper testing application of knowledge. The practical is a witness-by-assessor full test sequence on a sample installation, followed by accurate certificate completion. Both must pass."
            onSite="Common failure points: rushed safe isolation, incorrect test sequence, sloppy certificate completion, misinterpreting borderline test results. Practice the test sequence to muscle-memory level. Treat the certificate completion as part of the assessment — assessor sees sloppy paperwork as competence concern. Many candidates fail the practical first time and pass on resit; build that into your timeline."
          >
            <p>
              The practical assessment mirrors real-world testing &mdash; assessor wants to
              see:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Safe isolation done methodically with lock-off and prove-dead-prove-meter.</li>
              <li>Correct test sequence (continuity → IR → polarity → EFLI → RCD).</li>
              <li>Accurate readings recorded as you go.</li>
              <li>Sensible interpretation of borderline values.</li>
              <li>Accurate certificate completion (no missing fields, correct cross-references).</li>
              <li>Confidence and competence under reasonable time pressure.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>2396 — the design qualification</ContentEyebrow>

          <ConceptBlock
            title="2396 Design and Verification — the bridge to design office"
            plainEnglish="2396 is the C&G qualification for electrical installation design — covers cable sizing from first principles, protection coordination studies, fault-level analysis, discrimination, BS 7671 design compliance and the design verification process. Where 2391-52 covers testing of installations someone else designed, 2396 covers the design itself."
            onSite="2396 is the typical academic route into design-engineer roles in M&E sub-contractors and consultancies. Often combined with HNC/HND, IET DipBSE or BEng for senior design positions. Course typically 8-12 days, cost £1,500-2,500. Holders of 2396 are eligible for the Technician JIB grade once experience is also in place."
          >
            <p>
              2396 syllabus headlines:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Design responsibility under BS 7671 chapters 1-4.</li>
              <li>Load calculation and demand factors.</li>
              <li>Cable sizing — current-carrying capacity, voltage drop, thermal constraints.</li>
              <li>Protection coordination — discrimination between protective devices.</li>
              <li>Fault-level analysis and prospective fault current calculation.</li>
              <li>Earth-fault loop impedance design and verification.</li>
              <li>RCD selection and grading.</li>
              <li>Special location design (bathrooms, EV, PV, hazardous areas).</li>
              <li>Verification of completed design and design audit.</li>
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
            source="BS 7671 Wiring Regulations — Part 6 (Inspection and Testing) (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  BS 7671 Part 6 sets out the requirements for inspection and testing of
                  electrical installations:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Initial verification (Chapter 64) &mdash; new installations and additions
                    /alterations must be verified before being put into service. The verifier
                    must be competent, the test sequence must be carried out, and an EIC must
                    be issued.
                  </li>
                  <li>
                    Periodic inspection and testing (Chapter 65) &mdash; existing
                    installations must be inspected periodically (intervals depending on
                    type, condition and use). The inspector must be competent and an EICR
                    must be issued.
                  </li>
                  <li>
                    Certification and reporting (Chapter 64.1) &mdash; the prescribed
                    certificates and reports must be completed accurately and signed by
                    competent persons.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                BS 7671 Part 6 establishes the regulatory framework that 2391-52 (and 2394 /
                2395) academically prepare you for. Holding the qualification doesn&apos;t
                make you competent on its own &mdash; the regs require &quot;competence&quot;,
                which combines qualifications, training and experience. 2391-52 is the
                academic anchor; site experience under a competent supervisor is the
                practical anchor. Both together = competence.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 (or current edition), Part 6 — paraphrased; refer to current BS 7671 for precise wording."
          />

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 16 (competence)"
            clause={
              <>
                &quot;No person shall be engaged in any work activity where technical
                knowledge or experience is necessary to prevent danger or, where appropriate,
                injury, unless he possesses such knowledge or experience, or is under such
                degree of supervision as may be appropriate having regard to the nature of
                the work.&quot;
              </>
            }
            meaning={
              <>
                EAWR Regulation 16 is the statutory competence requirement that sits behind
                BS 7671 Chapters 64 and 65. It applies to all electrical work, not just
                inspection and testing. Holding 2391-52 is one of the practical ways to
                evidence the technical knowledge required for inspection and testing work
                under EAWR. Competent-person scheme registration also depends on demonstrable
                competence including 2391-52 (or equivalent) for the QS.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), reg. 16."
          />

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.2(2)(c) (training)"
            clause={
              <>
                &quot;The matters to which that duty extends include in particular &mdash;
                (c) the provision of such information, instruction, training and supervision
                as is necessary to ensure, so far as is reasonably practicable, the health
                and safety at work of his employees.&quot;
              </>
            }
            meaning={
              <>
                Funding 2391-52 is part of the employer&apos;s s.2(2)(c) training duty,
                particularly when moving you toward inspection and testing work. Most JIB-
                graded employers fund the qualification at least in part as part of CPD
                investment. If the employer refuses to fund and you&apos;re moving into I&amp;T
                work as part of your role, that&apos;s a HASAWA point worth raising.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.2."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Putting off 2391-52 'until next year' — for years"
            whatHappens={
              <>
                Newly-qualified electrician finishes apprenticeship, focuses on consolidating
                site experience. Always means to do 2391-52 &quot;next year&quot;. Year 1
                becomes year 3 becomes year 5. Each year the study habit gets harder to
                rebuild; each year the JIB Approved grade and the QS roles stay out of reach;
                each year the pay differential against peers who did the qualification widens.
                Eventually starts the course at year 6 with rusty study habits and a much
                steeper climb.
              </>
            }
            doInstead={
              <>
                Calendar 2391-52 in the 12-18 month window after AM2 and stick to it. Talk to
                your employer about funding. If they&apos;ll fund, accept the training
                agreement (commitment to stay X months post-qualification). If they
                won&apos;t, self-fund and offset against tax. Don&apos;t let perfect become the
                enemy of good &mdash; the qualification is achievable for any post-AM2
                electrician with disciplined preparation.
              </>
            }
          />

          <Scenario
            title="You're 18 months post-AM2 — should you do 2391-52 now or wait for HNC?"
            situation={
              <>
                You finished AM2 18 months ago. You&apos;re thinking about CPD and have two
                options: (a) start 2391-52 now (5-10 day course, &pound;1,500), or (b) start
                an HNC in Electrical Engineering (2-year part-time, &pound;3,000-5,000). Your
                employer would part-fund either. You can&apos;t do both at once. Which makes
                more sense?
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; clarify your career direction</strong>. 2391-52 leads
                to Approved Electrician, QS roles and EICR contract work. HNC leads to
                Technician grade, design office and engineering routes. They&apos;re different
                destinations.
                <br /><br />
                <strong>Step 2 &mdash; check the cost-time-benefit ratio</strong>. 2391-52
                is the higher leverage, faster payback. 5-10 days study, &pound;1,500,
                immediate Approved-grade pay rise (&pound;2-3/hr), QS role potential,
                business-setup option. HNC is longer payback &mdash; 2 years study, larger
                cost, larger eventual outcome but takes longer to materialise.
                <br /><br />
                <strong>Step 3 &mdash; consider the realistic sequence</strong>. Most
                electricians do 2391-52 first because it&apos;s shorter, cheaper and
                immediately applicable. HNC builds on top &mdash; the design content in HNC
                assumes the testing competence from 2391-52. Doing them in the other order
                is possible but harder.
                <br /><br />
                <strong>Step 4 &mdash; think about life balance</strong>. 2391-52 is a
                short, intensive commitment (or part-time over a few months). HNC is 2 years
                of evening or day-release study. Different demands on your time and your
                relationships. Pick the one you can actually finish.
                <br /><br />
                <strong>Step 5 &mdash; commit and book</strong>. The risk is doing neither.
                Pick one, book it, get the date in the diary. You can always add the other
                later. Most successful career trajectories include both eventually.
              </>
            }
            whyItMatters={
              <>
                CPD planning is the difference between drift and direction. Most
                newly-qualified electricians who never do 2391-52 are still on Electrician
                rate ten years later, doing the same install work. Those who invested in
                2391-52 in the 18-month window are typically Approved Electricians, sometimes
                running their own firm or in a senior testing/QS role, on materially higher
                pay. The choice is yours; the trajectory follows.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>The income mechanics of an I&T qualification</ContentEyebrow>

          <ConceptBlock
            title="EICR economics — what a single qualification unlocks in real money"
            plainEnglish="A C&G 2391-52 qualified electrician can charge £150-300 per domestic EICR (depending on size and region), £400-700 for small commercial premises, £1,200-3,500 for medium commercial buildings. A typical post-2391-52 electrician picks up 2-3 EICRs/week part-time on top of install work — say 100 EICRs/year averaging £200 each = £20k extra revenue at very high margin (it's mostly your time, minimal materials). The £1,200-1,800 course pays back in roughly 6 EICRs."
            onSite="EICR work is one of the most economically rational things an electrician can add post-AM2. Demand is structural — every let property needs a 5-yearly EICR under the Electrical Safety Standards in the Private Rented Sector Regs 2020, and the let sector is millions of properties strong. Insurance-driven EICRs (commercial premises wanting cover renewal, lender-required EICRs for buy-to-let mortgages) are a steady additional stream. Many qualified inspectors run an EICR-only weekend business alongside their main employment — often clearing £8-15k extra annually with low capital outlay."
          >
            <p>
              EICR pricing benchmarks (2024 UK indicative ranges):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Small flat (1-bed)</strong> &mdash; &pound;120&ndash;180.
              </li>
              <li>
                <strong>Standard 3-bed house</strong> &mdash; &pound;180&ndash;280.
              </li>
              <li>
                <strong>Larger 4-5 bed property</strong> &mdash; &pound;250&ndash;400.
              </li>
              <li>
                <strong>HMO (House in Multiple Occupation)</strong> &mdash; &pound;300&ndash;500 (more circuits, more rooms).
              </li>
              <li>
                <strong>Small office or retail unit</strong> &mdash; &pound;400&ndash;700.
              </li>
              <li>
                <strong>Medium commercial (10&ndash;30 circuits)</strong> &mdash; &pound;1,200&ndash;2,500.
              </li>
              <li>
                <strong>Large commercial (50+ circuits)</strong> &mdash; &pound;2,500&ndash;5,000+.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="2394 vs 2395 vs 2391-52 — picking the right route for your career stage"
            plainEnglish="The pre-2018 qualification structure split Initial Verification (2394) and Periodic Inspection (2395) into two separate certificates. The 2391-52 combines both. The older 2394/2395 are still valid and recognised but are no longer the standard new entry. 2396 (Design and Verification) is a different beast — it's the design qualification that lets you specify installations rather than test them. Most practising electricians want 2391-52 first; designers and senior project engineers add 2396 later."
            onSite="If you already hold a separate 2394 or 2395 from before 2018, you don't need to convert — they remain industry-accepted. If you're starting fresh, 2391-52 is the sensible single course. The 2396 (Design) is a longer, more theoretical qualification (typically 5-7 days plus exam) and assumes you're already comfortable with BS 7671 design clauses. Stack them in order: AM2 → 2391-52 → 2396 if design interests you. Adding 2396 also helps if you're targeting Project Engineer or Design Engineer roles."
          >
            <p>
              I&amp;T qualification stack at a glance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>2391-50</strong> &mdash; Initial Verification only (current short version).
              </li>
              <li>
                <strong>2391-51</strong> &mdash; Periodic Inspection &amp; Testing only (current short version).
              </li>
              <li>
                <strong>2391-52</strong> &mdash; Combined Initial + Periodic, the dominant post-AM2 choice.
              </li>
              <li>
                <strong>2394 / 2395</strong> &mdash; pre-2018 separate qualifications, still valid.
              </li>
              <li>
                <strong>2396</strong> &mdash; Design and Verification, the design-route qualification.
              </li>
              <li>
                <strong>2397 (HV/LV)</strong> &mdash; specialist HV inspection, niche.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Insurance-driven EICR demand — the steady-state work stream"
            plainEnglish="Beyond the mandatory PRS rental sector, EICR demand is driven by insurance and mortgage requirements. Many commercial property insurers require a current (under 5 years) EICR as a condition of cover; some lenders require a satisfactory EICR before completing on a buy-to-let mortgage. Commercial landlords typically run EICRs on a 5-yearly cycle even where not legally mandated, because a current EICR caps liability if a tenant has an electrical incident. This 'insurance-driven' stream is steady, repeatable, and most qualified electricians underestimate its scale."
            onSite="Building a steady EICR work stream means relationship-selling: introduce yourself to local letting agents, commercial insurance brokers, mortgage advisers and FM companies. A single letting agent with 200 properties on books is worth ~£8-12k/year of repeat EICR work as the 5-yearly cycles roll. Quote turnaround within 24 hours, deliver the certificate within 48 hours of test, and you'll be the inspector they call. The certificate template, the pricing structure and the response speed are what wins the contract — not the technical qualification itself, which the customer takes for granted."
          >
            <p>
              Where EICR demand comes from:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PRS rental sector</strong> &mdash; mandatory 5-yearly under Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020.
              </li>
              <li>
                <strong>HMOs</strong> &mdash; mandatory 5-yearly under HMO licensing rules.
              </li>
              <li>
                <strong>Commercial buildings</strong> &mdash; insurance-driven, typically 5-yearly.
              </li>
              <li>
                <strong>Buy-to-let mortgages</strong> &mdash; lender-required for some products.
              </li>
              <li>
                <strong>Pre-purchase surveys</strong> &mdash; commissioned by buyer's solicitor.
              </li>
              <li>
                <strong>Change of use / refurbishment</strong> &mdash; before commercial fit-out works.
              </li>
              <li>
                <strong>Insurance claims</strong> &mdash; post-incident verification.
              </li>
              <li>
                <strong>Supplementary EICR</strong> &mdash; after fault repairs to evidence remediation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="QS (Qualified Supervisor) status under your CPS scheme"
            plainEnglish="Holding C&G 2391-52 lets you act as the Qualified Supervisor (QS) for a competent-person scheme — the named person who signs off the firm's compliance certificates and faces the annual scheme assessment. Every CPS-registered firm needs at least one current QS. Without a QS the firm can't issue compliance certificates, can't self-certify Part P, and the scheme registration lapses. A 2391-52 holder who's prepared to act as QS is therefore valuable to any small electrical firm — which is why the qualification often shifts pay band on its own."
            onSite="If you hold 2391-52 and your firm has a single QS who's nearing retirement or considering moving, you become the natural successor. Talk to your employer about adding you as a second QS — it gives the firm continuity, gives you formal supervisory status, and often comes with a pay step. If you're considering setting up your own firm post-AM2, 2391-52 + your scheme's QS sign-off is the regulatory minimum to register. Many electricians trade as a sole trader for 2-3 years post-AM2 specifically to build the QS-supervised work record before stepping into their own scheme registration."
          >
            <p>
              QS responsibilities under a CPS scheme:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sign compliance certificates</strong> &mdash; EIC, Minor Works, EICR for the firm's customers.
              </li>
              <li>
                <strong>Annual scheme assessment</strong> &mdash; the QS faces the scheme's assessor for the firm.
              </li>
              <li>
                <strong>Calibration of the firm's standards</strong> &mdash; reviewing junior staff's work, second-checking certificates.
              </li>
              <li>
                <strong>Test equipment register</strong> &mdash; ensuring kit is calibrated and traceable.
              </li>
              <li>
                <strong>Continuing professional development</strong> &mdash; the QS must stay current on BS 7671 amendments.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "C&G 2391-52 is the dominant post-AM2 I&T qualification — combines Initial Verification (EIC) and Periodic Inspection (EICR). 5-10 days, £1,200-1,800.",
              "Standalone 2394 (Initial) and 2395 (Periodic) split the same content for staged learning or single-focus roles. Most candidates take the combined 2391-52.",
              "C&G 2396 is the Design and Verification qualification — bridge between site work and design office. 8-12 days, £1,500-2,500.",
              "I&T qualifications open Approved Electrician JIB grading, CPS QS authority, EICR contract work, and significant pay uplift.",
              "Practical assessment is a witness-by-assessor full test sequence — practice safe isolation, test sequence and certificate completion to muscle-memory level.",
              "Most career-focused electricians start 2391-52 in the 12-18 month window post-AM2 — long enough to consolidate experience, soon enough to keep momentum.",
              "Many employers part-fund or fully fund 2391-52 as CPD investment; self-funded cost is tax-deductible.",
              "Qualification doesn't expire but BS 7671 amendments require ongoing CPD — plan a refresher every 3-5 years and at every major regs amendment.",
            ]}
          />

          <Quiz title="Post-AM2 I&T progression — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 1 — Industry structure and roles
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section2-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.2 MCS standalone certifications
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
