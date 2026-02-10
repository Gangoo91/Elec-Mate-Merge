import { ArrowLeft, Construction, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "cement-burns-ph",
    question:
      "What pH level makes wet cement capable of causing chemical burns?",
    options: ["pH 7-8 (neutral)", "pH 9-10 (mildly alkaline)", "pH 12-13 (strongly alkaline)", "pH 14+ (extremely alkaline)"],
    correctIndex: 2,
    explanation:
      "Wet cement has a pH of 12-13, making it strongly alkaline. At this pH, cement can cause serious chemical burns to unprotected skin within a short period of contact. Burns may not be immediately painful, so workers often do not realise the damage until it is already severe. Always wear alkali-resistant gloves and waterproof clothing when handling wet cement.",
  },
  {
    id: "silica-wel",
    question:
      "What is the UK workplace exposure limit (WEL) for respirable crystalline silica (RCS)?",
    options: [
      "0.01 mg/m\u00b3",
      "0.1 mg/m\u00b3",
      "1.0 mg/m\u00b3",
      "3.0 mg/m\u00b3",
    ],
    correctIndex: 1,
    explanation:
      "The UK workplace exposure limit for respirable crystalline silica is 0.1 mg/m\u00b3 (8-hour TWA). This is an extremely low limit, reflecting the serious health risks associated with silica dust exposure. Activities such as cutting, drilling, and grinding concrete, brick, or stone can easily exceed this limit without adequate controls such as water suppression and on-tool extraction.",
  },
  {
    id: "dee-iarc-classification",
    question:
      "How has the International Agency for Research on Cancer (IARC) classified diesel exhaust emissions?",
    options: [
      "Group 2B \u2014 possibly carcinogenic",
      "Group 2A \u2014 probably carcinogenic",
      "Group 1 \u2014 carcinogenic to humans",
      "Not classified as carcinogenic",
    ],
    correctIndex: 2,
    explanation:
      "IARC classifies diesel exhaust emissions (DEE) as Group 1 \u2014 carcinogenic to humans. This is the highest classification, meaning there is sufficient evidence that DEE causes cancer in humans, particularly lung cancer. On construction sites, exposure is a significant concern in enclosed or poorly ventilated areas where diesel-powered plant and equipment operates.",
  },
];

