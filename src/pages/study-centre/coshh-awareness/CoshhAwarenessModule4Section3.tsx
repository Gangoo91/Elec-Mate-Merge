import {
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "coshh-rpe-last-resort",
    question:
      "Under the hierarchy of control, when should RPE be provided to workers handling hazardous substances?",
    options: [
      "As a first response whenever a hazardous substance is identified on site",
      "Only after elimination, substitution, engineering controls, and administrative controls have been applied and residual risk remains",
      "Whenever workers feel uncomfortable about chemical exposure",
      "Only when the substance has a workplace exposure limit (WEL)",
    ],
    correctIndex: 1,
    explanation:
      "COSHH Regulation 7 requires employers to follow the hierarchy of control. RPE and PPE sit at the bottom of the hierarchy and should only be used as a last resort, after elimination, substitution, engineering controls (e.g. LEV), and administrative controls have been applied. PPE supplements those higher-level controls to manage the residual risk that remains. It is never acceptable to skip the hierarchy and rely solely on RPE.",
  },
  {
    id: "coshh-glove-breakthrough",
    question:
      "What is 'breakthrough time' in relation to chemical-resistant gloves?",
    options: [
      "The length of time a glove can be stored before it expires",
      "The time taken for a chemical to permeate through the glove material to the inside surface",
      "The amount of time it takes for the glove to degrade visibly",
      "The maximum duration a worker may wear gloves before taking a break",
    ],
    correctIndex: 1,
    explanation:
      "Breakthrough time is the measured time it takes for a specific chemical to permeate (pass through) the glove material from the outer surface to the inner surface. It is determined by laboratory testing under EN 374 and varies depending on the glove material and the chemical involved. A glove with a 60-minute breakthrough time for acetone means the chemical will reach the inside of the glove after approximately 60 minutes of continuous contact. Workers must replace gloves well before the breakthrough time is reached.",
  },
  {
    id: "coshh-face-fit-legal",
    question:
      "Which statement about face-fit testing for RPE under COSHH is correct?",
    options: [
      "Face-fit testing is recommended but not legally required under COSHH",
      "Face-fit testing is only required for full-face respirators, not filtering facepieces",
      "Face-fit testing is a legal requirement for all tight-fitting RPE and must be repeated when the RPE model changes or the wearer's facial features change significantly",
      "Face-fit testing is only needed once during initial employment and never needs repeating",
    ],
    correctIndex: 2,
    explanation:
      "Under COSHH, employers have a legal duty to ensure that any tight-fitting RPE (including FFP2, FFP3, half-masks, and full-face masks) is face-fit tested for each individual wearer. This is not optional guidance; it is a legal requirement. The test must be repeated whenever a different RPE model or size is selected, whenever the wearer's facial features change significantly (e.g. weight change, dental work), and at regular intervals as determined by the employer's risk assessment. Records of all face-fit tests must be kept.",
  },
];

