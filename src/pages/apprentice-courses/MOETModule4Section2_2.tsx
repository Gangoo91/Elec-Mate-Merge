import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Thermal Imaging - MOET Module 4.2.2";
const DESCRIPTION = "Infrared thermography principles, emissivity, camera types, interpreting thermograms, hot spots in connections, busbars, motors and switchgear, reporting, trending, BS EN 16714, and safety during live scanning for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "emissivity",
    question: "What is emissivity in infrared thermography?",
    options: [
      "The brightness of the thermal camera display",
      "A measure of how effectively a surface emits thermal radiation compared to a perfect emitter (blackbody)",
      "The temperature of the camera sensor",
      "The distance between the camera and the target"
    ],
    correctIndex: 1,
    explanation: "Emissivity is a dimensionless value between 0 and 1 that describes how efficiently a surface emits infrared radiation. A perfect emitter (blackbody) has an emissivity of 1.0. Materials like painted surfaces (~0.95) have high emissivity and give accurate readings. Polished metals like bare copper (~0.07) have very low emissivity and reflect surrounding radiation, making temperature measurement difficult without correction."
  },
  {
    id: "thermal-pattern",
    question: "A thermogram shows one phase of a three-phase busbar connection significantly hotter than the other two phases carrying similar load. This indicates:",
    options: [
      "Normal operation — one phase always runs hotter",
      "A high-resistance connection on the hot phase, likely due to a loose bolt, corroded contact surface or insufficient contact area",
      "The thermal camera is incorrectly calibrated",
      "The load on that phase is much higher than the others"
    ],
    correctIndex: 1,
    explanation: "When all three phases carry similar current, they should be at similar temperatures. A significantly hotter connection on one phase indicates a localised problem — most commonly a loose bolted connection, corroded contact surface, or reduced contact area. This creates higher resistance, generating more heat (P = I²R). The differential temperature indicates the severity."
  },
  {
    id: "live-scanning-safety",
    question: "When carrying out a thermographic survey of live switchgear with covers removed, the primary safety concern is:",
    options: [
      "The thermal camera might be damaged by electromagnetic fields",
      "Exposure to arc flash — the surveyor must wear appropriate arc-rated PPE and maintain safe working distances",
      "The heat from the equipment might affect the camera",
      "Other workers might see the thermal images"
    ],
    correctIndex: 1,
    explanation: "Removing covers from live switchgear exposes the surveyor to the risk of arc flash — a violent release of energy caused by an electrical fault that can produce temperatures exceeding 20,000°C and blast pressures. Arc-rated PPE (face shield, flame-resistant clothing, insulated gloves) must be worn, and the arc flash incident energy level must be assessed beforehand. IR viewing windows eliminate this risk by allowing scanning without cover removal."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Infrared thermography detects:",
    options: [
      "Visible light reflected from equipment surfaces",
      "Infrared radiation emitted by objects, which correlates to their surface temperature",
      "Radio waves from electrical conductors",
      "Ultrasonic vibrations from bearings"
    ],
    correctAnswer: 1,
    explanation: "All objects above absolute zero emit infrared radiation. The intensity and wavelength of this radiation is directly related to the object's surface temperature. An infrared camera detects this radiation and converts it into a visual thermal image (thermogram) where colours or grey scales represent different temperatures."
  },
  {
    id: 2,
    question: "The emissivity of polished bare copper is approximately:",
    options: [
      "0.95 (very high)",
      "0.65 (moderate)",
      "0.07 (very low)",
      "1.00 (perfect)"
    ],
    correctAnswer: 2,
    explanation: "Polished bare copper has a very low emissivity (~0.07), meaning it is a very poor emitter of infrared radiation and a very good reflector. This makes accurate temperature measurement with an IR camera extremely difficult — the camera 'sees' reflected radiation from surrounding objects rather than the copper's own emission. Applying high-emissivity tape or paint to measurement points overcomes this problem."
  },
  {
    id: 3,
    question: "For a meaningful thermographic survey, the equipment should be:",
    options: [
      "De-energised and cold",
      "Energised and carrying at least 40% of its normal load current",
      "Operating at maximum fault current",
      "Recently painted white"
    ],
    correctAnswer: 1,
    explanation: "A thermographic survey must be conducted while equipment is energised and under load, because heat is generated by current flowing through resistance (P = I²R). At very low loads, even a loose connection may not generate enough heat to be detectable. A minimum of 40% normal load is generally recommended, with the actual load percentage recorded for each survey to allow meaningful comparison."
  },
  {
    id: 4,
    question: "IR viewing windows fitted to panel doors are made from materials that:",
    options: [
      "Are transparent to visible light, like glass",
      "Transmit infrared radiation while providing a physical barrier against arc flash and maintaining the panel's IP rating",
      "Block all radiation to protect the camera",
      "Only work with specific camera brands"
    ],
    correctAnswer: 1,
    explanation: "IR viewing windows are made from materials such as calcium fluoride, barium fluoride, or crystal polymer that are opaque to visible light but transparent to infrared wavelengths. They allow thermal scanning without removing panel covers, eliminating arc flash risk and maintaining the panel's IP rating. They are UL-listed safety devices and should be installed at locations where the most critical connections can be viewed."
  },
  {
    id: 5,
    question: "BS EN 16714 relates to:",
    options: [
      "Arc flash protection standards",
      "Non-destructive testing — thermographic testing, including qualification of thermographers and equipment requirements",
      "Electrical installation testing",
      "Vibration analysis standards"
    ],
    correctAnswer: 1,
    explanation: "BS EN 16714 is the European standard for thermographic testing as a non-destructive testing (NDT) method. It covers general principles, equipment requirements, and the qualification and certification of thermographers. It provides a standardised framework for thermographic inspection, including reporting requirements and quality assurance."
  },
  {
    id: 6,
    question: "A thermal image showing a uniform temperature increase across all three phases of a busbar system indicates:",
    options: [
      "Three loose connections",
      "Normal loading — the busbars are carrying current and generating expected heat, or the system may be overloaded",
      "The camera is incorrectly focused",
      "A problem with the neutral connection"
    ],
    correctAnswer: 1,
    explanation: "Uniform heating across all phases suggests the temperature rise is due to normal current flow rather than a localised fault. However, if the temperature is higher than expected for the rated current, it may indicate overloading, undersized busbars, or inadequate ventilation. Comparison with the rated temperature rise and the actual load percentage is needed to determine whether the heating is acceptable."
  },
  {
    id: 7,
    question: "When reporting thermographic survey findings, the report should include:",
    options: [
      "Only the thermal images",
      "Thermal images with corresponding visual photographs, ambient temperature, load conditions, emissivity settings, ΔT values, severity classification and recommended actions",
      "Only the maximum temperatures found",
      "A verbal summary to the building manager"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive thermographic report includes: thermal images (annotated with temperature values), corresponding visual photographs (for identification), ambient conditions (temperature, humidity), equipment load at time of survey (percentage of rated), emissivity settings used, delta-T calculations, severity classification for each anomaly, and recommended corrective actions with priority."
  },
  {
    id: 8,
    question: "The main advantage of regular thermographic trending is:",
    options: [
      "It provides colourful images for marketing materials",
      "Comparing thermal data over time reveals gradual deterioration that may not be apparent from a single survey, allowing intervention before failure",
      "It eliminates the need for all other maintenance",
      "It can measure the voltage of electrical circuits"
    ],
    correctAnswer: 1,
    explanation: "Trending — comparing thermal data from successive surveys — reveals changes over time. A connection that was 5°C above ambient last year but is now 15°C above indicates progressive deterioration, even though 15°C may not trigger an immediate action threshold. Trending transforms thermography from a snapshot into a predictive tool, enabling condition-based maintenance decisions."
  },
  {
    id: 9,
    question: "Wind and air movement during a thermographic survey can:",
    options: [
      "Improve the accuracy of measurements",
      "Cool hot spots, causing the survey to underestimate the severity of faults",
      "Have no effect on infrared measurements",
      "Damage the thermal camera"
    ],
    correctAnswer: 1,
    explanation: "Air movement (wind, forced ventilation, draughts) cools equipment surfaces, reducing the measured temperature and potentially causing the surveyor to underestimate the severity of a fault. For indoor surveys, note the proximity of ventilation systems. For outdoor surveys, wind speed should be recorded. Where possible, surveys should be conducted with minimal air movement across the equipment."
  },
  {
    id: 10,
    question: "The thermal image quality term 'IFOV' (Instantaneous Field of View) determines:",
    options: [
      "The price of the camera",
      "The smallest object the camera can resolve at a given distance — essentially the camera's spatial resolution",
      "The colour palette used to display the image",
      "The battery life of the camera"
    ],
    correctAnswer: 1,
    explanation: "IFOV defines the smallest object the camera can accurately measure at a given distance. A smaller IFOV means better resolution. This is important in electrical inspections where connections and components may be small and closely spaced. The measurement spot must be entirely within the target — if the target is smaller than the IFOV at the scanning distance, the reading will be averaged with the background."
  },
  {
    id: 11,
    question: "Before carrying out a thermographic survey of live equipment with covers removed, you must:",
    options: [
      "Simply point the camera at the panel",
      "Complete an arc flash risk assessment, determine the incident energy level, select appropriate arc-rated PPE, establish arc flash boundaries, and have a safe system of work in place",
      "Only ensure the camera battery is charged",
      "Ask the building occupants to leave the area"
    ],
    correctAnswer: 1,
    explanation: "Working on or near live equipment with covers removed carries a risk of arc flash. Before starting, an arc flash risk assessment must be completed to determine the prospective incident energy level. This determines the required arc-rated PPE (typically Category 2 or higher for distribution-level equipment), the arc flash boundary, and the safe working distance. A written safe system of work should be in place."
  },
  {
    id: 12,
    question: "Reflected temperature compensation is necessary when:",
    options: [
      "Scanning high-emissivity surfaces like painted metal",
      "Scanning low-emissivity surfaces where reflected radiation from nearby heat sources could affect the reading",
      "The camera is being used outdoors",
      "Scanning very cold equipment"
    ],
    correctAnswer: 1,
    explanation: "Low-emissivity surfaces (bare metals, polished surfaces) reflect infrared radiation from their surroundings. If a nearby heat source (radiator, process equipment, sunlit surface) reflects off the target, the camera may read the reflected temperature rather than the actual surface temperature. Reflected temperature compensation corrects for this by measuring and accounting for the reflected radiation."
  }
];