const faqs = [
  {
    question:
      "Can I get cement burns even if I wash the cement off quickly?",
    answer:
      "Yes. Cement burns can develop from relatively brief contact, particularly if cement gets trapped against the skin inside boots or gloves. The alkaline reaction begins immediately on contact with moisture (including sweat), and symptoms may be delayed by hours. This is why prevention \u2014 wearing the correct PPE before contact occurs \u2014 is far more effective than relying on washing alone. If cement does contact your skin, wash immediately with clean water and seek medical attention if redness, pain, or blistering develops.",
  },
  {
    question:
      "Is silica dust only a problem when cutting with power tools?",
    answer:
      "No. While power tool activities such as cutting, grinding, and chasing concrete or brick generate the highest concentrations of respirable crystalline silica, other activities also create silica dust. Hand drilling, sweeping dry dust, demolition work, and even disturbing settled dust can release silica particles. Any activity that creates visible dust from concrete, brick, stone, morite block, or similar silica-containing materials should be treated as a silica exposure risk. Controls should be proportionate to the level and duration of dust generation.",
  },
  {
    question:
      "Are softwood dusts completely safe compared to hardwood dusts?",
    answer:
      "No. While hardwood dust carries a higher risk of nasal cancer (which is why it has a lower WEL of 3 mg/m\u00b3 compared to 5 mg/m\u00b3 for softwood), softwood dust is far from harmless. Softwood dust can cause occupational asthma, rhinitis, dermatitis, and chronic respiratory irritation. Western red cedar in particular is a potent respiratory sensitiser. Both hardwood and softwood dust exposures must be controlled, and on-tool extraction or LEV should be used whenever machining, cutting, or sanding timber.",
  },
  {
    question:
      "What should I do if I feel dizzy or lightheaded whilst using solvents?",
    answer:
      "Stop work immediately and move to fresh air. Solvent vapours cause narcotic effects (dizziness, lightheadedness, nausea, confusion) because they affect the central nervous system. If symptoms do not resolve quickly in fresh air, seek medical attention. Report the incident to your supervisor \u2014 it indicates that ventilation is inadequate or that RPE is needed. Do not return to the task until proper controls (ventilation, extraction, RPE) are in place. Repeated exposure to solvent vapours, even at levels that do not cause immediate symptoms, can cause long-term damage to the liver, kidneys, and nervous system.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the EU limit for hexavalent chromium (Cr(VI)) in cement?",
    options: ["0.5 ppm", "2 ppm", "5 ppm", "10 ppm"],
    correctAnswer: 1,
    explanation:
      "The EU Directive 2003/53/EC limits soluble chromium VI in cement to 2 ppm (parts per million). Hexavalent chromium is a potent sensitiser and can cause allergic contact dermatitis (cement dermatitis). Ferrous sulphate is added to cement during manufacture to reduce Cr(VI) to the less harmful trivalent form. UK cement must comply with this limit.",
  },
  {
    id: 2,
    question:
      "Which disease is caused by long-term inhalation of respirable crystalline silica?",
    options: [
      "Asbestosis",
      "Legionnaires' disease",
      "Silicosis",
      "Weil's disease",
    ],
    correctAnswer: 2,
    explanation:
      "Silicosis is an irreversible and progressive lung disease caused by inhaling respirable crystalline silica (RCS). The tiny silica particles lodge deep in the lungs and cause scarring (fibrosis), reducing lung capacity over time. There is no cure for silicosis. It can develop after years of exposure and may progress even after exposure has stopped.",
  },
  {
    id: 3,
    question: "What is the UK workplace exposure limit for hardwood dust?",
    options: ["1 mg/m\u00b3", "3 mg/m\u00b3", "5 mg/m\u00b3", "10 mg/m\u00b3"],
    correctAnswer: 1,
    explanation:
      "The UK WEL for hardwood dust is 3 mg/m\u00b3 (8-hour TWA). This is lower than the softwood limit of 5 mg/m\u00b3 because hardwood dust is classified as a carcinogen \u2014 specifically, it is associated with an increased risk of nasal cancer (adenocarcinoma of the nasal sinuses). This was established through epidemiological studies of furniture makers and woodworkers.",
  },
  {
    id: 4,
    question:
      "Which of the following is a key health risk associated with isocyanates found in 2-pack paints and spray foam insulation?",
    options: [
      "Hearing loss",
      "Occupational asthma (respiratory sensitisation)",
      "Vibration white finger",
      "Lead poisoning",
    ],
    correctAnswer: 1,
    explanation:
      "Isocyanates are one of the most common causes of occupational asthma in the UK. They are powerful respiratory sensitisers \u2014 once sensitised, even tiny exposures can trigger severe asthma attacks. Isocyanates are found in 2-pack (two-component) paints, spray foam insulation, polyurethane adhesives, and some sealants. Workers using these products must have health surveillance and appropriate RPE.",
  },
  {
    id: 5,
    question:
      "What type of extraction is the preferred engineering control when using power tools to cut timber?",
    options: [
      "General room ventilation only",
      "Opening nearby windows",
      "On-tool extraction (LEV connected directly to the tool)",
      "Wearing a dust mask is sufficient",
    ],
    correctAnswer: 2,
    explanation:
      "On-tool extraction \u2014 local exhaust ventilation (LEV) connected directly to the power tool \u2014 is the preferred engineering control for wood dust. It captures dust at the point of generation before it becomes airborne, which is far more effective than relying on general ventilation or RPE alone. The HSE's COSHH Essentials guidance specifies on-tool extraction as the primary control for most woodworking operations.",
  },
  {
    id: 6,
    question:
      "Why are flash points important when working with solvents on construction sites?",
    options: [
      "They indicate the boiling temperature of the solvent",
      "They indicate the temperature at which the solvent gives off enough vapour to ignite",
      "They measure the toxicity of the solvent",
      "They indicate the shelf life of the product",
    ],
    correctAnswer: 1,
    explanation:
      "The flash point is the lowest temperature at which a liquid gives off enough vapour to form an ignitable mixture with air near its surface. Many common construction solvents have low flash points \u2014 for example, acetone has a flash point of -20\u00b0C, meaning it produces ignitable vapour even in cold conditions. Understanding flash points is essential for fire risk assessment on construction sites, particularly in enclosed spaces.",
  },
  {
    id: 7,
    question:
      "What is the main health concern when cutting PIR or PUR insulation boards with power tools?",
    options: [
      "Electric shock from the tool",
      "Release of isocyanate fumes and fine particulate dust",
      "Radiation exposure from the board",
      "Noise levels exceeding 85 dB",
    ],
    correctAnswer: 1,
    explanation:
      "When PIR (polyisocyanurate) or PUR (polyurethane) insulation boards are cut with power tools, they release fine particulate dust and, critically, isocyanate fumes. Isocyanates are powerful respiratory sensitisers that can cause occupational asthma. The heat generated by power tool cutting can also decompose the foam and release hydrogen cyanide (HCN) and other toxic fumes. Adequate ventilation or extraction and appropriate RPE must be used.",
  },
  {
    id: 8,
    question:
      "In what type of workspace is diesel exhaust emission (DEE) exposure MOST dangerous on construction sites?",
    options: [
      "Open-air car parks",
      "Enclosed or poorly ventilated spaces such as tunnels, basements, and indoor demolition areas",
      "Outdoor roadworks",
      "Scaffolding at height",
    ],
    correctAnswer: 1,
    explanation:
      "Diesel exhaust emissions are most dangerous in enclosed or poorly ventilated spaces because the exhaust gases and particulates cannot disperse naturally. Tunnels, basements, indoor demolition areas, and deep excavations are particularly high-risk environments. In these spaces, DEE concentrations can rapidly build to hazardous levels. Controls include using electric or LPG-powered plant where possible, forced ventilation, and restricting diesel engine running times.",
  },
];

