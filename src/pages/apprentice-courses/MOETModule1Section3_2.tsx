import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Risk Evaluation - MOET Module 1 Section 3.2";
const DESCRIPTION = "Comprehensive guide to risk evaluation for electrical maintenance technicians: 5x5 risk matrix, risk ratings, qualitative and quantitative assessment, Management of Health and Safety at Work Regulations 1999, ALARP principle and electrical-specific risk examples.";

const quickCheckQuestions = [
  {
    id: "risk-matrix-purpose",
    question: "What is the purpose of a 5x5 risk matrix in risk assessment?",
    options: [
      "To calculate the exact probability of an accident occurring",
      "To provide a structured method for combining likelihood and severity to produce a risk rating",
      "To replace the need for a written risk assessment",
      "To determine which PPE should be worn"
    ],
    correctIndex: 1,
    explanation: "A 5x5 risk matrix provides a structured, semi-quantitative method for evaluating risk. By plotting the likelihood of harm on one axis and the severity of harm on the other, you produce a risk rating that helps prioritise which hazards need the most urgent attention. It does not give exact probabilities — it provides a consistent framework for professional judgement."
  },
  {
    id: "reg3-requirement",
    question: "Under Regulation 3 of the Management of Health and Safety at Work Regulations 1999, what is the employer's duty?",
    options: [
      "To eliminate all risks in the workplace entirely",
      "To carry out a suitable and sufficient assessment of the risks to employees and others affected by the undertaking",
      "To provide written risk assessments only for high-risk activities",
      "To delegate all risk assessment to external consultants"
    ],
    correctIndex: 1,
    explanation: "Regulation 3 requires every employer to make a 'suitable and sufficient' assessment of the risks to the health and safety of employees and anyone else who may be affected by the undertaking. 'Suitable and sufficient' means the assessment must be appropriate to the nature and level of risk — it does not have to eliminate all risks, but it must be thorough enough to identify the significant ones and determine the necessary precautions."
  },
  {
    id: "alarp-principle",
    question: "The ALARP principle requires that risk should be reduced:",
    options: [
      "To zero in all circumstances",
      "To the lowest level that the employer considers convenient",
      "As low as reasonably practicable — meaning the cost of further reduction is grossly disproportionate to the benefit gained",
      "Only to the level specified by the client"
    ],
    correctIndex: 2,
    explanation: "ALARP (As Low As Reasonably Practicable) is a legal concept meaning that risks must be reduced until the cost (in time, money, effort or inconvenience) of further reduction is grossly disproportionate to the safety benefit gained. It does not mean reducing risk to zero, nor does it allow ignoring readily available controls simply because they are inconvenient."
  },
  {
    id: "review-triggers",
    question: "Which of the following should trigger a review of an existing risk assessment?",
    options: [
      "Only a fatal accident on site",
      "A significant change in work activity, equipment, personnel, legislation, or a near-miss/incident related to the assessed activity",
      "Only when the HSE requests it during an inspection",
      "Risk assessments never need reviewing once completed"
    ],
    correctIndex: 1,
    explanation: "Risk assessments are living documents that must be reviewed whenever circumstances change. Triggers include changes in work activity, new equipment or processes, changes in personnel (especially competence levels), updates to legislation or guidance, incidents or near-misses related to the activity, and as a matter of routine good practice — typically annually even if no specific trigger has occurred."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In a 5x5 risk matrix, a risk rated as 'substantial' (score 15-20) requires:",
    options: [
      "No action — work can proceed as planned",
      "Monitoring only — no additional controls needed",
      "Work should not proceed until the risk has been reduced; significant resources may need to be allocated",
      "The risk is too low to warrant any attention"
    ],
    correctAnswer: 2,
    explanation: "A substantial risk rating (typically 15-20 on a 5x5 matrix) means the risk is unacceptable and work should not proceed until additional control measures have been implemented to reduce it. This may require significant investment of time, resources or redesign of the work method. Only once the risk has been reduced to a tolerable or moderate level should work be permitted."
  },
  {
    id: 2,
    question: "Which of the following best describes 'qualitative' risk assessment?",
    options: [
      "Assessment based entirely on numerical data and statistical analysis",
      "Assessment based on professional judgement, experience and descriptive categories rather than numerical data",
      "Assessment carried out by a computer programme without human input",
      "Assessment that only considers financial risk"
    ],
    correctAnswer: 1,
    explanation: "Qualitative risk assessment uses descriptive categories (e.g., 'unlikely', 'possible', 'probable') and professional judgement rather than precise numerical data. It is the most common approach in workplace risk assessment because exact probability data is rarely available. The 5x5 risk matrix is a semi-quantitative tool that provides some numerical structure to qualitative judgements."
  },
  {
    id: 3,
    question: "Under the Management of Health and Safety at Work Regulations 1999, a risk assessment must be reviewed when:",
    options: [
      "It reaches its first anniversary regardless of changes",
      "There is reason to suspect it is no longer valid, or when significant changes have occurred",
      "Only when an employee is injured",
      "The client requests a copy for their records"
    ],
    correctAnswer: 1,
    explanation: "Regulation 3(3) requires that a risk assessment be reviewed when there is reason to suspect it is no longer valid, or when there has been a significant change in the matters to which it relates. This includes changes in work methods, equipment, substances, personnel, site conditions, or legislation. Annual review is good practice but is not the only trigger."
  },
  {
    id: 4,
    question: "A maintenance technician is asked to work on a distribution board in a wet plantroom. The risk assessment identifies a 'probable' likelihood (4) and 'major' severity (4). The risk score is:",
    options: [
      "8 — moderate risk",
      "16 — substantial risk",
      "4 — tolerable risk",
      "20 — intolerable risk"
    ],
    correctAnswer: 1,
    explanation: "Risk score = Likelihood (4) x Severity (4) = 16. On a 5x5 matrix, a score of 16 falls in the 'substantial' risk band. This means work should not proceed until additional controls are put in place — for example, de-energising the board, pumping out water, providing temporary drainage, and ensuring appropriate PPE and safe isolation procedures are in place."
  },
  {
    id: 5,
    question: "The term 'significant findings' in risk assessment refers to:",
    options: [
      "Only findings that have caused actual injury",
      "The significant hazards identified, the people at risk, and the control measures in place or required",
      "Only electrical hazards above 230 V",
      "Findings that the employer considers financially significant"
    ],
    correctAnswer: 1,
    explanation: "Under Regulation 3(6) of the Management of Health and Safety at Work Regulations 1999, employers with five or more employees must record the significant findings of risk assessments. 'Significant findings' means the significant hazards identified, who might be harmed and how, the existing control measures, and any further action required. Trivial hazards do not need to be recorded."
  },
  {
    id: 6,
    question: "Who is legally competent to carry out a risk assessment under the Management of Health and Safety at Work Regulations 1999?",
    options: [
      "Only a chartered safety professional with NEBOSH qualifications",
      "Any person with sufficient training, experience, knowledge and other qualities to carry out the assessment competently",
      "Only the employer personally — it cannot be delegated",
      "Any employee regardless of training or experience"
    ],
    correctAnswer: 1,
    explanation: "Regulation 7 requires employers to appoint competent persons to assist with health and safety arrangements. A risk assessor must have sufficient training, experience, knowledge and other qualities to enable them to carry out the assessment competently. For electrical risk assessments, this typically means a person with both health and safety knowledge and technical electrical competence — such as a qualified maintenance technician with risk assessment training."
  },
  {
    id: 7,
    question: "The ALARP principle is best illustrated by which statement?",
    options: [
      "All risks must be eliminated regardless of cost",
      "Risks only need to be reduced if the HSE issues an improvement notice",
      "Risk must be reduced to the point where the cost of further reduction is grossly disproportionate to the benefit",
      "Risk reduction is optional if the employer cannot afford it"
    ],
    correctAnswer: 2,
    explanation: "ALARP requires a proportionate approach: risks must be reduced until the sacrifice (cost, time, trouble) of further reduction is grossly disproportionate to the risk reduction achieved. The word 'grossly' is important — it means the imbalance must be large before you can stop reducing risk. For electrical work, the severity of potential harm (fatal electric shock) means that significant expenditure on controls is expected."
  },
  {
    id: 8,
    question: "When using a risk matrix, which of the following would be rated as 'intolerable' risk?",
    options: [
      "Likelihood: rare (1), Severity: minor (2) — Score 2",
      "Likelihood: possible (3), Severity: moderate (3) — Score 9",
      "Likelihood: almost certain (5), Severity: catastrophic (5) — Score 25",
      "Likelihood: unlikely (2), Severity: minor (2) — Score 4"
    ],
    correctAnswer: 2,
    explanation: "A score of 25 (likelihood 5 x severity 5) represents the maximum possible risk rating and falls firmly in the 'intolerable' band. Work must not proceed under any circumstances until the risk has been fundamentally reduced. In practice, an 'almost certain' likelihood of 'catastrophic' harm means the activity should be redesigned or eliminated entirely."
  },
  {
    id: 9,
    question: "A quantitative risk assessment differs from a qualitative one because it:",
    options: [
      "Is always more accurate",
      "Uses numerical data, statistical analysis and calculated probabilities rather than descriptive categories",
      "Does not require professional judgement",
      "Is only used in the nuclear industry"
    ],
    correctAnswer: 1,
    explanation: "Quantitative risk assessment uses numerical data — failure rates, exposure measurements, statistical probabilities — to calculate risk levels. It is used in complex, high-consequence industries such as nuclear, petrochemical, rail and aerospace where sufficient data exists. In routine electrical maintenance, qualitative or semi-quantitative methods (such as the risk matrix) are more commonly used because precise failure data for individual tasks is rarely available."
  },
  {
    id: 10,
    question: "For a risk assessment to be considered 'suitable and sufficient', it must:",
    options: [
      "Cover every conceivable risk, no matter how trivial",
      "Be completed by a NEBOSH-qualified consultant only",
      "Identify the significant hazards, evaluate the risks, and determine whether existing controls are adequate or additional measures are needed",
      "Be written on a specific HSE-approved form"
    ],
    correctAnswer: 2,
    explanation: "A 'suitable and sufficient' risk assessment must identify the significant hazards, evaluate who might be harmed and how, assess the adequacy of existing controls, and determine what further action is needed. It does not need to cover every trivial hazard, it can be carried out by any competent person (not just a consultant), and there is no prescribed form — though it must be recorded in writing if the employer has five or more employees."
  },
  {
    id: 11,
    question: "An electrical maintenance technician identifies that a 30-year-old distribution board has deteriorated insulation, missing labels and evidence of previous overheating. The risk assessment should:",
    options: [
      "Rate the hazard as trivial because the board has been in service for 30 years without incident",
      "Recognise the combination of hazards as significant, evaluate the risk as substantial, and recommend the board be de-energised for inspection and remedial work before maintenance proceeds",
      "Proceed with maintenance and note the issues afterwards",
      "Ignore the condition because it is the client's responsibility"
    ],
    correctAnswer: 1,
    explanation: "The combination of deteriorated insulation, missing labels and evidence of overheating represents a significant, escalating electrical hazard. The risk assessment should rate this as substantial and recommend that the board be de-energised and a thorough condition assessment carried out before any maintenance work proceeds. The age of the board without incident does not reduce the risk — deterioration is progressive and failure may be imminent."
  },
  {
    id: 12,
    question: "Under ST1426, maintenance technicians are expected to demonstrate which of the following in relation to risk evaluation?",
    options: [
      "The ability to design and implement a corporate risk management system",
      "Knowledge of risk assessment principles, the ability to contribute to risk assessments, and compliance with safe systems of work derived from them",
      "The ability to carry out quantitative reliability analysis on complex systems",
      "Only the ability to read a completed risk assessment"
    ],
    correctAnswer: 1,
    explanation: "ST1426 requires maintenance technicians to demonstrate knowledge of risk assessment principles and the ability to contribute to risk assessments for their work activities. Technicians are also expected to comply with the safe systems of work that result from risk assessments and to escalate concerns when risk levels change. This is assessed in the end-point assessment knowledge test and professional discussion."
  }
];

