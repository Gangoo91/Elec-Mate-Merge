import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Emergency Lighting Systems - MOET Module 3.4.2";
const DESCRIPTION = "Comprehensive guide to emergency lighting systems for maintenance technicians: BS 5266, maintained and non-maintained systems, central battery and self-contained, testing requirements, logbook recording, common faults and battery replacement under ST1426.";

const quickCheckQuestions = [
  {
    id: "maintained-vs-non",
    question: "What is the key difference between a maintained and a non-maintained emergency luminaire?",
    options: [
      "Maintained luminaires are more expensive",
      "Maintained luminaires operate continuously; non-maintained only operate when the mains supply fails",
      "Non-maintained luminaires have larger batteries",
      "Maintained luminaires do not require testing"
    ],
    correctIndex: 1,
    explanation: "A maintained emergency luminaire operates continuously — the lamp is always illuminated whether the mains supply is present or not. A non-maintained luminaire only illuminates when the normal mains supply fails. Maintained luminaires are required in areas such as toilets, cinemas, and places of entertainment where sudden darkness would cause panic."
  },
  {
    id: "duration-requirement",
    question: "What is the minimum emergency lighting duration required for most premises under BS 5266?",
    options: [
      "30 minutes",
      "1 hour",
      "2 hours",
      "3 hours"
    ],
    correctIndex: 2,
    explanation: "BS 5266-1 requires a minimum of 3 hours duration for most premises, particularly sleeping accommodation and premises that cannot be evacuated immediately. A 1-hour duration is only permitted where the premises can be evacuated immediately and are not used for sleeping, and where the premises will not be reoccupied until the system has fully recharged."
  },
  {
    id: "monthly-test",
    question: "What is the purpose of the monthly functional test on emergency lighting?",
    options: [
      "To verify the full rated duration of the batteries",
      "To confirm that each luminaire illuminates correctly when the mains supply is simulated to fail",
      "To measure the lux levels on escape routes",
      "To check the wiring insulation resistance"
    ],
    correctIndex: 1,
    explanation: "The monthly functional test (also called a 'flick test') is a brief test to confirm that each emergency luminaire operates correctly when the mains supply is interrupted. The test should be long enough to confirm operation but not so long as to significantly discharge the batteries — typically a few seconds to a few minutes depending on the system."
  },
  {
    id: "annual-test",
    question: "During the annual full-duration test, for how long must a 3-hour rated emergency lighting system be tested?",
    options: [
      "1 hour",
      "2 hours",
      "3 hours (the full rated duration)",
      "30 minutes"
    ],
    correctIndex: 2,
    explanation: "The annual full-duration test requires the emergency lighting system to operate on battery power for the full rated duration — 3 hours for a 3-hour system. At the end of this period, each luminaire must still be providing adequate illumination. After the test, the system must be allowed to fully recharge (typically 24 hours) before the premises are occupied."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under BS 5266-1, what is the minimum illuminance required on the centre line of an escape route?",
    options: [
      "0.2 lux",
      "0.5 lux",
      "1 lux",
      "5 lux"
    ],
    correctAnswer: 2,
    explanation: "BS 5266-1 requires a minimum of 1 lux on the centre line of an escape route (measured at floor level). The central band, which is not less than half the width of the route, must be illuminated to at least 50% of this value. Additionally, the ratio of maximum to minimum illuminance on the centre line must not exceed 40:1 to avoid excessive bright and dark spots."
  },
  {
    id: 2,
    question: "In a self-contained emergency luminaire, where is the battery located?",
    options: [
      "In a central plant room",
      "Within or immediately adjacent to the luminaire itself",
      "In the distribution board",
      "In a dedicated battery cabinet on each floor"
    ],
    correctAnswer: 1,
    explanation: "Self-contained emergency luminaires have the battery, charger and control electronics built into or immediately adjacent to the luminaire. Each unit is independent. This is the most common arrangement for small to medium-sized installations. The advantage is simplicity; the disadvantage is that each battery must be individually maintained and replaced."
  },
  {
    id: 3,
    question: "A central battery system for emergency lighting typically uses which monitoring arrangement?",
    options: [
      "No monitoring is required",
      "Manual weekly checks only",
      "A centralised monitoring panel with fault indication for each circuit",
      "Individual test buttons on each luminaire"
    ],
    correctAnswer: 2,
    explanation: "Central battery systems typically incorporate a centralised monitoring panel that provides indication of mains supply status, battery condition, charger operation, earth faults and individual circuit monitoring. This allows faults to be identified quickly and reduces the manual inspection burden compared to self-contained systems."
  },
  {
    id: 4,
    question: "Which of the following areas would typically require maintained emergency lighting?",
    options: [
      "A general office during normal working hours",
      "A warehouse storage area",
      "A cinema auditorium",
      "An external car park"
    ],
    correctAnswer: 2,
    explanation: "Maintained emergency lighting is required in areas where sudden darkness would cause particular danger or panic. Cinemas, theatres, and places of entertainment are the classic example — the normal lighting may be dimmed or off during a performance, so the emergency lighting must be maintained (always on) to ensure immediate illumination if evacuation is required. Toilets in public buildings also typically require maintained fittings."
  },
  {
    id: 5,
    question: "What is the typical recharge time required for emergency lighting batteries after a full-duration test?",
    options: [
      "4 hours",
      "12 hours",
      "24 hours",
      "48 hours"
    ],
    correctAnswer: 2,
    explanation: "After a full-duration discharge test, emergency lighting batteries typically require 24 hours to fully recharge. During this recharge period, the emergency lighting system may not be able to provide the full rated duration if a mains failure occurs. This is why full-duration tests should be planned carefully and the responsible person must ensure the premises are not occupied without adequate emergency lighting cover."
  },
  {
    id: 6,
    question: "Emergency lighting must be provided at all of the following locations EXCEPT:",
    options: [
      "Changes of direction on escape routes",
      "At each exit door",
      "Near fire alarm call points and fire-fighting equipment",
      "In every room with windows providing natural light"
    ],
    correctAnswer: 3,
    explanation: "BS 5266-1 requires emergency lighting at specific locations including escape route changes of direction, at each exit door, near fire alarm call points and fire-fighting equipment, at stairways, at changes of floor level, and at final exits. Emergency lighting is NOT required in every room with windows — the requirement is based on the escape route and high-risk areas."
  },
  {
    id: 7,
    question: "What is an 'open area' or 'anti-panic' emergency luminaire designed to achieve?",
    options: [
      "Maximum light output for CCTV operation",
      "Illumination to prevent panic and enable safe movement towards escape routes",
      "Decorative lighting effect during mains failure",
      "Spotlighting of fire exits only"
    ],
    correctAnswer: 1,
    explanation: "Open area (anti-panic) emergency lighting provides illumination in large open areas to prevent panic and enable occupants to identify and reach escape routes. BS 5266-1 requires a minimum of 0.5 lux at floor level across the open area, excluding a 0.5 m border around the perimeter. This is particularly important in spaces such as open-plan offices, retail floors and reception areas."
  },
  {
    id: 8,
    question: "NiCd (nickel-cadmium) batteries in emergency luminaires are being phased out in favour of:",
    options: [
      "Lead-acid batteries",
      "NiMH (nickel-metal hydride) and LiFePO4 (lithium iron phosphate) batteries",
      "Zinc-carbon batteries",
      "Alkaline batteries"
    ],
    correctAnswer: 1,
    explanation: "NiCd batteries contain cadmium, which is toxic and restricted under the EU Battery Directive and WEEE Regulations. NiMH (nickel-metal hydride) and LiFePO4 (lithium iron phosphate) batteries are the preferred replacements. LiFePO4 batteries offer longer life, lighter weight, better high-temperature performance and are cadmium-free. NiMH batteries are also cadmium-free and widely available."
  },
  {
    id: 9,
    question: "Under BS 5266, who is responsible for ensuring emergency lighting is properly maintained and tested?",
    options: [
      "The local fire brigade",
      "The building's responsible person (employer, owner or occupier)",
      "The emergency lighting manufacturer",
      "The electrical contractor who installed the system"
    ],
    correctAnswer: 1,
    explanation: "The Regulatory Reform (Fire Safety) Order 2005 places the duty on the 'responsible person' — typically the employer, owner or occupier of the premises. They must ensure the emergency lighting system is properly maintained, tested and recorded. They may delegate the testing to a competent person (e.g., a maintenance technician or specialist contractor) but the legal responsibility remains with the responsible person."
  },
  {
    id: 10,
    question: "A high-risk task area emergency luminaire must provide a minimum illuminance of:",
    options: [
      "0.5 lux",
      "1 lux",
      "5 lux",
      "10% of the normal maintained illuminance or 15 lux, whichever is greater"
    ],
    correctAnswer: 3,
    explanation: "BS 5266-1 requires that high-risk task areas are illuminated to at least 10% of the normal maintained illuminance or 15 lux (whichever is greater) during an emergency. This ensures that potentially dangerous processes can be safely shut down. The illuminance must be achieved within 0.5 seconds of mains failure. Examples include machinery areas, chemical processing and switchrooms."
  },
  {
    id: 11,
    question: "When recording emergency lighting test results, which of the following must be documented?",
    options: [
      "Only failures — passed tests do not need recording",
      "The date of test, type of test, any defects found and remedial action taken",
      "Only the name of the person who carried out the test",
      "Only the date and a pass/fail result"
    ],
    correctAnswer: 1,
    explanation: "BS 5266-1 requires comprehensive records of all emergency lighting tests. The log book must include: the date of each test, the type of test (monthly functional or annual full-duration), the results of the test, details of any defects found, remedial action taken, and the date the remedial work was completed. This log book must be available for inspection by the enforcing authority."
  },
  {
    id: 12,
    question: "What is the purpose of the 'fish-tail' or directional lens on an emergency exit sign luminaire?",
    options: [
      "To increase the brightness of the sign",
      "To direct the light output towards the floor below the sign",
      "To ensure the sign is visible from the required viewing distance and angle",
      "To reduce energy consumption"
    ],
    correctAnswer: 2,
    explanation: "The directional lens on an emergency exit sign luminaire is designed to ensure the sign is visible from the required viewing distance and angle. BS 5266 specifies viewing distances based on sign size — typically the viewing distance should not exceed 200 times the height of the sign for externally illuminated signs, or specific distances based on the luminance for internally illuminated signs."
  }
];