const faqs = [
  {
    question:
      "What is the difference between an FFP2 and an FFP3 filtering facepiece?",
    answer:
      "The key difference is the level of protection. An FFP2 mask has an Assigned Protection Factor (APF) of 10, meaning it reduces the wearer's exposure by a factor of 10. An FFP3 mask has an APF of 20, reducing exposure by a factor of 20. FFP2 masks filter at least 94% of airborne particles, while FFP3 masks filter at least 99%. For substances with low workplace exposure limits or high toxicity, FFP3 is required. For less hazardous dusts where the concentration does not exceed 10 times the WEL, FFP2 may be sufficient. Always check the COSHH assessment and safety data sheet to determine which level of protection is needed.",
  },
  {
    question:
      "Can I use the same pair of chemical-resistant gloves for different chemicals?",
    answer:
      "Not necessarily. Different chemicals attack different glove materials in different ways. A nitrile glove that provides excellent protection against petroleum-based solvents may offer very little protection against certain ketones. You must check the manufacturer's chemical resistance data (permeation charts) for each specific chemical you will handle. If you are working with multiple chemicals, you may need a glove material that resists all of them, or you may need to change gloves between tasks. Combination or laminated gloves exist for multi-chemical environments, but their breakthrough times must still be verified for each substance.",
  },
  {
    question:
      "When should I use a powered air-purifying respirator (PAPR) instead of a filtering facepiece?",
    answer:
      "A PAPR should be considered when work is prolonged (extended periods of RPE use cause discomfort and fatigue with non-powered devices), when the wearer has facial hair that prevents a seal with tight-fitting RPE, when higher protection factors are needed (TH3 PAPRs provide APF 40), when the wearer finds breathing through a filter too physically demanding (e.g. heavy manual work), or when spectacles or other factors prevent a good face seal. PAPRs with loose-fitting hoods do not require face-fit testing, which makes them a versatile option when tight-fitting RPE is impractical.",
  },
  {
    question:
      "What do the chemical suit types (Type 1 through Type 6) mean?",
    answer:
      "Chemical protective suits are classified from Type 1 (highest protection) to Type 6 (lowest protection). Type 1 is a gas-tight suit with self-contained breathing apparatus for total chemical isolation. Type 2 is a non-gas-tight positive-pressure suit. Type 3 protects against pressurised liquid jets (liquid-tight). Type 4 protects against liquid spray (spray-tight). Type 5 protects against airborne solid particles such as dusts and fibres. Type 6 provides limited protection against light liquid splash. For most COSHH work involving powders and dusts, Type 5 coveralls are sufficient. For liquid chemical handling, Type 3 or Type 4 is typically needed. The choice depends on the substance, the form it takes, and the task being performed.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "According to COSHH Regulation 7(3), what does 'adequate control' of exposure mean?",
    options: [
      "Providing PPE to every worker on site regardless of their task",
      "Ensuring exposure is below the WEL and reduced as low as reasonably practicable (ALARP)",
      "Keeping exposure at exactly the WEL value with no requirement to go lower",
      "Eliminating the hazardous substance entirely from the workplace",
    ],
    correctAnswer: 1,
    explanation:
      "COSHH Regulation 7(3) requires that exposure to hazardous substances is 'adequately controlled'. This means exposure must be kept below the relevant workplace exposure limit (WEL) AND reduced to as low as reasonably practicable (ALARP). Simply meeting the WEL is not enough; employers must continue to reduce exposure using the hierarchy of control measures wherever it is reasonably practicable to do so. RPE and PPE are the final measures used to manage residual risk after all higher-level controls have been applied.",
  },
  {
    id: 2,
    question:
      "What is the Assigned Protection Factor (APF) of an FFP2 filtering facepiece?",
    options: ["APF 4", "APF 10", "APF 20", "APF 40"],
    correctAnswer: 1,
    explanation:
      "An FFP2 filtering facepiece has an Assigned Protection Factor of 10. This means it is expected to reduce the wearer's exposure to airborne contaminants by a factor of 10, provided it is correctly fitted and face-fit tested. For example, if the ambient concentration is 5 mg/m3, the concentration inside a properly fitted FFP2 mask would be approximately 0.5 mg/m3. FFP1 masks have APF 4, FFP3 masks have APF 20.",
  },
  {
    id: 3,
    question:
      "Which glove material provides the BEST chemical resistance against aromatic solvents such as toluene and xylene?",
    options: [
      "Latex (natural rubber)",
      "Nitrile",
      "Viton (fluoroelastomer)",
      "PVC (polyvinyl chloride)",
    ],
    correctAnswer: 2,
    explanation:
      "Viton (fluoroelastomer) provides the best chemical resistance against aromatic solvents such as toluene, xylene, and benzene. While nitrile is a good general-purpose material for many chemicals, it does not resist aromatic solvents well. Latex and PVC both perform poorly against aromatics. Viton gloves are more expensive than other materials, but they are essential when handling aromatic hydrocarbons, as the breakthrough time of alternative materials may be dangerously short.",
  },
  {
    id: 4,
    question:
      "A half-mask respirator with P3 particulate filters has an APF of 10. What does this mean in practice?",
    options: [
      "The mask removes 10% of airborne particles",
      "The mask can be used for 10 hours before the filters must be replaced",
      "The concentration inside the mask should be no more than one-tenth of the concentration outside",
      "The mask protects against 10 different types of chemical hazard",
    ],
    correctAnswer: 2,
    explanation:
      "An APF of 10 means the respirator reduces the wearer's exposure by a factor of 10. The concentration of the contaminant inside the mask should be no more than one-tenth of the ambient concentration outside. To use APFs for RPE selection, divide the workplace concentration by the WEL. If the result is 8, you need RPE with an APF of at least 10. If the result is 15, you need an APF of at least 20, and so on. Always select RPE with an APF that exceeds the required protection factor.",
  },
  {
    id: 5,
    question:
      "Under EN 374, which THREE properties of chemical-resistant gloves are assessed?",
    options: [
      "Colour, thickness, and elasticity",
      "Permeation, degradation, and penetration",
      "Tensile strength, abrasion resistance, and puncture resistance",
      "Grip, dexterity, and comfort",
    ],
    correctAnswer: 1,
    explanation:
      "EN 374 assesses three properties of chemical-resistant gloves. Permeation measures the rate at which a chemical passes through the glove material at a molecular level (used to determine breakthrough time). Degradation measures changes to the physical properties of the glove material after chemical contact (swelling, softening, cracking). Penetration tests whether the chemical can pass through seams, pinholes, or other imperfections in the glove. All three properties must be considered when selecting gloves for chemical handling.",
  },
  {
    id: 6,
    question:
      "When selecting eye protection for chemical splash hazards, which EN 166 designation provides the most appropriate protection?",
    options: [
      "Safety spectacles with side shields",
      "Safety spectacles with clear lenses",
      "Chemical splash goggles with indirect ventilation",
      "A basic face shield with no goggles underneath",
    ],
    correctAnswer: 2,
    explanation:
      "Chemical splash goggles with indirect ventilation provide the most appropriate eye protection against liquid chemical splashes. They form a seal around the eyes, preventing liquid from reaching the eyes from any angle. Safety spectacles (even with side shields) leave gaps where splashed liquid can enter. Face shields protect the face but not the eyes from splashes coming from below or around the sides. For chemical splash hazards, goggles should be the baseline, with a face shield worn over goggles if there is a risk of large-volume splashes reaching the face.",
  },
  {
    id: 7,
    question:
      "A worker needs RPE for sanding a surface coated with a two-pack polyurethane paint containing isocyanates. The concentration is estimated at 3 times the WEL. Which RPE is the MINIMUM acceptable selection?",
    options: [
      "FFP1 filtering facepiece (APF 4)",
      "FFP2 filtering facepiece with combination A2P2 filters (APF 10)",
      "Half-mask respirator with A2P3 combination filters (APF 10)",
      "No RPE is needed if the work area is well-ventilated",
    ],
    correctAnswer: 2,
    explanation:
      "For isocyanate exposure at 3 times the WEL, you need RPE with a minimum APF of 4 (to bring exposure below the WEL). However, because isocyanates are potent respiratory sensitisers with very low WELs, best practice demands a higher level of protection. A half-mask with A2P3 combination filters (APF 10) provides protection against both the organic vapour (A filter) and particulate (P3 filter) components generated during sanding. The 'A' filter absorbs organic vapours, and the P3 filter captures fine particulate dust. An FFP1 mask would technically meet the minimum APF but does not protect against the vapour component. Ventilation alone is insufficient for isocyanate work.",
  },
  {
    id: 8,
    question:
      "Which of the following is a common mistake when selecting and using PPE for COSHH work?",
    options: [
      "Checking the safety data sheet before selecting gloves",
      "Using RPE as the sole control measure without applying higher-level controls first",
      "Replacing chemical-resistant gloves before the manufacturer's stated breakthrough time",
      "Conducting a face-fit test each time a new RPE model is issued",
    ],
    correctAnswer: 1,
    explanation:
      "Using RPE as the sole control measure, without first applying higher-level controls from the hierarchy of control, is one of the most common and serious mistakes in COSHH compliance. The hierarchy requires employers to eliminate or substitute the substance, then apply engineering controls (such as LEV), then administrative controls, before relying on PPE. Using RPE alone suggests the hierarchy has been ignored, which is a breach of COSHH Regulation 7. All of the other options describe correct practices: checking the SDS, replacing gloves proactively, and retesting face-fit when the RPE model changes.",
  },
];

