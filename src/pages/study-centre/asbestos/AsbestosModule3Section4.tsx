import { ArrowLeft, FlaskConical, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "presumption-approach",
    question: "Under CAR 2012 Regulation 5, what must a dutyholder do if a material cannot be identified?",
    options: [
      "Presume that the material contains asbestos until proven otherwise",
      "Remove the material immediately as a precaution",
      "Ignore it unless it is visibly damaged",
      "Wait for the next scheduled building survey"
    ],
    correctIndex: 0,
    explanation: "Under Regulation 5 of CAR 2012, if a material cannot be identified, it MUST be presumed to contain asbestos. This is the default legal position — presume asbestos until sampling and analysis prove otherwise. Presuming means treating the material as if it contains asbestos and applying appropriate controls."
  },
  {
    id: "who-can-sample",
    question: "What qualification does the HSE recommend for a person carrying out bulk sampling of asbestos?",
    options: [
      "BOHS P402 — Building Surveys and Bulk Sampling for Asbestos",
      "NEBOSH National General Certificate",
      "IOSH Managing Safely",
      "CITB Site Safety Plus"
    ],
    correctIndex: 0,
    explanation: "The HSE recommends that sampling is carried out by a competent person holding the BOHS P402 qualification (Building Surveys and Bulk Sampling for Asbestos) or equivalent. The sampler should be from a UKAS-accredited organisation and must have appropriate RPE and PPE."
  },
  {
    id: "plm-analysis",
    question: "What is the standard laboratory method for identifying asbestos in bulk samples?",
    options: [
      "Polarised Light Microscopy (PLM)",
      "Phase Contrast Microscopy (PCM)",
      "Transmission Electron Microscopy (TEM)",
      "X-ray fluorescence spectroscopy"
    ],
    correctIndex: 0,
    explanation: "Polarised Light Microscopy (PLM) is the standard analytical method for identifying asbestos in bulk samples. It uses polarised light to identify asbestos fibres by their optical properties — colour, refractive index, birefringence, and extinction angle. Analysis must be carried out by a UKAS-accredited laboratory."
  }
];

