/**
 * Module 4 · Section 3 · Sub 6 — Maintain safe working practices
 * City & Guilds 2365-02 → Unit 204 → LO3 → AC 3.6
 *   AC 3.6 — "Maintain safe working practices"
 *
 * Workplace discipline. Tidy as you go, lockout-tagout on upstream devices,
 * comms with other trades, customer briefings, working hours, welfare,
 * mental load, end-of-shift sign-off. JIB SI content lives in Sub 7.
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
  'Maintain safe working practices (3.6) | Level 2 Module 4.3.6 | Elec-Mate';
const DESCRIPTION =
  'Workplace discipline that runs the full length of the install — tidy as you go, lockout-tagout on upstream devices, communication with other trades and customers, welfare, fatigue management, end-of-shift sign-off. (JIB safe isolation procedure is in Sub 7.)';

const checks = [
  {
    id: 'tidy-as-you-go',
    question:
      'You finish first-fix on a kitchen ring. Cable offcuts, a discarded back-box knockout, used Stanley blades and a coffee cup are scattered across the kitchen floor. The plasterer arrives in 30 minutes. What is the right action?',
    options: [
      'Leave it — the plasterer can sweep round it.',
      'Bin everything before leaving the room — cable offcuts in a separate bag for waste recovery, sharps in a sharps tube, food waste in a separate bag.',
      'Push it into a corner.',
      'Tell the plasterer where to find a brush.',
    ],
    correctIndex: 1,
    explanation:
      'Tidy as you go, never leave a mess for the next trade. Cable offcuts go in a recycling bag (copper recovery is worth real money). Sharps (used blades, broken plate edges, disposed pin terminals) into a sharps tube — never in a normal waste bag where the next person can cut themselves. Food waste separate. Site standards on commercial jobs require this; domestic standards should match.',
  },
  {
    id: 'lockout-on-upstream',
    question:
      'You are working on a downstream FCU after isolating it at the upstream MCB. Before starting work you should:',
    options: [
      'Just turn the FCU off — it is downstream of the isolated MCB anyway.',
      'Apply a lock-off device to the upstream MCB and a warning notice, then prove dead at the FCU before starting work — never trust someone else not to switch the MCB back on.',
      'Cover the MCB with tape.',
      'Stand near the MCB so nobody touches it.',
    ],
    correctIndex: 1,
    explanation:
      'Always lock off the upstream device with a physical lockout device (padlock + clip + warning notice). Even if you are the only person on site, your own attention can lapse, the customer might want to "just check the lights" elsewhere, or another trade might not realise the implications. Lockout-tagout is mandatory under EAWR Reg 13 — work on or near live conductors is prohibited unless impractical and strict conditions are met. The full safe isolation 9-step procedure is covered in Sub 7.',
  },
  {
    id: 'fatigue-discipline',
    question:
      'You have been on site since 7 am and it is now 17:30. You are halfway through terminating a 6-way three-phase MCCB enclosure with 25 mm² SWA cores. You are tired and the job is more involved than expected. The right call is:',
    options: [
      'Push through to finish — the customer wants the install live tonight.',
      'Stop, secure the site (lockout-tagout in place, enclosure covered, warning notices), come back fresh in the morning. Never terminate live-supply equipment when fatigued.',
      'Have an energy drink and continue.',
      'Speed up to finish faster.',
    ],
    correctIndex: 1,
    explanation:
      'Fatigue causes the majority of late-shift mistakes that lead to electrical accidents. Stopping work, properly securing the site, and returning fresh is always the right call — particularly on equipment that will go live the next day. Never let customer pressure or your own pride override fatigue. Mgmt H&S Regs Reg 14 (employee duties) and the underlying HASAWA s.7 expect competent persons to recognise their own limits and act on them.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'HASAWA section 7 places duties on every employee including:',
    options: [
      'Wearing PPE only.',
      'Taking reasonable care for their own health and safety, the safety of others affected by their acts or omissions, and co-operating with the employer on safety matters.',
      'Reporting accidents.',
      'Attending training.',
    ],
    correctAnswer: 1,
    explanation:
      'HASAWA 1974 section 7 — verbatim. Employees must take reasonable care for themselves AND others, AND co-operate with the employer&rsquo;s safety arrangements. The "others affected" clause is critical for site work — your actions affect every other trade, the customer, and members of the public. A trip hazard in a corridor affects the cleaner; an unsecured cable run affects the next trade.',
  },
  {
    id: 2,
    question:
      'CDM 2015 (Construction Design and Management) Regulations apply to:',
    options: [
      'Only large commercial sites.',
      'All construction projects in Great Britain, including small domestic projects (with simplified requirements for purely domestic clients).',
      'Only sites with more than 30 days of work.',
      'Only HSE-notified sites.',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 applies to ALL construction projects, including small domestic work. The duties scale with the project — a single-day kitchen rewire has lighter duties than a £10m commercial fit-out, but every project has principal designer / principal contractor / contractor / worker duties under the regulations. RAMS, welfare, induction, PPE — all CDM-driven.',
  },
  {
    id: 3,
    question:
      'A "permit to work" system is typically required for:',
    options: [
      'Every electrical task.',
      'Higher-risk activities (live working, hot works, work in confined spaces, work near other live services) on commercial and industrial sites — issued by the responsible person with named conditions and time limits.',
      'Only annual maintenance.',
      'Domestic socket replacements.',
    ],
    correctAnswer: 1,
    explanation:
      'Permits to work are formal documents issued by the duty-holder for higher-risk tasks — hot works (welding, brazing, soldering), confined spaces, work at height in unusual conditions, work near other live services. They name the worker, the task, the time window, the precautions and the sign-off. Standard domestic install work does not need a permit; commercial / industrial / live-working tasks usually do.',
  },
  {
    id: 4,
    question:
      'Hot works on a construction site (welding, soldering, brazing) require:',
    options: [
      'Just a fire extinguisher nearby.',
      'A hot works permit, fire watch (typically 60 minutes after work ends), removal of combustibles within 10 m radius, and post-work inspection.',
      'Only PPE.',
      'No special precautions during normal working hours.',
    ],
    correctAnswer: 1,
    explanation:
      'Hot works are a leading cause of construction-site fires. Standard procedure (per RC9 / FPA guidance) is a permit, fire watch for 60 minutes after work ceases (smouldering ignition delays of 30-60 min are common), combustibles cleared 10 m radius, fire extinguisher to hand, post-work inspection. Many insurers exclude fire claims if the hot works procedure was not followed.',
  },
  {
    id: 5,
    question:
      'Welfare facilities on a CDM-regulated construction site must include:',
    options: [
      'A toilet only.',
      'Toilets, washing facilities (hot and cold water), drinking water, somewhere to eat that is not the work area, and somewhere to dry / store clothing — proportionate to the size and duration of the project.',
      'Only at large sites.',
      'A canteen and TV.',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 Schedule 2 — welfare facilities: WC, washing facilities (hot and cold water + soap), drinking water, eating area separate from the work area, clothing storage / drying. Scale to the project — a one-day install in an occupied house can usually use the customer&rsquo;s facilities; a multi-week site needs a welfare unit. Failing to provide is a CDM enforcement matter.',
  },
  {
    id: 6,
    question:
      'You arrive on a domestic rewire to find the customer has decided to remove their elderly relative&rsquo;s mobility scooter from the corridor "for the day". The corridor is now blocked by your tools and is the customer&rsquo;s only escape route. The right action is:',
    options: [
      'Carry on — the customer authorised the obstruction.',
      'Stop and clear an escape route immediately. Brief the customer that the escape route must remain clear at all times. If the customer refuses, you stop work and document it.',
      'Move the scooter back yourself.',
      'Use the back garden as the escape route.',
    ],
    correctAnswer: 1,
    explanation:
      'Escape routes must remain clear AT ALL TIMES — RRO (Regulatory Reform (Fire Safety) Order) 2005 places a duty on the responsible person, and as the contractor in occupation you become the duty-holder for the time you are there. Clear the route, brief the customer, and document. If the customer insists on the obstruction, stop work and walk off — never compromise on escape route obstruction.',
  },
  {
    id: 7,
    question:
      'A communication breakdown between you and the plasterer means the plasterer skims a wall before you have second-fixed the lighting circuit. The right response is:',
    options: [
      'Cut into the fresh plaster and second-fix anyway.',
      'Stop. Call the supervisor / contractor coordinator. Agree a remedial sequence — usually: wait for plaster to dry, cut neat access channels, install, and bring the plasterer back for a small make-good. Document the additional work.',
      'Walk off and refuse to return.',
      'Pull the plasterer&rsquo;s work off the wall.',
    ],
    correctAnswer: 1,
    explanation:
      'Coordination failures happen — the response is to escalate, agree a sequence, and document. Cutting into fresh plaster damages it permanently. Walking off escalates further. Calmly running the issue through the proper channels (supervisor, contracts manager, customer) is the only sustainable response. The remedial cost falls on whichever party caused the breakdown — usually established by the meeting minutes / WhatsApp logs.',
  },
  {
    id: 8,
    question:
      'End-of-shift sign-off on a multi-day commercial install typically includes:',
    options: [
      'Just turning the lights off.',
      'Securing all isolations (locks remain in place if any work is incomplete), making all enclosures safe (covers on, doors closed), tidying tools, sweeping the work area, signing the day&rsquo;s permit / RAMS as complete, briefing the next shift / next day.',
      'Locking the front door.',
      'Notifying the customer by text.',
    ],
    correctAnswer: 1,
    explanation:
      'End-of-shift discipline on commercial sites — every isolation either reverted (work complete and tested) or maintained with locks and notices in place (work incomplete), every enclosure secured (live conductors not exposed), every tool put away (no trip hazards, no theft target), area swept, paperwork signed, handover briefing. Same standard scaled to a domestic job — leave the site safer than you found it.',
  },
];

const faqs = [
  {
    question: 'What is "tidy as you go" really mean in practice?',
    answer:
      'It means cleaning up your work area continuously throughout the day, not just at the end. After every termination, the offcut goes in the bag. After every drilling, the dust gets vacuumed up. After every break, the rubbish goes to the bin. The point is twofold — first, your work area never accumulates a hazardous mess; second, you can find your tools because they are not buried in offcuts. Productive electricians work cleaner than messy ones, not the other way around.',
  },
  {
    question: 'Do I really need a lockout device for a domestic job?',
    answer:
      'Yes — a basic MCB lock-off (the snap-on red plastic clip + small padlock combo) costs £15 and is now considered minimum kit. EAWR Reg 13 expects you to take precautions to prevent inadvertent re-energisation; a lockout device is the practical mechanism. Many domestic boards are now in cupboards or hallways where the customer or their kids can reach them — a clear lockout is what stops the supply being switched back on while you are working downstream. Sub 7 covers the full JIB safe isolation procedure including lockout.',
  },
  {
    question: 'How do I handle a customer who keeps getting in the way?',
    answer:
      'Respectful but firm. "I need to keep this area clear for safety while I am working — could you stay in the kitchen / lounge until I am done in this room?" Most customers understand once asked. For persistent cases, brief the customer at the start of the day on which rooms are work areas and which are exclusion zones, point out hazards (tools, exposed cables, hot test gear), and stick to the boundary. If the customer refuses to stay clear, stop work and discuss with your supervisor — never let a customer or family member into an active work zone with live testing or open enclosures.',
  },
  {
    question: 'What working hours apply on a domestic job?',
    answer:
      'Local authority noise restrictions typically allow construction noise 08:00-18:00 weekdays, 08:00-13:00 Saturdays, no work Sundays / bank holidays — varies by local authority and is stricter for residential areas. Customer expectations also matter — most domestic customers want work finished within agreed hours and do not want pre-7 am starts. For occupied buildings (HMOs, flats) the impact on neighbours dictates earlier finish. Always confirm working hours in writing as part of the quote.',
  },
  {
    question: 'What welfare facilities should I expect on a small domestic job?',
    answer:
      'For a single-day domestic install, the customer&rsquo;s facilities (WC, kitchen tap, somewhere to sit for break) are usually acceptable — confirm with the customer in advance. For a multi-week refurb where the customer is in occupation, agree facilities at the quote stage. For an unoccupied refurb (vacant property), bring your own — porta-loo hire, jerry can of water, kettle and break area in the van. CDM 2015 requires welfare proportionate to the project; a single-operative single-day domestic does not need a welfare unit but still needs reasonable access to basics.',
  },
  {
    question: 'When should I refuse to start or continue work on safety grounds?',
    answer:
      'When the conditions create an unacceptable risk — escape route blocked, asbestos disturbed, a structural defect exposed, the upstream isolation cannot be guaranteed safe, fatigue is compromising judgement, the job has expanded beyond the RAMS scope. You stop, document the reason, escalate to your supervisor, and only restart when the risk is mitigated. HASAWA s.7 (employee duty), EAWR Reg 4 (suitable systems of work), Mgmt H&S Regs Reg 7 (assistance) all support stopping work when a competent person judges the risk too high. Never push through unsafe conditions because of customer or programme pressure — that is the path to the accident report.',
  },
];

export default function Sub6() {
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
            eyebrow="Module 4 · Section 3 · Subsection 6"
            title="Maintain safe working practices"
            description="Workplace discipline that runs the full length of the install — tidy as you go, lockout on upstream devices, communication with other trades and customers, working hours, welfare, fatigue management, end-of-shift sign-off. The habits that turn a competent install into a safe one. (The JIB safe isolation procedure has its own dedicated Sub 7.)"
            tone="emerald"
          />

          <TLDR
            points={[
              'Safe working is procedural — tidy as you go, lockout upstream devices before working downstream, communicate every move to other trades and the customer.',
              'CDM 2015 applies to ALL construction projects including small domestic — RAMS, welfare, escape routes, hot works, working hours all scale to project size.',
              'Fatigue causes the majority of late-shift accidents. Stop work, secure the site, come back fresh — never push through tiredness on live equipment.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Maintain safe working practices — verbatim AC 3.6 from City & Guilds 2365-02 Unit 204.',
              'Apply tidy-as-you-go discipline throughout the install — offcuts, sharps, food waste, dust segregated and removed continuously, not at end of shift only.',
              'Apply lockout-tagout on upstream devices when working on downstream circuits, using a physical lockout device, padlock and warning notice.',
              'Maintain communication with other trades, the principal contractor, the customer and the household occupants — briefings, handovers, escape route management.',
              'Manage working hours, welfare and fatigue under HASAWA s.7 (employee duties) and Mgmt H&S Regs Reg 14 — recognise own limits and stop work when judgement is compromised.',
              'Secure the work area at end of shift — isolations maintained or reverted, enclosures closed, tools stowed, area swept, paperwork signed.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Tidy as you go — discipline, not optional</ContentEyebrow>

          <ConceptBlock
            title="Continuous housekeeping vs end-of-shift cleanup"
            plainEnglish="Tidy as you go means cleaning up continuously through the day, not at the end. After every termination, the offcut goes in the bag. After every drilling, the dust gets vacuumed. After every break, the rubbish goes to the bin. Two effects — first, the work area never accumulates a hazardous mess; second, you can find your tools because they are not buried under offcuts."
            onSite="The fastest electricians on a job are usually the tidiest. Untidy work creates lost-tool time (looking for the wire stripper that was definitely on the box five minutes ago), trip-hazard time (stepping over offcuts), and morale damage (other trades complain). Tidy work compounds — every minute spent putting a tool back saves three minutes finding it later."
          >
            <p>
              Tidy-as-you-go in practice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable offcuts</strong> in a separate bag — copper recovery is worth
                real money to your employer (a wholesaler will buy clean copper offcuts;
                some electricians fund their own training from offcut sales).
              </li>
              <li>
                <strong>Sharps</strong> (used Stanley blades, broken plate edges, snipped
                pin terminals) into a sharps tube. Never into a normal waste bag where
                the next person can cut themselves. NHS / construction first-aid data show
                sharps cuts as a leading injury type.
              </li>
              <li>
                <strong>Dust</strong> vacuumed at the source (M-class HEPA vac for any
                work disturbing potential silica or asbestos-containing materials). HSE
                expects on-tool dust extraction for chasing, drilling, sanding.
              </li>
              <li>
                <strong>Plastic packaging</strong> in a recycling bag. Cardboard flat-packed
                separate. Clean cardboard is recyclable; mixed waste is not.
              </li>
              <li>
                <strong>Food and drink waste</strong> in a separate bag, removed at every
                break. Attracts pests, creates smells, and looks unprofessional.
              </li>
              <li>
                <strong>Tools</strong> back in roll / case after each use. Loose tools on
                a horizontal surface get knocked off, get lost, get stolen.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Lockout-tagout — working downstream</ContentEyebrow>

          <ConceptBlock
            title="Lock off the upstream device before working on the downstream circuit"
            plainEnglish="Before working on a circuit you isolate it at the upstream device (MCB, RCBO, isolator, switch fuse). The device is then physically locked off with a lockout device + padlock + warning notice — physical, not just turned off. Even if you are alone on site, your own attention can lapse, the customer might want to 'just check the lights' elsewhere, or another trade might not realise the implications. The lockout is what stops the supply being switched back on."
            onSite="The full JIB 9-step safe isolation procedure is in Sub 7 — this Sub covers the why and the discipline. The kit you carry: MCB lockout devices (snap-on plastic clips for various device profiles), padlocks (small, ideally each technician has their own colour-coded ones), warning notices ('Caution: do not switch — work in progress'), and a permit log to record what was isolated when by whom."
          >
            <p>
              Why lock instead of just turning off:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Forgetfulness</strong> — your own. You do not realise you have left
                the device off; an hour later you go back and switch it on without
                thinking, before the work is complete.
              </li>
              <li>
                <strong>Customer interference</strong> — "I just wanted to put the kettle on
                while you were upstairs". Customers do not understand the implications and
                will switch breakers back on without asking.
              </li>
              <li>
                <strong>Other trades</strong> — the plasterer or the painter sees an MCB in
                the off position, assumes someone tripped it earlier, switches it back on
                "to help".
              </li>
              <li>
                <strong>Family members</strong> — children, partners, anyone in the
                household. They do not see the hazard.
              </li>
              <li>
                <strong>Site personnel on commercial</strong> — facilities staff, security
                staff, other contractors all touch the panels.
              </li>
            </ul>
            <p>
              EAWR Reg 13 places a positive duty on the worker to ensure that conductors
              and equipment are not made live during work. A lockout is the tangible
              mechanism that satisfies that duty.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 — Regulation 13 (Precautions for work on equipment made dead)"
            clause="(Paraphrased.) Adequate precautions shall be taken to prevent electrical equipment, which has been made dead in order to prevent danger while work is carried out on or near that equipment, from becoming electrically charged during that work if danger may thereby arise."
            meaning={
              <>
                EAWR Reg 13 is the regulation that requires lockout. It is not enough to
                turn the device off; you must take "adequate precautions" to prevent it
                being made live again during the work. A physical lockout device + padlock +
                warning notice is the practical interpretation. A device left in the off
                position with no physical lockout is a Reg 13 fail because nothing prevents
                someone else switching it on. The lockout is small kit (£15-30) and the
                discipline is daily.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989, Regulation 13 (paraphrased — see legislation.gov.uk for full text)."
          />

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Communication — other trades, customers, household</ContentEyebrow>

          <ConceptBlock
            title="Brief, brief, brief — three-way communication on every install"
            plainEnglish="On every install you have three communication channels open at once. Other trades on site (plasterer, plumber, joiner, painter) — they need to know what you are doing and when, you need to know what they are doing and when. The customer / principal contractor — they need updates on progress, problems, variations. The household / occupants — they need to know which rooms are exclusion zones and which are safe."
            onSite="The trade that communicates well is the trade that gets re-hired. The trade that turns up, ignores everyone, and leaves a mess is the one that is not on the next phase. Communication takes 5 % of your time and earns 50 % of your repeat work."
          >
            <p>
              The communication patterns:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Daily morning briefing with other trades</strong> — what each trade
                is doing today, where the conflicts will be, who needs the same room when.
                Often a 5-minute conversation over coffee, but worth half a day of avoided
                conflict.
              </li>
              <li>
                <strong>Real-time conflict resolution</strong> — when a clash develops
                (plasterer needs the wall first-fixed; you need the wall plastered before
                second-fix), agree a sequence on the spot, document in WhatsApp.
              </li>
              <li>
                <strong>Customer end-of-day update</strong> — what got done today, what is
                planned for tomorrow, any issues, any variations needed. A 3-minute
                conversation that prevents a 30-minute complaint email.
              </li>
              <li>
                <strong>Household occupant brief</strong> — at the start of each day, which
                rooms are work zones, which are safe, what hazards exist, when the
                supply will be off / on. Particularly important for households with
                children, elderly residents, or anyone with mobility constraints.
              </li>
              <li>
                <strong>Variation logging</strong> — every change to scope (customer adds
                a circuit, you find an unforeseen condition) goes in a written log,
                signed off by the customer, before the work is done.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Escape routes — keep them clear, every minute, no exceptions"
            plainEnglish="Every building has escape routes — corridors, stair cores, exit doors. Under the Regulatory Reform (Fire Safety) Order 2005, the responsible person must keep escape routes clear at all times. As the contractor in occupation you become a duty holder. A toolbox in the corridor, a cable run across a doorway, a temporary ladder blocking an escape route — all RRO breaches AND all genuine fire-safety risks."
          >
            <p>
              On a domestic job, the escape routes are usually the front door + main hallway
              + stairs. On a commercial fit-out, they are the corridors, stairwells and exit
              doors marked on the building&rsquo;s fire safety plan. Keep them clear:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Tools and materials staged in the work room, not in the corridor.</li>
              <li>Cable runs across doorways — temporary cable protectors / cable ramps.</li>
              <li>Ladders / steps / hop-ups out of the corridor when not in use.</li>
              <li>Skip / waste bag inside the work room or outside the property, never blocking the route.</li>
              <li>If a customer or other party blocks the route (mobility scooter, furniture moved into the corridor), you stop, brief them, restore the clearance — every time.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Working hours, welfare, fatigue</ContentEyebrow>

          <ConceptBlock
            title="Working hours respect the building and the people in it"
            plainEnglish="Construction noise hours are typically 08:00-18:00 weekdays, 08:00-13:00 Saturdays, no work on Sundays or bank holidays. Local authority by-laws vary; check before quoting. For occupied buildings (HMOs, flats, customer in residence) impact on neighbours dictates earlier finish or pre-warned working windows."
          >
            <p>
              Practical rules:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Confirm working hours with the customer in writing as part of the quote.</li>
              <li>Notify neighbours of any unusual noise (chasing, breaking out concrete) at least 24 hours in advance — letter through the door is standard.</li>
              <li>For occupied buildings, plan noisy work for short windows in the middle of the day; quieter work (terminations, testing) in the morning and evening.</li>
              <li>Respect customer routines — children napping, elderly residents resting, shift workers sleeping.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Welfare facilities — proportionate to the project"
            plainEnglish="CDM 2015 Schedule 2 requires welfare facilities on every construction project. Scale to size — a one-day domestic install can use the customer&rsquo;s facilities (with permission); a multi-week refurb where the customer is in residence needs a clear arrangement; an unoccupied refurb needs you to bring welfare with you (porta-loo hire, water, kettle, break area)."
          >
            <p>
              The CDM Schedule 2 list:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>WC — adequate for the number of workers, separated by sex where practicable.</li>
              <li>Washing facilities — running water (hot AND cold), soap, means of drying.</li>
              <li>Drinking water — clearly marked, fresh.</li>
              <li>Eating area — separated from the work area, clean, somewhere to sit.</li>
              <li>Clothing — somewhere to store and dry work clothes.</li>
            </ul>
            <p>
              For a single-day single-operative domestic install you do not need a welfare
              unit, but you do need reasonable access to the customer&rsquo;s facilities (or
              your own kit if the customer is not in residence). For a multi-week site
              the principal contractor provides; for a smaller project the contractor in
              charge does.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Fatigue — recognise your limits, stop when judgement slips"
            plainEnglish="Fatigue is the silent cause of most late-shift mistakes that lead to electrical accidents. The 16-hour day, the rushed last termination, the 'just one more circuit' — that is when conductors get nicked, terminations get over-torqued, and isolations get missed. The discipline is to recognise your own state and stop when you are no longer at full attention."
            onSite="The brain&rsquo;s decision-making capacity drops sharply after 8-10 hours of focused technical work. By hour 12 you are making errors you would never make at hour 4. Stop, lock the site down, come back tomorrow — your future self will thank you."
          >
            <p>
              Practical fatigue management:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Plan to a realistic day length (8-10 hours of productive work, plus travel).</li>
              <li>Take regular breaks — short break every 90 minutes, longer break at lunch.</li>
              <li>Eat properly — sandwich and water, not just energy drinks.</li>
              <li>Sleep — 7-8 hours / night minimum during the working week.</li>
              <li>Recognise the signs of fatigue — slower decision making, irritability, missing small details, eye strain.</li>
              <li>Stop work on safety-critical tasks (terminations on incoming supply, live testing, work at height) when fatigue compromises attention.</li>
              <li>Communicate with your supervisor / contracts manager about programme pressure that is causing unsustainable hours.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — Section 7 (Duties of employees)"
            clause="It shall be the duty of every employee while at work — (a) to take reasonable care for the health and safety of himself and of other persons who may be affected by his acts or omissions at work; and (b) as regards any duty or requirement imposed on his employer or any other person by or under any of the relevant statutory provisions, to co-operate with him so far as is necessary to enable that duty or requirement to be performed or complied with."
            meaning={
              <>
                HASAWA s.7 places legal duties on every employee. "Reasonable care" for
                yourself AND for others affected by your acts or omissions. This is the
                statutory basis for tidy-as-you-go (your offcuts can hurt someone else),
                for lockout (someone else could be electrocuted by your unlocked breaker),
                for fatigue management (an exhausted electrician makes mistakes that hurt
                others), and for stopping work when conditions are unsafe. The "duty of
                co-operation" with the employer means following the company RAMS, the
                client&rsquo;s site rules, and the principal contractor&rsquo;s briefings —
                which is what makes safe working procedural rather than a matter of
                personal style.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974, section 7 (verbatim — see legislation.gov.uk)."
          />

          <RegsCallout
            source="Management of Health and Safety at Work Regulations 1999 — Regulation 14 (Employee duties)"
            clause="(Paraphrased.) Every employee shall use any machinery, equipment, dangerous substance, transport equipment, means of production or safety device provided to him by his employer in accordance with both any training and the instructions which may have been provided. Every employee shall inform his employer or any other employee with specific responsibility of (a) any work situation which a person with the first-mentioned employee&rsquo;s training and instruction would reasonably consider represented a serious and immediate danger to health and safety; (b) any matter which a person with the first-mentioned employee&rsquo;s training and instruction would reasonably consider represented a shortcoming in the employer&rsquo;s protection arrangements."
            meaning={
              <>
                Mgmt H&S Regs Reg 14 expands HASAWA s.7 with two specific duties — use
                equipment per training, AND report situations of serious / immediate
                danger AND report shortcomings in protection arrangements. As an apprentice
                or junior electrician you are obliged to report — to your supervisor, your
                employer, the principal contractor — when you see a serious danger or a
                gap in safety provision. Saying nothing because "it&rsquo;s not my job" is
                a breach of Reg 14.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999, Regulation 14 (paraphrased)."
          />

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>End-of-shift sign-off</ContentEyebrow>

          <ConceptBlock
            title="Securing the site at the end of every day"
            plainEnglish="End-of-shift discipline scales with the project. Domestic single-day install — pack tools, sweep area, brief customer. Multi-day domestic — cover work-in-progress, isolate as needed, lock front door. Commercial multi-week — secure all isolations, close all enclosures, sweep the area, sign permit and RAMS, brief next shift."
          >
            <p>
              The standard end-of-shift sequence:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Isolations</strong> — either reverted (work complete and tested,
                supply restored) or maintained (lockout in place, warning notice updated,
                next-day continuation noted in the permit).
              </li>
              <li>
                <strong>Enclosures</strong> — every CU, JB, isolator, switch fuse closed
                and secured. No live conductors exposed. No partially-installed equipment
                left open overnight.
              </li>
              <li>
                <strong>Tools</strong> — collected, counted, packed in van or locked
                store. Power tools off, batteries on charge, sharps in tube.
              </li>
              <li>
                <strong>Materials</strong> — secured against weather and theft. Cable
                drums covered. Loose accessories in box. Test gear in flight case.
              </li>
              <li>
                <strong>Work area</strong> — swept, dust vacuumed, debris removed, trip
                hazards cleared. Leave the area cleaner than you found it.
              </li>
              <li>
                <strong>Documentation</strong> — permits signed, RAMS reviewed, day&rsquo;s
                progress logged, variations recorded, photos taken of completed first-fix
                / second-fix work.
              </li>
              <li>
                <strong>Communication</strong> — brief next-day team or next shift on
                progress, hazards, items needing attention.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Leaving an open consumer unit overnight to 'continue tomorrow'"
            whatHappens={
              <>
                You finish first-fix on a kitchen rewire at the end of a long day. The
                consumer unit door is open, three RCBOs are partially terminated with
                bare conductors visible. You think "I&rsquo;ll close it up and finish
                tomorrow morning". Overnight, the customer&rsquo;s curious child opens the
                cupboard, reaches into the open CU, and contacts the live supply side of
                the partially-terminated MCBs. Everything else about the install is
                competent — but the open enclosure was the one mistake.
              </>
            }
            doInstead={
              <>
                Never leave a consumer unit open overnight. End-of-shift means every
                enclosure closed, every door secured, every potentially-exposed conductor
                safe. If the work is genuinely incomplete, isolate the supply at the
                incomer, lockout-tagout the incomer, close the CU door (even loosely),
                and post a warning notice on the cupboard. Better still — finish the
                terminations, button up, test, and start fresh on the next circuit
                tomorrow. The discipline is procedural; the consequences of skipping it
                are catastrophic.
              </>
            }
          />

          <Scenario
            title="Plasterer arrives and the kitchen is a mess from your first-fix"
            situation={
              <>
                You have first-fixed a kitchen rewire — chases cut, cables pulled, back
                boxes fixed. Cable offcuts are scattered across the kitchen floor. There
                is brick dust on every surface from the chasing. A used Stanley blade is
                on the worktop. A coffee cup is on the floor. The plasterer arrives at
                14:00 to skim, expecting a clean and ready kitchen.
              </>
            }
            whatToDo={
              <>
                Stop. Apologise to the plasterer (it is on you). Vacuum the dust (you
                should have used on-tool extraction during chasing — either way, fix it
                now). Bag the offcuts (separate copper bag — the offcuts have value).
                Sharps to a sharps tube, not a normal bag. Coffee cup binned. Wipe
                worktops. Brief the plasterer on which back-boxes need to be skimmed up
                to (depth setting from Sub 3) and which areas to leave clear for second
                fix. Document the half-hour delay in your day log; if it eats into the
                programme, flag it with the supervisor. Then leave the room cleaner than
                you found it.
              </>
            }
            whyItMatters={
              <>
                Other trades remember the trades that left them a mess. The plasterer
                tells the joiner, the joiner tells the painter, and a year later you are
                not on the next phase of work because the chain of trades remembers. Tidy
                handover is the cheapest professional reputation builder available.
                Conversely, the trade that arrives to a tidy and ready area is the trade
                that recommends the previous trade to the next customer. It compounds.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Tidy as you go is procedural, not optional — offcuts in a copper bag, sharps in a tube, dust extracted at source, area cleaner than you found it.',
              'Lock off upstream devices physically (lockout device + padlock + warning notice) before working downstream. EAWR Reg 13 mandates "adequate precautions".',
              'Communicate three ways — other trades, customer / contracts manager, household occupants. Daily briefings, written variations, end-of-day updates.',
              'Escape routes clear at all times — RRO 2005 places duty on the responsible person, and as contractor in occupation you become the duty holder.',
              'Working hours respect local by-laws and household occupants — typically 08:00-18:00 weekdays, no Sunday work, neighbour notification for noisy work.',
              'CDM 2015 welfare scales with project size — proportionate WC / washing / drinking water / eating area / clothing storage.',
              'Fatigue causes late-shift accidents — recognise your limits, stop on safety-critical tasks, sleep properly. HASAWA s.7 + Mgmt H&S Reg 14 expect this.',
              'End-of-shift discipline — isolations secured / reverted, enclosures closed, tools packed, area swept, paperwork signed. Never leave a CU open overnight.',
            ]}
          />

          <Quiz title="Maintaining safe working practices — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section3/3-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.5 Terminating wiring systems
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section3/3-7')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.7 JIB safe isolation procedures
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
