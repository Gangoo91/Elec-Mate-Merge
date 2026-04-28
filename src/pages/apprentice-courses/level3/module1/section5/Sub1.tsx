/**
 * Module 1 · Section 5 · Subsection 1 — Dutyholder responsibilities — the L3 view
 * Maps to C&G 2365-03 / Unit 201 — supplementary depth (beyond AC framework)
 * Layered depth from 2357 Unit 601 ELTK01 (AC 1.1) — own and others' responsibilities
 * Cross-references 2365-03 Unit 201 / LO1 / AC 1.1 (already covered in Section 1.1)
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Dutyholder responsibilities — the L3 view | Level 3 Module 1.5.1 | Elec-Mate';
const DESCRIPTION = 'L3 dutyholder depth — multiple parallel duties stacked on different parties, who carries what, escalation when the chain fails.';

const checks = [
  { id: 'l3-m1-s5-sub1-stack', question: 'A scaffolder asks if it\'s OK to drop a hammer down to the floor below. You\'re an L3 apprentice nearby. Who has duties?', options: ['Just the scaffolder.', 'Multiple parties: scaffolder personal s.7; scaffolder employer s.2/s.3; principal contractor (CDM Reg 13 coordination); site manager / responsible person (RRFSO if relevant); you (s.7 if you tacitly approve). HASAWA stacks.', 'Just the boss.', 'No-one.'], correctIndex: 1, explanation: 'Remember from Sub 1.1 — HASAWA stacks duties. The L3 add: knowing who else is on the duty list lets you escalate accurately AND recognise your own potential exposure.' },
  { id: 'l3-m1-s5-sub1-cascade', question: 'Your immediate supervisor refuses to act on a safety concern you\'ve raised. What\'s the L3 escalation chain?', options: ['Drop it.', 'Up the chain in writing — contracts manager, technical manager, Qualified Supervisor, director, then external (HSE) only if internal demonstrably fails (PIDA 1998). Document each step. ERA 1996 s.44 protects you from detriment.', 'Tell the customer.', 'Quit.'], correctIndex: 1, explanation: 'Escalation chain in writing. Each step builds the evidence trail. ERA s.44 + PIDA 1998 are the protections; they only work if used.' },
  { id: 'l3-m1-s5-sub1-director', question: 'Under HASAWA s.37, when can a director be personally prosecuted?', options: ['Never.', 'Where a corporate offence is committed with their consent, connivance or attributable to their neglect. The Sentencing Council Definitive Guideline includes custody for high-culpability cases. Director liability is a real route the HSE uses against senior management.', 'Only on weekends.', 'Only in Wales.'], correctIndex: 1, explanation: 'Three-prong test under s.37: consent, connivance, neglect. Custody possible at the top end. Knowing this changes how senior conversations go.' },
];

const quizQuestions = [
  { id: 1, question: 'Define "dutyholder" in H&S statute.', options: ['Anyone.', 'A person on whom statute imposes a duty regardless of contract. Employer, self-employed, employee, occupier, manufacturer, designer, importer, controller of premises — each has statute-imposed duties under HASAWA, EAWR, MHSWR, CDM, PUWER etc. Cannot be contracted out.', 'Just employer.', 'Customer.'], correctAnswer: 1, explanation: 'Dutyholder = statute-imposed; not contractual.' },
  { id: 2, question: 'How do duties stack on a single incident?', options: ['Don\'t.', 'A single incident commonly engages multiple statutory duties simultaneously — HASAWA s.2 (firm to employee) + s.3 (firm to non-employee) + s.7 (operative personal) + s.37 (director personal) + EAWR Regs + MHSWR Regs + specific daughter regs. Prosecution selects from the stack.', 'Replace each other.', 'Cancel out.'], correctAnswer: 1, explanation: 'Duties stack. Single incident → multiple charges typical.' },
  { id: 3, question: 'Who holds the dutyholder responsibility in a domestic CDM project?', options: ['Homeowner only.', 'CDM 2015 has a domestic carve-out — most client duties cascade to the contractor (single-contractor) or principal contractor (multi-contractor). Homeowner remains the client in name but contractor holds operational duty.', 'Architect.', 'Council.'], correctAnswer: 1, explanation: 'Domestic carve-out shifts client duties to contractor. Contractor effectively becomes the operational client.' },
  { id: 4, question: 'What\'s "consent, connivance or neglect" under HASAWA s.37?', options: ['Three movies.', 'Three prongs of director liability. Consent — director knew and agreed. Connivance — director knew and turned a blind eye. Neglect — director should have known but didn\'t take reasonable steps to find out / address. All three give personal liability for the corporate offence.', 'A type of cable.', 'Random words.'], correctAnswer: 1, explanation: 'Three prongs cover knowing, looking-away, and culpable ignorance. The HSE has used all three.' },
  { id: 5, question: 'How does the dutyholder chain affect the L3 apprentice?', options: ['Doesn\'t.', 'L3 carries personal s.7 duty + EAWR Reg 16 competence duty + CDM Reg 15 worker duty + MHSWR Reg 14 employee duty. Multiple parallel personal duties; same conclusion — refuse unsafe instruction, escalate. Plus emerging contributory role to the firm\'s Reg 9 contractor duties.', 'Only the boss.', 'Random.'], correctAnswer: 1, explanation: 'Multiple parallel personal duties. Refusal + escalation + documentation discharges all of them.' },
  { id: 6, question: 'Why does the dutyholder mindset matter at L3?', options: ['It doesn\'t.', 'Because L3 starts to be looked to as a quasi-supervisor and starts to influence others. Knowing where YOU sit in the duty stack — and where ELSE the duty sits — lets you make accurate decisions, escalate correctly, and avoid being unwittingly drawn into a duty cascade you didn\'t recognise.', 'Random.', 'Customer focus.'], correctAnswer: 1, explanation: 'Dutyholder thinking is the L3 mental model. Influences how you communicate, escalate and act.' },
  { id: 7, question: 'What\'s the operative\'s defence to a HASAWA s.7 charge?', options: ['I was told to.', 'Best defence is documentary — contemporaneous notes, written refusals, escalations, evidence that personal s.7 duty was discharged. "I was told to" is no defence; "here is the email I sent declining the unsafe task" is.', 'Customer asked.', 'Money was tight.'], correctAnswer: 1, explanation: 'Written contemporaneous evidence is the defence. Verbal claims months later are weak.' },
  { id: 8, question: 'When does the dutyholder duty fall on the customer?', options: ['Always.', 'Customer / occupier may be a dutyholder under various capacities: HASAWA s.4 (controller of non-domestic premises); CAR 2012 Reg 4 (asbestos register); CDM 2015 Reg 4 (client). Domestic-customer client duties largely cascade to contractor under CDM.', 'Never.', 'Random.'], correctAnswer: 1, explanation: 'Customer can be dutyholder in specific capacities. HASAWA s.4 for premises; CAR 2012 for asbestos; CDM Reg 4 for projects.' },
];

const faqs = [
  { question: 'Can multiple parties share the same duty?', answer: 'Yes — concurrent duties are common in CDM projects (e.g. multiple contractors on same site each have Reg 9 duties). Sharing the duty doesn\'t reduce any party\'s individual liability.' },
  { question: 'How is "neglect" assessed under HASAWA s.37?', answer: 'Objectively — what would a reasonable director in that position have done? Failure to make reasonable inquiries or implement reasonable systems counts as neglect even without active knowledge.' },
  { question: 'Is the dutyholder mindset just about prosecution avoidance?', answer: 'Primarily — but also about clear communication, accurate escalation, defensible records, and professional reputation. Dutyholder thinking improves day-to-day decisions, not just incident response.' },
  { question: 'Can a sole trader be both dutyholder and operative?', answer: 'Yes — sole trader carries employer-equivalent duties under HASAWA s.3 (to non-employees) AND personal s.7 duties. Both apply simultaneously.' },
  { question: 'What\'s the practical difference between HASAWA s.7 and EAWR Reg 16?', answer: 's.7 = general personal H&S duty across all work activity. EAWR Reg 16 = competence duty specifically for electrical work requiring technical knowledge. Both apply to electrical work; both create personal liability.' },
  { question: 'Does ERA s.44 protection require me to be a designated H&S representative?', answer: 'No — s.44 protects all employees raising H&S concerns by reasonable means, regardless of formal designation. Designated reps have additional protections under TULRCA / SRSC Regs 1977.' },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section5')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 5</button>
          <PageHero eyebrow="Module 1 · Section 5 · Subsection 1" title="Dutyholder responsibilities — the L3 view" description="Remember from Section 1.1 — HASAWA stacks duties. This Sub goes deeper on the dutyholder concept — multiple parallel duties on multiple parties, who carries what, escalation when the chain fails." tone="emerald" />
          <TLDR points={[
            "Dutyholder = statute-imposed duty regardless of contract. Cannot be contracted out.",
            "Duties stack — single incident routinely engages 3-5+ parallel statutory duties across employer / employee / director / specific regs.",
            "L3 carries multiple parallel personal duties (s.7, Reg 16, Reg 14 MHSWR, Reg 15 CDM). Same response: refuse + escalate + document.",
          ]} />
          <LearningOutcomes outcomes={[
            "Define 'dutyholder' in statute terms — duty imposed by law not contract.",
            "Identify how duties stack on a single incident.",
            "Describe the cascade of dutyholder roles in CDM 2015 and the domestic carve-out.",
            "Apply the HASAWA s.37 'consent, connivance, neglect' test for director liability.",
            "Use the dutyholder mindset to navigate escalation and refusal decisions.",
            "Recognise the ERA 1996 s.44 and PIDA 1998 protections for raising concerns.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>The dutyholder concept</ContentEyebrow>
          <ConceptBlock title="Statute imposes; contract cannot remove" plainEnglish="A dutyholder is a person on whom statute imposes a duty. The duty exists regardless of any contract. Two parties can't agree between themselves to shift the statutory duty — the law put it where it is and there it stays. Contracts can shift commercial liability but never statutory duty." onSite="The L3 reflex when reading any project contract: 'this contract may shift commercial risk but my HASAWA / EAWR / MHSWR duties stay where the law put them'. The dutyholder mindset is foundational to navigating commercial pressure.">
            <p>Dutyholder categories across UK H&amp;S regulation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Employer</strong> — HASAWA s.2, s.3, s.4 (controller of premises); EAWR Reg 3; MHSWR throughout; CDM 2015; PUWER etc.</li>
              <li><strong>Self-employed</strong> — equivalent duties under each statute&apos;s definition.</li>
              <li><strong>Employee</strong> — HASAWA s.7; EAWR Reg 3(2); MHSWR Reg 14; CDM Reg 15.</li>
              <li><strong>Director / senior manager</strong> — HASAWA s.37 personal liability for corporate offences with consent / connivance / neglect.</li>
              <li><strong>Manufacturer / supplier / importer</strong> — HASAWA s.6.</li>
              <li><strong>Designer</strong> — CDM 2015 designer duties.</li>
              <li><strong>Client (CDM)</strong> — Reg 4 (cascaded to contractor for domestic).</li>
              <li><strong>Principal Designer / Principal Contractor (CDM)</strong> — Regs 11-14 on multi-contractor projects.</li>
              <li><strong>Building owner / managing agent</strong> — RRFSO 2005 (fire safety); CAR 2012 Reg 4 (asbestos); BSA 2022 Accountable Person (HRRBs).</li>
              <li><strong>Contractor (CDM)</strong> — Reg 9 plan, manage, monitor.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="HASAWA 1974 — s.7" clause={<>"It shall be the duty of every employee while at work — (a) to take reasonable care for the health and safety of himself and of other persons who may be affected by his acts or omissions at work; and (b) as regards any duty or requirement imposed on his employer or any other person by or under any of the relevant statutory provisions, to co-operate with him so far as is necessary to enable that duty or requirement to be performed or complied with."</>} meaning={<>The personal employee duty. Limb (a) reasonable care; limb (b) cooperation with employer&apos;s compliance. The L3 supervisor framing: limb (a) is what you do; limb (b) is the act of refusing the unsafe instruction so the employer can comply with their duty.</>} cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.7 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[0]} />

          <SectionRule />
          <ContentEyebrow>The duty stack on real incidents</ContentEyebrow>
          <ConceptBlock title="A single event triggers many duties" plainEnglish="A real workplace incident routinely engages 3-5+ statutory duties simultaneously. The HSE prosecution selects from the stack. The defence has to address each one. The L3 supervisor sees the stack and recognises which parties are on the duty list with them." onSite="Worked example - apprentice falls from a faulty step-up onto live electrical work area. Duties engaged: HASAWA s.2 (firm to employee), HASAWA s.3 (firm to non-employees if customer present), HASAWA s.7 (operative personal), HASAWA s.37 if director knew about defect, EAWR Reg 4 (system safety / equipment), PUWER Regs 5/6 (equipment maintenance / inspection), WAH Regs 2005 (working at height controls), MHSWR Reg 3 (assessment), MHSWR Reg 5 (arrangements). Five+ parallel duties from one fall.">
            <p>How the stack changes the prosecution landscape:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Multiple charges per incident — usually corporate + sometimes personal.</li>
              <li>Each charge separately defended.</li>
              <li>Sentencing Council guideline applies per charge.</li>
              <li>Aggravating factors (cost-cutting, repeated breach, vulnerable victim) push fines up.</li>
              <li>Mitigating factors (early plea, prompt remedial, cooperation) push down.</li>
              <li>Defence costs and FFI invoicing aggregate across charges.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="HASAWA 1974 — s.37(1)" clause={<>"Where an offence under any of the relevant statutory provisions committed by a body corporate is proved to have been committed with the consent or connivance of, or to have been attributable to any neglect on the part of, any director, manager, secretary or other similar officer of the body corporate or a person who was purporting to act in any such capacity, he as well as the body corporate shall be guilty of that offence and shall be liable to be proceeded against and punished accordingly."</>} meaning={<>Personal director liability for corporate offences. Three-prong test: consent (knew and agreed), connivance (knew and looked away), neglect (should have known and didn&apos;t inquire / act). Sentencing Council Definitive Guideline (2016) includes custody for high-culpability cases. The HSE uses s.37 routinely against senior management where corporate offences are systemic.</>} cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.37 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>The HSWA s.2 / s.3 / s.4 employer triad</ContentEyebrow>
          <ConceptBlock title="Three concentric duties: employees, non-employees, premises" plainEnglish="HASAWA gives the employer-equivalent dutyholder three concentric duties — s.2 to their own employees, s.3 to anyone else affected by the undertaking, s.4 as controller of non-domestic premises to anyone using the premises. Most incidents engage two or all three at once because workers, customers and visitors share space." onSite="A simple socket fault in a customer&apos;s shop is s.2 (your operative working on it), s.3 (the customer / shop staff / public passing through), and s.4 (the building owner controls the premises and may share liability under s.4). One incident, three statutory hooks. The L3 supervisor recognises which sit on the firm and which sit on others.">
            <p>The triad in operation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>s.2</strong> — duty to own employees so far as is reasonably practicable. Covers safe plant, safe systems, training, supervision, welfare.</li>
              <li><strong>s.3</strong> — duty to non-employees affected by the undertaking. Covers customers, visitors, members of the public, contractors&apos; staff.</li>
              <li><strong>s.4</strong> — duty of person in control of non-domestic premises to non-employees using the premises (e.g. landlord of commercial property, shopping centre owner).</li>
              <li>Sentencing Council guideline applies per charge — three convictions on one event is common.</li>
              <li>Delegation does not transfer the s.2/s.3 duty; it stays with the employer.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="HASAWA 1974 — s.2(1)" clause={<>&quot;It shall be the duty of every employer to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all his employees.&quot;</>} meaning={<>The general employer duty. &quot;So far as is reasonably practicable&quot; (SFAIRP) is the standard; cost only avoids a duty where grossly disproportionate to the risk reduction (Edwards v NCB 1949). The onus is on the employer to show what was practicable, not on the prosecution to prove what was not (s.40 HASAWA reverse burden).</>} cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.2(1) — verbatim from legislation.gov.uk." />

          <SectionRule />
          <ContentEyebrow>Reasonably practicable — the SFAIRP test</ContentEyebrow>
          <ConceptBlock title="Cost only excuses where grossly disproportionate" plainEnglish="Most HASAWA duties are qualified by &quot;so far as is reasonably practicable&quot; (SFAIRP). The Edwards v NCB 1949 test: weigh the risk against the cost / time / trouble of the control measure. Cost only excuses non-compliance where it is GROSSLY disproportionate to the risk avoided. The starting presumption is that compliance is required; the firm must justify any departure." onSite="The L3 supervisor framing: &quot;it costs too much&quot; is rarely a defence. Edwards is interpreted strictly. Five extra minutes for a second prove on the GS38 voltage indicator is not grossly disproportionate to the risk of working live by mistake. The L3 reflex on commercial-pressure conversations is to remember SFAIRP is asymmetric — it favours safety unless the cost is wildly out of proportion.">
            <p>Practical SFAIRP weighing:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Risk = severity x likelihood, considered before controls.</li>
              <li>Sacrifice = money + time + trouble of the control.</li>
              <li>If sacrifice is grossly disproportionate to risk reduction, the control is not reasonably practicable.</li>
              <li>If sacrifice is proportionate or modest, the control IS required; cost is not a defence.</li>
              <li>Reverse burden under HASAWA s.40 — defendant must prove what was practicable.</li>
              <li>Industry good practice (HSE guidance, BS standards, ACOPs) sets the baseline of what is practicable.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Personal duties under EAWR Reg 16 — the competence hook" plainEnglish="EAWR Reg 16 imposes a personal duty: no person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger unless they have such knowledge or experience or are under appropriate supervision. The duty bites on the operative AND the firm that engages them." onSite="The L3 reflex: if asked to do work outside competence (e.g. HV switching without HV authorisation, inspect a system you have not been trained on), Reg 16 is the personal hook for refusal. It is not a discretionary protection — it is a statutory duty NOT to engage in work beyond competence. Refusal is required, not optional.">
            <p>Reg 16 in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Applies to electrical work where technical knowledge is necessary to prevent danger — almost all.</li>
              <li>Operative duty AND employer duty (employer cannot direct work beyond operative competence).</li>
              <li>&quot;Under appropriate supervision&quot; means real supervision by competent person, not nominal.</li>
              <li>Reg 16 sits alongside HASAWA s.7 and MHSWR Reg 14 — three personal hooks for refusal.</li>
              <li>Documented training, JIB grading, scheme registration, manufacturer-specific certification all evidence competence.</li>
              <li>Evidence of refusal in writing is the operative&apos;s defence if subsequently challenged.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The dutyholder under specific daughter regulations" plainEnglish="HASAWA is the umbrella; the daughter regulations name the dutyholder specifically. Different regulations identify different parties or roles. Knowing which daughter regulation applies tells you who carries the operational duty for a given hazard." onSite="The L3 reflex on a new hazard: which regulation? Who does it name? That tells you who escalation goes to. Asbestos = CAR 2012 dutyholder (building owner / managing agent). Fire = RRFSO 2005 Responsible Person. Confined space = Confined Spaces Regs 1997 employer. Working at height = WAH Regs 2005 employer plus self-employed.">
            <p>Mapping hazards to dutyholders:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Asbestos</strong> — CAR 2012 Reg 4 dutyholder (controller of non-domestic premises).</li>
              <li><strong>Fire</strong> — RRFSO 2005 Responsible Person (employer / occupier / controller).</li>
              <li><strong>Confined space</strong> — Confined Spaces Regs 1997 employer + self-employed.</li>
              <li><strong>Working at height</strong> — WAH Regs 2005 employer + self-employed + person in control.</li>
              <li><strong>Lifting</strong> — LOLER 1998 employer.</li>
              <li><strong>Equipment</strong> — PUWER 1998 employer.</li>
              <li><strong>Manual handling</strong> — MHO Regs 1992 employer.</li>
              <li><strong>Noise / Vibration</strong> — Control of Noise / Vibration at Work Regs employer.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Director liability and the trend in HSE prosecutions" plainEnglish="HSE has shifted resource toward s.37 director prosecutions over the last decade. Pre-Sentencing Council Guideline (2016) personal sentences were rare; post-2016 they are routine for serious cases. Disqualification under the Company Directors Disqualification Act 1986 follows. The L3 supervisor&apos;s observation to a director about safety lands with the weight of personal-liberty consequences." onSite="When framing safety conversations with senior management, the implicit context is that the director&apos;s personal exposure is real. Cases like R v Cornish (manslaughter conviction) and routine s.37 prosecutions reported on the HSE prosecutions register make the point. The L3 supervisor does not make the threat; the law makes it. The L3 supervisor merely surfaces it.">
            <p>Director-level consequences:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>HASAWA s.37 personal liability for corporate offences with consent / connivance / neglect.</li>
              <li>Sentencing Council Guideline 2016 — custody possible at top end of culpability x harm matrix.</li>
              <li>Company Directors Disqualification Act 1986 — disqualification 5+ years.</li>
              <li>Corporate Manslaughter and Corporate Homicide Act 2007 — corporate offence; senior management organisation test.</li>
              <li>Common-law gross negligence manslaughter — personal charge separate from CMCHA 2007.</li>
              <li>Public register exposure — HSE prosecutions register visible during procurement.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Escalation when the chain fails</ContentEyebrow>
          <ConceptBlock title="In writing, up the chain, document everything" plainEnglish="When the immediate supervisor refuses to act on a concern, the L3 escalation chain in writing: contracts manager → Qualified Supervisor / H&S manager → director → external (only after internal failure under PIDA 1998). Each step builds the evidence trail. ERA 1996 s.44 protects from detriment." onSite="Verbal escalation isn't enough — text or email creates the record. CC a senior contact when escalating; the visible audience often shifts the response. If written escalation reaches a director and still no action, external (HSE / scheme body) is PIDA-protected.">
            <p>Escalation in practice:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Verbal raise to supervisor; document the response.</li>
              <li>Written follow-up (text/email) confirming what was discussed.</li>
              <li>Escalate to contracts manager / H&amp;S manager if supervisor doesn&apos;t act.</li>
              <li>Escalate to Qualified Supervisor / director if next level doesn&apos;t act.</li>
              <li>External (HSE 0345 300 9923 or relevant regulator) if internal demonstrably fails.</li>
              <li>PIDA 1998 protects external disclosure where internal route has been tried.</li>
              <li>Throughout: document each step in writing; keep copies.</li>
            </ol>
          </ConceptBlock>

          <SectionRule />
          <CommonMistake title="Going external too fast" whatHappens={<>Apprentice raises concern verbally to supervisor; immediately calls HSE without internal escalation. Firm blindsided; relationship damaged; HSE may decline to act on the basis that internal route hasn&apos;t been used; PIDA protections weakened.</>} doInstead={<>Internal first; document the escalation; give the firm reasonable opportunity to address. Only go external when internal has demonstrably failed AND PIDA test is satisfied.</>} />

          <CommonMistake title="Verbal-only escalation" whatHappens={<>Apprentice tells supervisor about a near-miss verbally; supervisor forgets / doesn&apos;t act. Three weeks later same near-miss becomes incident. Apprentice&apos;s &quot;I told them&quot; defence is weak without written record.</>} doInstead={<>Verbal + written. Text to supervisor confirming what was discussed. Email to a senior contact CC&apos;d. Job-pack note. Multiple-channel reporting.</>} />

          <Scenario title="Dutyholder cascade in a real situation" situation={<>You're an L3 apprentice on a small commercial site. You discover that the firm\'s safe-isolation procedure isn\'t being followed by another team — they\'re routinely skipping the second prove on the voltage indicator. Their supervisor has been told and has done nothing. The behaviour is widespread. You\'re worried someone will get hurt.</>} whatToDo={<>Apply the dutyholder mindset. Multiple parties have duties: the operative (s.7), their supervisor (s.7 + Reg 16), the firm (s.2, EAWR Reg 4 / 13), the H&amp;S manager (Reg 7 competent person), the director (s.37 if knowing). Your dutyholder duty: Reg 14 MHSWR (report shortcomings); s.7(b) cooperation. Action: (1) document what you&apos;ve observed in writing — specific dates, teams, behaviour. (2) Phone your firm&apos;s H&amp;S manager / contracts manager directly (skipping the immediate supervisor who hasn&apos;t acted). (3) Email confirming the conversation with details. (4) If no action within reasonable timescale (1-2 weeks), escalate to a director. (5) If still no action, PIDA 1998 + ERA s.44 protect external escalation to HSE / scheme body. The L3 supervisor escalation chain is the operational mechanism for the dutyholder system. Doing it correctly protects you (s.7 discharged), the team (next operative protected), and the firm (chance to fix before incident).</>} whyItMatters={<>The dutyholder mindset turns &quot;I noticed something but it&apos;s not my place&quot; into &quot;I have a personal Reg 14 duty to report shortcomings AND ERA s.44 protection for doing so&quot;. The escalation chain is the practical expression of that mindset. Without it, the firm&apos;s safety system breaks; with it, the system self-corrects. The L3 supervisor&apos;s role in the dutyholder system is the difference between a firm that learns from near-incidents and a firm that prosecutes incidents after the fact.</>} />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 1.1 — HASAWA stacks duties. This Sub goes deeper on the dutyholder system.",
            "Dutyholder = statute-imposed duty; cannot be contracted out.",
            "Duties stack — single incident routinely engages 3-5+ parallel statutory duties.",
            "L3 carries multiple parallel personal duties: HASAWA s.7, EAWR Reg 16, MHSWR Reg 14, CDM Reg 15.",
            "HASAWA s.37 director liability: consent, connivance or neglect. Sentencing Council includes custody at top end.",
            "Escalation chain in writing: supervisor → contracts manager → QS → director → external (PIDA-protected).",
            "ERA 1996 s.44 protects from detriment for raising H&S concerns.",
            "Dutyholder mindset is the L3 mental model — informs escalation, refusal, communication.",
          ]} />
          <Quiz title="Dutyholder responsibilities — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section5')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Back</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">Section 5 — Landing</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section5-2')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">5.2 CDM Worker → Contractor transition</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
