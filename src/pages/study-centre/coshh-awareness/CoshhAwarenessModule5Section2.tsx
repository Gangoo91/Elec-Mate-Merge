import {
  ArrowLeft,
  Stethoscope,
  CheckCircle,
  AlertTriangle,
  ClipboardList,
  HeartPulse,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "hs-when-required",
    question:
      "Which of the following is NOT one of the conditions that must be met before health surveillance is required under COSHH?",
    options: [
      "There is an identifiable disease or adverse health effect related to the exposure",
      "There is a valid technique available to detect the disease or effect",
      "The employee has specifically requested health surveillance in writing",
      "There is a reasonable likelihood of the disease occurring under the conditions of work",
    ],
    correctIndex: 2,
    explanation:
      "Health surveillance is required when four conditions are met: identifiable disease/effect linked to exposure, a valid detection technique exists, reasonable likelihood of occurrence under work conditions, and surveillance is likely to further protect employee health. An employee's written request is not one of the conditions \u2014 the duty is the employer's regardless of whether the employee asks for it.",
  },
  {
    id: "hs-record-retention",
    question:
      "For how long must an employer keep individual health surveillance records under COSHH Regulation 11(4)?",
    options: [
      "5 years from the date of the last entry",
      "10 years from the date the employee leaves the company",
      "40 years from the date of the last entry",
      "Indefinitely with no maximum retention period",
    ],
    correctIndex: 2,
    explanation:
      "COSHH Regulation 11(4) requires employers to keep individual health surveillance records for at least 40 years from the date of the last entry. This extended period reflects the fact that many occupational diseases \u2014 particularly respiratory conditions \u2014 may not manifest until decades after the original exposure. The 40-year retention period ensures records are available for future diagnosis, compensation claims, and epidemiological studies.",
  },
  {
    id: "hs-spirometry-ratio",
    question:
      "In spirometry testing, what does a reduced FEV1/FVC ratio primarily indicate?",
    options: [
      "A restrictive lung disease pattern",
      "An obstructive lung disease pattern",
      "Normal lung function for the employee's age",
      "That the employee did not perform the test correctly",
    ],
    correctIndex: 1,
    explanation:
      "A reduced FEV1/FVC ratio (the proportion of vital capacity that can be expelled in the first second of a forced expiration) is the hallmark of an obstructive lung disease pattern. In occupational health, this could indicate occupational asthma caused by workplace sensitisers such as isocyanates or colophony. A restrictive pattern typically shows reduced FVC with a preserved or elevated FEV1/FVC ratio.",
  },
];