export default function CoshhAwarenessModule4Section3() {
  useSEO({
    title:
      "RPE & PPE Selection | COSHH Awareness Module 4.3",
    description:
      "Respiratory protective equipment and personal protective equipment for COSHH work: filtering facepieces, half-mask and full-face respirators, PAPRs, breathing apparatus, glove selection, breakthrough time, eye and body protection, and correct selection processes.",
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
            <Link to="../coshh-awareness-module-4">
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
            <Shield className="h-7 w-7 text-violet-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 mx-auto">
            <span className="text-violet-400 text-xs font-semibold">
              MODULE 4 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            RPE &amp; PPE Selection
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Choosing the right respiratory protective equipment and personal
            protective equipment for COSHH-regulated work &mdash; types,
            assigned protection factors, face-fit testing, glove selection,
            eye and body protection, and common mistakes
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>RPE/PPE:</strong> Last resort in the hierarchy of
                control &mdash; never the first line of defence
              </li>
              <li>
                <strong>COSHH Reg 7(3):</strong> Exposure must be below the
                WEL and as low as reasonably practicable
              </li>
              <li>
                <strong>Face-fit:</strong> Legal requirement for all
                tight-fitting RPE
              </li>
              <li>
                <strong>Gloves:</strong> Material must be matched to the
                chemical &mdash; check breakthrough time
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Always:</strong> Check the SDS before selecting PPE
              </li>
              <li>
                <strong>Never:</strong> Rely on RPE as the sole control
                measure
              </li>
              <li>
                <strong>Always:</strong> Replace gloves before breakthrough
                time
              </li>
              <li>
                <strong>Never:</strong> Wear tight-fitting RPE with facial
                hair
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
              "Explain when RPE and PPE are required under COSHH and their position in the hierarchy of control",
              "Describe the main types of RPE (FFP1-3, half-mask, full-face, PAPR, breathing apparatus) and their Assigned Protection Factors",
              "State the legal requirement for face-fit testing and describe qualitative vs quantitative methods",
              "Select appropriate chemical-resistant gloves using breakthrough time data and EN 374",
              "Choose correct eye and body protection based on the hazard and the safety data sheet",
              "Apply the correct RPE/PPE selection process: identify hazard, check SDS, determine protection level, select, fit-test, train, maintain",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-violet-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ---------------------------------------------------------------- */}
        {/* SECTION 01 — When RPE/PPE Is Required */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">01</span>
            When RPE &amp; PPE Is Required
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Under the Control of Substances Hazardous to Health Regulations
                2002 (COSHH), personal protective equipment &mdash; including
                respiratory protective equipment (RPE) &mdash; sits at the{" "}
                <strong>bottom of the hierarchy of control</strong>. Employers
                must not jump straight to issuing masks and gloves. Instead,
                they must work through the hierarchy in order: elimination,
                substitution, engineering controls (such as local exhaust
                ventilation), administrative controls (such as reduced exposure
                time and safe systems of work), and only then PPE/RPE to manage
                the <strong>residual risk</strong> that remains.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Principle
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  RPE and PPE are <strong className="text-white">never</strong>{" "}
                  a substitute for proper engineering and administrative
                  controls. If a COSHH assessment identifies that workers need
                  RPE, it should be because higher-level controls have already
                  been applied and a residual risk still exists &mdash; not
                  because those controls were skipped for convenience.
                </p>
              </div>

              <p>
                There are three main situations where RPE/PPE is required under
                COSHH:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Last resort in the hierarchy:
                      </strong>{" "}
                      When elimination, substitution, engineering controls, and
                      administrative controls have been applied but residual
                      exposure remains above the level considered acceptable by
                      the COSHH assessment. PPE manages the remaining gap.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Supplement to other controls:
                      </strong>{" "}
                      PPE is often used alongside engineering controls as an
                      additional layer of protection. For example, a worker may
                      use LEV to capture solvent vapours at source whilst also
                      wearing a half-mask respirator with organic vapour filters
                      as a secondary safeguard.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Emergency and short-duration use:
                      </strong>{" "}
                      RPE may be required for emergency response to accidental
                      releases, confined space entry, short-duration
                      maintenance tasks where installing permanent engineering
                      controls is impractical, or during the time it takes to
                      implement higher-level controls.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">
                  COSHH Regulation 7(3) &mdash; Adequate Control
                </p>
                <p className="text-sm text-white/80">
                  Regulation 7(3) defines &ldquo;adequate control&rdquo; as
                  ensuring that exposure is{" "}
                  <strong className="text-white">
                    below the workplace exposure limit (WEL)
                  </strong>{" "}
                  AND reduced to{" "}
                  <strong className="text-white">
                    as low as reasonably practicable (ALARP)
                  </strong>
                  . Simply meeting the WEL is not sufficient &mdash; the employer
                  must demonstrate that they have done everything reasonably
                  practicable to reduce exposure further. PPE/RPE bridges the
                  gap between what engineering controls achieve and the ALARP
                  principle.
                </p>
              </div>

              <p>
                Employers must provide all RPE and PPE{" "}
                <strong>free of charge</strong>, ensure workers are trained in
                its correct use, and maintain records demonstrating that the
                equipment is adequate and properly maintained. Workers have a
                legal duty to use the PPE provided and to report any defects.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* SECTION 02 — Respiratory Protective Equipment (RPE) */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">02</span>
            Respiratory Protective Equipment (RPE)
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                RPE protects the wearer from inhaling hazardous substances
                &mdash; dusts, fumes, vapours, gases, and mists. The type of
                RPE selected must be matched to the hazard identified in the
                COSHH assessment, considering both the nature of the substance
                and the concentration in the workplace air.
              </p>

              {/* FFP Filtering Facepieces */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-1">
                  Filtering Facepieces (FFP Masks)
                </p>
                <p className="text-xs text-violet-400 font-semibold mb-3">
                  Disposable &middot; Particulate protection only &middot;
                  Face-fit required
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">FFP1 (APF 4):</strong>{" "}
                      Suitable for nuisance dusts at low concentrations (up to
                      4 times the WEL). Limited protection &mdash; appropriate
                      for low-hazard tasks such as sweeping general building
                      dust
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">FFP2 (APF 10):</strong>{" "}
                      Suitable for moderate hazards where concentrations do not
                      exceed 10 times the WEL. Used for wood dust, plaster
                      dust, grain dust, and similar particulates. Filters at
                      least 94% of airborne particles
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">FFP3 (APF 20):</strong>{" "}
                      The highest level of filtering facepiece. Suitable for
                      toxic dusts, fumes, and fine particulates up to 20 times
                      the WEL. Required for substances such as hardwood dust,
                      silica dust, lead fume, and asbestos (non-licensed
                      work). Filters at least 99% of airborne particles
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-red-300">
                        FFP masks protect against particles only
                      </strong>{" "}
                      &mdash; they do NOT protect against gases or vapours.
                      For vapour hazards, you must use a respirator with
                      appropriate gas/vapour filters
                    </span>
                  </li>
                </ul>
              </div>

              {/* Half-Mask Respirators */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-1">
                  Half-Mask Respirators
                </p>
                <p className="text-xs text-violet-400 font-semibold mb-3">
                  APF 10 &middot; Replaceable filters &middot; Face-fit
                  required
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Reusable rubber or silicone facepiece covering the nose
                      and mouth, with bayonet or screw-fit filter cartridges
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Particulate filters:
                      </strong>{" "}
                      P1 (low efficiency), P2 (medium efficiency), P3 (high
                      efficiency, 99.95% filtration)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Gas/vapour filters (colour-coded):
                      </strong>{" "}
                      A (brown) = organic vapours with boiling point above
                      65&deg;C; B (grey) = inorganic gases such as chlorine
                      and hydrogen sulphide; E (yellow) = sulphur dioxide and
                      acidic gases; K (green) = ammonia and organic amines
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Combination filters:
                      </strong>{" "}
                      Filters can be combined (e.g. A2B2P3) to protect against
                      multiple hazards simultaneously. The numbers (1, 2, 3)
                      indicate the filter capacity &mdash; Class 1 has the
                      lowest capacity, Class 3 the highest
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Must be face-fit tested for each wearer. Filters must be
                      replaced according to the manufacturer&rsquo;s schedule
                      or when the wearer detects taste or odour breakthrough
                    </span>
                  </li>
                </ul>
              </div>

              {/* Full-Face Respirators */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-1">
                  Full-Face Respirators
                </p>
                <p className="text-xs text-violet-400 font-semibold mb-3">
                  APF 20&ndash;40 &middot; Eye + respiratory protection
                  &middot; Face-fit required
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Full-face mask covering eyes, nose, and mouth. APF 20
                      with particulate filters, up to APF 40 with combination
                      gas and particulate filters
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Provides built-in eye protection &mdash; eliminates the
                      need for separate safety goggles. Essential when the
                      hazardous substance also poses a risk to the eyes (e.g.
                      acid vapours, corrosive mists)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Required when exposure levels are too high for a
                      half-mask (above 10 times the WEL), or when the
                      substance is an eye irritant or corrosive
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Accepts the same filter types as half-masks (A, B, E,
                      K, P, and combinations). Filter selection depends on the
                      hazardous substance identified in the COSHH assessment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Must be face-fit tested using{" "}
                      <strong className="text-white">
                        quantitative testing
                      </strong>{" "}
                      (PortaCount) because of the higher APF
                    </span>
                  </li>
                </ul>
              </div>

              {/* PAPR */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-1">
                  Powered Air-Purifying Respirators (PAPR)
                </p>
                <p className="text-xs text-violet-400 font-semibold mb-3">
                  TH1 (APF 10) &middot; TH2 (APF 20) &middot; TH3 (APF 40)
                  &middot; Battery-powered
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      A battery-powered fan draws air through filters and
                      delivers purified air to the wearer via a hood, helmet,
                      or visor. Three protection classes: TH1 (APF 10), TH2
                      (APF 20), and TH3 (APF 40)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Loose-fitting hoods and helmets do not require
                        face-fit testing
                      </strong>{" "}
                      &mdash; positive pressure inside the headpiece prevents
                      contaminated air from entering
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Ideal for workers with facial hair
                      </strong>
                      , spectacle wearers, and those who find non-powered RPE
                      uncomfortable or physically demanding
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Advantages for prolonged use: reduced breathing
                      resistance, better comfort during heavy physical work,
                      cooler operating temperature inside the headpiece
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Battery must be fully charged before each use. A flat
                      battery means the fan stops, positive pressure is lost,
                      and the unit provides no protection
                    </span>
                  </li>
                </ul>
              </div>

              {/* Breathing Apparatus */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-1">
                  Breathing Apparatus (BA)
                </p>
                <p className="text-xs text-violet-400 font-semibold mb-3">
                  Airline &middot; SCBA &middot; IDLH atmospheres &middot;
                  confined spaces
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Airline (compressed air line):
                      </strong>{" "}
                      Clean, breathable air is supplied from an external
                      compressor or cylinder bank via a hose. The wearer is
                      tethered to the air supply. Used when the atmosphere is
                      oxygen-deficient or the contaminant concentration is too
                      high for any filter-based RPE
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Self-contained breathing apparatus (SCBA):
                      </strong>{" "}
                      The wearer carries their own air supply in a cylinder on
                      their back. Provides full mobility but limited duration
                      (typically 30&ndash;60 minutes). Required for emergency
                      response, fire rescue, and unknown atmospheres
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        When required:
                      </strong>{" "}
                      IDLH (immediately dangerous to life or health)
                      atmospheres, oxygen-deficient environments (below 19.5%
                      O<sub>2</sub>), confined spaces with unknown or
                      unpredictable atmospheric conditions, and any situation
                      where filter-based RPE cannot provide adequate protection
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-red-300">
                        Specialist training is mandatory
                      </strong>{" "}
                      for all breathing apparatus use. Workers must be trained,
                      medically assessed, and competent before using BA
                      equipment
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ---------------------------------------------------------------- */}
        {/* SECTION 03 — Assigned Protection Factors (APFs) */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">03</span>
            Assigned Protection Factors (APFs)
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every type of RPE has an Assigned Protection Factor (APF),
                which is a number indicating how much the RPE reduces the
                wearer&rsquo;s exposure compared to the ambient (surrounding)
                concentration. For example, an APF of 20 means the RPE
                reduces exposure by a factor of 20 &mdash; the air inside the
                mask should be 20 times cleaner than the air outside.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">
                  How to Use APFs for RPE Selection
                </p>
                <p className="text-sm text-white/80">
                  Divide the measured or estimated workplace concentration by
                  the WEL. The result is the{" "}
                  <strong className="text-white">
                    minimum protection factor
                  </strong>{" "}
                  you need. Then select RPE with an APF that{" "}
                  <strong className="text-white">equals or exceeds</strong>{" "}
                  that value. For example: if the concentration is 8 mg/m&sup3;
                  and the WEL is 1 mg/m&sup3;, you need a minimum protection
                  factor of 8. An FFP2 (APF 10) would be sufficient. If the
                  concentration were 15 mg/m&sup3;, you would need at least
                  APF 20 (FFP3 or full-face).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* DIAGRAM — APF Comparison Table */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">
              &mdash;
            </span>
            APF Comparison Table
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-violet-500/20 border-b border-violet-500/30 px-4 py-3">
              <p className="text-sm font-semibold text-violet-400">
                Assigned Protection Factors by RPE Type
              </p>
            </div>

            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-4 gap-px bg-white/5">
              <div className="bg-[#1a1a1a] px-4 py-2">
                <p className="text-xs font-semibold text-white/60">RPE Type</p>
              </div>
              <div className="bg-[#1a1a1a] px-4 py-2">
                <p className="text-xs font-semibold text-white/60">APF</p>
              </div>
              <div className="bg-[#1a1a1a] px-4 py-2">
                <p className="text-xs font-semibold text-white/60">
                  Face-Fit?
                </p>
              </div>
              <div className="bg-[#1a1a1a] px-4 py-2">
                <p className="text-xs font-semibold text-white/60">
                  Protects Against
                </p>
              </div>
            </div>

            {/* Rows */}
            {[
              {
                type: "FFP1",
                apf: "4",
                fit: "Yes",
                protects: "Low-hazard dusts",
              },
              {
                type: "FFP2",
                apf: "10",
                fit: "Yes",
                protects: "Moderate dusts, fumes",
              },
              {
                type: "FFP3",
                apf: "20",
                fit: "Yes",
                protects: "Toxic dusts, fine particles",
              },
              {
                type: "Half-mask (filter)",
                apf: "10",
                fit: "Yes",
                protects: "Particles, gases, vapours*",
              },
              {
                type: "Full-face (filter)",
                apf: "20-40",
                fit: "Yes (quant.)",
                protects: "Particles, gases, vapours* + eyes",
              },
              {
                type: "PAPR TH1",
                apf: "10",
                fit: "No (loose)",
                protects: "Particles, gases, vapours*",
              },
              {
                type: "PAPR TH2",
                apf: "20",
                fit: "No (loose)",
                protects: "Particles, gases, vapours*",
              },
              {
                type: "PAPR TH3",
                apf: "40",
                fit: "No (loose)",
                protects: "Particles, gases, vapours*",
              },
              {
                type: "Airline BA",
                apf: "40+",
                fit: "Varies",
                protects: "All airborne hazards + O2 deficiency",
              },
              {
                type: "SCBA",
                apf: "40+",
                fit: "Yes",
                protects: "All airborne hazards + O2 deficiency",
              },
            ].map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5"
              >
                <div className="bg-[#1a1a1a] px-4 py-2.5">
                  <p className="text-sm font-medium text-white">{row.type}</p>
                </div>
                <div className="bg-[#1a1a1a] px-4 py-2.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold">
                    {row.apf}
                  </span>
                </div>
                <div className="bg-[#1a1a1a] px-4 py-2.5">
                  <p className="text-xs text-white/70">{row.fit}</p>
                </div>
                <div className="bg-[#1a1a1a] px-4 py-2.5">
                  <p className="text-xs text-white/70">{row.protects}</p>
                </div>
              </div>
            ))}

            <div className="px-4 py-3 bg-white/5">
              <p className="text-xs text-white/50">
                * With appropriate gas/vapour filter cartridges fitted. APFs for
                loose-fitting PAPRs apply only to versions with hoods or
                helmets; tight-fitting PAPR facepieces require face-fit testing.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* SECTION 04 — Face-Fit Testing */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">04</span>
            Face-Fit Testing
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Face-fit testing is a{" "}
                <strong>legal requirement under COSHH</strong> for all
                tight-fitting RPE. A tight-fitting respirator can only achieve
                its stated APF if the facepiece creates a proper seal against
                the wearer&rsquo;s face. Without a successful face-fit test, the
                RPE must be assumed to provide little or no protection because
                contaminated air will leak past the seal.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Two Testing Methods
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      QUAL
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Qualitative Face-Fit Test (Taste Test)
                      </p>
                      <p>
                        A bitter (bitrex) or sweet (saccharin) aerosol is
                        sprayed into a hood placed over the wearer&rsquo;s head.
                        The wearer performs a series of exercises (talking,
                        bending, turning the head, breathing deeply) while
                        wearing the RPE. If the wearer can taste the aerosol, it
                        means air is leaking past the face seal and the RPE has{" "}
                        <strong className="text-red-300">failed</strong>.
                        Simple pass/fail result. Suitable for FFP2, FFP3, and
                        half-mask respirators.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      QUANT
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Quantitative Face-Fit Test (Machine-Measured)
                      </p>
                      <p>
                        A machine (typically a TSI PortaCount) measures the
                        concentration of particles inside and outside the mask
                        to calculate a numerical fit factor. More accurate and
                        objective than the taste test.{" "}
                        <strong className="text-white">
                          Required for full-face respirators
                        </strong>{" "}
                        because the higher APF demands a higher level of
                        testing confidence. Also used when qualitative testing
                        is inconclusive.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">
                  When Must a Face-Fit Test Be Repeated?
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      When the RPE model or size changes (even a different
                      model from the same manufacturer)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      When the wearer&rsquo;s facial features change
                      significantly (weight gain or loss of more than 5&ndash;7
                      kg, dental work, scarring, or other changes to the
                      face shape)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      When a different type of tight-fitting RPE is selected
                      (e.g. switching from FFP3 to a half-mask)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      At regular intervals as determined by the employer&rsquo;s
                      health and safety policy (commonly every 1&ndash;2 years)
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
                  . Even a day&rsquo;s stubble growth can prevent the mask from
                  forming an airtight seal, reducing the actual protection factor
                  to a fraction of the stated APF. These workers must use a
                  loose-fitting PAPR with a hood or helmet, or an airline hood,
                  neither of which relies on a face seal. There is no exception
                  to this rule &mdash; tightening the straps harder does not
                  compensate for facial hair.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  RPE Maintenance, Inspection &amp; Storage
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Clean after each use:
                      </strong>{" "}
                      Reusable RPE must be washed and disinfected after every
                      work session following the manufacturer&rsquo;s
                      instructions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Replace filters on schedule:
                      </strong>{" "}
                      Gas/vapour filters have a finite capacity. Replace
                      according to manufacturer&rsquo;s data, or immediately if
                      taste or odour is detected inside the mask
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Inspect before each use:
                      </strong>{" "}
                      Check the facepiece for cracks, the straps for
                      elasticity, the valves for damage, and the filters for
                      correct seating
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Store properly:
                      </strong>{" "}
                      In a clean, dry location away from direct sunlight,
                      chemicals, and extreme temperatures. Ideally in a sealed
                      bag or dedicated storage container
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Lifespan:</strong>{" "}
                      Disposable masks are single-use. Reusable RPE typically
                      has a 5-year shelf life from manufacture, but the
                      facepiece may need replacing sooner if damaged or worn.
                      Always check the manufacturer&rsquo;s stated lifespan
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* SECTION 05 — Skin Protection: Gloves */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">05</span>
            Skin Protection &mdash; Chemical-Resistant Gloves
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The hands are the most common route of skin contact with
                hazardous substances. Selecting the right glove material is
                critical because no single glove resists all chemicals. The
                safety data sheet (SDS) for each substance specifies the
                recommended glove material and minimum breakthrough time.
              </p>

              {/* Glove Materials */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Glove Materials &amp; Chemical Resistance
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[64px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      NITRILE
                    </span>
                    <p>
                      <strong className="text-white">
                        Good general-purpose chemical resistance.
                      </strong>{" "}
                      Excellent against petroleum-based solvents, oils,
                      greases, acids, and caustics. Poor against ketones (e.g.
                      acetone) and some aromatic solvents. Latex-free, so safe
                      for workers with latex allergies. The most commonly used
                      glove material in industry.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[64px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      LATEX
                    </span>
                    <p>
                      <strong className="text-white">
                        Good dexterity and comfort.
                      </strong>{" "}
                      Resists water-based chemicals, dilute acids, and
                      alcohols. Poor against oils, solvents, and organic
                      chemicals. Risk of latex allergy (Type I hypersensitivity)
                      in some workers &mdash; always check before issuing.
                      Largely replaced by nitrile for chemical work.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[64px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      NEOPRENE
                    </span>
                    <p>
                      <strong className="text-white">
                        Broad chemical resistance.
                      </strong>{" "}
                      Good against acids, alkalis, alcohols, fuels, and many
                      solvents. Better than latex for chemical work but less
                      dexterous. Often used for handling hydraulic fluids,
                      phenols, and glycol ethers.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[64px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      PVC
                    </span>
                    <p>
                      <strong className="text-white">
                        Good for acids and caustics.
                      </strong>{" "}
                      Resists mineral acids, caustic solutions, fats, and
                      oils. Poor against most organic solvents. Economical for
                      tasks involving dilute chemicals and water-based
                      solutions. Less flexible than nitrile or latex.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[64px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      BUTYL
                    </span>
                    <p>
                      <strong className="text-white">
                        Specialist solvent resistance.
                      </strong>{" "}
                      Excellent against ketones (acetone, MEK), esters, and
                      aldehydes where nitrile and neoprene fail. Also good
                      against gases. More expensive and less dexterous, so
                      reserved for tasks involving these specific chemicals.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[64px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      VITON
                    </span>
                    <p>
                      <strong className="text-white">
                        Premium aromatic/chlorinated solvent resistance.
                      </strong>{" "}
                      The best material for aromatic solvents (toluene,
                      xylene), chlorinated solvents (dichloromethane,
                      trichloroethylene), and PCBs. Very expensive, but
                      essential for these high-hazard chemicals. Often
                      laminated onto a nitrile base for improved dexterity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Breakthrough Time */}
              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-2">
                  Breakthrough Time &mdash; The Critical Concept
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Breakthrough time is the measured time it takes for a
                  specific chemical to permeate through the glove material from
                  the outer surface to the inner surface. It is determined by
                  standardised laboratory testing under EN 374. A glove that
                  has a 120-minute breakthrough time for a chemical means the
                  chemical will begin reaching the inside of the glove after
                  approximately 120 minutes of continuous contact.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Always check the manufacturer&rsquo;s permeation data
                      for the specific chemical you are handling &mdash; do not
                      assume that a glove resists all chemicals
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Replace gloves{" "}
                      <strong className="text-white">
                        well before the stated breakthrough time
                      </strong>{" "}
                      to allow a safety margin. Workplace conditions (heat,
                      abrasion, stretching) reduce breakthrough time compared
                      to laboratory conditions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      A glove with no rated breakthrough time for a particular
                      chemical provides essentially no protection against
                      that chemical, even if it is marketed as
                      &ldquo;chemical-resistant&rdquo;
                    </span>
                  </li>
                </ul>
              </div>

              {/* EN 374 */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  EN 374 Standard &mdash; What Is Tested?
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Permeation:</strong> The
                      rate at which a chemical passes through the glove
                      material at a molecular level. This determines the
                      breakthrough time. A glove may appear intact but still
                      allow chemical molecules to diffuse through it.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Degradation:</strong>{" "}
                      Changes to the physical properties of the glove material
                      after chemical contact &mdash; swelling, softening,
                      cracking, stiffening, or discolouration. A degraded glove
                      loses its protective properties and may split during use.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Penetration:</strong>{" "}
                      Whether the chemical can pass through pinholes, seams,
                      or other imperfections in the finished glove. This tests
                      manufacturing quality rather than material performance.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Single-Use vs Reusable Gloves
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Single-use
                        (disposable):</strong> Thin, good dexterity, but
                      limited breakthrough times. Suitable for brief contact,
                      splash protection, and tasks requiring fine motor control.
                      Must be discarded after each use &mdash; never washed or
                      reused.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Reusable:</strong>{" "}
                      Thicker, longer breakthrough times, more robust. Suitable
                      for prolonged chemical handling. Must be inspected for
                      damage before each use, cleaned after use, and replaced
                      when signs of degradation appear.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Correct donning/doffing:
                      </strong>{" "}
                      Remove gloves by peeling from the wrist, turning
                      inside-out as you pull. This traps contamination on the
                      inside. Never snap gloves off or touch the outer surface
                      with bare skin. Wash hands immediately after removal.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ---------------------------------------------------------------- */}
        {/* SECTION 06 — Eye Protection */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">06</span>
            Eye Protection
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Hazardous substances can cause serious eye injuries ranging
                from irritation to permanent blindness. The type of eye
                protection selected must match the hazard identified in the
                COSHH assessment. All eye protection for chemical hazards must
                comply with <strong>EN 166</strong> (the European standard for
                personal eye protection).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Types of Eye Protection
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      SPEC
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Safety Spectacles (with side shields)
                      </p>
                      <p>
                        Protect against frontal impact and limited splash from
                        the front. Suitable for low-risk dust and minor
                        chemical splash where the primary risk is from the
                        front. NOT suitable for chemical splash hazards where
                        liquid could enter from the sides, above, or below.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      GOGG
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Chemical Splash Goggles
                      </p>
                      <p>
                        Seal around the eyes providing protection from all
                        directions. Indirect ventilation models prevent
                        liquid from entering through vents whilst still
                        reducing fogging.{" "}
                        <strong className="text-white">
                          The minimum standard for chemical splash hazards.
                        </strong>{" "}
                        Required when handling corrosive liquids, pouring or
                        mixing chemicals, or when there is any risk of
                        splashed liquid reaching the eyes.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[52px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      FACE
                    </span>
                    <div>
                      <p className="text-white font-medium">Face Shields</p>
                      <p>
                        Protect the entire face from splashes, sprays, and
                        flying particles. Worn{" "}
                        <strong className="text-white">
                          over goggles, not instead of them
                        </strong>
                        , for chemical work because face shields alone leave
                        gaps around the sides and bottom where liquid can
                        reach the eyes. Used for high-volume chemical
                        handling, decanting, and any task with a risk of
                        large-volume splashes to the face.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">Remember:</strong> If a
                  full-face respirator or PAPR with visor is being worn, it
                  provides built-in eye protection. Separate goggles are not
                  needed in this case. However, if only a half-mask or FFP mask
                  is worn, the eyes are unprotected and appropriate eye
                  protection must be worn in addition to the RPE.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* SECTION 07 — Body Protection */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">07</span>
            Body Protection
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Body protection prevents hazardous substances from contacting
                the skin, which is the second most common route of occupational
                exposure after inhalation. The level of body protection depends
                on the substance, its physical form, and the task being
                performed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Types of Body Protection
                </p>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Overalls:</strong>{" "}
                      Standard cotton or polyester-cotton overalls. Suitable
                      for low-hazard work where the substance is not toxic by
                      skin contact. Provide basic protection against
                      contamination of personal clothing but do not resist
                      chemical penetration.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Disposable coveralls (Type 5):
                      </strong>{" "}
                      Non-woven fabric suits that resist the penetration of
                      airborne solid particles (dusts, fibres). Full-body
                      protection with hood, elasticated wrists and ankles.
                      Required for work with toxic dusts, respirable
                      crystalline silica, and fibrous materials.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Chemical-resistant suits (Types 1&ndash;6):
                      </strong>{" "}
                      Classified from Type 1 (gas-tight, total encapsulation)
                      to Type 6 (light liquid splash). The type selected
                      depends on the chemical form and the severity of the
                      hazard:
                    </span>
                  </li>
                </ul>
              </div>

              {/* Chemical Suit Types */}
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="bg-violet-500/20 border-b border-violet-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-violet-400">
                    Chemical Protective Suit Classification
                  </p>
                </div>
                <div className="p-4 sm:p-5 space-y-3">
                  {[
                    {
                      type: "Type 1",
                      desc: "Gas-tight suit with SCBA inside. Total isolation from the atmosphere. Used for toxic gas releases and emergency response.",
                      colour: "red",
                    },
                    {
                      type: "Type 2",
                      desc: "Non-gas-tight positive-pressure suit. External air supply. Used for high-hazard chemical handling where gas-tight is not required.",
                      colour: "red",
                    },
                    {
                      type: "Type 3",
                      desc: "Liquid-tight. Resists pressurised liquid jets from any direction. Used for tasks with risk of chemical jets or high-pressure spray.",
                      colour: "amber",
                    },
                    {
                      type: "Type 4",
                      desc: "Spray-tight. Resists liquid spray (not pressurised jets). Suitable for spraying pesticides, dilute chemical application, and similar tasks.",
                      colour: "amber",
                    },
                    {
                      type: "Type 5",
                      desc: "Airborne solid particle protection. Resists dust and fibre penetration. Used for handling powders, toxic dusts, and fibrous materials.",
                      colour: "green",
                    },
                    {
                      type: "Type 6",
                      desc: "Limited liquid splash protection. Resists light, low-pressure splash only. Minimum level for minor chemical splash risk.",
                      colour: "green",
                    },
                  ].map((suit) => (
                    <div key={suit.type} className="flex items-start gap-3">
                      <span
                        className={`flex items-center justify-center min-w-[56px] h-7 rounded-full text-xs font-bold flex-shrink-0 ${
                          suit.colour === "red"
                            ? "bg-red-500/20 text-red-400"
                            : suit.colour === "amber"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {suit.type}
                      </span>
                      <p className="text-sm text-white/80">{suit.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Aprons
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Chemical-resistant aprons (PVC, neoprene, or butyl
                      rubber) provide frontal protection during decanting,
                      mixing, and cleaning tasks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Aprons protect the torso but not the arms, back, or
                      legs. They supplement other body protection, not replace
                      it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Must be made from a material that resists the specific
                      chemicals being handled &mdash; check the SDS for
                      recommendations
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ---------------------------------------------------------------- */}
        {/* DIAGRAM — RPE Selection Guide */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">
              &mdash;
            </span>
            RPE &amp; PPE Selection Process
          </h2>

          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-violet-500/20 border-b border-violet-500/30 px-4 py-3">
              <p className="text-sm font-semibold text-violet-400">
                Correct Selection Process &mdash; Follow These Steps
              </p>
            </div>

            <div className="p-4 sm:p-6 space-y-0">
              {/* Step 1 */}
              <div className="flex gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 border-2 border-violet-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-violet-400">1</span>
                  </div>
                  <div className="w-0.5 flex-1 bg-violet-500/20 my-1" />
                </div>
                <div className="pb-5">
                  <p className="text-sm font-medium text-white">
                    Identify the hazard
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    What is the substance? What form does it take (dust, vapour,
                    liquid, gas, mist)? What are the health effects? Is it
                    absorbed through the skin? Refer to the COSHH assessment and
                    the substance&rsquo;s safety data sheet (SDS).
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 border-2 border-violet-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-violet-400">2</span>
                  </div>
                  <div className="w-0.5 flex-1 bg-violet-500/20 my-1" />
                </div>
                <div className="pb-5">
                  <p className="text-sm font-medium text-white">
                    Check the safety data sheet (SDS)
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    Section 8 of the SDS specifies the recommended PPE including
                    glove material and breakthrough time, respiratory protection
                    type and filter class, eye protection, and body protection.
                    This is your primary source for PPE selection.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 border-2 border-violet-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-violet-400">3</span>
                  </div>
                  <div className="w-0.5 flex-1 bg-violet-500/20 my-1" />
                </div>
                <div className="pb-5">
                  <p className="text-sm font-medium text-white">
                    Determine the protection level needed
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    For RPE: calculate the required protection factor (workplace
                    concentration &divide; WEL). For gloves: identify the
                    required breakthrough time based on duration of contact. For
                    eye/body protection: determine if the risk is splash, spray,
                    dust, or vapour.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 border-2 border-violet-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-violet-400">4</span>
                  </div>
                  <div className="w-0.5 flex-1 bg-violet-500/20 my-1" />
                </div>
                <div className="pb-5">
                  <p className="text-sm font-medium text-white">
                    Select the equipment
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    Choose RPE with an APF that meets or exceeds the required
                    protection factor. Choose gloves with a breakthrough time
                    that exceeds the expected duration of contact. Choose eye
                    and body protection that matches the physical form of the
                    hazard.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 border-2 border-violet-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-violet-400">5</span>
                  </div>
                  <div className="w-0.5 flex-1 bg-violet-500/20 my-1" />
                </div>
                <div className="pb-5">
                  <p className="text-sm font-medium text-white">
                    Face-fit test and train
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    All tight-fitting RPE must be face-fit tested for each
                    individual wearer. All workers must be trained in the correct
                    use, donning, doffing, and limitations of the PPE provided.
                    Training must be documented.
                  </p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 border-2 border-violet-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-violet-400">6</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Maintain, inspect, and replace
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    Establish a maintenance schedule for reusable RPE. Inspect
                    all PPE before each use. Replace filters, gloves, and
                    disposable items on schedule. Keep records of maintenance,
                    inspection, and replacement. Remove damaged equipment from
                    service immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* SECTION 08 — Common Mistakes in PPE Selection and Use */}
        {/* ---------------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">08</span>
            Common Mistakes in PPE Selection and Use
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding common mistakes helps you recognise and avoid them.
                Every one of these errors has resulted in preventable exposure
                and, in many cases, serious occupational illness.
              </p>

              <div className="space-y-3">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-red-300">
                        Using RPE as the sole control measure
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        The most common and serious mistake. RPE must be the
                        last resort in the hierarchy of control, not the first
                        response. If higher-level controls have not been
                        applied, the COSHH assessment is inadequate and the
                        employer is in breach of Regulation 7.
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
                        Selecting the wrong glove material for the chemical
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        Using nitrile gloves when handling ketones, or latex
                        gloves with organic solvents. The glove may look intact
                        but offers little or no barrier to permeation. Always
                        check the SDS and manufacturer&rsquo;s permeation data.
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
                        Using FFP masks against vapours or gases
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        FFP masks (FFP1, FFP2, FFP3) only filter particles.
                        They provide no protection against gases or vapours.
                        For vapour hazards, a respirator with appropriate
                        gas/vapour filter cartridges (A, B, E, or K type) is
                        required.
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
                        Wearing tight-fitting RPE with facial hair
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        Even short stubble prevents an airtight seal. The
                        stated APF becomes meaningless because contaminated air
                        bypasses the filter entirely through the gap between
                        the face and the mask seal.
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
                        Not replacing gloves before breakthrough time
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        Workers continue wearing gloves long after the
                        breakthrough time has passed, resulting in prolonged
                        skin exposure to the chemical. Workplace conditions
                        (heat, abrasion) typically reduce breakthrough time
                        compared to laboratory data.
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
                        Using safety spectacles instead of goggles for chemical
                        splash
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        Safety spectacles leave gaps around the lenses where
                        splashed liquid can reach the eyes. Chemical splash
                        goggles that seal around the eyes are the minimum
                        standard for any liquid chemical splash risk.
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
                        Not reading the SDS before selecting PPE
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        Section 8 of the safety data sheet provides specific
                        PPE recommendations from the manufacturer. Guessing or
                        using generic PPE without consulting the SDS leads to
                        under-protection or over-protection (which wastes money
                        and can reduce compliance).
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
                        Using RPE without face-fit testing
                      </p>
                      <p className="text-xs text-white/70 mt-1">
                        Without a face-fit test, there is no confirmation that
                        the RPE seals properly on the wearer&rsquo;s face. The
                        mask may appear to fit but in reality allows
                        contaminated air to leak past the seal, providing a
                        fraction of the stated protection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">Key Message:</strong>{" "}
                  Every one of these mistakes is avoidable. Correct PPE
                  selection starts with reading the COSHH assessment and the
                  safety data sheet, not with grabbing whatever is in the
                  cupboard. If you are unsure about the right PPE for a task,
                  stop and ask your supervisor &mdash; the cost of a pause is
                  nothing compared to the cost of occupational disease.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-4-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Engineering Controls
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-4-section-4">
              Next: Storage, Handling &amp; Disposal
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
