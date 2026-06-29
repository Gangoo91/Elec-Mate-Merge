/**
 * Module 1 · Section 2 · Subsection 2 — Emergency procedures: running the response
 * Maps to City & Guilds 2365-03 / Unit 201 / LO2 / AC 2.2
 *   AC 2.2 — "specify appropriate procedures which should be followed when emergency
 *            situations occur in the workplace"
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 2.2 — same procedural depth at L3
 *
 * From following the fire alarm muster to leading it. Building evacuation,
 * account-for, liaison with emergency services and the evidence the inspector
 * will ask for next week.
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
  'Emergency procedures — running the response (2.2) | Level 3 Module 1.2.2 | Elec-Mate';
const DESCRIPTION =
  'L3 emergency procedures — building evacuation, fire-alarm response, account-for, emergency services liaison, and the supervisor evidence trail.';

const checks = [
  {
    id: 'l3-m1-s2-sub2-fire-alarm',
    question:
      "The fire alarm sounds during your work in a commercial unit. Your tools are in the work area, the customer is asking you 'is this real?', and your van keys are at the muster point. What do you do?",
    options: [
      "Carry on working but stay alert — most alarms are false, so wait until you can smell smoke or see flames yourself before you stop work and decide whether to leave the area.",
      "Pack up and secure your tools, then collect your van keys from the muster point on the way out, so nothing of value is lost or damaged during the evacuation.",
      "Reassure the customer it is probably a test or false alarm to keep them calm, then finish the task you are part-way through so you don't have to re-do it before you both leave together.",
      "Treat every alarm as real. Stop, leave tools, bring the customer with you, walk the planned route to the muster point and await account-for. Re-enter only on the fire-marshal's all-clear; tools can be retrieved later.",
    ],
    correctIndex: 3,
    explanation:
      "Remember from L2 — every alarm is real until proven otherwise. The L3 add: actively bringing the customer / non-employee with you discharges your s.3 duty. 'I told them to leave' isn't enough; ensuring it happens is. Re-entry is the building manager's call, not yours.",
  },
  {
    id: 'l3-m1-s2-sub2-isolation-emergency',
    question:
      "A small fire breaks out in a customer's CU during your work. You can see flames inside the consumer unit. What's the L3-grade sequence?",
    options: [
      "Throw a bucket of water over the consumer unit straight away to knock the flames down before they can spread to the surrounding fabric and the timber behind the board.",
      "Isolate at the meter/cut-out if safely accessible (not in the burning CU), evacuate, use a CO2 or dry-powder extinguisher only if trained with a small fire and the exit behind you, call 999, stay out and preserve the scene.",
      "Reach into the consumer unit and pull the burning RCBOs and tails out by hand to remove the fuel from the fire, then dampen the area down once the burning parts are clear of the board.",
      "Leave the supply switched on so the protective devices keep working, and aim a foam extinguisher directly into the consumer unit to smother the flames at their source.",
    ],
    correctIndex: 1,
    explanation:
      "Electrical fires need (a) supply isolation and (b) appropriate extinguisher (CO2 or dry powder — NEVER water on a live electrical fire). The L3 step is restraint — 'fight or flight' on a small fire is acceptable only with training, small fire, escape route. Otherwise evacuate and let the fire service deal with it. Most untrained extinguisher use makes things worse.",
  },
  {
    id: 'l3-m1-s2-sub2-services-arrival',
    question:
      "Fire service arrives at the building you've evacuated from. As the senior person from your firm on site, what's the L3 expectation when they ask 'is anyone still inside?'",
    options: [
      "Tell them everyone is out so they don't waste time searching the building — it is better to give a reassuring answer quickly than to risk delaying their entry with uncertainty.",
      "Say you're not sure and refer them entirely to the building manager, since giving the fire service any information yourself is not your place and could confuse their search.",
      "Offer to go back inside yourself for a quick sweep before the crew commit, so they have confirmed information about who is still in the building and where.",
      "Provide only what you actually know from the muster account-for: who arrived, who didn't, and the last known location of anyone missing. Don't speculate — accurate information directs rescue; a guess sends them into danger for no one.",
    ],
    correctIndex: 3,
    explanation:
      "Account-for is the supervisor act that creates the data the fire service needs. 'Who came out, who didn't, where last seen' — accurate information saves rescuers from entering speculatively and saves missing persons from being missed in the count.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's the appropriate response to a fire alarm in a building you don't know well?",
    options: [
      "Carry on working until someone in authority comes to confirm it is a genuine fire rather than a test, so you don't lose time stopping for what is probably a false alarm.",
      "Stop, leave tools, follow the planned escape route to the muster point, bring any non-employees with you, and await account-for and the all-clear from the responsible person.",
      "Find the alarm panel first and silence it so you can investigate where the signal came from and decide for yourself whether the building genuinely needs to be cleared.",
      "Gather your tools and materials together so nothing is lost or damaged, then make your way out of the building at your own pace once everything is packed away.",
    ],
    correctAnswer: 1,
    explanation:
      "L2 baseline reflex; L3 add — actively bringing non-employees with you discharges the s.3 duty.",
  },
  {
    id: 2,
    question: "What are the 5 fire-extinguisher classes and their colour codes (UK BS EN 3)?",
    options: [
      "Class A (solids) — CO2 (black); Class B (liquids) — water (red); Class C (gases) — foam (cream); Class D (metals) — water (red); Class F (cooking oils) — dry powder (blue).",
      "Class A (solids) — wet chemical (yellow); Class B (liquids) — water (red); Class C (electrical) — foam (cream); Class D (gases) — CO2 (black); Class F (metals) — dry powder (blue).",
      "Class A (solids) — water (red); Class B (flammable liquids) — foam (cream) or CO2 (black); Class C (flammable gases) — dry powder (blue); Class D (metals) — specialist dry powder; Class F (cooking oils) — wet chemical (yellow). Electrical fires have no class letter — CO2 or dry powder, never water.",
      "Class A (solids) — foam (cream); Class B (liquids) — dry powder (blue); Class C (electrical) — water (red); Class D (cooking oils) — CO2 (black); Class F (metals) — wet chemical (yellow).",
    ],
    correctAnswer: 2,
    explanation:
      "BS EN 3 standardises extinguisher colour codes — the body is red, the label colour identifies the type. For electrical fires CO2 or dry powder; never water (which conducts) or foam (most foam is water-based).",
  },
  {
    id: 3,
    question: "What's the responsible person's duty during a fire-alarm evacuation?",
    options: [
      "Stay at their desk to keep the business running and protect equipment and records, since most alarms are false and a full evacuation each time would be hugely disruptive to the organisation.",
      "Wait for the fire service to arrive and take charge of the situation before anyone is asked to leave, because the decision to evacuate a whole building rests with the attending crew.",
      "Personally search every room for the source of the fire to confirm it is genuine before deciding whether an evacuation of the building is actually necessary.",
      "Lead or coordinate the evacuation per the building's fire strategy, ensure everyone exits by planned routes, account for personnel at the muster, liaise with the fire service and prevent re-entry until the all-clear (RRFSO 2005).",
    ],
    correctAnswer: 3,
    explanation:
      "RRFSO 2005 places the lead duty on the 'responsible person' — usually the building owner / managing agent / employer. As an L3 visiting electrician you cooperate with their procedure, not lead it (unless you're the senior person on a small site without a designated responsible person).",
  },
  {
    id: 4,
    question: "When can you safely use an extinguisher on a small fire?",
    options: [
      "Only when you're trained, the fire is small (waste-bin sized), you have the correct extinguisher class, the exit is behind you, you're not at risk, and 999 is being called. Otherwise evacuate.",
      "Whenever an extinguisher is within reach, because tackling any fire in its first minute is always safer than waiting for the fire service to arrive and deal with it.",
      "Only after the building has been fully evacuated and the attending fire service has given you explicit permission to re-enter and help them tackle the remaining fire.",
      "As long as you grab the nearest extinguisher and act quickly, since the class of extinguisher does not matter much for a small fire that has been caught early.",
    ],
    correctAnswer: 0,
    explanation:
      "Untrained extinguisher use commonly makes things worse — wrong class, splash spread of flammable liquid, smoke pushed into the operator's face. The L3 default is evacuate; fight only when conditions permit.",
  },
  {
    id: 5,
    question: "What's a 'PEEP' (Personal Emergency Evacuation Plan)?",
    options: [
      "A pre-task safety briefing given to every operative before they start a high-risk activity such as work at height or entry into a confined space, covering the hazards and controls.",
      "A bespoke evacuation plan for a person who cannot use the standard route unaided. Required under the Equality Act 2010 and RRFSO 2005; covers refuge points, designated buddies, communication aids and re-entry.",
      "A personal record an apprentice keeps of the site-specific emergency procedures they have been inducted into, signed off by the supervisor at each new site they work on.",
      "A plan showing the location of every extinguisher, fire-alarm call point and emergency exit throughout a commercial building, used to brief new staff during their induction.",
    ],
    correctAnswer: 1,
    explanation:
      "PEEPs are required where a person needs assistance to evacuate. On a commercial site you may meet them — vulnerable customers, contractors, visitors. Knowing the term and the responsible-person duty to provide them is L3-essential.",
  },
  {
    id: 6,
    question: "What does the Regulatory Reform (Fire Safety) Order 2005 require?",
    options: [
      "It requires every electrical installation to be inspected and tested to BS 7671 at least once every five years in all workplaces and rented premises, enforced by the local authority.",
      "It places a duty on every worker to report fire hazards they notice to the principal contractor, sitting alongside the worker co-operation duties set out in CDM 2015.",
      "It requires the 'responsible person' to carry out a fire risk assessment and provide and maintain means of escape, detection, alarm and fire-fighting equipment plus information and training. Enforced by the Fire and Rescue Service.",
      "It sets the design and installation standards for emergency lighting and fire-alarm systems in non-domestic buildings, consolidating and replacing BS 5266 and BS 5839.",
    ],
    correctAnswer: 2,
    explanation:
      "RRFSO is the fire-safety equivalent of HASAWA in scope. Building Safety Act 2022 amended specific elements; RRFSO remains the central duty hub. Fire and Rescue Services enforce; prosecutions for failures are increasing.",
  },
  {
    id: 7,
    question: "What's the L3 supervisor's role during a building evacuation?",
    options: [
      "Take charge of the whole building's evacuation, overriding the building's responsible person where necessary and directing all occupants — staff, visitors and other trades — to the nearest exits.",
      "Return to the work area to isolate and make the electrical installation safe first, then join the rest of the team at the muster point once the equipment has been left in a safe state.",
      "Wait by the van for the fire service to arrive and leave the muster-point account entirely to the building's own staff, since they know the occupants and the building far better than you do.",
      "Account for your firm's personnel, ensure customers/visitors in your care have evacuated, liaise with the responsible person and fire-marshal, give the fire service accurate information if asked, and prevent re-entry.",
    ],
    correctAnswer: 3,
    explanation:
      "Account-for is the single most-impactful supervisor act in an evacuation. The fire service uses your data to decide whether rescue entry is needed.",
  },
  {
    id: 8,
    question: "After an emergency event, what evidence should the L3 supervisor preserve?",
    options: [
      "Photos of the scene as evacuated, witness identities and contacts, a written first-hand account, equipment positions, any nearby CCTV, building-manager contacts, and any fault that may have contributed.",
      "Nothing beyond getting the team back to productive work — once the fire service has given the all-clear the event is closed and preserving evidence is the building owner's job, not the firm's.",
      "Only the customer's signature confirming the work is complete and that they are happy for the firm to leave site, since that signed sign-off is the single document the firm needs to close the job after an event.",
      "Just a verbal report to the office at the end of the day is enough; written records and photographs are only worth taking for fatal incidents or where the HSE has already announced it will investigate.",
    ],
    correctAnswer: 0,
    explanation:
      "Same evidence-preservation discipline as accident response (Sub 1). The supervisor's job after the immediate response is to preserve what the regulator and the firm's defence will need.",
  },
];

const faqs = [
  {
    question: "Do I have to evacuate if I'm 'just finishing one thing'?",
    answer:
      "Yes. Every alarm = evacuate. The 'just one thing' delay is how people get trapped. Your s.7 duty applies to yourself; your s.3 duty applies to anyone you should be evacuating with you (customers, visitors). 'Just finishing' is the most-prosecuted reason for delayed evacuation.",
  },
  {
    question: "What if I don't know the building's escape route?",
    answer:
      "Identify it during the dynamic risk assessment on arrival — that's part of why the walk-round exists. Look for fire-action notices (legally required at suitable locations under RRFSO 2005), exit signage, the muster point. If none are visible, ask the building's responsible person before you start work.",
  },
  {
    question: "Can I re-enter the building once the alarm has stopped?",
    answer:
      "Only when the responsible person (building manager / fire marshal) gives the explicit all-clear. Alarms can be silenced for investigation while the building is still unsafe. Premature re-entry has been a contributing factor in serious fire injuries.",
  },
  {
    question: "Should I attempt CPR / first aid during an evacuation?",
    answer:
      "If a casualty cannot be moved and you're trained, render assistance until emergency services arrive — but do not put yourself or others at additional fire risk. Better to move the casualty to a safer location if possible. Communicate with the responsible person and the fire service.",
  },
  {
    question: "What's the difference between Stage 1, Stage 2 and full evacuation?",
    answer:
      "Some buildings (notably hospitals, large complexes) use phased evacuation. Stage 1 = nearest occupants to the alarm leave; Stage 2 = adjacent floors leave; full = everyone leaves. The building's strategy will be in its fire safety plan. As a visitor you follow the building's strategy and the responsible person's directions.",
  },
  {
    question: "What if the customer wants to keep working through the alarm?",
    answer:
      "You evacuate regardless; you cannot make the customer evacuate but you can strongly recommend it and document the interaction. Your s.3 duty is to take reasonable steps; if the customer refuses you've done what you can. Don't stay with them — your s.7 duty to yourself doesn't bend to their preference.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module1-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 1 · Section 2 · Subsection 2"
            title="Emergency procedures — running the response"
            description="Remember from L2 — every alarm is real until proven otherwise; muster, account-for, await all-clear. At L3 you may be the senior person directing parts of the response, identifying the building's responsible person and providing the data the fire service needs."
            tone="emerald"
          />

          <TLDR
            points={[
              'Every alarm is real until proven otherwise. Stop, leave tools, evacuate via planned route, bring non-employees with you, account-for at the muster point, await all-clear.',
              "Electrical fires: isolate first (at meter / cut-out, NOT in the burning CU), evacuate, CO2 or dry powder extinguisher only if trained / small fire / escape route behind you, then 999. Never water on a live electrical fire.",
              "L3 supervisor adds: identify the building's responsible person, account-for, provide accurate data to fire service, prevent re-entry, preserve scene.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply the standard fire-alarm response sequence — stop, leave tools, evacuate via planned route, account-for, await all-clear.',
              'Identify the correct extinguisher class for an electrical fire (CO2 or dry powder) and the conditions under which extinguisher use is appropriate.',
              "Identify the 'responsible person' under RRFSO 2005 and their lead role in evacuation.",
              'Describe Personal Emergency Evacuation Plans (PEEPs) and the Equality Act 2010 link.',
              'Explain the L3 supervisor account-for and emergency-services liaison process.',
              'Apply post-incident evidence preservation principles to emergency events.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The standard fire-alarm response</ContentEyebrow>

          <ConceptBlock
            title="Stop. Leave. Evacuate. Account-for. Await all-clear."
            plainEnglish="The five-step alarm response is the same at L2 and L3. Stop work. Leave tools where they are. Evacuate via the planned route. Account for personnel at the muster point. Await the all-clear from the responsible person before re-entry."
            onSite="The L3 add: actively bring non-employees with you (customers, visitors, other trades you're working alongside). Your s.3 duty applies to them. 'I told them to leave' isn't enough; ensuring they have left is."
          >
            <p>The full alarm-response sequence:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li><strong>STOP</strong> work immediately. Don&apos;t finish the cable run.</li>
              <li><strong>LEAVE</strong> tools where they are. Personal items can stay too.</li>
              <li><strong>BRING</strong> non-employees with you — customer, visitors, others you&apos;re working alongside.</li>
              <li><strong>EVACUATE</strong> via the planned route identified in your dynamic risk assessment on arrival.</li>
              <li><strong>MUSTER</strong> at the designated point. Don&apos;t go to the van for keys.</li>
              <li><strong>ACCOUNT-FOR</strong> to the responsible person — who from your firm is here, who isn&apos;t.</li>
              <li><strong>AWAIT</strong> the all-clear before re-entering. The responsible person decides.</li>
              <li><strong>PRESERVE</strong> evidence of any work-related contributing factor.</li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 — Article 8(1)"
            clause={
              <>
                &quot;The responsible person must — (a) take such general fire precautions as
                will ensure, so far as is reasonably practicable, the safety of any of his
                employees; and (b) in relation to relevant persons who are not his employees,
                take such general fire precautions as may reasonably be required in the
                circumstances of the case to ensure that the premises are safe.&quot;
              </>
            }
            meaning={
              <>
                RRFSO 2005 places the lead fire-safety duty on the responsible person —
                typically the employer in workplaces, the owner/occupier in non-employer
                premises. Article 9 requires a fire risk assessment; Article 14 requires
                emergency routes and exits; Article 15 requires fire-fighting and detection
                equipment. As a visiting electrician your role is cooperation with the
                responsible person&apos;s arrangements; you don&apos;t lead unless you ARE
                the senior person on a small site.
              </>
            }
            cite="Source: Regulatory Reform (Fire Safety) Order 2005 (SI 2005/1541), Article 8."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <RegsCallout
            source="Health and Safety at Work etc. Act 1974 — s.7"
            clause={
              <>
                &quot;It shall be the duty of every employee while at work — (a) to take
                reasonable care for the health and safety of himself and of other persons who
                may be affected by his acts or omissions at work; and (b) as regards any duty
                or requirement imposed on his employer or any other person by or under any of
                the relevant statutory provisions, to co-operate with him so far as is
                necessary to enable that duty or requirement to be performed or complied
                with.&quot;
              </>
            }
            meaning={
              <>
                The employee duty during an emergency response. You must take reasonable care
                for your own and others&apos; safety, AND cooperate with the responsible
                person&apos;s arrangements (in a fire alarm, that means leaving by the
                signposted route, mustering, accounting-for, awaiting the all-clear). Ignoring
                the alarm, returning to the work area for tools, or undermining the fire
                marshal&apos;s instructions all breach s.7 — and s.7 carries personal
                criminal liability with no employer indemnity.
              </>
            }
            cite="Source: Health and Safety at Work etc. Act 1974 (1974 c.37), s.7."
          />

          <SectionRule />

          <ContentEyebrow>Electrical fires — fight or flight</ContentEyebrow>

          <ConceptBlock
            title="Isolate first; CO2 or dry powder only if conditions permit"
            plainEnglish="Electrical fires need (1) isolation of the supply, (2) the right extinguisher (CO2 or dry powder — never water or foam, both of which conduct), and (3) restraint. Most untrained extinguisher use makes things worse. The default is evacuate; fight only with training, small fire, escape route behind you."
            onSite="Practical L3 reflex on a small CU fire: isolate at the meter / cut-out (NEVER reach into the burning CU); evacuate yourself and any non-employees; CO2 extinguisher if trained, fire is contained, you have a clear escape behind you; otherwise let the fire service deal with it. 999 either way."
          >
            <p>Conditions for safe extinguisher use:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>You are trained in extinguisher use (ideally annually-refreshed).</li>
              <li>The fire is small — waste-bin sized maximum.</li>
              <li>You can identify the correct class for the fire.</li>
              <li>The route to a safe exit is behind you — you don&apos;t pass the fire.</li>
              <li>You can do so without putting yourself at risk.</li>
              <li>Someone else has called 999 (or is doing so).</li>
              <li>You will withdraw and evacuate if the fire grows or doesn&apos;t respond.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Extinguisher classes — quick reference"
            plainEnglish="UK extinguishers (BS EN 3) have a red body with a coloured label band. Five classes plus electrical: Class A (solids, water — red label), Class B (flammable liquids, foam cream / CO2 black), Class C (flammable gases, dry powder blue), Class D (metals, specialist), Class F (cooking oils, wet chemical yellow). Electrical: CO2 or dry powder; never water."
            onSite="On site you'll mostly meet CO2 (electrical, flammable liquids), dry powder (electrical, gas, multi-purpose), water (paper / wood / fabric only). Check the label band before using. Mismatched extinguishers — water on chip-pan oil, water on electrical — make things worse."
          >
            <p>Electrical fire = CO2 or dry powder. Why never water:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Water conducts — operator can be shocked back through the water stream.</li>
              <li>Water can spread the fire by carrying flammable residues.</li>
              <li>Water damage to the equipment can be more costly than the fire damage.</li>
              <li>CO2 displaces oxygen in the immediate area; safe on energised electrical equipment; some extinguishing of the fire itself.</li>
              <li>Dry powder smothers; safe on energised equipment; messy aftermath.</li>
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

          <ContentEyebrow>Account-for and emergency services liaison</ContentEyebrow>

          <ConceptBlock
            title="Accurate data saves lives — and prevents speculative rescue entries"
            plainEnglish="At the muster point the responsible person counts heads. The L3 supervisor's job is to provide accurate count for their firm — who came out, who didn't, who's still in. The fire service uses this data to decide whether rescue entry is needed."
            onSite="If someone from your firm is unaccounted for, say so clearly. 'Last seen at 10:14 in the second-floor server room, working on the UPS feed.' Don't assume they got out by another route; assume they didn't and let the fire service confirm."
          >
            <p>Account-for discipline:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Know who from your firm is on site at the start of the day.</li>
              <li>At the muster, do a name-by-name count.</li>
              <li>Anyone unaccounted for: name, last known location, time last seen, what they were doing.</li>
              <li>Pass to the building&apos;s responsible person AND directly to the fire service when they arrive.</li>
              <li>Don&apos;t assume the missing person evacuated by another route.</li>
              <li>Don&apos;t re-enter to look — that&apos;s the fire service&apos;s job.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="PEEPs — Equality Act 2010 + RRFSO 2005"
            plainEnglish="A Personal Emergency Evacuation Plan covers any person who can't use the standard evacuation route unaided — wheelchair users, sensory-impaired persons, persons with cognitive or temporary impairment. Required under the Equality Act 2010 (reasonable adjustments) and embedded in RRFSO 2005 fire arrangements."
            onSite="If the customer or someone in their household has mobility or sensory needs, ask about the PEEP at the start of the visit. On a commercial site, the responsible person should brief you. Knowing where the refuge points are (typically protected lobbies on stairs) is part of your dynamic site assessment."
          >
            <p>PEEP elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Designated buddy(ies) responsible for assisting evacuation.</li>
              <li>Refuge point — typically a protected lobby on the stair, with a two-way communication device.</li>
              <li>Communication aids appropriate to the impairment.</li>
              <li>Equipment (e.g. evac chair) as required.</li>
              <li>Re-entry sequence after the all-clear (often slower; needs assistance).</li>
              <li>Regular drill participation to ensure the plan works in practice.</li>
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

          <ContentEyebrow>Fire detection systems — the BS 5839 awareness layer</ContentEyebrow>

          <ConceptBlock
            title="Why an electrician should know the broad shape of BS 5839-1"
            plainEnglish="BS 5839-1 is the British Standard for fire detection and fire alarm systems in non-domestic premises. It defines system categories (P for property protection, L for life protection, M for manual call points only) with sub-categories (L1 = whole building coverage; L5 = local risk-area coverage). The category determines which spaces must have detection and what type. Domestic dwellings follow BS 5839-6 with grading by the level of protection required."
            onSite="At L3 you don&apos;t design fire alarm systems unless you&apos;re trained for it, but you&apos;ll work alongside them all the time. Knowing the category of system in a building you&apos;re working in tells you what disturbance triggers the alarm, what the maintenance regime looks like, and whether your work is inside or outside a detection zone. Disturbing a detector head, painting over a sensor, taping a callpoint — all are MOR-relevant on HRRBs and contractor-defect issues elsewhere."
          >
            <p>Quick reference on BS 5839 categories:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>P1</strong> — automatic detection throughout the building for property
                protection.
              </li>
              <li>
                <strong>P2</strong> — automatic detection in defined high-risk areas only.
              </li>
              <li>
                <strong>L1</strong> — automatic detection throughout the building for life
                protection.
              </li>
              <li>
                <strong>L2</strong> — L1 + additional detection in escape routes and rooms
                opening on to escape routes.
              </li>
              <li>
                <strong>L3</strong> — detection in escape routes and rooms opening on to escape
                routes.
              </li>
              <li>
                <strong>L4</strong> — detection in escape routes only.
              </li>
              <li>
                <strong>L5</strong> — local risk-area protection only.
              </li>
              <li>
                <strong>M</strong> — manual call points only; no automatic detection.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Fire compartmentation and the electrician&apos;s role</ContentEyebrow>

          <ConceptBlock
            title="Cable penetrations as fire-stopping points"
            plainEnglish="Buildings are divided into fire compartments by walls, floors and doors with specified fire-resistance ratings. The compartmentation only works if the breaches in those barriers — including every cable penetration — are properly fire-stopped. Approved Document B and BS 9999 set out the requirements. Defective fire-stopping was a major contributor to fire spread at Grenfell."
            onSite="The L3 reflex on every cable penetration through a compartment line: appropriate fire-stopping in place, recorded, photographed. Intumescent collars, fire pillows, fire mortar, fire-rated foam — the right product for the substrate and the cable type. &quot;The general builder&apos;s coming back to fire-stop&quot; is exactly how the Grenfell pattern repeats — make sure the responsibility is allocated and discharged in writing."
          >
            <p>Practical fire-stopping checklist on a cable penetration:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify the compartment line</strong> — fire-rated wall or floor on the
                building drawings; ask the principal contractor or designer if unsure.
              </li>
              <li>
                <strong>Match the fire-stopping to the rating</strong> — 30, 60, 90 or 120
                minutes. Product certification (BS EN 1366) for the substrate and configuration.
              </li>
              <li>
                <strong>Install per the manufacturer&apos;s spec</strong> — gap fill, depth,
                surface treatment.
              </li>
              <li>
                <strong>Record and photograph</strong> — golden-thread input on HRRBs;
                contractor record on all jobs for liability protection.
              </li>
              <li>
                <strong>Tag the penetration</strong> — increasingly required on major projects;
                allows future inspection and traceability.
              </li>
              <li>
                <strong>Don&apos;t leave it to &apos;someone else&apos;</strong> — the firm
                that creates the penetration owns the fire-stopping responsibility unless
                explicitly transferred in writing to another party.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The post-event review — learning into the next job</ContentEyebrow>

          <ConceptBlock
            title="Why the firm should debrief, even on minor events"
            plainEnglish="Every emergency event — real or false alarm, evacuation or near-miss — is a chance to review and improve. Did people know the route? Did the muster procedure work? Did account-for capture everyone? Was there a contributory factor from your work? The post-event review pulls these out, blame-free, and feeds the firm&apos;s Reg 5 (MHSWR) management cycle."
            onSite="The L3 supervisor habit: within 24 hours of any evacuation or significant near-miss, a short written note summarising what happened, what worked, what didn&apos;t. Sent to the firm&apos;s H&amp;S manager. Feeds toolbox talks, RAMS updates, induction improvements. The HSE values firms that demonstrate this learning loop — it&apos;s the kind of evidence that turns a borderline enforcement decision into a notice rather than a prosecution."
          >
            <p>Post-event review structure (10-15 minutes max):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>What happened</strong> — factual sequence, time-stamped.
              </li>
              <li>
                <strong>What worked</strong> — alarm response, route knowledge, account-for,
                emergency services interaction.
              </li>
              <li>
                <strong>What didn&apos;t</strong> — delays, confusion, missing information,
                wrong actions.
              </li>
              <li>
                <strong>Contributory factors from the firm&apos;s work</strong> — if any. Be
                honest; the inspector will check.
              </li>
              <li>
                <strong>Recommendations</strong> — RAMS updates, training topics, equipment
                changes, induction improvements.
              </li>
              <li>
                <strong>Distribution</strong> — H&amp;S manager, contracts manager, operatives
                involved, next toolbox talk content.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 — Article 9"
            clause={
              <>
                &quot;The responsible person must make a suitable and sufficient assessment of
                the risks to which relevant persons are exposed for the purpose of identifying
                the general fire precautions he needs to take to comply with the requirements
                and prohibitions imposed on him by or under this Order.&quot;
              </>
            }
            meaning={
              <>
                The fire risk assessment duty under RRFSO. Mirrors the MHSWR Reg 3 risk
                assessment duty but specific to fire. Where 5+ employees are employed, the
                significant findings must be recorded (Article 9(7)). Following an evacuation
                event the FRA should be reviewed — Article 9(3) requires the assessment to be
                kept under review. The post-event review feeds the FRA update; the FRA update
                feeds the next year&apos;s evacuation drill.
              </>
            }
            cite="Source: Regulatory Reform (Fire Safety) Order 2005 (SI 2005/1541), Article 9."
          />

          <CommonMistake
            title="Going back for the toolbox"
            whatHappens={
              <>
                Apprentice evacuates but realises their toolbox is in the work area. Slips
                back inside &quot;just to grab it&quot; while the alarm is still sounding.
                Fire service is told everyone is out. The apprentice is missed in the
                count. Re-entry by the fire service to look for them is delayed by 4
                minutes; smoke ingress to the route they took is now severe; minor
                injuries follow.
              </>
            }
            doInstead={
              <>
                Tools stay. They&apos;re replaceable; the consequences of being
                unaccounted for during an evacuation aren&apos;t. Once you&apos;re out,
                you stay out. The all-clear comes from the responsible person, not from
                you.
              </>
            }
          />

          <CommonMistake
            title="Using a water extinguisher on a live CU fire"
            whatHappens={
              <>
                Apprentice grabs the nearest extinguisher (water — Class A only) and
                discharges it on a live CU fire. Water tracks back up the stream;
                operator receives a shock; fire isn&apos;t controlled (water spreads
                burning insulation residues across the floor); CU damage is now
                catastrophic. Insurance, RIDDOR specified-injury, EAWR Reg 4 breach.
              </>
            }
            doInstead={
              <>
                Read the label colour band before using any extinguisher. Electrical
                fires: CO2 (black label) or dry powder (blue label). Water (red label)
                is for Class A only. If unsure, evacuate.
              </>
            }
          />

          <Scenario
            title="Fire alarm during a commercial first-fix"
            situation={
              <>
                You&apos;re leading a small team (yourself + one L2) on a commercial
                first-fix in a multi-tenant office building. You&apos;re on the third
                floor, the L2 is on the second floor running cable. You both have
                tools, drill batteries on charge, materials laid out. The fire alarm
                sounds — not your panel work, but a building-wide alarm. The customer
                isn&apos;t present today (out-of-hours job). You don&apos;t know if
                this is a drill or a real event.
              </>
            }
            whatToDo={
              <>
                Treat as real. Phone the L2 immediately: &quot;alarm, evacuate now,
                meet me at the muster point&quot;. Stop your own work, leave tools and
                charging batteries (drill battery on charge in a building fire is a
                problem but not your problem to solve mid-evacuation), evacuate via
                the route you identified on arrival, head to the muster. At the muster
                — confirm L2 has arrived, identify the building&apos;s responsible
                person / fire marshal, identify yourself and your firm, account-for
                (you + L2 both present, no other firm personnel on site). Wait for the
                all-clear. If the fire service arrives, provide your account-for to
                them too. Once given the all-clear, re-entry is permitted — but check
                the work area for fire / smoke damage that could affect your kit
                before resuming. Document the event in the firm&apos;s incident log
                that evening. Note any contributory factor from your work (none in
                this scenario, but always note if there is).
              </>
            }
            whyItMatters={
              <>
                The L2 mate on the second floor is your team. Failing to communicate to
                them and confirm their evacuation is a s.7 / s.2 / Reg 9 failure. The
                charging drill battery is a real fire-load consideration in some
                cases, but mid-evacuation it&apos;s lower priority than getting people
                out — the building&apos;s fire-safety system is designed for these
                fire loads. The account-for at the muster is what gives the fire
                service confidence the building can be cleared without speculative
                rescue entry. If your firm wasn&apos;t the cause, document that;
                you&apos;re still likely to be asked about it during the
                building-owner&apos;s post-event review.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Remember from L2 — every alarm is real, evacuate via planned route, muster, account-for, all-clear.",
              "L3 add — actively bring non-employees with you (s.3 duty); identify and cooperate with the building's responsible person; account-for your firm's personnel; provide accurate data to fire service.",
              "Electrical fires: isolate, evacuate, CO2 or dry powder ONLY if trained / small / escape route behind. Never water on live electrical.",
              "Extinguisher classes (BS EN 3): A (water-red), B (foam-cream / CO2-black), C (dry powder-blue), D (specialist), F (wet chemical-yellow). Electrical = CO2 or dry powder.",
              "RRFSO 2005 places lead fire-safety duty on the responsible person. PEEPs (Personal Emergency Evacuation Plans) under Equality Act 2010 + RRFSO for persons needing assistance.",
              "Account-for is the supervisor act with the highest impact. Accurate data prevents speculative rescue entry and saves lives.",
              "Don't go back for tools. Re-entry only after all-clear from responsible person.",
              "Preserve evidence post-event — photos, witnesses, work-related contributing factors.",
            ]}
          />

          <Quiz title="Emergency procedures — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section2-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">2.1 Accident response and electric shock</div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section2-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">2.3 Limits of responsibility</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
