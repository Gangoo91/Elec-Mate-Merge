/**
 * Ported from the English course, combining:
 *   level3/module1/section2/Sub4.tsx
 *   level3/module1/section2/Sub2.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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

const checks = [
  {
    id: 'l3-m1-s2-sub4-route',
    question:
      "You discover a customer has been bypassing an RCD by clipping the test button down. They're elderly and have safeguarding concerns. What's the L3 reporting route?",
    options: [
      'Leave the RCD as the customer has set it — it is their installation and their choice, and pointing out the danger is enough.',
      'Reinstate the RCD quietly and say nothing, to avoid embarrassing the customer or causing them anxiety about their safety.',
      'Multiple parallel routes — restore safety, inform the customer, escalate internally, consider a safeguarding referral, and document everything.',
      'Report the customer to the HSE for tampering with safety equipment, since interfering with an RCD is a criminal offence.',
    ],
    correctIndex: 2,
    explanation:
      "Reinstate the RCD and document with photos; inform the customer or their nominated representative; escalate to your firm's contracts manager / H&S manager; consider a local-authority adult social care referral if vulnerability is genuine; record it in the job pack. Multiple parallel duties = multiple parallel reports; the L3 step is recognising which routes apply to which issues.",
  },
  {
    id: 'l3-m1-s2-sub4-internal',
    question: 'What’s the difference between an "internal" and an "external" report?',
    options: [
      "Internal goes to your firm's responsible person; external goes to a regulator such as HSE, the Environment Agency or a scheme body.",
      'Internal = a verbal report; external = a written report. The only difference is whether the report is spoken or written down.',
      'Internal = reports made during the working day; external = reports made outside working hours to an out-of-hours line.',
      'Internal = reports about people; external = reports about equipment. The subject of the report decides which it is.',
    ],
    correctIndex: 0,
    explanation:
      "External regulators include HSE for H&S, Environment Agency for pollution, local authority for some EHO matters, and scheme bodies like NICEIC for installation defects. Most issues need both — internal first, then the firm's responsible person decides on external, unless the chain has demonstrably failed (then PIDA 1998 protects external escalation).",
  },
  {
    id: 'l3-m1-s2-sub4-near-miss',
    question:
      'You spot a near-miss on site — a colleague nearly fell from a step-up because the rubber feet had perished. No injury. What do you do?',
    options: [
      'Nothing formal — no one was hurt, so there is nothing to report; just mention it to the colleague to be careful.',
      'Report it to the HSE under RIDDOR within ten days, since a near-fall from height is a reportable dangerous occurrence.',
      "Log it internally, pull the step-up out of service and tag it, notify the firm's H&S manager, and check whether the fleet needs the same action.",
      'Quietly replace the perished feet yourself and carry on, so the step-up stays in use and no one is inconvenienced.',
    ],
    correctIndex: 2,
    explanation:
      "Most firms have a near-miss reporting system; if not, write it up. Consider whether the issue affects other equipment in the firm's fleet. Near-misses are the leading indicator that prevents incidents — Heinrich's ratio (300 near-misses : 30 minor injuries : 1 serious) frames why. The near-miss is the cheapest possible chance to prevent the serious incident.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Who is the "responsible person" for H&S reports within a firm?',
    options: [
      'The most junior apprentice, who collects reports and passes them up the chain to management.',
      'Usually the MHSWR Reg 7 designated competent person — H&S manager, contracts manager, Qualified Supervisor or director.',
      'The HSE inspector assigned to the firm, who receives all internal reports directly.',
      'Whoever happens to be the senior person on site that day, with the role passing to the next person when they leave.',
    ],
    correctAnswer: 1,
    explanation:
      "Every firm with 5+ employees should have one named in the H&S policy under the Reg 7 designation. Knowing your firm's named person is L3-essential.",
  },
  {
    id: 2,
    question: "What's the route for a RIDDOR-reportable incident?",
    options: [
      'The injured worker reports it themselves directly to the HSE, since it is their injury and their account that matters.',
      'Any operative on site can submit the F2508 online without involving management, to save time.',
      "Internal first — to the firm's Reg 3 responsible person, who makes the F2508 / F2508A submission; you escalate the facts, you don't report yourself.",
      "The customer reports it to their own insurer, who then notifies the HSE on the firm's behalf.",
    ],
    correctAnswer: 2,
    explanation:
      'The responsible person submits via riddor.hse.gov.uk, or phones 0345 300 9923 for fatalities/specified injuries. RIDDOR responsibility sits with the Reg 3 responsible person — typically the employer. Operatives escalate; the responsible person reports (unless you ARE the responsible person).',
  },
  {
    id: 3,
    question: "What's the route for an environmental hazard / pollution incident?",
    options: [
      'Report it only to the customer, since pollution on private land is a matter for the property owner alone.',
      'Report it to the HSE on form F2508, the same route as any health and safety incident.',
      'Report it to the local fire and rescue service, who deal with all environmental hazards.',
      'Internal to the firm, then external to the Environment Agency (England), SEPA (Scotland) or NRW (Wales) on the relevant pollution hotline.',
    ],
    correctAnswer: 3,
    explanation:
      'The EA pollution hotline is 0800 80 70 60 (24/7), covering controlled waters, water pollution, land contamination and hazardous-substance escape; the local authority handles noise nuisance and contaminated land. Environmental reporting has its own dedicated routes separate from H&S.',
  },
  {
    id: 4,
    question: 'What’s a "near-miss" and why does it matter?',
    options: [
      "An event that could have caused injury but didn't — and the leading indicator of where the next incident will happen.",
      'An injury that just falls short of being RIDDOR-reportable, such as a worker off for six days rather than seven.',
      'A fault on an installation that is found and corrected before the work is handed over to the customer.',
      'A delivery of materials that arrives later than planned but still in time to avoid delaying the job.',
    ],
    correctAnswer: 0,
    explanation:
      "Examples — a slip without a fall, a near-contact, a tool drop without injury, a small fire that self-extinguished. Internal reporting and review of near-misses is one of the highest-impact preventive activities. Heinrich's pyramid (loosely): many near-misses per minor injury, many minor injuries per serious incident. Tackle the near-miss and you reduce the major-incident rate.",
  },
  {
    id: 5,
    question: "What's the report route for a defective installation discovered during EICR?",
    options: [
      'Report it verbally to the customer only, since the EICR records test results and not defects.',
      'Code it on the EICR (C1 / C2 / C3 / FI), inform the dutyholder, and recommend remedial action with timescales appropriate to the code.',
      'Report it to the HSE under RIDDOR, since a dangerous installation is a reportable dangerous occurrence.',
      'Leave it unrecorded if the customer declines the remedial work, since coding a defect they will not fix is pointless.',
    ],
    correctAnswer: 1,
    explanation:
      'C1 is immediate danger (make safe on the day), C2 potentially dangerous, C3 improvement recommended, FI further investigation. The EICR itself is the formal report and goes to the dutyholder, whose duty under EAWR Reg 4(2) is to act on the findings. EICR coding is the L3-level professional reporting route for installation defects.',
  },
  {
    id: 6,
    question: 'When should you report a safeguarding concern about a customer?',
    options: [
      "Never — safeguarding is outside an electrician's role and raising a concern would breach the customer's privacy.",
      'Only when the customer specifically asks you for help with a personal or welfare matter.',
      'When you see signs of abuse, neglect, undue pressure or vulnerability beyond the scope of the job — raise it internally and signpost to social care.',
      'Only after you have investigated the situation yourself and confirmed that abuse or neglect is actually taking place.',
    ],
    correctAnswer: 2,
    explanation:
      "Report internally to your firm's safeguarding lead (where one exists) or contracts manager, and signpost to local authority adult or children's social care if appropriate. The Care Act 2014 (England) places statutory duties on local authorities — you don't make the assessment, you raise the concern; they assess.",
  },
  {
    id: 7,
    question: "What's the route for a defect that may indicate a wider product fault?",
    options: [
      'Replace the faulty item and say nothing, since one failure is not enough to suggest a wider problem.',
      'Report it directly to the HSE under RIDDOR, since a faulty product is a reportable dangerous occurrence.',
      'Post a warning about the product on social media so other electricians are aware of the fault.',
      "Report internally; if it looks systemic, escalate to the firm's technical lead to report to the manufacturer and the Office for Product Safety and Standards.",
    ],
    correctAnswer: 3,
    explanation:
      'A systemic defect (e.g. a brand of MCB failing prematurely across multiple installs) is escalated to the manufacturer, OPSS and the product-safety alert system. Product withdrawals and safety alerts come out of these channels — the trade press covers them and firms maintain product-safety registers.',
  },
  {
    id: 8,
    question: 'How does the L3 supervisor decide which report route to use?',
    options: [
      'Map the issue to its route — and recognise that multiple routes can apply to one incident simultaneously.',
      'Send every issue to the HSE first, since the HSE decides which other body should deal with it.',
      'Report everything only internally to the firm, and let the firm decide whether anything needs to go further.',
      'Choose whichever route is quickest at the time, since the important thing is that the issue is reported somewhere.',
    ],
    correctAnswer: 0,
    explanation:
      "Personal injury → RIDDOR + internal; equipment defect → internal + product reporting; environmental → EA/SEPA/NRW + internal; safeguarding → local authority + internal; installation defect → EICR + customer + internal; near-miss → internal log; HSE notice → firm's legal/H&S team. The mapping skill is L3-essential — knowing which route applies means concerns get to the right place at the right time.",
  },
];

const faqs = [
  {
    question: "What if my firm doesn't have a named H&S manager?",
    answer:
      'They’re required to have one if 5+ employees (MHSWR Reg 7). Ask the contracts manager or director who the designated competent person is. If the answer is "no-one", that’s itself a Reg 7 breach — escalate to a director and consider raising it externally if necessary.',
  },
  {
    question: 'Can I report a concern anonymously?',
    answer:
      "You can request anonymity from the firm's responsible person, and the HSE accepts anonymous tip-offs (though they're harder to act on). PIDA 1998 protections require you to be identifiable to claim them, but the act of reporting in good faith is protected regardless.",
  },
  {
    question: "What's the timescale for raising a near-miss internally?",
    answer:
      'Same day if practical. The next morning at the latest. Memory and detail fade fast; contemporaneous reports have more value.',
  },
  {
    question: 'Should I copy the customer on internal H&S reports?',
    answer:
      "Generally no — internal reports are for the firm's management. The customer gets information relevant to them (e.g. EICR results, RIDDOR reports affecting their premises) through appropriate channels.",
  },
  {
    question: "How do I report an HSE inspector's findings I disagree with?",
    answer:
      "Through the firm's legal / H&S team. Improvement notices have a 21-day appeal route to Employment Tribunal; FFI invoices have an internal HSE disputes panel. Don't engage directly with HSE on the firm's behalf without the firm's authority.",
  },
  {
    question: 'Are scheme bodies (NICEIC, NAPIT) reporting bodies?',
    answer:
      "They're registration bodies for installer competence, not regulators with statutory powers. But a serious installation defect or fraudulent cert can be reported to them and they can suspend / withdraw a firm's registration. Often the practical path for installer-level concerns when the firm itself is the issue.",
  },
  {
    question: 'How long should we keep records of an internal incident report?',
    answer:
      'RIDDOR records are statutorily 3 years (Reg 12), but Defective Premises Act / BSA 2022 considerations push residential incident records to 30 years in practice. Most firms now retain incident records indefinitely on digital backup.',
  },
  {
    question: 'If we self-report a breach to the HSE, does it reduce the fine?',
    answer:
      "Self-reporting and cooperation are explicit mitigating factors in the Sentencing Council Definitive Guideline for Health and Safety Offences (2016). They don't guarantee no prosecution, but they reduce the band considerably. The HSE Enforcement Management Model also gives weight to voluntary remediation. Honest self-reporting is almost always the lower-cost path.",
  },
  {
    question: 'What’s the "Concerns and Advice" line at HSE for?',
    answer:
      "It's for members of the public, workers and other interested parties to raise safety concerns about workplaces. Phone 0300 003 1647 or web form at hse.gov.uk/contact/concerns. The HSE triages and decides whether to act. Useful when internal escalation has failed and external route is appropriate under PIDA 1998.",
  },
  {
    question:
      'How does the "responsible person" under RIDDOR differ from the MHSWR Reg 7 competent person?',
    answer:
      'Different roles. The MHSWR Reg 7 competent person is the firm’s designated H&S adviser who assists in undertaking H&S measures generally. The RIDDOR Reg 3 responsible person is whoever is responsible for making the formal report under that regulation — usually the employer (for employee incidents), the self-employed person (for themselves), or the person in control of premises (for some categories). The two can be the same person in practice but the statutory hooks are distinct. The L3 operative escalates to whichever role applies to the incident in front of them.',
  },
  {
    question: 'Are we required to publish near-miss data internally to operatives?',
    answer:
      'Not by name, but Reg 13 of MHSWR requires the employer to provide employees with comprehensible information on the risks identified by the assessment. Many firms anonymise near-miss data and share monthly bulletins or toolbox talks summarising trends. Transparent near-miss reporting is one of the strongest leading indicators of safety culture; firms that hide near-miss data tend to be the ones where the next significant incident is brewing.',
  },
  {
    question: 'What happens if the firm refuses to submit a RIDDOR report I’ve raised?',
    answer:
      'Document the refusal in writing. Escalate to a director if the responsible person is refusing. If the firm persists in refusing what you reasonably believe is a reportable matter, PIDA 1998 protects external disclosure to the HSE (a prescribed person under s.43F ERA 1996). The HSE concerns line at 0300 003 1647 or the online form is the route. Failure to report is itself a separate offence under RIDDOR Reg 6 and HASAWA s.33.',
  },
];

const checks2 = [
  {
    id: 'l3-m1-s2-sub2-fire-alarm',
    question:
      "The fire alarm sounds during your work in a commercial unit. Your tools are in the work area, the customer is asking you 'is this real?', and your van keys are at the muster point. What do you do?",
    options: [
      'Carry on working but stay alert — most alarms are false, so wait until you can smell smoke or see flames yourself before you stop work and decide whether to leave the area.',
      'Pack up and secure your tools, then collect your van keys from the muster point on the way out, so nothing of value is lost or damaged during the evacuation.',
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
      'Throw a bucket of water over the consumer unit straight away to knock the flames down before they can spread to the surrounding fabric and the timber behind the board.',
      'Isolate at the meter/cut-out if safely accessible (not in the burning CU), evacuate, use a CO2 or dry-powder extinguisher only if trained with a small fire and the exit behind you, call 999, stay out and preserve the scene.',
      'Reach into the consumer unit and pull the burning RCBOs and tails out by hand to remove the fuel from the fire, then dampen the area down once the burning parts are clear of the board.',
      'Leave the supply switched on so the protective devices keep working, and aim a foam extinguisher directly into the consumer unit to smother the flames at their source.',
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
      'Offer to go back inside yourself for a quick sweep before the crew commit, so they have confirmed information about who is still in the building and where.',
      "Provide only what you actually know from the muster account-for: who arrived, who didn't, and the last known location of anyone missing. Don't speculate — accurate information directs rescue; a guess sends them into danger for no one.",
    ],
    correctIndex: 3,
    explanation:
      "Account-for is the supervisor act that creates the data the fire service needs. 'Who came out, who didn't, where last seen' — accurate information saves rescuers from entering speculatively and saves missing persons from being missed in the count.",
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question: "What's the appropriate response to a fire alarm in a building you don't know well?",
    options: [
      "Carry on working until someone in authority comes to confirm it is a genuine fire rather than a test, so you don't lose time stopping for what is probably a false alarm.",
      'Stop, leave tools, follow the planned escape route to the muster point, bring any non-employees with you, and await account-for and the all-clear from the responsible person.',
      'Find the alarm panel first and silence it so you can investigate where the signal came from and decide for yourself whether the building genuinely needs to be cleared.',
      'Gather your tools and materials together so nothing is lost or damaged, then make your way out of the building at your own pace once everything is packed away.',
    ],
    correctAnswer: 1,
    explanation:
      'L2 baseline reflex; L3 add — actively bringing non-employees with you discharges the s.3 duty.',
  },
  {
    id: 2,
    question: 'What are the 5 fire-extinguisher classes and their colour codes (UK BS EN 3)?',
    options: [
      'Class A (solids) — CO2 (black); Class B (liquids) — water (red); Class C (gases) — foam (cream); Class D (metals) — water (red); Class F (cooking oils) — dry powder (blue).',
      'Class A (solids) — wet chemical (yellow); Class B (liquids) — water (red); Class C (electrical) — foam (cream); Class D (gases) — CO2 (black); Class F (metals) — dry powder (blue).',
      'Class A (solids) — water (red); Class B (flammable liquids) — foam (cream) or CO2 (black); Class C (flammable gases) — dry powder (blue); Class D (metals) — specialist dry powder; Class F (cooking oils) — wet chemical (yellow). Electrical fires have no class letter — CO2 or dry powder, never water.',
      'Class A (solids) — foam (cream); Class B (liquids) — dry powder (blue); Class C (electrical) — water (red); Class D (cooking oils) — CO2 (black); Class F (metals) — wet chemical (yellow).',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 3 standardises extinguisher colour codes — the body is red, the label colour identifies the type. For electrical fires CO2 or dry powder; never water (which conducts) or foam (most foam is water-based).',
  },
  {
    id: 3,
    question: "What's the responsible person's duty during a fire-alarm evacuation?",
    options: [
      'Stay at their desk to keep the business running and protect equipment and records, since most alarms are false and a full evacuation each time would be hugely disruptive to the organisation.',
      'Wait for the fire service to arrive and take charge of the situation before anyone is asked to leave, because the decision to evacuate a whole building rests with the attending crew.',
      'Personally search every room for the source of the fire to confirm it is genuine before deciding whether an evacuation of the building is actually necessary.',
      "Lead or coordinate the evacuation per the building's fire strategy, ensure everyone exits by planned routes, account for personnel at the muster, liaise with the fire service and prevent re-entry until the all-clear (RRFSO 2005).",
    ],
    correctAnswer: 3,
    explanation:
      "RRFSO 2005 places the lead duty on the 'responsible person' — usually the building owner / managing agent / employer. As an L3 visiting electrician you cooperate with their procedure, not lead it (unless you're the senior person on a small site without a designated responsible person).",
  },
  {
    id: 4,
    question: 'When can you safely use an extinguisher on a small fire?',
    options: [
      "Only when you're trained, the fire is small (waste-bin sized), you have the correct extinguisher class, the exit is behind you, you're not at risk, and 999 is being called. Otherwise evacuate.",
      'Whenever an extinguisher is within reach, because tackling any fire in its first minute is always safer than waiting for the fire service to arrive and deal with it.',
      'Only after the building has been fully evacuated and the attending fire service has given you explicit permission to re-enter and help them tackle the remaining fire.',
      'As long as you grab the nearest extinguisher and act quickly, since the class of extinguisher does not matter much for a small fire that has been caught early.',
    ],
    correctAnswer: 0,
    explanation:
      "Untrained extinguisher use commonly makes things worse — wrong class, splash spread of flammable liquid, smoke pushed into the operator's face. The L3 default is evacuate; fight only when conditions permit.",
  },
  {
    id: 5,
    question: "What's a 'PEEP' (Personal Emergency Evacuation Plan)?",
    options: [
      'A pre-task safety briefing given to every operative before they start a high-risk activity such as work at height or entry into a confined space, covering the hazards and controls.',
      'A bespoke evacuation plan for a person who cannot use the standard route unaided. Required under the Equality Act 2010 and RRFSO 2005; covers refuge points, designated buddies, communication aids and re-entry.',
      'A personal record an apprentice keeps of the site-specific emergency procedures they have been inducted into, signed off by the supervisor at each new site they work on.',
      'A plan showing the location of every extinguisher, fire-alarm call point and emergency exit throughout a commercial building, used to brief new staff during their induction.',
    ],
    correctAnswer: 1,
    explanation:
      'PEEPs are required where a person needs assistance to evacuate. On a commercial site you may meet them — vulnerable customers, contractors, visitors. Knowing the term and the responsible-person duty to provide them is L3-essential.',
  },
  {
    id: 6,
    question: 'What does the Regulatory Reform (Fire Safety) Order 2005 require?',
    options: [
      'It requires every electrical installation to be inspected and tested to BS 7671 at least once every five years in all workplaces and rented premises, enforced by the local authority.',
      'It places a duty on every worker to report fire hazards they notice to the principal contractor, sitting alongside the worker co-operation duties set out in CDM 2015.',
      "It requires the 'responsible person' to carry out a fire risk assessment and provide and maintain means of escape, detection, alarm and fire-fighting equipment plus information and training. Enforced by the Fire and Rescue Service.",
      'It sets the design and installation standards for emergency lighting and fire-alarm systems in non-domestic buildings, consolidating and replacing BS 5266 and BS 5839.',
    ],
    correctAnswer: 2,
    explanation:
      'RRFSO is the fire-safety equivalent of HASAWA in scope. Building Safety Act 2022 amended specific elements; RRFSO remains the central duty hub. Fire and Rescue Services enforce; prosecutions for failures are increasing.',
  },
  {
    id: 7,
    question: "What's the L3 supervisor's role during a building evacuation?",
    options: [
      "Take charge of the whole building's evacuation, overriding the building's responsible person where necessary and directing all occupants — staff, visitors and other trades — to the nearest exits.",
      'Return to the work area to isolate and make the electrical installation safe first, then join the rest of the team at the muster point once the equipment has been left in a safe state.',
      "Wait by the van for the fire service to arrive and leave the muster-point account entirely to the building's own staff, since they know the occupants and the building far better than you do.",
      "Account for your firm's personnel, ensure customers/visitors in your care have evacuated, liaise with the responsible person and fire-marshal, give the fire service accurate information if asked, and prevent re-entry.",
    ],
    correctAnswer: 3,
    explanation:
      'Account-for is the single most-impactful supervisor act in an evacuation. The fire service uses your data to decide whether rescue entry is needed.',
  },
  {
    id: 8,
    question: 'After an emergency event, what evidence should the L3 supervisor preserve?',
    options: [
      'Photos of the scene as evacuated, witness identities and contacts, a written first-hand account, equipment positions, any nearby CCTV, building-manager contacts, and any fault that may have contributed.',
      "Nothing beyond getting the team back to productive work — once the fire service has given the all-clear the event is closed and preserving evidence is the building owner's job, not the firm's.",
      "Only the customer's signature confirming the work is complete and that they are happy for the firm to leave site, since that signed sign-off is the single document the firm needs to close the job after an event.",
      'Just a verbal report to the office at the end of the day is enough; written records and photographs are only worth taking for fatal incidents or where the HSE has already announced it will investigate.',
    ],
    correctAnswer: 0,
    explanation:
      "Same evidence-preservation discipline as accident response. The supervisor's job after the immediate response is to preserve what the regulator and the firm's defence will need.",
  },
];

const faqs2 = [
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
    question: 'Can I re-enter the building once the alarm has stopped?',
    answer:
      'Only when the responsible person (building manager / fire marshal) gives the explicit all-clear. Alarms can be silenced for investigation while the building is still unsafe. Premature re-entry has been a contributing factor in serious fire injuries.',
  },
  {
    question: 'Should I attempt CPR / first aid during an evacuation?',
    answer:
      "If a casualty cannot be moved and you're trained, render assistance until emergency services arrive — but do not put yourself or others at additional fire risk. Better to move the casualty to a safer location if possible. Communicate with the responsible person and the fire service.",
  },
  {
    question: "What's the difference between Stage 1, Stage 2 and full evacuation?",
    answer:
      "Some buildings (notably hospitals, large complexes) use phased evacuation. Stage 1 = nearest occupants to the alarm leave; Stage 2 = adjacent floors leave; full = everyone leaves. The building's strategy will be in its fire safety plan. As a visitor you follow the building's strategy and the responsible person's directions.",
  },
  {
    question: 'What if the customer wants to keep working through the alarm?',
    answer:
      "You evacuate regardless; you cannot make the customer evacuate but you can strongly recommend it and document the interaction. Your s.3 duty is to take reasonable steps; if the customer refuses you've done what you can. Don't stay with them — your s.7 duty to yourself doesn't bend to their preference.",
  },
];

export default function Lesson303_13_1() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        {
          'Remember from L2 — escalate to a responsible person. At L3 the depth is identifying WHICH responsible person for which kind of issue, and recognising that multiple parallel routes often apply simultaneously.'
        }
      </p>

      <TLDR
        points={[
          'Multiple reporting routes exist in parallel — internal (firm), RIDDOR (HSE), environmental (EA/SEPA/NRW), safeguarding (local authority), scheme body (NICEIC/NAPIT), product safety (OPSS). One incident often needs several.',
          "The 'responsible person' under MHSWR Reg 7 is the firm's designated competent person — usually H&S manager, contracts manager, Qualified Supervisor or director.",
          'Internal first is the discipline — except where internal escalation has demonstrably failed (then PIDA 1998 protects external).',
          'Near-miss reports are the highest-value preventive activity. Whirlpool £15m (2018) shows unreported near-misses become aggravating factors after a fatality.',
          'EICR coding (C1 / C2 / C3 / FI) is the L3-professional report route for installation defects — formal, structured, addressed to the dutyholder.',
          'HASAWA s.20 inspector interviews are not the same as PACE-cautioned interviews. Know which you’re in before answering questions that probe your own liability.',
        ]}
      />
      <LearningOutcomes
        outcomes={[
          'Identify the responsible persons for different categories of H&S report — internal, RIDDOR, environmental, safeguarding, product, scheme.',
          'Apply the principle of parallel reporting (one incident = multiple appropriate routes).',
          'Distinguish near-miss from incident and apply same-day internal reporting discipline.',
          'Identify the EICR coding system as the formal report route for installation defects.',
          'Apply Care Act 2014 safeguarding awareness — raising the concern, not making the assessment.',
          'Recognise product-safety reporting routes via Office for Product Safety and Standards (OPSS) and trade body alerts.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Internal reporting — the firm's responsible person</ContentEyebrow>
      <ConceptBlock
        title="MHSWR Reg 7 designated competent person"
        plainEnglish="Every firm with 5+ employees must have a designated competent person to assist in undertaking H&S measures. This is your first internal escalation address — usually the H&S manager, contracts manager, Qualified Supervisor or a director."
        onSite="Find out who this is for YOUR firm on day one. The H&S policy will name them. If the policy doesn’t exist or doesn’t name them, that’s itself a Reg 7 / s.2(3) breach to flag."
      >
        <p>Internal report categories:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Incidents and near-misses</strong> — same day report.
          </li>
          <li>
            <strong>Equipment defects</strong> — pull from service, tag, internal report.
          </li>
          <li>
            <strong>Procedure failures</strong> — RAMS doesn&apos;t match the site, instructions
            missing, training gap identified.
          </li>
          <li>
            <strong>Customer / site concerns</strong> — vulnerable persons, dangerous occupant
            behaviour, safeguarding indicators.
          </li>
          <li>
            <strong>Inspector visit</strong> — immediate phone notification of any HSE / EA visit.
          </li>
          <li>
            <strong>Concerns about colleagues</strong> — competence, behaviour, fitness for duty.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Near-miss culture"
        plainEnglish="Near-misses are events that could have caused injury but didn’t. Reporting them is the cheapest way to prevent the next incident — Heinrich’s loose ratio of 300:30:1 (near-misses : minor : serious) is a memory aid."
        onSite="Most firms have an electronic near-miss reporting form. If yours doesn’t, write a short note in the job pack. Make it routine — if the only thing that gets reported is actual injury, the firm misses the leading indicators."
      >
        <p>What counts as a near-miss worth reporting:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Slip without a fall.</li>
          <li>Tool drop from height with no injury.</li>
          <li>Stepladder wobble that didn&apos;t fall.</li>
          <li>Cable detector miss that didn&apos;t lead to a strike.</li>
          <li>Small fire that self-extinguished.</li>
          <li>Tripped breaker that wasn&apos;t expected.</li>
          <li>Safe-isolation lock-off bypass discovered.</li>
          <li>
            Customer behaviour that put you in difficulty (running children near work area,
            aggressive interaction).
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Management of Health and Safety at Work Regulations 1999 — Reg 7(1)"
        clause={
          <>
            "Every employer shall, subject to paragraphs (6) and (7), appoint one or more
            competent persons to assist him in undertaking the measures he needs to take to comply
            with the requirements and prohibitions imposed upon him by or under the relevant
            statutory provisions and by Part II of the Fire Precautions (Workplace) Regulations
            1997."
          </>
        }
        meaning={
          <>
            The Reg 7 competent person is the firm&apos;s &quot;responsible person&quot; for
            H&amp;S reporting. Reg 7(8) defines competence as having &quot;sufficient training and
            experience or knowledge and other qualities&quot; for the role. In a small electrical
            firm this is often the Qualified Supervisor (NICEIC / NAPIT designation); in a larger
            firm a separate H&amp;S manager.
          </>
        }
        cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 7."
      />

      <InlineCheck {...checks[0]} />

      <SectionRule />
      <ContentEyebrow>External reporting routes</ContentEyebrow>
      <ConceptBlock
        title="Multiple regulators, multiple routes"
        plainEnglish="External reports go to the appropriate regulator depending on the issue type. RIDDOR-reportable injuries → HSE. Pollution → Environment Agency / SEPA / NRW. Safeguarding → local authority. Product safety → manufacturer + OPSS. Installation defects with scheme implications → NICEIC / NAPIT. Each has its own route and timescale."
        onSite="The L3 mapping skill: when an issue arises, identify which regulator(s) and route(s) apply. Internal first; then external via the firm’s responsible person; then direct external (PIDA-protected) only if internal has failed."
      >
        <p>External regulator quick-reference:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>HSE</strong> — workplace H&amp;S, RIDDOR. Online: hse.gov.uk; phone: 0345 300
            9923.
          </li>
          <li>
            <strong>Local Authority EHO</strong> — H&amp;S in retail/office/leisure/residential;
            statutory nuisance.
          </li>
          <li>
            <strong>Environment Agency</strong> (England) — pollution, waste, contaminated land.
            0800 80 70 60 (24/7).
          </li>
          <li>
            <strong>SEPA</strong> (Scotland) — same scope, separate body.
          </li>
          <li>
            <strong>NRW</strong> (Wales) — same scope, separate body.
          </li>
          <li>
            <strong>Local Authority Adult/Children&apos;s Social Care</strong> — safeguarding
            referrals.
          </li>
          <li>
            <strong>OPSS</strong> — product safety alerts and recalls.
          </li>
          <li>
            <strong>NICEIC / NAPIT / Stroma / ELECSA</strong> — installer competence schemes;
            complaints and defective work.
          </li>
          <li>
            <strong>Building Safety Regulator</strong> (BSR, within HSE) — HRRB matters under BSA
            2022.
          </li>
          <li>
            <strong>Fire and Rescue Service</strong> — RRFSO 2005 fire safety enforcement.
          </li>
          <li>
            <strong>Gas Safe Register</strong> — gas safety / unauthorised gas work.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="EICR — the formal report route for installation defects"
        plainEnglish="Electrical Installation Condition Reports are the L3-relevant formal route for reporting installation defects. The coding system (C1/C2/C3/FI) is the structured way to communicate severity to the dutyholder."
        onSite="C1 = immediate danger; remedial action required immediately, often before leaving site. C2 = potentially dangerous; remedial action urgent. C3 = improvement recommended; not unsafe but doesn’t comply with current edition. FI = further investigation needed. The EICR goes to the dutyholder; their EAWR Reg 4(2) duty drives the response."
      >
        <p>EICR coding shorthand:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>C1 — Danger present</strong>. Immediate action — make safe on the day or
            escalate.
          </li>
          <li>
            <strong>C2 — Potentially dangerous</strong>. Remedial action urgent.
          </li>
          <li>
            <strong>C3 — Improvement recommended</strong>. Not currently unsafe but doesn&apos;t
            meet current edition.
          </li>
          <li>
            <strong>FI — Further investigation</strong>. Cause of finding cannot be established
            without intrusive work.
          </li>
          <li>Overall outcome: Satisfactory only if no C1 / C2 / FI present.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck {...checks[1]} />

      <SectionRule />
      <ContentEyebrow>Safeguarding awareness</ContentEyebrow>
      <ConceptBlock
        title="Care Act 2014 — raise the concern, don’t make the assessment"
        plainEnglish="Visiting electricians are sometimes the only outside contact a vulnerable adult has in a week. Recognising signs of abuse, neglect or undue pressure — and knowing how to raise it — is a real-world part of L3 trade work, even though it isn’t the C&G syllabus headline."
        onSite="If something doesn’t feel right — bruising the customer doesn’t explain, a relative who pushes the customer around verbally, evidence of self-neglect, signs of cognitive impairment with no support visible — raise it. Internally to your firm; externally to local authority adult social care if you believe there’s a safeguarding need. You raise; they assess."
      >
        <p>Practical signposting:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Internal — firm&apos;s safeguarding lead (where one exists) or contracts manager.
          </li>
          <li>
            Local authority — adult social care (Care Act 2014) for adults; children&apos;s social
            care (Children Act 1989) for children.
          </li>
          <li>
            Police — if you witness an immediate safeguarding crime in progress (assault etc).
          </li>
          <li>
            NSPCC helpline — if children are at risk and immediate police isn&apos;t appropriate.
          </li>
          <li>
            Document what you observed and what you reported. Don&apos;t investigate or interview
            the suspected victim.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck {...checks[2]} />

      <SectionRule />
      <ContentEyebrow>HSE concerns line — when external is the right route</ContentEyebrow>

      <ConceptBlock
        title="The 0300 003 1647 line and the online concerns form"
        plainEnglish="The HSE operates a Concerns and Advice line for members of the public, workers and others who want to report safety issues. Phone 0300 003 1647; web form via hse.gov.uk/contact/concerns. Reports can be anonymous (though anonymous reports are harder to act on). The HSE doesn’t investigate every concern — they triage by risk, evidence and pattern — but every concern is logged and contributes to the inspector’s intelligence picture."
        onSite="At L3 the external HSE concerns route is the option you reach for when internal escalation has demonstrably failed and the issue is significant enough to warrant external attention. PIDA 1998 protects the disclosure provided the conditions are met. Use it sparingly and seriously — the HSE relies on credible reporters and discounts vexatious or trivial complaints quickly."
      >
        <p>What to include in an HSE concerns report:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Specific facts</strong> — what, where, when, who, how often. Photos if you
            have them lawfully.
          </li>
          <li>
            <strong>Regulation breached</strong> — name the relevant statute or regulation if you
            know it.
          </li>
          <li>
            <strong>Internal escalation history</strong> — what you raised internally, when,
            response received.
          </li>
          <li>
            <strong>Risk and harm</strong> — what could happen, who is at risk, has anyone been
            hurt yet.
          </li>
          <li>
            <strong>Your relationship to the issue</strong> — worker, contractor, customer,
            neighbour, member of the public.
          </li>
          <li>
            <strong>Contact details</strong> — anonymous reporting is allowed but contactable
            reports get follow-up that anonymous can&apos;t.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>Scheme body complaints — when the firm is the issue</ContentEyebrow>

      <ConceptBlock
        title="NICEIC, NAPIT and the scheme’s complaint route"
        plainEnglish="Competent Person Schemes — NICEIC, NAPIT, Stroma, ELECSA, Certsure — are voluntary registration bodies that audit firm and Qualified Supervisor competence. They run formal complaints processes. A complaint can result in re-audit, additional inspection visits, training requirements, suspension or removal of registration. For installation defects on registered firm work, the scheme is often the most practically effective route — particularly when the customer can’t get the firm to put right defective work."
        onSite="At L3 the scheme route comes up most often when a customer engages your firm to remediate work done by another scheme-registered firm. Your firm typically has a duty to flag the defective work to the scheme; the scheme then investigates. Anonymity for the reporting firm is normally protected. The route is used regularly and works."
      >
        <p>When to use the scheme complaint route:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Defective work by a scheme-registered firm</strong> that the firm won&apos;t
            put right when challenged.
          </li>
          <li>
            <strong>Fraudulent certificates</strong> — EICs / EICRs / Minor Works that don&apos;t
            reflect work actually done.
          </li>
          <li>
            <strong>
              Work claimed as compliant under Approved Doc P that wasn&apos;t notified
            </strong>{' '}
            — the scheme should have notified Building Control on the firm&apos;s behalf.
          </li>
          <li>
            <strong>Use of scheme branding by an unregistered firm</strong> — passing-off fraud.
          </li>
          <li>
            <strong>Pattern of poor work across multiple jobs</strong> by a registered Qualified
            Supervisor.
          </li>
          <li>
            <strong>
              Failure to honour the scheme&apos;s warranty / consumer-protection provisions
            </strong>
            .
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>
        Pre-qualification questionnaires — the commercial-impact layer
      </ContentEyebrow>

      <ConceptBlock
        title="Why your firm’s reporting record affects what work you can bid for"
        plainEnglish="Major clients (housing associations, NHS trusts, local authorities, framework agreements like CHAS / Constructionline / SafeContractor / Achilles) operate Pre-Qualification Questionnaires (PQQ) that ask for declarations of HSE notices, RIDDOR reports, prosecutions, FFI invoices and disciplinary actions in the past 3-5 years. A clean record opens doors; a poor record closes them. The PQQ effect is often the firm’s biggest commercial driver of safety culture — bigger than fines."
        onSite="At L3 you contribute to the firm’s PQQ record every time you raise a near-miss, close out an action, follow safe-isolation procedures and document the work properly. The accumulated record across the firm becomes the evidence at the next PQQ submission. The firm’s ability to bid for the next major framework depends on what you and your colleagues did over the past 3 years."
      >
        <p>What PQQs typically ask:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>HSE notices in past 3-5 years</strong> — declared with detail.
          </li>
          <li>
            <strong>Convictions for H&amp;S offences</strong> — including under HASAWA, EAWR, CDM.
          </li>
          <li>
            <strong>RIDDOR-reportable incidents</strong> — number per year per 100,000 hours
            worked. Comparison against industry average.
          </li>
          <li>
            <strong>Insurance claims experience</strong> — Employer&apos;s Liability and Public
            Liability claims.
          </li>
          <li>
            <strong>Training records</strong> — proportion of operatives with current
            qualifications and CPD.
          </li>
          <li>
            <strong>Scheme registrations and accreditations</strong> — NICEIC, NAPIT, CHAS,
            Constructionline, ISO 45001, ISO 14001.
          </li>
          <li>
            <strong>Sample RAMS and method statements</strong> — for similar projects.
          </li>
          <li>
            <strong>References</strong> — from previous projects of similar size and risk.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 — Reg 12"
        clause={
          <>
            &quot;The responsible person must keep a record of any reportable injury, disease or
            dangerous occurrence which requires reporting under regulations 4, 5, 6 or 7. The
            record must be kept for at least 3 years from the date on which it was made.&quot;
          </>
        }
        meaning={
          <>
            The 3-year retention duty. Most firms keep RIDDOR records far longer for PQQ purposes
            (clients commonly ask for 5+ years) and for Defective Premises Act purposes (BSA 2022
            extension to 30-year retrospective limit on residential). The retention duty applies
            to the responsible person — usually the employer — and the records must be available
            for inspection.
          </>
        }
        cite="Source: Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471), Reg 12."
      />

      <RegsCallout
        source="Health and Safety at Work etc. Act 1974 — s.37(1)"
        clause={
          <>
            &quot;Where an offence under any of the relevant statutory provisions committed by a
            body corporate is proved to have been committed with the consent or connivance of, or
            to have been attributable to any neglect on the part of, any director, manager,
            secretary or other similar officer of the body corporate or a person who was
            purporting to act in any such capacity, he as well as the body corporate shall be
            guilty of that offence and shall be liable to be proceeded against and punished
            accordingly.&quot;
          </>
        }
        meaning={
          <>
            Director-level personal liability. When an internal report is escalated and the
            &quot;responsible person&quot; chooses not to act, s.37 reaches them personally — not
            just the company. This is why robust internal reporting systems matter: the paper
            trail showing an issue was raised and ignored is exactly the evidence that converts a
            corporate prosecution into a personal one. The L3 escalation discipline (verbal plus
            written, copies retained) protects both you and forces the responsible person to
            engage.
          </>
        }
        cite="Source: Health and Safety at Work etc. Act 1974 (1974 c.37), s.37."
      />

      <SectionRule />
      <ContentEyebrow>
        Defective Premises Act &amp; the BSA 2022 retrospective tail
      </ContentEyebrow>

      <ConceptBlock
        title="Why electrical defects in dwellings can come back 30 years later"
        plainEnglish="The Defective Premises Act 1972 s.1 places a duty on anyone taking on work for or in connection with the provision of a dwelling to ensure the work is done in a workmanlike manner with proper materials and the dwelling is fit for habitation. Originally there was a 6-year limitation. The Building Safety Act 2022 s.135 extended this dramatically: for works completed before 28 June 2022, the limitation is 30 years retrospective; for works after that date, 15 years prospective. An electrical defect in a 2024 CU change can be litigated to 2039; in a 2010 install, until 2040. Reporting and record-keeping take on a different gravity at those timescales."
        onSite="The L3 reporting discipline directly shapes the firm’s defensibility decades into the future. The job-pack note, the witness inspection record, the EICR coding, the customer briefing — all become the evidence base if the work is challenged years later by a future homeowner. Records that ’might as well be kept’ suddenly are the firm’s primary defence."
      >
        <p>What needs to survive 30 years of records:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Original certificate</strong> (EIC, MWC, EICR) — model form, schedule of
            inspections, schedule of test results, signatures.
          </li>
          <li>
            <strong>Photos of installation</strong> — pre-, during-, and post-work conditions;
            cable routing; CU layout.
          </li>
          <li>
            <strong>Job-pack notes</strong> — what was done, what was found, what was left.
          </li>
          <li>
            <strong>Customer correspondence</strong> — emails, signed acceptance forms, briefings
            on remaining issues.
          </li>
          <li>
            <strong>Materials records</strong> — manufacturers, batch numbers, sources; relevant
            where a future product-defect claim might attach.
          </li>
          <li>
            <strong>Operative records</strong> — who did the work, what their qualifications were
            at the time.
          </li>
          <li>
            <strong>Scheme registration evidence</strong> — for the relevant period.
          </li>
          <li>
            <strong>Insurance records</strong> — PI / EL cover at the time of the work
            (claims-made vs occurrence basis matters here).
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>
        Internal incident-management triangle — RIDDOR + insurance + customer comms
      </ContentEyebrow>

      <ConceptBlock
        title="The three parallel streams after any significant incident"
        plainEnglish="Any significant incident generates three parallel reporting streams that must be managed together: the regulatory stream (RIDDOR via HSE, plus any environmental, fire or scheme regulator), the insurance stream (EL, PL, PI insurer notifications), and the customer/contractual stream (the customer or principal contractor, framework agreement notification obligations, possible PR/comms). Each has its own audience, timescale and legal weight. Confusion between the three is one of the most common ways firms get themselves into deeper trouble after an incident."
        onSite="L3 contribution to this triangle: feed the firm’s responsible person clean, consistent facts. The same factual core should flow to all three streams; what differs is the framing, the level of detail, and the timescale. Resist the temptation to brief the customer differently from the regulator — inconsistent accounts get discovered and damage credibility."
      >
        <p>The three streams compared:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Regulatory (HSE / EA / scheme)</strong> — formal report under statute or
            scheme rules; timescale mandated; format prescribed (F2508 etc); investigator
            follow-up expected.
          </li>
          <li>
            <strong>Insurance (EL / PL / PI)</strong> — &quot;notification of circumstances&quot;
            under policy terms; usually within 7-14 days from awareness; insurer assigns claims
            handler, may take conduct of any resulting claim.
          </li>
          <li>
            <strong>Customer / contractual</strong> — courtesy and contractual obligation; usually
            same-day for serious matters; tone is supportive, factual, professionally framed.
          </li>
          <li>
            <strong>Internal</strong> — root-cause analysis, lessons learned, fleet / procedure /
            training updates; weeks-to-months timescale.
          </li>
          <li>
            <strong>Press / public</strong> — only via firm&apos;s designated spokesperson;
            operatives should not comment to media.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <CommonMistake
        title='"Just telling the supervisor" and assuming it goes from there'
        whatHappens={
          <>
            Apprentice spots a near-miss on a customer&apos;s site (faulty step-up). Mentions it
            to the supervisor verbally over the phone. Supervisor forgets. Three weeks later a
            different operative falls from the same step-up; injury results. Investigation finds
            the original near-miss wasn&apos;t logged. Firm prosecuted; original apprentice
            &quot;told someone&quot; but didn&apos;t document.
          </>
        }
        doInstead={
          <>
            Verbal + written. Phone the supervisor AND log the near-miss in the firm&apos;s system
            AND email the supervisor with the details. Triple-channel reporting for anything
            safety-relevant. The cost is two minutes; the benefit is creating a record that
            survives memory failure.
          </>
        }
      />

      <CommonMistake
        title="Reporting an HSE-reportable matter directly without internal escalation"
        whatHappens={
          <>
            Apprentice unilaterally calls HSE about a workplace concern without first escalating
            internally. HSE attends; firm is blindsided; the underlying concern was real but the
            relationship is destroyed; apprentice loses the protection of having gone through
            proper channels.
          </>
        }
        doInstead={
          <>
            Internal first — give the firm a reasonable opportunity to address the concern. PIDA
            1998 protections for external disclosure require (in most cases) internal route to
            have been tried OR for there to be evidence internal route would be ineffective (e.g.
            firm complicit). Document the internal route; only go external when it&apos;s
            demonstrably failed.
          </>
        }
      />

      <Scenario
        title="Multiple parallel reports for one incident"
        situation={
          <>
            You arrive at a small commercial unit to investigate a flickering circuit. You find:
            (1) the customer has been bypassing the RCD by clipping the test button; (2) the
            customer is an elderly lone trader who seems confused; (3) there&apos;s a small smoke
            mark on the consumer unit suggesting a previous overheat event; (4) you notice the
            building&apos;s fire alarm is showing a fault and the panel says &quot;disabled&quot;;
            (5) the customer&apos;s landlord is on speakerphone pressuring them to &quot;not worry
            about all this stuff&quot;.
          </>
        }
        whatToDo={
          <>
            Map the multiple parallel routes. (1) Restore safe isolation immediately — reinstate
            the RCD if possible; if you can&apos;t make safe today, leave the supply isolated and
            document with photos. EICR coding C1 for the bypass; C2 / FI for the smoke mark
            depending on what you can determine. (2) Internal report to your firm&apos;s contracts
            manager / H&amp;S manager — pressure from landlord is a customer-care escalation;
            possible safeguarding concern about confused elderly customer. (3) Customer
            notification of the EICR findings in writing; copy to landlord if customer authorises.
            (4) Fire alarm disabled is a Regulatory Reform (Fire Safety) Order 2005 issue — the
            responsible person (likely the landlord) is in breach; advise the customer in writing;
            consider notifying the local Fire and Rescue Service if it&apos;s clearly a breach
            with risk to life. (5) Safeguarding concern about elderly customer with potentially
            undue pressure — consider local authority adult social care referral; raise with your
            firm first. Document everything. One incident; five potentially-required reports.
          </>
        }
        whyItMatters={
          <>
            The L3 reporting-route mapping is what stops issues falling through the cracks. Each
            of these issues sits with a different responsible person; failing to escalate any one
            of them leaves a duty unfulfilled. The firm&apos;s reputation for thoroughness is what
            wins repeat business and the operative&apos;s personal s.7 record stays clean.
          </>
        }
      />

      <Scenario
        title="The HSE concerns line — when internal has demonstrably failed"
        situation={
          <>
            You have raised concerns about your firm&apos;s deteriorating safe-isolation practice
            three times in writing over six weeks — to your supervisor, to the contracts manager,
            and finally to a director. Each raise has been acknowledged and quietly buried; no
            changes have been made. You have now witnessed a colleague work live on a 230V circuit
            at the direction of the same supervisor, and the contracts manager and director are
            aware of the ongoing practice.
          </>
        }
        whatToDo={
          <>
            Internal route has demonstrably failed. PIDA 1998 (ERA 1996 Part IVA) now protects
            external disclosure to the HSE as a prescribed person under s.43F. Use the HSE
            concerns line on 0300 003 1647 or the online form at hse.gov.uk/contact/concerns.
            Provide: specific facts (who, what, where, when, how often), the regulation breached
            (EAWR Reg 14), your three written internal raises with dates and recipients, and your
            contact details. Retain copies of everything. Inform your union if you have one.
            Consider seeking early ACAS / solicitor advice on any subsequent firm response.
          </>
        }
        whyItMatters={
          <>
            The PIDA protection is real but procedurally exacting. The HSE expects to see a
            documented internal escalation before they will treat the external disclosure as
            protected; bypassing internal where it has not demonstrably failed weakens the PIDA
            defence to any subsequent detriment claim. The three-raise sequence over six weeks
            plus the documented buried-acknowledgement pattern is the evidence trail that makes
            the external disclosure protected and proportionate.
          </>
        }
      />

      <SectionRule />
      <ContentEyebrow>
        The contemporaneous record — what to capture in the first hour after an incident
      </ContentEyebrow>

      <ConceptBlock
        title="Why the first 60 minutes are evidentially decisive"
        plainEnglish="The single most valuable evidence in any subsequent investigation is what was written down in the first 60 minutes after an incident. Memory degrades; accounts merge with what was heard from others; mobile phones move; conditions change as people start cleaning up. The L3 supervisor reflex once any immediate first aid is dealt with is to start capturing — photos, contemporaneous notes from anyone present, screenshots of any system alerts, copies of any messages that preceded the event. Most of this work is impossible to do well two days later."
        onSite="Practical sequence in the first hour: scene control, photographs from multiple angles, individual witness write-downs done separately (so accounts don’t cross-contaminate), retention of any failed equipment, system / app log preservation, communication trail (texts, emails, work-order app entries) screenshot and time-stamped. The firm’s responsible person directs but the L3 supervisor on the ground is often the one executing."
      >
        <p>First-hour evidence checklist:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Scene photographs</strong> — wide context, medium detail, close detail.
            Include any safety signage / barriers, position of casualty (if appropriate and
            consensual), state of equipment, lighting, weather.
          </li>
          <li>
            <strong>Witness write-downs</strong> — separate sheets, in own words, signed and
            dated. Avoid prompting or suggesting.
          </li>
          <li>
            <strong>Equipment preservation</strong> — failed equipment kept intact; not modified,
            not cleaned, not disposed of.
          </li>
          <li>
            <strong>System logs</strong> — work-order app, vehicle telematics, electronic test
            instrument data, CCTV (if available, request preservation in writing same-day).
          </li>
          <li>
            <strong>Communication trail</strong> — texts, emails, app messages from before the
            event preserved with timestamps.
          </li>
          <li>
            <strong>Conditions log</strong> — weather, lighting, temperature, noise level, time of
            day, who was on shift.
          </li>
          <li>
            <strong>Your own account</strong> — your contemporaneous notes from the day of the
            incident; write before discussing the event in detail with anyone.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>
        Case study — Whirlpool UK Appliances [2018] and the cost of late-and-incomplete reporting
      </ContentEyebrow>

      <ConceptBlock
        title="When £15m turns on the gap between incident and report"
        plainEnglish="Whirlpool UK Appliances was fined £15m in 2018 after an apprentice was crushed to death by a falling pallet at the Yate distribution centre. The HSE’s investigation found multiple failings — but the prosecution’s aggravating factors included the firm’s delayed and incomplete RIDDOR submission, and earlier near-misses involving similar pallet stacks that had been observed by operatives but not reported through the firm’s system. The Sentencing Council Definitive Guideline (2016) treats the firm’s response, including transparency in reporting, as one of the factors moving the case up or down the harm × culpability matrix. Whirlpool’s £15m sat in the very-large-turnover, high-culpability, Category 1 harm cell — partly because the firm could not show that earlier near-misses had been escalated and acted upon."
        onSite="The L3 reading: the firm’s reporting record over years before an incident shapes the eventual sentence after one. Every near-miss you log, every internal report you make, every escalation you document is a building block in the firm’s mitigation evidence if a serious incident ever occurs. Firms that have a culture of reporting and acting on near-misses receive significantly lower fines after fatal incidents than firms that did not — even where the underlying cause is similar. The aggregate of small reports is the long-term defence."
      >
        <p>What the Whirlpool case tells L3 operatives about reporting culture:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Near-miss reports are evidence of due diligence</strong> — they show the firm
            was tracking and acting on warning signs.
          </li>
          <li>
            <strong>Unreported near-misses become aggravating factors</strong> — if operatives
            observed similar issues but did not report (because reporting was discouraged or
            pointless), the HSE will note that as systemic.
          </li>
          <li>
            <strong>Late RIDDOR reports are separate offences</strong> — Reg 6 lateness stacks on
            top of the underlying breach.
          </li>
          <li>
            <strong>Incomplete RIDDOR reports invite re-investigation</strong> — partial facts
            trigger HSE follow-up that may uncover wider issues.
          </li>
          <li>
            <strong>The Sentencing Council guideline (2016)</strong> explicitly treats quality of
            reporting as a moving factor in the culpability × harm matrix.
          </li>
          <li>
            <strong>Senior management knowledge</strong> — if a director knew about similar
            near-misses and did not act, s.37 personal liability attaches.
          </li>
          <li>
            <strong>Internal communication of lessons</strong> — was the near-miss summarised in a
            toolbox talk? Was the operative briefed on the changes? These are evidence
            touchpoints.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>
        Step-by-step procedure — running a near-miss through the firm&apos;s system
      </ContentEyebrow>

      <ConceptBlock
        title="From observation to closed-out action — what good looks like"
        plainEnglish="Most firms have a near-miss reporting form (paper or digital). The form is the entry point but the process around it is what creates value. The L3 supervisor reflex is to treat near-miss reports the way the firm treats invoices: every one gets logged, every one gets a reference number, every one gets reviewed, every one gets a closed-out action with a named owner, every one gets summarised in the next safety bulletin. The form on its own is administrative theatre; the process is what reduces the next incident."
        onSite="Step-by-step the L3 supervisor follows when a near-miss is observed: (1) make safe at the scene; (2) write a brief contemporaneous note; (3) photograph if relevant; (4) submit the firm’s form same-day; (5) notify the responsible person verbally; (6) participate in any follow-up review; (7) ensure any agreed action is implemented; (8) check the firm’s next bulletin to confirm the learning was shared. Skipping any step weakens the chain."
      >
        <p>The eight-step near-miss process unpacked:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Make safe at the scene</strong> — remove the immediate hazard, tag out of
            service if equipment, restrict access if environmental.
          </li>
          <li>
            <strong>Contemporaneous note</strong> — date, time, location, what happened, what
            could have happened, who was present, what was done.
          </li>
          <li>
            <strong>Photographs</strong> — equipment condition, location, any contributing factors
            (lighting, weather, clutter).
          </li>
          <li>
            <strong>Submit firm&apos;s form same-day</strong> — paper or digital. Memory degrades
            fast; same-day submission preserves accuracy.
          </li>
          <li>
            <strong>Notify responsible person verbally</strong> — phone or in-person briefing in
            addition to the form submission; ensures awareness.
          </li>
          <li>
            <strong>Follow-up review</strong> — usually within 7-14 days; root-cause analysis if
            pattern; action planning if change needed.
          </li>
          <li>
            <strong>Action implementation</strong> — fleet check, RAMS update, training refresh,
            supplier change, procedure rewrite as applicable.
          </li>
          <li>
            <strong>Lesson sharing</strong> — toolbox talk, safety bulletin, training module
            update; visible closure of the loop.
          </li>
        </ol>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>
        Cross-reference table — which regulator for which kind of issue
      </ContentEyebrow>

      <ConceptBlock
        title="The L3 mapping table you should be able to recite cold"
        plainEnglish="When an issue arises the first question is ’who is the regulator?’. Multiple regulators sit in parallel across H&S, environmental, safeguarding, product, fire and building safety. Knowing the right one (or the right combination) for the issue in front of you is the supervisory mapping skill this criterion is testing."
        onSite="Carry the mapping in your head. When something goes wrong on site, the routing decision is part of the response — not something you research afterwards. Mis-routed reports get bounced back and wasted time may shift an incident into a fine."
      >
        <p>The regulator-mapping table by issue type:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Personal injury at work (employee)</strong> — RIDDOR via HSE + internal +
            insurance + customer (if affecting their premises).
          </li>
          <li>
            <strong>Personal injury at work (member of public on your site)</strong> — RIDDOR via
            HSE if hospitalised; internal; insurance; customer; police if criminal element
            suspected.
          </li>
          <li>
            <strong>Environmental release (water / land / hazardous substance)</strong> —
            Environment Agency 0800 80 70 60 (England), SEPA (Scotland), NRW (Wales); internal;
            local authority for some scenarios.
          </li>
          <li>
            <strong>Fire / smoke / fire alarm bypass</strong> — Fire and Rescue Service for active
            incidents; RRFSO 2005 responsible person (often the landlord/employer) for systemic
            issues; internal; insurance.
          </li>
          <li>
            <strong>Safeguarding concern (vulnerable adult)</strong> — local authority adult
            social care under Care Act 2014; police if immediate criminal element; internal
            safeguarding lead.
          </li>
          <li>
            <strong>Safeguarding concern (child)</strong> — local authority children&apos;s
            services under Children Act 1989; NSPCC helpline; police if immediate.
          </li>
          <li>
            <strong>Defective installation by another firm</strong> — scheme body (NICEIC, NAPIT,
            ELECSA, Stroma, Certsure) of the firm in question; customer; internal record for
            future PQQ.
          </li>
          <li>
            <strong>Product defect (manufacturer issue)</strong> — manufacturer + Office for
            Product Safety and Standards (OPSS); internal product-safety register.
          </li>
          <li>
            <strong>HRRB matter (BSA 2022)</strong> — Building Safety Regulator (within HSE);
            internal; principal accountable person.
          </li>
          <li>
            <strong>Gas concern</strong> — Gas Safe Register (for unauthorised gas work or
            competence issues); HSE (for incidents under GSIUR 1998).
          </li>
          <li>
            <strong>Asbestos disturbance / suspected exposure</strong> — HSE under CAR 2012;
            licensed asbestos contractor for response; internal.
          </li>
          <li>
            <strong>Working time / pay / discrimination</strong> — ACAS; employment tribunal; HMRC
            for unpaid wages; internal grievance.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>
        The s.20 inspector interview — what to do when asked &quot;what happened?&quot;
      </ContentEyebrow>

      <ConceptBlock
        title="HASAWA s.20 powers and how the L3 operative responds"
        plainEnglish="HASAWA s.20 gives the inspector power to require any person to answer questions and sign a declaration of truth. Refusing to answer is itself an offence under s.33(1)(e). BUT — and this is the critical distinction — answers given under s.20 cannot be used against the person who gave them in a criminal prosecution of that person. They CAN be used against the firm and against other parties. The L3 operative reflex is therefore to answer truthfully under s.20 while being clear that questions about your own potential liability shift the interview into PACE territory (where caution and right to silence apply). Know the difference."
        onSite="When an inspector starts asking questions: be polite, answer factually about what you saw and did, ask the inspector to clarify whether this is a s.20 interview or PACE-cautioned. Do not speculate about cause or blame; stick to what you directly observed. If the question feels like it’s probing for your own personal s.7 liability, request a solicitor before continuing. The firm should provide one; insurer-funded legal support is standard."
      >
        <p>Practical responses to inspector questions:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>&quot;What happened?&quot;</strong> — describe what you directly observed, in
            chronological order, in your own words. Stick to facts.
          </li>
          <li>
            <strong>&quot;Who was in charge?&quot;</strong> — name the person; the inspector can
            verify against documentation.
          </li>
          <li>
            <strong>&quot;Did you know this was unsafe?&quot;</strong> — this is a
            liability-probing question. Pause; ask whether this is s.20 or PACE; request a
            solicitor.
          </li>
          <li>
            <strong>&quot;Can I see your training records?&quot;</strong> — produce them; do not
            interpret what they show.
          </li>
          <li>
            <strong>&quot;Was the RAMS available before you started work?&quot;</strong> —
            factual; if you signed in to the RAMS, the inspector can see the timestamp.
          </li>
          <li>
            <strong>&quot;Why did you do X?&quot;</strong> — describe what you did and why you
            understood it to be appropriate at the time. Do not speculate about alternatives in
            hindsight without legal advice.
          </li>
          <li>
            <strong>&quot;Will you sign this statement?&quot;</strong> — read it carefully;
            correct any inaccuracies; do not sign anything you have not personally reviewed; ask
            for a copy.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <FAQ items={faqs} />
      <SectionRule />
      <KeyTakeaways
        points={[
          'Remember from L2 — report H&S concerns to a responsible person. At L3 the depth is mapping the right person for each kind of issue.',
          "MHSWR Reg 7 designated competent person is the firm's internal H&S 'responsible person'. Find out who they are on day one.",
          'RIDDOR responsible person is the employer / self-employed; they make the F2508. Operatives escalate to them.',
          'Environmental hazards: EA (England, 0800 80 70 60), SEPA (Scotland), NRW (Wales). 24/7 hotlines.',
          "Safeguarding: local authority adult / children's social care. You raise; they assess.",
          'EICR coding (C1/C2/C3/FI) is the formal report route for installation defects.',
          'Near-miss reporting is the highest-value preventive activity. Same-day internal log.',
          'Multiple parallel routes apply to many issues. Map each one and escalate appropriately.',
          'Whirlpool £15m (2018) — unreported near-misses became aggravating factors after the fatality. Reporting culture is long-term defence.',
          'Eight-step near-miss process: make safe, note, photograph, submit form, notify verbally, review, action, share lesson.',
          'HASAWA s.20 vs PACE caution — answer factually under s.20; request solicitor and right-to-silence applies under PACE.',
          'Defective Premises Act 1972 + BSA 2022 s.135 — residential records may need to survive 30 years. Retain accordingly.',
        ]}
      />
      <Quiz title="Reporting routes — knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Remember from L2 — every alarm is real until proven otherwise; muster, account-for, await
        all-clear. At L3 you may be the senior person directing parts of the response, identifying
        the building's responsible person and providing the data the fire service needs.
      </p>

      <TLDR
        points={[
          'Every alarm is real until proven otherwise. Stop, leave tools, evacuate via planned route, bring non-employees with you, account-for at the muster point, await all-clear.',
          'Electrical fires: isolate first (at meter / cut-out, NOT in the burning CU), evacuate, CO2 or dry powder extinguisher only if trained / small fire / escape route behind you, then 999. Never water on a live electrical fire.',
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
          <li>
            <strong>STOP</strong> work immediately. Don&apos;t finish the cable run.
          </li>
          <li>
            <strong>LEAVE</strong> tools where they are. Personal items can stay too.
          </li>
          <li>
            <strong>BRING</strong> non-employees with you — customer, visitors, others you&apos;re
            working alongside.
          </li>
          <li>
            <strong>EVACUATE</strong> via the planned route identified in your dynamic risk
            assessment on arrival.
          </li>
          <li>
            <strong>MUSTER</strong> at the designated point. Don&apos;t go to the van for keys.
          </li>
          <li>
            <strong>ACCOUNT-FOR</strong> to the responsible person — who from your firm is here,
            who isn&apos;t.
          </li>
          <li>
            <strong>AWAIT</strong> the all-clear before re-entering. The responsible person
            decides.
          </li>
          <li>
            <strong>PRESERVE</strong> evidence of any work-related contributing factor.
          </li>
        </ol>
      </ConceptBlock>

      <RegsCallout
        source="Regulatory Reform (Fire Safety) Order 2005 — Article 8(1)"
        clause={
          <>
            &quot;The responsible person must — (a) take such general fire precautions as will
            ensure, so far as is reasonably practicable, the safety of any of his employees; and
            (b) in relation to relevant persons who are not his employees, take such general fire
            precautions as may reasonably be required in the circumstances of the case to ensure
            that the premises are safe.&quot;
          </>
        }
        meaning={
          <>
            RRFSO 2005 places the lead fire-safety duty on the responsible person — typically the
            employer in workplaces, the owner/occupier in non-employer premises. Article 9
            requires a fire risk assessment; Article 14 requires emergency routes and exits;
            Article 15 requires fire-fighting and detection equipment. As a visiting electrician
            your role is cooperation with the responsible person&apos;s arrangements; you
            don&apos;t lead unless you ARE the senior person on a small site.
          </>
        }
        cite="Source: Regulatory Reform (Fire Safety) Order 2005 (SI 2005/1541), Article 8."
      />

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <RegsCallout
        source="Health and Safety at Work etc. Act 1974 — s.7"
        clause={
          <>
            &quot;It shall be the duty of every employee while at work — (a) to take reasonable
            care for the health and safety of himself and of other persons who may be affected by
            his acts or omissions at work; and (b) as regards any duty or requirement imposed on
            his employer or any other person by or under any of the relevant statutory provisions,
            to co-operate with him so far as is necessary to enable that duty or requirement to be
            performed or complied with.&quot;
          </>
        }
        meaning={
          <>
            The employee duty during an emergency response. You must take reasonable care for your
            own and others&apos; safety, AND cooperate with the responsible person&apos;s
            arrangements (in a fire alarm, that means leaving by the signposted route, mustering,
            accounting-for, awaiting the all-clear). Ignoring the alarm, returning to the work
            area for tools, or undermining the fire marshal&apos;s instructions all breach s.7 —
            and s.7 carries personal criminal liability with no employer indemnity.
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
          <li>
            CO2 displaces oxygen in the immediate area; safe on energised electrical equipment;
            some extinguishing of the fire itself.
          </li>
          <li>Dry powder smothers; safe on energised equipment; messy aftermath.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
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
          <li>
            Anyone unaccounted for: name, last known location, time last seen, what they were
            doing.
          </li>
          <li>
            Pass to the building&apos;s responsible person AND directly to the fire service when
            they arrive.
          </li>
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
          <li>
            Refuge point — typically a protected lobby on the stair, with a two-way communication
            device.
          </li>
          <li>Communication aids appropriate to the impairment.</li>
          <li>Equipment (e.g. evac chair) as required.</li>
          <li>Re-entry sequence after the all-clear (often slower; needs assistance).</li>
          <li>Regular drill participation to ensure the plan works in practice.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Fire detection systems — the BS 5839 awareness layer</ContentEyebrow>

      <ConceptBlock
        title="Why an electrician should know the broad shape of BS 5839-1"
        plainEnglish="BS 5839-1 is the British Standard for fire detection and fire alarm systems in non-domestic premises. It defines system categories (P for property protection, L for life protection, M for manual call points only) with sub-categories (L1 = whole building coverage; L5 = local risk-area coverage). The category determines which spaces must have detection and what type. Domestic dwellings follow BS 5839-6 with grading by the level of protection required."
        onSite="At L3 you don't design fire alarm systems unless you're trained for it, but you'll work alongside them all the time. Knowing the category of system in a building you're working in tells you what disturbance triggers the alarm, what the maintenance regime looks like, and whether your work is inside or outside a detection zone. Disturbing a detector head, painting over a sensor, taping a callpoint — all are MOR-relevant on HRRBs and contractor-defect issues elsewhere."
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
            <strong>L1</strong> — automatic detection throughout the building for life protection.
          </li>
          <li>
            <strong>L2</strong> — L1 + additional detection in escape routes and rooms opening on
            to escape routes.
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
        onSite='The L3 reflex on every cable penetration through a compartment line: appropriate fire-stopping in place, recorded, photographed. Intumescent collars, fire pillows, fire mortar, fire-rated foam — the right product for the substrate and the cable type. "The general builder&apos;s coming back to fire-stop" is exactly how the Grenfell pattern repeats — make sure the responsibility is allocated and discharged in writing.'
      >
        <p>Practical fire-stopping checklist on a cable penetration:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Identify the compartment line</strong> — fire-rated wall or floor on the
            building drawings; ask the principal contractor or designer if unsure.
          </li>
          <li>
            <strong>Match the fire-stopping to the rating</strong> — 30, 60, 90 or 120 minutes.
            Product certification (BS EN 1366) for the substrate and configuration.
          </li>
          <li>
            <strong>Install per the manufacturer&apos;s spec</strong> — gap fill, depth, surface
            treatment.
          </li>
          <li>
            <strong>Record and photograph</strong> — golden-thread input on HRRBs; contractor
            record on all jobs for liability protection.
          </li>
          <li>
            <strong>Tag the penetration</strong> — increasingly required on major projects; allows
            future inspection and traceability.
          </li>
          <li>
            <strong>Don&apos;t leave it to &apos;someone else&apos;</strong> — the firm that
            creates the penetration owns the fire-stopping responsibility unless explicitly
            transferred in writing to another party.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The post-event review — learning into the next job</ContentEyebrow>

      <ConceptBlock
        title="Why the firm should debrief, even on minor events"
        plainEnglish="Every emergency event — real or false alarm, evacuation or near-miss — is a chance to review and improve. Did people know the route? Did the muster procedure work? Did account-for capture everyone? Was there a contributory factor from your work? The post-event review pulls these out, blame-free, and feeds the firm's Reg 5 (MHSWR) management cycle."
        onSite="The L3 supervisor habit: within 24 hours of any evacuation or significant near-miss, a short written note summarising what happened, what worked, what didn't. Sent to the firm's H&amp;S manager. Feeds toolbox talks, RAMS updates, induction improvements. The HSE values firms that demonstrate this learning loop — it's the kind of evidence that turns a borderline enforcement decision into a notice rather than a prosecution."
      >
        <p>Post-event review structure (10-15 minutes max):</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>What happened</strong> — factual sequence, time-stamped.
          </li>
          <li>
            <strong>What worked</strong> — alarm response, route knowledge, account-for, emergency
            services interaction.
          </li>
          <li>
            <strong>What didn&apos;t</strong> — delays, confusion, missing information, wrong
            actions.
          </li>
          <li>
            <strong>Contributory factors from the firm&apos;s work</strong> — if any. Be honest;
            the inspector will check.
          </li>
          <li>
            <strong>Recommendations</strong> — RAMS updates, training topics, equipment changes,
            induction improvements.
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
            &quot;The responsible person must make a suitable and sufficient assessment of the
            risks to which relevant persons are exposed for the purpose of identifying the general
            fire precautions he needs to take to comply with the requirements and prohibitions
            imposed on him by or under this Order.&quot;
          </>
        }
        meaning={
          <>
            The fire risk assessment duty under RRFSO. Mirrors the MHSWR Reg 3 risk assessment
            duty but specific to fire. Where 5+ employees are employed, the significant findings
            must be recorded (Article 9(7)). Following an evacuation event the FRA should be
            reviewed — Article 9(3) requires the assessment to be kept under review. The
            post-event review feeds the FRA update; the FRA update feeds the next year&apos;s
            evacuation drill.
          </>
        }
        cite="Source: Regulatory Reform (Fire Safety) Order 2005 (SI 2005/1541), Article 9."
      />

      <CommonMistake
        title="Going back for the toolbox"
        whatHappens={
          <>
            Apprentice evacuates but realises their toolbox is in the work area. Slips back inside
            &quot;just to grab it&quot; while the alarm is still sounding. Fire service is told
            everyone is out. The apprentice is missed in the count. Re-entry by the fire service
            to look for them is delayed by 4 minutes; smoke ingress to the route they took is now
            severe; minor injuries follow.
          </>
        }
        doInstead={
          <>
            Tools stay. They&apos;re replaceable; the consequences of being unaccounted for during
            an evacuation aren&apos;t. Once you&apos;re out, you stay out. The all-clear comes
            from the responsible person, not from you.
          </>
        }
      />

      <CommonMistake
        title="Using a water extinguisher on a live CU fire"
        whatHappens={
          <>
            Apprentice grabs the nearest extinguisher (water — Class A only) and discharges it on
            a live CU fire. Water tracks back up the stream; operator receives a shock; fire
            isn&apos;t controlled (water spreads burning insulation residues across the floor); CU
            damage is now catastrophic. Insurance, RIDDOR specified-injury, EAWR Reg 4 breach.
          </>
        }
        doInstead={
          <>
            Read the label colour band before using any extinguisher. Electrical fires: CO2 (black
            label) or dry powder (blue label). Water (red label) is for Class A only. If unsure,
            evacuate.
          </>
        }
      />

      <Scenario
        title="Fire alarm during a commercial first-fix"
        situation={
          <>
            You&apos;re leading a small team (yourself + one L2) on a commercial first-fix in a
            multi-tenant office building. You&apos;re on the third floor, the L2 is on the second
            floor running cable. You both have tools, drill batteries on charge, materials laid
            out. The fire alarm sounds — not your panel work, but a building-wide alarm. The
            customer isn&apos;t present today (out-of-hours job). You don&apos;t know if this is a
            drill or a real event.
          </>
        }
        whatToDo={
          <>
            Treat as real. Phone the L2 immediately: &quot;alarm, evacuate now, meet me at the
            muster point&quot;. Stop your own work, leave tools and charging batteries (drill
            battery on charge in a building fire is a problem but not your problem to solve
            mid-evacuation), evacuate via the route you identified on arrival, head to the muster.
            At the muster — confirm L2 has arrived, identify the building&apos;s responsible
            person / fire marshal, identify yourself and your firm, account-for (you + L2 both
            present, no other firm personnel on site). Wait for the all-clear. If the fire service
            arrives, provide your account-for to them too. Once given the all-clear, re-entry is
            permitted — but check the work area for fire / smoke damage that could affect your kit
            before resuming. Document the event in the firm&apos;s incident log that evening. Note
            any contributory factor from your work (none in this scenario, but always note if
            there is).
          </>
        }
        whyItMatters={
          <>
            The L2 mate on the second floor is your team. Failing to communicate to them and
            confirm their evacuation is a s.7 / s.2 / Reg 9 failure. The charging drill battery is
            a real fire-load consideration in some cases, but mid-evacuation it&apos;s lower
            priority than getting people out — the building&apos;s fire-safety system is designed
            for these fire loads. The account-for at the muster is what gives the fire service
            confidence the building can be cleared without speculative rescue entry. If your firm
            wasn&apos;t the cause, document that; you&apos;re still likely to be asked about it
            during the building-owner&apos;s post-event review.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Remember from L2 — every alarm is real, evacuate via planned route, muster, account-for, all-clear.',
          "L3 add — actively bring non-employees with you (s.3 duty); identify and cooperate with the building's responsible person; account-for your firm's personnel; provide accurate data to fire service.",
          'Electrical fires: isolate, evacuate, CO2 or dry powder ONLY if trained / small / escape route behind. Never water on live electrical.',
          'Extinguisher classes (BS EN 3): A (water-red), B (foam-cream / CO2-black), C (dry powder-blue), D (specialist), F (wet chemical-yellow). Electrical = CO2 or dry powder.',
          'RRFSO 2005 places lead fire-safety duty on the responsible person. PEEPs (Personal Emergency Evacuation Plans) under Equality Act 2010 + RRFSO for persons needing assistance.',
          'Account-for is the supervisor act with the highest impact. Accurate data prevents speculative rescue entry and saves lives.',
          "Don't go back for tools. Re-entry only after all-clear from responsible person.",
          'Preserve evidence post-event — photos, witnesses, work-related contributing factors.',
        ]}
      />

      <Quiz title="Emergency procedures — knowledge check" questions={quizQuestions2} />
    </div>
  );
}
