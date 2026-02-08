import { ArrowLeft, Cog, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Common Faults in Motors and Drives - MOET Module 4 Section 3.4";
const DESCRIPTION = "Typical motor and drive faults, causes and diagnostic techniques including winding faults, bearing failure, VSD fault codes, single-phasing and overheating for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "single-phasing",
    question: "What happens to a three-phase motor when one phase is lost (single-phasing)?",
    options: [
      "The motor stops instantly with no damage",
      "The motor continues running but draws increased current on the remaining phases, causing overheating and potential winding damage",
      "The motor reverses direction",
      "The motor speeds up to compensate"
    ],
    correctIndex: 1,
    explanation: "A running three-phase motor that loses one phase will attempt to continue running as a single-phase motor, but it draws significantly increased current (up to 2-3 times normal) on the remaining two phases. This rapidly overheats the windings and will cause insulation failure if the overload protection does not disconnect the motor quickly enough."
  },
  {
    id: "bearing-noise",
    question: "A motor is producing a grinding or rumbling noise that increases with speed. The most likely cause is:",
    options: [
      "An electrical fault in the stator windings",
      "Worn or damaged bearings",
      "Incorrect supply voltage",
      "A broken rotor bar"
    ],
    correctIndex: 1,
    explanation: "Grinding, rumbling or growling noises that are speed-dependent are characteristic of bearing faults. As bearings wear, the rolling elements or races develop surface damage (pitting, spalling) that produces vibration and noise. Bearing noise increases with speed because the rolling elements are rotating faster over the damaged surfaces."
  },
  {
    id: "vsd-overcurrent",
    question: "A variable speed drive (VSD) trips on 'overcurrent' during motor acceleration. The FIRST diagnostic step should be:",
    options: [
      "Replace the drive with a larger rated unit",
      "Check the motor for mechanical binding, verify the acceleration ramp time is adequate, and check for cable or motor insulation faults",
      "Increase the overcurrent trip setting",
      "Bypass the drive and connect the motor direct-on-line"
    ],
    correctIndex: 1,
    explanation: "An overcurrent trip during acceleration has several possible causes: the motor is mechanically bound or overloaded (requiring high torque), the acceleration ramp time is too short (causing excessive current), or there is a cable or motor winding fault (earth fault or short circuit). Diagnose the cause before taking action — increasing the trip setting or using a larger drive may mask a serious underlying fault."
  },
  {
    id: "insulation-class",
    question: "A motor's insulation class determines:",
    options: [
      "The colour of the motor housing",
      "The maximum operating temperature the winding insulation can withstand",
      "The motor's starting torque",
      "The minimum supply voltage"
    ],
    correctIndex: 1,
    explanation: "The insulation class (B, F, or H being the most common) defines the maximum temperature the winding insulation can tolerate continuously. Class B allows 130 degrees C, Class F allows 155 degrees C, and Class H allows 180 degrees C. Exceeding the insulation class temperature accelerates insulation degradation — for every 10 degrees C above the rated temperature, insulation life is approximately halved."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The most common cause of electric motor failure is:",
    options: [
      "Manufacturing defects",
      "Bearing failure (mechanical) or insulation breakdown (electrical)",
      "Incorrect motor selection",
      "Power supply transients"
    ],
    correctAnswer: 1,
    explanation: "Studies consistently show that bearing failure and insulation breakdown are the two most common causes of motor failure, together accounting for approximately 80% of all motor faults. Bearing failure is often caused by misalignment, over-greasing or contamination. Insulation breakdown results from overheating, moisture, voltage stress or ageing."
  },
  {
    id: 2,
    question: "An insulation resistance test on a motor winding reads 0.3 MΩ at 500 V DC. This indicates:",
    options: [
      "The motor is in excellent condition",
      "The winding insulation has degraded below the minimum acceptable level and the motor should not be energised",
      "The reading is normal for a motor of this age",
      "The test was performed incorrectly"
    ],
    correctAnswer: 1,
    explanation: "The minimum acceptable insulation resistance for a motor winding tested at 500 V DC is 1 MΩ (as per BS 7671 and IEEE 43 guidance). A reading of 0.3 MΩ indicates significantly degraded insulation that could lead to earth faults, short circuits or complete winding failure if energised. The motor requires investigation — possible causes include moisture ingress, contamination or thermal degradation."
  },
  {
    id: 3,
    question: "Phase current imbalance of more than 10% on a three-phase motor can indicate:",
    options: [
      "Normal operating variation",
      "A developing winding fault such as shorted turns, or a supply voltage imbalance",
      "The motor is running at full load",
      "The motor bearings need lubrication"
    ],
    correctAnswer: 1,
    explanation: "A phase current imbalance exceeding 10% is abnormal and suggests either a supply voltage imbalance (each 1% voltage imbalance causes approximately 6-10% current imbalance) or a developing winding fault such as shorted turns in one phase. Measuring both the supply voltages and motor currents on all three phases helps differentiate between supply and motor faults."
  },
  {
    id: 4,
    question: "A VSD displays fault code 'earth fault' (EF). This means:",
    options: [
      "The earth connection to the drive enclosure is loose",
      "The drive has detected current flowing to earth through the motor cable or motor windings",
      "The supply earth is missing",
      "The drive firmware needs updating"
    ],
    correctAnswer: 1,
    explanation: "An earth fault code on a VSD means the drive's internal current sensors have detected an imbalance indicating current is flowing to earth. This is typically caused by insulation failure in the motor cable or motor windings, or moisture ingress into the motor terminal box. The cable and motor insulation resistance should be tested before re-energising."
  },
  {
    id: 5,
    question: "Shaft current damage (fluting) in motor bearings is commonly caused by:",
    options: [
      "Excessive mechanical load",
      "High-frequency voltage pulses from a VSD inducing current through the motor bearings",
      "Lack of lubrication",
      "Misalignment of the motor shaft"
    ],
    correctAnswer: 1,
    explanation: "Variable speed drives produce high-frequency PWM switching voltages that can induce a common-mode voltage on the motor shaft. This voltage periodically discharges through the bearings to the motor frame, causing electrical discharge machining (EDM) of the bearing surfaces. The characteristic damage pattern is 'fluting' — parallel grooves in the bearing races. Shaft earthing brushes or insulated bearings are used as preventive measures."
  },
  {
    id: 6,
    question: "A motor overload relay is set to 1.05 times the motor full load current (FLC). If the motor FLC is 20 A, the overload should trip if current exceeds:",
    options: [
      "20 A",
      "21 A sustained over the relay's thermal time curve",
      "25 A",
      "30 A"
    ],
    correctAnswer: 1,
    explanation: "The overload setting of 1.05 times 20 A = 21 A. The relay will trip when the current exceeds this value for a duration determined by its time-current characteristic curve. A momentary current spike (such as starting current) will not trip the relay because the thermal element takes time to heat up. The overload protects against sustained overcurrent that would overheat the motor windings."
  },
  {
    id: 7,
    question: "A direct-on-line (DOL) started motor draws approximately 6-8 times its full load current during starting. This is:",
    options: [
      "A fault condition requiring investigation",
      "Normal behaviour — the high starting current (locked rotor current) is needed to develop starting torque",
      "Caused by a winding fault",
      "Due to low supply voltage"
    ],
    correctAnswer: 1,
    explanation: "A three-phase induction motor typically draws 6-8 times its rated full load current during DOL starting. This locked rotor current (LRC) is a normal characteristic caused by the high slip at standstill — the rotor is stationary relative to the rotating magnetic field, inducing maximum current. The current drops to normal as the motor accelerates. This is why star-delta or soft starters are used for larger motors."
  },
  {
    id: 8,
    question: "A VSD 'overvoltage' fault during motor deceleration is typically caused by:",
    options: [
      "The supply voltage being too high",
      "The motor acting as a generator during deceleration, pumping energy back into the drive DC bus",
      "A short circuit in the motor cable",
      "The drive being oversized for the motor"
    ],
    correctAnswer: 1,
    explanation: "During deceleration, the motor's inertia drives it faster than the rotating field, causing it to act as a generator. This regenerated energy flows back into the drive's DC bus, raising the voltage. If the deceleration is too rapid or the DC bus capacitors cannot absorb the energy, the bus voltage exceeds the overvoltage threshold and the drive trips. Solutions include longer deceleration ramps, braking resistors or regenerative drives."
  },
  {
    id: 9,
    question: "Megger testing a motor winding immediately after shutdown shows 50 MΩ. The same motor tested cold shows 200 MΩ. This difference is because:",
    options: [
      "The tester is faulty",
      "Insulation resistance decreases as temperature increases — the hot motor has lower insulation resistance",
      "The motor has developed a fault between the two tests",
      "The test leads were reversed"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance is inversely related to temperature — as temperature increases, insulation resistance decreases. A warm or hot motor will always show a lower insulation resistance than the same motor when cold. This is normal and must be considered when interpreting readings. Standard practice is to correct readings to a reference temperature (typically 40 degrees C) for comparison purposes."
  },
  {
    id: 10,
    question: "A motor vibrates excessively after a bearing replacement. The most likely cause is:",
    options: [
      "The new bearings are faulty",
      "Misalignment between the motor shaft and the driven equipment during reassembly",
      "The motor needs to be rewound",
      "The supply frequency has changed"
    ],
    correctAnswer: 1,
    explanation: "Misalignment is the most common cause of vibration after maintenance work. When bearings are replaced, the motor is disconnected from the driven load. If the motor and load are not correctly realigned during reassembly, angular or parallel misalignment causes vibration, premature bearing wear and coupling damage. Laser alignment tools provide the most accurate alignment."
  },
  {
    id: 11,
    question: "A VSD 'short circuit' or 'IGBT fault' typically indicates:",
    options: [
      "The motor cable is too long",
      "Failure of one or more output transistors (IGBTs) within the drive, or a very low impedance fault on the output",
      "The motor is too small for the application",
      "The input supply fuses need replacing"
    ],
    correctAnswer: 1,
    explanation: "An IGBT fault code indicates that the drive has detected a shoot-through or desaturation condition in its output power stage, suggesting an IGBT has failed short-circuit, or there is a very low impedance fault (short circuit) on the drive output. This requires investigation of both the drive output stage and the motor/cable insulation before re-energising."
  },
  {
    id: 12,
    question: "To check for broken rotor bars in a squirrel-cage motor, you would use:",
    options: [
      "An insulation resistance test",
      "Motor current signature analysis (MCSA) or a growler test on the removed rotor",
      "A continuity test on the stator windings",
      "A phase rotation meter"
    ],
    correctAnswer: 1,
    explanation: "Broken rotor bars cannot be detected by standard stator winding tests. Motor current signature analysis (MCSA) measures the stator current spectrum while the motor is running — broken rotor bars produce characteristic sideband frequencies around the supply frequency. Alternatively, a growler or rotor bar test can be performed on a removed rotor. Symptoms include reduced torque, increased slip, vibration and elevated current."
  }
];

