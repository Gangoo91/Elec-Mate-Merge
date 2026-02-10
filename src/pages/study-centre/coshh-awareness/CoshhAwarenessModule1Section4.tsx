import { ArrowLeft, HeartPulse, CheckCircle, AlertTriangle, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "coshh-m1s4-acute-chronic",
    question: "What is the key difference between acute and chronic health effects of hazardous substances?",
    options: [
      "Acute effects appear rapidly after short-term exposure; chronic effects develop gradually after repeated or prolonged exposure",
      "Acute effects are always more serious than chronic effects",
      "Chronic effects only occur in people who smoke or have pre-existing conditions",
      "Acute effects are caused by liquids and chronic effects are caused by gases"
    ],
    correctIndex: 0,
    explanation: "Acute health effects appear rapidly — within minutes, hours, or days — after a single or short-term exposure to a hazardous substance. Examples include chemical burns, nausea, and dizziness. Chronic health effects develop gradually over weeks, months, or years of repeated or prolonged exposure. Examples include occupational asthma, COPD, and cancer. Chronic effects can be far more serious and are often irreversible, but they can go unnoticed for long periods because the damage accumulates slowly."
  },
  {
    id: "coshh-m1s4-skin-disease",
    question: "Which occupational skin disease is caused by the immune system developing a specific reaction to a substance, meaning even tiny future exposures trigger a response?",
    options: [
      "Irritant contact dermatitis",
      "Allergic contact dermatitis",
      "Urticaria (hives)",
      "Chrome ulcers"
    ],
    correctIndex: 1,
    explanation: "Allergic contact dermatitis is an immune-mediated reaction. The body's immune system becomes sensitised to a specific substance (the allergen), and after sensitisation, even very small amounts of the substance can trigger a skin reaction. This is different from irritant contact dermatitis, which is caused by direct chemical damage to the skin and does not involve the immune system. Common workplace allergens include epoxy resins, chromates in cement, and certain solvents. Once sensitised, the worker must permanently avoid the substance — there is no cure."
  },
  {
    id: "coshh-m1s4-susceptibility",
    question: "Why is individual susceptibility important when assessing the risk of hazardous substances?",
    options: [
      "Because the law only applies to workers who are already ill",
      "Because some individuals may be more vulnerable due to pre-existing conditions, genetics, age, smoking, or medication interactions — meaning standard controls may not protect everyone equally",
      "Because individual susceptibility only affects workers over the age of 60",
      "Because susceptibility is only relevant to substances classified as carcinogens"
    ],
    correctIndex: 1,
    explanation: "Individual susceptibility means that the same exposure to a hazardous substance can produce very different effects in different people. Factors include pre-existing respiratory conditions (e.g. asthma), skin conditions (e.g. eczema), genetic factors, age, smoking status, and interactions with medication. A worker with pre-existing asthma may develop occupational asthma at exposure levels that do not affect colleagues. This is why COSHH assessments must consider vulnerable individuals, and why health surveillance is essential — it can detect early signs of harm before they become irreversible."
  }
];

