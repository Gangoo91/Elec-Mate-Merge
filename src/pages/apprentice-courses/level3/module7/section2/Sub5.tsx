/**
 * Module 7 · Section 2 · Subsection 5 — Teaching / assessing route
 * Maps to C&G 2365-03 / Unit 308 / LO1 / AC 1.7
 *   AC 1.7 — "Explain opportunities for progression within building services engineering"
 *             (the teaching/assessing/IQA progression route from working electrician to lecturer)
 *
 * The career path from working electrician into teaching, assessing and
 * lecturing — TAQA L3 (Training, Assessment and Quality Assurance), IQA L4
 * (Internal Quality Assurance), the FE teaching qualifications (Award /
 * Certificate / Diploma in Education and Training), the role of college
 * lecturer / assessor / IQA, EPAO assessor roles, and how a senior
 * electrician moves into giving back through teaching.
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

const TITLE = 'Teaching / assessing route | Level 3 Module 7.2.5 | Elec-Mate';
const DESCRIPTION =
  'TAQA L3, IQA L4, FE teaching qualifications, college lecturer / assessor / IQA roles, EPAO assessor work — how a senior electrician moves into teaching and assessing apprentices.';

const checks = [
  {
    id: 'mod7-s2-sub5-taqa',
    question: "What's the TAQA L3 qualification and what does it allow you to do?",
    options: [
      "CDM 2015 Reg 13(1)(a) requires the principal contractor to plan, manage and monitor the construction phase. In practice this includes site sign-in / sign-out registers, attendance at toolbox talks, RAMS sign-on records, and any permit records. These records combine with the apprentice's own records to form a full picture of who was on site doing what when. The records are commonly required after any incident or in any later dispute.",
      "Common triggers: profits exceed £40-50k/year (where Ltd's lower-cost dividend tax structure starts to outweigh the extra admin); contracts increasingly require Ltd-only counterparties (some commercial clients refuse to engage sole traders); risk profile grows (more employees, larger contracts, higher liability exposure); raising external investment (impossible as sole trader); planning succession or sale of the business (Ltd is sellable, sole trader isn't).",
      "TAQA Level 3 (Training, Assessment and Quality Assurance) is the standard UK qualification for vocational assessors. Specifically the 'Level 3 Award in Assessing Competence in the Work Environment' (formerly the A1 / D32-D33 awards). It allows you to formally assess apprentices and other vocational candidates against an awarding body's standards (C&G, EAL, NVQ). Required for paid assessor roles at colleges, training providers and EPAO bodies.",
      "An Improvement Notice (s.21) is served when the inspector believes a Regulation has been breached and the duty-holder is given a period (minimum 21 days) to put it right. A Prohibition Notice (s.22) is served when the inspector believes there's a risk of SERIOUS PERSONAL INJURY from a specific activity — the activity must stop immediately or by a stated time. Failure to comply with either is a separate criminal offence; both appear on the public HSE Notices database.",
    ],
    correctIndex: 2,
    explanation:
      "TAQA L3 is the entry qualification for vocational assessing — what used to be called A1 in older terminology. Without it you can't sign off competence assessments for awarding bodies. Typical course 5-10 days plus portfolio of evidence (you assess real candidates under observation). Cost £600-1,200. Strong route for senior electricians wanting to give back through training while earning supplementary income.",
  },
  {
    id: 'mod7-s2-sub5-iqa',
    question: "What's IQA L4 and how does it relate to TAQA L3?",
    options: [
      "IQA Level 4 (Internal Quality Assurance) is the qualification for verifying assessment quality — you sample and second-mark other assessors' work to ensure consistency. Senior progression beyond TAQA L3. Typical course 5-10 days plus portfolio. Required for IQA roles at colleges and training providers, and for senior assessor positions. Can lead to EQA (External Quality Assurance) at L4 — the awarding body's own QA function.",
      "Each calculation has a different worst case. Fault current worst case is HIGH voltage (more energy, more thermal stress on cable) → use Cmax. Zs worst case is LOW voltage (smaller driving voltage, smaller fault current, slower trip) → use Cmin. Each factor pushes the calculation in the conservative direction for that specific design check.",
      "The main contractor holds the contract with the client (often the building developer or end-user) and is responsible for the whole project — programme, cost, safety, all trades. The electrical sub-contractor (sometimes 'M&E sub-contractor') holds a sub-contract with the main contractor and is responsible for the electrical package only — design (if D&B), install, test, commission, hand over. Most UK electrical apprentices work for sub-contractors.",
      "Professional ethics code binding on IET members and Engineering Council registrants. Covers integrity and honesty, public safety and interest, working within professional competence limits, maintaining and developing competence through CPD, treating colleagues, clients and the public with respect, reporting concerns about safety or unethical conduct. Failure to comply can lead to disciplinary action and ultimately removal from membership/register.",
    ],
    correctIndex: 0,
    explanation:
      "TAQA L3 = assessor; IQA L4 = quality-assures assessors. Sequential progression: assess candidates under TAQA, then move into IQA to assess assessors. IQA roles pay better and offer more flexible hours. Many senior electrical assessors hold both. EQA (External Quality Assurance) is the awarding body's own external quality function — typically requires substantial vocational and IQA experience.",
  },
  {
    id: 'mod7-s2-sub5-pgce',
    question: "What's the difference between TAQA and a teaching qualification (PGCE / DET)?",
    options: [
      "C1 first within hours of report issue (re-energising the isolated circuit safely is the urgent task), C2 next within 28 days under PRS Regs (or as agreed), C3 at next opportunity. Within each code, sequence by safety impact and access — bonding first because it underpins every other safety layer, then RCD installation, then C3 improvements at convenient time.",
      "Code as an observation. Reg 514.13.1 mandates the \\\\\\\"Safety Electrical Connection — Do Not Remove\\\\\\\" warning notice. Missing label is a Code C3 (improvement recommended) since the bond is still functional but a future homeowner may inadvertently remove the conductor without realising its purpose.",
      "TAQA is for assessing existing competence (signing off NVQ portfolio evidence, observing apprentices in workplace). Teaching qualifications (Award / Certificate / Diploma in Education and Training, formerly PTLLS / CTLLS / DTLLS) are for delivering classroom teaching. College lecturers typically need a teaching qualification (DET Level 5 minimum); college assessors need TAQA L3. Many lecturers hold both.",
      "5-day course at an accredited training centre. Covers ATEX/UKEX directives, hazardous-area zone classification (zones 0/1/2 for gas, 20/21/22 for dust), Ex equipment marking and selection, installation methods (cable glanding, conduit, sealing), inspection regimes (visual / close / detailed). Mix of classroom and practical lab. Assessment includes written exam and practical inspection task. Cost typically £1,000-1,500 plus any travel/accommodation.",
    ],
    correctIndex: 2,
    explanation:
      "Different functions, different qualifications. Teaching = delivering content (DET / PGCE / Cert Ed). Assessing = signing off competence evidence (TAQA L3). College lecturers typically need both because they teach AND assess. Workplace assessors typically need only TAQA. EPAO assessors (for End-Point Assessment) need TAQA plus EPAO-specific training. Plan whichever combination fits the role you're aiming at.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does an 'assessor' actually do at a UK college?",
    options: [
      "HSE acknowledges receipt and may follow up — desktop review, request for further information, site visit, inspection. Whether HSE attends depends on the severity of the incident and the wider context (e.g. recurrence, sector trends, public interest). For specified injuries and fatalities a follow-up visit is normally expected.",
      "Visits apprentices in their workplace (typical 2-monthly visits), observes them carrying out real electrical work, signs off portfolio evidence against the apprenticeship standard, calibrates with the workplace mentor, attends three-way reviews, and contributes to the college's internal quality assurance. Typically employed by the college (or training provider) on a per-apprentice or sessional basis.",
      "It's a positive declaration that you have read the RAMS, understood it, and will work to it. Once your signature is on the sheet you've personally adopted the document — including the working method, the controls and the residual risks. It's the contractor's evidence to the HSE that the operatives were properly briefed, and it's the reason your supervisor will push back if you sign without reading.",
      "Part P does NOT apply (Part P is dwellings-only). EAWR applies to the workplace electrical safety. The work needs an EIC or MEIWC for BS 7671 compliance and the contractor discharges EAWR duties through competent design and installation. No CPS upload required because Part P does not apply, but the contractor may still notify Building Control if other Building Regulations Parts are triggered (e.g. Part B fire safety, Part L energy efficiency).",
    ],
    correctAnswer: 1,
    explanation:
      "Workplace assessor is one of the most rewarding routes for senior electricians wanting to give back. You see apprentices in real work environments, calibrate their competence against the standard, and sign portfolio evidence. Pay typically £150-250 per visit (2-monthly) or hourly rates around £25-40/hr. Many assessors do this part-time alongside continuing electrical work — flexible income with meaningful impact.",
  },
  {
    id: 2,
    question: "What's the DET (Diploma in Education and Training) and who needs it?",
    options: [
      "Yes — sole traders can register with MCS the same as Ltd companies. The registration is at firm level, not individual level, but a sole trader is a firm of one. The QS (technical lead) for the MCS registration is normally the sole trader themselves, who must hold the relevant technical competence (AM2S for PV, F-Gas Cat 1 for heat pump, etc.). Many sole-trader electricians use MCS as the route into a niche renewables specialism.",
      "Because the install is a long-lived asset that will outlast the original installer's involvement. Notices communicate critical information — main earth location, RCD test interval, mixed supplies, isolator function — to whoever interacts with the install in future, including the customer in an emergency, the next electrician on a fault visit, and the EICR engineer in five years' time. The labels are how the install talks to people when the original installer isn't there.",
      "Level 5 Diploma in Education and Training — the standard FE teaching qualification (formerly DTLLS). Required for full lecturer roles at FE colleges. Typically 1-2 year part-time programme delivered alongside teaching practice. Builds on the L3 Award (formerly PTLLS) and L4 Certificate (formerly CTLLS). Cost £2,000-4,000 depending on provider; often funded by employing college for staff conversion.",
      "Bonding required per Reg 411.3.1.2 — the metal oil supply pipe is an extraneous-conductive-part liable to introduce a potential. Bond per Reg 544.1.2 — consumer side, before any branch, within 600 mm of point of entry where practicable. Use a BS 951 clamp suitable for oil application (similar specification to gas — DSEAR considerations apply).",
    ],
    correctAnswer: 2,
    explanation:
      "DET (Level 5) is the lecturer-tier teaching qualification for FE. Below it sits the L3 Award (introductory; formerly PTLLS) and L4 Certificate (intermediate; formerly CTLLS). Most colleges hire experienced electricians on the condition they convert to DET within 2-3 years. The L3 Award is often a quick weekend conversion for assessors; the L4 Cert and L5 Diploma are larger commitments.",
  },
  {
    id: 3,
    question: "What's an EPAO assessor and how is it different from a college assessor?",
    options: [
      "IT systems still have exposed-conductive-parts that must be earthed (locally or interconnected via a protective conductor — see Reg 411.6.2). They still need protective equipotential bonding of extraneous parts. The \\\\\\\"I\\\\\\\" in IT means the source is isolated (or earthed via high impedance), not that the installation has no earthing",
      "Level 5 Diploma in Education and Training — the standard FE teaching qualification (formerly DTLLS). Required for full lecturer roles at FE colleges. Typically 1-2 year part-time programme delivered alongside teaching practice. Builds on the L3 Award (formerly PTLLS) and L4 Certificate (formerly CTLLS). Cost £2,000-4,000 depending on provider; often funded by employing college for staff conversion.",
      "Reg 132.13 — 'The designer of the electrical installation shall provide ... the information necessary to allow the safe operation, inspection, alteration, repair, maintenance and dismantling of the electrical installation'. The information has to be available to whoever is going to operate or maintain it. That is the BS 7671 hook for site-folder paperwork (single line diagram, schedule of circuits, certificate, schedule of test results, mfr data).",
      "EPAO (End-Point Assessment Organisation) assessors deliver the End-Point Assessment for Apprenticeship Standards — the formal independent assessment at the end of the apprenticeship. EPAOs are independent bodies (separate from the training college) — examples include NET (National Electrotechnical Training), JTL, City & Guilds. EPAO assessors typically need TAQA L3 plus EPAO-specific training and current industry experience.",
    ],
    correctAnswer: 3,
    explanation:
      "EPAOs deliver the formal external assessment that ends the apprenticeship — AM2, knowledge tests, professional discussion. Different from training-provider assessors (who assess during the apprenticeship). EPAO assessor work is typically project-based — sessional pay per assessment delivered. Strong route for senior electricians who want occasional teaching/assessing income alongside continuing trade work.",
  },
  {
    id: 4,
    question: "What's typical pay for a part-time college lecturer in electrical?",
    options: [
      "Hourly rates typically £30-50/hr depending on college and qualification level taught. Sessional contracts (paid by hour or by class) for non-DET-qualified specialists; salaried contracts for DET-qualified lecturers (typically college Band 4-6, equivalent £28-42k pro-rata). Many electricians do part-time evening teaching alongside day-job electrical work — supplementary income plus the satisfaction of teaching.",
      "Safely isolate. Open all switches and disconnect any wired-in fixed appliances (or accept Reg 643.3.3 two-stage method). Disconnect L and N at the protective device; if the circuit shares a neutral bar with other circuits, lift its neutral too. Connect the IR tester between L and CPC, then N and CPC, then L and N (each combination). Press TEST. Reading must be ≥ 1 MΩ for a 500 V test.",
      "The Operations and Maintenance (O&M) pack — typically a bound document or PDF with: signed EIC (top-level), Schedule of Inspections, Schedule of Test Results, design pack (single-line, panel schedules, calculations), as-built drawings, Building Control Compliance Certificate (or notification reference), commissioning test results, departures log, manufacturer manuals for installed equipment, recommended maintenance schedule.",
      "Yes, but only after preparing — switch off any sensitive loads on the same RCD, brief any occupants the supply may briefly trip, and be ready to reset the RCBO. Full trip-current mode is more accurate (typically plus or minus 5 percent vs plus or minus 10 percent for no-trip), and on a borderline result it can confirm whether the no-trip reading was accurate or whether you have a margin you can rely on. If the full mode confirms the reading you can document with higher confidence; if it differs significantly, investigate further.",
    ],
    correctAnswer: 0,
    explanation:
      "FE college pay isn't generous compared to specialist trade work but it's flexible, stable and meaningful. Many senior electricians do 4-8 hours/week of evening teaching alongside continuing trade work — useful supplementary income (£100-400/week) plus social purpose. Full-time FE lecturer salaries (£28-45k typically) sit below skilled-trade rates but offer pension, holidays and structured progression.",
  },
  {
    id: 5,
    question: "What's an 'IV' and how does it differ from an IQA?",
    options: [
      "Fluorescent tubes (mercury-containing, EWC 20 01 21* — the asterisk denotes hazardous), oil-filled transformers and capacitors containing PCBs (EWC 16 02 09*), batteries containing lead, mercury or cadmium (EWC 16 06 01* and similar), asbestos-cement consumer unit backplates from older installations (EWC 17 06 05*), and waste oils. The asterisk in the EWC code is the marker for absolute hazardous waste.",
      "Older terminology — IV (Internal Verifier) was the predecessor name for what's now IQA (Internal Quality Assurer). Same role. Older qualifications used IV terminology (V1 / V2 awards); current qualifications use IQA terminology (Level 4 Award/Certificate in Internal Quality Assurance). If you see 'IV' on a job advert it almost always means IQA in modern terminology.",
      "Creating a wellbeing programme that includes: team-building activities (Connect), active travel schemes and lunchtime walks (Be Active), mindfulness sessions and reflective practice groups (Take Notice), CPD opportunities and skills-sharing workshops (Keep Learning), and volunteering days and peer support schemes (Give)",
      "Our site uses a balanced approach combining planned preventive maintenance for critical assets, condition-based monitoring using thermography and vibration analysis, and run-to-failure for non-critical items, all managed through a CMMS with KPIs including MTBF, MTTR, and maintenance backlog",
    ],
    correctAnswer: 1,
    explanation:
      "IV vs IQA is the same role under different names — terminology updated when TAQA replaced the older A1/V1 framework. Current qualification structure: TAQA L3 (assessor), IQA L4 Award (foundation IQA), IQA L4 Certificate (full IQA). Older qualifications (V1, A1, D32-D34) remain valid but new entrants take TAQA / IQA.",
  },
  {
    id: 6,
    question: "What's the route from working electrician to college lecturer?",
    options: [
      "The right of access under UK GDPR Article 15 (a 'subject access request' or SAR). The firm has one calendar month to respond, free of charge in most cases. The response must include the personal data being processed, the purposes, the categories, the recipients, the retention period, and the source of the data if not from the data subject.",
      "A mask that doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t seal properly to the face provides much less protection than its rated assigned protection factor. Face-fit testing (qualitative or quantitative) confirms the fit. HSE INDG479 is the guide. Fit-test required at first issue and on changes (weight, dental work, beard growth).",
      "Typical route: TAQA L3 (assessor qualification) — start doing some assessor work to test fit. Then L3 Award in Education and Training (introductory teaching qualification). College hires you part-time as a sessional lecturer; you teach evening classes. Convert to DET (L5 Diploma) over 1-2 years to become full lecturer. Many colleges fund the conversion if you commit to a permanent role.",
      "Some electrical work in dwellings (e.g. installation of fixed lighting in new builds, installation of certain controls and metering) falls within Part L scope as well as Part P. The contractor needs to confirm both Part P (electrical safety notifiable) AND Part L (energy efficiency requirements — minimum lamp efficacy, controls, etc.) compliance where applicable.",
    ],
    correctAnswer: 2,
    explanation:
      "The conversion from electrician to lecturer is a real and well-trodden path. TAQA L3 is often the first step (low cost, useful even if you stop there); L3 Award in Education and Training is the next; DET L5 is the full conversion. Most FE colleges value industry-experienced lecturers and will fund the teaching qualification conversion in return for a service commitment.",
  },
  {
    id: 7,
    question: "What's the role of a senior electrician acting as an apprenticeship Workplace Mentor?",
    options: [
      "(1) Verify CPP exists and reflects the work. (2) Verify client awareness conversation. (3) Brief operatives on the CPP. (4) Identify hazards via dynamic risk assessment. (5) Manage and monitor work in practice. (6) Document the day\\\\\\\\'s safety actions. (7) Escalate issues. (8) Close out at end of project — lessons, records, cleanup.",
      "Two parallel civil routes — (a) breach of contract (the implied term under the Supply of Goods and Services Act 1982 / Consumer Rights Act 2015 that work be carried out with reasonable care and skill); AND (b) tort of negligence (duty of care + breach + causation + loss). Both can be pleaded in the same claim. Negligence is usually the lead because it covers physical damage to property + consequential loss + injury, where contract may be limited by exclusion clauses. The contractor's PL insurer handles the defence under whichever route applies.",
      "(1) Strict liability — pollution incidents are offences regardless of intent; (2) duty of care under EPA 1990 s.34 + the Polluter Pays principle; (3) MHSWR Reg 14 (employee duty to report shortcomings); (4) operator's environmental permit conditions; (5) reputational and commercial consequences of an undetected pollution event downstream; (6) personal liability under HASAWA s.7 if the environmental hazard also creates a worker safety hazard.",
      "Workplace mentor is the unpaid (or informally paid) day-job mentor allocated to a specific apprentice within the employing firm. Different from college assessor (paid, formally qualified, employed by college). The mentor signs portfolio entries as evidence of on-site competence, attends three-way reviews, calibrates progress with the college tutor. Mentor competence is evidenced by JIB Approved Electrician grade plus experience — no specific qualification required.",
    ],
    correctAnswer: 3,
    explanation:
      "Workplace mentor is the entry point for many senior electricians into supporting apprentices. Doesn't require TAQA or any teaching qualification — the mentor's competence is the JIB Approved grade and the on-site experience. Often the first taste of mentoring/teaching that leads someone toward formal assessor or lecturer roles. Many JIB-graded firms expect their senior staff to take on mentor responsibility as part of the role.",
  },
  {
    id: 8,
    question: "Is there demand for electrical lecturers and assessors?",
    options: [
      "Yes — UK FE colleges and training providers consistently report difficulty recruiting industry-experienced electrical lecturers and assessors. The pay is below skilled-trade rates but the lifestyle (term-time hours, holidays, pension) appeals to mid-career and later-career electricians. Apprenticeship Standards expansion has increased demand for assessors. Many regions have unfilled posts at any given time.",
      "Section 49 of the Consumer Rights Act 2015 implies a term in every contract for the supply of a service to a consumer that the trader must perform the service with reasonable care and skill. Failure to do so is a breach of contract and the consumer has remedies including the right to require repeat performance and the right to a price reduction. Poor communication that leads to defective work, missed scope items or a non-compliant installation can be a breach of s.49.",
      "Requires the 'responsible person' (employer / building owner / occupier) to undertake a fire risk assessment, implement and maintain general fire precautions, provide adequate means of escape, fire detection and alarm, fire fighting equipment, and information / instruction / training to relevant persons. Enforced by the Fire and Rescue Service.",
      "Creating a wellbeing programme that includes: team-building activities (Connect), active travel schemes and lunchtime walks (Be Active), mindfulness sessions and reflective practice groups (Take Notice), CPD opportunities and skills-sharing workshops (Keep Learning), and volunteering days and peer support schemes (Give)",
    ],
    correctAnswer: 0,
    explanation:
      "Recruitment difficulty is genuine — the pay differential against skilled-trade rates makes it hard for colleges to attract industry-experienced staff. This means experienced electricians considering a teaching/assessing route find a welcoming market. For mid-career electricians wanting to step back from full-on site work this is a viable transition; for later-career electricians it's a meaningful way to give back while drawing supplementary income.",
  },
];

const faqs = [
  {
    question: "Can I do TAQA while working full-time as an electrician?",
    answer:
      "Yes — TAQA L3 is typically delivered part-time (evenings or weekends) over 2-3 months. The portfolio of evidence requires you to assess real candidates under observation, which usually means arranging time with a partner training provider. Many colleges run TAQA L3 specifically for working tradespeople wanting to add assessor competence.",
  },
  {
    question: "What's the difference between part-time sessional teaching and full-time lecturing?",
    answer:
      "Sessional = paid by class delivered or by hour, typically without DET requirement, no holiday pay or pension. Full-time = salaried, DET-qualified, college terms and conditions including pension and holidays. Many lecturers start sessional, convert to DET, then move to full-time. Some stay sessional permanently because the flexibility suits continuing trade work.",
  },
  {
    question: "Do I need a degree to become a college lecturer?",
    answer:
      "Not for vocational FE teaching — industry experience plus the L3-L5 teaching qualifications is the standard route. Some lecturer roles in HE (universities, teaching BEng/HND) require degree-level academic qualifications. For the typical FE electrical lecturer role (teaching 2365 or apprenticeship standards) industry experience plus DET is enough.",
  },
  {
    question: "How much TAQA portfolio work is involved?",
    answer:
      "Typical TAQA L3 portfolio: 8-12 assessments of real candidates, observed by your TAQA assessor, with completed evidence packs and reflective notes. Typically 30-50 hours of portfolio work alongside the taught course. Most providers allow 6-12 months to complete the portfolio. Plan it as a serious commitment, not a tickbox.",
  },
  {
    question: "What's the IET role in teaching qualifications?",
    answer:
      "IET doesn't deliver teaching qualifications directly — those are awarded by C&G, NCFE, EAL and similar awarding bodies. IET supports teaching electrical engineering through its IET Academy (online CPD), member events, and professional registration recognition for teaching staff. Many electrical lecturers hold IET MIET membership alongside their teaching qualification.",
  },
  {
    question: "Can I be a college assessor without leaving my current electrical job?",
    answer:
      "Yes — many assessor roles are part-time or sessional, perfectly compatible with continuing electrical work. Typical commitment: 4-8 hours per week of workplace visits and portfolio review. Pay supplements your trade income; flexibility lets you fit it around site work. Talk to your local college or training provider about sessional assessor opportunities.",
  },
];

export default function Sub5() {
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
            eyebrow="Module 7 · Section 2 · Subsection 5"
            title="Teaching / assessing route"
            description="TAQA L3, IQA L4, FE teaching qualifications, college lecturer / assessor / IQA roles, EPAO assessor work — how senior electricians move into teaching and assessing apprentices."
            tone="emerald"
          />

          <TLDR
            points={[
              "TAQA L3 (Training, Assessment and Quality Assurance) is the standard UK assessor qualification — required for paid assessor roles at colleges and EPAO bodies.",
              "IQA L4 (Internal Quality Assurance) is the next-tier qualification — quality-assures assessors. Senior progression beyond TAQA.",
              "FE teaching qualifications (L3 Award / L4 Certificate / L5 Diploma in Education and Training) — DET L5 required for full lecturer roles.",
              "Demand for industry-experienced electrical lecturers and assessors is consistently strong across UK colleges; pay below skilled-trade rates but flexibility and pension benefits attractive.",
              "EPAO assessor work (End-Point Assessment) — independent assessment role; typically TAQA L3 + EPAO-specific training + current industry competence.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO1 / AC 1.7 — explain opportunities for progression within building services engineering, including teaching and assessing routes.",
              "Distinguish between assessor (TAQA L3), IQA (L4), workplace mentor (no formal qualification), and college lecturer (DET L5).",
              "Identify the typical pathway from working electrician to college lecturer (TAQA → L3 Award → DET L5).",
              "State what an EPAO assessor does and how the role differs from a training-provider assessor.",
              "Identify pay, lifestyle and demand realities for teaching and assessing roles.",
              "Identify the role of the senior electrician as Workplace Mentor in the apprenticeship triangle.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The teaching and assessing roles</ContentEyebrow>

          <ConceptBlock
            title="Workplace Mentor → Assessor → Lecturer — the progression"
            plainEnglish="Most experienced electricians who move into teaching start as Workplace Mentors within their employing firm — supporting apprentices on the day-job, signing portfolio entries, attending three-way reviews. From there, formal assessor qualification (TAQA L3) opens paid sessional assessor work with colleges and training providers. Further progression: IQA L4 for quality-assurance roles; FE teaching qualifications (L3 Award → L4 Certificate → L5 Diploma in Education and Training) for full lecturer roles."
            onSite="Each step adds qualifications and unlocks paid opportunities. Many electricians stop at TAQA L3 and do part-time sessional assessing alongside continuing trade work — flexible supplementary income with social purpose. Others continue through to full-time lecturing as a mid-career or later-career transition. The path is structured, well-trodden, and welcoming."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Workplace Mentor
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Day-job mentor for an apprentice. JIB Approved + experience. Unpaid /
                  informally paid through normal employment. No specific qualification.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Assessor (TAQA L3)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Paid assessor for college / training provider / EPAO. Visits workplace,
                  signs portfolio. Sessional or hourly pay (&pound;25-40/hr typical).
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  IQA (L4)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Internal quality assurance &mdash; samples and second-marks assessor work.
                  Senior progression beyond TAQA. Better hourly rates and more flexible.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Lecturer (DET L5)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  FE college lecturer delivering classroom teaching. DET (Level 5 Diploma in
                  Education and Training) typically required. Salary &pound;28-45k typical.
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

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>EPAO assessor work</ContentEyebrow>

          <ConceptBlock
            title="EPAO assessor — independent end-point assessment"
            plainEnglish="EPAOs (End-Point Assessment Organisations) deliver the formal independent assessment at the end of an Apprenticeship Standard — for the Installation and Maintenance Electrician standard the EPA includes the AM2 (delivered by NET), knowledge tests, and a professional discussion. EPAOs hire experienced industry practitioners as assessors on a sessional basis to deliver assessments. Pay is typically per-assessment (£100-300 per assessment day) plus expenses."
            onSite="EPAO assessor work suits experienced electricians with TAQA L3 plus current industry experience. The EPAO trains you on their specific assessment processes; typical commitment is several days per month (variable depending on assessment volumes). Many EPAO assessors do this alongside continuing electrical work — flexible income plus the satisfaction of being part of the apprenticeship infrastructure. Common UK EPAOs for electrical: NET, JTL, City & Guilds, Pearson, ECITB."
          >
            <p>
              Typical EPAO assessor entry path:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>JIB Approved Electrician + 5+ years post-AM2 experience.</li>
              <li>TAQA L3 assessor qualification.</li>
              <li>Application to EPAO of choice (NET, JTL, City &amp; Guilds, etc.).</li>
              <li>EPAO-specific induction and assessor training.</li>
              <li>Initial assessments under observation.</li>
              <li>Full sessional assessor status.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>FE lecturing</ContentEyebrow>

          <ConceptBlock
            title="The lecturer route — DET and the college contract"
            plainEnglish="Full lecturer roles at FE colleges typically require the Level 5 Diploma in Education and Training (DET). The DET sits on top of the L3 Award (introductory) and L4 Certificate (intermediate). Most colleges accept industry-experienced electricians on sessional contracts initially and fund the DET conversion over 1-2 years in return for a service commitment. The transition from skilled-trade work to lecturing involves accepting lower hourly pay in return for the lifestyle benefits — term-time hours, paid holidays, college pension."
            onSite="Many electricians make the transition mid-career (40s-50s) when the physical demands of site work become harder. Others do it later (60s) as a wind-down from full-time trade work. A few do it earlier as a deliberate vocational choice. All routes are valid. The recruitment market is consistently warm because colleges struggle to find industry-experienced staff."
          >
            <p>
              FE teaching qualification ladder:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>L3 Award in Education and Training</strong> &mdash; introductory.
                Typically 2-3 day course; suitable for occasional sessional teaching.
              </li>
              <li>
                <strong>L4 Certificate in Education and Training</strong> &mdash; intermediate.
                Several months part-time. Suitable for regular sessional teaching.
              </li>
              <li>
                <strong>L5 Diploma in Education and Training (DET)</strong> &mdash; full
                lecturer qualification. 1-2 years part-time. Required for permanent
                lecturer roles.
              </li>
              <li>
                <strong>PGCE / Cert Ed</strong> &mdash; equivalent academic teaching
                qualifications, typically university-delivered.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Apprenticeships, Skills, Children and Learning Act 2009 — apprenticeship standards (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The 2009 Act and subsequent Apprenticeship Standards regulations require:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Apprentices to be registered against a recognised English standard (or
                    framework in older arrangements).
                  </li>
                  <li>
                    Off-the-job training delivered through a recognised training provider
                    (typically an FE college or independent training provider).
                  </li>
                  <li>
                    End-Point Assessment delivered by an independent EPAO (separate from
                    the training provider) at the end of the apprenticeship.
                  </li>
                  <li>
                    All assessment carried out by qualified assessors (TAQA L3 or
                    equivalent) under appropriate IQA arrangements.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                The Act establishes the formal infrastructure that makes assessor and lecturer
                roles meaningful careers. Every apprentice in England is going through this
                infrastructure; assessors and lecturers are the people who staff it. Demand is
                structurally permanent because the apprenticeship system depends on it.
              </>
            }
            cite="Source: Apprenticeships, Skills, Children and Learning Act 2009 (c.22) and subsequent Apprenticeship Standards regulations — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="Equality Act 2010 — protected characteristics in education (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The Equality Act 2010 prohibits discrimination on the basis of protected
                  characteristics (age, disability, gender reassignment, race, religion or
                  belief, sex, sexual orientation, marriage and civil partnership, pregnancy
                  and maternity) in education provision and assessment.
                </p>
              </>
            }
            meaning={
              <>
                As a college lecturer or assessor you have a duty to apply the Act in your
                teaching and assessment practice &mdash; reasonable adjustments for disabled
                learners, equal treatment regardless of protected characteristics, inclusive
                content. FE teacher training (DET) covers the Act in detail; assessor
                training (TAQA) covers it more briefly. Treat the Act seriously &mdash;
                discrimination claims by learners can damage your career and the
                college&apos;s.
              </>
            }
            cite="Source: Equality Act 2010 (c.15) — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="ETF (Education and Training Foundation) Professional Standards (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The ETF Professional Standards for Teachers and Trainers in Education and
                  Training set the expected standards of practice:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>Professional values and attributes.</li>
                  <li>Professional knowledge and understanding.</li>
                  <li>Professional skills and practice.</li>
                  <li>Subject specialism and currency.</li>
                  <li>Continuing professional development.</li>
                </ul>
              </>
            }
            meaning={
              <>
                The ETF Professional Standards are the practitioner-level competence standards
                for FE teaching. DET training assesses against them; full lecturer
                appointments expect ongoing CPD against them. As a working electrician moving
                into FE you bring strong subject specialism but typically need to develop the
                pedagogy and the wider professional values &mdash; that&apos;s what DET
                covers.
              </>
            }
            cite="Source: ETF Professional Standards for Teachers and Trainers in Education and Training (current edition) — paraphrased from publicly-available ETF guidance at et-foundation.co.uk."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Assuming you can lecture without DET because you have industry experience"
            whatHappens={
              <>
                Senior electrician approaches local college about lecturing. College welcomes
                the industry experience but explains that permanent lecturer roles require
                DET (L5 Diploma in Education and Training). Electrician dismisses this as
                bureaucracy and focuses only on sessional opportunities. Five years later
                they&apos;re still on sessional pay rates with no progression because they
                never converted to DET. Permanent lecturer salary, holidays and pension stay
                out of reach.
              </>
            }
            doInstead={
              <>
                Treat DET as a strategic CPD investment if you&apos;re serious about a
                lecturer career. 1-2 years part-time alongside sessional teaching. Many
                colleges fund the conversion in return for service commitment. The pay and
                conditions uplift from sessional to permanent lecturer is significant
                (sessional &pound;30-50/hr no benefits → permanent salaried &pound;28-45k
                with pension and holidays). Worth the investment.
              </>
            }
          />

          <Scenario
            title="You're 45 with 25 years on site — should you transition to teaching?"
            situation={
              <>
                You&apos;re 45, JIB Approved Electrician with 25 years of experience
                (apprenticeship from 16, AM2 at 20, Approved at 25). The site work is
                getting physically harder. Your knees are protesting. Your local college has
                advertised for sessional electrical lecturers. You&apos;ve never taught but
                you&apos;ve mentored several apprentices over the years. Should you make the
                transition?
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; trial the territory</strong>. Approach the college
                about sessional teaching first. Don&apos;t commit to full transition.
                You&apos;ll discover within 6 months whether you enjoy teaching and whether
                you can hold an evening class&apos;s attention.
                <br /><br />
                <strong>Step 2 &mdash; do TAQA L3 first</strong>. Lower commitment than DET,
                useful for assessor work even if teaching doesn&apos;t fit. &pound;600-1,200
                investment, 5-10 days, opens paid assessor work. If teaching also fits, build
                on it; if not, you have an assessor career.
                <br /><br />
                <strong>Step 3 &mdash; check the financial transition realistically</strong>.
                Skilled-trade earnings at 25-years experience are typically &pound;45-55k
                (full-time JIB Approved). Sessional teaching at 4-8 hours/week supplements
                this; full-time lecturing replaces about 60-70% of skilled-trade earnings
                with college terms and conditions. Plan the transition over 2-3 years rather
                than overnight.
                <br /><br />
                <strong>Step 4 &mdash; budget for DET if you commit</strong>. If trial works
                and you want full transition, plan DET conversion (1-2 years part-time).
                Many colleges fund it in return for service commitment. Worth confirming
                arrangement before starting.
                <br /><br />
                <strong>Step 5 &mdash; keep the trade hand in</strong>. Many lecturers
                continue some trade work (limited domestic sole-trader work, weekend
                installs) to keep skills current and maintain industry credibility. Your
                students benefit from up-to-date knowledge; your bank balance benefits from
                supplementary income.
              </>
            }
            whyItMatters={
              <>
                The mid-career transition from skilled trade to teaching is a meaningful and
                well-trodden path. The pay differential is real but the lifestyle (term-time
                hours, holidays, pension, no more knees on hard floors) often makes the
                trade worthwhile. The college recruitment market is consistently warm for
                experienced electricians. Plan the transition deliberately rather than
                drifting; trial sessional teaching before committing to DET.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>The teaching career anatomy</ContentEyebrow>

          <ConceptBlock
            title="TAQA L3 vs IQA L4 — what each lets you actually do"
            plainEnglish="The TAQA (Training, Assessment, Quality Assurance) suite from City & Guilds and Pearson is the standard UK assessor and verifier qualification stack. TAQA L3 Award in Assessing Vocationally Related Achievement is the entry-level — lets you assess apprentices' workplace competence (signing portfolio entries, witness testing on apprentice work). TAQA L3 Certificate adds breadth across multiple assessment methods. IQA L4 (Internal Quality Assurance) is a step up — lets you quality-assure other assessors' work, run internal verification of standards. Course costs ~£400-700 each, typically 4-8 weeks part-time blended learning."
            onSite="TAQA L3 is the minimum qualification for college-employed assessor roles and EPAO assessor work. Many electricians start with TAQA L3 to do part-time apprentice assessment work on top of their day job — paying £150-220/day for assessment site visits. IQA L4 is the next step for those moving into Lead Assessor or Quality Lead roles within colleges or training providers. Both qualifications are widely available through colleges, NICEIC, NAPIT and private training providers. Plan to add TAQA L3 around year 5-7 post-AM2 if teaching/assessing interests you."
          >
            <p>
              TAQA / IQA qualification stack:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TAQA L3 Award</strong> &mdash; assess vocationally related achievement (entry-level).
              </li>
              <li>
                <strong>TAQA L3 Certificate</strong> &mdash; assessing multi-method (workplace + simulated).
              </li>
              <li>
                <strong>IQA L4 Award</strong> &mdash; lead internal quality assurance.
              </li>
              <li>
                <strong>IQA L4 Certificate</strong> &mdash; lead a team of assessors.
              </li>
              <li>
                <strong>Cost</strong> &mdash; ~&pound;400&ndash;700 each, 4&ndash;8 weeks part-time.
              </li>
              <li>
                <strong>Day rates (assessment)</strong> &mdash; &pound;150&ndash;220/day part-time, salaried ~&pound;28&ndash;38k full-time.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="DET / Cert Ed — the FE teaching qualifications and what they unlock"
            plainEnglish="The Diploma in Education and Training (DET, formerly DTLLS) is the standard UK qualification for FE teaching — typically 2 years part-time, ~£3-4k tuition fee, often employer-funded. The PGCE (Post-Graduate Certificate in Education) is the graduate route into teaching, available in 1-year full or 2-year part-time formats. Both lead to QTLS (Qualified Teacher Learning and Skills) status with the Society for Education and Training. QTLS is recognised as equivalent to QTS (Qualified Teacher Status) in schools by reciprocal arrangement, opening cross-sector mobility."
            onSite="College lecturer salaries on the QTLS-band scale typically run £30-48k for new lecturers, £42-58k experienced, £55-72k senior/Course Leader, £65-85k Curriculum Manager / Head of Department. Add 7-13 weeks paid holiday, predictable hours (term-time delivery + planning), pension scheme (typically Teachers' Pension Scheme — defined benefit, valuable). The pay is often lower than industry but the total package (pension, holiday, hours, no physical wear-and-tear) often makes the lifetime maths favourable. Plan transition deliberately — trial sessional teaching at your local college before committing to DET."
          >
            <p>
              FE teaching qualification routes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PTLLS / Award in Education and Training</strong> &mdash; sessional teaching entry, ~&pound;400, 1&ndash;2 weeks.
              </li>
              <li>
                <strong>CTLLS / Certificate in Education and Training</strong> &mdash; part-time teaching role, ~&pound;1,200, 4&ndash;6 months.
              </li>
              <li>
                <strong>DET / Diploma in Education and Training</strong> &mdash; full FE lecturer role, ~&pound;3&ndash;4k, 2yr part-time.
              </li>
              <li>
                <strong>PGCE</strong> &mdash; graduate route, 1yr full or 2yr part-time.
              </li>
              <li>
                <strong>QTLS via SET</strong> &mdash; final professional status, recognised as QTS-equivalent.
              </li>
              <li>
                <strong>Salary band</strong> &mdash; &pound;30&ndash;85k depending on role and seniority.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="EPAO assessor work — the modular income stream"
            plainEnglish="End-Point Assessment Organisations (EPAOs — JTL, NET, City & Guilds and others) deliver the EPA for the Installation and Maintenance Electrician apprenticeship standard. EPAOs require a register of independent assessors — typically experienced Approved Electricians with TAQA L3 plus AM2 experience. Assessor work is paid per assignment (typically £180-280/day at AM2 centres, plus travel) and is a flexible income stream that fits alongside full-time work. Most EPAO assessors are mid-career senior electricians who do 20-50 assessment days/year on top of their main role."
            onSite="To register as an EPAO assessor: hold AM2 yourself plus several years post-AM2 install experience, hold TAQA L3 (or equivalent assessor qualification), apply directly to the EPAO (JTL, NET, City & Guilds), pass a vetting process including occupational competence verification and assessment trial. Once registered you're called for available assessment slots. Steady supplementary income, contributes to industry knowledge, and counts toward CPD. Many electricians use EPAO assessor work as a soft transition into full-time teaching/assessing later."
          >
            <p>
              EPAO assessor route:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Prerequisites</strong> &mdash; AM2-passed, 5+yr post-AM2 experience, TAQA L3.
              </li>
              <li>
                <strong>Apply to EPAO</strong> &mdash; JTL, NET, City &amp; Guilds, others.
              </li>
              <li>
                <strong>Vetting</strong> &mdash; occupational competence verification, assessment trial.
              </li>
              <li>
                <strong>Pay</strong> &mdash; ~&pound;180&ndash;280/day at AM2 centres + travel.
              </li>
              <li>
                <strong>Volume</strong> &mdash; typically 20&ndash;50 days/year per assessor.
              </li>
              <li>
                <strong>Lifestyle</strong> &mdash; flexible, fits alongside main role, contributes to CPD.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The college recruitment market — why FE colleges always need experienced electricians"
            plainEnglish="UK FE colleges have a chronic recruitment challenge for trade lecturers — the pay differential between industry and teaching deters mid-career recruits, and the qualifications stack (DET, QTLS) takes 2 years to acquire alongside teaching. Most colleges run with vacancy rates in trade departments. This means experienced electricians who can teach are consistently in demand — sessional work is almost always available, full-time roles open regularly, and colleges often fund DET fees and offer phased transitions (4 days teaching + 1 day still on tools) to ease the move."
            onSite="If teaching interests you, ring your local FE college's electrical department directly and ask about sessional work. A typical conversation: 'I'm an Approved Electrician with X years post-AM2 — do you need cover for evening classes or AM2 prep sessions?' Sessional teaching pays ~£25-40/hr, fits flexibly around your main job, and tells you whether you actually enjoy teaching before committing to DET. Most full-time college lecturers started with sessional work. The college funding model rewards lecturer retention, so they'll often invest in your DET fees in exchange for a 2-3 year retention agreement."
          >
            <p>
              Routes into FE college teaching:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sessional / hourly paid</strong> &mdash; trial teaching, ~&pound;25&ndash;40/hr, no DET required initially.
              </li>
              <li>
                <strong>Part-time technician / instructor</strong> &mdash; 0.4&ndash;0.6 FTE, often blended with industry work.
              </li>
              <li>
                <strong>Fractional lecturer + DET in progress</strong> &mdash; college funds DET in exchange for retention.
              </li>
              <li>
                <strong>Full lecturer (post-DET)</strong> &mdash; 1.0 FTE, full QTLS-band salary.
              </li>
              <li>
                <strong>Course Leader / Curriculum Manager</strong> &mdash; senior FE roles, &pound;55&ndash;85k.
              </li>
              <li>
                <strong>Independent training provider</strong> &mdash; alternative employer to FE colleges.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The total package — why teaching pay isn't directly comparable to industry pay"
            plainEnglish="A college lecturer at £45k with Teachers' Pension Scheme (employer contribution typically ~28%, defined-benefit), 13 weeks paid holiday, predictable term-time hours and indoor work has a total compensation that often exceeds a £55-60k industry electrician once pension value, holiday, and lifestyle factors are properly accounted for. The Teachers' Pension Scheme is unusually valuable in the modern UK pension landscape — calculating its 'cash equivalent' value adds typically £8-15k/year of effective compensation. Most mid-career electricians considering teaching only do the headline-pay comparison and miss the full picture."
            onSite="When evaluating a teaching move, build the actual total compensation model: salary + pension contribution × multiplier + holiday × daily rate + reduced commute / travel costs + value of physical wear avoided. Many electricians who make the move report that despite a £8-15k headline pay drop, their net financial position is broadly equivalent and their lifestyle is materially better. The trade-off is autonomy — teaching is more bureaucratic than self-employed contracting and the college calendar dictates much of your year. Suits people who like structure and predictability."
          >
            <p>
              Total compensation comparison checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Headline salary</strong> &mdash; obvious but only ~60% of total compensation.
              </li>
              <li>
                <strong>Pension contribution</strong> &mdash; TPS ~28% employer + ~9% employee = ~37% total of pensionable salary.
              </li>
              <li>
                <strong>Holiday</strong> &mdash; 13 weeks paid term-time vs 5.6 weeks statutory + JIB top-up.
              </li>
              <li>
                <strong>Sick pay</strong> &mdash; full pay typically for 6 months, half pay for further 6 months.
              </li>
              <li>
                <strong>Travel</strong> &mdash; one location vs site-to-site travel cost and time.
              </li>
              <li>
                <strong>Physical wear</strong> &mdash; indoor classroom vs sustained physical site work.
              </li>
              <li>
                <strong>Career horizon</strong> &mdash; teaching often runs longer (60s+) than physical site work.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "TAQA L3 is the entry assessor qualification — required for paid assessor roles at colleges, training providers and EPAO bodies. £600-1,200, 5-10 days plus portfolio.",
              "IQA L4 is the next-tier qualification — quality-assures assessor work. Senior progression beyond TAQA.",
              "FE teaching: L3 Award (intro) → L4 Certificate (intermediate) → L5 Diploma in Education and Training (DET, full lecturer qualification).",
              "Lecturer route: TAQA L3 → L3 Award → sessional teaching → DET → permanent lecturer. Many colleges fund DET conversion in return for service commitment.",
              "EPAO assessor work — independent end-point assessment for Apprenticeship Standards. Sessional pay; typical entry TAQA L3 + EPAO-specific training + current industry experience.",
              "Workplace Mentor is the entry point — JIB Approved + experience, no specific qualification. Often the first taste of mentoring that leads to assessor or lecturer roles.",
              "Demand for industry-experienced electrical lecturers and assessors is consistently strong; pay below skilled-trade rates but lifestyle benefits attractive for mid-career transition.",
              "Equality Act 2010 and ETF Professional Standards apply to all teaching/assessing practice; DET training covers in detail.",
            ]}
          />

          <Quiz title="Teaching / assessing route — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section2-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.4 Specialised routes
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 3 — Setting up a business
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
