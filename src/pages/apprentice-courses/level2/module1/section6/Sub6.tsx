/**
 * Module 1 · Section 6 · Subsection 6 — General workplace emergency
 * procedures.
 *
 * Unit 201 LO2 alignment:
 *   - AC 2.2: respond appropriately to general workplace emergencies
 *     beyond fire and electric shock — gas leaks, structural collapse,
 *     extreme weather, security incidents, mental health crises.
 *
 * Pedagogy:
 *   - Each emergency type with the canonical first-line response.
 *   - The "stop, think, isolate (if you can), evacuate, escalate" pattern
 *     repeats across every emergency.
 *   - Mental-health emergencies treated with the same seriousness as
 *     physical ones — increasingly recognised in UK construction.
 *   - Final Sub of M1 → routes back to Module 1 landing.
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
  'General workplace emergency procedures | Level 2 Module 1.6.6 | Elec-Mate';
const DESCRIPTION =
  'Gas leaks, structural collapse, extreme weather, security incidents, mental health crises — the responses for every workplace emergency that isn’t fire or shock.';

/* ── Inline check questions (wired into stats/streaks) ──────────────── */

const checks = [
  {
    id: 'gas-leak-first-action-check',
    question:
      'You smell mains gas (rotten eggs / sulphur smell) on a job. What is the FIRST thing you must NOT do?',
    options: [
      'Open windows for ventilation',
      'Operate any electrical switch — don’t turn lights on or off, don’t use phones in the area',
      'Turn off the gas at the meter if accessible',
      'Evacuate everyone from the building',
    ],
    correctIndex: 1,
    explanation:
      'A gas leak + a switch operation = potential ignition source. Don’t flick light switches, don’t plug or unplug anything, don’t use a phone IN the affected area (the spark from any contact can ignite gas at LEL concentrations). Evacuate, then call National Gas Emergency on 0800 111 999 from a safe distance.',
  },
  {
    id: 'structural-collapse-check',
    question:
      'You hear a section of suspended ceiling come down in the next room and a colleague’s shouted. What is the right immediate action?',
    options: [
      'Run in to help them out',
      'Stop, raise the alarm, evacuate everyone in adjacent areas, call 999, do not enter the collapsed area',
      'Try to lift the debris off them yourself',
      'Wait to see if they call out again',
    ],
    correctIndex: 1,
    explanation:
      'Untrained rescue in a structural collapse kills rescuers. Once one section comes down, others may follow. Get others out of adjacent areas, call 999 and brief them on the situation. Fire and Rescue have specialist USAR (Urban Search and Rescue) teams — let them in first. Shout to the casualty to keep them awake but don’t enter.',
  },
  {
    id: 'mental-health-emergency-check',
    question:
      'A colleague tells you in confidence they’re thinking of ending their life. What do you do?',
    options: [
      'Tell them to "cheer up" and get back to work',
      'Promise to keep it secret and hope they’ll be OK',
      'Stay with them, take it seriously, and signpost them to emergency help (Samaritans 116 123, A&E, GP, 999 if in immediate danger) — confidentiality has to bend when life is at risk',
      'Avoid the conversation, walk away',
    ],
    correctIndex: 2,
    explanation:
      'Suicide is the leading cause of death for UK male construction workers under 45. The Samaritans (116 123) is the 24/7 helpline. If someone is in immediate danger of harming themselves, call 999 — this is a medical emergency, same as a heart attack. Confidentiality matters but it has to bend when life is at risk; tell the person you can’t keep it secret and get them proper help.',
  },
];

