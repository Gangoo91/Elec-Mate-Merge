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
  { id: 'l3-m1-s5-sub2-reg9', question: 'Under CDM 2015 Reg 9, what does a contractor have to do?', options: [
    'Test equipment leads, probes and accessories — limiting exposed metal at the probe tip, fused leads, no clip ends for live testing, current limiters, and the requirement for prove/test/prove on a known-good supply.',
    'Electrical Installation Certificate (EIC) + Schedule of Inspections + Schedule of Test Results — the three together form the complete certification pack required by Section 644 for new installations and significant alterations.',
    'Intervene immediately. Politely but clearly: "stop, that\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s not safe — let\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s do it differently". Don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t wait for an incident. Document the intervention and the corrected method. If the colleague refuses to change, escalate. Intervention is part of the L3 supervisor\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s s.7(b) cooperation duty.',
    'Plan, manage and monitor construction work either by themselves or by workers under their control. Apply general principles of prevention. Comply with directions of principal designer / principal contractor. Verify the client knows their duties.',
  ], correctIndex: 3, explanation: 'Reg 9 = plan, manage, monitor. The L3 supervisor is increasingly the firm\'s eyes and ears for these duties on site.' },
  { id: 'l3-m1-s5-sub2-reg15', question: 'Under CDM 2015 Reg 15, what does a worker have to do?', options: [
    'The ability to resist or delay an immediate emotional urge in order to consider consequences and choose a more constructive response',
    'Insurance may be invalid, enforcement notices issued, and Responsible Person may face prosecution',
    'Cooperate with all CDM dutyholders, comply with CDM, and report to PC / contractor anything likely to endanger health and safety.',
    'Provide specific, verifiable evidence of your competence and demonstrate that you understand acceptable parameters and can interpret results correctly',
  ], correctIndex: 2, explanation: 'Reg 15 = cooperate, comply, report. The L2 baseline. L3 keeps Reg 15 AND increasingly contributes to Reg 9.' },
  { id: 'l3-m1-s5-sub2-shift', question: 'What\'s the L2 → L3 CDM shift in plain terms?', options: [
    'In TN, the earth at the consumer is connected back to the source neutral via the DNO supply (low Ze, high fault current, MCB-based ADS). In TT, the earth at the consumer is a local electrode in soil (high Ze, low fault current, RCD-based ADS).',
    'Heart rate exceeding approximately 100 beats per minute (outside of physical exertion), accompanied by difficulty thinking clearly, tunnel vision, or an urge to flee or fight',
    'L2 mostly Reg 15 worker — comply, cooperate, report. L3 starts to act as the firm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s Reg 9 contractor representative — plan, manage, monitor on small jobs. Especially when leading a small team or running a single-contractor job alone.',
    'It highlights the critical moment of choice between an emotional trigger and our reaction — recognising and expanding this space is a core EI skill that separates reactive from intentional behaviour',
  ], correctIndex: 2, explanation: 'L3 transitions — still a worker but contributes increasingly to contractor responsibilities.' },
];

