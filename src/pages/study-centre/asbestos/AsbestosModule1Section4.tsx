import { ArrowLeft, HeartPulse, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "asb-m1s4-fibre-entry",
    question: "What is the primary route by which asbestos fibres enter the body?",
    options: [
      "Inhalation of airborne fibres into the lungs",
      "Absorption through the skin during handling",
      "Ingestion through contaminated drinking water",
      "Direct contact with open wounds on site"
    ],
    correctIndex: 0,
    explanation: "The primary route of asbestos exposure is inhalation. When asbestos-containing materials are disturbed, microscopic fibres become airborne and are breathed in. They travel through the airways into the bronchioles and alveoli, and can penetrate through to the pleura. Once embedded in lung tissue, the body cannot break down or expel the fibres, leading to chronic inflammation, scarring, and DNA damage over decades."
  },
  {
    id: "asb-m1s4-mesothelioma-key",
    question: "Which of the following statements about mesothelioma is TRUE?",
    options: [
      "It is always fatal, with no cure and a median survival of 12-18 months from diagnosis",
      "It only develops after many years of heavy, prolonged asbestos exposure",
      "It can be cured with early detection and aggressive chemotherapy",
      "It is most commonly caused by smoking rather than asbestos exposure"
    ],
    correctIndex: 0,
    explanation: "Mesothelioma is always fatal — there is no cure, and the median survival from diagnosis is just 12-18 months. Unlike asbestosis, mesothelioma can be caused by very short, low-level exposure to asbestos. It is almost exclusively caused by asbestos exposure, not smoking. The UK has the highest mesothelioma death rate in the world, with approximately 2,700 deaths per year."
  },
  {
    id: "asb-m1s4-smoking-synergy",
    question: "An asbestos worker who also smokes has approximately how many times the risk of lung cancer compared to a non-exposed non-smoker?",
    options: [
      "50 times the risk",
      "15 times the risk",
      "5 times the risk",
      "100 times the risk"
    ],
    correctIndex: 0,
    explanation: "The synergistic effect of asbestos exposure and smoking is devastating. Asbestos alone increases lung cancer risk approximately 5 times, and smoking alone approximately 10 times. However, combined exposure produces a multiplicative effect of approximately 50 times the risk compared to a non-exposed non-smoker. This is why smoking cessation is critically important for anyone with a history of asbestos exposure."
  }
];