const faqs = [
  {
    question: "What is the difference between a qualitative and quantitative risk assessment?",
    answer: "A qualitative risk assessment uses descriptive categories and professional judgement — for example, rating likelihood as 'unlikely', 'possible' or 'probable'. A quantitative risk assessment uses numerical data, calculated probabilities and statistical analysis. In practice, most workplace risk assessments for electrical maintenance are qualitative or semi-quantitative (using a numbered risk matrix). Quantitative methods are used in high-consequence industries such as nuclear, petrochemical and rail where sufficient failure data exists."
  },
  {
    question: "Do I have to write the risk assessment myself?",
    answer: "As a maintenance technician, you are not necessarily required to write formal risk assessments from scratch — that is typically the responsibility of your employer or a competent person they appoint. However, you are expected to contribute to risk assessments by providing information about the hazards you encounter, the conditions on site, and the practicality of proposed controls. You should also be able to review a risk assessment for your work and identify whether it is still valid."
  },
  {
    question: "How do I decide what likelihood rating to give a hazard?",
    answer: "Likelihood ratings are based on professional judgement informed by evidence. Consider: how often is the hazard present? How often are people exposed? What is the history of incidents and near-misses? Are existing controls reliable? Has similar work elsewhere resulted in incidents? You should also consider industry data and guidance. The key is consistency and honesty — do not underrate a likelihood just because an accident has not happened yet."
  },
  {
    question: "What does ALARP mean in practice for electrical maintenance?",
    answer: "ALARP (As Low As Reasonably Practicable) means you must reduce risk until the cost of further reduction is grossly disproportionate to the benefit. For electrical work, where the potential severity is fatal electric shock, the bar is set high — employers are expected to invest significantly in controls. In practice, this means safe isolation must be used unless dead working is genuinely unreasonable, appropriate PPE must be provided, and proper training and competence must be maintained even if these measures are costly."
  },
  {
    question: "When should a risk assessment be signed off and who should sign it?",
    answer: "A risk assessment should be signed off by the competent person who carried it out and, in most organisations, approved by a line manager or safety manager. The sign-off confirms that the assessment is complete, the significant findings have been recorded, and the identified controls are in place or planned. It should be signed before work begins and reviewed at the point of work to confirm it is still valid. All members of the work team should have access to the assessment and understand its contents."
  }
];

