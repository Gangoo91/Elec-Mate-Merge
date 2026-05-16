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
  { question: 'Why does Local Exhaust Ventilation (LEV) need 14-monthly testing?', answer: 'COSHH 2002 Reg 9 requires the employer to ensure that any engineering control measure subject to thorough examination and testing is examined and tested at suitable intervals by a competent person — and Schedule 4 specifies 14 months as the maximum interval for most LEV systems. The test verifies that the LEV is still capturing the dust / fume at source rather than just looking like it works. Without the test certificate the LEV cannot be relied upon as a compliance control, regardless of how new the equipment appears.' },
  { question: 'Does using on-tool extraction mean I can stop wearing a mask?', answer: 'No — defence in depth. On-tool extraction reduces airborne dust at source, but residual exposure remains (incomplete capture, dust that escapes the extraction stream, dust that has already settled). FFP3 mask remains the backup layer protecting against the residual. The combination delivers reliable under-WEL exposure; either alone is less reliable.' },
  { question: 'What if engineering controls are genuinely not reasonably practicable for a one-off short-duration task?', answer: 'PPE-only IS sometimes defensible — emergency response, very small one-off tasks, legacy access. The L3 supervisor reflex is to document the reasoning: what was considered at each higher level of the hierarchy, why it was rejected, and what residual risk the PPE-alone arrangement carries. A defensible PPE-only decision has a written record; an indefensible one does not.' },
  { question: 'How does the 2022 amendment to PPE Regs change things for sub-contractors?', answer: 'The Personal Protective Equipment at Work (Amendment) Regulations 2022 extended the duty in Reg 4 to provide suitable PPE to limb (b) workers — those working under arrangements that are not employment contracts but where they are personally performing work for the employer. This catches gig-economy workers, some agency workers, and casual contractors who would previously have fallen outside the duty. For electrical-trade firms employing labour-only operatives, the change is significant — they are now duty-bound to provide PPE to all such workers, not just employees.' },
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
            "Work at Height Regulations 2005 Reg 6 has its own statutory hierarchy — avoid, collective protection, then individual fall protection.",
            "COSHH 2002 Reg 7 + EH40 Workplace Exposure Limits — PPE alone cannot guarantee compliant exposure for many substances; engineering controls are the practical compliance route.",
            "Two layers always beat one — engineering controls + PPE creates defence in depth; PPE alone is single-point-of-failure protection.",
          ]} />
          <LearningOutcomes outcomes={[
            "State the procedures to remove or minimise risks before deciding PPE is needed (the hierarchy of control).",
            "State the purpose of PPE — protection against residual risk after higher controls applied.",
            "Identify the requirements of PPE Regs 1992 (as amended 2022) — provision, suitability, training.",
            "Recognise the L3 supervisor judgement role in arguing for engineering / administrative controls before PPE.",
            "Identify CE / UKCA marking and EN standards for common PPE items (footwear, RPE, electrical gloves).",
            "Apply HASAWA s.9 — no employee charges for required PPE.",
            "Apply COSHH 2002 Reg 7 hierarchy to substance exposure assessments — prevent / engineer / source-control / PPE-in-addition.",
            "Identify EH40/2005 Workplace Exposure Limits relevant to electrical work (silica, hardwood, lead, asbestos, welding fume, solder fume).",
            "Apply Work at Height Regulations 2005 Reg 6 hierarchy — avoid, collective protection, individual fall protection.",
            "Recognise long-latency disease as a driver of hierarchy compliance — the claim that matures in 2045 from today&apos;s exposure.",
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
              <li><strong>Combination</strong> — most jobs need controls at several levels; defence in depth.</li>
              <li><strong>Document the reasoning</strong> — what was considered at each level; why the next-down was chosen.</li>
              <li><strong>Review on near-miss</strong> — a near-miss is evidence the chosen level may not be enough.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Personal Protective Equipment at Work Regulations 1992 — Reg 4(1)" clause={<>"Every employer shall ensure that suitable personal protective equipment is provided to his employees who may be exposed to a risk to their health or safety while at work except where and to the extent that such risk has been adequately controlled by other means which are equally or more effective."</>} meaning={<>The headline duty — provide suitable PPE BUT only where risks aren&apos;t adequately controlled by other means which are equally or more effective. The "other means" wording explicitly cites the hierarchy. Provided = no employee charges (HASAWA s.9). 2022 amendment extended Reg 4 to limb (b) workers.</>} cite="Source: Personal Protective Equipment at Work Regulations 1992 (SI 1992/2966), Reg 4." />

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

          <RegsCallout source="HASAWA 1974 — s.9" clause={<>"No employer shall levy or permit to be levied on any employee of his any charge in respect of anything done or provided in pursuance of any specific requirement of the relevant statutory provisions."</>} meaning={<>The no-charge rule. PPE required by statute (which includes most electrical-trade PPE under PPE Regs / EAWR / WaHR / Noise Regs / COSHH) is at the employer&apos;s expense. Apprentices being asked to pay for their kit is unlawful for any required PPE.</>} cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.9." />

          <RegsCallout source="Control of Substances Hazardous to Health Regulations 2002 — Reg 7(1) and Reg 7(3)" clause={<>"(1) Every employer shall ensure that the exposure of his employees to substances hazardous to health is either prevented or, where this is not reasonably practicable, adequately controlled. (3) Where it is not reasonably practicable to prevent exposure to a substance hazardous to health, the employer shall comply with his duty of control under paragraph (1) by applying protection measures appropriate to the activity and consistent with the risk assessment, including, in order of priority — (a) the design and use of appropriate work processes, systems and engineering controls and the provision and use of suitable work equipment and materials; (b) the control of exposure at source, including adequate ventilation systems and appropriate organisational measures; and (c) where adequate control of exposure cannot be achieved by other means, the provision of suitable personal protective equipment in addition to the measures required by sub-paragraphs (a) and (b)."</>} meaning={<>COSHH Reg 7 is the regulatory home of the hierarchy of control for substance exposure. The order is fixed by law: prevent first, then engineering / process controls, then control at source, then PPE — and PPE only IN ADDITION to higher measures, never instead of them. This is the framework the L3 supervisor leans on when arguing for engineering controls over a PPE-only solution: the law itself says PPE is the last option, not the first.</>} cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 7." />

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
          <ContentEyebrow>Work at Height — the hierarchy in WaHR 2005 Reg 6</ContentEyebrow>

          <ConceptBlock
            title="Why working at height has its own statutory hierarchy"
            plainEnglish="The Work at Height Regulations 2005 codify the hierarchy specifically for height work. Reg 6 sets it out: avoid working at height where reasonably practicable; where unavoidable, use work equipment to prevent falls; where the risk of a fall remains, use equipment to minimise the distance and consequences of a fall. PPE (harness) is the bottom of the WaHR hierarchy just as it is the bottom of the general hierarchy."
            onSite="Most domestic and commercial electrical work involves some height work — loft cabling, ceiling pendant installation, external lighting, distribution at high level. The L3 supervisor reflex on every height-work task: have we considered ground-level alternatives? Collective protection (scaffold guardrail) before individual (harness)? Restraint before fall arrest? Many firms default to ladder + concentration; that&apos;s rarely the right WaHR Reg 6 answer."
          >
            <p>The WaHR 2005 Reg 6 hierarchy for height work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Avoid working at height altogether</strong> — bring the work to
                ground level where possible (pre-assemble on the floor, raise complete).
              </li>
              <li>
                <strong>Use existing places of work</strong> — permanent platforms, mezzanines,
                walkways with guardrails.
              </li>
              <li>
                <strong>Provide work equipment to prevent falls</strong> — scaffold with
                guardrails, MEWP (mobile elevating work platform), tower scaffold.
              </li>
              <li>
                <strong>Restraint systems</strong> — anchor + lanyard set short enough to
                prevent reaching the edge.
              </li>
              <li>
                <strong>Work positioning</strong> — anchor + lanyard supporting the user at a
                work face.
              </li>
              <li>
                <strong>Fall arrest</strong> — anchor + lanyard + energy absorber + full body
                harness; user can fall but is caught with controlled energy.
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
                &quot;Where work is carried out at height, every employer shall take suitable
                and sufficient measures to prevent, so far as is reasonably practicable, any
                person falling a distance liable to cause personal injury.&quot;
              </>
            }
            meaning={
              <>
                The WaHR 2005 prevention duty. &quot;Distance liable to cause personal
                injury&quot; is not a fixed height — courts have found that injury can
                result from falls of less than a metre. The duty is to prevent the fall by
                measures higher in the hierarchy before resorting to fall arrest. Schedule 3
                of the Regulations sets out the requirements for personal fall protection
                systems including the anchor, the system selection, and operator
                competence.
              </>
            }
            cite="Source: Work at Height Regulations 2005 (SI 2005/735), Reg 6."
          />

          <SectionRule />
          <ContentEyebrow>COSHH workplace exposure limits — the dose-response framework</ContentEyebrow>

          <ConceptBlock
            title="WELs and why &apos;just give them masks&apos; usually fails the maths"
            plainEnglish="COSHH 2002 Reg 7(7) requires exposure to substances assigned a Workplace Exposure Limit (WEL) to be reduced so far as is reasonably practicable below the WEL. The list is published in EH40/2005 (updated periodically). For respirable crystalline silica the WEL is 0.1 mg/m³ (8-hour TWA). Routine masonry chasing without engineering controls easily generates dust concentrations well above this. PPE alone cannot guarantee under-WEL exposure because mask efficacy depends on fit, wear-time and respiration rate — engineering controls are the only reliable route to repeatable under-WEL exposure."
            onSite="L3 reading: when arguing for engineering controls, citing the WEL gives the conversation a concrete number. &apos;The WEL is 0.1 mg/m³; the dust monitor reads above that during chasing without extraction; masks rated APF 20 might bring residual exposure under the WEL IF they&apos;re worn correctly 100% of the time, which we can&apos;t guarantee — so the route to compliant exposure is engineering controls, not PPE alone.&apos;"
          >
            <p>Common electrical-trade WELs (EH40/2005):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Respirable crystalline silica</strong> — 0.1 mg/m³ (8h TWA).
                Generated by chasing, drilling brick / concrete / mortar.
              </li>
              <li>
                <strong>Hardwood dust</strong> — 3 mg/m³ (8h TWA). Generated by joinery,
                fitting kitchen units.
              </li>
              <li>
                <strong>Softwood dust</strong> — 5 mg/m³ (8h TWA).
              </li>
              <li>
                <strong>Lead, inorganic, dust and fume</strong> — 0.15 mg/m³ (8h TWA).
                Older paints / coatings on metalwork.
              </li>
              <li>
                <strong>Asbestos</strong> — 0.1 fibres/cm³ (control limit). Higher
                regulatory status under CAR 2012; not a standard WEL.
              </li>
              <li>
                <strong>Solvents (white spirit, IPA, MEK)</strong> — sector-specific WELs,
                often relevant for cleaners and adhesives.
              </li>
              <li>
                <strong>Welding fume</strong> — reclassified by HSE 2019 as carcinogen;
                LEV mandatory for any indoor welding regardless of duration.
              </li>
              <li>
                <strong>Soldering fume (rosin)</strong> — 0.05 mg/m³ (8h TWA); LEV
                recommended for routine work.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Pushing back on the &apos;use FFP3 only&apos; survey assumption"
            situation={
              <>
                The project surveyor has scoped a week of routine chasing in an occupied
                office building for cable routing. The proposed control measures listed on
                the RAMS are: FFP3 masks for the operatives, &quot;normal cleaning&quot;
                at the end of each day. No on-tool extraction, no water suppression, no
                M-class vacuum, no exclusion of office staff from the work area during
                chasing. The surveyor argues this is &quot;standard for chasing in
                occupied premises&quot; and that bringing in extraction kit would slow the
                programme. The customer is the office landlord who has insisted that
                office operations continue during the work.
              </>
            }
            whatToDo={
              <>
                Refuse to accept the RAMS as adequate. COSHH Reg 7 hierarchy is explicit:
                prevent or engineer first, PPE in addition. Specify the changes needed:
                M-class vacuum on-tool extraction connected to the chase saw and to any
                hammer drilling; water suppression where the substrate allows; FFP3 masks
                face-fit tested as backup layer; exclusion of office staff from the
                immediate work area during chasing (signage and a temporary barrier
                arrangement); thorough vacuuming (not sweeping) at end of work session;
                end-of-week deep clean. Document the proposed change in writing to the
                surveyor and contracts manager. If the surveyor still resists, escalate
                to the director. ERA s.44 protects the position. The customer&apos;s
                preference for continued office operations does not override the COSHH
                duty owed to operatives and to the office staff (s.3 non-employees).
              </>
            }
            whyItMatters={
              <>
                Marshalls Mono &pound;700k (2018) is the case in the inspector&apos;s mind
                when they see mask-only silica work. The L3 supervisor pushing back at
                the survey stage is far more effective than discovering the inadequacy
                during a site inspection. Office occupants are non-employees whose s.3
                duty extends across the work — they are part of the population at risk
                in the COSHH assessment, not bystanders to be ignored. The engineering
                kit pays for itself in avoided long-tail claims and inspector confidence.
              </>
            }
          />

          <SectionRule />
          <ContentEyebrow>Welding fume reclassification (HSE 2019) and the new LEV expectation</ContentEyebrow>

          <ConceptBlock
            title="Why the IARC carcinogen reclassification of welding fume changed the practical compliance picture"
            plainEnglish="In 2017 the International Agency for Research on Cancer (IARC) classified welding fume as a Group 1 carcinogen (definite human carcinogen) based on accumulated evidence of lung cancer risk. The HSE responded in 2019 with revised enforcement expectations: indoor welding regardless of duration now requires effective Local Exhaust Ventilation (LEV); RPE alone is no longer accepted as adequate control for routine indoor welding; the same expectations extend to weld-adjacent operations that generate metal fume. The change affected many trades that had previously treated welding as a minor incidental activity — mounting brackets, fixing supports, fabricating small steel components on site. The L3 supervisor managing any indoor welding activity now needs to either source portable LEV, restrict the activity to outdoors, or document why neither is reasonably practicable and what compensating controls apply."
            onSite="Practical at L3 if welding is part of the work: bring portable LEV (welding fume extraction kit) to site for any indoor work; even short-duration welds in confined or poorly-ventilated spaces are caught by the expectation. RPE remains a backup layer not a substitute. Where welding cannot be brought outside and LEV cannot be deployed, the L3 supervisor reflex is to push the work to a different method (mechanical fixings instead of welded brackets) rather than treating the situation as &apos;PPE-only because we have to&apos;."
          >
            <p>What the HSE 2019 reclassification means in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Indoor welding</strong> — any duration, any process, requires effective
                LEV. Portable units are available; specification depends on process.
              </li>
              <li>
                <strong>Outdoor welding</strong> — dispersal generally adequate but RPE still
                expected for prolonged work or where dispersal is limited (e.g. inside a
                container, behind a hoarding).
              </li>
              <li>
                <strong>Stainless steel and galvanised steel</strong> — higher-risk fume
                profiles (chromium, nickel, zinc); enhanced controls expected.
              </li>
              <li>
                <strong>Substitution where possible</strong> — mechanical fixing instead of
                welding; pre-fabricated components instead of on-site weld.
              </li>
              <li>
                <strong>Operative training</strong> — competence in fume control as well
                as welding technique; understanding of plume direction, capture range,
                booth use.
              </li>
              <li>
                <strong>Health surveillance</strong> — long-latency cancer risk means
                respiratory health surveillance is increasingly expected for routine
                welders.
              </li>
              <li>
                <strong>Inspector focus</strong> — welding has been a priority area for
                HSE inspection campaigns since 2019; firms found relying on PPE alone
                are routinely served improvement notices.
              </li>
              <li>
                <strong>RIDDOR implications</strong> — occupational lung cancer
                attributable to welding fume exposure is reportable under Schedule 3.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Case study — R v Marshalls Mono Ltd [2018] and the cost of mask-only silica</ContentEyebrow>

          <ConceptBlock
            title="A £700k fine for letting workers chase brick with PPE alone"
            plainEnglish="Marshalls Mono Ltd was fined £700,000 at Bradford Crown Court in 2018 after several employees were diagnosed with silicosis following years of exposure to respirable crystalline silica during stone-cutting operations at the firm&apos;s Yorkshire works. The HSE&apos;s investigation found that the firm had relied on dust masks as the principal control for silica exposure rather than implementing engineering controls such as wet-cutting, local exhaust ventilation or on-tool extraction. The Sentencing Council guideline placed the breach in the &apos;high culpability&apos; band because the hierarchy of control was clearly inverted across the operation and the firm had been aware of the silica risk through industry guidance for many years. Several operatives suffered life-shortening disease as a direct consequence."
            onSite="The L3 reading: long-latency disease is the trap that catches firms decades after the exposure. The operatives diagnosed in 2018 had been exposed in the early 2000s. The firm&apos;s defence rested entirely on whether they had applied the hierarchy of control properly during that period — and the answer was no. PPE alone, even FFP3-rated, does not deliver compliant exposure for routine silica work; engineering controls do. The next claim under similar facts is being created today by firms that continue the practice. This is one of the most-prosecuted patterns in UK industry."
          >
            <p>What the Marshalls case teaches about long-latency disease and PPE-only:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Silica is a Group 1 carcinogen</strong> (IARC classification) — its
                hazardous status was well established when the original exposure occurred.
              </li>
              <li>
                <strong>FFP3 masks are not sufficient alone</strong> — assigned protection
                factor 20 means a 5% leakage rate even when worn correctly; routine
                exposure above the WEL cannot be brought reliably below the WEL by mask
                alone.
              </li>
              <li>
                <strong>The firm&apos;s defence depends on contemporaneous records</strong> —
                if the only evidence available decades later is &quot;we issued masks&quot;
                that is rarely enough to discharge the SFAIRP burden.
              </li>
              <li>
                <strong>Long-latency disease claims are extremely costly</strong> —
                individual claims for silicosis or mesothelioma can run to hundreds of
                thousands of pounds; aggregate claims across a workforce can exceed firm
                value.
              </li>
              <li>
                <strong>The HSE has prioritised silica enforcement</strong> — sector
                campaigns have targeted construction, stone-cutting and electrical
                trades where chasing is routine.
              </li>
              <li>
                <strong>Engineering controls now cost relatively little</strong> — M-class
                vacuums, on-tool extraction adaptors and water suppression are commercially
                available at modest one-off cost compared to the claims they prevent.
              </li>
              <li>
                <strong>The L3 supervisor argument</strong> in 2025 is the same as the
                argument that should have been made in 2005 — engineering controls before
                PPE, not instead of PPE but with PPE as the backup layer.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Step-by-step procedure — running a COSHH assessment for a chasing operation</ContentEyebrow>

          <ConceptBlock
            title="A worked COSHH Reg 6 + Reg 7 assessment for routine masonry chasing"
            plainEnglish="COSHH Reg 6 requires a suitable and sufficient assessment of the risks created by work involving substances hazardous to health, AND of the steps that need to be taken to comply with COSHH. Reg 7 then sets out the hierarchy. The L3 supervisor walking through this for a typical chasing job: identify substance, identify exposure route, identify population at risk, identify existing controls, evaluate residual exposure against WEL, select additional controls per the hierarchy, document. The framework is the same as MHSWR Reg 3 but with the substance-exposure focus that COSHH adds."
            onSite="The procedure feels formal but the steps are quick once practised. On a familiar chasing job the experienced L3 supervisor runs the COSHH steps in their head in 60 seconds; the written record may be a section of the RAMS or a short standalone document. The point is not to write War and Peace — the point is to demonstrate that the substance hazard has been engaged with explicitly."
          >
            <p>Step-by-step COSHH assessment for masonry chasing:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify the substance</strong> — respirable crystalline silica
                from brick / concrete / mortar / plaster substrate.
              </li>
              <li>
                <strong>Identify the exposure route</strong> — inhalation of respirable
                dust generated by cutting / drilling / breaking; airborne particles
                &lt;10&micro;m reach deep lung tissue.
              </li>
              <li>
                <strong>Identify the WEL</strong> — 0.1 mg/m³ (8-hour TWA) for respirable
                crystalline silica per EH40/2005.
              </li>
              <li>
                <strong>Identify the population at risk</strong> — the operative doing the
                chasing; other operatives nearby; customer / occupants of adjoining
                spaces if dust drifts; cleaners working after the job.
              </li>
              <li>
                <strong>Identify existing controls</strong> — what is currently being
                proposed? FFP3 masks alone? Mask plus extraction? Wet-cut? Time-limit?
                Exclusion of others?
              </li>
              <li>
                <strong>Evaluate residual exposure</strong> — would the controls reliably
                bring exposure below the WEL? With realistic mask compliance and seal
                quality, can the firm demonstrate under-WEL exposure?
              </li>
              <li>
                <strong>Select additional controls per the hierarchy</strong> — eliminate
                (avoid chasing — surface mount in trunking); substitute (different fixing
                method); engineer (on-tool extraction, water suppression, M-class vacuum);
                administer (time-limit, exclusion); PPE (FFP3 with face-fit).
              </li>
              <li>
                <strong>Document the assessment</strong> — substance, WEL, controls
                selected, hierarchy reasoning, residual risk evaluation, named operatives
                briefed.
              </li>
              <li>
                <strong>Brief the operatives</strong> — what controls are in place, why,
                what to do if controls fail.
              </li>
              <li>
                <strong>Review on change</strong> — different substrate, different tool,
                different operative, near-miss occurring.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Cross-reference table — hierarchy across the H&amp;S regulations</ContentEyebrow>

          <ConceptBlock
            title="The same hierarchy appearing in different regulatory homes"
            plainEnglish="The hierarchy of control is not a COSHH peculiarity — it appears in nearly every modern H&amp;S regulation in some form. The wording varies but the structure is consistent: avoid the hazard, reduce at source, then engineering / collective protection, then administrative measures, then PPE / individual protection. The L3 supervisor literate in the hierarchy can cite the relevant regulation for whatever hazard the conversation is about."
            onSite="When pushing back on a PPE-only proposal, citing the specific regulation that requires the hierarchy is more powerful than citing the general principle. &quot;COSHH Reg 7 explicitly puts PPE last for substance exposure&quot; lands differently from &quot;hierarchy of control says PPE is last&quot;. Different inspector, same answer."
          >
            <p>Hierarchy in different regulations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>COSHH 2002 Reg 7</strong> — substance exposure. Prevent first;
                control by engineering / process; control at source; PPE in addition.
              </li>
              <li>
                <strong>MHSWR 1999 Reg 4 + Schedule 1</strong> — general principles of
                prevention. Avoid, evaluate, combat at source, adapt, technical progress,
                replace, coherent policy, collective over individual, instructions.
              </li>
              <li>
                <strong>Work at Height Regulations 2005 Reg 6</strong> — avoid working at
                height, then use work equipment to prevent falls, then equipment to
                minimise distance and consequences.
              </li>
              <li>
                <strong>Manual Handling Operations Regs 1992 Reg 4</strong> — avoid
                hazardous manual handling, then assess, then reduce risk.
              </li>
              <li>
                <strong>Control of Noise at Work Regs 2005 Reg 6</strong> — eliminate at
                source, then reduce, then PPE.
              </li>
              <li>
                <strong>Control of Vibration at Work Regs 2005 Reg 6</strong> — eliminate
                or reduce; PPE not effective for vibration (no equivalent of mask) so
                engineering and administrative controls dominate.
              </li>
              <li>
                <strong>EAWR 1989 Reg 4 / Reg 14</strong> — design out the electrical
                hazard (Reg 4); dead working preferred over live (Reg 14); PPE last line.
              </li>
              <li>
                <strong>Control of Asbestos Regs 2012 Reg 11</strong> — avoid disturbance;
                prevent or reduce exposure; PPE / RPE in addition.
              </li>
              <li>
                <strong>Confined Spaces Regs 1997 Reg 4</strong> — avoid entry where
                reasonably practicable; safe system; emergency arrangements.
              </li>
              <li>
                <strong>CDM 2015 Reg 9</strong> — designer&apos;s duty to eliminate
                foreseeable risks at the design stage; the hierarchy starts in the
                design office, not on site.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Hand-Arm Vibration Syndrome and the limits of PPE for vibration</ContentEyebrow>

          <ConceptBlock
            title="When PPE genuinely cannot solve the problem"
            plainEnglish="Vibration is the hazard where the hierarchy is most obviously needed: there is no effective PPE for hand-arm vibration. Anti-vibration gloves exist but provide minimal real-world protection at the frequencies that cause HAVS. Reducing exposure means lower-vibration tools, shorter exposure times, job rotation, regular health surveillance. The Control of Vibration at Work Regulations 2005 set exposure limits (Exposure Action Value 2.5 m/s²A(8); Exposure Limit Value 5.0 m/s²A(8)) measured as 8-hour daily exposure. The L3 supervisor managing chasing / breaking / impact wrench work must work the engineering and administrative controls because PPE is not an option."
            onSite="Practical at L3: tool selection (lower-vibration tools where available, manufacturer&apos;s declared vibration value), job rotation (operative does chasing for max 1 hour then switches to a non-vibrating task), trigger-time tracking (firm&apos;s vibration calculator using tool emission data and trigger time), health surveillance (regular HAVS questionnaires + Tier 3 medical screening where indicated). Cases of HAVS in the electrical trade are routine — preventable but persistent because the engineering and administrative controls are treated as optional."
          >
            <p>HAVS management at L3:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tool selection</strong> — manufacturer-declared vibration value
                consulted before purchase; lower-vibration alternatives preferred.
              </li>
              <li>
                <strong>Job rotation</strong> — same operative on the same vibrating tool
                for limited periods; rotation to non-vibrating tasks.
              </li>
              <li>
                <strong>Trigger-time tracking</strong> — recording actual tool-on time, not
                just task duration; vibration exposure calculator using tool emission data.
              </li>
              <li>
                <strong>EAV / ELV awareness</strong> — operatives know their daily
                exposure target; the firm tracks per-operative cumulative exposure.
              </li>
              <li>
                <strong>Health surveillance</strong> — Tier 1 questionnaire annually;
                Tier 2 nurse-led screening if symptoms; Tier 3 medical screening for
                confirmed cases.
              </li>
              <li>
                <strong>Reporting</strong> — HAVS confirmed diagnosis is RIDDOR-reportable
                under Schedule 3.
              </li>
              <li>
                <strong>Anti-vibration gloves</strong> — limited real-world protection;
                may help with grip and cold but should not be treated as control of
                vibration exposure.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Inspector visit walkthrough — the COSHH file the inspector asks for</ContentEyebrow>

          <ConceptBlock
            title="What documents the HSE inspector requests on a substance-exposure inspection"
            plainEnglish="HSE inspections that focus on substance exposure (silica, asbestos, welding fume, solvents) follow a fairly predictable document-request pattern. The inspector arrives, identifies themselves, asks for the responsible person, then requests the COSHH file. The file should contain: the substance inventory; the COSHH assessments per activity; the WEL benchmarking; the engineering control inventory (LEV / extraction / wet-cut); the maintenance records for the engineering controls (LEV must be tested every 14 months by a competent person under Reg 9); the PPE register; the training records; the health surveillance records; the records of any exposure monitoring carried out."
            onSite="The L3 supervisor reflex on receiving notice of a COSHH-focused HSE visit: ensure the file is producible, current, and matches what is actually happening on site. The biggest failures are not the absence of the file but the gap between what the file says and what the operatives are actually doing — RAMS say wet-cut, operatives are dry-cutting; PPE register says fit-tested FFP3, operatives are wearing single-use disposable; LEV record shows annual test, last test was 18 months ago. Inspectors find these gaps in the first hour."
          >
            <p>The COSHH file the inspector typically requests:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Substance inventory</strong> — what hazardous substances does the
                firm use or generate? SDS for each.
              </li>
              <li>
                <strong>COSHH assessments per activity</strong> — Reg 6 documents for each
                substance / activity combination.
              </li>
              <li>
                <strong>WEL benchmarking</strong> — current EH40/2005 limits referenced;
                exposure assessment (calculated or measured).
              </li>
              <li>
                <strong>Engineering control inventory</strong> — LEV systems, wet-cut
                equipment, on-tool extraction, M-class vacuums.
              </li>
              <li>
                <strong>LEV examination records</strong> — Reg 9 thorough examination and
                test every 14 months by a competent person; certificates retained.
              </li>
              <li>
                <strong>PPE register</strong> — what items are issued, to whom, when,
                replacement schedule, fit-test certs.
              </li>
              <li>
                <strong>Training records</strong> — Reg 12 information, instruction and
                training; what was delivered, when, attendance signatures.
              </li>
              <li>
                <strong>Health surveillance records</strong> — Reg 11 where applicable
                (e.g. silica, asbestos exposure populations).
              </li>
              <li>
                <strong>Exposure monitoring records</strong> — Reg 10 measurements where
                carried out; trend analysis.
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
          <KeyTakeaways points={[
            "Remember from L2 — PPE is the last line. At L3 you argue for the higher controls before defaulting.",
            "Hierarchy: Eliminate → Substitute → Engineer → Administer → PPE. Required by COSHH Reg 7 and broader framework.",
            "PPE Regs 1992 (as amended 2022) — provide suitable PPE only where higher controls inadequate; covers limb (b) workers since 2022.",
            "HASAWA s.9 — no employee charges for required PPE. Employer pays.",
            "Standards matter: EN 397 hat, EN ISO 20345 footwear, EN 60903 electrical gloves, EN 149 RPE, EN 388 mechanical gloves, EN 61482 arc-flash.",
            "Face-fit testing required for tight-fitting RPE. Beard / face shape affect seal. Quantitative for half-mask / full-face.",
            "L3 supervisor verifies suitability, condition, fit, training, replacement schedule. Document supervision.",
            "Document the hierarchy reasoning on RAMS — what was considered at each level and why the next-down was chosen.",
            "Marshalls Mono £700k (2018) — mask-only on silica is the most-prosecuted hierarchy inversion in the trade.",
            "COSHH 2002 Reg 9 — LEV requires thorough examination and test every 14 months by a competent person. Without the cert, the LEV isn&apos;t a compliance control.",
            "WaHR 2005 Reg 6 — separate statutory hierarchy for height work. Avoid first; collective protection before individual.",
            "Vibration is the hazard with no effective PPE — engineering and administrative controls dominate; health surveillance the safety net.",
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