/* ── End-of-page Quiz (wires into stats/streaks) ─────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      'Which national emergency number do you call for a suspected gas leak in the UK?',
    options: [
      '999',
      '111',
      '0800 111 999 (National Gas Emergency Service)',
      '105 (Power Cut Hotline)',
    ],
    correctAnswer: 2,
    explanation:
      '0800 111 999 — National Gas Emergency Service, free, 24/7, the same number across the whole of the UK. They dispatch the local gas distribution network engineer to make the supply safe. 999 is for life-threatening emergencies (also valid in this case). 105 is the power cut / DNO hotline.',
  },
  {
    id: 2,
    question:
      'What is the first action when a member of the public tells you they smell gas in a property where you’re working?',
    options: [
      'Tell them not to worry, you’ll check it later',
      'Stop work, don’t operate any electrical switches, ventilate by opening windows/doors if safe, evacuate, call 0800 111 999',
      'Light a match to "check" if it’s really gas',
      'Carry on — they probably imagined it',
    ],
    correctAnswer: 1,
    explanation:
      'Stop. Don’t operate switches (no spark sources). Open windows/doors if you can do it without operating switches. Get everyone out. Call the National Gas Emergency Service from outside the affected area. Don’t re-enter until the engineer says so.',
  },
  {
    id: 3,
    question:
      'Working outdoors, lightning starts. What is the safe action for an apprentice on a flat roof?',
    options: [
      'Carry on — lightning is unlikely to strike you specifically',
      'Get off the roof immediately, take shelter inside the building or in a vehicle, wait until 30 minutes after the last thunder',
      'Lie flat on the roof to be lower',
      'Hold onto a metal ladder for protection',
    ],
    correctAnswer: 1,
    explanation:
      'Roofs and elevated structures are lightning targets. Get off, get inside (vehicle with metal roof, or substantial building). The "30/30 rule": if thunder is within 30 seconds of the lightning flash, take shelter; wait 30 minutes after the last thunder before going back up. Metal ladders are the worst place to be.',
  },
  {
    id: 4,
    question:
      'You discover a suspect package on a commercial site — unattended, unmarked, doesn’t look like building stock. What do you do?',
    options: [
      'Move it outside in case it goes off',
      'Open it carefully to see what’s inside',
      'HOT protocol: don’t touch, evacuate the area, raise the alarm, call 999, brief security',
      'Carry on working and assume it’s nothing',
    ],
    correctAnswer: 2,
    explanation:
      'HOT — Hidden, Obvious, Typical. Apply 4 Cs: Confirm (is it suspicious?), Clear (evacuate the area), Cordon (keep people back), Control (call 999 and brief them). DO NOT TOUCH, DO NOT MOVE, DO NOT INVESTIGATE. The police EOD team handles it. False alarms are far better than the alternative.',
  },
  {
    id: 5,
    question:
      'A worker has collapsed and is unresponsive. You suspect a heart attack — not electrical, not trauma. What is the right sequence?',
    options: [
      'Wait to see if they wake up on their own',
      'DR ABC — Danger, Response, Airway, Breathing, Circulation. Call 999. Start CPR if not breathing. Send for an AED.',
      'Move them to a quieter area first',
      'Give them water and aspirin',
    ],
    correctAnswer: 1,
    explanation:
      'Same primary survey as for an electrical casualty (covered in §6.1). DR ABC, 999, CPR if not breathing, AED if available. The cause matters less than the immediate response — heart attacks present the same as cardiac arrest from electric shock; treatment is the same.',
  },
  {
    id: 6,
    question:
      'What is a "lone worker" and what extra emergency arrangements should be in place for them?',
    options: [
      'Anyone who works night shifts; no special arrangements needed',
      'Anyone working without close supervision (often by themselves on a site or in a property); needs check-in procedures, dynamic risk assessment, and a way to summon help',
      'Apprentices only; they get a buddy by default',
      'Self-employed workers; they’re responsible for their own safety',
    ],
    correctAnswer: 1,
    explanation:
      'A lone worker is anyone working without close or direct supervision — common for a domestic electrician. HSE INDG73 covers lone working. Arrangements should include scheduled check-ins (text the office every couple of hours / on arrival/departure), dynamic risk assessment, lone-worker app or device with panic button, and a written escalation path if check-ins are missed.',
  },
  {
    id: 7,
    question:
      'A colleague is showing signs of severe heat exhaustion on a hot day — confused, very pale, sweating heavily, struggling to stand. What do you do?',
    options: [
      'Tell them to rest in the shade for 5 minutes and crack on',
      'Move them to a cool place, loosen clothing, give cool water, cool the skin with damp cloths or fan, monitor — call 999 if they lose consciousness or become confused (heat stroke)',
      'Give them a hot drink',
      'Make them keep working to "sweat it out"',
    ],
    correctAnswer: 1,
    explanation:
      'Heat exhaustion (the early stage) → cool, hydrate, rest. Heat stroke (the medical emergency, if they’re confused / unconscious / stop sweating / core temp 40°C+) → 999 immediately, aggressive cooling. UK has had multiple construction fatalities in recent heatwaves — take it seriously.',
  },
  {
    id: 8,
    question:
      'Mental health emergency — when must you call 999 rather than signpost a colleague to other help?',
    options: [
      'Never — mental health is private',
      'When the colleague says they need someone to talk to',
      'When the colleague is in immediate danger of harming themselves or others — this is a medical emergency same as any other',
      'Only if a manager tells you to',
    ],
    correctAnswer: 2,
    explanation:
      'Immediate self-harm risk = 999, same as a heart attack. The Samaritans (116 123) and SHOUT text line (text "SHOUT" to 85258) are 24/7 for non-emergency support. CALM (Campaign Against Living Miserably) is construction-aligned. If someone is in immediate danger, life trumps confidentiality — call for the help they need.',
  },
];

/* ── FAQs (apprentice voice) ─────────────────────────────────────────── */

