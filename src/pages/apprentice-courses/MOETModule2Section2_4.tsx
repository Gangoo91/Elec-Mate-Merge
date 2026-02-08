import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Frequency and Waveforms - MOET Module 2.2.4";
const DESCRIPTION = "Comprehensive guide to frequency, harmonics and waveform distortion for maintenance technicians: 50 Hz UK supply, angular frequency, harmonic orders (3rd, 5th, 7th), THD, non-linear loads (VSDs, LED drivers), effects of harmonics (neutral overload, transformer heating), harmonic filters and oscilloscope use under BS 7671 and ST1426.";

const quickCheckQuestions = [
  {
    id: "harmonic-order",
    question: "The third harmonic of the 50 Hz UK supply has a frequency of:",
    options: [
      "100 Hz",
      "150 Hz",
      "200 Hz",
      "250 Hz"
    ],
    correctIndex: 1,
    explanation: "The nth harmonic is n times the fundamental frequency. The third harmonic of 50 Hz is 3 x 50 = 150 Hz. Similarly, the 5th harmonic is 250 Hz, the 7th is 350 Hz, and so on. Odd harmonics are the most significant in power systems because most non-linear loads produce symmetrical waveform distortion."
  },
  {
    id: "thd-meaning",
    question: "Total Harmonic Distortion (THD) is a measure of:",
    options: [
      "The frequency stability of the supply",
      "The voltage drop in a cable",
      "How much the waveform deviates from a pure sine wave due to harmonic content",
      "The power factor of a circuit"
    ],
    correctIndex: 2,
    explanation: "THD expresses the ratio of the RMS value of all harmonic components to the RMS value of the fundamental component, usually as a percentage. A THD of 0% means a perfect sine wave. A THD of 5% is typical for a lightly loaded modern installation. A THD above 8% generally requires investigation and possible remediation."
  },
  {
    id: "triplen-harmonics",
    question: "Triplen harmonics (3rd, 9th, 15th, etc.) are particularly problematic in three-phase systems because:",
    options: [
      "They cause the supply frequency to change",
      "They add arithmetically in the neutral conductor, potentially overloading it",
      "They reduce the supply voltage to zero",
      "They only affect single-phase circuits"
    ],
    correctIndex: 1,
    explanation: "Triplen harmonics (multiples of 3) are zero-sequence harmonics. Unlike the fundamental 50 Hz currents (which cancel in a balanced neutral), triplen harmonics from all three phases are in phase with each other and add arithmetically in the neutral conductor. This can cause the neutral current to exceed the line current — a serious overloading risk, particularly in older installations with reduced neutral conductors."
  },
  {
    id: "oscilloscope-use",
    question: "When using an oscilloscope to measure a 50 Hz waveform, what timebase setting would show approximately two complete cycles on the screen?",
    options: [
      "1 ms/div with 10 divisions = 10 ms total",
      "5 ms/div with 10 divisions = 50 ms total",
      "10 ms/div with 10 divisions = 100 ms total",
      "50 ms/div with 10 divisions = 500 ms total"
    ],
    correctIndex: 1,
    explanation: "One complete cycle at 50 Hz takes 20 ms (T = 1/f = 1/50 = 0.02 s). To display two complete cycles requires 40 ms of time on screen. With 10 horizontal divisions, a timebase of 5 ms/div gives 50 ms total — enough to display 2.5 cycles, clearly showing approximately two complete cycles."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The angular frequency of the UK 50 Hz supply is approximately:",
    options: [
      "50 rad/s",
      "157 rad/s",
      "314 rad/s",
      "628 rad/s"
    ],
    correctAnswer: 2,
    explanation: "Angular frequency ω = 2πf = 2 x π x 50 = 100π ≈ 314 rad/s. Angular frequency is used in calculations of inductive reactance (XL = ωL) and capacitive reactance (XC = 1/ωC). It represents the rate of rotation of the phasor in radians per second."
  },
  {
    id: 2,
    question: "Which of the following loads is most likely to produce significant harmonic distortion?",
    options: [
      "A resistive heater element",
      "An incandescent lamp",
      "A variable speed drive (VSD) with a six-pulse rectifier input",
      "A purely inductive coil"
    ],
    correctAnswer: 2,
    explanation: "Variable speed drives with six-pulse rectifier inputs are among the most significant sources of harmonic distortion in industrial installations. They draw current in short pulses at the peaks of the voltage waveform, producing a characteristic current waveform rich in 5th (250 Hz), 7th (350 Hz), 11th and 13th harmonics. Resistive loads and incandescent lamps draw sinusoidal current and produce no harmonics."
  },
  {
    id: 3,
    question: "A six-pulse rectifier (as found in many VSDs) produces characteristic harmonics of order:",
    options: [
      "2nd, 4th, 6th, 8th (even harmonics)",
      "3rd, 9th, 15th (triplen harmonics)",
      "5th, 7th, 11th, 13th (h = 6n ± 1)",
      "All harmonics equally"
    ],
    correctAnswer: 2,
    explanation: "A six-pulse rectifier produces harmonics of order h = 6n ± 1, where n = 1, 2, 3... This gives 5th, 7th, 11th, 13th, 17th, 19th, etc. The magnitude decreases with harmonic order (approximately 1/h). A twelve-pulse rectifier eliminates the 5th and 7th, producing mainly 11th and 13th — this is one method of harmonic reduction."
  },
  {
    id: 4,
    question: "What effect do harmonics have on transformers?",
    options: [
      "No effect — transformers are immune to harmonics",
      "Increased eddy current and hysteresis losses, causing additional heating",
      "Reduced output voltage only",
      "Increased efficiency due to higher frequency components"
    ],
    correctAnswer: 1,
    explanation: "Harmonics cause additional heating in transformers through two mechanisms: eddy current losses increase as the square of the frequency (a 250 Hz 5th harmonic produces 25 times the eddy current losses of the 50 Hz fundamental), and hysteresis losses increase approximately linearly with frequency. This is why transformers supplying harmonic-rich loads must be derated or specified as 'K-rated' transformers designed for harmonic duty."
  },
  {
    id: 5,
    question: "The BS EN 61000-3-2 standard limits harmonic currents for:",
    options: [
      "All industrial installations regardless of size",
      "Equipment with rated current up to 16 A per phase (Class A, B, C, D equipment)",
      "Only motors above 100 kW",
      "Only lighting circuits"
    ],
    correctAnswer: 1,
    explanation: "BS EN 61000-3-2 sets limits on harmonic current emissions for equipment with a rated input current of up to 16 A per phase. It classifies equipment into four classes (A, B, C, D) with different limits for each. For larger equipment, BS EN 61000-3-12 applies (up to 75 A per phase). These standards are part of the EMC Directive requirements."
  },
  {
    id: 6,
    question: "An oscilloscope displays a waveform with a flattened top. This is most likely caused by:",
    options: [
      "A pure sine wave",
      "Excessive fundamental frequency current",
      "Voltage distortion from harmonic-producing loads (flat-topping)",
      "A low supply frequency"
    ],
    correctAnswer: 2,
    explanation: "Flat-topping of the voltage waveform is caused by non-linear loads drawing current in short pulses at the voltage peaks. The high peak current demand causes a voltage drop at the peaks (due to source impedance), flattening the top of the voltage sine wave. This is a very common observation in modern commercial buildings with high concentrations of IT equipment and LED lighting."
  },
  {
    id: 7,
    question: "Which harmonic mitigation technique involves connecting two rectifiers with a 30-degree phase shift?",
    options: [
      "Passive harmonic filter",
      "Active harmonic filter",
      "Twelve-pulse rectification",
      "K-rated transformer"
    ],
    correctAnswer: 2,
    explanation: "Twelve-pulse rectification uses two six-pulse rectifiers fed from transformer secondaries with a 30-degree phase shift (typically one star and one delta secondary). The 5th and 7th harmonics from the two rectifiers are 180 degrees out of phase and cancel each other, leaving mainly 11th and 13th harmonics. This can reduce total current THD from approximately 30% to approximately 10%."
  },
  {
    id: 8,
    question: "The 'skin effect' at harmonic frequencies causes:",
    options: [
      "Reduced conductor temperature",
      "Increased effective AC resistance of conductors",
      "Improved power factor",
      "Reduced cable insulation requirements"
    ],
    correctAnswer: 1,
    explanation: "The skin effect causes AC current to flow preferentially on the surface of a conductor. The depth of penetration decreases with increasing frequency. At harmonic frequencies (250 Hz, 350 Hz, etc.), the skin effect is more pronounced than at 50 Hz, reducing the effective cross-sectional area and increasing the AC resistance. This causes additional heating in conductors carrying harmonic currents and may require conductor derating."
  },
  {
    id: 9,
    question: "An active harmonic filter works by:",
    options: [
      "Blocking harmonic frequencies with a series inductor",
      "Injecting equal and opposite harmonic currents to cancel the harmonics",
      "Increasing the supply impedance",
      "Converting AC to DC and back again"
    ],
    correctAnswer: 1,
    explanation: "An active harmonic filter (AHF) monitors the load current in real time, analyses the harmonic content, and injects equal and opposite harmonic currents into the supply. The harmonic currents from the load and the filter cancel each other, resulting in a near-sinusoidal current drawn from the supply. AHFs are the most effective and flexible harmonic mitigation solution but are also the most expensive."
  },
  {
    id: 10,
    question: "A power quality analyser shows voltage THD of 12% on a distribution board. According to BS EN 50160, the recommended limit for voltage THD on LV systems is:",
    options: [
      "1%",
      "5%",
      "8%",
      "15%"
    ],
    correctAnswer: 2,
    explanation: "BS EN 50160 (voltage characteristics of electricity supplied by public distribution systems) states that voltage THD should not exceed 8% under normal operating conditions, measured over 10-minute intervals. Individual harmonic voltages also have specific limits. A THD of 12% exceeds this limit and investigation is warranted — the source of harmonics should be identified and mitigation measures considered."
  },
  {
    id: 11,
    question: "When connecting an oscilloscope probe to measure a 400 V three-phase supply, you should:",
    options: [
      "Connect directly with a standard 1:1 probe",
      "Use an appropriately rated high-voltage differential probe or voltage attenuator",
      "Connect to the earth terminal only",
      "Use a current probe on the neutral conductor"
    ],
    correctAnswer: 1,
    explanation: "Standard oscilloscope probes are typically rated for a maximum of 300-600 V (CAT II). For 400 V three-phase measurements, a high-voltage differential probe (with appropriate CAT III or CAT IV rating) must be used. A differential probe measures the voltage between two points without connecting either to the oscilloscope's ground — this is essential because the oscilloscope ground is typically connected to mains earth, and connecting it to a live conductor would create a dangerous short circuit."
  },
  {
    id: 12,
    question: "In a building with many VSD-controlled motors, which of the following is NOT a typical symptom of harmonic distortion?",
    options: [
      "Unexplained overheating of neutral conductors",
      "Premature failure of power factor correction capacitors",
      "Incorrect readings on average-responding meters",
      "Increased supply frequency above 50 Hz"
    ],
    correctAnswer: 3,
    explanation: "Harmonics do not change the supply frequency — the fundamental remains at 50 Hz. Harmonics are additional frequency components superimposed on the fundamental. The other three options are all genuine symptoms of harmonic distortion: neutral overloading from triplen harmonics, PFC capacitor failure from harmonic resonance and overcurrent, and incorrect meter readings because average-responding meters assume a pure sine wave."
  }
];

