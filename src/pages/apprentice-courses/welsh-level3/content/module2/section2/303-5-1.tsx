/**
 * Ported from the English course, combining:
 *   level3/module1/section3/Sub2.tsx
 *   level2/module1/section3/Sub2.tsx
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
    id: 'l3-m1-s3-sub2-purpose',
    question: "What's the legal status of PPE in the hierarchy of control?",
    options: [
      'Last resort — provided only where risks cannot be controlled by other equally or more effective means.',
      'First line of defence — PPE should always be issued before any other control is considered, as it directly protects the worker.',
      "Equal in weight to all other controls — PPE can be chosen instead of engineering controls at the supervisor's discretion.",
      'Voluntary — PPE is recommended good practice but is not required by any regulation.',
    ],
    correctIndex: 0,
    explanation:
      'PPE Regs 1992 (as amended 2022 to cover limb workers) require the employer to provide PPE only where risks cannot be controlled by other means. Hierarchy: eliminate → substitute → engineer → administer → PPE. The L3 add is arguing for the higher controls when PPE-only is being defaulted to.',
  },
  {
    id: 'l3-m1-s3-sub2-elim',
    question:
      "You're asked to drill chases for cable in plaster on a Grade II listed wall. What's the L3 hierarchy starting point?",
    options: [
      'Issue the operative an FFP3 mask and drill the chase as requested — PPE handles the dust.',
      'Drill the chase quickly to keep the dust exposure time as short as possible.',
      'Damp the wall down and sweep up afterwards, then carry on as instructed.',
      'Start by asking whether the cable can be surface-routed in discrete trunking before any chasing is considered.',
    ],
    correctIndex: 3,
    explanation:
      'Run the hierarchy: eliminate (surface-route in discrete trunking), substitute (different cable type/route), engineer (low-dust hand tools with on-tool extraction), administer (restricted area, time-box), PPE last. Surface mount on a listed wall is often the right answer, and listed-building consent considerations apply. The hierarchy reframes "drill the chase" as "what’s the lowest-impact installation method?".',
  },
  {
    id: 'l3-m1-s3-sub2-engineer',
    question:
      'A junior asks "why can’t I just wear the mask, why do I need extraction too?". What’s the L3 supervisor answer?',
    options: [
      'The mask is uncomfortable, so extraction lets you take it off sooner.',
      "Engineering controls cut the dust at source, so you're not relying on the mask sealing perfectly every time.",
      'Extraction keeps the workplace tidier, which is the main reason it is preferred.',
      "You don't — a correctly-fitted mask alone gives full protection, so extraction is optional.",
    ],
    correctIndex: 1,
    explanation:
      'Engineering controls reduce the hazard at source — less dust in the air to begin with. PPE relies on the operative wearing it correctly all the time AND the equipment performing as rated; either fails and the operative is exposed. Two layers of control means two layers of protection, and the COSHH Reg 7 hierarchy is law, not best practice.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does "PPE" stand for in the H&S context?',
    options: [
      'Protective Personal Effects — the personal items a worker brings to site for their own comfort and safety.',
      'Personal Protective Equipment — gear worn to protect the wearer from one or more health and safety risks.',
      'Permitted Plant and Equipment — the tools and machinery approved for use on a particular site.',
      'Primary Preventive Engineering — the engineering controls applied at the top of the hierarchy of control.',
    ],
    correctAnswer: 1,
    explanation:
      'PPE = Personal Protective Equipment — clothing, helmets, glasses, gloves, footwear, RPE and similar items. Defined in PPE Regs 1992 (as amended 2022).',
  },
  {
    id: 2,
    question: 'Why is PPE the last resort in the hierarchy?',
    options: [
      'Because PPE is the most expensive control and should only be used when cheaper options have been exhausted.',
      'Because the law requires every other control to be tried and shown to have failed before PPE is allowed.',
      'Because it relies on the wearer using it correctly every time AND on the equipment performing as rated.',
      'Because PPE protects only the wearer, whereas the law requires controls that protect the general public first.',
    ],
    correctAnswer: 2,
    explanation:
      "Both the wearer's compliance and the equipment's performance can fail. Higher controls (eliminate, substitute, engineer) reduce the hazard itself, which doesn't depend on individual compliance.",
  },
  {
    id: 3,
    question: 'What does PPE Regs 1992 (as amended 2022) require?',
    options: [
      'That every employee buys and maintains their own PPE to ensure they take personal responsibility for it.',
      'That PPE is provided only to employees working at height or with live electrical equipment.',
      'That PPE is selected by the manufacturer of the equipment being used, not by the employer.',
      'That the employer provides suitable, maintained PPE where other controls are inadequate, now including limb (b) workers.',
    ],
    correctAnswer: 3,
    explanation:
      'PPE must be provided where risks cannot be adequately controlled by other means, and be suitable, properly maintained, properly used, with information, instruction and training. The 2022 amendment extended the duty beyond employees to limb (b) workers (gig economy, casual contractors under non-employment arrangements).',
  },
  {
    id: 4,
    question: 'Apply the hierarchy to "noise from a 110V cordless impact wrench in a stairwell":',
    options: [
      'Eliminate or substitute (quieter method or manual wrench) first, then engineer and limit exposure, with ear defenders last.',
      'Issue ear defenders to everyone in the stairwell and continue, since PPE is the simplest control.',
      'Carry on without controls — a cordless tool used briefly is unlikely to reach a harmful noise level.',
      'Move the work outdoors, since noise is never a problem in open air regardless of the source.',
    ],
    correctAnswer: 0,
    explanation:
      'Noise works the hierarchy the same way as dust or live work: eliminate (quieter method), substitute (manual torque wrench), engineer (quieter tool, sound-absorbing barriers), administer (limit duration, exclude others), then ear defenders LAST. The Control of Noise at Work Regs 2005 require assessment at the 80 dB lower action level.',
  },
  {
    id: 5,
    question: 'What CE / UKCA marking do you check on safety footwear?',
    options: [
      'EN 397, the industrial helmet standard, applied to the protective toe cap of the boot.',
      'EN ISO 20345 safety footwear, with the S-grade and EH rating matched to the hazard.',
      'EN 166, the eye-protection standard, which also covers footwear impact resistance.',
      'EN 60903, the electrical insulating glove standard, applied to insulating footwear soles.',
    ],
    correctAnswer: 1,
    explanation:
      "EN ISO 20345 with the appropriate S-grade (S1, S1P, S3 etc) indicates features like toe and midsole protection, antistatic and water resistance. For electrical work look for the EH (Electrical Hazard) rating or class S2/S3 with an insulating sole. Generic boots aren't safety footwear.",
  },
  {
    id: 6,
    question: 'Why does FFP3 fit-testing matter for RPE?',
    options: [
      'Because the test confirms the filter is the correct colour code for the contaminant being controlled.',
      'Because the test records the date the mask was issued so its service life can be tracked.',
      "Because a mask that doesn't seal to the face gives far less than its rated assigned protection factor.",
      'Because the test measures the air flow rate the wearer can draw through the mask under load.',
    ],
    correctAnswer: 2,
    explanation:
      'Beard, face shape and mask model all affect the seal, so an untested fit gives a false sense of protection. Face-fit testing (qualitative or quantitative, per HSE INDG479) confirms the fit and is required at first issue and on changes such as weight, dental work or beard growth.',
  },
  {
    id: 7,
    question: 'Who pays for PPE — employer or employee?',
    options: [
      'The employee, who claims the cost back against tax as a work expense.',
      "Shared equally — the employer buys it and deducts half the cost from the employee's wages.",
      'The client or main contractor for whom the work is being carried out.',
      'The employer, who must ensure suitable PPE is provided free of charge for any required item.',
    ],
    correctAnswer: 3,
    explanation:
      'PPE Regs 1992 Reg 4 require the employer to provide suitable PPE, and HASAWA s.9 prohibits any charge to employees in respect of statutory provisions. Charging apprentices for required "kit" is unlawful; only personal preferences (fancier kit) can be at the employee’s expense by agreement.',
  },
  {
    id: 8,
    question: "L3 supervisor judgement on PPE — what's the key add over L2?",
    options: [
      'Arguing for the higher controls before defaulting to PPE, and documenting the hierarchy reasoning.',
      'Choosing the cheapest PPE that still carries a CE or UKCA mark to keep job costs down.',
      'Ensuring every operative wears the maximum level of PPE available regardless of the task.',
      'Leaving PPE decisions to each operative so they can pick what they find most comfortable.',
    ],
    correctAnswer: 0,
    explanation:
      'At L2 you wear it; at L3 you push back on "just give them masks", ask what engineering controls have been considered, and invert to PPE only where genuinely no higher control is reasonably practicable — recording the reasoning either way.',
  },
];

const faqs = [
  {
    question: "Can I refuse to do work because the firm hasn't provided suitable PPE?",
    answer:
      'Yes — under HASAWA s.7, EAWR Reg 16 and ERA s.44. Document the refusal and the reason; escalate up the chain. Firm has a duty to provide; you have a duty not to work without.',
  },
  {
    question: 'Does PPE include things like sunscreen for outdoor work?',
    answer:
      'Sunscreen sits in a grey area — generally treated as employer-provided for outdoor workers under MHSWR Reg 3 risk assessment for UV exposure, though not strictly classed as PPE under PPE Regs. Best practice = provide.',
  },
  {
    question: 'How often should PPE be replaced?',
    answer:
      "Per manufacturer's stated lifetime, after damage, after exposure to extreme conditions, or per the firm's inspection regime. Hard hats often have a 5-year stated life from manufacture; harnesses have specific inspection cycles; RPE filters have specified service lives.",
  },
  {
    question:
      'What’s the difference between "general PPE" and "complex PPE" under the regulations?',
    answer:
      'Simple PPE = minor risks (mostly Cat I — sunglasses, light gloves). Complex PPE = serious or fatal risks (Cat III — fall arrest harnesses, RPE for hazardous substances, electrical insulating gloves). Cat III requires more rigorous certification and operator training.',
  },
  {
    question: 'Can my own personal PPE be used?',
    answer:
      'Yes if it meets the standard, is in good condition and the firm accepts it. Most firms prefer to issue PPE so they can verify standard and condition. Personal kit may be acceptable for some items (gloves, eyewear) less so for others (hard hats with date markings).',
  },
  {
    question: "What's the L3 supervisor's role in PPE compliance?",
    answer:
      'Verify suitability for the task (correct standard for the hazard); verify condition (in-date, undamaged); verify fit (especially RPE); brief on use and maintenance; intervene when non-compliance is observed; document the supervision.',
  },
  {
    question: 'Why does Local Exhaust Ventilation (LEV) need 14-monthly testing?',
    answer:
      'COSHH 2002 Reg 9 requires the employer to ensure that any engineering control measure subject to thorough examination and testing is examined and tested at suitable intervals by a competent person — and Schedule 4 specifies 14 months as the maximum interval for most LEV systems. The test verifies that the LEV is still capturing the dust / fume at source rather than just looking like it works. Without the test certificate the LEV cannot be relied upon as a compliance control, regardless of how new the equipment appears.',
  },
  {
    question: 'Does using on-tool extraction mean I can stop wearing a mask?',
    answer:
      'No — defence in depth. On-tool extraction reduces airborne dust at source, but residual exposure remains (incomplete capture, dust that escapes the extraction stream, dust that has already settled). FFP3 mask remains the backup layer protecting against the residual. The combination delivers reliable under-WEL exposure; either alone is less reliable.',
  },
  {
    question:
      'What if engineering controls are genuinely not reasonably practicable for a one-off short-duration task?',
    answer:
      'PPE-only IS sometimes defensible — emergency response, very small one-off tasks, legacy access. The L3 supervisor reflex is to document the reasoning: what was considered at each higher level of the hierarchy, why it was rejected, and what residual risk the PPE-alone arrangement carries. A defensible PPE-only decision has a written record; an indefensible one does not.',
  },
  {
    question: 'How does the 2022 amendment to PPE Regs change things for sub-contractors?',
    answer:
      'The Personal Protective Equipment at Work (Amendment) Regulations 2022 extended the duty in Reg 4 to provide suitable PPE to limb (b) workers — those working under arrangements that are not employment contracts but where they are personally performing work for the employer. This catches gig-economy workers, some agency workers, and casual contractors who would previously have fallen outside the duty. For electrical-trade firms employing labour-only operatives, the change is significant — they are now duty-bound to provide PPE to all such workers, not just employees.',
  },
];

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks2 = [
  {
    id: 'five-step-order-check',
    question: 'What’s the FIRST step of the HSE’s five-step risk assessment?',
    options: [
      'Decide who could be harmed',
      'Write the method statement',
      'Identify the hazards',
      'Decide what controls to put in place',
    ],
    correctIndex: 2,
    explanation:
      'Step 1 is always identify the hazards. You can’t decide who’s at risk or what to do about it until you know what could actually hurt someone. HSE INDG163 lays out all five steps in this exact order.',
  },
  {
    id: 'risk-rating-check',
    question:
      'On a 5×5 matrix, you score a hazard 4 (Likelihood — Likely) × 4 (Severity — Major). What’s that?',
    options: [
      'Low — acceptable, just monitor it',
      'High — additional controls needed before work starts',
      'Medium — control it if reasonably practicable',
      'Negligible — no further action required',
    ],
    correctIndex: 1,
    explanation:
      "4 × 4 = 16. On most company matrices that’s solidly in the High band (typically 12-15) or sometimes Very High (16+). Either way it’s 'do not start work until extra controls are in place'. Different firms use slightly different bands — read your company’s legend before you score anything.",
  },
  {
    id: 'review-trigger-check',
    question: 'Which of these does NOT trigger a risk-assessment review under MHSWR Reg 3(3)?',
    options: [
      'New people joining the team mid-project',
      'The client paying the invoice',
      'A near miss on the job',
      'The weather changing significantly',
    ],
    correctIndex: 1,
    explanation:
      "Anything that changes the conditions or makes the assessment 'no longer valid' triggers a review — new hazards, new people, near misses, weather, layout changes. Payment doesn’t change the work — it just means the office is happy.",
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions2 = [
  {
    id: 1,
    question:
      'You’re asked to do a quick assessment for replacing a damaged socket-outlet in a kitchen. Which approach matches the five-step method?',
    options: [
      'Skip the assessment entirely — a single socket swap is too small a job to need one',
      'Walk the kitchen, name the hazards, decide proportionate controls, and write a short note',
      'Produce a full thirty-page document covering every conceivable kitchen hazard before starting',
      'Copy last week’s kitchen RAMS and use it unchanged without checking this site',
    ],
    correctAnswer: 1,
    explanation:
      'Even a one-socket job goes through the same five steps — proportionate to the work. Walk it, name the hazards (live conductors, water nearby, occupant traffic), decide controls (isolate, prove dead, RCD test), document briefly, plan to review if anything changes. That’s the method working as intended.',
  },
  {
    id: 2,
    question:
      "Step 2 of the HSE method is 'decide who might be harmed and how'. On a domestic CU change, who should you be thinking about beyond yourself?",
    options: [
      'Only yourself, since you’re the one physically doing the work on the board',
      'Yourself and the homeowner present, but no other person in the property matters',
      'Yourself, the homeowner, other occupants, and the next person to work on the install',
      'Only people who happen to be in the same room while you’re actually working',
    ],
    correctAnswer: 2,
    explanation:
      "MHSWR Reg 3(1)(b) explicitly covers 'persons not in his employment'. That means family members, vulnerable occupants (kids, pets, vulnerable adults), future maintenance electricians, even visitors. The control measures (cordon off the area, brief the homeowner, lock the CU when you leave for lunch) all flow from naming who could be harmed.",
  },
  {
    id: 3,
    question: 'On a 5×5 risk matrix, what does the SCORE actually represent?',
    options: [
      'Likelihood + Severity — the two scores added together',
      'Severity only — how bad the harm would be if it happened',
      'Likelihood only — how often the hazard is encountered',
      'Likelihood × Severity — how likely it is to happen, multiplied by how bad it would be',
    ],
    correctAnswer: 3,
    explanation:
      'Risk score = Likelihood (1-5) × Severity (1-5). Range 1-25. The number gives you an objective starting point for prioritising what to control first — but it’s a tool, not a decision. Your judgement still matters.',
  },
  {
    id: 4,
    question: 'What does the hierarchy of control put FIRST as the most effective option?',
    options: [
      'Elimination — remove the hazard entirely',
      'PPE — issue gloves and glasses to everyone',
      'Administrative controls — write a procedure and train people',
      'Substitution — swap in a less dangerous method',
    ],
    correctAnswer: 0,
    explanation:
      "Elimination (often by isolation in electrical work — turn it off and lock it off) is the most effective control. PPE is the LAST resort, not the first one. Working through the hierarchy in order is how 'reasonably practicable' gets demonstrated.",
  },
  {
    id: 5,
    question:
      "You’ve scored a hazard High (15). The control you’ve listed is 'workers to be careful'. Why is that not acceptable?",
    options: [
      'It’s fine for a High risk — telling people to be careful is a valid control',
      'Care is a behaviour, not a control. Controls have to be physical, procedural or PPE, and the higher the risk the more substantive the control needs to be',
      'It’s acceptable only if every worker signs to say they’ll be careful',
      'It works as long as the supervisor reminds the team each morning',
    ],
    correctAnswer: 1,
    explanation:
      "'Be careful' is the apprentice classic that an inspector tears apart in seconds. Controls have to be specific and verifiable — isolation procedure, signed permit, physical barrier, written checklist, supervisor sign-off. 'Be careful' is what you do AFTER the controls are in place.",
  },
  {
    id: 6,
    question:
      "Step 4 of the HSE method is 'record findings and implement them'. What counts as adequate recording?",
    options: [
      'Every single hazard imaginable, however trivial, written out in full',
      'Just the date and the name of the person who did the assessment',
      'The significant findings — hazards, who’s affected, the controls and who’s responsible. Proportionate to the work',
      'A verbal summary given to the team, with nothing written down',
    ],
    correctAnswer: 2,
    explanation:
      "MHSWR Reg 3(6) only mandates the 'significant findings'. The bar is: someone else picking it up should be able to understand what’s being controlled and why. A small job might be a one-page form. A complex one might be 20 pages. Both are correct if proportionate.",
  },
  {
    id: 7,
    question:
      "Step 5 is 'review your assessment and update if necessary'. What’s a sensible review trigger on a 6-month commercial fit-out?",
    options: [
      'Only at the very end, when the job is being signed off',
      'Once at the start — a six-month job needs just one assessment',
      'Only if the client specifically asks for an updated version',
      'Significant changes (new sub-contractor, layout change, near miss), monthly check-ins as a minimum, plus immediate review after any incident',
    ],
    correctAnswer: 3,
    explanation:
      'Reviews are triggered by reality, not the calendar — but most firms also bake in a regular check (weekly/monthly) so reviews don’t get forgotten. Near misses, layout changes, new team members, weather all force reviews. The point of step 5 is to keep the document alive.',
  },
  {
    id: 8,
    question:
      "You see a generic 'CU change' RAMS your firm uses for every consumer unit. Today’s job is in a tenanted flat with elderly occupants, no labelling on the existing CU, and the meter cupboard is shared with three other flats. What do you do with the generic RAMS?",
    options: [
      'Use it as a starting point but add the site-specific hazards (vulnerable occupants, identification of circuits, shared meter, isolation coordination with neighbouring flats) and the corresponding controls',
      'The work to be done, hazards identified, precautions required, gas test results, emergency procedures, time limits, and authorisation signatures',
      'Document the programme change and its impact, notify the main contractor in writing of any additional costs or delays, and follow up with a formal variation or claim if applicable',
      'The Network and Information Systems Regulations 2018 requiring operators of essential services to manage cybersecurity risks to their OT systems and report significant incidents',
    ],
    correctAnswer: 0,
    explanation:
      "Generic templates are fine as a starting point — that’s how most firms work efficiently. But 'suitable and sufficient' means site-specific. Take the generic, walk the site, add what’s actually different, score those hazards, write the controls. THAT becomes today’s RAMS.",
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs2 = [
  {
    question: 'Do I HAVE to use the 5×5 matrix? Can I just use Low / Medium / High?',
    answer:
      'Either is fine — there’s no legal requirement for a specific matrix. 5×5 is the most common because it gives more granularity (1-25 instead of 1-9 on a 3×3). Some firms use 4×4. Pick whatever your company uses and stick with it. The matrix is a tool to help your thinking, not a magic formula.',
  },
  {
    question:
      "Step 3 says 'evaluate the risks and decide on precautions'. How do I actually evaluate?",
    answer:
      "Score Likelihood (how likely the hazard is to cause harm given current conditions, 1-5) × Severity (how bad if it does, 1-5). Look up the score on your company matrix legend — you’ll get a band (Low / Medium / High / Very High) with an action level (e.g. 'review controls', 'additional controls required', 'stop work'). Then work the hierarchy of control to pick the controls.",
  },
  {
    question: 'What’s the hierarchy of control?',
    answer:
      'Eliminate → Substitute → Engineering controls → Administrative controls → PPE. Most effective at the top, least effective at the bottom. For electrical work: eliminate by isolating, substitute with battery tools, engineer with RCDs and barriers, administer with permits and procedures, PPE last (insulated tools, gloves, arc-rated clothing).',
  },
  {
    question: 'Steps 4 and 5 sound like the same thing — what’s the difference?',
    answer:
      "Step 4 is the snapshot: record what you’ve decided AND put the controls in place (the 'implement them' bit). Step 5 is the loop: keep checking it’s still valid and update when things change. Step 4 happens before work starts. Step 5 is alive throughout the job.",
  },
  {
    question: 'Who has to sign the risk assessment?',
    answer:
      'The competent person who carried it out (or had it carried out) signs to confirm it’s suitable and sufficient. Workers usually sign to confirm they’ve read and understood it. On larger sites it might also need principal contractor sign-off and client acceptance. The signatures matter — they’re the audit trail if anything goes wrong later.',
  },
  {
    question: 'What if the same hazard scores differently for different people on the team?',
    answer:
      'It often does — and the assessment has to reflect that. An apprentice working at height has a higher likelihood of harm (less experience) than a 20-year scaffolder. A pregnant worker, someone with a disability, someone with a back injury — all might face a higher severity from the same hazard. MHSWR Reg 3(1)(a) is explicit: assess for the actual people at work, not a theoretical average worker.',
  },
];

export default function Lesson303_5_1() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        {
          'Remember from L2 — PPE is the last line. At L3 you actively argue for the higher controls before defaulting to a mask, and document the reasoning.'
        }
      </p>

      <TLDR
        points={[
          'Hierarchy: Eliminate → Substitute → Engineer → Administer → PPE. PPE is LAST. Required by COSHH Reg 7, MHSWR ACOP and the broader regulatory framework.',
          'PPE Regs 1992 (as amended 2022) — employer provides; suitable, maintained, properly used; covers limb (b) workers since 2022.',
          'HASAWA s.9 — no employee charges for PPE required under statutory provisions. Employer pays.',
          'Work at Height Regulations 2005 Reg 6 has its own statutory hierarchy — avoid, collective protection, then individual fall protection.',
          'COSHH 2002 Reg 7 + EH40 Workplace Exposure Limits — PPE alone cannot guarantee compliant exposure for many substances; engineering controls are the practical compliance route.',
          'Two layers always beat one — engineering controls + PPE creates defence in depth; PPE alone is single-point-of-failure protection.',
        ]}
      />
      <LearningOutcomes
        outcomes={[
          'State the procedures to remove or minimise risks before deciding PPE is needed (the hierarchy of control).',
          'State the purpose of PPE — protection against residual risk after higher controls applied.',
          'Identify the requirements of PPE Regs 1992 (as amended 2022) — provision, suitability, training.',
          'Recognise the L3 supervisor judgement role in arguing for engineering / administrative controls before PPE.',
          'Identify CE / UKCA marking and EN standards for common PPE items (footwear, RPE, electrical gloves).',
          'Apply HASAWA s.9 — no employee charges for required PPE.',
          'Apply COSHH 2002 Reg 7 hierarchy to substance exposure assessments — prevent / engineer / source-control / PPE-in-addition.',
          'Identify EH40/2005 Workplace Exposure Limits relevant to electrical work (silica, hardwood, lead, asbestos, welding fume, solder fume).',
          'Apply Work at Height Regulations 2005 Reg 6 hierarchy — avoid, collective protection, individual fall protection.',
          'Recognise long-latency disease as a driver of hierarchy compliance — the claim that matures in 2045 from today&apos;s exposure.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The hierarchy in detail</ContentEyebrow>
      <ConceptBlock
        title="Why PPE is the last line"
        plainEnglish="Higher controls reduce the hazard itself. PPE only protects against residual exposure — and only if the operative wears it correctly every time AND the equipment performs as rated. Either failure removes the protection."
        onSite="The L3 supervisor judgement starts at the top of the hierarchy: can we eliminate this hazard altogether? Substitute? Engineer it out? Limit exposure administratively? PPE only when the higher options have been genuinely considered."
      >
        <p>Hierarchy applied across H&amp;S regulations:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>COSHH Reg 7</strong> — explicitly requires the hierarchy for substance
            exposure.
          </li>
          <li>
            <strong>WaH Regulations 2005 Reg 6</strong> — work avoidance &gt; collective
            protection &gt; individual protection.
          </li>
          <li>
            <strong>MHSWR Reg 4 (principles of prevention)</strong> — schedule sets out the same
            priority order.
          </li>
          <li>
            <strong>Noise Regs 2005</strong> — eliminate / reduce / engineer / PPE.
          </li>
          <li>
            <strong>EAWR Reg 4(4)</strong> — PPE last for electrical protection.
          </li>
          <li>
            <strong>Manual Handling Ops Regs 1992</strong> — avoid &gt; assess &gt; reduce.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="The five levels unpacked"
        plainEnglish="Eliminate = remove the hazard altogether. Substitute = swap for something less hazardous. Engineer = physical / technical changes that reduce exposure. Administer = procedures, training, time limits. PPE = last line."
        onSite="Document the hierarchy reasoning on the RAMS — for each significant hazard, what was considered at each level and why was the next-level-down chosen."
      >
        <p>Examples by level:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Eliminate</strong> — change the design so the hazard doesn&apos;t exist (e.g.
            surface mount instead of chase).
          </li>
          <li>
            <strong>Substitute</strong> — use less hazardous materials / methods (LV battery tools
            instead of mains, water-based instead of solvent-based).
          </li>
          <li>
            <strong>Engineer</strong> — guards, extraction, enclosures, isolation devices, RCDs.
          </li>
          <li>
            <strong>Administer</strong> — permits, time limits, training, supervision, exclusion
            zones, signage.
          </li>
          <li>
            <strong>PPE</strong> — gloves, glasses, RPE, footwear, FR clothing, harness.
          </li>
          <li>
            <strong>Combination</strong> — most jobs need controls at several levels; defence in
            depth.
          </li>
          <li>
            <strong>Document the reasoning</strong> — what was considered at each level; why the
            next-down was chosen.
          </li>
          <li>
            <strong>Review on near-miss</strong> — a near-miss is evidence the chosen level may
            not be enough.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Personal Protective Equipment at Work Regulations 1992 — Reg 4(1)"
        clause={
          <>
            "Every employer shall ensure that suitable personal protective equipment is provided
            to his employees who may be exposed to a risk to their health or safety while at work
            except where and to the extent that such risk has been adequately controlled by other
            means which are equally or more effective."
          </>
        }
        meaning={
          <>
            The headline duty — provide suitable PPE BUT only where risks aren&apos;t adequately
            controlled by other means which are equally or more effective. The "other means"
            wording explicitly cites the hierarchy. Provided = no employee charges (HASAWA s.9).
            2022 amendment extended Reg 4 to limb (b) workers.
          </>
        }
        cite="Source: Personal Protective Equipment at Work Regulations 1992 (SI 1992/2966), Reg 4."
      />

      <InlineCheck {...checks[0]} />
      <InlineCheck {...checks[1]} />

      <SectionRule />
      <ContentEyebrow>Suitability, maintenance and use</ContentEyebrow>
      <ConceptBlock
        title="Right kit, right fit, right standard"
        plainEnglish="Suitable means matched to the hazard, the user, the work environment and the duration. A pair of gardening gloves isn't electrical insulating PPE; a generic dust mask isn't FFP3-rated; safety boots from a hardware shop without EN ISO 20345 marking aren't safety footwear."
        onSite="L3 supervisor checks: standard markings on every item; condition (no damage, no expiry); fit (especially RPE — face-fit test); training (operative knows correct use, limitations, maintenance); replacement schedule."
      >
        <p>Standards to know for electrical work:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>EN ISO 20345</strong> — safety footwear (S1/S1P/S2/S3 etc).
          </li>
          <li>
            <strong>EN 397</strong> — industrial safety helmets (general purpose).
          </li>
          <li>
            <strong>EN 388</strong> — protective gloves (mechanical hazards).
          </li>
          <li>
            <strong>EN 60903 / IEC 60903</strong> — electrical insulating gloves (Class 0 / 00 / 1
            / 2 / 3 / 4 by voltage rating).
          </li>
          <li>
            <strong>EN 166</strong> — eye protection (impact-rated).
          </li>
          <li>
            <strong>EN 149</strong> — filtering facepieces (FFP1/FFP2/FFP3).
          </li>
          <li>
            <strong>EN 50321</strong> — electrical insulating footwear.
          </li>
          <li>
            <strong>EN 61482</strong> — arc-flash protective clothing.
          </li>
          <li>
            <strong>EN 361</strong> — full body harnesses (fall arrest).
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Face-fit testing for RPE"
        plainEnglish="Tight-fitting RPE (FFP3 masks, half-masks, full-face) requires a face-fit test to confirm the seal works for the specific user. Beard, face shape and mask model all affect fit. HSE expects fit-test at first issue and on relevant changes (significant weight change, dental work, facial hair)."
        onSite="A mask that doesn't seal is theatre, not protection. Fit-testing is now standard for routine RPE use; the cost (~£50 per test) is trivial compared to the cost of an exposure incident."
      >
        <p>Two test methods:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Qualitative</strong> — sweet/bitter taste-test mist; user wears the mask under
            a hood and reports whether they detect the taste. Suitable for FFP3 disposable masks.
          </li>
          <li>
            <strong>Quantitative</strong> — instrumented measurement of leak; required for
            half-masks, full-face, powered respirators.
          </li>
          <li>Records retained; re-test on changes; fit cards / certs carried.</li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="HASAWA 1974 — s.9"
        clause={
          <>
            "No employer shall levy or permit to be levied on any employee of his any charge in
            respect of anything done or provided in pursuance of any specific requirement of the
            relevant statutory provisions."
          </>
        }
        meaning={
          <>
            The no-charge rule. PPE required by statute (which includes most electrical-trade PPE
            under PPE Regs / EAWR / WaHR / Noise Regs / COSHH) is at the employer&apos;s expense.
            Apprentices being asked to pay for their kit is unlawful for any required PPE.
          </>
        }
        cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.9."
      />

      <RegsCallout
        source="Control of Substances Hazardous to Health Regulations 2002 — Reg 7(1) and Reg 7(3)"
        clause={
          <>
            "(1) Every employer shall ensure that the exposure of his employees to substances
            hazardous to health is either prevented or, where this is not reasonably practicable,
            adequately controlled. (3) Where it is not reasonably practicable to prevent exposure
            to a substance hazardous to health, the employer shall comply with his duty of control
            under paragraph (1) by applying protection measures appropriate to the activity and
            consistent with the risk assessment, including, in order of priority — (a) the design
            and use of appropriate work processes, systems and engineering controls and the
            provision and use of suitable work equipment and materials; (b) the control of
            exposure at source, including adequate ventilation systems and appropriate
            organisational measures; and (c) where adequate control of exposure cannot be achieved
            by other means, the provision of suitable personal protective equipment in addition to
            the measures required by sub-paragraphs (a) and (b)."
          </>
        }
        meaning={
          <>
            COSHH Reg 7 is the regulatory home of the hierarchy of control for substance exposure.
            The order is fixed by law: prevent first, then engineering / process controls, then
            control at source, then PPE — and PPE only IN ADDITION to higher measures, never
            instead of them. This is the framework the L3 supervisor leans on when arguing for
            engineering controls over a PPE-only solution: the law itself says PPE is the last
            option, not the first.
          </>
        }
        cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 7."
      />

      <InlineCheck {...checks[2]} />

      <SectionRule />
      <ContentEyebrow>Deeper hierarchy reasoning</ContentEyebrow>
      <ConceptBlock
        title="Why two layers always beat one"
        plainEnglish="Engineering controls reduce the hazard at source — less dust generated, less voltage exposed, less weight to lift. PPE protects against the residual. Together they create defence in depth: even if one fails, the other catches the exposure. PPE alone is single-point-of-failure protection."
        onSite="The L3 argument to the contracts manager: \&quot;the engineering controls aren't replacing the PPE, they're reducing the dose. Mask-only is one layer; mask + extraction is two layers. Two layers is what COSHH expects.\&quot;"
      >
        <p>Defence-in-depth examples:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Silica</strong> — extraction (engineering) + FFP3 (PPE) + time limit
            (administrative).
          </li>
          <li>
            <strong>Live work</strong> — isolation (eliminate) + insulating mat (engineering) +
            insulated tools (engineering) + insulating gloves (PPE).
          </li>
          <li>
            <strong>Working at height</strong> — scaffold guardrail (collective) + harness (PPE) +
            edge restraint (engineering).
          </li>
          <li>
            <strong>Noise</strong> — quieter tool (substitute) + sound-absorbing barrier
            (engineering) + ear defenders (PPE).
          </li>
          <li>
            <strong>Manual handling</strong> — trolley (engineering) + team lift (administrative)
            + back support belt (PPE).
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Cost vs benefit framing — the contracts manager conversation"
        plainEnglish="When pushing back on PPE-only proposals, frame the cost in terms the contracts manager understands: claim cost vs control cost; HSE prosecution cost; lost-time injury impact; framework disqualification risk. The engineering controls almost always cost less than ONE failure event."
        onSite="Real numbers help: an M-class vacuum + extraction adaptor = ~£500 one-off. A silicosis claim = £m+. A LTI day = ~£500-£1000 plus reputation damage. Framing in £ rather than safety alone often wins the conversation."
      >
        <p>Costs to weigh in the argument:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Engineering control kit (one-off, depreciable).</li>
          <li>Additional time per task (often minimal once routine).</li>
          <li>
            vs prosecution fines (Sentencing Council Definitive Guideline scales by turnover —
            £000s to £m+).
          </li>
          <li>vs civil claim cost (long-tail, can exceed firm value).</li>
          <li>vs LTI / lost work day cost (~£500-£1000 per day per operative).</li>
          <li>vs framework disqualification (lost contracts).</li>
          <li>vs insurance premium uplift after claim history.</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="When PPE genuinely IS the only reasonable option"
        plainEnglish="Sometimes the higher controls aren't reasonably practicable — short-duration emergency response, very small one-off task, legacy-equipment access where re-engineering would require replacing the system entirely. PPE-only IS sometimes defensible. The L3 supervisor recognises these scenarios but documents WHY higher controls were rejected."
        onSite='The hierarchy isn&apos;t \"always engineer\"; it&apos;s \"always consider the higher options first and document the reasoning\". A defensible PPE-only decision has a written record of what was considered above and why it wasn&apos;t reasonably practicable.'
      >
        <p>Defensible PPE-only scenarios:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Emergency response (no time to engineer).</li>
          <li>Very small one-off (minutes of exposure).</li>
          <li>
            Legacy installation where engineering would require system replacement (cost grossly
            disproportionate).
          </li>
          <li>
            Inspection / observation tasks (no disturbance, exposure is to existing condition).
          </li>
          <li>
            Activity where engineering control already engineered out the bulk of exposure (PPE
            for residual only).
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title='PPE training — what \"information, instruction and training\" means'
        plainEnglish="PPE Regs Reg 9 requires the employer to provide adequate information, instruction and training on the PPE — what it's for, how to use it, its limitations, how to maintain it. Issuing PPE without training is non-compliance."
        onSite="Training doesn't need to be a course — for routine items (gloves, glasses) a brief on-issue brief is enough. For complex PPE (RPE with face-fit, harness, electrical insulating gloves) formal training is required and recorded."
      >
        <p>Training elements per PPE category:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Simple PPE</strong> (gloves, glasses, hi-vis) — brief on-issue (purpose, fit,
            replacement).
          </li>
          <li>
            <strong>RPE</strong> — face-fit test + use + maintenance + storage briefing; refresher
            on type change.
          </li>
          <li>
            <strong>Harness / fall arrest</strong> — formal training, periodic refresher, donning
            / doffing practice, anchor selection.
          </li>
          <li>
            <strong>Electrical insulating gloves</strong> — pre-use inspection method, dielectric
            test record interpretation, voltage class limits.
          </li>
          <li>
            <strong>Arc-flash PPE</strong> — donning sequence, ATPV interpretation, layering
            compatibility, post-event assessment.
          </li>
          <li>Records of all training retained as competence evidence.</li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <CommonMistake
        title="Defaulting to mask-only on routine silica work"
        whatHappens={
          <>
            Operatives chasing brick all day with FFP3 masks but no on-tool extraction, no water
            suppression. Inspector finds the hierarchy was inverted. COSHH Reg 7 breach; FFI;
            remedial requirement to introduce engineering controls.
          </>
        }
        doInstead={
          <>
            On-tool extraction connected to M-class vacuum AND FFP3 mask AND time-limit. The
            combination is far more reliable than mask alone.
          </>
        }
      />

      <CommonMistake
        title="Using personal kit without checking standards"
        whatHappens={
          <>
            Apprentice uses their own &quot;hard hat&quot; from a builders&apos; merchant — turns
            out to be a leisure helmet, not EN 397 industrial. Falling object causes head injury.
            PUWER + PPE Regs breach; firm prosecuted; injury could have been prevented by suitable
            kit.
          </>
        }
        doInstead={
          <>
            Verify standard markings on every item. Personal kit may be allowed but must meet the
            same standards as firm-issued. The L3 supervisor checks before tools come out.
          </>
        }
      />

      <Scenario
        title="Pushing back on 'just give them masks’"
        situation={
          <>
            Contracts manager has scoped a week of masonry chasing across multiple domestic
            properties. The plan as briefed: each operative gets an FFP3 mask. No on-tool
            extraction, no water suppression, no time limits, no exclusion of customers from the
            work area during chasing. The estimator argues the engineering controls would
            &quot;blow the budget&quot;.
          </>
        }
        whatToDo={
          <>
            Push back as the L3 supervisor / senior operative on site. Cite COSHH Reg 7 hierarchy
            explicitly: &quot;mask-only on routine silica work isn&apos;t COSHH-compliant; we need
            engineering controls&quot;. Specify the kit: M-class vacuum (one per pair of
            operatives), on-tool extraction adaptor for the chase saw, water suppression where the
            substrate allows, FFP3 face-fit-tested masks as backup. Time-limit individual
            sessions. Exclude customers and other persons from the immediate area during chasing.
            Document the conversation and the outcome in writing. If the contracts manager refuses
            to provide the kit, escalate to a director and document. ERA s.44 protects you. The
            engineering kit is not optional and the firm&apos;s defence after a long-term
            silicosis claim depends on it being in place.
          </>
        }
        whyItMatters={
          <>
            Silica is a Group 1 carcinogen. Long-latency disease (silicosis, lung cancer) takes
            years to manifest but the firm&apos;s defence to a claim 20 years from now depends on
            the controls in place today. Mask-only is a $20m liability waiting to mature. The
            engineering kit pays for itself many times over in avoided claims and in inspector
            confidence.
          </>
        }
      />

      <SectionRule />
      <ContentEyebrow>Work at Height — the hierarchy in WaHR 2005 Reg 6</ContentEyebrow>

      <ConceptBlock
        title="Why working at height has its own statutory hierarchy"
        plainEnglish="The Work at Height Regulations 2005 codify the hierarchy specifically for height work. Reg 6 sets it out: avoid working at height where reasonably practicable; where unavoidable, use work equipment to prevent falls; where the risk of a fall remains, use equipment to minimise the distance and consequences of a fall. PPE (harness) is the bottom of the WaHR hierarchy just as it is the bottom of the general hierarchy."
        onSite="Most domestic and commercial electrical work involves some height work — loft cabling, ceiling pendant installation, external lighting, distribution at high level. The L3 supervisor reflex on every height-work task: have we considered ground-level alternatives? Collective protection (scaffold guardrail) before individual (harness)? Restraint before fall arrest? Many firms default to ladder + concentration; that's rarely the right WaHR Reg 6 answer."
      >
        <p>The WaHR 2005 Reg 6 hierarchy for height work:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Avoid working at height altogether</strong> — bring the work to ground level
            where possible (pre-assemble on the floor, raise complete).
          </li>
          <li>
            <strong>Use existing places of work</strong> — permanent platforms, mezzanines,
            walkways with guardrails.
          </li>
          <li>
            <strong>Provide work equipment to prevent falls</strong> — scaffold with guardrails,
            MEWP (mobile elevating work platform), tower scaffold.
          </li>
          <li>
            <strong>Restraint systems</strong> — anchor + lanyard set short enough to prevent
            reaching the edge.
          </li>
          <li>
            <strong>Work positioning</strong> — anchor + lanyard supporting the user at a work
            face.
          </li>
          <li>
            <strong>Fall arrest</strong> — anchor + lanyard + energy absorber + full body harness;
            user can fall but is caught with controlled energy.
          </li>
          <li>
            <strong>Soft landing systems</strong> — air bags, nets (e.g. for roof work).
          </li>
          <li>
            <strong>Personal fall protection</strong> as last resort.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Work at Height Regulations 2005 — Reg 6(3)"
        clause={
          <>
            &quot;Where work is carried out at height, every employer shall take suitable and
            sufficient measures to prevent, so far as is reasonably practicable, any person
            falling a distance liable to cause personal injury.&quot;
          </>
        }
        meaning={
          <>
            The WaHR 2005 prevention duty. &quot;Distance liable to cause personal injury&quot; is
            not a fixed height — courts have found that injury can result from falls of less than
            a metre. The duty is to prevent the fall by measures higher in the hierarchy before
            resorting to fall arrest. Schedule 3 of the Regulations sets out the requirements for
            personal fall protection systems including the anchor, the system selection, and
            operator competence.
          </>
        }
        cite="Source: Work at Height Regulations 2005 (SI 2005/735), Reg 6."
      />

      <SectionRule />
      <ContentEyebrow>
        COSHH workplace exposure limits — the dose-response framework
      </ContentEyebrow>

      <ConceptBlock
        title="WELs and why 'just give them masks' usually fails the maths"
        plainEnglish="COSHH 2002 Reg 7(7) requires exposure to substances assigned a Workplace Exposure Limit (WEL) to be reduced so far as is reasonably practicable below the WEL. The list is published in EH40/2005 (updated periodically). For respirable crystalline silica the WEL is 0.1 mg/m³ (8-hour TWA). Routine masonry chasing without engineering controls easily generates dust concentrations well above this. PPE alone cannot guarantee under-WEL exposure because mask efficacy depends on fit, wear-time and respiration rate — engineering controls are the only reliable route to repeatable under-WEL exposure."
        onSite="L3 reading: when arguing for engineering controls, citing the WEL gives the conversation a concrete number. 'The WEL is 0.1 mg/m³; the dust monitor reads above that during chasing without extraction; masks rated APF 20 might bring residual exposure under the WEL IF they're worn correctly 100% of the time, which we can't guarantee — so the route to compliant exposure is engineering controls, not PPE alone.'"
      >
        <p>Common electrical-trade WELs (EH40/2005):</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Respirable crystalline silica</strong> — 0.1 mg/m³ (8h TWA). Generated by
            chasing, drilling brick / concrete / mortar.
          </li>
          <li>
            <strong>Hardwood dust</strong> — 3 mg/m³ (8h TWA). Generated by joinery, fitting
            kitchen units.
          </li>
          <li>
            <strong>Softwood dust</strong> — 5 mg/m³ (8h TWA).
          </li>
          <li>
            <strong>Lead, inorganic, dust and fume</strong> — 0.15 mg/m³ (8h TWA). Older paints /
            coatings on metalwork.
          </li>
          <li>
            <strong>Asbestos</strong> — 0.1 fibres/cm³ (control limit). Higher regulatory status
            under CAR 2012; not a standard WEL.
          </li>
          <li>
            <strong>Solvents (white spirit, IPA, MEK)</strong> — sector-specific WELs, often
            relevant for cleaners and adhesives.
          </li>
          <li>
            <strong>Welding fume</strong> — reclassified by HSE 2019 as carcinogen; LEV mandatory
            for any indoor welding regardless of duration.
          </li>
          <li>
            <strong>Soldering fume (rosin)</strong> — 0.05 mg/m³ (8h TWA); LEV recommended for
            routine work.
          </li>
        </ul>
      </ConceptBlock>

      <Scenario
        title="Pushing back on the 'use FFP3 only' survey assumption"
        situation={
          <>
            The project surveyor has scoped a week of routine chasing in an occupied office
            building for cable routing. The proposed control measures listed on the RAMS are: FFP3
            masks for the operatives, &quot;normal cleaning&quot; at the end of each day. No
            on-tool extraction, no water suppression, no M-class vacuum, no exclusion of office
            staff from the work area during chasing. The surveyor argues this is &quot;standard
            for chasing in occupied premises&quot; and that bringing in extraction kit would slow
            the programme. The customer is the office landlord who has insisted that office
            operations continue during the work.
          </>
        }
        whatToDo={
          <>
            Refuse to accept the RAMS as adequate. COSHH Reg 7 hierarchy is explicit: prevent or
            engineer first, PPE in addition. Specify the changes needed: M-class vacuum on-tool
            extraction connected to the chase saw and to any hammer drilling; water suppression
            where the substrate allows; FFP3 masks face-fit tested as backup layer; exclusion of
            office staff from the immediate work area during chasing (signage and a temporary
            barrier arrangement); thorough vacuuming (not sweeping) at end of work session;
            end-of-week deep clean. Document the proposed change in writing to the surveyor and
            contracts manager. If the surveyor still resists, escalate to the director. ERA s.44
            protects the position. The customer&apos;s preference for continued office operations
            does not override the COSHH duty owed to operatives and to the office staff (s.3
            non-employees).
          </>
        }
        whyItMatters={
          <>
            Marshalls Mono &pound;700k (2018) is the case in the inspector&apos;s mind when they
            see mask-only silica work. The L3 supervisor pushing back at the survey stage is far
            more effective than discovering the inadequacy during a site inspection. Office
            occupants are non-employees whose s.3 duty extends across the work — they are part of
            the population at risk in the COSHH assessment, not bystanders to be ignored. The
            engineering kit pays for itself in avoided long-tail claims and inspector confidence.
          </>
        }
      />

      <SectionRule />
      <ContentEyebrow>
        Welding fume reclassification (HSE 2019) and the new LEV expectation
      </ContentEyebrow>

      <ConceptBlock
        title="Why the IARC carcinogen reclassification of welding fume changed the practical compliance picture"
        plainEnglish="In 2017 the International Agency for Research on Cancer (IARC) classified welding fume as a Group 1 carcinogen (definite human carcinogen) based on accumulated evidence of lung cancer risk. The HSE responded in 2019 with revised enforcement expectations: indoor welding regardless of duration now requires effective Local Exhaust Ventilation (LEV); RPE alone is no longer accepted as adequate control for routine indoor welding; the same expectations extend to weld-adjacent operations that generate metal fume. The change affected many trades that had previously treated welding as a minor incidental activity — mounting brackets, fixing supports, fabricating small steel components on site. The L3 supervisor managing any indoor welding activity now needs to either source portable LEV, restrict the activity to outdoors, or document why neither is reasonably practicable and what compensating controls apply."
        onSite="Practical at L3 if welding is part of the work: bring portable LEV (welding fume extraction kit) to site for any indoor work; even short-duration welds in confined or poorly-ventilated spaces are caught by the expectation. RPE remains a backup layer not a substitute. Where welding cannot be brought outside and LEV cannot be deployed, the L3 supervisor reflex is to push the work to a different method (mechanical fixings instead of welded brackets) rather than treating the situation as 'PPE-only because we have to'."
      >
        <p>What the HSE 2019 reclassification means in practice:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Indoor welding</strong> — any duration, any process, requires effective LEV.
            Portable units are available; specification depends on process.
          </li>
          <li>
            <strong>Outdoor welding</strong> — dispersal generally adequate but RPE still expected
            for prolonged work or where dispersal is limited (e.g. inside a container, behind a
            hoarding).
          </li>
          <li>
            <strong>Stainless steel and galvanised steel</strong> — higher-risk fume profiles
            (chromium, nickel, zinc); enhanced controls expected.
          </li>
          <li>
            <strong>Substitution where possible</strong> — mechanical fixing instead of welding;
            pre-fabricated components instead of on-site weld.
          </li>
          <li>
            <strong>Operative training</strong> — competence in fume control as well as welding
            technique; understanding of plume direction, capture range, booth use.
          </li>
          <li>
            <strong>Health surveillance</strong> — long-latency cancer risk means respiratory
            health surveillance is increasingly expected for routine welders.
          </li>
          <li>
            <strong>Inspector focus</strong> — welding has been a priority area for HSE inspection
            campaigns since 2019; firms found relying on PPE alone are routinely served
            improvement notices.
          </li>
          <li>
            <strong>RIDDOR implications</strong> — occupational lung cancer attributable to
            welding fume exposure is reportable under Schedule 3.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>
        Case study — R v Marshalls Mono Ltd [2018] and the cost of mask-only silica
      </ContentEyebrow>

      <ConceptBlock
        title="A £700k fine for letting workers chase brick with PPE alone"
        plainEnglish="Marshalls Mono Ltd was fined £700,000 at Bradford Crown Court in 2018 after several employees were diagnosed with silicosis following years of exposure to respirable crystalline silica during stone-cutting operations at the firm's Yorkshire works. The HSE's investigation found that the firm had relied on dust masks as the principal control for silica exposure rather than implementing engineering controls such as wet-cutting, local exhaust ventilation or on-tool extraction. The Sentencing Council guideline placed the breach in the 'high culpability' band because the hierarchy of control was clearly inverted across the operation and the firm had been aware of the silica risk through industry guidance for many years. Several operatives suffered life-shortening disease as a direct consequence."
        onSite="The L3 reading: long-latency disease is the trap that catches firms decades after the exposure. The operatives diagnosed in 2018 had been exposed in the early 2000s. The firm's defence rested entirely on whether they had applied the hierarchy of control properly during that period — and the answer was no. PPE alone, even FFP3-rated, does not deliver compliant exposure for routine silica work; engineering controls do. The next claim under similar facts is being created today by firms that continue the practice. This is one of the most-prosecuted patterns in UK industry."
      >
        <p>What the Marshalls case teaches about long-latency disease and PPE-only:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Silica is a Group 1 carcinogen</strong> (IARC classification) — its hazardous
            status was well established when the original exposure occurred.
          </li>
          <li>
            <strong>FFP3 masks are not sufficient alone</strong> — assigned protection factor 20
            means a 5% leakage rate even when worn correctly; routine exposure above the WEL
            cannot be brought reliably below the WEL by mask alone.
          </li>
          <li>
            <strong>The firm&apos;s defence depends on contemporaneous records</strong> — if the
            only evidence available decades later is &quot;we issued masks&quot; that is rarely
            enough to discharge the SFAIRP burden.
          </li>
          <li>
            <strong>Long-latency disease claims are extremely costly</strong> — individual claims
            for silicosis or mesothelioma can run to hundreds of thousands of pounds; aggregate
            claims across a workforce can exceed firm value.
          </li>
          <li>
            <strong>The HSE has prioritised silica enforcement</strong> — sector campaigns have
            targeted construction, stone-cutting and electrical trades where chasing is routine.
          </li>
          <li>
            <strong>Engineering controls now cost relatively little</strong> — M-class vacuums,
            on-tool extraction adaptors and water suppression are commercially available at modest
            one-off cost compared to the claims they prevent.
          </li>
          <li>
            <strong>The L3 supervisor argument</strong> in 2025 is the same as the argument that
            should have been made in 2005 — engineering controls before PPE, not instead of PPE
            but with PPE as the backup layer.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>
        Step-by-step procedure — running a COSHH assessment for a chasing operation
      </ContentEyebrow>

      <ConceptBlock
        title="A worked COSHH Reg 6 + Reg 7 assessment for routine masonry chasing"
        plainEnglish="COSHH Reg 6 requires a suitable and sufficient assessment of the risks created by work involving substances hazardous to health, AND of the steps that need to be taken to comply with COSHH. Reg 7 then sets out the hierarchy. The L3 supervisor walking through this for a typical chasing job: identify substance, identify exposure route, identify population at risk, identify existing controls, evaluate residual exposure against WEL, select additional controls per the hierarchy, document. The framework is the same as MHSWR Reg 3 but with the substance-exposure focus that COSHH adds."
        onSite="The procedure feels formal but the steps are quick once practised. On a familiar chasing job the experienced L3 supervisor runs the COSHH steps in their head in 60 seconds; the written record may be a section of the RAMS or a short standalone document. The point is not to write War and Peace — the point is to demonstrate that the substance hazard has been engaged with explicitly."
      >
        <p>Step-by-step COSHH assessment for masonry chasing:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Identify the substance</strong> — respirable crystalline silica from brick /
            concrete / mortar / plaster substrate.
          </li>
          <li>
            <strong>Identify the exposure route</strong> — inhalation of respirable dust generated
            by cutting / drilling / breaking; airborne particles &lt;10&micro;m reach deep lung
            tissue.
          </li>
          <li>
            <strong>Identify the WEL</strong> — 0.1 mg/m³ (8-hour TWA) for respirable crystalline
            silica per EH40/2005.
          </li>
          <li>
            <strong>Identify the population at risk</strong> — the operative doing the chasing;
            other operatives nearby; customer / occupants of adjoining spaces if dust drifts;
            cleaners working after the job.
          </li>
          <li>
            <strong>Identify existing controls</strong> — what is currently being proposed? FFP3
            masks alone? Mask plus extraction? Wet-cut? Time-limit? Exclusion of others?
          </li>
          <li>
            <strong>Evaluate residual exposure</strong> — would the controls reliably bring
            exposure below the WEL? With realistic mask compliance and seal quality, can the firm
            demonstrate under-WEL exposure?
          </li>
          <li>
            <strong>Select additional controls per the hierarchy</strong> — eliminate (avoid
            chasing — surface mount in trunking); substitute (different fixing method); engineer
            (on-tool extraction, water suppression, M-class vacuum); administer (time-limit,
            exclusion); PPE (FFP3 with face-fit).
          </li>
          <li>
            <strong>Document the assessment</strong> — substance, WEL, controls selected,
            hierarchy reasoning, residual risk evaluation, named operatives briefed.
          </li>
          <li>
            <strong>Brief the operatives</strong> — what controls are in place, why, what to do if
            controls fail.
          </li>
          <li>
            <strong>Review on change</strong> — different substrate, different tool, different
            operative, near-miss occurring.
          </li>
        </ol>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>
        Cross-reference table — hierarchy across the H&amp;S regulations
      </ContentEyebrow>

      <ConceptBlock
        title="The same hierarchy appearing in different regulatory homes"
        plainEnglish="The hierarchy of control is not a COSHH peculiarity — it appears in nearly every modern H&amp;S regulation in some form. The wording varies but the structure is consistent: avoid the hazard, reduce at source, then engineering / collective protection, then administrative measures, then PPE / individual protection. The L3 supervisor literate in the hierarchy can cite the relevant regulation for whatever hazard the conversation is about."
        onSite='When pushing back on a PPE-only proposal, citing the specific regulation that requires the hierarchy is more powerful than citing the general principle. "COSHH Reg 7 explicitly puts PPE last for substance exposure" lands differently from "hierarchy of control says PPE is last". Different inspector, same answer.'
      >
        <p>Hierarchy in different regulations:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>COSHH 2002 Reg 7</strong> — substance exposure. Prevent first; control by
            engineering / process; control at source; PPE in addition.
          </li>
          <li>
            <strong>MHSWR 1999 Reg 4 + Schedule 1</strong> — general principles of prevention.
            Avoid, evaluate, combat at source, adapt, technical progress, replace, coherent
            policy, collective over individual, instructions.
          </li>
          <li>
            <strong>Work at Height Regulations 2005 Reg 6</strong> — avoid working at height, then
            use work equipment to prevent falls, then equipment to minimise distance and
            consequences.
          </li>
          <li>
            <strong>Manual Handling Operations Regs 1992 Reg 4</strong> — avoid hazardous manual
            handling, then assess, then reduce risk.
          </li>
          <li>
            <strong>Control of Noise at Work Regs 2005 Reg 6</strong> — eliminate at source, then
            reduce, then PPE.
          </li>
          <li>
            <strong>Control of Vibration at Work Regs 2005 Reg 6</strong> — eliminate or reduce;
            PPE not effective for vibration (no equivalent of mask) so engineering and
            administrative controls dominate.
          </li>
          <li>
            <strong>EAWR 1989 Reg 4 / Reg 14</strong> — design out the electrical hazard (Reg 4);
            dead working preferred over live (Reg 14); PPE last line.
          </li>
          <li>
            <strong>Control of Asbestos Regs 2012 Reg 11</strong> — avoid disturbance; prevent or
            reduce exposure; PPE / RPE in addition.
          </li>
          <li>
            <strong>Confined Spaces Regs 1997 Reg 4</strong> — avoid entry where reasonably
            practicable; safe system; emergency arrangements.
          </li>
          <li>
            <strong>CDM 2015 Reg 9</strong> — designer&apos;s duty to eliminate foreseeable risks
            at the design stage; the hierarchy starts in the design office, not on site.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>
        Hand-Arm Vibration Syndrome and the limits of PPE for vibration
      </ContentEyebrow>

      <ConceptBlock
        title="When PPE genuinely cannot solve the problem"
        plainEnglish="Vibration is the hazard where the hierarchy is most obviously needed: there is no effective PPE for hand-arm vibration. Anti-vibration gloves exist but provide minimal real-world protection at the frequencies that cause HAVS. Reducing exposure means lower-vibration tools, shorter exposure times, job rotation, regular health surveillance. The Control of Vibration at Work Regulations 2005 set exposure limits (Exposure Action Value 2.5 m/s²A(8); Exposure Limit Value 5.0 m/s²A(8)) measured as 8-hour daily exposure. The L3 supervisor managing chasing / breaking / impact wrench work must work the engineering and administrative controls because PPE is not an option."
        onSite="Practical at L3: tool selection (lower-vibration tools where available, manufacturer's declared vibration value), job rotation (operative does chasing for max 1 hour then switches to a non-vibrating task), trigger-time tracking (firm's vibration calculator using tool emission data and trigger time), health surveillance (regular HAVS questionnaires + Tier 3 medical screening where indicated). Cases of HAVS in the electrical trade are routine — preventable but persistent because the engineering and administrative controls are treated as optional."
      >
        <p>HAVS management at L3:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Tool selection</strong> — manufacturer-declared vibration value consulted
            before purchase; lower-vibration alternatives preferred.
          </li>
          <li>
            <strong>Job rotation</strong> — same operative on the same vibrating tool for limited
            periods; rotation to non-vibrating tasks.
          </li>
          <li>
            <strong>Trigger-time tracking</strong> — recording actual tool-on time, not just task
            duration; vibration exposure calculator using tool emission data.
          </li>
          <li>
            <strong>EAV / ELV awareness</strong> — operatives know their daily exposure target;
            the firm tracks per-operative cumulative exposure.
          </li>
          <li>
            <strong>Health surveillance</strong> — Tier 1 questionnaire annually; Tier 2 nurse-led
            screening if symptoms; Tier 3 medical screening for confirmed cases.
          </li>
          <li>
            <strong>Reporting</strong> — HAVS confirmed diagnosis is RIDDOR-reportable under
            Schedule 3.
          </li>
          <li>
            <strong>Anti-vibration gloves</strong> — limited real-world protection; may help with
            grip and cold but should not be treated as control of vibration exposure.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>
        Inspector visit walkthrough — the COSHH file the inspector asks for
      </ContentEyebrow>

      <ConceptBlock
        title="What documents the HSE inspector requests on a substance-exposure inspection"
        plainEnglish="HSE inspections that focus on substance exposure (silica, asbestos, welding fume, solvents) follow a fairly predictable document-request pattern. The inspector arrives, identifies themselves, asks for the responsible person, then requests the COSHH file. The file should contain: the substance inventory; the COSHH assessments per activity; the WEL benchmarking; the engineering control inventory (LEV / extraction / wet-cut); the maintenance records for the engineering controls (LEV must be tested every 14 months by a competent person under Reg 9); the PPE register; the training records; the health surveillance records; the records of any exposure monitoring carried out."
        onSite="The L3 supervisor reflex on receiving notice of a COSHH-focused HSE visit: ensure the file is producible, current, and matches what is actually happening on site. The biggest failures are not the absence of the file but the gap between what the file says and what the operatives are actually doing — RAMS say wet-cut, operatives are dry-cutting; PPE register says fit-tested FFP3, operatives are wearing single-use disposable; LEV record shows annual test, last test was 18 months ago. Inspectors find these gaps in the first hour."
      >
        <p>The COSHH file the inspector typically requests:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Substance inventory</strong> — what hazardous substances does the firm use or
            generate? SDS for each.
          </li>
          <li>
            <strong>COSHH assessments per activity</strong> — Reg 6 documents for each substance /
            activity combination.
          </li>
          <li>
            <strong>WEL benchmarking</strong> — current EH40/2005 limits referenced; exposure
            assessment (calculated or measured).
          </li>
          <li>
            <strong>Engineering control inventory</strong> — LEV systems, wet-cut equipment,
            on-tool extraction, M-class vacuums.
          </li>
          <li>
            <strong>LEV examination records</strong> — Reg 9 thorough examination and test every
            14 months by a competent person; certificates retained.
          </li>
          <li>
            <strong>PPE register</strong> — what items are issued, to whom, when, replacement
            schedule, fit-test certs.
          </li>
          <li>
            <strong>Training records</strong> — Reg 12 information, instruction and training; what
            was delivered, when, attendance signatures.
          </li>
          <li>
            <strong>Health surveillance records</strong> — Reg 11 where applicable (e.g. silica,
            asbestos exposure populations).
          </li>
          <li>
            <strong>Exposure monitoring records</strong> — Reg 10 measurements where carried out;
            trend analysis.
          </li>
          <li>
            <strong>Incident / near-miss records</strong> — relevant exposure events,
            lessons-learned actions.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <FAQ items={faqs} />
      <SectionRule />
      <KeyTakeaways
        points={[
          'Remember from L2 — PPE is the last line. At L3 you argue for the higher controls before defaulting.',
          'Hierarchy: Eliminate → Substitute → Engineer → Administer → PPE. Required by COSHH Reg 7 and broader framework.',
          'PPE Regs 1992 (as amended 2022) — provide suitable PPE only where higher controls inadequate; covers limb (b) workers since 2022.',
          'HASAWA s.9 — no employee charges for required PPE. Employer pays.',
          'Standards matter: EN 397 hat, EN ISO 20345 footwear, EN 60903 electrical gloves, EN 149 RPE, EN 388 mechanical gloves, EN 61482 arc-flash.',
          'Face-fit testing required for tight-fitting RPE. Beard / face shape affect seal. Quantitative for half-mask / full-face.',
          'L3 supervisor verifies suitability, condition, fit, training, replacement schedule. Document supervision.',
          'Document the hierarchy reasoning on RAMS — what was considered at each level and why the next-down was chosen.',
          'Marshalls Mono £700k (2018) — mask-only on silica is the most-prosecuted hierarchy inversion in the trade.',
          'COSHH 2002 Reg 9 — LEV requires thorough examination and test every 14 months by a competent person. Without the cert, the LEV isn&apos;t a compliance control.',
          'WaHR 2005 Reg 6 — separate statutory hierarchy for height work. Avoid first; collective protection before individual.',
          'Vibration is the hazard with no effective PPE — engineering and administrative controls dominate; health surveillance the safety net.',
        ]}
      />
      <Quiz title="PPE hierarchy of control — knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        How HSE actually wants you to walk through a job. Five steps, used the same way on every
        site — single socket swap or full commercial fit-out. The step-by-step you’ll do for the
        rest of your career.
      </p>

      <TLDR
        points={[
          'Step 1: Identify the hazards. Step 2: Decide who could be harmed. Step 3: Evaluate risks and pick controls. Step 4: Record findings and implement. Step 5: Review and update.',
          'Same five steps for every job — scaled to the work. A socket swap might fit on one page. A commercial CU upgrade might run twenty. Both follow the same logic.',
          'Risk score = Likelihood × Severity. Most firms use a 5×5 matrix giving 1-25. The number isn’t the answer — it’s a starting point for the controls conversation.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Walk through the HSE’s five-step risk assessment process in order, knowing what each step delivers.',
          'Identify hazards on a real electrical job — primary, secondary, environmental.',
          'Use a 5×5 risk matrix to score Likelihood × Severity and read the action level off the legend.',
          'Apply the hierarchy of control to pick the most effective controls reasonably practicable.',
          'Record significant findings in a way that’s proportionate to the job and meets MHSWR Reg 3(6).',
          'Recognise the triggers that mean an assessment has to be reviewed under Reg 3(3).',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The method, end-to-end</ContentEyebrow>

      <ConceptBlock title="Five steps — the same five, every job">
        <p>
          HSE codified this in INDG163 ('A brief guide to risk assessment') decades ago and it
          hasn’t changed because it works. Five steps, taken in order, scaled to the size of the
          job. You’ll do the same five for a domestic socket swap and a six-month commercial
          fit-out — the difference is depth, not method.
        </p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Identify the hazards</strong> — what could cause harm.
          </li>
          <li>
            <strong>Decide who might be harmed and how</strong> — workers, public, others.
          </li>
          <li>
            <strong>Evaluate the risks and decide on precautions</strong> — score, then pick
            controls.
          </li>
          <li>
            <strong>Record your findings and implement them</strong> — write what matters, do
            what’s written.
          </li>
          <li>
            <strong>Review your assessment and update if necessary</strong> — keep it alive.
          </li>
        </ol>
        <p>
          Get the steps in the wrong order and you make rookie mistakes. Picking controls before
          identifying hazards (jumping to 'we’ll just wear gloves' without naming what you’re
          actually being protected from). Recording before evaluating (filling in a form with no
          thinking behind it). The order matters because each step depends on the one before.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="HSE INDG163 — 'Risk assessment: A brief guide to controlling risks in the workplace'"
        clause="Identify the hazards. Decide who might be harmed and how. Evaluate the risks and decide on precautions. Record your significant findings. Review your risk assessment and update if necessary."
        meaning={
          <>
            The five-step method straight from HSE. Every safety advisor, NEBOSH course and site
            induction in the UK is built on these five lines. Memorise them — they’re the spine of
            everything in this section.
          </>
        }
        cite="Reference: HSE INDG163 (paraphrased) — original text on HSE website"
      />

      <SectionRule />

      <ContentEyebrow>Step 1 — Identify the hazards</ContentEyebrow>

      <ConceptBlock
        title="Walk the site. Talk to people. Look at the records."
        plainEnglish="A hazard is anything that could cause harm. You find them by walking the job, asking the people who work there, and checking the paperwork (manuals, accident book, previous RAMS, manufacturer’s data)."
        onSite="Don’t do this from the office. Do it on site, with the kit you’ll actually use, with the people who’ll be doing the work. Hazards you can’t see from a desk: water leak under the floor, asbestos in the ceiling void, neighbour’s burglar alarm wires running through the wall you’re drilling."
      >
        <p>For an electrical job, hazard categories you should be sweeping through:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Electrical</strong> — live conductors, indirect contact via faulty equipment,
            arc flash, stored energy in capacitors, induced voltage on parallel circuits.
          </li>
          <li>
            <strong>Mechanical</strong> — drills, saws, sharp cable armour, falling tools, manual
            handling of heavy gear.
          </li>
          <li>
            <strong>Environmental</strong> — water, weather, temperature, lighting, dust, confined
            spaces, working at height.
          </li>
          <li>
            <strong>Chemical / biological</strong> — solder fume, asbestos, mould, COSHH
            substances (cleaning agents, lubricants, jointing compound).
          </li>
          <li>
            <strong>Site-specific</strong> — other trades, traffic, public access, the customer’s
            own activities, fragile structures, fire risks.
          </li>
        </ul>
        <p>
          Trivial risks (a paper cut, mild static) can be ignored. The bar is <em>significant</em>{' '}
          hazards — ones that could realistically cause harm.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Step 2 — Decide who might be harmed and how</ContentEyebrow>

      <ConceptBlock
        title="Not just you. Not just your team. Anyone affected by the work."
        plainEnglish="MHSWR Reg 3(1)(b) is explicit: assess risks to people NOT in your employment too. Customers, the public, other trades, future maintenance electricians, vulnerable people."
        onSite="On a domestic job: the homeowner, kids, pets, the elderly relative who lives upstairs, the cleaner who comes in on Tuesday. On a commercial job: other trades on site, building users, deliveries, security guards, the next person to walk into the room you’ve just isolated."
      >
        <p>
          For each hazard you identified in Step 1, write down WHO could be harmed and HOW. That
          second word — 'how' — matters. 'Customer could be harmed by electric shock' is too
          vague. 'Customer could be harmed by direct contact with exposed live tails if they enter
          the meter cupboard while the cover is off' is something you can actually design controls
          around.
        </p>
        <p>Pay extra attention to vulnerable groups. They show up explicitly in HSE guidance:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Young workers (under 18) — apprentices included.</li>
          <li>New / inexperienced staff — first six months especially.</li>
          <li>Pregnant workers and nursing mothers.</li>
          <li>Workers with disabilities or pre-existing medical conditions.</li>
          <li>Lone workers — no immediate help if anything goes wrong.</li>
          <li>
            Members of the public, especially children, elderly, those with reduced mobility.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Step 3 — Evaluate the risks and decide on precautions</ContentEyebrow>

      <ConceptBlock
        title="Score it, then control it"
        plainEnglish="Likelihood × Severity gives you a number. The number tells you how aggressive the controls need to be. Higher the score, more substantial the controls."
      >
        <p>
          Most UK firms use a 5×5 matrix. Your company will have its own version with a
          colour-coded legend. Standard layout:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Likelihood (1-5):</strong> 1 = Rare (almost never), 2 = Unlikely (could happen
            but probably won’t), 3 = Possible (might happen sometimes), 4 = Likely (will probably
            happen), 5 = Almost certain (expected to happen).
          </li>
          <li>
            <strong>Severity (1-5):</strong> 1 = Negligible (first aid, no time off), 2 = Minor
            (medical treatment, less than 7 days off), 3 = Moderate (lost-time injury, hospital
            admission), 4 = Major (serious injury, long recovery, permanent impairment), 5 =
            Catastrophic (fatality or life-changing).
          </li>
          <li>
            <strong>Score = L × S</strong>, range 1-25. Bands typically:
            <span className="block ml-1 mt-1">1-3 Low (acceptable, monitor)</span>
            <span className="block ml-1">4-9 Medium (control if reasonably practicable)</span>
            <span className="block ml-1">
              10-15 High (additional controls required before work starts)
            </span>
            <span className="block ml-1">
              16-25 Very High (stop / do not start until risk reduced)
            </span>
          </li>
        </ul>
        <p>
          The score isn’t the decision. It’s the prompt for a decision. A High score means 'don’t
          crack on — design the controls properly first'. A Very High score means 'this can’t go
          ahead in its current form'. The matrix gives you a defensible audit trail for ALARP —
          which is what gets examined if anything later goes to court.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The hierarchy of control — pick the most effective option that’s reasonably practicable"
        plainEnglish="Don’t jump to PPE. Work down the list: eliminate → substitute → engineer → administer → PPE. Higher up = more effective. Combine multiple layers for serious risks (defence in depth)."
        onSite="On a CU change: ELIMINATE the live risk by isolating at the cut-out / supplying utility. SUBSTITUTE mains tools for cordless. ENGINEER with locks, warning notices, RCDs. ADMINISTER with the permit, the prove-dead procedure, the toolbox talk. PPE: insulated tools, voltage-rated gloves if needed, eye protection. Five layers from a single hazard."
      >
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Elimination</strong> — remove the hazard. In electrical work, this is usually
            'isolate and prove dead'. Most effective control there is.
          </li>
          <li>
            <strong>Substitution</strong> — replace with something less dangerous. Battery tools
            instead of mains, SELV instead of LV, low-energy LEDs replacing fluorescents with
            their stored energy in capacitors and chokes.
          </li>
          <li>
            <strong>Engineering controls</strong> — physical barriers, RCDs, interlocks, fixed
            guards, fire-rated enclosures. Built into the kit, not relying on people.
          </li>
          <li>
            <strong>Administrative controls</strong> — permits, procedures, training, supervision,
            signage, toolbox talks. Rely on people doing the right thing.
          </li>
          <li>
            <strong>PPE</strong> — last resort. Insulated tools, voltage-rated gloves, helmet,
            arc-rated clothing where required. Doesn’t remove the hazard — only the consequences
            if everything else fails.
          </li>
        </ol>
      </ConceptBlock>

      <RegsCallout
        source="HSE HSG65 — 'Managing for health and safety' (Plan-Do-Check-Act)"
        clause="Where possible, eliminate the hazard altogether. If not, control the risk by reducing the likelihood and/or severity. Apply the hierarchy of control: elimination, substitution, engineering controls, administrative controls, personal protective equipment — in that order."
        meaning={
          <>
            HSG65 is the umbrella document HSE expects employers to manage their whole safety
            system to. The hierarchy is the operating principle. Skipping straight to PPE without
            working through the higher tiers is one of the easiest ways to fail an HSE audit — or
            a coroner’s inquest.
          </>
        }
        cite="Reference: HSE HSG65 (paraphrased) — full document on HSE website"
      />

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Step 4 — Record findings and implement them</ContentEyebrow>

      <ConceptBlock
        title="Write the significant findings down. Then DO what’s written."
        plainEnglish="Recording is half the step. Implementing is the other half. A perfect document with no controls actually in place is worthless. Implemented controls without a record are legally fragile."
        onSite="Most firms use a standard template — hazard, who’s affected, current controls, residual risk score, additional controls needed, who’s responsible, when by. Sign it, date it, file it where the team can read it. THEN actually put the controls in place before work starts."
      >
        <p>What 'significant findings' means in practice:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>The hazards you identified (the significant ones).</li>
          <li>Who could be harmed and how.</li>
          <li>Existing controls and how well they’re working.</li>
          <li>Additional controls needed, with named responsibility and timescales.</li>
          <li>Residual risk score after controls are in place.</li>
          <li>Date assessed, by whom, when to review.</li>
        </ul>
        <p>
          Implementation is the part that gets forgotten. The document says 'lock-off required' —
          is the lock-off kit on site? The document says 'first-aider must be present' — has
          someone been nominated and briefed? The document says 'isolate at main switch' — is the
          main switch labelled and accessible? Step 4 isn’t finished until each control listed has
          been physically put in place.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Step 5 — Review and update</ContentEyebrow>

      <ConceptBlock
        title="The assessment is alive — keep it that way"
        plainEnglish="MHSWR Reg 3(3) requires review when the assessment is no longer valid OR there’s been a significant change. That’s any time the conditions you assessed against shift."
      >
        <p>Triggers for an immediate review:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>An accident or near miss on this job (or a similar one elsewhere).</li>
          <li>Layout changes — wall down, scaffold up, new opening, route change.</li>
          <li>New equipment introduced, or existing equipment modified.</li>
          <li>New people on the team — different competence, different vulnerabilities.</li>
          <li>Weather change for outdoor work — wind, rain, ice, heat.</li>
          <li>
            Time pressure that wasn’t there at the assessment — extended hours, rushed schedule.
          </li>
          <li>
            Any change to the regulatory landscape (new edition of BS 7671, new HSE guidance).
          </li>
        </ul>
        <p>
          On top of that, baseline reviews on a calendar (weekly toolbox-talk check, monthly full
          review on long jobs) catch slow drift before it becomes a problem.
        </p>
      </ConceptBlock>

      <CommonMistake
        title="Scoring the residual risk before the controls are actually in place"
        whatHappens={
          <>
            Apprentice fills in the matrix. Initial risk: 5 × 5 = 25 (Very High, stop work). Adds
            the planned controls — 'isolate, prove dead, work cover off' — rescores: 1 × 5 = 5
            (Medium). Document goes off to the office. Three weeks later the controls aren’t
            actually in place — no lock-off kit on site, no voltage indicator that’s been
            function-tested, no permit-to-work issued. Someone gets shocked. The document says
            risk is Medium. The reality is Very High. Audit trail: catastrophic.
          </>
        }
        doInstead={
          <>
            Score the residual risk based on what’s ACTUALLY in place, not what’s planned. If the
            lock-off kit isn’t on site yet, the residual risk hasn’t come down. The document
            should match reality minute-by-minute. If a control listed isn’t physically there, the
            score doesn’t drop until it is.
          </>
        }
      />

      <Scenario
        title="Mid-job change: the architect just added three more sockets to the kitchen"
        situation={
          <>
            You’re three days into a small commercial fit-out. Original RAMS was based on the
            drawings at quote stage — 8 sockets on a 32 A radial. Architect comes back today and
            adds three more sockets in a service area you hadn’t accounted for. The service area
            is wet (sluice room next to the staff toilet), in zone 1 of what counts as a special
            location. Your supervisor says 'just add them, same as the others'.
          </>
        }
        whatToDo={
          <>
            Stop and trigger a Step 5 review. The hazards have changed (wet location, IP rating
            now matters, RCD selection might need to change, supplementary bonding might need
            consideration). The 'who might be harmed' has changed (cleaning staff handling water
            and electricity in the same room). The controls have to change. Walk the new area,
            score the new hazards, write the additions to the RAMS, get them signed off, brief the
            team on the new controls — THEN add the sockets. Twenty minutes of process avoids a
            week of rework or worse.
          </>
        }
        whyItMatters={
          <>
            'Same as the others' is how scope creep becomes incident. The original assessment
            isn’t valid for the new conditions. Doing the new work to the old RAMS is a textbook
            MHSWR Reg 3(3) breach AND a BS 7671 special locations problem. Both end up at the same
            place if anything goes wrong: prosecution.
          </>
        }
      />

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <RegsCallout
        source="Construction (Design and Management) Regulations 2015 — Regulation 4 (Client duties in relation to managing projects)"
        clause="A client must make suitable arrangements for managing a project, including the allocation of sufficient time and other resources. Arrangements are suitable if they ensure that — (a) the construction work can be carried out, so far as is reasonably practicable, without risks to the health or safety of any person affected by the project; and (b) the facilities required by Schedule 2 are provided in respect of any person carrying out construction work. The client must ensure that these arrangements are maintained and reviewed throughout the project."
        meaning={
          <>
            The client (the customer paying for the work) has a legal duty to provide enough TIME
            and enough INFORMATION for the work to be done safely. That feeds straight into your
            risk assessment — if the client hasn't provided pre-construction information about
            asbestos, services routes or existing hazards, that's a CDM Reg 4 breach, and the
            assessment can't reasonably conclude &quot;controls in place&quot;. The customer
            pressuring you to skip steps doesn't transfer the legal duty — the duty is theirs, the
            consequences are everyone's.
          </>
        }
        cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 4 — verbatim from legislation.gov.uk."
      />

      <RegsCallout
        source="MHSWR 1999 — Regulation 14 (Employees' duties)"
        clause="(2) Every employee shall inform his employer or any other employee of that employer with specific responsibility for the health and safety of his fellow employees — (a) of any work situation which a person with the first-mentioned employee's training and instruction would reasonably consider represented a serious and immediate danger to health and safety; and (b) of any matter which a person with the first-mentioned employee's training and instruction would reasonably consider represented a shortcoming in the employer's protection arrangements for health and safety, in so far as that situation or matter either affects the health and safety of that first-mentioned employee or arises out of or in connection with his own activities at work, and has not previously been reported to his employer."
        meaning={
          <>
            The employee-side counterpart to the employer's Reg 3 duty. If the risk assessment is
            wrong, missing or no longer valid, you have a personal legal duty to flag it up. The
            bar is &quot;what a reasonable person with YOUR training would consider a danger or a
            shortcoming&quot; — for an apprentice that's deliberately set low. Spotted hazards
            that aren't on the RAMS, RAMS that doesn't match the job in front of you, controls
            listed but not in place — all Reg 14 reportable.
          </>
        }
        cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 14(2) — verbatim from legislation.gov.uk."
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Five steps in order: Identify hazards → Decide who’s harmed → Evaluate and pick controls → Record and implement → Review.',
          'Same five steps for every job — proportionate to the work. Socket swap to commercial fit-out, same logic.',
          'Risk score = Likelihood × Severity. 5×5 matrix is standard. The score guides the controls — it doesn’t make the decision.',
          'Hierarchy of control: Eliminate → Substitute → Engineering → Administrative → PPE. Work top-down. PPE is the LAST resort.',
          'Step 4 isn’t done until the controls are actually in place. Score residual risk against reality, not against intentions.',
          "Step 5 is alive: review on incidents, layout changes, new people, weather, time pressure — anything that makes the original assessment 'no longer valid' under MHSWR Reg 3(3).",
        ]}
      />

      {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

      <Quiz title="Five-step risk assessment knowledge check" questions={quizQuestions2} />

      {/* ── Prev / next nav ─────────────────────────────────── */}
    </div>
  );
}