const faqs = [
  {
    question: "Can a hazardous substance cause both acute and chronic effects?",
    answer: "Yes — many hazardous substances can cause both acute and chronic health effects depending on the level and duration of exposure. For example, exposure to high concentrations of certain solvents can cause immediate dizziness and narcosis (acute effects), while repeated lower-level exposure over months or years can cause chronic neurological damage and liver disease. Isocyanates used in spray paints can cause immediate eye and throat irritation (acute) and also cause permanent occupational asthma (chronic) after sensitisation. This is why both short-term and long-term exposure limits (STELs and WELs) exist for many substances."
  },
  {
    question: "What does 'sensitisation' mean and why is it so important?",
    answer: "Sensitisation is a process in which the immune system develops a specific, exaggerated response to a substance. During initial exposures, the body 'learns' to recognise the substance as a threat (the sensitisation phase), often with no obvious symptoms. Once sensitised, any subsequent exposure — even to extremely tiny amounts — can trigger a severe allergic reaction such as occupational asthma or allergic contact dermatitis. The critical point is that sensitisation is permanent and irreversible. There is no cure, no desensitisation treatment, and no safe level of exposure once the worker is sensitised. The only option is complete, permanent avoidance of the substance. Common sensitisers in the electrical trades include isocyanates (spray foams, paints), epoxy resins, and wood dust."
  },
  {
    question: "How long after exposure can occupational cancer develop?",
    answer: "Occupational cancers typically have very long latency periods — the time between first exposure and diagnosis. Most occupational cancers develop 10 to 40 years after exposure, though some can take even longer. For example, mesothelioma caused by asbestos has a latency period of 15 to 60 years. Bladder cancer caused by aromatic amines can develop 15 to 40 years after exposure. This long delay makes it difficult to link the cancer to the original workplace exposure, which is why accurate exposure records and health surveillance are so important. Many workers diagnosed with occupational cancer today were exposed decades ago, often before modern COSHH controls were in place."
  },
  {
    question: "What is health surveillance and who needs it?",
    answer: "Health surveillance is a systematic programme of health checks designed to detect early signs of ill health caused by workplace hazardous substance exposure. It is a legal requirement under COSHH Regulation 11 where employees are exposed to substances that have identifiable disease or adverse health effects, and where there is a reasonable likelihood that the disease or effect may occur under the conditions of their work, and where valid techniques exist to detect the disease or effect. Examples include spirometry (lung function tests) for workers exposed to respiratory sensitisers, skin checks for workers handling known skin sensitisers, and blood or urine tests for lead workers. The purpose is early detection — catching health problems at a stage where further damage can be prevented by removing the worker from exposure or improving controls."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A worker splashes concentrated hydrochloric acid on their arm and immediately develops a chemical burn. This is an example of:",
    options: [
      "A chronic health effect",
      "An acute health effect",
      "Sensitisation",
      "An occupational disease"
    ],
    correctAnswer: 1,
    explanation: "A chemical burn from a single splash of acid is an acute health effect — it appears immediately after a single, short-term exposure. Acute effects are typically sudden in onset and may be severe, but are often reversible if treated promptly. Chronic effects, by contrast, develop gradually over repeated or prolonged exposure periods."
  },
  {
    id: 2,
    question: "Which of the following is an occupational lung disease caused by inhaling respirable crystalline silica dust?",
    options: [
      "Asbestosis",
      "Silicosis",
      "Occupational asthma",
      "Metal fume fever"
    ],
    correctAnswer: 1,
    explanation: "Silicosis is a progressive, incurable fibrotic lung disease caused by inhaling respirable crystalline silica (RCS) dust. It is common in trades that involve cutting, grinding, or drilling concrete, stone, brick, or morite. The silica particles cause irreversible scarring of the lung tissue, reducing lung capacity over time. Electricians are at risk when chasing walls, drilling through concrete, or cutting block and brickwork."
  },
  {
    id: 3,
    question: "Once a worker becomes sensitised to a substance such as isocyanates, what is the recommended course of action?",
    options: [
      "Reduce their exposure to half the workplace exposure limit",
      "Provide them with an FFP3 mask and continue working as normal",
      "Remove them from all further exposure permanently — there is no cure for sensitisation",
      "Give them antihistamines and monitor symptoms for six months"
    ],
    correctAnswer: 2,
    explanation: "Once sensitised, a worker must be permanently removed from any exposure to the sensitising substance. Sensitisation is irreversible — there is no cure, no desensitisation treatment, and no safe exposure level once the immune system has been primed. Even trace amounts can trigger a severe reaction. RPE alone is not sufficient because no mask provides 100% protection. The worker may need to be redeployed to a different role or area where the substance is not present."
  },
  {
    id: 4,
    question: "The IARC (International Agency for Research on Cancer) classifies substances into groups. Which group means 'carcinogenic to humans' based on sufficient evidence?",
    options: [
      "Group 2A — Probably carcinogenic",
      "Group 2B — Possibly carcinogenic",
      "Group 1 — Carcinogenic to humans",
      "Group 3 — Not classifiable"
    ],
    correctAnswer: 2,
    explanation: "IARC Group 1 means there is sufficient evidence that the substance is carcinogenic to humans. Examples relevant to the trades include asbestos (all forms), benzene, crystalline silica, wood dust (hardwood), diesel engine exhaust, and certain chromium VI compounds. These are not theoretical risks — they are proven human carcinogens with established links to specific cancers based on extensive epidemiological evidence."
  },
  {
    id: 5,
    question: "Which target organ system is most commonly affected by inhaled hazardous substances in the workplace?",
    options: [
      "The reproductive system",
      "The cardiovascular system",
      "The respiratory system (lungs)",
      "The musculoskeletal system"
    ],
    correctAnswer: 2,
    explanation: "The respiratory system (lungs) is the most commonly affected target organ for workplace hazardous substance exposure, because inhalation is the primary route of entry for most workplace substances. Dusts, fumes, vapours, gases, and mists all enter the body through the lungs. Occupational lung diseases including silicosis, COPD, occupational asthma, and lung cancer are among the most prevalent occupational diseases in the UK construction and trades sectors."
  },
  {
    id: 6,
    question: "A worker develops red, cracked, itchy skin on their hands after months of using cement without gloves. The reaction occurs in every worker who handles wet cement without protection. This is most likely:",
    options: [
      "Allergic contact dermatitis",
      "Irritant contact dermatitis",
      "Urticaria (hives)",
      "Chrome ulcers"
    ],
    correctAnswer: 1,
    explanation: "Irritant contact dermatitis is caused by direct chemical damage to the skin — it does not involve the immune system and can affect anyone who has sufficient contact with the irritant substance. Wet cement is highly alkaline (pH 12-13) and is a well-known cause of irritant contact dermatitis. The key distinction is that irritant contact dermatitis can affect anyone given enough exposure, whereas allergic contact dermatitis only affects individuals whose immune systems have become specifically sensitised to a substance."
  },
  {
    id: 7,
    question: "Teratogenic effects of hazardous substances refer to:",
    options: [
      "Damage to the worker's genetic material that can be passed to future generations",
      "Harm to the developing foetus during pregnancy, causing birth defects",
      "Damage to the worker's reproductive organs causing infertility",
      "Allergic reactions that develop during pregnancy"
    ],
    correctAnswer: 1,
    explanation: "Teratogenic effects specifically refer to harm caused to a developing foetus when a pregnant worker (or a worker's partner) is exposed to certain hazardous substances. Teratogens can cause structural birth defects, growth restriction, or developmental problems. This is distinct from mutagenic effects, which cause changes to DNA that can be inherited by future generations, and from reproductive toxicity more broadly, which can include effects on fertility, sexual function, and the developing child. Examples of workplace teratogens include certain solvents, lead compounds, and some pesticides."
  },
  {
    id: 8,
    question: "Which of the following factors does NOT typically increase an individual worker's susceptibility to the effects of hazardous substances?",
    options: [
      "Pre-existing asthma or eczema",
      "Current smoking habit",
      "Being left-handed",
      "Medication that affects liver function"
    ],
    correctAnswer: 2,
    explanation: "Being left-handed has no effect on susceptibility to hazardous substances. However, pre-existing conditions such as asthma and eczema significantly increase vulnerability to respiratory sensitisers and skin irritants respectively. Smoking damages the lungs and reduces their ability to clear inhaled particles, increasing the risk of occupational lung disease. Certain medications — particularly those metabolised by the liver — can interact with workplace chemicals and increase toxicity. Other relevant factors include age, genetic predisposition, and previous sensitisation."
  }
];