const faqs = [
  {
    question: "Are harmonics a new problem in electrical installations?",
    answer: "Harmonics have always existed to some degree (fluorescent lighting with magnetic ballasts produced 3rd harmonics), but the problem has become much more significant with the proliferation of electronic loads. Switch-mode power supplies in computers, LED drivers, variable speed drives and EV chargers all draw non-sinusoidal current. In a modern office building, harmonic current can account for 30-40% of the total current. BS 7671 now requires designers to consider harmonics when sizing neutral conductors and selecting equipment."
  },
  {
    question: "Can harmonics damage my equipment?",
    answer: "Yes. Harmonics can cause premature failure of numerous types of equipment. Transformers overheat due to increased eddy current and hysteresis losses. Power factor correction capacitors can be destroyed by harmonic resonance, which amplifies harmonic currents through the capacitors. Motors experience additional heating, vibration and reduced efficiency. Sensitive electronic equipment may malfunction due to voltage distortion. Circuit breakers may trip unexpectedly or, conversely, fail to trip when they should."
  },
  {
    question: "How do I measure harmonics on site?",
    answer: "Harmonics are measured using a power quality analyser (PQA) — a specialised instrument that captures the voltage and current waveforms and performs a Fourier analysis to break them down into their individual harmonic components. The PQA displays the magnitude of each harmonic order, the total harmonic distortion (THD), and often the waveform shape. An oscilloscope can show waveform distortion visually but doesn't quantify individual harmonics. A true-RMS meter will measure the total RMS value correctly but won't identify the harmonic content."
  },
  {
    question: "What is the difference between passive and active harmonic filters?",
    answer: "A passive harmonic filter consists of tuned LC (inductor-capacitor) circuits designed to provide a low-impedance path for specific harmonic frequencies, diverting them away from the supply. They are relatively inexpensive but only target specific harmonics and can interact with the system impedance, potentially causing resonance problems. An active harmonic filter monitors the load current in real time and injects compensating currents to cancel the harmonics. Active filters are more expensive but more effective, more flexible, and adapt automatically to changing load conditions."
  },
  {
    question: "Why do VSDs cause harmonics and what can be done about it?",
    answer: "Standard VSDs use a six-pulse diode bridge rectifier on the input that draws current in short, sharp pulses at the peaks of the voltage waveform. This non-sinusoidal current is rich in 5th, 7th, 11th and 13th harmonics. Mitigation options include: input line reactors (chokes) that broaden the current pulses and reduce harmonics by 30-50%; DC link chokes inside the VSD; twelve-pulse or eighteen-pulse rectifier front-ends; active front-end (AFE) drives that draw near-sinusoidal current; and external active harmonic filters. The cost-effectiveness of each solution depends on the drive size and the severity of the harmonic problem."
  }
];

