/**
 * Module 1 · Section 5 · Subsection 2 — CDM 2015: apprentice transition Worker → Contractor
 * Maps to C&G 2365-03 / Unit 201 — supplementary depth (beyond AC framework)
 * Layered depth from 2357 Unit 601 ELTK01 — own and others' responsibilities at L3
 * Cross-references 2365-03 Unit 201 / LO1 / AC 1.1 (Section 1.3 covered MHSWR + CDM)
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { TLDR, ConceptBlock, RegsCallout, CommonMistake, Scenario, KeyTakeaways, FAQ, LearningOutcomes, ContentEyebrow, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'CDM 2015 transition Worker → Contractor | Level 3 Module 1.5.2 | Elec-Mate';
const DESCRIPTION = 'L3 transition under CDM 2015 — from Reg 15 worker (L2) to Reg 9 contractor representative (L3). Planning, managing, monitoring duties.';

const checks = [
  { id: 'l3-m1-s5-sub2-reg9', question: 'Under CDM 2015 Reg 9, what does a contractor have to do?', options: ['Just turn up.', 'Plan, manage and monitor construction work either by themselves or by workers under their control. Apply general principles of prevention. Comply with directions of principal designer / principal contractor. Verify the client knows their duties.', 'Just invoice.', 'Just lift things.'], correctIndex: 1, explanation: 'Reg 9 = plan, manage, monitor. The L3 supervisor is increasingly the firm\'s eyes and ears for these duties on site.' },
  { id: 'l3-m1-s5-sub2-reg15', question: 'Under CDM 2015 Reg 15, what does a worker have to do?', options: ['Hide.', 'Cooperate with all CDM dutyholders, comply with CDM, and report to PC / contractor anything likely to endanger health and safety.', 'Sleep.', 'Refuse work.'], correctIndex: 1, explanation: 'Reg 15 = cooperate, comply, report. The L2 baseline. L3 keeps Reg 15 AND increasingly contributes to Reg 9.' },
  { id: 'l3-m1-s5-sub2-shift', question: 'What\'s the L2 → L3 CDM shift in plain terms?', options: ['Same.', 'L2 mostly Reg 15 worker — comply, cooperate, report. L3 starts to act as the firm\'s Reg 9 contractor representative — plan, manage, monitor on small jobs. Especially when leading a small team or running a single-contractor job alone.', 'Reverse.', 'Random.'], correctIndex: 1, explanation: 'L3 transitions — still a worker but contributes increasingly to contractor responsibilities.' },
];

const quizQuestions = [
  { id: 1, question: 'When does CDM 2015 apply?', options: ['Only big projects.', 'All construction work including alteration and refurbishment. No monetary threshold. F10 notification only required for projects &gt;30 days/20 workers OR &gt;500 person-days. CDM duties apply regardless of notifiability.', 'Only over £50k.', 'Only new builds.'], correctAnswer: 1, explanation: 'CDM applies to all construction. Notifiability only changes the F10. Many small jobs are CDM projects.' },
  { id: 2, question: 'Define "construction work" under CDM 2015.', options: ['Just building houses.', 'Carrying out any building, civil engineering or engineering construction work; including alteration, renovation, demolition, conversion, repair, maintenance, decoration, removal of structures, installation, removal, maintenance of mechanical / electrical / similar services.', 'Only with cement.', 'Only outdoor.'], correctAnswer: 1, explanation: 'Wide definition. Most electrical contracting work falls within CDM scope.' },
  { id: 3, question: 'Who\'s the principal contractor (PC) under CDM 2015?', options: ['Always the architect.', 'On multi-contractor projects, the client appoints a PC who coordinates the construction phase. Responsible for the construction phase plan, site induction (Reg 13), cooperation with other contractors, prevention of unauthorised access, welfare facilities.', 'Never appointed.', 'Only on bridges.'], correctAnswer: 1, explanation: 'PC only on multi-contractor projects. Single-contractor projects = no PC; contractor takes those duties.' },
  { id: 4, question: 'What\'s a Construction Phase Plan (CPP)?', options: ['A blueprint.', 'Document required by CDM Reg 12 (single contractor) or Reg 16 (multi-contractor / PC writes it). Sets out the H&S arrangements for the construction phase. Must be in place BEFORE construction starts. HSE CIS80 template suitable for small projects.', 'Architectural drawing.', 'Customer agreement.'], correctAnswer: 1, explanation: 'CPP mandatory for every project. Brief for small; detailed for complex.' },
  { id: 5, question: 'What changes for the L3 apprentice when leading a small CDM project?', options: ['Nothing.', 'L3 acts as the firm\'s contractor representative on site — verifies client awareness (Reg 9(1)), implements the CPP, briefs operatives, monitors compliance, escalates issues. The Reg 9 contractor duties run through the firm\'s representative on the day.', 'Just signs an invoice.', 'Just opens the door.'], correctAnswer: 1, explanation: 'L3 = firm\'s contractor representative. Reg 9 duties operationalised by the L3\'s actions.' },
  { id: 6, question: 'What\'s "client awareness" under CDM Reg 9(1)?', options: ['Customer mood.', 'Contractor must satisfy themselves the client knows their CDM client duties before starting work — particularly relevant on commercial projects where domestic-style cascade doesn\'t apply.', 'Customer satisfaction.', 'Customer payment.'], correctAnswer: 1, explanation: 'Reg 9(1) check. Brief conversation but mandatory.' },
  { id: 7, question: 'How does the domestic carve-out affect CDM duties?', options: ['Removes them.', 'Most client duties (Reg 4) cascade from domestic homeowner to contractor (single-contractor) or principal contractor (multi-contractor). The homeowner remains client in name but contractor holds the operational duty. Non-domestic clients retain their duties.', 'Doubles them.', 'Random.'], correctAnswer: 1, explanation: 'Domestic carve-out shifts client duties to contractor. Non-domestic doesn\'t.' },
  { id: 8, question: 'What\'s the L3 supervisor\'s contractor-representative checklist on a small project?', options: ['Just turn up.', '(1) Verify CPP exists and reflects the work. (2) Verify client awareness conversation. (3) Brief operatives on the CPP. (4) Identify hazards via dynamic risk assessment. (5) Manage and monitor work in practice. (6) Document the day\'s safety actions. (7) Escalate issues. (8) Close out at end of project — lessons, records, cleanup.', 'Random.', 'Just sign.'], correctAnswer: 1, explanation: 'Eight-point operational checklist for L3 acting as contractor representative.' },
];

const faqs = [
  { question: 'If I\'m running a small job, am I "the contractor" or just "the worker"?', answer: 'You\'re the worker (Reg 15) personally. Your firm is the contractor (Reg 9). You act as the firm\'s representative on site — operationalising Reg 9 through your actions while still personally bound by Reg 15.' },
  { question: 'Does the apprentice need to know all the CDM dutyholders?', answer: 'At L3, yes — broadly. Knowing the cast (Client / Designer / PD / PC / Contractor / Worker) lets you navigate the project relationships and know who\'s accountable for what.' },
  { question: 'Is a 1-day call-out a "construction project"?', answer: 'Yes — CDM applies to all construction work; no minimum size. CPP can be brief but must exist. The HSE CIS80 template is the practical tool.' },
  { question: 'What if the client (commercial) doesn\'t know their CDM duties?', answer: 'Reg 9(1) — contractor must satisfy themselves the client knows. If they don\'t, contractor either educates them or doesn\'t start work. Most commercial clients have basic awareness; some don\'t and the conversation is the contractor\'s responsibility.' },
  { question: 'How does the L3 transition affect my JIB grading?', answer: 'JIB grading reflects competence and qualification level. L3 typically progresses to Approved Electrician status post-qualification with appropriate experience and competence demonstration; CDM contractor-level capability is part of the broader competence picture.' },
  { question: 'Can I refuse to act as the firm\'s contractor representative if I don\'t feel ready?', answer: 'Yes — EAWR Reg 16 competence applies. ERA s.44 protects refusal. The firm should match the role to actual L3 readiness; "you\'re L3 so you can run this" isn\'t automatic.' },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section5')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"><ArrowLeft className="h-4 w-4" /> Section 5</button>
          <PageHero eyebrow="Module 1 · Section 5 · Subsection 2" title="CDM 2015 — apprentice transition Worker → Contractor" description="Remember from Section 1.3 — CDM 2015 covers all construction. At L3 you start to act as the firm's Reg 9 contractor representative on site — planning, managing, monitoring." tone="emerald" />
          <TLDR points={[
            "L2 = Reg 15 worker (cooperate, comply, report). L3 = still Reg 15 PLUS contributing to Reg 9 contractor duties (plan, manage, monitor) as firm's representative.",
            "CDM applies to all construction work — no monetary threshold. F10 notification only for projects &gt;30 days/20 workers OR &gt;500 person-days.",
            "L3 supervisor checklist on a small project: verify CPP, verify client awareness, brief operatives, dynamic risk assessment, manage and monitor, document, escalate, close out.",
          ]} />
          <LearningOutcomes outcomes={[
            "Identify CDM 2015 dutyholder roles and the L2 → L3 transition from worker to contractor representative.",
            "State Reg 9 contractor duties: plan, manage, monitor, comply with PD/PC directions, verify client awareness.",
            "State Reg 15 worker duties: cooperate, comply, report.",
            "Recognise the application of CDM to all construction work regardless of size.",
            "Distinguish single-contractor and multi-contractor projects and the role of the principal contractor.",
            "Apply the L3 contractor-representative checklist on a small project.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>The transition</ContentEyebrow>
          <ConceptBlock title="From worker to contractor's eyes-and-ears" plainEnglish="At L2 you sat firmly inside Reg 15. At L3 you still hold Reg 15 personally but increasingly act as the firm's Reg 9 representative on site. The firm's contractor duties (plan, manage, monitor) are operationalised through your day-to-day actions when you're leading a small job or supervising junior trades." onSite="The transition is gradual. At first the L3 brief is mostly Reg 15 with some Reg 9 input. By end of L3 / start of post-qualification many operatives are routinely acting as contractor representative on small jobs.">
            <p>Practical examples of the transition:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Briefing an L2 mate on the day&apos;s plan = Reg 9 manage.</li>
              <li>Dynamic risk assessment on arrival = Reg 9 plan + monitor.</li>
              <li>Intervening when you see an unsafe practice = Reg 9 monitor + manage.</li>
              <li>Verifying the customer (commercial) knows their CDM client duties = Reg 9(1) contractor act.</li>
              <li>Updating the CPP if conditions change = Reg 9 plan.</li>
              <li>End-of-day debrief and lessons-learned = Reg 9 monitor + review.</li>
              <li>Reporting near-misses up = both Reg 15 (worker) and Reg 9 (contractor).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="CDM 2015 — Reg 9(1)" clause={<>"A contractor must not carry out construction work in relation to a project unless satisfied that the client is aware of the duties owed by the client under these Regulations."</>} meaning={<>The contractor&apos;s client-awareness duty. Brief conversation but mandatory before starting. The L3 representative often has this conversation on small jobs where the contracts manager isn&apos;t present.</>} cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 9 — verbatim from legislation.gov.uk." />

          <RegsCallout source="CDM 2015 — Reg 15(b)" clause={<>"A worker must — (b) report to the principal contractor or, where there is no principal contractor, the contractor any defect or unsafe practice which they believe is likely to endanger their own health or safety or that of any other person."</>} meaning={<>The worker reporting duty. At L3 you both DO the reporting and (when acting as contractor representative) RECEIVE reports from junior workers.</>} cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 15 — verbatim from legislation.gov.uk." />

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>The contractor representative checklist</ContentEyebrow>
          <ConceptBlock title="Operationalising Reg 9 on a small project" plainEnglish="Eight-point checklist for L3 acting as the firm's contractor representative on a small project." onSite="Each item is small (a few minutes) but together they discharge the Reg 9 duty operationally. Document as you go.">
            <p>The checklist:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Verify Construction Phase Plan exists and reflects the actual work.</li>
              <li>Verify client awareness (Reg 9(1)) — particularly non-domestic clients.</li>
              <li>Brief operatives on the CPP and the day&apos;s plan.</li>
              <li>Walk-round and dynamic risk assessment on arrival.</li>
              <li>Manage and monitor work in practice — observation, intervention.</li>
              <li>Document the day&apos;s safety actions in the job pack.</li>
              <li>Escalate issues that exceed your competence or authority.</li>
              <li>Close out at end of project — lessons, records, cleanup, RAMS update if needed.</li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Single-contractor vs multi-contractor projects" plainEnglish="Single-contractor — no PC; contractor holds all the construction-phase duties. Multi-contractor — client appoints PC who coordinates; individual contractors still hold Reg 9. The L3 may be the only firm representative on a small single-contractor job; on a multi-contractor project the L3 cooperates with the PC's arrangements." onSite="On single-contractor: contractor (your firm) writes the CPP and runs the show. On multi-contractor: PC coordinates and runs the site induction; individual contractors fit into the PC's arrangements.">
            <p>Differences in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single-contractor — contractor writes CPP (CIS80 template fine for small).</li>
              <li>Multi-contractor — PC writes CPP; individual contractors contribute method statements.</li>
              <li>Single-contractor — no formal site induction unless the contractor chooses to provide one.</li>
              <li>Multi-contractor — PC delivers site induction (Reg 13); workers must attend.</li>
              <li>Single-contractor — contractor handles welfare arrangements directly.</li>
              <li>Multi-contractor — PC provides welfare or coordinates provision.</li>
              <li>Both — Reg 15 worker duty applies to every operative.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>F10 notification and the notifiability test</ContentEyebrow>
          <ConceptBlock title="When the project must be notified to HSE" plainEnglish="F10 notification is required where construction work is scheduled to last more than 30 working days AND have more than 20 workers simultaneously, OR exceed 500 person-days. Notification is via online F10 form to HSE and is the client&apos;s duty under CDM 2015 Reg 6, though contractors often draft and submit on the client&apos;s behalf." onSite="The L3 reflex on a project: count days x workers; estimate person-days. If borderline, notify rather than not — over-notification has no penalty, under-notification is a Reg 6 breach. F10 must be displayed visibly on site once submitted and updated if particulars change.">
            <p>Notifiability test details:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Trigger A: more than 30 working days AND more than 20 workers at any one time.</li>
              <li>Trigger B: more than 500 person-days total.</li>
              <li>Either trigger requires F10 notification BEFORE construction phase starts.</li>
              <li>Client&apos;s duty under Reg 6 — contractor often drafts in practice.</li>
              <li>Visible display of F10 on site is a routine HSE inspection check.</li>
              <li>Notification does NOT bring extra duties — CDM duties apply regardless of notifiability. The F10 just lets HSE know the project exists.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="CDM 2015 — Reg 6(1)" clause={<>&quot;A project is notifiable if the construction work on a construction site is scheduled to — (a) last longer than 30 working days and have more than 20 workers working simultaneously at any point in the project; or (b) exceed 500 person days.&quot;</>} meaning={<>The notifiability test. Note the AND in trigger (a) — both conditions must apply. Trigger (b) is a single test on aggregate person-days. Most domestic and small-commercial work falls below; medium / large refurbishment and new-build typically above.</>} cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 6 — verbatim from legislation.gov.uk." />

          <ConceptBlock title="Pre-construction information and the design link" plainEnglish="CDM Reg 4(4) requires the client to provide pre-construction information (PCI) to designers and contractors. PCI covers known hazards (asbestos, services, structural), site context, project arrangements, and any existing risk-relevant information. The contractor uses PCI to plan safe construction." onSite="The L3 contractor representative asks for PCI on every commercial job. Absence of PCI is itself a risk indicator — domestic clients rarely have any, commercial clients often have a basic pack, HRRB clients have extensive PCI. Brief the team on what PCI tells you about the site before walking on.">
            <p>PCI typically contains:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Known asbestos register / refurbishment survey.</li>
              <li>Existing services drawings (electrical / mechanical / drainage).</li>
              <li>Structural information including loadings.</li>
              <li>Previous incident history on the site.</li>
              <li>Site access, welfare, security arrangements.</li>
              <li>Adjacent occupants, vulnerable users (school next door etc).</li>
              <li>Time and resource expectations.</li>
              <li>HRRB-specific safety case extracts where applicable.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Designer and Principal Designer duties under CDM" plainEnglish="CDM gives designers (anyone preparing or modifying a design) a Reg 9 duty to eliminate / reduce / control risks foreseeable during construction, use, maintenance and demolition. On multi-contractor projects the client appoints a Principal Designer (Reg 11) to coordinate the pre-construction phase. The L3 supervisor recognises designer outputs (drawings, schedules, RAMS) as carrying CDM duties — not just technical preferences." onSite="Where a design is unsafe to build (no safe access for cable routing, no isolation point in plant room layout) the L3 supervisor flags it back to the design team via the principal designer. Designer changes site decisions; site does not paper over designer omissions. This is a Reg 9 designer duty, not optional.">
            <p>Designer / PD touchpoints:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Designer eliminates risk where possible (safer materials, layouts, sequences).</li>
              <li>Designer reduces / controls residual risks.</li>
              <li>Designer provides information about residual risks to others.</li>
              <li>PD coordinates pre-construction phase H&amp;S on multi-contractor projects.</li>
              <li>PD prepares pre-construction information.</li>
              <li>PD prepares health and safety file at end of project.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Reg 13 site induction on multi-contractor projects" plainEnglish="On multi-contractor projects the principal contractor must provide a site induction (CDM Reg 13) covering the construction phase plan, site rules, hazards, welfare, emergency arrangements, accident reporting, security. Every worker attends before working on site. The L3 contractor representative ensures their team attends and signs in." onSite="Common L3 supervisor failures: assuming an experienced colleague does not need induction; arriving on site without sign-in; missing the induction because of late arrival. All breach Reg 13 from the worker&apos;s side and Reg 9 from the contractor&apos;s side. Plan to arrive 30 minutes early on day 1.">
            <p>Reg 13 induction typically covers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Construction phase plan summary.</li>
              <li>Site-specific hazards (services, asbestos, traffic, height, neighbours).</li>
              <li>Site rules (PPE, sign-in, smoking, vehicle movements).</li>
              <li>Welfare locations.</li>
              <li>Emergency arrangements (alarm, assembly point, fire wardens, first aiders).</li>
              <li>Accident and near-miss reporting.</li>
              <li>Permit-to-work systems where used.</li>
              <li>Communication and escalation routes.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Health and Safety File — the project legacy document" plainEnglish="On multi-contractor projects the principal designer (or principal contractor at handover if no PD) prepares the Health and Safety File. This is the as-built record of residual risks, materials used, locations of services, maintenance considerations, anything future owners / users / contractors need to know to use and maintain the building safely. Handed to the client at project completion." onSite="L3 supervisor contribution to the H&amp;S File: as-built electrical drawings, equipment schedules, manuals, certification packs, isolation diagrams, fire-safety circuit information. Submit cleanly to the principal contractor / designer for incorporation. On HRRBs this becomes part of the golden thread.">
            <p>Typical H&amp;S File contents:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>As-built drawings (electrical, mechanical, drainage, structural).</li>
              <li>Equipment manuals and maintenance schedules.</li>
              <li>Materials specifications including hazardous materials.</li>
              <li>Cleaning / maintenance regime including access.</li>
              <li>Isolation and emergency procedures.</li>
              <li>Residual risks and any remaining hazards.</li>
              <li>Certification (EIC, commissioning, fire alarm, emergency lighting).</li>
              <li>Information about modifications / alterations completed.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <CommonMistake title="Acting as contractor representative without formal handover from supervisor" whatHappens={<>Apprentice arrives on small job; supervisor hasn&apos;t briefed them as the lead; assumes apprentice knows the CPP exists and what&apos;s in it; apprentice doesn&apos;t verify; works to assumed plan; doesn&apos;t complete client awareness check; HSE inspector visits during the work; finds the CPP doesn&apos;t cover the actual work being done; firm prosecuted under Reg 9.</>} doInstead={<>Demand a formal handover before being asked to act as contractor representative. CPP, RAMS, client details, scope, hazards, controls — all briefed by the supervisor before you take on the role.</>} />

          <CommonMistake title="Assuming the customer (commercial) knows their CDM duties" whatHappens={<>L3 starts work on commercial project without having the Reg 9(1) client-awareness conversation. Customer thinks they&apos;ve hired a contractor and have no further obligation. Customer fails CDM client duties (e.g. provide pre-construction information). HSE finds gap; contractor faulted for not checking under Reg 9(1).</>} doInstead={<>Brief client-awareness conversation at start of every commercial job. Two minutes; documented. Customer briefed on their CDM duties (cooperation, providing information, ensuring sufficient time and resources). Many customers don&apos;t know — the contractor representative explains.</>} />

          <Scenario title="L3 leading first small commercial single-contractor job" situation={<>Your contracts manager hands you a small commercial socket-installation job — 2 days, single contractor (your firm), commercial client (small office). One L2 mate with you. The contracts manager says "you can run this — here's the RAMS, get on with it" and disappears. You realise no CPP exists; client awareness hasn't been confirmed; the L2 hasn\'t been briefed.</>} whatToDo={<>Apply the contractor-representative checklist. (1) CPP — write a brief one using the CIS80 template (15 minutes); covers the work, the hazards, the controls, the welfare arrangements, the emergency procedure. (2) Client awareness — phone the client&apos;s designated contact; brief 5-minute conversation about CDM client duties (cooperate, provide info, ensure time/resources); document. (3) Operative briefing — sit with the L2 mate; walk through the CPP, the RAMS, the day&apos;s plan, hazards expected, who to contact in emergency; signed attendance log. (4) Walk-round on arrival; dynamic risk assessment; document. (5) Throughout — observe, intervene, document. (6) End of day - debrief with L2; note any near-misses; update CPP if conditions changed. (7) End of project — lessons-learned summary back to firm; close out CPP; cleanup. Phone contracts manager if anything escalates beyond competence; ERA s.44 protects refusal if you don&apos;t feel ready.</>} whyItMatters={<>This is the L2 → L3 transition in action. The contracts manager&apos;s hand-off was inadequate (common); the L3&apos;s response operationalises the CDM Reg 9 contractor duties through the checklist. The 30-60 minutes invested up-front in CPP + client awareness + operative briefing creates the safety system that runs through the project. The HSE inspector visiting on day 1 sees a competent contractor representative running a structured project; the alternative (no CPP, no briefing, ad-hoc execution) is a Reg 9 prosecution waiting to happen.</>} />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 1.3 — CDM applies to all construction work. At L3 you transition from Reg 15 worker to Reg 9 contractor representative.",
            "L2 = Reg 15 (cooperate, comply, report). L3 = Reg 15 PLUS contributing to firm\'s Reg 9 (plan, manage, monitor).",
            "Reg 9(1) — contractor verifies client awareness before starting. Brief but mandatory conversation.",
            "Reg 12 / 16 — Construction Phase Plan mandatory for every project. CIS80 template adequate for small.",
            "Single-contractor: contractor writes CPP, runs the show. Multi-contractor: PC writes CPP, coordinates site.",
            "L3 contractor-representative checklist: verify CPP, verify client awareness, brief team, dynamic RA, manage and monitor, document, escalate, close out.",
            "Demand formal handover from supervisor before acting as contractor representative.",
            "ERA s.44 protects refusal if you don\'t feel ready for the contractor-representative role.",
          ]} />
          <Quiz title="CDM transition — knowledge check" questions={quizQuestions} />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section5-1')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">5.1 Dutyholder responsibilities</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module1-section5-3')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">5.3 Sentencing Council guideline</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