const faqs = [
  {
    question: "Can a single asbestos fibre really cause disease?",
    answer: "The 'single-fibre theory' states that, in principle, a single asbestos fibre could initiate a disease process such as mesothelioma. While the risk increases with the dose and duration of exposure, there is no known threshold below which asbestos exposure is completely safe. This is why the HSE control limit of 0.1 fibres per cm\u00b3 over 4 hours is described as a legal maximum, not a safe level. The precautionary approach is always to avoid any unnecessary exposure."
  },
  {
    question: "Why does it take so long for asbestos diseases to appear?",
    answer: "Asbestos-related diseases have extremely long latency periods — typically 15 to 50 years between first exposure and diagnosis. This is because asbestos fibres cause slow, progressive damage at a cellular level. The fibres embed in lung tissue and cause chronic inflammation, scarring, and DNA damage over decades. The body cannot break down or expel the fibres, so the damage is cumulative and irreversible. Many people diagnosed today were exposed in the 1960s, 70s, and 80s when asbestos use was at its peak."
  },
  {
    question: "Is one type of asbestos safer than another in terms of health effects?",
    answer: "No type of asbestos is safe. While blue (crocidolite) and brown (amosite) asbestos are generally considered more hazardous than white (chrysotile), all three types can cause mesothelioma, lung cancer, asbestosis, and pleural disease. White chrysotile accounts for approximately 90% of asbestos used historically in the UK and is responsible for a significant proportion of asbestos-related deaths. The law treats all types equally — any work that could expose someone to any type of asbestos fibre must be properly controlled."
  },
  {
    question: "Can family members really be affected by secondary exposure?",
    answer: "Yes. Secondary (or para-occupational) exposure is a well-documented cause of asbestos-related disease, particularly mesothelioma. Historically, workers carried asbestos fibres home on their clothing, hair, and skin. Family members — especially those who washed contaminated work clothes — inhaled these fibres during routine domestic activities. Cases of mesothelioma have been recorded in spouses and children of asbestos workers. This is one reason modern regulations require workers to decontaminate and change clothing before leaving an asbestos work area."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What happens to asbestos fibres once they become embedded in lung tissue?",
    options: [
      "The body gradually dissolves and expels them over a period of months",
      "The body cannot break down or expel them — they remain permanently and cause ongoing damage",
      "They are absorbed into the bloodstream and filtered out by the kidneys",
      "They migrate to the lymph nodes where the immune system destroys them"
    ],
    correctAnswer: 1,
    explanation: "Once asbestos fibres are embedded in lung tissue, the body cannot break them down or expel them. The fibres remain permanently in the tissue, causing chronic inflammation, progressive scarring, and DNA damage over decades. This is what makes asbestos so dangerous — a single exposure event can lead to disease many years later because the fibres never leave the body."
  },
  {
    id: 2,
    question: "Approximately how many people die from mesothelioma in the UK each year?",
    options: [
      "Around 500",
      "Around 1,200",
      "Around 2,700",
      "Around 5,000"
    ],
    correctAnswer: 2,
    explanation: "Approximately 2,700 people die from mesothelioma in the UK each year. The UK has the highest mesothelioma death rate in the world per capita, due to the country's extensive historical use of asbestos in construction, shipbuilding, and industrial processes. This figure has remained high because of the long latency period — people diagnosed now were typically exposed 30-50 years ago."
  },
  {
    id: 3,
    question: "What is the typical latency period for mesothelioma after initial asbestos exposure?",
    options: [
      "1-5 years",
      "5-15 years",
      "15-60 years",
      "Over 60 years only"
    ],
    correctAnswer: 2,
    explanation: "The typical latency period for mesothelioma is 15-60 years, with most cases diagnosed 30-50 years after first exposure. This extremely long latency period means that people exposed to asbestos decades ago are still being diagnosed today, and the UK death toll from asbestos-related diseases will continue for many years to come. The latency period can occasionally be as short as 15 years."
  },
  {
    id: 4,
    question: "Which asbestos-related disease is caused specifically by heavy, prolonged exposure?",
    options: [
      "Mesothelioma",
      "Pleural plaques",
      "Asbestosis",
      "Diffuse pleural thickening"
    ],
    correctAnswer: 2,
    explanation: "Asbestosis is a progressive fibrosis (scarring) of the lung tissue caused by heavy, prolonged exposure to asbestos fibres. It is typically seen in workers with years of heavy exposure, such as laggers and shipyard workers. Unlike mesothelioma, which can be caused by very short, low-level exposure, asbestosis is dose-related and requires sustained high-level exposure to develop."
  },
  {
    id: 5,
    question: "What is the most common sign of past asbestos exposure, often found incidentally on chest X-rays?",
    options: [
      "Lung cancer tumours",
      "Pleural plaques",
      "Asbestosis scarring",
      "Pleural effusion"
    ],
    correctAnswer: 1,
    explanation: "Pleural plaques are the most common sign of past asbestos exposure. They are areas of calcified thickening on the pleura (the membrane surrounding the lungs) and are usually found incidentally during chest X-rays taken for other reasons. Pleural plaques usually cause no symptoms and are not pre-cancerous, but they confirm definite past exposure to asbestos and indicate that the individual should be on an asbestos-related disease screening programme."
  },
  {
    id: 6,
    question: "The HSE control limit of 0.1 fibres per cm\u00b3 over 4 hours is best described as:",
    options: [
      "A completely safe level of exposure verified by scientific research",
      "A legal maximum, NOT a safe level — there is no known safe level of asbestos exposure",
      "The level at which asbestos fibres first become visible to the naked eye",
      "The minimum level at which respiratory protective equipment must be worn"
    ],
    correctAnswer: 1,
    explanation: "The HSE control limit of 0.1 fibres per cm\u00b3 over 4 hours is a legal maximum — it is NOT a safe level. There is no known safe level of asbestos exposure. The 'single-fibre theory' states that, in principle, a single fibre could initiate disease. Risk increases with dose, but there is no threshold below which risk is zero. This is why the hierarchy of controls prioritises complete elimination and avoidance above all other measures."
  },
  {
    id: 7,
    question: "Which group of workers is currently most at risk from asbestos exposure in the UK?",
    options: [
      "Office workers in modern buildings built after 2000",
      "Factory workers manufacturing asbestos products",
      "Tradespeople who disturb ACMs during maintenance, refurbishment, or demolition",
      "Scientists working in asbestos research laboratories"
    ],
    correctAnswer: 2,
    explanation: "Tradespeople who disturb asbestos-containing materials (ACMs) during maintenance, refurbishment, or demolition work are currently the most at-risk group. This includes electricians, plumbers, joiners, roofers, painters, and heating engineers. Approximately 20 tradespeople die every week in the UK from past asbestos exposure. Asbestos manufacturing has been banned since 1999, but the material remains present in hundreds of thousands of pre-2000 buildings."
  },
  {
    id: 8,
    question: "What effect does the combination of asbestos exposure AND smoking have on lung cancer risk?",
    options: [
      "No additional effect — smoking and asbestos risks do not interact",
      "An additive effect — roughly 15 times the risk (5 + 10)",
      "A synergistic (multiplicative) effect — approximately 50 times the risk",
      "Smoking actually reduces the effect of asbestos on the lungs"
    ],
    correctAnswer: 2,
    explanation: "Asbestos exposure and smoking have a synergistic (multiplicative) rather than additive effect on lung cancer risk. Asbestos alone increases risk approximately 5 times, smoking alone approximately 10 times, but combined they produce approximately 50 times the risk of lung cancer compared to a non-exposed non-smoker. This makes smoking cessation critically important for anyone with past asbestos exposure."
  }
];

