import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Variable Speed Drives and Soft Starters - MOET Module 3 Section 2.4";
const DESCRIPTION = "Comprehensive guide to VSDs and soft starters for electrical maintenance technicians: VSD architecture (rectifier, DC bus, inverter), V/f and vector control, soft starter thyristor operation, commissioning, harmonics, EMC compliance and maintenance under ST1426.";

const quickCheckQuestions = [
  {
    id: "dc-bus-voltage",
    question: "What is the approximate DC bus voltage for a VSD connected to a 400 V AC supply?",
    options: [
      "230 V DC",
      "400 V DC",
      "565 V DC",
      "690 V DC"
    ],
    correctIndex: 2,
    explanation: "The DC bus voltage is approximately 400 V x 1.414 (the square root of 2) = 565 V DC. This is the peak of the AC supply waveform, rectified and smoothed by the DC bus capacitors. Monitoring the DC bus voltage is a key diagnostic parameter -- significantly lower values indicate rectifier or supply issues."
  },
  {
    id: "soft-starter-device",
    question: "What semiconductor devices do soft starters use to control the motor voltage?",
    options: [
      "IGBTs",
      "Diodes",
      "Back-to-back thyristors (SCRs)",
      "MOSFETs"
    ],
    correctIndex: 2,
    explanation: "Soft starters use back-to-back thyristors (SCRs) on each of the three phases. By controlling the firing angle of the thyristors, the effective voltage applied to the motor is gradually increased from a low initial level to full supply voltage over an adjustable ramp time. Once at full speed, the thyristors are typically bypassed by a contactor."
  },
  {
    id: "vsd-maintenance",
    question: "What is the most common failure point in a VSD that requires regular maintenance?",
    options: [
      "IGBT modules",
      "Cooling fans and filters",
      "The keypad display",
      "Motor cables"
    ],
    correctIndex: 1,
    explanation: "Cooling fans and their air filters are the most common maintenance item on VSDs. Blocked or dirty filters restrict airflow, causing the drive to overheat and trip on overtemperature. Filters should be cleaned or replaced every 6-12 months depending on the environment. Fan failure is also common and many drives will alarm before the fan stops completely."
  },
  {
    id: "capacitor-safety",
    question: "How long should you wait after isolating a VSD before opening the enclosure?",
    options: [
      "No wait needed",
      "30 seconds",
      "At least 5 minutes (check manufacturer's data)",
      "24 hours"
    ],
    correctIndex: 2,
    explanation: "DC bus capacitors retain a lethal charge after isolation. Wait at least 5 minutes (or as specified by the manufacturer -- some larger drives require longer) and verify the DC bus voltage has discharged below 50 V using a multimeter before touching any internal components. This is a critical safety requirement."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the three main stages of a VSD?",
    options: ["Transformer, switch, motor", "Rectifier, DC bus, inverter", "Contactor, overload, isolator", "Filter, amplifier, output"],
    correctAnswer: 1,
    explanation: "A VSD consists of a rectifier (AC to DC), DC bus (smoothing capacitors), and inverter (DC to variable-frequency AC using IGBTs and PWM)."
  },
  {
    id: 2,
    question: "What switching devices are used in the VSD inverter stage?",
    options: ["Thyristors", "Diodes", "IGBTs", "Triacs"],
    correctAnswer: 2,
    explanation: "IGBTs (Insulated Gate Bipolar Transistors) are used in the inverter stage, switching at high frequency (typically 2-16 kHz) to create the PWM output waveform."
  },
  {
    id: 3,
    question: "What is the approximate DC bus voltage for a 400 V VSD?",
    options: ["400 V DC", "500 V DC", "565 V DC", "690 V DC"],
    correctAnswer: 2,
    explanation: "The DC bus voltage is approximately 400 x 1.414 = 565 V DC (peak of the AC supply waveform, rectified and smoothed)."
  },
  {
    id: 4,
    question: "What does V/f control maintain constant?",
    options: ["Current", "Power", "Voltage-to-frequency ratio", "Speed"],
    correctAnswer: 2,
    explanation: "V/f control maintains a constant voltage-to-frequency ratio (e.g., 8 V/Hz for 400 V/50 Hz) to keep the motor flux constant, providing approximately constant torque throughout the speed range up to base speed."
  },
  {
    id: 5,
    question: "What semiconductor devices do soft starters use?",
    options: ["IGBTs", "Back-to-back thyristors (SCRs)", "MOSFETs", "Diodes"],
    correctAnswer: 1,
    explanation: "Soft starters use back-to-back thyristors on each phase, controlling the firing angle to vary the effective voltage during starting and stopping."
  },
  {
    id: 6,
    question: "What is the most common VSD maintenance item?",
    options: ["IGBT replacement", "Keypad cleaning", "Fan and filter maintenance", "Capacitor replacement"],
    correctAnswer: 2,
    explanation: "Cooling fans and filters are the most common maintenance requirement. Blocked filters cause overheating and drive trips."
  },
  {
    id: 7,
    question: "How long must you wait before opening an isolated VSD?",
    options: ["No wait needed", "1 minute", "At least 5 minutes", "1 hour"],
    correctAnswer: 2,
    explanation: "DC bus capacitors retain a lethal charge. Wait at least 5 minutes (check manufacturer's data) and verify the DC bus has discharged below 50 V before any work."
  },
  {
    id: 8,
    question: "What harmonics are predominantly generated by a VSD rectifier?",
    options: ["2nd and 4th", "3rd and 9th", "5th, 7th, 11th and 13th", "None"],
    correctAnswer: 2,
    explanation: "The six-pulse diode rectifier produces predominantly 5th, 7th, 11th and 13th harmonics of the supply frequency."
  },
  {
    id: 9,
    question: "What UK standard sets harmonic emission limits for installations?",
    options: ["BS 7671", "Engineering Recommendation G5/4-1", "BS EN 61439", "GS38"],
    correctAnswer: 1,
    explanation: "Engineering Recommendation G5/4-1 (issued by the Energy Networks Association) sets limits on harmonic emissions from installations connected to the public supply network."
  },
  {
    id: 10,
    question: "What is the typical lifespan of DC bus electrolytic capacitors?",
    options: ["1-2 years", "5-10 years", "20-30 years", "Indefinite"],
    correctAnswer: 1,
    explanation: "Electrolytic capacitors have a finite life of typically 5-10 years, depending on temperature and usage. Capacitor degradation causes DC bus voltage ripple and eventual drive failure."
  },
  {
    id: 11,
    question: "What type of motor cable is required for EMC compliance with VSD installations?",
    options: ["Standard twin and earth", "Screened (shielded) cable", "Armoured cable only", "Any cable type"],
    correctAnswer: 1,
    explanation: "Screened motor cables with 360-degree screen termination at both ends are required for EMC compliance, preventing radiated electromagnetic interference from the high-frequency PWM output."
  },
  {
    id: 12,
    question: "What happens if you run a motor above base speed (above 50 Hz)?",
    options: ["Torque increases", "Torque reduces (field weakening)", "Nothing changes", "Motor stops"],
    correctAnswer: 1,
    explanation: "Above base speed, the voltage cannot increase further (already at maximum), so the motor enters field weakening. The available torque reduces proportionally as frequency increases above the base value."
  }
];

