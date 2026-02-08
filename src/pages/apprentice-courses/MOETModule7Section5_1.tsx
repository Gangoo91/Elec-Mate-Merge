import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Employer and Training Provider Sign-Off - MOET Module 7 Section 5.1";
const DESCRIPTION = "Understanding the employer and training provider sign-off process before EPA gateway: what needs to be confirmed, the tripartite review process, resolving outstanding issues and ensuring readiness for end-point assessment under ST1426.";

const quickCheckQuestions = [
  {
    id: "signoff-purpose",
    question: "What is the purpose of employer and training provider sign-off before the EPA?",
    options: [
      "It is just a formality",
      "Both parties must confirm that you have completed all required on-programme learning, achieved the required standards of competence, and are ready to proceed to end-point assessment — this protects you from being assessed before you are prepared",
      "Only the employer needs to sign off",
      "Sign-off is optional"
    ],
    correctIndex: 1,
    explanation: "Sign-off is a genuine quality gate, not a rubber stamp. Both the employer and training provider must confirm you have completed all required learning, demonstrated the required competences, and are genuinely ready for assessment. This protects you from being entered for EPA before you are prepared, which could result in failure."
  },
  {
    id: "signoff-tripartite",
    question: "What is a tripartite review in the context of EPA readiness?",
    options: [
      "A review conducted by three external assessors",
      "A meeting between you, your employer and your training provider to review your progress, confirm readiness for EPA, agree any final actions, and formally authorise progression to the gateway",
      "A review of three pieces of evidence",
      "A three-hour assessment"
    ],
    correctIndex: 1,
    explanation: "The tripartite review brings all three parties together: you (the apprentice), your employer, and your training provider. It is where your progress is assessed, any concerns are raised, final actions are agreed, and the formal decision to proceed to EPA gateway is made. All three parties must agree you are ready."
  },
  {
    id: "signoff-issues",
    question: "If there are outstanding issues identified during the sign-off review, what should happen?",
    options: [
      "Proceed to EPA anyway",
      "An action plan should be agreed with specific tasks, responsibilities and deadlines to resolve the issues before the EPA gateway is opened — no one should be pushed through the gateway with unresolved concerns",
      "Cancel the apprenticeship",
      "The training provider should fix everything without your involvement"
    ],
    correctIndex: 1,
    explanation: "Outstanding issues must be resolved before progressing to EPA. An action plan should specify: what needs to be done (e.g., additional evidence, further training, more workplace experience), who is responsible, and when it will be completed. Rushing through the gateway with unresolved issues risks EPA failure — it is better to delay slightly and be properly prepared."
  },
  {
    id: "signoff-role",
    question: "What is your role as the apprentice in the sign-off process?",
    options: [
      "You have no role — just wait for others to decide",
      "Actively ensure your portfolio is complete and well-organised, confirm all required qualifications are achieved, honestly assess your own readiness, and raise any concerns about areas where you feel underprepared",
      "Just sign the paperwork when asked",
      "Only attend if specifically invited"
    ],
    correctIndex: 1,
    explanation: "You are an active and equal participant in the sign-off process. Ensure your portfolio is ready, confirm qualifications are complete, honestly assess your own readiness (are there areas you feel weak on?), and raise any concerns. It is better to ask for more preparation time than to enter the EPA unprepared. Your honesty at this stage protects you."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Before entering the EPA gateway, sign-off is required from:",
    options: [
      "Only the training provider",
      "Both the employer and the training provider, confirming the apprentice has met all on-programme requirements and is ready for end-point assessment",
      "Only the apprentice",
      "The EPAO directly"
    ],
    correctAnswer: 1,
    explanation: "Both the employer and training provider must sign off. The employer confirms you have demonstrated competence in the workplace and completed required workplace activities. The training provider confirms you have achieved the required qualifications and completed the training programme. Both signatures are required before the gateway can be opened."
  },
  {
    id: 2,
    question: "The employer's sign-off specifically confirms:",
    options: [
      "Only that you have attended work regularly",
      "That you have completed sufficient workplace experience, demonstrated the required knowledge, skills and behaviours in practice, and in their judgement are ready to be assessed against the standard",
      "That you are a good employee",
      "Only that your attendance record is acceptable"
    ],
    correctAnswer: 1,
    explanation: "The employer's sign-off is a substantive confirmation of workplace competence: you have completed sufficient and varied experience, demonstrated KSBs in real work situations, and shown readiness for independent assessment. This is based on their observation of your work, supervisor feedback, and review of your workplace evidence."
  },
  {
    id: 3,
    question: "The training provider's sign-off specifically confirms:",
    options: [
      "Only that you attended classes",
      "That you have completed all required on-programme qualifications, achieved the learning outcomes, built a portfolio that meets the minimum requirements, and are educationally ready for the EPA",
      "That your tuition fees are paid",
      "Only that you passed the mock assessments"
    ],
    correctAnswer: 1,
    explanation: "The training provider confirms the educational side: all required qualifications completed (e.g., Level 3 Diploma), learning outcomes achieved, portfolio evidence sufficient, and educational readiness for the EPA. They may also confirm that English and maths requirements have been met."
  },
  {
    id: 4,
    question: "English and maths requirements for EPA gateway typically require:",
    options: [
      "No English or maths qualifications",
      "Achievement of Level 2 English and maths (or Functional Skills equivalents) as a minimum before the EPA gateway can be opened",
      "A degree in mathematics",
      "Only Level 1 is needed"
    ],
    correctAnswer: 1,
    explanation: "Most apprenticeship standards, including ST1426, require Level 2 English and maths (GCSE grade 4/C or Functional Skills Level 2) before the EPA gateway. If you have not yet achieved these, they must be completed before sign-off. Check the specific requirements with your training provider — some standards have different requirements."
  },
  {
    id: 5,
    question: "A tripartite review should take place:",
    options: [
      "Only at the very end of the apprenticeship",
      "At regular intervals throughout the apprenticeship, with a formal final review before the EPA gateway decision — typically at least quarterly throughout and a dedicated gateway readiness review 2-3 months before the planned EPA date",
      "Only once",
      "It is not required for the MOET standard"
    ],
    correctAnswer: 1,
    explanation: "Regular tripartite reviews (at least quarterly) ensure everyone is aligned on progress and any issues are identified early. The final gateway review, typically 2-3 months before the planned EPA, is where the formal sign-off decision is made. Regular reviews mean there should be no surprises at this stage."
  },
  {
    id: 6,
    question: "If the employer wants to push you through the gateway but the training provider has concerns, the correct outcome is:",
    options: [
      "The employer's view takes priority",
      "The concerns must be addressed before sign-off — both parties must agree the apprentice is ready, and any genuine concerns should result in an action plan to achieve readiness before proceeding",
      "The training provider's view is overruled",
      "You should contact the EPAO directly"
    ],
    correctAnswer: 1,
    explanation: "Both signatures are required — neither party can override the other. If there is disagreement, the concerns must be discussed openly and resolved. Usually this means identifying specific actions to address the training provider's concerns. Proceeding without genuine agreement from both parties puts the apprentice at risk of failure."
  },
  {
    id: 7,
    question: "Your role in the sign-off process includes:",
    options: [
      "Passively waiting for others to decide",
      "Actively ensuring your portfolio is complete, your evidence is well-organised, any required qualifications are completed, and you honestly assess your own readiness — raising any concerns you have about specific areas",
      "You have no role — it is between the employer and provider",
      "Only signing the paperwork"
    ],
    correctAnswer: 1,
    explanation: "You are an active participant in the sign-off process: ensure your portfolio is ready, confirm all qualifications are completed, honestly assess your own readiness (are there areas you feel weak on?), and raise any concerns. It is better to ask for more preparation time than to enter the EPA unprepared."
  },
  {
    id: 8,
    question: "If you do not feel ready for the EPA but your employer and provider want to proceed, you should:",
    options: [
      "Just go along with it",
      "Express your concerns clearly and specifically — identify the areas you feel underprepared in and request additional support or time to address them before the gateway is opened",
      "Refuse to attend the EPA",
      "Accept their judgement without question"
    ],
    correctAnswer: 1,
    explanation: "Your concerns are valid and should be heard. Express them specifically: 'I do not feel confident about my control systems knowledge' or 'I have not had enough experience of commissioning activities.' This is not weakness — it is professional self-awareness. Your employer and provider can then address these specific concerns through targeted support or additional experience."
  },
  {
    id: 9,
    question: "The sign-off documentation typically includes:",
    options: [
      "Just a verbal agreement",
      "Written confirmation from both employer and training provider, a record of the gateway readiness review, evidence that all pre-requisites are met (qualifications, portfolio, off-the-job training hours), and formal agreement to proceed",
      "Only an email",
      "No documentation is required"
    ],
    correctAnswer: 1,
    explanation: "The sign-off should be formally documented: written declarations from both employer and training provider, minutes or record of the gateway review meeting, confirmation that all pre-requisites are met, and formal authorisation to proceed. This paperwork is submitted to the EPAO as part of the gateway process."
  },
  {
    id: 10,
    question: "Off-the-job training hours must be completed before sign-off because:",
    options: [
      "They are not important",
      "The apprenticeship funding rules require a minimum of 20% off-the-job training, and the ESFA (Education and Skills Funding Agency) requires evidence that this has been met before the EPA can proceed",
      "Only some apprenticeships require off-the-job training",
      "The hours can be made up after the EPA"
    ],
    correctAnswer: 1,
    explanation: "Off-the-job training is a mandatory component of all apprenticeships. You must have completed the required hours (typically 20% of your working hours) before the gateway. Both you and your employer must have records of these hours. Any shortfall must be addressed before sign-off — it cannot be retrospectively completed after the EPA."
  },
  {
    id: 11,
    question: "After sign-off is completed, the next step is:",
    options: [
      "The EPA happens immediately",
      "The gateway is formally opened with the EPAO, who will then schedule the EPA components within the timeframe specified in the assessment plan — there is typically a period between gateway and EPA for final preparation",
      "Nothing — sign-off is the final step",
      "You go straight to the professional discussion"
    ],
    correctAnswer: 1,
    explanation: "After sign-off, the gateway paperwork is submitted to the EPAO. The EPAO confirms everything is in order and schedules the EPA components. There is typically a window of 2-4 weeks between gateway opening and the first EPA component, which should be used for final revision and preparation. The assessment plan specifies the timeframe."
  },
  {
    id: 12,
    question: "A common reason for gateway sign-off being delayed is:",
    options: [
      "The apprentice is too well-prepared",
      "Outstanding qualification certificates not yet received from the awarding body, incomplete portfolio evidence, or off-the-job training hours not yet reaching the required minimum — all of which must be resolved before the gateway can proceed",
      "The EPAO refuses all applications",
      "Delays never happen in practice"
    ],
    correctAnswer: 1,
    explanation: "The most common delays are administrative: awaiting qualification certificates (which can take weeks to process), portfolio evidence gaps that need additional workplace activities to fill, and off-the-job training hour shortfalls. Planning ahead — requesting certificates early, building your portfolio continuously, and tracking training hours throughout — prevents most of these delays."
  }
];

