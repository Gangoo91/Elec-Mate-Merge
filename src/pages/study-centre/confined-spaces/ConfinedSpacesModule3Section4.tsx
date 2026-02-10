import { ArrowLeft, Fan, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "positive-vs-negative",
    question:
      "What is the key difference between positive pressure ventilation and negative pressure ventilation in a confined space?",
    options: [
      "Positive pressure blows clean air into the space; negative pressure extracts contaminated air out",
      "Positive pressure uses larger fans; negative pressure uses smaller fans",
      "Positive pressure is only for flammable atmospheres; negative pressure is only for toxic atmospheres",
      "There is no practical difference — both terms describe the same technique",
    ],
    correctIndex: 0,
    explanation:
      "Positive pressure ventilation blows clean air INTO the confined space, diluting contaminants and slightly pressurising the space to prevent ingress of hazardous gases. Negative pressure ventilation extracts contaminated air OUT of the space, drawing fresh air in through the entry point. The choice depends on the hazard type, location of the contaminant source, and whether you need to prevent contamination spreading to surrounding areas.",
  },
  {
    id: "heavier-than-air",
    question:
      "When ventilating a confined space that contains a heavier-than-air gas, where should the ventilation duct be directed?",
    options: [
      "To the top of the space, because hot air rises",
      "To the bottom of the space, because the gas settles at the lowest point",
      "Across the middle of the space for even distribution",
      "It does not matter — the fan will circulate air throughout the space regardless",
    ],
    correctIndex: 1,
    explanation:
      "Heavier-than-air gases (such as hydrogen sulphide, carbon dioxide, and LPG) settle at the lowest points in a confined space. The ventilation duct must be directed to the bottom of the space to displace or extract these gases effectively. Placing the duct at the top would leave the dangerous gas layer undisturbed at floor level, where workers are most at risk.",
  },
  {
    id: "atex-equipment",
    question:
      "Why must ventilation equipment used in a potentially flammable atmosphere be ATEX-rated?",
    options: [
      "ATEX equipment is more powerful and moves air faster",
      "Standard electrical equipment could produce sparks or hot surfaces that ignite a flammable atmosphere",
      "ATEX-rated equipment is quieter and more comfortable for workers",
      "It is only a recommendation, not a legal requirement",
    ],
    correctIndex: 1,
    explanation:
      "In a potentially flammable or explosive atmosphere, standard electrical equipment (fans, blowers, lighting) could produce sparks from motors, switches, or static discharge, or develop hot surfaces — any of which could ignite the flammable gas or vapour and cause an explosion. ATEX-rated (Atmospheres Explosibles) equipment is designed and certified to operate safely in such environments. Using ATEX-rated equipment in explosive atmospheres is a legal requirement under the Dangerous Substances and Explosive Atmospheres Regulations 2002 (DSEAR).",
  },
];

