import { ArrowLeft, Shield, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "rpe-face-fit-mandatory",
    question:
      "When is face-fit testing MANDATORY for respiratory protective equipment?",
    options: [
      "For all tight-fitting RPE including FFP3, half-mask, and full-face respirators",
      "Only for full-face respirators used in licensed work",
      "Only when the worker requests it",
      "Only when working with crocidolite (blue asbestos)",
    ],
    correctIndex: 0,
    explanation:
      "Face-fit testing is mandatory for ALL tight-fitting RPE, including FFP3 disposable masks, half-mask respirators, and full-face respirators. Without a successful face-fit test, the RPE cannot provide the stated level of protection because air (and asbestos fibres) can leak around the seal. Workers who cannot achieve a satisfactory face-fit must use an alternative RPE model or switch to a loose-fitting powered air device.",
  },
  {
    id: "rpe-last-removed",
    question:
      "During the decontamination sequence, which item of protective equipment is removed LAST?",
    options: [
      "RPE (respiratory protective equipment)",
      "Disposable coverall",
      "Boot covers",
      "Outer gloves",
    ],
    correctIndex: 0,
    explanation:
      "RPE is always the LAST item of protective equipment to be removed during decontamination. The coverall, boot covers, and gloves are all removed first because they may carry asbestos fibres on their outer surfaces. Removing the RPE last ensures that your lungs remain protected while contaminated PPE is being stripped away. Removing your mask before your suit is one of the most dangerous and common mistakes in asbestos work.",
  },
  {
    id: "facial-hair-rpe",
    question:
      "What type of RPE must be used by a worker who has a beard?",
    options: [
      "A powered air-purifying respirator (PAPR) with a loose-fitting hood or helmet",
      "An FFP3 disposable mask with the straps tightened extra firmly",
      "A half-mask respirator with a larger face seal",
      "No RPE is needed if the beard is short and neatly trimmed",
    ],
    correctIndex: 0,
    explanation:
      "Workers with facial hair in the seal area cannot use any tight-fitting RPE (FFP3, half-mask, or full-face) because the hair prevents an airtight seal against the face. They must use a loose-fitting powered air-purifying respirator (PAPR) with a hood or helmet, or an air-fed hood/helmet. There is no acceptable way to make tight-fitting RPE work with a beard, regardless of beard length or how tightly the straps are adjusted.",
  },
];