const faqs = [
  {
    question: "When should I start preparing for the sign-off review?",
    answer: "Preparation should be ongoing throughout the apprenticeship — regular portfolio building, evidence gathering, and qualification completion. However, you should start specifically preparing for the gateway review at least 3 months before your planned EPA date. This gives time to identify and address any gaps. Your training provider should be guiding you on timeline and readiness."
  },
  {
    question: "What happens if I fail to meet the gateway requirements by the planned date?",
    answer: "The EPA is delayed until the requirements are met. This is not unusual and is far better than entering the EPA unprepared. Discuss the situation with your employer and training provider, agree a revised timeline, and focus on addressing the outstanding requirements. A short delay with a successful EPA outcome is much better than an on-time EPA that results in failure."
  },
  {
    question: "Can the employer refuse to sign off for reasons unrelated to my competence?",
    answer: "The sign-off should be based purely on your competence and readiness, not on business preferences (e.g., wanting to keep you as a lower-cost apprentice for longer). If you believe the refusal is unjustified, discuss it with your training provider. They can mediate and ensure the decision is based on genuine competence assessment."
  },
  {
    question: "Do I need to have completed all my off-the-job training hours before sign-off?",
    answer: "Yes. The minimum off-the-job training requirement (typically 20% of your working hours over the apprenticeship) must be evidenced before the gateway. If there is a shortfall, your employer and training provider should agree a plan to complete the remaining hours before the gateway review."
  },
  {
    question: "What qualifications need to be completed before gateway?",
    answer: "For the ST1426 MOET standard, you typically need your Level 3 Diploma (or equivalent), Level 2 English and maths (if not already held), and any other mandatory qualifications specified in the assessment plan. Check the specific requirements with your training provider — they will confirm exactly what is needed for your EPAO."
  }
];