export default function AsbestosModule1Section4() {
  useSEO({
    title: "Health Effects of Asbestos Exposure | Asbestos Awareness Module 1.4",
    description: "Mesothelioma, asbestos-related lung cancer, asbestosis, pleural thickening, latency periods, the single-fibre theory, and who is most at risk from asbestos exposure in the UK.",
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
            <Link to="../asbestos-awareness-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-400/20 border border-orange-500/30 mb-4">
            <HeartPulse className="h-7 w-7 text-orange-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3 mx-auto">
            <span className="text-orange-400 text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Health Effects of Asbestos Exposure
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How asbestos fibres damage the body, the diseases they cause, latency periods, the single-fibre theory, and why there is no safe level of exposure
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Mesothelioma:</strong> Always fatal &mdash; ~2,700 UK deaths/year</li>
              <li><strong>Lung cancer:</strong> 50&times; risk if combined with smoking</li>
              <li><strong>Latency:</strong> 15&ndash;60 years before symptoms appear</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>No safe level:</strong> A single fibre could initiate disease</li>
              <li><strong>Most at risk:</strong> Electricians, plumbers, joiners, roofers</li>
              <li><strong>20 tradespeople</strong> die every week in the UK</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain how asbestos fibres enter the body and why they cause long-term damage",
              "Describe the key features, symptoms, and prognosis of mesothelioma",
              "Identify the synergistic risk between asbestos exposure and smoking for lung cancer",
              "Distinguish between asbestosis, pleural plaques, and diffuse pleural thickening",
              "Explain the single-fibre theory and why there is no safe level of exposure",
              "Identify the occupational groups most at risk from asbestos exposure today"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-orange-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: How Asbestos Fibres Enter the Body */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">01</span>
            How Asbestos Fibres Enter the Body
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The primary route of asbestos exposure is <strong>inhalation</strong>. When asbestos-containing
                materials are disturbed &mdash; by drilling, cutting, sanding, breaking, or even simply
                handling deteriorated material &mdash; microscopic fibres are released into the air.
                A single asbestos fibre is up to <strong>700 times thinner than a human hair</strong>,
                making them completely invisible to the naked eye.
              </p>

              <p>
                Once inhaled, the fibres travel through the airways &mdash; from the trachea through the
                bronchi and bronchioles &mdash; and into the alveoli (the tiny air sacs where gas exchange
                occurs). Some fibres can penetrate through the alveoli into the <strong>pleura</strong>,
                the membrane surrounding the lungs. Once embedded in lung tissue, the body
                <strong> cannot break down or expel the fibres</strong>. They remain permanently,
                causing chronic inflammation, scarring, and DNA damage over decades.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Secondary Exposure Risk</p>
                </div>
                <p className="text-sm text-white/80">
                  Asbestos fibres can also enter the body through <strong className="text-white">ingestion</strong> (swallowing),
                  which is linked to some gastrointestinal cancers, though this is less common than inhalation.
                  Critically, fibres carried home on clothing, hair, and skin pose a <strong className="text-white">secondary
                  exposure risk to family members</strong>. Cases of mesothelioma have been recorded in spouses
                  and children of asbestos workers who never entered a workplace themselves.
                </p>
              </div>

              {/* Respiratory System Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-4 text-center">Respiratory System &mdash; Path of Asbestos Fibres</p>

                <div className="flex flex-col items-center gap-0 max-w-sm mx-auto">
                  {/* Nose/Mouth */}
                  <div className="w-full bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-orange-300">Nose / Mouth</p>
                    <p className="text-xs text-white/60">Entry point &mdash; fibres are inhaled</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-4 bg-orange-400/40" />
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-orange-400/60" />
                  </div>

                  {/* Trachea */}
                  <div className="w-full bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-orange-300">Trachea (Windpipe)</p>
                    <p className="text-xs text-white/60">Fibres pass through the main airway</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-4 bg-orange-400/40" />
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-orange-400/60" />
                  </div>

                  {/* Bronchi */}
                  <div className="w-full bg-orange-500/15 border border-orange-500/40 rounded-lg p-3 text-center relative">
                    <p className="text-sm font-medium text-orange-300">Bronchi (Main Airways)</p>
                    <p className="text-xs text-white/60">Fibres enter the branching airways</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/30">
                      <span className="text-[10px] text-red-300 font-medium">LUNG CANCER develops here</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-4 bg-orange-400/40" />
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-orange-400/60" />
                  </div>

                  {/* Bronchioles */}
                  <div className="w-full bg-orange-500/15 border border-orange-500/40 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-orange-300">Bronchioles (Smaller Airways)</p>
                    <p className="text-xs text-white/60">Fibres penetrate deeper into the lungs</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/30">
                      <span className="text-[10px] text-red-300 font-medium">LUNG CANCER also develops here</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-4 bg-orange-400/40" />
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-orange-400/60" />
                  </div>

                  {/* Alveoli */}
                  <div className="w-full bg-orange-500/20 border border-orange-500/50 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-orange-300">Alveoli (Air Sacs)</p>
                    <p className="text-xs text-white/60">Where gas exchange occurs &mdash; fibres embed in tissue</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30">
                      <span className="text-[10px] text-orange-300 font-medium">ASBESTOSIS &mdash; fibrosis throughout lung tissue</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-4 bg-orange-400/40" />
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-orange-400/60" />
                  </div>

                  {/* Pleura */}
                  <div className="w-full bg-red-500/15 border border-red-500/40 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-red-300">Pleura (Membrane Around Lungs)</p>
                    <p className="text-xs text-white/60">Fibres can penetrate through to the pleural lining</p>
                    <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/30 border border-red-500/40">
                        <span className="text-[10px] text-red-200 font-bold">MESOTHELIOMA</span>
                      </div>
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30">
                        <span className="text-[10px] text-orange-300 font-medium">PLEURAL PLAQUES</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-white/40 text-center mt-4">
                  Fibres are permanent &mdash; the body cannot break down or expel them once embedded
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Mesothelioma */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">02</span>
            Mesothelioma
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mesothelioma is a cancer of the mesothelial cells that line the <strong>pleura</strong> (lungs),
                <strong> peritoneum</strong> (abdomen), or <strong>pericardium</strong> (heart). It is
                <strong> almost exclusively caused by asbestos exposure</strong> and is considered the
                &ldquo;signature&rdquo; asbestos disease.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Always Fatal</p>
                </div>
                <p className="text-sm text-white/80">
                  Mesothelioma is <strong className="text-white">always fatal</strong>. There is no cure. The median
                  survival from diagnosis is just <strong className="text-white">12&ndash;18 months</strong>. It is often
                  diagnosed at an advanced stage because early symptoms (breathlessness, chest pain, fatigue)
                  are non-specific and easily attributed to other conditions.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Facts</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Approximately <strong className="text-white">2,700 deaths per year</strong> in the UK &mdash; the highest rate in the world per capita</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Can be caused by <strong className="text-white">very short, low-level exposure</strong> &mdash; unlike asbestosis, it does not require prolonged heavy exposure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Latency period typically <strong className="text-white">30&ndash;50 years</strong> (can be as short as 15 years)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Symptoms include: breathlessness, chest pain, weight loss, fatigue, and fluid around the lungs (pleural effusion)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The UK has the highest mesothelioma death rate in the world due to extensive historical use of asbestos in construction, shipbuilding, and industry</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Asbestos-Related Lung Cancer */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">03</span>
            Asbestos-Related Lung Cancer
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Asbestos exposure causes lung cancer that is <strong>clinically indistinguishable</strong> from
                lung cancer caused by smoking or other factors. The risk is dose-related &mdash; higher
                exposure means higher risk &mdash; and all types of asbestos (white, brown, and blue)
                can cause lung cancer.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">The Smoking Synergy</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The interaction between asbestos exposure and smoking is <strong className="text-white">synergistic
                  (multiplicative)</strong>, not merely additive. This means the combined risk is far greater
                  than the sum of the individual risks:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-orange-400">5&times;</p>
                    <p className="text-xs text-white/60 mt-1">Asbestos alone</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-orange-400">10&times;</p>
                    <p className="text-xs text-white/60 mt-1">Smoking alone</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-red-400">50&times;</p>
                    <p className="text-xs text-white/60 mt-1">Asbestos + smoking</p>
                  </div>
                </div>
                <p className="text-xs text-white/50 mt-3 text-center">
                  Risk compared to a non-exposed non-smoker
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Facts</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Accounts for approximately <strong className="text-white">2,500+ UK deaths per year</strong> attributable to past asbestos exposure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Latency period typically <strong className="text-white">20&ndash;40 years</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>All types of asbestos cause lung cancer &mdash; chrysotile (white), amosite (brown), and crocidolite (blue)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Smoking cessation is critically important for anyone with a history of asbestos exposure</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Asbestosis */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">04</span>
            Asbestosis
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Asbestosis is a progressive <strong>fibrosis (scarring) of the lung tissue</strong> caused
                by heavy, prolonged exposure to asbestos fibres. The inhaled fibres cause chronic
                inflammation, and over time scar tissue builds up throughout the lungs, causing them
                to lose elasticity. The lungs become stiff and cannot expand properly, making breathing
                increasingly difficult.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Symptoms</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Progressive breathlessness (worsens over time)",
                    "Persistent dry cough",
                    "Chest tightness and pain",
                    "Finger clubbing (widening of fingertips)",
                    "Fatigue and reduced exercise tolerance",
                    "Crackling sound when breathing (heard with stethoscope)"
                  ].map((symptom, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white/80">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400/60 flex-shrink-0" />
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-2">No Cure</p>
                <p className="text-sm text-white/80">
                  There is <strong className="text-white">no cure for asbestosis</strong> &mdash; the damage is
                  irreversible and progressive. Treatment focuses on managing symptoms and slowing
                  progression. The condition can lead to respiratory failure. It is diagnosed by
                  chest X-ray or CT scan showing diffuse fibrosis, combined with a confirmed history
                  of asbestos exposure.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Facts</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Caused by <strong className="text-white">heavy, prolonged exposure</strong> &mdash; not short-term low-level contact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Typically seen in workers with years of heavy exposure: laggers, shipyard workers, power station workers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Latency period typically <strong className="text-white">15&ndash;30 years</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Can lead to respiratory failure if the scarring is extensive</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Pleural Thickening & Pleural Plaques */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">05</span>
            Pleural Thickening &amp; Pleural Plaques
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The pleura is the thin membrane surrounding the lungs. Asbestos fibres that reach the
                pleura can cause two distinct conditions: <strong>pleural plaques</strong> and
                <strong> diffuse pleural thickening</strong>.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-orange-400 mb-3">Pleural Plaques</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Areas of calcified thickening on the pleura</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span><strong className="text-white">Most common</strong> sign of past asbestos exposure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Usually cause <strong className="text-white">no symptoms</strong> &mdash; found incidentally on chest X-rays</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Not pre-cancerous but confirm definite past exposure</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-orange-400 mb-3">Diffuse Pleural Thickening</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>More extensive thickening of the pleural membrane</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Can <strong className="text-white">restrict lung expansion</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Causes breathlessness and reduced lung function</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>More debilitating than isolated pleural plaques</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Important</p>
                </div>
                <p className="text-sm text-white/80">
                  Both pleural plaques and diffuse pleural thickening confirm past asbestos exposure. If either
                  condition is found, the individual should be placed on an <strong className="text-white">asbestos-related
                  disease screening programme</strong> with regular health surveillance, because the presence of
                  these conditions means the person has been exposed and is at increased risk of developing
                  more serious asbestos-related diseases in the future.
                </p>
              </div>

              {/* Disease Latency Timeline Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-4 text-center">Disease Latency Timeline</p>
                <p className="text-xs text-white/50 text-center mb-6">
                  Time from first exposure to typical diagnosis
                </p>

                <div className="space-y-4 max-w-lg mx-auto">
                  {/* Timeline axis labels */}
                  <div className="flex justify-between text-[10px] text-white/40 px-1 mb-2">
                    <span>Exposure</span>
                    <span>10 yrs</span>
                    <span>20 yrs</span>
                    <span>30 yrs</span>
                    <span>40 yrs</span>
                    <span>50 yrs</span>
                    <span>60 yrs</span>
                  </div>

                  {/* Pleural Plaques */}
                  <div>
                    <p className="text-xs text-white/70 mb-1.5 font-medium">Pleural Plaques</p>
                    <div className="relative h-6 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full rounded-full bg-orange-400/30 border border-orange-400/40"
                        style={{ left: "16.7%", width: "33.3%" }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white/60">10&ndash;30 years</span>
                    </div>
                  </div>

                  {/* Asbestosis */}
                  <div>
                    <p className="text-xs text-white/70 mb-1.5 font-medium">Asbestosis</p>
                    <div className="relative h-6 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full rounded-full bg-orange-500/40 border border-orange-500/50"
                        style={{ left: "25%", width: "25%" }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white/60">15&ndash;30 years</span>
                    </div>
                  </div>

                  {/* Lung Cancer */}
                  <div>
                    <p className="text-xs text-white/70 mb-1.5 font-medium">Lung Cancer</p>
                    <div className="relative h-6 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full rounded-full bg-orange-600/50 border border-orange-600/60"
                        style={{ left: "33.3%", width: "33.3%" }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white/60">20&ndash;40 years</span>
                    </div>
                  </div>

                  {/* Mesothelioma */}
                  <div>
                    <p className="text-xs text-white/70 mb-1.5 font-medium">Mesothelioma</p>
                    <div className="relative h-6 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full rounded-full bg-red-500/50 border border-red-500/60"
                        style={{ left: "25%", width: "75%" }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white/60">15&ndash;60 years</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                  <p className="text-xs text-red-300 font-medium">
                    There is NO safe level of exposure and NO minimum latency period.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: The Single-Fibre Theory & No Safe Level */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">06</span>
            The Single-Fibre Theory &amp; No Safe Level
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most critical concepts in asbestos awareness is that there is
                <strong> no known safe level of asbestos exposure</strong>. Unlike many other hazardous
                substances where a safe threshold can be established, asbestos has no such threshold.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">The Single-Fibre Theory</p>
                </div>
                <p className="text-sm text-white/80">
                  In theory, a <strong className="text-white">single asbestos fibre</strong> could initiate a
                  disease process such as mesothelioma. While the risk increases with the dose and duration
                  of exposure, there is no threshold below which risk is zero. This is why even brief,
                  apparently minor disturbance of asbestos-containing materials must be taken seriously.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-2">The HSE Control Limit</p>
                <p className="text-sm text-white/80">
                  The HSE control limit is <strong className="text-white">0.1 fibres per cm&sup3; over 4 hours</strong>.
                  This is a <strong className="text-white">legal maximum, NOT a safe level</strong>. It represents
                  the highest concentration of airborne asbestos fibres that is permitted during controlled
                  work activities. Any exposure below this limit still carries risk. This is precisely why
                  the hierarchy of controls prioritises <strong className="text-white">elimination and avoidance</strong> above
                  all other control measures.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What This Means in Practice</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>If asbestos can be left undisturbed and safely managed in place, that is always preferable to disturbing it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Any work that may disturb ACMs must be properly planned, risk-assessed, and controlled</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>RPE and other controls reduce exposure but never eliminate it entirely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>&ldquo;It&rsquo;s only a small amount&rdquo; is never a valid reason to take shortcuts &mdash; even minimal exposure carries risk</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Who Is Most at Risk? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-400/80 text-sm font-normal">07</span>
            Who Is Most at Risk?
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Today, the people most at risk from asbestos exposure are <strong>tradespeople who
                disturb asbestos-containing materials (ACMs) during maintenance, refurbishment, or
                demolition work</strong>. Asbestos manufacturing has been banned since 1999, but the
                material remains present in hundreds of thousands of buildings across the UK.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">20 Tradespeople Die Every Week</p>
                </div>
                <p className="text-sm text-white/80">
                  Approximately <strong className="text-white">20 tradespeople die every week</strong> in the UK from
                  past asbestos exposure. This makes asbestos the single biggest cause of work-related death
                  in the UK, far exceeding deaths from workplace accidents.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">Current High-Risk Groups</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Electricians",
                    "Plumbers and heating engineers",
                    "Joiners and carpenters",
                    "Roofers",
                    "Painters and decorators",
                    "Building maintenance workers",
                    "Construction workers (refurbishment)",
                    "Demolition workers"
                  ].map((trade, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white/80">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400/60 flex-shrink-0" />
                      <span>{trade}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Historical High-Risk Groups</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Asbestos factory workers",
                    "Laggers (insulation workers)",
                    "Shipyard workers",
                    "Power station workers",
                    "Railway workshop workers",
                    "Boilermakers"
                  ].map((trade, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white/80">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                      <span>{trade}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-2">Secondary Exposure</p>
                <p className="text-sm text-white/80">
                  Family members of exposed workers are also at risk through <strong className="text-white">secondary
                  exposure</strong>. Historically, asbestos fibres were carried home on work clothing, and
                  family members &mdash; particularly those who washed contaminated clothes &mdash; inhaled
                  these fibres during routine domestic tasks. Cases of mesothelioma have been diagnosed in
                  spouses and children of asbestos workers who never set foot in an asbestos workplace.
                  Modern regulations require decontamination procedures and prohibit workers from taking
                  contaminated clothing home.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 4 Knowledge Check"
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
            <Link to="../asbestos-awareness-module-1-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Where Asbestos Is Found
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-2-section-1">
              Next: Control of Asbestos Regulations 2012
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