const faqs = [
  {
    question:
      "Can I reuse an FFP3 disposable mask if it still looks clean?",
    answer:
      "No. FFP3 disposable masks are single-use items and must be disposed of as asbestos waste after each use, regardless of their visible condition. The filter material becomes loaded with fibres during use, even if you cannot see them. Reusing a disposable FFP3 mask risks re-inhaling trapped fibres when you put the mask back on, and the elastic straps and nose clip lose their effectiveness after the first use. Each time you enter a work area, you must use a brand-new FFP3 mask. Used masks must be placed in a labelled asbestos waste bag.",
  },
  {
    question:
      "What is the difference between qualitative and quantitative face-fit testing?",
    answer:
      "Qualitative face-fit testing (the taste test) uses a bitter or sweet aerosol (bitrex or saccharin) sprayed into a hood while the wearer performs a series of exercises. If the wearer can taste the aerosol, the RPE has failed the test. It is a simple pass/fail method suitable for half-masks and FFP3 disposable respirators. Quantitative face-fit testing uses a machine (typically a PortaCount) that measures the actual concentration of particles inside and outside the mask to calculate a fit factor. It is more accurate, provides a numerical result, and is required for full-face respirators. Quantitative testing is generally considered more reliable because it does not depend on the wearer's subjective sense of taste.",
  },
  {
    question:
      "Why are Type 5 coveralls required instead of ordinary work overalls?",
    answer:
      "Type 5 Category III disposable coveralls are specifically designed and tested for protection against airborne solid particles, including asbestos fibres. They are made from non-woven materials that prevent fibres from passing through the fabric. Ordinary work overalls, boiler suits, or cotton coveralls have a much more open weave that allows microscopic asbestos fibres to pass straight through to your clothing and skin underneath. Type 5 coveralls also feature elasticated hoods, wrists, and ankles to minimise entry points for fibres. For licensed asbestos work, Type 5 is the minimum standard; for non-licensed work, Type 5/6 is acceptable.",
  },
  {
    question:
      "What should I do if my RPE fails during a face-fit test?",
    answer:
      "If your RPE fails a face-fit test, it means that particular mask in that particular size does not seal properly against your face. You should try a different size of the same model first (e.g., switch from medium to small or large). If no size achieves a pass, try a completely different model or brand of RPE, as different manufacturers use different face seal shapes. If you cannot achieve a pass with any tight-fitting RPE, you must use a loose-fitting powered air-purifying respirator (PAPR) or air-fed hood instead. Under no circumstances should you use RPE that has failed a face-fit test for asbestos work. Records of all face-fit tests, including failures, must be kept.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What does APF stand for in relation to respiratory protective equipment?",
    options: [
      "Asbestos Protection Factor",
      "Assigned Protection Factor",
      "Approved Performance Factor",
      "Air Purification Factor",
    ],
    correctAnswer: 1,
    explanation:
      "APF stands for Assigned Protection Factor. It is a number that indicates how much protection the RPE provides compared to the ambient (surrounding) concentration. For example, an APF of 20 means the RPE reduces exposure by a factor of 20 — so the wearer breathes air that is 20 times cleaner than the air outside the mask.",
  },
  {
    id: 2,
    question: "What is the Assigned Protection Factor (APF) of an FFP3 disposable mask?",
    options: ["APF 4", "APF 10", "APF 20", "APF 40"],
    correctAnswer: 2,
    explanation:
      "An FFP3 disposable mask has an APF of 20, meaning it reduces the wearer's exposure to airborne particles by a factor of 20. This level of protection is suitable for non-licensed asbestos work and some notifiable non-licensed work (NNLW), but is not sufficient for licensed work at higher fibre concentrations.",
  },
  {
    id: 3,
    question:
      "Which type of RPE does NOT require a face-fit test?",
    options: [
      "FFP3 disposable mask",
      "Half-mask respirator with P3 filters",
      "Loose-fitting powered air-purifying respirator (PAPR)",
      "Full-face mask with P3 filters",
    ],
    correctAnswer: 2,
    explanation:
      "A loose-fitting powered air-purifying respirator (PAPR) does not require a face-fit test because it does not rely on a seal against the face to provide protection. Instead, a battery-powered fan draws air through a P3 filter and delivers clean air inside a loose-fitting hood or helmet, maintaining positive pressure that prevents contaminated air from entering. This makes PAPRs suitable for workers with facial hair.",
  },
  {
    id: 4,
    question:
      "What type of disposable coverall is required for licensed asbestos work?",
    options: [
      "Type 1 Category I",
      "Type 3 Category II",
      "Type 5 Category III",
      "Any disposable coverall is acceptable",
    ],
    correctAnswer: 2,
    explanation:
      "Type 5 Category III disposable coveralls are required for licensed asbestos work. Type 5 means they are tested and certified for protection against airborne solid particles. Category III indicates the highest level of PPE risk category under the PPE Regulation. For non-licensed work, Type 5/6 coveralls may be acceptable, but for licensed work, the minimum standard is Type 5.",
  },
  {
    id: 5,
    question:
      "In the 7-step decontamination sequence, what is the correct order for removing PPE?",
    options: [
      "Remove RPE first, then coverall, then gloves",
      "Remove coverall first (inside-out from hood), then RPE, then inner gloves",
      "Remove gloves first, then RPE, then coverall",
      "Remove boot covers, then RPE, then coverall, then gloves",
    ],
    correctAnswer: 1,
    explanation:
      "The correct decontamination sequence requires removing the coverall before the RPE. The coverall is peeled off inside-out starting from the hood, which traps fibres inside. The RPE is the LAST item of protection removed, ensuring lungs remain protected while contaminated clothing is being stripped away. Inner gloves are removed after the RPE.",
  },
  {
    id: 6,
    question:
      "When must a face-fit test be repeated?",
    options: [
      "Only once per year, regardless of circumstances",
      "When the RPE model changes, when facial features change significantly, or when a different size is used",
      "Only when the employer requests it",
      "Every time before entering a work area",
    ],
    correctAnswer: 1,
    explanation:
      "A face-fit test must be repeated whenever the RPE model or size changes, when the wearer's facial features change significantly (due to weight gain or loss, dental work, scarring, or other changes), or when a different type of tight-fitting RPE is selected. The test result is specific to the combination of that wearer and that particular RPE model and size.",
  },
  {
    id: 7,
    question:
      "Which of the following is a common and dangerous PPE/RPE mistake in asbestos work?",
    options: [
      "Wearing disposable coveralls with elasticated wrists",
      "Double-gloving with nitrile gloves",
      "Removing RPE before the decontamination process is complete",
      "Using a full-face mask for licensed work",
    ],
    correctAnswer: 2,
    explanation:
      "Removing RPE before the decontamination process is complete is one of the most dangerous and common mistakes in asbestos work. While the coverall and other PPE are being removed, asbestos fibres can become airborne. If the RPE has already been removed, the worker will inhale these fibres. RPE must always be the LAST item removed during decontamination.",
  },
  {
    id: 8,
    question:
      "What type of RPE is most appropriate for licensed asbestos removal work inside a full enclosure?",
    options: [
      "FFP3 disposable mask (APF 20)",
      "Half-mask with P3 filters (APF 20)",
      "Full-face mask with P3 filters (APF 40)",
      "Powered air-purifying respirator (PAPR) or air-fed respirator (APF 40+)",
    ],
    correctAnswer: 3,
    explanation:
      "For licensed asbestos removal work inside a full enclosure, a PAPR or air-fed respirator is the most appropriate choice. Enclosure work involves the highest fibre concentrations and extended working periods. PAPRs and air-fed devices provide APF 40+, are more comfortable for prolonged wear, and do not rely on the wearer's breathing effort. Air-fed devices supply clean air from an external source, which is particularly important inside enclosures where the air is heavily contaminated.",
  },
];

