import { ArrowLeft, ClipboardCheck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
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
    question:
      'What must be confirmed BEFORE a permit for work on electrical plant is issued?',
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
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <ClipboardCheck className="h-4 w-4" />
            <span>Module 1.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Permit to Work Systems
          </h1>
          <p className="text-white">
            The formal safe system of work that controls high-risk maintenance — what a permit is,
            when one is required, and how the lifecycle keeps people alive
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">
              In 30 Seconds
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>A permit is a control, not a safeguard:</strong> it records that defined
                precautions ARE in place
              </li>
              <li className="pl-1">
                <strong>Lifecycle:</strong> request → risk assessment → authorisation → issue and
                acceptance → work → handback and cancellation
              </li>
              <li className="pl-1">
                <strong>Separation of duties:</strong> the issuer verifies; the holder works — never
                the same person
              </li>
              <li className="pl-1">
                <strong>Guidance:</strong> HSE HSG250 — Guidance on permit-to-work systems
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">
              Context — Why This Matters
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>High-risk maintenance kills</strong> when the people controlling the plant
                and the people working on it stop communicating
              </li>
              <li className="pl-1">
                <strong>Permits force that communication</strong> — in writing, with signatures and
                time limits
              </li>
              <li className="pl-1">
                <strong>ST1426 requirement:</strong> working under safe systems of work is a core
                MOET competency
              </li>
              <li className="pl-1">
                <strong>Legal framework:</strong> Health and Safety at Work etc. Act 1974 and the
                Electricity at Work Regulations 1989
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You&apos;ll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Define what a permit to work is — and, just as importantly, what it is not',
              'Identify the categories of work that require a permit and explain why over-permitting weakens the system',
              'Describe every stage of the permit lifecycle from request to cancellation',
              'Explain the roles of issuing authority, authorised person, competent person, and permit holder — and why issuer and worker are separated',
              'Show how a permit interlocks with safe isolation and lock-out/tag-out on a real maintenance task',
              'Recognise common permit failure modes and explain how permit records feed maintenance history and your apprenticeship portfolio',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: What a Permit to Work Is — and Is Not */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What a Permit to Work Is — and Is Not
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
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
              The permit form itself does two jobs at once. First, it is a checklist and record: the
              work to be done, how the equipment has been prepared, the hazards that remain, the
              precautions taken against them, the people authorised to do the work, and when the
              authority to work expires. Second — and this is the part people underestimate — it is
              a communication tool. Employers must train their staff in its use, and the form should
              be designed by the company issuing it around the real conditions of the site. A permit
              forces the people who operate and control the plant to talk to the people who are
              about to open it up, and it captures that conversation in writing where it cannot be
              misremembered.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">
                What a Typical Permit Records
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  'The work to be done — a specific task, not a vague heading',
                  'How the equipment has been prepared (isolated, drained, purged, earthed)',
                  'The potential hazards that remain during the work',
                  'The precautions to be taken against those hazards',
                  'The person or persons authorised to carry out the work',
                  'When the permit expires — the time limit on the authority to work',
                  'An authorisation section signed by the person issuing the permit',
                  'A work-completed section signed at handback before cancellation',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-white">
                    <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-3">What a Permit Is NOT</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Not a safeguard in itself.</strong> The paper stops nothing. Only the
                  isolations, locks, earths, barriers, and gas tests it records actually protect
                  anyone. A permit describing precautions that were never applied is a trap.
                </li>
                <li className="pl-1">
                  <strong>Not a replacement for risk assessment.</strong> The permit is the output
                  of a risk assessment for a specific task on a specific day — it documents the
                  controls the assessment demanded. Assessment first, permit second, always.
                </li>
                <li className="pl-1">
                  <strong>Not a general licence.</strong> It authorises one defined task on one
                  defined item of plant within one defined boundary and time window. Anything
                  outside that — a different machine, an extra job, an extended area — is not
                  covered, however convenient it would be.
                </li>
                <li className="pl-1">
                  <strong>Not a transfer of responsibility.</strong> Everyone in the chain — the
                  employer, the issuing authority, the permit holder, the working party — keeps
                  their own legal duties under the Health and Safety at Work etc. Act 1974. A
                  signature shares responsibility; it never offloads it.
                </li>
              </ul>
            </div>

            <p>
              Hold on to one sentence as you work through this page:{' '}
              <strong>
                a permit to work is a record that the plant has been made safe and a set of rules
                for keeping it that way — it is not the thing that makes it safe.
              </strong>{' '}
              Every failure mode you will meet in section 07 is, at root, someone forgetting that
              sentence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: When a Permit Is Required */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            When a Permit Is Required — and When It Is Not
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Permits are reserved for work where the consequences of getting it wrong are severe
              and where the standard controls — training, procedures, safe isolation — need an
              extra, formally managed layer on top. Your site&apos;s rules will name the
              permit-controlled activities precisely, but across UK industry the same families of
              work appear again and again.
            </p>

            <div className="my-6 space-y-3">
              {[
                {
                  title: 'High voltage electrical work',
                  colour: 'text-red-400',
                  border: 'border-red-500/30',
                  bg: 'bg-red-500/10',
                  content:
                    'Switching, earthing, and maintenance on high voltage equipment is permit-controlled on virtually every site that has it. The permit system ensures the equipment is isolated — and, where necessary, earthed — before the task begins, and that it is re-energised safely and deliberately afterwards. HV permits are typically issued only by senior authorised persons appointed in writing under the site electrical safety rules.',
                },
                {
                  title: 'Confined space entry',
                  colour: 'text-purple-400',
                  border: 'border-purple-500/30',
                  bg: 'bg-purple-500/10',
                  content:
                    'Tanks, vessels, ducts, pits, and chambers where atmosphere, access, and escape are all hazardous. Entry permits specify gas testing, ventilation, rescue arrangements, and a top-man in communication with those inside. Many sites use a dedicated confined-space entry permit form so that these specific precautions get proper emphasis rather than being squeezed into a general form.',
                },
                {
                  title: 'Hot work',
                  colour: 'text-amber-400',
                  border: 'border-amber-500/30',
                  bg: 'bg-amber-500/10',
                  content:
                    'Welding, grinding, brazing, and flame cutting outside designated workshop areas. The permit controls removal or protection of combustible materials, fire extinguishers at the point of work, a fire watch during and after the task, and checks of adjacent areas that sparks could reach. Like confined-space entry, hot work commonly has its own dedicated permit form.',
                },
                {
                  title: 'Work on stored-energy systems',
                  colour: 'text-blue-400',
                  border: 'border-blue-500/30',
                  bg: 'bg-blue-500/10',
                  content:
                    'Pressurised pipework and vessels, hydraulic and pneumatic systems, capacitor banks, battery systems, springs under tension, and suspended loads. Opening the circuit breaker is not enough when the danger is energy already stored in the plant — the permit specifies how each energy source is released, restrained, or discharged, and how that is verified before work begins.',
                },
                {
                  title: 'Work near live plant or exceptional interacting hazards',
                  colour: 'text-green-400',
                  border: 'border-green-500/30',
                  bg: 'bg-green-500/10',
                  content:
                    'Work at height above or beside operating machinery, excavation near buried services, maintenance in areas where flammable liquids or gases are processed, or any task where several trades and hazards share the same space at the same time. Here the permit earns its keep as a coordination tool — it is often the only document that everyone involved has actually read and signed.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`p-4 rounded-lg ${item.bg} border-l-2 ${item.border}`}
                >
                  <p className={`text-sm font-medium ${item.colour} mb-2`}>{item.title}</p>
                  <p className="text-sm text-white">{item.content}</p>
                </div>
              ))}
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">
                Why Not Permit Everything?
              </p>
              <p className="text-sm text-white mb-2">
                If permits make dangerous work safer, why not require one for every job? Because a
                permit system runs on attention, and attention is finite. A permit is meant to be a
                signal: <em>this task is different — stop, check, verify</em>. When every lamp
                change and filter swap needs a permit, issuing becomes an assembly line,
                verification visits become signatures from a desk, and the working party learns
                that permits are paperwork rather than protection.
              </p>
              <p className="text-sm text-white">
                The result is the worst of both worlds: routine jobs are slowed down for no safety
                gain, and the genuinely lethal jobs — the HV switching, the vessel entry — receive
                the same devalued rubber stamp as everything else. A good permit system is
                deliberately selective. Routine maintenance runs on safe working procedures and
                safe isolation; permits are saved for the work that truly needs an independent,
                documented layer of control.
              </p>
            </div>

            <p>
              As a maintenance technician you do not decide which jobs need permits — the site
              rules do. Your responsibilities are to know those rules, to recognise when a task you
              have been given falls into a permit-controlled category, and to refuse to start such
              a task until a valid permit has been issued and accepted. &quot;I did not realise it
              needed a permit&quot; has appeared in too many incident investigations already.
            </p>
          </div>
        </section>

        {/* Section 3: The Permit Lifecycle */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            The Permit Lifecycle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every permit follows the same lifecycle, whatever the form looks like on your site.
              Each stage exists because skipping it has killed people. Learn the sequence until you
              can recite it — you will be expected to know it at End-Point Assessment, and more
              importantly you will be expected to live it on site.
            </p>

            <div className="my-6 space-y-3">
              {[
                {
                  step: '1',
                  title: 'Request and Definition',
                  colour: 'text-blue-400',
                  border: 'border-blue-500/30',
                  bg: 'bg-blue-500/10',
                  content:
                    'The work is requested — typically through the maintenance planning system — and defined precisely: which item of plant, which task, which boundary. Vague scope is the enemy of every later stage. "Repair pump 3" is not a permit task; "replace the mechanical seal on cooling water pump P-103" is.',
                },
                {
                  step: '2',
                  title: 'Risk Assessment and Precaution Planning',
                  colour: 'text-purple-400',
                  border: 'border-purple-500/30',
                  bg: 'bg-purple-500/10',
                  content:
                    'The hazards of the task are assessed and the precautions specified: which points of isolation, which drains and vents, which gas tests, which PPE, which rescue arrangements. This is where the method statement and the permit requirements are decided. The permit will document the outcome of this assessment — it never substitutes for it.',
                },
                {
                  step: '3',
                  title: 'Preparation and Authorisation',
                  colour: 'text-green-400',
                  border: 'border-green-500/30',
                  bg: 'bg-green-500/10',
                  content:
                    'The plant is actually prepared: isolated, locked, tagged, drained, purged, proved dead or gas-tested as required. The authorised person then verifies — at the plant, not from a desk — that every precaution the assessment demanded is genuinely in place. Only precautions that exist may be written on a permit.',
                },
                {
                  step: '4',
                  title: 'Issue and Acceptance',
                  colour: 'text-amber-400',
                  border: 'border-amber-500/30',
                  bg: 'bg-amber-500/10',
                  content:
                    'The issuing authority signs the permit, authorising the defined work under the recorded conditions and time limits. The permit holder reads it, walks the job if needed, and signs acceptance — a personal declaration that they understand the hazards, the precautions, and the boundary, and will keep the working party inside it. Both signatures are commitments, not formalities.',
                },
                {
                  step: '5',
                  title: 'Work Within the Permit',
                  colour: 'text-red-400',
                  border: 'border-red-500/30',
                  bg: 'bg-red-500/10',
                  content:
                    'The task is carried out exactly as permitted. The permit (or a copy) is displayed at the point of work. If anything changes — the scope grows, an unexpected hazard appears, the time limit approaches, the job must pause — work stops and the issuing authority decides what happens next. Nobody in the working party ever amends the permit.',
                },
                {
                  step: '6',
                  title: 'Handback and Cancellation',
                  colour: 'text-elec-yellow',
                  border: 'border-elec-yellow/30',
                  bg: 'bg-elec-yellow/10',
                  content:
                    'The permit holder signs the work-complete section: task finished (or left in a defined safe state), working party, tools, and temporary equipment clear. The issuing authority verifies, cancels the permit, and only then authorises removal of isolations and return to service. The cancelled permit is retained as a record.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className={`p-4 rounded-lg ${item.bg} border-l-2 ${item.border}`}
                >
                  <p className={`text-sm font-medium ${item.colour} mb-2`}>
                    Stage {item.step}: {item.title}
                  </p>
                  <p className="text-sm text-white">{item.content}</p>
                </div>
              ))}
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">Critical Principle</p>
              <p className="text-sm text-white">
                The lifecycle is a <strong>chain of positive confirmations</strong>. At no point
                does the system rely on anyone assuming that something was probably done. The
                precautions are verified before issue; the holder confirms understanding before
                work; the holder confirms clearance before cancellation; the issuer confirms
                cancellation before re-energisation. Break any link — issue before verifying,
                re-energise before cancelling — and the whole chain fails at once.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Roles and Responsibilities */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Roles and Responsibilities
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A permit system names people, not job titles in the abstract. Exact titles vary
              between sites — some say &quot;issuing authority&quot;, others &quot;permit
              issuer&quot; or &quot;senior authorised person&quot; — but the functions are always
              the same, and so is the golden rule that separates them.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-blue-400 mb-2">Issuing Authority</h3>
                <p className="text-sm text-white">
                  The person formally empowered by the site to issue permits for a class of work.
                  They own the system for that job: they confirm the risk assessment and
                  precautions, verify the plant preparation at the point of work, sign the
                  authorisation, control any suspension or revalidation, and cancel the permit at
                  handback. They must be appointed in writing and trained for the role — permit
                  issue is a named, accountable duty, never something anyone senior simply picks
                  up.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-500/30">
                <h3 className="text-sm font-medium text-purple-400 mb-2">Authorised Person</h3>
                <p className="text-sm text-white">
                  On electrical systems in particular, the authorised person is the individual
                  appointed under the site&apos;s electrical safety rules to carry out isolation,
                  switching, and earthing on defined equipment. For high voltage work this
                  appointment is formal and specific — named equipment, named operations. The
                  authorised person applies and secures the isolations that the permit will record,
                  and proves them effective. On many sites the issuing authority and authorised
                  person are the same individual for LV work; on HV systems the roles and their
                  appointments are usually distinct and tightly defined.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/30">
                <h3 className="text-sm font-medium text-green-400 mb-2">Competent Person</h3>
                <p className="text-sm text-white">
                  Anyone carrying out the work must be competent for it — possessing the training,
                  knowledge, and experience the task demands, or working under appropriate
                  supervision while gaining them. This duty comes straight from the Electricity at
                  Work Regulations 1989 for electrical work and applies across the working party.
                  As an apprentice you are a member of the working party under supervision: named
                  on the permit briefing, bound by its conditions, and entitled — and expected — to
                  stop and ask when anything is unclear.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-500/30">
                <h3 className="text-sm font-medium text-amber-400 mb-2">Permit Holder</h3>
                <p className="text-sm text-white">
                  The competent person in charge of carrying out the work — usually the supervisor
                  or lead technician of the working party. The holder signs acceptance, briefs the
                  working party on the hazards, precautions, and boundary, keeps the permit at the
                  point of work, ensures nobody strays outside its scope, and signs the
                  work-complete declaration at handback. While the permit is live, the holder is
                  personally responsible for what happens inside its boundary.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">
                The Golden Rule: Issuer and Worker Are Separated
              </p>
              <p className="text-sm text-white mb-2">
                The person who issues the permit should not be the person who works under it. This
                is not bureaucracy — it is the entire safety argument of the system. The issuer
                checks the plant with fresh eyes and no stake in starting the job quickly. The
                holder accepts conditions someone else has independently verified. Two different
                people must each be satisfied, on their own judgement, before work begins.
              </p>
              <p className="text-sm text-white">
                Collapse the two roles into one and you lose the independent check: the same person
                who missed a second supply into the panel also signs the permit saying there
                isn&apos;t one. Where a very small site genuinely cannot separate the roles for a
                particular job, that situation should be recognised in the site procedure as an
                exception with compensating controls — never quietly accepted as normal practice.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Permits, Safe Isolation and LOTO */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            How Permits Interlock with Safe Isolation and LOTO
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A permit never works alone. On electrical maintenance it sits on top of two things
              you will study in the next pages of this module: the safe isolation procedure
              (module 1.1.2) and lock-out/tag-out (module 1.1.3). The three form one layered
              system:
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <div className="space-y-3">
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-blue-400 mb-1">
                    Safe isolation makes the plant dead
                  </p>
                  <p className="text-xs text-white">
                    The correct supplies are identified, switched off, isolated, and proved dead at
                    the point of work. This is the technical act that removes the hazard.
                  </p>
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-green-400 mb-1">
                    Lock-out/tag-out keeps it dead
                  </p>
                  <p className="text-xs text-white">
                    Personal locks, multi-lock hasps, and tags physically secure each point of
                    isolation so it cannot be re-closed while anyone is working. BS
                    7671:2018+A4:2026 makes the underlying requirement explicit: Regulation 464.2
                    requires suitable means to prevent electrically powered equipment from being
                    inadvertently reactivated during mechanical maintenance — typically isolation
                    with lock-off devices, removable fuses with lockable carriers, padlocked
                    isolators, or withdrawal of control keys. Chapter 46 of BS 7671 covers these
                    isolation and switching measures for preventing or removing danger.
                  </p>
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-elec-yellow mb-1">
                    The permit manages the whole state
                  </p>
                  <p className="text-xs text-white">
                    The permit records which isolations and locks protect which task, who verified
                    them, who is working, and until when. It is the management wrapper that means
                    someone is formally in control of the safe state from the moment it is created
                    to the moment it is deliberately dismantled.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-3">
                Worked Site Example: Contactor Replacement in a Motor Control Centre
              </p>
              <div className="space-y-2 text-sm text-white">
                <p>
                  A packaging line keeps tripping. The fault is traced to a burnt-out contactor in
                  compartment 4B of the 400&nbsp;V motor control centre — a panel where the main
                  busbars stay live because three other production lines feed from the same board.
                  Here is how the layers work together:
                </p>
                <div className="bg-black/30 p-3 rounded space-y-1.5">
                  <p>
                    <strong>1. Request:</strong> a work order is raised for &quot;replace
                    contactor, MCC-2 compartment 4B, conveyor drive M-412&quot;. Because the task
                    involves opening a compartment in a board with adjacent live equipment, site
                    rules require a permit.
                  </p>
                  <p>
                    <strong>2. Assessment:</strong> the risk assessment identifies the hazards:
                    adjacent live busbars, a control-circuit supply entering the compartment from a
                    separate MCB, and stored energy in the drive&apos;s DC link capacitors. The
                    precautions: isolate the outgoing circuit AND the separate control supply,
                    allow the specified capacitor discharge time, prove dead, and barrier off the
                    live sections of the board.
                  </p>
                  <p>
                    <strong>3. Preparation:</strong> the authorised person opens and locks off the
                    circuit isolator for M-412 and the control-supply MCB — two separate points of
                    isolation, each with a lock and tag. After the discharge period they prove the
                    compartment dead at the point of work using the full prove–test–prove sequence.
                  </p>
                  <p>
                    <strong>4. Issue and acceptance:</strong> the permit lists both isolation
                    points and lock numbers, defines the boundary (&quot;work confined to
                    compartment 4B; all other compartments remain live — do not open&quot;), and
                    sets an expiry at end of shift. The lead technician — the permit holder —
                    walks the isolations with the issuer, signs acceptance, and briefs the fitter
                    and the apprentice. Each member of the working party adds a personal lock to
                    the multi-lock hasp on the main circuit isolator.
                  </p>
                  <p>
                    <strong>5. Work:</strong> the contactor is replaced. Midway, the fitter
                    suggests also swapping a suspect relay in compartment 5A &quot;while the
                    board&apos;s open&quot;. The holder refuses — 5A is outside the permit
                    boundary and its circuit is not isolated. A new work order is raised instead.
                  </p>
                  <p>
                    <strong>6. Handback:</strong> tools are counted out, covers refitted, the
                    working party removes their personal locks, and the holder signs work
                    complete. The issuing authority checks the compartment, cancels the permit,
                    removes the isolation locks, and re-energises. The line restarts under
                    control — nobody near the board, covers on, everyone accounted for.
                  </p>
                </div>
                <p>
                  Notice what each layer contributed. Safe isolation made compartment 4B dead.
                  LOTO — including every worker&apos;s personal lock — kept it dead. The permit
                  defined the boundary that stopped the &quot;while we&apos;re here&quot; job in
                  the live compartment, and its handback stage guaranteed the plant was only
                  re-energised onto an empty, closed panel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Time Limits, Revalidation, Handover, Suspension */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Time Limits, Revalidation, Shift Handover, and Suspension
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A permit is valid for a defined window, and real maintenance rarely fits neatly
              inside one. Jobs overrun, shifts end, alarms sound, and other work interferes. The
              permit system has a formal answer for each of these situations — and in every case
              the answer runs through the issuing authority, never through improvisation at the
              point of work.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-blue-400 mb-2">
                  Time Limits and Revalidation
                </h3>
                <p className="text-sm text-white">
                  Every permit carries an expiry — commonly the end of the shift or working day.
                  The limit exists because the verified conditions decay with time: plant states
                  change, people change, and a permit checked this morning says nothing reliable
                  about tonight. When work will overrun, the holder tells the issuing authority{' '}
                  <em>before</em> expiry. The issuer re-checks that the precautions are still
                  intact and effective, then formally revalidates the permit or issues a fresh
                  one. Working past expiry, or amending the time yourself, is working without
                  authorisation — full stop.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-purple-400 mb-2">Shift Handover</h3>
                <p className="text-sm text-white mb-2">
                  Responsibility under a permit is personal, so it cannot drift from one crew to
                  the next by leaving the form taped to the panel. A proper handover has three
                  parts: the outgoing holder formally signs off, stating exactly what has been
                  done and the state the plant is left in; the incoming holder is briefed
                  face-to-face on the hazards, precautions, isolations, and any changes; and the
                  incoming holder signs acceptance of the existing permit or, on many sites, of a
                  newly issued one.
                </p>
                <p className="text-sm text-white">
                  Sites that insist on reissue at shift change do it deliberately: it forces the
                  incoming holder to make their own positive check of the isolations rather than
                  inheriting someone else&apos;s assurances. Poor shift handover is a recurring
                  thread in major accident investigations across every industry — treat this stage
                  with the same seriousness as first issue.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-amber-400 mb-2">Suspension</h3>
                <p className="text-sm text-white mb-2">
                  Sometimes permitted work must pause while the permit and its precautions stay in
                  place: an evacuation, a conflicting operation, a plant trip elsewhere, or an
                  instruction from operations. Suspension is a formal state — recorded by the
                  issuing authority — that says: <em>the work has stopped; the safe conditions
                  are preserved; work may not resume until re-authorised.</em>
                </p>
                <p className="text-sm text-white">
                  The dangerous moment is the restart. During the pause, anything may have changed:
                  valves operated during the emergency, supplies switched, other permits issued on
                  connected plant. Before lifting a suspension, the issuing authority re-verifies
                  every precaution on the permit exactly as they would before first issue. The
                  working party never simply drifts back to the job because the alarm stopped.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-green-400 mb-2">
                  Interacting Permits and Shared Isolations
                </h3>
                <p className="text-sm text-white">
                  Large jobs often run several permits at once, and two permits may rely on the
                  same point of isolation. The issuing authority keeps the register that
                  cross-references them, and the physical system backs it up: a multi-lock hasp on
                  the shared isolator carries a lock for each permit (and each worker), so the
                  isolation physically cannot be removed until the last permit depending on it has
                  been cancelled. When you hand back your permit, your locks come off — nobody
                  else&apos;s.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 7: Common Failure Modes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            How Permit Systems Fail
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Permit systems rarely fail because the form is badly designed. They fail because the
              behaviours around the form decay. Every failure mode below has featured in real
              incident investigations, and every one is recognisable long before it hurts anyone —
              if you know what to look for.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">
                Failure Modes and Site Scenarios
              </p>
              <ul className="text-sm text-white space-y-2 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>The desk-signed permit.</strong> An issuer under time pressure signs a
                  batch of permits in the office without visiting the plant. One records an
                  isolation on a pump that was never actually locked off — the operator was
                  interrupted before applying it. The fitter opens the coupling guard of a machine
                  that can still start.{' '}
                  <span className="text-green-400">
                    Lesson: precautions are verified at the plant, every time. A permit is only as
                    honest as its last physical check.
                  </span>
                </li>
                <li className="pl-1">
                  <strong>Boundary creep.</strong> A crew permitted to work on one conveyor drive
                  notices a slack chain on the neighbouring conveyor and adjusts it &quot;while
                  we&apos;re here&quot;. That conveyor is not isolated — it is running on automatic
                  and starts on a sensor signal.{' '}
                  <span className="text-green-400">
                    Lesson: the permit boundary is a hard edge. Extra work means a new permit, not
                    a quick favour.
                  </span>
                </li>
                <li className="pl-1">
                  <strong>The verbal amendment.</strong> The holder phones the issuer to ask about
                  extending the job into an adjacent panel. The issuer says &quot;should be fine,
                  I&apos;ll sort the paperwork later&quot;. The panel contains a supply from a
                  different board that nobody assessed.{' '}
                  <span className="text-green-400">
                    Lesson: if it is not written, signed, and verified, it is not permitted. There
                    is no such thing as a verbal permit or a verbal amendment.
                  </span>
                </li>
                <li className="pl-1">
                  <strong>The forgotten live permit.</strong> A job finishes early on a Friday. The
                  crew removes their tools and goes home without handing back; the permit stays
                  live all weekend. Operations, unable to restore the plant, either lose two days
                  of production — or, far worse, someone removes the locks without authority
                  because &quot;the job&apos;s obviously done&quot;.{' '}
                  <span className="text-green-400">
                    Lesson: handback is part of the job. The task is not finished until the permit
                    is cancelled.
                  </span>
                </li>
                <li className="pl-1">
                  <strong>Wrong plant, right paperwork.</strong> Two identical air handling units
                  sit side by side: AHU-7A and AHU-7B. The permit and the isolation are for 7A; the
                  fitter, working from memory, opens 7B. The paperwork was perfect and the wrong
                  machine was live.{' '}
                  <span className="text-green-400">
                    Lesson: verify plant identity at the point of work against the permit — tag
                    numbers, not habit — and prove dead before touching conductors, every time.
                  </span>
                </li>
                <li className="pl-1">
                  <strong>Rubber-stamp culture.</strong> A site requires permits for almost
                  everything, so supervisors sign twenty a morning. When a genuinely high-risk
                  vessel entry comes through, it gets the same ninety-second treatment as the
                  routine jobs, and the gas test recorded on the form was done the previous day.{' '}
                  <span className="text-green-400">
                    Lesson: over-permitting is not extra safety — it is dilution. Guard the
                    system&apos;s meaning by reserving it for the work that needs it.
                  </span>
                </li>
              </ul>
            </div>

            <p>
              Notice the common thread: in every scenario the paperwork existed. What failed was a
              human behaviour the paperwork depends on — verification, boundary discipline,
              formality, closure. As an apprentice you are not yet issuing permits, but you are
              part of the culture that keeps them honest. If you see a permit signed from a desk,
              a boundary quietly ignored, or locks coming off before cancellation, you are watching
              a fatality rehearsal. Say something.
            </p>
          </div>
        </section>

        {/* Section 8: Records and Portfolio */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Permit Evidence: Maintenance Records and Your Portfolio
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A cancelled permit is not waste paper — it is part of the plant&apos;s history and
              part of yours. Permits are numbered and retained precisely so that the control of
              high-risk work can be demonstrated afterwards: to auditors, to incident
              investigators, and to the assessors deciding whether you have met the MOET standard.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">
                Where Permit Evidence Lands
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Maintenance records:</strong> the work order in the maintenance
                  management system cross-references the permit number, so the plant history shows
                  not just what was done but under what controls. Isolation certificates, gas test
                  results, and test-for-dead records are linked the same way.
                </li>
                <li className="pl-1">
                  <strong>Audit and investigation:</strong> retained permits let the site
                  demonstrate that its safe systems of work operate in practice, and give
                  investigators the exact state of controls at the time of any incident.
                </li>
                <li className="pl-1">
                  <strong>System improvement:</strong> reviewing completed permits reveals
                  patterns — repeated late handbacks, recurring boundary changes, precautions
                  that are always added by hand — which feed improvements to the forms and the
                  procedures.
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">
                ST1426 Apprentices: Build the Evidence as You Go
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  Keep (suitably approved) copies of permits you worked under, with your name in
                  the working party or briefing record.
                </li>
                <li className="pl-1">
                  Record the permit briefings and toolbox talks you attended, and what your role
                  in the task was.
                </li>
                <li className="pl-1">
                  Photograph lock-off arrangements you applied (where site rules allow) and link
                  them to the permit and work order numbers in your portfolio.
                </li>
                <li className="pl-1">
                  Practise explaining the lifecycle out loud — at End-Point Assessment, walking an
                  assessor through a real permit you worked under is the strongest evidence there
                  is that you understand safe systems of work.
                </li>
              </ul>
            </div>

            <p>
              Elec-Mate&apos;s site documentation tools can hold this evidence alongside your other
              maintenance records, so that by the time your EPA arrives the story of your
              competence is already written — one permitted job at a time.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Permit Lifecycle — 6 Stages</p>
                <ul className="space-y-0.5">
                  <li>1. Request and definition</li>
                  <li>2. Risk assessment and precaution planning</li>
                  <li>3. Preparation and authorisation (verify at the plant)</li>
                  <li>4. Issue and acceptance (both signatures)</li>
                  <li>5. Work within the permitted boundary</li>
                  <li>6. Handback and cancellation before re-energisation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Permit-Controlled Work</p>
                <ul className="space-y-0.5">
                  <li>High voltage electrical work</li>
                  <li>Confined space entry</li>
                  <li>Hot work outside designated areas</li>
                  <li>Stored-energy systems</li>
                  <li>Work near live plant / interacting hazards</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Roles</p>
                <ul className="space-y-0.5">
                  <li>Issuing authority — verifies, issues, cancels</li>
                  <li>Authorised person — isolates, earths, proves</li>
                  <li>Permit holder — accepts, briefs, hands back</li>
                  <li>Competent person(s) — carry out the work</li>
                  <li>Issuer and worker are always separated</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>HSE HSG250 — permit-to-work guidance</li>
                  <li>Health and Safety at Work etc. Act 1974</li>
                  <li>Electricity at Work Regulations 1989</li>
                  <li>BS 7671:2018+A4:2026 — Ch. 46; Reg 464.2 (prevent inadvertent reactivation)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1.1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section1-2">
              Next: Isolation Procedures
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule1Section1_1;
