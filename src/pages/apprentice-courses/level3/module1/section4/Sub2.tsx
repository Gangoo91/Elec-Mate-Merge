/**
 * Module 1 · Section 4 · Subsection 2 — Hazard: the L3 definition
 * Maps to City & Guilds 2365-03 / Unit 201 / LO4 / AC 4.2
 *   AC 4.2 — "define what is meant by the term hazard in relation to Health and Safety
 *            legislation in the workplace"
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Hazard — the L3 definition (4.2) | Level 3 Module 1.4.2 | Elec-Mate';
const DESCRIPTION = 'L3 hazard definition — distinguishing hazard from risk, exposure routes, the supervisor judgement on consequence and likelihood.';

const checks = [
  { id: 'l3-m1-s4-sub2-define', question: 'What\'s the difference between a hazard and a risk?', options: ['Same thing.', 'Hazard = something with the potential to cause harm. Risk = the likelihood that the hazard will cause harm × the severity if it does. Eg: live electricity is the HAZARD; touching live conductors with no isolation creates HIGH RISK from that hazard.', 'Hazard is small, risk is big.', 'Hazard is on paper, risk is real.'], correctIndex: 1, explanation: 'Hazard ≠ risk. The same hazard can present very different risks depending on exposure, controls and population. The L3 distinction lets you communicate accurately on RAMS and in conversations.' },
  { id: 'l3-m1-s4-sub2-routes', question: 'What are the four main routes by which a hazardous substance can affect the body?', options: ['Just one.', 'Inhalation (breathing in), absorption (through skin / eyes / mucous membranes), ingestion (swallowing), and injection (puncture / cut). Different substances exploit different routes; PPE selection follows the route.', 'Only touch.', 'Only sound.'], correctIndex: 1, explanation: 'Four exposure routes. Inhalation is the headline for dust and vapour; absorption for solvents and corrosives; ingestion for accidental swallowing (eating with contaminated hands); injection for sharps.' },
  { id: 'l3-m1-s4-sub2-evaluate', question: 'How is risk EVALUATED on a typical risk assessment?', options: ['Random number.', 'Likelihood × Severity. Likelihood scale (1 rare → 5 almost certain). Severity scale (1 minor → 5 catastrophic). Multiplied gives a risk score; matrix categorises (low / medium / high / very high) and triggers control requirements. Many firms use 3x3 or 5x5 matrices.', 'Coin flip.', 'Customer\'s opinion.'], correctIndex: 1, explanation: 'Likelihood × Severity is the standard quantification. Doesn\'t need to be exact; provides structure for the assessment and clarity on which hazards need most control.' },
];

const quizQuestions = [
  { id: 1, question: 'Define "hazard" in H&S terms.', options: ['Always dangerous.', 'Something with the potential to cause harm — a substance, situation, energy form, environment, equipment or activity that could injure people, damage health or harm property / environment.', 'Only chemical.', 'Only physical.'], correctAnswer: 1, explanation: 'Hazard = potential to cause harm. Energy, substance, situation. Doesn\'t require harm to occur; just the potential.' },
  { id: 2, question: 'Define "risk" in H&S terms.', options: ['Same as hazard.', 'The likelihood that harm from a specific hazard will occur, combined with the severity of the harm. Risk = function of likelihood × severity. Modified by the population exposed and the controls in place.', 'Always low.', 'Always high.'], correctAnswer: 1, explanation: 'Risk = quantified probability × consequence. Evaluating risk drives the control decisions.' },
  { id: 3, question: 'Name three categories of workplace hazard.', options: ['Just one.', 'Physical (electrical, mechanical, noise, vibration, height, slips, fire), chemical (substances, dust, fume), biological (bacteria, viruses, allergens), psychosocial (stress, violence, fatigue), ergonomic (manual handling, repetitive motion, posture).', 'Only red ones.', 'Only blue ones.'], correctAnswer: 1, explanation: 'Five broad categories cover most workplace hazards. The L3 supervisor uses these as a hazard-spotting framework on every job.' },
  { id: 4, question: 'What\'s an "exposure route"?', options: ['A road.', 'The pathway by which a hazard reaches and affects the body — inhalation, absorption, ingestion, injection. PPE selection and engineering controls follow the route.', 'A type of cable.', 'A dance move.'], correctAnswer: 1, explanation: 'Knowing the route lets you target the control. RPE for inhalation; gloves for absorption; hygiene for ingestion; sharps protocol for injection.' },
  { id: 5, question: 'What\'s a "control measure"?', options: ['Anything random.', 'Something that reduces the risk from a hazard. Sits in the hierarchy (eliminate → substitute → engineer → administer → PPE). Control measures are the operational expression of the risk assessment.', 'A type of music.', 'A type of cable.'], correctAnswer: 1, explanation: 'Control measure = the action / equipment / procedure that reduces the risk. Hierarchy of control orders them by effectiveness.' },
  { id: 6, question: 'What\'s "residual risk"?', options: ['Risk that\'s gone.', 'The risk remaining AFTER controls have been applied. Always some residual risk; the question is whether it\'s ALARP. PPE addresses residual risk after higher controls.', 'Risk that\'s growing.', 'Risk in another country.'], correctAnswer: 1, explanation: 'Residual risk = what\'s left after controls. PPE protects against residual; ALARP is the test of whether further reduction is required.' },
  { id: 7, question: 'How does the L3 supervisor distinguish hazard from risk in practice?', options: ['Doesn\'t.', 'Uses the words precisely. "There\'s a hazard here" means something has potential to cause harm — useful for hazard identification. "There\'s a high risk" means likelihood × severity is concerning — useful for control prioritisation. Mixing the terms loses clarity.', 'Random use.', 'Same meaning.'], correctAnswer: 1, explanation: 'L2 often uses "hazard" and "risk" interchangeably; L3 uses them precisely. The precision drives clearer communication in RAMS and toolbox talks.' },
  { id: 8, question: 'What\'s the relationship between hazard, risk, control and residual risk?', options: ['Disconnected.', 'Hazard exists; risk is the quantified threat from the hazard given exposure; control reduces the risk; residual risk is what remains after control. ALARP is achieved when residual risk is reduced to a point where further reduction would be grossly disproportionate to the cost.', 'No relationship.', 'Random sequence.'], correctAnswer: 1, explanation: 'The chain: hazard → risk → control → residual → ALARP. Understanding the chain lets you communicate the assessment intelligently.' },
];

const faqs = [
  { question: 'Can a hazard exist without risk?', answer: 'Theoretically — a hazard with no exposure route or no exposed population creates no risk. In practice you treat any identified hazard as risk-creating until you\'ve confirmed otherwise.' },
  { question: 'How do firms typically score risk?', answer: '3x3 or 5x5 matrices common. Likelihood (1=rare to 5=almost certain) × Severity (1=minor to 5=catastrophic). Score determines required level of control. Many digital RAMS systems automate the scoring.' },
  { question: 'What\'s a "tolerable" risk?', answer: 'A risk reduced to a level the organisation accepts after controls. Edges into ALARP — the level at which further reduction would be grossly disproportionate. Tolerable doesn\'t mean zero.' },
  { question: 'Why does the wording matter on RAMS?', answer: 'Inspectors and courts read the words. A RAMS that says "low hazard" when it means "high hazard, low risk" is misleading. Precision in wording demonstrates the assessment was done thoughtfully — sloppy wording suggests it wasn\'t.' },
  { question: 'How are hazards prioritised on an assessment?', answer: 'By risk score (likelihood × severity) AND by the population at risk. A high-severity, low-likelihood hazard affecting one operative may rank below a medium-severity, medium-likelihood hazard affecting twenty. The matrix gives the framework but human judgement applies.' },
  { question: 'What\'s the L3 supervisor\'s role in hazard identification?', answer: 'On site walk-rounds, dynamic risk assessments, observation, near-miss review. The L3 spots the hazards the static RAMS missed and feeds them back into the assessment. Plus coaches L2 mates to spot hazards themselves.' },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section4')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 4</button>
          <PageHero eyebrow="Module 1 · Section 4 · Subsection 2" title="Hazard — the L3 definition" description="Remember from L2 — hazard = potential to cause harm. At L3 you distinguish hazard from risk, identify exposure routes, evaluate likelihood × severity and apply ALARP." tone="emerald" />
          <TLDR points={[
            "Hazard = something with potential to cause harm. Risk = likelihood × severity of the hazard causing harm.",
            "Five hazard categories: physical (electrical / mechanical / noise / height / fire), chemical, biological, psychosocial, ergonomic.",
            "Four exposure routes: inhalation, absorption, ingestion, injection. PPE selection follows the route.",
          ]} />
          <LearningOutcomes outcomes={[
            "Define hazard in H&S legislation terms — potential to cause harm.",
            "Distinguish hazard from risk and use the words precisely.",
            "Identify the five categories of workplace hazard.",
            "Identify the four exposure routes and link to PPE / engineering controls.",
            "Apply likelihood × severity risk evaluation.",
            "Recognise the hazard → risk → control → residual → ALARP chain.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Hazard vs risk</ContentEyebrow>
          <ConceptBlock title="The precise definitions" plainEnglish="Hazard = something with potential to cause harm. Risk = likelihood × severity of the hazard causing harm given exposure. Same hazard can present different risks depending on exposure, controls and population." onSite="L3 uses the words precisely. 'There's a hazard here' identifies the threat source. 'There's a high risk' communicates priority. Mixing the terms — common at L2 level — loses analytical clarity.">
            <p>Worked examples:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>HAZARD: live electricity. RISK at a properly-isolated DB: very low. RISK at the same DB without isolation: very high.</li>
              <li>HAZARD: silica dust. RISK with on-tool extraction + FFP3 + time limit: moderate. RISK with mask only: high.</li>
              <li>HAZARD: fall from 4m. RISK with collective protection (scaffold guardrail): low. RISK with harness only: medium. RISK with no protection: very high.</li>
              <li>HAZARD: 230V shock. RISK to operative wearing insulating gloves on isolated circuit: very low. RISK to bystander touching exposed conductor: high.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="HSE definitions (HSG65 'Managing for Health and Safety')" clause={<>"A hazard is anything that may cause harm, such as chemicals, electricity, working from ladders, an open drawer etc. The risk is the chance, high or low, that somebody could be harmed by these and other hazards, together with an indication of how serious the harm could be."</>} meaning={<>HSG65 is the HSE&apos;s practitioner guidance for H&amp;S management. The hazard / risk distinction is foundational and the precise language is what &quot;suitable and sufficient&quot; assessment under MHSWR Reg 3 expects.</>} cite="Source: HSE HSG65 'Managing for Health and Safety' — published by HSE." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>Exposure routes and hazard categories</ContentEyebrow>
          <ConceptBlock title="The four exposure routes" plainEnglish="Hazardous substances reach the body via four main routes: inhalation (breathing), absorption (skin / eyes / mucous), ingestion (swallowing — often via contaminated hands and food), injection (puncture / cut). PPE selection follows the route." onSite="L3 supervisor identifies the relevant route(s) for each substance and matches the controls. RPE for airborne; gloves for skin contact; hygiene routines for ingestion; sharps protocols for injection.">
            <p>Routes mapped to common controls:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Inhalation</strong> — extraction at source, ventilation, RPE.</li>
              <li><strong>Absorption</strong> — gloves, sleeves, eye protection, washing.</li>
              <li><strong>Ingestion</strong> — separate eating area, no smoking / eating in work zones, hand washing.</li>
              <li><strong>Injection</strong> — sharps containers, cut-resistant gloves, careful handling.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Five hazard categories" plainEnglish="Workplace hazards fall into broad categories. Knowing them is a hazard-spotting framework on site." onSite="The L3 walk-round mentally cycles through the five — what's the physical hazard here? Chemical? Biological? Psychosocial? Ergonomic? Catches things a one-track mindset misses.">
            <p>The five categories with electrical-trade examples:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Physical</strong> — electricity, mechanical (tools, moving plant), noise, vibration, working at height, slips/trips, fire, ionising / non-ionising radiation.</li>
              <li><strong>Chemical</strong> — substances per CLP, dust (silica), fume (solder), refrigerant, lead.</li>
              <li><strong>Biological</strong> — bacteria, viruses, mould, allergens (latex), animal contact (rats in voids).</li>
              <li><strong>Psychosocial</strong> — stress, fatigue, lone working, violence (rare in trade but real on some sites), bullying.</li>
              <li><strong>Ergonomic</strong> — manual handling, awkward postures, repetitive motion, prolonged standing.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />
          <ContentEyebrow>Risk evaluation</ContentEyebrow>
          <ConceptBlock title="Likelihood × Severity matrix" plainEnglish="The standard risk-evaluation method. Likelihood scale (1 rare → 5 almost certain). Severity scale (1 minor → 5 catastrophic). Multiplied gives a score that drives the control requirement." onSite="3x3 (low/medium/high) or 5x5 (more nuanced) matrices are common. Score doesn't need to be precise — it provides structure and prioritisation. The supervisor judgement on what's likely and how severe is what makes the matrix useful.">
            <p>Typical 5x5 matrix scoring:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1-4 (low)</strong> — proceed with standard controls.</li>
              <li><strong>5-9 (medium)</strong> — additional controls / monitoring.</li>
              <li><strong>10-15 (high)</strong> — significant control measures required; escalation considered.</li>
              <li><strong>16-25 (very high)</strong> — work should not proceed without major intervention.</li>
              <li>Modified by population exposed (one operative vs the public).</li>
              <li>Modified by reversibility of harm (recoverable vs permanent / fatal).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>ALARP, populations and supervisor judgement</ContentEyebrow>
          <ConceptBlock title="ALARP applied — the cost-disproportion test" plainEnglish="Risk reduction stops when further reduction would be grossly disproportionate to the residual risk. The court weighs probability of harm, severity, cost of further controls, industry good practice and state of knowledge. The disproportion must be GROSS — small disproportion isn&apos;t enough." onSite="Practical L3 application: when arguing for an additional control, the cost is rarely grossly disproportionate. \&quot;An extra £200 on a £20,000 job to prevent a £100,000 silicosis claim isn&apos;t disproportionate.\&quot; The maths usually favours more control, not less.">
            <p>ALARP factors a court weighs:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Probability of harm (how likely the event is).</li>
              <li>Severity of harm (how bad if it occurs).</li>
              <li>Number of persons exposed.</li>
              <li>Cost of further controls (money, time, trouble).</li>
              <li>Industry good practice / HSE-published guidance.</li>
              <li>State of knowledge at the time of decision.</li>
              <li>Reversibility of harm (recoverable vs permanent).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Population at risk — non-employees too" plainEnglish="HASAWA s.3 places duties on employers regarding non-employees affected by the undertaking — customers, public, other contractors, vulnerable persons. Risk assessment under MHSWR Reg 3(b) explicitly covers this population. The L3 supervisor identifies who&apos;s exposed beyond the immediate work team." onSite="Customers walking past the work area, children in a school during term-time, residents in adjacent flats, other trades crossing through — all part of the at-risk population. Controls must address them too: exclusion zones, signage, scheduling, supervision.">
            <p>Common non-employee populations on electrical jobs:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Domestic customers</strong> — including children, elderly, vulnerable.</li>
              <li><strong>Commercial occupants</strong> — staff, visitors, members of the public.</li>
              <li><strong>School / hospital</strong> — children, patients, vulnerable.</li>
              <li><strong>Other trades</strong> — building services, decoration, security working in parallel.</li>
              <li><strong>Public</strong> — passers-by where work affects pavement / public area.</li>
              <li><strong>Cleaning / facilities staff</strong> — out-of-hours access.</li>
              <li><strong>Emergency services</strong> — if response needed; they&apos;re affected too.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Risk perception — why operatives mis-judge" plainEnglish="Humans systematically mis-perceive risk. Familiar hazards seem less dangerous than novel ones (driving feels safer than flying despite stats). Voluntary risks feel less than imposed ones. Catastrophic events get over-weighted; chronic exposure under-weighted. The L3 supervisor pushes back on these biases when they distort decisions." onSite="\&quot;I&apos;ve done it 100 times without incident\&quot; is a familiarity bias, not evidence of safety. \&quot;It&apos;s only a 230V circuit\&quot; is voluntary-risk under-weighting. The L3 supervisor names the bias and re-frames against the actual data.">
            <p>Common risk-perception biases:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Familiarity bias</strong> — repeated exposure feels safer than it is.</li>
              <li><strong>Voluntary vs imposed</strong> — chosen risks feel less than imposed ones.</li>
              <li><strong>Catastrophe / chronic asymmetry</strong> — single big events over-weighted; cumulative exposure under-weighted.</li>
              <li><strong>Optimism bias</strong> — \&quot;won&apos;t happen to me\&quot;.</li>
              <li><strong>Availability heuristic</strong> — recent events over-weight perceived likelihood.</li>
              <li><strong>Authority bias</strong> — \&quot;the boss said it&apos;s OK\&quot; over-rides own judgement.</li>
              <li><strong>Sunk-cost fallacy</strong> — \&quot;I&apos;m almost done, I&apos;ll just finish\&quot; ignores rising risk.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Dynamic re-assessment when conditions change" plainEnglish="The static RAMS captures the assessment at survey time. Conditions on the day may differ. The L3 supervisor leads the dynamic re-assessment: walk-round on arrival, ID divergences from RAMS, decide on adaptation or escalation, document the dynamic version." onSite="Five minutes of walk-round catches the differences static can&apos;t. Weather, occupancy, parallel trades, customer changes, equipment availability — all can shift the risk profile from RAMS expectation. The L3 supervisor closes the gap with dynamic assessment.">
            <p>Triggers for dynamic re-assessment:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Arrival on site (every job, every day).</li>
              <li>Weather change during the day.</li>
              <li>New trade arrives or starts work.</li>
              <li>Customer changes scope or schedule.</li>
              <li>Equipment failure or substitute needed.</li>
              <li>Operative absence or substitution.</li>
              <li>Hazard discovered (asbestos, structural, services).</li>
              <li>Near-miss or minor incident occurs.</li>
              <li>Public / vulnerable person enters the area.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="MHSWR 1999 — Reg 4 + Schedule 1 (Principles of prevention)" clause={<>"Where an employer implements any preventive and protective measures he shall do so on the basis of the principles specified in Schedule 1 to these Regulations."</>} meaning={<>Schedule 1 lists the principles in priority order: avoid risk, evaluate unavoidable risks, combat at source, adapt work to the individual, adapt to technical progress, replace dangerous with less dangerous, develop a coherent prevention policy, give collective protective measures priority over individual, give appropriate instructions. The hierarchy is statutory, not advisory.</>} cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 4 + Sched 1 — verbatim from legislation.gov.uk." />

          <RegsCallout source="HASAWA 1974 — s.3 (General duties to persons other than employees)" clause={<>"It shall be the duty of every employer to conduct his undertaking in such a way as to ensure, so far as is reasonably practicable, that persons not in his employment who may be affected thereby are not thereby exposed to risks to their health or safety."</>} meaning={<>s.3 — duties to non-employees. Customers, public, other contractors all in scope. The risk assessment must consider the full at-risk population, not just the work team. Controls must address the wider population (exclusion zones, signage, scheduling).</>} cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.3 — verbatim from legislation.gov.uk." />

          <SectionRule />
          <CommonMistake title="Confusing hazard and risk in toolbox talks" whatHappens={<>Supervisor says &quot;there&apos;s a high hazard with this circuit&quot; when they mean &quot;there&apos;s a high risk because we haven&apos;t isolated it yet&quot;. Operatives confuse the framing; some over-react, some under-react. The communication isn&apos;t precise.</>} doInstead={<>&quot;There&apos;s a HAZARD — live electricity in this circuit. Once isolated and locked off, the RISK to us drops to very low. Our job is to maintain the controls.&quot; Precise wording = clearer communication.</>} />

          <CommonMistake title="Identifying hazards but not exposure routes" whatHappens={<>Operatives know &quot;silica is a hazard&quot; but don&apos;t link to the inhalation route specifically. PPE is dust mask only; no extraction. Long-term silica exposure occurs because the control didn&apos;t target the route.</>} doInstead={<>Identify hazard → identify exposure route → select control that targets the route. Inhalation = capture at source + ventilation + RPE.</>} />

          <Scenario title="Walking a site applying the hazard / risk framework" situation={<>You arrive at a small commercial unit for a one-day install. The customer mentions there's been recent water ingress through the roof; some areas have damp; older fluorescent fittings are still in place; the building dates from the 1970s; your work involves drilling and chasing for new sockets.</>} whatToDo={<>Apply the framework. Hazards identified: (1) water ingress + electrical equipment = electrical risk if energised areas are wet — HIGH RISK if not isolated; (2) damp + drilling = potential to disturb mould (biological hazard) — moderate risk; (3) older fluorescents = WEEE waste stream + potential mercury if broken; (4) 1970s construction = potential asbestos in textured ceiling, lining boards, possibly cement products — pre-2000 build presumption applies (CAR 2012); (5) drilling and chasing = silica dust (chemical, inhalation) and mechanical (drill bit, debris). Risk evaluations: water + electricity = HIGH (5x5: likelihood 4, severity 5 = 20 — STOP, isolate, dry); damp/mould = MEDIUM (likelihood 3, severity 2 = 6); WEEE = LOW for handling, MEDIUM if broken; asbestos = HIGH PRESUMED until survey rules out (likelihood 4, severity 5 = 20); silica = MEDIUM with engineering + PPE controls (likelihood 4, severity 3 = 12 → reduce by control). Actions: isolate damp/wet areas before any electrical work; check for asbestos register / refurbishment survey before drilling into pre-2000 ceilings or walls; on-tool extraction + FFP3 for chasing; segregate and consign WEEE properly. Document in dynamic assessment. Escalate to firm if asbestos can&apos;t be ruled out — work shouldn&apos;t proceed in disturbance scope without survey.</>} whyItMatters={<>The framework turns &quot;walk the site&quot; into a structured judgement. Each hazard gets identified, characterised, evaluated and controlled. The output isn&apos;t a perfect numerical risk score; it&apos;s a defensible structured analysis that the L3 supervisor can communicate clearly to the team and document in the dynamic risk assessment. The HSE inspector reviewing the assessment after any incident sees structured thinking, not vague generalities.</>} />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from L2 — hazard = potential to cause harm. At L3 you distinguish hazard from risk and use the words precisely.",
            "Hazard ≠ risk. Hazard = potential. Risk = likelihood × severity given exposure and controls.",
            "Five hazard categories: physical, chemical, biological, psychosocial, ergonomic.",
            "Four exposure routes: inhalation, absorption, ingestion, injection. PPE follows the route.",
            "Risk evaluation: Likelihood × Severity matrix (3x3 or 5x5). Score drives control requirement.",
            "Chain: hazard → risk → control → residual risk → ALARP.",
            "Modify scoring for population exposed and reversibility of harm.",
            "L3 supervisor uses the framework for hazard identification on site walk-rounds and for clear communication in RAMS / toolbox talks.",
          ]} />
          <Quiz title="Hazard definition — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section4-1')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">4.1 CLP pictograms</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section4-3')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">4.3 Specific electrical hazards</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