const quizQuestions = [
  { id: 1, question: 'When does CDM 2015 apply?', options: [
    'The goal lacks genuine commitment &mdash; the electrician may not truly value the 2396 or believe they can achieve it, undermining persistence as described by Locke &amp; Latham',
    'All construction work including alteration and refurbishment. No monetary threshold. F10 notification only required for projects &gt;30 days/20 workers OR &gt;500 person-days. CDM duties apply regardless of notifiability.',
    'As a systematic exercise covering all assets, and reviewed periodically or when operating conditions change, new equipment is added, or following significant failures that reveal previously underestimated consequences',
    'Required element of safety case. PAP must engage residents on building safety - communication, complaints procedure, opportunity to raise concerns, information about safety arrangements. BSA 2022 explicitly empowers resident voice.',
  ], correctAnswer: 1, explanation: 'CDM applies to all construction. Notifiability only changes the F10. Many small jobs are CDM projects.' },
  { id: 2, question: 'Define "construction work" under CDM 2015.', options: [
    'BS 7671 defines the technical standards against which electrical systems are designed, installed, tested and maintained — a maintenance technician must understand these standards to maintain systems safely',
    'Walk them through hazard identification on real jobs; ask "what hazards do you see here?"; explain reasoning behind controls; show them how to write a dynamic assessment note; review their attempts; correct calibration over time.',
    'Carrying out any building, civil engineering or engineering construction work; including alteration, renovation, demolition, conversion, repair, maintenance, decoration, removal of structures, installation, removal, maintenance of mechanical / electrical / similar services.',
    'Segregating the work area with barriers/signage, scheduling noisy or dust-creating tasks outside occupied hours where possible, and using dust extraction and low-voltage 110 V CTE tools or RCD-protected 230 V supply',
  ], correctAnswer: 2, explanation: 'Wide definition. Most electrical contracting work falls within CDM scope.' },
  { id: 3, question: 'Who\'s the principal contractor (PC) under CDM 2015?', options: [
    'It causes people to selectively notice and remember information that confirms their existing emotional beliefs while ignoring contradictory evidence, creating a distorted self-picture',
    'Meet each person individually using the SBI model to understand their perspective, then facilitate a joint discussion where both parties share their concerns, identify underlying interests (skills development, recognition, fairness), and collaboratively agree a fair rotation or allocation that addresses both people\\\\\\\\\\\\\\\'s needs',
    'Toastmasters operationalises Bandura theory: mastery through progressive challenges, vicarious learning, social persuasion through evaluations, and managing anxiety through practice',
    'On multi-contractor projects, the client appoints a PC who coordinates the construction phase. Responsible for the construction phase plan, site induction (Reg 13), cooperation with other contractors, prevention of unauthorised access, welfare facilities.',
  ], correctAnswer: 3, explanation: 'PC only on multi-contractor projects. Single-contractor projects = no PC; contractor takes those duties.' },
  { id: 4, question: 'What\'s a Construction Phase Plan (CPP)?', options: [
    'Document required by CDM Reg 12 (single contractor) or Reg 16 (multi-contractor / PC writes it). Sets out the H&S arrangements for the construction phase. Must be in place BEFORE construction starts. HSE CIS80 template suitable for small projects.',
    'The immediate priority is to open the airway using a jaw thrust (rather than head tilt) to minimise spinal movement, and commence CPR if no breathing is detected — the need to resuscitate overrides the spinal precaution to avoid movement',
    'Heat (lofts, plant rooms, summer outdoor — heat stress, dehydration, equipment overheat); cold (numb fingers, brittle PVC sheathing, slip risk on ice); rain (water tracking on first-fix, shock risk, slip); wind (working at height risk, dropped tools); lightning (outdoor work risk).',
    'Sequencing tasks so that critical-path activities are completed first, ensuring all parts and tools are available before the shutdown begins, and allowing contingency time for unexpected findings',
  ], correctAnswer: 0, explanation: 'CPP mandatory for every project. Brief for small; detailed for complex.' },
  { id: 5, question: 'What changes for the L3 apprentice when leading a small CDM project?', options: [
    'A hole saw of the correct diameter on a cordless combi drill — cuts a clean circular hole sized exactly to the downlight aperture (typically 65 mm or 75 mm). For the rough access cut where you need a square hole or are running cable through, a multi-tool (oscillating multi-cutter, Bosch GOP / Fein MultiMaster) gives a controlled plunge cut without dust kicking up half the room.',
    'L3 acts as the firm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s contractor representative on site — verifies client awareness (Reg 9(1)), implements the CPP, briefs operatives, monitors compliance, escalates issues. The Reg 9 contractor duties run through the firm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s representative on the day.',
    'HASAWA s.3 — duty of every employer (and self-employed person) to conduct their undertaking in such a way as to ensure, so far as is reasonably practicable, that persons NOT in their employment who may be affected are not exposed to risks to their health or safety. Visitors, neighbours, members of the public — all caught.',
    'Provided to the customer (full pack — EIC + Schedule of Inspections + STR), retained by the contractor (typically minimum six years), and uploaded to any applicable Competent Person Scheme (NICEIC, NAPIT, Stroma, ECA etc.) within the scheme\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s required notification window — typically 30 days for Part P-notifiable work.',
  ], correctAnswer: 1, explanation: 'L3 = firm\'s contractor representative. Reg 9 duties operationalised by the L3\'s actions.' },
  { id: 6, question: 'What\'s "client awareness" under CDM Reg 9(1)?', options: [
    'L-N, L-E and N-E for single-phase; L1-L2 / L1-L3 / L2-L3 / L-N each phase / L-E each phase / N-E for three-phase, all at the POINT OF WORK.',
    'Identify the discharged cells as defective (sulphation or open internal connection), test specific gravity, and replace as a matched set; never mix new and old cells in a series string',
    'Contractor must satisfy themselves the client knows their CDM client duties before starting work — particularly relevant on commercial projects where domestic-style cascade doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t apply.',
    'Management survey identifies ACMs likely to be disturbed in normal use; R&D survey is fully intrusive and locates all ACMs prior to refurbishment or demolition',
  ], correctAnswer: 2, explanation: 'Reg 9(1) check. Brief conversation but mandatory.' },
  { id: 7, question: 'How does the domestic carve-out affect CDM duties?', options: [
    'Because maintenance technicians are uniquely positioned to identify and implement energy efficiency improvements during routine work, contributing to organisational sustainability and cost reduction',
    'A method of placing negative feedback between two positive comments, now considered less effective because it can feel insincere, dilute the message, and train people to brace for criticism whenever they hear praise',
    'Installers of standard domestic and small commercial installations — it pulls the most-used BS 7671 tables (cable sizing, diversity, ratings) into a pocket-sized reference and explains the standard install methods.',
    'Most client duties (Reg 4) cascade from domestic homeowner to contractor (single-contractor) or principal contractor (multi-contractor). The homeowner remains client in name but contractor holds the operational duty. Non-domestic clients retain their duties.',
  ], correctAnswer: 3, explanation: 'Domestic carve-out shifts client duties to contractor. Non-domestic doesn\'t.' },
  { id: 8, question: 'What\'s the L3 supervisor\'s contractor-representative checklist on a small project?', options: [
    '(1) Verify CPP exists and reflects the work. (2) Verify client awareness conversation. (3) Brief operatives on the CPP. (4) Identify hazards via dynamic risk assessment. (5) Manage and monitor work in practice. (6) Document the day\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s safety actions. (7) Escalate issues. (8) Close out at end of project — lessons, records, cleanup.',
    'Per CAR 2012 Reg 6 (assessment) + Reg 8 (licensed work) + HSE guidance L143. Considers: type of asbestos (chrysotile/amosite/crocidolite); friability; quantity; nature of work (removal vs encapsulation vs observation); duration; exposure level.',
    'After a stressful incident (e.g., a near-miss or heated confrontation), you should delay important decisions and conversations for at least 20 minutes where possible, allowing the physiological stress response to subside before engaging',
    'Energy efficiency targets and Future Homes Standard direction make heat pumps standard for new builds. Heat pumps require electrical infrastructure (single-phase 32A+ or three-phase), F-Gas certified refrigerant work, controls integration. Significant trade work.',
  ], correctAnswer: 0, explanation: 'Eight-point operational checklist for L3 acting as contractor representative.' },
];