const faqs = [
  {
    question: "Is it always necessary to sample a suspected material, or can you simply presume it contains asbestos?",
    answer: "Presumption is a perfectly valid management strategy and is, in fact, the default legal position under CAR 2012. Many dutyholders choose to presume rather than sample because it avoids the risk of fibre release during sampling and provides immediate protection. However, sampling may be justified when the presumption approach is creating disproportionate restrictions on work, when a definitive answer is needed for planned refurbishment or demolition, or when the type of asbestos must be determined for risk assessment or waste disposal purposes. The decision to sample must weigh the risk of disturbance against the benefit of knowing."
  },
  {
    question: "How long does laboratory analysis of a bulk sample typically take?",
    answer: "Standard turnaround time for Polarised Light Microscopy (PLM) analysis is typically 2 to 5 working days. Most UKAS-accredited laboratories offer a rush or priority service for an additional cost, which can return results within 24 hours or even the same day. The cost per sample is approximately £20 to £40, depending on the laboratory and the urgency. When planning work, you should factor in the turnaround time and ensure results are received and reviewed before any work commences on the material in question."
  },
  {
    question: "If one sample from a material comes back negative, does that mean the entire area is asbestos-free?",
    answer: "No. A single negative result only applies to the specific sample taken from that specific location. Materials can vary within the same building, the same room, or even the same wall — for example, different batches of artex, different layers of floor tiles, or patchwork repairs using different materials. If you need confidence that an entire area is free of asbestos, multiple representative samples must be taken. The survey report should indicate how many samples were taken and from which locations, and the dutyholder must understand that unsampled materials should still be presumed to contain asbestos."
  },
  {
    question: "What is the difference between air monitoring and bulk sampling?",
    answer: "Bulk sampling involves taking a physical piece of the material and sending it to a laboratory for Polarised Light Microscopy (PLM) analysis to determine whether it contains asbestos and, if so, which type. Air monitoring, by contrast, measures the concentration of airborne asbestos fibres in the atmosphere. Phase Contrast Microscopy (PCM) is the standard air monitoring method — it counts fibres but cannot identify the type. Transmission Electron Microscopy (TEM) can identify fibre type in air samples but is more expensive. Air monitoring is primarily used during and after asbestos removal work to confirm that fibre levels are below the control limit (0.1 fibres per cm³) and as part of the 4-stage clearance procedure after licensed asbestos work."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under CAR 2012, what is the default position if a material in a pre-2000 building has not been sampled or identified?",
    options: [
      "It can be assumed to be safe until a survey is scheduled",
      "It must be presumed to contain asbestos until proven otherwise",
      "It should be removed immediately by any available contractor",
      "It only needs to be considered if refurbishment work is planned"
    ],
    correctAnswer: 1,
    explanation: "Regulation 5 of CAR 2012 requires that if materials cannot be identified, they MUST be presumed to contain asbestos. This is the default legal position — presume asbestos until sampling and analysis prove otherwise. This presumption applies to all suspect materials and is a legal requirement, not optional."
  },
  {
    id: 2,
    question: "Which of the following is an advantage of the presumption approach over sampling?",
    options: [
      "It eliminates the need for a management plan",
      "It avoids the risk of fibre release during sampling and provides immediate protection",
      "It is cheaper because no controls are needed for presumed materials",
      "It removes the dutyholder's legal responsibilities"
    ],
    correctAnswer: 1,
    explanation: "Presuming a material contains asbestos avoids the risk of disturbing it through sampling and provides immediate protection — the material is treated as an ACM from the outset. However, the dutyholder must still have a management plan in place and apply appropriate controls. The disadvantage is that presumption may result in unnecessary restrictions and higher costs for work near presumed ACMs."
  },
  {
    id: 3,
    question: "When might sampling be justified instead of relying on the presumption approach?",
    options: [
      "When the dutyholder wants to avoid keeping an asbestos register",
      "When the material looks undamaged and is in good condition",
      "When the presumption approach is creating disproportionate restrictions on planned work",
      "When the building was constructed after the year 2000"
    ],
    correctAnswer: 2,
    explanation: "Sampling is justified when the presumption approach is creating disproportionate restrictions on work — for example, if presuming a material contains asbestos is preventing necessary refurbishment. Sampling may also be needed when a definitive answer is required for planned demolition, when the type of asbestos must be determined for risk assessment, or when materials need to be classified for waste disposal."
  },
  {
    id: 4,
    question: "What minimum level of respiratory protective equipment (RPE) must a sampler wear when taking a bulk sample of suspected ACM?",
    options: [
      "A basic dust mask (FFP1)",
      "A half-face respirator with P2 filters",
      "An FFP3 disposable respirator as a minimum",
      "No RPE is needed if the material is dampened first"
    ],
    correctAnswer: 2,
    explanation: "The sampler must wear appropriate RPE, with a minimum of an FFP3 disposable respirator. FFP3 provides the highest level of protection among disposable respirators and is the minimum standard for asbestos work. The sampler must also wear disposable coveralls and follow controlled sampling procedures to minimise fibre release."
  },
  {
    id: 5,
    question: "What does Polarised Light Microscopy (PLM) determine when analysing a bulk sample?",
    options: [
      "The concentration of airborne asbestos fibres in the atmosphere",
      "Whether the material contains asbestos and which type(s) are present",
      "The age of the material and when it was installed",
      "Whether the material is safe to leave in place without management"
    ],
    correctAnswer: 1,
    explanation: "PLM is the standard method for identifying asbestos in bulk samples. It uses polarised light to identify asbestos fibres by their optical properties — colour, refractive index, birefringence, and extinction angle. PLM can identify all six types of asbestos and determines whether asbestos is present and which type(s). It does NOT determine airborne fibre concentrations (that is air monitoring) or whether a material is safe to leave in place."
  },
  {
    id: 6,
    question: "Which method is used for air monitoring during and after asbestos work to count airborne fibres?",
    options: [
      "Polarised Light Microscopy (PLM)",
      "X-ray diffraction analysis",
      "Phase Contrast Microscopy (PCM)",
      "Gas chromatography"
    ],
    correctAnswer: 2,
    explanation: "Phase Contrast Microscopy (PCM) is the standard method for air monitoring. It counts the concentration of airborne fibres but cannot identify the specific type of asbestos. PCM is used during and after asbestos work to confirm that fibre levels are below the control limit. Transmission Electron Microscopy (TEM) can identify fibre type in air samples but is more expensive and used less routinely."
  },
  {
    id: 7,
    question: "What is the correct procedure immediately after taking a bulk sample of suspected ACM?",
    options: [
      "Leave the sampling point open so the surveyor can return later if needed",
      "Seal and label the sampling point, double-bag the sample, and complete the chain of custody form",
      "Send the sample by standard post to any available laboratory",
      "Dispose of the sample on site if it does not look like asbestos"
    ],
    correctAnswer: 1,
    explanation: "After taking a sample, the sampling point must be sealed and labelled to prevent further fibre release. The sample must be placed in a sealed, labelled container and double-bagged for transport. A chain of custody form must be completed to maintain the integrity of the evidence. The sample must then be sent to a UKAS-accredited laboratory for PLM analysis."
  },
  {
    id: 8,
    question: "A laboratory result states 'No asbestos detected' for a single bulk sample. What does this mean in practice?",
    options: [
      "The entire building is confirmed asbestos-free and no further action is needed",
      "The specific sample taken does not contain asbestos, but other materials in the area may still contain it",
      "The material can be removed by any contractor without precautions",
      "The asbestos register can be closed and the management plan discontinued"
    ],
    correctAnswer: 1,
    explanation: "A 'No asbestos detected' result applies only to the specific sample taken. It does NOT confirm that the entire area, room, or building is asbestos-free. Materials can vary — different batches, layers, or patchwork repairs may contain asbestos even if one sample does not. Results should be recorded in the asbestos register, and unsampled materials must continue to be presumed to contain asbestos."
  }
];

