/**
 * Module 4 · Section 2 · Subsection 5 — RAMS, toolbox talks, permit-to-work (supplementary)
 * Maps to City & Guilds 2365-02 / Unit 204 / LO2 (supplementary to AC 2.1, 2.2, 2.3)
 *
 * Frame: the documentation chain that wraps the work. Risk Assessment +
 * Method Statement (RAMS) sets the strategy. Toolbox talks brief the
 * shift on a single safety topic. Permits-to-work authorise specific
 * higher-risk activities (hot work, confined space, live work).
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
  'RAMS, toolbox talks, permits | Level 2 Module 4.2.5 | Elec-Mate';
const DESCRIPTION =
  'The documentation chain wrapping the work — RAMS sets the strategy, toolbox talks brief the shift, permits authorise the higher-risk activities. How the apprentice fits in.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod4-s2-sub5-rams',
    question:
      "What does RAMS stand for and what's the difference between the two halves?",
    options: [
      "Recognise that direct eye contact norms vary significantly across cultures — in many cultures, avoiding direct eye contact is a sign of respect, not evasion. Adjust your communication style to accommodate cultural differences rather than interpreting through your own cultural lens",
      "Risk Assessment + Method Statement. The risk assessment identifies hazards, evaluates the risk and lists the controls (required by Management of Health & Safety at Work Regs 1999 Reg 3). The method statement sets out HOW the work will be done safely, step by step. Together they're the working H&S document for a job — the inspector after an incident asks for both.",
      "At the start — Reg 132.13 is the design-side documentation requirement that establishes what must be provided for every installation. The design pack flowing from designer to installer is the implementation of Reg 132.13 at the project's start. The same documentation flows through to the customer's O&M pack at handover.",
      "A written quote that fully scopes the work (number of circuits, accessories, run routes, what's included, what's excluded), a contract setting payment terms and variations, and a customer signature confirming both. Without those you've got a vague verbal agreement that the Consumer Rights Act 2015 will treat as enforceable on the customer's terms — meaning if they later say 'I assumed downlights were included' you'll struggle to prove otherwise.",
    ],
    correctIndex: 1,
    explanation:
      "Risk Assessment is statutory under MHSWR 1999 Reg 3. The Method Statement isn't directly named in a regulation but it's how the assessed risks are turned into a practical working procedure. Most contracts and most insurers require a documented RAMS for any non-trivial work. As an apprentice you don't usually write the RAMS, but you read it, follow it, and flag anything on site that doesn't match what the RAMS describes.",
  },
  {
    id: 'mod4-s2-sub5-toolbox',
    question:
      "What's a toolbox talk and what's it FOR?",
    options: [
      "You should have kept a copy in the firm's records (paper or digital). Most contractor schemes (NICEIC, NAPIT, ELECSA) require record retention of 6 years minimum, and the Limitation Act 1980 sets the same window for civil claims arising from negligence. Re-issuing a copy is straightforward if you have the records, embarrassing if you don't.",
      "Three reasons. (1) Input impedance — multimeters at 10 MΩ read induced/phantom voltages as if they were real sources; two-pole at a few kΩ loads them to zero. (2) Probe geometry — multimeter probes typically have longer exposed tips and weaker finger barriers, failing GS38. (3) Indication — a multimeter shows a digit on a screen which can be misread; the two-pole's lamp + LED + audible is unambiguous. The instruments are complementary; the multimeter measures, the two-pole proves dead.",
      "Stop, raise the conflict politely, and ask for the change in writing. The method statement is the documented safe system of work. A verbal instruction to depart from it needs a documented reason, ideally a revised method statement signed off by whoever owns the original. If the supervisor refuses to put it in writing, that itself is a red flag — escalate via your employer's safety route. HASAWA s.7 makes you personally responsible for following the safe system; 'I was told to' is not a defence to a prosecution.",
      "A short pre-shift safety briefing on a single topic — typically 5-10 minutes, delivered by the supervisor or a senior operative to the on-site team. The point is to refresh awareness of one specific hazard or control before the shift starts (e.g. 'today we're working at height — here's the WAHR hierarchy and what it means for our setup'). Toolbox talks are recorded — names of attendees, topic covered, date.",
    ],
    correctIndex: 3,
    explanation:
      "Toolbox talks bridge the gap between the formal RAMS and the daily reality of the shift. They're informal, focused and time-efficient. The HSE encourages them as a key part of the safety culture. The recording requirement is important — after an incident the inspector may ask 'what safety briefings did the operative receive in the last week?' and a signed toolbox-talk register is the evidence that the firm was actively communicating about safety, not just relying on paperwork in the office.",
  },
  {
    id: 'mod4-s2-sub5-permit',
    question:
      "Under EAWR 1989, what's the formal process required before any live electrical work can be carried out?",
    options: [
      "Most electrical firms apply 15-30% markup on materials — covers handling, ordering admin, storage, working capital tied up in stock, and the value-added service of selecting the right materials. Some firms quote materials at trade price + markup; others at retail price (which already builds in markup vs trade price). Always be transparent with customers about which model you're using; they understand markup as the standard model.",
      "Because EAWR is the trade-specific instrument made under HASAWA's enabling powers (s.15) — but HASAWA's general duties (s.2, s.3, s.7) sit underneath the EAWR breach as the broader safe-system / personal-duty obligations. Charging both gives the prosecution two routes to conviction and lets the court assess culpability across both the specific technical reg AND the broader systems-of-work failure.",
      "Explaining the situation in person, leading with the safety reason (\\\\\\\"I have found a section of wiring that does not meet current safety standards\\\\\\\"), showing the specific issue where possible, expressing empathy for the inconvenience (\\\\\\\"I understand this is not what you were expecting\\\\\\\"), presenting options rather than a single demand, and giving the client time to process before requiring a decision",
      "Reg 14 prohibits live work UNLESS three conditions are all met: (a) it's unreasonable to do the work dead, (b) it's reasonable to do it live, AND (c) suitable precautions are in place. The standard mechanism for proving all three is a permit-to-work — a formal document that authorises the specific live activity, identifies the operatives, lists the precautions, and is signed by the issuing authority before work starts and again at completion.",
    ],
    correctIndex: 3,
    explanation:
      "EAWR Reg 14 makes live work the exception, not the rule. The permit-to-work is how the firm demonstrates that the three Reg 14 conditions have been considered and met. Without a permit, any live work is prima facie a Reg 14 breach. As an apprentice, you would not be authorised to do live work alone — you'd be working under a permit issued to a senior operative who carries the legal responsibility for it.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the role of the RAMS document on a typical electrical install?",
    options: [
      "A poor power factor increases current draw for the same real power, causing overheating in cables and equipment, increased losses, higher electricity costs from reactive power charges, and may indicate failing capacitors that need replacement during maintenance",
      "To set out the assessed hazards, the chosen control measures and the step-by-step method for doing the work safely. RAMS is the working H&S document for the job — referenced in induction, in toolbox talks, in permit-to-work, and re-read at start of each phase. After an incident it's the first document the HSE inspector asks for.",
      "ISOLATE the supply at the nearest accessible point — the local switch, the breaker, the supplier's main fuse if necessary. Do NOT touch the casualty until isolation is confirmed. If isolation isn't immediately achievable, use a non-conductive item (dry wood, plastic chair) to break the contact, but isolation is always the first preference. Once free of the source, casualty assessment (DR ABC) and 999.",
      "Three years from the date of the incident under RIDDOR Reg 12. Records held in any format that allows retrieval. The HSE may request retrospective access during investigations or sector reviews. Many firms retain longer for PI insurance / Defective Premises Act purposes.",
    ],
    correctAnswer: 1,
    explanation:
      "RAMS is the bridge between the regulation (MHSWR Reg 3 requires assessment) and the actual work on site. Done well, it's a practical working document; done badly, it's a generic template that gets ignored. The HSE inspector is trained to spot the difference instantly — a job-specific RAMS that reflects the actual site conditions is evidence of a competent firm; a copy-paste template is evidence the assessment wasn't suitable and sufficient under Reg 3.",
  },
  {
    id: 2,
    question:
      "What's the 'template trap' that auditors and inspectors look for in poorly written RAMS?",
    options: [
      "Unwanted conduct related to a protected characteristic (or unwanted conduct of a sexual nature) which has the purpose or effect of violating a person's dignity or creating an intimidating, hostile, degrading, humiliating or offensive environment. The conduct doesn't have to be 'severe' to count — repeated 'banter' related to race, sex, disability or another protected characteristic can be harassment if it has the proscribed effect on the recipient.",
      "The firm (the contracting business) is the data CONTROLLER — it decides what data to collect, why, and how to process it. The customer is the DATA SUBJECT — the person to whom the data relates. The processor would be a third party processing data on the firm's behalf (e.g. the cloud-hosted CRM, the accounting software, an offshore admin team).",
      "A RAMS that uses the same generic wording for every job ('standard electrical install — usual precautions') without reflecting the specific hazards and conditions of THIS site. The inspector spots it instantly because the wording doesn't match what's actually present on the job. It's evidence that the assessment wasn't 'suitable and sufficient' under MHSWR 1999 Reg 3 even though the document exists.",
      "Independent verification. The dead-test calculation depends on Ze (one measurement) plus R1+R2 (one or many readings, depending on circuit). The live Zs measurement is one direct reading. Comparing the two catches errors in either method, gives confidence in the result, and provides a single value to compare against Table 41.3 with the 0.8 multiplier applied.",
    ],
    correctAnswer: 2,
    explanation:
      "Templates are fine as a starting point — most firms use one. The trap is failing to tailor the template to the actual site. The HSE has been clear that risk assessment has to be specific. After an incident the question 'did the RAMS describe THIS job?' is what separates a defensible position from a prosecutable one.",
  },
  {
    id: 3,
    question:
      "How is a toolbox talk different from a formal training course?",
    options: [
      "Where equipment was disconnected to allow the standard 500 V DC test, after the equipment is reconnected a 250 V DC test must be applied between live conductors and the protective conductor — minimum 1 MΩ. Confirms the equipment itself does not present an unacceptable insulation defect.",
      "Trust is significantly reduced because self-orientation is the denominator — it divides the total. The self-regulation skill needed is managing self-serving impulses and genuinely shifting attention to others' needs, which requires ongoing emotional regulation of ego and need for recognition",
      "UK statute making it a criminal offence to offer, promise, give, request, accept or agree to receive a financial or other advantage as an inducement for improper performance. Applies to any UK person/business. For electricians: gifts to suppliers/main contractors over modest value (typically £100+) raise risk; cash 'thank-yous' to procurement people are clearly bribery; small thank-you gifts (bottle of wine, biscuit tin) are typically fine. Many large firms have anti-bribery policies that ban any gifts.",
      "A toolbox talk is short (5-10 min), focused on a single topic, delivered on site by a supervisor or senior operative, often at the start of a shift. It's a refresh / awareness tool, not initial training. Formal training (e.g. PASMA, IPAF, asbestos awareness) is longer, structured, certificated and provides the underlying competence. Toolbox talks reinforce that competence in the day-to-day work.",
    ],
    correctAnswer: 3,
    explanation:
      "The two are complementary. Formal training establishes competence; toolbox talks keep it active. INDG259 (HSE guidance on toolbox talks) gives practical advice — keep them short, keep them topical, record attendance, rotate the topic so the same content doesn't recycle every week.",
  },
  {
    id: 4,
    question:
      "Which of these activities typically requires a permit-to-work in addition to RAMS?",
    options: [
      "Hot work (gas torch, grinding sparks, welding) on commercial premises, confined-space entry (ducts, voids, lift shafts), live electrical work under EAWR Reg 14, and high-energy switching on industrial / healthcare sites. The permit is a formal document authorising the specific activity within a specific time window, listing the precautions, and signed by the issuing authority and the operative.",
      "Common parts (landlord supply, intake, distribution, common-area lighting, lift supplies, cleaner sockets) inspected fully. Flats sampled — typical 10-20% sample with the agreement of the freeholder and ideally the tenants — and the limitation clearly recorded that the EICR covers common parts in full and a defined sample of flats; individual flats not sampled retain their own EICR responsibility under the PRS Regulations or the leaseholder's responsibility.",
      "Quicker than 3-lead, used when access to the neutral is impractical (e.g. testing at a fixed appliance with only L and E accessible). The instrument measures the L-E loop only; result is Zs directly without the auxiliary L-N measurement. Slightly less accurate than 3-lead but acceptable for routine Zs verification.",
      "PASS. BS 7671 643.7 maximum at I∆n for general-type RCD = 300 ms. A reading of 28 ms is well within limits and matches expected for a healthy modern RCD (typical 10–30 ms). The 1×IΔn test is also typically &lt;20 ms on a healthy device. If the trip-time was 250 ms (still passing) or 290 ms (still passing), it would be borderline and worth flagging. If 350 ms — fail.",
    ],
    correctAnswer: 0,
    explanation:
      "Permits-to-work are reserved for higher-risk activities where the consequence of getting it wrong is serious. Hot work has its own permit because the fire risk extends well beyond the moment of work (smouldering can ignite hours later). Confined-space entry is regulated under the Confined Spaces Regulations 1997 with specific entry permits. Live work is reserved by EAWR Reg 14. High-energy switching is reserved under HTM 06-01 (healthcare) and similar industrial standards.",
  },
  {
    id: 5,
    question:
      "What's typically on a hot-work permit?",
    options: [
      "The dead test proves the wiring is correct between conductor identification at the CU and conductor identification at the accessory. The live test (using an approved voltage indicator at the accessory after first energising) confirms that the assumed L conductor at the CU actually carries the supply line — the dead test cannot detect a labelling error or a reversed connection at the meter tails.",
      "The location, the specific activity (gas torch, grinding, welding), the operative names, the permit validity window (start time, end time), the precautions in place (combustibles cleared, fire blanket / extinguisher to hand, fire watch arranged for after work), the cool-down / fire-watch requirement (typically 30-60 minutes after work ceases), and signatures from issuer, operative and (on completion) the fire-watch confirming no smouldering.",
      "You don't have to break the circuit — the clamp meter senses the magnetic field around the conductor and reads the current without electrical contact. Faster, safer (no need to disconnect), and possible on energised circuits without isolation. Standard for measuring load currents at distribution boards, on submains, on motor circuits, and for energy auditing. Most modern clamp meters also have voltage and continuity functions, making them effectively a multimeter + clamp in one.",
      "That the installation incorporates an RCD, that the user should test it quarterly (or six-monthly per the older guidance) by pressing the test button, that the RCD should trip when tested, and that if it doesn't trip the user should call a competent electrician immediately. Maintains the protection by catching RCD failure before it matters.",
    ],
    correctAnswer: 1,
    explanation:
      "Hot-work permits are strict because the fire risk persists after the visible work has stopped. The fire watch — typically a competent person remaining in the area for 30-60 minutes after work ceases — is the control that catches a smouldering ignition before it becomes a fire. Skipping the fire watch is a common cause of avoidable building fires linked to maintenance work.",
  },
  {
    id: 6,
    question:
      "Under the Confined Spaces Regulations 1997, what's a 'confined space' and what's the headline rule?",
    options: [
      "Application fee around £200-300 plus annual subscription around £30-50. Some institutions (IET, EngineeringUK) offer reduced rates for new registrants. Cost is tax-deductible if you're self-employed or HMRC has the body on its approved professional fees list. Compared to the credential value (recognised national engineering registration) the cost is modest.",
      "Sole trader: 5 years from the 31 January Self Assessment deadline for that tax year — so effectively 5 years and 10 months from the end of the tax year. Ltd company: 6 years from the end of the company's accounting period. VAT registered: 6 years for VAT records. Practical advice: keep all records 7+ years. Cloud accounting (Xero, QuickBooks, FreeAgent) makes this easier — records stored indefinitely.",
      "A space substantially enclosed (whether or not entirely) and where a 'specified risk' could arise — fire/explosion (gas, vapour, dust), loss of consciousness from fumes or lack of oxygen, drowning, asphyxiation from free-flowing solid, or trapping/heat-related illness. Reg 4 prohibits entry unless reasonably practicable to do the work without entering. Reg 5 requires a safe system of work (entry permit, atmospheric monitoring, rescue arrangements) where entry is necessary.",
      "SEG is the UK regulatory scheme requiring large electricity suppliers to pay solar PV exporters for surplus electricity exported to the grid (replacing the closed Feed-in Tariff). To register a PV system for SEG the install must be MCS-certified — so the homeowner needs an MCS-registered installer. Tariff rates vary by supplier (typically 4-15p/kWh in 2024).",
    ],
    correctAnswer: 2,
    explanation:
      "The Confined Spaces Regulations 1997 are precise. A space is 'confined' if it's enclosed AND has a specified risk. A loft isn't necessarily confined; a lift shaft is; an under-floor void with poor ventilation might be. The 'don't enter if you can avoid it' rule (Reg 4) is the strongest control, and the entry permit + atmospheric monitoring + rescue plan (Reg 5) is required where entry can't be avoided. Entry without those controls has caused multiple electrician fatalities.",
  },
  {
    id: 7,
    question:
      "What's the documentation chain from pre-construction to permit?",
    options: [
      "The supervisor might notice: decreasing patience with apprentices' problems, emotional numbness when hearing about difficulties, cynicism about whether support makes a difference, withdrawal from mentoring conversations, and irritability — all signs that their empathic capacity is depleted and they need to restore their own emotional resources",
      "Set the meter to INRUSH mode. Clamp around one phase (or the L of a single-phase motor). Press start to arm the capture. Operate the load (start the motor). The meter captures the peak current in the first 100 ms after the rising edge of current — typically 6–10× the running current for an induction motor, higher for HVAC compressors. Useful for diagnosing nuisance trips on an undersized breaker (the inrush exceeds the magnetic trip threshold on a Type B breaker; replace with Type C or D for high-inrush loads).",
      "In writing, contemporaneously. Text or email to the supervisor; CC to a senior manager or H&S manager; copy retained. State what was asked, what you said, and the reason (regulation cited or risk identified). Time-stamped. The contemporaneous written record is the strongest evidence in any subsequent ERA s.44 claim or HSE prosecution.",
      "Pre-construction information (PC info from client/principal designer) → construction phase plan (principal contractor) → RAMS for each work package (contractor) → toolbox talks each shift (supervisor) → permit-to-work for specific high-risk activities (issued before, closed after). Each layer references the one above it. After an incident the inspector traces backwards from the incident to find the gap.",
    ],
    correctAnswer: 3,
    explanation:
      "The chain is how the H&S system is supposed to work in practice. PC info informs the phase plan, which informs the RAMS, which informs the daily briefing, which gates the permit. Break any link and the system has a gap. Inspectors are trained to follow the chain after an incident — a missing link is often the prosecutable failure even when the operative on the ground was acting in good faith.",
  },
  {
    id: 8,
    question:
      "As an apprentice, what's your role in the RAMS / toolbox / permit chain?",
    options: [
      "Read the RAMS for the job before you start so you understand the planned controls. Attend the toolbox talks and sign the register. Operate within the scope of any permit-to-work — never extend the work beyond what the permit authorises. Flag anything you see on site that doesn't match the RAMS. HASAWA s.7 makes all of this a personal duty.",
      "Politely correct them. The five-year payback figure is from the Feed-in Tariff (FIT) era which closed in 2019 — under the current Smart Export Guarantee (SEG) and current electricity prices, realistic payback is 9–12 years. Quote real numbers, not historic ones, so the customer makes an informed decision.",
      "Coded as FI with a recommended investigation route, recorded under Limitations on the EICR, and brought to the duty holder's attention in the handover so they can commission the investigation as a separate work item. The EICR cannot certify what cannot be inspected.",
      "No person shall intentionally or recklessly interfere with or misuse anything provided in the interests of H&S. Examples — removing a machine guard, defeating an interlock, taking down a barrier, reaching round a lock-off, stuffing the door of an interlocked enclosure, switching off a smoke detector you find inconvenient. s.8 is a personal criminal offence and applies to everyone on site, employee or not.",
    ],
    correctAnswer: 0,
    explanation:
      "The apprentice's role is real but bounded. You don't write the RAMS or issue permits, but you read, attend, follow and flag. HASAWA s.7 limb (b) — co-operate with the employer's safety arrangements — is the legal hook. Skipping the toolbox talk or extending work beyond a permit are textbook s.7 breaches even though the formal authority sits with someone else.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Who writes the RAMS — the contractor or the customer?",
    answer:
      "The contractor — it's their assessment of how they'll do the work safely. The customer (or principal contractor on a CDM site) provides the pre-construction information (existing site conditions, hazards, drawings) that feeds into the RAMS, but the actual RAMS document is the contractor's responsibility. As an apprentice you might be asked to draft sections of a RAMS for review, particularly later in the apprenticeship — it's a useful exercise in thinking through the work systematically.",
  },
  {
    question: "Does every job need a RAMS?",
    answer:
      "Strictly, every job needs a risk assessment (MHSWR Reg 3). For low-risk routine work the assessment can be very brief — a 'generic' RAMS with a short site-specific addendum. For higher-risk or non-routine work the RAMS needs to be specific and detailed. Most firms use a tiered approach — generic templates for repetitive low-risk work, custom RAMS for anything unusual, fresh RAMS if conditions on site differ materially from the template.",
  },
  {
    question: "How often should toolbox talks happen?",
    answer:
      "On a typical construction site, daily — short briefings (5 minutes) at the start of each shift covering the day's specific risks and any incidents from elsewhere. On a smaller domestic firm, weekly is more typical, plus topic-specific talks before any new activity. The recording matters as much as the frequency — a signed register showing what was covered and who attended is the evidence the firm was actively communicating safety.",
  },
  {
    question: "Can I refuse to do work that isn't covered by a permit when one's needed?",
    answer:
      "Yes — and you should. Doing live work without a permit, hot work without a permit, or confined-space entry without a permit, are all breaches of HASAWA s.7 (failure to take reasonable care) and the underlying regulation (EAWR Reg 14, Confined Spaces Regs Reg 4/5). You have specific protection under the Employment Rights Act 1996 s.44 from victimisation for raising H&S concerns. Raise it with the supervisor; if the supervisor overrides you, raise it up the chain — the act of raising it discharges your s.7 duty.",
  },
  {
    question: "What's the difference between a permit-to-work and a permit-to-isolate?",
    answer:
      "A permit-to-work authorises a specific work activity (hot work, confined-space entry, live work) within a defined scope and time window. A permit-to-isolate authorises a specific isolation of a supply or system, identifying who isolated what and when, so that the isolation is documented and can be safely reversed. On industrial and healthcare sites the two overlap — the permit-to-work usually requires a permit-to-isolate as part of its precautions. Both are formal documents, not informal verbal agreements.",
  },
  {
    question: "What if the RAMS describes a method that I think is unsafe?",
    answer:
      "Don't proceed. RAMS isn't infallible — they're written in advance, sometimes by people who haven't seen the site recently, and they can be wrong. Your duty under HASAWA s.7 to take reasonable care isn't discharged by following an unsafe RAMS. Stop, raise it with your supervisor, and have the RAMS reviewed and amended before the work continues. The process is exactly the same as for an unsafe verbal instruction — the documentation just makes it slightly more uncomfortable to push back.",
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
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · Subsection 5"
            title="RAMS, toolbox talks, permit-to-work"
            description="The documentation chain that wraps the work. RAMS sets the strategy, toolbox talks brief the shift, permits authorise the higher-risk activities. How the apprentice fits into each link of the chain."
            tone="emerald"
          />

          <TLDR
            points={[
              "RAMS = Risk Assessment + Method Statement. The risk assessment is statutory under MHSWR 1999 Reg 3. The method statement turns the assessed risks into a step-by-step working procedure.",
              "Toolbox talks are short pre-shift safety briefings on a single topic, recorded with attendance. They keep the formal RAMS active in the day-to-day work.",
              "Permits-to-work authorise higher-risk activities (hot work, confined space, live work). The permit is a formal document with start/end times, precautions and signatures — not optional, not informal.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Supplementary content — extends LO2 but is not directly mapped to a 204 AC. Designed to deepen apprentice understanding beyond the formal AC scope.",
              "Define RAMS — Risk Assessment + Method Statement — and state the role of each half.",
              "Identify the statutory basis for risk assessment under MHSWR 1999 Reg 3 (and Reg 4 principles of prevention).",
              "Describe the purpose and format of a toolbox talk and the importance of attendance recording.",
              "Identify the permit-to-work requirement under EAWR 1989 Reg 14 for live electrical work.",
              "Identify the permit-to-work requirement under the Confined Spaces Regulations 1997 for confined-space entry.",
              "Recognise the documentation chain from pre-construction information through construction phase plan, RAMS, toolbox talk and permit, and the apprentice's role at each link.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The documentation chain</ContentEyebrow>

          <ConceptBlock
            title="Why the paperwork exists — turning regulation into safe work"
            plainEnglish="The H&S regulations set duties (assess risk, control hazards, protect workers and the public). The documentation chain — pre-construction info, construction phase plan, RAMS, toolbox talks, permits — is how those duties are translated into specific instructions for specific work on a specific day. Done well, it's a working tool. Done badly, it's a paper trail that doesn't reflect reality."
            onSite="The chain is how the firm demonstrates after an incident that the duty was being met. The HSE inspector traces backwards from the incident — what RAMS, what toolbox talk, what permit, what training? A complete chain is a defence; a missing link is a prosecution. As an apprentice you sit at the bottom of the chain (you read, follow, flag) but you're inside it just as much as the director who signed the policy."
          >
            <p>
              The chain runs in this order:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pre-construction information</strong> — site conditions, existing
                hazards, asbestos register, services drawings, ground conditions. Provided by
                the client / principal designer to anyone bidding for or working on the project.
              </li>
              <li>
                <strong>Construction phase plan</strong> (CDM 2015 Reg 12) — site rules, hazards,
                welfare, induction, emergency procedures. Owned by the principal contractor on
                notifiable projects.
              </li>
              <li>
                <strong>RAMS</strong> — risk assessment + method statement for each work
                package. Owned by the contractor doing the work.
              </li>
              <li>
                <strong>Toolbox talk</strong> — short shift-start briefing on a specific topic.
                Recorded with attendance.
              </li>
              <li>
                <strong>Permit-to-work</strong> — formal authorisation for specific higher-risk
                activities (hot work, confined space, live work). Time-bounded, signed in and
                signed out.
              </li>
              <li>
                <strong>Incident reporting</strong> — closing the loop so the chain can be
                strengthened for next time.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>RAMS — Risk Assessment + Method Statement</ContentEyebrow>

          <ConceptBlock
            title="The two halves of RAMS — assessment and method"
            plainEnglish="Risk Assessment identifies the hazards, evaluates the risk (likelihood × consequence) and lists the controls. Method Statement sets out HOW the work will be done step by step, building the controls into the workflow. Together they are the working H&S document for the job."
            onSite="Most firms use a template RAMS as a starting point, then tailor it for the specific job. The tailoring is what matters. A generic 'standard electrical install — usual precautions' is a template-trap that an inspector will spot in seconds. A RAMS that names the specific site, the specific hazards from the walk-round, the specific access kit, and the specific steps in order, is evidence of a competent firm."
          >
            <p>
              What a good RAMS includes:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Project / site identification</strong> — address, contract reference,
                client, dates.
              </li>
              <li>
                <strong>Scope of work</strong> — specifically what&apos;s being done (not
                &quot;electrical work&quot; — the actual tasks).
              </li>
              <li>
                <strong>Hazards identified</strong> — from the walk-round, the pre-construction
                info, the trade experience.
              </li>
              <li>
                <strong>Risk evaluation</strong> — likelihood and consequence rating, often via
                a 5x5 matrix.
              </li>
              <li>
                <strong>Control measures</strong> — for each hazard, the controls applied in
                hierarchy order (eliminate, substitute, engineering, admin, PPE).
              </li>
              <li>
                <strong>Method statement</strong> — step-by-step procedure for doing the work
                safely.
              </li>
              <li>
                <strong>Operatives</strong> — who&apos;s involved, their competence, their
                training records.
              </li>
              <li>
                <strong>Emergency arrangements</strong> — what happens if something goes wrong,
                who&apos;s called, where the first aid is.
              </li>
              <li>
                <strong>Sign-off</strong> — author, reviewer, operatives confirming they&apos;ve
                read and understood.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Management of Health and Safety at Work Regulations 1999 — Reg 3(1) and Reg 4 Schedule 1 (principles of prevention)"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 3(1)</strong> — &quot;Every employer shall make a suitable and
                  sufficient assessment of (a) the risks to the health and safety of his employees
                  to which they are exposed whilst they are at work; and (b) the risks to the
                  health and safety of persons not in his employment arising out of or in
                  connection with the conduct by him of his undertaking&hellip;&quot;
                </p>
                <p>
                  <strong>Reg 4</strong> — &quot;Where an employer implements any preventive and
                  protective measures he shall do so on the basis of the principles specified in
                  Schedule 1 to these Regulations.&quot; Schedule 1 lists nine principles of
                  prevention — avoid risks, evaluate risks that cannot be avoided, combat risks at
                  source, adapt the work to the individual, adapt to technical progress, replace
                  the dangerous with the less dangerous, develop a coherent overall prevention
                  policy, give collective protective measures priority over individual protective
                  measures, give appropriate instructions to employees.
                </p>
              </>
            }
            meaning={
              <>
                Reg 3 mandates the assessment; Reg 4 mandates that the controls follow the
                hierarchy in Schedule 1. The RAMS is how the firm demonstrates compliance with
                both. A risk assessment that doesn&apos;t apply the principles of prevention
                isn&apos;t &apos;suitable and sufficient&apos; under Reg 3 even though it
                exists.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 3, Reg 4 and Schedule 1 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Toolbox talks</ContentEyebrow>

          <ConceptBlock
            title="Short, focused, recorded — the daily safety conversation"
            plainEnglish="A toolbox talk is a short pre-shift safety briefing on a single topic. Typically 5-10 minutes. Delivered by the supervisor or a senior operative. Attended by the on-site team. Recorded — names of attendees, topic covered, date — so the firm has evidence of ongoing safety communication."
            onSite="The point of toolbox talks is to keep the formal RAMS active in daily work. A RAMS sits in a folder; the toolbox talk pulls one element out and puts it in front of everyone before the shift starts. Done well, it's the most engaged safety contact most operatives have during a working week. Done badly, it's a sign-and-forget ritual that nobody listens to."
          >
            <p>
              Effective toolbox-talk topics for an electrical team:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Safe isolation procedure refresh — particularly after any near-miss elsewhere in
                the firm.
              </li>
              <li>
                Working-at-height kit selection on today&apos;s job.
              </li>
              <li>
                A specific tool — proper use, common faults, when to take it out of service.
              </li>
              <li>
                A recent industry incident — what happened, what we&apos;d do differently.
              </li>
              <li>
                Manual handling for the day&apos;s deliveries (cable drums, switchgear).
              </li>
              <li>
                Asbestos awareness refresher when working in pre-2000 buildings.
              </li>
              <li>
                Fire-safety procedures specific to the site.
              </li>
              <li>
                Mental health / wellbeing topics — increasingly part of construction site
                culture.
              </li>
            </ul>
            <p>
              The HSE leaflet INDG259 (Toolbox talks: a step-by-step guide) is the established
              guidance. Free template content is also widely available from PASMA, IPAF, JIB
              and the various trade bodies.
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

          <ContentEyebrow>Permit-to-work — hot work, confined space, live work</ContentEyebrow>

          <ConceptBlock
            title="Permits authorise specific higher-risk activities within a bounded scope"
            plainEnglish="A permit-to-work is a formal document that authorises a specific higher-risk activity within a specific time window. It identifies the operatives, lists the precautions, and is signed by the issuing authority before work starts and again at completion. Permits are the standard control for hot work, confined-space entry, live work and high-energy switching."
            onSite="The permit isn't paperwork for its own sake — it's a control mechanism. The act of raising the permit forces a structured conversation between the issuing authority and the operative about what the work is, what the precautions are, and what the boundaries of the authorisation are. Many incidents have been prevented by the permit conversation surfacing a precaution that hadn't been thought through."
          >
            <p>
              The three permits an electrical apprentice is most likely to encounter:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hot-work permit</strong> — for any work involving open flame, sparks
                or high heat (gas torch on copper bonding, grinding, welding). Required on
                commercial premises and increasingly on domestic insurance-driven contracts.
              </li>
              <li>
                <strong>Confined-space permit</strong> — required by the Confined Spaces
                Regulations 1997 for entry to a confined space. Includes atmospheric monitoring,
                rescue arrangements, communication.
              </li>
              <li>
                <strong>Live-work permit</strong> — required by EAWR 1989 Reg 14 for any work on
                or near live conductors. Must demonstrate that all three Reg 14 conditions are
                met (unreasonable to do dead, reasonable to do live, suitable precautions).
              </li>
            </ul>
            <p>
              On industrial and healthcare sites you&apos;ll also see permits-to-isolate (formal
              isolation authorisation), permits for high-voltage switching, and access permits
              for restricted areas.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Hot-work permit — the fire watch is the real control"
            plainEnglish="Hot work creates a fire risk that persists after the work has stopped. A smouldering ember in fibreglass insulation, between floorboards, or in an unseen void can ignite hours later. The hot-work permit's most important precaution is the fire watch — typically a competent person remaining in the area for 30-60 minutes after work ceases, watching for any sign of smoke or heat."
            onSite="On a commercial fit-out the permit is issued by the principal contractor's site manager or fire warden. As the operative carrying out the hot work you accept the permit, confirm the precautions are in place, do the work within the time window, and stay (or arrange a cover) for the fire watch period. Sign-off at the end is critical — the permit is closed only when the area is confirmed safe."
          >
            <p>
              Hot-work permit minimum content:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Location and specific activity.
              </li>
              <li>
                Operative names and competence.
              </li>
              <li>
                Permit start time and end time.
              </li>
              <li>
                Precautions: combustibles cleared (typically 11m radius for welding, less for
                light torch work), fire blanket and extinguisher within arm&apos;s reach, fire
                detection isolation if needed (with separate sub-permit).
              </li>
              <li>
                Fire watch arrangements: who, for how long after work ceases.
              </li>
              <li>
                Sign-on by issuer + operative.
              </li>
              <li>
                Sign-off by operative + fire watch on completion.
              </li>
            </ul>
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
                Reg 14 makes live work the explicit exception. ALL THREE limbs (a) (b) (c) have
                to be satisfied — it has to be unreasonable to make the conductor dead AND
                reasonable to work on it live AND suitable precautions in place. The permit-to-
                work is how the firm demonstrates that all three have been considered. Without a
                permit, any live work is prima facie a Reg 14 breach.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 14 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Confined Spaces Regulations 1997 — Reg 4 and Reg 5"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 4(1)</strong> — &quot;No person at work shall enter a confined
                  space to carry out work for any purpose unless it is not reasonably practicable
                  to achieve that purpose without such entry.&quot;
                </p>
                <p>
                  <strong>Reg 5(1)</strong> — &quot;Without prejudice to regulation 4, so far as
                  is reasonably practicable, no person at work shall enter or carry out any work
                  in or (other than as a result of an emergency) leave a confined space otherwise
                  than in accordance with a system of work which, in relation to any relevant
                  specified risks, renders that work safe and without risks to health.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Reg 4 prohibits entry unless it&apos;s not reasonably practicable to do the work
                without entering — the &apos;don&apos;t enter if you can avoid it&apos; rule.
                Reg 5 requires a safe system of work for entry where it can&apos;t be avoided —
                in practice this means an entry permit, atmospheric monitoring, communications,
                and rescue arrangements. Reg 5(1) also requires emergency exit arrangements.
                Failures here have killed multiple electricians on industrial and infrastructure
                sites.
              </>
            }
            cite="Source: Confined Spaces Regulations 1997 (SI 1997/1713), Reg 4 and Reg 5 — verbatim from legislation.gov.uk."
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
            title="Writing a generic RAMS that doesn't reflect the actual site"
            whatHappens={
              <>
                Apprentice is given a template RAMS by the office for a domestic CU change.
                Same template the firm uses for every CU change. Fills in the address and the
                date, doesn&apos;t change anything else, signs it. On site the property turns
                out to be a 1930s end-terrace with a TT earthing system, a meter that&apos;s 60
                years old, a cellar with a textured ceiling, and three children present. None of
                this is in the RAMS. After-incident audit finds the RAMS was a copy of the
                previous customer&apos;s document with the address swapped. HSE inspector treats
                it as evidence the assessment wasn&apos;t suitable and sufficient under MHSWR
                Reg 3. Firm gets a notice; supervisor gets a personal interview under caution.
              </>
            }
            doInstead={
              <>
                Templates are fine as a starting point but they have to be tailored. Walk the
                site, identify the specific hazards that aren&apos;t in the template, add them
                to the document with the controls. If the conditions on site differ materially
                from the template, stop and have the RAMS revised before work starts. The five
                minutes spent tailoring is what turns the document from prosecution evidence
                into defence evidence.
              </>
            }
          />

          <CommonMistake
            title="Doing live work without a permit because 'it's quicker'"
            whatHappens={
              <>
                Senior operative is on a fault-finding job on a commercial DB. Decides to test
                voltages live without isolating because &quot;the customer&apos;s in a rush and
                we&apos;ll be done in five minutes&quot;. No permit. Apprentice watches and learns
                the wrong lesson. A slip with a probe causes a phase-to-phase arc fault, melted
                copper sprays the operative&apos;s face, eye injury, partial vision loss.
                Investigation finds: no permit (EAWR Reg 14 breach), no PPE for live work (PPE
                Regs Reg 4 breach), no honest answer to whether the work could have been done
                dead (it could). HSE prosecution follows; insurance claim from the apprentice
                for the witnessed trauma; firm loses the contract.
              </>
            }
            doInstead={
              <>
                Live work is the exception, not the rule. EAWR Reg 14 requires a documented
                justification. The permit-to-work is the standard mechanism for that
                justification. No permit = no live work, full stop. The apprentice should also
                refuse to be in the area during unauthorised live work — HASAWA s.7 makes that
                a personal duty. Speak up before the work starts, not after.
              </>
            }
          />

          <Scenario
            title="Soldered earth bond on a copper cold-water pipe in a commercial kitchen during opening hours"
            situation={
              <>
                You&apos;re second-year on a commercial maintenance contract. The site manager at
                a busy gastropub asks you to add a soldered earth bond on a copper cold-water
                pipe in the kitchen during opening hours. The kitchen is full of staff prepping
                for service, the gas hobs are on, oil is heating in fryers, towels and aprons
                are everywhere, and the customer wants the work done in the next hour. What
                permits, toolbox talks and RAMS are needed before this can proceed?
              </>
            }
            whatToDo={
              <>
                Stop. This work cannot proceed in this environment under these conditions. The
                soldered joint requires a gas torch (hot work) in an environment full of
                combustibles (oils, towels, paper) with multiple ignition sources already
                present. Required documentation chain before any work can start: <strong>RAMS</strong>
                — site-specific risk assessment identifying the kitchen environment, the
                combustibles, the staff present, the gas isolation route, the alternative
                methods (clamp-on bonding clamp instead of solder eliminates the hot work
                entirely). <strong>Toolbox talk</strong> — pre-shift briefing on the specific
                fire risks of hot work in food-prep environments, the fire-watch requirement,
                and the agreed precautions. <strong>Hot-work permit</strong> — issued by the
                site manager / duty fire warden, listing the time window (preferably outside
                opening hours), the precautions (kitchen cleared of combustibles in working
                radius, fryers off, fire blanket/extinguisher to hand, fire watch for 60 minutes
                post-work), and the fire-detection isolation if needed (with separate sub-
                permit). <strong>Realistic outcome</strong> — the right answer is to substitute
                a clamp-on bonding clamp for the soldered joint (eliminate the hot work
                entirely), or to reschedule the work to outside opening hours when the kitchen
                is empty. Trying to do this during a busy service with paying diners in the
                premises is the textbook prosecutable failure.
              </>
            }
            whyItMatters={
              <>
                Customer pressure to do work in the wrong window, in the wrong way, with the
                wrong precautions, is the most common cause of preventable incidents in
                commercial maintenance. The documentation chain — RAMS, toolbox talk, permit
                &mdash; isn&apos;t bureaucracy; it&apos;s the structured pause that gives you
                the time and the standing to push back on the unreasonable request. As an
                apprentice your role is to flag the absence of any link in the chain to your
                supervisor &mdash; HASAWA s.7 makes that a personal duty.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "RAMS = Risk Assessment + Method Statement. Risk assessment is statutory under MHSWR 1999 Reg 3; method statement is how the assessed risks become a step-by-step working procedure.",
              "Templates are fine as a starting point but they have to be tailored to the actual site. The 'template trap' — generic wording that doesn't reflect the conditions — is what an inspector spots first.",
              "Toolbox talks are short pre-shift briefings on a single topic, recorded with attendance. They keep the formal RAMS active in the day-to-day work.",
              "Permits-to-work authorise specific higher-risk activities — hot work, confined space, live work, high-energy switching. The permit is a formal document with start/end times, precautions and signatures.",
              "EAWR 1989 Reg 14 makes live work the exception. All three conditions — unreasonable to do dead, reasonable to do live, suitable precautions — must be satisfied. The permit-to-work is how the firm demonstrates that.",
              "Confined Spaces Regulations 1997 Reg 4 prohibits entry unless it isn't reasonably practicable to do the work without entering. Reg 5 requires a safe system of work (entry permit, atmospheric monitoring, rescue) where entry is needed.",
              "Hot-work permits include a mandatory fire-watch period (typically 30-60 minutes after work ceases) — smouldering ignition can persist long after the visible work has stopped.",
              "The apprentice's role in the documentation chain is real but bounded — read the RAMS, attend the toolbox talks, work within the scope of any permit, flag anything on site that doesn't match. HASAWA s.7 makes all of this a personal duty.",
            ]}
          />

          <Quiz title="RAMS, toolbox talks and permits — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section2/2-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.4 Site-type prep deep dive
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 3 — Installing wiring systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