export default function CoshhAwarenessModule3Section1() {
  useSEO({
    title:
      "Common Construction Hazards | COSHH Awareness Module 3.1",
    description:
      "Cement, silica dust, wood dust, solvents, adhesives, paints, insulation materials, and diesel exhaust \u2014 identifying and controlling the most common hazardous substances on construction sites.",
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
            <Link to="../coshh-awareness-module-3">
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
            <Construction className="h-7 w-7 text-violet-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 mx-auto">
            <span className="text-violet-400 text-xs font-semibold">
              MODULE 3 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Common Construction Hazards
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Identifying and controlling the most common hazardous substances
            found on construction sites &mdash; from cement and silica dust to
            solvents, insulation materials, and diesel exhaust emissions
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
                <strong>Cement:</strong> pH 12&ndash;13, causes chemical burns
                and dermatitis; Cr(VI) limit 2 ppm
              </li>
              <li>
                <strong>Silica:</strong> WEL 0.1 mg/m&sup3;; causes silicosis
                (irreversible lung disease)
              </li>
              <li>
                <strong>Wood dust:</strong> Hardwood WEL 3 mg/m&sup3;; nasal
                cancer risk
              </li>
              <li>
                <strong>Diesel exhaust:</strong> IARC Group 1 carcinogen;
                critical in enclosed spaces
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400 text-base font-medium mb-2">
              Control Hierarchy
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Eliminate:</strong> Use less hazardous alternatives where
                possible
              </li>
              <li>
                <strong>Substitute:</strong> Low-silica products, water-based
                solvents
              </li>
              <li>
                <strong>Engineer:</strong> LEV, on-tool extraction, wet cutting
              </li>
              <li>
                <strong>RPE/PPE:</strong> Last resort &mdash; respiratory and
                skin protection
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
              "Identify the main hazardous substances encountered on construction sites",
              "Describe the health effects of cement, silica dust, wood dust, and solvents",
              "State the workplace exposure limits for silica, hardwood dust, and softwood dust",
              "Explain the risks of isocyanates in adhesives, paints, and insulation materials",
              "Describe why diesel exhaust emissions are classified as a Group 1 carcinogen",
              "Select appropriate control measures for each category of hazardous substance",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-violet-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ─── Section 01: Overview of Construction Hazards ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">01</span>
            Overview of Construction Hazards
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction sites are among the most hazardous working
                environments in the UK. Workers are routinely exposed to a wide
                range of substances that can cause serious short-term and
                long-term health effects &mdash; from skin burns and respiratory
                irritation to occupational asthma, silicosis, and cancer.
              </p>

              <p>
                The Control of Substances Hazardous to Health Regulations 2002
                (COSHH) require employers to assess and control exposure to all
                hazardous substances encountered at work. On construction sites,
                this means identifying the specific substances present in the
                materials being used, cut, drilled, mixed, applied, or
                disturbed, and implementing appropriate controls for each one.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">Key Principle:</strong>{" "}
                  Most construction hazardous substances cause harm through{" "}
                  <strong>inhalation</strong> (breathing in dust, fumes, or
                  vapour), <strong>skin contact</strong> (absorption, burns, or
                  sensitisation), or <strong>ingestion</strong> (swallowing
                  contaminated food, drink, or dust). Understanding the{" "}
                  <strong>route of exposure</strong> for each substance is
                  essential for selecting the right controls.
                </p>
              </div>

              <p>
                This section covers the most commonly encountered hazardous
                substances on construction sites. For each substance, we examine
                where it is found, how exposure occurs, what the health effects
                are, and what control measures must be used. The substances
                covered include cement products, silica dust, wood dust,
                solvents, adhesives, paints, insulation materials, and diesel
                exhaust emissions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Routes of Exposure on Construction Sites
                </p>
                <div className="grid sm:grid-cols-3 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-violet-400">Inhalation</p>
                    <p className="text-white/70 text-xs">
                      Dust, fumes, vapours, mists &middot; Most common route
                      &middot; Often invisible particles
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-violet-400">Skin</p>
                    <p className="text-white/70 text-xs">
                      Direct contact, splashes, immersion &middot; Burns,
                      dermatitis, sensitisation &middot; Absorption into
                      bloodstream
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-violet-400">Ingestion</p>
                    <p className="text-white/70 text-xs">
                      Contaminated hands, food, drink &middot; Smoking on site
                      &middot; Poor hygiene practices
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Latency Period
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Many occupational diseases caused by construction hazardous
                  substances have a{" "}
                  <strong className="text-white">long latency period</strong>.
                  Silicosis, occupational cancers, and chronic respiratory
                  diseases may not develop symptoms for 10&ndash;40 years after
                  exposure. This means that the damage being done today may not
                  become apparent for decades. Prevention now is the only
                  protection against future disease.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 02: Cement & Concrete Products ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">02</span>
            Cement &amp; Concrete Products
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Cement is one of the most widely used materials on construction
                sites, yet it presents several serious health hazards that are
                often underestimated. The three main risks from cement are{" "}
                <strong>chemical burns</strong> from wet cement,{" "}
                <strong>cement dermatitis</strong> from skin contact (including
                sensitisation to hexavalent chromium), and{" "}
                <strong>respiratory irritation</strong> from cement dust.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Cement Burns (Alkaline Burns)
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cause:</strong> Wet cement
                      has a pH of <strong>12&ndash;13</strong>, making it
                      strongly alkaline. Contact with skin causes chemical burns
                      that destroy tissue.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Mechanism:</strong> The
                      calcium hydroxide in cement reacts with moisture (including
                      sweat) to create a strongly alkaline solution that
                      penetrates and destroys skin tissue progressively.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Delayed symptoms:</strong>{" "}
                      Unlike acid burns, alkaline burns are often{" "}
                      <strong>not immediately painful</strong>. Workers may not
                      realise they have been burned until hours later, by which
                      time significant tissue damage has occurred.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Common scenarios:</strong>{" "}
                      Cement trapped inside boots, kneeling in wet cement,
                      splashes onto unprotected skin, wearing cement-contaminated
                      clothing for extended periods.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Hexavalent Chromium &mdash; Cr(VI)
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">What it is:</strong>{" "}
                      Hexavalent chromium (Cr(VI)) is a chemical compound
                      naturally present in cement as a by-product of the
                      manufacturing process. It is a potent{" "}
                      <strong>skin sensitiser</strong> and{" "}
                      <strong>carcinogen</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Cement dermatitis:
                      </strong>{" "}
                      Repeated skin contact with cement containing Cr(VI) can
                      cause <strong>allergic contact dermatitis</strong>. Once
                      sensitised, a worker will react to even tiny amounts of
                      Cr(VI), potentially ending their ability to work with
                      cement products.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">EU limit:</strong> EU
                      Directive 2003/53/EC limits soluble Cr(VI) in cement to{" "}
                      <strong>2 ppm</strong> (parts per million). Ferrous
                      sulphate is added during manufacture to reduce Cr(VI) to
                      the less harmful trivalent form (Cr(III)).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Shelf life:</strong> The
                      ferrous sulphate additive has a limited shelf life. Cement
                      stored beyond its marked use-by date may have reverted to
                      higher Cr(VI) levels.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Preventive Measures for Cement Work
                </p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>Alkali-resistant gloves (not standard latex)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>Waterproof boots (not fabric trainers)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>Long sleeves and trousers over boots</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>Barrier cream and emollient after-work cream</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>Wash skin immediately if contact occurs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>Check cement is within Cr(VI) use-by date</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>RPE (P2 minimum) when mixing dry cement</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>Welfare facilities for washing and changing</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Never Kneel in Wet Cement
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Some of the most severe cement burns occur when workers kneel
                  in wet cement or allow cement to get inside their boots. The
                  prolonged, trapped contact against the skin at pH 12&ndash;13
                  can cause{" "}
                  <strong className="text-white">
                    third-degree chemical burns requiring skin grafts
                  </strong>
                  . The HSE has documented cases where workers lost months of
                  work or suffered permanent scarring from a single day of
                  unprotected cement contact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 03: Silica Dust ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">03</span>
            Silica Dust
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Respirable crystalline silica (RCS) is one of the most
                significant occupational health hazards on construction sites.
                Silica is a natural mineral found in <strong>concrete</strong>,{" "}
                <strong>brick</strong>, <strong>sandstone</strong>,{" "}
                <strong>granite</strong>, <strong>mortar</strong>,{" "}
                <strong>paving slabs</strong>, and many other common
                construction materials. When these materials are cut, drilled,
                ground, or demolished, fine silica dust is released into the
                air.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Workplace Exposure Limit:
                  </strong>{" "}
                  The UK WEL for respirable crystalline silica is{" "}
                  <strong>0.1 mg/m&sup3;</strong> (8-hour TWA). This is an
                  extremely low limit &mdash; activities such as dry-cutting
                  concrete with a disc cutter can exceed it by{" "}
                  <strong>10&ndash;50 times</strong> within minutes.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Health Effects of Silica Exposure
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Silicosis:</strong> An
                      irreversible, progressive lung disease. Inhaled silica
                      particles lodge deep in the lungs and cause scarring
                      (fibrosis). There is <strong>no cure</strong>. It can
                      progress even after exposure stops.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Lung cancer:</strong>{" "}
                      Crystalline silica is classified as a{" "}
                      <strong>Group 1 carcinogen</strong> by IARC. Long-term
                      exposure increases the risk of lung cancer.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">COPD:</strong> Chronic
                      obstructive pulmonary disease can develop from prolonged
                      silica exposure, causing progressive breathlessness.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Kidney disease:</strong>{" "}
                      Evidence links silica exposure to kidney damage and
                      autoimmune conditions.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Activities Generating Silica Dust
                </p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Cutting concrete, brick, or block with disc cutters</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Drilling into concrete or masonry</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Grinding or polishing concrete surfaces</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Chasing walls for cables or pipes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Breaking out concrete (demolition)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Scabbling or needle-gunning surfaces</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Dry sweeping dust on site</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Tipping and mixing dry mortar or cement</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Control Measures for Silica Dust
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Water suppression:</strong>{" "}
                      Wet cutting reduces airborne silica dust by up to 90%.
                      Fitted water supplies on disc cutters, core drills, and
                      wall chasers are essential.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">On-tool extraction:</strong>{" "}
                      LEV (local exhaust ventilation) connected directly to the
                      tool, with an H-class vacuum (designed for hazardous dust).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">RPE:</strong> FFP3
                      disposable masks or half-face respirators with P3 filters
                      as a minimum when engineering controls alone cannot reduce
                      exposure below the WEL. RPE must be face-fit tested.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        H-class vacuum only:
                      </strong>{" "}
                      Never dry-sweep silica dust. Use an H-class vacuum
                      (BS EN 60335-2-69 Class H) that is designed to capture
                      fine hazardous particles.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Health surveillance:
                      </strong>{" "}
                      Workers regularly exposed to silica dust should have
                      periodic health surveillance including lung function
                      testing.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── Section 04: Wood Dust ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">04</span>
            Wood Dust
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Wood dust is generated during cutting, sanding, planing,
                routing, and machining timber. The health risks differ
                significantly between <strong>hardwood</strong> and{" "}
                <strong>softwood</strong> species, with hardwood dust carrying a
                higher cancer risk. Electricians encounter wood dust when
                cutting timber for mounting boards, trunking supports, noggings,
                and similar tasks.
              </p>

              {/* Hardwood vs Softwood Diagram */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-red-500/30 rounded-xl overflow-hidden">
                  <div className="bg-red-500/10 border-b border-red-500/30 px-4 py-3 text-center">
                    <p className="text-sm font-bold text-red-400">
                      Hardwood Dust
                    </p>
                    <p className="text-xs text-white/60">
                      Higher risk &mdash; Carcinogenic
                    </p>
                  </div>
                  <div className="px-4 py-3 space-y-2 text-xs text-white/80">
                    <div className="flex justify-between">
                      <span className="text-white/50">WEL (8-hr TWA)</span>
                      <span className="text-red-400 font-bold">
                        3 mg/m&sup3;
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Cancer risk</span>
                      <span className="text-red-300 font-medium">
                        Nasal cancer (adenocarcinoma)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Examples</span>
                      <span className="text-white font-medium">
                        Oak, beech, mahogany, teak
                      </span>
                    </div>
                    <hr className="border-white/10" />
                    <div>
                      <span className="text-white/50">Other effects</span>
                      <p className="text-white mt-1">
                        Asthma, rhinitis, dermatitis, nasal irritation
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-amber-500/30 rounded-xl overflow-hidden">
                  <div className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-3 text-center">
                    <p className="text-sm font-bold text-amber-400">
                      Softwood Dust
                    </p>
                    <p className="text-xs text-white/60">
                      Lower WEL &mdash; Still harmful
                    </p>
                  </div>
                  <div className="px-4 py-3 space-y-2 text-xs text-white/80">
                    <div className="flex justify-between">
                      <span className="text-white/50">WEL (8-hr TWA)</span>
                      <span className="text-amber-400 font-bold">
                        5 mg/m&sup3;
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Cancer risk</span>
                      <span className="text-white font-medium">
                        Not classified as carcinogenic
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Examples</span>
                      <span className="text-white font-medium">
                        Pine, spruce, cedar, larch
                      </span>
                    </div>
                    <hr className="border-white/10" />
                    <div>
                      <span className="text-white/50">Other effects</span>
                      <p className="text-white mt-1">
                        Asthma (esp. western red cedar), rhinitis, dermatitis
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Western Red Cedar:
                  </strong>{" "}
                  Although classified as a softwood, western red cedar contains{" "}
                  <strong>plicatic acid</strong>, which is one of the most
                  potent respiratory sensitisers found in any timber. It can
                  cause severe occupational asthma at very low exposure levels.
                  Always treat western red cedar as a high-risk wood species.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Control Measures for Wood Dust
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        On-tool extraction:
                      </strong>{" "}
                      LEV connected directly to saws, routers, sanders, and
                      planers. This is the primary control required by the HSE.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        M-class or H-class vacuum:
                      </strong>{" "}
                      Connected to the extraction port. M-class minimum for
                      softwood; H-class for hardwood or mixed species.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">RPE:</strong> FFP2 minimum
                      for softwood, FFP3 for hardwood dust. RPE must be
                      face-fit tested.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Health surveillance:
                      </strong>{" "}
                      Required for workers regularly exposed to wood dust,
                      including respiratory questionnaires and lung function
                      tests.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 05: Solvents & VOCs ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">05</span>
            Solvents &amp; VOCs
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Solvents are volatile organic compounds (VOCs) used widely on
                construction sites in paints, adhesives, degreasers, cleaning
                agents, and surface preparation products. They evaporate
                readily at room temperature, producing vapours that can be
                inhaled or absorbed through the skin.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Construction Solvents
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[80px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      White spirit
                    </span>
                    <p>
                      Paint thinner, brush cleaner, degreaser. Flash point
                      ~21&ndash;63&deg;C. Causes CNS depression, skin
                      defatting, dermatitis.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[80px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      Acetone
                    </span>
                    <p>
                      PVC cleaner, adhesive solvent, general cleaner. Flash
                      point <strong>&minus;20&deg;C</strong> (highly
                      flammable). Causes narcosis, eye and respiratory
                      irritation.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[80px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      Toluene
                    </span>
                    <p>
                      Found in adhesives, sealants, paints, lacquers. Flash
                      point ~4&deg;C. Causes CNS effects, dizziness, headache.
                      Long-term: liver and kidney damage.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[80px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      MEK
                    </span>
                    <p>
                      Methyl ethyl ketone &mdash; used in PVC cement, coatings,
                      and degreasers. Flash point &minus;9&deg;C. Causes
                      narcosis, skin irritation, eye irritation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Health Effects of Solvent Exposure
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Acute (short-term):
                      </strong>{" "}
                      Narcosis (dizziness, drowsiness, confusion, headache),
                      nausea, eye and throat irritation. At very high
                      concentrations: loss of consciousness.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Skin effects:</strong>{" "}
                      Defatting of the skin (removal of natural oils), leading
                      to dryness, cracking, and dermatitis. Some solvents are
                      also absorbed through the skin into the bloodstream.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Chronic (long-term):
                      </strong>{" "}
                      Liver damage, kidney damage, peripheral neuropathy
                      (nerve damage in hands and feet), chronic solvent
                      encephalopathy (brain damage). Some solvents are
                      reproductive toxins.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Flash Points &mdash; Fire Risk
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The flash point is the lowest temperature at which a liquid
                  gives off enough vapour to ignite. Many construction solvents
                  have dangerously low flash points:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2 text-center">
                    <p className="font-bold text-red-400">Acetone</p>
                    <p className="text-white">&minus;20&deg;C</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2 text-center">
                    <p className="font-bold text-red-400">MEK</p>
                    <p className="text-white">&minus;9&deg;C</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2 text-center">
                    <p className="font-bold text-amber-400">Toluene</p>
                    <p className="text-white">4&deg;C</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2 text-center">
                    <p className="font-bold text-amber-400">White spirit</p>
                    <p className="text-white">21&ndash;63&deg;C</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Solvent Control Measures
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Substitute:</strong> Use
                      water-based alternatives where possible (water-based
                      paints, adhesives, cleaners).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Ventilation:</strong>{" "}
                      Ensure adequate natural or forced ventilation. Never use
                      solvents in confined or poorly ventilated spaces without
                      extraction.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">RPE:</strong> Organic
                      vapour (OV) filter respirator when ventilation alone is
                      insufficient. Type A (brown) filters for most organic
                      solvents.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Solvent-resistant gloves:
                      </strong>{" "}
                      Nitrile gloves for most solvents. Check the SDS for the
                      specific product to confirm the correct glove material.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fire precautions:</strong>{" "}
                      No hot work, no naked flames, no smoking near solvents.
                      Keep containers closed when not in use. Store in
                      designated flammable stores.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── Section 06: Adhesives, Sealants & Paints ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">06</span>
            Adhesives, Sealants &amp; Paints
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Adhesives, sealants, and paints are used in almost every trade
                on a construction site. While individual products may seem
                low-risk, many contain hazardous chemicals including{" "}
                <strong>isocyanates</strong>,{" "}
                <strong>epoxy resin components</strong>,{" "}
                <strong>cyanoacrylates</strong>, and{" "}
                <strong>volatile solvents</strong> that require proper COSHH
                assessment and control.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Cyanoacrylates (Super Glues)
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Vapours cause eye and respiratory irritation &mdash;
                        &ldquo;stinging eyes&rdquo; is the classic symptom
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Can bond skin instantly on contact &mdash; risk of
                        tissue tearing if fingers are bonded together
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Some individuals develop respiratory sensitisation with
                        repeated exposure
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Epoxy Resins (Two-Part Adhesives)
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        The resin component and hardener are both skin
                        sensitisers &mdash; can cause allergic contact
                        dermatitis
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Once sensitised, the allergy is permanent &mdash; even
                        minute contact triggers a reaction
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Used in flooring adhesives, structural bonding, pipe
                        repair, and electrical encapsulation
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Polyurethane Adhesives &amp; Isocyanates
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-red-300">
                          Isocyanates are the leading cause of occupational
                          asthma in the UK
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Found in polyurethane (PU) adhesives, expanding foam,
                        sealants, and spray coatings
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Once sensitised, even tiny exposures can trigger severe
                        asthma attacks
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Workers using isocyanate-containing products must have
                        health surveillance (including lung function tests)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Paints &amp; Coatings
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Lead in old paint:
                      </strong>{" "}
                      Paint manufactured before 1992 (and especially before
                      1960) may contain lead. Sanding, scraping, or burning off
                      old lead paint releases toxic lead dust and fumes. Lead
                      exposure causes neurological damage, kidney damage, and
                      reproductive harm.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        VOCs in modern paints:
                      </strong>{" "}
                      Even modern paints release VOCs during application and
                      drying. Oil-based paints contain more VOCs than
                      water-based (emulsion) paints. Adequate ventilation is
                      essential during and after painting.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        2-pack systems (isocyanate paints):
                      </strong>{" "}
                      Two-component polyurethane and epoxy paints used for
                      industrial flooring, steel coatings, and vehicle
                      refinishing contain <strong>isocyanates</strong>. These
                      require full respiratory protection, health surveillance,
                      and specific training.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Powder coatings:
                      </strong>{" "}
                      While generally lower risk than liquid solvent-based
                      paints, powder coatings can generate airborne particles
                      during spraying and may contain epoxy or polyester
                      components that are skin sensitisers.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Sensitisation Is Permanent
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Sensitisation to isocyanates or epoxy resins is{" "}
                  <strong className="text-white">
                    irreversible and permanent
                  </strong>
                  . Once you become sensitised, your immune system will react to
                  even the smallest subsequent exposure. This can mean a
                  complete inability to work with these substances for the rest
                  of your career. Prevention through proper PPE, ventilation,
                  and skin protection is the only effective strategy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 07: Insulation Materials & Plaster ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">07</span>
            Insulation Materials &amp; Plaster
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electricians routinely work around and through insulation
                materials &mdash; running cables through loft insulation,
                drilling through insulated walls, and working in newly insulated
                spaces. Each insulation type presents different hazards that
                must be understood and controlled.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Mineral Wool (Glass Wool &amp; Rock Wool)
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        Fine fibres cause <strong>skin irritation</strong>{" "}
                        (itching, redness), <strong>eye irritation</strong>,
                        and <strong>respiratory irritation</strong> (coughing,
                        sore throat)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        Classified as a possible carcinogen (IARC Group 2B) for
                        certain fibre types, though modern products are designed
                        to be less biopersistent
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        Controls: long sleeves, gloves, goggles, dust mask when
                        cutting or handling. Wash skin with cold water (hot
                        water opens pores and drives fibres deeper)
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Spray Foam Insulation (SPF)
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-red-300">
                          Contains isocyanates (MDI or TDI)
                        </strong>{" "}
                        &mdash; powerful respiratory sensitisers
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        During application: isocyanate vapour, amine catalyst
                        fumes, and aerosol particles are released
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        Re-entry time: the area must be ventilated and may not
                        be safe to enter without RPE for 24&ndash;72 hours after
                        spraying (product-dependent)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        Electricians should not enter spray-foamed areas until
                        the re-entry time specified on the product SDS has
                        elapsed
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    PIR/PUR Insulation Boards
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        Polyisocyanurate (PIR) and polyurethane (PUR) rigid
                        boards are common in wall, floor, and roof insulation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        When cut with power tools: release fine dust and{" "}
                        <strong>isocyanate fumes</strong> from the foam matrix
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        If heated (e.g., by hot-wire cutting or nearby hot
                        work): can release <strong>hydrogen cyanide (HCN)</strong>{" "}
                        and other toxic decomposition products
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        Controls: cut with hand tools where possible, use LEV
                        with power tools, ensure good ventilation, RPE with
                        combination filters (particulate + organic vapour)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Plaster &amp; Gypsum Dust
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Irritant effects:</strong>{" "}
                      Plaster dust (calcium sulphate) is a respiratory and eye
                      irritant. Mixing dry plaster and sanding plasterwork
                      generates significant airborne dust.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Prolonged exposure:</strong>{" "}
                      Chronic inhalation of gypsum dust can cause nasal
                      irritation, chronic bronchitis, and reduced lung function.
                      While less hazardous than silica, it should still be
                      controlled.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Skin drying:</strong>{" "}
                      Plaster absorbs moisture from the skin, causing dryness,
                      cracking, and irritant contact dermatitis. Similar to
                      cement (though less alkaline), prolonged skin contact
                      should be avoided.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Controls:</strong> Dust
                      mask (FFP2 minimum) when sanding or mixing, eye
                      protection, gloves, and damping down before chasing or
                      drilling into plasterwork.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    For Electricians:
                  </strong>{" "}
                  When chasing plaster walls for cables, use a wall chaser with
                  integrated dust extraction and an H-class vacuum. If drilling
                  through insulated walls, check the insulation type first
                  &mdash; PIR/PUR boards require different precautions than
                  mineral wool. Never assume insulation materials are harmless
                  just because they are not asbestos.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── Section 08: Diesel Exhaust & Other Fumes ─── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">08</span>
            Diesel Exhaust &amp; Other Fumes
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Diesel exhaust emissions (DEE) are a complex mixture of gases
                and fine particles produced by diesel engines. On construction
                sites, diesel-powered plant and equipment &mdash; including
                excavators, dumpers, generators, compressors, and telehandlers
                &mdash; are major sources of DEE exposure, particularly in
                enclosed or semi-enclosed working areas.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    IARC Group 1 Carcinogen
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  In 2012, the International Agency for Research on Cancer
                  (IARC) reclassified diesel exhaust emissions from{" "}
                  <strong className="text-white">
                    Group 2A (probably carcinogenic) to Group 1 (carcinogenic to
                    humans)
                  </strong>
                  . This is the highest classification, based on sufficient
                  evidence that DEE causes <strong>lung cancer</strong> and
                  limited evidence for <strong>bladder cancer</strong>.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Health Effects of Diesel Exhaust
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cancer:</strong> Lung
                      cancer (confirmed), bladder cancer (suspected). The
                      ultrafine particles in diesel soot carry carcinogenic
                      compounds deep into the lungs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Respiratory effects:
                      </strong>{" "}
                      Irritation of airways, coughing, wheezing, worsening of
                      existing asthma, chronic bronchitis.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Cardiovascular effects:
                      </strong>{" "}
                      Ultrafine particles can enter the bloodstream and
                      contribute to heart disease and stroke.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Acute effects:</strong>{" "}
                      Headache, nausea, dizziness, eye irritation in
                      high-concentration environments. Carbon monoxide (CO) in
                      the exhaust can cause fatal poisoning in enclosed spaces.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  High-Risk Scenarios on Construction Sites
                </p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Tunnelling and underground works</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Basement construction and excavation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Indoor demolition with diesel plant</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Working near idling diesel generators</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Deep trenches and confined excavations</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Partially enclosed structures during fit-out</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Ventilation &amp; Control Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Eliminate or substitute:
                      </strong>{" "}
                      Use electric or LPG-powered plant in enclosed spaces
                      where possible. Battery-powered tools and equipment are
                      increasingly available.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Forced ventilation:
                      </strong>{" "}
                      Mechanical ventilation systems to supply fresh air and
                      extract contaminated air from enclosed work areas.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Exhaust extraction:
                      </strong>{" "}
                      Direct connection of exhaust extraction hoses to vehicle
                      and plant exhaust systems when operating in enclosed
                      spaces.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Engine management:
                      </strong>{" "}
                      No unnecessary idling. Turn off engines when not in use.
                      Maintain engines and exhaust systems (poorly maintained
                      engines produce more emissions).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        DPF (diesel particulate filters):
                      </strong>{" "}
                      Modern plant should be fitted with DPFs or meet Stage V
                      (EU) emission standards. Retrofitting older plant with
                      exhaust after-treatment is also an option.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Air monitoring:
                      </strong>{" "}
                      In enclosed spaces, carbon monoxide (CO) and nitrogen
                      dioxide (NO&sub2;) levels should be monitored
                      continuously. Work must stop if levels exceed safe
                      thresholds.
                    </span>
                  </li>
                </ul>
              </div>

              {/* DEE Exposure Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  DEE Exposure Risk by Environment
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs text-center">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <p className="font-bold text-green-400 mb-1">Open Air</p>
                    <p className="text-white/70">
                      Natural dispersion &middot; Lower risk &middot; Still
                      minimise exposure
                    </p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                    <p className="font-bold text-amber-400 mb-1">
                      Semi-Enclosed
                    </p>
                    <p className="text-white/70">
                      Partial walls/roof &middot; Moderate risk &middot;
                      Ventilation needed
                    </p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="font-bold text-red-400 mb-1">
                      Enclosed
                    </p>
                    <p className="text-white/70">
                      Tunnels, basements &middot; High risk &middot; Forced
                      ventilation essential
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Other Fumes on Construction Sites
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Welding fumes:</strong>{" "}
                      Contain metal oxides (iron, manganese, chromium, nickel
                      depending on the metal being welded). Classified as
                      carcinogenic (IARC Group 1). LEV or RPE mandatory.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Bitumen/asphalt fumes:
                      </strong>{" "}
                      Generated during roofing, road surfacing, and
                      waterproofing. Contain polycyclic aromatic hydrocarbons
                      (PAHs) which are carcinogenic. Minimise exposure through
                      work positioning and RPE.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        PVC burning/cutting fumes:
                      </strong>{" "}
                      Overheating PVC (e.g., during solvent welding or
                      accidental fire) releases hydrogen chloride (HCl) gas and
                      other toxic fumes. Ensure adequate ventilation when
                      working with PVC products in enclosed spaces.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">Remember:</strong> Fumes
                  are often invisible and may have no detectable odour at
                  harmful concentrations. Never rely on being able to
                  &ldquo;smell&rdquo; or &ldquo;see&rdquo; fumes to judge
                  whether exposure is occurring. Air monitoring and proper
                  engineering controls are the only reliable way to manage fume
                  exposure on site.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-2-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Emergency Procedures
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-3-section-2">
              Next: Electrical Trade Hazards
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
