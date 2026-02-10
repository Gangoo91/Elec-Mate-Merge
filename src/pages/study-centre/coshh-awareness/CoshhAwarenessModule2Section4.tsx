import { ArrowLeft, FlaskConical, CheckCircle, AlertTriangle, Wind } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "wel-definition",
    question:
      "What does a Workplace Exposure Limit (WEL) represent?",
    options: [
      "The maximum concentration of an airborne substance averaged over a reference period to which a worker may be exposed by inhalation",
      "The total amount of a substance that can be stored on site at any one time",
      "The minimum ventilation rate required in any enclosed workplace",
      "The maximum number of hours a worker may spend in a contaminated area per week",
    ],
    correctIndex: 0,
    explanation:
      "A WEL is the maximum concentration of an airborne substance, averaged over a specified reference period (8-hour TWA or 15-minute STEL), to which a worker may be exposed by inhalation. WELs are listed in EH40/2005 and have legal force under COSHH.",
  },
  {
    id: "stel-duration",
    question:
      "A Short-Term Exposure Limit (STEL) is averaged over what period?",
    options: [
      "1 minute",
      "5 minutes",
      "15 minutes",
      "1 hour",
    ],
    correctIndex: 2,
    explanation:
      "A STEL is a 15-minute reference period. It controls short-term peak exposures that could cause acute health effects even when the 8-hour TWA is within limits. No worker should be exposed above the STEL for any 15-minute period during a working day.",
  },
  {
    id: "skin-notation",
    question:
      "What does the 'Sk' notation mean next to a substance in EH40?",
    options: [
      "The substance is safe to handle with bare skin",
      "The substance can be absorbed through intact skin and this route of exposure contributes significantly to overall body burden",
      "The substance only affects the skin and does not cause systemic effects",
      "Skin contact with the substance is unlikely on a construction site",
    ],
    correctIndex: 1,
    explanation:
      "The 'Sk' (skin) notation in EH40 means the substance can be absorbed through intact skin in quantities that contribute significantly to the total body burden. Airborne exposure alone does not tell the full story — skin contact must also be prevented through appropriate PPE such as gloves and coveralls.",
  },
];