export default function AsbestosModule3Section4() {
  useSEO({
    title: "Presuming, Sampling & Analysis | Asbestos Awareness Module 3.4",
    description: "The presumption approach under CAR 2012, when sampling is justified, who can sample, PLM analysis, bulk sampling vs air monitoring, sampling procedure, and interpreting laboratory results.",
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
            <Link to="../asbestos-awareness-module-3">
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
            <FlaskConical className="h-7 w-7 text-orange-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3 mx-auto">
            <span className="text-orange-500 text-xs font-semibold">MODULE 3 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Presuming, Sampling &amp; Analysis
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            When to presume, when to sample, who can do it, and how laboratory analysis identifies asbestos in materials
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Default position:</strong> Presume asbestos until proven otherwise (CAR 2012 Reg 5)</li>
              <li><strong>Sampling:</strong> Only by competent persons with BOHS P402</li>
              <li><strong>Analysis:</strong> PLM by UKAS-accredited laboratory</li>
              <li><strong>Guidance:</strong> HSG248 &mdash; Asbestos: The analysts&rsquo; guide</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Not sure?</strong> Presume it&rsquo;s asbestos &mdash; this is the law</li>
              <li><strong>Never sample yourself:</strong> Only competent persons with RPE</li>
              <li><strong>One negative result</strong> does not clear the whole area</li>
              <li><strong>Always update</strong> the asbestos register with results</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the presumption approach and why it is the default legal position under CAR 2012",
              "Identify when sampling is justified over presumption",
              "Describe who is competent to carry out sampling and what qualifications they need",
              "Explain how Polarised Light Microscopy (PLM) identifies asbestos in bulk samples",
              "Distinguish between bulk sampling and air monitoring and their respective uses",
              "Outline the correct sampling procedure and chain of custody requirements",
              "Interpret laboratory results and understand their limitations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-orange-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Presumption Approach */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">01</span>
            The Presumption Approach
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Under <strong>Regulation 5 of the Control of Asbestos Regulations 2012 (CAR 2012)</strong>,
                if materials in a building cannot be identified, they <strong>MUST be presumed to contain
                asbestos</strong>. This is not a suggestion or a best-practice recommendation &mdash; it is a
                <strong> legal requirement</strong>. The default position is always: presume asbestos until
                sampling and laboratory analysis prove otherwise.
              </p>

              <p>
                Presuming means treating the material <strong>as if it contains asbestos</strong> and
                applying all of the appropriate controls. This includes recording it in the asbestos
                register, including it in the management plan, labelling or marking it where appropriate,
                and ensuring that anyone who may disturb the material is informed and takes the necessary
                precautions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">Presumption as a Management Strategy</p>
                <p className="text-sm text-white/80 mb-3">
                  Presumption is not just a fallback when sampling has not been carried out &mdash; it is a
                  <strong className="text-white"> valid and recognised management strategy</strong> in its own right.
                  Many dutyholders actively choose to presume rather than sample.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-green-400 font-medium uppercase tracking-wide mb-2">Advantages of Presuming</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>No sampling cost</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>No risk of fibre release during sampling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Immediate protection &mdash; controls applied from the outset</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Simplifies the management process for materials that will not be disturbed</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-red-400 font-medium uppercase tracking-wide mb-2">Disadvantages of Presuming</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>May result in unnecessary restrictions on work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Higher costs for work near presumed ACMs (extra precautions, specialist contractors)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Does not identify the type of asbestos, which may affect risk assessment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>May create confusion if multiple materials are all &ldquo;presumed&rdquo;</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Legal Requirement</p>
                </div>
                <p className="text-sm text-white/80">
                  Presumption is <strong>not optional</strong>. If a material has not been sampled and
                  analysed, the law requires it to be presumed to contain asbestos. Failing to presume
                  &mdash; and subsequently allowing work to disturb the material without appropriate
                  controls &mdash; is a breach of the Control of Asbestos Regulations 2012 and could
                  result in enforcement action by the HSE, including prosecution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: When Sampling Is Justified */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">02</span>
            When Sampling Is Justified
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Whilst presumption is the default position, there are circumstances where
                <strong> sampling is justified</strong> and may be the more practical course of action.
                The decision to sample should always weigh the <strong>risk of disturbance</strong> during
                the sampling process against the <strong>benefit of obtaining a definitive answer</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">Sampling May Be Justified When&hellip;</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>The presumption approach is creating <strong className="text-white">disproportionate restrictions</strong> on planned or routine work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>A <strong className="text-white">definitive answer</strong> is needed for planned refurbishment or demolition work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>The dutyholder needs to determine the <strong className="text-white">type of asbestos</strong> (chrysotile, amosite, crocidolite) for risk assessment purposes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>Materials need to be <strong className="text-white">classified for waste disposal</strong> purposes &mdash; asbestos waste must be disposed of at licensed facilities</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">Critical Rule:</strong> Sampling should
                  <strong> ONLY be carried out by a competent person</strong>. Under no circumstances
                  should an electrician, maintenance worker, or other tradesperson attempt to take their
                  own samples. Improper sampling can release asbestos fibres into the air, putting the
                  sampler and anyone else in the area at serious risk. If you suspect a material contains
                  asbestos &mdash; <strong>stop work and report it</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Decision Tree Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">&mdash;</span>
            &ldquo;Is It Asbestos?&rdquo; Decision Tree
          </h2>
          <div className="bg-white/5 border border-orange-500/30 rounded-xl p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[320px] space-y-4">
              {/* Start Node */}
              <div className="flex justify-center">
                <div className="bg-orange-500/20 border-2 border-orange-500/50 rounded-xl px-5 py-3 text-center">
                  <p className="text-sm font-semibold text-orange-400">START</p>
                  <p className="text-white text-sm font-medium mt-1">Is the building pre-2000?</p>
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center gap-16 sm:gap-24">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-orange-500/40" />
                  <span className="text-xs font-bold text-red-400 mb-1">NO</span>
                  <div className="w-0.5 h-4 bg-orange-500/40" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-orange-500/40" />
                  <span className="text-xs font-bold text-green-400 mb-1">YES</span>
                  <div className="w-0.5 h-4 bg-orange-500/40" />
                </div>
              </div>

              {/* Two Branch Row */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                {/* NO Branch */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                  <p className="text-xs font-medium text-green-400 mb-1">LOW RISK</p>
                  <p className="text-white/80 text-xs sm:text-sm">Unlikely to contain asbestos (but check any refurbishment materials)</p>
                </div>
                {/* YES Branch */}
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center">
                  <p className="text-xs font-medium text-orange-400 mb-1">NEXT QUESTION</p>
                  <p className="text-white text-xs sm:text-sm font-medium">Has the area been surveyed?</p>
                </div>
              </div>

              {/* Arrow from YES branch */}
              <div className="flex justify-end pr-[25%]">
                <div className="flex gap-12 sm:gap-20">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 bg-orange-500/40" />
                    <span className="text-xs font-bold text-green-400 mb-1">YES</span>
                    <div className="w-0.5 h-4 bg-orange-500/40" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 bg-orange-500/40" />
                    <span className="text-xs font-bold text-red-400 mb-1">NO</span>
                    <div className="w-0.5 h-4 bg-orange-500/40" />
                  </div>
                </div>
              </div>

              {/* Survey YES/NO Branches */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                {/* Spacer for alignment */}
                <div />
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {/* Surveyed YES */}
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center">
                    <p className="text-xs font-medium text-orange-400 mb-1">SURVEYED</p>
                    <p className="text-white text-xs sm:text-sm font-medium">Check the asbestos register</p>
                  </div>
                  {/* Surveyed NO */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                    <p className="text-xs font-bold text-red-400 mb-1">NOT SURVEYED</p>
                    <p className="text-white text-xs sm:text-sm font-medium">PRESUME asbestos until surveyed</p>
                  </div>
                </div>
              </div>

              {/* Register Outcomes */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div />
                <div className="space-y-2">
                  <p className="text-xs text-orange-400 font-medium text-center">Register Outcomes:</p>
                  <div className="grid gap-2">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2.5">
                      <p className="text-xs text-white"><strong className="text-red-400">Listed as ACM</strong> &rarr; Follow management plan controls</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-2.5">
                      <p className="text-xs text-white"><strong className="text-green-400">Listed as non-asbestos</strong> &rarr; Proceed with caution &mdash; report if different from description</p>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2.5">
                      <p className="text-xs text-white"><strong className="text-red-400">Not listed</strong> &rarr; STOP &mdash; may have been missed. Presume asbestos.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Options for Not Surveyed */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div />
                <div className="space-y-2">
                  <p className="text-xs text-orange-400 font-medium text-center">If Not Surveyed &mdash; Your Options:</p>
                  <div className="grid gap-2">
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-2.5">
                      <p className="text-xs text-white"><strong className="text-orange-400">Option 1:</strong> Presume and manage accordingly</p>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-2.5">
                      <p className="text-xs text-white"><strong className="text-orange-400">Option 2:</strong> Commission survey/sampling by competent person</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Who Can Sample? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">03</span>
            Who Can Sample?
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Sampling of suspected asbestos-containing materials must be carried out by a
                <strong> competent person</strong>. In this context, competence means the person must be
                <strong> trained, experienced, properly equipped, and insured</strong> to carry out the work
                safely without putting themselves or others at risk.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">Competence Requirements for Sampling</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Qualification:</strong> BOHS P402 (Building Surveys and Bulk Sampling for Asbestos) or equivalent &mdash; the recognised industry standard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Organisation:</strong> Typically a surveyor from a UKAS-accredited organisation, providing assurance of quality and competence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">RPE:</strong> Minimum FFP3 disposable respirator (face-fit tested) must be worn during sampling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">PPE:</strong> Disposable coveralls (Type 5/6), gloves, and overshoes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Technique:</strong> Sampling must minimise fibre release &mdash; wet methods, controlled techniques, and minimal disturbance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Insurance:</strong> Professional indemnity and public liability insurance must be in place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Chain of custody:</strong> Must be maintained from the moment of sampling through to laboratory analysis and reporting</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Never Sample It Yourself</p>
                </div>
                <p className="text-sm text-white/80">
                  As an electrician or tradesperson, you must <strong>NEVER attempt to take your own
                  samples</strong> of suspected asbestos materials. Breaking, scraping, or drilling into
                  an ACM to take a sample without proper controls and equipment can release thousands of
                  microscopic fibres into the air. If you suspect a material contains asbestos,
                  <strong> stop work, leave the area, and report it</strong> to your supervisor or the
                  dutyholder so that a competent person can be appointed to investigate.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Polarised Light Microscopy (PLM) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">04</span>
            Polarised Light Microscopy (PLM)
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Polarised Light Microscopy (PLM)</strong> is the standard analytical method used
                to identify asbestos in bulk samples. When a sample of suspected material arrives at the
                laboratory, PLM is the technique used to determine whether asbestos fibres are present
                and, if so, which type(s).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">How PLM Works</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>Uses <strong className="text-white">polarised light</strong> passed through the sample to identify asbestos fibres by their unique optical properties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>Properties examined include: <strong className="text-white">colour, refractive index, birefringence, and extinction angle</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>Can identify <strong className="text-white">all six regulated types of asbestos</strong> &mdash; chrysotile (white), amosite (brown), crocidolite (blue), tremolite, actinolite, and anthophyllite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>Determines both <strong className="text-white">whether asbestos is present</strong> and <strong className="text-white">which type(s)</strong></span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">Laboratory &amp; Cost Details</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>Analysis must be carried out by a <strong className="text-white">UKAS-accredited laboratory</strong> (accredited to ISO 17025)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>The analytical procedures are set out in <strong className="text-white">HSG248 &ldquo;Asbestos: The analysts&rsquo; guide&rdquo;</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Turnaround time:</strong> Typically 2&ndash;5 working days (rush/priority service available at extra cost)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Cost:</strong> Approximately &pound;20&ndash;&pound;40 per sample (varies by laboratory and urgency)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">Key Point:</strong> PLM analysis of bulk
                  samples tells you <strong>what the material is made of</strong>. It does NOT tell you
                  whether fibres are being released into the air. For that, you need air monitoring &mdash;
                  a different process covered in the next section.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Bulk Sampling vs Air Monitoring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">05</span>
            Bulk Sampling vs Air Monitoring
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                It is important to understand the difference between <strong>bulk sampling</strong> and
                <strong> air monitoring</strong>, as they serve completely different purposes in asbestos
                management.
              </p>

              {/* Comparison Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Bulk Sampling Card */}
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500/30 to-orange-400/20 border-b border-orange-500/30 px-4 py-3">
                    <p className="text-orange-400 font-semibold text-base">Bulk Sampling</p>
                    <p className="text-white/60 text-xs">Material identification</p>
                  </div>
                  <div className="p-4 space-y-3 text-sm">
                    <div>
                      <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">What It Is</p>
                      <p className="text-white/80">Taking a physical sample of the material</p>
                    </div>
                    <div>
                      <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">Purpose</p>
                      <p className="text-white/80">Determines if a material <strong className="text-white">contains</strong> asbestos</p>
                    </div>
                    <div>
                      <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">Analysis Method</p>
                      <p className="text-white/80">Polarised Light Microscopy (PLM)</p>
                    </div>
                    <div>
                      <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">What It Tells You</p>
                      <p className="text-white/80">Whether asbestos is present and which type(s)</p>
                    </div>
                    <div>
                      <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">When Used</p>
                      <p className="text-white/80">During surveys, before work on suspect materials</p>
                    </div>
                  </div>
                </div>

                {/* Air Monitoring Card */}
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500/30 to-red-500/20 border-b border-orange-500/30 px-4 py-3">
                    <p className="text-orange-400 font-semibold text-base">Air Monitoring</p>
                    <p className="text-white/60 text-xs">Fibre concentration measurement</p>
                  </div>
                  <div className="p-4 space-y-3 text-sm">
                    <div>
                      <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">What It Is</p>
                      <p className="text-white/80">Measuring airborne asbestos fibre concentration</p>
                    </div>
                    <div>
                      <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">Purpose</p>
                      <p className="text-white/80">Determines if fibres are being <strong className="text-white">released into the air</strong></p>
                    </div>
                    <div>
                      <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">Analysis Method</p>
                      <p className="text-white/80">Phase Contrast Microscopy (PCM) &mdash; counts fibres but cannot identify type</p>
                    </div>
                    <div>
                      <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">What It Tells You</p>
                      <p className="text-white/80">Whether fibre levels are below the control limit</p>
                    </div>
                    <div>
                      <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wide mb-1">When Used</p>
                      <p className="text-white/80">During and after asbestos removal work; 4-stage clearance</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">Transmission Electron Microscopy (TEM)</p>
                <p className="text-sm text-white/80">
                  <strong className="text-white">TEM</strong> is a more advanced and expensive technique
                  that can identify the type of asbestos fibre in air samples &mdash; something PCM
                  cannot do. TEM is used when fibre type identification is required in air monitoring,
                  but it is not routinely used due to the higher cost and longer turnaround time.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">4-Stage Clearance Procedure</p>
                <p className="text-sm text-white/80 mb-3">
                  After <strong className="text-white">licensed asbestos removal work</strong>, a formal
                  4-stage clearance procedure must be completed before the area can be reoccupied:
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">1</span>
                    <p><strong className="text-white">Preliminary check</strong> &mdash; visual inspection to confirm all visible ACMs have been removed</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">2</span>
                    <p><strong className="text-white">Visual inspection</strong> &mdash; thorough visual check by the analyst to confirm the area is clean and free of debris</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">3</span>
                    <p><strong className="text-white">Air monitoring</strong> &mdash; air samples taken and analysed to confirm fibre levels are below the clearance indicator (0.01 fibres/cm&sup3;)</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">4</span>
                    <p><strong className="text-white">Site clearance certificate</strong> &mdash; certificate of reoccupation issued confirming the area is safe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Sampling Procedure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">06</span>
            Sampling Procedure
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When a competent person carries out sampling, they must follow a strict procedure designed
                to <strong>minimise fibre release</strong> and maintain the integrity of the sample for
                laboratory analysis. The following steps represent the standard sampling procedure:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">Step-by-Step Sampling Procedure</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-white font-medium">Risk Assess the Sampling Activity</p>
                      <p>Consider the type of material, its condition, the location, and who else may be in the area. Ensure appropriate controls are in place before sampling begins.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-white font-medium">Don Appropriate RPE and PPE</p>
                      <p>Minimum FFP3 disposable respirator (face-fit tested) and disposable coveralls. Gloves and overshoes should also be worn.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-white font-medium">Dampen the Material</p>
                      <p>Wet the material before sampling to suppress fibre release. Use a plant spray or similar to apply water gently without disturbing the material excessively.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-white font-medium">Take a Representative Sample</p>
                      <p>Remove a small piece of the material, typically 2&ndash;3 cm&sup2;. The sample must be representative of the material being tested.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="text-white font-medium">Seal and Contain the Sample</p>
                      <p>Place the sample in a sealed, labelled container immediately. Do not leave samples loose or uncontained.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">6</span>
                    <div>
                      <p className="text-white font-medium">Seal and Label the Sampling Point</p>
                      <p>The hole or mark left by sampling must be sealed to prevent any ongoing fibre release. Label the sampling point for identification.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">7</span>
                    <div>
                      <p className="text-white font-medium">Clean the Sampling Area</p>
                      <p>Wipe down the immediate area around the sampling point to remove any debris or dust generated during sampling.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">8</span>
                    <div>
                      <p className="text-white font-medium">Double-Bag the Sample</p>
                      <p>Place the sealed container inside a second sealed bag for transport. This double-containment prevents cross-contamination.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">9</span>
                    <div>
                      <p className="text-white font-medium">Complete the Chain of Custody Form</p>
                      <p>Record the sample location, date, time, sampler details, and unique sample reference. This document tracks the sample from collection to laboratory.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">10</span>
                    <div>
                      <p className="text-white font-medium">Send to UKAS-Accredited Laboratory</p>
                      <p>The sample must be sent to a laboratory accredited to ISO 17025 for PLM analysis. Maintain records of all sampling activities.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">Why This Matters to Electricians:</strong> You will
                  never be expected to carry out sampling yourself. However, understanding the procedure
                  helps you recognise when sampling is being done properly and when it is not. If you
                  see someone taking samples without RPE, without dampening the material, or without
                  proper containment, this should raise serious concerns &mdash; report it to your
                  supervisor immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Interpreting Results */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">07</span>
            Interpreting Results
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When laboratory results are returned, they must be properly interpreted and acted upon.
                Understanding what the results mean &mdash; and, crucially, what they do
                <strong> not</strong> mean &mdash; is essential for effective asbestos management.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">Common Result Types &amp; What They Mean</p>
                <div className="space-y-3">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-red-400 mb-1">&ldquo;Asbestos detected &mdash; chrysotile&rdquo;</p>
                    <p className="text-xs sm:text-sm text-white/80">
                      The material contains <strong className="text-white">white asbestos (chrysotile)</strong>.
                      It must be managed in accordance with the management plan. Work on this material requires
                      appropriate precautions and may require a licensed contractor depending on the type and
                      scope of work.
                    </p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-red-400 mb-1">&ldquo;Asbestos detected &mdash; amosite&rdquo; or &ldquo;crocidolite&rdquo;</p>
                    <p className="text-xs sm:text-sm text-white/80">
                      The material contains <strong className="text-white">brown asbestos (amosite) or blue asbestos
                      (crocidolite)</strong> &mdash; these are amphibole fibres and are considered higher risk
                      than chrysotile. Stricter controls are required. Most work involving these fibre types
                      will require a licensed asbestos removal contractor.
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-green-400 mb-1">&ldquo;No asbestos detected&rdquo;</p>
                    <p className="text-xs sm:text-sm text-white/80">
                      The specific sample taken does <strong className="text-white">not contain asbestos</strong>.
                      However, this result only applies to the specific sample &mdash; it does NOT confirm
                      that the entire area, room, or building is asbestos-free. Other materials, different
                      layers, or patchwork repairs may still contain asbestos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">What to Do with Results</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Record in the asbestos register</strong> &mdash; all results, whether positive or negative, must be recorded and the register updated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Update the management plan</strong> &mdash; if asbestos is confirmed, the management plan must be updated to reflect the type, location, and required controls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Communicate the results</strong> &mdash; inform all relevant parties, including maintenance staff, contractors, and building occupants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-white">Retain laboratory certificates</strong> &mdash; keep all analytical certificates as part of the asbestos management records</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Limitation</p>
                </div>
                <p className="text-sm text-white/80">
                  <strong>One negative result does not mean the entire area is asbestos-free.</strong> Materials
                  can vary within the same building, room, or even the same wall. Different batches of
                  artex, different layers of floor tiles, or patchwork repairs using different materials
                  can mean that one sample is negative whilst another from the same general area is
                  positive. If in doubt, presume asbestos until further sampling confirms otherwise.
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
            <Link to="../asbestos-awareness-module-3-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: ACMs in Electrical Installations
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-4-section-1">
              Next: Categories of Asbestos Work
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
