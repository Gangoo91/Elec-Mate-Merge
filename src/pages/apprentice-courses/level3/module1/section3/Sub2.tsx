/**
 * Module 1 · Section 3 · Subsection 2 — PPE hierarchy of control
 * Maps to City & Guilds 2365-03 / Unit 201 / LO3 / AC 3.2 + AC 3.3
 *   AC 3.2 — "describe the procedures that should be taken to remove or minimise risks
 *            before deciding PPE is needed"
 *   AC 3.3 — "state the purpose of PPE"
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 3.3 + 3.4 — same procedures, L3 supervisor framing
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'PPE hierarchy of control (3.2 / 3.3) | Level 3 Module 1.3.2 | Elec-Mate';
const DESCRIPTION = 'L3 PPE hierarchy depth — eliminate / substitute / engineer / administer / PPE. The supervisor judgement on the higher controls before reaching for the mask.';

const checks = [
  { id: 'l3-m1-s3-sub2-purpose', question: 'What\'s the legal status of PPE in the hierarchy of control?', options: ['First line.', 'Last resort. PPE Regs 1992 (as amended 2022 to cover limb workers) require employer to provide PPE only WHERE risks cannot be controlled by other means. Hierarchy: eliminate → substitute → engineer → administer → PPE.', 'Optional.', 'Customer\'s job.'], correctIndex: 1, explanation: 'Remember from L2 — PPE is the last line. L3 add: the supervisor argues for the higher controls when PPE-only is being defaulted to.' },
  { id: 'l3-m1-s3-sub2-elim', question: 'You\'re asked to drill chases for cable in plaster on a Grade II listed wall. What\'s the L3 hierarchy starting point?', options: ['Get the FFP3 mask.', '(1) Eliminate — can the cable be surface-routed in a discrete trunking? (2) Substitute — different cable type / route? (3) Engineer — hand-tools (lower dust) with on-tool extraction? (4) Administrative — restricted area, time-box. (5) PPE last. Listed-building consent considerations also apply.', 'Crack on with the SDS.', 'Put on a face shield.'], correctIndex: 1, explanation: 'Surface mount in trunking on a listed wall is often the right answer. The hierarchy reframes "drill the chase" as "what\'s the lowest-impact installation method?".' },
  { id: 'l3-m1-s3-sub2-engineer', question: 'A junior asks "why can\'t I just wear the mask, why do I need extraction too?". What\'s the L3 supervisor answer?', options: ['You\'re right, mask only.', 'Engineering controls reduce hazard at source — less dust in the air to begin with. PPE relies on (a) the operative wearing it correctly all the time, (b) the equipment performing as rated. Either fails and the operative is exposed. Both controls together is far more reliable than PPE alone. COSHH Reg 7 hierarchy is law, not best practice.', 'Just because.', 'Nobody knows.'], correctIndex: 1, explanation: 'Two layers of control = two layers of protection. Engineering reduces the hazard; PPE protects against the residual.' },
];

const quizQuestions = [
  { id: 1, question: 'What does "PPE" stand for in the H&S context?', options: ['Personal Protective Equipment.', 'Personal Protective Equipment — clothing, helmets, glasses, gloves, footwear, RPE etc designed to protect the wearer from one or more H&S risks.', 'Petty Personal Excuses.', 'Public Personal Engagement.'], correctAnswer: 0, explanation: 'PPE = Personal Protective Equipment. Defined in PPE Regs 1992 (as amended 2022).' },
  { id: 2, question: 'Why is PPE the last resort in the hierarchy?', options: ['It\'s expensive.', 'It relies on the wearer using it correctly every time AND on the equipment performing as rated. Both can fail. Higher controls (eliminate, substitute, engineer) reduce the hazard itself, which doesn\'t depend on individual compliance.', 'It\'s uncomfortable.', 'It\'s yellow.'], correctAnswer: 1, explanation: 'PPE depends on user compliance + equipment performance. Higher controls reduce the underlying hazard.' },
  { id: 3, question: 'What does PPE Regs 1992 (as amended 2022) require?', options: ['That all workers wear yellow.', 'Employer to provide PPE where risks cannot be adequately controlled by other means; PPE must be suitable, properly maintained, properly used, with information / instruction / training. 2022 amendment extended duties to cover limb (b) workers (workers under arrangements that aren\'t employment contracts).', 'That all workers wear orange.', 'That all workers wear green.'], correctAnswer: 1, explanation: 'The amended PPE Regs cover not just employees but also limb (b) workers (gig economy, casual contractors). Significant expansion in 2022.' },
  { id: 4, question: 'Apply the hierarchy to "noise from a 110V cordless impact wrench in a stairwell":', options: ['Just wear ear defenders.', '(1) Eliminate — could the work be done quieter? (2) Substitute — manual torque wrench? (3) Engineer — quieter tool, sound-absorbing barriers? (4) Administrative — limit duration, exclude others from area. (5) PPE — ear defenders LAST. Noise at Work Regs 2005 require risk assessment at 80dB action level.', 'Just close the door.', 'Just wear gloves.'], correctAnswer: 1, explanation: 'Noise hazards work the hierarchy the same way as dust or live work. PPE last, engineering and administrative controls first.' },
  { id: 5, question: 'What CE / UKCA marking do you check on safety footwear?', options: ['Any mark.', 'EN ISO 20345 (safety footwear) for general work; specific S-grade ratings (S1, S1P, S3 etc) indicate features (toe protection, midsole protection, antistatic, water resistance). For electrical work the mark to look for is the EH (Electrical Hazard) rating or class S2/S3 with insulating sole.', 'Just brown leather.', 'Made in UK.'], correctAnswer: 1, explanation: 'EN ISO 20345 + appropriate S-grade for the hazard. Generic boots aren\'t safety footwear.' },
  { id: 6, question: 'Why does FFP3 fit-testing matter for RPE?', options: ['It doesn\'t.', 'A mask that doesn\'t seal properly to the face provides much less protection than its rated assigned protection factor. Face-fit testing (qualitative or quantitative) confirms the fit. HSE INDG479 is the guide. Fit-test required at first issue and on changes (weight, dental work, beard growth).', 'Only for show.', 'Only on Tuesdays.'], correctAnswer: 1, explanation: 'Beard, face shape, mask model — all affect fit. Untested fit = false sense of protection. Fit-testing is now standard for routine RPE use.' },
  { id: 7, question: 'Who pays for PPE — employer or employee?', options: ['Employee.', 'Employer. PPE Regs 1992 Reg 4 — employer ensures suitable PPE is PROVIDED. PUWER and PPE Regs both prohibit charges to employees for required PPE under HASAWA s.9 (no charges to employees in respect of statutory provisions). Personal preferences (fancier kit) can be at employee\'s expense by agreement.', 'Both.', 'Customer.'], correctAnswer: 1, explanation: 'Employer pays. HASAWA s.9 specifically prohibits charges. Apprentices sometimes are charged for "kit" — that\'s unlawful for required PPE.' },
  { id: 8, question: 'L3 supervisor judgement on PPE — what\'s the key add over L2?', options: ['Wearing more PPE.', 'Arguing for the higher controls before defaulting to PPE. The L3 supervisor pushes back on "just give them masks" and asks "what engineering controls have we considered?". Documents the hierarchy reasoning. Inverts only when genuinely no higher control is reasonably practicable.', 'Wearing less PPE.', 'Wearing pink PPE.'], correctAnswer: 1, explanation: 'L2 = wear it. L3 = think about whether it\'s the right control or whether higher controls have been ducked.' },
];

const faqs = [
  { question: 'Can I refuse to do work because the firm hasn\'t provided suitable PPE?', answer: 'Yes — under HASAWA s.7, EAWR Reg 16 and ERA s.44. Document the refusal and the reason; escalate up the chain. Firm has a duty to provide; you have a duty not to work without.' },
  { question: 'Does PPE include things like sunscreen for outdoor work?', answer: 'Sunscreen sits in a grey area — generally treated as employer-provided for outdoor workers under MHSWR Reg 3 risk assessment for UV exposure, though not strictly classed as PPE under PPE Regs. Best practice = provide.' },
  { question: 'How often should PPE be replaced?', answer: 'Per manufacturer\'s stated lifetime, after damage, after exposure to extreme conditions, or per the firm\'s inspection regime. Hard hats often have a 5-year stated life from manufacture; harnesses have specific inspection cycles; RPE filters have specified service lives.' },
  { question: 'What\'s the difference between "general PPE" and "complex PPE" under the regulations?', answer: 'Simple PPE = minor risks (mostly Cat I — sunglasses, light gloves). Complex PPE = serious or fatal risks (Cat III — fall arrest harnesses, RPE for hazardous substances, electrical insulating gloves). Cat III requires more rigorous certification and operator training.' },
  { question: 'Can my own personal PPE be used?', answer: 'Yes if it meets the standard, is in good condition and the firm accepts it. Most firms prefer to issue PPE so they can verify standard and condition. Personal kit may be acceptable for some items (gloves, eyewear) less so for others (hard hats with date markings).' },
  { question: 'What\'s the L3 supervisor\'s role in PPE compliance?', answer: 'Verify suitability for the task (correct standard for the hazard); verify condition (in-date, undamaged); verify fit (especially RPE); brief on use and maintenance; intervene when non-compliance is observed; document the supervision.' },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section3')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 3</button>
          <PageHero eyebrow="Module 1 · Section 3 · Subsection 2" title="PPE hierarchy of control" description="Remember from L2 — PPE is the last line. At L3 you actively argue for the higher controls before defaulting to a mask, and document the reasoning." tone="emerald" />
          <TLDR points={[
            "Hierarchy: Eliminate → Substitute → Engineer → Administer → PPE. PPE is LAST. Required by COSHH Reg 7, MHSWR ACOP and the broader regulatory framework.",
            "PPE Regs 1992 (as amended 2022) — employer provides; suitable, maintained, properly used; covers limb (b) workers since 2022.",
            "HASAWA s.9 — no employee charges for PPE required under statutory provisions. Employer pays.",
          ]} />
          <LearningOutcomes outcomes={[
            "State the procedures to remove or minimise risks before deciding PPE is needed (the hierarchy of control).",
            "State the purpose of PPE — protection against residual risk after higher controls applied.",
            "Identify the requirements of PPE Regs 1992 (as amended 2022) — provision, suitability, training.",
            "Recognise the L3 supervisor judgement role in arguing for engineering / administrative controls before PPE.",
            "Identify CE / UKCA marking and EN standards for common PPE items (footwear, RPE, electrical gloves).",
            "Apply HASAWA s.9 — no employee charges for required PPE.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>The hierarchy in detail</ContentEyebrow>
          <ConceptBlock title="Why PPE is the last line" plainEnglish="Higher controls reduce the hazard itself. PPE only protects against residual exposure — and only if the operative wears it correctly every time AND the equipment performs as rated. Either failure removes the protection." onSite="The L3 supervisor judgement starts at the top of the hierarchy: can we eliminate this hazard altogether? Substitute? Engineer it out? Limit exposure administratively? PPE only when the higher options have been genuinely considered.">
            <p>Hierarchy applied across H&amp;S regulations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>COSHH Reg 7</strong> — explicitly requires the hierarchy for substance exposure.</li>
              <li><strong>WaH Regulations 2005 Reg 6</strong> — work avoidance &gt; collective protection &gt; individual protection.</li>
              <li><strong>MHSWR Reg 4 (principles of prevention)</strong> — schedule sets out the same priority order.</li>
              <li><strong>Noise Regs 2005</strong> — eliminate / reduce / engineer / PPE.</li>
              <li><strong>EAWR Reg 4(4)</strong> — PPE last for electrical protection.</li>
              <li><strong>Manual Handling Ops Regs 1992</strong> — avoid &gt; assess &gt; reduce.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The five levels unpacked" plainEnglish="Eliminate = remove the hazard altogether. Substitute = swap for something less hazardous. Engineer = physical / technical changes that reduce exposure. Administer = procedures, training, time limits. PPE = last line." onSite="Document the hierarchy reasoning on the RAMS — for each significant hazard, what was considered at each level and why was the next-level-down chosen.">
            <p>Examples by level:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Eliminate</strong> — change the design so the hazard doesn&apos;t exist (e.g. surface mount instead of chase).</li>
              <li><strong>Substitute</strong> — use less hazardous materials / methods (LV battery tools instead of mains, water-based instead of solvent-based).</li>
              <li><strong>Engineer</strong> — guards, extraction, enclosures, isolation devices, RCDs.</li>
              <li><strong>Administer</strong> — permits, time limits, training, supervision, exclusion zones, signage.</li>
              <li><strong>PPE</strong> — gloves, glasses, RPE, footwear, FR clothing, harness.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Personal Protective Equipment at Work Regulations 1992 — Reg 4(1)" clause={<>"Every employer shall ensure that suitable personal protective equipment is provided to his employees who may be exposed to a risk to their health or safety while at work except where and to the extent that such risk has been adequately controlled by other means which are equally or more effective."</>} meaning={<>The headline duty — provide suitable PPE BUT only where risks aren&apos;t adequately controlled by other means which are equally or more effective. The "other means" wording explicitly cites the hierarchy. Provided = no employee charges (HASAWA s.9). 2022 amendment extended Reg 4 to limb (b) workers.</>} cite="Source: Personal Protective Equipment at Work Regulations 1992 (SI 1992/2966), Reg 4 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />

          <SectionRule />
          <ContentEyebrow>Suitability, maintenance and use</ContentEyebrow>
          <ConceptBlock title="Right kit, right fit, right standard" plainEnglish="Suitable means matched to the hazard, the user, the work environment and the duration. A pair of gardening gloves isn't electrical insulating PPE; a generic dust mask isn't FFP3-rated; safety boots from a hardware shop without EN ISO 20345 marking aren't safety footwear." onSite="L3 supervisor checks: standard markings on every item; condition (no damage, no expiry); fit (especially RPE — face-fit test); training (operative knows correct use, limitations, maintenance); replacement schedule.">
            <p>Standards to know for electrical work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>EN ISO 20345</strong> — safety footwear (S1/S1P/S2/S3 etc).</li>
              <li><strong>EN 397</strong> — industrial safety helmets (general purpose).</li>
              <li><strong>EN 388</strong> — protective gloves (mechanical hazards).</li>
              <li><strong>EN 60903 / IEC 60903</strong> — electrical insulating gloves (Class 0 / 00 / 1 / 2 / 3 / 4 by voltage rating).</li>
              <li><strong>EN 166</strong> — eye protection (impact-rated).</li>
              <li><strong>EN 149</strong> — filtering facepieces (FFP1/FFP2/FFP3).</li>
              <li><strong>EN 50321</strong> — electrical insulating footwear.</li>
              <li><strong>EN 61482</strong> — arc-flash protective clothing.</li>
              <li><strong>EN 361</strong> — full body harnesses (fall arrest).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Face-fit testing for RPE" plainEnglish="Tight-fitting RPE (FFP3 masks, half-masks, full-face) requires a face-fit test to confirm the seal works for the specific user. Beard, face shape and mask model all affect fit. HSE expects fit-test at first issue and on relevant changes (significant weight change, dental work, facial hair)." onSite="A mask that doesn't seal is theatre, not protection. Fit-testing is now standard for routine RPE use; the cost (~£50 per test) is trivial compared to the cost of an exposure incident.">
            <p>Two test methods:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Qualitative</strong> — sweet/bitter taste-test mist; user wears the mask under a hood and reports whether they detect the taste. Suitable for FFP3 disposable masks.</li>
              <li><strong>Quantitative</strong> — instrumented measurement of leak; required for half-masks, full-face, powered respirators.</li>
              <li>Records retained; re-test on changes; fit cards / certs carried.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="HASAWA 1974 — s.9" clause={<>"No employer shall levy or permit to be levied on any employee of his any charge in respect of anything done or provided in pursuance of any specific requirement of the relevant statutory provisions."</>} meaning={<>The no-charge rule. PPE required by statute (which includes most electrical-trade PPE under PPE Regs / EAWR / WaHR / Noise Regs / COSHH) is at the employer&apos;s expense. Apprentices being asked to pay for their kit is unlawful for any required PPE.</>} cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.9 — verbatim from legislation.gov.uk." />

          <RegsCallout source="Control of Substances Hazardous to Health Regulations 2002 — Reg 7(1) and Reg 7(3)" clause={<>"(1) Every employer shall ensure that the exposure of his employees to substances hazardous to health is either prevented or, where this is not reasonably practicable, adequately controlled. (3) Where it is not reasonably practicable to prevent exposure to a substance hazardous to health, the employer shall comply with his duty of control under paragraph (1) by applying protection measures appropriate to the activity and consistent with the risk assessment, including, in order of priority — (a) the design and use of appropriate work processes, systems and engineering controls and the provision and use of suitable work equipment and materials; (b) the control of exposure at source, including adequate ventilation systems and appropriate organisational measures; and (c) where adequate control of exposure cannot be achieved by other means, the provision of suitable personal protective equipment in addition to the measures required by sub-paragraphs (a) and (b)."</>} meaning={<>COSHH Reg 7 is the regulatory home of the hierarchy of control for substance exposure. The order is fixed by law: prevent first, then engineering / process controls, then control at source, then PPE — and PPE only IN ADDITION to higher measures, never instead of them. This is the framework the L3 supervisor leans on when arguing for engineering controls over a PPE-only solution: the law itself says PPE is the last option, not the first.</>} cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 7 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Deeper hierarchy reasoning</ContentEyebrow>
          <ConceptBlock title="Why two layers always beat one" plainEnglish="Engineering controls reduce the hazard at source — less dust generated, less voltage exposed, less weight to lift. PPE protects against the residual. Together they create defence in depth: even if one fails, the other catches the exposure. PPE alone is single-point-of-failure protection." onSite="The L3 argument to the contracts manager: \&quot;the engineering controls aren&apos;t replacing the PPE, they&apos;re reducing the dose. Mask-only is one layer; mask + extraction is two layers. Two layers is what COSHH expects.\&quot;">
            <p>Defence-in-depth examples:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Silica</strong> — extraction (engineering) + FFP3 (PPE) + time limit (administrative).</li>
              <li><strong>Live work</strong> — isolation (eliminate) + insulating mat (engineering) + insulated tools (engineering) + insulating gloves (PPE).</li>
              <li><strong>Working at height</strong> — scaffold guardrail (collective) + harness (PPE) + edge restraint (engineering).</li>
              <li><strong>Noise</strong> — quieter tool (substitute) + sound-absorbing barrier (engineering) + ear defenders (PPE).</li>
              <li><strong>Manual handling</strong> — trolley (engineering) + team lift (administrative) + back support belt (PPE).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Cost vs benefit framing — the contracts manager conversation" plainEnglish="When pushing back on PPE-only proposals, frame the cost in terms the contracts manager understands: claim cost vs control cost; HSE prosecution cost; lost-time injury impact; framework disqualification risk. The engineering controls almost always cost less than ONE failure event." onSite="Real numbers help: an M-class vacuum + extraction adaptor = ~£500 one-off. A silicosis claim = £m+. A LTI day = ~£500-£1000 plus reputation damage. Framing in £ rather than safety alone often wins the conversation.">
            <p>Costs to weigh in the argument:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Engineering control kit (one-off, depreciable).</li>
              <li>Additional time per task (often minimal once routine).</li>
              <li>vs prosecution fines (Sentencing Council Definitive Guideline scales by turnover — £000s to £m+).</li>
              <li>vs civil claim cost (long-tail, can exceed firm value).</li>
              <li>vs LTI / lost work day cost (~£500-£1000 per day per operative).</li>
              <li>vs framework disqualification (lost contracts).</li>
              <li>vs insurance premium uplift after claim history.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="When PPE genuinely IS the only reasonable option" plainEnglish="Sometimes the higher controls aren&apos;t reasonably practicable — short-duration emergency response, very small one-off task, legacy-equipment access where re-engineering would require replacing the system entirely. PPE-only IS sometimes defensible. The L3 supervisor recognises these scenarios but documents WHY higher controls were rejected." onSite="The hierarchy isn&apos;t \&quot;always engineer\&quot;; it&apos;s \&quot;always consider the higher options first and document the reasoning\&quot;. A defensible PPE-only decision has a written record of what was considered above and why it wasn&apos;t reasonably practicable.">
            <p>Defensible PPE-only scenarios:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Emergency response (no time to engineer).</li>
              <li>Very small one-off (minutes of exposure).</li>
              <li>Legacy installation where engineering would require system replacement (cost grossly disproportionate).</li>
              <li>Inspection / observation tasks (no disturbance, exposure is to existing condition).</li>
              <li>Activity where engineering control already engineered out the bulk of exposure (PPE for residual only).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="PPE training — what \&quot;information, instruction and training\&quot; means" plainEnglish="PPE Regs Reg 9 requires the employer to provide adequate information, instruction and training on the PPE — what it&apos;s for, how to use it, its limitations, how to maintain it. Issuing PPE without training is non-compliance." onSite="Training doesn&apos;t need to be a course — for routine items (gloves, glasses) a brief on-issue brief is enough. For complex PPE (RPE with face-fit, harness, electrical insulating gloves) formal training is required and recorded.">
            <p>Training elements per PPE category:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Simple PPE</strong> (gloves, glasses, hi-vis) — brief on-issue (purpose, fit, replacement).</li>
              <li><strong>RPE</strong> — face-fit test + use + maintenance + storage briefing; refresher on type change.</li>
              <li><strong>Harness / fall arrest</strong> — formal training, periodic refresher, donning / doffing practice, anchor selection.</li>
              <li><strong>Electrical insulating gloves</strong> — pre-use inspection method, dielectric test record interpretation, voltage class limits.</li>
              <li><strong>Arc-flash PPE</strong> — donning sequence, ATPV interpretation, layering compatibility, post-event assessment.</li>
              <li>Records of all training retained as competence evidence.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <CommonMistake title="Defaulting to mask-only on routine silica work" whatHappens={<>Operatives chasing brick all day with FFP3 masks but no on-tool extraction, no water suppression. Inspector finds the hierarchy was inverted. COSHH Reg 7 breach; FFI; remedial requirement to introduce engineering controls.</>} doInstead={<>On-tool extraction connected to M-class vacuum AND FFP3 mask AND time-limit. The combination is far more reliable than mask alone.</>} />

          <CommonMistake title="Using personal kit without checking standards" whatHappens={<>Apprentice uses their own &quot;hard hat&quot; from a builders&apos; merchant — turns out to be a leisure helmet, not EN 397 industrial. Falling object causes head injury. PUWER + PPE Regs breach; firm prosecuted; injury could have been prevented by suitable kit.</>} doInstead={<>Verify standard markings on every item. Personal kit may be allowed but must meet the same standards as firm-issued. The L3 supervisor checks before tools come out.</>} />

          <Scenario title="Pushing back on 'just give them masks\'" situation={<>Contracts manager has scoped a week of masonry chasing across multiple domestic properties. The plan as briefed: each operative gets an FFP3 mask. No on-tool extraction, no water suppression, no time limits, no exclusion of customers from the work area during chasing. The estimator argues the engineering controls would &quot;blow the budget&quot;.</>} whatToDo={<>Push back as the L3 supervisor / senior operative on site. Cite COSHH Reg 7 hierarchy explicitly: &quot;mask-only on routine silica work isn&apos;t COSHH-compliant; we need engineering controls&quot;. Specify the kit: M-class vacuum (one per pair of operatives), on-tool extraction adaptor for the chase saw, water suppression where the substrate allows, FFP3 face-fit-tested masks as backup. Time-limit individual sessions. Exclude customers and other persons from the immediate area during chasing. Document the conversation and the outcome in writing. If the contracts manager refuses to provide the kit, escalate to a director and document. ERA s.44 protects you. The engineering kit is not optional and the firm&apos;s defence after a long-term silicosis claim depends on it being in place.</>} whyItMatters={<>Silica is a Group 1 carcinogen. Long-latency disease (silicosis, lung cancer) takes years to manifest but the firm&apos;s defence to a claim 20 years from now depends on the controls in place today. Mask-only is a $20m liability waiting to mature. The engineering kit pays for itself many times over in avoided claims and in inspector confidence.</>} />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from L2 — PPE is the last line. At L3 you argue for the higher controls before defaulting.",
            "Hierarchy: Eliminate → Substitute → Engineer → Administer → PPE. Required by COSHH Reg 7 and broader framework.",
            "PPE Regs 1992 (as amended 2022) — provide suitable PPE only where higher controls inadequate; covers limb (b) workers since 2022.",
            "HASAWA s.9 — no employee charges for required PPE. Employer pays.",
            "Standards matter: EN 397 hat, EN ISO 20345 footwear, EN 60903 electrical gloves, EN 149 RPE, EN 388 mechanical gloves, EN 61482 arc-flash.",
            "Face-fit testing required for tight-fitting RPE. Beard / face shape affect seal. Quantitative for half-mask / full-face.",
            "L3 supervisor verifies suitability, condition, fit, training, replacement schedule. Document supervision.",
            "Document the hierarchy reasoning on RAMS — what was considered at each level and why the next-down was chosen.",
          ]} />
          <Quiz title="PPE hierarchy of control — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section3-1')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">3.1 Risk assessment as a supervisor</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section3-3')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">3.3 PPE selection and verification</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
