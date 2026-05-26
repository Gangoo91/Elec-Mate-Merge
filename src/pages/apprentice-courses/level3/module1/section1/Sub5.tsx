/**
 * Module 1 · Section 1 · Subsection 5 — Environmental legislation and waste duty of care
 * Maps to City & Guilds 2365-03 / Unit 201 / LO1 / AC 1.2 + LO2 / AC 2.5–2.7
 *   AC 1.2 — "identify roles and responsibilities with regard to current relevant
 *            environmental legislation"
 *   AC 2.5 — "describe the ways in which the environment may be affected by work activities"
 *   AC 2.6 — "specify the current requirements and good working practices for processing waste on site"
 *   AC 2.7 — "explain why it is important to report any hazards to the environment"
 *
 * EPA 1990 s.34 duty of care, hazardous waste, WEEE, F-Gas — and how
 * 'we always took it to the yard' becomes a £20k fine when paperwork doesn't follow.
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
  'Environmental legislation and waste (1.2 / 2.5–2.7) | Level 3 Module 1.1.5 | Elec-Mate';
const DESCRIPTION =
  'L3 refresher on environmental duties — EPA 1990 s.34 duty of care, hazardous waste, WEEE, F-Gas, and how the waste audit trail protects the firm from significant fines.';

const checks = [
  {
    id: 'l3-m1-s1-sub5-doc',
    question:
      "You strip a small commercial kitchen and the rubble includes broken tile, cement chasing waste, copper offcuts, an old DB and three fluorescent tubes. The site cleaner offers to take it 'to the yard' for £20. Under EPA 1990 s.34, what's wrong with that?",
    options: [
      "Common parts (landlord supply, intake, distribution, common-area lighting, lift supplies, cleaner sockets) inspected fully. Flats sampled — typical 10-20% sample with the agreement of the freeholder and ideally the tenants — and the limitation clearly recorded that the EICR covers common parts in full and a defined sample of flats; individual flats not sampled retain their own EICR responsibility under the PRS Regulations or the leaseholder's responsibility.",
      "The waste duty of care under EPA 1990 s.34 requires that waste be transferred only to an authorised person (registered waste carrier with a waste carrier licence), accompanied by a Waste Transfer Note (WTN) describing the waste. The fluorescent tubes are hazardous waste (mercury) and require a separate Hazardous Waste Consignment Note. The DB is WEEE under the WEEE Regs 2013 with its own consignment requirements. 'The site cleaner with no licence' isn't authorised; the £20 deal is a duty-of-care breach for which the firm can be fined unlimited.",
      "Site induction with the principal contractor (CDM 2015 Reg 13). The induction covers the construction phase plan, site rules, welfare arrangements, emergency procedures, specific site hazards, and any pre-construction information from the principal designer. Until you've been inducted you're not signed in to the site H&S system and the principal contractor cannot lawfully let you work.",
      "Test instruments drift over time — components age, shock and vibration cause small errors. A drifted instrument produces wrong test results that fail BS 7671 Chapter 61 verification. Annual calibration to a UKAS-traceable standard (with a calibration certificate) is the standard requirement. NICEIC, NAPIT and ELECSA all check for in-date calibration certificates at scheme audit; an out-of-date instrument used to demonstrate compliance invalidates the certificate it was used to produce.",
    ],
    correctIndex: 1,
    explanation:
      "EPA 1990 s.34 is the waste duty of care — and it's strict liability. The 'producer' (your firm) stays on the hook even after waste leaves the site. If the cleaner fly-tips the waste, the trail leads back to you, and the firm can be fined unlimited under EPA 1990 s.33. Waste Transfer Notes must be kept for 2 years; Hazardous Waste Consignment Notes for 3.",
  },
  {
    id: 'l3-m1-s1-sub5-weee',
    question:
      "You've removed an old commercial three-phase distribution board with metering equipment and surge protection. Under the WEEE Regulations 2013, what's the disposal route?",
    options: [
      "Most LFP batteries are warrantied to retain at least 70–80 % of original capacity at 10 years (typically 6,000+ cycles). 75 % at 9 years is on or just below the warranty curve. The customer can either claim under warranty if still in coverage, replace the pack now, or carry on using the reduced capacity until economic payback drops below the cost of replacement. End-of-life packs go for proper UK lithium recycling under WEEE / battery regulations — they are not house-clearance waste.",
      "Plain English at slow pace, supplemented by visual demonstration where appropriate, written translated handouts (HSE provides multilingual safety leaflets), use of a bilingual co-worker as informal interpreter, back-briefing to confirm understanding ('show me what you'd do if you saw a fire'), and provision of safety signage and PPE labels in the relevant languages where the workforce is consistently multilingual. The duty under MHSWR Reg 10 is for information to be 'comprehensible' — that's a statutory standard, not a courtesy.",
      "Because a faulty proving-dead tester can show 'zero' on a live circuit — and you'd take a fatal shock. The function check confirms the tester responds to a known source. The proving-tester-on-known-source step is built into the JIB six-step (Sub 1.2) for exactly this reason. The Martindale GVD2 proving unit gives a portable known source; alternatively a known-live socket on a different circuit. Either way, the tester's response on a known source is the evidence the tester is working. Without that evidence, a 'zero' reading on the circuit you're about to work on means nothing.",
      "WEEE — Waste Electrical and Electronic Equipment. Must be segregated from general waste, transferred to an authorised treatment facility (AATF) via a registered carrier, and consigned with appropriate paperwork. The original producer (manufacturer / importer) of the equipment may have a take-back obligation; commercial WEEE often goes to a specialist recycler. Mixing WEEE with general waste loses the recyclable materials and breaches the WEEE Regs.",
    ],
    correctIndex: 3,
    explanation:
      "WEEE Regs 2013 implement the EU WEEE Directive in UK law. Categories cover 'large equipment' (over 50cm) and 'small equipment' separately. Distribution boards, switchgear, control panels and consumer units all qualify. Segregation at source on site is the practical control; a labelled WEEE stillage in the firm's yard is the typical solution.",
  },
  {
    id: 'l3-m1-s1-sub5-env-report',
    question:
      "You spot a slow oil leak from a transformer at a customer's site that's draining into the surface-water drain heading for the river. What's the L3-level response?",
    options: [
      "Customer-facing protection — dust sheets and floor protection on the route from van to work area, conversation with the customer about which rooms will be no-go zones during the work, awareness of who else is in the property (children, pets, elderly relatives, vulnerable adults), agreed working hours, and the constant background of HASAWA s.3 duty to non-employees. None of that applies in a void property.",
      "Stop the discharge if safely possible (containment — drain blocker, absorbent boom), notify the Environment Agency 24/7 incident hotline (0800 80 70 60), notify the customer's site manager, document with photos and time-stamps. Pollution to controlled waters is an offence under the Environmental Permitting Regs 2016 / Water Resources Act 1991 with strict liability. Failure to report or to act once aware is itself an offence.",
      "Specified injuries (RIDDOR Reg 4) are the most serious named injuries — fatalities, fractures other than to fingers/toes/thumbs, amputations, loss of sight, scalpings, serious burns, crush injuries, unconsciousness from electric shock, and so on. They must be reported as soon as possible and within 10 days. Over-7-day incapacitation (Reg 6) is when a worker is off normal work for more than 7 consecutive days (excluding accident day, including weekends) — must be reported within 15 days. Different categories, different timeframes, both reportable.",
      "Safeguarding. Children are present during term time, which restricts when work can be done, requires DBS-checked operatives for any work where unsupervised contact with pupils is foreseeable, and adds rules around photography, conversation and movement around the building. Most major electrical work in schools is done during holidays for exactly this reason. The school's safeguarding lead is a key contact during prep.",
    ],
    correctIndex: 1,
    explanation:
      "Pollution incidents are strict-liability offences — knowing about them and not acting is sometimes worse than not knowing. The Environment Agency hotline is for England; SEPA in Scotland (0800 80 70 60), NRW in Wales (0300 065 3000). The reporting duty under MHSWR Reg 14 (limb b) covers environmental hazards — they're 'matters which a person with the training given would reasonably consider represented a shortcoming in protection arrangements'.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does EPA 1990 s.34 require?",
    options: [
      "Carry out the remedial works within 28 days of receiving the report (or within a shorter period specified on the report), obtain written confirmation from a competent person that the works have been completed and the installation is now safe, and provide that confirmation to existing tenants within 28 days and to the local authority on request.",
      "Safety Data Sheet — 16-section document supplied by the manufacturer / supplier covering identification, hazard ID, composition, first aid, fire fighting, accidental release, handling and storage, exposure controls and PPE, physical and chemical properties, stability and reactivity, toxicology, ecology, disposal, transport, regulation, other. The label gives headlines; the SDS gives the operational detail.",
      "A waste duty of care — anyone who produces, imports, keeps, stores, transports, treats or disposes of controlled waste must take all reasonable steps to: prevent unauthorised treatment / disposal; ensure waste is transferred only to an authorised person; ensure waste transfers are accompanied by a written description (Waste Transfer Note); and prevent escape of waste from their control.",
      "Each calculation has a different worst case. Fault current worst case is HIGH voltage (more energy, more thermal stress on cable) → use Cmax. Zs worst case is LOW voltage (smaller driving voltage, smaller fault current, slower trip) → use Cmin. Each factor pushes the calculation in the conservative direction for that specific design check.",
    ],
    correctAnswer: 1,
    explanation:
      "EPA 1990 s.34 is the cornerstone waste regulation. Strict liability — 'I didn't know the cleaner wasn't licensed' isn't a defence. WTNs must be kept for 2 years; Hazardous Waste Consignment Notes for 3 years.",
  },
  {
    id: 2,
    question: "Which of these is hazardous waste under the Hazardous Waste Regs 2005?",
    options: [
      "Insulation method (Class II / equivalent), DC isolator at array, polarity, string fuses, earthing arrangement (functional vs protective), and labels at supply intake (Reg 514)",
      "The principal contractor must ensure that waste is managed in accordance with the waste hierarchy, that waste is properly segregated and stored on site, and that waste removal arrangements are in place",
      "Consider replacing the oversized motors with correctly sized alternatives, or fitting VSDs to match motor speed to the actual load requirement, reducing energy consumption and improving the power factor",
      "Fluorescent tubes (mercury), batteries (lead/lithium/nickel), used solvents, used oil, asbestos waste, lead-paint waste, certain WEEE items containing hazardous substances, and many others on the European Waste Catalogue (EWC) hazardous list.",
    ],
    correctAnswer: 2,
    explanation:
      "Hazardous waste must be segregated from general waste, consigned with a Hazardous Waste Consignment Note (separate from a normal WTN), and disposed of at a permitted hazardous-waste facility. Mixing hazardous with non-hazardous is itself an offence — it 'contaminates' the whole load.",
  },
  {
    id: 3,
    question: "What does WEEE 2013 cover?",
    options: [
      "Fluorescent tubes (mercury-containing, EWC 20 01 21* — the asterisk denotes hazardous), oil-filled transformers and capacitors containing PCBs (EWC 16 02 09*), batteries containing lead, mercury or cadmium (EWC 16 06 01* and similar), asbestos-cement consumer unit backplates from older installations (EWC 17 06 05*), and waste oils. The asterisk in the EWC code is the marker for absolute hazardous waste.",
      "A durable label complying with BS 951 stating \\\\\\\"Safety Electrical Connection — Do Not Remove\\\\\\\" shall be permanently fixed in a visible position at or near the point of connection of every earthing conductor to an earth electrode, every bonding conductor to extraneous-conductive-parts, and at the main earthing terminal where separated from the main switchgear.",
      "Don't move tools, equipment, locks, voltage indicators or anything else. Don't restore power. Don't continue work. Photograph the scene from multiple angles. Identify witnesses and ask them to record their observations. Notify the firm's responsible person. The scene as it was is the evidence.",
      "All Waste Electrical and Electronic Equipment — distribution boards, consumer units, switchgear, control panels, lighting equipment (luminaires, drivers, lamps), small power equipment, cables containing electronic components. Producer take-back obligations on manufacturers/importers; user obligations on segregation, transfer to authorised treatment facilities (AATF) and consignment.",
    ],
    correctAnswer: 3,
    explanation:
      "Categories include 'large equipment' (≥50cm) and 'small equipment' separately. Commercial WEEE typically goes via a specialist recycler; domestic WEEE has retailer take-back routes (the 'DTS' — Distributor Take-back Scheme).",
  },
  {
    id: 4,
    question: "What does the F-Gas Regulation cover?",
    options: [
      "Fluorinated greenhouse gases — refrigerants used in air conditioning, heat pumps and refrigeration equipment. Hydrofluorocarbons (HFCs) particularly. Phase-down quotas, mandatory leak-checking on equipment containing 5+ tonnes CO2e of F-Gas, certified personnel for installation/maintenance, and ban on certain F-Gases in new equipment from set dates.",
      "BS 7671 Regulation 712.522 requires that DC cables within a building that cannot be isolated from the PV array in a fire are either fire-resistant (to BS 8434/BS 8519) or enclosed in fire-resistant conduit, because they will remain energised as long as daylight is present",
      "When teams avoid conflict, important issues go unaddressed, decisions are made without genuine input (leading to lack of commitment), underlying tensions fester and eventually explode destructively, and the quality of decisions suffers because ideas are not challenged and refined through debate. Healthy teams have MORE open conflict, not less — but it is constructive, issue-focused conflict",
      "Regulation 132.13 — the explicit requirement for design documentation. Plus Reg 514.9.1 which addresses the on-site distribution board diagram requirement (with the A4:2026 domestic exception). Plus Reg 644.1.1 which makes the EIC and supporting documentation conditional on defect rectification. Plus Section 514 series on identification and notices.",
    ],
    correctAnswer: 0,
    explanation:
      "F-Gas is increasingly in electrical territory because heat-pump installations are growing fast. Working with refrigerants requires F-Gas certification (Cat I-IV), even just to disturb the system. Most electricians don't hold F-Gas; they refer the work to F-Gas certified contractors.",
  },
  {
    id: 5,
    question: "Under EPA 1990 s.33, what's an offence in addition to s.34's duty-of-care breach?",
    options: [
      "Brief the customer on the C3 recommendations, explain that no immediate action is required, agree which improvements the customer plans to address and on what timescale, and confirm the next inspection date. Even Satisfactory reports merit a verbal handover so the C3 recommendations have a chance of being acted on rather than filed and forgotten.",
      "Depositing controlled waste, or knowingly permitting the deposit of controlled waste, in or on land without an environmental permit; treating, keeping or disposing of controlled waste without a permit; treating, keeping or disposing of controlled waste in a manner likely to cause pollution of the environment or harm to human health. Fly-tipping is the headline s.33 offence.",
      "It binds whoever is the duty-holder for the system at the time — most often the duty-holder under HASAWA who controls the premises (employer, dutyholder, landlord). The duty-holder discharges the maintenance obligation by arranging periodic inspection (an EICR) to a recommended frequency, acting on the resulting condition codes (C1 / C2 / FI), and keeping records. The electrician carrying out the EICR is the technical evidence the duty-holder is meeting Reg 4(2).",
      "A structured plan that includes: self-assessment (identifying current EI strengths and gaps), specific goals (which competencies to develop), practice opportunities (real situations to apply new skills), feedback mechanisms (trusted people who will give honest observations), reflection practices (regular review of progress), and accountability (commitments to specific actions with review dates)",
    ],
    correctAnswer: 1,
    explanation:
      "s.33 is the unauthorised-deposit offence; s.34 is the duty-of-care offence. Fly-tipping by your firm or by anyone you transferred waste to (without proper authorisation) makes both offences live. Unlimited fines on conviction.",
  },
  {
    id: 6,
    question: "What's a Waste Transfer Note (WTN) and how long must it be kept?",
    options: [
      "Section 753 'Heating cables and embedded heating systems' covers electric heating cables embedded in floors, walls or ceilings, plus surface heating systems and de-icing / frost-prevention applications. The A4:2026 amendment completely revised Section 753 — extending its scope, retitling it, and adding new requirements relocated from Chapter 53 covering impact protection and installation of heating cables. Industrial heating systems complying with BS EN 60519, BS EN 62395 and BS EN 60079 are excluded from Section 753.",
      "PV output is roughly proportional to the irradiance hitting the panel (W/m²). Cell efficiency does drop slightly as the cells heat up — typically 0.3-0.5% per °C above 25°C — but UK roofs rarely sit above 50°C and the irradiance variation between a sunny and cloudy day is far larger than the temperature derate. So total annual yield (kWh) is dominated by how much sunlight the array sees, not how warm it is.",
      "A document accompanying the transfer of controlled waste from the producer to the next holder. Must contain a description of the waste, the European Waste Catalogue (EWC) code, the SIC (Standard Industrial Classification) code of the producer's activity, the quantity, the carrier's licence details, the destination, and signatures of both parties. Kept for 2 years (3 years for Hazardous Waste Consignment Notes).",
      "MIET (Member of the Institution of Engineering and Technology) is the standard professional membership grade of the IET. It's a membership grade, not an Engineering Council registration — so you can be MIET without being EngTech/IEng/CEng. Most engineers aim for MIET as the membership tier alongside their professional registration. Grants access to IET technical resources, member events, online journals.",
    ],
    correctAnswer: 2,
    explanation:
      "The WTN is the legal evidence that the waste duty of care was discharged on a particular transfer. Inspectors ask for the WTNs first when investigating a fly-tipping or environmental incident.",
  },
  {
    id: 7,
    question: "Why must hazards to the environment from work activities be reported?",
    options: [
      "A rotary cable stripper (Jokari Quadro, Knipex 16 95 02, BAHCO 4490) — sized to the SWA outer diameter, runs around the sheath cleanly and removes a length to expose the armour without scoring the inner cores. Stanley knives can do it but the risk of scoring the inner is high; rotary strippers are the standard. For the armour itself — separate tool (armour shears for smaller, angle grinder for bigger) covered in Sub 1.2.",
      "Measured limit = 0.8 x 1.37 = 1.10 Omega. Table 41.3 values assume conductor at 70 deg C operating temperature; measured Zs is at ambient (typically 15-25 deg C). Cable resistance rises with temperature — about 20 percent from 20 deg C to 70 deg C for copper. The 0.8 multiplier corrects approximately for this. For full rigour use GN3 Appendix B per-degree coefficients, but the 0.8 rule of thumb is the standard site-practice correction.",
      "Larger commercial / institutional sites where heat demand is constant and high — hospitals, hotels, leisure centres, large care homes, schools with swimming pools. Engine-based CHP at 5-50 kWe scale generates electricity locally (offsetting expensive day-rate import) and the waste heat displaces a boiler load. Sized correctly, the heat-led design ensures the heat is always useful (the unit is sized to follow the property's baseload heat demand). Domestic micro-CHP is essentially over in new installs but commercial CHP remains a niche but live technology.",
      "(1) Strict liability — pollution incidents are offences regardless of intent; (2) duty of care under EPA 1990 s.34 + the Polluter Pays principle; (3) MHSWR Reg 14 (employee duty to report shortcomings); (4) operator's environmental permit conditions; (5) reputational and commercial consequences of an undetected pollution event downstream; (6) personal liability under HASAWA s.7 if the environmental hazard also creates a worker safety hazard.",
    ],
    correctAnswer: 3,
    explanation:
      "Environmental reporting isn't just regulatory — it's legal protection for the firm and personal protection for the operative. The Environment Agency hotline (0800 80 70 60 in England, 24/7) is the formal route for water, land and air pollution incidents.",
  },
  {
    id: 8,
    question:
      "Good waste management practice on an electrical site looks like what?",
    options: [
      "Segregation at source — separate stillages or skips for general / metal / WEEE / hazardous / wood / cardboard. Authorised carriers only, with WTNs / HWCNs accompanying every transfer. WEEE to AATF via specialist recycler. Hazardous (fluorescent tubes, batteries, asbestos) consigned and quarantined. Spillage kit on site for refrigerants and oils. Documentation kept for the legal retention periods (2y WTN, 3y HWCN).",
      "PASMA (Prefabricated Access Suppliers' and Manufacturers' Association) is the recognised training standard for assembling, dismantling and using mobile tower scaffolds. It's not a statutory licence in the way IPAF is for MEWPs, but PUWER 1998 Reg 9 requires anyone using or assembling work equipment to be adequately trained, and on construction sites the principal contractor's site rules typically require PASMA card-holders for tower assembly.",
      "Code it on the EICR (C1 immediate danger / C2 potentially dangerous / C3 improvement recommended / FI further investigation). Inform the customer / dutyholder. Recommend remedial action with timescales appropriate to the code. C1 requires immediate action — make safe on the day. The EICR itself is the formal report; it goes to the dutyholder.",
      "Understand the strategic context of maintenance (why different strategies exist for different assets), apply structured analytical techniques (RCA, FMEA, criticality analysis), contribute to continuous improvement, and articulate how maintenance effectiveness is measured and improved — demonstrating the knowledge, skills and behaviours expected of a competent maintenance technician",
    ],
    correctAnswer: 0,
    explanation:
      "Good waste management is just a documented version of common sense. The cost of segregating at source is minor; the cost of mixing hazardous into general (which contaminates the whole load and can result in a hazardous-waste fee for the entire skip plus enforcement action) is serious.",
  },
];

const faqs = [
  {
    question: "Is a domestic homeowner allowed to take their own waste to the tip without a waste carrier licence?",
    answer:
      "A homeowner can take their own household waste to a Household Waste Recycling Centre. They cannot routinely transport other people's waste, even for free, without a Waste Carrier Registration. Your firm's waste from the customer's job is the FIRM's controlled waste, not the customer's household waste — it must go via an authorised carrier with a WTN.",
  },
  {
    question: "Do I personally need a Waste Carrier Licence to drive the firm's van of waste to the tip?",
    answer:
      "The firm needs the licence (Waste Carriers, Brokers and Dealers Registration via the Environment Agency) — usually Lower Tier (free, for builders carrying their own construction waste) or Upper Tier (annual fee, for waste carriers more broadly). The driver doesn't need a personal licence but must be acting on the firm's registration. Check the firm's WCR is current before driving.",
  },
  {
    question: "What happens if I dispose of a small amount of asbestos waste with the general rubble?",
    answer:
      "Multiple offences — Hazardous Waste Regs 2005 (improper hazardous-waste handling), CAR 2012 (improper disposal of asbestos waste), EPA 1990 s.33 (unauthorised deposit if it ends up at a non-permitted facility) and EPA 1990 s.34 (duty-of-care breach). Asbestos waste must be double-bagged, labelled, consigned via a Hazardous Waste Consignment Note and taken to a permitted asbestos-waste facility by a licensed carrier.",
  },
  {
    question: "Are flat-pack lithium batteries (small RCD-test batteries, multimeter cells, etc.) hazardous waste?",
    answer:
      "Yes. Lithium primary and secondary cells are hazardous waste. Battery Regs 2009 require them to be segregated and recycled separately. Most builders' merchants and electrical wholesalers operate take-back stations for waste batteries. Mixing them with general waste is a breach.",
  },
  {
    question: "If my firm hires a skip, does the skip company become responsible for the duty of care?",
    answer:
      "The skip company holds a Waste Carrier Registration and they take the waste away — but the duty of care stays jointly between you (the producer) and them (the next holder). You must keep a Waste Transfer Note from them. If they fly-tip the contents, the trail still leads back to you and the producer can be prosecuted.",
  },
  {
    question: "How does environmental legislation interact with planning consent and Building Regs?",
    answer:
      "Loosely. Pollution and waste are environment-statute territory; planning and Building Regs are separate regimes. But practical overlaps are common: Approved Document L (energy efficiency) drives heat-pump installs that bring F-Gas duties; Approved Document P (electrical safety) drives works that generate WEEE; Building Safety Act creates dutyholder roles that include environmental impact in HRRBs. At L3 you're starting to see how the regimes interlock.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module1-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1 · Subsection 5"
            title="Environmental legislation and waste duty of care"
            description="Remember from L2 — environmental responsibility was the broad framing. At L3 the waste audit trail and the strict-liability of pollution offences are what protect the firm from significant fines and reputational damage."
            tone="emerald"
          />

          <TLDR
            points={[
              'EPA 1990 s.34 is the waste duty of care — strict liability. Producer firm stays on the hook even after waste leaves the site. WTNs (2y retention) and HWCNs (3y) are the audit trail.',
              "Hazardous waste (fluorescent tubes, batteries, solvents, asbestos), WEEE (boards, panels, lighting) and F-Gas (refrigerants) all have separate consignment regimes. Mixing with general waste contaminates the load and is itself an offence.",
              "Pollution incidents (oil to drain, refrigerant release, chemical spill) are strict-liability offences. Reporting to the Environment Agency (England) / SEPA (Scotland) / NRW (Wales) on 0800 80 70 60 (24/7) is mandatory once you're aware.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify roles and responsibilities under EPA 1990 (s.33 unauthorised deposit, s.34 duty of care) and the Environmental Permitting Regs 2016.",
              "State the requirements for Waste Transfer Notes and Hazardous Waste Consignment Notes — content, retention, signatories.",
              "Identify hazardous waste streams encountered in electrical work (fluorescent tubes, batteries, solvents, asbestos, lead-paint waste).",
              "Apply WEEE 2013 segregation and consignment requirements to common electrical waste (DBs, switchgear, lighting, control panels).",
              "Describe the F-Gas Regulation impact on heat-pump and AC work and the certified-personnel requirement.",
              "Describe the ways work activities can affect the environment (water, air, land, noise) and the reporting routes when a hazard arises.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>EPA 1990 — the waste duty of care</ContentEyebrow>

          <ConceptBlock
            title="Strict liability — the duty doesn't transfer with the waste"
            plainEnglish="EPA 1990 s.34 is the waste duty of care. The producer (your firm, when it generates the waste) and every subsequent holder must take all reasonable steps to ensure waste is properly handled. Strict liability — 'I didn't know the cleaner wasn't licensed' isn't a defence. The producer stays on the hook even after the waste is handed over."
            onSite="Practical L3 reflex: every load of waste leaving site has (a) a registered carrier, (b) a Waste Transfer Note, (c) a known destination. £20-cash-with-the-cleaner is a duty-of-care breach for which the firm can be fined unlimited and the carrier can be prosecuted under EPA s.33."
          >
            <p>The four limbs of the s.34 duty:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Prevent unauthorised treatment, keeping or disposal of controlled waste.
              </li>
              <li>
                Ensure waste is transferred only to an authorised person (registered carrier or
                holder of a permit).
              </li>
              <li>
                Ensure waste transfers are accompanied by a written description (WTN).
              </li>
              <li>
                Prevent escape of waste from the producer&apos;s or holder&apos;s control.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Environmental Protection Act 1990 — s.34(1)"
            clause={
              <>
                &quot;Subject to subsection (2) below, it shall be the duty of any person who
                imports, produces, carries, keeps, treats or disposes of controlled waste or, as
                a broker, has control of such waste, to take all such measures applicable to him
                in that capacity as are reasonable in the circumstances — (a) to prevent any
                contravention by any other person of section 33 above; (b) to prevent the escape
                of the waste from his control or that of any other person; and (c) on the
                transfer of the waste, to secure — (i) that the transfer is only to an
                authorised person or to a person for authorised transport purposes; and (ii)
                that there is transferred such a written description of the waste as will enable
                other persons to avoid a contravention of that section and to comply with the
                duty under this subsection as respects the escape of waste.&quot;
              </>
            }
            meaning={
              <>
                The duty stacks on every person who handles the waste — producer, carrier,
                broker, treatment facility. Each must take reasonable steps. The written
                description (WTN) is mandatory for all controlled waste; the Hazardous Waste
                Consignment Note is the equivalent for hazardous waste with stricter content
                requirements.
              </>
            }
            cite="Source: Environmental Protection Act 1990 (1990 c.43), s.34."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Hazardous waste — segregation and consignment</ContentEyebrow>

          <ConceptBlock
            title="Mixing hazardous with general contaminates the load"
            plainEnglish="Hazardous waste (Hazardous Waste Regs 2005) is anything on the European Waste Catalogue (EWC) hazardous list — fluorescent tubes, batteries, solvents, oils, asbestos, lead-paint waste, certain WEEE items. It must be segregated from general waste at source, consigned via a Hazardous Waste Consignment Note (HWCN), and taken to a permitted hazardous-waste facility."
            onSite="The trap: one fluorescent tube tossed in a general skip can re-classify the entire skip as contaminated. The skip company will charge the hazardous-waste rate (often 5-10x general) for the whole load, and the firm has technically committed an offence. Segregation at source — labelled bins, separate stillage for tubes — is the cheap defence."
          >
            <p>Common hazardous wastes on electrical sites:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fluorescent tubes &amp; CFLs</strong> — mercury content. Whole tubes only (don&apos;t crush).</li>
              <li><strong>Batteries</strong> — primary and secondary, all chemistries. Battery Regs 2009.</li>
              <li><strong>Asbestos waste</strong> — double-bagged, labelled, licensed carrier only.</li>
              <li><strong>Lead-paint waste</strong> — pre-1992 housing. Control of Lead at Work Regs 2002.</li>
              <li><strong>Used solvents and degreasers</strong> — capped containers, no mixing.</li>
              <li><strong>Used oil</strong> — transformer oils, hydraulic oils. Oil Storage Regs.</li>
              <li><strong>F-Gas refrigerant cylinders</strong> — F-Gas certified contractor takes them.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Hazardous Waste (England and Wales) Regulations 2005 — Reg 35"
            clause={
              <>
                &quot;A person must not transfer hazardous waste to or accept its transfer from
                another person unless the consignment is accompanied by a consignment note&quot;
                — with prescribed content including waste description, EWC codes, hazard codes,
                quantity, carrier details, producer details, destination, signatures and copy
                retention.
              </>
            }
            meaning={
              <>
                The HWCN is the legal evidence of compliance with hazardous waste handling.
                Three-year retention. Inspectors check HWCNs first when investigating any
                hazardous-waste incident — a missing or incomplete HWCN is itself an offence
                and indicates wider non-compliance. Equivalent regs apply in Scotland (SEPA)
                and Northern Ireland; Wales follows the England regime.
              </>
            }
            cite="Source: Hazardous Waste (England and Wales) Regulations 2005 (SI 2005/894), Reg 35."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>WEEE and F-Gas — electrical-specific environment regs</ContentEyebrow>

          <ConceptBlock
            title="WEEE 2013 — your old DB is not 'general waste'"
            plainEnglish="The Waste Electrical and Electronic Equipment Regulations 2013 cover everything from a stripped-out distribution board to a mains lamp. Producers (manufacturers and importers) have take-back obligations; users have segregation and consignment obligations. Authorised Approved Treatment Facilities (AATF) are the legitimate destination."
            onSite="Practical: every commercial removal job should have a WEEE plan. Where does the old DB / luminaires / control gear go? Most firms use a specialist WEEE recycler who provides skips on demand. Domestic WEEE often goes back via the new-product retailer's take-back scheme."
          >
            <p>F-Gas in brief — increasingly relevant to electricians:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heat-pump installations contain F-Gas refrigerants. Disturbing the refrigerant circuit requires F-Gas Cat I certification.</li>
              <li>Most electricians do the electrical install only and a Cat I-IV certified contractor handles the refrigerant work.</li>
              <li>Leak checks are mandatory on equipment with 5+ tonnes CO2e of F-Gas — typically larger commercial AC.</li>
              <li>Phase-down quotas mean older high-GWP refrigerants (e.g. R404A) are being withdrawn; newer kit uses lower-GWP options.</li>
              <li>F-Gas certified personnel and companies are listed by accredited certification bodies (Refcom, Quidos, others).</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Environmental hazards from work activities</ContentEyebrow>

          <ConceptBlock
            title="Four pathways: water, air, land, noise"
            plainEnglish="Work activities affect the environment through four main pathways. Water — runoff to drains and watercourses. Air — dust, fumes, refrigerants, F-Gas. Land — spills, contamination, fly-tipping. Noise — site disturbance, statutory nuisance. Each has its own regulatory regime; all of them feed back into the producer's duty of care."
            onSite="The L3 dynamic risk assessment should explicitly include the environmental pathway. Where does runoff from drilling go? Where does the dust settle? Is the substrate on contaminated land? Is the noise level reasonable for the time of day under Control of Pollution Act / Environmental Permitting Regs?"
          >
            <p>How to identify and report environmental hazards:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Water</strong> — surface drains, soakaways, watercourses. Block the
                drain with a drain mat / boom before drilling, chasing, refrigerant disturbance.
              </li>
              <li>
                <strong>Air</strong> — dust capture, RPE, F-Gas containment. Methods covered
                under COSHH parallel to environmental pathways.
              </li>
              <li>
                <strong>Land</strong> — spillage kit on the van; contaminated-land alert flagged
                in the dynamic assessment. Decommissioning industrial sites often discovers
                contamination.
              </li>
              <li>
                <strong>Noise</strong> — Control of Pollution Act 1974, Environmental Protection
                Act 1990 Part III statutory nuisance, local authority noise enforcement.
                Particularly relevant for out-of-hours commercial work.
              </li>
              <li>
                <strong>Reporting</strong> — Environment Agency hotline 0800 80 70 60 (24/7) for
                pollution to controlled waters, escape of dangerous substances. SEPA / NRW for
                Scotland / Wales. Local authority for noise and contaminated-land issues.
              </li>
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

          <ContentEyebrow>Asbestos — the regulation that travels with old buildings</ContentEyebrow>

          <ConceptBlock
            title="CAR 2012 sits alongside HASAWA whenever you disturb a pre-2000 building"
            plainEnglish="The Control of Asbestos Regulations 2012 covers any work that may disturb asbestos-containing materials (ACMs) — present in many UK buildings constructed or refurbished before 2000 (some after, where stockpiles were used). Three duties run concurrently: identify (Reg 5 duty to manage in non-domestic premises), assess (Reg 6 risk assessment before work), and manage (Reg 9 plan of work). Licensed work goes to HSE-licensed contractors; some lower-risk work (Notifiable Non-Licensed Work and Non-Notifiable Non-Licensed Work) can be done by competent operatives following a written plan."
            onSite="Practical L3 reflex on any pre-2000 commercial or industrial site: ask for the asbestos register before tools come out. The duty-holder (under Reg 4) must have one. If they don&apos;t, the job stops until either the survey is done or the work is presumed to involve asbestos and the appropriate plan is in place. &quot;We always assume there&apos;s no asbestos&quot; is precisely the assumption that gets prosecuted."
          >
            <p>How asbestos splits across the licensing regime:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Licensed work (HSE-licensed contractor only)</strong> — most sprayed
                coatings, lagging on pipes / boilers, asbestos insulating board (AIB) work.
                14-day prior notification to HSE.
              </li>
              <li>
                <strong>Notifiable Non-Licensed Work (NNLW)</strong> — short-duration work that
                doesn&apos;t need a licence but does need notification to the enforcing
                authority. Records and medical surveillance required.
              </li>
              <li>
                <strong>Non-Notifiable Non-Licensed Work (NNNLW)</strong> — short-duration,
                low-exposure work like removing screwed asbestos cement panels intact, drilling
                a small hole in textured coating with controlled methods. Plan, training and
                control measures still required.
              </li>
              <li>
                <strong>Asbestos awareness training</strong> — Reg 10 mandatory for any worker
                whose work may foreseeably expose them to ACMs. Annual refresher recommended.
              </li>
              <li>
                <strong>Domestic premises</strong> — Reg 5 duty to manage doesn&apos;t apply, but
                Reg 6 risk assessment and the rest of CAR 2012 still applies to the contractor
                doing the work.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Control of Asbestos Regulations 2012 — Reg 5"
            clause={
              <>
                &quot;Every employer must ensure that an exposure assessment is carried out by a
                competent person before any work with asbestos is carried out by an employee of
                that employer or, in the case of work carried out by another person, before that
                work is carried out by that other person.&quot;
              </>
            }
            meaning={
              <>
                CAR 2012 is the asbestos-specific regulation that supplements HASAWA, MHSWR and
                COSHH (asbestos is excluded from COSHH because CAR is the dedicated regime).
                Reg 4 places the duty to manage on the person in control of non-domestic
                premises; Reg 5 requires identification before work; Reg 9 requires a written
                plan of work for any work that may disturb ACMs. The HSE prosecutes asbestos
                breaches harshly because the latency to mesothelioma is long but the outcome is
                fatal — &quot;we didn&apos;t know&quot; isn&apos;t a defence when the survey
                wasn&apos;t commissioned.
              </>
            }
            cite="Source: Control of Asbestos Regulations 2012 (SI 2012/632), Reg 5."
          />

          <SectionRule />

          <ContentEyebrow>Pollution to controlled waters — strict liability</ContentEyebrow>

          <ConceptBlock
            title="Why a small spill to a surface drain becomes a serious offence"
            plainEnglish="The Environmental Permitting (England and Wales) Regulations 2016 make it an offence to cause or knowingly permit a water-discharge activity except under and to the extent authorised by an environmental permit. The Water Resources Act 1991 s.85 created the underlying offence of polluting controlled waters. Both are strict-liability — you don&apos;t need to intend the pollution; you only need to have caused it. &quot;I didn&apos;t mean to&quot; is not a defence; &quot;I took all reasonable steps&quot; can be a partial defence under specific provisions."
            onSite="Practical: any oil, refrigerant, solvent or chemical that ends up in a surface-water drain, soakaway, ditch or watercourse is prima facie an offence. The L3 reflex on arrival is to identify where surface water goes from your work area — drain mat or boom in place before any drilling, refrigerant disturbance or solvent use. Containment is much cheaper than remediation."
          >
            <p>Practical containment kit on a typical electrician&apos;s van:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Drain mats</strong> — flexible polymer mats that seal over surface
                drains. Deploy before any liquid risk activity.
              </li>
              <li>
                <strong>Absorbent booms / pads</strong> — for spilt oils, refrigerant condensate,
                degreasers. Spill kit replenished regularly.
              </li>
              <li>
                <strong>Spill containment trays</strong> — for under-equipment work where leaks
                may occur (transformer oil, hydraulic systems).
              </li>
              <li>
                <strong>Dedicated spill kit</strong> — labelled bag with absorbent, gloves,
                bags, instructions. Stored where accessible from the van.
              </li>
              <li>
                <strong>Reporting numbers</strong> — Environment Agency 0800 80 70 60 (England),
                SEPA 0800 80 70 60 (Scotland), NRW 0300 065 3000 (Wales). All 24/7.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Oil storage and the OSR 2001</ContentEyebrow>

          <ConceptBlock
            title="The regulation that catches generators, transformer oils and standby fuel"
            plainEnglish="The Control of Pollution (Oil Storage) (England) Regulations 2001 require oil stored above ground in containers of more than 200 litres (commercial / industrial / institutional sites; lower threshold for domestic close to controlled waters) to be in a secondary containment system (bund) sized to at least 110% of the primary container. Applies to fuel for generators, standby plant, heating oil, transformer oils. Equivalent regs in Scotland (CAR 2017) and proposed for Wales."
            onSite="At L3 you&apos;ll meet OSR most often on commercial generator installs, standby plant for HRRBs, fuel tanks for site welfare cabins. The bund and the fill-point control are the two things to check during install or commissioning. A generator delivered without proper bunding is non-compliant on day one and the firm carries the duty as installer."
          >
            <p>Key OSR 2001 requirements at install / inspection:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Secondary containment</strong> — bund sized to 110% of the largest
                container (or 25% of total capacity if multiple containers). No drains or
                outlets penetrating the bund unless lockable closed.
              </li>
              <li>
                <strong>Fill point</strong> — within the bund, or with appropriate spill
                containment if external.
              </li>
              <li>
                <strong>Above-ground sight gauges and vents</strong> — must terminate within
                the bund.
              </li>
              <li>
                <strong>Drip trays under valves and connections</strong> — where applicable.
              </li>
              <li>
                <strong>Distance from controlled waters</strong> — closer locations require
                additional containment.
              </li>
              <li>
                <strong>Inspection and maintenance</strong> — the system needs to remain
                effective over time; periodic check is a Reg 4(2) EAWR / OSR maintenance duty.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Site Waste Management Plan — the practitioner&apos;s tool</ContentEyebrow>

          <ConceptBlock
            title="SWMPs aren&apos;t mandatory any more, but the discipline still applies"
            plainEnglish="The Site Waste Management Plans Regulations 2008 were repealed in 2013, but most large clients and main contractors still require an SWMP-style document for projects above a defined value (typically £300k+). The discipline is the same: plan the waste streams before work starts, track what goes where, retain WTNs / HWCNs, report at the end. EPA 1990 s.34 duty of care is still strict liability — the SWMP is the firm&apos;s evidence the duty was discharged."
            onSite="At L3 on a small job the &quot;SWMP&quot; is a few notes in the job pack — what waste streams are expected, where they&apos;ll go, who&apos;s the carrier, what the WTN reference will be. On a larger commercial fit-out the firm&apos;s SWMP is a formal document the contractor produces as part of the construction phase plan. Either way the waste audit trail follows the same logic."
          >
            <p>Waste streams to plan for on a typical electrical project:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>General construction waste</strong> — plastics, broken accessories,
                packaging. WTN required; standard skip route.
              </li>
              <li>
                <strong>Metal recycling stream</strong> — copper offcuts, brass, steel
                back-boxes. Often returned for cash via a registered scrap dealer; WTN still
                required.
              </li>
              <li>
                <strong>WEEE</strong> — old DBs, switchgear, lighting, drivers. Segregated;
                AATF disposal route.
              </li>
              <li>
                <strong>Hazardous</strong> — fluorescent tubes, batteries, solvents, lead-paint
                waste. HWCN; permitted hazardous facility.
              </li>
              <li>
                <strong>Cardboard / packaging</strong> — separate stream where volume justifies;
                often clients require this for their own EMS reporting.
              </li>
              <li>
                <strong>Asbestos (where present)</strong> — separate licensed-carrier route;
                double-bagged, labelled, HWCN.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Mixing fluorescent tubes into the general skip"
            whatHappens={
              <>
                Strip-out job, 40 fluorescent tubes from a commercial ceiling. Apprentice
                tosses them into the general skip alongside the cement waste &quot;to save
                stillage space&quot;. Skip company arrives, spots the tubes, charges the
                hazardous-waste rate for the WHOLE load (£800 vs £80 normal), and refuses
                to certify the load as non-hazardous. Firm reports the incident internally;
                Environment Agency notification considered because the ad-hoc disposal
                breached duty of care. Firm fined and the next contract has the loss
                deducted.
              </>
            }
            doInstead={
              <>
                Segregate at source. Have a labelled WEEE / hazardous stillage on every
                strip-out. Whole tubes only (no crushing — releases mercury). HWCN with
                EWC code 200121* (fluorescent tubes and other mercury-containing waste).
                Five minutes of segregation saves four-figure cleanup costs.
              </>
            }
          />

          <CommonMistake
            title="Treating refrigerant disturbance as 'just gas'"
            whatHappens={
              <>
                Apprentice on an electrical strip-out cuts a refrigerant line on a
                supposedly-decommissioned AC unit; releases ~2kg of HFC R410A to atmosphere.
                Not F-Gas certified. Firm has committed an F-Gas Reg breach (uncertified
                handling), an environmental release (Schedule 5 substance), and a HASAWA
                s.7 personal duty breach (work outside competence). Penalties stack across
                F-Gas regulator (Environment Agency), HSE and the firm&apos;s own
                certification scheme.
              </>
            }
            doInstead={
              <>
                Anything that looks like AC, heat-pump, refrigeration kit — STOP. Do not
                disturb the refrigerant circuit unless F-Gas certified. Bring in an F-Gas
                certified contractor to safely recover the refrigerant before the
                electrical strip-out. The dynamic risk assessment must flag F-Gas
                equipment.
              </>
            }
          />

          <Scenario
            title="The skip the customer wants you to share"
            situation={
              <>
                You&apos;re finishing a commercial small-power install in a shared office
                building. The customer says &quot;just chuck your offcuts in our general
                skip out the back, save you a tip run&quot;. The skip is hired by another
                firm doing partition work, signed in their name. You&apos;ve got: copper
                cable offcuts, broken back-boxes, plastic conduit offcuts, two small
                fluorescent tubes from a quick lighting swap, and an old RCBO from a
                replacement.
              </>
            }
            whatToDo={
              <>
                Politely decline. Your waste isn&apos;t the customer&apos;s general
                building waste — it&apos;s your firm&apos;s controlled waste under EPA
                1990 s.34. The skip is signed under another firm&apos;s WCR; they&apos;re
                the holder, not your firm, but the duty-of-care chain breaks if you tip in
                without your own WTN. The fluorescent tubes and the RCBO are hazardous /
                WEEE and don&apos;t belong in a general skip in any case. Take everything
                back to the firm&apos;s yard for proper segregation: copper to scrap-metal
                stream (cash if you&apos;re lucky), back-boxes and conduit to general
                construction waste with WTN, fluorescent tubes to hazardous stillage with
                HWCN, RCBO to WEEE stillage. None of this takes long; all of it is
                defensible.
              </>
            }
            whyItMatters={
              <>
                The &quot;just chuck it in our skip&quot; offer is the most common way
                duty-of-care goes wrong. The skip arrangement is between the partition
                firm and the skip company; your waste isn&apos;t inside that arrangement.
                If the skip is later inspected and found to contain hazardous items, the
                partition firm gets the immediate hit but the trail back to your firm
                still exists. Inspectors and skip-company staff are trained to spot
                contamination. The cost of taking your own waste back is one tip run; the
                cost of the contamination event is potentially thousands.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Remember from L2 — environment was the broad framing. At L3 the depth is the strict-liability nature of EPA s.33/s.34 and the audit-trail discipline.",
              "EPA 1990 s.34 waste duty of care is strict liability. Producer firm stays on the hook even after waste leaves the site. Authorised carrier + WTN for every load.",
              "Hazardous waste (fluorescent tubes, batteries, solvents, asbestos, lead-paint waste) needs segregation, HWCN consignment and licensed disposal facility. Mixing contaminates the whole load.",
              "WEEE 2013 covers DBs, switchgear, control panels and lighting. Segregate, consign via authorised carrier, deliver to AATF (Authorised Approved Treatment Facility).",
              "F-Gas: heat pumps and AC contain F-Gas refrigerants. Disturbing the refrigerant circuit requires F-Gas Cat I-IV certification. Most electricians don't hold it; bring in a certified contractor.",
              "Pollution incidents are strict-liability offences. Once aware, you must act: contain, report (Environment Agency 0800 80 70 60 in England, 24/7), document.",
              "Good waste management = segregation at source, authorised carriers, WTN/HWCN audit trail, retention (2y WTN / 3y HWCN). The cost of doing it right is small; the cost of getting it wrong is unlimited fines.",
              "Reporting environmental hazards is required under MHSWR Reg 14, EPA duty of care, and the Polluter Pays principle. ERA 1996 s.44 protects you from detriment for raising the concern.",
            ]}
          />

          <Quiz title="Environmental legislation and waste — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section1-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.4 RIDDOR, PUWER, COSHH, LOLER
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section1-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.6 HSE, FFI and the enforcement system
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