const faqs = [
  {
    question: "How can I tell the difference between a motor fault and a supply fault?",
    answer: "Measure the supply voltage at the motor terminals on all three phases while the motor is disconnected. If the voltages are balanced and at the correct level, the supply is healthy and the fault is in the motor. If the voltages are unbalanced or abnormal, the supply is the issue. Also measure the motor winding resistances — they should be equal across all three phases. An imbalance greater than 2% suggests a winding fault."
  },
  {
    question: "Why do motors driven by VSDs have a higher failure rate than direct-on-line motors?",
    answer: "VSDs produce fast-switching PWM waveforms with steep voltage rise times (dV/dt). These voltage spikes stress the motor insulation, particularly the first few turns of the stator winding. They also induce shaft voltages that can damage bearings. Motors specified for VSD duty (inverter-rated motors) have enhanced insulation systems and may include shaft earthing brushes to mitigate these effects."
  },
  {
    question: "What is the significance of motor nameplate data during fault finding?",
    answer: "The nameplate provides the baseline against which you compare measured values. The rated voltage and current tell you what the motor should be drawing under full load. The insulation class tells you the maximum safe operating temperature. The rated speed tells you the normal slip. Any significant deviation from nameplate values during operation indicates a potential fault condition."
  },
  {
    question: "Should I test a motor in situ or remove it for workshop testing?",
    answer: "Initial tests (insulation resistance, winding resistance, supply voltage) can and should be done in situ. If these indicate a motor fault, further investigation may require removal — particularly for bearing inspection, rotor testing or detailed winding analysis. However, remember that removing and reinstalling a motor introduces risks of misalignment and connection errors, so only remove if the in-situ tests justify it."
  },
  {
    question: "How do VSD fault codes relate to actual system faults?",
    answer: "VSD fault codes indicate what the drive detected, not necessarily the root cause. An 'overcurrent' trip could be caused by a motor fault, cable fault, mechanical overload or incorrect drive parameters. An 'earth fault' could be in the motor, cable or even the drive itself. Always use the fault code as a starting point for investigation, not a definitive diagnosis. The drive manual will list possible causes for each fault code."
  }
];