const faqs = [
  {
    question: "What qualifications do I need to carry out thermographic surveys?",
    answer: "While there is no legal requirement for a specific qualification, industry best practice recommends Category 1 (ITC Level 1) certification as a minimum for thermographic inspection of electrical installations. This covers camera operation, basic thermography theory, reporting and common applications. Category 2 (ITC Level 2) provides more advanced analysis skills. Certification is available through organisations such as the Infrared Training Centre (ITC), British Institute of Non-Destructive Testing (BINDT), and various camera manufacturers."
  },
  {
    question: "How much does a thermal camera cost?",
    answer: "Thermal cameras range from approximately £300 for basic smartphone attachments (suitable for quick checks but limited accuracy) to over £30,000 for high-resolution professional instruments. For regular electrical inspection, a mid-range camera (£3,000-£8,000) with at least 320x240 resolution, manual focus, adjustable emissivity, and reporting software is recommended. Many organisations hire cameras or contract thermographic surveys to specialist firms."
  },
  {
    question: "Can I use a thermal camera through a glass window?",
    answer: "No. Standard glass is opaque to the infrared wavelengths used by thermal cameras (typically 8-14 μm for long-wave cameras). The camera will measure the temperature of the glass surface, not the object behind it. Special IR-transparent windows made from calcium fluoride, barium fluoride or crystal polymer must be used. These materials transmit infrared radiation while blocking visible light and maintaining the enclosure's IP rating."
  },
  {
    question: "What is the difference between qualitative and quantitative thermography?",
    answer: "Qualitative (comparative) thermography identifies thermal anomalies by comparing similar components under similar conditions — e.g., comparing the three phases of a busbar connection. It does not require precise temperature measurement and is the most common approach for routine electrical inspection. Quantitative thermography measures actual temperatures, which requires accurate emissivity settings, reflected temperature compensation, and controlled conditions. Quantitative data is needed for trending and for determining whether components are operating within their rated temperature limits."
  },
  {
    question: "How often should IR viewing windows be inspected?",
    answer: "IR viewing windows should be visually inspected during each thermographic survey for damage, contamination or seal deterioration. Crystal windows can be cleaned with appropriate lens cleaning solution. Polymer windows have a finite life and should be replaced according to the manufacturer's recommendations — typically every 5-10 years or if they become cloudy, scratched or damaged. The window's transmission characteristics should be verified periodically against a known reference."
  }
];

