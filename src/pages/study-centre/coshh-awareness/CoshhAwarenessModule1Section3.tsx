import { ArrowLeft, Route, CheckCircle, AlertTriangle, Wind, Droplets, Eye, Syringe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "coshh-inhalation-route",
    question: "Why is inhalation the most significant route of exposure to hazardous substances in the workplace?",
    options: [
      "Because workers breathe rapidly on construction sites",
      "Because the lungs have a massive surface area (70 m\u00B2) with thin membranes, allowing rapid absorption of inhaled particles and vapours directly into the bloodstream",
      "Because PPE is rarely provided for respiratory hazards",
      "Because most hazardous substances are gases"
    ],
    correctIndex: 1,
    explanation: "Inhalation accounts for approximately 70% of occupational exposures to hazardous substances. The lungs provide a surface area of roughly 70 m\u00B2 (about the size of a tennis court) lined with extremely thin alveolar membranes. This combination of vast area and thin barriers allows inhaled substances to pass rapidly into the bloodstream. Factors such as particle size, solubility, concentration, duration, and breathing rate all influence the degree of uptake."
  },
  {
    id: "coshh-injection-route",
    question: "What is the key danger of percutaneous (injection) exposure to hazardous substances?",
    options: [
      "It is the most common route of workplace exposure",
      "It only affects the skin surface",
      "It bypasses the body's natural protective barriers (skin and mucous membranes), delivering substances directly into deeper tissues or the bloodstream",
      "It is only relevant in medical settings"
    ],
    correctIndex: 2,
    explanation: "Percutaneous or injection exposure bypasses the skin barrier entirely, delivering hazardous substances directly into subcutaneous tissue, muscle, or the bloodstream. This can occur through contaminated sharps, high-pressure equipment (jet washers, grease guns), or splinters and abrasions contaminated with chemicals. Because the body's primary defence (intact skin) is defeated, even small quantities of substance can cause serious local or systemic effects."
  },
  {
    id: "coshh-wel-meaning",
    question: "What does a Workplace Exposure Limit (WEL) represent?",
    options: [
      "The concentration of a substance that is completely safe for all workers",
      "The maximum airborne concentration of a hazardous substance, averaged over a reference period (8-hour TWA or 15-minute STEL), to which workers may be exposed by inhalation",
      "The amount of a substance that can be stored on site",
      "The threshold at which a substance becomes classified as hazardous"
    ],
    correctIndex: 1,
    explanation: "A Workplace Exposure Limit (WEL) is the maximum concentration of an airborne substance, averaged over a specified reference period, to which employees may be exposed by inhalation. WELs are published in HSE document EH40. They are set as either an 8-hour time-weighted average (TWA) or a 15-minute short-term exposure limit (STEL). WELs are NOT safe levels \u2014 they represent the maximum acceptable concentration. Employers must reduce exposure to as low as is reasonably practicable, even below the WEL."
  }
];

