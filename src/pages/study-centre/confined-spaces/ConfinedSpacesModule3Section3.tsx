import { ArrowLeft, Activity, CheckCircle, AlertTriangle, Gauge, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "four-gas-channels",
    question: "A standard 4-gas confined space monitor measures four channels. What are the four gases/properties it detects?",
    options: [
      "Nitrogen, argon, carbon dioxide, and methane",
      "Oxygen (O\u2082), Lower Explosive Limit (LEL), carbon monoxide (CO), and hydrogen sulphide (H\u2082S)",
      "Oxygen (O\u2082), carbon dioxide (CO\u2082), nitrogen dioxide (NO\u2082), and sulphur dioxide (SO\u2082)",
      "Methane (CH\u2084), propane (C\u2083H\u2088), butane (C\u2084H\u2081\u2080), and hydrogen (H\u2082)"
    ],
    correctIndex: 1,
    explanation: "The standard 4-gas confined space monitor measures oxygen (O\u2082), flammable gases as a percentage of the Lower Explosive Limit (LEL), carbon monoxide (CO), and hydrogen sulphide (H\u2082S). These four channels cover the most common atmospheric hazards encountered in confined spaces."
  },
  {
    id: "bump-test-vs-calibration",
    question: "What is the PRIMARY difference between a bump test and a full calibration?",
    options: [
      "A bump test replaces the sensors; a calibration only checks them",
      "A bump test confirms the sensors respond to gas and alarms activate; a calibration adjusts sensor accuracy against a known concentration of certified gas",
      "A bump test is performed annually; a calibration is performed daily",
      "There is no difference \u2014 the terms are interchangeable"
    ],
    correctIndex: 1,
    explanation: "A bump test is a quick functional check that exposes the sensors to a known gas to confirm they respond and that alarms activate. A full calibration goes further \u2014 it adjusts the sensor readings against a certified reference gas concentration to ensure accuracy. Bump tests are done daily before use; calibrations are typically done monthly (or per manufacturer guidance)."
  },
  {
    id: "pre-entry-testing-levels",
    question: "When performing pre-entry atmospheric monitoring, why must you test at different levels (top, middle, bottom) within the space?",
    options: [
      "To check whether the monitor is working at different heights",
      "Because gases stratify by density \u2014 lighter gases accumulate at the top and heavier gases settle at the bottom",
      "Because the space must be tested from three positions by regulation",
      "To ensure the pump is drawing an adequate sample volume"
    ],
    correctIndex: 1,
    explanation: "Gases stratify by density within a confined space. Lighter-than-air gases (e.g., methane, hydrogen) accumulate at the top, while heavier-than-air gases (e.g., hydrogen sulphide, carbon dioxide) settle at the bottom. Oxygen depletion may occur at any level. Testing at multiple levels ensures that hazardous pockets of gas are not missed."
  }
];