const faqs = [
  {
    question:
      "How long should ventilation run before entry into a confined space?",
    answer:
      "There is no single fixed time that applies to all situations. The ventilation must run for long enough to achieve a safe atmosphere, which is confirmed by atmospheric monitoring — not by time alone. As a general guide, you should aim for a minimum of 5 to 10 complete air changes before entry, but the only reliable confirmation is a four-gas monitor reading that shows oxygen between 19.5% and 23.5%, no toxic gases above their Workplace Exposure Limits (WELs), and no flammable gases above 10% of their Lower Explosive Limit (LEL). Never rely solely on a time-based assumption — always monitor and verify.",
  },
  {
    question:
      "Can natural ventilation ever be sufficient for confined space entry?",
    answer:
      "In very limited circumstances, natural ventilation may be adequate — for example, in a large, open-topped chamber with good cross-ventilation from wind, where no hazardous substances are present or likely to be introduced by the work. However, natural ventilation is inherently unreliable because it depends on wind speed, direction, and temperature differentials, none of which can be controlled. For most confined space entries, mechanical ventilation is required because it provides a controlled, measurable, and consistent airflow. Even when natural ventilation appears adequate, continuous atmospheric monitoring must still be carried out to confirm that the atmosphere remains safe throughout the work.",
  },
  {
    question:
      "What happens if the ventilation system fails during work inside a confined space?",
    answer:
      "If the ventilation system fails, workers must evacuate the confined space immediately using the pre-planned emergency procedures. Ventilation failure means the atmosphere is no longer being maintained in a safe condition and contaminants could rapidly build up to dangerous levels. The safe system of work should include procedures for ventilation failure, and the standby person (top person) must be trained to recognise and respond to this scenario. Work must not resume until the ventilation system has been repaired, restarted, and atmospheric monitoring has confirmed the space is safe again. This is why continuous atmospheric monitoring is essential — it provides the early warning that the atmosphere is deteriorating.",
  },
  {
    question:
      "Is it always necessary to ventilate a confined space, or can RPE be used instead?",
    answer:
      "Ventilation is always the preferred first measure because it addresses the hazard at source by removing or diluting the contaminant for everyone in the space. However, there are situations where ventilation alone is insufficient — for example, where the contaminant concentration is too high, the substance is extremely toxic (such as certain chemical vapours), or the space cannot be effectively ventilated due to its geometry. In these cases, respiratory protective equipment (RPE) or breathing apparatus (BA) is required in addition to or instead of ventilation. The hierarchy of control applies: eliminate, substitute, engineer (ventilation), then RPE as the last line of defence. The risk assessment and method statement must specify exactly what combination of ventilation and RPE is required for each entry.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the primary purpose of ventilating a confined space before and during entry?",
    options: [
      "To cool the space down for worker comfort",
      "To remove or dilute atmospheric contaminants and maintain a breathable atmosphere",
      "To dry out any standing water in the space",
      "To create positive pressure so the entry hatch stays open",
    ],
    correctAnswer: 1,
    explanation:
      "The primary purpose of ventilation in confined spaces is to remove or dilute atmospheric contaminants (toxic gases, flammable vapours, oxygen-depleting substances) and maintain a breathable atmosphere with oxygen levels between 19.5% and 23.5%. Whilst ventilation may also provide cooling, this is a secondary benefit — the critical function is ensuring the atmosphere is safe for workers to breathe.",
  },
  {
    id: 2,
    question:
      "Which ventilation method is generally preferred for most confined space entries?",
    options: [
      "Natural ventilation through open hatches",
      "Negative pressure ventilation (extraction only)",
      "Positive pressure ventilation (blowing clean air in)",
      "Recirculation of existing air within the space",
    ],
    correctAnswer: 2,
    explanation:
      "Positive pressure ventilation — blowing clean air into the space — is the preferred method for most confined space entries. It dilutes contaminants throughout the space, provides a continuous supply of fresh air, slightly pressurises the space to help prevent ingress of external contaminants, and is effective for a wide range of hazard types. Negative pressure may be preferred in specific situations (e.g. known contaminant source), but positive pressure is the default choice.",
  },
  {
    id: 3,
    question:
      "When positioning a ventilation duct to remove a lighter-than-air gas from a confined space, where should the duct outlet be directed?",
    options: [
      "To the bottom of the space",
      "Across the middle of the space at working height",
      "To the top of the space, where the gas accumulates",
      "Outside the space pointing upwards",
    ],
    correctAnswer: 2,
    explanation:
      "Lighter-than-air gases (such as methane and hydrogen) rise and accumulate at the highest points within a confined space. The ventilation duct must be directed to the top of the space to displace or extract these gases from where they collect. Directing the duct to the bottom would leave the dangerous gas pocket undisturbed at ceiling level.",
  },
  {
    id: 4,
    question:
      "What is the most critical factor when selecting the air intake position for a ventilation system?",
    options: [
      "The intake must be close to the confined space entry point for convenience",
      "The intake must draw air from a clean source, away from exhausts, contaminants, and traffic",
      "The intake must be at ground level to draw in the coolest air",
      "The intake position does not matter as long as the fan is powerful enough",
    ],
    correctAnswer: 1,
    explanation:
      "The air intake must draw from a CLEAN source — positioned well away from vehicle exhausts, generator fumes, chemical storage, dust, and any other source of contamination. If the intake air is contaminated, the ventilation system will actively pump hazardous substances INTO the confined space, creating a more dangerous situation than having no ventilation at all. This is one of the most common and most dangerous mistakes in confined space ventilation.",
  },
  {
    id: 5,
    question:
      "How should the effectiveness of ventilation in a confined space be verified?",
    options: [
      "By checking that the fan is running and you can feel air movement",
      "By timing how long the fan has been running and comparing to a standard chart",
      "By continuous atmospheric monitoring using a calibrated four-gas monitor",
      "By asking workers inside the space if the air feels fresh",
    ],
    correctAnswer: 2,
    explanation:
      "The ONLY reliable way to verify that ventilation is effective is through continuous atmospheric monitoring using a calibrated four-gas monitor. Feeling air movement confirms the fan is running, but not that contaminant levels are safe. Time-based calculations are estimates, not measurements. Subjective assessment by workers is unreliable — many toxic gases are odourless and undetectable by human senses. Continuous monitoring provides real-time, objective data on oxygen levels, toxic gas concentrations, and flammable gas levels.",
  },
  {
    id: 6,
    question:
      "What type of ventilation ducting must be used in a confined space with a potentially flammable atmosphere?",
    options: [
      "Standard PVC flexible ducting",
      "Anti-static ducting to prevent static discharge, with ATEX-rated fan equipment",
      "Metal rigid ducting only",
      "Any available ducting — the fan type is more important than the duct material",
    ],
    correctAnswer: 1,
    explanation:
      "In a potentially flammable or explosive atmosphere, anti-static ducting must be used to prevent the build-up and discharge of static electricity, which could provide an ignition source. The ducting must be properly earthed, and all ventilation equipment (fans, blowers, motors) must be ATEX-rated — designed and certified to operate safely without producing sparks or hot surfaces. Using standard PVC ducting in a flammable atmosphere could generate static charges as air passes through, creating a serious explosion risk.",
  },
  {
    id: 7,
    question:
      "A confined space has a volume of 20 m³. If the recommended minimum is 5 air changes per hour, what is the minimum required airflow rate?",
    options: [
      "4 m³ per hour",
      "25 m³ per hour",
      "100 m³ per hour",
      "500 m³ per hour",
    ],
    correctAnswer: 2,
    explanation:
      "The required airflow rate is calculated by multiplying the space volume by the number of air changes per hour: 20 m³ × 5 air changes/hour = 100 m³/hour. In practice, the actual air change rate needed may be much higher depending on the type and concentration of contaminants, the work being carried out, and the number of workers in the space. Five air changes per hour is a general minimum starting point — many situations require 10, 20, or more air changes per hour.",
  },
  {
    id: 8,
    question:
      "Which of the following is a common mistake when ventilating a confined space?",
    options: [
      "Using a fan that is too powerful for the space",
      "Positioning the air intake near a running generator or vehicle exhaust",
      "Running the ventilation system continuously during work",
      "Using atmospheric monitoring to verify ventilation effectiveness",
    ],
    correctAnswer: 1,
    explanation:
      "Positioning the air intake near a source of contamination (such as a running generator, vehicle exhaust, or chemical store) is one of the most common and most dangerous mistakes in confined space ventilation. The system actively pumps contaminated air into the space, potentially introducing carbon monoxide, diesel fumes, or chemical vapours. The intake must always be positioned in clean air, well away from any potential source of contamination, and the air quality should be verified by monitoring inside the space.",
  },
];

