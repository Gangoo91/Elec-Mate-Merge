import {
  ArrowLeft,
  Volume2,
  CheckCircle,
  AlertTriangle,
  Shield,
  Scale,
  FileText,
  BarChart3,
  Wrench,
  Activity,
  BookOpen,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "section-61-advantage",
    question:
      "A contractor is planning a noisy demolition project in a residential area. What is the PRIMARY advantage of applying for a Section 61 prior consent under the Control of Pollution Act 1974?",
    options: [
      "It removes all noise limits from the project",
      "It provides a defence against prosecution under Section 60, provided the agreed conditions are followed",
      "It guarantees that no complaints will be received from residents",
      "It allows 24-hour working without restrictions",
    ],
    correctIndex: 1,
    explanation:
      "A Section 61 prior consent provides the contractor with a defence against a Section 60 notice, provided they comply with the conditions agreed in the consent. The local authority and contractor agree in advance on working methods, hours, noise levels, and best practicable means (BPM). This gives the contractor certainty about what is expected and protection from enforcement action, while ensuring the community is protected through agreed controls. It does not remove noise limits, guarantee no complaints, or permit unrestricted hours.",
  },
  {
    id: "abc-method",
    question:
      "When using the ABC method from BS 5228-1, what determines whether Category A, B, or C noise limits apply to a construction site?",
    options: [
      "The type of construction equipment being used",
      "The duration of the construction project",
      "The existing ambient noise level at the nearest noise-sensitive receptor",
      "The number of complaints received from residents",
    ],
    correctIndex: 2,
    explanation:
      "The ABC method in BS 5228-1 sets significance criteria based on the existing ambient noise level at the nearest noise-sensitive receptor. Category A applies where the ambient noise level is relatively low (e.g. rural or suburban areas), Category B where it is moderate, and Category C where it is already high (e.g. near busy roads). The threshold at which construction noise becomes significant varies accordingly: in quieter areas, lower construction noise levels are considered significant because they represent a greater change from the baseline.",
  },
  {
    id: "ppv-cosmetic-damage",
    question:
      "A piling operation is producing a peak particle velocity (PPV) of 12 mm/s at the nearest residential property. According to BS 7385-2, what is the likely consequence at this vibration level?",
    options: [
      "No perceptible vibration will be felt by occupants",
      "Occupants may complain but cosmetic damage is unlikely",
      "Cosmetic damage such as cracking of plaster is possible",
      "Structural damage to the building is likely",
    ],
    correctIndex: 1,
    explanation:
      "At 12 mm/s PPV, occupants are very likely to feel the vibration and may well complain, but cosmetic damage to a typical residential building is unlikely. BS 7385-2 indicates that cosmetic damage (hairline cracking of plaster and the like) is unlikely below 15 mm/s PPV at frequencies between 4 Hz and 15 Hz for residential buildings. Structural damage occurs at significantly higher levels. However, vibration at 12 mm/s is well above the human perception threshold of approximately 0.3 mm/s and will cause considerable disturbance to occupants.",
  },
];

