import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Radio, Cpu, Activity, Eye, Thermometer, Waves, Settings, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "conventional-vs-addressable",
    question: "What is the key difference between conventional and addressable fire detection systems?",
    options: [
      "Conventional systems use wireless detectors whilst addressable systems use wired detectors",
      "Addressable systems identify the exact individual detector in alarm, conventional systems identify the zone only",
      "Conventional systems are more expensive than addressable systems",
      "Addressable systems can only be used in domestic premises"
    ],
    correctIndex: 1,
    explanation: "The fundamental difference is in device identification. In a conventional system, when a detector activates, the control panel can only identify which zone (group of detectors on a shared circuit) is in alarm — a fire warden must then physically search the zone to locate the fire. In an addressable system, every detector has a unique address, so the panel displays the exact device in alarm, enabling much faster response and pinpointing the fire location immediately."
  },
  {
    id: "bs5839-l1-category",
    question: "Which BS 5839 Part 1 category provides full life safety detection coverage throughout all areas?",
    options: [
      "Category P1",
      "Category L3",
      "Category L1",
      "Category M"
    ],
    correctIndex: 2,
    explanation: "Category L1 provides the highest level of life safety protection. It requires automatic fire detection throughout all areas of the building, including roof voids, ceiling voids, and floor voids. L1 is typically specified for sleeping risk premises such as care homes, hospitals, and HMOs (houses in multiple occupation) where early detection in any area is critical to protect life. The 'L' stands for Life safety, and L1 represents full coverage."
  },
  {
    id: "weekly-alarm-test",
    question: "How often must fire alarm systems receive a weekly test?",
    options: [
      "Monthly — testing one call point per month",
      "Weekly — the same manual call point tested each week",
      "Weekly — a different manual call point tested each week",
      "Daily — every call point tested each day"
    ],
    correctIndex: 2,
    explanation: "BS 5839 Part 1 requires a weekly alarm test using a different manual call point each week. This ensures that over the course of a year, every call point in the building is tested. The test should be carried out at the same time each week so that occupants recognise the test signal and do not confuse it with a genuine alarm. The person conducting the test must confirm that the control panel receives the signal and that the alarm sounders activate throughout the building."
  }
];

