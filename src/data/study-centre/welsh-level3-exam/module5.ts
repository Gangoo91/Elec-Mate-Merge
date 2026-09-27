/**
 * Final paper — Module 5: Planning, coordination and evaluation.
 *
 * Forty questions on the professional-practice core: planning your own work,
 * planning work other people carry out, controlling the documentation and
 * the materials, and evaluating what actually happened afterwards.
 *
 * This is the part of the qualification that has no numerical answer, so the
 * distractors are the plausible-but-weaker judgement rather than a wrong
 * figure: the intention that reads like a criterion, the assurance that reads
 * like supervision, the tidy store that is not a findable one.
 */

import { bank, type WelshExamQuestion } from './helpers';

const QUESTIONS: WelshExamQuestion[] = [
  // ── Section 1 · Planning work, resources and success criteria ────────────
  {
    id: 196,
    question:
      'Resourcing a job means planning six things, not one. Which list is complete?',
    options: [
      'People, materials, plant, tools, transport and money',
      'People, time, materials, plant and access, information, welfare',
      'Labour, materials, plant, subcontractors, overheads and profit',
      'Drawings, specification, materials, labour, programme and certification',
    ],
    correctAnswer: 1,
    explanation:
      'People, time, materials, plant and access, information and welfare. Time and information are the two most often left out, and they are the two that cause the most lost days: a competence you need has a lead time you cannot compress, and a decision you are waiting on stops the job as surely as a missing cable. The other lists are all recognisable — a cost breakdown, a document list — but none of them is the resourcing set.',
    section: 'Planning work, resources and success criteria',
    difficulty: 'basic',
    topic: 'Resources',
    reference: 'Module 5, Section 1 — Six resources, not one',
  },
  {
    id: 197,
    question: 'What is the difference between a take-off and an order?',
    options: [
      'A take-off is a measured quantity; an order is that quantity plus a judged allowance, placed against lead times',
      'A take-off is the supplier’s quotation; an order is the instruction to deliver it',
      'A take-off is the estimate at tender; an order is the final account at completion',
      'A take-off is what you draw from the store; an order is what you buy in',
    ],
    correctAnswer: 0,
    explanation:
      'The take-off is measured off the drawing and is arithmetic; the order adds a judged allowance for waste, error and the bits the drawing does not show, and it is placed with the lead time in mind. Treating the two as the same thing is how a job either runs short or over-orders. The other definitions describe a quotation, a final account and a store requisition.',
    section: 'Planning work, resources and success criteria',
    difficulty: 'intermediate',
    topic: 'Take-off and ordering',
    reference: 'Module 5, Section 1 — Six resources',
  },
  {
    id: 198,
    question:
      'Why should material be called forward against the programme rather than delivered in full at the start?',
    options: [
      'Because suppliers charge a premium for a single large delivery',
      'Because a full job sitting in a container in week one is your risk, not the supplier’s',
      'Because the certification cannot be started until all material is on site',
      'Because CDM requires deliveries to be staged on a construction site',
    ],
    correctAnswer: 1,
    explanation:
      'Once it is on site it is yours — damage, damp, crushing and theft all become your problem, and the store damages more material than thieves do. Suppliers generally price a single large delivery more keenly rather than less. Certification has nothing to do with material delivery, and CDM imposes duties of good order and safe access rather than a staging rule.',
    section: 'Planning work, resources and success criteria',
    difficulty: 'intermediate',
    topic: 'Calling material forward',
    reference: 'Module 5, Section 1 — Six resources',
  },
  {
    id: 199,
    question:
      'What distinguishes a success criterion from an intention?',
    options: [
      'A criterion is written down, whereas an intention is agreed verbally',
      'A criterion is set by the client, whereas an intention is set by the contractor',
      'A criterion has a failing condition you can describe; an intention does not',
      'A criterion is measurable in money or time; an intention is about quality',
    ],
    correctAnswer: 2,
    explanation:
      'A criterion is a test, and a test you cannot fail is not doing anything — so the check is to read it back and ask what failure looks like. If you cannot say, rewrite it. Writing it down and agreeing it are both necessary but neither turns an intention into a test. Who sets it is irrelevant, and criteria cover quality as well as money and time.',
    section: 'Planning work, resources and success criteria',
    difficulty: 'intermediate',
    topic: 'Success criteria',
    reference: 'Module 5, Section 1 — A criterion is a test',
  },
  {
    id: 200,
    question:
      'Success criteria should cover four families. Which are they?',
    options: [
      'Safe, compliant, profitable and repeatable',
      'Compliant, complete, on time and within cost',
      'Designed, installed, tested and certified',
      'Agreed, recorded, monitored and reviewed',
    ],
    correctAnswer: 1,
    explanation:
      'Compliant and complete describe the output; on time and within cost describe the delivery. "Complete" is the family most jobs actually fall down on, usually over making good and the edges of the scope. Designed, installed, tested and certified lists the stages of the work rather than what success looks like, and agreed, recorded, monitored and reviewed lists what you do with criteria rather than what they cover.',
    section: 'Planning work, resources and success criteria',
    difficulty: 'intermediate',
    topic: 'Families of criteria',
    reference: 'Module 5, Section 1 — A criterion is a test',
  },
  {
    id: 201,
    question:
      'In the sequence scope, sequence, resource, check — what is a scope?',
    options: [
      'A list of the individual tasks the job breaks down into',
      'A description of the job written for the client',
      'The boundary of the contract, including the exclusions',
      'The drawings and specification the work is priced from',
    ],
    correctAnswer: 0,
    explanation:
      'For planning purposes a scope is a list of tasks, because you cannot sequence or resource a description. The contractual boundary and the exclusions are a real and important thing, and so are the drawings and specification, but neither gives you something you can put in an order and attach a duration to.',
    section: 'Planning work, resources and success criteria',
    difficulty: 'basic',
    topic: 'Planning sequence',
    reference: 'Module 5, Section 1 — Scope, sequence, resource, check',
  },
  {
    id: 202,
    question: 'What does identifying the critical path tell you?',
    options: [
      'Which tasks carry the greatest safety risk',
      'Where a lost day actually costs you the end date',
      'Which tasks are most expensive to carry out',
      'Which tasks must be completed before the first inspection',
    ],
    correctAnswer: 1,
    explanation:
      'The critical path is the chain where any delay pushes the completion date out — so it tells you where a lost day matters and, just as usefully, where a lost day does not. Safety risk, cost and inspection sequence are all real planning considerations and none of them is what the critical path identifies.',
    section: 'Planning work, resources and success criteria',
    difficulty: 'intermediate',
    topic: 'The critical path',
    reference: 'Module 5, Section 1 — Scope, sequence, resource, check',
  },
  {
    id: 203,
    question:
      'On a small single-contractor job, what should the construction phase plan look like?',
    options: [
      'A standard company template with the site address changed',
      'Short, and about that job',
      'Not required at all, because there is only one contractor',
      'The same document as the risk assessment and method statement',
    ],
    correctAnswer: 1,
    explanation:
      'CDM is explicitly proportionate: a plan for a small job should be short and specific to that job, and on a single-contractor job it is the contractor’s to write. A template with the address changed controls nothing, which is the same criticism that applies to generic risk paperwork. A plan is required whether or not there is more than one contractor, and it is a different document from the RAMS.',
    section: 'Planning work, resources and success criteria',
    difficulty: 'advanced',
    topic: 'The construction phase plan',
    reference: 'CDM 2015 — planning, managing and monitoring',
  },
  {
    id: 204,
    question:
      'What makes a rationale for a chosen approach a genuine rationale?',
    options: [
      'It states what was chosen and confirms the choice complies with BS 7671',
      'It names alternatives, names the constraints, and says why the winner won',
      'It records the client’s instruction and the date it was given',
      'It shows that the chosen approach was the cheapest compliant option',
    ],
    correctAnswer: 1,
    explanation:
      'A rationale is a comparison — two genuine options are enough, and padding with unrealistic ones reads as padding. Compliance is the entry requirement rather than the reason, because at Level 3 you are choosing between options that all comply. A client instruction should certainly be recorded but it is not your reasoning. And cheapest to install is frequently the most expensive to own.',
    section: 'Planning work, resources and success criteria',
    difficulty: 'intermediate',
    topic: 'Justifying an approach',
    reference: 'Module 5, Section 1 — A rationale is a comparison',
  },
  {
    id: 205,
    question:
      'Which of the four cost categories on a job is the one most often forgotten?',
    options: [
      'Labour',
      'Materials',
      'Plant',
      'Site overheads',
    ],
    correctAnswer: 3,
    explanation:
      'Site overheads are the forgotten bucket — welfare, storage, security, waste, travel and the time nobody books to a task. Labour, materials and plant all get priced deliberately because somebody invoices for them. Note too that moving a cost from one bucket to another is not saving it: labour saved has to be weighed against plant added.',
    section: 'Planning work, resources and success criteria',
    difficulty: 'basic',
    topic: 'Job costs',
    reference: 'Module 5, Section 1 — What a job actually spends',
  },
  {
    id: 206,
    question: 'How should rework be treated when evaluating a job?',
    options: [
      'As a quality failure, recorded against the operative who carried out the original work',
      'As a planning finding — it costs labour twice, material again, and programme',
      'As a variation, since additional work has been carried out',
      'As an overhead, since it cannot be attributed to a particular task',
    ],
    correctAnswer: 1,
    explanation:
      'Rework costs labour twice, the material again and a slice of the programme, and it almost always traces back to something in the planning — the information, the sequence or the brief. Treating it as an individual’s failure stops you finding that. It is emphatically not a variation: a variation is a change to what was asked for, and your own error is not one. And it can usually be attributed, which is the point of recording it.',
    section: 'Planning work, resources and success criteria',
    difficulty: 'intermediate',
    topic: 'The cost of rework',
    reference: 'Module 5, Section 1 — What a job actually spends',
  },
  {
    id: 207,
    question:
      'What is the difference between a risk and a problem, and why does it matter?',
    options: [
      'A risk is unlikely and a problem is likely; the distinction sets the priority',
      'A risk has not happened and a problem has; you can act while the first is still true',
      'A risk affects safety and a problem affects programme; they are managed separately',
      'A risk is identified by the client and a problem is identified on site',
    ],
    correctAnswer: 1,
    explanation:
      'The whole value of the distinction is timing: while it is still a risk you can remove, reduce, transfer or accept it, and once it is a problem your options have narrowed to managing the consequences. Likelihood is one axis of assessing a risk rather than what defines it, and neither subject matter nor who spotted it separates the two.',
    section: 'Planning work, resources and success criteria',
    difficulty: 'intermediate',
    topic: 'Risk and problem',
    reference: 'Module 5, Section 1 — The gap this criterion lives in',
  },
  {
    id: 208,
    question:
      'You identify a low-probability, high-impact risk. What is the correct treatment?',
    options: [
      'Note it and accept it, because the probability does not justify spending on it',
      'Give it a planned response, even though it is unlikely',
      'Transfer it to the client, since the impact is beyond what you can absorb',
      'Reassess it as medium probability so it receives attention',
    ],
    correctAnswer: 1,
    explanation:
      'Low probability does not remove the need for a plan when the impact is severe — that is precisely the combination people under-manage. Acceptance is one of the four responses, but it should be a decision rather than a default. Transferring may be part of the answer but it does not remove the need for a response. And inflating the probability to force attention corrupts the assessment for everything else on the register.',
    section: 'Planning work, resources and success criteria',
    difficulty: 'advanced',
    topic: 'Risk response',
    reference: 'Module 5, Section 1 — The gap this criterion lives in',
  },
  {
    id: 209,
    question:
      'Where do the client’s already-known risks for a project live?',
    options: [
      'In the construction phase plan',
      'In the pre-construction information',
      'In the health and safety file',
      'In the principal contractor’s risk register',
    ],
    correctAnswer: 1,
    explanation:
      'Pre-construction information is where the client gathers what is already known about the site and hands it to those who need it — asking for it is one of the highest-value things you can do at the planning stage. The construction phase plan is what you write in response to it. The health and safety file is about the completed structure for whoever works on it in future. And the principal contractor’s register is their own document rather than the client’s disclosure.',
    section: 'Planning work, resources and success criteria',
    difficulty: 'advanced',
    topic: 'Pre-construction information',
    reference: 'CDM 2015 — pre-construction information',
  },

  // ── Section 2 · Coordinating operatives and other trades on site ─────────
  {
    id: 210,
    question:
      'When allocating a task to an operative, what should be allocated separately from the task itself?',
    options: [
      'The materials and the plant required to carry it out',
      'Who decides, and who checks',
      'The duration and the start date',
      'The risk assessment and the method statement',
    ],
    correctAnswer: 1,
    explanation:
      'Allocate the task, and separately allocate who has authority to decide when something is not as expected and who confirms the work is done. Leaving either unstated is how a job stalls waiting for a decision nobody owns, or finishes with nobody having looked. Materials, dates and RAMS all have to be provided too, but none of them is the thing that goes unassigned.',
    section: 'Coordinating operatives and other trades on site',
    difficulty: 'intermediate',
    topic: 'Allocating work',
    reference: 'Module 5, Section 2 — Planning for other people',
  },
  {
    id: 211,
    question:
      'A site induction has been given to your operatives. What still needs to be done before they start?',
    options: [
      'Nothing — the induction covers the site and the work being carried out on it',
      'Brief the task, which is yours and takes about five minutes',
      'Repeat the induction in your own words to confirm understanding',
      'Issue a permit to work for the first activity',
    ],
    correctAnswer: 1,
    explanation:
      'An induction is about the site; briefing the task is yours and is a separate, short piece of work. Assuming the induction covered the task is how people arrive at a job knowing the fire muster point and not the sequence. Repeating the induction adds nothing, and a permit is required only where the activity calls for one.',
    section: 'Coordinating operatives and other trades on site',
    difficulty: 'basic',
    topic: 'Briefing the task',
    reference: 'Module 5, Section 2 — Planning for other people',
  },
  {
    id: 212,
    question: 'What does effective monitoring of work in progress look like?',
    options: [
      'Being available on site so that anybody can raise a problem',
      'Inspecting each task after it has been completed',
      'Picking three or four things and going to look, on a rhythm',
      'Requiring a daily written report from each operative',
    ],
    correctAnswer: 2,
    explanation:
      'Monitoring is choosing a small number of specific things and physically going to check them, repeatedly — and correcting what you see immediately, because walking past a control teaches everyone that it is optional. Being available is not supervision, and neither is an open invitation to raise problems. Inspecting only on completion finds the fault after the cost has been incurred, and written reports describe rather than verify.',
    section: 'Coordinating operatives and other trades on site',
    difficulty: 'intermediate',
    topic: 'Monitoring',
    reference: 'Module 5, Section 2 — Planning for other people',
  },
  {
    id: 213,
    question:
      'What is the correct way to think about competence when allocating work?',
    options: [
      'Competence belongs to a task — ask whether this person is competent at this',
      'Competence belongs to a person — once demonstrated, it applies across their trade',
      'Competence is established by the card the operative holds at the gate',
      'Competence is a matter for the employer rather than for the person allocating work',
    ],
    correctAnswer: 0,
    explanation:
      'Competence attaches to a task, not to a person in general — and skills decline when they are not used, so someone who was competent at something three years ago may not be today. CDM requires that nobody is appointed to work they lack the skills, knowledge, training and experience for, or are not in the process of obtaining. A card is evidence and HSE guidance warns against sole reliance on it, and the person allocating work cannot pass that judgement upwards.',
    section: 'Coordinating operatives and other trades on site',
    difficulty: 'intermediate',
    topic: 'Competence for a task',
    reference: 'CDM 2015 · Module 5, Section 2 — Competence belongs to a task',
  },
  {
    id: 214,
    question:
      'Supervision is described as a dial rather than a switch. What sets where the dial is?',
    options: [
      'The value of the work being carried out',
      'The gap between the task and the person’s demonstrated competence at it',
      'The requirements of the site induction',
      'Whether the operative is employed or supplied by an employment business',
    ],
    correctAnswer: 1,
    explanation:
      'The size of the gap sets the level: working alongside, close supervision, checkpoints, or a check on completion. Neither the value of the work, the induction nor the person’s employment status tells you anything about whether they can do this particular task — and availability, an open invitation and after-the-fact inspection are not supervision at any setting.',
    section: 'Coordinating operatives and other trades on site',
    difficulty: 'intermediate',
    topic: 'Levels of supervision',
    reference: 'Module 5, Section 2 — Competence belongs to a task',
  },
  {
    id: 215,
    question:
      'Something on the programme has moved. Who needs to be told?',
    options: [
      'The principal contractor, who will cascade it to the affected trades',
      'Everyone whose work depended on the thing that moved, early enough to act',
      'Only those trades working in the same area during the same week',
      'Everyone on site, so that nobody can claim not to have been informed',
    ],
    correctAnswer: 1,
    explanation:
      'Run the list: whose work changes because of this? Then tell them early enough that they can still do something about it. Relying on the principal contractor to cascade puts a delay and a filter between you and the people affected. Limiting it by area and week misses dependencies that are sequential rather than physical. And telling everybody about everything trains people to ignore you.',
    section: 'Coordinating operatives and other trades on site',
    difficulty: 'intermediate',
    topic: 'Communicating a change',
    reference: 'Module 5, Section 2 — Who counts as a relevant person',
  },
  {
    id: 216,
    question:
      'Work has stopped because access has been withdrawn. What should already have been in place?',
    options: [
      'A contingency sum in the price to cover the standing time',
      'An independent task identified at the planning stage, so a stoppage has somewhere to go',
      'A written instruction from the principal contractor confirming the withdrawal',
      'An agreement that the programme will be extended by the duration of the stoppage',
    ],
    correctAnswer: 1,
    explanation:
      'Identifying an independent task at the planning stage is what turns a stoppage into a redeployment rather than a lost day — and before you move people onto it, check that resources, access and competence all exist for that work. A contingency sum pays for the lost time rather than preventing it, and the written instruction and the extension are both after-the-fact contractual matters.',
    section: 'Coordinating operatives and other trades on site',
    difficulty: 'advanced',
    topic: 'Responding to a stoppage',
    reference: 'Module 5, Section 2 — Coordination',
  },
  {
    id: 217,
    question:
      'A change has been agreed on site. What must happen to the plan?',
    options: [
      'It is updated, because an out-of-date plan carries authority it no longer deserves',
      'It is left as issued, so the original intent remains visible for the record',
      'It is superseded verbally at the next briefing, with the document updated at completion',
      'It is annotated by hand on the site copy only',
    ],
    correctAnswer: 0,
    explanation:
      'An out-of-date plan is worse than no plan, because people follow it believing it is current. Leaving it as issued for the record confuses the audit trail with the working document — the superseded version is kept, but it is withdrawn from use. A verbal supersession reaches only the people in the room, and a hand annotation on one copy leaves every other copy wrong.',
    section: 'Coordinating operatives and other trades on site',
    difficulty: 'intermediate',
    topic: 'Keeping the plan current',
    reference: 'Module 5, Section 2 — Coordination',
  },
  {
    id: 218,
    question:
      'You have bad news about a delay but have not yet worked out what to do about it. When do you raise it?',
    options: [
      'Once you have a solution, so the conversation is constructive',
      'Immediately — somebody else may hold the cheap answer',
      'At the next scheduled progress meeting',
      'In writing only, so that the record is unambiguous',
    ],
    correctAnswer: 1,
    explanation:
      'Tell people before you have solved it: the person you tell may have an option you do not — access, a resequence, a different trade’s spare week — and that option expires with time. Waiting for a solution, waiting for a meeting or holding it for a written note all spend the very thing that made the cheap answer possible. Confirming in writing afterwards is right, and is a different point.',
    section: 'Coordinating operatives and other trades on site',
    difficulty: 'intermediate',
    topic: 'Raising problems early',
    reference: 'Module 5, Section 2 — Who counts as a relevant person',
  },

  // ── Section 3 · Site documentation, materials and storage ────────────────
  {
    id: 219,
    question:
      'New work is built to the edition of BS 7671 in force. How is an existing installation judged?',
    options: [
      'Against the current edition, with any non-compliance recorded as a defect',
      'On safety and risk — lack of full compliance with the current edition does not necessarily mean unsafe',
      'Against the edition in force when it was installed, with no further assessment',
      'Against the current edition, unless a departure was recorded at the time of installation',
    ],
    correctAnswer: 1,
    explanation:
      'The Foreword makes the position explicit: an existing installation that does not fully comply with the current edition is not for that reason unsafe or in need of upgrading. Coding every difference from the current edition as a defect produces reports full of C3s that mean nothing. Judging it purely against the old edition ignores that the risk may genuinely have changed, and a recorded departure does not alter how the installation is assessed today.',
    section: 'Site documentation, materials and storage',
    difficulty: 'advanced',
    topic: 'Editions and existing installations',
    reference: 'BS 7671 Foreword',
  },
  {
    id: 220,
    question:
      'Why is a superseded copy of BS 7671 described as more dangerous than no copy at all?',
    options: [
      'Because it is no longer covered by the publisher’s errata',
      'Because it answers confidently, and a deleted requirement produces confidently wrong work',
      'Because it cannot be cited in a dispute or an investigation',
      'Because it will not contain the current certification forms',
    ],
    correctAnswer: 1,
    explanation:
      'With no copy you go and find out; with an old copy you get an answer and stop looking — and of the three kinds of amendment, deletion is the one that produces confidently wrong work, because the old text still reads as a requirement. Errata, citation and the forms are all real consequences of working from an old copy and none of them is the reason it is dangerous.',
    section: 'Site documentation, materials and storage',
    difficulty: 'intermediate',
    topic: 'Working from the current edition',
    reference: 'Module 5, Section 3 — Two different questions about editions',
  },
  {
    id: 221,
    question:
      'A technical bulletin summarises an amendment change. What do you apply on the job?',
    options: [
      'The bulletin, because it is written for practitioners and is more recent',
      'The consolidated text of the standard',
      'Whichever is more onerous, as a matter of prudence',
      'The bulletin for new work and the consolidated text for existing installations',
    ],
    correctAnswer: 1,
    explanation:
      'Summaries and bulletins are excellent at locating a change — telling you that something moved and roughly where — but the consolidated text is what you apply, because that is the requirement. Applying the more onerous of two readings is not a principle, and splitting by new against existing work confuses this question with the separate one about how existing installations are judged.',
    section: 'Site documentation, materials and storage',
    difficulty: 'intermediate',
    topic: 'Bulletins and the standard',
    reference: 'Module 5, Section 3 — Two different questions about editions',
  },
  {
    id: 222,
    question:
      'Material is delivered to site. What four tests should it pass before it is accepted?',
    options: [
      'Environment, specification, correct type, and condition on arrival',
      'Quantity, price, delivery note, and storage location',
      'Manufacturer, standard, certification, and warranty',
      'Compliance, availability, cost, and lead time',
    ],
    correctAnswer: 0,
    explanation:
      'Is it right for the environment it is going into, does it meet the specification, is it the correct type, and did it arrive undamaged. "Correct type" is the one that catches the right family in the wrong variant — the rating, the curve, the breaking capacity, the RCD type. The other lists are a goods-received check, a product enquiry and a procurement comparison.',
    section: 'Site documentation, materials and storage',
    difficulty: 'intermediate',
    topic: 'Accepting materials',
    reference: 'Module 5, Section 3 — Four tests',
  },
  {
    id: 223,
    question:
      'Regulation 512.2.1 requires that equipment shall be of a design appropriate to what?',
    options: [
      'The load current it is expected to carry in normal service',
      'The situation in which it is to be used',
      'The product standard under which it was manufactured',
      'The competence of the person installing it',
    ],
    correctAnswer: 1,
    explanation:
      'Equipment shall be of a design appropriate to the situation in which it is to be used, and the installation shall take account of the conditions likely to be encountered — that is the external influences requirement. Load current is a sizing question dealt with elsewhere, the product standard describes what the item is rather than whether it suits the place, and the installer’s competence is a different duty entirely.',
    section: 'Site documentation, materials and storage',
    difficulty: 'intermediate',
    topic: 'Equipment selection',
    reference: 'BS 7671 Regulation 512.2.1',
  },
  {
    id: 224,
    question:
      'A supplier offers a substitute for a specified item. What is the essential question?',
    options: [
      'Whether the substitute meets the same product standard',
      'Whether the substitute is available within the programme',
      'Who is entitled to approve it, because a substitution is a design change',
      'Whether the substitute costs the same or less than the specified item',
    ],
    correctAnswer: 2,
    explanation:
      'A substitution changes the design, and the question is who holds the authority to change it — usually not you. Meeting the same product standard, arriving on time and costing no more are all things the person with that authority will want to know, and none of them answers whether the change may be made. Accepting a substitute on your own judgement is how a specification quietly stops being the specification.',
    section: 'Site documentation, materials and storage',
    difficulty: 'advanced',
    topic: 'Substitutions',
    reference: 'Module 5, Section 3 — Four tests',
  },
  {
    id: 225,
    question:
      'You reject a delivered item. What must happen to it?',
    options: [
      'It is returned to the supplier on the next collection',
      'It is separated, marked, and given a written reason',
      'It is set aside in the store until a decision is made',
      'It is recorded on the delivery note and retained on site',
    ],
    correctAnswer: 1,
    explanation:
      'Separate it, mark it and write down why — otherwise it gets installed anyway, which is exactly what rejection is supposed to prevent. Returning it is usually the eventual outcome but it does not happen today. Setting it aside without marking it is how it ends up back in circulation, and a note on a delivery note is not visible to the person who picks the item up.',
    section: 'Site documentation, materials and storage',
    difficulty: 'intermediate',
    topic: 'Rejecting materials',
    reference: 'Module 5, Section 3 — Four tests',
  },
  {
    id: 226,
    question:
      'Which CDM duties govern site storage, given there is no separate storage regulation?',
    options: [
      'Regulation 13 site induction and Regulation 15 worker cooperation',
      'Regulation 17 safe access and egress, and Regulation 18 good order',
      'Regulation 4 client duties and Regulation 8 general duties',
      'Regulation 12 construction phase plan and Regulation 22 site rules',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 18 requires good order and reasonable cleanliness — including that no material with projecting nails is left where it is a danger — and Regulation 17 requires safe access and egress and sufficient working space, which is what a blocked route breaches. Induction, cooperation, client duties and the phase plan are all genuine CDM duties that say nothing about how material is stored.',
    section: 'Site documentation, materials and storage',
    difficulty: 'advanced',
    topic: 'Storage duties',
    reference: 'CDM 2015 Regulations 17 and 18',
  },
  {
    id: 227,
    question:
      'How should a site store be arranged?',
    options: [
      'Alphabetically by item, so anything can be located systematically',
      'By sequence, off the floor, heavy low and fragile high — findable beats tidy',
      'By supplier, so that deliveries and returns can be reconciled',
      'By value, with the most expensive items furthest from the door',
    ],
    correctAnswer: 1,
    explanation:
      'Arrange it by the order the job needs things, keep it off the floor, put heavy low and fragile high — and remember that findable beats tidy, because a tidy store nobody can navigate still costs you the search. Alphabetical and supplier orderings both ignore the sequence of the work, and arranging by value addresses theft, which damages far less material than damp, dust and crushing do.',
    section: 'Site documentation, materials and storage',
    difficulty: 'basic',
    topic: 'Organising a store',
    reference: 'Module 5, Section 3 — You manage what you are given',
  },

  // ── Section 4 · Evaluating the finished work and own performance ─────────
  {
    id: 228,
    question:
      'A job met every success criterion, but the client is clearly unhappy. What does that tell you?',
    options: [
      'That the client’s expectations were unreasonable from the outset',
      'That the criteria measured the work rather than the experience of it',
      'That a criterion was breached but not detected during the work',
      'That the criteria were too tight and should be relaxed on the next job',
    ],
    correctAnswer: 1,
    explanation:
      '"Passed but unhappy" is a finding about the criteria, not about the client: they measured the installation and missed disruption, communication, mess or warning — the things a client actually experiences. Blaming the expectations skips the lesson. There is no evidence of an undetected breach, and the answer to criteria that missed something is to widen them, not to loosen them.',
    section: 'Evaluating the finished work and own performance',
    difficulty: 'advanced',
    topic: 'Evaluating the criteria',
    reference: 'Module 5, Section 4 — The criteria are the thing on trial',
  },
  {
    id: 229,
    question:
      'You compare material ordered against material installed and find a difference. What does that figure mean on its own?',
    options: [
      'Nothing without the take-off and the stated allowance to compare it against',
      'That the take-off was inaccurate by that amount',
      'That waste on site was equal to the difference',
      'That the order should be reduced by that amount next time',
    ],
    correctAnswer: 0,
    explanation:
      'A raw difference is not a finding: it could be the take-off, the allowance, genuine waste, off-cuts returned to stock or a scope change, and you cannot tell which without the two figures the order was built from. Attributing it to the take-off or to waste picks one cause without evidence, and adjusting the next order on that basis corrects a number you have not diagnosed.',
    section: 'Evaluating the finished work and own performance',
    difficulty: 'advanced',
    topic: 'Evaluating resource use',
    reference: 'Module 5, Section 4 — Selection and usage',
  },
  {
    id: 230,
    question:
      'A test fails during verification and is corrected. What should be recorded?',
    options: [
      'The corrected result only, since that is the state the installation was left in',
      'The cause, not just the correction — a test failure is information about something upstream',
      'The failure and the correction, in the comments box of the certificate',
      'Nothing, provided the retest passes and the work complies',
    ],
    correctAnswer: 1,
    explanation:
      'A failed test tells you something about the design, the material, the method or the person, and recording only the fix throws that away — which is how the same failure appears on the next job. The certificate records the installation’s final condition, and the cause belongs in your own job record rather than as a comment to the client. Recording nothing loses the finding entirely.',
    section: 'Evaluating the finished work and own performance',
    difficulty: 'intermediate',
    topic: 'Learning from test failures',
    reference: 'Module 5, Section 4 — Three layers to judge it in',
  },
  {
    id: 231,
    question:
      'A snag list shows a cluster of items in the last area finished. What kind of finding is that?',
    options: [
      'A workmanship finding about the operatives working in that area',
      'A programme finding — the last area was compressed',
      'A materials finding, since that area was completed from the remaining stock',
      'Two separate findings, one about quality and one about the end date',
    ],
    correctAnswer: 1,
    explanation:
      'Snags concentrated in the area finished last, alongside a recovered final week, is one finding rather than two: the programme compressed and the quality paid for it. Reading it as workmanship blames the people who were given no time, and the materials explanation is speculation. Treating it as two unrelated findings is exactly the mistake — the pattern is the information.',
    section: 'Evaluating the finished work and own performance',
    difficulty: 'advanced',
    topic: 'Reading a snag list',
    reference: 'Module 5, Section 4 — Three layers to judge it in',
  },
  {
    id: 232,
    question:
      'Against what should you evaluate your own performance on a job?',
    options: [
      'Against how the job felt compared with previous jobs',
      'Against skills, knowledge, training and experience — a fixed reference',
      'Against the performance of the other operatives on the same job',
      'Against whether the client raised any complaint',
    ],
    correctAnswer: 1,
    explanation:
      'Skills, knowledge, training and experience gives you a fixed reference, which beats a feeling and matches the standard CDM itself applies to appointment. Comparing with how a job felt, with other people, or with whether anybody complained all measure something that moves — and the absence of a complaint is not evidence of competence.',
    section: 'Evaluating the finished work and own performance',
    difficulty: 'intermediate',
    topic: 'Evaluating own performance',
    reference: 'Module 5, Section 4 — Judge against something',
  },
  {
    id: 233,
    question:
      'You reached the limit of your competence during a job and asked for help. How should that be evaluated?',
    options: [
      'As a competence gap that should be recorded as a shortcoming',
      'As competence — recognising a limit and asking is the correct behaviour',
      'As neutral, since the work was completed correctly in the end',
      'As a planning failure, because the gap should have been foreseen',
    ],
    correctAnswer: 1,
    explanation:
      'Recognising a limit and asking is competence; working past it silently is the real failure. It is worth asking separately whether the gap could have been spotted at the planning stage, because that is the transferable lesson — but that is an additional question rather than a reason to record the asking itself as a shortcoming. Calling it neutral misses both points.',
    section: 'Evaluating the finished work and own performance',
    difficulty: 'intermediate',
    topic: 'Recognising limits',
    reference: 'Module 5, Section 4 — Judge against something',
  },
  {
    id: 234,
    question:
      'Where is time most often lost on a job?',
    options: [
      'Inside tasks, because durations are habitually under-estimated',
      'Between tasks, in the gaps in the programme',
      'At the start, while the site is being set up',
      'At the end, during testing and certification',
    ],
    correctAnswer: 1,
    explanation:
      'Time goes in the gaps — waiting for access, for a decision, for another trade, for material — far more than it goes inside the work itself, which is why comparing planned against actual milestone by milestone tells you more than the end date does. Durations do get under-estimated, but that is the smaller share; set-up and testing are visible and usually planned for.',
    section: 'Evaluating the finished work and own performance',
    difficulty: 'intermediate',
    topic: 'Where time is lost',
    reference: 'Module 5, Section 4 — The end date is the least interesting number',
  },
  {
    id: 235,
    question:
      'How should a handover be evaluated?',
    options: [
      'On the day itself, by whether the client signed and accepted the documentation',
      'On the fortnight after it, by what came back',
      'At the end of the defects liability period, when all faults are known',
      'By the completeness of the certification pack issued',
    ],
    correctAnswer: 1,
    explanation:
      'Judge it on what comes back in the following fortnight, sorted into genuine faults, operation questions and document requests — and operation questions are demonstration failures, which are the commonest kind. A signature on the day proves only that a handover happened. Waiting for the end of the defects period is too late to learn anything, and a complete certification pack is one input rather than the measure.',
    section: 'Evaluating the finished work and own performance',
    difficulty: 'advanced',
    topic: 'Evaluating a handover',
    reference: 'Module 5, Section 4 — Judged by what happened next',
  },
];

export const MODULE_5_QUESTIONS = bank('Planning & coordination', QUESTIONS);