const MOETModule7Section5_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 7.5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Employer and Training Provider Sign-Off
          </h1>
          <p className="text-white/80">
            Understanding the gateway approval process and ensuring you are ready for end-point assessment
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Both parties:</strong> Employer AND training provider must sign off</li>
              <li className="pl-1"><strong>Confirms:</strong> Competence, qualifications, portfolio completeness</li>
              <li className="pl-1"><strong>Tripartite:</strong> You, employer and provider review together</li>
              <li className="pl-1"><strong>Pre-requisites:</strong> Level 2 English, maths, off-the-job hours</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">EPA Assessment Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Gateway:</strong> Sign-off opens the door to EPA scheduling</li>
              <li className="pl-1"><strong>Quality gate:</strong> Ensures you are not assessed prematurely</li>
              <li className="pl-1"><strong>Preparation time:</strong> Typically 2-4 weeks between gateway and EPA</li>
              <li className="pl-1"><strong>ST1426:</strong> Mandatory step before any EPA component</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the purpose and process of employer and training provider sign-off",
              "Know what pre-requisites must be completed before the gateway can be opened",
              "Prepare effectively for the tripartite gateway readiness review",
              "Resolve outstanding issues identified during the sign-off process",
              "Understand your rights and responsibilities in the gateway decision",
              "Know what happens after sign-off and how the EPA is then scheduled"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Sign-Off Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The sign-off process is the formal mechanism that confirms you have completed all on-programme
              requirements and are ready for end-point assessment. It is a quality gate — designed to protect
              you from being assessed before you are genuinely prepared. Both your employer and training
              provider must independently confirm your readiness.
            </p>

            <p>
              This dual sign-off requirement exists because the employer and training provider have different
              perspectives on your readiness. The employer sees your workplace competence — how you perform
              on real tasks, your professional behaviours in practice, and your ability to work independently.
              The training provider sees your academic achievement — qualifications completed, knowledge
              demonstrated, and portfolio evidence assembled.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What Must Be Confirmed</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Qualifications:</strong> Level 3 Diploma (or equivalent) completed and passed</li>
                <li className="pl-1"><strong>English and maths:</strong> Level 2 achieved (GCSE grade 4/C or Functional Skills Level 2)</li>
                <li className="pl-1"><strong>Off-the-job training:</strong> Minimum 20% hours completed and evidenced</li>
                <li className="pl-1"><strong>Portfolio:</strong> Work-based evidence portfolio meets minimum requirements</li>
                <li className="pl-1"><strong>Workplace competence:</strong> Employer confirms demonstration of required KSBs</li>
                <li className="pl-1"><strong>Readiness:</strong> Genuine professional judgement that the apprentice is ready for assessment</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Sign-Off Is Not a Rubber Stamp</p>
              <p className="text-sm text-white">
                The sign-off should involve genuine assessment of readiness, not just checking boxes. If either
                party has concerns about your readiness, these should be discussed openly and addressed before
                proceeding. Being entered for EPA before you are ready is one of the most common causes of
                failure — a short delay for additional preparation is far better than a failed attempt.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The sign-off protects you. It ensures you are not assessed before you
              are ready and confirms that everyone — you, your employer and your training provider — agrees
              that you are prepared for the EPA.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Tripartite Gateway Review
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The tripartite review is a formal meeting between you, your employer representative (usually
              your line manager or supervisor) and your training provider. It is the meeting where the
              gateway decision is made — to proceed, to delay pending specific actions, or to agree that
              more time is needed.
            </p>

            <p>
              Regular tripartite reviews throughout the apprenticeship (at least quarterly) ensure there
              are no surprises at the final gateway review. If progress has been tracked consistently,
              the gateway review should be a confirmation of readiness rather than a discovery of problems.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Preparing for the Gateway Review</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Complete your portfolio:</strong> Ensure all evidence is in place, mapped to KSBs, and well-organised</li>
                <li className="pl-1"><strong>Check qualifications:</strong> Confirm all required qualifications have been achieved and certificates obtained</li>
                <li className="pl-1"><strong>Review off-the-job hours:</strong> Verify your training log shows the required hours have been completed</li>
                <li className="pl-1"><strong>Self-assess:</strong> Honestly evaluate your readiness against each KSB — are there areas you feel weak on?</li>
                <li className="pl-1"><strong>Prepare questions:</strong> If you have concerns or uncertainties about the EPA process, prepare questions for the review</li>
                <li className="pl-1"><strong>Bring evidence:</strong> Have your portfolio, qualification certificates and training records available</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Gateway Review Agenda</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Progress review:</strong> Summary of on-programme achievements and remaining actions</li>
                <li className="pl-1"><strong>Qualification check:</strong> Confirmation that all required qualifications are completed</li>
                <li className="pl-1"><strong>Portfolio review:</strong> Assessment of portfolio completeness and quality</li>
                <li className="pl-1"><strong>Employer feedback:</strong> Employer's assessment of workplace competence and readiness</li>
                <li className="pl-1"><strong>Apprentice self-assessment:</strong> Your honest evaluation of your readiness and any concerns</li>
                <li className="pl-1"><strong>Decision:</strong> Proceed, action plan, or agree more time is needed</li>
              </ol>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Be honest during the review. If you have concerns about specific
              areas, raise them. It is far better to address a gap now than to discover it during the EPA.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Resolving Outstanding Issues
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              It is not uncommon for the gateway review to identify outstanding issues that need addressing.
              This is the process working as intended — better to find and fix gaps now than during the
              EPA itself. Every issue identified should have a specific, time-bound action plan.
            </p>

            <p>
              The key to resolving issues efficiently is specificity. "Complete more portfolio evidence" is
              too vague. "Add a reflective account covering a fault diagnosis on the packaging line,
              mapped to KSB K12 and S7, by 15th March" is actionable and can be tracked.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Gateway Issues and Solutions</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Issue</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Solution</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Portfolio evidence gaps</td>
                      <td className="border border-white/10 px-3 py-2">Add specific evidence for missing KSBs</td>
                      <td className="border border-white/10 px-3 py-2">2-4 weeks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">English/maths not yet achieved</td>
                      <td className="border border-white/10 px-3 py-2">Complete and pass the required exam</td>
                      <td className="border border-white/10 px-3 py-2">Next exam sitting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Off-the-job hours shortfall</td>
                      <td className="border border-white/10 px-3 py-2">Plan and complete remaining hours</td>
                      <td className="border border-white/10 px-3 py-2">Depends on shortfall</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Limited experience in specific area</td>
                      <td className="border border-white/10 px-3 py-2">Arrange targeted workplace activities</td>
                      <td className="border border-white/10 px-3 py-2">2-6 weeks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Knowledge gaps identified</td>
                      <td className="border border-white/10 px-3 py-2">Additional revision or training sessions</td>
                      <td className="border border-white/10 px-3 py-2">2-4 weeks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Certificate not yet received</td>
                      <td className="border border-white/10 px-3 py-2">Chase awarding body; obtain interim confirmation</td>
                      <td className="border border-white/10 px-3 py-2">1-4 weeks</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Every issue identified should have a specific action plan: what needs
              to be done, who is responsible, and when it will be completed. Review progress against the
              action plan at a follow-up meeting before confirming sign-off.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Your Rights and Responsibilities
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The sign-off process is a three-way agreement. You are not a passive participant — you have
              both rights and responsibilities. Understanding these ensures the process works fairly and
              effectively.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Your Rights</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">To be informed about the gateway requirements well in advance</li>
                <li className="pl-1">To have your concerns heard and taken seriously</li>
                <li className="pl-1">To request additional time or support if you do not feel ready</li>
                <li className="pl-1">To understand the reasons if sign-off is delayed</li>
                <li className="pl-1">To have decisions based on competence, not business convenience</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Your Responsibilities</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Keep your portfolio up to date throughout the apprenticeship</li>
                <li className="pl-1">Complete qualifications within the agreed timeframes</li>
                <li className="pl-1">Track your off-the-job training hours and flag any shortfall early</li>
                <li className="pl-1">Honestly assess your own readiness and raise concerns</li>
                <li className="pl-1">Actively participate in progress reviews and the gateway review</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The sign-off process works best when all three parties communicate
              openly and honestly. If you feel you are not ready, say so. If you feel you are being held
              back unfairly, raise it with your training provider. The process is designed to serve your
              interests — use it.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            After Sign-Off: Opening the Gateway
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Once both parties have signed off and all pre-requisites are confirmed, the gateway paperwork
              is submitted to the EPAO. The EPAO reviews the submission, confirms everything is in order,
              and schedules the EPA components. There is typically a period of 2-4 weeks between gateway
              opening and the first assessment — use this time wisely for final preparation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Post-Gateway Preparation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Review your portfolio:</strong> Final check that everything is in order, well-organised, and you can discuss every piece of evidence</li>
                <li className="pl-1"><strong>Practise discussions:</strong> Rehearse talking through your evidence and answering probing questions</li>
                <li className="pl-1"><strong>Revise key knowledge:</strong> Review the technical content most likely to be assessed</li>
                <li className="pl-1"><strong>Practise practical tasks:</strong> Refresh your practical skills, particularly safe isolation and testing procedures</li>
                <li className="pl-1"><strong>Prepare mentally:</strong> Build confidence through preparation — you have been signed off because you are ready</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The gateway is the final checkpoint before the independent EPA.
              Once through the gateway, you are in the hands of the EPAO and their appointed assessor.
              Everything you have done during your apprenticeship — the learning, the experience, the
              portfolio building — has prepared you for this. Trust your preparation and approach the
              EPA with confidence.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Reference</h2>
          <div className="p-4 rounded-lg bg-white/5">
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1">Both employer and training provider must sign off before the gateway opens</li>
              <li className="pl-1">All qualifications (Level 3 Diploma, Level 2 English and maths) must be achieved</li>
              <li className="pl-1">Off-the-job training hours (20% minimum) must be completed and evidenced</li>
              <li className="pl-1">Your portfolio must be substantially complete and mapped to KSBs</li>
              <li className="pl-1">You are an active participant — raise any concerns about your readiness</li>
              <li className="pl-1">Typically 2-4 weeks between gateway opening and first EPA component</li>
              <li className="pl-1">A short delay for proper preparation is always better than a premature EPA</li>
            </ul>
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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge — Sign-Off and Gateway"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section5-2">
              Next: EPA Gateway Requirements
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section5_1;
