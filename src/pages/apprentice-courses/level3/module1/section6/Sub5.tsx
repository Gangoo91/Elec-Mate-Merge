/**
 * Module 1 · Section 6 · Subsection 5 - Confined Spaces 1997: supervisor view
 * Maps to C&G 2365-03 / Unit 201 — supplementary depth (beyond AC framework)
 * Layered depth from 2357 Unit 601 ELTK01
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Confined Spaces 1997 - supervisor view | Level 3 Module 1.6.5 | Elec-Mate';
const DESCRIPTION = 'L3 supervisor view of Confined Spaces Regulations 1997 - permit regime, atmosphere monitoring, rescue planning and the supervisor judgement.';

const checks = [
  { id: 'l3-m1-s6-sub5-define', question: 'When is a space a "confined space" under the Regs?', options: ['Always small.', 'Substantially enclosed AND foreseeable specified risk - fire/explosion, asphyxiation (oxygen deficiency or harmful atmosphere), drowning, hyperthermia, entrapment with serious injury. Both conditions required.', 'Always small enclosed.', 'Only tanks.'], correctIndex: 1, explanation: 'Two conditions: enclosed AND specified risk. Not all small spaces; not all enclosed spaces.' },
  { id: 'l3-m1-s6-sub5-rescue', question: 'Who provides rescue from a confined space?', options: ['999.', 'Pre-arranged rescue plan - typically standby person + equipment + comms + trained rescuers. NOT 999 (response too slow). The rescue plan is the entrant\'s pre-condition for entry; without it, no entry.', 'Random.', 'Customer.'], correctIndex: 1, explanation: 'Rescue planning is critical. 999 response is too slow for confined-space emergencies (asphyxiation timescales are seconds-to-minutes).' },
  { id: 'l3-m1-s6-sub5-permit', question: 'When does a permit-to-work apply for confined spaces?', options: ['Never.', 'For most confined-space entry with significant risk - permits formalise the SSoW, define the work, the controls, the personnel authorised, the time period, the rescue plan, the sign-off conditions. Mandatory in many sectors; best practice elsewhere.', 'Customer choice.', 'Random.'], correctIndex: 1, explanation: 'Permits formalise confined-space SSoW. Used routinely in higher-risk industries; appropriate for many electrical confined-space jobs.' },
];

const quizQuestions = [
  { id: 1, question: 'What does Confined Spaces Regs 1997 Reg 4 require?', options: ['No requirement.', 'No person shall enter a confined space to carry out work for any purpose unless it is not reasonably practicable to achieve that purpose without such entry. Avoidance is the principle; entry is the exception.', 'Easy entry.', 'Random.'], correctAnswer: 1, explanation: 'Avoidance principle is absolute under Reg 4(1). Entry only when not reasonably practicable to avoid.' },
  { id: 2, question: 'What\'s the safe system of work for confined-space entry?', options: ['Just careful.', 'Risk assessment + permit + atmosphere monitoring (oxygen, flammable, toxic) before AND during entry + standby person outside in communication + rescue plan + appropriate PPE + training + emergency procedures.', 'Random.', 'Customer-led.'], correctAnswer: 1, explanation: 'Comprehensive SSoW. Reg 4(2) + Reg 5 in operation.' },
  { id: 3, question: 'What gases are commonly tested for in confined-space atmosphere monitoring?', options: ['Just air.', 'Oxygen (deficiency below 19.5%; enrichment above 23.5%); flammable gases (LEL); toxic gases - typically H2S, CO, sometimes others depending on space history.', 'Just CO2.', 'Random.'], correctAnswer: 1, explanation: 'Multi-gas monitoring is standard. Pre-entry plus continuous during entry.' },
  { id: 4, question: 'Why is 999 inappropriate for confined-space rescue?', options: ['It\'s fine.', 'Response time too slow. Asphyxiation can cause unconsciousness in 30 seconds and death in minutes. Pre-positioned rescue plan with standby person + equipment is essential. Fire and Rescue may attend but cannot be the primary rescue route.', 'Random.', 'Customer choice.'], correctAnswer: 1, explanation: 'Rescue must be immediate. Pre-arranged rescue is essential.' },
  { id: 5, question: 'What\'s the standby person\'s role?', options: ['Just standing.', 'Stays outside the space; maintains communication with entrant; monitors entrant condition; initiates rescue if entrant becomes unresponsive or atmosphere deteriorates; cannot enter the space themselves (risk of becoming second casualty).', 'Random.', 'Helps lift.'], correctAnswer: 1, explanation: 'Standby = comms + monitoring + rescue initiation. NEVER enters the space themselves (would just become a second casualty).' },
  { id: 6, question: 'What are common confined spaces in electrical work?', options: ['None.', 'Underfloor voids (some); plant rooms with limited ventilation; lift shafts; ductwork; basement / cellar in some cases; switchroom in industrial settings; tank work for instrumentation; manholes for cable jointing.', 'Just kitchens.', 'Random.'], correctAnswer: 1, explanation: 'Confined spaces in electrical work are not common but real. Industrial / commercial more than domestic.' },
  { id: 7, question: 'What training is required for confined-space work?', options: ['None.', 'Confined Space Awareness (low-risk) up to specialist training (high-risk - typically City & Guilds 6160 or equivalent). Trained operatives + trained rescuers + trained issuing authority for permits. Refresher training periodic.', 'Customer brief.', 'Random.'], correctAnswer: 1, explanation: 'Multi-level training. Awareness for occasional low-risk; specialist for routine / high-risk work.' },
  { id: 8, question: 'What\'s the L3 supervisor\'s judgement on a borderline confined space?', options: ['Always enter.', 'Treat as confined space until proven otherwise. If unsure whether the foreseeable specified risk applies, escalate to specialist. The cost of treating-as-confined is small (extra controls); the cost of not treating-as-confined when warranted is potentially fatal.', 'Random.', 'Customer choice.'], correctAnswer: 1, explanation: 'Default to treating as confined; the consequences of mis-classification are severe.' },
];

const faqs = [
  { question: 'Are domestic lofts confined spaces?', answer: 'Most aren\'t under the Regs definition - access tight but no foreseeable specified risk. But hot loft in summer + poor ventilation can create hyperthermia risk - the Regs may then apply. Assess each loft.' },
  { question: 'What about cellars?', answer: 'Some cellars are confined spaces - poor ventilation + risk of damp / mould / radon / methane in some areas. Assess each cellar; the foreseeable specified risk test is the determinant.' },
  { question: 'Can I enter a confined space alone?', answer: 'Almost never. Standby person outside is fundamental control. Solo entry only in very specific low-risk cases with specific risk assessment supporting it.' },
  { question: 'What\'s a "calibrated multi-gas detector"?', answer: 'Portable instrument measuring oxygen, flammable (LEL), and one or more toxic gases (H2S, CO commonly). Calibrated periodically (typically 6-monthly bump test + annual calibration). Worn during entry.' },
  { question: 'How does the L3 know if an emerging confined space is in scope?', answer: 'Apply the test: substantially enclosed? Yes/no. Foreseeable specified risk? (Fire / asphyxiation / drowning / hyperthermia / entrapment with injury). Yes/no. If both yes, Confined Spaces Regs apply.' },
  { question: 'What if the customer dismisses confined-space concerns?', answer: 'Customer dismissal doesn\'t change the regulatory framework. Confined Spaces Regs 1997 apply objectively. The L3 escalates to firm; firm decides commercial response. ERA s.44 protects refusal.' },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section6')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 6</button>
          <PageHero eyebrow="Module 1 · Section 6 · Subsection 5" title="Confined Spaces 1997 - supervisor view" description="Remember from Section 4.4 - confined spaces have specific regulation. Here we go deeper on the SSoW, atmosphere monitoring, rescue planning and the L3 supervisor judgement." tone="emerald" />
          <TLDR points={[
            "Confined space = substantially enclosed AND foreseeable specified risk (fire/asphyxiation/drowning/hyperthermia/entrapment).",
            "Reg 4 - avoid entry where reasonably practicable. Entry only when necessary and via SSoW including permit + atmosphere monitoring + rescue plan + standby person.",
            "Rescue must be PRE-ARRANGED - 999 too slow. Standby person stays outside in communication; never enters.",
          ]} />
          <LearningOutcomes outcomes={[
            "Apply the confined-space definition (enclosure + specified risk).",
            "State the Reg 4 avoidance principle.",
            "Identify the SSoW elements - permit, atmosphere monitoring, standby person, rescue plan, training.",
            "Recognise atmosphere monitoring requirements (O2, LEL, toxic).",
            "Apply the rescue planning principle (pre-arranged, not 999).",
            "Apply the L3 supervisor judgement on borderline cases (treat as confined until proven otherwise).",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Definition and avoidance principle</ContentEyebrow>
          <ConceptBlock title="The two-part test" plainEnglish="Confined space requires BOTH (a) substantial enclosure AND (b) foreseeable specified risk. Specified risks: fire/explosion, asphyxiation (oxygen deficiency or harmful atmosphere), drowning (free-flowing solid/liquid), hyperthermia, entrapment with serious injury. Both conditions must apply." onSite="The L3 supervisor checks both. A small enclosed space with no specified risk = not confined. A larger space with specified risk = confined. Use the test, not intuition.">
            <p>Common electrical-trade confined-space candidates:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Underfloor voids - sometimes (depending on access + ventilation).</li>
              <li>Plant rooms with limited ventilation.</li>
              <li>Lift shafts.</li>
              <li>Ductwork and risers.</li>
              <li>Manholes for cable jointing.</li>
              <li>Tanks and vessels (instrumentation work).</li>
              <li>Some basements / cellars (poor ventilation, possible gas accumulation).</li>
              <li>Some lofts (summer hyperthermia risk).</li>
              <li>Industrial silos / hoppers (instrumentation).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Confined Spaces Regulations 1997 - Reg 4(1)" clause={<>"No person at work shall enter a confined space to carry out work for any purpose unless it is not reasonably practicable to achieve that purpose without such entry."</>} meaning={<>The avoidance principle is fundamental. Entry is the exception, not the default. Reg 4(2) requires safe system of work where entry is necessary; Reg 5 requires emergency arrangements (rescue plan).</>} cite="Source: Confined Spaces Regulations 1997 (SI 1997/1713), Reg 4 - verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>The safe system of work</ContentEyebrow>
          <ConceptBlock title="What entry actually requires" plainEnglish="Risk assessment + permit-to-work + atmosphere monitoring (pre-entry and continuous) + standby person outside in communication + rescue plan with equipment + appropriate PPE + trained personnel + emergency procedures. Comprehensive SSoW." onSite="Most general electrical contractors don't maintain confined-space capability for routine work. Specialist contractors handle the work. The L3 supervisor recognises confined-space context and escalates rather than improvises.">
            <p>SSoW elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Risk assessment</strong> - identifies specific hazards, controls, emergency procedures.</li>
              <li><strong>Permit-to-work</strong> - written authorisation, defined scope and time, sign-on/sign-off.</li>
              <li><strong>Atmosphere monitoring</strong> - calibrated multi-gas detector, oxygen + LEL + toxic; pre-entry and continuous.</li>
              <li><strong>Standby person</strong> - outside the space, in communication, monitoring entrant condition, initiates rescue. Never enters.</li>
              <li><strong>Rescue plan</strong> - pre-arranged with equipment (harness + retrieval line, breathing apparatus); trained rescuers; communication.</li>
              <li><strong>PPE</strong> - per the hazards (appropriate RPE, harness, intrinsically safe equipment for flammable atmospheres).</li>
              <li><strong>Training</strong> - awareness through specialist depending on risk.</li>
              <li><strong>Communication</strong> - reliable two-way (radio, line, voice depending on space).</li>
              <li><strong>Lighting</strong> - intrinsically safe in flammable atmospheres.</li>
              <li><strong>Time limit</strong> - controlled entry duration.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />
          <ContentEyebrow>Atmosphere monitoring and rescue</ContentEyebrow>
          <ConceptBlock title="Multi-gas monitoring and pre-arranged rescue" plainEnglish="Atmosphere monitoring is non-negotiable. Calibrated multi-gas detector measuring oxygen (deficiency 19.5% or enrichment 23.5%), flammable (LEL), toxic (H2S, CO commonly). Tested pre-entry and continuously worn during entry." onSite="Rescue plan must be pre-arranged. 999 response is far too slow - asphyxiation timescale is seconds-to-minutes. Standby person outside the space + retrieval equipment + trained rescuer is the operational rescue plan.">
            <p>Atmosphere monitoring details:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pre-entry sample at multiple depths (gases stratify).</li>
              <li>Detector worn during entry; alarm thresholds set; visible/audible alerts.</li>
              <li>Calibration checks (bump test daily; full calibration periodic).</li>
              <li>Withdraw immediately if any alarm sounds.</li>
              <li>Don't use detector with deficient battery.</li>
            </ul>
            <p>Rescue plan elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Harness on entrant + retrieval line out the access (where geometry allows).</li>
              <li>Mechanical retrieval device (tripod / davit + winch).</li>
              <li>Breathing apparatus for rescuer (compressed air or supplied-air).</li>
              <li>Trained rescuer ready to deploy.</li>
              <li>Communication maintained throughout entry.</li>
              <li>Withdrawal at first sign of distress / atmosphere change.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Permit-to-work systems</ContentEyebrow>
          <ConceptBlock title="The formal authorisation regime" plainEnglish="A permit-to-work is a formal written authorisation that defines the work, the controls, the personnel authorised, the time period, the conditions for safe entry and the rescue arrangements. Used routinely in higher-risk industries (oil &amp; gas, chemicals, utilities) and increasingly in commercial confined-space contexts. Distinguishes itself from a method statement by being site-specific and time-bound." onSite="L3 supervisor on confined-space work: if your firm or the customer operates a permit-to-work system, the permit is the legal authorisation for the work. No work begins without the permit signed by the issuing authority; work stops at permit expiry; new permit needed for resumption.">
            <p>Permit-to-work elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Defined work scope and limits.</li>
              <li>Identified hazards and required controls.</li>
              <li>Authorised personnel by name.</li>
              <li>Time-bound validity.</li>
              <li>Pre-work isolation and atmosphere check sign-off.</li>
              <li>Standby and rescue arrangements specified.</li>
              <li>Issuing authority signature (competent senior person).</li>
              <li>Acceptance by performing personnel.</li>
              <li>Cancellation / sign-off at completion.</li>
              <li>Record retention as part of safety management system.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Confined Spaces Regulations 1997 — Reg 5(1)" clause={<>&quot;No person at work shall enter or carry out any work in or (other than as a result of an emergency) leave a confined space otherwise than in accordance with a system of work which, in relation to any relevant specified risks, renders that work safe and without risks to health.&quot;</>} meaning={<>The safe system of work duty. Reg 5 sits alongside Reg 4 (avoidance principle) — entry only if not reasonably practicable to avoid AND only via SSoW. Reg 5(2) requires emergency arrangements (rescue plan). Together they form the entry-permission framework.</>} cite="Source: Confined Spaces Regulations 1997 (SI 1997/1713), Reg 5 — verbatim from legislation.gov.uk." />

          <ConceptBlock title="Atmosphere monitoring — what the meter actually measures" plainEnglish="Multi-gas detectors measure typically four parameters: oxygen (% volume); flammable gas (% LEL — Lower Explosive Limit); hydrogen sulphide (ppm); carbon monoxide (ppm). Some detectors include extra channels for specific gases (chlorine, sulphur dioxide etc) where the application requires. Pre-entry sample at multiple depths (gases stratify); detector worn during entry with audible / visual alarms." onSite="L3 supervisor on a confined-space job: confirm detector is calibrated (annual cal cert + daily bump test); confirm batteries; confirm alarm thresholds set per the regs (oxygen alarm 19.5% deficiency / 23.5% enrichment; flammable alarm 10% LEL; H2S alarm 5 ppm; CO alarm 30 ppm typical). Withdraw immediately on any alarm.">
            <p>Atmosphere monitoring practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pre-entry sample at multiple depths (gases stratify by density).</li>
              <li>Continuous monitoring during entry — detector worn or positioned.</li>
              <li>Alarm thresholds set per regs: O2 19.5% / 23.5%; flammable 10% LEL; toxic per substance.</li>
              <li>Audible + visual alarms.</li>
              <li>Calibration: annual full cal + daily bump test (functional check).</li>
              <li>Battery check before entry.</li>
              <li>Withdraw immediately on any alarm.</li>
              <li>Record readings for the permit / SSoW record.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Rescue planning — equipment and competence" plainEnglish="Rescue plan = pre-arranged + equipped + trained. Equipment typically: harness on entrant + retrieval line out the access; mechanical retrieval device (tripod / davit + winch) for vertical access; breathing apparatus for rescuer; communication equipment; first aid kit. Competence: standby person trained; rescuer trained including BA use; communication tested; rescue drill rehearsed before high-risk work." onSite="L3 supervisor verification before entry: rescue plan written into the permit / SSoW; equipment present and tested; standby person briefed; rescuer available; communication working. Rescue cannot be improvised when the casualty is unconscious. Pre-arranged means tested before the work.">
            <p>Rescue plan elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Harness on entrant + retrieval line through access (where geometry allows).</li>
              <li>Mechanical retrieval (tripod / davit + winch) for vertical access.</li>
              <li>Breathing apparatus for rescuer (compressed air, supplied air, or escape BA).</li>
              <li>Communication maintained throughout (line, radio, voice).</li>
              <li>Trained rescuer ready to deploy — not just standby person.</li>
              <li>First aid kit at access.</li>
              <li>999 supplements but does not replace the pre-arranged plan.</li>
              <li>Drill the rescue before the high-risk work.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Training tiers and competence under Reg 5" plainEnglish="Confined-space competence has tiers: General Awareness for those who might encounter; Low-Risk Confined Space training for routine entry to less complex spaces; Medium-Risk training including escape BA (typically City &amp; Guilds 6160-02 / -03); High-Risk training including working BA, top-man duties, rescue. Issuing authority for permits requires senior-level competence. Refresher periodic." onSite="L3 supervisor: confirm own training is current and matches the risk; confirm L2 mate&apos;s same. Without appropriate training Reg 5 SSoW is not defensible — operative competence is part of the SSoW. Most general electrical contractors hold Awareness only; routine confined-space work needs higher tiers held by specialist contractors.">
            <p>Confined-space training tiers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Awareness</strong> — for anyone who might encounter; understanding of hazards and SSoW principles.</li>
              <li><strong>Low-Risk</strong> — routine entry to less complex spaces; gas testing; permit acceptance.</li>
              <li><strong>Medium-Risk</strong> — entry with escape BA; typically C&amp;G 6160-02 / -03 or equivalent.</li>
              <li><strong>High-Risk</strong> — working BA, top-man duties, rescue capability.</li>
              <li>Issuing authority training for permit signatories.</li>
              <li>Refresher training periodic (typically annual / biennial depending on tier).</li>
              <li>Records part of competence evidence under EAWR Reg 16 + CSR 1997 Reg 5.</li>
              <li>Most general electrical firms hold Awareness only; routine work needs specialists.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Confined Spaces Regulations 1997 — Reg 5(2)" clause={<>&quot;The system of work must, in particular, include such of the following as are appropriate — (a) the suitability of the personnel concerned... (c) the testing of the atmosphere... (e) communications... (f) the provision of personal protective equipment, breathing apparatus, resuscitation equipment...&quot;</>} meaning={<>Reg 5(2) details the SSoW elements. Personnel suitability (training + medical fitness); atmosphere testing (multi-gas detector); communications (reliable two-way); PPE / RPE / breathing apparatus as appropriate. Reg 5(3) requires emergency arrangements (rescue plan). Together they mandate the comprehensive entry framework.</>} cite="Source: Confined Spaces Regulations 1997 (SI 1997/1713), Reg 5 — verbatim from legislation.gov.uk." />

          <ConceptBlock title="Specified risks defined — what counts as &quot;foreseeable&quot;" plainEnglish="Confined Spaces Regs 1997 specified risks are defined in Reg 1 and HSE ACOP L101: serious injury due to fire / explosion; loss of consciousness from increase in body temperature (hyperthermia); loss of consciousness or asphyxiation arising from gas / fume / vapour or lack of oxygen; drowning from increased level of liquid; asphyxiation arising from a free-flowing solid or being trapped by such. &quot;Foreseeable&quot; = could be expected to occur given the space&apos;s history and use." onSite="L3 supervisor judgement on borderline cases: history of the space matters. A switch room previously stable may have a foreseeable specified risk if there&apos;s a known SF6 leak history; a basement may have foreseeable specified risk if drainage / sewer-gas history exists. The L3 reflex: ask about the space&apos;s history before judging foreseeability.">
            <p>Specified risk categories:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Serious injury from fire / explosion (flammable atmosphere).</li>
              <li>Loss of consciousness from increase in body temperature (hyperthermia).</li>
              <li>Loss of consciousness or asphyxiation from gas / fume / vapour / lack of oxygen.</li>
              <li>Drowning from increased level of liquid.</li>
              <li>Asphyxiation from free-flowing solid (grain, sand) or being trapped by such.</li>
              <li>&quot;Foreseeable&quot; = reasonably anticipated given history, use, location.</li>
              <li>If any specified risk is foreseeable + space is enclosed, Confined Spaces Regs apply.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <CommonMistake title="Treating a poorly-ventilated cellar as &apos;just a basement&apos;" whatHappens={<>Apprentice enters poorly-ventilated cellar in older property; doesn\'t recognise potential confined-space context (asphyxiation risk from poor ventilation + radon / methane in some areas); becomes disoriented; lucky to escape. Confined Spaces Regs 1997 should have applied.</>} doInstead={<>Assess for confined-space criteria. Poor ventilation + foreseeable specified risk = confined space. SSoW applies. If your firm doesn\'t have confined-space capability, escalate / refer / refuse.</>} />

          <CommonMistake title="Solo entry without standby person" whatHappens={<>Operative enters confined space alone &quot;just for a quick look&quot;. Becomes incapacitated. No-one outside knows; no rescue initiated; outcome could be fatal. Many confined-space fatalities follow this pattern.</>} doInstead={<>Standby person mandatory. No solo entry. The standby person is the entrant\'s lifeline.</>} />

          <Scenario title="Customer asks for work in a small underground meter chamber" situation={<>Customer wants new electrical supply tested in an underground meter chamber serving a remote outbuilding. Chamber is roughly 1m x 1m x 1.5m deep, accessed via a manhole cover. Limited ventilation; possible water seepage; you\'d need to enter to do the work.</>} whatToDo={<>Apply confined-space test. Substantially enclosed? Yes (small chamber, single access). Foreseeable specified risk? Multiple - asphyxiation (oxygen deficiency from poor ventilation; possible methane / sewer gas if drainage nearby), drowning (water seepage), entrapment (single small access). Both conditions met = confined space. CS Regs 1997 apply. Most general electrical firms don\'t have confined-space SSoW capability. Options: (1) escalate to firm contracts manager - bring in specialist contractor for the entry work; (2) if firm has confined-space capability, follow full SSoW (permit + monitoring + standby + rescue + training); (3) refuse if neither possible. Don\'t enter without proper SSoW; document; escalate; let firm decide commercial response. The cellar-meter test work isn\'t worth the risk if procedure can\'t be discharged.</>} whyItMatters={<>Confined-space fatalities follow predictable patterns - underestimated risk + skipped controls + no rescue plan. The L3 supervisor recognising the confined-space context BEFORE entry is what prevents the fatality. Customer pressure to &quot;just have a look&quot; is real but cannot override the regulatory framework. ERA s.44 protects refusal.</>} />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 4.4 - confined spaces have specific regs. Here we go deeper on SSoW.",
            "Definition: substantially enclosed AND foreseeable specified risk (fire / asphyxiation / drowning / hyperthermia / entrapment).",
            "Reg 4 avoidance principle - don\'t enter unless not reasonably practicable to avoid.",
            "SSoW: risk assessment + permit + atmosphere monitoring + standby person + rescue plan + PPE + training.",
            "Atmosphere monitoring: oxygen + LEL + toxic. Calibrated; pre-entry + continuous.",
            "Rescue must be PRE-ARRANGED. 999 too slow. Standby person outside; never enters.",
            "Most general electrical firms don\'t maintain confined-space capability. Escalate to specialist.",
            "Default = treat borderline cases as confined; the cost of mis-classifying down is potentially fatal.",
          ]} />
          <Quiz title="Confined Spaces - knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section6-4')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">6.4 Asbestos escalation</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section6-6')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">6.6 Equality Act + near-miss culture</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
