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
  { id: 'l3-m1-s6-sub6-eqa', question: 'What\'s the Equality Act 2010 \"protected characteristics\"?', options: ['One.', 'Nine: age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, sexual orientation. Discrimination on these grounds unlawful.', 'Random.', 'Just race.'], correctIndex: 1, explanation: 'Nine protected characteristics. Equality Act covers all workplaces and many service contexts. L3 supervisor maintains inclusive practice.' },
  { id: 'l3-m1-s6-sub6-peep', question: 'Who needs a PEEP?', options: ['Everyone.', 'Anyone who can\'t use the standard evacuation route unaided - wheelchair users, sensory impaired, cognitive impairment, temporary impairment (broken leg, late pregnancy). Required where reasonable adjustment is needed.', 'Nobody.', 'Random.'], correctIndex: 1, explanation: 'PEEP needed where standard evacuation insufficient. Equality Act + RRFSO 2005 + MHSWR Reg 3.' },
  { id: 'l3-m1-s6-sub6-near-miss', question: 'Why is near-miss culture the highest-impact preventive activity?', options: ['It isn\'t.', 'Because near-misses are leading indicators of where the next incident will occur. Reporting + analysis + lessons-learned + visible changes = systemic prevention. Cheap; effective; aligns with Reg 5 POCMR.', 'For show.', 'Random.'], correctIndex: 1, explanation: 'Near-miss culture is the cheapest, most effective preventive practice. Many firms have weak near-miss reporting; mature firms have strong.' },
];

const quizQuestions = [
  { id: 1, question: 'What does Equality Act 2010 require of employers?', options: ['Nothing.', 'Don\'t discriminate against workers / job applicants on protected characteristics; make reasonable adjustments for disabled persons; protect from harassment and victimisation; ensure inclusive workplace practices.', 'Random.', 'Customer service.'], correctAnswer: 1, explanation: 'Comprehensive duty. Workplace inclusion + reasonable adjustments + protection from harassment.' },
  { id: 2, question: 'What\'s a "reasonable adjustment"?', options: ['Optional change.', 'Modification to working arrangement, equipment, or environment that removes a substantial disadvantage faced by a disabled person. Reasonable balances cost / disruption / effectiveness. Failure to make reasonable adjustment is unlawful discrimination.', 'Customer choice.', 'Random.'], correctAnswer: 1, explanation: 'Specific Equality Act duty. Examples: ergonomic equipment, modified work patterns, accessible facilities, communication aids.' },
  { id: 3, question: 'What\'s the relationship between PEEP and Equality Act?', options: ['Unrelated.', 'PEEPs are reasonable adjustments under Equality Act + safety arrangements under RRFSO 2005 + MHSWR Reg 3. Failure to provide PEEP for someone needing one = unlawful discrimination + safety breach.', 'Random.', 'Same thing.'], correctAnswer: 1, explanation: 'PEEPs sit at the intersection of Equality Act + fire safety + risk assessment. Multiple legal obligations converge.' },
  { id: 4, question: 'What\'s a near-miss?', options: ['A small miss.', 'An event that could have caused injury but didn\'t. Slips without fall, tool drops without injury, almost-contact with energised conductors, RAMS-procedure shortcuts spotted before incident. Leading indicator of latent risk.', 'A type of dance.', 'Random.'], correctAnswer: 1, explanation: 'Near-miss = potential incident that didn\'t cause harm. Reporting + analysis turns it into prevention.' },
  { id: 5, question: 'What\'s "Heinrich\'s pyramid" in safety?', options: ['Egyptian.', 'Loose ratio framework: many minor near-misses : fewer minor injuries : even fewer serious injuries : rare fatalities. Common formulations 300:30:1. Conceptual point: tackle near-misses to reduce serious incidents.', 'Tomb.', 'Random.'], correctAnswer: 1, explanation: 'Heinrich\'s pyramid is conceptual not exact. The point is the relationship - many near-misses underlie each serious incident.' },
  { id: 6, question: 'What does a strong near-miss culture look like?', options: ['Hide reports.', 'No-blame reporting; easy reporting mechanism; structured analysis (5-whys, root cause); feedback to team; visible changes in practice; trend tracking; celebrate reporting (the act, not the near-miss); leadership modelling.', 'Random.', 'Customer-led.'], correctAnswer: 1, explanation: 'Multi-element culture. Each element supports the others; weak link breaks the system.' },
  { id: 7, question: 'What\'s the L3 supervisor\'s role in inclusive practice?', options: ['Nothing.', 'Model inclusive language; identify and accommodate reasonable adjustments where colleagues need them; ensure PEEPs are in place where required; intervene against discriminatory behaviour; document; escalate persistent issues.', 'Random.', 'Customer service.'], correctAnswer: 1, explanation: 'Equality Act practice runs through the supervisor. Modelling, intervention, escalation.' },
  { id: 8, question: 'How does the L3 supervisor build near-miss culture?', options: ['Force reports.', 'Model the behaviour - report own near-misses openly; encourage colleagues to report theirs without blame; analyse with the team; feed lessons forward; celebrate the report (not the near-miss). Cumulative cultural change over months / years.', 'Random.', 'Customer ratings.'], correctAnswer: 1, explanation: 'Culture built one report at a time. The L3 supervisor\'s consistent modelling is what shifts team behaviour.' },
];

