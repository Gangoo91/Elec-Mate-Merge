/**
 * Module 5 · Section 1 · Subsection 4 — CDM 2015 framework: your duties as Worker
 * Supplementary content — extends LO1 of Unit 210 but is not directly mapped to a
 * 210 AC. Builds the framework that makes Subs 1.1, 1.2, 1.3 make sense.
 *
 * Frame: Client commissions, Principal Designer (PD) co-ordinates pre-construction
 * H&S, Designer designs, Principal Contractor (PC) co-ordinates the construction
 * phase, Contractor does the work, Worker (you) complies. Apprentice = Worker
 * under CDM 2015 Reg 15.
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
  'CDM 2015 framework — your duties as Worker | Level 2 Module 5.1.4 | Elec-Mate';
const DESCRIPTION =
  'Client, Principal Designer, Designer, Principal Contractor, Contractor, Worker — the CDM 2015 cascade and what Reg 15 puts on you personally as an apprentice.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s1-sub4-cdm-roles',
    question:
      "Under CDM 2015, who appoints the Principal Designer (PD) and the Principal Contractor (PC)?",
    options: [
      "The Health and Safety Executive appoints both.",
      "The Client appoints both — under CDM 2015 Reg 5(1) the Client must appoint a Principal Designer and a Principal Contractor in writing on any project involving more than one contractor. If the Client fails to make the appointments, the Client takes on those duties themselves under Reg 5(3) and (4).",
      "The Principal Contractor appoints the Principal Designer.",
      "The Designer appoints the Principal Contractor.",
    ],
    correctIndex: 1,
    explanation:
      "CDM 2015 Reg 5 puts the appointment duty on the Client. The Client appoints the PD (in writing, before pre-construction starts) and the PC (in writing, before construction starts). If the Client doesn't appoint, the Client is treated as the PD/PC themselves and inherits all the duties — which is why most professional Clients make the appointments early. As an apprentice you don't deal with the appointment process but knowing who's the PD and who's the PC on a job is part of understanding the chain.",
  },
  {
    id: 'mod5-s1-sub4-reg15',
    question:
      "Your Foreman tells you the Construction Phase Plan (CPP) for the site is 'just paperwork the boss has to write — don't worry about it'. Under CDM 2015 Reg 15 what's actually expected of you?",
    options: [
      "Nothing — the Foreman is right, the CPP is paperwork.",
      "The CPP is the Principal Contractor's plan for managing H&S during construction (CDM 2015 Reg 12). Reg 15(1)(c) puts a duty on every worker to co-operate with anyone whose duties under CDM you're affecting — that includes the PC's duty to deliver the CPP. In practice you don't have to read the whole CPP but you do have to understand the parts that affect your work (your method, your hazards, your interfaces with other trades), and you do that by attending the site induction and the toolbox talks where the CPP is briefed down to operatives.",
      "Read the entire CPP cover to cover before any work.",
      "Refuse to work because the Foreman dismissed the CPP.",
    ],
    correctIndex: 1,
    explanation:
      "Reg 15(1)(c) is the co-operation duty on workers. The CPP is how the PC discharges its Reg 12 planning duty. The two interlock — the PC writes the plan, you co-operate with it. The Foreman's dismissal of the CPP as 'paperwork' is wrong but a common attitude. You discharge your Reg 15 duty by attending the induction, listening at toolbox talks and following the controls described — not by reading every page of the CPP.",
  },
  {
    id: 'mod5-s1-sub4-induction',
    question:
      "It's day one of a commercial fit-out. You arrive on site, sign in, and the Site Manager runs the CDM induction. What should the induction cover?",
    options: [
      "Just where the toilets are.",
      "Site rules, welfare arrangements, fire muster point, first-aid arrangements, accident and near-miss reporting routes, the Construction Phase Plan headlines, the specific hazards on this site, the PPE policy, the no-go areas, your duties as a worker under Reg 15, and any project-specific risks (asbestos survey results, live services, traffic management). The induction is the formal mechanism for transferring CDM information from the Principal Contractor to operatives joining the site.",
      "Only the parking arrangements.",
      "Only your trade-specific work for the day.",
    ],
    correctIndex: 1,
    explanation:
      "CDM 2015 Reg 13(4)(a) requires the Principal Contractor to ensure a suitable site induction is provided. 'Suitable' means it covers the topics that the workers genuinely need to discharge their Reg 15 duties — site rules, welfare, emergency arrangements, hazards, controls. Skipping or sleeping through the induction is a Reg 15 breach by you and puts you outside the site H&S system on day one. Treat the induction as the most important briefing of your week.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What does CDM stand for and what regulations apply currently?",
    options: [
      "Construction, Design and Management Regulations 2007.",
      "Construction (Design and Management) Regulations 2015 (SI 2015/51), in force from 6 April 2015. They replaced the previous CDM Regulations 2007 and consolidated H&S responsibilities across the construction lifecycle — design, planning, construction and operation — with named duties on Client, Principal Designer, Designer, Principal Contractor, Contractor and Worker.",
      "Construction Demolition Manual 2015.",
      "Construction Drawings Manual 2015.",
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 is the current regulatory framework for managing H&S on construction projects in Great Britain. It made one key change from the 2007 version — replacing the 'CDM Co-ordinator' role with the 'Principal Designer' role, embedding H&S co-ordination within the design team rather than as a separate appointment. CDM applies to almost every construction project regardless of size; the notification thresholds determine some of the duties but the core duties apply throughout.",
  },
  {
    id: 2,
    question:
      "When is a project notifiable to the HSE under CDM 2015?",
    options: [
      "Never.",
      "Under CDM 2015 Reg 6 a project is notifiable when the construction work is scheduled to last longer than 30 working days AND have more than 20 workers working simultaneously at any point, OR exceed 500 person-days. The Client must notify the HSE in writing as soon as practicable before construction starts using F10 notification.",
      "Only on projects over £10m.",
      "Only when there's a fatality.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 6 sets the notification threshold. Below the threshold the project still has CDM duties (every project does) but doesn't need to be notified to HSE on the F10 form. The thresholds are AND/OR — either the duration AND headcount test, or the cumulative person-days test. Most commercial fit-outs are notifiable; many domestic refurbishments are not. The F10 doesn't trigger inspection — it just registers the project with HSE.",
  },
  {
    id: 3,
    question:
      "What's the Principal Designer's primary duty under CDM 2015 Reg 11?",
    options: [
      "Drawing the architectural plans.",
      "To plan, manage, monitor and co-ordinate matters relating to H&S during the pre-construction phase. The PD identifies, eliminates or controls foreseeable risks via the design, ensures designers comply with their Reg 9 duties, prepares the pre-construction information and liaises with the Principal Contractor for the duration of the appointment.",
      "Building the project on site.",
      "Replacing the Building Inspector.",
    ],
    correctAnswer: 1,
    explanation:
      "PD's primary role is during pre-construction. Reg 11 sets the four duties: plan, manage, monitor, co-ordinate H&S in design. Practical examples: insisting that maintenance access is designed in, that fire-stopping is detailed not assumed, that fragile-roof access is eliminated rather than mitigated. The PD is appointed by the Client under Reg 5 and the appointment is in writing.",
  },
  {
    id: 4,
    question:
      "What's the Principal Contractor's primary duty under CDM 2015 Reg 12?",
    options: [
      "Filling in time sheets.",
      "To plan, manage and monitor the construction phase and co-ordinate matters relating to it to ensure that, so far as is reasonably practicable, construction work is carried out without risks to health or safety. The PC produces the Construction Phase Plan and updates it as the project evolves.",
      "Only to file paperwork.",
      "Only to provide PPE.",
    ],
    correctAnswer: 1,
    explanation:
      "PC's primary role is during construction. Reg 12 sets the duty: plan, manage, monitor, co-ordinate the construction phase. The Construction Phase Plan (CPP) is the practical output — the PC's plan for managing H&S throughout construction. CPP is updated as the project evolves; it's not a write-once document. Smaller contractors and sub-contractors comply with the PC's CPP; the PC owns it.",
  },
  {
    id: 5,
    question:
      "Under CDM 2015 Reg 15, what are the three named duties on a Worker?",
    options: [
      "Wear PPE, attend toolbox talks, sign in.",
      "(a) Don't carry out construction work unless you have the skills, knowledge, training and experience to do it safely (or are in the process of obtaining them); (b) report to the person in control anything you're aware of that's likely to endanger H&S; (c) co-operate with any other person working on or in connection with the project to enable that person to comply with their duties.",
      "Show up on time, leave on time, eat lunch.",
      "There are no duties on workers.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 15(1)(a) is the competence duty — only do work you're competent to do (apprentices are 'in the process of obtaining' competence, hence supervised). Reg 15(1)(b) is the report-hazards duty — escalate hazards to the person in control. Reg 15(1)(c) is the co-operation duty — co-operate with everyone else's CDM duties. These three duties are the personal CDM duties on every operative including apprentices.",
  },
  {
    id: 6,
    question:
      "What's the Construction Phase Plan (CPP) and who writes it?",
    options: [
      "A drawing of the site, written by the architect.",
      "The Construction Phase Plan is the Principal Contractor's plan for managing H&S throughout the construction phase (CDM 2015 Reg 12). It documents the controls, the welfare arrangements, the emergency procedures, the trade-clash management, the high-risk activities and the supervision arrangements. The PC writes it and updates it as the project evolves.",
      "A weekly menu for the canteen.",
      "Written by the Client.",
    ],
    correctAnswer: 1,
    explanation:
      "CPP is the day-to-day H&S management document for construction. Larger projects have detailed plans running to hundreds of pages; smaller projects can be much shorter. Schedule 3 of CDM 2015 lists what should be in the CPP — site description, programme, key dates, management arrangements, control of risk, and arrangements for monitoring and review. The CPP is briefed down to operatives via the induction and the toolbox talks.",
  },
  {
    id: 7,
    question:
      "What's the Pre-Construction Information (PCI) and who writes it?",
    options: [
      "The bill of quantities.",
      "Pre-Construction Information is the H&S information that the Client (with help from the Principal Designer) provides to designers and contractors before they start on the project. It covers the site (location, existing structures, services, ground conditions), the project (description, programme, key dates, design assumptions), the relevant H&S information (asbestos surveys, condition reports, environmental risks) and the Client's H&S file from any previous works.",
      "Written by the apprentice.",
      "Only the price list.",
    ],
    correctAnswer: 1,
    explanation:
      "PCI is the H&S input to design. CDM 2015 Reg 4(4) requires the Client to provide PCI to every designer and contractor, with the PD's help. Designers use it to make informed design decisions; contractors use it to plan their work safely. Without good PCI, designers can't design safely and contractors can't plan safely — which is why the Client's failure to provide PCI is a common HSE enforcement target.",
  },
  {
    id: 8,
    question:
      "Apprentice = Worker under CDM 2015. Does that mean apprentices have the same Reg 15 duties as a fully-qualified electrician?",
    options: [
      "No — apprentices are exempt from Reg 15.",
      "Yes — apprentices are workers and Reg 15 applies in full. The competence duty in Reg 15(1)(a) is satisfied because apprentices are 'in the process of obtaining' the competence (which is why they're always supervised). The report-hazards duty (Reg 15(1)(b)) and the co-operation duty (Reg 15(1)(c)) apply identically to apprentices and to fully-qualified electricians.",
      "Only on Tuesdays.",
      "Only if they ask to.",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 15 applies to every worker on a CDM site without exception. The 'in the process of obtaining' wording in Reg 15(1)(a) explicitly accommodates apprentices and trainees — it's why supervised apprentices can lawfully carry out work that they couldn't carry out unsupervised. The report-hazards duty and the co-operation duty are personal duties on every worker including apprentices. Treating Reg 15 as 'someone else's job' is a misconception.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Why was CDM 2015 brought in to replace CDM 2007?",
    answer:
      "CDM 2007 had a separate 'CDM Co-ordinator' role that was meant to co-ordinate H&S in design but in practice was often appointed late, paid little and had limited authority. CDM 2015 dissolved that role and replaced it with the 'Principal Designer' — embedding H&S co-ordination within the design team itself rather than as an external bolt-on. CDM 2015 also extended the regulations to domestic projects (with the small-project Client duties devolved to the Contractor or Principal Contractor by default).",
  },
  {
    question: "Does CDM 2015 apply to a small domestic rewire?",
    answer:
      "Yes. CDM 2015 applies to every construction project regardless of size — there's no minimum threshold. For domestic projects (where the Client is a homeowner not in the course of a business) the Client duties are devolved to the Contractor (or to the Principal Contractor if there's more than one contractor) under Reg 7. So in practice the homeowner doesn't have to write a CPP or appoint a PD — the contractor does it. But the framework still applies.",
  },
  {
    question: "If I'm an agency-supplied apprentice on a site, who's my employer for CDM purposes?",
    answer:
      "The agency is your employer for HASAWA s.2 purposes (the contract of employment sits with the agency). The end-user contractor is your employer for CDM Reg 15 day-to-day supervisory purposes — they direct your work, they co-ordinate your activities with the PC. Both have duties to you. As an apprentice this rarely arises (most apprentices are direct-employed by the contractor) but it's worth knowing if you ever take an agency placement during your apprenticeship.",
  },
  {
    question: "What's the difference between the CPP (Construction Phase Plan) and RAMS (Risk Assessment + Method Statement)?",
    answer:
      "CPP is the Principal Contractor's site-wide plan for managing H&S throughout the construction phase — it covers site rules, welfare, emergency arrangements, trade-clash co-ordination, high-risk activities. RAMS are produced by each contractor for their own work — they describe the specific risks and the specific method for each task. The CPP wraps around all the RAMS. Operatives work to the RAMS for their own task; the PC monitors compliance with the CPP overall.",
  },
  {
    question: "Why does the Principal Contractor have to keep the CPP up to date?",
    answer:
      "Because construction is dynamic — designs change, weather changes, trades come and go, methods get adjusted. A static CPP written at tender stage and never updated is treated by the HSE as evidence the PC isn't actually monitoring the project. Reg 12 requires the PC to plan, manage AND monitor — monitoring without updating is meaningless. As an apprentice you'll see CPP updates briefed at toolbox talks; that's how the live document reaches the work face.",
  },
  {
    question: "Where does the H&S File fit in?",
    answer:
      "The H&S File is the legacy document for the building. The Principal Designer (or Principal Contractor on smaller projects) compiles it during the project and hands it to the Client at the end. It contains the information anyone working on the building in future will need to plan H&S — as-built drawings, services drawings, asbestos register if relevant, structural calculations, cleaning and maintenance arrangements. CDM 2015 Reg 12(5) and Reg 12(8) set the duties. As an apprentice you might never see the H&S File but you should know it exists — it's why your install drawings need to be accurate and as-built.",
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
            eyebrow="Module 5 · Section 1 · Subsection 4"
            title="CDM 2015 framework — your duties as Worker"
            description="Client, Principal Designer, Designer, Principal Contractor, Contractor, Worker — the CDM 2015 cascade and what Reg 15 puts on you personally as an apprentice."
            tone="emerald"
          />

          <TLDR
            points={[
              "CDM 2015 (Construction (Design and Management) Regulations 2015) is the regulatory framework that defines six named duty-holders on every construction project — Client, Principal Designer (PD), Designer, Principal Contractor (PC), Contractor and Worker. Apprentice = Worker.",
              "The duties cascade — Client appoints PD and PC, PD writes the Pre-Construction Information, PC writes the Construction Phase Plan, Contractors implement, Workers comply. Each duty-holder owes specific duties under CDM 2015 (Regs 4 to 15).",
              "Reg 15 puts three personal duties on every Worker — competence (don't do work you're not competent for), report hazards (escalate to the person in control), and co-operate (with everyone else's CDM duties). These duties apply identically to apprentices and to fully-qualified electricians.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Supplementary content — extends LO1 of Unit 210 but is not directly mapped to a 210 AC. Builds the regulatory framework that makes Subs 1.1, 1.2 and 1.3 make sense.",
              "Identify the six named duty-holders under CDM 2015 — Client, Principal Designer, Designer, Principal Contractor, Contractor and Worker.",
              "State the duty under CDM 2015 Reg 4 on the Client to make suitable arrangements for managing the project, including provision of Pre-Construction Information.",
              "State the duty under CDM 2015 Reg 11 on the Principal Designer to plan, manage, monitor and co-ordinate H&S during the pre-construction phase.",
              "State the duty under CDM 2015 Reg 12 on the Principal Contractor to plan, manage, monitor and co-ordinate the construction phase, and to produce the Construction Phase Plan.",
              "State the duty under CDM 2015 Reg 13 on the Principal Contractor to ensure a suitable site induction, prevent unauthorised access and provide welfare facilities.",
              "State the three personal duties on a Worker under CDM 2015 Reg 15 — competence, report hazards, co-operate.",
              "Identify the relationship between the Construction Phase Plan (CPP), Pre-Construction Information (PCI) and the H&S File for the building.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The six duty-holders</ContentEyebrow>

          <ConceptBlock
            title="CDM 2015 in one diagram — six duty-holders, one cascade"
            plainEnglish="CDM 2015 sets out six named duty-holders. They cascade in time and in authority — the Client commissions, appoints and pays for the project; the Principal Designer co-ordinates H&S in pre-construction; the Designer designs; the Principal Contractor co-ordinates H&S in construction; the Contractor does the work; the Worker complies. Each duty-holder has specific duties under specific regulations."
            onSite="As an apprentice you sit at the bottom of the cascade as a Worker. The cascade above you produces the framework you operate within — the design, the pre-construction information, the construction phase plan, the site rules. Knowing the cascade helps you understand where decisions come from and who's responsible for what."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Client (Reg 4)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Commissions the project. Makes suitable arrangements for managing the project.
                  Appoints PD and PC in writing. Provides Pre-Construction Information.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Principal Designer (Reg 11)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Plans, manages, monitors and co-ordinates H&amp;S in pre-construction.
                  Identifies, eliminates or controls foreseeable risks via the design. Liaises
                  with the PC.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Designer (Reg 9)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Eliminates, reduces or controls foreseeable risks in the design. Provides
                  information about residual risks to other duty-holders. Architects, M&amp;E
                  consultants, structural engineers.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Principal Contractor (Reg 12, 13)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Plans, manages, monitors and co-ordinates the construction phase. Writes the
                  Construction Phase Plan. Ensures site induction, welfare and prevention of
                  unauthorised access.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Contractor (Reg 14)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Plans, manages and monitors construction work under their control to ensure it
                  is carried out without risks to H&amp;S. Complies with the PC&apos;s
                  arrangements. Each trade contractor (electrical, mechanical, joinery).
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Worker (Reg 15)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Apprentice = Worker. Three personal duties: competence (Reg 15(1)(a)), report
                  hazards (Reg 15(1)(b)), co-operate (Reg 15(1)(c)). Applies to every operative
                  including apprentices.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The duties in detail</ContentEyebrow>

          <ConceptBlock
            title="Client duties (Reg 4) — the start of the cascade"
            plainEnglish="The Client commissions the project and pays for it. CDM 2015 puts substantial duties on the Client — make suitable arrangements for managing the project, ensure adequate resources and time, provide Pre-Construction Information to designers and contractors, appoint a Principal Designer and Principal Contractor in writing where there's more than one contractor."
            onSite="On a commercial fit-out the Client is usually a developer, an investor or an end-user (a tenant fitting out their leased space). The Client engages the design team and the main contractor. As an apprentice you'll rarely deal with the Client direct — they appear at progress meetings and at site walks. But the Client's failure to make suitable arrangements (under-resourced, no PCI, late appointments) often shows up as confusion at the work face."
          >
            <p>
              The Client's headline duties under Reg 4:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Make suitable arrangements for managing the project (Reg 4(1)).
              </li>
              <li>
                Ensure adequate time, resources and competence are allocated (Reg 4(1)).
              </li>
              <li>
                Provide Pre-Construction Information to every designer and contractor (Reg 4(4)).
              </li>
              <li>
                Appoint a Principal Designer and a Principal Contractor in writing where there
                is more than one contractor (Reg 5).
              </li>
              <li>
                Notify HSE on F10 if the project is notifiable (Reg 6).
              </li>
              <li>
                Ensure the Construction Phase Plan is in place before construction starts
                (Reg 4(5)).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Principal Designer (PD) duties (Reg 11) — pre-construction co-ordination"
            plainEnglish="The PD is appointed by the Client and is the lead H&S co-ordinator during pre-construction. They plan, manage, monitor and co-ordinate H&S in design, identify and eliminate foreseeable risks, ensure other designers comply with their Reg 9 duties, prepare the Pre-Construction Information and liaise with the Principal Contractor for the duration of the appointment."
            onSite="The PD is rarely on site during construction (their duties are pre-construction) but they often visit periodically to verify design assumptions held up. As an apprentice you might meet the PD during a witnessing visit or a change-control meeting. They're a member of the design team but with the H&S co-ordination hat."
          >
            <p>
              The PD's headline duties under Reg 11:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Plan, manage, monitor and co-ordinate H&amp;S during pre-construction
                (Reg 11(1)).
              </li>
              <li>
                Identify, eliminate or control foreseeable risks via the design (Reg 11(3)).
              </li>
              <li>
                Ensure designers comply with their Reg 9 duties (Reg 11(4)).
              </li>
              <li>
                Prepare and provide the Pre-Construction Information (Reg 11(6)).
              </li>
              <li>
                Liaise with the Principal Contractor for the duration of the appointment
                (Reg 11(7)).
              </li>
              <li>
                Prepare or update the H&amp;S File for the project (Reg 12(8)).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Principal Contractor (PC) duties (Reg 12, 13) — construction-phase co-ordination"
            plainEnglish="The PC is appointed by the Client and is the lead H&S co-ordinator during construction. They plan, manage, monitor and co-ordinate the construction phase, produce and update the Construction Phase Plan, ensure a suitable site induction, prevent unauthorised access and provide welfare facilities."
            onSite="The PC's site management chain (PM, SM, Foreman) is who you actually deal with day to day on a CDM site. The CPP is the practical document that drives the site rules and the trade co-ordination. As an apprentice you co-operate with the PC's arrangements under Reg 15(1)(c) — that's the regulatory hook for following the site rules and attending the inductions and toolbox talks."
          >
            <p>
              The PC's headline duties under Reg 12 and 13:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Plan, manage, monitor and co-ordinate the construction phase (Reg 12(1)).
              </li>
              <li>
                Take into account the general principles of prevention (Reg 12(2)).
              </li>
              <li>
                Liaise with the Principal Designer for the duration of the appointment
                (Reg 12(7)).
              </li>
              <li>
                Prepare and update the Construction Phase Plan (Reg 12(1)).
              </li>
              <li>
                Provide and update the H&amp;S File information for the building (Reg 12(8)).
              </li>
              <li>
                Ensure suitable site induction, prevention of unauthorised access and welfare
                facilities (Reg 13(4)).
              </li>
              <li>
                Engage with workers in matters affecting their H&amp;S (Reg 14).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Worker duties (Reg 15) — your three personal duties as an apprentice"
            plainEnglish="Reg 15 puts three personal duties on every worker on a CDM site, including apprentices. Reg 15(1)(a) is the competence duty — don't do work you're not competent for, or are not in the process of obtaining the competence for. Reg 15(1)(b) is the report-hazards duty — escalate hazards to the person in control. Reg 15(1)(c) is the co-operation duty — co-operate with everyone else's CDM duties."
            onSite="As an apprentice the competence duty is satisfied because you're 'in the process of obtaining' the competence — that's the explicit accommodation in the regulation for apprentices and trainees. The report-hazards duty applies to you in full: spot a hazard, tell your Foreman. The co-operation duty applies to you in full: co-operate with the joiner, the plumber, the labourer, the PC's site team."
          >
            <p>
              The three duties broken down:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 15(1)(a) &mdash; competence</strong> &mdash; don&apos;t do work
                unsupervised that&apos;s beyond your current skills, knowledge, training and
                experience. Apprentices are &apos;in the process of obtaining&apos; the
                competence, hence supervised by an Approved Electrician.
              </li>
              <li>
                <strong>Reg 15(1)(b) &mdash; report hazards</strong> &mdash; report to the person
                in control of the work (your Foreman in the first instance) anything you&apos;re
                aware of that&apos;s likely to endanger H&amp;S. Hazards in your area, hazards
                you spot in others&apos; areas, near-misses you witness.
              </li>
              <li>
                <strong>Reg 15(1)(c) &mdash; co-operate</strong> &mdash; co-operate with anyone
                else working on or in connection with the project, to enable that person to
                comply with their duties. Trade clashes, sequence agreements, site rules &mdash;
                all of it.
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

          <SectionRule />

          <ContentEyebrow>The documents — PCI, CPP, H&S File</ContentEyebrow>

          <ConceptBlock
            title="Pre-Construction Information (PCI) — what designers and contractors need to know"
            plainEnglish="PCI is the H&S information that the Client (with the PD's help) provides to designers and contractors before they start. It covers the site (location, existing structures, services, ground conditions), the project (description, programme, key dates, design assumptions), the relevant H&S information (asbestos surveys, condition reports, environmental risks) and the Client's H&S file from any previous works."
            onSite="You won't see the PCI as an apprentice — it's a design-team document. But the PCI is what allows your firm's Project Engineer to design safely and your firm's Foreman to plan safely. PCI gaps (missing asbestos survey, unknown live services, vague programme) are a common cause of unsafe work at the face."
          >
            <p>
              What the PCI typically contains:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Project description and key dates.
              </li>
              <li>
                Site description (location, access, neighbours, existing use).
              </li>
              <li>
                Existing structures and services (drawings, surveys, asbestos register).
              </li>
              <li>
                Existing H&amp;S file (from any previous CDM project on the site).
              </li>
              <li>
                Any specific risks identified (hazardous substances, fragile materials, height
                exposure).
              </li>
              <li>
                Client&apos;s arrangements for managing the project.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Construction Phase Plan (CPP) — the PC's day-to-day H&S management plan"
            plainEnglish="The CPP is the Principal Contractor's plan for managing H&S throughout construction. Schedule 3 of CDM 2015 lists the topics — site description, programme, key dates, management arrangements, control of the principal risks, arrangements for monitoring and review. The CPP is updated as the project evolves."
            onSite="The CPP isn't usually read cover-to-cover by operatives. It's briefed down to the work face via the site induction (CPP headlines) and the toolbox talks (specific updates and high-risk activities). As an apprentice you discharge your Reg 15(1)(c) co-operation duty by attending the induction and the toolbox talks and following the controls described — not by reading every page of the CPP."
          >
            <p>
              The CPP topics under CDM 2015 Schedule 3:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Description of the project and programme.
              </li>
              <li>
                Management of the work (responsibilities, supervision, communication).
              </li>
              <li>
                Arrangements for controlling significant risks (asbestos, working at height,
                live services, manual handling, work near water).
              </li>
              <li>
                Arrangements for site rules, welfare, fire, first-aid and emergency procedures.
              </li>
              <li>
                Arrangements for engagement with workers (toolbox talks, suggestion routes,
                near-miss reporting).
              </li>
              <li>
                Arrangements for monitoring, review and update.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="H&S File — the legacy document for the building"
            plainEnglish="The H&S File is the legacy document handed to the Client at project completion. It contains the information anyone working on the building in future will need to plan H&S — as-built drawings, services drawings, asbestos register if relevant, structural calculations, cleaning and maintenance arrangements. The PD compiles it during the project; the PC contributes from the construction phase; the Client maintains it for the life of the building."
            onSite="As an apprentice you might never see the H&S File but you should know it exists — it's why your install drawings need to be accurate and as-built. A bad install + bad records = a future apprentice working blind on the same building 20 years from now."
          >
            <p>
              What the H&amp;S File typically contains:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                As-built drawings for all services (electrical, mechanical, public health, fire,
                BMS).
              </li>
              <li>
                Specifications and operating manuals for installed equipment.
              </li>
              <li>
                Asbestos register (if applicable).
              </li>
              <li>
                Structural calculations and any residual structural risks.
              </li>
              <li>
                Cleaning, maintenance and access arrangements designed in.
              </li>
              <li>
                Materials of fragile composition or high hazard.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 — Reg 4 (Client duties)"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 4(1)</strong> &mdash; &quot;A client must make suitable arrangements
                  for managing a project, including the allocation of sufficient time and other
                  resources.&quot;
                </p>
                <p className="mb-2">
                  <strong>Reg 4(2)</strong> &mdash; &quot;Arrangements are suitable if they
                  ensure that &mdash; (a) the construction work can be carried out, so far as is
                  reasonably practicable, without risks to the health or safety of any person
                  affected by the project; and (b) the facilities required by Schedule 2 are
                  provided in respect of any person carrying out construction work.&quot;
                </p>
                <p>
                  <strong>Reg 4(4)</strong> &mdash; &quot;A client must provide pre-construction
                  information as soon as is practicable to every designer and contractor
                  appointed, or being considered for appointment, to the project.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Reg 4 is the Client&apos;s duty to set the project up properly. &quot;Suitable
                arrangements&quot; covers time, resources, competence and information. PCI under
                Reg 4(4) is the H&amp;S information designers and contractors need to plan
                safely. A Client who under-resources the project or fails to provide PCI is in
                breach of Reg 4 even if no incident has occurred &mdash; the duty is to set
                things up properly, not just to get away with it.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 4 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 — Reg 12 (PC duties)"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 12(1)</strong> &mdash; &quot;The principal contractor must plan,
                  manage and monitor the construction phase and co-ordinate matters relating to
                  it to ensure that, so far as is reasonably practicable, construction work is
                  carried out without risks to health or safety.&quot;
                </p>
                <p>
                  <strong>Reg 12(7)</strong> &mdash; &quot;The principal contractor must liaise
                  with the principal designer for the duration of the principal designer&apos;s
                  appointment and share with the principal designer information relevant to the
                  planning, management and monitoring of the pre-construction phase and the
                  co-ordination of health and safety matters during the pre-construction
                  phase.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Reg 12 is the duty that creates the Construction Phase Plan and drives the
                site management chain. The PC&apos;s Site Manager is who actually plans, manages
                and monitors the construction phase day-to-day on behalf of the PC entity. As
                an apprentice you co-operate with the PC&apos;s arrangements under Reg 15(1)(c)
                &mdash; the two regulations interlock.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 12 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 — Reg 13 (PC information to workers)"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 13(1)</strong> &mdash; &quot;The principal contractor must &mdash;
                  (a) liaise with the client and principal designer for the duration of the
                  principal designer&apos;s appointment and share with them information relevant
                  to the planning, management and monitoring of the pre-construction phase and
                  the co-ordination of health and safety matters during the pre-construction
                  phase; and (b) inform a contractor whose work is to be undertaken on or in
                  connection with the project of the minimum amount of time which will be allowed
                  to them for planning and preparation before they begin work on the
                  construction site.&quot;
                </p>
                <p>
                  <strong>Reg 13(4)</strong> &mdash; &quot;The principal contractor must ensure
                  that &mdash; (a) a suitable site induction is provided; (b) the necessary steps
                  are taken to prevent access by unauthorised persons to the construction site;
                  and (c) facilities that comply with the requirements of Schedule 2 are
                  provided throughout the construction phase.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Reg 13 is the duty that creates site induction, the visitor SOP and the welfare
                facilities. As an apprentice you experience the PC&apos;s discharge of Reg 13 on
                day one (induction), every day (welfare), and whenever a visitor arrives
                (escorted access). Reg 13(1)(b) is also a useful one to know &mdash; it requires
                the PC to give contractors enough time to plan and prepare. Crash programmes
                that don&apos;t allow planning time are a Reg 13(1)(b) breach.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 13 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 — Reg 15 (Workers' duties)"
            clause={
              <>
                &quot;A worker must &mdash; (a) not carry out construction work unless the worker
                has the skills, knowledge, training and experience necessary to carry it out
                safely and without risk to health, or is in the process of obtaining them; (b)
                report to the person in control of the way construction work is carried out
                anything which the worker is aware is likely to endanger the safety or health of
                the worker or others; and (c) co-operate with any other person working on or in
                connection with the project to enable that person to comply with their
                duties.&quot;
              </>
            }
            meaning={
              <>
                Reg 15 is the personal-duty regulation for every Worker on a CDM site, including
                apprentices. The three duties are competence (Reg 15(1)(a)), report hazards
                (Reg 15(1)(b)) and co-operate (Reg 15(1)(c)). The &quot;in the process of
                obtaining&quot; wording in Reg 15(1)(a) explicitly accommodates apprentices
                &mdash; you can lawfully do supervised work that you couldn&apos;t do
                unsupervised. The other two duties apply to apprentices identically to fully-
                qualified electricians.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 15 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Ignoring the Construction Phase Plan because 'it's the Foreman's job'"
            whatHappens={
              <>
                Apprentice arrives on a commercial fit-out, hears the Foreman dismiss the CPP as
                &quot;just paperwork&quot;, ignores the CPP entirely. Doesn&apos;t attend the
                site induction properly (turns up late, doesn&apos;t sign), doesn&apos;t engage
                with toolbox talks, doesn&apos;t know the fire muster point. When a near-miss
                occurs and the HSE inspector questions them about the controls in place, the
                apprentice doesn&apos;t know the answers. The Foreman gets the formal hit, but
                the apprentice gets the personal Reg 15 record &mdash; a documented breach of the
                competence and co-operation duties.
              </>
            }
            doInstead={
              <>
                Treat the site induction and the toolbox talks as your access route to the CPP.
                You don&apos;t have to read the document; you do have to follow what&apos;s
                briefed down to you. Sign in to the induction properly, listen, ask questions if
                anything isn&apos;t clear. Attend toolbox talks. Know the fire muster point and
                the first-aid arrangements. Reg 15 puts a personal duty on you that doesn&apos;t
                disappear because the Foreman dismisses the paperwork.
              </>
            }
          />

          <Scenario
            title="Day-one site induction — what the PC's CDM checklist covers"
            situation={
              <>
                It&apos;s your first day on a £4m commercial fit-out. The main contractor&apos;s
                Site Manager runs the CDM induction at 8am in the welfare cabin. About 25
                operatives in the room from various trades. The induction lasts 45 minutes and
                covers a full agenda. What should be on the agenda, and how do you know your
                Reg 15 duties have been triggered?
              </>
            }
            whatToDo={
              <>
                <strong>The PC&apos;s induction checklist (Reg 13(4)(a)) typically covers:</strong>
                <br /><br />
                Site description, layout and access. Welfare arrangements (toilets, mess, drying
                area). Fire muster point and emergency procedures. First-aid arrangements and
                accident reporting route. PPE policy (mandatory PPE on site, specific PPE for
                specific areas). Site rules (sign-in/sign-out, no-go areas, hot-works permits,
                photography). Construction Phase Plan headlines (high-risk activities, key
                dates, trade-clash management). Project-specific hazards (asbestos survey
                results, live services, traffic management, fragile-roof exposure). Welfare
                facilities and sanitary provision (Schedule 2). Worker engagement arrangements
                (toolbox talks, suggestion routes, near-miss reporting). Your duties under
                CDM 2015 Reg 15.
                <br /><br />
                <strong>Your Reg 15 duties triggered by attending the induction:</strong>
                <br /><br />
                Reg 15(1)(a) competence &mdash; you confirm you have (or are obtaining) the
                skills for the work assigned. As an apprentice the supervised-pairing handles
                this.
                <br /><br />
                Reg 15(1)(b) report hazards &mdash; you confirm you understand the reporting
                route (Foreman first, escalation up). Note the route in your job pack.
                <br /><br />
                Reg 15(1)(c) co-operate &mdash; you confirm you understand the site rules and
                will co-operate with the PC&apos;s arrangements. Sign the induction record as
                evidence of attendance.
              </>
            }
            whyItMatters={
              <>
                The induction is the formal moment when CDM duties activate for you on this
                site. After the induction you&apos;re on the record as having received the H&amp;S
                information &mdash; subsequent breaches by you (ignoring the rules, missing the
                muster point, blocking access routes) are personal Reg 15 breaches. Take the
                induction seriously: it protects you, it informs you and it sets the relationship
                with the site management for your time on the project. Skipping the induction
                or sleeping through it puts you outside the site H&amp;S system on day one.
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

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "CDM 2015 sets six named duty-holders — Client, Principal Designer (PD), Designer, Principal Contractor (PC), Contractor and Worker. Apprentice = Worker. Each duty-holder has specific duties under specific regulations.",
              "Client (Reg 4) commissions the project, makes suitable arrangements, provides Pre-Construction Information, appoints PD and PC. Failure to appoint = the Client takes on those duties themselves.",
              "Principal Designer (Reg 11) co-ordinates H&S in pre-construction. Identifies, eliminates or controls foreseeable risks via the design. Prepares the Pre-Construction Information.",
              "Principal Contractor (Reg 12, 13) co-ordinates the construction phase. Writes and updates the Construction Phase Plan. Ensures site induction, prevention of unauthorised access and welfare facilities.",
              "Worker (Reg 15) — three personal duties: competence (Reg 15(1)(a) — apprentices are 'in the process of obtaining'), report hazards (Reg 15(1)(b) — escalate to person in control), co-operate (Reg 15(1)(c) — with everyone else's CDM duties).",
              "The three documents — Pre-Construction Information (PCI, written by Client/PD before construction), Construction Phase Plan (CPP, written by PC for construction), H&S File (compiled by PD, handed to Client at completion for the building's life).",
              "Apprentices have the same Reg 15 duties as fully-qualified electricians. The competence duty is satisfied by being 'in the process of obtaining' competence (hence supervised). The report-hazards duty and the co-operate duty apply identically.",
              "Site induction is the formal mechanism for the PC to discharge Reg 13(4)(a) and to activate workers' Reg 15 duties. Skipping or sleeping through the induction puts you outside the site H&S system on day one and is itself a Reg 15 breach.",
            ]}
          />

          <Quiz title="CDM 2015 framework — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section1/1-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.3 Site visitors key roles
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section1/1-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.5 Apprenticeship triangle + UK trade-body landscape
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