const faqs = [
  {
    question: "Where can I find the current list of WELs?",
    answer:
      "WELs are published in EH40/2005 'Workplace Exposure Limits' (4th edition, as amended), available free from the HSE website. The document is updated periodically — always check the HSE website for the latest version and any amendments. Your employer's COSHH assessments should also list the relevant WELs for the substances used on site. If you cannot find the WEL for a substance, the safety data sheet (SDS) provided by the manufacturer or supplier will normally quote the applicable WEL.",
  },
  {
    question:
      "If exposure is below the WEL, does that mean it is completely safe?",
    answer:
      "No. WELs do not guarantee safety for every individual. They are set at concentrations that are believed to be without significant risk to the health of most workers when exposure occurs day after day. However, individual susceptibility varies — some people may experience adverse effects at concentrations below the WEL due to pre-existing conditions, genetic factors, or sensitisation. COSHH requires employers to apply the principle of good practice and reduce exposure to as low as is reasonably practicable, even when below the WEL. Treating the WEL as a 'safe threshold' is a common and dangerous misconception.",
  },
  {
    question: "What is COSHH Essentials and how do I use it?",
    answer:
      "COSHH Essentials is a free online risk assessment tool provided by the HSE. You enter basic information about the substance (hazard classification from the safety data sheet), the quantity used, and how it is used (dustiness for solids, volatility for liquids). The tool then generates a 'control approach' — ranging from general ventilation (approach 1) to containment (approach 3) or specialist advice (approach 4). It also provides task-specific guidance sheets for common operations. It is particularly useful for small businesses and tradespeople who need practical control guidance without commissioning a full occupational hygiene assessment. Access it at coshh-tool.hse.gov.uk.",
  },
  {
    question:
      "What is the difference between personal sampling and static sampling?",
    answer:
      "Personal sampling measures the concentration of an airborne substance in the breathing zone of an individual worker. A small sampling pump is worn on the worker's belt with a filter or sorbent tube clipped to the lapel, close to the nose and mouth. The result represents the actual exposure of that worker during the sampling period. Static (or area) sampling places the sampling equipment at a fixed point in the workplace. It measures the general concentration in that area, which may be higher or lower than what a specific worker breathes depending on their movements and proximity to the source. Personal sampling is required for comparison with WELs because WELs relate to individual exposure, not area concentrations.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the 8-hour TWA WEL for inhalable dust (not otherwise specified)?",
    options: [
      "4 mg/m\u00B3",
      "10 mg/m\u00B3",
      "20 mg/m\u00B3",
      "1 mg/m\u00B3",
    ],
    correctAnswer: 1,
    explanation:
      "The 8-hour TWA WEL for inhalable dust (particles not otherwise specified \u2014 PNOS) is 10 mg/m\u00B3. This applies to nuisance dusts without a specific WEL. Respirable dust has a lower limit of 4 mg/m\u00B3 because finer particles penetrate deeper into the lungs.",
  },
  {
    id: 2,
    question:
      "What is the 8-hour TWA WEL for respirable crystalline silica (RCS)?",
    options: [
      "1 mg/m\u00B3",
      "0.5 mg/m\u00B3",
      "0.1 mg/m\u00B3",
      "0.01 mg/m\u00B3",
    ],
    correctAnswer: 2,
    explanation:
      "The WEL for RCS is 0.1 mg/m\u00B3 (8-hour TWA). RCS is generated when cutting, drilling, or grinding concrete, brick, stone, mortar, and similar materials. It causes silicosis and is classified as a lung carcinogen. Even at this low WEL, the principle of good practice requires exposure to be reduced as far as reasonably practicable.",
  },
  {
    id: 3,
    question:
      "Which unit of measurement is used for the WEL of gases and vapours?",
    options: [
      "mg/m\u00B3 only",
      "ppm only",
      "ppm (with mg/m\u00B3 also listed for reference)",
      "litres per minute",
    ],
    correctAnswer: 2,
    explanation:
      "WELs for gases and vapours are listed in ppm (parts per million), with the equivalent concentration in mg/m\u00B3 also provided. WELs for dusts and fumes are listed in mg/m\u00B3 only, because particulates do not behave as a true gas mixture and ppm is not an appropriate measure.",
  },
  {
    id: 4,
    question:
      "What should you do FIRST if air monitoring shows that the WEL for a substance has been exceeded?",
    options: [
      "Wait until the end of the shift and then report it",
      "Stop the work activity immediately and remove workers from the affected area",
      "Increase the working hours to dilute the average",
      "Issue additional RPE and continue working at the same rate",
    ],
    correctAnswer: 1,
    explanation:
      "If monitoring shows the WEL has been exceeded, the immediate priority is to stop the exposure. Workers must be removed from the affected area, the source of exposure must be identified, and the work activity must not resume until additional controls are in place to bring exposure below the WEL. Simply issuing RPE without investigating the root cause is not an adequate response.",
  },
  {
    id: 5,
    question:
      "What type of monitoring involves taking urine or blood samples from workers?",
    options: [
      "Personal air sampling",
      "Static air monitoring",
      "Biological monitoring",
      "Environmental impact assessment",
    ],
    correctAnswer: 2,
    explanation:
      "Biological monitoring involves analysing urine, blood, or exhaled breath samples from workers to measure the actual amount of a substance (or its metabolites) that has been absorbed into the body. It accounts for all routes of exposure \u2014 inhalation, skin absorption, and ingestion \u2014 and provides a more complete picture than air monitoring alone.",
  },
  {
    id: 6,
    question:
      "The WEL for welding fume (inhalable) was reduced in 2020. What is the current 8-hour TWA limit?",
    options: [
      "5 mg/m\u00B3",
      "3 mg/m\u00B3",
      "1 mg/m\u00B3",
      "0.5 mg/m\u00B3",
    ],
    correctAnswer: 2,
    explanation:
      "The WEL for welding fume (inhalable fraction) was reduced to 1 mg/m\u00B3 (8-hour TWA) in 2020 following the reclassification of all welding fume as a human carcinogen. This also means that all welding in enclosed or confined spaces now requires local exhaust ventilation (LEV) as a minimum, regardless of the duration of the task.",
  },
  {
    id: 7,
    question:
      "Which HSE publication provides guidance on air monitoring methods and strategies?",
    options: [
      "EH40/2005",
      "HSG173 'Monitoring Strategies for Toxic Substances'",
      "L8 Legionella ACOP",
      "HSG47 Avoiding Danger from Underground Services",
    ],
    correctAnswer: 1,
    explanation:
      "HSG173 'Monitoring Strategies for Toxic Substances' provides detailed guidance on how to plan and carry out air monitoring, including when monitoring is needed, how to select the right method, how to interpret results, and how to use monitoring data in COSHH assessments. EH40 lists the WELs themselves but does not cover monitoring methodology in detail.",
  },
  {
    id: 8,
    question:
      "COSHH requires employers to apply the 'principle of good practice'. What does this mean?",
    options: [
      "Employers only need to act if the WEL is exceeded",
      "Employers must keep exposure as low as reasonably practicable, even if already below the WEL",
      "Employers must eliminate all hazardous substances from the workplace",
      "Employers must carry out air monitoring every day",
    ],
    correctAnswer: 1,
    explanation:
      "The principle of good practice (Schedule 2A of COSHH) requires employers to minimise exposure by designing processes, using controls, and maintaining equipment so that exposure is kept as low as is reasonably practicable. Being below the WEL is a legal minimum, not a target. Good occupational hygiene means continually looking for ways to reduce exposure further.",
  },
];