const MOETModule4Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Cog className="h-4 w-4" />
            <span>Module 4.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Common Faults in Motors and Drives
          </h1>
          <p className="text-white/80">
            Typical motor and drive faults, their causes, symptoms and diagnostic techniques
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Bearings:</strong> ~40% of motor failures — noise, vibration, overheating</li>
              <li className="pl-1"><strong>Windings:</strong> ~30% — insulation breakdown, shorted turns, earth faults</li>
              <li className="pl-1"><strong>Single-phasing:</strong> Loss of one phase causes overheating and damage</li>
              <li className="pl-1"><strong>VSD faults:</strong> Overcurrent, overvoltage, earth fault, IGBT failure</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Nameplate data:</strong> Baseline for all diagnostic comparisons</li>
              <li className="pl-1"><strong>Current balance:</strong> More than 10% imbalance = investigation needed</li>
              <li className="pl-1"><strong>IR testing:</strong> Motor windings minimum 1 MΩ at 500 V DC</li>
              <li className="pl-1"><strong>ST1426:</strong> Motor and drive diagnostics are core KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the common causes and symptoms of motor bearing failure",
              "Diagnose stator winding faults using insulation resistance and winding resistance tests",
              "Recognise the symptoms and dangers of single-phasing in three-phase motors",
              "Interpret variable speed drive fault codes and relate them to system conditions",
              "Carry out initial motor diagnostics including current measurement and phase balance checks",
              "Understand the effects of VSD operation on motor insulation and bearings"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Motor Bearing Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Bearing failure is the single most common cause of electric motor breakdown, accounting for approximately 40 to 50 percent of all motor faults. Bearings are the mechanical interface between the stationary stator and the rotating rotor, supporting the shaft while allowing free rotation. When bearings fail, the consequences range from increased noise and vibration to catastrophic seizure that can damage the rotor, stator and driven equipment.
            </p>
            <p>
              Understanding bearing failure modes, their symptoms and causes is essential for any maintenance technician working with rotating machinery. Early detection of bearing deterioration through condition monitoring (vibration analysis, temperature measurement and noise assessment) can prevent unplanned failures and the significant costs associated with them.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Bearing Failure Modes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Failure Mode</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symptoms</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common Causes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fatigue spalling</td>
                      <td className="border border-white/10 px-3 py-2">Increasing vibration, rumbling noise, metallic particles in grease</td>
                      <td className="border border-white/10 px-3 py-2">Normal wear, excessive load, misalignment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Contamination</td>
                      <td className="border border-white/10 px-3 py-2">Grinding noise, premature wear, discoloured grease</td>
                      <td className="border border-white/10 px-3 py-2">Dust, moisture, incorrect grease, seal failure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical discharge (fluting)</td>
                      <td className="border border-white/10 px-3 py-2">High-frequency whine, parallel grooves in bearing races</td>
                      <td className="border border-white/10 px-3 py-2">VSD-induced shaft voltages, poor earthing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Overheating</td>
                      <td className="border border-white/10 px-3 py-2">Excessive bearing temperature, discoloured (blue/brown) races</td>
                      <td className="border border-white/10 px-3 py-2">Over-greasing, under-greasing, excessive load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Misalignment damage</td>
                      <td className="border border-white/10 px-3 py-2">Uneven wear pattern, vibration at 1x and 2x shaft speed</td>
                      <td className="border border-white/10 px-3 py-2">Shaft misalignment with driven equipment, incorrect bearing fit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bearing Diagnostic Techniques</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Vibration analysis:</strong> The most sensitive method — bearing defect frequencies appear at specific frequencies related to shaft speed, number of rolling elements and bearing geometry</li>
                <li className="pl-1"><strong>Temperature monitoring:</strong> Bearing temperature above 70 degrees C or more than 20 degrees C above ambient is abnormal for most applications</li>
                <li className="pl-1"><strong>Audible assessment:</strong> Listening with a stethoscope or ultrasonic detector can identify bearing noise before it becomes audible to the unaided ear</li>
                <li className="pl-1"><strong>Visual inspection:</strong> On disassembly, examine the races, rolling elements and cage for pitting, scoring, discolouration and wear patterns</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Over-greasing is as damaging as under-greasing. Excess grease prevents heat dissipation and increases internal friction. Follow the manufacturer's lubrication schedule and use the specified grease type and quantity. More is not better.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Stator Winding Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Stator winding faults account for approximately 30 to 40 percent of motor failures. The stator winding consists of insulated copper conductors arranged in slots around the stator core. The insulation system — a combination of enamel coating on the wire, slot liners, phase-to-phase insulation and varnish impregnation — is the most vulnerable element. When the insulation fails, current flows through unintended paths, causing overheating, arcing and ultimately catastrophic failure.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Winding Fault</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Earth fault (ground fault):</strong> Insulation failure between a winding conductor and the stator core (earth). Detected by insulation resistance testing — reading below 1 MΩ at 500 V DC</li>
                <li className="pl-1"><strong>Shorted turns (turn-to-turn):</strong> Insulation failure between adjacent turns within the same coil. Causes localised overheating and increased current in the affected phase. Detected by winding resistance comparison between phases</li>
                <li className="pl-1"><strong>Phase-to-phase short:</strong> Insulation failure between conductors of different phases. Causes high circulating currents and rapid overheating. Detected by insulation resistance testing between phases</li>
                <li className="pl-1"><strong>Open circuit:</strong> Complete break in a winding conductor. The motor will not start (if all three phases are open) or will single-phase (if one phase is open). Detected by continuity testing</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Diagnostic Tests for Winding Faults</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Insulation resistance (IR):</strong> Phase-to-earth and phase-to-phase at 500 V DC. Minimum 1 MΩ, but healthy motors typically read hundreds of MΩ</li>
                <li className="pl-1"><strong>Winding resistance:</strong> Measure the DC resistance of each phase winding using a low-resistance ohmmeter. All three phases should be within 2% of each other. Greater imbalance suggests shorted turns</li>
                <li className="pl-1"><strong>Current balance:</strong> With the motor running, measure the current on each phase. More than 10% imbalance suggests a winding fault (if supply voltages are balanced)</li>
                <li className="pl-1"><strong>Surge comparison test:</strong> A specialist test that detects turn-to-turn faults by comparing the voltage waveform response of each phase to an identical surge pulse</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The 10 Degree Rule</p>
              <p className="text-sm text-white">
                For every 10 degrees Celsius that the winding temperature exceeds its insulation class rating, the insulation life is approximately halved. A Class F motor (rated 155 degrees C) operating at 165 degrees C will have roughly half its expected insulation life. This is why overheating — from overload, poor ventilation, high ambient temperature or single-phasing — is the primary cause of insulation failure.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Always measure insulation resistance with the motor disconnected from the drive or starter. VSD output filters, surge suppressors and the drive's internal components can mask a motor winding fault if the measurement is taken at the drive end.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Variable Speed Drive Faults
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Variable speed drives (VSDs), also called variable frequency drives (VFDs) or inverters, are now the standard method for controlling motor speed in industrial applications. They convert the fixed-frequency AC supply into a variable-frequency, variable-voltage output using power electronic switching (IGBTs). While VSDs offer enormous energy savings and process control benefits, they also introduce specific fault conditions that maintenance technicians must understand.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common VSD Fault Codes and Causes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Fault Code</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Meaning</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Common Causes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Overcurrent (OC)</td>
                      <td className="border border-white/10 px-3 py-2">Output current exceeded threshold</td>
                      <td className="border border-white/10 px-3 py-2">Mechanical overload, cable/motor fault, short ramp time</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Overvoltage (OV)</td>
                      <td className="border border-white/10 px-3 py-2">DC bus voltage exceeded threshold</td>
                      <td className="border border-white/10 px-3 py-2">Regeneration during deceleration, supply voltage high</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Earth fault (EF)</td>
                      <td className="border border-white/10 px-3 py-2">Current to earth detected</td>
                      <td className="border border-white/10 px-3 py-2">Motor/cable insulation failure, moisture ingress</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Overtemperature (OT)</td>
                      <td className="border border-white/10 px-3 py-2">Drive heatsink temperature exceeded limit</td>
                      <td className="border border-white/10 px-3 py-2">Blocked ventilation, high ambient, fan failure, overload</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Undervoltage (UV)</td>
                      <td className="border border-white/10 px-3 py-2">DC bus voltage dropped below minimum</td>
                      <td className="border border-white/10 px-3 py-2">Supply dip, input fuse blown, poor supply connection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              When diagnosing VSD faults, always check the fault history log first. Most drives store the last 8 to 20 fault events with timestamps and operating data (current, voltage, frequency, temperature) at the time of the trip. This data is enormously helpful — for example, an overcurrent trip at 3 Hz during acceleration suggests a different cause than the same trip at 50 Hz under steady-state load.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VSD Diagnostic Approach</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Read the fault code:</strong> Identify the specific fault type and check the manufacturer's manual for detailed explanations</li>
                <li className="pl-1"><strong>Review the fault log:</strong> Check the history — is this a recurring fault? What were the conditions each time?</li>
                <li className="pl-1"><strong>Check the supply:</strong> Measure input voltages for balance and correct level</li>
                <li className="pl-1"><strong>Check the output:</strong> With the motor disconnected, measure the insulation resistance of the motor cable and motor windings</li>
                <li className="pl-1"><strong>Check the environment:</strong> Verify ventilation, ambient temperature, and cleanliness of the drive heatsink and fans</li>
                <li className="pl-1"><strong>Review parameters:</strong> Confirm motor data, acceleration/deceleration ramp times, and protection settings are correct for the application</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Warning:</strong> VSDs contain large DC bus capacitors that store dangerous energy even after the supply is disconnected. Always wait for the charge indicator to show safe levels (or measure the DC bus voltage directly) before opening a drive enclosure. Typical discharge times are 5 to 15 minutes, but can be longer on larger drives.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Motor Overheating and Thermal Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Overheating is the most damaging condition for an electric motor and is either the direct cause or a contributing factor in the majority of motor failures. The insulation system, bearings and lubricant are all temperature-sensitive, and sustained operation above their rated temperatures leads to accelerated degradation. As a maintenance technician, understanding the causes of motor overheating and the protection systems designed to prevent it is fundamental to effective fault diagnosis.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Causes of Motor Overheating</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Sustained overload:</strong> Mechanical load exceeding the motor's rated capacity, drawing excessive current</li>
                <li className="pl-1"><strong>Single-phasing:</strong> Loss of one supply phase causing remaining phases to carry increased current</li>
                <li className="pl-1"><strong>Voltage imbalance:</strong> Unequal supply voltages causing circulating currents in the rotor</li>
                <li className="pl-1"><strong>Blocked ventilation:</strong> Cooling fan failure, blocked air passages or filters, or incorrect installation restricting airflow</li>
                <li className="pl-1"><strong>Frequent starting:</strong> Each DOL start dissipates significant energy in the rotor — excessive starts per hour cause cumulative heating</li>
                <li className="pl-1"><strong>High ambient temperature:</strong> Motor installed in an environment above its rated ambient (typically 40 degrees C)</li>
                <li className="pl-1"><strong>Low-speed VSD operation:</strong> At low speeds, the integral cooling fan is less effective — external forced cooling may be required</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Protection Devices</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Bimetallic overload relay:</strong> Heats and trips based on current — provides inverse time characteristic</li>
                  <li className="pl-1"><strong>Electronic overload relay:</strong> Digital current monitoring with programmable curves and phase-loss detection</li>
                  <li className="pl-1"><strong>PTC thermistors:</strong> Embedded in the windings — resistance increases sharply at the trip temperature</li>
                  <li className="pl-1"><strong>PT100 sensors:</strong> Embedded resistance temperature detectors providing continuous temperature monitoring</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Diagnostic Checks</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Measure running current on all three phases — compare to nameplate FLC</li>
                  <li className="pl-1">Check supply voltage balance — less than 2% imbalance acceptable</li>
                  <li className="pl-1">Inspect cooling system — fan, shroud, air filters, ventilation clearances</li>
                  <li className="pl-1">Check ambient conditions — temperature, altitude, nearby heat sources</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> If a motor's overload relay keeps tripping, never simply increase the overload setting without investigating the cause. The overload is protecting the motor from damage — bypassing or increasing it removes that protection and will almost certainly lead to winding failure.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Practical Motor and Drive Diagnostic Workflow
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Bringing together the knowledge of motor and drive faults, here is a practical diagnostic workflow that you can apply to any motor or drive fault situation. This workflow follows the six-point technique introduced in Section 4.3.2, applied specifically to motors and drives.
            </p>

            <div className="my-6 space-y-3">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 1 — Gather Evidence</h3>
                <p className="text-sm text-white">
                  Interview the operator. Note the motor nameplate data. Check the VSD display for fault codes and review the fault history. Check the overload relay for trip indication. Note any unusual noise, smell, vibration or temperature.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 2 — Safe Isolation and Initial Measurements</h3>
                <p className="text-sm text-white">
                  Isolate the motor circuit. Prove dead at the motor terminals. Measure insulation resistance (phase-to-earth and phase-to-phase). Measure winding resistance on all three phases. Compare results to baseline values and acceptable limits.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 3 — Mechanical Assessment</h3>
                <p className="text-sm text-white">
                  If electrical tests are satisfactory, assess the mechanical condition. Can the shaft be turned freely by hand? Is there axial or radial play in the bearings? Is the coupling in good condition? Is the driven load free to move? Mechanical faults often present as electrical symptoms (overcurrent, overheating).
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 4 — Supply and Drive Checks</h3>
                <p className="text-sm text-white">
                  Verify supply voltage at the drive input on all three phases. Check for voltage balance. If a VSD is fitted, review parameters against the motor nameplate data. Confirm acceleration and deceleration ramp times are appropriate. Check drive ventilation and cooling.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 5 — Running Diagnostics</h3>
                <p className="text-sm text-white">
                  If safe to re-energise, measure running current on all three phases under normal load. Compare to nameplate FLC. Monitor temperature. Listen for unusual sounds. Measure vibration if equipment is available. These running measurements reveal faults that are not detectable when the motor is stationary.
                </p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Document every measurement, observation and action throughout the diagnostic process. This creates a complete audit trail that supports root cause analysis, informs future maintenance decisions, and demonstrates the systematic approach required by ST1426.
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
                <p className="font-medium text-white mb-1">Motor Diagnostic Tests</p>
                <ul className="space-y-0.5">
                  <li>Insulation resistance — min 1 MΩ at 500 V DC</li>
                  <li>Winding resistance — all phases within 2%</li>
                  <li>Current balance — less than 10% imbalance</li>
                  <li>Supply voltage balance — less than 2%</li>
                  <li>Bearing temperature — below 70 degrees C typical</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">VSD Fault Codes (Generic)</p>
                <ul className="space-y-0.5">
                  <li>OC — Overcurrent: check load, cable, motor</li>
                  <li>OV — Overvoltage: check ramp time, braking</li>
                  <li>EF — Earth fault: check motor/cable IR</li>
                  <li>OT — Overtemperature: check ventilation</li>
                  <li>UV — Undervoltage: check supply, fuses</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: Electrical Test Instruments
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3-5">
              Next: Control Circuit Faults
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section3_4;
