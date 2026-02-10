import {
  ArrowLeft,
  Activity,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ──────────────────────────────────────────────────────────────────────────
   Quick-check questions (inline knowledge checks after sections 02, 05, 07)
   ────────────────────────────────────────────────────────────────────────── */

const quickCheckQuestions = [
  {
    id: "personal-vs-static",
    question:
      "Why is personal air sampling generally preferred over static (area) sampling for assessing worker exposure?",
    options: [
      "Personal sampling equipment is cheaper",
      "Personal sampling measures the concentration in the worker's breathing zone and reflects actual exposure",
      "Static sampling always overestimates exposure",
      "Personal sampling does not require laboratory analysis",
    ],
    correctIndex: 1,
    explanation:
      "Personal sampling uses a pump and filter or sorbent tube worn on the worker's lapel, measuring the actual concentration of contaminants in their breathing zone. Static sampling measures background levels at a fixed point, which may not reflect what the individual worker is actually inhaling. COSHH Regulation 10 specifically requires that exposure assessment be representative of personal exposure.",
  },
  {
    id: "record-keeping-duration",
    question:
      "How long must personal exposure monitoring records be kept under COSHH Regulation 10(5)?",
    options: [
      "5 years",
      "10 years",
      "25 years",
      "40 years",
    ],
    correctIndex: 3,
    explanation:
      "COSHH Regulation 10(5) requires that personal exposure monitoring records be kept for at least 40 years from the date of the last entry. This extended period reflects the long latency of many occupational diseases. Records for non-personal monitoring need only be kept for 5 years.",
  },
  {
    id: "biological-monitoring-purpose",
    question:
      "What does biological monitoring measure?",
    options: [
      "The concentration of a hazardous substance in the air",
      "The amount of dust on work surfaces",
      "Metabolites or substances in the worker's urine or blood, indicating how much has been absorbed",
      "The effectiveness of RPE by measuring face-fit",
    ],
    correctIndex: 2,
    explanation:
      "Biological monitoring measures the actual uptake of a substance by the body, typically by analysing metabolites in urine or blood samples. For example, mandelic acid in urine indicates styrene exposure, and hippuric acid indicates toluene exposure. This gives a more complete picture than air monitoring alone because it accounts for all routes of absorption including skin contact and ingestion.",
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   Frequently Asked Questions
   ────────────────────────────────────────────────────────────────────────── */

const faqs = [
  {
    question:
      "I work as an electrician on construction sites. Is air monitoring likely to affect my work?",
    answer:
      "Yes, it can. If you work near processes that generate dust, fumes, or vapour (such as concrete cutting, painting, welding, or solvent cleaning), air monitoring may be carried out in your work area or you may be asked to wear a personal sampling pump. Even if you are not the primary source of the hazard, you may still be exposed. Construction sites commonly monitor for respirable crystalline silica (RCS), wood dust, isocyanate paint fumes, and welding fumes. You should cooperate with any monitoring programme and ask your supervisor about the results.",
  },
  {
    question:
      "What should I do if I see monitoring results that exceed the Workplace Exposure Limit?",
    answer:
      "An exceedance of the WEL is a serious matter. Under COSHH Regulation 7, exposure must be reduced to below the WEL. Your employer must immediately review and improve the control measures in place, which might include better extraction, enclosure, substitution, or provision of RPE as a short-term interim measure. Work should not continue under the same conditions. You have the right to be informed of monitoring results and to raise concerns with your employer or safety representative without fear of reprisal.",
  },
  {
    question:
      "Who is qualified to carry out workplace air monitoring?",
    answer:
      "Workplace air monitoring should be carried out by a competent person, typically a qualified occupational hygienist. In the UK, the professional body is the British Occupational Hygiene Society (BOHS). Practitioners may hold qualifications such as the BOHS Certificate of Competence in Occupational Hygiene, or a Diploma of Professional Competence in Occupational Hygiene (DPOH). For certain regulated substances like asbestos, specific UKAS accreditation is required. Your employer should use a reputable consultancy with appropriately qualified staff.",
  },
  {
    question:
      "Can I request to see the results of air monitoring carried out at my workplace?",
    answer:
      "Absolutely. Under COSHH Regulation 10(6), employees and their safety representatives have the right to access monitoring results. Your employer must make the results available in a form that you can understand. If monitoring reveals that your personal exposure exceeds, or is close to, the WEL, you should be informed individually. It is good practice for employers to share monitoring results with the workforce even when levels are within acceptable limits, as this builds confidence in the control measures.",
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   End-of-section quiz (8 questions)
   ────────────────────────────────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Under which COSHH Regulation is workplace monitoring required?",
    options: [
      "Regulation 6 — Risk Assessment",
      "Regulation 7 — Prevention or Control of Exposure",
      "Regulation 10 — Monitoring Exposure at the Workplace",
      "Regulation 11 — Health Surveillance",
    ],
    correctAnswer: 2,
    explanation:
      "COSHH Regulation 10 specifically covers monitoring exposure at the workplace. It requires employers to ensure that the exposure of employees to hazardous substances is monitored where necessary, using appropriate procedures. Regulation 6 covers assessment, Regulation 7 covers control measures, and Regulation 11 covers health surveillance.",
  },
  {
    id: 2,
    question:
      "Which type of air sampling provides the most accurate representation of an individual worker's exposure?",
    options: [
      "Static (area) sampling with a fixed monitor",
      "Grab sampling with a detector tube",
      "Personal sampling using a pump worn by the worker",
      "Real-time monitoring with a photoionisation detector at the room entrance",
    ],
    correctAnswer: 2,
    explanation:
      "Personal sampling uses a pump and collection device (filter or sorbent tube) attached to the worker's lapel, within the breathing zone. This measures what the worker actually inhales over the sampling period and provides the most accurate representation of personal exposure. Static sampling and room-level monitors cannot capture the variations in exposure that occur as the worker moves through different tasks.",
  },
  {
    id: 3,
    question:
      "What does a cyclone attachment on a gravimetric sampling head do?",
    options: [
      "It increases the pump flow rate for faster sampling",
      "It separates the respirable fraction of dust from larger particles",
      "It detects the chemical composition of the dust",
      "It removes moisture from the air sample",
    ],
    correctAnswer: 1,
    explanation:
      "A cyclone is a size-selective device that spins the incoming air, causing larger particles to deposit on the inside wall while allowing only smaller (respirable) particles to pass through to the filter. This is essential because only respirable dust (particles typically less than 10 micrometres) can penetrate deep into the lungs where it causes the most damage. The collected respirable dust is then weighed to determine the concentration.",
  },
  {
    id: 4,
    question:
      "A colorimetric detector tube (e.g. Drager tube) is most useful for which purpose?",
    options: [
      "Providing a long-term 8-hour TWA measurement for comparison with WELs",
      "Providing a quick spot-check of gas or vapour concentration at a specific moment",
      "Measuring the respirable dust fraction in a construction environment",
      "Replacing the need for laboratory analysis of sorbent tube samples",
    ],
    correctAnswer: 1,
    explanation:
      "Colorimetric detector tubes (such as Drager tubes) are grab-sampling devices that give a rapid, on-the-spot indication of gas or vapour concentration. Air is drawn through a glass tube containing a chemical reagent that changes colour in proportion to the concentration. They are excellent for quick checks and screening but are not suitable for determining 8-hour TWA values, as they only measure a snapshot in time.",
  },
  {
    id: 5,
    question:
      "How long must records of personal exposure monitoring be retained under COSHH?",
    options: [
      "5 years",
      "10 years",
      "30 years",
      "40 years",
    ],
    correctAnswer: 3,
    explanation:
      "COSHH Regulation 10(5) requires that records of personal exposure monitoring must be kept for at least 40 years from the date of the last entry. This exceptionally long retention period is because many occupational diseases — such as mesothelioma, chronic obstructive pulmonary disease, and occupational cancer — have very long latency periods, sometimes 20 to 50 years after exposure.",
  },
  {
    id: 6,
    question:
      "Mandelic acid measured in a worker's urine sample is a biological monitoring indicator for exposure to which substance?",
    options: [
      "Toluene",
      "Isocyanates",
      "Styrene",
      "Lead",
    ],
    correctAnswer: 2,
    explanation:
      "Mandelic acid is a metabolite of styrene. When styrene is absorbed into the body (through inhalation or skin contact), the liver metabolises it to mandelic acid, which is then excreted in the urine. Measuring urinary mandelic acid levels provides a reliable indication of total styrene uptake. For toluene, the corresponding metabolite is hippuric acid. Biological Guidance Values for these metabolites are published in EH40.",
  },
  {
    id: 7,
    question:
      "Why might surface contamination monitoring (wipe sampling) be important even when air monitoring results are within WELs?",
    options: [
      "It is a legal requirement under COSHH Regulation 10 to always carry out wipe sampling",
      "Surface contamination can indicate a skin exposure risk or potential for ingestion that air monitoring does not capture",
      "Wipe sampling is cheaper and faster than air monitoring",
      "Surface contamination is only relevant for biological agents",
    ],
    correctAnswer: 1,
    explanation:
      "Air monitoring only measures the inhalation route of exposure. Many hazardous substances can also be absorbed through the skin or ingested (for example, by eating or drinking in contaminated areas, or by hand-to-mouth contact). Wipe sampling identifies surface contamination that could lead to skin absorption or inadvertent ingestion. This is particularly important for substances with a 'Sk' notation in EH40 (indicating significant skin absorption potential).",
  },
  {
    id: 8,
    question:
      "An electrician working on a refurbishment site is asked to wear a personal sampling pump for a full shift. What should the pump be measuring?",
    options: [
      "Only the noise levels in the work area",
      "The temperature and humidity of the work environment",
      "The airborne concentration of specific hazardous substances the electrician may be exposed to",
      "The electrician's heart rate and blood oxygen levels",
    ],
    correctAnswer: 2,
    explanation:
      "A personal sampling pump draws air through a collection medium (filter, sorbent tube, or cassette) at a controlled flow rate, measuring the airborne concentration of specific hazardous substances in the worker's breathing zone. On a refurbishment site, this might include respirable dust, respirable crystalline silica, wood dust, or solvent vapours depending on the activities nearby. The sample is then sent to a laboratory for analysis and the result is compared with the relevant WEL.",
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════════════════════════════════════ */

export default function CoshhAwarenessModule5Section1() {
  useSEO({
    title:
      "Workplace Monitoring | COSHH Awareness Module 5.1",
    description:
      "Air monitoring techniques, personal and static sampling, real-time instruments, surface contamination, biological monitoring, interpreting results against WELs, and record-keeping requirements under COSHH Regulation 10.",
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
            <Link to="../coshh-awareness-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Page Title ────────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-400/20 border border-violet-500/30 mb-4">
            <Activity className="h-7 w-7 text-violet-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 mx-auto">
            <span className="text-violet-400 text-xs font-semibold">
              MODULE 5 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Workplace Monitoring
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Air monitoring techniques, surface sampling, biological monitoring,
            interpreting results against Workplace Exposure Limits, and the
            record-keeping requirements of COSHH Regulation 10
          </p>
        </header>

        {/* ── Summary Boxes ─────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>COSHH Reg 10:</strong> Employers must monitor workplace
                exposure where necessary
              </li>
              <li>
                <strong>Personal sampling:</strong> Pump + filter worn in the
                breathing zone &mdash; gold standard
              </li>
              <li>
                <strong>40-year records:</strong> Personal exposure data must be
                kept for 40 years
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <p className="text-violet-400/90 text-base font-medium mb-2">
              Key Facts
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>WELs:</strong> Listed in HSE publication EH40 &mdash;
                legally binding limits
              </li>
              <li>
                <strong>Biological monitoring:</strong> Measures metabolites in
                urine/blood for total body uptake
              </li>
              <li>
                <strong>Competent persons:</strong> BOHS-qualified occupational
                hygienists
              </li>
            </ul>
          </div>
        </div>

        {/* ── Learning Outcomes ──────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why workplace monitoring is required under COSHH Regulation 10",
              "Describe the difference between personal sampling and static (area) sampling",
              "Identify common real-time monitoring instruments and their applications",
              "Understand how monitoring results are compared to Workplace Exposure Limits",
              "State the record-keeping requirements including the 40-year retention rule",
              "Explain the purpose of biological monitoring and give examples of biomarkers",
              "Know when surface contamination monitoring is appropriate",
              "Recognise the role of occupational hygienists and BOHS qualifications",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-violet-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 01 — Why Workplace Monitoring Matters
            ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">01</span>
            Why Workplace Monitoring Matters
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Workplace monitoring is the systematic measurement of hazardous
                substances in the working environment. It answers a fundamental
                question:{" "}
                <strong>
                  are the control measures in place actually working?
                </strong>
              </p>

              <p>
                Under{" "}
                <strong>COSHH Regulation 10</strong>, employers must ensure that
                the exposure of employees to substances hazardous to health is
                monitored in accordance with a suitable procedure. This is not
                optional where certain conditions are met &mdash; it is a{" "}
                <strong>legal duty</strong>.
              </p>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">
                    COSHH Regulation 10 &mdash; Key Requirements
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Monitoring must be carried out where{" "}
                      <strong className="text-white">
                        it is requisite for ensuring the maintenance of adequate
                        control
                      </strong>{" "}
                      or for protecting the health of employees
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Monitoring must use a{" "}
                      <strong className="text-white">suitable procedure</strong>{" "}
                      &mdash; validated methods appropriate to the substance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Results must be{" "}
                      <strong className="text-white">recorded</strong> and made
                      available to employees and their representatives
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  When Monitoring Is Required
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Where{" "}
                      <strong className="text-white">
                        failure of controls could result in serious health
                        effects
                      </strong>{" "}
                      &mdash; e.g. exposure to carcinogens, asthmagens, or
                      substances causing irreversible damage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Where there is a realistic possibility that{" "}
                      <strong className="text-white">
                        Workplace Exposure Limits (WELs) could be exceeded
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      As an additional check to{" "}
                      <strong className="text-white">
                        verify that control measures are adequate
                      </strong>{" "}
                      and working properly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Where it is specified in an{" "}
                      <strong className="text-white">
                        Approved Code of Practice
                      </strong>{" "}
                      for the substance in question
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Monitoring provides{" "}
                <strong>objective, quantitative evidence</strong> rather than
                relying on subjective judgement. A risk assessment might
                conclude that controls are adequate, but without monitoring
                data, there is no way to verify this. Monitoring turns{" "}
                &ldquo;we think it is safe&rdquo; into{" "}
                &ldquo;we have measured it and it is safe&rdquo;.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 02 — Types of Air Monitoring
            ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">02</span>
            Types of Air Monitoring
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Air monitoring is the most common form of workplace monitoring
                under COSHH. There are four main approaches, each suited to
                different purposes and situations.
              </p>

              {/* Personal Sampling */}
              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-bold text-violet-400 mb-2">
                  1. Personal Sampling
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The <strong className="text-white">gold standard</strong> for
                  assessing individual worker exposure. A small{" "}
                  <strong className="text-white">battery-powered pump</strong>{" "}
                  is worn on the worker&rsquo;s belt, connected by tubing to a{" "}
                  <strong className="text-white">
                    filter cassette or sorbent tube
                  </strong>{" "}
                  clipped to the lapel within the{" "}
                  <strong className="text-white">breathing zone</strong>{" "}
                  (approximately 30 cm from the nose and mouth).
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-300 flex-shrink-0" />
                    <span>
                      Measures the actual concentration the worker inhales over
                      the sampling period
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-300 flex-shrink-0" />
                    <span>
                      Typically runs for a full{" "}
                      <strong className="text-white">8-hour shift</strong> to
                      produce a Time-Weighted Average (TWA) for comparison
                      with WELs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-300 flex-shrink-0" />
                    <span>
                      The sample is sent to a{" "}
                      <strong className="text-white">
                        UKAS-accredited laboratory
                      </strong>{" "}
                      for analysis
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-300 flex-shrink-0" />
                    <span>
                      Accounts for all tasks and movements during the shift
                    </span>
                  </li>
                </ul>
              </div>

              {/* Static (Area) Sampling */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-bold text-white mb-2">
                  2. Static (Area) Sampling
                </p>
                <p className="text-sm text-white/80 mb-3">
                  A sampling device is placed at a{" "}
                  <strong className="text-white">fixed point</strong> in the
                  workplace &mdash; typically at breathing-zone height
                  (approximately 1.5 metres) near the source of contamination
                  or in the general work area.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Measures <strong className="text-white">background levels</strong>{" "}
                      or area concentrations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Useful for <strong className="text-white">trend analysis</strong>{" "}
                      and checking extraction system performance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Not representative</strong>{" "}
                      of personal exposure &mdash; workers move around and may
                      experience higher or lower concentrations than the static
                      monitor records
                    </span>
                  </li>
                </ul>
              </div>

              {/* Real-Time / Direct-Reading Instruments */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-bold text-white mb-2">
                  3. Real-Time / Direct-Reading Instruments
                </p>
                <p className="text-sm text-white/80 mb-3">
                  These instruments give{" "}
                  <strong className="text-white">
                    immediate, continuous readings
                  </strong>{" "}
                  of contaminant concentration. They are invaluable for
                  identifying peak exposures and confirming the effectiveness
                  of controls in real time.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Photoionisation Detectors (PIDs)
                      </strong>{" "}
                      &mdash; detect volatile organic compounds (VOCs) such as
                      solvents. Use UV light to ionise gas molecules and
                      measure the current produced
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Dust monitors (e.g. TSI DustTrak)
                      </strong>{" "}
                      &mdash; use light-scattering to measure airborne
                      particulate concentration in real time
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Gas detectors
                      </strong>{" "}
                      &mdash; electrochemical cells or infrared sensors for
                      specific gases (CO, CO&#8322;, H&#8322;S, NO&#8322;)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Grab Sampling */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-bold text-white mb-2">
                  4. Grab Sampling
                </p>
                <p className="text-sm text-white/80 mb-3">
                  A <strong className="text-white">short-duration sample</strong>{" "}
                  taken at a specific moment &mdash; a snapshot of conditions
                  rather than an average over a full shift.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Useful for <strong className="text-white">spot checks</strong>,
                      screening surveys, and checking short-term peaks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Includes <strong className="text-white">detector tubes</strong>{" "}
                      (Drager tubes), syringe samples, and evacuated flasks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Not suitable</strong> for
                      determining 8-hour TWA exposure on their own
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ═══════════════════════════════════════════════════════════════
            DIAGRAM 1 — Air Monitoring Methods Overview
            ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
            <Activity className="h-5 w-5 text-violet-400" />
            Air Monitoring Methods Overview
          </h2>

          <div className="grid sm:grid-cols-2 gap-3">
            {/* Personal */}
            <div className="bg-violet-500/15 border-2 border-violet-500/40 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-violet-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-black">P</span>
                </div>
                <p className="text-violet-400 text-base font-bold">
                  Personal Sampling
                </p>
              </div>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Pump worn on belt, filter on lapel</li>
                <li>8-hour TWA measurement</li>
                <li>Best for: WEL compliance</li>
                <li>Lab analysis required</li>
              </ul>
            </div>

            {/* Static */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-black">S</span>
                </div>
                <p className="text-white text-base font-bold">
                  Static Sampling
                </p>
              </div>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Fixed point at 1.5m height</li>
                <li>Background/area levels</li>
                <li>Best for: trend analysis</li>
                <li>Not representative of personal exposure</li>
              </ul>
            </div>

            {/* Real-Time */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-black">R</span>
                </div>
                <p className="text-white text-base font-bold">
                  Real-Time Instruments
                </p>
              </div>
              <ul className="text-xs text-white/80 space-y-1">
                <li>PIDs, dust monitors, gas detectors</li>
                <li>Immediate continuous readings</li>
                <li>Best for: peak detection, LEV checks</li>
                <li>No lab wait time</li>
              </ul>
            </div>

            {/* Grab */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-black">G</span>
                </div>
                <p className="text-white text-base font-bold">
                  Grab Sampling
                </p>
              </div>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Detector tubes, syringe samples</li>
                <li>Snapshot reading at one moment</li>
                <li>Best for: quick screening</li>
                <li>Not suitable for 8-hr TWA alone</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 03 — Monitoring Methods for Specific Hazards
            ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">03</span>
            Monitoring Methods for Specific Hazards
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Different hazardous substances require different sampling and
                analysis techniques. The choice of method depends on the{" "}
                <strong>physical form</strong> of the contaminant (dust, gas,
                vapour, mist, fume, or biological agent) and the{" "}
                <strong>specific substance</strong> of interest.
              </p>

              {/* Dust */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-bold text-white mb-2">
                  Dust (Including Respirable Crystalline Silica)
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Gravimetric sampling
                      </strong>{" "}
                      &mdash; air is drawn through a pre-weighed filter at a
                      controlled flow rate. The filter is re-weighed after
                      sampling and the mass of collected dust is used to
                      calculate the airborne concentration (mg/m&sup3;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Cyclone attachment
                      </strong>{" "}
                      &mdash; fitted to the sampling head to separate the{" "}
                      <strong className="text-white">respirable fraction</strong>{" "}
                      (particles &lt;10&thinsp;&micro;m) from larger particles.
                      Essential for measuring respirable dust and RCS
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Optical instruments
                      </strong>{" "}
                      &mdash; light-scattering devices (e.g. TSI DustTrak) for
                      real-time dust monitoring, useful for identifying peak
                      exposures during specific tasks
                    </span>
                  </li>
                </ul>
              </div>

              {/* Gases and Vapours */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-bold text-white mb-2">
                  Gases and Vapours
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Sorbent tubes</strong>{" "}
                      &mdash; air is drawn through a tube packed with{" "}
                      <strong className="text-white">
                        activated charcoal
                      </strong>{" "}
                      (for organic vapours) or{" "}
                      <strong className="text-white">silica gel</strong> (for
                      polar compounds). The adsorbed substance is desorbed in
                      the laboratory using a solvent or thermal desorption, then
                      analysed by gas chromatography
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Colorimetric detector tubes (Drager tubes)
                      </strong>{" "}
                      &mdash; a glass tube containing a chemical reagent. Air is
                      drawn through using a hand pump. The reagent changes
                      colour in proportion to the concentration, read directly
                      from a scale on the tube. Quick screening tool
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Photoionisation Detectors (PIDs)
                      </strong>{" "}
                      &mdash; real-time, broadband VOC measurement. Useful for
                      screening but does not identify specific substances
                    </span>
                  </li>
                </ul>
              </div>

              {/* Biological Agents */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-bold text-white mb-2">
                  Biological Agents
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Air sampling</strong>{" "}
                      &mdash; air is drawn through a filter or impinger
                      (liquid trap), then cultured in a laboratory to identify
                      and count micro-organisms (bacteria, moulds, fungi)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Surface swabbing</strong>{" "}
                      &mdash; contact plates or swabs are used to sample
                      surfaces for microbial contamination. Relevant in
                      healthcare, food processing, and water-damaged buildings
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Electricians &mdash; Common Exposures:
                  </strong>{" "}
                  On construction and refurbishment sites, electricians are most
                  commonly monitored for{" "}
                  <strong>respirable crystalline silica</strong> (from concrete
                  chasing and drilling),{" "}
                  <strong>wood dust</strong> (from chasing in timber-frame
                  buildings), and{" "}
                  <strong>solvent vapours</strong> (from cable-pulling lubricants,
                  adhesives, and cleaning agents). If working near welding
                  operations, welding fume exposure may also be assessed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 04 — Interpreting Monitoring Results
            ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">04</span>
            Interpreting Monitoring Results
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Raw monitoring data is meaningless without context. Results must
                be{" "}
                <strong>
                  compared against legal limits, previous measurements, and
                  action levels
                </strong>{" "}
                to determine whether exposure is adequately controlled.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Comparison to Workplace Exposure Limits (WELs)
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      WELs are published in{" "}
                      <strong className="text-white">
                        HSE publication EH40
                      </strong>{" "}
                      (Workplace Exposure Limits) and are legally binding under
                      COSHH
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Most WELs are expressed as an{" "}
                      <strong className="text-white">
                        8-hour Time-Weighted Average (TWA)
                      </strong>{" "}
                      in mg/m&sup3; or ppm
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Some substances also have a{" "}
                      <strong className="text-white">
                        Short-Term Exposure Limit (STEL)
                      </strong>{" "}
                      &mdash; a 15-minute reference period for substances with
                      acute effects
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Exposure must be reduced{" "}
                      <strong className="text-white">
                        as low as is reasonably practicable
                      </strong>{" "}
                      (ALARP), even if it is below the WEL
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Trend Analysis
                </p>
                <p className="text-sm text-white/80 mb-2">
                  Individual results tell you the exposure at a point in time.{" "}
                  <strong className="text-white">Trend analysis</strong>{" "}
                  compares results over weeks, months, or years to identify:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Whether exposure is{" "}
                      <strong className="text-white">
                        stable, increasing, or decreasing
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The impact of changes to processes, materials, or controls
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Whether LEV systems are deteriorating and need servicing
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Action Levels
                </p>
                <p className="text-sm text-white/80">
                  Many employers set internal{" "}
                  <strong className="text-white">action levels</strong> below
                  the WEL &mdash; typically at{" "}
                  <strong className="text-white">50% of the WEL</strong>. If
                  monitoring shows exposure has reached the action level,
                  controls are reviewed and improved before the legal limit is
                  approached. This provides a{" "}
                  <strong className="text-white">safety margin</strong> and
                  demonstrates proactive management.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    WEL Exceedance
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If monitoring reveals that a WEL has been exceeded, the
                  employer must take{" "}
                  <strong className="text-white">immediate action</strong>:{" "}
                  identify and remedy the cause, reassess the risk, review and
                  improve control measures, and carry out further monitoring to
                  confirm that exposure is now below the limit. Workers must be
                  informed. Continued exceedance may trigger enforcement action
                  by the HSE.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 05 — Record Keeping Requirements
            ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">05</span>
            Record Keeping Requirements
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                COSHH Regulation 10(5) imposes strict requirements on the
                retention of monitoring records. The durations reflect the long
                latency periods of many occupational diseases.
              </p>

              <div className="bg-violet-500/15 border-2 border-violet-500/40 rounded-xl p-5 sm:p-6">
                <p className="text-violet-400 text-lg font-bold mb-4">
                  Record Retention Periods
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-black">40</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Personal Exposure Records &mdash; 40 Years
                      </p>
                      <p className="text-xs text-white/60">
                        Records identifying individual employees and their
                        measured exposure levels must be retained for at least
                        40 years from the date of the last entry
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-black">5</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Non-Personal Records &mdash; 5 Years
                      </p>
                      <p className="text-xs text-white/60">
                        Static monitoring results, area surveys, and general
                        workplace assessments that do not identify specific
                        individuals must be kept for at least 5 years
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  What Records Must Include
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Date and duration</strong>{" "}
                      of monitoring
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Location</strong> and
                      description of the workplace
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Substance(s) monitored
                      </strong>{" "}
                      and the sampling method used
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Results
                      </strong>{" "}
                      (concentrations measured) and the relevant WEL
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Name of the person monitored
                      </strong>{" "}
                      (for personal exposure records)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Control measures in place
                      </strong>{" "}
                      at the time of monitoring
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Access to Records:
                  </strong>{" "}
                  Under COSHH Regulation 10(6), employees and their safety
                  representatives have the right to access monitoring results.
                  If an employee leaves the company, they may request their
                  personal exposure records from the former employer. The HSE
                  can also require employers to provide monitoring records for
                  inspection.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 06 — Surface Contamination Monitoring
            ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">06</span>
            Surface Contamination Monitoring
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Air monitoring captures only the{" "}
                <strong>inhalation route</strong> of exposure. Many hazardous
                substances also pose a risk through{" "}
                <strong>skin contact and ingestion</strong> &mdash; routes that
                surface contamination monitoring helps to assess.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Wipe Sampling
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      A defined area of a work surface (typically 100 cm&sup2;)
                      is wiped with a{" "}
                      <strong className="text-white">moistened filter</strong>{" "}
                      or swab in a standardised pattern
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      The sample is sent for laboratory analysis to determine
                      the mass of contaminant per unit area
                      (&micro;g/cm&sup2;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Particularly important for substances with an{" "}
                      <strong className="text-white">
                        &lsquo;Sk&rsquo; notation
                      </strong>{" "}
                      in EH40, indicating significant skin absorption potential
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Why Surface Monitoring Matters
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Identifies <strong className="text-white">
                        skin exposure risks
                      </strong> from contaminated surfaces, tools, and
                      equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Detects <strong className="text-white">
                        ingestion risks
                      </strong> where workers may eat, drink, or smoke with
                      contaminated hands
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Evaluates the{" "}
                      <strong className="text-white">
                        effectiveness of cleaning
                      </strong>{" "}
                      and housekeeping procedures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Critical for substances like{" "}
                      <strong className="text-white">
                        lead, isocyanates, and pesticides
                      </strong>{" "}
                      where skin absorption is a primary route
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    For Electricians:
                  </strong>{" "}
                  Surface contamination is relevant when working in industrial
                  environments where hazardous substances are in use. If your
                  tools, cable drums, or work surfaces are contaminated with
                  substances such as lead dust or solvent residues, you may
                  absorb them through your skin or inadvertently ingest them.
                  Good hand hygiene and the use of barrier creams or gloves can
                  significantly reduce this risk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 07 — Biological Monitoring
            ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">07</span>
            Biological Monitoring
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Biological monitoring measures{" "}
                <strong>
                  the actual amount of a substance that has been absorbed into
                  the body
                </strong>
                , regardless of the route of entry (inhalation, skin absorption,
                or ingestion). It provides a more complete picture of total
                exposure than air monitoring alone.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  How It Works
                </p>
                <p className="text-sm text-white/80 mb-3">
                  When a hazardous substance enters the body, the liver and
                  other organs metabolise it into breakdown products called{" "}
                  <strong className="text-white">metabolites</strong>. These
                  metabolites are excreted in urine or can be detected in blood.
                  By measuring the concentration of specific metabolites,
                  occupational health professionals can determine how much of
                  the parent substance was absorbed.
                </p>
              </div>

              <div className="bg-violet-500/15 border-2 border-violet-500/40 rounded-xl p-5 sm:p-6">
                <p className="text-violet-400 text-base font-bold mb-4">
                  Common Biomarkers
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-violet-300 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Mandelic Acid &rarr; Styrene Exposure
                      </p>
                      <p className="text-xs text-white/60">
                        Measured in urine. Indicates total styrene uptake from
                        all routes. Common in fibreglass/composite
                        manufacturing
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-violet-300 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Hippuric Acid &rarr; Toluene Exposure
                      </p>
                      <p className="text-xs text-white/60">
                        Measured in urine. Toluene is a common solvent in paints,
                        adhesives, and cleaning agents
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-violet-300 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Cotinine &rarr; Environmental Tobacco Smoke
                      </p>
                      <p className="text-xs text-white/60">
                        Measured in urine or saliva. A metabolite of nicotine,
                        used to assess passive smoking exposure
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-violet-300 text-xs font-bold">4</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Blood Lead Level &rarr; Lead Exposure
                      </p>
                      <p className="text-xs text-white/60">
                        Measured in blood. Lead is a cumulative toxin found in
                        old paint, lead soldering, and some industrial processes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Biological Guidance Values (BGVs)
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Published in{" "}
                      <strong className="text-white">
                        EH40 (Table 2)
                      </strong>{" "}
                      alongside the WELs for certain substances
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      BGVs represent the{" "}
                      <strong className="text-white">
                        90th percentile
                      </strong>{" "}
                      of biological monitoring results from a group of workers
                      exposed at the WEL &mdash; i.e. the level you would
                      expect if exposure was at the legal limit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      A result{" "}
                      <strong className="text-white">above the BGV</strong>{" "}
                      suggests that total absorption (from all routes) may
                      exceed what would be expected from compliant airborne
                      exposure &mdash; triggering investigation
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  When Biological Monitoring Is Needed
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Where a substance has a significant{" "}
                      <strong className="text-white">skin absorption</strong>{" "}
                      route (&lsquo;Sk&rsquo; notation in EH40)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      To confirm that{" "}
                      <strong className="text-white">RPE is effective</strong>{" "}
                      &mdash; if biological monitoring results are high despite
                      good air monitoring results, the RPE may not be fitting
                      properly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Where workers are exposed via{" "}
                      <strong className="text-white">multiple routes</strong>{" "}
                      simultaneously (inhalation + skin + ingestion)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      For specific substances where biological monitoring is
                      specified in the relevant{" "}
                      <strong className="text-white">
                        Approved Code of Practice
                      </strong>{" "}
                      (e.g. lead)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ═══════════════════════════════════════════════════════════════
            DIAGRAM 2 — Monitoring Decision Flowchart
            ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
            <Activity className="h-5 w-5 text-violet-400" />
            Monitoring Decision Flowchart
          </h2>

          <div className="space-y-2">
            {/* Step 1 */}
            <div className="bg-violet-500/15 border-2 border-violet-500/40 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-violet-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-black">1</span>
                </div>
                <p className="text-violet-400 text-base font-bold">
                  Risk Assessment
                </p>
              </div>
              <p className="text-sm text-white/80">
                Does the COSHH assessment identify a risk of exposure to
                hazardous substances? Could failure of controls cause serious
                health effects? Could WELs be exceeded?
              </p>
            </div>

            {/* Arrow */}
            <div className="flex justify-center py-1">
              <div className="flex flex-col items-center">
                <div className="w-[2px] h-4 bg-white/20" />
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/20" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-black">2</span>
                </div>
                <p className="text-white text-base font-bold">
                  Select Monitoring Type
                </p>
              </div>
              <ul className="text-sm text-white/80 space-y-1">
                <li>Inhalation risk &rarr; Air monitoring (personal/static)</li>
                <li>Skin contact risk &rarr; Surface wipe sampling</li>
                <li>Multiple routes &rarr; Biological monitoring</li>
                <li>Quick screening &rarr; Direct-reading instruments / grab samples</li>
              </ul>
            </div>

            {/* Arrow */}
            <div className="flex justify-center py-1">
              <div className="flex flex-col items-center">
                <div className="w-[2px] h-4 bg-white/20" />
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/20" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-black">3</span>
                </div>
                <p className="text-white text-base font-bold">
                  Carry Out Monitoring
                </p>
              </div>
              <p className="text-sm text-white/80">
                Competent person (occupational hygienist) selects validated
                method, calibrates equipment, conducts sampling under
                representative conditions, and sends samples for analysis.
              </p>
            </div>

            {/* Arrow */}
            <div className="flex justify-center py-1">
              <div className="flex flex-col items-center">
                <div className="w-[2px] h-4 bg-white/20" />
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/20" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-black">4</span>
                </div>
                <p className="text-white text-base font-bold">
                  Interpret Results
                </p>
              </div>
              <p className="text-sm text-white/80">
                Compare to WELs/BGVs, analyse trends, determine if action level
                has been reached. Consider measurement uncertainty.
              </p>
            </div>

            {/* Arrow */}
            <div className="flex justify-center py-1">
              <div className="flex flex-col items-center">
                <div className="w-[2px] h-4 bg-white/20" />
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/20" />
              </div>
            </div>

            {/* Step 5 — branching */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-green-500/15 border-2 border-green-500/40 rounded-xl p-4 sm:p-5">
                <p className="text-green-400 text-sm font-bold mb-2">
                  Below WEL / Action Level
                </p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Record results</li>
                  <li>Continue current controls</li>
                  <li>Schedule next monitoring round</li>
                  <li>Inform workers of results</li>
                </ul>
              </div>
              <div className="bg-red-500/15 border-2 border-red-500/40 rounded-xl p-4 sm:p-5">
                <p className="text-red-400 text-sm font-bold mb-2">
                  At or Above WEL
                </p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Immediate action to reduce exposure</li>
                  <li>Review and improve controls</li>
                  <li>Re-monitor to confirm reduction</li>
                  <li>Inform workers; consider health surveillance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 08 — Professional Competence & Practical Examples
            ═══════════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-violet-400/80 text-sm font-normal">08</span>
            Professional Competence &amp; Practical Examples
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Workplace monitoring is a specialist discipline. Using
                unqualified personnel or inappropriate methods can produce
                misleading results that put workers at risk.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Who Should Carry Out Monitoring?
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Occupational Hygienists
                      </strong>{" "}
                      &mdash; the primary professionals for workplace monitoring.
                      They assess, measure, and advise on controlling workplace
                      health hazards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        BOHS (British Occupational Hygiene Society)
                      </strong>{" "}
                      &mdash; the professional body in the UK. Key
                      qualifications include the Certificate of Competence in
                      Occupational Hygiene and the Diploma of Professional
                      Competence in Occupational Hygiene (DPOH)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        UKAS-accredited laboratories
                      </strong>{" "}
                      &mdash; must be used for sample analysis to ensure
                      accuracy and legal admissibility of results
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Practical Examples for Electricians and Construction Workers
                </p>
                <div className="space-y-4">
                  {/* Example 1 */}
                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-violet-400">
                          1
                        </span>
                      </div>
                      <p className="text-sm font-medium text-violet-400">
                        Concrete Chasing on a Refurbishment Site
                      </p>
                    </div>
                    <p className="text-sm text-white/80 mb-2">
                      An electrician spends 3 hours per shift chasing concrete
                      walls to install new cable routes. The employer commissions
                      personal air monitoring for respirable crystalline silica
                      (RCS).
                    </p>
                    <p className="text-xs text-white/60">
                      <strong className="text-white">Method:</strong> Personal
                      sampling pump with cyclone and filter, running for the
                      full shift. Filter analysed by X-ray diffraction at a UKAS
                      laboratory. Result compared to the RCS WEL of 0.1
                      mg/m&sup3; (8-hour TWA).
                    </p>
                  </div>

                  {/* Example 2 */}
                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-violet-400">
                          2
                        </span>
                      </div>
                      <p className="text-sm font-medium text-violet-400">
                        Solvent Use in a Confined Plant Room
                      </p>
                    </div>
                    <p className="text-sm text-white/80 mb-2">
                      An electrician uses a solvent-based cleaning agent to
                      degrease cable terminations in a small plant room with
                      limited ventilation. The supervisor is concerned about
                      vapour build-up.
                    </p>
                    <p className="text-xs text-white/60">
                      <strong className="text-white">Method:</strong> Quick
                      screening with a PID (photoionisation detector) to check
                      real-time VOC levels. If elevated, followed by personal
                      sampling with sorbent tubes for the specific solvent.
                      Drager tubes used for immediate spot checks.
                    </p>
                  </div>

                  {/* Example 3 */}
                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-violet-400">
                          3
                        </span>
                      </div>
                      <p className="text-sm font-medium text-violet-400">
                        Working Near Welding Operations
                      </p>
                    </div>
                    <p className="text-sm text-white/80 mb-2">
                      An electrician installs lighting in a fabrication workshop
                      where welding is ongoing. Although the electrician is not
                      welding, they may be exposed to welding fume as a
                      bystander.
                    </p>
                    <p className="text-xs text-white/60">
                      <strong className="text-white">Method:</strong> Personal
                      sampling for total inhalable dust and specific metals
                      (manganese, chromium, nickel) depending on the welding
                      process. Static monitoring may also be placed near the
                      electrician&rsquo;s work area. Results compared to the
                      general WEL for welding fume (1 mg/m&sup3; as inhalable
                      dust).
                    </p>
                  </div>

                  {/* Example 4 */}
                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-violet-400">
                          4
                        </span>
                      </div>
                      <p className="text-sm font-medium text-violet-400">
                        Lead Paint Disturbance During Rewire
                      </p>
                    </div>
                    <p className="text-sm text-white/80 mb-2">
                      During a domestic rewire of a Victorian property, an
                      electrician disturbs layers of old lead-based paint while
                      lifting floorboards and chasing walls.
                    </p>
                    <p className="text-xs text-white/60">
                      <strong className="text-white">Method:</strong> Personal
                      air monitoring for airborne lead dust. Surface wipe
                      sampling on work surfaces and tools. Biological monitoring
                      (blood lead level) if the assessment indicates significant
                      exposure risk. Blood lead results compared to the
                      suspension limit specified in the Control of Lead at Work
                      Regulations 2002.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Your Role as a Worker:
                  </strong>{" "}
                  Even though you will not carry out monitoring yourself, you
                  should understand <strong>why</strong> monitoring is done,{" "}
                  <strong>cooperate</strong> with monitoring programmes (e.g.
                  wearing a sampling pump when asked),{" "}
                  <strong>ask to see</strong> the results, and{" "}
                  <strong>raise concerns</strong> if you believe your exposure is
                  not being adequately controlled. You have a legal right to be
                  informed of monitoring results under COSHH Regulation 10(6).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FAQ Section
            ═══════════════════════════════════════════════════════════════ */}
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

        {/* ═══════════════════════════════════════════════════════════════
            Quiz
            ═══════════════════════════════════════════════════════════════ */}
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* ═══════════════════════════════════════════════════════════════
            Bottom Navigation
            ═══════════════════════════════════════════════════════════════ */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-4-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Module 4 Section 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-violet-500 text-white hover:bg-violet-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../coshh-awareness-module-5-section-2">
              Next: Health Surveillance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
