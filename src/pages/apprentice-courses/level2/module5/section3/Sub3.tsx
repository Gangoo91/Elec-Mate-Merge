/**
 * Module 5 · Section 3 · Sub 3 — COSHH data sheets
 * Synthesis Sub — extends LO2 / AC 2.2 (purpose of workplace information).
 * Not directly mapped to a single 210 AC. COSHH awareness is a Level 2
 * skill; full COSHH assessment is a supervisor / employer competency.
 *
 * Frame: COSHH 2002 framework → SDS (Safety Data Sheet) 16-section format
 * under CLP Regulation EU 1272/2008 → common electrical-trade chemicals
 * → where to find SDS → pre-task review.
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
  'COSHH data sheets — finding, reading, applying | Level 2 Module 5.3.3 | Elec-Mate';
const DESCRIPTION =
  'COSHH 2002, the SDS 16-section format, and the chemicals an electrician actually meets — cable lubricant, contact cleaner, masonry sealant, brick acid. Pre-task review, not after-spill review.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s3-sub3-pretask',
    question:
      "You're about to start chasing brick on a domestic refurb. Your second-year hands you a tin of masonry sealant and a tube of two-pack epoxy. Neither has been on site before today and you haven't seen the SDS for either. What's the right order of events?",
    options: [
      "Stop, locate the SDS for both products (manufacturer website, the firm's COSHH register, or in the product packaging), read at least Section 2 (hazards), Section 4 (first aid) and Section 8 (exposure controls / PPE). Confirm you have the right PPE for both products. Only then start. COSHH 2002 Reg 6 requires the assessment to happen BEFORE exposure, not after.",
      "Treat every fire alarm as real until proven otherwise. Stop work, leave tools where they are, ensure the customer evacuates with you, walk the planned escape route to the muster point, and await account-for. Re-entry only when the fire-marshal / building manager declares the all-clear. Tools and van keys can be retrieved later; the alarm response cannot be re-done.",
      "Start the work — both products are common building materials you've handled before, so a fresh assessment isn't needed. If you have any reaction during use, stop and look up the SDS at that point; reading every data sheet before you start is good practice but not a legal requirement under COSHH for products already on site.",
      "Roughly £400-800/year for the basic stack: PL £5-10m (£200-500), Tools-in-Transit (£100-300), van insurance (commercial separately, typically £600-1,200/year for a small van). Add EL if you have an apprentice (£200-600). Add PI if you do any design work (£200-500). Total annual insurance bill for a sole trader with apprentice and design work: roughly £1,500-2,500.",
    ],
    correctIndex: 0,
    explanation:
      "COSHH 2002 Reg 6 requires a 'suitable and sufficient' assessment of risks from any hazardous substance BEFORE the work starts. The SDS is the manufacturer's authoritative information for the assessment. Reading sections 2, 4 and 8 takes a couple of minutes and is the absolute minimum before handling. 'I've used similar before' isn't an assessment — different products have different concentrations, different solvents and different first-aid responses.",
  },
  {
    id: 'mod5-s3-sub3-spill',
    question:
      "You've spilled brick acid on the back of your hand during chasing. The bottle is the strong masonry-cleaning grade. Your colleague asks 'what does the SDS say?'. Which section do you go to FIRST?",
    options: [
      "No — Reg 701.415.2 allows supplementary bonding to be omitted when all three conditions are met (ADS compliance, all final circuits in the location have 30 mA RCD additional protection, main bonding on extraneous-conductive-parts is in place per Reg 411.3.1.2). Modern fully-RCD-protected new-builds typically meet all three.",
      "Check the light curtain alignment, clean the lenses, inspect for environmental contaminants (dust, coolant mist), verify the safety relay status, check wiring connections, review the maintenance history for recurring issues, and ensure the safety distance calculation is still valid",
      "Section 4 — First aid measures. The SDS section 4 will tell you the immediate first aid response (typically: irrigate copiously with running water for at least 15 minutes, remove contaminated clothing, seek medical advice if irritation persists or if the skin is broken). The other sections matter but the response time on a corrosive spill is measured in seconds — Section 4 is the one you need first.",
      "Local Authority — Environmental Health Officers from the local council. The Health and Safety (Enforcing Authority) Regulations 1998 split enforcement based on the main activity of the premises. Retail (shops, offices, hotels, restaurants, leisure) goes to the Local Authority. Higher-risk premises (factories, construction sites, hospitals, schools, mines) go to the HSE.",
    ],
    correctIndex: 2,
    explanation:
      "The 16 sections of an SDS are in a fixed sequence under the CLP Regulation. Section 4 (First aid) is at the front for a reason — when there's an exposure incident it's the section you need first. By year three you should know the section numbers off the top of your head: Section 2 hazards, Section 4 first aid, Section 8 PPE, Section 13 disposal. The structure means any SDS in the world has the same information in the same place.",
  },
  {
    id: 'mod5-s3-sub3-where',
    question:
      "You arrive at a job and need the SDS for the contact cleaner already on the van. Where are the THREE most reliable places to find it?",
    options: [
      "Around 1.2 Nm for the circuit terminals, around 3.5 Nm for the incomers (verify against the specific data sheet — values vary by product line and update cycle). Hager publishes the torques inside the CU lid, in the data sheet, and in the Hager Pro app. Wylex and Schneider have similar values for equivalent products.",
      "£5 million per claim. The Act requires every UK employer (with limited specific exceptions) to hold an EL policy for at least £5m. Most policies offer £10m or more by default. The certificate must be displayed at the workplace where employees can see it. Failure to hold cover = fine up to £2,500 per day; failure to display = £1,000 fine.",
      "Without delay — telephone notification expected before the F2508 follows. F2508 within 10 days. The 'specified injury' list (Schedule 1) includes fractures (excl fingers/thumbs/toes), amputations, sight loss, crush injuries, serious burns, scalpings, head-injury unconsciousness, enclosed-space injuries.",
      "Manufacturer's website (search the product name), the firm's COSHH register (paper folder or app such as Sypol / Alcumus), and the packaging insert that came with the product. Many manufacturers also publish QR codes on the can that link directly to the latest SDS.",
    ],
    correctIndex: 3,
    explanation:
      "The SDS is a controlled document maintained by the manufacturer and updated when classifications change. The authoritative copies are the manufacturer's website (always the latest version), the firm's COSHH register where current SDSs are filed for the substances in use, and the packaging insert at the time of purchase. Trade WhatsApp screenshots are not authoritative and may be out of date.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: "What does COSHH stand for and what does the regulation cover?",
    options: [
      "The apprenticeship contract (a formal indenture under the Apprenticeships, Skills, Children and Learning Act 2009), the wages, the off-the-job training declaration (a minimum 20% of paid working hours under the Apprenticeship Standard), the provision of suitable work and supervision, and HASAWA s.2 duties to provide a safe place of work and adequate training.",
      "Control Of Substances Hazardous to Health — the 2002 regulations cover the assessment, prevention or control of exposure to hazardous substances at work. Includes chemicals, fumes, dusts, mists, vapours, biological agents and gases. Asbestos and lead have their own separate regulations.",
      "Check the VSD fault log for diagnostic codes, assess the motor insulation resistance and phase balance, inspect the mechanical load, review recent changes or maintenance, and apply root cause analysis before implementing a permanent fix",
      "Capability to handle the 10/350 microsecond impulse waveform — partial direct-lightning current. Required at the installation origin where the building has an external lightning protection system (LPS) per BS EN 62305-3 or where direct-strike risk to the supply exists. Higher Iimp rating, higher Up than Type 2 / 3.",
    ],
    correctAnswer: 1,
    explanation:
      "COSHH 2002 (the Control of Substances Hazardous to Health Regulations 2002) is the headline UK statutory framework for chemical and biological agent exposure at work. It covers identification, assessment, prevention or control, monitoring and health surveillance. Substances with their own dedicated regimes (asbestos, lead, ionising radiation) are excluded from COSHH and covered separately.",
  },
  {
    id: 2,
    question: "What is an SDS and what statutory framework requires it?",
    options: [
      "Section 8 — Exposure controls / personal protection. This section gives the workplace exposure limits (where applicable), the engineering controls (ventilation, containment) and the recommended PPE (gloves to a specific EN standard, eye protection, respiratory protection, body protection). It's the section you read before the work starts to confirm you have the right kit.",
      "An ASHP extracts heat from the ambient air using an external evaporator coil, while a GSHP extracts heat from the ground via buried pipe loops (horizontal trenches or vertical boreholes) — ASHPs are cheaper to install but have lower COP in cold weather",
      "Safety Data Sheet — a 16-section document required for all hazardous substances by the CLP Regulation (EU 1272/2008, retained as UK law after Brexit). The SDS is the manufacturer's authoritative source of hazard, handling, exposure and first-aid information for the product. Required by COSHH 2002 Reg 12 to be available to anyone handling the substance.",
      "Battery platforms are not interchangeable — Milwaukee M18 batteries don't fit Makita LXT tools and vice versa. If the firm runs Milwaukee, that's the platform whose chargers and spare packs are on every van and in every site box. A loose Makita drill is an outlier — one tool with no spare batteries when you need them, and no compatible charger nearby. Either ask for the matching Milwaukee tool, or accept you're working with one battery on the clock.",
    ],
    correctAnswer: 2,
    explanation:
      "The SDS format is fixed by the CLP Regulation. The 16 sections cover identification, hazards, composition, first aid, firefighting, accidental release, handling and storage, exposure controls and PPE, physical and chemical properties, stability, toxicology, ecology, disposal, transport, regulatory information and other information. The format means every SDS in the world follows the same structure.",
  },
  {
    id: 3,
    question:
      "Which SDS section gives you the manufacturer's recommended PPE for handling the substance?",
    options: [
      "Lower electricity bills (offset import + earn SEG on export), reduced carbon footprint, partial grid-independence (with battery), a hedge against rising electricity prices, often a positive impact on house value, and government incentive schemes that vary by year. Real benefits — but not “free electricity”.",
      "It requires effective planning, organisation, control, monitoring and review of the preventive measures. Reg 3 is 'do the assessment'; Reg 5 is 'run the management system that turns the assessment into actual on-site protection'. The 5+ employees recording threshold also applies.",
      "Accountability structures are important because EI development involves changing habitual patterns, which is difficult without external support. An effective structure might include: a development partner (colleague or mentor who checks in regularly), a reflective journal (tracking specific incidents and responses), regular self-assessments, and scheduled review points to evaluate progress against goals",
      "Section 8 — Exposure controls / personal protection. This section gives the workplace exposure limits (where applicable), the engineering controls (ventilation, containment) and the recommended PPE (gloves to a specific EN standard, eye protection, respiratory protection, body protection). It's the section you read before the work starts to confirm you have the right kit.",
    ],
    correctAnswer: 3,
    explanation:
      "Section 8 is the practical PPE and exposure-control section. For an electrician handling cable lubricant, contact cleaner, masonry sealant or brick acid, this is the section that tells you which gloves (often nitrile to EN 374), which eye protection (often safety goggles to EN 166), and which respiratory protection (often FFP3 for dust, organic-vapour cartridge for solvent) is needed.",
  },
  {
    id: 4,
    question:
      "Which SDS section gives the immediate first-aid response if a substance is spilled on skin or splashed in eyes?",
    options: [
      "Section 4 — First aid measures. Subsections cover inhalation, skin contact, eye contact and ingestion, with the specific response for each. For corrosive substances (e.g. brick acid) this typically reads 'irrigate with copious running water for at least 15 minutes, remove contaminated clothing, seek medical advice if persistent'.",
      "The apprenticeship contract (a formal indenture under the Apprenticeships, Skills, Children and Learning Act 2009), the wages, the off-the-job training declaration (a minimum 20% of paid working hours under the Apprenticeship Standard), the provision of suitable work and supervision, and HASAWA s.2 duties to provide a safe place of work and adequate training.",
      "A formal written authorisation that defines the work to be done, the hazards, the controls, the personnel authorised, the time period, and the sign-off conditions. Used for high-hazard activity (live working, hot work, confined space, work on safety-critical systems). Issued by the issuing authority; signed-on by the operative; signed-off when complete.",
      "They must not tamper with, remove, or bypass the meter without authority from the energy supplier — the meter is the property of the metering company, and interference is a criminal offence under the Theft Act 1968 and Electricity Act 1989",
    ],
    correctAnswer: 0,
    explanation:
      "Section 4 is at the front of the SDS for a reason — when there's an exposure incident, response time matters and you need the information fast. By year three an apprentice should know off the top of their head: Section 2 hazards, Section 4 first aid, Section 8 PPE, Section 13 disposal. Knowing the section numbers means you can navigate any SDS in seconds.",
  },
  {
    id: 5,
    question: "Which of the following are common electrical-trade chemicals you'd expect to need an SDS for?",
    options: [
      "Free smartphone app from Lighthouse Construction Industry Charity providing wellbeing resources, helpline access, financial planning tools, mental health self-help content, and signposting to support services. Designed for construction workers; quick access to crisis helpline if needed. Available on App Store and Google Play.",
      "Cable lubricant (for pulling into containment), contact cleaner / electronic cleaner (typically isopropyl-based), masonry sealant (for chase repairs), two-pack epoxy resin (for fixings and panel repairs), brick acid (for cleaning chased surfaces), dust suppressant. All have hazard ratings and all need an SDS in the firm's COSHH register.",
      "Two NICEIC streams. Domestic Installer (DI) is the entry tier — covers Part P self-certification for dwellings only. Approved Contractor (AC) is the higher tier — covers wider scope including commercial and industrial work, generally with stricter assessment criteria. Many sole traders start with DI and upgrade to AC as the business grows or as they take on more commercial work.",
      "Rotational — typically 2 weeks on platform / 2 weeks off, or 14/14 patterns. Offshore platform work involves helicopter transit (HUET training required), confined-space and working-at-height, harsh weather, extended periods away from home. Day rates typically £400-700+ on rotation but the family/relationship demands are significant. Common in North Sea (oil and gas) and offshore wind (East Coast UK, Scotland).",
    ],
    correctAnswer: 1,
    explanation:
      "The electrical trade uses a smaller chemical inventory than plumbing or decorating, but the products that are used are often higher-hazard — solvents, acids and reactive resins. Cable lubricant looks innocuous but the SDS will still flag handling and disposal information. The firm's COSHH register should have an SDS for every chemical regularly carried on the van.",
  },
  {
    id: 6,
    question: "Where can you find the SDS for a substance you're about to handle?",
    options: [
      "Ongoing safety communication mechanism — short, on-site, topic-specific. Required under MHSWR Reg 13 (information). Attendance logged as evidence. Topics often respond to recent near-misses, regulation changes, equipment updates, or seasonal risks.",
      "Stop work IMMEDIATELY. Treat the circuit as potentially live until you re-prove it dead with the voltage indicator (and verify the indicator is working). Re-secure the lockout properly before continuing.",
      "Manufacturer's website (always the latest version), the firm's COSHH register (in paper or app form — common apps include Sypol and Alcumus), and the product packaging at the point of purchase. Many manufacturers print QR codes on the can that link directly to the latest SDS.",
      "Conclusion: identifying what they could have done differently (e.g., always use a cable detector); Action Plan: specific steps to prevent recurrence (e.g., purchase a CAT scanner, add pre-drill check to personal checklist)",
    ],
    correctAnswer: 2,
    explanation:
      "The SDS is a controlled document maintained by the manufacturer and updated when classifications change. Authoritative copies live with the manufacturer, in the firm's COSHH register (which the H&S officer keeps current), and on the original packaging. Don't rely on screenshots in a WhatsApp group — they may be from an older version of the substance with different exposure limits.",
  },
  {
    id: 7,
    question: "What does CLP stand for in the context of SDS classifications?",
    options: [
      "For minor additions or alterations to an existing circuit (e.g. adding a single socket on an existing ring) that do NOT require a new circuit. New circuits, CU replacements and major alterations require an EIC + Schedule of Inspections + STR.",
      "A defined subset — most non-trivial work in special locations (bathroom Zone 0/1, swimming pool, sauna, etc.); installation of a new circuit; replacement of a consumer unit. Like-for-like accessory replacement, repairs, additions to an existing circuit OUTSIDE special locations are NOT notifiable.",
      "A single conductor only (line or neutral) — clamping around both line and neutral together would give a reading of approximately zero because the currents flow in opposite directions and their magnetic fields cancel",
      "Classification, Labelling and Packaging — the EU Regulation (1272/2008) that sets the format of the SDS, the GHS pictograms (skull, exclamation, flame, corrosion, etc.) and the H-statements (e.g. H314 'causes severe skin burns'). Retained as UK law after Brexit. It's the standard the SDS is written to.",
    ],
    correctAnswer: 3,
    explanation:
      "CLP (EU 1272/2008) is the regulation that standardises hazard communication across the EU and the UK. It introduced the GHS pictograms (the diamond-shaped symbols on chemical containers — skull for acute toxicity, flame for flammable, corrosion for corrosive, etc.) and the H-statements / P-statements that describe specific hazards and precautions. The SDS format is fixed by CLP.",
  },
  {
    id: 8,
    question: "If you see an SDS with a Section 11 indicating respiratory sensitisation, what does that mean for the operative?",
    options: [
      "It's a flag that the substance can cause an allergic respiratory response in some operatives — repeated exposure can sensitise even without a single high-dose event. Means tighter respiratory PPE control (FFP3 minimum, often a respirator), good extract ventilation, and health surveillance under COSHH 2002 Reg 11 if the exposure is regular. Two-pack epoxy isocyanates are the textbook example in the trade.",
      "The Electrical Contractors' Association — the trade association for electrical contractors in England, Wales and Northern Ireland. Founded 1901. ECA membership is a quality mark for the contractor; ECA also lobbies on behalf of the industry, runs technical events, publishes guidance and runs the JIB jointly with the trade union (Unite).",
      "Three reasons. (1) Speed of selection — colour-coded ferrules let you grab the right size at a glance from a sorted ferrule kit. (2) Inspection — supervisor or QA can check at a glance that the ferrule colour matches the conductor CSA on every termination. (3) Standardisation — DIN 46228-4 is recognised across Europe, so any supplier's ferrules match any other's. The colour code IS the inspection mechanism.",
      "Part P does NOT apply (Part P is dwellings-only). EAWR applies to the workplace electrical safety. The work needs an EIC or MEIWC for BS 7671 compliance and the contractor discharges EAWR duties through competent design and installation. No CPS upload required because Part P does not apply, but the contractor may still notify Building Control if other Building Regulations Parts are triggered (e.g. Part B fire safety, Part L energy efficiency).",
    ],
    correctAnswer: 0,
    explanation:
      "Respiratory sensitisation is a serious occupational health hazard — once an operative is sensitised, even tiny future exposures can trigger an asthmatic-style response. Two-pack isocyanate-based products (some epoxy resins, some adhesives) are a known sensitiser. COSHH 2002 Reg 11 requires health surveillance where exposure is regular. Section 11 of the SDS is where this kind of toxicological detail is recorded.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Do I really need to read the SDS for cable lubricant — it looks like soap?",
    answer:
      "Yes. Cable lubricant looks innocuous but the SDS will still tell you about skin sensitisation potential, eye irritation, environmental disposal restrictions, and recommended PPE. Many lubricants contain glycols or surfactants that can cause skin issues with prolonged contact. A two-minute read at the start of the project (not before every use) covers it. The COSHH 2002 Reg 6 assessment duty applies to every hazardous substance, not just the obviously dangerous ones.",
  },
  {
    question: "What's the difference between a hazard and a risk in COSHH terms?",
    answer:
      "A hazard is the intrinsic ability of the substance to cause harm — brick acid is corrosive whether or not anyone handles it. A risk is the likelihood that the hazard will actually cause harm in the way you're using it — a sealed bottle of brick acid in a rack is a low risk; an open bottle being decanted without gloves is a high risk. The COSHH assessment evaluates the risk in the actual use context, not just the hazard of the substance.",
  },
  {
    question: "Where does the firm's COSHH register actually live?",
    answer:
      "Different firms handle it differently. Smaller firms often have a paper folder in the office and another in each van with SDSs for everything regularly carried. Bigger firms typically use an app (Sypol, Alcumus, Trade Point COSHH and similar) where SDSs are stored digitally and accessed by phone on site. Either way, you should know where it is on day one. If you can't find it, ask the H&S officer or your supervisor.",
  },
  {
    question: "What if I'm about to use a substance that isn't in the COSHH register?",
    answer:
      "Stop and get the SDS before you start. The substance won't be in the register because nobody has done the assessment yet — and COSHH 2002 Reg 6 requires the assessment to happen BEFORE exposure. Get the SDS from the manufacturer's website, read sections 2, 4 and 8 at minimum, confirm you have the PPE, and add it to the register so the next operative isn't in the same position. Most firms will encourage this kind of contribution from apprentices.",
  },
  {
    question: "How do I know if a substance needs health surveillance under COSHH Reg 11?",
    answer:
      "The SDS will flag any sensitisation, carcinogenicity or chronic-toxicity hazards in Sections 2 and 11. If your work involves regular exposure to a substance with those flags — typical in the trade for isocyanate-containing two-pack products, for crystalline silica from masonry chasing, for some solvents — your firm should have health surveillance arranged (typically lung function testing, skin checks, regular medical review). If you're regularly handling something with a Section 11 sensitisation flag and there's no health surveillance, raise it with the H&S officer.",
  },
  {
    question: "What's the link between the SDS and the RAMS?",
    answer:
      "The RAMS for a job that involves hazardous substances should reference the relevant SDSs in its appendices, and the controls in the RAMS should be informed by Section 8 of the SDS. The two documents work together — the RAMS is the site-specific safe system of work, the SDS is the manufacturer's authoritative information about each substance used. A RAMS that doesn't reference any SDS for a job involving solvents or acids is a flag the assessment isn't 'suitable and sufficient' under either COSHH Reg 6 or MHSWR Reg 3.",
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
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3 · Subsection 3"
            title="COSHH data sheets — finding, reading, applying"
            description="COSHH 2002, the Safety Data Sheet 16-section format, and the chemicals an electrician actually meets. Pre-task review of the SDS is the point — not after-spill review."
            tone="emerald"
          />

          <TLDR
            points={[
              "COSHH 2002 is the UK statutory framework for hazardous substances at work. Reg 6 requires assessment BEFORE exposure; Reg 7 requires control; Reg 11 requires health surveillance where exposure is regular.",
              "Safety Data Sheet (SDS) is the manufacturer's 16-section document required by the CLP Regulation (EU 1272/2008, retained UK law). Sections 2 (hazards), 4 (first aid) and 8 (PPE) are the apprentice's first-read priorities.",
              "Common electrical-trade chemicals — cable lubricant, contact cleaner, masonry sealant, two-pack epoxy, brick acid, dust suppressant — all need an SDS in the firm's COSHH register. Read it BEFORE the spill, not after.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Supplementary content — extends LO2 / AC 2.2 (purpose of workplace information). Not directly mapped to a single 210 AC. COSHH awareness is a Level 2 skill; full COSHH assessment is a supervisor / employer competency.",
              "Define COSHH and identify the 2002 regulations as the UK statutory framework for hazardous substance exposure at work.",
              "Identify the SDS (Safety Data Sheet) as the manufacturer's authoritative source of hazard, handling and first-aid information, required under the CLP Regulation (EU 1272/2008, retained UK law).",
              "Recall the 16-section structure of the SDS and identify Sections 2 (hazards), 4 (first aid) and 8 (exposure controls / PPE) as the apprentice's first-read priorities.",
              "Identify common electrical-trade chemicals (cable lubricant, contact cleaner, masonry sealant, two-pack epoxy, brick acid, dust suppressant) and the typical hazards each carries.",
              "Identify the locations where the SDS for a substance can be reliably found — manufacturer website, firm's COSHH register (paper or app), product packaging.",
              "Apply the rule of pre-task SDS review — read the SDS BEFORE handling, not after exposure.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The COSHH 2002 framework</ContentEyebrow>

          <ConceptBlock
            title="Identify, assess, control, monitor — the four-step framework"
            plainEnglish="COSHH 2002 sets out a four-step framework for managing hazardous substances at work. Identify what's being used and what its hazards are. Assess the risk in the actual use context. Control the exposure (eliminate, substitute, engineer, PPE). Monitor (workplace exposure measurement and health surveillance where the risk warrants it). Apply this to every chemical that goes into the van."
            onSite="The framework is the employer's duty but the practical reality lives at the operative level. Your job as an apprentice is to read the SDSs for the substances you actually handle, follow the controls in the RAMS, wear the PPE specified in Section 8 of the SDS, and report any health symptoms (skin reactions, breathing issues) so the surveillance loop works."
          >
            <p>
              The four steps in practice on a typical electrical job:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify</strong> — list every chemical brought to site (cable lubricant,
                contact cleaner, masonry sealant, brick acid). Pull the SDS for each.
              </li>
              <li>
                <strong>Assess</strong> — for each substance, evaluate the risk in the actual use
                (volume, frequency, ventilation, persons exposed). Document in the COSHH
                assessment.
              </li>
              <li>
                <strong>Control</strong> — apply the hierarchy: eliminate (don't use it),
                substitute (less hazardous alternative), engineer (extract ventilation,
                enclosure), PPE (gloves, goggles, respiratory protection).
              </li>
              <li>
                <strong>Monitor</strong> — workplace exposure measurement where required (e.g.
                silica from chasing), health surveillance where required (e.g. respiratory
                sensitisers).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Control of Substances Hazardous to Health Regulations 2002 — Reg 6 (Assessment)"
            clause={
              <>
                &quot;An employer shall not carry out work which is liable to expose any
                employees to any substance hazardous to health unless he has — (a) made a
                suitable and sufficient assessment of the risk created by that work to the
                health of those employees and of the steps that need to be taken to meet the
                requirements of these Regulations; and (b) implemented the steps referred to in
                sub-paragraph (a).&quot;
              </>
            }
            meaning={
              <>
                Reg 6 puts the assessment duty on the employer BEFORE any exposure. The
                assessment has to be &apos;suitable and sufficient&apos; — the same test as
                MHSWR Reg 3. In practice this means a documented COSHH assessment for every
                substance used, drawing on the manufacturer&apos;s SDS for the technical detail.
                Reading the SDS is how you check that the assessment in front of you actually
                reflects what the substance is.
              </>
            }
            cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 6 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Control of Substances Hazardous to Health Regulations 2002 — Reg 7 (Prevention or control of exposure)"
            clause={
              <>
                &quot;Every employer shall ensure that the exposure of his employees to
                substances hazardous to health is either prevented or, where this is not
                reasonably practicable, adequately controlled.&quot; The hierarchy of control
                runs: elimination, substitution, engineering controls, administrative controls,
                personal protective equipment.
              </>
            }
            meaning={
              <>
                Reg 7 is the control duty — once you&apos;ve assessed the risk, you have to
                prevent exposure if you can, and control it if you can&apos;t. The hierarchy
                puts PPE last because PPE only protects the wearer (not bystanders), can fail
                in use, and depends on the operative wearing it correctly. On site this means
                the controls in the RAMS should follow the hierarchy — extract ventilation
                before respiratory PPE, enclosed mixing before open mixing, less-hazardous
                substitute before riskier original.
              </>
            }
            cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 7 — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="Control of Substances Hazardous to Health Regulations 2002 — Reg 11 (Health surveillance)"
            clause={
              <>
                Reg 11 requires health surveillance for employees exposed to specific scheduled
                substances (Schedule 6) and for any work where there is &quot;a reasonable
                likelihood that an identifiable disease or adverse health effect will occur
                under the particular conditions of work and there are valid techniques for
                detecting indications of the disease or effect&quot;.
              </>
            }
            meaning={
              <>
                Reg 11 means that for substances with sensitisation, carcinogenic or chronic
                toxicity hazards (flagged in SDS Sections 2 and 11), the employer has to arrange
                medical surveillance — typically lung function tests, skin examinations, regular
                review by an occupational health professional. Two-pack isocyanate products and
                respirable crystalline silica from masonry chasing are the textbook trade
                examples. If you&apos;re regularly exposed and there&apos;s no surveillance,
                raise it with the H&amp;S officer.
              </>
            }
            cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 11 — paraphrased from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <ConceptBlock
            title="GHS pictograms — the diamond symbols on every container"
            plainEnglish="The diamond-shaped red-and-white symbols on hazardous-substance containers are the GHS pictograms (Globally Harmonised System) introduced under CLP. Each pictogram represents a class of hazard — skull for acute toxicity, exclamation mark for irritation or sensitisation, flame for flammability, corrosion for skin or metal damage, exploding bomb for explosion, gas cylinder for compressed gas, environmental for aquatic toxicity, health hazard for chronic effects."
            onSite="Recognising the pictograms in seconds — without having to read the label — is one of the basic chemical-safety skills. By year one you should know all eight by sight. They appear on the container, in Section 2 of the SDS, and increasingly in COSHH register apps. The Signal Word ('Danger' = high-severity, 'Warning' = lower-severity) sits alongside them."
          >
            <p>
              The eight GHS pictograms you&apos;ll meet in the trade:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Skull and crossbones</strong> &mdash; acute toxicity. Severe poisoning
                from short-term exposure. Rare in electrical-trade chemicals but possible in
                some industrial settings.
              </li>
              <li>
                <strong>Exclamation mark</strong> &mdash; irritant, sensitiser, narcotic. Common
                on cleaning products, lubricants, sealants.
              </li>
              <li>
                <strong>Flame</strong> &mdash; flammable. Contact cleaners, IPA, some adhesives.
              </li>
              <li>
                <strong>Corrosion</strong> &mdash; skin or metal damage. Brick acid, some
                cleaning chemicals, two-pack hardeners.
              </li>
              <li>
                <strong>Exploding bomb</strong> &mdash; explosive. Rare in trade settings.
              </li>
              <li>
                <strong>Gas cylinder</strong> &mdash; compressed or refrigerated gas. Aerosols,
                refrigerant gases.
              </li>
              <li>
                <strong>Environment</strong> &mdash; aquatic toxicity. Some lubricants,
                solvents, heavy-metal-containing products.
              </li>
              <li>
                <strong>Health hazard</strong> &mdash; chronic toxicity, carcinogenicity,
                respiratory sensitisation. Two-pack epoxies, some solvents, silica dust.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The 16-section SDS format</ContentEyebrow>

          <ConceptBlock
            title="Standardised structure under the CLP Regulation"
            plainEnglish="Every Safety Data Sheet for a hazardous substance follows the same 16-section structure, set by the CLP Regulation (EU 1272/2008, retained as UK law). Same sections, same order, same content categories, every product, every manufacturer. Once you know the structure you can navigate any SDS in seconds."
            onSite="The fixed structure is one of the most useful things about the SDS. Skip the marketing on the front, go straight to the section you need. Section 4 for first aid. Section 8 for PPE. Section 13 for disposal. By year three the section numbers should be muscle memory."
          >
            <div className="space-y-3">
              <p className="text-[14px] leading-relaxed">
                The 16 sections — table for desktop, card list for mobile.
              </p>

              {/* Desktop table */}
              <div className="hidden sm:block overflow-hidden rounded-2xl border border-white/[0.08]">
                <table className="w-full text-[13px]">
                  <thead className="bg-white/[0.04] text-white/80 text-left">
                    <tr>
                      <th className="px-3 py-2 font-medium w-12">§</th>
                      <th className="px-3 py-2 font-medium">Section</th>
                      <th className="px-3 py-2 font-medium">Use it for</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/85">
                    {[
                      ['1', 'Identification', 'Product name, supplier, emergency contact'],
                      ['2', 'Hazards identification', 'GHS pictograms, signal words, H-statements'],
                      ['3', 'Composition / ingredients', 'CAS numbers, hazardous components'],
                      ['4', 'First aid measures', 'Skin, eye, inhalation, ingestion response'],
                      ['5', 'Firefighting measures', 'Suitable / unsuitable extinguishers'],
                      ['6', 'Accidental release', 'Spill containment and clean-up'],
                      ['7', 'Handling and storage', 'Compatibility, ventilation, temperature'],
                      ['8', 'Exposure controls / PPE', 'WELs, gloves, eye, RPE, body protection'],
                      ['9', 'Physical / chemical', 'Appearance, flash point, pH, density'],
                      ['10', 'Stability and reactivity', 'Incompatible materials, decomposition'],
                      ['11', 'Toxicological info', 'Acute / chronic effects, sensitisation'],
                      ['12', 'Ecological info', 'Aquatic toxicity, persistence'],
                      ['13', 'Disposal considerations', 'Waste codes, treatment routes'],
                      ['14', 'Transport info', 'UN number, ADR class, packing group'],
                      ['15', 'Regulatory info', 'CLP, REACH, other applicable regulations'],
                      ['16', 'Other information', 'Revision history, abbreviations, references'],
                    ].map(([num, name, use]) => (
                      <tr key={num} className="border-t border-white/[0.06]">
                        <td className="px-3 py-2 font-mono text-elec-yellow/80">{num}</td>
                        <td className="px-3 py-2 font-medium">{name}</td>
                        <td className="px-3 py-2 text-white/70">{use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile card list */}
              <div className="sm:hidden space-y-2">
                {[
                  ['1', 'Identification', 'Product name, supplier, emergency contact'],
                  ['2', 'Hazards identification', 'GHS pictograms, signal words, H-statements'],
                  ['3', 'Composition / ingredients', 'CAS numbers, hazardous components'],
                  ['4', 'First aid measures', 'Skin, eye, inhalation, ingestion response'],
                  ['5', 'Firefighting measures', 'Suitable / unsuitable extinguishers'],
                  ['6', 'Accidental release', 'Spill containment and clean-up'],
                  ['7', 'Handling and storage', 'Compatibility, ventilation, temperature'],
                  ['8', 'Exposure controls / PPE', 'WELs, gloves, eye, RPE, body protection'],
                  ['9', 'Physical / chemical', 'Appearance, flash point, pH, density'],
                  ['10', 'Stability and reactivity', 'Incompatible materials, decomposition'],
                  ['11', 'Toxicological info', 'Acute / chronic effects, sensitisation'],
                  ['12', 'Ecological info', 'Aquatic toxicity, persistence'],
                  ['13', 'Disposal considerations', 'Waste codes, treatment routes'],
                  ['14', 'Transport info', 'UN number, ADR class, packing group'],
                  ['15', 'Regulatory info', 'CLP, REACH, other applicable regulations'],
                  ['16', 'Other information', 'Revision history, abbreviations, references'],
                ].map(([num, name, use]) => (
                  <div
                    key={num}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-elec-yellow/80 text-[12px]">§{num}</span>
                      <span className="text-[13px] font-semibold text-white">{name}</span>
                    </div>
                    <div className="mt-1 text-[12px] text-white/65">{use}</div>
                  </div>
                ))}
              </div>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="The four sections an apprentice should know cold"
            plainEnglish="You don't need to memorise all 16 sections. Four are enough — Section 2 (what hazards), Section 4 (first aid), Section 8 (PPE), Section 13 (disposal). Those four cover the apprentice's day-to-day needs. Knowing them off the top of your head means you can navigate any SDS in seconds when something goes wrong."
            onSite="By the end of year one you should be able to open an SDS for any chemical on the van and find the first-aid response (Section 4) in under ten seconds. The other twelve sections matter to the COSHH assessor and the H&S officer; they're rarely the apprentice's first read."
          >
            <p>
              The four to commit to memory:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Section 2 — Hazards</strong>: GHS pictograms, signal word
                (&quot;Danger&quot; / &quot;Warning&quot;), H-statements (e.g. H314 &quot;causes
                severe skin burns and eye damage&quot;). What the substance can do to you.
              </li>
              <li>
                <strong>Section 4 — First aid</strong>: skin, eye, inhalation, ingestion
                responses. The seconds-matter section when something goes wrong.
              </li>
              <li>
                <strong>Section 8 — PPE</strong>: which gloves (often nitrile to EN 374), which
                eye protection (often EN 166), which respiratory protection (FFP3 / cartridge),
                workplace exposure limits.
              </li>
              <li>
                <strong>Section 13 — Disposal</strong>: how to dispose of the substance and
                contaminated PPE / containers. Waste codes for licensed disposal.
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

          <ConceptBlock
            title="Workplace Exposure Limits (WELs) and what they mean for you"
            plainEnglish="A WEL is the maximum concentration of a hazardous airborne substance that an operative may be exposed to over a defined period (typically 8-hour time-weighted average for long-term exposure, 15-minute STEL for short-term exposure peaks). HSE publishes EH40 — the official list of workplace exposure limits in Great Britain. Not every substance has a WEL; those that do are listed in EH40 and referenced in Section 8 of the SDS."
            onSite="The relevance to an electrician is mostly around respirable crystalline silica (chasing brick), solvents (contact cleaners, IPA), and isocyanates (two-pack epoxies). The SDS Section 8 will tell you whether the substance has a WEL and what it is. The control measures in the RAMS should keep exposure below the limit — typically through extract ventilation, dust suppression, or respiratory PPE."
          >
            <p>
              Two WEL types you&apos;ll meet:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>8-hour TWA (Time-Weighted Average)</strong> &mdash; the long-term limit.
                Averaged over a normal working day. The value most often used in dust and
                vapour assessment.
              </li>
              <li>
                <strong>15-minute STEL (Short-Term Exposure Limit)</strong> &mdash; the
                short-term peak limit. Stops a brief high-exposure event from being averaged
                away to nothing.
              </li>
              <li>
                <strong>Substances without a WEL</strong> &mdash; not necessarily safe.
                COSHH 2002 still requires exposure to be &quot;adequately controlled&quot;
                regardless of whether a numerical limit applies.
              </li>
              <li>
                <strong>EH40</strong> &mdash; the HSE&apos;s authoritative list. Updated
                periodically. The reference your H&amp;S officer uses.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Common electrical-trade chemicals</ContentEyebrow>

          <ConceptBlock
            title="The chemicals you'll actually meet — and what their SDSs typically say"
            plainEnglish="The electrical trade uses a smaller chemical inventory than plumbing or decorating, but several common products carry significant hazards. Knowing the typical hazard profile of each means you can read the SDS quickly and confirm the assessment is right for the substance."
            onSite="None of the products below should be on the van without an SDS in the COSHH register. If you arrive at a job and a chemical is being used without one, that's the moment to stop and raise it. COSHH 2002 Reg 6 requires the assessment BEFORE exposure, and the SDS is the source for the assessment."
          >
            <ul className="space-y-2 list-disc pl-5 marker:text-elec-yellow/70 text-[14px] leading-relaxed">
              <li>
                <strong>Cable lubricant</strong> — typically water-based or wax-based
                surfactants. Skin sensitisation potential. Section 8 typically nitrile gloves;
                Section 13 typically licensed disposal of contaminated rags.
              </li>
              <li>
                <strong>Contact cleaner / electronic cleaner</strong> — typically isopropyl
                alcohol (IPA) or proprietary solvent blends. Flammable, eye and respiratory
                irritant. Section 8 typically gloves, eye protection, ventilation. Section 7
                typically &quot;keep away from ignition sources&quot;.
              </li>
              <li>
                <strong>Masonry sealant</strong> — silane / siloxane base or solvent-based.
                Skin and eye irritant. Section 8 typically nitrile gloves and respiratory
                protection in confined spaces.
              </li>
              <li>
                <strong>Two-pack epoxy resin</strong> — for fixings, panel repairs, conduit
                seals. Often contains isocyanate or amine hardeners — Section 11 typically
                flags respiratory sensitisation. Section 8 PPE is significant; Reg 11 health
                surveillance often required.
              </li>
              <li>
                <strong>Brick acid (hydrochloric acid)</strong> — for cleaning chased surfaces.
                Strongly corrosive. Section 4 first aid is critical (irrigate with water for
                15+ minutes). Section 8 demands chemical-resistant gloves, goggles, and
                ventilation.
              </li>
              <li>
                <strong>Dust suppressant</strong> — water-based polymer or surfactant
                solutions. Generally low-hazard but Section 13 may flag licensed disposal.
                Used for chasing and concrete drilling to control respirable crystalline
                silica.
              </li>
              <li>
                <strong>Solder flux</strong> — used in low-voltage and panel work. Older
                rosin-based fluxes are respiratory sensitisers (Section 11 flag). Modern
                no-clean fluxes are typically less hazardous but still need an SDS.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where to find the SDS</ContentEyebrow>

          <ConceptBlock
            title="Three reliable sources — manufacturer site, firm's COSHH register, packaging"
            plainEnglish="The SDS is a controlled document maintained by the manufacturer and updated when classifications change. The three reliable sources are the manufacturer's website (always the latest version), the firm's COSHH register where current SDSs are filed, and the original packaging at the time of purchase. Trade WhatsApp screenshots are not authoritative."
            onSite="Many manufacturers print QR codes on the can that link directly to the latest SDS. That's the fastest way to get an authoritative copy on site. The firm's COSHH register (paper folder or app) should contain SDSs for everything regularly carried; if a substance is on site that isn't in the register, that's the moment to raise it before handling."
          >
            <p>
              The three sources, ranked:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Manufacturer's website</strong> — always the latest version, indexed by
                product name. Most manufacturers maintain a downloads section; many print QR
                codes on the packaging that link directly to the SDS PDF.
              </li>
              <li>
                <strong>Firm's COSHH register</strong> — paper folder or app (Sypol, Alcumus,
                Trade Point COSHH and similar). The H&amp;S officer keeps it current. Contains
                the SDSs for everything regularly used by the firm.
              </li>
              <li>
                <strong>Original packaging insert</strong> — the SDS at the time of purchase,
                printed in the packaging. May be out of date if the substance has been
                reclassified — check against the manufacturer&apos;s site if you&apos;re unsure.
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="The link between SDS, RAMS and COSHH register — three documents, one chain"
            plainEnglish="The COSHH register is the firm's master list of hazardous substances in use, with an SDS attached for each. The SDS is the manufacturer's authoritative information for any one substance. The RAMS is the site-specific working method that incorporates the SDS-derived controls. The three documents work together — register identifies what's used, SDS gives the technical detail, RAMS turns it into specific instructions for specific work."
            onSite="A RAMS for a job involving brick acid that doesn't reference the SDS for that brick acid is incomplete. A COSHH register that doesn't have an SDS for a substance the firm regularly carries is incomplete. A site without either the register or the relevant SDSs is in breach of COSHH 2002 Reg 6 — the assessment basis isn't there. The three documents are mutually reinforcing; missing any one weakens the whole chain."
          >
            <p>
              How the three documents relate in practice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>COSHH register</strong> &mdash; firm-wide list of substances in use,
                kept current by the H&amp;S officer. SDS attached for each entry.
              </li>
              <li>
                <strong>SDS</strong> &mdash; manufacturer&apos;s 16-section document for the
                substance. The technical authority.
              </li>
              <li>
                <strong>COSHH assessment</strong> &mdash; firm&apos;s assessment of the risk in
                the specific use context, drawing on the SDS for hazard data and on site
                conditions for exposure data.
              </li>
              <li>
                <strong>RAMS</strong> &mdash; site-specific safe system of work, with the
                COSHH-derived controls baked into the method statement.
              </li>
              <li>
                <strong>Sign-on and toolbox talk</strong> &mdash; daily mechanism for keeping
                the controls active in the actual work.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Reading the SDS only after the spill"
            whatHappens={
              <>
                Apprentice is decanting brick acid from a 5L bottle into a smaller container for
                use in cleaning down a chased wall. No goggles, nitrile gloves only (not the
                heavier chemical-resistant grade specified in Section 8 of the SDS). Acid
                splashes onto the back of the hand, eats through the glove, contacts skin. The
                apprentice has to look up the SDS in the moment — eyes-watering, hand stinging
                — to find the first-aid response. By the time they get to running water the
                exposure has been three minutes and the skin is already showing chemical burn.
              </>
            }
            doInstead={
              <>
                Read Sections 2, 4 and 8 of the SDS BEFORE handling. The pre-task review takes
                two minutes. For brick acid the SDS will tell you Section 8 demands
                chemical-resistant gloves (often EN 374 to a specific permeation rating),
                goggles, and good ventilation. Section 4 will tell you the first-aid response
                is irrigation with running water for at least 15 minutes. Knowing this BEFORE
                the spill means you have the right kit on, and if a spill happens anyway
                you&apos;re at the tap within seconds rather than scrolling for an SDS.
              </>
            }
          />

          <Scenario
            title="Brick acid spill on hand during chase work"
            situation={
              <>
                You&apos;re chasing brick on a small commercial unit. The site bricklayer has
                been cleaning down chased surfaces with brick acid (a strong hydrochloric acid
                solution) and asks you to spread some lime mortar back into a chase. Reaching
                for the trowel you knock the open acid bottle and a splash lands on the back of
                your right hand. The bottle&apos;s SDS is in the COSHH register on the site
                tablet.
              </>
            }
            whatToDo={
              <>
                Don&apos;t scroll for the SDS first &mdash; you should already know what
                Section 4 says from the pre-task review. Get to running water immediately and
                irrigate the affected skin for at least 15 minutes (the standard SDS Section 4
                response for corrosive substances). While you&apos;re irrigating, your colleague
                pulls the SDS up on the tablet to confirm the response and to check Section 4
                for any specific advice (some acids need bicarbonate neutralisation after
                irrigation, others don&apos;t). Remove any contaminated clothing. Once the
                irrigation period is complete, assess the skin &mdash; if it&apos;s reddened but
                intact and pain has subsided, monitor; if there&apos;s blistering, broken skin
                or persistent pain, seek medical advice as Section 4 will instruct. Report the
                incident to the supervisor; complete an accident report; review the COSHH
                assessment to confirm whether the controls were adequate or need tightening
                (e.g. heavier glove specification, different decanting procedure).
              </>
            }
            whyItMatters={
              <>
                The point of the SDS is that you&apos;ve already read it before the spill. Section
                4 is at the front of every SDS specifically because exposure incidents are
                time-sensitive &mdash; the first 60 seconds of irrigation matter more than the
                next 10 minutes. Apprentices who treat the SDS as &quot;reference material to
                consult after something goes wrong&quot; have it backwards. Pre-task review is
                the entire point.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "COSHH 2002 is the UK statutory framework for hazardous substances at work — Reg 6 (assess BEFORE exposure), Reg 7 (control via the hierarchy), Reg 11 (health surveillance where exposure is regular).",
              "The SDS (Safety Data Sheet) is the manufacturer's authoritative information for COSHH assessment. The 16-section format is fixed by the CLP Regulation (EU 1272/2008, retained as UK law).",
              "The four SDS sections to know cold: Section 2 (hazards), Section 4 (first aid), Section 8 (PPE), Section 13 (disposal). By year three these should be muscle memory.",
              "Common electrical-trade chemicals — cable lubricant, contact cleaner, masonry sealant, two-pack epoxy, brick acid, dust suppressant, solder flux — all need an SDS in the firm's COSHH register.",
              "Three reliable sources for the SDS: manufacturer's website (always the latest version), firm's COSHH register (paper or app such as Sypol / Alcumus), original packaging insert. WhatsApp screenshots are not authoritative.",
              "Pre-task review is the entire point. Read Sections 2, 4 and 8 BEFORE handling, not after the spill. Section 4 is at the front of the SDS specifically because exposure incidents are time-sensitive.",
              "GHS pictograms (skull, exclamation, flame, corrosion) and H-statements (e.g. H314 'causes severe skin burns') are the standardised hazard communication under CLP. They appear on the container and in Section 2 of the SDS.",
              "If a chemical is on site without an SDS in the COSHH register, stop and get one before handling. COSHH Reg 6 requires the assessment to happen BEFORE exposure — adding a substance to use without an SDS is a Reg 6 breach.",
            ]}
          />

          <Quiz
            title="COSHH and SDS — knowledge check"
            questions={quizQuestions}
          />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section3/3-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.2 Reading RAMS and method statements
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section3/3-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.4 Manufacturer instructions
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
