/**
 * MOET · Module 1 · Section 1.1 · Subsection 1 — Permit to Work Systems
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Safe systems of work."
 *              · "Individual maintenance technician's roles and
 *                 responsibilities. Escalation procedures."
 *              · "Electrical. Electrical isolation and deisolation
 *                 requirements: lockout tagout and testing for dead."
 *              · "Documentation requirements: documentation control,
 *                 auditable records."
 *   Skills     · "Apply health, safety, and environmental procedures in
 *                 compliance with regulations, standards, and guidance."
 *   Behaviours · "Prioritise safe working practices."
 *
 * Reference conversion for the MOET redesign — the pattern every other
 * subsection page follows. Content preserved from the original; structure,
 * shell and reading measure rebuilt on the study-centre learning kit.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import { ControlLayers } from '@/components/study-centre/diagrams/moet';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Permit to Work Systems - MOET Module 1.1.1';
const DESCRIPTION =
  'Permit to work systems for maintenance engineering technicians: when a permit is required, the permit lifecycle, roles and responsibilities, and how permits interlock with safe isolation and lock-out/tag-out.';

const quickCheckQuestions = [
  {
    id: 'ptw-what-it-is-not',
    question: 'Which statement about a permit to work is TRUE?',
    options: [
      'Signing the permit makes the plant safe to work on',
      'A permit is a formal record that defined precautions are in place — it does not itself make anything safe',
      'A permit replaces the need for a risk assessment',
      'A permit is only needed when the client asks for one',
    ],
    correctIndex: 1,
    explanation:
      'A permit to work is a formal, documented control — a record that specified precautions (isolation, locks, gas testing, fire watches) have been put in place and communicated. The paper itself protects nobody. If the isolations listed on the permit have not actually been applied and proved, the permit is worthless. It supplements risk assessment; it never replaces it.',
  },
  {
    id: 'ptw-lifecycle-order',
    question: 'Which sequence shows the permit lifecycle in the correct order?',
    options: [
      'Issue → risk assessment → work → authorisation → handback',
      'Request → risk assessment → authorisation → issue and acceptance → work → handback and cancellation',
      'Risk assessment → work → issue → acceptance → cancellation',
      'Request → issue → risk assessment → acceptance → work → suspension',
    ],
    correctIndex: 1,
    explanation:
      'The lifecycle always runs: the work is requested and defined; the hazards are assessed and precautions specified; an authorised person confirms the precautions are in place; the permit is issued and formally accepted by the permit holder; the work is carried out within the permit boundary; and finally the holder hands the plant back and the permit is cancelled before re-energisation. Skipping or reordering any stage breaks the chain of control.',
  },
  {
    id: 'ptw-issuer-separation',
    question:
      'Why should the person issuing a permit normally NOT be the person carrying out the work?',
    options: [
      'Because the issuer is usually too senior to do manual work',
      'Because insurance policies require two different signatures',
      'Because separation of duties provides an independent check — one person specifies and verifies the precautions, another works under them',
      'Because the issuer must remain in the office to answer the phone',
    ],
    correctIndex: 2,
    explanation:
      'The strength of a permit system is the independent check. The issuing authority walks the plant, confirms the isolations are applied and proved, and defines the boundary of safe work. The permit holder then accepts those conditions and works within them. If one person does both, there is no second pair of eyes — the same assumptions that cause an error also sign it off as safe.',
  },
  {
    id: 'ptw-handback',
    question:
      'Work under a permit is complete. What must happen BEFORE the isolations are removed and the plant re-energised?',
    options: [
      'The permit holder signs the work-complete section, all workers and tools are clear, and the issuing authority cancels the permit',
      'The most senior person on site gives verbal approval',
      'The locks are removed so the operators can restart production quickly',
      'Nothing — once the job is finished the permit expires automatically',
    ],
    correctIndex: 0,
    explanation:
      'Handback is a formal stage, not an assumption. The permit holder signs to declare the work complete and everyone clear of the plant; the issuing authority verifies this, cancels the permit, and only then authorises removal of locks and re-energisation. Removing isolations while a permit is still live is one of the most dangerous failures a permit system can suffer.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the PRIMARY purpose of a permit to work system?',
    options: [
      'To transfer legal responsibility from the employer to the worker',
      'To provide formal, documented control and communication for high-risk work where routine controls are not enough',
      'To record the hours worked for invoicing purposes',
      'To prove that a risk assessment was not needed',
    ],
    correctAnswer: 1,
    explanation:
      'A permit to work is a formal management system used for high-risk, non-routine work. It documents the hazards, the precautions taken, who is authorised to do what, and for how long — and it forces communication between everyone involved: the people who control the plant and the people who work on it.',
  },
  {
    id: 2,
    question: 'Which of these tasks would most clearly require a permit to work?',
    options: [
      'Replacing a lamp in a desk fitting in an office',
      'PAT testing kettles in a staff kitchen',
      'Switching and earthing work on high voltage equipment',
      'Visually inspecting a distribution board with the covers on',
    ],
    correctAnswer: 2,
    explanation:
      'Work on high voltage equipment is a classic permit-controlled activity: the permit system ensures the equipment is isolated — and where necessary earthed — before work begins, and that it is re-energised safely afterwards. Routine, low-risk tasks such as lamp changes and visual inspections are controlled by normal safe working procedures, not permits.',
  },
  {
    id: 3,
    question: 'Why is it bad practice to require a permit for every routine maintenance task?',
    options: [
      'Because printing permits is expensive',
      'Because permits are only valid for high voltage work',
      'Because over-use buries genuinely high-risk work in routine paperwork — signatures become automatic and the system loses its meaning',
      'Because the law limits how many permits a site may issue each week',
    ],
    correctAnswer: 2,
    explanation:
      'A permit system works because a permit is a signal: this task is different, stop and think. If everything needs a permit, issuing and accepting become a rubber-stamping routine, checks are skipped, and the permits protecting genuinely dangerous work get the same thirty-second treatment as the trivial ones. Reserve permits for work that needs that level of control.',
  },
  {
    id: 4,
    question: 'Who formally accepts a permit to work before work starts?',
    options: [
      'The site security guard',
      'The permit holder — the competent person in charge of carrying out the work',
      'The client or building owner',
      'The apprentice who will assist with the task',
    ],
    correctAnswer: 1,
    explanation:
      'The permit holder signs the acceptance section. That signature means they have read and understood the hazards, the precautions, and the limits of the permitted work, and they take responsibility for the working party staying inside those limits. It is a personal commitment, not an administrative formality.',
  },
  {
    id: 5,
    question: 'What must be confirmed BEFORE a permit for work on electrical plant is issued?',
    options: [
      'That the specified isolations have actually been applied, secured, and proved — not just planned',
      'That the weather forecast is acceptable',
      'That the working party has had a rest break',
      'That a spare copy of the permit has been photocopied',
    ],
    correctAnswer: 0,
    explanation:
      'A permit records precautions that ARE in place, not precautions that are intended. Before issue, the authorised person confirms the points of isolation are open, locked, tagged, and the circuit has been proved dead at the point of work. Issuing a permit against precautions that exist only on paper is a fundamental — and potentially fatal — failure.',
  },
  {
    id: 6,
    question:
      'A permit lists the isolation points and lock numbers securing a motor circuit. What is the relationship between the permit and the locks?',
    options: [
      'The permit is the physical safeguard; the locks are just a reminder',
      'The locks physically prevent re-energisation; the permit documents, authorises, and communicates that state of safety',
      'The permit and locks do the same job, so either can be used alone',
      'Locks are only needed when no permit has been issued',
    ],
    correctAnswer: 1,
    explanation:
      'They are two layers of one system. Lock-out devices provide the physical security — the isolator genuinely cannot be closed. The permit provides the management control: it records which locks are on which isolators, who applied them, what work they protect, and when they may come off. A permit without locks is paper with no teeth; locks without a permit leave nobody in formal control.',
  },
  {
    id: 7,
    question: 'A permit expires at 18:00 but the job is not finished. What is the correct action?',
    options: [
      'Keep working — the expiry time is only a guideline',
      'Cross out the expiry time and write a later one yourself',
      'Ask the apprentice to sign an extension',
      'Stop work at expiry; the permit must be formally revalidated or a new permit issued before work continues',
    ],
    correctAnswer: 3,
    explanation:
      'A permit is valid only within its stated time limits. When it expires, the authorisation to work expires with it. The issuing authority must re-check that the precautions remain effective and formally revalidate or reissue the permit. Nobody in the working party may amend a permit — only the issuing authority controls its content and duration.',
  },
  {
    id: 8,
    question:
      'A permitted job runs past the end of the day shift and the night crew will take over. How is this handled correctly?',
    options: [
      'The day crew leaves the permit taped to the panel for the night crew to find',
      'A formal handover: the outgoing holder signs off, the incoming holder is briefed on the hazards and precautions, and accepts the permit (or a new one) in writing',
      'The night crew works without a permit because the isolations are already on',
      'The day-shift holder keeps the permit and the night crew phones them with questions',
    ],
    correctAnswer: 1,
    explanation:
      'Responsibility under a permit is personal — it cannot transfer informally. At shift change, the outgoing permit holder formally hands back or transfers the permit, the incoming holder is briefed on the state of the work, the isolations, and any changes, and signs acceptance. Many sites reissue rather than transfer, precisely so the incoming holder makes their own positive check.',
  },
  {
    id: 9,
    question:
      'Halfway through a permitted job, the site fire alarm activates and the area is evacuated. When the all-clear is given, what should happen before work resumes?',
    options: [
      'Work resumes immediately — the permit never stopped being valid',
      'The permit is treated as suspended; the issuing authority re-checks that the precautions and isolations are still intact before authorising resumption',
      'The permit is destroyed and the work abandoned for the day',
      'The working party checks their own locks and carries on without telling anyone',
    ],
    correctAnswer: 1,
    explanation:
      'Any interruption — an evacuation, a conflicting activity, an emergency elsewhere on the plant — should suspend the permit. During the interruption, valves may have been operated, supplies switched, or people moved. Before work resumes, the issuing authority confirms the precautions listed on the permit are still in place and effective, and formally authorises the restart.',
  },
  {
    id: 10,
    question: 'When may the isolations protecting permitted work be removed?',
    options: [
      'Whenever production needs the plant back',
      'As soon as the permit holder says the job is nearly done',
      'Only after the permit has been formally handed back and cancelled, with all personnel, tools, and temporary equipment confirmed clear',
      'At the permit expiry time, whether or not the work is finished',
    ],
    correctAnswer: 2,
    explanation:
      'Cancellation is the gate. The permit holder signs the work-complete section confirming the working party, tools, and any temporary earths or barriers are clear; the issuing authority verifies and cancels the permit; only then is removal of locks and re-energisation authorised. Re-energising against a live permit means re-energising onto people.',
  },
  {
    id: 11,
    question:
      'Two separate crews are working under two different permits protected by the SAME isolation point. Crew A finishes first. What is the danger?',
    options: [
      'There is no danger — the first permit to be cancelled releases the isolation',
      'If the isolation is removed when Crew A hands back, Crew B is still working on plant that is now live',
      'Crew B must stop work as soon as Crew A finishes',
      'The two permits automatically merge into one',
    ],
    correctAnswer: 1,
    explanation:
      'This is exactly why permit systems cross-reference isolations and why multi-lock hasps exist. An isolation shared by multiple permits must remain secured until EVERY permit relying on it has been cancelled and every lock removed by its owner. The issuing authority tracks which permits depend on which isolations; the physical lock of each crew backs up that paperwork.',
  },
  {
    id: 12,
    question:
      'After a permitted job is finished, why should the cancelled permit be retained with the maintenance records?',
    options: [
      'To reuse the same form for the next job and save paper',
      'It provides an auditable record of what was done, what precautions were applied, and who authorised and performed the work — and evidence of competence for the technicians involved',
      'Cancelled permits have no value and should be discarded immediately',
      'To allow the expiry time to be extended retrospectively',
    ],
    correctAnswer: 1,
    explanation:
      'A completed permit is evidence: it shows the plant history, supports investigations and audits, and demonstrates that high-risk work was properly controlled. For an ST1426 apprentice it is also portfolio gold — a real record of you working under (or supporting) formal safe systems of work, which maps directly to knowledge, skills, and behaviours assessed at End-Point Assessment.',
  },
];

const faqs = [
  {
    question: 'Do I need a permit to work for everyday electrical maintenance?',
    answer:
      'No — and that is deliberate. Routine, well-understood tasks are controlled by safe working procedures and safe isolation, not permits. A permit is reserved for work where the risk is high and the standard controls are not enough on their own: high voltage switching, entry into confined spaces, hot work in areas with flammable materials, work on stored-energy systems, or any task where several parties and hazards interact. Your site rules define exactly which activities are permit-controlled — learn them and follow them.',
  },
  {
    question: 'Can the same person issue and accept a permit?',
    answer:
      'As a rule, no. The independent check — one person verifying the precautions and another working under them — is the core strength of the system. On very small sites a single authorised person may occasionally have to fill both roles; where a site allows this at all, it should be an explicitly documented, exceptional arrangement with compensating checks, never the everyday habit. If you find yourself routinely signing your own permits, the system is not doing its job.',
  },
  {
    question: 'Is a verbal permit ever acceptable?',
    answer:
      'No. The entire value of a permit lies in the written, signed record: the defined task, the defined boundary, the listed precautions, the named people, the time limits. A verbal instruction has none of these — it cannot be checked, handed over, suspended, or audited, and memories of what was agreed will differ the moment something goes wrong. If the job needs a permit, it needs a written one.',
  },
  {
    question: 'What happens if conditions change while the permit is live?',
    answer:
      'The permit describes a specific task under specific conditions. If anything material changes — the scope grows, an unexpected hazard appears, an isolation has to be altered, another trade needs to work nearby — work stops and the issuing authority is informed. They decide whether the permit can continue, needs amending through reissue, or must be cancelled and replaced. Nobody in the working party ever amends a permit themselves, and "while we are here" extras are never done under the original permit.',
  },
  {
    question: 'How do permits count towards my ST1426 apprenticeship evidence?',
    answer:
      'Directly. The MOET standard expects you to understand and comply with safe systems of work, and permits are the most formal safe system you will meet. Copies of cancelled permits you worked under (with your name in the working party), records of toolbox talks and permit briefings you attended, and CMMS work orders cross-referencing permit numbers are all strong portfolio evidence. At End-Point Assessment you may be asked to explain the permit lifecycle and your role within it — being able to talk through a real permit you worked under is far more convincing than reciting theory.',
  },
];

const MOETModule1Section1_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.1 · Subsection 1"
        title="Permit to Work Systems"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            The formal safe system of work that controls high-risk maintenance. What a permit is,
            when one is required, and how the lifecycle keeps people alive — including the two
            stages that kill people when they get skipped.
          </p>

          <TLDR
            points={[
              'A permit is a control, not a safeguard. It records that defined precautions ARE in place — the paper itself stops nothing.',
              'Six stages: request → risk assessment → authorisation → issue and acceptance → work → handback and cancellation.',
              'Separation of duties: the issuer verifies, the holder works. Never the same person.',
              'HSE HSG250 is the guidance your site procedure is almost certainly built on.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Risk assessment',
                gist: 'The formal look at what could hurt someone on a specific job, and what will be done about it. A permit documents the controls a risk assessment demanded — it never replaces one.',
                where: '1.3',
              },
              {
                term: 'Safe isolation',
                gist: 'Identify the supplies, switch off, isolate, and prove dead at the point of work. This is the act that actually makes plant safe; the permit only records that it was done.',
                where: '1.1.2',
              },
              {
                term: 'Lock-out / tag-out (LOTO)',
                gist: 'Personal locks, multi-lock hasps and tags that physically stop an isolation being reversed while people are still working on the plant.',
                where: '1.1.3',
              },
              {
                term: 'The legal duties',
                gist: 'The Health and Safety at Work etc. Act 1974 sets the general duty to work safely; the Electricity at Work Regulations 1989 set the electrical ones. Permits are how a site discharges those duties on its highest-risk work.',
                where: '1.4',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define what a permit to work is — and, just as importantly, what it is not.',
              'Identify the categories of work that require a permit, and explain why over-permitting weakens the system.',
              'Describe every stage of the permit lifecycle from request to cancellation.',
              'Explain the roles of issuing authority, authorised person, competent person and permit holder — and why issuer and worker are separated.',
              'Show how a permit interlocks with safe isolation and lock-out/tag-out on a real maintenance task.',
              'Recognise common permit failure modes, and explain how permit records feed maintenance history and your apprenticeship portfolio.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What a permit actually is</ContentEyebrow>

          <ConceptBlock
            title="A written declaration that the plant has been made safe — not the thing that makes it safe"
            plainEnglish="Someone has gone and checked, in person, that the isolations and precautions are really on. The permit is their signature on that check, plus the rules for keeping it that way."
            onSite="If the permit in your hand lists an isolation you cannot physically see locked off, stop. The paper describes a safety that may not exist."
          >
            <p>
              A permit to work (PTW) is a formal, documented safe system of work used to control
              activities where the risk is high and ordinary procedures are not enough on their own.
              It is a written declaration — signed, timed, and specific — that a defined task may be
              carried out on defined plant, within a defined boundary, because defined precautions
              have been put in place and checked. The HSE publishes dedicated guidance on
              permit-to-work systems as HSG250, and it is the reference your site&apos;s own permit
              procedure will almost certainly be built on.
            </p>
            <p>
              The permit form does two jobs at once. First, it is a checklist and record: the work
              to be done, how the equipment has been prepared, the hazards that remain, the
              precautions taken against them, the people authorised to do the work, and when the
              authority to work expires. Second — and this is the part people underestimate — it is
              a communication tool. Employers must train their staff in its use, and the form should
              be designed by the company issuing it around the real conditions of the site. A permit
              forces the people who operate and control the plant to talk to the people who are
              about to open it up, and it captures that conversation in writing where it cannot be
              misremembered.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What a typical permit records">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>The work to be done — a specific task, not a vague heading.</li>
              <li>How the equipment has been prepared (isolated, drained, purged, earthed).</li>
              <li>The potential hazards that remain during the work.</li>
              <li>The precautions to be taken against those hazards.</li>
              <li>The person or persons authorised to carry out the work.</li>
              <li>When the permit expires — the time limit on the authority to work.</li>
              <li>An authorisation section signed by the person issuing the permit.</li>
              <li>A work-completed section signed at handback, before cancellation.</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Treating the permit as the safeguard"
            whatHappens={
              <>
                <p>
                  The permit gets read as proof that the job is safe. It is four things it is not:
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-orange-300/70">
                  <li>
                    <strong>Not a safeguard in itself.</strong> The paper stops nothing. Only the
                    isolations, locks, earths, barriers and gas tests it records actually protect
                    anyone. A permit describing precautions that were never applied is a trap.
                  </li>
                  <li>
                    <strong>Not a replacement for risk assessment.</strong> The permit is the output
                    of a risk assessment for a specific task on a specific day — it documents the
                    controls the assessment demanded. Assessment first, permit second, always.
                  </li>
                  <li>
                    <strong>Not a general licence.</strong> It authorises one defined task on one
                    item of plant within one boundary and time window.
                  </li>
                  <li>
                    <strong>Not a transfer of responsibility.</strong> Everyone in the chain keeps
                    their own duties under the Health and Safety at Work etc. Act 1974. A signature
                    shares responsibility; it never offloads it.
                  </li>
                </ul>
              </>
            }
            doInstead={
              <>
                Read a permit as a claim to be checked, not a guarantee to be trusted. It authorises{' '}
                <strong>one</strong> defined task, on <strong>one</strong> item of plant, inside{' '}
                <strong>one</strong> boundary and time window. Anything outside that is not covered,
                however convenient it would be.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>When a permit is required</ContentEyebrow>

          <ConceptBlock
            title="Reserved for work where the standard controls are not enough on their own"
            onSite="You do not decide which jobs need permits — the site rules do. Your job is to know them, recognise when a task falls into a permit-controlled category, and refuse to start until a valid permit has been issued and accepted."
          >
            <p>
              Permits are reserved for work where the consequences of getting it wrong are severe
              and where training, procedures and safe isolation need an extra, formally managed
              layer on top. Your site&apos;s rules name the permit-controlled activities precisely,
              but across UK industry the same families of work appear again and again:
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>High voltage electrical work.</strong> Switching, earthing and maintenance
                on HV equipment is permit-controlled on virtually every site that has it. The permit
                system ensures the equipment is isolated — and, where necessary, earthed — before
                the task begins, and re-energised safely and deliberately afterwards. HV permits are
                typically issued only by senior authorised persons appointed in writing under the
                site electrical safety rules.
              </li>
              <li>
                <strong>Confined space entry.</strong> Tanks, vessels, ducts, pits and chambers
                where atmosphere, access and escape are all hazardous. Entry permits specify gas
                testing, ventilation, rescue arrangements, and a top-man in communication with those
                inside. Many sites use a dedicated entry permit form so these precautions get proper
                emphasis.
              </li>
              <li>
                <strong>Hot work.</strong> Welding, grinding, brazing and flame cutting outside
                designated workshop areas — controlling combustibles, extinguishers at the point of
                work, a fire watch during and after, and checks of adjacent areas sparks could
                reach.
              </li>
              <li>
                <strong>Work on stored-energy systems.</strong> Pressurised pipework and vessels,
                hydraulic and pneumatic systems, capacitor banks, battery systems, springs under
                tension, suspended loads. Opening the breaker is not enough when the danger is
                energy already stored in the plant — the permit specifies how each energy source is
                released, restrained or discharged, and how that is verified before work begins.
              </li>
              <li>
                <strong>Work near live plant or interacting hazards.</strong> Work at height above
                operating machinery, excavation near buried services, or any task where several
                trades and hazards share the same space at the same time. Here the permit earns its
                keep as a coordination tool — it is often the only document everyone involved has
                actually read and signed.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Why not permit everything?"
            plainEnglish="A permit is meant to mean 'this one is different — stop and check'. If everything needs one, it stops meaning anything."
          >
            <p>
              If permits make dangerous work safer, why not require one for every job? Because a
              permit system runs on attention, and attention is finite. When every lamp change and
              filter swap needs a permit, issuing becomes an assembly line, verification visits
              become signatures from a desk, and the working party learns that permits are paperwork
              rather than protection.
            </p>
            <p>
              The result is the worst of both worlds: routine jobs slowed down for no safety gain,
              and the genuinely lethal jobs — the HV switching, the vessel entry — receiving the
              same devalued rubber stamp as everything else. A good permit system is deliberately
              selective.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The permit lifecycle</ContentEyebrow>

          <ConceptBlock title="Six stages, each one a positive confirmation">
            <p>
              Every permit follows the same lifecycle, whatever the form looks like on your site.
              Each stage exists because skipping it has killed people. Learn the sequence until you
              can recite it — you will be expected to know it at End-Point Assessment, and more
              importantly you will be expected to live it on site.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What happens at each stage">
            <ul className="list-decimal space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Request and definition.</strong> The work is requested through the
                maintenance planning system and defined precisely: which plant, which task, which
                boundary. Vague scope is the enemy of every later stage. &quot;Repair pump 3&quot;
                is not a permit task; &quot;replace the mechanical seal on cooling water pump
                P-103&quot; is.
              </li>
              <li>
                <strong>Risk assessment and precaution planning.</strong> Hazards assessed,
                precautions specified — points of isolation, drains and vents, gas tests, PPE,
                rescue arrangements. This is where the method statement and the permit requirements
                are decided. The permit documents the outcome of this assessment; it never
                substitutes for it.
              </li>
              <li>
                <strong>Preparation and authorisation.</strong> The plant is actually prepared:
                isolated, locked, tagged, drained, purged, proved dead or gas-tested as required.
                The authorised person then verifies — at the plant, not from a desk — that every
                precaution is genuinely in place. Only precautions that exist may be written on a
                permit.
              </li>
              <li>
                <strong>Issue and acceptance.</strong> The issuing authority signs, authorising the
                defined work under the recorded conditions and time limits. The permit holder reads
                it, walks the job if needed, and signs acceptance. Both signatures are commitments,
                not formalities.
              </li>
              <li>
                <strong>Work within the permit.</strong> The task is carried out exactly as
                permitted, with the permit displayed at the point of work. If anything changes, work
                stops and the issuing authority decides what happens next. Nobody in the working
                party ever amends the permit.
              </li>
              <li>
                <strong>Handback and cancellation.</strong> The holder signs work-complete: task
                finished or left in a defined safe state, working party, tools and temporary
                equipment clear. The issuing authority verifies, cancels the permit, and only then
                authorises removal of isolations and return to service.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The lifecycle is a chain of positive confirmations"
            onSite="At no point does the system rely on anyone assuming something was probably done."
          >
            <p>
              The precautions are verified before issue; the holder confirms understanding before
              work; the holder confirms clearance before cancellation; the issuer confirms
              cancellation before re-energisation. Break any link — issue before verifying,
              re-energise before cancelling — and the whole chain fails at once.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Roles and responsibilities</ContentEyebrow>

          <ConceptBlock
            title="A permit system names people, not job titles in the abstract"
            plainEnglish="Titles vary between sites. The four functions never do — and neither does the rule that separates them."
          >
            <ul className="list-disc space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Issuing authority.</strong> Formally empowered by the site to issue permits
                for a class of work. They confirm the risk assessment and precautions, verify the
                plant preparation at the point of work, sign the authorisation, control any
                suspension or revalidation, and cancel the permit at handback. Appointed in writing
                and trained — permit issue is a named, accountable duty, never something anyone
                senior simply picks up.
              </li>
              <li>
                <strong>Authorised person.</strong> Appointed under the site&apos;s electrical
                safety rules to carry out isolation, switching and earthing on defined equipment.
                They apply and secure the isolations the permit records, and prove them effective.
                On many sites this is the same individual as the issuing authority for LV work; on
                HV the roles are usually distinct and tightly defined.
              </li>
              <li>
                <strong>Competent person.</strong> Anyone carrying out the work must have the
                training, knowledge and experience the task demands, or be working under appropriate
                supervision while gaining them. This duty comes straight from the Electricity at
                Work Regulations 1989. As an apprentice you are a member of the working party under
                supervision — named on the permit briefing, bound by its conditions, and entitled
                and expected to stop and ask when anything is unclear.
              </li>
              <li>
                <strong>Permit holder.</strong> The competent person in charge of the work. Signs
                acceptance, briefs the working party on hazards, precautions and boundary, keeps the
                permit at the point of work, ensures nobody strays outside its scope, and signs the
                work-complete declaration. While the permit is live, the holder is personally
                responsible for what happens inside its boundary.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Collapsing the issuer and the worker into one person"
            whatHappens={
              <>
                You lose the independent check — the entire safety argument of the system. The same
                person who missed a second supply into the panel also signs the permit saying there
                isn&apos;t one. There is no second pair of eyes, because the assumptions that caused
                the error also signed it off as safe.
              </>
            }
            doInstead={
              <>
                Keep them separate — this is the golden rule of every permit system, and it is not
                bureaucracy. The issuer checks the plant with fresh eyes and no stake in starting
                the job quickly; the holder accepts conditions someone else has independently
                verified. Two different people must each be satisfied, on their own judgement,
                before work begins. Where a very small site genuinely cannot separate the roles for
                a particular job, that should be a documented exception with compensating controls —
                never quietly accepted as normal practice.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Permits, safe isolation and LOTO</ContentEyebrow>

          <ConceptBlock title="A permit never works alone">
            <p>
              On electrical maintenance a permit sits on top of two things you will study in the
              next pages of this module: the safe isolation procedure (1.1.2) and lock-out/tag-out
              (1.1.3). The three form one layered system — and learners routinely collapse them into
              a single idea, which is exactly the confusion that gets people hurt.
            </p>
          </ConceptBlock>

          <ControlLayers />

          <ConceptBlock title="What each layer contributes">
            <ul className="list-disc space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Safe isolation makes the plant dead.</strong> The correct supplies are
                identified, switched off, isolated and proved dead at the point of work. This is the
                technical act that removes the hazard.
              </li>
              <li>
                <strong>Lock-out/tag-out keeps it dead.</strong> Personal locks, multi-lock hasps
                and tags physically secure each point of isolation so it cannot be re-closed while
                anyone is working.
              </li>
              <li>
                <strong>The permit manages the whole state.</strong> It records which isolations and
                locks protect which task, who verified them, who is working, and until when — the
                management wrapper that means someone is formally in control of the safe state from
                the moment it is created to the moment it is deliberately dismantled.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 464.2"
            clause="Suitable means shall be provided to prevent electrically powered equipment from inadvertently or unintentionally reactivating during mechanical maintenance, unless the means of switching off is continuously under the control of any person performing such maintenance."
            meaning={
              <>
                This is the regulation behind the padlock. In practice: isolation with lock-off
                devices, removable fuses with lockable carriers, padlocked isolators, or withdrawal
                of control keys. Chapter 46 covers isolation and switching measures for preventing
                or removing danger more broadly.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026, Chapter 46"
          />

          <Scenario
            title="Contactor replacement in a motor control centre"
            situation={
              <>
                A packaging line keeps tripping. The fault is a burnt-out contactor in compartment
                4B of the 400&nbsp;V motor control centre — a panel where the main busbars stay live
                because three other production lines feed from the same board.
              </>
            }
            whatToDo={
              <>
                <p>
                  <strong>Request:</strong> a work order is raised for &quot;replace contactor,
                  MCC-2 compartment 4B, conveyor drive M-412&quot;. Because the task involves
                  opening a compartment in a board with adjacent live equipment, site rules require
                  a permit.
                </p>
                <p>
                  <strong>Assessment:</strong> hazards identified — adjacent live busbars, a
                  control-circuit supply entering the compartment from a separate MCB, and stored
                  energy in the drive&apos;s DC link capacitors. Precautions: isolate the outgoing
                  circuit AND the separate control supply, allow the specified capacitor discharge
                  time, prove dead, barrier off the live sections.
                </p>
                <p>
                  <strong>Preparation:</strong> the authorised person locks off the circuit isolator
                  for M-412 and the control-supply MCB — two separate points, each with a lock and
                  tag. After the discharge period they prove the compartment dead using the full
                  prove–test–prove sequence.
                </p>
                <p>
                  <strong>Issue and acceptance:</strong> the permit lists both isolation points and
                  lock numbers, defines the boundary (&quot;work confined to compartment 4B; all
                  other compartments remain live — do not open&quot;), and expires at end of shift.
                  The lead technician walks the isolations with the issuer, signs acceptance, and
                  briefs the fitter and the apprentice. Each member of the working party adds a
                  personal lock to the multi-lock hasp.
                </p>
                <p>
                  <strong>Work:</strong> the contactor is replaced. Midway, the fitter suggests also
                  swapping a suspect relay in compartment 5A &quot;while the board&apos;s
                  open&quot;. The holder refuses — 5A is outside the boundary and its circuit is not
                  isolated. A new work order is raised instead.
                </p>
                <p>
                  <strong>Handback:</strong> tools counted out, covers refitted, personal locks
                  removed, holder signs work complete. The issuing authority checks the compartment,
                  cancels the permit, removes the isolation locks, and re-energises.
                </p>
              </>
            }
            whyItMatters={
              <>
                Safe isolation made compartment 4B dead. LOTO — including every worker&apos;s
                personal lock — kept it dead. The permit defined the boundary that stopped the
                &quot;while we&apos;re here&quot; job in the live compartment, and its handback
                stage guaranteed the plant was only re-energised onto an empty, closed panel. Three
                layers, three different failures prevented.
              </>
            }
          />

          <VideoCard
            url="https://www.youtube.com/watch?v=SfnQdvbQlgI"
            title="Safe Working Practice, RAMS and Safe Isolation"
            channel="A121 Training"
            duration="9:16"
            topic="How RAMS, safe systems of work and isolation fit together on site"
            caption="Covers the documentation layer this page describes, from the installation side — the same principles a maintenance permit formalises."
          />

          <SectionRule />

          <ContentEyebrow>Time limits, handover and suspension</ContentEyebrow>

          <ConceptBlock
            title="Real maintenance rarely fits neatly inside one permit window"
            onSite="In every one of these situations the answer runs through the issuing authority — never through improvisation at the point of work."
          >
            <ul className="list-disc space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Time limits and revalidation.</strong> Every permit carries an expiry,
                commonly end of shift. The limit exists because verified conditions decay with time:
                plant states change, people change, and a permit checked this morning says nothing
                reliable about tonight. When work will overrun, the holder tells the issuing
                authority <em>before</em> expiry; the issuer re-checks the precautions and formally
                revalidates or reissues. Working past expiry, or amending the time yourself, is
                working without authorisation — full stop.
              </li>
              <li>
                <strong>Shift handover.</strong> Responsibility under a permit is personal, so it
                cannot drift to the next crew by leaving the form taped to the panel. Outgoing
                holder signs off stating what has been done and the state the plant is in; incoming
                holder is briefed face-to-face on hazards, precautions, isolations and changes;
                incoming holder signs acceptance of the existing permit or a newly issued one. Sites
                that insist on reissue do it deliberately — it forces a fresh positive check rather
                than inheriting someone else&apos;s assurances. Poor shift handover is a recurring
                thread in major accident investigations across every industry; treat it with the
                same seriousness as first issue.
              </li>
              <li>
                <strong>Suspension.</strong> Sometimes work pauses while the permit and precautions
                stay in place: an evacuation, a conflicting operation, a plant trip. Suspension is a
                formal state, recorded by the issuing authority, that says:{' '}
                <em>
                  the work has stopped; the safe conditions are preserved; work may not resume until
                  re-authorised.
                </em>{' '}
                The dangerous moment is the restart — valves may have been operated, supplies
                switched, other permits issued on connected plant. Before lifting a suspension the
                issuer re-verifies every precaution exactly as before first issue.
              </li>
              <li>
                <strong>Interacting permits and shared isolations.</strong> Two permits may rely on
                the same point of isolation. The issuing authority keeps the register that
                cross-references them, and the physical system backs it up: a multi-lock hasp on the
                shared isolator carries a lock for each permit and each worker, so the isolation
                physically cannot be removed until the last permit depending on it is cancelled.
                When you hand back your permit, your locks come off — nobody else&apos;s.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>How permit systems fail</ContentEyebrow>

          <ConceptBlock title="The form is almost never the problem">
            <p>
              Permit systems rarely fail because the form is badly designed. They fail because the
              behaviours around the form decay. Every failure mode below has featured in real
              incident investigations, and every one is recognisable long before it hurts anyone —
              if you know what to look for.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="The desk-signed permit"
            whatHappens={
              <>
                An issuer under time pressure signs a batch of permits in the office without
                visiting the plant. One records an isolation on a pump that was never actually
                locked off — the operator was interrupted before applying it. The fitter opens the
                coupling guard of a machine that can still start.
              </>
            }
            doInstead={
              <>
                Precautions are verified at the plant, every time. A permit is only as honest as its
                last physical check.
              </>
            }
          />

          <CommonMistake
            title="Boundary creep"
            whatHappens={
              <>
                A crew permitted to work on one conveyor drive notices a slack chain on the
                neighbouring conveyor and adjusts it &quot;while we&apos;re here&quot;. That
                conveyor is not isolated — it is running on automatic and starts on a sensor signal.
              </>
            }
            doInstead={
              <>
                The permit boundary is a hard edge. Extra work means a new permit, not a quick
                favour.
              </>
            }
          />

          <CommonMistake
            title="The verbal amendment"
            whatHappens={
              <>
                The holder phones the issuer to ask about extending the job into an adjacent panel.
                The issuer says &quot;should be fine, I&apos;ll sort the paperwork later&quot;. The
                panel contains a supply from a different board that nobody assessed.
              </>
            }
            doInstead={
              <>
                If it is not written, signed and verified, it is not permitted. There is no such
                thing as a verbal permit or a verbal amendment.
              </>
            }
          />

          <CommonMistake
            title="The forgotten live permit"
            whatHappens={
              <>
                A job finishes early on a Friday. The crew removes their tools and goes home without
                handing back; the permit stays live all weekend. Operations either lose two days of
                production — or, far worse, someone removes the locks without authority because
                &quot;the job&apos;s obviously done&quot;.
              </>
            }
            doInstead={
              <>
                Handback is part of the job. The task is not finished until the permit is cancelled.
              </>
            }
          />

          <CommonMistake
            title="Wrong plant, right paperwork"
            whatHappens={
              <>
                Two identical air handling units sit side by side: AHU-7A and AHU-7B. The permit and
                the isolation are for 7A; the fitter, working from memory, opens 7B. The paperwork
                was perfect and the wrong machine was live.
              </>
            }
            doInstead={
              <>
                Verify plant identity at the point of work against the permit — tag numbers, not
                habit — and prove dead before touching conductors, every time.
              </>
            }
          />

          <CommonMistake
            title="Rubber-stamp culture"
            whatHappens={
              <>
                A site requires permits for almost everything, so supervisors sign twenty a morning.
                When a genuinely high-risk vessel entry comes through, it gets the same
                ninety-second treatment as the routine jobs, and the gas test recorded on the form
                was done the previous day.
              </>
            }
            doInstead={
              <>
                Over-permitting is not extra safety — it is dilution. Guard the system&apos;s
                meaning by reserving it for the work that needs it.
              </>
            }
          />

          <ConceptBlock
            title="The common thread"
            onSite="If you see a permit signed from a desk, a boundary quietly ignored, or locks coming off before cancellation, you are watching a fatality rehearsal. Say something."
          >
            <p>
              In every scenario above the paperwork existed. What failed was a human behaviour the
              paperwork depends on — verification, boundary discipline, formality, closure. As an
              apprentice you are not yet issuing permits, but you are part of the culture that keeps
              them honest.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Records and your portfolio</ContentEyebrow>

          <ConceptBlock
            title="A cancelled permit is part of the plant's history — and part of yours"
            plainEnglish="Permits are numbered and kept so that control of high-risk work can be proved afterwards: to auditors, to investigators, and to the assessor deciding whether you have met the standard."
          >
            <ul className="list-disc space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Maintenance records.</strong> The work order cross-references the permit
                number, so the plant history shows not just what was done but under what controls.
                Isolation certificates, gas test results and test-for-dead records link the same
                way.
              </li>
              <li>
                <strong>Audit and investigation.</strong> Retained permits let the site demonstrate
                its safe systems of work operate in practice, and give investigators the exact state
                of controls at the time of any incident.
              </li>
              <li>
                <strong>System improvement.</strong> Reviewing completed permits reveals patterns —
                repeated late handbacks, recurring boundary changes, precautions always added by
                hand — which feed improvements to the forms and procedures.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Build the evidence as you go"
            onSite="At End-Point Assessment, walking an assessor through a real permit you worked under is far more convincing than reciting the lifecycle from memory."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Keep suitably approved copies of permits you worked under, with your name in the
                working party or briefing record.
              </li>
              <li>
                Record the permit briefings and toolbox talks you attended, and what your role in
                the task was.
              </li>
              <li>
                Photograph lock-off arrangements you applied, where site rules allow, and link them
                to the permit and work order numbers in your portfolio.
              </li>
              <li>Practise explaining the lifecycle out loud.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Lifecycle: request → risk assessment → preparation and authorisation → issue and acceptance → work → handback and cancellation.',
              'Verify at the plant before issue. Cancel before re-energising. Those two gates are where permit systems kill people.',
              'Permit-controlled work: HV electrical, confined space entry, hot work, stored-energy systems, work near live plant or interacting hazards.',
              'Roles: issuing authority verifies, issues and cancels; authorised person isolates, earths and proves; permit holder accepts, briefs and hands back; competent persons carry out the work.',
              'Issuer and worker are always separated — that independent check is the whole safety argument.',
              'Safe isolation makes it dead, LOTO keeps it dead, the permit manages the state. The permit alone protects nobody.',
              'Key references: HSE HSG250; HASAWA 1974; EAWR 1989; BS 7671:2018+A4:2026 Chapter 46 and Regulation 464.2.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Permit to work knowledge check" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Safe systems of work
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section1-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Isolation Procedures
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section1_1;
