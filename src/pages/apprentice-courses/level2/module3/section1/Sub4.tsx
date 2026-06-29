/**
 * Module 3 · Section 1 · Subsection 4 — EAWR 1989 deep dive
 * Maps to City & Guilds 2365-02 / Unit 203 / LO1 / AC 1.1, 1.3
 *   AC 1.1 — "Identify statutory regulations"
 *   AC 1.3 — "State implications of statutory regulations"
 *
 * Frame: the trade-specific Act. Goes deeper than Sub1's overview by walking
 * Reg 4(1) to (4), Reg 13, Reg 14 (three-condition test) and Reg 16 in their
 * verbatim wording, with the install / spec implications. Cross-references
 * Module 1 §1 Sub2 (safety-isolation) but doesn't duplicate it.
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
  'EAWR 1989 deep dive — Reg 4, 13, 14, 16 (1.1, 1.3) | Level 2 Module 3.1.4 | Elec-Mate';
const DESCRIPTION =
  'The Electricity at Work Regulations 1989 unpacked — Reg 4(1)–(4) safe systems, Reg 13 dead working, Reg 14 live working three-condition test, Reg 16 competence. The four EAWR regs the HSE prosecutes electricians under most often.';

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'mod3-s1-sub4-reg14-three',
    question:
      "EAWR Reg 14 prohibits work on or near live conductors UNLESS three conditions are simultaneously met. Which of these is NOT one of the three conditions?",
    options: [
      "Suitable precautions (including, where appropriate, the provision of suitable protective equipment) are taken to prevent injury.",
      "It is reasonable in all the circumstances for the work to be carried out on or near the conductor while it is live.",
      "It is unreasonable in all the circumstances for the conductor to be dead.",
      "The customer has signed a written waiver accepting the risk on their own installation.",
    ],
    correctIndex: 3,
    explanation:
      "The three conditions in Reg 14 are: (a) unreasonable for it to be dead; AND (b) reasonable for the work to be done live; AND (c) suitable precautions taken. All three must be met simultaneously. A customer waiver is irrelevant — Reg 14 is a statutory duty, not a contractual one. Customers cannot consent away your statutory obligations and signing a waiver doesn't shift the criminal liability.",
  },
  {
    id: 'mod3-s1-sub4-reg13-isolation',
    question:
      "You've isolated a circuit at the consumer unit, locked the breaker off and proved it dead with a GS38-compliant voltage indicator. Halfway through the work the customer's child wanders past and asks whether they can flip the lock-off back. Under EAWR Reg 13, what does 'adequate precautions' actually require you to have done?",
    options: [
      "A single warning notice on the board, with the lock-off and voltage-proving treated as good practice but outside the regulation.",
      "Leaving the key in the lock-off for emergency re-energising, plus a verbal instruction to the household not to touch it.",
      "The full safe-isolation chain — lock-off, key removed, warning notice, prove before and after — kept in place throughout.",
      "Proving dead once at the start with a socket tester, then working on without locking the breaker off at all.",
    ],
    correctIndex: 2,
    explanation:
      "Reg 13 requires 'adequate precautions' — which the HSE interprets as the full safe-isolation procedure: lock-off, key removed, warning notice, voltage-proving before/after with a known live source, and communication with anyone who could interfere. A child interfering is a foreseeable risk on a domestic, so briefing the household to keep away from the board is part of the precaution chain, not an optional extra. The precautions must stay in place for the whole job, not just at the start.",
  },
  {
    id: 'mod3-s1-sub4-reg16-competence',
    question:
      "EAWR Reg 16 says no person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or injury, UNLESS they possess such knowledge or experience OR are under such degree of supervision as may be appropriate having regard to the nature of the work. As an apprentice, what does this mean for what you can be put on?",
    options: [
      "Only on work you can already do unsupervised — Reg 16 has no supervision provision, so nothing beyond your current independent competence until you qualify.",
      "On any technical work, because apprentices are exempt from Reg 16 — the competence duty falls entirely on your employer and supervisor, not on you personally.",
      "On work beyond your current competence, but only under appropriate supervision that scales with the task danger and your level of experience, never on dangerous work unsupervised.",
      "On any work once you pass the 18th Edition exam — Reg 16 treats that qualification as proof of competence and supervision is no longer relevant.",
    ],
    correctIndex: 2,
    explanation:
      "Reg 16 is the legal definition of 'competence' for electrical work in Great Britain. It explicitly recognises supervision as a way of meeting the duty when the operative isn't yet competent on their own. The degree of supervision scales with the danger of the task and the trainee's experience — a first-year on a CU change is heavy, hands-on supervision; a third-year on socket extensions is lighter. The supervisor is part of your Reg 16 compliance and is personally on the hook under their own Reg 16 if the supervision is inadequate. As you progress the regime relaxes, but never disappears until you're signed off as competent in your own right.",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "EAWR Reg 4(1) requires that 'all systems shall at all times be of such construction as to prevent, so far as is reasonably practicable, danger'. What does 'system' mean in EAWR terms?",
    options: [
      "Only the individual circuit you are working on — each final circuit is a separate 'system' under EAWR, so your Reg 4(1) duty stops at the circuit boundary and the rest of the installation is someone else's responsibility.",
      "Reg 2 defines a system as all electrical equipment connected to a common source of energy — so everything from the cut-out to the final accessory is one system, and Reg 4(1) applies to all of it.",
      "Only the fixed wiring, not the equipment connected to it — a 'system' means the cables and accessories alone, so appliances and portable equipment plugged into the installation fall outside Reg 4(1).",
      "Only the parts of the installation rated above 230 V — EAWR defines a 'system' as the higher-voltage distribution, so ordinary single-phase final circuits are excluded from the Reg 4(1) construction duty.",
    ],
    correctAnswer: 1,
    explanation:
      "EAWR's definition of 'system' is broad on purpose. It covers the whole interconnected installation. So when you do an addition or alteration on one circuit, your Reg 4(1) duty extends to the wider system you've connected to — which is why an addition to a CU on which the incoming earthing is dubious is your problem, not just the customer's pre-existing problem.",
  },
  {
    id: 2,
    question:
      "EAWR Reg 4(2) requires that 'as may be necessary to prevent danger, all systems shall be maintained so as to prevent, so far as is reasonably practicable, such danger'. Whose duty is that and how does it apply to an EICR?",
    options: [
      "It binds the electrician who carried out the original installation for the life of the system — once you install a circuit, the Reg 4(2) maintenance duty stays with you personally, which is why an EICR must always be done by the original installer.",
      "It binds the DNO up to the consumer's cut-out and the manufacturer beyond it — the maintenance duty follows the equipment supplier, so the EICR is really the manufacturer's responsibility to arrange for any installation containing their product.",
      "It binds whoever is the duty-holder controlling the premises (employer, landlord). They discharge it by arranging a periodic EICR, acting on its condition codes and keeping records.",
      "It binds the occupier of the premises personally regardless of whether they own the installation — so a tenant in a rented flat, not the landlord, carries the Reg 4(2) duty to arrange and pay for the EICR on the property they live in.",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 4(2) is the maintenance duty. In a workplace that lands on the employer/dutyholder; in a domestic let it lands on the landlord (and is reinforced by the Electrical Safety Standards in the Private Rented Sector Regulations 2020 which mandate a 5-yearly EICR). The EICR is the document that proves the duty was discharged. The condition codes feed straight back into the Reg 4(2) decision-making.",
  },
  {
    id: 3,
    question:
      "EAWR Reg 4(3) — 'every work activity, including operation, use and maintenance of a system and work near a system, shall be carried out in such manner as not to give rise to danger, so far as is reasonably practicable'. Why is this the everyday workhorse regulation for electricians?",
    options: [
      "Because it sets out the exact disconnection times every circuit must achieve — it is the regulation the HSE checks first because it gives the numerical limits that prove a circuit is safe.",
      "Because it is the only EAWR regulation that applies to domestic work — the others apply only to commercial and industrial installations, so for a domestic electrician Reg 4(3) is effectively the whole of EAWR.",
      "Because it lists the specific PPE an electrician must wear for every task — it is the everyday regulation because it dictates the gloves, mats and visors required for each activity.",
      "Because it covers the whole work activity — operation, use, maintenance and work NEAR a system — making it the legal hook for safe isolation and the reg the HSE charges most after an incident.",
    ],
    correctAnswer: 3,
    explanation:
      "Reg 4(3) is the everyday-work regulation. It captures the actual physical activity, the operation of switchgear, ongoing use, scheduled maintenance, and proximity work. That makes it the legal hook for the entire safe-isolation procedure (covered in Module 1) and for the way you organise a job around live equipment you're not directly working on (e.g. partial board isolation in commercial fit-outs).",
  },
  {
    id: 4,
    question:
      "EAWR Reg 4(4) requires that 'any equipment provided under these Regulations for the purpose of protecting persons at work on or near electrical equipment shall be suitable for the use for which it is provided, be maintained in a condition suitable for that use, and be properly used'. What does this catch in practice?",
    options: [
      "Test instruments, insulated tools, electrical PPE, lock-off devices and warning labels — so your MFT must be in calibration, your indicator GS38-compliant and your lock-off kit must actually work.",
      "Only the fixed protective devices in the installation — the RCDs, MCBs and SPDs that protect the circuits — because Reg 4(4) is about the protection built into the system rather than the kit the electrician carries.",
      "Only the high-visibility clothing, hard hats and boots worn on site — Reg 4(4) is the general site-PPE regulation and does not extend to test instruments or insulated tools, which are covered by PUWER instead.",
      "Only the earthing and bonding conductors — Reg 4(4) refers to the equipment that protects persons by providing a path to earth, so it catches the protective conductors rather than the electrician's tools or instruments.",
    ],
    correctAnswer: 0,
    explanation:
      "Reg 4(4) is the protective-equipment regulation. The HSE's GS38 publication ('Electrical test equipment for use by electricians') is the practical guidance for what 'suitable' means for voltage indicators and test leads. An out-of-calibration MFT, a voltage indicator with damaged probe shrouds, or a lock-off that the wrong key fits — all are Reg 4(4) breaches. The scheme inspector will check this at every assessment.",
  },
  {
    id: 5,
    question:
      "Why does the HSE prosecute EAWR breaches in parallel with HASAWA breaches rather than just one or the other?",
    options: [
      "Because EAWR and HASAWA cover completely different incidents — EAWR applies to the electrical fault and HASAWA to any non-electrical injury, so the prosecution charges both only when there is a mix of electrical and non-electrical harm.",
      "Because EAWR is made under HASAWA (s.15) and HASAWA's general duties sit underneath the EAWR breach, so charging both gives the prosecution two routes to conviction.",
      "Because the HSE must always charge under HASAWA but the Local Authority must always charge under EAWR — charging both ensures that whichever enforcing body ends up with the case has a valid charge to bring.",
      "Because a conviction under EAWR is spent after five years while a HASAWA conviction is permanent — charging both guarantees a lasting record even if the EAWR conviction later drops off.",
    ],
    correctAnswer: 1,
    explanation:
      "Parallel charging is standard prosecution practice. EAWR Reg 4 + HASAWA s.2 covers the same incident from two angles — the specific electrical-system failure and the broader safe-system-of-work failure. The court can convict on one, both, or neither; the prosecution gives itself maximum flexibility by charging both. From the defence side this is why the HSR25 → BS 7671 deemed-to-comply route matters so much — it answers the technical EAWR charge, which then weakens the s.2 charge by extension.",
  },
  {
    id: 6,
    question:
      "Reg 14 makes live working an exceptional rather than a default activity. What documentation does meeting the Reg 14 three-condition test typically require BEFORE the work starts?",
    options: [
      "Nothing in advance — Reg 14 is satisfied by the operative making a judgement on the spot that the work can be done live, so the documentation is completed afterwards as a record of what was done.",
      "Only a signed customer authorisation accepting the risk — because the customer owns the installation, their written consent is the document that satisfies Reg 14 and no internal permit or risk assessment is needed.",
      "A live-working permit, a specific risk assessment, a method statement, evidence of competence for live work and often a second person — all documented and signed off before the work starts.",
      "Only a calibration certificate for the test instruments being used — Reg 14 is about ensuring the equipment is suitable for live measurement, so the in-date instrument records are the documentation it requires.",
    ],
    correctAnswer: 2,
    explanation:
      "Reg 14 is one of the most heavily-procedural regulations in EAWR. Live working without a permit / risk assessment / method statement / authorised person regime is treated as 'reckless' rather than 'negligent' in HSE prosecutions, which jumps the culpability band on the Sentencing Council guideline. For an apprentice the takeaway: you almost certainly aren't authorised for live working in your current grade, and asking 'why are we doing this live?' is a legitimate s.7 challenge.",
  },
  {
    id: 7,
    question:
      "EAWR Reg 16 recognises supervision as a route to compliance when the operative isn't independently competent. What makes the supervision 'appropriate' under the regulation?",
    options: [
      "The supervision is appropriate as long as a qualified electrician is somewhere on the same site and contactable by phone — physical presence isn't required, because Reg 16 is satisfied by the trainee being able to call for help if they need it.",
      "The supervision is appropriate when the supervisor signs the trainee's portfolio and certificates at the end of the job — Reg 16 is met by the paperwork sign-off rather than by oversight during the work itself.",
      "The supervision is appropriate whenever the supervisor holds the 18th Edition qualification, regardless of the task — the qualification alone makes any level of oversight sufficient under Reg 16 because it proves the supervisor is competent.",
      "The supervisor is competent for the task, can see the work and trainee, can intervene before danger, and the level of oversight matches both the task danger and the trainee's experience.",
    ],
    correctAnswer: 3,
    explanation:
      "The HSE's Memorandum of Guidance on EAWR (HSR25) discusses 'appropriate supervision' as scaling with both task danger and trainee experience. The supervisor's own Reg 16 competence is in scope — sending a Year 1 apprentice on live or near-live work under the 'supervision' of someone who isn't themselves competent for that specific work breaches Reg 16 against both individuals AND s.2 against the firm.",
  },
  {
    id: 8,
    question:
      "An electrician is prosecuted after an electrocution caused by an inadequately isolated supply on a customer's CU change. Which combination of EAWR regs is most likely to be in the indictment?",
    options: [
      "Reg 4(3) as the lead charge, plus Reg 13 for the isolation failure, Reg 14 if live work is in evidence, Reg 16 for any competence gap, and HASAWA s.7 and s.2 — a multi-charge indictment.",
      "Reg 8 (earthing) alone — because an electrocution always traces back to an earthing defect, the indictment is limited to the single earthing regulation and no other EAWR reg is charged.",
      "Reg 14 (live working) alone — any electrocution is treated in law as live working by definition, so the indictment is built solely on Reg 14 regardless of how the supply came to be live.",
      "Building Regulations Part P alone — because the incident happened on a domestic consumer-unit change, the charge is the unnotified-work offence rather than any EAWR regulation.",
    ],
    correctAnswer: 0,
    explanation:
      "Multi-charge indictments are standard practice in serious EAWR prosecutions. Reg 4(3) is almost always the lead. Reg 13 follows for any isolation failure. Reg 14 is added when live working is in evidence. Reg 16 catches the competence gap. HASAWA s.7 against the operative and s.2 against the firm complete the framework. The defence then has to answer EVERY charge — which is why the technical evidence base (BS 7671 compliance, GS38 instrument records, RAMS) matters so much.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: "If EAWR was made in 1989, why hasn't it been updated more recently?",
    answer:
      "Because the regulations are written at a high enough level to remain technology-agnostic. EAWR Reg 4 doesn't say 'use a 30 mA RCD' — it says 'all systems shall be of such construction as to prevent danger'. The detail of HOW to prevent danger is delegated to BS 7671 (which IS updated regularly). The split lets the statutory layer stay stable while the technical standard evolves with the trade.",
  },
  {
    question: "What's HSR25 and why does everyone keep mentioning it?",
    answer:
      "HSR25 is the HSE's 'Memorandum of Guidance on the Electricity at Work Regulations 1989'. It's the official guidance to EAWR — published by the HSE itself, explaining how each regulation is intended to be interpreted. It explicitly cites BS 7671 as a means of demonstrating compliance with EAWR Reg 4 for fixed installations. That citation is the legal bridge between the statutory regs and BS 7671. Every working electrician in the UK is operating inside that bridge whether they realise it or not.",
  },
  {
    question: "Does EAWR apply to me if I'm working on a customer's house — there's no employer?",
    answer:
      "Yes. EAWR binds 'every employer, every employee and every self-employed person'. As a self-employed electrician working on a domestic, you carry the full duty as if you were both employer and employee. The customer doesn't take on EAWR duties (they're not 'at work') but you don't get out of yours by virtue of the location.",
  },
  {
    question: "Reg 14 talks about 'work on or near' live conductors. How near is 'near'?",
    answer:
      "EAWR doesn't give a specific distance — it depends on voltage, environment, and the work being done. HSR25 and supporting HSE publications talk about a 'safety distance' that prevents accidental contact and prevents arcs. For LV work in a typical CU you're 'near' if your hand or tool can reach a live part. For HV the distances are much greater and are spelled out in industry codes of practice. The practical answer for an LV electrician: if you can see live copper or terminals from where you're working, you're 'near' for Reg 14 purposes.",
  },
  {
    question: "If I genuinely have to do something live (e.g. proving dead with a voltage indicator), how does Reg 14 apply?",
    answer:
      "Voltage proving is a recognised exception. Using a GS38-compliant voltage indicator on suspected-dead conductors IS work near live conductors, but it falls within the 'reasonable to do live' limb of Reg 14 because there's no other way to prove dead. The 'suitable precautions' limb is met by the GS38-compliant equipment itself plus your competence. Always start with a known live source to prove the indicator is working, then test the suspected-dead source, then re-prove on the live source. That sequence is the practical Reg 14 evidence base for routine voltage proving.",
  },
  {
    question: "How does EAWR interact with the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020?",
    answer:
      "The 2020 PRS regulations reinforce EAWR Reg 4(2) (maintenance duty) for landlords by mandating a satisfactory EICR every 5 years (or sooner, if the EICR specifies). The EICR itself must be carried out to BS 7671 Part 6 / IET GN3 by a competent person. So three layers stack: EAWR Reg 4(2) sets the underlying maintenance duty; the 2020 PRS regs operationalise it with a 5-yearly EICR mandate; BS 7671 + GN3 set the technical method. Same principle, three levels of legal hook.",
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
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 3 · Section 1 · Subsection 4"
            title="EAWR 1989 deep dive"
            description="The Electricity at Work Regulations 1989 — Reg 4(1)–(4) safe systems, Reg 13 precautions for work on equipment made dead, Reg 14 work on or near live conductors (the three-condition test), Reg 16 competence. Each one unpacked with the practical install-day implication."
            tone="emerald"
          />

          <TLDR
            points={[
              "EAWR is the trade-specific statutory instrument for electrical work in Great Britain. Made under HASAWA s.15. Binds every employer, employee and self-employed person.",
              "Reg 4(1)–(4) is the everyday workhorse — system construction, maintenance, work activity and protective equipment. Reg 13 covers dead working precautions; Reg 14 covers the live-working three-condition test; Reg 16 covers competence.",
              "Multi-charge indictments are normal for serious incidents — Reg 4(3) + Reg 13 + Reg 16 + HASAWA s.7 in parallel. The technical evidence base (BS 7671 compliance, GS38 instruments, RAMS) is the defence against all of them at once.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify EAWR 1989 as the trade-specific statutory regulations made under HASAWA's enabling powers and binding all parties to electrical work in Great Britain.",
              "State the practical implications of EAWR Reg 4(1) to (4) — system construction, maintenance, work activities and protective equipment.",
              "Apply Reg 13 — adequate precautions for work on equipment made dead — to a routine isolation procedure.",
              "Apply Reg 14 — the three-condition test for work on or near live conductors — and recognise when live working would be unlawful.",
              "Explain Reg 16 — competence and appropriate supervision — and how it applies to apprentice progression.",
              "Outline how EAWR is enforced by the HSE and Local Authority Environmental Health, the typical multi-charge indictment pattern, and the link to HSR25 and BS 7671.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this matters at deep-dive level</ContentEyebrow>

          <ConceptBlock
            title="If HASAWA is the parent, EAWR is the subject teacher"
            plainEnglish="HASAWA tells you 'work has to be safe'. EAWR tells you specifically how that applies to electrical work — what counts as a system, what counts as adequate precautions, what counts as competence. Sub 1 named EAWR. This Sub opens it and reads the regulations the HSE prosecutes most often."
            onSite="Pull up SI 1989/635 on legislation.gov.uk and read Reg 4 and Reg 13 yourself. They're shorter than you think and they read in plain English. The HSE's HSR25 publication is the official commentary. Together they're the entire legal framework you operate inside every day — knowing them at first-hand removes the mystery."
          >
            <p>
              EAWR has 33 regulations in total but only a handful drive the everyday work of an
              installation electrician. Your priority list:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 4(1)</strong> — system construction (safe-by-design).
              </li>
              <li>
                <strong>Reg 4(2)</strong> — system maintenance (the EICR hook).
              </li>
              <li>
                <strong>Reg 4(3)</strong> — work activity (the safe-isolation hook).
              </li>
              <li>
                <strong>Reg 4(4)</strong> — protective equipment (the GS38 hook).
              </li>
              <li>
                <strong>Reg 13</strong> — precautions for work on equipment made dead.
              </li>
              <li>
                <strong>Reg 14</strong> — work on or near live conductors (three-condition test).
              </li>
              <li>
                <strong>Reg 16</strong> — competence to prevent danger and injury.
              </li>
            </ul>
            <p>
              The remaining EAWR regs (5 strength and capability, 6 adverse environments, 7
              insulation, 8 earthing, 9 conductor integrity, 10 connections, 11 means of
              protection from excess current, 12 isolation, 15 working space and lighting) read
              like chapter headings in BS 7671 — that&apos;s deliberate. BS 7671 is the technical
              standard built to demonstrate compliance with each of those EAWR regs.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Reg 4 — the workhorse</ContentEyebrow>

          <ConceptBlock
            title="Four sub-regulations covering the whole lifecycle"
            plainEnglish="Reg 4 is split into four parts that together cover the entire lifecycle of an electrical installation — design and construction (4(1)), ongoing maintenance (4(2)), the actual work activity (4(3)), and the protective equipment used during the work (4(4)). One regulation, four hooks, every working electrician operates under at least three of them on every job."
          >
            <p>
              The verbatim wording (paraphrased to highlight structure):
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 4"
            clause={
              <>
                <p className="mb-2">
                  <strong>4(1)</strong> — &quot;All systems shall at all times be of such
                  construction as to prevent, so far as is reasonably practicable, danger.&quot;
                </p>
                <p className="mb-2">
                  <strong>4(2)</strong> — &quot;As may be necessary to prevent danger, all systems
                  shall be maintained so as to prevent, so far as is reasonably practicable, such
                  danger.&quot;
                </p>
                <p className="mb-2">
                  <strong>4(3)</strong> — &quot;Every work activity, including operation, use and
                  maintenance of a system and work near a system, shall be carried out in such
                  manner as not to give rise to danger, so far as is reasonably practicable.&quot;
                </p>
                <p>
                  <strong>4(4)</strong> — &quot;Any equipment provided under these Regulations for
                  the purpose of protecting persons at work on or near electrical equipment shall
                  be suitable for the use for which it is provided, be maintained in a condition
                  suitable for that use, and be properly used.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Four duties tracking the lifecycle. (1) The system as built has to be safe —
                that&apos;s the BS 7671 design / install hook. (2) The system in use has to stay
                safe — that&apos;s the EICR / maintenance hook. (3) The work activity itself has to
                be safe — that&apos;s the safe-isolation hook. (4) The kit you use to keep
                yourself safe during the work has to be fit for purpose — that&apos;s the GS38 /
                calibration / lock-off hook. All four are simultaneously in play on every job.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Regulation 4 — verbatim from legislation.gov.uk."
          />

          <ConceptBlock
            title="Reg 4(1) — the design / install duty"
            onSite="Reg 4(1) is what you discharge by following BS 7671. The link is HSR25 — the HSE's own guidance to EAWR — which explicitly cites BS 7671 as a way to demonstrate compliance with Reg 4 for fixed installations. So the technical evidence that you complied with Reg 4(1) IS your BS 7671 compliance — the EIC, the schedule of test results, the design calcs."
          >
            <p>
              The duty under Reg 4(1) attaches to the system as built. The duty-holder is whoever
              is responsible for the construction — the designer, the installer, the firm. After
              handover, the duty-holder for ongoing compliance with Reg 4(1) shifts to whoever
              controls the premises (because they&apos;re responsible for the system that exists
              there), but the original installer remains potentially liable for the ORIGINAL
              construction. So a CU change you did 8 years ago that turns out to have a wiring
              fault is still your Reg 4(1) issue.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 4(2) — the maintenance duty (and the EICR hook)"
            onSite="The EICR is the legal evidence the duty-holder is meeting Reg 4(2). The frequency comes from BS 7671 Section 622 / IET GN3 (5 years for domestic let, 10 years for owner-occupied, more frequent for commercial). The Electrical Safety Standards in the Private Rented Sector Regulations 2020 hardened the 5-yearly cycle for English landlords into a separate statutory mandate."
          >
            <p>
              Reg 4(2) is qualified by &apos;as may be necessary to prevent danger&apos; and
              &apos;so far as is reasonably practicable&apos; — so the maintenance regime has to
              be proportionate. The duty-holder discharges Reg 4(2) by:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Arranging periodic inspection (an EICR) at the recommended frequency for the
                premises type.
              </li>
              <li>
                Acting on the resulting condition codes — C1 immediate, C2 urgent, C3
                improvement-recommended, FI further investigation.
              </li>
              <li>
                Keeping the records (EICR + remedial works invoices + retest evidence) so the
                audit trail is in place if questioned later.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 4(3) — the work-activity duty (and the safe-isolation hook)"
            onSite="Reg 4(3) is what the HSE prosecutes after almost every electrocution or arc-flash incident on an installer's job. It's the regulation that ties the safe-isolation procedure to the law. Module 1 §1 Sub2 covers the procedure itself — this is the legal hook that makes following it mandatory."
          >
            <p>
              Reg 4(3) extends across the whole work activity, not just the install. It covers
              operation (turning the system on / off), use (running it), maintenance (servicing
              it), AND work NEAR a system (where you&apos;re not directly working on the live
              parts but they&apos;re close enough to be a risk). That breadth is why Reg 4(3) is
              the most-charged EAWR regulation — almost any electrical-incident scenario fits at
              least one limb.
            </p>
            <p>
              In practice the safe-isolation procedure (cross-referenced from Module 1) is the
              evidence that you met Reg 4(3) on the day. That includes the lock-off, the
              voltage-proving sequence (live source &rarr; suspected-dead source &rarr; live source
              again), the warning notice, the communication with anyone else on site, and the
              documented hand-back at the end.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 4(4) — protective equipment (and the GS38 hook)"
            onSite="The MFT in calibration. The voltage indicator with intact probe shrouds. The lock-off kit that actually fits the breakers on this brand of CU. The insulated tools that are visibly undamaged. All four are Reg 4(4) compliance. HSE GS38 ('Electrical test equipment for use by electricians') is the practical guidance for what 'suitable' means for voltage indicators and test leads."
          >
            <p>
              Reg 4(4) has three limbs — equipment must be suitable for the use, maintained in a
              suitable condition, AND properly used. All three apply at the same time. So an
              in-calibration MFT used outside its measurement range still breaches Reg 4(4)
              under the &apos;properly used&apos; limb. The CPS scheme assessor will check
              calibration certs at every visit precisely because Reg 4(4) is so easy to
              evidence — or to fail to evidence.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Reg 13 — precautions for work on equipment made dead</ContentEyebrow>

          <ConceptBlock
            title="The statutory hook for the safe-isolation procedure"
            plainEnglish="Reg 13 says: where work is to be done on equipment that has been made dead, adequate precautions shall be taken to prevent the equipment becoming electrically charged again whilst the work is in progress, IF danger may otherwise arise. That's the legal foundation of every lock-off, key-removed, warning-notice procedure you'll ever follow."
          >
            <p>
              Verbatim:
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 13"
            clause={
              <>
                &quot;Adequate precautions shall be taken to prevent electrical equipment, which
                has been made dead in order to prevent danger while work is carried out on or near
                that equipment, from becoming electrically charged during that work if danger may
                thereby arise.&quot;
              </>
            }
            meaning={
              <>
                One sentence carrying the entire safe-isolation procedure. &apos;Adequate
                precautions&apos; is what BS 7671, IET Guidance Note 2 (Isolation and Switching),
                the JIB safe-isolation procedure and your firm&apos;s RAMS all describe in
                detail. Lock-off kit, key in pocket, warning notice, voltage proving on a known
                live source before AND after, communication with anyone on site who could
                interfere — those collectively are what &apos;adequate&apos; looks like in 2026
                practice.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Regulation 13 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reg 14 — work on or near live conductors</ContentEyebrow>

          <ConceptBlock
            title="The three-condition test that makes live working exceptional"
            plainEnglish="Reg 14 prohibits work on or near live conductors UNLESS three conditions are simultaneously met: (a) it is unreasonable for the conductor to be dead; AND (b) it is reasonable for the work to be done live; AND (c) suitable precautions are taken to prevent injury. Miss any one and the work is unlawful."
            onSite="Most apprentice work falls cleanly the wrong side of the test — there's no reason it can't be dead, so condition (a) fails, so the whole regulation prohibits it. Live working in modern UK electrical installation is exceptional, requires permit-to-work documentation, requires demonstrably-competent operatives specifically authorised for live working, and is rarely something the apprentice would be involved in directly."
          >
            <p>
              Verbatim:
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 14"
            clause={
              <>
                &quot;No person shall be engaged in any work activity on or so near any live
                conductor (other than one suitably covered with insulating material so as to
                prevent danger) that danger may arise unless — (a) it is unreasonable in all the
                circumstances for it to be dead; and (b) it is reasonable in all the circumstances
                for him to be at work on or near it while it is live; and (c) suitable precautions
                (including where necessary the provision of suitable protective equipment) are
                taken to prevent injury.&quot;
              </>
            }
            meaning={
              <>
                Three conditions, all required, all simultaneously. (a) is the
                &apos;unreasonable to be dead&apos; test — almost never true for a domestic
                install or fit-out. (b) is the &apos;reasonable to do live&apos; test — requires
                positive justification, documented before the work. (c) is the
                &apos;suitable precautions&apos; test — insulated tools, mats, gloves to the
                appropriate standard, second authorised person where required, permit-to-work.
                Apprentices in their early years are almost never authorised under (b) and almost
                never have the competence under (c) — so live working will be rare exposure for
                you and you should question any instruction to do it.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Regulation 14 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reg 16 — competence</ContentEyebrow>

          <ConceptBlock
            title="The legal definition of 'competent' for electrical work"
            plainEnglish="Reg 16 is the regulation that says: nobody shall be engaged in work where technical knowledge or experience is necessary to prevent danger, unless they have that knowledge / experience OR are under appropriate supervision. It's the legal hook for your apprentice card, your scheme membership, your supervisor's sign-off — the entire competence framework."
          >
            <p>
              Verbatim:
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 16"
            clause={
              <>
                &quot;No person shall be engaged in any work activity where technical knowledge or
                experience is necessary to prevent danger or, where appropriate, injury, unless he
                possesses such knowledge or experience, or is under such degree of supervision as
                may be appropriate having regard to the nature of the work.&quot;
              </>
            }
            meaning={
              <>
                Two routes to compliance: have the competence yourself, OR be under
                &apos;appropriate&apos; supervision. The supervision route is the apprentice
                route. &apos;Appropriate&apos; scales with task danger AND trainee experience —
                so a first-year on a CU change is direct hands-on supervision, a third-year on
                socket extensions is lighter supervision, and a fully-qualified electrician on
                routine work needs no supervision at all. The supervisor&apos;s own competence is
                in scope under their own Reg 16 — token oversight from someone who isn&apos;t
                themselves competent for the specific work doesn&apos;t meet the regulation.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Regulation 16 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Enforcement reality</ContentEyebrow>

          <ConceptBlock
            title="Why EAWR and HASAWA almost always run together in an indictment"
            onSite="An electrical incident prosecution rarely lands as a single charge. The HSE charges the most specific regulation (an EAWR reg) AND the broader umbrella duty (a HASAWA section) at the same time. It gives the prosecution two routes to conviction and lets the court assess culpability across both layers."
          >
            <p>
              The pattern for a typical serious electrical incident:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EAWR Reg 4(3)</strong> — failure to carry out the work activity safely.
                Usually the lead charge.
              </li>
              <li>
                <strong>EAWR Reg 13</strong> — failure to take adequate precautions for dead
                working (added if isolation failed).
              </li>
              <li>
                <strong>EAWR Reg 14</strong> — unauthorised live working (added if any live work
                was involved without the three conditions met).
              </li>
              <li>
                <strong>EAWR Reg 16</strong> — competence failure (added if the operative was
                inadequately competent or supervised).
              </li>
              <li>
                <strong>HASAWA s.2 / s.3</strong> — broader employer duties to employees / the
                public (charged against the firm).
              </li>
              <li>
                <strong>HASAWA s.7</strong> — personal duty (charged against the individual
                operative).
              </li>
              <li>
                <strong>HASAWA s.37</strong> — director / officer liability (charged against
                named directors where neglect is in evidence).
              </li>
            </ul>
            <p>
              The defence has to answer every single charge. The technical evidence base — BS
              7671 compliance, GS38 instrument records, RAMS, supervisor sign-off, EIC / EICR
              paperwork — is what answers them all simultaneously. That&apos;s why scheme
              membership, calibrated kit and proper paperwork aren&apos;t bureaucracy. They&apos;re
              the multi-charge defence file you build BEFORE you need it.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Skipping voltage proving on the basis 'I just isolated it, it must be dead'"
            whatHappens={
              <>
                Electrician opens a CU, switches off what they think is the right MCB, removes
                the lock-off from the previous job (still in the kit), starts work without
                voltage proving. Turns out they switched the MCB next to the right one. The
                circuit they&apos;re working on is live. Shock. After the incident the HSE
                charges Reg 4(3) (failure of safe work activity), Reg 13 (failure of dead-working
                precautions) AND Reg 16 (competence — the operative didn&apos;t carry out the
                step that any competent electrician knows is mandatory).
              </>
            }
            doInstead={
              <>
                Voltage proving on every isolation, every time, no exceptions. Live source &rarr;
                suspected-dead source &rarr; live source again. GS38-compliant indicator. The
                whole sequence takes about 30 seconds. It is the single most-prosecuted procedure
                gap in UK electrical incidents and there is no shortcut.
              </>
            }
          />

          <CommonMistake
            title="Quietly accepting a 'we'll do it live, it's only 5 minutes' instruction"
            whatHappens={
              <>
                Customer is in a rush, supervisor wants the job finished. Instruction: just swap
                the accessory live, it&apos;s only 5 minutes. The apprentice does as told. Either
                nothing goes wrong (and a dangerous habit forms) or something goes wrong and the
                whole crew is exposed under EAWR Reg 14 — including the apprentice under their
                own Reg 14 / Reg 16 / HASAWA s.7. The defence &apos;I was told to&apos; doesn&apos;t
                discharge the personal duty.
              </>
            }
            doInstead={
              <>
                Push back. Reg 14&apos;s three-condition test almost never applies on routine
                accessory work. Ask: is there a permit? Is there a documented justification under
                conditions (a) and (b)? Are the precautions under (c) in place? If the answer to
                any of those is no, the work isn&apos;t lawful and you&apos;re entitled — and
                obliged under HASAWA s.7 — to refuse. Raising it discharges your personal duty
                even if the supervisor overrides you.
              </>
            }
          />

          <Scenario
            title="A near-miss because the customer's child reset a lock-off"
            situation={
              <>
                You&apos;re on a CU upgrade in a domestic. Lock-off in place on the main switch,
                key in your pocket, warning notice on the board. Customer&apos;s 9-year-old wanders
                past while you&apos;re in the loft pulling cable, sees the bright orange lock-off,
                tries to open it. Can&apos;t — but tells the parent &apos;the man left it locked
                up, can we open it?&apos;. Parent assumes you&apos;re finished (you&apos;ve been
                up there 10 minutes), goes to find the original key for the consumer-unit casing,
                considers swapping the lock. You come down, see them about to do it, intervene.
              </>
            }
            whatToDo={
              <>
                Stop, secure the situation, complete the work as planned, document the near-miss
                in writing for your firm&apos;s incident log. Note that the lock-off itself
                worked &mdash; the precaution chain held. But the foreseeable risk (curious
                household member trying to defeat the isolation) was real and you should brief
                the customer at the start of the next job: explain what the lock-off is, ask them
                to keep household members away from the board area, and make sure the warning
                notice is visible. That conversation is part of Reg 13 &apos;adequate
                precautions&apos; on a domestic.
              </>
            }
            whyItMatters={
              <>
                Reg 13&apos;s &apos;adequate precautions&apos; isn&apos;t just the physical
                lock-off. It includes the foreseeable interference risk and what you do to
                control it &mdash; including the customer briefing. The HSE&apos;s prosecution
                playbook on domestic incidents has expanded over the last decade specifically
                because customer-side interference is now a recognised foreseeable hazard
                category, not an unforeseeable freak event.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "EAWR 1989 is the trade-specific statutory instrument for electrical work in Great Britain. Made under HASAWA s.15. SI 1989/635.",
              "Reg 4 has four sub-regs covering the lifecycle — 4(1) construction, 4(2) maintenance, 4(3) work activity, 4(4) protective equipment. All four can be in play on a single job.",
              "Reg 4(1) is discharged by following BS 7671 (via the HSR25 deemed-to-comply route). Reg 4(2) is discharged by the EICR regime. Reg 4(3) is discharged by the safe-isolation procedure. Reg 4(4) is discharged by GS38-compliant test kit kept in calibration.",
              "Reg 13 — adequate precautions for work on equipment made dead. The legal hook for lock-off + key + warning notice + voltage proving + customer briefing.",
              "Reg 14 — work on or near live conductors. Three-condition test: unreasonable to be dead AND reasonable to do live AND suitable precautions. Apprentice work almost never meets the test for live working.",
              "Reg 16 — competence. Two routes: independent competence OR appropriate supervision. The supervisor's own competence is in scope. Apprentice progression is staged supervision-relaxation under Reg 16.",
              "Multi-charge indictments are normal — Reg 4(3) + Reg 13 + Reg 16 + HASAWA s.7 + s.2 in parallel. The defence is the same evidence base for every charge: BS 7671 compliance, GS38 records, RAMS, supervisor sign-off.",
              "HSR25 — the HSE's Memorandum of Guidance on EAWR — is the official commentary and the bridge to BS 7671 as a deemed-to-comply route.",
            ]}
          />

          <Quiz title="EAWR 1989 deep dive — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section1/1-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.3 HASAWA 1974 deep dive
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section1/1-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.5 BS 7671 deep dive
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
