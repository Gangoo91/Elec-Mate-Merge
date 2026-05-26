/**
 * Module 5 · Section 5 · Subsection 4 — EICR reporting, customer comms,
 * remedial works prioritisation
 * Maps to C&G 2365-03 / Unit 304 / LO5 / AC 5.3 — "describe the recording and
 *   reporting of periodic inspection and testing results"
 *
 * Layered depth: 2357 Unit 607 ELTK06 / AC 4.x; 2366-03 Unit 302 / AC 4.x
 * (recording and certification of inspection and testing).
 *
 * The L3 lift on EICR reporting — beyond filling in the Schedule of Test
 * Results into the active phase: how you write the Observations narrative for
 * a non-technical duty holder, how you brief the customer face-to-face, how
 * you sequence the remedial works recommendations into a defensible priority
 * order so the duty holder knows what to fix first, and what the legal
 * framework expects of both inspector and recipient once the report lands.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

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

const TITLE = 'EICR reporting and remedial prioritisation | Level 3 Module 5.5.4 | Elec-Mate';
const DESCRIPTION =
  'Writing the EICR for the duty holder, briefing the customer face-to-face, and sequencing remedial works into a defensible priority order. Section K Observations, Schedule of Test Results, and the customer-facing handover.';

const checks = [
  {
    id: 'm5-s5-sub4-handover',
    question: "On completion of an EICR you should:",
    options: [
      "Disposable filtering facepiece masks rely on a tight face seal to filter the air. Facial hair (stubble or beard) inside the seal area allows leakage past the seal — typically 10-20% of inhaled air bypasses the filter. The mask is no longer providing the rated protection. INDG479 (HSE guidance on RPE fit testing) is explicit that disposable masks are not suitable for bearded workers — they need a powered air-purifying respirator (PAPR) with a loose-fitting hood.",
      "Walk the customer through the report on site or by booked call — explain the overall classification, walk through each C1/C2/FI observation, agree the remedial works priority, confirm the make-safe actions taken (if any) for C1 items, give the customer the report in writing with attached photos where available, and confirm the next inspection date recommendation. Document the handover.",
      "Cooperate (HASAWA s.7 + CDM Reg 15). Confirm your name and role. Direct the inspector to the senior person on site (supervisor, contracts manager, site manager). Answer factual questions truthfully — interfering with an inspector is a separate offence under HASAWA s.33. If asked technical questions outside your competence, say so honestly. Do not speculate or guess. Notify your firm immediately.",
      "Because it covers the whole work activity (not just the install), it covers operation, use AND maintenance, AND it covers work NEAR a system as well as on it. So it's the legal hook for safe-isolation procedures, lock-off, voltage-proving, and the way you organise the work around live equipment that you're not directly working on. Reg 4(3) is what the HSE charges most often after an electrical incident.",
    ],
    correctIndex: 1,
    explanation:
      'The EICR is a safety document and the handover is part of the inspection. Customers — especially landlords and homeowners without electrical knowledge — cannot be expected to interpret a coded report unaided. The verbal-plus-written handover ensures the duty holder understands what was found, what action is needed, and on what timescale. The handover also documents the inspector\'s discharge of the "communication" half of the EAWR continuing duty. Sending a report by email without explanation is a process failure that leaves real risks unaddressed because the recipient does not understand them.',
  },
  {
    id: 'm5-s5-sub4-priority',
    question: "An EICR has the following findings: 1× C1 (exposed live conductor in hallway socket, made safe by isolation), 2× C2 (missing main bonding to gas, missing RCD on downstairs ring), 4× C3 (improvement recommendations on labelling and CU upgrade). The remedial works priority order is:",
    options: [
      "Check the light curtain alignment, clean the lenses, inspect for environmental contaminants (dust, coolant mist), verify the safety relay status, check wiring connections, review the maintenance history for recurring issues, and ensure the safety distance calculation is still valid",
      "A daily site diary entry for that Saturday plus the employer-signed time sheet for that week. The diary records what you did and who you were with; the time sheet records the hours and is countersigned by the employer. The two together form a contemporaneous, independently witnessed record. Without them, the dispute is your word against the firm's — and that's a position you don't want to be in.",
      "C1 first within hours of report issue (re-energising the isolated circuit safely is the urgent task), C2 next within 28 days under PRS Regs (or as agreed), C3 at next opportunity. Within each code, sequence by safety impact and access — bonding first because it underpins every other safety layer, then RCD installation, then C3 improvements at convenient time.",
      "Toolbox talks are short pre-shift safety briefings on a single topic — the RAMS for the day, a recent near-miss, a seasonal hazard. They keep the formal RAMS active in the day-to-day work. Recorded with attendance. Together with the RAMS sign-on they form the daily safety briefing chain.",
    ],
    correctIndex: 2,
    explanation:
      "Remedial sequencing is risk-based and time-bound. C1 trumps C2 trumps C3. Within C2, sequence by safety impact — main bonding underpins ADS for the whole installation so it comes before RCD installation on a single circuit. The PRS Regulations 2020 set a 28-day landlord statutory deadline for remediation of Unsatisfactory items in rented dwellings; commercial and owner-occupied installations follow contractual / risk-led timescales. Document the recommended sequence on the EICR Observations section so the duty holder has a clear action plan — not just a list of defects.",
  },
  {
    id: 'm5-s5-sub4-recipients',
    question: "The EICR for a tenanted dwelling under the PRS Regulations 2020 must be provided to:",
    options: [
      "Conservation areas, listed buildings and Article 4 zones often remove the standard “permitted development” exemption that covers domestic PV — meaning the customer has to apply for full planning permission, which can be refused on aesthetic grounds.",
      "Apply SLAM: stop the current activity, look for the source of the smell, assess whether it indicates a new hazard (overheating, insulation failure), and manage by withdrawing if necessary, de-energising the panel if safe to do so, and reporting the finding",
      "The landlord (within 28 days of the inspection), the existing tenants (within 28 days), any new tenants before they move in (with the EICR), the local authority on request (within 7 days), and the inspector retains a copy. The PRS Regs set explicit recipient and timescale requirements that are separate from the inspection itself.",
      "Nine — explosive, flammable, oxidising, gas under pressure, corrosive, toxic, harmful / irritant, health hazard (long-term / chronic), environmental hazard. Each is red-bordered diamond. The label is supplemented by hazard statements (H-codes) and precautionary statements (P-codes).",
    ],
    correctIndex: 2,
    explanation:
      "The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 set explicit recipient duties on the landlord. The landlord must provide the EICR (or written confirmation of compliance) to existing tenants within 28 days of the inspection, to new tenants before they occupy, to the local authority within 7 days of a request, and retain a copy for at least the next inspection cycle (5 years). The inspector should brief the landlord on these duties at handover — many landlords are unaware of the recipient obligations and assume the report is for their files only.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The EICR Observations section (Section K on the model form) should:',
    options: [
      "Every person who is or may be affected by the risk and who needs the information to manage it — this typically includes the principal designer, principal contractor, other designers, contractors, and ultimately the end users via the health and safety file",
      "For each observation: state what was observed (specific, located, factual), why it matters (the risk in plain terms), the relevant BS 7671 reference, the recommended action, and the classification code. Photos attached or referenced where available.",
      "Dedicated circuit(s) for each charging point with appropriate cable sizing; 30 mA Type A RCD as a minimum (or Type B where the EVSE does not contain integral DC fault protection); PME earthing considerations; labelling; and sizing for continuous load at the maximum rated output of the charger",
      "Business description, target market and competition, services and pricing strategy, financial projections (year 1 month-by-month, years 2-3 quarterly), marketing plan, operational plan. A working document, not a one-time exercise.",
    ],
    correctAnswer: 1,
    explanation:
      "Section K is where the codes get their reasoning. A code without narrative is half a record. The structure — observed / why it matters / reg reference / recommended action / code — gives the duty holder what they need to commission remediation, gives the next inspector what they need to understand the prior state, and gives any HSE investigator the audit trail needed to assess the inspection's quality. Plain language for the description and recommendation, technical reg references for precision — both, not one or the other.",
  },
  {
    id: 2,
    question: "When writing for a non-technical duty holder (typical landlord, homeowner), the right register is:",
    options: [
      "Account-for personnel from the firm; ensure customers / visitors in your care have evacuated; liaise with the building's responsible person and fire-marshal at the muster point; provide accurate information to fire service if asked; prevent re-entry; preserve the scene afterwards if relevant to your firm's work.",
      "Apprentice (graded by year of apprenticeship) → on completion of Level 3 + AM2/E + 18th Ed → Electrician → with additional experience and competence demonstration → Approved Electrician → with further design / fault-finding competence → Technician. Each grade unlocks higher pay (set by the JIB National Working Rules) and a wider scope of work the operative can carry out unsupervised on JIB-affiliated sites.",
      "Plain language for what was found and what to do, with technical references in brackets where they add precision (e.g. \\\\\\\\\\\\\\\"Main protective bonding to incoming gas service is missing — the wire that connects the gas pipe to the main earth is not present. Reg 411.3.1.2 requires this bonding to prevent dangerous touch voltages on a fault.\\\\\\\\\\\\\\\").",
      "Per BS 7671 Section 712 (PV) and Section 426 (electrical equipment for safety services) plus the manufacturer\\\\\\\\'s installation instructions — typically the battery enclosure needs equipotential bonding back to the system earth, the DC busbars require fault-current path provisions, and the AC-coupled inverter must comply with the standard ADS framework. Battery installs add complexity over straight PV.",
    ],
    correctAnswer: 2,
    explanation:
      "The duty holder reads the EICR; they need to act on it. Plain-language description of what was found and what to do gives them the operational understanding to commission remediation. Technical references in brackets give them the precision to verify with another electrician if they want a second opinion. This dual register — accessible primary text with technical anchors — is the hallmark of a good EICR. Pure jargon excludes the duty holder; pure plain language excludes the technical reader.",
  },
  {
    id: 3,
    question: "The Schedule of Test Results (the table of measurements) must include, as a minimum per circuit:",
    options: [
      "A structured plan that includes: self-assessment (identifying current EI strengths and gaps), specific goals (which competencies to develop), practice opportunities (real situations to apply new skills), feedback mechanisms (trusted people who will give honest observations), reflection practices (regular review of progress), and accountability (commitments to specific actions with review dates)",
      "Servant leadership embodies advanced EI: it requires empathy (understanding team needs), self-regulation (managing ego and the desire to command), motivation (finding purpose in developing others), and social skills (creating environments where people thrive) — the leader's primary role is to remove obstacles and enable their team's success",
      "Pass. The maximum trip time at 1 x I delta n for a general-purpose 30 mA RCD is 300 ms per the product standard, and the system disconnection time is 400 ms (TN) or 200 ms (TT) per Table 41.1. 35 ms is well under all limits. A trip time of 35 ms is typical for a healthy modern RCD; older RCDs may give 80-200 ms — also within limits. Trip times near or exceeding 300 ms suggest the RCD is approaching end of life and should be replaced.",
      "Circuit reference, conductor sizes (line, neutral, CPC), protective device type and rating, RCD operating current and operating time (where applicable), R1+R2 or R2 (depending on test method), insulation resistance values (line-line, line-earth, neutral-earth), polarity confirmation, Zs value, RCD operating time, and any test instrument identification needed for traceability.",
    ],
    correctAnswer: 3,
    explanation:
      "The Schedule of Test Results is the technical record. The minimum content is set by the model schedule in BS 7671 Appendix 6 and reproduced by the schemes (NICEIC, NAPIT, Stroma). All measurements relevant to the circuit's compliance assessment must be recorded. Missing values (e.g. recording R1+R2 but not IR) leave the schedule incomplete and make the inspection harder to defend. Test instrument traceability — model and serial number, last calibration date — supports the technical defensibility of the readings.",
  },
  {
    id: 4,
    question: 'A landlord receives an EICR marked Unsatisfactory with 2× C2 findings. Under the PRS Regulations 2020 the landlord must:',
    options: [
      "Carry out the remedial works within 28 days of receiving the report (or within a shorter period specified on the report), obtain written confirmation from a competent person that the works have been completed and the installation is now safe, and provide that confirmation to existing tenants within 28 days and to the local authority on request.",
      "(a) To take reasonable care for the health and safety of themselves and of other persons who may be affected by their acts or omissions at work; and (b) to co-operate with the employer or any other person to enable that person to comply with their statutory duty.",
      "Account-for personnel from the firm; ensure customers / visitors in your care have evacuated; liaise with the building's responsible person and fire-marshal at the muster point; provide accurate information to fire service if asked; prevent re-entry; preserve the scene afterwards if relevant to your firm's work.",
      "Fluorinated greenhouse gases — refrigerants used in air conditioning, heat pumps and refrigeration equipment. Hydrofluorocarbons (HFCs) particularly. Phase-down quotas, mandatory leak-checking on equipment containing 5+ tonnes CO2e of F-Gas, certified personnel for installation/maintenance, and ban on certain F-Gases in new equipment from set dates.",
    ],
    correctAnswer: 0,
    explanation:
      "The PRS Regulations 2020 are statutory. An Unsatisfactory report triggers a 28-day landlord remediation duty (or shorter where the report specifies). The remediation must be carried out by a competent person and confirmed in writing. Failure to act exposes the landlord to local authority enforcement with civil penalties up to £30,000 per breach, and where the failure leads to tenant injury exposes the landlord to civil and potentially criminal liability. Inspectors should brief landlords on these duties at the handover — many do not know.",
  },
  {
    id: 5,
    question: "When briefing a customer who pushes back on a C2 finding (\"the installation has been like that for 20 years and no one has been hurt\"), the right professional response is:",
    options: [
      "A bespoke evacuation plan for a person with a disability or specific need who cannot use the standard evacuation route unaided. Required under the Equality Act 2010 and embedded in fire safety arrangements under RRFSO 2005. Covers refuge points (typically protected lobbies for wheelchair users), designated buddies, communication aids and re-entry sequence.",
      "Hold the line on the coding — explain the BPG4 logic for C2 (single foreseeable fault scenario), reference the specific risk in plain terms, document the conversation. The absence of harm to date does not change the risk; it means the foreseeable fault has not yet occurred. The professional duty under EAWR Reg 16 (competence) and the inspector's continuing Reg 4 duty both require honest coding, not customer-pleasing coding.",
      "Because the drawings, specs, schedules and schematics tell you exactly what cable, what circuit, what containment, what termination, and where it goes. Build the first-fix to a memory of what the customer said and you'll either be ripping it out at second-fix or fixing it on a snag list. Design documents are how 'what was specified' gets turned into 'what was installed' — and the as-built mark-up at the end is how the next person on site (maintenance, inspector, future works) understands what you did.",
      "Around 10% of the UK population is estimated to have dyslexia (British Dyslexia Association figure), with research suggesting prevalence may be materially higher in trade roles where visual-spatial reasoning is favoured. That means in a typical apprentice cohort of 20, two to four people are likely to be dyslexic. Plain English briefings, visual aids, audio material, extra time on written assessments and the option of practical demonstration are the standard reasonable adjustments — and they help non-dyslexic learners too.",
    ],
    correctAnswer: 1,
    explanation:
      "Customer pushback on coding is common and usually rooted in cost concern. The professional response is to explain the reasoning, hold the coding, document the conversation. \"The installation has been like that for 20 years\" is not a defence — it means the installation has been in C2 condition for 20 years and the foreseeable fault has not yet occurred. Code integrity matters more than customer comfort; an inspector who downgrades codes under pressure becomes commercially attractive in the short term and professionally indefensible in the long term. The conversation is documented so the inspector's record shows the integrity of the coding decision.",
  },
  {
    id: 6,
    question: 'A pre-existing inaccessible defect that you cannot inspect during the EICR (e.g. cable in a sealed wall void) should be:',
    options: [
      "A poor power factor increases current draw for the same real power, causing overheating in cables and equipment, increased losses, higher electricity costs from reactive power charges, and may indicate failing capacitors that need replacement during maintenance",
      "A failure in the management system — inadequate supervision, lack of ongoing ground assessment procedures, and insufficient pre-use checks allowing multiple safety barriers to be breached simultaneously",
      "Coded as FI with a recommended investigation route, recorded under Limitations on the EICR, and brought to the duty holder's attention in the handover so they can commission the investigation as a separate work item. The EICR cannot certify what cannot be inspected.",
      "Confirm with the training provider when results will be confirmed, and delay the gateway submission until the qualification is evidenced — most EPAOs require confirmed results, not pending ones",
    ],
    correctAnswer: 2,
    explanation:
      "An EICR can only certify what was inspected. Inaccessible items must be recorded under Limitations and, where they are material to the safety assessment, coded FI with a recommended investigation. The duty holder commissions the investigation as a follow-up work item — typically opening the wall void or other access — and the FI is closed when the investigation result is known. Quietly ignoring inaccessible items is a quality failure that leaves real risk uncharacterised and the inspector exposed if a defect later emerges.",
  },
  {
    id: 7,
    question: 'The recommended next inspection date on an EICR should be set by:',
    options: [
      "Understand why different assets have different maintenance strategies, contribute to criticality assessments using their operational knowledge, prioritise their own work based on asset criticality, and explain to colleagues why maintenance effort varies between assets",
      "Acknowledge the alarm, check the UPS control panel for specific fault details, perform battery impedance or resistance testing, check battery terminal voltages and connections, assess the remaining battery autonomy, and report the findings with a recommendation for battery replacement if required",
      "Written communication carries emotional tone even without non-verbal cues. EI in writing means: considering how the reader will feel when they read it, choosing words that are clear and respectful, avoiding language that could be interpreted as blame or aggression, and re-reading messages before sending to check for unintended emotional impact — especially important when conveying criticism or bad news",
      "The inspector based on the installation type, condition, use, environment, and any defects identified — drawing on GN3 frequency tables as a starting point and adjusting for the specific installation. A property in good condition might justify the standard 5-year interval; one with multiple recent defects might justify a shorter cycle.",
    ],
    correctAnswer: 3,
    explanation:
      "The recommended next-inspection date is a technical judgement, not a default. GN3 frequency tables (rented dwellings 5 years, owner-occupied dwellings 10 years, commercial 5 years, industrial 3 years, special locations as relevant) are starting points. The inspector adjusts based on installation condition, the number and severity of defects identified, the trajectory of the installation (improving or deteriorating), and the duty holder's maintenance regime. A heavily-defective installation that is being remediated may warrant a shorter cycle to verify the remediation; a well-maintained installation in good condition may justify the standard cycle.",
  },
  {
    id: 8,
    question: 'On a Satisfactory EICR with only C3 findings, the inspector should still:',
    options: [
      "Brief the customer on the C3 recommendations, explain that no immediate action is required, agree which improvements the customer plans to address and on what timescale, and confirm the next inspection date. Even Satisfactory reports merit a verbal handover so the C3 recommendations have a chance of being acted on rather than filed and forgotten.",
      "To protect the public, maintain industry standards and uphold the profession's reputation. The codes formalise the link between technical competence and ethical behaviour — both are needed to be a competent electrician within the meaning of EWR 1989.",
      "Sole trader: 5 years from the 31 January Self Assessment deadline for that tax year — so effectively 5 years and 10 months from the end of the tax year. Ltd company: 6 years from the end of the company's accounting period. VAT registered: 6 years for VAT records. Practical advice: keep all records 7+ years. Cloud accounting (Xero, QuickBooks, FreeAgent) makes this easier — records stored indefinitely.",
      "A pro forma is a quote-style document that looks like an invoice but doesn't trigger a tax point — typically used for upfront payment requests before work begins (e.g. materials deposit). Once the customer pays the pro forma, you issue the actual VAT invoice. Useful for cash-flow management on jobs where you need materials money upfront. Doesn't count toward turnover until converted to a real invoice.",
    ],
    correctAnswer: 0,
    explanation:
      "C3 findings are improvements, not defects — but they are still recommendations the inspector has made for a reason. A verbal handover keeps the recommendations alive in the customer's mind and gives the inspector a chance to flag which C3s are worth prioritising. \"You don't have to act on these but if you are doing other work in this room, this is a good time to refresh the labelling and replace the old plastic CU with a metal one.\" The handover is part of the inspection's value-add, not an extra; building it into every job is good professional practice.",
  },
];

const faqs = [
  {
    question: 'How quickly should the EICR be issued after the inspection?',
    answer:
      "Best practice — same day for the verbal handover, written report within 7 days. Under the PRS Regulations 2020 the landlord must provide the EICR to tenants within 28 days of the inspection — the report itself needs to be in the landlord's hands well before that to allow them to comply. Holding reports for weeks erodes the customer relationship and risks the inspector forgetting on-site detail that is hard to reconstruct from notes alone. Most professional inspectors issue the report within 48-72 hours; the technology (tablet-based reporting) makes same-day issue achievable for routine domestic EICRs.",
  },
  {
    question: 'Should I include photos in the EICR?',
    answer:
      "Yes — wherever the system supports it. Photos of as-found defects (especially C1/C2 items), photos of make-safe actions taken, photos of equipment IDs and ratings, photos of unusual installation features. Photos transform an EICR from a paper record into a contemporaneous evidence pack. Useful for the duty holder to understand what was found, useful for the next inspector to trace history, useful for any HSE investigation. Most modern report systems (Elec-Mate, NICEIC Online, NAPIT EICR Online) support photo attachment per observation.",
  },
  {
    question: 'How do I prioritise remedial works on a multi-defect EICR?',
    answer:
      'Risk-based and time-bound. C1 first — within hours of issue, the make-safe action you took on site needs to be made permanent. C2 next — within 28 days for rented dwellings under PRS Regs, or as agreed for other property types. Within C2, sequence by safety impact (e.g. main bonding before RCD installation on a single circuit, because bonding underpins every other safety layer). C3 at next convenient opportunity — typically when other work is being done in the same area. Document the recommended sequence on the EICR Observations section so the duty holder has a clear action plan, not just a list.',
  },
  {
    question: "What if the customer disputes my coding after the report is issued?",
    answer:
      "Walk them through the BPG4 logic for the disputed code. Show the evidence — photos, measurements, the foreseeable-fault test that drives the coding decision. If the customer wants a second opinion, encourage them to commission one — a competent second inspector will reach a similar coding if the evidence is sound. Do not change a coding under customer pressure without new evidence; doing so undermines the report's integrity and your professional standing. If after second opinion the disagreement persists, escalate to the scheme provider technical helpline. Document everything — the dispute, your reasoning, the second opinion if obtained, the resolution.",
  },
  {
    question: "Do I need to issue a separate certificate after remedial works?",
    answer:
      "Yes — typically a Minor Works Certificate (MWC) for each remedial item, or an Electrical Installation Certificate (EIC) if the remediation is substantial enough to constitute a new installation or major alteration. The MWC/EIC for remedial works closes the loop on the EICR finding — the original C1/C2 is now remedied and certified. The duty holder retains the original EICR plus the remedial certificates as a matched pair. Some scheme providers offer a \"Remedial Works\" report variant specifically for this purpose.",
  },
  {
    question: 'How long should I retain a copy of the EICR?',
    answer:
      "Minimum 5 years — to cover the standard rented-dwelling cycle and the typical professional indemnity insurance period. Many inspectors retain indefinitely now that storage is cheap and digital. Scheme provider rules vary — NICEIC requires retention for the period of registration plus a tail; NAPIT has its own retention rules. Beyond scheme requirements, retention protects the inspector if a report is ever challenged after the duty holder has lost their copy. Cloud-based report systems (Elec-Mate, scheme-provider portals) make retention straightforward without filing space pressure.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5 · Subsection 4"
            title="EICR reporting and remedial prioritisation"
            description="Writing the report so the duty holder can act on it — Section K Observations, the customer briefing, the remedial sequence, and the recipient duties under the PRS Regulations."
            tone="emerald"
          />

          <TLDR
            points={[
              "Section K Observations — for each finding: what was observed, why it matters, the BS 7671 reference, the recommended action, the classification code. Photos where available.",
              "Customer handover — verbal walk-through plus written report. Explain overall classification, walk through each C1/C2/FI, agree the remedial priority, confirm next inspection date.",
              "Remedial priority — C1 within hours (make permanent the on-site make-safe), C2 within 28 days under PRS Regs (or as agreed), C3 at next convenient opportunity. Sequence within each code by safety impact.",
              "Schedule of Test Results — full per-circuit measurement record per BS 7671 Appendix 6 model schedule. Test instrument traceability supports defensibility.",
              "Recipient duties under PRS Regs 2020 — landlord provides EICR to existing tenants within 28 days, to new tenants before move-in, to local authority within 7 days of request.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Write Section K Observations entries that combine technical precision with plain-language explanation suitable for a non-technical duty holder.",
              "Complete the Schedule of Test Results to BS 7671 Appendix 6 minimum content with full measurement traceability.",
              "Conduct a customer handover that ensures the duty holder understands the report, the urgency, and the recipient duties.",
              "Sequence remedial works into a defensible priority order based on risk and time-bound statutory duties.",
              "Apply PRS Regulations 2020 recipient duties to landlord EICRs — 28-day tenant provision, 7-day local authority response.",
              "Manage customer pushback on coding decisions while maintaining inspection integrity.",
              "Issue follow-up MWC or EIC certification for remedial works to close the loop on EICR findings.",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Writing Section K Observations</ContentEyebrow>

          <ConceptBlock
            title="Section K — the structure of a good Observations entry"
            plainEnglish="Section K is where the codes get their meaning. Each observation needs five pieces — what you saw, why it matters, the relevant regulation, what the duty holder should do, and the classification code. Together they make the report actionable; missing any one of them weakens it."
            onSite="Write Observations as if a non-technical landlord and a future electrician will both read them. The landlord needs the plain explanation; the electrician needs the technical reference. Both, not one or the other."
          >
            <p>The five-part Observations entry, with worked example:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>What was observed.</strong> Specific, located, factual.
                <span className="block mt-1 text-[12.5px] text-white/70 italic">
                  Example: "Main protective bonding conductor to incoming gas service absent. Bonding clamp present at gas meter but conductor terminates 200 mm away with no continuation visible. Gas service confirmed by inspection at meter cabinet."
                </span>
              </li>
              <li>
                <strong>Why it matters.</strong> The risk in plain terms.
                <span className="block mt-1 text-[12.5px] text-white/70 italic">
                  Example: "Without main protective bonding the gas service pipework could rise to fault voltage in a first fault scenario, presenting a touch voltage hazard to anyone in contact with the pipe (e.g. when adjusting a gas appliance valve)."
                </span>
              </li>
              <li>
                <strong>Relevant reference.</strong> BS 7671 reg or GN3 section.
                <span className="block mt-1 text-[12.5px] text-white/70 italic">
                  Example: "BS 7671 Reg 411.3.1.2 — main protective bonding to extraneous-conductive-parts."
                </span>
              </li>
              <li>
                <strong>Recommended action.</strong> Specific, actionable, scoped.
                <span className="block mt-1 text-[12.5px] text-white/70 italic">
                  Example: "Reinstate main protective bonding to incoming gas service using 10 mm² conductor, terminated at MET on one end and at the existing bonding clamp within 600 mm of the meter on the other end. Test continuity to confirm. Re-issue bonding label."
                </span>
              </li>
              <li>
                <strong>Classification code.</strong> C1, C2, C3 or FI per the four-question test.
                <span className="block mt-1 text-[12.5px] text-white/70 italic">
                  Example: "C2 — potentially dangerous, urgent action required."
                </span>
              </li>
            </ol>
            <p>
              The five parts together transform "C2 — bonding missing" into a defensible
              observation that the duty holder can act on. The narrative gives the landlord enough
              to commission the right remedial works; the technical reference gives the next
              electrician enough to verify the diagnosis; the recommended action gives both a
              specific scope rather than a vague "fix bonding".
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 — Section K of EICR titled 'OBSERVATIONS' definition"
            clause="Section K of the Example Electrical Installation Condition Report (EICR) is titled 'OBSERVATIONS' and is the section where the inspector records observations made during the inspection and testing that may affect the safety or condition of the installation. This section is intended to list items requiring attention, reference relevant schedule items, and indicate classification codes assigned to each observation."
            meaning={
              <>
                GN3 confirms the structural role of Section K — it is the action-oriented part of
                the EICR, distinct from the descriptive Schedule of Inspections and the
                measurement-oriented Schedule of Test Results. Each observation is a potential
                action item for the duty holder. Listing a defect on the Schedule of Inspections
                without a corresponding Section K Observation entry leaves the action implicit
                rather than explicit — and implicit actions tend not to be acted on.
              </>
            }
            cite="Source: IET Guidance Note 3 — EICR Section K (Observations) definition and content."
          />

          <SectionRule />

          <ContentEyebrow>The customer handover</ContentEyebrow>

          <ConceptBlock
            title="The on-site briefing — turning the report into action"
            plainEnglish="The EICR has limited value if the duty holder doesn't understand it. The on-site briefing — done at the end of the inspection or by booked call within 24 hours — walks the customer through the report, explains the urgency of each finding, and agrees the remedial priority. Done well, the briefing turns the report into a remediation plan."
            onSite="Allocate 15-30 minutes for the briefing on a domestic EICR; longer for commercial. It is part of the inspection, not an extra. Customers who understand the report act on it; customers who receive a coded document and no explanation file it and forget."
          >
            <p>The handover script, structured:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Open with the headline.</strong> "The overall classification is
                Unsatisfactory. That means the installation needs work before it can be considered
                safe under current standards." Or "The overall classification is Satisfactory.
                That means the installation is safe to remain in service. There are some
                improvements I'd recommend, but no urgent action needed."
              </li>
              <li>
                <strong>Walk the C1 items first.</strong> "I found one C1 — that means immediate
                danger. I made it safe by isolating the affected circuit. Here's what I found,
                here's what needs to happen to make it permanent, and here's the timescale —
                within 24 hours."
              </li>
              <li>
                <strong>Walk the C2 items next.</strong> Each in turn. What was found, why it
                matters, what to do, on what timescale. For rented dwellings, explain the 28-day
                statutory duty under PRS Regs.
              </li>
              <li>
                <strong>Walk the FI items.</strong> What couldn't be confirmed, what investigation
                is recommended, who should carry it out, what the expected outcome will inform.
              </li>
              <li>
                <strong>Mention the C3 items briefly.</strong> "These are improvements, not
                defects. Worth doing when other work is happening in the same area. Not urgent."
              </li>
              <li>
                <strong>Confirm the recipient duties.</strong> For PRS landlords — provide to
                tenants within 28 days, to new tenants before move-in, to local authority within
                7 days of request, retain for at least the next inspection cycle.
              </li>
              <li>
                <strong>Confirm the next inspection date.</strong> Based on installation type and
                condition. Diary it for the customer or at least flag the year.
              </li>
              <li>
                <strong>Hand over the report and any photos.</strong> Email or paper. Confirm the
                customer has it.
              </li>
              <li>
                <strong>Document the handover.</strong> Add a note to the EICR or your job record
                confirming the handover took place, who was briefed, and any agreements made
                about remediation timing.
              </li>
            </ol>
            <p>
              The handover does double duty — it ensures the duty holder understands the report,
              and it documents the inspector's discharge of the communication half of the EAWR
              continuing duty. A customer who can later say "no one explained the report to me" is
              a customer who can plausibly argue they did not know to act. The documented
              handover closes that gap.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Sequencing remedial works</ContentEyebrow>

          <ConceptBlock
            title="The remedial works priority — risk first, time-bound second"
            plainEnglish="Multiple defects on one EICR need a recommended order. The order is risk-based — C1 before C2 before C3 — with within-code sequencing driven by safety impact and statutory deadlines. The recommendation goes on the report so the duty holder has a clear plan."
            onSite="Don't leave the duty holder to guess the order. A landlord with eight defects on the report and no priority order is likely to do the cheapest first, leaving the highest-risk for last. Spell it out."
          >
            <p>The priority sequence, with reasoning:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>C1 — within hours of report issue.</strong> The on-site make-safe action
                needs to be made permanent. Typically a return visit within 24-48 hours to remedy
                the defect properly and re-energise the affected circuit. The make-safe is a
                temporary measure; the remediation is the permanent fix.
              </li>
              <li>
                <strong>C2 — within 28 days for rented dwellings under PRS Regs 2020.</strong>
                Other property types follow contractual / risk-led timescales — typical 28 days
                for commercial, sooner where the duty holder has the resources or where the
                specific defect carries elevated risk. Within C2, sequence by safety impact —
                main bonding before RCD installation, RCD installation before circuit-by-circuit
                upgrades.
              </li>
              <li>
                <strong>FI — investigation before any further coding decision.</strong> The FI
                cannot remain unresolved indefinitely — it represents an unverified safety
                question. Typical investigation within 28 days alongside the C2 remediation, with
                the EICR re-issued or supplemented when the investigation is complete.
              </li>
              <li>
                <strong>C3 — at next convenient opportunity.</strong> Typically when other work
                is happening in the same area, or at the next refurbishment cycle. C3 items do
                not have a statutory deadline but should be flagged in the next periodic.
              </li>
            </ol>
            <p>
              Within each code, sequence by safety impact and dependency. Main bonding underpins
              ADS for the whole installation — fix it before adding RCDs to individual circuits.
              CU upgrade may be a precondition for adding AFDDs — sequence accordingly. The
              recommended sequence goes in the Section K Observations or in a dedicated
              "Remedial Action Priority" note so the duty holder sees the order, not just the
              list.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 — Each observation must have an allocated classification code"
            clause="The example states: 'One of the following codes, as appropriate, has been allocated to each of the observations made above to indicate to the person(s) responsible for the installation the advisory nature degree of urgency for remedial action.' Therefore, each observation recorded on the EICR shall have one classification code (e.g., C1, C2, C3, FI) allocated to it to indicate urgency."
            meaning={
              <>
                GN3 anchors the link between coding and remedial urgency. The codes are not
                academic — they signal to the person responsible for the installation the
                priority of remedial action. An EICR with codes that do not communicate urgency
                clearly fails this purpose; an EICR with observations and no codes fails it
                completely. The duty holder is "the person(s) responsible for the installation" in
                GN3's language; the inspector's job is to communicate urgency to them
                unambiguously.
              </>
            }
            cite="Source: IET Guidance Note 3 — observation classification codes and their role in communicating urgency."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The Schedule of Test Results</ContentEyebrow>

          <ConceptBlock
            title="The Schedule of Test Results — the technical evidence base"
            plainEnglish="The Schedule of Test Results is the table of measurements that supports the inspection findings. Per circuit it records the conductor sizes, protective device, RCD details, dead-test values (R1+R2 or R2, IR), live-test values (Zs, RCD operating time), and the test instrument used. It is the technical evidence that backs the codes."
            onSite="Complete the schedule per circuit, in full, with traceable instrument identification. A blank cell is a question the inspector cannot answer later. A populated cell is evidence that survives challenge."
          >
            <p>The minimum per-circuit content per BS 7671 Appendix 6:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Circuit identification.</strong> Reference (matches the circuit chart),
                description (room/area/load served), location of origin (which CU/DB).
              </li>
              <li>
                <strong>Conductor details.</strong> Type (e.g. PVC/PVC singles in metal conduit,
                T&E in walls), live conductor csa, CPC csa, reference method.
              </li>
              <li>
                <strong>Protective device.</strong> Type (BS EN 61009 RCBO, BS EN 60898 MCB, BS 88
                fuse), curve / characteristic (B / C / D), rated current, breaking capacity, RCD
                type and operating current where applicable (Type AC, A, F, B; 30 mA, 100 mA,
                300 mA).
              </li>
              <li>
                <strong>Maximum permitted Zs.</strong> Per Table 41.3 for the device type and
                rating, corrected per A4:2026 method. E.g. B32 = 1.37 Ω at 80% under A4.
              </li>
              <li>
                <strong>Dead test values.</strong> R1+R2 (or R1, R2 separately depending on test
                method), IR line-to-line, line-to-earth, neutral-to-earth (typically &gt; 1 MΩ at
                500 V test for low-voltage circuits, recorded as the actual reading not just
                "satisfactory"), polarity confirmation.
              </li>
              <li>
                <strong>Live test values.</strong> Zs at the furthest point of the circuit,
                Ze at origin, prospective fault current, RCD operating current and operating time
                under Reg 643.7.3 single AC test (A4:2026).
              </li>
              <li>
                <strong>Test instrument identification.</strong> Multifunction tester model and
                serial number, last calibration date. Some scheme rules require this; all
                defensibility-conscious inspectors record it whether required or not.
              </li>
              <li>
                <strong>Test date and tester identification.</strong> When the tests were
                conducted and by whom (the named competent person responsible).
              </li>
            </ul>
            <p>
              A complete Schedule of Test Results is the inspector's primary defence against any
              later challenge to the EICR findings. Missing values invite the question "did you
              actually test it?". Populated values with traceable instruments invite no question
              — the work is documented, the kit was calibrated, the inspector signed.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Issuing the EICR without a verbal handover"
            whatHappens={
              <>
                You complete an Unsatisfactory EICR with two C2 findings. You email the report to
                the landlord that evening. The landlord glances at it, sees the codes, doesn't
                understand them, files the email. Three months later the local authority asks for
                the EICR — the landlord forwards it. The local authority sees the C2 findings have
                not been remediated within the statutory 28 days. The landlord faces enforcement
                action. He claims he did not understand the urgency; the inspector did not
                explain.
              </>
            }
            doInstead={
              <>
                Always do the verbal handover — same day on site, or by booked call within 24
                hours. Walk the customer through the C1/C2/FI items, explain the urgency, agree
                the remedial priority, confirm the recipient duties under PRS Regs (28 days to
                tenants, 7 days to local authority on request). Document the handover on the
                EICR or in your job record. The 15-30 minutes spent on the handover is the
                difference between a report that drives remediation and a report that sits in an
                inbox.
              </>
            }
          />

          <CommonMistake
            title="Listing remedial works without a recommended sequence"
            whatHappens={
              <>
                Your EICR identifies eight defects — one C1, three C2, four C3. You list them in
                the order you found them on the inspection. The landlord reads the list, picks
                the cheapest items first (the C3 labelling refresh), tackles the easy stuff, and
                runs out of remediation budget before reaching the C2 main bonding. The C2 sits
                un-remediated past the 28-day statutory deadline.
              </>
            }
            doInstead={
              <>
                Add a "Remedial Action Priority" note to the Section K Observations or as a
                standalone schedule. Sequence the items by code first, by safety impact within
                code second. State the timescales — "C1: within 24 hours. C2 main bonding:
                within 14 days (foundational safety layer). C2 RCD addition: within 28 days
                (statutory deadline). C2 polarity correction: within 28 days (statutory deadline,
                quick fix). C3 items: at next refurbishment opportunity." The duty holder gets a
                clear plan, not a list.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Worked scenario — landlord 5-year periodic remediation</ContentEyebrow>

          <Scenario
            title="Briefing a landlord on an Unsatisfactory EICR — three-bed terrace"
            situation={
              <>
                You have completed the 5-year EICR on a tenanted three-bed terrace. Findings:
                1× C1 (damaged hallway socket exposing live conductor — made safe by isolation of
                the affected ring final circuit), 2× C2 (main protective bonding to gas service
                missing, no RCD on downstairs ring final circuit), 1× FI (suspected high-resistance
                joint at the meter tails — Zs at the CU origin reads higher than expected, requires
                confirmatory test with separate method), 3× C3 (pre-2016 plastic CU, faded RCD
                test labels, recommend AFDD on bedroom socket circuits per Reg 421.1.7
                A4:2026). Tenant is present; landlord is on the phone.
              </>
            }
            whatToDo={
              <>
                Speak to the landlord by phone (or arrange a callback within 24 hours). Open with
                the headline — "The overall classification is Unsatisfactory. That means the
                installation needs work before it can be considered safe under current standards.
                Under the PRS Regulations 2020 you have 28 days from today to remediate the
                Unsatisfactory items and provide written confirmation of remediation to your
                tenant and to the local authority on request." Walk the C1 first — explain you
                made the affected hallway socket safe by isolating the downstairs ring, that the
                tenant has been briefed not to use the affected sockets, that you need to return
                within 48 hours to remedy the damaged socket properly and re-energise the circuit.
                Walk the two C2s — main bonding to gas (the wire connecting the gas pipe to the
                main earth is missing; without it any electrical fault could put the gas pipework
                at dangerous voltage; remediate within 14 days as the foundational safety layer);
                no RCD on the downstairs ring (the older CU does not have an RCD on this circuit;
                add an RCBO at the CU within 28 days). Walk the FI — explain the high Zs reading
                needs a confirmatory test with R1+R2+Ze cross-check; if confirmed, may indicate a
                deteriorated meter tail terminal that the DNO must address; arrange the
                investigation alongside the C2 remediation. Mention the C3s briefly — the plastic
                CU should be replaced with a metal one at next refurbishment; the labels can be
                refreshed at any time; AFDDs in bedrooms are an A4:2026 recommendation worth
                considering when other work is being done. Confirm the recipient duties — provide
                the EICR to the tenant within 28 days, to any new tenant before move-in, to the
                local authority within 7 days of any request. Diary the next 5-year inspection.
                Document the handover on the EICR. Email the report and any photos within 24
                hours. Schedule the C1 return visit before leaving the conversation.
              </>
            }
            whyItMatters={
              <>
                The handover transforms the EICR from a coded document into a remediation plan
                the landlord can execute. The 28-day statutory deadline under PRS Regs is real
                and enforceable; mis-understanding it could expose the landlord to local
                authority enforcement and the tenant to unaddressed risk. The make-safe-to-fix
                cycle on the C1 closes the immediate danger loop properly. The FI investigation
                gives the landlord the information needed to commission the right remediation
                rather than guessing. The C3 items are flagged for opportunistic action without
                pressure. Documented handover protects all parties — the inspector against later
                claims of unclear communication, the landlord against later claims of inaction,
                the tenant against undisclosed risk.
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

          <ContentEyebrow>Closing the loop — remedial certification</ContentEyebrow>

          <ConceptBlock
            title="Remedial certification — the MWC or EIC that follows the EICR"
            plainEnglish="An Unsatisfactory EICR triggers remedial works. The remedial works themselves need their own certification — typically a Minor Works Certificate (MWC) for each item, or an Electrical Installation Certificate (EIC) where the works are substantial. The remedial certificates close the loop on the EICR findings."
            onSite="The duty holder retains the original EICR plus the remedial certificates as a matched pair. When the next 5-year EICR comes round, the new inspector reads both — the original EICR shows what was found, the remedial certificates show what was put right. Together they evidence the duty holder's compliance with the EAWR Reg 4(2) maintenance duty."
          >
            <p>The remedial certification choices:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Minor Works Certificate (MWC).</strong> Per BS 7671 Appendix 6 model form.
                Covers a single addition or alteration to an existing circuit that does not
                require a full EIC. Most EICR remedial items (replacing a damaged accessory,
                adding an RCBO at the CU, reinstating a bonding conductor) fit MWC scope.
              </li>
              <li>
                <strong>Electrical Installation Certificate (EIC).</strong> For larger remedial
                works — CU replacement, multiple new circuits, substantial rewiring. The EIC is
                the full new-installation certificate; carries more inspection and testing
                requirements than the MWC.
              </li>
              <li>
                <strong>Confirmation letter.</strong> Some scheme providers issue a remedial
                works confirmation letter that summarises the EICR findings remedied, references
                the corresponding MWCs/EICs issued, and serves as the single written confirmation
                the landlord needs for PRS Regs compliance. Useful where multiple separate
                remedial items have been addressed.
              </li>
              <li>
                <strong>Re-issue or supplement to EICR.</strong> Where the remedial works also
                close out FI items, the EICR may be re-issued or supplemented with the
                investigation results and updated codes. The supplement makes clear what changed
                from the original.
              </li>
            </ul>
            <p>
              The duty holder's record after remediation should include the original EICR (with
              its Unsatisfactory codes), the MWC/EIC for each remedial item, and any updated
              EICR or confirmation letter that reflects the post-remediation state. This matched
              pair (or trio) evidences the cycle — defect identified, defect remedied, evidence
              retained — and supports the duty holder in any later compliance audit.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The Schedule of Inspections — visual record</ContentEyebrow>

          <ConceptBlock
            title="The Schedule of Inspections — the structured visual record"
            plainEnglish="Alongside the Schedule of Test Results sits the Schedule of Inspections — a checklist of visual inspection items per BS 7671 Appendix 6 with outcome codes (Acceptable, Improvement, Further Investigation, Not safe). It is the structured record of what the inspector looked at and what they found."
            onSite="The Schedule of Inspections is not a tick-and-flick exercise. Every line gets a deliberate outcome — a thoughtful Acceptable is more valuable than a casual one. The schedule supports the Section K Observations by providing the structured what-was-inspected backbone."
          >
            <p>The typical Schedule of Inspections content categories per BS 7671 Appendix 6:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Condition of consumer unit / distribution board.</strong> Enclosure
                condition, cover security, labelling, accessibility, evidence of overheating.
              </li>
              <li>
                <strong>Earthing arrangement.</strong> Earthing conductor present and adequately
                sized, MET present and accessible, earth electrode condition where TT.
              </li>
              <li>
                <strong>Main protective bonding.</strong> All required extraneous-conductive-parts
                bonded to MET (gas, water, structural steel, oil, central heating systems where
                applicable).
              </li>
              <li>
                <strong>Final circuits.</strong> Cables visually condition, accessory condition,
                identification, mechanical protection adequate.
              </li>
              <li>
                <strong>Special locations.</strong> 100% inspection per Section 700 series
                requirements.
              </li>
              <li>
                <strong>Notices and labels.</strong> Periodic inspection notice, RCD test notice,
                isolation labels, circuit chart, warning notices for non-standard arrangements.
              </li>
              <li>
                <strong>RCD operation.</strong> Test button operation per device, presence of
                30 mA RCD on socket circuits used by ordinary persons (Reg 411.3.3), Type
                appropriate for load (Type AC, A, F, B per circuit profile).
              </li>
            </ul>
            <p>
              Outcome codes per BS 7671 Appendix 6 model schedule — Acceptable, Improvement
              Recommended, Further Investigation, Immediate Danger / Action, Not Verified / Not
              Applicable. The codes feed into the Section K Observations where actions are
              spelled out and BPG4 codes (C1/C2/C3/FI) allocated.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 — Outcome codes for Schedule of Inspection (Use codes above)"
            clause="The example schedule uses outcome codes (headings shown in form fragment) such as Acceptable, Improvement Recommended, Further Investigation, Immediate Danger/Action, Not Verified/Not Applicable. The schedule instructs the inspector to 'Use codes above. Provide a...'. These codes are the mechanism to record the inspection result for each item."
            meaning={
              <>
                GN3 confirms the structured-outcome approach to the Schedule of Inspections.
                Each line on the schedule carries one outcome code; the codes give the duty
                holder, the next inspector, and any auditor a structured view of what was
                inspected and what was found. The codes feed into the Section K Observations and
                ultimately into the overall EICR classification. A Schedule of Inspections with
                blank cells or undeliberate outcome codes signals incomplete inspection.
              </>
            }
            cite="Source: IET Guidance Note 3 — Schedule of Inspections outcome codes per BS 7671 Appendix 6 model."
          />

          <SectionRule />

          <ContentEyebrow>Reg 653.2 photographic evidence — the A4:2026 update</ContentEyebrow>

          <ConceptBlock
            title="Reg 653.2 — photos and thermographic images can be appended to the report"
            plainEnglish="A4:2026 added a note to Reg 653.2 explicitly recognising that photographic and thermographic images can be appended to the EICR. This codifies what good inspectors have been doing for years — visual evidence per observation — and gives the practice formal regulatory backing for the first time."
            onSite="On a tablet-based EICR system (Elec-Mate, NICEIC Online, NAPIT EICR Online) the workflow is straightforward — tap 'Add photo' against an observation, snap the as-found defect, the make-safe action, the equipment ID, and the photo attaches to the Section K entry. On paper-based reports, attach printed photos to the back of the EICR with cross-references in the observation text."
          >
            <p>
              What to photograph during an EICR:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>C1 items and any make-safe action.</strong> Photo of the as-found defect (broken socket, exposed live, damaged appliance) and the make-safe (isolation point, lockoff applied, warning notice in place). Critical for the audit trail — the make-safe is a temporary measure and the photo proves it was in place when you left site.
              </li>
              <li>
                <strong>C2 items.</strong> Photo of the defect (missing bonding, visible cable damage, RCD test failure). Future inspectors and remediating electricians can see what you saw.
              </li>
              <li>
                <strong>FI items.</strong> Photo of the inaccessible feature (sealed wall void, locked riser, concealed JB) showing why further investigation is needed.
              </li>
              <li>
                <strong>Equipment IDs and ratings.</strong> Photo of the CU label, individual device ratings, RCD type and IΔn, transformer details, BS EN labels — supports test instrument traceability and helps the next inspector verify spec.
              </li>
              <li>
                <strong>Unusual installation features.</strong> Bespoke wiring arrangements, departures from standard, supplementary bonding installations, special-location installations (bathroom IP rating zones, swimming pool zones, agricultural buildings).
              </li>
              <li>
                <strong>Thermographic images</strong> where available — hot terminations, overheated MCBs, thermal hot-spots on cables. Increasingly common on commercial / industrial inspections; standard on data centre and switchgear EICRs.
              </li>
            </ul>
            <p>
              Each photo should be referenced from the corresponding Section K observation: "See Photo 03 — gas service bonding clamp showing absence of bonding conductor". The reference number ties the photo to the text and survives PDF compression / printing.
            </p>
            <p>
              <strong>Storage and retention.</strong> Photos go with the EICR as a single matched pack. Cloud-based report systems handle this natively. For paper-based reports, the PDF should embed the photos rather than reference them externally — external references break when files are moved between systems.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Communication mode — written, verbal, and visual</ContentEyebrow>

          <ConceptBlock
            title="Three modes of communication — pick the right one for the message"
            plainEnglish="The EICR communication has three modes — the written report (formal record), the verbal handover (interactive briefing), and the visual evidence (photos, sketches, where supported). Each mode has its place; using all three together makes the EICR genuinely actionable."
            onSite="A C1 finding deserves all three — written documentation in the report, verbal briefing to the duty holder before you leave, photos of the as-found defect and the make-safe action. A C3 might justify just the written record. Match the depth of communication to the urgency of the finding."
          >
            <p>The role of each communication mode:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Written — the EICR itself.</strong> Formal, comprehensive, legally weighted.
                The record that survives the customer relationship, the inspector's career, and
                the property's ownership cycle. Must stand alone — readable in 10 years by a
                stranger with no prior context.
              </li>
              <li>
                <strong>Verbal — the customer briefing.</strong> Interactive, immediate, tailored
                to the customer's understanding. Allows the customer to ask questions and the
                inspector to gauge understanding. Documents the recipient's awareness of the
                findings — important for the inspector's discharge of the EAWR continuing duty.
              </li>
              <li>
                <strong>Visual — photos, sketches, references.</strong> Concrete, evidential,
                survives the recall problem. A photo of a damaged accessory communicates the
                defect more clearly than a sentence of description. Modern report systems
                (Elec-Mate, scheme portals) attach photos per observation.
              </li>
            </ul>
            <p>
              The three modes complement each other. A written report alone risks being
              filed-and-forgotten. A verbal briefing alone risks being mis-remembered. Visual
              evidence alone risks being ambiguous. Together they make the EICR's findings
              accessible to the duty holder, defensible to any auditor, and actionable for any
              electrician commissioned to remedy the defects.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Section K Observations — five parts per finding: what was observed, why it matters, the BS 7671 reference, the recommended action, the classification code. Photos where available.",
              "Customer handover is part of the inspection — verbal walk-through plus written report, document the handover. 15-30 minutes for a domestic EICR.",
              "Remedial priority — C1 within hours, C2 within 28 days under PRS Regs (or as agreed), FI investigation alongside C2, C3 at next opportunity. Within each code, sequence by safety impact and dependency.",
              "Schedule of Test Results — full per-circuit measurement record per BS 7671 Appendix 6, with test instrument traceability (model, serial, calibration date).",
              "Recipient duties under PRS Regs 2020 — landlord provides EICR to existing tenants within 28 days, to new tenants before move-in, to local authority within 7 days of any request.",
              "Hold the line on coding under customer pushback — explain the BPG4 logic, document the conversation, do not downgrade without new evidence.",
              "Inaccessible items go to FI with a recommended investigation route, recorded under Limitations, brought to the duty holder's attention at handover.",
              "Remedial works need their own certification — MWC for routine items, EIC for substantial works. The matched pair (EICR + remedial certs) evidences the duty holder's EAWR Reg 4(2) compliance cycle.",
            ]}
          />

          <Quiz title="EICR reporting and remedial works — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section5-3')}
              className="rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors border border-white/10 p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white/60">
                <ArrowLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.3 Sampling and scope agreement
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section5-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.5 EICR vs Initial Verification, frequency tables, PRS Regs
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