export default function AsbestosModule4Section3() {
  useSEO({
    title:
      "RPE & PPE Selection | Asbestos Awareness Module 4.3",
    description:
      "Respiratory protective equipment (RPE) and personal protective equipment (PPE) for asbestos work: selection, face-fit testing, Assigned Protection Factors, decontamination sequence, maintenance, and common mistakes.",
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
            <Link to="../asbestos-awareness-module-4">
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
            <Shield className="h-7 w-7 text-orange-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3 mx-auto">
            <span className="text-orange-500 text-xs font-semibold">
              MODULE 4 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            RPE &amp; PPE Selection
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Choosing the right respiratory protective equipment and personal
            protective equipment for asbestos work &mdash; types, protection
            factors, face-fit testing, decontamination, and common mistakes
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>RPE:</strong> Last line of defence &mdash; engineering
                controls come first
              </li>
              <li>
                <strong>Face-fit:</strong> Mandatory for all tight-fitting RPE
              </li>
              <li>
                <strong>PPE:</strong> Type 5 coveralls, gloves, boot covers,
                eye protection
              </li>
              <li>
                <strong>Decontamination:</strong> RPE is always the LAST item
                removed
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
            <p className="text-orange-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Never:</strong> Wear tight-fitting RPE with facial hair
              </li>
              <li>
                <strong>Always:</strong> Check RPE is face-fit tested for you
              </li>
              <li>
                <strong>Never:</strong> Reuse disposable FFP3 masks
              </li>
              <li>
                <strong>Always:</strong> Follow the 7-step decontamination
                sequence
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
              "Explain why RPE is the last line of defence and when it is required",
              "Describe the main types of RPE used in asbestos work and their Assigned Protection Factors",
              "State when face-fit testing is mandatory and describe the two testing methods",
              "List the PPE required for asbestos work and explain coverall types",
              "Demonstrate the correct 7-step decontamination sequence",
              "Identify common PPE and RPE mistakes that lead to asbestos exposure",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-orange-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Respiratory Protective Equipment (RPE) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">01</span>
            Respiratory Protective Equipment (RPE)
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Respiratory protective equipment (RPE) is designed to protect
                the wearer from inhaling airborne hazardous substances,
                including asbestos fibres. However, RPE is always the{" "}
                <strong>last line of defence</strong> in the hierarchy of
                controls. Engineering controls &mdash; such as enclosures, local
                exhaust ventilation, wet methods, and restricting access &mdash;
                must always be applied first to reduce fibre concentrations as
                far as reasonably practicable. RPE is then used to protect
                against the <strong>residual risk</strong> that remains after
                those controls are in place.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Principle
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  RPE is <strong className="text-white">never</strong> a
                  substitute for proper engineering controls. It is the last
                  line of defence, not the first. If you are relying solely on
                  an FFP3 mask with no other controls in place, the system of
                  work is inadequate. The hierarchy of controls must be followed
                  for every asbestos task.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key RPE Requirements for Asbestos Work
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Adequate and suitable:</strong>{" "}
                      The RPE must be appropriate for the task and provide the
                      required level of protection for the expected fibre
                      concentration
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Assigned Protection Factor (APF):
                      </strong>{" "}
                      Each type of RPE has an APF rating that indicates how much
                      it reduces exposure. The APF must be sufficient for the
                      task
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Face-fit testing:
                      </strong>{" "}
                      MANDATORY for all tight-fitting RPE (FFP3, half-mask,
                      full-face). Without a successful face-fit test, the RPE
                      cannot be relied upon
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Facial hair:</strong>{" "}
                      Workers with beards or stubble in the seal area{" "}
                      <strong className="text-red-400">cannot</strong> use
                      tight-fitting RPE &mdash; they must use powered air or
                      air-fed devices with loose-fitting hoods
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Maintenance and storage:
                      </strong>{" "}
                      Reusable RPE must be properly cleaned, maintained,
                      inspected, and stored after each use
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The Control of Asbestos Regulations 2012 (CAR 2012) and the HSE
                Approved Code of Practice (L143) set out the requirements for
                RPE selection and use. Employers must ensure that RPE is
                provided free of charge, that workers are trained in its correct
                use, and that face-fit testing is carried out and recorded.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: RPE Types for Asbestos Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">02</span>
            RPE Types for Asbestos Work
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Several types of RPE are used in asbestos work, each with a
                different Assigned Protection Factor (APF) and suitability for
                different work categories. Understanding which RPE is appropriate
                for each task is essential for adequate protection.
              </p>

              {/* FFP3 Disposable */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-1">
                  FFP3 Disposable Mask
                </p>
                <p className="text-xs text-orange-400 font-semibold mb-3">
                  APF 20 &middot; Single-use &middot; Face-fit required
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Single-use disposable filtering facepiece with a P3-rated
                      filter built into the mask body
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Suitable for non-licensed asbestos work and some NNLW
                      (notifiable non-licensed work)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Must be face-fit tested for each individual wearer
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-red-300">
                        Cannot be reused
                      </strong>{" "}
                      &mdash; must be disposed of as asbestos waste after each
                      use
                    </span>
                  </li>
                </ul>
              </div>

              {/* Half-mask */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-1">
                  Half-Mask Respirator with P3 Filters
                </p>
                <p className="text-xs text-orange-400 font-semibold mb-3">
                  APF 20 &middot; Reusable body &middot; Face-fit required
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Reusable rubber or silicone facepiece with replaceable P3
                      particulate filters
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Suitable for non-licensed work and NNLW
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Filter cartridges must be replaced according to
                      manufacturer&rsquo;s instructions and after each work
                      session
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Must be face-fit tested, cleaned, and inspected before
                      each use
                    </span>
                  </li>
                </ul>
              </div>

              {/* Full-face */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-1">
                  Full-Face Mask with P3 Filters
                </p>
                <p className="text-xs text-orange-400 font-semibold mb-3">
                  APF 40 &middot; Reusable &middot; Face-fit required
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Full-face respirator covering eyes, nose, and mouth with
                      replaceable P3 filters
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Provides eye protection as well as respiratory protection
                      &mdash; no separate goggles required
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Suitable for all work categories including some licensed
                      work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Must be face-fit tested &mdash; quantitative testing
                      (PortaCount) is required for full-face masks
                    </span>
                  </li>
                </ul>
              </div>

              {/* PAPR */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-1">
                  Powered Air-Purifying Respirator (PAPR)
                </p>
                <p className="text-xs text-orange-400 font-semibold mb-3">
                  APF 40 &middot; Battery-powered &middot; No face-fit needed
                  (loose-fitting versions)
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Battery-powered fan draws air through a P3 filter and
                      delivers clean air inside a loose-fitting hood or helmet
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      No face-fit test needed for loose-fitting versions
                      &mdash; positive pressure inside the hood prevents
                      contaminated air from entering
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Suitable for workers with facial hair
                      </strong>{" "}
                      who cannot achieve a face-fit with tight-fitting RPE
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      More comfortable for extended wear &mdash; reduced
                      breathing resistance compared to non-powered RPE
                    </span>
                  </li>
                </ul>
              </div>

              {/* Air-fed */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-1">
                  Air-Fed Respirator (Compressed Air Line)
                </p>
                <p className="text-xs text-orange-400 font-semibold mb-3">
                  APF 40+ &middot; External air supply &middot; Licensed work
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Supplied clean, breathable air from an external
                      compressor or cylinder via a hose
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Used in full enclosures for licensed asbestos removal
                      work where fibre concentrations are highest
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Provides the highest level of respiratory protection
                      available for asbestos work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Air supply must meet breathing air quality standards
                      (BS EN 12021)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* RPE Selection Guide Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">
              &mdash;
            </span>
            RPE Selection Guide
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-orange-500/20 border-b border-orange-500/30 px-4 py-3">
              <p className="text-sm font-semibold text-orange-400">
                Matching RPE to Work Category
              </p>
            </div>

            {/* Row 1: Non-Licensed Work */}
            <div className="p-4 border-b border-white/5">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <div className="flex items-center gap-2 min-w-[180px]">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-400 font-bold text-[11px]">
                    NON-LICENSED
                  </span>
                </div>
                <div className="flex-1 grid sm:grid-cols-2 gap-2">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white">
                      FFP3 Disposable
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-white/60">APF 20</span>
                      <span className="text-xs text-amber-400">
                        Face-fit: Yes
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white">
                      Half-Mask P3
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-white/60">APF 20</span>
                      <span className="text-xs text-amber-400">
                        Face-fit: Yes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: NNLW */}
            <div className="p-4 border-b border-white/5">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <div className="flex items-center gap-2 min-w-[180px]">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-400 font-bold text-[11px]">
                    NNLW
                  </span>
                </div>
                <div className="flex-1 grid sm:grid-cols-2 gap-2">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white">
                      Half-Mask P3
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-white/60">APF 20</span>
                      <span className="text-xs text-amber-400">
                        Face-fit: Yes
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white">
                      Full-Face P3
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-white/60">APF 40</span>
                      <span className="text-xs text-amber-400">
                        Face-fit: Yes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Licensed (lower risk) */}
            <div className="p-4 border-b border-white/5">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <div className="flex items-center gap-2 min-w-[180px]">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 border border-red-400/30 text-red-400 font-bold text-[11px]">
                    LICENSED (lower)
                  </span>
                </div>
                <div className="flex-1 grid sm:grid-cols-2 gap-2">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white">
                      Full-Face P3
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-white/60">APF 40</span>
                      <span className="text-xs text-amber-400">
                        Face-fit: Yes
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white">
                      PAPR
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-white/60">APF 40</span>
                      <span className="text-xs text-green-400">
                        Face-fit: No*
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4: Licensed (enclosure) */}
            <div className="p-4 border-b border-white/5">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <div className="flex items-center gap-2 min-w-[180px]">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 border border-red-400/30 text-red-400 font-bold text-[11px]">
                    LICENSED (enclosure)
                  </span>
                </div>
                <div className="flex-1 grid sm:grid-cols-2 gap-2">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white">
                      PAPR
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-white/60">APF 40</span>
                      <span className="text-xs text-green-400">
                        Face-fit: No*
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white">
                      Air-Fed
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-white/60">APF 40+</span>
                      <span className="text-xs text-green-400">
                        Face-fit: No*
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-white/5">
              <p className="text-xs text-white/50">
                * Loose-fitting hood/helmet versions do not require face-fit
                testing. Tight-fitting versions of PAPR and air-fed devices
                still require face-fit testing.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Face-Fit Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">03</span>
            Face-Fit Testing
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Face-fit testing is{" "}
                <strong>mandatory for all tight-fitting RPE</strong> used in
                asbestos work. This includes FFP3 disposable masks, half-mask
                respirators, and full-face respirators. The test confirms that
                the specific RPE model and size creates an adequate seal against
                the wearer&rsquo;s face, preventing contaminated air from
                leaking past the face seal.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Two Testing Methods
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      QUAL
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Qualitative (Taste Test)
                      </p>
                      <p>
                        A bitter (bitrex) or sweet (saccharin) aerosol is
                        sprayed into a hood placed over the wearer&rsquo;s head
                        while they perform a series of exercises (talking,
                        bending, turning). If the wearer can taste the aerosol,
                        the RPE has{" "}
                        <strong className="text-red-300">failed</strong>.
                        Simple pass/fail result. Suitable for FFP3 and
                        half-mask respirators.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">
                      QUANT
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Quantitative (Machine-Measured)
                      </p>
                      <p>
                        A machine (typically a PortaCount) measures particle
                        concentrations inside and outside the mask to calculate
                        a numerical fit factor. More accurate and reliable than
                        qualitative testing. <strong className="text-white">Required for
                        full-face masks</strong>, as the higher APF requires a
                        higher level of testing confidence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-500 mb-3">
                  When Must Face-Fit Testing Be Repeated?
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      When the RPE model or size changes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      When the wearer&rsquo;s facial features change
                      significantly (weight gain or loss, dental work, scarring,
                      or other facial changes)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      When a different type of tight-fitting RPE is selected
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Face-Fit Testing Rules
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Records must be kept</strong>{" "}
                      of all face-fit tests, including the wearer&rsquo;s name,
                      RPE make and model, date, and test result
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      A <strong className="text-red-300">failed</strong>{" "}
                      face-fit test means that RPE model and size cannot be used
                      by that wearer &mdash; try a different size or a different
                      model
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Workers must be{" "}
                      <strong className="text-white">
                        clean-shaven in the seal area
                      </strong>{" "}
                      when wearing tight-fitting RPE &mdash; even a day&rsquo;s
                      stubble can compromise the seal
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Facial Hair and Tight-Fitting RPE
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Workers with beards, stubble, sideburns, or any facial hair
                  in the seal area of the mask{" "}
                  <strong className="text-white">
                    cannot use tight-fitting RPE
                  </strong>
                  . Facial hair prevents the mask from forming an airtight seal
                  against the face, allowing contaminated air to bypass the
                  filter. These workers must use a loose-fitting powered air
                  (PAPR) or air-fed device with a hood or helmet instead. There
                  is no exception to this rule.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: PPE for Asbestos Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">04</span>
            PPE for Asbestos Work
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In addition to RPE, asbestos work requires a full set of
                personal protective equipment (PPE) designed to prevent fibres
                from contaminating your skin, hair, and clothing. All PPE used
                in asbestos work must be{" "}
                <strong>disposed of as asbestos waste</strong> after use &mdash;
                it cannot be laundered or reused (with the exception of
                dedicated boots that can be decontaminated).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Required PPE
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Disposable coveralls:
                      </strong>{" "}
                      Type 5 Category III for licensed work, Type 5/6 for
                      non-licensed work. Must be full-body with hood,
                      elasticated wrists and ankles, and front zip
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Boot covers</strong> or
                      dedicated boots that can be fully decontaminated (wiped
                      down or washed)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Gloves:</strong>{" "}
                      Single-use latex or nitrile gloves. Double-gloving is
                      recommended for licensed work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Eye protection:</strong>{" "}
                      Safety goggles if not using full-face RPE (full-face masks
                      and PAPR hoods provide built-in eye protection)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-500 mb-3">
                  Coverall Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Must have a <strong className="text-white">hood</strong>{" "}
                      to protect hair from fibre contamination
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Elasticated wrists and ankles
                      </strong>{" "}
                      to minimise entry points for fibres
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Front zip</strong> with a
                      self-adhesive flap or storm flap to prevent fibre entry
                      through the zip
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      Made from non-woven material that blocks the passage of
                      microscopic fibres
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Clothing Under Coveralls
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Do <strong className="text-white">NOT</strong> wear work
                  clothes under disposable coveralls if possible. Asbestos
                  fibres can transfer from the coverall to the clothing
                  underneath, particularly if the coverall is damaged or if
                  fibres enter through the zip or cuffs during work. If you must
                  wear clothing underneath, it should be minimal and must be
                  treated as potentially contaminated. Contaminated work clothes
                  must never be taken home &mdash; this is a major cause of{" "}
                  <strong className="text-white">secondary exposure</strong> to
                  family members.
                </p>
              </div>

              <p>
                All used PPE must be placed in{" "}
                <strong>labelled asbestos waste bags</strong> (red-striped or
                marked with the asbestos warning label) and disposed of at a
                licensed hazardous waste facility. PPE must never be placed in
                general waste, taken home, or reused.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* 7-Step Decontamination Sequence Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">
              &mdash;
            </span>
            7-Step Decontamination Sequence
          </h2>

          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-orange-500/20 border-b border-orange-500/30 px-4 py-3">
              <p className="text-sm font-semibold text-orange-400">
                PPE Removal Order &mdash; Follow This Sequence Every Time
              </p>
            </div>

            <div className="p-4 sm:p-6 space-y-0">
              {/* Step 1 */}
              <div className="flex gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 border-2 border-orange-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-orange-400">1</span>
                  </div>
                  <div className="w-0.5 flex-1 bg-orange-500/20 my-1" />
                </div>
                <div className="pb-5">
                  <p className="text-sm font-medium text-white">
                    Damp-wipe the outside of the coverall
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    Removes loose surface fibres before you start undressing.
                    Use a damp cloth or wet wipes, working from top to bottom.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 border-2 border-orange-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-orange-400">2</span>
                  </div>
                  <div className="w-0.5 flex-1 bg-orange-500/20 my-1" />
                </div>
                <div className="pb-5">
                  <p className="text-sm font-medium text-white">
                    Remove boot covers
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    Roll down and remove boot covers carefully. Place directly
                    into the asbestos waste bag.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 border-2 border-orange-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-orange-400">3</span>
                  </div>
                  <div className="w-0.5 flex-1 bg-orange-500/20 my-1" />
                </div>
                <div className="pb-5">
                  <p className="text-sm font-medium text-white">
                    Remove outer gloves (if double-gloved)
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    Peel off the outer pair of gloves, turning them inside-out
                    as you remove them. Place in waste bag.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 border-2 border-orange-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-orange-400">4</span>
                  </div>
                  <div className="w-0.5 flex-1 bg-orange-500/20 my-1" />
                </div>
                <div className="pb-5">
                  <p className="text-sm font-medium text-white">
                    Remove coverall &mdash; peel off inside-out from the hood
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    Start by pulling the hood back and away from your head, then
                    peel the coverall down and off, rolling it inside-out. This
                    traps fibres on the inside. Place in waste bag.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 border-2 border-red-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-red-400">5</span>
                  </div>
                  <div className="w-0.5 flex-1 bg-orange-500/20 my-1" />
                </div>
                <div className="pb-5">
                  <p className="text-sm font-medium text-red-300">
                    Remove RPE &mdash; LAST item of protection removed
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    Only now remove your mask or respirator. For disposable RPE,
                    place in waste bag. For reusable RPE, clean and store
                    according to manufacturer&rsquo;s instructions.
                  </p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 border-2 border-orange-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-orange-400">6</span>
                  </div>
                  <div className="w-0.5 flex-1 bg-orange-500/20 my-1" />
                </div>
                <div className="pb-5">
                  <p className="text-sm font-medium text-white">
                    Remove inner gloves
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    Peel off the inner gloves, turning inside-out. Place in
                    waste bag.
                  </p>
                </div>
              </div>

              {/* Step 7 */}
              <div className="flex gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 border-2 border-orange-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-orange-400">7</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Bag all waste and seal
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    Seal the asbestos waste bag with tape or a cable tie. The
                    bag must be labelled with the asbestos warning and disposed
                    of at a licensed hazardous waste facility.
                  </p>
                </div>
              </div>
            </div>

            {/* Critical reminder */}
            <div className="mx-4 sm:mx-6 mb-4 sm:mb-6 bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <p className="text-sm font-medium text-red-400">
                  Critical Rule
                </p>
              </div>
              <p className="text-sm text-white/80">
                <strong className="text-white">
                  RPE is the LAST item removed &mdash; never remove your mask
                  before your suit.
                </strong>{" "}
                While the coverall and other PPE are being removed, fibres can
                become airborne. If your RPE has already been removed, you will
                inhale these fibres. This is one of the most common and
                dangerous mistakes in asbestos work.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: Equipment Maintenance and Storage */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">05</span>
            Equipment Maintenance and Storage
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Reusable RPE (half-mask and full-face respirators, PAPRs) must
                be properly maintained, cleaned, and stored to ensure it
                continues to provide the stated level of protection. Poorly
                maintained RPE can give a false sense of security &mdash; the
                wearer believes they are protected when in reality the equipment
                is compromised.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Maintenance Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Clean after each use:
                      </strong>{" "}
                      Reusable RPE must be thoroughly cleaned and disinfected
                      after every work session, following the
                      manufacturer&rsquo;s instructions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Replace P3 filters:
                      </strong>{" "}
                      Filter cartridges must be replaced according to the
                      manufacturer&rsquo;s schedule and after each asbestos work
                      session. Used filters are asbestos waste
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Store properly:
                      </strong>{" "}
                      RPE must be stored in a clean, dry place, away from
                      contamination, sunlight, and extreme temperatures.
                      Ideally in a sealed bag or container
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Inspect before each use:
                      </strong>{" "}
                      Check the facepiece, straps, valves, filters, and seals
                      for damage, wear, or deterioration before every use
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Remove damaged equipment:
                      </strong>{" "}
                      Any RPE that is damaged, has worn seals, cracked
                      facepieces, or defective valves must be taken out of
                      service immediately and replaced
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Keep records:
                      </strong>{" "}
                      Records of all maintenance, inspection, and filter
                      replacement must be kept. This provides an audit trail
                      demonstrating that RPE has been properly maintained
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">PAPR Batteries:</strong>{" "}
                  Powered air-purifying respirators rely on battery power to
                  drive the fan. Batteries must be fully charged before each use
                  and the fan must be checked for adequate airflow. A PAPR with
                  a flat or weak battery will not maintain positive pressure
                  inside the hood, reducing its protective performance to a
                  dangerous level.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Common PPE/RPE Mistakes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-orange-500/80 text-sm font-normal">06</span>
            Common PPE/RPE Mistakes
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding common mistakes helps you recognise and avoid
                them. Every one of these mistakes has resulted in unnecessary
                asbestos exposure on real job sites. Many are made by workers who
                believe they are protected when they are not.
              </p>

              <div className="space-y-3">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-red-300">
                        Removing RPE before decontamination is complete
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        The most dangerous mistake. Fibres become airborne
                        during PPE removal. If the mask is already off, you
                        inhale them.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-red-300">
                        Using RPE without face-fit testing
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        Without a face-fit test, contaminated air leaks past
                        the seal. The mask gives a false sense of security while
                        providing little actual protection.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-red-300">
                        Wearing tight-fitting RPE with facial hair
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        Even short stubble prevents an airtight seal. The RPE
                        protection factor is dramatically reduced, potentially
                        to almost zero.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-red-300">
                        Reusing disposable FFP3 masks
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        Disposable masks are single-use. The filter becomes
                        loaded with fibres, the elastic straps lose tension, and
                        putting the mask back on can dislodge trapped fibres
                        back into your breathing zone.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      5
                    </span>
                    <div>
                      <p className="text-sm font-medium text-red-300">
                        Not replacing P3 filters regularly
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        Overloaded filters restrict airflow and reduce
                        protection. Filters must be changed after each asbestos
                        work session and according to the manufacturer&rsquo;s
                        schedule.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      6
                    </span>
                    <div>
                      <p className="text-sm font-medium text-red-300">
                        Wearing contaminated work clothes under coveralls
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        Fibres can transfer from the coverall to clothing
                        underneath. Those clothes then carry fibres into your
                        car, your home, and onto your family.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      7
                    </span>
                    <div>
                      <p className="text-sm font-medium text-red-300">
                        Taking contaminated PPE home
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        A major cause of secondary exposure. Family members
                        &mdash; including children &mdash; can inhale fibres
                        from contaminated clothing and equipment brought into
                        the home.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      8
                    </span>
                    <div>
                      <p className="text-sm font-medium text-red-300">
                        Not decontaminating boots and tools
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        Boots and tools used in the work area can carry fibres
                        to clean areas. All equipment must be thoroughly
                        decontaminated (wiped, washed, or vacuumed with a
                        Type H HEPA vacuum) before leaving the work area.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-orange-500">Key Message:</strong>{" "}
                  Every one of these mistakes is avoidable. Proper training,
                  correct equipment selection, face-fit testing, and following
                  the decontamination sequence every single time are the
                  foundations of safe asbestos work. Cutting corners with PPE
                  and RPE is gambling with your health and the health of those
                  around you.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-4-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Risk Assessment &amp; Method Statements
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-orange-500 text-white hover:bg-orange-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../asbestos-awareness-module-4-section-4">
              Next: Controlled Work Techniques
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