const faqs = [
  { question: 'Is the Equality Act 2010 the same across UK?', answer: 'Yes - applies to England, Scotland, Wales (Northern Ireland has separate but similar provisions). Workplace duties apply to all employers regardless of size.' },
  { question: 'Who decides what\'s a "reasonable" adjustment?', answer: 'Employer in consultation with the disabled person. Tribunal can ultimately decide if disputed. Cost, disruption, effectiveness all weighed. \"Reasonable\" is judged in context of the employer\'s resources and the adjustment\'s impact.' },
  { question: 'Are L3 apprentices likely to encounter Equality Act issues?', answer: 'Yes - workplace inclusion, customer accommodation, dealing with vulnerable customers, working alongside colleagues with various needs. The Act is operational on every site.' },
  { question: 'What\'s the difference between near-miss and "no-harm event"?', answer: 'Sometimes used interchangeably. Near-miss typically implies potential for harm that didn\'t materialise (the right cable was cut, but it was already isolated). No-harm event covers near-misses plus events where no harm was possible.' },
  { question: 'What if my firm doesn\'t have a near-miss reporting system?', answer: 'Document in job-pack notebook; raise to supervisor / H&S manager. The absence of a system is itself an issue worth raising. Many firms develop near-miss culture incrementally.' },
  { question: 'How does near-miss culture interact with the firm\'s safety system?', answer: 'Near-miss data feeds POCMR review (MHSWR Reg 5); informs RAMS updates; shapes toolbox-talk topics; identifies training gaps; underpins competence development.' },
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
            "PEEPs sit at intersection of Equality Act + RRFSO 2005 + MHSWR Reg 3. Required where standard evacuation insufficient.",
            "Near-miss culture is the highest-impact preventive practice. No-blame reporting + analysis + visible changes + leadership modelling.",
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

          <RegsCallout source="Equality Act 2010 - s.20 (Duty to make adjustments)" clause={<>"Where a provision, criterion or practice of A's puts a disabled person at a substantial disadvantage in relation to a relevant matter in comparison with persons who are not disabled, the duty is to take such steps as it is reasonable to have to take to avoid the disadvantage."</>} meaning={<>The reasonable adjustment duty. Practical examples: ergonomic equipment, modified work patterns, accessible facilities, communication aids, PEEPs for evacuation. \"Reasonable\" balances cost, disruption, effectiveness in context of employer's resources.</>} cite="Source: Equality Act 2010 (2010 c.15), s.20 - verbatim from legislation.gov.uk." />

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

          <RegsCallout source="Equality Act 2010 — s.26 (Harassment)" clause={<>&quot;A person (A) harasses another (B) if — (a) A engages in unwanted conduct related to a relevant protected characteristic, and (b) the conduct has the purpose or effect of — (i) violating B&apos;s dignity, or (ii) creating an intimidating, hostile, degrading, humiliating or offensive environment for B.&quot;</>} meaning={<>The harassment definition. &quot;Effect&quot; matters even if the perpetrator&apos;s purpose was different — &quot;banter&quot; that creates a hostile environment is harassment regardless of intent. The L3 supervisor framing on toolbox banter that targets a characteristic: name it, intervene, document. Employer is vicariously liable for harassment by employees in the course of employment.</>} cite="Source: Equality Act 2010 (2010 c.15), s.26 — verbatim from legislation.gov.uk." />

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

          <RegsCallout source="Equality Act 2010 — s.27 (Victimisation)" clause={<>&quot;A person (A) victimises another person (B) if A subjects B to a detriment because — (a) B does a protected act, or (b) A believes that B has done, or may do, a protected act.&quot;</>} meaning={<>Victimisation protection covers the act of raising a discrimination complaint, supporting a colleague&apos;s complaint, or giving evidence. The protected act does not need to succeed — the worker is protected from detriment for the act of raising or supporting. Mirrors ERA s.44 in structure for safety; together they form the workplace-voice protection framework.</>} cite="Source: Equality Act 2010 (2010 c.15), s.27 — verbatim from legislation.gov.uk." />

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
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Module 1 closing - Equality Act + near-miss culture as the L3 supervisor inclusive + learning practices.",
            "Equality Act 2010 - nine protected characteristics; reasonable adjustments duty; harassment / victimisation protection.",
            "Reasonable adjustment - modification removing substantial disadvantage; balanced against cost / disruption / effectiveness.",
            "PEEPs - Equality Act + RRFSO 2005 + MHSWR Reg 3 intersection. Required where standard evacuation insufficient.",
            "Near-miss culture is the highest-impact preventive practice. Heinrich\'s pyramid loose framework.",
            "Strong culture: no-blame, easy reporting, structured analysis, feedback, visible changes, trend tracking, leadership modelling.",
            "L3 supervisor builds culture by modelling - reports own near-misses openly; encourages others; celebrates reporting.",
            "Module 1 complete - the L3 H&S supervisor framework operationalised across legislation, procedures, hazards, dutyholder responsibility, advanced topics.",
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
