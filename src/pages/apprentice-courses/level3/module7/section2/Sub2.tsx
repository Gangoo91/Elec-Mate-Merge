/**
 * Module 7 · Section 2 · Subsection 2 — MCS standalone certifications
 * Maps to C&G 2365-03 / Unit 308 / LO2 / AC 2.5
 *   AC 2.5 — "Identify sources of information about career opportunities and progression
 *             routes in building services engineering"
 *
 * Microgeneration Certification Scheme (MCS) — what it is, the technology
 * categories (PV, Heat Pump, Solar Thermal, Battery Storage, EV), how an
 * electrician moves from standard installation work into MCS-registered
 * renewables installation, the qualifications behind each MCS endorsement,
 * the MCS process, and the economic case for adding renewables to your
 * trade portfolio.
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

const TITLE = 'MCS standalone certifications | Level 3 Module 7.2.2 | Elec-Mate';
const DESCRIPTION =
  'Microgeneration Certification Scheme (MCS) — PV, Heat Pump, Solar Thermal, Battery Storage, EV — qualifications, MCS registration process, and the economic case for adding renewables to your portfolio.';

const checks = [
  {
    id: 'mod7-s2-sub2-mcs-purpose',
    question: "What is MCS and what does it certify?",
    options: [
      "In writing, contemporaneously. Text or email to the supervisor; CC to a senior manager or H&S manager; copy retained. State what was asked, what you said, and the reason (regulation cited or risk identified). Time-stamped. The contemporaneous written record is the strongest evidence in any subsequent ERA s.44 claim or HSE prosecution.",
      "Carry out a more extensive visual survey to establish the installation arrangement (reverse engineering from observation), document the limitation on the report front sheet under Section D, agree the scope of inspection with the duty holder, and note \\\"no documentation available\\\" as a limitation against affected items on the schedule.",
      "MCS (Microgeneration Certification Scheme) is the UK quality assurance scheme for small-scale low-carbon energy technologies — solar PV, solar thermal, heat pumps, biomass, wind and battery storage. MCS certifies both the products (so consumers know they meet performance standards) and the installers (so consumers know the firm is competent and accountable). MCS registration is the gateway to most UK renewables grant schemes (BUS, ECO4, SEG).",
      "Minimum £5 million cover (most policies are written at £10m as standard). The certificate must be displayed at each place of business — historically a printed certificate on the wall; the 2008 amendment regulations allow electronic display provided employees can readily access it. Failure to insure is a criminal offence with daily-rate fines up to £2,500 for each day uninsured.",
    ],
    correctIndex: 2,
    explanation:
      "MCS is the consumer-facing quality scheme run by MCS Service Company. It's the practical entry condition for accessing UK Government renewables grants and incentive schemes — Boiler Upgrade Scheme (BUS) for heat pumps, Smart Export Guarantee (SEG) for PV export, ECO4 for fuel poverty grants. Without MCS registration installers can't access most of the grant-funded UK renewables market.",
  },
  {
    id: 'mod7-s2-sub2-pv-route',
    question:
      "What's the typical qualification route for an electrician moving into MCS-registered solar PV installation?",
    options: [
      "IQA Level 4 (Internal Quality Assurance) is the qualification for verifying assessment quality — you sample and second-mark other assessors' work to ensure consistency. Senior progression beyond TAQA L3. Typical course 5-10 days plus portfolio. Required for IQA roles at colleges and training providers, and for senior assessor positions. Can lead to EQA (External Quality Assurance) at L4 — the awarding body's own QA function.",
      "Technicians contribute by identifying recurring failure patterns, proposing improvements to maintenance procedures, feeding back accurate data through the CMMS, sharing knowledge with colleagues, suggesting energy-saving measures, and participating in root cause analysis following significant failures",
      "Standard route: existing Electrician JIB grade + AM2S (Solar PV variant of AM2) OR an MCS-recognised PV installer course (typically a 5-day course covering PV system design, installation, commissioning and the MCS install standard) + employer firm registers with MCS for PV. The individual electrician holds the PV competence; the firm holds the MCS registration. Some installers also pursue the BPEC Solar PV course.",
      "Workers making a \\\\\\\"qualifying disclosure\\\\\\\" — a disclosure of information that the worker reasonably believes shows malpractice, including criminal offences, breach of legal obligations, miscarriage of justice, danger to health and safety, environmental damage. Protects from detriment and dismissal.",
    ],
    correctIndex: 2,
    explanation:
      "Two routes converge: AM2S (the JIB practical PV add-on after AM2) plus the MCS-recognised installer training. AM2S earns the ECS PV endorsement. The firm then needs MCS registration for PV (separate process — MCS scheme membership, audit cycle, sample install inspection) to actually trade as MCS-registered. Individual competence + firm registration = ability to install MCS-certified PV systems.",
  },
  {
    id: 'mod7-s2-sub2-heat-pump',
    question:
      "What does a heat pump installer typically need that's different from a PV installer?",
    options: [
      "Pre-Construction Information is the H&S information that the Client (with help from the Principal Designer) provides to designers and contractors before they start on the project. It covers the site (location, existing structures, services, ground conditions), the project (description, programme, key dates, design assumptions), the relevant H&S information (asbestos surveys, condition reports, environmental risks) and the Client's H&S file from any previous works.",
      "D: \\\\\\\"Over the last two weeks, you have arrived 20-30 minutes late on four occasions.\\\\\\\" E: \\\\\\\"This means I start the prep work alone, which is frustrating and puts us behind schedule.\\\\\\\" S: \\\\\\\"I need you to arrive by the agreed start time, or let me know in advance if you will be delayed.\\\\\\\" C: \\\\\\\"If we start together, we will finish the prep in half the time and both have a smoother day.\\\\\\\"",
      "PPE Regs Reg 7 places a duty on the employer to maintain (and replace) PPE. The corresponding duty on the employee under Reg 10 is to use the PPE in accordance with training and to report any loss of, or obvious defect in, the PPE. Damaged PPE doesn't provide the rated protection — a cracked safety glass lens, a dust mask with a broken strap, a hi-vis with the reflective material peeling off — all need to be taken out of service and replaced before use.",
      "Heat pump installation combines refrigerant handling (F-Gas) with electrical install and water-system plumbing — so heat pump installers typically need: F-Gas certification (Cat 1 for the refrigerant work), plumbing knowledge (or work in a plumbing-paired team), AND electrical competence. MCS heat pump registration involves both the MCS scheme and (where applicable) F-Gas company registration. Many electrical-led heat pump installers partner with plumbers rather than self-cover plumbing.",
    ],
    correctIndex: 3,
    explanation:
      "Heat pump installation is multi-trade. Electricians can lead the install (it's electrically-driven) but the refrigerant work needs F-Gas Cat 1 certification (training course + assessment) and the water side typically needs a plumber. Many MCS heat pump installer firms pair an electrician with a plumber. F-Gas certification is required by EU/UK regulation for any work on fluorinated refrigerant gases.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's the Boiler Upgrade Scheme (BUS) and how does it relate to MCS?",
    options: [
      "Main earthing terminal notice (514.13.1), bonding-clamp notices on gas and water bonds (514.13.1), RCD test notice (in the 514 series), single-line diagram or circuit list inside the CU door (514.9.1), individual circuit identification on each MCB/RCBO, isolator labelling, and a warning notice for any additional or alternative supply (PV, battery, generator) where applicable.",
      "BUS is the UK Government grant scheme paying homeowners up to £7,500 toward installing a heat pump (or biomass boiler in some cases). To claim BUS the heat pump must be installed by an MCS-registered installer using MCS-certified products, with the MCS certificate then submitted to Ofgem. BUS is the dominant route into the heat pump market for installers — without MCS registration you can't access BUS-funded work.",
      "Because it informs the supervisor\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s framing — \\\"the consequence cascade isn\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t hypothetical; it\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s structured by the Sentencing Council guideline; here\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s roughly where this incident would land\\\". Plus director liability under s.37 + Sentencing Council means the L3\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s observations to senior management land with weight.",
      "Daily site diary, weekly time sheet, NVQ portfolio entries (evidence for the End-Point Assessment), off-the-job training log (apprenticeship standards), monthly apprentice review forms (you + employer + tutor), JIB grading entries where applicable, and any required H&S sign-on records (RAMS sign-on, toolbox talk attendance).",
    ],
    correctAnswer: 1,
    explanation:
      "BUS (Boiler Upgrade Scheme) is administered by Ofgem and pays homeowners £7,500 toward an air-source heat pump (and £7,500 toward a ground-source heat pump — both rates have applied since the October 2023 uplift). MCS-registered installation is mandatory for the grant. The grant pays the homeowner direct (typically against an installer invoice). For an installer this means MCS registration is the practical entry condition for taking on BUS work, which is the bulk of the heat pump market.",
  },
  {
    id: 2,
    question: "What does MCS registration cost a small electrical firm wanting to add PV?",
    options: [
      "CAT III 600 V minimum (CAT IV 600 V preferred). The DB is a fixed-installation distribution location, which is CAT III by definition. The Fluke 376FC is CAT IV 600 V / CAT III 1000 V — adequate. The Megger DCM340 is CAT IV 300 V / CAT III 600 V — adequate for 230/400 V three-phase. Cheap clamp meters with only CAT II rating are not safe at this location — they can fail catastrophically on a transient. Always check the CAT rating before using a borrowed or new clamp meter at a DB.",
      "When the worker may be exposed to a risk to their health or safety while at work, EXCEPT where and to the extent that the risk has been or will be adequately controlled by other means which are equally or more effective. The 2022 amendment also extended the duty to cover limb (b) workers (some categories of casual / gig workers) as well as employees.",
      "First-year MCS registration cost typically £600-1,000 application fee plus the Quality Management System certification (often via NICEIC or NAPIT MCS umbrella) at £400-700. Annual ongoing MCS fees similar. Plus the underlying PV training (AM2S or equivalent, £400-600) and potentially MCS-recognised installer course (£500-1,000). Total first-year investment for a sole trader entering PV is roughly £2,000-3,500.",
      "Coaching focuses on individual development (asking \\\\\\\"what do you want to become?\\\\\\\" and helping bridge the gap through challenging assignments and feedback), while affiliative focuses on team harmony and emotional bonds (asking \\\\\\\"how is everyone feeling?\\\\\\\" and strengthening connections). Coaching is most appropriate for developing potential; affiliative is most appropriate for healing rifts or building morale",
    ],
    correctAnswer: 2,
    explanation:
      "MCS membership is meaningful business cost — but the heat pump and PV markets are large and grant-funded, so the payback is usually fast. A single PV install can carry £8,000-15,000 of revenue; a heat pump install £15,000-25,000. MCS registration pays back in a handful of jobs. For firms already in domestic electrical, adding PV or heat pump as a complementary service is often a strong commercial move.",
  },
  {
    id: 3,
    question: "What's the Smart Export Guarantee (SEG)?",
    options: [
      "C&G 2382 is the BS 7671 Wiring Regulations qualification — open-book exam testing knowledge of the current edition. Each major edition triggers a new 2382 variant: 2382-15 was 17th Edition; 2382-18 was 17th Edition + A3; 2382-22 is 18th Edition; 2382-26 will cover A4:2026. Holding the latest 2382 is the standard CPD evidence for keeping current with BS 7671.",
      "A Request For Information is a formal written query from a contractor to the design team (architect, engineer, principal designer) when the drawings or specifications are unclear, contradictory or missing detail. It's logged, numbered, dated and tracked through to a written response. It protects the contractor from being held responsible for a design ambiguity and creates a paper trail for any later dispute. Use one whenever you'd otherwise be guessing.",
      "Toolbox talks are short, focused, structured verbal briefings to workers on a specific safety topic — typically a hazard relevant to that day or that week. They're documented (sign-on sheet) so the employer can demonstrate they've discharged the MHSWR Reg 10 duty to provide comprehensible information. The format works because it's short, in person, with the chance to ask questions — the opposite of a long written document nobody reads.",
      "SEG is the UK regulatory scheme requiring large electricity suppliers to pay solar PV exporters for surplus electricity exported to the grid (replacing the closed Feed-in Tariff). To register a PV system for SEG the install must be MCS-certified — so the homeowner needs an MCS-registered installer. Tariff rates vary by supplier (typically 4-15p/kWh in 2024).",
    ],
    correctAnswer: 3,
    explanation:
      "SEG replaced the older Feed-in Tariff (FIT), which closed to new applicants in 2019. SEG is supplier-driven (each supplier sets their own rate, regulated by Ofgem) rather than Government-fixed. MCS certification of the install is the gateway to SEG registration. For PV installers this means MCS isn't optional if your customers want to export surplus to the grid.",
  },
  {
    id: 4,
    question: "What's the relationship between MCS and HIES / RECC?",
    options: [
      "MCS handles the technical certification. HIES (Home Insulation and Energy Systems Contractors Scheme) and RECC (Renewable Energy Consumer Code) handle the consumer-protection side — installer-customer contracts, deposit protection, dispute resolution, complaints handling. MCS-registered installers must also be members of one of these consumer codes. They're complementary regulatory layers.",
      "Each operative working on the isolated circuit fits their own lock to the isolation point (or to a hasp / multi-lock if multiple operatives). Tag identifies the operative, the circuit, the date / time, and the work. Lock removed only by the operative who fitted it (and only when their work is complete and safe to re-energise).",
      "Because most electrical contractors are registered with a competent-person scheme (NICEIC, NAPIT, ELECSA, STROMA, Certsure) which self-certifies the work to the Local Authority. The Local Authority accepts the scheme certificate without separate inspection. Building Control would only physically inspect for non-scheme work or where there's a specific concern.",
      "Wide statutory powers under s.20 — enter premises at any reasonable time, take photographs / measurements, take samples, require any person to answer questions, require production of documents, take possession of articles. Plus the power under s.21/s.22 to issue improvement and prohibition notices on the spot. Refusing or obstructing an inspector is itself a criminal offence under s.33.",
    ],
    correctAnswer: 0,
    explanation:
      "MCS = technical quality. HIES / RECC = consumer protection. Both layers are required for MCS-registered installation. RECC is more common in renewables; HIES covers a wider range of energy efficiency installs. Membership in one of the codes is part of the MCS application package. Together they give the homeowner a complete protection envelope around a renewables purchase.",
  },
  {
    id: 5,
    question: "What's involved in an MCS sample install inspection?",
    options: [
      "Reg 510.3 — 'Every item of equipment shall be selected and erected so as to allow compliance with the regulations stated in this chapter and the relevant regulations in other parts of BS 7671 and shall take account of manufacturers' instructions.' Selection AND erection. The 'take account of manufacturers' instructions' clause is what makes the data sheet effectively part of the standard.",
      "MCS audits the firm's competence by inspecting a sample install during the application or annual reaccreditation. An MCS-approved auditor visits a recently completed install, checks against the MCS install standard (MIS 3002 for PV, MIS 3005 for heat pumps, etc.), reviews the design calculations, the certificate pack, and the quality of physical install. Pass = registration confirmed; fail = remediation required.",
      "Address the 3 Ps first (the failures are specific and temporary, not permanent or pervasive), then restore intrinsic motivation: give the team autonomy in developing their own quality-check process (Pink), provide clear goals and feedback loops for each installation (flow conditions), and ensure the purpose of quality work is connected to genuine values (safety, professionalism). This multi-framework approach addresses both the setback response and the ongoing motivation system",
      "Digital and durable — typically PDF for the drawings and schedules, native files (DWG, RVT, IFC) where the building owner has compatible software, and a structured index. Hard-copy printout if the building owner needs one. On HRRBs, format must support the BSA 2022 golden thread requirements (accessible, structured, digital).",
    ],
    correctAnswer: 1,
    explanation:
      "Sample inspection is the substance behind MCS registration. The MCS Installation Standards (MIS series) are detailed technical standards — MIS 3002 for PV, MIS 3005 for heat pumps, MIS 3001 for solar thermal, etc. Auditor checks both design quality and installation quality. Treat the audit visit as a serious compliance event — most fails are remediable but they delay registration.",
  },
  {
    id: 6,
    question: "What's MCS battery storage certification?",
    options: [
      "Sample sufficiently to give a representative picture of the installation condition; expand the sample if defects are found at higher than expected rates; record the sampling rate and any expansion on the report; agree the sampling approach with the customer in writing in advance.",
      "'Building Management System' — the central control system that orchestrates a building's heating, ventilation, lighting, security and energy use. BMS work is one of the fastest-growing specialisms in building services because every modern commercial building has one. Electricians who learn BMS programming and commissioning (often via Trend, Tridium, Siemens or Schneider training) are in high demand and can move into BMS specialist roles paying significantly above standard electrician rates.",
      "MCS now covers battery storage as a separate technology category (alongside PV, solar thermal, heat pumps, biomass, wind). Battery installation typically pairs with PV (combined PV+battery system) or as a standalone retrofit. MCS battery certification follows MIS 3012 install standard and requires installer competence in DC battery systems, BMS commissioning, and grid-tie inverter integration.",
      "Can tell you: polarity and connection state of a 13A socket — correct, reversed polarity, missing earth, missing neutral. Some advanced models add EFLI and basic RCD trip indication. Cannot tell you: actual values of EFLI / IR / continuity (limited accuracy vs MFT), shared-neutral conditions, high-resistance joints below threshold, intermittent faults. Socket testers are first-look tools; the MFT gives the numbers for the certificate.",
    ],
    correctAnswer: 2,
    explanation:
      "Battery storage is a fast-growing UK market. MCS introduced battery certification to give the same quality assurance framework as PV. Most PV installers now offer combined PV+battery systems; some specialise in battery retrofit to existing PV. Battery work is electrically demanding (DC systems, isolation, fault current containment) and is increasingly seen as a specialism within PV.",
  },
  {
    id: 7,
    question: "Can a sole trader be MCS-registered?",
    options: [
      "Collaborate when the issue is important to both parties and there is time to find a solution that fully meets both needs (e.g., designing a shared services route). Compromise when time is limited and a \\\\\\\"good enough\\\\\\\" solution is acceptable to both parties (e.g., sharing a limited workspace). The key difference is that collaboration seeks to expand the pie while compromise divides it",
      "Servant leadership embodies advanced EI: it requires empathy (understanding team needs), self-regulation (managing ego and the desire to command), motivation (finding purpose in developing others), and social skills (creating environments where people thrive) — the leader's primary role is to remove obstacles and enable their team's success",
      "Unlimited fine, and / or up to 2 years' imprisonment. The Sentencing Council Definitive Guideline for Health and Safety Offences sets the tariff using a culpability-and-harm matrix — even medium-culpability mid-harm cases against an individual can attract a custodial sentence, particularly where someone has been seriously injured or killed. Companies face fines that scale with turnover; individuals face fines + prison.",
      "Yes — sole traders can register with MCS the same as Ltd companies. The registration is at firm level, not individual level, but a sole trader is a firm of one. The QS (technical lead) for the MCS registration is normally the sole trader themselves, who must hold the relevant technical competence (AM2S for PV, F-Gas Cat 1 for heat pump, etc.). Many sole-trader electricians use MCS as the route into a niche renewables specialism.",
    ],
    correctAnswer: 3,
    explanation:
      "MCS is open to sole traders, partnerships and Ltd companies. The structural requirement is a named technical lead with the relevant qualifications and at least one example install for the audit. Sole traders entering PV typically pair MCS PV registration with their existing CPS Part P registration to cover both the renewables side and the consumer-unit/distribution side of the install.",
  },
  {
    id: 8,
    question: "What's the BPEC Solar PV course and how does it differ from AM2S?",
    options: [
      "BPEC (British Plumbing Employers Council, now expanded to other trades) runs an MCS-recognised Solar PV installer course typically delivered as a 4-5 day classroom + practical course covering PV system design, installation, MCS standards and commissioning. AM2S is the JIB practical assessment route — assumes prior PV training and tests practical competence. Both routes earn the ECS PV endorsement; BPEC is more course-based, AM2S is more assessment-based.",
      "The MCS certificate, accompanied by the G98 (or G99) DNO notification copy. The customer applies to a Smart Export Guarantee licensee (typically a major electricity supplier) and uploads both. Without the MCS certificate the supplier will not register the customer for export payments. The smart export meter (the customer's existing smart meter, usually) provides the half-hourly export data that the tariff is paid against.",
      "Design Engineer (M&E Consultant or sub-contractor design team), Senior Project Engineer, and Chartered Engineer roles. The degree-level qualification gives the design knowledge (load calcs, voltage drop, discrimination, protection coordination) and the management knowledge needed for the more senior roles. Many apprentices add an HNC or HND part-time once they've passed AM2 to open these routes.",
      "AFDDs offered per Reg 421.1.7 advisory wording. Customer accepted on bedroom socket ring, lounge socket ring and kitchen socket ring (engineering benefit strongest on socket circuits with mixed appliance use and aged flex). Customer declined on dedicated single-load circuits (shower, EV, heat pump) and lighting (LED on fixed wiring, no flex). Documented in the design pack.",
    ],
    correctAnswer: 0,
    explanation:
      "Two different routes to similar competence. BPEC's PV course is a typical 'training first, assessment second' format. AM2S is more of a 'demonstrate competence' practical assessment. Many electricians moving into PV take a BPEC-style course for the underlying training and then sit AM2S for the JIB practical recognition. The end-state (ECS PV endorsement plus MCS-registered firm) is the same.",
  },
];

const faqs = [
  {
    question: "Is MCS only for solar and heat pumps, or wider?",
    answer:
      "MCS covers the small-scale renewables landscape: solar PV, solar thermal, heat pumps (air-source, ground-source, water-source), biomass, small wind, hydro, and battery storage. Each technology has its own MCS Installation Standard (MIS series). For UK electrical apprentices the most relevant categories are typically PV, battery, EV charging (covered separately under OZEV), and heat pumps if the firm has plumbing partnership.",
  },
  {
    question: "Do I need MCS to install EV chargers?",
    answer:
      "EV charging is handled separately by OZEV (Office for Zero Emission Vehicles) under the EV Chargepoint Grant scheme — not MCS. To access OZEV grants installers must be OZEV-authorised, which requires manufacturer-specific training plus electrical competence. Sub 4.3 covers EV training routes in more detail. MCS doesn't cover EV currently.",
  },
  {
    question: "Can I install non-MCS PV without MCS registration?",
    answer:
      "Technically yes — a competent electrician can design and install a PV system without MCS. But the customer can't claim SEG, can't claim BUS-style grants for related tech, can't easily insure the system against PV-specific risks, and faces resistance from DNOs in connection. So in practice almost all UK PV is MCS-installed. Non-MCS PV exists mostly for off-grid systems where grid export and grants don't apply.",
  },
  {
    question: "What's MIS 3002?",
    answer:
      "MCS Installation Standard 3002 — the technical standard for solar PV installation. It covers system design (sizing, shading, orientation, structural fixing), electrical installation (DC and AC sides, isolation, earthing, RCD), commissioning, documentation, and handover. MIS 3002 is the technical basis of the MCS PV install audit. Free to download from mcscertified.com. Read it before sitting AM2S.",
  },
  {
    question: "Are MCS audits annual?",
    answer:
      "MCS does annual reaccreditation visits typically including a sample install inspection. Reaccreditation also reviews QMS (Quality Management System) documentation, insurance, qualifications and customer feedback. Cost included in annual MCS fees. Treat annual reaccreditation as a serious compliance event — MCS withdrawal would lock the firm out of grant-funded markets.",
  },
  {
    question: "How does MCS link to net-zero policy?",
    answer:
      "MCS is the technical infrastructure that makes UK net-zero domestic decarbonisation policy actually deliverable. BUS (heat pumps), SEG (PV export), ECO4 (fuel poverty energy efficiency) all depend on MCS-certified installers and products. As UK policy continues to expand grant funding for domestic decarbonisation, MCS-registered installers are the route to that funding. Strategic CPD direction for many electrical firms.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 7 · Section 2 · Subsection 2"
            title="MCS standalone certifications"
            description="Microgeneration Certification Scheme (MCS) — PV, Heat Pump, Solar Thermal, Battery Storage — qualifications, registration process, and the economic case for adding renewables to your portfolio."
            tone="emerald"
          />

          <TLDR
            points={[
              "MCS (Microgeneration Certification Scheme) is the UK quality assurance scheme for small-scale low-carbon technologies. Gateway to most UK renewables grants (BUS, SEG, ECO4).",
              "Technology categories: PV, solar thermal, heat pumps, biomass, small wind, hydro, battery storage. Each has its own MCS Install Standard (MIS series).",
              "PV route: AM2S or BPEC PV course → ECS PV endorsement → firm registers with MCS for PV. First-year cost £2,000-3,500 for sole trader.",
              "Heat pump route: F-Gas Cat 1 + plumbing partnership + heat pump training → MCS heat pump registration. Larger investment; BUS grant of £7,500 per install drives strong demand.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO2 / AC 2.5 — identify sources of information about progression routes in building services engineering, including renewable energy specialisms.",
              "State what MCS is and the technology categories it covers.",
              "Identify the qualification route for an electrician moving into MCS-registered PV installation.",
              "Identify the additional requirements for MCS-registered heat pump installation (F-Gas, plumbing partnership).",
              "Explain the economic case for MCS registration via the link to UK Government grant schemes (BUS, SEG, ECO4).",
              "Identify the MCS Installation Standards (MIS) and the audit cycle.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What MCS is and what it does</ContentEyebrow>

          <ConceptBlock
            title="MCS — the UK renewables quality scheme"
            plainEnglish="MCS (Microgeneration Certification Scheme) is the UK consumer-facing quality assurance scheme for small-scale low-carbon technologies. It certifies both the products (so a homeowner knows the panels or heat pump meet performance standards) and the installers (so the homeowner knows the firm is competent, accountable and audited). MCS registration is the practical entry condition for accessing most UK renewables grant schemes."
            onSite="As an apprentice you'll see MCS most often on PV and heat pump quotes. Each install gets an MCS certificate — a document that proves the install was MCS-compliant and is the customer's evidence for grant claims, supplier SEG registration and insurance. The MCS certificate is a meaningful piece of paperwork that follows the system through its lifetime."
          >
            <p>
              MCS technology categories:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Solar PV (MIS 3002).</li>
              <li>Solar Thermal (MIS 3001).</li>
              <li>Heat Pumps — air-source, ground-source, water-source (MIS 3005).</li>
              <li>Biomass (MIS 3004).</li>
              <li>Small Wind (MIS 3003).</li>
              <li>Hydro.</li>
              <li>Battery Storage (MIS 3012).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The grant economics — why MCS matters commercially"
            plainEnglish="MCS registration is the gateway to UK Government renewables grant funding. BUS (Boiler Upgrade Scheme) pays £7,500 per air-source or ground-source heat pump install to the homeowner. SEG (Smart Export Guarantee) pays homeowners for PV export to grid (typically 4-15p/kWh). ECO4 funds fuel-poverty energy efficiency including PV and heat pumps. Without MCS, your customers can't access these grants — so they buy from MCS-registered competitors."
            onSite="The commercial case for MCS is overwhelming for any firm doing meaningful PV or heat pump work. A single heat pump install carries £15,000-25,000 of revenue and most are BUS-funded; without MCS you'd be locked out. PV installs are similar — most domestic PV customers want SEG, which needs MCS. MCS membership cost (£600-1,000/year for the firm) pays back in a single job."
          >
            <p>
              UK Government grant schemes that require MCS-registered installation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BUS (Boiler Upgrade Scheme)</strong> &mdash; &pound;7,500 per heat
                pump install. Administered by Ofgem.
              </li>
              <li>
                <strong>SEG (Smart Export Guarantee)</strong> &mdash; supplier payment for PV
                export to grid. Regulated by Ofgem.
              </li>
              <li>
                <strong>ECO4 (Energy Company Obligation 4)</strong> &mdash; large suppliers
                fund energy efficiency improvements including PV and heat pumps for
                fuel-poor households.
              </li>
              <li>
                <strong>Home Upgrade Grant (HUG)</strong> &mdash; localised energy efficiency
                grants delivered through Local Authorities.
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

          <ContentEyebrow>The PV route</ContentEyebrow>

          <ConceptBlock
            title="Becoming an MCS-registered PV installer — the qualification path"
            plainEnglish="For an electrician already holding the JIB Electrician grade, the standard route into MCS PV is: take AM2S (the JIB practical PV add-on) or a BPEC-style MCS-recognised PV installer course; earn the ECS PV endorsement; the firm then applies for MCS PV registration. The individual electrician holds the technical competence; the firm holds the MCS scheme registration. Both layers are required."
            onSite="AM2S is the JIB practical route — typically £400-600 for the assessment after a prep course or self-study. BPEC and similar provider courses are the 'training-first' route, typically £500-1,000 for a 4-5 day course covering MIS 3002 system design, installation and commissioning. Most installers do one of the two; some do both. The end-state (ECS endorsement + MCS firm registration) is the same."
          >
            <p>
              The PV route in steps:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Hold JIB Electrician grade (post-AM2).</li>
              <li>Read MIS 3002 (free download from mcscertified.com).</li>
              <li>Complete AM2S or an MCS-recognised PV course.</li>
              <li>Apply for ECS PV endorsement.</li>
              <li>Firm applies for MCS PV registration (QMS, insurance, sample install).</li>
              <li>MCS audit visit on a recent PV install.</li>
              <li>Registration confirmed; firm can now offer SEG-eligible PV installs.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The heat pump route</ContentEyebrow>

          <ConceptBlock
            title="Becoming an MCS-registered heat pump installer — multi-trade"
            plainEnglish="Heat pump installation is multi-trade: electrical install, refrigerant work and water-system plumbing all combine in one job. For an electrician moving into heat pumps the typical route is: F-Gas Cat 1 certification (training course + assessment, £400-700), heat pump installer training (typically 5-day course covering MIS 3005, system design, commissioning), plus pairing with a plumber if you don't hold plumbing competence. Firm then applies for MCS heat pump registration."
            onSite="Heat pump market is booming under BUS — £7,500 per install paid to homeowners drives strong demand. But heat pump install is harder than PV: larger system design (heat loss calculation, emitter sizing, cylinder integration), refrigerant handling regulation (F-Gas), and water-system competence. Many electrical-led firms partner with plumbers rather than self-cover plumbing. The investment is bigger but the per-install revenue is also bigger."
          >
            <p>
              The heat pump route in steps:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Hold JIB Electrician grade (post-AM2).</li>
              <li>F-Gas Cat 1 certification (refrigerant handling).</li>
              <li>Plumbing competence (in-house or partnership).</li>
              <li>Read MIS 3005 (heat pump install standard).</li>
              <li>Heat pump installer training (5-day MCS-recognised course).</li>
              <li>Heat loss calculation training (often combined with the install course).</li>
              <li>Firm applies for MCS heat pump registration.</li>
              <li>Audit visit on a recent install; registration confirmed.</li>
              <li>Apply for BUS-eligible installer status with Ofgem.</li>
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
            source="MCS Installation Standards (MIS series) (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The MCS Installation Standards set the technical requirements for each MCS
                  technology category. Each MIS document covers:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>System design and sizing.</li>
                  <li>Component selection and compatibility.</li>
                  <li>Installation requirements (electrical, mechanical, structural).</li>
                  <li>Commissioning procedures and acceptance testing.</li>
                  <li>Documentation and handover.</li>
                  <li>Quality records and certification.</li>
                </ul>
                <p className="mt-2">
                  MIS 3002 covers PV; MIS 3005 covers heat pumps; MIS 3001 covers solar
                  thermal; MIS 3012 covers battery storage.
                </p>
              </>
            }
            meaning={
              <>
                MIS standards are the technical anchor of the MCS scheme. They&apos;re free to
                download from mcscertified.com. Read the relevant MIS standard before your
                MCS application audit; assessors expect installers to know the standard
                they&apos;re registering against. The standards are revised periodically as
                technology and best practice move forward.
              </>
            }
            cite="Source: MCS Installation Standards (MIS series) — paraphrased from publicly-available standards at mcscertified.com."
          />

          <RegsCallout
            source="F-Gas Regulation (Regulation (EU) 517/2014, retained in UK law) (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The F-Gas Regulation (EU 517/2014, retained in UK law) requires that
                  anyone carrying out installation, servicing, maintenance, repair or
                  decommissioning of stationary refrigeration, air-conditioning or heat pump
                  equipment containing fluorinated gases must hold the relevant F-Gas
                  certification. Categories (Cat 1-4) reflect the type of work and refrigerant
                  charge size.
                </p>
                <p>
                  Heat pump installation typically requires Cat 1 (full installation and
                  recovery of refrigerant) or Cat 2 (limited installation work).
                </p>
              </>
            }
            meaning={
              <>
                F-Gas certification is a legal requirement for refrigerant work, not optional.
                Without F-Gas certification an electrician cannot work on the refrigerant
                circuit of a heat pump &mdash; even though the rest of the install is
                electrical and water-system work. Most heat pump installer firms have at
                least one F-Gas Cat 1-certified person; some pair an electrical lead with a
                refrigeration-trained partner.
              </>
            }
            cite="Source: F-Gas Regulation (EU) 517/2014, retained in UK law via the Fluorinated Greenhouse Gases Regulations 2015 (SI 2015/310) — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="Renewable Energy Consumer Code (RECC) — Code provisions (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  RECC sets consumer-protection standards for renewable energy installations:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Pre-contract information &mdash; clear quotation, system performance
                    estimates, finance options, warranties.
                  </li>
                  <li>
                    Deposit protection &mdash; consumer deposits protected by insurance or
                    third-party escrow.
                  </li>
                  <li>
                    Cooling-off period &mdash; 14 days under the Consumer Contracts
                    Regulations 2013.
                  </li>
                  <li>
                    Workmanship warranty &mdash; minimum 2-year warranty on installation.
                  </li>
                  <li>
                    Complaint handling &mdash; defined process with ADR escalation if
                    unresolved.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                MCS-registered installers must also be members of one of the consumer codes
                (RECC for renewables, HIES for wider energy efficiency). This adds the
                consumer-protection layer alongside the technical MCS quality layer. As an
                apprentice or sole trader entering MCS work, plan for both layers
                simultaneously &mdash; MCS application typically requires evidence of
                consumer-code membership.
              </>
            }
            cite="Source: Renewable Energy Consumer Code (RECC) — paraphrased from publicly-available RECC guidance at recc.org.uk."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Registering for MCS but not reading the MIS standard"
            whatHappens={
              <>
                Sole-trader electrician completes AM2S and BPEC PV course, applies for MCS PV
                registration. Assumes the training course covered everything they need to
                know. Doesn&apos;t read MIS 3002. MCS audit visit on a recent install &mdash;
                auditor finds design calculations don&apos;t evidence string voltage limits
                under cold conditions, doesn&apos;t evidence shading analysis, doesn&apos;t
                evidence structural load assessment to the MIS requirements. Registration
                deferred pending remediation. Several weeks of lost trading until reaudit.
              </>
            }
            doInstead={
              <>
                Read MIS 3002 (or the relevant MIS standard for your technology) cover-to-
                cover before sitting AM2S and before applying for MCS registration. The
                training course covers the basics; the MIS standard is the test of competence
                the auditor applies. Free download. A weekend of reading saves weeks of
                remediation.
              </>
            }
          />

          <Scenario
            title="You're a sole-trader electrician — should you add MCS PV to your offering?"
            situation={
              <>
                You&apos;ve been a sole-trader Approved Electrician for 3 years doing
                domestic electrical work. Customers increasingly ask about PV. You quote
                £6,000 PV installs through a partner MCS firm and earn a £600 introduction
                fee per job. You&apos;re considering becoming MCS-registered yourself to
                capture the full margin. First-year MCS investment is around £3,000 (training
                + registration + extra insurance). Is it worth it?
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; estimate realistic PV volume</strong>. How many PV
                jobs would you realistically do in year 1 if you were MCS-registered? 6
                jobs/year at &pound;6,000 each = &pound;36,000 revenue. Materials maybe 60%,
                so gross margin around &pound;14,000. Compared to current &pound;3,600 in
                introduction fees (6 &times; &pound;600), the uplift is around
                &pound;10,000 &mdash; covers the &pound;3,000 setup cost three times over in
                year 1.
                <br /><br />
                <strong>Step 2 &mdash; assess your time capacity</strong>. PV installs take
                1-3 days each (single-storey roof on a sunny day = 1 day; complex multi-
                pitch roof = 3 days). 6 jobs at avg 1.5 days = 9 days/year. Manageable
                alongside existing electrical work.
                <br /><br />
                <strong>Step 3 &mdash; assess seasonality and pipeline</strong>. PV demand
                spikes spring and summer. Heat pump demand spikes autumn and winter. Some
                installers add both for year-round flow; pure-PV firms have a quieter
                winter.
                <br /><br />
                <strong>Step 4 &mdash; check your insurance</strong>. PI insurance for design
                liability, PL extension to cover PV-specific risks (working at height,
                roof-mounted equipment, DC system fault current), tools-in-transit. Get
                quotes before committing.
                <br /><br />
                <strong>Step 5 &mdash; commit and set a 12-month review date</strong>. The
                economics look strong for a busy sole trader. Commit, register, set a
                12-month review date to assess actual revenue vs forecast. If volume is
                disappointing you can always defocus PV; if it&apos;s strong you can scale
                up.
              </>
            }
            whyItMatters={
              <>
                MCS PV is one of the strongest single business-development moves a domestic-
                focused electrician can make. The capex is modest, the per-install revenue is
                substantial, the demand is sustained by Government grant policy, and the
                technical content is accessible to any AM2-qualified electrician. Many
                successful sole-trader electrical firms have grown through adding MCS PV in
                year 3-5 of trading.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>The MCS revenue model and grant ecosystem</ContentEyebrow>

          <ConceptBlock
            title="The grant economy — BUS, SEG, ECO4, HUG and what each unlocks"
            plainEnglish="MCS registration is the regulatory gate to a substantial UK Government grant economy. Boiler Upgrade Scheme (BUS) gives £7,500 toward an MCS-installed heat pump in England and Wales. Smart Export Guarantee (SEG) pays PV system owners for exported energy at 5-15p/kWh depending on supplier. ECO4 funds fuel-poverty installations (heat pumps, insulation, controls) routed through registered installers. HUG (Home Upgrade Grant) funds whole-home retrofit through Local Authorities. None of these grants flow without MCS-certified installation by an MCS-registered contractor."
            onSite="The grant ecosystem is what makes MCS registration commercially viable for a small firm. A standard 4kW domestic PV install in 2024 sells at ~£6,500-8,500; the customer often unlocks SEG payments worth £100-300/year. A heat pump install at ~£12-15k is reduced to £4.5-7.5k for the customer with the BUS grant — making MCS firms competitive against gas boiler replacements for the first time. ECO4 jobs are typically delivered through tier-2 ECO obligated suppliers; the MCS firm sub-contracts. The grants are politically variable — keep an eye on the government's upcoming announcements via gov.uk."
          >
            <p>
              UK renewable grant streams (2024-25 indicative):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BUS (Boiler Upgrade Scheme)</strong> &mdash; &pound;7,500 per air-source heat pump (England, Wales).
              </li>
              <li>
                <strong>SEG (Smart Export Guarantee)</strong> &mdash; 5&ndash;15p/kWh paid to homeowners for exported PV.
              </li>
              <li>
                <strong>ECO4</strong> &mdash; obligated supplier scheme for fuel-poverty households; runs to 2026.
              </li>
              <li>
                <strong>HUG2 (Home Upgrade Grant)</strong> &mdash; LA-administered whole-home retrofit funding.
              </li>
              <li>
                <strong>OZEV EVHS / Workplace</strong> &mdash; up to &pound;350 per EV charger for landlords / SMEs.
              </li>
              <li>
                <strong>Scotland Home Energy Grant</strong> &mdash; equivalent in Scotland.
              </li>
              <li>
                <strong>Welsh Government Nest</strong> &mdash; equivalent in Wales.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="MCS scheme cost stack — first year, steady state, audit cycle"
            plainEnglish="MCS registration is administered through one of several certification bodies (NICEIC, NAPIT, MCS Certified, OFTEC for some streams). First-year costs typically run £1,000-1,500 (application + first audit + first annual sub) plus the technology-specific qualification cost (£700-1,500 per stream — PV, EV, Heat Pump). Steady-state annual cost is £500-900 per stream plus the audit day rate (£400-600). Each technology stream is registered separately — a firm doing PV, EV and Heat Pump pays three sets of stream-fees but typically gets a bundled audit day."
            onSite="Build the MCS economic model carefully before signing up. Each stream you add adds annual cost. The break-even is roughly: £1,500 setup + £700/year ongoing per stream divided by ~£300 average gross margin per install = ~7-8 installs in year 1 to break even, then ~3-4/year to maintain. Most MCS firms are in the 10-30 installs/year band per stream, comfortably profitable. Below 5 installs/year per stream, the scheme is loss-making — drop it or scale it. The audit is the real test of the firm's standards (not just paperwork)."
          >
            <p>
              MCS cost model per stream:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Year 1 setup</strong> &mdash; ~&pound;1,000&ndash;1,500 (application + first audit + first annual sub).
              </li>
              <li>
                <strong>Steady-state annual sub</strong> &mdash; ~&pound;500&ndash;900 per stream.
              </li>
              <li>
                <strong>Audit day rate</strong> &mdash; ~&pound;400&ndash;600 (typically annual).
              </li>
              <li>
                <strong>Technology qualification</strong> &mdash; ~&pound;700&ndash;1,500 per stream (BPEC PV, BPEC EV, LCL HP, etc).
              </li>
              <li>
                <strong>Sample install audit</strong> &mdash; ~1&ndash;2 installs/year inspected by assessor.
              </li>
              <li>
                <strong>Break-even</strong> &mdash; ~7&ndash;8 installs in year 1, ~3&ndash;4/year thereafter.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Stacking streams — why most successful MCS firms hold PV + EV + Battery + HP"
            plainEnglish="Single-stream MCS firms (PV-only or HP-only) miss the cross-sell opportunity. A PV install lead frequently converts into a battery storage add-on (~£4-7k extra revenue, similar margin %), an EV charger install (~£800-1,500 extra), or a heat pump system (~£12-15k extra revenue). Stacking the streams means one customer enquiry can return £20k+ of installs across three or four technologies. The most profitable MCS firms in 2024-25 are integrated low-carbon installers carrying PV, Battery, EV and Heat Pump simultaneously — selling 'whole-home electrification' rather than a single product."
            onSite="If you're building toward an MCS firm, plan the stream-stack as a roadmap. Year 1: PV (lowest entry, highest demand). Year 2: add Battery (natural cross-sell from PV). Year 3: add EV (high install volume, easy to bolt on). Year 4: consider Heat Pump (highest revenue per install but specialist plumbing/heating skills required, often co-delivered with a heating engineer). Each stream takes a qualification, a scheme registration and an audit slot — but the cross-sell economics make the cumulative business much more resilient than any single-stream operation."
          >
            <p>
              MCS stream-stack economics (per converted enquiry):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PV only</strong> &mdash; ~&pound;6,500&ndash;8,500 install, ~15&ndash;20% gross margin.
              </li>
              <li>
                <strong>PV + Battery</strong> &mdash; ~&pound;11&ndash;15k combined, similar margin %.
              </li>
              <li>
                <strong>PV + Battery + EV</strong> &mdash; ~&pound;13&ndash;17k combined.
              </li>
              <li>
                <strong>Whole-home (PV + Battery + EV + HP)</strong> &mdash; ~&pound;25&ndash;35k combined.
              </li>
              <li>
                <strong>Cross-sell rate</strong> &mdash; PV-to-Battery typically 30&ndash;50%; PV-to-EV 20&ndash;35% (after grants stripped).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="MCS audit failure — what triggers it and how to recover"
            plainEnglish="MCS audits can result in non-conformities (NCs) that require corrective action within a fixed window. Common audit failures: incomplete handover documentation (missing commissioning certificates, no system manual delivered), poor system performance (PV undersized for roof aspect, heat pump COP below MIS minimum), customer complaint history not addressed, certificate quality issues (missing test results, wrong template). Major NCs can suspend the scheme registration; minor NCs require corrective action plans. Multiple NCs across consecutive audits can lead to scheme termination — and termination is reportable to other schemes."
            onSite="Treat the MCS audit as the year's most important compliance moment. Pre-prep: review the past 12 months of certificates against the MIS standard, check every installation against the design spec, address any open customer complaints, calibrate test equipment, file the CPD record. Audits typically take 4-6 hours covering paperwork, equipment, sample install visit, customer phone-back. Audit failure costs reputation more than money — your scheme certification body shares non-conformity data, and BUS / SEG suppliers may suspend grant approvals if your scheme suspends you. Quality at first install is far cheaper than rework after audit failure."
          >
            <p>
              Common MCS audit failure patterns and prevention:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Missing handover documentation</strong> &mdash; system manual, commissioning certs, customer education record.
              </li>
              <li>
                <strong>Performance shortfall</strong> &mdash; PV system output below design estimate; HP COP below MIS minimum.
              </li>
              <li>
                <strong>Calibration lapse</strong> &mdash; test instruments out of calibration cycle.
              </li>
              <li>
                <strong>Certificate template errors</strong> &mdash; wrong scheme logo, missing test results, mis-completed pages.
              </li>
              <li>
                <strong>Unresolved complaints</strong> &mdash; customer issues not closed out within scheme timeframe.
              </li>
              <li>
                <strong>CPD shortfall</strong> &mdash; QS or Designate Operative without current technology updates.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "MCS is the UK quality scheme for small-scale renewables — PV, solar thermal, heat pumps, biomass, wind, hydro, battery storage. Each technology has its own MCS Installation Standard (MIS).",
              "MCS registration is the gateway to UK Government grant schemes — BUS (£7,500 per heat pump), SEG (PV export payment), ECO4 (fuel poverty), HUG (Local Authority).",
              "PV route: AM2S or BPEC PV course → ECS PV endorsement → firm registers with MCS. First-year cost £2,000-3,500 for sole trader; payback in a single job.",
              "Heat pump route: F-Gas Cat 1 + plumbing partnership + heat pump training → MCS heat pump registration. Bigger investment; £7,500 per install BUS grant drives strong demand.",
              "Battery storage now a separate MCS category (MIS 3012) — typically combined with PV (PV+battery) or as standalone retrofit.",
              "MCS-registered installers must also be members of a consumer code (RECC for renewables, HIES for wider energy efficiency).",
              "MCS audit cycle: annual reaccreditation including sample install inspection. Treat as serious compliance event.",
              "Read the relevant MIS standard cover-to-cover before sitting AM2S and applying for MCS — it's the test of competence the auditor applies.",
            ]}
          />

          <Quiz title="MCS standalone certifications — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section2-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.1 Post-AM2 Inspection &amp; Testing
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section2-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.3 Design route — 2382, DipBSE, EngTech
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