const faqs = [
  {
    question: "Can I enter a confined space if only one of the four gas channels is reading normal?",
    answer: "No. ALL four channels on the monitor must be within safe limits before entry is permitted. Even if three channels read normal, an abnormal reading on any single channel \u2014 whether it is oxygen, LEL, CO, or H\u2082S \u2014 means the atmosphere is unsafe. Do not enter until the cause is identified, corrected, and all four channels confirm a safe atmosphere. The permit-to-work should specify the acceptable ranges for each channel."
  },
  {
    question: "How often should I bump test my gas monitor?",
    answer: "You should bump test your gas monitor before every use, typically at the start of each shift or working day. A bump test is a quick functional check \u2014 it takes approximately 60 seconds. It confirms that the sensors respond to gas and that the alarms activate correctly. If the monitor fails a bump test, it must not be used and must be sent for full calibration or repair. Some manufacturers and site safety policies may require additional bump tests if the monitor has been dropped, exposed to high concentrations of gas, or stored for an extended period."
  },
  {
    question: "What does it mean if my gas monitor readings are fluctuating during entry?",
    answer: "Fluctuating readings indicate that the atmosphere within the confined space is unstable and changing. This could be caused by intermittent gas release, changes in ventilation, chemical reactions, or disturbance of materials by the work being carried out. Fluctuating readings are a warning sign and must be taken seriously. If readings trend towards alarm setpoints, or if sudden spikes occur, you should withdraw from the space immediately and report the situation. Continuous monitoring is essential precisely because atmospheres can change rapidly and without warning."
  },
  {
    question: "What is cross-sensitivity and how does it affect my gas readings?",
    answer: "Cross-sensitivity occurs when a gas sensor responds to a gas other than the one it is designed to detect. For example, an H\u2082S electrochemical sensor can also respond to other reducing gases, and a catalytic bead LEL sensor may respond to silicone vapours or hydrogen. Cross-sensitivity can cause false positive readings (the monitor shows gas when the target gas is not present) or false negative readings (the monitor shows a lower reading than the actual concentration because the interfering gas reduces the sensor response). The instrument manufacturer provides cross-sensitivity data for each sensor type. Understanding these limitations is important for interpreting readings correctly, particularly in environments where multiple gases may be present."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Why is atmospheric testing mandatory BEFORE entry into a confined space?",
    options: [
      "Because the permit-to-work requires a signature confirming testing was done",
      "Because hazardous atmospheres are often invisible and odourless, and cannot be reliably detected by human senses",
      "Because the Health and Safety Executive requires a minimum of three readings before entry",
      "Because atmospheric testing activates the ventilation system automatically"
    ],
    correctAnswer: 1,
    explanation: "Many hazardous gases are colourless and odourless \u2014 for example, carbon monoxide and oxygen deficiency cannot be detected by human senses. By the time you smell hydrogen sulphide at higher concentrations, the gas has already paralysed your sense of smell (olfactory fatigue). Atmospheric testing with calibrated instruments is the only reliable way to determine whether the atmosphere is safe for entry."
  },
  {
    id: 2,
    question: "What type of sensor does a standard 4-gas monitor use to detect flammable gases (LEL)?",
    options: [
      "Electrochemical cell",
      "Paramagnetic sensor",
      "Catalytic bead (pellistor) sensor",
      "Photoionisation detector (PID)"
    ],
    correctAnswer: 2,
    explanation: "Catalytic bead sensors (also called pellistors) are used to detect flammable gases as a percentage of the Lower Explosive Limit (LEL). They work by oxidising (burning) the flammable gas on a heated catalytic surface and measuring the resulting temperature change. This type of sensor requires a minimum of approximately 10% oxygen in the atmosphere to function correctly."
  },
  {
    id: 3,
    question: "What are the standard LOW and HIGH alarm setpoints for oxygen (O\u2082) on a confined space 4-gas monitor?",
    options: [
      "LOW: 18.0% / HIGH: 22.0%",
      "LOW: 19.5% / HIGH: 23.5%",
      "LOW: 20.0% / HIGH: 25.0%",
      "LOW: 17.0% / HIGH: 21.0%"
    ],
    correctAnswer: 1,
    explanation: "The standard oxygen alarm setpoints are 19.5% (low alarm) and 23.5% (high alarm). Normal atmospheric oxygen is approximately 20.9%. A reading below 19.5% indicates oxygen depletion (risk of asphyxiation), and a reading above 23.5% indicates oxygen enrichment (increased fire and explosion risk). Both conditions are dangerous and require immediate action."
  },
  {
    id: 4,
    question: "When performing pre-entry atmospheric monitoring with a sample draw pump, why must you wait an adequate time before reading the results?",
    options: [
      "To allow the monitor to warm up its display backlight",
      "To allow the pump to draw the sample through the tubing to the sensors, as longer tubing lengths increase the response time",
      "To allow the atmosphere inside the space to settle after opening the entry point",
      "Because the sensors need time to cool down between readings"
    ],
    correctAnswer: 1,
    explanation: "When using an extension probe or sample draw tubing, the pump must draw the atmosphere from inside the confined space through the full length of the tubing to the sensors. The longer the tubing, the longer this takes. If you read the display before the sample has reached the sensors, you will be reading the ambient atmosphere outside the space \u2014 not the atmosphere inside it. Always wait for the response time specified by the manufacturer for the tubing length being used."
  },
  {
    id: 5,
    question: "A catalytic bead (pellistor) LEL sensor requires a minimum of approximately what percentage of oxygen to function correctly?",
    options: [
      "5% oxygen",
      "10% oxygen",
      "15% oxygen",
      "20% oxygen"
    ],
    correctAnswer: 1,
    explanation: "Catalytic bead (pellistor) sensors detect flammable gases by oxidising them on a heated catalytic surface. This chemical reaction requires oxygen. If the oxygen concentration falls below approximately 10%, the sensor cannot reliably oxidise the flammable gas and will under-read or fail to detect it entirely. In oxygen-depleted environments, the LEL reading may be dangerously inaccurate. This is a critical limitation to understand."
  },
  {
    id: 6,
    question: "What is the typical sensor life of an electrochemical cell in a portable gas monitor?",
    options: [
      "6 months",
      "1 year",
      "2 to 3 years",
      "5 to 10 years"
    ],
    correctAnswer: 2,
    explanation: "Electrochemical cells (used for detecting toxic gases such as CO and H\u2082S) have a typical operational life of 2 to 3 years. This lifespan can be shortened by exposure to high concentrations of gas, extreme temperatures, and prolonged storage without use. Sensors should be replaced before or at the end of their rated life, and the expiry date should be tracked as part of instrument maintenance records."
  },
  {
    id: 7,
    question: "What is the standard LOW alarm setpoint for carbon monoxide (CO) on a confined space 4-gas monitor?",
    options: [
      "10 ppm",
      "20 ppm",
      "50 ppm",
      "100 ppm"
    ],
    correctAnswer: 1,
    explanation: "The standard LOW alarm setpoint for carbon monoxide is 20 ppm (parts per million). The HIGH alarm is typically set at 100 ppm. Carbon monoxide is a colourless, odourless, highly toxic gas that binds to haemoglobin in the blood approximately 200 times more readily than oxygen, preventing the blood from carrying oxygen to the body\u2019s tissues. Even relatively low concentrations are dangerous with prolonged exposure."
  },
  {
    id: 8,
    question: "Which of the following is a limitation of gas detection instruments that operators must be aware of?",
    options: [
      "Gas monitors can only detect one gas at a time",
      "Cross-sensitivity, where a sensor responds to gases other than its target gas, can cause false positive or false negative readings",
      "Gas monitors do not work in temperatures below 20\u00b0C",
      "Gas monitors cannot be used in spaces with any amount of moisture"
    ],
    correctAnswer: 1,
    explanation: "Cross-sensitivity is a significant limitation of gas detection instruments. Electrochemical and catalytic bead sensors can respond to gases other than their target gas, potentially causing misleading readings. Other limitations include reduced accuracy at temperature extremes, humidity effects on sensor performance, sensor poisoning from exposure to certain chemicals (e.g., silicones can poison catalytic bead sensors), and inherent response time delays. Understanding these limitations is essential for correctly interpreting readings."
  }
];