const faqs = [
  {
    question: "What is the difference between L2 and L3 category systems?",
    answer: "Category L2 provides automatic fire detection in escape routes plus any rooms or areas that present a high fire risk or open onto escape routes. It goes beyond just protecting escape routes by also covering specific high-risk areas identified in the fire risk assessment — such as kitchens, plant rooms, or storage areas containing flammable materials. Category L3 provides detection only within escape routes themselves (corridors, stairwells, lobbies) to warn occupants that their escape route may be compromised. L3 does not detect fires in rooms until smoke has spread into the escape route. The choice between L2 and L3 depends on the fire risk assessment: L3 may be adequate where room fires are unlikely to grow quickly, but L2 is required where high-risk areas could produce a fast-developing fire that needs early detection before it reaches the escape route."
  },
  {
    question: "Why are ionisation smoke detectors no longer commonly used?",
    answer: "Ionisation smoke detectors contain a small radioactive source (Americium-241) that ionises air within a sensing chamber. Whilst they are very sensitive to fast-flaming fires with small smoke particles, they have several significant drawbacks that have led to their decline. They are prone to false alarms from cooking fumes, steam, dust, and aerosols — leading to alarm fatigue and potentially dangerous 'alarm ignored' behaviour. They are less responsive to slow-smouldering fires that produce larger smoke particles, which are actually the most common type of fire in occupied buildings. The radioactive source creates disposal problems — they cannot be placed in general waste and require specialist handling under the Radioactive Substances Act. From a regulatory and practical standpoint, optical and multi-sensor detectors now provide better all-round performance with fewer false alarms, making ionisation detectors effectively obsolete for new installations in the UK."
  },
  {
    question: "What is VESDA and when would it be used?",
    answer: "VESDA stands for Very Early Smoke Detection Apparatus. It is an aspirating smoke detection system that continuously draws air samples through a network of small-bore pipes into a highly sensitive laser detection chamber. VESDA can detect smoke at extremely low concentrations — far below the threshold of conventional point detectors — providing the earliest possible warning of a developing fire. It is used in environments where very early detection is critical and conventional detectors would be impractical: data centres and server rooms (where even a small fire can cause catastrophic data loss), clean rooms and semiconductor fabrication facilities, heritage buildings and museums (where detectors must be concealed), large open warehouse spaces with high ceilings (where smoke would be too diluted for point detectors), cold storage facilities (where conventional detectors may not function reliably), and telecommunications exchanges. VESDA systems provide multiple alert levels (Alert, Action, Fire 1, Fire 2) allowing a graduated response, and the sampling pipes can be concealed in aesthetically sensitive environments."
  },
  {
    question: "As an electrician installing fire detection, what qualifications do I need?",
    answer: "To install fire detection and alarm systems in the UK, you need specific competence beyond a standard electrical qualification. The industry-recognised route is to hold a relevant qualification such as the FIA (Fire Industry Association) Foundation Certificate in Fire Detection and Alarm or equivalent. BS 5839 Part 1 requires that installation is carried out by a 'competent person' — in practice, this means working for a company certificated by a UKAS-accredited certification body such as BAFE (British Approvals for Fire Equipment) SP203-1. Individual installers should hold or be working towards qualifications such as the FIA Level 3 Certificate in Fire Detection and Alarm Systems, the EAL Level 3 NVQ in Fire Detection and Alarm Systems, or equivalent. Additionally, all fire alarm cabling must comply with BS 5839 and BS 7671, so a solid understanding of both standards is essential. Many insurance companies and enforcing authorities (fire and rescue services) require that fire alarm systems are installed by a third-party certificated company, making BAFE or equivalent certification effectively mandatory for commercial fire alarm work."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In a conventional fire detection system, what level of location information does the control panel provide when a detector activates?",
    options: [
      "The exact room and detector that has activated",
      "The zone in which the activated detector is located",
      "The floor of the building only",
      "No location information — just that a fire has been detected somewhere"
    ],
    correctAnswer: 1,
    explanation: "Conventional fire detection systems organise detectors into zones. When any detector on a zone circuit activates, the control panel identifies that zone — but cannot distinguish which individual detector within the zone has triggered. Zone plans displayed near the panel help fire wardens identify the physical area to investigate. This zone-only identification is a key limitation compared to addressable systems."
  },
  {
    id: 2,
    question: "Which type of smoke detector operates on the light scatter principle?",
    options: [
      "Ionisation smoke detector",
      "Heat detector (rate-of-rise)",
      "Optical smoke detector",
      "Flame detector"
    ],
    correctAnswer: 2,
    explanation: "Optical smoke detectors use the light scatter (or light obscuration) principle. Inside the sensing chamber, an LED emits a beam of light. Under normal conditions, the light does not reach the photodiode sensor. When smoke particles enter the chamber, they scatter the light beam, causing some light to reach the photodiode and triggering the alarm. Optical detectors are particularly effective at detecting slow-smouldering fires that produce larger, visible smoke particles."
  },
  {
    id: 3,
    question: "What does BS 5839 Part 1 Category P1 provide?",
    options: [
      "Detection in escape routes only for life safety",
      "Full automatic fire detection throughout all areas for property protection",
      "Manual call points only with no automatic detection",
      "Detection only in rooms that open onto escape routes"
    ],
    correctAnswer: 1,
    explanation: "Category P1 provides full automatic fire detection throughout all areas of the building for the purpose of property protection. The 'P' categories focus on protecting the building and its contents by detecting fires as early as possible, regardless of whether the area is occupied. P1 requires detection in all areas including voids. P2, by contrast, covers only specific high-risk areas identified in the fire risk assessment. Property protection categories may be specified by insurers to minimise damage and business interruption."
  },
  {
    id: 4,
    question: "How frequently must fire alarm systems be tested under BS 5839 Part 1?",
    options: [
      "Daily — all detectors tested each day",
      "Weekly — a different manual call point each week, with quarterly and annual detector tests",
      "Monthly — all call points tested once per month",
      "Annually — a single comprehensive test once per year"
    ],
    correctAnswer: 1,
    explanation: "BS 5839 Part 1 Section 6 establishes a structured testing and maintenance regime: weekly alarm tests using a different manual call point each week, monthly visual inspections of all devices, quarterly functional testing of 25% of all detectors (ensuring all are tested within a year), and a full annual test and inspection of the entire system. Records of all tests must be maintained in a fire alarm log book."
  },
  {
    id: 5,
    question: "What is the primary advantage of an aspirating smoke detection system (VESDA)?",
    options: [
      "It is the cheapest detection method available",
      "It detects smoke at extremely low concentrations — far earlier than conventional point detectors",
      "It does not require any cabling or power supply",
      "It can extinguish fires automatically"
    ],
    correctAnswer: 1,
    explanation: "VESDA (Very Early Smoke Detection Apparatus) aspirating systems continuously draw air samples through a pipe network into a highly sensitive laser detection chamber. They can detect smoke at concentrations far below the threshold of conventional point detectors, providing the earliest possible warning of a developing fire. This very early detection is critical in environments such as data centres, server rooms, heritage buildings, and clean rooms where even a small fire can cause catastrophic losses."
  },
  {
    id: 6,
    question: "What is the key advantage of analogue-addressable detection over standard addressable detection?",
    options: [
      "Analogue-addressable systems are cheaper to install",
      "Each detector continuously reports analogue values, allowing the panel to use algorithms for threshold decisions, drift compensation, and pre-alarm warnings",
      "Analogue-addressable systems do not require a control panel",
      "Analogue-addressable detectors only work with heat detection"
    ],
    correctAnswer: 1,
    explanation: "In an analogue-addressable system, each detector continuously reports its analogue sensing value (smoke density, temperature) to the control panel, rather than simply reporting an on/off alarm state. The panel uses sophisticated algorithms to determine alarm thresholds, provide pre-alarm warnings, compensate for detector drift (contamination build-up over time), and adjust sensitivity based on time of day. This dramatically reduces false alarms and provides far better system management than standard addressable systems."
  },
  {
    id: 7,
    question: "What type of cable is required for fire alarm system wiring under BS 5839 Part 1?",
    options: [
      "Standard PVC twin and earth cable",
      "Fire-resistant cable complying with BS 5839, such as mineral insulated or fire-retardant rated cable",
      "Any cable rated above 6mm\u00B2 cross-sectional area",
      "Armoured cable with no specific fire rating"
    ],
    correctAnswer: 1,
    explanation: "BS 5839 Part 1 requires that fire alarm cabling must maintain circuit integrity during a fire for a specified period to ensure the system continues to function when it is needed most. This means fire-resistant cables must be used — such as mineral insulated copper cable (MICC), or cables meeting the enhanced fire resistance requirements (e.g. BS 8434-2 Category 2 or equivalent). Standard PVC cables would fail early in a fire, potentially disabling the alarm system before evacuation is complete."
  },
  {
    id: 8,
    question: "During commissioning of a fire alarm system, what is 'cause-and-effect' testing?",
    options: [
      "Testing whether the alarm is loud enough to wake sleeping occupants",
      "Verifying that each input (detector activation, call point operation) produces the correct programmed output (sounder activation, door release, plant shutdown, fire service signal)",
      "Checking that the backup batteries last for 24 hours",
      "Measuring the distance between detectors to confirm correct spacing"
    ],
    correctAnswer: 1,
    explanation: "Cause-and-effect testing is a critical part of commissioning that verifies the system's programmed responses. For every possible input (each detector, each call point, each zone), the commissioning engineer confirms that the correct outputs are produced: the right sounders activate, fire doors release, ventilation systems shut down, lifts return to ground floor, fire shutters close, the monitoring centre receives the correct signal, and any other programmed actions occur. This ensures the system will respond correctly in a real fire scenario. The results are documented in the cause-and-effect matrix."
  }
];

