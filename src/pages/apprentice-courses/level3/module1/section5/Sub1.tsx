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
  { question: 'What does HASAWA s.40 do?', answer: 'Section 40 is the reverse burden of proof. Where the prosecution proves that a person did not comply with a duty SFAIRP, it is for the defendant to prove that it was not reasonably practicable to do more. The dutyholder bears the burden — the prosecution does not have to prove what was practicable; the dutyholder has to prove what they did was sufficient. This is why contemporaneous documentation is the spine of the defence.' },
  { question: 'How does HSE enforcement actually proceed?', answer: 'The HSE Enforcement Management Model (EMM) is the framework. Inspector observes a breach or harm; assesses risk gap and benchmark gap; issues verbal advice, Notification of Contravention (NoC, free), Improvement Notice (28+ days to comply), Prohibition Notice (immediate stop), or refers for prosecution. The choice is driven by risk severity and dutyholder response. Fee for Intervention (FFI) is invoiced where the inspector forms an opinion of material breach during inspection — currently around £170/hour.' },
  { question: 'What are HSE inspector powers under HASAWA s.20?', answer: 'Section 20 powers include: entry at any reasonable time; bringing any other person or equipment necessary; making necessary examination; directing premises / equipment to be left undisturbed; taking measurements / photographs / recordings; taking samples; requiring articles or substances to be dismantled or tested; taking possession of any article or substance; requiring answers to questions and signed declarations; requiring production of documents. Obstruction of an inspector is a separate offence under s.33(1)(h).' },
  { question: 'Where does RIDDOR fit in the duty system?', answer: 'The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 sit alongside HASAWA. Reportable events: work-related deaths, specified injuries (fractures excluding finger/toe, amputation, blinding etc), over-7-day incapacity, occupational diseases, dangerous occurrences, gas incidents. Reports go to HSE / local authority via online F2508 form. Reporting is the responsible person&apos;s duty; for electrical contractors the firm typically reports. The L3 supervisor preserves the scene and provides information to the responsible person for reporting.' },
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
            "HASAWA s.40 reverse burden — defendant must prove what was practicable; prosecution does not have to prove what was not.",
            "HSE enforcement framework — EMM (Enforcement Management Model); NoC, Improvement Notice, Prohibition Notice, prosecution; FFI invoices alongside.",
            "RIDDOR 2013 reporting + CMCHA 2007 parallel offence + CDDA 1986 disqualification — the full consequence picture.",
          ]} />
          <LearningOutcomes outcomes={[
            "Define 'dutyholder' in statute terms — duty imposed by law not contract.",
            "Identify how duties stack on a single incident.",
            "Describe the cascade of dutyholder roles in CDM 2015 and the domestic carve-out.",
            "Apply the HASAWA s.37 'consent, connivance, neglect' test for director liability.",
            "Use the dutyholder mindset to navigate escalation and refusal decisions.",
            "Recognise the ERA 1996 s.44 and PIDA 1998 protections for raising concerns.",
            "State HASAWA s.40 reverse burden of proof and its evidence implications.",
            "Describe HSE inspector powers under HASAWA s.20-22 and the EMM enforcement framework.",
            "Identify the RIDDOR 2013 reportable categories and the responsible-person reporting duty.",
            "State the CMCHA 2007 corporate manslaughter offence and its &apos;senior management&apos; test.",
            "Describe the CDM 2015 Reg 9 contractor duties — plan, manage, monitor — and the role of the L3 representative.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>The dutyholder concept</ContentEyebrow>
          <ConceptBlock title="Statute imposes; contract cannot remove" plainEnglish="A dutyholder is a person on whom statute imposes a duty. The duty exists regardless of any contract. Two parties can't agree between themselves to shift the statutory duty — the law put it where it is and there it stays. Contracts can shift commercial liability but never statutory duty. This principle has been confirmed in case law repeatedly — courts will not allow private agreements to override Parliament&apos;s allocation of safety duty. The dutyholder concept is fundamental to UK health and safety law and is what makes the prosecution system workable: the HSE knows who to pursue because the statute itself identifies the dutyholder for each duty." onSite="The L3 reflex when reading any project contract: 'this contract may shift commercial risk but my HASAWA / EAWR / MHSWR duties stay where the law put them'. The dutyholder mindset is foundational to navigating commercial pressure. When the principal contractor tries to push CDM Reg 9 contractor duties down to a sub-contractor via the contract, the sub-contractor still carries the duty regardless of what the contract says; the principal contractor still carries the duty too. The contract redistributes commercial liability between them but doesn&apos;t remove either party&apos;s statutory exposure.">
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

          <RegsCallout source="HASAWA 1974 — s.7" clause={<>"It shall be the duty of every employee while at work — (a) to take reasonable care for the health and safety of himself and of other persons who may be affected by his acts or omissions at work; and (b) as regards any duty or requirement imposed on his employer or any other person by or under any of the relevant statutory provisions, to co-operate with him so far as is necessary to enable that duty or requirement to be performed or complied with."</>} meaning={<>The personal employee duty. Limb (a) reasonable care; limb (b) cooperation with employer&apos;s compliance. The L3 supervisor framing: limb (a) is what you do; limb (b) is the act of refusing the unsafe instruction so the employer can comply with their duty.</>} cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.7." />

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

          <RegsCallout source="HASAWA 1974 — s.37(1)" clause={<>"Where an offence under any of the relevant statutory provisions committed by a body corporate is proved to have been committed with the consent or connivance of, or to have been attributable to any neglect on the part of, any director, manager, secretary or other similar officer of the body corporate or a person who was purporting to act in any such capacity, he as well as the body corporate shall be guilty of that offence and shall be liable to be proceeded against and punished accordingly."</>} meaning={<>Personal director liability for corporate offences. Three-prong test: consent (knew and agreed), connivance (knew and looked away), neglect (should have known and didn&apos;t inquire / act). Sentencing Council Definitive Guideline (2016) includes custody for high-culpability cases. The HSE uses s.37 routinely against senior management where corporate offences are systemic.</>} cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.37." />

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

          <RegsCallout source="HASAWA 1974 — s.2(1)" clause={<>&quot;It shall be the duty of every employer to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all his employees.&quot;</>} meaning={<>The general employer duty. &quot;So far as is reasonably practicable&quot; (SFAIRP) is the standard; cost only avoids a duty where grossly disproportionate to the risk reduction (Edwards v NCB 1949). The onus is on the employer to show what was practicable, not on the prosecution to prove what was not (s.40 HASAWA reverse burden).</>} cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.2(1)." />

          <SectionRule />
          <ContentEyebrow>Reasonably practicable — the SFAIRP test</ContentEyebrow>
          <ConceptBlock title="Cost only excuses where grossly disproportionate" plainEnglish="Most HASAWA duties are qualified by &quot;so far as is reasonably practicable&quot; (SFAIRP). The Edwards v NCB 1949 test: weigh the risk against the cost / time / trouble of the control measure. Cost only excuses non-compliance where it is GROSSLY disproportionate to the risk avoided. The starting presumption is that compliance is required; the firm must justify any departure. Edwards v National Coal Board [1949] 1 KB 704 remains the leading case on what &apos;reasonably practicable&apos; means; the test has been refined and applied across hundreds of subsequent cases but the core formulation has not been overturned. Asquith LJ&apos;s phrasing — &apos;a computation must be made by the owner in which the quantum of risk is placed on one scale and the sacrifice involved in the measures necessary for averting the risk (whether in money, time or trouble) is placed on the other&apos; — is what every prosecution and defence considers." onSite="The L3 supervisor framing: &quot;it costs too much&quot; is rarely a defence. Edwards is interpreted strictly. Five extra minutes for a second prove on the GS38 voltage indicator is not grossly disproportionate to the risk of working live by mistake. The L3 reflex on commercial-pressure conversations is to remember SFAIRP is asymmetric — it favours safety unless the cost is wildly out of proportion. The L3 reflex on documenting compliance: the records you keep today are the SFAIRP defence evidence tomorrow. Toolbox talks attended, RAMS signed, near-miss reports filed, training matrix current — all build the evidence that what was done was reasonably practicable for the firm at the time.">
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
          <ContentEyebrow>The Construction Phase Plan and the CDM 2015 contractor duties in depth</ContentEyebrow>

          <ConceptBlock
            title="What &apos;plan, manage, monitor&apos; actually means under CDM 2015 Reg 9"
            plainEnglish="CDM 2015 Reg 9 imposes the contractor&apos;s core construction-phase duties: plan, manage, monitor construction work either by themselves or by workers under their control; apply the general principles of prevention from MHSWR Schedule 1; comply with directions of the principal designer or principal contractor; verify the client knows their CDM duties (Reg 9(1)). The duty operates at the firm level — your employer is the contractor — but it is operationalised by named individuals on site. The L3 supervisor acting as the firm&apos;s representative on a small project is the operational discharge of Reg 9 for that project. The employer remains the dutyholder; the supervisor is the means."
            onSite="On small projects the contractor representative often is the L3 / senior operative. On larger projects the contracts manager retains Reg 9 responsibility but delegates day-to-day operationalisation. Either way, the L3 representative needs the Construction Phase Plan (the &apos;CPP&apos;); needs to know the named principal contractor / principal designer on multi-contractor jobs; needs to know the welfare arrangements; needs to know the emergency arrangements; needs to know the site-specific rules. The CPP is the spine of the safe system of work on any construction project."
          >
            <p>Reg 9 contractor duties in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Plan</strong> — write or contribute to the CPP / RAMS;
                identify hazards specific to the work; plan controls; plan
                resources, sequence, programme.
              </li>
              <li>
                <strong>Manage</strong> — brief operatives; provide equipment
                and materials; supervise; intervene; coordinate with other
                trades.
              </li>
              <li>
                <strong>Monitor</strong> — observe in practice; check that
                planned controls are being applied; document; review after
                incidents; lessons-learned at end of project.
              </li>
              <li>
                <strong>Reg 9(1) client awareness</strong> — verify the client
                knows their duties; brief them where needed; document.
              </li>
              <li>
                <strong>PD / PC cooperation</strong> — comply with their
                directions; contribute method statements; attend meetings;
                feed back operational issues.
              </li>
              <li>
                <strong>Worker management</strong> — under your control; brief
                them; train them; supervise them.
              </li>
              <li>
                <strong>Principles of prevention</strong> — MHSWR Schedule 1
                hierarchy applied to the project hazards.
              </li>
              <li>
                <strong>Records</strong> — CPP, RAMS, induction sign-in,
                toolbox talks, near-miss reports, lessons-learned — retained
                as evidence of discharge.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The Construction Phase Plan — what it contains"
            plainEnglish="CDM 2015 Reg 12 (single-contractor) or Reg 15 (principal contractor on multi-contractor) requires a Construction Phase Plan before construction work begins. The CPP records the H&S arrangements for the construction phase. HSE CIS80 template is suitable for small / domestic projects; more substantial projects use bespoke CPP documents reflecting project complexity. The CPP is not a generic document — it covers the specific project, the specific hazards, the specific controls."
            onSite="The L3 representative writes or contributes to the CPP on small projects. The content covers: project description and scope; key dates; site information including services, neighbours, access; programme; principal hazards and controls (electrical, mechanical, COSHH, fire, traffic, working at height, manual handling, etc); roles and responsibilities; first aid arrangements; emergency arrangements; welfare arrangements; site rules; arrangements for cooperation with the client and other trades. Update as the project progresses; close out at the end."
          >
            <p>Typical Construction Phase Plan contents:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Project description, location, scope.</li>
              <li>Programme dates, milestones.</li>
              <li>Site information — access, neighbours, services, drainage, surrounding hazards.</li>
              <li>Roles and responsibilities — client, contractor, supervisor, key personnel.</li>
              <li>Principal hazards and controls — RAMS summary.</li>
              <li>Welfare arrangements — toilets, drinking water, rest area, washing facilities.</li>
              <li>Emergency arrangements — fire, first aid, escape, contacts.</li>
              <li>Site rules — PPE, sign-in, working hours, hot works, smoking, vehicle movements.</li>
              <li>Cooperation with other trades.</li>
              <li>Review arrangements — what triggers an update.</li>
              <li>F10 notification reference where the project is notifiable.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 — Reg 9(1)"
            clause={
              <>
                &quot;A contractor must not carry out construction work in relation
                to a project unless satisfied that the client is aware of the
                duties owed by the client under these Regulations.&quot;
              </>
            }
            meaning={
              <>
                Reg 9(1) — the client-awareness duty for the contractor. Brief
                but mandatory conversation before starting work. The L3
                contractor representative often has this conversation on small
                jobs where the contracts manager isn&apos;t present. Records
                in the job pack are the evidence that the conversation
                happened.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 9."
          />

          <SectionRule />
          <ContentEyebrow>Corporate Manslaughter — when senior management failure crosses a line</ContentEyebrow>

          <ConceptBlock
            title="The 2007 Act and why it changed the prosecution landscape"
            plainEnglish="The Corporate Manslaughter and Corporate Homicide Act 2007 created a specific offence applicable to organisations (companies, partnerships, public bodies) where the way activities were managed or organised by senior management causes a person&apos;s death and amounts to a gross breach of a relevant duty of care. Before 2007 it was almost impossible to prosecute a large company for manslaughter because the &apos;identification doctrine&apos; required identifying a single &apos;directing mind&apos; — easy in a one-director firm, impossible in a complex organisation. The 2007 Act looks at the management system as a whole, not at a single person."
            onSite="The L3 supervisor doesn&apos;t personally face CMCHA charges (it&apos;s an organisational offence), but evidence collected by the supervisor — the documented refused improvement requests, the unactioned near-miss reports, the email trail showing concerns brushed off — is exactly the &apos;senior management failure&apos; evidence the prosecution looks for after a fatality. A CMCHA conviction generally also carries HASAWA s.2 / s.3 corporate charges in parallel; both run together."
          >
            <p>The CMCHA test in plain language:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>An organisation&apos;s activities cause a person&apos;s death</strong>.
              </li>
              <li>
                <strong>Those activities amount to a gross breach of a relevant duty of
                care</strong> — far below what could reasonably be expected.
              </li>
              <li>
                <strong>The way in which those activities were managed or organised by
                senior management was a substantial element in the breach</strong>.
              </li>
              <li>
                <strong>Senior management</strong> means the persons who play significant
                roles in the making of decisions about the whole or a substantial part of
                the activities, or the actual managing or organising of them.
              </li>
              <li>
                <strong>Penalties</strong> — unlimited fine; publicity order requiring
                publication of conviction details; remedial order if appropriate. Crown
                Court only.
              </li>
              <li>
                <strong>Parallel HASAWA charges</strong> — almost always run alongside
                CMCHA; corporate s.2 / s.3 + personal s.37 against directors.
              </li>
              <li>
                <strong>Notable cases</strong> — Cotswold Geotechnical Holdings (2011, first
                conviction), R v Lion Steel Equipment (2012), R v Dr Errol Cornish.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>HSE enforcement and the inspector powers</ContentEyebrow>

          <ConceptBlock
            title="HASAWA s.20-22 — what an inspector can actually do"
            plainEnglish="HASAWA Part I Sections 20, 21 and 22 give HSE inspectors specific statutory powers that the L3 supervisor should understand because the inspector may turn up unannounced. Section 20 powers include entry at any reasonable time without warrant; bringing any other person and any equipment; making examinations and investigations; requiring premises or equipment to be left undisturbed; taking measurements, photographs, recordings, samples; requiring articles or substances to be dismantled or tested; taking possession of articles or substances; requiring answers to questions and signed written declarations; requiring production of documents. Section 21 is the power to issue improvement notices. Section 22 is the power to issue prohibition notices."
            onSite="When an inspector arrives the L3 reflex is: cooperate fully, answer questions truthfully (it is a separate offence to make false statements to an inspector under HASAWA s.33(1)(g)), provide reasonable assistance, preserve scene, contact firm immediately. Inspectors expect frank cooperation; obstruction is itself an offence under s.33(1)(h). The L3 supervisor doesn&apos;t need to fear the inspector but does need to know what powers the inspector has and to interact accordingly. Saying &quot;I&apos;ll need to phone my contracts manager first&quot; is reasonable; refusing entry is not."
          >
            <p>HASAWA s.20 powers in summary:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>(a) Entry</strong> — at any reasonable time at any
                premises where work is being undertaken; if obstruction
                anticipated, may bring a constable.
              </li>
              <li>
                <strong>(b) Examination and investigation</strong> — to make any
                examination and investigation necessary.
              </li>
              <li>
                <strong>(c) Leaving things undisturbed</strong> — directing that
                premises or anything therein be left undisturbed for as long as
                reasonably necessary.
              </li>
              <li>
                <strong>(d) Measurements and recordings</strong> — taking
                measurements, photographs, recordings.
              </li>
              <li>
                <strong>(e) Samples</strong> — taking samples of articles,
                substances and atmosphere.
              </li>
              <li>
                <strong>(f) Dismantling and testing</strong> — requiring articles
                or substances to be dismantled or tested.
              </li>
              <li>
                <strong>(g) Possession</strong> — taking possession of articles
                or substances for examination or evidence.
              </li>
              <li>
                <strong>(j) Answers and declarations</strong> — requiring
                answers to questions and signed declarations of truth.
              </li>
              <li>
                <strong>(k) Documents</strong> — requiring production of
                documents and inspection / copying.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The Enforcement Management Model — how the inspector decides"
            plainEnglish="The HSE Enforcement Management Model (EMM) is the published framework inspectors use to decide what enforcement action to take. The model has two main inputs: the actual risk gap (how far below adequate standard is the dutyholder), and the benchmark gap (how far below relevant good practice is the situation). The output is one of several enforcement responses ranging from verbal advice through Notification of Contravention (NoC) to Improvement Notice, Prohibition Notice, or referral for prosecution. The model is public and the L3 supervisor should know it exists — it explains why some breaches lead to a notice and others to a prosecution."
            onSite="The L3 supervisor framing for senior management conversations: &quot;this situation would be assessed by the EMM as a clear benchmark gap relative to HSG / ACOP guidance, with risk gap commensurate with the harm potential — the EMM steers an inspector toward at least an Improvement Notice and possibly Prohibition&quot;. The framework makes the conversation evidence-based rather than opinion-based."
          >
            <p>Enforcement responses in escalation order:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Verbal / written advice</strong> — for minor matters or
                first-time dutyholders where compliance is straightforward.
              </li>
              <li>
                <strong>Notification of Contravention (NoC)</strong> — formal
                letter recording the breach; no fee directly but indicates
                inspector opinion (and may trigger FFI).
              </li>
              <li>
                <strong>Improvement Notice (s.21)</strong> — formal notice with
                compliance deadline (typically 28 days+); appeal route to
                Employment Tribunal within 21 days.
              </li>
              <li>
                <strong>Prohibition Notice (s.22)</strong> — immediate stop;
                activity cannot resume until risk addressed; appeal to ET
                within 21 days but appeal does NOT suspend the notice.
              </li>
              <li>
                <strong>Crown Censure</strong> — for Crown bodies (cannot be
                prosecuted) the equivalent serious-action route.
              </li>
              <li>
                <strong>Referral for prosecution</strong> — for the most
                serious breaches; Crown Office in Scotland, CPS in England /
                Wales typically prosecute.
              </li>
              <li>
                <strong>Fee for Intervention (FFI)</strong> — runs alongside
                any enforcement action where material breach is identified.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 — s.40"
            clause={
              <>
                &quot;In any proceedings for an offence under any of the relevant
                statutory provisions consisting of a failure to comply with a
                duty or requirement to do something so far as is practicable or
                so far as is reasonably practicable, or to use the best
                practicable means to do something, it shall be for the accused to
                prove (as the case may be) that it was not practicable or not
                reasonably practicable to do more than was in fact done to
                satisfy the duty or requirement, or that there was no better
                practicable means than was in fact used to satisfy the duty or
                requirement.&quot;
              </>
            }
            meaning={
              <>
                Section 40 — the reverse burden of proof. Where the duty is
                qualified by &quot;practicable&quot; or &quot;reasonably
                practicable&quot;, once the prosecution proves the basic
                non-compliance, the defendant has to prove that nothing further
                was reasonably practicable. The defendant&apos;s evidence
                typically consists of risk assessments, training records,
                supervision records, toolbox talk attendance, near-miss
                response — the contemporaneous documentation that demonstrates
                what was done and why.
              </>
            }
            cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), Part I, s.40."
          />

          <RegsCallout
            source="Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 — Reg 4(1)"
            clause={
              <>
                &quot;Subject to regulation 14, where any person dies as a result
                of a work-related accident, the responsible person must follow
                the reporting procedure.&quot;
              </>
            }
            meaning={
              <>
                RIDDOR 2013 Reg 4 — fatal accident reporting. Reportable events
                under RIDDOR 2013 include work-related deaths (Reg 4),
                specified injuries (Reg 5, e.g. fractures other than finger /
                toe, amputation, blinding, scalping, hot-metal burns, crush,
                consciousness loss from head injury / asphyxia, electrical
                shock with consciousness loss or resuscitation), over-7-day
                incapacitation (Reg 6), occupational diseases (Reg 8),
                dangerous occurrences (Reg 7), gas incidents (Reg 11). Reports
                made online via F2508 to HSE or local authority depending on
                workplace. Reporting is the responsible person&apos;s duty.
              </>
            }
            cite="Source: Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (SI 2013/1471), Reg 4."
          />

          <ConceptBlock
            title="RIDDOR 2013 in detail — what to report, when, how"
            plainEnglish="RIDDOR 2013 sits alongside HASAWA as the reporting framework. The responsible person — typically the employer of the injured person, or the controller of the premises for incidents involving non-employees — must report specified events to the relevant enforcing authority (HSE or local authority depending on workplace category). Reports are made online via F2508 form, with telephone option for major incidents requiring immediate notification. Records of all reportable events must be retained for at least 3 years."
            onSite="The L3 supervisor on an incident: preserve scene, render first aid if competent, summon emergency services if needed, document what happened, brief the firm immediately. The firm then determines RIDDOR reportability and submits. Reporting deadlines: immediately by telephone for fatal / specified injuries; online F2508 within 10 days for over-7-day incapacitation; within 15 days for occupational diseases (within 30 days of first reasonable knowledge). Late or missed reports are themselves offences under Reg 12. The L3&apos;s contemporaneous notes (date, time, sequence, witnesses, photos) are the input to the firm&apos;s RIDDOR submission."
          >
            <p>RIDDOR-reportable events:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 4 — Work-related deaths</strong>.
              </li>
              <li>
                <strong>Reg 5 — Specified injuries</strong>: fractures other
                than finger or toe; amputations; permanent loss of sight; crush
                injuries to head or torso causing damage to brain or internal
                organs; serious burns covering more than 10% body or causing
                damage to eyes / respiratory / vital organs; scalping requiring
                hospital treatment; loss of consciousness from head injury /
                asphyxia; injury from working in enclosed space leading to
                hypothermia / heat-induced illness / requiring resuscitation /
                admission to hospital for more than 24 hours; electrical shock
                leading to loss of consciousness or requiring resuscitation.
              </li>
              <li>
                <strong>Reg 6 — Over-7-day incapacitation</strong>: injury at
                work causing 7+ consecutive days incapacity (excluding day of
                accident).
              </li>
              <li>
                <strong>Reg 7 — Dangerous occurrences</strong>: failures of
                lifting equipment, pressure systems, electrical short-circuit
                or overload causing fire or explosion (Schedule 2), among
                others — including specific electrical-trade categories.
              </li>
              <li>
                <strong>Reg 8 — Occupational diseases</strong>: vibration-related
                conditions (HAVS), occupational asthma, hand / forearm cramp
                from prolonged movement, occupational dermatitis, COSHH agents
                causing cancer or specified diseases.
              </li>
              <li>
                <strong>Reg 9 — Gas incidents</strong> (gas distribution
                operators).
              </li>
              <li>
                <strong>Reg 12 — Record-keeping</strong>: retained 3 years
                minimum; F2508 form copies / equivalent.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="ERA 1996 s.44 and PIDA 1998 — protection for raising concerns"
            plainEnglish="Employment Rights Act 1996 s.44 protects employees from being subjected to detriment by their employer for taking, or proposing to take, certain actions on grounds of health and safety. The protected actions include: bringing reasonable harm or potential harm to the employer&apos;s attention; leaving or refusing to return to a place of work in circumstances of serious and imminent danger; taking appropriate steps in such circumstances. Detriment under s.44 includes disciplinary action, demotion, denial of training, denial of overtime, harassment, dismissal. ERA s.100 separately makes dismissal for these reasons automatically unfair. PIDA 1998 (incorporated into ERA s.43A onward) protects qualifying disclosures more broadly — concerns about criminal offences, regulatory breaches, miscarriages of justice, health and safety risks, environmental damage."
            onSite="The L3 supervisor needs to know these protections exist before any refusal or escalation. The protections aren&apos;t hypothetical — Employment Tribunals award compensation in s.44 / s.100 cases regularly. Tribunal awards include compensation for financial loss and injury to feelings; in the most serious cases (where dismissal followed a protected disclosure) awards can be substantial. The protection covers the act of raising the concern in a reasonable way — text, email, formal report, escalation to manager. It does not protect malicious or knowingly false disclosure."
          >
            <p>ERA s.44 and PIDA 1998 protections in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Bringing harm to employer&apos;s attention</strong> —
                even minor matters; reasonable means.
              </li>
              <li>
                <strong>Refusing dangerous work</strong> — circumstances of
                serious and imminent danger; objectively assessed.
              </li>
              <li>
                <strong>Taking appropriate steps</strong> — leaving the danger,
                summoning assistance, contacting authorities.
              </li>
              <li>
                <strong>Detriment prohibited</strong> — discipline, demotion,
                denial of opportunity, harassment, dismissal.
              </li>
              <li>
                <strong>Automatically unfair dismissal</strong> — ERA s.100
                makes dismissal for these reasons automatically unfair (no
                qualifying period of service required).
              </li>
              <li>
                <strong>PIDA 1998 qualifying disclosures</strong> — wider
                category covering regulatory breach, public-interest disclosure
                to prescribed external bodies after internal route used.
              </li>
              <li>
                <strong>Tribunal route</strong> — Employment Tribunal jurisdiction;
                3-month time limit to bring claim from date of detriment.
              </li>
              <li>
                <strong>Reasonable belief</strong> — protection applies where
                worker reasonably believed the concern was genuine, even if
                later proved unfounded.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Employment Rights Act 1996 — s.44(1)"
            clause={
              <>
                &quot;An employee has the right not to be subjected to any
                detriment by any act, or any deliberate failure to act, by his
                employer done on the ground that — (a) having been designated
                by the employer to carry out activities in connection with
                preventing or reducing risks to health and safety at work, the
                employee carried out (or proposed to carry out) any such
                activities; (b) being a representative of workers on matters of
                health and safety at work... (c) being an employee at a place
                where there was no such representative or safety committee, or
                where there was such a representative or safety committee but
                it was not reasonably practicable for the employee to raise the
                matter by those means, he brought to his employer&apos;s
                attention, by reasonable means, circumstances connected with
                his work which he reasonably believed were harmful or
                potentially harmful to health or safety...&quot;
              </>
            }
            meaning={
              <>
                ERA s.44 — the statutory protection from detriment for raising
                H&amp;S concerns. The protection extends to employees raising
                concerns to their employer by reasonable means. It does not
                require formal designation as a safety representative. The
                test is &apos;reasonable belief&apos; — protection applies even
                if the concern turns out to be unfounded, provided the
                employee believed it genuinely at the time.
              </>
            }
            cite="Source: Employment Rights Act 1996 (1996 c.18), s.44."
          />

          <Scenario
            title="HSE inspector arrives during an EICR — unannounced visit"
            situation={
              <>
                You are partway through a periodic inspection (EICR) at a small
                manufacturing customer. An HSE inspector arrives unannounced,
                shows ID, and asks to speak to the &quot;senior
                electrician&quot;. The customer&apos;s site manager is in a
                meeting elsewhere on site. The inspector wants to discuss the
                contractor&apos;s safe-isolation practice — they&apos;ve been
                following up on a near-miss reported by an operative at another
                firm and are visiting several customers of similar
                contracting firms.
              </>
            }
            whatToDo={
              <>
                Cooperate fully and calmly. (1) Verify the inspector&apos;s ID
                — HSE inspectors carry photo ID; you can ask to see it. (2)
                Acknowledge that you&apos;re here on behalf of your firm and
                will need to phone your contracts manager / Qualified
                Supervisor; the inspector will normally allow this. (3) Don&apos;t
                obstruct (it&apos;s a separate offence under s.33(1)(h)) but
                phone your firm immediately so a senior person can speak to the
                inspector if needed. (4) Answer questions truthfully — false
                statements to inspectors are separately offences under
                s.33(1)(g). (5) Show your safe-isolation method when asked;
                walk through what you&apos;ve done on the current EICR; have
                your GS38 voltage indicator and test records visible. (6) If
                the inspector wants to take photos, measurements, samples, let
                them. (7) The inspector will summarise their findings before
                leaving and indicate next steps — verbal advice, NoC, formal
                notice, or further follow-up by phone / letter. Document the
                visit in your own notebook immediately afterwards — date,
                time, inspector name, what was discussed, what was shown,
                what they took. Email your firm a written summary by end of
                day.
              </>
            }
            whyItMatters={
              <>
                Most HSE visits proceed routinely; the inspector is doing their
                job; cooperation gets the right outcome. The L3 supervisor who
                stays calm, cooperates fully, answers truthfully and documents
                the visit afterwards is doing exactly what the firm needs.
                Hiding records, lying about practice, or obstructing the
                inspector all turn a routine visit into a serious enforcement
                event. Your own personal exposure under s.33 (false
                statements, obstruction) is real. The cooperation reflex is
                also the firm&apos;s mitigating factor under the Sentencing
                Council guideline if any subsequent prosecution arises.
              </>
            }
          />

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
            "HASAWA s.40 reverse burden — defendant must prove SFAIRP compliance; documentation is the defence.",
            "HSE inspector powers under HASAWA s.20-22; cooperate, answer truthfully, document the visit.",
            "EMM (Enforcement Management Model) drives the inspector&apos;s choice — verbal advice → NoC → Improvement Notice → Prohibition Notice → prosecution.",
            "RIDDOR 2013 reporting framework — fatalities, specified injuries, over-7-day, occupational disease, dangerous occurrences.",
            "CDM 2015 Reg 9 contractor duties — plan, manage, monitor — operationalised by the L3 representative on small projects via the CPP.",
            "CMCHA 2007 corporate manslaughter — &apos;senior management organisation&apos; test; unlimited fines; publicity orders.",
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
