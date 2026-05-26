/**
 * Module 5 · Section 5 · Subsection 3 — EICR sampling and scope agreement
 * Maps to C&G 2365-03 / Unit 304 / LO2 / AC 2.3 — "identify the relevant documents associated with the inspection, testing and commissioning of an electrical installation"
 *
 * Layered depth: 2357 Unit 607 ELTK06 / AC 4.x; 2366-03 Unit 302 / AC 4.x.
 *
 * The L3 lift on EICR sampling — beyond the L2 idea that "you test everything"
 * into the practical reality of negotiating scope, agreeing limitations and
 * sampling frequencies in writing with the customer, then defending the
 * sampling decisions on the report. Get this wrong and either you over-charge
 * for unnecessary 100% testing, or you under-test and miss a defect that the
 * sampling rules would have caught. Best Practice Guide 4 plus IET Guidance
 * Note 3 Chapter 3 set the framework.
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

const TITLE = 'EICR sampling and scope agreement | Level 3 Module 5.5.3 | Elec-Mate';
const DESCRIPTION =
  'Negotiating an EICR scope with the customer, agreeing sampling percentages, recording limitations, and defending the sampling decisions on the report. GN3 Chapter 3, BPG4, and the practical framework that turns a quote into a sound inspection.';

const checks = [
  {
    id: 'm5-s5-sub3-sampling-default',
    question: 'GN3 sets a typical default sampling rate for periodic inspection of an installation in occupied use as:',
    options: [
      "10% of accessories with all DBs and CUs fully inspected, all final-circuit dead and live tests on a sampled basis where the inspection cannot be 100% without disruption — sampling rate must be agreed in writing with the customer in advance and recorded in the limitations on the report.",
      "Isolate the entire board where reasonably practicable, or apply lock-off to every circuit that could become live within reach, and barrier off any remaining live parts to provide protection per HSE EAW Regulation 14",
      "Under PME (TN-C-S) earthing, if the DNO neutral conductor is lost (open PEN fault), the exposed metalwork of the EVSE and the vehicle could rise to a dangerous voltage — since a person touching the vehicle while standing on the ground could receive a fatal electric shock, the risk is greater outdoors where there is better contact with true earth",
      "PME conditions don’t apply on petrol forecourts because of the explosive-atmosphere risk — a PEN fault could cause sparks at the metalwork. Industry practice (and the energy networks’ guidance) is to derive a TT zone for the hazardous-area equipment.",
    ],
    correctIndex: 0,
    explanation:
      'GN3 Chapter 3 sets typical sampling figures around 10% of accessories with full coverage of DBs/CUs and a sampled approach to final-circuit testing where 100% would be disruptive. The exact percentage is a negotiation between inspector and customer based on installation age, condition, use, available access, and disruption tolerance. The non-negotiable is that the agreed sampling rate is recorded in writing on the report under "Extent and Limitations" — so the duty holder, the next inspector, and any HSE investigator can see what was and was not covered.',
  },
  {
    id: 'm5-s5-sub3-extent-record',
    question: 'The "Extent and Limitations of the Inspection" section on the EICR exists to:',
    options: [
      "Trust is significantly reduced because self-orientation is the denominator — it divides the total. The self-regulation skill needed is managing self-serving impulses and genuinely shifting attention to others' needs, which requires ongoing emotional regulation of ego and need for recognition",
      "Record exactly what the inspection covered (extent) and what was excluded or sampled rather than 100% inspected (limitations) — agreed with the customer in writing before the inspection started, signed off by the customer, and reproduced on the front of the report so anyone reading the EICR knows what is and is not certified.",
      "Empathic anticipation (imagining how the reader will interpret the message without tone of voice or body language), deliberate tone management (choosing words that convey respect and warmth that would normally come through voice), emotional impulse control (never sending when angry), and the pause-and-review habit (re-reading every message from the recipient\\\\\\\\'s perspective before sending)",
      "Management of Health and Safety at Work Regulations 1999 Reg 3 — every employer (and every self-employed person) must make a 'suitable and sufficient' assessment of risks to health and safety. Reg 3(6) requires firms with five or more employees to record the significant findings.",
    ],
    correctIndex: 1,
    explanation:
      "The Extent and Limitations section is the EICR's contractual core. It defines what the certification covers and, critically, what it does not. A duty holder commissioning remediation needs to know that the EICR covers (say) the consumer unit and 10% of accessories sampled, not 100% of every accessory. A subsequent inspector picking up the next periodic needs to know what was deferred. An HSE investigator after an incident needs to know whether the failed component was within the inspected scope. Without a clear Extent and Limitations record the EICR is contractually and legally weak.",
  },
  {
    id: 'm5-s5-sub3-sample-fail',
    question: 'During a 10% sample of socket-outlets you find that 3 out of 10 sampled have evidence of overheating at terminations. Best response:',
    options: [
      "Written grievance following the employer's documented grievance procedure (which the employer is required to provide under the ACAS Code of Practice on Discipline and Grievance). The written grievance triggers a structured response with timescales and right of appeal. Verbal complaints are easy to ignore; documented grievances are not. ACAS conciliation is available if the internal process fails.",
      "A short dynamic walk-round of every room you will work in today, comparing what is in front of you against what the RAMS describes. Anything that has changed (new pet, kids home from school, decorating in progress, a damp patch that was not there at the survey) becomes a fresh hazard you record before you start.",
      "Expand the sample to a higher percentage — typically 100% or until the defect rate falls — because a 30% defect rate in the sample indicates the sampling assumption (occasional rare defects) is broken. Document the expansion in the report. The original sample assumption no longer applies; broader inspection is needed to characterise the true defect rate.",
      "No fixed maximum — assessed by load × frequency × posture × environment × individual capability. HSE filter values give \\\\\\\"guideline weights\\\\\\\" that depend on lift zone (close to body, near floor, above shoulder etc); typical guideline ~25kg lift from waist by an adult male in close hold.",
    ],
    correctIndex: 2,
    explanation:
      "Sampling assumes the sample is representative. A high defect rate in the sample falsifies that assumption — there could be 30 problem sockets in 100, or 3 in 10 by chance, but you cannot tell without expanding. BPG4 and GN3 both expect the inspector to expand the sample when sample defect rates are elevated. Document the expansion (\"Sample expanded from 10% to 100% of socket-outlets following identification of overheating evidence on 3 of initial 10 sampled\") so the report shows both the sampling decision and the response to the findings. Customer commercial concerns come second to the duty to characterise the actual installation condition — but a quick phone call to the customer explaining the expansion is good practice and usually accepted because the alternative is an Unsatisfactory report on incomplete evidence.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The "scope" of an EICR is set by:',
    options: [
      "Provide detailed, specific answers drawing on real workplace examples from your portfolio, explain the reasoning behind your decisions, demonstrate your understanding of underpinning knowledge, and be honest about areas you are still developing",
      "Written agreement between the contractor and the customer in advance of the inspection, recorded on the front of the EICR under Extent of the Inspection, defining what is included, what is excluded, and any sampling rates applied.",
      "During fault diagnosis you discover the agreed scope must change (additional cabling required, asbestos found, hidden defects) — written variation captures cost, time and consent before extra work proceeds",
      "The installation business must hold MCS PV certification, with at least one Suitably Qualified Person trained to MIS 3002 and the underpinning electrical qualifications",
    ],
    correctAnswer: 1,
    explanation:
      "Scope is contractual. The customer commissioning the EICR and the contractor delivering it agree the scope in advance — what is covered, what is excluded (e.g. equipment under separate maintenance contract, inaccessible voids, occupied tenant spaces), what sampling rate applies. The agreement is recorded on the EICR so the report stands as a clear record of what was and was not certified. BS 7671 and GN3 set the technical framework but leave the commercial scope to the parties.",
  },
  {
    id: 2,
    question: 'A customer asks you to quote for an EICR but says "just do the bare minimum to get a piece of paper". The right professional response is:',
    options: [
      "The JIB Apprentice Grading scheme tracks an apprentice's progress through training and uses recorded competence (often drawn from the diary, portfolio and review forms) to support grade progression. JIB grades are tied to industry-standard pay rates under the JIB Working Rules; progressing through the grades requires evidence, and the diary is part of the evidence chain.",
      "Because in a broken-PEN fault on PME, the entire installation's neutral return current can flow back to ground via the bonding to extraneous-conductive-parts (gas, water, structural steel). Sizing against the PEN ensures the bonding conductor doesn't melt before it is reset.",
      "Explain that an EICR has minimum content requirements set by BS 7671 Part 6, GN3 and BPG4 — sampling can be agreed but the sampling itself must be representative and the limitations recorded in writing. Walk the customer through what an EICR can and cannot exclude. If they still want sub-minimum work, decline and document the refusal.",
      "Three-step matrix: (1) Culpability — Very High / High / Medium / Low; (2) Harm — Category 1 (death/permanent), 2 (serious), 3 (minor) with adjustments for risk of higher harm or multiple persons; (3) Turnover band — Large (£50m+), Medium (£10-£50m), Small (£2-£10m), Micro (under £2m). Cell in the matrix gives a starting point and a range. Adjusted up for aggravating factors, down for mitigating.",
    ],
    correctAnswer: 2,
    explanation:
      'An EICR is a regulated safety document — not a piece of paper to be issued cheaply. Customers sometimes try to negotiate down the scope below what a defensible EICR can support. The right response is to educate, then agree a scope that is genuinely defensible. Sampling is permitted; skipping the consumer unit inspection is not. Limitations are recorded; ignoring known defects is not. If the customer insists on a sub-minimum scope, decline — issuing an EICR that does not meet GN3 minimum content puts your scheme registration and your professional standing at risk, and exposes the duty holder to a false sense of safety.',
  },
  {
    id: 3,
    question: "On a 1980s industrial unit with documented full O&M records and a competent on-site maintenance team that carries out monthly checks and annual deep maintenance, the inspector can:",
    options: [
      "An improvement notice gives a specified time period to remedy a contravention, while a prohibition notice requires the immediate or near-immediate cessation of an activity that poses a risk of serious personal injury",
      "Yes. NICEIC, NAPIT, ELECSA all require members to hold PL (typically £5m+), EL if employing anyone, and (often) PI if doing design work. Specific minimum cover levels are set in scheme rules; the assessor checks evidence at annual assessment. Some schemes offer affiliated insurance products (NICEIC Insurance, NAPIT Insurance) at member rates.",
      "Lithium batteries are hazardous waste (and class 9 dangerous goods); the design should consider take-back arrangements with the manufacturer/supplier, ease of safe removal, and clear labelling for first responders and end-of-life handlers",
      "Replace the periodic inspection with reliance on the O&M regime under GN3 guidance — formal periodic can be reduced or replaced where an effective management system with competent permanent on-site maintenance staff is in place. The decision must be documented and the management regime evidenced.",
    ],
    correctAnswer: 3,
    explanation:
      "GN3 explicitly recognises that where there is an effective management system in place for inspection and preventative maintenance — for example, competent permanent on-site maintenance staff — periodic inspection and testing can be replaced by an alternative regime. This is not a free pass; the management regime must be genuinely effective, documented, and the decision to rely on it must be recorded with the rationale. Common in larger industrial sites, hospitals, data centres, infrastructure assets where a documented preventative maintenance programme is more comprehensive than a periodic snapshot. The decision lives with the duty holder under EAWR Reg 4(2); the inspector advises and documents.",
  },
  {
    id: 4,
    question: 'You are quoting an EICR on a fully tenanted block of 30 flats. The freeholder commissions the inspection and wants the common parts plus a sample of flats inspected. The right scope to propose:',
    options: [
      "Common parts (landlord supply, intake, distribution, common-area lighting, lift supplies, cleaner sockets) inspected fully. Flats sampled — typical 10-20% sample with the agreement of the freeholder and ideally the tenants — and the limitation clearly recorded that the EICR covers common parts in full and a defined sample of flats; individual flats not sampled retain their own EICR responsibility under the PRS Regulations or the leaseholder's responsibility.",
      "MCS certificate; Electrical Installation Certificate (BS 7671); G98 or G99 DNO notification copy; manufacturer commissioning record(s); MCS performance estimate (SCOP, kWh / kWp / yr, payback, etc.); warranty documentation for all major components; user instruction manuals; maintenance schedule and service intervals; F-Gas record (where refrigerant work was carried out); contact details for fault reporting; and the MCS Code complaints process. Pack is provided in physical or durable digital form on handover day.",
      "Unlimited fine, and / or up to 2 years' imprisonment. The Sentencing Council Definitive Guideline for Health and Safety Offences sets the tariff using a culpability-and-harm matrix — even medium-culpability mid-harm cases against an individual can attract a custodial sentence, particularly where someone has been seriously injured or killed. Companies face fines that scale with turnover; individuals face fines + prison.",
      "Toolbox talks are short, focused, structured verbal briefings to workers on a specific safety topic — typically a hazard relevant to that day or that week. They're documented (sign-on sheet) so the employer can demonstrate they've discharged the MHSWR Reg 10 duty to provide comprehensible information. The format works because it's short, in person, with the chance to ask questions — the opposite of a long written document nobody reads.",
    ],
    correctAnswer: 0,
    explanation:
      "Multi-tenant blocks create a layered scope problem. The freeholder is the duty holder for the common parts and any landlord-supplied installations. Individual flats are the responsibility of the leaseholder (long lease) or the landlord under the PRS Regulations (rented). A freeholder-commissioned EICR typically covers common parts in full plus a sample of flats to establish whether common defects exist. Each flat the freeholder rents out under the PRS Regs needs its own EICR cycle. The Extent and Limitations on the freeholder's EICR must make this scope crystal clear so no party assumes a coverage that does not exist. Tenant access and consent for sampled flats is a practical issue the inspection contractor must arrange in advance.",
  },
  {
    id: 5,
    question: "GN3's guidance on the sampling principle is best summarised as:",
    options: [
      "MFT — annually (Megger UK Service ~£100 per unit, UKAS-traceable). Two-pole tester — every 24 months (Martindale ~£40). Multimeter — annually (Fluke ~£80–150). Clamp meter — annually. Proving unit — annually with the two-pole. Track in a calibration register; replace stickers on receipt back from the lab. NICEIC / NAPIT audits will check.",
      "Sample sufficiently to give a representative picture of the installation condition; expand the sample if defects are found at higher than expected rates; record the sampling rate and any expansion on the report; agree the sampling approach with the customer in writing in advance.",
      "Third-person self-talk creates psychological distance from the emotion, activating more of the prefrontal cortex's analytical capacity and reducing the amygdala's emotional intensity, allowing for more objective self-reflection",
      "Defined serious injuries including fractures (other than fingers, thumbs, toes), amputations, loss of sight, crush injury to head/torso, serious burns, scalpings, loss of consciousness from head injury or asphyxia, and any injury requiring resuscitation",
    ],
    correctAnswer: 1,
    explanation:
      "GN3's sampling principle is judgement-led, not formulaic. Start with a sample that is plausibly representative — typical defaults are 10% of accessories with full DB/CU coverage. If the sample reveals defect rates higher than expected, expand the sample. Record the sampling rate and any expansion on the report. Agree the approach with the customer in writing in advance so there is no surprise on completion. The principle protects both the duty holder (representative inspection) and the inspector (defensible record of decisions taken).",
  },
  {
    id: 6,
    question: "A customer tells you that the data centre's main switchboard cannot be isolated for testing because the IT load is 24/7 critical. Your right response on EICR scope:",
    options: [
      "Walk test = activating each detector in turn (using a heat / smoke / pull station test tool) and verifying the panel correctly identifies the zone. BS 5839-1 requires a walk test as part of the annual service AND after any change to the system OR rectification of a fault that affected a zone. The L3 apprentice doesn't normally do fire-alarm walk tests (specialist work) but supports the senior fire-alarm engineer. The walk test verifies the addressable / zone identification AND the sounder operation. Documented in the fire alarm log book.",
      "On any multi-discipline project of meaningful size, BIM is how electrical coordinates with structural, mechanical, architectural and fire engineering disciplines. The L3 designer who cannot read or contribute to a BIM model is locked out of a growing share of commercial, public sector and HRRB work where BIM is the procurement default.",
      "Propose a scope that includes everything that can be safely tested live (visual inspection, thermographic survey of switchgear, RCD test buttons, live tests on circuits where safe to do so) and clearly excludes what cannot be tested without isolation, recording the exclusion under Limitations with the recommendation that the duty holder schedule a planned outage for full testing within an agreed period. Note any FI for items the live-only inspection cannot fully verify.",
      "A 1-page document in plain English: (1) WHAT YOU REPORTED — customer's symptom in their words. (2) WHAT WE FOUND — the fault, in plain English. (3) WHAT WE DID — the fix, in plain English. (4) WHAT WE TESTED — the verification, in plain English. (5) RECOMMENDATIONS — anything further the customer should consider. (6) WARRANTY — what's covered for what period. (7) NEXT STEPS — any follow-up work, retest schedule, contact info. Most modern firms have a customer summary template; the apprentice fills it in at the end of each job. Customer keeps the summary; firm keeps the technical job sheet.",
    ],
    correctAnswer: 2,
    explanation:
      "Critical-load installations create a real tension between EAWR Reg 14 (default to dead working) and the practical need to keep the load running. The right answer is honest scope — agree what can be safely inspected without outage, document what cannot, recommend a planned outage with sufficient notice, and code FI for items the live-only inspection cannot fully verify. The duty holder retains the EAWR Reg 4(2) duty to maintain the system in safe condition; an EICR limited by access constraints is better than no EICR, provided the limitations are clearly recorded and the duty holder is told what the limitations mean for residual risk.",
  },
  {
    id: 7,
    question: 'When sampling final circuits for testing, the priorities for inclusion in the sample are:',
    options: [
      "I apply the requirements of the Health and Safety at Work Act 1974, the Electricity at Work Regulations 1989, and relevant ACoPs and British Standards such as BS 7671, through practical actions including risk assessment, safe isolation, use of appropriate PPE, maintenance of competence, and accurate record keeping",
      "Uses an EFLI tester to measure the loop impedance from the supply, with the installation\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s earthing conductor disconnected from the electrode and connected to the EFLI tester instead. The reading gives total loop impedance — for TT, this approximates the electrode resistance plus the supply network impedance (small in comparison). Useful when stakes / clamps are not available, but requires the earthing conductor to be safely re-connected before re-energising.",
      "A formal procedure resulting from systematic examination of a task to identify hazards, define safe methods to eliminate or minimise those hazards. Documented in the Method Statement portion of RAMS. Permits-to-work are a specific form of SSoW for high-hazard activity.",
      "Risk-weighted — circuits in special locations (bathrooms, kitchens, outdoors), socket circuits used by ordinary persons, circuits supplying high-risk equipment (showers, EV chargers, electric heating), circuits showing visible signs of damage or modification, and the dedicated samples needed to characterise common features of the installation. Document the sampling logic.",
    ],
    correctAnswer: 3,
    explanation:
      "Sampling is risk-weighted, not random. Special-location circuits (Section 700 series) carry higher consequence in fault. Socket circuits used by ordinary persons are higher exposure. Circuits feeding high-risk equipment (showers, EV chargers, electric vehicle supply equipment under Section 722) deserve priority. Circuits showing visible damage or modification need full attention. The sample logic is documented so the report reader understands why these circuits were chosen — and conversely why others were not. Convenience-driven sampling (only the easy ones) is not defensible.",
  },
  {
    id: 8,
    question: "The 'Extent and Limitations' agreement should be:",
    options: [
      "Tailored to the specific installation, agreed in writing in advance, signed by both parties (or evidenced via written quote acceptance), reproduced on the front of the EICR, and specific enough that anyone reading the report can understand exactly what was inspected and what was not.",
      "Isolate the entire board where reasonably practicable, or apply lock-off to every circuit that could become live within reach, and barrier off any remaining live parts to provide protection per HSE EAW Regulation 14",
      "At minimum: power topology (cables, breakers, DBs); annotations (ratings, calc results); revision clouds and notes; legend and title block. Some designers add layers for fault current, voltage drop, disconnection time and sub-discipline (e.g. emergency lighting circuits, fire alarm circuits, IT critical) so layers can be turned on or off for clarity.",
      "\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"I always mess things up (permanence), I am useless at everything (pervasiveness), and it is completely my fault because I am incompetent (personalisation)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" — treating the setback as permanent, pervasive, and entirely personal",
    ],
    correctAnswer: 0,
    explanation:
      "A vague Extent and Limitations is worse than none — it creates the illusion of clarity without the substance. The agreement should be specific to the installation: \"Sampling rate: 10% of socket-outlets, 100% of accessories in special locations, 100% of CUs and DBs, 100% of main bonding inspection, exclusion of equipment under separate maintenance contract namely the lift drive controller and the fire alarm panel.\" Reproduced on the EICR. Agreed in writing in advance via the quote acceptance. The clarity protects everyone — the customer knows what they bought, the inspector knows what they signed for, the next reader of the report knows what is and is not certified.",
  },
];

const faqs = [
  {
    question: 'Where does GN3 define the sampling rules for periodic inspection?',
    answer:
      "GN3 Chapter 3 — frequency and periodicity of inspection — and the supporting guidance through Chapter 8 (inspection and testing scope for circuits) set the framework. The exact sampling percentages are not prescribed as a fixed rule; GN3 gives typical figures (around 10% of accessories with full DB/CU coverage) and emphasises that the sampling rate must be appropriate to the installation, agreed with the customer, and recorded on the report. BPG4 supplements GN3 with worked-example coding and reinforces the importance of documenting sampling decisions.",
  },
  {
    question: "If I'm doing a 10% sample, do I still need to inspect the consumer unit fully?",
    answer:
      "Yes — sampling applies to accessories and final-circuit testing. Consumer units, distribution boards, main switchgear, the main earthing arrangement, the main protective bonding, and the supply intake are inspected fully on every EICR. These are the safety-critical hubs of the installation and a sample-based approach is not defensible. Sampling is appropriate for repetitive items (sockets, switches, light fittings, accessory back boxes) where the inspection of one is broadly representative of the inspection of others of the same type in the same area.",
  },
  {
    question: "What is the difference between scope, extent, and limitations on the EICR?",
    answer:
      'Scope is the broad agreement of what is to be inspected — "the electrical installation at 12 Acacia Avenue, ground floor and first floor, common parts of the building". Extent is the precise definition — "all final circuits supplied from the consumer unit located in the under-stairs cupboard, plus the dedicated cooker circuit and the EV charge point sub-board on the front drive, sampling rate 10% of socket-outlets, 100% of consumer unit and main bonding". Limitations are the explicit exclusions and constraints — "first floor bedroom 2 not accessed due to occupant absence at agreed visit time; recommendation made for re-inspection; sampling expanded from 10% to 100% of socket-outlets following identification of overheating evidence". Together they define the EICR\'s contractual and certification boundary.',
  },
  {
    question: 'Can I increase the sampling rate during the inspection without re-quoting?',
    answer:
      "Yes — and you must where the sample reveals defect rates that falsify the sampling assumption. The customer relationship matters but does not override the duty to characterise the installation accurately. Best practice: phone the customer when expansion is needed, explain why (\"3 of the first 10 sockets sampled showed overheating evidence — I need to expand to 100% of sockets to establish the true scope of the issue\"), agree the expansion, and document the conversation on the EICR. Most customers accept the expansion because the alternative is an Unsatisfactory report on incomplete evidence — which is worse for them than the additional cost. If the customer refuses the expansion, document the refusal and code FI for the items not fully inspected.",
  },
  {
    question: "How do I sample fairly across a multi-zone installation like a school?",
    answer:
      "Stratified sampling — divide the installation into representative zones (classrooms, science labs, kitchen, sports hall, IT rooms, plant rooms, external lighting) and sample within each zone proportionally to its risk and size. Special-location zones (kitchen, science lab, plant rooms) get higher sampling rates than general teaching spaces. Plant rooms typically get 100% inspection. Document the zone-based sampling logic on the EICR so the head of estates and the next inspector can understand and replicate the approach. Pure random sampling across a multi-zone installation can leave high-risk zones under-tested.",
  },
  {
    question: "What if the customer wants the report issued before the work is finished?",
    answer:
      "Decline — and explain why. The EICR is a record of completed inspection and testing. Issuing an EICR before the work is complete is not a real EICR; it is a draft that misrepresents the certification status. If the customer needs a partial-completion document for a transactional reason (sale, insurance, lease), the right route is a written summary of work completed to date with explicit notation that the EICR has not yet been issued and is conditional on completion. Some inspectors carry an interim status letter for these situations. Never sign an EICR for work not yet done — the EAWR Reg 4 continuing duty attaches the moment you sign.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5 · Subsection 3"
            title="EICR sampling and scope agreement"
            description="The negotiation that turns a customer enquiry into a defensible inspection — agreeing scope, sampling, limitations in writing, and recording the decisions on the report."
            tone="emerald"
          />

          <TLDR
            points={[
              "Scope is contractual — agreed in writing between contractor and customer in advance, recorded on the EICR Extent and Limitations section.",
              "Sampling is permitted by GN3 — typical defaults around 10% of accessories with full DB/CU coverage, but the rate must be appropriate to the installation and agreed with the customer.",
              "Consumer units, DBs, main switchgear, main earthing and main bonding are inspected fully on every EICR — never sampled.",
              "If sample defect rates exceed expectations, the inspector must expand the sample and document the expansion on the report.",
              "GN3 allows replacement of formal periodic with reliance on an effective management system where competent permanent on-site maintenance staff are in place.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Negotiate an EICR scope with the customer that meets GN3 minimum content requirements while reflecting the installation's specific characteristics.",
              "Apply GN3 Chapter 3 sampling guidance — typical defaults, risk-weighted selection, expansion triggers.",
              "Identify the items that must be inspected fully on every EICR (CUs, DBs, main switchgear, earthing, bonding, supply intake) versus those that can be sampled.",
              "Record Extent and Limitations on the EICR with the specificity required for legal and contractual defence.",
              "Manage scope conflicts where customer commercial pressures conflict with inspection integrity.",
              "Stratify sampling across multi-zone installations with appropriate weighting for risk and use.",
              "Recognise the GN3 conditions under which an effective management system can replace formal periodic inspection.",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Setting the scope before the inspection starts</ContentEyebrow>

          <ConceptBlock
            title="Scope is contractual — agree it in writing before you start"
            plainEnglish="The EICR scope is a written agreement between the contractor and the customer. It defines what will be inspected, what will be excluded, what sampling rate will apply, and what limitations the customer accepts in advance. Done well, scope agreement protects both parties and sets up a defensible report."
            onSite="Never start an EICR without a written scope. The quote acceptance counts as written agreement if it specifies the scope clearly. Verbal agreements on the day create disputes later. Take five minutes to confirm scope at the start of the inspection — pointing at the CU, the bonding, the special-location areas — so the customer knows what you will and will not be doing."
          >
            <p>The scope-setting conversation, structured:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify the duty holder.</strong> Who is commissioning the EICR? Owner,
                landlord, freeholder, tenant on behalf of landlord, managing agent, employer? The
                duty holder defines the scope; not anyone present on the day.
              </li>
              <li>
                <strong>Define the physical extent.</strong> Address, building, floors, rooms,
                external areas. For multi-tenant buildings, what units are included.
              </li>
              <li>
                <strong>Define the electrical extent.</strong> Which consumer unit(s), DBs,
                sub-mains. Whether sub-tenant installations are included. Whether equipment under
                separate maintenance contract (lifts, fire alarms, BMS) is included.
              </li>
              <li>
                <strong>Agree the sampling rate.</strong> Typical defaults — 10% of
                socket-outlets, 100% of accessories in special locations, 100% of CUs and main
                bonding. Adjust for installation age, condition, use, access, disruption tolerance.
              </li>
              <li>
                <strong>Identify known limitations in advance.</strong> Inaccessible areas,
                tenant-occupied units, items requiring isolation that cannot be isolated,
                equipment outside the inspector's competence.
              </li>
              <li>
                <strong>Confirm in writing.</strong> Quote, email, contract — any written form is
                fine, but written it must be. Reproduce on the EICR Extent and Limitations
                section.
              </li>
            </ol>
            <p>
              The scope conversation typically takes 10-20 minutes for a domestic EICR and longer
              for commercial. It is part of the cost of doing the job properly. Skipping it to get
              on with the testing means doing the job at risk — both to inspection quality and to
              the inspector's professional standing if the report is later challenged.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 — purpose of periodic inspection and testing"
            clause="The purpose of periodic inspection and testing is to determine whether an electrical installation is in a satisfactory condition for continued service and to identify any deterioration, defects, or potential safety hazards that may give rise to danger. This includes assessing whether existing circuits, equipment, and protective measures continue to comply with current safety requirements and remain effective."
            meaning={
              <>
                GN3 frames the purpose in safety terms — satisfactory for continued service,
                identify hazards, assess against current standards. The scope agreement must
                support this purpose. A scope that excludes too much, samples too little, or
                avoids the hard-to-access areas defeats the purpose. The contractor must push back
                on customer pressure to narrow the scope below what GN3's purpose can support —
                and document the refusal if the customer insists.
              </>
            }
            cite="Source: IET Guidance Note 3 — periodic inspection purpose and required outcomes."
          />

          <SectionRule />

          <ContentEyebrow>The sampling principle</ContentEyebrow>

          <ConceptBlock
            title="Sampling — what GN3 actually says"
            plainEnglish="GN3 permits sampling on periodic inspection because 100% inspection of a large or occupied installation is often impractical and disruptive. The sampling rate must be appropriate to the installation, representative of its condition, agreed with the customer in advance, and expanded if the sample reveals higher-than-expected defect rates."
            onSite="Sampling is not a shortcut — it's a structured methodology. Start with a defensible sample, expand if the sample reveals problems, document everything. The defensibility of the sample matters more than the percentage; a well-chosen 10% can be more representative than a poorly-chosen 50%."
          >
            <p>The items that are sampled vs always inspected fully:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Always 100% inspection</strong> — supply intake, MET, main earthing
                arrangement, main protective bonding, consumer units, distribution boards, main
                switchgear, sub-mains, supply tails, RCD/RCBO/AFDD operational tests at the device,
                accessory verification in special locations (Section 700 series — bathrooms,
                swimming pools, agricultural premises, EV charge points, etc.).
              </li>
              <li>
                <strong>Sampling permitted</strong> — final-circuit testing (R1+R2, IR, polarity,
                Zs), socket-outlet inspection in non-special locations, light fitting inspection
                in non-special locations, accessory back box inspection, switch and accessory
                cover inspection.
              </li>
              <li>
                <strong>Risk-weighted within sample</strong> — circuits in special locations get
                higher sampling rates; socket circuits used by ordinary persons get higher rates
                than infrequently-used outlets; circuits supplying high-risk equipment (showers,
                EV chargers) get priority; circuits with visible signs of damage or modification
                get full attention.
              </li>
              <li>
                <strong>Stratified across zones</strong> — multi-zone installations (schools,
                hospitals, multi-tenant blocks) sampled with weighting per zone risk and size, not
                pure random across the whole installation.
              </li>
            </ul>
            <p>
              Typical default rates in the industry — 10% of socket-outlets and lighting points in
              general areas, 100% of CUs and DBs, 100% of accessories in special locations, 100%
              of main bonding and earthing inspection. Adjust upward for older installations,
              installations with documented incident history, or installations where the customer
              wants extra assurance.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 — Setting and scope of inspection and testing activities"
            clause="This clause heading 'Setting' in Guidance Note 3 identifies the subject matter as the required approach to inspection and testing settings. It denotes that the subsequent text concerns how inspection and testing activities are to be set up and sampled for periodic inspection. It is a scope marker indicating that procedures, sampling and setting considerations apply to periodic inspection and testing work under GN3 and BS 7671 Part 6."
            meaning={
              <>
                GN3 explicitly recognises that sampling and setting decisions are part of the
                inspection methodology. The setup of the inspection — what is sampled, how much,
                in what order, with what access — is itself a competence decision that the
                inspector takes within the framework GN3 provides. The "settings" language
                acknowledges that no two installations are identical and the inspector must adapt
                the standard methodology to the specific installation.
              </>
            }
            cite="Source: IET Guidance Note 3 — Chapter 8 setting and scope guidance for periodic inspection."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Recording extent and limitations</ContentEyebrow>

          <ConceptBlock
            title="Extent and Limitations — the EICR's contractual core"
            plainEnglish="The Extent and Limitations section on the front of the EICR records what was and was not inspected. It is the document's contractual heart — the duty holder, the next inspector, and any HSE investigator all read this section first to understand what the EICR actually certifies."
            onSite="Write the Extent and Limitations as if a stranger were going to read it five years from now and need to decide whether the failed component was within the inspected scope. That is exactly what happens after an incident."
          >
            <p>The Extent section structure:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Physical extent.</strong> Address, building, floors, rooms covered. For
                multi-occupancy, the units in scope.
              </li>
              <li>
                <strong>Electrical extent.</strong> Each consumer unit, DB, sub-board covered.
                Sub-mains traced. Equipment included.
              </li>
              <li>
                <strong>Sampling rate per item type.</strong> "Socket-outlets sampled at 10%; light
                fittings sampled at 10%; accessories in bathrooms 100%; consumer units and main
                bonding 100%."
              </li>
              <li>
                <strong>Test method statement.</strong> Tests carried out per GN3 / BS 7671 Part 6
                — continuity, IR, polarity, Zs, RCD operation. Special-location tests applied as
                relevant.
              </li>
            </ul>
            <p>The Limitations section structure:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Items excluded by agreement.</strong> "Lift drive controller excluded —
                under separate maintenance contract with [contractor]. Fire alarm panel excluded —
                under separate maintenance contract."
              </li>
              <li>
                <strong>Items inaccessible at the time of inspection.</strong> "First-floor
                bedroom 2 not accessed — tenant absent at the agreed inspection slot. Recommend
                re-inspection of this room within 28 days."
              </li>
              <li>
                <strong>Items requiring isolation that could not be isolated.</strong> "Main
                switchboard not isolated for full dead testing — site operating 24/7. Live tests
                completed where safe; recommend planned outage for full testing within 6 months."
              </li>
              <li>
                <strong>Sample expansions during the inspection.</strong> "Sample expanded from
                10% to 100% of socket-outlets following identification of overheating evidence on
                3 of initial 10 sampled."
              </li>
              <li>
                <strong>FI items pending investigation.</strong> Listed with reference to the
                Observations section detail.
              </li>
            </ul>
            <p>
              The clarity test — read the Extent and Limitations to a stranger and ask "do you
              understand what was and was not certified?". If they cannot answer with confidence,
              rewrite. The downstream consequences of a vague Extent and Limitations include
              insurance disputes, contractual claims, and on serious incidents potential criminal
              proceedings turning on whether the defect was in scope.
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

          <ContentEyebrow>When sampling reveals more than expected</ContentEyebrow>

          <ConceptBlock
            title="Expanding the sample — when and why"
            plainEnglish="Sampling assumes the sample is representative of the whole. If the sample reveals defect rates higher than expected, that assumption is broken. The right response is to expand the sample — usually toward 100% — until the defect rate falls back to expected levels and the inspector can characterise the true installation condition."
            onSite="Expansion triggers — multiple defects of the same type in one sample, defects in safety-critical items even at low rates, evidence of systemic issues (e.g. installation by an unknown previous contractor with no records). When in doubt, expand. The customer would rather know the truth than receive a clean report on incomplete evidence."
          >
            <p>The sampling-expansion decision rules:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Defect rate exceeds expectations.</strong> Default expectation is rare
                defects (single-figure percentages) in the sample. A 30% defect rate falsifies the
                assumption — expand to characterise the true rate.
              </li>
              <li>
                <strong>Defects in safety-critical items.</strong> Even a single defect in main
                bonding, earthing arrangement, or RCD operation triggers full inspection of all
                items of that type — these are not appropriate for sampling regardless of starting
                rate.
              </li>
              <li>
                <strong>Evidence of systemic issues.</strong> A pattern emerging — e.g. all sockets
                installed by the same contractor showing similar overheating, all CUs of a
                particular product range exhibiting the same defect — warrants expanded inspection
                across all items potentially affected.
              </li>
              <li>
                <strong>Customer concern triggers.</strong> Customer flags a recent incident or
                concern — investigate fully even if it falls outside the agreed sample.
              </li>
              <li>
                <strong>Visible installation history.</strong> Multiple contractor signatures on
                the CU, evidence of DIY work, modifications without certification — expand the
                sample to characterise the cumulative quality.
              </li>
            </ol>
            <p>
              Document each expansion on the EICR Extent and Limitations section — what triggered
              the expansion, what new sampling rate was applied, what the expanded sample
              revealed. The documentation protects both the inspection quality (showing evidence
              of professional judgement applied) and the commercial relationship (showing the
              customer why additional time was spent).
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Standardising on 10% across every installation regardless of context"
            whatHappens={
              <>
                You apply a flat 10% sampling rate to every EICR you do — it's what your boss
                taught you, it appears on your default template. You inspect a 1960s industrial
                unit with 50-year-old wiring, evidence of multiple uncontrolled additions, and no
                maintenance records — at 10%. You miss four of the five circuits that have
                significant insulation degradation because they happened not to fall in your
                sample. The Satisfactory report goes out. Three months later a fire investigation
                identifies one of the un-sampled circuits as the source. The HSE asks why the
                sample was so low for an installation of that profile.
              </>
            }
            doInstead={
              <>
                Sampling rate is risk-weighted, not flat. A 1960s industrial unit with no records
                gets 50-100% sampling because the risk profile justifies it. A 2020 domestic
                installation with full O&M records and no incident history gets 10%. The starting
                rate reflects the inferred condition; the actual rate during inspection adjusts
                upward as evidence emerges. Document the sampling logic on the EICR — "Sampling
                rate set at 50% of all circuits given installation age (60+ years), absence of
                maintenance records, and visible evidence of uncontrolled modifications." That is
                a defensible decision; "10% as standard" is not.
              </>
            }
          />

          <CommonMistake
            title="Failing to record sampling expansion on the EICR"
            whatHappens={
              <>
                You start at 10% sampling. After finding overheating on 3 of 10 sockets, you
                expand to 100% on the day. You find another 8 defective sockets across the
                installation. You code them all and issue the Unsatisfactory report. But you do
                not update the Extent and Limitations section to record the expansion. Two years
                later the next inspector reads your EICR, sees the 10% sampling rate stated, and
                assumes the high defect rate was extrapolated from a small sample — they
                re-inspect on the same basis and miss new defects that have emerged since.
              </>
            }
            doInstead={
              <>
                Update the Extent and Limitations section before issuing the report.
                "Sampling rate originally agreed: 10% of socket-outlets. Expanded to 100% of
                socket-outlets during inspection following identification of overheating evidence
                on 3 of initial 10 sampled. Final rate: 100% of socket-outlets, 10% of light
                fittings, 100% of consumer unit and main bonding." The next inspector reads the
                full picture; the duty holder understands the reasoning; the report is internally
                consistent. The 30 seconds it takes to update the section is one of the highest-
                leverage uses of inspection time.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Worked scenario — landlord 5-year periodic</ContentEyebrow>

          <Scenario
            title="Negotiating scope on a landlord 5-year EICR — three-bed terrace"
            situation={
              <>
                A landlord phones you. Three-bed mid-terrace, tenanted, last EICR five years ago
                Satisfactory, the tenants have lived there throughout. The landlord wants a quote
                for the statutory 5-year EICR under the PRS Regulations. He asks "can you do it
                in 90 minutes for £150?" — he has a quote from another contractor at that price.
                You know that the property has a 1990s consumer unit with no RCBOs, an old-style
                shower circuit on a 30 mA RCD, and the bathroom has been re-plumbed in the
                intervening period (so bonding may have been disturbed). The tenants will be
                present for access.
              </>
            }
            whatToDo={
              <>
                Quote the job honestly. Explain that a defensible 5-year EICR on a property of
                that age and history needs at least half a day to do properly — full inspection
                of the consumer unit, full inspection and continuity test of all main bonding
                (especially with the bathroom re-plumb history), 100% inspection of accessories in
                the bathroom (special location), 10-25% sample of socket-outlets and lighting
                points elsewhere depending on what the initial inspection reveals, full Zs
                measurement at sampled circuit endpoints, RCD test at the device. Walk the
                landlord through the PRS Regs implications — an Unsatisfactory report on a quick
                inspection is just as legally binding on him as one on a thorough inspection, and
                a missed defect that leads to a tenant injury exposes him to personal liability
                under the Landlord and Tenant Act and potentially under HSWA. Quote a price that
                reflects the actual time. If the landlord still wants the cheap quote, decline
                politely — the cheap inspector who issues a Satisfactory report on inadequate
                inspection is doing the landlord no favours.
              </>
            }
            whyItMatters={
              <>
                The PRS Regulations 2020 make the EICR a statutory document with real legal
                weight. The landlord's exposure on a defective EICR is not theoretical — local
                authority enforcement carries civil penalties up to £30,000 per breach, and a
                tenant injury traceable to a missed defect could expose the landlord to civil
                claims and potentially HSE prosecution. The cheap-and-fast EICR market exists but
                it is a race to the bottom that everyone loses — the inspector loses professional
                standing, the landlord loses statutory protection, the tenant loses real safety.
                Quoting honestly and walking away from work that cannot be done properly at the
                offered price is part of being a competent professional.
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

          <ContentEyebrow>The management-system alternative</ContentEyebrow>

          <ConceptBlock
            title="When formal periodic can be replaced by an effective management system"
            plainEnglish="GN3 explicitly recognises that some installations have an in-place maintenance regime so comprehensive that a formal periodic snapshot adds little. Where a competent permanent on-site team carries out documented preventative maintenance, the formal periodic can be reduced or replaced by reliance on the management system."
            onSite="This is a real option for hospitals, data centres, large industrial sites, infrastructure assets — anywhere with a documented O&M programme that goes beyond what a 5-yearly snapshot could achieve. The decision is the duty holder's; the inspector advises and documents."
          >
            <p>The conditions for the management-system route:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Competent permanent on-site maintenance staff.</strong> Not a visiting
                contractor on annual call. Permanent in-house team with electrical competence
                proportionate to the installation.
              </li>
              <li>
                <strong>Documented preventative maintenance programme.</strong> Schedule of
                planned tasks, frequency, recording of completion, recording of defects found and
                remedial action.
              </li>
              <li>
                <strong>Records that demonstrate the regime works.</strong> Defect logs, near-miss
                reports, response times to issues raised, audit trail showing the regime
                identifies and addresses issues.
              </li>
              <li>
                <strong>A management commitment to maintain the regime.</strong> Budget,
                personnel, training, governance — not a paper exercise.
              </li>
              <li>
                <strong>An EAWR Reg 4(2) compliance demonstration.</strong> The regime must
                positively demonstrate the duty holder is discharging the maintain-in-safe-
                condition duty better through ongoing maintenance than they would through a
                periodic snapshot.
              </li>
            </ol>
            <p>
              Where these conditions are met, the inspector can advise the duty holder that the
              formal periodic interval can be extended or the periodic itself replaced with a
              periodic audit of the maintenance system. The inspector's role shifts from primary
              verification to system audit. Document the decision with supporting evidence. The
              duty under EAWR Reg 4(2) does not transfer — it remains with the duty holder, who
              relies on the management system as their chosen compliance route.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 — Effective management system replacing periodic"
            clause="Where there is an effective management system in place for inspection and preventative maintenance of the installation (for example, where there are competent permanent on-site maintenance staff), periodic inspection and testing can be replaced by an alternative regime. The existence of an effective management system is a condition allowing replacement of formal periodic inspection and testing."
            meaning={
              <>
                GN3 codifies a pragmatic reality — for installations under continuous competent
                management, a 5-yearly snapshot adds less than the day-to-day maintenance
                programme. The clause requires the management system to be effective, not merely
                present. Inspectors advising on this route should evidence the effectiveness
                (documented programme, defect logs, response records, governance) and document
                the decision so a future inspector or HSE investigator can see why the formal
                periodic was reduced or replaced.
              </>
            }
            cite="Source: IET Guidance Note 3 — alternative regimes for periodic inspection where effective management systems are in place."
          />

          <SectionRule />

          <ConceptBlock
            title="Multi-tenant buildings — the layered scope problem"
            plainEnglish="Blocks of flats, mixed-use buildings, shared offices create overlapping duty-holder responsibilities. The freeholder is the duty holder for common parts and landlord-supplied installations; each leaseholder or rental landlord is responsible for the installation within their unit. An EICR commissioned by one party cannot certify the installations belonging to another party."
            onSite="Always clarify who is commissioning what before quoting. A freeholder asking for an EICR usually wants common parts plus a sample of flats; a landlord of one rented flat needs the EICR for that flat under the PRS Regs; a leaseholder commissioning their own EICR for sale needs their unit only."
          >
            <p>The scope decision tree for multi-tenant buildings:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Freeholder commissioning common parts.</strong> Scope = landlord's
                supply, intake, common-area distribution, common-area lighting, lift supplies,
                cleaner sockets, external lighting, communal heating controls. Plus an agreed
                sample of individual units (typical 10-20%) to characterise condition. Each
                rented unit retains its own PRS Regs EICR responsibility.
              </li>
              <li>
                <strong>Landlord of a single rented unit.</strong> Scope = the installation
                within that unit, from the landlord's incoming supply (usually the consumer unit
                in the unit) through to all final circuits. Common parts are the freeholder's
                responsibility, not in scope.
              </li>
              <li>
                <strong>Leaseholder owner-occupied for sale or insurance.</strong> Scope = the
                installation within the unit. Common parts are not in scope. Recommend that the
                buyer/insurer also reviews the freeholder's most recent common-parts EICR.
              </li>
              <li>
                <strong>Mixed-use building (commercial ground, residential above).</strong>
                Typically multiple separate EICRs — one for each commercial unit (commissioned by
                the commercial tenant or landlord per lease), one for the common parts
                (freeholder), one per residential unit (landlord under PRS Regs or
                owner-occupier).
              </li>
            </ul>
            <p>
              The scope confusion in multi-tenant buildings is the source of frequent disputes
              and missed inspections. Clear scope agreement at the quote stage avoids the trap of
              issuing an EICR that the customer thinks covers more than it does.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Sequencing the inspection on site</ContentEyebrow>

          <ConceptBlock
            title="The on-site sequence — front door to final reading"
            plainEnglish="Once the scope is agreed, the inspection itself follows a structured sequence. Visual first, dead tests next, live tests last. Within each block, work systematically — supply intake first, then CU, then circuits in order — so nothing is missed and the test record builds in a logical sequence the next reader can follow."
            onSite="The order matters because each step builds on the previous one. You cannot meaningfully measure Zs on a circuit you have not first proven for continuity. Skipping the visual to save time misses defects that the tests themselves cannot detect."
          >
            <p>The recommended on-site sequence:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Arrival and confirmation.</strong> Confirm the scope agreed at quote with
                the customer or duty holder representative. Walk the site briefly to confirm
                access, identify special-location areas, identify any new equipment or alterations
                since the last EICR.
              </li>
              <li>
                <strong>Visual inspection.</strong> Supply intake, MET, main bonding clamp inspection,
                CU inspection (front cover off where safe), accessory sample inspection, special
                location 100% inspection. Photographs of as-found conditions where reportable
                items are identified.
              </li>
              <li>
                <strong>Isolation planning.</strong> Identify which circuits can be isolated for
                dead testing and which cannot (critical loads, occupied spaces). Agree any
                temporary outage with the duty holder.
              </li>
              <li>
                <strong>Dead tests in BS 7671 sequence.</strong> Continuity of protective
                conductors (R2 or R1+R2 depending on method), continuity of ring final circuits,
                insulation resistance (line-line, line-earth, neutral-earth), polarity, earth
                electrode resistance where TT.
              </li>
              <li>
                <strong>Re-energise and live tests.</strong> Ze at origin, prospective fault
                current, Zs at sampled circuit endpoints, RCD operating current and time per
                Reg 643.7.3 single AC test (A4:2026), AFDD test where fitted, SPD status check
                where fitted.
              </li>
              <li>
                <strong>Functional tests.</strong> Switching, control gear operation, safety
                interlocks, emergency lighting where applicable, fire alarm interface where
                applicable.
              </li>
              <li>
                <strong>Coding and report drafting.</strong> Allocate codes per BPG4 four-question
                test, draft Section K Observations, complete Schedule of Test Results,
                complete Schedule of Inspections, draft overall classification.
              </li>
              <li>
                <strong>Customer briefing and handover.</strong> Walk the customer through the
                report, confirm next inspection date, agree remedial priority where Unsatisfactory.
              </li>
            </ol>
            <p>
              The sequence keeps the inspection internally consistent. A test out of sequence
              (e.g. live tests before dead tests confirmed) is a competence failure that could
              expose the inspector and others to unnecessary risk. The structured sequence is
              also easier to defend — the report shows the inspection followed BS 7671 Part 6
              methodology.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Special locations — why they need 100% inspection within the sample"
            plainEnglish="The Section 700 series of BS 7671 covers special locations — bathrooms, swimming pools, agricultural premises, EV charging, marinas. These locations carry elevated risk and the 700-series gives them additional requirements. Sampling is not appropriate for special-location accessories within an EICR; each one gets full inspection."
            onSite="When you walk into a property, mentally identify the special-location areas first — bathroom for sure, EV charge point if present, garden socket, swimming pool plant room. Plan to give 100% inspection time to those areas before sampling the general installation."
          >
            <p>The special locations most commonly encountered on EICRs:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Section 701 — locations containing a bath or shower.</strong> Zonal
                requirements (Zone 0/1/2), ingress protection ratings per zone, supplementary
                bonding considerations, additional protection by RCD. 100% inspection of all
                accessories within the room.
              </li>
              <li>
                <strong>Section 702 — swimming pools and other basins.</strong> Tighter zonal
                requirements than baths/showers. Plant room inspection annually per ESF/GN3.
              </li>
              <li>
                <strong>Section 705 — agricultural and horticultural premises.</strong> Harsh
                environment (water, dust, livestock, machinery), 3-year inspection cycle,
                particular attention to bonding given conductive parts in livestock areas.
              </li>
              <li>
                <strong>Section 711 — exhibitions, shows and stands.</strong> Temporary
                installations with frequent reconfiguration, short inspection cycles.
              </li>
              <li>
                <strong>Section 717 — mobile or transportable units.</strong> Including towable
                site cabins, food trailers, mobile workshops.
              </li>
              <li>
                <strong>Section 721 — caravans and motor caravans.</strong> Per GN3 Chapter 66
                in-service inspection requirements.
              </li>
              <li>
                <strong>Section 722 — electric vehicle charging installations.</strong> Annual or
                per manufacturer recommendation, particular attention to RCD type (Type B for
                EV charging where DC residual currents possible), AFDD recommendations under
                A4:2026 Reg 421.1.7 in some installations.
              </li>
              <li>
                <strong>Section 753 — heating cables and embedded heating systems.</strong>
                Underfloor heating, electric showers, embedded heating in walls or ceilings.
              </li>
            </ul>
            <p>
              Each special location has its own technical requirements that the inspector must
              know to verify properly. Sampling within special locations is not appropriate —
              every accessory in a bathroom gets visual inspection plus the relevant tests; every
              EV charge point gets full inspection of the dedicated circuit, the EVSE itself, and
              any associated load management equipment.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Scope is contractual — agreed in writing before inspection, recorded on EICR Extent and Limitations, signed off by the customer via quote acceptance.",
              "GN3 sampling guidance — typical 10% of accessories with full DB/CU coverage, but the rate must be appropriate to the installation and risk-weighted within the sample.",
              "Always 100% inspection — supply intake, MET, main earthing, main bonding, CUs, DBs, switchgear, accessories in special locations.",
              "Sampling permitted — final-circuit testing, accessories in non-special locations, light fittings, switches in non-special locations.",
              "Expand the sample if defect rates exceed expectations or safety-critical defects appear; document the expansion on the report.",
              "Multi-tenant buildings need layered scope — freeholder for common parts and landlord supplies, leaseholder/rental landlord for individual units.",
              "GN3 allows replacement of formal periodic with reliance on an effective management system where competent permanent on-site maintenance staff are documented and evidenced.",
              "The Extent and Limitations section must be specific enough that a stranger reading it five years later can understand exactly what was and was not certified.",
            ]}
          />

          <Quiz title="EICR sampling and scope — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section5-2')}
              className="rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors border border-white/10 p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white/60">
                <ArrowLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.2 EICR coding rubric
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section5-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.4 Reporting and remedial works
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