const faqs = [
  {
    question: "Can hazardous substances enter the body through more than one route at the same time?",
    answer: "Yes. In many workplace situations, workers are exposed through multiple routes simultaneously. For example, a painter using solvent-based products may inhale vapours (inhalation), absorb solvent through the skin on their hands (dermal absorption), and inadvertently swallow traces when eating or drinking with contaminated hands (ingestion). The total dose received is the combined uptake from all routes. This is why COSHH risk assessments must consider every possible route of exposure, not just the most obvious one. Control measures should address all relevant routes \u2014 for instance, providing both respiratory protection and chemical-resistant gloves."
  },
  {
    question: "What does 'skin notation' mean in the EH40 table of Workplace Exposure Limits?",
    answer: "When a substance has a 'Sk' notation (skin notation) next to its WEL in EH40, it means that the substance can be absorbed through intact skin in toxicologically significant amounts. This is critically important because it tells you that controlling airborne exposure alone is NOT sufficient \u2014 you must also prevent skin contact. Substances with skin notation include many organic solvents (toluene, xylene, methanol), some pesticides, phenol, and certain isocyanates. For these substances, impervious gloves, protective clothing, and good hygiene practices are essential in addition to any respiratory controls."
  },
  {
    question: "How is biological monitoring different from air monitoring?",
    answer: "Air monitoring measures the concentration of a hazardous substance in the breathing zone of a worker \u2014 it tells you what the worker could be inhaling. Biological monitoring measures the actual amount of substance (or its metabolites) that has entered the worker's body, regardless of the route of entry. It uses samples such as urine, blood, or exhaled breath. For example, a urine test for mandelic acid measures exposure to styrene, while blood lead levels measure lead absorption. Biological monitoring gives a more complete picture because it captures exposure from ALL routes (inhalation, skin, ingestion) combined, and accounts for individual differences in uptake, PPE effectiveness, and work practices."
  },
  {
    question: "Why might two workers exposed to the same substance at the same concentration have different health effects?",
    answer: "Individual susceptibility varies significantly between workers. Factors include: age (younger and older workers may be more vulnerable), pre-existing health conditions (asthma, eczema, liver or kidney disease), genetic variation in enzyme activity affecting how the body metabolises substances, medication interactions, smoking status (which damages respiratory defences), fitness and breathing rate (heavier breathing draws in more substance), body weight (affects the dose per kilogram), and whether the worker has been previously sensitised to a substance. This is precisely why WELs are not 'safe' levels for every individual \u2014 some workers may experience adverse effects even at concentrations below the WEL. COSHH requires employers to reduce exposure to as low as is reasonably practicable, not simply to the WEL."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Approximately what percentage of occupational exposures to hazardous substances occur through inhalation?",
    options: [
      "30%",
      "50%",
      "70%",
      "90%"
    ],
    correctAnswer: 2,
    explanation: "Inhalation accounts for approximately 70% of occupational exposures. The lungs provide a massive surface area (~70 m\u00B2) with very thin alveolar membranes, allowing rapid absorption of airborne substances into the bloodstream. This makes respiratory hazards the primary concern in most workplace COSHH assessments."
  },
  {
    id: 2,
    question: "Which particle size range is most dangerous for lung deposition because particles reach the gas exchange region (alveoli)?",
    options: [
      "Greater than 100 \u00B5m",
      "10\u201350 \u00B5m",
      "1\u20135 \u00B5m (respirable fraction)",
      "Less than 0.01 \u00B5m (nanoparticles) \u2014 they are always exhaled"
    ],
    correctAnswer: 2,
    explanation: "Particles in the 1\u20135 \u00B5m range (the respirable fraction) are the most dangerous because they are small enough to bypass the nose, throat, and upper airways but large enough to deposit in the alveoli \u2014 the gas exchange region of the lungs. Here, substances can cross the thin alveolar membrane and enter the bloodstream directly. Larger particles are trapped in the nose and upper airways; very small nanoparticles may be exhaled but some can also deposit deep in the lungs."
  },
  {
    id: 3,
    question: "What does the 'Sk' (skin notation) next to a substance's WEL in EH40 indicate?",
    options: [
      "The substance causes skin irritation only",
      "The substance can be absorbed through intact skin in toxicologically significant amounts",
      "The substance requires skin-coloured PPE",
      "The substance has been tested on skin samples in a laboratory"
    ],
    correctAnswer: 1,
    explanation: "The 'Sk' notation indicates that the substance can be absorbed through intact, undamaged skin in amounts that are toxicologically significant \u2014 meaning skin absorption alone can contribute meaningfully to the total body dose. For these substances, controlling airborne exposure is not enough; skin contact must also be prevented through impervious gloves, protective clothing, and rigorous hygiene practices."
  },
  {
    id: 4,
    question: "An electrician eats a sandwich on site without washing their hands after handling cable insulation compounds. Which route of exposure does this represent?",
    options: [
      "Inhalation",
      "Injection",
      "Skin absorption",
      "Ingestion"
    ],
    correctAnswer: 3,
    explanation: "Eating, drinking, or smoking with contaminated hands is the classic example of ingestion exposure. Hazardous substances transferred from the hands to food, drink, or cigarettes are swallowed and absorbed through the gastrointestinal tract. This is entirely preventable through proper hygiene: washing hands thoroughly before eating or drinking, never storing food near hazardous substances, and using designated clean areas for breaks."
  },
  {
    id: 5,
    question: "What is the reference period for a standard Workplace Exposure Limit (WEL) time-weighted average?",
    options: [
      "1 hour",
      "4 hours",
      "8 hours",
      "24 hours"
    ],
    correctAnswer: 2,
    explanation: "The standard WEL is expressed as an 8-hour time-weighted average (TWA). This means the average airborne concentration of a substance over an 8-hour working day must not exceed the published limit. Some substances also have a 15-minute short-term exposure limit (STEL) to protect against peak exposures that might cause acute effects even if the 8-hour average is within limits."
  },
  {
    id: 6,
    question: "Which of the following is an example of percutaneous (injection) exposure in a construction setting?",
    options: [
      "Breathing in cement dust",
      "Splashing solvent onto the forearm",
      "A high-pressure water jet driving contaminated material through a cut in the skin",
      "Eating lunch with dusty hands"
    ],
    correctAnswer: 2,
    explanation: "A high-pressure water jet (or grease gun, airless paint sprayer, etc.) can drive contaminants through the skin and into deeper tissues \u2014 this is percutaneous or injection exposure. It bypasses the skin barrier entirely. Other construction examples include stepping on contaminated sharps and abrasions contaminated with chemicals. This route is less common but can be very serious because the substance is delivered directly to tissues without any protective barrier."
  },
  {
    id: 7,
    question: "What is the difference between an 8-hour TWA and a 15-minute STEL?",
    options: [
      "There is no difference \u2014 they are the same measurement",
      "The 8-hour TWA limits average exposure over a full shift; the 15-minute STEL limits short peak exposures to prevent acute effects",
      "The STEL is always lower than the TWA",
      "The TWA is measured in mg/m\u00B3 and the STEL is measured in ppm only"
    ],
    correctAnswer: 1,
    explanation: "The 8-hour TWA limits average exposure across a full working day, protecting against chronic (long-term) health effects. The 15-minute STEL limits short-duration peak concentrations, protecting against acute effects such as irritation, narcosis, or sensitisation that could occur even if the 8-hour average is acceptable. A substance may have a TWA only, a STEL only, or both. The STEL is not always higher than the TWA \u2014 though it commonly is, because brief peaks are often tolerated at higher concentrations than sustained exposure."
  },
  {
    id: 8,
    question: "A worker's urine test shows elevated levels of mandelic acid. What does this biological monitoring result indicate?",
    options: [
      "The worker has a kidney condition unrelated to work",
      "The worker has been exposed to styrene \u2014 mandelic acid is a metabolite of styrene excreted in urine",
      "The worker has ingested contaminated food",
      "The worker has been exposed to lead"
    ],
    correctAnswer: 1,
    explanation: "Mandelic acid in urine is a biological monitoring marker for styrene exposure. When styrene enters the body (by any route), it is metabolised by the liver, and mandelic acid is one of the metabolic by-products excreted in urine. Elevated levels indicate that the worker has absorbed styrene \u2014 the test captures total exposure from all routes (inhalation, skin absorption, ingestion) combined. Biological monitoring is valuable because it reflects actual body uptake rather than just airborne concentration."
  }
];

