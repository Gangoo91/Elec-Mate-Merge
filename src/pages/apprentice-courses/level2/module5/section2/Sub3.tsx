/**
 * Module 5 · Section 2 · Subsection 3 — HSE vs Local Authority enforcement
 * Supplementary content — extends Unit 210 LO2 but is not directly mapped
 * to a 210 AC. Builds the enforcement layer on top of AC 2.1 (Sub 1) and
 * the personal-duty layer (Sub 2).
 *
 * Frame: who actually turns up after an incident? HSE inspectors handle
 * higher-risk premises; Local Authority Environmental Health Officers
 * handle lower-risk. Their powers (s.20 entry, s.21 improvement notice,
 * s.22 prohibition notice, s.33 prosecution) are largely the same. RIDDOR
 * 2013 is the reporting bridge that brings them in.
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
  'HSE vs Local Authority enforcement (2.3) | Level 2 Module 5.2.3 | Elec-Mate';
const DESCRIPTION =
  'Who turns up after an incident — HSE inspectors for higher-risk premises, Local Authority EHOs for lower-risk. Powers under HASAWA s.20-22 and s.33, RIDDOR 2013 reporting and what triggers a visit.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s2-sub3-who-enforces',
    question:
      "You're working on a small electrical fault on the shop-floor of an independent newsagent. There's a near-miss — a colleague gets a small shock from poor isolation. Who is the enforcing authority for the H&S investigation?",
    options: [
      "The Health and Safety Executive (HSE). All electrical incidents are enforced by the HSE regardless of where they happen, because electricity is a specialist higher-risk hazard. The type of premises is irrelevant once electricity is involved — a shock on a shop floor is treated exactly the same as one in a factory, and an HSE inspector always takes the lead.",
      "The local Building Control body for the area. Because the newsagent is a building, any incident inside it falls to Building Control, who investigate the electrical installation against the Building Regulations and decide whether enforcement is needed. Building Control is the default enforcer for anything happening within commercial premises.",
      "The distribution network operator (DNO) for the area. As the body responsible for the electricity supply, the DNO investigates any electrical incident on its network's downstream installations under ESQCR, and decides whether to refer the matter on. The DNO is the first enforcer for any shock or fault in a retail premises.",
      "Local Authority — Environmental Health Officers from the local council. The Health and Safety (Enforcing Authority) Regulations 1998 split enforcement based on the main activity of the premises. Retail (shops, offices, hotels, restaurants, leisure) goes to the Local Authority. Higher-risk premises (factories, construction sites, hospitals, schools, mines) go to the HSE.",
    ],
    correctIndex: 3,
    explanation:
      "The 1998 Enforcing Authority Regulations are the split-rules. Retail premises (newsagent, shop, hotel, office, restaurant, leisure) are Local Authority; factories, construction sites, hospitals, schools and similar higher-risk premises are HSE. The powers under HASAWA are the same — both can serve s.21 / s.22 notices, both can prosecute under s.33. So the practical experience for the firm and the apprentice is similar regardless of which enforcer turns up; the enforcer's name on the notice is what differs.",
  },
  {
    id: 'mod5-s2-sub3-improvement-vs-prohibition',
    question:
      "What's the difference between an Improvement Notice and a Prohibition Notice under HASAWA?",
    options: [
      "An Improvement Notice is served by the HSE for a serious breach, while a Prohibition Notice is served by the Local Authority for a minor one — the two names simply reflect which enforcing body issued the notice. Both give the duty-holder the same 21 days to comply, and neither requires the activity to stop while the work is put right.",
      "An Improvement Notice (s.21) is served when the inspector believes a Regulation has been breached and the duty-holder is given a period (minimum 21 days) to put it right. A Prohibition Notice (s.22) is served when the inspector believes there's a risk of SERIOUS PERSONAL INJURY from a specific activity — the activity must stop immediately or by a stated time. Failure to comply with either is a separate criminal offence; both appear on the public HSE Notices database.",
      "An Improvement Notice requires the activity to stop immediately, while a Prohibition Notice merely gives advice the duty-holder is free to ignore. The Improvement Notice is therefore the more serious of the two, and an inspector reaches for it only where there is an immediate risk of death, leaving the Prohibition Notice for routine paperwork failings.",
      "An Improvement Notice can only be issued to a limited company, while a Prohibition Notice can only be issued to a sole trader or self-employed person. The two notices split duty-holders by business structure rather than by the nature of the breach, so the inspector picks the notice based on how the firm is registered.",
    ],
    correctIndex: 1,
    explanation:
      "Improvement Notice = put it right within a period (21 days or longer). Prohibition Notice = stop NOW because someone could get seriously hurt. The trigger is different — Improvement is about a regulatory breach; Prohibition is about a real, immediate risk of serious personal injury. The published-on-the-public-database point is important commercially — both notices show up on tender questionnaires for years afterwards and can cost the firm contracts long after the underlying issue has been fixed.",
  },
  {
    id: 'mod5-s2-sub3-riddor-reportable',
    question:
      "An apprentice cuts their hand badly on a metal trunking edge while pulling cable. They need stitches and are signed off by their GP for 10 working days. Is this RIDDOR-reportable, and who reports it?",
    options: [
      "Yes — reportable as an over-7-day incapacitation injury under RIDDOR 2013 Reg 6. The 'responsible person' (usually the employer) makes the report within 15 days of the accident, via the F2508 form on hse.gov.uk. The apprentice tells the supervisor; the firm's H&S contact files the report. Failure to report when required is itself a criminal offence under RIDDOR.",
      "No — only injuries that put a worker in hospital overnight are RIDDOR-reportable. Because the apprentice was treated and discharged on the same day, the cut falls below the threshold, so no report is needed and the firm simply records it in the internal accident book.",
      "No — RIDDOR only covers injuries caused by electricity, not mechanical injuries like cuts and grazes. As the wound came from a metal edge rather than a shock, it sits outside the Regulations entirely, and the apprentice just needs a first-aid entry rather than a report to the HSE.",
      "Yes — but the apprentice must report it themselves, in person, to the HSE within 24 hours. The duty to report falls on the injured worker rather than the employer, and missing the 24-hour window leaves the apprentice personally liable to prosecution under RIDDOR.",
    ],
    correctIndex: 0,
    explanation:
      "RIDDOR 2013 Reg 4 covers specified injuries (amputation, fracture other than fingers/toes/thumbs, etc.). Reg 6 covers over-7-day incapacitation — accidents that result in a worker being unable to do their normal work for more than 7 consecutive days (excluding the day of the accident, including weekends). A 10-day signed-off absence is squarely Reg 6. The 'responsible person' is the employer. The apprentice's job is to tell the supervisor at the time and again when the GP signs them off; the firm files the F2508. Late or missing reports are themselves criminal offences and they're a common HSE prosecution route on top of the underlying incident.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Which body is the primary enforcement authority for HASAWA on a construction site?",
    options: [
      "The Local Authority Environmental Health team. Construction work is consumer-facing and lower-risk, so under the 1998 Enforcing Authority Regulations it is allocated to the council's EHOs, who take the lead on any site incident and enforce the H&S regime on the contractor's behalf.",
      "The Health and Safety Executive (HSE). Construction sites are higher-risk premises under the Health and Safety (Enforcing Authority) Regulations 1998, so HSE inspectors take the lead. They enforce HASAWA, EAWR, CDM 2015, MHSWR, COSHH, RIDDOR and the rest of the workplace H&S regime on site.",
      "The principal contractor's own safety department. On a construction site the duty to enforce HASAWA is delegated to the principal contractor under CDM 2015, so it is their in-house team rather than any external body that investigates incidents and issues notices to sub-contractors.",
      "Building Control. Because a construction site produces a building, Building Control is the enforcing authority for HASAWA on site, investigating incidents against the Building Regulations and the Approved Documents as work proceeds towards completion.",
    ],
    correctAnswer: 1,
    explanation:
      "Construction is one of the HSE's headline focus areas. CDM 2015 is the construction-specific SI, but HSE inspectors enforce the whole H&S regime — not just CDM. After a serious incident on a construction site, HSE inspectors will also liaise with police (especially in fatality cases for potential corporate manslaughter), Building Control (for any structural / building-regs angle) and the fire and rescue service if there was a fire — but the lead H&S enforcement is HSE.",
  },
  {
    id: 2,
    question:
      "Which body enforces HASAWA in retail premises like an independent shop, an office or a hotel?",
    options: [
      "The Health and Safety Executive (HSE). The HSE is the sole enforcing authority for HASAWA across every type of workplace, and Local Authorities have no H&S enforcement role at all — their officers deal only with food hygiene and pollution, never with workplace safety in shops, offices or hotels.",
      "No single body — retail premises are exempt from HASAWA enforcement because the public, not employees, are the main people present. Shops, offices and hotels fall outside the workplace H&S regime, so any safety failing there is dealt with under consumer-protection law instead.",
      "The Local Authority — specifically the Environmental Health team of the local council. The Health and Safety (Enforcing Authority) Regulations 1998 allocate retail, office, leisure, residential care, places of worship and similar lower-risk premises to local-authority enforcement. EHOs have the same HASAWA powers as HSE inspectors — entry, inspection, notices, prosecution.",
      "The Care Quality Commission and equivalent sector regulators. Because shops, offices and hotels are service businesses, their workplace safety is policed by whichever industry regulator licenses them rather than by a general H&S enforcer, with each sector answering to its own watchdog.",
    ],
    correctAnswer: 2,
    explanation:
      "The 1998 Enforcing Authority split is part of the H&S system. Local Authorities handle the lower-risk premises (where most of the public are present but the work activity is itself lower-hazard). HSE handles the higher-risk premises. Both have full HASAWA powers under s.20 (entry and inspection), s.21 (Improvement Notice), s.22 (Prohibition Notice) and s.33 (prosecution). For an electrician working across both kinds of premises, the practical day-to-day is the same; the name on any notice will be 'HSE' or 'XYZ Council Environmental Health'.",
  },
  {
    id: 3,
    question:
      "An HSE inspector arrives unannounced at a job site. What can they lawfully do under HASAWA s.20?",
    options: [
      "Nothing without the duty-holder's consent — an inspector has no right of entry of their own and must give at least 48 hours' written notice before visiting. If the firm refuses access, the inspector can only ask a court to arrange a future appointment; they cannot enter unannounced or compel anyone to answer questions on the spot.",
      "Only observe from the public areas of the site and request documents by post afterwards. Under s.20 an inspector may look but not touch — they cannot take photographs, samples or statements, and any evidence has to be supplied voluntarily by the firm in its own time rather than seized during the visit.",
      "Enter, but only if accompanied by a police officer with a warrant obtained in advance. The inspector's powers are limited to whatever the warrant specifies, and without one they can do no more than leave a contact card asking the duty-holder to get in touch to arrange a formal interview later.",
      "Wide investigative powers — enter any premises (without warrant) at any reasonable time, take measurements / photographs / samples, inspect documents, require people to answer questions, take statements, take possession of articles or substances they think pose a risk, and seek a magistrate's warrant if entry is refused. Failure to co-operate is itself a separate criminal offence under s.33.",
    ],
    correctAnswer: 3,
    explanation:
      "HASAWA s.20 gives inspectors deliberately broad investigative powers. They don't need a warrant to enter — they have right of entry by Act. They can compel answers, take samples, seize evidence and demand documents. Refusing to answer or obstructing the inspector is a separate criminal offence under HASAWA s.33. As an apprentice on site during an unannounced inspection, the right approach is co-operate fully, answer questions truthfully, and don't volunteer opinions — let the firm's H&S contact handle the substantive engagement once they arrive.",
  },
  {
    id: 4,
    question:
      "When does an Improvement Notice take effect, and what's the minimum compliance period?",
    options: [
      "Effective from the date served (or the date specified on the notice). Minimum compliance period is 21 days — the inspector can specify a longer period if the remediation is more involved. The notice can be appealed to an Employment Tribunal within 21 days; appeal suspends the notice. If unappealed and uncomplied with, failure to comply is itself a criminal offence under HASAWA s.33.",
      "Effective immediately on issue, with a fixed compliance period of 24 hours in every case. The inspector has no discretion to extend the period and there is no right of appeal — the duty-holder must put the breach right by the following day or face automatic prosecution.",
      "Effective only after a 28-day grace period during which the duty-holder may continue the activity unchanged. The minimum compliance period is then a further 3 months, and the notice cannot be enforced until both periods have run, giving firms several months before any action is required.",
      "Effective from the date of the next scheduled HSE inspection rather than the date served, with no minimum compliance period set in law — the duty-holder simply fixes the breach before the inspector returns, and only a repeat finding at that later visit can lead to enforcement.",
    ],
    correctAnswer: 0,
    explanation:
      "21 days is the minimum compliance period to give the duty-holder a fair chance to fix the issue and to lodge an appeal if they think the notice is wrong. The Employment Tribunal hears appeals against H&S notices. In practice, most Improvement Notices are accepted and complied with — appeals are rare and rarely successful. The notice and any appeal outcome appear on the public HSE Notices database. For tender questionnaires that ask 'have you received any H&S notices in the last 5 years?', the answer is 'yes' for any notice on that database — which is why firms work hard to avoid them in the first place.",
  },
  {
    id: 5,
    question:
      "When is a Prohibition Notice (HASAWA s.22) appropriate, and what's the effect?",
    options: [
      "When the inspector wants to give the duty-holder time to put a paperwork breach right. The notice prohibits nothing — it simply records that a regulation has been breached and sets a deadline, usually 21 days, after which the inspector returns to check the record-keeping has been brought up to date.",
      "When the inspector believes a specific activity involves or will involve a risk of SERIOUS personal injury. The notice prohibits the activity (immediately, or from a stated time) until the risk has been remedied. Like an Improvement Notice, it can be appealed to an Employment Tribunal within 21 days — but the appeal does NOT suspend the notice (unlike an Improvement Notice). The activity must stop while the appeal is heard.",
      "When a firm has already been convicted of a previous offence. The notice is a sentencing tool used only by the courts after a prosecution, banning the firm from a category of work for a fixed term, and an inspector on site has no power to issue one during an ordinary visit.",
      "When the inspector wants to seize a piece of equipment as evidence. The notice transfers ownership of the item to the HSE for the duration of the investigation, and the activity can continue as normal once replacement equipment is brought in, since the notice attaches to the article rather than the work.",
    ],
    correctAnswer: 1,
    explanation:
      "The Prohibition Notice is the heavier weapon. It bites immediately because the inspector believes there's a real risk of serious harm. The fact that an appeal does NOT suspend the notice (whereas an Improvement Notice appeal does) reflects the urgency. Real-world examples for an electrical contractor — Prohibition Notice on a site where unsafe live working has been observed, Prohibition Notice on a piece of damaged work equipment, Prohibition Notice on an unsafe access platform. Trading on the Prohibition'd activity while the notice is in force is a serious criminal offence on top of the underlying breach.",
  },
  {
    id: 6,
    question:
      "RIDDOR 2013 — what's a 'specified injury' and how is it different from over-7-day incapacitation?",
    options: [
      "A specified injury is any injury that needs hospital treatment, while over-7-day incapacitation is any injury treated on site by a first-aider. The two categories split by where the casualty was treated rather than by the type of injury, so an A&E visit always makes an injury 'specified' regardless of severity.",
      "A specified injury is one caused by the duty-holder's negligence, while over-7-day incapacitation is one caused by the worker's own carelessness. RIDDOR sorts injuries by who was at fault, and only specified injuries — where the employer is to blame — actually have to be reported to the HSE.",
      "Specified injuries (RIDDOR Reg 4) are the most serious named injuries — fatalities, fractures other than to fingers/toes/thumbs, amputations, loss of sight, scalpings, serious burns, crush injuries, unconsciousness from electric shock, and so on. They must be reported as soon as possible and within 10 days. Over-7-day incapacitation (Reg 6) is when a worker is off normal work for more than 7 consecutive days (excluding accident day, including weekends) — must be reported within 15 days. Different categories, different timeframes, both reportable.",
      "A specified injury is one that happens to an employee, while over-7-day incapacitation is one that happens to a member of the public. The two categories divide casualties by employment status, so the same injury is reported under different regulations depending on whether the injured person worked for the firm.",
    ],
    correctAnswer: 2,
    explanation:
      "RIDDOR has multiple reporting categories — specified injuries (Reg 4, the most serious named list), over-7-day incapacitation (Reg 6), occupational diseases (Reg 8), dangerous occurrences (Reg 7) and gas incidents (Reg 11). Each has its own threshold and timeframe. An apprentice should know that ANY workplace injury serious enough to need medical attention is potentially reportable — the answer to 'is it RIDDOR?' is for the firm's H&S contact to decide, but the apprentice's job is to tell them at the time. Failure to report is a criminal offence in itself under RIDDOR Reg 12.",
  },
  {
    id: 7,
    question:
      "What's a 'dangerous occurrence' under RIDDOR 2013 — and is an electrical incident on a fixed installation likely to count?",
    options: [
      "A 'dangerous occurrence' is any event that causes more than £1,000 of damage to equipment, whether or not anyone was hurt. The threshold is purely financial, so an electrical fault that wrecks a distribution board is reportable on cost alone, while a near-miss that damages nothing never qualifies however serious the potential.",
      "A 'dangerous occurrence' is an injury that keeps a worker off for more than 3 days. It is simply the old name for the over-3-day reporting category, so an electrical incident only counts if someone was actually hurt and then absent — a near-miss with no injury is never a dangerous occurrence.",
      "A 'dangerous occurrence' is any incident the firm chooses to log in its internal accident book. It has no statutory definition and no external reporting duty — the term just describes whatever the employer decides is worth recording, so an electrical near-miss is reportable only if company policy says so.",
      "RIDDOR Reg 7 specifies a list of 'dangerous occurrences' that must be reported even if no-one was hurt — they're near-misses with serious potential. The list (RIDDOR Schedule 2) includes electrical short circuits or overloads that cause a fire or explosion, certain types of plant collapse, scaffolding failure, dangerous occurrences in or near a pipeline, and so on. So yes — an electrical incident causing fire or explosion in a fixed installation is reportable as a dangerous occurrence even with no injury.",
    ],
    correctAnswer: 3,
    explanation:
      "The 'dangerous occurrences' regime exists because near-misses are the leading indicator of next month's actual injury or fatality. Reporting them gives the HSE the data to spot industry-wide problems and act before the next incident. For electrical work specifically, an installation fire, an explosion in switchgear, a serious failure of a cable termination — all reportable under Reg 7 even with no immediate injury. The firm's H&S contact files the F2508; the apprentice's job is to make sure the supervisor is told at the time so the report can be made.",
  },
  {
    id: 8,
    question:
      "After a serious electrical incident on a construction site, in what order do the enforcement and supporting bodies typically engage?",
    options: [
      "Multiple bodies. (1) Emergency services — ambulance / fire / police as appropriate at the time. (2) Police — investigate scene, especially in fatalities (corporate manslaughter / individual gross-negligence manslaughter potential). (3) HSE — H&S investigation (HASAWA, EAWR, CDM, MHSWR, RIDDOR). (4) Building Control — where there's a building-regs / structural angle. (5) DNO — if mains supply was involved (ESQCR). (6) Insurers — both the firm's and the client's. The HSE and police typically work in parallel, especially after fatal incidents.",
      "Only the HSE engages, and it does so alone. After a serious site incident the HSE takes sole charge — the police are barred from attending an industrial scene, Building Control and the DNO have no role, and insurers are not informed until the HSE has closed its file, so a single body handles everything from start to finish.",
      "The DNO leads, then hands over to the HSE. Because most site incidents involve the electricity supply, the distribution network operator investigates first under ESQCR and only refers the matter to the HSE if it finds a breach, with the police and insurers playing no part unless the DNO asks them to.",
      "Building Control engages first, then the council's planning department. As the bodies that approved the building work, they investigate any site incident in sequence to check the structure against the Approved Documents, and the HSE only becomes involved on appeal if the contractor disputes their findings.",
    ],
    correctAnswer: 0,
    explanation:
      "Real incidents trigger a cascade of investigations, not a single one. The apprentice's role at the time is co-operate, answer truthfully, don't speculate. Statements taken at the time can become evidence in any subsequent prosecution — speculation or guesses dressed up as fact can return to haunt the firm and the individual. The firm's H&S manager and / or solicitors will typically engage with the formal investigation; the apprentice tells what they saw and did, without embellishment.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "If a near-miss happens on site and no-one is hurt, does it really need reporting?",
    answer:
      "Depends on what kind of near-miss. RIDDOR 2013 Reg 7 lists specific 'dangerous occurrences' that ARE reportable even with no injury — including electrical short circuits or overloads causing fire or explosion, certain plant collapses, scaffolding failures and a defined list of others. If the near-miss falls in that list, it's reportable. If it doesn't, RIDDOR doesn't mandate a report, but the firm's internal near-miss reporting system should still capture it. Near-misses are the leading indicator of next month's actual injury or fatality — ignoring them is exactly how an injury becomes inevitable.",
  },
  {
    question: "If the HSE inspector turns up unannounced, am I obliged to talk to them?",
    answer:
      "You're obliged to co-operate under HASAWA s.20 — the inspector has powers to require you to answer questions and to take a statement. Refusing or obstructing is a separate criminal offence under HASAWA s.33. So yes, you co-operate. But you don't have to volunteer speculation or opinions — you answer questions about what you saw, did and were told, factually and accurately. If a question is outside your knowledge, say so. Anything you say can be used in evidence later. The right approach is be polite, be factual, don't embellish, and let the firm's H&S contact / solicitor handle the substantive engagement once they arrive.",
  },
  {
    question: "Can the HSE / Local Authority issue notices against me personally as an apprentice?",
    answer:
      "Improvement Notices and Prohibition Notices are typically served on the duty-holder responsible for the activity (usually the employer). But where an individual operative is the source of the breach — e.g. defeating a control, working unsafely — the inspector can ALSO charge that individual under HASAWA s.7 / EAWR Reg 3 / s.33. So a Prohibition Notice probably goes to the firm; a personal prosecution can be brought against the apprentice on the same set of facts. The two are not mutually exclusive.",
  },
  {
    question: "What's the practical difference between dealing with the HSE and dealing with the Local Authority?",
    answer:
      "The legal powers are nearly identical — both have HASAWA s.20-22 / s.33 in full. The cultural difference is that HSE inspectors are H&S specialists with a national focus and tend to deal with bigger, higher-risk cases. Local Authority EHOs are environmental-health generalists with a local focus — they may also handle food hygiene, pollution and noise nuisance. So HSE involvement often signals a more serious case, more specialist scrutiny and (statistically) a higher prosecution rate. EHO involvement on a retail-premises electrical incident is more likely to result in advice and an Improvement Notice. But both can prosecute, and both can secure custodial sentences in serious cases.",
  },
  {
    question: "What's the relationship between RIDDOR reporting and the underlying H&S investigation?",
    answer:
      "RIDDOR is the trigger. The F2508 report goes into the HSE / Local Authority systems and feeds the decision on whether to investigate further. Most over-7-day reports don't result in an investigation — the HSE lacks the resources to investigate everything, so they triage by severity, sector and pattern. Specified injuries, fatalities and dangerous occurrences are much more likely to attract a full investigation. So the fact that the apprentice's 10-day-off cut hand was reported under Reg 6 doesn't automatically mean an inspector will visit — but if the same firm has had three over-7-day reports in six months, that pattern probably triggers a visit.",
  },
  {
    question: "If the firm fails to report a RIDDOR-reportable incident, is the apprentice in trouble?",
    answer:
      "The 'responsible person' duty under RIDDOR Reg 4 / 6 / 7 sits on the employer (or self-employed person), not on the apprentice. So if the firm fails to file the F2508, the firm faces the RIDDOR Reg 12 prosecution, not the apprentice. BUT — the apprentice's job is to tell the supervisor at the time. If the apprentice didn't tell anyone, the firm's defence is 'we didn't know' and the apprentice's HASAWA s.7 co-operate duty is in play. So the apprentice has skin in the game even though the formal RIDDOR duty is on the firm. The right move on every reportable incident is tell the supervisor immediately, in writing if possible, and note when you told them.",
  },
];

export default function Sub3() {
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
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 5 · Section 2 · Subsection 3"
            title="HSE vs Local Authority enforcement"
            description="Who turns up after an incident — HSE inspectors for higher-risk premises, Local Authority EHOs for lower-risk. Powers under HASAWA s.20 to s.22 and s.33, and the RIDDOR reporting that brings them in."
            tone="emerald"
          />

          <TLDR
            points={[
              "Supplementary content — extends LO2 of Unit 210 but is not directly mapped to a 210 AC. Builds the enforcement layer on top of AC 2.1.",
              "Two enforcing authorities. HSE for higher-risk premises (factories, construction, hospitals, schools). Local Authority EHOs for lower-risk (offices, shops, hotels). Same HASAWA powers, different default cases. The 1998 Enforcing Authority Regulations set the split.",
              "Three notices to know. Improvement Notice (s.21) — fix it within 21 days. Prohibition Notice (s.22) — stop now. Both are public on the HSE Notices database for years.",
              "RIDDOR 2013 is the reporting bridge. Specified injuries (Reg 4), over-7-day incapacitation (Reg 6), occupational diseases (Reg 8), dangerous occurrences (Reg 7), gas incidents (Reg 11). F2508 form on hse.gov.uk.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the two enforcing authorities for UK workplace H&S — the HSE and Local Authority Environmental Health Officers — and how the Health and Safety (Enforcing Authority) Regulations 1998 split enforcement between them.",
              "State the HSE / EHO investigative powers under HASAWA s.20 — entry without warrant, inspection, sample / measurement / photograph, document inspection, statement-taking, seizure of articles or substances, magistrate's warrant where entry is refused.",
              "Explain the difference between an Improvement Notice (HASAWA s.21) and a Prohibition Notice (HASAWA s.22) — trigger, effect, compliance period and appeal route.",
              "Describe the RIDDOR 2013 reporting categories — specified injuries (Reg 4), over-7-day incapacitation (Reg 6), occupational diseases (Reg 8), dangerous occurrences (Reg 7), gas incidents (Reg 11) — and the F2508 reporting mechanism.",
              "Recognise the role of near-miss reporting and why the firm's internal system matters even where a near-miss isn't formally RIDDOR-reportable.",
              "Identify the apprentice's role in the enforcement process — co-operate with inspectors, tell the supervisor about reportable incidents, don't speculate in formal interviews.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Two enforcers, one set of laws</ContentEyebrow>

          <ConceptBlock
            title="The HSE / Local Authority split is set by the Enforcing Authority Regulations 1998"
            plainEnglish="UK workplace H&S has two enforcing authorities. The HSE handles the higher-risk premises. Local Authority Environmental Health Officers handle the lower-risk premises. Both have the same HASAWA powers — entry, inspection, notices, prosecution. The split exists for resourcing reasons, not because the law is different."
            onSite="The practical difference for an electrician is which body's logo is on any notice. HSE inspectors visit construction sites, factories, hospitals, schools and similar. EHOs visit offices, shops, hotels, restaurants, leisure venues and care homes. If a near-miss happens at a customer's office, the EHO is likely to investigate. If the same near-miss happens at a customer's factory, HSE is likely. The substantive law applied is identical."
          >
            <p>
              The Health and Safety (Enforcing Authority) Regulations 1998 (SI 1998/494)
              allocate premises by main activity:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HSE-enforced premises</strong> include factories, building sites,
                construction sites, mines and quarries, fairgrounds, agricultural premises,
                hospitals, schools and educational establishments, gas / electricity / water
                undertakings, offshore installations, railways, the public sector, government
                premises and similar.
              </li>
              <li>
                <strong>Local Authority-enforced premises</strong> include offices, shops,
                wholesale and retail distribution, hotels and catering, sports and leisure,
                churches and other places of worship, residential care homes (with caveats),
                and most other consumer-facing premises.
              </li>
              <li>
                <strong>Mixed premises</strong> can be split — e.g. a hotel with a gym
                (Local Authority for the hotel, possibly HSE for the maintenance plant if
                significant). The 1998 Regulations include detailed allocation rules for the
                edge cases.
              </li>
            </ul>
            <p>
              The takeaway for an apprentice: the enforcer&apos;s name on any letter or notice
              tells you whether you&apos;re in HSE territory or Local Authority territory, but
              the law and the powers are the same in both.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The investigative powers — HASAWA s.20</ContentEyebrow>

          <ConceptBlock
            title="HASAWA s.20 gives inspectors deliberately wide powers"
            plainEnglish="HASAWA s.20 lists the powers an HSE inspector or an EHO has when investigating a workplace. They're deliberately wide — Parliament didn't want investigations stopped at the door. Refusing to co-operate is itself a criminal offence under HASAWA s.33."
            onSite="As an apprentice on site during an inspector visit, your job is to co-operate fully and answer truthfully. Anything you say can become evidence later. If you don't know the answer, say so. Don't speculate, don't volunteer opinions, don't try to spin events to make the firm look better — the inspector will see through it and the firm will end up worse off. Let the firm's H&S contact handle the substantive engagement once they arrive."
          >
            <p>
              The s.20 powers in summary:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Right of entry</strong> — at any reasonable time, with no warrant
                required. Police backup if entry is refused. A magistrate&apos;s warrant for
                forced entry where the inspector believes refusal will continue.
              </li>
              <li>
                <strong>Inspection and examination</strong> — premises, equipment, articles,
                substances, documents. Photographs, measurements, samples and recordings.
              </li>
              <li>
                <strong>Statements</strong> — power to require any person reasonably believed to
                be able to give relevant information to answer questions and sign a declaration
                of the truth of their answers. Statements taken under s.20 are usable in any
                subsequent proceedings.
              </li>
              <li>
                <strong>Documents</strong> — power to require production of any books or
                documents required by the relevant statutory provisions, and to inspect and copy
                them.
              </li>
              <li>
                <strong>Seizure</strong> — power to seize and detain articles or substances
                believed to pose an immediate risk of serious personal injury, and to render
                them harmless.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Inspector statements — what to say and what not to volunteer"
            plainEnglish="The inspector's right to take a statement under HASAWA s.20(2)(j) is a powerful tool. The statement is signed and is admissible in any later prosecution. Once signed it's hard to walk back. So while you must co-operate, the statement should be limited to facts you actually know — not guesses, not opinions about whether someone else was at fault, not characterisations of company culture."
            onSite="As an apprentice you might be asked for a statement on the day of an incident or weeks later. The right approach is be polite, co-operate, answer factual questions accurately, and decline to speculate. If you don't remember a detail, say so. If a question is outside your knowledge or experience, say so. Ask to read the statement before signing — that's your right. If anything in it doesn't match what you said, get it changed before signing. Take a copy."
          >
            <p>
              Practical statement-taking guidance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Tell what you saw, did, and were told. Stick to facts you can stand behind under
                cross-examination.
              </li>
              <li>
                Don&apos;t guess at times, distances or sequences if you&apos;re not sure —
                &quot;I think it was about 10 minutes&quot; is fine; &quot;exactly 8 minutes
                32 seconds&quot; better not be invented.
              </li>
              <li>
                Don&apos;t speculate about other people&apos;s motives, knowledge or actions.
                Stick to what you personally observed.
              </li>
              <li>
                Read the typed statement carefully before signing. Insist on changes if anything
                is wrong. Initial each amendment.
              </li>
              <li>
                Take a copy. Tell your firm&apos;s H&amp;S contact and (if relevant) your union
                or apprenticeship provider that you&apos;ve given a statement.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.21 (Improvement Notices)"
            clause={
              <>
                &quot;If an inspector is of the opinion that a person — (a) is contravening one
                or more of the relevant statutory provisions; or (b) has contravened one or
                more of those provisions in circumstances that make it likely that the
                contravention will continue or be repeated, he may serve on him a notice (in
                this Part referred to as &apos;an improvement notice&apos;) stating that he is
                of that opinion, specifying the provision or provisions as to which he is of
                that opinion, giving particulars of the reasons why he is of that opinion, and
                requiring that person to remedy the contravention or, as the case may be, the
                matters occasioning it within such period (ending not earlier than the period
                within which an appeal against the notice can be brought under section 24) as
                may be specified in the notice.&quot;
              </>
            }
            meaning={
              <>
                The Improvement Notice is the inspector&apos;s &apos;put it right&apos; tool. It
                identifies the breach, gives particulars, and sets a compliance period (minimum
                21 days). The duty-holder can either remedy the contravention within the period,
                or appeal to an Employment Tribunal within 21 days (which suspends the notice).
                Failing to comply with an unappealed Improvement Notice is itself a criminal
                offence under HASAWA s.33. The notice appears on the public HSE Notices database
                — visible on tender questionnaires for years afterwards, which is itself a
                significant commercial cost on top of any remediation work.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.21 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.22 (Prohibition Notices)"
            clause={
              <>
                &quot;If as regards any activities to which this section applies an inspector is
                of the opinion that, as carried on or about to be carried on by or under the
                control of the person on whom the notice mentioned below is to be served, the
                activities involve or, as the case may be, will involve a risk of serious
                personal injury, the inspector may serve on that person a notice (in this Part
                referred to as &apos;a prohibition notice&apos;) ... A prohibition notice shall
                — (a) state that the inspector is of the said opinion; (b) specify the matters
                which in his opinion give or, as the case may be, will give rise to the said
                risk; (c) where in his opinion any of those matters involves or, as the case
                may be, will involve a contravention of any of the relevant statutory
                provisions, state that he is of that opinion, specify the provision or
                provisions as to which he is of that opinion ...&quot;
              </>
            }
            meaning={
              <>
                The Prohibition Notice is the heavier weapon. The trigger is &apos;risk of
                serious personal injury&apos; — not a regulatory breach as such. The activity
                must stop immediately or by the time stated on the notice. Appeal to Employment
                Tribunal is possible within 21 days, but appeal does NOT suspend the notice (the
                key difference from an Improvement Notice) — the activity stays prohibited
                pending the appeal hearing. Carrying on the prohibited activity is itself a
                serious criminal offence under HASAWA s.33. Like Improvement Notices, Prohibition
                Notices appear on the public HSE Notices database.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.22 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Notices and prosecutions</ContentEyebrow>

          <ConceptBlock
            title="The escalation ladder — verbal advice → letter → Improvement Notice → Prohibition Notice → prosecution"
            plainEnglish="An HSE inspection doesn't always end in prosecution. The inspector has a range of tools, used proportionately. Verbal advice for minor / first-time issues. A formal letter for repeats or moderate issues. Improvement Notices for clear regulatory breaches. Prohibition Notices for immediate serious-injury risks. Prosecution for the most serious cases or for repeated non-compliance."
            onSite="An apprentice is most likely to be present for verbal advice or the issue of a notice. Prosecution involves the firm's H&S contact, the firm's solicitor, and (eventually) court. The progression up the ladder is what makes the H&S system function — most issues stop at the lower rungs because firms fix them. The firms that end up prosecuted are typically the ones that ignored the earlier warnings."
          >
            <p>
              Each rung on the ladder appears (or doesn&apos;t) on the public HSE Notices
              database in different ways:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Verbal advice and letters</strong> — typically not on the public
                database. Internal HSE / Local Authority records.
              </li>
              <li>
                <strong>Improvement Notices</strong> — published on the HSE Notices database with
                the firm&apos;s name, the date, the breach and the compliance period. Visible
                for several years.
              </li>
              <li>
                <strong>Prohibition Notices</strong> — published on the HSE Notices database in
                the same way. Their &apos;immediate&apos; nature is what makes them
                particularly damaging on tender questionnaires.
              </li>
              <li>
                <strong>Prosecutions</strong> — published on the HSE Convictions database with
                the firm&apos;s name, the offence, the court, the sentence and the date.
                Visible for many years; on a tender questionnaire it&apos;s a clear flag for the
                client&apos;s procurement team.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The HSE Notices and Convictions databases — public, indexed, long-lived"
            plainEnglish="Both Improvement and Prohibition Notices, and any HSE prosecutions resulting in conviction, appear on public databases hosted on the HSE website. They're searchable by company name, postcode and offence. Tender procurement teams use them routinely. Insurers use them. Specialist procurement consultants pull them as part of pre-qualification."
            onSite="The commercial cost of a notice or conviction often exceeds the direct cost of the remediation or fine. A small electrical contractor with a Prohibition Notice on its public record can lose tier-one client work for years. Apprentices whose firms appear on the database experience that as fewer big contracts and reduced opportunity. The system is designed to make the consequences of non-compliance visible to the market — that's the deterrent effect on top of the formal penalty."
          >
            <p>
              How the public-record effect plays out commercially:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PQQ / SSIP questionnaires</strong> typically ask &quot;has the firm
                received any H&amp;S notices in the past 3 / 5 years?&quot;. The HSE database
                makes any &apos;no&apos; answer easily checked.
              </li>
              <li>
                <strong>Insurance renewals</strong> may ask about notices and convictions, and
                may price-up or refuse cover based on the answer.
              </li>
              <li>
                <strong>Scheme membership</strong> bodies (NICEIC, NAPIT, Stroma and similar)
                monitor the databases and may take their own disciplinary action.
              </li>
              <li>
                <strong>Public-sector procurement</strong> often excludes contractors with
                certain categories of conviction under Procurement Regulations.
              </li>
              <li>
                <strong>Customer trust</strong> — homeowners increasingly check trader
                reputations online; a public conviction is a permanent dent.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>RIDDOR 2013 — what triggers a report</ContentEyebrow>

          <ConceptBlock
            title="RIDDOR is the statutory reporting regime — without it, the HSE wouldn't know"
            plainEnglish="The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471) are the SI that requires employers to tell the HSE about specified workplace injuries, occupational diseases, dangerous occurrences and fatalities. The duty falls on the 'responsible person' — usually the employer."
            onSite="As an apprentice your role is to tell the supervisor at the time, in writing if possible. The firm's H&S contact files the F2508 form on hse.gov.uk. Failure to report when required is itself a criminal offence under RIDDOR Reg 12 — and a common HSE prosecution route on top of the underlying incident. So 'we didn't report it because we forgot / didn't think it was serious' is not a defensible position."
          >
            <p>
              The reportable categories under RIDDOR 2013:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 4 — Specified injuries</strong>. The most serious named injuries —
                fatalities (immediate report), fractures other than to fingers / toes / thumbs,
                amputations, serious burns covering &gt;10% of the body or causing significant
                damage to eyes / respiratory system / vital organs, scalpings requiring hospital
                treatment, loss of consciousness from head injury or asphyxia, loss of
                consciousness or hospital admission from electric shock, loss of sight (whether
                temporary or permanent), serious eye injury, crush injuries to the head or torso
                causing brain or internal organ damage. Reportable as soon as possible and by
                the F2508 within 10 days.
              </li>
              <li>
                <strong>Reg 6 — Over-7-day incapacitation</strong>. A non-specified injury that
                results in a worker being unable to do their normal work for more than 7
                consecutive days (excluding the day of the accident, including weekends).
                Reportable within 15 days.
              </li>
              <li>
                <strong>Reg 7 — Dangerous occurrences</strong>. A defined list (Schedule 2) of
                near-miss events that must be reported even with no injury — including electrical
                short circuits or overloads causing fire or explosion, plant collapse, scaffold
                failure, dangerous occurrences in or near a pipeline, and others. Immediate /
                10-day report.
              </li>
              <li>
                <strong>Reg 8 — Occupational diseases</strong>. Reportable diseases linked to
                work — carpal tunnel syndrome from repetitive vibration, occupational dermatitis,
                occupational asthma, hand-arm vibration syndrome, certain cancers, certain
                infections. Reportable on diagnosis.
              </li>
              <li>
                <strong>Reg 11 — Gas incidents</strong>. Specific to gas-fitter and gas-supply
                incidents. Less directly relevant to electrical work but worth being aware of.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="RIDDOR 2013 (SI 2013/1471) — Reg 4 (specified injuries, paraphrased summary)"
            clause={
              <>
                Reg 4 requires the responsible person to report &apos;specified injuries&apos;
                listed in Schedule 1 — including (paraphrased) fatalities, fractures other than
                to fingers / toes / thumbs, amputations, permanent loss of or reduction in
                sight, crush injuries leading to internal organ damage, serious burns covering
                more than 10% of the body or causing significant damage to eyes / respiratory
                system / vital organs, scalpings requiring hospital treatment, loss of
                consciousness from head injury or asphyxia, and any other injury arising from
                working in an enclosed space leading to hypothermia, heat-induced illness or
                resuscitation or admission to hospital for more than 24 hours. The report is
                made via the F2508 form on hse.gov.uk as soon as practicable and within 10 days
                of the accident.
              </>
            }
            meaning={
              <>
                Reg 4 sets the &apos;named&apos; injury list — the events that are serious enough
                that Parliament wants the HSE to know about them. For an electrician the most
                relevant entries are the loss-of-consciousness-from-electric-shock entry, the
                serious-burns entry (think arc flash) and the amputation entry. The
                responsible-person duty sits on the employer; the apprentice&apos;s role is to
                tell the supervisor at the time. Late or missing reports are themselves criminal
                offences under RIDDOR Reg 12 and a common HSE prosecution route on top of the
                underlying incident.
              </>
            }
            cite="Source: paraphrased summary of RIDDOR 2013 (SI 2013/1471) Reg 4 and Schedule 1 — for the verbatim current text consult legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock
            title="Filing the F2508 — the practical reporting mechanic"
            plainEnglish="The F2508 is the online form on hse.gov.uk used to report most RIDDOR-reportable incidents. Different forms exist for different categories — F2508 for injuries and dangerous occurrences, F2508A for occupational diseases. Fatalities and certain specified injuries also require an immediate phone notification to the HSE Incident Contact Centre on top of the form."
            onSite="The apprentice doesn't usually file the F2508 directly — that's the responsible person (employer) duty. But the apprentice's information is what the form needs. Names, dates, times, locations, descriptions, witnesses — all gathered from the people on site. The cleaner the apprentice's contemporaneous note, the cleaner the F2508. Inspectors after an incident will compare the F2508 against the apprentice's notebook entries; matches build credibility, mismatches build suspicion."
          >
            <p>
              What goes on the F2508 (in summary):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Reporter details — who is filing, on whose behalf, with what authority.
              </li>
              <li>
                Injured person details — name, occupation, age, employment status (employee,
                trainee, contractor, member of public).
              </li>
              <li>
                Accident details — date, time, location, type of incident, injury sustained,
                hospital admission.
              </li>
              <li>
                Description of what happened — factual, neutral, no apportionment of blame
                (that&apos;s for the investigation, not the report).
              </li>
              <li>
                Kind of work being done at the time — the activity and the equipment.
              </li>
            </ul>
            <p>
              Reports must be filed within the statutory timeframe — fatalities and specified
              injuries within 10 days, over-7-day incapacitation within 15 days, dangerous
              occurrences within 10 days. Late reports are themselves a Reg 12 offence.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Internal near-miss reporting — separate from RIDDOR but just as important"
            plainEnglish="Most workplace H&S harm follows a pyramid pattern — many near-misses at the bottom, fewer minor injuries above, fewer major injuries above that, and (rarely) fatalities at the top. Capturing near-misses is what gives the firm advance warning of where the real injury will eventually happen."
            onSite="Most firms have an internal near-miss reporting system — a paper form, an app, a section of the toolbox-talk record. Use it. The apprentice's job is to capture every near-miss, even the ones that 'didn't really happen' — a slip recovered from, a near-contact with a live conductor, a tool that nearly fell from height. The data feeds the firm's safety system and (over time) shapes the RAMS, the toolbox-talk topics and the training programme."
          >
            <p>
              What counts as a near-miss worth recording:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Anything that, with slightly different circumstances, could have caused an
                injury or RIDDOR-reportable event.
              </li>
              <li>
                A safety control that failed or nearly failed (an interlock that didn&apos;t
                latch, a lock-off that came undone, an RCD that nominally worked but tripped
                slowly).
              </li>
              <li>
                A behavioural slip — someone reaching for the wrong tool, the wrong breaker,
                the wrong cable.
              </li>
              <li>
                An environmental change — weather worsening, lighting dropping, dust building
                up — that increased risk.
              </li>
              <li>
                A communication failure — instruction misunderstood, briefing missed, document
                version mismatched.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Thinking 'near-misses don't matter'"
            whatHappens={
              <>
                Apprentice on a CU change brushes their forearm against a partly-isolated bus
                bar. Small spark, no injury, no equipment damage. Apprentice doesn&apos;t mention
                it because &quot;nothing happened&quot;. Three weeks later the same near-miss
                pattern recurs on a different job and this time someone is hospitalised. The
                HSE investigation looks at the firm&apos;s near-miss reporting and finds nothing
                — so the question becomes &quot;did this firm have a culture of capturing
                warning signs, or did they ignore them?&quot;. The first apprentice&apos;s
                unreported near-miss becomes evidence in the prosecution.
              </>
            }
            doInstead={
              <>
                Tell the supervisor at the time, even when nothing happened. Most firms have an
                internal near-miss reporting form or app — fill it in. The reason near-miss
                reporting exists is that near-misses are statistically the leading indicator of
                next month&apos;s actual injury — Heinrich&apos;s pyramid is a rough rule of
                thumb, and ignoring the bottom of the pyramid is exactly how the top of the
                pyramid (fatalities) becomes inevitable. Capture the near-miss, log the cause,
                fix the system. That&apos;s how the firm learns; that&apos;s also how the firm
                builds the evidence trail that protects it from prosecution after a future
                incident.
              </>
            }
          />

          <CommonMistake
            title="Speculating to the inspector to make the firm look better"
            whatHappens={
              <>
                HSE inspector turns up after a near-miss, asks the apprentice what happened.
                Apprentice gets nervous, fills in gaps with guesses to make the supervisor look
                less bad — &quot;I think the supervisor probably checked the lock-off before
                he left, although I didn&apos;t see him do it&quot;. Inspector takes a written
                statement, reads it back, apprentice signs. Later investigation reveals the
                lock-off wasn&apos;t checked, the apprentice&apos;s statement is shown to be
                speculative, and the firm is then dealing with both the underlying breach AND
                evidence that the apprentice may have been pressured to cover it up.
              </>
            }
            doInstead={
              <>
                Stick to what you saw, did and were told. If you didn&apos;t see something, say
                so — &quot;I don&apos;t know whether the lock-off was checked; I didn&apos;t see
                that part&quot;. Inspectors expect honesty about gaps in your knowledge.
                Speculation dressed as fact is what gets people in trouble. As an apprentice
                you&apos;re typically the witness, not the duty-holder — your job is accurate
                evidence, not advocacy. Let the firm&apos;s H&amp;S contact and (if needed)
                solicitor handle the strategic angle once they arrive.
              </>
            }
          />

          <Scenario
            title="Apprentice cuts hand on metal trunking, off work 10 days — what's reportable?"
            situation={
              <>
                You&apos;re second-fixing on a commercial fit-out. While pulling a 16 mm² cable
                through pre-installed metal trunking your forearm catches on a sharp burr left
                from the trunking cut. Deep cut, ~7cm long, bleeding heavily. A&amp;E, six
                stitches, signed off by the GP for 10 working days. You&apos;re back on site on
                day 11 with the wound healed but tender. The supervisor asks &quot;did we
                report this somewhere?&quot;.
              </>
            }
            whatToDo={
              <>
                Yes — this is reportable under RIDDOR 2013 Reg 6 (over-7-day incapacitation).
                The clock is calculated from the day after the accident, including weekends —
                so 10 working days off is well over the 7-day threshold. The &apos;responsible
                person&apos; under RIDDOR is the employer (your firm), so they file the F2508
                form on hse.gov.uk within 15 days of the accident. Your role: tell the
                supervisor immediately on the day, tell them again when the GP signs you off
                for 10 days, give them a copy of the GP note. The supervisor or H&amp;S contact
                files the F2508. Internally, the firm should also do a local incident report —
                what caused the burr, how it was missed in the first-fix sign-off, what changes
                are needed (better deburring, better visual inspection of pre-installed
                trunking before pulling). The site CDM principal contractor should also be
                informed. After the fact, the apprentice keeps a personal note of the dates,
                times and what was reported to whom — that&apos;s your record if there&apos;s
                any later HSE involvement or any insurance claim.
              </>
            }
            whyItMatters={
              <>
                The over-7-day threshold is one of the most-missed RIDDOR triggers in small
                firms — &apos;just a cut&apos; sounds minor but the off-work duration is what
                makes it reportable. Failing to report on time is a criminal offence under
                RIDDOR Reg 12 and a common HSE prosecution route on top of the underlying
                incident. The firm&apos;s liability is independent of fault — the employer
                owes the duty regardless of whose burr it was. The apprentice&apos;s liability
                under HASAWA s.7 is triggered by failing to TELL someone — co-operating with
                the firm&apos;s safety arrangements includes telling them about reportable
                events. Both sides have to act for the system to work.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Two enforcing authorities — HSE for higher-risk premises (factories, construction, hospitals, schools), Local Authority EHOs for lower-risk (offices, shops, hotels). Same HASAWA powers, different default cases. Set by the 1998 Enforcing Authority Regulations.",
              "HASAWA s.20 gives inspectors wide investigative powers — entry without warrant, inspection, sampling, statements, document inspection, seizure. Refusing to co-operate is a separate criminal offence under HASAWA s.33.",
              "Improvement Notice (s.21) — fix it within the specified period (minimum 21 days). Appeal to Employment Tribunal within 21 days suspends the notice. Failure to comply = separate criminal offence.",
              "Prohibition Notice (s.22) — stop the activity now because of risk of serious personal injury. Appeal to Employment Tribunal within 21 days does NOT suspend the notice. Carrying on while prohibited = serious criminal offence.",
              "Both notices appear on the public HSE Notices database for several years — they're a commercial cost on top of the remediation cost because they show up on tender questionnaires.",
              "RIDDOR 2013 reporting categories — Reg 4 specified injuries, Reg 6 over-7-day incapacitation, Reg 7 dangerous occurrences, Reg 8 occupational diseases, Reg 11 gas incidents. F2508 form on hse.gov.uk. Failure to report = separate criminal offence under Reg 12.",
              "Near-misses are the leading indicator of next month's incident — capture them in the firm's internal system even where they don't formally trigger RIDDOR. Ignoring them is how injuries become inevitable.",
              "Apprentice's role in enforcement — co-operate fully, answer truthfully, don't speculate, tell the supervisor about reportable incidents, keep your own contemporaneous note. Let the firm's H&S contact handle substantive engagement.",
            ]}
          />

          <Quiz title="HSE & Local Authority enforcement — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section2/2-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.2 HASAWA &amp; EAWR — your duties
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section2/2-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.4 Equality Act 2010 — fair treatment on site
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