export default function FireSafetyModule3Section2() {
  useSEO({
    title: "Fire Detection Systems | Fire Safety Module 3.2",
    description: "Conventional, addressable, and analogue-addressable fire detection systems. Detector types, BS 5839 Part 1 categories, design, installation, commissioning, maintenance and testing regimes.",
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
            <Link to="../fire-safety-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Radio className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fire Detection Systems
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            System types, detector technologies, BS 5839 Part 1 categories, design principles, installation standards, commissioning, and the maintenance and testing regime
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Early detection</strong> is critical &mdash; smoke fills a room in 2&ndash;3 minutes</li>
              <li><strong>Analogue-addressable</strong> is the industry standard for new installations</li>
              <li><strong>BS 5839 Part 1</strong> governs non-domestic fire detection and alarm systems</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">Key Facts</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>L1:</strong> Full life safety coverage &mdash; all areas including voids</li>
              <li><strong>Weekly test:</strong> Different call point each week, records kept</li>
              <li><strong>Fire-resistant cabling:</strong> Mandatory under BS 5839 Part 1</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose of fire detection and why early warning is critical to life safety",
              "Describe the differences between conventional, addressable, and analogue-addressable systems",
              "Identify the main types of fire detectors and explain when each type should be used",
              "State the BS 5839 Part 1 system categories (L, P, and M) and explain how the fire risk assessment determines the category",
              "Describe the key design and installation requirements for fire detection systems",
              "Explain the commissioning process including cause-and-effect testing",
              "Outline the maintenance and testing regime required by BS 5839 Part 1",
              "Understand the cabling requirements for fire alarm circuits"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Detection System Types Comparison Diagram */}
        <section className="mb-10">
          <div className="bg-white/5 border border-rose-500/30 rounded-xl p-6 sm:p-8">
            <p className="text-sm font-medium text-rose-400 mb-6 text-center">
              Detection System Types Comparison
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-4">
                <p className="text-sm font-semibold text-rose-300 mb-2">Conventional</p>
                <ul className="text-xs text-white/70 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Zone identification only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Two-wire loop per zone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Simple &amp; cost-effective</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Smaller premises</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                <p className="text-sm font-semibold text-amber-300 mb-2">Addressable</p>
                <ul className="text-xs text-white/70 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Individual detector identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Unique address per device</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Faster fault finding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Medium to large premises</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
                <p className="text-sm font-semibold text-green-300 mb-2">Analogue-Addressable</p>
                <ul className="text-xs text-white/70 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Continuous analogue values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Algorithm-based thresholds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Drift compensation &amp; pre-alarm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>Industry standard for new builds</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-center">
              <span className="text-xs sm:text-sm text-rose-300">
                Analogue-addressable systems offer the <strong>lowest false alarm rate</strong> and the <strong>best diagnostic capability</strong> &mdash; they are the standard for all new non-domestic installations
              </span>
            </div>
          </div>
        </section>

        {/* Section 01: Purpose of Fire Detection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            Purpose of Fire Detection
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Early detection saves lives. The purpose of a fire detection system is to identify a fire at the
                earliest possible stage and raise an alarm to enable <strong>safe evacuation of occupants</strong>,
                <strong> summoning of the fire service</strong>, and where possible, <strong>intervention to
                control or extinguish the fire</strong> before it becomes unmanageable.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Every Second Counts</p>
                </div>
                <p className="text-sm text-white/80">
                  Smoke can fill a room in <strong className="text-white">2&ndash;3 minutes</strong>. In a
                  building fire, the time between ignition and conditions becoming unsurvivable can be
                  extraordinarily short. Fire detection systems buy critical time &mdash; time for occupants
                  to escape, for fire doors to contain the spread, and for the fire service to respond.
                  Without automatic detection, a fire in an unoccupied room may go unnoticed until it has
                  grown beyond control.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Detection &rarr; Alarm &rarr; Evacuation Chain</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-rose-500/20 border-2 border-rose-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-rose-400">1</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">Detection</p>
                      <p className="text-xs text-white/60 mt-0.5">Automatic detector or manual call point activates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-rose-500/20 border-2 border-rose-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-rose-400">2</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">Alarm</p>
                      <p className="text-xs text-white/60 mt-0.5">Sounders and visual alarm devices activate throughout the building</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-rose-500/20 border-2 border-rose-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-rose-400">3</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">Evacuation</p>
                      <p className="text-xs text-white/60 mt-0.5">Occupants evacuate via designated escape routes to assembly points</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-rose-500/20 border-2 border-rose-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-rose-400">4</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">Fire Service</p>
                      <p className="text-xs text-white/60 mt-0.5">Signal transmitted to monitoring centre &rarr; fire service dispatched</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Automatic vs Manual Detection</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Automatic detection:</strong> Smoke detectors, heat detectors, flame detectors, and aspirating systems that detect fire products without human intervention &mdash; essential for unoccupied areas and sleeping risk premises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Manual detection:</strong> Manual call points (break glass units) positioned at exits and on escape routes allow anyone discovering a fire to raise the alarm immediately &mdash; every fire alarm system includes manual call points regardless of the level of automatic detection</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Governing Standard:</strong> <strong>BS 5839 Part 1</strong> is
                  the code of practice for the design, installation, commissioning, and maintenance of fire
                  detection and fire alarm systems in non-domestic premises. It provides the framework for
                  system categories, detector selection, siting, cabling, and the ongoing testing regime.
                  Compliance with BS 5839 Part 1 is expected by enforcing authorities and insurers.
                </p>
              </div>

              <p>
                Fire detection forms a critical part of the overall <strong>fire strategy</strong> for a building.
                It works alongside passive fire protection (compartmentation, fire doors, fire stopping),
                active fire suppression (sprinklers), means of escape provisions, and the fire risk assessment
                to create a layered approach to life safety and property protection.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: System Types — Conventional */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            System Types: Conventional
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Conventional fire alarm systems are the simplest and oldest type of automatic fire detection.
                They divide the building into <strong>zones</strong>, with each zone protected by a dedicated
                two-wire circuit (loop) connecting a group of detectors and manual call points in parallel.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">How Conventional Systems Work</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Zone circuits:</strong> Each zone has its own pair of conductors running from the control panel. Detectors are connected in parallel across the zone circuit. When any detector activates, the circuit resistance changes, and the panel identifies that zone as being in alarm.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Zone identification only:</strong> The panel displays which zone is in alarm, but cannot identify which specific detector within that zone has activated. Fire wardens must physically search the zone to locate the fire.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Zone plans:</strong> A zone plan (map showing the physical area covered by each zone) must be displayed adjacent to the control panel so that responding personnel can quickly identify where to investigate.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">End-of-line device:</strong> Each zone circuit terminates with an end-of-line resistor that allows the panel to monitor circuit integrity. If a cable is broken (open circuit), the panel registers a fault.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Advantages and Limitations</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-green-400 mb-2">Advantages</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Simple design and installation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Lower equipment cost</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Straightforward fault finding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                        <span>Suitable for small premises</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-400 mb-2">Limitations</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>No individual detector identification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>Longer fire investigation time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>Limited diagnostic capability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>More cabling required for large buildings</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Practical Note:</strong> Conventional systems are still
                  found in many existing buildings and smaller premises. As an electrician, you must understand
                  how they work for maintenance and modification purposes, even though new installations
                  predominantly use addressable or analogue-addressable technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: System Types — Addressable */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            System Types: Addressable
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Addressable fire alarm systems represent a significant advancement over conventional systems.
                The key innovation is that <strong>every device on the loop has a unique digital address</strong>,
                allowing the control panel to identify exactly which detector or call point has activated.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">How Addressable Systems Work</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Unique addresses:</strong> Each detector, call point, sounder, and module on the loop is programmed with a unique address (typically a number). The control panel continuously polls each device in sequence, checking its status.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Exact device identification:</strong> When a detector activates, the panel displays the specific device address and its programmed location text (e.g. &ldquo;Detector 47 &mdash; 2nd Floor Server Room&rdquo;), allowing immediate identification of the fire location without physical searching.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Loop wiring:</strong> Devices are connected on a loop circuit. A single loop can typically support 100&ndash;250 devices depending on the manufacturer. The loop may be wired as a single path or a dual path (Class A) for enhanced resilience &mdash; if a dual-path loop is broken at any point, all devices remain operational via the alternate path.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Fault identification:</strong> The panel can identify exactly which device has a fault, which device is removed, and the nature of the fault &mdash; dramatically reducing maintenance time compared to conventional systems.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Advantage:</strong> The ability to pinpoint the exact
                  location of a fire or fault means faster response times, more efficient maintenance, and
                  reduced investigation time. For medium to large buildings, addressable systems provide
                  significantly better management of the fire alarm system compared to conventional technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: System Types — Analogue-Addressable */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            System Types: Analogue-Addressable
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Analogue-addressable systems are the most advanced and are now the <strong>industry standard for
                all new non-domestic fire alarm installations</strong>. They build upon the addressable concept
                by having each detector continuously report its <strong>analogue sensing value</strong> to the
                control panel, rather than simply reporting an on/off alarm state.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">How Analogue-Addressable Systems Work</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Continuous analogue reporting:</strong> Each detector sends its analogue value (smoke density percentage, temperature reading) to the panel continuously. The panel &mdash; not the detector &mdash; makes the alarm decision based on sophisticated algorithms.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Algorithm-based thresholds:</strong> The panel analyses trends in the analogue data. A gradual increase in smoke density may indicate a real fire developing, whilst a sudden spike may indicate a transient condition (cooking, steam). The panel can distinguish between these patterns to reduce false alarms.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Pre-alarm warnings:</strong> Before reaching the full alarm threshold, the panel can issue pre-alarm (or &ldquo;advisory&rdquo;) signals. This allows staff to investigate a potential developing situation before it reaches alarm level, potentially preventing false alarms and catching real fires even earlier.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Drift compensation:</strong> As detectors age, dust and contamination build up in the sensing chamber, causing the baseline reading to &ldquo;drift&rdquo; upward. The panel automatically compensates for this drift, maintaining consistent sensitivity. When drift exceeds the compensation range, the panel signals that the detector requires cleaning &mdash; a major maintenance advantage.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Day/night sensitivity:</strong> The panel can be programmed with different alarm thresholds for different times of day. For example, a higher sensitivity (lower threshold) at night when the building is unoccupied, and a lower sensitivity (higher threshold) during the day when cooking or industrial processes may generate background smoke.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Why Analogue-Addressable is the Standard</p>
                </div>
                <p className="text-sm text-white/80">
                  The combination of continuous monitoring, intelligent alarm decisions, drift compensation,
                  pre-alarm capability, and day/night flexibility means analogue-addressable systems deliver
                  <strong className="text-white"> significantly fewer false alarms</strong> than any other
                  system type. False alarms waste fire service resources, cause alarm fatigue (occupants
                  ignoring alarms), and disrupt business operations. Reducing false alarms is a key
                  priority for building managers, insurers, and the fire service.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Detector Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Detector Types
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Different fire scenarios produce different fire signatures &mdash; some fires produce
                large volumes of visible smoke, others produce primarily heat, and some produce flames
                with little initial smoke. Selecting the correct detector type for each environment is
                critical to ensuring reliable detection whilst minimising false alarms.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-white">Optical Smoke Detectors</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    The most common type of smoke detector in modern installations. They operate on the
                    <strong className="text-white"> light scatter principle</strong>:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>An LED emits a beam of light inside a sealed sensing chamber</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Under normal conditions, the light does not reach the photodiode sensor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>When smoke enters, particles scatter the light onto the photodiode, triggering the alarm</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Particularly effective at detecting slow-smouldering fires with large visible smoke particles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong className="text-white">Best suited for:</strong> Offices, corridors, bedrooms, storage areas, escape routes</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Ionisation Smoke Detectors (Rarely Used)</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Contain a small <strong className="text-white">radioactive source (Americium-241)</strong> that ionises air in the sensing chamber</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Sensitive to fast-flaming fires producing tiny smoke particles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong className="text-white">Now rarely used:</strong> Prone to false alarms from cooking, steam, and dust; radioactive disposal issues; less effective for smouldering fires; effectively replaced by optical and multi-sensor detectors</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-white">Heat Detectors</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong className="text-white">Fixed temperature:</strong> Activate when the ambient temperature reaches a predetermined threshold (typically 57&deg;C or 90&deg;C). Reliable and false-alarm resistant, but slower to respond than smoke detectors.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong className="text-white">Rate-of-rise:</strong> Activate when the temperature rises faster than a set rate (typically 8&ndash;10&deg;C per minute), regardless of the absolute temperature. Faster response than fixed temperature for developing fires.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong className="text-white">Best suited for:</strong> Kitchens, boiler rooms, garages, workshops, dusty/dirty environments where smoke detectors would false alarm</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Multi-Sensor Detectors</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Combine <strong className="text-white">optical smoke and heat sensing</strong> in a single detector head</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>The combined data provides more reliable detection across a wider range of fire types</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Significantly reduces false alarms compared to single-sensor detectors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong className="text-white">Increasingly specified</strong> as the default detector type in new analogue-addressable installations</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Specialist Detector Types</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong className="text-white">Beam detectors:</strong> Use a projected infrared beam between a transmitter and receiver. When smoke obscures the beam, the alarm triggers. Ideal for large open areas with high ceilings (warehouses, atriums, churches) where point detectors would be impractical due to height and access.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong className="text-white">Aspirating systems (VESDA):</strong> Very Early Smoke Detection Apparatus. Draws air through a network of sampling pipes into a highly sensitive laser detection chamber. Detects smoke at extremely low concentrations &mdash; used in data centres, server rooms, clean rooms, heritage buildings, and cold stores.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong className="text-white">Flame detectors:</strong> Detect the infrared (IR) and/or ultraviolet (UV) radiation emitted by flames. Used in outdoor environments, fuel storage areas, and industrial processes where smoke may be dispersed by wind before reaching a conventional detector.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span><strong className="text-white">Linear heat detection:</strong> A heat-sensitive cable that detects temperature rise along its entire length. Used in cable tunnels, conveyor systems, car parks, and areas where the fire location cannot be predicted. The cable can span hundreds of metres, providing continuous coverage.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Detector Selection:</strong> The choice of detector type
                  for each location must be based on the <strong>environment</strong> (dusty, steamy, clean,
                  outdoor), the <strong>expected fire type</strong> (smouldering, flaming, fast-developing),
                  the <strong>ceiling height</strong>, and the <strong>risk of false alarms</strong>. The fire
                  risk assessment and the system designer determine the appropriate detector type for each area.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: BS 5839 Part 1 Categories */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            BS 5839 Part 1 Categories
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                BS 5839 Part 1 defines a system of <strong>categories</strong> that describe the extent
                of fire detection coverage in a building. The categories are divided into three groups:
                <strong> L (Life safety)</strong>, <strong>P (Property protection)</strong>, and
                <strong> M (Manual only)</strong>. The fire risk assessment determines which category
                is appropriate for a given building.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">L Categories &mdash; Life Safety</p>
                <div className="space-y-3">
                  <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-3">
                    <p className="text-sm font-semibold text-rose-300">L1 &mdash; Full Coverage (All Areas)</p>
                    <p className="text-xs text-white/70 mt-1">Automatic fire detection installed throughout all areas of the building, including roof voids, ceiling voids, and floor voids. Provides the highest level of life safety. Typically required for sleeping risk premises (care homes, hospitals, HMOs).</p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-3">
                    <p className="text-sm font-semibold text-rose-300">L2 &mdash; Escape Routes + High Fire Risk Areas</p>
                    <p className="text-xs text-white/70 mt-1">Detection in all escape routes plus any areas that present a high fire risk or open onto escape routes. Goes beyond just escape route protection. The specific areas covered are determined by the fire risk assessment.</p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-3">
                    <p className="text-sm font-semibold text-rose-300">L3 &mdash; Escape Routes Only</p>
                    <p className="text-xs text-white/70 mt-1">Detection only within escape routes (corridors, stairwells, lobbies) to give early warning that an escape route may be compromised by smoke or fire. Does not detect fires in rooms until smoke reaches the escape route.</p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-3">
                    <p className="text-sm font-semibold text-rose-300">L4 &mdash; Within Escape Routes Only</p>
                    <p className="text-xs text-white/70 mt-1">Detection only within the circulation areas that form escape routes. Similar to L3 but with a more limited scope, typically used where the risk assessment shows that fires are unlikely to develop rapidly.</p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-3">
                    <p className="text-sm font-semibold text-rose-300">L5 &mdash; Engineered System</p>
                    <p className="text-xs text-white/70 mt-1">A bespoke system designed to a specific fire engineering strategy. Coverage is determined by fire engineering analysis rather than prescriptive category rules. Used in complex buildings where standard categories do not provide the most appropriate solution.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">P Categories &mdash; Property Protection</p>
                <div className="space-y-3">
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                    <p className="text-sm font-semibold text-amber-300">P1 &mdash; Full Property Protection</p>
                    <p className="text-xs text-white/70 mt-1">Automatic fire detection throughout all areas for the purpose of protecting the building and its contents. Often specified by insurers to minimise damage and business interruption. Detection coverage mirrors L1 but the primary objective is property rather than life.</p>
                  </div>
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                    <p className="text-sm font-semibold text-amber-300">P2 &mdash; Specific Areas Only</p>
                    <p className="text-xs text-white/70 mt-1">Detection in specific areas identified as high value or high risk by the fire risk assessment or insurance requirements. Does not require full building coverage. Areas typically include server rooms, archive stores, high-value stock areas, and plant rooms.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">M Category &mdash; Manual Only</p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <p className="text-sm font-semibold text-white">M &mdash; Manual Call Points Only</p>
                  <p className="text-xs text-white/70 mt-1">No automatic detection. The system consists of manual call points (break glass units) only, positioned at exits and on escape routes. Relies entirely on human discovery and manual activation of the alarm. Used where automatic detection is not required by the risk assessment &mdash; typically small, simple, single-storey premises with good visibility and low fire loading.</p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">How the Category is Determined:</strong> The fire risk
                  assessment (required under the Regulatory Reform (Fire Safety) Order 2005) determines
                  the appropriate system category. Factors include the building use, occupancy type (sleeping
                  vs non-sleeping), occupant vulnerability, building size and complexity, escape route
                  design, fire loading, and compartmentation. The responsible person (duty holder) must
                  ensure the system category meets the level identified in the fire risk assessment.
                  Insurers may require higher categories for property protection purposes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Design, Installation & Commissioning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">07</span>
            Design, Installation &amp; Commissioning
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The design and installation of a fire detection system must comply with <strong>BS 5839
                Part 1</strong> and the cabling must also comply with <strong>BS 7671</strong> (the IET
                Wiring Regulations). Correct siting of detectors, appropriate cabling, and thorough
                commissioning are all essential to ensure the system performs reliably when needed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Detector Siting Rules</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Ceiling mounting:</strong> Detectors should be mounted on the ceiling, as smoke and heat rise and accumulate at the highest point. Wall mounting is only acceptable in specific circumstances and with increased sensitivity settings.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Spacing:</strong> Maximum spacing depends on room height and detector type. For flat ceilings up to 10.5m, optical smoke detectors are typically spaced at a maximum of 7.5m centres, giving a maximum coverage area of 100m&sup2; per detector. Higher ceilings require closer spacing or specialist detectors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Dead spots:</strong> Avoid positioning detectors near corners, junctions of walls and ceilings, or close to beams where air movement is restricted and smoke may not reach the detector. A minimum distance of 500mm from any wall or obstruction is the general rule.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Air movement:</strong> Avoid siting detectors directly adjacent to air conditioning outlets, ventilation diffusers, or extract grilles where air movement may dilute or deflect smoke away from the sensing element.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Cabling Requirements</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Fire-resistant cables:</strong> BS 5839 Part 1 requires fire alarm cables to maintain circuit integrity during a fire. This means fire-resistant cable must be used &mdash; either mineral insulated copper cable (MICC) or cables meeting enhanced fire resistance standards (e.g. BS 8434-2 Category 2).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Cable segregation:</strong> Fire alarm cables must be segregated from mains power cables. Where they must cross, they should do so at right angles. Fire alarm cables should not share trunking, conduit, or containment with mains power unless the containment provides adequate segregation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Fire stopping:</strong> Where fire alarm cables pass through fire-rated walls, floors, or compartment boundaries, the penetration must be fire-stopped to maintain the fire resistance of the barrier.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Mains supply:</strong> The fire alarm panel must be supplied from a dedicated circuit at the main distribution board, protected by a fuse or MCB that is clearly labelled and provided with a lock-off facility to prevent accidental disconnection.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardCheck className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Commissioning</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Functional test:</strong> Every detector, call point, sounder, and interface module is tested individually to confirm it communicates with the panel and is correctly addressed and labelled.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Cause-and-effect testing:</strong> Verifies that every input (detector, call point) produces the correct programmed outputs (sounders, door releases, ventilation shutdown, lift recall, monitoring centre signal). Results are documented in the cause-and-effect matrix.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Sound level verification:</strong> Alarm sounder levels must achieve a minimum of 65 dB(A) throughout the building, or 75 dB(A) at bedhead level in sleeping risk premises, exceeding ambient noise by at least 5 dB(A).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Documentation and handover:</strong> Comprehensive as-installed drawings, zone plans, cause-and-effect documentation, operating instructions, and a fire alarm log book are handed to the responsible person. Training on system operation is provided.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Handover to Responsible Person:</strong> Upon commissioning,
                  the system is formally handed over to the responsible person (the duty holder under the
                  Regulatory Reform (Fire Safety) Order 2005). From this point, the responsible person is
                  accountable for ensuring the system is maintained, tested, and kept in working order.
                  A commissioning certificate is issued confirming compliance with BS 5839 Part 1.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Maintenance & Testing Regime */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">08</span>
            Maintenance &amp; Testing Regime
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                BS 5839 Part 1 Section 6 establishes a structured programme of routine testing and
                maintenance to ensure the fire alarm system remains fully operational at all times.
                A fire alarm system that is not properly maintained may fail when it is needed most,
                with potentially fatal consequences.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Testing Frequency Requirements</p>
                <div className="space-y-3">
                  <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold text-rose-400 mt-0.5 flex-shrink-0 w-20">Weekly</span>
                      <div className="flex-1">
                        <p className="text-sm text-white font-medium">Alarm Test</p>
                        <p className="text-xs text-white/70 mt-0.5">Activate the system using a <strong className="text-white">different manual call point each week</strong>, rotating through all call points over the course of a year. Confirm the panel receives the signal and sounders activate. Test at a consistent time each week so occupants recognise it as a test. Record the call point tested and the result in the fire alarm log book.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold text-rose-400 mt-0.5 flex-shrink-0 w-20">Monthly</span>
                      <div className="flex-1">
                        <p className="text-sm text-white font-medium">Visual Inspection</p>
                        <p className="text-xs text-white/70 mt-0.5">Visual inspection of all detectors, call points, sounders, and the control panel. Check that no devices are obstructed, damaged, painted over, or missing. Confirm all indicator LEDs are functioning. Check the panel for any outstanding faults. Record findings in the log book.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold text-rose-400 mt-0.5 flex-shrink-0 w-20">Quarterly</span>
                      <div className="flex-1">
                        <p className="text-sm text-white font-medium">25% Detector Functional Test</p>
                        <p className="text-xs text-white/70 mt-0.5">Functionally test <strong className="text-white">25% of all detectors</strong> each quarter (ensuring 100% are tested within the year). This involves applying test smoke or test heat to each detector and confirming the panel receives the correct signal. Check backup battery condition and charger operation.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold text-rose-400 mt-0.5 flex-shrink-0 w-20">Annually</span>
                      <div className="flex-1">
                        <p className="text-sm text-white font-medium">Full System Test &amp; Inspection</p>
                        <p className="text-xs text-white/70 mt-0.5">Comprehensive test of the entire system. <strong className="text-white">All detectors functionally tested</strong>, all call points tested, all sounders and visual alarm devices confirmed, all interfaces (door releases, ventilation shutdown, lift recall, monitoring centre) verified. Battery load test. Cable inspection where accessible. Full written report produced.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Record Keeping is Mandatory</p>
                </div>
                <p className="text-sm text-white/80">
                  All test results, maintenance activities, faults, and remedial actions must be recorded in
                  the <strong className="text-white">fire alarm log book</strong>. This log book is a legal
                  document that may be inspected by the fire and rescue service, enforcing officers, and
                  insurers. Failure to maintain adequate records is a breach of fire safety legislation and
                  may result in enforcement action, fines, or prosecution under the Regulatory Reform
                  (Fire Safety) Order 2005.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Who Can Carry Out Maintenance?</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Weekly tests:</strong> Can be carried out by a trained member of staff (the responsible person or their delegate) &mdash; they do not require a specialist fire alarm engineer.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Quarterly and annual maintenance:</strong> Should be carried out by a <strong className="text-white">competent fire alarm servicing company</strong>, ideally one certificated by BAFE SP203-1 or an equivalent third-party certification scheme. The engineer should hold relevant qualifications (FIA, EAL, or equivalent).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span><strong className="text-white">Fault rectification:</strong> Any faults identified during testing must be rectified promptly. Critical faults (affecting detection capability) should be treated as urgent. A temporary risk assessment may be needed if the system is impaired whilst repairs are carried out.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Point for Electricians:</strong> As a qualified
                  electrician, understanding the fire alarm maintenance regime is essential whether you are
                  carrying out the maintenance yourself (with appropriate fire alarm qualifications) or
                  coordinating with specialist fire alarm engineers. Never isolate or disable any part of
                  a fire alarm system without following the site&rsquo;s impairment procedure, informing the
                  responsible person, and implementing alternative fire safety measures for the duration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Maintenance Regime Summary Table */}
        <section className="mb-10">
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
            <p className="text-sm font-medium text-white mb-2">Maintenance &amp; Testing Summary</p>
            <div className="overflow-x-auto -mx-4 px-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white/60 py-2 pr-3 font-medium">Frequency</th>
                    <th className="text-left text-white/60 py-2 pr-3 font-medium">Activity</th>
                    <th className="text-left text-white/60 py-2 font-medium">Carried Out By</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-3 font-medium text-white">Weekly</td>
                    <td className="py-2 pr-3">Alarm test &mdash; different call point each week</td>
                    <td className="py-2">Trained occupant / responsible person</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-3 font-medium text-white">Monthly</td>
                    <td className="py-2 pr-3">Visual inspection of all devices and panel</td>
                    <td className="py-2">Trained occupant / responsible person</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-3 font-medium text-white">Quarterly</td>
                    <td className="py-2 pr-3">25% of detectors functionally tested, battery check</td>
                    <td className="py-2">Competent fire alarm engineer</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-medium text-white">Annually</td>
                    <td className="py-2 pr-3">All detectors tested, full system check, written report</td>
                    <td className="py-2">Competent fire alarm engineer</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

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
          title="Section 2 Knowledge Check"
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
            <Link to="../fire-safety-module-3-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Fire Prevention Measures
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-3-section-3">
              Fire Alarm Systems
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