export default function CoshhAwarenessModule1Section3() {
  useSEO({
    title: "Routes of Exposure | COSHH Awareness Module 1.3",
    description: "How hazardous substances enter the body: inhalation, skin absorption, ingestion, and injection. Workplace Exposure Limits (WELs), dose-response relationships, and biological monitoring explained.",
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
            <Route className="h-7 w-7 text-violet-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 mx-auto">
            <span className="text-violet-400 text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Routes of Exposure
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How hazardous substances enter the body &mdash; inhalation, skin &amp; eye contact, ingestion, and injection &mdash; plus Workplace Exposure Limits and biological monitoring
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>4 Routes:</strong> Inhalation, skin/eye, ingestion, injection</li>
              <li><strong>~70%</strong> of workplace exposures are through inhalation</li>
              <li><strong>WELs:</strong> Legal airborne limits published in EH40</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Breathing:</strong> The biggest risk &mdash; always assess airborne hazards first</li>
              <li><strong>Skin:</strong> Check EH40 for &lsquo;Sk&rsquo; notation before handling chemicals</li>
              <li><strong>Hygiene:</strong> Wash hands before eating &mdash; prevents ingestion</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Name and describe the four main routes by which hazardous substances enter the body",
              "Explain why inhalation is the most significant route of occupational exposure and identify factors affecting respiratory uptake",
              "Describe how substances are absorbed through the skin and eyes, and explain the significance of skin notation in EH40",
              "Identify workplace situations that lead to ingestion and injection exposure",
              "Explain what Workplace Exposure Limits (WELs) are, including the difference between 8-hour TWA and 15-minute STEL",
              "Describe the purpose of biological monitoring and how it complements air monitoring"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-violet-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Routes of Exposure Matter */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">01</span>
            Why Routes of Exposure Matter
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A hazardous substance can only cause harm if it enters the body. Understanding <strong>how</strong> substances
                get in &mdash; the routes of exposure &mdash; is fundamental to COSHH risk assessment and the selection
                of effective control measures. If you do not know the route, you cannot choose the right protection.
              </p>

              <p>
                There are <strong>four main routes</strong> by which hazardous substances can enter the body:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The 4 Routes of Exposure</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { route: "Inhalation (breathing)", icon: "wind", stat: "~70% of exposures", detail: "Breathing in dusts, fumes, vapours, gases, and mists. By far the most common and significant route in the workplace." },
                    { route: "Skin & eye contact (absorption)", icon: "droplets", stat: "2nd most common", detail: "Direct contact with liquids, solids, or vapours. Some substances penetrate intact skin; others cause local damage." },
                    { route: "Ingestion (swallowing)", icon: "hand", stat: "Preventable", detail: "Swallowing substances via contaminated hands, food, drink, or cigarettes. Almost always caused by poor hygiene." },
                    { route: "Injection (percutaneous)", icon: "syringe", stat: "Least common", detail: "Substances enter through cuts, puncture wounds, or high-pressure equipment. Bypasses the skin barrier entirely." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-medium text-violet-400">{item.route}</p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-500/20 text-violet-300">{item.stat}</span>
                      </div>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">Key Principle &mdash; Multiple Routes</p>
                <p className="text-sm text-white">
                  In real workplace situations, exposure often occurs through <strong>more than one route simultaneously</strong>.
                  A painter using solvent-based coatings may inhale vapours, absorb solvent through the skin, and
                  ingest traces from contaminated hands. The total dose is the sum of all routes. Effective COSHH
                  controls must address <strong>every relevant route</strong>, not just the most obvious one.
                </p>
              </div>

              <p>
                The route of exposure determines where in the body a substance acts, how quickly it is absorbed,
                and what health effects it produces. The same substance may cause entirely different effects depending
                on whether it is inhaled, absorbed through the skin, or swallowed. For example, a strong acid splashed
                on skin causes a chemical burn at the contact point, but inhaling acid mist damages the airways and
                lungs &mdash; a far more serious systemic effect.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">Why This Matters for Electricians</p>
                </div>
                <p className="text-sm text-white/80">
                  Electricians are routinely exposed to hazardous substances: solvent-based cleaners, flux fumes
                  during soldering, cable insulation compounds, resin-based adhesives, PVC dust from cutting trunking,
                  and construction dusts (silica, cement, wood). Understanding the routes of exposure helps you
                  identify which control measures you need &mdash; is it ventilation (for inhalation), gloves (for
                  skin contact), face washing (for ingestion prevention), or a combination of all three?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Routes of Exposure Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <Route className="h-5 w-5 text-violet-400" />
            The 4 Routes of Exposure &mdash; Overview Diagram
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 overflow-hidden">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-4 text-center">How Hazardous Substances Enter the Body</p>

            <div className="relative mx-auto max-w-2xl">
              <div className="relative border-2 border-violet-500/40 rounded-lg bg-gradient-to-b from-violet-500/5 to-transparent">

                {/* Inhalation */}
                <div className="border-b border-dashed border-violet-500/20 p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                      <Wind className="h-3.5 w-3.5 text-red-400" />
                    </span>
                    <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">1. Inhalation (~70% of Exposures)</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-[10px] font-bold text-red-400">a</span>
                      <span className="text-xs text-white/80">Dusts, fumes &amp; fibres</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-[10px] font-bold text-red-400">b</span>
                      <span className="text-xs text-white/80">Vapours &amp; gases</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-[10px] font-bold text-red-400">c</span>
                      <span className="text-xs text-white/80">Mists &amp; aerosols</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/50 mt-2">Nose/mouth &rarr; trachea &rarr; bronchi &rarr; alveoli &rarr; bloodstream</p>
                </div>

                {/* Skin & Eye */}
                <div className="border-b border-dashed border-violet-500/20 p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                      <Droplets className="h-3.5 w-3.5 text-amber-400" />
                    </span>
                    <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">2. Skin &amp; Eye Contact</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-bold text-amber-400">a</span>
                      <span className="text-xs text-white/80">Dermal absorption (through skin)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-bold text-amber-400">b</span>
                      <span className="text-xs text-white/80">Chemical burns &amp; irritation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-bold text-amber-400">c</span>
                      <span className="text-xs text-white/80">Eye splashes &amp; vapour irritation</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/50 mt-2">Skin surface &rarr; epidermis &rarr; dermis &rarr; bloodstream | Eye surface &rarr; cornea &rarr; bloodstream</p>
                </div>

                {/* Ingestion */}
                <div className="border-b border-dashed border-violet-500/20 p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-[10px] font-bold text-green-400">\u2709</span>
                    <p className="text-xs font-semibold text-green-400 uppercase tracking-wider">3. Ingestion (Swallowing)</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-[10px] font-bold text-green-400">a</span>
                      <span className="text-xs text-white/80">Contaminated hands &rarr; food</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-[10px] font-bold text-green-400">b</span>
                      <span className="text-xs text-white/80">Mucociliary clearance (swallowed)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-[10px] font-bold text-green-400">c</span>
                      <span className="text-xs text-white/80">Splashes into mouth</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/50 mt-2">Mouth &rarr; oesophagus &rarr; stomach &rarr; intestines &rarr; liver (first-pass) &rarr; bloodstream</p>
                </div>

                {/* Injection */}
                <div className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center">
                      <Syringe className="h-3.5 w-3.5 text-violet-400" />
                    </span>
                    <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider">4. Injection (Percutaneous)</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-[10px] font-bold text-violet-400">a</span>
                      <span className="text-xs text-white/80">Contaminated sharps / splinters</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-[10px] font-bold text-violet-400">b</span>
                      <span className="text-xs text-white/80">High-pressure equipment</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-[10px] font-bold text-violet-400">c</span>
                      <span className="text-xs text-white/80">Abrasion + chemical contact</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/50 mt-2">Puncture &rarr; subcutaneous tissue / muscle &rarr; bloodstream (bypasses skin barrier)</p>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 mt-4 justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
                  <span className="text-[10px] text-white/50">Most common route</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500/50" />
                  <span className="text-[10px] text-white/50">2nd most common</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/50" />
                  <span className="text-[10px] text-white/50">Preventable by hygiene</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-violet-500/30 border border-violet-500/50" />
                  <span className="text-[10px] text-white/50">Bypasses skin barrier</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Inhalation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">02</span>
            Inhalation &mdash; Breathing in Hazardous Substances
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Inhalation is the <strong>most common and most significant</strong> route of occupational exposure,
                accounting for approximately <strong>70% of all workplace exposures</strong> to hazardous substances.
                The respiratory system is uniquely vulnerable because the lungs are designed for gas exchange &mdash;
                they have a massive internal surface area and extremely thin membranes separating inhaled air from
                the bloodstream.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Why the Lungs Are So Vulnerable</p>
                </div>
                <p className="text-sm text-white/80">
                  The lungs contain approximately <strong>300 million alveoli</strong> (tiny air sacs) that provide a
                  combined surface area of roughly <strong>70 m&sup2;</strong> &mdash; about the size of a tennis court.
                  The alveolar membrane is only <strong>0.2&ndash;0.5 &micro;m thick</strong>. This enormous area and
                  extreme thinness are essential for efficient oxygen exchange, but they also mean that inhaled
                  hazardous substances can cross into the bloodstream with remarkable speed and efficiency.
                </p>
              </div>

              <p>
                When a worker breathes in contaminated air, particles, vapours, gases, fumes, or mists travel through
                the respiratory tract. The journey follows this path:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Respiratory Pathway</p>
                <div className="space-y-2">
                  {[
                    { step: "Nose & mouth", detail: "Large particles (>10 \u00B5m) are filtered out by nasal hairs and mucous membranes. This is the body's first line of defence." },
                    { step: "Pharynx & larynx", detail: "The throat and voice box provide further filtration. Irritant gases (e.g. ammonia, chlorine) may cause immediate coughing and reflex closure of the airway." },
                    { step: "Trachea & bronchi", detail: "The windpipe and main airways are lined with ciliated mucous membrane (the mucociliary escalator) which traps particles and moves them upward to be swallowed or coughed out." },
                    { step: "Bronchioles", detail: "Smaller airways where medium-sized particles (5\u201310 \u00B5m) deposit. Repeated exposure can cause inflammation, narrowing, and occupational asthma." },
                    { step: "Alveoli (gas exchange region)", detail: "Respirable particles (1\u20135 \u00B5m) reach here. Soluble substances dissolve and cross the membrane into the blood. Insoluble particles (e.g. asbestos fibres, silica) may remain permanently, causing fibrosis or cancer." }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-black/30 rounded-lg p-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-[10px] font-bold text-violet-400">{i + 1}</span>
                      <div>
                        <p className="text-xs font-medium text-violet-400 mb-0.5">{item.step}</p>
                        <p className="text-xs text-white/70">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-base font-semibold text-white pt-2">Factors Affecting Respiratory Uptake</h3>

              <p>
                The amount of substance absorbed through the lungs depends on several factors. Understanding these
                helps explain why the same substance can cause dramatically different effects in different situations:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Factors in Inhalation Exposure</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { factor: "Particle size", detail: "The single most important factor determining where in the lungs a substance deposits. Respirable particles (1\u20135 \u00B5m) reach the alveoli. Larger particles are trapped higher up." },
                    { factor: "Solubility", detail: "Highly soluble gases (e.g. ammonia, hydrogen chloride) dissolve in upper airway moisture, causing immediate irritation. Less soluble gases (e.g. phosgene, nitrogen dioxide) penetrate to the alveoli before dissolving \u2014 more insidious and dangerous." },
                    { factor: "Airborne concentration", detail: "The higher the concentration of substance in the air, the greater the dose inhaled per breath. This is why WELs set maximum airborne concentrations." },
                    { factor: "Duration of exposure", detail: "Longer exposure = greater cumulative dose. This is why WELs use time-weighted averages (8-hour TWA)." },
                    { factor: "Breathing rate", detail: "Heavy physical work increases the breathing rate and depth, drawing in 2\u20133 times more air per minute than light work. A labourer shovelling in a dusty environment inhales far more dust than a supervisor standing nearby." },
                    { factor: "Ventilation of the workspace", detail: "Poor ventilation allows airborne concentrations to build up. Good general or local exhaust ventilation dilutes or captures contaminants before they reach the breathing zone." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-violet-400 mb-1">{item.factor}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">Common Inhalation Hazards for Electricians</p>
                </div>
                <p className="text-sm text-white/80">
                  Soldering and brazing fumes (flux fumes containing colophony/rosin cause occupational asthma),
                  PVC dust from cutting cable trunking, construction dusts (silica from drilling masonry, cement dust,
                  wood dust from notching joists), solvent vapours from adhesives and cleaners, and spray paint
                  overspray. Each requires specific respiratory controls based on the substance and the work activity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Skin & Eye Contact */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">03</span>
            Skin &amp; Eye Contact
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The skin is the body's largest organ and the primary physical barrier against hazardous substances.
                However, this barrier is not impenetrable. Many substances can penetrate intact skin, and the skin
                itself can be damaged by contact with corrosive, irritant, or sensitising chemicals. The eyes are
                even more vulnerable, with no protective outer layer of dead cells.
              </p>

              <h3 className="text-base font-semibold text-white pt-2">Dermal Absorption (Skin Uptake)</h3>

              <p>
                Some hazardous substances can pass through intact, undamaged skin and enter the bloodstream in
                toxicologically significant amounts. This is known as <strong>dermal absorption</strong>. The
                substance does not need to cause any visible damage to the skin &mdash; it simply diffuses through
                the skin layers into the blood.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Types of Skin Effect</p>
                <div className="space-y-3">
                  {[
                    { effect: "Dermal absorption (systemic toxicity)", detail: "The substance penetrates intact skin and enters the bloodstream, causing effects on internal organs (liver, kidneys, nervous system). Examples: organic solvents (toluene, xylene, methanol), some pesticides, phenol, certain isocyanates. These substances have 'Sk' (skin notation) in EH40." },
                    { effect: "Chemical burns (corrosion)", detail: "Strong acids (sulphuric, hydrochloric) and strong alkalis (sodium hydroxide, cement) destroy skin tissue on contact, causing chemical burns. Severity depends on concentration, contact time, and area affected. Alkali burns are often worse than acid burns because they penetrate deeper." },
                    { effect: "Irritant contact dermatitis", detail: "Repeated or prolonged contact with irritants (detergents, solvents, cutting oils, cement) damages the outer skin layer, causing redness, cracking, dryness, and soreness. This is a direct toxic effect \u2014 it can affect anyone with sufficient exposure. Very common in the construction trades." },
                    { effect: "Allergic contact dermatitis (sensitisation)", detail: "Some substances trigger an immune response after repeated exposure. Once sensitised, even tiny amounts cause a severe allergic reaction (redness, swelling, blistering, itching). Common sensitisers: epoxy resins, chromium (in cement), nickel, some wood dusts, isocyanates. Sensitisation is permanent \u2014 there is no cure." },
                    { effect: "Defatting", detail: "Organic solvents (white spirit, acetone, toluene) dissolve the natural oils in the skin, removing the protective lipid barrier. This makes the skin dry, cracked, and more permeable to other hazardous substances. A defatted skin barrier allows easier penetration of chemicals that would not normally cross intact skin." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-violet-400 mb-1">{item.effect}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">Skin Notation (&lsquo;Sk&rsquo;) in EH40</p>
                <p className="text-sm text-white">
                  When you look up a substance's WEL in HSE document EH40, you may see <strong>&lsquo;Sk&rsquo;</strong> next
                  to the entry. This skin notation means the substance can be absorbed through intact skin in
                  significant amounts. It is a critical warning: <strong>controlling airborne exposure alone is not
                  sufficient</strong>. You must also prevent skin contact through impervious gloves, protective
                  clothing, and good hygiene. Common substances with skin notation include toluene, xylene,
                  methanol, phenol, and many isocyanate hardeners.
                </p>
              </div>

              <h3 className="text-base font-semibold text-white pt-2">Eye Contact</h3>

              <p>
                The eyes are extremely vulnerable to hazardous substances. Unlike the skin, the eye surface (cornea
                and conjunctiva) has no protective outer layer of dead cells &mdash; it is living tissue directly
                exposed to the environment. Chemical contact with the eyes can cause:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Eye Exposure Effects</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { effect: "Conjunctivitis (irritation)", detail: "Redness, watering, and discomfort from contact with irritant dusts, vapours, or mild chemicals. Usually temporary if exposure ceases." },
                    { effect: "Corneal burns", detail: "Splashes of acids, alkalis, or solvents can cause severe, potentially permanent damage to the cornea. Alkali burns are particularly dangerous as they penetrate rapidly." },
                    { effect: "Vapour irritation", detail: "Volatile solvents and irritant gases can cause eye irritation even without direct liquid contact. Formaldehyde, ammonia, and chlorine are common examples." },
                    { effect: "Permanent blindness", detail: "Severe chemical burns can cause permanent scarring of the cornea and blindness. This is why emergency eye wash stations are required wherever there is a risk of chemical eye splash." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-violet-400 mb-1">{item.effect}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">Emergency Eye Wash</p>
                </div>
                <p className="text-sm text-white/80">
                  If a chemical splashes into the eyes, <strong>irrigate immediately with clean water for at least
                  20 minutes</strong>, holding the eyelids open. Do not delay &mdash; every second counts with
                  chemical eye injuries. Ensure eye wash stations or bottles are available wherever chemicals are
                  used. Check them regularly to ensure they are full and within their expiry date. After irrigation,
                  seek medical attention immediately.
                </p>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">Practical Example &mdash; Epoxy Dermatitis</p>
                </div>
                <p className="text-sm text-white/80">
                  Epoxy resins are widely used in electrical and construction work (adhesives, coatings, grouts).
                  The resin components and especially the hardener are potent <strong>skin sensitisers</strong>. Repeated
                  unprotected contact can trigger allergic contact dermatitis. Once sensitised, a worker reacts to
                  even trace amounts of epoxy &mdash; this is a <strong>career-changing condition</strong> because
                  the allergy is permanent and the worker can no longer use any epoxy-based products. Prevention
                  through impervious gloves and good hygiene is essential from the very first exposure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Ingestion */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">04</span>
            Ingestion &mdash; Swallowing Hazardous Substances
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Ingestion means swallowing hazardous substances. While deliberate ingestion is extremely rare in the
                workplace, <strong>accidental ingestion is far more common than most workers realise</strong>. It is
                almost always caused by poor personal hygiene and contaminated hands.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How Ingestion Exposure Occurs</p>
                <div className="space-y-3">
                  {[
                    { cause: "Contaminated hands \u2192 food/drink", detail: "The most common cause. Workers handle hazardous substances, then eat, drink, or smoke without washing their hands first. Substances transfer from hands to food, drink, or cigarettes. This is entirely preventable." },
                    { cause: "Mucociliary clearance", detail: "Particles trapped by the mucociliary escalator in the airways are moved upward and swallowed into the stomach. This means some inhaled particles ultimately enter the body by the ingestion route. This is a normal bodily process and explains why inhaled substances can affect the digestive system." },
                    { cause: "Splashes into the mouth", detail: "Direct splashes of liquid chemicals into the mouth during handling, mixing, or decanting. Less common but can deliver a large dose rapidly." },
                    { cause: "Contaminated food/drink storage", detail: "Storing food or drinks near hazardous substances, or in the same area where chemicals are used. Dust, vapours, or splashes can contaminate food without the worker being aware." },
                    { cause: "Unconscious hand-to-mouth habits", detail: "Many people touch their face, lips, or mouth without thinking. Nail-biting, licking fingers to turn pages, wiping the mouth with the back of the hand \u2014 all transfer contaminants from hands to mouth." },
                    { cause: "Decanting into food/drink containers", detail: "Transferring chemicals into unlabelled bottles or containers that could be mistaken for drink bottles. This is a serious COSHH violation and has caused fatalities." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-violet-400 mb-1">{item.cause}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                Once swallowed, substances pass through the gastrointestinal tract. Some are absorbed through the
                stomach lining, but most absorption occurs in the small intestine, which has a large surface area
                with an extensive blood supply. Absorbed substances pass first to the liver (the &ldquo;first-pass
                effect&rdquo;), where some are detoxified. However, this liver processing can also convert some
                substances into more toxic metabolites.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">Prevention Is Simple</p>
                </div>
                <p className="text-sm text-white/80">
                  Ingestion exposure is <strong>almost entirely preventable</strong> through basic hygiene:
                  always wash hands thoroughly before eating, drinking, or smoking; never store food or drink near
                  chemicals; use designated clean break areas; never decant chemicals into unlabelled or food/drink
                  containers; and never eat, drink, or smoke in work areas where hazardous substances are present.
                  These are fundamental COSHH requirements, not optional good practice.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Substances with Significant Ingestion Risk</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { substance: "Lead", detail: "Lead dust and fume from old paintwork, lead sheet, and solder. Ingestion via contaminated hands is a major route. Lead accumulates in the body over time." },
                    { substance: "Pesticides / herbicides", detail: "Residues on hands, clothing, or equipment. Particularly relevant for workers in agricultural buildings or treated land." },
                    { substance: "Cement dust", detail: "Alkaline (pH 12\u201313) and can cause internal burns if swallowed in quantity. More commonly affects the skin and respiratory system." },
                    { substance: "Biological agents", detail: "Bacteria (leptospirosis from rat urine in drains), viruses, and parasites. Particularly relevant for workers in drainage, sewage, and demolition." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-violet-400 mb-1">{item.substance}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Injection & Percutaneous Exposure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">05</span>
            Injection &amp; Percutaneous Exposure
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Injection (also called percutaneous exposure) occurs when a hazardous substance enters the body
                through a break in the skin &mdash; whether from a puncture wound, cut, abrasion, or high-pressure
                equipment. This route is the <strong>least common</strong> in most workplaces, but it can be the
                <strong> most dangerous</strong> because it completely bypasses the body's primary defence: the
                intact skin barrier.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Why Injection Is Dangerous</p>
                </div>
                <p className="text-sm text-white/80">
                  When a substance enters through broken skin, it is delivered directly into subcutaneous tissue,
                  muscle, or the bloodstream &mdash; none of the body's surface barriers (skin, mucous membranes,
                  stomach acid) have the opportunity to limit or neutralise it. Even a very small quantity of a
                  highly toxic substance can cause serious local tissue damage or rapid systemic effects.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How Injection Exposure Occurs in Construction &amp; Electrical Work</p>
                <div className="space-y-3">
                  {[
                    { mechanism: "High-pressure injection", detail: "High-pressure water jets, airless paint sprayers, grease guns, and hydraulic systems can inject substances (water, paint, oil, hydraulic fluid) through the skin at pressures exceeding 100 bar. The entry wound may appear minor, but the internal damage can be severe \u2014 requiring emergency surgery. High-pressure injection injuries are medical emergencies." },
                    { mechanism: "Contaminated sharps", detail: "Nails, screws, wire ends, metal burrs, broken glass, and splinters that are contaminated with hazardous substances (lead paint, treated timber preservatives, chemical residues) can introduce those substances into the body when they puncture the skin." },
                    { mechanism: "Abrasion + chemical contact", detail: "An existing cut, graze, or abrasion that comes into contact with a hazardous substance allows that substance to enter directly through the broken skin barrier. This is more common than workers realise \u2014 minor hand injuries are extremely common in the trades, and chemical contact with these injuries delivers a dose straight into the tissue." },
                    { mechanism: "Needle-stick equivalents", detail: "While traditional needle-stick injuries are primarily a concern in healthcare, construction workers may encounter discarded hypodermic needles during demolition, refurbishment, or work in public spaces. These carry the risk of blood-borne virus transmission (HIV, Hepatitis B and C) as well as chemical exposure." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-violet-400 mb-1">{item.mechanism}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Syringe className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">Prevention Measures</p>
                </div>
                <p className="text-sm text-white/80">
                  Prevent injection exposure by: wearing appropriate gloves and protective footwear; covering
                  existing cuts and abrasions with waterproof dressings before handling chemicals; following safe
                  systems of work for high-pressure equipment; maintaining good housekeeping to reduce sharp
                  hazards; and being vigilant for discarded sharps during demolition and refurbishment work. If a
                  high-pressure injection injury occurs, treat it as a <strong>medical emergency</strong> &mdash;
                  attend A&amp;E immediately even if the wound appears minor.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: Factors Affecting Exposure Risk */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">06</span>
            Factors Affecting Exposure Risk
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The risk of harm from exposure to a hazardous substance depends on far more than just the toxicity
                of the substance itself. A range of factors determine the actual dose a worker receives and how their
                body responds to it. COSHH risk assessments must consider all of these factors to be effective.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Exposure Factors (The Dose Received)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { factor: "Concentration", detail: "The amount of substance present per unit volume of air (mg/m\u00B3 or ppm) or per unit area of skin contact. Higher concentration = greater dose per unit time." },
                    { factor: "Duration", detail: "How long the worker is exposed. A brief exposure to a high concentration may deliver the same dose as prolonged exposure to a lower concentration." },
                    { factor: "Frequency", detail: "How often the exposure occurs. Daily exposure accumulates a much greater lifetime dose than occasional exposure. Some effects (e.g. sensitisation) depend on repeated exposures." },
                    { factor: "Ventilation", detail: "Good ventilation (natural or mechanical) reduces airborne concentrations. Local exhaust ventilation (LEV) captures contaminants at source before they reach the breathing zone. Poor ventilation allows concentrations to build up dangerously." },
                    { factor: "Temperature", detail: "Higher temperatures increase evaporation rates of volatile substances (solvents, fuels), producing higher airborne concentrations. Chemical reactions also speed up at higher temperatures. Hot work environments increase breathing rate and sweating, enhancing both inhalation and dermal uptake." },
                    { factor: "Physical work rate", detail: "Heavy physical exertion increases breathing rate and depth by 2\u20133 times, proportionally increasing the inhaled dose. Sweating also increases skin permeability to some substances." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-violet-400 mb-1">{item.factor}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Individual Susceptibility Factors</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { factor: "Age", detail: "Younger workers (developing lungs and organs) and older workers (declining organ function) may be more susceptible. Young apprentices deserve particular attention in COSHH assessments." },
                    { factor: "Pre-existing health conditions", detail: "Workers with asthma, eczema, liver disease, kidney disease, or respiratory conditions are more vulnerable. Asthma sufferers are at greater risk of occupational asthma from sensitisers." },
                    { factor: "Genetic variation", detail: "Individuals vary in their enzyme activity for metabolising chemicals. Some people are genetically 'fast metabolisers' and clear substances more quickly; others are 'slow metabolisers' and accumulate higher body burdens." },
                    { factor: "Medication", detail: "Some medications interact with workplace chemicals. For example, alcohol and certain drugs can inhibit liver enzymes that detoxify solvents, increasing their toxicity." },
                    { factor: "Smoking", detail: "Smoking damages the mucociliary escalator (the lung's self-cleaning mechanism), reduces lung function, and increases the permeability of the airway lining. Smokers are more susceptible to inhaled hazardous substances." },
                    { factor: "Pregnancy", detail: "Some hazardous substances (lead, certain solvents, carbon monoxide) pose risks to the developing foetus. Pregnant workers must have a specific COSHH risk assessment under the Management of Health and Safety at Work Regulations 1999." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-violet-400 mb-1">{item.factor}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">The Practical Implication</p>
                </div>
                <p className="text-sm text-white/80">
                  Because individual susceptibility varies, <strong>Workplace Exposure Limits are not &lsquo;safe&rsquo;
                  levels</strong>. The same airborne concentration of a substance may cause no noticeable effect in one
                  worker but trigger occupational asthma in another. This is why COSHH Regulation 7 requires employers
                  to reduce exposure to as low as is reasonably practicable &mdash; not simply to keep it at or below
                  the WEL. The WEL is the maximum, not the target.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Workplace Exposure Limits (WELs) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">07</span>
            Workplace Exposure Limits (WELs)
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Workplace Exposure Limits (WELs) are <strong>legally binding maximum concentrations</strong> of
                airborne hazardous substances to which workers may be exposed by inhalation. They are published by
                the Health and Safety Executive (HSE) in document <strong>EH40/05 &ldquo;Workplace Exposure
                Limits&rdquo;</strong> (with periodic amendments).
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">Key Definition &mdash; Workplace Exposure Limit</p>
                <p className="text-sm text-white">
                  A WEL is the maximum concentration of an airborne substance, averaged over a specified reference
                  period, to which employees may be exposed by inhalation. WELs are expressed as concentrations in
                  air &mdash; either in <strong>mg/m&sup3;</strong> (milligrams per cubic metre) for dusts, fumes,
                  and mists, or in <strong>ppm</strong> (parts per million) for gases and vapours.
                </p>
              </div>

              <h3 className="text-base font-semibold text-white pt-2">Two Types of WEL</h3>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">8-Hour TWA vs 15-Minute STEL</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-sm font-medium text-violet-400 mb-2">8-Hour TWA (Time-Weighted Average)</p>
                    <ul className="text-xs text-white/70 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5 flex-shrink-0">&bull;</span>
                        <span>Average airborne concentration over an <strong>8-hour working day</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5 flex-shrink-0">&bull;</span>
                        <span>Protects against <strong>chronic (long-term)</strong> health effects</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5 flex-shrink-0">&bull;</span>
                        <span>Allows for variation during the day &mdash; some periods can exceed the TWA if others are lower, as long as the 8-hour average is within limits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5 flex-shrink-0">&bull;</span>
                        <span>Example: Toluene has an 8-hour TWA WEL of 50 ppm (191 mg/m&sup3;)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-sm font-medium text-violet-400 mb-2">15-Minute STEL (Short-Term Exposure Limit)</p>
                    <ul className="text-xs text-white/70 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5 flex-shrink-0">&bull;</span>
                        <span>Average airborne concentration over <strong>any 15-minute period</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5 flex-shrink-0">&bull;</span>
                        <span>Protects against <strong>acute (short-term)</strong> effects such as irritation, narcosis, or sensitisation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5 flex-shrink-0">&bull;</span>
                        <span>Must not be exceeded at any point during the day, even if the 8-hour average is within limits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5 flex-shrink-0">&bull;</span>
                        <span>Example: Toluene has a 15-minute STEL of 100 ppm (384 mg/m&sup3;)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* WEL Explanation Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 overflow-hidden">
                <p className="text-xs text-white/50 uppercase tracking-wider mb-4 text-center">WEL Explanation Diagram &mdash; TWA vs STEL</p>

                <div className="relative mx-auto max-w-2xl">
                  <div className="relative border-2 border-violet-500/40 rounded-lg bg-gradient-to-b from-violet-500/5 to-transparent">

                    {/* TWA Section */}
                    <div className="border-b border-dashed border-violet-500/20 p-3 sm:p-4">
                      <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-3">8-Hour Time-Weighted Average (TWA)</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-[10px] font-bold text-violet-400">1</span>
                          <span className="text-xs text-white/80">Measured over full 8-hour shift</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-[10px] font-bold text-violet-400">2</span>
                          <span className="text-xs text-white/80">Peaks &amp; troughs averaged out</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-[10px] font-bold text-violet-400">3</span>
                          <span className="text-xs text-white/80">Protects against chronic effects</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-[10px] font-bold text-violet-400">4</span>
                          <span className="text-xs text-white/80">Units: mg/m&sup3; or ppm</span>
                        </div>
                      </div>
                    </div>

                    {/* STEL Section */}
                    <div className="border-b border-dashed border-violet-500/20 p-3 sm:p-4">
                      <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-3">15-Minute Short-Term Exposure Limit (STEL)</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-[10px] font-bold text-red-400">1</span>
                          <span className="text-xs text-white/80">Measured over any 15-min window</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-[10px] font-bold text-red-400">2</span>
                          <span className="text-xs text-white/80">Must never be exceeded at any point</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-[10px] font-bold text-red-400">3</span>
                          <span className="text-xs text-white/80">Protects against acute effects</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-[10px] font-bold text-red-400">4</span>
                          <span className="text-xs text-white/80">Often higher than the TWA value</span>
                        </div>
                      </div>
                    </div>

                    {/* How Measured */}
                    <div className="border-b border-dashed border-violet-500/20 p-3 sm:p-4">
                      <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">How WELs Are Measured</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-bold text-amber-400">a</span>
                          <span className="text-xs text-white/80">Personal air sampling pump worn by worker</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-bold text-amber-400">b</span>
                          <span className="text-xs text-white/80">Filter or sorbent tube in the breathing zone</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-bold text-amber-400">c</span>
                          <span className="text-xs text-white/80">Sample sent to accredited laboratory</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-bold text-amber-400">d</span>
                          <span className="text-xs text-white/80">Result compared against EH40 limit</span>
                        </div>
                      </div>
                    </div>

                    {/* Important Note */}
                    <div className="p-3 sm:p-4">
                      <p className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Critical Principle</p>
                      <div className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-[10px] font-bold text-red-400">!</span>
                        <span className="text-xs text-white/80"><strong>WELs are legal maximums, not safe levels.</strong> Employers must reduce exposure to as low as is reasonably practicable (ALARP), even if already below the WEL.</span>
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap items-center gap-4 mt-4 justify-center">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-violet-500/30 border border-violet-500/50" />
                      <span className="text-[10px] text-white/50">Long-term limit (TWA)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
                      <span className="text-[10px] text-white/50">Short-term limit (STEL)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500/50" />
                      <span className="text-[10px] text-white/50">Measurement method</span>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-base font-semibold text-white pt-2">EH40 &mdash; The Reference Document</h3>

              <p>
                HSE document <strong>EH40/05 &ldquo;Workplace Exposure Limits&rdquo;</strong> is the definitive UK
                reference for WELs. It contains a table listing hundreds of substances with their corresponding
                8-hour TWA and/or 15-minute STEL values. The document is updated periodically as new toxicological
                evidence becomes available. EH40 also indicates which substances have skin notation (&lsquo;Sk&rsquo;),
                meaning they can be absorbed through intact skin in significant amounts.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Example WELs from EH40</p>
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { substance: "Toluene", twa: "50 ppm (191 mg/m\u00B3)", stel: "100 ppm (384 mg/m\u00B3)", skin: "Yes (Sk)" },
                      { substance: "Wood dust (all species)", twa: "3 mg/m\u00B3", stel: "\u2014", skin: "No" },
                      { substance: "Silica (respirable)", twa: "0.1 mg/m\u00B3", stel: "\u2014", skin: "No" },
                      { substance: "Carbon monoxide", twa: "20 ppm (23 mg/m\u00B3)", stel: "100 ppm (117 mg/m\u00B3)", skin: "No" },
                      { substance: "Lead (inorganic)", twa: "0.15 mg/m\u00B3", stel: "\u2014", skin: "No" },
                      { substance: "Isocyanates (as NCO)", twa: "0.02 mg/m\u00B3", stel: "0.07 mg/m\u00B3", skin: "Yes (Sk)" }
                    ].map((item, i) => (
                      <div key={i} className="bg-black/30 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-medium text-violet-400">{item.substance}</p>
                          {item.skin === "Yes (Sk)" && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/30 text-amber-300">Sk</span>
                          )}
                        </div>
                        <p className="text-xs text-white/70">8hr TWA: {item.twa}</p>
                        <p className="text-xs text-white/70">15min STEL: {item.stel}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">Legal Duty &mdash; COSHH Regulation 7</p>
                </div>
                <p className="text-sm text-white/80">
                  Under COSHH Regulation 7, employers must ensure that exposure to hazardous substances is either
                  <strong> prevented</strong> or, where prevention is not reasonably practicable,
                  <strong> adequately controlled</strong>. For substances with a WEL, &ldquo;adequate control&rdquo;
                  means the WEL must not be exceeded. However, the employer must <strong>also</strong> reduce
                  exposure to as low as is reasonably practicable &mdash; simply maintaining exposure at the WEL when
                  it could be lower is not compliant. For carcinogens, mutagens, and asthmagens, the duty to prevent
                  or reduce exposure to as low as reasonably practicable is even more stringent.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Dose-Response & Biological Monitoring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">08</span>
            Dose-Response &amp; Biological Monitoring
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <h3 className="text-base font-semibold text-white">The Dose-Response Relationship</h3>

              <p>
                The <strong>dose-response relationship</strong> is one of the fundamental principles of toxicology.
                It describes the relationship between the amount of a substance a person is exposed to (the dose)
                and the severity or likelihood of the resulting health effect (the response). In simple terms:
                <strong> the greater the dose, the greater the effect</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Concepts in Dose-Response</p>
                <div className="space-y-3">
                  {[
                    { concept: "Dose", detail: "The total amount of substance that enters the body, from all routes combined, over the relevant time period. Dose = Concentration \u00D7 Duration \u00D7 Uptake rate. A higher concentration, longer exposure, or faster absorption all increase the dose." },
                    { concept: "Response", detail: "The biological effect produced by the dose. This ranges from no observable effect (at very low doses) through mild effects (irritation, headache) to severe effects (organ damage, cancer, death) as the dose increases." },
                    { concept: "Threshold", detail: "For many substances, there is a dose below which no adverse effect is observed \u2014 the threshold. WELs are based (in part) on this concept. However, for some substances \u2014 particularly carcinogens and sensitisers \u2014 no safe threshold may exist. Any exposure carries some risk." },
                    { concept: "No-observed-adverse-effect level (NOAEL)", detail: "The highest dose at which no adverse effect is seen in toxicological studies. This is a key data point used when setting WELs. A safety factor is applied below the NOAEL to derive the workplace limit." },
                    { concept: "Cumulative exposure", detail: "Some substances accumulate in the body over time because they are absorbed faster than they are eliminated. Lead accumulates in bone. Silica particles remain permanently in lung tissue. For these substances, the lifetime cumulative dose determines the health outcome, not just today's exposure." },
                    { concept: "Latency period", detail: "Some health effects appear only years or decades after exposure. Mesothelioma from asbestos has a latency of 15\u201360 years. Occupational cancers from chemical exposure may take 10\u201340 years to develop. This makes it difficult to link current illness to past exposure." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-violet-400 mb-1">{item.concept}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">Carcinogens &mdash; No Safe Threshold</p>
                </div>
                <p className="text-sm text-white/80">
                  For genotoxic carcinogens (substances that directly damage DNA), the scientific consensus is that
                  there may be <strong>no safe threshold</strong>. Even a single molecule could theoretically initiate
                  a mutation that leads to cancer. This is why COSHH takes an especially strict approach to carcinogens:
                  exposure must be reduced to as low as is reasonably practicable, and additional controls (health
                  surveillance, exposure records kept for 40 years) are required.
                </p>
              </div>

              <h3 className="text-base font-semibold text-white pt-4">Biological Monitoring</h3>

              <p>
                <strong>Biological monitoring</strong> measures the concentration of a hazardous substance (or its
                metabolites) in a worker's body. It uses biological samples &mdash; typically urine, blood, or
                exhaled breath &mdash; to assess how much of a substance has actually been absorbed, regardless of
                the route of entry.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Biological Monitoring vs Air Monitoring</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-sm font-medium text-amber-400 mb-2">Air Monitoring</p>
                    <ul className="text-xs text-white/70 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5 flex-shrink-0">&bull;</span>
                        <span>Measures airborne concentration in the breathing zone</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5 flex-shrink-0">&bull;</span>
                        <span>Shows what the worker <em>could</em> be inhaling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5 flex-shrink-0">&bull;</span>
                        <span>Only captures inhalation route</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5 flex-shrink-0">&bull;</span>
                        <span>Does not account for PPE effectiveness</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-sm font-medium text-violet-400 mb-2">Biological Monitoring</p>
                    <ul className="text-xs text-white/70 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5 flex-shrink-0">&bull;</span>
                        <span>Measures what has actually entered the body</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5 flex-shrink-0">&bull;</span>
                        <span>Shows the actual absorbed dose</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5 flex-shrink-0">&bull;</span>
                        <span>Captures <strong>all routes</strong> combined (inhalation + skin + ingestion)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-violet-400 mt-0.5 flex-shrink-0">&bull;</span>
                        <span>Accounts for PPE effectiveness, work practices, and hygiene</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Biological Monitoring Tests</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { substance: "Lead", test: "Blood lead level", sample: "Blood", detail: "Statutory requirement for lead workers. Blood lead concentration must not exceed the suspension level (men: 60 \u00B5g/dL, women of reproductive capacity: 30 \u00B5g/dL). Measured at regular intervals." },
                    { substance: "Styrene", test: "Urinary mandelic acid", sample: "Urine (end of shift)", detail: "Mandelic acid is a metabolite of styrene. Elevated levels in urine indicate styrene absorption. BMGV: 400 mmol/mol creatinine." },
                    { substance: "Toluene", test: "Urinary o-cresol or blood toluene", sample: "Urine or blood", detail: "o-Cresol in urine is the standard biological marker for toluene exposure. BMGV: 0.5 mmol/L creatinine." },
                    { substance: "Mercury (inorganic)", test: "Urinary mercury", sample: "Urine", detail: "Urine mercury levels indicate recent exposure to inorganic mercury vapour. BMGV: 20 \u00B5mol/mol creatinine." },
                    { substance: "Isocyanates", test: "Urinary isocyanate metabolites", sample: "Urine (end of shift)", detail: "Diamine metabolites in urine indicate isocyanate absorption. Used alongside health surveillance for respiratory sensitisation." },
                    { substance: "Carbon monoxide", test: "Blood carboxyhaemoglobin (COHb) or exhaled CO", sample: "Blood or breath", detail: "COHb level shows how much haemoglobin is bound to CO instead of oxygen. Exhaled CO provides a quick screening test." }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-medium text-violet-400">{item.substance}</p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-500/20 text-violet-300">{item.sample}</span>
                      </div>
                      <p className="text-xs text-white/60 mb-1">Test: {item.test}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">Biological Monitoring Guidance Values (BMGVs)</p>
                <p className="text-sm text-white">
                  The HSE publishes <strong>Biological Monitoring Guidance Values (BMGVs)</strong> for some substances.
                  A BMGV represents the concentration of a biological marker (in urine or blood) that corresponds to
                  exposure at the WEL. If a worker's biological monitoring result exceeds the BMGV, it indicates their
                  overall absorption exceeds what would be expected from inhalation at the WEL alone &mdash; suggesting
                  additional exposure through skin contact or ingestion, or that controls are inadequate. BMGVs are
                  guidance, not legal limits, but exceeding them should trigger investigation and corrective action.
                </p>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">When Is Biological Monitoring Required?</p>
                </div>
                <p className="text-sm text-white/80">
                  Biological monitoring is <strong>legally required</strong> for lead workers (under the Control of
                  Lead at Work Regulations 2002) and for some specific processes. For other substances, it is
                  <strong> recommended good practice</strong> where there is significant skin absorption (substances
                  with &lsquo;Sk&rsquo; notation), where air monitoring alone may not reflect the true exposure, or where
                  health surveillance is required. The results help verify that control measures and PPE are working
                  effectively and that workers' exposure is being adequately managed.
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
          title="Section 3 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-1-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Types of Hazardous Substances
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-1-section-4">
              Next: Health Effects of Hazardous Substances
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
