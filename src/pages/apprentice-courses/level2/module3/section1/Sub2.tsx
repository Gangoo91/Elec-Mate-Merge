/**
 * Module 3 · Section 1 · Sub 2 — Non-statutory regulations and guidance
 * Maps to City & Guilds 2365-02 / Unit 203 / LO1 / AC 1.2, 1.4
 *   AC 1.2 — "Identify non statutory regulations/guidance"
 *   AC 1.4 — "State implications of non-statutory regulations"
 *
 * Frame: not the law itself, but if you ignore them you're presumed negligent.
 * They're the bar everyone uses to judge whether you did the job right.
 * Sub 1.1 handled the statutory regs that carry criminal sanctions; this Sub
 * covers the standards, guidance and scheme rules that turn 'safe' from an
 * abstract duty into a practical job spec.
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
  'Non-statutory regulations and guidance — BS 7671, GN3, OSG, JIB, scheme bodies (1.2, 1.4) | Level 2 Module 3.1.2 | Elec-Mate';
const DESCRIPTION =
  "BS 7671:2018+A4:2026, IET GN3, the On-Site Guide, JIB grading and the competent person schemes — the non-statutory framework that turns the statutory regs from Sub 1.1 into a practical day-to-day job spec.";

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'mod3-s1-sub2-bs7671-status',
    question:
      "True or false: BS 7671 is a Statutory Instrument and ignoring it is automatically a criminal offence.",
    options: [
      "False — BS 7671 is a British Standard published by BSI / co-published by the IET. It carries no statutory force on its own, but it is the document that the HSE, the courts and every CPS use to decide whether you complied with EAWR Reg 4. Ignoring it makes the prosecution case under EAWR a lot easier to bring.",
      "True — BS 7671 was given statutory force by the Building Regulations 2010, so a breach of any of its regulations is a criminal offence prosecutable in the same way as a breach of EAWR.",
      "True — because the Electricity at Work Regulations 1989 incorporate BS 7671 by reference, the standard became part of the statute itself, so failing to follow it is automatically unlawful.",
      "False — BS 7671 is purely advisory and has no bearing on any prosecution; the courts rely solely on the wording of EAWR and never refer to British Standards as evidence of compliance.",
    ],
    correctIndex: 0,
    explanation:
      "BS 7671 is non-statutory by status but quasi-mandatory in practice. HSR25 (the HSE's guidance on EAWR) explicitly cites compliance with BS 7671 as a way to demonstrate compliance with EAWR. So the law is EAWR; the document used to judge whether you met it is BS 7671. Same effect, different legal route.",
  },
  {
    id: 'mod3-s1-sub2-gn3-vs-bs7671',
    question:
      "You're doing an EICR. The GN3 example test sequence and the wording in BS 7671 Chapter 64 give slightly different ways of describing the same test. Which one wins?",
    options: [
      "BS 7671 is the standard; GN3 is a guidance document that explains how to apply BS 7671 in practice. If they conflict, BS 7671 is the authority. GN3 should be read as the recommended practical interpretation, not as a competing standard.",
      "GN3 wins — as the more recently published document it supersedes the older BS 7671 wording, so where they differ the GN3 test sequence is the one to follow.",
      "Whichever the scheme inspector prefers — there is no formal hierarchy between the two, so the deciding factor is the personal interpretation of whoever assesses the EICR.",
      "Neither — for an EICR you follow the manufacturer's instructions for the test instrument instead, because the device documentation overrides both BS 7671 and GN3 on test method.",
    ],
    correctIndex: 0,
    explanation:
      "GN3 is published by the IET as a guidance note specifically supporting BS 7671 Part 6 (Inspection and Testing). It's authoritative because the same body publishes both, but BS 7671 is the standard, GN3 is the explanation. The scheme inspector will accept either, but if they conflict on a fine point, the BS 7671 wording is the one you cite.",
  },
  {
    id: 'mod3-s1-sub2-cps-implication',
    question:
      "A NICEIC-registered firm fits a consumer unit, doesn't do an OPDC test, doesn't issue an EIC, and the customer complains. The work is electrically sound. What's the realistic non-criminal consequence the firm faces?",
    options: [
      "A criminal prosecution by the HSE — failing to issue an EIC is a breach of EAWR Reg 4, so the firm faces an unlimited fine and possible imprisonment of the director responsible.",
      "NICEIC scheme action — non-conformance notice, possible suspension, possible removal from the scheme. Removal from the CPS means: no more self-certification under Part P, customers' insurance defences weakened, marketing claims (logo, badge) withdrawn, and frequently insurer-driven loss of public liability cover. The job stays civil, but the firm's ability to trade collapses.",
      "A Trading Standards investigation under the Consumer Rights Act 2015 — the missing certificate means the service was not as described, so the firm is ordered to refund the customer and pay a fixed penalty.",
      "A Building Control enforcement notice requiring the consumer unit to be removed — because no EIC was issued, the work is treated as unnotified and the local authority can have it ripped out at the firm's cost.",
    ],
    correctIndex: 1,
    explanation:
      "Scheme membership is voluntary and non-statutory, but losing it has commercial consequences far worse than most fines. Without a CPS, you can't self-certify Part P notifiable work. Without a Part P self-cert route, your turnaround on every domestic job slows by weeks. Without scheme membership, your insurer often refuses cover. The non-statutory framework's enforcement is commercial, not criminal — but it bites hard.",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What does BS 7671:2018+A4:2026 actually mean as a citation — break down the four parts.",
    options: [
      "BS = British Standard, 7671 = the year the standard was first published, 2018 = the edition number written in date form, A4 = the room or section the standard applies to, 2026 = the year the standard expires and must be renewed.",
      "BS = British Standard, 7671 = standard number, 2018 = base edition publication year (the 18th Edition), A4 = the fourth amendment to that base edition, 2026 = year that fourth amendment was published.",
      "BS = British Standard, 7671 = the IET membership number of the publishing committee, 2018 = the first amendment year, A4 = the paper size the standard is printed on, 2026 = the base edition year.",
      "BS = British Standard, 7671 = the EAWR regulation it implements, 2018 = the year it became statutory, A4 = the appendix number, 2026 = the year it was withdrawn and replaced.",
    ],
    correctAnswer: 1,
    explanation:
      "Read it as 'British Standard 7671, 2018 base edition, fourth amendment dated 2026'. So the underlying standard is the 18th Edition (2018), and we're now on the A4:2026 amendment. Knowing the citation matters because BS 7671 changes substantially between amendments — A4:2026 brought AFDD requirements, the TN-C-S → PNB renaming and new inspection schedule columns.",
  },
  {
    id: 2,
    question:
      "Which IET publication is the practical companion specifically to BS 7671 Part 6 (Inspection and Testing)?",
    options: [
      "Guidance Note 1 — Selection and Erection",
      "On-Site Guide (OSG)",
      "Guidance Note 3 — Inspection and Testing",
      "Guidance Note 8 — Earthing and Bonding",
    ],
    correctAnswer: 2,
    explanation:
      "GN3 is the dedicated I&T companion. It walks through initial verification and periodic inspection, gives example test sequences, recommended condition codes (C1/C2/C3/FI), and the worked examples for filling out an EIC and EICR. Every working electrician on testing duties has a copy.",
  },
  {
    id: 3,
    question:
      "The On-Site Guide (OSG) is aimed primarily at:",
    options: [
      "Designers of large industrial and three-phase distribution systems — it pulls the complex load-calculation and discrimination tables out of BS 7671 for high-current commercial design work.",
      "Inspectors and testers carrying out EICRs — it sets out the periodic-inspection test sequence and condition-coding framework as the field reference for testing duties.",
      "Manufacturers of electrical accessories — it specifies the product standards and markings a device must meet before it can be sold for use under BS 7671.",
      "Installers of standard domestic and small commercial installations — it pulls the most-used BS 7671 tables (cable sizing, diversity, ratings) into a pocket-sized reference and explains the standard install methods.",
    ],
    correctAnswer: 3,
    explanation:
      "The OSG is the install-side companion to BS 7671. It doesn't replace BS 7671 — it picks out the parts a typical site electrician uses every day (single-phase, sub-100 A supplies, common cable types) and gives quick-reference tables and worked examples. For anything outside the standard envelope, you go back to BS 7671 itself.",
  },
  {
    id: 4,
    question:
      "What does JIB grading determine for an electrician on a JIB-affiliated job?",
    options: [
      "The minimum hourly/weekly rate of pay, the holiday entitlement, the travel/lodging allowances, the categorisation (Adult Trainee → Labourer → Apprentice → Electrician → Approved Electrician → Technician), and the H&S handbook obligations. Grading is verified by JIB card.",
      "Which categories of Part P notifiable work the electrician may self-certify, since the JIB grade is the competent person scheme that authorises Building Regulations sign-off.",
      "The maximum prospective fault current the electrician is permitted to work on, with higher JIB grades cleared for higher-energy switchgear and distribution work.",
      "The frequency of periodic inspection the electrician must apply to their installations, with the JIB grade setting the EICR interval the contractor is allowed to recommend.",
    ],
    correctAnswer: 0,
    explanation:
      "The JIB (Joint Industry Board) is the national wage and conditions agreement for the electrical contracting industry in England, Wales and Northern Ireland (Scotland has SJIB). The grading on your card determines what the contractor must pay you, what you're allowed to do unsupervised on a JIB site, and what your H&S obligations are.",
  },
  {
    id: 5,
    question:
      "A registered NICEIC contractor's annual assessment shows persistent failure to keep test instrument calibration certificates. What's the realistic outcome?",
    options: [
      "Immediate prosecution by the HSE — uncalibrated test instruments mean the test results are unreliable, which is a direct criminal breach of EAWR Reg 4 carrying an unlimited fine.",
      "Non-conformance issued, given a deadline to evidence calibration, re-assessed. Persistent failure or refusal to remediate triggers escalation: warning, suspension, removal from scheme. Scheme rules are contractual — you signed up to them in writing on enrolment.",
      "No consequence at all — calibration certificates are a best-practice recommendation only, so a contractor can continue to self-certify regardless of whether the instruments are in date.",
      "Automatic withdrawal of the electrician's JIB grade — calibration is a JIB working-rule requirement, so the grading body downgrades the operative until the certificates are produced.",
    ],
    correctAnswer: 1,
    explanation:
      "Scheme rules are contractual obligations between the contractor and the scheme operator. Failure isn't criminal but it is grounds for scheme action up to and including expulsion. Once you're out of the scheme you can't self-certify Part P, your insurer often pulls the rug, and the customer-facing badge disappears.",
  },
  {
    id: 6,
    question:
      "A circuit breaker carries the marking 'BS EN 60898-1, 6 kA, B32'. What is BS EN 60898-1?",
    options: [
      "An installation regulation — the part of BS 7671 that sets out how MCBs must be arranged in a consumer unit, including spacing and labelling requirements.",
      "A test method — the standard that defines how an inspector must verify the trip characteristics of an MCB during initial verification and periodic inspection.",
      "A product standard — the European harmonised standard for circuit breakers used in domestic and similar installations. BS 7671 references this standard for MCB selection. Devices marked to BS EN 60898 are deemed-to-comply under BS 7671.",
      "A scheme requirement — the NICEIC rule specifying which makes of MCB a registered contractor is permitted to install under the competent person scheme.",
    ],
    correctAnswer: 2,
    explanation:
      "BS EN standards are product specifications — they tell the manufacturer what the product must meet. BS 7671 references them so that when you select an MCB to BS EN 60898 you don't have to re-prove its short-circuit performance, breaking capacity or thermal characteristics. The standard does that work for you. Similarly BS EN 60947 for industrial switchgear and contactors, BS EN 61008/61009 for RCDs/RCBOs.",
  },
  {
    id: 7,
    question:
      "Why does ignoring a non-statutory document like BS 7671 weaken your defence in a statutory prosecution under EAWR?",
    options: [
      "Because BS 7671 is itself a statutory instrument, so any departure from it is a separate criminal offence that is automatically added to the EAWR charge against you.",
      "Because the court is not permitted to hear any technical evidence other than BS 7671, so without it you have no way to demonstrate that your work was safe.",
      "Because ignoring BS 7671 voids your competent person scheme membership, and only scheme members are allowed to defend themselves against an EAWR prosecution.",
      "Because the HSE's Memorandum of Guidance to EAWR (HSR25) cites BS 7671 as a means of demonstrating compliance with EAWR Reg 4. Following BS 7671 raises a presumption of compliance; departing from it requires you to prove your alternative method was at least as safe — a much harder argument to win in court.",
    ],
    correctAnswer: 3,
    explanation:
      "The legal logic is 'reverse onus by reference standard'. If the recognised standard is BS 7671 and you followed it, the burden is on the prosecution to show that wasn't enough. If you ignored it, the burden flips to you to show your method was equivalent. Most defendants can't carry that burden — which is why everyone follows BS 7671 in practice.",
  },
  {
    id: 8,
    question:
      "A homeowner's house insurance is voided after a fire. The insurer cites 'failure to demonstrate the electrical installation was maintained in accordance with current standards'. Which non-statutory framework typically supplies the evidence the insurer wants to see?",
    options: [
      "An EICR carried out and signed by a competent person (usually a CPS-registered contractor) in accordance with BS 7671 Part 6 / IET GN3, at the recommended frequency for the premises type, with a satisfactory or remediated outcome. Without that, the insurer's claim that the installation wasn't maintained to current standards is hard to refute.",
      "A Building Regulations Part P completion certificate from the original install, since this proves the installation was lawfully notified and is therefore deemed maintained to current standards for the life of the property.",
      "The original Electrical Installation Certificate from when the property was built, which certifies the installation as compliant and stands as the maintenance record regardless of how many years have since passed.",
      "A current PAT testing record for the property's portable appliances, which demonstrates the electrical equipment in the home has been inspected and maintained to the recognised standard.",
    ],
    correctAnswer: 0,
    explanation:
      "Insurance contracts almost always include a 'maintained to a reasonable standard' clause. The non-statutory documents (BS 7671 + GN3 + a CPS-issued EICR) ARE the evidence base for that clause. No EICR, no defence — the insurer walks away from the claim. This is one of the biggest practical reasons the non-statutory framework matters as much as the statutory one.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: "Why is BS 7671 'non-statutory' if literally every electrician follows it?",
    answer:
      "Because it's published by BSI (the British Standards Institution) and the IET, not by Parliament. Parliament makes statutes (HASAWA, EAWR, ESQCR, Building Regs); BSI publishes standards. The way they hook together is via the HSE's HSR25 guidance, which lists BS 7671 as a means of complying with EAWR. So legally non-statutory, practically mandatory.",
  },
  {
    question: "What's the difference between NICEIC, NAPIT and ELECSA?",
    answer:
      "All three are competent person schemes — they assess and register electrical contractors so the contractor can self-certify Part P notifiable work in dwellings. NICEIC and ELECSA are both run by Certsure. NAPIT is a separate organisation. Functionally they cover the same ground; the differences are in fees, assessment style and the badge you stick on the van. From a regulator's perspective they're equivalent.",
  },
  {
    question: "If I'm not in the JIB, can I still work as an electrician?",
    answer:
      "Yes. The JIB sets the national agreement for pay, conditions and grading on JIB-affiliated jobs (most large commercial and industrial sites in England/Wales/NI go JIB). Self-employed electricians on domestic work often aren't JIB-graded. But many tier-1 contractors will only let JIB-carded operatives on site, and your apprentice progression card sits inside the JIB grading system.",
  },
  {
    question: "Do I need to know the BS EN product standards by number?",
    answer:
      "Not all of them. Know the headline ones — BS EN 60898 (MCBs), BS EN 60947 (industrial switchgear and contactors), BS EN 61008/61009 (RCDs and RCBOs), BS EN 62606 (AFDDs), BS EN 60439 (assemblies). When you read a BS 7671 reg that says 'devices to BS EN xxxxx', you should at least recognise what kind of device the standard covers. The detail lives in the catalogue, not in your head.",
  },
  {
    question: "What changes does BS 7671 A4:2026 actually bring?",
    answer:
      "Headline changes: stronger AFDD requirements (Reg 421.1.7), the renaming of TN-C-S supplies to PNB (Protective Neutral Bonding), updated inspection schedule columns, and revisions to the model EIC / EICR / Minor Works forms. Module 4 covers earthing and the PNB rename in detail. The point for this Sub: BS 7671 is a living document — every amendment shifts what 'compliant' looks like, and the amendment date in the citation matters.",
  },
  {
    question: "Can a customer demand I work to an old version of BS 7671?",
    answer:
      "No — and you shouldn't. Once a new amendment is published and in force, that's the standard the courts and inspectors use. Working to a withdrawn version means your work won't satisfy the deemed-to-comply route under EAWR, your CPS scheme will refuse to certify it, and your insurer will treat it as non-compliant. Customer preferences don't outrank current standards.",
  },
];

export default function Sub2() {
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
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 3 · Section 1 · Subsection 2"
            title="Non-statutory regulations and guidance"
            description="BS 7671, GN3, OSG, JIB and the competent person schemes. Not law in their own right — but if you ignore them, the prosecution case under the statutory regs from Sub 1.1 writes itself."
            tone="emerald"
          />

          <TLDR
            points={[
              "BS 7671:2018+A4:2026 is the IET Wiring Regulations — non-statutory but referenced by HSR25 as the way to demonstrate compliance with EAWR. Ignore it and you've lost your defence to a statutory prosecution.",
              "GN3, the OSG, the JIB Handbook and the BS EN product standards are the practical documents that turn BS 7671 into a job spec. Each has its own audience and each carries enforcement consequences when ignored.",
              "Competent person schemes (NICEIC, NAPIT, ELECSA) are voluntary but their teeth are commercial — lose your scheme and you lose Part P self-certification, your insurer's cover and your ability to trade.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the main non-statutory documents that govern UK electrical work — BS 7671, IET GN3, IET OSG, JIB Handbook, scheme rules, BS EN product standards.",
              "Read a BS 7671 citation correctly (BS 7671:2018+A4:2026) and explain what each part of the citation means.",
              "Distinguish between BS 7671 (the standard) and the IET Guidance Notes (the practical companions), and know which one wins in a conflict.",
              "Explain how non-statutory documents derive their practical force from the statutory regs in Sub 1.1, via HSR25's reference to BS 7671 as a deemed-to-comply route under EAWR.",
              "Identify the consequences of ignoring non-statutory standards — civil claims, insurance void, scheme withdrawal, weakened defence to statutory prosecution.",
              "Distinguish a competent person scheme (Part P route) from a JIB grading (pay/conditions route) and explain which body enforces which.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why non-statutory still bites</ContentEyebrow>

          <ConceptBlock
            title="'Not technically law' is not the same as 'optional'"
            plainEnglish="Non-statutory means Parliament didn't pass it. It does NOT mean you can ignore it. The non-statutory documents are the standards everyone in the trade — the HSE, the courts, the insurers, the schemes — uses to judge whether you did the job to a competent standard."
            onSite="The phrase to remember: 'deemed to comply'. If you follow BS 7671, you're deemed to have complied with EAWR. If you didn't, the burden falls on you to prove your alternative method was at least as safe — and that's a hill no working electrician wants to die on."
          >
            <p>
              The non-statutory framework that matters every day:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 7671:2018+A4:2026</strong> — the IET Wiring Regulations. The technical
                standard for electrical installations in the UK.
              </li>
              <li>
                <strong>IET Guidance Note 3 (GN3)</strong> — the practical companion to BS 7671
                Part 6 (Inspection and Testing).
              </li>
              <li>
                <strong>IET On-Site Guide (OSG)</strong> — the install-side quick-reference for
                standard domestic and small commercial work.
              </li>
              <li>
                <strong>The other IET Guidance Notes</strong> — GN1 (Selection and Erection), GN2
                (Isolation and Switching), GN4 (Protection against fire), GN5 (Protection against
                electric shock), GN6 (Protection against overcurrent), GN7 (Special locations),
                GN8 (Earthing and bonding), GN9 (Cabling).
              </li>
              <li>
                <strong>JIB National Working Rules + JIB Health &amp; Safety Handbook</strong> — pay,
                conditions, grading and site H&amp;S obligations on JIB-affiliated jobs.
              </li>
              <li>
                <strong>NICEIC / NAPIT / ELECSA</strong> — competent person schemes, certification
                authority, the badge that lets you self-certify Part P notifiable work.
              </li>
              <li>
                <strong>BS EN product standards</strong> — BS EN 60898 (MCBs), BS EN 60947
                (industrial contactors), BS EN 61008/61009 (RCDs and RCBOs), BS EN 62606 (AFDDs)
                and dozens more. BS 7671 references these so you don't have to re-prove the
                product's electrical performance every time.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>BS 7671 — the IET Wiring Regulations</ContentEyebrow>

          <ConceptBlock
            title="The standard the whole industry runs on"
            plainEnglish="BS 7671 is the British Standard that defines the requirements for electrical installations in the UK. Co-published by BSI and the IET. Every working electrician refers to it. Currently in its 18th Edition (the 2018 base) with the A4 amendment dated 2026."
            onSite="Read the citation: BS 7671:2018+A4:2026. 'BS' = British Standard. '7671' = standard number. '2018' = base edition publication year. 'A4' = the fourth amendment to that base. '2026' = the year that fourth amendment was published. Know the amendment your work was done under because BS 7671 changes substantially between amendments."
          >
            <p>
              BS 7671's structure is worth carrying in your head as a navigational map:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Part 1</strong> — Scope, object and fundamental principles (Reg 110–134).
              </li>
              <li>
                <strong>Part 2</strong> — Definitions.
              </li>
              <li>
                <strong>Part 3</strong> — Assessment of general characteristics of the
                installation.
              </li>
              <li>
                <strong>Part 4</strong> — Protection for safety (shock, thermal effects,
                overcurrent, voltage disturbances). This is where Reg 411.3.4 (30 mA RCD on
                domestic socket and lighting circuits) and Reg 421.1.7 (AFDDs) live.
              </li>
              <li>
                <strong>Part 5</strong> — Selection and erection of equipment. Chapters 51–55
                (common rules, wiring systems, isolation/switching, earthing, other equipment).
                Reg 510.3 (manufacturer's instructions) and Section 534 (SPDs) sit here.
              </li>
              <li>
                <strong>Part 6</strong> — Inspection and testing (Chapters 64, 65). Where the
                EICR test sequence and condition codes are defined.
              </li>
              <li>
                <strong>Part 7</strong> — Special installations or locations (bathrooms, swimming
                pools, agricultural premises, marinas, EV charging — Section 722, etc).
              </li>
              <li>
                <strong>Part 8</strong> — Functional requirements (energy efficiency, prosumer's
                installations).
              </li>
              <li>
                <strong>Appendices</strong> — model forms, voltage drop tables, cable selection
                tables, current-carrying capacities, the lot.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 134.1.1"
            clause="Good workmanship by one or more skilled or instructed persons and proper materials shall be used in the erection of the electrical installation. The installation of electrical equipment shall take account of manufacturers' instructions."
            meaning={
              <>
                Two phrases worth dwelling on. 'Skilled or instructed persons' is the BS 7671
                equivalent of EAWR Reg 16 — competence is required, supervision counts. 'Take
                account of manufacturers' instructions' is the hook that turns ignoring an SPD
                lead-length spec or a CU manufacturer's torque setting into a regs breach. Reg
                134.1.1 is the regulation a scheme inspector quotes when they're calling out poor
                workmanship without it being a specific technical-test failure.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 134.1.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 510.3"
            clause="Every item of equipment shall be selected and erected so as to allow compliance with the regulations stated in this chapter and the relevant regulations in other parts of BS 7671 and shall take account of manufacturers' instructions."
            meaning={
              <>
                Reg 510.3 is the second pillar of the manufacturer's-instruction obligation (Reg
                134.1.1 is the first). Selection AND erection both have to take account of the
                manufacturer's literature. So fitting a CU to one brand's schematic and stuffing it
                with another brand's modules — without checking compatibility — puts you in breach
                of 510.3 even if every individual component is fine on its own.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 51, Regulation 510.3."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The IET Guidance Notes</ContentEyebrow>

          <ConceptBlock
            title="GN3 — the I&T practical companion"
            plainEnglish="BS 7671 Part 6 tells you WHAT to test. GN3 tells you HOW to test it, in what order, with what kit, and how to write up the result."
            onSite="GN3 lives in the testing engineer's bag right next to the MFT. It's the document a scheme inspector will reference when they're querying whether your test sequence was right or your condition coding was justified. The current edition tracks BS 7671 amendments — make sure your GN3 matches the amendment your test was done under."
          >
            <p>
              GN3 covers the full I&amp;T workflow:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Initial verification</strong> — the EIC test sequence on a new install or
                an addition.
              </li>
              <li>
                <strong>Periodic inspection</strong> — the EICR test sequence, frequency
                guidance for different premises types, and the C1 / C2 / C3 / FI condition coding
                framework.
              </li>
              <li>
                <strong>Worked examples</strong> — fully filled-out EIC, EICR and Minor Works
                forms with realistic test values, so you can see what 'good' looks like on paper.
              </li>
              <li>
                <strong>Test instrument requirements</strong> — accuracy classes, calibration
                expectations, MFT functions and how to use them.
              </li>
            </ul>
            <p>
              GN3 is published by the IET. It's authoritative because the same body publishes BS
              7671. But it doesn't override BS 7671 — where the two appear to conflict, BS 7671 is
              the standard; GN3 is the practical interpretation.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The On-Site Guide (OSG) — installer's pocket reference"
            plainEnglish="The OSG is BS 7671 distilled into the bits a typical install electrician uses every day. Cable sizing tables for the common cases. Diversity factors. Ratings of accessories. Standard install methods for sub-100 A single-phase work."
            onSite="If the install is a domestic CU change, a kitchen rewire, a small commercial fit-out — the OSG covers it. If you're outside that envelope (industrial three-phase, sub-mains, complex special locations) you go back to BS 7671. The OSG is faster on site; BS 7671 is the authority."
          >
            <p>
              Why two documents from the same publisher? Because BS 7671 is too dense to flip
              through on a job. The OSG picks out the common-case tables, gives them in a smaller
              format, and adds practical notes the spec-style BS 7671 wording doesn't include.
              For 80% of domestic work the OSG is enough; for the other 20%, you reach for
              BS 7671.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The other IET Guidance Notes — GN1 to GN9"
            onSite="You don't need every GN on day one. Most working electricians have GN3 (testing) and the OSG by default. GN8 (earthing and bonding) gets pulled out when you're sizing main bonding conductors or arguing about main earthing arrangements. GN7 (special locations) for any bathroom or pool job. The rest sit on the shelf for reference."
          >
            <p>
              The full set:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>GN1</strong> — Selection and Erection (BS 7671 Part 5 companion).</li>
              <li><strong>GN2</strong> — Isolation and Switching.</li>
              <li><strong>GN3</strong> — Inspection and Testing (Part 6 companion).</li>
              <li><strong>GN4</strong> — Protection against Fire.</li>
              <li><strong>GN5</strong> — Protection against Electric Shock.</li>
              <li><strong>GN6</strong> — Protection against Overcurrent.</li>
              <li><strong>GN7</strong> — Special Locations (Part 7 companion).</li>
              <li><strong>GN8</strong> — Earthing and Bonding.</li>
              <li><strong>GN9</strong> — Cabling.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>JIB and the trade infrastructure</ContentEyebrow>

          <ConceptBlock
            title="JIB — pay, conditions and grading"
            plainEnglish="The Joint Industry Board for the Electrical Contracting Industry sets the national agreement for pay, conditions, grading and H&S in England, Wales and Northern Ireland. (Scotland has SJIB.) Your JIB card carries your grade and is the proof of your status on a JIB-affiliated job."
            onSite="Most large commercial and industrial sites are JIB-only. Without a current JIB card at the right grade you don't get on site. The grading also determines what you're paid and what you're allowed to sign for unsupervised."
          >
            <p>
              The JIB grading hierarchy you'll progress through:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Adult Trainee / Labourer</strong> — entry route for those without
                qualifications.
              </li>
              <li>
                <strong>Apprentice</strong> — graded by year of apprenticeship, with the JIB card
                tracking your progress through the standard (you're here).
              </li>
              <li>
                <strong>Electrician</strong> — fully qualified (Level 3 + AM2/E + 18th Ed) and
                completed apprenticeship.
              </li>
              <li>
                <strong>Approved Electrician</strong> — Electrician + additional experience and
                competence demonstration.
              </li>
              <li>
                <strong>Technician</strong> — top working grade, additional design and
                fault-finding competence.
              </li>
            </ul>
            <p>
              Beyond grading, the JIB H&amp;S Handbook is the practical site-safety reference for
              JIB jobs and is referenced by main contractors as the H&amp;S baseline they expect
              everyone on site to be working to.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Competent person schemes</ContentEyebrow>

          <ConceptBlock
            title="NICEIC, NAPIT, ELECSA — the Part P self-certification route"
            plainEnglish="A Competent Person Scheme is a Government-approved body that assesses electrical contractors and lets them self-certify their Part P notifiable work in dwellings, instead of having to go through Local Authority Building Control on every job. NICEIC and ELECSA are run by Certsure. NAPIT is separate."
            onSite="No CPS = no self-cert = LABC notification on every job (slow, expensive, customer-facing pain). That's why effectively every contractor doing domestic work is on a scheme. The badge on the van is a marketing tool too — customers actively look for it."
          >
            <p>
              How a CPS works:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Enrolment</strong> — apply, pay the fee, evidence qualifications, equipment
                (calibrated MFT, etc), insurance, premises, signed scheme rules.
              </li>
              <li>
                <strong>Assessment</strong> — annual visit by the scheme assessor. They watch you
                work, check certs, check calibration, check H&amp;S paperwork, audit a sample of
                completed jobs.
              </li>
              <li>
                <strong>Self-certification</strong> — for every notifiable job you do, you upload
                the cert to the scheme portal; the scheme notifies LABC on your behalf within 30
                days; the homeowner gets a Building Reg compliance certificate by post.
              </li>
              <li>
                <strong>Non-conformance</strong> — assessor finds an issue, you get a
                non-conformance notice with a deadline to remediate. Persistent or serious issues
                escalate to suspension or removal.
              </li>
            </ul>
            <p>
              The catch: scheme membership is voluntary, but the consequences of losing it are
              brutal. No Part P self-cert. Public liability insurance often pulled (insurers
              require scheme membership for cover). Marketing badges withdrawn. Customer trust
              gone. The non-statutory framework's enforcement is commercial, not criminal — but it
              ends the trading firm just as effectively as a fine would.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>BS EN product standards</ContentEyebrow>

          <ConceptBlock
            title="The standards behind the markings on every device"
            plainEnglish="When you read a circuit breaker that says 'BS EN 60898-1, B32, 6 kA' — those references are non-statutory product standards. They define what the device must meet. BS 7671 references them so that selecting a device to the right BS EN means you don't have to re-prove its electrical performance."
            onSite="The headline ones to recognise on day one — BS EN 60898 (MCBs for domestic), BS EN 60947 (industrial switchgear / contactors), BS EN 61008 (standalone RCDs), BS EN 61009 (RCBOs), BS EN 62606 (AFDDs), BS EN 60439 / 61439 (assemblies, the panel itself)."
          >
            <p>
              The chain of authority:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                BS 7671 says 'use a device to BS EN 60898 with the right characteristic and
                breaking capacity for the circuit'.
              </li>
              <li>
                BS EN 60898 says 'an MCB sold under this standard must withstand X short-circuit
                current, trip within Y time at Z multiple of rated current, etc'.
              </li>
              <li>
                The manufacturer designs to BS EN 60898 and marks the device accordingly.
              </li>
              <li>
                You select the device based on its BS EN markings and the BS 7671 requirements for
                the circuit.
              </li>
            </ul>
            <p>
              That four-step chain — install standard → product standard → manufacturer compliance
              → installer selection — is how the non-statutory regs actually work in practice. No
              statute in sight. No criminal sanction. But every link in the chain is mandatory if
              you want the deemed-to-comply route under EAWR Reg 4.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Quoting a withdrawn BS 7671 amendment because that's the book on your shelf"
            whatHappens={
              <>
                Apprentice cites Reg 411.3.3 from the 17th Edition Amendment 3 because it's the
                only IET book the firm ever bought. The actual cert he's filling out is dated
                2026 — A4:2026 is in force, the regs have moved on, and the inspector picks up
                that the test schedule's missing the new columns introduced by A4. Cert is invalid.
                Job has to be re-tested at the firm's cost.
              </>
            }
            doInstead={
              <>
                Use the current edition. Always. Check the amendment date on the cover. If you're
                signing anything in 2026 onwards, you're working to BS 7671:2018+A4:2026 — that's
                what the cert needs to reference and that's the standard the inspector will assess
                against. The firm should renew the IET subscription so everyone has the live
                edition.
              </>
            }
          />

          <CommonMistake
            title="Treating manufacturer's instructions as 'optional advice'"
            whatHappens={
              <>
                Electrician fits a smart RCBO without reading the manufacturer's commissioning
                literature. The device requires a specific busbar arrangement and a torque setting
                spec'd at 1.4 Nm. Electrician uses the same busbar as the older non-smart RCBOs and
                pinches the terminals up to 'firm by hand'. Six months later, one of the terminals
                arcs because the connection wasn't tight to spec. Customer has a fire. Insurance
                claim. Investigator finds the torque was never set to spec. The defence — 'BS 7671
                doesn't say 1.4 Nm specifically' — fails because Reg 134.1.1 and Reg 510.3 both
                require the install to take account of manufacturer's instructions.
              </>
            }
            doInstead={
              <>
                Read the manufacturer's literature. Every time. Use a torque screwdriver. Note the
                torque settings on your install paperwork (some certs now have a tick-box for it).
                Manufacturer's instructions are part of the BS 7671 obligation, which is part of
                the EAWR obligation. The chain runs all the way back to criminal sanction if it
                breaks.
              </>
            }
          />

          <Scenario
            title="Insurance void after a fire because no EICR in the last decade"
            situation={
              <>
                Customer's house burns down. Origin is electrical — a failed accessory in a 30-year
                old kitchen. House insurance claim filed for £180,000. Insurer asks for evidence
                that the electrical installation was maintained. There's no EICR on file from the
                last ten years. Insurer rejects the claim, citing the policy clause requiring
                'maintenance to a reasonable standard'. Customer is now hunting for the firm that
                last did electrical work — your firm, who fitted a new shower circuit four years
                ago — and asking why you didn't recommend an EICR.
              </>
            }
            whatToDo={
              <>
                Get your records out fast. The EIC you issued for the shower circuit (assuming you
                did issue one — you should have) doesn't certify the rest of the installation, but
                the cert text usually carries a recommendation that the customer arranges a full
                EICR within a stated period. If you recommended it in writing and they didn't
                action it, the obligation moves to them. If you didn't recommend it, you've got a
                weaker position. This is why the model EIC and EICR forms include the
                recommendation panel — non-statutory documents protecting you from non-statutory
                claims.
              </>
            }
            whyItMatters={
              <>
                The non-statutory framework (BS 7671 model forms, GN3 recommended frequencies, CPS
                cert routes) IS the documentary trail that decides civil cases like this one. No
                criminal court is involved. No HSE prosecution. But the financial damage runs into
                six figures and the firm's reputation is on the line. Treat the paperwork as
                seriously as you treat the install.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Non-statutory means 'not Parliament-made', NOT 'optional'. BS 7671, GN3, OSG, JIB rules and scheme rules all carry real consequences when ignored — civil, commercial and (via the deemed-to-comply route) statutory.",
              "BS 7671:2018+A4:2026 is the IET Wiring Regulations — the technical standard for UK electrical installations. Always work to the current amendment.",
              "GN3 is the practical companion to BS 7671 Part 6 (Inspection and Testing). The OSG is the install-side quick-reference for standard domestic and small commercial work. Where they conflict, BS 7671 wins.",
              "The JIB sets pay, conditions and grading on JIB-affiliated jobs (most large commercial/industrial sites). The card carries your grade and is your route on site.",
              "NICEIC, NAPIT and ELECSA are competent person schemes — voluntary but commercially essential. Lose your scheme and you lose Part P self-cert, your insurer's cover and your ability to trade.",
              "BS EN product standards (60898 MCBs, 60947 contactors, 61008/61009 RCDs/RCBOs, 62606 AFDDs) define what each device must meet. BS 7671 references them so selection is shorthand instead of full re-proof.",
              "The chain that ties it all together: HSR25 cites BS 7671 as a means of complying with EAWR. Follow BS 7671 = deemed compliant. Ignore it = your defence to a statutory prosecution under EAWR is in tatters before you even start.",
            ]}
          />

          <Quiz title="Non-statutory regs and guidance — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section1/1-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.1 Statutory regulations
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section1/1-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.3 HASAWA 1974 deep dive
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
