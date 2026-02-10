import { ArrowLeft, Shield, CheckCircle, AlertTriangle, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "hierarchy-order",
    question:
      "What is the correct order of the hierarchy of control, from most effective to least effective?",
    options: [
      "Elimination, substitution, engineering controls, administrative controls, PPE",
      "PPE, administrative controls, engineering controls, substitution, elimination",
      "Engineering controls, elimination, PPE, substitution, administrative controls",
      "Substitution, elimination, administrative controls, PPE, engineering controls",
    ],
    correctIndex: 0,
    explanation:
      "The hierarchy of control runs from most effective (elimination) to least effective (PPE). The order is: elimination, substitution, engineering controls, administrative controls, and PPE/RPE. Higher-level controls are always preferred because they remove or reduce the hazard at source rather than relying on individual behaviour. COSHH Regulation 7 requires employers to apply the hierarchy in this order and only move to lower levels when higher-level controls are not reasonably practicable.",
  },
  {
    id: "collective-vs-personal",
    question:
      "An employer decides to issue RPE to all workers instead of installing local exhaust ventilation (LEV) on a soldering station. Is this approach acceptable under COSHH?",
    options: [
      "No — collective measures such as LEV must be prioritised over personal protection like RPE",
      "Yes — RPE is acceptable as long as it is properly fitted and maintained",
      "Yes — the employer can choose whichever control is cheapest",
      "No — RPE is banned under COSHH regulations",
    ],
    correctIndex: 0,
    explanation:
      "Under COSHH Regulation 7, employers must prioritise collective protection measures (such as LEV) over personal protection (such as RPE). RPE should only be used as a last resort or as a temporary measure while engineering controls are being implemented. LEV protects everyone in the area automatically, whereas RPE depends on each individual wearing it correctly, having the right size, and maintaining it properly. The employer would need to demonstrate that LEV is not reasonably practicable before relying on RPE alone.",
  },
  {
    id: "sfairp-meaning",
    question:
      "What does 'so far as is reasonably practicable' (SFAIRP) mean in the context of selecting controls?",
    options: [
      "The employer must weigh the risk against the cost, time, and effort of control measures — and implement controls unless the cost is grossly disproportionate to the risk",
      "The employer only needs to implement controls if they cost nothing",
      "The employer can ignore the hierarchy if they believe the risk is low",
      "SFAIRP only applies to licensed asbestos work, not COSHH",
    ],
    correctIndex: 0,
    explanation:
      "SFAIRP means the employer must balance the level of risk against the sacrifice (cost, time, effort) needed to reduce it. Controls must be implemented unless the cost is grossly disproportionate to the benefit. Importantly, the greater the risk, the more the employer is expected to spend on controls. This is not a licence to do nothing — the burden of proof lies with the employer to show that further controls are not reasonably practicable. SFAIRP applies across all health and safety legislation, including COSHH.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "Can I skip straight to PPE if it is cheaper than engineering controls?",
    answer:
      "No. COSHH Regulation 7 requires employers to apply the hierarchy of control in order. You must first consider elimination, then substitution, then engineering controls, then administrative controls, and only then PPE/RPE. You can only rely on lower-level controls if you can demonstrate that higher-level controls are not reasonably practicable. Cost alone is not a sufficient reason to skip levels — the cost must be grossly disproportionate to the risk reduction. The HSE expects employers to invest proportionally to the level of risk.",
  },
  {
    question:
      "Is it ever acceptable to use PPE as the only control measure?",
    answer:
      "Only in very limited circumstances. PPE can be the sole control during short-duration emergency work, while engineering controls are being installed or repaired, or where it can be demonstrated that all higher-level controls are not reasonably practicable. Even then, the PPE must be correctly selected for the specific hazard, properly fitted (face-fit tested for RPE), adequately maintained, and workers must be trained in its use. Relying on PPE alone is always the least reliable approach because it depends entirely on individual compliance.",
  },
  {
    question:
      "What is the difference between elimination and substitution?",
    answer:
      "Elimination means removing the hazardous substance or the process that creates it entirely — for example, using push-fit connectors instead of soldered joints eliminates the need for flux and solder altogether. Substitution means replacing a more hazardous substance with a less hazardous one — for example, using a water-based cleaner instead of a solvent-based one. Both sit at the top of the hierarchy, but elimination is preferred because it removes the hazard completely, whereas substitution still involves a substance that may carry some residual risk.",
  },
  {
    question:
      "How do I know if my controls are working effectively?",
    answer:
      "You should monitor the effectiveness of controls through a combination of methods: workplace exposure monitoring (measuring airborne concentrations), health surveillance of exposed workers, regular inspection and maintenance of engineering controls such as LEV, checking RPE face-fit test records, reviewing incident and near-miss reports, and consulting with workers about whether they believe the controls are adequate. COSHH Regulation 9 specifically requires employers to maintain control measures in efficient working order and good repair. LEV systems must be examined and tested at least every 14 months (or 6 months for some processes).",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Under COSHH Regulation 7, what is the employer's primary duty regarding hazardous substances?",
    options: [
      "To provide PPE to all workers",
      "To prevent exposure, or where this is not reasonably practicable, to adequately control it",
      "To train workers to avoid hazardous substances",
      "To carry out annual health surveillance on all employees",
    ],
    correctAnswer: 1,
    explanation:
      "COSHH Regulation 7 places a duty on employers to either prevent exposure to hazardous substances or, where prevention is not reasonably practicable, to adequately control exposure. Prevention is always the first priority. Adequate control means applying the hierarchy of control measures in the correct order, starting with elimination at the top and PPE at the bottom.",
  },
  {
    id: 2,
    question:
      "An electrician currently uses solvent-based contact cleaner for degreasing electrical panels. Which hierarchy level is being applied if the employer switches to a water-based degreaser instead?",
    options: [
      "Elimination",
      "Substitution",
      "Engineering controls",
      "Administrative controls",
    ],
    correctAnswer: 1,
    explanation:
      "Replacing a solvent-based cleaner with a water-based alternative is an example of substitution — the second level of the hierarchy. The hazardous substance (the solvent) is being replaced with a less hazardous one (the water-based degreaser). This is not elimination because a chemical substance is still being used; it is simply less harmful. Substitution is one of the most effective and practical controls available in many electrical and construction tasks.",
  },
  {
    id: 3,
    question:
      "Why is PPE/RPE considered the least effective level in the hierarchy of control?",
    options: [
      "Because PPE is always uncomfortable to wear",
      "Because PPE only protects the individual wearing it and depends on correct selection, fitting, training, and consistent use",
      "Because PPE is the most expensive control measure",
      "Because UK law prohibits the use of PPE on construction sites",
    ],
    correctAnswer: 1,
    explanation:
      "PPE is the least effective level because it relies entirely on individual behaviour. It only protects the person wearing it (not others nearby), it must be correctly selected for the specific hazard, properly fitted (RPE requires face-fit testing), workers must be trained in its correct use, and it must be consistently worn and properly maintained. If any of these factors fail, the worker is unprotected. Higher-level controls like engineering controls protect everyone in the area automatically without relying on individual compliance.",
  },
  {
    id: 4,
    question:
      "A contractor is cutting concrete blocks on site, generating silica dust. Which engineering control would be most appropriate?",
    options: [
      "Issuing dust masks to all workers on site",
      "On-tool extraction (water suppression or vacuum extraction fitted to the cutting tool)",
      "Rotating workers so no one is exposed for more than 30 minutes",
      "Putting up warning signs about silica dust",
    ],
    correctAnswer: 1,
    explanation:
      "On-tool extraction — either water suppression or a vacuum extraction system fitted directly to the cutting tool — is the correct engineering control for concrete cutting. It captures or suppresses dust at the point of generation before it becomes airborne. Dust masks (PPE) are the lowest level of the hierarchy. Rotating workers is an administrative control. Warning signs alone are not a control measure. The engineering control should be applied first, with other measures layered on top if needed.",
  },
  {
    id: 5,
    question:
      "What does 'collective protection' mean in the context of COSHH controls?",
    options: [
      "Issuing the same type of PPE to every worker",
      "Measures that protect all workers in the area without relying on individual action, such as LEV or enclosure",
      "Holding a group safety meeting before starting work",
      "Providing collective insurance cover for chemical exposure claims",
    ],
    correctAnswer: 1,
    explanation:
      "Collective protection refers to control measures that protect all workers in the area without requiring individual action. Examples include local exhaust ventilation (LEV), total enclosure of a process, automated systems that remove the need for manual handling of hazardous substances, and general ventilation. These are preferred over personal protection (PPE/RPE) because they protect everyone automatically and do not depend on each worker correctly using their equipment.",
  },
  {
    id: 6,
    question:
      "An employer argues that installing LEV costs five times more than providing RPE. Under SFAIRP, can they rely on RPE alone?",
    options: [
      "Yes — the employer can always choose the cheaper option",
      "Not necessarily — they must show the cost is grossly disproportionate to the risk, not just more expensive",
      "Yes — RPE is always an acceptable alternative to LEV",
      "No — LEV is required by law regardless of cost",
    ],
    correctAnswer: 1,
    explanation:
      "Under SFAIRP, the employer must demonstrate that the cost of the higher-level control is grossly disproportionate to the risk reduction it would achieve. Being five times more expensive is not automatically grossly disproportionate — the assessment depends on the severity of the risk. For highly toxic substances or long-duration exposures, significant investment in engineering controls is expected. The greater the risk, the more the employer must spend before SFAIRP is satisfied. The burden of proof lies with the employer.",
  },
  {
    id: 7,
    question:
      "Which of the following is an example of elimination in electrical work?",
    options: [
      "Using low-VOC adhesive instead of standard adhesive",
      "Installing LEV above a soldering workstation",
      "Using push-fit connectors instead of soldered joints, removing the need for flux and solder entirely",
      "Wearing chemical-resistant gloves when handling solvents",
    ],
    correctAnswer: 2,
    explanation:
      "Using push-fit connectors instead of soldered joints is elimination — the hazardous substances (flux and solder fume) are removed entirely because the process no longer requires them. Low-VOC adhesive is substitution (replacing with a less hazardous alternative). LEV is an engineering control. Chemical-resistant gloves are PPE. Elimination is the most effective control because the hazard no longer exists.",
  },
  {
    id: 8,
    question:
      "A risk assessment identifies that a combination of controls is needed: LEV on a soldering station, reduced exposure times, and RPE for peak-exposure tasks. Which principle does this demonstrate?",
    options: [
      "The employer is wasting money by using too many controls",
      "The layered approach — rarely is a single control measure sufficient, so multiple controls from different levels are combined",
      "The employer is not following the hierarchy correctly",
      "RPE should never be used alongside engineering controls",
    ],
    correctAnswer: 1,
    explanation:
      "This demonstrates the layered (or combined) approach to control. In practice, it is rarely sufficient to rely on a single control measure. Combining controls from different levels of the hierarchy provides defence in depth — if one control fails or is insufficient, others are in place. In this example, LEV (engineering) is the primary control, reduced exposure time (administrative) adds a further safeguard, and RPE (personal protection) provides additional protection during peak-exposure tasks. This is good practice and is encouraged by the HSE.",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

export default function CoshhAwarenessModule4Section1() {
  useSEO({
    title:
      "Hierarchy of Control | COSHH Awareness Module 4 Section 1",
    description:
      "Learn about the COSHH hierarchy of control: elimination, substitution, engineering controls, administrative controls, and PPE. Understand how to select and combine control measures for hazardous substances in electrical and construction work.",
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
            <Link to="../coshh-awareness-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── Article ─── */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── Hero ─── */}
        <div className="mb-12 text-center">
          <Shield className="h-10 w-10 text-violet-500 mx-auto mb-4" />
          <span className="inline-block bg-violet-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 4 &middot; SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Hierarchy of Control
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            How to prevent or adequately control exposure to hazardous substances
            using the five levels of the hierarchy of control &mdash; from
            elimination to PPE
          </p>
        </div>

        {/* ─── Learning Outcomes ─── */}
        <section className="mb-10">
          <div className="bg-violet-500/10 border border-violet-500/30 p-4 sm:p-5 rounded-lg">
            <h2 className="text-violet-400 font-semibold text-base mb-3">
              Learning Outcomes
            </h2>
            <ul className="text-white space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                <span>
                  Explain the duty under COSHH Regulation 7 to prevent or adequately
                  control exposure
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                <span>
                  List the five levels of the hierarchy of control in the correct order
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                <span>
                  Give practical examples of each hierarchy level in electrical and
                  construction work
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                <span>
                  Explain why collective protection is preferred over personal protection
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                <span>
                  Define &ldquo;so far as is reasonably practicable&rdquo; (SFAIRP) and
                  explain how it applies to control selection
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                <span>
                  Describe the layered approach to combining control measures and how to
                  monitor their effectiveness
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── 01 COSHH Regulation 7 — The Duty to Control ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-violet-400/80 text-sm font-normal">01</span>
            COSHH Regulation 7 &mdash; The Duty to Control
          </h2>
          <div className="space-y-4 text-white">
            <p>
              COSHH Regulation 7 places a clear duty on every employer: you must either{" "}
              <strong>prevent exposure</strong> to substances hazardous to health, or
              where prevention is not reasonably practicable, you must{" "}
              <strong>adequately control</strong> that exposure. This is not optional
              &mdash; it is a legal requirement enforced by the HSE.
            </p>
            <p>
              The regulation establishes a two-stage approach. First, the employer
              must consider whether the exposure can be prevented entirely &mdash;
              for example, by eliminating the hazardous substance or by changing the
              process so the substance is no longer needed. Only when prevention is
              not reasonably practicable should the employer move to adequate control,
              which means reducing exposure to a level that does not cause harm.
            </p>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-lg p-3 sm:p-4 bg-violet-500/10 border-l-2 border-l-violet-500/50 border border-violet-500/30">
                <p className="font-semibold text-base text-violet-400 mb-2">
                  Prevention (Preferred)
                </p>
                <ul className="text-base text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Remove the hazardous substance entirely from the process
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Redesign the work so the substance is not required
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Use a completely substance-free method
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-violet-500/10 border-l-2 border-l-violet-500/50 border border-violet-500/30">
                <p className="font-semibold text-base text-violet-400 mb-2">
                  Adequate Control (Where Prevention Not Practicable)
                </p>
                <ul className="text-base text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Apply the hierarchy of control in the correct order
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Reduce exposure to below workplace exposure limits (WELs)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Combine multiple control measures where a single control is
                      insufficient
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <h3 className="font-semibold text-red-300">
                  Carcinogens, Mutagens &amp; Asthmagens
                </h3>
              </div>
              <p className="text-white/80 text-sm">
                For substances that cause cancer, heritable genetic damage, or
                occupational asthma, the duty is stricter. Employers must{" "}
                <strong className="text-white">
                  prevent exposure so far as is reasonably practicable
                </strong>
                . If prevention is not achievable, exposure must be reduced to as low
                a level as is reasonably practicable &mdash; not merely below the WEL.
                This reflects the fact that there may be no truly safe level of
                exposure for these substances.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 02 The Five Levels of the Hierarchy ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">02</span>
              The Five Levels of the Hierarchy
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The hierarchy of control is the framework used to decide how to
                control exposure to hazardous substances. It has{" "}
                <strong>five levels, arranged in order of effectiveness</strong>.
                You must always start at the top and only move down when a
                higher-level control is not reasonably practicable.
              </p>

              {/* ─── Hierarchy Pyramid Diagram ─── */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-4 text-center">
                  Hierarchy of Control Pyramid
                </h3>
                <p className="text-white/60 text-xs text-center mb-5">
                  Most effective at the top &mdash; least effective at the bottom
                </p>

                <div className="flex flex-col items-center gap-2 max-w-md mx-auto">
                  {/* Level 1 — Elimination */}
                  <div className="w-[45%] sm:w-[40%] bg-green-500/20 border-2 border-green-500/50 rounded-lg px-3 py-2.5 text-center">
                    <p className="text-green-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
                      1. Elimination
                    </p>
                    <p className="text-white/70 text-xs mt-0.5">Remove the hazard</p>
                  </div>
                  <ArrowDown className="h-4 w-4 text-white/30" />

                  {/* Level 2 — Substitution */}
                  <div className="w-[55%] sm:w-[50%] bg-emerald-500/15 border-2 border-emerald-500/40 rounded-lg px-3 py-2.5 text-center">
                    <p className="text-emerald-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
                      2. Substitution
                    </p>
                    <p className="text-white/70 text-xs mt-0.5">Replace with less hazardous</p>
                  </div>
                  <ArrowDown className="h-4 w-4 text-white/30" />

                  {/* Level 3 — Engineering Controls */}
                  <div className="w-[65%] sm:w-[60%] bg-blue-500/15 border-2 border-blue-500/40 rounded-lg px-3 py-2.5 text-center">
                    <p className="text-blue-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
                      3. Engineering Controls
                    </p>
                    <p className="text-white/70 text-xs mt-0.5">LEV, enclosure, automation</p>
                  </div>
                  <ArrowDown className="h-4 w-4 text-white/30" />

                  {/* Level 4 — Administrative Controls */}
                  <div className="w-[80%] sm:w-[75%] bg-amber-500/15 border-2 border-amber-500/40 rounded-lg px-3 py-2.5 text-center">
                    <p className="text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
                      4. Administrative Controls
                    </p>
                    <p className="text-white/70 text-xs mt-0.5">Procedures, training, signage</p>
                  </div>
                  <ArrowDown className="h-4 w-4 text-white/30" />

                  {/* Level 5 — PPE/RPE */}
                  <div className="w-[95%] sm:w-[90%] bg-red-500/15 border-2 border-red-500/40 rounded-lg px-3 py-2.5 text-center">
                    <p className="text-red-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
                      5. PPE / RPE
                    </p>
                    <p className="text-white/70 text-xs mt-0.5">Last resort &mdash; personal protection</p>
                  </div>
                </div>

                <div className="flex justify-between mt-4 text-xs text-white/40 max-w-md mx-auto px-2">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500/50" />
                    Most effective
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500/50" />
                    Least effective
                  </span>
                </div>
              </div>

              {/* ─── Level 1: Elimination ─── */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-green-400 font-medium mb-3">
                  Level 1: Elimination &mdash; Remove the Substance Entirely
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  The most effective control. If the hazardous substance is not
                  present, no one can be exposed. This means redesigning the process,
                  changing the method of work, or using a substance-free technique.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Pre-fabricate off site</strong> &mdash; assemble
                      components in a controlled factory environment rather than
                      performing hazardous processes on site
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Push-fit connectors instead of soldered joints</strong>{" "}
                      &mdash; eliminates the need for flux, solder, and the fume they
                      produce
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Mechanical fixing instead of adhesive bonding</strong>{" "}
                      &mdash; removes the need for chemical adhesives entirely
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Cable tray instead of chased channels</strong> &mdash;
                      avoids generating silica dust from concrete cutting
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── Level 2: Substitution ─── */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-3">
                  Level 2: Substitution &mdash; Replace with a Less Hazardous Substance
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  If the substance cannot be eliminated, consider whether a less
                  hazardous alternative can achieve the same result. The substitute
                  must be genuinely less hazardous &mdash; not just different.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Water-based cleaners instead of solvent-based</strong>{" "}
                      &mdash; lower volatility, reduced inhalation risk, less
                      flammable
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Lead-free solder</strong> &mdash; eliminates lead
                      exposure while still allowing soldered connections
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Low-VOC adhesives and sealants</strong> &mdash; reduced
                      volatile organic compound emissions, lower inhalation risk
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Low-chrome cement</strong> &mdash; reduces the risk of
                      chromium sensitisation and occupational dermatitis
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Pre-mixed compounds instead of powders</strong> &mdash;
                      reduces dust generation during mixing
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── Level 3: Engineering Controls ─── */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">
                  Level 3: Engineering Controls &mdash; Contain, Extract, or Isolate
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  Engineering controls physically reduce exposure by containing the
                  substance, extracting it at source, or isolating the worker from it.
                  These are covered in detail in the next section, but the key types
                  are outlined here.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Local exhaust ventilation (LEV)</strong> &mdash;
                      captures fume, dust, or vapour at the point of generation before
                      it enters the breathing zone (e.g. LEV on a soldering station)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Enclosure</strong> &mdash; physically enclose the
                      process so that the substance cannot escape into the workplace
                      (e.g. enclosed mixing systems)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>On-tool extraction</strong> &mdash; dust suppression or
                      vacuum extraction fitted directly to cutting, drilling, or
                      grinding tools (e.g. water suppression on a concrete cutter)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Automation / remote operation</strong> &mdash; remove
                      the worker from the exposure zone entirely
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Segregation</strong> &mdash; separate the hazardous
                      process from other workers (e.g. designated spray-painting area
                      with its own ventilation)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>General ventilation</strong> &mdash; dilutes
                      contaminated air with clean air (less effective than LEV but
                      useful as a supplementary measure)
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── Level 4: Administrative Controls ─── */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-amber-400 font-medium mb-3">
                  Level 4: Administrative Controls &mdash; Change How Work Is Done
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  Administrative controls change the way work is organised to reduce
                  exposure. They do not remove or reduce the hazard itself &mdash;
                  they reduce the time or number of people exposed.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Limit exposure duration</strong> &mdash; reduce the time
                      each worker spends in the exposure zone (e.g. maximum 30 minutes
                      continuous soldering before a break)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Rotate workers</strong> &mdash; share the exposure among
                      multiple workers so no individual exceeds safe limits
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Safe systems of work</strong> &mdash; documented
                      procedures that specify how to handle, use, and dispose of
                      hazardous substances safely
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Signage and demarcation</strong> &mdash; warning signs,
                      hazard zones, restricted access areas
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Training and toolbox talks</strong> &mdash; ensure
                      workers understand the hazards, the controls in place, and their
                      own responsibilities
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Permit-to-work systems</strong> &mdash; formal
                      authorisation for high-risk tasks involving hazardous substances
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Welfare facilities</strong> &mdash; washing facilities,
                      clean eating areas away from hazardous substances, changing areas
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── Level 5: PPE/RPE ─── */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-red-400 font-medium mb-3">
                  Level 5: PPE / RPE &mdash; Last Resort, Personal Protection
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  Personal protective equipment (PPE) and respiratory protective
                  equipment (RPE) are the{" "}
                  <strong>last line of defence</strong>. They should only be used when
                  all higher-level controls are in place and residual risk remains, or
                  as a temporary measure while other controls are being implemented.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Correct selection</strong> &mdash; the RPE/PPE must be
                      appropriate for the specific substance and exposure level (e.g.
                      the correct glove material for the chemical being handled, the
                      correct filter type for the vapour or particulate)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Face-fit testing</strong> &mdash; tight-fitting RPE must
                      be face-fit tested on each individual wearer to ensure an
                      adequate seal; a poor fit renders the RPE ineffective
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Training</strong> &mdash; workers must be trained in how
                      to put on, wear, remove, and check their PPE/RPE correctly
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Maintenance and storage</strong> &mdash; RPE filters
                      must be replaced according to the manufacturer&rsquo;s schedule,
                      PPE must be stored clean and dry, damaged items must be replaced
                      immediately
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Examples in electrical work</strong> &mdash;
                      chemical-resistant gloves for handling solvents and resin,
                      FFP3 masks for dust exposure, safety goggles for splash
                      protection, RPE with appropriate filters for soldering fume
                    </div>
                  </div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg mt-3">
                  <p className="text-white/80 text-xs">
                    <strong className="text-red-300">Remember:</strong> PPE only
                    protects the person wearing it. If it is removed, incorrectly
                    fitted, or the wrong type, the worker has{" "}
                    <strong className="text-white">zero protection</strong>. This is
                    why PPE is always the last resort.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── 03 Why the Hierarchy Matters ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">03</span>
              Why the Hierarchy Matters
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The hierarchy is not just a theoretical framework &mdash; it
                reflects a fundamental principle of occupational health:{" "}
                <strong>
                  higher-level controls are inherently more reliable because they
                  do not depend on human behaviour
                </strong>
                .
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">
                  Reliability Decreases Down the Hierarchy
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Elimination</strong> provides{" "}
                      <strong>permanent, 100% protection</strong> &mdash; if the
                      hazard is removed, no one can be exposed, regardless of
                      behaviour, training, or compliance.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Substitution</strong> provides{" "}
                      <strong>near-permanent protection</strong> &mdash; the new
                      substance is less hazardous, so even if controls fail, the
                      consequences are reduced.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Engineering controls</strong> are{" "}
                      <strong>highly reliable</strong> when properly maintained &mdash;
                      they operate automatically and protect everyone in the area
                      without individual action.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Administrative controls</strong> depend on{" "}
                      <strong>workers following procedures</strong> &mdash; they can
                      fail if workers are not trained, are under time pressure, or
                      simply forget.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>PPE/RPE</strong> is the{" "}
                      <strong>least reliable</strong> &mdash; it depends on correct
                      selection, proper fitting, consistent wearing, and ongoing
                      maintenance by each individual worker.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="text-violet-400 font-semibold mb-2">
                  Collective vs Personal Protection
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  COSHH requires employers to prioritise{" "}
                  <strong className="text-white">collective protection</strong>{" "}
                  over personal protection. Collective measures protect all workers
                  automatically; personal measures only protect the individual and
                  depend on correct use.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      Collective (Preferred)
                    </p>
                    <ul className="text-white/80 text-xs space-y-1">
                      <li>&bull; LEV systems</li>
                      <li>&bull; Enclosed processes</li>
                      <li>&bull; General ventilation</li>
                      <li>&bull; Segregated work areas</li>
                      <li>&bull; Automated handling</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      Personal (Last Resort)
                    </p>
                    <ul className="text-white/80 text-xs space-y-1">
                      <li>&bull; Respirators (RPE)</li>
                      <li>&bull; Chemical-resistant gloves</li>
                      <li>&bull; Safety goggles</li>
                      <li>&bull; Protective coveralls</li>
                      <li>&bull; Face shields</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04 SFAIRP — So Far As Is Reasonably Practicable ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">04</span>
              SFAIRP &mdash; So Far As Is Reasonably Practicable
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The phrase <strong>&ldquo;so far as is reasonably practicable&rdquo;</strong>{" "}
                (SFAIRP) appears throughout health and safety law, including COSHH.
                It determines how far an employer must go in applying the hierarchy
                of control.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">What SFAIRP Means</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      The employer must <strong>weigh the risk</strong> against the{" "}
                      <strong>sacrifice</strong> (cost, time, effort, inconvenience) of
                      implementing a control measure.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      Controls must be implemented unless the cost is{" "}
                      <strong>grossly disproportionate</strong> to the risk reduction
                      achieved. &ldquo;Grossly disproportionate&rdquo; is a high
                      threshold &mdash; it is not enough for the control to merely be
                      expensive.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      The <strong>greater the risk, the more the employer must
                      spend</strong> before SFAIRP is satisfied. For high-risk
                      exposures (e.g. carcinogens), very significant investment is
                      expected.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      The <strong>burden of proof lies with the employer</strong> to
                      demonstrate that further controls are not reasonably practicable.
                      If challenged by the HSE, the employer must prove it, not the
                      other way round.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="text-violet-400 font-semibold mb-2">
                  Practical Example
                </h3>
                <p className="text-white/80 text-sm">
                  An electrical contractor uses solvent-based contact cleaner daily.
                  A water-based alternative costs 20% more per litre but eliminates
                  the inhalation hazard from volatile solvents. The employer cannot
                  argue that the 20% cost increase is &ldquo;grossly
                  disproportionate&rdquo; to the health benefit &mdash; substitution
                  is clearly reasonably practicable here. However, if the only
                  available alternative required a complete redesign of the
                  production line costing millions for a marginal risk reduction, that{" "}
                  <em>might</em> be grossly disproportionate.
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-amber-300">Common Misconception</h3>
                </div>
                <p className="text-white/80 text-sm">
                  SFAIRP does <strong className="text-white">not</strong> mean
                  &ldquo;do whatever is cheapest&rdquo; or &ldquo;do whatever is
                  easiest&rdquo;. It requires a genuine assessment of risk versus
                  sacrifice. In practice, for most routine workplace hazards, the
                  cost of implementing proper controls is nowhere near grossly
                  disproportionate. The HSE expects employers to apply good practice
                  as a minimum baseline.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 05 Practical Examples for Electrical & Construction Work ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">05</span>
              Practical Examples for Electrical &amp; Construction Work
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The following table shows practical examples of each hierarchy level
                as they apply to common tasks in electrical installation and
                construction. These demonstrate that the hierarchy is not abstract
                &mdash; it has direct, everyday applications.
              </p>

              {/* ─── Control Selection Decision Tree Diagram ─── */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-4 text-center">
                  Control Selection Decision Tree
                </h3>
                <p className="text-white/60 text-xs text-center mb-5">
                  Follow the flowchart to determine which level of control to apply
                </p>

                <div className="flex flex-col items-center gap-2 max-w-sm mx-auto text-sm">
                  {/* Step 1 */}
                  <div className="w-full bg-violet-500/15 border-2 border-violet-500/40 rounded-lg px-3 py-2.5 text-center">
                    <p className="text-violet-400 font-semibold text-xs">
                      Can the substance be ELIMINATED?
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/50 w-full justify-center">
                    <span className="text-green-400 font-semibold">YES &rarr; Do it</span>
                    <span>|</span>
                    <span className="text-red-400 font-semibold">NO &darr;</span>
                  </div>

                  {/* Step 2 */}
                  <div className="w-full bg-violet-500/15 border-2 border-violet-500/40 rounded-lg px-3 py-2.5 text-center">
                    <p className="text-violet-400 font-semibold text-xs">
                      Can it be SUBSTITUTED with less hazardous?
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/50 w-full justify-center">
                    <span className="text-green-400 font-semibold">YES &rarr; Do it</span>
                    <span>|</span>
                    <span className="text-red-400 font-semibold">NO &darr;</span>
                  </div>

                  {/* Step 3 */}
                  <div className="w-full bg-violet-500/15 border-2 border-violet-500/40 rounded-lg px-3 py-2.5 text-center">
                    <p className="text-violet-400 font-semibold text-xs">
                      Can ENGINEERING CONTROLS reduce exposure?
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/50 w-full justify-center">
                    <span className="text-green-400 font-semibold">YES &rarr; Implement</span>
                    <span>|</span>
                    <span className="text-red-400 font-semibold">NO &darr;</span>
                  </div>

                  {/* Step 4 */}
                  <div className="w-full bg-violet-500/15 border-2 border-violet-500/40 rounded-lg px-3 py-2.5 text-center">
                    <p className="text-violet-400 font-semibold text-xs">
                      Can ADMINISTRATIVE CONTROLS reduce exposure further?
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/50 w-full justify-center">
                    <span className="text-green-400 font-semibold">YES &rarr; Implement</span>
                    <span>|</span>
                    <span className="text-amber-400 font-semibold">ALWAYS &darr;</span>
                  </div>

                  {/* Step 5 */}
                  <div className="w-full bg-red-500/15 border-2 border-red-500/40 rounded-lg px-3 py-2.5 text-center">
                    <p className="text-red-400 font-semibold text-xs">
                      Provide PPE/RPE for residual risk
                    </p>
                    <p className="text-white/50 text-xs mt-0.5">
                      Correct selection + face-fit + training + maintenance
                    </p>
                  </div>
                </div>

                <p className="text-white/40 text-xs text-center mt-4 italic">
                  At each step, document why you cannot apply a higher-level control
                </p>
              </div>

              {/* ─── Examples by Hierarchy Level ─── */}
              <div className="space-y-4">
                {/* Elimination examples */}
                <div className="rounded-xl border-2 border-green-500/40 bg-green-500/5 overflow-hidden">
                  <div className="bg-green-500/15 border-b border-green-500/30 px-4 py-2.5">
                    <p className="text-green-400 font-bold text-sm">
                      Elimination Examples
                    </p>
                  </div>
                  <div className="p-4 space-y-2 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">Pre-fabricate off site</strong>{" "}
                        &mdash; assemble cable tray, containment, and switchgear in a
                        workshop to avoid cutting, drilling, and chemical use on site
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">Push-fit connectors</strong>{" "}
                        &mdash; eliminate the need for soldering entirely, removing
                        exposure to flux fume and lead/tin solder
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">
                          Mechanical fixings instead of chemical anchors
                        </strong>{" "}
                        &mdash; use expansion bolts or toggles rather than resin-based
                        chemical anchors to avoid isocyanate exposure
                      </div>
                    </div>
                  </div>
                </div>

                {/* Substitution examples */}
                <div className="rounded-xl border-2 border-emerald-500/40 bg-emerald-500/5 overflow-hidden">
                  <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-4 py-2.5">
                    <p className="text-emerald-400 font-bold text-sm">
                      Substitution Examples
                    </p>
                  </div>
                  <div className="p-4 space-y-2 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">Low-VOC adhesives</strong>{" "}
                        &mdash; reduced volatile organic compound emissions compared
                        to standard solvent-based adhesives
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">
                          Water-based cleaners instead of solvent-based
                        </strong>{" "}
                        &mdash; for degreasing panels, cleaning contacts, and general
                        cleaning tasks
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">Lead-free solder</strong>{" "}
                        &mdash; eliminates lead exposure while maintaining a soldering
                        capability; flux fume exposure may still require additional
                        controls
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">Low-chrome cement</strong>{" "}
                        &mdash; reduces the risk of allergic contact dermatitis caused
                        by hexavalent chromium in standard Portland cement
                      </div>
                    </div>
                  </div>
                </div>

                {/* Engineering examples */}
                <div className="rounded-xl border-2 border-blue-500/40 bg-blue-500/5 overflow-hidden">
                  <div className="bg-blue-500/15 border-b border-blue-500/30 px-4 py-2.5">
                    <p className="text-blue-400 font-bold text-sm">
                      Engineering Control Examples
                    </p>
                  </div>
                  <div className="p-4 space-y-2 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">LEV on soldering stations</strong>{" "}
                        &mdash; bench-mounted or portable fume extraction that captures
                        solder fume at the point of generation
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">
                          On-tool extraction when cutting concrete
                        </strong>{" "}
                        &mdash; water suppression or vacuum extraction on disc cutters,
                        core drills, and chase cutters to control silica dust
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">H-class vacuum for dust</strong>{" "}
                        &mdash; HEPA-filtered industrial vacuum for collecting
                        hazardous dust (silica, wood dust, plaster)
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">
                          Segregated spray-painting booth
                        </strong>{" "}
                        &mdash; enclosed area with dedicated ventilation to contain
                        paint vapour and overspray
                      </div>
                    </div>
                  </div>
                </div>

                {/* Administrative examples */}
                <div className="rounded-xl border-2 border-amber-500/40 bg-amber-500/5 overflow-hidden">
                  <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2.5">
                    <p className="text-amber-400 font-bold text-sm">
                      Administrative Control Examples
                    </p>
                  </div>
                  <div className="p-4 space-y-2 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">
                          Limit exposure duration
                        </strong>{" "}
                        &mdash; schedule soldering or painting tasks for set periods
                        with mandatory breaks to reduce cumulative exposure
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">Welfare facilities</strong>{" "}
                        &mdash; designated washing areas, clean eating areas separated
                        from work zones, facilities for changing contaminated clothing
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">Toolbox talks</strong> &mdash;
                        regular briefings on the hazardous substances present, the
                        controls in place, and what to do if controls fail
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">
                          Permits to work for high-risk chemical tasks
                        </strong>{" "}
                        &mdash; formal documentation and sign-off before using
                        particularly hazardous substances in confined or complex
                        environments
                      </div>
                    </div>
                  </div>
                </div>

                {/* PPE examples */}
                <div className="rounded-xl border-2 border-red-500/40 bg-red-500/5 overflow-hidden">
                  <div className="bg-red-500/15 border-b border-red-500/30 px-4 py-2.5">
                    <p className="text-red-400 font-bold text-sm">
                      PPE / RPE Examples
                    </p>
                  </div>
                  <div className="p-4 space-y-2 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">
                          Correct glove selection for chemical handling
                        </strong>{" "}
                        &mdash; nitrile gloves for solvents, neoprene for acids, butyl
                        rubber for ketones (check the safety data sheet for guidance)
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">
                          FFP3 respirator for dust exposure
                        </strong>{" "}
                        &mdash; when cutting, drilling, or chasing generates dust that
                        cannot be fully controlled by on-tool extraction alone
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">
                          RPE with A1P3 filters for soldering
                        </strong>{" "}
                        &mdash; combination organic vapour and particulate filter when
                        LEV is insufficient or unavailable as a temporary measure
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                      <div className="text-white/80">
                        <strong className="text-white">
                          Safety goggles for splash protection
                        </strong>{" "}
                        &mdash; when handling liquid chemicals such as cleaning agents,
                        battery acid, or resin components
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 06 Combination of Controls — The Layered Approach ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">06</span>
              Combination of Controls &mdash; The Layered Approach
            </h2>
            <div className="space-y-4 text-white">
              <p>
                In practice, it is <strong>rarely sufficient to rely on a single
                control measure</strong>. Most workplace exposures require a
                combination of controls from different levels of the hierarchy,
                working together to provide defence in depth.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">
                  Why Combine Controls?
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>No single control is perfect</strong> &mdash; LEV may
                      capture 90% of fume, but the remaining 10% still needs
                      managing. Combining LEV with reduced exposure time and RPE
                      provides multiple layers of protection.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Defence in depth</strong> &mdash; if one control fails
                      (e.g. LEV breaks down), other controls are still in place to
                      protect workers until the primary control is restored.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Different exposure routes</strong> &mdash; a substance
                      may be inhaled and also absorbed through the skin. LEV
                      controls the inhalation route; chemical-resistant gloves
                      control the skin absorption route. Both are needed.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="text-violet-400 font-semibold mb-3">
                  Worked Example: Soldering in an Electrical Workshop
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0 text-green-400 text-xs font-bold mt-0.5">
                      E
                    </div>
                    <div>
                      <strong className="text-green-400">Elimination:</strong>{" "}
                      <span className="text-white/80">
                        Use push-fit connectors where possible to eliminate soldering
                        entirely
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 text-emerald-400 text-xs font-bold mt-0.5">
                      S
                    </div>
                    <div>
                      <strong className="text-emerald-400">Substitution:</strong>{" "}
                      <span className="text-white/80">
                        Where soldering is necessary, use lead-free solder and
                        rosin-free flux to reduce toxicity of fume
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 text-blue-400 text-xs font-bold mt-0.5">
                      EC
                    </div>
                    <div>
                      <strong className="text-blue-400">Engineering:</strong>{" "}
                      <span className="text-white/80">
                        Install bench-mounted LEV to capture fume at source; ensure
                        adequate general ventilation in the workshop
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 text-amber-400 text-xs font-bold mt-0.5">
                      AC
                    </div>
                    <div>
                      <strong className="text-amber-400">Administrative:</strong>{" "}
                      <span className="text-white/80">
                        Limit continuous soldering to 30-minute sessions; train all
                        operatives on correct LEV use; display safety data sheets
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 text-red-400 text-xs font-bold mt-0.5">
                      P
                    </div>
                    <div>
                      <strong className="text-red-400">PPE:</strong>{" "}
                      <span className="text-white/80">
                        Provide RPE for peak-exposure tasks (e.g. when LEV cannot be
                        positioned effectively); nitrile gloves when handling flux
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-white/50 text-xs mt-3 italic">
                  All five levels work together. If the LEV fails, the substituted
                  (less toxic) solder reduces risk, the time limits reduce exposure
                  duration, and RPE provides a final barrier.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 07 Monitoring Effectiveness of Controls ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">07</span>
              Monitoring Effectiveness of Controls
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Implementing controls is not a one-off task. COSHH Regulation 9
                requires employers to <strong>maintain, examine, and test</strong>{" "}
                control measures to ensure they remain effective. Controls that are
                not monitored will degrade over time and may give a false sense of
                security.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-3">
                  How to Monitor Controls
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Workplace exposure monitoring</strong> &mdash; measure
                      airborne concentrations of hazardous substances to confirm they
                      are below WELs. This provides objective evidence that controls
                      are working.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>LEV examination and testing</strong> &mdash; COSHH
                      Regulation 9 requires LEV to be examined and tested at least
                      every <strong>14 months</strong> (or 6 months for some specific
                      processes). Records must be kept for at least 5 years.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Health surveillance</strong> &mdash; regular health
                      checks for workers exposed to substances that cause identifiable
                      diseases (e.g. skin checks for dermatitis, lung function tests
                      for respiratory sensitisers).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>RPE face-fit testing</strong> &mdash; check that each
                      worker&rsquo;s RPE fits correctly. Re-test if the worker&rsquo;s
                      weight changes significantly, if they have dental work, or if a
                      different model of RPE is introduced.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Incident and near-miss review</strong> &mdash; analyse
                      any incidents involving hazardous substances to identify whether
                      controls failed and what improvements are needed.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Worker consultation</strong> &mdash; ask workers whether
                      they believe the controls are adequate. Workers are often the
                      first to notice when a control is not working properly (e.g.
                      &ldquo;the LEV doesn&rsquo;t seem to be pulling as
                      strongly&rdquo;).
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="text-violet-400 font-semibold mb-2">
                  When Controls Are Found to Be Inadequate
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  If monitoring reveals that controls are not adequate, the employer
                  must take immediate action:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Investigate the root cause of the control failure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Implement temporary additional controls (e.g. RPE) while the
                      primary control is repaired or improved
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Repair, replace, or upgrade the failed control as quickly as
                      possible
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Review the COSHH assessment and update it if the risk profile
                      has changed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Re-assess whether the task can move to a higher level of the
                      hierarchy
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── 08 Key Takeaways ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-violet-400/80 text-sm font-normal">08</span>
              Key Takeaways
            </h2>
            <div className="space-y-4 text-white">
              {/* Summary Box */}
              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="text-violet-400 font-semibold mb-3">Summary</h3>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>COSHH Regulation 7</strong> requires employers to prevent
                      exposure or, where that is not reasonably practicable, to
                      adequately control it using the hierarchy of control.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      The <strong>hierarchy has five levels</strong>: elimination,
                      substitution, engineering controls, administrative controls, and
                      PPE/RPE &mdash; always applied in that order.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Higher-level controls</strong> (elimination, substitution,
                      engineering) are more effective because they do not depend on
                      individual behaviour.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Collective protection</strong> (e.g. LEV, enclosure) is
                      always preferred over personal protection (e.g. RPE, gloves).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>PPE is always the last resort</strong> &mdash; it only
                      protects the individual wearing it and depends on correct
                      selection, fitting, training, and maintenance.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>SFAIRP</strong> means controls must be implemented unless
                      the cost is grossly disproportionate to the risk &mdash; the
                      burden of proof is on the employer.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      In practice, a <strong>layered approach</strong> combining
                      controls from multiple levels provides the most robust
                      protection.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Controls must be <strong>monitored, maintained, and reviewed</strong>{" "}
                      &mdash; LEV must be examined at least every 14 months and records
                      kept for 5 years.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Regulation Reference Box */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-violet-400 font-medium mb-2">
                  Key Regulations Covered
                </h3>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="text-violet-400 font-semibold flex-shrink-0">
                      Reg 7:
                    </span>
                    <span>
                      Prevention or adequate control of exposure to substances
                      hazardous to health
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-violet-400 font-semibold flex-shrink-0">
                      Reg 9:
                    </span>
                    <span>
                      Maintenance, examination, and testing of control measures
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-violet-400 font-semibold flex-shrink-0">
                      Reg 10:
                    </span>
                    <span>
                      Monitoring exposure at the workplace
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-violet-400 font-semibold flex-shrink-0">
                      Reg 11:
                    </span>
                    <span>
                      Health surveillance for exposed workers
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-violet-400/80 text-sm font-normal">09</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
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
            title="Hierarchy of Control Quiz"
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
            <Link to="../coshh-awareness-module-3-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Module 3 Section 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-4-section-2">
              Next: Engineering Controls in Detail
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
