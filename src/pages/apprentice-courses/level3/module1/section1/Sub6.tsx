/**
 * Module 1 · Section 1 · Subsection 6 — HSE, regulators, FFI and the enforcement system
 * Maps to City & Guilds 2365-03 / Unit 201 / LO1 / AC 1.1
 *   AC 1.1 — "identify roles and responsibilities with regard to current relevant
 *            Health and Safety legislation"
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 1.1 + 1.2 — own/others responsibilities + risks
 *
 * Improvement notices, prohibition notices, FFI fees and the HSE Sentencing
 * Council Definitive Guideline. Where your firm sits in the enforcement system
 * is L3-essential knowledge — not just a list of acronyms.
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
  'HSE, FFI and the enforcement system (1.1) | Level 3 Module 1.1.6 | Elec-Mate';
const DESCRIPTION =
  'L3 refresher on UK H&S enforcement — HSE inspectors, improvement and prohibition notices, Fee for Intervention, the Sentencing Council guideline, and prosecutions through the courts.';

const checks = [
  {
    id: 'l3-m1-s1-sub6-notice',
    question:
      "An HSE inspector visits a site and serves an improvement notice with a 28-day deadline. What does that actually mean?",
    options: [
      "Separating the person from their past behaviour and responding to their current human experience with genuine compassion. Advanced empathy recognises that difficult people are often struggling, that past conflict does not negate present humanity, and that showing empathy in this moment may transform the entire working relationship — whilst still maintaining appropriate professional boundaries",
      "The Work at Height Regulations 2005 (WAHR) — applies to any work where a person could fall a distance liable to cause personal injury. Reg 6 sets out the three-tier hierarchy (avoid > prevent > minimise). Reg 7 requires selection of the right equipment for the task. Reg 12 requires inspection of the equipment. PUWER 1998 sits underneath for the equipment itself, and LOLER 1998 covers MEWPs and other lifting kit.",
      "A statutory notice under HASAWA s.21. The dutyholder must comply within the time specified (usually 21+ days). Right of appeal to an Employment Tribunal within 21 days. Failure to comply is a separate offence carrying unlimited fines and (on indictment) up to 2 years imprisonment for the responsible person. The notice is published on the HSE Public Register of Convictions and Notices — visible to clients, insurers and competitors.",
      "Under CDM 2015 Reg 6 a project is notifiable when the construction work is scheduled to last longer than 30 working days AND have more than 20 workers working simultaneously at any point, OR exceed 500 person-days. The Client must notify the HSE in writing as soon as practicable before construction starts using F10 notification.",
    ],
    correctIndex: 2,
    explanation:
      "Improvement notices are statutory. HSE Public Register makes them visible — clients tendering for work routinely check the register. Reputational damage often outstrips the legal cost. Compliance within the deadline closes the matter; non-compliance escalates fast.",
  },
  {
    id: 'l3-m1-s1-sub6-ffi',
    question:
      "What's 'Fee for Intervention' (FFI) and when does it apply?",
    options: [
      "Acknowledge the request verbally, then send a short written variation by email or in your job-management app before the end of the day. Quote the additional cost, get the customer's written confirmation back before you arrive on site, and only then carry out the extra work. The verbal yes is fine for tone; the written variation is what protects payment, scope and warranty.",
      "A statutory cost-recovery scheme (Health and Safety (Fees) Regulations) that allows the HSE to charge dutyholders for inspector time spent investigating 'material breaches' of H&S law. Charged at an hourly rate (currently around £170/hr — check HSE for the latest figure). Triggered when an inspector identifies a material breach and writes a letter, notice or report. The fee is for inspector time only, separate from any prosecution costs or fines.",
      "Reg 134.1.1 requires that 'good workmanship by competent persons and proper materials shall be used in the erection of the electrical installation'. This is the workmanship hook — how the install is physically put together has to meet trade-standard quality. Includes correct torque, correct conductor preparation, neat termination, secure containment, proper labelling. Workmanship is what distinguishes a competent install from one that just barely passes test.",
      "Decline. Most firms have a drug-and-alcohol policy that prohibits consumption during working hours, including any time you're still in uniform, on customer premises or driving the van. Even if the working day is officially over, you're still representing the firm and you may have to drive. The policy protects the customer (no impaired work), the firm (no insurance issues, no reputational damage) and you (no DR10 driving conviction).",
    ],
    correctIndex: 1,
    explanation:
      "FFI was introduced in 2012 as a cost-recovery mechanism. A 'material breach' is one that the inspector reasonably opines warrants written notification. FFI invoices regularly run into thousands for a single visit; for serious or systemic issues they hit five figures. Disputes go to a HSE-internal panel.",
  },
  {
    id: 'l3-m1-s1-sub6-prohibition',
    question:
      "How does a prohibition notice differ from an improvement notice?",
    options: [
      "Yes — reportable as an over-7-day incapacitation injury under RIDDOR 2013 Reg 4 / Reg 6. The 'responsible person' (usually the employer) makes the report. The clock is 10 working days from the day after the accident; the report goes to the HSE via the F2508 form on hse.gov.uk. The apprentice tells the supervisor; the firm's H&S contact files the report. Failure to report when required is itself a criminal offence under RIDDOR.",
      "A prohibition notice (HASAWA s.22) is served when the inspector judges that an activity involves OR will involve a risk of serious personal injury. It STOPS the activity immediately (or by a stated date) UNTIL the matters specified in the notice are remedied. There is no compliance period — the activity stops. Right of appeal exists but does NOT suspend the prohibition. Improvement notices give time to fix; prohibition notices stop the work.",
      "Safety documents (RAMS, COSHH, risk assessments, permits, fire muster, welfare info), design documents (drawings, specs, schedules, schematics, BIM, RFI logs), standards (BS 7671, IET OSG, manufacturer data), contract / commercial (programme, snag list, variations, delay notices) and HR (employment contract, JIB Working Rules, holiday and grievance procedures).",
      "Cold (R1 + R2) = 50 × (12.10 + 18.10) / 1000 = 1.51 Ω. Hot at 70 degrees C: 1.51 × 1.20 = 1.812 Ω. Design Zs = 0.80 + 1.812 = 2.61 Ω. Table 41.3 max for B16 in A4:2026 = 2.73 Ω. Just passes (margin only 0.12 Ω) — design is borderline and any route-length error during install will push it over. Reconsider cable size or route.",
    ],
    correctIndex: 1,
    explanation:
      "Prohibition notices are the 'stop' switch. The activity stops; no negotiation. Working in defiance of a prohibition notice is a serious offence. The notice is published on the HSE Public Register, which alerts every potential client to the issue. Compliance + sign-off by the inspector is required before resuming work.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's the HSE's primary statutory power?",
    options: [
      "Because the install is a long-lived asset that will outlast the original installer's involvement. Notices communicate critical information — main earth location, RCD test interval, mixed supplies, isolator function — to whoever interacts with the install in future, including the customer in an emergency, the next electrician on a fault visit, and the EICR engineer in five years' time. The labels are how the install talks to people when the original installer isn't there.",
      "Powers under HASAWA Part I — inspection and entry (s.20), improvement notices (s.21), prohibition notices (s.22), seizure and rendering harmless of articles or substances (s.25), prosecution (s.33). HSE inspectors can enter premises at any reasonable time, take photos, take samples, take statements, examine documents, require production of records, dismantle equipment.",
      "GS38 — 'Electrical test equipment for use by electricians'. It's HSE guidance, not statute, but the courts treat it as the reference for what 'safe' test probes, leads and instruments look like in practice. It specifies probe finger barriers, exposed metal length (no more than 4 mm), insulated leads, fused leads where appropriate, and the use of voltage indicators rather than meters where possible.",
      "Certify new installation work — that is the role of an Electrical Installation Certificate (EIC) per Reg 644.1, issued at the completion of new work or additions involving a new circuit. An EICR is for existing installations in service only and reports condition, not new compliance.",
    ],
    correctAnswer: 1,
    explanation:
      "HSE inspectors have wide statutory powers under HASAWA Part I. Knowing they exist is the L3 step — when an inspector arrives on site, the operative's job is to cooperate (CDM Reg 15 + HASAWA s.7) and to direct them to the responsible person, not to bluff or obstruct.",
  },
  {
    id: 2,
    question: "Who else enforces H&S law besides the HSE?",
    options: [
      "IET Academy is the IET's online learning platform — bite-sized technical courses, BS 7671 update training, design and engineering CPD content. Member access typically included with MIET subscription; some content open to non-members. Strong CPD resource alongside scheme-specific (NICEIC, NAPIT) and provider-specific (Elec-Mate) CPD platforms.",
      "Prevailing \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"tough it out\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" and \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"leave feelings at the gate\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" cultures actively discourage emotional expression and reflection, creating an environment where acknowledging emotions is seen as weakness, which drives emotional suppression, reduces help-seeking, and increases the risk of unrecognised mental health deterioration",
      "Local Authority Environmental Health Officers (EHOs) for retail, offices, leisure, residential. Office of Rail and Road for railways. Marine and Coastguard Agency for shipping. Civil Aviation Authority for aviation. Office for Nuclear Regulation for nuclear sites. The HSE itself for construction, manufacturing, mines, quarries, agriculture and most other industrial settings.",
      "Selling a non-MCS install means the customer can never claim SEG even later, may struggle to evidence compliance during a house sale, and may face insurance issues. The MCS install is also covered by the MCS workmanship warranty scheme. The cost difference is small and the protection is significant.",
    ],
    correctAnswer: 2,
    explanation:
      "Enforcement is split by sector. For an electrical contractor working on construction sites, manufacturing or industrial premises, the HSE is the inspector. On a retail or office fit-out the local authority EHO may be the enforcer. Powers are essentially the same; the inspector is just from a different agency.",
  },
  {
    id: 3,
    question: "What's a 'material breach' for FFI purposes?",
    options: [
      "Reg 644.1.1 — 'Upon completion of inspection and testing of an installation or an addition or alteration to an installation, an Electrical Installation Certificate based on the model in Appendix 6, together with a Schedule of Inspections (or Schedule of Items Inspected) and a Schedule of Test Results, shall be given to the person ordering the work.'",
      "CAR 2012 Reg 10 — anyone who is or may be exposed to asbestos must receive adequate training. UKATA / IATP-certified asbestos awareness (1-day) is the typical baseline for trades. Higher levels (non-licensed work, licensed work) require more advanced training.",
      "When the worker may be exposed to a risk to their health or safety while at work, EXCEPT where and to the extent that the risk has been or will be adequately controlled by other means which are equally or more effective. The 2022 amendment also extended the duty to cover limb (b) workers (some categories of casual / gig workers) as well as employees.",
      "A material breach is one which an inspector reasonably opines is sufficiently serious that it warrants written notification — letter, notice or report. The HSE's Enforcement Management Model is the published decision tool. Once a material breach is identified, FFI invoicing starts from the inspector's first time spent on the matter.",
    ],
    correctAnswer: 3,
    explanation:
      "'Material' is judged by the inspector against the EMM. The threshold is lower than 'serious enough to prosecute' — it covers any breach the inspector formally writes down. Verbal advice doesn't trigger FFI; a written letter does.",
  },
  {
    id: 4,
    question: "Under HASAWA, where do summary and indictable offences sit?",
    options: [
      "Most HASAWA offences are triable either way — the prosecution chooses Magistrates' (summary) or Crown (indictment). Magistrates' Court can impose unlimited fines on H&S offences (since 2015) and up to 6 months imprisonment. Crown Court can impose unlimited fines and up to 2 years imprisonment for individuals (longer for some related offences like Corporate Manslaughter — life). The Sentencing Council Definitive Guideline applies in both courts.",
      "Speak directly to the customer, identify yourself by name when you arrive and when you leave a room, describe what you're doing and where ('I'm just going to the consumer unit by the front door now'), don't move furniture or leave tools where they could be a trip hazard for the guide dog or the customer, ask before touching the guide dog (don't pet a working guide dog without asking), and offer to provide written documentation in large print, audio or accessible PDF as required. Equality Act 2010 makes this a service-provider duty.",
      "The apprenticeship contract (a formal indenture under the Apprenticeships, Skills, Children and Learning Act 2009), the wages, the off-the-job training declaration (a minimum 20% of paid working hours under the Apprenticeship Standard), the provision of suitable work and supervision, and HASAWA s.2 duties to provide a safe place of work and adequate training.",
      "Wide investigative powers — enter any premises (without warrant) at any reasonable time, take measurements / photographs / samples, inspect documents, require people to answer questions, take statements, take possession of articles or substances they think pose a risk, and seek a magistrate's warrant if entry is refused. Failure to co-operate is itself a separate criminal offence under s.33.",
    ],
    correctAnswer: 0,
    explanation:
      "Magistrates' jurisdiction was extended in 2015 to include unlimited fines for H&S offences, removing the previous £20k cap. Most prosecutions are triable either way; the prosecution picks the venue based on case complexity and likely sentence.",
  },
  {
    id: 5,
    question: "What does the Corporate Manslaughter and Corporate Homicide Act 2007 do?",
    options: [
      "When the circuit supplies multiple loads that will not all run simultaneously at full power. Apply diversity to the connected load before deriving Ib. For a dedicated single-load circuit (single shower, single hob), no diversity applies — Ib equals the rated current of the load.",
      "Creates a corporate offence where an organisation's activities cause a person's death and amount to a gross breach of a relevant duty of care, where the breach is the result of the way in which senior management organised or managed activities. Triable on indictment only; unlimited fines. Allows publicity orders and remedial orders. Sits alongside HASAWA prosecutions, not as a replacement.",
      "Recognise that direct eye contact norms vary significantly across cultures — in many cultures, avoiding direct eye contact is a sign of respect, not evasion. Adjust your communication style to accommodate cultural differences rather than interpreting through your own cultural lens",
      "The apprenticeship contract (a formal indenture under the Apprenticeships, Skills, Children and Learning Act 2009), the wages, the off-the-job training declaration (a minimum 20% of paid working hours under the Apprenticeship Standard), the provision of suitable work and supervision, and HASAWA s.2 duties to provide a safe place of work and adequate training.",
    ],
    correctAnswer: 1,
    explanation:
      "The CMCHA 2007 fixed the historical problem of being unable to prosecute large companies for manslaughter (the 'identification doctrine' required a single guiding mind). Senior management failure as a 'substantial element' is the test. Fines are typically multi-million.",
  },
  {
    id: 6,
    question: "What's the HSE Public Register of Convictions and Notices?",
    options: [
      "Management of Health and Safety at Work Regulations 1999 Reg 3 — every employer (and every self-employed person) must make a 'suitable and sufficient' assessment of risks to health and safety. Reg 3(6) requires firms with five or more employees to record the significant findings.",
      "A document prepared by the principal contractor before the construction phase starts, setting out the health and safety arrangements for the site (welfare, induction, site rules, hazard controls, emergency procedures, monitoring). Required for any project where there is more than one contractor; the depth of the plan scales with the project size and risk profile. Sub-contractors are entitled to relevant extracts on induction.",
      "Public-facing online register of all HSE prosecutions and notices issued. Searchable by company name and inspector area. Used by clients during procurement, by insurers when underwriting, by competitors, by potential employees and by news organisations. Reputational impact often outstrips the legal cost — major clients delist firms with prohibition notices.",
      "Witnesses fade fast — by the next day they've reconstructed events differently, by the next week they've forgotten details, by the next month their memory has merged with what they later read or heard. Asking each witness to write down what they saw, in their own words, on the day of the incident, captures evidence at its strongest. The HSE / insurer / firm's defence team will all want this evidence later.",
    ],
    correctAnswer: 2,
    explanation:
      "The public register is the reputational consequence of enforcement that often hurts the firm more than the fine. Procurement frameworks routinely require declaration of any HSE notices in the past 5 years, and a prohibition notice can disqualify a firm from bidding on public-sector work for years.",
  },
  {
    id: 7,
    question: "How does the Sentencing Council Definitive Guideline (2016) determine corporate fines?",
    options: [
      "Type 2 SPD at the consumer unit, supply-side of the main switch where possible, with 6 mm² copper PE to MET (Reg 534.4.10(a)), 2.5 mm² live connections (Reg 534.4.10(c)), conductor lengths under 0.5 m total (Reg 534.4.8), dedicated 25 A or 32 A MCB for SPD overcurrent protection, BS EN 61643 product standard.",
      "Minimum £5 million cover (most policies are written at £10m as standard). The certificate must be displayed at each place of business — historically a printed certificate on the wall; the 2008 amendment regulations allow electronic display provided employees can readily access it. Failure to insure is a criminal offence with daily-rate fines up to £2,500 for each day uninsured.",
      "Because most domestic PME supplies have a PEN of 35 mm² or less, which Table 54.8 maps to a 10 mm² minimum copper-equivalent main bonding. On bigger supplies (commercial three-phase, 70 mm² PEN) the bonding steps up to 16 mm² or 25 mm². Always read the supplier neutral first, then Table 54.8.",
      "Three-step matrix: (1) Culpability — Very High / High / Medium / Low; (2) Harm — Category 1 (death/permanent), 2 (serious), 3 (minor) with adjustments for risk of higher harm or multiple persons; (3) Turnover band — Large (£50m+), Medium (£10-£50m), Small (£2-£10m), Micro (under £2m). Cell in the matrix gives a starting point and a range. Adjusted up for aggravating factors, down for mitigating.",
    ],
    correctAnswer: 3,
    explanation:
      "The matrix is published in the Definitive Guideline. Largest cell (high culpability × Cat 1 harm × very large turnover) starts at £4m with a range up to £20m+ before mitigation. Smaller firms aren't immune — the percentage-of-turnover effect can be severe even for £2m firms.",
  },
  {
    id: 8,
    question:
      "When an HSE inspector arrives on site unannounced, what's the L3 operative response?",
    options: [
      "Cooperate (HASAWA s.7 + CDM Reg 15). Confirm your name and role. Direct the inspector to the senior person on site (supervisor, contracts manager, site manager). Answer factual questions truthfully — interfering with an inspector is a separate offence under HASAWA s.33. If asked technical questions outside your competence, say so honestly. Do not speculate or guess. Notify your firm immediately.",
      "Automated bank feed (transactions imported from your bank), invoice generation and tracking (sent invoices visible, paid status tracked), VAT return preparation (Making Tax Digital compliant), expense tracking with photo receipts, integration with payroll for staff/apprentices, real-time profit and loss view. Cost £15-30/month for sole trader; saves hours of manual bookkeeping each month.",
      "IET Online = large technical document archive (standards, journals, conference papers) for searching and reference. IET Academy = structured online learning platform with bite-sized courses on technical topics (BS 7671, PV, EV, motor control, power quality, etc.). Both included with MIET membership. Online for reference; Academy for structured learning.",
      "Marine electrical work covers commercial shipping, naval, offshore (oil and gas, wind), ports and marinas. Specific competence requirements include marine-grade equipment standards (BS EN 60092), corrosion-protection methods, DC systems (24V/48V common on vessels), shore-power connections. Specialist routes via the Royal Navy, Merchant Navy or commercial marine contractors. Often combined with CompEx for offshore work.",
    ],
    correctAnswer: 0,
    explanation:
      "HSE inspectors can enter at any reasonable time without a warrant under HASAWA s.20. Refusal is an offence. The L3 operative's job is cooperate, escalate to the senior person, and answer factual questions truthfully without speculating. The firm's legal/H&S team handles the formal interview.",
  },
];

const faqs = [
  {
    question: "Can the HSE prosecute me personally as an L3 apprentice?",
    answer:
      "Theoretically yes (HASAWA s.7), but in practice individual prosecutions are rare and reserved for serious personal misconduct (e.g. deliberate bypassing of safety controls causing death). Most prosecutions target the firm or director. The PRACTICAL personal risk for an L3 is being a witness in a prosecution against the firm — your statements, your records, your refusals all become evidence.",
  },
  {
    question: "If the HSE sends a Notice of Contravention (NoC), is that an FFI invoice?",
    answer:
      "Yes — the NoC is the document that triggers FFI invoicing. It states the breach, the regulation breached, and the time billed. The NoC is sent to the dutyholder (usually the company); they have a right to reply. Disputed FFI invoices can be challenged via the HSE-internal disputes panel.",
  },
  {
    question: "What's the difference between an HSE prosecution and a Local Authority prosecution?",
    answer:
      "Procedurally identical — both go through the Magistrates' or Crown Court, both apply the Sentencing Council Definitive Guideline. Difference is jurisdiction: HSE for industrial / construction / manufacturing / agriculture; Local Authority EHO for retail / office / leisure / residential. Some sites have shared jurisdiction; the regulator with the lead is decided case-by-case.",
  },
  {
    question: "Can our firm's insurance pay an HSE fine?",
    answer:
      "No. Public Liability and Employer's Liability insurance does NOT cover criminal fines (it's against public policy to insure the cost of breaking the law). Insurance can cover legal defence costs, civil compensation to victims, and rehabilitation costs — but the fine itself comes off the firm's bottom line. This is why the Sentencing Council guideline matters so much commercially.",
  },
  {
    question: "How long do HSE notices stay on the public register?",
    answer:
      "Five years for notices; convictions can stay longer depending on category and severity. The reputational impact reduces over time but doesn't disappear immediately. Firms aiming for major framework agreements often have to declare any notices in the past 5-10 years even after they've dropped off the register.",
  },
  {
    question: "If I'm called as a witness in an HSE prosecution against my firm, do I have to give evidence?",
    answer:
      "Generally yes — witness summonses can compel attendance. You should have your own solicitor (often arranged by the firm or via your union) before giving evidence. Truthfulness is the only safe approach; perjury is a separate criminal offence. Your evidence is protected by the privilege against self-incrimination — you don't have to incriminate yourself, but you do have to attend.",
  },
];

export default function Sub6() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module1-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1 · Subsection 6"
            title="HSE, FFI and the enforcement system"
            description="Remember from L2 — HSE was 'the enforcer'. At L3 the depth shift is knowing the enforcement tools (improvement notice, prohibition notice, FFI, prosecution), the Sentencing Council guideline and the public register that follows the firm for years."
            tone="emerald"
          />

          <TLDR
            points={[
              "HSE inspectors have wide statutory powers under HASAWA s.20–25 — entry, photos, samples, statements, document seizure, equipment dismantling. Cooperation under s.7 / CDM Reg 15 is the operative's duty.",
              "Three enforcement tools: improvement notice (fix within deadline), prohibition notice (stop until fixed), prosecution. FFI is the cost-recovery system that bills inspector time for material breaches at ~£170/hr.",
              "Sentencing Council Definitive Guideline (2016) — culpability × harm × turnover matrix. Reputation via the HSE Public Register often hurts the firm more than the fine. Insurance doesn't cover criminal fines.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the HSE's powers under HASAWA Part I — inspection, entry, notices, seizure, prosecution.",
              "Distinguish improvement notices (s.21) from prohibition notices (s.22) and explain the consequences of each.",
              "Describe Fee for Intervention (FFI) — when it applies, the trigger of a 'material breach', and the cost recovery mechanism.",
              "Apply the Sentencing Council Definitive Guideline (2016) — culpability × harm × turnover — to estimate fine bands.",
              "Identify the alternative enforcement bodies — Local Authority EHOs, ORR, MCA, CAA, ONR — and which sectors they cover.",
              "Recognise the HSE Public Register's commercial and reputational impact on the firm.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>HSE powers under HASAWA Part I</ContentEyebrow>

          <ConceptBlock
            title="Inspector powers — wider than most apprentices realise"
            plainEnglish="HSE inspectors carry statutory powers under HASAWA s.20–25. They can enter any premises at any reasonable time without a warrant. They can take photos, samples, statements; require production of documents; dismantle equipment; and seize articles or substances they consider dangerous. Obstructing an inspector is a separate offence."
            onSite="When an inspector arrives, the L3 operative's job is to cooperate, identify themselves, direct the inspector to the responsible person, and answer factual questions truthfully without speculating. The firm's H&S team handles the formal interview and the response strategy."
          >
            <p>The headline HSE powers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>s.20 entry</strong> — at any reasonable time, with assistance, with samples, with whomever they need to bring.</li>
              <li><strong>s.20 examination</strong> — examine, investigate and direct premises and articles to be left undisturbed.</li>
              <li><strong>s.20 statements</strong> — require any person to answer questions and to sign a declaration of truth.</li>
              <li><strong>s.20 documents</strong> — require production of, take copies of, books and documents.</li>
              <li><strong>s.21 improvement notice</strong> — formal notice to remedy a contravention within a specified time.</li>
              <li><strong>s.22 prohibition notice</strong> — formal notice to stop an activity immediately (or by a stated date) until the risk is remedied.</li>
              <li><strong>s.25 seizure</strong> — seize articles or substances posing imminent danger of serious personal injury and render them harmless.</li>
              <li><strong>s.33 offences</strong> — prosecution for failure to comply with notices, obstruction, false statements, fraud on certificates.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.21"
            clause={
              <>
                &quot;If an inspector is of the opinion that a person — (a) is contravening one
                or more of the relevant statutory provisions; or (b) has contravened one or more
                of those provisions in circumstances that make it likely that the contravention
                will continue or be repeated, he may serve on him a notice (in this Part referred
                to as &apos;an improvement notice&apos;) stating that he is of that opinion,
                specifying the provision or provisions as to which he is of that opinion, giving
                particulars of the reasons why he is of that opinion, and requiring that person
                to remedy the contravention or, as the case may be, the matters occasioning it
                within such period (ending not earlier than the period within which an appeal
                against the notice can be brought under section 24) as may be specified in the
                notice.&quot;
              </>
            }
            meaning={
              <>
                Improvement notice = remedy within deadline. Right of appeal to Employment
                Tribunal within 21 days; appeal suspends the notice. Failure to comply is an
                offence under s.33. Notice is published on the HSE Public Register.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.21."
          />

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.22"
            clause={
              <>
                &quot;This section applies to any activities which are being or are likely to be
                carried on by or under the control of any person, being activities to or in
                relation to which any of the relevant statutory provisions apply or will, if the
                activities are so carried on, apply. If as regards any activities to which this
                section applies an inspector is of the opinion that, as carried on or likely to
                be carried on by or under the control of the person in question, the activities
                involve or, as the case may be, will involve a risk of serious personal injury,
                the inspector may serve on that person a notice (in this Part referred to as
                &apos;a prohibition notice&apos;).&quot;
              </>
            }
            meaning={
              <>
                Prohibition notice = STOP. The activity stops on service (or by the stated date,
                if &quot;deferred&quot;) until the inspector is satisfied the risk is remedied.
                Right of appeal exists but does NOT suspend the prohibition. Working in
                defiance of a prohibition notice is a serious s.33 offence — unlimited fine and
                up to 2 years imprisonment on indictment.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.22."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Fee for Intervention (FFI)</ContentEyebrow>

          <ConceptBlock
            title="When the HSE bills you for the inspector's time"
            plainEnglish="Fee for Intervention is the HSE's cost-recovery scheme. When an inspector identifies a 'material breach' — one serious enough to require written notification — they bill the dutyholder for the inspector's time at an hourly rate. Currently around £170/hr; check HSE for the latest figure. FFI is separate from any prosecution costs or fines."
            onSite="Practical L3 awareness: the inspector's time on site doesn't trigger FFI; the writing of a Notice of Contravention does. So a routine compliant visit costs the firm nothing. A visit that uncovers a material breach can cost thousands — and that's before the underlying breach is dealt with."
          >
            <p>FFI in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Trigger</strong> — inspector identifies material breach AND writes a letter, notice or report. Verbal advice doesn&apos;t trigger.</li>
              <li><strong>Hourly rate</strong> — set by the HSE annually. Currently around £170/hr (verify with current HSE rates).</li>
              <li><strong>What&apos;s billed</strong> — inspector time, including investigation, paperwork, follow-up. Travel typically excluded.</li>
              <li><strong>Invoice arrives</strong> — Notice of Contravention with FFI itemisation. 30-day payment terms.</li>
              <li><strong>Disputes</strong> — internal HSE disputes panel. Limited grounds. Most disputes lose.</li>
              <li><strong>Cumulative effect</strong> — multiple visits / breaches add up. Five-figure FFI invoices are common for systemic issues.</li>
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

          <ContentEyebrow>Prosecution and the Sentencing Council guideline</ContentEyebrow>

          <ConceptBlock
            title="Culpability × Harm × Turnover — the matrix that sets the fine"
            plainEnglish="The Sentencing Council Definitive Guideline for Health and Safety Offences (2016) gives Magistrates' and Crown courts a structured matrix for setting fines. Three inputs: culpability (Very High / High / Medium / Low), harm category (1 / 2 / 3, adjusted for risk), and the company's turnover band (Large £50m+ / Medium £10-50m / Small £2-10m / Micro under £2m). The cell gives a starting point and a range."
            onSite="At L3 you don't memorise the bands but you should know the framework exists and that fines have gone up dramatically since 2016. A serious breach at a medium turnover firm now starts in six figures. Insurance can't pay it. The financial impact often dwarfs the legal costs."
          >
            <p>Worked illustration — high culpability, Cat 2 harm, medium turnover:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Starting point: ~£300,000.</li>
              <li>Range: £190,000 to £700,000.</li>
              <li>Aggravating factors (cost-cutting motive, repeat offending, vulnerable victim) push up.</li>
              <li>Mitigating factors (early plea, prompt remedial action, full cooperation, no previous record) push down.</li>
              <li>Final fine + costs + FFI + lost contracts + reputation damage typically exceed the fine itself by 2-5x.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The HSE Public Register</ContentEyebrow>

          <ConceptBlock
            title="The reputational consequence that follows the firm for years"
            plainEnglish="The HSE Public Register lists every prosecution and every notice issued. It's online, searchable, free. Clients use it during procurement; insurers use it during underwriting; competitors use it in tender pitches; news organisations use it for stories. A single prohibition notice can disqualify a firm from public-sector framework work for years."
            onSite="The L3 awareness: the cost of an enforcement event isn't just the fine and FFI. It's the lost contracts, the higher insurance premiums, the pre-qualification questionnaires that suddenly get harder. A clean register is worth more than most apprentices realise."
          >
            <p>How the public register affects the firm:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Procurement</strong> — most major clients require disclosure of HSE notices in the past 5+ years.</li>
              <li><strong>Insurance</strong> — Employer&apos;s Liability and Public Liability premiums rise; some insurers decline.</li>
              <li><strong>Framework agreements</strong> — public-sector and major-private-sector frameworks can disqualify firms with prohibition notices.</li>
              <li><strong>Subcontractor pre-qualification</strong> — main contractors check the register before adding firms to approved-supplier lists.</li>
              <li><strong>Customer perception</strong> — high-net-worth domestic and commercial clients increasingly Google contractors before engaging.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The Enforcement Management Model — how inspectors decide</ContentEyebrow>

          <ConceptBlock
            title="EMM: the published decision tool that turns inspector judgement into structured choice"
            plainEnglish="The HSE&apos;s Enforcement Management Model (EMM) is a publicly-published decision tool the inspector uses on every visit. It maps the actual risk-control gap (&quot;what was done&quot; vs &quot;what the benchmark required&quot;) and the actual or potential harm against a published matrix to produce an enforcement expectation: no action / advice / improvement notice / prohibition notice / prosecution / Crown Court referral. Knowing the EMM exists is the L3 step from &quot;the inspector decides&quot; to &quot;the inspector follows a structured tool, and the firm can predict the likely outcome&quot;."
            onSite="Practical implication: the firm&apos;s response strategy after a visit can be informed by which EMM cell the breach landed in. A &apos;medium gap, low harm&apos; cell normally produces advice or an improvement notice; a &apos;substantial gap, serious actual harm&apos; cell produces prosecution. The firm&apos;s solicitor or H&amp;S manager will be familiar with the EMM and use it to anticipate enforcement outcomes."
          >
            <p>EMM inputs the inspector weighs:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The benchmark</strong> — what the law and authoritative guidance (BS
                7671, HSG, ACoP) require. The standard the firm should have met.
              </li>
              <li>
                <strong>The actual control measures</strong> — what the firm actually did.
              </li>
              <li>
                <strong>The risk gap</strong> — the difference between benchmark and actual.
                Categorised as nominal / extensive / substantial.
              </li>
              <li>
                <strong>The harm</strong> — actual harm if it happened, or potential harm if it
                didn&apos;t. Categorised by severity and likelihood.
              </li>
              <li>
                <strong>Authority and public interest factors</strong> — repeat offending,
                vulnerable victims, fraud, deliberate breach.
              </li>
              <li>
                <strong>Initial enforcement expectation (IEE)</strong> — produced by the
                matrix; can be moderated up or down by the inspector with documented reasons.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Inspector entry powers — what s.20 actually allows</ContentEyebrow>

          <ConceptBlock
            title="Wider than &apos;they can come in&apos;"
            plainEnglish="HASAWA s.20 is the inspector&apos;s power-pack. Entry at any reasonable time without warrant. Bring a constable if obstruction expected. Bring any equipment or material needed. Examine and investigate. Direct the premises to be left undisturbed for a reasonable period. Take measurements, photos, recordings. Take samples. Take possession of articles or substances. Require any person to answer questions and sign a declaration of truth. Require production of books and documents and take copies. Require facilities and assistance from anyone who has a duty under HASAWA."
            onSite="When the inspector arrives, they may ask to take photos of your kit, copy your test instrument calibration certificates, review your job pack, ask for the firm&apos;s training records, demand a statement under s.20(2)(j) (&quot;require any person to answer questions and to sign a declaration of truth&quot;). All of these are statutory powers, not requests. Refusing without lawful excuse is an offence under s.33."
          >
            <p>What an inspector can demand under s.20:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Entry at any reasonable time</strong> — no warrant required (warrant
                only needed for entry by force).
              </li>
              <li>
                <strong>Examination and investigation</strong> — including dismantling
                equipment if necessary to determine the cause of an event.
              </li>
              <li>
                <strong>Direction to preserve the scene</strong> — for a reasonable period to
                allow examination.
              </li>
              <li>
                <strong>Photographs and recordings</strong> — including of the work area, the
                equipment, the operative and the documentation.
              </li>
              <li>
                <strong>Samples</strong> — of substances, materials, atmosphere.
              </li>
              <li>
                <strong>Possession of articles</strong> — for examination, testing, or
                preservation as evidence.
              </li>
              <li>
                <strong>Statements under declaration of truth</strong> — admissible as evidence;
                refusal is an offence.
              </li>
              <li>
                <strong>Document production and copying</strong> — books, RAMS, training
                records, calibration certificates, EICR / EIC files.
              </li>
              <li>
                <strong>Facilities and assistance</strong> — from any person who has a HASAWA
                duty (which includes operatives via s.7).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.20(2)"
            clause={
              <>
                &quot;The powers of an inspector referred to in the preceding subsection are the
                following, namely — (a) at any reasonable time (or, in a situation which in his
                opinion is or may be dangerous, at any time) to enter any premises which he has
                reason to believe it is necessary for him to enter for the purpose mentioned in
                subsection (1) above; ... (j) to require any person whom he has reasonable cause
                to believe to be able to give any information relevant to any examination or
                investigation under that paragraph to answer (in the absence of persons other
                than a person nominated by him to be present and any persons whom the inspector
                may allow to be present) such questions as the inspector thinks fit to ask and
                to sign a declaration of the truth of his answers.&quot;
              </>
            }
            meaning={
              <>
                Eleven sub-powers in s.20(2)(a)–(k). The headline ones for L3: entry without
                warrant, examination, direction to preserve, photos and samples, possession of
                articles, statements under declaration of truth, document production. Refusal
                of any without lawful excuse is an offence under s.33(1)(h). The
                statement-under-declaration power is the one most operatives don&apos;t expect
                — it&apos;s a formal evidence-gathering procedure, not a chat.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.20."
          />

          <SectionRule />

          <ContentEyebrow>The Notice of Contravention — what arrives in the post</ContentEyebrow>

          <ConceptBlock
            title="Reading the NoC — what it tells you and what to do"
            plainEnglish="The Notice of Contravention (NoC) is the document the HSE sends to a dutyholder after identifying a material breach. It states the regulation breached, what the inspector observed, the action expected, and the FFI invoice. The NoC is NOT itself a statutory notice (it&apos;s not an improvement notice or prohibition notice — those are s.21 / s.22 documents); it&apos;s an administrative document supporting FFI. But the underlying breach it describes can lead to a statutory notice or prosecution separately."
            onSite="When an NoC arrives, the firm should: (1) check the alleged breach against the actual facts; (2) plan the response — usually remediating the breach quickly is the cheapest path; (3) decide whether to dispute via the FFI internal panel (limited grounds, most disputes lose); (4) brief operatives that an HSE follow-up may be coming. NoCs are NOT to be ignored or paid casually — they record &quot;material breach&quot; against the firm in the HSE&apos;s system."
          >
            <p>What the NoC contains:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Inspector name, area, contact details.
              </li>
              <li>
                Date of visit, location and dutyholder identity.
              </li>
              <li>
                Specific regulation alleged to have been breached.
              </li>
              <li>
                Factual description of what was observed.
              </li>
              <li>
                Required action and timescale (where applicable).
              </li>
              <li>
                FFI invoice — itemised inspector time, hourly rate, total.
              </li>
              <li>
                Payment terms (typically 30 days) and dispute mechanism.
              </li>
              <li>
                Reference to whether further enforcement is being considered.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Crown Court referral — when the magistrates send it up</ContentEyebrow>

          <ConceptBlock
            title="Either-way offences and the venue choice"
            plainEnglish="Most HASAWA offences are triable either way. The Magistrates&apos; Court can hear the case (summary trial, max 6 months custody for individuals, unlimited fines since 2015) but can also commit to the Crown Court for trial or sentence if the case is too serious. Crown Court fines and individual sentences (up to 2 years for HASAWA, life for Corporate Manslaughter) are typically larger than Magistrates&apos; outcomes."
            onSite="Why this matters at L3: the venue largely determines the sentence ceiling. A serious incident at a large firm with high culpability is almost always Crown Court; the Sentencing Council guideline produces fines that the magistrates would be reluctant to impose at the maximum. Knowing the venue&apos;s coming (the firm&apos;s solicitor will tell them) frames the firm&apos;s wider response — community impact statements, mitigation evidence, structural changes."
          >
            <p>Factors that push a case to Crown Court:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Severity of harm</strong> — fatality, permanent injury, harm to
                multiple persons.
              </li>
              <li>
                <strong>Culpability band</strong> — &quot;high&quot; or &quot;very high&quot;
                under the Sentencing Council guideline.
              </li>
              <li>
                <strong>Turnover</strong> — large or very large turnover firms tend to be
                committed for sentence even where the breach itself isn&apos;t at the worst end.
              </li>
              <li>
                <strong>Repeat offending</strong> — prior convictions, prior notices, prior
                FFI history.
              </li>
              <li>
                <strong>Aggravating factors</strong> — cost-cutting motive, deliberate breach,
                vulnerable victim, obstruction of investigation.
              </li>
              <li>
                <strong>Public interest</strong> — high-profile incident, sector-wide
                significance, Corporate Manslaughter potential.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Trying to talk the inspector out of writing the notice"
            whatHappens={
              <>
                Apprentice on site when inspector arrives. Inspector finds an obvious
                EAWR breach (no lock-off on a partially-isolated DB). Apprentice tries
                to explain, &quot;normally we lock it but we&apos;re just taking a quick
                break, the lock&apos;s in the van&quot;. Inspector writes the notice
                anyway and adds the apprentice&apos;s admission to the file. The firm now
                has a notice on the register AND the inspector&apos;s contemporaneous
                note that the breach was knowing rather than accidental — pushing
                culpability towards &apos;high&apos;.
              </>
            }
            doInstead={
              <>
                Cooperate, identify yourself, direct the inspector to the senior person
                on site. Answer factual questions truthfully but don&apos;t volunteer
                speculation, opinion or admissions of past practice. The firm&apos;s H&amp;S
                response is handled by the H&amp;S manager or solicitor — your job on the
                day is to be cooperative and factual.
              </>
            }
          />

          <CommonMistake
            title="Treating an FFI invoice as 'optional' until it goes to dispute"
            whatHappens={
              <>
                Firm receives Notice of Contravention with FFI invoice for £4,800.
                Doesn&apos;t pay; assumes &quot;we&apos;ll dispute it later&quot;.
                Misses the 30-day payment window. HSE escalates to debt recovery; the
                firm now has a payment-default record alongside the original breach.
                Dispute is heard at the internal panel; the substantive case is rejected.
                Firm pays original FFI plus collection costs.
              </>
            }
            doInstead={
              <>
                Pay the FFI invoice within the deadline OR formally raise a dispute
                within the disputes-procedure window (typically 21 days). The dispute
                process is internal-HSE and limited in scope, but it&apos;s the
                regulatory route. Ignoring an FFI invoice is the worst response.
              </>
            }
          />

          <Scenario
            title="Inspector arrives during your fault-finding visit"
            situation={
              <>
                You&apos;re in the second hour of a fault-finding visit at a small
                manufacturing client&apos;s switchroom. Lighting is on, you&apos;ve
                isolated the affected sub-circuit but not the whole DB, you&apos;re
                wearing FR overalls and using insulated tools. An HSE inspector arrives
                following a routine site visit programme; the site manager brings them
                to your work area. The inspector wants to see your RAMS, your safe-
                isolation evidence, your test instrument calibration certificates and
                your competence record.
              </>
            }
            whatToDo={
              <>
                Stop work safely. Identify yourself by name and role. Provide what you
                can: the RAMS from the job pack, the safe-isolation record (lock-off
                photo, voltage indicator readings), the test instrument calibration
                cert from your kit, your competence cards (NVQ progress, JIB grade if
                applicable). Be factual: &quot;I&apos;m an L3 apprentice working under
                supervisor X, I have isolated this sub-circuit, here&apos;s the
                evidence&quot;. Phone your supervisor and the firm&apos;s contracts
                manager immediately — they need to know the inspector is on site. Don&apos;t
                speculate on what the inspector might find or volunteer information
                about other jobs. If asked something outside your competence (&quot;why
                doesn&apos;t the firm use a different breaker brand?&quot;) say &quot;I
                don&apos;t know; the contracts manager can answer that&quot;.
              </>
            }
            whyItMatters={
              <>
                The inspector will form an opinion of the firm&apos;s safety culture
                from this 30-minute interaction. A cooperative, factual operative who
                produces the documentation calmly creates a much better impression than
                one who panics or argues. The firm&apos;s subsequent FFI exposure depends
                on what the inspector finds, but it also depends on what the inspector
                writes down — and what they write is shaped by what you say. Your
                statements during the visit can be used as evidence in any subsequent
                prosecution. ERA 1996 s.44 protects you from detriment for telling the
                truth; the firm cannot punish you for cooperating with a regulator.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Remember from L2 — HSE is the enforcer. At L3 the depth is the enforcement TOOLKIT (improvement notice, prohibition notice, FFI, prosecution) and the consequences cascade.",
              "HSE inspectors have wide HASAWA Part I powers — entry, photos, samples, statements, document seizure, equipment dismantling, prosecution. Cooperation is the operative's duty.",
              "Improvement notices (s.21) — fix within deadline. Prohibition notices (s.22) — STOP until fixed. Both published on the HSE Public Register.",
              "FFI bills inspector time at ~£170/hr for 'material breaches' formally written up. Disputes go to internal panel; most lose.",
              "Sentencing Council Definitive Guideline (2016): culpability × harm × turnover matrix produces fine bands. Insurance doesn't cover criminal fines.",
              "HSE Public Register has commercial and reputational impact for years — procurement, insurance, framework eligibility all affected.",
              "Local Authority EHOs enforce H&S in retail / office / leisure / residential; HSE enforces construction / manufacturing / industry. Same powers, different agency.",
              "When the inspector arrives: cooperate, identify yourself, direct to senior person, answer facts truthfully, don't speculate, notify the firm immediately.",
            ]}
          />

          <Quiz title="HSE, FFI and enforcement — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section1-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.5 Environmental legislation and waste
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section1-7')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.7 Building Safety Act 2022 — the new framework
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