const MOETModule4Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 4.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Thermal Imaging
          </h1>
          <p className="text-white/80">
            Infrared thermography for detecting hot spots, trending degradation and preventing electrical fires
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Principle:</strong> All objects emit IR radiation proportional to temperature</li>
              <li className="pl-1"><strong>Emissivity:</strong> Surface property affecting measurement accuracy</li>
              <li className="pl-1"><strong>Applications:</strong> Connections, busbars, motors, switchgear, transformers</li>
              <li className="pl-1"><strong>Safety:</strong> Arc flash risk when scanning with covers removed</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Hot spots:</strong> Loose connections, overloaded circuits, failing components</li>
              <li className="pl-1"><strong>IR windows:</strong> Enable scanning without removing covers</li>
              <li className="pl-1"><strong>Trending:</strong> Comparing surveys reveals progressive deterioration</li>
              <li className="pl-1"><strong>BS EN 16714:</strong> Standard for thermographic testing</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the principles of infrared thermography and thermal radiation",
              "Understand the significance of emissivity and its effect on temperature measurement",
              "Interpret thermograms to identify hot spots in electrical connections and equipment",
              "Apply severity classification to thermographic findings",
              "Produce comprehensive thermographic survey reports with trending data",
              "Implement safe working practices for thermographic surveys on live equipment"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Principles of Infrared Thermography
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every object with a temperature above absolute zero (-273.15°C) emits electromagnetic radiation
              in the infrared spectrum. The intensity and wavelength distribution of this radiation is
              directly related to the object's surface temperature — hotter objects emit more radiation
              at shorter wavelengths. An infrared camera detects this radiation and converts it into a
              visual thermal image, or thermogram.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Thermography Concepts</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stefan-Boltzmann Law:</strong> Total radiation emitted is proportional to the fourth power of absolute temperature (W = εσT⁴)</li>
                <li className="pl-1"><strong>Emissivity (ε):</strong> The ratio of radiation emitted by a surface to that of a perfect blackbody at the same temperature (0 to 1)</li>
                <li className="pl-1"><strong>Reflected temperature:</strong> Radiation from surrounding objects reflected off the target surface, which can distort measurements on low-emissivity surfaces</li>
                <li className="pl-1"><strong>Atmospheric transmission:</strong> The atmosphere absorbs some IR radiation; significant at long distances but negligible for most electrical inspection distances</li>
                <li className="pl-1"><strong>Spatial resolution (IFOV):</strong> The smallest object the camera can resolve — determines the minimum size of target that can be accurately measured</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Emissivity Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Material</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Emissivity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Measurement Difficulty</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Painted surface (any colour)</td><td className="border border-white/10 px-3 py-2">0.90–0.95</td><td className="border border-white/10 px-3 py-2 text-green-400">Easy — accurate readings</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Oxidised copper</td><td className="border border-white/10 px-3 py-2">0.60–0.70</td><td className="border border-white/10 px-3 py-2 text-yellow-400">Moderate</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Oxidised steel</td><td className="border border-white/10 px-3 py-2">0.70–0.80</td><td className="border border-white/10 px-3 py-2 text-yellow-400">Moderate</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">PVC insulation</td><td className="border border-white/10 px-3 py-2">0.91–0.93</td><td className="border border-white/10 px-3 py-2 text-green-400">Easy</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Polished copper</td><td className="border border-white/10 px-3 py-2">0.02–0.07</td><td className="border border-white/10 px-3 py-2 text-red-400">Very difficult</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Polished aluminium</td><td className="border border-white/10 px-3 py-2">0.03–0.06</td><td className="border border-white/10 px-3 py-2 text-red-400">Very difficult</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> For bare metal connections, use qualitative (comparative) thermography
              rather than trying to measure absolute temperatures. Compare the three phases of a similar
              connection under similar load — a significant temperature difference between phases indicates a
              problem, regardless of the absolute value.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Interpreting Thermograms
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The value of thermography lies not in taking pretty pictures but in correctly interpreting
              what the thermal image reveals about equipment condition. Understanding common thermal
              patterns and their causes is essential for accurate diagnosis.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Thermal Patterns in Electrical Equipment</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Single hot connection (one phase):</strong> High-resistance joint — loose bolt, corroded surface, insufficient contact area</li>
                  <li className="pl-1"><strong>All three phases equally hot:</strong> Overloading or undersized conductors — check actual current vs rating</li>
                  <li className="pl-1"><strong>Hot fuse:</strong> Partial blowing, loose fuse clips, or fuse operating near its rating</li>
                  <li className="pl-1"><strong>Hot MCB/MCCB:</strong> Overloaded circuit, high-resistance internal connection, or approaching end of life</li>
                  <li className="pl-1"><strong>Motor frame — even heat:</strong> Normal operating temperature; compare to rated temperature rise</li>
                  <li className="pl-1"><strong>Motor frame — localised hot spot:</strong> Stator winding fault, blocked ventilation, or bearing problem</li>
                  <li className="pl-1"><strong>Transformer — winding pattern visible:</strong> Normal for loaded transformer; check against rating</li>
                  <li className="pl-1"><strong>Cable — heat at termination:</strong> Loose gland, undersized termination, or poor compression</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Avoiding Misdiagnosis</p>
              <p className="text-sm text-white">
                Not every hot spot indicates a fault. Solar heating on south-facing panels, radiated heat
                from nearby processes, reflected radiation from hot objects, and normal operating temperatures
                can all create thermal patterns that may be misinterpreted. Always consider the context: What
                is the load? What is nearby? Is the pattern consistent across similar equipment? When in
                doubt, repeat the measurement under different conditions.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Reporting, Trending and Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A thermographic survey has limited value without proper reporting and trending. The report
              must provide sufficient information for maintenance decisions, and successive surveys must
              be comparable to reveal trends over time.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Report Contents</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Survey date, time, surveyor name and qualification level</li>
                <li className="pl-1">Camera model, serial number, last calibration date</li>
                <li className="pl-1">Ambient temperature and humidity at time of survey</li>
                <li className="pl-1">Equipment load conditions (actual percentage of rated load)</li>
                <li className="pl-1">For each anomaly: thermal image, visual photograph, location identifier</li>
                <li className="pl-1">Emissivity setting used, reflected temperature compensation</li>
                <li className="pl-1">Maximum temperature, reference temperature, ΔT value</li>
                <li className="pl-1">Severity classification and recommended action</li>
                <li className="pl-1">Comparison to previous survey data where available</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Trending Technique</h3>
                <p className="text-sm text-white">
                  For trending to be meaningful, surveys must be carried out under consistent conditions:
                  similar load percentage, similar ambient temperature, same camera settings, same scanning
                  angles. Plot the ΔT for each monitored connection over time. A rising trend indicates
                  progressive deterioration and should trigger corrective action before the threshold for
                  urgent repair is reached.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">BS EN 16714</h3>
                <p className="text-sm text-white">
                  BS EN 16714 provides the European standard framework for thermographic testing as a
                  non-destructive testing method. Part 1 covers general principles, Part 2 covers equipment
                  requirements, and Part 3 covers terms and definitions. The standard supports consistent
                  quality in thermographic inspection across organisations and industries.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Safety During Live Scanning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thermographic surveys must be carried out on energised, loaded equipment to be meaningful.
              This creates an inherent conflict with electrical safety principles. Safe working practices
              must balance the need for access with the risks of working near live equipment.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Safe Survey Hierarchy</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Best:</strong> Scan through IR viewing windows — no cover removal, no arc flash risk, maintains IP rating</li>
                <li className="pl-1"><strong>Acceptable:</strong> Remove covers under a safe system of work with appropriate arc-rated PPE, risk assessment and competent person supervision</li>
                <li className="pl-1"><strong>Worst:</strong> Scanning with covers on — limited value as covers block IR radiation (only useful for surface temperature of the enclosure)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Arc Flash Protection</p>
              <p className="text-sm text-white">
                When covers are removed from live equipment, the surveyor must wear arc-rated PPE
                appropriate for the prospective incident energy level. This typically includes: arc-rated
                face shield and balaclava, arc-rated shirt and trousers (or coverall), insulated gloves
                with leather protectors, and safety footwear. The arc flash boundary must be established
                and non-essential personnel excluded. A second person should be present to act as safety
                observer.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Understanding the application and limitations of thermographic
              inspection is part of the condition monitoring knowledge required for maintenance technicians.
              You should be able to explain when and why thermographic surveys are carried out and how the
              results inform maintenance decisions.
            </p>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Severity Classification</p>
                <ul className="space-y-0.5">
                  <li>ΔT &lt;10°C — Monitor at next survey</li>
                  <li>ΔT 10-35°C — Plan repair at next window</li>
                  <li>ΔT 35-75°C — Urgent repair required</li>
                  <li>ΔT &gt;75°C — Immediate action / shutdown</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Survey Requirements</p>
                <ul className="space-y-0.5">
                  <li>Equipment energised, minimum 40% load</li>
                  <li>Record ambient temp, load %, emissivity</li>
                  <li>Arc flash PPE if covers removed</li>
                  <li>IR windows preferred where available</li>
                  <li>BS EN 16714 standard framework</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Visual and Sensory Inspection
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section2-3">
              Next: Vibration Analysis
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule4Section2_2;