export default function ConfinedSpacesModule3Section4() {
  useSEO({
    title:
      "Ventilation in Confined Spaces | Confined Spaces Module 3.4",
    description:
      "Positive and negative pressure ventilation, air change rate calculations, duct placement for heavier and lighter-than-air gases, ATEX-rated equipment, and monitoring ventilation effectiveness.",
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
            <Link to="../confined-spaces-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-400/20 border border-cyan-500/30 mb-4">
            <Fan className="h-7 w-7 text-cyan-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3 mx-auto">
            <span className="text-cyan-500 text-xs font-semibold">
              MODULE 3 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Ventilation in Confined Spaces
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Why ventilation is critical, how to choose between positive and
            negative pressure systems, duct placement strategies, and how to
            verify that ventilation is actually working
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Purpose:</strong> Remove contaminants, maintain
                breathable atmosphere
              </li>
              <li>
                <strong>Preferred method:</strong> Positive pressure (blowing
                clean air in)
              </li>
              <li>
                <strong>Clean intake:</strong> Away from exhausts, traffic,
                chemical stores
              </li>
              <li>
                <strong>Verify with monitoring:</strong> Never rely on
                ventilation alone
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Heavy gases:</strong> Direct duct to the bottom of the
                space
              </li>
              <li>
                <strong>Light gases:</strong> Direct duct to the top of the
                space
              </li>
              <li>
                <strong>Flammable risk:</strong> ATEX-rated fans &amp;
                anti-static ducting
              </li>
              <li>
                <strong>Always monitor:</strong> Continuous four-gas readings
                throughout
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
              "Explain why ventilation is critical for safe confined space entry and work",
              "Distinguish between natural and mechanical ventilation and their limitations",
              "Describe positive pressure and negative pressure ventilation and when each is preferred",
              "Calculate minimum airflow rates using air change rate principles",
              "Identify correct duct placement for heavier-than-air and lighter-than-air gases",
              "Specify equipment requirements including ATEX-rated fans and anti-static ducting for flammable atmospheres",
              "Explain why continuous atmospheric monitoring is essential to verify ventilation effectiveness",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-cyan-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Ventilation Is Critical */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">01</span>
            Why Ventilation Is Critical
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Confined spaces are, by definition, enclosed or substantially
                enclosed environments where the natural movement of air is
                severely restricted. Without intervention, the atmosphere inside
                a confined space can become <strong>immediately dangerous to
                life and health (IDLH)</strong> through three primary
                mechanisms: the build-up of toxic gases, the accumulation of
                flammable vapours, and the depletion of oxygen.
              </p>

              <p>
                Ventilation is the primary engineering control used to create and
                maintain a <strong>safe, breathable atmosphere</strong> inside a
                confined space. It serves several critical functions
                simultaneously:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Critical Functions of Ventilation
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Removing toxic contaminants
                      </strong>{" "}
                      &mdash; displacing or diluting gases such as hydrogen
                      sulphide (H&sub2;S), carbon monoxide (CO), and carbon
                      dioxide (CO&sub2;) to below their Workplace Exposure
                      Limits (WELs)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reducing flammable concentrations
                      </strong>{" "}
                      &mdash; keeping flammable gas and vapour levels well below
                      their Lower Explosive Limit (LEL), typically below 10% LEL
                      as the safe working threshold
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Maintaining oxygen levels
                      </strong>{" "}
                      &mdash; ensuring the atmosphere contains between 19.5% and
                      23.5% oxygen by volume, the safe range for human
                      respiration
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Providing cooling
                      </strong>{" "}
                      &mdash; reducing heat build-up in enclosed spaces,
                      particularly during physical work or in spaces exposed to
                      heat sources such as industrial processes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Preventing re-accumulation
                      </strong>{" "}
                      &mdash; continuous ventilation during work prevents
                      contaminants from building up again after the initial
                      purge, particularly where the work itself generates fumes
                      (e.g. welding, painting, solvent use)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Fatal Risk
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Failure to ventilate a confined space has been a direct cause
                  of multiple fatalities in the UK. Workers have died within
                  seconds of entering spaces containing oxygen-depleted or toxic
                  atmospheres. The{" "}
                  <strong>
                    Approved Code of Practice (ACOP L101)
                  </strong>{" "}
                  accompanying the Confined Spaces Regulations 1997 is clear:
                  where atmospheric hazards are identified, ventilation is a
                  fundamental part of the safe system of work. It is not
                  optional.
                </p>
              </div>

              <p>
                Ventilation is placed high on the hierarchy of control for
                confined space work because it is an{" "}
                <strong>engineering control</strong> &mdash; it addresses the
                hazard at source by physically changing the atmosphere, rather
                than relying on personal protective equipment (RPE) as the sole
                line of defence. However, ventilation must always be{" "}
                <strong>verified by continuous atmospheric monitoring</strong>.
                A fan running does not guarantee that the atmosphere is safe
                &mdash; only a calibrated four-gas monitor can confirm that.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Natural Ventilation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">02</span>
            Natural Ventilation
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Natural ventilation relies on <strong>wind, convection
                currents, and temperature differentials</strong> to move air
                through a space without the use of mechanical equipment. In
                theory, if a confined space has large openings at different
                levels and is exposed to prevailing wind, air movement may occur
                naturally. However, in the context of confined space work, natural
                ventilation has <strong>severe limitations</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  When Natural Ventilation May Be Adequate
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      The space has <strong className="text-white">
                        large, unobstructed openings
                      </strong>{" "}
                      at multiple levels (top and bottom) allowing through-flow
                      of air
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      There is <strong className="text-white">
                        consistent wind
                      </strong>{" "}
                      driving air through the openings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      No hazardous substances are present, and the work being
                      carried out does{" "}
                      <strong className="text-white">
                        not generate fumes
                      </strong>{" "}
                      or deplete oxygen
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      Atmospheric monitoring{" "}
                      <strong className="text-white">
                        confirms safe conditions
                      </strong>{" "}
                      throughout the duration of work
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">
                  Limitations of Natural Ventilation
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Unreliable:</strong> Wind
                      speed and direction change constantly and cannot be
                      controlled
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Uncontrollable:</strong>{" "}
                      Cannot be increased, directed, or adjusted to target
                      specific areas within the space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Unmeasurable:</strong>{" "}
                      Difficult to quantify the air change rate being achieved
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Ineffective for enclosed spaces:</strong>{" "}
                      Most confined spaces have limited openings — a single
                      manhole, a hatch, or a narrow access point — which
                      prevents effective natural air movement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cannot displace stratified gases:</strong>{" "}
                      Heavier-than-air gases that have settled at the bottom of a
                      space will not be displaced by gentle air currents alone
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">Key Point:</strong> For the
                  vast majority of confined space entries, natural ventilation is{" "}
                  <strong>not sufficient</strong>. The ACOP L101 states that
                  where atmospheric hazards exist or could develop, mechanical
                  ventilation should be provided. Natural ventilation should only
                  be relied upon where the risk assessment specifically
                  demonstrates it is adequate — and even then, continuous
                  atmospheric monitoring is mandatory.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Mechanical/Forced Ventilation — Positive Pressure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">03</span>
            Positive Pressure Ventilation
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Positive pressure ventilation (PPV)</strong> involves
                using a powered fan or blower to{" "}
                <strong>blow clean, fresh air into the confined space</strong>.
                The fan is positioned outside the space, drawing clean air from
                a safe location, and ducting directs the airflow into the space.
                As fresh air is forced in, the contaminated air is displaced and
                pushed out through the entry point or other openings.
              </p>

              <p>
                Positive pressure ventilation is the{" "}
                <strong>preferred method for most confined space entries</strong>{" "}
                because of its significant advantages:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Advantages of Positive Pressure Ventilation
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Dilutes contaminants throughout the entire space
                      </strong>{" "}
                      &mdash; fresh air mixes with and reduces the concentration
                      of toxic or flammable gases across the whole volume
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Prevents ingress of external contaminants
                      </strong>{" "}
                      &mdash; the slight positive pressure inside the space
                      resists the entry of gases from the surrounding
                      environment (e.g. from connected pipework or adjacent
                      chambers)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Provides continuous fresh air supply
                      </strong>{" "}
                      &mdash; workers always have a stream of clean air flowing
                      towards them
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Simple to set up and operate
                      </strong>{" "}
                      &mdash; fan outside the space blowing air in through
                      flexible ducting; no complex extraction requirements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Effective for general atmospheric improvement
                      </strong>{" "}
                      &mdash; works well when there is no single point source of
                      contamination and the aim is to improve the overall
                      atmosphere
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  How Positive Pressure Works
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The fan draws clean air from outside, pushes it through the
                  ducting and into the space. The incoming air creates a slight
                  overpressure. Contaminated air is then pushed out through the
                  entry point, vents, or other openings. The continuous flow
                  ensures that as contaminants are produced (e.g. from residues,
                  work activities, or seepage), they are constantly diluted and
                  flushed out.
                </p>
                <p className="text-sm text-white/80">
                  For maximum effectiveness, the duct outlet should be
                  positioned to direct clean air towards the{" "}
                  <strong className="text-white">
                    area where contaminants are most concentrated
                  </strong>{" "}
                  or where workers are located. The exhaust path (where
                  contaminated air exits) should be as far from the duct outlet
                  as possible to avoid short-circuiting the airflow.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Diagram: Positive vs Negative Pressure Ventilation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">&mdash;</span>
            Positive vs Negative Pressure Ventilation
          </h2>
          <div className="bg-white/5 border border-cyan-500/30 rounded-xl p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[320px] grid md:grid-cols-2 gap-6">
              {/* Positive Pressure Diagram */}
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-cyan-500/30 to-cyan-400/20 border border-cyan-500/40 rounded-lg px-4 py-2.5 text-center">
                  <p className="text-cyan-400 font-semibold text-sm">POSITIVE PRESSURE</p>
                  <p className="text-white/60 text-xs">Blowing Clean Air In</p>
                </div>

                {/* Visual representation */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 relative">
                  {/* Fan outside */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-green-500/20 border border-green-500/40 rounded-lg px-3 py-2 text-center">
                      <p className="text-green-400 text-xs font-bold">FAN</p>
                      <p className="text-white/50 text-[10px]">Outside</p>
                    </div>
                    <div className="flex-1 flex items-center">
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-green-400/60 to-cyan-400/60" />
                      <span className="text-green-400 text-xs mx-1">&rarr;</span>
                      <span className="text-[10px] text-white/50">Clean air in via duct</span>
                    </div>
                  </div>

                  {/* Confined space box */}
                  <div className="bg-cyan-500/10 border-2 border-dashed border-cyan-500/30 rounded-lg p-3 mb-3">
                    <p className="text-cyan-400 text-xs font-bold text-center mb-2">CONFINED SPACE</p>
                    <div className="flex items-center justify-center gap-2 text-[10px] text-white/60">
                      <span className="text-green-400">&rarr;</span>
                      <span>Fresh air dilutes contaminants</span>
                      <span className="text-green-400">&rarr;</span>
                    </div>
                    <p className="text-[10px] text-cyan-400/60 text-center mt-1">Slight positive pressure (+)</p>
                  </div>

                  {/* Exhaust path */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/50">Contaminated air exits</span>
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-red-400/30 to-red-400/60" />
                    <span className="text-red-400/60 text-xs">&rarr;</span>
                    <div className="bg-red-500/10 border border-red-500/30 rounded px-2 py-1">
                      <p className="text-red-400/60 text-[10px]">OUT</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-white/70">
                  <p className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    Preferred for most entries
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    Prevents contaminant ingress
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    Dilutes all contaminants in the space
                  </p>
                </div>
              </div>

              {/* Negative Pressure Diagram */}
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-amber-500/30 to-amber-400/20 border border-amber-500/40 rounded-lg px-4 py-2.5 text-center">
                  <p className="text-amber-400 font-semibold text-sm">NEGATIVE PRESSURE</p>
                  <p className="text-white/60 text-xs">Extracting Contaminated Air Out</p>
                </div>

                {/* Visual representation */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 relative">
                  {/* Fresh air entry */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-green-500/10 border border-green-500/30 rounded px-2 py-1">
                      <p className="text-green-400/60 text-[10px]">IN</p>
                    </div>
                    <span className="text-green-400/60 text-xs">&rarr;</span>
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-green-400/60 to-green-400/30" />
                    <span className="text-[10px] text-white/50">Fresh air drawn in passively</span>
                  </div>

                  {/* Confined space box */}
                  <div className="bg-amber-500/10 border-2 border-dashed border-amber-500/30 rounded-lg p-3 mb-3">
                    <p className="text-amber-400 text-xs font-bold text-center mb-2">CONFINED SPACE</p>
                    <div className="flex items-center justify-center gap-2 text-[10px] text-white/60">
                      <span className="text-amber-400">&larr;</span>
                      <span>Contaminated air extracted</span>
                      <span className="text-amber-400">&larr;</span>
                    </div>
                    <p className="text-[10px] text-amber-400/60 text-center mt-1">Slight negative pressure (&minus;)</p>
                  </div>

                  {/* Extraction path */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/50">Duct extracts from source</span>
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-red-400/60 to-red-400/30" />
                    <span className="text-red-400 text-xs">&rarr;</span>
                    <div className="bg-red-500/20 border border-red-500/40 rounded-lg px-3 py-2 text-center">
                      <p className="text-red-400 text-xs font-bold">FAN</p>
                      <p className="text-white/50 text-[10px]">Outside</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-white/70">
                  <p className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    Preferred when contaminant source is known
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    Prevents contamination spreading outward
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="mt-1 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    Extracts directly from the source location
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Negative Pressure Ventilation & Combination Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">04</span>
            Negative Pressure &amp; Combination Systems
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Negative pressure ventilation</strong> (also called
                extraction ventilation) uses a fan positioned outside the
                confined space to{" "}
                <strong>extract contaminated air out through ducting</strong>.
                As air is pulled out, fresh air is drawn in passively through
                the entry point or other openings to replace it. This creates a
                slight negative pressure (vacuum) inside the space.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  When Negative Pressure Is Preferred
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Known contaminant source:
                      </strong>{" "}
                      The duct can be placed directly at the source of
                      contamination (e.g. a leaking valve, a residue at the
                      bottom of a tank) to extract the contaminant before it
                      spreads throughout the space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Preventing spread:
                      </strong>{" "}
                      When the contaminant must not be allowed to escape into the
                      surrounding area (e.g. toxic fumes that could affect
                      workers outside the space, or during asbestos work where
                      negative pressure containment is required)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Welding and hot work:
                      </strong>{" "}
                      Local exhaust ventilation (LEV) positioned near the weld
                      point to capture fumes at source before they disperse
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Limitations of Negative Pressure
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Fresh air enters passively and may not reach all areas of
                      the space effectively, creating{" "}
                      <strong className="text-white">
                        dead zones with poor air quality
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      The negative pressure can{" "}
                      <strong className="text-white">
                        draw in contaminants
                      </strong>{" "}
                      from connected pipes, adjacent chambers, or the ground
                      around the space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      Does not provide the same level of{" "}
                      <strong className="text-white">
                        overall dilution
                      </strong>{" "}
                      as positive pressure — effective mainly at the extraction
                      point
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Combination Systems
                </p>
                <p className="text-sm text-white/80 mb-3">
                  In more complex or higher-risk confined space entries, a{" "}
                  <strong className="text-white">combination system</strong> may
                  be used — simultaneously blowing clean air in at one point
                  (positive pressure) and extracting contaminated air at another
                  (negative pressure). This provides:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Controlled airflow path:
                      </strong>{" "}
                      Air enters at one location and exits at another, ensuring
                      the entire space is swept by the airflow
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Elimination of dead zones:
                      </strong>{" "}
                      The push-pull action prevents stagnant pockets where
                      contaminants could accumulate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Higher air change rates:
                      </strong>{" "}
                      Two fans working together achieve greater airflow than
                      either alone
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Source extraction + general dilution:
                      </strong>{" "}
                      One fan supplies clean air whilst the other extracts
                      directly from the contamination source
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Air Supply Considerations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">05</span>
            Air Supply Considerations
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The quality of the air being supplied into the confined space is
                as important as the ventilation system itself. If the intake air
                is contaminated, the ventilation system will actively{" "}
                <strong>
                  pump hazardous substances into the space
                </strong>{" "}
                &mdash; creating a more dangerous situation than having no
                ventilation at all. Air supply quality is one of the most
                commonly overlooked aspects of confined space ventilation, and
                one of the most dangerous when it goes wrong.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Clean Air Source — Positioning the Intake
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Away from vehicle exhausts:
                      </strong>{" "}
                      Position the air intake well upwind and at a safe distance
                      from any vehicles, plant, or machinery that produce
                      exhaust fumes (particularly carbon monoxide from petrol
                      engines and diesel particulates)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Away from generators:
                      </strong>{" "}
                      Portable generators are a common source of carbon monoxide
                      — the air intake must be positioned upwind and far enough
                      away that exhaust fumes cannot be drawn in
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Away from chemical stores:
                      </strong>{" "}
                      Chemical storage areas, paint shops, fuel tanks, and any
                      area where volatile substances are present or being used
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Away from dust and particulates:
                      </strong>{" "}
                      Construction dust, grinding debris, and other airborne
                      particulates should not be drawn into the ventilation
                      system
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Away from the exhaust outlet:
                      </strong>{" "}
                      The contaminated air being exhausted from the space must
                      not be recirculated back through the intake — position
                      them as far apart as possible
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Duct Routing
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Shortest practical route:
                      </strong>{" "}
                      Every bend, kink, or additional length of ducting reduces
                      airflow. Keep the duct run as short and straight as
                      possible
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Avoid sharp bends:
                      </strong>{" "}
                      Use gradual curves rather than tight 90-degree bends, which
                      significantly restrict airflow
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Correct diameter:
                      </strong>{" "}
                      The duct must be the correct diameter for the fan — too
                      narrow restricts flow, too wide reduces air velocity.
                      Common sizes are 200mm (8&Prime;), 300mm (12&Prime;), and
                      400mm (16&Prime;) diameter
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Secure and protected:
                      </strong>{" "}
                      Ducting must be secured so it cannot be dislodged,
                      crushed, or kinked during work. Protect it from vehicle
                      traffic, sharp edges, and tripping hazards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Anti-static ducting:
                      </strong>{" "}
                      In flammable atmospheres, anti-static ducting must be used
                      and properly earthed to prevent the build-up of static
                      charges that could produce a spark (see Section 07)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Contaminated Intake — A Deadly Mistake
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Multiple fatalities have occurred because the ventilation
                  system&rsquo;s air intake was positioned near a running
                  generator or vehicle exhaust, pumping{" "}
                  <strong>carbon monoxide</strong> directly into the confined
                  space. Carbon monoxide is odourless and colourless — workers
                  cannot detect it. They lose consciousness rapidly and die if
                  not rescued. Always verify that the air intake is drawing from
                  a genuinely clean source, and confirm with atmospheric
                  monitoring inside the space.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: Air Change Rates & Calculations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">06</span>
            Air Change Rates &amp; Calculations
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>air change rate</strong> is the number of times the
                entire volume of air in a space is replaced per hour. It is a
                key metric for determining whether ventilation is adequate. Too
                few air changes and contaminants will not be sufficiently
                diluted; too many and you may waste energy or create excessive
                noise and wind chill without additional benefit.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Minimum Recommendations
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-white/80 border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 pr-4 text-cyan-400 font-medium text-xs">
                          Situation
                        </th>
                        <th className="text-left py-2 text-cyan-400 font-medium text-xs">
                          Min. Air Changes/Hour
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr>
                        <td className="py-2 pr-4">
                          General ventilation (low risk, no active hazards)
                        </td>
                        <td className="py-2 font-medium text-white">
                          5&ndash;10
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">
                          Moderate contaminant levels or fume-generating work
                        </td>
                        <td className="py-2 font-medium text-white">
                          10&ndash;20
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">
                          High contaminant levels, hot work, or welding
                        </td>
                        <td className="py-2 font-medium text-white">
                          20&ndash;30+
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">
                          Pre-entry purge (before workers enter)
                        </td>
                        <td className="py-2 font-medium text-white">
                          Minimum 5&ndash;10 complete changes before entry
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Calculating Required Airflow
                </p>
                <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-3 mb-3 font-mono text-sm text-center">
                  <p className="text-cyan-400 mb-1">Required Airflow (m&sup3;/hr)</p>
                  <p className="text-white text-lg">=&nbsp;&nbsp;Space Volume (m&sup3;)&nbsp;&nbsp;&times;&nbsp;&nbsp;Air Changes per Hour</p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                    <p className="text-cyan-400 text-xs font-bold mb-1.5">WORKED EXAMPLE 1</p>
                    <p>
                      A cylindrical tank has a diameter of 3m and a height of
                      4m. Volume = &pi; &times; r&sup2; &times; h = &pi;
                      &times; 1.5&sup2; &times; 4 &asymp;{" "}
                      <strong className="text-white">28.3 m&sup3;</strong>.
                    </p>
                    <p className="mt-1">
                      For moderate-risk work (15 air changes/hour): 28.3 &times;
                      15 ={" "}
                      <strong className="text-white">
                        424.5 m&sup3;/hr
                      </strong>{" "}
                      &asymp; 250 CFM.
                    </p>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                    <p className="text-cyan-400 text-xs font-bold mb-1.5">WORKED EXAMPLE 2</p>
                    <p>
                      A rectangular chamber measures 2m &times; 3m &times; 2.5m.
                      Volume = 2 &times; 3 &times; 2.5 ={" "}
                      <strong className="text-white">15 m&sup3;</strong>.
                    </p>
                    <p className="mt-1">
                      For pre-entry purge (10 complete air changes): 15
                      &times; 10 ={" "}
                      <strong className="text-white">150 m&sup3;</strong>{" "}
                      total. With a fan rated at 300 m&sup3;/hr, this takes 30
                      minutes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">Important:</strong> Air
                  change rate calculations provide a{" "}
                  <strong>starting point</strong>, not a guarantee of safety.
                  Factors such as the type and concentration of contaminants,
                  duct losses from bends and length, the presence of obstacles
                  in the space, and the number of workers all affect the actual
                  effectiveness. The{" "}
                  <strong>
                    only reliable confirmation is atmospheric monitoring
                  </strong>{" "}
                  showing safe readings inside the space.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Ventilation for Specific Hazards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">07</span>
            Ventilation for Specific Hazards
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Different atmospheric hazards require different ventilation
                strategies. The <strong>density of the contaminant gas</strong>{" "}
                relative to air determines where it accumulates within the
                space, and therefore where the ventilation duct must be directed
                to be effective.
              </p>

              {/* Diagram: Ventilation Setup for Heavier-than-Air Gases */}
              <div className="bg-white/5 border border-cyan-500/30 rounded-xl p-4 sm:p-6">
                <p className="text-sm font-semibold text-cyan-400 mb-4 text-center">
                  Duct Placement by Gas Density
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Heavier-than-air */}
                  <div className="space-y-2">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 text-center">
                      <p className="text-red-400 text-xs font-bold">HEAVIER-THAN-AIR GASES</p>
                      <p className="text-white/50 text-[10px]">H&sub2;S, CO&sub2;, LPG, chlorine</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                      {/* Space visualisation */}
                      <div className="p-3 space-y-1">
                        <div className="bg-white/5 border border-white/5 rounded px-2 py-1.5 flex items-center justify-between">
                          <span className="text-[10px] text-white/40">Top</span>
                          <span className="text-[10px] text-green-400">Clean air</span>
                        </div>
                        <div className="bg-white/5 border border-white/5 rounded px-2 py-1.5 flex items-center justify-between">
                          <span className="text-[10px] text-white/40">Middle</span>
                          <span className="text-[10px] text-amber-400/60">Transition zone</span>
                        </div>
                        <div className="bg-red-500/10 border border-red-500/20 rounded px-2 py-1.5 flex items-center justify-between">
                          <span className="text-[10px] text-white/40">Bottom</span>
                          <span className="text-[10px] text-red-400 font-bold">Gas layer &larr; DUCT HERE</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-white/60 text-center">
                      Direct duct to the <strong className="text-red-400">bottom</strong> of the space
                    </p>
                  </div>

                  {/* Lighter-than-air */}
                  <div className="space-y-2">
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2 text-center">
                      <p className="text-amber-400 text-xs font-bold">LIGHTER-THAN-AIR GASES</p>
                      <p className="text-white/50 text-[10px]">Methane (CH&sub4;), hydrogen (H&sub2;)</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                      {/* Space visualisation */}
                      <div className="p-3 space-y-1">
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded px-2 py-1.5 flex items-center justify-between">
                          <span className="text-[10px] text-white/40">Top</span>
                          <span className="text-[10px] text-amber-400 font-bold">Gas layer &larr; DUCT HERE</span>
                        </div>
                        <div className="bg-white/5 border border-white/5 rounded px-2 py-1.5 flex items-center justify-between">
                          <span className="text-[10px] text-white/40">Middle</span>
                          <span className="text-[10px] text-amber-400/60">Transition zone</span>
                        </div>
                        <div className="bg-white/5 border border-white/5 rounded px-2 py-1.5 flex items-center justify-between">
                          <span className="text-[10px] text-white/40">Bottom</span>
                          <span className="text-[10px] text-green-400">Clean air</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-white/60 text-center">
                      Direct duct to the <strong className="text-amber-400">top</strong> of the space
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Heavier-than-Air Gases
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Gases that are denser than air settle at the{" "}
                  <strong className="text-white">lowest points</strong> in the
                  space — floor level, sumps, pits, and trenches. These include
                  hydrogen sulphide (H&sub2;S), carbon dioxide (CO&sub2;), LPG,
                  propane, butane, and chlorine. Workers are most at risk at
                  floor level where they stand, kneel, or lie.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Direct the supply duct to the{" "}
                      <strong className="text-white">bottom of the space</strong>{" "}
                      to displace the heavy gas layer upwards and out
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      If using extraction, place the extraction duct at the{" "}
                      <strong className="text-white">lowest point</strong>{" "}
                      to pull the heavy gas directly from where it accumulates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Monitor at{" "}
                      <strong className="text-white">
                        multiple levels
                      </strong>{" "}
                      — particularly at floor level — to confirm the gas layer
                      is being displaced
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Lighter-than-Air Gases
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Gases that are lighter than air rise and accumulate at the{" "}
                  <strong className="text-white">highest points</strong> in the
                  space — the crown of a vessel, the top of a shaft, or the
                  ceiling of a chamber. The primary examples are methane
                  (CH&sub4;) and hydrogen (H&sub2;).
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Direct the supply or extraction duct to the{" "}
                      <strong className="text-white">top of the space</strong>{" "}
                      to displace or extract the light gas from the ceiling
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Monitor at the <strong className="text-white">highest
                      accessible point</strong> to detect accumulation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Be particularly cautious with methane and hydrogen as both
                      are{" "}
                      <strong className="text-white">
                        highly flammable
                      </strong>{" "}
                      — ATEX-rated equipment is essential
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Hot Environments
                </p>
                <p className="text-sm text-white/80">
                  In spaces where heat is a hazard — such as boilers, kilns,
                  ovens, or sun-heated tanks — ventilation provides a vital{" "}
                  <strong className="text-white">cooling effect</strong>.
                  The flow of cooler outside air removes heat from the space and
                  reduces the core body temperature risk to workers. In these
                  situations, higher air change rates may be needed specifically
                  for thermal comfort and heat stress prevention, even if there
                  are no chemical contaminants present. The ventilation plan
                  should consider the temperature of the incoming air and
                  whether additional cooling measures (such as spot coolers or
                  work-rest cycles) are required.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  When Ventilation Alone Is Insufficient
                </p>
                <p className="text-sm text-white/80 mb-3">
                  There are situations where ventilation{" "}
                  <strong className="text-white">
                    cannot adequately control the atmospheric hazard
                  </strong>, and additional respiratory protection is required:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        High-toxicity substances:
                      </strong>{" "}
                      Some chemicals have extremely low WELs (e.g. hydrogen
                      cyanide, arsine) where even small residual concentrations
                      after ventilation may be dangerous
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Immediately Dangerous to Life or Health (IDLH)
                        atmospheres:
                      </strong>{" "}
                      Where contaminant concentrations are so high that
                      ventilation cannot reduce them to safe levels quickly
                      enough
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Oxygen-deficient atmospheres:
                      </strong>{" "}
                      Where the oxygen concentration cannot be raised to safe
                      levels (e.g. inerted vessels that must remain inerted
                      during work)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Continuous contaminant generation:
                      </strong>{" "}
                      Where the work itself generates contaminants faster than
                      ventilation can remove them (e.g. large-scale grinding,
                      spray painting, or solvent cleaning)
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white/80 mt-3">
                  In these situations, workers must use{" "}
                  <strong className="text-white">
                    respiratory protective equipment (RPE)
                  </strong>{" "}
                  or{" "}
                  <strong className="text-white">
                    breathing apparatus (BA)
                  </strong>{" "}
                  as specified in the method statement. Self-contained breathing
                  apparatus (SCBA) or airline breathing apparatus may be
                  required. The choice depends on the hazard type, duration of
                  work, and the space configuration.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Ventilation Equipment, ATEX & the Ventilation Plan */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">08</span>
            Equipment, ATEX Requirements &amp; the Ventilation Plan
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Selecting the correct ventilation equipment is essential for
                effective and safe operation. The choice of fan, ducting, and
                configuration depends on the size and geometry of the space,
                the type and concentration of contaminants, the required
                airflow rate, and whether a flammable or explosive atmosphere
                may be present.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Common Ventilation Equipment Types
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">
                      Axial Fans
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      The most common type for confined space ventilation.
                      Lightweight, portable, and effective for moving large
                      volumes of air over short to medium duct lengths. Air
                      moves parallel to the fan blade axis. Typical sizes range
                      from 200mm to 400mm diameter. Best suited for general
                      purging and dilution ventilation.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">
                      Centrifugal Blowers
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      Generate higher pressure than axial fans, making them
                      suitable for longer duct runs, spaces with restricted
                      access points, or situations requiring air to be forced
                      through multiple bends. They are heavier and more
                      expensive than axial fans but can overcome the resistance
                      caused by long or complex duct routes.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">
                      Venturi-Type Ejectors (Air Movers)
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      Powered by compressed air rather than electricity. They
                      have no moving parts and no electrical components, making
                      them inherently safe for use in flammable and explosive
                      atmospheres without the need for ATEX rating. They are
                      less powerful than electric fans but are the safest option
                      where ignition risk is the primary concern.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">
                      Flexible Ducting
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      Available in PVC, polyester, neoprene-coated fabric, and
                      anti-static materials. Common diameters: 200mm (8&Prime;),
                      300mm (12&Prime;), and 400mm (16&Prime;). Standard PVC
                      ducting is suitable for non-flammable atmospheres.
                      Anti-static ducting (typically black with a conductive
                      wire spiral) must be used in flammable environments and
                      properly earthed at both ends.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  ATEX-Rated Equipment for Flammable Atmospheres
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Where a potentially flammable or explosive atmosphere is
                  present or could develop (e.g. from residual hydrocarbons,
                  solvents, or flammable gases), all ventilation equipment must
                  comply with the{" "}
                  <strong className="text-white">
                    Dangerous Substances and Explosive Atmospheres Regulations
                    2002 (DSEAR)
                  </strong>{" "}
                  and be{" "}
                  <strong className="text-white">
                    ATEX-rated (Atmospheres Explosibles)
                  </strong>
                  .
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">ATEX fans:</strong> Motors
                      are sealed, spark-proof, and certified for use in
                      explosive atmospheres. They carry the ATEX &ldquo;Ex&rdquo;
                      marking with the appropriate zone classification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Anti-static ducting:
                      </strong>{" "}
                      Prevents static charge build-up. Must be earthed at both
                      ends and at any joints to provide a continuous path to
                      earth
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Pneumatic/air-driven equipment:
                      </strong>{" "}
                      Venturi ejectors powered by compressed air are inherently
                      safe as they have no electrical components
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Earthing and bonding:
                      </strong>{" "}
                      All metallic components (fans, ducts, clips, frames) must
                      be earthed and bonded to prevent static accumulation
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Non-ATEX Equipment = Ignition Source
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Using standard (non-ATEX) electrical equipment in a flammable
                  atmosphere is <strong>extremely dangerous</strong>. A standard
                  fan motor can produce sparks when it starts, stops, or
                  experiences a fault. Standard PVC ducting can build up static
                  charges sufficient to create a spark. Either of these can
                  ignite a flammable gas-air mixture, causing an explosion
                  within the confined space. There have been multiple recorded
                  incidents and fatalities from this exact scenario.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  The Ventilation Plan
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The ventilation arrangements must be documented as part of the{" "}
                  <strong className="text-white">
                    method statement and safe system of work
                  </strong>{" "}
                  for the confined space entry. The ventilation plan should
                  specify:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Type and specification of ventilation equipment (fan type,
                      airflow rating, ATEX classification if applicable)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Duct size, material, routing, and outlet position within
                      the space
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Location of the clean air intake and measures to protect
                      it from contamination
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Required air change rate and how it was calculated
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Pre-entry purge duration and the criteria for confirming
                      the space is safe to enter (atmospheric monitoring
                      thresholds)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Continuous ventilation requirements during work and the
                      frequency of atmospheric monitoring
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Emergency procedures in the event of ventilation failure
                      — including immediate evacuation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>
                      Backup ventilation arrangements (if a single fan fails, is
                      there a spare on standby?)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">
                  Common Mistakes in Confined Space Ventilation
                </p>
                <div className="space-y-2">
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                    <p className="text-sm text-white">
                      <strong className="text-red-400">
                        Insufficient air volume:
                      </strong>{" "}
                      Using a fan that is too small for the space, resulting in
                      inadequate air changes and failure to reduce contaminant
                      levels to safe thresholds. Always calculate the required
                      airflow rate and select a fan that exceeds it.
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                    <p className="text-sm text-white">
                      <strong className="text-red-400">
                        Contaminated intake air:
                      </strong>{" "}
                      Positioning the air intake near vehicle exhausts,
                      generators, or chemical stores — pumping toxic gases
                      directly into the space. This is the single most dangerous
                      ventilation error.
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                    <p className="text-sm text-white">
                      <strong className="text-red-400">
                        No monitoring to verify effectiveness:
                      </strong>{" "}
                      Assuming that because the fan is running, the atmosphere
                      must be safe. Ventilation must always be verified by
                      continuous atmospheric monitoring — a running fan is not a
                      guarantee.
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                    <p className="text-sm text-white">
                      <strong className="text-red-400">
                        Incorrect duct placement:
                      </strong>{" "}
                      Placing the duct at the wrong level for the gas density
                      — e.g. directing air to the top of the space when the
                      hazard is a heavier-than-air gas settled at the bottom.
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                    <p className="text-sm text-white">
                      <strong className="text-red-400">
                        Short-circuiting airflow:
                      </strong>{" "}
                      Positioning the duct inlet and the exhaust outlet too
                      close together, so clean air exits the space before it has
                      circulated and diluted contaminants.
                    </p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                    <p className="text-sm text-white">
                      <strong className="text-red-400">
                        Using non-ATEX equipment in flammable atmospheres:
                      </strong>{" "}
                      Standard electrical fans producing sparks or static
                      discharge in the presence of flammable gases — a direct
                      path to explosion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">
                    Monitoring Effectiveness — The Golden Rule:
                  </strong>{" "}
                  Ventilation is <strong>never a substitute for atmospheric
                  monitoring</strong>. It is a control measure that requires
                  continuous verification. The four-gas monitor is the only tool
                  that can confirm whether the ventilation system is achieving
                  its purpose. If the monitor shows unsafe readings despite
                  ventilation being in operation, the system is either inadequate
                  or has a fault — either way,{" "}
                  <strong>evacuate and reassess</strong>.
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-3-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Gas Detection &amp; Monitoring
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-4">
              Next Module: Safe Systems of Work
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
