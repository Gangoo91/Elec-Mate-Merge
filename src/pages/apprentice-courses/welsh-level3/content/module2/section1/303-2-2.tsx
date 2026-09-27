/**
 * Ported from the English course, combining:
 *   level2/module5/section2/Sub3.tsx
 *   level3/module1/section1/Sub6.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s2-sub3-who-enforces',
    question:
      "You're working on a small electrical fault on the shop-floor of an independent newsagent. There's a near-miss — a colleague gets a small shock from poor isolation. Who is the enforcing authority for the H&S investigation?",
    options: [
      'The Health and Safety Executive (HSE). All electrical incidents are enforced by the HSE regardless of where they happen, because electricity is a specialist higher-risk hazard. The type of premises is irrelevant once electricity is involved — a shock on a shop floor is treated exactly the same as one in a factory, and an HSE inspector always takes the lead.',
      'The local Building Control body for the area. Because the newsagent is a building, any incident inside it falls to Building Control, who investigate the electrical installation against the Building Regulations and decide whether enforcement is needed. Building Control is the default enforcer for anything happening within commercial premises.',
      "The distribution network operator (DNO) for the area. As the body responsible for the electricity supply, the DNO investigates any electrical incident on its network's downstream installations under ESQCR, and decides whether to refer the matter on. The DNO is the first enforcer for any shock or fault in a retail premises.",
      'Local Authority — Environmental Health Officers from the local council. The Health and Safety (Enforcing Authority) Regulations 1998 split enforcement based on the main activity of the premises. Retail (shops, offices, hotels, restaurants, leisure) goes to the Local Authority. Higher-risk premises (factories, construction sites, hospitals, schools, mines) go to the HSE.',
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
      'An Improvement Notice is served by the HSE for a serious breach, while a Prohibition Notice is served by the Local Authority for a minor one — the two names simply reflect which enforcing body issued the notice. Both give the duty-holder the same 21 days to comply, and neither requires the activity to stop while the work is put right.',
      "An Improvement Notice (s.21) is served when the inspector believes a Regulation has been breached and the duty-holder is given a period (minimum 21 days) to put it right. A Prohibition Notice (s.22) is served when the inspector believes there's a risk of SERIOUS PERSONAL INJURY from a specific activity — the activity must stop immediately or by a stated time. Failure to comply with either is a separate criminal offence; both appear on the public HSE Notices database.",
      'An Improvement Notice requires the activity to stop immediately, while a Prohibition Notice merely gives advice the duty-holder is free to ignore. The Improvement Notice is therefore the more serious of the two, and an inspector reaches for it only where there is an immediate risk of death, leaving the Prohibition Notice for routine paperwork failings.',
      'An Improvement Notice can only be issued to a limited company, while a Prohibition Notice can only be issued to a sole trader or self-employed person. The two notices split duty-holders by business structure rather than by the nature of the breach, so the inspector picks the notice based on how the firm is registered.',
    ],
    correctIndex: 1,
    explanation:
      'Improvement Notice = put it right within a period (21 days or longer). Prohibition Notice = stop NOW because someone could get seriously hurt. The trigger is different — Improvement is about a regulatory breach; Prohibition is about a real, immediate risk of serious personal injury. The published-on-the-public-database point is important commercially — both notices show up on tender questionnaires for years afterwards and can cost the firm contracts long after the underlying issue has been fixed.',
  },
  {
    id: 'mod5-s2-sub3-riddor-reportable',
    question:
      'An apprentice cuts their hand badly on a metal trunking edge while pulling cable. They need stitches and are signed off by their GP for 10 working days. Is this RIDDOR-reportable, and who reports it?',
    options: [
      "Yes — reportable as an over-7-day incapacitation injury under RIDDOR 2013 Reg 6. The 'responsible person' (usually the employer) makes the report within 15 days of the accident, via the F2508 form on hse.gov.uk. The apprentice tells the supervisor; the firm's H&S contact files the report. Failure to report when required is itself a criminal offence under RIDDOR.",
      'No — only injuries that put a worker in hospital overnight are RIDDOR-reportable. Because the apprentice was treated and discharged on the same day, the cut falls below the threshold, so no report is needed and the firm simply records it in the internal accident book.',
      'No — RIDDOR only covers injuries caused by electricity, not mechanical injuries like cuts and grazes. As the wound came from a metal edge rather than a shock, it sits outside the Regulations entirely, and the apprentice just needs a first-aid entry rather than a report to the HSE.',
      'Yes — but the apprentice must report it themselves, in person, to the HSE within 24 hours. The duty to report falls on the injured worker rather than the employer, and missing the 24-hour window leaves the apprentice personally liable to prosecution under RIDDOR.',
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
    question: 'Which body is the primary enforcement authority for HASAWA on a construction site?',
    options: [
      "The Local Authority Environmental Health team. Construction work is consumer-facing and lower-risk, so under the 1998 Enforcing Authority Regulations it is allocated to the council's EHOs, who take the lead on any site incident and enforce the H&S regime on the contractor's behalf.",
      'The Health and Safety Executive (HSE). Construction sites are higher-risk premises under the Health and Safety (Enforcing Authority) Regulations 1998, so HSE inspectors take the lead. They enforce HASAWA, EAWR, CDM 2015, MHSWR, COSHH, RIDDOR and the rest of the workplace H&S regime on site.',
      "The principal contractor's own safety department. On a construction site the duty to enforce HASAWA is delegated to the principal contractor under CDM 2015, so it is their in-house team rather than any external body that investigates incidents and issues notices to sub-contractors.",
      'Building Control. Because a construction site produces a building, Building Control is the enforcing authority for HASAWA on site, investigating incidents against the Building Regulations and the Approved Documents as work proceeds towards completion.',
    ],
    correctAnswer: 1,
    explanation:
      "Construction is one of the HSE's headline focus areas. CDM 2015 is the construction-specific SI, but HSE inspectors enforce the whole H&S regime — not just CDM. After a serious incident on a construction site, HSE inspectors will also liaise with police (especially in fatality cases for potential corporate manslaughter), Building Control (for any structural / building-regs angle) and the fire and rescue service if there was a fire — but the lead H&S enforcement is HSE.",
  },
  {
    id: 2,
    question:
      'Which body enforces HASAWA in retail premises like an independent shop, an office or a hotel?',
    options: [
      'The Health and Safety Executive (HSE). The HSE is the sole enforcing authority for HASAWA across every type of workplace, and Local Authorities have no H&S enforcement role at all — their officers deal only with food hygiene and pollution, never with workplace safety in shops, offices or hotels.',
      'No single body — retail premises are exempt from HASAWA enforcement because the public, not employees, are the main people present. Shops, offices and hotels fall outside the workplace H&S regime, so any safety failing there is dealt with under consumer-protection law instead.',
      'The Local Authority — specifically the Environmental Health team of the local council. The Health and Safety (Enforcing Authority) Regulations 1998 allocate retail, office, leisure, residential care, places of worship and similar lower-risk premises to local-authority enforcement. EHOs have the same HASAWA powers as HSE inspectors — entry, inspection, notices, prosecution.',
      'The Care Quality Commission and equivalent sector regulators. Because shops, offices and hotels are service businesses, their workplace safety is policed by whichever industry regulator licenses them rather than by a general H&S enforcer, with each sector answering to its own watchdog.',
    ],
    correctAnswer: 2,
    explanation:
      "The 1998 Enforcing Authority split is part of the H&S system. Local Authorities handle the lower-risk premises (where most of the public are present but the work activity is itself lower-hazard). HSE handles the higher-risk premises. Both have full HASAWA powers under s.20 (entry and inspection), s.21 (Improvement Notice), s.22 (Prohibition Notice) and s.33 (prosecution). For an electrician working across both kinds of premises, the practical day-to-day is the same; the name on any notice will be 'HSE' or 'XYZ Council Environmental Health'.",
  },
  {
    id: 3,
    question:
      'An HSE inspector arrives unannounced at a job site. What can they lawfully do under HASAWA s.20?',
    options: [
      "Nothing without the duty-holder's consent — an inspector has no right of entry of their own and must give at least 48 hours' written notice before visiting. If the firm refuses access, the inspector can only ask a court to arrange a future appointment; they cannot enter unannounced or compel anyone to answer questions on the spot.",
      'Only observe from the public areas of the site and request documents by post afterwards. Under s.20 an inspector may look but not touch — they cannot take photographs, samples or statements, and any evidence has to be supplied voluntarily by the firm in its own time rather than seized during the visit.',
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
      'Effective from the date served (or the date specified on the notice). Minimum compliance period is 21 days — the inspector can specify a longer period if the remediation is more involved. The notice can be appealed to an Employment Tribunal within 21 days; appeal suspends the notice. If unappealed and uncomplied with, failure to comply is itself a criminal offence under HASAWA s.33.',
      'Effective immediately on issue, with a fixed compliance period of 24 hours in every case. The inspector has no discretion to extend the period and there is no right of appeal — the duty-holder must put the breach right by the following day or face automatic prosecution.',
      'Effective only after a 28-day grace period during which the duty-holder may continue the activity unchanged. The minimum compliance period is then a further 3 months, and the notice cannot be enforced until both periods have run, giving firms several months before any action is required.',
      'Effective from the date of the next scheduled HSE inspection rather than the date served, with no minimum compliance period set in law — the duty-holder simply fixes the breach before the inspector returns, and only a repeat finding at that later visit can lead to enforcement.',
    ],
    correctAnswer: 0,
    explanation:
      "21 days is the minimum compliance period to give the duty-holder a fair chance to fix the issue and to lodge an appeal if they think the notice is wrong. The Employment Tribunal hears appeals against H&S notices. In practice, most Improvement Notices are accepted and complied with — appeals are rare and rarely successful. The notice and any appeal outcome appear on the public HSE Notices database. For tender questionnaires that ask 'have you received any H&S notices in the last 5 years?', the answer is 'yes' for any notice on that database — which is why firms work hard to avoid them in the first place.",
  },
  {
    id: 5,
    question: "When is a Prohibition Notice (HASAWA s.22) appropriate, and what's the effect?",
    options: [
      'When the inspector wants to give the duty-holder time to put a paperwork breach right. The notice prohibits nothing — it simply records that a regulation has been breached and sets a deadline, usually 21 days, after which the inspector returns to check the record-keeping has been brought up to date.',
      'When the inspector believes a specific activity involves or will involve a risk of SERIOUS personal injury. The notice prohibits the activity (immediately, or from a stated time) until the risk has been remedied. Like an Improvement Notice, it can be appealed to an Employment Tribunal within 21 days — but the appeal does NOT suspend the notice (unlike an Improvement Notice). The activity must stop while the appeal is heard.',
      'When a firm has already been convicted of a previous offence. The notice is a sentencing tool used only by the courts after a prosecution, banning the firm from a category of work for a fixed term, and an inspector on site has no power to issue one during an ordinary visit.',
      'When the inspector wants to seize a piece of equipment as evidence. The notice transfers ownership of the item to the HSE for the duration of the investigation, and the activity can continue as normal once replacement equipment is brought in, since the notice attaches to the article rather than the work.',
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
      'Specified injuries (RIDDOR Reg 4) are the most serious named injuries — fatalities, fractures other than to fingers/toes/thumbs, amputations, loss of sight, scalpings, serious burns, crush injuries, unconsciousness from electric shock, and so on. They must be reported as soon as possible and within 10 days. Over-7-day incapacitation (Reg 6) is when a worker is off normal work for more than 7 consecutive days (excluding accident day, including weekends) — must be reported within 15 days. Different categories, different timeframes, both reportable.',
      'A specified injury is one that happens to an employee, while over-7-day incapacitation is one that happens to a member of the public. The two categories divide casualties by employment status, so the same injury is reported under different regulations depending on whether the injured person worked for the firm.',
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
      'After a serious electrical incident on a construction site, in what order do the enforcement and supporting bodies typically engage?',
    options: [
      "Multiple bodies. (1) Emergency services — ambulance / fire / police as appropriate at the time. (2) Police — investigate scene, especially in fatalities (corporate manslaughter / individual gross-negligence manslaughter potential). (3) HSE — H&S investigation (HASAWA, EAWR, CDM, MHSWR, RIDDOR). (4) Building Control — where there's a building-regs / structural angle. (5) DNO — if mains supply was involved (ESQCR). (6) Insurers — both the firm's and the client's. The HSE and police typically work in parallel, especially after fatal incidents.",
      'Only the HSE engages, and it does so alone. After a serious site incident the HSE takes sole charge — the police are barred from attending an industrial scene, Building Control and the DNO have no role, and insurers are not informed until the HSE has closed its file, so a single body handles everything from start to finish.',
      'The DNO leads, then hands over to the HSE. Because most site incidents involve the electricity supply, the distribution network operator investigates first under ESQCR and only refers the matter to the HSE if it finds a breach, with the police and insurers playing no part unless the DNO asks them to.',
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
    question: 'If a near-miss happens on site and no-one is hurt, does it really need reporting?',
    answer:
      "Depends on what kind of near-miss. RIDDOR 2013 Reg 7 lists specific 'dangerous occurrences' that ARE reportable even with no injury — including electrical short circuits or overloads causing fire or explosion, certain plant collapses, scaffolding failures and a defined list of others. If the near-miss falls in that list, it's reportable. If it doesn't, RIDDOR doesn't mandate a report, but the firm's internal near-miss reporting system should still capture it. Near-misses are the leading indicator of next month's actual injury or fatality — ignoring them is exactly how an injury becomes inevitable.",
  },
  {
    question: 'If the HSE inspector turns up unannounced, am I obliged to talk to them?',
    answer:
      "You're obliged to co-operate under HASAWA s.20 — the inspector has powers to require you to answer questions and to take a statement. Refusing or obstructing is a separate criminal offence under HASAWA s.33. So yes, you co-operate. But you don't have to volunteer speculation or opinions — you answer questions about what you saw, did and were told, factually and accurately. If a question is outside your knowledge, say so. Anything you say can be used in evidence later. The right approach is be polite, be factual, don't embellish, and let the firm's H&S contact / solicitor handle the substantive engagement once they arrive.",
  },
  {
    question: 'Can the HSE / Local Authority issue notices against me personally as an apprentice?',
    answer:
      'Improvement Notices and Prohibition Notices are typically served on the duty-holder responsible for the activity (usually the employer). But where an individual operative is the source of the breach — e.g. defeating a control, working unsafely — the inspector can ALSO charge that individual under HASAWA s.7 / EAWR Reg 3 / s.33. So a Prohibition Notice probably goes to the firm; a personal prosecution can be brought against the apprentice on the same set of facts. The two are not mutually exclusive.',
  },
  {
    question:
      "What's the practical difference between dealing with the HSE and dealing with the Local Authority?",
    answer:
      'The legal powers are nearly identical — both have HASAWA s.20-22 / s.33 in full. The cultural difference is that HSE inspectors are H&S specialists with a national focus and tend to deal with bigger, higher-risk cases. Local Authority EHOs are environmental-health generalists with a local focus — they may also handle food hygiene, pollution and noise nuisance. So HSE involvement often signals a more serious case, more specialist scrutiny and (statistically) a higher prosecution rate. EHO involvement on a retail-premises electrical incident is more likely to result in advice and an Improvement Notice. But both can prosecute, and both can secure custodial sentences in serious cases.',
  },
  {
    question:
      "What's the relationship between RIDDOR reporting and the underlying H&S investigation?",
    answer:
      "RIDDOR is the trigger. The F2508 report goes into the HSE / Local Authority systems and feeds the decision on whether to investigate further. Most over-7-day reports don't result in an investigation — the HSE lacks the resources to investigate everything, so they triage by severity, sector and pattern. Specified injuries, fatalities and dangerous occurrences are much more likely to attract a full investigation. So the fact that the apprentice's 10-day-off cut hand was reported under Reg 6 doesn't automatically mean an inspector will visit — but if the same firm has had three over-7-day reports in six months, that pattern probably triggers a visit.",
  },
  {
    question:
      'If the firm fails to report a RIDDOR-reportable incident, is the apprentice in trouble?',
    answer:
      "The 'responsible person' duty under RIDDOR Reg 4 / 6 / 7 sits on the employer (or self-employed person), not on the apprentice. So if the firm fails to file the F2508, the firm faces the RIDDOR Reg 12 prosecution, not the apprentice. BUT — the apprentice's job is to tell the supervisor at the time. If the apprentice didn't tell anyone, the firm's defence is 'we didn't know' and the apprentice's HASAWA s.7 co-operate duty is in play. So the apprentice has skin in the game even though the formal RIDDOR duty is on the firm. The right move on every reportable incident is tell the supervisor immediately, in writing if possible, and note when you told them.",
  },
];

const checks2 = [
  {
    id: 'l3-m1-s1-sub6-notice',
    question:
      'An HSE inspector visits a site and serves an improvement notice with a 28-day deadline. What does that actually mean?',
    options: [
      'An informal warning with no legal force — the dutyholder can choose whether or not to act on it, and there is no right of appeal.',
      'An order to stop all work on site immediately until the inspector returns, with the activity unable to resume during the 28 days.',
      'A statutory notice under HASAWA s.21 requiring the breach to be remedied by the deadline, with a right of appeal and an offence for non-compliance.',
      'A demand for a fixed penalty fine that must be paid within 28 days, after which the matter is automatically closed with no further action.',
    ],
    correctIndex: 2,
    explanation:
      'The dutyholder must comply within the time specified (usually 21+ days), with a right of appeal to an Employment Tribunal within 21 days. Failure to comply is a separate offence carrying unlimited fines and, on indictment, up to 2 years imprisonment for the responsible person. The notice is published on the HSE Public Register of Convictions and Notices — visible to clients, insurers and competitors who routinely check it during tendering. Reputational damage often outstrips the legal cost; compliance within the deadline closes the matter, non-compliance escalates fast.',
  },
  {
    id: 'l3-m1-s1-sub6-ffi',
    question: "What's 'Fee for Intervention' (FFI) and when does it apply?",
    options: [
      'A fixed fine of £170 issued automatically whenever an HSE inspector visits any workplace, regardless of what they find.',
      "A statutory cost-recovery scheme that charges dutyholders for inspector time spent on a 'material breach', at an hourly rate, separate from any fine.",
      'A voluntary fee a firm can pay the HSE to have an advisory inspection carried out before a project starts, to confirm compliance in advance.',
      "An insurance levy collected by the HSE from every registered employer each year to fund the inspectorate, calculated on the firm's payroll.",
    ],
    correctIndex: 1,
    explanation:
      "FFI sits under the Health and Safety (Fees) Regulations. It is triggered when an inspector identifies a material breach and writes a letter, notice or report, and is charged at an hourly rate (currently around £170/hr — check HSE for the latest figure) for inspector time only, separate from prosecution costs or fines. Introduced in 2012, a 'material breach' is one the inspector reasonably opines warrants written notification. Invoices regularly run into thousands for a single visit, and into five figures for systemic issues; disputes go to an HSE-internal panel.",
  },
  {
    id: 'l3-m1-s1-sub6-prohibition',
    question: 'How does a prohibition notice differ from an improvement notice?',
    options: [
      'A prohibition notice gives the dutyholder longer to comply (usually 90 days) than an improvement notice, because the works involved are more complex.',
      'A prohibition notice (HASAWA s.22) stops a risky activity until the danger is remedied, where an improvement notice gives time to fix the breach.',
      'A prohibition notice is issued only after a death, whereas an improvement notice can be issued for any breach before harm occurs.',
      'A prohibition notice carries no right of appeal and an unlimited fine, whereas an improvement notice carries a right of appeal and only a fixed penalty.',
    ],
    correctIndex: 1,
    explanation:
      'A prohibition notice is served when the inspector judges that an activity involves, or will involve, a risk of serious personal injury. It stops the activity immediately (or by a stated date) until the matters specified are remedied — there is no compliance period, the activity stops. A right of appeal exists but does NOT suspend the prohibition. Working in defiance of it is a serious offence; the notice is published on the HSE Public Register, alerting every potential client. Inspector sign-off is required before resuming work.',
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question: "What's the HSE's primary statutory power?",
    options: [
      'Issuing electrical qualifications and licences to individual electricians before they are permitted to work on any installation.',
      'Powers under HASAWA Part I — entry (s.20), improvement notices (s.21), prohibition notices (s.22), seizure (s.25) and prosecution (s.33).',
      'Setting the technical wiring standards that installations must meet, a role otherwise carried out by the IET through BS 7671.',
      'Providing compensation directly to injured workers, calculated according to the severity of the injury sustained.',
    ],
    correctAnswer: 1,
    explanation:
      "Under HASAWA Part I, inspectors can enter premises at any reasonable time, take photos, take samples, take statements, examine documents, require production of records and dismantle equipment, plus serve notices, seize dangerous articles and prosecute. When an inspector arrives on site the operative's job is to cooperate (CDM Reg 15 + HASAWA s.7) and direct them to the responsible person, not to bluff or obstruct.",
  },
  {
    id: 2,
    question: 'Who else enforces H&S law besides the HSE?',
    options: [
      'Nobody — the HSE is the sole enforcing authority for all health and safety law across every sector in the UK.',
      'The police, who take over any health and safety matter once it involves a workplace and prosecute it through the criminal courts.',
      'Local Authority EHOs, plus sector regulators such as the ORR, MCA, CAA and ONR — each covering its own industry alongside the HSE.',
      'The IET, which enforces BS 7671 and refers any breaches to the courts for prosecution.',
    ],
    correctAnswer: 2,
    explanation:
      'Enforcement is split by sector: Local Authority Environmental Health Officers (EHOs) for retail, offices, leisure and residential; the Office of Rail and Road for railways; the Marine and Coastguard Agency for shipping; the Civil Aviation Authority for aviation; the Office for Nuclear Regulation for nuclear sites; and the HSE itself for construction, manufacturing, mines, quarries, agriculture and most other industrial settings. For an electrical contractor on construction or industrial premises the HSE is the inspector; on a retail or office fit-out it may be the LA EHO. Powers are essentially the same; the agency differs.',
  },
  {
    id: 3,
    question: "What's a 'material breach' for FFI purposes?",
    options: [
      'Any breach, however minor, that an inspector spots during a visit — every observed shortcoming automatically triggers an FFI invoice.',
      'Only a breach that has already caused a death or specified injury; lesser breaches never attract a fee.',
      'Only a breach of BS 7671; breaches of HASAWA or its daughter regulations fall outside the FFI scheme.',
      'A breach the inspector reasonably opines is serious enough to warrant written notification — a letter, notice or report.',
    ],
    correctAnswer: 3,
    explanation:
      "Once a material breach is identified, FFI invoicing starts from the inspector's first time spent on the matter. The HSE's Enforcement Management Model is the published decision tool against which 'material' is judged. The threshold is lower than 'serious enough to prosecute' — it covers any breach the inspector formally writes down. Verbal advice doesn't trigger FFI; a written letter does.",
  },
  {
    id: 4,
    question: 'Under HASAWA, where do summary and indictable offences sit?',
    options: [
      "Most are triable either way — the prosecution chooses Magistrates' (summary) or Crown (indictment), with unlimited fines available in both since 2015.",
      "All HASAWA offences are summary only and can be heard solely in the Magistrates' Court, which is capped at a £5,000 fine.",
      "All HASAWA offences are indictable only and must go straight to the Crown Court, with no role for the Magistrates' Court.",
      "Summary offences are heard in the Crown Court and indictable offences in the Magistrates' Court — the more serious the breach, the lower the court.",
    ],
    correctAnswer: 0,
    explanation:
      "The Magistrates' Court can impose unlimited fines on H&S offences (since 2015) and up to 6 months imprisonment; the Crown Court can impose unlimited fines and up to 2 years imprisonment for individuals (life for Corporate Manslaughter). The Sentencing Council Definitive Guideline applies in both courts. Magistrates' jurisdiction was extended in 2015, removing the previous £20k cap. The prosecution picks the venue based on case complexity and likely sentence.",
  },
  {
    id: 5,
    question: 'What does the Corporate Manslaughter and Corporate Homicide Act 2007 do?',
    options: [
      'Requires every company to appoint a director with personal responsibility for health and safety, who can be jailed if any worker is injured.',
      "Creates a corporate offence where an organisation's activities cause a death through a gross breach of a duty of care rooted in senior management failure.",
      'Sets a fixed tariff of fines for companies whose negligence causes a death, calculated purely on the number of employees they have.',
      'Replaces all HASAWA prosecutions where a death has occurred, so a company can only ever be charged under one Act or the other.',
    ],
    correctAnswer: 1,
    explanation:
      "The offence is triable on indictment only, carries unlimited fines, and allows publicity orders and remedial orders; it sits alongside HASAWA prosecutions, not as a replacement. The CMCHA 2007 fixed the historical problem of being unable to prosecute large companies for manslaughter (the 'identification doctrine' required a single guiding mind). Senior management failure as a 'substantial element' is the test. Fines are typically multi-million.",
  },
  {
    id: 6,
    question: "What's the HSE Public Register of Convictions and Notices?",
    options: [
      'A private database held by the HSE that records every workplace accident reported under RIDDOR, accessible only to inspectors.',
      'A register of qualified electricians maintained by the HSE, which clients check before awarding electrical work.',
      'A public, searchable online register of all HSE prosecutions and notices, used by clients, insurers and competitors during procurement.',
      'A list of approved test instruments and PPE that the HSE certifies as compliant with its guidance, updated annually.',
    ],
    correctAnswer: 2,
    explanation:
      'The register is searchable by company name and inspector area, and is used by clients during procurement, by insurers when underwriting, by competitors, by potential employees and by news organisations. The reputational impact often outstrips the legal cost — major clients delist firms with prohibition notices. Procurement frameworks routinely require declaration of any HSE notices in the past 5 years, and a prohibition notice can disqualify a firm from bidding on public-sector work for years.',
  },
  {
    id: 7,
    question:
      'How does the Sentencing Council Definitive Guideline (2016) determine corporate fines?',
    options: [
      "A flat percentage of the company's annual turnover, fixed at 10 percent regardless of the seriousness of the breach.",
      'The number of previous convictions the company holds, with the fine doubling for each earlier offence on the register.',
      'A fixed scale of penalties set by statute for each named offence, leaving the court no discretion to vary the amount.',
      "A matrix combining culpability, harm category and the company's turnover band to give a starting point and range, adjusted for aggravating and mitigating factors.",
    ],
    correctAnswer: 3,
    explanation:
      "The three steps are: (1) culpability — Very High / High / Medium / Low; (2) harm — Category 1 (death/permanent), 2 (serious) or 3 (minor), adjusted for risk of higher harm or multiple persons; (3) turnover band — Large (£50m+), Medium (£10-£50m), Small (£2-£10m), Micro (under £2m). The matching cell gives a starting point and range, moved up for aggravating factors and down for mitigating. The largest cell (high culpability x Cat 1 harm x very large turnover) starts at £4m with a range up to £20m+ before mitigation. Smaller firms aren't immune — the turnover effect can be severe even for £2m firms.",
  },
  {
    id: 8,
    question:
      "When an HSE inspector arrives on site unannounced, what's the L3 operative response?",
    options: [
      'Cooperate, confirm your name and role, direct the inspector to the senior person on site, and answer factual questions truthfully without speculating.',
      'Refuse the inspector entry until they produce a court warrant, since HSE inspectors have no right to enter premises without one.',
      "Down tools and leave site immediately, because an inspector's visit means all work must stop until the firm's solicitor arrives.",
      'Answer every question in as much detail as possible, guessing where you are unsure, so the inspector forms a complete picture.',
    ],
    correctAnswer: 0,
    explanation:
      "Cooperation discharges HASAWA s.7 and CDM Reg 15, and interfering with an inspector is a separate offence under HASAWA s.33. If asked technical questions outside your competence, say so honestly rather than guessing, and notify your firm immediately. HSE inspectors can enter at any reasonable time without a warrant under HASAWA s.20, so refusal is an offence. The firm's legal/H&S team handles the formal interview.",
  },
];

const faqs2 = [
  {
    question: 'Can the HSE prosecute me personally as an L3 apprentice?',
    answer:
      'Theoretically yes (HASAWA s.7), but in practice individual prosecutions are rare and reserved for serious personal misconduct (e.g. deliberate bypassing of safety controls causing death). Most prosecutions target the firm or director. The PRACTICAL personal risk for an L3 is being a witness in a prosecution against the firm — your statements, your records, your refusals all become evidence.',
  },
  {
    question: 'If the HSE sends a Notice of Contravention (NoC), is that an FFI invoice?',
    answer:
      'Yes — the NoC is the document that triggers FFI invoicing. It states the breach, the regulation breached, and the time billed. The NoC is sent to the dutyholder (usually the company); they have a right to reply. Disputed FFI invoices can be challenged via the HSE-internal disputes panel.',
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
    question: 'How long do HSE notices stay on the public register?',
    answer:
      "Five years for notices; convictions can stay longer depending on category and severity. The reputational impact reduces over time but doesn't disappear immediately. Firms aiming for major framework agreements often have to declare any notices in the past 5-10 years even after they've dropped off the register.",
  },
  {
    question:
      "If I'm called as a witness in an HSE prosecution against my firm, do I have to give evidence?",
    answer:
      "Generally yes — witness summonses can compel attendance. You should have your own solicitor (often arranged by the firm or via your union) before giving evidence. Truthfulness is the only safe approach; perjury is a separate criminal offence. Your evidence is protected by the privilege against self-incrimination — you don't have to incriminate yourself, but you do have to attend.",
  },
];

export default function Lesson303_2_2() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Who turns up after an incident — HSE inspectors for higher-risk premises, Local Authority
        EHOs for lower-risk. Powers under HASAWA s.20 to s.22 and s.33, and the RIDDOR reporting
        that brings them in.
      </p>

      <TLDR
        points={[
          'Supplementary content — it builds the enforcement layer on top of this outcome rather than answering a criterion of its own.',
          'Two enforcing authorities. HSE for higher-risk premises (factories, construction, hospitals, schools). Local Authority EHOs for lower-risk (offices, shops, hotels). Same HASAWA powers, different default cases. The 1998 Enforcing Authority Regulations set the split.',
          'Three notices to know. Improvement Notice (s.21) — fix it within 21 days. Prohibition Notice (s.22) — stop now. Both are public on the HSE Notices database for years.',
          'RIDDOR 2013 is the reporting bridge. Specified injuries (Reg 4), over-7-day incapacitation (Reg 6), occupational diseases (Reg 8), dangerous occurrences (Reg 7), gas incidents (Reg 11). F2508 form on hse.gov.uk.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify the two enforcing authorities for UK workplace H&S — the HSE and Local Authority Environmental Health Officers — and how the Health and Safety (Enforcing Authority) Regulations 1998 split enforcement between them.',
          "State the HSE / EHO investigative powers under HASAWA s.20 — entry without warrant, inspection, sample / measurement / photograph, document inspection, statement-taking, seizure of articles or substances, magistrate's warrant where entry is refused.",
          'Explain the difference between an Improvement Notice (HASAWA s.21) and a Prohibition Notice (HASAWA s.22) — trigger, effect, compliance period and appeal route.',
          'Describe the RIDDOR 2013 reporting categories — specified injuries (Reg 4), over-7-day incapacitation (Reg 6), occupational diseases (Reg 8), dangerous occurrences (Reg 7), gas incidents (Reg 11) — and the F2508 reporting mechanism.',
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
          The Health and Safety (Enforcing Authority) Regulations 1998 (SI 1998/494) allocate
          premises by main activity:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>HSE-enforced premises</strong> include factories, building sites, construction
            sites, mines and quarries, fairgrounds, agricultural premises, hospitals, schools and
            educational establishments, gas / electricity / water undertakings, offshore
            installations, railways, the public sector, government premises and similar.
          </li>
          <li>
            <strong>Local Authority-enforced premises</strong> include offices, shops, wholesale
            and retail distribution, hotels and catering, sports and leisure, churches and other
            places of worship, residential care homes (with caveats), and most other
            consumer-facing premises.
          </li>
          <li>
            <strong>Mixed premises</strong> can be split — e.g. a hotel with a gym (Local
            Authority for the hotel, possibly HSE for the maintenance plant if significant). The
            1998 Regulations include detailed allocation rules for the edge cases.
          </li>
        </ul>
        <p>
          The takeaway for an apprentice: the enforcer&apos;s name on any letter or notice tells
          you whether you&apos;re in HSE territory or Local Authority territory, but the law and
          the powers are the same in both.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The investigative powers — HASAWA s.20</ContentEyebrow>

      <ConceptBlock
        title="HASAWA s.20 gives inspectors deliberately wide powers"
        plainEnglish="HASAWA s.20 lists the powers an HSE inspector or an EHO has when investigating a workplace. They're deliberately wide — Parliament didn't want investigations stopped at the door. Refusing to co-operate is itself a criminal offence under HASAWA s.33."
        onSite="As an apprentice on site during an inspector visit, your job is to co-operate fully and answer truthfully. Anything you say can become evidence later. If you don't know the answer, say so. Don't speculate, don't volunteer opinions, don't try to spin events to make the firm look better — the inspector will see through it and the firm will end up worse off. Let the firm's H&S contact handle the substantive engagement once they arrive."
      >
        <p>The s.20 powers in summary:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Right of entry</strong> — at any reasonable time, with no warrant required.
            Police backup if entry is refused. A magistrate&apos;s warrant for forced entry where
            the inspector believes refusal will continue.
          </li>
          <li>
            <strong>Inspection and examination</strong> — premises, equipment, articles,
            substances, documents. Photographs, measurements, samples and recordings.
          </li>
          <li>
            <strong>Statements</strong> — power to require any person reasonably believed to be
            able to give relevant information to answer questions and sign a declaration of the
            truth of their answers. Statements taken under s.20 are usable in any subsequent
            proceedings.
          </li>
          <li>
            <strong>Documents</strong> — power to require production of any books or documents
            required by the relevant statutory provisions, and to inspect and copy them.
          </li>
          <li>
            <strong>Seizure</strong> — power to seize and detain articles or substances believed
            to pose an immediate risk of serious personal injury, and to render them harmless.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Inspector statements — what to say and what not to volunteer"
        plainEnglish="The inspector's right to take a statement under HASAWA s.20(2)(j) is a powerful tool. The statement is signed and is admissible in any later prosecution. Once signed it's hard to walk back. So while you must co-operate, the statement should be limited to facts you actually know — not guesses, not opinions about whether someone else was at fault, not characterisations of company culture."
        onSite="As an apprentice you might be asked for a statement on the day of an incident or weeks later. The right approach is be polite, co-operate, answer factual questions accurately, and decline to speculate. If you don't remember a detail, say so. If a question is outside your knowledge or experience, say so. Ask to read the statement before signing — that's your right. If anything in it doesn't match what you said, get it changed before signing. Take a copy."
      >
        <p>Practical statement-taking guidance:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Tell what you saw, did, and were told. Stick to facts you can stand behind under
            cross-examination.
          </li>
          <li>
            Don&apos;t guess at times, distances or sequences if you&apos;re not sure — &quot;I
            think it was about 10 minutes&quot; is fine; &quot;exactly 8 minutes 32 seconds&quot;
            better not be invented.
          </li>
          <li>
            Don&apos;t speculate about other people&apos;s motives, knowledge or actions. Stick to
            what you personally observed.
          </li>
          <li>
            Read the typed statement carefully before signing. Insist on changes if anything is
            wrong. Initial each amendment.
          </li>
          <li>
            Take a copy. Tell your firm&apos;s H&amp;S contact and (if relevant) your union or
            apprenticeship provider that you&apos;ve given a statement.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Health and Safety at Work etc Act 1974 — s.21 (Improvement Notices)"
        clause={
          <>
            &quot;If an inspector is of the opinion that a person — (a) is contravening one or
            more of the relevant statutory provisions; or (b) has contravened one or more of those
            provisions in circumstances that make it likely that the contravention will continue
            or be repeated, he may serve on him a notice (in this Part referred to as &apos;an
            improvement notice&apos;) stating that he is of that opinion, specifying the provision
            or provisions as to which he is of that opinion, giving particulars of the reasons why
            he is of that opinion, and requiring that person to remedy the contravention or, as
            the case may be, the matters occasioning it within such period (ending not earlier
            than the period within which an appeal against the notice can be brought under section
            24) as may be specified in the notice.&quot;
          </>
        }
        meaning={
          <>
            The Improvement Notice is the inspector&apos;s &apos;put it right&apos; tool. It
            identifies the breach, gives particulars, and sets a compliance period (minimum 21
            days). The duty-holder can either remedy the contravention within the period, or
            appeal to an Employment Tribunal within 21 days (which suspends the notice). Failing
            to comply with an unappealed Improvement Notice is itself a criminal offence under
            HASAWA s.33. The notice appears on the public HSE Notices database — visible on tender
            questionnaires for years afterwards, which is itself a significant commercial cost on
            top of any remediation work.
          </>
        }
        cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.21 — verbatim from legislation.gov.uk."
      />

      <RegsCallout
        source="Health and Safety at Work etc Act 1974 — s.22 (Prohibition Notices)"
        clause={
          <>
            &quot;If as regards any activities to which this section applies an inspector is of
            the opinion that, as carried on or about to be carried on by or under the control of
            the person on whom the notice mentioned below is to be served, the activities involve
            or, as the case may be, will involve a risk of serious personal injury, the inspector
            may serve on that person a notice (in this Part referred to as &apos;a prohibition
            notice&apos;) ... A prohibition notice shall — (a) state that the inspector is of the
            said opinion; (b) specify the matters which in his opinion give or, as the case may
            be, will give rise to the said risk; (c) where in his opinion any of those matters
            involves or, as the case may be, will involve a contravention of any of the relevant
            statutory provisions, state that he is of that opinion, specify the provision or
            provisions as to which he is of that opinion ...&quot;
          </>
        }
        meaning={
          <>
            The Prohibition Notice is the heavier weapon. The trigger is &apos;risk of serious
            personal injury&apos; — not a regulatory breach as such. The activity must stop
            immediately or by the time stated on the notice. Appeal to Employment Tribunal is
            possible within 21 days, but appeal does NOT suspend the notice (the key difference
            from an Improvement Notice) — the activity stays prohibited pending the appeal
            hearing. Carrying on the prohibited activity is itself a serious criminal offence
            under HASAWA s.33. Like Improvement Notices, Prohibition Notices appear on the public
            HSE Notices database.
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
          Each rung on the ladder appears (or doesn&apos;t) on the public HSE Notices database in
          different ways:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Verbal advice and letters</strong> — typically not on the public database.
            Internal HSE / Local Authority records.
          </li>
          <li>
            <strong>Improvement Notices</strong> — published on the HSE Notices database with the
            firm&apos;s name, the date, the breach and the compliance period. Visible for several
            years.
          </li>
          <li>
            <strong>Prohibition Notices</strong> — published on the HSE Notices database in the
            same way. Their &apos;immediate&apos; nature is what makes them particularly damaging
            on tender questionnaires.
          </li>
          <li>
            <strong>Prosecutions</strong> — published on the HSE Convictions database with the
            firm&apos;s name, the offence, the court, the sentence and the date. Visible for many
            years; on a tender questionnaire it&apos;s a clear flag for the client&apos;s
            procurement team.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="The HSE Notices and Convictions databases — public, indexed, long-lived"
        plainEnglish="Both Improvement and Prohibition Notices, and any HSE prosecutions resulting in conviction, appear on public databases hosted on the HSE website. They're searchable by company name, postcode and offence. Tender procurement teams use them routinely. Insurers use them. Specialist procurement consultants pull them as part of pre-qualification."
        onSite="The commercial cost of a notice or conviction often exceeds the direct cost of the remediation or fine. A small electrical contractor with a Prohibition Notice on its public record can lose tier-one client work for years. Apprentices whose firms appear on the database experience that as fewer big contracts and reduced opportunity. The system is designed to make the consequences of non-compliance visible to the market — that's the deterrent effect on top of the formal penalty."
      >
        <p>How the public-record effect plays out commercially:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>PQQ / SSIP questionnaires</strong> typically ask &quot;has the firm received
            any H&amp;S notices in the past 3 / 5 years?&quot;. The HSE database makes any
            &apos;no&apos; answer easily checked.
          </li>
          <li>
            <strong>Insurance renewals</strong> may ask about notices and convictions, and may
            price-up or refuse cover based on the answer.
          </li>
          <li>
            <strong>Scheme membership</strong> bodies (NICEIC, NAPIT, Stroma and similar) monitor
            the databases and may take their own disciplinary action.
          </li>
          <li>
            <strong>Public-sector procurement</strong> often excludes contractors with certain
            categories of conviction under Procurement Regulations.
          </li>
          <li>
            <strong>Customer trust</strong> — homeowners increasingly check trader reputations
            online; a public conviction is a permanent dent.
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
        <p>The reportable categories under RIDDOR 2013:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Reg 4 — Specified injuries</strong>. The most serious named injuries —
            fatalities (immediate report), fractures other than to fingers / toes / thumbs,
            amputations, serious burns covering &gt;10% of the body or causing significant damage
            to eyes / respiratory system / vital organs, scalpings requiring hospital treatment,
            loss of consciousness from head injury or asphyxia, loss of consciousness or hospital
            admission from electric shock, loss of sight (whether temporary or permanent), serious
            eye injury, crush injuries to the head or torso causing brain or internal organ
            damage. Reportable as soon as possible and by the F2508 within 10 days.
          </li>
          <li>
            <strong>Reg 6 — Over-7-day incapacitation</strong>. A non-specified injury that
            results in a worker being unable to do their normal work for more than 7 consecutive
            days (excluding the day of the accident, including weekends). Reportable within 15
            days.
          </li>
          <li>
            <strong>Reg 7 — Dangerous occurrences</strong>. A defined list (Schedule 2) of
            near-miss events that must be reported even with no injury — including electrical
            short circuits or overloads causing fire or explosion, plant collapse, scaffold
            failure, dangerous occurrences in or near a pipeline, and others. Immediate / 10-day
            report.
          </li>
          <li>
            <strong>Reg 8 — Occupational diseases</strong>. Reportable diseases linked to work —
            carpal tunnel syndrome from repetitive vibration, occupational dermatitis,
            occupational asthma, hand-arm vibration syndrome, certain cancers, certain infections.
            Reportable on diagnosis.
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
            Reg 4 requires the responsible person to report &apos;specified injuries&apos; listed
            in Schedule 1 — including (paraphrased) fatalities, fractures other than to fingers /
            toes / thumbs, amputations, permanent loss of or reduction in sight, crush injuries
            leading to internal organ damage, serious burns covering more than 10% of the body or
            causing significant damage to eyes / respiratory system / vital organs, scalpings
            requiring hospital treatment, loss of consciousness from head injury or asphyxia, and
            any other injury arising from working in an enclosed space leading to hypothermia,
            heat-induced illness or resuscitation or admission to hospital for more than 24 hours.
            The report is made via the F2508 form on hse.gov.uk as soon as practicable and within
            10 days of the accident.
          </>
        }
        meaning={
          <>
            Reg 4 sets the &apos;named&apos; injury list — the events that are serious enough that
            Parliament wants the HSE to know about them. For an electrician the most relevant
            entries are the loss-of-consciousness-from-electric-shock entry, the serious-burns
            entry (think arc flash) and the amputation entry. The responsible-person duty sits on
            the employer; the apprentice&apos;s role is to tell the supervisor at the time. Late
            or missing reports are themselves criminal offences under RIDDOR Reg 12 and a common
            HSE prosecution route on top of the underlying incident.
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
        <p>What goes on the F2508 (in summary):</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Reporter details — who is filing, on whose behalf, with what authority.</li>
          <li>
            Injured person details — name, occupation, age, employment status (employee, trainee,
            contractor, member of public).
          </li>
          <li>
            Accident details — date, time, location, type of incident, injury sustained, hospital
            admission.
          </li>
          <li>
            Description of what happened — factual, neutral, no apportionment of blame
            (that&apos;s for the investigation, not the report).
          </li>
          <li>Kind of work being done at the time — the activity and the equipment.</li>
        </ul>
        <p>
          Reports must be filed within the statutory timeframe — fatalities and specified injuries
          within 10 days, over-7-day incapacitation within 15 days, dangerous occurrences within
          10 days. Late reports are themselves a Reg 12 offence.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Internal near-miss reporting — separate from RIDDOR but just as important"
        plainEnglish="Most workplace H&S harm follows a pyramid pattern — many near-misses at the bottom, fewer minor injuries above, fewer major injuries above that, and (rarely) fatalities at the top. Capturing near-misses is what gives the firm advance warning of where the real injury will eventually happen."
        onSite="Most firms have an internal near-miss reporting system — a paper form, an app, a section of the toolbox-talk record. Use it. The apprentice's job is to capture every near-miss, even the ones that 'didn't really happen' — a slip recovered from, a near-contact with a live conductor, a tool that nearly fell from height. The data feeds the firm's safety system and (over time) shapes the RAMS, the toolbox-talk topics and the training programme."
      >
        <p>What counts as a near-miss worth recording:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Anything that, with slightly different circumstances, could have caused an injury or
            RIDDOR-reportable event.
          </li>
          <li>
            A safety control that failed or nearly failed (an interlock that didn&apos;t latch, a
            lock-off that came undone, an RCD that nominally worked but tripped slowly).
          </li>
          <li>
            A behavioural slip — someone reaching for the wrong tool, the wrong breaker, the wrong
            cable.
          </li>
          <li>
            An environmental change — weather worsening, lighting dropping, dust building up —
            that increased risk.
          </li>
          <li>
            A communication failure — instruction misunderstood, briefing missed, document version
            mismatched.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Thinking 'near-misses don't matter'"
        whatHappens={
          <>
            Apprentice on a CU change brushes their forearm against a partly-isolated bus bar.
            Small spark, no injury, no equipment damage. Apprentice doesn&apos;t mention it
            because &quot;nothing happened&quot;. Three weeks later the same near-miss pattern
            recurs on a different job and this time someone is hospitalised. The HSE investigation
            looks at the firm&apos;s near-miss reporting and finds nothing — so the question
            becomes &quot;did this firm have a culture of capturing warning signs, or did they
            ignore them?&quot;. The first apprentice&apos;s unreported near-miss becomes evidence
            in the prosecution.
          </>
        }
        doInstead={
          <>
            Tell the supervisor at the time, even when nothing happened. Most firms have an
            internal near-miss reporting form or app — fill it in. The reason near-miss reporting
            exists is that near-misses are statistically the leading indicator of next
            month&apos;s actual injury — Heinrich&apos;s pyramid is a rough rule of thumb, and
            ignoring the bottom of the pyramid is exactly how the top of the pyramid (fatalities)
            becomes inevitable. Capture the near-miss, log the cause, fix the system. That&apos;s
            how the firm learns; that&apos;s also how the firm builds the evidence trail that
            protects it from prosecution after a future incident.
          </>
        }
      />

      <CommonMistake
        title="Speculating to the inspector to make the firm look better"
        whatHappens={
          <>
            HSE inspector turns up after a near-miss, asks the apprentice what happened.
            Apprentice gets nervous, fills in gaps with guesses to make the supervisor look less
            bad — &quot;I think the supervisor probably checked the lock-off before he left,
            although I didn&apos;t see him do it&quot;. Inspector takes a written statement, reads
            it back, apprentice signs. Later investigation reveals the lock-off wasn&apos;t
            checked, the apprentice&apos;s statement is shown to be speculative, and the firm is
            then dealing with both the underlying breach AND evidence that the apprentice may have
            been pressured to cover it up.
          </>
        }
        doInstead={
          <>
            Stick to what you saw, did and were told. If you didn&apos;t see something, say so —
            &quot;I don&apos;t know whether the lock-off was checked; I didn&apos;t see that
            part&quot;. Inspectors expect honesty about gaps in your knowledge. Speculation
            dressed as fact is what gets people in trouble. As an apprentice you&apos;re typically
            the witness, not the duty-holder — your job is accurate evidence, not advocacy. Let
            the firm&apos;s H&amp;S contact and (if needed) solicitor handle the strategic angle
            once they arrive.
          </>
        }
      />

      <Scenario
        title="Apprentice cuts hand on metal trunking, off work 10 days — what's reportable?"
        situation={
          <>
            You&apos;re second-fixing on a commercial fit-out. While pulling a 16 mm² cable
            through pre-installed metal trunking your forearm catches on a sharp burr left from
            the trunking cut. Deep cut, ~7cm long, bleeding heavily. A&amp;E, six stitches, signed
            off by the GP for 10 working days. You&apos;re back on site on day 11 with the wound
            healed but tender. The supervisor asks &quot;did we report this somewhere?&quot;.
          </>
        }
        whatToDo={
          <>
            Yes — this is reportable under RIDDOR 2013 Reg 6 (over-7-day incapacitation). The
            clock is calculated from the day after the accident, including weekends — so 10
            working days off is well over the 7-day threshold. The &apos;responsible person&apos;
            under RIDDOR is the employer (your firm), so they file the F2508 form on hse.gov.uk
            within 15 days of the accident. Your role: tell the supervisor immediately on the day,
            tell them again when the GP signs you off for 10 days, give them a copy of the GP
            note. The supervisor or H&amp;S contact files the F2508. Internally, the firm should
            also do a local incident report — what caused the burr, how it was missed in the
            first-fix sign-off, what changes are needed (better deburring, better visual
            inspection of pre-installed trunking before pulling). The site CDM principal
            contractor should also be informed. After the fact, the apprentice keeps a personal
            note of the dates, times and what was reported to whom — that&apos;s your record if
            there&apos;s any later HSE involvement or any insurance claim.
          </>
        }
        whyItMatters={
          <>
            The over-7-day threshold is one of the most-missed RIDDOR triggers in small firms —
            &apos;just a cut&apos; sounds minor but the off-work duration is what makes it
            reportable. Failing to report on time is a criminal offence under RIDDOR Reg 12 and a
            common HSE prosecution route on top of the underlying incident. The firm&apos;s
            liability is independent of fault — the employer owes the duty regardless of whose
            burr it was. The apprentice&apos;s liability under HASAWA s.7 is triggered by failing
            to TELL someone — co-operating with the firm&apos;s safety arrangements includes
            telling them about reportable events. Both sides have to act for the system to work.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Two enforcing authorities — HSE for higher-risk premises (factories, construction, hospitals, schools), Local Authority EHOs for lower-risk (offices, shops, hotels). Same HASAWA powers, different default cases. Set by the 1998 Enforcing Authority Regulations.',
          'HASAWA s.20 gives inspectors wide investigative powers — entry without warrant, inspection, sampling, statements, document inspection, seizure. Refusing to co-operate is a separate criminal offence under HASAWA s.33.',
          'Improvement Notice (s.21) — fix it within the specified period (minimum 21 days). Appeal to Employment Tribunal within 21 days suspends the notice. Failure to comply = separate criminal offence.',
          'Prohibition Notice (s.22) — stop the activity now because of risk of serious personal injury. Appeal to Employment Tribunal within 21 days does NOT suspend the notice. Carrying on while prohibited = serious criminal offence.',
          "Both notices appear on the public HSE Notices database for several years — they're a commercial cost on top of the remediation cost because they show up on tender questionnaires.",
          'RIDDOR 2013 reporting categories — Reg 4 specified injuries, Reg 6 over-7-day incapacitation, Reg 7 dangerous occurrences, Reg 8 occupational diseases, Reg 11 gas incidents. F2508 form on hse.gov.uk. Failure to report = separate criminal offence under Reg 12.',
          "Near-misses are the leading indicator of next month's incident — capture them in the firm's internal system even where they don't formally trigger RIDDOR. Ignoring them is how injuries become inevitable.",
          "Apprentice's role in enforcement — co-operate fully, answer truthfully, don't speculate, tell the supervisor about reportable incidents, keep your own contemporaneous note. Let the firm's H&S contact handle substantive engagement.",
        ]}
      />

      <Quiz
        title="HSE & Local Authority enforcement — knowledge check"
        questions={quizQuestions}
      />

      {/* ── Prev / next nav ─────────────────────────────────── */}

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Remember from L2 — HSE was 'the enforcer'. At L3 the depth shift is knowing the
        enforcement tools (improvement notice, prohibition notice, FFI, prosecution), the
        Sentencing Council guideline and the public register that follows the firm for years.
      </p>

      <TLDR
        points={[
          "HSE inspectors have wide statutory powers under HASAWA s.20–25 — entry, photos, samples, statements, document seizure, equipment dismantling. Cooperation under s.7 / CDM Reg 15 is the operative's duty.",
          'Three enforcement tools: improvement notice (fix within deadline), prohibition notice (stop until fixed), prosecution. FFI is the cost-recovery system that bills inspector time for material breaches at ~£170/hr.',
          "Sentencing Council Definitive Guideline (2016) — culpability × harm × turnover matrix. Reputation via the HSE Public Register often hurts the firm more than the fine. Insurance doesn't cover criminal fines.",
        ]}
      />

      <LearningOutcomes
        outcomes={[
          "Identify the HSE's powers under HASAWA Part I — inspection, entry, notices, seizure, prosecution.",
          'Distinguish improvement notices (s.21) from prohibition notices (s.22) and explain the consequences of each.',
          "Describe Fee for Intervention (FFI) — when it applies, the trigger of a 'material breach', and the cost recovery mechanism.",
          'Apply the Sentencing Council Definitive Guideline (2016) — culpability × harm × turnover — to estimate fine bands.',
          'Identify the alternative enforcement bodies — Local Authority EHOs, ORR, MCA, CAA, ONR — and which sectors they cover.',
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
          <li>
            <strong>s.20 entry</strong> — at any reasonable time, with assistance, with samples,
            with whomever they need to bring.
          </li>
          <li>
            <strong>s.20 examination</strong> — examine, investigate and direct premises and
            articles to be left undisturbed.
          </li>
          <li>
            <strong>s.20 statements</strong> — require any person to answer questions and to sign
            a declaration of truth.
          </li>
          <li>
            <strong>s.20 documents</strong> — require production of, take copies of, books and
            documents.
          </li>
          <li>
            <strong>s.21 improvement notice</strong> — formal notice to remedy a contravention
            within a specified time.
          </li>
          <li>
            <strong>s.22 prohibition notice</strong> — formal notice to stop an activity
            immediately (or by a stated date) until the risk is remedied.
          </li>
          <li>
            <strong>s.25 seizure</strong> — seize articles or substances posing imminent danger of
            serious personal injury and render them harmless.
          </li>
          <li>
            <strong>s.33 offences</strong> — prosecution for failure to comply with notices,
            obstruction, false statements, fraud on certificates.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Health and Safety at Work etc Act 1974 — s.21"
        clause={
          <>
            &quot;If an inspector is of the opinion that a person — (a) is contravening one or
            more of the relevant statutory provisions; or (b) has contravened one or more of those
            provisions in circumstances that make it likely that the contravention will continue
            or be repeated, he may serve on him a notice (in this Part referred to as &apos;an
            improvement notice&apos;) stating that he is of that opinion, specifying the provision
            or provisions as to which he is of that opinion, giving particulars of the reasons why
            he is of that opinion, and requiring that person to remedy the contravention or, as
            the case may be, the matters occasioning it within such period (ending not earlier
            than the period within which an appeal against the notice can be brought under section
            24) as may be specified in the notice.&quot;
          </>
        }
        meaning={
          <>
            Improvement notice = remedy within deadline. Right of appeal to Employment Tribunal
            within 21 days; appeal suspends the notice. Failure to comply is an offence under
            s.33. Notice is published on the HSE Public Register.
          </>
        }
        cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.21."
      />

      <RegsCallout
        source="Health and Safety at Work etc Act 1974 — s.22"
        clause={
          <>
            &quot;This section applies to any activities which are being or are likely to be
            carried on by or under the control of any person, being activities to or in relation
            to which any of the relevant statutory provisions apply or will, if the activities are
            so carried on, apply. If as regards any activities to which this section applies an
            inspector is of the opinion that, as carried on or likely to be carried on by or under
            the control of the person in question, the activities involve or, as the case may be,
            will involve a risk of serious personal injury, the inspector may serve on that person
            a notice (in this Part referred to as &apos;a prohibition notice&apos;).&quot;
          </>
        }
        meaning={
          <>
            Prohibition notice = STOP. The activity stops on service (or by the stated date, if
            &quot;deferred&quot;) until the inspector is satisfied the risk is remedied. Right of
            appeal exists but does NOT suspend the prohibition. Working in defiance of a
            prohibition notice is a serious s.33 offence — unlimited fine and up to 2 years
            imprisonment on indictment.
          </>
        }
        cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.22."
      />

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
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
          <li>
            <strong>Trigger</strong> — inspector identifies material breach AND writes a letter,
            notice or report. Verbal advice doesn&apos;t trigger.
          </li>
          <li>
            <strong>Hourly rate</strong> — set by the HSE annually. Currently around £170/hr
            (verify with current HSE rates).
          </li>
          <li>
            <strong>What&apos;s billed</strong> — inspector time, including investigation,
            paperwork, follow-up. Travel typically excluded.
          </li>
          <li>
            <strong>Invoice arrives</strong> — Notice of Contravention with FFI itemisation.
            30-day payment terms.
          </li>
          <li>
            <strong>Disputes</strong> — internal HSE disputes panel. Limited grounds. Most
            disputes lose.
          </li>
          <li>
            <strong>Cumulative effect</strong> — multiple visits / breaches add up. Five-figure
            FFI invoices are common for systemic issues.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
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
          <li>
            Aggravating factors (cost-cutting motive, repeat offending, vulnerable victim) push
            up.
          </li>
          <li>
            Mitigating factors (early plea, prompt remedial action, full cooperation, no previous
            record) push down.
          </li>
          <li>
            Final fine + costs + FFI + lost contracts + reputation damage typically exceed the
            fine itself by 2-5x.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
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
          <li>
            <strong>Procurement</strong> — most major clients require disclosure of HSE notices in
            the past 5+ years.
          </li>
          <li>
            <strong>Insurance</strong> — Employer&apos;s Liability and Public Liability premiums
            rise; some insurers decline.
          </li>
          <li>
            <strong>Framework agreements</strong> — public-sector and major-private-sector
            frameworks can disqualify firms with prohibition notices.
          </li>
          <li>
            <strong>Subcontractor pre-qualification</strong> — main contractors check the register
            before adding firms to approved-supplier lists.
          </li>
          <li>
            <strong>Customer perception</strong> — high-net-worth domestic and commercial clients
            increasingly Google contractors before engaging.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The Enforcement Management Model — how inspectors decide</ContentEyebrow>

      <ConceptBlock
        title="EMM: the published decision tool that turns inspector judgement into structured choice"
        plainEnglish='The HSE&apos;s Enforcement Management Model (EMM) is a publicly-published decision tool the inspector uses on every visit. It maps the actual risk-control gap ("what was done" vs "what the benchmark required") and the actual or potential harm against a published matrix to produce an enforcement expectation: no action / advice / improvement notice / prohibition notice / prosecution / Crown Court referral. Knowing the EMM exists is the L3 step from "the inspector decides" to "the inspector follows a structured tool, and the firm can predict the likely outcome".'
        onSite="Practical implication: the firm's response strategy after a visit can be informed by which EMM cell the breach landed in. A 'medium gap, low harm' cell normally produces advice or an improvement notice; a 'substantial gap, serious actual harm' cell produces prosecution. The firm's solicitor or H&amp;S manager will be familiar with the EMM and use it to anticipate enforcement outcomes."
      >
        <p>EMM inputs the inspector weighs:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>The benchmark</strong> — what the law and authoritative guidance (BS 7671,
            HSG, ACoP) require. The standard the firm should have met.
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
            <strong>Authority and public interest factors</strong> — repeat offending, vulnerable
            victims, fraud, deliberate breach.
          </li>
          <li>
            <strong>Initial enforcement expectation (IEE)</strong> — produced by the matrix; can
            be moderated up or down by the inspector with documented reasons.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Inspector entry powers — what s.20 actually allows</ContentEyebrow>

      <ConceptBlock
        title="Wider than 'they can come in'"
        plainEnglish="HASAWA s.20 is the inspector's power-pack. Entry at any reasonable time without warrant. Bring a constable if obstruction expected. Bring any equipment or material needed. Examine and investigate. Direct the premises to be left undisturbed for a reasonable period. Take measurements, photos, recordings. Take samples. Take possession of articles or substances. Require any person to answer questions and sign a declaration of truth. Require production of books and documents and take copies. Require facilities and assistance from anyone who has a duty under HASAWA."
        onSite='When the inspector arrives, they may ask to take photos of your kit, copy your test instrument calibration certificates, review your job pack, ask for the firm&apos;s training records, demand a statement under s.20(2)(j) ("require any person to answer questions and to sign a declaration of truth"). All of these are statutory powers, not requests. Refusing without lawful excuse is an offence under s.33.'
      >
        <p>What an inspector can demand under s.20:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Entry at any reasonable time</strong> — no warrant required (warrant only
            needed for entry by force).
          </li>
          <li>
            <strong>Examination and investigation</strong> — including dismantling equipment if
            necessary to determine the cause of an event.
          </li>
          <li>
            <strong>Direction to preserve the scene</strong> — for a reasonable period to allow
            examination.
          </li>
          <li>
            <strong>Photographs and recordings</strong> — including of the work area, the
            equipment, the operative and the documentation.
          </li>
          <li>
            <strong>Samples</strong> — of substances, materials, atmosphere.
          </li>
          <li>
            <strong>Possession of articles</strong> — for examination, testing, or preservation as
            evidence.
          </li>
          <li>
            <strong>Statements under declaration of truth</strong> — admissible as evidence;
            refusal is an offence.
          </li>
          <li>
            <strong>Document production and copying</strong> — books, RAMS, training records,
            calibration certificates, EICR / EIC files.
          </li>
          <li>
            <strong>Facilities and assistance</strong> — from any person who has a HASAWA duty
            (which includes operatives via s.7).
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Health and Safety at Work etc Act 1974 — s.20(2)"
        clause={
          <>
            &quot;The powers of an inspector referred to in the preceding subsection are the
            following, namely — (a) at any reasonable time (or, in a situation which in his
            opinion is or may be dangerous, at any time) to enter any premises which he has reason
            to believe it is necessary for him to enter for the purpose mentioned in subsection
            (1) above; ... (j) to require any person whom he has reasonable cause to believe to be
            able to give any information relevant to any examination or investigation under that
            paragraph to answer (in the absence of persons other than a person nominated by him to
            be present and any persons whom the inspector may allow to be present) such questions
            as the inspector thinks fit to ask and to sign a declaration of the truth of his
            answers.&quot;
          </>
        }
        meaning={
          <>
            Eleven sub-powers in s.20(2)(a)–(k). The headline ones for L3: entry without warrant,
            examination, direction to preserve, photos and samples, possession of articles,
            statements under declaration of truth, document production. Refusal of any without
            lawful excuse is an offence under s.33(1)(h). The statement-under-declaration power is
            the one most operatives don&apos;t expect — it&apos;s a formal evidence-gathering
            procedure, not a chat.
          </>
        }
        cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.20."
      />

      <SectionRule />

      <ContentEyebrow>The Notice of Contravention — what arrives in the post</ContentEyebrow>

      <ConceptBlock
        title="Reading the NoC — what it tells you and what to do"
        plainEnglish="The Notice of Contravention (NoC) is the document the HSE sends to a dutyholder after identifying a material breach. It states the regulation breached, what the inspector observed, the action expected, and the FFI invoice. The NoC is NOT itself a statutory notice (it's not an improvement notice or prohibition notice — those are s.21 / s.22 documents); it's an administrative document supporting FFI. But the underlying breach it describes can lead to a statutory notice or prosecution separately."
        onSite='When an NoC arrives, the firm should: (1) check the alleged breach against the actual facts; (2) plan the response — usually remediating the breach quickly is the cheapest path; (3) decide whether to dispute via the FFI internal panel (limited grounds, most disputes lose); (4) brief operatives that an HSE follow-up may be coming. NoCs are NOT to be ignored or paid casually — they record "material breach" against the firm in the HSE&apos;s system.'
      >
        <p>What the NoC contains:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Inspector name, area, contact details.</li>
          <li>Date of visit, location and dutyholder identity.</li>
          <li>Specific regulation alleged to have been breached.</li>
          <li>Factual description of what was observed.</li>
          <li>Required action and timescale (where applicable).</li>
          <li>FFI invoice — itemised inspector time, hourly rate, total.</li>
          <li>Payment terms (typically 30 days) and dispute mechanism.</li>
          <li>Reference to whether further enforcement is being considered.</li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Crown Court referral — when the magistrates send it up</ContentEyebrow>

      <ConceptBlock
        title="Either-way offences and the venue choice"
        plainEnglish="Most HASAWA offences are triable either way. The Magistrates' Court can hear the case (summary trial, max 6 months custody for individuals, unlimited fines since 2015) but can also commit to the Crown Court for trial or sentence if the case is too serious. Crown Court fines and individual sentences (up to 2 years for HASAWA, life for Corporate Manslaughter) are typically larger than Magistrates' outcomes."
        onSite="Why this matters at L3: the venue largely determines the sentence ceiling. A serious incident at a large firm with high culpability is almost always Crown Court; the Sentencing Council guideline produces fines that the magistrates would be reluctant to impose at the maximum. Knowing the venue's coming (the firm's solicitor will tell them) frames the firm's wider response — community impact statements, mitigation evidence, structural changes."
      >
        <p>Factors that push a case to Crown Court:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Severity of harm</strong> — fatality, permanent injury, harm to multiple
            persons.
          </li>
          <li>
            <strong>Culpability band</strong> — &quot;high&quot; or &quot;very high&quot; under
            the Sentencing Council guideline.
          </li>
          <li>
            <strong>Turnover</strong> — large or very large turnover firms tend to be committed
            for sentence even where the breach itself isn&apos;t at the worst end.
          </li>
          <li>
            <strong>Repeat offending</strong> — prior convictions, prior notices, prior FFI
            history.
          </li>
          <li>
            <strong>Aggravating factors</strong> — cost-cutting motive, deliberate breach,
            vulnerable victim, obstruction of investigation.
          </li>
          <li>
            <strong>Public interest</strong> — high-profile incident, sector-wide significance,
            Corporate Manslaughter potential.
          </li>
        </ul>
      </ConceptBlock>

      <CommonMistake
        title="Trying to talk the inspector out of writing the notice"
        whatHappens={
          <>
            Apprentice on site when inspector arrives. Inspector finds an obvious EAWR breach (no
            lock-off on a partially-isolated DB). Apprentice tries to explain, &quot;normally we
            lock it but we&apos;re just taking a quick break, the lock&apos;s in the van&quot;.
            Inspector writes the notice anyway and adds the apprentice&apos;s admission to the
            file. The firm now has a notice on the register AND the inspector&apos;s
            contemporaneous note that the breach was knowing rather than accidental — pushing
            culpability towards &apos;high&apos;.
          </>
        }
        doInstead={
          <>
            Cooperate, identify yourself, direct the inspector to the senior person on site.
            Answer factual questions truthfully but don&apos;t volunteer speculation, opinion or
            admissions of past practice. The firm&apos;s H&amp;S response is handled by the
            H&amp;S manager or solicitor — your job on the day is to be cooperative and factual.
          </>
        }
      />

      <CommonMistake
        title="Treating an FFI invoice as 'optional' until it goes to dispute"
        whatHappens={
          <>
            Firm receives Notice of Contravention with FFI invoice for £4,800. Doesn&apos;t pay;
            assumes &quot;we&apos;ll dispute it later&quot;. Misses the 30-day payment window. HSE
            escalates to debt recovery; the firm now has a payment-default record alongside the
            original breach. Dispute is heard at the internal panel; the substantive case is
            rejected. Firm pays original FFI plus collection costs.
          </>
        }
        doInstead={
          <>
            Pay the FFI invoice within the deadline OR formally raise a dispute within the
            disputes-procedure window (typically 21 days). The dispute process is internal-HSE and
            limited in scope, but it&apos;s the regulatory route. Ignoring an FFI invoice is the
            worst response.
          </>
        }
      />

      <Scenario
        title="Inspector arrives during your fault-finding visit"
        situation={
          <>
            You&apos;re in the second hour of a fault-finding visit at a small manufacturing
            client&apos;s switchroom. Lighting is on, you&apos;ve isolated the affected
            sub-circuit but not the whole DB, you&apos;re wearing FR overalls and using insulated
            tools. An HSE inspector arrives following a routine site visit programme; the site
            manager brings them to your work area. The inspector wants to see your RAMS, your
            safe- isolation evidence, your test instrument calibration certificates and your
            competence record.
          </>
        }
        whatToDo={
          <>
            Stop work safely. Identify yourself by name and role. Provide what you can: the RAMS
            from the job pack, the safe-isolation record (lock-off photo, voltage indicator
            readings), the test instrument calibration cert from your kit, your competence cards
            (NVQ progress, JIB grade if applicable). Be factual: &quot;I&apos;m an L3 apprentice
            working under supervisor X, I have isolated this sub-circuit, here&apos;s the
            evidence&quot;. Phone your supervisor and the firm&apos;s contracts manager
            immediately — they need to know the inspector is on site. Don&apos;t speculate on what
            the inspector might find or volunteer information about other jobs. If asked something
            outside your competence (&quot;why doesn&apos;t the firm use a different breaker
            brand?&quot;) say &quot;I don&apos;t know; the contracts manager can answer
            that&quot;.
          </>
        }
        whyItMatters={
          <>
            The inspector will form an opinion of the firm&apos;s safety culture from this
            30-minute interaction. A cooperative, factual operative who produces the documentation
            calmly creates a much better impression than one who panics or argues. The firm&apos;s
            subsequent FFI exposure depends on what the inspector finds, but it also depends on
            what the inspector writes down — and what they write is shaped by what you say. Your
            statements during the visit can be used as evidence in any subsequent prosecution. ERA
            1996 s.44 protects you from detriment for telling the truth; the firm cannot punish
            you for cooperating with a regulator.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Remember from L2 — HSE is the enforcer. At L3 the depth is the enforcement TOOLKIT (improvement notice, prohibition notice, FFI, prosecution) and the consequences cascade.',
          "HSE inspectors have wide HASAWA Part I powers — entry, photos, samples, statements, document seizure, equipment dismantling, prosecution. Cooperation is the operative's duty.",
          'Improvement notices (s.21) — fix within deadline. Prohibition notices (s.22) — STOP until fixed. Both published on the HSE Public Register.',
          "FFI bills inspector time at ~£170/hr for 'material breaches' formally written up. Disputes go to internal panel; most lose.",
          "Sentencing Council Definitive Guideline (2016): culpability × harm × turnover matrix produces fine bands. Insurance doesn't cover criminal fines.",
          'HSE Public Register has commercial and reputational impact for years — procurement, insurance, framework eligibility all affected.',
          'Local Authority EHOs enforce H&S in retail / office / leisure / residential; HSE enforces construction / manufacturing / industry. Same powers, different agency.',
          "When the inspector arrives: cooperate, identify yourself, direct to senior person, answer facts truthfully, don't speculate, notify the firm immediately.",
        ]}
      />

      <Quiz title="HSE, FFI and enforcement — knowledge check" questions={quizQuestions2} />
    </div>
  );
}
