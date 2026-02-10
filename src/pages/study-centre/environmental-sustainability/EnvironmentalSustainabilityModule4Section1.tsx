import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, ShieldCheck, Wind, Droplets, Activity, BarChart3, FileText, Gauge, TreePine, Building2, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Inline Knowledge Checks (3)                                       */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "env-sustainability-m4s1-pm10-threshold",
    question: "Under the Air Quality Standards Regulations 2010, what is the 24-hour mean limit value for PM10 (particulate matter with a diameter of 10 micrometres or less)?",
    options: [
      "25 \u00b5g/m\u00b3, not to be exceeded more than 7 times per year",
      "50 \u00b5g/m\u00b3, not to be exceeded more than 35 times per calendar year",
      "75 \u00b5g/m\u00b3, not to be exceeded more than 18 times per calendar year",
      "100 \u00b5g/m\u00b3, not to be exceeded more than 10 times per calendar year"
    ],
    correctIndex: 1,
    explanation:
      "The Air Quality Standards Regulations 2010 set a 24-hour mean limit value for PM10 of 50 \u00b5g/m\u00b3, which must not be exceeded more than 35 times in a single calendar year. The annual mean limit value for PM10 is 40 \u00b5g/m\u00b3. These limits are legally binding and apply across England, Wales, and Scotland. Construction sites that generate dust emissions contributing to an exceedance of these limits can face enforcement action from local authorities under the Environmental Protection Act 1990, including the service of abatement notices requiring immediate cessation of dust-generating activities until adequate control measures are in place."
  },
  {
    id: "env-sustainability-m4s1-rcs-exposure",
    question: "What is the Workplace Exposure Limit (WEL) for respirable crystalline silica (RCS) dust in the UK, as set by EH40?",
    options: [
      "0.05 mg/m\u00b3 (8-hour TWA)",
      "0.1 mg/m\u00b3 (8-hour TWA)",
      "0.5 mg/m\u00b3 (8-hour TWA)",
      "1.0 mg/m\u00b3 (8-hour TWA)"
    ],
    correctIndex: 1,
    explanation:
      "The Workplace Exposure Limit (WEL) for respirable crystalline silica (RCS) in the UK is 0.1 mg/m\u00b3 as an 8-hour time-weighted average (TWA), as set out in EH40/2005 (Table 1). RCS is classified as a Category 1A carcinogen under the CLP Regulation, meaning there is sufficient evidence that it causes cancer in humans. Prolonged exposure to RCS above the WEL can cause silicosis (irreversible scarring of the lungs), chronic obstructive pulmonary disease (COPD), and lung cancer. Construction activities that generate RCS include cutting, grinding, and drilling concrete, brick, stone, morite, and sandstone. Under COSHH Regulation 11, employers must ensure that exposure does not exceed the WEL and must implement control measures following the hierarchy of controls."
  },
  {
    id: "env-sustainability-m4s1-nrmm-stage",
    question: "Under the London Non-Road Mobile Machinery (NRMM) Low Emission Zone requirements, what minimum engine emission standard is required for NRMM used on major development sites within Greater London?",
    options: [
      "Stage IIIA for all machinery regardless of location",
      "Stage IIIB for all machinery, with Stage IV required in the Central Activity Zone and Canary Wharf",
      "Stage IV for all machinery across Greater London",
      "Stage V for all machinery, with no exemptions"
    ],
    correctIndex: 1,
    explanation:
      "The London NRMM Low Emission Zone requires that NRMM (Non-Road Mobile Machinery) used on major development sites across Greater London meets a minimum of Stage IIIB emission standards. Within the Central Activity Zone (CAZ) and the area around Canary Wharf, a higher standard of Stage IV is required. These requirements apply to NRMM with a net power output of between 37 kW and 560 kW, including excavators, generators, compressors, mobile cranes, and telehandlers. The standards are progressively tightened over time, with Stage V requirements phased in from 2025 onwards. Other local authorities are increasingly adopting similar NRMM requirements in their planning conditions and local air quality action plans, making NRMM emission standards a nationwide consideration for construction projects."
  }
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Can a construction site be shut down solely because of dust complaints from neighbouring residents?",
    answer:
      "Yes. Under Section 80 of the Environmental Protection Act 1990, local authorities have the power to serve an abatement notice if they are satisfied that a statutory nuisance exists or is likely to occur or recur. Dust from construction sites can constitute a statutory nuisance under Section 79(1)(d) (dust or other effluvia arising on industrial, trade, or business premises and being prejudicial to health or a nuisance). An abatement notice can require the person responsible to abate the nuisance and/or to prevent its recurrence, and can specify the works or steps required to achieve this. Failure to comply with an abatement notice without reasonable excuse is a criminal offence, punishable by a fine of up to \u00a320,000 for offences on industrial, trade, or business premises. In practice, this means that if a local authority receives complaints about construction dust and its officers confirm that the dust constitutes a nuisance, they can require the site to cease the dust-generating activity until adequate control measures are implemented. In extreme cases, the local authority can seek an injunction from the High Court to require the activity to stop entirely."
  },
  {
    question: "Is there a legal requirement to carry out air quality monitoring on every construction site?",
    answer:
      "There is no blanket legal requirement to carry out air quality monitoring on every construction site. However, monitoring may be required in several circumstances: (1) as a condition of planning permission \u2014 many local planning authorities now impose conditions requiring air quality monitoring as part of the Construction Environmental Management Plan (CEMP), particularly for major developments or sites near sensitive receptors; (2) as a requirement of a Section 106 agreement; (3) under the COSHH Regulations 2002 \u2014 Regulation 10 requires employers to carry out monitoring of workplace exposure to hazardous substances (including respirable dust and RCS) where this is a requisite for maintaining adequate control or protecting health; (4) as part of the site's own dust management plan under IAQM guidance; and (5) under contractual requirements from the client or principal contractor. Even where monitoring is not legally mandated, the IAQM guidance recommends monitoring as good practice on medium- and high-risk sites, as it provides objective evidence that dust control measures are effective and triggers corrective action when levels are exceeded."
  },
  {
    question: "What is the difference between PM10 and PM2.5, and why does it matter for construction sites?",
    answer:
      "PM10 refers to particulate matter with an aerodynamic diameter of 10 micrometres (\u00b5m) or less, while PM2.5 refers to particulate matter with an aerodynamic diameter of 2.5 \u00b5m or less. The distinction is important because the two size fractions have different health effects and different sources. PM10 includes both fine particles (PM2.5) and coarse particles (between 2.5 and 10 \u00b5m). Coarse particles are typically generated by mechanical processes such as crushing, grinding, abrasion of surfaces, and resuspension of dust from roads and surfaces \u2014 all of which are common on construction sites. These particles tend to deposit in the upper airways (nose, throat, and large bronchial tubes) and can cause irritation, coughing, and exacerbation of asthma. PM2.5 (fine particles) are generated primarily by combustion processes, including diesel engines, and can also be produced by high-energy cutting and grinding operations. PM2.5 particles penetrate deep into the lungs and can enter the bloodstream, causing cardiovascular and respiratory disease, and are associated with increased mortality. Construction sites are major sources of PM10 in urban areas \u2014 the London Atmospheric Emissions Inventory estimates that construction and demolition activities account for approximately 30% of PM10 emissions in London."
  },
  {
    question: "How does the Considerate Constructors Scheme (CCS) address air quality and dust control?",
    answer:
      "The Considerate Constructors Scheme (CCS) is a voluntary scheme established in 1997 that encourages construction sites to go beyond minimum legal requirements in areas including community relations, the environment, and workforce welfare. Under the CCS Code of Considerate Practice, registered sites are expected to demonstrate that they are minimising the impact of dust, emissions, and air pollution on the local community and environment. The CCS monitors assess sites against specific criteria including: whether a dust management plan is in place and being actively implemented; whether dust suppression measures (damping down, covered skips, enclosed chutes, wheel washing) are consistently applied; whether vehicle emissions are being managed (anti-idling policies, NRMM emission standards, route planning to minimise HGV movements through residential areas); whether air quality monitoring is being carried out where appropriate; and whether the site is responding proactively to dust complaints from neighbours. CCS scores can affect a contractor's reputation and ability to win future work, so many contractors use CCS registration as a driver for continuous improvement in dust and emission control. The CCS also publishes best practice guidance documents that supplement the regulatory requirements and help sites achieve higher standards of environmental performance."
  }
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz (8 questions)                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "Under the Environmental Protection Act 1990, which section gives local authorities the power to serve an abatement notice for dust nuisance arising from a construction site?",
    options: [
      "Section 34 (Duty of Care for waste)",
      "Section 80 (abatement notices for statutory nuisances)",
      "Section 33 (prohibition on unauthorised deposit of waste)",
      "Section 71 (power to obtain information about land)"
    ],
    correctAnswer: 1,
    explanation:
      "Section 80 of the Environmental Protection Act 1990 empowers local authorities to serve an abatement notice where they are satisfied that a statutory nuisance exists, or is likely to occur or recur. Dust from construction sites can constitute a statutory nuisance under Section 79(1)(d) as dust or other effluvia arising on industrial, trade, or business premises. The abatement notice can require the responsible person to abate the nuisance and prevent its recurrence, and can specify the steps or works required. Non-compliance without reasonable excuse is a criminal offence with fines of up to \u00a320,000."
  },
  {
    id: 2,
    question:
      "Which type of dust generated on construction sites is classified as a Category 1A carcinogen under the CLP Regulation?",
    options: [
      "General construction dust from timber cutting",
      "Demolition dust from plasterboard",
      "Respirable crystalline silica (RCS) from cutting concrete, brick, or stone",
      "Trackout dust from vehicle movements on unsurfaced roads"
    ],
    correctAnswer: 2,
    explanation:
      "Respirable crystalline silica (RCS) is classified as a Category 1A carcinogen under the CLP Regulation (EC No. 1272/2008), meaning there is sufficient evidence from human studies that it causes cancer. RCS is generated when materials containing crystalline silica \u2014 such as concrete, brick, sandstone, mortar, and granite \u2014 are cut, drilled, ground, or otherwise mechanically disturbed. The fine particles (typically less than 10 \u00b5m) penetrate deep into the lungs and can cause silicosis, COPD, and lung cancer. The UK Workplace Exposure Limit for RCS is 0.1 mg/m\u00b3 (8-hour TWA) as set out in EH40/2005."
  },
  {
    id: 3,
    question:
      "According to IAQM (Institute of Air Quality Management) guidance, which factor is NOT typically used to determine the dust risk category for a construction site?",
    options: [
      "The scale and nature of the demolition and construction activities",
      "The proximity of the site to sensitive receptors (residential properties, hospitals, schools)",
      "The number of workers employed on the site",
      "The sensitivity of the surrounding area to dust impacts"
    ],
    correctAnswer: 2,
    explanation:
      "The IAQM guidance on the assessment of dust from demolition and construction uses a structured framework to categorise dust risk as high, medium, or low. The key factors assessed are: the dust emission magnitude (based on the scale and nature of the works, including site area, building volume, and soil type), the sensitivity of the surrounding area (including the proximity, number, and type of sensitive receptors such as residential properties, schools, hospitals, and ecological sites), and the existing baseline air quality. The number of workers on site is not a factor in the IAQM dust risk assessment methodology \u2014 the assessment focuses on the potential for dust to be generated and the sensitivity of the receiving environment."
  },
  {
    id: 4,
    question:
      "What is the primary purpose of wheel washing facilities at the exit of a construction site?",
    options: [
      "To clean vehicles for aesthetic reasons before they enter public roads",
      "To prevent trackout of mud and dust onto public highways, which would be re-suspended as PM10 by passing traffic",
      "To reduce water consumption on the construction site",
      "To comply with vehicle insurance requirements for construction plant"
    ],
    correctAnswer: 1,
    explanation:
      "Wheel washing facilities are installed at construction site exits to prevent trackout \u2014 the transfer of mud, soil, and dust from the construction site onto the public highway by the tyres and bodies of vehicles leaving the site. Once deposited on the road surface, this material dries and is re-suspended as airborne particulate matter (PM10) by the turbulence created by passing traffic. Trackout can affect air quality over a considerable distance from the site \u2014 studies have shown elevated PM10 levels up to 500 metres from site exits where trackout is not controlled. The IAQM guidance identifies trackout as one of the four main sources of dust from construction sites, alongside demolition, earthworks, and construction activities."
  },
  {
    id: 5,
    question:
      "What does 'NRMM' stand for in the context of construction site air quality management, and why is it significant?",
    options: [
      "National Road Maintenance Manual \u2014 a guidance document for highway works",
      "Non-Road Mobile Machinery \u2014 diesel-powered plant and equipment used on construction sites that is a significant source of NOx and PM emissions",
      "Noise and Resonance Mitigation Measures \u2014 requirements for reducing noise and vibration",
      "Natural Resource Management Model \u2014 a framework for managing environmental impacts"
    ],
    correctAnswer: 1,
    explanation:
      "NRMM stands for Non-Road Mobile Machinery and refers to diesel-powered plant and equipment used on construction sites, including excavators, dumpers, generators, compressors, telehandlers, and mobile cranes. NRMM is a significant source of nitrogen oxides (NOx) and particulate matter (PM) emissions, which contribute to poor air quality in urban areas. The London NRMM Low Emission Zone was established to require minimum engine emission standards for NRMM used on major development sites, starting with Stage IIIB across Greater London and Stage IV in the Central Activity Zone. Other local authorities are increasingly adopting similar requirements through planning conditions."
  },
  {
    id: 6,
    question:
      "What is a dust deposition gauge, and how does it differ from a continuous particulate monitor?",
    options: [
      "A dust deposition gauge and a continuous particulate monitor are identical instruments that measure PM10 in real time",
      "A dust deposition gauge is a passive device that collects dust over a period (typically 2\u20134 weeks) for laboratory analysis, while a continuous particulate monitor measures airborne particulate concentrations in real time",
      "A dust deposition gauge measures wind speed and direction, while a continuous particulate monitor measures dust",
      "A dust deposition gauge is used indoors only, while a continuous particulate monitor is used outdoors only"
    ],
    correctAnswer: 1,
    explanation:
      "A dust deposition gauge (also known as a Frisbee gauge or directional dust gauge) is a simple, passive collection device that collects dust settling out of the air over a defined period, typically 2 to 4 weeks. The collected material is then weighed and/or analysed in a laboratory to determine the mass of deposited dust. Deposition gauges are inexpensive and can be deployed in multiple locations around a site to identify dust sources and directional patterns. A continuous particulate monitor (such as a TEOM, BAM, or optical particle counter) measures the concentration of airborne particulate matter (PM10, PM2.5, or TSP) in real time, typically providing readings every minute or every hour. Continuous monitors provide immediate data that can be linked to alert systems, triggering automatic warnings when dust levels exceed pre-set trigger thresholds."
  },
  {
    id: 7,
    question:
      "Under planning law, what document typically sets out the dust management requirements that a construction site must comply with?",
    options: [
      "The Building Regulations Approved Documents",
      "The Construction Environmental Management Plan (CEMP), often required as a planning condition",
      "The Fire Risk Assessment for the building",
      "The CDM Health and Safety Plan only"
    ],
    correctAnswer: 1,
    explanation:
      "The Construction Environmental Management Plan (CEMP) is the document that typically sets out the dust management requirements for a construction site. CEMPs are commonly required as a condition of planning permission, particularly for major developments or sites in sensitive areas (Air Quality Management Areas, near schools or hospitals, near ecological designations). The CEMP must be submitted to and approved by the local planning authority before construction work begins. It will typically include a dust risk assessment, a dust management plan specifying the control measures to be applied, monitoring arrangements, trigger levels and action plans, complaints procedures, and reporting requirements. The CEMP may also incorporate requirements from Section 106 agreements and local authority Air Quality Action Plans."
  },
  {
    id: 8,
    question:
      "Which of the following is a key recommendation of the BRE (Building Research Establishment) guidance on controlling dust from construction sites?",
    options: [
      "Dust control measures should only be implemented when complaints are received",
      "A proactive, risk-based approach to dust management should be adopted, with control measures planned and implemented before dust-generating activities commence",
      "Monitoring is unnecessary if the site is more than 100 metres from residential properties",
      "Water suppression should only be used during summer months"
    ],
    correctAnswer: 1,
    explanation:
      "The BRE guidance on controlling particles, vapour, and noise pollution from construction sites (BR456) emphasises a proactive, risk-based approach to dust management. This means that dust control measures should be planned and implemented before dust-generating activities begin, not as a reactive response to complaints. The guidance recommends carrying out a dust risk assessment at the planning stage, identifying the activities most likely to generate dust, selecting appropriate control measures for each activity, implementing those measures before work starts, monitoring their effectiveness throughout the works, and adjusting the approach if monitoring or complaints indicate that controls are insufficient. This proactive approach is consistent with the IAQM guidance and is now considered standard best practice across the UK construction industry."
  }
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function EnvironmentalSustainabilityModule4Section1() {
  useSEO({
    title: "Air Quality & Dust Control | Environmental Sustainability Module 4.1",
    description:
      "Understand air quality legislation, dust risk assessment, control measures, vehicle emissions, monitoring, and best practice standards for construction sites. Covers Clean Air Act, IAQM guidance, NRMM standards, and the CEMP process.",
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
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">

        {/* ============================================================ */}
        {/*  PAGE TITLE                                                   */}
        {/* ============================================================ */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <Wind className="h-7 w-7 text-emerald-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-400 text-xs font-semibold">MODULE 4 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Air Quality &amp; Dust Control
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the legislative framework for air quality, the types and health effects of
            construction dust, risk assessment methodologies, control measures, vehicle emission
            standards, monitoring techniques, planning requirements, and best practice standards for
            minimising the air quality impact of construction activities
          </p>
        </header>

        {/* ============================================================ */}
        {/*  QUICK SUMMARY BOXES                                          */}
        {/* ============================================================ */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Key law:</strong> Clean Air Act 1993, EPA 1990</li>
              <li><strong>Limits:</strong> PM10 daily 50 &micro;g/m&sup3; (max 35 exceedances/year)</li>
              <li><strong>Guidance:</strong> IAQM dust risk assessment framework</li>
              <li><strong>Control:</strong> Hierarchy from elimination to suppression</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">For Site Workers</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>RCS WEL:</strong> 0.1 mg/m&sup3; (8-hour TWA) &mdash; carcinogen</li>
              <li><strong>NRMM:</strong> Stage IIIB minimum (Stage IV in London CAZ)</li>
              <li><strong>Monitoring:</strong> Real-time PM10 with trigger level alerts</li>
              <li><strong>CEMP:</strong> Required before works commence on major sites</li>
            </ul>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  LEARNING OUTCOMES                                            */}
        {/* ============================================================ */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the key legislation governing air quality on construction sites, including the Clean Air Act 1993 and Air Quality Standards Regulations 2010",
              "Identify the four main types of construction dust and their respective health impacts",
              "Carry out a dust risk assessment using the IAQM guidance framework, categorising risk as high, medium, or low",
              "Describe the hierarchy of dust control measures from elimination through to suppression and monitoring",
              "Explain NRMM Low Emission Zone standards and the role of Stage V engines in reducing site emissions",
              "Describe the purpose and methods of air quality monitoring, including continuous monitors and deposition gauges",
              "Understand how planning conditions, Section 106 agreements, and CEMPs impose air quality requirements on construction sites",
              "Identify best practice standards from the Considerate Constructors Scheme, IAQM, BRE, and the Mayor of London\u2019s SPG"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01: Air Quality & Construction                      */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">01</span>
              Air Quality &amp; Construction
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The construction industry is one of the most significant sources of airborne particulate
                matter in the UK, particularly in urban areas. Research commissioned by the Greater London
                Authority estimates that construction and demolition activities account for approximately
                <strong> 30% of PM10 emissions</strong> and a significant proportion of PM2.5 emissions in
                London alone. These emissions have serious implications for public health, contributing to
                respiratory disease, cardiovascular disease, and premature death. The UK Government&rsquo;s
                Clean Air Strategy (2019) identifies construction dust as a priority area for action and
                sets out a pathway for reducing particulate emissions from the sector.
              </p>

              <p>
                The health impacts of construction dust are well documented. <strong>PM10</strong> (particulate
                matter with an aerodynamic diameter of 10 micrometres or less) can penetrate into the upper
                airways, causing irritation, coughing, and exacerbation of asthma and other respiratory
                conditions. <strong>PM2.5</strong> (fine particles of 2.5 micrometres or less) penetrate deep
                into the lungs and can enter the bloodstream, where they are associated with cardiovascular
                disease, stroke, lung cancer, and reduced life expectancy. Public Health England estimates
                that long-term exposure to particulate air pollution contributes to approximately
                <strong> 28,000 to 36,000 deaths per year</strong> in the UK. Construction sites that fail
                to control dust emissions are directly contributing to this burden of disease.
              </p>

              <p>
                The legislative framework governing air quality in the UK is extensive and operates at
                multiple levels:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>The Clean Air Act 1993</strong> &mdash; consolidates earlier clean air legislation and gives local authorities the power to declare smoke control areas and to control emissions of dark smoke, grit, and dust from industrial premises. While primarily aimed at stationary combustion sources, its provisions can apply to construction activities that generate visible emissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>The Air Quality Standards Regulations 2010</strong> &mdash; transpose the EU Ambient Air Quality Directive (2008/50/EC) into UK law (retained after Brexit). These regulations set legally binding limit values for key pollutants including PM10 (annual mean 40 &micro;g/m&sup3;; 24-hour mean 50 &micro;g/m&sup3; not to be exceeded more than 35 times per year) and PM2.5 (annual mean 20 &micro;g/m&sup3; with a target of 10 &micro;g/m&sup3; by 2040 under the Environment Act 2021)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>The Environmental Protection Act 1990 (Part III)</strong> &mdash; provides the statutory nuisance framework under which local authorities can take enforcement action against dust from construction sites. Section 79(1)(d) covers dust and other effluvia arising on industrial, trade, or business premises</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Local Air Quality Management (LAQM)</strong> &mdash; under Part IV of the Environment Act 1995, local authorities must review and assess air quality in their areas against national objectives. Where objectives are not being met, they must designate <strong>Air Quality Management Areas (AQMAs)</strong> and prepare Action Plans to improve air quality. Construction sites within or near AQMAs face heightened scrutiny and more stringent planning conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>The Environment Act 2021</strong> &mdash; establishes new legally binding PM2.5 targets and strengthens the framework for tackling air pollution, with implications for construction site emissions as the targets are progressively tightened</span>
                </li>
              </ul>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Key Legal Point:</strong> Construction sites are
                  subject to multiple overlapping regulatory regimes. A single dust emission event can
                  simultaneously breach the Air Quality Standards Regulations 2010 (if it contributes to
                  an exceedance of a limit value), constitute a statutory nuisance under the EPA 1990
                  (triggering an abatement notice), and breach a planning condition (potentially leading
                  to enforcement action by the local planning authority). Understanding and complying with
                  all applicable requirements is essential.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02: Types of Dust                                    */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">02</span>
              Types of Dust
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The IAQM guidance on the assessment of dust from demolition and construction identifies
                <strong> four main categories</strong> of dust generated on construction sites. Each category
                has distinct characteristics, sources, and health implications, and understanding these
                differences is essential for designing effective control measures.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Droplets className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">The Four Categories of Construction Dust</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">1. Demolition Dust</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Generated by the breaking, crushing, and dismantling of existing structures. Demolition
                      dust typically contains a complex mixture of materials including concrete, brick, morite,
                      plaster, timber, metals, and potentially hazardous substances such as asbestos fibres,
                      lead paint particles, and polychlorinated biphenyls (PCBs) from older buildings.
                      Demolition activities can generate very large quantities of coarse dust (visible dust
                      clouds) as well as respirable fractions (PM10 and PM2.5) that are not visible to the
                      naked eye. The composition of demolition dust is highly variable and depends on the age
                      and construction type of the building being demolished. Pre-demolition surveys are
                      essential to identify hazardous materials and plan appropriate control measures.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">2. Earthworks Dust</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Generated by excavation, land clearing, soil handling, stockpiling, and backfilling
                      operations. Earthworks dust is predominantly composed of soil and rock particles and
                      its characteristics depend on the geology of the site. Sandy and silty soils produce
                      more airborne dust than clay soils, particularly in dry and windy conditions. Large-scale
                      earthworks (cut-and-fill operations, basement excavations, land remediation) can generate
                      sustained dust emissions over extended periods. Where contaminated land is being
                      excavated, the dust may contain hazardous substances including heavy metals, hydrocarbons,
                      and asbestos (particularly on brownfield sites where asbestos-containing materials may
                      have been buried or mixed with fill).
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">3. Construction Dust</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Generated by the active construction process, including cutting, grinding, drilling,
                      sanding, and mixing of materials. Construction dust is the most diverse category and
                      includes dust from concrete cutting and grinding (a major source of respirable crystalline
                      silica), brick cutting, timber sawing, plaster mixing, paint spraying, insulation
                      installation, and metal fabrication. The health significance of construction dust varies
                      enormously depending on the material being worked. Concrete, brick, stone, and mortar
                      contain crystalline silica (as quartz), which when rendered respirable by cutting or
                      grinding becomes <strong>respirable crystalline silica (RCS)</strong> &mdash; a Category 1A
                      carcinogen with a UK Workplace Exposure Limit (WEL) of 0.1 mg/m&sup3; (8-hour TWA).
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">4. Trackout Dust</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Trackout is the transport of dust and mud from the construction site onto the public
                      highway by vehicles leaving the site. Once deposited on the road surface, this material
                      dries and is re-suspended as airborne PM10 by the turbulence created by passing traffic.
                      Trackout can affect air quality over a considerable distance from the site &mdash; studies
                      have demonstrated elevated PM10 levels up to 500 metres from uncontrolled site exits.
                      Trackout is often the most significant off-site dust impact from construction activities
                      and is a major source of complaints from local communities. It is also the most easily
                      preventable, through the use of wheel washing facilities, paved haul roads, and road
                      sweeping programmes.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                In addition to the four main categories, two specific types of dust require particular
                attention due to their severe health effects:
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Respirable Crystalline Silica (RCS)</p>
                </div>
                <p className="text-sm text-white/80">
                  RCS is generated when materials containing crystalline silica (concrete, brick, sandstone,
                  mortar, granite) are cut, drilled, ground, or otherwise mechanically disturbed. RCS
                  particles are typically less than 10 &micro;m in diameter and penetrate deep into the lungs.
                  Prolonged exposure can cause <strong>silicosis</strong> (irreversible scarring and fibrosis
                  of lung tissue), <strong>chronic obstructive pulmonary disease (COPD)</strong>, and
                  <strong> lung cancer</strong>. RCS is classified as a Category 1A carcinogen. The UK WEL is
                  0.1 mg/m&sup3; (8-hour TWA). Control measures include water suppression during cutting,
                  on-tool extraction, enclosed cutting areas, and appropriate RPE (FFP3 minimum for RCS).
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Asbestos Fibres</p>
                </div>
                <p className="text-sm text-white/80">
                  Asbestos fibres may be released during demolition or refurbishment of buildings constructed
                  before 2000. All forms of asbestos (chrysotile, amosite, crocidolite) are classified as
                  Category 1A carcinogens. Exposure to asbestos fibres can cause <strong>mesothelioma</strong>
                  (an incurable cancer of the lining of the lungs or abdomen), <strong>asbestosis</strong>
                  (progressive fibrosis of the lungs), and <strong>lung cancer</strong>. The Control of
                  Asbestos Regulations 2012 impose strict requirements for the management and removal of
                  asbestos, including the use of licensed contractors for higher-risk work. Pre-demolition
                  and pre-refurbishment asbestos surveys (under Regulation 4) are essential to identify
                  asbestos-containing materials before any work disturbs them.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03: Dust Risk Assessment                             */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">03</span>
              Dust Risk Assessment
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Institute of Air Quality Management (IAQM)</strong> has published comprehensive
                guidance on the assessment of dust from demolition and construction sites. This guidance
                provides a structured, step-by-step methodology for assessing the risk of dust impacts and
                determining the appropriate level of mitigation. The IAQM framework is now the standard
                approach used by air quality consultants, local planning authorities, and developers
                across the UK.
              </p>

              <p>
                The IAQM dust risk assessment process follows a clear sequence:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Step 1: Screen the need for a detailed assessment</strong> &mdash; if there are no sensitive receptors (residential properties, schools, hospitals, ecological sites) within 350 metres of the site boundary, or within 50 metres of the route used by construction vehicles on public roads up to 500 metres from the site exit, a detailed assessment may not be required</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Step 2: Assess the dust emission magnitude</strong> &mdash; for each of the four dust sources (demolition, earthworks, construction, trackout), determine whether the dust emission magnitude is large, medium, or small based on the scale and nature of the works (for example, site area, building volume, number of HGV movements per day, and type of material being handled)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Step 3: Assess the sensitivity of the area</strong> &mdash; determine the sensitivity of the surrounding area to dust impacts by considering the number and proximity of sensitive receptors, the baseline air quality (whether the site is in or near an AQMA), and any specific local sensitivities (for example, dust-sensitive ecological receptors, freshly painted surfaces, or outdoor food preparation areas)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Step 4: Determine the risk of dust impacts</strong> &mdash; combine the dust emission magnitude (from Step 2) and the sensitivity of the area (from Step 3) using a risk matrix to determine the overall risk of dust impacts for each source, categorised as <strong>high</strong>, <strong>medium</strong>, or <strong>low</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Step 5: Determine site-specific mitigation</strong> &mdash; based on the risk category, select the appropriate package of dust control measures from the IAQM recommended mitigation list. Higher-risk sites require more extensive and rigorous mitigation measures</span>
                </li>
              </ul>

              {/* Diagram: Dust Risk Assessment Matrix */}
              <div className="my-6 p-4 sm:p-6 rounded-xl bg-white/[0.02] border border-emerald-500/20">
                <h3 className="text-sm font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Dust Risk Assessment Matrix &mdash; IAQM Framework
                </h3>
                <div className="overflow-x-auto">
                  <div className="min-w-[320px]">
                    {/* Matrix header */}
                    <div className="grid grid-cols-4 gap-1 mb-1">
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 text-center">
                        <p className="text-xs font-semibold text-emerald-400">Dust Emission Magnitude</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                        <p className="text-xs font-medium text-white">High Sensitivity Area</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                        <p className="text-xs font-medium text-white">Medium Sensitivity Area</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                        <p className="text-xs font-medium text-white">Low Sensitivity Area</p>
                      </div>
                    </div>
                    {/* Large row */}
                    <div className="grid grid-cols-4 gap-1 mb-1">
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 text-center">
                        <p className="text-xs font-medium text-white">Large</p>
                      </div>
                      <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-2 text-center">
                        <p className="text-xs font-bold text-red-400">HIGH RISK</p>
                      </div>
                      <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-2 text-center">
                        <p className="text-xs font-bold text-red-400">HIGH RISK</p>
                      </div>
                      <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-2 text-center">
                        <p className="text-xs font-bold text-amber-400">MEDIUM RISK</p>
                      </div>
                    </div>
                    {/* Medium row */}
                    <div className="grid grid-cols-4 gap-1 mb-1">
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 text-center">
                        <p className="text-xs font-medium text-white">Medium</p>
                      </div>
                      <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-2 text-center">
                        <p className="text-xs font-bold text-red-400">HIGH RISK</p>
                      </div>
                      <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-2 text-center">
                        <p className="text-xs font-bold text-amber-400">MEDIUM RISK</p>
                      </div>
                      <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-2 text-center">
                        <p className="text-xs font-bold text-emerald-400">LOW RISK</p>
                      </div>
                    </div>
                    {/* Small row */}
                    <div className="grid grid-cols-4 gap-1">
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 text-center">
                        <p className="text-xs font-medium text-white">Small</p>
                      </div>
                      <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-2 text-center">
                        <p className="text-xs font-bold text-amber-400">MEDIUM RISK</p>
                      </div>
                      <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-2 text-center">
                        <p className="text-xs font-bold text-emerald-400">LOW RISK</p>
                      </div>
                      <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-2 text-center">
                        <p className="text-xs font-bold text-emerald-400">LOW RISK</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/40 mt-3 italic">
                  Simplified representation of the IAQM dust risk matrix. The full assessment considers each
                  dust source (demolition, earthworks, construction, trackout) separately and evaluates impacts
                  on both human health and dust soiling/amenity. The overall site risk is determined by the
                  highest individual source risk.
                </p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Sensitive Receptors</p>
                </div>
                <p className="text-sm text-white/80">
                  Sensitive receptors are locations where people or ecological features may be adversely
                  affected by dust. They include <strong>residential properties</strong> (especially those
                  with gardens, windows facing the site, or drying laundry), <strong>schools and
                  nurseries</strong>, <strong>hospitals and care homes</strong>, <strong>outdoor food
                  preparation or serving areas</strong>, <strong>listed buildings and monuments</strong>
                  (where dust soiling can cause damage), and <strong>ecological designations</strong> (SSSIs,
                  SACs, SPAs) where dust deposition can affect habitats. The IAQM guidance recommends
                  assessing sensitive receptors within 350 metres of the site boundary and within 50 metres of
                  the haul route up to 500 metres from the site exit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04: Dust Control Measures                            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">04</span>
              Dust Control Measures
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Dust control on construction sites follows the <strong>hierarchy of controls</strong> principle:
                eliminate the dust source where possible, substitute less dusty materials or methods, enclose
                and contain dust at source, suppress dust with water or other agents, and protect workers and
                the public with barriers, screens, and personal protective equipment. The IAQM guidance
                provides specific lists of recommended mitigation measures for high-, medium-, and low-risk
                sites, with high-risk sites requiring the most comprehensive package of controls.
              </p>

              {/* Diagram: Dust Control Measures Hierarchy */}
              <div className="my-6 p-4 sm:p-6 rounded-xl bg-white/[0.02] border border-emerald-500/20">
                <h3 className="text-sm font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Dust Control Measures Hierarchy
                </h3>
                <div className="space-y-2">
                  <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">1. Elimination</p>
                    <p className="text-xs text-white/70">Remove the dust source entirely. Examples: use pre-fabricated components instead of cutting on site, use mechanical demolition methods that minimise dust generation, redesign the construction sequence to avoid double-handling of dusty materials.</p>
                  </div>
                  <div className="bg-emerald-500/15 border border-emerald-500/25 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">2. Substitution</p>
                    <p className="text-xs text-white/70">Replace dusty materials or methods with less dusty alternatives. Examples: use pre-mixed mortar instead of site-batched mortar, use diamond wire cutting instead of disc cutting for concrete, use wet plaster instead of dry sanding.</p>
                  </div>
                  <div className="bg-amber-500/15 border border-amber-500/25 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">3. Enclosure &amp; Containment</p>
                    <p className="text-xs text-white/70">Contain dust at its source. Examples: enclosed chutes and covered skips for debris disposal, enclosed cutting areas with local exhaust ventilation (LEV), sheeted scaffolding around demolition works, covered conveyors for material transport, enclosed mixing areas for concrete and mortar.</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">4. Suppression</p>
                    <p className="text-xs text-white/70">Prevent dust from becoming airborne. Examples: damping down with water sprays (mist cannons, hose pipes, sprinkler systems), water suppression during cutting and drilling, applying dust suppressant agents to haul roads and stockpiles, using on-tool water suppression for concrete cutting.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">5. Barriers &amp; Screening</p>
                    <p className="text-xs text-white/70">Intercept and deflect dust before it reaches sensitive receptors. Examples: solid hoardings around the site perimeter (minimum 2.4 metres), dust screens and windbreaks at strategic locations, vegetation screens, and positioning of stockpiles and dust-generating activities away from site boundaries.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">6. Housekeeping &amp; Management</p>
                    <p className="text-xs text-white/70">Maintain clean conditions to prevent dust re-suspension. Examples: regular road sweeping (mechanical sweeper), wheel washing facilities at site exits, covering of vehicles transporting dusty materials, prompt removal of waste and debris, regular cleaning of hard surfaces.</p>
                  </div>
                </div>
                <p className="text-xs text-white/40 mt-3 italic">
                  The hierarchy should be applied in order, with elimination as the preferred option and
                  housekeeping/management as the last resort. In practice, most construction sites require a
                  combination of measures from multiple levels of the hierarchy.
                </p>
              </div>

              <p>
                The following specific dust control measures are widely used on UK construction sites:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Damping down</strong> &mdash; the application of water to surfaces, stockpiles, haul roads, and work areas using hose pipes, water bowsers, sprinkler systems, or mist cannons. Damping down is the most commonly used dust control measure on construction sites. Mist cannons (water mist fans) are particularly effective for large-scale demolition and earthworks as they can project a fine water mist over a wide area, capturing airborne particles without creating muddy conditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Enclosed chutes and covered skips</strong> &mdash; debris from demolition and construction should be dropped through enclosed chutes rather than thrown from height, and skips should be covered when not in active use and during transport. Free-falling debris from height can generate substantial dust clouds that travel well beyond the site boundary</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Cutting with water suppression</strong> &mdash; all cutting, grinding, and drilling of concrete, brick, stone, and similar materials should be carried out with water suppression (either on-tool water supply or hose pipe applied to the cutting point) or with on-tool dust extraction connected to an H-class vacuum. This is essential for controlling RCS exposure</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Dust screens and windbreaks</strong> &mdash; temporary screening (mesh, sheeting, or solid panels) erected around dust-generating activities or along site boundaries to intercept wind-blown dust. Windbreaks reduce wind speed at ground level and reduce the distance that dust travels from its source</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Road sweeping</strong> &mdash; regular mechanical sweeping of paved haul roads, access roads, and public highways affected by trackout. Vacuum sweepers are more effective than brush sweepers as they capture fine particles rather than simply redistributing them</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Wheel washing</strong> &mdash; all vehicles leaving the site should pass through a wheel wash facility to remove mud, soil, and dust from tyres and the underside of the vehicle. On high-risk sites, automated drive-through wheel washers with water recycling are recommended. Where a full wheel wash is not practicable, a hardstanding rumble strip with manual hose-down can be used as a minimum</span>
                </li>
              </ul>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Key Principle:</strong> Dust control measures must be
                  <strong> proactive</strong>, not reactive. They should be planned and implemented before
                  dust-generating activities begin, not as a response to complaints. The dust management plan
                  should specify which measures will be applied to each activity, who is responsible for
                  implementing and maintaining them, and how their effectiveness will be monitored.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05: Vehicle Emissions                                */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">05</span>
              Vehicle Emissions
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In addition to dust, construction sites generate significant emissions from the combustion
                of diesel fuel in vehicles and plant. <strong>Non-Road Mobile Machinery (NRMM)</strong> &mdash;
                which includes excavators, dumpers, generators, compressors, telehandlers, mobile cranes,
                piling rigs, and concrete pumps &mdash; is a major source of nitrogen oxides (NOx) and
                particulate matter (PM) in urban areas. The London Atmospheric Emissions Inventory estimates
                that NRMM accounts for approximately <strong>7% of NOx emissions</strong> and
                <strong> 8% of PM10 emissions</strong> across London, with concentrations being much higher
                in the vicinity of active construction sites.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Truck className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">NRMM Emission Standards</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Stage IIIB (Baseline Standard)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The minimum standard required for NRMM used on major development sites across Greater
                      London. Stage IIIB engines incorporate diesel particulate filters (DPFs) to significantly
                      reduce PM emissions and use exhaust gas recirculation (EGR) or selective catalytic
                      reduction (SCR) to reduce NOx. Stage IIIB applies to engines between 37 kW and 560 kW
                      net power output.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Stage IV (Central Activity Zone Standard)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The higher standard required for NRMM operating within the Central Activity Zone (CAZ)
                      and the Canary Wharf area of London. Stage IV engines achieve further reductions in NOx
                      through the use of both DPF and SCR after-treatment systems. Stage IV represents a
                      reduction of approximately 80% in PM and 90% in NOx compared with uncontrolled engines.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Stage V (Forthcoming Standard)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The latest EU emission standard for NRMM, introduced under Regulation (EU) 2016/1628.
                      Stage V introduces a particle number (PN) limit in addition to the mass-based PM limit,
                      effectively requiring DPFs on all engine sizes including smaller machines (19&ndash;37 kW)
                      that were previously exempt. Stage V also extends coverage to engines above 560 kW.
                      London NRMM requirements are progressively tightening towards Stage V, and many local
                      authorities outside London are now specifying Stage V in planning conditions for major
                      developments.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Beyond NRMM standards, construction sites should implement the following measures to
                reduce vehicle and plant emissions:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Anti-idling policies</strong> &mdash; engines should be switched off when plant or vehicles are not in active use. Idling engines waste fuel and emit NOx and PM with no productive output. Many sites now operate a strict &ldquo;5-minute idle&rdquo; policy with automatic engine shut-off systems on newer machines. Anti-idling policies should be enforced through site induction training, toolbox talks, and regular monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Euro 6 vehicles</strong> &mdash; HGVs and LGVs (vans) used for deliveries to and from the site should meet Euro 6/VI emission standards wherever possible. Euro 6 vehicles achieve significant reductions in NOx and PM compared with older Euro 3, 4, and 5 vehicles. In London, the Ultra Low Emission Zone (ULEZ) requires vehicles to meet Euro 6/VI standards or pay a daily charge</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Electric plant and equipment</strong> &mdash; battery-electric alternatives to diesel plant are increasingly available for smaller equipment including generators (battery energy storage systems), compressors, small excavators (up to 8 tonnes), telehandlers, and tower cranes. Electric plant produces zero tailpipe emissions, reduces noise, and can be charged from renewable energy sources. The transition to electric plant is accelerating and many contractors are now setting targets for electrification of their site fleets</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Delivery management</strong> &mdash; consolidation of deliveries to reduce the total number of HGV movements, use of delivery management systems to schedule arrivals and avoid queuing with engines idling, routing HGVs away from residential streets and sensitive receptors where possible, and requiring vehicles to be sheeted to prevent dust emissions during transport</span>
                </li>
              </ul>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Compliance Recording</p>
                </div>
                <p className="text-sm text-white/80">
                  The London NRMM Low Emission Zone requires site operators to maintain a register of all
                  NRMM used on site, recording the engine type, emission stage, serial number, and proof of
                  compliance. This register must be available for inspection by the local authority at any
                  time. Similar recording requirements are increasingly being imposed by local authorities
                  outside London through planning conditions. Failure to maintain accurate records or to
                  use compliant machinery can result in enforcement action and, in some cases, stop notices
                  preventing further construction work until compliance is achieved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06: Monitoring Air Quality                           */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">06</span>
              Monitoring Air Quality
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Air quality monitoring on construction sites serves two critical purposes: it provides
                <strong> objective evidence</strong> that dust control measures are working effectively, and
                it provides <strong>early warning</strong> when dust levels are approaching or exceeding
                acceptable thresholds, triggering additional control measures before significant impacts
                occur. Monitoring may be required by planning conditions, the CEMP, the client, or the
                site&rsquo;s own dust management plan. Even where monitoring is not legally mandated, the
                IAQM guidance recommends it as good practice on medium- and high-risk sites.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Gauge className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Monitoring Methods</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Continuous Particulate Monitors</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Continuous particulate monitors (such as TEOM &mdash; Tapered Element Oscillating
                      Microbalance, BAM &mdash; Beta Attenuation Monitor, or optical particle counters like the
                      Osiris, Turnkey Topas, or Fidas) measure the concentration of airborne particulate
                      matter (PM10, PM2.5, or TSP) in real time, typically providing readings at 1-minute,
                      15-minute, or 1-hour intervals. These instruments can be linked to telemetry systems
                      that transmit data to a central platform, triggering automatic email or SMS alerts when
                      pre-set trigger levels are exceeded. Continuous monitors are the gold standard for
                      construction site air quality monitoring because they provide immediate, actionable data.
                      They are typically deployed at the site boundary closest to the nearest sensitive
                      receptors and upwind/downwind of major dust sources.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Dust Deposition Gauges</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Dust deposition gauges (Frisbee gauges, directional dust gauges, or sticky pad
                      gauges) are simple, passive collection devices that measure the rate of dust settling
                      out of the air over a defined period, typically 2 to 4 weeks. The collected material
                      is weighed in a laboratory to determine the deposition rate (mg/m&sup2;/day). Deposition
                      gauges are inexpensive and can be deployed in large numbers around a site to build up
                      a spatial picture of dust impacts. However, they have significant limitations: they do
                      not provide real-time data, they cannot trigger immediate alerts, and they measure
                      deposited dust rather than airborne concentrations, making it difficult to relate the
                      results directly to air quality standards.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Visual Inspections and Observations</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Regular visual inspections of the site and its surroundings form an important part of
                      the monitoring programme. Trained site personnel should carry out daily visual checks
                      for visible dust plumes leaving the site boundary, dust deposition on cars, windowsills,
                      and surfaces near the site, trackout on public roads, and the condition of dust control
                      equipment (wheel wash, water sprays, hoarding integrity). Visual observations should be
                      recorded in a site log along with weather conditions (wind speed, direction, rainfall)
                      and correlated with any monitoring data.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The effectiveness of a monitoring programme depends on several key factors:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Trigger levels</strong> &mdash; pre-set thresholds that, when exceeded, trigger specific actions. A common approach is a two-tier system: an <strong>alert level</strong> (for example, 15-minute mean PM10 exceeding 190 &micro;g/m&sup3;) that triggers a review of dust control measures and increased monitoring, and an <strong>action level</strong> (for example, 1-hour mean PM10 exceeding 250 &micro;g/m&sup3;) that triggers an immediate investigation and, if the construction site is identified as the source, a cessation of the dust-generating activity until additional controls are implemented</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Real-time alerts</strong> &mdash; continuous monitors should be connected to telemetry systems that send automatic alerts (email, SMS, or app notifications) to the site manager, environmental manager, and/or environmental consultant when trigger levels are exceeded. The alert system must be configured to reach the right people immediately so that corrective action can be taken within minutes, not hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Recording and reporting</strong> &mdash; all monitoring data must be recorded, stored, and reported in accordance with the requirements of the CEMP, planning conditions, and the dust management plan. Monthly monitoring reports are typically submitted to the local authority, summarising PM10 concentrations, any trigger level exceedances, the actions taken in response, and the effectiveness of those actions. Data should be retained for the duration of the project plus a minimum retention period (often 3&ndash;5 years)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Weather data</strong> &mdash; air quality monitoring should be supplemented by on-site weather monitoring (wind speed, wind direction, temperature, rainfall) to help distinguish between construction-related dust and background sources. High PM10 readings during periods of high wind from a direction away from the site are likely to be caused by background sources rather than construction activities</span>
                </li>
              </ul>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Key Principle:</strong> Monitoring is only valuable
                  if it leads to <strong>action</strong>. A monitoring programme that records data but does
                  not trigger timely corrective responses when thresholds are exceeded is of limited benefit.
                  The trigger level system must be clearly defined, communicated to all relevant site
                  personnel, and consistently enforced.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 07: Planning Conditions                              */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">07</span>
              Planning Conditions
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Planning conditions and <strong>Section 106 agreements</strong> are the primary mechanisms
                through which local planning authorities impose air quality and dust management requirements
                on construction projects. These conditions are legally enforceable and breach of a planning
                condition can result in enforcement action, including stop notices, breach of condition
                notices, and prosecution. Understanding the planning framework is essential for any
                construction professional involved in project planning and site management.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Common Planning Requirements for Air Quality</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Construction Environmental Management Plan (CEMP)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The most common planning condition relating to air quality is the requirement to submit
                      and gain approval for a CEMP before any construction work commences. The CEMP must set
                      out the site&rsquo;s approach to dust management, including the dust risk assessment, the
                      dust management plan, monitoring arrangements, trigger levels and response procedures,
                      complaints handling procedures, and reporting requirements. The CEMP is a living document
                      that should be reviewed and updated as the project progresses and as construction
                      activities change. The approved CEMP becomes a legally binding obligation &mdash; failure
                      to comply with its provisions is a breach of the planning condition.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Air Quality Assessment (AQA)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      For major developments, particularly those in or near Air Quality Management Areas
                      (AQMAs), the local planning authority may require a full Air Quality Assessment as
                      part of the Environmental Impact Assessment (EIA) or planning application. The AQA
                      evaluates both the construction phase impacts (dust and emissions from construction
                      activities) and the operational phase impacts (emissions from traffic generated by the
                      completed development, heating systems, and other operational sources). The construction
                      phase AQA typically follows the IAQM methodology described in Section 03, while the
                      operational phase AQA uses atmospheric dispersion modelling to predict pollutant
                      concentrations at sensitive receptors.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Section 106 Agreements</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Section 106 agreements (under the Town and Country Planning Act 1990) are legally binding
                      agreements between the developer and the local planning authority that can impose
                      obligations beyond what can be achieved through planning conditions alone. In the
                      context of air quality, Section 106 agreements may require the developer to fund air
                      quality monitoring in the surrounding area, contribute to the local authority&rsquo;s Air
                      Quality Action Plan, implement specific NRMM emission standards, provide financial
                      contributions towards local air quality improvement measures (such as tree planting or
                      electric vehicle charging infrastructure), or establish a community liaison scheme for
                      managing dust and emissions complaints.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Dust Management Plan (DMP)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Some local authorities require a standalone Dust Management Plan (DMP) in addition to
                      or instead of a full CEMP. The DMP focuses specifically on dust control and typically
                      includes the dust risk assessment, the specific control measures for each phase and
                      activity, the monitoring strategy, trigger levels and action plans, roles and
                      responsibilities, training requirements, and communication procedures. The DMP must be
                      approved by the local authority before dust-generating work begins and must be kept on
                      site and available for inspection at all times.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Enforcement</p>
                </div>
                <p className="text-sm text-white/80">
                  Local planning authorities have a range of enforcement powers available when planning
                  conditions relating to air quality and dust management are breached. These include:
                  <strong> breach of condition notices</strong> (which can be served without prior warning and
                  require compliance within a specified period); <strong>stop notices</strong> (which can
                  require the immediate cessation of construction activities that are causing the breach);
                  <strong> temporary stop notices</strong> (which take effect immediately and last up to 28
                  days); and <strong>prosecution</strong> (failure to comply with a breach of condition notice
                  is a criminal offence). In serious cases, the local authority may also seek an injunction
                  from the courts to prevent further breaches. Enforcement action can cause significant delays
                  and costs to the construction programme, making compliance with planning conditions a
                  commercial as well as a legal imperative.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 08: Best Practice Standards                          */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">08</span>
              Best Practice Standards
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Beyond the legal minimum requirements, a range of best practice standards and guidance
                documents set the benchmark for dust and emissions management on UK construction sites.
                These standards are increasingly referenced in planning conditions, contractual
                requirements, and tender assessments, making them effectively mandatory for many projects.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <TreePine className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Key Best Practice Standards</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Considerate Constructors Scheme (CCS)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The CCS is a voluntary industry scheme that monitors registered construction sites and
                      companies against a Code of Considerate Practice. The Code includes specific requirements
                      relating to environmental performance, including dust and emissions management. CCS
                      monitors assess sites on their dust management plans, the implementation and maintenance
                      of dust control measures, air quality monitoring arrangements, anti-idling policies,
                      NRMM emission standards, response to community complaints, and overall environmental
                      awareness among the workforce. CCS scores are increasingly used by clients and developers
                      as a measure of contractor performance, and many contract documents specify minimum CCS
                      scores or CCS registration as a requirement.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">IAQM Guidance on the Assessment of Dust from Demolition and Construction</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The IAQM guidance is the industry-standard methodology for assessing dust risk and
                      determining appropriate mitigation measures. Originally published in 2014 and updated
                      in 2023, it provides a clear, step-by-step framework that is used by air quality
                      consultants, local planning authorities, and developers across the UK. The guidance
                      includes the dust risk assessment matrix, recommended mitigation measures for each risk
                      category, monitoring guidance, and a framework for assessing the significance of dust
                      impacts. Compliance with the IAQM guidance is now expected as standard practice for
                      all construction dust assessments submitted as part of planning applications.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">BRE Guidance (BR456) &mdash; Controlling Particles, Vapour, and Noise Pollution from Construction Sites</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The Building Research Establishment (BRE) guidance BR456 provides practical advice on
                      controlling dust, vapour, and noise emissions from construction sites. It covers the
                      sources and characteristics of construction dust, the health and environmental impacts,
                      legal requirements, risk assessment, control measures (organised by construction activity
                      type), monitoring techniques, and management systems. The BRE guidance is widely
                      referenced in CEMPs and dust management plans and provides a useful complement to the
                      IAQM assessment methodology by focusing on the practical implementation of control
                      measures at the activity level.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Mayor of London&rsquo;s Supplementary Planning Guidance (SPG) on the Control of Dust and Emissions During Construction and Demolition</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The Mayor of London&rsquo;s SPG sets out the requirements for dust and emissions
                      management on construction sites in London. It incorporates the NRMM Low Emission Zone
                      requirements, sets out the expectation for IAQM-compliant dust assessments, requires
                      continuous PM10 monitoring on medium- and high-risk sites, specifies wheel washing and
                      road sweeping requirements, and establishes the framework for air quality neutral and
                      air quality positive development. While the SPG applies specifically to London, it has
                      been highly influential nationally and many local authorities outside London have adopted
                      similar requirements in their own supplementary planning documents and planning conditions.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Achieving best practice in air quality and dust management requires more than simply
                following guidance documents. It requires a <strong>culture of environmental responsibility</strong>
                that permeates every level of the site organisation, from the project director to the
                individual operative. This culture is built through:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Training and awareness</strong> &mdash; all site personnel (including subcontractors) should receive dust awareness training as part of site induction, covering the health effects of dust, the site&rsquo;s dust management plan, individual responsibilities for dust control, and the action to take if they observe uncontrolled dust emissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Visible leadership</strong> &mdash; senior management must demonstrate visible commitment to dust control by allocating adequate resources, attending environmental reviews, responding promptly to monitoring alerts and complaints, and holding individuals accountable for non-compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Continuous improvement</strong> &mdash; monitoring data, complaint records, and inspection findings should be regularly reviewed to identify trends, recurring issues, and opportunities for improvement. The dust management plan should be updated as lessons are learned and as new control technologies become available</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Community engagement</strong> &mdash; proactive communication with neighbouring residents and businesses, including advance notification of particularly dusty activities, a responsive complaints procedure, and regular updates on the measures being taken to minimise dust impacts, builds trust and reduces the likelihood of formal enforcement action</span>
                </li>
              </ul>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Looking Ahead</p>
                </div>
                <p className="text-sm text-white/80">
                  The regulatory and industry landscape for construction air quality is evolving rapidly.
                  The Environment Act 2021 introduces new, more stringent PM2.5 targets that will
                  progressively tighten air quality requirements. The transition to electric plant and
                  vehicles is accelerating. Smart monitoring technologies (AI-powered dust prediction
                  systems, drone-based monitoring, IoT sensor networks) are making it easier to detect
                  and respond to dust events in real time. Contractors that invest in best practice air
                  quality management today will be better positioned to comply with tightening regulations,
                  win work from increasingly environmentally conscious clients, and protect the health of
                  their workers and the communities in which they operate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FAQ SECTION                                                  */}
        {/* ============================================================ */}
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

        {/* ============================================================ */}
        {/*  END-OF-SECTION QUIZ                                          */}
        {/* ============================================================ */}
        <Quiz
          title="Section 1 Knowledge Check"
          questions={quizQuestions}
        />

        {/* ============================================================ */}
        {/*  BOTTOM NAVIGATION                                            */}
        {/* ============================================================ */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-4-section-2">
              Water Management &amp; Pollution Prevention
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

      </article>
    </div>
  );
}