const faqs = [
  {
    question: "How do I know if a building needs 1-hour or 3-hour emergency lighting?",
    answer: "BS 5266-1 requires 3-hour duration for sleeping accommodation (hotels, hospitals, care homes) and premises that cannot be immediately evacuated and reoccupied. A 1-hour duration is only acceptable where the premises can be evacuated immediately, are not used for sleeping, and will not be reoccupied until the system has fully recharged (typically 24 hours). In practice, most new installations specify 3-hour duration to provide the greatest flexibility and safety margin."
  },
  {
    question: "Can I use an automatic test system instead of manual testing?",
    answer: "Yes — BS 5266-1 recognises automatic test systems (ATS) as an acceptable alternative to manual testing. ATS can perform both monthly functional tests and annual duration tests automatically, and record the results electronically. However, a visual inspection of the installation must still be carried out periodically to check for physical damage, blocked luminaires, or changes to the building layout that may require additional emergency lighting."
  },
  {
    question: "What is the difference between 'sustained' and 'maintained' emergency lighting?",
    answer: "The terminology can be confusing. Under BS EN 1838: 'Maintained' means the luminaire operates at all times — both on mains and on battery. 'Non-maintained' means the luminaire operates only when the mains fails. 'Sustained' is sometimes used to describe a luminaire with two lamps — one for normal lighting and one for emergency lighting — but this term is not formally defined in BS 5266 and its use is discouraged in favour of 'maintained' and 'non-maintained'."
  },
  {
    question: "How do I replace the battery in a self-contained emergency luminaire?",
    answer: "Isolate the supply to the luminaire and confirm dead. Open the luminaire and locate the battery pack — this is typically a NiCd, NiMH or LiFePO4 pack with a plug-in connector. Disconnect the old battery and connect the new replacement — ensure the voltage, capacity (Ah) and connector type match the original specification. After replacement, the luminaire should be left on charge for at least 24 hours before testing. Dispose of the old battery through a WEEE-compliant recycling route."
  },
  {
    question: "What happens if emergency lighting fails during a fire risk assessment inspection?",
    answer: "If the enforcing authority (typically the local fire and rescue service) finds that emergency lighting is defective or inadequately maintained during an inspection under the Regulatory Reform (Fire Safety) Order 2005, they can issue an enforcement notice requiring remedial action within a specified period, or in serious cases, a prohibition notice preventing use of the premises until the deficiency is rectified. The responsible person may also face prosecution and fines."
  }
];