const faqs = [
  {
    question:
      "What is the difference between a Section 60 notice and a Section 61 consent?",
    answer:
      "A Section 60 notice is a reactive enforcement tool: the local authority serves it on a contractor to impose controls on construction noise that is already causing, or is likely to cause, a nuisance. It can specify permitted hours, required noise levels, and particular methods. A Section 61 consent, by contrast, is proactive: the contractor voluntarily applies to the local authority before work begins, setting out the proposed methods, hours, and noise control measures. If the application is approved and the conditions are followed, the contractor has a defence against any subsequent Section 60 notice. Section 61 is therefore the preferred route for major projects because it gives the contractor certainty and demonstrates good practice.",
  },
  {
    question:
      "How do you carry out a baseline noise survey for a construction project?",
    answer:
      "A baseline noise survey measures the existing ambient noise levels at the nearest noise-sensitive receptors (typically residential properties, schools, hospitals, or places of worship) before construction begins. Measurements are taken over a representative period, usually several days including weekdays and weekends, using calibrated sound level meters positioned at 1.2 to 1.5 metres above ground. The survey records the LAeq (equivalent continuous sound level), LA90 (background noise level), and LA10 over defined periods (typically daytime, evening, and night-time). The results establish the baseline against which predicted construction noise levels are compared to determine significance using the BS 5228 ABC method.",
  },
  {
    question:
      "Can vibration from construction cause structural damage to buildings?",
    answer:
      "Yes, but only at very high levels that are rarely encountered in practice. BS 7385-2 provides guidance on vibration levels and building damage. For typical residential properties, cosmetic damage (hairline cracking of plaster, opening of existing cracks) is unlikely below 15 mm/s PPV at low frequencies (4 to 15 Hz) or below 20 mm/s PPV at higher frequencies (15 to 40 Hz). Minor structural damage typically requires levels above 25 mm/s PPV, and major structural damage above 50 mm/s PPV. Most construction activities generate vibration well below these thresholds at normal working distances. However, vibration that is far below the damage threshold can still cause significant disturbance to occupants, and complaints are common at levels as low as 1 to 2 mm/s PPV.",
  },
  {
    question:
      "What role does a community liaison officer play on a construction project?",
    answer:
      "A community liaison officer (CLO) is the designated point of contact between the construction project and the local community. Their responsibilities include notifying residents and businesses in advance of particularly noisy or disruptive activities, maintaining an up-to-date complaints register and ensuring all complaints are investigated and responded to promptly, organising regular community meetings or drop-in sessions to keep neighbours informed about progress and upcoming works, distributing newsletters or updates, coordinating with the local authority environmental health team, and ensuring the project team is aware of local sensitivities such as exam periods, religious observances, or community events. On major projects, the CLO role is often a condition of the Section 61 consent or planning permission.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "At what sound level does prolonged daily exposure typically begin to cause permanent hearing damage?",
    options: [
      "65 dB(A)",
      "75 dB(A)",
      "85 dB(A)",
      "95 dB(A)",
    ],
    correctAnswer: 2,
    explanation:
      "The Control of Noise at Work Regulations 2005 set the lower exposure action value at 80 dB(A) and the upper exposure action value at 85 dB(A) for a daily personal noise exposure (LEPd). At and above 85 dB(A), employers must provide hearing protection, designate hearing protection zones, and implement a programme of noise control measures. Prolonged exposure at 85 dB(A) and above without protection is associated with permanent noise-induced hearing loss. Construction sites routinely exceed this level, making hearing protection and noise management essential.",
  },
  {
    id: 2,
    question:
      "Under which legislation can a local authority serve a notice imposing specific requirements on a construction site to control noise?",
    options: [
      "Health and Safety at Work Act 1974",
      "Control of Pollution Act 1974, Section 60",
      "Building Regulations 2010, Part E",
      "Town and Country Planning Act 1990",
    ],
    correctAnswer: 1,
    explanation:
      "Section 60 of the Control of Pollution Act 1974 gives local authorities the power to serve a notice on a construction site imposing specific requirements to control noise. The notice can specify permitted working hours, maximum noise levels, types of plant or machinery that may or may not be used, and particular working methods. Non-compliance with a Section 60 notice is a criminal offence. This is the primary reactive enforcement tool for construction noise in England and Wales.",
  },
  {
    id: 3,
    question:
      "What does 'best practicable means' (BPM) require a contractor to demonstrate when controlling construction noise?",
    options: [
      "That the cheapest available method has been used",
      "That noise has been eliminated entirely",
      "That all reasonably practicable steps have been taken to minimise noise, considering cost, technology, and local conditions",
      "That noise levels are below 70 dB(A) at all times",
    ],
    correctAnswer: 2,
    explanation:
      "Best practicable means (BPM) is a key concept in both the Control of Pollution Act 1974 and BS 5228. It requires the contractor to demonstrate that they have taken all reasonably practicable steps to minimise noise, having regard to the current state of technical knowledge, the cost of the measures relative to the benefit achieved, and the local conditions and circumstances. BPM does not require the elimination of noise or the achievement of a specific numerical target. It is a balanced, proportionate approach that considers what is achievable in practice.",
  },
  {
    id: 4,
    question:
      "Which British Standard provides the primary methodology for predicting and assessing construction noise and vibration?",
    options: [
      "BS 4142:2014",
      "BS 5228:2009+A1:2014",
      "BS 7445:2003",
      "BS 8233:2014",
    ],
    correctAnswer: 1,
    explanation:
      "BS 5228:2009+A1:2014 (Code of Practice for Noise and Vibration Control on Construction and Open Sites) is the primary standard for predicting, assessing, and controlling noise and vibration from construction activities. Part 1 covers noise and Part 2 covers vibration. It provides a comprehensive database of noise and vibration data for common construction plant and activities, prediction methodologies, significance criteria (the ABC method), and guidance on control measures. It is referenced by the Control of Pollution Act 1974 and is the standard against which construction noise management is judged.",
  },
  {
    id: 5,
    question:
      "A noise barrier is erected between a piling rig and the nearest residential property. This is an example of controlling noise at which point in the source-path-receiver hierarchy?",
    options: [
      "At the source",
      "Along the transmission path",
      "At the receiver",
      "By administrative control only",
    ],
    correctAnswer: 1,
    explanation:
      "A noise barrier between the source (piling rig) and the receiver (residential property) is a path control measure. It intercepts the sound as it travels from the source to the receiver, reducing the noise level through reflection, absorption, and diffraction effects. Source controls would involve using quieter equipment or different methods. Receiver controls would involve measures at the property itself, such as temporary secondary glazing or offering residents alternative accommodation during the noisiest works.",
  },
  {
    id: 6,
    question:
      "What is the approximate human perception threshold for ground-borne vibration, expressed as peak particle velocity (PPV)?",
    options: [
      "0.01 mm/s",
      "0.3 mm/s",
      "5 mm/s",
      "15 mm/s",
    ],
    correctAnswer: 1,
    explanation:
      "The human perception threshold for ground-borne vibration is approximately 0.3 mm/s PPV. At this level, vibration can just be felt by a person in a building who is stationary and paying attention. Vibration becomes distinctly perceptible at around 1 mm/s PPV, and levels above 2 to 3 mm/s PPV are likely to generate complaints from building occupants. The gap between the level at which vibration is felt (0.3 mm/s) and the level at which cosmetic building damage may occur (15 mm/s or more) is very large, which means that human disturbance is almost always the controlling factor in vibration assessment, not structural damage.",
  },
  {
    id: 7,
    question:
      "Under BS 5228-2, what is the purpose of setting 'trigger levels' and 'action levels' for construction vibration monitoring?",
    options: [
      "To determine when workers need hearing protection",
      "To provide early warning and define when additional control measures or work stoppages are required",
      "To calculate the cost of vibration damage claims",
      "To measure the efficiency of piling equipment",
    ],
    correctAnswer: 1,
    explanation:
      "Trigger levels and action levels form a tiered response system for managing construction vibration. The trigger level is set below the action level and serves as an early warning: when vibration reaches the trigger level, additional monitoring is initiated and the situation is reviewed. If vibration continues to rise and reaches the action level, specific actions must be taken, which may include modifying the working method, reducing energy input, increasing monitoring frequency, or stopping work entirely. This system prevents vibration from reaching levels that could cause damage or excessive disturbance, by providing an opportunity to intervene before the critical threshold is reached.",
  },
  {
    id: 8,
    question:
      "Which of the following is NOT typically included in a Section 61 prior consent application?",
    options: [
      "A description of the proposed working methods and plant to be used",
      "The proposed working hours and duration of the noisiest activities",
      "A guarantee that no residents will be disturbed by the works",
      "Details of noise control measures (best practicable means) to be employed",
    ],
    correctAnswer: 2,
    explanation:
      "A Section 61 application includes a description of the works, the methods and plant proposed, the proposed working hours, predicted noise levels, and the best practicable means (BPM) to be used to minimise noise. It does not and cannot include a guarantee that no residents will be disturbed. Construction noise, even when well managed, will be audible to nearby residents. The purpose of Section 61 is not to eliminate disturbance but to agree in advance what reasonable steps will be taken to minimise it. A guarantee of zero disturbance would be impossible to deliver and is not required by the legislation.",
  },
];

