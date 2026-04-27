/**
 * Module 5 · Section 1 · Subsection 3 — Site visitors key roles
 * Maps to City & Guilds 2365-02 / Unit 210 / LO1 / AC 1.3
 *   AC 1.3 — "Identify the key roles of site visitors"
 *
 * Frame: people who turn up on site without working there. Building
 * Inspectors (LABC / Approved Inspectors), HSE Inspectors, Local Authority
 * EHOs, scheme inspectors (NICEIC / NAPIT / ELECSA assessors), Designers
 * (architect / M&E consultant), CDM Principal Designer, Client
 * representatives. SOP for visitors: signed in, escorted, PPE, induction.
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
  'Site visitors key roles (1.3) | Level 2 Module 5.1.3 | Elec-Mate';
const DESCRIPTION =
  'Building Inspector, HSE Inspector, Local Authority EHO, scheme assessors, Designer, CDM Principal Designer, Client representative. Who visits site, why and what they want from you.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s1-sub3-hse',
    question:
      "An HSE inspector turns up unannounced on your commercial fit-out. They walk over to where you're working and ask you to explain the lock-off you've got on the panel you're testing. Your supervisor isn't in sight. What do you do?",
    options: [
      "Talk your way through it confidently — show them you know your stuff.",
      "Politely answer their direct factual questions about your work (yes I locked off, here's the test cert, here's the RAMS in my pocket), do not speculate or guess, do not lie under any circumstances, and ask them to give you a moment to fetch your supervisor. HSE inspectors have legal powers under HASAWA s.20 to question anyone on site — refusing to answer is an offence — but you're not expected to speak for the company.",
      "Refuse to answer and walk away.",
      "Lie to make the lock-off sound better than it is.",
    ],
    correctIndex: 1,
    explanation:
      "HASAWA s.20 gives HSE inspectors wide powers — entry, examination, sample-taking, photographs, copies of documents, statements from anyone on site. Refusing to answer is itself an offence. But you're entitled (and expected) to fetch your supervisor for anything beyond a simple factual answer about your own work. The cardinal rule is: don't lie. An inspector who catches you lying will treat the whole company's evidence as suspect. Politely factual + fetch the supervisor is the correct approach every time.",
  },
  {
    id: 'mod5-s1-sub3-building-control',
    question:
      "A Building Inspector from the Local Authority Building Control turns up to inspect the consumer unit installation on a domestic rewire you've just finished. What's the inspector actually checking?",
    options: [
      "Nothing — Building Control has no role on electrical work.",
      "Compliance with the Building Regulations 2010 — specifically Approved Document P (Electrical Safety — Dwellings) which references BS 7671. The inspector is checking that the work was carried out by a competent person (or has been inspected and certified by a third party) and that it complies with BS 7671. They'll also check related Approved Documents (B for fire, M for accessibility, L for energy where relevant).",
      "Only the colour of the cables.",
      "Whether the customer paid the bill.",
    ],
    correctIndex: 1,
    explanation:
      "Building Control (LABC for Local Authority, or Approved Inspectors for the private-sector route) check Building Regulations compliance. Part P is the electrical chapter — it requires notifiable electrical work in dwellings to be designed, installed and inspected to BS 7671. Most electrical work is done by a competent person under a registered scheme (NICEIC, NAPIT, ELECSA, etc.) which self-certifies — Building Control then accept the scheme's certificate without separate inspection. For non-scheme work the Building Inspector physically inspects and certifies.",
  },
  {
    id: 'mod5-s1-sub3-niceic',
    question:
      "Your firm is having its annual NICEIC assessment. An NICEIC assessor turns up to spend a day reviewing your firm's work. What does the assessor actually do?",
    options: [
      "They watch one electrician work for an hour and then leave.",
      "They spend the day reviewing the firm's quality management system (procedures, calibration records, complaint handling), they sample-inspect a number of recently completed jobs (looking at the install AND the certificates AND the site documentation), and they witness a Qualified Supervisor doing some live testing. The assessment is a competence audit of the firm and a sample-check of the work.",
      "They sit in the office and have a cup of tea.",
      "They only check the certificates and never look at the install.",
    ],
    correctIndex: 1,
    explanation:
      "Scheme assessment (NICEIC, NAPIT, ELECSA, STROMA, Certsure) is the competent-person scheme's annual audit of the contractor's continued competence. They sample-inspect installations, review the QMS, witness live work and check the Qualified Supervisor's competence. Failing an assessment can mean restrictions on scheme membership; serial failure means removal from the scheme, which means the firm can no longer self-certify Part P work. As an apprentice you might be asked to talk through your work; same rule as with HSE — be politely factual, don't speculate, fetch the supervisor for anything substantive.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the difference between a Local Authority Building Inspector (LABC) and an Approved Inspector?",
    options: [
      "There is no difference.",
      "Both check Building Regulations compliance, but LABC inspectors work for the Local Authority and follow the public-sector route; Approved Inspectors are private-sector firms registered with CICAIR (Construction Industry Council Approved Inspectors Register) who can be appointed in place of LABC. The choice is the client's. Both have the same statutory authority and the same Building Regulations to enforce.",
      "LABC is private-sector and Approved Inspector is public-sector.",
      "Approved Inspectors only check commercial; LABC only check domestic.",
    ],
    correctAnswer: 1,
    explanation:
      "The Building Regulations 2010 allow either route. Larger commercial projects often use Approved Inspectors (CICAIR-registered) because of speed and dedicated commercial expertise. Smaller domestic work tends to default to LABC. Either way the inspector is checking compliance with the Building Regulations including Part P for electrical work in dwellings.",
  },
  {
    id: 2,
    question:
      "Under HASAWA s.21 what is an Improvement Notice?",
    options: [
      "A friendly suggestion from the HSE that can be ignored.",
      "A formal legal notice issued by an HSE inspector requiring a person to remedy a contravention of statutory provisions within a specified period (minimum 21 days). It's appealable to an Employment Tribunal but it's binding unless overturned. Failure to comply is a criminal offence under HASAWA.",
      "A notice that the work has improved.",
      "A type of testing certificate.",
    ],
    correctAnswer: 1,
    explanation:
      "HASAWA s.21 gives HSE inspectors the power to issue Improvement Notices when they're of the opinion that a person is contravening (or has contravened in circumstances making it likely to continue) any of the relevant statutory provisions. The notice specifies the contravention and the period for remedy. Compliance is mandatory; failure to comply is itself an offence carrying a fine and potentially imprisonment.",
  },
  {
    id: 3,
    question:
      "Under HASAWA s.22 what is a Prohibition Notice?",
    options: [
      "A notice telling the contractor to take a week off.",
      "A formal legal notice issued by an HSE inspector when the inspector is of the opinion that activities are being carried out involving (or likely to involve) a risk of serious personal injury. The notice prohibits the activity until the matters specified in it are remedied. Can take immediate effect — the work stops the moment the notice is served.",
      "A notice prohibiting the inspector from visiting.",
      "Another name for a friendly warning.",
    ],
    correctAnswer: 1,
    explanation:
      "HASAWA s.22 is the most powerful HSE tool short of prosecution. A Prohibition Notice can take immediate effect — the activity stops there and then. It's used where the inspector judges there's a risk of serious personal injury. Common triggers: working at height without edge protection, live electrical work without controls, scaffolding that's clearly unsafe. As an apprentice, if a Prohibition Notice is served on your work area, you stop. Don't argue, don't try to finish what you're doing — stop.",
  },
  {
    id: 4,
    question:
      "Why does the CDM Principal Designer (PD) sometimes visit site during the construction phase?",
    options: [
      "They don't — the PD's role ends before construction starts.",
      "Although the PD's primary duty is during the pre-construction phase (gathering and providing pre-construction information), they often make periodic visits during construction to verify that the design assumptions held up and that the pre-construction H&S information is being used. This is especially common on complex projects where design changes during construction.",
      "Only to deliver lunch.",
      "Only on domestic projects.",
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 Reg 11 sets the PD's primary duties during pre-construction — co-ordinate H&S in design, prepare the pre-construction information. Many PDs also visit during construction (it's good practice rather than a strict CDM duty) to verify that design choices haven't introduced new risks and that designers are still considering H&S during any change-control. On smaller jobs the PD visit may be combined with the Designer's site visits.",
  },
  {
    id: 5,
    question:
      "What's the SOP for ANY visitor arriving on a CDM site?",
    options: [
      "They walk straight in.",
      "Sign in at the gate or welfare cabin, present ECS / CSCS / industry card if relevant, attend a visitor induction (shorter than the full operative induction), wear correct PPE for the area, and be escorted by a competent person from the site team. Visitors are not permitted to walk the site unaccompanied. CDM 2015 Reg 13(4)(b) requires the PC to take steps to prevent unauthorised access.",
      "Only put on a high-vis vest.",
      "Visitors don't need any briefing.",
    ],
    correctAnswer: 1,
    explanation:
      "Sign-in is statutory tracking — required for fire roll-call and for any post-incident investigation. Visitor induction is an abbreviated version of the full operative induction (PPE, fire muster, no-go areas, accident reporting). Escort is the practical control — visitors don't know the site, the trade clashes or the live hazards. CDM 2015 Reg 13(4)(b) explicitly requires the PC to prevent unauthorised access; sign-in plus escort is how that's achieved in practice.",
  },
  {
    id: 6,
    question:
      "A customer / client representative wants to walk the site to see how the works are progressing. What's the correct route?",
    options: [
      "They walk in and look around at their leisure.",
      "Sign in, get a brief visitor induction, wear correct PPE, and be escorted by the Site Manager or a senior member of the contractor's team. For a client representative the escort is usually the Project Manager or Site Manager because they'll want to talk through progress, snags and any commercial issues.",
      "They get an unsupervised tour.",
      "They watch from the welfare cabin only.",
    ],
    correctAnswer: 1,
    explanation:
      "Client visits are routine and welcome but they follow the visitor SOP like everyone else. The escort is usually the Project Manager (for commercial discussion) and/or the Site Manager (for operational tour). Apprentices may be asked to demonstrate the work — that's fine, be politely factual, don't speculate on programme or commercial matters (those are the PM's seat).",
  },
  {
    id: 7,
    question:
      "On a domestic Part P notifiable job (consumer unit change), why doesn't a Building Control inspector usually turn up?",
    options: [
      "Because Part P doesn't apply to domestic.",
      "Because most electrical contractors are registered with a competent-person scheme (NICEIC, NAPIT, ELECSA, STROMA, Certsure) which self-certifies the work to the Local Authority. The Local Authority accepts the scheme certificate without separate inspection. Building Control would only physically inspect for non-scheme work or where there's a specific concern.",
      "Because Building Inspectors don't work on small jobs.",
      "Because the customer doesn't allow it.",
    ],
    correctAnswer: 1,
    explanation:
      "The competent-person scheme model is what makes Part P workable. Notifiable work (consumer unit changes, special locations like bathrooms, new circuits in dwellings) is reported by the contractor's scheme to the Local Authority, with the scheme certificate (EIC or MEIWC) accepted as proof of compliance. This avoids the need for thousands of physical Building Control inspections per year. Non-scheme contractors have to either get LABC to inspect or use a third-party certifier.",
  },
  {
    id: 8,
    question:
      "If you spot what looks like a serious safety issue on a visit by an HSE inspector to a different part of the site, what should you do?",
    options: [
      "Nothing — it's not your job.",
      "Report it via your own chain (your Foreman in the first instance, escalating to the main contractor's Site Manager if it's site-wide). You don't approach the HSE inspector direct — that's not your seat — but you have a duty under CDM 2015 Reg 15(1)(b) and HASAWA s.7(a) to report hazards you become aware of. Your Foreman handles the conversation upward.",
      "Approach the HSE inspector and tell them about it directly.",
      "Take photos and post them on social media.",
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 Reg 15(1)(b) requires every worker to report hazards to the person in control of the work. HASAWA s.7(a) requires every employee to take reasonable care for others affected by their acts or omissions. Reporting hazards via your own chain is how both duties are discharged. Approaching an HSE inspector direct sidesteps your own management — it's an option of last resort if you genuinely believe the chain is suppressing the report, and there are whistle-blower protections under the Employment Rights Act 1996 for that scenario.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "If an HSE inspector turns up unannounced, can the site refuse them entry?",
    answer:
      "No. HASAWA s.20 gives HSE inspectors a statutory right of entry to any premises they have reason to believe is necessary for the purpose of carrying out their duties. Refusing entry is itself an offence. The inspector can also bring a constable if they reasonably believe they'll be obstructed. The correct site response is to admit them, log them in, fetch the Site Manager and co-operate with the visit.",
  },
  {
    question: "Can an HSE inspector take photos and copies of documents?",
    answer:
      "Yes. HASAWA s.20(2)(d), (e) and (k) explicitly authorise inspectors to take measurements, photographs and recordings, and to take possession of articles and substances. They can also require the production of any books or documents that need to be inspected for the enforcement of the Act. Resistance is an offence under s.33.",
  },
  {
    question: "Are scheme assessors (NICEIC, NAPIT, ELECSA) the same as HSE inspectors?",
    answer:
      "No. Scheme assessors are private-sector auditors employed by the competent-person scheme to verify that registered contractors continue to meet the scheme's competence standards. They have contractual authority over the contractor's scheme membership but no statutory powers. HSE inspectors are public-sector with statutory powers under HASAWA. Both should be co-operated with for different reasons — the scheme assessor decides whether your firm stays registered; the HSE inspector decides whether the firm gets prosecuted.",
  },
  {
    question: "Why does a Designer (architect or M&E consultant) sometimes visit site?",
    answer:
      "To verify that the install matches the design intent, to resolve site queries that have come up during construction, to witness commissioning of larger systems, and to handle change requests from the client. Designers also have CDM duties under Reg 9 to consider H&S in their design — site visits help verify those design assumptions held up. As an apprentice you might be asked to demonstrate work; same rule as with anyone else — be politely factual, fetch your supervisor for substantive questions.",
  },
  {
    question: "What's the difference between an Environmental Health Officer (EHO) and an HSE Inspector?",
    answer:
      "Both enforce HASAWA, but in different premises. The Health and Safety (Enforcing Authority) Regulations 1998 split enforcement: HSE inspectors enforce in higher-risk premises (factories, construction sites, agriculture, major hazards); Local Authority EHOs enforce in lower-risk premises (offices, shops, restaurants, leisure premises). On a commercial fit-out the HSE is the enforcing authority. On a fit-out of an office (once it's occupied) it would shift to the LA EHO.",
  },
  {
    question: "Should I take photos of inspectors or visitors on site?",
    answer:
      "No. Site visitors are entitled to do their job without being photographed by operatives, and many sites have explicit policies against personal photography. If you genuinely need a record of something the inspector said or showed you, ask your supervisor — they handle the documentation. Posting site photos on social media without permission is also a contractual issue with your employer and a confidentiality issue with the client.",
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
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 5 · Section 1 · Subsection 3"
            title="Site visitors key roles"
            description="Building Inspector, HSE Inspector, Local Authority EHO, scheme assessors, Designer, CDM Principal Designer, Client representative — who turns up on site, why and what they want from you."
            tone="emerald"
          />

          <TLDR
            points={[
              "Site visitors fall into four broad groups — statutory inspectors (HSE, Local Authority EHO), regulatory inspectors (Building Control LABC or Approved Inspector), scheme assessors (NICEIC, NAPIT, ELECSA, STROMA), and project visitors (Client representative, Designer, CDM Principal Designer).",
              "Every visitor follows the same SOP — sign in, brief visitor induction, correct PPE, escorted by a competent member of the site team. CDM 2015 Reg 13(4)(b) requires the Principal Contractor to prevent unauthorised access; sign-in plus escort is how that's done in practice.",
              "If an HSE inspector questions you, answer their direct factual questions politely, never lie or speculate, and ask to fetch your supervisor for anything beyond your immediate work. HASAWA s.20 gives them wide statutory powers including taking statements; refusing to answer is an offence but you're not expected to speak for the company.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the key roles of site visitors (Unit 210 LO1 AC 1.3 — verbatim from City & Guilds 2365-02 specification).",
              "Identify the role of the Building Inspector (LABC) and the Approved Inspector in checking Building Regulations compliance, including Approved Document P for dwellings.",
              "Identify the role and statutory powers of the HSE Inspector under HASAWA s.20, s.21 (Improvement Notice) and s.22 (Prohibition Notice).",
              "Identify the role of the Local Authority Environmental Health Officer (EHO) under the Health and Safety (Enforcing Authority) Regulations 1998.",
              "Identify the role of scheme assessors (NICEIC, NAPIT, ELECSA, STROMA, Certsure) in conducting annual technical assessments of registered contractors.",
              "Identify the role of project visitors — Designer (architect / M&E consultant), CDM Principal Designer, Client representative — in verifying design intent and project progress.",
              "State the visitor SOP — sign in, induction, PPE, escort — and the duty under CDM 2015 Reg 13(4)(b) on the Principal Contractor to prevent unauthorised access.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Statutory inspectors — HSE and Local Authority EHO</ContentEyebrow>

          <ConceptBlock
            title="HSE Inspector — wide statutory powers, takes the visit seriously"
            plainEnglish="The Health and Safety Executive (HSE) is the national regulator for workplace health and safety in higher-risk premises. HSE inspectors have wide statutory powers under HASAWA s.20 — entry, examination, sample-taking, photographs, document copies, statements from anyone on site. They visit either proactively (planned inspection of higher-risk activities) or reactively (after an incident or a complaint)."
            onSite="When an HSE inspector arrives, the site management chain takes over — sign-in, escort by the Site Manager, walk-through. As an apprentice you might be asked direct factual questions about your own work. Answer politely, don't speculate, don't lie, and ask to fetch your supervisor for anything substantive. The cardinal rule is don't lie — an inspector who catches you lying treats the whole company's evidence as suspect."
          >
            <p>
              The inspector's powers under HASAWA s.20 include:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Right of entry at any reasonable time (or without restriction in case of danger).
              </li>
              <li>
                Examination and investigation of the premises and equipment.
              </li>
              <li>
                Photographs, measurements, recordings and sampling.
              </li>
              <li>
                Taking possession of articles and substances for testing.
              </li>
              <li>
                Requiring the production of documents and copies.
              </li>
              <li>
                Taking statements (under caution if suspected of an offence).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="HSE enforcement — Improvement Notice (s.21) and Prohibition Notice (s.22)"
            plainEnglish="If the HSE inspector decides enforcement action is needed, they have two formal tools short of prosecution. An Improvement Notice (HASAWA s.21) requires the contravention to be remedied within a specified period (minimum 21 days) — appealable but binding unless overturned. A Prohibition Notice (HASAWA s.22) requires an activity to stop immediately because of risk of serious personal injury. Both are criminal-offence-on-non-compliance."
            onSite="If a Prohibition Notice is served on your work area, you stop. Don't argue, don't try to finish what you're doing, don't 'just put it in the panel and walk away'. Stop, secure the area, fetch your supervisor. The inspector has formed the opinion that there's a risk of serious personal injury — that's the legal threshold. Continuing to work after a Prohibition Notice is a criminal offence on you personally as well as the firm."
          >
            <p>
              When each notice is typically used:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Improvement Notice (s.21)</strong> &mdash; for contraventions that
                aren&apos;t immediately dangerous. Examples: incomplete RAMS, missing risk
                assessment for a noisy activity, inadequate welfare facilities, poor record-
                keeping on PAT.
              </li>
              <li>
                <strong>Prohibition Notice (s.22)</strong> &mdash; for activities involving (or
                likely to involve) risk of serious personal injury. Examples: working at height
                without edge protection, live electrical work without controls, unsafe
                scaffolding, unsafe excavation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Local Authority Environmental Health Officer — same powers, different premises"
            plainEnglish="The Health and Safety (Enforcing Authority) Regulations 1998 split HASAWA enforcement between HSE and the Local Authority. HSE handles higher-risk premises (factories, construction sites, agriculture, major hazards). Local Authority Environmental Health Officers (EHOs) handle lower-risk premises (offices, shops, restaurants, leisure)."
            onSite="On a commercial fit-out the HSE is the enforcing authority while construction is happening. Once the building is handed over and occupied as an office (for example), enforcement shifts to the LA EHO. As an apprentice doing a service call to an occupied office, the EHO is the relevant inspector — same powers under HASAWA s.20-22 as the HSE inspector but for a different category of premises."
          >
            <p>
              EHOs typically deal with:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Workplace health and safety in offices, shops, restaurants, hotels.
              </li>
              <li>
                Food safety (separate function but often the same officer in smaller authorities).
              </li>
              <li>
                Public health, statutory nuisance, environmental protection.
              </li>
              <li>
                Some asbestos enforcement and some EAWR enforcement in their premises category.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.21 (Improvement Notice)"
            clause={
              <>
                &quot;If an inspector is of the opinion that a person &mdash; (a) is contravening
                one or more of the relevant statutory provisions; or (b) has contravened one or
                more of those provisions in circumstances that make it likely that the
                contravention will continue or be repeated, he may serve on him a notice (in this
                Part referred to as &quot;an improvement notice&quot;) stating that he is of that
                opinion, specifying the provision or provisions as to which he is of that opinion,
                giving particulars of the reasons why he is of that opinion, and requiring that
                person to remedy the contravention or, as the case may be, the matters
                occasioning it within such period (ending not earlier than the period within which
                an appeal against the notice can be brought under section 24) as may be specified
                in the notice.&quot;
              </>
            }
            meaning={
              <>
                Improvement Notices are appealable to an Employment Tribunal within 21 days, but
                the burden is on the recipient to justify the appeal. Most notices are complied
                with rather than appealed. Failure to comply is itself an offence under s.33,
                carrying an unlimited fine and (on indictment) imprisonment up to two years.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.21 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.22 (Prohibition Notice)"
            clause={
              <>
                &quot;If as regards any activities to which this section applies an inspector is
                of the opinion that, as carried on or about to be carried on by or under the
                control of the person on whom the notice is served, the activities involve or, as
                the case may be, will involve a risk of serious personal injury, the inspector
                may serve on that person a notice (in this Part referred to as &quot;a prohibition
                notice&quot;).&quot;
              </>
            }
            meaning={
              <>
                A Prohibition Notice can take immediate effect &mdash; the activity stops there
                and then. The threshold is &quot;risk of serious personal injury&quot;, which is
                a high bar but a familiar one to inspectors. Continuing to work after a
                Prohibition Notice has been served is itself an offence under s.33. As an
                apprentice, if a Prohibition Notice affects your work area, you stop, secure the
                area and fetch your supervisor.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.22 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Regulatory inspectors — Building Control</ContentEyebrow>

          <ConceptBlock
            title="Building Inspector (LABC) and Approved Inspector — Building Regulations compliance"
            plainEnglish="Building Inspectors check compliance with the Building Regulations 2010. The two routes are LABC (Local Authority Building Control — public-sector) and Approved Inspectors (private-sector firms registered with CICAIR). The client chooses which route. Both have the same statutory authority and the same Building Regulations to enforce. For electrical work in dwellings, the relevant chapter is Approved Document P (Electrical Safety — Dwellings)."
            onSite="On a commercial fit-out the Building Inspector visits at key stages — substructure, superstructure, services first-fix, services second-fix, completion. They sign off each stage and ultimately issue the Final Certificate that allows the building to be occupied. On domestic Part P notifiable work, the Building Inspector usually doesn't physically visit because the contractor's competent-person scheme self-certifies — but they could if there's a concern."
          >
            <p>
              What the Building Inspector checks on electrical work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Approved Document P (Electrical Safety &mdash; Dwellings)</strong> &mdash;
                requires notifiable electrical work in dwellings to be designed, installed and
                inspected to BS 7671. Notifiable work includes consumer unit changes, work in
                special locations (bathrooms, kitchens with new circuits), and any new circuit.
              </li>
              <li>
                <strong>Approved Document B (Fire Safety)</strong> &mdash; fire alarms, emergency
                lighting, fire-rated penetrations where electrical containment passes through
                fire compartments.
              </li>
              <li>
                <strong>Approved Document M (Access)</strong> &mdash; switch and socket heights,
                accessible reach ranges.
              </li>
              <li>
                <strong>Approved Document L (Energy)</strong> &mdash; lighting energy efficiency
                and metering.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Scheme assessors — NICEIC, NAPIT, ELECSA, STROMA, Certsure</ContentEyebrow>

          <ConceptBlock
            title="Scheme assessment — annual audit of the contractor's competence"
            plainEnglish="Competent-person schemes (NICEIC, NAPIT, ELECSA, STROMA, Certsure) are private-sector audit bodies authorised by Government to verify that registered contractors continue to meet the competence standards needed to self-certify Building Regulations work (especially Part P). Each scheme conducts an annual assessment — a full day on the contractor's office, then sample-inspections of recently completed jobs."
            onSite="When the scheme assessor visits one of your jobs, they check the install (workmanship, terminations, containment, separation, RCD provision, cable routing), the certificates (correctly filled, accurate, matching the install), and the supporting documentation (test sheets, design, schedule of inspections). They might ask you to talk through your work — same rule as with HSE: be politely factual, don't speculate, fetch the Qualified Supervisor for anything substantive."
          >
            <p>
              The competent-person schemes typically encountered in electrical work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>NICEIC</strong> &mdash; oldest and largest scheme. Runs Approved Contractor
                and Domestic Installer streams.
              </li>
              <li>
                <strong>NAPIT</strong> &mdash; multi-trade competent-person scheme covering
                electrical and other building services.
              </li>
              <li>
                <strong>ELECSA</strong> &mdash; electrical-focused scheme, now part of Certsure.
              </li>
              <li>
                <strong>STROMA</strong> &mdash; multi-discipline certification body.
              </li>
              <li>
                <strong>Certsure</strong> &mdash; the operating company behind NICEIC and ELECSA.
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

          <ContentEyebrow>Project visitors — Designer, Principal Designer, Client</ContentEyebrow>

          <ConceptBlock
            title="Designer (architect, M&E consultant) — verifying design intent on site"
            plainEnglish="Designers (architects, M&E consultants, structural engineers) visit site periodically to verify that the install matches the design intent, to resolve site queries that have come up during construction, to witness commissioning of larger systems, and to handle change requests from the client. CDM 2015 Reg 9 puts H&S design duties on every Designer."
            onSite="When the M&E consultant visits your work area they often want to see specific items — a particular containment route, a panel installation, a cable termination. They might ask you to demonstrate or talk through it. Be polite, factual, accurate. Don't speculate on programme, cost or design alternatives — those go via the Project Engineer or Contracts Manager."
          >
            <p>
              When designers visit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Periodic walk-rounds during construction (often weekly or fortnightly).
              </li>
              <li>
                Witness commissioning of larger systems (HV, BMS, fire detection, complex
                lighting controls).
              </li>
              <li>
                Change-control meetings on site when the client wants a variation.
              </li>
              <li>
                Hand-over walks before practical completion.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="CDM Principal Designer (PD) — pre-construction H&S co-ordination"
            plainEnglish="The Principal Designer (PD) is appointed by the Client under CDM 2015 Reg 5 for projects involving more than one contractor. The PD's primary duty (under Reg 11) is during the pre-construction phase — co-ordinating H&S in design and producing the pre-construction information. Many PDs also visit during construction (good practice) to verify design assumptions held up."
            onSite="The PD visit is less common than the M&E consultant visit and tends to focus on H&S issues — has a design change introduced new risk, are designers still considering H&S during change-control, is the construction phase plan being implemented as intended. Apprentices won't usually interact with the PD direct, but it's useful to know who they are when the Site Manager mentions them."
          >
            <p>
              The PD's primary duties under CDM 2015 Reg 11:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Plan, manage, monitor and co-ordinate H&amp;S during the pre-construction phase.
              </li>
              <li>
                Identify, eliminate or control foreseeable risks via the design.
              </li>
              <li>
                Ensure designers comply with Reg 9.
              </li>
              <li>
                Prepare and provide the pre-construction information.
              </li>
              <li>
                Liaise with the Principal Contractor for the duration of the appointment.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Client representative — periodic walk-arounds"
            plainEnglish="The Client (or their representative — sometimes a project manager firm acting on behalf of the Client) makes periodic visits to see progress, raise concerns, request variations and witness key milestones. CDM 2015 Reg 4 puts duties on the Client to make suitable arrangements and to provide pre-construction information; the Client's site visits are how they verify those arrangements are working."
            onSite="The Client visit is friendly and welcome but it follows the visitor SOP like everyone else. The escort is usually the Project Manager (for commercial discussion) and/or the Site Manager (for operational tour). As an apprentice you may be asked to demonstrate the work; be politely factual and professional. Don't comment on programme, money or contractual matters — those are the PM's seat."
          >
            <p>
              Why the Client visits:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Programme verification &mdash; are we on track?
              </li>
              <li>
                Quality verification &mdash; does the work look right?
              </li>
              <li>
                Variation discussion &mdash; can we add or change scope?
              </li>
              <li>
                CDM duty &mdash; verifying that the suitable arrangements under Reg 4 are
                working.
              </li>
              <li>
                Stakeholder management &mdash; reporting back to the Client&apos;s own board or
                operations team.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 — Reg 13(4)(b) (preventing unauthorised access)"
            clause={
              <>
                &quot;The principal contractor must ensure that &mdash; (a) a suitable site
                induction is provided; (b) the necessary steps are taken to prevent access by
                unauthorised persons to the construction site; and (c) facilities that comply
                with the requirements of Schedule 2 are provided throughout the construction
                phase.&quot;
              </>
            }
            meaning={
              <>
                Reg 13(4)(b) is the legal hook for the visitor SOP &mdash; sign-in, escort and
                visitor induction are how the Principal Contractor discharges this duty in
                practice. Visitors who walk on site unaccompanied or without signing in are
                &quot;unauthorised persons&quot; for the purpose of this regulation. As an
                apprentice, if you spot someone in your work area who hasn&apos;t signed in,
                politely ask who they&apos;re with and direct them to the welfare cabin or fetch
                your Foreman.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 13 — verbatim from legislation.gov.uk."
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
            title="Trying to talk your way out with an HSE inspector"
            whatHappens={
              <>
                Apprentice gets caught short by an HSE inspector questioning their lock-off
                procedure. Tries to embellish &mdash; &quot;oh yeah I always do it that way and
                we&apos;ve got the certificates somewhere&quot; &mdash; without actually knowing
                if the certificates exist or if the lock-off was correctly recorded. Inspector
                checks the records, finds the embellishment doesn&apos;t match reality, treats
                the whole company&apos;s evidence as suspect for the rest of the visit. The
                visit escalates from a routine inspection to a serious investigation. The
                apprentice gets a difficult conversation with their employer afterwards.
              </>
            }
            doInstead={
              <>
                Be politely factual. &quot;Yes I locked off, here&apos;s the lock and the key, here&apos;s
                the test cert.&quot; If you don&apos;t know, say &quot;I don&apos;t know, I&apos;ll
                fetch my supervisor&quot; &mdash; that&apos;s a perfectly acceptable answer.
                Never lie, never speculate, never try to look more knowledgeable than you are.
                HSE inspectors are experienced at spotting embellishment and they treat it as
                evidence of a wider problem. Politely factual + fetch the supervisor is the
                correct approach every time.
              </>
            }
          />

          <Scenario
            title="HSE inspector turns up unannounced — what does the apprentice do?"
            situation={
              <>
                You&apos;re working alone (paired Approved Electrician has popped to the loo) on
                a panel termination on the third floor of a commercial fit-out. An HSE inspector
                arrives unannounced at the welfare cabin downstairs, signs in, gets escorted up
                to your floor by the main contractor&apos;s Site Manager. They walk over to your
                work area. The inspector asks: &quot;can you talk me through the lock-off
                you&apos;ve got on this panel?&quot; Your supervisor isn&apos;t back yet. The
                Site Manager is standing next to the inspector but hasn&apos;t spoken.
              </>
            }
            whatToDo={
              <>
                <strong>Answer the direct factual question</strong> &mdash; show them the lock,
                the key, the LOTO tag if you&apos;ve used one, the test cert in your job pack
                that confirms safe-isolation. &quot;Yes I locked off at 8:30am, here&apos;s the
                lock, here&apos;s the test cert, here&apos;s my safe-isolation procedure in the
                RAMS pocket.&quot;
                <br /><br />
                <strong>Don&apos;t speculate or guess</strong> &mdash; if they ask anything you
                don&apos;t know (procedure across multiple panels, RIDDOR history, RAMS
                authorship), say &quot;I don&apos;t know &mdash; can I fetch my supervisor?&quot;.
                Asking is fine; guessing is dangerous.
                <br /><br />
                <strong>Don&apos;t lie under any circumstances</strong> &mdash; including small
                lies of embellishment. Inspectors check what you say against records and they
                treat any inconsistency as evidence of a wider problem.
                <br /><br />
                <strong>Ask to fetch your supervisor</strong> &mdash; politely. &quot;Could I
                grab my supervisor for the next bit?&quot; is a perfectly fine sentence. The
                inspector will usually wait. If your Approved Electrician is unreachable, the
                Site Manager standing there can fetch the Foreman or the Contracts Manager.
                <br /><br />
                <strong>Don&apos;t obstruct or refuse</strong> &mdash; HASAWA s.20 gives the
                inspector a statutory right to question you and refusing is itself an offence
                under s.33. Co-operate fully, just don&apos;t over-reach.
              </>
            }
            whyItMatters={
              <>
                HSE visits define the firm&apos;s record. An inspector who leaves with the
                impression of a well-run, honest, co-operative team writes a different report
                from one who leaves with the impression of an evasive operation. As an apprentice
                you can&apos;t make the visit go well by yourself, but you can avoid making it
                go badly. The rule of three &mdash; politely factual, never lie, fetch the
                supervisor &mdash; covers almost every scenario. RIDDOR-reportable items already
                in the system (because your firm reports promptly) will be cross-referenced; the
                inspector won&apos;t be surprised by anything if the firm&apos;s housekeeping is
                in order.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Site visitors fall into four broad groups — statutory inspectors (HSE, LA EHO), regulatory inspectors (Building Control LABC or Approved Inspector), scheme assessors (NICEIC, NAPIT, ELECSA, STROMA, Certsure) and project visitors (Client, Designer, CDM Principal Designer).",
              "Every visitor follows the same SOP — sign in, brief visitor induction, correct PPE, escorted by a competent member of the site team. CDM 2015 Reg 13(4)(b) requires the PC to prevent unauthorised access.",
              "HSE inspectors have wide statutory powers under HASAWA s.20 — entry, examination, sample-taking, photographs, document copies, statements. Refusing to answer is an offence under s.33.",
              "HSE Improvement Notice (HASAWA s.21) requires remedy of a contravention within a specified period (minimum 21 days). HSE Prohibition Notice (HASAWA s.22) requires an activity to stop because of risk of serious personal injury — can take immediate effect.",
              "Building Inspectors (LABC or Approved Inspector) check Building Regulations compliance, including Approved Document P for electrical safety in dwellings. On Part P notifiable work the contractor's competent-person scheme usually self-certifies, so a physical Building Control visit is rare.",
              "Scheme assessors (NICEIC, NAPIT, ELECSA, STROMA, Certsure) conduct annual audits of registered contractors — sampling installations, reviewing certificates, witnessing testing. Failing means restrictions or removal from scheme membership.",
              "If an inspector questions you, be politely factual, never lie or speculate, and ask to fetch your supervisor for anything substantive. The cardinal rule is don't lie — an inspector who catches an embellishment treats the whole company's evidence as suspect.",
              "If you spot a hazard during a visit, report it via your own chain (Foreman, then Site Manager) under CDM 2015 Reg 15(1)(b). Don't approach an HSE inspector direct unless you genuinely believe the chain is suppressing the report.",
            ]}
          />

          <Quiz title="Site visitors — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section1/1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.2 Individuals reporting to site management
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section1/1-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.4 CDM 2015 framework — your duties as Worker
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