const faqs = [
  {
    question: "What is the difference between a VSD and a soft starter?",
    answer: "A VSD controls both frequency and voltage, providing continuous variable speed operation throughout the speed range. A soft starter only controls voltage during starting and stopping -- once the motor is up to speed, the motor runs at full voltage and full speed (50 Hz). VSDs are used where variable speed is needed (pumps, fans, conveyors); soft starters are used where only reduced starting current and smooth acceleration are required."
  },
  {
    question: "Why do VSDs generate harmonics?",
    answer: "The rectifier stage draws non-sinusoidal current from the supply because the diode bridge only conducts during the peaks of the AC waveform. This creates current pulses rather than a smooth sine wave, producing harmonic components at 5th (250 Hz), 7th (350 Hz), 11th (550 Hz) and 13th (650 Hz) multiples of the 50 Hz supply frequency. Mitigation options include DC bus chokes, line reactors, passive filters and active front-end drives."
  },
  {
    question: "Can I run a VSD-fed motor faster than its rated speed?",
    answer: "Yes, by increasing the output frequency above 50 Hz. However, above base speed the voltage cannot increase further (it is already at maximum), so the motor enters field weakening and the available torque reduces. The motor bearings, rotor balance and mechanical components must also be suitable for the higher speed. Always check with the motor manufacturer before operating above rated speed."
  },
  {
    question: "Can I perform insulation resistance testing on a motor connected to a VSD?",
    answer: "Absolutely not. You must disconnect the motor cables from the VSD output terminals before performing any insulation resistance testing. The 500 V DC test voltage will damage the VSD's IGBT output stage, varistors, surge protection devices and other semiconductor components. Similarly, disconnect any electronic equipment connected to the motor circuit before testing."
  },
  {
    question: "What are the energy savings from using a VSD on a pump or fan?",
    answer: "Significant savings are possible because the power consumed by a centrifugal pump or fan follows the cube law -- power is proportional to the cube of the speed. Reducing the speed by 20% (from 50 Hz to 40 Hz) reduces power consumption by approximately 49%. Typical payback periods for VSD installations on pumps and fans are 1-3 years, making them one of the most cost-effective energy efficiency measures available."
  }
];