export default function EnvironmentalSustainabilityModule4Section3() {
  useSEO({
    title:
      "Noise & Vibration Control | Environmental Sustainability Module 4.3",
    description:
      "Construction noise impact, legal framework, Section 61 prior consent, noise assessment and prediction, control measures, construction vibration, BS 5228, and community relations.",
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
            <Link to="../environmental-sustainability-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <Volume2 className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-400 text-xs font-semibold">
              MODULE 4 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Noise &amp; Vibration Control
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Construction noise legislation, Section 61 prior consent, BS 5228
            assessment methodology, noise and vibration control measures, and
            effective community engagement
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>85 dB(A):</strong> Upper exposure action value &mdash;
                hearing protection mandatory
              </li>
              <li>
                <strong>Section 60:</strong> Local authority can serve a notice
                to control construction noise
              </li>
              <li>
                <strong>Section 61:</strong> Contractor can apply for prior
                consent before work begins
              </li>
              <li>
                <strong>BS 5228:</strong> The primary standard for construction
                noise and vibration assessment
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Control hierarchy:</strong> Source &rarr; path &rarr;
                receiver
              </li>
              <li>
                <strong>0.3 mm/s PPV:</strong> Human perception threshold for
                vibration
              </li>
              <li>
                <strong>15 mm/s PPV:</strong> Cosmetic damage threshold for
                residential buildings
              </li>
              <li>
                <strong>Community:</strong> Early engagement prevents complaints
                and delays
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">
            By the end of this section, you will be able to:
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the decibel scale and identify common construction noise levels",
              "Describe the legal framework for construction noise control including Sections 60 and 61",
              "Explain the Section 61 prior consent process and its advantages",
              "Apply the BS 5228 ABC method for assessing construction noise significance",
              "Describe the source-path-receiver hierarchy of noise control measures",
              "Identify sources of construction vibration and explain PPV thresholds",
              "Explain vibration assessment, monitoring, and damage criteria under BS 5228-2 and BS 7385",
              "Describe effective community relations strategies for managing noise and vibration impacts",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/* Section 01: Construction Noise & Its Impact */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">01</span>
            Construction Noise &amp; Its Impact
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction is one of the{" "}
                <strong>noisiest industries</strong> in the built environment.
                Activities such as demolition, piling, concrete breaking, and
                earthmoving routinely generate noise levels that can cause
                permanent hearing damage to workers and significant disturbance
                to nearby communities. Understanding how noise is measured, what
                levels are produced by common operations, and the health effects
                of excessive noise exposure is the foundation of effective noise
                management.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  <Volume2 className="h-4 w-4 inline-block mr-2 -mt-0.5 text-emerald-400" />
                  The Decibel Scale
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Sound is measured in{" "}
                  <strong className="text-white">decibels (dB)</strong>. The
                  decibel scale is logarithmic, not linear, which means that
                  small changes in dB represent large changes in actual sound
                  energy. An increase of 3 dB represents a{" "}
                  <strong className="text-white">doubling</strong> of sound
                  energy, while an increase of 10 dB is perceived by the human
                  ear as roughly a{" "}
                  <strong className="text-white">doubling of loudness</strong>.
                  The A-weighted decibel scale &mdash; written as dB(A) &mdash;
                  filters the measurement to match the sensitivity of the human
                  ear, giving more weight to frequencies we hear most clearly.
                </p>
              </div>

              {/* Decibel Scale Diagram */}
              <div className="bg-white/5 border border-emerald-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  Decibel Scale &mdash; Construction Equipment Examples
                </h3>
                <div className="space-y-2">
                  {[
                    { level: "130 dB(A)", item: "Pneumatic breaker (operator position)", colour: "bg-red-500", width: "w-full" },
                    { level: "120 dB(A)", item: "Piling rig (impact hammer)", colour: "bg-red-500", width: "w-[92%]" },
                    { level: "110 dB(A)", item: "Circular saw / angle grinder", colour: "bg-red-400", width: "w-[85%]" },
                    { level: "100 dB(A)", item: "Excavator with hydraulic breaker", colour: "bg-orange-400", width: "w-[77%]" },
                    { level: "95 dB(A)", item: "Large diesel generator", colour: "bg-orange-400", width: "w-[73%]" },
                    { level: "90 dB(A)", item: "Tracked excavator / dumper truck", colour: "bg-yellow-400", width: "w-[69%]" },
                    { level: "85 dB(A)", item: "Upper exposure action value (hearing protection mandatory)", colour: "bg-yellow-500", width: "w-[65%]" },
                    { level: "80 dB(A)", item: "Lower exposure action value (hearing protection available)", colour: "bg-emerald-400", width: "w-[62%]" },
                    { level: "70 dB(A)", item: "Busy road traffic / office environment", colour: "bg-emerald-500", width: "w-[54%]" },
                    { level: "50 dB(A)", item: "Quiet suburban area (daytime)", colour: "bg-emerald-600", width: "w-[38%]" },
                    { level: "30 dB(A)", item: "Quiet rural area (night-time)", colour: "bg-emerald-700", width: "w-[23%]" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-white/70 w-20 text-right flex-shrink-0 font-mono">
                        {row.level}
                      </span>
                      <div className={`h-5 ${row.colour} rounded-r ${row.width} flex items-center px-2`}>
                        <span className="text-[10px] sm:text-xs text-black font-medium truncate">
                          {row.item}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/50 mt-3 text-center">
                  Note: Actual levels vary with equipment model, condition, and operating mode. Values shown are typical.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Health Effects of Noise Exposure
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Noise-induced hearing loss (NIHL):
                      </strong>{" "}
                      Prolonged exposure above 85 dB(A) damages the delicate
                      hair cells in the inner ear. This damage is{" "}
                      <strong className="text-white">permanent and irreversible</strong>.
                      NIHL is one of the most common occupational diseases in
                      the construction industry and typically develops gradually,
                      often going unnoticed until significant hearing has been
                      lost.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Tinnitus:</strong> A
                      persistent ringing, buzzing, or hissing in the ears that
                      can accompany hearing loss. Tinnitus has no cure and can
                      severely affect quality of life, causing sleep disturbance,
                      difficulty concentrating, and psychological distress.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Stress and cardiovascular effects:</strong>{" "}
                      Chronic noise exposure increases levels of cortisol and
                      adrenaline, contributing to hypertension (high blood
                      pressure), increased heart rate, and a higher risk of
                      cardiovascular disease. These effects can occur even at
                      levels below those that cause hearing damage.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Sleep disturbance:</strong>{" "}
                      Night-time construction noise, or noise from early morning
                      starts, can disrupt sleep patterns in nearby residents.
                      Even relatively low noise levels (40 to 50 dB(A)) can
                      disturb sleep, particularly if the noise is impulsive or
                      intermittent. Sleep deprivation has wide-ranging health
                      consequences.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Communication interference:</strong>{" "}
                      High noise levels on site make verbal communication
                      difficult or impossible, increasing the risk of accidents
                      because warnings, instructions, and alarms cannot be
                      heard. This is a direct safety hazard, not just a
                      nuisance.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Community Impact
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Construction noise affects not only workers but also the
                  surrounding community. Residents, businesses, schools, and
                  hospitals near construction sites may experience{" "}
                  <strong className="text-white">significant disturbance</strong>{" "}
                  that affects their daily lives, productivity, and wellbeing.
                  Noise complaints are the{" "}
                  <strong className="text-white">
                    most common environmental complaint
                  </strong>{" "}
                  received by local authorities about construction projects.
                  Poorly managed construction noise can lead to enforcement
                  action, project delays, increased costs, and reputational
                  damage for the contractor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 02: Legal Framework */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">02</span>
            Legal Framework
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction noise is regulated by a combination of legislation
                that protects both{" "}
                <strong>workers on site</strong> and the{" "}
                <strong>surrounding community</strong>. Understanding this legal
                framework is essential for anyone managing or supervising
                construction work.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  <Scale className="h-4 w-4 inline-block mr-2 -mt-0.5 text-emerald-400" />
                  Control of Pollution Act 1974 (CoPA) &mdash; Sections 60 &amp; 61
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Section 60 &mdash; Notice:</strong>{" "}
                      Gives the local authority power to serve a notice on a
                      construction site imposing requirements to control noise.
                      The notice can specify the{" "}
                      <strong className="text-white">hours during which work may be carried out</strong>,
                      the <strong className="text-white">maximum noise levels</strong> permitted,
                      the <strong className="text-white">types of plant or machinery</strong>{" "}
                      that may or may not be used, and the{" "}
                      <strong className="text-white">methods of working</strong> required.
                      Non-compliance is a criminal offence carrying a fine. A Section 60
                      notice can be served before or during construction works.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Section 61 &mdash; Prior Consent:</strong>{" "}
                      Allows the contractor to{" "}
                      <strong className="text-white">voluntarily apply</strong> to
                      the local authority before work begins, setting out the
                      proposed methods, hours, and noise control measures. If
                      the local authority grants consent and the contractor
                      complies with the agreed conditions, they have a{" "}
                      <strong className="text-white">
                        defence against prosecution
                      </strong>{" "}
                      under Section 60. This is the preferred, proactive
                      approach for major projects.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  <Shield className="h-4 w-4 inline-block mr-2 -mt-0.5 text-emerald-400" />
                  Environmental Protection Act 1990 (EPA)
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Part III of the EPA deals with{" "}
                  <strong className="text-white">statutory nuisance</strong>.
                  Noise that amounts to a nuisance, or noise that is prejudicial
                  to health, from any premises (including construction sites) can
                  be declared a statutory nuisance. The local authority must then
                  serve an abatement notice requiring the nuisance to be stopped
                  or reduced. Failure to comply with an abatement notice is a
                  criminal offence. Individuals can also take private action
                  through the magistrates&rsquo; court under Section 82 of the
                  EPA if they are affected by noise nuisance.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  <BookOpen className="h-4 w-4 inline-block mr-2 -mt-0.5 text-emerald-400" />
                  BS 5228:2009+A1:2014 &mdash; Parts 1 &amp; 2
                </p>
                <p className="text-sm text-white/80">
                  <strong className="text-white">Part 1 (Noise)</strong> provides
                  guidance on the prediction, assessment, and control of noise
                  from construction and open sites. It includes a comprehensive
                  database of noise levels from construction plant and
                  activities, the ABC method for assessing significance, and
                  recommendations for best practicable means (BPM).{" "}
                  <strong className="text-white">Part 2 (Vibration)</strong>{" "}
                  covers the prediction, measurement, assessment, and control of
                  vibration from construction activities, including guidance on
                  monitoring, trigger and action levels, and the relationship
                  between vibration levels and building damage. BS 5228 is the{" "}
                  <strong className="text-white">definitive reference</strong>{" "}
                  for construction noise and vibration management in the UK.
                </p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Control of Noise at Work Regulations 2005
                </p>
                <p className="text-sm text-white/80">
                  These regulations protect{" "}
                  <strong className="text-white">workers</strong> from noise
                  exposure on site. They set two key exposure action values
                  based on the daily personal noise exposure (L<sub>EPd</sub>):
                </p>
                <ul className="text-sm text-white/80 space-y-2 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Lower exposure action value &mdash; 80 dB(A):
                      </strong>{" "}
                      Employer must make hearing protection available and
                      provide information and training on noise risks.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Upper exposure action value &mdash; 85 dB(A):
                      </strong>{" "}
                      Hearing protection must be worn, hearing protection zones
                      must be established and signed, and the employer must
                      implement a programme of noise control measures to reduce
                      exposure.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Exposure limit value &mdash; 87 dB(A):
                      </strong>{" "}
                      The maximum daily exposure permitted, taking into account
                      the protection provided by hearing protection. This level
                      must never be exceeded.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/* Section 03: Section 61 Prior Consent */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">03</span>
            Section 61 Prior Consent
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A Section 61 prior consent application is the{" "}
                <strong>proactive, best-practice approach</strong> to managing
                construction noise. Rather than waiting for the local authority
                to impose restrictions (Section 60), the contractor takes the
                initiative by agreeing noise management measures in advance.
                This approach benefits everyone: the contractor gains certainty,
                the local authority has confidence in the noise management plan,
                and the community knows what to expect.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  <FileText className="h-4 w-4 inline-block mr-2 -mt-0.5 text-emerald-400" />
                  Content of a Section 61 Application
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Description of the works:
                      </strong>{" "}
                      A full description of the construction activities to be
                      carried out, broken down into phases where different noise
                      levels are expected (e.g. demolition phase, piling phase,
                      superstructure phase, fit-out phase).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Plant and methods:
                      </strong>{" "}
                      The specific plant, equipment, and working methods
                      proposed for each phase, including details of any quieter
                      alternatives considered.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Proposed working hours:
                      </strong>{" "}
                      The hours during which noisy work is proposed. Typical
                      permitted hours are 08:00 to 18:00 on weekdays and 08:00
                      to 13:00 on Saturdays, with no noisy work on Sundays or
                      bank holidays. Variations may be agreed for specific
                      activities.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Predicted noise levels:
                      </strong>{" "}
                      Noise predictions at the nearest noise-sensitive
                      receptors, calculated using the methodology in BS 5228-1,
                      for each phase of the works.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Best practicable means (BPM):
                      </strong>{" "}
                      A detailed description of all noise control measures to
                      be employed, demonstrating that the contractor is using
                      the best practicable means to minimise noise.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Monitoring and community liaison:
                      </strong>{" "}
                      Details of the noise monitoring programme and the
                      community engagement strategy, including complaint
                      handling procedures.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Best Practicable Means (BPM)
                </p>
                <p className="text-sm text-white/80">
                  BPM is a central concept in construction noise management. It
                  requires the contractor to take{" "}
                  <strong className="text-white">
                    all reasonably practicable steps
                  </strong>{" "}
                  to minimise noise, having regard to the current state of
                  technical knowledge, the financial cost of the measures
                  relative to the benefit, and the local conditions. BPM does
                  not require the elimination of noise &mdash; construction is
                  inherently noisy. It requires a{" "}
                  <strong className="text-white">
                    proportionate, thoughtful approach
                  </strong>{" "}
                  that demonstrates the contractor has genuinely considered noise
                  impacts and taken practical steps to reduce them.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Advantages of Section 61 Prior Consent
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Legal protection:</strong>{" "}
                      Provides a defence against Section 60 enforcement,
                      provided the agreed conditions are followed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Certainty:</strong> The
                      contractor knows exactly what is expected before work
                      begins, avoiding unexpected restrictions mid-project
                      that could cause costly delays.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Community confidence:
                      </strong>{" "}
                      Demonstrates to the community that the contractor is
                      taking noise management seriously and has agreed controls
                      with the local authority.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Professional reputation:
                      </strong>{" "}
                      Obtaining Section 61 consent is increasingly expected on
                      major projects and is viewed as a mark of good practice
                      by clients, planners, and the public.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 04: Noise Assessment & Prediction */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">04</span>
            Noise Assessment &amp; Prediction
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before construction begins, a{" "}
                <strong>noise assessment</strong> is carried out to predict the
                noise levels that will be generated by the proposed works and to
                determine whether those levels are significant. BS 5228-1
                provides the standard methodology for this assessment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  <BarChart3 className="h-4 w-4 inline-block mr-2 -mt-0.5 text-emerald-400" />
                  BS 5228 Assessment Methodology
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <span>
                      <strong className="text-white">
                        Baseline noise survey:
                      </strong>{" "}
                      Measure the existing ambient noise levels at the nearest
                      noise-sensitive receptors (residential properties,
                      schools, hospitals, places of worship) before construction
                      begins. This establishes the baseline against which
                      construction noise will be assessed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <span>
                      <strong className="text-white">
                        Identify noise sources:
                      </strong>{" "}
                      List all plant and activities for each phase of the
                      works, and obtain the corresponding sound power levels
                      from the BS 5228 database or manufacturer data.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <span>
                      <strong className="text-white">
                        Prediction calculations:
                      </strong>{" "}
                      Calculate the predicted noise level at each receptor,
                      taking into account the distance from the source, the
                      operating duration of each item of plant (on-time
                      correction), any screening effects from barriers or
                      buildings, ground absorption, and reflections from hard
                      surfaces.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      4
                    </span>
                    <span>
                      <strong className="text-white">
                        Significance assessment:
                      </strong>{" "}
                      Compare the predicted construction noise levels against
                      the significance criteria to determine whether the impact
                      is significant and what control measures are required.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-emerald-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  The ABC Method &mdash; Significance Criteria
                </h3>
                <p className="text-sm text-white/80 mb-4 text-center">
                  The ABC method sets noise thresholds based on the existing
                  ambient noise level at the receptor
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-white/80 border-collapse">
                    <thead>
                      <tr>
                        <th className="text-left p-2 border-b border-white/10 text-emerald-400 font-medium">
                          Category
                        </th>
                        <th className="text-left p-2 border-b border-white/10 text-emerald-400 font-medium">
                          Ambient Level
                        </th>
                        <th className="text-left p-2 border-b border-white/10 text-emerald-400 font-medium">
                          Threshold (Rounded)
                        </th>
                        <th className="text-left p-2 border-b border-white/10 text-emerald-400 font-medium">
                          Typical Area
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border-b border-white/5 font-medium text-white">A</td>
                        <td className="p-2 border-b border-white/5">Low (&lt;65 dB)</td>
                        <td className="p-2 border-b border-white/5">65 dB L<sub>Aeq</sub></td>
                        <td className="p-2 border-b border-white/5">Rural, quiet suburban</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-b border-white/5 font-medium text-white">B</td>
                        <td className="p-2 border-b border-white/5">Medium (65&ndash;72 dB)</td>
                        <td className="p-2 border-b border-white/5">70 dB L<sub>Aeq</sub></td>
                        <td className="p-2 border-b border-white/5">Urban residential</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-white">C</td>
                        <td className="p-2">High (&gt;72 dB)</td>
                        <td className="p-2">75 dB L<sub>Aeq</sub></td>
                        <td className="p-2">Near busy roads, industrial</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-white/50 mt-3 text-center">
                  If predicted construction noise exceeds the threshold for the
                  applicable category, the impact is considered potentially
                  significant and additional mitigation is required.
                </p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Key Point:</strong>{" "}
                  The ABC method recognises that the same construction noise
                  level has a{" "}
                  <strong className="text-white">greater impact</strong> in a
                  quiet area than in an already noisy area. A piling rig
                  generating 75 dB(A) at the nearest house would be significant
                  in a quiet rural setting (Category A) but would not exceed the
                  threshold in a noisy urban location (Category C) where the
                  ambient level is already high.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/* Section 05: Noise Control Measures */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">05</span>
            Noise Control Measures
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Noise control follows a{" "}
                <strong>hierarchy of preference</strong>: reduce noise at the
                source first, then control the transmission path, and finally
                protect the receiver. This hierarchy mirrors the general
                principles of prevention in health and safety management, where
                eliminating or reducing the hazard is always preferred over
                relying on personal protective measures.
              </p>

              {/* Noise Control Hierarchy Diagram */}
              <div className="bg-white/5 border border-emerald-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-emerald-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  Noise Control Hierarchy: Source &rarr; Path &rarr; Receiver
                </h3>
                <div className="space-y-3">
                  {/* Source */}
                  <div className="bg-emerald-500/20 border-2 border-emerald-400/60 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/30 text-emerald-300 text-sm font-bold flex-shrink-0">
                        1
                      </span>
                      <p className="text-emerald-300 font-bold text-sm uppercase tracking-wider">
                        Source Control (Most Effective)
                      </p>
                    </div>
                    <p className="text-sm text-white/80 mb-2">
                      Reduce or eliminate noise at the point where it is
                      generated.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      <div className="bg-white/5 rounded p-2 text-xs text-white/70">
                        <strong className="text-white">Quieter plant:</strong>{" "}
                        Select equipment with lower sound power levels (check
                        manufacturer data)
                      </div>
                      <div className="bg-white/5 rounded p-2 text-xs text-white/70">
                        <strong className="text-white">Electric tools:</strong>{" "}
                        Replace diesel-powered plant with electric alternatives
                        where possible
                      </div>
                      <div className="bg-white/5 rounded p-2 text-xs text-white/70">
                        <strong className="text-white">Method change:</strong>{" "}
                        Use hydraulic crushing instead of impact breaking,
                        rotary bored piles instead of driven piles
                      </div>
                      <div className="bg-white/5 rounded p-2 text-xs text-white/70">
                        <strong className="text-white">Maintenance:</strong>{" "}
                        Well-maintained plant is quieter; worn bearings,
                        loose panels, and blunt cutting tools increase noise
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="h-4 w-0.5 bg-emerald-400/40" />
                  </div>

                  {/* Path */}
                  <div className="bg-emerald-500/10 border border-emerald-400/40 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-bold flex-shrink-0">
                        2
                      </span>
                      <p className="text-emerald-300 font-bold text-sm uppercase tracking-wider">
                        Path Control (Transmission)
                      </p>
                    </div>
                    <p className="text-sm text-white/80 mb-2">
                      Reduce noise as it travels from the source to the
                      receiver.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      <div className="bg-white/5 rounded p-2 text-xs text-white/70">
                        <strong className="text-white">Barriers:</strong>{" "}
                        Temporary acoustic barriers or hoarding around the site
                        perimeter (typically 5 to 15 dB reduction)
                      </div>
                      <div className="bg-white/5 rounded p-2 text-xs text-white/70">
                        <strong className="text-white">Enclosures:</strong>{" "}
                        Acoustic enclosures around particularly noisy fixed
                        plant (generators, compressors, pumps)
                      </div>
                      <div className="bg-white/5 rounded p-2 text-xs text-white/70">
                        <strong className="text-white">Distance:</strong>{" "}
                        Maximise the distance between noisy plant and
                        sensitive receptors; noise reduces by approximately
                        6 dB with each doubling of distance
                      </div>
                      <div className="bg-white/5 rounded p-2 text-xs text-white/70">
                        <strong className="text-white">Orientation:</strong>{" "}
                        Position plant so that the noisiest side faces away
                        from sensitive receptors; use buildings as natural
                        screens
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="h-4 w-0.5 bg-emerald-400/40" />
                  </div>

                  {/* Receiver */}
                  <div className="bg-white/5 border border-emerald-400/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-emerald-300 text-sm font-bold flex-shrink-0">
                        3
                      </span>
                      <p className="text-emerald-300 font-bold text-sm uppercase tracking-wider">
                        Receiver Protection (Last Resort)
                      </p>
                    </div>
                    <p className="text-sm text-white/80 mb-2">
                      Protect or compensate the people affected by the noise.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      <div className="bg-white/5 rounded p-2 text-xs text-white/70">
                        <strong className="text-white">Timing:</strong>{" "}
                        Restrict the noisiest activities to times when
                        residents are less likely to be disturbed (not early
                        morning, not evenings, not weekends)
                      </div>
                      <div className="bg-white/5 rounded p-2 text-xs text-white/70">
                        <strong className="text-white">Notification:</strong>{" "}
                        Advance warning to affected residents about
                        particularly noisy works, including expected duration
                      </div>
                      <div className="bg-white/5 rounded p-2 text-xs text-white/70">
                        <strong className="text-white">Glazing:</strong>{" "}
                        Temporary secondary glazing for the most affected
                        properties during the noisiest phases
                      </div>
                      <div className="bg-white/5 rounded p-2 text-xs text-white/70">
                        <strong className="text-white">Relocation:</strong>{" "}
                        In extreme cases, temporary alternative accommodation
                        for the most severely affected residents
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">
                    In Practice:
                  </strong>{" "}
                  Effective noise management usually combines measures from all
                  three levels of the hierarchy. For example, a piling operation
                  might use a{" "}
                  <strong className="text-white">
                    continuous flight auger (CFA) method
                  </strong>{" "}
                  instead of impact piling (source control), erect an{" "}
                  <strong className="text-white">acoustic barrier</strong>{" "}
                  around the piling rig (path control), and restrict piling
                  hours to{" "}
                  <strong className="text-white">09:00 to 17:00</strong>{" "}
                  (receiver protection through timing). The combination of
                  measures demonstrates BPM.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 06: Construction Vibration */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">06</span>
            Construction Vibration
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Vibration from construction activities travels through the
                ground and can be felt in nearby buildings. While vibration
                rarely causes structural damage to buildings (except at very
                high levels), it can cause{" "}
                <strong>significant disturbance</strong> to occupants and
                generate a large number of complaints. The gap between the
                level at which vibration is perceived and the level at which
                damage occurs is very large, which means{" "}
                <strong>human disturbance</strong> is almost always the
                controlling factor.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  <Activity className="h-4 w-4 inline-block mr-2 -mt-0.5 text-emerald-400" />
                  Common Sources of Construction Vibration
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Piling (impact and vibratory):
                      </strong>{" "}
                      Impact piling (driving piles into the ground with a
                      hammer) generates some of the highest vibration levels
                      encountered on construction sites. Vibratory piling uses
                      a vibrating mechanism to drive sheet piles and generates
                      continuous, lower-amplitude vibration that can travel
                      considerable distances.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Demolition:</strong>{" "}
                      Hydraulic breaking, wrecking ball, and controlled
                      explosive demolition all generate significant
                      ground-borne vibration. The magnitude depends on the
                      energy involved and the distance from the source.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Dynamic compaction and rolling:
                      </strong>{" "}
                      Ground improvement and compaction using vibratory rollers
                      or drop weights generate repetitive vibration that can
                      travel through soft ground and affect nearby structures.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Tunnelling and boring:
                      </strong>{" "}
                      Tunnel boring machines (TBMs) and micro-tunnelling
                      operations generate ground-borne vibration that can be
                      felt in buildings directly above or adjacent to the
                      tunnel alignment, sometimes at considerable depth.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Heavy vehicle movements:
                      </strong>{" "}
                      Loaded trucks, tracked plant, and heavy rollers can
                      generate perceptible vibration, particularly on uneven
                      surfaces or where roads pass close to buildings.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Peak Particle Velocity (PPV) &mdash; Key Thresholds
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Vibration is measured in terms of{" "}
                  <strong className="text-white">
                    peak particle velocity (PPV)
                  </strong>
                  , expressed in millimetres per second (mm/s). PPV measures
                  the maximum speed at which a particle of ground moves as the
                  vibration wave passes through it.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/30 p-3 rounded">
                    <span className="text-xs font-mono text-emerald-400 w-16 text-right flex-shrink-0 mt-0.5">
                      0.3 mm/s
                    </span>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">
                        Human perception threshold:
                      </strong>{" "}
                      Vibration can just be felt by a person who is
                      stationary and paying attention.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/30 p-3 rounded">
                    <span className="text-xs font-mono text-yellow-400 w-16 text-right flex-shrink-0 mt-0.5">
                      1.0 mm/s
                    </span>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">
                        Distinctly perceptible:
                      </strong>{" "}
                      Most people will readily feel the vibration. Complaints
                      likely in residential areas.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 bg-orange-500/10 border border-orange-500/30 p-3 rounded">
                    <span className="text-xs font-mono text-orange-400 w-16 text-right flex-shrink-0 mt-0.5">
                      10 mm/s
                    </span>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">
                        Strongly perceptible:
                      </strong>{" "}
                      Vibration is readily felt, rattling of windows and
                      crockery may occur. High complaint levels expected.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 p-3 rounded">
                    <span className="text-xs font-mono text-red-400 w-16 text-right flex-shrink-0 mt-0.5">
                      15 mm/s
                    </span>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">
                        Cosmetic damage threshold:
                      </strong>{" "}
                      Below 15 mm/s PPV at low frequencies (4&ndash;15 Hz),
                      cosmetic damage to typical residential buildings is
                      unlikely (BS 7385-2).
                    </p>
                  </div>
                  <div className="flex items-start gap-3 bg-red-500/20 border border-red-500/50 p-3 rounded">
                    <span className="text-xs font-mono text-red-400 w-16 text-right flex-shrink-0 mt-0.5">
                      50 mm/s
                    </span>
                    <p className="text-sm text-white/80">
                      <strong className="text-white">
                        Major structural damage:
                      </strong>{" "}
                      At this level, structural damage becomes a real
                      possibility. Very rarely encountered from normal
                      construction activities at typical working distances.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    The Complaint Gap
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The most important thing to understand about construction
                  vibration is the{" "}
                  <strong className="text-white">
                    enormous gap between perception and damage
                  </strong>
                  . People feel vibration at 0.3 mm/s and complain at 1 to
                  2 mm/s, but cosmetic damage does not begin until at least
                  15 mm/s &mdash; roughly 50 times higher. This means that the
                  vast majority of vibration complaints relate to disturbance,
                  not damage. However, the fact that vibration does not damage
                  a building does not mean the occupants&rsquo; distress is
                  invalid. Vibration in a home can be extremely unsettling,
                  particularly if it is unexpected, prolonged, or occurs at
                  night.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/* Section 07: BS 5228 Part 2 Vibration */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">07</span>
            BS 5228 Part 2 &mdash; Vibration Assessment &amp; Monitoring
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                BS 5228-2 provides the framework for{" "}
                <strong>predicting, assessing, and controlling</strong>{" "}
                vibration from construction activities. It works alongside
                BS 7385-2, which provides the building damage criteria. Together,
                these standards form the basis of vibration management on UK
                construction sites.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  <BarChart3 className="h-4 w-4 inline-block mr-2 -mt-0.5 text-emerald-400" />
                  Vibration Assessment Process
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Identify vibration-generating activities:
                      </strong>{" "}
                      List all construction activities that are likely to
                      produce significant vibration (piling, breaking,
                      compaction, heavy vehicle movements, tunnelling).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Identify sensitive receptors:
                      </strong>{" "}
                      Determine which buildings and structures could be
                      affected, including residential properties, commercial
                      buildings, historic structures, buildings with vibration-sensitive
                      equipment (e.g. operating theatres, laboratories,
                      recording studios), and buried services.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Predict vibration levels:
                      </strong>{" "}
                      Use empirical prediction methods from BS 5228-2 to
                      estimate the PPV at each receptor. Predictions are based
                      on the type of activity, the energy input, the distance
                      from the source, and the ground conditions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Compare with thresholds:
                      </strong>{" "}
                      Compare predicted PPV values against the cosmetic and
                      structural damage thresholds in BS 7385-2 and against
                      human perception and disturbance criteria.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Trigger Levels and Action Levels
                </p>
                <p className="text-sm text-white/80 mb-3">
                  A tiered monitoring system is used to manage vibration during
                  construction:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-yellow-500/20 text-yellow-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      T
                    </span>
                    <span>
                      <strong className="text-white">
                        Trigger level (warning):
                      </strong>{" "}
                      Set below the action level, typically at 50% to 75% of
                      the action level. When the trigger level is reached,
                      additional monitoring is initiated, the working method
                      is reviewed, and the situation is closely watched. The
                      trigger level provides{" "}
                      <strong className="text-white">early warning</strong>{" "}
                      before the action level is reached.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex items-center justify-center min-w-[24px] h-6 rounded bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      A
                    </span>
                    <span>
                      <strong className="text-white">
                        Action level (stop/modify):
                      </strong>{" "}
                      When the action level is reached, specific actions must
                      be taken. Depending on the level and circumstances, this
                      may include modifying the working method (e.g. reducing
                      hammer energy on a piling rig), increasing the monitoring
                      frequency, pausing work until the situation is assessed,
                      or stopping the vibration-generating activity entirely.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  BS 7385-2 &mdash; Building Damage Criteria
                </p>
                <p className="text-sm text-white/80 mb-3">
                  BS 7385-2 provides guidance on the vibration levels at which
                  damage to buildings may occur. It distinguishes between:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Cosmetic damage:
                      </strong>{" "}
                      The formation of hairline cracks in plaster, the
                      widening of existing cracks, or the loosening of loose
                      render. This is superficial and easily repaired.
                      Threshold for residential buildings: typically{" "}
                      <strong className="text-white">15 mm/s PPV</strong> at
                      low frequencies (4&ndash;15 Hz), rising to{" "}
                      <strong className="text-white">20 mm/s PPV</strong> at
                      higher frequencies (15&ndash;40 Hz).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Minor structural damage:
                      </strong>{" "}
                      Cracking of masonry, loosening of roof tiles, damage to
                      rainwater goods. Requires repair but does not affect
                      structural integrity. Typically occurs above{" "}
                      <strong className="text-white">25 mm/s PPV</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Major structural damage:
                      </strong>{" "}
                      Cracking of structural elements, settlement, or
                      instability. Affects the structural integrity of the
                      building. Typically occurs above{" "}
                      <strong className="text-white">50 mm/s PPV</strong>.
                      Very rarely caused by normal construction activities.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Vibration Monitoring in Practice
                </p>
                <p className="text-sm text-white/80">
                  Vibration monitors (geophones or accelerometers) are installed
                  at the nearest sensitive receptors and on the construction site
                  boundary. They continuously record PPV in three orthogonal
                  axes and transmit data in real time to a central system. When
                  a trigger level is reached, an automatic alert is sent to the
                  site team. This allows immediate intervention before the
                  action level is exceeded. All monitoring data is logged,
                  time-stamped, and retained as evidence of compliance. On
                  sensitive projects, condition surveys of nearby buildings are
                  carried out before, during, and after the works to document
                  any pre-existing defects and to identify any new damage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 08: Community Relations */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">08</span>
            Community Relations
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Even with the best noise and vibration control measures in
                place, construction work will be noticed by the surrounding
                community. The difference between a project that runs smoothly
                and one that is plagued by complaints, enforcement action, and
                delays often comes down to{" "}
                <strong>how well the contractor communicates</strong> with the
                people affected by the work. Good community relations do not
                make the noise go away, but they dramatically reduce the
                number of complaints because residents who understand what is
                happening, why, and for how long are far more tolerant than
                those who are kept in the dark.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  <Users className="h-4 w-4 inline-block mr-2 -mt-0.5 text-emerald-400" />
                  Section 61 Consultation
                </p>
                <p className="text-sm text-white/80">
                  As part of the Section 61 prior consent process, the local
                  authority typically expects the contractor to have engaged
                  with the local community before the application is submitted.
                  This includes identifying the nearest noise-sensitive
                  receptors, contacting residents and businesses to explain the
                  proposed works, holding public meetings or drop-in sessions
                  where residents can ask questions and raise concerns, and
                  incorporating community feedback into the noise management
                  plan where practicable. This early engagement builds trust
                  and demonstrates that the contractor takes the community&rsquo;s
                  concerns seriously.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Advance Notification
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Before noisy activities:
                      </strong>{" "}
                      Residents must be notified in advance of particularly
                      noisy or disruptive activities. Notification should include
                      what the work involves, when it will happen (dates and
                      hours), how long it will last, why it is necessary, and a
                      contact number for complaints or enquiries.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Notification methods:
                      </strong>{" "}
                      Leaflet drops, letters, newsletters, project website or
                      app, notice boards at the site perimeter, and direct
                      contact with the most affected neighbours. For large
                      projects, a regular newsletter keeping the community
                      informed of progress and upcoming works is good practice.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Timing of notification:
                      </strong>{" "}
                      Ideally at least one week before the noisy activity
                      begins, though for very disruptive works (e.g. piling,
                      extended demolition), two weeks or more is appropriate.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Complaint Procedures
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Dedicated contact:
                      </strong>{" "}
                      A clearly advertised telephone number and email address
                      for complaints and enquiries, staffed during working
                      hours and with a voicemail service outside hours.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Complaints register:
                      </strong>{" "}
                      All complaints must be logged in a register recording the
                      date, time, nature of the complaint, the complainant&rsquo;s
                      details, the investigation undertaken, and the response
                      given. This register must be available for inspection by
                      the local authority.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Response time:
                      </strong>{" "}
                      Complaints should be acknowledged within 24 hours and
                      investigated promptly. A full response should be provided
                      within a reasonable time, explaining what was found and
                      what action, if any, is being taken.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Community Liaison Officer (CLO)
                </p>
                <p className="text-sm text-white/80">
                  On major projects, a dedicated{" "}
                  <strong className="text-white">
                    community liaison officer
                  </strong>{" "}
                  is appointed as the single point of contact between the
                  project and the community. The CLO manages all notifications,
                  handles complaints, organises community meetings, coordinates
                  with the local authority environmental health team, and
                  ensures the project team is aware of local sensitivities.
                  Having a named, accessible individual whom residents can
                  contact directly is far more effective than an impersonal
                  complaints hotline.
                </p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Considerate Working Hours
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Standard hours:</strong>{" "}
                      Most local authorities define standard construction hours
                      as 08:00 to 18:00 Monday to Friday and 08:00 to 13:00 on
                      Saturdays, with no noisy work on Sundays or bank holidays.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Early start-up:</strong>{" "}
                      The period from 07:00 to 08:00 is often restricted to
                      quiet activities only (no hammering, no heavy plant, no
                      deliveries that require reversing alarms). This allows
                      workers to prepare for the day without disturbing
                      sleeping residents.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Local sensitivities:</strong>{" "}
                      Considerate contractors adjust their hours and activities
                      around local events (school exam periods, religious
                      observances, community festivals) and nearby sensitive
                      uses (hospitals, care homes, concert venues). This level
                      of consideration significantly reduces complaints and
                      builds goodwill.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Monitoring Reports
                </p>
                <p className="text-sm text-white/80">
                  Regular monitoring reports should be produced summarising
                  noise and vibration levels recorded at the nearest receptors,
                  any exceedances of agreed limits or trigger levels, the cause
                  of any exceedances and the corrective action taken, a summary
                  of complaints received and the responses given, and any
                  changes to the noise management plan. These reports are
                  typically shared with the local authority on a monthly or
                  quarterly basis as a condition of the Section 61 consent or
                  planning permission. They provide{" "}
                  <strong className="text-white">
                    evidence of compliance
                  </strong>{" "}
                  and demonstrate the contractor&rsquo;s commitment to ongoing
                  noise and vibration management.
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
            <Link to="../environmental-sustainability-module-4-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Air Quality Management
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-4-section-4">
              Next: Land Contamination
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
