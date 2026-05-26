/**
 * Module 7 · Section 2 · Subsection 3 — Design route: 2382, DipBSE, EngTech / IEng / CEng
 * Maps to C&G 2365-03 / Unit 308 / LO2 / AC 2.5
 *   AC 2.5 — "Identify sources of information about career opportunities and progression
 *             routes in building services engineering"
 *
 * The academic and professional pathway from site electrician to design
 * engineer — C&G 2382 BS 7671 18th Edition (knowledge), IET DipBSE
 * (Diploma in Building Services Engineering), HNC/HND, BEng, and the
 * professional engineering registrations EngTech, IEng, CEng. The Engineering
 * Council route: what each registration means, what evidence it requires,
 * and what it does for your salary and your career options.
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

const TITLE = 'Design route: 2382, DipBSE, EngTech / IEng / CEng | Level 3 Module 7.2.3 | Elec-Mate';
const DESCRIPTION =
  'The design and engineering pathway — C&G 2382 BS 7671, IET DipBSE, HNC/HND/BEng, and Engineering Council registration (EngTech, IEng, CEng). What each unlocks for salary and career options.';

const checks = [
  {
    id: 'mod7-s2-sub3-2382',
    question: "What does C&G 2382 cover?",
    options: [
      "C&G 2382 is the BS 7671 18th Edition Wiring Regulations qualification — a knowledge exam (typically 60 multiple-choice questions, open-book with BS 7671 allowed) on the regulations themselves. No practical assessment. It's the foundational regs qualification most electricians hold; updated each major BS 7671 amendment (2382-22 covered the 18th Edition; 2382-26 covers A4:2026).",
      "Plain language for what was found and what to do, with technical references in brackets where they add precision (e.g. \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Main protective bonding to incoming gas service is missing — the wire that connects the gas pipe to the main earth is not present. Reg 411.3.1.2 requires this bonding to prevent dangerous touch voltages on a fault.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\").",
      "Leave it in place. Reg 701.415.2 ALLOWS omission when all three conditions are met (ADS, RCDs, main bonding) — but it doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t require removal of existing compliant bonding. Existing supplementary bonds add a layer of redundancy at no cost; removing them creates work and risk for no safety benefit.",
      "The Health and Safety Executive (HSE). Construction sites are higher-risk premises under the Health and Safety (Enforcing Authority) Regulations 1998, so HSE inspectors take the lead. They enforce HASAWA, EAWR, CDM 2015, MHSWR, COSHH, RIDDOR and the rest of the workplace H&S regime on site.",
    ],
    correctIndex: 0,
    explanation:
      "2382 is the regs knowledge qualification — open-book exam, you can use your BS 7671 during the test. The challenge is navigating BS 7671 efficiently under time pressure rather than memorising. Most electricians take 2382 during their apprenticeship as part of the 2365 framework. The qualification is updated each major amendment; you re-sit (typically 1-day refresher) when a new amendment lands.",
  },
  {
    id: 'mod7-s2-sub3-engtech',
    question: "What's EngTech and what does it require?",
    options: [
      "The main contractor holds the contract with the client (often the building developer or end-user) and is responsible for the whole project — programme, cost, safety, all trades. The electrical sub-contractor (sometimes 'M&E sub-contractor') holds a sub-contract with the main contractor and is responsible for the electrical package only — design (if D&B), install, test, commission, hand over. Most UK electrical apprentices work for sub-contractors.",
      "Construction (Design and Management) Regulations 2015 (CDM 2015), Statutory Instrument 2015/51. CDM 2015 covers ALL construction work, with extra duties triggered when the project is 'notifiable' (longer than 30 working days with more than 20 workers simultaneously, or exceeding 500 person-days). It sets duties for clients, principal designers, principal contractors, contractors and workers — including the apprentice's duty under Reg 8 to co-operate, take reasonable care and report defects.",
      "The install can't commission until the DNO has approved the G99 application. Approval timeline 2-12 weeks depending on local network conditions. Customer needs to know this up front — booking holiday around an install date that depends on G99 approval is a recipe for disappointment. The MCS-certified installer normally manages the application and provides timeline expectations. As the apprentice you should never quote a commission date for a G99 install without confirmation from the certified installer.",
      "EngTech (Engineering Technician) is the entry-tier professional engineering registration, governed by the Engineering Council via member institutions like the IET. It requires evidence of competence at the technician level — typically Level 3 qualifications (2365-03 / NVQ 3) plus 2-3 years' work experience plus a professional review (essentially a competence interview with two professional reviewers). Most JIB Approved Electricians could qualify for EngTech with the right portfolio evidence.",
    ],
    correctIndex: 3,
    explanation:
      "EngTech is the lowest tier of Engineering Council professional registration but it's a meaningful credential. It signals to employers and clients that you've been independently assessed against national engineering competence standards. Annual fee around £30-50 to maintain. Many Approved Electricians qualify for EngTech but never apply because they don't realise they're eligible. The IET (Institution of Engineering and Technology) is the most common registering body for electrical EngTechs.",
  },
  {
    id: 'mod7-s2-sub3-ieng-ceng',
    question: "What's the difference between IEng and CEng?",
    options: [
      "IEng (Incorporated Engineer) is the mid-tier — typically requires bachelor's degree (BEng) or equivalent learning plus competence evidence. CEng (Chartered Engineer) is the top tier — typically requires master's level qualification (MEng or equivalent) plus significant senior engineering experience and competence evidence. Both have annual fees and require demonstrable CPD. Many electrical engineers progress EngTech → IEng → CEng over 15-25 years.",
      "Compliance with the six-step procedure on every job, every time. Audit by observation (visiting jobs unannounced or scheduled), record review (locks, voltage indicators in date and tested), training records (operatives current on procedure), incident / near-miss data (any events related to isolation failure). Trend tracked; intervention where slippage is seen.",
      "The College Tutor (delivers the 2365 syllabus, marks coursework, owns the AM2 prep), the Workplace Mentor (your day-job teacher, signs portfolio entries, calibrates your gradings), and the Employer (pays you, owns your apprenticeship contract, signs the off-the-job training declaration). The three meet monthly for the three-way review.",
      "A UK charity providing financial, emotional and practical support specifically to people working in the electrical industry and their families. The charity provides financial assistance grants (cost-of-living support, bereavement, illness, redundancy), emotional support and counselling, debt advice, apprentice support, and a careers service. The charity is funded by donations from across the electrical industry. Apprentices and qualified electricians, employees and self-employed workers, are all eligible for support.",
    ],
    correctIndex: 0,
    explanation:
      "EngTech / IEng / CEng is the Engineering Council's three-tier professional registration system. EngTech for technicians; IEng for incorporated engineers (typically degree-level); CEng for chartered engineers (typically master's-level). Each tier has its own competence standard (UK-SPEC) and review process. Salary uplift across the tiers is significant — EngTech roles typically £35-45k, IEng £45-65k, CEng £65k+. Worth pursuing if your career direction is engineering rather than installation.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's the IET DipBSE?",
    options: [
      "Teams with high collective EI can better understand client concerns, communicate their approach empathetically, build trust during interviews, handle challenging questions with composure, and demonstrate collaborative working relationships — all of which influence bid evaluations",
      "The Institution of Engineering and Technology Diploma in Building Services Engineering — a Level 4 qualification covering electrical and mechanical building services design. Roughly equivalent to HNC level. Often delivered as part-time evening or distance learning over 1-2 years. Recognised academic anchor for IEng professional registration in the BSE field.",
      "Recognise that direct eye contact norms vary significantly across cultures — in many cultures, avoiding direct eye contact is a sign of respect, not evasion. Adjust your communication style to accommodate cultural differences rather than interpreting through your own cultural lens",
      "A duty that all systems shall at all times be of such construction as to prevent, so far as is reasonably practicable, danger. The duty applies to design, installation, modification, maintenance and use — and the scope of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"system\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" extends to all electrical equipment, conductors and apparatus in workplaces.",
    ],
    correctAnswer: 1,
    explanation:
      "The IET DipBSE is a recognised Level 4 qualification combining electrical and mechanical building services design. Common stepping stone for senior site electricians moving toward design office roles or for new entrants without a degree wanting an IEng route. Typical cost £3,000-5,000 over the 1-2 year programme. Builds on existing 2365-03 + 2391-52 + 2396 foundation.",
  },
  {
    id: 2,
    question: "What's HNC and HND in electrical engineering?",
    options: [
      "Apply the Reg 443 risk assessment. For most owner-occupied dwellings the assessment outcome is 'protection recommended' rather than mandatory. Present the case to the customer — Type 2 SPD at the consumer unit protects connected appliances against induced surges and switching transients — and let them decide. Cost is modest (typically £80-£200 for a Type 2 device including labour) and the protection benefit is real for households with sensitive electronics.",
      "Between 50 MΩ and over the meter\\\\\\\\'s maximum range (typically &gt; 200 MΩ or &gt; 999 MΩ depending on model). The 1 MΩ minimum is for borderline acceptance; a well-installed dry circuit with no contributing components should read tens or hundreds of MΩ. Readings between 1-50 MΩ warrant investigation even though they pass — there is leakage from somewhere.",
      "HNC (Higher National Certificate) is a Level 4 qualification, typically 1 year full-time or 2 years part-time. HND (Higher National Diploma) is Level 5, typically 2 years full-time or 3-4 years part-time. Both are recognised academic anchors for Technician JIB grading and IEng professional registration. Most college and FE delivery is part-time evening or day-release for working electricians.",
      "First, the customer cannot register the system for the Smart Export Guarantee (SEG), so they get no payment from the supplier for any electricity they export. Second, the install is still notifiable to the DNO under G98 / G99 and to building control under Part P — those obligations do not go away just because MCS is skipped.",
    ],
    correctAnswer: 2,
    explanation:
      "HNC and HND are the long-established UK technician-tier engineering qualifications. HNC = 1 year FT or equivalent; HND = 2 years FT or equivalent (= roughly the first 2 years of a degree). Many UK FE colleges deliver part-time HNC/HND to working electricians. Cost typically £3,000-5,000 per year of part-time study. Strong academic anchor for moving into design or senior technical roles.",
  },
  {
    id: 3,
    question: "What's UK-SPEC?",
    options: [
      "Outdoor PV electrical equipment shall have a degree of protection not less than IP44 to BS EN 60529 and an impact rating not less than IK07 to BS EN 62262. On a Section 712 acceptance the enclosure shall be labelled accordingly or be accompanied by manufacturer documentation evidencing compliance — absence of evidence is non-compliance.",
      "Durable warning signs notifying anyone working on the installation that there is a parallel generation source on site. Signs at the consumer unit, at the main isolation, at the inverter and at any DC isolators. The DNO emergency contacts. The PV system identification (kWp rating, inverter manufacturer/model). Required by BS 7671 Section 712, MCS MIS 3002 and the DNO's G98/G99 connection conditions. The signage protects future maintainers who may not realise there's a generator on the property.",
      "Other trades create falling-object risk, slip risk, dust and noise risk for you, and your work creates electrical and tripping risk for them. The walk-round and the toolbox talks need to take account of who else is working in or above your area, not just your own activity. CDM 2015 Reg 13 puts a co-ordination duty on the Principal Contractor; HASAWA s.7(b) puts a co-operation duty on every operative.",
      "UK-SPEC (UK Standard for Professional Engineering Competence) is the published competence standard against which Engineering Council professional registrations (EngTech, IEng, CEng) are assessed. It defines five competence areas (knowledge and understanding, design, leadership and management, communication, professional commitment) and the level of evidence required at each tier. Available free at engc.org.uk.",
    ],
    correctAnswer: 3,
    explanation:
      "UK-SPEC is the framework that anchors the EngTech/IEng/CEng registrations. Each tier requires evidence against all five competence areas at the appropriate level. Free download. Read it before applying — your portfolio of evidence needs to map directly to UK-SPEC competences. Most successful applications are well-organised against the UK-SPEC structure.",
  },
  {
    id: 4,
    question: "Roughly what does EngTech registration cost?",
    options: [
      "Application fee around £200-300 plus annual subscription around £30-50. Some institutions (IET, EngineeringUK) offer reduced rates for new registrants. Cost is tax-deductible if you're self-employed or HMRC has the body on its approved professional fees list. Compared to the credential value (recognised national engineering registration) the cost is modest.",
      "The apprenticeship contract (a formal indenture under the Apprenticeships, Skills, Children and Learning Act 2009), the wages, the off-the-job training declaration (a minimum 20% of paid working hours under the Apprenticeship Standard), the provision of suitable work and supervision, and HASAWA s.2 duties to provide a safe place of work and adequate training.",
      "EI enhances teamwork by: enabling trust (through self-regulation and reliability), improving communication (through empathy and active listening), facilitating constructive conflict (through assertiveness and perspective-taking), and creating psychological safety (through social awareness) — transforming a group of individuals into a genuinely high-performing team",
      "Is a ±12 V PWM (pulse width modulation) signal between the EVSE and the vehicle that communicates: EVSE availability, maximum available current (encoded in the PWM duty cycle), vehicle connected status, and charge enable/disable — it is the fundamental communication protocol for AC charging",
    ],
    correctAnswer: 0,
    explanation:
      "EngTech is the most accessible Engineering Council registration both academically (Level 3 + experience is enough) and financially (modest fees). For a JIB Approved Electrician with a few years of experience the application is achievable as a single-evening job once you have your portfolio organised. The credential value lasts indefinitely as long as you maintain CPD and pay the annual subscription.",
  },
  {
    id: 5,
    question: "What's the IET MIET grade?",
    options: [
      "Present both statistics in a lessons learnt briefing, analyse why entrapment is increasing despite overall fatality improvements, review all current entrapment prevention measures, implement additional controls such as secondary guarding and enhanced training, set measurable targets for entrapment reduction, and monitor progress quarterly using the PDCA cycle",
      "MIET (Member of the Institution of Engineering and Technology) is the standard professional membership grade of the IET. It's a membership grade, not an Engineering Council registration — so you can be MIET without being EngTech/IEng/CEng. Most engineers aim for MIET as the membership tier alongside their professional registration. Grants access to IET technical resources, member events, online journals.",
      "Provided to the customer (full pack — EIC + Schedule of Inspections + STR), retained by the contractor (typically minimum six years), and uploaded to any applicable Competent Person Scheme (NICEIC, NAPIT, Stroma, ECA etc.) within the scheme\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s required notification window — typically 30 days for Part P-notifiable work.",
      "Construction work expected to (a) last longer than 30 working days AND have more than 20 workers working simultaneously at any point, OR (b) exceed 500 person-days. The client must notify the HSE via Form F10 before the work starts. CDM still applies to non-notifiable projects — only the F10 notification differs.",
    ],
    correctAnswer: 1,
    explanation:
      "MIET is the IET membership tier. Different from Engineering Council registration but typically held in combination with one of the registrations. MIET annual subscription typically £150-200. Provides access to the IET Library, IET Online (massive technical document archive), member events and discounts on training. Strong professional value for engineering-leaning electricians.",
  },
  {
    id: 6,
    question: "What's the typical professional review for EngTech / IEng / CEng?",
    options: [
      "Five-bag setup, all clearly labelled: (1) WEEE — failed devices, scorched accessories, electronic components. (2) BATTERIES — taped terminals, separate from metalwork. (3) HAZARDOUS — fluorescent tubes (intact, in tube tube), CFLs, mercury switches. (4) COPPER SCRAP — cable offcuts (insulation on, never stripped by burning), bare copper offcuts. (5) GENERAL — packaging, plastic offcuts, non-recyclable. Each bag goes to its correct route at the next wholesaler trip OR firm scrap collection. The five-bag system makes compliance routine, not a special effort.",
      "Day-rate: customer pays an agreed daily (or hourly) rate for time spent plus materials at agreed markup. Risk on time-overrun sits with the customer. Fixed-price: you quote a single all-in price for the defined scope. Risk on time-overrun sits with you. Customers typically prefer fixed-price (predictable budget); contractors typically prefer day-rate (no overrun risk). Practical compromise: fixed-price for well-defined scopes, day-rate for variable or fault-finding work.",
      "A formal interview with two professional reviewers (qualified at IEng or CEng) who assess your portfolio of evidence against UK-SPEC. Typically 60-90 minutes. The reviewers ask probing questions on specific projects you cite, your decision-making process, your professional commitment evidence. Most applications pass; reviewers want to confirm you've evidenced the competences. Failed applications get specific feedback on what to strengthen.",
      "With safe isolation confirmed and the circuit\\\\\\\\'s L disconnected from the protective device, link L to CPC at the CU end. At each accessory, measure continuity between L and CPC at the accessory — a low reading confirms the local \\\\\\\"line\\\\\\\" terminal really is the same conductor as the CU\\\\\\\\'s line. Confirms polarity at every accessory.",
    ],
    correctAnswer: 2,
    explanation:
      "Professional review is the substance behind the credential. Interview-based, evidence-driven. Reviewers genuinely want you to pass and will probe gaps in evidence. Typical preparation time: 20-40 hours organising the portfolio against UK-SPEC and rehearsing key project explanations. Many successful applicants find the preparation itself valuable — it forces structured reflection on your career.",
  },
  {
    id: 7,
    question: "Can a JIB Approved Electrician apply for EngTech?",
    options: [
      "Ownership requires self-regulation of defensive impulses (ego protection, fear of consequences), involves taking responsibility without self-condemnation, and focuses on learning and solution — whereas blame culture is driven by unregulated fear and redirects negative emotion outward to protect the self",
      "An EICR carried out and signed by a competent person (usually a CPS-registered contractor) in accordance with BS 7671 Part 6 / IET GN3, at the recommended frequency for the premises type, with a satisfactory or remediated outcome. Without that, the insurer's claim that the installation wasn't maintained to current standards is hard to refute.",
      "So the tester can verify the design assumptions during initial verification — measured Ze at the origin and measured Zs at each circuit end can be compared against the design values on the SLD. Mismatch flags either a measurement issue or a design assumption that did not hold (e.g. cable installed differently to design).",
      "Yes — JIB Approved (Electrician with 2391-52 + experience) typically meets the academic anchor for EngTech. The application requires academic evidence (qualifications), experience evidence (portfolio of projects), and the professional review. Most Approved Electricians could qualify with the right portfolio organisation. The IET specifically promotes EngTech as accessible to vocational-route practitioners.",
    ],
    correctAnswer: 3,
    explanation:
      "EngTech is intentionally accessible to vocational-route practitioners. The Engineering Council and IET want to broaden professional registration beyond traditional graduate routes. Approved Electricians, technicians, technologists — all are typical EngTech candidates. The myth that you need a degree for any Engineering Council registration is exactly that — a myth at the EngTech tier.",
  },
  {
    id: 8,
    question: "How does professional registration affect salary?",
    options: [
      "Engineering Council registration typically correlates with meaningful salary uplift. EngTech-registered roles often pay £35-45k; IEng roles £45-65k; CEng roles £65k+. Registration alone doesn't generate the salary — the underlying competence and the roles you take on do — but the registration is widely used as a salary-band anchor in engineering job markets. For senior technical and design roles registration is often a job pre-requisite.",
      "Because it covers the whole work activity (not just the install), it covers operation, use AND maintenance, AND it covers work NEAR a system as well as on it. So it's the legal hook for safe-isolation procedures, lock-off, voltage-proving, and the way you organise the work around live equipment that you're not directly working on. Reg 4(3) is what the HSE charges most often after an electrical incident.",
      "Phase 1 (Days 1-30): Foundation — self-assessment, identify target competency, establish baseline, begin daily reflection practice, and find an accountability partner. Phase 2 (Days 31-60): Practice — apply new skills in specific situations, gather feedback, adjust approach based on results. Phase 3 (Days 61-90): Integration — embed new behaviours into routine, measure progress against baseline, plan for ongoing development",
      "Three reasons. (1) Speed of selection — colour-coded ferrules let you grab the right size at a glance from a sorted ferrule kit. (2) Inspection — supervisor or QA can check at a glance that the ferrule colour matches the conductor CSA on every termination. (3) Standardisation — DIN 46228-4 is recognised across Europe, so any supplier's ferrules match any other's. The colour code IS the inspection mechanism.",
    ],
    correctAnswer: 0,
    explanation:
      "Registration is increasingly used as a salary-band signal in UK engineering. CEng-required roles pay materially above non-registered equivalents. For an electrician moving into design and engineering professional registration is a strategic CPD investment with measurable salary impact. Plan EngTech in the 5-10 year window post-AM2; IEng in the 10-15 year window if academic qualifications support it.",
  },
];

const faqs = [
  {
    question: "Do I need a degree to be a design engineer?",
    answer:
      "Not strictly — many design-engineer roles are open to HNC/HND holders, IET DipBSE holders, or experienced practitioners with C&G 2396. But for senior design positions and IEng registration a degree (BEng) is typically expected. Mid-career professionals often complete a part-time BEng (Open University) to bridge the gap. Plan academic progression alongside professional registration; they reinforce each other.",
  },
  {
    question: "What's the typical pathway from electrician to design engineer?",
    answer:
      "Standard pathway: AM2 → 2391-52 → 2396 → HNC/HND or DipBSE → EngTech application. Some skip steps; some take longer routes. Many design engineers in M&E sub-contractors started as installation electricians and moved across through intermediate roles (junior designer, design technician). The C&G 2396 is often the practical inflection point — it's the first qualification that explicitly covers design from first principles.",
  },
  {
    question: "Is professional registration worth the annual fees?",
    answer:
      "Cost-benefit personal judgement. Annual EngTech subscription £30-50; IEng £150-200; CEng £200-300. Plus IET MIET membership £150-200 if held alongside. Total annual professional cost £200-500. In return: credential, technical resources, network, salary signal. For engineering-direction careers the answer is normally yes; for site-installation careers the answer is more mixed.",
  },
  {
    question: "Can I do an HNC while working full-time?",
    answer:
      "Yes — most UK FE colleges deliver HNC part-time as evening or day-release. Typical commitment: one evening per week (4 hours) plus 5-10 hours per week home study, over 2 years. Demanding but achievable for a working electrician with employer support. Some employers part-fund HNC as CPD investment, particularly if moving you toward Technician grade or design role.",
  },
  {
    question: "What's the IET Academy?",
    answer:
      "The IET Academy is the IET's online learning platform — provides bite-sized technical courses, BS 7671 update training, design and engineering CPD content. Member access typically included with MIET subscription; some content open to non-members. Strong CPD resource alongside scheme-specific (NICEIC, NAPIT) and provider-specific (Elec-Mate, NET) CPD platforms.",
  },
  {
    question: "What's the difference between an IET 'Affiliate' and 'Associate' membership?",
    answer:
      "Affiliate is the entry membership tier — open to anyone with an interest in the field, no qualifications required. Associate is the next tier — typically Level 3 vocational qualifications (e.g. 2365-03) and some experience. MIET (Member) is the standard professional tier with EngTech-equivalent academic anchor. FIET (Fellow) is the senior tier. Most electrical apprentices start as Affiliate or Associate during the apprenticeship.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 7 · Section 2 · Subsection 3"
            title="Design route: 2382, DipBSE, EngTech / IEng / CEng"
            description="The academic and professional pathway from site electrician to design engineer — C&G 2382, IET DipBSE, HNC/HND/BEng, and Engineering Council registration (EngTech, IEng, CEng)."
            tone="emerald"
          />

          <TLDR
            points={[
              "Academic ladder: 2382 (regs knowledge) → 2391-52 → 2396 (design) → HNC/HND or DipBSE → BEng → MEng. Each step opens design and engineering roles the previous didn't.",
              "Professional registration: EngTech (technician tier, accessible to JIB Approved), IEng (incorporated, typically degree-level), CEng (chartered, typically master's-level).",
              "Engineering Council UK-SPEC sets the competence standards; IET is the most common registering body for electrical engineers.",
              "Registration correlates with salary — EngTech roles £35-45k, IEng £45-65k, CEng £65k+. Plan registration alongside academic progression for maximum impact.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO2 / AC 2.5 — identify sources of information about progression routes in building services engineering, including the design and engineering ladder.",
              "State what C&G 2382 covers and how it fits with 2391-52 and 2396 in the I&T-design progression.",
              "Identify the IET DipBSE as a Level 4 BSE design qualification.",
              "Distinguish between HNC (Level 4) and HND (Level 5) and how they fit the academic anchor for IEng.",
              "Distinguish between EngTech, IEng and CEng professional registrations and the typical academic anchors for each.",
              "State what UK-SPEC is and how it structures the professional review for EngTech / IEng / CEng applications.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The academic ladder</ContentEyebrow>

          <ConceptBlock
            title="From 2382 to BEng — the qualifications progression"
            plainEnglish="The academic ladder from apprenticeship to engineering registration runs through several qualifications: C&G 2382 (BS 7671 regs knowledge), C&G 2391-52 (inspection and testing), C&G 2396 (design and verification), HNC/HND in Electrical Engineering or IET DipBSE (Level 4-5 academic anchor), then optionally BEng or MEng (degree-level). Each step opens roles the previous didn't and provides the academic anchor for the next tier of professional registration."
            onSite="Most electricians complete 2382 during the apprenticeship; 2391-52 in the 12-18 month window post-AM2; 2396 typically 2-3 years post-AM2 if moving toward design. HNC/HND or DipBSE is a 1-2 year part-time commitment usually undertaken in the 3-7 year post-AM2 window. BEng is rare for vocational-route practitioners but increasingly offered part-time by Open University and Coventry Uni."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Level 3
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  C&amp;G 2365-03 / NVQ Level 3 (apprenticeship anchor). C&amp;G 2382 (regs
                  knowledge) typically held alongside.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Specialist Level 3
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  C&amp;G 2391-52 (Inspection &amp; Testing). C&amp;G 2396 (Design and
                  Verification). Specialist endorsements (PV/EV/CompEx).
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Level 4-5
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  HNC (Level 4) Electrical Engineering. HND (Level 5) Electrical
                  Engineering. IET DipBSE (Level 4) Building Services Engineering.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  Level 6+
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  BEng (Bachelor of Engineering, Level 6). MEng (Master of Engineering,
                  Level 7). Open University, Coventry Uni and Northumbria Uni offer
                  part-time / distance routes.
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

          <SectionRule />

          <ContentEyebrow>Engineering Council registration</ContentEyebrow>

          <ConceptBlock
            title="EngTech / IEng / CEng — the professional registration tiers"
            plainEnglish="The Engineering Council is the UK regulatory body for the engineering profession. It sets the UK-SPEC competence standards and accredits the institutions (like IET) that grant professional registration. Three tiers: EngTech (Engineering Technician), IEng (Incorporated Engineer), CEng (Chartered Engineer). Each tier has its own academic anchor and competence standard. Registration is held with a member institution (IET for most electrical engineers); the registration is portable and widely recognised."
            onSite="Registration matters because it's the independent third-party verification of your competence — different from holding a qualification, different from holding a JIB grade. For senior technical and design roles registration is often a job pre-requisite. Salary signal is meaningful: EngTech-required roles typically £35-45k; IEng £45-65k; CEng £65k+. Most engineering-direction electricians plan EngTech in the 5-10 year window post-AM2."
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  EngTech
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Engineering Technician. Level 3 + 2-3 years experience + professional
                  review. Accessible to JIB Approved Electricians. Annual fee
                  &pound;30-50.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  IEng
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Incorporated Engineer. Bachelor&apos;s degree (BEng) or equivalent +
                  competence evidence + professional review. Mid-career engineering
                  registration. Annual fee &pound;150-200.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  CEng
                </div>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  Chartered Engineer. Master&apos;s level (MEng) or equivalent + significant
                  senior experience + professional review. Top tier UK engineering
                  registration. Annual fee &pound;200-300.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="UK-SPEC and the professional review"
            plainEnglish="UK-SPEC (UK Standard for Professional Engineering Competence) is the published competence framework that anchors all three tiers of professional registration. Five competence areas: knowledge and understanding; design, development and solution of engineering problems; responsibility, management and leadership; communication and interpersonal skills; professional commitment. Each tier requires evidence at the appropriate level."
            onSite="The professional review is a structured interview with two professional reviewers (typically qualified at IEng or CEng) who assess your portfolio against UK-SPEC. 60-90 minutes. The reviewers ask probing questions on specific projects you cite, your decision-making process, your professional commitment evidence. Preparation: 20-40 hours organising the portfolio against UK-SPEC. Most applications pass; reviewers want you to succeed."
          >
            <p>
              The UK-SPEC competence areas:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>A &mdash; Knowledge and understanding</strong>: technical knowledge
                appropriate to the registration tier.
              </li>
              <li>
                <strong>B &mdash; Design and development</strong>: applying knowledge to
                solve engineering problems.
              </li>
              <li>
                <strong>C &mdash; Responsibility, management and leadership</strong>:
                managing risk, resources and people.
              </li>
              <li>
                <strong>D &mdash; Communication and interpersonal skills</strong>:
                communicating effectively with technical and non-technical audiences.
              </li>
              <li>
                <strong>E &mdash; Professional commitment</strong>: ethical conduct,
                continuing professional development, accountability to society.
              </li>
            </ul>
          </ConceptBlock>

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

          <RegsCallout
            source="Engineering Council UK-SPEC (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  UK-SPEC sets the professional competence standard for the three Engineering
                  Council registration tiers. For each tier:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    <strong>EngTech</strong> &mdash; competence at the engineering-technician
                    level: applying proven techniques and procedures, working under
                    supervision on complex tasks, working independently on routine work.
                  </li>
                  <li>
                    <strong>IEng</strong> &mdash; competence at the incorporated-engineer
                    level: applying established engineering principles, exercising
                    independent technical judgement, managing technical resources.
                  </li>
                  <li>
                    <strong>CEng</strong> &mdash; competence at the chartered-engineer level:
                    developing solutions to complex engineering problems using new or
                    existing technologies, leading technical and managerial work, exercising
                    senior professional judgement.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                UK-SPEC is the framework against which your portfolio is assessed. Read it
                before applying &mdash; free download at engc.org.uk. Your portfolio of
                evidence (projects, decisions, leadership examples, CPD record) must map
                directly to UK-SPEC competences at the tier you&apos;re applying for. Most
                successful applications are well-organised against the UK-SPEC structure.
              </>
            }
            cite="Source: Engineering Council UK-SPEC (current edition) — paraphrased from publicly-available guidance at engc.org.uk."
          />

          <RegsCallout
            source="Companies Act 2006 — directors' duties (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The Companies Act 2006 sets statutory duties on company directors,
                  including:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    s.174 &mdash; duty to exercise reasonable care, skill and diligence,
                    including specifically the care, skill and diligence that may reasonably
                    be expected of a director with the general knowledge, skill and
                    experience that the director has.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                For an engineer-director (technical lead in an engineering firm) s.174 means
                the standard expected is informed by your professional registration and
                qualifications. A CEng director is held to a higher standard than an EngTech
                director on technical decisions because the registration evidences the
                competence. Professional registration is therefore both a credential and a
                responsibility.
              </>
            }
            cite="Source: Companies Act 2006 (c.46), s.174 — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="IET Code of Conduct (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  IET members and Engineering Council registrants are bound by professional
                  codes of conduct including:
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
                Professional registration carries professional obligations. The IET Code of
                Conduct (and the equivalent codes of other Engineering Council institutions)
                bind registrants to ethical standards and CPD. Failure to comply can lead to
                disciplinary action and ultimately removal from the register. Treat
                registration as ongoing commitment, not just a one-off credential.
              </>
            }
            cite="Source: IET Code of Conduct — paraphrased from publicly-available IET guidance at theiet.org."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Assuming you need a degree to apply for EngTech"
            whatHappens={
              <>
                JIB Approved Electrician with 5 years post-AM2 experience and 2391-52, would
                qualify for EngTech but never applies because they assume Engineering
                Council registration is for graduates only. Hears CEng-bound colleagues
                talking about university degrees and concludes the whole register is closed
                to vocational-route practitioners. Misses out on a credential that&apos;s
                genuinely accessible and would meaningfully strengthen their CV and salary
                negotiation.
              </>
            }
            doInstead={
              <>
                Read the EngTech competence standard (UK-SPEC). Read the IET&apos;s EngTech
                application guidance. The Engineering Council and IET specifically promote
                EngTech as accessible to vocational-route practitioners. Get your portfolio
                organised, find an EngTech sponsor (often available through IET), and apply.
                Worst case &mdash; you don&apos;t qualify yet and get specific feedback on
                what to strengthen. Best case &mdash; you have an EngTech and a meaningful
                credential.
              </>
            }
          />

          <Scenario
            title="Site electrician with 8 years' experience — EngTech now or HNC first?"
            situation={
              <>
                You&apos;re 8 years post-AM2. Approved Electrician, hold 2391-52 and 2396, no
                academic qualifications above Level 3. You&apos;re moving into design-led
                work in an M&amp;E sub-contractor. You&apos;re considering: (a) apply for
                EngTech now, or (b) start an HNC part-time first to strengthen the academic
                anchor before applying. Both are valid. Which makes more sense?
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; check eligibility now</strong>. Read EngTech UK-SPEC.
                With Approved + 2391-52 + 2396 + 8 years experience you very likely meet the
                academic and competence anchor for EngTech without further qualifications.
                The portfolio of design projects you&apos;re building will provide the
                evidence.
                <br /><br />
                <strong>Step 2 &mdash; consider sequencing</strong>. EngTech now provides
                immediate credential and salary signal. HNC then strengthens the academic
                anchor for IEng later (typical pathway: EngTech in year 8-10, IEng in year
                15-18 after HNC + further experience). Sequential is fine.
                <br /><br />
                <strong>Step 3 &mdash; talk to an IET regional ambassador</strong>. The IET
                has regional ambassadors who advise on professional registration pathways
                free of charge. They&apos;ll look at your CV and tell you whether you&apos;re
                EngTech-ready and what gaps to fill. Worth a 30-minute conversation.
                <br /><br />
                <strong>Step 4 &mdash; pick one and commit</strong>. The risk is doing
                neither because you can&apos;t decide. EngTech is a 20-40 hour preparation
                effort plus the application fee. HNC is 2 years part-time + £6,000-10,000.
                EngTech is the lower-cost faster-payback option to start with.
                <br /><br />
                <strong>Step 5 &mdash; plan the next move from there</strong>. EngTech in
                year 1; HNC starting year 2-3; IEng aim for year 7-8 after HNC complete.
                Sequential progression with credential at every stage.
              </>
            }
            whyItMatters={
              <>
                Engineering Council registration is one of the most under-used credentials in
                the UK electrical trade. Many Approved Electricians qualify for EngTech but
                never apply, missing out on a meaningful salary signal and professional
                credential. For engineering-direction careers registration is strategic CPD;
                for installation-direction careers it&apos;s less essential. Plan deliberately
                rather than drifting.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>The qualification stack and the chartered ladder</ContentEyebrow>

          <ConceptBlock
            title="C&G 2382 BS 7671 — the foundation qualification for design work"
            plainEnglish="C&G 2382 (currently 2382-22 for the BS 7671:2018+A4:2026 amendment, soon 2382-26 for A4:2026) is the formal BS 7671 qualification — typically 5 days plus a closed-book exam. It's not the same as 'knowing the regs' from the apprenticeship — it's a standalone certificate that proves design-level familiarity with the regs. 2382 is required for almost any meaningful design or supervisory role and is the implicit baseline for IET DipBSE entry. Cost typically £450-700; widely available through colleges, NICEIC, NAPIT and private trainers."
            onSite="Most apprentices have informal BS 7671 knowledge from the apprenticeship but no 2382 certificate — and that gap matters when applying for jobs that need design competence. Treat 2382 as the first post-AM2 qualification to add (alongside 2391-52 if you're inspection-direction). Each new amendment requires a refresh — A2 in 2022, A4 in 2026, and so on. Many colleges run condensed 2-day update versions for already-qualified electricians. Keep your 2382 currency on your CV and CPD record."
          >
            <p>
              The C&amp;G 2382 stack:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>2382-22</strong> &mdash; current BS 7671:2018+A4:2026 qualification.
              </li>
              <li>
                <strong>2382-26</strong> &mdash; incoming for BS 7671 A4:2026 amendment.
              </li>
              <li>
                <strong>Format</strong> &mdash; typically 5 days study, closed-book MCQ exam.
              </li>
              <li>
                <strong>Cost</strong> &mdash; ~&pound;450&ndash;700 standard; ~&pound;200&ndash;350 update version.
              </li>
              <li>
                <strong>Refresher</strong> &mdash; required at each new amendment cycle.
              </li>
              <li>
                <strong>Use cases</strong> &mdash; design role gateway, 2391-52 prerequisite, scheme QS requirement.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="HNC vs HND vs BEng — which formal qualification to pick"
            plainEnglish="The Higher Education ladder for an electrician runs HNC (Higher National Certificate, ~1 year part-time), HND (Higher National Diploma, ~2 years), then BEng (Bachelor of Engineering, ~3-4 years full-time or ~5-6 years part-time). HNC is sufficient for JIB Technician grade, EngTech registration with the Engineering Council, and entry-level Project Engineer roles. HND adds depth in design, controls and systems. BEng is the gateway to IEng and (with mentored practice) CEng — Chartered Engineer status. Most apprentices stop at HNC unless they're aiming explicitly at design or chartered status."
            onSite="Pick the qualification level that matches the destination, not the highest available. HNC is enough for ~85% of post-AM2 career destinations — Project Engineer, Senior Estimator, Contracts Manager, Technician-grade design support. HND is for designers wanting more theoretical depth or those targeting M&E Consultant entry. BEng is essential only if Chartered Engineer is the destination. Costs: HNC ~£3-5k self-funded (often employer-contributed), HND ~£5-8k, BEng ~£9-12k tuition fees plus opportunity cost of time. Time invested compounds — but only if the destination role exists."
          >
            <p>
              HNC / HND / BEng comparison for an electrician:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HNC</strong> &mdash; 1yr part-time, ~&pound;3&ndash;5k, opens Technician grade and EngTech.
              </li>
              <li>
                <strong>HND</strong> &mdash; 2yr part-time, ~&pound;5&ndash;8k, opens IEng route.
              </li>
              <li>
                <strong>BEng (top-up)</strong> &mdash; 1&ndash;2yr from HND, opens CEng route.
              </li>
              <li>
                <strong>BEng (full)</strong> &mdash; 3&ndash;4yr full-time, ~&pound;9&ndash;12k tuition, alternative to apprenticeship+top-up.
              </li>
              <li>
                <strong>Apprenticeship-funded HNC</strong> &mdash; some employers cover full HNC fees in exchange for retention period.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="EngTech, IEng, CEng — what each register actually signals to employers"
            plainEnglish="The Engineering Council operates three professional registers — Engineering Technician (EngTech), Incorporated Engineer (IEng) and Chartered Engineer (CEng). Registration is administered by Professional Engineering Institutions (PEIs) — for electricians the IET (Institution of Engineering and Technology). EngTech is broadly equivalent to a competent technical practitioner with HNC + experience; IEng to a HND/BEng + significant experience in design or supervisory roles; CEng to BEng (or equivalent) + advanced engineering practice + significant responsibility. Annual maintenance fee ~£200-450 depending on grade."
            onSite="Registration is most valuable for engineering-direction careers (M&E Consultants, large sub-contractor design teams, manufacturer technical roles, public-sector engineering posts). For installation-direction careers it's optional — clients on Part P jobs don't ask for EngTech, but design clients and large institutional employers do. EngTech is achievable for any post-AM2 electrician who adds an HNC; IEng adds 2-4 years of mentored design or supervisory practice; CEng requires BEng (or equivalent) plus typically 5+ years of senior engineering responsibility. The application process is rigorous — sponsor signatures, professional review interview, written submission demonstrating competence."
          >
            <p>
              Engineering Council register summary:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EngTech</strong> &mdash; HNC + experience; competent technical practitioner.
              </li>
              <li>
                <strong>IEng</strong> &mdash; HND/BEng + design/supervisory experience; incorporated engineer.
              </li>
              <li>
                <strong>CEng</strong> &mdash; BEng + advanced practice + senior responsibility; chartered.
              </li>
              <li>
                <strong>Annual fee</strong> &mdash; ~&pound;200 EngTech, ~&pound;320 IEng, ~&pound;450 CEng (2024).
              </li>
              <li>
                <strong>Application route</strong> &mdash; via IET (or another PEI), professional review interview.
              </li>
              <li>
                <strong>Use cases</strong> &mdash; design roles, M&amp;E Consultancy, public sector engineering, manufacturer specialists.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The IET DipBSE — the building services design qualification"
            plainEnglish="The IET Diploma in Building Services Engineering (DipBSE) is a structured qualification specifically for building services design, sitting between an HNC and a BEng. It's typically delivered through workplace assessment plus modular study, takes 18-24 months, and aligns with IEng registration on completion. Cost varies (~£3-5k typical) and is often employer-funded for serious design-route candidates. It's a strong CV signal for M&E Consultancy and large sub-contractor design team applications."
            onSite="DipBSE is less well-known than HNC/HND but is highly regarded in the design community precisely because it's purpose-built for building services rather than the generic electrical engineering of HNC. It's a strong choice if your firm has an in-house design team and is willing to fund and mentor you through it. The structured assessment via real workplace projects also produces an immediate portfolio of design work that supports IEng application. Talk to your Project Engineer or Design Engineer about whether DipBSE is supported in your firm before defaulting to HNC."
          >
            <p>
              DipBSE vs HNC for a design-route electrician:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HNC Electrical Engineering</strong> &mdash; broader theoretical, college-delivered, generic.
              </li>
              <li>
                <strong>IET DipBSE</strong> &mdash; building services specific, workplace-assessed, design portfolio output.
              </li>
              <li>
                <strong>HNC strength</strong> &mdash; widely recognised, opens Technician grade and EngTech.
              </li>
              <li>
                <strong>DipBSE strength</strong> &mdash; recognised by M&amp;E Consultants, aligns with IEng directly.
              </li>
              <li>
                <strong>Combination</strong> &mdash; some apprentices stack HNC then DipBSE for fastest IEng route.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Design role salary bands — what the qualification stack actually returns"
            plainEnglish="The design-route salary ladder in 2024-25 UK: Junior Design Engineer (post-HNC, 1-2 years experience) £32-42k; Design Engineer (3-5 years, EngTech or IEng) £42-58k; Senior Design Engineer (5-10 years, IEng) £58-78k; Principal/Lead Design Engineer (10+ years, CEng) £78-110k+; Design Director (15+ years, CEng plus management) £100-160k+. London-based design roles add £8-15k London weighting. Specialist niches (data centres, healthcare, pharmaceutical, defence) command additional premium."
            onSite="The design ladder pays well above the Electrician install ladder past the 5-year mark. The trade-off: design work is office-based, requires sustained CPD on regs and software (AutoCAD/Revit MEP, ETAP, Amtech ProDesign, Trimble Stabicad), and the career success requires building a portfolio of completed projects rather than installs. Design careers are also harder to switch into mid-career — most designers come from either an apprenticeship + HNC route (entering design at year 4-5 post-AM2) or from a BEng graduate route. The earlier you decide, the easier the transition."
          >
            <p>
              UK design role salary ladder (2024-25 indicative):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Junior Design Engineer</strong> &mdash; &pound;32&ndash;42k, post-HNC, 1&ndash;2yr experience.
              </li>
              <li>
                <strong>Design Engineer</strong> &mdash; &pound;42&ndash;58k, 3&ndash;5yr, EngTech / IEng.
              </li>
              <li>
                <strong>Senior Design Engineer</strong> &mdash; &pound;58&ndash;78k, 5&ndash;10yr, IEng.
              </li>
              <li>
                <strong>Principal / Lead Design Engineer</strong> &mdash; &pound;78&ndash;110k, 10+yr, CEng.
              </li>
              <li>
                <strong>Design Director</strong> &mdash; &pound;100&ndash;160k+, 15+yr, CEng + management.
              </li>
              <li>
                <strong>London weighting</strong> &mdash; +&pound;8&ndash;15k typical.
              </li>
              <li>
                <strong>Specialist niches</strong> &mdash; +20&ndash;40% (data centres, healthcare, defence, pharma).
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Academic ladder: 2382 → 2391-52 → 2396 → HNC/HND or DipBSE → BEng. Each step opens design and engineering roles the previous didn't.",
              "C&G 2382 is the BS 7671 regs knowledge qualification — open-book exam, updated each major BS 7671 amendment.",
              "C&G 2396 (Design and Verification) is the practical inflection point — first qualification covering design from first principles. £1,500-2,500.",
              "IET DipBSE is a Level 4 building services engineering qualification — common stepping stone for site electricians moving toward design or IEng.",
              "Engineering Council registration: EngTech (technician, accessible to JIB Approved), IEng (incorporated, typically degree), CEng (chartered, typically master's-level).",
              "UK-SPEC is the competence framework — five areas (knowledge, design, leadership, communication, professional commitment). Free download at engc.org.uk.",
              "Professional review is interview-based assessment with two reviewers; preparation 20-40 hours organising portfolio against UK-SPEC.",
              "Registration correlates with salary (EngTech £35-45k, IEng £45-65k, CEng £65k+) and is often a job pre-requisite for senior technical and design roles.",
            ]}
          />

          <Quiz title="Design route — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section2-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.2 MCS standalone certifications
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section2-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.4 Specialised routes
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