const MOETModule3Section2_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section2">
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
            <span>Module 3.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Variable Speed Drives and Soft Starters
          </h1>
          <p className="text-white/80">
            VSD/VFD architecture, V/f and vector control, soft starter operation, harmonics, EMC and maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>VSD:</strong> Rectifier - DC bus - Inverter (IGBTs + PWM)</li>
              <li className="pl-1"><strong>V/f control:</strong> Constant torque up to base speed (50 Hz)</li>
              <li className="pl-1"><strong>Soft starter:</strong> Thyristor voltage ramp, bypass at speed</li>
              <li className="pl-1"><strong>Safety:</strong> DC bus holds lethal charge after isolation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Prevalence:</strong> VSDs standard in all modern buildings</li>
              <li className="pl-1"><strong>Energy savings:</strong> 30-50% on fans and pumps via cube law</li>
              <li className="pl-1"><strong>Maintenance:</strong> Fan/filter cleaning prevents 80% of trips</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to electrical plant and motor control KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the internal architecture of a variable speed drive (rectifier, DC bus, inverter)",
              "Explain V/f control and sensorless vector control principles",
              "Describe soft starter operation using thyristor phase angle control",
              "Outline the commissioning and parameter setup process for VSDs",
              "Explain the effects of harmonics and EMC requirements for VSD installations",
              "Describe maintenance procedures including fan filters, capacitors and safety precautions"
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

        {/* Section 01: Variable Speed Drive Architecture */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Variable Speed Drive Architecture
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A variable speed drive (VSD), also called a variable frequency drive (VFD) or simply an inverter, controls the speed of an AC induction motor by varying both the frequency and voltage of the supply to the motor. Since motor speed is directly proportional to the supply frequency (Speed = 120f/P), controlling the frequency controls the speed.
            </p>
            <p>
              The VSD consists of three main power stages:
            </p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VSD Power Stages</p>
              <ul className="text-sm text-white space-y-2 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Rectifier (AC to DC):</strong> Converts the incoming three-phase AC supply (50 Hz, 400 V) to DC using a six-pulse diode bridge rectifier. The output is a pulsating DC voltage with a peak value of approximately 565 V (400 x 1.414). The rectifier is a passive component with no moving parts.</li>
                <li className="pl-1"><strong>DC Bus (Smoothing):</strong> Large electrolytic capacitors smooth the pulsating DC into a stable DC voltage. The DC bus also provides energy storage for dynamic braking and smooths out transient loads. The DC bus voltage is a key diagnostic parameter -- it should read approximately 565-580 V DC for a 400 V supply.</li>
                <li className="pl-1"><strong>Inverter (DC to AC):</strong> Uses six insulated gate bipolar transistors (IGBTs) switching at high frequency (typically 2-16 kHz) to synthesise a variable-frequency, variable-voltage AC output using pulse width modulation (PWM). The output waveform approximates a sine wave when averaged over time.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">V/f Control</h3>
              <p className="text-sm text-white mb-3">
                V/f (voltage-to-frequency) control maintains a constant ratio of voltage to frequency to keep the motor magnetic flux constant. At 50 Hz and 400 V, the ratio is 8 V/Hz. At 25 Hz, the voltage is reduced to 200 V to maintain the same ratio. This provides approximately constant torque throughout the speed range up to base speed (50 Hz).
              </p>
              <p className="text-sm text-white">
                Above base speed, the voltage remains at maximum while frequency continues to increase, resulting in reduced torque -- this region is called field weakening. V/f control is suitable for simple applications such as fans, pumps and conveyors where precise speed regulation is not critical.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Sensorless Vector Control</h3>
              <p className="text-sm text-white">
                Sensorless vector control uses a mathematical model of the motor to independently control torque and flux without a shaft encoder. This provides better speed regulation (typically plus or minus 0.5% of set speed), improved low-speed torque (down to approximately 3% of base speed), faster dynamic response to load changes, and more precise speed control. Modern VSDs often offer both V/f and vector modes, selectable via configuration parameters.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Understanding the three-stage architecture is essential for VSD fault diagnosis. A DC bus voltage reading tells you whether the rectifier and supply are healthy. An output frequency reading tells you whether the inverter is responding to the speed reference. These are the first two diagnostic checks for any VSD fault.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Soft Starter Operation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Soft Starter Operation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A soft starter provides a controlled voltage ramp during motor starting, reducing starting current and mechanical stress on the driven equipment. Unlike a VSD, a soft starter does not vary the frequency -- it only varies the voltage amplitude during starting and stopping. Once the motor is up to speed, the soft starter typically bypasses its power electronics using an internal contactor and connects the motor directly to the full supply voltage.
            </p>
            <p>
              Soft starters use back-to-back thyristors (SCRs) on each of the three phases. By controlling the firing angle of the thyristors, the effective voltage applied to the motor is varied from a low initial level to full supply voltage over an adjustable ramp time.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Adjustable Parameters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Starting Voltage (Initial Kick):</strong> Adjustable from approximately 30% to 80% of line voltage. Set high enough to overcome static friction and start the motor rotating.</li>
                <li className="pl-1"><strong>Ramp Time:</strong> Adjustable from 1 to 60 seconds. Determines the acceleration rate. Longer ramps give smoother starts but extend the starting period.</li>
                <li className="pl-1"><strong>Current Limit:</strong> Adjustable from 150% to 500% of FLC. Limits the maximum starting current regardless of ramp setting.</li>
                <li className="pl-1"><strong>Soft Stop:</strong> Provides a controlled deceleration ramp, useful for pumps to prevent water hammer (the pressure surge caused by sudden flow stoppage).</li>
              </ul>
            </div>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">VSD</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Soft Starter</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Speed control</td>
                      <td className="border border-white/10 px-3 py-2">Continuous variable speed</td>
                      <td className="border border-white/10 px-3 py-2">Full speed only (after ramp)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control method</td>
                      <td className="border border-white/10 px-3 py-2">Frequency and voltage</td>
                      <td className="border border-white/10 px-3 py-2">Voltage only (phase angle)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Semiconductor</td>
                      <td className="border border-white/10 px-3 py-2">IGBTs in inverter</td>
                      <td className="border border-white/10 px-3 py-2">Back-to-back thyristors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy savings</td>
                      <td className="border border-white/10 px-3 py-2">Significant (cube law)</td>
                      <td className="border border-white/10 px-3 py-2">Minimal (reduced start only)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost</td>
                      <td className="border border-white/10 px-3 py-2">Higher</td>
                      <td className="border border-white/10 px-3 py-2">Lower</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Soft starters are simpler and less expensive than VSDs. They are ideal for applications that need reduced starting current and smooth acceleration but do not require variable speed operation, such as pumps, fans, compressors and conveyors that run at a single speed.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Commissioning and Parameter Setup */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Commissioning and Parameter Setup
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commissioning a VSD requires entering the motor nameplate data and configuring the application parameters. Essential motor parameters include rated voltage, rated current, rated frequency, rated speed, rated power, and number of poles. Entering accurate data is critical for proper motor protection and control performance.
            </p>
            <p>
              Many modern VSDs include an auto-tune function that measures the motor's electrical parameters (stator resistance, inductance, back-EMF constant) by running a brief test sequence. This optimises the VSD's internal motor model for better performance, particularly in vector control mode.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Application Parameters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Acceleration time:</strong> Typically 5-30 seconds depending on load inertia. Too fast causes overcurrent trips; too slow wastes energy.</li>
                <li className="pl-1"><strong>Deceleration time:</strong> Typically 5-30 seconds. Too fast causes overvoltage trips from regenerative energy feeding back to the DC bus.</li>
                <li className="pl-1"><strong>Minimum/maximum frequency:</strong> Sets the speed range (e.g., 15 Hz to 50 Hz for a fan application to prevent operation below the motor's cooling threshold).</li>
                <li className="pl-1"><strong>Control mode:</strong> V/f for simple pump/fan loads; vector for precise speed control or applications needing high low-speed torque.</li>
                <li className="pl-1"><strong>I/O configuration:</strong> Digital and analogue inputs/outputs for start/stop signals, speed reference (0-10 V or 4-20 mA), feedback signals, and fault/status outputs.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Pre-commissioning Checks</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Supply voltage:</strong> Confirm all three phases are present and within the VSD's rated range (typically plus or minus 10%)</li>
                <li className="pl-1"><strong>Motor insulation:</strong> Test insulation resistance with motor cables disconnected from VSD output</li>
                <li className="pl-1"><strong>Cable screening:</strong> Verify screened motor cable with 360-degree termination at both ends</li>
                <li className="pl-1"><strong>Earth connections:</strong> Confirm motor earth, VSD earth and cable screen earth are correctly connected</li>
                <li className="pl-1"><strong>Motor rotation:</strong> Run briefly at low speed to confirm correct rotation direction before full commissioning</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Always back up drive parameters to a laptop, USB drive or the manufacturer's commissioning software after commissioning. If the drive needs replacing, the parameters can be downloaded to the replacement unit, saving hours of recommissioning time.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Harmonics and EMC Compliance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Harmonics and EMC Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              VSDs generate harmonic currents that flow back into the supply network. The rectifier stage draws non-sinusoidal current, producing predominantly 5th (250 Hz), 7th (350 Hz), 11th (550 Hz) and 13th (650 Hz) harmonics. These harmonics can cause overheating of transformers and neutral conductors, nuisance tripping of protective devices, interference with sensitive electronic equipment, and increased losses in the distribution system.
            </p>
            <p>
              Engineering Recommendation G5/4-1 sets limits on the harmonic emissions from installations connected to the public supply network. Mitigation measures include:
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Harmonic Mitigation Methods</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>DC bus chokes:</strong> Reduce harmonic current by 30-40%. Fitted inside the drive or as an external option.</li>
                <li className="pl-1"><strong>Line reactors:</strong> 3-5% impedance reactors, typically fitted to drives above 30 kW.</li>
                <li className="pl-1"><strong>Passive harmonic filters:</strong> Tuned LC filters targeting specific harmonic frequencies.</li>
                <li className="pl-1"><strong>Active front-end drives:</strong> Use an active rectifier (IGBT-based) instead of diodes to draw near-sinusoidal current. Most effective but most expensive option.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">EMC Installation Requirements</h3>
              <p className="text-sm text-white mb-3">
                EMC (electromagnetic compatibility) requirements under the EMC Directive 2014/30/EU mean that VSD installations must not cause electromagnetic interference with other equipment. This requires:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Screened motor cables with 360-degree cable gland termination at both ends</li>
                <li className="pl-1">Correct segregation of power and signal cables (minimum 300 mm separation)</li>
                <li className="pl-1">Input EMC filter on the VSD supply</li>
                <li className="pl-1">Output choke or du/dt filter for long motor cable runs</li>
                <li className="pl-1">Compliance with the VSD manufacturer's EMC installation guidelines</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common EMC Issues</p>
              <p className="text-sm text-white">
                Poor EMC practice in VSD installations is one of the most common causes of intermittent control system faults. PLC analogue inputs reading erratically, communication bus dropouts, nuisance RCD tripping and temperature transmitter fluctuations are all symptoms of inadequate EMC measures. When replacing a VSD or modifying a panel containing VSDs, always reinstall EMC filters and maintain cable screening.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> EMC compliance is not optional. Failure to follow the manufacturer's EMC installation guidelines can cause widespread interference affecting not just the VSD circuit but the entire installation and even neighbouring premises.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: Maintenance and Safety */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Maintenance and Safety
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Safety Warning</p>
              <p className="text-sm text-white">
                DC bus capacitors retain a lethal charge after the drive is isolated from the supply. Allow at least 5 minutes (check manufacturer's data -- some larger drives require longer) before opening the drive enclosure. Verify the DC bus voltage has discharged to below 50 V using a multimeter rated for the voltage before touching any internal components. Never perform insulation resistance testing on a motor while it is connected to a VSD -- the 500 V DC test voltage will destroy the IGBT output stage.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Preventive Maintenance Schedule</p>
              <ul className="text-sm text-white space-y-2 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cooling fans:</strong> Internal fans are the most common failure point. Check fans are running during every visit. Clean or replace air filters every 6-12 months depending on the environment. Blocked filters are the number one cause of VSD overtemperature trips.</li>
                <li className="pl-1"><strong>DC bus capacitors:</strong> Electrolytic capacitors have a finite life (typically 5-10 years). Capacitor degradation causes DC bus voltage ripple, reduced ride-through capability, and eventual drive failure. Some drives monitor capacitor health and provide early warnings.</li>
                <li className="pl-1"><strong>Firmware updates:</strong> Manufacturers periodically release firmware updates to fix bugs and add features. Update during planned maintenance windows following the manufacturer's documented procedure.</li>
                <li className="pl-1"><strong>Parameter backup:</strong> Always back up drive parameters to a laptop, USB drive or the manufacturer's commissioning software before any maintenance. If the drive needs replacing, the parameters can be downloaded to the replacement unit.</li>
                <li className="pl-1"><strong>Thermal imaging:</strong> Check power connections for hot spots during routine thermographic surveys. High-frequency PWM output cables are particularly prone to heating at poor connections or where screen terminations are inadequate.</li>
                <li className="pl-1"><strong>Connection checks:</strong> Torque-check all power connections annually. Vibration from the drive's cooling fan and thermal cycling can loosen connections over time.</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common VSD Fault Codes</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Overcurrent:</strong> Acceleration too fast, motor fault, short circuit</li>
                  <li className="pl-1"><strong>Overvoltage:</strong> Deceleration too fast, regenerative energy</li>
                  <li className="pl-1"><strong>Overtemperature:</strong> Blocked filters, failed fan, high ambient</li>
                  <li className="pl-1"><strong>Earth fault:</strong> Motor insulation failure, cable damage</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Replacement Procedure</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Download parameters from failed drive (if possible)</li>
                  <li className="pl-1">Isolate, lock off, prove dead, wait for DC bus discharge</li>
                  <li className="pl-1">Install replacement with identical rating and firmware</li>
                  <li className="pl-1">Upload saved parameters or recommission from scratch</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians are expected to understand VSD and soft starter operation, carry out preventive maintenance, interpret fault codes, and perform basic commissioning. These are core competence requirements for the electrical maintenance pathway.
            </p>
          </div>
        </section>

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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">VSD Architecture</p>
                <ul className="space-y-0.5">
                  <li>Rectifier = Diode bridge (AC to DC)</li>
                  <li>DC Bus = Capacitors (565 V DC for 400 V supply)</li>
                  <li>Inverter = IGBTs + PWM (DC to variable AC)</li>
                  <li>V/f = constant torque up to base speed</li>
                  <li>Vector = precise speed and torque control</li>
                  <li>Switching frequency = 2-16 kHz typical</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Safety and Maintenance</p>
                <ul className="space-y-0.5">
                  <li>DC bus = lethal voltage after isolation</li>
                  <li>Wait 5+ minutes, verify below 50 V</li>
                  <li>Disconnect motor before IR testing</li>
                  <li>Fan/filter maintenance every 6-12 months</li>
                  <li>Capacitor life = 5-10 years typical</li>
                  <li>Screened motor cable with 360-degree termination</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

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
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: Star-Delta Starters
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section2-5">
              Next: Motor Maintenance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section2_4;