const faqs = [
  {
    question: 'Why is calling 999 OK when there are specialist numbers like 0800 111 999 for gas?',
    answer:
      '999 is always valid for any life-threatening emergency. The control room can patch you through to the right specialist (gas distribution, ambulance, fire, police, mountain rescue, coastguard) — they’re trained to triage. Use the specialist number when you know it’s the right one (gas = 0800 111 999, power cut = 105) but don’t hesitate to use 999 if it’s urgent or you’re not sure.',
  },
  {
    question: 'What about extreme cold — frostbite, hypothermia?',
    answer:
      'Hypothermia presents as confusion, slurred speech, shivering (or stopping shivering — that’s a bad sign), pale skin. Get them inside, off cold surfaces, into dry layers, give warm (not hot) drinks if conscious. Mild = warm them up gradually. Severe (loss of consciousness, body temp under 32°C) = 999 and warm them slowly under medical guidance — rewarming too fast can be fatal. Frostbite: rewarm the affected part in warm (not hot) water, do NOT rub or use direct heat (radiator, fire), seek medical attention.',
  },
  {
    question: 'I’m a self-employed electrician working alone in domestics all day — what counts as a lone worker arrangement?',
    answer:
      'At minimum: tell someone where you are, what time you expect to be done, when you’ll text/call to say you’re clear of the job. A lone-worker app (Skyguard, StaySafe, Reliance) gives you a panic button on your phone. Some bigger insurance policies require these for sole-trader electricians. Check in religiously — the system only works if you actually USE it.',
  },
  {
    question: 'What’s the protocol for an asbestos disturbance?',
    answer:
      'Stop work immediately. Don’t disturb anything further. Don’t hoover the area (that disperses fibres). Restrict access to the room/area. Inform the duty holder / supervisor. The HSE’s asbestos guidance (HSG264) covers it — and any suspected asbestos in a domestic or commercial property should already be on the asbestos register the duty holder maintains. Asbestos-related illness is the UK’s biggest occupational disease cause of death — even a single high-level exposure has long-term consequences.',
  },
  {
    question: 'Mental health is a "general emergency" now — how’s that changed?',
    answer:
      'Construction has the highest suicide rate of any UK industry — male workers under 45 are over three times more likely to die by suicide than the national male average. The industry has woken up to it. Mental-health-first-aiders are increasingly required on larger sites under PAS 1010 / similar guidance. CALM (0800 58 58 58, calmzone.net) and the Samaritans (116 123) are 24/7. Treat it with the same seriousness as physical injury — your colleagues’ lives may depend on you knowing the routes to help.',
  },
  {
    question: 'What about a security incident — someone aggressive on site?',
    answer:
      'De-escalate if you safely can — calm voice, open hands, don’t crowd them, don’t turn your back. Get yourself between the person and the exit so YOU have a way out. If the situation continues to deteriorate or you see a weapon: leave the area, raise the alarm, get others out, call 999. Don’t try to physically restrain — you’re an electrician, not a doorman, and you’re not insured for it. Lock yourself in a room if you have to. Police take aggression on building sites seriously.',
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
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 1 · Section 6 · Subsection 6"
            title="General workplace emergency procedures"
            description="Gas leaks, structural collapse, extreme weather, security incidents, mental health crises — the responses for every workplace emergency that isn’t fire or shock. The pattern repeats: stop, isolate if safe, evacuate, escalate."
            tone="emerald"
          />

          <TLDR
            points={[
              "The general pattern across every emergency: STOP work → MAKE SAFE if you can do so safely → EVACUATE / CORDON → ESCALATE to the right service. Don’t freelance heroics.",
              "Different specialist numbers exist (gas 0800 111 999, power cut 105, terrorism hotline 0800 789 321) but 999 is ALWAYS valid for anything life-threatening.",
              "Mental health emergencies are emergencies. Construction has the highest UK suicide rate of any industry — Samaritans 116 123, CALM 0800 58 58 58, 999 if immediate danger.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "React correctly to a suspected gas leak — without creating an ignition source.",
              "Apply the right protocol to a structural collapse, including the rule against untrained rescue.",
              "Respond to extreme weather hazards (lightning, heat exhaustion / stroke, hypothermia).",
              "Apply the HOT protocol and 4 Cs to a suspect package or security incident.",
              "Recognise and respond to a mental health emergency, including knowing the helpline routes.",
              "Describe the lone-worker arrangements that allow emergencies to be raised when working alone.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The pattern that repeats</ContentEyebrow>

          <ConceptBlock title="Different emergencies, same skeleton response">
            <p>
              Section 6 has covered electric shock (§6.1), first aid (§6.2), the legal
              reporting machinery (§6.3), investigation (§6.4) and fire (§6.5). This final
              subsection covers the other workplace emergencies you’ll meet — and the same
              underlying response pattern shows up in every one:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stop work.</strong> Don’t carry on through an emergency.
              </li>
              <li>
                <strong>Make safe</strong> what you can <em>without taking on additional
                risk</em>. Isolate a supply if it’s upstream and reachable. Don’t enter a
                collapsed area to "check".
              </li>
              <li>
                <strong>Evacuate / cordon.</strong> Get yourself and others out of the danger
                zone. Stop new people walking in.
              </li>
              <li>
                <strong>Escalate to the right service.</strong> 999 is always valid; specialist
                numbers (gas, power cuts, terrorism) get you triaged faster when you know which
                one fits.
              </li>
              <li>
                <strong>Stay until released.</strong> Roll call, brief the responding
                professionals, accept their authority, don’t go back in.
              </li>
            </ol>
            <p>
              The skeleton is the same; the specifics change with the emergency. Each one below
              is a quick-reference for the situations an apprentice realistically meets.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Gas leaks</ContentEyebrow>

          <ConceptBlock
            title="Gas leak — the no-spark rule"
            plainEnglish="Mains gas at LEL (Lower Explosive Limit) needs only a tiny ignition source — a spark from a switch, a phone, a static-discharge — to detonate. The first rule is: don’t create that spark."
            onSite="If you smell gas while you’re working in someone’s home and you’re mid-job with the consumer unit open, the LAST thing you do is operate the main switch. Walk out, take the customer out, ventilate from outside, call 0800 111 999."
          >
            <p>The protocol if you smell gas (sulphur / rotten eggs odour added by the gas distributor):</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stop work.</strong> Don’t operate ANY electrical switch — not lights,
                not phones, not the consumer unit, not the meter.
              </li>
              <li>
                <strong>Open windows and doors</strong> for ventilation IF you can do so without
                operating any switches.
              </li>
              <li>
                <strong>Get everyone out.</strong> Including the customer / occupier.
              </li>
              <li>
                <strong>Turn off the gas at the meter</strong> IF the meter is accessible AND
                you can do it without entering the leak area.
              </li>
              <li>
                <strong>Call 0800 111 999</strong> from outside the property. National Gas
                Emergency Service — free, 24/7, UK-wide. They dispatch the local gas
                distribution engineer.
              </li>
              <li>
                <strong>Don’t re-enter</strong> until the gas engineer has cleared the property.
              </li>
            </ol>
            <p>
              <strong>Carbon monoxide</strong> is the silent killer — odourless, colourless,
              kills around 30 people a year in the UK. CO alarms are now mandatory in
              properties with any combustion appliance under the Smoke and Carbon Monoxide
              Alarm (England) Regulations 2022. If a CO alarm is going off, treat it as gas
              leak protocol — evacuate, ventilate, call the National Gas Emergency Service.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Gas Safety (Installation and Use) Regulations 1998 — Regulation 37"
            clause="Where any gas escape is known or suspected, the responsible person must take all reasonable steps to prevent the escape continuing, and immediate notification must be given to the supplier or transporter."
            meaning={
              <>
                Even though electricians aren’t Gas Safe registered, you can still smell or notice a
                leak — and the GSIUR puts the duty to act on whoever is in the property,
                including a tradesperson working there. The "responsible step" is to evacuate
                and notify (0800 111 999). Failure to act is a prosecutable offence.
              </>
            }
            cite="Reference: Gas Safety (Installation and Use) Regulations 1998."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Structural collapse</ContentEyebrow>

          <ConceptBlock
            title="Don’t become casualty number two"
            plainEnglish="When part of a structure comes down, more is often about to follow. Untrained rescue in a partial collapse kills more rescuers than victims."
            onSite="Suspended ceilings on commercial fit-outs are the classic apprentice-level risk — when one tile bracket fails, the load redistributes onto the next. Whole sections can come down in cascades."
          >
            <p>The protocol if you witness a partial collapse (suspended ceiling, scaffold,
            wall, floor, dropped load):</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stop. Get clear yourself first.</strong> Move yourself to a safe
                distance — at least the height of the structure away.
              </li>
              <li>
                <strong>Raise the alarm.</strong> Shout "collapse, evacuate", hit the fire
                alarm if there’s no specific evacuation alarm.
              </li>
              <li>
                <strong>Get others out</strong> of adjacent areas (likely to be next to fail).
              </li>
              <li>
                <strong>Call 999 immediately.</strong> Tell the operator: collapse, location,
                approximate scale, casualties trapped or visible. They’ll dispatch USAR (Urban
                Search and Rescue) — specialist Fire and Rescue teams trained for
                building-collapse extraction.
              </li>
              <li>
                <strong>Don’t enter the collapsed area.</strong> Even if you can hear a
                colleague. Voice contact only — shout encouragement, ask if they can move,
                relay status to 999. Don’t try to lift debris or crawl in.
              </li>
              <li>
                <strong>Brief the fire service on arrival</strong> — what came down, where the
                casualty was last seen, services in the area (gas, electric, water).
              </li>
              <li>
                <strong>Cordon the area</strong> until the fire service or HSE inspector
                releases it. Preserve the scene — there’ll be an investigation (covered in
                §6.4).
              </li>
            </ol>
            <p>
              <strong>Why no rescue?</strong> Because you don’t have the equipment to assess
              what’s about to fail next, and a second collapse on top of you means there are
              now two casualties, both inaccessible. USAR teams have shoring kit, atmospheric
              monitoring, search dogs and the trained eye to read the structure. Wait for them.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Trying to lift debris off a colleague trapped under partial collapse"
            whatHappens={
              <>
                Workmate is half-trapped under a section of fallen ceiling. You go in, start
                lifting tiles, trying to get to him. The next bay’s bracket fails because the
                load shifted when you moved the first piece. Now you’re both under it. The
                fire service finds two casualties instead of one, and it takes them twice as
                long to extract.
              </>
            }
            doInstead={
              <>
                Voice contact only. Tell the trapped colleague help is on the way, ask if
                they can describe their injuries, keep talking to them. Get others out, call
                999, brief on arrival. Yes it feels wrong to "stand and watch" — but it’s the
                response that gets the most people out alive. Trained USAR teams will do the
                extraction safely.
              </>
            }
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Extreme weather</ContentEyebrow>

          <ConceptBlock
            title="Lightning, heat, cold — the outdoor risks"
            plainEnglish="UK weather kills outdoor workers in small numbers every year. The risk is biggest where you’re elevated (lightning), exposed in heatwaves (heat stroke), or working long shifts in winter (hypothermia)."
          >
            <p><strong>Lightning:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>30/30 rule:</strong> if thunder follows lightning within 30 seconds,
                take shelter. Wait 30 minutes after the LAST thunder before going back up.
              </li>
              <li>
                Get OFF roofs, scaffold, masts, anything elevated. Avoid open spaces, single
                trees, metal fences.
              </li>
              <li>
                Best shelter: substantial building. Second best: car / van with metal roof
                (Faraday cage). Worst: open ground, pylon shelter, under a tree.
              </li>
              <li>
                Lightning strike casualties — DR ABC, 999, CPR if needed. Casualties are NOT
                live after the strike (charge dissipates instantly).
              </li>
            </ul>
            <p><strong>Heat exhaustion / heat stroke:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Heat exhaustion</strong> (early stage): pale, clammy, headache, weak,
                heavy sweating. → cool place, loosen clothes, cool water to drink, damp
                cloths on neck and wrists. Should improve in 30 min.
              </li>
              <li>
                <strong>Heat stroke</strong> (medical emergency, 40°C+ core temp): confusion,
                hot dry skin (sweating may stop), rapid breathing, can lose consciousness or
                fit. → 999 immediately. Aggressive cooling — wet sheets, fans, ice packs in
                armpits and groin, hose if available.
              </li>
              <li>
                Recent UK summers have produced multiple construction fatalities from heat
                stroke. Don’t assume British weather can’t kill — it has.
              </li>
            </ul>
            <p><strong>Hypothermia:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Confusion, slurred speech, intense shivering (then stopping — bad sign), pale
                cold skin, slow pulse.
              </li>
              <li>
                → indoors, off cold surfaces, dry layers, warm (not hot) drinks if conscious,
                gradual rewarming.
              </li>
              <li>
                Severe hypothermia (under 32°C, unconscious) → 999, gentle handling, slow
                rewarming under medical guidance — rewarming too fast can trigger cardiac
                arrest.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Security incidents</ContentEyebrow>

          <ConceptBlock
            title="Suspect packages, aggression, intruders"
            plainEnglish="The default UK protocol for any unattended suspicious item is HOT (Hidden, Obvious, Typical) and the 4 Cs (Confirm, Clear, Cordon, Control). Same as bus stations and shopping centres."
            onSite="Construction sites are common targets for both opportunistic theft and protest action. If something looks out of place, it might be."
          >
            <p><strong>Suspect packages — the HOT protocol:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>H</strong>idden — has it been deliberately concealed?
              </li>
              <li>
                <strong>O</strong>bvious — wires, batteries, tape, stains? Out of place?
              </li>
              <li>
                <strong>T</strong>ypical — is it the kind of thing you’d expect to see in this
                location?
              </li>
              <li>
                If it scores on H/O/not-T → treat as suspicious.
              </li>
            </ul>
            <p><strong>Then the 4 Cs:</strong></p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Confirm</strong> the threat — quick assessment from a safe distance.
              </li>
              <li>
                <strong>Clear</strong> the area — evacuate at least 100 m away if outside, or
                to the far side of a substantial building if indoors.
              </li>
              <li>
                <strong>Cordon</strong> — stop people walking back in. Use whatever you have
                (vehicles, cones, tape).
              </li>
              <li>
                <strong>Control</strong> — call 999 (police), brief them, follow their
                instructions. They’ll dispatch EOD (Explosive Ordnance Disposal) if needed.
              </li>
            </ol>
            <p>
              <strong>Aggression on site:</strong> de-escalate calmly if safe, position
              yourself between the person and the exit (you keep your escape route),
              don’t crowd them, don’t turn your back. If they have a weapon or won’t calm —
              leave, raise the alarm, lock yourself in a room if you have to, call 999. Don’t
              try to physically restrain — it’s outside your training and your insurance.
            </p>
            <p>
              <strong>Anti-Terrorism Hotline:</strong> 0800 789 321 — for non-emergency
              intelligence. 999 if there’s an immediate threat.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Mental health emergencies</ContentEyebrow>

          <ConceptBlock
            title="The leading cause of death for UK male construction workers under 45"
            plainEnglish="Suicide kills more men in UK construction than any single physical hazard. The industry has finally started treating it as the safety issue it is. Mental-health crises are emergencies — and you have routes to help."
            onSite={`If a colleague tells you they’re struggling, take it seriously. Ten minutes listening, a pointer to a helpline, a check-in next week. None of that is "outside your job".`}
          >
            <p>
              The Office for National Statistics has consistently found that male construction
              workers under 45 have one of the highest suicide rates of any UK occupational
              group — significantly above the national male average. The reasons are well
              understood: long hours, lone working, sub-contracting precarity, machismo culture
              that discouraged talking, and (until recently) almost no occupational mental
              health support.
            </p>
            <p>
              This has changed fast in the last 5–10 years. Mental health first aid is now
              required on most major construction sites. Industry charities have stepped up.
              Helplines are free and 24/7.
            </p>
            <p><strong>The routes to help, by urgency:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Immediate danger of self-harm or suicide:</strong> 999. This is a
                medical emergency, same as a heart attack. Do not leave the person alone.
              </li>
              <li>
                <strong>In crisis but not in immediate danger:</strong> Samaritans 116 123 (24/7,
                free, anonymous). Or text "SHOUT" to 85258 if they can’t talk.
              </li>
              <li>
                <strong>Construction-aligned support:</strong> CALM (Campaign Against Living
                Miserably) — 0800 58 58 58 (5pm–midnight) and webchat at calmzone.net. Lighthouse
                Construction Industry Charity — 0345 605 1956, 24/7 helpline + financial
                support specifically for construction workers and families.
              </li>
              <li>
                <strong>Ongoing support:</strong> GP, NHS Talking Therapies (self-referral),
                EAP if your firm has one, occupational health.
              </li>
            </ul>
            <p>
              <strong>What you do as a colleague when someone confides in you:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Listen.</strong> Don’t fix, don’t lecture, don’t minimise ("could be
                worse"). Just listen.
              </li>
              <li>
                <strong>Take it seriously.</strong> If they mention suicide, ask directly —
                "are you thinking about ending your life?" Asking doesn’t plant the idea.
                Knowing the answer changes what you do next.
              </li>
              <li>
                <strong>Signpost.</strong> Get them the right helpline number. If they’re in
                immediate danger, don’t leave them — call 999 with them.
              </li>
              <li>
                <strong>Confidentiality bends when life is at risk.</strong> Tell them you can
                keep most things private but you can’t keep secrets that put their life at
                risk — and you’re going to make sure they get the help they need.
              </li>
              <li>
                <strong>Look after yourself afterwards.</strong> Hearing this from a colleague
                is heavy. Talk to a mental health first aider, your line manager, your own GP,
                or one of the helplines yourself.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="HSE — Mental health and stress at work"
            clause="Employers have a legal duty under HASAWA 1974 and the Management of Health and Safety at Work Regulations 1999 to assess and manage risks to the mental health of their workers, in the same way as risks to their physical health."
            meaning={
              <>
                Mental health risk is a HASAWA risk — not a soft "wellbeing" extra. Employers
                must assess and manage stress, support workers in crisis, and provide access
                to help. Bigger sites and major contractors are expected to have mental health
                first aiders trained and named, and to publish helpline information widely. If
                yours doesn’t, ask why.
              </>
            }
            cite="Reference: HSE — Mental health at work guidance; HSE INDG163 (Stress)."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Lone working</ContentEyebrow>

          <ConceptBlock
            title="The lone-worker arrangements that turn an emergency into a survivable one"
            plainEnglish={`The biggest risk for a lone worker isn’t the original incident — it’s nobody knowing it happened. Check-in arrangements turn "missing for hours" into "raised in 30 minutes".`}
          >
            <p>
              HSE INDG73 covers lone working. The basic risk-management arrangements every
              self-employed electrician and every employee working alone should have:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pre-job dynamic risk assessment.</strong> Is this property safe to
                enter alone? (Hostile customer, dodgy structure, isolated location, unknown
                dog?) Walk away if it isn’t.
              </li>
              <li>
                <strong>Tell someone where you are.</strong> Office, partner, mate. Job
                address, expected start and finish times.
              </li>
              <li>
                <strong>Scheduled check-ins.</strong> Text on arrival, on departure, every
                couple of hours during long jobs. Lone-worker apps (Skyguard, StaySafe,
                Reliance Protect) automate this and add a panic button.
              </li>
              <li>
                <strong>Escalation path.</strong> If you miss a check-in by more than X
                minutes, the office calls. If no answer, they call 999 and dispatch help to
                the address.
              </li>
              <li>
                <strong>Carry the right kit.</strong> Phone with charge, first aid, water, in
                cold weather a foil blanket. The basics that turn an hour-long wait for
                rescue into a survivable one.
              </li>
            </ul>
            <p>
              The system only works if you USE it. Every missed check-in that turns out to be
              "I forgot" trains the office to ignore the next missed check-in too.
            </p>
          </ConceptBlock>

          <Scenario
            title="The customer who tells you they smell gas"
            situation={
              <>
                You’re halfway through swapping a CU in a customer’s kitchen. The CU cover’s
                off, you’re stripping back tails, the breaker’s out and locked off. The
                customer comes in and says "I’m smelling gas in the back room — can you have
                a look?" There’s a definite sulphur smell when she opens the door.
              </>
            }
            whatToDo={
              <>
                <strong>STOP.</strong> Do not put the CU cover back on. Do not operate the
                main switch (creating a spark). Tell the customer to leave the property and
                stay outside. You leave too — taking phone, keys, nothing else. Open windows
                and doors on the way out IF you can do that without operating any switches.
                Once outside, call 0800 111 999 (National Gas Emergency Service). They’ll
                dispatch an engineer. Do not re-enter until the engineer says it’s safe. Once
                safe, you can return to finish the CU job — but the gas leak is the urgent
                thing and your CU work is irrelevant until it’s sorted. Note the incident
                in your day notes, and let your supervisor know.
              </>
            }
            whyItMatters={
              <>
                A small leak in a confined room can hit LEL fast. Operating a switch (any
                switch, not just the main switch you’re about to use) is enough to ignite it.
                The "no spark" rule is absolute around suspected gas leaks — it doesn’t care
                that you’re mid-job. Get out, ventilate from outside, call. Letting the
                customer "have a quick look" with you is the wrong answer; so is trying to
                isolate gas yourself if you’re not Gas Safe.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Wrapping up Module 1</ContentEyebrow>

          <ConceptBlock title="The thread through everything you’ve covered">
            <p>
              Module 1 has taken you from the Big Law (HASAWA in §1) through electrical
              hazards (§2), PPE (§3), site safety (§4), safe isolation (§5) and emergency
              response (§6). The thread running through all six sections is the same: <em>UK
              electrical work is safe by design when it’s done by the rules, and the rules
              exist because the lessons were paid for in blood</em>.
            </p>
            <p>
              You don’t need to learn all of it word-for-word. You need to know the SHAPE of it
              well enough to recognise when something’s going wrong and act. The next module
              shifts gear into electrical principles — the science behind why the regs are the
              regs. Same approach: learn the shape, build the muscle memory, ask when you’re
              not sure.
            </p>
            <p>
              Final thing: every emergency in this section gets easier the more you’ve thought
              about it BEFORE it happens. Don’t wait for the day. Run the scenarios in your
              head on the drive home. Know where the alarms, isolators and exits are on every
              site. The first time you do this for real should not be the first time you’ve
              done it at all.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="What’s next — Module 2: Principles of electrical science"
            plainEnglish="Module 1 was about staying safe. Module 2 is about understanding what’s actually happening behind the cover plate."
          >
            <p>
              Module 1 told you how to stay alive around 230 V and 400 V. Module 2 explains
              why 230 V at 50 Hz exists in the first place, where it comes from, and what it’s
              doing inside every conductor, terminal and protective device you’ll ever fit.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Maths and SI units</strong> — fractions, percentages, transposition,
                ratios, the seven SI base units, the prefixes (k, M, m, μ) and the
                instruments you’ll measure with. The maths the rest of the trade is written
                in.
              </li>
              <li>
                <strong>Basic mechanics</strong> — mass vs weight, force and Newtons, levers,
                gears, pulleys, work, energy, mechanical power, efficiency. The physics that
                shows up wherever you lift, hoist or torque on site.
              </li>
              <li>
                <strong>Electron theory, resistance, voltage and current</strong> — opening a
                conductor up and showing you what’s actually moving inside it. Conductors,
                insulators, resistivity, voltage drop, thermal and chemical effects.
              </li>
              <li>
                <strong>DC circuits — series, parallel and power</strong> — Ohm’s law in the
                wild, current and voltage division, total resistance in real circuits, P =
                I²R, worked examples that you’ll meet on every cable calc.
              </li>
              <li>
                <strong>Magnetism and electromagnetism</strong> — magnets, flux, the magnetic
                effect of a current, induction, EMF, the AC generator, sine waves at 50 Hz.
                Where AC actually comes from.
              </li>
              <li>
                <strong>Electronic components in electrical systems</strong> — resistors,
                diodes, capacitors, transistors, sensors and the on-site electronics inside
                every relay, RCD, AFDD and SPD on the board.
              </li>
            </ul>
            <p>
              Module 2 starts properly — every formula you’ll meet for the next 30+ Subs
              builds on it.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Same skeleton response across every emergency: STOP work → MAKE SAFE if you can → EVACUATE/CORDON → ESCALATE → stay until released.",
              "Gas leak: NO switch operation, evacuate, ventilate from outside, call 0800 111 999. CO alarm = same protocol.",
              "Structural collapse: don’t enter for rescue, voice contact only, 999 → USAR. Untrained rescue creates more casualties than it saves.",
              "Extreme weather: 30/30 lightning rule, heat stroke = 999 + aggressive cooling, hypothermia = slow rewarming.",
              "Suspect packages: HOT + 4 Cs (Confirm, Clear, Cordon, Control). 999. Anti-Terrorism Hotline 0800 789 321.",
              "Mental health emergencies are emergencies. Samaritans 116 123, CALM 0800 58 58 58, 999 if immediate self-harm risk. Confidentiality bends when life is at risk.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="General workplace emergency procedures — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section6/6-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Fire emergency procedures
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Next module — Principles of electrical science →
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
