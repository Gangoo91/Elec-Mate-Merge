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
      "Risk And Maintenance Schedule — the risk half lists the job's hazards and the maintenance half sets the planned inspection intervals for the completed installation.",
      "Risk Assessment + Method Statement — the assessment identifies hazards and controls (MHSWR 1999 Reg 3); the method statement sets out HOW the work is done safely, step by step.",
      "Risk Analysis And Mitigation Strategy — the analysis half scores hazards on a likelihood matrix and the strategy half lists the insurance and contingency arrangements.",
      "Required Access And Materials Sheet — the access half lists the equipment to reach the work and the materials half lists the cable and accessories the office procures.",
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
      "A formal certificated training course covering a topic in depth — typically half or full day, delivered externally, ending in an assessment and a card such as PASMA or asbestos awareness.",
      "A written hazard log where each operative records the risks they meet during the shift, reviewed weekly by the supervisor so recurring hazards can be designed out of future jobs.",
      "An end-of-shift debrief where the team reviews what went wrong and agrees corrective actions, signed off by the supervisor as a record that lessons were captured before the next shift.",
      "A short pre-shift safety briefing on a single topic — typically 5-10 minutes, delivered to the team to refresh awareness of one hazard or control, recorded with attendees, topic and date.",
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
      "Reg 14 allows live work freely provided the operative wears Class 0 insulating gloves and VDE-rated tools — the PPE is the legal requirement and no further authorisation is needed.",
      "Reg 14 requires the operative to notify the HSE in advance and wait for written consent — live work cannot proceed until the regulator has approved the specific activity in writing.",
      "Reg 14 requires the supply to be isolated and proved dead first, then re-energised under control — 'safe live working' is really a controlled re-energisation, not work on live conductors.",
      "Reg 14 prohibits live work unless three conditions are all met — unreasonable to do dead, reasonable to do live, and suitable precautions — proven via a permit-to-work.",
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
      "To record the test results and certification for the completed installation, holding the EIC, schedule of test results and any minor-works certificate together in one job file.",
      "To set out the assessed hazards, the chosen controls and the step-by-step method for doing the work safely — the working H&S document the inspector asks for first after an incident.",
      "To define the commercial scope and price of the work, listing circuits, accessories and labour so the customer knows exactly what is included before they sign the contract.",
      "To provide the operation and maintenance information the customer needs after handover — how to use the installation, the inspection intervals and who to call for faults.",
    ],
    correctAnswer: 1,
    explanation:
      "RAMS is the working H&S document for the job — referenced in induction, toolbox talks and permits, and re-read at the start of each phase. It bridges the regulation (MHSWR Reg 3 requires assessment) and the actual work on site. Done well it's a practical document; done badly it's a generic template that gets ignored. A job-specific RAMS that reflects the actual site conditions is evidence of a competent firm; a copy-paste template is evidence the assessment wasn't suitable and sufficient under Reg 3.",
  },
  {
    id: 2,
    question:
      "What's the 'template trap' that auditors and inspectors look for in poorly written RAMS?",
    options: [
      "A RAMS so long and detailed that nobody on site reads it — pages of generic boilerplate bury the few site-specific controls that matter, so the operatives skip straight to the sign-off page without absorbing the actual hazards.",
      "A RAMS that names the wrong regulations — citing superseded or irrelevant legislation makes the document look authoritative but means the controls aren't actually grounded in the duties that apply, which an inspector treats as a competence failure.",
      "A RAMS that reuses the same generic wording for every job ('standard electrical install — usual precautions') without reflecting the specific hazards and conditions of THIS site.",
      "A RAMS signed only by the office author and not by the operatives — without the workers' signatures there is no evidence the controls were communicated, the gap an inspector looks for first.",
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
      "There is no real difference — a toolbox talk is simply the on-site name for a training course, and attending a few toolbox talks can replace a formal certificated course such as PASMA or asbestos awareness.",
      "A toolbox talk is the longer of the two — a full structured course delivered over a day — while a formal training session is the short five-minute pre-shift briefing that refreshes it.",
      "A toolbox talk results in a recognised qualification and card, whereas a formal training course is only an informal awareness session with no certificate or assessment at the end.",
      "A toolbox talk is short (5-10 min), single-topic and delivered on site at shift start — a refresh tool, not initial training; formal training is longer, certificated and builds the competence.",
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
      "Hot work (gas torch, grinding, welding), confined-space entry, live electrical work under EAWR Reg 14, and high-energy switching on industrial / healthcare sites.",
      "Routine first-fix cabling in a new-build, second-fixing accessories, and dead testing of a completed circuit — any hands-on installation task carries enough risk to need a permit.",
      "Working at height on a tower scaffold, manual handling of cable drums, and using a 110V chop saw — tasks involving physical equipment all need a permit beyond the RAMS.",
      "Any work in an occupied domestic property, because the presence of the public means a permit is needed under the householder's duty of care alongside the RAMS.",
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
      "The cable types and sizes, the protective device ratings, the expected test results and the BS 7671 regulations to satisfy — essentially the technical specification for the job.",
      "The location, activity, operative names, validity window, precautions, and the fire-watch and sign-off requirements before and after the work.",
      "The customer's contact details, the agreed price, the payment milestones and a signature confirming acceptance — the permit doubling as the contract for the hot-work element.",
      "The atmospheric monitoring readings, oxygen and flammable-gas levels, rescue plan and standby person's name — the same content as a confined-space entry permit.",
    ],
    correctAnswer: 1,
    explanation:
      "A hot-work permit records the location, the specific activity (gas torch, grinding, welding), operative names, the validity window, the precautions (combustibles cleared, fire blanket and extinguisher to hand), the fire-watch requirement (typically 30-60 minutes after work ceases) and sign-off from issuer, operative and fire watch. The permit is strict because the fire risk persists after the visible work has stopped — the fire watch catches a smouldering ignition before it becomes a fire, and skipping it is a common cause of avoidable building fires.",
  },
  {
    id: 6,
    question:
      "Under the Confined Spaces Regulations 1997, what's a 'confined space' and what's the headline rule?",
    options: [
      "Any space too small to stand upright in — defined purely by dimensions. The rule is that the operative must wear a harness tethered to an anchor outside the space.",
      "Any room without natural daylight or mechanical ventilation — lofts, cellars and plant rooms. The rule is that temporary lighting and a forced-air fan must be installed before entry.",
      "A space substantially enclosed where a 'specified risk' could arise (fire/explosion, loss of consciousness, drowning, asphyxiation), with entry controlled under Reg 4 and Reg 5.",
      "Any space with a single point of access and no second escape route — the rule is that two exits must always be provided and single-opening entry is prohibited outright.",
    ],
    correctAnswer: 2,
    explanation:
      "The Confined Spaces Regulations 1997 are precise. A space is 'confined' if it's substantially enclosed AND a specified risk could arise — fire/explosion (gas, vapour, dust), loss of consciousness from fumes or lack of oxygen, drowning, asphyxiation from free-flowing solid, or trapping/heat illness. A loft isn't necessarily confined; a lift shaft is. Reg 4 ('don't enter if you can avoid it') is the strongest control, and Reg 5 requires a safe system of work — entry permit, atmospheric monitoring, rescue — where entry can't be avoided. Entry without those controls has caused multiple electrician fatalities.",
  },
  {
    id: 7,
    question:
      "What's the documentation chain from pre-construction to permit?",
    options: [
      "EIC → schedule of inspections → schedule of test results → minor works certificate → EICR — the certification chain that records the electrical work, which is the documentation an inspector follows after a fault.",
      "Quotation → contract → variation order → invoice → final account — the commercial chain that records what was agreed and paid, which is the paperwork traced back if there is a dispute over scope.",
      "Method statement → toolbox talk → permit-to-work → pre-construction information → construction phase plan — the same documents but assembled by the operative upwards from their own task to the site organisation above them.",
      "Pre-construction information → construction phase plan → RAMS per work package → toolbox talks each shift → permit-to-work for high-risk activities, each layer referencing the one above.",
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
      "Read the RAMS, attend and sign the toolbox-talk register, work within any permit's scope, and flag anything on site that doesn't match — HASAWA s.7 making all of this a personal duty.",
      "Write the RAMS for your own work package and issue your own permit-to-work — as the person doing the task you are best placed to assess its risks and author the documentation.",
      "Sign the permit-to-work as the issuing authority once you have read the RAMS — the apprentice authorises the higher-risk activities for the team as the person doing the work.",
      "Keep out of the documentation chain entirely until qualified — RAMS, toolbox talks and permits are the supervisor's job and an apprentice has no duties under any of them yet.",
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