const MOETModule2Section2_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section2">
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
            <span>Module 2.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Frequency and Waveforms
          </h1>
          <p className="text-white/80">
            Understanding harmonics, waveform distortion and their effects on electrical maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>50 Hz UK</strong> — one cycle every 20 ms, ω = 314 rad/s</li>
              <li className="pl-1"><strong>Harmonics</strong> — multiples of 50 Hz caused by non-linear loads</li>
              <li className="pl-1"><strong>THD</strong> — total harmonic distortion, should be below 8% voltage</li>
              <li className="pl-1"><strong>Triplen harmonics</strong> — add in the neutral, causing overloading</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Common Harmonic Sources</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>VSDs:</strong> 5th, 7th, 11th, 13th harmonics (6-pulse)</li>
              <li className="pl-1"><strong>IT equipment:</strong> 3rd harmonic dominant</li>
              <li className="pl-1"><strong>LED drivers:</strong> 3rd and 5th harmonics</li>
              <li className="pl-1"><strong>UPS systems:</strong> Rectifier input harmonics</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the significance of the 50 Hz UK supply frequency and angular frequency",
              "Define harmonics and identify the dominant harmonic orders from common non-linear loads",
              "Calculate harmonic frequencies and understand the concept of THD",
              "Describe the effects of harmonics on transformers, cables, motors and neutral conductors",
              "Identify harmonic mitigation techniques including passive filters, active filters and multi-pulse rectifiers",
              "Use an oscilloscope to identify waveform distortion and interpret power quality measurements"
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

        {/* Section 01: Frequency Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Frequency Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The UK public electricity supply operates at a nominal frequency of 50 Hz — meaning the AC waveform
              completes 50 full cycles every second. This frequency is maintained with great precision by National
              Grid, which continuously balances generation and demand to keep the frequency within ±1% of 50 Hz
              under normal conditions. Frequency is a fundamental parameter that affects every AC device and
              circuit in the installation.
            </p>
            <p>
              The choice of 50 Hz represents a practical engineering compromise. Lower frequencies would require
              larger, heavier transformers and generators. Higher frequencies would increase transmission losses
              due to skin effect and dielectric losses, and would increase the reactive effects of cable capacitance.
              The 50 Hz standard (adopted across Europe, most of Asia, Africa and Australasia) provides a good
              balance between equipment size, efficiency and transmission characteristics.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Frequency, Period and Angular Frequency</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Frequency (f):</strong> 50 Hz — 50 complete cycles per second</li>
                <li className="pl-1"><strong>Period (T):</strong> T = 1/f = 1/50 = 0.02 s = 20 ms per cycle</li>
                <li className="pl-1"><strong>Angular frequency (ω):</strong> ω = 2πf = 2π x 50 = 100π ≈ 314 rad/s</li>
                <li className="pl-1"><strong>Half-cycle duration:</strong> T/2 = 10 ms (relevant for RCD disconnection times and zero-crossing behaviour)</li>
                <li className="pl-1"><strong>Worldwide comparison:</strong> USA/Canada use 60 Hz (T = 16.67 ms, ω = 377 rad/s)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Frequency Control and Grid Stability</p>
              <p className="text-sm text-white mb-3">
                Supply frequency is directly related to the rotational speed of generators. When demand exceeds
                generation, generators slow down and frequency drops. When generation exceeds demand, generators
                speed up and frequency rises.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Normal range:</strong> 49.95-50.05 Hz (under tight frequency response)</li>
                <li className="pl-1"><strong>Operational limits:</strong> 49.5-50.5 Hz (statutory limits under Grid Code)</li>
                <li className="pl-1"><strong>Low frequency demand disconnection (LFDD):</strong> At 48.8 Hz, automatic load shedding begins to prevent cascade failure</li>
                <li className="pl-1"><strong>Standby generators:</strong> Must synchronise to 50 Hz (voltage, frequency and phase) before paralleling with the supply. Auto-synchronising relays are used for this purpose</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Equipment rated for 50 Hz must not be operated at significantly different
              frequencies. A transformer designed for 50 Hz will draw excessive magnetising current and overheat
              if operated below approximately 47 Hz. Motors will run at incorrect speeds if the frequency deviates.
              VSDs deliberately vary frequency to control motor speed — this is a controlled application, not an
              uncontrolled deviation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Harmonics */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Harmonics and Waveform Distortion
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Harmonics are sinusoidal voltages or currents at frequencies that are integer multiples of the
              fundamental supply frequency (50 Hz). A non-linear load draws current that is not proportional to
              the applied voltage — the resulting current waveform is distorted and, by Fourier analysis, can be
              decomposed into a series of sinusoidal components at the fundamental frequency and its harmonics.
            </p>
            <p>
              In an ideal power system, all voltages and currents would be pure sine waves at 50 Hz. In practice,
              the proliferation of electronic loads has made harmonic distortion one of the most significant power
              quality issues in modern installations. Understanding harmonics is essential for maintenance
              technicians because harmonic-related faults are increasingly common and can be difficult to diagnose
              without the appropriate knowledge and instruments.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Harmonic Orders and Their Sources</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Harmonic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Sequence</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Primary Sources</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3rd</td>
                      <td className="border border-white/10 px-3 py-2">150 Hz</td>
                      <td className="border border-white/10 px-3 py-2">Zero</td>
                      <td className="border border-white/10 px-3 py-2">Switch-mode PSUs, LED drivers, electronic ballasts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5th</td>
                      <td className="border border-white/10 px-3 py-2">250 Hz</td>
                      <td className="border border-white/10 px-3 py-2">Negative</td>
                      <td className="border border-white/10 px-3 py-2">VSDs (6-pulse), UPS rectifiers, thyristor drives</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7th</td>
                      <td className="border border-white/10 px-3 py-2">350 Hz</td>
                      <td className="border border-white/10 px-3 py-2">Positive</td>
                      <td className="border border-white/10 px-3 py-2">VSDs (6-pulse), UPS rectifiers, thyristor drives</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">9th</td>
                      <td className="border border-white/10 px-3 py-2">450 Hz</td>
                      <td className="border border-white/10 px-3 py-2">Zero</td>
                      <td className="border border-white/10 px-3 py-2">Same as 3rd (triplen harmonic)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">11th</td>
                      <td className="border border-white/10 px-3 py-2">550 Hz</td>
                      <td className="border border-white/10 px-3 py-2">Negative</td>
                      <td className="border border-white/10 px-3 py-2">12-pulse rectifiers, large VSDs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">13th</td>
                      <td className="border border-white/10 px-3 py-2">650 Hz</td>
                      <td className="border border-white/10 px-3 py-2">Positive</td>
                      <td className="border border-white/10 px-3 py-2">12-pulse rectifiers, large VSDs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Total Harmonic Distortion (THD)</p>
              <p className="text-sm text-white mb-3">
                THD quantifies the overall level of harmonic distortion as a single percentage figure:
              </p>
              <div className="p-3 rounded bg-white/5 font-mono text-sm text-center mb-3">
                THD = √(V₂² + V₃² + V₄² + ... + Vₙ²) / V₁ x 100%
              </div>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Voltage THD &lt; 5%:</strong> Generally acceptable for most installations</li>
                <li className="pl-1"><strong>Voltage THD 5-8%:</strong> May require investigation — some sensitive equipment affected</li>
                <li className="pl-1"><strong>Voltage THD &gt; 8%:</strong> Exceeds BS EN 50160 limit — remediation recommended</li>
                <li className="pl-1"><strong>Current THD:</strong> Can be much higher (30-80% for individual non-linear loads). Current distortion causes voltage distortion through the supply impedance</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Harmonic sequence determines the effect on three-phase systems. Positive
              sequence harmonics (7th, 13th) create a forward-rotating magnetic field. Negative sequence harmonics
              (5th, 11th) create a backward-rotating field (causing motor heating and vibration). Zero sequence
              harmonics (3rd, 9th) do not produce a rotating field but add in the neutral conductor.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Effects of Harmonics */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Effects of Harmonics on Electrical Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Harmonics affect virtually every component in an electrical installation. As a maintenance
              technician, you will encounter harmonic-related problems with increasing frequency as modern
              electronic loads proliferate. Recognising the symptoms of harmonic distortion is an important
              fault-finding skill.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Neutral Conductor Overloading</p>
              <p className="text-sm text-white mb-3">
                This is the most dangerous harmonic effect in three-phase four-wire systems. Under balanced
                conditions with linear loads, the neutral current is zero. With non-linear loads:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Triplen harmonics (3rd, 9th, 15th) from all three phases add arithmetically in the neutral</li>
                <li className="pl-1">Neutral current can reach up to 1.73 times the line current</li>
                <li className="pl-1">The neutral conductor has no overcurrent protection (it must not be fused in TN systems)</li>
                <li className="pl-1">Older installations often used reduced-size neutral conductors (50% of line CSA)</li>
                <li className="pl-1">Result: neutral conductor overheating, insulation degradation, potential fire</li>
                <li className="pl-1"><strong>BS 7671 solution:</strong> Size neutral conductors at 100% of line conductor CSA where harmonic currents are expected. Apply correction factors from Appendix 4 Table 4C3</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effects on Specific Equipment</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Transformers:</strong> Increased eddy current losses (proportional to f²), increased hysteresis losses, additional heating. Derate by 10-30% or use K-rated transformers. K-factor indicates the transformer's ability to withstand harmonic heating</li>
                <li className="pl-1"><strong>Cables:</strong> Increased AC resistance due to skin effect and proximity effect at harmonic frequencies. Additional heating. May require derating or upsizing. Neutral conductor particularly affected</li>
                <li className="pl-1"><strong>Motors:</strong> Negative sequence harmonics (5th, 11th) produce a backward-rotating magnetic field, causing additional losses, overheating, vibration, noise and reduced efficiency. Motor temperature rise may exceed design limits</li>
                <li className="pl-1"><strong>PFC capacitors:</strong> Capacitive reactance decreases with frequency (XC = 1/2πfC). At harmonic frequencies, capacitors present a low impedance and can absorb excessive harmonic currents. Resonance between PFC capacitors and transformer inductance can amplify specific harmonics dramatically, causing capacitor overheating and failure</li>
                <li className="pl-1"><strong>Circuit breakers:</strong> Harmonic currents increase the RMS current without a proportional increase in peak current. This can cause thermal tripping without magnetic tripping, or conversely, prevent tripping under fault conditions</li>
                <li className="pl-1"><strong>Meters and instruments:</strong> Average-responding meters give incorrect readings on distorted waveforms. Only true-RMS instruments give accurate measurements in the presence of harmonics</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> If you encounter unexplained overheating of cables, transformers or
              neutral conductors, or premature failure of PFC capacitors, consider harmonics as a possible cause.
              A simple check is to measure the neutral current in a three-phase four-wire circuit — if it is
              significantly non-zero with a balanced load, triplen harmonics are present.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Harmonic Mitigation and Oscilloscope Use */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Harmonic Mitigation and Oscilloscope Use
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When harmonics exceed acceptable levels, mitigation measures must be implemented. The choice of
              mitigation technique depends on the harmonic orders present, the severity of distortion, the
              available budget and the installation characteristics. Additionally, the oscilloscope is an
              invaluable tool for visualising waveform distortion and diagnosing harmonic-related problems.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Harmonic Mitigation Techniques</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Line reactors (chokes):</strong> Series inductors that broaden the current pulses drawn by rectifiers, reducing harmonic content by 30-50%. Simple, inexpensive, robust. Commonly used with VSDs (3-5% impedance reactors)</li>
                <li className="pl-1"><strong>Passive tuned filters:</strong> LC circuits tuned to specific harmonic frequencies (typically 5th and 7th). Provide a low-impedance path for harmonics, diverting them away from the supply. Must be carefully designed to avoid resonance problems</li>
                <li className="pl-1"><strong>Active harmonic filters (AHF):</strong> Electronic devices that inject compensating currents in real time to cancel harmonics. The most effective solution — can reduce THD to less than 5%. Self-adapting to changing loads. More expensive than passive solutions</li>
                <li className="pl-1"><strong>Multi-pulse rectifiers:</strong> 12-pulse (eliminates 5th, 7th) or 18-pulse (eliminates 5th, 7th, 11th, 13th) rectifier configurations. Require specialised transformers. Commonly used in large VSD installations</li>
                <li className="pl-1"><strong>Active front-end (AFE) drives:</strong> VSDs with IGBT-based rectifiers that draw near-sinusoidal current. Expensive but provide excellent harmonic performance and regenerative braking capability</li>
                <li className="pl-1"><strong>K-rated transformers:</strong> Designed with enhanced cooling, reduced eddy current losses and oversized neutral connections to withstand harmonic heating. K-factor ratings: K-4 (light harmonic duty), K-13 (moderate), K-20 (heavy)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Using an Oscilloscope for Waveform Analysis</p>
              <p className="text-sm text-white mb-3">
                An oscilloscope displays voltage (or current) as a function of time, allowing you to see the actual
                shape of the waveform. For maintenance technicians, a portable oscilloscope or a multimeter with
                waveform display is invaluable for diagnosing power quality issues.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Flat-topped voltage:</strong> Indicates voltage distortion from non-linear loads — the peaks are clipped by the high peak current demand. Very common in commercial buildings</li>
                <li className="pl-1"><strong>Notched voltage:</strong> V-shaped notches in the waveform caused by thyristor commutation in DC drives and controlled rectifiers</li>
                <li className="pl-1"><strong>Current spikes:</strong> Sharp, narrow current pulses indicate rectifier input current — typical of switch-mode power supplies and basic VSD inputs</li>
                <li className="pl-1"><strong>Timebase setting:</strong> For 50 Hz, set the timebase to 5 ms/div to display 2-3 complete cycles. Use 2 ms/div for detailed waveform analysis</li>
                <li className="pl-1"><strong>Safety:</strong> Always use appropriately rated probes (CAT III or CAT IV for distribution work). Use differential probes for phase-to-phase measurements. Never connect the oscilloscope earth lead to a live conductor</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Maintenance of Harmonic Filters</p>
              <p className="text-sm text-white">
                Harmonic filters require regular maintenance to ensure continued effectiveness. Passive filter
                capacitors degrade over time and should be thermographically surveyed annually. Check for
                signs of swelling, leaking dielectric, or discolouration. Measure the capacitance and compare
                to the rated value — a decrease of more than 5% indicates degradation. Active harmonic filters
                should have their performance verified using a power quality analyser quarterly. Check that
                the THD at the point of common coupling (PCC) remains within acceptable limits. Keep firmware
                updated and maintain adequate cooling for the power electronics.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires an understanding of power
              quality issues including harmonics, their causes and effects. The ability to identify harmonic
              distortion using appropriate instruments and recommend mitigation measures is an increasingly
              important maintenance competency.
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
            title="Test Your Knowledge — Frequency and Waveforms"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Single-Phase vs Three-Phase
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section2-5">
              Next: Reactance, Impedance and PF
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule2Section2_4;
