/**
 * Level 3 Module 1 Section 1.2 - Electricity at Work Regulations (EAWR) 1989
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Electricity at Work Regulations (EAWR) 1989 - Level 3 Module 1 Section 1.2";
const DESCRIPTION = "Master the key regulations governing electrical safety in UK workplaces. Learn about Regulations 4, 12, 13, 14, and 16 covering systems, earthing, isolation, live working, and competence.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Under Regulation 4(1), what standard must all electrical systems be maintained to?",
    options: [
      "Whatever the client requests",
      "So as to prevent danger, so far as is reasonably practicable",
      "Only when equipment is new",
      "Only if there has been a previous accident"
    ],
    correctIndex: 1,
    explanation: "Regulation 4(1) requires that all systems shall at all times be of such construction as to prevent danger, so far as is reasonably practicable. This applies throughout the life of the installation."
  },
  {
    id: "check-2",
    question: "Under Regulation 14, what must happen before work commences on electrical equipment?",
    options: [
      "The client must give verbal permission",
      "Equipment must be made dead and proven dead before work starts",
      "Work can start immediately if wearing PPE",
      "Only senior electricians need to isolate"
    ],
    correctIndex: 1,
    explanation: "Regulation 14 requires that no person shall work on or near any conductor which is live unless it is dead and proven dead. This is the fundamental principle of safe isolation."
  },
  {
    id: "check-3",
    question: "Under what circumstances does Regulation 14 permit live working?",
    options: [
      "Whenever time is short",
      "When the client requests it",
      "When it is unreasonable to work dead AND suitable precautions are taken",
      "Whenever an experienced electrician is present"
    ],
    correctIndex: 2,
    explanation: "Regulation 14 only permits live working when it is unreasonable in all circumstances for the conductor to be dead, AND when suitable precautions are taken to prevent injury."
  },
  {
    id: "check-4",
    question: "What does Regulation 16 require regarding persons working on electrical systems?",
    options: [
      "Anyone can work on electrical systems",
      "Only persons with degrees can work on electrical systems",
      "No person shall work on electrical systems unless competent or under supervision",
      "Competence is only required for high voltage work"
    ],
    correctIndex: 2,
    explanation: "Regulation 16 states that no person shall be engaged in any work activity where technical knowledge or experience is necessary unless they possess it or are under appropriate supervision."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Which Regulation requires that all electrical systems shall be constructed so as to prevent danger?",
    options: [
      "Regulation 2",
      "Regulation 4(1)",
      "Regulation 16",
      "Regulation 29"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4(1) states that all systems shall at all times be of such construction as to prevent danger, so far as is reasonably practicable."
  },
  {
    id: 2,
    question: "What does Regulation 4(2) require regarding work activities on or near electrical systems?",
    options: [
      "Work is only permitted by qualified electricians",
      "No documentation is required for work activities",
      "Work activities shall be carried out so as not to give rise to danger",
      "Work must be completed within normal working hours"
    ],
    correctAnswer: 2,
    explanation: "Regulation 4(2) requires that work activities on or near electrical systems shall be carried out in such a manner as not to give rise to danger."
  },
  {
    id: 3,
    question: "Which Regulation specifically covers the requirements for earthing and bonding?",
    options: [
      "Regulation 4",
      "Regulation 8",
      "Regulation 12",
      "Regulation 14"
    ],
    correctAnswer: 1,
    explanation: "Regulation 8 requires that precautions shall be taken by earthing or by other suitable means to prevent danger arising when any conductor may become charged."
  },
  {
    id: 4,
    question: "Under Regulation 12, what must be provided for every electrical system?",
    options: [
      "Automatic circuit breakers only",
      "Suitable means of cutting off the supply and isolating equipment",
      "Remote monitoring capabilities",
      "Duplicate power supplies"
    ],
    correctAnswer: 1,
    explanation: "Regulation 12 requires suitable means for cutting off the supply of electrical energy to any electrical equipment. This enables safe isolation before work begins."
  },
  {
    id: 5,
    question: "What does Regulation 13 require regarding isolation devices?",
    options: [
      "They must be painted red",
      "Precautions must be taken to prevent equipment being inadvertently re-energised",
      "They must be operated by supervisors only",
      "They must be checked monthly"
    ],
    correctAnswer: 1,
    explanation: "Regulation 13 requires that adequate precautions shall be taken to prevent equipment being electrically re-energised, such as locking off isolation devices."
  },
  {
    id: 6,
    question: "According to Regulation 14, when is live working permitted?",
    options: [
      "Never under any circumstances",
      "Whenever the work is urgent",
      "When unreasonable to work dead AND suitable precautions are taken",
      "Only on low voltage systems"
    ],
    correctAnswer: 2,
    explanation: "Regulation 14 permits live working only when it is unreasonable in all circumstances for the conductor to be dead AND suitable precautions including PPE are taken to prevent injury."
  },
  {
    id: 7,
    question: "What minimum requirement does Regulation 16 set for persons working on electrical systems?",
    options: [
      "They must hold a City & Guilds qualification",
      "They must have at least 5 years experience",
      "They must be competent or under appropriate supervision",
      "They must be over 21 years old"
    ],
    correctAnswer: 2,
    explanation: "Regulation 16 requires that persons must possess the technical knowledge and experience necessary for the work, or be under appropriate supervision by someone who does."
  },
  {
    id: 8,
    question: "Who has duties under the Electricity at Work Regulations 1989?",
    options: [
      "Employers only",
      "Employees only",
      "Employers, employees, and the self-employed",
      "Only qualified electrical engineers"
    ],
    correctAnswer: 2,
    explanation: "EAWR places duties on employers, employees, and self-employed persons. Everyone involved in work activities has legal responsibilities under these regulations."
  },
  {
    id: 9,
    question: "An electrician is pressured by a client to work on a live 400V distribution board because shutting down would affect production. What should the electrician do?",
    options: [
      "Proceed with live working as the client has requested it",
      "Refuse as live working is never permitted",
      "Assess if it is truly unreasonable to work dead and if suitable precautions can be taken",
      "Ask a colleague to do it instead"
    ],
    correctAnswer: 2,
    explanation: "Under Regulation 14, the electrician must assess whether it is genuinely unreasonable to work dead. Client pressure alone does not justify live working - proper risk assessment and suitable precautions are required."
  },
  {
    id: 10,
    question: "What does 'absolute' mean when applied to certain regulations in EAWR?",
    options: [
      "The regulation is optional",
      "The regulation can be modified by employers",
      "The regulation must be complied with regardless of reasonableness",
      "The regulation only applies to high voltage systems"
    ],
    correctAnswer: 2,
    explanation: "Absolute regulations must be complied with regardless of cost or practicability. No defence of 'reasonably practicable' is available - for example, Regulation 4(1) states systems 'shall at all times' prevent danger."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "What is the difference between 'absolute' and 'reasonably practicable' duties in EAWR?",
    answer: "Absolute duties (using words like 'shall') must be complied with regardless of cost or practicability. Duties qualified by 'so far as is reasonably practicable' allow consideration of whether precautions are reasonable given the risk and sacrifice involved."
  },
  {
    question: "Does EAWR only apply to electricians?",
    answer: "No. EAWR applies to everyone whose work involves electrical systems - this includes factory workers using electrical equipment, office workers, maintenance staff, and managers responsible for electrical systems. Duties vary depending on the person's role."
  },
  {
    question: "What constitutes 'adequate' precautions for live working under Regulation 14?",
    answer: "Adequate precautions typically include: risk assessment, insulated tools, appropriate PPE (insulated gloves, arc flash protection), barriers and screening, accompaniment by another competent person, and emergency procedures including rescue equipment."
  },
  {
    question: "How does EAWR define 'competent'?",
    answer: "Regulation 16 describes competence as possessing sufficient technical knowledge or experience to prevent danger. This varies with the complexity of the work - simple tasks require less knowledge than complex ones. Competence is demonstrated through training, qualifications, and practical experience."
  },
  {
    question: "Can apprentices work on electrical systems under EAWR?",
    answer: "Yes, but they must be under appropriate supervision by someone who is competent. The level of supervision required depends on the apprentice's stage of training and the complexity of the work being undertaken."
  },
  {
    question: "What happens if I breach EAWR?",
    answer: "Breaches of EAWR are criminal offences. Penalties include unlimited fines and up to 2 years imprisonment for serious offences. Both employers and employees can be prosecuted, and HSE can issue improvement or prohibition notices."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* MAIN ARTICLE CONTENT */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* HEADER */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electricity at Work Regulations 1989
          </h1>
          <p className="text-white/80">
            The primary legislation governing electrical safety in UK workplaces
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Reg 4:</strong> Systems must be constructed to prevent danger</li>
              <li><strong>Reg 12/13:</strong> Isolation and prevention of re-energisation</li>
              <li><strong>Reg 14:</strong> Work dead unless unreasonable, with precautions</li>
              <li><strong>Reg 16:</strong> Only competent persons or under supervision</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Missing isolation points, unlocked distribution boards, unsafe systems</li>
              <li><strong>Use:</strong> Safe isolation procedure, lock-off devices, proving dead</li>
              <li><strong>Apply:</strong> Every electrical task - from changing a socket to commissioning a distribution board</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the requirements of Regulation 4 for electrical system construction and maintenance",
              "Describe the isolation requirements under Regulations 12 and 13",
              "Understand when live working is permitted under Regulation 14",
              "Apply the competence requirements of Regulation 16",
              "Distinguish between absolute and reasonably practicable duties",
              "Recognise the duties placed on employers, employees and self-employed"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction to EAWR 1989
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Electricity at Work Regulations 1989 (EAWR) are the primary legislation governing electrical safety in UK workplaces. Made under the Health and Safety at Work Act 1974, they impose duties on employers, employees, and the self-employed to ensure electrical systems are safe and work activities do not create danger.
            </p>

            <p>
              EAWR applies to all electrical systems and equipment used in or associated with work activities. This covers everything from a simple 13A socket outlet to complex industrial distribution systems and high voltage installations. The regulations apply regardless of the voltage - even extra-low voltage systems must comply.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Principles of EAWR:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Prevention:</strong> Systems must be constructed to prevent danger from the outset</li>
                <li><strong>Maintenance:</strong> Systems must be maintained to continue preventing danger throughout their life</li>
                <li><strong>Safe Working:</strong> Work activities must be conducted safely, preferably on dead systems</li>
                <li><strong>Competence:</strong> Only competent persons may work on electrical systems</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> EAWR uses specific language to indicate the nature of duties. 'Shall' indicates an absolute duty with no defence of reasonableness. 'So far as is reasonably practicable' allows proportionate consideration of risk versus cost.
            </p>
          </div>
        </section>

        {/* CONTENT SECTION 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Regulation 4 - Systems, Work Activities and Protective Equipment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulation 4 is fundamental to electrical safety and has three parts that together create a comprehensive framework for preventing electrical danger.
            </p>

            <div className="grid sm:grid-cols-1 gap-6 my-6">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 4(1) - Construction</p>
                <p className="text-sm text-white">"All systems shall at all times be of such construction as to prevent, so far as is reasonably practicable, danger."</p>
                <p className="text-sm text-white/70 mt-2">This means electrical installations must be designed and built to prevent danger. For electricians, this requires compliance with BS 7671 (the Wiring Regulations) and appropriate selection of equipment for the environment.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 4(2) - Maintenance</p>
                <p className="text-sm text-white">"All systems shall at all times be maintained so as to prevent, so far as is reasonably practicable, danger."</p>
                <p className="text-sm text-white/70 mt-2">Maintenance includes periodic inspection and testing (EICR), routine checks, and responsive repairs. The frequency depends on the installation type and use - a construction site requires more frequent inspection than an office.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 4(3) - Work Activities</p>
                <p className="text-sm text-white">"Every work activity, including operation, use and maintenance of a system shall be carried out in such a manner as not to give rise, so far as is reasonably practicable, to danger."</p>
                <p className="text-sm text-white/70 mt-2">This covers how work is performed - using safe systems of work, appropriate tools and equipment, and following established procedures.</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Installing a new distribution board in a dusty workshop. Under 4(1), select an IP-rated enclosure suitable for the environment. Under 4(2), establish an inspection schedule. Under 4(3), follow safe isolation procedures during installation.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Regulations 12 and 13 - Isolation and Prevention of Re-energisation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulations 12 and 13 work together to enable safe working on electrical systems by requiring means of isolation and preventing inadvertent re-energisation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 12 - Means of Cutting Off Supply</p>
                <p className="text-sm text-white">"Where necessary to prevent danger, suitable means (including, where appropriate, methods of identifying circuits) shall be available for:</p>
                <ul className="text-sm text-white ml-4 mt-2">
                  <li>(a) cutting off the supply of electrical energy to any electrical equipment; and</li>
                  <li>(b) the isolation of any electrical equipment."</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 13 - Preventing Re-energisation</p>
                <p className="text-sm text-white">"Adequate precautions shall be taken to prevent electrical equipment which has been made dead from becoming electrically charged during any work activity."</p>
                <p className="text-sm text-white/70 mt-2">This is why we use lock-off devices, danger tags, and clear communication procedures.</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Safe Isolation Procedure (applying Regs 12 & 13):</p>
              <ol className="text-sm text-white space-y-1 ml-4 list-decimal list-inside">
                <li>Identify the circuit to be worked on</li>
                <li>Isolate using appropriate means (switch, circuit breaker, fuse withdrawal)</li>
                <li>Secure the isolation (lock-off, danger tag)</li>
                <li>Prove the testing device (known live source or proving unit)</li>
                <li>Test for dead at the point of work</li>
                <li>Prove the testing device again</li>
                <li>Post danger notices if required</li>
              </ol>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Isolation must be effective - simply switching off is not enough if the switch can be turned back on. Lock-off devices, keys removed, and clear identification are essential.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Regulation 14 - Working Dead and Live Working
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulation 14 establishes the fundamental principle that electrical work should be carried out on dead systems. Live working is only permitted in strictly defined circumstances.
            </p>

            <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50 my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Regulation 14 - Working on or Near Live Conductors</p>
              <p className="text-sm text-white">"No person shall be engaged in any work activity on or so near any live conductor (other than one suitably covered with insulating material so as to prevent danger) that danger may arise unless:</p>
              <ul className="text-sm text-white ml-4 mt-2">
                <li>(a) it is unreasonable in all the circumstances for it to be dead; and</li>
                <li>(b) it is reasonable in all the circumstances for him to be at work on or near it while it is live; and</li>
                <li>(c) suitable precautions (including where necessary the provision of suitable protective equipment) are taken to prevent injury."</li>
              </ul>
            </div>

            <p>
              <strong>All three conditions must be met</strong> before live working can be justified. Client pressure, convenience, or time constraints are NOT valid reasons for live working. The key test is whether it is "unreasonable in all the circumstances" for the conductor to be dead.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When might live working be justified?</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Diagnosis and testing:</strong> Fault-finding may require live measurements to locate problems</li>
                <li><strong>Essential services:</strong> Hospital life-support systems where isolation is genuinely impossible</li>
                <li><strong>Process requirements:</strong> Some commissioning activities require live testing</li>
                <li><strong>Live line working:</strong> Specialist utility work with specific procedures</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Required Precautions for Live Working:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Comprehensive risk assessment</li>
                <li>Written procedures and method statements</li>
                <li>Appropriate PPE (insulated gloves, arc flash protection, face shields)</li>
                <li>Insulated tools rated for the voltage</li>
                <li>Barriers and screening to prevent accidental contact</li>
                <li>Accompaniment by a competent person</li>
                <li>Emergency rescue equipment and procedures</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical:</strong> Even with all precautions, live working remains inherently more dangerous than dead working. The burden of proof lies with the person deciding to work live - you must be able to justify why dead working was unreasonable.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Regulation 16 - Competence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulation 16 ensures that only those with appropriate knowledge, experience, or supervision work on electrical systems.
            </p>

            <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50 my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 16 - Persons to be Competent</p>
              <p className="text-sm text-white">"No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate having regard to the nature of the work."</p>
            </div>

            <p>
              Competence is not defined by qualifications alone - it is a combination of technical knowledge, practical experience, and understanding of the hazards involved. The level of competence required depends on the complexity and risk of the work.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Elements of Competence</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Technical knowledge of electrical principles</li>
                  <li>Understanding of relevant regulations</li>
                  <li>Practical experience with similar systems</li>
                  <li>Awareness of hazards and risks</li>
                  <li>Ability to recognise limitations</li>
                  <li>Knowledge of emergency procedures</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Supervision Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Level of supervision matches competence gap</li>
                  <li>Supervisor must be competent themselves</li>
                  <li>Clear communication of expectations</li>
                  <li>Regular checking of work</li>
                  <li>Available for questions and guidance</li>
                  <li>Apprentices require close supervision</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An apprentice in their first year should not work unsupervised on any electrical system. A qualified electrician may be competent for domestic work but require supervision for industrial high-voltage systems they have not previously encountered.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 05 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* OTHER KEY REGULATIONS */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Other Key Regulations</h2>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 5 - Strength and Capability</h3>
              <p className="text-sm text-white">No electrical equipment shall be put into use where its strength and capability may be exceeded. Cables must be rated for the load, switchgear for the fault current, and equipment for the environment.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 6 - Adverse Conditions</h3>
              <p className="text-sm text-white">Electrical equipment that may be exposed to adverse or hazardous conditions shall be constructed or protected to prevent danger. Consider IP ratings for wet or dusty environments.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 7 - Insulation and Protection</h3>
              <p className="text-sm text-white">All conductors shall either be suitably insulated, or have other precautions taken to prevent danger. This includes barriers, enclosures, and safe positioning out of reach.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 8 - Earthing</h3>
              <p className="text-sm text-white">Precautions shall be taken by earthing or other suitable means to prevent danger when any conductor (other than a circuit conductor) may become charged. This is the basis for protective earthing and bonding.</p>
            </div>
          </div>
        </section>

        {/* PRACTICAL GUIDANCE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Applying EAWR on Every Job</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check the installation before starting work - is it suitable for the environment?</li>
                <li>Identify isolation points before beginning any work</li>
                <li>Follow the full safe isolation procedure - no shortcuts</li>
                <li>Ensure you are competent for the work, or seek supervision</li>
                <li>Document your work for maintenance records</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Asked to Work Live</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ask: Is it genuinely unreasonable for the circuit to be dead?</li>
                <li>Challenge: What makes dead working impossible, not just inconvenient?</li>
                <li>Assess: Are suitable precautions available and in place?</li>
                <li>Document: Record the justification and precautions in writing</li>
                <li>Refuse: If conditions cannot be met, decline the work</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common EAWR Breaches</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Failing to isolate</strong> - Working live for convenience</li>
                <li><strong>Inadequate lock-off</strong> - Relying on tape or switching without securing</li>
                <li><strong>Not proving dead</strong> - Assuming isolation was successful without testing</li>
                <li><strong>Working beyond competence</strong> - Attempting unfamiliar work without supervision</li>
                <li><strong>Poor maintenance records</strong> - Not documenting inspection and testing</li>
              </ul>
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
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* QUICK REFERENCE */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Key EAWR Regulations</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">System Requirements</p>
                <ul className="space-y-0.5">
                  <li>Reg 4 - Construction, maintenance, work activities</li>
                  <li>Reg 5 - Strength and capability</li>
                  <li>Reg 6 - Adverse conditions</li>
                  <li>Reg 7 - Insulation and protection</li>
                  <li>Reg 8 - Earthing</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Safe Working</p>
                <ul className="space-y-0.5">
                  <li>Reg 12 - Means of isolation</li>
                  <li>Reg 13 - Prevent re-energisation</li>
                  <li>Reg 14 - Work dead unless justified</li>
                  <li>Reg 16 - Competence requirement</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* NAVIGATION */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section1-3">
              Next: RIDDOR
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section1_2;