const MOETModule3Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 3.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Emergency Lighting Systems
          </h1>
          <p className="text-white/80">
            BS 5266 compliance, system types, testing requirements and maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Maintained:</strong> Always on — non-maintained: battery only on mains failure</li>
              <li className="pl-1"><strong>Duration:</strong> 1 hour or 3 hours depending on premises use</li>
              <li className="pl-1"><strong>Testing:</strong> Monthly functional + annual full-duration (BS 5266)</li>
              <li className="pl-1"><strong>Escape routes:</strong> Minimum 1 lux on centre line at floor level</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Regulatory Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>BS 5266-1:</strong> Code of practice for emergency lighting</li>
              <li className="pl-1"><strong>BS EN 1838:</strong> Lighting applications — emergency lighting</li>
              <li className="pl-1"><strong>RRO 2005:</strong> Fire Safety Order — responsible person duties</li>
              <li className="pl-1"><strong>ST1426:</strong> Test, maintain and record emergency lighting systems</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the difference between maintained and non-maintained emergency lighting",
              "Compare central battery and self-contained emergency lighting systems",
              "State the duration requirements under BS 5266-1 for different premises types",
              "Describe monthly functional and annual full-duration testing procedures",
              "Identify common faults in emergency lighting systems and their remedies",
              "Explain the logbook recording requirements for emergency lighting"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01: Emergency Lighting Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Emergency Lighting Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency lighting is a critical life safety system designed to provide illumination when the
              normal mains lighting fails. Its primary purpose is to enable safe evacuation of a building
              during a mains supply failure, which may coincide with a fire, explosion or other emergency.
              The legal requirement for emergency lighting derives from the Regulatory Reform (Fire Safety)
              Order 2005 (England and Wales), which requires the responsible person to ensure that routes
              to emergency exits and the exits themselves are equipped with emergency lighting.
            </p>
            <p>
              BS 5266-1 is the primary code of practice for emergency lighting in the UK, setting out the
              design, installation, wiring, testing and maintenance requirements. BS EN 1838 specifies the
              photometric requirements — the minimum illuminance levels that must be achieved. Together,
              these standards form the basis for all emergency lighting installations and maintenance
              programmes.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Emergency Lighting</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Escape route lighting:</strong> Illuminates defined escape routes to enable safe and effective evacuation. Minimum 1 lux on centre line at floor level. Uniformity ratio max 40:1</li>
                <li className="pl-1"><strong>Open area (anti-panic) lighting:</strong> Illuminates large open areas to prevent panic and enable safe movement towards escape routes. Minimum 0.5 lux at floor level</li>
                <li className="pl-1"><strong>High-risk task area lighting:</strong> Illuminates areas where potentially dangerous processes must be safely shut down. Minimum 10% of normal illuminance or 15 lux (whichever is greater)</li>
                <li className="pl-1"><strong>Standby lighting:</strong> Enables normal activities to continue during a mains failure (e.g., hospital operating theatres). Not strictly 'emergency' lighting but often part of the same system</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintained vs Non-Maintained</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Non-maintained:</strong> The emergency lamp is OFF during normal conditions and only illuminates when the mains supply fails. The battery is continuously charged while the mains is available. Most common type in commercial premises</li>
                <li className="pl-1"><strong>Maintained:</strong> The emergency lamp is ON at all times — during normal mains operation and during mains failure. Required in areas where the normal lighting may be dimmed or extinguished (cinemas, theatres) or in toilets and other areas with limited natural light</li>
                <li className="pl-1"><strong>Combined non-maintained:</strong> The luminaire has two lamps — one for normal lighting (mains-powered) and one for emergency lighting (battery-backed). The emergency lamp only operates on mains failure</li>
                <li className="pl-1"><strong>Combined maintained:</strong> The luminaire has two lamps — one for normal lighting and one that operates continuously. Both provide light during normal conditions; only the emergency lamp operates during mains failure</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The choice between maintained and non-maintained depends on the use
              of the space. As a maintenance technician, you must be able to identify the type of each
              luminaire and ensure the correct operation mode is maintained.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: System Types */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Central Battery vs Self-Contained Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency lighting systems are broadly classified by their power source arrangement: self-contained
              systems where each luminaire has its own battery, and central battery systems where a single
              battery installation supplies multiple luminaires. Each approach has distinct advantages and
              implications for maintenance.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Self-Contained Systems</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Battery, charger and control circuit within each luminaire</li>
                  <li className="pl-1">Simple wiring — connected to normal lighting circuit (permanent live)</li>
                  <li className="pl-1">No additional wiring for emergency supply</li>
                  <li className="pl-1">Each unit independent — failure affects only that luminaire</li>
                  <li className="pl-1">Battery replacement required every 3-5 years (typical)</li>
                  <li className="pl-1">Individual test buttons or remote test facility</li>
                  <li className="pl-1">Best suited for small to medium installations</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Central Battery Systems</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Single battery installation in a dedicated plant room</li>
                  <li className="pl-1">Dedicated emergency lighting wiring to each luminaire</li>
                  <li className="pl-1">Centralised monitoring and fault indication</li>
                  <li className="pl-1">Easier battery maintenance (single location)</li>
                  <li className="pl-1">Higher initial cost but lower long-term maintenance</li>
                  <li className="pl-1">Battery failure affects all connected luminaires</li>
                  <li className="pl-1">Best suited for large commercial and industrial installations</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Battery Types in Emergency Lighting</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>NiCd (Nickel-Cadmium):</strong> Historically the most common. Good high-temperature performance. Being phased out due to cadmium toxicity (EU Battery Directive)</li>
                <li className="pl-1"><strong>NiMH (Nickel-Metal Hydride):</strong> Cadmium-free replacement for NiCd. Similar performance characteristics. Widely used in current self-contained luminaires</li>
                <li className="pl-1"><strong>LiFePO4 (Lithium Iron Phosphate):</strong> Longer life (8-10+ years), lighter weight, better high-temperature tolerance. Increasingly the preferred choice for new installations</li>
                <li className="pl-1"><strong>Lead-acid (VRLA):</strong> Used in central battery systems. Lower cost per Ah but heavier, shorter life, and temperature-sensitive. Requires ventilation for hydrogen gas</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Wiring Considerations</p>
              <p className="text-sm text-white">
                Self-contained emergency luminaires require a permanent live supply (not switched) to keep the
                battery charger energised. This is critical — if the luminaire is connected to a switched circuit,
                turning off the light switch will discharge the battery, and the luminaire will not operate when
                needed. Central battery systems require dedicated fire-resistant cabling (typically to BS 8519 or
                BS 7629) from the central battery to each emergency luminaire, as the wiring must survive long
                enough to maintain the emergency lighting during a fire.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> When maintaining self-contained luminaires, always verify that
              the permanent live supply is present at each fitting. A common fault is incorrect connection to
              a switched live, which means the battery is only being charged when the normal lighting is on.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Testing Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Testing and Recording Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regular testing of emergency lighting is a legal requirement under the Regulatory Reform (Fire
              Safety) Order 2005 and is essential to ensure the system will perform when needed. BS 5266-1
              sets out a clear testing regime that includes daily visual checks, monthly functional tests and
              annual full-duration tests. All test results must be recorded in a log book.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Lighting Test Schedule (BS 5266-1)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Test Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Duration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What to Check</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Daily visual check</td>
                      <td className="border border-white/10 px-3 py-2">Daily</td>
                      <td className="border border-white/10 px-3 py-2">N/A</td>
                      <td className="border border-white/10 px-3 py-2">Indicator lights showing correct operation and charging</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Monthly functional test</td>
                      <td className="border border-white/10 px-3 py-2">Monthly</td>
                      <td className="border border-white/10 px-3 py-2">Brief (sufficient to confirm operation)</td>
                      <td className="border border-white/10 px-3 py-2">Each luminaire illuminates; correct operation of changeover; indicator status</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Annual full-duration test</td>
                      <td className="border border-white/10 px-3 py-2">Annually</td>
                      <td className="border border-white/10 px-3 py-2">Full rated duration (1 hr or 3 hr)</td>
                      <td className="border border-white/10 px-3 py-2">Luminaires still illuminated at end of period; sign visibility; adequate illuminance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Monthly Functional Test Procedure</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Simulate mains failure by operating the test switch (local test button, key switch, or remote test facility)</li>
                <li className="pl-1">Confirm each emergency luminaire and exit sign illuminates correctly</li>
                <li className="pl-1">Check the changeover device operates correctly (the luminaire should switch from mains to battery)</li>
                <li className="pl-1">Restore mains supply and confirm luminaires return to normal mode</li>
                <li className="pl-1">Check charging indicator returns to normal (green LED in most self-contained fittings)</li>
                <li className="pl-1">Record results in the log book — including any failures and remedial actions</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Annual Full-Duration Test Procedure</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Plan the test to minimise risk — ensure the building can be safely evacuated during the test period</li>
                <li className="pl-1">Simulate mains failure and allow the system to run on battery for the full rated duration (1 or 3 hours)</li>
                <li className="pl-1">At the end of the rated period, check that each luminaire is still providing adequate illumination</li>
                <li className="pl-1">Record any luminaires that have failed or dimmed significantly before the end of the test</li>
                <li className="pl-1">Restore mains supply and allow the system to fully recharge (typically 24 hours)</li>
                <li className="pl-1">Ensure the premises are not left without adequate emergency lighting cover during the recharge period</li>
                <li className="pl-1">Record all results in the log book, including any remedial actions required</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Log Book Requirements</p>
              <p className="text-sm text-white">
                The emergency lighting log book is a legal document and must be kept up to date and available
                for inspection. It must contain: a certificate of completion for the initial installation; details
                of all luminaires (location, type, lamp, battery); a schedule of tests; records of all tests
                carried out (date, type, results, defects, remedial action); records of all maintenance and
                battery replacements; and any alterations or additions to the system. The log book must be
                retained for the life of the installation.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Automatic test systems (ATS) can automate monthly and annual testing,
              but a visual inspection is still required periodically to check for physical damage, obscured
              luminaires, and changes to the building layout.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Common Faults and Battery Replacement */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Common Faults and Battery Replacement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency lighting faults must be treated as urgent — a non-functional emergency luminaire
              represents a direct life safety risk. Maintenance technicians must be able to quickly diagnose
              common faults and carry out repairs, particularly battery replacement, which is the most
              frequent maintenance task on self-contained systems.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Faults in Self-Contained Luminaires</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Battery failure:</strong> The most common fault. Batteries have a finite life (3-5 years for NiCd/NiMH, 8-10+ years for LiFePO4). Symptoms: luminaire does not illuminate on test, or duration is reduced</li>
                <li className="pl-1"><strong>Lamp failure:</strong> LED modules can fail. Symptoms: no light output despite battery being charged</li>
                <li className="pl-1"><strong>Charger failure:</strong> The internal charger stops working. Symptoms: battery not charging (indicated by warning LED), luminaire may work briefly but fails full-duration test</li>
                <li className="pl-1"><strong>Incorrect wiring:</strong> Connected to switched live instead of permanent live. Symptoms: battery only charges when normal lighting is on</li>
                <li className="pl-1"><strong>Driver/inverter failure:</strong> The electronic driver that powers the LED from the battery fails. Symptoms: battery charges but lamp does not illuminate on test</li>
                <li className="pl-1"><strong>Physical damage:</strong> Impact damage to the luminaire body, diffuser, or internal components</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Faults in Central Battery Systems</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Battery degradation:</strong> Lead-acid batteries lose capacity over time. Individual cells may fail, reducing overall voltage</li>
                <li className="pl-1"><strong>Charger failure:</strong> Rectifier or charger control board failure. Symptoms: battery voltage dropping, charging fault alarm</li>
                <li className="pl-1"><strong>Earth fault on emergency circuit:</strong> Insulation breakdown on the dedicated emergency wiring. Detected by earth fault monitoring</li>
                <li className="pl-1"><strong>Changeover relay failure:</strong> The relay that switches luminaires from mains to battery supply fails. Symptoms: luminaires do not switch to battery on mains failure</li>
                <li className="pl-1"><strong>Circuit protection failure:</strong> MCBs or fuses on emergency lighting circuits tripping or blowing</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Battery Replacement Procedure (Self-Contained)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Isolate the mains supply to the luminaire and confirm dead</li>
                <li className="pl-1"><strong>Step 2:</strong> Open the luminaire housing and locate the battery pack</li>
                <li className="pl-1"><strong>Step 3:</strong> Disconnect the old battery (note the connector type and polarity)</li>
                <li className="pl-1"><strong>Step 4:</strong> Verify the replacement battery matches — voltage (V), capacity (Ah), connector type, physical size</li>
                <li className="pl-1"><strong>Step 5:</strong> Connect the new battery and secure it within the housing</li>
                <li className="pl-1"><strong>Step 6:</strong> Close the luminaire and restore the mains supply</li>
                <li className="pl-1"><strong>Step 7:</strong> Verify the charging indicator shows normal charging</li>
                <li className="pl-1"><strong>Step 8:</strong> Allow 24 hours charging before functional testing</li>
                <li className="pl-1"><strong>Step 9:</strong> Dispose of the old battery through WEEE-compliant recycling</li>
                <li className="pl-1"><strong>Step 10:</strong> Record the replacement in the emergency lighting log book</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires you to maintain and
              test emergency lighting systems, identify faults, carry out repairs, and maintain accurate records.
              Emergency lighting is one of the most commonly assessed areas in the end-point assessment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* FAQs */}
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: General Lighting Circuits
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section4-3">
              Next: Socket Outlet and Small Power
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section4_2;