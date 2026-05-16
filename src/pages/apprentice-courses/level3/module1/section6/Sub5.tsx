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
  { question: 'What\'s the difference between a permit-to-work and a method statement?', answer: 'Method statement = generic procedure for a class of work. Permit-to-work = site-specific, time-bound authorisation for a specific entry at a specific location with named personnel. Permit references the method statement but adds the specific authorisation. On confined spaces both are typically required; the permit is the operational authorisation each time.' },
  { question: 'How long does atmosphere monitoring data need to be retained?', answer: 'Typically with the permit and SSoW record — minimum 3 years; longer if part of medical surveillance or claim-relevant records. The HSE ACOP L101 doesn\'t set a fixed retention period but COSHH Reg 11 / CAR 2012 Reg 19 patterns suggest retention proportionate to potential disease latency. Most firms retain 5+ years.' },
  { question: 'What is HSE ACOP L101?', answer: 'The HSE Approved Code of Practice and Guidance on the Confined Spaces Regulations 1997 — &quot;Safe work in confined spaces&quot;. ACOP status means following it is the practical means of complying with the regs; departing from it requires demonstrating equivalent compliance. Read it; refer to it in your firm\'s SSoW documentation.' },
  { question: 'When does a confined-space entry require an Issuing Authority for permits?', answer: 'Whenever your firm\'s permit-to-work system requires it — typically for higher-risk entries (BA required, hot work in confined space, breaking containment). The Issuing Authority is a competent senior person who reviews the SSoW, atmosphere readings, equipment and personnel before signing the permit. Different role from the entrant.' },
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
            "Atmosphere monitoring is non-negotiable: oxygen 19.5-23.5%; flammable &lt; 10% LEL; toxic (H2S, CO) per substance-specific WEL. Pre-entry + continuous.",
            "Most general electrical firms hold Awareness only; routine confined-space work requires C&amp;G 6160-02/-03 or equivalent specialist competence.",
            "L3 supervisor judgement on borderline cases: treat as confined until proven otherwise; the cost of mis-classifying down is potentially fatal.",
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

          <RegsCallout source="Confined Spaces Regulations 1997 - Reg 4(1)" clause={<>"No person at work shall enter a confined space to carry out work for any purpose unless it is not reasonably practicable to achieve that purpose without such entry."</>} meaning={<>The avoidance principle is fundamental. Entry is the exception, not the default. Reg 4(2) requires safe system of work where entry is necessary; Reg 5 requires emergency arrangements (rescue plan).</>} cite="Source: Confined Spaces Regulations 1997 (SI 1997/1713), Reg 4." />

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

          <RegsCallout source="Confined Spaces Regulations 1997 — Reg 5(1)" clause={<>&quot;No person at work shall enter or carry out any work in or (other than as a result of an emergency) leave a confined space otherwise than in accordance with a system of work which, in relation to any relevant specified risks, renders that work safe and without risks to health.&quot;</>} meaning={<>The safe system of work duty. Reg 5 sits alongside Reg 4 (avoidance principle) — entry only if not reasonably practicable to avoid AND only via SSoW. Reg 5(2) requires emergency arrangements (rescue plan). Together they form the entry-permission framework.</>} cite="Source: Confined Spaces Regulations 1997 (SI 1997/1713), Reg 5." />

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

          <RegsCallout source="Confined Spaces Regulations 1997 — Reg 5(2)" clause={<>&quot;The system of work must, in particular, include such of the following as are appropriate — (a) the suitability of the personnel concerned... (c) the testing of the atmosphere... (e) communications... (f) the provision of personal protective equipment, breathing apparatus, resuscitation equipment...&quot;</>} meaning={<>Reg 5(2) details the SSoW elements. Personnel suitability (training + medical fitness); atmosphere testing (multi-gas detector); communications (reliable two-way); PPE / RPE / breathing apparatus as appropriate. Reg 5(3) requires emergency arrangements (rescue plan). Together they mandate the comprehensive entry framework.</>} cite="Source: Confined Spaces Regulations 1997 (SI 1997/1713), Reg 5." />

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
          <ContentEyebrow>Multi-gas detection and the atmosphere monitoring regime</ContentEyebrow>

          <ConceptBlock
            title="What the standby person watches for and why"
            plainEnglish="For any confined-space entry the atmosphere must be monitored continuously, before entry and during work. Modern portable multi-gas detectors monitor four gases as a minimum: oxygen (O₂), lower explosive limit (LEL, flammable atmosphere indicator), carbon monoxide (CO), and hydrogen sulphide (H₂S). Each has alarm thresholds; any alarm during entry requires immediate evacuation. The standby person outside the space monitors the detector readings, communicates with the entrant continuously, and initiates the emergency response if an alarm sounds or communication fails."
            onSite="The L3 supervisor on confined-space work confirms the detector is calibrated (typically valid for 6-12 months from last bump test / calibration), the alarm setpoints are correct for the space&apos;s expected hazards, and the entrant knows the response if an alarm sounds. The detector isn&apos;t infallible; gas distribution within a space is rarely uniform; the entrant&apos;s position relative to the detector matters. Pre-entry test from the access opening, with detector lowered to mid-space depth, gives a more representative reading than a sample at the surface."
          >
            <p>Multi-gas detector regime:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>O₂ (oxygen)</strong> — normal 20.9%; alarm low at 19.5%
                (asphyxiation), high at 23.5% (enriched, fire risk).
              </li>
              <li>
                <strong>LEL (lower explosive limit)</strong> — % of LEL for flammable
                gas mix; alarm typically at 10% LEL (gives margin before ignition
                risk).
              </li>
              <li>
                <strong>CO (carbon monoxide)</strong> — alarm at 30 ppm (HSE WEL is
                30 ppm 8h TWA, 200 ppm STEL); from combustion sources.
              </li>
              <li>
                <strong>H₂S (hydrogen sulphide)</strong> — alarm at 5 ppm (HSE WEL
                is 5 ppm 8h TWA); sewer gas, anaerobic decay.
              </li>
              <li>
                <strong>Other gases</strong> — depending on space history; SF₆,
                refrigerants, solvents may need additional sensors.
              </li>
              <li>
                <strong>Calibration / bump test</strong> — periodic;
                manufacturer&apos;s schedule; records retained.
              </li>
              <li>
                <strong>Pre-entry test</strong> — sample from access opening, lowered
                into space; representative reading before entry.
              </li>
              <li>
                <strong>Continuous monitoring</strong> — detector worn by entrant in
                breathing zone; standby person watching readings.
              </li>
              <li>
                <strong>Alarm response</strong> — immediate evacuation; do not
                investigate; re-enter only after fresh atmosphere confirmed.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Isolation and lockout before confined-space entry</ContentEyebrow>

          <ConceptBlock
            title="Lockout / tagout and the elimination of stored energy before entry"
            plainEnglish="Before any confined-space entry the L3 supervisor confirms isolation of all energy sources that could otherwise present hazards inside the space. Electrical isolation (LOTO of supplies feeding equipment in the space, secured at distribution boards, tested at point of work). Mechanical isolation (valves locked closed, pumps locked off, agitators / mixers locked off). Process isolation (incoming pipes blanked / spaded; drains plugged; chemical lines purged). Stored energy (residual pressure, residual electrical charge in capacitors, gravity loads on hoists, hydraulic accumulators) — each must be safely discharged before entry. The principle: assume nothing; test everything; lock all of it."
            onSite="L3 supervisor on a tank-instrumentation entry: walk every supply line on the schematic; lock and tag each isolation; test for dead at point of work; check for residual pressure / chemical / heat. The entry brief includes &quot;here are the isolations applied and tested; here are the keys; nobody removes a lock except the named applier.&quot; The LOTO discipline reduces the SSoW complexity by removing hazards before entry rather than controlling them during entry."
          >
            <p>Isolation and LOTO elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Electrical isolation</strong> — LOTO at distribution; secured; tested for dead at point of work; voltage indicator proved.</li>
              <li><strong>Mechanical isolation</strong> — valves locked closed; pumps locked off; agitators locked.</li>
              <li><strong>Process isolation</strong> — incoming pipes blanked / spaded; drains plugged.</li>
              <li><strong>Stored energy</strong> — pressure released; capacitors discharged; gravity loads pinned; hydraulic relieved.</li>
              <li><strong>Personal locks</strong> — each entrant applies own padlock; nobody removes another&apos;s.</li>
              <li><strong>Multi-lock hasps</strong> — allow multiple personal locks on one isolation.</li>
              <li><strong>Tag information</strong> — name, date, contact, work scope.</li>
              <li><strong>Test for dead</strong> — voltage indicator proven before and after.</li>
              <li><strong>Reinstate sequence</strong> — only after all entrants have exited and removed own locks.</li>
              <li><strong>Permit reference</strong> — LOTO referenced on the confined-space permit.</li>
              <li><strong>EAWR 1989 Reg 13 + 14</strong> — electrical isolation specifically.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Rescue planning in operational detail</ContentEyebrow>

          <ConceptBlock
            title="The pre-arranged rescue plan — equipment, competence and the rehearsed procedure"
            plainEnglish="Reg 5(3) requires &quot;suitable and sufficient arrangements for the rescue&quot; before entry. The operational reality: a rescue plan is pre-arranged + equipped + trained + rehearsed. Equipment varies by entry type: harness on entrant + retrieval line through access (where vertical geometry permits); mechanical retrieval device (tripod / davit + winch) for vertical access; breathing apparatus for the rescuer (compressed air, supplied air, or escape BA depending on space); communication equipment; first aid including resuscitation equipment per Reg 5(2)(f); stretcher / casualty bag for casualty extraction. Competence: standby person trained; rescuer trained including BA use; communication tested; rescue drill rehearsed before high-risk work."
            onSite="L3 supervisor verification before entry: rescue plan written into the permit / SSoW; equipment present and tested at start of shift; standby person briefed on the plan; rescuer available within the response window the plan assumes; communication tested. Rescue cannot be improvised when the casualty is unconscious — the casualty has 4-6 minutes from cardiac arrest before brain damage begins. Pre-arranged means tested before the work; rehearsed means the rescuer has actually done the procedure with equipment in place."
          >
            <p>Rescue plan elements in detail:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Harness + retrieval line</strong> — full body harness on entrant; line through access; permits mechanical retrieval without entry.</li>
              <li><strong>Mechanical retrieval device</strong> — tripod / davit / quadpod with winch; lifting capacity matched to weight; positioned at access.</li>
              <li><strong>Breathing apparatus</strong> — for rescuer; compressed air (working) or supplied air (longer duration) or escape BA (10-15 min self-contained); per the foreseeable atmosphere.</li>
              <li><strong>Communication</strong> — radio / line / voice; tested before entry; backup channel.</li>
              <li><strong>Trained rescuer</strong> — typically C&amp;G 6160-03 or equivalent for high-risk; ready to deploy within the assumed response window.</li>
              <li><strong>First aid + resuscitation</strong> — Reg 5(2)(f); kit at access; AED appropriate; trained first-aider.</li>
              <li><strong>Casualty extraction</strong> — stretcher / casualty bag if confined geometry prevents harness extraction.</li>
              <li><strong>Response window</strong> — assumed time from incident to rescuer reaching casualty; built into the plan.</li>
              <li><strong>999 supplement</strong> — Fire and Rescue may attend but cannot be the primary rescue route.</li>
              <li><strong>Rehearsal</strong> — drill the rescue before the high-risk work; not theoretical.</li>
              <li><strong>Equipment check</strong> — at start of shift; recorded on the permit; failures = work doesn&apos;t start.</li>
              <li><strong>Casualty handover</strong> — to emergency services on arrival; documented; medical evidence preserved.</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Treating the standby person as the rescuer"
            whatHappens={<>The entrant becomes incapacitated. The standby person — having watched a colleague go quiet — enters the space to help. Without BA they too become incapacitated within seconds. Second casualty. The rescuer arriving later finds two unconscious operatives instead of one. This is the recurring confined-space fatality pattern.</>}
            doInstead={<>Standby person NEVER enters. The role is to phone for the trained rescuer with BA, deploy the retrieval line, and coordinate. The instinct to help is human; the discipline to stay outside is what saves lives. Brief this explicitly before every entry; rehearse the scenario; the standby person must know they have permission and obligation to stay outside.</>}
          />

          <SectionRule />
          <ContentEyebrow>Toxic gases in confined spaces — substance-specific WELs</ContentEyebrow>

          <ConceptBlock
            title="Hydrogen sulphide, carbon monoxide, methane, SF6 — the common confined-space toxic atmosphere risks"
            plainEnglish="Confined-space atmosphere hazards in the electrical trade are mostly limited but real. Hydrogen sulphide (H2S) — sewer gas, septic decay; lethal at 700 ppm in minutes; HSE WEL 5 ppm 8-hour TWA, 10 ppm STEL; sense of smell deadens at higher concentrations (paradoxically less perceptible at lethal levels). Carbon monoxide (CO) — combustion / vehicle exhaust / faulty boilers; binds haemoglobin 200x more than oxygen; HSE WEL 30 ppm 8-hour TWA, 200 ppm STEL. Methane (CH4) — anaerobic decay, sewers, landfill, some basements; not toxic per se but displaces oxygen and is flammable at 5-15% in air. SF6 (sulphur hexafluoride) — high-voltage switchgear insulation; heavier than air, displaces oxygen, decomposes to toxic compounds in arcing; HSE WEL 1000 ppm 8-hour TWA but the asphyxiation risk dominates in confined spaces."
            onSite="L3 supervisor on any confined-space entry where these gases are foreseeable: multi-gas detector configured for the substance-specific sensor (H2S and CO are standard four-gas channels; methane often via LEL channel; SF6 requires dedicated sensor). Alarm thresholds set per substance, not generic. Pre-entry test at multiple depths. Continuous monitoring. Withdraw immediately on any alarm. The reflex is the same as for asbestos discovery — don&apos;t investigate, withdraw, escalate."
          >
            <p>Common confined-space toxic atmosphere risks:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>H2S (hydrogen sulphide)</strong> — sewer gas; rotten-egg smell at low conc; deadens at higher; WEL 5 ppm 8h TWA; lethal at 700 ppm in minutes.</li>
              <li><strong>CO (carbon monoxide)</strong> — combustion / vehicle / boiler; odourless; WEL 30 ppm 8h TWA; binds haemoglobin 200x oxygen.</li>
              <li><strong>CH4 (methane)</strong> — anaerobic decay; sewers; landfill; not toxic but displaces O2 and flammable 5-15% LEL.</li>
              <li><strong>CO2 (carbon dioxide)</strong> — respiration / fermentation / dry ice; WEL 5000 ppm 8h TWA; asphyxiant + acidotic.</li>
              <li><strong>SF6 (sulphur hexafluoride)</strong> — HV switchgear insulation; heavier than air; asphyxiation risk dominates; arc-decomposition toxic.</li>
              <li><strong>Nitrogen</strong> — used for purging / displacement; pure N2 atmosphere = unconsciousness in 30 seconds, fatal in minutes.</li>
              <li><strong>Argon</strong> — heavier than air; settles in low points; same asphyxiation risk pattern.</li>
              <li><strong>Refrigerants</strong> — HVAC plant rooms; some toxic at high concentrations; displace oxygen.</li>
              <li><strong>Solvent vapours</strong> — paint shops, degreasing tanks; LEL and toxic thresholds; require substance-specific assessment.</li>
              <li><strong>Welding fumes</strong> — hot work in confined space; ozone, NOx, metal fumes; substance-specific.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Confined Spaces Regulations 1997 — Reg 5(3)"
            clause={<>&quot;Before any person at work enters or carries out work in a confined space, suitable and sufficient arrangements for the rescue of any person at work in the confined space shall be made.&quot;</>}
            meaning={<>The Reg 5(3) duty makes the rescue arrangements a pre-condition of entry, not an afterthought. &quot;Suitable and sufficient&quot; means matched to the specific space and foreseeable emergency. Generic statements like &quot;call 999&quot; do not discharge the duty — Fire and Rescue response is typically too slow for confined-space emergencies. Pre-arranged rescuer + equipment + communication + tested procedure is the operational reality.</>}
            cite="Source: Confined Spaces Regulations 1997 (SI 1997/1713), Reg 5."
          />

          <ConceptBlock
            title="Oxygen — deficiency, enrichment and the 19.5/23.5 thresholds"
            plainEnglish="Atmospheric oxygen is normally 20.9%. Below 19.5% is deficient: cognitive impairment starts; below 16% the impairment is significant; below 10% unconsciousness within minutes; below 6% death within seconds. Above 23.5% is enriched: dramatically increased fire risk; materials normally inert can ignite; clothing fibres burn aggressively; not directly toxic but the explosion / fire hazard is severe. CSR 1997 sets the working window: O2 alarm low at 19.5% (deficiency); O2 alarm high at 23.5% (enrichment). Outside the window = withdraw and investigate cause before re-entry."
            onSite="L3 supervisor framing for the team: oxygen deficiency is silent and fast. The operative becomes confused before they realise something is wrong; cognitive impairment prevents self-rescue. The standby person watching the detector readings — not the entrant — is the early-warning system. A sudden O2 drop is the signal to instruct immediate withdrawal. Causes of deficiency: displacement by other gas (methane, nitrogen, CO2, argon); consumption (oxidation of metal, biological decay, combustion); poor ventilation in any confined volume."
          >
            <p>Oxygen threshold framework:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>20.9%</strong> — normal atmospheric oxygen.</li>
              <li><strong>19.5%</strong> — alarm low threshold (CSR 1997 working limit); withdraw and investigate.</li>
              <li><strong>16%</strong> — significant cognitive impairment begins.</li>
              <li><strong>10%</strong> — unconsciousness within minutes.</li>
              <li><strong>6%</strong> — death within seconds.</li>
              <li><strong>23.5%</strong> — alarm high threshold; oxygen-enriched; severe fire risk.</li>
              <li><strong>Common deficiency causes</strong> — displacement by other gas; oxidation of metal; biological decay; combustion; poor ventilation.</li>
              <li><strong>Common enrichment causes</strong> — leaking oxygen cylinders; aggressive ventilation with O2 instead of air; certain industrial processes.</li>
              <li><strong>Self-rescue impossibility</strong> — cognitive impairment prevents self-rescue at deficient levels.</li>
              <li><strong>Standby role</strong> — watching the detector readings is the early-warning system.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Hyperthermia and thermal stress — the overlooked specified risk"
            plainEnglish="Of the five specified risks in CSR 1997, hyperthermia (loss of consciousness from increase in body temperature) is the most frequently overlooked. A small confined volume with limited ventilation, on a hot summer day, can build heat rapidly — body heat from the operative, equipment heat, ambient heat all stacking. The L3 supervisor reflex: in summer, the loft that wasn&apos;t a confined space in February may be one in July. Hyperthermia signs are subtle: confusion, lightheadedness, reduced sweating (paradoxically), elevated heart rate. Onset can be insidious; collapse can be sudden. Atmosphere monitoring doesn&apos;t catch it — multi-gas detectors don&apos;t measure temperature. The supervisor judgement is what catches it."
            onSite="L3 supervisor on summer work in any enclosed volume: assess thermal conditions explicitly. Internal temperature; humidity; air movement; operative activity level; PPE burden (sweat-trapping, heat-retaining). Hydration plan; rest breaks; cooler periods of the day for high-physical-effort work; ventilation forced where reasonably practicable. The hyperthermia route to unconsciousness is real and the rescue plan must contemplate it — a collapsed entrant in a hot loft requires extraction speed even if no atmosphere issue exists."
          >
            <p>Hyperthermia in confined-space context:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Specified risk under CSR 1997 Reg 1</strong> — &quot;loss of consciousness arising from an increase in body temperature&quot;.</li>
              <li><strong>Stacking factors</strong> — body heat + equipment heat + ambient + limited ventilation.</li>
              <li><strong>Onset signs</strong> — confusion, lightheadedness, reduced sweating, elevated heart rate, headache.</li>
              <li><strong>Detection gap</strong> — multi-gas detectors don&apos;t measure temperature; supervisor judgement required.</li>
              <li><strong>Seasonal variation</strong> — loft / cellar / plant room may be confined in summer but not winter.</li>
              <li><strong>Hydration plan</strong> — frequent small intake; access to cold water; electrolytes for sustained physical work.</li>
              <li><strong>Rest break schedule</strong> — forced breaks in cooler environment; sometimes by timer.</li>
              <li><strong>Time-of-day scheduling</strong> — high-effort work in cooler morning / evening.</li>
              <li><strong>Ventilation</strong> — forced where practicable; fan introducing air; doors propped.</li>
              <li><strong>PPE consideration</strong> — heat-retaining PPE (sweat-trapping coveralls, restrictive harness) needs compensation.</li>
              <li><strong>Rescue plan</strong> — must contemplate hyperthermia collapse even without atmosphere issue.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The hierarchy of control applied to confined-space entry"
            plainEnglish="The Reg 4 avoidance principle is the first application of the hierarchy of control to confined-space work. ERICPD framework applied: Eliminate — can the work be done without entering the space? (Cable pulled from outside; remote inspection by camera; valve operated by extension; equipment relocated.) Reduce — if entry is necessary, can the foreseeable specified risk be reduced before entry? (Atmosphere ventilated before entry; isolation of incoming gas / liquid; flushing or purging; reducing entry duration.) Isolate — what isolations are needed during entry? (LOTO of equipment; barriers; access control.) Control — what active controls during entry? (Atmosphere monitoring; standby person; communication; rescue plan.) PPE — what protective equipment? (RPE; harness; intrinsically safe lighting; appropriate clothing.) Discipline — what behavioural / training controls? (Permit; training; rehearsal; toolbox brief.)"
            onSite="The L3 supervisor walking the hierarchy on a proposed entry typically discovers that the upper tiers (Eliminate, Reduce) are under-applied — most teams jump straight to PPE and standby. The discipline is to ask &quot;can we not enter?&quot; before &quot;how do we enter?&quot;. Many electrical tasks initially framed as confined-space entry can be re-engineered to avoid entry — cable pulled rather than entered, camera inspection rather than visual, valve operation by handle extension rather than physical access. The cost of re-engineering is typically less than the cost of full confined-space SSoW."
          >
            <p>ERICPD applied to confined-space entry:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Eliminate</strong> — can the work be done without entry? Cable pulling, camera inspection, valve extensions, equipment relocation.</li>
              <li><strong>Reduce</strong> — if entry necessary, can the risk be reduced before entry? Ventilation, isolation, purging, shortened duration.</li>
              <li><strong>Isolate</strong> — what isolations are needed during entry? LOTO, barriers, access control.</li>
              <li><strong>Control</strong> — active controls during entry: atmosphere monitoring, standby, communication, rescue.</li>
              <li><strong>PPE</strong> — RPE, harness, intrinsically safe lighting, appropriate clothing.</li>
              <li><strong>Discipline</strong> — permit, training, rehearsal, toolbox brief.</li>
              <li><strong>Reg 4 alignment</strong> — Eliminate / Reduce tiers correspond to the avoidance principle.</li>
              <li><strong>L3 supervisor reflex</strong> — ask &quot;can we not enter?&quot; before &quot;how do we enter?&quot;.</li>
              <li><strong>Re-engineering</strong> — cost typically less than full confined-space SSoW.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Common electrical-trade confined spaces — detailed profile"
            plainEnglish="The electrical trade encounters confined spaces in specific recurring contexts. Manholes for cable jointing — typically pre-existing utility / distribution / street infrastructure; standby person, atmosphere monitoring, traffic management. Switchrooms with SF6 switchgear — SF6 leak risk plus heat-of-summer issues; small switchroom with poor ventilation becomes confined. Plant rooms / boiler rooms — combustion gases, refrigerant leaks, hot summer hyperthermia. Lift shafts — single vertical access, falling object risk, potential entrapment. Industrial tanks for instrumentation — sometimes purged with N2 or other gas; full SSoW required. Underfloor voids — variable; assess each. Telecoms / IT cabinets / equipment racks — usually not confined-space but enclosed maintenance access points can trigger the test."
            onSite="L3 supervisor on encountering an electrical confined space: apply the two-part test (substantial enclosure + foreseeable specified risk). The risk is often not obvious — the SF6 switchroom doesn&apos;t feel risky until you realise SF6 displaces oxygen on leak. The manhole doesn&apos;t feel risky until you realise sewer methane can migrate in. The pre-entry assessment is what reveals the foreseeable specified risk; intuition alone misses it."
          >
            <p>Electrical-trade confined-space contexts:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Manholes (cable jointing)</strong> — utility infrastructure; sewer gas migration; standby + atmosphere + traffic management.</li>
              <li><strong>HV switchrooms with SF6</strong> — SF6 leak displaces oxygen; arc-decomposition products toxic; ventilation check.</li>
              <li><strong>Plant rooms / boiler rooms</strong> — combustion gases (CO); refrigerant leaks; hot-summer hyperthermia.</li>
              <li><strong>Lift shafts</strong> — vertical access; entrapment; falling object risk; lockout / tagout of car.</li>
              <li><strong>Industrial tanks (instrumentation)</strong> — N2 purge possible; full SSoW with BA likely.</li>
              <li><strong>Underfloor voids</strong> — variable; assess each.</li>
              <li><strong>Sub-basements / cellars</strong> — radon (some areas); methane in some locations; poor ventilation.</li>
              <li><strong>Vehicle inspection pits</strong> — gases settle; petrol vapour; standby essential.</li>
              <li><strong>Bunded transformer enclosures</strong> — oil vapour; restricted access; ventilation check.</li>
              <li><strong>Cable basement</strong> — older buildings; combination of sewer / damp / cable insulation off-gassing.</li>
              <li><strong>Wind turbine nacelles</strong> — work-at-height + confined space; specialist competence.</li>
              <li><strong>Photovoltaic combiner enclosures</strong> — small; hot summer; electrical hazard concentrated.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="CSR 1997 alongside other regimes — HASAWA, MHSWR, CDM, COSHH"
            plainEnglish="The Confined Spaces Regulations 1997 do not operate in isolation. HASAWA 1974 s.2 + s.3 establish the umbrella employer duty that CSR 1997 specifies for confined spaces. MHSWR 1999 Reg 3 requires risk assessment that includes confined-space hazards. CDM 2015 places the project-level duties on client / principal designer / principal contractor; confined-space arrangements feature in the construction phase plan and health and safety file. COSHH 2002 covers atmospheric substances (toxic gases, fumes) that may be present. PUWER 1998 covers equipment used (multi-gas detectors, retrieval systems). PPE Regs 1992 / 2002 cover personal protective equipment (RPE, harnesses). EAWR 1989 covers any electrical work inside or affecting the space. Together the regimes form a stack; the L3 supervisor on a confined-space job touches all of them."
            onSite="L3 supervisor framing: the confined-space SSoW is the operational document but it sits on a regulatory stack. The risk assessment cites MHSWR Reg 3; the equipment competence cites PUWER + EAWR; the substances cite COSHH; the project documentation cites CDM. Knowing the stack lets the L3 supervisor engage with the wider safety management system rather than treating confined-space work as a separate silo."
          >
            <p>Regulatory stack on a confined-space entry:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>HASAWA 1974 s.2 + s.3</strong> — umbrella employer duty to employees and non-employees.</li>
              <li><strong>MHSWR 1999 Reg 3</strong> — risk assessment includes confined-space hazards.</li>
              <li><strong>CSR 1997 Reg 4 + 5</strong> — avoidance principle and SSoW for entry.</li>
              <li><strong>HSE ACOP L101</strong> — Approved Code of Practice on CSR 1997.</li>
              <li><strong>CDM 2015 Reg 4 / Reg 12 / Reg 12(5)</strong> — pre-construction information, construction phase plan, H&amp;S file.</li>
              <li><strong>COSHH 2002</strong> — atmospheric substances (H2S, CO, methane, SF6).</li>
              <li><strong>PUWER 1998</strong> — work equipment (multi-gas detectors, retrieval systems).</li>
              <li><strong>PPE Regs 1992 / 2002</strong> — RPE, harnesses, intrinsically safe lighting.</li>
              <li><strong>EAWR 1989</strong> — any electrical work in or affecting the space.</li>
              <li><strong>Working at Height Regs 2005</strong> — where the space is at height (lift shaft, nacelle).</li>
              <li><strong>RIDDOR 2013</strong> — reporting of any confined-space incident.</li>
              <li><strong>Health and Safety (First-Aid) Regs 1981</strong> — first aid provision including resuscitation.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The standby person role in operational detail"
            plainEnglish="The standby person (also called &quot;top man&quot; or &quot;attendant&quot;) is the entrant&apos;s lifeline. Sits outside the space; maintains continuous communication with the entrant; monitors the detector readings; watches for behavioural change in the entrant indicating impairment; initiates the rescue plan if the entrant becomes unresponsive or atmosphere deteriorates; controls access (no unauthorised persons enter or pass); never enters the space themselves (would just become a second casualty)."
            onSite="L3 supervisor briefing the standby person: &quot;You are not just standing here. You are watching the entrant&apos;s voice tone, response time, breathing pattern, the detector readings, and the immediate environment around the access. You phone for rescue before the entrant goes silent — by then it&apos;s too late. You never enter under any circumstances; if rescue is needed, the rescuer with BA enters; you stay outside and coordinate.&quot; The standby role is operationally critical and frequently undertrained. Most fatalities in confined spaces involve a second-casualty pattern where someone enters to rescue without BA."
          >
            <p>Standby person operational duties:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Position</strong> — at the access point; clear sightline to entrant where possible; clear access route for rescue.</li>
              <li><strong>Communication</strong> — voice / radio / line; maintained continuously; pre-agreed response cadence.</li>
              <li><strong>Detector watching</strong> — readings monitored; alarm thresholds; pre-alarm trends noted.</li>
              <li><strong>Behavioural monitoring</strong> — voice tone, response time, breathing audible if quiet; signs of impairment.</li>
              <li><strong>Access control</strong> — no unauthorised persons enter; no passers-by approach the access.</li>
              <li><strong>Rescue initiation</strong> — phone for rescuer / 999 supplementary; deploy retrieval line; brief incoming rescuers.</li>
              <li><strong>Non-entry</strong> — never enters the space under any circumstance; second-casualty pattern prevented.</li>
              <li><strong>Training</strong> — typically C&amp;G 6160-02 or equivalent; refresher periodic.</li>
              <li><strong>Permit role</strong> — signs onto the permit; signs off on exit; part of the documented evidence trail.</li>
              <li><strong>Equipment</strong> — radio; permit; emergency contact list; first aid kit; communication backup.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Confined Spaces Regulations 1997 — Reg 1(2)"
            clause={<>&quot;&apos;confined space&apos; means any place, including any chamber, tank, vat, silo, pit, trench, pipe, sewer, flue, well or other similar space in which, by virtue of its enclosed nature, there arises a reasonably foreseeable specified risk.&quot;</>}
            meaning={<>The Reg 1(2) definition is the operational test. Two limbs: (a) enclosed nature; (b) reasonably foreseeable specified risk. Both must apply. The examples in the definition (chamber, tank, vat, silo, pit, trench, pipe, sewer, flue, well) are non-exhaustive — &quot;or other similar space&quot; extends to anything matching the structural pattern. The L3 reflex on encountering an enclosed work location: apply the test; both limbs? Confined Spaces Regs 1997 apply.</>}
            cite="Source: Confined Spaces Regulations 1997 (SI 1997/1713), Reg 1."
          />

          <ConceptBlock
            title="Permit-to-work — the issuing authority, the entrant, the standby and the time limit"
            plainEnglish="A permit-to-work for confined-space entry has multiple roles: Issuing Authority (senior competent person authorising the entry; reviews SSoW, atmosphere readings, equipment, personnel, time limit, rescue plan; signs the permit). Performing Authority (the entrant; accepts the permit; performs the work within the scope and conditions). Standby Person (signs the permit as attendant; controls access). Each role is named on the permit; each signs. The permit is time-bound (typically 4-8 hours, then re-issued or work pauses). Cancellation at end of work or expiry; sign-off recorded; permit retained in the safety management records."
            onSite="L3 supervisor on a permit-to-work job: confirm before entry that the permit is current, scope matches the work, atmosphere readings recorded, time limit appropriate. If conditions change (atmosphere alarm, new hazard, equipment failure) the permit is suspended; work stops; new permit needed for resumption. The permit is the documented chain of authorisation; it&apos;s also the firm&apos;s evidence in any HSE inspection or post-incident investigation."
          >
            <p>Permit-to-work role and process elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Issuing Authority</strong> — senior competent person; reviews SSoW; signs the permit; controls the issue.</li>
              <li><strong>Performing Authority (entrant)</strong> — accepts the permit; performs the work within scope and conditions.</li>
              <li><strong>Standby Person</strong> — attendant; controls access; signs onto and off the permit.</li>
              <li><strong>Rescuer</strong> — named on the permit where applicable; signs onto the permit.</li>
              <li><strong>Scope and time limit</strong> — defined and bounded; typically 4-8 hours per permit.</li>
              <li><strong>Pre-work checks</strong> — atmosphere reading, isolation confirmation, equipment inspection, rescue arrangements — all signed off.</li>
              <li><strong>Condition changes</strong> — permit suspended; work stops; new permit needed.</li>
              <li><strong>Cancellation</strong> — at end of work / expiry; sign-off recorded.</li>
              <li><strong>Retention</strong> — permit retained as part of safety management system records.</li>
              <li><strong>Audit trail</strong> — HSE inspection, accident investigation, civil claim — permit is primary evidence.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Hot work in confined spaces — when soldering, welding or heat-shrinking is involved"
            plainEnglish="Hot work in a confined space combines two hazard regimes: the confined-space SSoW (atmosphere, standby, rescue) and the hot-work permit regime (ignition source, fuel, ventilation, fire-watch). Hot work in a flammable atmosphere is potentially fatal — the ignition triggers an explosion in the volume. Even without flammable atmosphere, hot work in a confined space consumes oxygen rapidly, generates fumes that the limited volume cannot dissipate, and creates a fire-load with no easy egress. The combination requires a hot-work permit overlaid on the confined-space permit; pre-work LEL check at multiple depths; continuous LEL monitoring during work; fire-watch positioned at the access; appropriate fire extinguisher; post-work hot-work cool-down period."
            onSite="L3 supervisor on a job that combines electrical work with hot work in a confined space (joint soldering in a manhole; brazing in a plant room; heat-shrinking in a switchroom): treat as a double-permit job. Confined-space permit + hot-work permit. Both must be in place; conditions on both must be satisfied; either suspended = work stops. The combination is high-risk; many firms refer such work to specialists rather than maintain the in-house capability."
          >
            <p>Hot-work-in-confined-space additional elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Hot-work permit</strong> — overlaid on confined-space permit; separate authorisation.</li>
              <li><strong>LEL check at multiple depths</strong> — pre-work; flammable atmosphere absolutely cleared before ignition.</li>
              <li><strong>Continuous LEL monitoring</strong> — during work; alarm at 10% LEL = immediate stop.</li>
              <li><strong>Fire-watch</strong> — positioned at access; appropriate fire extinguisher (typically CO2 + dry powder).</li>
              <li><strong>Ventilation</strong> — forced ventilation to clear fumes and replenish oxygen consumed by combustion.</li>
              <li><strong>Cool-down period</strong> — post-work fire-watch; typically 30+ minutes; combustible material may smoulder.</li>
              <li><strong>Spark / hot-particle containment</strong> — combustible materials removed; non-combustible blankets where needed.</li>
              <li><strong>RPE upgrade</strong> — fume from welding / brazing may require BA in confined volume.</li>
              <li><strong>Communication</strong> — radio working through PPE / helmet; standby person can communicate.</li>
              <li><strong>Time limit</strong> — hot-work permit typically shorter than confined-space permit; both must be current.</li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="HV switchroom maintenance with suspected SF6 leak"
            situation={<>You&apos;re lead L3 on a planned outage of an HV switchroom in a small industrial unit. The switchgear uses SF6 insulation; the room is approximately 4m x 3m x 2.5m high with one access door and no powered ventilation. Pre-entry atmosphere check shows oxygen at 19.8% (just above the alarm threshold). The customer&apos;s site manager says &quot;it&apos;s always like that, it&apos;s fine.&quot; You&apos;re scheduled to work in the room for 4 hours.</>}
            whatToDo={<>Treat the low O2 reading as the signal. The switchroom is now a confirmed confined space — substantially enclosed (single access, small volume) + foreseeable specified risk (SF6 leak displacing oxygen; reading already at 19.8% suggests an ongoing leak rather than a one-off). STOP. Don&apos;t enter beyond the access point. Phone your firm&apos;s contracts manager and the customer&apos;s site manager. Request immediate leak investigation by the switchgear OEM / specialist — SF6 leak is the priority because the trend will worsen, not improve. While waiting, force ventilation into the room (door open, fan introducing fresh air) and monitor the reading; if reading recovers to 20.9% it confirms ongoing displacement; if it stays low, an active leak is in progress. Do not start the planned maintenance until: (a) leak source identified and isolated by specialist, (b) atmosphere fully restored, (c) confined-space SSoW agreed with proper permit, atmosphere monitoring, standby and rescue arrangements appropriate to the (now-confirmed) confined-space context. The customer manager&apos;s &quot;it&apos;s always like that&quot; is the warning sign — operatives have been exposed previously without realising, and the team&apos;s tolerance has drifted dangerously. Document everything; brief the team on the change to the work plan; if the customer pushes back, escalate to firm.</>}
            whyItMatters={<>SF6 switchroom incidents are a recurring confined-space hazard in the electrical industry. SF6 is heavier than air, so it accumulates in low areas; it&apos;s odourless; oxygen deficiency builds gradually so cognitive impairment precedes recognition. The 19.8% reading is a real warning — within the &quot;alarm&quot; band already, with an active leak the trend is downward not upward. Customer reassurance like &quot;it&apos;s always like that&quot; is the cultural drift that precedes a fatality — the operative who works 4 hours in this room without intervention will not know the impairment is happening. The L3 supervisor recognising the confined-space context BEFORE entry, applying the SSoW reflex, and refusing to enter without proper controls is what prevents the fatality. ERA s.44 protects the refusal; CSR 1997 Reg 4 + Reg 5 require it.</>}
          />

          <ConceptBlock
            title="HSE ACOP L101 and the &quot;safe work in confined spaces&quot; framework"
            plainEnglish="HSE ACOP L101 &quot;Safe work in confined spaces&quot; is the Approved Code of Practice and Guidance on CSR 1997. ACOP status under HASAWA s.16 means that following L101 is the practical means of complying with the regs; departure requires demonstrating equivalent compliance. L101 covers: regulation by regulation guidance; SSoW elements in detail; atmosphere testing; rescue arrangements; case studies of confined-space incidents; sample permit forms; training competence expectations. The L3 supervisor reads L101 once thoroughly; refers to it during SSoW development; cites it in any HSE conversation."
            onSite="L101 is freely available on HSE website. Read it, bookmark it, cite it. Inspectors expect compliance to align with L101. Departure from L101 needs reasoned justification; arbitrary departure exposes the firm."
          >
            <p>HSE ACOP L101 framework:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>ACOP status</strong> — HASAWA s.16; following = compliance; departure requires equivalence.</li>
              <li><strong>Regulation-by-regulation guidance</strong> — CSR 1997 Regs 1-14 explained.</li>
              <li><strong>SSoW elements</strong> — detailed practical guidance.</li>
              <li><strong>Atmosphere testing</strong> — sampling, monitoring, alarm thresholds.</li>
              <li><strong>Rescue arrangements</strong> — pre-arranged, equipped, trained, rehearsed.</li>
              <li><strong>Case studies</strong> — past incidents for learning.</li>
              <li><strong>Sample permit forms</strong> — template language.</li>
              <li><strong>Training expectations</strong> — competence tiers.</li>
              <li><strong>Availability</strong> — free download from HSE website.</li>
              <li><strong>Update history</strong> — periodic revision; current edition referenced in firm SSoW.</li>
              <li><strong>Cross-reference</strong> — links to other ACOPs (PUWER L22, COSHH L5, CDM L153).</li>
              <li><strong>Enforcement evidence</strong> — HSE prosecution cases cite L101 as the standard.</li>
              <li><strong>L3 supervisor commitment</strong> — read once thoroughly; bookmark; refer during SSoW development.</li>
              <li><strong>Industry sector guidance</strong> — water industry, sewerage, agriculture, construction supplements.</li>
              <li><strong>Permit form templates</strong> — adaptable to firm-specific safety management system.</li>
              <li><strong>Behavioural element</strong> — emphasises culture and competence beyond procedural compliance.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Pre-entry briefing — what the L3 supervisor covers in 5 minutes"
            plainEnglish="Every confined-space entry begins with a focused pre-entry briefing — typically 5 minutes at the access point. Content: today&apos;s work scope and limits; identified hazards specific to this entry; atmosphere readings just taken; the rescue plan and standby person&apos;s role; equipment check; communication cadence; signs of distress to watch for; the withdrawal trigger conditions; emergency contact; who has decision authority on suspension."
            onSite="The L3 supervisor delivers the briefing every entry, not just the first. Briefing turns the permit and SSoW from paper into operational knowledge. Each entrant confirms understanding; questions answered; only then does entry proceed."
          >
            <p>Pre-entry briefing content:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Scope and limits</strong> — today&apos;s work, where, how long, what not to do.</li>
              <li><strong>Identified hazards</strong> — atmosphere, mechanical, electrical, thermal.</li>
              <li><strong>Atmosphere readings</strong> — just taken; current alarm thresholds.</li>
              <li><strong>Rescue plan</strong> — standby role, retrieval method, rescuer contact.</li>
              <li><strong>Equipment check</strong> — detector, harness, comms, RPE.</li>
              <li><strong>Communication cadence</strong> — signal interval; silence response.</li>
              <li><strong>Withdrawal triggers</strong> — alarm, distress, atmosphere change.</li>
              <li><strong>Emergency contact</strong> — 999 supplement; firm H&amp;S manager.</li>
              <li><strong>Decision authority</strong> — who can suspend / extend / cancel.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Health and fitness — medical considerations for confined-space work"
            plainEnglish="Confined-space work places physiological demands beyond ordinary site work. PPE / BA burden, restricted posture, heat / cold extremes, atmosphere variation, communication restriction, psychological enclosure stress. The operative must be medically fit for the work. Pre-employment / periodic medical assessment by occupational health: cardiovascular fitness; respiratory function (FEV1 / FVC for BA wear); musculoskeletal capacity; psychological suitability (claustrophobia, anxiety in enclosure); medication that could impair judgement or response; pregnancy considerations. Specific exclusions for some entries — operatives with epilepsy, certain cardiac conditions, severe claustrophobia are typically excluded from BA-wearing work."
            onSite="L3 supervisor framing: the operative&apos;s medical fitness is part of competence under CSR 1997 Reg 5(2)(a). The firm&apos;s occupational health system handles assessment; the L3 confirms with operative that they are fit for today&apos;s work (acute illness, medication change, fatigue, dehydration). On-the-day fitness varies with sleep, hydration, ambient conditions — the L3 reflex is to ask before entry, not assume."
          >
            <p>Medical fitness considerations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cardiovascular fitness</strong> — sustained physical exertion in PPE; BA wear adds load.</li>
              <li><strong>Respiratory function</strong> — FEV1 / FVC tested for BA wearers.</li>
              <li><strong>Musculoskeletal</strong> — confined posture for extended periods.</li>
              <li><strong>Psychological</strong> — claustrophobia, anxiety in enclosure; specialist assessment.</li>
              <li><strong>Medication</strong> — sedating medication, certain blood-pressure drugs may affect response.</li>
              <li><strong>Pregnancy</strong> — specific considerations; MHSWR Reg 16 + 18; CAR 2012 / COSHH overlay.</li>
              <li><strong>Acute illness</strong> — operative self-declare on the day; supervisor confirms.</li>
              <li><strong>Sleep / fatigue</strong> — performance degraded; confined-space judgement requires alertness.</li>
              <li><strong>Hydration</strong> — fluid intake before / during; particularly summer.</li>
              <li><strong>Specific exclusions</strong> — epilepsy, certain cardiac conditions, severe claustrophobia from BA wear.</li>
              <li><strong>Occupational health system</strong> — firm-level assessment; confirms operative fit for confined-space work.</li>
              <li><strong>Re-assessment</strong> — periodic; on health change; before high-risk entries.</li>
              <li><strong>Operative self-declare</strong> — on-the-day fitness; not over-ridden by schedule pressure.</li>
              <li><strong>Reasonable adjustment under Equality Act 2010</strong> — disability informs role allocation; never excludes from employment.</li>
              <li><strong>Vaccination</strong> — for some entries (sewerage, contaminated sites) hepatitis A, tetanus considered.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Borderline cases — when the &quot;substantially enclosed&quot; test is hard to call"
            plainEnglish="Some spaces are obviously confined (manhole, tank). Some are obviously not (open office, outdoor yard). The interesting cases are borderline: an underfloor void with one access hatch but reasonable ventilation; a plant room with a door and a louvred grille; a cellar with stairs and a window. The L3 supervisor judgement on borderline: apply the foreseeable specified risk test first; if there&apos;s a real foreseeable risk (gas migration, oxygen depletion from equipment, hyperthermia in summer), the borderline tips into confined. If the specified risk is implausible, the borderline tips out of confined. The decision is documented in the risk assessment with the reasoning; HSE inspection will accept reasoned judgement; unreasoned shortcuts will not stand."
            onSite="Document the reasoning on borderline calls. &quot;This plant room is not confined because: (a) double doors maintained open during work; (b) cross-ventilation through louvres; (c) no foreseeable gas migration; (d) summer hyperthermia mitigated by forced ventilation; (e) operative not working long enough for oxygen depletion to occur.&quot; The reasoned narrative is the L3 supervisor&apos;s defence; intuition without documentation is not."
          >
            <p>Borderline case decision framework:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Apply foreseeable specified risk test first</strong> — if real risk present, tip into confined.</li>
              <li><strong>Document the reasoning</strong> — written into the risk assessment.</li>
              <li><strong>Reasoned narrative</strong> — HSE inspection accepts; unreasoned does not.</li>
              <li><strong>Conservative default</strong> — when uncertain, treat as confined.</li>
              <li><strong>Re-assess seasonally</strong> — summer / winter conditions differ.</li>
              <li><strong>Re-assess on work change</strong> — different activity may introduce specified risk.</li>
              <li><strong>Specialist input</strong> — for material uncertainty, engage specialist confined-space adviser.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Communication systems in confined-space entry"
            plainEnglish="Communication between entrant and standby person is the lifeline. CSR 1997 Reg 5(2)(e) requires &quot;communications&quot; as part of the SSoW. Methods: voice (works in line-of-sight short spaces); rope-tug signal (basic emergency signal where electronic fails); radio (most flexible; intrinsically safe in flammable atmosphere); hard-wired line (some industrial confined spaces); helmet-mounted intercom (BA-wearer compatible). Pre-entry: communication tested both ways; pre-agreed cadence (entrant signals every X minutes; loss of signal = standby triggers response). Backup: at least one alternative method available; battery life confirmed; spare batteries at access."
            onSite="L3 supervisor briefing: &quot;communication every 5 minutes; if you don&apos;t hear from me, signal first, then deploy rescue. If I miss two cadences, treat as emergency.&quot; The discipline is mutual — entrant signals routinely; standby responds; silence is the alarm. Most confined-space fatalities have a moment where communication was lost and the response was delayed."
          >
            <p>Communication system elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Voice</strong> — direct communication where geometry permits.</li>
              <li><strong>Radio</strong> — intrinsically safe in flammable atmospheres; tested pre-entry.</li>
              <li><strong>Rope-tug signal</strong> — basic emergency code; backup to electronic.</li>
              <li><strong>Helmet intercom</strong> — BA-wearer compatible; integrated PPE.</li>
              <li><strong>Hard-wired line</strong> — industrial / fixed confined spaces.</li>
              <li><strong>Pre-entry test</strong> — both directions; confirmed before commit.</li>
              <li><strong>Cadence</strong> — pre-agreed signal interval; silence = alarm.</li>
              <li><strong>Backup method</strong> — at least one alternative; battery life confirmed.</li>
              <li><strong>Permit reference</strong> — communication method recorded on permit.</li>
              <li><strong>Battery management</strong> — spares at access; rotation schedule.</li>
              <li><strong>Range / penetration</strong> — radio signal tested through structure; weak spots noted.</li>
              <li><strong>Multiple entrants</strong> — each carries comms; standby manages multi-channel.</li>
              <li><strong>Recording</strong> — formal comms (radio) sometimes recorded for incident review.</li>
              <li><strong>Pre-rehearsed code</strong> — emergency abbreviations agreed before entry.</li>
              <li><strong>Loss-of-signal protocol</strong> — defined response if comms fails; standby triggers withdrawal.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Records retention for confined-space work"
            plainEnglish="Records relevant to a confined-space entry include: risk assessment; SSoW / method statement; permit-to-work (signed entrant, standby, issuing authority); atmosphere monitoring readings (pre-entry and continuous); training records of personnel involved; equipment inspection / calibration records (detector, harness, retrieval system, BA); rescue plan; toolbox talk attendance; incident or near-miss records. Retention period not fixed by CSR 1997 specifically but should follow HASAWA / MHSWR / COSHH / firm safety management system requirements — typically 3-5 years minimum, longer for any record relating to potential occupational disease (40 years pattern from CAR 2012 Reg 19 is a useful benchmark for atmosphere exposure)."
            onSite="L3 supervisor practice: the permit + atmosphere readings + sign-offs constitute the project&apos;s evidence trail. Retained centrally; accessible on HSE inspection; supports any subsequent incident investigation or civil claim. Operative competence records (training certificates, fit-test certificates, medical surveillance) retained as part of HR / competence file."
          >
            <p>Confined-space records retention:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Risk assessment</strong> — MHSWR Reg 3(6) retention; updated on conditions change.</li>
              <li><strong>SSoW / method statement</strong> — versioned; current version retained; superseded versions archived.</li>
              <li><strong>Permit-to-work</strong> — retained with project records; minimum 3 years.</li>
              <li><strong>Atmosphere monitoring</strong> — readings recorded with permit; underpins prevention defence.</li>
              <li><strong>Training records</strong> — operative competence; refresher dates; provider certification.</li>
              <li><strong>Equipment calibration</strong> — detector cal certs; harness inspection; BA service records.</li>
              <li><strong>Rescue plan</strong> — version current at time of entry; archived.</li>
              <li><strong>Toolbox talk attendance</strong> — signed by attendees; topic recorded.</li>
              <li><strong>Incident / near-miss</strong> — RIDDOR-reportable events; investigation report; retention per RIDDOR + firm policy.</li>
              <li><strong>Long-tail consideration</strong> — atmosphere exposure records benchmark 40 years (CAR 2012 Reg 19 pattern).</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 4.4 - confined spaces have specific regs. Here we go deeper on SSoW.",
            "Definition: substantially enclosed AND foreseeable specified risk (fire / asphyxiation / drowning / hyperthermia / entrapment).",
            "Reg 4 avoidance principle - don't enter unless not reasonably practicable to avoid.",
            "ERICPD applied — eliminate (don&apos;t enter) &gt; reduce &gt; isolate &gt; control &gt; PPE &gt; discipline.",
            "SSoW: risk assessment + permit + atmosphere monitoring + standby person + rescue plan + PPE + training.",
            "Atmosphere monitoring: oxygen (19.5/23.5%) + LEL (10%) + toxic (substance-specific WEL). Calibrated; pre-entry + continuous.",
            "Toxic gases — H2S 5 ppm, CO 30 ppm, methane LEL, SF6 displacement, N2 asphyxiation.",
            "Rescue must be PRE-ARRANGED. 999 too slow. Standby person outside; never enters.",
            "Hot work in confined space = double-permit job; LEL absolutely cleared before ignition.",
            "LOTO of all energy sources before entry — electrical, mechanical, process, stored.",
            "Hyperthermia is the overlooked specified risk — summer ventilation, hydration, scheduling.",
            "Most general electrical firms don't maintain confined-space capability. Escalate to specialist.",
            "Regulatory stack — CSR 1997 + HASAWA + MHSWR + CDM + COSHH + PUWER + PPE + EAWR.",
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
