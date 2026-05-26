/**
 * Module 4 · Section 2 · Subsection 2 — PPE for different tasks
 * Maps to City & Guilds 2365-02 / Unit 204 / LO2 / AC 2.2
 *   AC 2.2 — "Identify PPE for different tasks"
 *
 * Frame: PPE is the LAST line of defence in the hierarchy of control.
 * Eliminate, substitute, engineering controls, admin controls, then PPE.
 * Pick PPE by the task — not by what's in the van.
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

const TITLE = 'PPE for different tasks (2.2) | Level 2 Module 4.2.2 | Elec-Mate';
const DESCRIPTION =
  'Choosing PPE that matches the task — drilling masonry, cable pulling, live testing, working at height, hot work. PPE is the last line in the hierarchy of control, not the first.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod4-s2-sub2-hierarchy',
    question:
      "Why is PPE described as the LAST line of defence in the HSE's hierarchy of control?",
    options: [
      "Refuse. Reg 543.3.2 requires every connection or joint in a protective conductor to be accessible for inspection, testing and maintenance. A junction box buried in a wall void is not accessible. The right answer is to fit a continuous run by going back to the wholesaler for a longer length, or by terminating both ends at an accessible MJB inside the meter cabinet.",
      "It catches a voltage indicator that failed silently between step 3 (prove before) and step 6 (test for dead). If the indicator broke after step 3, the \\\\\\\\\\\\\\\"dead\\\\\\\\\\\\\\\" reading at step 6 was unreliable; the step 7 re-prove confirms the indicator was still working when step 6 happened.",
      "Because PPE protects only the wearer (and only when worn correctly), it relies on the operative remembering, fitting and inspecting it, and it doesn't reduce the hazard itself. The hierarchy puts elimination, substitution, engineering controls and administrative controls ahead of PPE because each of those reduces the risk for everyone in the area without depending on individual behaviour.",
      "Section 702 of BS 7671 — extensive supplementary bonding inside Zone 0, 1 and 2 around the pool (between the pool liner reinforcement, surrounding metalwork, ladders, lighting frames etc.) and tighter restrictions on equipment in each zone. Supplementary bonding generally cannot be omitted in pool zones — the wet skin / immersed body risk is far higher than a domestic bathroom.",
    ],
    correctIndex: 2,
    explanation:
      "The hierarchy is set out in Schedule 1 of MHSWR 1999 — eliminate, substitute, engineering controls (e.g. dust extraction), admin controls (e.g. work rotation), then PPE. PPE Regulations 1992 (as amended 2022) Reg 4 reinforces this — the employer must provide suitable PPE to employees who may be exposed to a risk to their health or safety while at work, EXCEPT where and to the extent that such risk has been adequately controlled by other means which are equally or more effective. PPE is what's left when you've exhausted the other controls.",
  },
  {
    id: 'mod4-s2-sub2-chasing',
    question:
      "You're about to start chasing a vertical channel into a sand-and-cement plastered wall to drop a 2.5 mm² T&E to a new socket. Walk-round done. What's the minimum PPE before you switch the chaser on?",
    options: [
      "FFP3 dust mask (sand-and-cement chasing produces respirable crystalline silica), eye protection (impact-rated, Z87 / EN 166 F or higher), hearing protection (chasers run at 95-105 dB), cut-resistant gloves (debris and the chaser wheel), and ideally on-tool dust extraction (Class M for masonry dust). Boots and hi-vis are baseline site PPE on top of the task PPE.",
      "A culture in which near-misses are reported, analysed, learned from and used to improve the system. Typically supported by no-blame reporting, structured analysis (e.g. 5-whys), feedback to the team, and visible changes in practice. Heinrich\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s pyramid frames near-misses as the leading indicator of major incidents.",
      "Accountability structures are important because EI development involves changing habitual patterns, which is difficult without external support. An effective structure might include: a development partner (colleague or mentor who checks in regularly), a reflective journal (tracking specific incidents and responses), regular self-assessments, and scheduled review points to evaluate progress against goals",
      "It brings DC isolation requirements, additional DC overcurrent protection, fire-segregation considerations and (for grid-tied operation) the same G98/G99 anti-islanding requirements that apply to the PV inverter — typically all wrapped up by a hybrid inverter that handles PV plus battery.",
    ],
    correctIndex: 0,
    explanation:
      "Respirable crystalline silica is now an HSE priority and the workplace exposure limit is being kept under review. Chasing brick or sand-and-cement plaster generates fine silica dust that causes silicosis, COPD and lung cancer. FFP3 is the bare minimum and engineering controls (on-tool extraction) should be in place where reasonably practicable. The combination of dust + noise + impact debris is why chasing has the heaviest PPE load of any common electrician task short of live work.",
  },
  {
    id: 'mod4-s2-sub2-fit',
    question:
      "Your colleague has a beard and is wearing a disposable FFP3 mask while chasing. Why is that a serious problem?",
    options: [
      "PV output is roughly proportional to the irradiance hitting the panel (W/m²). Cell efficiency does drop slightly as the cells heat up — typically 0.3-0.5% per °C above 25°C — but UK roofs rarely sit above 50°C and the irradiance variation between a sunny and cloudy day is far larger than the temperature derate. So total annual yield (kWh) is dominated by how much sunlight the array sees, not how warm it is.",
      "It's a generic template-trap. The RAMS hasn't been tailored to this site, the actual hazards aren't listed, and the controls are too vague to be useful. MHSWR 1999 Reg 3 requires the assessment to be 'suitable and sufficient' — generic boilerplate is the opposite of that. Raise it with the supervisor before signing, ask for site-specific content, and don't start work on the basis of the generic version.",
      "Disposable filtering facepiece masks rely on a tight face seal to filter the air. Facial hair (stubble or beard) inside the seal area allows leakage past the seal — typically 10-20% of inhaled air bypasses the filter. The mask is no longer providing the rated protection. INDG479 (HSE guidance on RPE fit testing) is explicit that disposable masks are not suitable for bearded workers — they need a powered air-purifying respirator (PAPR) with a loose-fitting hood.",
      "LFP has a much higher thermal runaway threshold (around 270 degC vs around 150 degC for NMC) and a flatter, safer failure mode. In a fault scenario LFP releases far less energy and far less toxic gas. Energy density is lower (kWh per kg), so an LFP pack is physically larger than an NMC pack of equivalent capacity, but for a domestic wall-mounted unit space is rarely the binding constraint and the safety margin is worth the size penalty. UK insurers and the IET Code of Practice for Electrical Energy Storage Systems both lean strongly toward LFP for indoor domestic installations.",
    ],
    correctIndex: 2,
    explanation:
      "RPE fit-testing under INDG479 is mandatory for tight-fitting masks (HSG53 puts the duty on the employer). A bearded worker cannot pass a face-fit test on a disposable FFP3 — there is no fix short of shaving or switching to a PAPR. Allowing a bearded worker to use a disposable mask is a breach of the COSHH Regulations 2002 Reg 7 (control of exposure) AND of PPE Regs 1992 Reg 4 (suitable PPE) because the PPE is not suitable for the user. It also voids the manufacturer's stated protection rating.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What does 'the hierarchy of control' refer to in the context of selecting PPE?",
    options: [
      "Most career-focused electricians start the 2391-52 within 12-18 months of AM2 — long enough to consolidate site experience but soon enough to keep momentum on qualifications. Earlier than that is technically possible but the practical content is easier to absorb after some installation experience. Later than that risks losing study habit and falling behind peers in pay and progression.",
      "The order in which the HSE expects risks to be controlled — eliminate the hazard first, then substitute with something less dangerous, then engineering controls (extraction, guards, RCDs), then administrative controls (work rotation, signage, training), and only then PPE. PPE is the last line because it depends on individual behaviour and only protects the wearer.",
      "True adaptability requires actively regulating emotional resistance to change, maintaining effectiveness during ambiguity, proactively seeking new approaches, and flexing strategies without losing core values — it is an emotionally regulated, intentional process, not passive compliance",
      "Safeguarding. Children are present during term time, which restricts when work can be done, requires DBS-checked operatives for any work where unsupervised contact with pupils is foreseeable, and adds rules around photography, conversation and movement around the building. Most major electrical work in schools is done during holidays for exactly this reason. The school's safeguarding lead is a key contact during prep.",
    ],
    correctAnswer: 1,
    explanation:
      "The hierarchy is in Schedule 1 of MHSWR 1999 (the 'principles of prevention'). PPE is at the bottom of the list deliberately — it's the control with the highest residual risk because it depends on the operative remembering, fitting and inspecting it correctly. Reaching for PPE before considering the controls above it in the hierarchy is one of the most common audit findings.",
  },
  {
    id: 2,
    question:
      "Under the Personal Protective Equipment at Work Regulations 1992 (as amended 2022) Reg 4, when must an employer provide PPE?",
    options: [
      "Identifying ways to deliver the required functionality and quality at lower cost — alternative materials with equivalent performance, alternative installation methods, alternative design approaches. Done collaboratively with the client / design team. Different from corner-cutting (which reduces quality).",
      "The person or persons holding responsibility for the structure and exterior of an HRRB during occupation. Where there are multiple APs (e.g. block of flats with structure owned by one entity and external walls by another), the Principal Accountable Person is the one with the most significant responsibility for the structure.",
      "When the worker may be exposed to a risk to their health or safety while at work, EXCEPT where and to the extent that the risk has been or will be adequately controlled by other means which are equally or more effective. The 2022 amendment also extended the duty to cover limb (b) workers (some categories of casual / gig workers) as well as employees.",
      "It establishes BS 7671 as a means of demonstrating compliance with EAWR — meaning a court will treat following BS 7671 as strong evidence of having met the EAWR duty, and ignoring it as strong evidence of not having met it. BS 7671 itself remains non-statutory.",
    ],
    correctAnswer: 2,
    explanation:
      "The 2022 amendment (in force 6 April 2022) extended the regulations to cover limb (b) workers — broadly anyone who personally performs work for the employer and isn't a client of theirs. Before the amendment only employees in the strict sense were covered. The substantive PPE duty (Reg 4) still has the same wording — provide suitable PPE unless the risk is controlled by other means.",
  },
  {
    id: 3,
    question:
      "Which PPE category covers most electrical-installer hand protection — and what's the key consideration when choosing the right glove?",
    options: [
      "Customer personal data (names, addresses, phone numbers, photos of their property), commercially sensitive information (the firm's pricing strategy, supplier discounts, employee salaries), and anything covered by a customer's NDA on commercial sites. The policy applies whether you're at work, in the pub, or on social media — the duty is on the data, not the location.",
      "The EPC should be re-issued to reflect the new performance — heat pump, PV, MVHR, insulation upgrades all change the SAP rating. The MCS-certified installer normally arranges the EPC update. An updated EPC matters for: (a) future house sale (the buyer's solicitor sees current performance); (b) mortgage applications (lenders increasingly weight EPC ratings); (c) insurance (some insurers now adjust premium for low-EPC properties); (d) BUS grant requires a valid EPC at the time of install. EPCs are valid for 10 years from issue.",
      "The inspector based on the installation type, condition, use, environment, and any defects identified — drawing on GN3 frequency tables as a starting point and adjusting for the specific installation. A property in good condition might justify the standard 5-year interval; one with multiple recent defects might justify a shorter cycle.",
      "Category II — intermediate risk, covers most cut/abrasion-resistant work gloves used for cable pulling, cable cutting, masonry handling. The key is matching the cut resistance level (EN 388 marking — A to F for cut, plus puncture, abrasion and tear ratings) to the actual task. A glove rated for general handling is not the right glove for cutting steel cable tray, and a heavily armoured glove makes fine termination work impossible.",
    ],
    correctAnswer: 3,
    explanation:
      "PPE is grouped into three categories under the EU/UK regulations: Category I (minimal risk — sun, gardening), Category II (intermediate — most general work PPE), Category III (complex / serious risk — voltage-rated gloves, fall arrest, RPE protecting against gases). EN 388 is the cut/abrasion standard; the marking on the glove tells you the resistance levels. Picking by EN rating against the task is what makes the choice defensible.",
  },
  {
    id: 4,
    question:
      "When are voltage-rated insulating gloves (Class 0, Class 1, Class 2 etc.) actually required?",
    options: [
      "Only when work has to be carried out on or near LIVE conductors and live work has been specifically authorised under EAWR 1989 Reg 14 (which itself requires specific justification — the work cannot reasonably be done dead, the operative is competent, suitable precautions are in place). For dead working — which is the default for almost all installation work after safe isolation — voltage-rated insulating gloves are not the relevant PPE.",
      "Significant. A south-facing roof at 30-40° pitch is the optimal UK orientation, posting 100% of reference yield. East-facing or west-facing roofs typically produce 80-85% of optimal. North-facing produces 50-65% (still positive but with much longer payback). Steeper pitches favour winter performance; shallower pitches favour summer performance. Flat roofs get an A-frame mount to set a target pitch and azimuth. The MCS Yield Calculator handles all of this — produces the kWh figure for the SAP and the customer handover.",
      "Part 4, Chapter 41, Section 411, sub-section 3, regulation 4. So it lives in Part 4 (protection for safety), Chapter 41 (protection against electric shock), Section 411 (protective measure: automatic disconnection of supply), sub-section 411.3 (additional protection), regulation 411.3.4 (RCD on luminaires in domestic premises). The numbering encodes the location.",
      "Your JIB grade and ECS card go with you — they're tied to you, not to the employer. The new employer will accept your existing grade and pay you the corresponding JIB rate (assuming they're a JIB-graded firm). If you move to a non-JIB firm your contract with them might pay above or below JIB rates by mutual agreement, but your grade is still recorded with JIB.",
    ],
    correctAnswer: 0,
    explanation:
      "EAWR 1989 Reg 14 makes live work the exception, not the rule. Voltage-rated gloves are PPE for live work — Class 0 to 4 referenced to the system voltage they're rated against. Most installation work is done dead following safe isolation, in which case the relevant gloves are mechanical-protection (cut/abrasion) gloves, not insulating gloves. Wearing voltage-rated gloves on dead work isn't dangerous, but it isn't required and they wear out faster on rough work.",
  },
  {
    id: 5,
    question:
      "You're about to use a 110V chop saw to cut a length of galvanised steel cable tray. The walk-round is done. What PPE combination is required for this single task?",
    options: [
      "No — the STR is the regulatory document. The instrument download is a useful audit trail and a way to capture test data at the point of testing, but the completed STR with all required fields and signatures is what satisfies Reg 642.4 and Section 644. Most professionals use the download to populate the STR rather than as a standalone replacement.",
      "Eye protection (impact-rated, EN 166 F minimum — chop saws produce hot metal sparks at speed), hearing protection (chop saws regularly exceed 100 dB), cut-resistant gloves (sharp edges on the cut tray), respiratory protection if cutting indoors with no extraction (galvanised steel coating produces zinc oxide fume at cutting temperature — the cause of metal-fume fever, sometimes called 'zinc shakes'), and sturdy boots with toe protection. Long sleeves to protect arms from sparks.",
      "An earth-loop tester is a dedicated instrument (Megger LRCD-M, Kewtech KT200) that measures earth fault loop impedance ONLY — typically faster, more accurate at low impedance values, and with higher injected test current than the EFLI function on a general MFT. Used by 2391 / 2394 testers and by commissioning engineers who need to verify many EFLI values quickly. The MFT's EFLI function is fine for L3 fault-diagnosis use; dedicated loop testers are improver-level kit.",
      "Partnership = two or more people trading together without forming a Ltd company. Partnership is governed by the Partnership Act 1890 (very old statute). Each partner has unlimited personal liability for partnership debts including those incurred by other partners. Tax: each partner files Self Assessment on their share of profits. Less common than sole trader (one-person) or Ltd (limited liability) because you get unlimited liability AND have to share decisions with another partner.",
    ],
    correctAnswer: 1,
    explanation:
      "Chop sawing tray is a multi-hazard task — debris + noise + sharp edges + zinc oxide fume (galvanised). Each hazard demands its own PPE. The fume risk is often missed because the operative is focused on the spark and noise. Cutting galvanised steel indoors without extraction or RPE has been linked to metal-fume fever (the 'zinc shakes') and chronic respiratory problems. Doing this work outdoors or with local exhaust ventilation (engineering control) is the better option above PPE.",
  },
  {
    id: 6,
    question:
      "An apprentice arrives on site without their hi-vis vest because they forgot it in the van. The site rule says hi-vis is mandatory. What should they do?",
    options: [
      "A loose terminal was not gas-tight, oxidisation built up at the contact face over weeks, contact resistance climbed, the joint heated under any current draw, the heat softened the terminal screw and conductor, and the connection failed mechanically. Reg 526.1 (durable electrical continuity and adequate mechanical strength) failure.",
      "Free smartphone app from Lighthouse Construction Industry Charity providing wellbeing resources, helpline access, financial planning tools, mental health self-help content, and signposting to support services. Designed for construction workers; quick access to crisis helpline if needed. Available on App Store and Google Play.",
      "Stop. Either fetch the hi-vis from the van, borrow a spare from the site office (most large sites keep loaners), or step off site until properly equipped. Working without required PPE is a breach of HASAWA s.7 (failure to co-operate with the employer's safety arrangements) AND a breach of CDM 2015 Reg 15 (worker's duties). It's also a fast way to get sent home by the principal contractor and recorded against the firm's safety performance.",
      "The diary is the source from which NVQ portfolio entries are written up. The portfolio needs evidence of competence against specific units and learning outcomes — circuit installs, fault-finding, testing, customer interaction. The diary is where the contemporaneous record of those activities lives, with the level of detail needed to write up a portfolio entry months later. Portfolio entries written from a thin diary tend to be thin themselves.",
    ],
    correctAnswer: 2,
    explanation:
      "Hi-vis on a construction site is administrative + PPE — it makes the wearer visible to plant operators and other trades. Skipping it is a textbook s.7 breach. The fix is procedural — fetch, borrow or step off — not 'work around it'. Small breaches like this are how a firm's safety culture either holds up or falls apart, and inspectors specifically look for them on routine site visits.",
  },
  {
    id: 7,
    question:
      "Why does the PPE Regulations require employees to inspect their PPE before each use, and what should they do if they find damage?",
    options: [
      "Near-misses are the leading indicator of serious incidents. The HSE's accident triangle (and similar industrial-safety models) consistently shows that for every serious incident there are dozens or hundreds of near-misses with similar root causes that didn't quite escalate. Investigating and acting on near-misses is the most effective way to prevent the serious incident. Failing to report a near-miss leaves the same defect in place for the next person — who may not be as lucky.",
      "Wide investigative powers — enter any premises (without warrant) at any reasonable time, take measurements / photographs / samples, inspect documents, require people to answer questions, take statements, take possession of articles or substances they think pose a risk, and seek a magistrate's warrant if entry is refused. Failure to co-operate is itself a separate criminal offence under s.33.",
      "Pregnancy and maternity (s.18). The Act prohibits unfavourable treatment of women because of pregnancy or maternity leave during the 'protected period' (broadly, from the start of pregnancy to the end of maternity leave). This is a separate category to sex discrimination — pregnancy / maternity claims don't need a male comparator. It's one of the most enforced parts of the Act and a leading source of Employment Tribunal awards.",
      "PPE Regs Reg 7 places a duty on the employer to maintain (and replace) PPE. The corresponding duty on the employee under Reg 10 is to use the PPE in accordance with training and to report any loss of, or obvious defect in, the PPE. Damaged PPE doesn't provide the rated protection — a cracked safety glass lens, a dust mask with a broken strap, a hi-vis with the reflective material peeling off — all need to be taken out of service and replaced before use.",
    ],
    correctAnswer: 3,
    explanation:
      "PPE Regs split the maintenance duty between Reg 7 (employer) and Reg 10 (employee). The employee inspection is the day-to-day check; the employer's wider regime covers cleaning, replacement schedules and storage. Continuing to use damaged PPE breaches both regs and any post-incident investigation will use the damaged item as direct evidence of breach.",
  },
  {
    id: 8,
    question:
      "Hot work — using a gas torch to make a soldered joint on a copper bonding tail to a water pipe. What PPE and additional controls do you need beyond the standard install kit?",
    options: [
      "Leather (heat-resistant) gloves rather than synthetic, eye protection rated for thermal hazards (EN 166 with thermal-hazard marking is preferable), long sleeves of natural fibre (synthetics melt onto skin), a fire blanket or extinguisher within arm's reach, and clearance of combustible materials from the work area. On commercial premises a hot-works permit is usually required as an admin control on top of the PPE — see Sub 5 of this section.",
      "Approved Electrician is a competence grade — the JIB grade above Electrician, awarded after AM2 plus experience and CPD. Mentor is a role — an experienced electrician (usually Approved or above) who is formally allocated to support a specific apprentice through portfolio, on-site learning and the AM2. The same person is often both.",
      "Reg 14(2) requires every employee to inform their employer (or any other employee with specific responsibility for safety) of any work situation which they reasonably consider represented a serious and immediate danger to health and safety, AND any matter which they reasonably consider represented a shortcoming in the employer's protection arrangements for health and safety. The duty extends to near-misses, defective safe systems of work, and any condition the employee believes presents danger.",
      "Capability to handle the 10/350 microsecond impulse waveform — partial direct-lightning current. Required at the installation origin where the building has an external lightning protection system (LPS) per BS EN 62305-3 or where direct-strike risk to the supply exists. Higher Iimp rating, higher Up than Type 2 / 3.",
    ],
    correctAnswer: 0,
    explanation:
      "Hot work has its own controls because the consequence (fire) extends well beyond the moment of the work — a smouldering ember can ignite hours later. PPE is layered with admin controls (hot-works permit, fire watch for 30-60 minutes after work ceases) and engineering controls (clearance of combustibles, fire blanket on the substrate). On modern installs the soldered earth bond is being replaced by clamp-on connections precisely to design out the hot-work risk.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Do I have to pay for my own PPE?",
    answer:
      "No. PPE Regs Reg 4 places the duty on the employer to PROVIDE suitable PPE — and Reg 9(3) explicitly prohibits the employer from charging for PPE that is provided to comply with the regulations. Specialist branded items beyond the regulatory minimum (premium-brand boots, designer shades) are a different conversation, but the working PPE you need to do the job safely is the employer's cost.",
  },
  {
    question: "If I'm a self-employed sub-contractor on a site, who provides my PPE?",
    answer:
      "You do — for your own. The 2022 amendment to the PPE Regulations extended the employer-provision duty to limb (b) workers, but a self-employed person who runs their own business is responsible for their own PPE. On a CDM site the principal contractor may impose site-specific PPE requirements (e.g. high-vis, helmet, glasses), and you have to meet those at your own cost.",
  },
  {
    question: "How often does PPE need to be replaced?",
    answer:
      "PPE Regs Reg 7 requires the employer to maintain PPE in good repair and efficient working order, including replacement when needed. There is no fixed schedule — it depends on the item and the use. Disposable masks: single-shift typically. Safety glasses: when scratched or damaged. Helmets: per manufacturer (often 3-5 years from manufacture date stamped inside, replaced sooner if struck). Boots: when sole worn, toe cap exposed or upper damaged. The pre-use inspection is what catches the right moment.",
  },
  {
    question: "Why does the rated protection on a mask depend on me being clean-shaven?",
    answer:
      "Tight-fitting RPE relies on a face seal. Stubble or beard in the seal area allows leakage past the filter — the air bypasses the protection. INDG479 (HSE guidance on RPE fit testing) and HSG53 are explicit that bearded workers cannot use disposable FFP1/2/3 masks or any other tight-fitting mask. The alternative is a powered air-purifying respirator (PAPR) with a loose-fitting hood, which doesn't rely on a face seal.",
  },
  {
    question: "What's the difference between EN 388 cut levels A-F and the older 1-5 scale?",
    answer:
      "The 1-5 scale (EN 388:2003) used a coup test that gave inconsistent results for high-cut materials. The A-F scale (EN 388:2016, ISO 13997) uses the TDM-100 test, which applies a known force to a sharp blade and measures the distance to cut-through. The two scales aren't directly equivalent — a glove can carry both ratings during the transition period. For electrical-installer cut hazards (cable, tray edges, snips) levels B-D on the new scale cover most general work; level E-F is for heavy steel handling.",
  },
  {
    question: "Is a hi-vis vest PPE in the formal sense?",
    answer:
      "Yes — it falls under PPE Regs as it protects the wearer from a risk (being struck by a vehicle or plant by not being seen). It also has its own product standards (EN ISO 20471 for high-visibility clothing, with classes 1-3 by amount of reflective and fluorescent material). On a construction site Class 2 is typical for daytime, Class 3 for night work or roadside work. The colour (yellow or orange) is dictated by visibility against the working background — both are acceptable under EN ISO 20471.",
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
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · Subsection 2"
            title="PPE for different tasks"
            description="Choosing PPE that matches the task — drilling masonry, cable pulling, live testing, working at height, hot work. PPE is the last line of defence in the hierarchy of control, not the first."
            tone="emerald"
          />

          <TLDR
            points={[
              "PPE is the LAST line of defence in the hierarchy of control. Eliminate, substitute, engineering controls, admin controls, then PPE. Reaching for PPE before considering the controls above it is the most common audit finding.",
              "Pick PPE by the task — not by what's in the van. Chasing masonry, cable pulling, live testing and hot work each demand a different PPE combination.",
              "Tight-fitting RPE (FFP3 dust masks) only works on a clean-shaven face — INDG479 fit-testing rules apply. Bearded workers need a powered air-purifying respirator with a loose-fitting hood.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the hierarchy of control under MHSWR 1999 Schedule 1 and explain why PPE sits at the bottom.",
              "State the duties of the employer under PPE Regulations 1992 (as amended 2022) Reg 4 (provide suitable PPE) and Reg 9(3) (no charge to the worker).",
              "State the duties of the employee under PPE Regulations Reg 10 to use PPE per training and report defects.",
              "Match PPE to the specific task — drilling masonry, cable pulling, live testing, working at height, hot work.",
              "Recognise the limits of disposable filtering facepiece masks and the role of fit-testing under HSE INDG479 / HSG53.",
              "Carry out a pre-use inspection of safety glasses, gloves, hi-vis, hard hat and RPE before commencing work.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Where PPE sits in the safety system</ContentEyebrow>

          <ConceptBlock
            title="The hierarchy of control — why PPE is at the bottom"
            plainEnglish="The HSE expects risks to be controlled in a fixed order. Eliminate the hazard first (don't do the dangerous task at all). Substitute with something less dangerous. Engineering controls (dust extraction, guards, RCDs). Administrative controls (work rotation, signage, training). Only then PPE. PPE is last because it depends on the operative remembering, fitting and inspecting it — and it only protects the wearer, not anyone else in the area."
            onSite="The first question on any task is 'can I avoid doing this dangerous thing?' (eliminate). Then 'can I do it a less dangerous way?' (substitute). Then 'can I add an engineering control?' (e.g. on-tool dust extraction for chasing). Then 'is there an admin control that helps?' (e.g. work rotation to reduce noise exposure). Only when those have been worked through does the question become 'what PPE do I need?'."
          >
            <p>
              The hierarchy as set out in Schedule 1 of MHSWR 1999:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Avoid risks (eliminate the hazard).
              </li>
              <li>
                Evaluate the risks that cannot be avoided.
              </li>
              <li>
                Combat the risks at source.
              </li>
              <li>
                Adapt the work to the individual.
              </li>
              <li>
                Adapt to technical progress.
              </li>
              <li>
                Replace the dangerous with the non-dangerous or less dangerous.
              </li>
              <li>
                Develop a coherent overall prevention policy.
              </li>
              <li>
                Give collective protective measures priority over individual protective measures
                (i.e. engineering controls before PPE).
              </li>
              <li>
                Give appropriate instructions to employees.
              </li>
            </ol>
            <p>
              The eighth principle is the one that puts PPE last. The HSE inspector after an
              incident will ask &quot;what came before the PPE?&quot; — if the answer is
              &quot;nothing, we just gave them a mask&quot;, the SFAIRP defence collapses.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Personal Protective Equipment at Work Regulations 1992 (as amended 2022) — Reg 4(1) and Reg 9(3)"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 4(1)</strong> — &quot;Every employer shall ensure that suitable
                  personal protective equipment is provided to his employees who may be exposed to
                  a risk to their health or safety while at work except where and to the extent
                  that such risk has been adequately controlled by other means which are equally
                  or more effective.&quot;
                </p>
                <p>
                  <strong>Reg 9(3)</strong> — &quot;No employer shall require any employee to pay
                  for any personal protective equipment which has been supplied to him for the
                  purposes of these Regulations.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Reg 4 is the substantive duty — provide suitable PPE unless the risk is controlled
                by other (equally or more effective) means. Reg 9(3) is the non-charging rule —
                the employer cannot pass the cost of compliance PPE on to the worker. The 2022
                amendment extended both duties to cover limb (b) workers (some categories of
                casual / gig workers) as well as employees in the strict sense. For an apprentice
                this is straightforward — the firm provides your working PPE at no cost.
              </>
            }
            cite="Source: Personal Protective Equipment at Work Regulations 1992 (SI 1992/2966) as amended by the Personal Protective Equipment at Work (Amendment) Regulations 2022 (SI 2022/8) — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>PPE by task — drilling and cutting masonry</ContentEyebrow>

          <ConceptBlock
            title="Chasing, drilling, breaking — the highest PPE load on a typical install"
            plainEnglish="Cutting or drilling masonry generates a particularly nasty mix — respirable crystalline silica dust, high noise, flying debris, vibration. Each one needs its own control. The combined PPE for a chasing task is heavier than for almost any other routine electrical task short of live work."
            onSite="Engineering controls come first — on-tool dust extraction (Class M for masonry dust) is the most effective single control. PPE then sits on top of that to catch what the extraction misses. Skipping the extraction and relying on PPE alone is the textbook 'PPE-first' failure that an inspector will pull you up on."
          >
            <p>
              The PPE combination for chasing or drilling masonry:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Respiratory protection</strong> — FFP3 disposable mask (minimum) or
                half-mask with P3 filter cartridges. Bearded? PAPR with loose-fitting hood. Fit
                tested under INDG479 / HSG53.
              </li>
              <li>
                <strong>Eye protection</strong> — impact-rated, EN 166 F (low-energy impact) or
                EN 166 B (medium-energy) for chasers. Wraparound to keep dust out the sides.
              </li>
              <li>
                <strong>Hearing protection</strong> — chasers run 95-105 dB which is over the
                Control of Noise at Work Regulations 2005 upper exposure action value (85 dB).
                Earplugs (SNR 27+) or earmuffs.
              </li>
              <li>
                <strong>Gloves</strong> — cut/abrasion-resistant (EN 388 level B-D) for handling
                the chaser and the masonry debris. Vibration-dampening palm if doing extended
                use.
              </li>
              <li>
                <strong>Engineering control</strong> — on-tool extraction (Class M vacuum)
                connected to the chaser. This is the single biggest reduction in dust exposure.
              </li>
            </ul>
            <p>
              Plus baseline site PPE — boots, hi-vis, hard hat where overhead risk.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>PPE by task — cable handling</ContentEyebrow>

          <ConceptBlock
            title="Cable pulling and termination — different gloves for different tasks"
            plainEnglish="Cable handling has two PPE problems — cut/abrasion when pulling through enclosures and dexterity when terminating. The same glove rarely does both well, so most apprentices end up with two pairs in the toolbox."
            onSite="Cable pulling generates abrasion (the cable sheath dragging through brackets and conduit) and the occasional snag injury. Termination is fine work — the glove either has to come off or has to be a thin grip-glove that lets you feel the strands. Picking the wrong glove for the wrong half of the job is a common minor-injury source."
          >
            <p>
              The PPE combination for cable pulling and termination:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pulling gloves</strong> — palm-coated, cut-resistant (EN 388 level B-C),
                full grip. Protects against rope burn from pulled cable, sharp edges in
                enclosures, and the occasional buried staple.
              </li>
              <li>
                <strong>Termination gloves</strong> — thin nitrile-palm or no glove at all for
                fine work. Conductor strands need feel; bulky gloves cause poor terminations.
              </li>
              <li>
                <strong>Eye protection</strong> — light safety glasses (EN 166 F). Cable
                pulling can spring lose ends back at face level when a pull releases.
              </li>
              <li>
                <strong>Knee protection</strong> — knee pads when working at floor level for
                extended periods. The Manual Handling Operations Regulations 1992 Reg 4 covers
                this as part of the wider posture / load assessment.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>PPE by task — live work and electrical testing</ContentEyebrow>

          <ConceptBlock
            title="Live work is the exception — and the PPE reflects that"
            plainEnglish="Almost all installation work is done dead following safe isolation. EAWR 1989 Reg 14 makes live work the explicit exception — it has to be specifically justified because the work cannot reasonably be done dead, the operative has to be competent, and suitable precautions have to be in place. PPE for live work is a higher specification than for dead work."
            onSite="On dead work the PPE is the standard kit (eye protection, mechanical-protection gloves, baseline site PPE). On live work — and that includes voltage proving as part of safe isolation — there's a heavier kit. Class 0 voltage-rated insulating gloves (rated to 1000V AC), arc-rated clothing for higher fault-energy locations, eye protection rated for arc-flash, dielectric overshoes."
          >
            <p>
              The PPE combination for live work and live testing:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Voltage-rated insulating gloves</strong> — Class 0 rated to 1000V AC
                covers most LV work. Worn over leather mechanical-protection gloves to protect
                the rubber from puncture. Tested before each use (visual + air-inflation check
                for pinholes).
              </li>
              <li>
                <strong>Arc-rated eye protection</strong> — full face shield (EN 166 with
                arc-flash marking) for switchgear or higher-energy work. Standard safety glasses
                only for low-energy domestic testing.
              </li>
              <li>
                <strong>Arc-rated clothing</strong> — required for higher-energy commercial /
                industrial DBs at 415V where the calculated incident energy exceeds the bare-skin
                threshold. NFPA 70E and IEC 61482 give the calculation framework. Most domestic
                work is below the threshold but isn't zero risk.
              </li>
              <li>
                <strong>Insulated tools</strong> — VDE-rated screwdrivers and pliers (EN 60900)
                rated to 1000V AC. Inspected for damage to the insulation before use.
              </li>
              <li>
                <strong>Dielectric overshoes</strong> — for switchgear or higher-risk locations.
                Insulated mat at the work position is the engineering-control alternative.
              </li>
            </ul>
            <p>
              The cleanest control is to do the work dead. Module 4 Section 2 Sub 5 covers the
              live-work permit-to-work regime that has to sit around any live work that cannot
              be avoided.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Reg 14"
            clause={
              <>
                &quot;No person shall be engaged in any work activity on or so near any live
                conductor (other than one suitably covered with insulating material so as to
                prevent danger) that danger may arise unless — (a) it is unreasonable in all the
                circumstances for it to be dead; and (b) it is reasonable in all the circumstances
                for him to be at work on or near it while it is live; and (c) suitable precautions
                (including where necessary the provision of suitable protective equipment) are
                taken to prevent injury.&quot;
              </>
            }
            meaning={
              <>
                Reg 14 is the live-work prohibition with three cumulative exceptions. ALL THREE
                limbs have to be satisfied — it has to be unreasonable to make the conductor dead
                AND reasonable to work on it live AND suitable precautions in place. PPE is one
                of the &apos;suitable precautions&apos;. If any limb fails, live work is
                prohibited. The HSE has prosecuted electricians and their firms under Reg 14
                where the &apos;could it have been done dead?&apos; question wasn&apos;t honestly
                answered.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 14 — verbatim from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>PPE by task — working at height and hot work</ContentEyebrow>

          <ConceptBlock
            title="Working at height and hot work — separate task families with their own PPE"
            plainEnglish="Working at height is covered in detail in Sub 3 of this section, but the PPE component is worth flagging here. Hard hat where overhead risk; chinstrap on the helmet to stop it falling off when working overhead; fall arrest if scaffold or MEWP requires it (cherry picker work routinely needs full body harness with shock-absorbing lanyard clipped to the basket anchor)."
            onSite="Hot work — using a gas torch to make a soldered joint on a copper bonding tail — has a specific PPE set. Leather gloves rather than synthetic, eye protection rated for thermal hazards, long sleeves of natural fibre (synthetics melt onto skin), a fire blanket or extinguisher within arm's reach, and clearance of combustibles from the work area."
          >
            <p>
              Working at height — PPE component (full hierarchy in Sub 3):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hard hat with chinstrap</strong> — when working overhead or where
                others are working overhead.
              </li>
              <li>
                <strong>Fall arrest harness + lanyard</strong> — required for MEWP basket work
                and for some scaffold work. IPAF / PASMA training covers correct use.
              </li>
              <li>
                <strong>Footwear with grip rating</strong> — particularly for ladder and
                scaffold work. Smooth-sole boots are a fall risk.
              </li>
            </ul>
            <p>
              Hot work — PPE plus admin controls:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Leather gloves</strong> — heat resistant, not synthetic.
              </li>
              <li>
                <strong>Thermal-rated eye protection</strong> — EN 166 with thermal-hazard
                marking.
              </li>
              <li>
                <strong>Natural-fibre clothing</strong> — long sleeves of cotton or wool.
                Synthetic clothing melts onto skin.
              </li>
              <li>
                <strong>Fire blanket / extinguisher in arm&apos;s reach</strong> — and clearance
                of combustibles from the work area.
              </li>
              <li>
                <strong>Hot-works permit</strong> — admin control on commercial premises. Sub 5
                of this section.
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

          <SectionRule />

          <ContentEyebrow>Fit, inspection and storage</ContentEyebrow>

          <ConceptBlock
            title="PPE only protects when it fits and is undamaged"
            plainEnglish="PPE Regs Reg 7 puts the maintenance duty on the employer; Reg 10 puts the inspection-and-report duty on the employee. Together they make the pre-use inspection a daily routine. Damaged PPE doesn't provide the rated protection — a cracked safety glass lens, a dust mask with a broken strap, a hi-vis with the reflective material peeling off — all need to be taken out of service before use."
            onSite="The pre-use inspection takes thirty seconds per item. Glasses — visible cracks or scratches that obscure vision? Mask — straps intact, nose-piece formable, no holes in the filter material? Gloves — no cuts, no chemical damage, dry inside? Helmet — within manufacturer's lifespan, no impact damage to the shell? If any item fails, swap it before work starts."
          >
            <p>
              The pre-use inspection routine:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Glasses / visor</strong> — clean, no scratches that obscure vision, no
                cracks. Side shields intact for wraparound.
              </li>
              <li>
                <strong>Mask / RPE</strong> — straps intact and elastic, nose piece bendable,
                no holes in filter material. Disposable masks are single-shift.
              </li>
              <li>
                <strong>Gloves</strong> — no cuts or holes, no chemical damage, no contamination.
                Voltage-rated gloves get an air-inflation check for pinholes.
              </li>
              <li>
                <strong>Helmet</strong> — within the manufacturer&apos;s lifespan (date stamped
                inside), no impact damage to the shell, harness intact.
              </li>
              <li>
                <strong>Hi-vis</strong> — fluorescent material not faded beyond visible threshold,
                reflective tape intact and not peeling.
              </li>
              <li>
                <strong>Boots</strong> — sole tread present, toe cap not exposed, upper not split.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Personal Protective Equipment at Work Regulations 1992 — Reg 7(1) and Reg 10(2)"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 7(1)</strong> — &quot;Every employer shall ensure that any personal
                  protective equipment provided to his employees is maintained (including
                  replaced or cleaned as appropriate) in an efficient state, in efficient working
                  order and in good repair.&quot;
                </p>
                <p>
                  <strong>Reg 10(2)</strong> — &quot;Every employee who has been provided with
                  personal protective equipment by virtue of regulation 4(1) shall take all
                  reasonable steps to ensure that it is returned to the accommodation provided
                  for it after use.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Reg 7 is the maintenance duty on the employer — PPE must be kept in working
                order. Reg 10(2) puts a corresponding duty on the employee to put it back where
                it lives after use (so the next inspection finds it in a known condition). Reg 11
                requires the employer to provide accommodation for PPE storage when not in use —
                a designated locker or van compartment, not the back seat of the van under wet
                cable.
              </>
            }
            cite="Source: Personal Protective Equipment at Work Regulations 1992 (SI 1992/2966) — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Reaching for PPE first instead of working through the hierarchy"
            whatHappens={
              <>
                Apprentice is told to chase a wall by the supervisor. Supervisor hands them a
                disposable mask and says &quot;crack on&quot;. No on-tool extraction set up,
                no work-rotation arrangement, no consideration of whether a different cable
                route would avoid the chase entirely. Apprentice spends three hours producing
                silica dust the mask can&apos;t fully filter, and the supervisor has skipped
                everything ABOVE PPE in the hierarchy. The post-incident audit (or HSE visit)
                finds that the PPE-only approach was a breach of the principles of prevention
                in MHSWR Schedule 1 even though the worker WAS wearing PPE.
              </>
            }
            doInstead={
              <>
                Walk the hierarchy on every task. Can the chase be avoided (surface-mount in
                trunking, drop from above)? If not, can a less-dusty method substitute (stitch
                drilling rather than continuous chase)? If not, what engineering control (on-tool
                extraction with Class M vacuum)? What admin control (rotate operative, limit
                exposure time)? THEN PPE. The PPE is what catches what the controls above it
                miss — not the only thing standing between you and the hazard.
              </>
            }
          />

          <CommonMistake
            title="Allowing a bearded operative to use a disposable FFP3 mask"
            whatHappens={
              <>
                Apprentice in week two is sent to chase a wall. He&apos;s grown a beard since
                joining. Hands him a disposable FFP3 and waves him at the chaser. The face seal
                doesn&apos;t work over the beard, 15-20% of his inhaled air bypasses the filter,
                and three hours&apos; chasing exposes him to silica well above the workplace
                exposure limit. Years later he develops respiratory symptoms. The firm cannot
                show that fit-testing under INDG479 was carried out and the PPE provided was
                suitable for the user. Civil claim follows alongside a HSE investigation.
              </>
            }
            doInstead={
              <>
                Fit-testing applies to every tight-fitting RPE wearer per HSG53 and INDG479. If
                the worker has facial hair in the seal area, the disposable mask isn&apos;t
                suitable — switch to a powered air-purifying respirator (PAPR) with a
                loose-fitting hood. The PAPR doesn&apos;t rely on a face seal so it works
                regardless of facial hair. Yes, it costs more than a disposable mask. The cost
                of getting it wrong is much higher.
              </>
            }
          />

          <Scenario
            title="Cutting a chase in plaster for a new socket — what PPE before you start?"
            situation={
              <>
                You&apos;re second-year on a domestic kitchen retrofit. The customer wants a new
                socket on a wall that&apos;s currently bare sand-and-cement plaster. The wall is
                an external solid wall (no cavity), no concealed services flagged on the
                walk-round, and the chase will be 25mm wide x 15mm deep over a 1.2m vertical run.
                You&apos;re going to use a 110V wall chaser with two 125mm diamond blades. The
                customer is at home but in another room.
              </>
            }
            whatToDo={
              <>
                Walk the hierarchy first, then PPE. Eliminate? No — the customer wants a flush
                socket and surface-mount conduit isn&apos;t acceptable here. Substitute? Could
                stitch-drill the chase but the chaser is the right tool for a 1.2m run. Engineering
                control? Connect the chaser to a Class M vacuum extractor — this is the single
                biggest reduction in dust exposure and should be considered required for any
                significant chasing job. Admin control? Brief the customer that the work area is
                off-limits while the chaser runs, close the door to the rest of the house, and
                limit your continuous chasing to short runs with breaks (work rotation reduces
                noise and dust exposure even for a single operative). THEN PPE: FFP3 disposable
                mask (assuming you&apos;re clean-shaven and fit-tested), wraparound impact-rated
                eye protection (EN 166 F), hearing protection (SNR 27+ earplugs or earmuffs),
                cut-resistant gloves (EN 388 B-C), boots, hi-vis. Inspect each item before you
                put it on.
              </>
            }
            whyItMatters={
              <>
                The temptation as an apprentice is to grab the mask and the glasses and start
                cutting. Working through the hierarchy in that order — even out loud, even just
                in your head &mdash; is what an inspector wants to see in your routine and what
                turns &quot;PPE was provided&quot; into &quot;risk was controlled&quot;. The PPE
                catches what the engineering and admin controls miss. Skipping the controls
                above PPE and relying on the mask alone is the prosecutable failure. The same
                walk-the-hierarchy thinking applies to every task on this Sub.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "PPE is the LAST line of defence in the hierarchy of control under MHSWR 1999 Schedule 1. Eliminate, substitute, engineering controls, admin controls, then PPE.",
              "PPE Regs 1992 (as amended 2022) Reg 4 requires the employer to provide suitable PPE; Reg 9(3) prohibits the employer from charging the worker for it.",
              "The 2022 amendment extended PPE provision to limb (b) workers as well as employees in the strict sense.",
              "Match PPE to the task — chasing masonry, cable handling, live testing, working at height and hot work each demand a different combination.",
              "Tight-fitting RPE only works on a clean-shaven face. Bearded workers need a powered air-purifying respirator with a loose-fitting hood — INDG479 and HSG53 are explicit.",
              "Live work is the exception under EAWR 1989 Reg 14. Voltage-rated gloves, arc-rated kit and insulated tools are PPE for the situations where dead working isn't reasonable. Most installation work is done dead.",
              "Pre-use inspection of every PPE item — glasses, mask, gloves, helmet, hi-vis, boots — takes thirty seconds and catches damaged kit before it fails in use. PPE Regs Reg 10 makes the report-defect duty personal.",
              "PPE protects only the wearer, only when worn correctly, and only when undamaged. Engineering controls (extraction, RCDs, guards) protect everyone in the area without depending on individual behaviour — that's why they sit above PPE in the hierarchy.",
            ]}
          />

          <Quiz title="PPE selection — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section2/2-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.1 Workspace hazards
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section2/2-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.3 Access equipment
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
