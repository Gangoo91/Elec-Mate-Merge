/**
 * Level 3 Module 3 Section 2.2 - Pure Inductance Circuits
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Pure Inductance Circuits - Level 3 Module 3 Section 2.2";
const DESCRIPTION = "Master inductive reactance calculations, understand energy storage in magnetic fields, and analyse phase relationships in pure inductive AC circuits.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "In a pure inductive AC circuit, what is the phase relationship between voltage and current?",
    options: [
      "Current leads voltage by 90 degrees",
      "Voltage leads current by 90 degrees",
      "Voltage and current are in phase",
      "They are 180 degrees out of phase"
    ],
    correctIndex: 1,
    explanation: "In a pure inductive circuit, voltage leads current by 90 degrees (or current lags voltage by 90 degrees). This is because the inductor opposes changes in current - the induced back-EMF responds to the rate of change of current, creating this phase shift."
  },
  {
    id: "check-2",
    question: "Calculate the inductive reactance of a 50mH inductor at 50Hz.",
    options: [
      "2.5 ohms",
      "15.7 ohms",
      "157 ohms",
      "0.157 ohms"
    ],
    correctIndex: 1,
    explanation: "Inductive reactance XL = 2 x pi x f x L = 2 x 3.142 x 50 x 0.050 = 15.7 ohms. Remember to convert mH to H (divide by 1000). This reactance limits current flow in the same way resistance does, but without dissipating power."
  },
  {
    id: "check-3",
    question: "What happens to inductive reactance if the supply frequency doubles?",
    options: [
      "It halves",
      "It stays the same",
      "It doubles",
      "It quadruples"
    ],
    correctIndex: 2,
    explanation: "Inductive reactance is directly proportional to frequency (XL = 2 x pi x f x L). If frequency doubles, XL doubles. This is why inductors offer low impedance to DC (f = 0) but increasingly high impedance to higher frequencies."
  },
  {
    id: "check-4",
    question: "In a pure inductive circuit, what is the average power dissipated?",
    options: [
      "Maximum power (P = VI)",
      "Half the maximum power",
      "Zero - power oscillates between source and inductor",
      "Depends on the inductance value"
    ],
    correctIndex: 2,
    explanation: "A pure inductor dissipates no real power. Energy is stored in the magnetic field during one quarter cycle, then returned to the source in the next quarter. The average (real) power is zero - only reactive power flows, measured in VAr."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A pure inductor of 0.1H is connected to a 230V, 50Hz supply. What current flows?",
    options: [
      "7.32A",
      "0.73A",
      "73.2A",
      "36.6A"
    ],
    correctAnswer: 0,
    explanation: "First calculate XL = 2 x pi x f x L = 2 x 3.142 x 50 x 0.1 = 31.42 ohms. Then I = V/XL = 230/31.42 = 7.32A. Note that this current lags the voltage by 90 degrees."
  },
  {
    id: 2,
    question: "What is the inductive reactance of a 200mH coil at 60Hz?",
    options: [
      "37.7 ohms",
      "75.4 ohms",
      "12.0 ohms",
      "188.5 ohms"
    ],
    correctAnswer: 1,
    explanation: "XL = 2 x pi x f x L = 2 x 3.142 x 60 x 0.200 = 75.4 ohms. At higher frequencies or with larger inductance values, the reactance increases, limiting current flow more effectively."
  },
  {
    id: 3,
    question: "An inductor draws 5A from a 230V, 50Hz supply. What is its inductance?",
    options: [
      "0.146H (146mH)",
      "0.073H (73mH)",
      "0.292H (292mH)",
      "14.6mH"
    ],
    correctAnswer: 0,
    explanation: "First find XL = V/I = 230/5 = 46 ohms. Then rearrange XL = 2 x pi x f x L to get L = XL/(2 x pi x f) = 46/(2 x 3.142 x 50) = 46/314.2 = 0.146H or 146mH."
  },
  {
    id: 4,
    question: "The phrase 'ELI the ICE man' helps remember phase relationships. What does 'ELI' represent?",
    options: [
      "Voltage leads current in capacitive circuits",
      "Voltage (E) leads current (I) in inductive (L) circuits",
      "Current leads voltage in inductive circuits",
      "Energy stored in inductors"
    ],
    correctAnswer: 1,
    explanation: "'ELI' means in an inductor (L), EMF/voltage (E) leads current (I). The voltage across an inductor reaches its peak before the current does - voltage leads by 90 degrees. This mnemonic is invaluable for remembering phase relationships."
  },
  {
    id: 5,
    question: "How much energy is stored in a 100mH inductor carrying 10A?",
    options: [
      "0.5J",
      "1.0J",
      "5.0J",
      "10.0J"
    ],
    correctAnswer: 2,
    explanation: "Energy stored in an inductor E = 0.5 x L x I squared = 0.5 x 0.1 x 10 squared = 0.5 x 0.1 x 100 = 5.0 Joules. This energy is stored in the magnetic field and released when current decreases."
  },
  {
    id: 6,
    question: "A coil has an inductance of 0.5H. What frequency would give it a reactance of 314 ohms?",
    options: [
      "50Hz",
      "100Hz",
      "200Hz",
      "60Hz"
    ],
    correctAnswer: 1,
    explanation: "Rearranging XL = 2 x pi x f x L gives f = XL/(2 x pi x L) = 314/(2 x 3.142 x 0.5) = 314/3.142 = 100Hz. This calculation is useful for designing frequency-selective circuits."
  },
  {
    id: 7,
    question: "What is the reactive power (VAr) in a circuit where a pure inductor draws 5A from a 230V supply?",
    options: [
      "0 VAr",
      "575 VAr",
      "1150 VAr",
      "2875 VAr"
    ],
    correctAnswer: 2,
    explanation: "For a pure inductor, reactive power Q = V x I = 230 x 5 = 1150 VAr. Since the phase angle is 90 degrees, sin(90) = 1, so all the apparent power is reactive. Real power = 0W."
  },
  {
    id: 8,
    question: "Which statement about inductors in DC circuits is correct?",
    options: [
      "They block DC completely",
      "They act as open circuits at steady state",
      "They act as short circuits at steady state",
      "They dissipate maximum power in DC"
    ],
    correctAnswer: 2,
    explanation: "At DC steady state (frequency = 0), XL = 2 x pi x 0 x L = 0 ohms. The inductor acts as a short circuit (just its DC resistance remains). Inductors only oppose changes in current - once current is steady, there is no opposition."
  },
  {
    id: 9,
    question: "An inductor has a reactance of 50 ohms at 50Hz. What is its reactance at 150Hz?",
    options: [
      "16.7 ohms",
      "50 ohms",
      "100 ohms",
      "150 ohms"
    ],
    correctAnswer: 3,
    explanation: "Since XL is directly proportional to frequency, tripling the frequency (50Hz to 150Hz) triples the reactance: 50 x 3 = 150 ohms. This frequency-dependent behaviour is fundamental to filter design."
  },
  {
    id: 10,
    question: "At what point in the AC cycle is maximum energy stored in an inductor?",
    options: [
      "When voltage is maximum",
      "When current is maximum",
      "When current is zero",
      "When voltage is zero"
    ],
    correctAnswer: 1,
    explanation: "Energy stored = 0.5 x L x I squared. Maximum energy occurs when current is maximum (positive or negative peak), not when voltage is maximum. The voltage and current are 90 degrees out of phase in a pure inductor."
  },
  {
    id: 11,
    question: "What is the power factor of a pure inductive circuit?",
    options: [
      "1 (unity)",
      "0.5 lagging",
      "0 lagging",
      "0 leading"
    ],
    correctAnswer: 2,
    explanation: "Power factor = cos(phase angle). For a pure inductor, the phase angle is 90 degrees (current lags voltage). cos(90) = 0. The power factor is therefore 0, and it is described as 'lagging' because current lags behind voltage."
  },
  {
    id: 12,
    question: "Two inductors of 100mH and 150mH are connected in series (no mutual coupling). What is the total inductance?",
    options: [
      "60mH",
      "250mH",
      "125mH",
      "25mH"
    ],
    correctAnswer: 1,
    explanation: "For inductors in series (without mutual inductance): L_total = L1 + L2 = 100 + 150 = 250mH. Series inductors add directly, just like series resistors. Mutual coupling would modify this if the fields interacted."
  }
];

const faqs = [
  {
    question: "Why does current lag voltage in an inductive circuit?",
    answer: "An inductor generates a back-EMF that opposes changes in current (Lenz's Law). When voltage is applied, this back-EMF prevents current from rising instantly - current builds up gradually. By the time current reaches its peak, the applied voltage has already passed its peak and is decreasing. This delay manifests as current lagging voltage by 90 degrees in a pure inductor."
  },
  {
    question: "What is the difference between inductance and inductive reactance?",
    answer: "Inductance (L, measured in Henries) is a physical property of the coil determined by its construction - number of turns, core material, and geometry. It does not change with frequency. Inductive reactance (XL, measured in Ohms) is the opposition to AC current flow: XL = 2 x pi x f x L. It depends on both the inductance AND the frequency, increasing with higher frequencies."
  },
  {
    question: "Why do inductors not dissipate power?",
    answer: "A pure inductor stores energy in its magnetic field during one quarter of the AC cycle, then returns that energy to the source during the next quarter. The power flow oscillates back and forth but averages to zero. This is reactive power (VAr) - energy that sloshes between source and inductor without doing work. In practice, real inductors have some resistance and do dissipate small amounts of power."
  },
  {
    question: "How does an inductor store energy?",
    answer: "When current flows through an inductor, it creates a magnetic field around the coil. Building this field requires energy from the circuit, which is stored in the field itself. The stored energy E = 0.5 x L x I squared (in Joules). When current decreases, the collapsing magnetic field induces a voltage that drives current, returning the stored energy to the circuit."
  },
  {
    question: "What are practical examples of inductors in electrical installations?",
    answer: "Common inductive loads include: motor windings (major industrial load), fluorescent lamp ballasts, transformers, chokes and reactors for power factor correction, contactors and relay coils, and electromagnetic devices like solenoid valves. Understanding their reactive behaviour is essential for power factor correction and circuit design."
  },
  {
    question: "Why is inductive reactance important for electrical fault calculations?",
    answer: "Cable and equipment reactance becomes significant in fault current calculations, especially for larger conductor sizes and longer cable runs. The total impedance Z = square root of (R squared + XL squared) determines fault current magnitude. At 50Hz, reactance typically dominates over resistance for cables above 50mm squared cross-section, affecting earth fault loop impedance calculations."
  }
];

const Level3Module3Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

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
            <Link to="/study-centre/apprentice/level3-module3-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Phase relationship:</strong> Voltage leads current by 90 degrees</li>
              <li><strong>Key formula:</strong> XL = 2 x pi x f x L</li>
              <li><strong>Power factor:</strong> Zero (0) lagging</li>
              <li><strong>Energy storage:</strong> E = 0.5 x L x I squared (in magnetic field)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Remember: ELI the ICE man</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>E-L-I:</strong> In inductors, EMF (E) leads current (I)</li>
              <li><strong>XL proportional to f:</strong> Higher frequency = more reactance</li>
              <li><strong>DC steady state:</strong> Inductor acts as short circuit</li>
              <li><strong>Real power:</strong> Zero in pure inductor (reactive only)</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01: What is Inductance? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Inductance?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Inductance is the property of an electrical conductor that opposes changes in current. When current flows through a coil, it creates a magnetic field. If the current changes, this magnetic field also changes, inducing a voltage (called back-EMF) that opposes the change. This opposition to current change is inductance, measured in Henries (H).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Factors Affecting Inductance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Number of turns (N):</strong> More turns = more inductance (proportional to N squared)</li>
                <li><strong>Core material:</strong> Iron/ferrite cores dramatically increase inductance</li>
                <li><strong>Cross-sectional area:</strong> Larger area = more inductance</li>
                <li><strong>Length of coil:</strong> Shorter coil = more inductance (for same turns)</li>
              </ul>
            </div>

            <p>
              Faraday's Law states that the induced voltage (back-EMF) is proportional to the rate of change of current: e = -L(di/dt). The negative sign indicates the induced voltage opposes the change (Lenz's Law). An inductance of 1 Henry produces 1 Volt of back-EMF when current changes at 1 Ampere per second.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Inductance Values</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Small motor windings: 1-50 mH</li>
                  <li>Fluorescent ballasts: 0.5-2 H</li>
                  <li>Power transformers: 10-100 H primary</li>
                  <li>Radio frequency chokes: 1-1000 microH</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Unit Conversions</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1 H = 1000 mH (millihenries)</li>
                  <li>1 mH = 1000 microH (microhenries)</li>
                  <li>1 H = 1,000,000 microH</li>
                  <li>Always convert to Henries for calculations</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Point:</strong> Unlike resistance, inductance does not dissipate energy - it stores energy in the magnetic field temporarily and returns it to the circuit. This makes inductors fundamentally different from resistors in AC circuits.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Inductive Reactance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Inductive Reactance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Inductive reactance (XL) is the opposition that an inductor presents to alternating current. Unlike resistance, reactance depends on frequency - the faster the current changes, the greater the opposition. The formula is fundamental to AC circuit analysis:
            </p>

            <div className="my-6">
              <div className="p-4 rounded bg-white/5">
                <p className="font-medium text-elec-yellow/80 mb-2 text-center">XL = 2 x pi x f x L</p>
                <p className="text-sm text-white/80 text-center">Where: XL = inductive reactance (ohms), f = frequency (Hz), L = inductance (H)</p>
              </div>
            </div>

            <p>
              The factor 2 x pi (approximately 6.284) converts frequency in Hz to angular frequency (omega) in radians per second. This formula shows that inductive reactance is directly proportional to both frequency and inductance - double either one, and reactance doubles.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Worked Example:</strong> Calculate the reactance of a 100mH inductor at 50Hz.
              XL = 2 x pi x f x L = 2 x 3.142 x 50 x 0.1 = 31.42 ohms.
              At 100Hz: XL = 2 x 3.142 x 100 x 0.1 = 62.84 ohms (doubled).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Frequency Dependence:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>DC (f = 0):</strong> XL = 0 ohms - inductor acts as short circuit (only DC resistance remains)</li>
                <li><strong>Low frequency:</strong> Low reactance - relatively easy current flow</li>
                <li><strong>High frequency:</strong> High reactance - significant current limitation</li>
                <li><strong>Very high frequency:</strong> Approaches open circuit behaviour</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> In contrast to capacitors, inductors pass DC easily but increasingly block AC as frequency rises. This complementary behaviour is exploited in filter circuits.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Phase Relationships and Power */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Phase Relationships and Power
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In a pure inductive circuit, the current lags the voltage by exactly 90 degrees (one quarter of a cycle). This occurs because the inductor opposes changes in current - it takes time for current to build up against the back-EMF. When voltage is at its peak, current is still building up and has not yet reached its maximum.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Voltage Peak</p>
                <p className="text-white/90 text-xs">Current is at zero, crossing through (rate of change is maximum)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Current Peak</p>
                <p className="text-white/90 text-xs">Voltage is at zero (rate of change of current is zero)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">90 Degree Lag</p>
                <p className="text-white/90 text-xs">Current waveform is shifted 90 degrees behind voltage</p>
              </div>
            </div>

            <p>
              The mnemonic "ELI the ICE man" helps remember: in an inductor (L), EMF/voltage (E) leads current (I). The phase angle (phi) is 90 degrees lagging, giving a power factor of cos(90) = 0.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Power in Pure Inductive Circuits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Real Power (P):</strong> P = VI x cos(90) = 0 Watts</li>
                <li><strong>Reactive Power (Q):</strong> Q = VI x sin(90) = VI VAr (volt-amperes reactive)</li>
                <li><strong>Apparent Power (S):</strong> S = VI VA</li>
                <li><strong>Power Factor:</strong> cos(90) = 0 lagging</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Understanding Reactive Power:</strong> In each quarter cycle, energy flows from the source into the inductor's magnetic field, then back out to the source. This oscillating energy transfer is reactive power - it loads the supply cables and equipment but does no useful work.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Energy Storage in Inductors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Energy Storage in Inductors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When current flows through an inductor, energy is stored in the magnetic field surrounding the coil. This stored energy can be calculated using the formula E = 0.5 x L x I squared, where E is energy in Joules, L is inductance in Henries, and I is current in Amperes.
            </p>

            <div className="my-6">
              <div className="p-4 rounded bg-white/5">
                <p className="font-medium text-elec-yellow/80 mb-2 text-center">E = 0.5 x L x I squared</p>
                <p className="text-sm text-white/80 text-center">Energy stored in an inductor's magnetic field (Joules)</p>
              </div>
            </div>

            <p>
              The I squared relationship means energy storage increases rapidly with current - doubling the current quadruples the stored energy. This stored energy is what causes arcing when inductive circuits are suddenly interrupted - the collapsing magnetic field releases its energy very quickly, generating high voltages.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Worked Example:</strong> A motor winding has 0.5H inductance and carries 20A at the moment of switch-off. Energy stored = 0.5 x 0.5 x 20 squared = 0.25 x 400 = 100 Joules. This energy must be dissipated somewhere when the circuit opens - often as an arc across the switch contacts.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Storage Cycle</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Current increasing: Energy absorbed from source</li>
                  <li>Current at peak: Maximum energy stored</li>
                  <li>Current decreasing: Energy returned to source</li>
                  <li>Current at zero: No energy stored</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Implications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Arc suppression needed on switches</li>
                  <li>Flyback diodes protect transistors</li>
                  <li>Snubber circuits absorb energy</li>
                  <li>Inductive kick can damage components</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Safety Note:</strong> Large inductors can store significant energy. Never disconnect an inductive load while current is flowing without appropriate arc suppression or energy dissipation measures. The induced voltage at switch-off can be many times the supply voltage.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Inductive Loads</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Electric motors:</strong> Major industrial inductive load, power factor typically 0.8-0.9</li>
                <li><strong>Fluorescent lamp ballasts:</strong> Magnetic ballasts are highly inductive</li>
                <li><strong>Transformers:</strong> No-load current is almost purely inductive</li>
                <li><strong>Relay and contactor coils:</strong> Small but significant inductance</li>
                <li><strong>Solenoid valves:</strong> Used in industrial control systems</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Calculation Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always convert mH to H before using the XL formula (divide by 1000)</li>
                <li>Use XL = 2 x 3.142 x f x L for quick calculations</li>
                <li>Current I = V / XL in a pure inductive circuit</li>
                <li>Series inductors (no coupling): L_total = L1 + L2 + L3...</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Forgetting unit conversion:</strong> mH must become H for calculations</li>
                <li><strong>Confusing L and XL:</strong> Inductance is constant; reactance varies with frequency</li>
                <li><strong>Wrong phase direction:</strong> Current LAGS voltage (ELI), not leads</li>
              </ul>
            </div>
          </div>
        </section>

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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Formulas</p>
                <ul className="space-y-0.5">
                  <li>XL = 2 x pi x f x L (ohms)</li>
                  <li>I = V / XL (amps)</li>
                  <li>E = 0.5 x L x I squared (joules)</li>
                  <li>Q = V x I (VAr reactive)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Values</p>
                <ul className="space-y-0.5">
                  <li>Phase angle: 90 degrees (current lags)</li>
                  <li>Power factor: 0 lagging</li>
                  <li>Real power: 0 Watts</li>
                  <li>2 x pi = 6.284 (approximately)</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Pure Resistance
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section2-3">
              Next: Pure Capacitance Circuits
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module3Section2_2;
