/**
 * Module 1 · Section 6 · Subsection 6 - Equality Act 2010 + near-miss culture
 * Maps to C&G 2365-03 / Unit 201 — supplementary depth (beyond AC framework)
 * Layered depth from 2357 Unit 601 ELTK01 - closing module on inclusive workplace and learning culture
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Equality Act 2010 + near-miss culture | Level 3 Module 1.6.6 | Elec-Mate';
const DESCRIPTION = 'L3 closing topics - Equality Act 2010 reasonable adjustments, PEEPs, and the L3 supervisor role in building near-miss culture.';

const checks = [
  { id: 'l3-m1-s6-sub6-eqa', question: 'What\'s the Equality Act 2010 "protected characteristics"?', options: [
    'Nine: age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, sexual orientation. Discrimination on these grounds unlawful.',
    'Five: age, disability, race, sex and religion — the original characteristics carried over from the earlier discrimination Acts.',
    'Seven: age, disability, race, sex, sexual orientation, religion and trade union membership.',
    'Three broad categories: physical disability, mental health condition and long-term illness, as defined by an occupational health assessment.',
  ], correctIndex: 0, explanation: 'Nine protected characteristics. Equality Act covers all workplaces and many service contexts. L3 supervisor maintains inclusive practice.' },
  { id: 'l3-m1-s6-sub6-peep', question: 'Who needs a PEEP?', options: [
    'Every person on site, since each worker must have an individual evacuation plan tailored to their exact location.',
    'Anyone who can\'t use the standard evacuation route unaided - wheelchair users, sensory impaired, cognitive impairment, temporary impairment (broken leg, late pregnancy). Required where reasonable adjustment is needed.',
    'Only permanent wheelchair users; temporary impairments such as a broken leg or late pregnancy are excluded.',
    'Only the appointed fire marshals, who lead the evacuation and therefore need a documented personal plan.',
  ], correctIndex: 1, explanation: 'PEEP needed where standard evacuation insufficient. Equality Act + RRFSO 2005 + MHSWR Reg 3.' },
  { id: 'l3-m1-s6-sub6-near-miss', question: 'Why is near-miss culture the highest-impact preventive activity?', options: [
    'Because near-misses are legally reportable to the HSE under RIDDOR, so reporting them avoids enforcement action.',
    'Because near-miss reporting transfers liability for any future incident from the employer to the worker who reported it.',
    'Because near-misses are leading indicators of where the next incident will occur, so acting on them prevents it.',
    'Because near-miss reports satisfy the insurer\'s record-keeping requirements and reduce employer\'s liability premiums.',
  ], correctIndex: 2, explanation: 'Reporting + analysis + lessons-learned + visible changes turns near-misses into systemic prevention - cheap, effective and aligned with MHSWR Reg 5. Near-miss culture is the cheapest, most effective preventive practice; many firms have weak reporting while mature firms have strong.' },
];

const quizQuestions = [
  { id: 1, question: 'What does Equality Act 2010 require of employers?', options: [
    'Provide identical working conditions, equipment and hours to every worker so that all employees are treated exactly the same.',
    'Don\'t discriminate against workers / job applicants on protected characteristics; make reasonable adjustments for disabled persons; protect from harassment and victimisation; ensure inclusive workplace practices.',
    'Carry out an annual occupational health assessment of every employee and record the results in a confidential register.',
    'Apply positive discrimination in recruitment to ensure each protected characteristic is represented in proportion to the local population.',
  ], correctAnswer: 1, explanation: 'Comprehensive duty. Workplace inclusion + reasonable adjustments + protection from harassment.' },
  { id: 2, question: 'What\'s a "reasonable adjustment"?', options: [
    'A small change to the wording of a method statement so it is easier for the team to read and understand.',
    'A discretionary pay rise offered to a disabled employee to compensate for any additional difficulty in their role.',
    'A change to a working arrangement, equipment or environment that removes a substantial disadvantage faced by a disabled person.',
    'A relaxation of safety rules for a disabled worker so they are not held to the same standards as colleagues.',
  ], correctAnswer: 2, explanation: 'A specific Equality Act duty; "reasonable" balances cost, disruption and effectiveness, and failure to make one is unlawful discrimination. Examples: ergonomic equipment, modified work patterns, accessible facilities, communication aids.' },
  { id: 3, question: 'What\'s the relationship between PEEP and Equality Act?', options: [
    'There is no relationship — PEEPs sit entirely under fire safety law and have nothing to do with the Equality Act.',
    'A PEEP is required only by the Equality Act and has no connection to fire safety or risk assessment legislation.',
    'A PEEP replaces the need for a general evacuation plan once a disabled person is identified in the building.',
    'PEEPs are reasonable adjustments under the Equality Act and also safety arrangements under fire-safety and risk-assessment law.',
  ], correctAnswer: 3, explanation: 'PEEPs sit at the intersection of the Equality Act, RRFSO 2005 and MHSWR Reg 3 - failure to provide one for someone who needs it is both unlawful discrimination and a safety breach. Multiple legal obligations converge.' },
  { id: 4, question: 'What\'s a near-miss?', options: [
    'An event that could have caused injury but didn\'t - a leading indicator of latent risk.',
    'Any minor injury that required first aid but did not result in time off work.',
    'A reportable injury, disease or dangerous occurrence that must be notified to the HSE under RIDDOR.',
    'A planned drill or exercise carried out to test the site\'s emergency response arrangements.',
  ], correctAnswer: 0, explanation: 'Examples: slips without a fall, tool drops without injury, almost-contact with energised conductors, RAMS-procedure shortcuts spotted before an incident. A near-miss is a potential incident that didn\'t cause harm; reporting + analysis turns it into prevention.' },
  { id: 5, question: 'What\'s "Heinrich\'s pyramid" in safety?', options: [
    'A hierarchy of control measures, with elimination at the top and PPE at the base, applied in order of effectiveness.',
    'A loose ratio framework - many near-misses underlie fewer minor injuries, fewer serious injuries and rare fatalities.',
    'A model showing how the cost of an accident rises sharply the later it is discovered in a project.',
    'A risk-rating matrix that multiplies the likelihood of an event by the severity of its consequences.',
  ], correctAnswer: 1, explanation: 'Common formulations are around 300:30:1 (near-misses : minor injuries : serious injury). Heinrich\'s pyramid is conceptual not exact - the point is the relationship: many near-misses underlie each serious incident, so tackling near-misses reduces serious incidents.' },
  { id: 6, question: 'What does a strong near-miss culture look like?', options: [
    'A system where every near-miss is investigated to identify and discipline the individual responsible.',
    'A monthly target requiring each worker to submit a minimum number of near-miss reports.',
    'No-blame, easy reporting with structured analysis, feedback to the team, visible changes and leadership modelling.',
    'A confidential register held only by senior management and never shared with the workforce.',
  ], correctAnswer: 2, explanation: 'A multi-element culture: no-blame reporting, an easy reporting mechanism, structured analysis (5-whys, root cause), feedback to the team, visible changes in practice, trend tracking, celebrating the act of reporting (not the near-miss) and leadership modelling. Each element supports the others; a weak link breaks the system.' },
  { id: 7, question: 'What\'s the L3 supervisor\'s role in inclusive practice?', options: [
    'Leave all equality matters to the HR department and avoid involvement to prevent making mistakes.',
    'Treat every team member identically, ignoring individual needs so no one can claim favouritism.',
    'Report any colleague needing a reasonable adjustment to the client so they can decide whether to keep them on site.',
    'Model inclusive language, accommodate reasonable adjustments and PEEPs where needed, and intervene against discrimination.',
  ], correctAnswer: 3, explanation: 'The supervisor models inclusive language, identifies and accommodates reasonable adjustments, ensures PEEPs are in place where required, intervenes against discriminatory behaviour, documents and escalates persistent issues. Equality Act practice runs through the supervisor - modelling, intervention, escalation.' },
  { id: 8, question: 'How does the L3 supervisor build near-miss culture?', options: [
    'Model the behaviour - report your own near-misses openly and encourage colleagues to report theirs without blame.',
    'Keep near-miss reports private to avoid alarming the workforce or the client about site risks.',
    'Only record near-misses that involve electrical hazards, since other trades manage their own reporting.',
    'Wait until a serious incident occurs before introducing reporting, so the team understands why it matters.',
  ], correctAnswer: 0, explanation: 'Analyse reports with the team, feed lessons forward and celebrate the report (not the near-miss); cultural change is cumulative over months and years. Culture is built one report at a time, and the L3 supervisor\'s consistent modelling is what shifts team behaviour.' },
];

const faqs = [
  { question: 'Is the Equality Act 2010 the same across UK?', answer: 'Yes - applies to England, Scotland, Wales (Northern Ireland has separate but similar provisions). Workplace duties apply to all employers regardless of size.' },
  { question: 'Who decides what\'s a "reasonable" adjustment?', answer: 'Employer in consultation with the disabled person. Tribunal can ultimately decide if disputed. Cost, disruption, effectiveness all weighed. "Reasonable" is judged in context of the employer\'s resources and the adjustment\'s impact.' },
  { question: 'Are L3 apprentices likely to encounter Equality Act issues?', answer: 'Yes - workplace inclusion, customer accommodation, dealing with vulnerable customers, working alongside colleagues with various needs. The Act is operational on every site.' },
  { question: 'What\'s the difference between near-miss and "no-harm event"?', answer: 'Sometimes used interchangeably. Near-miss typically implies potential for harm that didn\'t materialise (the right cable was cut, but it was already isolated). No-harm event covers near-misses plus events where no harm was possible.' },
  { question: 'What if my firm doesn\'t have a near-miss reporting system?', answer: 'Document in job-pack notebook; raise to supervisor / H&S manager. The absence of a system is itself an issue worth raising. Many firms develop near-miss culture incrementally.' },
  { question: 'How does near-miss culture interact with the firm\'s safety system?', answer: 'Near-miss data feeds POCMR review (MHSWR Reg 5); informs RAMS updates; shapes toolbox-talk topics; identifies training gaps; underpins competence development.' },
  { question: 'How does the Worker Protection (Amendment) Act 2023 change employer obligations?', answer: 'It introduced a positive duty on employers to take reasonable steps to prevent sexual harassment of workers, in force from October 2024. Tribunal can uplift compensation by up to 25% where the employer failed to comply. Employers must move from reactive to proactive — policy, training, clear reporting routes, prompt action on reports. EHRC technical guidance sets the expected steps.' },
  { question: 'What is Just Culture and why does it matter for near-miss reporting?', answer: 'Just Culture distinguishes honest error (system response — improve controls), at-risk behaviour (coach the operative), and reckless behaviour (discipline). The same incident can land in any category depending on decision quality. The framework encourages reporting because honest error is genuinely safe to report. Originally aviation-derived, now widely adopted across high-risk industries.' },
  { question: 'How does ERA s.44 link to Equality Act protection?', answer: 'ERA 1996 s.44 protects from detriment for raising a health-and-safety concern; Equality Act 2010 s.27 protects from detriment for raising a discrimination concern. Both protect the act of raising — neither requires the underlying complaint to succeed. Together they form the workplace-voice protection framework — refusal of an unsafe instruction, raising a discrimination complaint, supporting a colleague\'s grievance all attract statutory protection.' },
  { question: 'What records support a defence to a discrimination claim?', answer: 'Recruitment criteria and process; selection decisions and reasoning; training delivery; reasonable adjustment requests and outcomes; complaint handling; investigation reports; disciplinary records; equal pay records. The reverse burden of proof shifts to the employer once a prima facie case is established — without records, the defence collapses.' },
];

export default function Sub6() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section6')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 6</button>
          <PageHero eyebrow="Module 1 · Section 6 · Subsection 6" title="Equality Act 2010 + near-miss culture" description="Closing topics for Module 1. Equality Act 2010 inclusive practice + PEEPs + the L3 supervisor role in building near-miss culture - the highest-impact preventive practice." tone="emerald" />
          <TLDR points={[
            "Equality Act 2010 - nine protected characteristics; reasonable adjustments duty; harassment / victimisation protection; inclusive workplace.",
            "Four types of unlawful discrimination — direct, indirect, harassment, victimisation. The L3 supervisor names the type when escalating.",
            "PEEPs sit at intersection of Equality Act + RRFSO 2005 + MHSWR Reg 3. Required where standard evacuation insufficient.",
            "Worker Protection (Amendment) Act 2023 — positive duty on employers to prevent sexual harassment from October 2024; tribunal uplift up to 25%.",
            "Near-miss culture is the highest-impact preventive practice. No-blame reporting + analysis + visible changes + leadership modelling.",
            "Just Culture distinguishes honest error / at-risk / reckless — same outcome, different response based on decision quality.",
          ]} />
          <LearningOutcomes outcomes={[
            "Identify the nine Equality Act 2010 protected characteristics.",
            "State the reasonable adjustment duty for disabled workers / customers.",
            "Recognise PEEPs as the intersection of Equality Act + fire safety + risk assessment.",
            "Define near-miss and explain its role as a leading indicator.",
            "Identify elements of a strong near-miss culture.",
            "Apply the L3 supervisor's role in inclusive practice and near-miss culture-building.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>Equality Act 2010</ContentEyebrow>
          <ConceptBlock title="Inclusive workplace and reasonable adjustments" plainEnglish="Equality Act 2010 covers nine protected characteristics. Workplace duties: don't discriminate, make reasonable adjustments for disabled persons, protect from harassment and victimisation, ensure inclusive practices. Applies to employers regardless of size." onSite="L3 supervisor practices inclusion: model inclusive language; identify and accommodate reasonable adjustments where needed; intervene against discriminatory behaviour; document. The Act is operational not aspirational.">
            <p>Nine protected characteristics:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Age</li>
              <li>Disability</li>
              <li>Gender reassignment</li>
              <li>Marriage and civil partnership</li>
              <li>Pregnancy and maternity</li>
              <li>Race</li>
              <li>Religion or belief</li>
              <li>Sex</li>
              <li>Sexual orientation</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Equality Act 2010 - s.20 (Duty to make adjustments)" clause={<>"Where a provision, criterion or practice of A's puts a disabled person at a substantial disadvantage in relation to a relevant matter in comparison with persons who are not disabled, the duty is to take such steps as it is reasonable to have to take to avoid the disadvantage."</>} meaning={<>The reasonable adjustment duty. Practical examples: ergonomic equipment, modified work patterns, accessible facilities, communication aids, PEEPs for evacuation. \"Reasonable\" balances cost, disruption, effectiveness in context of employer's resources.</>} cite="Source: Equality Act 2010 (2010 c.15), s.20." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>PEEPs - the intersection</ContentEyebrow>
          <ConceptBlock title="Where Equality Act, fire safety and risk assessment meet" plainEnglish="PEEPs are required where someone can't use the standard evacuation route unaided. Three legal frameworks converge: Equality Act 2010 reasonable adjustment, RRFSO 2005 fire safety, MHSWR 1999 Reg 3 risk assessment. Failure to provide a PEEP for someone needing one breaches all three." onSite="L3 supervisor checks: are PEEPs in place for anyone on site who needs one? On a customer site - the customer\'s responsible person handles. On a project site - the principal contractor / dutyholder. Operative cooperates with PEEP arrangements.">
            <p>PEEP elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Designated buddy(ies) responsible for assisting evacuation.</li>
              <li>Refuge point - typically protected lobby on stair with two-way communication device.</li>
              <li>Equipment as appropriate (evac chair, comms aid).</li>
              <li>Communication appropriate to the impairment.</li>
              <li>Re-entry sequence after all-clear.</li>
              <li>Regular drill participation to ensure plan works.</li>
              <li>Updated as the person\'s needs change.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />
          <ContentEyebrow>Near-miss culture</ContentEyebrow>
          <ConceptBlock title="The highest-impact preventive practice" plainEnglish="Near-misses are events that could have caused injury but didn\'t. Heinrich\'s loose pyramid (300:30:1 near-misses to minor to serious) frames their importance: many near-misses underlie each serious incident. Reporting + analysing + learning from near-misses is the cheapest, most effective preventive activity available." onSite="L3 supervisor builds the culture by modelling - report own near-misses openly; encourage colleagues; analyse without blame; feed lessons forward; celebrate the report (not the near-miss). Cumulative culture change over months and years.">
            <p>Strong near-miss culture elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>No-blame reporting</strong> - the goal is learning, not punishment.</li>
              <li><strong>Easy reporting mechanism</strong> - form, app, verbal-then-logged.</li>
              <li><strong>Structured analysis</strong> - 5-whys, simple root-cause framework.</li>
              <li><strong>Feedback to team</strong> - &quot;here\'s what we learned&quot;.</li>
              <li><strong>Visible changes in practice</strong> driven by lessons.</li>
              <li><strong>Celebrate reporting</strong> - the act, not the near-miss.</li>
              <li><strong>Trend tracking</strong> - what categories are emerging?</li>
              <li><strong>Leadership modelling</strong> - L3 + supervisors report own near-misses openly.</li>
              <li><strong>Integration with Reg 5 POCMR</strong> - near-miss data feeds the management cycle.</li>
              <li><strong>Toolbox talks</strong> referencing recent near-misses for relevance.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>Direct, indirect and harassment under the Equality Act</ContentEyebrow>
          <ConceptBlock title="The four types of unlawful discrimination" plainEnglish="Equality Act 2010 distinguishes four types of unlawful discrimination: (1) Direct discrimination — less favourable treatment because of a protected characteristic; (2) Indirect discrimination — neutral practice that disadvantages a protected group disproportionately; (3) Harassment — unwanted conduct related to a characteristic, violating dignity or creating a hostile environment; (4) Victimisation — detriment for raising a discrimination complaint or supporting one. The L3 supervisor recognises and intervenes against all four." onSite="Common workplace examples: direct (refusing apprenticeship to a candidate because of pregnancy); indirect (a fitness requirement disadvantageous to women that is not job-essential); harassment (banter targeting religion or sexuality); victimisation (penalising someone for supporting a colleague&apos;s grievance). The L3 supervisor names the type when escalating.">
            <p>The four types in detail:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Direct</strong> — less favourable treatment because of characteristic; rarely justifiable except age (in limited cases).</li>
              <li><strong>Indirect</strong> — neutral practice that disadvantages protected group; potentially justifiable if proportionate means to legitimate aim.</li>
              <li><strong>Harassment</strong> — unwanted conduct related to characteristic, creating hostile / degrading / offensive environment; no justification defence.</li>
              <li><strong>Victimisation</strong> — detriment for protected acts (raising / supporting complaint, giving evidence).</li>
              <li>All four actionable in employment tribunal.</li>
              <li>No qualifying period for discrimination claims.</li>
              <li>Burden of proof shifts to employer once prima facie case established.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Equality Act 2010 — s.26 (Harassment)" clause={<>&quot;A person (A) harasses another (B) if — (a) A engages in unwanted conduct related to a relevant protected characteristic, and (b) the conduct has the purpose or effect of — (i) violating B&apos;s dignity, or (ii) creating an intimidating, hostile, degrading, humiliating or offensive environment for B.&quot;</>} meaning={<>The harassment definition. &quot;Effect&quot; matters even if the perpetrator&apos;s purpose was different — &quot;banter&quot; that creates a hostile environment is harassment regardless of intent. The L3 supervisor framing on toolbox banter that targets a characteristic: name it, intervene, document. Employer is vicariously liable for harassment by employees in the course of employment.</>} cite="Source: Equality Act 2010 (2010 c.15), s.26." />

          <ConceptBlock title="Worker Protection (Amendment) Act 2023 — sexual harassment duty" plainEnglish="The Worker Protection (Amendment of Equality Act 2010) Act 2023 introduced a positive duty on employers to take reasonable steps to prevent sexual harassment of their workers. Came into force October 2024. Tribunal can uplift compensation by up to 25% where employer failed to comply with the duty. Brings sexual harassment prevention into proactive territory rather than reactive only." onSite="L3 supervisor framing: the firm has a positive duty now, not just a reactive one. Toolbox-talk content on respectful workplace behaviour, clear reporting routes, prompt action on reports — all part of the reasonable steps the firm must take. Failure visible in subsequent claim = compensation uplift.">
            <p>Worker Protection Act elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Positive duty on employers to take reasonable steps to prevent sexual harassment.</li>
              <li>In force October 2024.</li>
              <li>Tribunal compensation uplift up to 25% for failure to comply.</li>
              <li>EHRC technical guidance sets out expected steps.</li>
              <li>Reasonable steps include: policy, training, clear reporting routes, action on reports.</li>
              <li>Risk-based approach — reasonable steps proportionate to organisation and risk.</li>
              <li>Vicarious liability for harassment by employees still applies.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Just Culture — the modern near-miss framing" plainEnglish="Just Culture (originally aviation-derived, now widely adopted) distinguishes between honest error (treat as learning), at-risk behaviour (coach), and reckless behaviour (discipline). The same near-miss can land in any category depending on the operative&apos;s decision-making — the framework lets organisations respond proportionately rather than blanket-blaming or blanket-protecting." onSite="L3 supervisor application: when analysing a near-miss, ask &quot;was this honest error, at-risk, or reckless?&quot;. Honest error = system failure to prevent it; coach the system. At-risk = drift to lower-tier behaviour despite knowing better; coach the operative. Reckless = conscious disregard of substantial risk; discipline. Same incident, three different responses depending on decision quality.">
            <p>Just Culture framework:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Honest error</strong> — slip, lapse, mistake despite reasonable care; system response (improve controls, training, design).</li>
              <li><strong>At-risk behaviour</strong> — drift to lower-tier control without conscious choice; coach to restore standard.</li>
              <li><strong>Reckless behaviour</strong> — conscious disregard of substantial risk; discipline up to dismissal.</li>
              <li>Distinguishes by quality of decision, not by outcome.</li>
              <li>Same outcome can land in any category depending on decision.</li>
              <li>Encourages reporting because honest error is genuinely safe to report.</li>
              <li>Compatible with Reg 5 POCMR — feeds management cycle.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="PEEPs in detail — designing the evacuation plan" plainEnglish="A Personal Emergency Evacuation Plan (PEEP) is a tailored evacuation plan for someone who cannot use the standard evacuation route unaided. Designed in consultation with the person; involves designated buddies; uses refuge points (typically protected lobby on stair with two-way communication device); may use evac chair or other equipment; rehearsed in drills; updated as needs change. Sits at intersection of Equality Act + RRFSO 2005 + MHSWR Reg 3." onSite="L3 supervisor on site evacuation considerations: who needs a PEEP? — wheelchair users, sensory-impaired colleagues, late-pregnancy, temporary impairment (recent injury, broken leg). On a customer site the customer&apos;s RP / PAP handles. On a project site the principal contractor handles. Confirm PEEPs are in place before any incident.">
            <p>PEEP design elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Consultation with the person (the design is collaborative).</li>
              <li>Designated buddies — typically two named individuals.</li>
              <li>Refuge point — protected lobby with two-way comms.</li>
              <li>Equipment as appropriate (evac chair, comms aid).</li>
              <li>Communication route appropriate to the impairment.</li>
              <li>Re-entry sequence after all-clear.</li>
              <li>Drill participation to confirm plan works.</li>
              <li>Generic (GEEP) for visitors with similar needs (e.g. wheelchair users in public buildings).</li>
              <li>Updated when person&apos;s needs change or building layout changes.</li>
              <li>Failure to provide PEEP for someone needing one breaches Equality Act + RRFSO + MHSWR.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="Equality Act 2010 — s.27 (Victimisation)" clause={<>&quot;A person (A) victimises another person (B) if A subjects B to a detriment because — (a) B does a protected act, or (b) A believes that B has done, or may do, a protected act.&quot;</>} meaning={<>Victimisation protection covers the act of raising a discrimination complaint, supporting a colleague&apos;s complaint, or giving evidence. The protected act does not need to succeed — the worker is protected from detriment for the act of raising or supporting. Mirrors ERA s.44 in structure for safety; together they form the workplace-voice protection framework.</>} cite="Source: Equality Act 2010 (2010 c.15), s.27." />

          <ConceptBlock title="Inclusive site practice — practical L3 supervisor actions" plainEnglish="Inclusive practice is operational: how the L3 supervisor speaks, briefs, allocates work, intervenes against unacceptable behaviour, accommodates needs, and models respect. Cumulative effect over time shapes team culture. Particular attention to apprentices, women in trade contexts, racially-minoritised workers, disabled colleagues, LGBT colleagues — all groups still under-represented in electrical trade." onSite="Daily practice: use chosen names; check in on apprentices; intervene against banter that targets characteristics; arrange reasonable adjustments without making a fuss; model the behaviour you expect. Inclusion is not a separate activity — it is the texture of how the team works.">
            <p>Practical inclusive supervisor actions:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use chosen / preferred names; correct pronunciation.</li>
              <li>Check in on apprentices, especially those in under-represented groups.</li>
              <li>Intervene immediately against discriminatory banter — name it, stop it.</li>
              <li>Allocate development opportunities fairly, not by network.</li>
              <li>Arrange reasonable adjustments practically and quietly.</li>
              <li>Model respect — language, listening, attribution of credit.</li>
              <li>Document discriminatory incidents for escalation.</li>
              <li>Engage the firm&apos;s HR / inclusion lead for persistent issues.</li>
              <li>Recognise the cumulative effect of consistent practice.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <CommonMistake title="Treating near-miss reports as opportunities to blame" whatHappens={<>Operative reports near-miss honestly; supervisor uses it to discipline / criticise / blame. Operative learns not to report; near-miss reporting collapses; latent risks accumulate; serious incident eventually follows.</>} doInstead={<>No-blame reporting culture. Treat the report as the act of professional integrity it is. Analyse for systemic causes (not personal blame). Feed lessons forward. The next operative who reports honestly is more important than the one in front of you.</>} />

          <CommonMistake title="Failing to provide reasonable adjustment for an apprentice with a disability" whatHappens={<>L2 apprentice has a disability requiring modified equipment / arrangements. Firm doesn\'t provide; apprentice struggles; productivity / safety affected; eventual tribunal claim under Equality Act + reputational damage.</>} doInstead={<>Identify needs early; engage with the apprentice; implement reasonable adjustments. Inclusive practice + safety + commercial sense all aligned.</>} />

          <Scenario title="Building near-miss culture in a small team" situation={<>You\'re an L3 supervisor leading a small team (3 operatives). The firm has a near-miss reporting system but reporting volume is low. You suspect operatives are reluctant to report. You want to build the culture.</>} whatToDo={<>Lead by example. (1) At toolbox talk, share a near-miss you\'ve had recently - what happened, what you noticed, what you\'d do differently. Sets tone that reporting is normal and respected. (2) Encourage colleagues to share theirs - explicitly no-blame, focus on what we learn. (3) Analyse together using simple 5-whys - what was the root cause? (4) Document in the firm\'s system; submit to H&amp;S manager. (5) Follow up at next toolbox - &quot;here\'s what changed because of last week\'s near-miss reports&quot;. (6) Celebrate the act of reporting (not the near-miss) - public acknowledgement, perhaps small recognition. (7) Repeat consistently over months. (8) Track reporting volume as a leading indicator - increasing volume = healthier culture. The shift is gradual but powerful; mature firms have routinely 5-10x more near-miss reports per operative-hour than weak ones, and correspondingly fewer serious incidents.</>} whyItMatters={<>Near-miss culture is one of the highest-leverage practices the L3 supervisor can build. Each report is a chance to prevent a future incident at almost zero cost. The cumulative effect over years is profound - both in safety outcomes and in team trust / cohesion. The L3 supervisor\'s consistent modelling is what shifts team behaviour from reluctance to engagement. This closing scenario for Module 1 captures the supervisor mindset: practical, leadership-oriented, focused on the system not the individual.</>} />

          <SectionRule />
          <ContentEyebrow>Reasonable adjustment and PEEPs in practice</ContentEyebrow>

          <ConceptBlock
            title="Equality Act 2010 reasonable-adjustment duty applied to electrical work"
            plainEnglish="The Equality Act 2010 imposes a duty on employers and service providers to make reasonable adjustments for disabled people. For the electrical trade this works in two directions: (1) for employees and apprentices with disabilities, the firm must adjust equipment, working arrangements and recruitment processes; (2) for customers / occupants with disabilities affected by the work, the firm must consider their needs in scheduling, communication and safety arrangements. Personal Emergency Evacuation Plans (PEEPs) are the specific tool for ensuring disabled occupants can be safely evacuated in emergency — a real consideration when working on fire alarm or emergency lighting in occupied premises with disabled occupants."
            onSite="The L3 supervisor reflex: identify any reasonable-adjustment relevance early — apprentice needs, customer needs, occupant needs — and engage the firm&apos;s HR / contracts manager for arrangements. The adjustments are usually small (modified tools, alternative communication, scheduling around medical appointments, ensuring evacuation routes work for disabled occupants during work hours) but the impact on individuals is significant. PEEPs specifically: any occupied premises with disabled residents need a PEEP for each disabled person; the L3 supervisor checks that the work doesn&apos;t compromise the PEEP route or arrangements."
          >
            <p>Common reasonable adjustments in electrical work:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Apprentices with dyslexia</strong> — verbal briefings, recorded
                instructions, simplified RAMS summaries, additional time for written
                assessments.
              </li>
              <li>
                <strong>Hearing impairment</strong> — visual alarms, written
                communication, sign-language interpreter for key briefings, vibrating
                personal alarms.
              </li>
              <li>
                <strong>Mobility impairment</strong> — modified access, assistive
                equipment, work allocation suited to capability.
              </li>
              <li>
                <strong>Mental health conditions</strong> — supportive supervision,
                flexible working where reasonably practicable, EAP referral.
              </li>
              <li>
                <strong>Diabetic / medical conditions</strong> — break scheduling, food
                / drink access, awareness of hypoglycaemic warning signs in colleagues.
              </li>
              <li>
                <strong>Customer reasonable adjustments</strong> — alternative
                communication (written / face-to-face / phone), scheduling around
                vulnerability, additional explanation of safety arrangements.
              </li>
              <li>
                <strong>PEEPs for occupants</strong> — Personal Emergency Evacuation
                Plans for disabled residents in occupied premises; the work plan must
                not compromise PEEP routes or arrangements.
              </li>
              <li>
                <strong>Documentation</strong> — adjustments recorded as part of normal
                competence / training records; no special &apos;disability file&apos;
                that singles individuals out.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Heinrich&apos;s pyramid, Bird&apos;s ratio and the modern critique</ContentEyebrow>

          <ConceptBlock
            title="HSE leading indicators — what to measure beyond injuries"
            plainEnglish="HSE methodology for proactive safety management distinguishes lagging indicators (injuries, RIDDOR reports, claims) from leading indicators (near-miss reports, training currency, RAMS quality, toolbox talk frequency, audit findings, behavioural observation programmes). Lagging indicators count past harm; leading indicators measure the system that produces or prevents harm. Mature firms track both; struggling firms track only lagging. The L3 supervisor contributes leading-indicator data — near-miss reports, training records, observation findings — that complements the firm&apos;s lagging-indicator monitoring."
            onSite="L3 supervisor framing: leading indicators are early-warning. Falling near-miss reporting volume in a team is an alarm — either reporting culture has weakened or hazards have actually reduced (rarely the latter without explanation). Rising near-miss reporting volume is healthy — culture is mature; team is engaged. Training currency gaps are leading indicators of competence failure. RAMS quality observations are leading indicators of procedural drift. The L3 supervisor watches the leading indicators because they predict where the next lagging indicator will appear."
          >
            <p>Leading and lagging indicators:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lagging indicators</strong> — injuries, RIDDOR reports, claims, lost time.</li>
              <li><strong>Leading indicators</strong> — near-miss reports, training currency, RAMS quality, audit findings.</li>
              <li><strong>Behavioural observation programmes</strong> — peer observation; coaching; trend tracking.</li>
              <li><strong>Reporting volume trend</strong> — falling = alarm; rising = healthy engagement.</li>
              <li><strong>Training currency</strong> — % operatives within refresher window; leading indicator of competence.</li>
              <li><strong>RAMS adequacy audit</strong> — sample review; gap identification.</li>
              <li><strong>Toolbox frequency</strong> — culture-shaping mechanism; tracked.</li>
              <li><strong>Mature firms</strong> — track both leading and lagging.</li>
              <li><strong>L3 contribution</strong> — leading-indicator data from team level.</li>
              <li><strong>HSE methodology</strong> — proactive safety management framework.</li>
              <li><strong>HSG65</strong> — &quot;Managing for health and safety&quot; — HSE guidance underpinning the leading-indicator approach.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Building a no-blame near-miss reporting system — the L3 supervisor playbook"
            plainEnglish="A no-blame near-miss reporting system needs three layers: (1) the mechanism — easy way to report (form, app, verbal-then-logged); (2) the response — what happens after a report (acknowledged, analysed, fed back, action taken); (3) the culture — consistent leadership behaviour over time. Most firms have layer 1; many have layer 2 in patchy form; few sustain layer 3. The L3 supervisor&apos;s lever is on layer 3 — the consistent modelling that signals reporting is welcome, that response is reliable, that learning is genuine."
            onSite="L3 playbook: (a) report own near-misses openly, including the embarrassing ones; (b) acknowledge team reports promptly with thanks; (c) run 5-whys with the team rather than alone; (d) feed visible changes back to the team — &quot;because of last week&apos;s report we changed X&quot;; (e) track reporting volume as leading indicator; (f) celebrate reporting (the act, not the near-miss) at team meetings; (g) protect reporters from blame even when others would punish; (h) integrate with Reg 5 POCMR cycle; (i) sustain over months and years. The system needs all nine; weak link breaks the culture."
          >
            <p>No-blame reporting playbook elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Report own near-misses</strong> — including embarrassing ones; signals reporting is normal.</li>
              <li><strong>Prompt acknowledgement</strong> — thank the reporter; sets the tone.</li>
              <li><strong>5-whys with team</strong> — collaborative analysis; teaches the method.</li>
              <li><strong>Visible changes fed back</strong> — &quot;because of last week&apos;s report we changed X.&quot;</li>
              <li><strong>Reporting volume tracked</strong> — leading indicator; rising = healthier culture.</li>
              <li><strong>Celebrate reporting (the act)</strong> — at team meetings; small recognition.</li>
              <li><strong>Protect reporters</strong> — from blame; from second-guessing by management.</li>
              <li><strong>Reg 5 POCMR integration</strong> — feeds management cycle.</li>
              <li><strong>Sustained over time</strong> — months and years; not a one-off campaign.</li>
              <li><strong>Trend analysis</strong> — what categories are recurring? What does that tell us?</li>
              <li><strong>Toolbox referencing</strong> — recent near-misses inform toolbox topics.</li>
              <li><strong>Cross-team learning</strong> — share lessons across teams within the firm.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The historical safety pyramid and what current research says"
            plainEnglish="Heinrich&apos;s original 1931 work on industrial accidents proposed a ratio: for every major injury, 29 minor injuries occur, underpinned by 300 no-injury accidents. Bird and Germain in 1969 refined this to 1 serious injury : 10 minor injuries : 30 property damage : 600 near-misses. Modern safety science accepts the qualitative principle (large base of low-consequence events underlies the apex of high-consequence ones) but rejects the precise numerical ratios — different industries, hazard types and reporting cultures produce different actual ratios. The operational conclusion remains valid: tackling near-misses prevents serious incidents at a leverage point invisible if you only measure injuries. The L3 supervisor doesn&apos;t need to cite the numbers exactly; the principle that near-miss reporting is the leading indicator is what matters."
            onSite="Modern critique to be aware of: some industries (rail, aviation) demonstrate that simple ratios miss systemic risk — the rare catastrophic event can have entirely different precursors than the routine near-miss. So the pyramid is necessary but not sufficient. The L3 supervisor still drives near-miss reporting (because it works for common occupational hazards) while also engaging with the firm&apos;s systemic risk register for the unusual / catastrophic possibility."
          >
            <p>Heinrich / Bird ratios and the modern view:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Heinrich 1931</strong> — 1 major : 29 minor : 300 no-injury.</li>
              <li><strong>Bird 1969</strong> — 1 serious : 10 minor : 30 property damage : 600 near-misses.</li>
              <li><strong>Qualitative principle valid</strong> — large base of low-consequence underlies apex of high-consequence.</li>
              <li><strong>Specific numbers debated</strong> — industry / hazard / culture dependent.</li>
              <li><strong>Modern critique</strong> — catastrophic events may have different precursors than routine injuries.</li>
              <li><strong>Operational conclusion</strong> — near-miss reporting is leading indicator; complement with systemic risk register.</li>
              <li><strong>Leverage point</strong> — invisible to injury-only metrics; visible to near-miss reporting.</li>
              <li><strong>HSE position</strong> — proactive safety management includes both leading (near-miss) and lagging (injury) indicators.</li>
              <li><strong>L3 supervisor application</strong> — drive near-miss reporting alongside engagement with systemic risk.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The L3 supervisor and the firm safety culture — feedback loops with management"
            plainEnglish="The L3 supervisor is the operational interface between management policy and team practice. Effective culture requires bi-directional feedback: management policy informs the supervisor; supervisor observations of how policy works in practice inform management; near-miss data, training gaps, RAMS adequacy, customer feedback all flow up; management decisions on resource, training, kit, and policy flow down. Without the loop, policy becomes paper and practice drifts. The L3 supervisor&apos;s craft includes upward communication — Reg 5 POCMR meetings, monthly H&amp;S report contributions, contributing to safety committee under Safety Representatives and Safety Committees Regulations 1977 / Health and Safety (Consultation with Employees) Regulations 1996."
            onSite="L3 supervisor upward communication channels: H&amp;S manager monthly check-in; safety committee representative; near-miss / incident reporting that includes supervisor observations on systemic causes; toolbox talk feedback to firm on operative response. The information feeds the firm&apos;s management cycle. A supervisor who only takes instruction and never feeds back becomes part of the policy-paper-drift problem."
          >
            <p>Feedback-loop elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Management to supervisor</strong> — policy, RAMS, training schedule, resources.</li>
              <li><strong>Supervisor to management</strong> — practical adequacy of policy; near-miss patterns; training gaps; resource needs.</li>
              <li><strong>Safety committee</strong> — Safety Representatives and Safety Committees Regs 1977; consultation mechanism.</li>
              <li><strong>Reg 5 POCMR meetings</strong> — management cycle; supervisor contributes observations.</li>
              <li><strong>Monthly H&amp;S report</strong> — supervisor contributions on team-level performance.</li>
              <li><strong>Toolbox talk feedback</strong> — operative response noted; fed up.</li>
              <li><strong>Health and Safety (Consultation with Employees) Regs 1996</strong> — applies where no recognised union.</li>
              <li><strong>Bi-directional flow</strong> — both directions essential; one-way = policy drift.</li>
              <li><strong>L3 craft</strong> — upward communication is part of the supervisor&apos;s role, not optional.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Module 1 closing reflection — the L3 supervisor mindset across all sections"
            plainEnglish="Module 1 has covered the H&amp;S legal framework (HASAWA, MHSWR, CDM, EAWR, PUWER, PPE, RRFSO, CSR, CAR, COSHH, Building Regs, BSA, Equality Act), the procedural disciplines (risk assessment, RAMS, permit-to-work, isolation, dynamic risk assessment, near-miss reporting), the hazard areas (electrical, working at height, manual handling, fire, asbestos, confined spaces), and the inclusive practice (Equality Act, PEEPs, reasonable adjustment, harassment). The L3 supervisor mindset that integrates all of these: structured rather than reactive; documented rather than verbal; pro-active rather than waiting for incident; modelled rather than spoken; consistent rather than situational; protective rather than blame-allocating."
            onSite="The cumulative practice across Module 1: every job has a regulatory framework that someone has worked out; the L3 supervisor doesn&apos;t invent the framework but applies it. Every incident has a system cause that better controls would have prevented; the L3 supervisor doesn&apos;t blame the operative but improves the system. Every team has a culture that the supervisor&apos;s consistent behaviour shapes; the L3 supervisor models. Every apprentice is the next generation&apos;s supervisor; the L3 supervisor teaches not just technique but professional integrity. This is the operational reality of L3 H&amp;S supervision."
          >
            <p>Module 1 integrated supervisor practices:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Structured rather than reactive</strong> — assessment before action; documented framework.</li>
              <li><strong>Documented rather than verbal</strong> — paper trail underpins regulatory defence and incident response.</li>
              <li><strong>Pro-active rather than waiting</strong> — near-miss reporting, proactive adjustment, anticipatory controls.</li>
              <li><strong>Modelled rather than spoken</strong> — team learns from supervisor behaviour, not posters.</li>
              <li><strong>Consistent rather than situational</strong> — same standards every day, every project.</li>
              <li><strong>Protective rather than blame-allocating</strong> — no-blame reporting; Just Culture framework.</li>
              <li><strong>Cross-regime integration</strong> — HASAWA / MHSWR / CDM / sector-specific regs operate together.</li>
              <li><strong>Apprentice mentoring</strong> — teaches the next generation; equality dimension explicit.</li>
              <li><strong>Customer-facing duty</strong> — Equality Act service-provider obligations; vulnerable adult awareness.</li>
              <li><strong>Refusal protection</strong> — ERA s.44 + s.27 + s.26 (where applicable) protect raising concerns.</li>
              <li><strong>Reg 5 POCMR cycle</strong> — Plan / Organise / Control / Monitor / Review — feeds back into continuous improvement.</li>
              <li><strong>Sentencing Council framework</strong> — corporate and individual liability hooks; L3 supervisor aware of personal s.37 exposure.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The 5-whys analysis — practical use on a near-miss"
            plainEnglish="The 5-whys is a simple root-cause analysis technique attributed to Toyota Production System. For each near-miss, ask &quot;why did this happen?&quot; — accept the answer — then ask &quot;why?&quot; of that answer — and so on, typically five iterations deep. The depth moves the analysis from proximate cause (what the operative did) to systemic cause (why the system permitted it). The technique is simple enough for any team to apply in 10 minutes at a toolbox; powerful enough to surface the management / training / equipment / culture root causes that produce recurring near-misses."
            onSite="L3 supervisor running 5-whys: model the technique once at toolbox; coach the team to use it on subsequent near-misses; document the chain; feed the root cause into Reg 5 POCMR review. The discipline turns near-miss data into systemic improvement rather than just incident logging. Caveat: 5-whys is one tool among several; for complex incidents, fishbone diagrams, fault tree analysis or independent investigation may be more appropriate."
          >
            <p>5-whys practical use:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Iterative why-questioning</strong> — typically 5 iterations from incident to root cause.</li>
              <li><strong>Proximate to systemic</strong> — moves analysis from operative action to system permitting it.</li>
              <li><strong>Worked example</strong> — &quot;tool dropped from height&quot; → why? slipped from belt → why? belt clip broken → why? not inspected → why? inspection schedule not set → why? PPE management procedure absent.</li>
              <li><strong>Document the chain</strong> — record each why and answer for audit and learning.</li>
              <li><strong>Feed into Reg 5 POCMR</strong> — root cause informs management cycle.</li>
              <li><strong>10-minute toolbox practical</strong> — accessible for any team.</li>
              <li><strong>Limitation</strong> — single linear chain; complex incidents need fishbone / fault tree.</li>
              <li><strong>Validity check</strong> — the &quot;why&quot; chain should make sense in reverse: solving the root cause prevents the incident.</li>
              <li><strong>L3 supervisor coaching</strong> — model once; coach team to apply; embed as standard practice.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Whistleblowing and the Public Interest Disclosure Act 1998"
            plainEnglish="The Public Interest Disclosure Act 1998 amends ERA 1996 to protect workers who make &quot;qualifying disclosures&quot; about specific categories of wrongdoing — including criminal offence, breach of legal obligation, miscarriage of justice, danger to health or safety, environmental damage, or deliberate concealment of any of these. The worker is protected from detriment and from dismissal where the disclosure is made in accordance with the Act&apos;s prescribed routes (typically internal first; external to a prescribed person where internal inadequate; wider disclosure in limited circumstances). For the L3 supervisor, the framework matters because raising serious H&amp;S concerns about employer non-compliance is a qualifying disclosure attracting PIDA protection in addition to ERA s.44."
            onSite="L3 supervisor framing: serious systemic safety failures by the firm — repeated unlawful RAMS departures, falsification of certificates, failure to act on identified asbestos hazards — may attract PIDA protection if raised in accordance with the Act. Most such issues should be raised internally first; escalation to prescribed person (HSE, IET, sector regulator) follows if internal response inadequate. The framework strengthens the supervisor&apos;s position when raising serious concerns; doesn&apos;t replace ERA s.44 protection for the routine refusal-of-unsafe-work scenario."
          >
            <p>PIDA whistleblowing protection:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Public Interest Disclosure Act 1998</strong> — amends ERA 1996 sections 43A-L.</li>
              <li><strong>Qualifying disclosures</strong> — criminal, legal breach, miscarriage of justice, H&amp;S danger, environmental damage, concealment.</li>
              <li><strong>Protected disclosure</strong> — must follow prescribed routes.</li>
              <li><strong>Internal first</strong> — to employer.</li>
              <li><strong>Prescribed person</strong> — HSE for H&amp;S; sector regulators for other matters.</li>
              <li><strong>Wider disclosure</strong> — limited circumstances; usually after internal / prescribed inadequate.</li>
              <li><strong>Protection from detriment</strong> — ERA s.47B.</li>
              <li><strong>Protection from dismissal</strong> — ERA s.103A; automatic unfair dismissal.</li>
              <li><strong>L3 supervisor application</strong> — serious systemic safety failures may attract PIDA.</li>
              <li><strong>Complements ERA s.44</strong> — doesn&apos;t replace routine refusal-of-unsafe-work protection.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="PEEP design in detail — refuge points, evacuation chairs and the buddy system"
            plainEnglish="A PEEP (Personal Emergency Evacuation Plan) translates the reasonable adjustment duty into a specific evacuation procedure for someone who cannot use the standard route unaided. Components: identified individual; nature of impairment (mobility, sensory, cognitive, temporary); designated buddies (typically two — one primary, one backup) responsible for assistance; refuge point (protected lobby on stair with two-way communication device to building control); equipment as appropriate (evacuation chair for stair descent of wheelchair users; visual / vibrating alerts for hearing-impaired; written / pictorial route maps for cognitive impairment); communication path (direct from refuge point to fire-alarm panel or wardens); re-entry sequence after all-clear; drill participation to confirm plan works; review trigger (annual + on individual&apos;s needs change or building layout change). GEEPs (Generic Emergency Evacuation Plans) cover visitor categories with similar needs in public buildings."
            onSite="L3 supervisor on a site where PEEPs are operational: confirm the dutyholder (building&apos;s RP / PAP) has plans in place; ensure work doesn&apos;t compromise routes (cable routes don&apos;t block stairwells; emergency lighting installation maintains illumination of refuge points; fire alarm work doesn&apos;t disable warning systems without managed bypass). On contractor-controlled sites (CDM project) the principal contractor handles. On customer sites the customer&apos;s RP handles. The L3 reflex: ask &quot;who has PEEPs here and what do I need to maintain?&quot;"
          >
            <p>PEEP design components:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Individual identification</strong> — named person; nature of impairment.</li>
              <li><strong>Designated buddies</strong> — primary + backup; trained; rota-aware.</li>
              <li><strong>Refuge point</strong> — protected lobby on stair; two-way comms to building control.</li>
              <li><strong>Equipment</strong> — evacuation chair, visual alert, vibrating pager, written maps.</li>
              <li><strong>Communication path</strong> — refuge to fire-alarm panel or wardens.</li>
              <li><strong>Re-entry sequence</strong> — controlled return after all-clear.</li>
              <li><strong>Drill participation</strong> — confirms plan works; refines weaknesses.</li>
              <li><strong>Review trigger</strong> — annual + needs change + layout change.</li>
              <li><strong>GEEP for visitors</strong> — Generic plan for visitor categories with similar needs.</li>
              <li><strong>Consultation</strong> — designed with the individual; their expertise on their own needs.</li>
              <li><strong>Confidentiality</strong> — plan held appropriately; not broadcast across building.</li>
              <li><strong>Multi-regime basis</strong> — Equality Act s.20 + RRFSO 2005 + MHSWR Reg 3.</li>
              <li><strong>RRFSO 2005 Article 13</strong> — Fire safety arrangements; PEEPs are part of emergency arrangements.</li>
              <li><strong>RRFSO 2005 Article 14</strong> — Emergency routes and exits; must accommodate disabled persons.</li>
              <li><strong>Fire safety risk assessment</strong> — must consider disabled persons; document arrangements.</li>
              <li><strong>Building Regulations Approved Document B</strong> — design consideration for accessible evacuation.</li>
              <li><strong>Building Regulations Approved Document M</strong> — accessibility; intersects with evacuation design.</li>
              <li><strong>Higher-Risk Residential Buildings</strong> — BSA 2022 + HRRB Regs 2023; particular attention to resident PEEPs.</li>
              <li><strong>Grenfell aftermath</strong> — heightened focus on disabled-resident evacuation in residential blocks.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Equality Act 2010 — s.4 (Protected characteristics)"
            clause={<>&quot;The following characteristics are protected characteristics — age; disability; gender reassignment; marriage and civil partnership; pregnancy and maternity; race; religion or belief; sex; sexual orientation.&quot;</>}
            meaning={<>s.4 lists the nine protected characteristics. Each attracts protection from direct / indirect discrimination, harassment and victimisation. The Act also imposes the reasonable adjustment duty in relation to disability specifically (s.20). The L3 supervisor framing: the nine are the baseline; the firm&apos;s inclusive practice extends beyond compliance to genuine equality of opportunity. Memorise the nine; they come up in apprentice mentoring, customer interaction, and team management routinely.</>}
            cite="Source: Equality Act 2010 (2010 c.15), s.4."
          />

          <ConceptBlock
            title="Sexual harassment prevention under the Worker Protection Act 2023 — operational steps"
            plainEnglish="The Worker Protection (Amendment of Equality Act 2010) Act 2023 introduced a positive duty on employers to take reasonable steps to prevent sexual harassment of their workers, in force October 2024. EHRC technical guidance sets out expected reasonable steps: (a) a policy specifically addressing sexual harassment; (b) training for all workers on recognition, prevention and reporting; (c) clear reporting routes including options for confidential disclosure; (d) prompt and proportionate investigation of any report; (e) protection from victimisation for those who report or support reports; (f) periodic risk assessment of sexual harassment risk in the workplace; (g) action on third-party harassment (customers, contractors, visitors). Tribunal can uplift compensation by up to 25% where employer failed to take reasonable steps."
            onSite="L3 supervisor implementation: confirm with firm&apos;s HR / contracts manager that the policy and training are in place; deliver / refresh toolbox content on respectful workplace behaviour; ensure team know the reporting routes; intervene promptly on any incident; document; escalate. The positive duty makes prevention an active responsibility, not just incident response. The compensation uplift makes failure visible in tribunal outcomes."
          >
            <p>Worker Protection Act 2023 reasonable steps:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Policy</strong> — specifically addressing sexual harassment; clear definitions; reporting routes.</li>
              <li><strong>Training</strong> — all workers; recognition, prevention, reporting; refresher periodic.</li>
              <li><strong>Reporting routes</strong> — multiple including confidential; accessible regardless of role.</li>
              <li><strong>Investigation</strong> — prompt; proportionate; independent where appropriate.</li>
              <li><strong>Victimisation protection</strong> — reporters and supporters protected from detriment.</li>
              <li><strong>Risk assessment</strong> — periodic; identifies workplace-specific risks.</li>
              <li><strong>Third-party action</strong> — customer / contractor / visitor harassment addressed.</li>
              <li><strong>EHRC technical guidance</strong> — sets out expected reasonable steps.</li>
              <li><strong>Tribunal uplift</strong> — up to 25% compensation increase on failure to comply.</li>
              <li><strong>Sector-specific risk</strong> — male-dominated trades attract heightened risk; require enhanced response.</li>
              <li><strong>L3 supervisor role</strong> — implements policy at team level; intervenes promptly; models respectful behaviour.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Apprentice mentoring and the equality dimension"
            plainEnglish="The L3 supervisor running an apprentice has specific equality responsibilities. Apprentices in under-represented groups (women in trade contexts, racially-minoritised apprentices, disabled apprentices, LGBT apprentices) face barriers documented in successive trade-body and government research. Mentoring practice that addresses these explicitly: regular check-ins beyond technical progress; recognition of micro-aggressions or banter targeting the apprentice; allocation of development opportunities fairly rather than by network familiarity; engagement with the firm&apos;s training body / college tutor where issues arise; protection from harassment under Equality Act + ERA s.44. The L3 supervisor models inclusive practice for the next generation."
            onSite="Practical apprentice mentoring: 1-to-1 weekly conversation about more than just technical progress — how is the team treating you, any concerns, anything we should change. Banter intervention immediate — &quot;that&apos;s not acceptable here&quot; — without making the apprentice the focus. Allocation of development tasks (interesting installations, customer-facing roles, complex jobs) tracked to ensure fair distribution across apprentices regardless of background. The cumulative effect over an apprenticeship shapes retention; the trade-wide retention gap for under-represented groups is the L3 supervisor&apos;s lever."
          >
            <p>Apprentice mentoring equality elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Regular 1-to-1</strong> — weekly; covers technical + workplace climate.</li>
              <li><strong>Micro-aggression awareness</strong> — name patterns; intervene without making apprentice the focus.</li>
              <li><strong>Development allocation</strong> — interesting tasks fairly distributed; tracked.</li>
              <li><strong>Network effect counter</strong> — explicit allocation rather than by familiarity.</li>
              <li><strong>College / training body engagement</strong> — where issues persist; raise formally.</li>
              <li><strong>Apprentice voice</strong> — channels for raising concerns; protected from detriment.</li>
              <li><strong>Trade-wide retention</strong> — under-represented group attrition is a measurable industry problem.</li>
              <li><strong>Visible role modelling</strong> — apprentices observe supervisor behaviour; learn what&apos;s acceptable.</li>
              <li><strong>Reasonable adjustment proactive</strong> — identify needs early; arrange without making a fuss.</li>
              <li><strong>Documentation</strong> — mentoring conversations, adjustments, incidents recorded.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Just Culture in practice — applying the framework to a real near-miss"
            plainEnglish="Just Culture distinguishes honest error, at-risk behaviour and reckless behaviour. Worked example — operative drops a tool from a scaffold, narrowly missing a colleague below. Three possible categorisations: (1) honest error — operative had tool secured per procedure but tether failed unnoticed; system response — review tether inspection schedule, improve equipment; no operative discipline. (2) at-risk behaviour — operative carried tool unsecured because &quot;quicker that way&quot; without conscious decision that it was unsafe; response — coach the operative back to standard; reinforce procedure. (3) reckless behaviour — operative deliberately ignored the secure-tool rule despite knowing it; response — discipline up to dismissal depending on circumstances. The categorisation depends on the operative&apos;s decision process, not the outcome — same near-miss, three possible responses."
            onSite="L3 supervisor applying Just Culture: investigate the decision process, not just the action. Ask the operative what they were thinking, what they knew, what they intended. Most near-misses turn out to be honest error or at-risk behaviour where system improvement + coaching is the appropriate response. Reckless behaviour is rare but does occur; the framework gives a defensible basis for discipline when warranted. The L3 supervisor doesn&apos;t need to be the disciplinary authority — escalate to HR / management — but does need to gather the facts that allow appropriate categorisation."
          >
            <p>Just Culture practical application:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Honest error</strong> — slip / lapse / mistake despite reasonable care; system response.</li>
              <li><strong>At-risk behaviour</strong> — drift to lower standard without conscious risk decision; coach.</li>
              <li><strong>Reckless behaviour</strong> — conscious disregard of substantial risk; discipline.</li>
              <li><strong>Decision-quality focus</strong> — not outcome; same incident can categorise differently.</li>
              <li><strong>Investigation</strong> — gather facts on operative&apos;s knowledge, intent, decision process.</li>
              <li><strong>Discipline allocation</strong> — most near-misses are honest error / at-risk; reckless is rare.</li>
              <li><strong>System response</strong> — improve controls, training, equipment, procedure.</li>
              <li><strong>Coaching</strong> — restore standard; reinforce why it matters.</li>
              <li><strong>Discipline</strong> — proportionate to category; documented; consistent across team.</li>
              <li><strong>Encourages reporting</strong> — honest error genuinely safe to report.</li>
              <li><strong>Compatible with Reg 5 POCMR</strong> — feeds management cycle.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Customer interaction and the Equality Act — vulnerable adults and reasonable adjustment"
            plainEnglish="Equality Act 2010 covers service-provider duties (Part 3) alongside employer duties. Electrical contractors are service providers to domestic customers and certain commercial customers. The reasonable adjustment duty extends to the customer: alternative communication for hearing-impaired customers (written; sign-language interpreter where reasonable); scheduling around vulnerability (medical appointments, carer arrangements); additional explanation of safety arrangements for customers with learning difficulties; accessible work practices for customers with mobility impairment. The Care Act 2014 (England) and equivalents elsewhere additionally define &quot;vulnerable adult&quot; — operative encountering apparent safeguarding concern has a referral route through the firm&apos;s safeguarding policy."
            onSite="L3 supervisor on a domestic job with a vulnerable customer: tone matters; explanation pace matters; written follow-up matters; the safeguarding referral route matters if concern arises. The cost of inclusive customer practice is small; the protection it provides is significant — for the customer, the operative, and the firm&apos;s reputation. Customer-facing equality is often the apprentice&apos;s first contact with the Act in operation; supervisor modelling shapes their default."
          >
            <p>Customer equality practice elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Service-provider duty</strong> — Equality Act 2010 Part 3; reasonable adjustment for customers.</li>
              <li><strong>Communication adjustment</strong> — written / sign / interpreter where reasonable.</li>
              <li><strong>Scheduling flexibility</strong> — around medical appointments, carer arrangements.</li>
              <li><strong>Additional explanation</strong> — for customers with learning difficulties; check understanding.</li>
              <li><strong>Accessible work practice</strong> — accommodate mobility impairment; minimise disruption.</li>
              <li><strong>Vulnerable adult</strong> — Care Act 2014 definition; safeguarding referral route.</li>
              <li><strong>Safeguarding concern</strong> — referral via firm policy; document; protect customer.</li>
              <li><strong>Tone and pace</strong> — patience; respect; the customer is not the problem.</li>
              <li><strong>Written follow-up</strong> — confirms what was discussed; supports understanding.</li>
              <li><strong>Reputation effect</strong> — inclusive practice is part of the firm&apos;s brand.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Toolbox talks as the cultural mechanism — content, frequency, and the supervisor&apos;s craft"
            plainEnglish="Toolbox talks are the most frequent regular touchpoint between supervisor and team. Used well, they shape culture; used poorly, they become an empty box-tick. Content rotation: H&amp;S hazard awareness; recent near-misses and lessons; new regulations or industry guidance; inclusive practice and respectful workplace; mental health and wellbeing; manual handling refreshers; PPE / RPE checks; emergency procedures. Frequency: weekly typical; daily in high-risk environments; site-specific on arrival. Format: short (10-15 minutes); discussion not lecture; specific to the work in hand; followed by signed attendance record."
            onSite="The L3 supervisor&apos;s craft on toolbox talks: prepare 24 hours ahead (not on the spot); pick content relevant to today&apos;s work; involve the team (ask questions, invite contributions); pitch tone collegial not didactic; close with a clear takeaway; sign the attendance sheet promptly. The cumulative effect over a year — 50 toolbox talks — is substantial culture-shaping. The annual toolbox programme can be designed deliberately rather than ad-hoc."
          >
            <p>Toolbox talk practice elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Content rotation</strong> — hazards, near-misses, regs, inclusive practice, wellbeing, refreshers.</li>
              <li><strong>Frequency</strong> — weekly typical; daily high-risk; site-specific on arrival.</li>
              <li><strong>Format</strong> — short, discussion, specific, signed.</li>
              <li><strong>Preparation</strong> — 24 hours ahead; relevant to today; sources cited.</li>
              <li><strong>Team involvement</strong> — questions; contributions; not just supervisor talking.</li>
              <li><strong>Tone</strong> — collegial; respectful; not policing.</li>
              <li><strong>Takeaway</strong> — clear and actionable.</li>
              <li><strong>Documentation</strong> — attendance signed; topic recorded; contributes to Reg 16 / safety system evidence.</li>
              <li><strong>Annual programme</strong> — designed deliberately rather than ad-hoc.</li>
              <li><strong>Culture lever</strong> — cumulative effect over 50 per year is substantial.</li>
              <li><strong>Inclusive content</strong> — Equality Act / Worker Protection Act 2023 topics included.</li>
              <li><strong>Mental health</strong> — referenced; reduces stigma; signposts support.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Direct, indirect, harassment, victimisation — worked examples in electrical trade context"
            plainEnglish="The four types of unlawful discrimination land differently in trade contexts. Direct example: declining to interview a female candidate for an apprenticeship because &quot;it&apos;s not a job for women.&quot; Indirect example: requiring all apprentices to carry 25kg ladders alone as part of the role — neutral on face but disproportionately disadvantages some disabled candidates and some female candidates; potentially justifiable if the requirement is genuinely essential but typically not. Harassment example: persistent banter in the van about a colleague&apos;s religion that creates a hostile environment. Victimisation example: not offering the apprentice further hours after they supported a colleague&apos;s grievance against the supervisor."
            onSite="L3 supervisor naming the type when escalating: &quot;this is direct discrimination&quot; / &quot;this is indirect&quot; / &quot;this is harassment&quot; / &quot;this is victimisation.&quot; The naming sharpens the conversation with HR / management; the type determines the defensibility and the remedy. Each type is independently actionable in employment tribunal; combinations are common (harassment that also constitutes direct discrimination on race grounds, for example)."
          >
            <p>Four-types worked examples:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Direct (s.13)</strong> — &quot;we don&apos;t want a female apprentice on this contract&quot;; less favourable treatment because of characteristic.</li>
              <li><strong>Indirect (s.19)</strong> — apparently neutral practice (e.g. fitness test) disadvantaging protected group disproportionately.</li>
              <li><strong>Harassment (s.26)</strong> — banter, jokes, comments targeting characteristic creating hostile environment.</li>
              <li><strong>Victimisation (s.27)</strong> — detriment for raising / supporting complaint, giving evidence.</li>
              <li><strong>Combinations</strong> — single incident can involve multiple types (e.g. harassment + direct).</li>
              <li><strong>Justification</strong> — only indirect potentially justifiable (proportionate means to legitimate aim); direct rarely; harassment never.</li>
              <li><strong>Burden of proof</strong> — shifts to employer once prima facie case established.</li>
              <li><strong>Tribunal time limit</strong> — typically 3 months less one day from act complained of; extension possible.</li>
              <li><strong>ACAS Early Conciliation</strong> — mandatory step before tribunal claim.</li>
              <li><strong>Vicarious liability</strong> — employer liable for employee acts in course of employment; statutory defence requires reasonable preventive steps.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Mental health and wellbeing in the construction trade — the L3 supervisor role"
            plainEnglish="Construction has well-documented elevated suicide and mental ill health rates compared to the general working population (HSE figures and Office for National Statistics suicide-by-occupation data). The drivers are multiple: isolation on site, pressure of contracts, financial volatility, masculine workplace culture limiting disclosure, physical injury and chronic pain, alcohol / substance use coping. The L3 supervisor role isn&apos;t to be the clinician — it&apos;s to notice the signs, hold an open conversation, signpost to support (firm EAP, GP, charities like Mates in Mind, Samaritans), reduce stigma, and ensure team norms don&apos;t actively harm. The Equality Act protects mental health as disability where the condition has substantial adverse effect."
            onSite="L3 supervisor practice: notice patterns — withdrawal, irritability, performance change, attendance change, expressions of hopelessness; ask directly &quot;how are you doing?&quot; with willingness to listen to the real answer; signpost without making the issue feel like a HR problem; protect the operative&apos;s confidentiality; reasonable adjustment under Equality Act where applicable (flexible hours, modified workload, role allocation). The team norm shifts when the supervisor models openness about wellbeing rather than treating it as taboo."
          >
            <p>Mental health and wellbeing practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Industry context</strong> — elevated suicide rates; multiple drivers; under-reported.</li>
              <li><strong>Notice signs</strong> — withdrawal, irritability, performance change, expressions of hopelessness.</li>
              <li><strong>Open conversation</strong> — &quot;how are you really doing?&quot; with willingness to listen.</li>
              <li><strong>Signposting</strong> — firm EAP; GP; Mates in Mind; Samaritans; Construction Industry Helpline.</li>
              <li><strong>Stigma reduction</strong> — talk openly; model that wellbeing is part of safety.</li>
              <li><strong>Confidentiality</strong> — operative&apos;s information held appropriately.</li>
              <li><strong>Equality Act application</strong> — mental health as disability where substantial adverse effect.</li>
              <li><strong>Reasonable adjustment</strong> — flexible hours, modified workload, role allocation.</li>
              <li><strong>Team norms</strong> — supervisor modelling shifts what&apos;s acceptable to discuss.</li>
              <li><strong>Crisis response</strong> — recognise risk; act promptly; emergency services if imminent.</li>
              <li><strong>Mates in Mind</strong> — construction-specific mental health charity.</li>
              <li><strong>Construction Industry Helpline</strong> — 0345 605 1956; charity-run; 24/7.</li>
              <li><strong>Lighthouse Construction Industry Charity</strong> — practical support; financial assistance; counselling.</li>
              <li><strong>Apprentice-specific support</strong> — younger workforce; isolation risk; supervisor especially attentive.</li>
              <li><strong>Suicide-by-occupation data</strong> — ONS publication; construction elevated; reflects industry context.</li>
              <li><strong>Toolbox topic content</strong> — wellbeing covered alongside hazards; reduces stigma.</li>
              <li><strong>Mental Health First Aid</strong> — trained mental health first aiders alongside physical first aiders.</li>
              <li><strong>Reasonable adjustment scope</strong> — mental health conditions as Equality Act disability where substantial.</li>
              <li><strong>Wellbeing as safety</strong> — fatigue, distress impair safety performance; integrated framing.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reasonable adjustment in practice — the proactive vs reactive distinction"
            plainEnglish="The reasonable adjustment duty under Equality Act s.20 is proactive in design — the employer must anticipate the needs of disabled persons and adjust where reasonable, not just respond to disclosed requests. In practice the proactive dimension means: standard onboarding asks about adjustments; standard equipment selection considers ergonomic / accessibility variants; standard scheduling allows flexibility; standard communication channels include alternatives. The reactive dimension: when an operative discloses or develops a need, the employer engages, consults, implements within a reasonable timeframe. Both dimensions co-exist."
            onSite="L3 supervisor reflex: when a new apprentice joins, ask &quot;any adjustments we should know about?&quot; — open question, not assumption. When an existing operative develops a need (injury, illness, family circumstances), engage promptly; consult; implement. Document the adjustment as part of normal HR records, not in a special &quot;disability file&quot; that singles out the individual. The proactive habit reduces the moment-of-disclosure burden on the operative; the reactive habit makes the day-of-need handling fast."
          >
            <p>Reasonable adjustment proactive / reactive practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Standard onboarding</strong> — adjustment question asked of every new starter.</li>
              <li><strong>Standard equipment</strong> — ergonomic / accessibility variants available.</li>
              <li><strong>Standard scheduling</strong> — flexibility built in where reasonably practicable.</li>
              <li><strong>Standard communication</strong> — alternatives offered (written, visual, simplified).</li>
              <li><strong>Disclosure handling</strong> — confidential; respect operative&apos;s framing.</li>
              <li><strong>Consultation</strong> — work with the operative; their expertise on their own needs.</li>
              <li><strong>Implementation timeframe</strong> — reasonable; without delay; documented.</li>
              <li><strong>Review</strong> — adjustments revisited as needs change.</li>
              <li><strong>Documentation</strong> — normal HR records; not a special file.</li>
              <li><strong>Cost / disruption / effectiveness</strong> — the &quot;reasonable&quot; test factors all three.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The competence framework — how training, experience and supervision combine"
            plainEnglish="L3 supervisor competence is the integration of formal training (C&amp;G 2365 / 2357 + AM2 / AM2S), accumulated experience (post-qualification site time across varied contexts), and ongoing supervised development (mentoring from senior supervisors, complex projects, exposure to incident learning). The Electrotechnical Assessment Specification (EAS) and ECS competence cards formalise the framework; CSCS / ECS Gold card recognises L3 supervisor competence. EAWR 1989 Reg 16 imposes the underlying duty: &quot;No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger... unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate.&quot; The L3 supervisor IS the appropriate supervision for L2 mates and apprentices on most electrical work."
            onSite="L3 supervisor self-awareness: what work am I competent to lead unsupervised? What work do I need senior supervision for? What competence am I building this year? The answers shape the firm&apos;s job allocation and the supervisor&apos;s own development plan. ECS / EAS framework provides the recognised competence map; experiential evidence builds the bench depth."
          >
            <p>Competence framework elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Formal training</strong> — C&amp;G 2365 / 2357 / AM2 or AM2S.</li>
              <li><strong>Accumulated experience</strong> — post-qualification site time across varied contexts.</li>
              <li><strong>Supervised development</strong> — mentoring; complex projects; incident learning.</li>
              <li><strong>EAS / ECS framework</strong> — recognised competence cards.</li>
              <li><strong>Gold card</strong> — L3 supervisor competence.</li>
              <li><strong>EAWR Reg 16</strong> — technical knowledge or supervision necessary.</li>
              <li><strong>Self-awareness</strong> — competent to lead what; need senior supervision for what.</li>
              <li><strong>Development plan</strong> — what competence to build this year.</li>
              <li><strong>L2 / apprentice supervision</strong> — L3 IS the appropriate supervision for most electrical work.</li>
              <li><strong>Refresher training</strong> — BS 7671 amendments; H&amp;S regs updates.</li>
              <li><strong>Cross-discipline</strong> — gas safe / refrigeration / data / fire alarm — knowing limits prevents overreach.</li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Persistent banter targeting an apprentice&apos;s religion"
            situation={<>You&apos;re L3 supervising a team that includes a new apprentice who is Muslim. You notice over several weeks that two other operatives make repeated jokes referencing the apprentice&apos;s religion — comments about fasting during Ramadan, remarks about prayer breaks, mock-pronunciation of Arabic phrases. The apprentice doesn&apos;t complain explicitly but their participation in team conversations has reduced; they&apos;ve started taking lunch alone. The two operatives are senior and well-regarded technically; one is your peer; one was your trainer ten years ago.</>}
            whatToDo={<>This is harassment under Equality Act s.26 — unwanted conduct related to religion creating an intimidating / hostile environment for the apprentice. Whether the operatives intend it as banter is irrelevant; the s.26 test is the effect. Your duty as L3 is clear regardless of the operatives&apos; seniority or your personal relationship with them. (1) Intervene at next instance — name it. &quot;That&apos;s harassment under the Equality Act. It stops now.&quot; Calm, clear, not theatrical. (2) Speak privately with each operative — explain the regulatory position, the impact you&apos;ve observed on the apprentice, the firm&apos;s vicarious liability. Their seniority doesn&apos;t exempt them; if anything it raises their responsibility. (3) Check in with the apprentice — privately, supportively. Make clear you&apos;ve seen the behaviour, you&apos;ve intervened, you&apos;ll continue to. Don&apos;t require the apprentice to confirm or complain; the duty is yours not theirs. (4) Document — what you observed, what you said, what was said back, dates. (5) Escalate to firm&apos;s HR / contracts manager if behaviour recurs after your intervention. Vicarious liability is the firm&apos;s; failure to act is the firm&apos;s exposure. (6) Reflect — this is a culture issue; what in the team norms permitted this to start? What needs to change? Toolbox topic on respectful workplace behaviour referencing Worker Protection Act 2023 duty. Don&apos;t pretend the issue is one-off; address the culture.</>}
            whyItMatters={<>This scenario captures the most common Equality Act issue an L3 supervisor faces — banter that targets characteristics, perpetrated by senior colleagues who don&apos;t see it as harassment but whose behaviour creates hostile environment for less powerful team members. The legal framework is unambiguous: s.26 applies; the firm is vicariously liable; the Worker Protection Act 2023 imposes positive duty; the apprentice is protected from detriment for raising or for the L3 raising on their behalf. The supervisor judgement is whether to act; the regulatory framework is the basis for acting. Failure to act condones the behaviour and extends the firm&apos;s liability. Acting decisively, even with senior colleagues, models the standard the team will adopt. This is the L3 supervisor&apos;s inclusive-practice moment — the test of whether the inclusive principles operate or whether they sit on a poster while the operatives drift.</>}
          />

          <ConceptBlock
            title="ACAS Code of Practice and the grievance / disciplinary framework"
            plainEnglish="The ACAS Code of Practice on Disciplinary and Grievance Procedures sets out the standard process for handling workplace complaints — including discrimination, harassment and bullying complaints. Tribunal can adjust compensation by up to 25% (up or down) where either party unreasonably fails to follow the Code. The framework: raise complaint formally; investigation; meeting with the complainant; decision; right of appeal. The L3 supervisor isn&apos;t the investigator or decision-maker (that&apos;s HR / management) but is often the first point of escalation and the immediate-intervention authority. Knowing the framework helps the supervisor route the complaint correctly and protect the complainant from victimisation during the process."
            onSite="L3 supervisor receiving a complaint: listen properly; document what was said; explain the process; signpost to HR / formal grievance route; protect the complainant from any detriment during process; cooperate fully with investigation if interviewed. Don&apos;t pre-judge; don&apos;t pressure the complainant to drop it; don&apos;t share confidential information with the alleged perpetrator. The ACAS Code defines &quot;reasonable&quot; conduct of the process; departure costs both reputation and compensation."
          >
            <p>ACAS Code framework:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Statutory Code under TULRCA s.207</strong> — courts and tribunals must take into account.</li>
              <li><strong>Formal complaint</strong> — written grievance; signposted by supervisor.</li>
              <li><strong>Investigation</strong> — prompt; proportionate; impartial.</li>
              <li><strong>Meeting</strong> — with complainant; opportunity to put case; companion right.</li>
              <li><strong>Decision</strong> — communicated in writing; reasoned.</li>
              <li><strong>Appeal</strong> — right of appeal to higher level; impartial appeal panel.</li>
              <li><strong>Compensation adjustment</strong> — up to 25% up or down for unreasonable failure to follow Code.</li>
              <li><strong>Supervisor role</strong> — first escalation point; intervention authority; protect complainant.</li>
              <li><strong>Confidentiality</strong> — appropriate; not absolute; informed of duty to disclose for investigation.</li>
              <li><strong>Victimisation protection</strong> — complainant protected from detriment during process.</li>
              <li><strong>Sex Discrimination Act 1975 / Race Relations Act 1976 / Disability Discrimination Act 1995</strong> — now consolidated in Equality Act 2010.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Module 1 closing - Equality Act + near-miss culture as the L3 supervisor inclusive + learning practices.",
            "Equality Act 2010 - nine protected characteristics; reasonable adjustments duty; harassment / victimisation protection.",
            "Four types of discrimination — direct, indirect, harassment, victimisation. The L3 supervisor names the type when escalating.",
            "Worker Protection (Amendment) Act 2023 — positive duty to prevent sexual harassment from October 2024; tribunal uplift up to 25%.",
            "Reasonable adjustment - modification removing substantial disadvantage; balanced against cost / disruption / effectiveness.",
            "PEEPs - Equality Act + RRFSO 2005 + MHSWR Reg 3 intersection. Required where standard evacuation insufficient.",
            "Near-miss culture is the highest-impact preventive practice. Heinrich&apos;s pyramid loose framework — qualitative valid, specific numbers debated.",
            "5-whys analysis turns near-miss data into systemic improvement; complement with fishbone / fault tree for complex incidents.",
            "Strong culture: no-blame, easy reporting, structured analysis, feedback, visible changes, trend tracking, leadership modelling.",
            "Just Culture distinguishes honest error / at-risk / reckless — same outcome, different response based on decision quality.",
            "L3 supervisor builds culture by modelling - reports own near-misses openly; encourages others; celebrates reporting.",
            "ACAS Code of Practice governs grievance / disciplinary process; tribunal compensation adjusted ±25% for unreasonable failure.",
            "Mental health and wellbeing — construction-elevated rates; L3 supervisor notices signs, opens conversation, signposts support.",
            "Module 1 complete - the L3 H&amp;S supervisor framework operationalised across legislation, procedures, hazards, dutyholder responsibility, advanced topics.",
          ]} />
          <Quiz title="Equality Act + near-miss culture - knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section6-5')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">6.5 Confined Spaces</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module2')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Module 1 complete <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Back to Module 1</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
