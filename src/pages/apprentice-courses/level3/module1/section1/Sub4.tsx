/**
 * Module 1 · Section 1 · Subsection 4 — RIDDOR, PUWER, COSHH, LOLER: depth refresher
 * Maps to City & Guilds 2365-03 / Unit 201 / LO1 / AC 1.1
 *   AC 1.1 — "identify roles and responsibilities with regard to current relevant
 *            Health and Safety legislation"
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 1.2 — particular Health and Safety risks
 *
 * The four daughter regulations introduced at L2. L3 goes deeper — what
 * actually triggers a RIDDOR report, the supervisor judgement calls in
 * COSHH, PUWER risk assessment and LOLER inspection regimes.
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
  'RIDDOR, PUWER, COSHH, LOLER — depth refresher (1.1) | Level 3 Module 1.1.4 | Elec-Mate';
const DESCRIPTION =
  'L3 depth refresher on the four daughter regulations — RIDDOR reportable events, PUWER work equipment duties, COSHH substance assessment and LOLER lifting equipment inspection.';

const checks = [
  {
    id: 'l3-m1-s1-sub4-riddor-trigger',
    question:
      "An apprentice gets a 230V shock from a back-box that wasn't isolated properly. They're unhurt — no burn, no medical attention sought, back to work the same morning. Is this RIDDOR reportable?",
    options: [
      "No — RIDDOR only applies where the casualty is taken to hospital, so with no medical attention there is nothing to consider.",
      "Log it internally as a near-miss, then check the formal RIDDOR lists before deciding whether an F2508 report is owed.",
      "No — a 230 V shock is below the RIDDOR voltage threshold of 1000 V, so no report is ever required.",
      "Yes — every electric shock, however minor, is automatically a 'specified injury' under Schedule 1 and must be phoned to the HSE immediately.",
    ],
    correctIndex: 1,
    explanation:
      "RIDDOR reportable events fall into four buckets: deaths, specified injuries (Schedule 1), over-7-day injuries, and dangerous occurrences (Schedule 2). A minor shock with no injury isn't itself a 'specified injury', and there is no 1000 V threshold — but an unintended live contact is still worth logging as a near-miss, and parts of the dangerous-occurrence list (e.g. an electrical short circuit causing 24-hour plant stoppage) can make some no-injury events formally reportable. The L3 reflex: log internally, check the formal list, escalate to the responsible person, and document the decision either way.",
  },
  {
    id: 'l3-m1-s1-sub4-puwer',
    question:
      "Your firm hires in a battery-powered SDS drill from a hire shop. Under PUWER 1998, who's responsible for ensuring it's safe to use?",
    options: [
      "Only the hire shop — once equipment is hired out, all PUWER duties transfer to the owner and the user firm has none.",
      "Only the manufacturer of the drill, because PUWER places the duty on whoever designed and built the equipment.",
      "Nobody, provided the drill carries a valid PAT test label — a current PAT sticker discharges every PUWER duty for the user firm.",
      "Both the hire shop (as supplier) and your firm — but as the user, your firm carries the operating duties under PUWER Reg 4–9.",
    ],
    correctIndex: 3,
    explanation:
      "PUWER duties don't transfer with hire — they sit with whoever uses the equipment in the course of work. Your firm owns Reg 4 (suitability), Reg 5 (maintenance), Reg 6 (inspection), Reg 8 (information and instructions) and Reg 9 (training); the hire shop has supplier duties and PUWER duties only where it manages maintenance. Hired equipment is one of the most-prosecuted PUWER traps — firms assume the hire shop owns the duty, but the HSE prosecutes the user because they operated it. The visual pre-use check, certificate review and operator competence sign-off all sit on the user firm.",
  },
  {
    id: 'l3-m1-s1-sub4-coshh',
    question:
      "You're cutting masonry chases in a 1980s commercial building. The dust contains respirable crystalline silica. Under COSHH 2002, what's the first thing the assessment should consider?",
    options: [
      "Whether the dust can be eliminated, substituted or engineered out at source — the COSHH hierarchy of control, with PPE as the last resort.",
      "Which grade of FFP mask to issue to operatives, because under COSHH the correct respirator is always the first control to put in place.",
      "How long the work will take, because COSHH only applies to substance exposure lasting more than a single shift.",
      "Whether the building owner has a current asbestos register, since silica is only assessed where asbestos has already been ruled out.",
    ],
    correctIndex: 0,
    explanation:
      "COSHH Reg 7 is built around the hierarchy of control: eliminate, substitute, totally enclose, partial enclosure with extraction, system of work, and finally PPE. On-tool extraction connected to an M-class vacuum, water suppression and route-planning that minimises chasing all sit higher than mask-only working; an FFP3 mask is the last line. The HSE workplace exposure limit for respirable crystalline silica is 0.1 mg/m3 8-hour TWA, under review. RCS is now the second-biggest cause of occupational lung disease after asbestos. Assess the activity, not just the substance — cut less, capture at source, mask as last resort.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does RIDDOR 2013 stand for and what does it require?",
    options: [
      "Reporting of Incidents, Damage and Dangerous Operations Regulations 2013 — requires every worker to log all near-misses in a site diary that the HSE inspects annually.",
      "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 — the responsible person reports certain deaths, specified injuries, over-7-day injuries, diseases and dangerous occurrences to the HSE.",
      "Recording of Insurance, Defects and Operational Risks Regulations 2013 — requires firms to keep an insurance and defects register for every installation they work on.",
      "Registration of Independent Designers and Domestic Operatives Regulations 2013 — a competence-registration scheme for electricians working in dwellings.",
    ],
    correctAnswer: 1,
    explanation:
      "The responsible person is the employer, self-employed person or person in control of the premises; reports go via the F2508 forms / online RIDDOR portal. At L3 the depth is knowing which categories trigger which form, the timescales (immediate by phone for fatality / specified injury; F2508 within 10 days for the rest; F2508A within 15 days for over-7-day injury identified later), and the responsible-person identification.",
  },
  {
    id: 2,
    question: "Which of these is a 'specified injury' under RIDDOR Schedule 1?",
    options: [
      "A minor cut to the hand requiring a plaster from the site first-aid kit, with no time off and no medical treatment.",
      "A bruise to the shin that is sore for a couple of days but does not stop the worker carrying out their normal duties.",
      "A fracture (other than to fingers, thumbs or toes), an amputation, a serious burn or loss of consciousness from a head injury.",
      "A strained back that keeps the worker off normal duties for three days before they return to work.",
    ],
    correctAnswer: 2,
    explanation:
      "Schedule 1 specified injuries include fractures (excluding fingers/thumbs/toes), amputations, permanent or reduced sight, crush injuries leading to internal organ damage, serious burns (over 10% of the body or damaging eyes/airways/vital organs), scalpings needing hospital treatment, loss of consciousness from head injury or asphyxia, and enclosed-space injuries requiring resuscitation or 24+ hours in hospital. This is the serious-but-not-fatal category that requires immediate reporting. The crush, burn and enclosed-space categories routinely catch electrical incidents — arc-flash burns, falls from height, confined-space asphyxiation.",
  },
  {
    id: 3,
    question: "What's the timescale for reporting an over-7-day injury under RIDDOR?",
    options: [
      "Immediately by telephone to the HSE, the same as for a death or specified injury.",
      "Within 24 hours of the worker returning to work, calculated from their first day back on normal duties.",
      "Within 3 months of the incident, the same long-stop period that applies to reportable occupational diseases.",
      "Within 15 days of the incident, for an injury that incapacitates the worker for more than 7 consecutive days (excluding the day of the accident).",
    ],
    correctAnswer: 3,
    explanation:
      "Reg 4(2) sets a 15-day window from the incident (NOT from when the injury was reported). Over-7-day means 8+ days off normal duties, with the day of the accident excluded — the count starts the day after, which trips firms up. F2508A is the form.",
  },
  {
    id: 4,
    question: "What does PUWER 1998 cover?",
    options: [
      "All work equipment — any tool, machine, vehicle, ladder or apparatus used at work — covering suitability, maintenance, inspection, training, controls and isolation.",
      "Only powered machinery fixed in place at the workplace — hand tools and portable equipment fall outside its scope.",
      "Only personal protective equipment issued to employees, covering its selection, maintenance and correct use.",
      "Only lifting equipment and accessories, with thorough examination intervals of six or twelve months depending on the load.",
    ],
    correctAnswer: 0,
    explanation:
      "PUWER duties run across suitability (Reg 4), maintenance (Reg 5), inspection (Reg 6), specific risks (Reg 7), information and instructions (Reg 8), training (Reg 9), conformity (Reg 10), dangerous parts (Reg 11), specified hazards (Reg 12), temperature (Reg 13), controls (Reg 14–17), isolation (Reg 19) and stability (Reg 20). It is the broadest equipment regulation in the UK — everything from your screwdriver to a 32-tonne MEWP. Reg 6 inspection drives the documented pre-use, periodic and after-event regime that catches failing kit before it injures someone.",
  },
  {
    id: 5,
    question: "What does COSHH 2002 require?",
    options: [
      "Only the correct labelling and safe storage of hazardous substances on site, with no requirement to assess exposure.",
      "Assessing the risk from hazardous substances, then preventing or controlling exposure through the hierarchy of control, with monitoring, health surveillance and training.",
      "Only the provision of respiratory protective equipment to anyone working with dust, fumes or chemicals.",
      "Only the management of asbestos in non-domestic premises, including the duty to hold an asbestos register.",
    ],
    correctAnswer: 1,
    explanation:
      "COSHH covers far more than labelling — it is the full assessment-and-control regime: assessment (Reg 6), prevention or control via the hierarchy (Reg 7), use and maintenance of controls (Reg 8–9), exposure monitoring (Reg 10), health surveillance (Reg 11), information and training (Reg 12), and emergency arrangements (Reg 13). The hierarchy is the core principle: eliminate first; if not, substitute; if not, engineer it out (extraction, enclosure); then administrative controls; PPE last, not first.",
  },
  {
    id: 6,
    question: "What does LOLER 1998 require for lifting equipment?",
    options: [
      "That lifting equipment carry a CE mark and a manufacturer's declaration of conformity, after which no further inspection is required.",
      "That lifting equipment be PAT tested annually and visually checked by the operator before each shift, with no thorough examination duty.",
      "That lifting equipment be strong and stable, marked with its safe working load, used to a planned and supervised system, and thoroughly examined at set intervals.",
      "That lifting equipment be thoroughly examined every five years by a competent person and marked with the date of the next examination.",
    ],
    correctAnswer: 2,
    explanation:
      "LOLER requires adequate strength and stability (Reg 4), positioning to minimise risk (Reg 5), SWL marking (Reg 7), use to a written plan supervised by a competent person (Reg 8), thorough examination before first use, after assembly, periodically and after exceptional circumstances (Reg 9), and kept examination reports (Reg 10). It is the lifting-equipment subset of PUWER. The periodic thorough examination intervals are the most-asked exam point — 6 months for anything lifting people (passenger hoists, MEWPs, accessibility lifts), 12 months for other lifting equipment (cranes, slings, hoists) — performed and recorded by a competent person.",
  },
  {
    id: 7,
    question: "Under RIDDOR, what's the difference between a 'reportable disease' and a 'reportable dangerous occurrence'?",
    options: [
      "A reportable disease is any illness that keeps a worker off for more than seven days; a dangerous occurrence is any incident that does the same.",
      "A reportable disease must be reported by the worker's GP; a dangerous occurrence must be reported by the worker themselves.",
      "A reportable disease applies only to office workers; a dangerous occurrence applies only to construction sites.",
      "A reportable disease is a diagnosed work-related ill-health condition; a dangerous occurrence is a listed event that could have caused injury.",
    ],
    correctAnswer: 3,
    explanation:
      "Reportable diseases (Reg 8 + Schedule 3) are work-related ill-health diagnoses — carpal tunnel from repetitive work, occupational asthma, HAVS, certain cancers from a known workplace carcinogen, confirmed via the F2508A. Reportable dangerous occurrences (Reg 7 + Schedule 2) are events that could have caused injury — lifting-equipment collapse, escape of dangerous substances, electrical short circuit causing 24+ hours plant stoppage, structural collapse, certain hazardous-area incidents, reported on the F2508. Knowing both lists exist means you don't miss a no-injury event that's still RIDDOR reportable.",
  },
  {
    id: 8,
    question: "How does the COSHH hierarchy of control apply to silica dust from masonry chasing?",
    options: [
      "Eliminate the chase, substitute a lower-dust method, engineer the dust out at source, add administrative controls, then PPE as the last line.",
      "Issue every operative an FFP3 mask first, then assess whether any further controls are worth adding once the masks are in use.",
      "Damp the dust down with water only — water suppression is the sole control the COSHH hierarchy recognises for silica.",
      "Rotate operatives every hour so that no single worker exceeds the exposure limit, with no need for extraction or RPE.",
    ],
    correctAnswer: 0,
    explanation:
      "Working down the hierarchy: (1) eliminate — avoid the chase (surface mount, alternative route); (2) substitute — a lower-dust tool such as a resin-bonded chase saw with extraction rather than hammer-and-bolster; (3) engineer — on-tool extraction to an M-class vacuum, water suppression; (4) administrative — limit duration, rotate operatives, restrict access; (5) PPE — FFP3 mask as the last line. RPE alone isn't COSHH-compliant for routine silica work. Silica is an IARC Group 1 carcinogen; the HSE WEL is 0.1 mg/m3 8-hour TWA, under review. Mask-only working has been found inadequate in court where engineering controls were reasonably practicable. Assess the activity, not just the substance.",
  },
];

const faqs = [
  {
    question: "Who's the 'responsible person' under RIDDOR?",
    answer:
      "RIDDOR Reg 3 defines it as the employer (for employees), the self-employed person (for themselves), or the person in control of the premises (in some cases). For a typical electrical contractor incident on a customer's site, the firm's H&S manager or contracts manager makes the report. At L3 you might be the first person to identify a reportable event — your job is to escalate to the responsible person, not to make the report yourself.",
  },
  {
    question: "Does PUWER apply to my own personal hand tools I bring on site?",
    answer:
      "If you use them in the course of work, yes. PUWER Reg 2 defines 'work equipment' broadly. The fact you bought your own SDS drill doesn't change the duty — the firm still has Reg 4–9 duties towards you using it. In practice firms either issue tools or require evidence of competence and condition for personal kit. Very few firms permit fully unchecked personal kit on site.",
  },
  {
    question: "What's the LOLER difference between 'inspection' and 'thorough examination'?",
    answer:
      "Inspection (PUWER Reg 6 + LOLER Reg 9) is the routine pre-use, daily or periodic visual check by the user. Thorough examination (LOLER Reg 9) is a deeper, scheduled examination by a competent person who is independent of the user (often a third party) — typically every 6 months for lifting people and every 12 months for lifting loads. Both are required; they're not alternatives.",
  },
  {
    question: "When does COSHH apply to electrical work?",
    answer:
      "More often than apprentices think. Solder fume, flux, cleaning solvents, batteries (especially lithium), masonry dust, MDF dust, lead from old paint disturbed during chasing, asbestos (separately covered by CAR 2012), refrigerants from disturbed AC kit. Anything labelled with a CLP pictogram is automatic COSHH territory; many things without are too.",
  },
  {
    question: "If I think a near-miss should be RIDDOR reportable but my supervisor disagrees, what should I do?",
    answer:
      "Document your view in writing — short note, email to the supervisor, follow-up to the H&S manager. RIDDOR is a duty on the responsible person, not on you, but the duty to escalate sits with you under MHSWR Reg 14 (and HASAWA s.7). If you've raised it in writing and the responsible person decides not to report, the decision is on them. ERA 1996 s.44 protects you from detriment for raising it.",
  },
  {
    question: "Are the RIDDOR forms (F2508 etc.) still paper, or all online now?",
    answer:
      "The HSE strongly prefers online via riddor.hse.gov.uk. The F2508 series remains the form name but is submitted online. Telephone reporting (0345 300 9923) is available for fatalities and specified injuries that require immediate notification. The 10-day window (15 for over-7-day injuries) starts at the incident, not the report.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module1-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1 · Subsection 4"
            title="RIDDOR, PUWER, COSHH, LOLER — depth refresher"
            description="The four daughter regulations you met at L2. L3 goes deeper — what actually triggers a RIDDOR report, supervisor judgement on COSHH and PUWER, and the LOLER inspection regime for the lifting kit you're using more often now."
            tone="emerald"
          />

          <TLDR
            points={[
              "Remember from L2 — RIDDOR is what gets reported, PUWER is your tools and equipment, COSHH is hazardous substances, LOLER is lifting kit. At L3 the question shifts from 'which one is this?' to 'who's the responsible person, what's the timescale, and where does the supervisor judgement land?'.",
              "RIDDOR has four buckets — deaths, specified injuries, over-7-day injuries and dangerous occurrences. The 'dangerous occurrences' list (Schedule 2) catches many no-injury events that L2 framing wouldn't have flagged.",
              "COSHH hierarchy of control puts PPE last. Activity-level assessment (eliminate / substitute / engineer / administer / PPE) is the L3 move. RPE-only working on routine silica chasing is rarely defensible.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the four RIDDOR reportable categories — deaths, specified injuries, over-7-day injuries, dangerous occurrences — and the relevant timescales (immediate / 10 days / 15 days).",
              "State the main PUWER 1998 duties — suitability, maintenance, inspection, training, controls, isolation — and apply them to hired and personal kit.",
              "Apply the COSHH 2002 hierarchy of control to a typical electrical job (silica dust, solder fume, cleaning solvents).",
              "Identify the LOLER 1998 thorough examination intervals — 6 months for lifting persons, 12 months for other lifting equipment — and the difference between examination and inspection.",
              "Identify the 'responsible person' under each regulation and the L3-level escalation route when judgement calls land on you.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>RIDDOR — depth on the four buckets</ContentEyebrow>

          <ConceptBlock
            title="Knowing what's reportable is half the battle"
            plainEnglish="RIDDOR Regs 4–9 set out four categories of reportable event. Each has its own timescale and form. The L3 depth: knowing the dangerous-occurrences list (Schedule 2) by structure, not just by name, so you don't miss a 'no-injury' event."
            onSite="Most firms over-report by a margin (good — defensive logging is fine). The L3 risk is under-reporting because the event 'wasn't that bad'. After-incident HSE attendance routinely uncovers events that should have been reported and weren't — the firm gets prosecuted under RIDDOR Reg 6 (failure to report) on top of the underlying breach."
          >
            <p>The four reportable buckets:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Deaths (Reg 6)</strong> — work-related fatality. Telephone immediately;
                F2508 within 10 days.
              </li>
              <li>
                <strong>Specified injuries (Reg 4 + Schedule 1)</strong> — fractures (excl
                fingers/thumbs/toes), amputations, sight loss, crush injuries, serious burns,
                scalpings, head-injury unconsciousness, enclosed-space injuries. F2508 within 10
                days.
              </li>
              <li>
                <strong>Over-7-day injuries (Reg 4(2))</strong> — incapacity for normal duties
                for more than 7 consecutive days (excl day of accident). F2508A within 15 days.
              </li>
              <li>
                <strong>Dangerous occurrences (Reg 7 + Schedule 2)</strong> — listed events that
                COULD cause injury: lifting equipment collapse, escape of dangerous substances,
                electrical short circuit causing 24+ hours plant stoppage, structural collapse,
                pipeline incidents, certain hazardous-area events. F2508 within 10 days.
              </li>
              <li>
                <strong>Reportable diseases (Reg 8 + Schedule 3)</strong> — diagnosed
                work-related conditions: carpal tunnel from repetitive work, occupational
                asthma, HAVS, certain cancers from listed carcinogens. F2508A.
              </li>
              <li>
                <strong>Gas incidents (Regs 11–12)</strong> — separate scheme for gas suppliers
                and Gas Safe registered engineers; not normally electrical-trade territory but
                worth knowing exists.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 — Reg 4(1)"
            clause={
              <>
                &quot;Where any person dies as a result of a work-related accident, the
                responsible person must follow the reporting procedure.&quot; And Reg 4(2):
                &quot;Where any person at work suffers a specified injury (Schedule 1) as a
                result of a work-related accident, the responsible person must follow the
                reporting procedure.&quot;
              </>
            }
            meaning={
              <>
                The reporting procedure (Reg 6) is: notify the HSE without delay; send a report
                within 10 days of the incident. For specified injuries notification by phone is
                normally expected before the F2508 follows. The L3 step: knowing the procedure
                exists and the timescales lets you escalate accurately to the responsible person
                — &quot;this looks like a Schedule 1 specified injury, you need to phone the
                HSE today and submit the F2508 within 10 days&quot;.
              </>
            }
            cite="Source: Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471), Reg 4."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>PUWER — every tool, every job</ContentEyebrow>

          <ConceptBlock
            title="PUWER is broader than apprentices realise"
            plainEnglish="PUWER 1998 covers ALL work equipment — your screwdriver, your SDS, the customer's stepladder you borrow, the hire-shop MEWP. Reg 4 (suitability), Reg 5 (maintenance), Reg 6 (inspection), Reg 8 (information and instructions), Reg 9 (training) are the main duties, with controls/isolation/dangerous-parts/stability covered by Regs 11–20."
            onSite="The L3 trap: hired equipment. Firms assume the hire shop owns the duty; the HSE prosecutes the user firm because the user is the one who operated it. The pre-use visual check is your defence — and it must be genuine, not a tick-box."
          >
            <p>PUWER duties broken out:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 4 — suitability</strong> — equipment fit for its intended use, used
                only for that purpose. Your fish-tape isn&apos;t a torque wrench.
              </li>
              <li>
                <strong>Reg 5 — maintenance</strong> — kept in efficient working order and good
                repair. Equipment maintenance log.
              </li>
              <li>
                <strong>Reg 6 — inspection</strong> — formal inspection at intervals appropriate
                to the equipment, after exposure to deteriorating conditions, and (where there
                are higher risks) by a competent person.
              </li>
              <li>
                <strong>Reg 8 — information &amp; instructions</strong> — the user gets adequate
                health and safety information, including written instructions where appropriate.
              </li>
              <li>
                <strong>Reg 9 — training</strong> — adequate training, including the methods
                that may be adopted and the precautions to be taken.
              </li>
              <li>
                <strong>Reg 11 — dangerous parts</strong> — protection from contact with moving
                or dangerous parts (guards, fixed enclosures, jigs, supervision).
              </li>
              <li>
                <strong>Reg 19 — isolation</strong> — work equipment must be capable of
                isolation from energy sources (the equipment-side echo of EAWR Reg 12).
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

          <ContentEyebrow>COSHH — assess the activity, not just the substance</ContentEyebrow>

          <ConceptBlock
            title="The hierarchy of control puts PPE last"
            plainEnglish="COSHH 2002 isn't 'wear a mask and tick the box'. Reg 7 builds in a hierarchy: eliminate the substance entirely first; if you can't, substitute for a less hazardous one; if you can't, engineer the exposure out (extraction, enclosure); then administrative controls (rotate, time-limit); then PPE as the last resort. RPE-only on routine silica chasing rarely satisfies COSHH."
            onSite="The L3 step: assess the activity, not just the substance. 'Cut less, capture at source, mask as last resort' is the supervisor framing. On-tool extraction with an M-class vacuum + FFP3 mask + restricted area is far more defensible than mask-only."
          >
            <p>Substances that catch electricians under COSHH:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Respirable crystalline silica</strong> — masonry chasing, brick cutting,
                concrete drilling. WEL 0.1 mg/m3 8-hour TWA, under review.
              </li>
              <li>
                <strong>Wood dust</strong> — particularly hardwood and MDF. Sensitiser; some
                hardwoods are Group 1 carcinogens.
              </li>
              <li>
                <strong>Lead</strong> — old paint disturbed during chasing in pre-1992 housing.
                Separately covered by Control of Lead at Work Regs 2002.
              </li>
              <li>
                <strong>Solder fume + flux</strong> — particularly rosin-based fluxes. Asthma
                trigger.
              </li>
              <li>
                <strong>Cleaning solvents</strong> — degreasers, contact cleaners.
              </li>
              <li>
                <strong>Battery electrolyte</strong> — particularly large-format lithium and
                lead-acid in installation work.
              </li>
              <li>
                <strong>Refrigerants</strong> — disturbed AC kit. F-Gas regulations also apply.
              </li>
              <li>
                <strong>Asbestos</strong> — pre-2000 buildings. Separately covered by CAR 2012
                (full Sub later in this module).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Control of Substances Hazardous to Health Regulations 2002 — Reg 7(1)"
            clause={
              <>
                &quot;Every employer shall ensure that the exposure of his employees to
                substances hazardous to health is either prevented or, where this is not
                reasonably practicable, adequately controlled.&quot;
              </>
            }
            meaning={
              <>
                Prevention first; control second. &quot;Adequately controlled&quot; is defined
                in Reg 7(7) and tied to the workplace exposure limit and the hierarchy in Reg
                7(3). PPE is the last line. The HSE prosecutes COSHH cases hardest where the
                hierarchy was inverted — &quot;mask only, no extraction, no time limit&quot; on
                routine silica or solder work.
              </>
            }
            cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 7."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>LOLER — examination intervals matter</ContentEyebrow>

          <ConceptBlock
            title="6 months for lifting people; 12 months for everything else"
            plainEnglish="LOLER 1998 is the lifting-equipment subset of PUWER. Reg 9 sets the thorough examination cycle: 6 months for equipment that lifts people; 12 months for other lifting equipment; OR according to a written examination scheme. Plus after exceptional circumstances (overload, drop, modification)."
            onSite="On site you'll meet LOLER mostly through MEWPs, scaffold hoists, accessibility lifts, lifting slings and (occasionally) cable-pulling winches. The thorough examination certificate must be on site; check it before use. An out-of-date cert is a Reg 9 breach and the user firm gets prosecuted, not the hire shop."
          >
            <p>LOLER duties at L3 level:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 4 — strength &amp; stability</strong> — equipment of adequate
                strength for the load and stable in use.
              </li>
              <li>
                <strong>Reg 7 — marking</strong> — Safe Working Load (SWL) clearly marked.
              </li>
              <li>
                <strong>Reg 8 — organisation of operations</strong> — every lifting operation is
                planned by a competent person, supervised, and carried out safely.
              </li>
              <li>
                <strong>Reg 9 — thorough examination &amp; inspection</strong> — before first
                use, after assembly, periodically (6/12 months), after exceptional circumstances.
              </li>
              <li>
                <strong>Reg 10 — reports &amp; defects</strong> — examination reports kept;
                defects reported to enforcing authority where appropriate.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>PUWER Reg 6 — inspection in practice</ContentEyebrow>

          <ConceptBlock
            title="The inspection regime that catches failing kit before it injures"
            plainEnglish="PUWER Reg 6 requires inspection where the safety of work equipment depends on the installation conditions or where the equipment is exposed to deteriorating conditions liable to cause dangerous situations. Inspection runs in tiers — pre-use visual by the user, periodic detailed by a competent person, and after-event re-inspection following exceptional circumstances. The Reg 6 inspection isn&apos;t the same as PAT testing of portable electrical equipment, and it isn&apos;t the same as LOLER thorough examination — it&apos;s the broader equipment-fitness check."
            onSite="On site this looks like the Friday-afternoon test-instrument calibration check, the daily MEWP control check before raising the platform, the visual examination of a step ladder before climbing it. The L3 supervisor habit: never take kit out of the van without a 30-second visual; never put kit back without flagging anything that&apos;s changed."
          >
            <p>The PUWER Reg 6 inspection tiers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pre-use visual</strong> — performed by the user before each use. Cracks,
                damage, missing guards, loose fixings, wear. 30 seconds.
              </li>
              <li>
                <strong>Periodic detailed</strong> — by a competent person at intervals
                appropriate to the equipment, the use and the environment. Documented in the
                equipment register.
              </li>
              <li>
                <strong>After exceptional circumstances</strong> — drop, overload, accident,
                modification, exposure to weather. The next use waits for re-inspection.
              </li>
              <li>
                <strong>After installation or relocation</strong> — for equipment that depends
                on installation for safety. Lifting equipment, scaffold towers, fixed plant.
              </li>
              <li>
                <strong>Records</strong> — periodic and after-event inspections recorded.
                Pre-use checks usually only logged as exception when something is found.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>LOLER Reg 8 — planning the lifting operation</ContentEyebrow>

          <ConceptBlock
            title="Every lift is planned by a competent person"
            plainEnglish="LOLER Reg 8 requires that every lifting operation involving lifting equipment be (a) properly planned by a competent person; (b) appropriately supervised; and (c) carried out in a safe manner. The plan can be brief for routine lifts (an experienced operative on a familiar lift, low risk, light load) and detailed for complex lifts (multiple crane lifts, tandem lifts, lifts over occupied areas, persons in the load path)."
            onSite="On a typical electrical job the LOLER Reg 8 plan is mostly verbal for a quick cable pull or a small light fitting; it gets written when you&apos;re using a MEWP, a passenger hoist, a scaffold-mounted hoist or any load over a couple of hundred kilos. Knowing where the line sits between &quot;quick verbal plan&quot; and &quot;written plan&quot; is part of the L3 judgement."
          >
            <p>What a LOLER lift plan covers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Load</strong> — weight, dimensions, centre of gravity, attachment
                points.
              </li>
              <li>
                <strong>Equipment</strong> — Safe Working Load, current LOLER thorough
                examination certificate, any restrictions on use.
              </li>
              <li>
                <strong>Path</strong> — start, route, end. Clearances overhead and to the side.
                People kept clear of the load path.
              </li>
              <li>
                <strong>Operatives</strong> — competent operator, banksman where required,
                signaller. Comms agreed.
              </li>
              <li>
                <strong>Conditions</strong> — wind speed limit (for outdoor lifts), ground
                stability for outriggers, weather forecast.
              </li>
              <li>
                <strong>Stop conditions</strong> — what triggers a pause and re-plan (wind,
                visibility, unexpected obstruction, change of load).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Lifting Operations and Lifting Equipment Regulations 1998 — Reg 8(1)"
            clause={
              <>
                &quot;Every employer shall ensure that every lifting operation involving lifting
                equipment is — (a) properly planned by a competent person; (b) appropriately
                supervised; and (c) carried out in a safe manner.&quot;
              </>
            }
            meaning={
              <>
                The lift-planning duty. The plan must be appropriate to the complexity — short
                verbal plan for a routine lift, written plan for a complex one. HSE&apos;s
                guidance L113 (Safe use of lifting equipment) sets out what counts as
                proportionate. At L3 you&apos;ll often be the person doing or supervising the
                lift — that means you&apos;re the one Reg 8 expects to have planned it.
              </>
            }
            cite="Source: Lifting Operations and Lifting Equipment Regulations 1998 (SI 1998/2307), Reg 8."
          />

          <SectionRule />

          <ContentEyebrow>COSHH — Workplace Exposure Limits and monitoring</ContentEyebrow>

          <ConceptBlock
            title="WELs are limits, not targets — and most fall over time"
            plainEnglish="The Workplace Exposure Limit (WEL) for a substance is published in HSE&apos;s EH40 — currently around 500 substances listed. Two reference periods: 8-hour Time-Weighted Average (long-term exposure) and 15-minute Short-Term Exposure Limit (acute exposure). The WEL is the legal CEILING; you should be aiming for &quot;as low as reasonably practicable&quot; below it. WELs trend downward over time as evidence of harm accumulates."
            onSite="The L3 trap: treating the WEL as a target. The Reg 7 hierarchy of control says &apos;prevented or adequately controlled&apos; — &apos;adequately controlled&apos; means as low as is reasonably practicable, not just at the WEL. For carcinogens (silica, hardwood dust, some solvents) there&apos;s no &quot;safe&quot; level — exposure should be minimised, not maintained at the limit."
          >
            <p>WELs that catch electricians most often:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Respirable crystalline silica</strong> — 0.1 mg/m³ 8-hour TWA. Under
                review for reduction. Carcinogen.
              </li>
              <li>
                <strong>Hardwood dust</strong> — 3 mg/m³ 8-hour TWA. Carcinogen.
              </li>
              <li>
                <strong>Softwood dust</strong> — 5 mg/m³ 8-hour TWA. Sensitiser.
              </li>
              <li>
                <strong>Lead</strong> — separate Lead at Work Regs 2002. Action level 50
                µg/m³ 8-hour TWA; biological monitoring also required.
              </li>
              <li>
                <strong>Solder fume (rosin-based flux)</strong> — 0.05 mg/m³ 8-hour TWA.
                Asthma trigger.
              </li>
              <li>
                <strong>Diesel engine exhaust emissions</strong> — under review; significant
                in confined-space and tunnel work.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>RIDDOR Schedule 2 — the dangerous-occurrence categories</ContentEyebrow>

          <ConceptBlock
            title="No-injury events that are still legally reportable"
            plainEnglish="RIDDOR Schedule 2 lists 27 categories of &quot;dangerous occurrence&quot; that must be reported even where nobody is hurt. Several are directly relevant to electrical work — short circuit / overload causing fire or explosion with 24+ hours plant stoppage; collapse of lifting equipment; collapse of scaffold over 5m; unintentional collapse of structure. The L3 reflex is to check the schedule whenever a no-injury event has wider impact."
            onSite="The trap: assuming &quot;no-one was hurt, no need to report&quot;. Some no-injury events are reportable; failure to report is a separate offence. Check the list. The schedule is short and bookmarkable on the HSE site (legislation.gov.uk &gt; SI 2013/1471 &gt; Schedule 2)."
          >
            <p>Schedule 2 categories most relevant to electrical work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Para 19 — electrical short circuit</strong> — short circuit or overload
                attended by fire or explosion which results in stoppage of the affected plant
                for more than 24 hours.
              </li>
              <li>
                <strong>Para 1–3 — lifting equipment collapse / overturn</strong> — applies to
                MEWPs, hoists, cranes, scaffold towers used in electrical work.
              </li>
              <li>
                <strong>Para 6 — scaffold collapse</strong> — over 5m height. Common during
                strip-out and refurbishment work.
              </li>
              <li>
                <strong>Para 9 — biological agents</strong> — rare in electrical but covers
                Legionella exposure during cooling-tower or hot-water-system work.
              </li>
              <li>
                <strong>Para 10–13 — explosion / hazardous substance release</strong> — covers
                F-Gas refrigerant releases above thresholds; some battery-fire scenarios.
              </li>
              <li>
                <strong>Para 24 — collapse of building / structure</strong> — partial collapse
                affecting more than 5 tonnes of material.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Treating a hired MEWP as 'the hire shop's problem'"
            whatHappens={
              <>
                Apprentice signs out a hired scissor lift for high-level lighting work. The
                hire shop&apos;s LOLER cert is dated 11 months ago — fine. The apprentice
                doesn&apos;t do a pre-use check, doesn&apos;t check the platform load, and
                doesn&apos;t verify the operator competence has been transferred to them.
                The lift suffers a hydraulic leak partway through the day; the apprentice
                falls 3m. HSE prosecutes the FIRM (the user) under PUWER Reg 4–6 + LOLER
                Reg 8–9 — not the hire shop.
              </>
            }
            doInstead={
              <>
                Pre-use visual check on every lifting operation: examination cert in date,
                tyres/wheels intact, platform secure, controls operative, harness anchor
                points sound, SWL marked and within the planned load. PASMA / IPAF
                competence card for the operative. Documented lift plan. None of this is
                optional under LOLER.
              </>
            }
          />

          <CommonMistake
            title="Delaying RIDDOR reports because 'we'll see if it gets worse'"
            whatHappens={
              <>
                Apprentice falls and bruises wrist; goes to A&amp;E next day; X-ray shows
                fracture. Firm decides to &quot;wait and see&quot; before reporting. The
                10-day window passes, the fracture is later confirmed, the firm reports
                late. Two prosecutions follow — the underlying PUWER/MHSWR breach AND
                RIDDOR Reg 4 (failure to report within timescale). The late report
                converts a one-charge case into a two-charge case.
              </>
            }
            doInstead={
              <>
                When in doubt, report. The HSE doesn&apos;t penalise over-reporting. Late
                or missed reports are a separate offence. The 10-day clock starts at the
                incident, not at the diagnosis. F2508 online via riddor.hse.gov.uk;
                phone 0345 300 9923 for fatalities and specified injuries.
              </>
            }
          />

          <Scenario
            title="The dangerous occurrence the firm doesn't want to report"
            situation={
              <>
                You&apos;re fault-finding on a 32A three-phase distribution circuit at a
                small manufacturing client. A sequence of events causes a controlled
                short-circuit at the DB; the upstream breaker trips correctly, no-one is
                hurt, but the client&apos;s production line is down for the rest of the
                day (8 hours) while the fault is rectified. Your supervisor says
                &quot;don&apos;t worry about RIDDOR, no-one was hurt&quot;. The plant
                stoppage will end up being 28 hours by the time the customer is back up
                and running.
              </>
            }
            whatToDo={
              <>
                Pause and check Schedule 2. RIDDOR Schedule 2 includes &quot;the unintended
                or uncontrolled release or escape of any substance which would be likely to
                cause the death of, or major injury to, any person; OR an electrical short
                circuit or overload attended by fire or explosion which results in the
                stoppage of the plant involved for more than 24 hours&quot;. Whether this
                event is reportable depends on (a) was it &quot;attended by fire or
                explosion&quot;? (b) is the plant stoppage more than 24 hours? In this
                scenario the answer to (b) looks like yes (28 hours). The answer to (a)
                determines whether it&apos;s a Schedule 2 dangerous occurrence. Talk to
                the responsible person in your firm with the facts in front of you, and
                document your view in writing. If your supervisor refuses to report a
                Schedule 2 event, escalate to the H&amp;S manager or director. Failure to
                report is a separate offence under Reg 6.
              </>
            }
            whyItMatters={
              <>
                Dangerous occurrences are the &quot;no-injury but reportable&quot; category
                that L2 framing skips. The L3 step is checking Schedule 2 every time —
                it&apos;s not long, the categories are specific, and the cost of missing
                one is a separate Reg 6 prosecution. Your firm&apos;s reluctance to
                report doesn&apos;t change the duty; the duty sits on the responsible
                person and you&apos;ve discharged your part by raising it in writing.
                The customer&apos;s 28-hour line stoppage is also a commercial-impact
                event; the RIDDOR report doesn&apos;t change that, but the absence of one
                later, when the HSE attends for an unrelated reason and finds the
                near-miss in the firm&apos;s logs, makes the conversation much worse.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Remember from L2 — RIDDOR is reporting, PUWER is equipment, COSHH is substances, LOLER is lifting. At L3 the depth is in the Schedule lists, the timescales and the responsible-person identification.",
              "RIDDOR has four reportable buckets — death, specified injury, over-7-day injury, dangerous occurrence — plus diseases and gas incidents. Timescales: immediate phone for fatality / specified injury; F2508 within 10 days; F2508A within 15 days for over-7-day.",
              "Dangerous occurrences (Schedule 2) catch many no-injury events that L2 framing wouldn't have flagged. Check the list every time.",
              "PUWER applies to ALL work equipment, including hired and personal. The duty sits with the user firm, not the hire shop. Pre-use check is the user firm's defence.",
              "COSHH hierarchy of control: eliminate, substitute, engineer, administer, PPE. RPE-only on routine silica is rarely defensible. Assess the activity, not just the substance.",
              "LOLER thorough examination intervals: 6 months for lifting persons, 12 months for other lifting equipment (or per written scheme). Plus after exceptional circumstances.",
              "Late RIDDOR reports are a separate offence (Reg 6). When in doubt, report — the HSE doesn't penalise over-reporting.",
              "At L3 you may be the first to spot a reportable event. Your job is to escalate to the responsible person in writing, not to make the report yourself.",
            ]}
          />

          <Quiz title="RIDDOR, PUWER, COSHH, LOLER — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section1-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.3 MHSWR + CDM 2015
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section1-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.5 Environmental legislation and waste
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