const MOETModule1Section3_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section3">
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
            <span>Module 1.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Risk Evaluation
          </h1>
          <p className="text-white/80">
            Assessing likelihood, severity and tolerability of identified hazards
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Risk:</strong> Likelihood x Severity of harm from a hazard</li>
              <li className="pl-1"><strong>5x5 matrix:</strong> Structured tool for rating risk (1-25)</li>
              <li className="pl-1"><strong>Ratings:</strong> Trivial, tolerable, moderate, substantial, intolerable</li>
              <li className="pl-1"><strong>ALARP:</strong> Risk reduced as low as reasonably practicable</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Legal basis:</strong> MHSWR 1999 Reg 3 — suitable and sufficient RA</li>
              <li className="pl-1"><strong>Severity:</strong> Electrical contact = potentially fatal (severity 5)</li>
              <li className="pl-1"><strong>Controls:</strong> Safe isolation, PPE, competence, barriers</li>
              <li className="pl-1"><strong>ST1426:</strong> Risk assessment knowledge and application KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Use a 5x5 risk matrix to evaluate and rate identified hazards",
              "Distinguish between trivial, tolerable, moderate, substantial and intolerable risk ratings",
              "Explain the difference between qualitative and quantitative risk assessment",
              "Apply the requirements of MHSWR 1999 Regulation 3 to electrical maintenance work",
              "Understand the ALARP principle and its application to electrical risk",
              "Identify triggers for reviewing and updating existing risk assessments"
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

        {/* Section 01: The 5x5 Risk Matrix */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The 5x5 Risk Matrix
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Once hazards have been identified, the next step is to evaluate the level of risk each hazard presents.
              The 5x5 risk matrix is the most widely used tool for this purpose in UK workplaces. It provides a
              structured, repeatable method for combining two factors — the likelihood that harm will occur and the
              severity of that harm — to produce a numerical risk rating.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Likelihood Scale</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Descriptor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-center font-bold">1</td>
                      <td className="border border-white/10 px-3 py-2">Rare</td>
                      <td className="border border-white/10 px-3 py-2">Could happen but only in exceptional circumstances; no history of occurrence</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-center font-bold">2</td>
                      <td className="border border-white/10 px-3 py-2">Unlikely</td>
                      <td className="border border-white/10 px-3 py-2">Not expected to happen, but possible; may have occurred once in similar situations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-center font-bold">3</td>
                      <td className="border border-white/10 px-3 py-2">Possible</td>
                      <td className="border border-white/10 px-3 py-2">Could happen; has happened in similar workplaces or activities</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-center font-bold">4</td>
                      <td className="border border-white/10 px-3 py-2">Probable</td>
                      <td className="border border-white/10 px-3 py-2">Expected to happen; has happened before in this workplace or frequently in the industry</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-center font-bold">5</td>
                      <td className="border border-white/10 px-3 py-2">Almost certain</td>
                      <td className="border border-white/10 px-3 py-2">Will happen unless action is taken; happens regularly in this type of work</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Severity Scale</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Descriptor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-center font-bold">1</td>
                      <td className="border border-white/10 px-3 py-2">Negligible</td>
                      <td className="border border-white/10 px-3 py-2">Minor discomfort or inconvenience; no first aid required; no lost time</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-center font-bold">2</td>
                      <td className="border border-white/10 px-3 py-2">Minor</td>
                      <td className="border border-white/10 px-3 py-2">First aid injury; minor cuts, bruises; short-term discomfort; no lost workdays</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-center font-bold">3</td>
                      <td className="border border-white/10 px-3 py-2">Moderate</td>
                      <td className="border border-white/10 px-3 py-2">Medical treatment required; temporary incapacity; up to 7 days lost time; reversible health effects</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-center font-bold">4</td>
                      <td className="border border-white/10 px-3 py-2">Major</td>
                      <td className="border border-white/10 px-3 py-2">Serious injury; fractures, hospitalisation, long-term incapacity; RIDDOR-reportable; permanent health effects</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-center font-bold">5</td>
                      <td className="border border-white/10 px-3 py-2">Catastrophic</td>
                      <td className="border border-white/10 px-3 py-2">Death, multiple fatalities, or permanent total disability</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">Calculating the Risk Score</p>
              <p className="text-sm text-white mb-3">
                The risk score is calculated by multiplying the likelihood rating by the severity rating:
              </p>
              <div className="p-3 rounded bg-[#1a1a1a]/50 text-center">
                <p className="text-base font-semibold text-elec-yellow">
                  Risk Score = Likelihood (1-5) x Severity (1-5) = Score (1-25)
                </p>
              </div>
              <p className="text-sm text-white mt-3">
                For example, if a hazard has a likelihood of 3 (possible) and a severity of 4 (major), the risk
                score is 3 x 4 = 12, which falls in the 'moderate' to 'substantial' range depending on the
                matrix used. The score determines the urgency and nature of the response required.
              </p>
            </div>

            <p>
              It is essential to understand that the risk matrix is a tool to support professional judgement, not a
              substitute for it. Two competent assessors may arrive at slightly different scores for the same hazard
              because their experience and interpretation of the likelihood and severity scales may differ. What
              matters is that the assessment is consistent, reasonable, and honestly reflects the conditions observed.
              If in doubt, err on the side of caution — overestimating risk leads to additional controls, which is
              always better than underestimating and having an accident.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When assessing electrical hazards, remember that the severity of contact
              with mains voltage (230/400 V) is always at least 'major' (4) and potentially 'catastrophic' (5),
              because electric shock at these voltages can be fatal. This means that even a low likelihood still
              produces a significant risk score, which is why safe isolation is always the default control measure.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Risk Ratings and Response */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Risk Ratings and Required Response
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The numerical risk score from the matrix is converted into a risk rating that determines the type of
              response required. Five levels of risk rating are commonly used, each with a prescribed course of action.
              Understanding these levels is critical because they dictate whether work can proceed, whether additional
              controls are needed, and how urgently action must be taken.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Risk Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Score Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Required Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-500/5">
                      <td className="border border-white/10 px-3 py-2 font-medium text-green-400">Trivial</td>
                      <td className="border border-white/10 px-3 py-2">1-2</td>
                      <td className="border border-white/10 px-3 py-2">No action required; no documentation needed beyond noting the assessment was done. Monitor to ensure conditions do not change.</td>
                    </tr>
                    <tr className="bg-green-500/5">
                      <td className="border border-white/10 px-3 py-2 font-medium text-green-300">Tolerable</td>
                      <td className="border border-white/10 px-3 py-2">3-5</td>
                      <td className="border border-white/10 px-3 py-2">No additional controls required if existing controls are maintained. Monitor and review regularly. Consider cost-effective improvements.</td>
                    </tr>
                    <tr className="bg-yellow-500/5">
                      <td className="border border-white/10 px-3 py-2 font-medium text-yellow-400">Moderate</td>
                      <td className="border border-white/10 px-3 py-2">6-12</td>
                      <td className="border border-white/10 px-3 py-2">Efforts should be made to reduce risk within a defined timescale. Controls must be implemented before work continues. Cost of prevention should be considered.</td>
                    </tr>
                    <tr className="bg-orange-500/5">
                      <td className="border border-white/10 px-3 py-2 font-medium text-orange-400">Substantial</td>
                      <td className="border border-white/10 px-3 py-2">13-20</td>
                      <td className="border border-white/10 px-3 py-2">Work should not start or continue until risk has been reduced. Significant resources may need to be allocated. Immediate management attention required.</td>
                    </tr>
                    <tr className="bg-red-500/5">
                      <td className="border border-white/10 px-3 py-2 font-medium text-red-400">Intolerable</td>
                      <td className="border border-white/10 px-3 py-2">21-25</td>
                      <td className="border border-white/10 px-3 py-2">Work must not proceed under any circumstances until the risk is reduced. If it is not possible to reduce the risk, the work must remain prohibited.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Electrical Maintenance Risk Examples</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Scenario</th>
                      <th className="border border-white/10 px-3 py-2 text-left">L</th>
                      <th className="border border-white/10 px-3 py-2 text-left">S</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Score</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Replacing MCB in isolated, locked-off board — proven dead</td>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2 text-green-300">Tolerable</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable repair in ceiling void with known asbestos insulation board</td>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">15</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">Substantial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Live fault-finding on 400 V distribution board without arc flash PPE</td>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">20</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">Substantial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Working on overhead lines without isolation during storm</td>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">25</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Intolerable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Before and After Controls</p>
              <p className="text-sm text-white">
                Best practice is to rate each hazard twice: once without controls (the 'inherent' or 'gross' risk)
                and once with the proposed controls in place (the 'residual' or 'net' risk). This demonstrates the
                effectiveness of the controls and shows that the risk has been reduced to an acceptable level. For
                example, live working on a 400 V board might be rated as 20 (substantial) without controls, but with
                safe isolation, proving dead, locking off and appropriate PPE, the residual risk drops to 5 (tolerable).
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Qualitative vs Quantitative Assessment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Qualitative vs Quantitative Risk Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Risk assessment approaches fall on a spectrum from purely qualitative (based on judgement and descriptive
              categories) to purely quantitative (based on numerical data and calculated probabilities). Understanding
              where your assessment sits on this spectrum helps you apply the right level of rigour for the task.
            </p>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Qualitative Assessment</h3>
                <p className="text-sm text-white mb-2">
                  Uses descriptive categories and professional judgement. The assessor draws on their training,
                  experience and knowledge of the work to rate hazards using word-based scales (e.g., 'low',
                  'medium', 'high') or the numbered scales of a risk matrix.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Advantages:</strong> Quick, practical, does not require statistical data, accessible to non-specialists</li>
                  <li className="pl-1"><strong>Limitations:</strong> Subjective — different assessors may reach different conclusions; less precise; relies on the competence of the assessor</li>
                  <li className="pl-1"><strong>When used:</strong> Routine workplace risk assessments, task-specific assessments, pre-work checks</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Quantitative Assessment</h3>
                <p className="text-sm text-white mb-2">
                  Uses numerical data — failure rates, exposure measurements, dose-response relationships, and
                  calculated probabilities — to produce a numerical risk figure. This may involve fault tree
                  analysis, event tree analysis, or statistical modelling.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Advantages:</strong> More precise, repeatable, allows direct comparison between risks, supports cost-benefit analysis</li>
                  <li className="pl-1"><strong>Limitations:</strong> Requires reliable data (which is often not available), complex, time-consuming, may give a false sense of precision</li>
                  <li className="pl-1"><strong>When used:</strong> Major hazard installations (COMAH sites), nuclear, petrochemical, railway risk assessment, arc flash studies</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Semi-Quantitative Assessment — The Practical Middle Ground</h3>
              <p className="text-sm text-white mb-3">
                The 5x5 risk matrix is a semi-quantitative method — it assigns numbers to qualitative judgements,
                producing a numerical score that can be ranked and compared. This is the approach most commonly used
                in electrical maintenance because it provides a structured framework without requiring statistical data
                that is rarely available for individual maintenance tasks.
              </p>
              <p className="text-sm text-white">
                For electrical maintenance technicians, the semi-quantitative approach using a risk matrix is the
                standard expectation. You should be able to use a risk matrix competently and understand the meaning
                of the scores it produces. Quantitative methods are specialist tools that you should be aware of but
                are unlikely to need to apply directly.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Competence to Carry Out Risk Assessment</h3>
              <p className="text-sm text-white">
                Regulation 7 of the Management of Health and Safety at Work Regulations 1999 requires employers to
                appoint one or more competent persons to assist with health and safety arrangements, including risk
                assessment. A competent person is someone with "sufficient training and experience or knowledge and
                other qualities" to carry out the function properly. For electrical risk assessments, this means a
                person who combines health and safety risk assessment knowledge with technical understanding of
                electrical systems and the specific work being assessed. As a maintenance technician progressing
                through ST1426, you are developing both sets of competence.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The quality of a risk assessment depends on the competence of the assessor,
              not the sophistication of the method. A thoughtful, honest qualitative assessment by a competent
              electrician is far more valuable than a complex quantitative model built on unreliable data.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: The ALARP Principle */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            The ALARP Principle and Significant Findings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The ALARP (As Low As Reasonably Practicable) principle is a cornerstone of UK health and safety law.
              It recognises that not all risk can be eliminated but requires that risk is reduced to the lowest level
              that is reasonably practicable. Understanding ALARP is essential because it determines how far you must
              go in implementing control measures.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">The ALARP Triangle</p>
              <p className="text-sm text-white mb-3">
                Risk levels can be visualised as a triangle divided into three zones:
              </p>
              <div className="space-y-2">
                <div className="p-3 rounded bg-red-500/20 border border-red-500/30">
                  <p className="text-sm font-medium text-red-400">Unacceptable Region (Top)</p>
                  <p className="text-xs text-white">Risk cannot be justified except in extraordinary circumstances. Work must not proceed.</p>
                </div>
                <div className="p-3 rounded bg-yellow-500/20 border border-yellow-500/30">
                  <p className="text-sm font-medium text-yellow-400">ALARP Region (Middle)</p>
                  <p className="text-xs text-white">Risk is tolerable only if further reduction is impracticable or the cost is grossly disproportionate to the benefit. Continuous effort to reduce risk within this zone.</p>
                </div>
                <div className="p-3 rounded bg-green-500/20 border border-green-500/30">
                  <p className="text-sm font-medium text-green-400">Broadly Acceptable Region (Bottom)</p>
                  <p className="text-xs text-white">Risk is so low that no further action is needed. Monitor to ensure it stays in this region.</p>
                </div>
              </div>
            </div>

            <p>
              The word "reasonably practicable" is a legal test established by case law (Edwards v National Coal
              Board, 1949). It means that the degree of risk must be weighed against the sacrifice (in money, time
              and trouble) of the measures needed to avert that risk. If the risk is high, then substantial
              expenditure on controls is expected — you cannot argue that safe isolation equipment is "too expensive"
              when the alternative is a risk of fatal electric shock. The sacrifice must be "grossly disproportionate"
              to the risk before you can stop taking further precautions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">ALARP in Electrical Maintenance — Practical Examples</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Safe isolation:</strong> The cost of safe isolation equipment (voltage indicator, locks, labels) is trivial compared to the risk of fatal electric shock — safe isolation must always be used unless dead working is genuinely unreasonable</li>
                <li className="pl-1"><strong>Arc flash PPE:</strong> Specialist arc-rated clothing and face shields have a cost, but the severity of arc flash burns justifies the expenditure for work on systems with significant fault levels</li>
                <li className="pl-1"><strong>Training:</strong> The cost of competence training for maintenance technicians is justified because incompetent work on electrical systems creates a risk of fatal injury</li>
                <li className="pl-1"><strong>Designed-out hazards:</strong> Specifying finger-safe distribution boards and IP-rated enclosures during design reduces the risk at source — this is ALARP in action at the design stage</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Recording Significant Findings</h3>
              <p className="text-sm text-white mb-3">
                Regulation 3(6) of the Management of Health and Safety at Work Regulations 1999 requires employers
                with five or more employees to record the significant findings of their risk assessments. "Significant
                findings" means:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">The significant hazards identified (not every trivial hazard — use professional judgement)</li>
                <li className="pl-1">The groups of people who might be harmed and how (employees, contractors, visitors, public)</li>
                <li className="pl-1">The existing control measures in place</li>
                <li className="pl-1">Any further action required, including timescales and responsibilities</li>
                <li className="pl-1">The date of assessment and the assessor's name</li>
              </ul>
              <p className="text-sm text-white mt-3">
                The record does not need to be lengthy — it should be clear, concise and proportionate. For a routine
                electrical maintenance task, a well-completed risk assessment form with clear entries for each
                significant hazard is sufficient. The key is that someone else could read it and understand what
                hazards are present, how they are controlled, and what additional action is needed.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: Review Triggers and Continuous Improvement */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            When to Review a Risk Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A risk assessment is not a one-off document — it is a living record that must be kept under review.
              Regulation 3(3) of the Management of Health and Safety at Work Regulations 1999 requires that risk
              assessments be reviewed when there is reason to suspect they are no longer valid, or when there has
              been a significant change in the matters to which they relate.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Triggers for Review</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Change in work activity:</strong> New task, different method, change in scope or scale</li>
                <li className="pl-1"><strong>Change in equipment:</strong> New plant, machinery or tools; modification of existing equipment</li>
                <li className="pl-1"><strong>Change in substances:</strong> Different chemicals, new materials, changed COSHH assessments</li>
                <li className="pl-1"><strong>Change in personnel:</strong> New workers, different competence levels, agency staff, young persons</li>
                <li className="pl-1"><strong>Change in environment:</strong> Different site, weather conditions, building alterations, new hazards in adjacent areas</li>
                <li className="pl-1"><strong>Incident or near-miss:</strong> Any incident related to the assessed activity, including near-misses, indicates the assessment may be inadequate</li>
                <li className="pl-1"><strong>Legislative or guidance change:</strong> New regulations, updated standards (e.g., BS 7671 amendments), revised HSE guidance</li>
                <li className="pl-1"><strong>Audit or inspection findings:</strong> Internal or external audits may identify weaknesses in existing assessments</li>
                <li className="pl-1"><strong>Routine review period:</strong> Good practice recommends reviewing all risk assessments at least annually, even if no specific trigger has occurred</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">The Review Process</h3>
              <p className="text-sm text-white mb-3">
                When reviewing an existing risk assessment, the assessor should:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Re-visit the work area to check whether conditions have changed</li>
                <li className="pl-1">Consult workers who carry out the activity regularly — they may have identified new hazards or control weaknesses</li>
                <li className="pl-1">Check incident and near-miss records for the activity since the last assessment</li>
                <li className="pl-1">Verify that the control measures specified in the assessment are actually being implemented</li>
                <li className="pl-1">Update the assessment to reflect any changes, with a new date and assessor signature</li>
                <li className="pl-1">Communicate any changes to the work team through briefings or toolbox talks</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Failure — Stale Risk Assessments</p>
              <p className="text-sm text-white">
                One of the most common failures in risk assessment management is allowing assessments to become
                "stale" — dated documents that no longer reflect the current work conditions but are still being used
                to authorise work. A risk assessment written for a site two years ago may be dangerously inadequate
                if the site conditions have changed. Always check the date of the risk assessment and verify at the
                point of work that it accurately describes the conditions you actually find. If it does not, stop work
                and request a review before proceeding.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard expects you to be able to contribute
              to risk assessment reviews by providing feedback on the effectiveness of controls, reporting changes in
              conditions, and identifying new hazards. This is part of the continuous improvement behaviour assessed
              in the end-point assessment professional discussion.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Hazard Identification
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section3-3">
              Next: Hierarchy of Controls
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section3_2;