export default function CoshhAwarenessModule1Section4() {
  useSEO({
    title: "Health Effects of Hazardous Substances | COSHH Awareness Module 1.4",
    description: "Acute and chronic health effects, occupational lung and skin diseases, occupational cancers, sensitisation, reproductive effects, individual susceptibility, and the importance of health surveillance.",
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
            <Link to="../coshh-awareness-module-1">
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
            <HeartPulse className="h-7 w-7 text-violet-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 mx-auto">
            <span className="text-violet-400 text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Health Effects of Hazardous Substances
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How hazardous substances damage the body, the difference between acute and chronic effects, occupational diseases of the lungs and skin, cancers, sensitisation, and why individual susceptibility matters
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Acute effects:</strong> Burns, nausea, dizziness &mdash; immediate</li>
              <li><strong>Chronic effects:</strong> Cancer, COPD, asthma &mdash; years later</li>
              <li><strong>Sensitisation:</strong> Permanent, irreversible, no cure</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Target organs:</strong> Lungs, skin, liver, kidneys, nervous system</li>
              <li><strong>Cancer latency:</strong> 10&ndash;40 years before diagnosis</li>
              <li><strong>Health surveillance</strong> catches problems early</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between acute and chronic health effects, with examples relevant to the electrical trades",
              "Identify the main target organs affected by hazardous substances and explain how damage occurs",
              "Describe the key occupational lung diseases, including silicosis, COPD, occupational asthma, and metal fume fever",
              "Explain the difference between irritant contact dermatitis and allergic contact dermatitis",
              "Describe the process of sensitisation and explain why it is irreversible",
              "Explain why individual susceptibility must be considered in COSHH assessments and why health surveillance is essential"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-violet-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/* Section 01: Acute vs Chronic Health Effects                   */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">01</span>
            Acute vs Chronic Health Effects
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The health effects of hazardous substances are broadly divided into two categories:
                <strong> acute effects</strong> and <strong>chronic effects</strong>. Understanding this
                distinction is fundamental to COSHH because it determines how quickly harm can occur,
                how it is detected, and how it should be prevented.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-violet-400 mb-3">Acute Effects</p>
                  <p className="text-sm text-white/80 mb-3">
                    Appear <strong className="text-white">rapidly</strong> &mdash; within minutes, hours, or days
                    &mdash; after a single or short-term exposure. They are usually obvious and can often be
                    treated if action is taken promptly.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                      <span>Chemical burns to skin or eyes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                      <span>Eye, nose, and throat irritation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                      <span>Nausea and vomiting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                      <span>Dizziness and headaches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                      <span>Narcosis (drowsiness, loss of consciousness)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                      <span>Asphyxiation (oxygen deprivation)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                      <span>Anaphylaxis (severe allergic reaction)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-violet-400 mb-3">Chronic Effects</p>
                  <p className="text-sm text-white/80 mb-3">
                    Develop <strong className="text-white">gradually</strong> over weeks, months, or years of
                    repeated or prolonged exposure. Often irreversible by the time they are detected.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                      <span>Cancer (lung, bladder, skin, blood)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                      <span>COPD (chronic obstructive pulmonary disease)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                      <span>Occupational asthma</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                      <span>Chronic dermatitis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                      <span>Liver and kidney damage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                      <span>Neurological damage (tremors, memory loss)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                      <span>Reproductive harm (infertility, birth defects)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">Key Point</p>
                </div>
                <p className="text-sm text-white/80">
                  Many hazardous substances can cause <strong className="text-white">both</strong> acute and chronic effects.
                  For example, a solvent may cause immediate dizziness and headaches (acute) at high concentrations,
                  but repeated lower-level exposure over months can cause permanent liver damage (chronic). This is why
                  COSHH sets both <strong className="text-white">short-term exposure limits (STELs)</strong> &mdash; typically
                  over 15 minutes &mdash; and <strong className="text-white">workplace exposure limits (WELs)</strong> &mdash;
                  typically over 8 hours &mdash; for many substances.
                </p>
              </div>

              {/* Acute vs Chronic Timeline Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-4 text-center">Acute vs Chronic &mdash; Timeline Comparison</p>

                <div className="space-y-6 max-w-lg mx-auto">
                  {/* Acute timeline */}
                  <div>
                    <p className="text-xs text-white/70 mb-2 font-medium">Acute Effects</p>
                    <div className="flex items-center gap-0">
                      <div className="flex-1">
                        <div className="relative h-8 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="absolute h-full rounded-full bg-violet-400/40 border border-violet-400/50"
                            style={{ left: "0%", width: "15%" }}
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white/60">
                            Seconds to days
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] text-white/40 mt-1 px-1">
                      <span>Exposure</span>
                      <span>Hours</span>
                      <span>Days</span>
                      <span>Weeks</span>
                      <span>Months</span>
                      <span>Years</span>
                    </div>
                  </div>

                  {/* Chronic timeline */}
                  <div>
                    <p className="text-xs text-white/70 mb-2 font-medium">Chronic Effects</p>
                    <div className="flex items-center gap-0">
                      <div className="flex-1">
                        <div className="relative h-8 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="absolute h-full rounded-full bg-violet-600/50 border border-violet-600/60"
                            style={{ left: "40%", width: "60%" }}
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white/60">
                            Months to decades
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] text-white/40 mt-1 px-1">
                      <span>Exposure</span>
                      <span>Hours</span>
                      <span>Days</span>
                      <span>Weeks</span>
                      <span>Months</span>
                      <span>Years</span>
                    </div>
                  </div>

                  {/* Cancer latency */}
                  <div>
                    <p className="text-xs text-white/70 mb-2 font-medium">Occupational Cancer Latency</p>
                    <div className="flex items-center gap-0">
                      <div className="flex-1">
                        <div className="relative h-8 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="absolute h-full rounded-full bg-red-500/50 border border-red-500/60"
                            style={{ left: "50%", width: "50%" }}
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white/60">
                            10&ndash;40+ years after first exposure
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] text-white/40 mt-1 px-1">
                      <span>Exposure</span>
                      <span>Hours</span>
                      <span>Days</span>
                      <span>Weeks</span>
                      <span>Months</span>
                      <span>Years</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 bg-violet-500/10 border border-violet-500/30 rounded-lg p-3 text-center">
                  <p className="text-xs text-violet-300 font-medium">
                    Chronic effects are often irreversible by the time symptoms appear &mdash; prevention is the only effective strategy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 02: How Hazardous Substances Damage the Body         */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">02</span>
            How Hazardous Substances Damage the Body
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Different hazardous substances target different organs and body systems. Understanding
                which organs are most at risk helps in selecting appropriate controls and recognising
                early warning signs of harm. The main <strong>target organs</strong> affected by
                workplace hazardous substances are the lungs, skin, liver, kidneys, nervous system,
                blood, and reproductive system.
              </p>

              {/* Target Organs Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-4 text-center">Target Organs &mdash; How Hazardous Substances Cause Damage</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {/* Lungs */}
                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-violet-300 mb-1">Lungs (Respiratory System)</p>
                    <p className="text-xs text-white/60 mb-2">Primary route: Inhalation</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Fibrosis (scarring) &mdash; silicosis, asbestosis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Inflammation &amp; airway narrowing &mdash; asthma, COPD</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Cancer &mdash; lung carcinoma</span>
                      </li>
                    </ul>
                  </div>

                  {/* Skin */}
                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-violet-300 mb-1">Skin</p>
                    <p className="text-xs text-white/60 mb-2">Primary route: Direct contact, absorption</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Chemical burns (acids, alkalis)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Dermatitis (irritant &amp; allergic)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Skin cancer (tar, UV, arsenic)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Liver */}
                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-violet-300 mb-1">Liver</p>
                    <p className="text-xs text-white/60 mb-2">Primary route: Ingestion, absorption</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Hepatotoxicity &mdash; solvents (carbon tetrachloride)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Cirrhosis and liver failure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Liver cancer (vinyl chloride)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Kidneys */}
                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-violet-300 mb-1">Kidneys</p>
                    <p className="text-xs text-white/60 mb-2">Primary route: Absorption, ingestion</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Nephrotoxicity &mdash; heavy metals (lead, cadmium, mercury)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Chronic kidney disease</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Kidney cancer (certain solvents)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Nervous System */}
                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-violet-300 mb-1">Nervous System</p>
                    <p className="text-xs text-white/60 mb-2">Primary route: Inhalation, absorption</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Narcosis &mdash; solvents (drowsiness, confusion)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Peripheral neuropathy &mdash; lead, n-hexane</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Chronic solvent encephalopathy (memory, concentration)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Blood */}
                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-violet-300 mb-1">Blood</p>
                    <p className="text-xs text-white/60 mb-2">Primary route: Inhalation, absorption</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Anaemia &mdash; lead poisoning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Leukaemia &mdash; benzene exposure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Carbon monoxide poisoning (displaces oxygen)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Reproductive System — spans full width */}
                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3 sm:col-span-2">
                    <p className="text-sm font-medium text-violet-300 mb-1">Reproductive System</p>
                    <p className="text-xs text-white/60 mb-2">Primary route: Inhalation, absorption, ingestion</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Reduced fertility &mdash; lead, certain solvents, glycol ethers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Teratogenic effects (birth defects) &mdash; lead, certain solvents</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span>Mutagenic effects (DNA damage) &mdash; benzene, ethylene oxide</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-xs text-white/40 text-center mt-4">
                  Some substances affect multiple organs simultaneously &mdash; the dose, route of entry, and individual susceptibility all influence the outcome
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Routes of Entry Into the Body</p>
                <p className="text-sm text-white/80 mb-3">
                  Hazardous substances enter the body through four main routes. The route of entry determines
                  which organs are affected first and how quickly the substance reaches the bloodstream:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-violet-300">1. Inhalation</p>
                    <p className="text-xs text-white/60 mt-1">
                      The most common and most dangerous route in the workplace. Dusts, fumes, vapours,
                      gases, and mists are breathed directly into the lungs, where they can enter the
                      bloodstream rapidly through the thin alveolar walls.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-violet-300">2. Skin Absorption</p>
                    <p className="text-xs text-white/60 mt-1">
                      Many chemicals can pass through intact skin and enter the bloodstream. Substances marked
                      with &ldquo;Sk&rdquo; in EH40 can absorb through the skin. Cuts, abrasions, and dermatitis
                      significantly increase absorption rates.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-violet-300">3. Ingestion</p>
                    <p className="text-xs text-white/60 mt-1">
                      Swallowing hazardous substances, often through poor hygiene &mdash; eating, drinking,
                      or smoking with contaminated hands. Lead exposure commonly occurs this way.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-violet-300">4. Injection</p>
                    <p className="text-xs text-white/60 mt-1">
                      Substances entering through broken skin via cuts, puncture wounds, or needle-stick
                      injuries. Less common but bypasses the body&rsquo;s skin barrier entirely.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/* Section 03: Occupational Lung Diseases                       */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">03</span>
            Occupational Lung Diseases
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The lungs are the organ most commonly damaged by workplace hazardous substances, because
                <strong> inhalation is the primary route of exposure</strong> for most dusts, fumes, vapours,
                and gases encountered on site. Occupational lung diseases account for a significant proportion
                of work-related ill health in the UK construction and trades sectors.
              </p>

              {/* Silicosis */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">Silicosis</p>
                <p className="text-sm text-white/80 mb-2">
                  A progressive, incurable fibrotic lung disease caused by inhaling <strong className="text-white">respirable
                  crystalline silica (RCS)</strong> dust. Silica is found in concrete, stone, brick, mortar, and
                  sandstone. Electricians are at risk when chasing walls, drilling through concrete or masonry, or
                  cutting block and brickwork.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Silica particles cause irreversible scarring throughout the lung tissue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Progressive breathlessness, persistent cough, chest tightness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Increases the risk of lung cancer and tuberculosis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>RCS is classified as IARC Group 1 &mdash; carcinogenic to humans</span>
                  </li>
                </ul>
              </div>

              {/* Asbestosis note */}
              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">Asbestosis</p>
                </div>
                <p className="text-sm text-white/80">
                  Asbestosis is another fibrotic lung disease, caused by inhaling asbestos fibres. It requires
                  heavy, prolonged exposure and has a latency period of 15&ndash;30 years. Asbestos-related
                  diseases are covered in detail in the dedicated <strong className="text-white">Asbestos Awareness</strong> course
                  &mdash; they are mentioned here for completeness but are not the focus of this COSHH module.
                </p>
              </div>

              {/* COPD */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">Chronic Obstructive Pulmonary Disease (COPD)</p>
                <p className="text-sm text-white/80 mb-2">
                  COPD is a group of progressive lung conditions including <strong className="text-white">chronic bronchitis</strong> and
                  <strong className="text-white"> emphysema</strong>. While commonly associated with smoking, COPD can also be caused
                  or worsened by long-term occupational exposure to dusts, fumes, and gases.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Persistent breathlessness that worsens over time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Chronic cough with sputum production</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Irreversible airflow obstruction &mdash; the airways become permanently narrowed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Occupational exposure to dusts and fumes accounts for approximately 15% of all COPD cases</span>
                  </li>
                </ul>
              </div>

              {/* Occupational Asthma */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">Occupational Asthma</p>
                <p className="text-sm text-white/80 mb-2">
                  Occupational asthma is asthma caused directly by workplace exposure to specific substances called
                  <strong className="text-white"> respiratory sensitisers</strong>. It is one of the most common occupational
                  lung diseases in the UK, with approximately 3,000 new cases diagnosed each year.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Caused by sensitisation to substances such as isocyanates, wood dust, flour dust, soldering flux fumes, and epoxy resins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Symptoms: wheezing, breathlessness, chest tightness, cough &mdash; often worse at work and better at weekends/holidays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Once sensitised, even tiny amounts of the substance trigger a reaction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Early detection and removal from exposure gives the best chance of recovery &mdash; delayed diagnosis often means permanent damage</span>
                  </li>
                </ul>
              </div>

              {/* Extrinsic Allergic Alveolitis */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">Extrinsic Allergic Alveolitis (Hypersensitivity Pneumonitis)</p>
                <p className="text-sm text-white/80 mb-2">
                  An inflammatory lung condition caused by inhaling organic dusts, moulds, or fungal spores.
                  The immune system overreacts to these inhaled particles, causing inflammation deep in the lungs
                  (in the alveoli).
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Flu-like symptoms 4&ndash;8 hours after exposure: fever, chills, breathlessness, dry cough</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Chronic form causes progressive breathlessness and lung fibrosis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Relevant to trades working in damp, poorly ventilated environments or handling mouldy materials</span>
                  </li>
                </ul>
              </div>

              {/* Metal Fume Fever */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">Metal Fume Fever</p>
                <p className="text-sm text-white/80 mb-2">
                  An acute condition caused by inhaling metal oxide fumes, most commonly from welding or cutting
                  galvanised (zinc-coated) steel. It is particularly relevant to electricians working near welding
                  operations or cutting galvanised cable tray and trunking.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Flu-like symptoms: fever, chills, muscle aches, headache, metallic taste &mdash; typically 3&ndash;10 hours after exposure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Usually resolves within 24&ndash;48 hours without treatment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Repeated episodes suggest inadequate fume extraction or RPE</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Sometimes called &ldquo;Monday morning fever&rdquo; because tolerance is lost over the weekend</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Point</p>
                </div>
                <p className="text-sm text-white/80">
                  Most occupational lung diseases are <strong className="text-white">progressive and irreversible</strong>.
                  There is no cure for silicosis, asbestosis, or COPD. Occupational asthma is only potentially
                  reversible if caught very early and the worker is immediately removed from exposure. By the time
                  symptoms are noticeable, significant permanent damage has often already occurred. This is why
                  <strong className="text-white"> prevention through proper COSHH controls is the only effective strategy</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 04: Occupational Skin Diseases                       */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">04</span>
            Occupational Skin Diseases
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The skin is the body&rsquo;s largest organ and is frequently exposed to hazardous substances
                in the workplace. Occupational skin diseases are extremely common &mdash; dermatitis alone
                accounts for a significant proportion of all reported occupational diseases in the UK.
                The hands and forearms are the most commonly affected areas.
              </p>

              {/* Irritant Contact Dermatitis */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">Irritant Contact Dermatitis</p>
                <p className="text-sm text-white/80 mb-2">
                  Caused by <strong className="text-white">direct chemical damage</strong> to the skin. It does not
                  involve the immune system and can affect <strong className="text-white">anyone</strong> given sufficient
                  exposure to the irritant substance. It is the most common form of occupational dermatitis.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Red, dry, cracked, itchy, and sore skin &mdash; typically on hands and forearms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Common causes: wet cement, solvents, detergents, cutting oils, prolonged wet work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Wet cement is particularly aggressive &mdash; its high alkalinity (pH 12&ndash;13) causes rapid skin damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Can be prevented by appropriate gloves, barrier creams, and good hygiene practices</span>
                  </li>
                </ul>
              </div>

              {/* Allergic Contact Dermatitis */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">Allergic Contact Dermatitis</p>
                <p className="text-sm text-white/80 mb-2">
                  An <strong className="text-white">immune-mediated</strong> skin reaction. The body&rsquo;s immune system becomes
                  sensitised to a specific substance, and after sensitisation, even very small amounts trigger
                  a skin reaction. Unlike irritant dermatitis, it only affects sensitised individuals.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Red, blistered, weeping, intensely itchy skin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Common sensitisers: epoxy resins, chromates in cement, nickel, colophony in solder flux, isocyanates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Once sensitised, the reaction is <strong className="text-white">permanent</strong> &mdash; no cure, must avoid substance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Reaction may appear 24&ndash;72 hours after contact (delayed-type hypersensitivity)</span>
                  </li>
                </ul>
              </div>

              {/* Urticaria */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">Urticaria (Contact Hives)</p>
                <p className="text-sm text-white/80 mb-2">
                  An immediate skin reaction characterised by raised, itchy welts (hives) that appear within
                  minutes of contact with the triggering substance. Unlike allergic contact dermatitis, the
                  reaction is immediate rather than delayed.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Can be caused by latex, certain plants, chemicals, and proteins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>In severe cases, can progress to anaphylaxis &mdash; a life-threatening allergic reaction</span>
                  </li>
                </ul>
              </div>

              {/* Skin Cancer */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">Occupational Skin Cancer</p>
                <p className="text-sm text-white/80 mb-2">
                  Certain workplace substances can cause skin cancer after prolonged or repeated exposure.
                  The latency period is typically many years.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Coal tar and pitch &mdash; historically a major cause in construction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Mineral oils and cutting fluids</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Arsenic compounds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Solar UV radiation &mdash; a significant risk for outdoor workers in the trades</span>
                  </li>
                </ul>
              </div>

              {/* Chrome Ulcers */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">Chrome Ulcers</p>
                <p className="text-sm text-white/80 mb-2">
                  Deep, slow-healing ulcers caused by contact with <strong className="text-white">chromium VI (hexavalent chromium)</strong>
                  compounds. Chromium VI is found in certain cements, paints, anti-corrosion coatings, and
                  stainless steel welding fumes.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Typically develop on the hands, fingers, and forearms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Painless initially &mdash; may go unnoticed until they become deep and difficult to treat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Chromium VI is also classified as IARC Group 1 carcinogen (causes lung cancer)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Also causes nasal septum perforation in workers with heavy inhalation exposure</span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">Damaged Skin = Increased Absorption</p>
                </div>
                <p className="text-sm text-white/80">
                  Damaged skin is <strong className="text-white">far more permeable</strong> than intact skin. Once
                  dermatitis develops, the skin barrier is compromised, allowing hazardous substances to
                  absorb through the skin much more easily and enter the bloodstream. This creates a
                  vicious cycle: dermatitis increases chemical absorption, which causes further damage.
                  This is why early treatment and prevention of occupational dermatitis is critical.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/* Section 05: Occupational Cancers                             */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">05</span>
            Occupational Cancers
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Occupational cancer is cancer caused wholly or partly by workplace exposure to carcinogenic
                substances. It is estimated that approximately <strong>8,000 people die each year in the UK</strong> from
                cancers linked to past occupational exposures. Many of these deaths are in the construction
                and trades sectors.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Long Latency Periods</p>
                </div>
                <p className="text-sm text-white/80">
                  Occupational cancers typically develop <strong className="text-white">10 to 40 years</strong> after first
                  exposure. Some, such as mesothelioma, can take up to 60 years. This long delay means that
                  workers diagnosed today were exposed decades ago, often before modern COSHH controls were in
                  place. It also means that workers exposed today may not develop cancer for many years &mdash;
                  making prevention through current COSHH controls essential for protecting future health.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">IARC Group 1 Carcinogens Relevant to the Trades</p>
                <p className="text-xs text-white/50 mb-3">
                  IARC Group 1 = Sufficient evidence of carcinogenicity in humans
                </p>
                <div className="space-y-3">
                  {[
                    { substance: "Asbestos (all forms)", cancers: "Mesothelioma, lung cancer, laryngeal cancer, ovarian cancer", trades: "All trades working in pre-2000 buildings" },
                    { substance: "Crystalline silica (respirable)", cancers: "Lung cancer", trades: "Chasing walls, drilling concrete, cutting stone/brick" },
                    { substance: "Hardwood dust", cancers: "Nasal cavity and paranasal sinus cancer", trades: "Joiners, carpenters, cabinet makers" },
                    { substance: "Diesel engine exhaust", cancers: "Lung cancer", trades: "Plant operators, workers in enclosed spaces with diesel equipment" },
                    { substance: "Benzene", cancers: "Leukaemia (acute myeloid)", trades: "Solvent use, fuel handling, petrochemical work" },
                    { substance: "Chromium VI compounds", cancers: "Lung cancer, nasal cancer", trades: "Welding stainless steel, anti-corrosion coatings, cement" },
                    { substance: "Solar UV radiation", cancers: "Skin cancer (melanoma, non-melanoma)", trades: "All outdoor workers — roofers, linesmen, site workers" },
                    { substance: "Coal tar and pitch", cancers: "Skin cancer, lung cancer, bladder cancer", trades: "Roofing, road surfacing (historical)" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-sm font-medium text-white">{item.substance}</p>
                      <p className="text-xs text-red-300 mt-1">Cancers: {item.cancers}</p>
                      <p className="text-xs text-white/50 mt-0.5">Trades at risk: {item.trades}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">Why Accurate Records Matter</p>
                <p className="text-sm text-white/80">
                  Because of the long latency between exposure and cancer diagnosis, accurate
                  <strong className="text-white"> exposure records</strong> are critical. COSHH Regulation 11 requires
                  that health surveillance records are kept for <strong className="text-white">40 years</strong> from the
                  date of the last entry. This ensures that if a worker develops cancer decades later,
                  there is a record of what they were exposed to, when, and at what levels. These records
                  also support compensation claims and epidemiological research.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 06: Sensitisation & Allergic Reactions               */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">06</span>
            Sensitisation &amp; Allergic Reactions
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Sensitisation is one of the most important concepts in COSHH because once a worker becomes
                sensitised to a substance, <strong>there is no cure and no safe level of future exposure</strong>.
                The worker must permanently avoid the substance, which can mean a change of job role, trade,
                or even career.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">How Sensitisation Works</p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-violet-300">Phase 1: Initial Exposure (No Symptoms)</p>
                    <p className="text-xs text-white/60 mt-1">
                      The worker is first exposed to a sensitising substance. There may be no visible reaction at all.
                      The immune system &ldquo;learns&rdquo; to recognise the substance as a threat. This sensitisation
                      phase can take days, weeks, months, or even years of repeated exposure before the immune system
                      becomes fully primed. During this period, the worker may believe the substance is harmless because
                      they have no symptoms.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-violet-300">Phase 2: Sensitisation Occurs</p>
                    <p className="text-xs text-white/60 mt-1">
                      The immune system becomes permanently programmed to react to the substance. This change is
                      irreversible. The worker is now &ldquo;sensitised&rdquo; &mdash; their immune system will react
                      aggressively to any future exposure, no matter how small.
                    </p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-red-300">Phase 3: Allergic Reaction (Triggered by Tiny Amounts)</p>
                    <p className="text-xs text-white/60 mt-1">
                      Any subsequent exposure &mdash; even to extremely small amounts far below the workplace exposure limit
                      &mdash; triggers a severe allergic reaction. For respiratory sensitisers, this means occupational asthma
                      (wheezing, breathlessness, chest tightness). For skin sensitisers, this means allergic contact dermatitis
                      (redness, blistering, intense itching). Each reaction can be more severe than the last.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Permanent and Irreversible</p>
                </div>
                <p className="text-sm text-white/80">
                  Sensitisation is <strong className="text-white">permanent</strong>. There is no cure, no desensitisation
                  treatment, and no safe level of exposure once the worker is sensitised. RPE alone is
                  <strong className="text-white"> not sufficient</strong> protection because no mask provides 100% filtration.
                  The only option is <strong className="text-white">complete, permanent avoidance</strong> of the sensitising substance.
                  This may require redeployment to a different role or area, and in some cases, the worker
                  may need to change trade entirely.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Sensitisers in the Electrical &amp; Construction Trades</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: "Isocyanates", source: "Two-pack spray paints, spray foams, PU coatings, adhesives", effect: "Respiratory sensitiser → occupational asthma" },
                    { name: "Epoxy resins", source: "Adhesives, coatings, flooring systems, encapsulants", effect: "Skin and respiratory sensitiser → dermatitis, asthma" },
                    { name: "Chromates (Cr VI)", source: "Portland cement, anti-corrosion coatings, plating", effect: "Skin sensitiser → allergic dermatitis, chrome ulcers" },
                    { name: "Colophony (rosin)", source: "Soldering flux fumes, adhesives, sealants", effect: "Respiratory sensitiser → occupational asthma" },
                    { name: "Wood dust", source: "Working with timber, MDF, hardwoods", effect: "Respiratory sensitiser → occupational asthma, nasal cancer" },
                    { name: "Latex proteins", source: "Natural rubber latex gloves", effect: "Skin and respiratory sensitiser → urticaria, anaphylaxis" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-sm font-medium text-violet-300">{item.name}</p>
                      <p className="text-xs text-white/50 mt-1">Source: {item.source}</p>
                      <p className="text-xs text-white/50 mt-0.5">Effect: {item.effect}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">Identifying Sensitisers on Safety Data Sheets</p>
                <p className="text-sm text-white/80">
                  Substances that are respiratory sensitisers carry the GHS hazard statement
                  <strong className="text-white"> H334</strong> (&ldquo;May cause allergy or asthma symptoms or breathing
                  difficulties if inhaled&rdquo;). Skin sensitisers carry <strong className="text-white">H317</strong>
                  (&ldquo;May cause an allergic skin reaction&rdquo;). Both use the GHS &ldquo;health hazard&rdquo;
                  pictogram. Any substance carrying these hazard statements requires specific COSHH controls
                  and health surveillance for exposed workers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 07: Reproductive & Neurological Effects              */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">07</span>
            Reproductive &amp; Neurological Effects
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Some hazardous substances can damage the reproductive system and the nervous system.
                These effects are particularly concerning because they can affect not only the exposed
                worker but potentially their future children as well.
              </p>

              {/* Reproductive Effects */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">Reproductive Effects</p>
                <p className="text-sm text-white/80 mb-3">
                  Reproductive toxicity includes effects on fertility, sexual function, and the development
                  of offspring. These effects are classified into three main categories:
                </p>

                <div className="space-y-3">
                  <div className="bg-violet-500/10 border border-violet-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-violet-300">Teratogenic Effects</p>
                    <p className="text-xs text-white/60 mt-1">
                      Harm to the developing foetus during pregnancy, causing structural birth defects,
                      growth restriction, or developmental problems. The first trimester is the period
                      of greatest vulnerability. Substances with teratogenic potential include certain
                      solvents (glycol ethers), lead compounds, and some pesticides. COSHH assessments
                      must specifically address risks to pregnant workers and women of childbearing age.
                    </p>
                  </div>

                  <div className="bg-violet-500/10 border border-violet-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-violet-300">Mutagenic Effects</p>
                    <p className="text-xs text-white/60 mt-1">
                      Changes to the worker&rsquo;s DNA (genetic material) that can potentially be passed
                      to future generations. Mutagenic substances damage chromosomes or genes, which may
                      lead to cancer in the worker and potentially heritable genetic changes. Examples include
                      benzene, ethylene oxide, and certain chromium VI compounds. Substances classified as
                      mutagens carry the GHS hazard statements H340 or H341.
                    </p>
                  </div>

                  <div className="bg-violet-500/10 border border-violet-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-violet-300">Effects on Fertility</p>
                    <p className="text-xs text-white/60 mt-1">
                      Some substances can reduce fertility in both men and women. Lead is the classic
                      example &mdash; it can reduce sperm count and quality in men and disrupt menstrual
                      cycles in women. Certain glycol ethers (2-methoxyethanol, 2-ethoxyethanol) have
                      been shown to damage sperm production. Women working with lead must have blood lead
                      levels monitored, and the suspension level for women of reproductive capacity is
                      lower than for men.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Important: Affects Both Sexes</p>
                </div>
                <p className="text-sm text-white/80">
                  Reproductive toxicity is <strong className="text-white">not just a women&rsquo;s issue</strong>. Many
                  substances affect male fertility and sperm quality. Lead, certain solvents, and pesticides
                  can all damage male reproductive function. COSHH assessments must consider reproductive
                  risks for all workers, not just pregnant women. Men exposed to reproductive toxicants may
                  experience reduced fertility or produce damaged sperm that could affect their children.
                </p>
              </div>

              {/* Neurological Effects */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">Neurological Effects</p>
                <p className="text-sm text-white/80 mb-3">
                  Many workplace chemicals can damage the nervous system. Neurological effects range from
                  immediate symptoms (dizziness, narcosis) to permanent, irreversible damage (peripheral
                  neuropathy, chronic solvent encephalopathy).
                </p>

                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white">Acute Neurological Effects</p>
                    <ul className="text-xs text-white/70 mt-2 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span><strong className="text-white/90">Narcosis:</strong> Drowsiness, impaired judgement, loss of consciousness &mdash; caused by solvent vapours in poorly ventilated areas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span><strong className="text-white/90">Headaches and dizziness:</strong> Very common with solvent exposure &mdash; a warning sign of inadequate ventilation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span><strong className="text-white/90">Convulsions:</strong> Severe acute poisoning, e.g. organophosphate pesticides</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white">Chronic Neurological Effects</p>
                    <ul className="text-xs text-white/70 mt-2 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span><strong className="text-white/90">Peripheral neuropathy:</strong> Numbness, tingling, weakness in hands and feet &mdash; caused by lead, n-hexane, acrylamide</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span><strong className="text-white/90">Chronic solvent encephalopathy:</strong> Progressive memory loss, difficulty concentrating, personality changes, depression &mdash; from years of solvent exposure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                        <span><strong className="text-white/90">Parkinsonism:</strong> Tremors and movement disorders &mdash; associated with manganese exposure (welding fumes)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">Safety-Critical Implications</p>
                </div>
                <p className="text-sm text-white/80">
                  Neurological effects have direct <strong className="text-white">safety-critical implications</strong> for
                  electricians and trades workers. Dizziness, impaired judgement, and narcosis from solvent
                  exposure can lead to falls from height, electric shock, and other serious accidents. A
                  worker who feels &ldquo;a bit dizzy&rdquo; or &ldquo;light-headed&rdquo; while using
                  solvents in an enclosed space is experiencing acute neurotoxic effects and must stop work
                  immediately and move to fresh air.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/* Section 08: Individual Susceptibility & Early Detection      */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">08</span>
            Individual Susceptibility &amp; Early Detection
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not everyone responds to hazardous substances in the same way. The same exposure that
                causes no apparent harm in one worker may cause significant illness in another. This is
                known as <strong>individual susceptibility</strong>, and it is a critical factor that must
                be considered in every COSHH assessment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">Factors That Increase Individual Susceptibility</p>
                <div className="space-y-3">
                  {[
                    {
                      factor: "Pre-existing respiratory conditions",
                      detail: "Workers with asthma, COPD, or other lung conditions are significantly more vulnerable to respiratory irritants and sensitisers. They may react at exposure levels well below the WEL that would not affect a healthy colleague."
                    },
                    {
                      factor: "Pre-existing skin conditions",
                      detail: "Workers with eczema, psoriasis, or damaged skin are much more vulnerable to skin irritants and sensitisers. The compromised skin barrier allows greater chemical absorption and makes dermatitis more likely."
                    },
                    {
                      factor: "Genetic factors",
                      detail: "Individual genetic variations can affect how quickly the body metabolises (breaks down) hazardous chemicals. Some people are 'fast metabolisers' and others 'slow metabolisers', affecting how long a toxic substance remains active in the body."
                    },
                    {
                      factor: "Smoking",
                      detail: "Smoking damages the lungs and reduces their ability to clear inhaled particles. Smokers exposed to workplace dusts and fumes are at significantly increased risk of occupational lung disease. The synergistic effect of smoking and asbestos (50x lung cancer risk) is the most dramatic example."
                    },
                    {
                      factor: "Age",
                      detail: "Older workers may have reduced lung function and less efficient detoxification mechanisms. Younger or apprentice workers may be less experienced in recognising hazards and using controls correctly."
                    },
                    {
                      factor: "Medication interactions",
                      detail: "Certain medications — particularly those metabolised by the liver (e.g. paracetamol, statins, some antibiotics) — can interact with workplace chemicals, increasing toxicity or reducing the liver's ability to detoxify absorbed substances."
                    },
                    {
                      factor: "Previous sensitisation",
                      detail: "A worker already sensitised to one substance may have a hyperactive immune system that is more likely to develop sensitivity to related chemicals. Cross-sensitisation between chemically similar substances is well documented."
                    }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-sm font-medium text-white">{item.factor}</p>
                      <p className="text-xs text-white/60 mt-1">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">Implications for COSHH Assessments</p>
                <p className="text-sm text-white/80">
                  COSHH assessments must not assume that all workers are equally healthy and equally resistant
                  to the effects of hazardous substances. The assessment should identify whether any workers
                  are particularly vulnerable &mdash; for example, those with pre-existing asthma, pregnant workers,
                  or young workers &mdash; and ensure that control measures are adequate to protect
                  <strong className="text-white"> the most susceptible individuals</strong>, not just the average worker.
                  Workplace exposure limits are set to protect the majority of the working population, but they
                  may not be sufficient for particularly vulnerable individuals.
                </p>
              </div>

              {/* Health Surveillance */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">Health Surveillance: The Importance of Early Detection</p>
                <p className="text-sm text-white/80 mb-3">
                  Health surveillance is a systematic programme of health checks designed to detect early signs
                  of work-related ill health. It is a legal requirement under <strong className="text-white">COSHH
                  Regulation 11</strong> where specific conditions are met.
                </p>

                <div className="bg-white/5 border border-white/10 p-3 rounded-lg mb-3">
                  <p className="text-sm font-medium text-white mb-2">Health surveillance is required when:</p>
                  <ul className="text-xs text-white/70 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                      <span>There is an identifiable disease or adverse health effect linked to the substance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                      <span>There is a reasonable likelihood that the disease or effect may occur under the conditions of work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 w-1 h-1 rounded-full bg-violet-400/60 flex-shrink-0" />
                      <span>Valid techniques exist to detect the disease or health effect</span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { type: "Spirometry (Lung Function Tests)", purpose: "Detects early airway obstruction in workers exposed to respiratory sensitisers, dusts, and fumes. Measures FEV1 and FVC." },
                    { type: "Skin Inspections", purpose: "Detects early signs of dermatitis in workers handling known skin irritants or sensitisers. Can be done by trained supervisors or occupational health professionals." },
                    { type: "Blood/Urine Monitoring", purpose: "Biological monitoring for specific substances, e.g. blood lead levels for lead workers, urine tests for isocyanate metabolites." },
                    { type: "Questionnaires", purpose: "Symptom questionnaires can identify early respiratory or skin symptoms before they become clinically significant." }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-sm font-medium text-violet-300">{item.type}</p>
                      <p className="text-xs text-white/60 mt-1">{item.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Early Detection Saves Lives and Livelihoods</p>
                </div>
                <p className="text-sm text-white/80">
                  The purpose of health surveillance is <strong className="text-white">early detection</strong> &mdash;
                  catching health problems at a stage where further damage can be prevented. For occupational
                  asthma, early detection and removal from exposure gives the best chance of full recovery. If
                  diagnosis is delayed and the worker continues to be exposed, the asthma becomes permanent and
                  irreversible. For occupational dermatitis, early skin checks can catch the first signs before
                  the skin barrier is seriously compromised. For lead exposure, regular blood tests ensure levels
                  remain below the action and suspension levels. Health surveillance is not a substitute for
                  proper COSHH controls &mdash; it is a <strong className="text-white">safety net</strong> that detects
                  early signs of failure in those controls.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Record Keeping</p>
                <p className="text-sm text-white/80">
                  Health surveillance records must be kept for <strong className="text-white">40 years</strong> from the date
                  of the last entry. Individual workers have the right to access their own health records.
                  Records must include the name of the worker, the date of each health surveillance procedure,
                  the name of the person conducting the surveillance, the outcome, and any restrictions or
                  recommendations. These records are essential for tracking long-term health trends, supporting
                  compensation claims, and providing evidence in legal proceedings.
                </p>
              </div>
            </div>
          </div>
        </section>

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
            <Link to="../coshh-awareness-module-1-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-2">
              Next: Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