export default function CoshhAwarenessModule2Section4() {
  useSEO({
    title:
      "Workplace Exposure Limits | COSHH Awareness Module 2.4",
    description:
      "What Workplace Exposure Limits (WELs) are, the difference between 8-hour TWA and 15-minute STEL, key construction WELs, air monitoring, biological monitoring, skin notation, and the principle of good practice under COSHH.",
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
            <Link to="../coshh-awareness-module-2">
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
            <Wind className="h-7 w-7 text-violet-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 mx-auto">
            <span className="text-violet-500 text-xs font-semibold">
              MODULE 2 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Workplace Exposure Limits
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How the law defines the maximum airborne concentration of hazardous
            substances &mdash; and why staying below the limit is only the
            starting point
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
                <strong>WEL:</strong> Maximum airborne concentration averaged
                over a reference period
              </li>
              <li>
                <strong>8-hr TWA:</strong> Typical working-day average exposure
              </li>
              <li>
                <strong>15-min STEL:</strong> Short-term peak exposure control
              </li>
              <li>
                <strong>Principle:</strong> Keep exposure as low as reasonably
                practicable
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Check:</strong> The SDS for the WEL before using any
                substance
              </li>
              <li>
                <strong>Control:</strong> Ventilation, extraction, wet methods
                first &mdash; RPE as last resort
              </li>
              <li>
                <strong>Monitor:</strong> Air monitoring may be needed for
                high-risk tasks
              </li>
              <li>
                <strong>Report:</strong> Any concerns about dust, fumes, or
                vapour levels immediately
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
              "Define what a Workplace Exposure Limit (WEL) is and explain its legal status under COSHH",
              "Distinguish between an 8-hour TWA and a 15-minute STEL and explain when each applies",
              "State key WELs relevant to the construction and electrical trades",
              "Explain what the 'Sk' (skin) notation means in EH40 and why it matters",
              "Describe the difference between personal air sampling and static sampling",
              "Explain biological monitoring and when it is used",
              "Outline the steps to take when a WEL is exceeded",
              "Apply the principle of good practice to reduce exposure below the WEL",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-violet-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Section 01 */}
        {/* ────────────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">01</span>
            What Are Workplace Exposure Limits?
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A Workplace Exposure Limit (WEL) is the{" "}
                <strong>
                  maximum concentration of an airborne substance, averaged over a
                  specified reference period, to which a worker may be exposed by
                  inhalation
                </strong>
                . WELs are the legal benchmark used in the United Kingdom to
                control exposure to hazardous substances in the air at work.
              </p>

              <p>
                WELs are published in{" "}
                <strong>EH40/2005 &lsquo;Workplace Exposure Limits&rsquo;</strong>{" "}
                (4th edition, as amended), produced by the Health and Safety
                Executive (HSE). This document is regularly updated to reflect
                new scientific evidence about the health effects of workplace
                substances. It has{" "}
                <strong>legal force under the COSHH Regulations 2002</strong>{" "}
                (as amended) &mdash; employers have a legal duty to ensure that
                exposure to substances with assigned WELs does not exceed those
                limits.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-500 mb-3">
                  Key Legal Points
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      WELs are{" "}
                      <strong className="text-white">legal limits</strong>, not
                      advisory guidelines &mdash; exceeding a WEL is a breach of
                      COSHH
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Employers must{" "}
                      <strong className="text-white">
                        prevent or adequately control
                      </strong>{" "}
                      exposure to hazardous substances &mdash; the WEL is the
                      upper boundary of &ldquo;adequate control&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Even when exposure is{" "}
                      <strong className="text-white">below</strong> the WEL, the
                      employer must still apply the{" "}
                      <strong className="text-white">
                        principle of good practice
                      </strong>{" "}
                      and reduce exposure as low as reasonably practicable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      For{" "}
                      <strong className="text-white">
                        carcinogens, mutagens, and asthmagens
                      </strong>
                      , the WEL is a maximum &mdash; exposure must be reduced as
                      far below the WEL as is practicable
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                It is essential to understand that a WEL is{" "}
                <strong>not a &ldquo;safe&rdquo; level</strong>. It is the
                concentration at which, based on current scientific knowledge,
                the risk to health is considered acceptable when exposure occurs
                repeatedly over a working lifetime. Some individuals may still
                experience adverse effects at concentrations below the WEL. The
                WEL is a{" "}
                <strong>ceiling, not a target</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  How WELs Are Set
                </p>
                <p className="text-sm text-white/80">
                  WELs are recommended by the{" "}
                  <strong className="text-white">
                    Advisory Committee on Toxic Substances (ACTS)
                  </strong>{" "}
                  and its sub-committee, the{" "}
                  <strong className="text-white">
                    Working Group on the Assessment of Toxic Chemicals (WATCH)
                  </strong>
                  . They review epidemiological studies, animal toxicology data,
                  and occupational health evidence to determine the concentration
                  at which significant risk to health is avoided. The process
                  also considers practicability &mdash; whether the limit can
                  realistically be achieved in industry using available control
                  measures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Section 02 */}
        {/* ────────────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">02</span>
            Two Types of WEL: TWA and STEL
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                EH40 assigns two types of WEL depending on the nature of the
                health risk. Some substances have both; some have only one.
                Understanding the difference is critical for interpreting
                monitoring results and planning work activities.
              </p>

              {/* TWA vs STEL Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-violet-500/20 border-b border-violet-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-violet-400">
                    TWA vs STEL Explanation
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                  {/* 8-hour TWA */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold">
                        8h
                      </span>
                      <p className="text-sm font-semibold text-violet-400">
                        8-Hour Time Weighted Average (TWA)
                      </p>
                    </div>
                    <div className="text-sm text-white/80 space-y-2">
                      <p>
                        The average concentration of a substance in the air over
                        an <strong className="text-white">8-hour working day</strong>.
                        It smooths out peaks and troughs &mdash; exposure may be
                        higher at some times and lower at others, but the
                        average across the full shift must not exceed the WEL.
                      </p>
                      <p>
                        <strong className="text-white">Example:</strong> A
                        worker spends 2 hours cutting concrete (high dust) and 6
                        hours on cable installation (low dust). The 8-hour TWA
                        takes both periods into account to calculate the average
                        concentration the worker was exposed to over the whole
                        shift.
                      </p>
                      <p>
                        <strong className="text-white">Reference period:</strong>{" "}
                        8 hours (even if the actual shift is shorter or longer
                        &mdash; calculations are adjusted to an 8-hour
                        equivalent).
                      </p>
                    </div>
                  </div>

                  {/* 15-minute STEL */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold">
                        15m
                      </span>
                      <p className="text-sm font-semibold text-violet-400">
                        15-Minute Short-Term Exposure Limit (STEL)
                      </p>
                    </div>
                    <div className="text-sm text-white/80 space-y-2">
                      <p>
                        The maximum average concentration over any{" "}
                        <strong className="text-white">15-minute period</strong>{" "}
                        during the working day. STELs are assigned to substances
                        that can cause acute (immediate) health effects from
                        short-term peak exposures &mdash; such as irritation,
                        narcosis, or sensitisation &mdash; even when the 8-hour
                        TWA is within limits.
                      </p>
                      <p>
                        <strong className="text-white">Example:</strong> Opening
                        a container of solvent in a poorly ventilated room may
                        cause a brief spike in vapour concentration. The STEL
                        ensures that even these short peaks are controlled.
                      </p>
                      <p>
                        <strong className="text-white">Reference period:</strong>{" "}
                        15 minutes. Exposures above the STEL must not occur at
                        any point during the shift.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visual timeline */}
                <div className="border-t border-white/10 p-4 sm:p-5">
                  <p className="text-xs font-medium text-white/50 mb-3 uppercase tracking-wider">
                    Shift Timeline Illustration
                  </p>
                  <div className="relative h-10 bg-white/5 rounded-lg overflow-hidden">
                    {/* 8-hour bar */}
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full h-4 bg-violet-500/10 rounded border border-violet-500/20 relative">
                        <div
                          className="absolute left-0 top-0 h-full bg-violet-500/30 rounded-l"
                          style={{ width: "25%" }}
                        />
                        <div
                          className="absolute top-0 h-full bg-red-500/40 border-x border-red-400/50"
                          style={{ left: "10%", width: "3%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-[10px] text-white/40 mt-1">
                    <span>0 hrs</span>
                    <span className="text-violet-400">
                      &larr; 8-hour TWA averaged across full shift &rarr;
                    </span>
                    <span>8 hrs</span>
                  </div>
                  <p className="text-[11px] text-white/50 mt-2">
                    <span className="inline-block w-3 h-2 bg-red-500/40 rounded mr-1" />
                    Peak exposure period &mdash; must not exceed the STEL for
                    any 15-minute window
                  </p>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-500">Key Point:</strong> A
                  substance may have a TWA only, a STEL only, or both. If only a
                  TWA is listed, short-term peaks should still be controlled
                  &mdash; HSE guidance states that peak exposures should not
                  exceed <strong>3 times the 8-hour TWA</strong> over a
                  15-minute period unless a specific STEL is assigned.
                </p>
              </div>

              <p>
                <strong>Measurement units:</strong> WELs for{" "}
                <strong>dusts and fumes</strong> are expressed in{" "}
                <strong>mg/m&sup3;</strong> (milligrams per cubic metre of air).
                WELs for <strong>gases and vapours</strong> are expressed in{" "}
                <strong>ppm</strong> (parts per million), with the equivalent
                mg/m&sup3; value also provided. The ppm unit describes the
                proportion of the substance in the air as a volume ratio,
                while mg/m&sup3; measures the actual mass of substance per
                unit volume of air.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Section 03 */}
        {/* ────────────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">03</span>
            Key WELs for Construction &amp; Electrical Work
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following table lists the WELs most commonly relevant to
                construction and electrical trade work. These are substances you
                are likely to encounter when chasing walls, cutting concrete,
                drilling into masonry, working in dusty environments, or working
                near welding, painting, or insulation activities.
              </p>

              {/* Common WELs Table */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-violet-500/20 border-b border-violet-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-violet-400">
                    Common WELs for Construction / Electrical Trades
                  </p>
                </div>

                {/* Table header */}
                <div className="grid grid-cols-[1fr_auto_auto] gap-1 px-4 py-2.5 border-b border-white/10 bg-white/5">
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                    Substance
                  </p>
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wider text-center min-w-[80px]">
                    8-hr TWA
                  </p>
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wider text-center min-w-[60px]">
                    Notes
                  </p>
                </div>

                {/* Table rows */}
                {[
                  {
                    substance: "Inhalable dust (PNOS)",
                    twa: "10 mg/m\u00B3",
                    notes: "\u2014",
                  },
                  {
                    substance: "Respirable dust (PNOS)",
                    twa: "4 mg/m\u00B3",
                    notes: "\u2014",
                  },
                  {
                    substance: "Respirable crystalline silica (RCS)",
                    twa: "0.1 mg/m\u00B3",
                    notes: "Carcinogen",
                  },
                  {
                    substance: "Wood dust (hardwood)",
                    twa: "3 mg/m\u00B3",
                    notes: "Carcinogen",
                  },
                  {
                    substance: "Wood dust (softwood)",
                    twa: "5 mg/m\u00B3",
                    notes: "\u2014",
                  },
                  {
                    substance: "Welding fume (inhalable)",
                    twa: "1 mg/m\u00B3",
                    notes: "Carcinogen",
                  },
                  {
                    substance: "Isocyanates (as NCO)",
                    twa: "0.02 mg/m\u00B3",
                    notes: "Sk, STEL 0.07",
                  },
                  {
                    substance: "Lead (inorganic, as Pb)",
                    twa: "0.15 mg/m\u00B3",
                    notes: "Bio. mon.",
                  },
                  {
                    substance: "Asbestos (all types)",
                    twa: "0.1 f/ml",
                    notes: "Carcinogen",
                  },
                  {
                    substance: "Carbon monoxide",
                    twa: "20 ppm",
                    notes: "STEL 100 ppm",
                  },
                  {
                    substance: "Nitrogen dioxide",
                    twa: "0.5 ppm",
                    notes: "STEL 1 ppm",
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-[1fr_auto_auto] gap-1 px-4 py-2.5 ${
                      i % 2 === 0 ? "bg-white/[0.02]" : ""
                    } ${
                      row.notes.includes("Carcinogen")
                        ? "border-l-2 border-red-500/50"
                        : ""
                    }`}
                  >
                    <p className="text-sm text-white/90">{row.substance}</p>
                    <p className="text-sm font-mono font-bold text-violet-400 text-center min-w-[80px]">
                      {row.twa}
                    </p>
                    <p
                      className={`text-xs text-center min-w-[60px] self-center ${
                        row.notes.includes("Carcinogen")
                          ? "text-red-400 font-medium"
                          : row.notes.includes("Sk")
                            ? "text-yellow-400 font-medium"
                            : "text-white/50"
                      }`}
                    >
                      {row.notes}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Carcinogens Require Extra Rigour
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Substances marked as{" "}
                  <strong className="text-white">carcinogens</strong> (RCS,
                  hardwood dust, welding fume, asbestos) require exposure to be
                  reduced as far below the WEL as is{" "}
                  <strong className="text-white">reasonably practicable</strong>.
                  The WEL is an absolute ceiling, not a &ldquo;safe&rdquo;
                  working level. For these substances, substitution and
                  engineering controls must always be considered before relying
                  on RPE.
                </p>
              </div>

              <p>
                <strong>Respirable crystalline silica (RCS)</strong> is
                particularly important for electricians. Chasing walls, cutting
                concrete blocks, drilling through mortar &mdash; all of these
                common tasks generate fine silica dust. The WEL of{" "}
                <strong>0.1 mg/m&sup3;</strong> is extremely low, and it is easy
                to exceed it without proper dust suppression (water or on-tool
                extraction) and respiratory protective equipment (RPE).
              </p>

              <p>
                <strong>Welding fume</strong> was reclassified as a human
                carcinogen in 2017, and the WEL was reduced to{" "}
                <strong>1 mg/m&sup3;</strong> in 2020. Even electricians who do
                not weld may be exposed to welding fume when working alongside
                steelworkers or fabricators on construction sites. If you can
                smell or see welding fume, you are being exposed.
              </p>

              <p>
                <strong>Isocyanates</strong> are found in two-part expanding
                foams, spray-applied coatings, and certain adhesives used in
                construction. They are potent respiratory sensitisers &mdash;
                once sensitised, even trace exposure can trigger severe
                asthma-like reactions. The WEL is very low
                (0.02&nbsp;mg/m&sup3;) and carries the &lsquo;Sk&rsquo;
                notation, meaning skin absorption is also a concern.
              </p>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Section 04 */}
        {/* ────────────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">04</span>
            Skin Notation &mdash; The &lsquo;Sk&rsquo; Warning
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Some entries in EH40 are marked with the notation{" "}
                <strong>&lsquo;Sk&rsquo;</strong>. This is a critical warning
                that the substance can be{" "}
                <strong>
                  absorbed through intact skin in significant quantities
                </strong>
                , contributing to the overall body burden of the chemical. When a
                substance carries the &lsquo;Sk&rsquo; notation, controlling
                inhalation exposure alone is{" "}
                <strong>not sufficient</strong> to protect the worker.
              </p>

              <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-yellow-400 mb-3">
                  Why Skin Notation Matters
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Air monitoring misses it
                      </strong>{" "}
                      &mdash; personal air sampling only measures what is in the
                      air. If a substance is being absorbed through the skin,
                      the air sample will{" "}
                      <em>underestimate total exposure</em>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Gloves and coveralls become essential
                      </strong>{" "}
                      &mdash; for &lsquo;Sk&rsquo; substances, skin protection is
                      not optional. The correct type of glove (chemical
                      permeation data must be checked) and protective clothing
                      must be provided and worn
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Biological monitoring may be needed
                      </strong>{" "}
                      &mdash; because air monitoring cannot capture the skin
                      absorption route, biological monitoring (blood or urine
                      tests) may be the only way to assess true exposure
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Common &lsquo;Sk&rsquo; Substances in Construction
                </p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80 mt-3">
                  <div className="flex items-start gap-2">
                    <FlaskConical className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Isocyanates</strong> &mdash;
                      expanding foams, spray coatings
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FlaskConical className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Epoxy resins</strong>{" "}
                      &mdash; two-part adhesives, floor coatings
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FlaskConical className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Organic solvents
                      </strong>{" "}
                      &mdash; degreasers, paint thinners, adhesive removers
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FlaskConical className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Certain pesticides
                      </strong>{" "}
                      &mdash; wood preservatives, anti-fungal treatments
                    </span>
                  </div>
                </div>
              </div>

              <p>
                The COSHH assessment for any &lsquo;Sk&rsquo; substance must
                address <strong>both</strong> inhalation and skin exposure. A
                risk assessment that only considers airborne concentration and
                ignores skin contact is incomplete and non-compliant.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Section 05 */}
        {/* ────────────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">05</span>
            Air Monitoring
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Air monitoring is the process of{" "}
                <strong>
                  measuring the concentration of airborne substances in the
                  workplace
                </strong>{" "}
                to determine whether WELs are being complied with and whether
                control measures are effective. Guidance on monitoring strategies
                is provided in{" "}
                <strong>
                  HSG173 &lsquo;Monitoring Strategies for Toxic
                  Substances&rsquo;
                </strong>
                .
              </p>

              <p>
                There are two principal methods of air sampling:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-violet-400 mb-2">
                    Personal Sampling
                  </p>
                  <p className="text-sm text-white/80 mb-2">
                    A small battery-powered{" "}
                    <strong className="text-white">sampling pump</strong> is
                    worn on the worker&rsquo;s belt. A{" "}
                    <strong className="text-white">
                      filter cassette or sorbent tube
                    </strong>{" "}
                    is clipped to the lapel, within the{" "}
                    <strong className="text-white">breathing zone</strong>{" "}
                    (approximately 30&nbsp;cm from the nose and mouth). Air is
                    drawn through the filter at a known flow rate for a measured
                    period.
                  </p>
                  <p className="text-xs text-violet-300/70">
                    Required for WEL compliance &mdash; measures individual
                    worker exposure
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Static (Area) Sampling
                  </p>
                  <p className="text-sm text-white/80 mb-2">
                    Sampling equipment is placed at a{" "}
                    <strong className="text-white">fixed location</strong> in
                    the workplace. It measures the general airborne
                    concentration in that area. Static sampling is useful for
                    identifying emission sources, checking the effectiveness of
                    ventilation, and mapping contamination across a site.
                  </p>
                  <p className="text-xs text-white/50">
                    Not sufficient for WEL compliance alone &mdash; does not
                    represent individual breathing-zone exposure
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Sampling Equipment
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <span>
                      <strong className="text-white">Sampling pump</strong>{" "}
                      &mdash; battery-powered pump calibrated to draw air at a
                      known flow rate (typically 1&ndash;4 litres per minute for
                      dust sampling)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <span>
                      <strong className="text-white">
                        Filter cassette
                      </strong>{" "}
                      &mdash; collects particulate matter (dust, fumes) on a
                      pre-weighed filter for gravimetric analysis
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <span>
                      <strong className="text-white">
                        Cyclone or size-selective sampler
                      </strong>{" "}
                      &mdash; separates respirable dust from the inhalable
                      fraction (needed when the WEL specifies a particle size,
                      e.g., respirable crystalline silica)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <span>
                      <strong className="text-white">Sorbent tube</strong>{" "}
                      &mdash; packed with an adsorbent material that traps gas
                      or vapour molecules for subsequent laboratory analysis
                      (used for organic vapours, isocyanates, etc.)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <span>
                      <strong className="text-white">
                        Direct-reading instrument
                      </strong>{" "}
                      &mdash; provides real-time concentration readings (e.g.,
                      dust monitors, photoionisation detectors for VOCs, gas
                      detectors for CO/NO&sub2;). Useful for immediate
                      assessment but may lack the precision of laboratory
                      analysis
                    </span>
                  </div>
                </div>
              </div>

              <p>
                After sampling, filters and tubes are sent to a{" "}
                <strong>UKAS-accredited laboratory</strong> for analysis. The
                laboratory determines the mass of substance collected, and the
                result is expressed as a concentration (mg/m&sup3; or ppm) by
                dividing the mass by the volume of air sampled. This figure is
                then compared to the relevant WEL.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-500">When Is Monitoring Required?</strong>{" "}
                  COSHH Regulation 10 requires air monitoring where it is
                  necessary to ensure the maintenance of adequate control, or to
                  protect the health of employees. In practice this includes:
                  tasks where significant exposure is likely, when a new process
                  or substance is introduced, after changes to work methods or
                  controls, and at regular intervals for substances listed in
                  Schedule 5 of COSHH (which specifies mandatory monitoring
                  frequencies for certain substances).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Section 06 */}
        {/* ────────────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">06</span>
            Biological Monitoring
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Biological monitoring measures the{" "}
                <strong>
                  actual amount of a substance or its metabolites in a
                  worker&rsquo;s body
                </strong>{" "}
                &mdash; typically through urine or blood samples, and
                occasionally through exhaled breath analysis. Unlike air
                monitoring, which only measures what is in the air, biological
                monitoring captures exposure from{" "}
                <strong>all routes</strong>: inhalation, skin absorption, and
                ingestion.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Biological Guidance Values (BGVs)
                </p>
                <p className="text-sm text-white/80 mb-3">
                  EH40 and associated HSE guidance publish{" "}
                  <strong className="text-white">
                    Biological Guidance Values
                  </strong>{" "}
                  for certain substances. A BGV is a reference concentration of
                  a substance (or its metabolite) in a biological sample that
                  corresponds to the WEL exposure level. Results above the BGV
                  indicate exposure is likely exceeding the WEL.
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Lead</strong> &mdash;
                      blood lead level must be monitored; action level is
                      50&nbsp;&micro;g/dL for men, 25&nbsp;&micro;g/dL for women
                      of reproductive capacity. Suspension from work is required
                      at 60/30&nbsp;&micro;g/dL respectively
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Isocyanates</strong>{" "}
                      &mdash; urinary metabolite testing (e.g., MDA for MDI
                      exposure) can confirm whether skin or inhalation exposure
                      is occurring
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Mercury</strong> &mdash;
                      urinary mercury levels are measured; the BGV is
                      20&nbsp;&micro;mol/mol creatinine
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Organic solvents</strong>{" "}
                      &mdash; urinary metabolites of common solvents (e.g.,
                      hippuric acid for toluene, mandelic acid for styrene) are
                      compared to BGVs
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-500">
                    When Is Biological Monitoring Used?
                  </strong>{" "}
                  Biological monitoring is most valuable when: the substance has
                  a significant skin absorption route (&lsquo;Sk&rsquo; notation);
                  air monitoring alone cannot reliably assess total exposure;
                  workers use RPE and you need to verify its effectiveness; the
                  substance has a long biological half-life and accumulates over
                  time; or regulatory requirements mandate it (e.g., lead work
                  under the Control of Lead at Work Regulations 2002).
                </p>
              </div>

              <p>
                Biological monitoring must be carried out by a qualified{" "}
                <strong>occupational health professional</strong> and the results
                must be interpreted in context. A single elevated result does not
                necessarily mean there is a problem &mdash; individual variation,
                diet, medication, and non-occupational exposure can all influence
                results. However, a pattern of elevated results across a group of
                workers is a strong indicator that workplace controls are
                inadequate.
              </p>

              <p>
                Workers must be informed of their individual biological
                monitoring results and must give{" "}
                <strong>informed consent</strong> before samples are taken.
                Results are{" "}
                <strong>confidential medical information</strong> and must not be
                shared with the employer in a way that identifies individuals
                without the worker&rsquo;s consent. The employer receives only
                group-level summaries and guidance on whether controls are
                adequate.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Section 07 */}
        {/* ────────────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">07</span>
            When the WEL Is Exceeded &mdash; Immediate Actions
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If air monitoring or any other assessment indicates that a WEL
                has been, or is likely to be, exceeded, the employer must take{" "}
                <strong>immediate corrective action</strong>. COSHH Regulation 7
                requires that exposure be prevented or, where this is not
                reasonably practicable, adequately controlled. An exceedance
                means that control has failed.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Immediate Steps When a WEL Is Exceeded
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <span>
                      <strong className="text-white">Stop the activity</strong>{" "}
                      &mdash; cease the work process that is generating the
                      exposure
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <span>
                      <strong className="text-white">
                        Remove workers from the area
                      </strong>{" "}
                      &mdash; evacuate anyone who may be exposed and restrict
                      access until conditions are safe
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <span>
                      <strong className="text-white">
                        Investigate the cause
                      </strong>{" "}
                      &mdash; determine why the exceedance occurred. Was
                      ventilation inadequate? Was an extraction system faulty?
                      Was the wrong work method used? Was RPE not worn or fitted
                      incorrectly?
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <span>
                      <strong className="text-white">
                        Implement additional controls
                      </strong>{" "}
                      &mdash; fix the root cause. This may mean repairing or
                      upgrading LEV, changing the work method, substituting a
                      less hazardous substance, or providing higher-specification
                      RPE
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <span>
                      <strong className="text-white">
                        Re-monitor after changes
                      </strong>{" "}
                      &mdash; verify that the new controls are effective before
                      resuming normal work. Repeat monitoring to confirm
                      exposure is now below the WEL
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      6
                    </span>
                    <span>
                      <strong className="text-white">
                        Health surveillance
                      </strong>{" "}
                      &mdash; if workers were exposed above the WEL, ensure they
                      are referred for appropriate health surveillance (e.g.,
                      lung function testing, biological monitoring, medical
                      review)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      7
                    </span>
                    <span>
                      <strong className="text-white">
                        Record and report
                      </strong>{" "}
                      &mdash; document the exceedance, investigation findings,
                      corrective actions, and re-monitoring results. RIDDOR
                      reporting may be required if the exceedance resulted in
                      occupational disease or acute ill health
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-500">
                    Your Responsibility as a Worker:
                  </strong>{" "}
                  If you believe that exposure levels are excessive &mdash; for
                  example, you can see a thick dust cloud, smell strong chemical
                  vapours, or notice that extraction equipment is not working
                  &mdash; you must{" "}
                  <strong>
                    stop work and report it to your supervisor immediately
                  </strong>
                  . You do not need to wait for formal air monitoring results to
                  raise a concern. Under Section 7 of the Health and Safety at
                  Work etc. Act 1974, you have a duty to take reasonable care of
                  yourself and others, and you have the right to refuse to work
                  in conditions you reasonably believe to be dangerous.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Section 08 */}
        {/* ────────────────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-500/80 text-sm font-normal">08</span>
            Limitations of WELs &amp; the Principle of Good Practice
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                WELs are an essential tool for controlling workplace exposure,
                but they have{" "}
                <strong>important limitations</strong> that every worker and
                employer must understand.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Limitations of WELs
                </p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Not a Guarantee of Safety
                      </p>
                      <p>
                        WELs are set at levels believed to avoid{" "}
                        <em>significant</em> risk to the health of{" "}
                        <em>most</em> workers. &ldquo;Most&rdquo; does not mean
                        &ldquo;all&rdquo;. Individual susceptibility varies
                        &mdash; some people may develop adverse effects at
                        concentrations below the WEL due to genetic factors,
                        pre-existing respiratory conditions, sensitisation, or
                        other personal factors.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Mixed Exposures
                      </p>
                      <p>
                        WELs are set for individual substances. In real
                        workplaces, workers are often exposed to{" "}
                        <strong className="text-white">
                          multiple substances simultaneously
                        </strong>
                        . The combined effect may be greater than the effect of
                        any single substance alone (additive or synergistic
                        effects). A worker exposed to three substances, each at
                        50% of their WEL, may still be at risk even though no
                        individual WEL is exceeded.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Inhalation Only
                      </p>
                      <p>
                        WELs relate to airborne concentrations &mdash; they
                        measure exposure by inhalation only. They do not account
                        for skin absorption (hence the need for the &lsquo;Sk&rsquo;
                        notation) or ingestion (e.g., eating or drinking with
                        contaminated hands). Total body burden may be higher
                        than air monitoring suggests.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Lag in Scientific Knowledge
                      </p>
                      <p>
                        WELs are based on the best available evidence at the
                        time they are set. New research may later show that a
                        substance is more harmful than previously thought
                        &mdash; as happened with welding fume (reclassified as
                        carcinogenic in 2017, WEL reduced in 2020) and
                        respirable crystalline silica. A substance being below
                        its current WEL does not guarantee it will remain
                        &ldquo;safe&rdquo; by future standards.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-white font-medium">
                        Not All Substances Have WELs
                      </p>
                      <p>
                        EH40 lists WELs for approximately 500 substances, but
                        there are thousands of chemicals used in workplaces
                        without assigned WELs. The absence of a WEL does not
                        mean a substance is safe &mdash; it may simply mean that
                        insufficient data exists or that it has not yet been
                        assessed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-500 mb-3">
                  The Principle of Good Practice (Schedule 2A, COSHH)
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Because WELs do not guarantee safety, COSHH imposes the{" "}
                  <strong className="text-white">
                    principle of good practice
                  </strong>
                  . This requires employers to:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Design and operate processes and activities to{" "}
                      <strong className="text-white">minimise</strong>{" "}
                      emission and spread of substances
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Take into account{" "}
                      <strong className="text-white">all routes</strong> of
                      exposure (inhalation, skin, ingestion)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Apply control measures{" "}
                      <strong className="text-white">
                        proportionate to the health risk
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Choose the most effective and reliable control option
                      &mdash;{" "}
                      <strong className="text-white">
                        elimination and substitution first
                      </strong>
                      , then engineering controls, then administrative controls,
                      with RPE as a last resort
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Regularly{" "}
                      <strong className="text-white">
                        review and update
                      </strong>{" "}
                      control measures in light of new knowledge, monitoring
                      data, and changes to work activities
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Provide{" "}
                      <strong className="text-white">
                        information, instruction, and training
                      </strong>{" "}
                      to all workers on the hazards and controls
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In practical terms, the principle of good practice means you
                should <strong>never aim for the WEL</strong>. If you can
                reduce exposure further by using a wet-cutting method instead of
                dry-cutting, by upgrading extraction equipment, by scheduling
                dusty work for when fewer people are present, or by substituting
                a less hazardous product &mdash; you should do so, even if
                current exposure is below the WEL.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  COSHH Essentials &mdash; HSE&rsquo;s Free Online Tool
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The HSE provides a free web-based tool called{" "}
                  <strong className="text-white">COSHH Essentials</strong>{" "}
                  (coshh-tool.hse.gov.uk) that helps employers and
                  tradespeople carry out practical COSHH risk assessments. You
                  enter the substance&rsquo;s hazard information (from the safety
                  data sheet), the amount used, and the dustiness or volatility
                  of the material. The tool generates:
                </p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>A recommended control approach (1&ndash;4)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Task-specific guidance sheets for common operations
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Practical advice on ventilation, containment, and PPE
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>
                      A printable record for your COSHH assessment file
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-500">
                    The Bottom Line:
                  </strong>{" "}
                  Workplace Exposure Limits are the legal maximum &mdash; they
                  are the line you must not cross. But good occupational hygiene
                  means aiming much lower. The principle of good practice, the
                  hierarchy of control, and tools like COSHH Essentials exist to
                  help you go beyond mere compliance and genuinely protect the
                  long-term health of everyone on site.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────── */}
        {/* FAQ Section */}
        {/* ────────────────────────────────────────────────────────────── */}
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

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Quiz */}
        {/* ────────────────────────────────────────────────────────────── */}
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* ────────────────────────────────────────────────────────────── */}
        {/* Bottom Navigation */}
        {/* ────────────────────────────────────────────────────────────── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-2-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-3">
              Next: Module 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