export default function ConfinedSpacesModule3Section3() {
  useSEO({
    title: "Gas Detection & Monitoring | Confined Spaces Module 3.3",
    description: "Atmospheric testing procedures, 4-gas monitors, sensor types, bump testing, calibration, pre-entry monitoring, continuous monitoring, and interpreting gas readings in confined spaces.",
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
            <Activity className="h-7 w-7 text-cyan-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3 mx-auto">
            <span className="text-cyan-500 text-xs font-semibold">MODULE 3 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Gas Detection &amp; Monitoring
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Why atmospheric testing is mandatory, how gas detection instruments work, and how to interpret readings that could save your life
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>What:</strong> Gas monitors detect invisible, deadly atmospheric hazards</li>
              <li><strong>Standard:</strong> 4-gas monitor (O&#8322;, LEL, CO, H&#8322;S)</li>
              <li><strong>Daily:</strong> Bump test before every use &mdash; no exceptions</li>
              <li><strong>Rule:</strong> Never enter without testing first &mdash; test at all levels</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Before:</strong> Test from outside using extension probe &mdash; top, middle, bottom</li>
              <li><strong>During:</strong> Continuous personal monitor on every entrant</li>
              <li><strong>Alarm:</strong> Evacuate immediately &mdash; do not investigate</li>
              <li><strong>Record:</strong> Log every reading &mdash; pre-entry and continuous</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why atmospheric testing is mandatory before and during confined space entry",
              "Identify the four channels measured by a standard 4-gas confined space monitor",
              "Describe how each sensor type works: electrochemical, catalytic bead, paramagnetic, and infrared",
              "State the standard alarm setpoints for O\u2082, LEL, CO, and H\u2082S",
              "Differentiate between a bump test and a full calibration, including frequency requirements",
              "Describe the correct procedure for pre-entry monitoring at multiple levels",
              "Explain the importance of continuous monitoring during entry and how to interpret readings",
              "Identify the limitations of gas detection instruments including cross-sensitivity and sensor poisoning"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-cyan-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Atmospheric Testing Is Mandatory */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">01</span>
            Why Atmospheric Testing Is Mandatory
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">The Invisible Killer</p>
                </div>
                <p className="text-sm text-white/80">
                  The majority of confined space fatalities are caused by <strong className="text-white">atmospheric hazards
                  that cannot be detected by human senses</strong>. Oxygen deficiency is completely undetectable
                  without instruments. Carbon monoxide is colourless and odourless. Hydrogen sulphide paralyses the
                  sense of smell at dangerous concentrations. Without a gas monitor, you are walking blind into a
                  potentially lethal environment.
                </p>
              </div>

              <p>
                The Confined Spaces Regulations 1997 and the accompanying Approved Code of Practice (ACoP L101) are
                clear: <strong>no person shall enter a confined space unless the atmosphere has been tested and
                confirmed safe, or appropriate controls are in place</strong>. This is not guidance &mdash; it is a
                legal requirement. Atmospheric testing must be carried out <strong>before entry</strong> and, in most
                cases, <strong>continuously during the work</strong>.
              </p>

              <p>
                The atmosphere inside a confined space can be hazardous for many reasons. Oxygen may have been
                displaced by other gases, consumed by biological processes (rusting, decomposition, fermentation), or
                absorbed by the materials of the space itself. Toxic gases may have accumulated from chemical reactions,
                leaking pipework, contaminated ground, or the work being carried out. Flammable gases may be present
                from fuel storage, decomposing organic material, or connected processes. <strong>None of these
                conditions are reliably detectable by the human body until it is too late.</strong>
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">Key Principle:</strong> The atmosphere inside a confined space must
                  be considered <strong>unknown and potentially lethal</strong> until proven otherwise by instrumental
                  testing. You must never assume a space is safe based on previous entry, visual inspection, or the
                  absence of odour. Conditions can change rapidly and without warning.
                </p>
              </div>

              <p>
                Atmospheric testing fulfils three critical functions. First, it provides <strong>pre-entry
                confirmation</strong> that the atmosphere is within safe limits for human occupation. Second, it
                enables <strong>continuous monitoring</strong> during the work, providing real-time warning if
                conditions deteriorate. Third, it creates <strong>a documented record</strong> of atmospheric
                conditions for the permit-to-work, incident investigation, and regulatory compliance.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">When Testing Is Required</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Before every entry</strong> &mdash; even if the space was tested and entered earlier the same day, the atmosphere must be re-tested before each subsequent entry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Continuously during entry</strong> &mdash; personal monitors must be worn by every entrant and/or fixed monitors must be positioned at the entry point</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">After any break in work</strong> &mdash; if the space is left unattended, the atmosphere must be re-tested before re-entry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">If conditions change</strong> &mdash; any change in ventilation, work activity, or weather conditions may affect the atmosphere</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Types of Gas Detection Equipment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">02</span>
            Types of Gas Detection Equipment
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Gas detection instruments range from simple single-gas detectors to sophisticated multi-gas monitors
                and specialist analysers. The type of instrument required depends on the <strong>hazards identified
                in the risk assessment</strong>, the <strong>nature of the confined space</strong>, and the
                <strong> work being carried out</strong>. Understanding the capabilities and limitations of each type
                is essential for selecting the right instrument for the job.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-500 mb-3">Gas Detection Equipment Types</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-cyan-400">Single-Gas Detectors</p>
                    <p className="text-white/70 text-xs mt-1">Measure one specific gas only. Compact, clip-on design. Common for personal monitoring of a single known hazard (e.g., CO detector for a boiler engineer). Limited use for confined spaces where multiple hazards may be present.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-cyan-400">Multi-Gas (4-Gas) Detectors</p>
                    <p className="text-white/70 text-xs mt-1">The <strong className="text-white">standard instrument for confined space work</strong>. Measures four channels simultaneously: O&#8322;, LEL, CO, and H&#8322;S. Available as personal (diffusion) or with sample draw pump for remote monitoring.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-cyan-400">Photoionisation Detectors (PIDs)</p>
                    <p className="text-white/70 text-xs mt-1">Detect volatile organic compounds (VOCs) at very low concentrations (parts per billion). Used when the risk assessment identifies potential VOC exposure &mdash; e.g., in chemical plants, fuel storage areas, or contaminated land.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-base font-bold text-cyan-400">Infrared (IR) Gas Analysers</p>
                    <p className="text-white/70 text-xs mt-1">Used for detecting carbon dioxide (CO&#8322;) and specific hydrocarbons. IR sensors are not affected by oxygen levels and do not suffer from catalytic bead limitations. Often fitted as a fifth channel on advanced multi-gas instruments.</p>
                  </div>
                </div>
              </div>

              <p>
                For the vast majority of confined space entries, a <strong>4-gas monitor is the minimum
                requirement</strong>. It provides simultaneous detection of the four most common atmospheric hazards.
                Where the risk assessment identifies additional hazards &mdash; such as VOCs, carbon dioxide, or
                specific toxic gases &mdash; additional instruments or sensors may be required. A PID may be used
                alongside a 4-gas monitor in environments where volatile organic compounds are a concern.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Diffusion vs Sample Draw</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div>
                    <p className="font-medium text-white mb-1">Diffusion Mode</p>
                    <p>Gas reaches the sensors by natural air movement. The monitor must be in the same atmosphere
                    as the area being tested. Used for <strong className="text-white">personal monitoring</strong> when
                    the monitor is worn by the entrant inside the space. Response is slower than pump-assisted.</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Sample Draw (Pump) Mode</p>
                    <p>An internal pump draws the atmosphere through tubing to the sensors. Allows testing from
                    <strong className="text-white"> outside the space</strong> using an extension probe. Essential
                    for <strong className="text-white">pre-entry monitoring</strong>. The operator can test the
                    atmosphere at specific locations and depths without entering.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: How Sensors Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">03</span>
            How Gas Sensors Work
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding how each sensor type works helps you understand their <strong>capabilities,
                limitations, and failure modes</strong>. A gas monitor is only as reliable as its sensors, and
                every sensor type has characteristics that affect its performance in real-world conditions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Electrochemical Cells &mdash; Toxic Gas Detection (CO, H&#8322;S)</p>
                <p className="text-sm text-white/80 mb-2">
                  Electrochemical cells are the standard sensor for detecting <strong className="text-white">toxic
                  gases</strong> such as carbon monoxide and hydrogen sulphide. The target gas diffuses through a
                  membrane into a liquid electrolyte, where it undergoes a chemical reaction at the electrode
                  surface. This reaction generates a tiny electrical current that is proportional to the gas
                  concentration.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Strengths:</strong> Highly specific to the target gas, low power consumption, good accuracy at low concentrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Limitations:</strong> Cross-sensitivity to some gases, affected by temperature and humidity extremes, finite lifespan (typically 2&ndash;3 years), can be poisoned by certain chemicals</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Catalytic Bead (Pellistor) Sensors &mdash; Flammable Gas Detection (LEL)</p>
                <p className="text-sm text-white/80 mb-2">
                  Catalytic bead sensors detect <strong className="text-white">flammable gases</strong> as a percentage
                  of the Lower Explosive Limit (LEL). They contain two heated beads &mdash; one active (coated with a
                  catalyst) and one reference. When flammable gas contacts the active bead, it oxidises (burns) on the
                  catalyst surface, raising its temperature. The resulting resistance change between the two beads is
                  measured and converted to a gas concentration reading.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Strengths:</strong> Responds to a wide range of flammable gases and vapours, well-proven technology, robust</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Critical limitation:</strong> Requires a minimum of approximately <strong className="text-white">10% oxygen</strong> to function. In oxygen-depleted atmospheres, the sensor will under-read or fail to detect flammable gas entirely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Sensor poisoning:</strong> Exposure to silicone compounds, lead compounds, or high concentrations of H&#8322;S can permanently damage the catalyst, causing the sensor to under-read without any visible indication of failure</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Paramagnetic / Galvanic Cells &mdash; Oxygen Detection (O&#8322;)</p>
                <p className="text-sm text-white/80 mb-2">
                  Oxygen sensors in portable gas monitors typically use <strong className="text-white">galvanic
                  (fuel cell)</strong> technology. The sensor contains a lead anode and a gold cathode in an
                  electrolyte solution. Oxygen diffuses through a membrane and is reduced at the cathode, generating
                  a current proportional to the oxygen partial pressure. Some fixed-installation instruments use
                  <strong className="text-white"> paramagnetic sensors</strong>, which exploit the unique magnetic
                  properties of oxygen molecules.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Strengths:</strong> Highly specific to oxygen, reliable, well-understood technology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Limitations:</strong> Galvanic cells are consumable &mdash; the lead anode is slowly depleted during normal use. Sensor life is typically 2&ndash;3 years even without exposure to gas, as the sensor is continuously exposed to atmospheric oxygen</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Infrared (NDIR) Sensors &mdash; CO&#8322; and Hydrocarbon Detection</p>
                <p className="text-sm text-white/80 mb-2">
                  Non-dispersive infrared (NDIR) sensors pass infrared light through a sample chamber. The target gas
                  absorbs infrared energy at a specific wavelength. By measuring the amount of infrared light absorbed,
                  the sensor determines the gas concentration. NDIR sensors are commonly used for <strong className="text-white">carbon
                  dioxide (CO&#8322;)</strong> detection and as an alternative to catalytic bead sensors for
                  <strong className="text-white"> hydrocarbon detection</strong>.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Key advantage:</strong> Does NOT require oxygen to function &mdash; unlike catalytic bead sensors, IR sensors work reliably in oxygen-depleted or inert atmospheres</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Other strengths:</strong> Cannot be poisoned, longer sensor life (typically 5+ years), no consumable elements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Limitations:</strong> More expensive, larger sensor size, may be affected by water condensation on optical surfaces</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: The 4-Gas Monitor — Standard Confined Space Instrument */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">04</span>
            The 4-Gas Monitor &mdash; Standard Confined Space Instrument
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>4-gas (or &ldquo;quad-gas&rdquo;) monitor</strong> is the standard instrument for confined
                space atmospheric monitoring. It simultaneously measures the four most common atmospheric hazards in a
                single portable device. Every person involved in confined space entry operations must understand what
                each channel measures, what the alarm setpoints mean, and what action to take when an alarm sounds.
              </p>

              {/* Diagram: 4-Gas Monitor Display Explained */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
                <p className="text-sm font-medium text-cyan-400 mb-4 text-center">4-Gas Monitor Display Explained</p>
                <div className="relative mx-auto max-w-sm">
                  {/* Monitor body */}
                  <div className="border-2 border-cyan-500/50 rounded-2xl bg-[#0a0a0a] p-3 sm:p-4">
                    {/* Top label */}
                    <div className="text-center mb-3">
                      <span className="text-[10px] text-cyan-400/60 uppercase tracking-widest">4-Gas Confined Space Monitor</span>
                    </div>

                    {/* Display screen */}
                    <div className="border border-cyan-500/30 rounded-lg bg-[#0d1a1a] p-3 space-y-2">
                      {/* O2 Row */}
                      <div className="flex items-center justify-between bg-cyan-500/5 rounded p-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/20 px-1.5 py-0.5 rounded">O&#8322;</span>
                          <span className="text-[9px] text-white/40">Oxygen</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-mono font-bold text-green-400">20.9</span>
                          <span className="text-[10px] text-white/40 ml-1">% vol</span>
                        </div>
                      </div>

                      {/* LEL Row */}
                      <div className="flex items-center justify-between bg-cyan-500/5 rounded p-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-orange-300 bg-orange-500/20 px-1.5 py-0.5 rounded">LEL</span>
                          <span className="text-[9px] text-white/40">Flammable</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-mono font-bold text-green-400">0</span>
                          <span className="text-[10px] text-white/40 ml-1">% LEL</span>
                        </div>
                      </div>

                      {/* CO Row */}
                      <div className="flex items-center justify-between bg-cyan-500/5 rounded p-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-yellow-300 bg-yellow-500/20 px-1.5 py-0.5 rounded">CO</span>
                          <span className="text-[9px] text-white/40">Carbon Monoxide</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-mono font-bold text-green-400">0</span>
                          <span className="text-[10px] text-white/40 ml-1">ppm</span>
                        </div>
                      </div>

                      {/* H2S Row */}
                      <div className="flex items-center justify-between bg-cyan-500/5 rounded p-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-purple-300 bg-purple-500/20 px-1.5 py-0.5 rounded">H&#8322;S</span>
                          <span className="text-[9px] text-white/40">Hydrogen Sulphide</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-mono font-bold text-green-400">0</span>
                          <span className="text-[10px] text-white/40 ml-1">ppm</span>
                        </div>
                      </div>
                    </div>

                    {/* Alarm indicators */}
                    <div className="flex justify-around mt-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500/60 border border-green-400/40" />
                        <span className="text-[8px] text-white/30 mt-0.5">Power</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-white/10 border border-white/20" />
                        <span className="text-[8px] text-white/30 mt-0.5">Low</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-white/10 border border-white/20" />
                        <span className="text-[8px] text-white/30 mt-0.5">High</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-white/10 border border-white/20" />
                        <span className="text-[8px] text-white/30 mt-0.5">TWA</span>
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="mt-3 text-center">
                    <span className="text-[10px] text-white/40">All readings within safe limits &mdash; green = OK</span>
                  </div>
                </div>
              </div>

              {/* Alarm Setpoints Table */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-500 mb-3">Standard Alarm Setpoints</p>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-4 gap-2 text-xs font-medium text-white/60 border-b border-white/10 pb-2">
                    <span>Channel</span>
                    <span>LOW Alarm</span>
                    <span>HIGH Alarm</span>
                    <span>Normal</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <span className="text-cyan-300 font-medium">O&#8322;</span>
                    <span className="text-yellow-300">19.5%</span>
                    <span className="text-red-300">23.5%</span>
                    <span className="text-white/60">20.9%</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <span className="text-orange-300 font-medium">LEL</span>
                    <span className="text-yellow-300">10%</span>
                    <span className="text-red-300">20%</span>
                    <span className="text-white/60">0%</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <span className="text-yellow-300 font-medium">CO</span>
                    <span className="text-yellow-300">20 ppm</span>
                    <span className="text-red-300">100 ppm</span>
                    <span className="text-white/60">0 ppm</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <span className="text-purple-300 font-medium">H&#8322;S</span>
                    <span className="text-yellow-300">5 ppm</span>
                    <span className="text-red-300">10 ppm</span>
                    <span className="text-white/60">0 ppm</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Each Channel Measures</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-cyan-300">O&#8322; (Oxygen)</strong> &mdash; measured as percentage by
                    volume of the atmosphere. Normal air is 20.9%. Below 19.5% indicates oxygen depletion (risk of
                    asphyxiation); above 23.5% indicates oxygen enrichment (increased fire/explosion risk)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span><strong className="text-orange-300">LEL (Lower Explosive Limit)</strong> &mdash; measured as
                    a percentage of the LEL, not the actual gas concentration. 0% LEL means no flammable gas detected;
                    100% LEL means the atmosphere has reached the lower explosive limit and is capable of igniting.
                    Alarm at 10% and 20% provides early warning well before explosive conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span><strong className="text-yellow-300">CO (Carbon Monoxide)</strong> &mdash; measured in parts
                    per million (ppm). Colourless, odourless, and highly toxic. Binds to haemoglobin ~200 times more
                    readily than oxygen. Workplace Exposure Limit (WEL): 20 ppm (8-hour TWA), 100 ppm (15-minute STEL)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span><strong className="text-purple-300">H&#8322;S (Hydrogen Sulphide)</strong> &mdash; measured in
                    parts per million (ppm). Smells of rotten eggs at low concentrations but paralyses the sense of
                    smell above ~100 ppm. Workplace Exposure Limit: 5 ppm (8-hour TWA), 10 ppm (15-minute STEL)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">When an Alarm Sounds</p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">If any alarm sounds on any channel &mdash; evacuate the space
                  immediately.</strong> Do not silence the alarm and continue working. Do not investigate the cause
                  from inside the space. Leave the space using the planned egress route, report to the top person /
                  attendant, and do not re-enter until the cause has been identified and the atmosphere confirmed safe.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Bump Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">05</span>
            Bump Testing &mdash; Daily Functional Check
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>bump test</strong> (also called a functional test or challenge test) is a quick check
                performed <strong>before every use</strong> to confirm that the gas sensors are responding to gas and
                that the alarms activate correctly. It is not a calibration &mdash; it does not adjust the sensor
                readings. Its purpose is to verify that the instrument is <strong>functional and capable of detecting
                gas</strong>.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-500 mb-3">What a Bump Test Confirms</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Sensors respond</strong> &mdash; each sensor detects the
                    presence of the test gas and changes its reading from the baseline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Alarms activate</strong> &mdash; the audible, visual, and
                    vibration alarms all trigger when the sensor reading exceeds the alarm setpoints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Gas can reach the sensors</strong> &mdash; confirms that the
                    sensor ports, membranes, and filters are not blocked by dirt, moisture, or damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Response time is acceptable</strong> &mdash; the sensors
                    respond within the expected timeframe when exposed to gas</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How to Perform a Bump Test</p>
                <ol className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-cyan-400">1</span>
                    <span><strong className="text-white">Switch on the monitor</strong> in clean air and allow it to
                    complete its start-up sequence and auto-zero</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-cyan-400">2</span>
                    <span><strong className="text-white">Connect the bump test gas cylinder</strong> to the
                    instrument using the appropriate regulator and tubing. Use a certified bump test gas mixture
                    containing concentrations above the alarm setpoints for each sensor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-cyan-400">3</span>
                    <span><strong className="text-white">Apply the test gas</strong> to the sensor ports for the
                    duration specified by the manufacturer (typically 30&ndash;60 seconds)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-cyan-400">4</span>
                    <span><strong className="text-white">Verify all sensors respond</strong> and that the readings
                    rise above the alarm setpoints. Confirm audible, visual, and vibration alarms activate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-cyan-400">5</span>
                    <span><strong className="text-white">Remove the gas</strong> and confirm readings return to
                    baseline (zero for toxic gases, ~20.9% for O&#8322;, 0% for LEL)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-cyan-400">6</span>
                    <span><strong className="text-white">Record the bump test</strong> result &mdash; pass or fail,
                    date, time, and operator. Many modern instruments log this automatically</span>
                  </li>
                </ol>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">If the Bump Test Fails</p>
                </div>
                <p className="text-sm text-white/80">
                  If <strong className="text-white">any sensor fails</strong> to respond during the bump test, or if
                  the alarms do not activate, the instrument must <strong className="text-white">NOT be used</strong>.
                  It must be taken out of service and sent for full calibration or repair. Do not attempt to &ldquo;work
                  around&rdquo; a failed bump test. Do not enter a confined space with an instrument that has not passed
                  its daily bump test. <strong className="text-white">No bump test, no entry.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: Calibration */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">06</span>
            Calibration &mdash; Ensuring Accuracy
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>full calibration</strong> goes beyond a bump test. While a bump test confirms that the sensors
                respond to gas, a calibration <strong>adjusts the sensor readings</strong> to match a known,
                certified reference gas concentration. It ensures that the readings displayed on the instrument are
                <strong> accurate</strong> &mdash; not just present.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Bump Test vs Full Calibration</p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3">
                    <p className="text-base font-bold text-cyan-400 mb-2">Bump Test</p>
                    <ul className="text-white/70 text-xs space-y-1">
                      <li>&bull; Quick functional check (~60 seconds)</li>
                      <li>&bull; Confirms sensors respond and alarms activate</li>
                      <li>&bull; Does NOT adjust readings</li>
                      <li>&bull; Performed <strong className="text-white">daily / before every use</strong></li>
                      <li>&bull; Pass / fail only &mdash; no accuracy adjustment</li>
                    </ul>
                  </div>
                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3">
                    <p className="text-base font-bold text-cyan-400 mb-2">Full Calibration</p>
                    <ul className="text-white/70 text-xs space-y-1">
                      <li>&bull; Comprehensive accuracy adjustment (~5&ndash;15 minutes)</li>
                      <li>&bull; Adjusts sensor readings to match certified reference gas</li>
                      <li>&bull; Ensures readings are accurate, not just present</li>
                      <li>&bull; Performed <strong className="text-white">monthly</strong> (or per manufacturer guidance)</li>
                      <li>&bull; Uses certified calibration gas with known concentration</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-500 mb-3">Calibration Key Requirements</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Frequency:</strong> Follow the manufacturer&rsquo;s
                    recommended calibration schedule. Typically monthly, but may be more frequent in harsh
                    environments or following a failed bump test. Some regulations or site requirements may mandate
                    specific intervals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Certified calibration gas:</strong> Only use certified
                    calibration gas cylinders with a known concentration and within their expiry date. The gas
                    mixture must be traceable to national or international standards. Never use expired gas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Competent person:</strong> Calibration should be performed
                    by a person trained and competent in the calibration procedure for the specific instrument.
                    This may be an in-house technician or an external service provider</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Record keeping:</strong> Every calibration must be recorded
                    with the date, gas cylinder serial number and expiry, before/after readings, and the name of the
                    person who performed it. These records must be retained and available for inspection</span>
                  </li>
                </ul>
              </div>

              <p>
                Calibration is also required <strong>after sensor replacement</strong>, after the instrument has been
                exposed to very high gas concentrations, after a significant impact or drop, and whenever the bump
                test indicates the readings are drifting outside acceptable tolerances. If the calibration reveals
                that a sensor cannot be adjusted to within acceptable limits, the sensor must be replaced.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Calibration Records Must Include</p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Instrument serial number and model</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Date and time of calibration</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Calibration gas cylinder serial number</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Gas concentration and expiry date</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Before-calibration readings (as found)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>After-calibration readings (as left)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Pass / fail result for each sensor</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Name and signature of person performing calibration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Pre-Entry & Continuous Monitoring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">07</span>
            Pre-Entry &amp; Continuous Monitoring
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Atmospheric monitoring in confined spaces falls into two phases: <strong>pre-entry monitoring</strong>
                (before anyone enters the space) and <strong>continuous monitoring</strong> (throughout the entire
                duration of the work). Both are essential. The atmosphere can change at any time, and a space that
                was safe at the start of the day may become dangerous as work progresses.
              </p>

              {/* Diagram: Pre-Entry Monitoring Procedure */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
                <p className="text-sm font-medium text-cyan-400 mb-4 text-center">Pre-Entry Monitoring Procedure</p>
                <div className="relative mx-auto max-w-md space-y-3">
                  {/* Step 1: Operator outside */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-cyan-400">1</div>
                    <div className="flex-1 border border-white/10 rounded-lg bg-white/5 p-3">
                      <p className="text-xs font-medium text-white mb-1">Operator Remains OUTSIDE</p>
                      <p className="text-[10px] text-white/60">Connect extension probe / sample draw tubing to the pump inlet. Operator stays at the entry point &mdash; never enters to test.</p>
                    </div>
                  </div>

                  {/* The confined space diagram */}
                  <div className="border-2 border-dashed border-cyan-500/30 rounded-lg p-3 bg-cyan-500/5">
                    <p className="text-[10px] text-cyan-400 font-medium mb-2 text-center">CONFINED SPACE (Cross-Section)</p>
                    <div className="space-y-2">
                      {/* Top level */}
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                          <span className="text-[8px] font-bold text-red-400">T</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-red-500/30 rounded" />
                        <span className="text-[9px] text-red-300">Top &mdash; light gases (CH&#8324;, H&#8322;)</span>
                      </div>
                      {/* Middle level */}
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center">
                          <span className="text-[8px] font-bold text-yellow-400">M</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-yellow-500/30 rounded" />
                        <span className="text-[9px] text-yellow-300">Middle &mdash; breathing zone level</span>
                      </div>
                      {/* Bottom level */}
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                          <span className="text-[8px] font-bold text-purple-400">B</span>
                        </div>
                        <div className="flex-1 h-0.5 bg-purple-500/30 rounded" />
                        <span className="text-[9px] text-purple-300">Bottom &mdash; heavy gases (H&#8322;S, CO&#8322;)</span>
                      </div>
                    </div>
                    <div className="mt-2 border-t border-white/10 pt-2">
                      <p className="text-[9px] text-white/40 text-center">Gases stratify by density &mdash; test ALL THREE levels</p>
                    </div>
                  </div>

                  {/* Step 2: Wait */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-cyan-400">2</div>
                    <div className="flex-1 border border-white/10 rounded-lg bg-white/5 p-3">
                      <p className="text-xs font-medium text-white mb-1">Wait for Pump Response Time</p>
                      <p className="text-[10px] text-white/60">The pump must draw the sample through the full length of tubing. Longer tubing = longer wait. Do not read the display until the sample has reached the sensors. Typical wait: 30 seconds per 10 metres of tubing.</p>
                    </div>
                  </div>

                  {/* Step 3: Record */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-cyan-400">3</div>
                    <div className="flex-1 border border-white/10 rounded-lg bg-white/5 p-3">
                      <p className="text-xs font-medium text-white mb-1">Record All Readings</p>
                      <p className="text-[10px] text-white/60">Log all four channels at each level (top, middle, bottom). Record on the permit-to-work. ALL channels must be within safe limits at ALL levels before entry is authorised.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-500 mb-3">Pre-Entry Monitoring &mdash; Critical Points</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Test from outside:</strong> Always test the atmosphere from
                    outside the space using an extension probe or sample draw tubing. Never enter the space to take
                    the first reading &mdash; the atmosphere is unknown and may be immediately dangerous to life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Test at multiple levels:</strong> Gases stratify by density.
                    Lighter-than-air gases (methane, hydrogen) accumulate at the top. Heavier-than-air gases (H&#8322;S,
                    CO&#8322;) settle at the bottom. You must test at the top, middle, and bottom of the space to
                    detect hazardous pockets that may not be present at the entry point</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Allow adequate response time:</strong> The pump must draw the
                    atmosphere through the full length of tubing before the reading is valid. A common error is reading
                    the display too early, which shows the outside atmosphere rather than the atmosphere inside the space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Repeat if ventilation is applied:</strong> If the space is
                    ventilated before entry, re-test the atmosphere after ventilation has been running for an adequate
                    period. Ventilation may displace gases to different locations within the space</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Continuous Monitoring During Entry</p>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    Once entry has been authorised, the atmosphere must be <strong className="text-white">monitored
                    continuously</strong> throughout the duration of the work. Continuous monitoring uses two
                    complementary approaches:
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Gauge className="h-4 w-4 text-cyan-400" />
                        <p className="text-xs font-medium text-white">Personal Monitors</p>
                      </div>
                      <p className="text-[11px] text-white/70">
                        Worn by <strong className="text-white">every entrant</strong> in the breathing zone (chest/collar
                        level). Provide real-time warning to the individual. If the alarm sounds, the entrant evacuates
                        immediately. Personal monitors are typically diffusion-type (no pump needed).
                      </p>
                    </div>
                    <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Radio className="h-4 w-4 text-cyan-400" />
                        <p className="text-xs font-medium text-white">Fixed / Area Monitors</p>
                      </div>
                      <p className="text-[11px] text-white/70">
                        Positioned at the <strong className="text-white">entry point</strong> or within the space.
                        Visible to the top person / attendant outside. Provides a continuous reading that can be
                        monitored remotely. Some are connected to external alarm systems and data loggers.
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-[11px] text-white/80">
                      <strong className="text-red-300">Remember:</strong> Continuous monitoring does not replace
                      pre-entry testing. It supplements it. The atmosphere can change during work due to the work
                      activity itself (welding, grinding, painting, cleaning), changes in ventilation, or changes in
                      the connected process. Continuous monitoring provides the real-time warning that enables safe
                      evacuation before conditions become life-threatening.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Interpreting Readings, Limitations & Maintenance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">08</span>
            Interpreting Readings, Limitations &amp; Maintenance
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A gas monitor is a life-safety instrument, but it is only effective if the operator can
                <strong> correctly interpret the readings</strong> and understands the <strong>limitations</strong> of
                the technology. A reading on a display is not an absolute guarantee of safety &mdash; it is one input
                into an overall safety assessment that must also consider the risk assessment, the work being carried
                out, and the specific characteristics of the confined space.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Interpreting Readings</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Steady readings within safe limits</strong> &mdash; the
                    atmosphere is currently within acceptable parameters. Continue monitoring. A steady reading does
                    not mean conditions will remain unchanged</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Fluctuating readings</strong> &mdash; indicate an unstable
                    atmosphere. The gas concentration is changing, which may be caused by intermittent release,
                    variable ventilation, or work disturbance. Fluctuating readings are a warning sign &mdash;
                    increase vigilance and be prepared to evacuate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Trending upward</strong> &mdash; if a toxic gas reading is
                    gradually increasing, or if oxygen is gradually decreasing, this trend indicates a worsening
                    atmosphere. Do not wait for the alarm &mdash; if the trend is consistent and moving toward alarm
                    setpoints, consider withdrawing from the space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Sudden spike or step-change</strong> &mdash; a rapid increase
                    in any gas channel (even briefly) indicates a sudden release. This may be caused by disturbing
                    contaminated material, a connected process change, or a ventilation failure.
                    <strong className="text-red-300"> Evacuate immediately</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Stuck at zero (toxic channels)</strong> &mdash; if a toxic
                    gas sensor shows exactly zero throughout the entire entry with no fluctuation at all, this may
                    indicate a failed or blocked sensor rather than a genuinely zero reading. Cross-check with other
                    instruments and consider whether the environment genuinely contains no trace gases</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Evacuate Immediately When</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span>Any alarm sounds on any channel &mdash; low or high</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span>Readings trend rapidly toward alarm setpoints</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span>The monitor malfunctions, displays error codes, or shuts down unexpectedly</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span>The battery low warning sounds &mdash; a dead monitor provides zero protection</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span>Ventilation fails or is interrupted for any reason</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span>You feel unwell, dizzy, nauseous, or experience any symptoms of gas exposure</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Instrument Limitations</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Cross-sensitivity:</strong> Sensors may respond to gases other
                    than their target. An H&#8322;S sensor may respond to SO&#8322;; a CO sensor may respond to hydrogen.
                    This can cause false readings in multi-gas environments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Temperature and humidity:</strong> Extreme cold, heat, or
                    humidity can affect sensor performance. Most instruments are rated for 0&ndash;40&deg;C and
                    15&ndash;90% RH. Outside these ranges, readings may be unreliable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Sensor poisoning:</strong> Certain substances can permanently
                    damage sensors. Silicone compounds, lead, and phosphorus compounds can poison catalytic bead sensors.
                    The poisoned sensor may read zero even when flammable gas is present &mdash; a potentially fatal failure
                    mode that is not indicated by an alarm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Response time:</strong> No sensor responds instantaneously.
                    There is always a delay between the gas reaching the sensor and the reading appearing on the display.
                    This delay is longer with sample draw tubing. In a rapidly changing atmosphere, the displayed reading
                    may lag behind the actual condition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Catalytic bead in low-O&#8322;:</strong> As covered in Section
                    03, catalytic bead LEL sensors require ~10% oxygen to function. In an oxygen-depleted atmosphere,
                    the LEL reading is unreliable and may dangerously under-report flammable gas concentration</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Instrument Maintenance</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Sensor life:</strong> Track sensor installation dates and
                    expected lifespan (typically 2&ndash;3 years for electrochemical and O&#8322; cells; longer for IR
                    sensors). Replace sensors before they reach end-of-life. A sensor that is past its rated life
                    may still appear to work but cannot be relied upon for accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Battery management:</strong> Always ensure the battery is
                    fully charged before use. Know the instrument&rsquo;s battery life (typically 12&ndash;18 hours).
                    A monitor with a low battery is a monitor that may shut down during entry, leaving the entrant
                    without atmospheric protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Cleanliness:</strong> Keep sensor ports, filters, and pump
                    inlets clean and free from dust, dirt, and moisture. Blocked sensor ports will prevent gas from
                    reaching the sensor. Clean the instrument after each use as per manufacturer instructions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Storage:</strong> Store the instrument in a clean, dry
                    environment within the temperature range specified by the manufacturer. Do not store in a sealed
                    bag or container &mdash; galvanic oxygen sensors consume oxygen continuously and will deplete
                    in an enclosed space, shortening sensor life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span><strong className="text-white">Record keeping:</strong> Maintain a log for each instrument
                    recording bump test results, calibration dates and results, sensor replacement dates, repairs,
                    and any incidents of high-concentration exposure. This log forms part of the evidence that the
                    instrument is properly maintained and fit for purpose</span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-500">Summary:</strong> A gas monitor is a life-safety instrument.
                  It must be bump tested before every use, calibrated at the frequency specified by the manufacturer,
                  properly maintained, and operated by someone who understands what the readings mean and what to do
                  when they change. <strong>The instrument cannot protect you if you do not understand it.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

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
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-3-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Non-Atmospheric Hazards
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-3-section-4">
              Next: Ventilation in Confined Spaces
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
