/**
 * Final paper — Module 1: Working practice and the industry.
 *
 * Forty questions drawn from what Module 1 teaches: the bodies around the
 * trade and what each of them actually does, the building stock a Welsh
 * electrician meets, how the job sits inside everybody else's, and the two
 * halves of the information you hand over at the end.
 *
 * The trap this module sets, and the paper tests, is the confusion between
 * four different things people treat as one: a qualification, a competence
 * card, trade-association membership and professional registration. Several
 * questions here exist only to separate them.
 */

import { bank, type WelshExamQuestion } from './helpers';

const QUESTIONS: WelshExamQuestion[] = [
  // ── Section 1 · Trade bodies, card schemes and professional registration ──
  {
    id: 1,
    question:
      'Electrical contracting sits inside which wider field, and why does that placing matter on site?',
    options: [
      'Building services engineering, a sub-set of construction — so most site rules reach you as construction rules rather than electrical ones',
      'Construction directly, separate from building services — so mechanical and electrical rules are issued to each trade independently',
      'Manufacturing engineering, alongside building services — so product standards rather than site standards govern the work',
      'Facilities management, a sub-set of building services — so the occupier rather than the principal contractor sets the site rules',
    ],
    correctAnswer: 0,
    explanation:
      'Electrical contracting is one part of building services engineering, which is itself a sub-set of construction. That is why site induction, permits, welfare and CDM duties arrive from the construction side and apply to you in full. Treating it as separate from building services misses that the M&E disciplines share risers, programme and coordination duties; manufacturing engineering governs products rather than installations; and facilities management is what happens after handover, not the framework the work is carried out under.',
    section: 'Trade bodies, card schemes and professional registration',
    difficulty: 'basic',
    topic: 'The sector you work in',
    reference: 'Module 1, Section 1 — The sector you actually work in',
  },
  {
    id: 2,
    question: 'Who applies for, is assessed for, and holds trade association membership?',
    options: [
      'The individual electrician, assessed on their qualifications and experience',
      'The contracting firm, assessed on its procedures, staff and systems',
      'The apprentice’s training provider, assessed on completion rates',
      'The client, assessed on their procurement and payment record',
    ],
    correctAnswer: 1,
    explanation:
      'A trade association represents contracting businesses: the firm applies, the firm is assessed and the firm holds the membership. That is exactly what separates it from a competence card, which is held by an individual, and from professional registration, which an individual applies for personally. Training providers and clients are not members of a contractors’ trade association at all.',
    section: 'Trade bodies, card schemes and professional registration',
    difficulty: 'basic',
    topic: 'Trade associations',
    reference: 'Module 1, Section 1 — Speaking for the trade',
  },
  {
    id: 3,
    question:
      'Which body in the list of organisations around the trade is the one you do not join?',
    options: [
      'The Joint Industry Board, because membership is held collectively by the industry',
      'The Institution of Engineering and Technology, because it registers rather than admits',
      'The Health and Safety Executive, because it is the enforcing authority',
      'The awarding organisation, because it only deals with approved centres',
    ],
    correctAnswer: 2,
    explanation:
      'The HSE is the enforcing authority for health and safety on construction work — a regulator, not a membership body, and the one organisation in the group you cannot join. The JIB is a negotiating body whose employer side does have members; the IET is a professional institution you can join and register through; and an awarding organisation does deal with centres, but that is a matter of approval rather than of it being unjoinable.',
    section: 'Trade bodies, card schemes and professional registration',
    difficulty: 'intermediate',
    topic: 'The enforcing authority',
    reference: 'Module 1, Section 1 — The sector you actually work in',
  },
  {
    id: 4,
    question: 'What is the defining function of a negotiating body such as the JIB?',
    options: [
      'It inspects member firms’ installations and issues compliance certificates',
      'It publishes the technical standard the industry designs and installs to',
      'It awards the qualifications an apprentice needs to complete their training',
      'It replaces site-by-site bargaining with national grades, rates and working rules',
    ],
    correctAnswer: 3,
    explanation:
      'A negotiating body brings both sides of the industry together and publishes agreed grades, rates and working rules, so terms are settled nationally instead of argued job by job. Inspecting installations and issuing certificates is the work of a certification or competent person scheme; publishing the technical standard is the standards body’s job; and awarding qualifications belongs to an awarding organisation.',
    section: 'Trade bodies, card schemes and professional registration',
    difficulty: 'basic',
    topic: 'Negotiating bodies',
    reference: 'Module 1, Section 1 — Speaking for the trade',
  },
  {
    id: 5,
    question: 'A competence card is best described as which of the following?',
    options: [
      'A portable claim about you, already checked by an independent scheme, tied to a stated discipline and grade',
      'A legal permit to work on electrical installations, without which the work would be unlawful',
      'Proof that you are competent for whatever electrical task a site asks you to carry out',
      'A record of the qualifications you hold, reissued automatically whenever you gain another',
    ],
    correctAnswer: 0,
    explanation:
      'A card is a portable, pre-checked claim with a stated discipline and grade, which is what lets a site verify you at the gate instead of re-assessing you. It is not a legal permit — no card is required by law to carry out electrical work. It is evidence of competence rather than competence itself, because competence is what you can safely do on the job in front of you today. And it is granted against qualifications plus, generally, assessed occupational experience and a health-and-safety element, not issued automatically off the back of a certificate.',
    section: 'Trade bodies, card schemes and professional registration',
    difficulty: 'intermediate',
    topic: 'Competence cards',
    reference: 'Module 1, Section 1 — What a card actually is',
  },
  {
    id: 6,
    question:
      'A gate check confirms an operative holds a current card for the right discipline. What does CDM 2015 still require of the duty holder?',
    options: [
      'Nothing further — a valid card discharges the duty for the operative’s time on that site',
      'A judgement on the individual’s skills, knowledge, training and experience for the work in hand',
      'A repeat of the scheme’s assessment, carried out by the principal contractor before first access',
      'Written confirmation from the card scheme that the holder is competent for this particular task',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 requires a judgement on skills, knowledge, training and experience, and HSE guidance is explicit that sole reliance should not be placed on cards or certificates. A gate check is a paperwork check, so it cannot discharge that duty on its own. Re-running the scheme’s own assessment is not what is asked for, and a scheme does not issue task-by-task confirmations — its card states a discipline and grade, not a verdict on the job you are about to do.',
    section: 'Trade bodies, card schemes and professional registration',
    difficulty: 'advanced',
    topic: 'Cards and CDM competence',
    reference: 'Module 1, Section 1 — What a card actually is · CDM 2015',
  },
  {
    id: 7,
    question:
      'Under JIB National Working Rule 17.2.2.4, what must an operative supplied by an employment business to a member firm hold?',
    options: [
      'A contract of employment with the member firm for the duration of the placement',
      'Evidence of professional registration at Engineering Technician level or above',
      'A current and valid ECS Card denoting the appropriate discipline and standard of skills',
      'A copy of the member firm’s health and safety policy, signed and dated before first access',
    ],
    correctAnswer: 2,
    explanation:
      'Working Rule 17.2.2.4 requires a current and valid ECS Card denoting the appropriate discipline(s) and the standard of skills. The point of an employment business supply is precisely that there is no direct contract of employment, so that cannot be the requirement. Professional registration is a personal choice and is not required to work as an electrician at all, and a signed safety policy is a site induction matter rather than the working rule.',
    section: 'Trade bodies, card schemes and professional registration',
    difficulty: 'advanced',
    topic: 'JIB National Working Rules',
    reference: 'JIB National Working Rules 17.2.2.4',
  },
  {
    id: 8,
    question: 'Which statement about professional registration at EngTech level is correct?',
    options: [
      'It is issued by the employer once an apprenticeship is signed off as complete',
      'It is required before an individual may carry out electrical installation work unsupervised',
      'It is granted once and held permanently, with no further obligation on the registrant',
      'It is applied for by the individual and maintained through continuing professional development',
    ],
    correctAnswer: 3,
    explanation:
      'Registration is an individual being recognised at a defined level of professional competence by a professional engineering institution — the individual applies, and it is maintained rather than granted once, with CPD part of holding it. An employer or college cannot issue it, it is not required in order to work as an electrician, and treating it as permanent misses the maintenance obligation that distinguishes it from a qualification certificate.',
    section: 'Trade bodies, card schemes and professional registration',
    difficulty: 'intermediate',
    topic: 'Professional registration',
    reference: 'Module 1, Section 1 — Three different things people confuse',
  },

  // ── Section 2 · Construction eras and the Welsh building stock ────────────
  {
    id: 9,
    question:
      'Compared with later cavity construction, what two things does solid wall construction remove?',
    options: [
      'The free cable route and the moisture break',
      'The need for fire-stopping and the need for mechanical protection',
      'The structural timber and the risk of concealed services',
      'The requirement for surface containment and the need for a survey',
    ],
    correctAnswer: 0,
    explanation:
      'A cavity gives you both a ready-made route for cables and a break that stops moisture crossing from outside to inside; solid construction has neither, which is why concealed routes must be cut and why what you bury has to be chosen around damp. Fire-stopping and mechanical protection are still required — arguably more so. Structural timber turns up inside solid masonry walls rather than disappearing from them. And solid construction makes surface containment and a proper survey more necessary, not less.',
    section: 'Construction eras and the Welsh building stock',
    difficulty: 'basic',
    topic: 'Solid wall construction',
    reference: 'Module 1, Section 2 — Solid walls, and what you lose',
  },
  {
    id: 10,
    question:
      'You are fixing containment to a pre-1919 wall built with lime mortar and lime plaster. What is the right approach?',
    options: [
      'Fix into the mortar joints, because lime is softer and will accept a plug without cracking the unit',
      'Fix into the masonry units rather than the joints, and spread the load across several fixings',
      'Use resin anchors throughout, because lime mortar cannot take any mechanical fixing',
      'Fix through the plaster only, so the historic masonry behind it is left completely undisturbed',
    ],
    correctAnswer: 1,
    explanation:
      'Lime mortar and lime plaster are deliberately soft, so the joint is the weakest place to fix — the fixing into the masonry unit, with the load spread, is what holds. Choosing the joint because it is softer is the exact mistake the softness should warn you away from. Resin anchors are a tool rather than a blanket answer and do not change where the strength is. And fixing to plaster alone puts the load on a finish that was never intended to carry it.',
    section: 'Construction eras and the Welsh building stock',
    difficulty: 'intermediate',
    topic: 'Fixing into historic fabric',
    reference: 'Module 1, Section 2 — Solid walls, and what you lose',
  },
  {
    id: 11,
    question:
      'Why does adding an impermeable material to older, breathable fabric cause a problem?',
    options: [
      'It reduces the thermal mass of the wall, so the building heats and cools faster',
      'It prevents any further mechanical fixing being made into that part of the wall',
      'Older fabric manages moisture by wetting and drying, so the moisture is pushed elsewhere',
      'It invalidates the certification for any circuit installed within the affected wall',
    ],
    correctAnswer: 2,
    explanation:
      'Older buildings handle water by absorbing it and letting it dry out again. Block one path and the moisture does not vanish — it concentrates somewhere else, often in a place that was previously dry. Thermal mass is largely a function of the masonry itself; an impermeable patch does not prevent fixings; and certification records the electrical installation, not the wall finish, so nothing about it is invalidated by a repair material.',
    section: 'Construction eras and the Welsh building stock',
    difficulty: 'intermediate',
    topic: 'Moisture in older fabric',
    reference: 'Module 1, Section 2 — Solid walls, and what you lose',
  },
  {
    id: 12,
    question:
      'What is the defining change between pre-1919 construction and post-1919 to modern construction, from a services point of view?',
    options: [
      'Buildings began to anticipate their services instead of having them bolted on afterwards',
      'Buildings began to be built from manufactured rather than locally sourced materials',
      'Buildings began to be designed by architects rather than by builders',
      'Buildings began to be built to a national building standard rather than to local custom',
    ],
    correctAnswer: 0,
    explanation:
      'The services-side change is that later buildings have space, routes and provision designed in, where older buildings had every route improvised after the fact. Manufactured materials, professional design and national standards are all real features of the period, but they describe how the building was procured and built rather than what changed about getting services into it.',
    section: 'Construction eras and the Welsh building stock',
    difficulty: 'intermediate',
    topic: 'Construction eras',
    reference: 'Module 1, Section 2 — The cavity, and what it hands you',
  },
  {
    id: 13,
    question:
      'Regulation 522.3.2 requires that where water may collect or condensation may form in a wiring system, what must be done?',
    options: [
      'The wiring system shall be re-routed away from the affected area',
      'Provision shall be made for its escape',
      'The affected section shall be recorded as a departure on the certificate',
      'An IP rating of at least IPX5 shall be applied to the whole enclosure',
    ],
    correctAnswer: 1,
    explanation:
      'The regulation states that provision shall be made for its escape — a drainage requirement, not a prohibition. Re-routing may sometimes be the practical answer but it is not what the regulation asks for; a departure is recorded where you do not comply, which is the opposite of meeting the requirement; and no specific IP code is specified by this regulation.',
    section: 'Construction eras and the Welsh building stock',
    difficulty: 'advanced',
    topic: 'Condensation in wiring systems',
    reference: 'BS 7671 Regulation 522.3.2',
  },
  {
    id: 14,
    question:
      'You are surveying a rural Welsh property with no distributor’s earth facility. Which combination of features should you expect to plan around?',
    options: [
      'Short circuit lengths, a TN-C-S supply and a nearby wholesaler for materials',
      'A TN-S supply with a lead sheath earth, and standard domestic maximum demand',
      'Long runs, TT earthing with an installation electrode, and a long trip for materials',
      'A three-phase supply as standard, with an on-site transformer provided by the distributor',
    ],
    correctAnswer: 2,
    explanation:
      'Rural properties typically bring long circuit runs, TT earthing with an installation electrode because there is no distributor earth, possibly standby or off-grid arrangements, and no wholesaler round the corner. A TN-C-S supply and a TN-S lead sheath both provide the distributor earth the question has ruled out, and a three-phase supply with a dedicated transformer is not something you should expect as standard on a rural domestic property.',
    section: 'Construction eras and the Welsh building stock',
    difficulty: 'intermediate',
    topic: 'Rural properties',
    reference: 'Module 1, Section 2 — Solid-wall construction',
  },

  // ── Section 3 · Working on older, modern and emerging building services ───
  {
    id: 15,
    question:
      'What principle should govern route selection when working in an older building?',
    options: [
      'Shortest route, because less cable means less volt drop and lower cost',
      'Least intervention — existing routes and voids first, new penetrations last and only where agreed',
      'Surface containment throughout, because it can always be removed without trace',
      'Whatever the client prefers, because they own the building and carry the risk',
    ],
    correctAnswer: 1,
    explanation:
      'Least intervention puts existing routes and voids first and makes a new penetration the last resort, taken only where it has been agreed. The shortest route is frequently the most destructive one. Surface containment is a legitimate answer in solid construction but as a blanket rule it ignores where concealed routes already exist. And while the client must agree the method, handing them the technical route decision is not what agreement means.',
    section: 'Working on older, modern and emerging building services',
    difficulty: 'basic',
    topic: 'Route selection',
    reference: 'Module 1, Section 3 — Survey first, and survey properly',
  },
  {
    id: 16,
    question:
      'Regulation 521.10.202 gives requirements for the methods of support of wiring systems. When must compliance with those requirements be assessed?',
    options: [
      'Only where the wiring system is installed in an escape route',
      'Only where the cable is installed above a suspended ceiling',
      'Whenever evaluating methods of support',
      'Only on installations subject to periodic inspection and testing',
    ],
    correctAnswer: 2,
    explanation:
      'Compliance shall be assessed when evaluating methods of support — it applies to the evaluation itself, not to a particular location. The escape route and the ceiling void are the two places people most associate with support failures, which is exactly why they make convincing wrong answers; the requirement is not limited to either. And it is an installation requirement rather than something that appears only at periodic inspection.',
    section: 'Working on older, modern and emerging building services',
    difficulty: 'advanced',
    topic: 'Support of wiring systems',
    reference: 'BS 7671 Regulation 521.10.202',
  },
  {
    id: 17,
    question:
      'Regulation 522.8.5 requires every cable to be supported so that what does not happen?',
    options: [
      'No appreciable mechanical strain reaches the terminations of the conductors',
      'No part of the cable is accessible without the use of a tool',
      'No section of the cable exceeds the manufacturer’s stated bending radius',
      'No cable is installed within 50 mm of the surface of a wall',
    ],
    correctAnswer: 0,
    explanation:
      'The requirement is that the cable is not exposed to undue mechanical strain and that there is no appreciable mechanical strain on the terminations, taking account of the cable’s own supported weight — which is why long riser drops are where it is most often forgotten. Accessibility only with a tool, bending radius and the 50 mm depth rule are all genuine requirements elsewhere in BS 7671, but none of them is what 522.8.5 is about.',
    section: 'Working on older, modern and emerging building services',
    difficulty: 'intermediate',
    topic: 'Cable support and strain',
    reference: 'BS 7671 Regulation 522.8.5',
  },
  {
    id: 18,
    question: 'When does first fix genuinely end?',
    options: [
      'On the date set for it in the construction programme',
      'When the electrical contractor has drawn down all first fix materials',
      'When the structure physically closes up',
      'When the principal contractor issues the second fix instruction',
    ],
    correctAnswer: 2,
    explanation:
      'First fix ends when the structure closes up, because after that the route is no longer reachable — the physical fact, not the programme date, is what decides it. A programme date can slip either way and an instruction can be issued early or late; neither reopens a wall that has been boarded. Material draw-down measures progress, not access.',
    section: 'Working on older, modern and emerging building services',
    difficulty: 'basic',
    topic: 'Construction sequence',
    reference: 'Module 1, Section 3 — The sequence runs the job',
  },
  {
    id: 19,
    question:
      'A luminaire is to be installed in an area with a suspended ceiling grid. What is the correct approach to supporting it?',
    options: [
      'Support it from the grid, since the grid is designed to carry the ceiling and its fittings',
      'Support anything heavier than a tile independently from the structure above',
      'Support it from the nearest cable tray, which is already fixed to the structure',
      'Support it from the grid but add a safety wire back to the nearest partition head',
    ],
    correctAnswer: 1,
    explanation:
      'A suspended ceiling grid is designed to carry tiles. Anything heavier has to be supported independently from the structure above it. Loading the grid is the standard failure this warns against, whether or not a safety wire is added — and a wire to a partition head transfers the load to something else that was not designed for it. Cable tray is sized for cables, not for hanging luminaires from.',
    section: 'Working on older, modern and emerging building services',
    difficulty: 'intermediate',
    topic: 'Supporting equipment',
    reference: 'Module 1, Section 3 — The sequence runs the job',
  },
  {
    id: 20,
    question:
      'What makes generation and storage change the way an installation must be isolated?',
    options: [
      'They raise the prospective fault current, so a higher-rated isolator is required',
      'They require a separate consumer unit, so two isolations must be carried out',
      'They make the installation two-way, so isolation becomes a sequence rather than a single action',
      'They are d.c. sources, so a.c. isolators cannot be used anywhere in the installation',
    ],
    correctAnswer: 2,
    explanation:
      'An installation with generation or storage is a source as well as a load, so opening the incoming main switch no longer guarantees the installation is dead — isolation becomes a sequence, and labelling becomes the next person’s only warning. Prospective fault current and switchgear ratings are real design questions but they are not what changes about isolation; a separate consumer unit is one arrangement among several rather than the reason; and the d.c. side of a system does not stop a.c. isolators being appropriate on the a.c. side.',
    section: 'Working on older, modern and emerging building services',
    difficulty: 'intermediate',
    topic: 'Generation, storage and isolation',
    reference: 'Module 1, Section 3 — Electrification of heat',
  },

  // ── Section 4 · Working with other trades, clients and customers ──────────
  {
    id: 21,
    question:
      'You cannot fix your containment because the steelwork it attaches to has not been erected. What kind of dependency is this?',
    options: [
      'Physical — the thing you fix to does not exist yet',
      'Sequential — doing the work now would force another trade to redo theirs',
      'Informational — you are waiting on a confirmed decision',
      'Commercial — the variation has not yet been agreed',
    ],
    correctAnswer: 0,
    explanation:
      'Physical dependency means the thing you need simply is not there yet, and no phone call will create it. Sequential dependency is different: the work is possible now, but doing it out of turn makes somebody else redo theirs. Informational dependency is waiting on a decision, which is chased by going to whoever owns the decision. A commercial hold-up is a contractual matter rather than one of the three work dependencies.',
    section: 'Working with other trades, clients and customers',
    difficulty: 'basic',
    topic: 'Dependencies between trades',
    reference: 'Module 1, Section 4 — You are a link in a chain',
  },
  {
    id: 22,
    question:
      'You damage another trade’s work while running a cable. What is the right response?',
    options: [
      'Repair it yourself if you can, and say nothing unless somebody asks',
      'Tell the trade yourself, the same day',
      'Report it to the principal contractor only, so it goes through the proper channel',
      'Wait until the next coordination meeting so it can be raised with everyone present',
    ],
    correctAnswer: 1,
    explanation:
      'Damage found and reported is a shared problem; damage found and concealed becomes the property of the last trade in the room. Telling the affected trade yourself, the same day, is what keeps the relationship — it survives the damage but not the concealment. Repairing quietly is concealment with extra steps, going only to the principal contractor leaves the affected trade to find out from somebody else, and waiting for a meeting turns a same-day conversation into a delayed disclosure.',
    section: 'Working with other trades, clients and customers',
    difficulty: 'basic',
    topic: 'Working alongside other trades',
    reference: 'Module 1, Section 4 — A productive relationship',
  },
  {
    id: 23,
    question:
      'CDM 2015 places duties on dutyholders to cooperate, coordinate and communicate, and Regulation 18 requires what?',
    options: [
      'That every operative on site holds a current competence card',
      'That a principal designer is appointed on every project without exception',
      'That the site is kept in good order',
      'That a written method statement is produced for every task',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 18 requires the site to be kept in good order, which is why tidiness is a duty rather than a favour. Card schemes are an industry arrangement, not a CDM requirement; the principal designer appointment applies where there is more than one contractor rather than without exception; and CDM does not require a written method statement for every task.',
    section: 'Working with other trades, clients and customers',
    difficulty: 'advanced',
    topic: 'CDM cooperation duties',
    reference: 'CDM 2015 Regulations 8 and 18 · HSE L153',
  },
  {
    id: 24,
    question:
      'In a disagreement with another trade over a shared route, what is the most effective approach?',
    options: [
      'Escalate the argument to the principal contractor so an authority settles it',
      'Separate the problem from the person, describe the effect with a date, and escalate to whoever holds the programme',
      'Install your work first and let the other trade adjust around it',
      'Refer the matter to the client, since they are paying for both packages',
    ],
    correctAnswer: 1,
    explanation:
      'Describing the effect on the work with a date, and taking that to whoever holds the programme, escalates the problem while leaving the argument behind. Escalating the argument itself takes the personal dispute upwards with you. Getting in first is what caused the clash in the first place, since the space was sized for everybody. And the client is the wrong audience for a coordination issue between two packages on site.',
    section: 'Working with other trades, clients and customers',
    difficulty: 'intermediate',
    topic: 'Resolving disagreements',
    reference: 'Module 1, Section 4 — A productive relationship',
  },
  {
    id: 25,
    question:
      'A client asks whether the work is going well. What actually determines their judgement of you?',
    options: [
      'The quality of the terminations and the neatness of the board',
      'The test results recorded on the certification',
      'The conduct around the work — timekeeping, warning, cleanliness and straight answers',
      'The price, compared with the other quotations they received',
    ],
    correctAnswer: 2,
    explanation:
      'The client cannot judge the electrical work, so they judge what they can see: whether you turn up when you said, whether you warn them before something happens, whether they can use their house, and whether your answers are straight. Terminations, test results and price all matter enormously and none of them is something a lay client is able to assess.',
    section: 'Working with other trades, clients and customers',
    difficulty: 'basic',
    topic: 'Client relationships',
    reference: 'Module 1, Section 4 — The client is not marking what you think',
  },
  {
    id: 26,
    question:
      'You need to switch the supply off in an occupied property. What is the correct sequence?',
    options: [
      'Agree the window, confirm the day before, warn immediately before, and tell them when it is back',
      'Give at least 24 hours’ written notice, then proceed at the time stated in the notice',
      'Switch off and inform the occupier immediately afterwards so the outage is as short as possible',
      'Ask the occupier to switch the supply off themselves so the responsibility stays with them',
    ],
    correctAnswer: 0,
    explanation:
      'Agreeing the window, confirming the day before, warning immediately before and confirming restoration gives the occupier control at each step. A single written notice fixes the time without checking it still suits them. Switching off first and explaining afterwards is the one thing never to do. And pushing the switching onto the occupier hands a safety-critical action to someone untrained to protect yourself, which is not a transfer of responsibility a court or client would recognise.',
    section: 'Working with other trades, clients and customers',
    difficulty: 'intermediate',
    topic: 'Working in occupied premises',
    reference: 'Module 1, Section 4 — The client is not marking what you think',
  },
  {
    id: 27,
    question:
      'The client’s site rules are stricter than your normal working practice. Which applies?',
    options: [
      'Your normal practice, because it is what your own risk assessment is written against',
      'Whichever is stricter, decided task by task by the operative carrying out the work',
      'The client’s rules, because they apply on their premises',
      'The principal contractor’s rules, which override both on a construction site',
    ],
    correctAnswer: 2,
    explanation:
      'Where the client’s rules are stricter than normal practice, the client’s rules apply on their premises. Falling back on your own practice ignores that you are a visitor in somebody else’s operation. Leaving the choice to the individual operative on the day removes any consistency. And bringing in the principal contractor does not answer the question — where a construction phase plan exists it sits alongside the client’s own rules rather than cancelling them.',
    section: 'Working with other trades, clients and customers',
    difficulty: 'intermediate',
    topic: 'Client premises and constraints',
    reference: 'Module 1, Section 4 — The building has a job of its own',
  },
  {
    id: 28,
    question: 'How does a client’s permit system relate to your own risk assessment and method statement?',
    options: [
      'It replaces them, because the client’s system has been written for their premises',
      'It sits alongside them, never instead of them',
      'It replaces the method statement but not the risk assessment',
      'It applies only where the client has no principal contractor appointed',
    ],
    correctAnswer: 1,
    explanation:
      'A client permit system sits alongside your risk assessment and method statement. Yours addresses the hazards of your work; theirs addresses the hazards of their premises and operation, and neither covers the other. Treating one as a substitute for the other — in whole or in part — leaves a gap, and the presence or absence of a principal contractor does not change that.',
    section: 'Working with other trades, clients and customers',
    difficulty: 'advanced',
    topic: 'Permits and safe systems of work',
    reference: 'Module 1, Section 4 — The building has a job of its own',
  },

  // ── Section 5 · Sourcing and interpreting technical information ───────────
  {
    id: 29,
    question:
      'Technical and functional information are two halves of what you hand over. What is functional information?',
    options: [
      'What the installation does and how it is used',
      'How the installation was built and what it was built from',
      'The measured results recorded during inspection and testing',
      'The specification and drawings issued before work started',
    ],
    correctAnswer: 0,
    explanation:
      'Functional information is what it does and how it is used — the half that gets left out, and the cause of most post-handover calls. How it was built and what from is the technical half; test results are part of that technical record; and the specification and drawings are inputs to the work rather than the operational half of what the user needs.',
    section: 'Sourcing and interpreting technical information',
    difficulty: 'basic',
    topic: 'Technical and functional information',
    reference: 'Module 1, Section 5 — Two kinds of information',
  },
  {
    id: 30,
    question: 'A drawing disagrees with what you can see in the building. How should you treat it?',
    options: [
      'Follow the drawing, because it is the issued document and carries the design intent',
      'Follow the building, and say nothing, because the drawing is clearly out of date',
      'Treat the drawing as evidence, and pass on the discrepancy as information',
      'Return the drawing to the designer and stop work until a revision is issued',
    ],
    correctAnswer: 2,
    explanation:
      'A drawing that disagrees with the building is still evidence — of what was intended, or of what was once true — and the discrepancy itself is information somebody needs. Following the drawing against what is physically there installs something that does not fit. Silently following the building loses the discrepancy for everybody who comes after. Stopping work outright is disproportionate for most discrepancies, though a significant one may well justify a query before proceeding.',
    section: 'Sourcing and interpreting technical information',
    difficulty: 'intermediate',
    topic: 'Conflicting sources',
    reference: 'Module 1, Section 5 — Two kinds of information',
  },
  {
    id: 31,
    question: 'How should a recorded measurement in an existing document be read?',
    options: [
      'As a verdict on whether the installation complies',
      'As carrying what, where, when, with what, and against what',
      'As valid until the next periodic inspection falls due',
      'As superseded the moment any alteration is made to the installation',
    ],
    correctAnswer: 1,
    explanation:
      'A measurement carries what was measured, where, when, with which instrument and against which limit — it is data, not a judgement. Reading it as a verdict skips the question of what it was compared with. It does not carry a guaranteed validity period, and while an alteration may well change the value it does not automatically render the record meaningless — the record still says what was true on the day.',
    section: 'Sourcing and interpreting technical information',
    difficulty: 'intermediate',
    topic: 'Reading documents',
    reference: 'Module 1, Section 5 — Every document answers one question',
  },
  {
    id: 32,
    question:
      'A condition report makes no mention of the supplementary bonding in a bathroom. What does that absence mean?',
    options: [
      'That supplementary bonding was present and satisfactory at the time of the inspection',
      'That supplementary bonding was not required, so there was nothing to record',
      'That it is an unknown, which you must establish for yourself',
      'That the omission should be recorded as a departure on your own certification',
    ],
    correctAnswer: 2,
    explanation:
      'An absence in a document is an unknown, never an all-clear. It may mean satisfactory, not required, not inspected or simply missed, and the report cannot tell you which — so you establish it yourself. Reading it as confirmation of either a satisfactory condition or an exemption invents information the document does not contain, and a departure records a deliberate divergence from BS 7671 in your own work, not a gap in somebody else’s report.',
    section: 'Sourcing and interpreting technical information',
    difficulty: 'advanced',
    topic: 'Interpreting existing records',
    reference: 'Module 1, Section 5 — Every document answers one question',
  },
  {
    id: 33,
    question:
      'A customer tells you the lights flicker when the shower runs, and adds that they think the shower cable is too small. How should you treat the two statements?',
    options: [
      'Both as evidence, since the customer lives with the installation daily',
      'The observation as valuable, and the explanation as a hypothesis to test',
      'Both as unreliable, since the customer is not electrically skilled',
      'The explanation as the starting point, since it narrows the investigation usefully',
    ],
    correctAnswer: 1,
    explanation:
      'The observation — flickering when the shower runs — is a genuine and valuable piece of evidence that would take you a long time to reproduce. Their theory about the cause is a hypothesis to test, not a finding. Accepting both equally imports an untested diagnosis; dismissing both throws away the observation, which is the most useful thing they have; and starting from their explanation narrows the investigation before you have any grounds to.',
    section: 'Sourcing and interpreting technical information',
    difficulty: 'intermediate',
    topic: 'People as sources',
    reference: 'Module 1, Section 5 — Every document answers one question',
  },
  {
    id: 34,
    question:
      'BS 7671 fixes one recipient of the Electrical Installation Certificate. Who is it?',
    options: [
      'The person ordering the work',
      'The occupier of the premises at the time of completion',
      'The duty holder responsible for the installation once it is in service',
      'The distributor supplying the installation',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 644.4 puts the certificate in the hands of the person ordering the work, and it is issued by those responsible for the design, construction and verification. The occupier, the duty holder and the distributor may all have a legitimate interest in the installation, and on a particular job one of them may also be the person who ordered the work — but none of them is what the regulation names.',
    section: 'Sourcing and interpreting technical information',
    difficulty: 'intermediate',
    topic: 'Who receives certification',
    reference: 'BS 7671 Regulation 644.4',
  },

  // ── Section 6 · Delivering information to clients and customers ───────────
  {
    id: 35,
    question:
      'Certification must be issued complete with which accompanying material?',
    options: [
      'The manufacturer’s instructions for every item of equipment installed',
      'A copy of the specification the work was carried out against',
      'The guidance for recipients given in Appendix 6',
      'The schedule of inspections from the previous certificate for the same installation',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 requires certification to be issued complete with the guidance for recipients in Appendix 6 — issuing it without that guidance is issuing it incomplete. Manufacturer’s instructions, the specification and any previous paperwork are all useful things to hand over and none of them is what makes the certification itself complete.',
    section: 'Delivering information to clients and customers',
    difficulty: 'advanced',
    topic: 'Complete certification',
    reference: 'BS 7671 Appendix 6 — guidance for recipients',
  },
  {
    id: 36,
    question: 'Why is "Do you understand?" a poor check that information has landed?',
    options: [
      'It is a social question and produces a social answer',
      'It is too direct, so it makes the other person defensive',
      'It cannot be recorded, so there is no evidence the check was carried out',
      'It only works face to face, so it fails on a phone handover',
    ],
    correctAnswer: 0,
    explanation:
      'Asking whether somebody understands produces a yes, because saying no is socially costly — it is not a check at all. The alternative is teach-back: ask them to tell you what they are going to do, in their own words. Being too direct is not the problem; recording a yes would only record a meaningless answer; and it fails just as completely in person as it does on the phone.',
    section: 'Delivering information to clients and customers',
    difficulty: 'basic',
    topic: 'Checking understanding',
    reference: 'Module 1, Section 6 — Why the obvious question is the worst one',
  },
  {
    id: 37,
    question:
      'When is a demonstration to a client or an operative finished?',
    options: [
      'When you have shown the task and answered any questions arising from it',
      'When they have confirmed they are happy to carry it out on their own',
      'When the other person has done the task unaided while you watched',
      'When it has been written up and confirmed to them in writing the same day',
    ],
    correctAnswer: 2,
    explanation:
      'Demonstration is only finished when the other person has done the task unaided while you watched — that is the demonstration-back, and the hesitations tell you what they have not got. Showing and answering questions is the demonstration, not the check. A statement that they are happy is the same social answer as "yes, I understand". And a written confirmation records the exchange without testing whether anything landed.',
    section: 'Delivering information to clients and customers',
    difficulty: 'intermediate',
    topic: 'Demonstration-back',
    reference: 'Module 1, Section 6 — Why the obvious question is the worst one',
  },
  {
    id: 38,
    question:
      'What does completeness in a handover record require you to include, that is most often left out?',
    options: [
      'The negative — scope not covered, areas not accessed, circuits not energised, items outstanding',
      'The design calculations supporting the circuit selections',
      'The dates each individual circuit was installed and by whom',
      'A comparison with the previous installation and what has been improved',
    ],
    correctAnswer: 0,
    explanation:
      'Completeness includes the negative: what you did not cover, could not access, did not energise and left outstanding. That is the part routinely omitted, and its absence is read as an all-clear. Design calculations belong in the design record, per-circuit dates and installers are not what a handover turns on, and a comparison with what was there before edges into delivering a verdict on the previous contractor.',
    section: 'Delivering information to clients and customers',
    difficulty: 'intermediate',
    topic: 'Accurate and complete records',
    reference: 'Module 1, Section 6 — Accurate means it matches the installation',
  },
  {
    id: 39,
    question:
      'The client asks whether the rest of the installation, outside your scope, is safe. What is the right response?',
    options: [
      'Give a general assurance, since nothing you saw suggested otherwise',
      'Decline to comment at all, since it falls outside the scope you were engaged for',
      'Say what you inspected and what you found, and name who owns the wider question',
      'Record a satisfactory condition for the whole installation on your certification',
    ],
    correctAnswer: 2,
    explanation:
      'Answer what you can, say what you actually inspected and found, and name the person who owns the rest — that is the three-part decline, and a safety finding gets reported regardless of scope. A blanket assurance covers things you never looked at. Refusing to say anything at all is unhelpful and loses any safety observation you did make. And certifying the whole installation when you inspected part of it is a false record.',
    section: 'Delivering information to clients and customers',
    difficulty: 'advanced',
    topic: 'The limits of what you may say',
    reference: 'Module 1, Section 6 — Two different limits',
  },
  {
    id: 40,
    question:
      'Work outside the agreed scope has become necessary. When is it agreed and recorded?',
    options: [
      'At the next valuation, so the full picture can be priced at once',
      'Before it is carried out',
      'On completion, once the actual time and materials are known',
      'Only where it exceeds a stated percentage of the original contract sum',
    ],
    correctAnswer: 1,
    explanation:
      'A variation is agreed and recorded before it is carried out, never revealed on the invoice. Leaving it to a valuation, to completion, or to a threshold all have the same effect: the client finds out after the money has been spent, and the dispute that follows is about the gap between what was agreed and what they expected.',
    section: 'Delivering information to clients and customers',
    difficulty: 'intermediate',
    topic: 'Scope and variations',
    reference: 'Module 1, Section 6 — Agreed and expected are two different things',
  },
];

export const MODULE_1_QUESTIONS = bank('Working practice', QUESTIONS);