const faqs = [
  { question: 'If I\'m running a small job, am I "the contractor" or just "the worker"?', answer: 'You\'re the worker (Reg 15) personally. Your firm is the contractor (Reg 9). You act as the firm\'s representative on site — operationalising Reg 9 through your actions while still personally bound by Reg 15.' },
  { question: 'Does the apprentice need to know all the CDM dutyholders?', answer: 'At L3, yes — broadly. Knowing the cast (Client / Designer / PD / PC / Contractor / Worker) lets you navigate the project relationships and know who\'s accountable for what.' },
  { question: 'Is a 1-day call-out a "construction project"?', answer: 'Yes — CDM applies to all construction work; no minimum size. CPP can be brief but must exist. The HSE CIS80 template is the practical tool.' },
  { question: 'What if the client (commercial) doesn\'t know their CDM duties?', answer: 'Reg 9(1) — contractor must satisfy themselves the client knows. If they don\'t, contractor either educates them or doesn\'t start work. Most commercial clients have basic awareness; some don\'t and the conversation is the contractor\'s responsibility.' },
  { question: 'How does the L3 transition affect my JIB grading?', answer: 'JIB grading reflects competence and qualification level. L3 typically progresses to Approved Electrician status post-qualification with appropriate experience and competence demonstration; CDM contractor-level capability is part of the broader competence picture.' },
  { question: 'Can I refuse to act as the firm\'s contractor representative if I don\'t feel ready?', answer: 'Yes — EAWR Reg 16 competence applies. ERA s.44 protects refusal. The firm should match the role to actual L3 readiness; "you\'re L3 so you can run this" isn\'t automatic.' },
  { question: 'What is the difference between a Method Statement and a RAMS?', answer: 'A method statement describes how a particular task will be carried out — step-by-step procedure, sequence, resources, controls. A RAMS (Risk Assessment and Method Statement) combines the risk assessment outputs with the method statement. The risk assessment identifies hazards and controls; the method statement describes how the work will be done within those controls. The L3 representative ensures both are in place and current; reviews them at start of shift; updates if conditions change.' },
  { question: 'When is a Principal Designer required?', answer: 'A Principal Designer must be appointed by the client where more than one contractor is or is reasonably expected to be involved (CDM 2015 Reg 5). The PD coordinates the pre-construction phase including identification, elimination and control of foreseeable risks; preparation and provision of pre-construction information; liaison with the principal contractor. On single-contractor projects the contractor effectively absorbs the design coordination function without a separate PD appointment.' },
  { question: 'What records must the contractor retain under CDM 2015?', answer: 'The CPP itself; risk assessments and method statements (RAMS); records of training and competence of operatives; site induction records; toolbox talks; near-miss reports; correspondence with PD / PC / client; the Health and Safety File contributions at end of project. Retention periods vary — most records 3+ years; H&S File is for the life of the building.' },
  { question: 'Does the Pre-Construction Information always exist?', answer: 'On notifiable projects, almost always — the client (or PD) prepares it. On smaller projects it may be a brief informal document, an email, or a verbal briefing depending on client sophistication. The contractor under Reg 9(1) should ask for it; on commercial / industrial work some PCI should be expected even on small jobs. Absence of PCI is itself a flag that the client may not have engaged with their Reg 4 duties.' },
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
            "CPP under Reg 12 / 15 is mandatory for every project; CIS80 template adequate for small; bespoke for complex.",
            "Reg 11 Principal Designer / Reg 14 PC roles on multi-contractor projects; both have specific duties beyond the contractor&apos;s Reg 9.",
            "PCI (Pre-Construction Information), CPP, and HS File together form the CDM information triad — the &apos;before&apos;, &apos;during&apos; and &apos;after&apos; of project safety documentation.",
          ]} />
          <LearningOutcomes outcomes={[
            "Identify CDM 2015 dutyholder roles and the L2 → L3 transition from worker to contractor representative.",
            "State Reg 9 contractor duties: plan, manage, monitor, comply with PD/PC directions, verify client awareness.",
            "State Reg 15 worker duties: cooperate, comply, report.",
            "Recognise the application of CDM to all construction work regardless of size.",
            "Distinguish single-contractor and multi-contractor projects and the role of the principal contractor.",
            "Apply the L3 contractor-representative checklist on a small project.",
            "Describe the six CDM dutyholder roles — client, PD, PC, designer, contractor, worker — and the duties on each.",
            "Describe the CDM information chain — PCI, CPP, HSF — and the regulations behind each.",
            "Apply MHSWR Reg 14 worker duties — use per training, report serious / immediate danger, report shortcomings.",
            "Apply EAWR Reg 16 personal competence duty and the refusal protections under ERA s.44.",
            "Describe Reg 13 site induction on multi-contractor projects and the worker&apos;s attendance duty.",
          ]} initialVisibleCount={3} />

          <ContentEyebrow>The transition</ContentEyebrow>
          <ConceptBlock title="From worker to contractor's eyes-and-ears" plainEnglish="At L2 you sat firmly inside Reg 15. At L3 you still hold Reg 15 personally but increasingly act as the firm's Reg 9 representative on site. The firm's contractor duties (plan, manage, monitor) are operationalised through your day-to-day actions when you're leading a small job or supervising junior trades. The L2 framing was &apos;cooperate, comply, report&apos;. The L3 framing adds: the people you supervise are now in your duty of care; the plan you brief is the firm&apos;s discharge of Reg 9; the monitoring you do on the day is part of the contractor&apos;s safe-system-of-work. The transition is one of the most significant L2→L3 mindset shifts." onSite="The transition is gradual. At first the L3 brief is mostly Reg 15 with some Reg 9 input. By end of L3 / start of post-qualification many operatives are routinely acting as contractor representative on small jobs. The firm should match the role to actual readiness; demanding too much too early creates exposure for both the L3 and the firm. The L3 supervisor needs the support of the contracts manager: clear handover, documented authority, escalation path, and the time to do the planning / briefing / monitoring properly.">
            <p>Practical examples of the transition:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Briefing an L2 mate on the day&apos;s plan = Reg 9 manage.</li>
              <li>Dynamic risk assessment on arrival = Reg 9 plan + monitor.</li>
              <li>Intervening when you see an unsafe practice = Reg 9 monitor + manage.</li>
              <li>Verifying the customer (commercial) knows their CDM client duties = Reg 9(1) contractor act.</li>
              <li>Updating the CPP if conditions change = Reg 9 plan.</li>
              <li>End-of-day debrief and lessons-learned = Reg 9 monitor + review.</li>
              <li>Reporting near-misses up = both Reg 15 (worker) and Reg 9 (contractor).</li>
              <li>Cooperating with PD / PC and other contractors = Reg 9 cooperation; cascades from Reg 11 / Reg 14 duties.</li>
              <li>Verifying training currency of L2 operatives before tasks = Reg 9 manage + Reg 8 contractor competence.</li>
              <li>Operating a permit-to-work system for hot works or live work = Reg 9 plan + manage; safe system of work under HASAWA s.2(2)(a).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout source="CDM 2015 — Reg 9(1)" clause={<>"A contractor must not carry out construction work in relation to a project unless satisfied that the client is aware of the duties owed by the client under these Regulations."</>} meaning={<>The contractor&apos;s client-awareness duty. Brief conversation but mandatory before starting. The L3 representative often has this conversation on small jobs where the contracts manager isn&apos;t present.</>} cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 9." />

          <RegsCallout source="CDM 2015 — Reg 15(b)" clause={<>"A worker must — (b) report to the principal contractor or, where there is no principal contractor, the contractor any defect or unsafe practice which they believe is likely to endanger their own health or safety or that of any other person."</>} meaning={<>The worker reporting duty. At L3 you both DO the reporting and (when acting as contractor representative) RECEIVE reports from junior workers.</>} cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 15." />

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />
          <ContentEyebrow>The contractor representative checklist</ContentEyebrow>
          <ConceptBlock title="Operationalising Reg 9 on a small project" plainEnglish="Eight-point checklist for L3 acting as the firm's contractor representative on a small project. The list is a practical translation of Reg 9&apos;s &apos;plan, manage, monitor&apos; into the day-to-day actions of the L3 representative. Each item discharges a specific aspect of the contractor&apos;s duty; together they form the safe-system-of-work that the firm relies on for HASAWA s.2 / s.3 compliance." onSite="Each item is small (a few minutes) but together they discharge the Reg 9 duty operationally. Document as you go. The job pack becomes the evidence file — the SFAIRP defence under HASAWA s.40 and the demonstration of CDM 2015 contractor compliance. The L3 supervisor who treats the checklist as paperwork is missing the point; the L3 supervisor who treats it as the operational rhythm of the day is doing the job correctly.">
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
              <li>Submit handover information to the customer / PC / PD — as-built drawings, certificates, manuals as appropriate.</li>
              <li>Update the firm&apos;s near-miss / lessons-learned system based on observations during the project.</li>
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

          <RegsCallout source="CDM 2015 — Reg 6(1)" clause={<>&quot;A project is notifiable if the construction work on a construction site is scheduled to — (a) last longer than 30 working days and have more than 20 workers working simultaneously at any point in the project; or (b) exceed 500 person days.&quot;</>} meaning={<>The notifiability test. Note the AND in trigger (a) — both conditions must apply. Trigger (b) is a single test on aggregate person-days. Most domestic and small-commercial work falls below; medium / large refurbishment and new-build typically above.</>} cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 6." />

          <ConceptBlock title="Pre-construction information and the design link" plainEnglish="CDM Reg 4(4) requires the client to provide pre-construction information (PCI) to designers and contractors. PCI covers known hazards (asbestos, services, structural), site context, project arrangements, and any existing risk-relevant information. The contractor uses PCI to plan safe construction. The PCI flows from the client (or PD on multi-contractor projects) to every designer and contractor &apos;as soon as practicable&apos;. The PCI is project-specific — it is not a generic template; it reflects what is known about this particular site, this particular building, this particular work scope." onSite="The L3 contractor representative asks for PCI on every commercial job. Absence of PCI is itself a risk indicator — domestic clients rarely have any, commercial clients often have a basic pack, HRRB clients have extensive PCI. Brief the team on what PCI tells you about the site before walking on. Where the PCI is plainly inadequate (e.g. claims &apos;no asbestos present&apos; without any survey reference, claims &apos;no buried services&apos; without drawings, fails to mention adjacent occupancies), the L3 representative flags it back through the contracts manager. The contractor cannot use inadequate PCI as a defence — Reg 9(1) and Reg 9(2) require the contractor to satisfy themselves the client&apos;s arrangements are sufficient before starting work.">
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

          <SectionRule />
          <ContentEyebrow>Worker duties under Reg 15 in depth</ContentEyebrow>

          <ConceptBlock
            title="Cooperate, comply, report — the three Reg 15 limbs"
            plainEnglish="CDM 2015 Reg 15 places three core duties on workers. (a) Cooperate with the client, principal designer, principal contractor and any other person engaged in connection with the project to enable that person to comply with their CDM duties. (b) Report to the principal contractor (or, where there is no PC, the contractor) any defect or unsafe practice which the worker believes is likely to endanger their own health or safety or that of any other person. (c) Comply with the worker&apos;s general safety duties under MHSWR Reg 14 (use plant and substances in accordance with training, report serious dangers, report shortcomings)."
            onSite="The L3 representative still personally holds Reg 15 even while acting as contractor representative — the worker duty doesn&apos;t evaporate at L3. What changes is the L3 is now both the recipient of Reg 15 reports from L2 operatives (and is responsible for acting on them) and a Reg 15 reporter themselves to the PC / contractor. The combination puts the L3 squarely at the centre of the safety information flow on site. Acting on Reg 15 reports promptly and documentably is part of the firm&apos;s Reg 9 monitor duty."
          >
            <p>Reg 15 worker duties in practice:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cooperate</strong> — attend induction, follow site
                rules, participate in toolbox talks, comply with PC&apos;s
                directions, contribute to RAMS where asked.
              </li>
              <li>
                <strong>Report</strong> — defects, unsafe practices, near-misses,
                changes to site conditions, missing equipment, deteriorating
                weather affecting the work.
              </li>
              <li>
                <strong>Comply with MHSWR Reg 14</strong> — use equipment per
                training, follow safe systems of work, raise concerns.
              </li>
              <li>
                <strong>Personal H&amp;S protection</strong> — wear issued
                PPE, follow isolation procedures, refuse work beyond competence
                (Reg 16 EAWR overlap).
              </li>
              <li>
                <strong>Cooperation with other trades</strong> — keep your work
                area orderly, communicate hazards, share information about
                upcoming risk activities.
              </li>
              <li>
                <strong>Records</strong> — sign in to induction, sign toolbox
                talks, return signed RAMS acknowledgements.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="MHSWR Reg 14 — the parallel personal duty"
            plainEnglish="MHSWR 1999 Reg 14 sits alongside HASAWA s.7 and CDM Reg 15 as the third major personal duty regime for the worker. Reg 14 requires every employee, in accordance with the training provided by the employer, to use any machinery, equipment, dangerous substance, transport equipment, means of production or safety device only in accordance with the training and instructions provided. Reg 14(2) requires the worker to inform the employer of any situation which they reasonably consider to represent a serious and immediate danger to health and safety, and any matter which they reasonably consider to represent a shortcoming in the employer&apos;s protection arrangements. The three personal duties (HASAWA s.7, MHSWR Reg 14, CDM Reg 15) overlap significantly but each adds a slightly different angle."
            onSite="The L3 representative discharging the personal duties: use equipment per training, raise serious-and-immediate-danger concerns, raise shortcomings in the firm&apos;s arrangements. The Reg 14 &apos;shortcomings&apos; limb is particularly useful at L3 — it covers concerns about the firm&apos;s safety system itself, not just individual unsafe practices. A poorly-written RAMS, an inadequate training matrix, a missing competence verification regime are all Reg 14 shortcomings to be raised."
          >
            <p>MHSWR Reg 14 worker duties:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Use equipment per training</strong> — machinery,
                equipment, dangerous substances, transport, safety devices.
              </li>
              <li>
                <strong>Inform of serious / immediate danger</strong> — promptly
                to the employer or safety rep.
              </li>
              <li>
                <strong>Inform of shortcomings</strong> — in the firm&apos;s
                arrangements; gaps in training; inadequate equipment; missing
                procedures.
              </li>
              <li>
                <strong>Reasonable belief</strong> — standard is what the worker
                reasonably believes, not what is objectively proven.
              </li>
              <li>
                <strong>Channels</strong> — direct to employer; via safety rep
                where one exists; via TUC / scheme bodies for collective
                concerns.
              </li>
              <li>
                <strong>ERA s.44 protection</strong> — for raising the concern
                by reasonable means.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="EAWR Reg 16 competence and the L3 personal hook"
            plainEnglish="Electricity at Work Regulations 1989 Reg 16 imposes a personal competence duty: no person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or injury, unless they possess such knowledge or experience or are under such degree of supervision as may be appropriate having regard to the nature of the work. The duty bites on the operative (don&apos;t work beyond competence) AND the employer (don&apos;t direct work beyond operative competence). The L3 transition involves an expanding personal competence base — what was beyond competence at L2 may now be within competence at L3, but the boundary moves; refusal of work beyond the new boundary is still required."
            onSite="The L3 representative reflex on any new task type: do I have the technical knowledge and experience for this; what training / experience does the firm have on record for me; is appropriate supervision available; what would a competent person in my position do. Where the answer is &apos;not yet&apos;, the L3 refuses the task and asks for supervised training. EAWR Reg 16 is the regulatory hook for the refusal; ERA s.44 protects from detriment for refusing; documentation in writing (text, email) of the refusal is the L3&apos;s defence if subsequently challenged."
          >
            <p>Reg 16 competence considerations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Technical knowledge — training, qualification, experience matched to the work.</li>
              <li>Experience — recent and relevant; old training without recent practice may be insufficient.</li>
              <li>Supervision — real, not nominal; competent supervisor available and present where needed.</li>
              <li>Specific authorisation — HV switching, live working, confined-space entry typically require specific authorisation beyond general competence.</li>
              <li>Manufacturer-specific training — for proprietary equipment (specialised inverters, control systems, HVAC interfaces).</li>
              <li>JIB grading reflects broad competence but doesn&apos;t guarantee specific task competence.</li>
              <li>The L3 representative is responsible for verifying team competence before assigning tasks under Reg 9 manage.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Management of Health and Safety at Work Regulations 1999 — Reg 14"
            clause={
              <>
                &quot;(1) Every employee shall use any machinery, equipment,
                dangerous substance, transport equipment, means of production or
                safety device provided to him by his employer in accordance both
                with any training in the use of the equipment concerned which has
                been received by him and the instructions respecting that use
                which have been provided to him by the said employer in
                compliance with the requirements and prohibitions imposed upon
                that employer by or under the relevant statutory provisions.
                (2) Every employee shall inform his employer or any other
                employee of that employer with specific responsibility for the
                health and safety of his fellow employees — (a) of any work
                situation which a person with the first-mentioned
                employee&apos;s training and instruction would reasonably
                consider represented a serious and immediate danger to health
                and safety; and (b) of any matter which a person with the
                first-mentioned employee&apos;s training and instruction would
                reasonably consider represented a shortcoming in the
                employer&apos;s protection arrangements for health and safety,
                in so far as that situation or matter either affects the health
                and safety of that first-mentioned employee or arises out of or
                in connection with his own activities at work, and has not
                previously been reported to his employer or to any other
                employee of that employer in accordance with this paragraph.&quot;
              </>
            }
            meaning={
              <>
                MHSWR Reg 14 — the worker&apos;s general H&amp;S duty parallel to
                HASAWA s.7 and CDM Reg 15. The two limbs — use equipment per
                training, report dangers and shortcomings — together form the
                practical translation of the worker&apos;s s.7 duty into the
                day-to-day. The &apos;shortcomings&apos; limb is the bit most
                often forgotten — it covers concerns about the firm&apos;s
                arrangements themselves, not just individual unsafe practices.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 14."
          />

          <Scenario title="L3 leading first small commercial single-contractor job" situation={<>Your contracts manager hands you a small commercial socket-installation job — 2 days, single contractor (your firm), commercial client (small office). One L2 mate with you. The contracts manager says "you can run this — here's the RAMS, get on with it" and disappears. You realise no CPP exists; client awareness hasn't been confirmed; the L2 hasn\'t been briefed.</>} whatToDo={<>Apply the contractor-representative checklist. (1) CPP — write a brief one using the CIS80 template (15 minutes); covers the work, the hazards, the controls, the welfare arrangements, the emergency procedure. (2) Client awareness — phone the client&apos;s designated contact; brief 5-minute conversation about CDM client duties (cooperate, provide info, ensure time/resources); document. (3) Operative briefing — sit with the L2 mate; walk through the CPP, the RAMS, the day&apos;s plan, hazards expected, who to contact in emergency; signed attendance log. (4) Walk-round on arrival; dynamic risk assessment; document. (5) Throughout — observe, intervene, document. (6) End of day - debrief with L2; note any near-misses; update CPP if conditions changed. (7) End of project — lessons-learned summary back to firm; close out CPP; cleanup. Phone contracts manager if anything escalates beyond competence; ERA s.44 protects refusal if you don&apos;t feel ready.</>} whyItMatters={<>This is the L2 → L3 transition in action. The contracts manager&apos;s hand-off was inadequate (common); the L3&apos;s response operationalises the CDM Reg 9 contractor duties through the checklist. The 30-60 minutes invested up-front in CPP + client awareness + operative briefing creates the safety system that runs through the project. The HSE inspector visiting on day 1 sees a competent contractor representative running a structured project; the alternative (no CPP, no briefing, ad-hoc execution) is a Reg 9 prosecution waiting to happen.</>} />

          <SectionRule />
          <ContentEyebrow>CDM 2015 — the Principal Designer duty and where electrical fits</ContentEyebrow>

          <ConceptBlock
            title="Why the design stage matters to the L3 contractor"
            plainEnglish="CDM 2015 Reg 11 imposes duties on designers (anyone preparing or modifying design — including specification of products). The Principal Designer (Reg 5) coordinates design-stage health and safety on projects with more than one contractor. The L3 contractor representative often works with a Principal Designer&apos;s output: pre-construction information, design risk register, residual risks the designer couldn&apos;t eliminate. Understanding what the designer has and hasn&apos;t done shapes the contractor&apos;s site-stage approach."
            onSite="The L3 contractor reflex on receipt of design information: read the design risk register; what risks did the designer eliminate; what residual risks did they pass to construction; what design-stage controls have they specified; what survey information did they commission. Where the design risk register is missing or thin, the L3 raises it with the firm&apos;s contracts manager — the designer has duties that may not have been discharged."
          >
            <p>Designer duties under CDM 2015 Reg 11:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Take account of general principles of prevention</strong> — MHSWR
                Schedule 1; designed-in safety.
              </li>
              <li>
                <strong>Eliminate foreseeable risks</strong> through design so far as
                reasonably practicable.
              </li>
              <li>
                <strong>Reduce or control residual risks</strong> that cannot be eliminated.
              </li>
              <li>
                <strong>Pass information about residual risks</strong> to the principal
                designer for inclusion in pre-construction information.
              </li>
              <li>
                <strong>Cooperate with other dutyholders</strong> — designer, principal
                designer, principal contractor, contractors.
              </li>
              <li>
                <strong>Provide information about the design</strong> needed for safe use
                and maintenance.
              </li>
              <li>
                <strong>Pre-construction information</strong> — site survey, existing services
                location, hazards identified at design stage, structural issues, asbestos,
                contaminated land.
              </li>
              <li>
                <strong>Design-stage workshops</strong> — Principal Designer typically runs
                hazard / buildability workshops including key contractors.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />
          <ContentEyebrow>Contractor competence under CDM 2015 Reg 8</ContentEyebrow>

          <ConceptBlock
            title="Worker consultation under HSCER 1996 and SRSC Regs 1977"
            plainEnglish="Two related sets of regulations govern worker consultation on H&S — Safety Representatives and Safety Committees Regulations 1977 (workplaces with recognised trade unions) and Health and Safety (Consultation with Employees) Regulations 1996 (other workplaces). Both require the employer to consult workers on H&S matters; both give recognised representatives specific rights including paid time off, access to information, inspection rights. The L3 supervisor on a project with active safety representatives works alongside them — they are a resource, not an obstacle. Concerns raised by representatives are evidence of safety culture; firms that suppress representatives create regulatory risk."
            onSite="The L3 representative attending a safety committee meeting (where one exists) brings the contractor&apos;s perspective; reports on the project; engages with concerns; takes back action items. The committee minutes record the engagement — useful documentation under the SFAIRP defence."
          >
            <p>Worker consultation provisions:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>SRSC 1977 — TU-recognised reps; paid time off; inspection rights; access to information.</li>
              <li>HSCER 1996 — workplaces without TU recognition; representatives of employee safety.</li>
              <li>Topics consulted on — introduction of new measures, training, info about risks and arrangements, health surveillance, work equipment, organisational changes.</li>
              <li>Safety committees — formal meetings; published minutes; action tracking.</li>
              <li>Joint protection under ERA s.44 — representatives have additional protection from detriment.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 8 — the duty not to engage incompetent appointees"
            plainEnglish="CDM 2015 Reg 8 places a competence duty across the dutyholder chain. Any person appointing or engaging another to a CDM role must take reasonable steps to satisfy themselves the appointee has the skills, knowledge, experience and (if an organisation) organisational capability to fulfil the role. Reg 8(2) puts the parallel duty on the person being appointed — they must not accept the role unless they have the necessary competence. The duty runs at every level: client appointing PD, PC, contractor; PC engaging sub-contractor; contractor allocating L2 apprentice to a task."
            onSite="The L3 representative discharges Reg 8 when allocating tasks to L2 operatives — verify training currency, experience, supervision needs; refuse to allocate beyond the operative&apos;s reasonable capability. Reg 8 also bites on the contracts manager allocating the L3 representative — the L3 should be appointed to the contractor-representative role only where their competence supports it. PASMA, IPAF, EAL, JIB, SSSTS / SMSTS supervisor certificates, NEBOSH / IOSH safety training all evidence competence in their respective domains."
          >
            <p>Reg 8 competence considerations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Skills</strong> — manual, technical, problem-solving for
                the specific work type.
              </li>
              <li>
                <strong>Knowledge</strong> — regulatory framework, technical
                standards, materials, processes.
              </li>
              <li>
                <strong>Experience</strong> — recent practical experience in
                comparable work; old experience alone may not suffice.
              </li>
              <li>
                <strong>Organisational capability</strong> — for firms;
                covers systems, supervision, support, training programmes.
              </li>
              <li>
                <strong>Reasonable steps to verify</strong> — recorded
                qualifications, references, scheme registrations, prequalification
                questionnaires.
              </li>
              <li>
                <strong>Refusal duty</strong> — Reg 8(2) requires refusal of a
                role beyond competence; backed up by EAWR Reg 16 personal duty.
              </li>
              <li>
                <strong>Records</strong> — training matrix, scheme registrations,
                third-party PQQ outputs.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 — Reg 8(1)"
            clause={
              <>
                &quot;A designer (including a principal designer) or contractor
                (including a principal contractor) appointed to work on a
                project must have the skills, knowledge and experience, and, if
                they are an organisation, the organisational capability,
                necessary to fulfil the role that they are appointed to
                undertake, in a manner that secures the health and safety of
                any person affected by the project.&quot;
              </>
            }
            meaning={
              <>
                Reg 8 — competence duty across the dutyholder chain. The
                appointing party must take reasonable steps to verify; the
                appointee must refuse where competence is lacking. The duty is
                two-sided. Documentation of competence — qualifications,
                training records, scheme registrations, recent project
                experience — is the evidence base.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 8."
          />

          <SectionRule />
          <ContentEyebrow>The full CDM 2015 dutyholder cast — recap and depth</ContentEyebrow>

          <ConceptBlock
            title="Client, Principal Designer, Principal Contractor, Contractor, Designer, Worker — the six roles"
            plainEnglish="CDM 2015 names six dutyholder roles. The client (Reg 4) is the person on whose behalf the construction work is being carried out. The principal designer (Reg 5, on projects with more than one contractor) coordinates the pre-construction phase. The principal contractor (Reg 6, on projects with more than one contractor) coordinates the construction phase. The contractor (Reg 9) does the construction work. The designer (Reg 11) prepares or modifies designs and considers foreseeable risks during construction, use, maintenance, demolition. The worker (Reg 15) carries out the work and reports concerns. Each role has specific duties; the same person / firm can hold multiple roles (the contractor on a single-contractor project absorbs the principal contractor duties)."
            onSite="The L3 representative on any new project identifies the cast: who is the client; is it a notifiable project; is there a principal designer; is there a principal contractor; what other contractors are working; how does information flow. Knowing the cast tells you who you escalate to, who provides what information, who signs what off. Confused or missing role-holding on a project is itself a red flag — somebody should be doing each of these jobs."
          >
            <p>Dutyholder roles and headline duties:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Client (Reg 4)</strong> — makes suitable arrangements
                for managing the project; provides pre-construction
                information; appoints PD and PC where more than one contractor;
                ensures the CPP is prepared; ensures the HSF is prepared;
                provides for welfare. Domestic clients can be carved out.
              </li>
              <li>
                <strong>Principal Designer (Reg 5, 11)</strong> — coordinates
                pre-construction phase H&amp;S; plans / manages / monitors design
                work and coordination; advises client on PCI; identifies,
                eliminates, controls foreseeable risks; coordinates with PC;
                prepares HSF.
              </li>
              <li>
                <strong>Principal Contractor (Reg 6, 12-14)</strong> —
                coordinates the construction phase; prepares the CPP under
                Reg 15; provides site rules; site induction (Reg 13);
                consultation; cooperation with PD; prevention of unauthorised
                access.
              </li>
              <li>
                <strong>Designer (Reg 11)</strong> — eliminates, reduces,
                controls foreseeable risks at design stage; provides
                information about residual risks; cooperates with other
                dutyholders.
              </li>
              <li>
                <strong>Contractor (Reg 9)</strong> — plans, manages, monitors
                construction work; complies with PD / PC directions; verifies
                client awareness; provides RAMS; supervises workers.
              </li>
              <li>
                <strong>Worker (Reg 15)</strong> — cooperates with other
                dutyholders; reports defects or unsafe practices; complies
                with controls.
              </li>
              <li>
                <strong>Multiple roles</strong> — same person can hold
                multiple roles (sole-contractor project: contractor + PC
                duties).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The CDM information chain — PCI, CPP, HSF"
            plainEnglish="The Pre-Construction Information (PCI), Construction Phase Plan (CPP), and Health and Safety File (HSF) form the CDM information chain. PCI flows from client / PD to PC / contractor at the start; CPP is prepared by the PC (multi-contractor) or contractor (single-contractor) and used throughout construction; HSF is prepared by the PD (or PC at handover if no PD) and handed to the client at completion. Each document feeds the next: PCI informs the CPP; CPP records what was actually done; HSF records what the client / future operators need to know to use and maintain the building safely."
            onSite="The L3 representative interacts with all three: reads the PCI before quoting / starting; contributes to or writes the CPP for the firm&apos;s work; submits as-built drawings, certificates, manuals into the HSF at the end. Each is a CDM-required document under specific regulations; gaps in any of them are regulatory failures. On Higher-Risk Buildings under BSA 2022 the HSF is supplemented by the &apos;golden thread&apos; — a digital information record retained for the life of the building."
          >
            <p>The information chain in detail:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PCI — Pre-Construction Information</strong> (Reg 4(4)):
                site survey, existing services, hazards identified pre-construction,
                project arrangements. Provided by client / PD to contractors
                bidding for and undertaking work.
              </li>
              <li>
                <strong>CPP — Construction Phase Plan</strong> (Reg 12 / 15):
                H&amp;S arrangements for the construction phase. Prepared by
                PC (multi-contractor) or contractor (single-contractor) before
                work starts. Updated as work progresses. Retained as project
                record.
              </li>
              <li>
                <strong>HSF — Health and Safety File</strong> (Reg 12(5)):
                handed to client at end of project. Records residual risks,
                materials, locations, maintenance considerations, manuals,
                certificates. Retained for the life of the building.
              </li>
              <li>
                <strong>Building Safety Act 2022</strong> — for HRBs, the HSF
                is part of the golden thread: digital record of the
                building&apos;s safety information from design through to
                occupation and modification.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 — Reg 4(4)"
            clause={
              <>
                &quot;A client must provide pre-construction information as soon
                as is practicable to every designer and contractor appointed, or
                being considered for appointment, to the project.&quot;
              </>
            }
            meaning={
              <>
                Reg 4(4) — the client&apos;s duty to provide PCI. Domestic
                client carve-out under Reg 7 cascades this duty to the
                contractor (single-contractor) or PD (multi-contractor). On
                commercial / industrial projects the client retains the duty.
                The PCI should be specific to the project — not a generic
                template — and should cover known site hazards, services,
                structure, neighbours, occupants, asbestos, contaminated
                ground, time / resource expectations, and any other
                risk-relevant information.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 4."
          />

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 — Reg 13(1)"
            clause={
              <>
                &quot;The principal contractor must ensure that suitable site
                induction is provided to every worker carrying out construction
                work.&quot;
              </>
            }
            meaning={
              <>
                Reg 13 — the site-induction duty for the principal contractor on
                multi-contractor projects. Induction covers the CPP summary,
                site-specific hazards, site rules, welfare locations, emergency
                arrangements, accident reporting, permit-to-work systems,
                communication. The L3 representative arrives early on day 1 to
                attend induction; the firm&apos;s team signs in; any worker
                arriving later attends induction before working.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 13."
          />

          <Scenario
            title="Discovery of additional design risk mid-construction"
            situation={
              <>
                Your firm is the electrical contractor on a 4-contractor commercial
                refurbishment project. Partway through second-fix you discover
                that the structural drawings indicate steel beams that you
                weren&apos;t expecting in the wall void on the first-floor cable
                runs. The original design hadn&apos;t flagged this; your method
                statement is for direct cable routing that won&apos;t work with
                the steel in place. The contracts manager is off-site for two
                days. The principal contractor is on site; the principal
                designer&apos;s office is in another city.
              </>
            }
            whatToDo={
              <>
                Stop the affected work. The design risk register issued at
                pre-construction stage didn&apos;t flag this — it&apos;s a
                designer omission or change since the survey. The L3
                contractor representative&apos;s response: (1) Verify what
                you&apos;ve found with a second person; photograph the
                steel-beam evidence. (2) Update the dynamic risk assessment to
                reflect the discovery. (3) Flag to the principal contractor on
                site within the hour — &quot;design risk register doesn&apos;t
                reflect what we&apos;ve found; need PD&apos;s input on safe
                routing and load implications&quot;. (4) Phone the firm&apos;s
                contracts manager (even though off-site) to alert them. (5)
                Email the PD office requesting clarification — copy the PC and
                contracts manager. (6) Pause work in the affected area; brief
                team on the pause; redeploy to unaffected areas while waiting
                for design input. (7) Document everything — what was found,
                when, who was told, what the response was. Once PD response
                arrives (typically within 24-48 hours on competently-run
                projects), update the CPP / method statement, brief the team,
                resume work. The PD response may require design change with
                further input from a structural engineer; that&apos;s their
                duty under Reg 11.
              </>
            }
            whyItMatters={
              <>
                Designer omissions are a real failure mode on construction
                projects; the contractor on site cannot just &apos;work around
                it&apos; without engaging the design team. The L3 representative
                escalating the design discrepancy back to the PD is the proper
                discharge of Reg 11 (designer duty) and Reg 9 (contractor
                duty) — both are engaged. Proceeding without escalation could
                result in the contractor unwittingly absorbing a designer
                liability (under negligence or under the contract). The
                documentation trail — emails, photos, dated notes — is what
                protects the firm if the issue subsequently becomes a dispute
                or a regulatory action.
              </>
            }
          />

          <SectionRule />
          <FAQ items={faqs} />
          <SectionRule />
          <KeyTakeaways points={[
            "Remember from Section 1.3 — CDM applies to all construction work. At L3 you transition from Reg 15 worker to Reg 9 contractor representative.",
            "L2 = Reg 15 (cooperate, comply, report). L3 = Reg 15 PLUS contributing to firm's Reg 9 (plan, manage, monitor).",
            "Reg 9(1) — contractor verifies client awareness before starting. Brief but mandatory conversation.",
            "Reg 12 / 16 — Construction Phase Plan mandatory for every project. CIS80 template adequate for small.",
            "Single-contractor: contractor writes CPP, runs the show. Multi-contractor: PC writes CPP, coordinates site.",
            "L3 contractor-representative checklist: verify CPP, verify client awareness, brief team, dynamic RA, manage and monitor, document, escalate, close out.",
            "Demand formal handover from supervisor before acting as contractor representative.",
            "ERA s.44 protects refusal if you don't feel ready for the contractor-representative role.",
            "Six CDM dutyholder roles — client, PD, PC, designer, contractor, worker. Same firm / person can hold multiple roles.",
            "CDM information chain — PCI (before), CPP (during), HSF (after). All three are regulatory documents under specific regulations.",
            "Worker Reg 15 = cooperate + report + comply. MHSWR Reg 14 = use per training + report serious / immediate danger + report shortcomings.",
            "EAWR Reg 16 competence — personal duty; refuse work beyond competence; ERA s.44 protects refusal.",
            "Reg 13 site induction on multi-contractor projects; attend before working; arrive early on day 1.",
            "BSA 2022 elevates the HSF into the &apos;golden thread&apos; for HRBs — digital record retained for the life of the building.",
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
