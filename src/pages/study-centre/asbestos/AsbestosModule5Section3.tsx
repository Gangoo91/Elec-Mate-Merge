import { ArrowLeft, HeartPulse, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "health-surveillance-frequency",
    question:
      "How often must licensed asbestos workers undergo a mandatory medical examination?",
    options: [
      "Every 2 years, as required by Regulation 22 of CAR 2012",
      "Every year, arranged by the employer",
      "Every 5 years, by their own GP",
      "Only once, before they begin licensed work",
    ],
    correctIndex: 0,
    explanation:
      "Regulation 22 of the Control of Asbestos Regulations 2012 requires licensed asbestos workers to undergo a medical examination every 2 years. This examination must be carried out by an HSE-appointed doctor (EMAS) and includes a respiratory questionnaire, physical examination, and lung function tests. The employer must arrange and pay for these examinations.",
  },
  {
    id: "screening-limitation",
    question:
      "What is the key limitation of health screening for asbestos-related diseases?",
    options: [
      "Screening can detect disease early but CANNOT prevent it — the only prevention is avoiding exposure",
      "Screening is 100% effective at detecting all asbestos-related diseases at any stage",
      "Screening can reverse the effects of asbestos exposure if caught early enough",
      "Screening is only useful for workers currently exposed, not those with past exposure",
    ],
    correctIndex: 0,
    explanation:
      "Health screening for asbestos-related diseases is about early detection, not prevention. Screening cannot prevent disease from developing — once asbestos fibres are inhaled, the damage is done. The only true prevention is avoiding exposure entirely. However, early detection through screening can lead to earlier treatment, better management of symptoms, and timely access to support and compensation.",
  },
  {
    id: "record-retention",
    question:
      "How long must health records for asbestos-exposed workers be kept?",
    options: [
      "40 years from the date of the last entry",
      "10 years from the date of last exposure",
      "25 years from the worker's date of birth",
      "Until the worker retires from the industry",
    ],
    correctIndex: 0,
    explanation:
      "Health records for asbestos-exposed workers must be kept for 40 years from the date of the last entry. This extremely long retention period reflects the fact that asbestos-related diseases can take 15 to 60 years to develop after exposure. If the employer ceases trading, the records must be transferred to the HSE for safekeeping. Workers also have the right to access their own health records at any time.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "I was exposed to asbestos years ago but never told my GP. Is it too late?",
    answer:
      "It is never too late to inform your GP about past asbestos exposure. Asbestos-related diseases can take 15 to 60 years to develop, so even exposure from decades ago is still highly relevant. Your GP should record the exposure in your medical notes, which ensures that any future symptoms — such as persistent cough, breathlessness, or chest pain — are investigated with asbestos exposure in mind. Your GP can also arrange baseline lung function tests and chest imaging to establish a reference point for future monitoring.",
  },
  {
    question:
      "Does health surveillance mean I am safe from asbestos-related disease?",
    answer:
      "No. Health surveillance is about early detection — it cannot prevent asbestos-related disease. Once asbestos fibres have been inhaled, they remain in the lungs permanently, and the body's response to them can lead to disease years or decades later. Surveillance monitors your health over time so that any changes can be detected as early as possible, allowing earlier treatment and better management. The only true prevention is avoiding exposure to asbestos fibres in the first place.",
  },
  {
    question:
      "What compensation is available if I am diagnosed with an asbestos-related disease?",
    answer:
      "Several routes exist. Industrial Injuries Disablement Benefit (IIDB) is a government benefit available to workers disabled by asbestos-related diseases including asbestosis and mesothelioma. Civil claims allow workers or their families to sue the employer for negligence, with no time limit for mesothelioma claims. The Diffuse Mesothelioma Payment Scheme (DMPS) provides government payments where the employer or insurer cannot be traced. Specialist asbestos disease solicitors can advise on the best route — many operate on a no-win-no-fee basis.",
  },
  {
    question:
      "What happens to my health records if my employer goes out of business?",
    answer:
      "If your employer ceases trading, they are legally required to offer your health records to the HSE for safekeeping. The HSE will store the records for the remainder of the 40-year retention period. You also have the right to request copies of your own health records at any time, and it is good practice to keep your own personal copies of medical examination results, exposure records, and certificates of fitness. These records are essential for any future compensation claims and for informing your GP about your exposure history.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Under Regulation 22 of CAR 2012, how often must licensed asbestos workers undergo a medical examination?",
    options: [
      "Every year",
      "Every 2 years",
      "Every 3 years",
      "Every 5 years",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 22 of CAR 2012 requires licensed asbestos workers to undergo a medical examination every 2 years. The examination must be conducted by an HSE-appointed doctor or a doctor experienced in asbestos-related disease. The employer must arrange and pay for these examinations.",
  },
  {
    id: 2,
    question:
      "Which of the following is included in a standard medical examination for asbestos-exposed workers?",
    options: [
      "Blood tests for asbestos antibodies",
      "Spirometry to measure lung capacity and airflow (FEV1 and FVC)",
      "Full-body MRI scan",
      "Genetic testing for asbestos susceptibility",
    ],
    correctAnswer: 1,
    explanation:
      "Spirometry (measuring FEV1 and FVC) is a standard component of medical examinations for asbestos-exposed workers. It measures lung capacity and airflow, helping to detect early signs of asbestosis or other lung damage. The examination also includes a respiratory questionnaire, physical examination (including checking for finger clubbing), and may include chest imaging if concerns are identified.",
  },
  {
    id: 3,
    question:
      "Who is entitled to see the full medical details from an asbestos worker's health surveillance examination?",
    options: [
      "The employer receives the full medical details",
      "Only the worker and the examining doctor — the employer receives only a fitness/unfitness certificate",
      "The HSE receives the full medical details automatically",
      "All colleagues on the same site receive the results",
    ],
    correctAnswer: 1,
    explanation:
      "Medical examination results are confidential. The employer receives only a certificate of fitness or unfitness — they do not receive the full medical details. The worker has the right to see their own results, and the examining doctor retains the clinical records. This confidentiality is essential to encourage workers to participate openly in health surveillance without fear of employment consequences.",
  },
  {
    id: 4,
    question:
      "For how long must health records for asbestos-exposed workers be retained?",
    options: [
      "10 years from the date of last exposure",
      "25 years from the date of diagnosis",
      "40 years from the date of the last entry",
      "Indefinitely — they must never be destroyed",
    ],
    correctAnswer: 2,
    explanation:
      "Health records must be kept for 40 years from the date of the last entry. This extremely long retention period exists because asbestos-related diseases can take 15 to 60 years to develop. If the employer ceases trading, the records must be transferred to the HSE. Workers have the right to access their own records at any time.",
  },
  {
    id: 5,
    question:
      "What is the current status of screening for mesothelioma?",
    options: [
      "A reliable blood test exists that can detect mesothelioma at any stage",
      "No reliable screening test currently exists — diagnosis is usually based on symptoms",
      "Annual chest X-rays can reliably detect mesothelioma before symptoms appear",
      "CT scans are 100% effective at early mesothelioma detection",
    ],
    correctAnswer: 1,
    explanation:
      "There is currently no reliable screening test for mesothelioma. Diagnosis is usually made when symptoms appear — such as breathlessness, chest pain, or unexplained weight loss. This is one reason why mesothelioma is often diagnosed at an advanced stage. Research into early detection methods is ongoing, but prevention (avoiding asbestos exposure) remains the most important strategy.",
  },
  {
    id: 6,
    question:
      "What government scheme exists for mesothelioma sufferers who cannot trace their employer or the employer's insurer?",
    options: [
      "The Asbestos Workers' Relief Fund",
      "The Diffuse Mesothelioma Payment Scheme (DMPS)",
      "The National Asbestos Compensation Board",
      "The HSE Emergency Compensation Scheme",
    ],
    correctAnswer: 1,
    explanation:
      "The Diffuse Mesothelioma Payment Scheme (DMPS) is a government scheme that provides lump-sum payments to mesothelioma sufferers (or their dependants) who cannot trace the employer responsible for their asbestos exposure or that employer's insurer. This scheme exists because many companies that used asbestos heavily have since ceased trading or their insurers can no longer be identified.",
  },
  {
    id: 7,
    question:
      "Within what time limit must most civil claims for asbestos-related disease be brought?",
    options: [
      "Within 1 year of diagnosis",
      "Within 3 years of diagnosis (but exceptions exist)",
      "Within 10 years of the last exposure",
      "There is no time limit for any asbestos-related claim",
    ],
    correctAnswer: 1,
    explanation:
      "Most civil claims for asbestos-related disease must be brought within 3 years of diagnosis. However, there are important exceptions — mesothelioma claims have no time limit, and courts can exercise discretion to allow late claims in exceptional circumstances. Given the long latency period of asbestos-related diseases (15–60 years), these time limits can be complex, and specialist legal advice is strongly recommended.",
  },
  {
    id: 8,
    question:
      "Which of the following should a worker do if they were exposed to asbestos in the past?",
    options: [
      "Nothing — if they feel well, there is no need to take any action",
      "Inform their GP, who should record the exposure and arrange baseline lung function tests",
      "Self-refer to a hospital emergency department for immediate scanning",
      "Only contact a doctor if they develop breathing problems within 5 years of exposure",
    ],
    correctAnswer: 1,
    explanation:
      "Anyone who has been exposed to asbestos — even decades ago — should inform their GP. The GP should record the exposure in the patient's medical notes, which ensures that any future symptoms are investigated with asbestos in mind. The GP can arrange baseline lung function tests and chest imaging to establish a reference point. Asbestos-related diseases can take 15 to 60 years to develop, so exposure from any point in the past is still clinically relevant.",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

const AsbestosModule5Section3 = () => {
  useSEO({
    title:
      "Health Surveillance & Medical Monitoring | Asbestos Awareness Module 5 Section 3",
    description:
      "Learn about health surveillance requirements for asbestos-exposed workers, medical examination content, screening for asbestos-related diseases, GP notification, record keeping, and compensation routes.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* ─── Sticky Header ─── */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── Article ─── */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── Hero ─── */}
        <div className="mb-12 text-center">
          <HeartPulse className="h-10 w-10 text-orange-500 mx-auto mb-4" />
          <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 5 &middot; SECTION 3
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Health Surveillance &amp; Medical Monitoring
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Understanding who needs health surveillance, what medical examinations
            involve, how to screen for asbestos-related diseases, and the
            compensation routes available to affected workers
          </p>
        </div>

        {/* ─── 01 Who Needs Health Surveillance? ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-orange-400/80 text-sm font-normal">01</span>
            Who Needs Health Surveillance?
          </h2>
          <div className="space-y-4 text-white">
            <p>
              Health surveillance is a legal requirement for certain categories of
              asbestos workers. Its purpose is <strong>early detection</strong> of
              asbestos-related disease &mdash; it cannot prevent disease, but it
              can detect it sooner, leading to earlier treatment, better symptom
              management, and timely access to support and compensation.
            </p>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-lg p-3 sm:p-4 bg-orange-500/10 border-l-2 border-l-orange-500/50 border border-orange-500/30">
                <p className="font-semibold text-base text-orange-400 mb-2">
                  Licensed Asbestos Workers
                </p>
                <ul className="text-base text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Mandatory medical examination every 2 years</strong>{" "}
                      as required by Regulation 22 of CAR 2012
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Examination must be by an <strong>HSE-appointed doctor</strong>{" "}
                      (EMAS) or a doctor experienced in asbestos-related disease
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong>Employers must arrange and pay</strong> for health
                      surveillance where required
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-orange-500/10 border-l-2 border-l-orange-500/50 border border-orange-500/30">
                <p className="font-semibold text-base text-orange-400 mb-2">
                  NNLW Workers &amp; Past Exposure
                </p>
                <ul className="text-base text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      NNLW workers: <strong>health records must be kept for 40
                      years</strong> and medical surveillance is required
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Anyone with <strong>past significant exposure</strong> should
                      inform their GP and request monitoring
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Asbestos-related diseases can take <strong>15 to 60
                      years</strong> to develop &mdash; past exposure is always
                      relevant
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <h3 className="font-semibold text-orange-300">
                  Surveillance Detects &mdash; It Does Not Prevent
                </h3>
              </div>
              <p className="text-white/80 text-sm">
                Health surveillance is about <strong className="text-white">
                early detection</strong>, not prevention. Once asbestos fibres
                have been inhaled, they remain in the lungs permanently. No medical
                examination can remove them or reverse the damage. The only true
                prevention is <strong className="text-white">avoiding exposure to
                asbestos fibres in the first place</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 02 Medical Examination Content ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">02</span>
              Medical Examination Content
            </h2>
            <div className="space-y-4 text-white">
              <p>
                A medical examination for asbestos-exposed workers follows a
                structured process. The examining doctor must be an{" "}
                <strong>HSE-appointed doctor</strong> or a doctor with experience
                in asbestos-related disease. Results are{" "}
                <strong>confidential</strong> &mdash; the employer receives a
                certificate of fitness or unfitness, not the medical details.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">
                  Components of the Examination
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Respiratory questionnaire:</strong> history of
                      asbestos exposure, smoking history, current respiratory
                      symptoms, and occupational history
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Physical examination:</strong> chest examination,
                      checking for finger clubbing (a sign of lung disease),
                      respiratory rate, and general fitness assessment
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Lung function tests (spirometry):</strong> measuring
                      FEV1 (forced expiratory volume in 1 second) and FVC (forced
                      vital capacity) to assess lung capacity and airflow
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Chest X-ray or CT scan:</strong> may be requested if
                      the initial assessment indicates concern or if the worker has
                      a significant exposure history
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">
                    Confidentiality of Results
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Medical results are <strong className="text-white">
                  confidential between the worker and the examining doctor</strong>.
                  The employer receives only a certificate stating whether the
                  worker is fit or unfit to continue asbestos work. The employer
                  does <strong className="text-white">not</strong> receive the
                  detailed medical findings. This confidentiality encourages
                  workers to participate openly without fear of employment
                  consequences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Health Surveillance Pathway Diagram ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-orange-400" />
            Health Surveillance Pathway
          </h2>
          <p className="text-white/80 mb-6 text-sm">
            The diagram below shows the pathway from initial asbestos exposure
            through to ongoing health monitoring, investigation, and record
            keeping.
          </p>

          {/* ─── Linear flow steps 1–5 ─── */}
          <div className="space-y-0">
            {/* Step 1 — Exposure */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center text-white/70 text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div className="w-0.5 h-8 bg-orange-500/40"></div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex-1 mb-2">
                <p className="text-white font-medium text-sm">Exposure occurs</p>
                <p className="text-white/60 text-xs mt-1">
                  Worker is exposed to asbestos fibres during work activity
                </p>
              </div>
            </div>

            {/* Step 2 — Recorded */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 border-2 border-orange-500/50 flex items-center justify-center text-orange-400 text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div className="w-0.5 h-8 bg-orange-500/40"></div>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 flex-1 mb-2">
                <p className="text-orange-400 font-medium text-sm">
                  Exposure recorded in health records
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Details of the exposure event, date, type of ACM, and duration
                  are recorded
                </p>
              </div>
            </div>

            {/* Step 3 — Examination arranged */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 border-2 border-orange-500/50 flex items-center justify-center text-orange-400 text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div className="w-0.5 h-8 bg-orange-500/40"></div>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 flex-1 mb-2">
                <p className="text-orange-400 font-medium text-sm">
                  Medical examination arranged
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Employer arranges examination with an HSE-appointed or
                  experienced doctor
                </p>
              </div>
            </div>

            {/* Step 4 — Regular screening */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 border-2 border-orange-500/50 flex items-center justify-center text-orange-400 text-sm font-bold flex-shrink-0">
                  4
                </div>
                <div className="w-0.5 h-8 bg-orange-500/40"></div>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 flex-1 mb-2">
                <p className="text-orange-400 font-medium text-sm">
                  Regular screening schedule
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Every 2 years for licensed workers &mdash; ongoing for NNLW
                  workers
                </p>
              </div>
            </div>

            {/* Step 5 — Ongoing monitoring */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 border-2 border-orange-500/50 flex items-center justify-center text-orange-400 text-sm font-bold flex-shrink-0">
                  5
                </div>
                <div className="w-0.5 h-8 bg-orange-500/40"></div>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 flex-1 mb-2">
                <p className="text-orange-400 font-medium text-sm">
                  Ongoing monitoring
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Spirometry, respiratory questionnaire, chest examination at each
                  review
                </p>
              </div>
            </div>

            {/* Step 6 — Abnormality detected (branching) */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center text-red-400 text-sm font-bold flex-shrink-0">
                  6
                </div>
                <div className="w-0.5 h-8 bg-blue-500/40"></div>
              </div>
              <div className="flex-1 mb-2">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-3">
                  <p className="text-red-400 font-medium text-sm">
                    If abnormality detected
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    Findings warrant further investigation and specialist input
                  </p>
                </div>
                <div className="grid sm:grid-cols-3 gap-2 ml-4 sm:ml-6">
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-2.5">
                    <p className="text-red-300 text-xs font-medium">
                      Further investigation
                    </p>
                    <p className="text-white/50 text-xs mt-1">
                      CT scan, specialist referral, biopsy
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-2.5">
                    <p className="text-red-300 text-xs font-medium">
                      Treatment &amp; support
                    </p>
                    <p className="text-white/50 text-xs mt-1">
                      Medical treatment, symptom management, counselling
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-2.5">
                    <p className="text-red-300 text-xs font-medium">
                      Compensation claim
                    </p>
                    <p className="text-white/50 text-xs mt-1">
                      IIDB, civil claim, DMPS if appropriate
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 7 — Records kept */}
            <div className="flex items-start gap-3 sm:gap-4 mt-2">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500/50 flex items-center justify-center text-blue-400 text-sm font-bold flex-shrink-0">
                  7
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 flex-1">
                <p className="text-blue-400 font-medium text-sm">
                  Records kept for 40 years
                </p>
                <p className="text-white/60 text-xs mt-1">
                  All health records, exposure data, and examination results must
                  be securely retained for at least 40 years from the date of the
                  last entry
                </p>
              </div>
            </div>
          </div>

          <p className="text-white/50 text-xs text-center mt-4 italic">
            Health surveillance pathway from exposure to long-term record keeping
          </p>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── 03 Asbestos-Related Disease Screening ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">03</span>
              Asbestos-Related Disease Screening
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Screening aims to detect asbestos-related diseases as early as
                possible. Different screening approaches are used for different
                diseases, but the <strong>key message</strong> is that screening
                detects disease early &mdash; it{" "}
                <strong>CANNOT prevent it</strong>. The only prevention is
                avoiding exposure.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">
                  Screening by Disease Type
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Mesothelioma:</strong> no reliable screening test
                      currently exists &mdash; diagnosis is usually based on
                      symptoms (breathlessness, chest pain, weight loss). Research
                      into blood-based biomarkers is ongoing but not yet clinically
                      available.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Lung cancer:</strong> low-dose CT scanning may be
                      offered to high-risk individuals (those with significant
                      asbestos exposure and/or a smoking history). Combined exposure
                      to asbestos and smoking increases lung cancer risk
                      dramatically.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Asbestosis:</strong> detected through spirometry
                      (lung function tests) and chest imaging. Progressive
                      reduction in lung function over time may indicate developing
                      asbestosis.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Pleural changes:</strong> chest X-ray can detect
                      pleural plaques and thickening. These are markers of past
                      exposure and may be identified during routine surveillance.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Report New Symptoms Promptly
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Workers should report any new or worsening symptoms{" "}
                  <strong className="text-white">immediately</strong> &mdash; do
                  not wait for the next scheduled examination. Key symptoms to
                  watch for include: <strong className="text-white">persistent
                  cough, breathlessness, chest pain, and unexplained weight
                  loss</strong>. Early reporting leads to earlier investigation
                  and potentially better outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 04 GP Notification ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">04</span>
              GP Notification
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Anyone who has been exposed to asbestos &mdash; even decades ago
                &mdash; should <strong>inform their GP</strong>. This is one of
                the most important steps a worker can take to protect their
                long-term health.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">
                  Why GP Notification Matters
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      The GP should <strong>record the exposure</strong> in the
                      patient&apos;s medical notes &mdash; this ensures that any
                      future symptoms are investigated with asbestos exposure in
                      mind
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      The GP can arrange <strong>baseline lung function
                      tests</strong> and chest imaging to establish a reference
                      point for future comparison
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Some areas have <strong>specialist asbestos disease
                      clinics</strong> that the GP can refer patients to for
                      expert monitoring and support
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Early notification helps with <strong>early
                      diagnosis</strong> and timely access to treatment, support
                      services, and compensation
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      It is <strong>never too late</strong> to inform your GP
                      &mdash; asbestos-related diseases can develop 15 to 60
                      years after exposure, so even distant past exposure is
                      clinically significant
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-orange-300">
                    What to Tell Your GP
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  When informing your GP, provide as much detail as possible:{" "}
                  <strong className="text-white">when</strong> you were exposed,{" "}
                  <strong className="text-white">where</strong> (workplace,
                  employer),{" "}
                  <strong className="text-white">what type</strong> of asbestos
                  or ACM (if known),{" "}
                  <strong className="text-white">how long</strong> the exposure
                  lasted, and{" "}
                  <strong className="text-white">what controls</strong> were (or
                  were not) in place. This information helps the GP assess your
                  risk and plan appropriate monitoring.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 05 Record Keeping ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">05</span>
              Record Keeping
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Health records for asbestos-exposed workers must be kept for{" "}
                <strong>40 years from the date of the last entry</strong>. This
                extremely long retention period reflects the fact that
                asbestos-related diseases can take decades to develop after
                exposure.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">
                  What Records Must Include
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Worker&apos;s <strong>name, date of birth, and National
                      Insurance number</strong>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Dates of exposure</strong> and the type of asbestos
                      work carried out
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Results of medical examinations</strong> (fitness
                      certificates and clinical findings)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Details of the <strong>type of work</strong>, the ACMs
                      involved, and the duration of each task
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-orange-400 font-medium mb-3">
                  Why Records Matter
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Monitoring health over time:</strong> records allow
                      changes in lung function and health status to be tracked
                      across years and decades
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Supporting compensation claims:</strong> detailed
                      exposure records are essential evidence for IIDB claims,
                      civil claims, and DMPS applications
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Demonstrating legal compliance:</strong> employers
                      must be able to show that health surveillance was carried
                      out as required by CAR 2012
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-amber-300">
                    If the Employer Ceases Trading
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  If the employer ceases trading, health records{" "}
                  <strong className="text-white">must be transferred to
                  the HSE</strong> for safekeeping for the remainder of the
                  40-year retention period. Workers have the right to access
                  their own health records at any time, and it is good practice
                  to keep personal copies. Digital records are acceptable but
                  must be <strong className="text-white">securely stored and
                  backed up</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── 06 Compensation Routes ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">06</span>
              Compensation Routes
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Workers diagnosed with asbestos-related diseases have several
                routes to claim compensation. The available options depend on the
                circumstances of the exposure and the disease diagnosed.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-orange-400 font-semibold mb-1">
                        Industrial Injuries Disablement Benefit (IIDB)
                      </h3>
                      <p className="text-white/80 text-sm">
                        A government benefit for workers disabled by an
                        industrial disease, including asbestosis and
                        mesothelioma. The benefit is paid based on the degree of
                        disablement and does not depend on proving employer
                        negligence.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-orange-400 font-semibold mb-1">
                        Civil Claims
                      </h3>
                      <p className="text-white/80 text-sm">
                        Workers (or their families) can sue the employer for
                        negligence. There is{" "}
                        <strong className="text-white">no time limit</strong>{" "}
                        for mesothelioma claims. Most other asbestos-related
                        claims must be brought within{" "}
                        <strong className="text-white">3 years of
                        diagnosis</strong>, though exceptions exist and courts
                        can exercise discretion.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-orange-400 font-semibold mb-1">
                        Diffuse Mesothelioma Payment Scheme (DMPS)
                      </h3>
                      <p className="text-white/80 text-sm">
                        A government scheme providing lump-sum payments for
                        mesothelioma sufferers who{" "}
                        <strong className="text-white">cannot trace their
                        employer</strong> or the employer&apos;s insurer. This
                        scheme recognises that many companies that used asbestos
                        heavily have since ceased trading.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-orange-400 font-semibold mb-1">
                        Legal Advice
                      </h3>
                      <p className="text-white/80 text-sm">
                        Specialist asbestos disease solicitors can advise on the
                        best compensation route. Many operate on a{" "}
                        <strong className="text-white">no-win-no-fee
                        basis</strong>, meaning there is no financial risk to the
                        claimant. Time limitations apply to most claims, so
                        seeking advice promptly after diagnosis is important.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 07 Support Services ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">07</span>
              Support Services
            </h2>
            <div className="space-y-4 text-white">
              <p>
                A range of organisations provide support, information, and
                advocacy for workers affected by asbestos-related diseases.
                Accessing these services early can make a significant difference
                to outcomes and quality of life.
              </p>

              <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-orange-400 font-semibold text-sm mb-2">
                    Mesothelioma UK
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    National charity providing a dedicated helpline, specialist
                    mesothelioma nurse support, information resources, and
                    advocacy for mesothelioma patients and their families.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-orange-400 font-semibold text-sm mb-2">
                    Asbestos Victims Support Groups
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Regional groups across the UK providing practical and
                    emotional support, benefits advice, and help navigating the
                    legal and medical systems for asbestos-affected workers and
                    families.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-orange-400 font-semibold text-sm mb-2">
                    Macmillan Cancer Support
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Provides support for asbestos-related cancers including
                    mesothelioma and lung cancer. Offers specialist nurses,
                    financial guidance, and emotional support services.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-orange-400 font-semibold text-sm mb-2">
                    HSE Guidance
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    The Health and Safety Executive provides comprehensive
                    guidance on rights, responsibilities, compensation routes,
                    and legal requirements for asbestos-exposed workers and
                    employers.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-orange-400 font-semibold text-sm mb-2">
                    Trade Unions
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Trade unions often provide legal support and advocacy for
                    members diagnosed with asbestos-related diseases, including
                    assistance with compensation claims and workplace rights.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-orange-400 font-semibold text-sm mb-2">
                    Citizens Advice
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Offers help with benefits claims (including IIDB), legal
                    rights, and signposting to specialist services for
                    asbestos-affected workers and their families.
                  </p>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">
                    Seek Support Early
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  If you or someone you know has been affected by asbestos
                  exposure, <strong className="text-white">do not wait</strong>{" "}
                  until symptoms appear to seek support. Many of these
                  organisations can provide guidance on health monitoring,
                  record-keeping, and legal rights even before a diagnosis is
                  made. Early engagement helps ensure that nothing is
                  overlooked.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 08 Key Takeaways ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-orange-400/80 text-sm font-normal">08</span>
              Key Takeaways
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Licensed asbestos workers must have a{" "}
                      <strong>medical examination every 2 years</strong> under
                      Regulation 22 of CAR 2012. NNLW workers also require
                      medical surveillance and health records kept for 40 years.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Medical examinations include a{" "}
                      <strong>respiratory questionnaire, physical
                      examination, and spirometry</strong>. Results are
                      confidential &mdash; the employer receives only a fitness
                      certificate.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Health surveillance <strong>detects disease early but
                      cannot prevent it</strong>. The only true prevention is
                      avoiding asbestos exposure.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Anyone with <strong>past asbestos exposure should
                      inform their GP</strong>, regardless of how long ago the
                      exposure occurred.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Health records must be kept for{" "}
                      <strong>40 years</strong> and transferred to the HSE if the
                      employer ceases trading.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Compensation routes include <strong>IIDB, civil
                      claims, and the DMPS</strong>. Specialist solicitors and
                      support organisations can help navigate the process.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-orange-400/80 text-sm font-normal">09</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Quiz ─── */}
        <div className="mt-12">
          <Quiz
            title="Health Surveillance & Medical Monitoring Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* ─── Bottom Navigation ─── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-5-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Decontamination &amp; Waste Disposal
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-5-section-4">
              Next: Roles, Responsibilities &amp; Your Legal Duties
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default AsbestosModule5Section3;