const faqs = [
  {
    question:
      "Can an employee refuse to attend health surveillance?",
    answer:
      "Employees have a duty under COSHH Regulation 11(5) to present themselves for health surveillance when it has been identified as necessary. Whilst an employee cannot be physically forced to attend, refusal is a disciplinary matter because it prevents the employer from fulfilling their legal duty. Employees should be counselled that health surveillance exists to protect them \u2014 it is an early warning system that can detect work-related ill health before it becomes serious or irreversible. If an employee continues to refuse, the employer should document the refusal and consider whether the employee can safely continue in the role.",
  },
  {
    question:
      "Who pays for health surveillance \u2014 the employer or the employee?",
    answer:
      "The employer bears the full cost of health surveillance. This includes the cost of occupational health appointments, lung function testing, biological monitoring (blood and urine tests), specialist referrals, and any time the employee spends attending appointments during working hours. Health surveillance is a legal duty placed on the employer under COSHH Regulation 11 and cannot be charged back to the employee or deducted from wages under any circumstances.",
  },
  {
    question:
      "What happens if health surveillance reveals that an employee has developed occupational asthma?",
    answer:
      "If health surveillance identifies occupational asthma, the employer must act immediately. The affected employee should be removed from further exposure to the causative substance and referred to an occupational health specialist. The employer must review and improve control measures to prevent further cases, investigate whether other employees may also be affected, and report the case to the HSE under RIDDOR. Occupational asthma is usually irreversible \u2014 once sensitisation has occurred, even very low levels of exposure can trigger severe symptoms. Early detection through surveillance is therefore critical to limiting the severity of the condition.",
  },
  {
    question:
      "Do electricians really need health surveillance? They are not working in chemical factories.",
    answer:
      "Yes, many electrical tasks can involve exposure to substances that trigger health surveillance requirements. Electricians who work with or near spray-applied polyurethane foam insulation are exposed to isocyanates (a Schedule 6 substance requiring medical surveillance). Those soldering or using flux are exposed to colophony fumes, a known respiratory sensitiser. Cable jointing may involve solvents and resins. Even incidental exposure during refurbishment work \u2014 such as disturbing old lead paint or asbestos \u2014 can create health surveillance obligations. A thorough COSHH assessment will identify which tasks require surveillance for each worker.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under COSHH Regulation 11, which four conditions must ALL be met before an employer is required to provide health surveillance?",
    options: [
      "Employee consent, identifiable disease, valid detection technique, and reasonable likelihood",
      "Identifiable disease, valid detection technique, reasonable likelihood, and surveillance likely to further protect health",
      "Written risk assessment, employee consent, occupational health referral, and GP approval",
      "Identifiable disease, HSE approval, valid detection technique, and employee request",
    ],
    correctAnswer: 1,
    explanation:
      "The four conditions are: (1) an identifiable disease or adverse health effect related to the exposure, (2) a valid technique available to detect the disease or effect, (3) a reasonable likelihood of the disease occurring under the conditions of work, and (4) surveillance is likely to further the protection of employee health. Employee consent and HSE approval are not prerequisites \u2014 the duty exists regardless.",
  },
  {
    id: 2,
    question:
      "Which COSHH Schedule lists the substances that specifically require medical surveillance by an Employment Medical Adviser or appointed doctor?",
    options: [
      "Schedule 3",
      "Schedule 5",
      "Schedule 6",
      "Schedule 8",
    ],
    correctAnswer: 2,
    explanation:
      "COSHH Schedule 6 lists substances and their associated processes that require formal medical surveillance by an Employment Medical Adviser (EMA) or a doctor appointed by the HSE. These include substances such as vinyl chloride monomer, isocyanates, and certain chromium compounds. Schedule 6 medical surveillance goes beyond general health surveillance and requires examination by a qualified medical professional.",
  },
  {
    id: 3,
    question:
      "A trained responsible person on site carries out regular skin inspections of workers handling solvents. What level of health surveillance does this represent?",
    options: [
      "Initial assessment (baseline)",
      "Skin inspection by a trained responsible person",
      "Clinical examination by an occupational health professional",
      "Biological effect monitoring",
    ],
    correctAnswer: 1,
    explanation:
      "Regular skin inspections carried out by a trained responsible person (not a medical professional) represent the second level of health surveillance described in HSG61. The responsible person is trained to look for early signs of dermatitis \u2014 redness, dryness, cracking, or itching \u2014 and to refer any abnormal findings to an occupational health professional. This is a practical and cost-effective surveillance method commonly used for workers exposed to skin sensitisers and irritants.",
  },
  {
    id: 4,
    question:
      "What does FEV1 measure in spirometry testing?",
    options: [
      "The total volume of air the lungs can hold after maximum inhalation",
      "The volume of air forcefully expelled in the first second of a forced exhalation",
      "The peak flow rate achieved during a single breath",
      "The oxygen saturation level in arterial blood",
    ],
    correctAnswer: 1,
    explanation:
      "FEV1 (Forced Expiratory Volume in 1 second) measures the volume of air that a person can forcefully blow out in the first second of a forced exhalation, starting from full inspiration. It is one of the two key measurements in spirometry (the other being FVC \u2014 Forced Vital Capacity). A declining FEV1 over time, or a reduced FEV1/FVC ratio, can indicate developing obstructive airways disease such as occupational asthma.",
  },
  {
    id: 5,
    question:
      "An electrician is regularly exposed to isocyanates from spray-applied foam insulation. Under COSHH Schedule 6, what type of surveillance is specifically required?",
    options: [
      "Skin inspection by a trained responsible person every 6 months",
      "Annual respiratory questionnaire administered by a first aider",
      "Medical surveillance by an Employment Medical Adviser or appointed doctor",
      "Self-reporting by the employee using a symptom diary",
    ],
    correctAnswer: 2,
    explanation:
      "Isocyanates are listed in COSHH Schedule 6 as a substance requiring formal medical surveillance by an Employment Medical Adviser (EMA) or a doctor appointed by the HSE. This is the highest level of health surveillance and goes beyond questionnaires or skin checks. Workers exposed to isocyanates must undergo medical examination before first exposure and at regular intervals thereafter, because isocyanate exposure can cause severe and irreversible occupational asthma.",
  },
  {
    id: 6,
    question:
      "How long must individual health surveillance records be retained under COSHH Regulation 11(4)?",
    options: [
      "10 years from the date of the last entry",
      "20 years from the date of the last entry",
      "40 years from the date of the last entry",
      "For the duration of the employee's career only",
    ],
    correctAnswer: 2,
    explanation:
      "Health surveillance records must be kept for at least 40 years from the date of the last entry. This exceptionally long retention period exists because many occupational diseases have very long latency periods \u2014 occupational asthma symptoms may worsen over decades, and other conditions may not appear until long after exposure has ceased. The 40-year period also ensures records remain available for retrospective investigation, compensation claims, and epidemiological research.",
  },
  {
    id: 7,
    question:
      "During a return-to-work health surveillance assessment after a period of sickness, what is the primary purpose of the assessment?",
    options: [
      "To discipline the employee for the period of absence",
      "To determine whether the employee is fit to return to the same exposure level, or whether adjustments are needed",
      "To recalculate the employee's sick pay entitlement",
      "To update the company's absence management records",
    ],
    correctAnswer: 1,
    explanation:
      "The primary purpose of a return-to-work health surveillance assessment is to determine whether the employee can safely return to the same level of exposure, or whether adjustments are needed to protect their health. This may include temporary or permanent redeployment away from the hazardous substance, additional control measures, reduced exposure duration, or enhanced PPE. It is a health protection measure, not a disciplinary process.",
  },
  {
    id: 8,
    question:
      "What is the DERM checklist used for in occupational health surveillance?",
    options: [
      "Recording the results of lung function tests",
      "Providing a structured framework for skin inspection to detect early signs of occupational dermatitis",
      "Calculating the cost of occupational health provision",
      "Determining which employees need to be referred to the HSE",
    ],
    correctAnswer: 1,
    explanation:
      "The DERM checklist is a structured skin inspection tool that guides trained responsible persons through a systematic check of the hands, wrists, and forearms. 'DERM' stands for: Dryness, Erythema (redness), Roughness, and Marks (cracks, fissures, blisters). By using a consistent checklist, inspectors are less likely to miss early signs of contact dermatitis, enabling prompt referral and intervention before the condition becomes chronic or irreversible.",
  },
];

