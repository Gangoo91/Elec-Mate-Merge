/**
 * Module 4 · Section 2 · Subsection 4 — Site-type prep deep dive (supplementary)
 * Maps to City & Guilds 2365-02 / Unit 204 / LO2 (supplementary to AC 2.1, 2.2, 2.3)
 *
 * Frame: same wiring system, completely different prep workflow depending
 * on environment. Domestic, commercial, industrial, construction,
 * healthcare, education — each has its own access, hazard and admin
 * profile that an apprentice should recognise on day one.
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
  'Site-type prep deep dive | Level 2 Module 4.2.4 | Elec-Mate';
const DESCRIPTION =
  'Same wiring system, completely different prep workflow. Domestic, commercial, industrial, construction, healthcare and education — the prep profile that comes before the cable comes off the drum.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod4-s2-sub4-domestic',
    question:
      "On a domestic install in an OCCUPIED home (vs an empty void property), what's the single biggest preparation difference an apprentice often misses?",
    options: [
      'There is no difference — same wiring either way.',
      "Customer-facing protection — dust sheets and floor protection on the route from van to work area, conversation with the customer about which rooms will be no-go zones during the work, awareness of who else is in the property (children, pets, elderly relatives, vulnerable adults), agreed working hours, and the constant background of HASAWA s.3 duty to non-employees. None of that applies in a void property.",
      'You wear a different colour hi-vis.',
      'You bring fewer tools.',
      ],
    correctIndex: 1,
    explanation:
      "Occupied-domestic prep is half about the wiring system and half about managing the people in the property. The customer is paying you, but they are also a non-employee under HASAWA s.3 — the duty to protect them runs alongside the work. Floor protection is a small example with a big effect on the customer's experience and on your firm's repeat work, and it's the kind of detail an apprentice notices once and remembers.",
  },
  {
    id: 'mod4-s2-sub4-cdm',
    question:
      "You arrive at a notifiable construction site as a sub-contractor on day one. Before you do any work, what's the FIRST formal step?",
    options: [
      'Find your work area and start unpacking tools.',
      "Site induction with the principal contractor (CDM 2015 Reg 13). The induction covers the construction phase plan, site rules, welfare arrangements, emergency procedures, specific site hazards, and any pre-construction information from the principal designer. Until you've been inducted you're not signed in to the site H&S system and the principal contractor cannot lawfully let you work.",
      "Phone the customer for a chat.",
      'Set up a temporary distribution board.',
    ],
    correctIndex: 1,
    explanation:
      "CDM 2015 Reg 13 places the induction duty on the principal contractor, and Reg 15 places the corresponding duty on the worker to co-operate with the safety arrangements. Skipping the induction is a textbook s.7 / Reg 15 breach. The induction also gives you site-specific information that no RAMS could have included — current trade clashes, live services, asbestos survey results, no-go zones.",
  },
  {
    id: 'mod4-s2-sub4-healthcare',
    question:
      "You're working in a hospital and need to isolate a circuit for a panel-board change. What's the additional prep step that doesn't apply in a typical commercial install?",
    options: [
      'No additional steps — same isolation either way.',
      "Coordination with clinical estates / facilities team BEFORE isolation, because the circuit may serve clinical equipment with patient-safety implications. Hospitals have IPS (isolated power systems) for some clinical areas, UPS-backed circuits for others, and dual-redundant supplies for critical care. Isolating without coordination can take a ventilator off the grid. The estates team will have a planned outage window, an alternative supply route, and a documented permit-to-isolate that has to be agreed before any switching happens.",
      'You can isolate at the consumer unit as normal.',
      'You ask the patient to move.',
    ],
    correctIndex: 1,
    explanation:
      "Healthcare electrical work is governed by HTM 06-01 (Health Technical Memorandum on electrical services supply and distribution) on top of BS 7671. The principle: NO unannounced isolation in a clinical area, ever. The estates / facilities team coordinates the outage with clinical staff, provides alternative supply where needed, and authorises the work via a permit. An apprentice on a hospital site who flips a breaker without that permit can take down life-supporting equipment.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the headline difference between domestic and commercial prep workflows for a typical first-fix job?",
    options: [
      'There is no difference.',
      "Customer-management overhead. Domestic = single homeowner, conversational, dust sheets, agreed working hours, kids and pets to consider. Commercial = sign-in/sign-out, contractor induction, principal contractor coordination, working out-of-hours where the business operates during the day, retail floor lifts and office desk-shifts to plan around. The wiring may be similar; the choreography around the work is wildly different.",
      'Domestic uses 6mm cable, commercial uses 1.5mm.',
      'Domestic is always TT earthing; commercial is always TN.',
    ],
    correctAnswer: 1,
    explanation:
      "The technical install can be similar but the prep is completely different. Apprentices who have only worked domestic find the formal sign-in / induction / paperwork chain on a commercial site jarring at first; those who start in commercial sometimes underestimate the customer-management skill needed in a domestic setting. Both are real and both have to be learned.",
  },
  {
    id: 2,
    question:
      "What's an industrial site's most common 'prep' constraint that a domestic-only apprentice wouldn't have encountered?",
    options: [
      'There are no constraints in industrial.',
      "Production stop-times. Industrial sites typically run continuous or shift-based production, and electrical work that requires isolation has to fit within scheduled outages or planned shutdowns. The prep includes coordinating with plant operations, integrating with the site lockout/tagout system, observing any ATEX zones in process plants, and often working out-of-hours so the production line isn't affected.",
      'You always have to wear shorts.',
      'There are no risk assessments allowed.',
    ],
    correctAnswer: 1,
    explanation:
      "Industrial work brings the production-vs-maintenance tension to the surface. Every minute of unplanned outage costs the operator real money, so isolation work is tightly controlled and often confined to weekends or planned annual shutdowns. The lockout/tagout system on industrial sites is usually more developed than domestic safe isolation — multiple operators, multiple locks, formal sign-on / sign-off.",
  },
  {
    id: 3,
    question:
      "Under CDM 2015 Reg 4, what duties does the CLIENT (the person commissioning the construction work) have?",
    options: [
      'None — the client just pays.',
      "Make suitable arrangements for managing the project (resources, time, competent appointments), provide pre-construction information to designers and contractors, ensure the principal designer and principal contractor (where required) are appointed, and co-operate with all duty-holders. The client duties are real and enforceable — the HSE has prosecuted clients (including domestic clients in some cases) for failing to make those arrangements.",
      'Only to provide tea and biscuits.',
      'Only to sign the final invoice.',
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 made the client a primary duty-holder for the first time. For commercial clients the duties are extensive (Reg 4). For domestic clients (Reg 7) most of the duties pass to the contractor or principal contractor automatically — but the contractor still needs to know how the regs apply because their own duties under Reg 8 (workers) and Reg 9 (designers) are unaffected.",
  },
  {
    id: 4,
    question:
      "What's a 'construction phase plan' under CDM 2015, and who's responsible for it?",
    options: [
      'A wishlist of materials.',
      "A document prepared by the principal contractor before the construction phase starts, setting out the health and safety arrangements for the site (welfare, induction, site rules, hazard controls, emergency procedures, monitoring). Required for any project where there is more than one contractor; the depth of the plan scales with the project size and risk profile. Sub-contractors are entitled to relevant extracts on induction.",
      'A construction phase plan is the set of architect drawings.',
      "A construction phase plan is the customer's wish list.",
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 Reg 12 requires the principal contractor to prepare and update the construction phase plan throughout the project. The plan is the working H&S document for the site — the induction draws from it, the toolbox talks reference it, and the phase plan is the document the HSE inspector asks for first when visiting. As an apprentice you don't write it but you should read the parts that affect your work.",
  },
  {
    id: 5,
    question:
      "On a retail fit-out, why is out-of-hours working often the default for electrical work?",
    options: [
      'Electricians prefer night work.',
      "Because the retail trading hours can't be disrupted. Floor lifts, ceiling tile removal, dust generation and circuit isolation all interfere with shoppers and staff. Out-of-hours work (typically 8pm to 6am for high-street retail) lets the work proceed without affecting trade. Prep includes agreed access times, security pass arrangements, fire-alarm coordination (if temporary detector covers are needed) and a formal hand-back at end of shift.",
      'It is illegal to work in retail during the day.',
      'Customers do not want to see workmen.',
    ],
    correctAnswer: 1,
    explanation:
      "Retail out-of-hours working is a different prep model from a typical domestic 9-to-5 job. The site is unmanned during your shift (or has a skeleton security team), so you carry your own emergency contact, set up your own welfare, and observe the agreed start/finish times strictly. Hand-back paperwork records what you've done and what's been left isolated, ready for the morning shift. CDM 2015 still applies on the larger fit-outs.",
  },
  {
    id: 6,
    question:
      "What's a 'lockout-tagout' (LOTO) interface on an industrial site, and how does it differ from a typical domestic safe isolation?",
    options: [
      'No difference — same procedure.',
      "Industrial LOTO is a multi-person, multi-lock system. Each operative working on a piece of plant fits their OWN lock to a hasp on the isolation device, so the supply cannot be re-energised until every individual lock has been removed by the operative who fitted it. Tags identify each operative and the work they're doing. It interfaces with plant operations because the same isolation can affect mechanical, hydraulic, pneumatic and electrical sources of stored energy. Domestic safe isolation is a single-operative procedure on a single circuit.",
      'LOTO means lights off, tools out.',
      'LOTO is only used on offshore platforms.',
    ],
    correctAnswer: 1,
    explanation:
      "LOTO scales the safe-isolation principle for industrial environments where multiple energy sources, multiple operatives and shift changes all overlap. The Provision and Use of Work Equipment Regulations 1998 Reg 19 covers isolation from sources of energy. The OSHA 'Control of Hazardous Energy' standard is the US version that has heavily influenced UK industrial practice. As an apprentice on an industrial site you'll be issued your own personal lock and trained on the local LOTO procedure during induction.",
  },
  {
    id: 7,
    question:
      "Why do schools require additional preparation steps for electrical work compared with a typical office?",
    options: [
      'Schools are more dangerous than offices.',
      "Safeguarding. Children are present during term time, which restricts when work can be done, requires DBS-checked operatives for any work where unsupervised contact with pupils is foreseeable, and adds rules around photography, conversation and movement around the building. Most major electrical work in schools is done during holidays for exactly this reason. The school's safeguarding lead is a key contact during prep.",
      'Schools have stricter electrical regulations.',
      'Schools use 415V three-phase only.',
    ],
    correctAnswer: 1,
    explanation:
      "Safeguarding is the headline differentiator for school work. The Keeping Children Safe in Education (KCSIE) statutory guidance and the Disclosure and Barring Service (DBS) regime sit on top of the normal site H&S requirements. Most contracts include a safeguarding clause requiring DBS-checked operatives on site. The practical effect is that holiday-period working becomes the default and term-time work is tightly bounded.",
  },
  {
    id: 8,
    question:
      "Healthcare premises have specific electrical requirements under HTM 06-01. What's the headline implication for an apprentice doing prep on a hospital site?",
    options: [
      'No additional implications.',
      "Coordinate with the estates / facilities team BEFORE any isolation, recognise that some areas have IPS (isolated power systems) and UPS-backed supplies, never operate switchgear without authorisation, and use the formal hospital permit-to-work system. Some clinical equipment cannot tolerate any interruption — anaesthesia, ventilation, dialysis. The prep window for clinical-area work is often weeks rather than days because of the planning involved.",
      'You can work on any circuit at any time.',
      'You should isolate at the meter to be safe.',
    ],
    correctAnswer: 1,
    explanation:
      "HTM 06-01 sets out the hospital electrical-services framework. The headline rule for an apprentice: no unauthorised switching, ever. The estates team owns the plant and the permit system; you work within that framework. Even minor work in a clinical area is coordinated with the clinical staff because patient routines, ward shifts and equipment dependencies all overlap with the planned work.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Why does the apprenticeship cover all these site types if I'll only ever work in one?",
    answer:
      "Because the field changes — your firm may be domestic-only today and pick up commercial work next year, or you may move firms. The qualification is about competence in 'electrical installation' broadly, not in any one site type. Knowing the prep difference between domestic, commercial, industrial, construction, healthcare and education means you can step into a new environment without freezing on day one. It also makes you more useful to your firm.",
  },
  {
    question: "Is CDM 2015 the same on a domestic project as on a commercial fit-out?",
    answer:
      "Almost. The structure of the regs is the same — client, principal designer, principal contractor, contractors, workers — but the domestic CLIENT duties (Reg 7) are largely transferred to the contractor or principal contractor automatically. The contractor's own duties under Reg 8 / Reg 9 / Reg 13 are unaffected. So yes, CDM applies to domestic work even though the homeowner doesn't realise it, and the contractor inherits more of the client-side duties as a result.",
  },
  {
    question: "On an industrial site, who provides the lockout-tagout locks?",
    answer:
      "You typically bring your own personal lock as part of your toolkit, with your name engraved or labelled. The site provides the hasps, scissor multi-locks and tag stock. The principle is one lock per operative — only the operative who fitted the lock can remove it, which means even if the supervisor wants to re-energise, they can't if your lock is still in place. Your lock comes off when you finish the work, not when someone else asks for it.",
  },
  {
    question: "What's an ATEX zone and where would I encounter one as an apprentice?",
    answer:
      "ATEX (Atmospheres Explosibles) zones are areas where an explosive atmosphere may be present — vapour, mist, gas or dust above the lower explosive limit. Process plants (chemical, oil/gas, food production with combustible powders, flour mills, distilleries) classify zones from 0 (continuous) to 22 (rare dust). Equipment for use in those zones has specific certification (ATEX category 1, 2, 3) and the install standard is BS EN 60079. As a Level 2 apprentice you wouldn't be working in zoned areas independently — but recognising them on site is part of basic prep.",
  },
  {
    question: "Do I need separate qualifications for healthcare electrical work?",
    answer:
      "For routine BS 7671 work, no — the same Level 2 / Level 3 qualifications apply. For specialist healthcare-electrical work (IPS systems, ICU power, medical body-protected/critical areas) most NHS trusts and large private healthcare contractors require an Authorised Person (AP) qualification under HTM 06-03 / HTM 06-01. You don't need that on day one as an apprentice, but the contractors who hold those tickets are who you'd be working under in a hospital.",
  },
  {
    question: "How do I know if a school job is term-time or holiday-only?",
    answer:
      "The contract will say. Most major school electrical work (rewires, distribution upgrades, plant rooms) is holiday-only because of safeguarding and noise constraints during teaching. Minor reactive work (a single circuit, a faulty fitting, an emergency) is allowed during term time but with restrictions on access, supervision and DBS requirements. The school's facilities manager or business manager is the key contact — they coordinate the work around the school calendar.",
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
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · Subsection 4"
            title="Site-type prep deep dive"
            description="The same wiring system, completely different prep workflow depending on the environment. Domestic, commercial, industrial, construction, healthcare and education each have their own access, hazard and admin profile."
            tone="emerald"
          />

          <TLDR
            points={[
              "The technical install can be similar across site types but the prep choreography is wildly different. Recognising the differences is what stops an apprentice freezing on day one of a new environment.",
              "Domestic and commercial differ mostly in customer-management overhead and formal documentation. Industrial adds production constraints and lockout-tagout. Construction adds CDM 2015 induction and the principal contractor's site rules.",
              "Healthcare and education add specialist constraints — patient-safety coordination via HTM 06-01 and clinical estates teams in healthcare; safeguarding and DBS in education with most major work confined to holidays.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Supplementary content — extends LO2 but is not directly mapped to a 204 AC. Designed to deepen apprentice understanding beyond the formal AC scope.",
              "Identify the major site-type categories an electrician encounters — domestic, commercial, industrial, construction, healthcare, education.",
              "State the headline preparation differences between site types — customer-facing, formal documentation, production constraints, safeguarding, clinical coordination.",
              "Recognise the role of CDM 2015 (Reg 4 client, Reg 13 principal contractor, Reg 15 worker) on construction sites.",
              "Identify the role of HTM 06-01 in coordinating electrical work in healthcare premises.",
              "Recognise the safeguarding and DBS implications of working in education premises during term time.",
              "Apply a structured prep approach to a new site type — sign-in, induction, hazard scan, agreed access and welfare arrangements — before tools come out.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why site type changes the prep workflow</ContentEyebrow>

          <ConceptBlock
            title="Same wiring, different choreography"
            plainEnglish="A 32A radial circuit is a 32A radial circuit whether you install it in a bungalow, a corner shop, a process plant, a building site, a hospital ward or a school. What changes between those environments is everything around the install — who's there, what time you can work, what permissions you need, what other systems are affected, who you have to coordinate with."
            onSite="The technical knowledge transfers; the workflow doesn't. An apprentice who's only ever worked domestic will find a hospital site overwhelming on day one because the prep paperwork and the coordination overhead is so much heavier. The reverse is also true — an industrial-only apprentice can underestimate the customer-management skill needed in a domestic setting."
          >
            <p>
              The dimensions that change between site types:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Who&apos;s present</strong> — homeowner, customers, employees, patients,
                pupils, the public, other trades.
              </li>
              <li>
                <strong>Working hours</strong> — daytime, out-of-hours, term-time, holiday,
                planned shutdown.
              </li>
              <li>
                <strong>Access and security</strong> — knock on door vs sign-in vs DBS check vs
                permit-to-enter.
              </li>
              <li>
                <strong>Documentation chain</strong> — verbal agreement vs RAMS vs construction
                phase plan vs HTM permit.
              </li>
              <li>
                <strong>Coordination requirements</strong> — single homeowner vs principal
                contractor vs facilities team vs clinical estates vs school business manager.
              </li>
              <li>
                <strong>Welfare arrangements</strong> — customer&apos;s kettle vs site mess vs
                hospital staff canteen vs school holiday-cover catering.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Domestic — occupied vs void</ContentEyebrow>

          <ConceptBlock
            title="Occupied homes — the customer is half the job"
            plainEnglish="Occupied domestic work is half wiring and half customer relationship. The customer is paying you, but they are also a non-employee under HASAWA s.3 — the duty to protect them runs alongside the work. Floor protection, agreed working hours, room-by-room communication, awareness of children/pets/elderly relatives — all of it is preparation, none of it is in the textbook."
            onSite="The customer-facing detail is what separates a five-star firm from a one-star firm in the customer's mind. Dust sheets on the route from van to work area, shoe covers if asked, a brief conversation each morning about what you'll be doing today, a tidy at the end of each day. Reputation is built on this stuff and lost on its absence."
          >
            <p>
              Occupied-domestic prep checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Floor protection from the van to the work area, throughout the work area.
              </li>
              <li>
                Agreed working hours and rooms in use — written or texted to avoid misunderstanding.
              </li>
              <li>
                Identify all occupants — children, elderly relatives, vulnerable adults, pets.
                Confirm who&apos;s home when.
              </li>
              <li>
                Locate gas isolation, water isolation, fire extinguisher, customer&apos;s
                phone position.
              </li>
              <li>
                Brief the customer on which areas are no-go during the work and why.
              </li>
              <li>
                End-of-day tidy — tools secured, work area cleaned, partial work made safe.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Void domestic properties — different prep, different risk profile"
            plainEnglish="A void property (between tenants, post-purchase before move-in, mid-rewire with the customer staying elsewhere) eliminates the customer-management overhead but introduces its own risks — no occupant means no immediate report of a problem, services may be off or unmetered, security is your responsibility while you're on site."
            onSite="Void prep includes confirming who has the keys (chain of custody for security), confirming the supply status (is the property still on a meter or has it been disconnected?), establishing temporary lighting if the property is meterless, and a more thorough fabric/services check because you can't ask 'what's behind that wall?' to anyone."
          >
            <p>
              Void-property prep differences:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Key chain of custody — sign in/out with the holder, return at end of shift.
              </li>
              <li>
                Supply status — meter present? Live? Suspended? Disconnected? Builder&apos;s
                supply?
              </li>
              <li>
                Temporary lighting if no power — the property may be unlit during your work.
              </li>
              <li>
                Lone-working arrangements — check-in / check-out call to the office, mobile
                signal coverage in the property.
              </li>
              <li>
                Security — windows, doors, ladders left out overnight (don&apos;t).
              </li>
              <li>
                Fabric / services exploration — slower because you can&apos;t ask the homeowner
                what&apos;s where.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Commercial — retail, office, hospitality</ContentEyebrow>

          <ConceptBlock
            title="Out-of-hours working is the default for retail and hospitality"
            plainEnglish="Most commercial electrical work in occupied premises is done out-of-hours so the business can trade during the day. Retail typically 8pm-6am. Office 6pm-7am. Hospitality between service shifts (often 11pm-5am for a restaurant). The prep includes agreed access times, security pass arrangements, fire-alarm coordination, and a formal hand-back at end of shift."
            onSite="Out-of-hours work is a different rhythm. The site is unmanned (or skeleton security), so you carry your own emergency contact, set up your own welfare, and observe the agreed start/finish strictly. The premises has to be left in a tradeable state by 6am — every cable made safe, every fitting reinstated, every dust sheet removed."
          >
            <p>
              Commercial out-of-hours prep:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Sign-in / sign-out arrangements with security or facilities.
              </li>
              <li>
                Fire-alarm isolation if needed (typically requires a dedicated permit and the
                facilities team&apos;s sign-off — see Sub 5).
              </li>
              <li>
                Lift access if working above ground floor — lift may be locked out-of-hours.
              </li>
              <li>
                Welfare — bring your own water, food, first-aid; toilets may be locked.
              </li>
              <li>
                Lone-working / two-person rule for circuits over a certain rating, depending on
                firm policy.
              </li>
              <li>
                Hand-back paperwork at end of shift — what&apos;s done, what&apos;s left isolated,
                what&apos;s ready for the morning team.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Industrial — process plants and continuous production</ContentEyebrow>

          <ConceptBlock
            title="Production stop-times dictate the work window"
            plainEnglish="Industrial sites typically run continuous or shift-based production. Electrical work that requires isolation has to fit within scheduled outages or planned shutdowns. The prep includes coordinating with plant operations, integrating with the site lockout/tagout system, observing any ATEX zones in process plants, and often working out-of-hours so the production line isn't affected."
            onSite="The lockout/tagout (LOTO) system on industrial sites is more developed than domestic safe isolation — multiple operators, multiple locks, formal sign-on/sign-off, often electronic permit systems. PUWER 1998 Reg 19 is the statutory hook for isolation from sources of energy. As an apprentice on an industrial site you'll be issued your own personal lock and trained on the local LOTO procedure during induction."
          >
            <p>
              Industrial-site prep elements:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>LOTO interface</strong> — your personal lock, the site&apos;s isolation
                hasps, and the multi-lock scissor system that lets multiple operatives all
                isolate the same supply at once.
              </li>
              <li>
                <strong>Production coordination</strong> — work scheduled around scheduled
                outages, often weekend nights or planned annual shutdowns.
              </li>
              <li>
                <strong>ATEX zones</strong> — process plants with combustible vapour, gas, mist
                or dust. Equipment certification required (ATEX 1, 2, 3) and BS EN 60079
                installation standards apply. Level 2 apprentices wouldn&apos;t be working in
                zoned areas independently but recognising them is basic prep.
              </li>
              <li>
                <strong>Permit-to-work</strong> — most industrial sites use formal permits for
                hot work, confined space, live work and high-energy isolation.
              </li>
              <li>
                <strong>Plant operator briefing</strong> — before any switching, the local plant
                operator is informed and signs the permit.
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

          <ContentEyebrow>Construction — CDM 2015 from start to finish</ContentEyebrow>

          <ConceptBlock
            title="Construction sites run on CDM 2015 — every operative inside the framework"
            plainEnglish="On a notifiable construction site (more than 30 days with 20+ workers, or 500+ person-days) CDM 2015 applies in full. The duty-holders are client, principal designer, principal contractor, contractor, designer, worker. Every operative arriving on site is brought into the framework via the principal contractor's induction (Reg 13) and stays inside it via the construction phase plan, daily briefings and ongoing site rules."
            onSite="As an apprentice on a CDM site, the day-one experience is the induction. Site office, sign-in, watch a short induction video or talk, get your sign-in lanyard, get briefed on the construction phase plan extracts that affect your work. Skipping the induction or signing in without paying attention is a textbook s.7 / Reg 15 breach."
          >
            <p>
              CDM 2015 site-prep elements for an electrical operative:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pre-construction information</strong> from the client / principal
                designer — site survey, asbestos register, existing services drawings, ground
                conditions, planning constraints. Available on request before you arrive.
              </li>
              <li>
                <strong>Construction phase plan</strong> from the principal contractor — site
                rules, hazards, welfare, induction process, emergency procedures. Extracts
                relevant to your work are part of induction.
              </li>
              <li>
                <strong>Site induction</strong> per Reg 13(4) — formal first-day briefing.
                Mandatory for everyone on site, including visitors.
              </li>
              <li>
                <strong>Daily briefings / toolbox talks</strong> — short safety updates from the
                principal contractor or your supervisor. Sub 5 covers toolbox talks in detail.
              </li>
              <li>
                <strong>Permit-to-work</strong> — for hot work, confined space, live work, work
                near overhead lines. See Sub 5.
              </li>
              <li>
                <strong>Welfare per Schedule 2</strong> — toilets, washing, drinking water, mess,
                drying area, clothes storage. Provided by the principal contractor.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 — Reg 4(1) and Reg 15(2)"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 4(1)</strong> — &quot;A client must make suitable arrangements for
                  managing a project, including the allocation of sufficient time and other
                  resources&hellip;&quot;
                </p>
                <p>
                  <strong>Reg 15(2)</strong> — &quot;A worker must report to the principal
                  contractor or contractor (as the case may be) anything they are aware of that
                  is likely to endanger their own health or safety or that of others.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Reg 4(1) is the client duty — the client is the duty-holder who commissions the
                work and must make arrangements for time, resources and competent appointments.
                Reg 15(2) is the worker duty — every operative on site has a personal duty to
                report hazards. As an apprentice you are caught by Reg 15. Combined with HASAWA
                s.7, the worker-duty side of CDM is very real and very personal.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 4 and Reg 15 — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Healthcare — coordination with clinical estates</ContentEyebrow>

          <ConceptBlock
            title="Hospitals run on HTM 06-01 — no unauthorised switching, ever"
            plainEnglish="Healthcare premises have specific electrical requirements under Health Technical Memorandum HTM 06-01 (Electrical services supply and distribution) on top of BS 7671. The principle: no unauthorised isolation in a clinical area, ever. The estates / facilities team coordinates outages with clinical staff, provides alternative supply where needed, and authorises the work via a permit."
            onSite="Some clinical equipment cannot tolerate any interruption — anaesthesia, ventilation, dialysis, neonatal care. IPS (isolated power systems) are used in operating theatres for isolated, monitored supplies. UPS (uninterruptible power supply) backs critical loads. Dual-redundant supplies route from independent transformers. The prep window for clinical-area work is often weeks rather than days because of the planning involved."
          >
            <p>
              Healthcare prep elements:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Authorised Person (AP) sign-off</strong> — under HTM 06-03 the AP is the
                competent person nominated to authorise work on the high-voltage / critical
                low-voltage system. Apprentices work under an AP&apos;s supervision.
              </li>
              <li>
                <strong>Permit-to-work</strong> — formal hospital permit for any switching,
                signed by AP and accepted by the operative.
              </li>
              <li>
                <strong>Clinical coordination</strong> — agreed outage window with the ward /
                department affected, often involving moving patients or rescheduling
                procedures.
              </li>
              <li>
                <strong>Alternative supply</strong> — UPS, IPS, mobile generators where the load
                cannot tolerate interruption.
              </li>
              <li>
                <strong>Infection control</strong> — clean-down protocols for tools, dust
                control in clinical areas, sometimes specific PPE (scrubs, hair covers).
              </li>
              <li>
                <strong>HTM 06-01 + IET Guidance Note 7</strong> — the documents that govern
                healthcare electrical design and operation.
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

          <ContentEyebrow>Education — safeguarding and term-time constraints</ContentEyebrow>

          <ConceptBlock
            title="Schools and colleges — safeguarding shapes the prep window"
            plainEnglish="Children are present during term time, which restricts when work can be done, requires DBS-checked operatives for any work where unsupervised contact with pupils is foreseeable, and adds rules around photography, conversation and movement around the building. Most major electrical work in schools is done during holidays for exactly this reason."
            onSite="Holiday windows are short and intensive — Easter and half-terms are typically 1-2 weeks; summer is 6 weeks but contended for by every other trade and contractor. Planning for holiday-only work means agreeing the work scope months in advance, mobilising materials before the holiday starts, and finishing within the window so the school can re-open as scheduled."
          >
            <p>
              Education-sector prep elements:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DBS check</strong> — Disclosure and Barring Service check on all
                operatives where unsupervised contact with pupils is foreseeable. Most school
                contracts require enhanced DBS for all on-site staff.
              </li>
              <li>
                <strong>Safeguarding briefing</strong> — from the school&apos;s safeguarding lead,
                covering behaviour around pupils, no photography of pupils, dress code, no
                lone-contact rules.
              </li>
              <li>
                <strong>Term-time vs holiday work</strong> — major work in holidays;
                reactive/emergency work in term time with restricted access.
              </li>
              <li>
                <strong>Sign-in / visitor pass</strong> — most schools use a visitor pass
                lanyard, sometimes with photo. You wear it at all times.
              </li>
              <li>
                <strong>Fire alarm coordination</strong> — schools have multi-zone alarms; any
                work near a detector head or in a roof void requires coordination with the
                facilities team.
              </li>
              <li>
                <strong>School calendar awareness</strong> — exam periods (deep-quiet zones),
                parents&apos; evenings, school events all affect when work can be noisy or
                disruptive.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating a hospital site like a commercial fit-out"
            whatHappens={
              <>
                Apprentice is sent to a hospital outpatient department to swap a faulty distribution
                board. Treats it like a commercial job — turns up, finds the supply, isolates at
                the local DB, gets to work. What he doesn&apos;t know is that the DB feeds two
                clinic rooms with mid-procedure equipment, and the clinic staff have no advance
                warning that the supply is going down. Procedures are interrupted, equipment has
                to be reset, the trust raises a serious incident report, the firm loses the
                contract.
              </>
            }
            doInstead={
              <>
                On any hospital site the rule is &quot;authorise before you isolate&quot;. The
                Authorised Person is the only person who signs off the switching. The clinical
                team is briefed in advance and confirms when the outage is acceptable. A permit
                is raised, accepted by you, and the work proceeds within the permit window.
                Yes, this takes longer than a domestic isolation. The longer prep is what
                separates hospital work from any other commercial environment.
              </>
            }
          />

          <CommonMistake
            title="Skipping the CDM induction because 'I'm only there for 30 minutes'"
            whatHappens={
              <>
                Apprentice arrives at a fit-out site to drop off a roll of cable for the next
                day. Sign-in is busy, induction is half an hour, and the apprentice decides he
                can drop the cable off and leave without going through the induction. While
                he&apos;s on site he uses the toilet, walks across an unprotected slab edge,
                and is stopped by the principal contractor&apos;s safety officer. Apprentice is
                sent off site, the firm gets a non-conformance notice, and the principal
                contractor logs a near-miss against the firm&apos;s safety record.
              </>
            }
            doInstead={
              <>
                On a CDM site, no induction = no work. Even a five-minute drop-off counts as
                being on site, and the induction is the formal mechanism for being inside the
                site H&amp;S system. If you genuinely don&apos;t have time, leave the cable in
                the office reception and arrange for a site-inducted operative to collect it.
                The induction is the cost of admission, not optional.
              </>
            }
          />

          <Scenario
            title="Same circuit, three different sites"
            situation={
              <>
                You&apos;re asked to install a 32A radial circuit for a new piece of equipment.
                Day 1 — domestic kitchen, customer at home. Day 2 — open-plan office, occupied
                during the day, work has to happen out-of-hours. Day 3 — outpatient clinic at the
                local hospital, clinic operates 9am-5pm Monday-Friday. The technical install is
                identical &mdash; what changes?
              </>
            }
            whatToDo={
              <>
                <strong>Day 1 (domestic)</strong> — walk-round on arrival, brief the customer on
                which areas will be affected, dust sheet the route, agree working hours, watch
                for children/pets, end-of-day tidy. Single homeowner, single point of contact,
                informal documentation. <strong>Day 2 (commercial out-of-hours)</strong> —
                arrive at agreed time (typically 6pm-7am), sign in with security, set up
                temporary lighting and welfare, work through the night, fire-alarm coordination
                if working near detectors, formal hand-back at end of shift listing what&apos;s
                done and what&apos;s left isolated, area cleaned and ready for trading by 7am.
                <strong>Day 3 (hospital outpatient)</strong> — coordinate weeks in advance with
                clinical estates and the clinic manager, agree an outage window (typically
                Saturday morning when the clinic is closed), Authorised Person raises a permit-
                to-work, you accept the permit, isolate within the permitted scope only, work
                within the time window, hand back to the AP at the end with formal sign-off.
                Three identical circuits, three completely different prep workflows.
              </>
            }
            whyItMatters={
              <>
                The technical install transfers; the workflow doesn&apos;t. Recognising the
                difference and adapting your prep accordingly is what makes you employable across
                site types. Apprentices who don&apos;t adapt &mdash; who try to apply
                domestic prep to a commercial site or commercial prep to a hospital &mdash; cause
                disruption, lose the firm&apos;s contracts and damage their own progression.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Same wiring system, completely different prep workflow. The technical install transfers between site types; the choreography around it doesn't.",
              "Domestic prep is half wiring and half customer relationship. Floor protection, agreed hours, awareness of children/pets/elderly relatives — all part of HASAWA s.3 duty.",
              "Commercial premises typically demand out-of-hours work, sign-in/sign-out, formal hand-back at end of shift. Retail, office and hospitality each have their own rhythm.",
              "Industrial sites add production stop-times, formal lockout-tagout (LOTO) systems, ATEX zones in process plants, permit-to-work for any significant isolation. PUWER Reg 19 is the statutory hook.",
              "Construction sites run on CDM 2015 from end to end. Reg 13 induction is mandatory before any work; Reg 15 makes co-operation a personal duty on the worker.",
              "Healthcare runs on HTM 06-01 plus BS 7671. No unauthorised switching, ever. Estates/facilities team coordinates outages, Authorised Person signs the permit, clinical staff are briefed in advance.",
              "Education premises restrict work by safeguarding (DBS checks, no lone-contact rules) and the school calendar (most major work in holidays only).",
              "The prep workflow you apply has to match the site type. Apprentices who don't adapt cause disruption and damage their progression — recognising the differences is part of the qualification.",
            ]}
          />

          <Quiz title="Site-type preparation — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section2/2-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.3 Access equipment
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section2/2-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.5 RAMS, toolbox talks, permits
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
