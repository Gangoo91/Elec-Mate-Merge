import { ArrowLeft, GraduationCap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Competence and Training - HNC Module 1 Section 4.2";
const DESCRIPTION = "Master competency frameworks, training needs analysis, competence verification methods, JIB/ECS card schemes, and training record requirements for building services engineering.";

const quickCheckQuestions = [
  {
    id: "competence-definition",
    question: "Under health and safety law, what constitutes 'competence'?",
    options: [
      "Holding any relevant qualification",
      "Having sufficient training, knowledge, experience, and ability to perform tasks safely",
      "Being employed for more than two years",
      "Completing an online safety course"
    ],
    correctIndex: 1,
    explanation: "Competence is defined by the Management of Health and Safety at Work Regulations 1999 as having sufficient training and experience or knowledge and other qualities to properly undertake the task. It combines formal qualifications with practical experience and ongoing development."
  },
  {
    id: "ecs-card-purpose",
    question: "What is the primary purpose of the JIB/ECS card scheme in the electrical industry?",
    options: [
      "To provide a discount card for trade suppliers",
      "To verify and evidence competence and qualifications of electrical workers",
      "To allow access to restricted websites",
      "To replace driving licences for company vehicles"
    ],
    correctIndex: 1,
    explanation: "The Electrotechnical Certification Scheme (ECS) provides a card-based system that verifies and evidences the competence of individuals working in the electrotechnical sector. It is increasingly required for site access and demonstrates compliance with industry standards."
  },
  {
    id: "training-needs-analysis",
    question: "What is the first step in conducting a Training Needs Analysis (TNA)?",
    options: [
      "Booking training courses",
      "Identifying the gap between current competence and required competence",
      "Setting a training budget",
      "Writing training materials"
    ],
    correctIndex: 1,
    explanation: "TNA begins by identifying the gap between what workers can currently do safely and what they need to be able to do. This gap analysis considers job requirements, risk assessments, legal requirements, and individual capabilities to determine where training is needed."
  },
  {
    id: "refresher-training",
    question: "Why is refresher training necessary even for experienced workers?",
    options: [
      "It is not necessary for experienced workers",
      "To meet legal requirements only",
      "To address knowledge decay, update skills for new hazards, and reinforce safe behaviours",
      "To justify training budgets"
    ],
    correctIndex: 2,
    explanation: "Refresher training addresses the natural decay of knowledge and skills over time, ensures workers are updated on new hazards, equipment, or regulations, and reinforces safe behaviours. Even experienced workers need periodic updates to maintain competence."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under Regulation 13 of the Management of Health and Safety at Work Regulations 1999, employers must provide health and safety training:",
    options: [
      "Only when employees request it",
      "On recruitment, when exposed to new/increased risks, and as refresher training",
      "Once every five years",
      "Only after an accident has occurred"
    ],
    correctAnswer: 1,
    explanation: "Regulation 13 requires training on recruitment, when transferred or given new responsibilities, when new equipment, technology, or systems are introduced, and to refresh knowledge. Training must be adapted to take account of new or changed risks."
  },
  {
    id: 2,
    question: "What does the acronym 'KSA' stand for in competency assessment?",
    options: [
      "Key Safety Actions",
      "Knowledge, Skills, and Attitudes",
      "Known Safety Attributes",
      "Keeping Sites Accessible"
    ],
    correctAnswer: 1,
    explanation: "KSA stands for Knowledge (what they understand), Skills (what they can do), and Attitudes (how they approach safety). Effective competence assessment evaluates all three elements, as knowledge without the right attitude may still lead to unsafe behaviour."
  },
  {
    id: 3,
    question: "Which ECS card level is appropriate for a qualified electrician who has completed an approved apprenticeship and holds AM2 certification?",
    options: [
      "Trainee card",
      "Provisional card",
      "Installation Electrician JIB-registered Gold card",
      "Labourer card"
    ],
    correctAnswer: 2,
    explanation: "The JIB Gold card for Installation Electrician is issued to those who have completed an approved apprenticeship including the AM2 assessment, demonstrating full competence as a skilled electrician. This is the standard card for qualified installation electricians."
  },
  {
    id: 4,
    question: "What is the typical validity period for most ECS cards?",
    options: [
      "1 year",
      "3 years",
      "5 years",
      "10 years"
    ],
    correctAnswer: 2,
    explanation: "Most ECS cards are valid for 5 years, after which the holder must demonstrate continuing competence through relevant work experience, CPD, or additional training to renew. This ensures ongoing competence verification rather than a one-time assessment."
  },
  {
    id: 5,
    question: "A competent person under the Electricity at Work Regulations must:",
    options: [
      "Have any electrical qualification",
      "Have technical knowledge and experience to prevent danger and recognise risk",
      "Hold only a university degree in electrical engineering",
      "Be employed by the electricity supplier"
    ],
    correctAnswer: 1,
    explanation: "The Electricity at Work Regulations require persons to have 'technical knowledge or experience' to prevent danger. This is task-specific - someone competent for one task may not be competent for another. Both theoretical knowledge and practical experience are considered."
  },
  {
    id: 6,
    question: "Which of the following is NOT a valid method for verifying competence?",
    options: [
      "Practical assessment of skills",
      "Review of qualifications and training certificates",
      "Self-declaration without evidence",
      "Observation of work performance"
    ],
    correctAnswer: 2,
    explanation: "Self-declaration without supporting evidence is not a valid competence verification method. While self-assessment can be part of the process, it must be supported by objective evidence such as qualifications, observed performance, practical assessments, or verified experience."
  },
  {
    id: 7,
    question: "Training records should be retained for:",
    options: [
      "Only during the employee's period of employment",
      "The period of employment plus a reasonable period after (typically 3-6 years)",
      "1 year only",
      "Training records do not need to be kept"
    ],
    correctAnswer: 1,
    explanation: "Training records should be retained during employment and for a reasonable period after (often 3-6 years or longer for specific risks). They provide evidence of compliance, support civil claims defence, and may be needed for incident investigations long after the event."
  },
  {
    id: 8,
    question: "What is the Kirkpatrick Model used for?",
    options: [
      "Risk assessment",
      "Incident investigation",
      "Evaluating training effectiveness at four levels",
      "Cable sizing calculations"
    ],
    correctAnswer: 2,
    explanation: "The Kirkpatrick Model evaluates training effectiveness at four levels: (1) Reaction - did trainees enjoy it? (2) Learning - did they gain knowledge? (3) Behaviour - are they applying it? (4) Results - has it improved safety outcomes? This helps ensure training achieves its objectives."
  },
  {
    id: 9,
    question: "An electrical contractor assigns a worker to install three-phase equipment. The worker holds ECS qualifications but has only worked on single-phase domestic installations. What should the contractor do?",
    options: [
      "Allow the work as the ECS card is valid",
      "Assess competence specifically for three-phase work and provide additional training if needed",
      "Ask the worker if they feel confident",
      "Nothing - qualifications cover all electrical work"
    ],
    correctAnswer: 1,
    explanation: "Competence is task-specific, not a general attribute. Holding qualifications for one type of work does not automatically mean competence for different or more complex work. The contractor must assess whether the worker has the specific competence for three-phase work."
  },
  {
    id: 10,
    question: "Under the Construction (Design and Management) Regulations 2015, what duty do principal contractors have regarding competence?",
    options: [
      "No specific duties regarding competence",
      "Only to employ the cheapest contractors",
      "To take reasonable steps to ensure workers have the skills, knowledge, and training for the work",
      "To provide all training themselves"
    ],
    correctAnswer: 2,
    explanation: "CDM 2015 requires principal contractors to take reasonable steps to ensure that workers have the necessary skills, knowledge, training, and experience for the work. This includes checking contractor competence and ensuring appropriate supervision is provided."
  }
];

const faqs = [
  {
    question: "What is the difference between training and competence?",
    answer: "Training is the process of acquiring knowledge and skills through instruction, practice, or experience. Competence is the outcome - the demonstrated ability to apply that knowledge and those skills effectively and safely in the workplace. Training contributes to competence, but competence also requires experience, appropriate attitude, and the ability to apply learning in real situations."
  },
  {
    question: "Who is responsible for ensuring worker competence?",
    answer: "Employers have the primary legal duty to ensure worker competence under the Management Regulations and HASAWA. However, employees also have duties to apply their training and not undertake work beyond their competence. Principal contractors under CDM have duties to verify the competence of those they engage. Individuals have personal responsibility to maintain and develop their competence."
  },
  {
    question: "Can competence be transferred between different types of work?",
    answer: "Competence is largely task-specific. While some underlying knowledge transfers (e.g., electrical principles), competence for one type of work does not automatically mean competence for another. A domestic electrician is not necessarily competent for industrial installations without additional training and supervised experience specific to that environment."
  },
  {
    question: "What should happen if a worker is found to be incompetent?",
    answer: "The worker should immediately be prevented from continuing work that exceeds their competence. The employer should then assess the gap between current competence and requirements, provide appropriate training and supervised practice, verify competence before allowing independent work, and document the process. Incompetence itself is not grounds for dismissal if the employer can provide training."
  },
  {
    question: "How often should competence be reassessed?",
    answer: "There is no fixed legal interval, but good practice suggests: on introduction of new equipment, systems, or regulations; after incidents suggesting competence gaps; at regular intervals (often aligned with ECS card renewal every 5 years); when taking on new or expanded responsibilities; and following extended absence from work."
  },
  {
    question: "What is the Health and Safety Executive's view on competence?",
    answer: "The HSE emphasises that competence is about capability and reliability to do work safely, not just holding qualifications. They state that no one is competent for all tasks, competence must be matched to the work, and organisations should have systems to verify competence. The HSE provides sector-specific guidance on competence requirements for high-risk activities."
  }
];

const HNCModule1Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <GraduationCap className="h-4 w-4" />
            <span>Module 1.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Competence and Training
          </h1>
          <p className="text-white/80">
            Establishing, verifying, and maintaining workforce competence in building services engineering
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Competence:</strong> Training + Experience + Knowledge + Ability</li>
              <li className="pl-1"><strong>Legal duty:</strong> Employers must ensure competent workers</li>
              <li className="pl-1"><strong>Task-specific:</strong> Competence for one job differs from another</li>
              <li className="pl-1"><strong>Verification:</strong> Qualifications, observation, assessment</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>ECS cards:</strong> Industry competence verification scheme</li>
              <li className="pl-1"><strong>AM2 assessment:</strong> Practical skills verification</li>
              <li className="pl-1"><strong>BS 7671:</strong> Requires competent persons for electrical work</li>
              <li className="pl-1"><strong>Regulation 16:</strong> Electricity at Work competence duty</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define competence and its legal requirements under health and safety law",
              "Conduct a Training Needs Analysis to identify competence gaps",
              "Apply appropriate methods for verifying worker competence",
              "Explain the JIB/ECS card scheme and qualification requirements",
              "Maintain effective training records to demonstrate compliance",
              "Evaluate training effectiveness using recognised frameworks"
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

        {/* Section 1: Understanding Competence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Competence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Competence is central to workplace health and safety. The law requires that work be carried out
              by competent persons, but competence is not simply about holding qualifications - it encompasses
              a combination of training, experience, knowledge, and personal qualities.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Legal Definition of Competence</p>
              <p className="text-sm text-white/90 italic mb-3">
                "A competent person is someone who has sufficient training and experience or knowledge and other
                qualities that allow them to assist you properly."
              </p>
              <p className="text-xs text-white/70">— Management of Health and Safety at Work Regulations 1999</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Components of Competence</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow mb-2">Knowledge</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Understanding of relevant hazards and risks</li>
                    <li className="pl-1">Knowledge of legal requirements and standards</li>
                    <li className="pl-1">Technical knowledge of systems and equipment</li>
                    <li className="pl-1">Awareness of safe working procedures</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow mb-2">Skills</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Practical ability to perform tasks safely</li>
                    <li className="pl-1">Use of tools and equipment correctly</li>
                    <li className="pl-1">Application of inspection and testing procedures</li>
                    <li className="pl-1">Problem-solving and decision-making ability</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow mb-2">Attitude</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Commitment to working safely</li>
                    <li className="pl-1">Willingness to follow procedures</li>
                    <li className="pl-1">Recognition of limitations</li>
                    <li className="pl-1">Willingness to seek help when needed</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow mb-2">Experience</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Practical exposure to real work situations</li>
                    <li className="pl-1">Supervised practice building confidence</li>
                    <li className="pl-1">Exposure to different scenarios and problems</li>
                    <li className="pl-1">Learning from mistakes in safe environment</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">Task-Specific Competence</p>
              <p className="text-sm text-white/90">
                Competence is task-specific, not a general attribute. An electrician competent to install
                domestic wiring may not be competent for industrial three-phase systems, high voltage work,
                or hazardous area installations. Each new type of work requires specific assessment and
                potentially additional training.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Nobody is competent for all tasks - competence must be matched to the specific work being undertaken.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Training Needs Analysis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Training Needs Analysis (TNA)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Training Needs Analysis is a systematic process for identifying the gap between current workforce
              competence and required competence. It ensures training resources are targeted where they will
              have most impact on health and safety performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">TNA Process Steps</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Job analysis</td>
                      <td className="border border-white/10 px-3 py-2">Identify tasks, hazards, and competence requirements</td>
                      <td className="border border-white/10 px-3 py-2">Job competence profile</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Current assessment</td>
                      <td className="border border-white/10 px-3 py-2">Evaluate workers' current knowledge, skills, experience</td>
                      <td className="border border-white/10 px-3 py-2">Individual competence profiles</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Gap analysis</td>
                      <td className="border border-white/10 px-3 py-2">Compare required vs. actual competence</td>
                      <td className="border border-white/10 px-3 py-2">Training needs identified</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Prioritisation</td>
                      <td className="border border-white/10 px-3 py-2">Rank needs by risk, legal requirement, urgency</td>
                      <td className="border border-white/10 px-3 py-2">Priority training list</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5. Training plan</td>
                      <td className="border border-white/10 px-3 py-2">Determine training methods, resources, schedule</td>
                      <td className="border border-white/10 px-3 py-2">Training programme</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Triggers for Training</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>New starters:</strong> Induction and job-specific training</li>
                  <li className="pl-1"><strong>New equipment:</strong> Operating procedures and hazards</li>
                  <li className="pl-1"><strong>Changed regulations:</strong> Updated legal requirements</li>
                  <li className="pl-1"><strong>Incidents:</strong> Lessons learned, corrective training</li>
                  <li className="pl-1"><strong>Role changes:</strong> New responsibilities or tasks</li>
                  <li className="pl-1"><strong>Refresher:</strong> Periodic knowledge update</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Training Methods</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Classroom:</strong> Theory, regulations, procedures</li>
                  <li className="pl-1"><strong>Practical:</strong> Hands-on skills development</li>
                  <li className="pl-1"><strong>On-the-job:</strong> Supervised work experience</li>
                  <li className="pl-1"><strong>E-learning:</strong> Flexible self-paced modules</li>
                  <li className="pl-1"><strong>Toolbox talks:</strong> Short, focused safety briefings</li>
                  <li className="pl-1"><strong>Simulation:</strong> Practice without real risks</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Legal Training Requirements (Regulation 13)</p>
              <p className="text-sm text-white/90 mb-3">
                The Management of Health and Safety at Work Regulations 1999 require training to be provided:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">On being recruited into the employer's undertaking</li>
                <li className="pl-1">On being exposed to new or increased risks due to transfer, change of responsibilities, introduction of new equipment, new technology, or new systems of work</li>
                <li className="pl-1">Training must be repeated periodically as appropriate</li>
                <li className="pl-1">Training must be adapted to take account of new or changed risks</li>
                <li className="pl-1">Training must take place during working hours</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Record keeping:</strong> Document training provided, attendees, content covered, assessments completed, and trainer details for compliance evidence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 3: JIB/ECS Card Scheme */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            JIB/ECS Card Scheme and Qualification Framework
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Electrotechnical Certification Scheme (ECS) is managed by the Joint Industry Board (JIB) and
              provides industry-recognised cards that verify the competence and qualifications of electrical
              workers. The scheme is increasingly required for site access across the construction industry.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ECS Card Types and Grades</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Card Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Colour</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Holder Profile</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Apprentice</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Red</td>
                      <td className="border border-white/10 px-3 py-2">Registered apprentice</td>
                      <td className="border border-white/10 px-3 py-2">JIB registered apprenticeship</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Trainee</td>
                      <td className="border border-white/10 px-3 py-2 text-amber-400">Amber</td>
                      <td className="border border-white/10 px-3 py-2">Training towards qualification</td>
                      <td className="border border-white/10 px-3 py-2">Enrolled on approved course</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Provisional</td>
                      <td className="border border-white/10 px-3 py-2 text-amber-400">Amber</td>
                      <td className="border border-white/10 px-3 py-2">NVQ Level 3 but no AM2</td>
                      <td className="border border-white/10 px-3 py-2">Working towards AM2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">Installation Electrician</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Gold</td>
                      <td className="border border-white/10 px-3 py-2">Qualified installation electrician</td>
                      <td className="border border-white/10 px-3 py-2">NVQ L3 + AM2 + H&S test</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-bold">Approved Electrician</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Gold</td>
                      <td className="border border-white/10 px-3 py-2">Experienced installation electrician</td>
                      <td className="border border-white/10 px-3 py-2">As above + experience + assessment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Technician</td>
                      <td className="border border-white/10 px-3 py-2 text-blue-400">Blue</td>
                      <td className="border border-white/10 px-3 py-2">Technical/supervisory role</td>
                      <td className="border border-white/10 px-3 py-2">HNC/HND or equivalent + experience</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Experienced Worker</td>
                      <td className="border border-white/10 px-3 py-2 text-gray-400">Grey</td>
                      <td className="border border-white/10 px-3 py-2">Significant industry experience</td>
                      <td className="border border-white/10 px-3 py-2">Employer letter + H&S test</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">AM2 Assessment</p>
              <p className="text-sm text-white/90 mb-3">
                The AM2 (Achievement Measurement 2) is a practical end-point assessment for electrical apprentices that tests:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Safe isolation procedures</li>
                  <li className="pl-1">Installation of wiring systems</li>
                  <li className="pl-1">Inspection and testing</li>
                  <li className="pl-1">Fault diagnosis</li>
                </ul>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Completion of documentation</li>
                  <li className="pl-1">Cable selection and sizing</li>
                  <li className="pl-1">Earthing and bonding</li>
                  <li className="pl-1">Professional behaviours</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Health and Safety Assessment</p>
              <p className="text-sm text-white/90 mb-3">
                All ECS card holders must pass the CSCS Health, Safety and Environment test appropriate to their occupation:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Tests are occupation-specific (e.g., Electrician test for electricians)</li>
                <li className="pl-1">Valid for 2 years at the time of card application</li>
                <li className="pl-1">Multiple choice questions covering site safety, hazard awareness, legal requirements</li>
                <li className="pl-1">Must be passed at approved test centres</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">Card Validity and Renewal</p>
              <p className="text-sm text-white/90">
                Most ECS cards are valid for <strong>5 years</strong>. To renew, cardholders must demonstrate
                continuing competence through relevant work experience and CPD activity. Evidence of ongoing
                training, additional qualifications, and up-to-date health and safety awareness is required.
                The H&S test must also be current at the time of renewal.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Site access:</strong> Many construction sites now require valid ECS cards for all electrical workers as evidence of competence and safety awareness.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Competence Verification and Records */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Competence Verification and Training Records
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Verifying competence requires objective evidence that workers have the necessary knowledge, skills,
              and experience for their work. Training records provide essential evidence of compliance with legal
              duties and support defence in any subsequent proceedings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Methods for Verifying Competence</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What It Verifies</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Limitations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Qualification check</td>
                      <td className="border border-white/10 px-3 py-2">Formal knowledge and training completed</td>
                      <td className="border border-white/10 px-3 py-2">Does not verify current skills</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ECS card verification</td>
                      <td className="border border-white/10 px-3 py-2">Industry-recognised competence level</td>
                      <td className="border border-white/10 px-3 py-2">Task-specific competence still needed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Practical assessment</td>
                      <td className="border border-white/10 px-3 py-2">Ability to perform specific tasks</td>
                      <td className="border border-white/10 px-3 py-2">Time-consuming, requires assessor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Work observation</td>
                      <td className="border border-white/10 px-3 py-2">Real-world performance and behaviour</td>
                      <td className="border border-white/10 px-3 py-2">May modify behaviour when observed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Knowledge testing</td>
                      <td className="border border-white/10 px-3 py-2">Understanding of procedures and hazards</td>
                      <td className="border border-white/10 px-3 py-2">Does not verify practical ability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reference/experience check</td>
                      <td className="border border-white/10 px-3 py-2">Previous work history and performance</td>
                      <td className="border border-white/10 px-3 py-2">Relies on third-party accuracy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Evaluating Training Effectiveness - Kirkpatrick Model</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Level 1: Reaction</p>
                  <p className="text-xs text-white/90">Did trainees find the training engaging and relevant?</p>
                  <p className="text-xs text-white/60 mt-1">Method: Feedback forms, verbal feedback</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Level 2: Learning</p>
                  <p className="text-xs text-white/90">Did trainees gain the intended knowledge and skills?</p>
                  <p className="text-xs text-white/60 mt-1">Method: Tests, demonstrations, assessments</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Level 3: Behaviour</p>
                  <p className="text-xs text-white/90">Are trainees applying learning in their work?</p>
                  <p className="text-xs text-white/60 mt-1">Method: Observation, supervisor feedback</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Level 4: Results</p>
                  <p className="text-xs text-white/90">Has training improved safety outcomes?</p>
                  <p className="text-xs text-white/60 mt-1">Method: Incident rates, audit findings</p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Training Record Requirements</p>
              <p className="text-sm text-white/90 mb-3">
                Effective training records should capture:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Employee name and identification</li>
                  <li className="pl-1">Training title and content covered</li>
                  <li className="pl-1">Date, duration, and location</li>
                  <li className="pl-1">Trainer name and qualifications</li>
                </ul>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Assessment results if applicable</li>
                  <li className="pl-1">Competence declaration signed</li>
                  <li className="pl-1">Certificates or qualifications awarded</li>
                  <li className="pl-1">Refresher/renewal dates due</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">Record Retention</p>
              <p className="text-sm text-white/90">
                Training records should be retained for the duration of employment plus a reasonable period after
                (typically 3-6 years, longer for exposure to hazardous substances). Records may be needed for:
                incident investigations, civil claims, regulatory inspections, demonstrating compliance, and
                defending legal proceedings - all of which may arise years after the training occurred.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Digital records:</strong> Electronic training management systems can track competence, flag renewal dates, and generate compliance reports - but must be backed up and accessible.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building a Competence Management System</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Define roles:</strong> Create competence profiles for each job role</li>
                <li className="pl-1"><strong>Assess gaps:</strong> Compare individual competence against role requirements</li>
                <li className="pl-1"><strong>Plan training:</strong> Prioritise training based on risk and legal requirements</li>
                <li className="pl-1"><strong>Verify competence:</strong> Use appropriate methods to confirm capability</li>
                <li className="pl-1"><strong>Document:</strong> Maintain comprehensive training and competence records</li>
                <li className="pl-1"><strong>Review:</strong> Regularly reassess competence and update training</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Supervision Requirements</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Workers developing competence must be supervised by competent persons</li>
                <li className="pl-1">Level of supervision must match the risk and the trainee's current competence</li>
                <li className="pl-1">Supervision can reduce as competence increases, documented by assessment</li>
                <li className="pl-1">Higher-risk tasks require closer supervision regardless of experience</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Competence Failures</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Assumption of competence:</strong> Relying on job title without verification</li>
                <li className="pl-1"><strong>One-time assessment:</strong> Not reassessing when roles or risks change</li>
                <li className="pl-1"><strong>Paper compliance:</strong> Records exist but competence not actually verified</li>
                <li className="pl-1"><strong>Generic training:</strong> Not tailored to specific workplace risks</li>
                <li className="pl-1"><strong>No refresher:</strong> Allowing skills and knowledge to become outdated</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Competence Components (KSA+E)</p>
                <ul className="space-y-0.5">
                  <li>Knowledge - Understanding of hazards and procedures</li>
                  <li>Skills - Practical ability to perform tasks</li>
                  <li>Attitudes - Commitment to safe working</li>
                  <li>Experience - Supervised practice in real situations</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key ECS Cards</p>
                <ul className="space-y-0.5">
                  <li>Apprentice (Red) - Registered apprentice</li>
                  <li>Installation Electrician (Gold) - NVQ3 + AM2</li>
                  <li>Approved Electrician (Gold) - Plus experience</li>
                  <li>Technician (Blue) - HNC/HND level</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Duty of Care
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section4-3">
              Next: Safety Representatives
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section4_2;