export default function CoshhAwarenessModule5Section2() {
  useSEO({
    title:
      "Health Surveillance | COSHH Awareness Module 5.2",
    description:
      "COSHH Regulation 11 health surveillance requirements, types of surveillance, spirometry, skin inspection, biological monitoring, record keeping, and electrician-specific exposure scenarios.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-400/20 border border-violet-500/30 mb-4">
            <Stethoscope className="h-7 w-7 text-violet-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 mx-auto">
            <span className="text-violet-500 text-xs font-semibold">
              MODULE 5 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Health Surveillance
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            When health surveillance is required, the types of surveillance
            available, how it works in practice, record-keeping duties, and
            what it means for electricians exposed to hazardous substances
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>COSHH Reg 11:</strong> Requires health surveillance
                when exposure creates an identifiable health risk
              </li>
              <li>
                <strong>Schedule 6:</strong> Lists substances requiring
                formal medical surveillance by an appointed doctor
              </li>
              <li>
                <strong>40 years:</strong> Health records must be retained
                for 40 years from the date of the last entry
              </li>
              <li>
                <strong>Early detection:</strong> The goal is to catch
                work-related ill health before it becomes irreversible
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400 text-base font-medium mb-2">
              For Electricians
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Isocyanates:</strong> Spray foam insulation &mdash;
                Schedule 6 medical surveillance required
              </li>
              <li>
                <strong>Colophony/flux:</strong> Soldering fumes &mdash;
                respiratory questionnaire + spirometry
              </li>
              <li>
                <strong>Solvents:</strong> Cable jointing resins &mdash;
                biological monitoring may apply
              </li>
              <li>
                <strong>Duty to attend:</strong> Employees must present
                themselves for health surveillance when required
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain what health surveillance is and its purpose under COSHH Regulation 11",
              "Identify the four conditions that must be met before health surveillance is required",
              "Describe the substances listed in COSHH Schedule 6 and the medical surveillance they require",
              "Distinguish between the six types of health surveillance from initial assessment to biological monitoring",
              "Explain how spirometry works and interpret FEV1/FVC measurements in occupational health",
              "Describe the health surveillance process from pre-employment baseline to return-to-work assessment",
              "State the record-keeping requirements including the 40-year retention period",
              "Identify common electrician exposures that trigger health surveillance obligations",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-violet-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is Health Surveillance? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">01</span>
            What Is Health Surveillance?
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Health surveillance is a system of{" "}
                <strong>ongoing health checks</strong> designed to detect
                early signs of work-related ill health in employees who are
                exposed to hazardous substances. It is a legal requirement
                under <strong>COSHH Regulation 11</strong> when specific
                conditions are met.
              </p>

              <p>
                The fundamental purpose of health surveillance is{" "}
                <strong>prevention</strong>. It is not about diagnosing
                diseases after they have become established &mdash; it is
                about identifying the earliest possible indicators of harm
                so that action can be taken before the condition becomes
                serious, chronic, or irreversible.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Key Purposes of Health Surveillance
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Detect adverse health effects at an early stage
                      </strong>{" "}
                      &mdash; before they become disabling or irreversible
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Provide data to evaluate the effectiveness of
                        control measures
                      </strong>{" "}
                      &mdash; if workers are developing symptoms despite
                      controls being in place, those controls are inadequate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Identify individuals who may be at increased risk
                      </strong>{" "}
                      &mdash; for example, those who develop sensitisation
                      to a substance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Provide a feedback loop
                      </strong>{" "}
                      &mdash; surveillance results inform risk assessments,
                      triggering improvements to workplace conditions
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  COSHH Regulation 11 &mdash; The Legal Basis
                </p>
                <p className="text-sm text-white/80">
                  Regulation 11 states that an employer shall ensure that
                  employees who are, or are liable to be, exposed to a
                  substance hazardous to health are placed under{" "}
                  <strong className="text-violet-400">
                    appropriate health surveillance
                  </strong>{" "}
                  where it is appropriate for the protection of their health.
                  This is not discretionary &mdash; once the conditions
                  triggering health surveillance are met, it becomes a{" "}
                  <strong className="text-white">
                    legally enforceable duty
                  </strong>
                  .
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-500">
                    Health Surveillance ≠ Health Promotion:
                  </strong>{" "}
                  Health surveillance is specifically targeted at detecting
                  work-related ill health caused by hazardous substance
                  exposure. It is not general health screening (such as
                  blood pressure checks or lifestyle assessments). It must
                  be linked to specific workplace exposures identified in
                  the COSHH risk assessment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: When Health Surveillance Is Required */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">02</span>
            When Health Surveillance Is Required
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Health surveillance is not required for every hazardous
                substance exposure. It is required when{" "}
                <strong>all four of the following conditions</strong> are met
                simultaneously. If any one condition is absent, health
                surveillance is not legally required (although employers may
                still choose to provide it as good practice).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  The Four Conditions (All Must Be Met)
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Identifiable Disease or Adverse Health Effect
                      </p>
                      <p>
                        There must be a known disease or adverse health
                        effect that is associated with the substance in
                        question. For example, isocyanates are known to cause
                        occupational asthma; solvents are known to cause
                        dermatitis. If there is no identifiable health effect
                        linked to the substance, health surveillance cannot
                        be targeted.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Valid Technique to Detect the Disease or Effect
                      </p>
                      <p>
                        A reliable, validated method must exist to detect the
                        condition. For occupational asthma, serial peak
                        expiratory flow (PEF) measurement is a valid
                        technique. For dermatitis, structured skin inspection
                        is valid. If no reliable detection method exists for
                        a particular effect, surveillance cannot be
                        meaningfully conducted.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Reasonable Likelihood of Occurrence
                      </p>
                      <p>
                        The disease or effect must be reasonably likely to
                        occur under the actual conditions of work. This takes
                        into account the nature of the substance, the
                        exposure level, the duration and frequency of
                        exposure, and the effectiveness of existing controls.
                        If exposure is so minimal that the risk is
                        negligible, surveillance may not be justified.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Surveillance Is Likely to Further Protect Health
                      </p>
                      <p>
                        The surveillance must serve a genuine protective
                        purpose. There must be a realistic prospect that the
                        results of surveillance will lead to actions that
                        improve employee health &mdash; such as early
                        removal from exposure, improved controls, or medical
                        treatment. Surveillance that cannot lead to any
                        meaningful action is not required.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Common Mistake
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    Do not confuse &ldquo;reasonable likelihood&rdquo; with
                    certainty.
                  </strong>{" "}
                  Health surveillance does not require proof that employees
                  will develop ill health. It requires a{" "}
                  <strong className="text-white">
                    reasonable possibility
                  </strong>{" "}
                  that ill health could develop under the current working
                  conditions. If in doubt, the COSHH ACOP (Approved Code of
                  Practice) states that surveillance should be provided.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: COSHH Schedule 6 Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">03</span>
            COSHH Schedule 6 &mdash; Mandatory Medical Surveillance
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                COSHH Schedule 6 lists specific substances and processes
                where formal{" "}
                <strong>
                  medical surveillance by an Employment Medical Adviser (EMA)
                  or a doctor appointed by the HSE
                </strong>{" "}
                is mandatory. This is the highest level of health
                surveillance and requires examination by a qualified medical
                professional &mdash; not just a responsible person or
                occupational health nurse.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Key Schedule 6 Substances Relevant to Electricians
                </p>
                <div className="space-y-3">
                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-violet-400 font-bold text-sm mt-0.5 flex-shrink-0">
                        ISO
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Isocyanates
                        </p>
                        <p className="text-xs text-white/60 mt-0.5">
                          Spray-applied polyurethane foam insulation, two-part
                          adhesives, some paints. Can cause severe
                          occupational asthma. Medical surveillance required
                          before first exposure and at{" "}
                          <strong className="text-white/80">
                            intervals not exceeding 12 months
                          </strong>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-violet-400 font-bold text-sm mt-0.5 flex-shrink-0">
                        VCM
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Vinyl Chloride Monomer
                        </p>
                        <p className="text-xs text-white/60 mt-0.5">
                          Used in PVC manufacturing. Potential exposure
                          during work in plastics factories or when cutting
                          PVC at elevated temperatures. Known carcinogen
                          affecting the liver.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-violet-400 font-bold text-sm mt-0.5 flex-shrink-0">
                        Cr6+
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Hexavalent Chromium Compounds
                        </p>
                        <p className="text-xs text-white/60 mt-0.5">
                          Found in some electroplating processes, welding
                          fumes, and anti-corrosion coatings. Known
                          respiratory sensitiser and carcinogen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-500">
                    Schedule 6 vs General Health Surveillance:
                  </strong>{" "}
                  Schedule 6 medical surveillance is a specific legal
                  requirement that sits above the general health surveillance
                  duty in Regulation 11. If a substance is listed in
                  Schedule 6, medical surveillance by an EMA or appointed
                  doctor is mandatory regardless of the employer&rsquo;s own
                  assessment of risk. The employer cannot substitute a lower
                  level of surveillance (such as a questionnaire) for a
                  Schedule 6 substance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Types of Health Surveillance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">04</span>
            Types of Health Surveillance
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Health surveillance ranges from simple checks that can be
                performed by a trained non-medical person on site, through to
                complex clinical investigations by specialists. HSG61
                (Health Surveillance at Work) describes{" "}
                <strong>six levels</strong> of health surveillance, each
                appropriate to different circumstances.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  The Six Levels of Health Surveillance (COSHH Reg 11 / HSG61)
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Initial Assessment (Baseline)
                      </p>
                      <p>
                        Conducted <strong className="text-white">before exposure begins</strong>.
                        Establishes the worker&rsquo;s baseline health
                        status so that any future changes can be measured
                        against it. Includes a health questionnaire, basic
                        measurements (e.g. lung function), and a record of
                        any pre-existing conditions relevant to the
                        exposure. Without a baseline, it is impossible to
                        determine whether later findings are caused by work
                        or pre-date employment.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Skin Inspection
                      </p>
                      <p>
                        A <strong className="text-white">trained responsible person</strong>{" "}
                        (not necessarily a medical professional) carries out
                        regular visual inspections of exposed skin &mdash;
                        typically hands, wrists, and forearms. They look for
                        the early signs of contact dermatitis: dryness,
                        redness, cracking, itching, or blistering. Any
                        abnormalities are referred to an occupational health
                        professional. This is the most common surveillance
                        method for workers exposed to skin irritants and
                        sensitisers.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Respiratory Questionnaire
                      </p>
                      <p>
                        A standardised questionnaire administered by a{" "}
                        <strong className="text-white">trained person</strong>{" "}
                        to identify early symptoms of occupational asthma or
                        other respiratory conditions. Questions cover
                        wheeze, breathlessness, chest tightness, cough, and
                        whether symptoms improve on days away from work. A
                        &ldquo;yes&rdquo; answer to key questions triggers
                        referral to an occupational health professional for
                        further investigation.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Lung Function Testing (Spirometry)
                      </p>
                      <p>
                        Objective measurement of lung function using a{" "}
                        <strong className="text-white">spirometer</strong>.
                        The two key measurements are{" "}
                        <strong className="text-violet-400">FEV1</strong>{" "}
                        (Forced Expiratory Volume in 1 second) and{" "}
                        <strong className="text-violet-400">FVC</strong>{" "}
                        (Forced Vital Capacity). A baseline measurement is
                        taken before exposure, and periodic measurements
                        are compared against it. A declining trend or
                        abnormal ratio indicates developing airway disease.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Clinical Examination
                      </p>
                      <p>
                        A physical examination conducted by an{" "}
                        <strong className="text-white">
                          occupational health professional
                        </strong>{" "}
                        (doctor or specialist nurse). This goes beyond
                        questionnaires and basic measurements to include a
                        thorough clinical assessment. Used for substances
                        that cause systemic effects (affecting organs beyond
                        the point of initial contact) and for all COSHH
                        Schedule 6 substances.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      6
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Biological Effect Monitoring
                      </p>
                      <p>
                        Laboratory analysis of{" "}
                        <strong className="text-white">
                          blood or urine samples
                        </strong>{" "}
                        to measure the level of a hazardous substance (or
                        its metabolites) in the body, or to detect
                        biological effects of exposure. For example, blood
                        lead levels for lead exposure, or urine
                        toluene-diamine levels for isocyanate exposure.
                        This provides objective, quantifiable evidence of
                        absorption and is the most precise form of
                        surveillance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-500">Choosing the Right Level:</strong>{" "}
                  The appropriate level of health surveillance depends on the
                  substance, the severity of the potential health effect, the
                  exposure level, and whether the substance is listed in COSHH
                  Schedule 6. The COSHH risk assessment should specify which
                  level of surveillance is required for each exposure.
                  Multiple levels may be used together &mdash; for example,
                  a respiratory questionnaire combined with spirometry for
                  workers exposed to respiratory sensitisers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: How Health Surveillance Works in Practice */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">05</span>
            How Health Surveillance Works in Practice
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Health surveillance is not a one-off event &mdash; it is an{" "}
                <strong>ongoing programme</strong> that begins before
                exposure starts and continues for as long as the employee
                remains at risk. The programme follows a structured cycle
                from baseline through periodic monitoring to action when
                abnormalities are detected.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  The Health Surveillance Cycle
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Pre-Employment / Pre-Exposure Baseline
                      </p>
                      <p>
                        Before the employee begins work involving hazardous
                        substance exposure, a baseline health assessment is
                        conducted. This records the worker&rsquo;s current
                        health status including any pre-existing conditions
                        (e.g. childhood asthma, eczema). Baseline
                        spirometry is performed if respiratory surveillance
                        is required. This baseline is the reference point
                        for all future comparisons.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Periodic Checks
                      </p>
                      <p>
                        Regular health checks are conducted at intervals
                        determined by the substance and risk level. For
                        isocyanates (Schedule 6), medical surveillance is
                        required{" "}
                        <strong className="text-white">
                          at least every 12 months
                        </strong>
                        . For skin surveillance, inspections may be weekly
                        or monthly depending on the risk. For respiratory
                        questionnaires, 6&ndash;12 monthly intervals are
                        typical. The COSHH risk assessment specifies the
                        frequency.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Return-to-Work Assessment
                      </p>
                      <p>
                        When an employee returns after a period of illness
                        &mdash; particularly illness that may be
                        work-related &mdash; a return-to-work health
                        assessment determines whether they can safely resume
                        the same exposure level. Adjustments may include
                        temporary or permanent redeployment, enhanced
                        controls, reduced exposure duration, or additional
                        PPE.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-red-400 font-medium">
                        Referral Pathway When Abnormalities Are Detected
                      </p>
                      <p>
                        <strong className="text-white">
                          If any surveillance check reveals an abnormality,
                        </strong>{" "}
                        the employee must be referred to an occupational
                        health professional without delay. The referral
                        pathway typically follows this sequence: responsible
                        person identifies abnormality &rarr; occupational
                        health nurse assessment &rarr; occupational health
                        physician review &rarr; specialist referral if
                        needed &rarr; employee removed from exposure pending
                        investigation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical: Do Not Wait
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    Employees should not wait for a scheduled surveillance
                    appointment if they develop symptoms between checks.
                  </strong>{" "}
                  Any worker who develops breathing difficulties, persistent
                  cough, skin irritation, or other symptoms that may be
                  work-related should report immediately to their supervisor
                  and be referred to occupational health. Health surveillance
                  appointments are scheduled checks &mdash; they do not
                  replace the duty to report symptoms as they arise.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Styled-Div Diagram: Health Surveillance Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">
              &mdash;
            </span>
            Health Surveillance Process
          </h2>
          <div className="bg-white/5 border border-violet-500/30 rounded-xl p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[300px] max-w-lg mx-auto space-y-3">
              {/* Step 1: COSHH Assessment */}
              <div className="border-2 border-violet-500/40 rounded-lg bg-violet-500/10 p-3 sm:p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <ClipboardList className="h-4 w-4 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">
                    COSHH Risk Assessment
                  </p>
                </div>
                <p className="text-[10px] sm:text-xs text-white/60">
                  Identifies substances &amp; exposures requiring surveillance
                </p>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-4 bg-violet-500/30" />
              </div>

              {/* Step 2: Baseline */}
              <div className="border-2 border-violet-500/30 rounded-lg bg-[#2a2a2a] p-3 sm:p-4 text-center">
                <p className="text-sm font-medium text-white mb-1">
                  Pre-Exposure Baseline
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="text-[9px] sm:text-[10px] text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    Health questionnaire
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    Baseline spirometry
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    Skin baseline
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-4 bg-violet-500/30" />
              </div>

              {/* Step 3: Periodic Surveillance */}
              <div className="border-2 border-violet-500/30 rounded-lg bg-[#2a2a2a] p-3 sm:p-4">
                <p className="text-sm font-medium text-white mb-2 text-center">
                  Periodic Surveillance
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-violet-500/10 border border-violet-500/20 rounded p-2 text-center">
                    <p className="text-[10px] sm:text-xs text-violet-400 font-medium">
                      Skin Checks
                    </p>
                    <p className="text-[9px] text-white/50">
                      Weekly &ndash; monthly
                    </p>
                  </div>
                  <div className="bg-violet-500/10 border border-violet-500/20 rounded p-2 text-center">
                    <p className="text-[10px] sm:text-xs text-violet-400 font-medium">
                      Questionnaire
                    </p>
                    <p className="text-[9px] text-white/50">
                      6 &ndash; 12 monthly
                    </p>
                  </div>
                  <div className="bg-violet-500/10 border border-violet-500/20 rounded p-2 text-center">
                    <p className="text-[10px] sm:text-xs text-violet-400 font-medium">
                      Spirometry
                    </p>
                    <p className="text-[9px] text-white/50">
                      6 &ndash; 12 monthly
                    </p>
                  </div>
                  <div className="bg-violet-500/10 border border-violet-500/20 rounded p-2 text-center">
                    <p className="text-[10px] sm:text-xs text-violet-400 font-medium">
                      Schedule 6 Medical
                    </p>
                    <p className="text-[9px] text-white/50">
                      At least 12 monthly
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-4 bg-violet-500/30" />
              </div>

              {/* Step 4: Decision Point */}
              <div className="flex gap-3">
                <div className="flex-1 border-2 border-green-500/30 rounded-lg bg-green-500/10 p-3 text-center">
                  <p className="text-xs font-medium text-green-400 mb-1">
                    Normal Results
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-white/50">
                    Continue periodic surveillance at scheduled intervals
                  </p>
                </div>
                <div className="flex-1 border-2 border-red-500/30 rounded-lg bg-red-500/10 p-3 text-center">
                  <p className="text-xs font-medium text-red-400 mb-1">
                    Abnormal Results
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-white/50">
                    Referral &rarr; investigation &rarr; action
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-4 bg-red-500/30" />
              </div>

              {/* Step 5: Action */}
              <div className="border-2 border-red-500/40 rounded-lg bg-red-500/10 p-3 sm:p-4">
                <p className="text-sm font-medium text-red-400 mb-2 text-center">
                  Employer Must Act on Results
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="text-[9px] sm:text-[10px] text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    Remove from exposure
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    Improve controls
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    Review risk assessment
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    RIDDOR report
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Record Keeping */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">06</span>
            Record Keeping
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>COSHH Regulation 11(4)</strong> imposes strict
                requirements on how health surveillance records are
                maintained, stored, and made available. Because occupational
                diseases can take decades to manifest, the retention
                requirements are amongst the longest in UK health and safety
                law.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  What Must Be Recorded
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Employee&rsquo;s name and date of birth
                      </strong>{" "}
                      &mdash; for positive identification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Gender and National Insurance number
                      </strong>{" "}
                      &mdash; for traceability if the employee changes
                      employer
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Date of each health surveillance procedure
                      </strong>{" "}
                      &mdash; when each check was performed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Name of the person conducting the surveillance
                      </strong>{" "}
                      &mdash; responsible person, nurse, or doctor
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        The result of the surveillance
                      </strong>{" "}
                      &mdash; recorded as &ldquo;fit&rdquo;, &ldquo;fit with
                      conditions&rdquo;, or &ldquo;unfit&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        The hazardous substance(s) involved
                      </strong>{" "}
                      &mdash; what the employee was exposed to
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardList className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">
                    40-Year Retention Period
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Individual health surveillance records must be kept for{" "}
                  <strong className="text-violet-400">
                    at least 40 years
                  </strong>{" "}
                  from the date of the last entry. If the employer ceases to
                  trade, the records must be offered to the HSE for
                  safekeeping. This is one of the longest record-retention
                  periods in UK law and reflects the long latency of many
                  occupational diseases. The 40-year period ensures records
                  remain available for diagnosis, compensation claims,
                  and epidemiological research long after the employee has
                  left the organisation.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Access Rights &amp; Data Protection
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Employee access:
                      </strong>{" "}
                      Each employee has the right to see their own health
                      surveillance records upon request. The employer must
                      make records available without unreasonable delay.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        HSE access:
                      </strong>{" "}
                      An HSE inspector may require the employer to produce
                      health surveillance records during an inspection or
                      investigation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Data Protection Act 2018 / UK GDPR:
                      </strong>{" "}
                      Health surveillance records are{" "}
                      <strong className="text-white">
                        special category data
                      </strong>{" "}
                      (health data). They must be processed lawfully, stored
                      securely, and access must be restricted to authorised
                      persons. The employer must have a lawful basis for
                      processing (typically &ldquo;legal obligation&rdquo;
                      under COSHH) and must comply with all UK GDPR
                      requirements including data minimisation, storage
                      limitation (subject to the 40-year rule), and the
                      individual&rsquo;s rights of access.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Confidentiality:
                      </strong>{" "}
                      Clinical details (specific diagnoses, test values)
                      are confidential to the occupational health provider.
                      The employer is only entitled to the fitness
                      outcome &mdash; &ldquo;fit&rdquo;, &ldquo;fit with
                      conditions&rdquo;, or &ldquo;unfit&rdquo; &mdash;
                      not the underlying medical details.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Styled-Div Diagram: Spirometry Normal vs Abnormal */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">
              &mdash;
            </span>
            Spirometry &mdash; Normal vs Abnormal Patterns
          </h2>
          <div className="bg-white/5 border border-violet-500/30 rounded-xl p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[300px] max-w-xl mx-auto">
              {/* Explanation Header */}
              <div className="mb-4 text-center">
                <p className="text-sm text-white/80 mb-1">
                  Spirometry measures how much air you can blow out and how
                  fast. The two key values are:
                </p>
                <div className="flex flex-wrap gap-3 justify-center mt-2">
                  <span className="text-xs text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-1 rounded">
                    <strong>FEV1</strong> = Volume in 1st second
                  </span>
                  <span className="text-xs text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-1 rounded">
                    <strong>FVC</strong> = Total forced volume
                  </span>
                  <span className="text-xs text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-1 rounded">
                    <strong>Ratio</strong> = FEV1 &divide; FVC
                  </span>
                </div>
              </div>

              {/* Three Patterns */}
              <div className="space-y-3">
                {/* Normal */}
                <div className="border-2 border-green-500/30 rounded-lg bg-green-500/5 p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <p className="text-sm font-medium text-green-400">
                      Normal Pattern
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-green-500/10 rounded p-2">
                      <p className="text-[10px] text-white/50">FEV1</p>
                      <p className="text-sm font-bold text-green-400">
                        Normal
                      </p>
                    </div>
                    <div className="bg-green-500/10 rounded p-2">
                      <p className="text-[10px] text-white/50">FVC</p>
                      <p className="text-sm font-bold text-green-400">
                        Normal
                      </p>
                    </div>
                    <div className="bg-green-500/10 rounded p-2">
                      <p className="text-[10px] text-white/50">Ratio</p>
                      <p className="text-sm font-bold text-green-400">
                        &gt; 0.70
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-white/50 mt-2">
                    Both values within predicted range for age, sex, and
                    height. Ratio above 0.70 &mdash; no obstruction.
                  </p>
                </div>

                {/* Obstructive */}
                <div className="border-2 border-red-500/30 rounded-lg bg-red-500/5 p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <p className="text-sm font-medium text-red-400">
                      Obstructive Pattern (e.g. Occupational Asthma)
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-red-500/10 rounded p-2">
                      <p className="text-[10px] text-white/50">FEV1</p>
                      <p className="text-sm font-bold text-red-400">
                        Reduced
                      </p>
                    </div>
                    <div className="bg-white/5 rounded p-2">
                      <p className="text-[10px] text-white/50">FVC</p>
                      <p className="text-sm font-bold text-white/60">
                        Normal/Near
                      </p>
                    </div>
                    <div className="bg-red-500/10 rounded p-2">
                      <p className="text-[10px] text-white/50">Ratio</p>
                      <p className="text-sm font-bold text-red-400">
                        &lt; 0.70
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-white/50 mt-2">
                    Airways are narrowed &mdash; air cannot be expelled
                    quickly. FEV1 drops disproportionately. Key indicator
                    for occupational asthma from isocyanates, colophony, etc.
                  </p>
                </div>

                {/* Restrictive */}
                <div className="border-2 border-amber-500/30 rounded-lg bg-amber-500/5 p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">
                      Restrictive Pattern (e.g. Pulmonary Fibrosis)
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-amber-500/10 rounded p-2">
                      <p className="text-[10px] text-white/50">FEV1</p>
                      <p className="text-sm font-bold text-amber-400">
                        Reduced
                      </p>
                    </div>
                    <div className="bg-amber-500/10 rounded p-2">
                      <p className="text-[10px] text-white/50">FVC</p>
                      <p className="text-sm font-bold text-amber-400">
                        Reduced
                      </p>
                    </div>
                    <div className="bg-white/5 rounded p-2">
                      <p className="text-[10px] text-white/50">Ratio</p>
                      <p className="text-sm font-bold text-white/60">
                        Normal/High
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-white/50 mt-2">
                    Lungs cannot fully expand &mdash; total volume is
                    reduced. Both FEV1 and FVC decrease proportionally,
                    keeping the ratio preserved or elevated.
                  </p>
                </div>
              </div>

              {/* Key Takeaway */}
              <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3 mt-3">
                <p className="text-xs sm:text-sm text-white/80">
                  <strong className="text-violet-400">Key point:</strong> A{" "}
                  <strong className="text-white">declining trend</strong> in
                  FEV1 over successive spirometry tests is as important as
                  any single abnormal reading. Even if all individual
                  readings remain within normal limits, a consistent
                  downward trend may indicate developing airway disease.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Occupational Asthma & Dermatitis Surveillance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">07</span>
            Occupational Asthma &amp; Dermatitis Surveillance
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Occupational asthma and contact dermatitis are the two most
                common occupational diseases that health surveillance under
                COSHH is designed to detect. Both are highly relevant to
                electricians.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HeartPulse className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">
                    Occupational Asthma Surveillance
                  </p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <p>
                    Occupational asthma is caused by{" "}
                    <strong className="text-white">sensitisation</strong> to
                    a workplace substance. Once sensitised, the worker will
                    react to extremely low levels of the substance &mdash;
                    often far below the WEL. Sensitisation is usually{" "}
                    <strong className="text-white">irreversible</strong>.
                  </p>

                  <div className="bg-violet-500/10 border border-violet-500/20 rounded p-3">
                    <p className="text-xs font-medium text-violet-400 mb-2">
                      Surveillance Methods for Occupational Asthma
                    </p>
                    <ul className="space-y-1.5 text-xs text-white/70">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Respiratory questionnaire:
                          </strong>{" "}
                          Standardised questions about wheeze,
                          breathlessness, chest tightness, and whether
                          symptoms improve on rest days. Administered
                          6&ndash;12 monthly.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Peak flow diary:
                          </strong>{" "}
                          The worker records peak expiratory flow (PEF)
                          readings at least four times per day over a minimum
                          of 2&ndash;4 weeks, including both work days and
                          rest days. A pattern where PEF drops during work
                          periods and improves on rest days is strongly
                          suggestive of occupational asthma.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Serial PEF analysis:
                          </strong>{" "}
                          Specialist software (e.g. OASYS) is used to
                          analyse the peak flow diary data and determine
                          whether a work-related pattern exists. This
                          provides objective evidence for diagnosis.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Specific IgE testing:
                          </strong>{" "}
                          A blood test measuring specific immunoglobulin E
                          antibodies to the suspected sensitiser. A positive
                          result confirms sensitisation to the substance.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Spirometry:
                          </strong>{" "}
                          FEV1/FVC measurements taken at baseline and
                          periodically. A declining FEV1 or a reduced
                          FEV1/FVC ratio (&lt; 0.70) supports an obstructive
                          pattern consistent with asthma.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
                    <p className="text-xs text-white/80">
                      <strong className="text-red-400">
                        Electrician risk:
                      </strong>{" "}
                      Electricians working with or near{" "}
                      <strong className="text-white">
                        spray-applied polyurethane foam insulation
                      </strong>{" "}
                      (containing isocyanates) and those{" "}
                      <strong className="text-white">
                        soldering with rosin-cored solder
                      </strong>{" "}
                      (releasing colophony/rosin fumes) are at particular
                      risk. Both isocyanates and colophony are potent
                      respiratory sensitisers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HeartPulse className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">
                    Dermatitis Surveillance
                  </p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <p>
                    Occupational contact dermatitis is inflammation of the
                    skin caused by direct contact with a hazardous substance.
                    It is the{" "}
                    <strong className="text-white">
                      most common occupational skin disease
                    </strong>{" "}
                    and affects electricians who handle solvents, fluxes,
                    adhesives, oils, and cement.
                  </p>

                  <div className="bg-violet-500/10 border border-violet-500/20 rounded p-3">
                    <p className="text-xs font-medium text-violet-400 mb-2">
                      The DERM Checklist
                    </p>
                    <p className="text-xs text-white/70 mb-2">
                      A structured skin inspection framework used by trained
                      responsible persons:
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2">
                        <span className="text-violet-400 font-bold text-xs mt-0 flex-shrink-0 w-5">
                          D
                        </span>
                        <span className="text-xs text-white/70">
                          <strong className="text-white">Dryness</strong>{" "}
                          &mdash; skin feels dry, tight, or rough to the
                          touch
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-violet-400 font-bold text-xs mt-0 flex-shrink-0 w-5">
                          E
                        </span>
                        <span className="text-xs text-white/70">
                          <strong className="text-white">Erythema</strong>{" "}
                          &mdash; redness of the skin, indicating
                          inflammation
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-violet-400 font-bold text-xs mt-0 flex-shrink-0 w-5">
                          R
                        </span>
                        <span className="text-xs text-white/70">
                          <strong className="text-white">Roughness</strong>{" "}
                          &mdash; skin texture has changed, feels coarse or
                          scaly
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-violet-400 font-bold text-xs mt-0 flex-shrink-0 w-5">
                          M
                        </span>
                        <span className="text-xs text-white/70">
                          <strong className="text-white">Marks</strong>{" "}
                          &mdash; cracks, fissures, blisters, or weeping
                          areas
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded p-3">
                    <p className="text-xs font-medium text-white mb-2">
                      Skin Inspection Programme
                    </p>
                    <ul className="space-y-1.5 text-xs text-white/70">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Inspect <strong className="text-white">hands, wrists, and forearms</strong>{" "}
                          &mdash; the areas most commonly in contact with
                          hazardous substances
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Frequency: <strong className="text-white">weekly to monthly</strong>{" "}
                          depending on risk level and substance
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Look between fingers and around nail beds where
                          dermatitis often begins
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Compare left and right hands &mdash; asymmetric
                          changes may indicate contact dermatitis from a
                          specific work task
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Any abnormality</strong>{" "}
                          triggers referral to occupational health &mdash;
                          do not wait for the next scheduled check
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Duties and Electrician Exposures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">08</span>
            Employee &amp; Employer Duties, and Electrician-Specific
            Exposures
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Health surveillance is a{" "}
                <strong>shared responsibility</strong>. The employer has
                duties to provide, fund, and act on the results of health
                surveillance. The employee has a duty to attend and
                co-operate.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Employer&rsquo;s Duties
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Identify when health surveillance is required
                      </strong>{" "}
                      through the COSHH risk assessment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Arrange and fund all health surveillance
                      </strong>{" "}
                      &mdash; appointments, tests, specialist referrals,
                      and employee time to attend
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Act on the results:
                      </strong>{" "}
                      if surveillance reveals ill health, the employer must
                      take immediate action &mdash; which may include
                      removing the employee from further exposure,
                      investigating the cause, improving control measures,
                      reviewing the risk assessment, and reporting to the
                      HSE under RIDDOR if the condition is work-related
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Consider redeployment
                      </strong>{" "}
                      &mdash; if the employee can no longer safely work
                      with the substance, alternative duties must be
                      explored. Dismissal is a last resort, not a first
                      response.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Maintain records for 40 years
                      </strong>{" "}
                      and make them available to the employee and the HSE
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Review the surveillance programme
                      </strong>{" "}
                      whenever the risk assessment changes, new substances
                      are introduced, or surveillance results indicate
                      that current arrangements are inadequate
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  Employee&rsquo;s Duties
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Attend health surveillance
                      </strong>{" "}
                      when it has been identified as necessary &mdash; this
                      is a legal duty under COSHH Regulation 11(5)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Co-operate with the surveillance process
                      </strong>{" "}
                      &mdash; answer questionnaires honestly, perform
                      spirometry tests as instructed, and present skin for
                      inspection when requested
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Report symptoms promptly
                      </strong>{" "}
                      &mdash; do not wait for the next scheduled check if
                      you develop breathing difficulties, skin irritation,
                      or other symptoms that may be work-related
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Follow any restrictions
                      </strong>{" "}
                      imposed as a result of surveillance &mdash; such as
                      avoiding certain substances or using additional PPE
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-500 mb-3">
                  Electrician-Specific Exposures Requiring Health Surveillance
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-violet-400 font-bold text-sm mt-0.5 flex-shrink-0">
                        1
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Isocyanate Exposure (Spray Foam Insulation)
                        </p>
                        <p className="text-xs text-white/60 mt-0.5">
                          COSHH Schedule 6 substance. Requires medical
                          surveillance by an appointed doctor before first
                          exposure and at least annually. Causes severe
                          occupational asthma. Electricians installing
                          wiring in buildings where spray foam insulation is
                          being applied, or working in recently sprayed
                          areas, are at risk.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-violet-400 font-bold text-sm mt-0.5 flex-shrink-0">
                        2
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Colophony / Rosin Fumes (Soldering)
                        </p>
                        <p className="text-xs text-white/60 mt-0.5">
                          Rosin-cored solder releases colophony fumes when
                          heated. Colophony is a potent respiratory
                          sensitiser that can cause occupational asthma.
                          Surveillance includes respiratory questionnaire,
                          spirometry, and peak flow diary if symptoms are
                          suspected. Affects electricians doing regular
                          soldering work, cable jointing, and PCB repair.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-violet-400 font-bold text-sm mt-0.5 flex-shrink-0">
                        3
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Solvent Exposure (Cable Jointing &amp; Cleaning)
                        </p>
                        <p className="text-xs text-white/60 mt-0.5">
                          Solvents used in cable jointing compounds,
                          adhesives, degreasers, and cleaning agents can
                          cause dermatitis through skin contact and
                          neurological effects through inhalation. Skin
                          surveillance (DERM checklist) and possibly
                          biological monitoring may be required depending
                          on the specific solvents and exposure levels.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-violet-400 font-bold text-sm mt-0.5 flex-shrink-0">
                        4
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          Epoxy Resins (Cable Joints &amp; Encapsulation)
                        </p>
                        <p className="text-xs text-white/60 mt-0.5">
                          Two-part epoxy resins used in cable joints and
                          electrical encapsulation are potent skin
                          sensitisers. Once sensitised, even trace contact
                          can trigger severe dermatitis. Skin surveillance
                          with the DERM checklist is appropriate. Some
                          hardeners also contain isocyanates, triggering
                          Schedule 6 medical surveillance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Employer&rsquo;s Duty to Investigate
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    If health surveillance reveals that an employee has
                    developed a condition linked to workplace exposure, the
                    employer must not simply note the result and carry on.
                  </strong>{" "}
                  The employer is required to investigate the cause, review
                  and improve control measures, consider whether other
                  employees may also be affected, and report the condition
                  under RIDDOR if it is work-related. Failure to act on
                  health surveillance results defeats the entire purpose
                  of the programme and may constitute a breach of COSHH
                  Regulation 11.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 2 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-5-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Workplace Monitoring
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-5-section-3">
              Next: Emergency Procedures
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
