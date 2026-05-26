/**
 * Module 7 · Section 4 · Subsection 2 — IET membership routes
 * Maps to C&G 2365-03 / Unit 308 / LO2 — supplementary depth
 *   Extends LO2 (competent person schemes + CPD) with the parallel professional-
 *   membership track via the IET. Most directly supports AC 2.2 "Identify the
 *   areas in building services which run competent person schemes" by contrasting
 *   CPS membership with chartered/incorporated engineer routes.
 *
 * IET membership tiers (Student/Apprentice, Affiliate, TMIET, MIET, FIET) and
 * the linked Engineering Council professional registrations (EngTech, IEng,
 * CEng). The older "Associate" tier was removed in the IET's 2008 restructure.
 * Why join, what each tier delivers, the application process, costs, member
 * benefits and the relationship with vocational career routes.
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

const TITLE = 'IET membership routes | Level 3 Module 7.4.2 | Elec-Mate';
const DESCRIPTION =
  'IET membership tiers (Student/Apprentice, Affiliate, TMIET, MIET, FIET) and linked Engineering Council registrations (EngTech, IEng, CEng). Application, costs, benefits and how vocational practitioners qualify. (The older "Associate" tier was removed in the 2008 IET restructure.)';

const checks = [
  {
    id: 'mod7-s4-sub2-iet',
    question: "What is the IET and what does it offer electrical practitioners?",
    options: [
      "Institution of Engineering and Technology — UK-based professional body for engineering and technology, with around 156,000 members worldwide. For electrical practitioners IET offers: technical resources (BS 7671 publication, Wiring Matters magazine, IET Standards), professional registration via Engineering Council (EngTech, IEng, CEng), member events and CPD via IET Academy, and the credibility signal of MIET / FIET membership.",
      "Short (10-15 min), informal, on-site briefing covering a specific safety topic relevant to current work. Required by MHSWR Reg 13 (information). Demonstrates the firm\\\\\\\\'s ongoing engagement with safety; the operative attendance log is the evidence after an incident that the topic was communicated. L3 supervisors increasingly deliver them.",
      "The label records the refrigerant type, GWP value, charge weight in kilograms and the equivalent tonnes of CO2 the charge represents. The label is a statutory requirement under the F-Gas Regulation. It triggers leak-check frequency rules (typically once a year for charges over 5 tonnes CO2 equivalent without an automatic leak detection system, less often with one), drives the recovery requirements at end of life, and helps the F-Gas engineer choose the right recovery cylinder if the unit is decommissioned.",
      "Politely tell the Site Manager you've been tasked by your own supervisor on a different priority, and offer to ask your supervisor to come over so the two managers can re-prioritise. You take instructions on the work face from your own contractor's chain (Site Supervisor → Project Engineer → Contracts Manager). The main contractor's Site Manager co-ordinates between contractors but does not give direct instructions to a sub-contractor's apprentice.",
    ],
    correctIndex: 0,
    explanation:
      "The IET is the dominant professional body for UK electrical engineering. Membership opens access to BS 7671 (the IET publishes it), Wiring Matters magazine, IET Online (massive technical document archive), member events, CPD content via IET Academy, and the EngTech/IEng/CEng professional registration pathway. For electrical practitioners IET membership is broadly equivalent to what BMA membership is for doctors or RICS membership is for surveyors.",
  },
  {
    id: 'mod7-s4-sub2-tiers',
    question:
      "What are the current IET membership tiers in order?",
    options: [
      "A statutory notice under HASAWA s.21. The dutyholder must comply within the time specified (usually 21+ days). Right of appeal to an Employment Tribunal within 21 days. Failure to comply is a separate offence carrying unlimited fines and (on indictment) up to 2 years imprisonment for the responsible person. The notice is published on the HSE Public Register of Convictions and Notices — visible to clients, insurers and competitors.",
      "Client: visionary (redirect focus to the project outcome and shared goals), Apprentice: coaching combined with affiliative (develop their coping strategies while showing genuine care for their wellbeing), Subcontractors: democratic for initial conflict resolution (hearing both perspectives) shifting to commanding only if safety is at risk — demonstrating style-flexing based on situational needs",
      "Outdoor PV electrical equipment shall have a degree of protection not less than IP44 to BS EN 60529 and an impact rating not less than IK07 to BS EN 62262. On a Section 712 acceptance the enclosure shall be labelled accordingly or be accompanied by manufacturer documentation evidencing compliance — absence of evidence is non-compliance.",
      "Student / Apprentice (entry tier for those in formal study), Affiliate (anyone with an interest, no qualifications required), Technician Member (TMIET — typically Level 3 vocational + experience, often paired with EngTech registration), Member (MIET — incorporated/chartered-level competence), Fellow (FIET — senior career achievement). Each tier has its own application criteria and annual subscription. (The older 'Associate' tier was removed in the IET's 2008 restructure.)",
    ],
    correctIndex: 3,
    explanation:
      "Modern IET membership structure (post-2008 restructure): Student/Apprentice and Affiliate are entry tiers; Technician Member (TMIET) is the vocational-route professional tier (often held alongside EngTech); MIET is the standard professional tier (often paired with IEng or CEng); FIET is for senior career achievement. The 'Associate' tier was discontinued in the 2008 restructure when IET introduced the current Technician Member designation. Subscription costs: Affiliate £40-80/year, TMIET around £100-150, MIET £150-200/year, FIET £200-300/year.",
  },
  {
    id: 'mod7-s4-sub2-engtech',
    question:
      "Can a vocational-route electrician become EngTech-registered through the IET?",
    options: [
      "Engineering Council registration typically correlates with meaningful salary uplift. EngTech-registered roles often pay £35-45k; IEng roles £45-65k; CEng roles £65k+. Registration alone doesn't generate the salary — the underlying competence and the roles you take on do — but the registration is widely used as a salary-band anchor in engineering job markets. For senior technical and design roles registration is often a job pre-requisite.",
      "Battery platforms are not interchangeable — Milwaukee M18 batteries don't fit Makita LXT tools and vice versa. If the firm runs Milwaukee, that's the platform whose chargers and spare packs are on every van and in every site box. A loose Makita drill is an outlier — one tool with no spare batteries when you need them, and no compatible charger nearby. Either ask for the matching Milwaukee tool, or accept you're working with one battery on the clock.",
      "Yes — IET specifically promotes EngTech as accessible to vocational-route practitioners. JIB Approved Electrician + 2391-52 + portfolio of evidence + professional review = typical EngTech qualification. The IET provides regional ambassadors who advise on the application route. Many JIB Approved Electricians could qualify for EngTech but never apply because they don't realise they're eligible.",
      "It’s the single common connection point inside the installation where the earthing conductor (back to the source/electrode), the main protective bonding conductors (out to extraneous parts) and the installation CPCs all meet — bringing every earthed and bonded conductor to the same potential.",
    ],
    correctIndex: 2,
    explanation:
      "EngTech accessibility is a deliberate IET strategy — the institution wants to broaden professional registration beyond traditional graduate routes. Vocational practitioners with Level 3 + experience + competence evidence are exactly the target candidates. The application is achievable as a single-evening job once the portfolio is organised against UK-SPEC. Worth doing — registered EngTech is a meaningful credential for salary signal and professional standing.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "How much does IET MIET membership typically cost per year?",
    options: [
      "No — there's a London weighting (typically £2-3/hr extra for work inside the M25), a separate set of SJIB rates for Scotland, and travel allowances vary. The headline JIB hourly rate is the national minimum for the grade; London-weighted rates apply on top for inner-London work. Always check your contract for which rate applies.",
      "Around £150-200/year for full MIET membership. Discounted rates for new graduates, apprentices, retirees and overseas members. Fee is tax-deductible against income tax (HMRC List 3 of approved professional bodies). Cost includes access to BS 7671 (with online subscription option), Wiring Matters, IET Library, IET Online (large technical archive), regional events.",
      "The earthing conductor in TT runs to a buried earth electrode and must comply with Table 54.1 minimum sizes for buried conductors (e.g. 25 mm² Cu unprotected, 16 mm² Cu protected against corrosion only). 16 mm² unprotected Cu in soil corrodes and undersizes the run.",
      "Type B is the default per Reg 712.531.3.5.1, unless (a) the inverter provides at least simple separation between AC and DC sides, (b) the installation places a transformer between inverter and RCD, or (c) the inverter manufacturer explicitly states Type B is not required.",
    ],
    correctAnswer: 1,
    explanation:
      "MIET subscription is comparable to other UK professional bodies (RICS, IMechE, etc.). The annual cost includes substantial member benefits — IET Online alone (access to thousands of standards, journals, conference papers) is worth more than the subscription if you use it. Tax-deductible status reduces effective cost. Most career-focused electrical engineers and senior practitioners hold MIET.",
  },
  {
    id: 2,
    question: "What's the IET Academy?",
    options: [
      "Where an IMD is provided, it shall be selected in accordance with BS EN 61557-8. Compliance is evidenced by documentation, marking or a declaration of conformity to the standard. Where no such evidence exists, the installation does not meet the requirement and must be treated as non-compliant until evidence is produced.",
      "Cold (R1 + R2) = 50 × (12.10 + 18.10) / 1000 = 1.51 Ω. Hot at 70 degrees C: 1.51 × 1.20 = 1.812 Ω. Design Zs = 0.80 + 1.812 = 2.61 Ω. Table 41.3 max for B16 in A4:2026 = 2.73 Ω. Just passes (margin only 0.12 Ω) — design is borderline and any route-length error during install will push it over. Reconsider cable size or route.",
      "IET Academy is the IET's online learning platform — bite-sized technical courses, BS 7671 update training, design and engineering CPD content. Member access typically included with MIET subscription; some content open to non-members. Strong CPD resource alongside scheme-specific (NICEIC, NAPIT) and provider-specific (Elec-Mate) CPD platforms.",
      "Like parallel resistors. Two equal-IR cables in parallel halve the apparent IR. Three reduce it to one-third. To localise a low-IR fault on parallel cables, isolate one cable at a time and retest — the cable whose disconnection raises the reading is the lower-IR run.",
    ],
    correctAnswer: 2,
    explanation:
      "IET Academy is a meaningful CPD resource. Course content covers BS 7671 amendments, specialist topics (PV, EV, power quality), design and engineering (motor control, PLCs, HV), and professional skills. Many CPS schemes accept IET Academy completion as CPD evidence. For MIET members the content is largely included; non-members can buy individual courses.",
  },
  {
    id: 3,
    question: "What does FIET (Fellow) require beyond MIET?",
    options: [
      "Hazardous touch potentials on conductive parts during the test. The test current creates a voltage drop across the loop impedance — exposed-conductive-parts in the circuit may briefly rise toward line voltage during the test. Testers must control access to exposed conductive parts during these tests, follow safe working practices, and not allow others to touch the installation while testing.",
      "An F-Gas log entry recording the refrigerant type, the charge weight added or removed, the date, and the F-Gas-certified engineer's name and certificate number. The engineer logs the entry in their own F-Gas register and provides a copy or extract to the customer / installer for the handover pack. Required at every refrigerant transaction (initial commissioning charge, top-up, recovery at decommissioning). Required by the F-Gas Regulations and central to demonstrating compliance during any future enforcement check.",
      "Apprentice is a formal JIB grade for someone in a registered apprenticeship — typically a learner working towards the C&G 2365 (or NVQ Level 3) and the AM2. 'Improver' is not a formal JIB grade — it's a colloquial industry term sometimes used for the post-college, pre-AM2 stage where the learner has completed the technical qualifications but not yet sat the AM2. Once AM2 is passed and JIB processes the upgrade, the worker becomes an Electrician on the JIB scale.",
      "Significant career achievement and contribution to engineering practice — typically 10+ years senior engineering experience, evidence of leadership, technical contribution to the profession (publications, mentoring, committee work, etc.), and a Fellow's nomination process. CEng registration is typical alongside FIET. Annual subscription higher (£200-300/year). Fellowship is recognition of senior career standing.",
    ],
    correctAnswer: 3,
    explanation:
      "FIET is the senior membership tier — requires demonstrable career achievement and contribution beyond standard professional practice. Typical FIET candidates are senior engineers in significant roles (technical directors, senior consultants, principal engineers) with track record of contribution to the wider profession (publications, conference presentations, committee work, mentoring). FIET is a meaningful credential for senior consultancy or leadership roles.",
  },
  {
    id: 4,
    question: "Are IET fees tax-deductible?",
    options: [
      "Yes — IET subscriptions are tax-deductible against income tax under HMRC's List 3 of approved professional bodies. Effectively reduces the cost by your marginal tax rate. For a higher-rate taxpayer (40%) the £200/year MIET subscription costs £120 net. List 3 covers most major UK professional bodies including IET, RICS, IMechE, IChemE etc.",
      "(a) To take reasonable care for the health and safety of themselves and of other persons who may be affected by their acts or omissions at work; and (b) to co-operate with the employer or any other person to enable that person to comply with their statutory duty.",
      "Provide site induction (covering the construction phase plan, site rules, welfare, emergency procedures and specific hazards), provide access to relevant pre-construction information, and ensure each worker has the information they need to do their work safely. Reg 14 makes it a duty on the principal contractor to ensure workers receive any relevant H&S training. Reg 15 puts a corresponding duty on the worker to co-operate.",
      "Under CDM 2015 Reg 6 a project is notifiable when the construction work is scheduled to last longer than 30 working days AND have more than 20 workers working simultaneously at any point, OR exceed 500 person-days. The Client must notify the HSE in writing as soon as practicable before construction starts using F10 notification.",
    ],
    correctAnswer: 0,
    explanation:
      "Tax-deductible status is a meaningful financial benefit. Self-employed practitioners deduct directly through Self Assessment; employees claim through HMRC's expense claim form (P87). The deduction reduces effective cost by the marginal tax rate — basic rate 20%, higher rate 40%, additional rate 45%. List 3 publication on gov.uk lists all approved bodies.",
  },
  {
    id: 5,
    question: "What's an IET regional ambassador?",
    options: [
      "Around year 10 or a defined number of full-equivalent cycles (often 6,000-10,000 cycles), whichever comes first. The threshold is usually 70-80% of nameplate usable capacity. A 10 kWh battery delivering around 7 kWh after a decade is at typical end-of-warranty capacity; whether the customer replaces depends on the economics of remaining capacity vs replacement cost.",
      "An IET volunteer (typically MIET or above) in your local region who supports new and prospective members, advises on professional registration applications, and runs regional member activities. Free service. Particularly useful for vocational-route practitioners considering EngTech application — the ambassador can review your CV and tell you whether you're eligible plus suggest what to strengthen.",
      "The right of access under UK GDPR Article 15 (a 'subject access request' or SAR). The firm has one calendar month to respond, free of charge in most cases. The response must include the personal data being processed, the purposes, the categories, the recipients, the retention period, and the source of the data if not from the data subject.",
      "SELECT is the campaigning trade association for electrical contracting in Scotland. It's the equivalent of the ECA but for Scotland, and it works alongside the SJIB (Scottish Joint Industry Board) which sets the Scottish equivalent of the JIB rules. Scottish apprentices are usually contracted under SJIB rules with SELECT-member firms.",
    ],
    correctAnswer: 1,
    explanation:
      "Regional ambassadors are a great underused IET resource. Free 30-60 minute conversation can clarify whether you're EngTech-ready and what additional evidence you'd need. Particularly valuable for vocational practitioners who often underestimate their eligibility for professional registration. Find your local ambassador via theiet.org.",
  },
  {
    id: 6,
    question: "How does professional registration relate to JIB grading?",
    options: [
      "Significant career achievement and contribution to engineering practice — typically 10+ years senior engineering experience, evidence of leadership, technical contribution to the profession (publications, mentoring, committee work, etc.), and a Fellow's nomination process. CEng registration is typical alongside FIET. Annual subscription higher (£200-300/year). Fellowship is recognition of senior career standing.",
      "MIS 3002 is the MCS installer-competence and product-certification standard required for the customer to claim Smart Export Guarantee payments and demonstrate quality assurance. The IET Code of Practice is the practical implementation guide that walks through how to apply BS 7671 Section 712 on a real install — system architecture, cable selection, protective devices, labelling, commissioning. Both reference each other; both should be on the bench when the MCS designer is producing the install drawings. Neither replaces BS 7671 — Section 712 is the legal floor; MIS 3002 and the IET CoP build on top.",
      "Different but parallel. The formal JIB grading ladder (Apprentice / Adult Trainee / Electrician / Approved / Technician) is the trade-collective competence framework recognised in JIB-graded employment contracts — note 'Improver' is colloquial industry shorthand and NOT a formal JIB grade. Engineering Council registration (EngTech / IEng / CEng) is the wider engineering profession's competence framework recognised across the engineering sector. Many electrical practitioners hold both — JIB Approved AND EngTech is common.",
      "Every 3 months — formal PAT (combined visual + electrical test) for harsh-environment use. HSE HSG107 'Maintaining portable electrical equipment' and the IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th ed.) publish typical intervals; construction-site Class I portable tools are at the short end at 3 months. Office Class I equipment is 12 months (the low-risk regime in HSE INDG236). Class II (double-insulated) and battery chargers are typically longer.",
    ],
    correctAnswer: 2,
    explanation:
      "JIB and Engineering Council are complementary credentials in different domains — JIB for trade industrial relations, Engineering Council for cross-sector professional engineering. Many career-focused electricians hold both: JIB Approved Electrician for the trade contract and pay framework, EngTech for wider professional credibility and salary signal. Holding both is a strong combination for career mobility.",
  },
  {
    id: 7,
    question:
      "What's the IET Code of Conduct?",
    options: [
      "Several. (1) Approved Electrician JIB grading. (2) QS (Qualified Supervisor) role in a CPS-registered firm — required for Part P self-certification. (3) Periodic inspection contract work (EICR work pays well, particularly in commercial estate and rental property maintenance). (4) Standalone testing-led roles in M&E, FM and consultancy. (5) Bridge to 2396 design qualification.",
      "Because it covers the whole work activity (not just the install), it covers operation, use AND maintenance, AND it covers work NEAR a system as well as on it. So it's the legal hook for safe-isolation procedures, lock-off, voltage-proving, and the way you organise the work around live equipment that you're not directly working on. Reg 4(3) is what the HSE charges most often after an electrical incident.",
      "Make suitable arrangements for managing the project (resources, time, competent appointments), provide pre-construction information to designers and contractors, ensure the principal designer and principal contractor (where required) are appointed, and co-operate with all duty-holders. The client duties are real and enforceable — the HSE has prosecuted clients (including domestic clients in some cases) for failing to make those arrangements.",
      "Professional ethics code binding on IET members and Engineering Council registrants. Covers integrity and honesty, public safety and interest, working within professional competence limits, maintaining and developing competence through CPD, treating colleagues, clients and the public with respect, reporting concerns about safety or unethical conduct. Failure to comply can lead to disciplinary action and ultimately removal from membership/register.",
    ],
    correctAnswer: 3,
    explanation:
      "The IET Code of Conduct is the ethical framework that binds members. Treat membership as ongoing commitment to professional standards, not just a one-off credential. The Code provides protection (you have professional standing to refuse unethical instructions citing the Code) and obligation (you must maintain standards including CPD). Read it as part of joining; revisit periodically.",
  },
  {
    id: 8,
    question:
      "What's the practical case for joining the IET as a domestic-focused electrician?",
    options: [
      "Several practical benefits: BS 7671 included with subscription; Wiring Matters magazine and IET Online for ongoing technical learning; IET Academy CPD content; networking with other electrical practitioners through regional events; access to professional registration (EngTech) for salary signal and credibility; eligibility for IET-affiliated insurance products. Tax-deductible. Most career-focused electrical practitioners find membership pays for itself.",
      "Internal first — to the firm\\\\\\\\'s responsible person who is the \\\\\\\"Reg 3 responsible person\\\\\\\" under RIDDOR. They make the F2508 / F2508A submission via riddor.hse.gov.uk or phone 0345 300 9923 for fatalities/specified injuries. Your job is to escalate to them, not to make the report yourself unless you ARE the responsible person.",
      "Because the principal contractor (or main installer) carries practical and often legal responsibility for what happens on their site, including the conduct, safety and quality of sub-contractor work. CDM 2015 places duties on the PC for site coordination. The firm's policies typically require sub-contractors to be vetted, briefed, given clear scope, paid promptly and held to the same conduct standards as employees.",
      "To plan, manage, monitor and co-ordinate matters relating to H&S during the pre-construction phase. The PD identifies, eliminates or controls foreseeable risks via the design, ensures designers comply with their Reg 9 duties, prepares the pre-construction information and liaises with the Principal Contractor for the duration of the appointment.",
    ],
    correctAnswer: 0,
    explanation:
      "IET membership isn't only for design engineers — it's a meaningful resource for practising electricians at all levels. The technical resources alone (BS 7671 access, IET Online, Wiring Matters) typically justify the subscription. Add the credibility of MIET letters after your name on quotes/website, the EngTech registration pathway, and the networking/CPD events — strong combined value. Tax-deductible status reduces effective cost.",
  },
];

const faqs = [
  {
    question: "Is IET membership the same as Engineering Council registration?",
    answer:
      "No, but they're linked. IET membership is the institution's own membership tier (Student/Apprentice / Affiliate / TMIET / MIET / FIET). Engineering Council registration (EngTech / IEng / CEng) is the wider profession's regulatory registration. You can be MIET without being CEng-registered (membership only, no registration); you can be EngTech without being TMIET (registration through another institution). Most engineering-focused IET members hold both.",
  },
  {
    question: "How long does an EngTech application take?",
    answer:
      "Typically 3-6 months from starting the portfolio to professional review. Portfolio preparation 20-40 hours. Application submission. Application review (4-8 weeks). Professional review interview (60-90 minutes with two reviewers). Decision typically within 2-4 weeks of interview. Total timeline depends on how quickly you organise the portfolio and how soon reviewers are available.",
  },
  {
    question: "Can I be a member of multiple engineering institutions?",
    answer:
      "Yes — many engineers belong to multiple institutions reflecting different specialisms. IET (electrical, electronic, IT), IMechE (mechanical), IChemE (chemical), CIBSE (building services). Each carries its own subscription. For an electrical practitioner IET is typically the primary institution; CIBSE may add value if you work in building services across disciplines.",
  },
  {
    question: "What's IET YPS?",
    answer:
      "IET Young Professionals Section — community for IET members aged under 30, with regional networking events, mentoring opportunities and career-development content. Apprentices and early-career electricians benefit from the YPS network for peer connections beyond their own employer. Free for members under 30.",
  },
  {
    question: "Do employers value IET membership?",
    answer:
      "Increasingly yes — for engineering-direction careers IET membership and registration are widely valued by employers as evidence of professional commitment and competence. For pure trade-installer roles the value is more variable. JIB grading typically matters more for installer roles; IET more for design and engineering. Many career trajectories shift over time — early-career trade focus → mid-career engineering focus benefits from holding both.",
  },
  {
    question: "How do I find IET events near me?",
    answer:
      "IET regional sections run technical events (typically free for members) covering BS 7671 amendments, specialist topics (PV, EV, electric vehicles, power quality), career development and member networking. Check theiet.org/events for your region. Most major UK cities have active IET sections with monthly or fortnightly events.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 7 · Section 4 · Subsection 2"
            title="IET membership routes"
            description="IET membership tiers (Student/Apprentice, Affiliate, TMIET, MIET, FIET) and linked Engineering Council registrations (EngTech, IEng, CEng). Application, costs, benefits."
            tone="emerald"
          />

          <TLDR
            points={[
              "IET (Institution of Engineering and Technology) is the dominant UK professional body for electrical engineering — 156,000 members worldwide.",
              "Current membership tiers: Student/Apprentice → Affiliate (entry) → TMIET (Technician Member, vocational professional tier, typically paired with EngTech) → MIET (Member, incorporated/chartered-level competence) → FIET (Fellow, senior career achievement). The older 'Associate' tier was removed in the IET's 2008 restructure.",
              "Linked Engineering Council registrations: EngTech (technician), IEng (incorporated, degree-level), CEng (chartered, master's level).",
              "Annual subscription £40-300/year depending on tier. Tax-deductible against income tax under HMRC List 3.",
              "IET specifically promotes EngTech (paired with TMIET) as accessible to vocational-route practitioners — JIB Approved + 2391-52 + portfolio = typical TMIET / EngTech qualification.",
              "Member benefits: BS 7671 access, Wiring Matters, IET Online archive, IET Academy CPD, regional events, professional registration support.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO2 / AC 2.4 — identify the importance of CPD, including the role of professional bodies.",
              "State the IET's role as the UK's dominant professional body for electrical engineering.",
              "Distinguish between current IET membership tiers (Student/Apprentice, Affiliate, TMIET, MIET, FIET) and the entry criteria for each. The older 'Associate' tier was removed in the 2008 restructure.",
              "Identify the linked Engineering Council registrations (EngTech, IEng, CEng) and the relationship with IET tiers.",
              "Identify the practical benefits of IET membership (BS 7671, IET Online, IET Academy, regional events, professional registration).",
              "State that IET subscriptions are tax-deductible under HMRC List 3.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What the IET is</ContentEyebrow>

          <ConceptBlock
            title="The IET — UK's dominant electrical engineering professional body"
            plainEnglish="The Institution of Engineering and Technology (IET) is the UK's primary professional body for engineering and technology, with around 156,000 members worldwide. Founded 1871 (as the Society of Telegraph Engineers), now covering electrical, electronic, IT and wider engineering disciplines. Publishes BS 7671 (jointly with BSI). Operates as both a membership institution and an Engineering Council licensed body for professional registration."
            onSite="For electrical practitioners IET is the institution to know. Membership opens access to BS 7671 (the IET publishes it), Wiring Matters magazine, IET Online (massive technical archive), member events, CPD content via IET Academy, and the EngTech/IEng/CEng professional registration pathway. Most career-focused UK electrical engineers and senior practitioners hold IET MIET membership."
          >
            <p>
              IET role at a glance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Publisher of BS 7671 (the Wiring Regulations) jointly with BSI.</li>
              <li>Membership institution &mdash; current tiers (Student/Apprentice / Affiliate / TMIET / MIET / FIET).</li>
              <li>Engineering Council licensed body for EngTech / IEng / CEng registration.</li>
              <li>Publisher of IET Standards, Wiring Matters magazine, technical journals.</li>
              <li>Operator of IET Online (large technical archive) and IET Academy (CPD).</li>
              <li>Convener of regional events, conferences, technical committees (including JPEL/64).</li>
              <li>Code of Conduct for members and registrants.</li>
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

          <ContentEyebrow>The membership tiers</ContentEyebrow>

          <ConceptBlock
            title="Student/Apprentice → Affiliate → TMIET → MIET → FIET — the membership ladder"
            plainEnglish="The IET's current membership structure (post-2008 restructure) has five main tiers: Student/Apprentice (for those in formal study), Affiliate (anyone with an interest, no qualifications required), Technician Member (TMIET — vocational professional tier, typically paired with EngTech registration), Member (MIET — incorporated or chartered-level competence), and Fellow (FIET — senior career achievement). The older 'Associate' tier was discontinued in 2008 when TMIET was introduced."
            onSite="Most apprentices start as Student/Apprentice or Affiliate during the apprenticeship — low cost, immediate access to member benefits. Progress to TMIET in the post-AM2 / post-2391-52 window (often paired with EngTech registration). Progress to MIET when you can evidence IEng/CEng-level competence (typically post-HNC plus design or engineering responsibility). FIET is for senior practitioners 10+ years into their careers with demonstrable contribution beyond their day-job."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Student / Apprentice
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Entry tier for those in formal study (apprenticeship, HNC, HND, BEng).
                  Free or heavily discounted. Suitable for the apprenticeship years.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Affiliate
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Open tier. No qualifications required. Subscription
                  &pound;40-80/year. Suitable for anyone with interest in engineering.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  TMIET (Technician Member)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Vocational professional tier &mdash; typically Level 3 vocational
                  qualifications (e.g. C&amp;G 2365-03) plus experience, often paired with
                  EngTech registration. Subscription around &pound;100-150/year.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  MIET (Member)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Standard professional tier. Incorporated or chartered-level competence
                  anchor (typically HNC+ plus design or engineering responsibility).
                  Subscription &pound;150-200/year.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4 sm:col-span-2">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  FIET (Fellow)
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Senior tier. Significant career achievement required, often combined
                  with CEng. Subscription &pound;200-300/year. Fellowship is recognition
                  of senior standing.
                </p>
              </div>
            </div>
            <p className="mt-3 text-[13px] text-white/70">
              Note: the older &quot;Associate&quot; tier was discontinued in the IET&apos;s
              2008 restructure, replaced by the current Technician Member (TMIET)
              designation.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The vocational route to EngTech via IET</ContentEyebrow>

          <ConceptBlock
            title="Vocational EngTech — how a JIB Approved Electrician qualifies"
            plainEnglish="The IET specifically promotes EngTech registration as accessible to vocational-route practitioners. The standard route for a JIB Approved Electrician with several years of post-AM2 experience: hold IET MIET membership (or apply alongside EngTech) → assemble a portfolio of evidence against UK-SPEC EngTech competences → apply for EngTech via the IET → professional review interview → registration confirmed."
            onSite="Many JIB Approved Electricians could qualify for EngTech but never apply because they assume Engineering Council registration is for graduates only. That's a myth at the EngTech tier. Application takes 20-40 hours of portfolio preparation plus the interview. Cost: £200-300 application fee plus annual EngTech subscription £30-50 (separate from IET membership). Worth the investment for the credibility and salary signal."
          >
            <p>
              Vocational EngTech application checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>JIB Approved Electrician grade (or equivalent).</li>
              <li>2391-52 (or equivalent inspection and testing qualification).</li>
              <li>2-3+ years of post-AM2 site experience.</li>
              <li>IET membership (TMIET or MIET).</li>
              <li>
                Portfolio of evidence against UK-SPEC EngTech competences (knowledge and
                understanding, design, leadership, communication, professional commitment).
              </li>
              <li>Two professional reviewers (typically arranged by IET).</li>
              <li>Professional review interview (60-90 minutes).</li>
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
            source="IET Royal Charter and Bylaws (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The IET operates under Royal Charter granted in 1921 (then to the IEE,
                  inherited by IET). The Charter and Bylaws set the institution&apos;s:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>Object &mdash; to promote the science, engineering and technology of
                  electricity, magnetism and their applications, and the convergence with
                  related sciences and technologies.</li>
                  <li>Membership tiers and qualification criteria.</li>
                  <li>Code of Conduct binding on members.</li>
                  <li>Engineering Council licensing for EngTech / IEng / CEng registration.</li>
                  <li>Governance through a Board of Trustees.</li>
                </ul>
              </>
            }
            meaning={
              <>
                The Royal Charter status gives the IET regulatory standing as a professional
                body. Engineering Council licensing under the Charter is what allows the IET
                to grant EngTech / IEng / CEng registrations. As a member you&apos;re part
                of a chartered institution &mdash; the credential carries weight.
              </>
            }
            cite="Source: IET Royal Charter and Bylaws — paraphrased from publicly-available IET governance documents at theiet.org."
          />

          <RegsCallout
            source="Engineering Council UK-SPEC — EngTech competence requirements (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  EngTech competence at the technician level under UK-SPEC requires:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    A &mdash; Knowledge and understanding: applying proven techniques and
                    procedures.
                  </li>
                  <li>
                    B &mdash; Design and development: working under supervision on complex
                    tasks; working independently on routine tasks.
                  </li>
                  <li>
                    C &mdash; Responsibility, management and leadership: taking responsibility
                    for own work; contributing to the work of teams.
                  </li>
                  <li>
                    D &mdash; Communication: communicating effectively with technical and
                    non-technical audiences.
                  </li>
                  <li>
                    E &mdash; Professional commitment: ethical conduct, CPD, accountability.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                UK-SPEC EngTech competences are pitched at JIB Approved Electrician level.
                If you&apos;re in that grade with several years of post-AM2 experience, you
                very likely meet the competence anchor. The challenge is organising your
                portfolio of evidence to map directly to each UK-SPEC competence area
                &mdash; that&apos;s where the 20-40 hours of preparation goes.
              </>
            }
            cite="Source: Engineering Council UK-SPEC (current edition) — paraphrased from publicly-available guidance at engc.org.uk."
          />

          <RegsCallout
            source="IET Code of Conduct (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  IET members and Engineering Council registrants are bound by the IET
                  Code of Conduct including:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>Acting with integrity and honesty.</li>
                  <li>Respecting public safety and the public interest.</li>
                  <li>Working within the limits of professional competence.</li>
                  <li>Maintaining and developing competence through CPD.</li>
                  <li>Treating colleagues, clients and the public with respect.</li>
                  <li>Reporting concerns about safety, integrity or unethical conduct.</li>
                </ul>
              </>
            }
            meaning={
              <>
                The Code of Conduct provides both protection and obligation. Protection: you
                have professional standing to refuse unethical instructions citing the Code.
                Obligation: you must maintain standards including CPD. Read it as part of
                joining; revisit periodically. Failure to comply can lead to disciplinary
                action and ultimately removal from membership.
              </>
            }
            cite="Source: IET Code of Conduct (current edition) — paraphrased from publicly-available IET guidance at theiet.org."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Joining IET as Affiliate then never progressing"
            whatHappens={
              <>
                Apprentice joins IET as Affiliate during apprenticeship for the
                BS 7671 access and CPD content. Pays subscription year after year but
                never upgrades to TMIET or MIET. Five years post-AM2 still on Affiliate
                tier &mdash; missing the credibility signal of TMIET / MIET on quotes and CV,
                missing the EngTech eligibility, missing access to higher-tier events.
              </>
            }
            doInstead={
              <>
                Plan progression: Student/Apprentice or Affiliate during apprenticeship;
                upgrade to TMIET (typically paired with EngTech) post-AM2 + 2391-52; upgrade
                to MIET later when you can evidence incorporated or chartered-level
                competence. Each upgrade requires application but criteria are
                well-documented at theiet.org. Most upgrades complete within 6-8 weeks.
                Worth the small effort &mdash; the post-nominal letters after your name are
                a meaningful credibility signal.
              </>
            }
          />

          <Scenario
            title="JIB Approved Electrician + 2391-52 — should you apply for IET MIET and EngTech?"
            situation={
              <>
                You&apos;re 4 years post-AM2, JIB Approved Electrician, hold C&amp;G
                2391-52, work for an M&amp;E sub-contractor doing commercial install. You
                want to formalise your professional credentials. The IET annual subscription
                cost (&pound;180/year MIET) plus EngTech application cost (&pound;200) plus
                annual EngTech (&pound;40/year) &mdash; total first-year &pound;420, ongoing
                &pound;220/year. Worth it?
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; assess the credibility value</strong>. MIET +
                EngTech letters after your name carry weight on quotes, CV, LinkedIn. For
                career-focused electrical practitioners they&apos;re the standard
                credentials &mdash; not having them increasingly looks like a gap.
                <br /><br />
                <strong>Step 2 &mdash; assess the practical resource value</strong>. IET
                MIET subscription gives you BS 7671 access (worth &pound;130 alone if you
                buy a paper copy); IET Online (huge technical archive); IET Academy (CPD
                content); regional events (free for members). The technical resources alone
                often justify the subscription.
                <br /><br />
                <strong>Step 3 &mdash; assess EngTech specifically</strong>. EngTech is the
                third-party verification of your competence. Salary signal: EngTech-required
                roles typically &pound;5-10k above non-EngTech equivalents. CPD obligation
                comes with it but you should be doing CPD anyway.
                <br /><br />
                <strong>Step 4 &mdash; remember tax deductibility</strong>. Total
                &pound;420 first-year cost is tax-deductible. For a higher-rate taxpayer
                that&apos;s &pound;252 net cost. For ongoing &pound;220/year, &pound;132
                net.
                <br /><br />
                <strong>Step 5 &mdash; commit and apply</strong>. The case is solid for
                career-focused electrical practitioners. Apply MIET first (typically 6-8
                weeks); add EngTech application in parallel or 6 months later when MIET is
                confirmed. By year-end you have both credentials and the resources.
              </>
            }
            whyItMatters={
              <>
                Professional credentials are how the wider engineering market recognises
                competence. JIB grading anchors trade credibility; IET MIET + EngTech
                anchors wider professional credibility. For career trajectories that include
                any movement toward design, senior technical roles, or specialist practice,
                the credentials matter materially. For pure trade-installer trajectories the
                value is more variable but typically still positive given the resource
                access.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>The IET membership ladder in practice</ContentEyebrow>

          <ConceptBlock
            title="Student/Apprentice to MIET — the membership tier ladder"
            plainEnglish="IET membership runs Student/Apprentice (free for those in formal study), Affiliate (~£40-80/yr, open to anyone with interest in engineering), TMIET (Technician Member, ~£100-150/yr — vocational professional tier typically paired with EngTech registration), MIET (Member of IET, ~£200/yr — incorporated or chartered-level competence, typically post-HNC + experience), FIET (Fellow, ~£250/yr — senior engineering practice, typically 10+ years post-MIET, application-based and selective). Each tier opens different IET resources and confers different status. Apprentices typically start as Student/Apprentice, upgrade to TMIET post-AM2 + 2391-52, and progress to MIET post-HNC + experience. The older 'Associate' tier was discontinued in the 2008 IET restructure."
            onSite="Most working electricians never use IET membership beyond the Wiring Regs subscription — that's missing the wider value. TMIET / MIET status is increasingly looked for by main contractors on technical roles (Project Engineer, Design Engineer) as a competence signal beyond AM2 alone. The journals and online resources (engineering papers, technical guides, industry research) compound over a career. Local IET branch events are also strong for networking — particularly useful when changing firms or moving into specialist sectors. Treat membership as career infrastructure, not just a Wiring Regs paywall."
          >
            <p>
              IET membership tiers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Student / Apprentice</strong> &mdash; free or heavily discounted while in formal study, basic resource access.
              </li>
              <li>
                <strong>Affiliate</strong> &mdash; ~&pound;40-80/yr, open access for anyone with interest.
              </li>
              <li>
                <strong>TMIET (Technician Member)</strong> &mdash; ~&pound;100-150/yr, vocational professional tier typically paired with EngTech registration.
              </li>
              <li>
                <strong>MIET (Member)</strong> &mdash; ~&pound;200/yr, designation MIET, full Engineering Council IEng/CEng route eligibility.
              </li>
              <li>
                <strong>FIET (Fellow)</strong> &mdash; ~&pound;250/yr, senior recognised engineering practice, selective.
              </li>
              <li>
                <strong>Apprentice route</strong> &mdash; Student/Apprentice (free) → TMIET post-AM2 + 2391-52 → MIET post-HNC + experience.
              </li>
            </ul>
            <p className="mt-3 text-[13px] text-white/70">
              Note: the older &quot;Associate&quot; tier was removed in the IET&apos;s 2008
              restructure when TMIET was introduced.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="EngTech via IET — the most accessible Engineering Council route for an electrician"
            plainEnglish="EngTech (Engineering Technician) is the entry-level Engineering Council registration. Via the IET the typical route for an electrician is: hold C&G 2365 Level 3 + AM2 + HNC (or accepted equivalents), demonstrate competence via a Professional Review document and interview, find an IET-registered sponsor (typically a colleague who's already MIET or higher), submit application. Cost: IET membership (~£200/yr) + Engineering Council registration (~£50/yr first year, included in subsequent IET fee). Process typically 6-9 months from application to interview to award. Once held, the EngTech post-nominal goes after your name on professional correspondence."
            onSite="EngTech is the most achievable Engineering Council route for a qualified electrician with HNC. Application steps: gather evidence of competence across 5 areas (knowledge, application, leadership, communication, professional commitment), write the Professional Review describing how you meet each area with workplace examples, identify a sponsor (often a senior colleague or your firm's Project Engineer), submit through IET. The interview is structured around your written submission. Pass rate is high for properly-prepared applicants. Most apprentices wait until 4-5 years post-AM2 + HNC before applying."
          >
            <p>
              EngTech application stack:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Qualifications</strong> &mdash; C&amp;G 2365 + AM2 + HNC (or equivalents).
              </li>
              <li>
                <strong>Experience</strong> &mdash; typically 4&ndash;5 years post-AM2 demonstrating UK-SPEC competence.
              </li>
              <li>
                <strong>Membership</strong> &mdash; IET MIET status as the gateway PEI.
              </li>
              <li>
                <strong>Professional Review document</strong> &mdash; structured submission against UK-SPEC competence areas.
              </li>
              <li>
                <strong>Sponsor</strong> &mdash; existing IET MIET (or higher) endorses application.
              </li>
              <li>
                <strong>Interview</strong> &mdash; structured by IET reviewer panel.
              </li>
              <li>
                <strong>Cost</strong> &mdash; ~&pound;200 IET + ~&pound;50 Engineering Council per year.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="IEng and CEng — the longer chartered routes"
            plainEnglish="IEng (Incorporated Engineer) and CEng (Chartered Engineer) are the next two Engineering Council registers. IEng requires HND/Bachelors-equivalent academic depth + significant engineering practice + senior technical responsibility — typically 8-12 years total post-AM2. CEng requires Bachelors-with-Masters-equivalent depth + advanced engineering practice + senior responsibility for engineering work — typically 12-18 years total. Both apply through IET via similar Professional Review process to EngTech but with substantially more rigorous evidence requirements. CEng is Pinnacle of UK engineering recognition."
            onSite="Apprentice routes to IEng/CEng exist but require sustained academic investment alongside career — typically apprenticeship → AM2 → HNC → HND → BEng top-up → mentored design practice → IEng → years of senior responsibility → CEng. Each step typically 2-4 years. Most electrician-route CEngs are senior Project Engineers, Design Directors or Operations Engineers in major contractors or M&E Consultancies. The destination is well-paid (CEng-grade salaries typically £75-130k+) and confers significant professional status. The path is long; only worth pursuing if engineering-direction destination is clear."
          >
            <p>
              IEng and CEng routes summarised:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>IEng</strong> &mdash; HND/Bachelors + 8&ndash;12yr post-AM2 + senior technical responsibility.
              </li>
              <li>
                <strong>CEng</strong> &mdash; Bachelors+Masters equivalent + 12&ndash;18yr + advanced engineering practice + senior responsibility.
              </li>
              <li>
                <strong>UK-SPEC competence</strong> &mdash; 5 areas assessed via Professional Review and interview.
              </li>
              <li>
                <strong>Cost</strong> &mdash; IET membership + Engineering Council fees.
              </li>
              <li>
                <strong>Annual maintenance</strong> &mdash; CPD record, fee, professional conduct expectations.
              </li>
              <li>
                <strong>Salary signal</strong> &mdash; CEng typically &pound;75&ndash;130k+ in senior engineering roles.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The IET as career infrastructure — branches, mentoring, journals"
            plainEnglish="Beyond the formal designation, IET membership provides career infrastructure: local branches (UK-wide network of branch events, technical talks, networking dinners — typically 1-2 events/month per branch), mentoring schemes (matching newer members with senior MIET/FIET mentors), technical journals (Engineering & Technology magazine monthly, plus specialist journals), online libraries (IET Inspec engineering literature database, IET TV technical videos), formal CPD logging tools, and the IET Wiring Regs publication. Annual subscription pays for itself many times over for a member who actively engages."
            onSite="Local IET branch events are particularly valuable for career mobility — they're where you meet senior engineers in your geographic market, hear about emerging technologies, and build the network that surfaces job opportunities. Most branches actively welcome apprentices and Affiliate / TMIET members at events — turn up, introduce yourself, ask questions. Mentoring schemes pair you with a senior member who can guide career decisions, qualification routes, application support for EngTech/IEng/CEng. The technical journals are valuable CPD reading material — they meet most CPS schemes' CPD evidence requirements when logged."
          >
            <p>
              IET career infrastructure resources:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Local branches</strong> &mdash; UK-wide network, technical talks, networking events monthly.
              </li>
              <li>
                <strong>Mentoring schemes</strong> &mdash; matched senior member for career guidance.
              </li>
              <li>
                <strong>E&amp;T magazine</strong> &mdash; monthly engineering &amp; technology journal.
              </li>
              <li>
                <strong>Specialist journals</strong> &mdash; topic-focused (Power Engineering, Smart Cities, etc).
              </li>
              <li>
                <strong>Online library</strong> &mdash; Inspec engineering database, IET Digital Library.
              </li>
              <li>
                <strong>IET TV</strong> &mdash; technical video library, CPD-credit eligible.
              </li>
              <li>
                <strong>CPD logging</strong> &mdash; structured tools for annual CPD records.
              </li>
              <li>
                <strong>Wiring Regs / On-Site Guide</strong> &mdash; member discount on IET publications.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Cost-benefit — when £200/yr IET subscription pays back"
            plainEnglish="MIET subscription at ~£200/yr pays back fastest for engineering-direction careers — Project Engineer, Design Engineer, M&E Consultancy roles where MIET (or working toward it) is increasingly the implicit baseline for hire. For pure installation careers the payback is slower but still positive (Wiring Regs subscription value alone typically £80/yr; technical resource access; networking value). The marginal cost beyond the publications and resource access is often offset by employer reimbursement — many established firms cover MIET/IET subs as a CPD investment. Ask at your firm before assuming you have to fund yourself."
            onSite="Build the IET membership decision into your annual CPD plan. If your career direction is install-focused, Affiliate (~£40-80/yr) or TMIET (~£100-150/yr, paired with EngTech) may be sufficient; consider upgrading to MIET only when a specific role demands it. If your direction is engineering/design, MIET as soon as you qualify (post-HNC) signals intent and starts building the IEng/CEng evidence base. Many firms reimburse — ask. The cost is modest; the optionality value (keeping doors open to engineering routes) is substantial. Don't dismiss IET membership as 'just for graduates' — vocational routes to TMIET, EngTech, MIET, IEng and CEng are increasingly recognised."
          >
            <p>
              IET membership ROI checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Wiring Regs access</strong> &mdash; ~&pound;80/yr equivalent value.
              </li>
              <li>
                <strong>Technical resource access</strong> &mdash; journals, library, CPD content.
              </li>
              <li>
                <strong>Local branch events</strong> &mdash; networking, talks, typically free.
              </li>
              <li>
                <strong>Engineering Council route</strong> &mdash; EngTech / IEng / CEng eligibility.
              </li>
              <li>
                <strong>Career signal</strong> &mdash; MIET on CV signals professional commitment.
              </li>
              <li>
                <strong>Employer reimbursement</strong> &mdash; many firms cover; ask before self-funding.
              </li>
              <li>
                <strong>Tax deductibility</strong> &mdash; IET subscription deductible against income tax.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "IET (Institution of Engineering and Technology) is the dominant UK professional body for electrical engineering — 156,000 members worldwide, publishes BS 7671.",
              "Current membership tiers: Student/Apprentice (free or discounted while in study), Affiliate (entry, £40-80/year), TMIET (Technician Member, vocational professional tier, £100-150/year, typically paired with EngTech), MIET (Member, IEng/CEng-level, £150-200), FIET (Fellow, senior career, £200-300). The older 'Associate' tier was removed in the 2008 restructure.",
              "Engineering Council registrations linked: EngTech (technician), IEng (incorporated, degree-level), CEng (chartered, master's-level). Separate annual fees (£30-300) on top of IET subscription.",
              "IET specifically promotes EngTech as accessible to vocational-route practitioners — JIB Approved + 2391-52 + portfolio + professional review = typical EngTech qualification.",
              "Subscriptions tax-deductible under HMRC List 3 — effective cost reduced by marginal tax rate.",
              "Member benefits: BS 7671 access, Wiring Matters magazine, IET Online (large technical archive), IET Academy CPD, regional events, professional registration support.",
              "IET regional ambassadors offer free advice on professional registration applications — particularly useful for vocational practitioners considering EngTech.",
              "IET Code of Conduct binds members — professional ethics including competence limits, CPD obligation, public safety priority.",
              "JIB grading and Engineering Council registration are complementary credentials — many career-focused electricians hold both.",
            ]}
          />

          <Quiz title="IET membership routes — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section4-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.1 BS 7671 amendment cycle
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section4-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.3 Online learning + scheme CPD
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
