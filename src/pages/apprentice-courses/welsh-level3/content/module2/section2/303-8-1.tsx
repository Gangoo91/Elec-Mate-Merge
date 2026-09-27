/**
 * Ported from the English course, combining:
 *   level2/module4/section2/Sub1.tsx
 *   level3/module1/section4/Sub4.tsx
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

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod4-s2-sub1-walkround',
    question:
      "You arrive at an occupied domestic rewire. The customer's RAMS was written three weeks ago when the surveyor visited. What's the FIRST thing you do before opening the toolbox?",
    options: [
      'A short dynamic walk-round of every room you will work in today, comparing what is in front of you against the RAMS and recording anything that has changed since the survey.',
      'Start at the consumer unit straight away — the RAMS already covers the property, so the quickest safe move is to isolate the supply and begin the dead test before anything else changes around you.',
      'Take a fresh set of photographs of every room for the job file so there is a record of the property condition, then begin work to the method statement exactly as the surveyor wrote it.',
      'Phone the surveyor to confirm the RAMS is still valid; if they confirm no major structural changes were planned, the three-week-old assessment stands and you can begin without re-checking the rooms.',
    ],
    correctIndex: 0,
    explanation:
      "RAMS is the baseline plan — written before the work, in an office, sometimes weeks earlier. The dynamic risk assessment is the walk-round you do on the day, in the actual rooms, with the actual people present. Management of Health and Safety at Work Regulations 1999 Reg 3 requires the assessment to be 'suitable and sufficient' and that means up to date for the conditions you actually find. Five minutes of walking and looking before any tool comes out is what the regulation effectively demands.",
  },
  {
    id: 'mod4-s2-sub1-services',
    question:
      "You're chasing a vertical channel into a plastered wall in a 1960s end-terrace to drop a cable to a new socket. You've got a cable-and-pipe detector but it's flagging intermittently in the area. What's the safe next move?",
    options: [
      'Carry on chasing but keep the detector running continuously as you go — an intermittent reading usually means a shallow nail or screw rather than a service, so reacting to every flicker would make the job impossible.',
      'Switch the detector to its deepest sensitivity setting, sweep once more, and if it stops flagging treat the area as clear — a single clean sweep on maximum range is enough to prove there is nothing concealed behind the plaster.',
      'Stop and treat the intermittent reading as a positive find — trace the gas tail and pipe routes visually, lift a board to check the void, and re-route the chase rather than risk cutting a live service.',
      'Chase by hand with a bolster and club hammer instead of the power tool — working slowly by hand means you will feel any pipe or cable before you cut it, so the intermittent reading can be safely ignored.',
    ],
    correctIndex: 2,
    explanation:
      "Concealed services are the headline 'services' hazard. Gas, water, structural steel and other live cables can all sit in a wall or under a floor with no surface clue. The detector is a tool, not a verdict — intermittent or flickering readings are treated as positive until you've proven they aren't. Cutting into a live gas pipe is the textbook avoidable fatality and the HSE has prosecuted electricians under HASAWA s.3 (risk to non-employees) when a botched chase has led to a gas leak in a customer's home.",
  },
  {
    id: 'mod4-s2-sub1-people',
    question:
      "Halfway through a kitchen first-fix, the customer's two young children come home from school and start running through the work area where you've got an open consumer unit and tools on the floor. Your work is partially complete and the area is not isolatable from the rest of the house. What do you do?",
    options: [
      'Carry on but ask the parent to keep the children in the next room — packing down now means re-doing the isolation and testing, and a verbal instruction to stay clear discharges your duty to them.',
      'Put up a hazard-warning sign and some barrier tape across the kitchen doorway, then continue — a visible barrier and warning is a recognised control and lets you finish the first-fix without losing the day.',
      'Finish only the live consumer-unit work as quickly as possible to get the cover back on, since a closed unit is safe around children, then complete the rest of the install once the cover is refitted.',
      "Stop work, secure the open consumer unit, gather the floor-level tools, and ask the parent to keep the children clear — if that can't be arranged, pack down and reschedule, as HASAWA s.3 makes them your duty.",
    ],
    correctIndex: 3,
    explanation:
      "People hazards include the customers, their family and visitors. HASAWA s.3 makes you responsible for them. A consumer unit with the cover off in a household with running children isn't a tolerable risk — you secure the area or you stop work. 'I told them to stay away' has never won an SFAIRP defence after an incident. The walk-round is repeated whenever the people in the property change, not just at the start of the day.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "When you arrive at a domestic property to start work, what's the difference between the RAMS and a dynamic risk assessment?",
    options: [
      'There is no real difference — RAMS and dynamic risk assessment are two names for the same document, one used by office staff and the other by site operatives, and either one satisfies the legal duty.',
      'RAMS is the written plan prepared in advance after a survey; the dynamic risk assessment is the walk-round on the day that catches what has changed since the paperwork was written.',
      'RAMS is the on-the-day check carried out by the operative, while the dynamic risk assessment is the formal written document the employer prepares in the office before the job is priced.',
      'RAMS covers only the method of work and the dynamic risk assessment covers only the hazards — you need both because neither assesses risk on its own; together they form the complete pre-work paperwork.',
    ],
    correctAnswer: 1,
    explanation:
      "Management of Health and Safety at Work Regulations 1999 Reg 3 requires risk assessments to be 'suitable and sufficient' — that has been interpreted by the HSE as needing to reflect the conditions actually present. A RAMS written three weeks ago by a surveyor cannot do that on its own. The dynamic walk-round on arrival is the bit that closes the gap.",
  },
  {
    id: 2,
    question:
      'Which four broad families of hazard does the workspace walk-round in this lesson use as a structure?',
    options: [
      'Electrical, mechanical, chemical, biological — the four classic occupational-hygiene hazard groups used in COSHH assessments, applied here to decide which exposure limits and controls the job needs.',
      'Slips, trips, falls and manual handling — the four most-reported categories of construction injury in HSE statistics, worked through in order so the most common causes of harm are checked first.',
      'People, environment, services and fabric — covering the occupants and trades, the conditions, the concealed services in the structure, and the building fabric you fix into and cut through.',
      'Access, egress, welfare and emergency — the four site-logistics families from the construction phase plan, checked on arrival so you know how you get in, get out, and respond in an emergency.',
    ],
    correctAnswer: 2,
    explanation:
      'The four families are a memory aid — they cover the realistic threat surface for an electrician on a typical install. Working through them in the same order each time stops you missing one. The HSE INDG163 leaflet on risk assessment uses a similar structure — slips/trips, electricity, manual handling, dust, working at height — but the four-family version maps better onto a domestic-or-commercial walk-round.',
  },
  {
    id: 3,
    question:
      "You're working in a property built in 1972. Before you drill into a ceiling, what assumption should you start from?",
    options: [
      'A 1972 build pre-dates modern wiring colours, so assume the existing cabling is the old red/black and concentrate on not confusing it with the new brown/blue — the ceiling itself holds no surprises.',
      'Houses of that era used lath-and-plaster ceilings, so assume the surface will crack when drilled and pre-drill a clearance hole — the concern is making good the finish, not what the material contains.',
      'A property that age is past the typical 50-year life of its original wiring, so assume the circuits are due a rewire and treat any concealed cable as potentially unsafe but otherwise ordinary.',
      "Treat it as 'asbestos suspect until proven otherwise' — any pre-2000 build can hide asbestos in textured ceilings and boards, so stop, check any register, and avoid disturbance until verified.",
    ],
    correctAnswer: 3,
    explanation:
      "Control of Asbestos Regulations 2012 Reg 4 requires duty-holders of non-domestic buildings to maintain an asbestos register and provide it to anyone working on the fabric. For domestic work the duty falls on the homeowner but the practical risk is the same. Disturbing an asbestos textured ceiling without a survey is one of the most common ways an apprentice gets exposed. The default assumption for any pre-2000 build is 'suspect' and the safe move is to stop and check.",
  },
  {
    id: 4,
    question:
      "On a busy commercial fit-out, what 'people hazard' is most often missed by an apprentice on day one?",
    options: [
      'Other trades working above, beside or below you — plumbers cutting overhead, joiners with saws, scaffolders moving boards — whose work creates falling-object, slip and noise risk for you, and yours for them.',
      'Members of the public passing the site hoarding — on a contained commercial fit-out the public are kept out by the perimeter, so an apprentice fixates on them when the real risk is inside the building.',
      "The client's own staff returning to the building, which on a fit-out is rare because the floor is usually handed over empty — so day-one attention is wrongly spent planning around occupants who are not there.",
      "Delivery drivers arriving at the loading bay — important for logistics, but the loading bay is the principal contractor's concern and an apprentice has little reason to be near it on day one.",
    ],
    correctAnswer: 0,
    explanation:
      "Apprentices new to commercial work tend to think 'workspace' is the room they are in. On a live fit-out the workspace is three-dimensional — what is happening above your head and below your feet matters as much as what is in front of you. CDM 2015 Reg 13 puts a duty on the principal contractor to coordinate, but the individual operative still owes a duty under HASAWA s.7 to take reasonable care for themselves and others, and that includes scanning for what other trades are doing.",
  },
  {
    id: 5,
    question:
      "What's the purpose of identifying the gas isolation valve location during the walk-round of a domestic kitchen install?",
    options: [
      'So you can isolate the gas yourself before drilling, which lets you chase freely through any wall — once the gas is off at the valve a pierced pipe can no longer leak, so the location is what makes the chase safe.',
      "So you (or any trade present) can shut the gas down quickly if there is a leak — including one you might cause by chasing into a concealed pipe — as part of the 'services' family and the safe-system record.",
      'So you can record the meter and valve serial numbers on the electrical installation certificate, which BS 7671 requires for any property where gas and electricity share a meter cupboard.',
      'So you can bond to the gas valve directly, because the main protective bonding conductor must connect to the emergency control valve rather than to the consumer-side pipework within 600 mm of the meter.',
    ],
    correctAnswer: 1,
    explanation:
      "An electrician shouldn't be operating gas isolation as a routine — that is gas-safe-engineer work — but knowing where the valve is, in case of an emergency, is basic preparation. It also signals to the customer that you understand the building. After-incident interviews regularly find that the operatives present had no idea where the gas valve was, which delays the response to a leak and worsens the outcome.",
  },
  {
    id: 6,
    question:
      'Which set of regulations explicitly requires the employer to assess workplace risks and record the significant findings?',
    options: [
      'The Health and Safety at Work etc. Act 1974, s.2 — the general duty on every employer to ensure the health, safety and welfare of employees so far as is reasonably practicable; the formal risk-assessment-and-record requirement flows directly from this section.',
      'The Construction (Design and Management) Regulations 2015, Reg 4 — the duty on the client to ensure suitable arrangements for managing a project, which is where the requirement to assess and record workplace risks is set out.',
      "Management of Health and Safety at Work Regulations 1999, Reg 3 — every employer and self-employed person must make a 'suitable and sufficient' assessment of the risks to employees and others affected, recording the significant findings where five or more are employed.",
      'The Electricity at Work Regulations 1989, Reg 3 — the duty on employers and the self-employed to comply with the regulations in matters within their control, including assessing and recording the electrical risks of the work.',
    ],
    correctAnswer: 2,
    explanation:
      "MHSWR 1999 Reg 3 is the statutory hook for the risk-assessment regime. It is made under HASAWA's enabling powers, so a breach of Reg 3 also feeds back into a HASAWA s.2 / s.3 breach. The 'five or more employees' threshold for recording is a low bar — most electrical contracting firms cross it — and HSE inspectors will ask to see the risk assessments during any post-incident visit.",
  },
  {
    id: 7,
    question:
      "You're working alone in a customer's cellar. The lighting is one bare bulb on a pull-cord. What does the walk-round flag and what do you do about it?",
    options: [
      'The bare bulb is a shock risk because pull-cord fittings in cellars are often outside the bathroom-zone rules, so the flag is to test the lamp circuit for adequate disconnection and replace it if it fails.',
      'A single light means the cellar counts as a confined space under the Confined Spaces Regulations 1997, so the flag is that you must not enter alone and need a second person and a permit before work begins.',
      'Working alone is the headline hazard, so the flag is the lone-working arrangement — agree a check-in time and carry a phone, and the lighting level itself is a secondary comfort issue rather than a safety one.',
      'Inadequate task lighting is itself a hazard under WHSWR 1992 Reg 8 — it hides trips, services and defects, so bring temporary lighting before tools come out and record it on the dynamic assessment.',
    ],
    correctAnswer: 3,
    explanation:
      "Lighting is one of the easiest hazards to fix and one of the most often ignored. The walk-round should explicitly flag 'is the lighting adequate for the task I'm about to do?' and the answer in cellars, lofts, plant rooms and unfinished new-builds is almost always 'no, bring temporary'. Working in poor light leads to slips, missed identification of services and bad terminations.",
  },
  {
    id: 8,
    question:
      'Under CDM 2015 Reg 13, what must the principal contractor provide to anyone coming on to a notifiable construction site to work?',
    options: [
      'A site induction covering the construction phase plan, site rules, welfare and emergency arrangements and site-specific hazards, plus access to relevant pre-construction information.',
      "A copy of the principal contractor's public liability and employer's liability insurance certificates, so that every operative on site is covered by the same policy before they begin work.",
      'A personal copy of the full health and safety file for the completed building, so the worker can refer to the as-built information while carrying out their part of the installation.',
      "Written confirmation of the worker's CSCS card and qualifications, signed off by the principal contractor, which acts as the operative's permit to work for the duration of the project.",
    ],
    correctAnswer: 0,
    explanation:
      "CDM 2015 Reg 13 site induction is the formal mechanism for transferring the principal contractor's hazard knowledge to every operative arriving on site. Skipping the induction or signing in without listening is an apprentice-day-one mistake. The induction is also the moment to ask about specific hazards in your work area — the principal contractor's site team will know about live services, asbestos surveys and trade clashes that the design drawings won't show.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'Do I really have to do a dynamic walk-round if there is already a written RAMS?',
    answer:
      "Yes. The RAMS is your starting point — the dynamic walk-round is what closes the gap between paperwork and reality. MHSWR 1999 Reg 3 requires the risk assessment to be 'suitable and sufficient' which means current, not historic. If the building has changed since the survey, if there are new occupants, if the weather has flooded the cellar — none of that is in the RAMS. Five minutes walking through the rooms before tools come out is what discharges the duty.",
  },
  {
    question: 'Who actually owns the risk assessment on a domestic job — me or my employer?',
    answer:
      "Your employer owns the formal risk assessment under MHSWR 1999 Reg 3, but every individual operative owes a personal duty under HASAWA s.7 to take reasonable care and to co-operate with the safety arrangements. In practice that means your employer's RAMS is the framework, and you carry out the dynamic check on the day. If you are self-employed you own both.",
  },
  {
    question: "What if the customer doesn't want me wandering through their house first?",
    answer:
      "Explain calmly that a quick walk of the rooms you'll be working in is a safety requirement before tools come out and that it protects them and their family as well as you. Most customers are fine once they understand it isn't snooping. If the customer outright refuses, that itself is a hazard — record it, flag to your supervisor, and consider whether the work can safely proceed. Forcing the issue isn't the answer; raising it up the chain is.",
  },
  {
    question: "How do I record a dynamic risk assessment if I'm a sole apprentice on a job?",
    answer:
      "A short note in your job-pack notebook is enough — date, address, the hazards you identified beyond the RAMS, the controls you put in place. Some firms use a short pre-work checklist on a clipboard or in an app. The point is that there is contemporaneous evidence you did the assessment — not the format. After an incident the inspector will ask 'what risk assessment did you do?' and a notebook entry written at the start of the day is much stronger evidence than a recollection three weeks later.",
  },
  {
    question:
      'If I spot a serious hazard and my supervisor tells me to ignore it, what should I do?',
    answer:
      "Refuse the unsafe instruction and raise it up the chain — that is exactly what HASAWA s.7 limb (b) requires, and you have specific protection from victimisation under the Employment Rights Act 1996 s.44 (right not to suffer detriment for raising health and safety concerns). 'Following orders' is no defence to a s.7 prosecution. Raising the hazard in writing — even a short text or email — discharges your personal duty regardless of what the supervisor decides next.",
  },
  {
    question: 'Is the walk-round needed every day or just on day one of a job?',
    answer:
      "Every day. Conditions change overnight on most sites — other trades have moved, deliveries have arrived, weather has affected the building, the customer has rearranged a room. A two-minute repeat sweep at the start of each day catches what has changed. On a long-running job it also stops complacency creeping in — the moment 'I know this site' becomes the assumption is the moment a fresh hazard gets missed.",
  },
];

const checks2 = [
  {
    id: 'l3-m1-s4-sub4-wah',
    question: "Under WAH Regs 2005, what's the hierarchy of control?",
    options: [
      'Provide a harness and lanyard to every worker first; then add edge protection; then a scaffold only if the harness proves inadequate for the task.',
      'Avoid working at height where reasonably practicable; if unavoidable, use collective protection (scaffold, MEWP, edge protection); if collective inadequate, use personal fall protection (harness + lanyard + anchor); minimise distance and consequences of falls.',
      'Only work above two metres requires controls; below that height the hierarchy does not apply and ordinary care is sufficient.',
      'Issue a permit-to-work for all height tasks, brief the team, then rely on supervision and signage to keep workers away from unprotected edges.',
    ],
    correctIndex: 1,
    explanation:
      'WAH Regs 2005 Reg 6 hierarchy. Avoid → collective → personal → minimise. Apply on every height-related task.',
  },
  {
    id: 'l3-m1-s4-sub4-confined',
    question: 'What’s a "confined space" under the Confined Spaces Regs 1997?',
    options: [
      'Any space too small for a person to stand fully upright, regardless of ventilation or the presence of any hazard.',
      'Any enclosed room without a window, such as an internal plant room, cupboard or windowless office.',
      'Any space entered through a hatch or manhole rather than a normal doorway, whatever the conditions inside.',
      'Any place that is substantially enclosed and where a reasonably foreseeable specified risk is present.',
    ],
    correctIndex: 3,
    explanation:
      'A confined space is one that is substantially enclosed AND has a reasonably foreseeable specified risk — fire/explosion, asphyxiation, drowning, hyperthermia, or entrapment with serious injury. Examples include a tank, vessel, silo, sewer, chamber, ductwork or void, and sometimes lofts and cellars depending on conditions. Not all small or enclosed spaces qualify; the risk profile defines it.',
  },
  {
    id: 'l3-m1-s4-sub4-manual',
    question: "Under Manual Handling Operations Regs 1992, what's the hierarchy?",
    options: [
      'Train all operatives in safe lifting technique first; provided technique is correct, any load may then be lifted by hand.',
      'Avoid hazardous manual handling where reasonably practicable; if not avoidable, assess (load, individual capability, task, environment); reduce risk to lowest reasonably practicable level (mechanical aids, team lift, training).',
      'Limit every single-person lift to the statutory maximum of 25 kg; anything heavier must be a two-person lift.',
      'Provide a back-support belt and lifting gloves to each worker, then allow handling of any load they feel able to manage.',
    ],
    correctIndex: 1,
    explanation:
      'Avoid → assess → reduce. Mechanical handling preferred; team lift if needed; training to reduce technique-related injury.',
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question: 'What’s a "slip" hazard situation?',
    options: [
      'A tool or cable left projecting at low level across a walkway that catches the foot and causes a person to stumble forward.',
      'Underfoot conditions — water, oil, dust, polished surfaces or weather — that reduce friction below a safe level.',
      'A loss of balance while reaching sideways from a stepladder or working platform above floor level.',
      'A sudden movement caused by an electric shock startle, where the casualty jerks away from the live part.',
    ],
    correctAnswer: 1,
    explanation:
      'A slip is caused by underfoot conditions (water, oil, dust, polished surface, weather) that reduce friction below a safe level. It is the most common workplace injury cause, addressed by housekeeping, anti-slip surfaces, proper footwear and spillage clean-up. Slips, trips and falls are mostly preventable by housekeeping discipline.',
  },
  {
    id: 2,
    question: 'What does Working at Height Regs 2005 cover?',
    options: [
      'Only work carried out on scaffolds, roofs and MEWPs above two metres; work on stepladders and hop-ups falls outside the regulations.',
      'Only work on permanent structures such as towers and gantries; temporary access equipment is covered separately by PUWER alone.',
      'Any place where a person could fall a distance liable to cause personal injury. NO HEIGHT THRESHOLD (the old "above 2m" rule was abolished). Could be standing on a step, on a ladder, on a roof, on a stair, near an unprotected edge.',
      'Only outdoor work at height; indoor work such as fitting luminaires from a platform is covered by the Workplace Regulations instead.',
    ],
    correctAnswer: 2,
    explanation:
      'No height threshold under WAH 2005. Risk assessment based; even low-level falls can cause serious injury depending on landing.',
  },
  {
    id: 3,
    question: "Under MHOR 1992 what's the maximum lifting weight for a worker?",
    options: [
      '20 kg — the legal limit for any single-person lift, above which a mechanical aid must always be used.',
      '25 kg for men and 16 kg for women — fixed statutory limits set out in the regulations for all lifting situations.',
      '50 kg — the maximum a trained operative may lift provided correct technique and a back-support belt are used.',
      'No fixed maximum — assessed by load, frequency, posture, environment and individual capability.',
    ],
    correctAnswer: 3,
    explanation:
      'There is no legal maximum; it is risk-assessment based, by load × frequency × posture × environment × individual capability. HSE filter values give "guideline weights" depending on lift zone (close to body, near floor, above shoulder etc) — typically around 25kg for a lift from waist by an adult male in a close hold. Assess and reduce as needed.',
  },
  {
    id: 4,
    question: 'What are the four "specified risks" defining a confined space?',
    options: [
      'Fire / explosion, asphyxiation, drowning and hyperthermia — plus serious injury from entrapment.',
      'Electric shock, arc-flash, burns and falls from height — the four risks most often present where electricians enter enclosed spaces.',
      'Poor lighting, restricted access, dust and noise — the four environmental factors that make an enclosed space harder to work in.',
      'Slips, trips, manual-handling injury and hand-arm vibration — the four most common injury types reported from enclosed work areas.',
    ],
    correctAnswer: 0,
    explanation:
      'The four specified risks under the 1997 Regs are fire / explosion, asphyxiation (oxygen deficiency or harmful atmosphere), drowning (free-flowing solid / liquid) and hyperthermia (high temperature), plus serious injury from entrapment. The Regs apply when the space is substantially enclosed AND any specified risk is foreseeable; full controls then apply (permit, atmosphere monitoring, rescue plan, standby person).',
  },
  {
    id: 5,
    question: 'What’s "weather-related hazard" for an electrician?',
    options: [
      'Only the risk of lightning striking outdoor work — indoor and covered work is unaffected by weather conditions.',
      'Heat, cold, rain, wind and lightning — each affecting the task, the materials and the safety of working at height.',
      'Only the seasonal change in daylight hours, which affects how much work can be completed outdoors before dark.',
      'Only the damage cold weather causes to test instruments, which lose accuracy below their rated operating temperature.',
    ],
    correctAnswer: 1,
    explanation:
      "Weather is a real hazard category: heat (lofts, plant rooms, summer outdoors — heat stress, dehydration, equipment overheat); cold (numb fingers, brittle PVC sheathing, ice slip risk); rain (water tracking on first-fix, shock risk, slips); wind (height risk, dropped tools); and lightning. Dynamic risk assessment includes the day's weather and how it affects the planned work.",
  },
  {
    id: 6,
    question: 'What’s the "trip" hazard category?',
    options: [
      'A loss of friction underfoot from a wet, oily or polished surface that causes the foot to slide.',
      'The unintended operation of a protective device such as an MCB or RCD when a circuit fault occurs.',
      'Items projecting at low level that catch a foot — cables across routes, materials left out, raised or uneven edges.',
      'A momentary lapse of concentration that leads an operative to make a mistake during a routine task.',
    ],
    correctAnswer: 2,
    explanation:
      'Trip hazards are items projecting at low level that catch a foot: cables across walking routes, materials left out, raised flooring edges, uneven surfaces, doors opening into walkways. They are a particular issue on construction sites and during installation work. Tripping electricians fall onto tools, into work areas or off edges, making this a major contributor to lost-time injuries.',
  },
  {
    id: 7,
    question: 'How does the L3 supervisor address site housekeeping?',
    options: [
      'Leave it to each operative to tidy their own area whenever they have a spare moment, with no scheduled clean-up periods.',
      "Treat housekeeping as the principal contractor's responsibility alone, raising issues only at the weekly site meeting.",
      'Defer all clearing until the end of the contract, so productive time is not lost on tidying during the working week.',
      'Lead by example, set expectations, schedule clean-up periods, provide skips and bins, and intervene when issues are seen.',
    ],
    correctAnswer: 3,
    explanation:
      'Housekeeping is leadership behaviour: lead by example, set expectations, schedule clean-up periods (end-of-day, after disruptive work), provide skips and bins, and intervene when issues are seen. It is one of the easiest hazard reductions and one of the most consistently overlooked. The L3 supervisor models it; the team follows.',
  },
  {
    id: 8,
    question: "What's the L3 supervisor framing on workplace hazards generally?",
    options: [
      'Identify, evaluate, control, monitor. Use the hazard categories as a framework; apply hierarchy of control; document on RAMS / dynamic assessment; observe in practice; intervene when issues seen. Same discipline across hazard types.',
      'Treat each hazard type as a separate specialism needing its own bespoke method, since the controls for height share nothing with those for manual handling.',
      "Rely on the team's experience to spot hazards as they arise, since written assessment slows the job and rarely changes what is done in practice.",
      'Concentrate only on the electrical hazards, leaving the general workplace hazards such as slips and lifting to the main contractor to manage.',
    ],
    correctAnswer: 0,
    explanation:
      "Same framework, applied across hazard categories. The L3 supervisor doesn't treat each hazard type as a separate art; the same disciplined approach applies.",
  },
];

const faqs2 = [
  {
    question: 'Is a step-up a "ladder" under WAH Regs?',
    answer:
      'Yes — a step-up / podium / hop-up is work at height equipment subject to WAH Regs 2005 inspection regime. Pre-use check; periodic detailed inspection; replacement if damaged.',
  },
  {
    question: 'When does a loft become a "confined space"?',
    answer:
      'When access is restricted AND foreseeable specified risk exists (asphyxiation from inadequate ventilation; entrapment; hyperthermia in summer). Most domestic lofts are tight access but not classed as confined unless specific risks present.',
  },
  {
    question: 'Can I refuse to work in adverse weather?',
    answer:
      'Yes if the weather creates an unacceptable risk under MHSWR Reg 3. Document the assessment; escalate to supervisor; reschedule. ERA s.44 protection if pushback follows.',
  },
  {
    question: 'What’s a "working platform" under WAH Regs?',
    answer:
      'Any platform from which a person could fall — scaffold, MEWP, hop-up, ladder rung, roof. Regs apply different inspection regimes by platform type (e.g. weekly scaffold inspection by competent person under WAH Sched 7).',
  },
  {
    question: 'Are anti-slip mats required by law?',
    answer:
      'No specific requirement; required where risk assessment identifies slip risk and mats reduce it (e.g. wet entrances, oil-prone areas, polished commercial floors).',
  },
  {
    question: 'How does the L3 supervisor balance speed and safety on housekeeping?',
    answer:
      'End-of-day clean-up; mid-task tidies after disruptive work; route cables to avoid walking lines; remove materials from corridors. Five minutes of housekeeping prevents most trip incidents.',
  },
  {
    question: 'How does WAH Sched 6 ladder use guidance apply?',
    answer:
      'Schedule 6 to WAH Regs 2005 sets out additional requirements for ladders — they may only be used where a risk assessment shows their use is justified because the work is low-risk and of short duration, or where features of the site cannot be altered. Ladders must rest on stable, level and firm surfaces; be prevented from slipping; be of suitable strength; and provide secure handhold. The L3 reflex: use a podium or wheeled platform first; reach for a ladder only when the assessment supports it.',
  },
  {
    question: 'What does PUWER 1998 Reg 6 require on inspection?',
    answer:
      'Reg 6 requires that work equipment exposed to deteriorating conditions liable to result in dangerous situations is inspected at suitable intervals and after exceptional events. Inspection records kept until the next inspection. For ladders, podiums and MEWPs this drives the periodic detailed-inspection regime alongside daily pre-use checks2.',
  },
  {
    question: 'Does a domestic loft entry require a permit-to-work?',
    answer:
      'Not typically — most domestic lofts are not "confined spaces" within the meaning of the 1997 Regulations. However, the L3 reflex is to check ventilation, temperature, access route and presence of any specified risk before entry; record the dynamic assessment in the job pack; brief any second person remaining downstairs as informal standby.',
  },
  {
    question:
      'What MHSWR principles of prevention does the L3 supervisor apply on workplace hazards?',
    answer:
      'Schedule 1 to MHSWR 1999 — avoid risks; evaluate risks that cannot be avoided; combat risks at source; adapt work to the individual; adapt to technical progress; replace dangerous by less dangerous; develop a coherent prevention policy; give collective measures priority over individual; give appropriate instructions. The L3 reflex on every hazard category is to walk down this list before settling on a control.',
  },
];

export default function Lesson303_8_1() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        A structured site walk before any tool comes out — people, environment, services and
        fabric. The five minutes that prevents the incident is the unglamorous walk-round, not the
        heroics afterwards.
      </p>

      <TLDR
        points={[
          'Static RAMS is the baseline plan written in advance. The dynamic risk assessment is the walk-round you do on the day, in the rooms, with the people who are actually present. Both are required.',
          'Sweep four hazard families in order — people, environment, services, fabric. Working through the same four families each time stops you missing one.',
          "Concealed services (gas, water, structural steel, live cables) are the highest-consequence 'environment' hazard in a domestic install. Treat any positive or intermittent detector reading as a positive find until you've proven otherwise.",
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify the four families of workspace hazard relevant to electrical installation work — people, environment, services, fabric.',
          'Distinguish between the static RAMS and the dynamic risk assessment, and the role of each.',
          'State the duty under MHSWR 1999 Reg 3 to make a suitable and sufficient assessment of risks and to record significant findings.',
          'Identify the duty under HASAWA s.3 to protect non-employees (customers, public, other trades) affected by the work.',
          'Recognise the role of CDM 2015 Reg 13 in transferring hazard information from the principal contractor to operatives joining a notifiable site.',
          'Apply a structured walk-round routine before any tool comes out, repeated daily on long jobs and whenever conditions or people in the area change.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Why this matters before any tool comes out</ContentEyebrow>

      <ConceptBlock
        title="The five minutes before the toolbox opens is the most important five minutes of the day"
        plainEnglish="On almost every prosecuted electrical incident the post-incident report contains the same line — 'no walk-round was carried out before work commenced'. The walk-round is unglamorous, takes five minutes, and is the single most effective control you have. Skipping it doesn't save time; it transfers the cost of missing a hazard to the moment the hazard hurts someone."
        onSite="The walk-round is a habit, not a checklist exercise. It is what experienced electricians do automatically before they reach into the van. The point of teaching it as a structured routine is to build the habit early, while you are still aware of what you are doing — by year three it should be automatic."
      >
        <p>The walk-round has three jobs:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Compare what you see against what the RAMS describes. Anything that has changed since
            the survey becomes a fresh hazard you record before you start.
          </li>
          <li>
            Identify hazards the RAMS could not have known about — people who arrived after the
            survey, weather, deliveries, work other trades have done since.
          </li>
          <li>
            Put eyes on the route from the van to the work area, on the work area itself, and on
            any space you might need to use (lofts, cupboards, cellars, gardens for cable runs).
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The four hazard families</ContentEyebrow>

      <ConceptBlock
        title="People — pedestrians, customers, children, other trades"
        plainEnglish="People hazards are anyone who can walk into your work area or be affected by what you're doing. On a domestic job that is the customer, their family, their pets, the postman, and the neighbour who wanders over to chat. On a commercial fit-out it adds in other trades, the principal contractor's site team, delivery drivers and visitors to the site office."
        onSite="People hazards are the ones most often missed because they move. A walk-round at 8am that finds an empty kitchen is irrelevant by 3pm when the children come home from school. The control is repeating the check whenever the people in the area change, and barriering or covering live work whenever you step away — even for a couple of minutes."
      >
        <p>Specific people hazards on an electrical install:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Customers and their family</strong> — particularly children, elderly
            relatives, anyone with reduced mobility or impaired judgement. They are not your
            employees, so HASAWA s.3 applies, and the duty is on you to keep them out of risk.
          </li>
          <li>
            <strong>Pets</strong> — dogs and cats around open consumer units, exposed cables and
            bench tools. They will not respect your warning notice.
          </li>
          <li>
            <strong>Other trades</strong> — particularly anyone working above you (plumbers,
            ceiling fixers, scaffolders) creating falling-object risk, and anyone working in the
            same room creating cable-trip risk.
          </li>
          <li>
            <strong>Yourself</strong> — fatigue, dehydration, distraction by the customer. The
            walk-round is also the moment to honestly assess whether you are fit to do the work
            today.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Environment — weather, dust, asbestos, confined spaces, working at height"
        plainEnglish="The environment is the conditions you're working in — what's coming through the open window, what's underfoot, what's overhead, what's in the air. It changes constantly on a building site and varies wildly between job types."
        onSite="Environmental hazards are the ones the RAMS most often gets wrong because they change between when the surveyor visited and when you arrive. Heavy rain on a first-fix in stud walls, an unexpected heatwave in a loft conversion, a dust cloud kicked up by another trade — none of this is in the paperwork."
      >
        <p>The headline environmental hazards for an electrician:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Weather</strong> — rain on first-fix in stud walls (water tracking down
            cables), heat in lofts and roof voids (heat stress, deformation of plastic
            accessories), cold (numb fingers, brittle PVC sheathing).
          </li>
          <li>
            <strong>Dust</strong> — particularly silica from masonry chasing and brick-cutting.
            Respirable crystalline silica is now a HSE priority and the workplace exposure limit
            is being kept under review. FFP3 mask is the bare minimum for chasing.
          </li>
          <li>
            <strong>Asbestos suspicion</strong> — any building constructed or refurbished before
            2000. Textured ceilings, insulation board, cement products, floor tiles, pipe lagging.
            Treat suspect material as 'asbestos until proven otherwise'.
          </li>
          <li>
            <strong>Confined spaces</strong> — under-floor voids, lift shafts, plant rooms with
            limited ventilation. The Confined Spaces Regulations 1997 apply if there is a risk of
            asphyxiation, fire, drowning or entrapment.
          </li>
          <li>
            <strong>Working at height</strong> — anything where a fall could cause injury. Covered
            separately in the lesson on access equipment for work at height, but flagged here
            because the walk-round is when you decide what access kit to bring.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Services — concealed cables, gas, water, structural steel"
        plainEnglish="The services hazard is what's hidden inside the building fabric and could be cut, drilled into or otherwise disturbed. The walk-round is when you trace the visible runs and form a picture of what's likely to be in the wall before you start chasing."
        onSite="The cable-and-pipe detector is a tool, not a verdict. It picks up some things some of the time, depending on depth, material and the building's geometry. The walk-round complements the detector — visible meter positions, pipe runs at low level, lintel positions, joist directions in the floor below — all of it informs where you put the chase."
      >
        <p>Each service category has its own consequence profile:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Live cables</strong> — concealed mains in walls and ceilings. Existing
            circuits in the property may not be where the customer thinks they are. Detector +
            cautious chase + visual checks at every step.
          </li>
          <li>
            <strong>Gas pipes</strong> — the highest-consequence services hazard. Cutting into a
            live mains gas pipe is a fire-and-explosion risk. Identify the meter position, trace
            the meter tail visually, know where the emergency isolation valve is.
          </li>
          <li>
            <strong>Water pipes</strong> — copper and plastic. A burst pipe in a customer's home
            is an embarrassing and expensive call to your insurer. Plastic pipes do not show on
            most cable detectors.
          </li>
          <li>
            <strong>Structural steel</strong> — beams, columns, cavity ties. Must be bonded where
            they form an extraneous-conductive-part (covered later in this course, under
            protective bonding).
            Drilling into a steel can also damage drill bits and create dangerous projectile
            shards.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Fabric — masonry condition, joist orientation, plaster, brittle materials"
        plainEnglish="The fabric is the building structure itself. Soft or crumbling brick won't hold a fixing. Plasterboard with a service void behind it is a different drilling problem from solid plaster. Joists running the wrong way change where you can drop a cable."
        onSite="The fabric check is the one apprentices skip most often because it feels like 'looking at a wall'. But fixing into bad masonry is how brackets fall down a week later, and drilling into a service void in the wrong direction is how you put a 6mm hole through a heating return at the floor below."
      >
        <p>What to check on the fabric pass:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Masonry condition</strong> — tap and look. Crumbling mortar, soft stretcher
            courses, lime mortar in older buildings — fixings need to be chosen accordingly (resin
            anchors for soft substrates, longer plugs, specialist hollow-wall fixings for
            plasterboard).
          </li>
          <li>
            <strong>Joist orientation</strong> — particularly above ground floor in a domestic
            build. The direction the joists run dictates whether you can drop a cable through a
            ceiling void or have to chase a wall.
          </li>
          <li>
            <strong>Plaster condition</strong> — old lime plaster shatters when chased and the
            chase needs to be deeper to land on a sound base. Modern gypsum plaster cuts more
            cleanly but is more likely to be hiding a service close to the surface.
          </li>
          <li>
            <strong>Suspended ceilings, dot-and-dab</strong> — both create voids that change
            drilling depth and fixing strategy.
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

      <ContentEyebrow>Static RAMS vs dynamic risk assessment</ContentEyebrow>

      <ConceptBlock
        title="Two documents, two different jobs"
        plainEnglish="RAMS — Risk Assessment + Method Statement — is the written plan produced before the work starts, usually after a survey. The dynamic risk assessment is what you do on the day, in real time, in the actual rooms. RAMS sets the strategy; the dynamic assessment confirms the strategy still fits the conditions you actually find."
        onSite="The dynamic assessment is what closes the gap between paperwork and reality. It is rarely written formally — a notebook entry or a quick note in the job app is enough — but the act of doing it is what discharges the personal duty under HASAWA s.7 and the employer duty under MHSWR Reg 3."
      >
        <p>
          The lesson on producing a risk assessment and method statement covers RAMS in detail.
          The points to keep in mind here:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            A RAMS that just says 'standard electrical install' is a template-trap. The inspector
            will spot it instantly and treat it as evidence the assessment was not 'suitable and
            sufficient' under MHSWR Reg 3.
          </li>
          <li>
            The dynamic assessment doesn't replace the RAMS — it supplements it. If the conditions
            you find are wildly different from the RAMS, stop work and call the supervisor for a
            fresh RAMS rather than try to manage it on the fly.
          </li>
          <li>
            The dynamic assessment is repeated whenever conditions change — start of each day,
            after a break, when other trades arrive, when the people in the area change.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Management of Health and Safety at Work Regulations 1999 — Reg 3(1) and 3(6)"
        clause={
          <>
            <p className="mb-2">
              <strong>Reg 3(1)</strong> — &quot;Every employer shall make a suitable and
              sufficient assessment of (a) the risks to the health and safety of his employees to
              which they are exposed whilst they are at work; and (b) the risks to the health and
              safety of persons not in his employment arising out of or in connection with the
              conduct by him of his undertaking, for the purpose of identifying the measures he
              needs to take to comply with the requirements and prohibitions imposed upon him by
              or under the relevant statutory provisions and by Part II of the Fire Precautions
              (Workplace) Regulations 1997.&quot;
            </p>
            <p>
              <strong>Reg 3(6)</strong> — &quot;Where the employer employs five or more employees,
              he shall record (a) the significant findings of the assessment; and (b) any group of
              his employees identified by it as being especially at risk.&quot;
            </p>
          </>
        }
        meaning={
          <>
            Two duties in two sentences. Reg 3(1) is the assessment duty — &apos;suitable and
            sufficient&apos; covers both employees AND non-employees affected by the work. Reg
            3(6) is the recording duty for firms of five or more employees. Almost every
            electrical contracting firm crosses that threshold. The HSE inspector after an
            incident asks two questions in this order: &apos;show me your risk assessment&apos;
            and &apos;show me how it was kept up to date&apos;. The dynamic walk-round on arrival
            is the answer to the second question.
          </>
        }
        cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 3 — verbatim from legislation.gov.uk."
      />

      <RegsCallout
        source="Health and Safety at Work etc Act 1974 — s.3(1)"
        clause={
          <>
            &quot;It shall be the duty of every employer to conduct his undertaking in such a way
            as to ensure, so far as is reasonably practicable, that persons not in his employment
            who may be affected thereby are not thereby exposed to risks to their health or
            safety.&quot;
          </>
        }
        meaning={
          <>
            The s.3 duty is what catches the customer, the family, the neighbour and any other
            trade in the workspace. The walk-round protects them as well as you. An open consumer
            unit in a household with children is a textbook s.3 risk and an inspector will treat
            the failure to identify it as evidence the undertaking was not being conducted as
            safely as reasonably practicable.
          </>
        }
        cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.3 — verbatim from legislation.gov.uk."
      />

      <InlineCheck
        id={checks[1].id}
        question={checks[1].question}
        options={checks[1].options}
        correctIndex={checks[1].correctIndex}
        explanation={checks[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The structured walk-round routine</ContentEyebrow>

      <ConceptBlock
        title="A repeatable order — outside in, top down"
        plainEnglish="The walk-round is a routine, not a free-flow inspection. Doing it in the same order each time means you don't miss anything. The order most experienced electricians use is outside in (van to area) and top down (ceiling to floor) within each room."
        onSite="On a domestic job the routine takes three to five minutes. On a commercial fit-out it can take fifteen to twenty including the trade-clash check. The time is well-spent — even one missed concealed service or one missed person-in-the-area can cost more in time and money than every walk-round you have ever done combined."
      >
        <p>The recommended routine:</p>
        <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Approach</strong> — walk from the van to the work area. Note pedestrian routes
            you'll be using to carry tools and cable, slip/trip hazards on the route, weather
            affecting access, gates and doors that need to be propped or kept secure for pets and
            children.
          </li>
          <li>
            <strong>Building entry</strong> — confirm the customer is expecting you, identify who
            else is in the building (other trades, family members, vulnerable adults, children,
            pets). Locate emergency isolation valves (gas, water) and the consumer unit you'll be
            working at.
          </li>
          <li>
            <strong>Work area sweep</strong> — top down. Ceiling (overhead trades, fixtures that
            could fall), walls (concealed services, fixings, plaster condition, light level),
            floor (slip/trip, joist orientation if floorboards are up, services in the floor
            void).
          </li>
          <li>
            <strong>Auxiliary spaces</strong> — loft, cellar, garage, plant room — anywhere you
            may need to enter during the work. Lighting, ventilation, access kit requirements.
          </li>
          <li>
            <strong>Confirm and record</strong> — short note in the job pack, anything significant
            that wasn't in the RAMS goes on the dynamic assessment record. Brief the customer on
            any restrictions (rooms to keep clear, doors to keep shut).
          </li>
        </ol>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>CDM 2015 on construction sites</ContentEyebrow>

      <ConceptBlock
        title="On a notifiable site the walk-round starts before you arrive — at the induction"
        plainEnglish="On a notifiable construction site (more than 30 days with 20+ workers, or 500+ person-days) CDM 2015 Reg 13 puts a duty on the principal contractor to provide a site induction covering the construction phase plan, site rules, welfare arrangements, emergency procedures and specific hazards. The induction is the formal mechanism for transferring hazard knowledge before you set foot in the work area."
        onSite="Skip the induction or sign in without listening and you've put yourself outside the site H&S system on day one. CDM 2015 Reg 15 makes it a personal duty on the worker to co-operate with the principal contractor's arrangements — that includes the induction."
      >
        <p>What the induction should cover, and what to ask if it doesn't:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Site layout, welfare facilities (toilets, mess, drying area), parking and pedestrian
            routes.
          </li>
          <li>
            Emergency procedures — fire alarm, assembly point, first aiders, accident reporting
            route.
          </li>
          <li>
            Site rules — PPE policy, sign-in/sign-out, no-go areas, hot-works permits, contractor
            coordination.
          </li>
          <li>
            Specific hazards on this site — asbestos survey results, live services, trade-clash
            zones, structural concerns.
          </li>
          <li>
            Construction phase plan extracts relevant to your work, plus any pre-construction
            information from the principal designer.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Construction (Design and Management) Regulations 2015 — Reg 13(4)"
        clause={
          <>
            &quot;The principal contractor must ensure that — (a) a suitable site induction is
            provided; (b) the necessary steps are taken to prevent access by unauthorised persons
            to the construction site; and (c) facilities that comply with the requirements of
            Schedule 2 are provided throughout the construction phase.&quot;
          </>
        }
        meaning={
          <>
            CDM 2015 Reg 13(4) is the formal hook for site induction on notifiable projects. Reg
            13(1) places the broader duty to plan, manage and monitor the construction phase. Reg
            15 places the corresponding duty on workers to co-operate. As an apprentice arriving
            on a fit-out, the induction is where you learn the site- specific hazards that the
            textbook walk-round can&apos;t teach you.
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
        title="Walking straight into an occupied home and starting work without a walk-round"
        whatHappens={
          <>
            Apprentice arrives at a domestic CU change, customer answers the door, leads them
            straight to the consumer unit. Apprentice opens the toolbox, isolates the supply,
            takes the cover off — and only then notices the toddler watching from behind the
            kitchen door, the partially-open gas valve under the sink, and a pet cat on top of the
            meter cabinet. None of this was in the RAMS because the surveyor visited three weeks
            earlier when the family was at work. By the time the apprentice spots the issues the
            workspace is already partially live and the dynamic risk assessment is now happening
            retrospectively, with tools out.
          </>
        }
        doInstead={
          <>
            Even on a job you&apos;ve been to before, take three to five minutes on arrival to
            walk every room you&apos;ll be working in and the route between them. Note what&apos;s
            changed since the RAMS — people, pets, decoration, weather damage, deliveries. Brief
            the customer on which rooms need to stay clear and why. Record the dynamic findings in
            your job pack. Then open the toolbox.
          </>
        }
      />

      <CommonMistake
        title="Trusting the cable-and-pipe detector as a complete answer"
        whatHappens={
          <>
            Apprentice runs the detector across the wall, sees it light up in one spot, avoids
            that spot, and chases happily through the rest of the wall. Cuts straight through a 22
            mm copper water pipe the detector missed because it was deeper than the detection
            range and oriented in a direction that gave a weak signal. Customer ceiling collapses,
            insurance call follows, the apprentice&apos;s firm picks up the cost of replastering
            and decoration as well as the pipe repair.
          </>
        }
        doInstead={
          <>
            Detector + visual + caution. Look at the floor below for clues to pipe routes
            (radiators, towel rails, kitchen and bathroom positions). Trace gas and water runs
            visually from the meter wherever possible. Cut shallow first and inspect what you
            uncover before going deeper. Treat any positive or intermittent detector reading as a
            positive find until you&apos;ve proven otherwise. The detector is one input, not the
            verdict.
          </>
        }
      />

      <Scenario
        title="Domestic rewire — homeowner shows you the cellar"
        situation={
          <>
            You arrive at a domestic rewire on a 1930s end-terrace. The homeowner takes you
            straight to the cellar and asks &quot;can you sort the lighting down here while
            you&apos;re at it?&quot;. The cellar has: a single bare bulb on a pull-cord that
            doesn&apos;t work, a copper water pipe weeping at a joint just above head height,
            exposed joists with old VIR cabling stapled to them, a textured ceiling, no natural
            light, a step down with no handrail, and an electricity meter on the far wall with the
            last test certificate dated 1987. The RAMS describes the cellar as &quot;limited
            works, lighting only&quot;.
          </>
        }
        whatToDo={
          <>
            Stop. The cellar as found does not match the RAMS. Walk it once with the homeowner,
            write a fresh dynamic assessment listing every hazard in the order you found them:
            people (homeowner present, possible visitors), environment (no light, weeping pipe,
            suspect asbestos textured ceiling on a 1930s build, confined space and trip hazard at
            the step), services (existing VIR cabling potentially live, mains gas in adjacent
            cellar wall void, water leak above head height, meter pre-1990s — likely TT or PME
            with no recent test), fabric (unfinished joists, masonry condition unknown). Call your
            supervisor before touching anything. The realistic next steps are: temporary task
            lighting before any other work, asbestos check on the textured ceiling, a leak fix on
            the water pipe before any electrical work, and a fresh RAMS that reflects what&apos;s
            actually there. The customer&apos;s &quot;while you&apos;re at it&quot; isn&apos;t
            refusable on the spot, but it isn&apos;t doable on the spot either.
          </>
        }
        whyItMatters={
          <>
            A scope-creep request from a customer is the single most common way a small, contained
            job turns into a serious incident. The dynamic walk-round is what gives you the
            evidence to push back politely &mdash; &quot;I can see what you need but I can&apos;t
            safely do it on this visit because of x, y, z&quot;. Without that walk-round the
            apprentice ends up agreeing to the work, dropping into the cellar with no light, and
            disturbing a textured ceiling without a survey. The consequences cascade fast and they
            all sit on the firm&apos;s s.3 / EAWR record.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          "The five minutes before tools come out is the most important five minutes of the day. Skipping it doesn't save time, it just transfers the cost to the moment something goes wrong.",
          'RAMS is the baseline written plan. The dynamic risk assessment is what you do on the day, in the rooms, with the people present. MHSWR Reg 3 effectively requires both.',
          'Sweep four hazard families in order — people, environment, services, fabric. The order is a habit; doing it the same way each time stops you missing one.',
          'People hazards include customers, family, pets, other trades and yourself. HASAWA s.3 makes you responsible for non-employees affected by your work — children in the work zone is a textbook s.3 issue.',
          "Concealed services are the highest-consequence hazard. Detector + visual + caution. Treat any positive or intermittent reading as a positive find until you've proven otherwise.",
          "Asbestos suspicion applies to any building constructed or refurbished before 2000. Treat suspect material as 'asbestos until proven otherwise' and stop until you can verify or arrange a survey.",
          'On a notifiable construction site, CDM 2015 Reg 13 site induction is the formal mechanism for transferring hazard knowledge. Reg 15 makes co-operating with it a personal duty on the worker.',
          "The walk-round is repeated daily on long jobs and whenever conditions or people in the area change. 'I know this site' is the moment a fresh hazard gets missed.",
        ]}
      />

      <Quiz title="Workspace hazards — knowledge check" questions={quizQuestions} />

      {/* ── Prev / next nav ─────────────────────────────────── */}

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        {
          'Remember from L2 — slips, trips, manual handling, working at height. At L3 the supervisor framing — same hazards, deeper response, leadership on housekeeping and control hierarchies.'
        }
      </p>

      <TLDR
        points={[
          'Slips/trips, manual handling, working at height, confined spaces, weather — the everyday workplace hazards. Each has its regulatory home.',
          'WAH Regs 2005 — no height threshold; hierarchy avoid → collective → personal → minimise. MHOR 1992 — avoid → assess → reduce. Confined Spaces 1997 — permit + atmosphere + rescue plan.',
          'L3 supervisor leads on housekeeping, models behaviour, intervenes when issues seen.',
          'PUWER 1998 underpins everything used at work — ladders, podiums, drills, test instruments. Pre-use check, periodic inspection, defects out of service, records kept.',
          'Lone working under MHSWR Reg 3 — check-in regime, no live work / confined space / height above 2m without second person, escalation if check missed.',
          'HSG47 sequence for buried services — Plan, Detect, Identify, Mark, Excavate (hand-dig within 500mm), Maintain awareness, Document.',
        ]}
      />
      <LearningOutcomes
        outcomes={[
          'Describe situations that constitute a hazard in the workplace — slips, trips, manual handling, height, confined spaces, weather.',
          'Explain practices and procedures for addressing each hazard category.',
          'Apply Working at Height Regs 2005 hierarchy: avoid → collective → personal → minimise.',
          'Apply Manual Handling Operations Regs 1992 hierarchy: avoid → assess → reduce.',
          'Identify Confined Spaces Regs 1997 specified risks and required controls.',
          'Recognise weather as a hazard category with seasonal and daily variation.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Headline workplace hazards</ContentEyebrow>
      <ConceptBlock
        title="Slips, trips and falls"
        plainEnglish="Most common workplace injury category. Slips (low friction), trips (low projection caught by foot), falls (loss of balance from height or level). Largely preventable by housekeeping, surface treatment, proper footwear and routing. HSE figures consistently show slips, trips and falls as the largest single cause of non-fatal injuries reported under RIDDOR, and a major contributor to over-three-day absence claims. For electrical trades the slip/trip risk is amplified by the materials we carry, the cables we run, and the often-temporary nature of our worksites."
        onSite="L3 supervisor leads on housekeeping. End-of-day clean-up, mid-task tidies, cable routing away from walking lines, materials kept clear of corridors. Five minutes of preventive work saves most trip incidents. On a typical fit-out the L3 walks the route every couple of hours: cables coiled or in bridges, off-cuts in a single bin, drink containers off the floor, walkways cleared, and any spillage from solvents or coolant cleaned immediately. The reflex is to maintain the route, not to step around the mess."
      >
        <p>Common causes and controls:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Cable across walking routes</strong> → cable bridges, route over doorways,
            plan cable runs.
          </li>
          <li>
            <strong>Tools / materials on floor</strong> → end-of-day clean-up, dedicated lay-down
            areas.
          </li>
          <li>
            <strong>Wet floor</strong> → signage, anti-slip mats, immediate clean-up, footwear.
          </li>
          <li>
            <strong>Damaged surface</strong> → barrier, signage, escalate for repair.
          </li>
          <li>
            <strong>Lighting inadequate</strong> → temporary task lighting.
          </li>
          <li>
            <strong>Footwear</strong> → safety footwear (EN ISO 20345) with appropriate sole.
          </li>
          <li>
            <strong>Carrying obscuring vision</strong> → split the load; team-carry; clear route
            before lift.
          </li>
          <li>
            <strong>Step changes / thresholds</strong> → mark with high-visibility tape; brief
            operatives; consider temporary ramp.
          </li>
          <li>
            <strong>Outdoor conditions tracked in</strong> → matting at entrances; check entrances
            during wet / icy weather.
          </li>
          <li>
            <strong>Construction debris</strong> → daily skip / bin emptying; never leave bagged
            debris in corridors.
          </li>
          <li>
            <strong>Trailing leads</strong> → 110 V transformer at the right end of the run; cable
            bridges where lines cross walkways.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Working at Height Regulations 2005 — Reg 6"
        clause={
          <>
            Hierarchy: "(2) Every employer shall ensure that work is not carried out at height
            where it is reasonably practicable to carry out the work safely otherwise than at
            height. (3) Where work is carried out at height, every employer shall take suitable
            and sufficient measures to prevent, so far as is reasonably practicable, any person
            falling a distance liable to cause personal injury."
          </>
        }
        meaning={
          <>
            The WAH hierarchy: avoid &gt; collective protection &gt; personal protection &gt;
            minimise. NO HEIGHT THRESHOLD — applies to any height where injury could result. The
            old &quot;above 2m&quot; rule was abolished in 2005.
          </>
        }
        cite="Source: Working at Height Regulations 2005 (SI 2005/735), Reg 6."
      />

      <InlineCheck {...checks2[0]} />

      <SectionRule />
      <ContentEyebrow>Manual handling and confined spaces</ContentEyebrow>
      <ConceptBlock
        title="Manual Handling Operations Regs 1992"
        plainEnglish="No legal maximum lift weight — hierarchy is avoid → assess → reduce. HSE filter values give guideline weights for different lift zones; risk assessment uses TILE (Task, Individual, Load, Environment)."
        onSite="Common electrical-trade manual-handling hazards: cable drums, motors, switchgear, MCBs in bulk, ladders, platforms, tools. Mechanical handling preferred; team lifts where needed; training on technique reduces but doesn't eliminate risk."
      >
        <p>TILE assessment factors:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Task</strong> — frequency, distance, posture required, twisting, reaching.
          </li>
          <li>
            <strong>Individual</strong> — capability, training, physical condition, age, prior
            injury.
          </li>
          <li>
            <strong>Load</strong> — weight, size, shape, grip, stability, temperature.
          </li>
          <li>
            <strong>Environment</strong> — space, surface, lighting, weather, obstructions.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Confined Spaces Regulations 1997"
        plainEnglish="A confined space is substantially enclosed AND has foreseeable specified risk (fire/explosion, asphyxiation, drowning, hyperthermia, entrapment with serious injury). Examples: tanks, vessels, sewers, ducts, chambers, some voids and lofts depending on conditions."
        onSite="Permit-to-work + atmosphere monitoring + rescue plan + standby person + training are the typical controls. Not many electrical-trade jobs hit confined-space classification, but lofts, cellars, plant rooms, underfloor voids and ductwork can in some cases."
      >
        <p>Confined space controls:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Avoid entry where reasonably practicable.</li>
          <li>
            If entry necessary — permit-to-work specifying access, work, time period, controls.
          </li>
          <li>Atmosphere monitoring before and during entry (oxygen, flammable, toxic).</li>
          <li>
            Rescue plan (NOT 999 — emergency services rescue is too slow; the rescue plan is
            in-house).
          </li>
          <li>Standby person outside the space, in communication with entrant.</li>
          <li>
            Trained personnel (Confined Space Awareness, sometimes Specialist depending on the
            space).
          </li>
          <li>
            Equipment — gas detector, harness with rescue line where appropriate, comms, PPE.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Confined Spaces Regulations 1997 — Reg 4(1)"
        clause={
          <>
            "No person at work shall enter a confined space to carry out work for any purpose
            unless it is not reasonably practicable to achieve that purpose without such entry."
          </>
        }
        meaning={
          <>
            Reg 4 — avoid entry where reasonably practicable. Where entry is necessary, Reg 4(2)
            requires a safe system of work; Reg 5 requires emergency arrangements (rescue plan).
            The Regs are absolute on the avoidance principle.
          </>
        }
        cite="Source: Confined Spaces Regulations 1997 (SI 1997/1713), Reg 4."
      />

      <RegsCallout
        source="Manual Handling Operations Regulations 1992 — Reg 4(1)"
        clause={
          <>
            "Each employer shall — (a) so far as is reasonably practicable, avoid the need for his
            employees to undertake any manual handling operations at work which involve a risk of
            their being injured; or (b) where it is not reasonably practicable to avoid the need
            for his employees to undertake any manual handling operations at work which involve a
            risk of their being injured — (i) make a suitable and sufficient assessment of all
            such manual handling operations to be undertaken by them, having regard to the factors
            which are specified in column 1 of Schedule 1 to these Regulations and considering the
            questions which are specified in the corresponding entry in column 2 of that Schedule,
            (ii) take appropriate steps to reduce the risk of injury to those employees arising
            out of their undertaking any such manual handling operations to the lowest level
            reasonably practicable, and (iii) take appropriate steps to provide any of those
            employees who are undertaking any such manual handling operations with general
            indications and, where it is reasonably practicable to do so, precise information on —
            (aa) the weight of each load, and (bb) the heaviest side of any load whose centre of
            gravity is not positioned centrally."
          </>
        }
        meaning={
          <>
            MHOR Reg 4 codifies the avoid → assess → reduce hierarchy for manual handling. The
            Schedule 1 factors are the TILE check (Task / Individual / Load / Environment) plus
            other factors. There is no fixed weight maximum in the Regs themselves — assessment is
            task-specific. The L3 supervisor uses TILE on every materials lift that is
            non-trivial: cable drums, CU enclosures, ladders, plant.
          </>
        }
        cite="Source: Manual Handling Operations Regulations 1992 (SI 1992/2793), Reg 4."
      />

      <InlineCheck {...checks2[1]} />
      <InlineCheck {...checks2[2]} />

      <SectionRule />
      <ContentEyebrow>Weather, lighting and miscellaneous</ContentEyebrow>
      <ConceptBlock
        title="Weather as a hazard category"
        plainEnglish="Heat (loft work in summer = heat stress; commercial plant rooms), cold (numb fingers, brittle PVC, ice slip), rain (first-fix in stud walls = water tracking, shock risk; outdoor work = slip), wind (height work risk, dropped tools), lightning (outdoor work). Weather is the hazard category that L2 apprentices most often underestimate because it doesn't feel like a workplace control issue — it feels like &quot;just weather&quot;. The L3 reframing is that the weather is a contributory hazard that interacts with the primary hazards of the work; a ladder is safer in still air than in 25 mph gusts; a loft is safer at 15°C than at 45°C; first-fix electrical work is safer in dry conditions than during rain that's tracking water into stud-wall voids."
        onSite="Dynamic risk assessment on arrival should include the day's weather. Adapt scope or scheduling. Roofing in 30°C+ summer heat or in winter winds is rarely the right plan. The L3 supervisor checks2 the forecast the evening before each working day; flags weather-sensitive tasks; has contingency for the schedule if forecast becomes adverse. A small allowance for weather flex in the programme is normal practice; an L3 who refuses to flex when conditions are unsafe is doing the job correctly."
      >
        <p>Weather control responses:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Heat</strong> — hydration, breaks, lighter PPE where compatible, restrict loft
            work to cooler hours.
          </li>
          <li>
            <strong>Cold</strong> — appropriate clothing, hand warmers, flexible PVC handling, ice
            / surface checks2.
          </li>
          <li>
            <strong>Rain</strong> — postpone outdoor first-fix, cover stud-wall openings,
            additional drying time.
          </li>
          <li>
            <strong>Wind</strong> — check forecast for height work; postpone above wind thresholds
            (varies by platform but commonly 17-23 mph for MEWPs per manufacturer).
          </li>
          <li>
            <strong>Lightning</strong> — postpone outdoor / roof work during nearby lightning.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Lighting and visibility"
        plainEnglish="Inadequate task lighting hides hazards (trip risks, services, structural defects) and increases error rates. The Workplace (HS&W) Regs 1992 Reg 8 requires suitable and sufficient lighting."
        onSite="Cellars, lofts, plant rooms, unfinished new-builds — all common locations where ambient light is inadequate. Bring temporary task lighting; record on dynamic assessment."
      >
        <p>Lighting standards:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>General task lighting — typically 200-500 lux for routine work.</li>
          <li>Detail work — 500-1,000 lux.</li>
          <li>
            Switchroom inspection — 500+ lux for accurate cable / termination identification.
          </li>
          <li>
            Emergency lighting (BS 5266) — separate from task lighting; provides escape route
            illumination on power failure.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>Equipment, services and lone working</ContentEyebrow>
      <ConceptBlock
        title="PUWER 1998 — equipment provision and inspection"
        plainEnglish="Provision and Use of Work Equipment Regs 1998 require any equipment provided for work to be suitable, safe, properly maintained, used by trained operatives, with appropriate guards / safety devices, inspected periodically. Covers tools, ladders, MEWPs, podium steps, drills, test instruments — anything used at work. PUWER 1998 implements the EU Work Equipment Directive; the duties run on the employer (provision and maintenance) and the operative (use as instructed and trained). Reg 4 requires equipment to be suitable for its purpose; Reg 5 requires maintenance; Reg 6 requires inspection where conditions cause deterioration; Reg 7 restricts specific risks; Reg 8 requires information and instructions; Reg 9 requires training; Regs 11-24 cover specific hazards (dangerous parts, energy isolation, stability, lighting, markings, warnings)."
        onSite="The L3 supervisor verifies PUWER compliance: pre-use checks2 done; periodic inspection records current; defects reported and equipment removed from service; substitute equipment available. PAT testing of portable electrical equipment is one specific PUWER discharge. On a typical site the L3 walks the equipment register: ladders with current periodic inspection; PAT records on all 110 V transformers, leads and tools; LOLER reports on MEWPs and lifting harnesses; calibration records on test instruments. Any item without current paperwork is taken out of service immediately; a defective equipment tag goes on and stays until the inspection is current."
      >
        <p>PUWER inspection regimes:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Pre-use</strong> — operative checks2 before each use (visible damage,
            function).
          </li>
          <li>
            <strong>Periodic detailed inspection</strong> — competent person at regular intervals
            (PAT, ladder inspection, MEWP LOLER 6-monthly).
          </li>
          <li>
            <strong>Post-event</strong> — after damage, dropping, exposure to extreme conditions.
          </li>
          <li>
            <strong>Records</strong> — inspection log per item; pass / fail / actions.
          </li>
          <li>
            <strong>Defective</strong> — removed from service immediately; tagged out; repaired or
            scrapped.
          </li>
          <li>
            <strong>LOLER 1998</strong> — additional duties for lifting equipment (MEWPs,
            harnesses, hoists).
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Buried services — strike avoidance"
        plainEnglish='Hitting buried services (electricity, gas, water, telecoms) causes injury, supply loss, prosecution and major commercial damage. HSG47 "Avoiding danger from underground services" sets the standard: drawings + detection + safe digging method. The HSE has prosecuted multiple high-profile cases following service strikes — gas explosions following gas-main strikes, electrocutions following live-cable strikes during excavation, flooding from water-main strikes. Service-strike incidents are routinely category-1 harm under the Sentencing Council guideline because the credible worst-case is fatal or life-changing.'
        onSite="Before any excavation, drilling or fixing into walls / floors / ceilings of any age, services check. Drawings are starting point; CAT + Genny detection confirms; trial holes / hand-dig within 500mm of detected service. The L3 supervisor doesn't skip these steps even on small jobs. On internal works the same principle applies — drilling into a wall for a fixing without first locating buried services has caused multiple electrocutions and gas-leak incidents. Use a multi-mode detector, scan the area, mark the safe zones, and check at each new location."
      >
        <p>HSG47 sequence:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>Plan — drawings from utility companies, building surveys.</li>
          <li>
            Detect — CAT (cable) + Genny (signal generator) + GPR (ground radar) for complex
            sites.
          </li>
          <li>Identify — visual inspection of detected services where safely accessible.</li>
          <li>Mark — clear surface marking before work starts.</li>
          <li>
            Excavate safely — hand-dig within 500mm of any detected service; mechanical only
            beyond.
          </li>
          <li>Maintain awareness — re-detect as excavation progresses.</li>
          <li>Document — services found, marking, methods used.</li>
        </ol>
      </ConceptBlock>

      <ConceptBlock
        title="Lone working — the additional risk profile"
        plainEnglish='Working alone means no immediate help if something goes wrong. MHSWR Reg 3 risk assessment must specifically address lone working — what could happen, what&apos;s the response, how does help reach you. Common in domestic call-outs and small commercial jobs. HSE INDG73 "Working alone — health and safety guidance on the risks of lone working" is the headline reference. Lone working is not unlawful but particular activities — confined-space entry, live electrical work, work at height, work in remote locations, work with hazardous substances at high concentration, work involving public-contact risk — are routinely identified as unsuitable for lone working in a competent risk assessment.'
        onSite="The L3 supervisor sets up the lone-working system: regular check-ins, lone-worker app or buddy-call system, escalation if check missed, brief on hazards specific to lone work (no immediate first-aid response, no second person for live work / confined space). In practice this means the firm has a documented lone-working procedure; the operative knows the check-in regime; the office knows what to do if a check is missed; emergency contacts are documented; and the operative has the means to summon help (phone signal verified, lone-worker device, customer aware of arrangements)."
      >
        <p>Lone working controls:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Risk assessment</strong> — specifically addresses lone-working scenarios.
          </li>
          <li>
            <strong>Check-in regime</strong> — periodic call to office / buddy; time-based or
            task-based.
          </li>
          <li>
            <strong>Lone worker apps</strong> — GPS tracking, panic button, no-response
            escalation.
          </li>
          <li>
            <strong>No-go activities</strong> — live working, confined space, working at height
            &gt;2m without second person.
          </li>
          <li>
            <strong>Communication</strong> — phone signal verified at site; backup arranged.
          </li>
          <li>
            <strong>Customer aware</strong> — domestic customer knows you&apos;re alone; can
            summon help if needed.
          </li>
          <li>
            <strong>Vulnerable customer awareness</strong> — additional safeguarding; never lone
            with vulnerable persons without protocol.
          </li>
          <li>
            <strong>Escalation</strong> — what happens if check-in is missed.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <CommonMistake
        title="Treating a customer's loft as 'just a loft' without confined-space check"
        whatHappens={
          <>
            Apprentice enters customer&apos;s loft to run cable in summer afternoon; loft is
            poorly ventilated; temperature 50°C+; apprentice becomes disoriented; fortunately
            escapes but reports near-miss. Hyperthermia risk + restricted access met
            confined-space criteria; entry was not properly assessed.
          </>
        }
        doInstead={
          <>
            Assess loft access on arrival. Ventilation? Temperature? Access route? Solo or
            accompanied? In summer, schedule loft work for cooler hours; carry water; brief on
            heat-stress signs; stay in communication.
          </>
        }
      />

      <CommonMistake
        title="Using a stepladder where a low-level platform would be safer"
        whatHappens={
          <>
            Apprentice uses a stepladder to fix a luminaire 2.4m off the floor; loses balance
            reaching sideways; falls onto tools below; ankle fracture. WAH Regs Reg 6 hierarchy
            not followed — collective protection (a wheeled platform with handrails) was
            reasonably practicable.
          </>
        }
        doInstead={
          <>
            WAH hierarchy applies even to low-level work. Wheeled platforms, podium steps with
            handrails, MEWPs all preferable to stepladders for any sustained work or where
            reaching is involved. Stepladder use should be brief and restricted.
          </>
        }
      />

      <Scenario
        title="Walking a domestic refurbishment for workplace hazards"
        situation={
          <>
            You arrive at a customer's home for a 3-day rewire. Walking through: damp recently
            treated in cellar (still drying); kitchen being decorated by another trade (paint
            solvents in air); customer has 3 children at school but home from 3:30pm; loft access
            via fold-down ladder, no permanent handrail; service void in floor between ground and
            first floor with joists at unknown spacing; outside it’s raining and forecast for
            storms; nearest A&E 25 minutes drive.
          </>
        }
        whatToDo={
          <>
            Identify hazards systematically. Slips: wet kitchen (paint), damp cellar — keep clear
            of wet areas, anti-slip footwear, signage. Manual handling: cable drums, materials
            transport — plan routes, mechanical aids where possible. Working at height: loft
            access via ladder (WAH Regs apply), no handrail at top — set up additional fall arrest
            if extended loft work, brief team. Confined space: cellar may approach if ventilation
            poor — check before entering. Other trades: solvent fume from decoration —
            ventilation, PPE, scheduling to avoid overlap. Children: from 3:30pm, brief customer
            on exclusion of work areas; secure tools and live work before each break. Weather:
            storm forecast — cover stud-wall openings before storm, no outdoor work during
            lightning. Service void: unknown joist spacing — caution drilling, use detector,
            expect surprises. Document all on dynamic assessment. Brief team. Plan housekeeping
            rhythm.
          </>
        }
        whyItMatters={
          <>
            The systematic walk-through catches what a single-track mindset misses. Each hazard
            category contributes; together they shape the day&apos;s working pattern. The L3
            supervisor&apos;s structured approach turns &quot;it&apos;ll be fine&quot; intuition
            into evidence-based control. The hazards aren&apos;t made up — they&apos;re a
            realistic mix that any apprentice will meet.
          </>
        }
      />

      <SectionRule />
      <ContentEyebrow>Manual Handling Operations Regs 1992 — the TILE assessment</ContentEyebrow>

      <ConceptBlock
        title="Why '25 kg' isn't actually in the regulations"
        plainEnglish="The Manual Handling Operations Regulations 1992 (as amended) set no fixed weight limit. The HSE's guidance figures (25 kg lifted at waist height by a man, lower for women and at other postures) are guideline filters not legal limits. The Regs require the employer to AVOID the need for manual handling so far as reasonably practicable; where unavoidable, ASSESS the operation using the TILE framework (Task, Individual, Load, Environment); and REDUCE the risk of injury so far as reasonably practicable."
        onSite="The L3 supervisor reflex on any manual-handling task: avoid first (mechanical aids, smaller loads, reorganise), assess where unavoidable, reduce where possible. Heavy CU and switchgear are routine: most can be split, partial assembly on the floor, two-person lift, trolley or stair-climber for moving. The 25 kg figure is useful as a flag — anything above it deserves explicit assessment — but it's not a permission slip."
      >
        <p>TILE assessment factors:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>T — Task</strong>: holding away from body, twisting, stooping, reaching
            upwards, large vertical movement, repetition, distance carried, pushing / pulling.
          </li>
          <li>
            <strong>I — Individual</strong>: strength, build, fitness, pregnancy, injury history,
            age, knowledge / training, clothing or PPE constraints.
          </li>
          <li>
            <strong>L — Load</strong>: weight, bulky / unwieldy, difficult grip, hot / cold, sharp
            edges, unstable contents, unpredictable shift.
          </li>
          <li>
            <strong>E — Environment</strong>: space constraints, uneven / slippery surfaces,
            varied levels, hot / cold environment, ventilation, lighting, weather (outdoor work).
          </li>
          <li>
            <strong>Output</strong>: control measures matched to the highest-risk factors
            identified.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>Permit-to-work systems and safe systems of work</ContentEyebrow>

      <ConceptBlock
        title="When a written permit is the right control"
        plainEnglish='A permit-to-work is a formal written authorisation for high-risk activity. It records that the hazards have been assessed, controls put in place, isolations confirmed, time period agreed, persons identified, communication channels established, and that the work cannot start without a named issuer&apos;s signature. Permits are not a regulatory invention — they are the documented expression of the "safe system of work" required by HASAWA s.2(2)(a) and reinforced by MHSWR Reg 5 and the Confined Spaces Regulations 1997. Where the activity is high-consequence and engages multiple parties or shifts, the permit is the mechanism that keeps the safe system in writing across the handover boundary.'
        onSite="Typical permit categories in electrical work: hot works (anything generating heat, sparks, naked flame — soldering, brazing, grinding, MIG welding); confined-space entry; live electrical work (rare and only where EAWR Reg 14 is satisfied); work at height in high-risk locations; energised testing on operational HV systems; work adjacent to live overhead lines. The L3 supervisor reads the permit before signing — does it match the actual work; are the isolations the right ones; is the time period realistic; is the rescue / standby arrangement documented; are atmosphere readings on the permit if confined space."
      >
        <p>Permit-to-work elements:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Identification</strong> — unique permit number, date, location, exact work
            scope.
          </li>
          <li>
            <strong>Hazards and controls</strong> — what could go wrong; what controls are in
            place; residual risk.
          </li>
          <li>
            <strong>Isolations</strong> — list of physical isolations with tags / locks confirmed.
          </li>
          <li>
            <strong>Atmosphere / environment</strong> — for confined space, pre-entry readings
            (O2, LEL, toxic).
          </li>
          <li>
            <strong>Time period</strong> — start and end, with explicit extension procedure if
            needed.
          </li>
          <li>
            <strong>Persons</strong> — issuer, performer, standby, who is authorised to be in the
            work area.
          </li>
          <li>
            <strong>Communication</strong> — channels, check-in frequency, escalation routes.
          </li>
          <li>
            <strong>Rescue / emergency</strong> — for confined space, explicit rescue plan with
            named persons.
          </li>
          <li>
            <strong>Signature gates</strong> — issue, acceptance, suspension, handback. Permit
            cannot be activated without all required signatures.
          </li>
          <li>
            <strong>Closure</strong> — work complete, area inspected, isolations reinstated where
            appropriate, permit closed and filed.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="The hierarchy of control applied to every hazard category"
        plainEnglish="Underlying every regulation in this lesson — WAH Regs hierarchy, MHOR hierarchy, Confined Spaces avoidance principle — is the same MHSWR 1999 Schedule 1 hierarchy of control. Avoid → substitute → engineering control → administrative control → PPE. PPE is last not because it doesn't work but because it depends on the wearer wearing it correctly, all the time, and provides no protection if the controls above have failed. The L3 supervisor applies the hierarchy on every hazard category, every day."
        onSite="Practical examples on a typical electrical-trade day: avoid working at height by lowering the panel to ground level for second-fix where possible; substitute a heavy cable drum with two smaller drums; engineering control by using a wheeled platform with handrails instead of a stepladder; administrative control by scheduling loft work for cool hours and rotating operatives; PPE such as cut-resistant gloves only as the last layer. Where the L3 sees a job where PPE is being relied on as the primary control, the supervisor reflex is to walk back up the hierarchy and ask why the higher-order controls aren't in place."
      >
        <p>The MHSWR Schedule 1 principles of prevention:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Avoid risks</strong> — can the activity be done a different way that
            eliminates the hazard?
          </li>
          <li>
            <strong>Evaluate risks that cannot be avoided</strong> — risk assessment is the
            documented evaluation.
          </li>
          <li>
            <strong>Combat risks at source</strong> — fix the cause, not just the symptom (e.g.
            clean up the spillage, don&apos;t just put down a wet-floor sign).
          </li>
          <li>
            <strong>Adapt work to the individual</strong> — design the task around the person
            rather than expecting the person to compensate for poor design.
          </li>
          <li>
            <strong>Adapt to technical progress</strong> — newer / safer equipment as it becomes
            available.
          </li>
          <li>
            <strong>Replace dangerous by less dangerous</strong> — substitution where elimination
            isn&apos;t possible.
          </li>
          <li>
            <strong>Develop coherent prevention policy</strong> — overall approach not just
            isolated controls.
          </li>
          <li>
            <strong>Give collective measures priority over individual</strong>— collective
            protection (guardrail) beats individual PPE (harness) where both are options.
          </li>
          <li>
            <strong>Give appropriate instructions</strong> — training, information, supervision
            underpin every control.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Management of Health and Safety at Work Regulations 1999 — Reg 5(1)"
        clause={
          <>
            &quot;Every employer shall make and give effect to such arrangements as are
            appropriate, having regard to the nature of his activities and the size of his
            undertaking, for the effective planning, organisation, control, monitoring and review
            of the preventive and protective measures.&quot;
          </>
        }
        meaning={
          <>
            Reg 5 is the regulatory home for the safe-system-of-work concept. Permit-to-work
            systems are one expression of Reg 5 arrangements; site inductions, RAMS, dynamic risk
            assessment, supervision and lessons-learned reviews are all Reg 5 arrangements. The L3
            supervisor operationalises Reg 5 by running the day-to-day cycle of plan, brief, do,
            check, review.
          </>
        }
        cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 5."
      />

      <SectionRule />
      <ContentEyebrow>Work at Height in detail — WAH Regs 2005</ContentEyebrow>

      <ConceptBlock
        title="What the regulations actually say about the hierarchy"
        plainEnglish="WAH Regs 2005 Reg 6 is the heart of the regime. The duty is to avoid work at height where reasonably practicable; where it cannot be avoided, take suitable and sufficient measures to prevent any person falling a distance liable to cause personal injury; and where the risk of a fall remains, minimise the distance and consequences of any fall. The Regs were a deliberate shift from the old 2-metre rule (Construction (Working Places) Regs 1966 era) to a risk-based approach with no height threshold. A fall from a low working platform onto a hard surface, into a hole, or onto exposed reinforcement can be as serious as a fall from height."
        onSite="The L3 reading of WAH is to apply the hierarchy on every height-related task, not just the obviously dangerous ones. Changing a luminaire 2.4 m off the floor is work at height. Working off the top step of a stepladder is work at height. Standing on a hop-up to fit a smoke detector is work at height. The hierarchy still applies — can the work be done from the ground (rise-and-fall fitting; pre-assembling on the floor)? If not, can collective protection (wheeled platform with handrails, MEWP) be used? If not, personal fall protection? Only then PPE-equivalent items like ladder use under Schedule 6."
      >
        <p>WAH Regs key controls beyond Reg 6:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Reg 4</strong> — Organisation and planning of work at height.
          </li>
          <li>
            <strong>Reg 5</strong> — Competence of those engaged in work at height.
          </li>
          <li>
            <strong>Reg 7</strong> — Selection of work equipment for work at height (the
            hierarchy).
          </li>
          <li>
            <strong>Reg 8</strong> — Requirements for particular work equipment (scaffolds, MEWPs,
            ladders).
          </li>
          <li>
            <strong>Reg 9</strong> — Fragile surfaces (often relevant on roof work).
          </li>
          <li>
            <strong>Reg 10</strong> — Falling objects (toe-boards, brick guards, debris netting).
          </li>
          <li>
            <strong>Reg 11</strong> — Danger areas (preventing unauthorised access).
          </li>
          <li>
            <strong>Reg 12</strong> — Inspection of work equipment (pre-use, periodic,
            post-event).
          </li>
          <li>
            <strong>Schedule 6</strong> — Detailed requirements for ladder use including
            stability, surface, secure handhold, justification from risk assessment.
          </li>
          <li>
            <strong>Schedule 7</strong> — Inspection of working platforms (weekly scaffold
            inspection by competent person).
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="MEWPs — LOLER 1998 interaction and the L3 reflex"
        plainEnglish="Mobile Elevated Work Platforms (scissor-lifts, boom-lifts, cherry-pickers, vehicle-mounted platforms) are lifting equipment under LOLER 1998 as well as work-at-height equipment under WAH Regs 2005. They require thorough examination by a competent person every 6 months under LOLER Reg 9 (the equivalent of a vehicle MOT for the lifting mechanism). Daily pre-use checks2 are still required. Operators must be trained and authorised — IPAF (International Powered Access Federation) certification is the recognised industry standard."
        onSite="The L3 reflex on any MEWP work: check the LOLER thorough-examination report is in date (within the last 6 months) and visible on the machine; check the daily pre-use checklist has been completed; verify the operator is IPAF-trained for the specific category (1a, 1b, 3a, 3b cover the main MEWP types); confirm the ground assessment — slope, surface bearing capacity, overhead obstructions including power lines, wind conditions. Most manufacturers specify maximum wind speeds (commonly 12.5 m/s = 28 mph) above which the MEWP must not be used; some sites set lower limits."
      >
        <p>MEWP-specific risk areas:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Entrapment / crushing against fixed structure</strong>— the killer category
            for MEWPs; secondary guarding devices (anti-entrapment bars / sensors) increasingly
            fitted.
          </li>
          <li>
            <strong>Overturning</strong> — soft ground, slope, outriggers not deployed correctly,
            overloading.
          </li>
          <li>
            <strong>Falls from the basket</strong> — operator stepping outside; harness with
            restraint lanyard required on boom-type MEWPs.
          </li>
          <li>
            <strong>Contact with overhead lines</strong> — minimum clearance distances per ENA
            G39, BS EN 50110-1.
          </li>
          <li>
            <strong>Wind speed</strong> — manufacturer&apos;s limit must not be exceeded; site
            limits often lower.
          </li>
          <li>
            <strong>Rescue plan</strong> — if the operator is incapacitated aloft, how is the
            basket lowered? Ground-level controls allow rescue; competent person must know the
            procedure.
          </li>
          <li>
            <strong>LOLER thorough examination</strong> — every 6 months; report retained on
            machine; missing report = MEWP out of service.
          </li>
          <li>
            <strong>Pre-use daily check</strong> — by operator; documented on machine&apos;s daily
            log.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Roof work — fragile surfaces and edge protection"
        plainEnglish="Roof work is the highest-risk subset of work at height. Fragile surfaces — asbestos cement sheeting, rooflights, fibre-cement panels, old slate, polycarbonate sheeting — account for many fall-through fatalities each year. WAH Regs Reg 9 places specific duties around fragile surfaces. Edge protection — guardrails, scaffold edge protection, or roof-edge collective protection systems — is the primary control on flat roofs."
        onSite="The L3 reflex on any roof work: identify the roof type (sloping or flat; tiled, sheeted, membrane, slated); identify fragile elements (rooflights, valley details, decayed sections); plan access (tower scaffold, scaffold staircase, MEWP, fixed access); plan edge protection (handrails or harness anchored to suitable points); plan for fragile surface (crawl boards, fall netting underneath, harness fixed to running line). Roof work without survey and plan is exposed to multiple regulations simultaneously — WAH Regs Reg 4 (planning), Reg 5 (competence), Reg 7 (equipment selection), Reg 9 (fragile surface), Reg 10 (falling objects)."
      >
        <p>Roof-work checklist for the L3 supervisor:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Roof survey</strong> — before any work; identifies fragile surfaces,
            structural condition, access points.
          </li>
          <li>
            <strong>Method statement</strong> — written for any non-trivial roof work; covers
            access, edge protection, fragile-surface controls.
          </li>
          <li>
            <strong>Edge protection</strong> — guardrails or scaffold edge-protection where flat
            roof; harness + anchor for sloping.
          </li>
          <li>
            <strong>Fragile-surface control</strong> — crawl boards, fall netting, never step on
            rooflights.
          </li>
          <li>
            <strong>Falling objects</strong> — toe-boards, brick guards, debris netting; exclusion
            zone below.
          </li>
          <li>
            <strong>Weather window</strong> — wind, rain, ice all reasons to postpone.
          </li>
          <li>
            <strong>Rescue plan</strong> — if a fall occurs into the harness, suspension trauma is
            life-threatening within 30 minutes; rescue must be planned in advance.
          </li>
          <li>
            <strong>Permit-to-work</strong> — on complex roof work, particularly on operational
            buildings.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Work at Height Regulations 2005 — Reg 4(1)"
        clause={
          <>
            &quot;Every employer shall ensure that work at height is — (a) properly planned; (b)
            appropriately supervised; and (c) carried out in a manner which is so far as is
            reasonably practicable safe, and that its planning includes the selection of work
            equipment in accordance with regulation 7.&quot;
          </>
        }
        meaning={
          <>
            Reg 4 — the planning duty for work at height. &quot;Properly planned&quot; means risk
            assessed, method statement where complex, equipment selected per Reg 7 hierarchy,
            persons competent under Reg 5. &quot;Appropriately supervised&quot; means real
            supervision by competent person, not nominal. The L3 supervisor operationalises Reg 4
            by writing or contributing to the method statement, selecting the right access
            equipment, and being present during the high-risk phases.
          </>
        }
        cite="Source: Work at Height Regulations 2005 (SI 2005/735), Reg 4."
      />

      <RegsCallout
        source="Confined Spaces Regulations 1997 — Reg 5(1)"
        clause={
          <>
            &quot;Without prejudice to the requirements of regulation 4, no person at work shall
            enter or carry out any work in a confined space (other than for the purpose of rescue
            from a confined space) unless there has been prepared in respect of that confined
            space suitable and sufficient arrangements for the rescue of persons in the event of
            an emergency, whether or not arising out of a specified risk.&quot;
          </>
        }
        meaning={
          <>
            Reg 5 — the rescue arrangements duty. Crucially, the rescue plan must exist BEFORE
            entry. Calling 999 is not the rescue plan — fire-and-rescue response times are
            typically 8-15 minutes, far longer than someone can survive in an oxygen-deficient
            atmosphere. The rescue arrangements must be capable of acting within the relevant
            survival window for the specified risk identified.
          </>
        }
        cite="Source: Confined Spaces Regulations 1997 (SI 1997/1713), Reg 5."
      />

      <ConceptBlock
        title="Confined Spaces Regulations 1997 — the 'specified risk' test in practice"
        plainEnglish="The Confined Spaces Regulations 1997 define a confined space by two cumulative tests: (a) it is substantially enclosed, and (b) there is a reasonably foreseeable specified risk arising from its enclosed nature. The specified risks are listed in the Regulations themselves — serious injury from fire or explosion; loss of consciousness from increase in body temperature; loss of consciousness or asphyxiation from gas, fume, vapour or oxygen deficiency; drowning from a free-flowing solid or liquid; asphyxiation from a free-flowing solid. The key word is 'reasonably foreseeable' — not 'currently present' but 'could foreseeably arise during the work'."
        onSite="The L3 reading: don't test the space only at the moment of entry; consider what could arise during the work. A loft is not normally an oxygen-deficient atmosphere, but installing in summer in a poorly-ventilated roof void with restricted access could foreseeably produce heat-related loss of consciousness — that makes it a confined space under Reg 5 specified-risk (b). Apply the Regs accordingly: safe system of work under Reg 4, emergency arrangements under Reg 5, atmosphere checks2 if any gas risk could arise, second person aware of the entry and check-in regime, training to recognise warning signs."
      >
        <p>The specified risks defined by Reg 1(2) of the 1997 Regulations:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Serious injury arising from fire or explosion</strong>— flammable atmosphere,
            ignition source, restricted egress.
          </li>
          <li>
            <strong>Loss of consciousness arising from increase in body temperature</strong> —
            heat stress in enclosed, poorly-ventilated space.
          </li>
          <li>
            <strong>
              Loss of consciousness or asphyxiation arising from gas, fume, vapour or lack of
              oxygen
            </strong>{' '}
            — including displacement by inert gas (nitrogen purge), accumulation of CO2 or
            hydrogen sulphide, oxygen consumption by combustion or biological processes.
          </li>
          <li>
            <strong>Drowning arising from an increase in the level of a liquid</strong> — sewers,
            tanks, sumps with valve actuation possibilities.
          </li>
          <li>
            <strong>Asphyxiation arising from a free-flowing solid</strong>— silos, hoppers, bins;
            engulfment risk.
          </li>
          <li>
            <strong>Inability to reach a respirable environment</strong>— entrapment by collapse
            of fill material with risk of serious injury.
          </li>
        </ul>
      </ConceptBlock>

      <Scenario
        title="Hot works in an occupied retail unit"
        situation={
          <>
            A small retail unit is having shopfront alterations and you are asked to chase out and
            re-route SWA cable to the new till position. The customer wants the work done during
            opening hours because they can&apos;t afford to close. The chasing will involve angle
            grinder use which generates significant sparks. There is timber stud-work nearby; the
            unit has carpet flooring; smoke detection is active.
          </>
        }
        whatToDo={
          <>
            Stop and apply the hot-works framework. (1) Avoid first — can the cable be re-routed
            without chasing, run on the surface in dado trunking, or done out-of-hours when the
            unit is closed? Most retail customers will agree to evening or overnight work when the
            alternative is closing during the day. (2) If hot works are unavoidable, issue a
            hot-works permit. Identify the hazards (spark generation, smoke detector activation,
            combustible materials nearby, customers present, evacuation routes). Identify controls
            (clear combustibles 5m radius or use non-combustible screens; have a fire extinguisher
            and a fire-watcher; isolate the smoke detector in the affected zone with the
            building&apos;s responsible person&apos;s authorisation; brief customer-facing staff
            so they don&apos;t panic). (3) Time the work away from peak customer traffic. (4)
            Maintain fire-watch for at least 60 minutes after the last hot work — most fires from
            hot works ignite slowly. (5) Close the permit, restore the detector, hand back.
            Document everything in the job pack. If the customer insists on opening-hours work
            without the controls, escalate; this is a Reg 5 arrangement that cannot be skipped.
          </>
        }
        whyItMatters={
          <>
            Hot-works fires are a category in their own right — many of the serious commercial
            fires of the last decade started with hot works without proper controls. The 60-minute
            fire watch sounds excessive until you see how often smouldering material ignites half
            an hour after the operative has packed up. The permit is what forces the discipline.
            The L3 supervisor&apos;s refusal to do hot works without a permit protects the
            customer&apos;s building, the firm&apos;s insurance, and the operative&apos;s own
            personal liability under s.7. The customer&apos;s short-term inconvenience of closing
            for two hours is incomparable to the cost of a fire.
          </>
        }
      />

      <RegsCallout
        source="Personal Protective Equipment at Work Regulations 1992 (as amended 2022) — Reg 4(1)"
        clause={
          <>
            &quot;Every employer shall ensure that suitable personal protective equipment is
            provided to his employees who may be exposed to a risk to their health or safety while
            at work except where and to the extent that such risk has been adequately controlled
            by other means which are equally or more effective.&quot;
          </>
        }
        meaning={
          <>
            Reg 4 — the PPE provision duty, with the explicit qualifier that PPE is only required
            where higher-order controls have not adequately addressed the risk. This is the
            regulatory anchor for the &quot;PPE is the last line&quot; principle. The 2022
            amendment extended the duty to limb (b) workers (workers who personally undertake work
            for another but are not employees in the traditional sense), bringing much of the
            gig-economy and CIS-based workforce into PPE provision scope.
          </>
        }
        cite="Source: Personal Protective Equipment at Work Regulations 1992 (SI 1992/2966), Reg 4, as amended by SI 2022/8."
      />

      <ConceptBlock
        title="PPE — the last line, not the first"
        plainEnglish="The Personal Protective Equipment at Work Regulations 1992 (as amended) place duties on the employer to provide suitable PPE where risk cannot be controlled by higher-order means, and on the operative to use it as instructed. PPE is the bottom of the MHSWR Schedule 1 hierarchy — chosen only after avoidance, substitution, engineering and administrative controls have been considered. The L3 reflex: PPE is what you reach for when the higher-order controls are in place, not instead of them."
        onSite="Common electrical-trade PPE: safety footwear (EN ISO 20345 S3 typical — steel toecap, midsole protection, antistatic where relevant); head protection (EN 397 industrial helmet on construction sites, EN 50365 electrically-rated for live work scenarios); eye protection (EN 166 impact-rated, with arc-flash rating for switching activities); hearing protection (EN 352 series, attenuation matched to noise exposure); cut-resistant gloves (EN 388); arc-rated clothing for switching and panel work (IEC 61482); harness with rescue lanyard (EN 361) for height work where collective protection inadequate."
      >
        <p>PPE selection considerations:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Matched to the residual hazard after higher-order controls applied.</li>
          <li>Suitable for the wearer — fit, comfort, compatibility with other PPE.</li>
          <li>
            Compatible with the task — gloves dexterous enough for the work; helmet that
            doesn&apos;t obscure vision.
          </li>
          <li>Maintained — inspected, cleaned, replaced per manufacturer&apos;s instructions.</li>
          <li>Training — operative knows how to don, doff, check, care for the PPE.</li>
          <li>
            Records — PPE issue log; inspection records for harnesses, helmets after impact.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <FAQ items={faqs2} />
      <SectionRule />
      <KeyTakeaways
        points={[
          'Remember from L2 — slips, trips, manual handling, height, confined spaces, weather are everyday hazards.',
          'Slips/trips = most common injury category; addressed mainly by housekeeping discipline.',
          'WAH Regs 2005 — no height threshold; hierarchy avoid → collective → personal → minimise.',
          'MHOR 1992 — no fixed weight maximum; hierarchy avoid → assess (TILE) → reduce.',
          'Confined Spaces Regs 1997 — substantial enclosure + specified risk = full controls (permit, atmosphere, rescue plan, standby).',
          "Weather is a real hazard category; dynamic assessment includes the day's weather.",
          'Lighting requirements (Workplace HS&W Regs 1992 Reg 8); temporary task lighting in cellars / lofts / plant rooms.',
          'L3 supervisor leads on housekeeping; intervenes when issues seen; documents in dynamic assessment.',
          'PUWER 1998 covers all equipment used at work — suitability, maintenance, inspection, instructions, training, specific-risk controls. Pre-use, periodic and post-event inspection regime.',
          'LOLER 1998 layers onto MEWPs, harnesses, hoists — thorough examination every 6 months by competent person.',
          'Permit-to-work systems for hot works, confined-space entry, live electrical work, high-risk WAH, work near live OH lines — the documented expression of HASAWA s.2(2)(a) safe systems of work.',
          'MHSWR Sched 1 hierarchy of control — avoid → substitute → engineering → administrative → PPE — applies on every hazard category, every day.',
        ]}
      />
      <Quiz title="Workplace hazard situations — knowledge check" questions={quizQuestions2} />
    </div>
  );
}
